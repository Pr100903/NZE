import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const AboutPage = () => {
  const values = [
    {
      icon: 'handshake',
      title: 'Transparency',
      description: 'No hidden fees, no corporate jargon. Just honest advice and real savings.'
    },
    {
      icon: 'trending_up',
      title: 'Results-Driven',
      description: 'Our success is measured by your savings. We only win when you win.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Your business never sleeps, and neither do we. Always here when you need us.'
    },
    {
      icon: 'eco',
      title: 'Sustainability',
      description: 'Committed to powering a brighter future through green energy solutions.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <AnimatedSection>
            <span className="about-label">About Us</span>
            <h1 className="about-hero-title">
              Your Partner in <span>Utility Management</span>
            </h1>
            <p className="about-hero-subtitle">
              Fighting for your bottom line since day one
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section about-story">
        <div className="container">
          <div className="about-grid">
            <AnimatedSection direction="left">
              <div className="about-content">
                <span className="about-section-label">Our Story</span>
                <h2 className="about-section-title">
                  Bridging the Gap Between <span>Businesses and Savings</span>
                </h2>
                <p className="about-text">
                  At NZ Essentials, we believe that New Zealand businesses shouldn't have to
                  overpay for the basic services that keep them running. Managing energy and
                  telecommunications is often complex, time-consuming, and expensive.
                </p>
                <p className="about-text">
                  We were founded to bridge that gap—acting as the expert middleman who fights
                  for your bottom line. As a specialist utility broker and a proud acquisition
                  partner for One.nz, we provide a single point of contact for your most
                  critical business connections.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="about-visual">
                <div className="about-stat-card">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="about-stat-card highlight">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Businesses Served</span>
                </div>
                <div className="about-stat-card">
                  <span className="stat-number">$2M+</span>
                  <span className="stat-label">Client Savings</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="about-section about-leadership">
        <div className="container">
          <div className="about-grid reverse">
            <AnimatedSection direction="left">
              <div className="leader-card">
                <img
                  src="/assets/map.png"
                  alt="Service area map"
                  className="leader-map-image"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="about-content">
                <span className="about-section-label">Our Leadership</span>
                <h2 className="about-section-title">
                  Led by <span>Industry Expertise</span>
                </h2>
                <p className="about-text">
                  The company is led by Vipin Yadav, a veteran of the energy sector with over
                  6 years of hands-on experience in utility management and negotiation.
                </p>
                <p className="about-text">
                  Having seen the inner workings of energy retail, Vipin recognized a need for
                  a more transparent, client-focused brokerage model that prioritizes real-world
                  savings over corporate jargon.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-section about-vision">
        <div className="container">
          <AnimatedSection>
            <div className="vision-content">
              <span className="about-section-label">The Vision</span>
              <blockquote className="vision-quote">
                "My vision for NZ Essentials is to create a 'One Connection' ecosystem
                where business owners can completely outsource their utility worries.
                We don't just want to lower your bills; we want to empower your growth.
                By combining the scale of providers like One.nz with our boutique negotiation
                expertise, we ensure that every Kiwi business—no matter the size—gets the
                premium rates and 24/7 support they deserve."
              </blockquote>
              <cite className="vision-cite">— Vipin Yadav, Founder</cite>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section about-values">
        <div className="container">
          <AnimatedSection>
            <div className="about-header-center">
              <span className="about-section-label">Our Values</span>
              <h2 className="about-section-title">
                What Drives <span>Our Mission</span>
              </h2>
            </div>
          </AnimatedSection>

          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="value-icon">
                  <span className="material-symbols-outlined">{value.icon}</span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section about-cta">
        <div className="container">
          <AnimatedSection>
            <div className="cta-content">
              <h2>Ready to Lower Your Utility Bills?</h2>
              <p>Join hundreds of Kiwi businesses saving with NZ Essentials</p>
              <Link to="/contact" className="cta-btn">
                Get Your Free Audit
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
