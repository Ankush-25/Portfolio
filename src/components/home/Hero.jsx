import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const skills = ["JavaScript", "React", "Node.js", "Python", "MongoDB", "Express", "Redux"];
  
  return (
    <section id="home" className="hero">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`shape shape-${i + 1}`}
            animate={{
              y: [0, 15, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4>Hi, I'm</h4>
            <h1 className="gradient-text">Ankit Bhandari</h1>
            <h2>Full Stack Developer</h2>
            <p className="bio">
              Passionate developer creating efficient web solutions with modern technologies and clean code.
            </p>
            
            <div className="cta-buttons">
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="#projects"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </div>
            
            <div className="social-links">
              {[
                { icon: <FaGithub />, url: 'https://github.com/yourusername' },
                { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername' },
                { icon: <FaEnvelope />, url: 'mailto:your.email@example.com' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="availability">
              <span className="status-dot"></span>
              <span>Available for work</span>
            </div>
          </motion.div>
          
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="profile-image-container">
              <div className="profile-image">
                {/* Replace with actual profile image */}
                <div className="placeholder-image">
                  <FaCode className="code-icon" />
                </div>
              </div>
              <div className="floating-tags">
                {skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="skill-tag"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
