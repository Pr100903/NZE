import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection observer for cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

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
      <section
        className={`blog-hero-modern fade-in ${isVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <span
            className={`section-label fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            Insights & Resources
          </span>
          <h1
            className={`blog-hero-title fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            Expert Advice for<br />
            <span>Kiwi Businesses</span>
          </h1>
          <p
            className={`blog-hero-desc fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            Stay informed with the latest strategies for reducing costs and future-proofing your operations.
          </p>
        </div>
      </section>

      <section className="blog-grid-modern">
        <div className="container">
          <div className="blog-cards-modern">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="blog-card-modern fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-box">
            <h3>Want to learn more?</h3>
            <p>Get personalized advice for your business needs</p>
            <Link to="/contact" className="blog-cta-btn">
              Get in Touch
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
