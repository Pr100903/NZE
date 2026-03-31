import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleJoinClick = () => {
    setMobileMenuOpen(false);
    navigate('/loa');
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

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
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '#services' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blogs', href: '/blog' }
  ];

  return (
    <>
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

          {/* Navigation - Desktop */}
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

          {/* Buttons - Desktop */}
          <div className="header-buttons header-buttons-desktop">
            <a href="/contact" className="header-btn header-btn-outline" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
              Get in Touch
            </a>
            <button className="header-btn header-btn-primary" onClick={handleJoinClick}>
              Join Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="mobile-menu-links">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={(e) => handleNavClick(e, link)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              <div className="mobile-menu-buttons">
                <a 
                  href="/contact" 
                  className="mobile-btn mobile-btn-outline" 
                  onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/contact'); }}
                >
                  Get in Touch
                </a>
                <button className="mobile-btn mobile-btn-primary" onClick={handleJoinClick}>
                  Join Us
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
