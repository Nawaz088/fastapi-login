import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import HelloPage from './pages/Hello'

function App() {
  const [token, setToken] = useState('')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setToken={setToken} />} />
        <Route path="/hello/:username" element={<HelloPage />} />
      </Routes>
    </Router>
  )
}

export default App
