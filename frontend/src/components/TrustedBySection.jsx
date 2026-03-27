import { motion } from 'framer-motion';

const TrustedBySection = () => {
  // Placeholder logos - these will be replaced with actual SVGs later
  const logos = [
    { name: "Domino's", placeholder: true },
    { name: 'Bikanervala', placeholder: true },
    { name: 'FreshChoice', placeholder: true },
    { name: 'Liquorland', placeholder: true },
    { name: 'Thirsty Liquor', placeholder: true },
    { name: 'Dementia Care', placeholder: true },
  ];

  // Double the logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="trusted-section" id="clients">
      <div className="container">
        <motion.div
          className="trusted-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="trusted-label">Trusted Partners</span>
          <h2 className="trusted-title">
            Trusted by New Zealand's <span>Leading Brands</span>
          </h2>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="marquee-item">
              {logo.placeholder ? (
                <div className="logo-placeholder">
                  <span>{logo.name}</span>
                </div>
              ) : (
                <img src={logo.src} alt={logo.name} className="logo-img" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
