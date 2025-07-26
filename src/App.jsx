import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      // Check if the click is on an anchor link within the same page
      if (e.target.matches('a[href^="#"]') && 
          e.target.getAttribute('href') !== '#' &&
          !e.target.getAttribute('href').startsWith('http')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth',
          });
          
          // Update URL without page reload
          window.history.pushState({}, '', targetId);
        }
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleSmoothScroll);

    // Clean up the event listener
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        {/* Add more routes here as needed */}
        <Route path="*" element={
          <Layout>
            <NotFoundPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
