import React, { useEffect, useState, useRef } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Stats.css';

const Stats = () => {
  const { data: statsData, loading } = useFirestore('stats');
  const [counts, setCounts] = useState({
    classes: 0,
    tutors: 0,
    students: 0,
    years: 0
  });
  
  const sectionRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!statsData || statsData.length === 0) return;
    
    const statDoc = statsData.find(s => s.id === 'main') || statsData[0];
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animateValue('classes', 0, statDoc.classesCount || 1500, 2000);
          animateValue('tutors', 0, statDoc.tutorsCount || 25, 2000);
          animateValue('students', 0, statDoc.studentsCount || 450, 2000);
          animateValue('years', 0, statDoc.yearsExperience || 12, 2000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [statsData]);

  const animateValue = (key, start, end, duration) => {
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCounts(prev => ({ ...prev, [key]: end }));
        clearInterval(timer);
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, 16);
  };

  if (loading) {
    return (
      <section className="stats-section" ref={sectionRef}>
        <div className="container">
          <div className="stats-loading">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135711.png',
      value: counts.classes,
      label: 'Classes Conducted',
      suffix: '+',
      color: 'var(--maroon)'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      value: counts.tutors,
      label: 'Expert Tutors',
      suffix: '+',
      color: 'var(--mustard)'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135722.png',
      value: counts.students,
      label: 'Happy Students',
      suffix: '+',
      color: 'var(--mustard)'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135678.png',
      value: counts.years,
      label: 'Years Experience',
      suffix: '+',
      color: 'var(--dark-green)'
    }
  ];

  return (
    <section className="stats-section" ref={sectionRef} id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card glass"
              style={{ '--stat-color': stat.color }}
            >
              <div className="stat-icon">
                <img src={stat.icon} alt={stat.label} />
              </div>
              <div className="stat-content">
                <div className="stat-number-wrapper">
                  <span className="stat-number">{stat.value.toLocaleString()}</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-progress-bar"
                  style={{ 
                    width: `${(stat.value / 2000) * 100}%`,
                    backgroundColor: stat.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;