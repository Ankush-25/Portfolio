import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaCertificate, FaTrophy } from 'react-icons/fa';
import './Certifications.css';

const certifications = [
  {
    id: 1,
    title: 'C Programming',
    issuer: 'Great Learning',
    icon: <FaCertificate className="certification-icon" />,
    type: 'certification'
  },
  {
    id: 2,
    title: 'Geo Data Analysis',
    issuer: 'Indian Space Research Organisation (ISRO)',
    icon: <FaCertificate className="certification-icon" />,
    type: 'certification'
  },
  {
    id: 3,
    title: 'NCC C Certificate',
    issuer: 'National Cadet Corps',
    icon: <FaAward className="certification-icon" />,
    type: 'achievement'
  },
  {
    id: 4,
    title: 'National Level Science Competition',
    issuer: 'Participation',
    icon: <FaTrophy className="certification-icon" />,
    type: 'achievement'
  }
];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  
  // Memoize filtered certifications to prevent unnecessary recalculations
  const filteredCertifications = useMemo(() => {
    return activeCategory === 'all' 
      ? certifications 
      : certifications.filter(item => item.type === activeCategory);
  }, [activeCategory]);
  
  // Responsive cards per page
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(4);
      }
      // Reset to first page when changing cards per page
      setCurrentPage(1);
    };
    
    // Initial setup
    updateCardsPerPage();
    
    // Debounce resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCardsPerPage, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeCategory]);

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

  // Group certifications by type
  const groupedCertifications = {
    certification: certifications.filter(item => item.type === 'certification'),
    achievement: certifications.filter(item => item.type === 'achievement')
  };

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <span className="section-number"></span> Certifications & Achievements
        </motion.h2>

        <motion.div 
          className="certifications-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="certifications-category">
            <h3 className="category-title">
              <FaCertificate className="category-icon" /> 
              Certifications
            </h3>
            <div className="certifications-grid">
              {filteredCertifications.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((cert) => (
                <motion.div 
                  key={cert.id} 
                  className="certification-card"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="certification-icon-wrapper">
                    {cert.icon}
                  </div>
                  <div className="certification-details">
                    <h4 className="certification-title">{cert.title}</h4>
                    <p className="certification-issuer">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="certifications-category">
            <h3 className="category-title">
              <FaTrophy className="category-icon" /> 
              Achievements
            </h3>
            <div className="certifications-grid">
              {groupedCertifications.achievement.map((cert) => (
                <motion.div 
                  key={cert.id} 
                  className="certification-card"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="certification-icon-wrapper">
                    {cert.icon}
                  </div>
                  <div className="certification-details">
                    <h4 className="certification-title">{cert.title}</h4>
                    <p className="certification-issuer">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
