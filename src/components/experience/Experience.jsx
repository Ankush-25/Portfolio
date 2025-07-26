import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendarAlt, FaRocket, FaChartLine, FaLightbulb } from 'react-icons/fa';

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
    ],
    icon: <FaRocket />,
    color: "#6366f1"
  },
  {
    company: "Vigyapanam Pvt. Ltd.",
    position: "FrontEnd Developer Intern",
    period: "Jun 2024 – Dec 2024",
    achievements: [
      "Built responsive landing pages for 5+ product campaigns, boosting user engagement by 25%",
      "Optimized page load speed by 40%",
      "Implemented SEO-friendly HTML/CSS structures"
    ],
    icon: <FaChartLine />,
    color: "#10b981"
  }
];

const Experience = () => {
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
      id="experience" 
      ref={ref}
      className="experience-section"
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
          <span className="section-number">03.</span> Work Experience
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My professional journey and accomplishments
        </motion.p>

        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          ref={containerRef}
        >
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="experience-item"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.4)`
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="experience-header">
                <motion.div 
                  className="experience-icon"
                  style={{ backgroundColor: `${exp.color}20`, borderColor: exp.color }}
                  variants={iconVariants}
                >
                  {exp.icon}
                </motion.div>
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
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="achievement-bullet" style={{ backgroundColor: exp.color }}></span>
                    <span className="achievement-text">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;