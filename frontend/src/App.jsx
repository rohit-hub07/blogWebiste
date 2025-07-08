
import './App.css'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App
