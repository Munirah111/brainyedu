import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFirestore, useStaticDoc } from '../hooks/useFirestore';
import './PackageDetailPage.css';

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: packages, loading } = useFirestore('packages');
  const { data: contact } = useStaticDoc('siteContent', 'contact');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const pkg = packages?.find(p => p.id === id);

  if (!pkg) {
    return (
      <div className="not-found-container">
        <div className="container not-found">
          <i className="fas fa-search"></i>
          <h2>Package Not Found</h2>
          <p>The package you're looking for doesn't exist or has been removed.</p>
          <Link to="/packages" className="btn btn-primary">
            <i className="fas fa-arrow-left"></i>
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  // Get related packages (same age group)
  const relatedPackages = packages?.filter(p => 
    p.ageRange === pkg.ageRange && p.id !== pkg.id
  ).slice(0, 2);

  return (
    <div className="package-detail-page">
      <div className="package-detail-hero">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-btn">
            <i className="fas fa-arrow-left"></i>
            Back
          </button>
        </div>
      </div>

      <div className="container">
        <div className="package-detail-grid">
          {/* Main Content */}
          <div className="package-main">
            <div className="package-header fade-in-up">
              <div className="package-badges">
                <span className="age-badge">{pkg.ageRange}</span>
                <span className={`type-badge ${pkg.sessionType}`}>
                  {pkg.sessionType === 'one-to-one' ? (
                    <>
                      <i className="fas fa-user"></i> One to One
                    </>
                  ) : (
                    <>
                      <i className="fas fa-users"></i> Group Session
                    </>
                  )}
                </span>
              </div>
              <h1 className="package-title">{pkg.title}</h1>
              <div className="package-price-large">
                RM{pkg.price}<span>/month</span>
              </div>
            </div>

            <div className="package-image-large fade-in-left">
              <img src={pkg.imageUrl} alt={pkg.title} />
            </div>

            <div className="package-description-section fade-in-up">
              <h2>About This Package</h2>
              <p>{pkg.description}</p>
            </div>

            <div className="package-specs-section fade-in-up">
              <h2>Package Details</h2>
              <div className="specs-grid">
                <div className="spec-card">
                  <i className="fas fa-calendar-alt"></i>
                  <div className="spec-value">{pkg.sessionsPerMonth}</div>
                  <div className="spec-label">Sessions per month</div>
                </div>
                
                <div className="spec-card">
                  <i className="fas fa-clock"></i>
                  <div className="spec-value">{pkg.hoursPerSession}h</div>
                  <div className="spec-label">Per session</div>
                </div>
                
                <div className="spec-card">
                  <i className="fas fa-book"></i>
                  <div className="spec-value">{pkg.maxSubjects}</div>
                  <div className="spec-label">Max subjects</div>
                </div>
                
                {pkg.sessionType === 'group' && pkg.maxGroupSize && (
                  <div className="spec-card">
                    <i className="fas fa-users"></i>
                    <div className="spec-value">{pkg.maxGroupSize}</div>
                    <div className="spec-label">Students per group</div>
                  </div>
                )}
              </div>
            </div>

            <div className="package-features-section fade-in-up">
              <h2>What's Included</h2>
              <ul className="features-list">
                <li>
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>Learning Materials</strong>
                    <span>Digital and printed resources provided</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>Progress Tracking</strong>
                    <span>Monthly reports and parent meetings</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>Homework Support</strong>
                    <span>Dedicated support between sessions</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>Assessment Tests</strong>
                    <span>Regular evaluations to track improvement</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>Flexible Scheduling</strong>
                    <span>Choose convenient time slots</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <div>
                    <strong>Parent Portal</strong>
                    <span>24/7 access to progress updates</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="package-sidebar">
            <div className="sidebar-card glass fade-in-right">
              <h3>Enroll Now</h3>
              <p className="sidebar-price">
                RM{pkg.price}<span>/month</span>
              </p>
              <p className="sidebar-note">No registration fee • Free trial class</p>
              
              <a 
                href={contact?.whatsappLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary whatsapp-btn"
              >
                <i className="fab fa-whatsapp"></i>
                Enquire on WhatsApp
              </a>
              
              <Link to="/contact" className="btn btn-secondary contact-btn">
                Contact Us
              </Link>

              <div className="sidebar-features">
                <div className="sidebar-feature">
                  <i className="fas fa-clock"></i>
                  <span>Immediate start available</span>
                </div>
                <div className="sidebar-feature">
                  <i className="fas fa-calendar-check"></i>
                  <span>Flexible schedule</span>
                </div>
                <div className="sidebar-feature">
                  <i className="fas fa-shield-alt"></i>
                  <span>Satisfaction guaranteed</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="quick-info-card glass">
              <h4>Quick Info</h4>
              <ul>
                <li>
                  <i className="fas fa-user-graduate"></i>
                  <span>Age Group: {pkg.ageRange}</span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>Duration: {pkg.hoursPerSession} hour{session => pkg.hoursPerSession > 1 ? 's' : ''} per session</span>
                </li>
                <li>
                  <i className="fas fa-calendar-week"></i>
                  <span>Frequency: {pkg.sessionsPerMonth} sessions/month</span>
                </li>
                <li>
                  <i className="fas fa-book-open"></i>
                  <span>Subjects: Up to {pkg.maxSubjects} subjects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages && relatedPackages.length > 0 && (
          <div className="related-packages">
            <h2 className="section-title">You Might Also Like</h2>
            <div className="related-grid">
              {relatedPackages.map(related => (
                <Link to={`/packages/${related.id}`} key={related.id} className="related-card">
                  <div className="related-image">
                    <img src={related.imageUrl} alt={related.title} />
                  </div>
                  <div className="related-content">
                    <h4>{related.title}</h4>
                    <p className="related-price">RM{related.price}/month</p>
                    <span className="related-type">
                      {related.sessionType === 'one-to-one' ? '1:1' : 'Group'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailPage;