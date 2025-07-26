import React from 'react';
import Home from '../components/home/Home';
import About from '../components/about/About';
import Projects from '../components/projects/Projects';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section id="home" className="section home-section">
        <Home />
      </section>
      
      <section id="about" className="section">
        <div className="container">
          <About />
        </div>
      </section>
      
      <section id="projects" className="section">
        <div className="container">
          <Projects />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
