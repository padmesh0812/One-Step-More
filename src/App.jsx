import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, WhatsAppWidget } from './components';

// Route-based code splitting: download page code on-demand only when visited
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Enroll = lazy(() => import('./pages/Enroll'));

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Subtle, lightweight loading skeleton/spinner for route transitions
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--background)'
  }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '3px solid rgba(46, 125, 50, 0.15)',
      borderTopColor: 'var(--primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/enroll" element={<Enroll />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppWidget />
    </Router>
  );
}

export default App;
