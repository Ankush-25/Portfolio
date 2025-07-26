import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaServer, FaRobot, FaChartLine, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'PersoGitHub – GitHub Workflow Application',
      description: 'A full-stack GitHub clone with real-time collaboration features',
      technologies: ['MongoDB', 'Express.js', 'React (Vite)', 'Node.js', 'AWS', 'Socket.IO'],
      icon: <FaGithub className="project-icon" />,
      features: [
        'Built a full-stack GitHub clone using MERN stack',
        'Integrated JWT-based authentication with role-based access control',
        'Deployed on AWS Amplify with file uploads via AWS S3',
        'Created a custom CLI for Git commands simulation',
        'Added real-time collaboration with Socket.IO'
      ],
      githubLink: 'https://github.com/yourusername/persogithub',
      demoLink: 'https://persogithub-demo.com',
      color: "#6366f1"
    },
    {
      id: 2,
      title: 'Stock Price Prediction using ML',
      description: 'Machine learning models for stock price prediction',
      technologies: ['Python', 'TensorFlow', 'LSTM', 'Linear Regression', 'Pandas', 'Matplotlib'],
      icon: <FaChartLine className="project-icon" />,
      features: [
        'Predicted Apple Inc. stock prices using LSTM and Linear Regression models (92% accuracy)',
        'Pulled data from Yahoo Finance and applied moving averages',
        'Visualized trends and model performance',
        'Evaluated performance using R² Score, MAE, and MSE metrics'
      ],
      githubLink: 'https://github.com/yourusername/stock-prediction',
      demoLink: 'https://stock-prediction-demo.com',
      color: "#10b981"
    },
    {
      id: 3,
      title: 'AI Voice Assistant',
      description: 'Smart assistant with voice recognition and task automation',
      technologies: ['Python', 'SpeechRecognition', 'Gemini API', 'Text-to-Speech'],
      icon: <FaRobot className="project-icon" />,
      features: [
        'Developed using speech recognition and Gemini API for conversational responses',
        'Automated tasks like opening apps and fetching information',
        'Integrated weather and news APIs for real-time data',
        'Implemented email sending functionality',
        'Enhanced with natural language processing capabilities'
      ],
      githubLink: 'https://github.com/yourusername/ai-voice-assistant',
      demoLink: 'https://ai-assistant-demo.com',
      color: "#f59e0b"
    }
  ];

  const containerRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15,
        mass: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className="projects-section"
    >
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="section-number">04.</span> Featured Projects
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My latest work and innovative solutions
        </motion.p>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          ref={containerRef}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                boxShadow: `0 25px 50px -15px ${project.color}20`
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="project-header">
                <motion.div 
                  className="project-icon-wrapper"
                  style={{ backgroundColor: `${project.color}20`, borderColor: project.color }}
                  variants={iconVariants}
                >
                  {project.icon}
                </motion.div>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
              
              <div className="project-features">
                <h4 className="features-title">Key Features:</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="feature-item"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1), duration: 0.4 }}
                      whileHover={{ x: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="feature-bullet" style={{ backgroundColor: project.color }}></span>
                      <span className="feature-text">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="project-footer">
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <motion.span 
                      key={index} 
                      className="tech-tag"
                      whileHover={{ scale: 1.05, backgroundColor: `${project.color}20` }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="project-actions">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button"
                    style={{ backgroundColor: `${project.color}20`, borderColor: project.color }}
                  >
                    <FaGithub className="action-icon" />
                    Source Code
                  </a>
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button"
                    style={{ backgroundColor: `${project.color}20`, borderColor: project.color }}
                  >
                    <FaExternalLinkAlt className="action-icon" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;