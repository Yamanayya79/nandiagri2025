import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../styles/BackToTopButton .css'; // Optional for custom CSS

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div className="back-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
    )
  );
};

export default BackToTopButton;