import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import About from '../about/About';
import Skills from '../skills/Skills';
import Experience from '../experience/Experience';
import Projects from '../projects/Projects';
import Education from '../education/Education';
import Certifications from '../certifications/Certifications';
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
    <div className="main-container">
      {/* Hero Section */}
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
              
              <motion.div className="cta-buttons" variants={itemVariants}>
                <a href="#contact" className="btn btn-primary">
                  Get In Touch
                </a>
                <a href="#portfolio" className="btn btn-outline">
                  View My Work
                </a>
              </motion.div>
              
              <motion.div className="social-links" variants={itemVariants}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.icon.replace('bxl-', '')}
                  >
                    <i className={`bx ${social.icon}`}></i>
                  </a>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="image-container">
                <div className="glow-effect"></div>
                <img 
                  src="./photo.jpg" 
                  alt="Ankit Bhandari" 
                  className="profile-image"
                />
                <div className="tech-stack">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>Python</span>
                  <span>MongoDB</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Content Sections */}
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
    </div>
  );
};

export default Home;