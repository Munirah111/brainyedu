import React from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore.js';
import './Packages.css';

const Packages = () => {
  const { data: packages, loading } = useFirestore('packages');

  if (loading) return <div className="container"><div className="spinner"></div></div>;

  return (
    <section className="packages-section">
      <div className="container">
        <h2 className="section-title">Our Packages</h2>

        <div className="packages-grid">
          {packages?.slice(0, 3).map(pkg => (
            <div key={pkg.id} className="package-card">
              {pkg.imageUrl && (
                <div className="package-image">
                  <img src={pkg.imageUrl} alt={pkg.title} />
                </div>
              )}
              <div className="package-content">
                <h3>{pkg.title}</h3>
                <p className="package-price">{pkg.price}</p>
                <p>{pkg.shortDescription}</p>
                <Link to={`/packages/${pkg.id}`} className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '2rem' }}>
          <Link to="/packages" className="btn btn-primary">
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Packages;