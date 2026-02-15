import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { patientAPI } from '../../services/patientAPI';

function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    allergies: '',
    medicalHistory: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadPatient();
    }
  }, [id]);

  const loadPatient = async () => {
    try {
      const res = await patientAPI.getById(id);
      const patient = res.data;
      setFormData({
        name: patient.name || '',
        email: patient.email || '',
        phone: patient.phone || '',
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        bloodType: patient.bloodType || '',
        address: patient.address || '',
        emergencyContact: patient.emergencyContact || '',
        emergencyPhone: patient.emergencyPhone || '',
        allergies: patient.allergies || '',
        medicalHistory: patient.medicalHistory || ''
      });
    } catch (err) {
      setError('Failed to load patient');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await patientAPI.update(id, formData);
      } else {
        await patientAPI.create(formData);
      }
      navigate('/patients');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-form-container">
      <h2>{isEdit ? 'Edit Patient' : 'Add New Patient'}</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bloodType">Blood Type</label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address..."
              rows="2"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Emergency Contact</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyContact">Contact Name</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyPhone">Contact Phone</label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="Emergency contact phone"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Medical Information</h3>
          
          <div className="form-group">
            <label htmlFor="allergies">Allergies</label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="List any known allergies..."
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              placeholder="Brief medical history..."
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/patients')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Add Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
