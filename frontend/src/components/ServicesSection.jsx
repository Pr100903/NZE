import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const ServiceCard = ({ step, title, description, imageUrl, link, linkText, reversed }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);

  const imageContent = (
    <AnimatedSection direction={reversed ? 'right' : 'left'} delay={0.2}>
      <motion.div style={{ y }} ref={ref}>
        <img
          src={imageUrl}
          alt={title}
          className="services-image"
          loading="lazy"
        />
      </motion.div>
    </AnimatedSection>
  );

  const textContent = (
    <div>
      <AnimatedSection direction={reversed ? 'left' : 'right'}>
        <span className="section-label">{step}</span>
      </AnimatedSection>

      <AnimatedSection direction={reversed ? 'left' : 'right'} delay={0.1}>
        <h2
          className="section-title"
          style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
        >
          {title}
        </h2>
      </AnimatedSection>

      <AnimatedSection direction={reversed ? 'left' : 'right'} delay={0.2}>
        <p className="section-description" style={{ marginTop: 0 }}>
          {description}
        </p>
      </AnimatedSection>

      <AnimatedSection direction={reversed ? 'left' : 'right'} delay={0.3}>
        <a
          href={link}
          className="btn-link"
          style={{ marginTop: '2rem', display: 'inline-flex' }}
        >
          {linkText}
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </AnimatedSection>
    </div>
  );

  return (
    <div className="grid-2" style={{ marginBottom: '8rem' }}>
      {reversed ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      step: 'Step One',
      title: 'Strategic Consulting',
      description: 'Our experts analyze your current infrastructure to identify hidden inefficiencies. We develop a roadmap that balances immediate cost-savings with long-term infrastructure resilience.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbJI1Kh9e_q-BTq9AK-iCaZbNRjNeqgyFVFV8npwrUblDMXnia3nQyN9OPkFW9c6J4gPwDAb-epTTrm9SV7UTv3c1CC4oCMKfw29h15jD5iToRmnEuZub4KLxG9Su5EkelwAn1JgoddgPPB4yKWrJSiYCueknUZk33RmsXMH7II7U16YXAHodWKn2ofj-dKRGWl7lZfBT3uh1eAzCaZCnPqEARuwtqnCqX1dg2z5ZAnG-7cLJlELbnNPMJBfluuqOpaRjESAH_s0S8',
      link: '#consulting',
      linkText: 'Consult with experts',
      reversed: true
    },
    {
      step: 'Step Two',
      title: 'Solar Power',
      description: 'High-density photovoltaic systems tailored for commercial rooftops and ground-mount arrays. Our solutions incorporate smart inverters and battery storage for 24/7 reliability.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUHM2hmdGsCYVYRn-VIrr3jL5g-uy-ZW5pvdSM5mgV05O-JJ6sKDg5ElPgD3HHnZjdmEstL9DpnbB98J2ef02OPHLKKFgwHLzl8GDuuH2R8b3WQk2gZWqoGAvVqCuM2hb_ruK0CnnbDlW2DRRqF8_MFiUhY3SJgB2TUVdc8CVZzI9m-eRU7BL0VT5H-lDMF3luJMW46H9J3YxfM5MzuLa_pXv40eqwb_ZWwPZqe5Wym5s_12Kh_7e-Kh-PXG5J2iVjtFResgVeaHF5',
      link: '#solar',
      linkText: 'View solar tech',
      reversed: false
    },
    {
      step: 'Step Three',
      title: 'Wind Turbine',
      description: 'Harness the power of the air with grid-scale wind solutions. We provide end-to-end turbine management from site selection and environmental impact to mechanical maintenance.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVUtO5-U9uAnVgVGVSCc8R1bKxDSn26k0HH5zEcXBM8GgzlvIKNmJ7UCPVQ4mG46ov5ncJJmeqQMt-KxYpvZZQDTYJA_5vHY2ubXZ_yqr7i36toeXyBI2N3YVZKnduzxx0kzbkVNp7K9JLuxIyaJMcXviRpm1LH9wKYDB-xLnZGAqd8TLyD30-4qSz8wFuIKO4I4I2l1G-RfBdxwADhfpHs5s-KJdlChqyPKcJc0yfe9kiSHIljeegeUZcC0t_0Vk7B3B6AhZ3KnQo',
      link: '#wind',
      linkText: 'Wind energy specs',
      reversed: true
    }
  ];

  return (
    <section className="section section-gray" id="consulting">
      <div className="container">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
