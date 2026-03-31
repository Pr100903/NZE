import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactPage.css';

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

      const response = await fetch('http://localhost:3000/api/contact', {
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
    { icon: 'speed', title: 'Quick Process', desc: 'Results within 48 hours' },
  ];

  return (
    <section className="contact-page">
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
            Find out how much you can save.
          </motion.p>

          <motion.div className="contact-benefits" variants={itemVariants}>
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="benefit-item"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
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
            <div className="illustration-hand">
              <span className="material-symbols-outlined hand-icon">back_hand</span>
              <span className="material-symbols-outlined spark-icon spark-1">bolt</span>
              <span className="material-symbols-outlined spark-icon spark-2">local_fire_department</span>
              <span className="material-symbols-outlined spark-icon spark-3">ac_unit</span>
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
              <h3>Thank You!</h3>
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
              <div className="form-field">
                <label htmlFor="name">Your name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
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
                  placeholder="mail@example.co.nz"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Your phone *</label>
                <div className="phone-input-wrapper">
                  <div className="phone-prefix">
                    <span className="flag-icon">🇳🇿</span>
                    <span>+64</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(000)000-0000"
                    required
                  />
                </div>
              </div>

              <div className="form-field file-field">
                <p className="file-description">
                  Attach your business power bill and if you don't have one, 
                  just submit the form without it and we will be in touch!
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
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

              <p className="form-disclaimer">
                By submitting the request, you consent to the processing of your personal data and agree to our{' '}
                <a href="/privacy-policy">Privacy Policy</a>. For general queries, including partnership opportunities, 
                please email <a href="mailto:info@nzessentials.co.nz">info@nzessentials.co.nz</a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
