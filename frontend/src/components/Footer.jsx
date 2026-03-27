import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Footer = () => {
  const [email, setEmail] = useState('');

  const solutionLinks = [
    { label: 'Clean Energy', href: '#clean-energy' },
    { label: 'Consulting', href: '#consulting' },
    { label: 'Solar Power', href: '#solar' },
    { label: 'Wind Turbine', href: '#wind' }
  ];

  const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
  { label: 'Terms of Service', href: '#terms' }
];

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

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
                <a href="#" className="social-link">
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>public</span>
                </a>
                <a href="#" className="social-link">
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chat</span>
                </a>
                <a href="#" className="social-link">
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
            <div>
              <h4 className="footer-title">Newsletter</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                Get the latest insights on renewable energy markets.
              </p>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <span className="material-symbols-outlined" style={{ color: 'var(--black)' }}>send</span>
                </button>
              </form>
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
              +64 000 000 000
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
