import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Services.css';

const Services = () => {
  const { data: services, loading } = useFirestore('services');

  if (loading) return null;

  return (
    <div className="services-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        Our Services
      </h3>
      
      <div className="services-grid">
        {services?.map((service, index) => (
          <div key={service.id} className="service-card" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="service-image">
              <img src={service.imageUrl} alt={service.title} className="img-cover" />
              <div className="service-icon-wrapper">
                <img src={service.icon} alt={service.title} className="service-icon" />
              </div>
            </div>
            <div className="service-content">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              {service.features && (
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-star"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;