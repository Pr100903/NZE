import AnimatedSection from './AnimatedSection';

const OneNZPartnershipSection = () => {
  return (
    <section className="onenz-partnership-section">
      <div className="container">
        <div className="onenz-partnership-content">
          <AnimatedSection direction="left">
            <a 
              href="https://one.nz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="onenz-logo-link"
            >
              <img 
                src="/assets/logos/OneNZ.png" 
                alt="One NZ" 
                className="onenz-partnership-logo"
              />
            </a>
          </AnimatedSection>
          
          <AnimatedSection direction="right" delay={0.2}>
            <div className="onenz-partnership-text">
              <p>
                In partnership with <a 
                  href="https://one.nz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="onenz-highlight-link"
                >One NZ</a>, we provide business-grade broadband and connectivity 
                solutions tailored for performance and reliability. Our goal is to simplify connectivity 
                for businesses by offering trusted plans that support productivity, communication, 
                and long-term growth.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default OneNZPartnershipSection;
