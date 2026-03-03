import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './BrainyJournal.css';

const BrainyJournal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const { data: journals } = useFirestore('journals');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get unique months for filtering
  const months = journals 
    ? ['all', ...new Set(journals.map(j => j.month))]
    : ['all'];

  // Filter journals by selected month
  const filteredJournals = selectedMonth === 'all' 
    ? journals 
    : journals?.filter(j => j.month === selectedMonth);

  // Category colors and icons
  const categoryConfig = {
    event: { color: '#3b5998', icon: 'fa-calendar-alt', label: 'Event' },
    achievement: { color: '#ffc70e', icon: 'fa-trophy', label: 'Achievement' },
    announcement: { color: '#25d366', icon: 'fa-bullhorn', label: 'Announcement' },
    update: { color: '#e49600', icon: 'fa-newspaper', label: 'Update' }
  };

  return (
    <>
      {/* Floating Journal Button */}
      <button 
        className="journal-floating-btn" 
        onClick={toggleModal}
        aria-label="Open Brainy Journal"
      >
        <i className="fas fa-book-open"></i>
        <span className="journal-btn-text">Journal</span>
      </button>

      {/* Journal Modal */}
      {isModalOpen && (
        <div className="journal-modal-overlay" onClick={closeModal}>
          <div className="journal-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="journal-close-btn" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>

            {/* Modal Header */}
            <div className="journal-header">
              <div className="journal-header-content">
                <i className="fas fa-book-open"></i>
                <div>
                  <h2>Brainy Journal</h2>
                  <p>Stay updated with our monthly highlights & news</p>
                </div>
              </div>

              {/* Month Filter */}
              <div className="journal-filter">
                {months.map(month => (
                  <button
                    key={month}
                    className={`filter-btn ${selectedMonth === month ? 'active' : ''}`}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month === 'all' ? 'All' : month}
                  </button>
                ))}
              </div>
            </div>

            {/* Journal Entries */}
            <div className="journal-content">
              {filteredJournals && filteredJournals.length > 0 ? (
                <div className="journal-timeline">
                  {filteredJournals.map((journal, index) => {
                    const config = categoryConfig[journal.category] || categoryConfig.update;
                    
                    return (
                      <div 
                        key={journal.id || index} 
                        className="journal-entry"
                        style={{ '--category-color': config.color }}
                      >
                        <div className="journal-entry-marker"></div>
                        
                        <div className="journal-entry-card">
                          {/* Date Badge */}
                          <div className="journal-date-badge">
                            <span className="date-day">{journal.day}</span>
                            <span className="date-month">{journal.month}</span>
                            <span className="date-year">{journal.year}</span>
                          </div>

                          {/* Category Tag */}
                          <div className="journal-category" style={{ background: config.color }}>
                            <i className={`fas ${config.icon}`}></i>
                            <span>{config.label}</span>
                          </div>

                          {/* Featured Image */}
                          {journal.imageUrl && (
                            <div className="journal-image">
                              <img src={journal.imageUrl} alt={journal.title} />
                            </div>
                          )}

                          {/* Content */}
                          <div className="journal-entry-content">
                            <h3>{journal.title}</h3>
                            <p>{journal.description}</p>
                            
                            {journal.highlights && journal.highlights.length > 0 && (
                              <div className="journal-highlights">
                                <strong>Highlights:</strong>
                                <ul>
                                  {journal.highlights.map((highlight, idx) => (
                                    <li key={idx}>{highlight}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="journal-empty">
                  <i className="fas fa-book"></i>
                  <p>No journal entries yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrainyJournal;
