import { NavLink, Route, Routes } from 'react-router-dom'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Workouts from './components/Workouts.jsx'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="text-muted mb-0">
          Multi-tier fitness dashboard powered by the OctoFit API.
        </p>
      </header>

      <nav className="nav nav-pills mb-4 flex-wrap gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
