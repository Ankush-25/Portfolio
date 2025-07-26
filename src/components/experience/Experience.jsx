import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import './Experience.css';

const experiences = [
  {
    company: "Acroknacks Technology Solutions Pvt Ltd",
    position: "Software Trainee Engineer",
    period: "Jan 2025 – Feb 2025",
    achievements: [
      "Developed a dynamic scheduling system using React.js, improving task efficiency by 30%",
      "Debugged and wrote maintainable code, ensuring best practices",
      "Used Git and Bitbucket for version control and team collaboration",
      "Participated in Sprint Planning and SDLC processes using Agile methodologies",
      "Integrated REST APIs with JWT authentication using Axios"
    ]
  },
  {
    company: "Vigyapanam Pvt. Ltd.",
    position: "FrontEnd Developer Intern",
    period: "Jun 2024 – Dec 2024",
    achievements: [
      "Built responsive landing pages for 5+ product campaigns, boosting user engagement by 25%",
      "Optimized page load speed by 40%",
      "Implemented SEO-friendly HTML/CSS structures"
    ]
  }
];

const Experience = () => {
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
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-number">03.</span> Work Experience
        </motion.h2>

        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="experience-item"
              variants={itemVariants}
            >
              <div className="experience-header">
                <div className="experience-icon">
                  <FaBriefcase className="icon" />
                </div>
                <div className="experience-title">
                  <h3>{exp.position}</h3>
                  <div className="company-period">
                    <span className="company">{exp.company}</span>
                    <span className="period">
                      <FaCalendarAlt className="calendar-icon" /> {exp.period}
                    </span>
                  </div>
                </div>
              </div>
              
              <ul className="achievement-list">
                {exp.achievements.map((achievement, i) => (
                  <motion.li 
                    key={i}
                    className="achievement-item"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="achievement-bullet"></span>
                    <span className="achievement-text">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
              
              {index < experiences.length - 1 && <div className="timeline-line"></div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
