import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore, useStaticDoc } from '../hooks/useFirestore';
import ImageCarousel from '../components/home/ImageCarousel';
import ClassImagesCarousel from '../components/home/ClassImagesCarousel';
import PackagePreviewModal from '../components/home/PackagePreviewModal';
import FeedbackSlider from '../components/home/FeedbackSlider';
import CountryFlagsMap from '../components/home/CountryFlagsMap';
import './HomePage.css';

// Counter Animation Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (end && !hasAnimated) {
      setHasAnimated(true);
      let startTime = null;
      const startCount = 0;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [end, duration, hasAnimated]);

  return <>{count}{suffix}</>;
};

// Smart Counter for Achievement Values
const AnimatedValue = ({ value }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!value || hasAnimated) return;
    
    // Extract number and suffix from value (e.g., "95%", "500+", "12")
    const match = String(value).match(/^(\d+)(.*)$/);
    
    if (match) {
      const number = parseInt(match[1], 10);
      const suffix = match[2];
      
      setHasAnimated(true);
      let startTime = null;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / 2000, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * number);
        
        setDisplayValue(currentCount + suffix);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(number + suffix);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      // Non-numeric value, display as-is
      setDisplayValue(value);
    }
  }, [value, hasAnimated]);

  return <>{displayValue}</>;
};

const HomePage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Fetch data from Firebase
  const { data: about } = useStaticDoc('siteContent', 'about');
  const { data: contact } = useStaticDoc('siteContent', 'contact');
  const { data: coreValues } = useFirestore('coreValues');
  const { data: howWeTeach } = useFirestore('howWeTeach');
  const { data: services } = useFirestore('services');
  const { data: stats } = useFirestore('stats');
  const { data: subjects } = useFirestore('subjects');
  const { data: packages } = useFirestore('packages');
  const { data: achievements } = useFirestore('achievements');
  const { data: highlightVideo } = useStaticDoc('media', 'highlightVideo');
  const { data: carouselImages } = useFirestore('carouselImages');
  const { data: classImages } = useFirestore('classImages');
  const { data: feedbacks } = useFirestore('feedback');

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get stats data (only from Firebase)
  const statsData = stats?.find(s => s.id === 'main') || stats?.[0] || null;
  const hasStatsData = Boolean(statsData);

  // Group packages by age range
  const ageGroups = ['4-6 years', '7-9 years', '10-12 years', '13-15 years'];
  const groupedPackages = {};
  ageGroups.forEach(group => {
    groupedPackages[group] = packages?.filter(pkg => pkg.ageRange === group) || [];
  });

  return (
    <div className="homepage">
      
      {/* Package Preview Modal - Shows on page load */}
      <PackagePreviewModal packages={packages} />
      
      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="hero-section" id="home">
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="hero-container">
          {/* Left Side - Content */}
          <div className="hero-content fade-in-left">
            <span className="hero-badge">Welcome to Brainy Edu Network</span>
            <h1 className="hero-title">
              {about?.tagline || 'Building Confidence, One Child at a Time'}
            </h1>
            <p className="hero-subtitle">
              Kelas 1-to-1 yang mampu milik dengan guru sekolah yang berpengalaman. Modul pembelajaran disesuaikan mengikut tahap setiap murid
            </p>
            <div className="hero-buttons">
              <Link to="/packages" className="btn btn-primary">
                Explore Packages
                <i className="fas fa-arrow-right"></i>
              </Link>
              <a href="#contact" className="btn btn-secondary">
                Contact Us
              </a>
            </div>
            
            {hasStatsData && (
              <div className="hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-value">
                    <AnimatedCounter end={statsData.studentsCount} duration={2000} suffix="+" />
                  </span>
                  <span className="hero-stat-label">Students</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-value">
                    <AnimatedCounter end={statsData.tutorsCount} duration={2000} suffix="+" />
                  </span>
                  <span className="hero-stat-label">Tutors</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-value">
                    <AnimatedCounter end={statsData.yearsExperience} duration={2000} suffix="+" />
                  </span>
                  <span className="hero-stat-label">Years</span>
                </div>
              </div>
            )}

            {/* Interactive Affordable Badge */}
            <div className="affordable-badge-container">
              <div className="affordable-badge">
                <span className="affordable-text">Affordable</span>
                <div className="affordable-sparkles">
                  <span className="sparkle">✨</span>
                  <span className="sparkle">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="hero-carousel fade-in-right">
            <ImageCarousel images={carouselImages?.map(img => img.imageUrl) || []} />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SPECIAL HIGHLIGHT - ONE-TO-ONE CLASSES */}
      {/* ============================================ */}
      <section className="highlight-section" id="highlight">
        <div className="container">
          <div className="highlight-content">
            <div className="highlight-text-video">
              {/* Text Section */}
              <div className="highlight-text-box">
                <p className="highlight-main-text">
                  We are committed to making personalised learning accessible. Our 1-to-1 classes are thoughtfully priced so every child has the opportunity to grow with confidence.
                </p>
              </div>

              {/* Video Section */}
              <div className="highlight-video-box">
                <video 
                  className="highlight-video" 
                  autoPlay 
                  muted 
                  loop
                  playsInline
                  controls={false}
                >
                  <source src={highlightVideo?.videoUrl || 'https://example.com/highlight-video.mp4'} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Class Images Carousel */}
              <div className="highlight-class-carousel-box">
                <ClassImagesCarousel images={classImages || []} />
              </div>
            </div>

            {/* Features Below Video */}
            <div className="highlight-features-row">
              <div className="feature-item">
                <i className="fas fa-star"></i>
                <span>Experienced School Teachers</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-star"></i>
                <span>Customized Learning Modules</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-star"></i>
                <span>Affordable Pricing</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-star"></i>
                <span>Student-Centered Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 01 ABOUT US */}
      {/* ============================================ */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">About Brainy Edu Network</h2>
          </div>
          
          <div className="about-content">
            <div className="about-text fade-in-left">
              <p className="about-description">
                {about?.about || 'At Brainy Edu Network, we believe every child deserves to feel capable, confident, and respected. That\'s why we create small, focused learning environments where students are encouraged to think independently and thrive academically.'}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="core-values-wrapper">
            <h3 className="subsection-title">Our Guiding Principles</h3>
            <div className="core-values-grid">
              {coreValues?.map((value, index) => (
                <div key={value.id} className="core-value-card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="core-value-icon">
                    <img src={value.icon} alt={value.title} />
                  </div>
                  <h4 className="core-value-title">{value.title}</h4>
                  <p className="core-value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 02 OUR WHY */}
      {/* ============================================ */}
      <section className="why-section" id="why">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Our Mission & Vision</h2>
          </div>
          
          <div className="why-content">
            <div className="why-text-box glass fade-in-left">
              <i className="fas fa-quote-left quote-icon"></i>
              <p className="why-text">
                {about?.why || 'We exist to empower students to build confidence and capability, ensuring no child ever feels small or incapable.'}
              </p>
            </div>

            {/* Stats Cards */}
            {hasStatsData && (
              <div className="stats-grid">
                <div className="stat-card glass fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="stat-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135711.png" alt="Classes" />
                  </div>
                  <div className="stat-number">{statsData.classesCount}+</div>
                  <div className="stat-label">Classes Conducted</div>
                </div>
                <div className="stat-card glass fade-in-up" style={{animationDelay: '0.2s'}}>
                  <div className="stat-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Tutors" />
                  </div>
                  <div className="stat-number">{statsData.tutorsCount}+</div>
                  <div className="stat-label">Expert Tutors</div>
                </div>
                <div className="stat-card glass fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="stat-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135722.png" alt="Students" />
                  </div>
                  <div className="stat-number">{statsData.studentsCount}+</div>
                  <div className="stat-label">Happy Students</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 03 OUR HOW */}
      {/* ============================================ */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Our Proven Teaching Approach</h2>
          </div>

          <div className="methods-timeline">
            {howWeTeach?.map((method, index) => (
              <div key={method.id} className={`timeline-item fade-in-up ${index % 2 === 0 ? 'left' : 'right'}`} style={{animationDelay: `${index * 0.15}s`}}>
                <div className="timeline-marker">
                  <div className="marker-icon">
                    <img src={method.icon} alt={method.title} />
                  </div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="timeline-image">
                      <img src={method.imageUrl} alt={method.title} className="img-cover" />
                    </div>
                    <div className="timeline-text">
                      <h3>{method.title}</h3>
                      <p>{method.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 04 OUR WHAT (Services) */}
      {/* ============================================ */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Comprehensive Learning Services</h2>
          </div>
          
          <div className="services-showcase">
            {services?.map((service, index) => (
              <div key={service.id} className={`service-showcase-card fade-in-up ${index % 2 === 0 ? 'normal' : 'reverse'}`} style={{animationDelay: `${index * 0.12}s`}}>
                <div className="service-showcase-image">
                  <img src={service.imageUrl} alt={service.title} className="img-cover" />
                  <div className="service-gradient-overlay"></div>
                </div>
                <div className="service-showcase-content">
                  <div className="service-number">0{index + 1}</div>
                  <div className="service-icon-badge">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {service.features && (
                    <ul className="service-features-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="feature-dot"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 05 ACHIEVEMENTS */}
      {/* ============================================ */}
      <section className="achievements-section" id="achievements">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Success Stories & Impact</h2>
          </div>
          
          <div className="achievements-showcase">
            {achievements?.map((achievement, index) => (
              <div key={achievement.id} className="achievement-showcase-card fade-in-up" style={{animationDelay: `${index * 0.15}s`}}>
                <div className="achievement-glow"></div>
                <div className="achievement-bg-gradient" style={{
                  background: index === 0 ? 'linear-gradient(135deg, rgba(255, 219, 88, 0.1), rgba(255, 107, 107, 0.1))' : 
                             index === 1 ? 'linear-gradient(135deg, rgba(100, 200, 100, 0.1), rgba(200, 255, 100, 0.1))' :
                             index === 2 ? 'linear-gradient(135deg, rgba(88, 200, 255, 0.1), rgba(100, 150, 255, 0.1))' :
                             'linear-gradient(135deg, rgba(200, 100, 255, 0.1), rgba(255, 100, 200, 0.1))'
                }}></div>
                <div className="achievement-content-inner">
                  <div className="achievement-icon-large">
                    <img src={achievement.icon} alt={achievement.title} />
                  </div>
                  <div className="achievement-counter">
                    <AnimatedValue value={achievement.value} />
                  </div>
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-desc">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SUBJECTS */}
      {/* ============================================ */}
      <section className="subjects-section" id="subjects">
        <div className="container">
          <h2 className="section-title fade-in-up">Course Curriculum & Subjects</h2>
          <div className="subjects-stack">
            {subjects?.map((subject, index) => (
              <div key={subject.id} className="subject-stack-item fade-in-up" style={{animationDelay: `${index * 0.12}s`}}>
                <div className="subject-stack-header">
                  <div className="subject-stack-icon">
                    <img src={subject.icon} alt={subject.name} />
                  </div>
                  <div className="subject-stack-title">
                    <h3>{subject.name}</h3>
                    <p className="subject-level-badge">{subject.level}</p>
                  </div>
                  <div className="subject-stack-chevron">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
                <div className="subject-stack-body">
                  <div className="subject-stack-image">
                    <img src={subject.imageUrl} alt={subject.name} className="img-cover" />
                  </div>
                  <div className="subject-stack-details">
                    <p className="subject-description">{subject.description}</p>
                    {subject.topics && (
                      <div className="subject-topics-list">
                        <strong>Topics:</strong>
                        <div className="topics-flex">
                          {subject.topics.map((topic, idx) => (
                            <span key={idx} className="topic-badge">{topic}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PACKAGES PREVIEW */}
      {/* ============================================ */}
      <section className="packages-preview-section" id="packages">
        <div className="container">
          <h2 className="section-title fade-in-up">Flexible Learning Packages</h2>
          
          <div className="age-group-tabs">
            {ageGroups.map(group => (
              <button
                key={group}
                className={`age-tab ${activeTab === group ? 'active' : ''}`}
                onClick={() => setActiveTab(group)}
              >
                {group}
              </button>
            ))}
          </div>

          <div className="packages-grid">
            {(activeTab === 'all' ? packages : packages?.filter(p => p.ageRange === activeTab))?.slice(0, 2).map((pkg, index) => (
              <div key={pkg.id} className={`package-card ${pkg.sessionType} fade-in-up`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="package-image">
                  <img src={pkg.imageUrl} alt={pkg.title} className="img-cover" />
                  <span className="session-badge">{pkg.sessionType === 'one-to-one' ? '1:1' : 'Group'}</span>
                </div>
                <div className="package-content">
                  <h3>{pkg.title}</h3>
                  <div className="package-price">
                    RM{pkg.price}<span>/month</span>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  <div className="package-details">
                    <div className="package-detail">
                      <i className="fas fa-calendar-alt"></i>
                      {pkg.sessionsPerMonth} sessions
                    </div>
                    <div className="package-detail">
                      <i className="fas fa-clock"></i>
                      {pkg.hoursPerSession}h
                    </div>
                    <div className="package-detail">
                      <i className="fas fa-book"></i>
                      {pkg.maxSubjects} subjects
                    </div>
                    {pkg.maxGroupSize && (
                      <div className="package-detail">
                        <i className="fas fa-users"></i>
                        Max {pkg.maxGroupSize}
                      </div>
                    )}
                  </div>
                  <Link to={`/packages/${pkg.id}`} className="btn btn-secondary">
                    View Details
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="packages-cta fade-in-up">
            <Link to="/packages" className="btn btn-primary">
              View All Packages
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEEDBACK */}
      {/* ============================================ */}
      <section className="feedback-section" id="feedback">
        <div className="container">
          <h2 className="section-title fade-in-up">Parent Testimonials</h2>
          <FeedbackSlider feedbacks={feedbacks} />
        </div>
      </section>

      {/* ============================================ */}
      {/* 07 CONTACT & CTA */}
      {/* ============================================ */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title">Connect With Us</h2>
          </div>
          
          <div className="contact-content">
            <div className="contact-info glass fade-in-left">
              <h3>Get in Touch</h3>
              {contact && (
                <>
                  <div className="contact-item">
                    <i className="fas fa-map-pin"></i>
                    <div>
                      <strong>Address</strong>
                      <p>{contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <strong>Phone / WhatsApp</strong>
                      <p>
                        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <strong>Email</strong>
                      <p>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-social">
                    <strong>Connect With Us</strong>
                    <div className="social-links">
                      {contact.facebookLink && (
                        <a href={contact.facebookLink} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      )}
                      {contact.whatsappLink && (
                        <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Global Map - Students from around the world */}
            <CountryFlagsMap />

            {/* Call to Action */}
            <div className="cta-box glass fade-in-right">
              <h3>Join Brainy Edu Network Today!</h3>
              <p className="cta-text">
                Join us today and let's help your child grow confident and capable!
              </p>
              <div className="cta-buttons">
                <Link to="/packages" className="btn btn-primary cta-button">
                  Get Started Now
                  <i className="fas fa-arrow-right"></i>
                </Link>
                {contact?.whatsappLink && (
                  <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp cta-button">
                    <i className="fab fa-whatsapp"></i>
                    Contact on WhatsApp
                  </a>
                )}
              </div>
              <div className="cta-features">
                <span><i className="fas fa-star"></i> Flexible schedule</span>
                <span><i className="fas fa-star"></i> Expert tutors</span>
                <span><i className="fas fa-star"></i> Small group sizes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <div className="homepage-footer">
        <div className="container">
          <p className="footer-quote fade-in-up">
            "Building Confidence, One Child at a Time"
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;