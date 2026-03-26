import { ContactForm } from '../components';

const ContactPage = () => {
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join Our Team</h2>
          <p className="section-description" style={{ margin: '1rem auto 0', maxWidth: '600px', color: 'rgba(255, 255, 255, 0.7)' }}>
            Fill out the form below to become a part of our energy revolution
          </p>
        </div>

        <div className="form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
