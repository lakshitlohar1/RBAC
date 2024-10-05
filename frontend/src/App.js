import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ManagerDashboard from './pages/ManagerDashboard';
import TeamMemberDashboard from './pages/TeamMemberDashboard';
import { getCurrentUser } from './services/authService'; // Import the function to get the current user

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/" />;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      setLoading(false); // Set loading to false after checking user authentication
    };
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/manager-dashboard"
          element={
            <PrivateRoute>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/team-dashboard"
          element={
            <PrivateRoute>
              <TeamMemberDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
