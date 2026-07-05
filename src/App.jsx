import { useState } from 'react'
import './App.css'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function sanitizeInput(value) {
  return value.replace(/[<>]/g, '')
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
  const [patientName, setPatientName] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleDayClick(day) {
    setSelectedDay(day)
    setPatientName('')
    setTime('')
    setErrors({})
    setSubmitError('')
  }

  function handleAddAppointment(e) {
    e.preventDefault()

    const newErrors = {}
    if (!patientName.trim()) {
      newErrors.patientName = true
    }
    if (!time.trim()) {
      newErrors.time = true
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setSubmitError('')

    setTimeout(() => {
      const didFail = Math.random() < 0.1

      if (didFail) {
        setLoading(false)
        setSubmitError('Network error. Please try again.')
        return
      }

      const cleanName = sanitizeInput(patientName)
      const cleanTime = sanitizeInput(time)

      const existing = appointments[selectedDay] || []
      const updated = {
        ...appointments,
        [selectedDay]: [...existing, { patientName: cleanName, time: cleanTime }],
      }

      setAppointments(updated)
      setPatientName('')
      setTime('')
      setErrors({})
      setLoading(false)

      console.log('[Analytics] User interacted with Calendar Widget: added appointment')
    }, 1200)
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
              role="button"
              tabIndex={0}
              aria-label={`Select day ${day}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleDayClick(day)
                }
              }}
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

          <form onSubmit={handleAddAppointment} className="appointment-form">
            <div className="form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                id="patientName"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className={errors.patientName ? 'input-error' : ''}
                aria-label="Patient Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={errors.time ? 'input-error' : ''}
                aria-label="Appointment Time"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Appointment'}
            </button>
          </form>

          {submitError && <p className="error-message">{submitError}</p>}

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