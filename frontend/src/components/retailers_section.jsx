import { useMemo } from 'react';
import { motion } from 'framer-motion';

const RetailersSection = () => {
  const brands = useMemo(() => [
    { name: "Contact", src: '/assets/retailers/contact.svg.png' },
    { name: "Ecotricity", src: '/assets/retailers/ecotricity.png' },
    { name: "Genesis", src: '/assets/retailers/genesis.png' },
    { name: "Mercury", src: '/assets/retailers/mercury.png' },
    { name: "Meridian", src: '/assets/retailers/Meridian.png' },
    { name: "Nova", src: '/assets/retailers/nova.svg' },
    { name: "Powershop", src: '/assets/retailers/powershop.png' },
    { name: "Pulseenergy", src: '/assets/retailers/pulseenergy.png' },
    { name: "OneNZ", src: '/assets/retailers/OneNZ.png' },
  ], []);

  // Double the brands for seamless infinite scroll
  const duplicatedBrands = useMemo(() => [...brands, ...brands], [brands]);

  return (
    <section className="retailers-section" id="retailers">
      <div className="container">
        <motion.div
          className="retailers-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="retailers-label">Partners</span>
          <h2 className="retailers-title">
            Some retailers we <span>Negotiate With</span>
          </h2>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {duplicatedBrands.map((brand, index) => (
            <div key={index} className="logo-marquee-item" data-brand={brand.name}>
              <img src={brand.src} alt={brand.name} className="brand-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetailersSection;
