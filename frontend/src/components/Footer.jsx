import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Footer = () => {
  const solutionLinks = useMemo(() => [
    { label: 'Electricity', href: '/#services' },
    { label: 'Gas', href: '/#services' },
    { label: 'Mobile & Broadband', href: '/#services' },
    { label: 'Solar & EV', href: '/#services' }
  ], []);

  const companyLinks = useMemo(() => [
    { label: 'About Us', href: '/about', isRoute: true },
    { label: 'FAQ', href: '/faq', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true }
  ], []);

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <AnimatedSection direction="up">
            <div>
              <img
                src="/assets/logonz.png"
                alt="NZ Essentials Logo"
                className="footer-logo"
              />
              <p className="footer-description">
                Powering a sustainable future through innovation, integrity, and
                integrated utility solutions for a cleaner tomorrow.
              </p>
              <div className="social-links">
                <a 
                  href="https://www.instagram.com/nzessentials.co.nz/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/p/NZ-Essentials-61552103232921/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:Kiaora@nzessentials.co.nz" 
                  className="social-link"
                  aria-label="Email"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>mail</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <div>
              <h4 className="footer-title">Solutions</h4>
              <ul className="footer-links">
                {solutionLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    {link.isRoute ? (
                      <Link to={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3}>
            <div className="footer-cta">
              <h4 className="footer-title">Ready to Save?</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Stop overpaying for utilities. Let's find you a better deal today.
              </p>
              <Link to="/contact" className="footer-cta-btn">
                <span>Get Your Free Quote</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} NZ Essentials. All rights reserved.
          </p>
          <div className="footer-info">
            <span>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>location_on</span>
              New Zealand
            </span>
            <span>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>phone</span>
              +64 3 421 4656
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
