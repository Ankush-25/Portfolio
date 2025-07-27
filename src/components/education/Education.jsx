import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook } from 'react-icons/fa';
import './Education.css';

const education = [
  {
    id: 1,
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Shri Guru Ram Rai University, Dehradun',
    period: '2023 – 2025',
    icon: <FaGraduationCap className="education-icon" />,
    details: [
      'Relevant Coursework:',
      '• Data Structures',
      '• Operating Systems',
      '• Algorithms',
      '• Computer Architecture'
    ]
  },
  {
    id: 2,
    degree: 'Bachelor of Science (B.Sc.)',
    institution: 'Hemavati Nandan Bahuguna Garhwal University',
    period: '2020 – 2023',
    icon: <FaBook className="education-icon" />,
    details: [
      'Computer Science Major',
      '• Mathematics',
      '• Programming Fundamentals',
      '• Database Management',
      '• Web Technologies'
    ]
  }
];

const Education = () => {
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
    <section id="education" className="education-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-number"></span> Education
        </motion.h2>

        <motion.div 
          className="education-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((edu, index) => (
            <motion.div 
              key={edu.id} 
              className="education-item"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="education-header">
                <div className="education-icon-wrapper">
                  {edu.icon}
                </div>
                <div className="education-title">
                  <h3>{edu.degree}</h3>
                  <div className="education-meta">
                    <span className="institution">{edu.institution}</span>
                    <span className="period">{edu.period}</span>
                  </div>
                </div>
              </div>
              
              <div className="education-details">
                <ul>
                  {edu.details.map((detail, i) => (
                    <li key={i} className={i === 0 ? 'detail-heading' : ''}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              {index < education.length - 1 && <div className="timeline-connector"></div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
