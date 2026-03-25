import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center" style={{ height: '4rem' }}>
        <img
          src="/assets/logonz.png"
          alt="NZ Essentials Logo"
          className="header-logo"
          style={{ transform: 'scale(1.4)', transformOrigin: 'left' }}
        />
      </div>

      <nav className="header-nav">
        <a href="#clean-energy">Clean Energy</a>
        <a href="#consulting">Consulting</a>
        <a href="#solar">Solar Power</a>
        <a href="#wind">Wind Turbine</a>
        <a href="#pricing">Pricing</a>
      </nav>

      <div className="header-buttons">
        <a href="#contact" className="btn btn-secondary">Get in Touch</a>
        <button className="btn btn-secondary">Join Us</button>
      </div>
    </motion.header>
  );
};

export default Header;
