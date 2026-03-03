import React, { useState, useEffect } from 'react';
import './ClassImagesCarousel.css';

const ClassImagesCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const displayImages = images || [];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || displayImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, displayImages.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    setIsAutoPlay(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  // Return nothing if no images from Firebase
  if (displayImages.length === 0) {
    return null;
  }

  return (
    <div
      className="class-images-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="class-carousel-container">
        {/* Main Image */}
        <div className="class-carousel-image-wrapper">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`class-carousel-image ${
                index === currentIndex ? 'active' : ''
              }`}
            >
              <img
                src={image.imageUrl || image.url || image}
                alt={image.alt || `Class image ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/400x500?text=Loading...';
                }}
              />
            </div>
          ))}

          {/* Overlay gradient */}
          <div className="class-carousel-overlay"></div>
        </div>

        {/* Navigation Controls */}
        <button
          className="class-carousel-control class-carousel-control-prev"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="class-carousel-control class-carousel-control-next"
          onClick={handleNext}
          aria-label="Next image"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Indicator */}
        <div className="class-carousel-dots">
          {displayImages.map((_, index) => (
            <button
              key={index}
              className={`class-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassImagesCarousel;
