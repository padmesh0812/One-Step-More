import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { BRAND, FOOTER_COLUMNS, FOOTER_BOTTOM_CONTENT } from '../../constants';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Main Footer Links */}
      <div className="footer-content-wrap">
        <div className="footer-grid">

          {/* Column 1: Get to Know Us */}
          <div className="footer-col">
            <h4 className="footer-title">{FOOTER_COLUMNS.getKnowUs.title}</h4>
            <ul className="footer-ul">
              {FOOTER_COLUMNS.getKnowUs.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div className="footer-col">
            <h4 className="footer-title">{FOOTER_COLUMNS.connectWithUs.title}</h4>
            <ul className="footer-ul">
              {FOOTER_COLUMNS.connectWithUs.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    {link.icon === 'Instagram' && <Instagram size={16} />}
                    {link.icon === 'Facebook' && <Facebook size={16} />}
                    {link.icon === 'Youtube' && <Youtube size={16} />}
                    {' '}{link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Privacy & Policies */}
          <div className="footer-col">
            <h4 className="footer-title">{FOOTER_COLUMNS.privacyPolicies.title}</h4>
            <ul className="footer-ul">
              {FOOTER_COLUMNS.privacyPolicies.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Let Us Help You */}
          <div className="footer-col">
            <h4 className="footer-title">{FOOTER_COLUMNS.letUsHelp.title}</h4>
            <ul className="footer-ul help-ul">
              <li className="footer-help-li">
                <strong className="footer-help-strong">{FOOTER_COLUMNS.letUsHelp.emailLabel}</strong>
                {' '}{FOOTER_COLUMNS.letUsHelp.email}
              </li>
              <li className="footer-help-li">
                <strong className="footer-help-strong">{FOOTER_COLUMNS.letUsHelp.phoneLabel}</strong>
                {' '}{FOOTER_COLUMNS.letUsHelp.phone}
              </li>
              <li className="footer-help-li">
                <strong className="footer-help-strong">{FOOTER_COLUMNS.letUsHelp.addressLabel}</strong>
                {' '}{FOOTER_COLUMNS.letUsHelp.address}
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
                src={BRAND.logoPng}
                alt={`${BRAND.name} Logo`}
                className="footer-logo"
                loading="lazy"
                decoding="async"
              />
              <span className="brand-name footer-brand-name">
                <span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>
              </span>
            </Link>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} <span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>. {FOOTER_BOTTOM_CONTENT.copyrightNotice}
            </p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-selector">
              {FOOTER_BOTTOM_CONTENT.language}
            </div>
            <div className="footer-selector">
              {FOOTER_BOTTOM_CONTENT.country}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
