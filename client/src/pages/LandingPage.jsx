import React from 'react';
import '../styles/landingPage.css';
import LoginPage from '../components/Login';
import {Logo} from '../components/Logotipo';



const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="left-section">
        <div className="logo">
            <Logo txt_logo="#fdfdfd" img_logo="#069494" />
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
