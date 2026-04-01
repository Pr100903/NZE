import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BlogPost1 = () => {
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
            Energy Strategy
          </span>
          
          <h1
            className={`blog-post-title fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            Is Market Volatility Killing Your Bottom Line?
          </h1>
          
          <div
            className={`blog-post-meta fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            <span className="material-symbols-outlined">schedule</span>
            5 min read
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
                Energy prices in New Zealand can be unpredictable. For a business, a sudden spike 
                in the wholesale market doesn't just mean a higher bill—it means a ruined budget 
                and squeezed margins.
              </p>
            </div>

            <div className="blog-section">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <h2>The Solution: The "Fixed-Term" Shield</h2>
              <p>
                Most businesses fall into the trap of staying on "variable" rates because it feels 
                flexible. In reality, it leaves you vulnerable. At NZ Essentials, we specialize in 
                negotiating fixed-term contracts.
              </p>
              <p>
                By locking in a rate for 12, 24, or even 36 months, we provide you with 
                <strong> Price Certainty</strong>. Even if the market spikes next winter, your rate 
                stays exactly where it is.
              </p>
            </div>

            <div className="blog-section blog-highlight">
              <div className="blog-section-icon">
                <span className="material-symbols-outlined">help</span>
              </div>
              <h2>Why Use a Broker?</h2>
              <p>
                Retailers often reserve their best "unlisted" rates for brokers who bring them 
                high-volume business. We negotiate these rates on your behalf, ensuring that even 
                after our service admin fee, your net savings are significantly higher than going direct.
              </p>
            </div>

            <div className="blog-key-points">
              <h3>Key Benefits</h3>
              <ul>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Price certainty for 12-36 months
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Access to exclusive "unlisted" broker rates
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Protection from market volatility
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Net savings even after our service administration fee
                </li>
              </ul>
            </div>

            <div className="blog-cta-box">
              <h3>Ready to Protect Your Business?</h3>
              <p>Get a free rate review and discover how much you could save with a fixed-term contract.</p>
              <Link to="/contact" className="blog-cta-btn">
                Contact Us for a Free Rate Review
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default BlogPost1;
