import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoinClick = () => {
    navigate('/contact');
  };

  const navLinks = [
    { label: 'About Us', href: '#about_us' },
    { label: 'Services', href: '#services' },
    { label: 'Clients', href: '#clients' },
    { label: 'Partners', href: '#partners' },
    { label: 'Blogs', href: '#blogs' }
  ];

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header-container">
        {/* Logo */}
        <a href="/" className="header-logo-link">
          <img
            src="/assets/logonz2.svg"
            alt="NZ Essentials"
            className="header-logo"
          />
        </a>

        {/* Navigation */}
        <nav className="header-nav">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="header-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="header-buttons">
          <a href="#contact" className="header-btn header-btn-outline">
            Get in Touch
          </a>
          <button className="header-btn header-btn-primary" onClick={handleJoinClick}>
            Join Us
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
