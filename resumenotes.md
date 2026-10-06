# Project State & Session Notes (One-Step-More)

## Current Live Status
- **Frontend**: Live on **Cloudflare Pages** at [https://www.onestepmore.in](https://www.onestepmore.in) and [https://onestepmore.in](https://onestepmore.in).
- **Backend API**: Live on **Render** at [https://one-step-more.onrender.com](https://one-step-more.onrender.com).
- **Database**: Permanent Cloud Database on **MongoDB Atlas** (`Cluster0` / `onestepmore`).
- **Admin Portal**: Live at [https://one-step-more.onrender.com/admin](https://one-step-more.onrender.com/admin).
- **Email Delivery**: Live via **Resend HTTPS REST API** (Port 443 - zero firewall blocks on Render).
- **Custom Domain & SSL**: `onestepmore.in` and `www.onestepmore.in` routed and secured via Cloudflare.
- **Git State**: Clean and synchronized with GitHub `main`.
- **Code Architecture**: 100% modular. Dedicated folders for all components (`src/components/<Name>/`) and pages (`src/pages/<Name>/`), with all copy/strings extracted to `src/constants/`.

---

## Completed Milestones
- [x] **MongoDB Atlas Cloud Database Integration (Permanent Data Retention)**:
  - Replaced ephemeral local SQLite with MongoDB Atlas cloud database (`Cluster0`).
  - Implemented Mongoose schemas & models for `Plan`, `Order`, and `Inquiry` in `server/database.js`.
  - Configured automatic reconnection middleware in `server/server.js` to ensure resilient connectivity across server sleep/wake cycles.
  - Seeded all 6 official wellness and nutrition plans.
  - All consultation inquiries and enrollment orders now persist permanently in the cloud across server restarts and hard refreshes.
  - Reset test data to clean zero state for production launch.

- [x] **Email & SMS Notifications System (Resend HTTPS API & Custom Domain Verified)**:
  - Switched from raw SMTP to Resend HTTPS REST API (bypassing Render cloud port restrictions).
  - Verified and connected custom branded domain `onestepmore.in` via Cloudflare DNS.
  - Configured sender address to `1 Step More <hello@onestepmore.in>`.
  - Full end-to-end client email delivery verified for all client addresses without sandbox restrictions.
  - Automatic branded confirmation email dispatched to clients upon filling enquiry form.
  - Automatic payment receipt and welcome email dispatched to client upon course enrollment.
  - Admin alert emails dispatched to `onestepmore04@gmail.com`.
  - Diagnostic test endpoint active at `/api/test-email`.

- [x] **Razorpay Payment Gateway Integration & Testing**:
  - Test Keys configured and verified (`rzp_test_Tk84ZtyeGeEz2E`).
  - Dynamic plan pricing fetched securely from MongoDB Atlas to prevent client-side price tampering.
  - End-to-end checkout, payment capture, and HMAC signature verification verified on `/enroll`.

- [x] **Branded Tax Invoice & Payment Receipt (PDF)**:
  - Dynamic client-side vector PDF generation using `jspdf`.
  - Lazy-loaded chunking to maintain lightning-fast page speed.
  - Comprehensive clinical receipt with OSM Receipt No, Provider info, Candidate bio, Razorpay Order & Payment ID, itemized fees, discount scholarship, digital verification stamp, and Dt. Pragati Mishra's signature seal.

- [x] **Frontend Image Lazy Loading & Async Decoding**:
  - Implemented `loading="lazy"` and `decoding="async"` across all off-screen images (`Services.jsx`, `Blog.jsx`, `About.jsx`, `HomeTestimonials.jsx`, `Footer.jsx`, and Founder sections).
  - Maintained `loading="eager"` with `fetchPriority="high"` on the above-the-fold Hero image for optimal Largest Contentful Paint (LCP).

---

## Remaining Tasks & Future Roadmap

1. 💳 **Razorpay Live Mode Activation (When ready for real customer payments)**:
   - Complete KYC and business verification on [Razorpay Dashboard](https://dashboard.razorpay.com/).
   - Generate Live API Keys (`rzp_live_...`).
   - Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Render Dashboard -> Environment and local `.env`.

2. 🖼️ **Asset & CDN Optimization (Optional)**:
   - Connect Cloudinary or Cloudflare Images to serve modern AVIF/WebP responsive formats.

3. 📊 **Analytics & Meta Pixel (Optional)**:
   - Add Google Analytics 4 (GA4) or Meta Pixel for marketing / conversion tracking.
