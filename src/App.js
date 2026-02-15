import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import PatientDetail from './components/patients/PatientDetail';
import AppointmentScheduler from './components/appointments/AppointmentScheduler';
import AppointmentForm from './components/appointments/AppointmentForm';
import StaffDirectory from './components/staff/StaffDirectory';
import StaffForm from './components/staff/StaffForm';
import StaffDetail from './components/staff/StaffDetail';

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/new" element={<PatientForm />} />
          <Route path="/patients/edit/:id" element={<PatientForm />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/appointments/edit/:id" element={<AppointmentForm />} />
          <Route path="/staff" element={<StaffDirectory />} />
          <Route path="/staff/new" element={<StaffForm />} />
          <Route path="/staff/edit/:id" element={<StaffForm />} />
          <Route path="/staff/:id" element={<StaffDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
