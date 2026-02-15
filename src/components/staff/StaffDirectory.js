import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { staffAPI } from '../../services/staffAPI';
import '../../styles/staff.css';

function StaffDirectory() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    department: ''
  });

  useEffect(() => {
    loadStaff();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, staff]);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const res = await staffAPI.getAll();
      setStaff(res.data);
      setFilteredStaff(res.data);
    } catch (err) {
      setError('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...staff];

    if (filters.search) {
      filtered = filtered.filter(member =>
        member.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.email?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.role) {
      filtered = filtered.filter(member => member.role === filters.role);
    }
    if (filters.department) {
      filtered = filtered.filter(member => member.department === filters.department);
    }

    setFilteredStaff(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await staffAPI.delete(id);
        loadStaff();
      } catch (err) {
        setError('Failed to delete staff member');
      }
    }
  };

  const roles = [...new Set(staff.map(s => s.role))].filter(Boolean);
  const departments = [...new Set(staff.map(s => s.department))].filter(Boolean);

  if (loading) return <div className="loading">Loading staff...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="staff-directory-container">
      <div className="directory-header">
        <h2>Staff Directory</h2>
        <Link to="/staff/new" className="btn-primary">
          Add Staff Member
        </Link>
      </div>

      <div className="filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name or email..."
            />
          </div>
          <div className="filter-group">
            <label>Role</label>
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="staff-count">
        Showing {filteredStaff.length} of {staff.length} staff members
      </div>

      {filteredStaff.length === 0 ? (
        <div className="no-data">No staff members found</div>
      ) : (
        <div className="staff-grid">
          {filteredStaff.map(member => (
            <div key={member.id} className="staff-card">
              <div className="staff-avatar">
                {member.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="staff-info">
                <h3>{member.name}</h3>
                <p className="staff-role">{member.role}</p>
                <p className="staff-department">{member.department}</p>
                {member.specialization && (
                  <p className="staff-specialization">{member.specialization}</p>
                )}
                <p className="staff-contact">
                  📧 {member.email}<br />
                  📞 {member.phone}
                </p>
              </div>
              <div className="staff-actions">
                <button
                  onClick={() => navigate(`/staff/${member.id}`)}
                  className="btn-small btn-view"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`/staff/edit/${member.id}`)}
                  className="btn-small btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="btn-small btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StaffDirectory;
