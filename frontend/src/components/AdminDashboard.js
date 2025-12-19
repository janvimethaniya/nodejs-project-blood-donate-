import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import DonationTracking from './DonationTracking';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [bloodStats, setBloodStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await adminService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      alert('Error fetching stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllDonors();
      setDonors(response.data.donors);
    } catch (error) {
      alert('Error fetching donors');
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllRequests();
      setRequests(response.data.requests);
    } catch (error) {
      alert('Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchBloodStats = async () => {
    setLoading(true);
    try {
      const response = await adminService.getBloodGroupStats();
      setBloodStats(response.data.stats);
    } catch (error) {
      alert('Error fetching blood stats');
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      await adminService.approveRequest(id);
      fetchRequests();
    } catch (error) {
      alert('Error approving request');
    }
  };

  const rejectRequest = async (id) => {
    try {
      await adminService.rejectRequest(id);
      fetchRequests();
    } catch (error) {
      alert('Error rejecting request');
    }
  };

  const markFulfilled = async (id) => {
    try {
      await adminService.markFulfilled(id);
      fetchRequests();
    } catch (error) {
      alert('Error marking request');
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-brand">👨‍💼 Admin Panel</div>
        <ul className="admin-nav-links">
          <li><button onClick={() => {
            setActiveTab('stats');
            fetchStats();
          }}>Dashboard</button></li>
          <li><button onClick={() => {
            setActiveTab('donors');
            fetchDonors();
          }}>Manage Donors</button></li>
          <li><button onClick={() => {
            setActiveTab('requests');
            fetchRequests();
          }}>Blood Requests</button></li>
          <li><button onClick={() => {
            setActiveTab('donations');
          }}>Track Donations</button></li>
          <li><button onClick={() => {
            setActiveTab('blood-stats');
            fetchBloodStats();
          }}>Blood Stats</button></li>
          <li><button onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}>Logout</button></li>
        </ul>
      </nav>

      <div className="admin-content">
        {activeTab === 'stats' && (
          <div className="stats-section">
            <h1>Dashboard Statistics</h1>
            {stats && (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>{stats.totalDonors}</h3>
                  <p>Active Donors</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.totalRequests}</h3>
                  <p>Total Requests</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.pendingRequests}</h3>
                  <p>Pending Requests</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.approvedRequests}</h3>
                  <p>Approved Requests</p>
                </div>
                <div className="stat-card">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="donors-section">
            <h1>Manage Donors</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donors.map(donor => (
                  <tr key={donor._id}>
                    <td>{donor.name}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.age}</td>
                    <td>{donor.city}</td>
                    <td>{donor.phone}</td>
                    <td>{donor.isActive ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <h1>Blood Requests</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Blood Group</th>
                  <th>Hospital</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request._id}>
                    <td>{request.patientName}</td>
                    <td>{request.bloodGroup}</td>
                    <td>{request.hospitalName}</td>
                    <td>{request.urgency}</td>
                    <td>{request.status}</td>
                    <td>
                      {request.status === 'Pending' && (
                        <>
                          <button onClick={() => approveRequest(request._id)} className="btn-approve">
                            Approve
                          </button>
                          <button onClick={() => rejectRequest(request._id)} className="btn-reject">
                            Reject
                          </button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <button onClick={() => markFulfilled(request._id)} className="btn-fulfill">
                          Fulfilled
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'blood-stats' && (
          <div className="blood-stats-section">
            <h1>Blood Group Statistics</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Available Donors</th>
                </tr>
              </thead>
              <tbody>
                {bloodStats.map(stat => (
                  <tr key={stat._id}>
                    <td>{stat._id}</td>
                    <td>{stat.count}</td>
                  </tr>
                ))}
          

        {activeTab === 'donations' && (
          <DonationTracking />
        )}    </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
