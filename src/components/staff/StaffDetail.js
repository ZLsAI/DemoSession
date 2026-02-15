import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { staffAPI } from '../../services/staffAPI';

function StaffDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStaff();
  }, [id]);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const res = await staffAPI.getById(id);
      setStaff(res.data);
    } catch (err) {
      setError('Failed to load staff details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await staffAPI.delete(id);
        navigate('/staff');
      } catch (err) {
        setError('Failed to delete staff member');
      }
    }
  };

  if (loading) return <div className="loading">Loading staff details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!staff) return <div className="no-data">Staff member not found</div>;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="staff-detail-container">
      <div className="detail-header">
        <div className="header-content">
          <div className="staff-avatar-large">
            {staff.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="header-info">
            <h2>{staff.name}</h2>
            <p className="staff-role">{staff.role}</p>
            <p className="staff-department">{staff.department}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => navigate(`/staff/edit/${id}`)}
            className="btn-primary"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{staff.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{staff.phone}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Professional Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">{staff.role}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Department:</span>
              <span className="info-value">{staff.department}</span>
            </div>
            {staff.specialization && (
              <div className="info-item">
                <span className="info-label">Specialization:</span>
                <span className="info-value">{staff.specialization}</span>
              </div>
            )}
            {staff.licenseNumber && (
              <div className="info-item">
                <span className="info-label">License Number:</span>
                <span className="info-value">{staff.licenseNumber}</span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h3>Weekly Availability</h3>
          <div className="availability-display">
            {days.map(day => {
              const dayAvail = staff.availability?.[day];
              const isAvailable = dayAvail?.available;
              
              return (
                <div key={day} className={`availability-day ${isAvailable ? 'available' : 'unavailable'}`}>
                  <div className="day-name">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                  <div className="day-hours">
                    {isAvailable ? (
                      `${dayAvail.start} - ${dayAvail.end}`
                    ) : (
                      'Not Available'
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
