import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import HelpButton from '../ui/HelpButton.jsx';
import BrainyJournal from '../journal/BrainyJournal.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <HelpButton />
      <BrainyJournal />
    </>
  );
};

export default Layout;