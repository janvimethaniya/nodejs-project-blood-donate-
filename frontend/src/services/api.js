import axios from 'axios';

const API_URL = 'http://localhost:1000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

export const donorService = {
  registerDonor: (data) => api.post('/donors/register', data),
  getAllDonors: () => api.get('/donors/all'),
  getDonorsByBloodGroup: (bloodGroup, city) => 
    api.get('/donors/search', { params: { bloodGroup, city } }),
  getDonorProfile: () => api.get('/donors/profile'),
  updateLastDonation: () => api.put('/donors/update-donation'),
  deactivateDonor: () => api.put('/donors/deactivate')
};

export const requestService = {
  createBloodRequest: (data) => api.post('/requests/create', data),
  getAllRequests: () => api.get('/requests/all'),
  getRequestsByCity: (city) => api.get('/requests/city', { params: { city } }),
  getPendingRequests: () => api.get('/requests/pending'),
  getRequestDetails: (id) => api.get(`/requests/${id}`),
  updateRequestStatus: (id, status) => api.put(`/requests/${id}/status`, { status })
};

export const adminService = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAllDonors: () => api.get('/admin/donors'),
  getAllRequests: () => api.get('/admin/requests'),
  approveRequest: (id) => api.put(`/admin/request/${id}/approve`),
  rejectRequest: (id) => api.put(`/admin/request/${id}/reject`),
  markFulfilled: (id) => api.put(`/admin/request/${id}/fulfilled`),
  deactivateDonor: (id) => api.put(`/admin/donor/${id}/deactivate`),
  getBloodGroupStats: () => api.get('/admin/blood-group-stats')
};

export const donationService = {
  recordDonation: (data) => api.post('/donations/record', data),
  getAllDonations: () => api.get('/donations/all'),
  getDonationsByDonor: (donorId) => api.get(`/donations/donor/${donorId}`),
  getDonorStats: (donorId) => api.get(`/donations/stats/donor/${donorId}`),
  getDonationStats: () => api.get('/donations/stats')
};
