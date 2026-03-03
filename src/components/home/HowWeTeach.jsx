import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './HowWeTeach.css';

const HowWeTeach = () => {
  const { data: methods, loading } = useFirestore('howWeTeach');
  const [activeMethod, setActiveMethod] = useState(null);

  if (loading) return null;

  return (
    <div className="how-we-teach-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        Our Teaching Methods
      </h3>
      
      <div className="methods-grid">
        {methods?.map((method, index) => (
          <div 
            key={method.id} 
            className={`method-card ${activeMethod === method.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveMethod(method.id)}
            onMouseLeave={() => setActiveMethod(null)}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="method-image">
              <img src={method.imageUrl} alt={method.title} className="img-cover" />
              <div className="method-overlay">
                <div className="method-icon">
                  <img src={method.icon} alt={method.title} />
                </div>
              </div>
            </div>
            <div className="method-content">
              <h4>{method.title}</h4>
              <p>{method.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWeTeach;