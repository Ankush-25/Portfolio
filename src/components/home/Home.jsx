import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import {
  FaGithub, FaLinkedinIn, FaTwitter, FaDribbble,
} from 'react-icons/fa';
import './Home.css';

const professions = [
  "Fullstack Developer",
  "Machine Learning Enthusiast",
  "MERN Stack Engineer"
];

const socialLinks = [
  { icon: <FaGithub />, url: 'https://github.com/', label: 'GitHub', color: '#6e5494' },
  { icon: <FaLinkedinIn />, url: 'https://linkedin.com/', label: 'LinkedIn', color: '#0077b5' },
  { icon: <FaTwitter />, url: 'https://twitter.com/', label: 'Twitter', color: '#1da1f2' },
  { icon: <FaDribbble />, url: 'https://dribbble.com/', label: 'Dribbble', color: '#ea4c89' },
];

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

const Home = () => {
  const [professionIndex, setProfessionIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Ensure the page loads at the top and prevent auto-scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main-container" ref={ref} aria-label="Introduction">
      <div className="radial-gradient"></div>

      <section id="home" className="home">
        <div className="container home-grid">

          {/* Content Section */}
          <motion.div 
            className="home-content"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="home-title">
              Hi, I'm <span className="highlight">Ankit Bhandari</span>
            </motion.h1>

            <motion.div className="text-animate" variants={itemVariants}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={professionIndex}
                  className="profession-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {professions[professionIndex]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={itemVariants} className="home-description">
              I craft exceptional digital experiences with clean, efficient code and beautiful designs.
            </motion.p>

            <motion.div className="btn-box" variants={itemVariants}>
              <ScrollLink to="contact" smooth duration={800} className="btn btn-primary">Get In Touch</ScrollLink>
              <ScrollLink to="projects" smooth duration={800} offset={-80} className="btn btn-secondary">View My Work</ScrollLink>
            </motion.div>

            <motion.div className="home-sci" variants={itemVariants}>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    backgroundColor: social.color,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="home-image"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            <div className="image-wrapper">
              <div className="glow-effect" />
              <div className="image-container">
                <img
                  src="/photo.jpg"
                  alt="Ankit Bhandari"
                  className="profile-image"
                  loading="lazy"
                  width="400"
                  height="400"
                  onError={(e) => e.target.parentElement.classList.add('placeholder-fallback')}
                />
                <div className="tech-stack">
                  {['React', 'Node.js', 'Python', 'MongoDB'].map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (i * 0.1), type: 'spring', stiffness: 200 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll Down</span>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
