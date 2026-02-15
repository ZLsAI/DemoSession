import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { appointmentAPI } from '../../services/appointmentAPI';
import { patientAPI } from '../../services/patientAPI';
import { staffAPI } from '../../services/staffAPI';
import { format } from 'date-fns';

function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    duration: '30',
    reason: '',
    notes: '',
    status: 'scheduled'
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conflictWarning, setConflictWarning] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (id) {
      loadAppointment();
    }
  }, [id]);

  const loadData = async () => {
    try {
      const [patientsRes, staffRes] = await Promise.all([
        patientAPI.getAll(),
        staffAPI.getByRole('Doctor')
      ]);
      setPatients(patientsRes.data);
      setDoctors(staffRes.data);
    } catch (err) {
      setError('Failed to load data');
    }
  };

  const loadAppointment = async () => {
    try {
      const res = await appointmentAPI.getById(id);
      const apt = res.data;
      setFormData({
        patientId: apt.patientId || '',
        doctorId: apt.doctorId || '',
        date: apt.date ? format(new Date(apt.date), 'yyyy-MM-dd') : '',
        time: apt.time || '',
        duration: apt.duration || '30',
        reason: apt.reason || '',
        notes: apt.notes || '',
        status: apt.status || 'scheduled'
      });
    } catch (err) {
      setError('Failed to load appointment');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'date' || name === 'time' || name === 'doctorId') {
      setConflictWarning('');
    }
  };

  const checkConflict = async () => {
    if (formData.doctorId && formData.date && formData.time) {
      try {
        await appointmentAPI.checkConflict({
          doctorId: formData.doctorId,
          date: formData.date,
          time: formData.time,
          duration: parseInt(formData.duration),
          excludeId: id
        });
        setConflictWarning('');
      } catch (err) {
        if (err.response?.status === 409) {
          setConflictWarning('Warning: This time slot conflicts with another appointment');
        }
      }
    }
  };

  useEffect(() => {
    if (formData.doctorId && formData.date && formData.time) {
      checkConflict();
    }
  }, [formData.doctorId, formData.date, formData.time, formData.duration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        duration: parseInt(formData.duration)
      };

      if (isEdit) {
        await appointmentAPI.update(id, submitData);
      } else {
        await appointmentAPI.create(submitData);
      }
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save appointment');
    } finally {
      setLoading(false);
    }
  };

  const minDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="appointment-form-container">
      <h2>{isEdit ? 'Edit Appointment' : 'Schedule New Appointment'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      {conflictWarning && <div className="warning-message">{conflictWarning}</div>}

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="patientId">Patient *</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} - {patient.email}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doctorId">Doctor *</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={minDate}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes) *</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Visit *</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="e.g., Annual checkup, Follow-up"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/appointments')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Schedule'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
