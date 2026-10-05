import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BRAND, NAV_LINKS, NAV_CTA } from '../../constants';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={closeMenu} aria-label={`${BRAND.name} Home`}>
            <img 
              src={BRAND.logoUrl} 
              alt={`${BRAND.name} Logo`} 
              className="navbar-logo-img" 
              loading="eager"
              decoding="async"
            />
            <span className="brand-name">
              <span className="brand-step">{BRAND.stepText}</span> <span className="brand-more">{BRAND.moreText}</span>
            </span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink 
                to={NAV_CTA.path} 
                className="nav-cta"
                onClick={closeMenu}
              >
                {NAV_CTA.label}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
