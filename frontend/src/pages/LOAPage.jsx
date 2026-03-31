import { ContactForm } from '../components';

const LOAPage = () => {
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Letter of JOINING</h2>
          <p className="section-description" style={{ margin: '1rem auto 0', maxWidth: '600px', color: 'rgba(255, 255, 255, 0.7)' }}>
            Fill out the form below to authorize NZ Essentials to negotiate better energy rates on your behalf
          </p>
        </div>

        <div className="form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default LOAPage;
