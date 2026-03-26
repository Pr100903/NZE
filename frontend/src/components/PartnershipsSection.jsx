import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const FlipCard = ({ icon, title, backTitle, description, delay }) => {
  return (
    <motion.div
      className="flip-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <span className="material-symbols-outlined" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
            {icon}
          </span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6 }}>
            Hover to explore
          </p>
        </div>
        <div className="flip-card-back">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
            {backTitle}
          </h3>
          <p style={{ lineHeight: 1.7 }}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const PartnershipsSection = () => {
  const cards = [
    {
      icon: 'handshake',
      title: 'Commercial Operations',
      backTitle: 'End-to-End Excellence',
      description: 'We handle the complexity of commercial energy systems, allowing you to focus on your core business growth and sustainability goals.'
    },
    {
      icon: 'dynamic_feed',
      title: 'Asset Management',
      backTitle: 'Maximized ROI',
      description: 'Lifecycle management for high-impact utility assets ensures maximum uptime and performance for every dollar invested.'
    },
    {
      icon: 'monitoring',
      title: 'Data Analytics',
      backTitle: 'Actionable Insights',
      description: 'Real-time monitoring and advanced predictive modeling to prevent energy waste before it hits your bottom line.'
    }
  ];

  return (
    <section className="section section-gray">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <AnimatedSection>
            <h2 className="section-title">Strategic Partnerships</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div style={{ width: '6rem', height: '4px', background: 'var(--primary)', margin: '1rem auto' }} />
          </AnimatedSection>
        </div>

        <div className="grid-3">
          {cards.map((card, index) => (
            <FlipCard key={index} {...card} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
