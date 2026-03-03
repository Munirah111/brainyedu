import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/packages', label: 'Packages' },
    { path: '/#about', label: 'About' },
    { path: '/#services', label: 'Services' },
    { path: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-text">Brainy Edu</span>
          <span className="logo-network">Network</span>
        </Link>

        <button 
          className={`navbar-toggle ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            link.path.startsWith('/#') ? (
              <a
                key={link.path}
                href={link.path}
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.path.substring(2);
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                {link.path === '/packages' && <span className="nav-badge">New</span>}
              </Link>
            )
          ))}
          <Link to="/contact" className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>
            Enroll Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;