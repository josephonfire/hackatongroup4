import React from 'react';
import '../styles/landingPage.css';
import LoginPage from '../components/Login';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="left-section">
        <div className="logo">
            <img src="/img/logo.svg" alt="Logo" />
        </div>
        <div className="slogan">
          <h1>
            All your ad<br />
            <span>analytics</span><br />
            In one place.
          </h1>
        </div>
      </div>

      <div className="right-section">
        <LoginPage />
      </div>
    </div>
  );
};

export default LandingPage;
