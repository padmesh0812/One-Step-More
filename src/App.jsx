import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Enroll from './pages/Enroll';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/enroll" element={<Enroll />} />
      </Routes>
      <Footer />
      <WhatsAppWidget />
    </Router>
  );
}

export default App;
