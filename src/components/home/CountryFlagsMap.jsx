import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import './CountryFlagsMap.css';

const CountryFlagsMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const { data: countries, loading, error } = useFirestore('studentCountries');

  // Don't render while loading or if there's an error
  if (loading || error) {
    return null;
  }

  // Return nothing if no data from Firebase after loading
  if (!countries || countries.length === 0) {
    return null;
  }

  const countryData = countries;

  const totalStudents = countryData.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="country-flags-map-container">
      <div className="map-header">
        <h3>Our Global Community</h3>
        <p>Students from {countryData.length} countries</p>
      </div>

      <div className="world-map-wrapper">
        <svg 
          className="world-map-svg" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Map Background */}
          <rect width="100" height="100" fill="#e8f4f8" />
          
          {/* Ocean waves pattern */}
          <defs>
            <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#d0e8f2" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#waves)" />
          
          {/* Continents (simplified shapes) */}
          <g className="continents">
            {/* North America */}
            <ellipse cx="20" cy="30" rx="8" ry="15" fill="#c8e6c9" opacity="0.5" />
            {/* South America */}
            <ellipse cx="25" cy="60" rx="5" ry="12" fill="#c8e6c9" opacity="0.5" />
            {/* Europe */}
            <ellipse cx="30" cy="20" rx="8" ry="8" fill="#c8e6c9" opacity="0.5" />
            {/* Africa */}
            <ellipse cx="38" cy="50" rx="8" ry="15" fill="#c8e6c9" opacity="0.5" />
            {/* Asia */}
            <ellipse cx="60" cy="35" rx="20" ry="18" fill="#c8e6c9" opacity="0.5" />
            {/* Australia */}
            <ellipse cx="75" cy="80" rx="6" ry="6" fill="#c8e6c9" opacity="0.5" />
          </g>
        </svg>

        {/* Flag Pins - Positioned absolutely over the map */}
        <div className="flags-container">
          {countryData.map((country, index) => {
            const percentage = (country.students / totalStudents) * 100;
            const size = Math.max(2, Math.min(4, percentage / 5 + 1.5));

            return (
              <div
                key={country.code}
                className={`flag-pin ${hoveredCountry === country.code ? 'active' : ''}`}
                style={{
                  left: `${country.x}%`,
                  top: `${country.y}%`,
                  '--flag-size': size
                }}
                onMouseEnter={() => setHoveredCountry(country.code)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <div className="flag-emoji">{country.flag}</div>
                
                {/* Tooltip */}
                {hoveredCountry === country.code && (
                  <div className="flag-tooltip">
                    <div className="tooltip-flag">{country.flag}</div>
                    <div className="tooltip-content">
                      <strong>{country.name}</strong>
                      <p>{country.students} students</p>
                      <span className="tooltip-percentage">
                        {((country.students / totalStudents) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Ping animation ring */}
                <div className="flag-ping"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="map-stats">
        <div className="stat-item">
          <i className="fas fa-globe"></i>
          <span>{countryData.length} Countries</span>
        </div>
        <div className="stat-item">
          <i className="fas fa-graduation-cap"></i>
          <span>{totalStudents}+ Students</span>
        </div>
        <div className="stat-item">
          <i className="fas fa-handshake"></i>
          <span>Global Network</span>
        </div>
      </div>
    </div>
  );
};

export default CountryFlagsMap;
