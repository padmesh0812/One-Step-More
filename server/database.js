import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'database.sqlite');

// Initialize database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database at:', dbPath);
    initTables();
  }
});

// Wrap DB calls in Promises for cleaner async/await usage
export const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

export const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Default program and pricing data to seed
const DEFAULT_PROGRAMS = [
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
  }
];

async function initTables() {
  try {
    // Create plans table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        pricing TEXT NOT NULL
      )
    `);

    // Create orders table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        program_id TEXT NOT NULL,
        duration INTEGER NOT NULL,
        amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        razorpay_order_id TEXT UNIQUE NOT NULL,
        razorpay_payment_id TEXT,
        blood_group TEXT,
        weight TEXT,
        height TEXT,
        dob TEXT,
        age INTEGER,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create contacts/enquiries table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        reason TEXT NOT NULL,
        address TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);


    // Check if plans need to be seeded
    const row = await dbGet('SELECT COUNT(*) as count FROM plans');
    if (row.count === 0) {
      console.log('Seeding initial plans into database...');
      for (const p of DEFAULT_PROGRAMS) {
        await dbRun(
          'INSERT INTO plans (id, title, pricing) VALUES (?, ?, ?)',
          [p.id, p.title, JSON.stringify(p.pricing)]
        );
      }
      console.log('Seeding completed successfully!');
    }
  } catch (err) {
    console.error('Database initialization error:', err.message);
  }
}

export default db;
