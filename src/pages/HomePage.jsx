import React from 'react';
import Home from '../components/home/Home';
import About from '../components/about/About';
import Projects from '../components/projects/Projects';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="section home-section">
        <Home />
      </section>
      
      <section id="about" className="section">
        <About />
      </section>
      
      <section id="projects" className="section">
        <Projects />
      </section>
    </div>
  );
};

export default HomePage;
