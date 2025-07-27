import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const location = useLocation();
  const navRef = useRef(null);



  // Handle scroll effect for header and active section
  useEffect(() => {
    const handleScroll = () => {
      // Header scroll effect
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Active section detection
      const sections = ['Home', 'Experience', 'Skills', 'Projects', 'About', 'Contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Check if a nav link is active
  const isActive = (section) => {
    return activeSection === section ||
      (section === 'home' && location.pathname === '/' && !location.hash);
  };

  // Navigation links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];


  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/#home" onClick={closeMenu}>
            <span>{"<Devfolio />"}</span>
            <div className="logo-highlight"></div>
          </Link>
        </motion.div>

        <motion.button
          className={`menu-btn ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="menu-btn__line top"></span>
          <span className="menu-btn__line middle"></span>
          <span className="menu-btn__line bottom"></span>
        </motion.button>

        <nav
          id="main-navigation"
          ref={navRef}
          className={`nav ${menuOpen ? 'active' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <Link
                  to={`/#${link.id}`}
                  className={`nav-link ${isActive(link.id) ? 'active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive(link.id) ? 'page' : undefined}
                >
                  {link.label}
                  <span className="nav-link-indicator"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;