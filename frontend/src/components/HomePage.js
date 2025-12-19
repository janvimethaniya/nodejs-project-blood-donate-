import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import hero from "../Assets/1.jpg"

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <nav className="home-nav">
          <div className="logo">🩸 Blood Donation</div>
          <div className="nav-buttons">
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </nav>
      </header>

      <section className="hero-section">
        <img src={hero} alt='Blood Donation Hero'/>
        <div className="hero-content">
          <h1>Save Lives with Blood Donation</h1>
          <p>A platform to connect blood donors with patients in need</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/register')} className="btn-primary">
              Become a Donor
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary">
              Request Blood
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon-img">🧑‍🩸</div>
            <h3>For Donors</h3>
            <p>Register as a donor and help save lives. Get notified when your blood type is needed.</p>
          </div>
          <div className="feature">
            <div className="feature-icon-img">🚑</div>
            <h3>For Patients</h3>
            <p>Request blood quickly and find nearby donors. Emergency requests prioritized.</p>
          </div>
          <div className="feature">
            <div className="feature-icon-img">🏥</div>
            <h3>For Hospitals</h3>
            <p>Manage blood requests, track donors, and ensure availability for emergency cases.</p>
          </div>
          <div className="feature">
            <div className="feature-icon-img">👨‍💼</div>
            <h3>For Admin</h3>
            <p>Monitor all donors, manage requests, approve transactions, and send alerts.</p>
          </div>
        </div>
      </section>

      <section className="blood-groups-section">
        <h2>Blood Types Available</h2>
        <div className="blood-groups">
          <div className="blood-group">O+</div>
          <div className="blood-group">O-</div>
          <div className="blood-group">A+</div>
          <div className="blood-group">A-</div>
          <div className="blood-group">B+</div>
          <div className="blood-group">B-</div>
          <div className="blood-group">AB+</div>
          <div className="blood-group">AB-</div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Blood Donation Platform. Saving Lives Together.</p>
      </footer>
    </div>
  );
};

export default HomePage;
