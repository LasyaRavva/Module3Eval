import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import UpdateRestaurant from './pages/UpdateRestaurant';
import './App.css'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path ="/" element = {<Login/>}/>
          <Route path = "/admin/dashboard" element = {<ProtectedRoute requiredRole ="admin">
          <Admin/>
          </ProtectedRoute>
          }
          />
          <Route path ="/admin/restaurants/update/:id"
          element ={
            <ProtectedRoute requiredRole ="admin">
              <UpdateRestaurant/>
            </ProtectedRoute>
          }
          />
          <Route
          path= "/customers/dashboard"
          element ={
            <ProtectedRoute requiredRole ="customer">
              <Customer/>
            </ProtectedRoute>
          }
          />
          <Route path = "*" element = {<Navigate to ="/" replace/>}/>


        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
