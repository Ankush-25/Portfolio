import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

// Add font imports in your index.html or CSS file
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">

const Skills = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize particles only on client side
  useEffect(() => {
    setIsClient(true);
    
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 80); // Limit max particles
    
    // Get computed styles for theme colors
    const getThemeColor = (property) => {
      return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    };
    
    const primaryColor = getThemeColor('--primary');
    
    const initParticles = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set display size (css pixels)
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Set actual size in memory (scaled for retina displays)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr);
      
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          radius: Math.random() * 1.5 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.2, // Slower movement
          speedY: (Math.random() - 0.5) * 0.2,
          color: `rgba(${primaryColor}, ${Math.random() * 0.15 + 0.05})` // Use theme color with low opacity
        });
      }
    };
    
    const drawParticles = () => {
      if (!ctx) return;
      
      // Clear with a slight fade effect using theme background color
      ctx.fillStyle = 'rgba(18, 18, 31, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    // Initialize and start animation
    initParticles();
    animationFrameId.current = requestAnimationFrame(drawParticles);
    
    // Handle window resize
    const handleResize = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      initParticles();
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  // Skill categories with official logos
  const skillCategories = [
    {
      title: "Languages",
      items: [
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" }
      ]
    },
    {
      title: "Databases",
      items: [
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      title: "Tools & Platforms",
      items: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "AWS", logo: "/aws_icon_146074.png" },
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
      ]
    },
    {
      title: "Concepts",
      items: [
        { name: "RESTful APIs", logo: "https://cdn.worldvectorlogo.com/logos/postman.svg" },
        { name: "JWT Auth", logo: "https://jwt.io/img/icon.svg" },
        { name: "Agile/Scrum", logo: "https://cdn.worldvectorlogo.com/logos/scrum-1.svg" },
        { name: "CI/CD", logo: "/pngwing.com.png" }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <canvas ref={canvasRef} className="particles-canvas"></canvas>
      
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="section-number"></span> Technical Skills
          </h2>
          <p className="section-subtitle">Technologies & tools I work with daily</p>
        </motion.div>
        
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.1,
                type: "spring",
                damping: 12,
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 40px -10px rgba(0, 0, 0, 0.4)"
              }}
            >
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-items">
                {category.items.map((item, itemIndex) => (
                  <motion.div 
                    key={itemIndex}
                    className="skill-item"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 25px rgba(0, 238, 255, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="skill-logo">
                      <img src={item.logo} alt={item.name} />
                    </div>
                    <span className="skill-name">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;