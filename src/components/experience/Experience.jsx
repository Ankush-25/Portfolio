import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendarAlt, FaRocket, FaChartLine } from 'react-icons/fa';
import './Experience.css';

import { Timeline } from "../../components/ui/timeline";

export function TimelineDemo() {
  const data = [
   
    {
      Date:`${experiences[0].period}`,
      content: (
        <div>
          <h3 className=' mt-2 mb-3' style={{color:"#6c63ff"}}>{experiences[0].company}</h3>
          <h4 className='mt-2 mb-3'>{experiences[0].position}</h4>
          <p className="mb-10 text-md font-normal !text-base text-neutral-800 md:text-sm dark:text-neutral-200">
            {experiences[0].achievements.map((achievement, index) => (
              <ul>
                <li className="mb-4" key={index}>• {achievement}</li>
              </ul>
            ))}
          </p>
        </div>
      ),
    },
    {
      Date: `${experiences[1].period}`,
      content: (
        <div>
          <h3 className=' mt-2 mb-3' style={{color:"#6c63ff"}}>{experiences[1].company}</h3>
          <h4 className='mt-2 mb-3'>{experiences[1].position}</h4>
          <p className="mb-10 text-md font-normal !text-base text-neutral-800 md:text-sm dark:text-neutral-200">
            {experiences[1].achievements.map((achievement, index) => (
              <ul>
                <li className="mb-4" key={index}>• {achievement}</li>
              </ul>
            ))}
          </p>
        </div>
      ),
    }
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

const experiences = [
  {
    company: "Vigyapanam Pvt. Ltd.",
    position: "FrontEnd Developer Intern",
    period: "Jun 2024 – Dec 2024",
    achievements: [
      "Developed a dynamic scheduling system using React.js, improving task efficiency by 30%",
      "Built responsive landing pages for 5+ product campaigns, boosting user engagement by 25%",
      "Optimized page load speed by 40%",
      "Implemented SEO-friendly HTML/CSS structures"
    ],
  },
  {
    company: "Acroknacks Pvt. Ltd.",
    position: "Software Engineer Trainee",
    period: "Jan 2025 – Feb 2025",
    achievements: [
      "Developed a dynamic React.js scheduling system, improving task throughput by 30%.",
      "Integrated REST APIs with JWT authentication and managed data flow using Axios.",
      "Practiced Agile methodologies using JIRA and collaborated via Git/Bitbucket.",
      "Gained hands-on experience in debugging, sprint planning, and CI/CD practices."
    ],
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
      <TimelineDemo />
      {/* <div className="floating-shapes">
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
            <span className="section-number"></span> Work Experience
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
      </div> */}
    </section>
  );
};

export default Experience;