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
            <div key={day} className="calendar-cell">
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App