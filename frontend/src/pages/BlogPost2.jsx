import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BlogPost2 = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="blog-post-page">
      <section
        className={`blog-post-hero fade-in ${isVisible ? 'visible' : ''}`}
      >
        <div className="container">
          <button
            className={`blog-back-btn fade-in-left ${isVisible ? 'visible' : ''}`}
            onClick={() => navigate('/blog')}
            style={{ marginTop: '3rem', animationDelay: '0.2s' }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Blogs
          </button>
          
          <span
            className={`blog-post-category fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            Connectivity
          </span>
          
          <h1
            className={`blog-post-title fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            Fibre, Wireless, or Satellite? The 2026 Connectivity Guide
          </h1>
          
          <div
            className={`blog-post-meta fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            <span className="material-symbols-outlined">schedule</span>
            6 min read
          </div>
        </div>
      </section>

      <section className="blog-post-content">
        <div className="container">
          <article
            className={`blog-article fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.6s' }}
          >
            <div className="blog-section">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <h2>The Problem</h2>
              <p>
                Your team is growing, you're moving more data to the cloud, and your "standard" 
                internet just isn't cutting it. But should you dig for Fibre, or is 5G Wireless enough?
              </p>
            </div>

            <div className="blog-section">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h2>The Solution: A Location-Based Strategy</h2>
              <p>
                Choosing the right connection depends on two things: <strong>Location</strong> and 
                <strong> Team Size</strong>.
              </p>
            </div>

            <div className="blog-connectivity-options">
              <div className="connectivity-card">
                <div className="connectivity-icon fibre">
                  <span className="material-symbols-outlined">cable</span>
                </div>
                <h3>Fibre (The Gold Standard)</h3>
                <p>
                  Best for fixed offices with 10+ staff. It offers the lowest latency and most 
                  consistent speeds for video conferencing and heavy cloud uploads.
                </p>
                <span className="connectivity-tag">Best for: Large offices</span>
              </div>

              <div className="connectivity-card">
                <div className="connectivity-icon wireless">
                  <span className="material-symbols-outlined">cell_tower</span>
                </div>
                <h3>Business Wireless (The Flexible Choice)</h3>
                <p>
                  Perfect for retail shops or small teams who need a quick setup. Powered by One.nz, 
                  our wireless solutions offer high-speed 5G connectivity without the need for 
                  trenching cables.
                </p>
                <span className="connectivity-tag">Best for: Retail & small teams</span>
              </div>

              <div className="connectivity-card">
                <div className="connectivity-icon satellite">
                  <span className="material-symbols-outlined">satellite_alt</span>
                </div>
                <h3>Satellite (The Rural Lifeline)</h3>
                <p>
                  If your business operates in remote areas of New Zealand, satellite ensures you 
                  are never "off the grid."
                </p>
                <span className="connectivity-tag">Best for: Remote locations</span>
              </div>
            </div>

            <div className="blog-section blog-highlight">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">handshake</span>
              </div>
              <h2>Why Choose Us?</h2>
              <p>
                As an official acquisition partner for One.nz, we help you choose and set up the 
                perfect plan with <strong>zero service fees</strong> from our end. We handle the 
                technical jargon; you get the high-speed results.
              </p>
            </div>

            <div className="blog-key-points">
              <h3>What We Offer</h3>
              <ul>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Free connectivity assessment
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Official One.nz partnership rates
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Zero service fees on setup
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Expert guidance on the right solution
                </li>
              </ul>
            </div>

            <div className="blog-cta-box">
              <h3>Not Sure Which Option is Right for You?</h3>
              <p>Fill out our form and get a personalized connectivity audit for your business.</p>
              <Link to="/contact" className="blog-cta-btn">
                Fill Our Form for a Connectivity Audit
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default BlogPost2;
