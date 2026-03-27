import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const WhatWeDoSection = () => {
  const services = [
    {
      id: 'energy',
      icon: 'bolt',
      title: 'Energy Procurement',
      description: 'Negotiate the best electricity and gas rates for your business with our expert market analysis.'
    },
    {
      id: 'solar',
      icon: 'solar_power',
      title: 'Solar Infrastructure',
      description: 'Reduce reliance on the grid with custom solar solutions designed for your business needs.'
    },
    {
      id: 'ev',
      icon: 'ev_station',
      title: 'EV Infrastructure',
      description: 'Future-proof your business with electric vehicle charging station installation and management.'
    },
    {
      id: 'broadband',
      icon: 'wifi',
      title: 'Business Broadband',
      description: 'High-speed fibre and wireless solutions through our official One.nz partnership.'
    },
    {
      id: 'mobile',
      icon: 'smartphone',
      title: 'Mobile Plans',
      description: 'Enterprise mobile solutions with premium rates and no admin fees via One.nz.'
    },
    {
      id: 'analysis',
      icon: 'analytics',
      title: 'Annual Review',
      description: 'Yearly analysis ensures your plans remain competitive as the market evolves.'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="services-grid-section" id="services">
      <div className="container">
        <div className="services-header">
          <AnimatedSection>
            <span className="services-label">What We Do</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="services-title">
              Integrated Utility Solutions<br />
              <span>for Commercial Operations</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="services-subtitle">
              NZ Essentials provides end-to-end commercial utility solutions designed
              specifically for farms, industrial facilities, hospitality venues, retail
              operations, and growing enterprises.
            </p>
          </AnimatedSection>
        </div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="service-card-icon">
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              <a href="#contact" className="service-card-link">
                Learn More
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
