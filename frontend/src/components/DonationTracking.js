import React, { useState, useEffect } from 'react';
import { donationService } from '../services/api';
import './DonationTracking.css';

const DonationTracking = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [donations, setDonations] = useState([]);
  const [donationStats, setDonationStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    donorId: '',
    units: 1,
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (activeTab === 'track') {
      fetchDonations();
    } else if (activeTab === 'stats') {
      fetchDonationStats();
    }
  }, [activeTab]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await donationService.getAllDonations();
      setDonations(response.data.donations);
    } catch (error) {
      alert('Error fetching donations');
    } finally {
      setLoading(false);
    }
  };

  const fetchDonationStats = async () => {
    setLoading(true);
    try {
      const response = await donationService.getDonationStats();
      setDonationStats(response.data.stats);
    } catch (error) {
      alert('Error fetching stats');
    } finally {
      setLoading(false);
    }
  };

  const handleRecordDonation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donationService.recordDonation(formData);
      alert('Donation recorded successfully!');
      setFormData({ donorId: '', units: 1, location: '', notes: '' });
      fetchDonations();
    } catch (error) {
      alert(error.response?.data?.message || 'Error recording donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-tracking">
      <div className="tracking-nav">
        <button 
          className={activeTab === 'record' ? 'active' : ''} 
          onClick={() => setActiveTab('record')}
        >
          Record Donation
        </button>
        <button 
          className={activeTab === 'track' ? 'active' : ''} 
          onClick={() => setActiveTab('track')}
        >
          Track Donations
        </button>
        <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
          Blood Stats
        </button>
      </div>

      <div className="tracking-content">
        {activeTab === 'record' && (
          <div className="record-donation-section">
            <h2>Record Blood Donation</h2>
            <form onSubmit={handleRecordDonation} className="donation-form">
              <input type="text" placeholder="Donor ID (MongoDB ID)" value={formData.donorId} onChange={(e) => setFormData({...formData, donorId: e.target.value})} required/>
              <input type="number" min="1" max="5" placeholder="Units" value={formData.units} onChange={(e) => setFormData({...formData, units: e.target.value})} required/>
              <input type="text" placeholder="Location/Center" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required/>
              <textarea placeholder="Notes (optional)" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows="3"/>
              <button type="submit" disabled={loading}>
                {loading ? 'Recording...' : 'Record Donation'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'track' && (
          <div className="track-donations-section">
            <h2>Donation History</h2>
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map(donation => (
                  <tr key={donation._id}>
                    <td>{donation.donorName}</td>
                    <td>{donation.bloodGroup}</td>
                    <td>{donation.units}</td>
                    <td>{donation.location}</td>
                    <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                    <td><span className={`status ${donation.status.toLowerCase()}`}>{donation.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="donation-stats-section">
            <h2>Blood Group Donation Statistics</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Total Units</th>
                  <th>Donation Count</th>
                </tr>
              </thead>
              <tbody>
                {donationStats.map(stat => (
                  <tr key={stat._id}>
                    <td>{stat._id}</td>
                    <td>{stat.totalUnits}</td>
                    <td>{stat.donationCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationTracking;
