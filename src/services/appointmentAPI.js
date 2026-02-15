import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const appointmentAPI = {
  getAll: (params = {}) => axios.get(`${API_BASE_URL}/appointments`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/appointments/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/appointments`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/appointments/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/appointments/${id}`),
  checkConflict: (data) => axios.post(`${API_BASE_URL}/appointments/check-conflict`, data)
};
