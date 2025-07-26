import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble } from 'react-icons/fa';
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
    { 
      icon: <FaGithub />, 
      url: 'https://github.com/',
      ariaLabel: 'GitHub',
      color: '#6e5494'
    },
    { 
      icon: <FaLinkedinIn />, 
      url: 'https://linkedin.com/',
      ariaLabel: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/',
      ariaLabel: 'Twitter',
      color: '#1da1f2'
    },
    { 
      icon: <FaDribbble />, 
      url: 'https://dribbble.com/',
      ariaLabel: 'Dribbble',
      color: '#ea4c89'
    }
  ];

  // Check if component is in view for animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="main-container" ref={ref}>
      {/* Hero Section */}
      <section id="home" className="home">
        <div className="container">
          <div className="home-grid">
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
                    transition={{ duration: 0.3 }}
                  >
                    {professions[professionIndex]}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>
              
              <motion.p variants={itemVariants} className="home-description">
                I craft exceptional digital experiences with clean, efficient code and beautiful designs.
                Focused on creating intuitive user interfaces that drive engagement and deliver results.
              </motion.p>
              
              <motion.div className="btn-box" variants={itemVariants}>
                <ScrollLink 
                  to="contact" 
                  smooth={true} 
                  duration={800} 
                  className="btn btn-primary"
                  aria-label="Get in touch"
                >
                  Get In Touch
                </ScrollLink>
                <ScrollLink 
                  to="projects" 
                  smooth={true} 
                  duration={800} 
                  offset={-80}
                  className="btn btn-outline"
                  aria-label="View my work"
                >
                  View My Work
                </ScrollLink>
              </motion.div>
              
              <motion.div className="home-sci" variants={itemVariants}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.ariaLabel}
                    whileHover={{ 
                      y: -5,
                      scale: 1.1,
                      backgroundColor: social.color,
                      borderColor: social.color
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5 + (index * 0.1),
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }}
                    style={{
                      '--social-color': social.color,
                      '--social-hover-color': `${social.color}20`
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="home-image"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                } 
              } : {}}
            >
              <div className="image-container">
                <div className="glow-effect"></div>
                <img 
                  src="/photo.jpg" 
                  alt="Ankit Bhandari" 
                  className="profile-image"
                  loading="eager"
                  width="400"
                  height="400"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/6c63ff?text=AB';
                  }}
                />
                <div className="tech-stack">
                  {['React', 'Node.js', 'Python', 'MongoDB'].map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.8 + (i * 0.1),
                        type: 'spring',
                        stiffness: 200,
                        damping: 12
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Other sections are rendered by HomePage component */}
    </div>
  );
};

export default Home;