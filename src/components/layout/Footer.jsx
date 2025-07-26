import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#" className="logo">Portfolio</a>
            <p>Creating amazing digital experiences</p>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <ul>
              <li><i className='bx bx-envelope'></i> email@example.com</li>
              <li><i className='bx bx-phone'></i> +1 234 567 890</li>
              <li><i className='bx bx-map'></i> City, Country</li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h3>Follow Me</h3>
            <div className="social-links">
              <a href="#" aria-label="GitHub"><i className='bx bxl-github'></i></a>
              <a href="#" aria-label="LinkedIn"><i className='bx bxl-linkedin'></i></a>
              <a href="#" aria-label="Twitter"><i className='bx bxl-twitter'></i></a>
              <a href="#" aria-label="Instagram"><i className='bx bxl-instagram'></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Portfolio. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
