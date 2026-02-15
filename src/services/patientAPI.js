import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const patientAPI = {
  getAll: (params = {}) => axios.get(`${API_BASE_URL}/patients`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/patients/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/patients`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/patients/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/patients/${id}`),
  search: (query) => axios.get(`${API_BASE_URL}/patients/search`, { params: { q: query } })
};
