import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3500/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      if (file) {
        formDataToSend.append('powerBill', file);
      }

      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
        setSubmitMessage('Thank you! We will be in touch shortly.');
        setFormData({ name: '', email: '', phone: '' });
        setFile(null);
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const benefits = [
    { icon: 'savings', title: 'Save up to 20%', desc: 'On your electricity and gas bills' },
    { icon: 'verified', title: 'Free Audit', desc: 'No obligation energy assessment' },
    { icon: 'support_agent', title: '24/7 Support', desc: 'Dedicated account manager' },
    { icon: 'balance', title: 'Unbiased Advice', desc: 'Independent recommendations' },
  ];

  return (
    <section className="contact-page">
      {/* Floating decorative elements */}
      <div className="contact-decor">
        <motion.span 
          className="decor-icon decor-1"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="material-symbols-outlined">bolt</span>
        </motion.span>
        <motion.span 
          className="decor-icon decor-2"
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="material-symbols-outlined">local_fire_department</span>
        </motion.span>
        <motion.span 
          className="decor-icon decor-3"
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <span className="material-symbols-outlined">lightbulb</span>
        </motion.span>
        <motion.span 
          className="decor-icon decor-4"
          animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <span className="material-symbols-outlined">eco</span>
        </motion.span>
      </div>

      <div className="contact-container">
        {/* Left Side - Why Contact Us */}
        <motion.div 
          className="contact-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="contact-tagline" variants={itemVariants}>
            <span className="tagline-badge">Get Started Today</span>
          </motion.div>
          
          <motion.h1 className="contact-headline" variants={itemVariants}>
            <span className="headline-italic">Our business</span>
            <span className="headline-italic">clients save up</span>
            <span className="headline-italic">to <span className="highlight">20%</span> on their</span>
            <span className="headline-italic">electricity</span>
            <span className="headline-italic">and gas bills</span>
          </motion.h1>
          
          <motion.p className="contact-subtext" variants={itemVariants}>
            Find out how much you can save — it's free!
          </motion.p>

          <motion.div className="contact-benefits" variants={itemVariants}>
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="benefit-item"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="material-symbols-outlined benefit-icon">{benefit.icon}</span>
                <div className="benefit-content">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="contact-illustration" variants={itemVariants}>
            <div className="illustration-wave">
              <svg viewBox="0 0 200 60" className="wave-svg">
                <motion.path
                  d="M0,30 Q25,10 50,30 T100,30 T150,30 T200,30"
                  fill="none"
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                />
              </svg>
              <span className="illustration-text">Let's connect!</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div 
          className="contact-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {submitted ? (
            <motion.div 
              className="contact-success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className="material-symbols-outlined success-icon">check_circle</span>
              <h3>Awesome!</h3>
              <p>{submitMessage}</p>
              <button 
                className="btn-reset"
                onClick={() => setSubmitted(false)}
              >
                Submit Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-modern">
              <div className="form-header">
                <span className="material-symbols-outlined form-header-icon">edit_note</span>
                <h3>Tell us about you</h3>
              </div>

              <div className="form-field">
                <label htmlFor="name">Your name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Kia Ora, what's your name?"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Your email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@yourbusiness.co.nz"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Your phone *</label>
                <div className="phone-input-wrapper">
                  <div className="phone-prefix">
                    <span className="flag-text">NZ</span>
                    <span>+64</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="21 234 5678"
                    required
                  />
                </div>
              </div>

              <div className="form-field file-field">
                <p className="file-description">
                  Got your power bill? Attach it for a faster quote! 
                  No worries if not — we'll sort it out together.
                </p>
                <input
                  type="file"
                  id="powerBill"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  className="btn-add-files"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span className="material-symbols-outlined">attach_file</span>
                  {file ? file.name : 'Add files'}
                </button>
                {file && (
                  <button 
                    type="button" 
                    className="btn-remove-file"
                    onClick={() => setFile(null)}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>

              <button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
              </button>

              <p className="form-disclaimer">
                By submitting, you agree to our{' '}
                <a href="/privacy-policy">Privacy Policy</a>. 
                Questions? Email <a href="mailto:Kiaora@nzessentials.co.nz">Kiaora@nzessentials.co.nz</a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
