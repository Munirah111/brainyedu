import React, { useState } from 'react';
import './FeedbackSlider.css';

const FeedbackSlider = ({ feedbacks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <div className="feedback-slider-container">
      <div className="feedback-stack">
        {feedbacks.map((feedback, index) => {
          let position = 'nextSlide';
          if (index === currentIndex) {
            position = 'activeSlide';
          }
          if (
            index === currentIndex - 1 ||
            (currentIndex === 0 && index === feedbacks.length - 1)
          ) {
            position = 'prevSlide';
          }

          return (
            <div
              key={feedback.id || index}
              className={`feedback-slide ${position}`}
            >
              <img 
                src={feedback.feedbackImage} 
                alt={`Feedback ${index + 1}`}
                className="feedback-slide-image"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button className="slider-arrow left-arrow" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-arrow right-arrow" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to feedback ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackSlider;
