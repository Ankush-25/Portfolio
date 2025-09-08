import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Ankush-25', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/', label: 'LinkedIn' },
    { icon: <FaXTwitter />, url: 'https://x.com/bhandariji1298/', label: 'Twitter' },
    { icon: <FaEnvelope />, url: 'mailto:bhandariji1398@gmail.com', label: 'Email' }
  ];
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="footer">
      
      <div className="container">
        <motion.div 
          className="footer-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <motion.div className="footer-about" variants={itemVariants}>
            <h3 className="footer-logo">Ankit Bhandari</h3>
            <p className="footer-about-text">
              A passionate Full Stack Developer dedicated to creating exceptional digital experiences 
              with clean, efficient code and innovative solutions.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="footer-links" variants={itemVariants}>
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div className="footer-contact" variants={itemVariants}>
            <h3 className="footer-heading">Get In Touch</h3>
            <ul>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>bhandariji1398@gmail.com</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>+91 6397098909</span>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>Dehradun, India</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="copyright">
            &copy; {currentYear} Ankit Bhandari. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
