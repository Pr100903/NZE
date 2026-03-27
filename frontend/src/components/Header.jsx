import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavClick = (e, link) => {
    e.preventDefault();

    // If it's a page link (starts with /), navigate to it
    if (link.href.startsWith('/')) {
      navigate(link.href);
      return;
    }

    // If it's a hash link
    const targetId = link.href.replace('#', '');

    // If we're on home page, scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page and then to the section
      navigate('/', { state: { scrollTo: targetId } });
    }
  };

  // Handle scrolling after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const navLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '#services' },
    { label: 'Clients', href: '#clients' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blogs', href: '/blog' }
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
        <a href="/" className="header-logo-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <img
            src="/assets/logonz2.svg"
            alt="NZ Essentials"
            className="header-logo"
          />
        </a>

        {/* Navigation */}
        <nav className="header-nav">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="header-nav-link"
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="header-buttons">
          <a href="/contact" className="header-btn header-btn-outline" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
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
