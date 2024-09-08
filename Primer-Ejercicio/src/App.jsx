import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Product } from './pages/Product'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/register" element={<Register />} />
      <Route  path="/dashboard" element={<Dashboard />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  )
}

export default App
