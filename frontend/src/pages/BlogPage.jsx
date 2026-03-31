import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogs = useMemo(() => [
    {
      id: 1,
      title: "Market Volatility & Your Bottom Line",
      category: "Energy Strategy",
      excerpt: "How fixed-term contracts protect your business from unpredictable energy price spikes.",
      icon: "trending_up",
      color: "#ffe413",
      link: "/blog/market-volatility"
    },
    {
      id: 2,
      title: "The 2026 Connectivity Guide",
      category: "Connectivity",
      excerpt: "Fibre, Wireless, or Satellite? Choosing the right solution for your business needs.",
      icon: "wifi",
      color: "#4ecdc4",
      link: "/blog/connectivity-guide"
    },
    {
      id: 3,
      title: "Sustainability into Profit",
      category: "Sustainability",
      excerpt: "Turn your green transition into a financial advantage with Solar and EV infrastructure.",
      icon: "solar_power",
      color: "#96ceb4",
      link: "/blog/sustainability"
    }
  ], []);

  return (
    <div className="blog-page-modern">
      <motion.section
        className="blog-hero-modern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Insights & Resources
          </motion.span>
          <motion.h1
            className="blog-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Expert Advice for<br />
            <span>Kiwi Businesses</span>
          </motion.h1>
          <motion.p
            className="blog-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stay informed with the latest strategies for reducing costs and future-proofing your operations.
          </motion.p>
        </div>
      </motion.section>

      <section className="blog-grid-modern">
        <div className="container">
          <div className="blog-cards-modern">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                className="blog-card-modern"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="blog-card-icon-modern"
                  style={{ backgroundColor: `${blog.color}15` }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: blog.color }}
                  >
                    {blog.icon}
                  </span>
                </div>
                <span className="blog-card-category">{blog.category}</span>
                <h2 className="blog-card-title-modern">{blog.title}</h2>
                <p className="blog-card-excerpt-modern">{blog.excerpt}</p>
                <Link to={blog.link} className="blog-card-link-modern">
                  Read More
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-cta-section">
        <div className="container">
          <motion.div
            className="blog-cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>Want to learn more?</h3>
            <p>Get personalized advice for your business needs</p>
            <Link to="/contact" className="blog-cta-btn">
              Get in Touch
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
