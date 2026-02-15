import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const staffAPI = {
  getAll: (params = {}) => axios.get(`${API_BASE_URL}/staff`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/staff/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/staff`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/staff/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/staff/${id}`),
  getByRole: (role) => axios.get(`${API_BASE_URL}/staff`, { params: { role } }),
  getByDepartment: (department) => axios.get(`${API_BASE_URL}/staff`, { params: { department } })
};
