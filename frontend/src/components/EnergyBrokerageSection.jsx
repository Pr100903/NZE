import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const EnergyBrokerageSection = () => {
  const flowRef = useRef(null);
  const isInView = useInView(flowRef, { once: true });

  return (
    <section className="brokerage-section" id="brokerage">
      <div className="container">
        <div className="brokerage-grid">
          {/* Left Content */}
          <div className="brokerage-content">
            <AnimatedSection>
              <span className="brokerage-label">Energy Brokerage Service</span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="brokerage-title">
                Saving Money Doesn't<br />
                <span>Have to be Hard Work</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="brokerage-description">
                We assess your current provider against the rest of New Zealand's
                power companies, negotiate legal contracts and make the switch.
                We have a wide range of partners in the energy sector, and because
                we work for you, not them, we can deliver the best deal for your business.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="brokerage-description-small">
                We also continually monitor the market to make sure you're still
                getting the best electricity rates.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="brokerage-features">
                <div className="brokerage-feature">
                  <span className="feature-check">✓</span>
                  <span>Wide range of energy sector partners</span>
                </div>
                <div className="brokerage-feature">
                  <span className="feature-check">✓</span>
                  <span>We work for you, not the providers</span>
                </div>
                <div className="brokerage-feature">
                  <span className="feature-check">✓</span>
                  <span>Continuous market monitoring</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <a href="#contact" className="brokerage-btn">
                <span>Get Free Assessment</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </AnimatedSection>
          </div>

          {/* Right Visual - Flow Diagram */}
          <div className="brokerage-visual" ref={flowRef}>
            <div className="flow-diagram">
              {/* SVG Flow */}
              <svg viewBox="0 0 400 300" className="flow-svg">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff4444" />
                    <stop offset="50%" stopColor="#ffe413" />
                    <stop offset="100%" stopColor="#44ff44" />
                  </linearGradient>
                  <filter id="flowGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Flow Lines */}
                <motion.path
                  d="M60,150 L160,150"
                  stroke="rgba(255, 68, 68, 0.5)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />

                <motion.path
                  d="M240,150 L340,150"
                  stroke="rgba(68, 255, 68, 0.5)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#flowGlow)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />

                {/* Animated Flow Particle */}
                <motion.circle
                  r="6"
                  fill="#ffe413"
                  filter="url(#flowGlow)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M60,150 L160,150 L200,150 L240,150 L340,150"
                    begin="1.5s"
                  />
                </motion.circle>

                {/* Arrows */}
                <motion.polygon
                  points="155,145 165,150 155,155"
                  fill="rgba(255, 68, 68, 0.7)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                />
                <motion.polygon
                  points="335,145 345,150 335,155"
                  fill="rgba(68, 255, 68, 0.9)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                />
              </svg>

              {/* Flow Nodes */}
              <motion.div
                className="flow-node flow-node-old"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <div className="node-icon">
                  <span className="material-symbols-outlined">power_off</span>
                </div>
                <span className="node-title">Old Provider</span>
                <span className="node-subtitle">High Rates</span>
              </motion.div>

              <motion.div
                className="flow-node flow-node-nze"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <div className="node-icon node-icon-primary">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <span className="node-title">NZ Essentials</span>
                <span className="node-subtitle">We Negotiate</span>
              </motion.div>

              <motion.div
                className="flow-node flow-node-new"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                <div className="node-icon node-icon-success">
                  <span className="material-symbols-outlined">savings</span>
                </div>
                <span className="node-title">Better Rate</span>
                <span className="node-subtitle">You Save</span>
              </motion.div>

              {/* Savings Indicator */}
              <motion.div
                className="savings-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.3, type: "spring" }}
              >
                <span className="savings-text">Up to</span>
                <span className="savings-amount">30%</span>
                <span className="savings-label">Savings</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyBrokerageSection;
