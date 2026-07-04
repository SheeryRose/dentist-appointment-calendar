import { useState } from 'react'
import './App.css'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function App() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const totalDays = getDaysInMonth(year, month)
  const startDay = getFirstDayOfMonth(year, month)

  const blanks = Array.from({ length: startDay })
  const days = Array.from({ length: totalDays }, (_, i) => i + 1)

  const [selectedDay, setSelectedDay] = useState(null)
  const [appointments, setAppointments] = useState({})

  function handleDayClick(day) {
    setSelectedDay(day)
  }

  const dayAppointments = selectedDay ? appointments[selectedDay] || [] : []

  return (
    <div className="app">
      <h1>Dentist Appointment Calendar</h1>
      <div className="calendar">
        <div className="calendar-header">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-header-cell">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} className="calendar-cell empty"></div>
          ))}
          {days.map((day) => (
            <div
              key={day}
              className={
                day === selectedDay
                  ? 'calendar-cell selected'
                  : 'calendar-cell'
              }
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="day-details">
          <h2>
            Appointments for {month + 1}/{selectedDay}/{year}
          </h2>
          {dayAppointments.length === 0 ? (
            <p>No appointments found for this day.</p>
          ) : (
            <ul>
              {dayAppointments.map((appt, i) => (
                <li key={i}>
                  {appt.patientName} - {appt.time}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default App