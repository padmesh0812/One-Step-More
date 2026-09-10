import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { dbGet, dbRun, dbAll } from './database.js';
import { renderAdminHtml } from './adminDashboard.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Nodemailer transporter if credentials provided
const transporter = (process.env.SMTP_USER && process.env.SMTP_PASS) ? nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}) : null;

async function sendNotificationEmail({ subject, htmlText }) {
  const targetEmail = process.env.NOTIFICATION_EMAIL || 'onestepmore04@gmail.com';
  
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"1 Step More Alerts" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        subject,
        html: htmlText
      });
      console.log(`[Email Sent] Successfully delivered notification to ${targetEmail}`);
      return true;
    } catch (err) {
      console.error('[Email Error] Failed to send via Nodemailer:', err.message);
    }
  } else {
    console.log(`[Email Notice] Recipient: ${targetEmail} | Subject: ${subject}`);
  }
  return false;
}

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

      // Send email alert for paid enrollment
      dbGet('SELECT * FROM orders WHERE razorpay_order_id = ?', [razorpay_order_id])
        .then(orderInfo => {
          sendNotificationEmail({
            subject: `💰 Payment Received: ₹${orderInfo?.amount || ''} from ${orderInfo?.name || 'Customer'}`,
            htmlText: `
              <h2>🎉 New Paid Enrollment Received!</h2>
              <p><strong>Customer:</strong> ${orderInfo?.name || '-'}</p>
              <p><strong>Phone:</strong> <a href="tel:${orderInfo?.phone}">${orderInfo?.phone || '-'}</a></p>
              <p><strong>Email:</strong> ${orderInfo?.email || '-'}</p>
              <p><strong>Program:</strong> ${orderInfo?.program_id || '-'} (${orderInfo?.duration || '-'} Weeks)</p>
              <p><strong>Amount:</strong> ₹${orderInfo?.amount || '-'}</p>
              <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
              <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
              <hr/>
              <p><a href="https://one-step-more.onrender.com/admin" style="background:#2E7D32;color:#fff;padding:8px 16px;text-decoration:none;border-radius:6px;">Open Admin Dashboard</a></p>
            `
          });
        })
        .catch(err => console.error('Error fetching order for email:', err));

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

// 4. Record Contact / Consultation Enquiry & Send Email
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, reason, address, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email and phone number are required.' });
    }

    const result = await dbRun(`
      INSERT INTO inquiries (name, email, phone, reason, address, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, phone, reason || 'General Inquiry', address || '', message || '']);

    // Send instant email notification to onestepmore04@gmail.com
    sendNotificationEmail({
      subject: `🚨 New Consultation Enquiry: ${name} (${reason || 'Wellness'})`,
      htmlText: `
        <h2>📋 New Client Consultation Enquiry</h2>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a> | <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">WhatsApp</a></p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Goal / Reason:</strong> ${reason || 'General'}</p>
        <p><strong>City / Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Message / Notes:</strong> ${message || 'N/A'}</p>
        <hr/>
        <p><a href="https://one-step-more.onrender.com/admin" style="background:#2E7D32;color:#fff;padding:8px 16px;text-decoration:none;border-radius:6px;">View All Leads in Admin Portal</a></p>
      `
    }).catch(e => console.error(e));

    res.json({ success: true, message: 'Enquiry saved successfully', id: result.lastID });
  } catch (err) {
    console.error('Error recording contact inquiry:', err.message);
    res.status(500).json({ error: 'Server error saving inquiry' });
  }
});

// 5. Get all inquiries in JSON
app.get('/api/inquiries', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM inquiries ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching inquiries' });
  }
});

// 6. Get all orders in JSON
app.get('/api/orders', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM orders ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// 7. Live Admin Dashboard View
app.get('/admin', async (req, res) => {
  try {
    const inquiries = await dbAll('SELECT * FROM inquiries ORDER BY id DESC');
    const orders = await dbAll('SELECT * FROM orders ORDER BY id DESC');
    const html = renderAdminHtml(inquiries, orders);
    res.send(html);
  } catch (err) {
    console.error('Admin portal rendering error:', err.message);
    res.status(500).send('Error loading admin dashboard');
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
