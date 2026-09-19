import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCalendarAlt, FaRocket, FaChartLine } from 'react-icons/fa';
import './Experience.css';

import { Timeline } from "../../components/ui/timeline";

export function TimelineDemo() {
  const data = experiences.map((exp) => ({
    Date: `${exp.period}`,
    content: (
      <div>
        <h3 className=' mt-2 mb-3' style={{color:"#6c63ff"}}>{exp.company}</h3>
        <h4 className='mt-2 mb-3'>{exp.position}</h4>
        <p className="mb-10 text-md font-normal !text-base text-neutral-800 md:text-sm dark:text-neutral-200">
          {exp.achievements.map((achievement, index) => (
            <ul>
              <li className="mb-4" key={index}>• {achievement}</li>
            </ul>
          ))}
        </p>
      </div>
    ),
  }));
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

const experiences = [
  {
    company: "Acelucid Technologies Pvt. Ltd.",
    position: "Software Development Engineer I",
    period: "Jan 2026 – Present",
    achievements: [
      "Developed backend services for SuperPersova, a multi-tenant, microservice-based SaaS platform for HR management, recruitment, employee tracking, and assessments using TypeScript, Fastify, and MongoDB.",
      "Developed and maintained APIs for the Recruitment and Proctoring modules, implementing end-to-end workflows for job postings, applications, candidates, assessments, interviews, and proctored sessions.",
      "Optimized backend APIs to support 6,000+ concurrent users through MongoDB query optimization, indexing, Redis caching, and efficient service-layer architecture.",
      "Designed and implemented service-layer and dependency-injection patterns to improve modularity, maintainability, and scalability across backend services.",
      "Worked with multi-database support, enabling tenant-aware data access and workflows across the platform.",
      "Worked on RBAC and tenant-based authorization with granular permissions across multiple application modules.",
      "Built and integrated Event Bus-based communication and synchronization services to coordinate data and events between core and independent microservices.",
      "Worked on Redis caching and AWS SQS-based queuing for high-volume asynchronous processing, improving application responsiveness and reducing database load.",
      "Deployed backend services on AWS EC2 and implemented GitHub Actions CI/CD pipelines for automated build, deployment, and release workflows."
    ],
  },
  {
    company: "Vigyapanam",
    position: "Software Developer Intern",
    period: "Jun 2025 – Dec 2025",
    achievements: [
      "Developed 20+ responsive landing pages using HTML, CSS, and JavaScript.",
      "Improved page load performance by 40%.",
      "Built backend APIs using Node.js.",
      "Implemented authentication, validation, and exception handling."
    ],
  },
  {
    company: "Acroknacks Technology Solutions Pvt. Ltd.",
    position: "Software Engineer Intern",
    period: "Jan 2025 – Mar 2025",
    achievements: [
      "Worked on production modules using React.js.",
      "Debugged issues and improved UI consistency.",
      "Performed manual testing and regression validation with QA teams."
    ],
  },
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