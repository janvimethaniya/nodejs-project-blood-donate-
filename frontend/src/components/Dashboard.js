import React, { useState, useEffect } from 'react';
import { donorService, requestService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [donors, setDonors] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+',
    units: 1,
    hospitalName: '',
    hospitalAddress: '',
    city: '',
    phone: '',
    email: '',
    reason: '',
    urgency: 'Medium',
    neededDate: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Auto-fill email in form
      setFormData(prev => ({
        ...prev,
        email: parsedUser.email || ''
      }));
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'my-requests' && user) {
      fetchMyRequests();
    }
  }, [activeTab, user]);

  const handleRequestBlood = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestService.createBloodRequest(formData);
      alert('Blood request created successfully!');
      setFormData({
        patientName: '',
        bloodGroup: 'O+',
        units: 1,
        hospitalName: '',
        hospitalAddress: '',
        city: '',
        phone: '',
        email: '',
        reason: '',
        urgency: 'Medium',
        neededDate: ''
      });
      // Automatically fetch updated requests
      if (user) {
        setTimeout(() => fetchMyRequests(), 500);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating request');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchDonors = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await donorService.getAllDonors();
      setDonors(response.data.donors);
    } catch (error) {
      alert('Error fetching donors');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const response = await requestService.getAllRequests();
      const allRequests = response.data.requests || [];
      const userEmail = user?.email?.trim().toLowerCase() || '';
      
      console.log('All requests:', allRequests);
      console.log('User email:', userEmail);
      
      // Filter requests by matching email address (case-insensitive)
      const filtered = allRequests.filter(req => {
        const reqEmail = req.email?.trim().toLowerCase() || '';
        console.log('Comparing:', reqEmail, '===', userEmail, 'Match:', reqEmail === userEmail);
        return reqEmail === userEmail;
      });
      
      console.log('Filtered requests:', filtered);
      setMyRequests(filtered);
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Error fetching requests: ' + error.message);
      setMyRequests([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">🩸 Blood Donation</div>
        <ul className="nav-links">
          <li><button onClick={() => setActiveTab('home')}>Home</button></li>
          <li><button onClick={() => setActiveTab('request')}>Request Blood</button></li>
          <li><button onClick={() => setActiveTab('donors')}>Find Donors</button></li>
          <li><button onClick={() => setActiveTab('my-requests')}>My Requests</button></li>
          <li><button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}>Logout</button></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'home' && (
          <div className="home-section">
            <h1>Welcome, {user?.name}!</h1>
            <div className="info-cards">
              <div className="info-card">
                <h3>Save Lives</h3>
                <p>Donate blood and help save 3 lives with each donation</p>
              </div>
              <div className="info-card">
                <h3>Urgent Need</h3>
                <p>Request blood for your loved ones in emergency</p>
              </div>
              <div className="info-card">
                <h3>Quick Search</h3>
                <p>Find nearby donors with your required blood group</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'request' && (
          <div className="request-section">
            <h2>Request Blood</h2>
            <form onSubmit={handleRequestBlood} className="blood-request-form">
              <input
                type="text"
                placeholder="Patient Name"
                value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                required
              />
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
              <input
                type="number"
                min="1"
                max="10"
                placeholder="Units"
                value={formData.units}
                onChange={(e) => setFormData({...formData, units: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Hospital Address"
                value={formData.hospitalAddress}
                onChange={(e) => setFormData({...formData, hospitalAddress: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled
                required
              />
              <input
                type="text"
                placeholder="Reason"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                required
              />
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Emergency</option>
              </select>
              <input
                type="date"
                value={formData.neededDate}
                onChange={(e) => setFormData({...formData, neededDate: e.target.value})}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Requesting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="donors-section">
            <h2>Find Blood Donors</h2>
            <button onClick={handleSearchDonors} className="search-btn">
              {loading ? 'Loading...' : 'Load All Donors'}
            </button>
            <div className="donors-list">
              {donors.length === 0 ? (
                <p className="no-data">No donors found. Click button to search.</p>
              ) : (
                donors.map(donor => (
                  <div key={donor._id} className="donor-card">
                    <h3>{donor.name}</h3>
                    <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                    <p><strong>Age:</strong> {donor.age}</p>
                    <p><strong>City:</strong> {donor.city}</p>
                    <p><strong>Phone:</strong> {donor.phone}</p>
                    <p><strong>Email:</strong> {donor.email}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'my-requests' && (
          <div className="my-requests-section">
            <h2>My Blood Requests</h2>
            <p style={{color: '#666', fontSize: '14px'}}>
              Showing requests for: <strong>{user?.email}</strong>
            </p>
            <button onClick={fetchMyRequests} className="refresh-btn">
              {loading ? 'Loading...' : 'Refresh Requests'}
            </button>
            {myRequests.length === 0 ? (
              <p className="no-data">No blood requests found for your email. Create a new request in "Request Blood" tab.</p>
            ) : (
              <div className="requests-list">
                <p style={{color: '#667eea', marginBottom: '15px'}}>Found <strong>{myRequests.length}</strong> request(s)</p>
                {myRequests.map(request => (
                  <div key={request._id} className="request-card">
                    <div className="request-header">
                      <h3>{request.patientName}</h3>
                      <span className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="request-details">
                      <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                      <p><strong>Units:</strong> {request.units}</p>
                      <p><strong>Hospital:</strong> {request.hospitalName}</p>
                      <p><strong>City:</strong> {request.city}</p>
                      <p><strong>Phone:</strong> {request.phone}</p>
                      <p><strong>Email:</strong> {request.email}</p>
                      <p><strong>Reason:</strong> {request.reason}</p>
                      <p><strong>Urgency:</strong> <span className={`urgency ${request.urgency.toLowerCase()}`}>{request.urgency}</span></p>
                      <p><strong>Needed Date:</strong> {new Date(request.neededDate).toLocaleDateString()}</p>
                      {request.matchedDonors && request.matchedDonors.length > 0 && (
                        <div className="matched-donors">
                          <h4>Matched Donors:</h4>
                          <ul>
                            {request.matchedDonors.map((donor, idx) => (
                              <li key={idx}>{donor.donorName} - {donor.phone}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
