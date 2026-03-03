import React from 'react';
import { Link } from 'react-router-dom';
import { useStaticDoc } from '../../hooks/useFirestore';
import './Hero.css';

const Hero = () => {
  const { data: about } = useStaticDoc('siteContent', 'about');

  return (
    <section className="hero-section" id="home">
      <div className="hero-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="container">
        <div className="hero-content fade-in-up">
          <span className="hero-badge">
            <i className="fas fa-graduation-cap"></i>
            Welcome to Brainy Edu Network
          </span>
          
          <h1 className="hero-title">
            {about?.tagline || 'Building Confidence, One Child at a Time'}
          </h1>
          
          <p className="hero-subtitle">
            Empowering young minds through personalized education and proven teaching methodologies
          </p>
          
          <div className="hero-buttons">
            <Link to="/packages" className="btn btn-primary">
              Explore Packages
              <i className="fas fa-arrow-right"></i>
            </Link>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-calendar-alt"></i>
              Free Consultation
            </a>
          </div>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <div className="feature-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135711.png" alt="Expert Tutors" />
            </div>
            <div className="feature-text">
              <h4>Expert Tutors</h4>
              <p>Qualified and experienced educators</p>
            </div>
          </div>
          
          <div className="hero-feature">
            <div className="feature-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135722.png" alt="Personalized Learning" />
            </div>
            <div className="feature-text">
              <h4>Personalized Learning</h4>
              <p>Tailored to each student's needs</p>
            </div>
          </div>
          
          <div className="hero-feature">
            <div className="feature-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Proven Results" />
            </div>
            <div className="feature-text">
              <h4>Proven Results</h4>
              <p>95% grade improvement rate</p>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <span className="hero-stat-value">450+</span>
            <span className="hero-stat-label">Students</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">25+</span>
            <span className="hero-stat-label">Tutors</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">12+</span>
            <span className="hero-stat-label">Years</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;