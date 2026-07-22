import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const [backTopHover, setBackTopHover] = useState(false);
  const [hoveredLinkId, setHoveredLinkId] = useState(null);
  const [hoveredSelectorId, setHoveredSelectorId] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Inline styles
  const footerStyle = {
    backgroundColor: '#232F3E',
    color: '#DDD',
    padding: 0,
    marginTop: 'auto',
    fontFamily: '"Poppins", "Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  };

  const contentWrapStyle = {
    padding: '24px 24px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%'
  };

  const colStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    color: '#FFF',
    fontSize: '0.85rem',
    fontWeight: 700,
    marginBottom: '8px',
    marginTop: 0,
    fontFamily: '"Poppins", "Inter", sans-serif'
  };

  const ulStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const getLinkStyle = (id) => ({
    color: hoveredLinkId === id ? '#FFF' : '#CCC',
    fontSize: '0.8rem',
    textDecoration: hoveredLinkId === id ? 'underline' : 'none',
    transition: 'color 0.15s',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  });

  const bottomStyle = {
    backgroundColor: '#19222D',
    padding: '12px 24px',
    borderTop: '1px solid #1f2a37',
    width: '100%',
    boxSizing: 'border-box'
  };

  const bottomContainerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    width: '100%'
  };

  const bottomLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  };

  const bottomRightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const getSelectorStyle = (id) => ({
    border: '1px solid #848688',
    borderColor: hoveredSelectorId === id ? '#a2a6ac' : '#848688',
    borderRadius: '3px',
    padding: '4px 10px',
    color: hoveredSelectorId === id ? '#fff' : '#CCC',
    fontSize: '0.75rem',
    background: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'border-color 0.15s, color 0.15s'
  });

  const copyrightStyle = {
    fontSize: '0.75rem',
    color: '#969696',
    margin: 0
  };

  return (
    <footer style={footerStyle}>
      {/* Main Footer Links */}
      <div style={contentWrapStyle}>
        <div style={gridStyle}>
          
          {/* Column 1: Get to Know Us */}
          <div style={colStyle}>
            <h4 style={titleStyle}>Get to Know Us</h4>
            <ul style={ulStyle}>
              <li>
                <Link 
                  to="/" 
                  style={getLinkStyle('home')}
                  onMouseEnter={() => setHoveredLinkId('home')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  style={getLinkStyle('about')}
                  onMouseEnter={() => setHoveredLinkId('about')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  style={getLinkStyle('services')}
                  onMouseEnter={() => setHoveredLinkId('services')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  style={getLinkStyle('blog')}
                  onMouseEnter={() => setHoveredLinkId('blog')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Wellness Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  style={getLinkStyle('contact')}
                  onMouseEnter={() => setHoveredLinkId('contact')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div style={colStyle}>
            <h4 style={titleStyle}>Connect with Us</h4>
            <ul style={ulStyle}>
              <li>
                <a 
                  href="https://www.instagram.com/pragati8379?igsh=c3g4NHZ4bzVucjNu" 
                  target="_blank" 
                  rel="noreferrer"
                  style={getLinkStyle('insta')}
                  onMouseEnter={() => setHoveredLinkId('insta')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  <Instagram size={16} /> Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/1DGZYoWZdT/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={getLinkStyle('fb')}
                  onMouseEnter={() => setHoveredLinkId('fb')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  <Facebook size={16} /> Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@pragatimishra1941?si=-mK6NiLCwuWHnJYq" 
                  target="_blank" 
                  rel="noreferrer"
                  style={getLinkStyle('yt')}
                  onMouseEnter={() => setHoveredLinkId('yt')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  <Youtube size={16} /> YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Privacy & Policies */}
          <div style={colStyle}>
            <h4 style={titleStyle}>Privacy & Policies</h4>
            <ul style={ulStyle}>
              <li>
                <Link 
                  to="/privacy" 
                  style={getLinkStyle('privacy')}
                  onMouseEnter={() => setHoveredLinkId('privacy')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  style={getLinkStyle('terms')}
                  onMouseEnter={() => setHoveredLinkId('terms')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  style={getLinkStyle('refund')}
                  onMouseEnter={() => setHoveredLinkId('refund')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  style={getLinkStyle('disclaim')}
                  onMouseEnter={() => setHoveredLinkId('disclaim')}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Disclaimer & Guidance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Let Us Help You */}
          <div style={colStyle}>
            <h4 style={titleStyle}>Let Us Help You</h4>
            <ul style={{ ...ulStyle, gap: '6px' }}>
              <li style={{ color: '#CCC', fontSize: '0.85rem' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Email Support:</strong>
                hello@onestepmore.com
              </li>
              <li style={{ color: '#CCC', fontSize: '0.85rem' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Phone Support:</strong>
                +91 98765 43210
              </li>
              <li style={{ color: '#CCC', fontSize: '0.85rem' }}>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Office Address:</strong>
                Gomti Nagar, Lucknow, UP, India
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom (Logo, Copyright & Country Selectors) */}
      <div style={bottomStyle}>
        <div style={bottomContainerStyle}>
          <div style={bottomLeftStyle}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img 
                src="/assets/images/logo/logo.jpeg" 
                alt="One Step More Logo" 
                style={{ height: '32px', borderRadius: '4px' }} 
              />
            </Link>
            <p style={copyrightStyle}>
              &copy; {new Date().getFullYear()} One Step More. All rights reserved. &bull; Every Healthy Habit Begins With One Small Step
            </p>
          </div>
          <div style={bottomRightStyle}>
            <div 
              style={getSelectorStyle('lang')}
              onMouseEnter={() => setHoveredSelectorId('lang')}
              onMouseLeave={() => setHoveredSelectorId(null)}
            >
              🌐 English
            </div>
            <div 
              style={getSelectorStyle('country')}
              onMouseEnter={() => setHoveredSelectorId('country')}
              onMouseLeave={() => setHoveredSelectorId(null)}
            >
              🇮🇳 India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
