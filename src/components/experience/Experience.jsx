import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendarAlt, FaRocket, FaChartLine } from 'react-icons/fa';
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="section-number">02.</span> Work Experience
          </h2>
          <p className="section-subtitle">
            My professional journey and the companies I've worked with
          </p>
        </motion.div>

        <div className="experience-timeline">
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="experience-header">
                <div className="experience-icon" style={{ backgroundColor: `${exp.color}20`, color: exp.color }}>
                  {exp.icon}
                </div>
                <div className="experience-company">
                  <h3>{exp.company}</h3>
                  <div className="experience-position">
                    <FaBriefcase className="icon" />
                    <span>{exp.position}</span>
                  </div>
                  <div className="experience-period">
                    <FaCalendarAlt className="icon" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>
              
              <ul className="experience-achievements">
                {exp.achievements.map((achievement, i) => (
                  <motion.li 
                    key={i} 
                    className="achievement-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    <span className="achievement-bullet" style={{ backgroundColor: exp.color }}></span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;