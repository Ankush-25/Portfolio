import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRobot, FaChartLine, FaCode, FaServer,FaAws } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiSocketdotio, SiTensorflow, SiPandas, SiPython } from 'react-icons/si';

// Styles
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'PersoGitHub',
    subtitle: 'GitHub Workflow Application',
    description: 'A full-stack GitHub clone with real-time collaboration features and version control system simulation',
    technologies: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'React', icon: <SiReact /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'AWS', icon: <FaAws /> },
      { name: 'Socket.IO', icon: <SiSocketdotio /> }
    ],
    icon: <FaGithub className="project-icon" />,
    category: 'web',
    github: 'https://github.com/yourusername/persogithub',
    demo: 'https://persogithub-demo.com',
    features: [
      'Built a full-stack GitHub clone using MERN stack with TypeScript',
      'JWT-based authentication with role-based access control',
      'Real-time collaboration using Socket.IO',
      'File uploads with AWS S3 integration',
      'Custom Git CLI simulation for version control',
      'Responsive design with mobile optimization'
    ]
  },
  {
    id: 2,
    title: 'Stock Price Prediction',
    subtitle: 'Machine Learning Application',
    description: 'Advanced stock price forecasting using LSTM and Linear Regression models',
    technologies: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'LSTM', icon: <FaChartLine /> },
      { name: 'Matplotlib', icon: <FaChartLine /> }
    ],
    icon: <FaChartLine className="project-icon" />,
    category: 'ml',
    github: 'https://github.com/yourusername/stock-prediction',
    demo: 'https://stock-prediction-demo.com',
    features: [
      'Achieved 92% accuracy in stock price prediction',
      'Implemented LSTM and Linear Regression models',
      'Real-time data fetching from Yahoo Finance API',
      'Interactive visualization of trends and predictions',
      'Performance metrics: R² Score, MAE, and MSE',
      'User-friendly web interface for model interaction'
    ]
  },
  {
    id: 3,
    title: 'AI Voice Assistant',
    subtitle: 'Smart Voice-Controlled Assistant',
    description: 'Intelligent voice assistant with natural language processing and task automation',
    technologies: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Gemini API', icon: <FaRobot /> },
      { name: 'SpeechRecognition', icon: <FaRobot /> },
      { name: 'JavaScript', icon: <FaCode /> },
      { name: 'Node.js', icon: <SiNodedotjs /> }
    ],
    icon: <FaRobot className="project-icon" />,
    category: 'ai',
    github: 'https://github.com/yourusername/ai-voice-assistant',
    demo: 'https://ai-assistant-demo.com',
    features: [
      'Voice-controlled interface with speech-to-text and text-to-speech',
      'Integration with Gemini API for natural language understanding',
      'Task automation (email, calendar, system controls)',
      'Real-time weather and news updates',
      'Cross-platform compatibility',
      'Custom command support'
    ]
  }
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'ai', name: 'AI & Automation' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="projects-container"
        >
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            <span className="section-number">02.</span> Featured Projects
          </motion.h2>

          <motion.div 
            className="project-filters"
            variants={itemVariants}
          >
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                aria-label={`Filter ${category.name}`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="projects-grid"
            variants={containerVariants}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.article 
                  key={project.id} 
                  className="project-card"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-content">
                    <div className="project-header">
                      <div className="project-icon">
                        {project.icon}
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-subtitle">{project.subtitle}</p>
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech.icon}
                          <span className="tech-name">{tech.name}</span>
                        </span>
                      ))}
                    </div>
                    
                    <div className="project-links">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div> {/* Close project-content */}
                </motion.article>
              ))
            ) : (
              <div className="no-projects">
                <p>No projects found in this category.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal-overlay"
            onClick={() => setSelectedProject(null)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
          >
            <motion.div 
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
              
              <div className="modal-header">
                <div className="modal-icon">
                  {selectedProject.icon}
                </div>
                <div>
                  <h3>{selectedProject.title}</h3>
                  {selectedProject.subtitle && <p className="modal-subtitle">{selectedProject.subtitle}</p>}
                </div>
              </div>

              <div className="modal-content">
                <div className="modal-description">
                  <h4>Overview</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="modal-features">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-bullet">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-technologies">
                  <h4>Technologies Used</h4>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech.icon}
                        <span className="tech-name">{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-links">
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-github"
                    >
                      <FaGithub /> View on GitHub
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-demo"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
