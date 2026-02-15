import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../../services/appointmentAPI';
import { format, parseISO } from 'date-fns';

function AppointmentList() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    doctor: '',
    patient: '',
    status: ''
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, appointments]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await appointmentAPI.getAll();
      setAppointments(res.data);
      setFilteredAppointments(res.data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...appointments];

    if (filters.dateFrom) {
      filtered = filtered.filter(apt => apt.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(apt => apt.date <= filters.dateTo);
    }
    if (filters.doctor) {
      filtered = filtered.filter(apt => 
        apt.doctorName?.toLowerCase().includes(filters.doctor.toLowerCase())
      );
    }
    if (filters.patient) {
      filtered = filtered.filter(apt => 
        apt.patientName?.toLowerCase().includes(filters.patient.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter(apt => apt.status === filters.status);
    }

    setFilteredAppointments(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.delete(id);
        loadAppointments();
      } catch (err) {
        setError('Failed to cancel appointment');
      }
    }
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="appointment-list-container">
      <div className="list-header">
        <h2>Appointments</h2>
        <Link to="/appointments/new" className="btn-primary">
          Schedule Appointment
        </Link>
      </div>

      <div className="filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>From Date</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>To Date</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>Doctor</label>
            <input
              type="text"
              name="doctor"
              value={filters.doctor}
              onChange={handleFilterChange}
              placeholder="Search doctor..."
            />
          </div>
          <div className="filter-group">
            <label>Patient</label>
            <input
              type="text"
              name="patient"
              value={filters.patient}
              onChange={handleFilterChange}
              placeholder="Search patient..."
            />
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="appointments-count">
        Showing {filteredAppointments.length} of {appointments.length} appointments
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="no-data">No appointments found</div>
      ) : (
        <div className="appointments-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.patientName || 'N/A'}</td>
                  <td>{appointment.doctorName || 'N/A'}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.duration} min</td>
                  <td>
                    <span className={getStatusClass(appointment.status)}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate(`/appointments/edit/${appointment.id}`)}
                        className="btn-small btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="btn-small btn-delete"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
