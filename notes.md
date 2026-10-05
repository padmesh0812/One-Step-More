# Project State & Session Notes (One-Step-More)

## Current Live Status
- **Frontend**: Live on **Cloudflare Pages** at [https://www.onestepmore.in](https://www.onestepmore.in) and [https://onestepmore.in](https://onestepmore.in).
- **Backend API**: Live on Render at [https://one-step-more.onrender.com](https://one-step-more.onrender.com).
- **Admin Portal**: Live at [https://one-step-more.onrender.com/admin](https://one-step-more.onrender.com/admin).
- **Custom Domain & SSL**: `onestepmore.in` and `www.onestepmore.in` routed and secured via Cloudflare.
- **Git State**: Clean and synced with `origin/main`.
- **Code Architecture**: 100% modular. Dedicated folders for all components (`src/components/<Name>/`) and pages (`src/pages/<Name>/`), with all copy/strings extracted to `src/constants/`.

---

## Active Priority
- [ ] **Enquiry Direct Email Delivery**:
  - Automatically forward every consultation inquiry straight to the inbox (`onestepmore04@gmail.com`).
  - Code implementation in `server.js` is completed with Nodemailer.
  - Requires adding `SMTP_USER` and `SMTP_PASS` in the Render environment settings.


## Completed Milestones
- [x] **Razorpay Payment Gateway Integration & Testing**:
  - Test Keys generated and verified (`rzp_test_Tk84ZtyeGeEz2E`).
  - Configured in backend environment (`server/.env` and Render dashboard).
  - End-to-end checkout, payment capture, and signature verification successfully tested on `/enroll`.

- [x] **Branded Tax Invoice & Payment Receipt (PDF)**:
  - Dynamic client-side vector PDF generation using `jspdf`.
  - Lazy-loaded chunking to maintain lightning-fast page speed.
  - Comprehensive clinical receipt with OSM Receipt No, Provider info, Candidate bio, Razorpay Order & Payment ID, itemized fees, discount scholarship, digital verification stamp, and Dt. Pragati Mishra's signature seal.
- [x] **Frontend Image Lazy Loading & Async Decoding**:
  - Implemented `loading="lazy"` and `decoding="async"` across all off-screen images (`Services.jsx`, `Blog.jsx`, `About.jsx`, `HomeTestimonials.jsx`, `Footer.jsx`, and Founder sections).
  - Maintained `loading="eager"` with `fetchPriority="high"` on the above-the-fold Hero image for optimal Largest Contentful Paint (LCP).

- [x] **Email & SMS Notifications System (Resend HTTPS API)**:
  - Resend HTTPS REST API integrated into `server.js` (Bypasses Render cloud firewall port blocks).
  - Configured locally in `server/.env` with key `re_gjZWgams_...`.
  - Automated Admin Alert: Sends consultation leads & payment notifications to `onestepmore04@gmail.com`.
  - Automated Client Receipt: Sends welcome email with full transaction summary & next steps to candidate.
  - SMS Notification Hook: Integrated Fast2SMS / carrier dispatch hook in `server.js`.
  - Live configuration: Add `RESEND_API_KEY` & `RESEND_FROM_EMAIL` in Render Environment Settings.

---

## Pending Tasks (Roadmap)

1. ⏳ **MongoDB Atlas Migration** *(PENDING - On hold until owner Gmail login)*:
   - Create free MongoDB Atlas cluster using the official `onestepmore` Gmail.
   - Replace local SQLite with MongoDB (Mongoose / native driver).
   - Ensure inquiries and orders permanently persist across Render restarts.
   - Update `/admin` dashboard to fetch from MongoDB.


3. ⏳ **Cloudinary CDN Optimization** *(PENDING)*:
   - Upload heavy assets to Cloudinary with `/f_auto,q_auto/` for automatic AVIF generation.
