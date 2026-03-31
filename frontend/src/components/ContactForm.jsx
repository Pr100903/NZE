import { useState, useRef } from 'react';
import { submitForm } from '../services/formApi';
import TermsAndConditions from './TermsAndConditions';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    authorisedPerson: '',
    jobTitle: '',
    registeredName: '',
    tradingName: '',
    mainContactName: '',
    mainContactPhone: '',
    mainContactEmail: '',
    interestedSolar: 'Yes',
    industryType: '',
    decisionMaker: 'Yes',
    date: new Date().toISOString().split('T')[0],
    signatureDate: '',
    icp1: '',
    icp2: '',
    icp3: '',
    icp4: '',
    icp5: '',
    gasIcp1: '',
    gasIcp2: '',
    gasIcp3: '',
    gasIcp4: '',
    gasIcp5: '',
    agreeTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    setIsLoading(true);
    setSubmitMessage('Submitting your application...');

    // Get signature from canvas
    const signatureData = canvasRef.current?.toDataURL('image/png') || null;

    // Prepare data for backend
    const submissionData = {
      authPerson: formData.authorisedPerson,
      jobTitle: formData.jobTitle,
      registeredName: formData.registeredName,
      tradingName: formData.tradingName,
      contactName: formData.mainContactName,
      phone: formData.mainContactPhone,
      email: formData.mainContactEmail,
      interestedSolar: formData.interestedSolar,
      industryType: formData.industryType,
      decisionMaker: formData.decisionMaker,
      date: formData.date,
      signatureDate: formData.signatureDate,
      icp1: formData.icp1,
      icp2: formData.icp2,
      icp3: formData.icp3,
      icp4: formData.icp4,
      icp5: formData.icp5,
      gasIcp1: formData.gasIcp1,
      gasIcp2: formData.gasIcp2,
      gasIcp3: formData.gasIcp3,
      gasIcp4: formData.gasIcp4,
      gasIcp5: formData.gasIcp5,
      signature: signatureData,
    };

    try {
      const result = await submitForm(submissionData);

      if (result.success) {
        setSubmitted(true);
        setSubmitMessage(result.message);

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            authorisedPerson: '',
            jobTitle: '',
            registeredName: '',
            tradingName: '',
            mainContactName: '',
            mainContactPhone: '',
            mainContactEmail: '',
            interestedSolar: 'Yes',
            industryType: '',
            decisionMaker: 'Yes',
            date: new Date().toISOString().split('T')[0],
            signatureDate: '',
            icp1: '',
            icp2: '',
            icp3: '',
            icp4: '',
            icp5: '',
            gasIcp1: '',
            gasIcp2: '',
            gasIcp3: '',
            gasIcp4: '',
            gasIcp5: '',
            agreeTerms: false,
          });
          setSubmitted(false);
          setSubmitMessage('');
          clearSignature();
        }, 3000);
      } else {
        setSubmitMessage(`Error: ${result.message}`);
        alert(`Submission failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage(`Error: ${error.message}`);
      alert(`Failed to submit form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      {submitted ? (
        <div className="form-success">
          <h3>Thank you!</h3>
          <p>Your information has been submitted successfully. We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {/* Authorised Person Section */}
          <fieldset className="form-fieldset">
            <legend>Authorised Person Information</legend>
            
            <div className="form-group">
              <label htmlFor="authorisedPerson">Name of Authorised Person *</label>
              <input
                type="text"
                id="authorisedPerson"
                name="authorisedPerson"
                value={formData.authorisedPerson}
                onChange={handleChange}
                required
                placeholder="Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job Title *</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="Job Title"
              />
            </div>
          </fieldset>

          {/* Entity Information Section */}
          <fieldset className="form-fieldset">
            <legend>Entity Information</legend>
            
            <div className="form-group">
              <label htmlFor="registeredName">Registered Name of the Entity *</label>
              <input
                type="text"
                id="registeredName"
                name="registeredName"
                value={formData.registeredName}
                onChange={handleChange}
                required
                placeholder="Registered Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tradingName">Trading Name (if any)</label>
              <input
                type="text"
                id="tradingName"
                name="tradingName"
                value={formData.tradingName}
                onChange={handleChange}
                placeholder="Trading Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="industryType">Industry Type</label>
              <input
                type="text"
                id="industryType"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                placeholder="Industry Type"
              />
            </div>
          </fieldset>

          {/* Main Contact Section */}
          <fieldset className="form-fieldset">
            <legend>Main Contact Information</legend>
            
            <div className="form-group">
              <label htmlFor="mainContactName">Name of the Main Contact (if different)</label>
              <input
                type="text"
                id="mainContactName"
                name="mainContactName"
                value={formData.mainContactName}
                onChange={handleChange}
                placeholder="Main Contact Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mainContactPhone">Main Contact Phone Number *</label>
              <input
                type="tel"
                id="mainContactPhone"
                name="mainContactPhone"
                value={formData.mainContactPhone}
                onChange={handleChange}
                required
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mainContactEmail">Main Contact Email Address *</label>
              <input
                type="email"
                id="mainContactEmail"
                name="mainContactEmail"
                value={formData.mainContactEmail}
                onChange={handleChange}
                required
                placeholder="Email Address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="interestedSolar">Interested in Solar?</label>
                <select
                  id="interestedSolar"
                  name="interestedSolar"
                  value={formData.interestedSolar}
                  onChange={handleChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="decisionMaker">Is Main Contact Ultimate Decision Maker? *</label>
                <select
                  id="decisionMaker"
                  name="decisionMaker"
                  value={formData.decisionMaker}
                  onChange={handleChange}
                  required
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Dates Section */}
          <fieldset className="form-fieldset">
            <legend>Dates</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signatureDate">Date of Birth of Signatory *</label>
                <input
                  type="date"
                  id="signatureDate"
                  name="signatureDate"
                  value={formData.signatureDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Supply Address Section */}
          <fieldset className="form-fieldset">
            <legend>Supply Address</legend>
            
            <div className="form-grid-2">
              <div>
                <h4>Electricity ICPs</h4>
                <div className="form-group">
                  <label htmlFor="icp1">ICP 1:</label>
                  <input
                    type="text"
                    id="icp1"
                    name="icp1"
                    value={formData.icp1}
                    onChange={handleChange}
                    placeholder="ICP 1 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="icp2">ICP 2:</label>
                  <input
                    type="text"
                    id="icp2"
                    name="icp2"
                    value={formData.icp2}
                    onChange={handleChange}
                    placeholder="ICP 2 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="icp3">ICP 3:</label>
                  <input
                    type="text"
                    id="icp3"
                    name="icp3"
                    value={formData.icp3}
                    onChange={handleChange}
                    placeholder="ICP 3 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="icp4">ICP 4:</label>
                  <input
                    type="text"
                    id="icp4"
                    name="icp4"
                    value={formData.icp4}
                    onChange={handleChange}
                    placeholder="ICP 4 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="icp5">ICP 5:</label>
                  <input
                    type="text"
                    id="icp5"
                    name="icp5"
                    value={formData.icp5}
                    onChange={handleChange}
                    placeholder="ICP 5 Detail"
                  />
                </div>
              </div>

              <div>
                <h4>Gas ICPs</h4>
                <div className="form-group">
                  <label htmlFor="gasIcp1">Gas ICP 1:</label>
                  <input
                    type="text"
                    id="gasIcp1"
                    name="gasIcp1"
                    value={formData.gasIcp1}
                    onChange={handleChange}
                    placeholder="Gas ICP 1 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gasIcp2">Gas ICP 2:</label>
                  <input
                    type="text"
                    id="gasIcp2"
                    name="gasIcp2"
                    value={formData.gasIcp2}
                    onChange={handleChange}
                    placeholder="Gas ICP 2 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gasIcp3">Gas ICP 3:</label>
                  <input
                    type="text"
                    id="gasIcp3"
                    name="gasIcp3"
                    value={formData.gasIcp3}
                    onChange={handleChange}
                    placeholder="Gas ICP 3 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gasIcp4">Gas ICP 4:</label>
                  <input
                    type="text"
                    id="gasIcp4"
                    name="gasIcp4"
                    value={formData.gasIcp4}
                    onChange={handleChange}
                    placeholder="Gas ICP 4 Detail"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gasIcp5">Gas ICP 5:</label>
                  <input
                    type="text"
                    id="gasIcp5"
                    name="gasIcp5"
                    value={formData.gasIcp5}
                    onChange={handleChange}
                    placeholder="Gas ICP 5 Detail"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Signature Section */}
          <fieldset className="form-fieldset">
            <legend>Authorisation</legend>
            
            <div className="form-group">
              <label>Signed by the Duly Authorised Person *</label>
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                className="signature-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <button
                type="button"
                onClick={clearSignature}
                className="btn btn-secondary btn-sm"
              >
                Clear Signature
              </button>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                I agree to all the{' '}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTermsModal(true);
                  }}
                  className="terms-link"
                >
                  Terms and Conditions
                </a> *
              </label>
            </div>
          </fieldset>

          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Data'}
          </button>
        </form>
      )}

      {/* Terms and Conditions Modal */}
      <TermsAndConditions 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </div>
  );
};

export default ContactForm;
