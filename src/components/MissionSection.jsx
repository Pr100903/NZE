import AnimatedSection from './AnimatedSection';

const MissionSection = () => {
  const features = [
    { icon: 'bolt', text: 'Next-Gen Power Storage' },
    { icon: 'analytics', text: 'Real-time Grid Monitoring' },
    { icon: 'public', text: 'Global Carbon Compliance' }
  ];

  return (
    <section className="section section-gray" id="clean-energy">
      <div className="container">
        <div className="grid-2">
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                left: '-40px',
                width: '160px',
                height: '160px',
                background: 'rgba(255, 228, 19, 0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)'
              }}
            />

            <AnimatedSection delay={0}>
              <span className="section-label">Our Mission</span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>
                Innovative Renewable <br />Energy Solutions
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="section-description">
                NZ Essentials is leading the charge towards a sustainable future
                with cutting-edge technology and strategic energy management.
                We don't just provide power; we engineer freedom from rising utility costs.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <ul className="feature-list" style={{ marginTop: '2rem' }}>
                {features.map((feature, index) => (
                  <li key={index}>
                    <span className="material-symbols-outlined">{feature.icon}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatedSection delay={0.2} direction="scale">
                <div className="image-container" style={{ height: '16rem' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNRE7MhxCyAC1BOA2eUuD_7WPs2BfVroTgx9DP6YXDKNziuapQJ9QjIMHFh2rAzaje2jN2CmrTGvTX6l8PGA1q_eUGGSmLvZK9NfyjMaLBRQUoiIhN86XGOx34H4PvWbzzcC9vHDeIo-npanAIE00Q1jN1r2U8nioWVAibNSdRcc1RYG2j9DbxUxXpHEJ4buGi1z5KT_0OrcoZoB4p21fqjrK68utIPY7u_l3lmGOhKDzOo-JMq3V5Wbny26lAa4KqHn0CQcmjr390"
                    alt="Solar panels reflecting sunlight"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3} direction="up">
                <div className="stat-box">
                  <span className="stat-number" style={{ color: 'var(--black)' }}>98%</span>
                  <span className="stat-label">Client Efficiency Increase</span>
                </div>
              </AnimatedSection>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '3rem' }}>
              <AnimatedSection delay={0.4} direction="up">
                <div className="stat-box stat-box-dark">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years Industry Experience</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.5} direction="scale">
                <div className="image-container" style={{ height: '16rem' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYBRcaMNhqJxFdFA7SUn44dMpNfEPYYwjlJNmYuQMYQJQWVpLn_mN7W7LLFOukhf637Oka9wLDKXa3ChVLWhS9c_no-L4mF8jJ1pHbXyPUudd4Ohn9XThf94nR11LcqpkTawj2DglWdXnl9UKM9WE_QpGcfKi98BC6xkPnDKoBqVXyTkdiZJZ_iOcmUaiL5DjJUUCbjfbZ_JzsahlexLQ1Xi1r2wK4IVTwUBLgZDa7_OIu2GPIX-FwsC6f7UG1ed-Pc_-_FRbq292p"
                    alt="Worker inspecting renewable energy equipment"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
