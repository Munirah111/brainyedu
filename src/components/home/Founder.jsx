import React from 'react';
import { useStaticDoc } from '../../hooks/useFirestore';
import './Founder.css';

const Founder = () => {
  const { data: founder } = useStaticDoc('siteContent', 'founder');

  if (!founder) return null;

  return (
    <div className="founder-wrapper">
      <div className="founder-content">
        <div className="founder-image-wrapper fade-in-left">
          <div className="founder-image">
            <img src={founder.imageUrl} alt={founder.name} className="img-cover" />
            <div className="founder-image-glow"></div>
          </div>
        </div>
        <div className="founder-info fade-in-right">
          <h3>{founder.name}</h3>
          <p className="founder-title">{founder.title}</p>
          <p className="founder-bio">{founder.bio}</p>
          <div className="founder-signature">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="signature" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;