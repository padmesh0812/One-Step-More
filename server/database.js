import mongoose from 'mongoose';
import 'dotenv/config';

// Default connection string fallback if MONGODB_URI not explicitly passed
const MONGODB_URI = (
  process.env.MONGODB_URI ||
  'mongodb+srv://onestepmore04_db_user:mhA7PxqfAOcdEmOp@cluster0.nz4rnds.mongodb.net/onestepmore?retryWrites=true&w=majority&appName=Cluster0'
).trim();

// 1. Program / Plan Schema
const planSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  pricing: [
    {
      weeks: Number,
      days: Number,
      label: String,
      original: Number,
      offer: Number
    }
  ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// 2. Order Schema (Enrollments & Razorpay transactions)
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program_id: { type: String, required: true },
  duration: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed'] },
  razorpay_order_id: { type: String, required: true, unique: true },
  razorpay_payment_id: { type: String, default: '' },
  blood_group: { type: String, default: '' },
  weight: { type: String, default: '' },
  height: { type: String, default: '' },
  dob: { type: String, default: '' },
  age: { type: Number },
  address: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

// 3. Inquiry Schema (Consultation leads & contact inquiries)
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, default: 'General Inquiry' },
  address: { type: String, default: '' },
  message: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

export const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

// Default programs and pricing data to seed
export const DEFAULT_PROGRAMS = [
  {
    id: 'diet',
    title: "Customized Diet Program",
    pricing: [
      { weeks: 4, original: 4500, offer: 2999 },
      { weeks: 8, original: 8899, offer: 5999 },
      { weeks: 12, original: 12499, offer: 7999 },
      { weeks: 24, original: 21899, offer: 11999 },
      { weeks: 48, original: 43899, offer: 21999 }
    ]
  },
  {
    id: 'child',
    title: "Customized Child Nutrition",
    pricing: [
      { weeks: 4, original: 2500, offer: 1500 },
      { weeks: 8, original: 4900, offer: 2900 },
      { weeks: 12, original: 6900, offer: 3900 },
      { weeks: 24, original: 11900, offer: 5900 },
      { weeks: 48, original: 23900, offer: 11900 }
    ]
  },
  {
    id: 'group-yoga',
    title: "Yoga & Beyond (Group Sessions)",
    pricing: [
      { weeks: 4, original: 1999, offer: 999 },
      { weeks: 8, original: 3899, offer: 1899 },
      { weeks: 12, original: 5799, offer: 2699 },
      { weeks: 24, original: 11499, offer: 4999 },
      { weeks: 48, original: 21999, offer: 7999 }
    ]
  },
  {
    id: 'one-yoga',
    title: "1:1 Live Personal Yoga",
    pricing: [
      { weeks: 4, original: 5999, offer: 2999 },
      { weeks: 8, original: 11899, offer: 5899 },
      { weeks: 12, original: 17499, offer: 8499 },
      { weeks: 24, original: 33999, offer: 15999 },
      { weeks: 48, original: 63999, offer: 27999 }
    ]
  },
  {
    id: 'combo',
    title: "Diet & Group Yoga Combo",
    pricing: [
      { weeks: 4, original: 4499, offer: 2999 },
      { weeks: 8, original: 8899, offer: 5999 },
      { weeks: 12, original: 12499, offer: 7999 },
      { weeks: 24, original: 21899, offer: 11999 },
      { weeks: 48, original: 43899, offer: 21999 }
    ]
  },
  {
    id: 'gut-detox',
    title: "10 Days Gut Cleaning Detox Plan",
    pricing: [
      { weeks: 1.4, days: 10, label: "10 Days Plan", original: 1999, offer: 999 }
    ]
  }
];

// Initialize and connect to MongoDB Atlas
export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });
    console.log('✅ Connected to MongoDB Atlas! Database:', mongoose.connection.name);

    // Auto-seed plans if collection is empty
    const planCount = await Plan.countDocuments();
    if (planCount === 0) {
      console.log('Seeding initial plans into MongoDB Atlas...');
      await Plan.insertMany(DEFAULT_PROGRAMS);
      console.log('✅ Initial plans seeded successfully!');
    }

    return mongoose.connection;
  } catch (err) {
    console.error('❌ MongoDB Atlas Connection Error:', err.message);
    throw err;
  }
}
