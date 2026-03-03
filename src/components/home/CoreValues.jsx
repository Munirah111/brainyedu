import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './CoreValues.css';

const CoreValues = () => {
  const { data: values, loading } = useFirestore('coreValues');

  if (loading) return null;

  return (
    <div className="core-values-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        Our Core Values
      </h3>
      <div className="core-values-grid">
        {values?.map((value, index) => (
          <div key={value.id} className="core-value-card" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="core-value-icon">
              <img src={value.icon} alt={value.title} />
              <div className="icon-glow"></div>
            </div>
            <h4 className="core-value-title">{value.title}</h4>
            <p className="core-value-description">{value.description}</p>
            <div className="core-value-number">0{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValues;