import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const FlipCard = ({ icon, title, challenge, impact, result, delay }) => {
  // Memoize the highlight function
  const highlightedResult = useMemo(() => {
    return result.split(/(\$[\d,]+)/g).map((part, index) => {
      if (part.match(/\$[\d,]+/)) {
        return <span key={index} className="highlight-savings">{part}</span>;
      }
      return part;
    });
  }, [result]);

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
          <div className="flip-card-story">
            <p className="story-section">
              <span className="story-label challenge">The Challenge:</span> {challenge}
            </p>
            <p className="story-section">
              <span className="story-label impact">Our Impact:</span> {impact}
            </p>
            <p className="story-section">
              <span className="story-label result">The Result:</span> {highlightedResult}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PartnershipsSection = () => {
  const cards = useMemo(() => [
    {
      icon: 'local_pizza',
      title: 'HOSPITALITY',
      challenge: 'Constant oven use and refrigeration were driving up peak-time energy costs.',
      impact: 'Secured a fixed-term electricity rate and high-speed One.nz business broadband.',
      result: '$5,600 net annual savings and zero downtime for online ordering systems.'
    },
    {
      icon: 'monitor_heart',
      title: 'HEALTHCARE',
      challenge: 'Constant 24/7 power requirements for medical equipment led to high, inflexible electricity costs.',
      impact: 'Negotiated a high-usage electricity tariff specifically for healthcare facilities, locking in lower rates for the long term.',
      result: '$12,500 saved annually. Combined with our 24/7 Support, the facility gained budget certainty and operational peace of mind.'
    },
    {
      icon: 'shopping_cart',
      title: 'RETAIL',
      challenge: 'Complex multi-site billing and heavy refrigeration loads were difficult to manage.',
      impact: 'Consolidated all accounts and locked in long-term prices to avoid market spikes.',
      result: '$7,200 saved per site annually and 15+ hours of monthly admin work eliminated.'
    }
  ], []);

  return (
    <section className="section section-gray">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <AnimatedSection>
            <h2 className="section-title">The Proof is in the Profit.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="section-description" style={{ margin: '1.5rem auto 0' }}>
              Explore our success stories across hospitality, retail, and healthcare.
            </p>
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
