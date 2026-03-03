import React from 'react';
import { useStaticDoc } from '../../hooks/useFirestore';
import './WhyUs.css';

const WhyUs = () => {
  const { data: about } = useStaticDoc('siteContent', 'about');

  return (
    <section className="why-us">
      <div className="container">
        <div className="why-us-content">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="why-us-text">
            {about?.why || 'We exist to empower students with the knowledge, skills, and confidence they need to excel academically and beyond.'}
          </p>
          
          <div className="why-us-features">
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Learning</h3>
              <p>Tailored approach for every student's unique needs</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <h3>Experienced Tutors</h3>
              <p>Qualified and passionate educators</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">📈</div>
              <h3>Proven Results</h3>
              <p>95% of students show grade improvement</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🤝</div>
              <h3>Parent Involvement</h3>
              <p>Regular updates and progress reports</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;