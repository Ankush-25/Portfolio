import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaCertificate, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const certifications = [
  {
    id: 1,
    title: 'C Programming',
    issuer: 'Great Learning',
    icon: <FaCertificate className="certification-icon" />,
    type: 'certification',
    date: 'May 2023',
    description: 'Mastered advanced C programming concepts including memory management, data structures, and algorithm implementation.'
  },
  {
    id: 2,
    title: 'Geo Data Analysis',
    issuer: 'Indian Space Research Organisation (ISRO)',
    icon: <FaCertificate className="certification-icon" />,
    type: 'certification',
    date: 'Aug 2022',
    description: 'Learned satellite data processing techniques and geospatial analysis for environmental monitoring applications.'
  },
  {
    id: 3,
    title: 'NCC C Certificate',
    issuer: 'National Cadet Corps',
    icon: <FaAward className="certification-icon" />,
    type: 'achievement',
    date: 'Dec 2021',
    description: 'Achieved the highest NCC certification demonstrating leadership, discipline, and community service excellence.'
  },
  {
    id: 4,
    title: 'National Level Science Competition',
    issuer: 'Participation',
    icon: <FaTrophy className="certification-icon" />,
    type: 'achievement',
    date: 'Feb 2020',
    description: 'Developed an innovative renewable energy solution that placed in the top 10 nationally.'
  },
  {
    id: 5,
    title: 'Cloud Architecture',
    issuer: 'Amazon Web Services',
    icon: <FaCertificate className="certification-icon" />,
    type: 'certification',
    date: 'Mar 2023',
    description: 'Designed and deployed scalable cloud infrastructure solutions using AWS services.'
  },
  {
    id: 6,
    title: 'Hackathon Winner',
    issuer: 'Tech Innovators Summit',
    icon: <FaTrophy className="certification-icon" />,
    type: 'achievement',
    date: 'Oct 2022',
    description: 'Led a team to develop an AI-powered accessibility tool that won first place among 50 competing teams.'
  }
];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  
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
    };
    
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);
  
  // Filter certifications based on active category
  const filteredCertifications = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(item => item.type === activeCategory);
  
  // Pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCertifications.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCertifications.length / cardsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: '0 20px 30px rgba(14, 239, 255, 0.15)'
    }
  };

  const categoryVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: { scale: 1.05 },
    active: { 
      background: 'linear-gradient(45deg, #0ef, #0066ff)',
      boxShadow: '0 5px 15px rgba(14, 239, 255, 0.3)'
    }
  };

  return (
    <section id="certifications" className="certifications-section">
      {/* Animated background elements */}
      <div className="animated-background">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-number">06.</span> Certifications & Achievements
          <div className="title-decoration" />
        </motion.h2>
        
        <motion.div className="category-filter"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.button
            variants={categoryVariants}
            whileHover="hover"
            animate={activeCategory === 'all' ? "active" : ""}
            onClick={() => {
              setActiveCategory('all');
              setCurrentPage(1);
            }}
          >
            All
          </motion.button>
          <motion.button
            variants={categoryVariants}
            whileHover="hover"
            animate={activeCategory === 'certification' ? "active" : ""}
            onClick={() => {
              setActiveCategory('certification');
              setCurrentPage(1);
            }}
          >
            <FaCertificate className="category-icon" /> Certifications
          </motion.button>
          <motion.button
            variants={categoryVariants}
            whileHover="hover"
            animate={activeCategory === 'achievement' ? "active" : ""}
            onClick={() => {
              setActiveCategory('achievement');
              setCurrentPage(1);
            }}
          >
            <FaTrophy className="category-icon" /> Achievements
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="certifications-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {currentCards.map((cert) => (
            <motion.div 
              key={cert.id} 
              className="certification-card"
              variants={itemVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(cert.id)}
              onMouseLeave={() => setHoveredCard(null)}
              animate={hoveredCard === cert.id ? "hover" : ""}
            >
              <div className="card-content">
                <div className="certification-icon-wrapper">
                  {cert.icon}
                  <div className="icon-glow" />
                </div>
                
                <div className="certification-details">
                  <h4 className="certification-title">{cert.title}</h4>
                  <p className="certification-issuer">{cert.issuer}</p>
                  <p className="certification-date">{cert.date}</p>
                </div>
                
                <div className="certification-description">
                  <p>{cert.description}</p>
                </div>
              </div>
              
              <div className="card-decoration">
                <div className="glow-effect" />
                <div className="corner-decoration top-left" />
                <div className="corner-decoration top-right" />
                <div className="corner-decoration bottom-left" />
                <div className="corner-decoration bottom-right" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
        
        <motion.div 
          className="stats-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="stat-item">
            <span className="stat-number">{certifications.length}+</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">{certifications.filter(c => c.type === 'achievement').length}</span>
            <span className="stat-label">Achievements</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Verified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;