import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRobot, FaChartLine, FaCode, FaServer, FaAws, FaBrain, FaGlobe } from 'react-icons/fa';
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
    github: 'https://github.com/Ankush-25/PersonalGit',
    demo: 'https://github.com/Ankush-25/PersonalGit',
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
    github: 'https://github.com/Ankush-25/Stock-Market-prediction-Model-',
    demo: 'https://github.com/Ankush-25/Stock-Market-prediction-Model-',
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
    title: "GenAI Chat Application",
    subtitle: "Real-time AI Chat Application",
    description: "A real-time AI chat application built with Gemini API and local LLM integration. Features multi-session chat, persistent context, and PDF export capabilities with a fully responsive UI.",
    technologies: [
      { name: "Gemini API", icon: <FaRobot /> },
      { name: "Local LLM", icon: <FaBrain /> },
      { name: "React", icon: <SiReact /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Tailwind CSS", icon: <FaCode /> }
    ],
    icon: <FaRobot className="project-icon" />,
    category: 'ai',
    github: "https://github.com/Ankush-25/genai-chat-app",
    demo: "",
    features: [
      "Real-time chat powered by Gemini API and local LLM integration",
      "Multi-session chat support",
      "Persistent context across conversations",
      "PDF export functionality for chat histories",
      "Fully responsive UI ensuring seamless experience across all devices"
    ]
  },
  {
    id: 4,
    title: "Perfect Guess Game",
    subtitle: "Number Guessing Game",
    description: "An interactive game program where the computer generates a random number and the player has to guess it, receiving hints for each attempt.",
    technologies: [
      { name: "Python", icon: <SiPython /> }
    ],
    icon: <FaCode className="project-icon" />,
    category: 'games',
    github: "https://github.com/Ankush-25/Perfect-Guess-Game",
    demo: "",
    features: [
      "Random number generation",
      "Turn-based user interaction with hints",
      "Victory notification when guessed correctly"
    ]
  },
  {
    id: 5,
    title: "Snake Water Gun Game",
    subtitle: "Classic Python Terminal Game",
    description: "Python-based implementation of the 'Snake Water Gun' game, a variation of Rock Paper Scissors, playable in the terminal.",
    technologies: [
      { name: "Python", icon: <SiPython /> }
    ],
    icon: <FaCode className="project-icon" />,
    category: 'games',
    github: "https://github.com/Ankush-25/Snake-Water-Game-using-Python-",
    demo: "",
    features: [
      "Engaging command-line interface",
      "User vs computer gameplay logic",
      "Simple, replayable game mechanics"
    ]
  },
  {
    id: 6,
    title: "Hiring-Store",
    subtitle: "AI Job Portal",
    description: "An AI-powered full-stack job portal built with Node.js, Express, and MongoDB. Integrated Gemini API for intelligent job classification and filtering, with a scalable scraping pipeline using Playwright and Cheerio for DOM parsing.",
    technologies: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Gemini API", icon: <FaRobot /> },
      { name: "Playwright", icon: <FaCode /> },
      { name: "Cheerio", icon: <FaCode /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "Nginx", icon: <FaCode /> }
    ],
    icon: <FaCode className="project-icon" />,
    category: 'web',
    github: "https://github.com/Ankush-25/Hiringstore",
    demo: "",
    features: [
      "AI-powered job classification and filtering using Gemini API",
      "Scalable scraping pipeline using Playwright and Cheerio with DOM parsing",
      "Responsive job listings and application interface",
      "User authentication for employers and job seekers",
      "Job posting, editing, and application tracking functionalities",
      "Modern UI/UX for seamless interaction",
      "Role-based dashboards for companies and candidates",
      "Deployed on AWS with Nginx routing"
    ]
  },
  {
    id: 7,
    title: "Personal Portfolio Website",
    subtitle: "Responsive Developer Portfolio",
    description: "A responsive personal portfolio website built with React.js and Tailwind CSS to showcase professional experience, projects, skills, and certifications.",
    technologies: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Tailwind CSS", icon: <FaCode /> },
      { name: "Vercel", icon: <FaGlobe /> }
    ],
    icon: <FaGlobe className="project-icon" />,
    category: 'web',
    github: "https://github.com/Ankush-25/my-portfolio",
    demo: "",
    features: [
      "Responsive portfolio layout for desktop, tablet, and mobile devices",
      "Accessible navigation and content structure",
      "Interactive sections for experience, projects, skills, and certifications",
      "Deployed on Vercel"
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
    { id: 'ai', name: 'AI & Automation' },
    { id: 'games', name: 'Games' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.5
      }
    },
    hover: {
      y: -8,
      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300, // Reduced stiffness for less bounce
        damping: 25,
        mass: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  };

  const buttonTap = {
    scale: 0.98
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
            className="section-title mb-4"
            style={{ display: 'flex', justifyContent: 'center' }}
            variants={itemVariants}
          >
            Featured Projects

          </motion.h2>

          <motion.div
            className="project-filters"
            variants={itemVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={buttonHover}
                whileTap={buttonTap}
                aria-label={`Filter ${category.name}`}
                aria-pressed={selectedCategory === category.id}
              >
                {category.name}
                {selectedCategory === category.id && (
                  <motion.span
                    className="active-indicator"
                    layoutId="activeFilter"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
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
                  initial="hidden"
                  animate="visible"
                  whileHover={['hover', 'visible']}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`View details of ${project.title}`}
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
                          className="project-link border-radius-full border-gray-600 w-fit"
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
                  </div>
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
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ 
              opacity: 1,
              backdropFilter: 'blur(8px)',
              transition: { duration: 0.3 }
            }}
            exit={{ 
              opacity: 0,
              backdropFilter: 'blur(0px)',
              transition: { duration: 0.2 }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem',
              overflowY: 'auto',
              WebkitBackdropFilter: 'blur(8px)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  type: 'spring',
                  damping: 25,
                  stiffness: 500,
                  delay: 0.1
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 20, 
                scale: 0.98,
                transition: { 
                  duration: 0.2 
                } 
              }}
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '16px',
                padding: '1.5rem', // Reduced padding for mobile
                maxWidth: 'min(90vw, 800px)',
                width: '100%',
                maxHeight: '85vh', // Slightly reduced height to ensure close button visibility
                overflowY: 'auto',
                position: 'relative',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transformOrigin: 'center',
                color: 'var(--text-color)'
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.button
                className="close-modal"
                onClick={() => setSelectedProject(null)}
                initial={{ opacity: 0.7, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-color)',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
                aria-label="Close modal"
              >
                &times;
              </motion.button>

              <motion.div 
                className="modal-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
              >
                <motion.div 
                  className="modal-icon"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {selectedProject.icon}
                </motion.div>
                <div>
                  <h3 id="modal-title" className="text-2xl font-bold mb-1">{selectedProject.title}</h3>
                  {selectedProject.subtitle && (
                    <p className="modal-subtitle" style={{ color: 'var(--text-secondary)' }}>{selectedProject.subtitle}</p>
                  )}
                </div>
              </motion.div>

              <motion.div 
                className="modal-content space-y-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                <motion.div 
                  className="modal-description p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                  whileHover={{ x: 2 }}
                >
                  <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>Overview</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>{selectedProject.description}</p>
                </motion.div>

                <motion.div 
                  className="modal-features p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                  whileHover={{ x: 2 }}
                >
                  <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: 0.25 + (index * 0.05),
                            type: 'spring',
                            stiffness: 500,
                            damping: 25
                          }
                        }}
                      >
                        <span className="feature-bullet mr-2 mt-1" style={{ color: 'var(--primary)' }}>•</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="modal-technologies p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                  whileHover={{ x: 2 }}
                >
                  <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>Technologies Used</h4>
                  <div className="tech-tags flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span 
                        key={index} 
                        className="tech-tag flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                        style={{ 
                          backgroundColor: 'var(--card-bg)', 
                          border: '1px solid var(--border-color)' 
                        }}
                        whileHover={{ y: -2, backgroundColor: 'var(--hover-bg)' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { 
                            delay: 0.3 + (index * 0.05),
                            type: 'spring',
                            stiffness: 500,
                            damping: 30
                          }
                        }}
                      >
                        <span style={{ color: 'var(--primary)' }}>{tech.icon}</span>
                        <span style={{ color: 'var(--text-color)' }}>{tech.name}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="modal-links flex gap-4 mt-8 pt-4 border-t border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.4 }
                  }}
                >
                  {selectedProject.github && (
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-github flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)'
                      }}
                      whileHover={{ 
                        y: -2, 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'var(--hover-bg)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub className="text-lg" />
                      <span>View on GitHub</span>
                    </motion.a>
                  )}
                  {selectedProject.demo && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-demo flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: 'var(--primary)', 
                        color: '#fff'
                      }}
                      whileHover={{ 
                        y: -2, 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'var(--primary-dark)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
