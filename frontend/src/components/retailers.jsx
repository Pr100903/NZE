import { motion } from 'framer-motion';

const retailers = () => {
  // Dummy brand logos - replace with actual SVGs/images later
  const brands = [
    { name: "Contact", placeholder: "CONTACT" },
    { name: "Ecotricity", placeholder: "ECOTRICITY" },
    { name: "Genesis", placeholder: "GENESIS" },
    { name: "Mercury", placeholder: "MERCURY" },
    { name: "Meridian", placeholder: "MERIDIAN" },
    { name: "Nova", placeholder: "NOVA" },
    { name: "Powershop", placeholder: "POWERSHOP" },
    { name: "Pulseenergy", placeholder: "PULSE ENERGY" },
  ];

  // Double the brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="retailers-section" id="retailers">
      <div className="container">
        <motion.div
          className="trusted-brands-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="trusted-brands-label">Retailers</span>
          <h2 className="trusted-brands-title">
            Trusted by New Zealand's <span>Leading Brands</span>
          </h2>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {duplicatedBrands.map((brand, index) => (
            <div key={index} className="logo-marquee-item">
              <div className="brand-logo-placeholder">
                {brand.placeholder}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default retailers;
