import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Achievements.css';

const Achievements = () => {
  const { data: achievements, loading } = useFirestore('achievements');

  if (loading) return null;

  return (
    <div className="achievements-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        Our Achievements
      </h3>
      
      <div className="achievements-grid">
        {achievements?.map((achievement, index) => (
          <div key={achievement.id} className="achievement-card glass" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="achievement-icon">
              <img src={achievement.icon} alt={achievement.title} />
            </div>
            <div className="achievement-value">{achievement.value}</div>
            <p className="achievement-text">{achievement.title}</p>
            <span className="achievement-description">{achievement.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;