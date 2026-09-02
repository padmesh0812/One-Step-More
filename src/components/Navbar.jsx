import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
          <Link to="/" className="logo" onClick={closeMenu} aria-label="1 Step More Home">
            <img 
              src="/assets/images/logo/logo.png" 
              alt="1 Step More Logo" 
              className="navbar-logo-img" 
            />
            <span className="brand-name">
              <span className="brand-step">1 Step</span> <span className="brand-more">More</span>
            </span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/services" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Wellness Blog
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className="nav-cta"
                onClick={closeMenu}
              >
                Book consultation
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
