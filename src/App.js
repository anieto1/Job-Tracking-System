import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';

// Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import JobForm from './components/jobs/JobForm';
import ResumeUpload from './components/resume/ResumeUpload';

// Styles
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="app">
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/job/new" element={
                <PrivateRoute>
                  <JobForm />
                </PrivateRoute>
              } />
              <Route path="/job/edit/:id" element={
                <PrivateRoute>
                  <JobForm />
                </PrivateRoute>
              } />
              <Route path="/resume" element={
                <PrivateRoute>
                  <ResumeUpload />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App; 