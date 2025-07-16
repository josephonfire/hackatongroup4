import React from 'react';
import '../styles/landingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="left-section">
        <div className="logo">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`circle circle-${i}`} />
          ))}
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
        {/* Replace this with your actual form component */}
        <form className="login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
