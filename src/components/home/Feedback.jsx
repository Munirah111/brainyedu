import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Feedback.css';

const Feedback = () => {
  const { data: feedbacks, loading } = useFirestore('feedback');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!feedbacks?.length) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === feedbacks.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [feedbacks?.length]);

  if (loading || !feedbacks?.length) return null;

  return (
    <div className="feedback-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        What Parents Say
      </h3>
      
      <div className="feedback-slider">
        {feedbacks.map((feedback, index) => (
          <div 
            key={feedback.id} 
            className={`feedback-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="feedback-card glass">
              <div className="feedback-image">
                <img src={feedback.feedbackImage} alt="Feedback" className="img-cover" />
                <div className="feedback-quote-icon">
                  <i className="fas fa-quote-right"></i>
                </div>
              </div>
              <div className="feedback-content">
                <p className="feedback-comment">"{feedback.comment}"</p>
                <div className="feedback-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < feedback.rating ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
                <div className="feedback-author">
                  <div className="author-info">
                    <strong>{feedback.name}</strong>
                    <span>{feedback.role}</span>
                  </div>
                  <span className="feedback-date">{feedback.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="feedback-dots">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedback;