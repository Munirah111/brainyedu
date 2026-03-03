import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <h3 className="footer-logo">
              <span className="logo-text">Brainy Edu</span>
              <span className="logo-network">Network</span>
            </h3>
            
            <div className="powered-by">
              <span className="powered-label">Powered by</span>
              <div className="platform-logos">
                <img src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png" alt="Google Meet" className="platform-logo" />
                <img src="https://v2.leonclassroom.com/logo-horizontal.png" alt="Leon Classroom" className="platform-logo leon-logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Brainy Edu Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;