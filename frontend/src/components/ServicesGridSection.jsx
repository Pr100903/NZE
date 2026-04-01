import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const ServicesGridSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = useMemo(() => [
    {
      icon: 'bolt',
      title: 'Electricity',
      shortDesc: 'Competitive energy rates',
      description: 'Competitive rates negotiated with top NZ energy retailers. Lock in prices and protect against market volatility.',
      benefits: ['Up to 20% savings', 'Fixed and flexible terms option available', 'No switching hassle'],
      color: '#ffe413'
    },
    {
      icon: 'local_fire_department',
      title: 'Gas',
      shortDesc: 'Commercial gas solutions',
      description: 'Bottled and piped gas solutions for commercial operations. Bulk pricing and reliable supply chains.',
      benefits: ['Bulk pricing', 'Reliable supply', 'Commercial grade'],
      color: '#ff6b35'
    },
    {
      icon: 'smartphone',
      title: 'Mobile',
      shortDesc: 'Business mobile plans',
      description: 'Business mobile plans via One.nz partnership. Premium coverage with zero service fees from us.',
      benefits: ['Satellite-to-Mobile Connectivity', 'Endless Data Plans', 'Premium coverage', 'Zero service fees'],
      color: '#4ecdc4',
      exploreLink: 'https://one.nz/business/mobile/#',
      partnerLogo: '/assets/logos/OneNZ.png'
    },
    {
      icon: 'wifi',
      title: 'Broadband',
      shortDesc: 'High-speed connectivity',
      description: 'Fibre, wireless, and satellite connectivity through our One.nz partnership. Choose the right solution for your location and team size.',
      benefits: ['Fibre & wireless options', 'Quick setup', 'Premium coverage'],
      color: '#45b7d1',
      exploreLink: 'https://one.nz/business/broadband/',
      partnerLogo: '/assets/logos/OneNZ.png'
    },
    {
      icon: 'solar_power',
      title: 'Solar',
      shortDesc: 'Own your energy',
      description: 'Reduce grid reliance with commercial solar infrastructure. Own your energy and cut long-term costs.',
      benefits: ['Reduce grid costs', 'Own your power', 'Long-term savings'],
      color: '#96ceb4'
    },
    {
      icon: 'ev_station',
      title: 'EV Infrastructure',
      shortDesc: 'Future-proof charging',
      description: 'Future-proof your business with EV charging stations. Fleet transition and customer value-add solutions.',
      benefits: ['Fleet charging', 'Customer amenity', 'Future-ready'],
      color: '#6c5ce7'
    }
  ], []);

  const handleServiceClick = useCallback((index) => {
    setActiveService(index);
  }, []);

  // Mobile inline detail component
  const MobileDetailPanel = ({ service, isActive }) => (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="service-mobile-detail"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="service-mobile-detail-content">
            <p className="service-detail-desc">{service.description}</p>
            <ul className="service-detail-benefits">
              {service.benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: service.color }}
                  >
                    check_circle
                  </span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
            {service.partnerLogo && (
              <div className="service-partner-badge">
                <span>Official Partner</span>
                <a href="https://one.nz" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={service.partnerLogo} 
                    alt="One NZ Partner" 
                    className="service-partner-logo"
                  />
                </a>
              </div>
            )}
            <div className="service-detail-buttons">
              <Link to="/contact" className="service-detail-btn">
                Get Started
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              {service.exploreLink && (
                <a 
                  href={service.exploreLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="service-detail-btn service-explore-btn"
                >
                  Explore More
                  <span className="material-symbols-outlined">open_in_new</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="services-showcase" id="services">
      <div className="container">
        <AnimatedSection>
          <div className="services-showcase-header">
            <span className="section-label">Our Services</span>
            <h2 className="services-showcase-title">
              One Connection for <span>All Your Utilities</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="services-showcase-grid">
          {/* Left: Service Cards (with mobile inline details) */}
          <div className="services-cards-list">
            {services.map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <motion.div
                  className={`service-mini-card ${activeService === index ? 'active' : ''}`}
                  onMouseEnter={() => handleServiceClick(index)}
                  onClick={() => handleServiceClick(index)}
                  whileHover={{ x: 8 }}
                  style={{
                    borderColor: activeService === index ? service.color : 'transparent'
                  }}
                >
                  <div
                    className="service-mini-icon"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color
                    }}
                  >
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </div>
                  <div className="service-mini-info">
                    <h3>{service.title}</h3>
                    <p>{service.shortDesc}</p>
                  </div>
                  <span
                    className="material-symbols-outlined service-mini-arrow"
                    style={{ color: activeService === index ? service.color : 'rgba(255,255,255,0.3)' }}
                  >
                    chevron_right
                  </span>
                </motion.div>
                {/* Mobile inline detail - shows below each card on mobile */}
                <MobileDetailPanel service={service} isActive={activeService === index} />
              </div>
            ))}
          </div>

          {/* Right: Detail Panel (desktop only) */}
          <div className="services-detail-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                className="service-detail-content"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="service-detail-icon"
                  style={{
                    backgroundColor: `${services[activeService].color}20`,
                    borderColor: services[activeService].color
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: services[activeService].color }}
                  >
                    {services[activeService].icon}
                  </span>
                </div>

                <h3 className="service-detail-title">{services[activeService].title}</h3>
                <p className="service-detail-desc">{services[activeService].description}</p>

                <ul className="service-detail-benefits">
                  {services[activeService].benefits.map((benefit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ color: services[activeService].color }}
                      >
                        check_circle
                      </span>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>

                {services[activeService].partnerLogo && (
                  <div className="service-partner-badge">
                    <span>Official Partner</span>
                    <a href="https://one.nz" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={services[activeService].partnerLogo} 
                        alt="One NZ Partner" 
                        className="service-partner-logo"
                      />
                    </a>
                  </div>
                )}

                <div className="service-detail-buttons">
                  <Link to="/contact" className="service-detail-btn">
                    Get Started
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                  {services[activeService].exploreLink && (
                    <a 
                      href={services[activeService].exploreLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="service-detail-btn service-explore-btn"
                    >
                      Explore More
                      <span className="material-symbols-outlined">open_in_new</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Animated Background Element */}
            <motion.div
              className="service-detail-bg"
              animate={{
                background: `radial-gradient(circle at 80% 20%, ${services[activeService].color}15 0%, transparent 50%)`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
