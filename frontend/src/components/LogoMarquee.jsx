import { motion } from 'framer-motion';

const LogoMarquee = () => {
  const brands = [
    { name: "Domino's", placeholder: true },
    { name: "Bikanervala", placeholder: true },
    { name: "FreshChoice", placeholder: true },
    { name: "Liquorland", placeholder: true },
    { name: "Thirsty Liquor", placeholder: true },
    { name: "Dementia Care", placeholder: true },
  ];

  // Duplicate for seamless scroll
  const allBrands = [...brands, ...brands];

  return (
    <section className="logo-marquee-section" id="clients">
      <div className="container">
        <motion.div
          className="marquee-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Clients</span>
          <h2 className="marquee-title">Trusted by New Zealand's Leading Brands</h2>
        </motion.div>
      </div>

      <div className="marquee-wrapper">
        <motion.div
          className="marquee-track"
          animate={{ x: [0, -50 + '%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {allBrands.map((brand, index) => (
            <div key={index} className="marquee-item">
              <div className="logo-placeholder">
                <span>{brand.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;
