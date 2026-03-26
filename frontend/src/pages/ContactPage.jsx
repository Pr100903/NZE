import { ContactForm } from '../components';

const ContactPage = () => {
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join Our Team</h2>
          
        </div>
        
        <div className="form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
