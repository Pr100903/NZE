import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const faqCategories = useMemo(() => [
    {
      category: "General Questions",
      icon: "help_outline",
      faqs: [
        {
          question: "What exactly is an LOA, and why do I need to sign one?",
          answer: "The Letter of Authority (LOA) is a standard industry document that grants us the legal power to negotiate with utility retailers on your behalf. Without it, providers cannot share your usage data or offer us discounted rates. By signing the LOA, you authorize us to do the \"heavy lifting\"—comparing the market and securing the best possible terms for your business."
        },
        {
          question: "Are you just an electricity broker?",
          answer: "No. While electricity is a core focus, we provide a holistic utility management service. This includes: Energy (Electricity and both bottled and piped gas), Connectivity (Business-grade Mobile and Broadband via One.nz), and Sustainability (Solar infrastructure and EV charging stations)."
        }
      ]
    },
    {
      category: "Savings & Strategy",
      icon: "savings",
      faqs: [
        {
          question: "How do you protect my business from rising energy costs?",
          answer: "Beyond simply finding a lower rate, we help freeze your prices for longer periods. This locks in your costs and protects your business from the volatility of market price fluctuations, allowing for much more predictable budgeting."
        },
        {
          question: "What happens after the initial switch?",
          answer: "You won't be forgotten. We perform a Yearly Analysis for every client. The energy market changes constantly; our annual review ensures that your current plan remains the most competitive option available. If a better deal emerges, we'll be the first to let you know."
        }
      ]
    },
    {
      category: "Partnerships & Fees",
      icon: "handshake",
      faqs: [
        {
          question: "How does the partnership with One.nz work?",
          answer: "We are an Official Acquisition Partner for One.nz, the leading provider of mobile and broadband in New Zealand. Because of this official status, we help businesses set up their telecommunications at no extra cost. We do not charge our service administration fee on One.nz mobile or broadband services."
        },
        {
          question: "If you charge a service fee, am I really saving money?",
          answer: "Yes. Our service administration fee applies only to energy/gas accounts where we have negotiated a significantly lower rate than the standard market price. Even after our fee is applied, the net total you pay is designed to be lower than what you would pay by going direct. Essentially, our expertise pays for itself through the savings we generate."
        }
      ]
    },
    {
      category: "Future-Proofing Your Business",
      icon: "eco",
      faqs: [
        {
          question: "Can you help my business transition to renewable energy?",
          answer: "Absolutely. We are committed to powering a brighter future. We consult on and help facilitate the installation of Solar Infrastructure and EV (Electric Vehicle) Infrastructure. Whether you want to reduce your carbon footprint or provide charging for your fleet, we manage the technical logistics for you."
        },
        {
          question: "Is NZ Essentials only for large corporations?",
          answer: "We help businesses of all sizes. Whether you are a small local shop looking to trim overheads or a large operation requiring complex gas and EV infrastructure, our goal is the same: One Connection. Zero Hassle."
        }
      ]
    }
  ], []);

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="faq-page">
      <motion.div
        className="faq-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">Support</span>
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about NZ Essentials and how we can help your business.</p>
      </motion.div>

      <div className="faq-content">
        {faqCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            className="faq-category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <h2 className="faq-category-title">
              <span className="material-symbols-outlined">{category.icon}</span>
              {category.category}
            </h2>
            <div className="faq-list">
              {category.faqs.map((faq, faqIndex) => {
                const key = `${categoryIndex}-${faqIndex}`;
                const isOpen = openItems[key];

                return (
                  <div
                    key={faqIndex}
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleItem(categoryIndex, faqIndex)}
                    >
                      <h3>{faq.question}</h3>
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="faq-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3>Still have questions?</h3>
        <p>We're here to help. Get in touch with our team for personalized assistance.</p>
        <Link to="/contact" className="faq-cta-btn">
          Contact Us
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default FAQPage;
