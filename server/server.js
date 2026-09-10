import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import 'dotenv/config';
import { dbGet, dbRun, dbAll } from './database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Razorpay SDK safely
const razorpay = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

if (!razorpay) {
  console.warn('⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set in environment. Set them in your deployment dashboard to enable payments.');
}

// Root / health check endpoint for cloud monitoring & status
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'One Step More Backend API',
    uptime: process.uptime()
  });
});

// 1. Get plans dynamically from the database
app.get('/api/plans', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM plans');
    const plans = rows.map(r => ({
      ...r,
      pricing: JSON.parse(r.pricing)
    }));
    res.json(plans);
  } catch (err) {
    console.error('Error fetching plans:', err.message);
    res.status(500).json({ error: 'Server error fetching plans' });
  }
});

// 2. Create a Razorpay Order and record details in SQLite
app.post('/api/create-order', async (req, res) => {
  try {
    const { 
      name, email, phone, programId, weeks,
      bloodGroup, weight, height, dob, age, address 
    } = req.body;

    // Validate inputs
    if (!name || !email || !phone || !programId || !weeks) {
      return res.status(400).json({ error: 'Missing required customer or program details' });
    }

    // Fetch the program from DB to determine pricing dynamically (avoiding client-side tampering)
    const plan = await dbGet('SELECT * FROM plans WHERE id = ?', [programId]);
    if (!plan) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const pricingList = JSON.parse(plan.pricing);
    const selectedPricing = pricingList.find(p => p.weeks === Number(weeks));
    if (!selectedPricing) {
      return res.status(400).json({ error: `Invalid duration of ${weeks} weeks for this program` });
    }

    const amountInRupees = selectedPricing.offer;
    const amountInPaise = amountInRupees * 100; // Razorpay expects amount in paise

    // Create Order in Razorpay
    if (!razorpay) {
      return res.status(503).json({
        error: 'Razorpay keys are not configured on the backend. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your environment variables.'
      });
    }

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    const rzpOrder = await razorpay.orders.create(options);

    // Save pending order details into SQLite database
    await dbRun(`
      INSERT INTO orders (
        name, email, phone, program_id, duration, amount, 
        razorpay_order_id, status, blood_group, weight, height, dob, age, address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, email, phone, programId, Number(weeks), amountInRupees,
      rzpOrder.id, 'pending', bloodGroup, weight, height, dob, Number(age), address
    ]);

    // Return Razorpay Order ID to frontend
    res.json({
      orderId: rzpOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error('Error creating order:', err.message || err);
    res.status(500).json({ error: 'Server error creating payment order' });
  }
});

// 3. Verify Razorpay Payment Signature
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing signature verification tokens' });
    }

    // Verify HMAC signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      // Update order status in database
      await dbRun(
        'UPDATE orders SET status = ?, razorpay_payment_id = ? WHERE razorpay_order_id = ?',
        ['paid', razorpay_payment_id, razorpay_order_id]
      );
      res.json({ success: true, message: 'Payment verified and order confirmed' });
    } else {
      console.warn('Signature verification failed for order:', razorpay_order_id);
      await dbRun(
        'UPDATE orders SET status = ? WHERE razorpay_order_id = ?',
        ['failed', razorpay_order_id]
      );
      res.status(400).json({ success: false, error: 'Payment verification failed: Signature mismatch' });
    }
  } catch (err) {
    console.error('Error verifying payment:', err.message);
    res.status(500).json({ error: 'Server error verifying payment' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
