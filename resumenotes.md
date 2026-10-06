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

- [x] **Frontend Performance & Data-Saving Optimizations**:
  - **Route Code Splitting**: Converted all pages in `App.jsx` to `React.lazy()` + `<Suspense />` (cut initial bundle by ~65%).
  - **Deferred Razorpay SDK**: Removed heavy static script from `index.html`; dynamically injected on-demand during checkout.
  - **Modular CSS Splitting**: Reduced `index.css` from 53.7 KB to 28.5 KB (47% drop) by moving page rules to `Blog.css`, `Contact.css`, and `PrivacyPolicy.css`.
  - **Lazy Interactive Tools**: `<WellnessQuiz />` and `<BmiCalculator />` load dynamically on scroll with subtle fallback spinners.
  - **Font Variant Slimming**: Trimmed Inter & Poppins Google Fonts to only essential weights (saved ~40 KB).
  - **Hero LCP Preload**: Preloaded WebP hero image in `<head>` for instant mobile display.
  - **Vendor Caching**: Configured `manualChunks` in `vite.config.js` for long-term browser caching of React and Lucide icons.

- [x] **Technical SEO, Rich Snippets & Social Sharing**:
  - Created standard `public/robots.txt` referencing the sitemap and allowing public crawling.
  - Created `public/sitemap.xml` with all 7 site routes, priorities, and change frequencies.
  - Added Open Graph & Twitter Cards for branded WhatsApp/social link previews with logo and hero banner.
  - Added Schema.org Structured Data (`JSON-LD`) for `HealthAndBeautyBusiness` & `Person` (Dt. Pragati Mishra) for Google Rich Snippets and local search rankings.
  - Added Canonical URL tag to prevent search engine duplicate-content penalties.

---

## Remaining Work & Future Roadmap (To Be Done Later)

### 1. 💳 Razorpay Live Mode Activation (Payment Gateway)
- **Status**: Currently running in Test Mode (`rzp_test_...`).
- **Steps**:
  1. Complete KYC / business bank account verification on [Razorpay Dashboard](https://dashboard.razorpay.com/).
  2. Toggle to **Live Mode** and generate your Live API Keys (`rzp_live_...`).
  3. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in:
     - Render Dashboard -> Environment Variables.
     - Local `server/.env`.

---

### 2. 🔍 Google Search Console & Sitemap Submission (SEO Activation)
- **Status**: Technical files (`sitemap.xml` and `robots.txt`) are live on Cloudflare Pages.
- **Steps**:
  1. Open [Google Search Console](https://search.google.com/search-console).
  2. Add property `https://www.onestepmore.in` (verify with Cloudflare DNS TXT record or HTML tag).
  3. Under **Sitemaps**, submit `https://www.onestepmore.in/sitemap.xml`.
  4. Repeat on [Bing Webmaster Tools](https://www.bing.com/webmasters) (can import directly from Google Search Console).

---

### 3. 📍 Google Business Profile / Local SEO (High-Priority for Local Clients)
- **Status**: Not yet created.
- **Steps**:
  1. Create a profile on [Google Business](https://business.google.com/) for **1 Step More - Dt. Pragati Mishra**.
  2. Add address (Gomti Nagar, Lucknow), category (Nutritionist / Dietitian / Yoga Studio), and website link.
  3. Add photos, consultation hours, and request 5-star reviews from past happy clients to rank in Google Maps local 3-pack.

---

### 4. 📊 Analytics & Marketing Conversion Pixels (Optional)
- **Google Analytics 4 (GA4)**:
  - Create GA4 Measurement Stream (`G-XXXXXXXXXX`).
  - Track total traffic, visitor geographic location, most read blog posts, and bounce rate.
- **Meta (Facebook/Instagram) Pixel**:
  - Needed if running paid Instagram/Facebook ads.
  - Track `Lead` events on `/contact` form submit and `Purchase` events on Razorpay completion.
