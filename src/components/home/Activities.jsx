import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Activities.css';

const Activities = () => {
  const { data: activities, loading } = useFirestore('activities');

  if (loading) return null;

  return (
    <div className="activities-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        Our Activities
      </h3>
      
      <div className="activities-grid">
        {activities?.map((activity, index) => (
          <div key={activity.id} className="activity-card" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="activity-image">
              <img src={activity.imageUrl} alt={activity.title} className="img-cover" />
              <div className="activity-date">
                <i className="far fa-calendar"></i>
                {activity.date}
              </div>
            </div>
            <div className="activity-content">
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
              <div className="activity-meta">
                <span>
                  <i className="fas fa-users"></i>
                  {activity.participants} participants
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;