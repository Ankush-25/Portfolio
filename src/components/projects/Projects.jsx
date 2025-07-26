import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaServer, FaRobot, FaChartLine } from 'react-icons/fa';
import './Projects.css';

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
    ]
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
    ]
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
    ]
  }
];

const Projects = () => {
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

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-number">04.</span> Featured Projects
        </motion.h2>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="project-header">
                <div className="project-icon-wrapper">
                  {project.icon}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              
              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-bullet"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
