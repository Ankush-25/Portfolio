import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaMobile, FaBrain } from 'react-icons/fa';
import './About.css';

const About = () => {
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

  const expertise = [
    {
      icon: <FaCode className="expertise-icon" />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with modern frameworks and libraries.'
    },
    {
      icon: <FaServer className="expertise-icon" />,
      title: 'Backend Development',
      description: 'Designing and implementing robust server-side logic and APIs.'
    },
    
    {
      icon: <FaBrain className="expertise-icon" />,
      title: 'Problem Solving',
      description: 'Analyzing complex problems and implementing efficient solutions.'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </motion.div>

        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <h3>Professional Summary</h3>
            <p>
              A dedicated and passionate Software Engineer with 7 months of hands-on experience in the software industry. 
              Proven ability to develop scalable web applications, debug complex issues, and collaborate within Agile teams. 
              Highly flexible, a quick learner, and driven by a continuous desire to grow. Comfortable working across 
              the full stack and committed to writing clean, maintainable code that delivers real value.
            </p>
            
            <h4>What Drives Me</h4>
            <p>
              I'm passionate about creating elegant solutions to complex problems and believe in the power of technology 
              to make a positive impact. My approach combines technical expertise with a strong focus on user experience 
              and clean code principles.
            </p>
            
            <div className="about-cta">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <a href="#portfolio" className="btn btn-outline">View My Work</a>
            </div>
          </motion.div>

          <motion.div className="expertise-grid" variants={itemVariants}>
            {expertise.map((item, index) => (
              <motion.div 
                key={index} 
                className="expertise-card"
                whileHover={{ y: -5 }}
                variants={itemVariants}
              >
                <div className="expertise-icon-wrapper">
                  {item.icon}
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
