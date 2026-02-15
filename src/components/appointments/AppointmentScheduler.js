import React, { useState, useEffect } from 'react';
import { appointmentAPI } from '../../services/appointmentAPI';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import AppointmentList from './AppointmentList';
import '../../styles/appointments.css';

function AppointmentScheduler() {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view === 'calendar') {
      loadMonthAppointments();
    }
  }, [currentMonth, view]);

  const loadMonthAppointments = async () => {
    try {
      setLoading(true);
      const start = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
      const end = format(endOfMonth(currentMonth), 'yyyy-MM-dd');
      const res = await appointmentAPI.getAll({ dateFrom: start, dateTo: end });
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to load appointments', err);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const getAppointmentsForDay = (day) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    return appointments.filter(apt => apt.date === dayStr);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="appointment-scheduler">
      <div className="scheduler-header">
        <h2>Appointment Scheduler</h2>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            📋 List View
          </button>
          <button
            className={`toggle-btn ${view === 'calendar' ? 'active' : ''}`}
            onClick={() => setView('calendar')}
          >
            📅 Calendar View
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <AppointmentList />
      ) : (
        <div className="calendar-view">
          <div className="calendar-header">
            <button onClick={previousMonth} className="btn-nav">←</button>
            <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
            <button onClick={nextMonth} className="btn-nav">→</button>
          </div>

          {loading ? (
            <div className="loading">Loading calendar...</div>
          ) : (
            <div className="calendar-grid">
              <div className="calendar-day-header">Sun</div>
              <div className="calendar-day-header">Mon</div>
              <div className="calendar-day-header">Tue</div>
              <div className="calendar-day-header">Wed</div>
              <div className="calendar-day-header">Thu</div>
              <div className="calendar-day-header">Fri</div>
              <div className="calendar-day-header">Sat</div>

              {getDaysInMonth().map(day => {
                const dayAppointments = getAppointmentsForDay(day);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div
                    key={day.toString()}
                    className={`calendar-day ${isToday ? 'today' : ''}`}
                  >
                    <div className="day-number">{format(day, 'd')}</div>
                    <div className="day-appointments">
                      {dayAppointments.length > 0 && (
                        <div className="appointment-count">
                          {dayAppointments.length} apt{dayAppointments.length > 1 ? 's' : ''}
                        </div>
                      )}
                      {dayAppointments.slice(0, 2).map(apt => (
                        <div
                          key={apt.id}
                          className={`calendar-appointment status-${apt.status}`}
                          title={`${apt.time} - ${apt.patientName} with ${apt.doctorName}`}
                        >
                          {apt.time} {apt.patientName?.split(' ')[0]}
                        </div>
                      ))}
                      {dayAppointments.length > 2 && (
                        <div className="more-appointments">
                          +{dayAppointments.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AppointmentScheduler;
