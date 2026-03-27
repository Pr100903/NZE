import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const PowerBillSection = () => {
  return (
    <section className="power-bill-section">
      <div className="container">
        <div className="power-bill-grid">
          {/* Left: Content */}
          <AnimatedSection direction="left">
            <div className="power-bill-content">
              <span className="section-label">Savings Made Easy</span>
              <h2 className="power-bill-title">
                Saving Money Doesn't <span>Have to be Hard Work</span>
              </h2>
              <p className="power-bill-text">
                Simply upload your power bill, and we'll handle the rest. Our expert team analyzes your usage, negotiates with providers, and finds you the best rates—all while you focus on running your business.
              </p>
              <div className="power-bill-features">
                <div className="power-bill-feature">
                  <span className="material-symbols-outlined">upload_file</span>
                  <span>Upload Your Bill</span>
                </div>
                <div className="power-bill-feature">
                  <span className="material-symbols-outlined">analytics</span>
                  <span>We Analyze & Compare</span>
                </div>
                <div className="power-bill-feature">
                  <span className="material-symbols-outlined">savings</span>
                  <span>You Save Money</span>
                </div>
              </div>
              <a href="/contact" className="power-bill-btn">
                Upload Your Bill Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Bill Comparison Visual */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="power-bill-visual">
              <motion.div
                className="bill-card bill-old"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bill-header">
                  <span className="material-symbols-outlined">receipt_long</span>
                  <span className="bill-label">Current Bill</span>
                </div>
                <div className="bill-amount">$850</div>
                <div className="bill-period">per month</div>
                <div className="bill-status bill-status-bad">
                  <span className="material-symbols-outlined">trending_up</span>
                  Rising costs
                </div>
              </motion.div>

              <motion.div
                className="bill-arrow"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.div>

              <motion.div
                className="bill-card bill-new"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="bill-header">
                  <span className="material-symbols-outlined">verified</span>
                  <span className="bill-label">With NZE</span>
                </div>
                <div className="bill-amount">$640</div>
                <div className="bill-period">per month</div>
                <div className="bill-status bill-status-good">
                  <span className="material-symbols-outlined">trending_down</span>
                  Save $210/month
                </div>
              </motion.div>

              <motion.div
                className="bill-savings-badge"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="badge-icon">
                  <span className="material-symbols-outlined">percent</span>
                </div>
                <div className="badge-content">
                  <div className="badge-number">25%</div>
                  <div className="badge-text">Average Savings</div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default PowerBillSection;
