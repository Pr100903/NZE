import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const solutions = [
    'Energy Procurement',
    'Renewable Energy Solutions',
    'Battery Storage',
    'EV Infrastructure',
    'Carbon Reporting',
    'Utility Bill Auditing',
    'Strategic Consulting'
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="section section-dark" id="solutions">
      <div className="container">
        <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '2rem', marginBottom: '4rem' }}>
          <AnimatedSection delay={0}>
            <span className="section-label" style={{ letterSpacing: '0.4em' }}>What We Do</span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="section-title" style={{ maxWidth: '900px' }}>
              Integrated Utility Solutions for Commercial
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="section-description">
              Comprehensive energy management for the modern enterprise, from procurement
              to peak-load optimization.
            </p>
          </AnimatedSection>
        </div>

        <motion.div
          ref={ref}
          className="pill-tags"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {solutions.map((solution, index) => (
            <motion.button
              key={index}
              className="pill-tag"
              variants={pillVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {solution}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
