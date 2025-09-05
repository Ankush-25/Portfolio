import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import {FloatingNav} from '../ui/floating-navbar';
import Footer from './Footer';
import './Layout.css';
import { icons } from 'lucide-react';
const Layout = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to top when pathname changes
      window.scrollTo(0, 0);
    }
  }, [location]);
  const navItems = [
    { name: "Home", link: "#home",icon: <React.Fragment> <icons.House /> </React.Fragment> },
    { name: "Experience", link: "#experience",icon: <React.Fragment> <icons.Briefcase /> </React.Fragment> },
    { name: "Skills", link: "#skills",icon: <React.Fragment> <icons.Briefcase /> </React.Fragment> },
    { name: "Projects", link: "#projects",icon: <React.Fragment> <icons.Briefcase /> </React.Fragment> },
    { name: "About", link: "#about",icon: <React.Fragment> <icons.Briefcase /> </React.Fragment> },
    { name: "Contact", link: "#contact",icon: <React.Fragment> <icons.Briefcase /> </React.Fragment> },
  ];

  return (
    <div className="app">
      <FloatingNav navItems={navItems} className="!m-auto !text-white  !h-15 gap-15 !p-7" style={{color: 'white'}} />
      
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
