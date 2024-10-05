import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import the useAuth hook 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Use the custom hook

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const data = await loginUser({ username, password });
      if (data) {
        navigate('/manager-dashboard'); // Redirect on successful login
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="form-group mb-4">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 mb-3"
          >
            Login
          </button>
        </form>
        {error && <p className="text-danger text-center">{error}</p>}
        <p className="text-center">
          <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
