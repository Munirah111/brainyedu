import React, { useState } from 'react';
import { useStaticDoc } from '../../hooks/useFirestore';
import './HelpButton.css';

const HelpButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: contact } = useStaticDoc('siteContent', 'contact');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <button className="help-button" onClick={toggleModal} aria-label="Help">
        <i className="fas fa-heart"></i>
      </button>

      {/* Help Modal */}
      {isModalOpen && (
        <div className="help-modal-overlay" onClick={closeModal}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header">
              <i className="fas fa-headphones"></i>
              <h3>Need Help?</h3>
            </div>
            
            <div className="modal-content">
              <p>Chat with us directly on WhatsApp for quick assistance!</p>
              
              {contact?.whatsappLink && (
                <a 
                  href={contact.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="whatsapp-button"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Chat on WhatsApp</span>
                </a>
              )}
              
              {contact?.phone && (
                <div className="contact-info-modal">
                  <i className="fas fa-phone"></i>
                  <span>{contact.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
