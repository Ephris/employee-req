import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import LifeHistoryForm from './components/LifeHistoryForm'
import SocialSecurityForm from './components/SocialSecurityForm'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<LifeHistoryForm />} />
          <Route path="/social-security" element={<SocialSecurityForm />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
