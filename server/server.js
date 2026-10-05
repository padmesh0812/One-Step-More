import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import 'dotenv/config';
import { connectDB, Plan, Order, Inquiry } from './database.js';
import { renderAdminHtml } from './adminDashboard.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend HTTPS email service (Bypasses Render cloud port restrictions via Port 443)
const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const resendSender = (process.env.RESEND_FROM_EMAIL || '1 Step More <onboarding@resend.dev>').trim();

// Setup Nodemailer transporter with port 465 SSL (as secondary / local fallback)
const transporter = (process.env.SMTP_USER && process.env.SMTP_PASS) ? nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS.replace(/\s+/g, '') // remove spaces from 16-char app password if any
  }
}) : null;

// Helper: Send alert to business owner / admin (Prefers Resend HTTPS, falls back to SMTP)
async function sendNotificationEmail({ subject, htmlText }) {
  const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'onestepmore04@gmail.com';
  
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: resendSender,
        to: targetEmail,
        subject,
        html: htmlText
      });
      if (error) {
        console.error('[Admin Email Error via Resend]', error);
      } else {
        console.log(`[Admin Email Sent via Resend] ID: ${data?.id} | Recipient: ${targetEmail}`);
        return true;
      }
    } catch (err) {
      console.error('[Admin Email Exception via Resend]', err.message);
    }
  }

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"1 Step More Alerts" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        subject,
        html: htmlText
      });
      console.log(`[Email Sent to Admin via SMTP] ID: ${info.messageId} | Recipient: ${targetEmail}`);
      return true;
    } catch (err) {
      console.error('[Admin Email Error via SMTP]:', err.message);
    }
  } else if (!resend) {
    console.log(`[Email Notice] Neither Resend nor SMTP configured. Recipient: ${targetEmail} | Subject: ${subject}`);
  }
  return false;
}

// Helper: Send confirmation to the client who filled the enquiry form
async function sendClientConfirmationEmail({ clientEmail, clientName, reason }) {
  if (!clientEmail) return false;

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); padding: 32px 24px; text-align: center; color: #FFFFFF;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">1 Step More</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Every Healthy Habit Begins With One Small Step</p>
      </div>

      <!-- Body Content -->
      <div style="padding: 32px 24px; color: #374151; line-height: 1.6;">
        <h2 style="color: #1F2937; font-size: 20px; margin-top: 0;">Hi ${clientName},</h2>
        <p style="font-size: 15px;">
          Thank you for reaching out to <strong>1 Step More</strong> regarding our <strong>${reason || 'Customized Wellness Program'}</strong>.
        </p>
        <p style="font-size: 15px;">
          We have received your enquiry details. One of our certified nutritionists / wellness coaches will connect with you via phone / WhatsApp within <strong>24 hours</strong> to discuss your health targets and schedule your personal evaluation call.
        </p>

        <div style="background-color: #F3F4F6; border-left: 4px solid #2E7D32; padding: 16px; border-radius: 6px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #4B5563;">
            <em>"Wellness is not about extreme deprivation—it's about creating joyful, sustainable habits that fit seamlessly around your everyday life."</em>
          </p>
          <p style="margin: 8px 0 0 0; font-size: 13px; font-weight: 700; color: #2E7D32;">
            — Dt. Pragati Mishra (Founder & Lead Nutritionist)
          </p>
        </div>

        <p style="font-size: 14px; color: #6B7280;">
          If you have any urgent questions, feel free to WhatsApp us directly at <a href="https://wa.me/918115660790" style="color: #2E7D32; font-weight: 600;">+91 8115660790</a>.
        </p>

        <div style="margin-top: 32px; text-align: center;">
          <a href="https://www.onestepmore.in" style="background-color: #2E7D32; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 14px; display: inline-block;">
            Explore Our Programs
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #F9FAFB; padding: 20px 24px; text-align: center; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} 1 Step More. Gomti Nagar, Lucknow, UP, India.</p>
      </div>
    </div>
  `;

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: resendSender,
        to: clientEmail,
        subject: `Thank you for connecting with 1 Step More, ${clientName}! 🌱`,
        html: emailHtml
      });
      if (!error) {
        console.log(`[Client Email Sent via Resend] ID: ${data?.id} | Recipient: ${clientEmail}`);
        return true;
      }
    } catch (err) {
      console.warn('[Resend Client Email Warning]', err.message);
    }
  }

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"1 Step More | Dt. Pragati Mishra" <${process.env.SMTP_USER}>`,
        to: clientEmail,
        subject: `Thank you for connecting with 1 Step More, ${clientName}! 🌱`,
        html: emailHtml
      });
      console.log(`[Email Sent to Client via SMTP] ID: ${info.messageId} | Recipient: ${clientEmail}`);
      return true;
    } catch (err) {
      console.error('[Client Email Error via SMTP]:', err.message);
    }
  }
  return false;
}

// Helper: Send branded payment confirmation and welcome email to enrolled client
async function sendClientPaymentSuccessEmail({ clientEmail, clientName, programId, duration, amount, paymentId, orderId }) {
  if (!clientEmail) return false;

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
      
      <!-- Brand Header -->
      <div style="background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); padding: 36px 28px; text-align: center; color: #FFFFFF;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Payment Confirmed</span>
        <h1 style="margin: 10px 0 4px 0; font-size: 26px; font-weight: 800;">1 Step More</h1>
        <p style="margin: 0; font-size: 13px; opacity: 0.9;">Diet • Yoga • Holistic Lifestyle Coaching</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 28px; color: #374151; line-height: 1.6;">
        <h2 style="color: #1F2937; font-size: 20px; margin-top: 0;">Welcome aboard, ${clientName}! 🌱</h2>
        <p style="font-size: 15px; margin-bottom: 20px;">
          We have successfully received your payment and locked in your slot for the <strong>${programId.toUpperCase()} Transformation Program (${duration} Weeks)</strong>.
        </p>

        <!-- Receipt Box -->
        <div style="background-color: #F8FAF8; border: 1.5px solid #E2EFE2; border-radius: 10px; padding: 20px; margin: 24px 0;">
          <h3 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #2E7D32;">Payment Summary</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #6B7280;">Amount Paid:</td>
              <td style="padding: 6px 0; font-weight: 700; text-align: right; color: #2E7D32;">₹${Number(amount).toLocaleString('en-IN')}/-</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6B7280;">Payment ID:</td>
              <td style="padding: 6px 0; font-family: monospace; font-size: 13px; text-align: right; color: #1F2937;">${paymentId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6B7280;">Order ID:</td>
              <td style="padding: 6px 0; font-family: monospace; font-size: 13px; text-align: right; color: #6B7280;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6B7280;">Status:</td>
              <td style="padding: 6px 0; font-weight: 700; text-align: right; color: #2E7D32;">PAID IN FULL</td>
            </tr>
          </table>
        </div>

        <!-- What to Expect Next -->
        <h3 style="color: #1F2937; font-size: 16px; margin: 24px 0 12px 0;">What happens next?</h3>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563; line-height: 1.8;">
          <li>Our senior clinical nutritionist will connect with you via Phone or WhatsApp within <strong>24 hours</strong>.</li>
          <li>We will review your dietary preferences, lifestyle routine, and health parameters.</li>
          <li>Your personalized weekly nutrition guide, habit protocol, and yoga schedule will be shared directly with you.</li>
        </ol>

        <div style="background-color: #F3F4F6; border-left: 4px solid #2E7D32; padding: 14px 16px; border-radius: 6px; margin: 24px 0;">
          <p style="margin: 0; font-size: 13.5px; color: #4B5563;">
            <em>"Every healthy habit begins with one small step. You have taken that step today—and we are committed to walking with you till you achieve your dream fitness."</em>
          </p>
          <p style="margin: 6px 0 0 0; font-size: 13px; font-weight: 700; color: #2E7D32;">
            — Dt. Pragati Mishra (Founder & Lead Coach)
          </p>
        </div>

        <p style="font-size: 13.5px; color: #6B7280;">
          Need any immediate assistance? WhatsApp us directly at <a href="https://wa.me/918115660790" style="color: #2E7D32; font-weight: 600;">+91 8115660790</a> or write to <a href="mailto:hello@onestepmore.in" style="color: #2E7D32;">hello@onestepmore.in</a>.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #F9FAFB; padding: 20px 28px; text-align: center; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF;">
        <p style="margin: 0 0 4px 0;">&copy; ${new Date().getFullYear()} 1 Step More Health & Wellness Clinic.</p>
        <p style="margin: 0;">Gomti Nagar, Lucknow, UP, India &bull; <a href="https://www.onestepmore.in" style="color: #9CA3AF; text-decoration: underline;">www.onestepmore.in</a></p>
      </div>
    </div>
  `;

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: resendSender,
        to: clientEmail,
        subject: `🎉 Enrollment Confirmed: Welcome to 1 Step More, ${clientName}!`,
        html: emailHtml
      });
      if (!error) {
        console.log(`[Client Payment Email Sent via Resend] ID: ${data?.id} | Recipient: ${clientEmail}`);
        return true;
      }
    } catch (err) {
      console.warn('[Resend Client Payment Email Error]', err.message);
    }
  }

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"1 Step More | Dt. Pragati Mishra" <${process.env.SMTP_USER}>`,
        to: clientEmail,
        subject: `🎉 Enrollment Confirmed: Welcome to 1 Step More, ${clientName}!`,
        html: emailHtml
      });
      console.log(`[Client Payment Email Sent via SMTP] ID: ${info.messageId} | Recipient: ${clientEmail}`);
      return true;
    } catch (err) {
      console.error('[Client Payment Email Error via SMTP]:', err.message);
    }
  }
  return false;
}

// Helper: Send SMS confirmation to client's phone if SMS provider configured
async function sendClientPaymentSms({ phone, name, programId, amount, paymentId }) {
  const cleanPhone = phone?.replace(/[^0-9]/g, '');
  if (!cleanPhone) return false;

  const smsText = `Hi ${name}, your enrollment in 1 Step More (${programId}) for Rs.${amount} is confirmed! Payment ID: ${paymentId}. Our team will call you within 24h. Query: 8115660790`;

  // Fast2SMS Gateway integration hook
  if (process.env.FAST2SMS_API_KEY) {
    try {
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'q',
          message: smsText,
          language: 'english',
          numbers: cleanPhone
        })
      });
      const data = await response.json();
      console.log(`[SMS Sent via Fast2SMS] To: ${cleanPhone}`, data);
      return true;
    } catch (err) {
      console.error('[SMS Error] Fast2SMS dispatch failed:', err.message);
    }
  } else {
    console.log(`[SMS Ready] Provider not yet active in env. SMS message to ${cleanPhone}: "${smsText}"`);
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

import mongoose from 'mongoose';

let dbConnectionError = null;
// Connect to MongoDB Atlas on startup
connectDB().catch(err => {
  dbConnectionError = err.message;
  console.error('Fatal: Failed to connect to MongoDB Atlas on launch:', err.message);
});

// Root / health check endpoint for cloud monitoring & status
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'One Step More Backend API',
    database: 'MongoDB Atlas',
    readyState: mongoose.connection.readyState,
    uptime: process.uptime()
  });
});

app.get('/api/db-debug', (req, res) => {
  res.json({
    readyState: mongoose.connection.readyState,
    status: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    error: dbConnectionError,
    uriConfigured: Boolean(process.env.MONGODB_URI)
  });
});

// 1. Get plans dynamically from MongoDB Atlas
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await Plan.find().lean();
    res.json(plans);
  } catch (err) {
    console.error('Error fetching plans:', err.message);
    res.status(500).json({ error: 'Server error fetching plans', details: err.message });
  }
});

// 2. Create a Razorpay Order and record details in MongoDB Atlas
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

    // Fetch the program from MongoDB Atlas to determine pricing dynamically
    const plan = await Plan.findOne({ id: programId }).lean();
    if (!plan) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const pricingList = Array.isArray(plan.pricing) ? plan.pricing : [];
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
      receipt: `rcpt_${Date.now()}`
    };

    const rzpOrder = await razorpay.orders.create(options);

    // Save pending order details into MongoDB Atlas
    await Order.create({
      name,
      email,
      phone,
      program_id: programId,
      duration: Number(weeks),
      amount: amountInRupees,
      razorpay_order_id: rzpOrder.id,
      status: 'pending',
      blood_group: bloodGroup || '',
      weight: weight || '',
      height: height || '',
      dob: dob || '',
      age: Number(age) || null,
      address: address || ''
    });

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
      // Update order status in MongoDB Atlas
      const orderInfo = await Order.findOneAndUpdate(
        { razorpay_order_id },
        { status: 'paid', razorpay_payment_id },
        { new: true }
      ).lean();

      if (orderInfo) {
        // 1. Alert to Business Owner / Admin
        sendNotificationEmail({
          subject: `💰 Payment Received: ₹${orderInfo.amount || ''} from ${orderInfo.name || 'Customer'}`,
          htmlText: `
            <h2>🎉 New Paid Enrollment Received!</h2>
            <p><strong>Customer:</strong> ${orderInfo.name || '-'}</p>
            <p><strong>Phone:</strong> <a href="tel:${orderInfo.phone}">${orderInfo.phone || '-'}</a> &bull; <a href="https://wa.me/${(orderInfo.phone || '').replace(/[^0-9]/g, '')}">WhatsApp</a></p>
            <p><strong>Email:</strong> ${orderInfo.email || '-'}</p>
            <p><strong>Program:</strong> ${orderInfo.program_id || '-'} (${orderInfo.duration || '-'} Weeks)</p>
            <p><strong>Amount:</strong> ₹${orderInfo.amount || '-'}</p>
            <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
            <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
            <hr/>
            <p><a href="https://one-step-more.onrender.com/admin" style="background:#2E7D32;color:#fff;padding:8px 16px;text-decoration:none;border-radius:6px;">Open Admin Dashboard</a></p>
          `
        }).catch(e => console.error('[Owner Alert Error]', e));

        // 2. Branded Confirmation & Receipt Email to Client
        sendClientPaymentSuccessEmail({
          clientEmail: orderInfo.email,
          clientName: orderInfo.name,
          programId: orderInfo.program_id,
          duration: orderInfo.duration,
          amount: orderInfo.amount,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        }).catch(e => console.error('[Client Email Error]', e));

        // 3. SMS Notification to Client Phone
        sendClientPaymentSms({
          phone: orderInfo.phone,
          name: orderInfo.name,
          programId: orderInfo.program_id,
          amount: orderInfo.amount,
          paymentId: razorpay_payment_id
        }).catch(e => console.error('[Client SMS Error]', e));
      }

      res.json({ success: true, message: 'Payment verified and order confirmed' });
    } else {
      console.warn('Signature verification failed for order:', razorpay_order_id);
      await Order.findOneAndUpdate(
        { razorpay_order_id },
        { status: 'failed' }
      );
      res.status(400).json({ success: false, error: 'Payment verification failed: Signature mismatch' });
    }
  } catch (err) {
    console.error('Error verifying payment:', err.message);
    res.status(500).json({ error: 'Server error verifying payment' });
  }
});

// 4. Record Contact / Consultation Enquiry in MongoDB Atlas & Send Instant Emails
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, reason, address, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email and phone number are required.' });
    }

    // Save enquiry into MongoDB Atlas (Permanent Cloud Storage)
    const newInquiry = await Inquiry.create({
      name,
      email,
      phone,
      reason: reason || 'General Inquiry',
      address: address || '',
      message: message || ''
    });

    console.log(`[MongoDB Atlas] New inquiry saved with ID: ${newInquiry._id}`);

    // 1. Send instant email notification to Business Owner / Admin
    sendNotificationEmail({
      subject: `🚨 New Consultation Enquiry: ${name} (${reason || 'Wellness'})`,
      htmlText: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 10px; overflow: hidden; border: 1px solid #E5E7EB;">
          <div style="background: #2E7D32; padding: 20px; color: #FFFFFF;">
            <h2 style="margin: 0; font-size: 20px;">📋 New Client Consultation Enquiry</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Received via One Step More Website</p>
          </div>
          <div style="padding: 24px; color: #374151; font-size: 15px; line-height: 1.6;">
            <p style="margin: 0 0 12px 0;"><strong>Client Name:</strong> ${name}</p>
            <p style="margin: 0 0 12px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #2E7D32; font-weight: 700;">${phone}</a> &bull; <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #10B981; font-weight: 700;">Chat on WhatsApp</a></p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2E7D32;">${email}</a></p>
            <p style="margin: 0 0 12px 0;"><strong>Goal / Reason:</strong> <span style="background: #E8F5E9; color: #2E7D32; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${reason || 'General'}</span></p>
            <p style="margin: 0 0 12px 0;"><strong>City / Address:</strong> ${address || 'N/A'}</p>
            <div style="background-color: #F9FAFB; border-left: 3px solid #2E7D32; padding: 12px; margin: 16px 0; border-radius: 4px;">
              <strong>Message / Notes:</strong><br/>
              ${message || 'No additional message provided.'}
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="https://one-step-more.onrender.com/admin" style="background-color: #2E7D32; color: #FFFFFF; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 700; font-size: 14px; display: inline-block;">
                View All Leads in Admin Portal &rarr;
              </a>
            </div>
          </div>
        </div>
      `
    }).catch(e => console.error('[Notification Trigger Error]', e));

    // 2. Send instant welcome confirmation email to the Client
    sendClientConfirmationEmail({
      clientEmail: email,
      clientName: name,
      reason
    }).catch(e => console.error('[Client Confirmation Trigger Error]', e));

    res.json({ success: true, message: 'Enquiry saved permanently in MongoDB Atlas', id: newInquiry._id });
  } catch (err) {
    console.error('Error recording contact inquiry in MongoDB:', err.message);
    res.status(500).json({ error: 'Server error saving inquiry' });
  }
});

// Diagnostic helper: Check if email service (Resend HTTPS or SMTP) is configured and working
app.get('/api/test-email', async (req, res) => {
  const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'onestepmore04@gmail.com';

  // 1. Prioritize Resend over HTTPS (Port 443 - 100% works on Render)
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: resendSender,
        to: targetEmail,
        subject: '🚀 Resend Live Activation Test - 1 Step More',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1.5px solid #2E7D32; overflow: hidden; box-shadow: 0 4px 15px rgba(46,125,50,0.1);">
            <div style="background: #2E7D32; padding: 24px; color: #FFFFFF; text-align: center;">
              <h2 style="margin: 0; font-size: 22px;">🎉 Resend HTTPS Email System Active!</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">1 Step More Cloud Notification Node</p>
            </div>
            <div style="padding: 24px; color: #374151; font-size: 14px; line-height: 1.6;">
              <p>Your server on Render is now successfully sending emails via HTTPS (Port 443) with zero firewall restrictions.</p>
              <ul style="padding-left: 20px; color: #4B5563;">
                <li><strong>Provider:</strong> Resend REST API (HTTPS)</li>
                <li><strong>Recipient:</strong> ${targetEmail}</li>
                <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
              </ul>
              <div style="background: #E8F5E9; padding: 12px; border-radius: 6px; color: #1B5E20; font-weight: 600; text-align: center;">
                All website consultation leads & payment receipts are ready to deliver!
              </div>
            </div>
          </div>
        `
      });

      if (error) {
        return res.status(500).json({ configured: false, provider: 'Resend', error });
      }

      return res.json({
        configured: true,
        provider: 'Resend (HTTPS Port 443)',
        recipient: targetEmail,
        messageId: data?.id,
        message: `Resend test email delivered successfully to ${targetEmail}!`
      });
    } catch (err) {
      return res.status(500).json({ configured: false, provider: 'Resend', error: err.message });
    }
  }

  // 2. Secondary fallback: SMTP
  if (transporter) {
    try {
      await transporter.verify();
      return res.json({
        configured: true,
        provider: 'Gmail SMTP',
        sender: process.env.SMTP_USER,
        recipient: targetEmail,
        message: 'Gmail SMTP connection verified successfully!'
      });
    } catch (err) {
      return res.status(500).json({
        configured: false,
        provider: 'Gmail SMTP',
        error: err.message,
        instructions: 'Render blocks raw SMTP ports. Add RESEND_API_KEY to your Render Environment to use HTTPS email delivery.'
      });
    }
  }

  return res.status(503).json({
    configured: false,
    message: 'Neither RESEND_API_KEY nor SMTP is configured.',
    instructions: 'Add RESEND_API_KEY in Render Dashboard -> Environment.'
  });
});

// 5. Get all inquiries in JSON
app.get('/api/inquiries', async (req, res) => {
  try {
    const rawInquiries = await Inquiry.find().sort({ created_at: -1 }).lean();
    const formatted = rawInquiries.map(inq => ({
      ...inq,
      id: inq._id.toString()
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching inquiries' });
  }
});

// 6. Get all orders in JSON
app.get('/api/orders', async (req, res) => {
  try {
    const rawOrders = await Order.find().sort({ created_at: -1 }).lean();
    const formatted = rawOrders.map(ord => ({
      ...ord,
      id: ord._id.toString()
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// 7. Live Admin Dashboard View
app.get('/admin', async (req, res) => {
  try {
    const rawInquiries = await Inquiry.find().sort({ created_at: -1 }).lean();
    const rawOrders = await Order.find().sort({ created_at: -1 }).lean();

    const inquiries = rawInquiries.map((inq, idx) => ({
      ...inq,
      id: inq._id.toString().slice(-6).toUpperCase(),
      created_at: inq.created_at ? new Date(inq.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) : 'Recently'
    }));

    const orders = rawOrders.map((ord, idx) => ({
      ...ord,
      id: ord._id.toString().slice(-6).toUpperCase(),
      created_at: ord.created_at ? new Date(ord.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) : 'Recently'
    }));

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
