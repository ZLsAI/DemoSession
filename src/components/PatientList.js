import React, { useState, useEffect } from 'react';
import { usePatients } from '../context/PatientContext';
import PatientTableRow from './PatientTableRow';
import { filterBySearch, filterByDateRange, sortPatients, formatDate } from '../utils/filterUtils';
import './PatientList.css';

const PatientList = () => {
  const { patients } = usePatients();
  const [loading, setLoading] = useState(true);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Sort state
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Filtered and sorted patients
  const [displayedPatients, setDisplayedPatients] = useState([]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sorting whenever inputs change
  useEffect(() => {
    let filtered = patients;
    
    // Apply search filter
    filtered = filterBySearch(filtered, searchTerm);
    
    // Apply date range filter
    filtered = filterByDateRange(filtered, fromDate, toDate);
    
    // Apply sorting
    if (sortBy) {
      filtered = sortPatients(filtered, sortBy, sortDirection);
    }
    
    setDisplayedPatients(filtered);
  }, [patients, searchTerm, fromDate, toDate, sortBy, sortDirection]);

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending direction
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFromDate('');
    setToDate('');
    setSortBy('');
    setSortDirection('asc');
  };

  const handleViewDetails = (patientId) => {
    // In a real app, this would navigate to patient detail page
    alert(`Viewing details for patient ID: ${patientId}`);
  };

  const handleEdit = (patientId) => {
    // In a real app, this would navigate to edit page
    alert(`Editing patient ID: ${patientId}`);
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return '⇅';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="patient-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <h1>Patient List</h1>
      
      {/* Search and Filter Section */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or MRN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search patients by name or MRN"
          />
        </div>
        
        <div className="date-filters">
          <div className="date-filter-group">
            <label htmlFor="from-date">From:</label>
            <input
              id="from-date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="date-input"
              aria-label="Filter from date"
            />
          </div>
          
          <div className="date-filter-group">
            <label htmlFor="to-date">To:</label>
            <input
              id="to-date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="date-input"
              aria-label="Filter to date"
            />
          </div>
        </div>
        
        <button 
          className="clear-filters-btn"
          onClick={handleClearFilters}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="results-info">
        Showing {displayedPatients.length} of {patients.length} patients
      </div>

      {/* Patient Table */}
      {displayedPatients.length === 0 ? (
        <div className="empty-state">
          <p>No patients found matching your criteria.</p>
          {(searchTerm || fromDate || toDate) && (
            <button 
              className="clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th 
                  className="sortable"
                  onClick={() => handleSort('name')}
                  aria-label="Sort by name"
                >
                  Name {getSortIcon('name')}
                </th>
                <th>MRN</th>
                <th 
                  className="sortable"
                  onClick={() => handleSort('dateOfBirth')}
                  aria-label="Sort by date of birth"
                >
                  Date of Birth {getSortIcon('dateOfBirth')}
                </th>
                <th>Phone</th>
                <th>Email</th>
                <th 
                  className="sortable"
                  onClick={() => handleSort('registrationDate')}
                  aria-label="Sort by registration date"
                >
                  Registration Date {getSortIcon('registrationDate')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedPatients.map(patient => (
                <PatientTableRow
                  key={patient.id}
                  patient={patient}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="patient-cards">
        {displayedPatients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="card-header">
              <h3>{patient.name}</h3>
              <span className="mrn-badge">{patient.mrn}</span>
            </div>
            <div className="card-body">
              <div className="card-field">
                <strong>DOB:</strong> {formatDate(patient.dateOfBirth)}
              </div>
              <div className="card-field">
                <strong>Phone:</strong> {patient.phone}
              </div>
              <div className="card-field">
                <strong>Email:</strong> {patient.email}
              </div>
              <div className="card-field">
                <strong>Registered:</strong> {formatDate(patient.registrationDate)}
              </div>
            </div>
            <div className="card-actions">
              <button 
                className="action-btn view-btn"
                onClick={() => handleViewDetails(patient.id)}
              >
                View Details
              </button>
              <button 
                className="action-btn edit-btn"
                onClick={() => handleEdit(patient.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
