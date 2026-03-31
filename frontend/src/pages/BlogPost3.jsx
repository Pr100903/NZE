import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const BlogPost3 = () => {
  const navigate = useNavigate();

  return (
    <div className="blog-post-page">
      <motion.section
        className="blog-post-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.button
            className="blog-back-btn"
            onClick={() => navigate('/blog')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Blogs
          </motion.button>
          
          <motion.span
            className="blog-post-category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Sustainability
          </motion.span>
          
          <motion.h1
            className="blog-post-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Solar & EV: Turning Sustainability into Profit
          </motion.h1>
          
          <motion.div
            className="blog-post-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="material-symbols-outlined">schedule</span>
            5 min read
          </motion.div>
        </div>
      </motion.section>

      <section className="blog-post-content">
        <div className="container">
          <motion.article
            className="blog-article"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="blog-section">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <h2>The Problem</h2>
              <p>
                In 2026, "Going Green" is no longer just a marketing slogan—it's a financial necessity. 
                With rising carbon costs and fuel prices, traditional energy models are becoming a 
                liability for Kiwi businesses.
              </p>
            </div>

            <div className="blog-section">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h2>The Solution: Infrastructure as an Investment</h2>
              <p>
                Transitioning to sustainable energy doesn't have to be a headache. We help businesses 
                modernize their footprint through two main pillars:
              </p>
            </div>

            <div className="blog-sustainability-pillars">
              <div className="pillar-card">
                <div className="pillar-number">1</div>
                <div className="pillar-icon">
                  <span className="material-symbols-outlined">solar_power</span>
                </div>
                <h3>Solar Infrastructure</h3>
                <p>
                  We analyze your roof space and energy consumption to design a solar solution that 
                  reduces your reliance on the grid. This isn't just "clean" energy; it's 
                  <strong> energy you own</strong>.
                </p>
              </div>

              <div className="pillar-card">
                <div className="pillar-number">2</div>
                <div className="pillar-icon">
                  <span className="material-symbols-outlined">ev_station</span>
                </div>
                <h3>EV Charging Stations</h3>
                <p>
                  Whether you are transitioning your company fleet to electric or want to provide 
                  a value-add service for your customers, we manage the installation of EV charging 
                  infrastructure.
                </p>
              </div>
            </div>

            <div className="blog-section blog-highlight">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h2>Our Vision</h2>
              <p>
                Sustainability should be simple. We act as your consultants, sourcing the best 
                installers and ensuring your new green infrastructure integrates seamlessly with 
                your existing utility accounts.
              </p>
            </div>

            <div className="blog-key-points">
              <h3>Benefits of Going Green</h3>
              <ul>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Reduce long-term energy costs
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Own your energy production
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Future-proof against rising carbon costs
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Enhance your brand's sustainability credentials
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Seamless integration with existing systems
                </li>
              </ul>
            </div>

            <div className="blog-cta-box">
              <h3>Ready to Make the Green Transition?</h3>
              <p>Contact us to discuss how we can help your business embrace sustainable energy solutions.</p>
              <Link to="/contact" className="blog-cta-btn">
                Contact Us to Discuss Your Green Transition
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
};

export default BlogPost3;
