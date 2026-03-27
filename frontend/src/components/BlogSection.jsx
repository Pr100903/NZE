import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      icon: 'trending_up',
      tag: 'Energy Strategy',
      title: 'Is Market Volatility Killing Your Bottom Line?',
      excerpt: 'Energy prices in New Zealand can be unpredictable. For a business, a sudden spike in the wholesale market doesn\'t just mean a higher bill—it means a ruined budget and squeezed margins.',
      solution: 'By locking in a rate for 12, 24, or even 36 months through fixed-term contracts, we provide you with Price Certainty. Even if the market spikes next winter, your rate stays exactly where it is.',
      cta: 'Contact Us for a Free Rate Review',
      link: '/contact'
    },
    {
      id: 2,
      icon: 'wifi',
      tag: 'Connectivity',
      title: 'Fibre, Wireless, or Satellite? The 2026 Connectivity Guide',
      excerpt: 'Your team is growing, you\'re moving more data to the cloud, and your "standard" internet just isn\'t cutting it. But should you dig for Fibre, or is 5G Wireless enough?',
      solution: 'Choosing the right connection depends on two things: Location and Team Size. As an official acquisition partner for One.nz, we help you choose and set up the perfect plan with zero service fees.',
      cta: 'Fill Our Form for a Connectivity Audit',
      link: '/contact'
    },
    {
      id: 3,
      icon: 'solar_power',
      tag: 'Sustainability',
      title: 'Solar & EV: Turning Sustainability into Profit',
      excerpt: 'In 2026, "Going Green" is no longer just a marketing slogan—it\'s a financial necessity. With rising carbon costs and fuel prices, traditional energy models are becoming a liability.',
      solution: 'We help businesses modernize their footprint through Solar Infrastructure and EV Charging Stations. Sustainability should be simple—we act as your consultants for a seamless green transition.',
      cta: 'Contact Us to Discuss Your Green Transition',
      link: '/contact'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="blog-section" id="blogs">
      <div className="container">
        <AnimatedSection>
          <div className="blog-header">
            <span className="blog-label">Insights</span>
            <h2 className="blog-title">
              Latest from <span>Our Blog</span>
            </h2>
            <p className="blog-subtitle">
              Expert advice on energy management, connectivity, and sustainability for Kiwi businesses
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              className="blog-card"
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="blog-card-image">
                <span className="material-symbols-outlined">{blog.icon}</span>
              </div>
              <div className="blog-card-content">
                <span className="blog-tag">{blog.tag}</span>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <p className="blog-card-solution">
                  <strong>The Solution:</strong> {blog.solution}
                </p>
                <a href={blog.link} className="blog-card-link">
                  {blog.cta}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
