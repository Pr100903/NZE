import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: 'Getting Started',
      faqs: [
        {
          question: 'What exactly is an LOA, and why do I need to sign one?',
          answer: 'The Letter of Authority (LOA) is a standard industry document that grants us the legal power to negotiate with utility retailers on your behalf. Without it, providers cannot share your usage data or offer us discounted rates. By signing the LOA, you authorize us to do the "heavy lifting"—comparing the market and securing the best possible terms for your business.'
        },
        {
          question: 'Are you just an electricity broker?',
          answer: 'No. While electricity is a core focus, we provide a holistic utility management service. This includes Energy (electricity and both bottled and piped gas), Connectivity (business-grade Mobile and Broadband via One.nz), and Sustainability (solar infrastructure and EV charging stations).'
        }
      ]
    },
    {
      category: 'Savings & Strategy',
      faqs: [
        {
          question: 'How do you protect my business from rising energy costs?',
          answer: 'Beyond simply finding a lower rate, we help freeze your prices for longer periods. This locks in your costs and protects your business from the volatility of market price fluctuations, allowing for much more predictable budgeting.'
        },
        {
          question: 'What happens after the initial switch?',
          answer: "You won't be forgotten. We perform a Yearly Analysis for every client. The energy market changes constantly; our annual review ensures that your current plan remains the most competitive option available. If a better deal emerges, we'll be the first to let you know."
        }
      ]
    },
    {
      category: 'Partnerships & Fees',
      faqs: [
        {
          question: 'How does the partnership with One.nz work?',
          answer: 'We are an Official Acquisition Partner for One.nz, the leading provider of mobile and broadband in New Zealand. Because of this official status, we help businesses set up their telecommunications at no extra cost. We do not charge our 5% administration fee on One.nz mobile or broadband services.'
        },
        {
          question: 'If you charge a 5% fee, am I really saving money?',
          answer: 'Yes. Our 5% administration fee applies only to energy/gas accounts where we have negotiated a significantly lower rate than the standard market price. Even after our fee is applied, the net total you pay is designed to be lower than what you would pay by going direct. Essentially, our expertise pays for itself through the savings we generate.'
        }
      ]
    },
    {
      category: 'Future-Proofing Your Business',
      faqs: [
        {
          question: 'Can you help my business transition to renewable energy?',
          answer: 'Absolutely. We are committed to powering a brighter future. We consult on and help facilitate the installation of Solar Infrastructure and EV (Electric Vehicle) Infrastructure. Whether you want to reduce your carbon footprint or provide charging for your fleet, we manage the technical logistics for you.'
        },
        {
          question: 'Is NZ Essentials only for large corporations?',
          answer: 'We help businesses of all sizes. Whether you are a small local shop looking to trim overheads or a large operation requiring complex gas and EV infrastructure, our goal is the same: One Connection. Zero Hassle.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <AnimatedSection>
          <div className="faq-header">
            <span className="faq-label">FAQ</span>
            <h2 className="faq-title">
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="faq-subtitle">
              Everything you need to know about our utility brokerage services
            </p>
          </div>
        </AnimatedSection>

        <div className="faq-content">
          {faqCategories.map((category, categoryIndex) => (
            <AnimatedSection key={categoryIndex} delay={categoryIndex * 0.1}>
              <div className="faq-category">
                <h3 className="faq-category-title">{category.category}</h3>
                <div className="faq-list">
                  {category.faqs.map((faq, faqIndex) => {
                    const isOpen = openIndex === `${categoryIndex}-${faqIndex}`;
                    return (
                      <motion.div
                        key={faqIndex}
                        className={`faq-item ${isOpen ? 'open' : ''}`}
                        initial={false}
                      >
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.question}</span>
                          <motion.span
                            className="material-symbols-outlined faq-icon"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            expand_more
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              className="faq-answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <p>{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="faq-cta">
            <p>Still have questions?</p>
            <Link to="/contact" className="faq-cta-btn">
              Contact Us
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
