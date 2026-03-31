import { useState } from 'react';
import '../styles/TermsModal.css';

const TermsAndConditions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="terms-modal-header">
          <h2>Terms and Conditions</h2>
          <button className="terms-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="terms-modal-content">
          <div className="term">
            <strong>1. Form Authorization:</strong>
            <p>I, the undersigned, allow NZ Essentials to access my energy consumption and pricing data, and decline automatic rollovers on my behalf.</p>
          </div>

          <div className="term">
            <strong>2. Access to Information:</strong>
            <p>NZ Essentials can access my energy account details, including consumption, pricing, contracts, and other relevant information. This extends to third parties holding such information.</p>
          </div>

          <div className="term">
            <strong>3. Renewal Authority:</strong>
            <p>I am authorized to make renewal decisions, make changes, and accept proposals for the entity below after informing the entity.</p>
          </div>

          <div className="term">
            <strong>4. Service Acknowledgement:</strong>
            <p>NZ Essentials provides an independent audit and management service, working on my behalf to obtain tenders from energy retailers. They are not resellers.</p>
          </div>

          <div className="term">
            <strong>5. No Obligation:</strong>
            <p>I am not required to accept any proposals or quotes presented by NZ Essentials from energy retailers.</p>
          </div>

          <div className="term">
            <strong>6. Audit Understanding:</strong>
            <p>NZ Essentials provides the initial audit at their cost. If I don't accept any proposal, I won't use the provided information to obtain utility supply directly from the retailers.</p>
          </div>

          <div className="term">
            <strong>7. Reimbursement Agreement:</strong>
            <p>If I use the information provided by NZ Essentials to obtain supply, I will reimburse them for any lost revenue.</p>
          </div>

          <div className="term">
            <strong>8. Contract Authorization:</strong>
            <p>If I accept a proposal from NZ Essentials, they are authorized to sign retailer contracts on my behalf to secure the agreed proposal.</p>
          </div>
        </div>

        <div className="terms-modal-footer">
          <button className="btn-close-terms" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
