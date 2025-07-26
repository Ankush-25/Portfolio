import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const [professionIndex, setProfessionIndex] = useState(0);
  const professions = [
    "Fullstack Developer",
    "Machine Learning Enthusiast",
    "Mern Stack Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [professions.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 12
      }
    }
  };

  const socialLinks = [
    { icon: 'bxl-github', url: 'https://github.com/' },
    { icon: 'bxl-linkedin', url: 'https://linkedin.com/' },
    { icon: 'bxl-twitter', url: 'https://twitter.com/' },
    { icon: 'bxl-dribbble', url: 'https://dribbble.com/' }
  ];

  return (
    <section id="home" className="home">
      <div className="container">
        <div className="home-grid">
          <motion.div 
            className="home-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="home-title">
              Hi, I'm <span className="highlight">Ankit Bhandari</span>
            </motion.h1>
            
            <motion.div className="text-animate" variants={itemVariants}>
              <h2 className="profession-text">
                {professions[professionIndex]}
              </h2>
            </motion.div>
            
            <motion.p variants={itemVariants} className="home-description">
              I craft exceptional digital experiences with clean, efficient code and beautiful designs.
              Focused on creating intuitive user interfaces that drive engagement and deliver results.
            </motion.p>
            
            <motion.div className="btn-box" variants={itemVariants}>
              <a href="#contact" className="btn btn-primary">
                Hire Me
              </a>
              <a href="#portfolio" className="btn btn-secondary">
                View Portfolio
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="home-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <div className="image-wrapper">
              <div className="glow-effect"></div>
              <div className="placeholder-image">
                <div className="placeholder-content">
                  <i className='bx bx-code-alt'></i>
                  <img src="./photo.jpg" alt="Your Photo" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="home-sci">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.icon.replace('bxl-', '')}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.8 + index * 0.1,
              type: 'spring',
              stiffness: 300
            }}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="social-link"
          >
            <i className={`bx ${social.icon}`}></i>
          </motion.a>
        ))}
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Home;