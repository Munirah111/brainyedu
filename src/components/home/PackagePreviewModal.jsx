import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PackagePreviewModal.css';

const PackagePreviewModal = ({ packages }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal automatically when component mounts (page loads)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800); // Small delay for smooth entry

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen || !packages?.length) return null;

  return (
    <div className="package-preview-overlay" onClick={closeModal}>
      <div className="package-preview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-header-preview">
          <i className="fas fa-gift"></i>
          <h2>Explore Our Packages</h2>
          <p>Choose the perfect learning plan for your child</p>
        </div>

        <div className="packages-preview-grid">
          {packages.map((pkg, index) => (
            <div key={index} className="package-preview-card">
              <div className="package-preview-image">
                <img src={pkg.imageUrl} alt={pkg.title} />
                <span className="package-badge">{pkg.ageRange}</span>
              </div>
              
              <div className="package-preview-content">
                <h3>{pkg.title}</h3>
                <p className="package-type">
                  <i className="fas fa-users"></i>
                  {pkg.sessionType === 'one-to-one' ? 'One-to-One' : `Group (Max ${pkg.maxGroupSize})`}
                </p>
                <p className="package-description">{pkg.description}</p>
                
                <div className="package-preview-footer">
                  <div className="package-price">
                    <span className="price-amount">RM {pkg.price}</span>
                    <span className="price-period">/month</span>
                  </div>
                  <Link 
                    to={`/packages`} 
                    className="btn-view-details"
                    onClick={closeModal}
                  >
                    View Details
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer-preview">
          <button className="btn-close-modal" onClick={closeModal}>
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagePreviewModal;
