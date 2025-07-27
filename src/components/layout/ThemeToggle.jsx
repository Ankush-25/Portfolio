import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleClick}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        key={isDarkMode ? 'sun' : 'moon'}
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 30 }}
        transition={{ duration: 0.3 }}
        className="theme-icon-wrapper"
      >
        {isDarkMode ? (
          <FaSun className="theme-icon" />
        ) : (
          <FaMoon className="theme-icon" />
        )}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
