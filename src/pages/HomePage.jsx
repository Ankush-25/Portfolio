import React, { Suspense } from 'react';
import Home from '../components/home/Home';
import About from '../components/about/About';
import Projects from '../components/projects/Projects';
import Skills from '../components/skills/Skills';
import Experience from '../components/experience/Experience';
import Education from '../components/education/Education';
import Certifications from '../components/certifications/Certifications';
import './HomePage.css';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  return (
    <div className="home-page">
      <section id="home" className="section home-section">
        <Home />
      </section>
      
        
        <section id="experience" className="section !bg-black">
            <Experience />
        </section>
        
        <section id="projects" className="projects-wrapper !bg-black">
          <div className="container !bg-black">
            <Projects />
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <Skills />
          </div>
        </section>
        
        <section id="education" className="section">
          <div className="container">
            <Education />
          </div>
        </section>
        
        <section id="certifications" className="section">
          <div className="container">
            <Certifications />
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <About />
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <Contact />
          </div>
        </section>

    </div>
  );
};

export default HomePage;
