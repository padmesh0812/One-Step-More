import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Main Footer Links */}
      <div className="footer-content-wrap">
        <div className="footer-grid">
          
          {/* Column 1: Get to Know Us */}
          <div className="footer-col">
            <h4 className="footer-title">Get to Know Us</h4>
            <ul className="footer-ul">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  Wellness Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div className="footer-col">
            <h4 className="footer-title">Connect with Us</h4>
            <ul className="footer-ul">
              <li>
                <a 
                  href="https://www.instagram.com/pragati8379?igsh=c3g4NHZ4bzVucjNu" 
                  target="_blank" 
                  rel="noreferrer"
                  className="footer-link"
                >
                  <Instagram size={16} /> Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/1DGZYoWZdT/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="footer-link"
                >
                  <Facebook size={16} /> Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@pragatimishra1941?si=-mK6NiLCwuWHnJYq" 
                  target="_blank" 
                  rel="noreferrer"
                  className="footer-link"
                >
                  <Youtube size={16} /> YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Privacy & Policies */}
          <div className="footer-col">
            <h4 className="footer-title">Privacy & Policies</h4>
            <ul className="footer-ul">
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Disclaimer & Guidance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Let Us Help You */}
          <div className="footer-col">
            <h4 className="footer-title">Let Us Help You</h4>
            <ul className="footer-ul help-ul">
              <li className="footer-help-li">
                <strong className="footer-help-strong">Email Support:</strong>
                hello@onestepmore.com
              </li>
              <li className="footer-help-li">
                <strong className="footer-help-strong">Phone Support:</strong>
                +91 98765 43210
              </li>
              <li className="footer-help-li">
                <strong className="footer-help-strong">Office Address:</strong>
                Gomti Nagar, Lucknow, UP, India
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom (Logo, Copyright & Country Selectors) */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-left">
            <Link to="/" className="footer-logo-link">
              <img 
                src="/assets/images/logo/logo.png" 
                alt="1 Step More Logo" 
                className="footer-logo" 
              />
              <span className="brand-name footer-brand-name">
                <span className="brand-step">1 Step</span> <span className="brand-more">More</span>
              </span>
            </Link>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} <span className="brand-step">1 Step</span> <span className="brand-more">More</span>. All rights reserved. &bull; Every Healthy Habit Begins With One Small Step
            </p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-selector">
              🌐 English
            </div>
            <div className="footer-selector">
              🇮🇳 India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
