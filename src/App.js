import React, { useRef } from 'react';
import Navbar from './NavbarComponent/NavbarComponent';
import Home from './HomeComponent/HomeComponent';
import ManageData from './ManageDataComponent/ManageDataComponent/ManageDataComponent';

function App() {
  // Define refs to reference Home and Manage Data sections
  const homeRef = useRef(null);
  const manageDataRef = useRef(null);

  // Function to scroll to a specific section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} homeRef={homeRef} manageDataRef={manageDataRef} />
      <div ref={homeRef}>
        <Home />
      </div>
      <div ref={manageDataRef}>
        <ManageData />
      </div>
    </>
  );
}

export default App;
