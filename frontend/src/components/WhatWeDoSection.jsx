import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const WhatWeDoSection = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const visualRef = useRef(null);
  const isInView = useInView(visualRef, { once: true });

  const services = [
    { id: 'energy', label: 'Energy Procurement' },
    { id: 'renewable', label: 'Renewable Energy Solutions' },
    { id: 'tariff', label: 'Tariff Analysis' },
    { id: 'green', label: 'Green Energy' },
    { id: 'efficiency', label: 'Energy Efficiency Consultation' },
    { id: 'broadband', label: 'Business Broadband' },
    { id: 'mobile', label: 'Mobile Plans' },
  ];

  return (
    <section className="whatwedo-section" id="services">
      <div className="container">
        <div className="whatwedo-grid">
          {/* Left Content */}
          <div className="whatwedo-content">
            <AnimatedSection>
              <span className="whatwedo-label">What We Do</span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="whatwedo-title">
                Integrated Utility Solutions<br />
                <span>for Commercial Operations</span>
              </h2>
            </AnimatedSection>

            {/* Services List */}
            <motion.div
              className="whatwedo-services-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`whatwedo-service-item ${hoveredService === service.id ? 'active' : ''}`}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <span className="service-arrow">→</span>
                  <span className="service-text">{service.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection delay={0.3}>
              <p className="whatwedo-description">
                NZ Essentials provides end-to-end commercial utility solutions
                designed specifically for farms, industrial facilities, hospitality
                venues, retail operations, and growing enterprises.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <a href="#all-services" className="whatwedo-btn">
                <span>See All Services</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </AnimatedSection>
          </div>

          {/* Right Visual - Animated Energy Scene */}
          <div className="whatwedo-visual" ref={visualRef}>
            <div className="energy-scene">
              {/* Background glow */}
              <div className="scene-glow" />

              {/* SVG Animation */}
              <svg viewBox="0 0 500 500" className="scene-svg">
                <defs>
                  <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffe413" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffe413" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffe413" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glowFilter">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Ground Line */}
                <motion.line
                  x1="50" y1="380" x2="450" y2="380"
                  stroke="rgba(255, 228, 19, 0.2)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1 }}
                />

                {/* Connection Lines */}
                {/* Solar to Building */}
                <motion.path
                  d="M100,280 Q180,200 250,280"
                  stroke="rgba(255, 228, 19, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glowFilter)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Building to Tower */}
                <motion.path
                  d="M320,250 Q370,180 400,220"
                  stroke="rgba(255, 228, 19, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glowFilter)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />

                {/* Flowing Energy Particles */}
                <circle r="5" fill="#ffe413" filter="url(#glowFilter)">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    path="M100,280 Q180,200 250,280 L320,250 Q370,180 400,220"
                  />
                </circle>
                <circle r="4" fill="#ffe413" filter="url(#glowFilter)">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin="0.8s"
                    path="M100,280 Q180,200 250,280 L320,250 Q370,180 400,220"
                  />
                </circle>
                <circle r="3" fill="#ffe413" filter="url(#glowFilter)">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin="1.6s"
                    path="M100,280 Q180,200 250,280 L320,250 Q370,180 400,220"
                  />
                </circle>

                {/* Solar Panels */}
                <g className="solar-group">
                  <motion.rect
                    x="60" y="290" width="80" height="50"
                    fill="none"
                    stroke="#ffe413"
                    strokeWidth="2"
                    rx="2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 }}
                  />
                  <motion.line x1="60" y1="310" x2="140" y2="310" stroke="#ffe413" strokeWidth="1" strokeOpacity="0.5"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} />
                  <motion.line x1="60" y1="325" x2="140" y2="325" stroke="#ffe413" strokeWidth="1" strokeOpacity="0.5"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} />
                  <motion.line x1="85" y1="290" x2="85" y2="340" stroke="#ffe413" strokeWidth="1" strokeOpacity="0.5"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }} />
                  <motion.line x1="115" y1="290" x2="115" y2="340" stroke="#ffe413" strokeWidth="1" strokeOpacity="0.5"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }} />
                  {/* Panel Stand */}
                  <motion.line x1="100" y1="340" x2="100" y2="380" stroke="#ffe413" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} />
                </g>

                {/* Building */}
                <g className="building-group">
                  <motion.rect
                    x="220" y="220" width="100" height="160"
                    fill="none"
                    stroke="#ffe413"
                    strokeWidth="2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                  />
                  {/* Windows */}
                  {[0, 1, 2, 3].map((row) => (
                    [0, 1, 2].map((col) => (
                      <motion.rect
                        key={`window-${row}-${col}`}
                        x={232 + col * 28}
                        y={235 + row * 35}
                        width="16"
                        height="20"
                        fill="rgba(255, 228, 19, 0.2)"
                        stroke="#ffe413"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                          opacity: [0.2, 0.6, 0.2],
                        } : {}}
                        transition={{
                          delay: 0.8 + (row * 0.1) + (col * 0.05),
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2
                        }}
                      />
                    ))
                  ))}
                </g>

                {/* Communication Tower */}
                <g className="tower-group">
                  <motion.line x1="400" y1="220" x2="400" y2="380" stroke="#ffe413" strokeWidth="2"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    style={{ transformOrigin: 'bottom' }}
                  />
                  <motion.line x1="380" y1="280" x2="420" y2="280" stroke="#ffe413" strokeWidth="2"
                    initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.6 }} />
                  <motion.line x1="385" y1="320" x2="415" y2="320" stroke="#ffe413" strokeWidth="2"
                    initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.65 }} />
                  <motion.line x1="390" y1="355" x2="410" y2="355" stroke="#ffe413" strokeWidth="2"
                    initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ delay: 0.7 }} />
                  {/* Signal waves */}
                  <motion.circle
                    cx="400" cy="220" r="15"
                    fill="none"
                    stroke="#ffe413"
                    strokeWidth="1"
                    animate={{
                      r: [15, 35],
                      opacity: [0.6, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="400" cy="220" r="15"
                    fill="none"
                    stroke="#ffe413"
                    strokeWidth="1"
                    animate={{
                      r: [15, 35],
                      opacity: [0.6, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  />
                </g>

                {/* Labels */}
                <motion.text x="100" y="400" fill="#ffe413" fontSize="10" textAnchor="middle" fontWeight="600"
                  initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}} transition={{ delay: 1 }}>
                  SOLAR
                </motion.text>
                <motion.text x="270" y="400" fill="#ffe413" fontSize="10" textAnchor="middle" fontWeight="600"
                  initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}} transition={{ delay: 1.1 }}>
                  BUSINESS
                </motion.text>
                <motion.text x="400" y="400" fill="#ffe413" fontSize="10" textAnchor="middle" fontWeight="600"
                  initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.7 } : {}} transition={{ delay: 1.2 }}>
                  CONNECTIVITY
                </motion.text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
