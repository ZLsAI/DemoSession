import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { staffAPI } from '../../services/staffAPI';

function StaffForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Doctor',
    department: '',
    specialization: '',
    licenseNumber: '',
    availability: {
      monday: { available: false, start: '09:00', end: '17:00' },
      tuesday: { available: false, start: '09:00', end: '17:00' },
      wednesday: { available: false, start: '09:00', end: '17:00' },
      thursday: { available: false, start: '09:00', end: '17:00' },
      friday: { available: false, start: '09:00', end: '17:00' },
      saturday: { available: false, start: '09:00', end: '17:00' },
      sunday: { available: false, start: '09:00', end: '17:00' }
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadStaff();
    }
  }, [id]);

  const loadStaff = async () => {
    try {
      const res = await staffAPI.getById(id);
      const member = res.data;
      setFormData({
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
        role: member.role || 'Doctor',
        department: member.department || '',
        specialization: member.specialization || '',
        licenseNumber: member.licenseNumber || '',
        availability: member.availability || formData.availability
      });
    } catch (err) {
      setError('Failed to load staff member');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: field === 'available' ? value : value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await staffAPI.update(id, formData);
      } else {
        await staffAPI.create(formData);
      }
      navigate('/staff');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save staff member');
    } finally {
      setLoading(false);
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="staff-form-container">
      <h2>{isEdit ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="staff-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Smith"
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
                placeholder="john.smith@hospital.com"
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
              <label htmlFor="role">Role *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Administrator">Administrator</option>
                <option value="Technician">Technician</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Emergency">Emergency</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Radiology">Radiology</option>
                <option value="Surgery">Surgery</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
          </div>

          {formData.role === 'Doctor' && (
            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g., Cardiologist, General Practitioner"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="licenseNumber">License Number</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="License/Registration Number"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Weekly Availability Schedule</h3>
          
          <div className="availability-schedule">
            {days.map(day => (
              <div key={day} className="availability-row">
                <div className="day-checkbox">
                  <input
                    type="checkbox"
                    id={`${day}-available`}
                    checked={formData.availability[day].available}
                    onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                  />
                  <label htmlFor={`${day}-available`}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
                
                {formData.availability[day].available && (
                  <div className="time-inputs">
                    <input
                      type="time"
                      value={formData.availability[day].start}
                      onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={formData.availability[day].end}
                      onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/staff')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Add Staff Member'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffForm;
