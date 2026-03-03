import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import './PackagesPage.css';

const PackagesPage = () => {
  const { data: packages, loading } = useFirestore('packages');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const ageGroups = ['4-6 years', '7-9 years', '10-12 years', '13-15 years'];

  const filteredPackages = packages?.filter(pkg => {
    if (selectedAge !== 'all' && pkg.ageRange !== selectedAge) return false;
    if (selectedType !== 'all' && pkg.sessionType !== selectedType) return false;
    return true;
  });

  const groupedPackages = {};
  ageGroups.forEach(group => {
    groupedPackages[group] = filteredPackages?.filter(pkg => pkg.ageRange === group) || [];
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="packages-page">
      <div className="packages-hero">
        <div className="container">
          <h1 className="page-title fade-in-up">Our Learning Packages</h1>
          <p className="page-subtitle fade-in-up">
            Choose the perfect learning path for your child's educational journey
          </p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="filters-section glass fade-in-up">
          <div className="filter-group">
            <h3>Age Group</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${selectedAge === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedAge('all')}
              >
                All Ages
              </button>
              {ageGroups.map(group => (
                <button
                  key={group}
                  className={`filter-btn ${selectedAge === group ? 'active' : ''}`}
                  onClick={() => setSelectedAge(group)}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Session Type</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                All Types
              </button>
              <button 
                className={`filter-btn ${selectedType === 'one-to-one' ? 'active' : ''}`}
                onClick={() => setSelectedType('one-to-one')}
              >
                   <i className="fas fa-user"></i> One to One
              </button>
              <button 
                className={`filter-btn ${selectedType === 'group' ? 'active' : ''}`}
                onClick={() => setSelectedType('group')}
              >
                <i className="fas fa-users"></i> Group
              </button>
            </div>
          </div>
        </div>

        {/* Packages Display */}
        {ageGroups.map(ageGroup => {
          const agePackages = groupedPackages[ageGroup];
          if (agePackages.length === 0 && selectedAge === 'all') return null;
          if (selectedAge !== 'all' && selectedAge !== ageGroup) return null;
          
          return (
            <div key={ageGroup} className="age-group-section">
              <h2 className="age-group-title fade-in-up">
                <span className="age-badge">{ageGroup}</span>
              </h2>
              <div className="packages-grid">
                {agePackages.map((pkg, index) => (
                  <div 
                    key={pkg.id} 
                    className={`package-card ${pkg.sessionType} fade-in-up`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="package-image">
                      <img src={pkg.imageUrl} alt={pkg.title} className="img-cover" />
                      <span className="session-type-badge">
                        {pkg.sessionType === 'one-to-one' ? (
                          <>
                            <i className="fas fa-user"></i> 1:1
                          </>
                        ) : (
                          <>
                            <i className="fas fa-users"></i> Group
                          </>
                        )}
                      </span>
                    </div>
                    <div className="package-content">
                      <h3>{pkg.title}</h3>
                      <div className="package-price">
                        RM{pkg.price}<span>/month</span>
                      </div>
                      <p className="package-description">{pkg.description}</p>
                      
                      <div className="package-specs">
                        <div className="spec-item">
                          <i className="fas fa-calendar-alt"></i>
                          <div>
                            <strong>{pkg.sessionsPerMonth}</strong>
                            <span>sessions/month</span>
                          </div>
                        </div>
                        <div className="spec-item">
                          <i className="fas fa-clock"></i>
                          <div>
                            <strong>{pkg.hoursPerSession}h</strong>
                            <span>per session</span>
                          </div>
                        </div>
                        <div className="spec-item">
                          <i className="fas fa-book"></i>
                          <div>
                            <strong>{pkg.maxSubjects}</strong>
                            <span>subjects</span>
                          </div>
                        </div>
                        {pkg.maxGroupSize && (
                          <div className="spec-item">
                            <i className="fas fa-users"></i>
                            <div>
                              <strong>{pkg.maxGroupSize}</strong>
                              <span>max/group</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="package-features">
                        <div className="feature">
                          <i className="fas fa-star"></i>
                          Flexible schedule
                        </div>
                        <div className="feature">
                          <i className="fas fa-star"></i>
                          Progress tracking
                        </div>
                        <div className="feature">
                          <i className="fas fa-star"></i>
                          Learning materials
                        </div>
                      </div>

                      <Link to={`/packages/${pkg.id}`} className="btn btn-primary package-btn">
                        View Details
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredPackages?.length === 0 && (
          <div className="no-results glass">
            <i className="fas fa-search"></i>
            <h3>No packages found</h3>
            <p>Try adjusting your filters to see more options</p>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSelectedAge('all');
                setSelectedType('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="packages-cta-section glass">
          <div className="cta-content">
            <h2>Not sure which package to choose?</h2>
            <p>Book a free consultation with our education experts</p>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary cta-button"
            >
              Schedule Consultation
              <i className="fas fa-calendar-check"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;