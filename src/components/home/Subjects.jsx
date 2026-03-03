import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './Subjects.css';

const Subjects = () => {
  const { data: subjects, loading } = useFirestore('subjects');

  if (loading) return null;

  return (
    <div className="subjects-wrapper">
      <h3 className="subsection-title">
        <span className="title-decoration"></span>
        Subjects We Cover
      </h3>
      
      <div className="subjects-grid">
        {subjects?.map((subject, index) => (
          <div key={subject.id} className="subject-card" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="subject-image">
              <img src={subject.imageUrl} alt={subject.name} className="img-cover" />
              <div className="subject-icon-wrapper">
                <img src={subject.icon} alt={subject.name} />
              </div>
            </div>
            <div className="subject-content">
              <h4>{subject.name}</h4>
              <p className="subject-level">{subject.level}</p>
              <p className="subject-description">{subject.description}</p>
              {subject.topics && (
                <div className="subject-topics">
                  {subject.topics.map((topic, idx) => (
                    <span key={idx} className="topic-tag">{topic}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;