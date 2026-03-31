import { motion } from 'framer-motion';

const TrustedBySection = () => {
  // Use actual logos from assets/logos folder
  const logos = [
    { name: "Domino's", src: '/assets/logos/Dominos.svg.png' },
    { name: 'Woolworths', src: '/assets/logos/ww.svg' },
    { name: 'FreshChoice', src: '/assets/logos/fc.svg' },
    { name: 'Liquorland', src: '/assets/logos/LiquorLandNZ.svg.png' },
    { name: 'Thirsty Liquor', src: '/assets/logos/TL_FULL.svg' },
    { name: 'Umm', src: '/assets/logos/umm.png' },
    { name: 'Woolworths Alt', src: '/assets/logos/ww.png' },
  ];

  // Triple the logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

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
              <img src={logo.src} alt={logo.name} className="logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
