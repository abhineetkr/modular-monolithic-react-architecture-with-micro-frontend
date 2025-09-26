import React, { useState } from "react";
import { useAppState } from "../../shared/src/hooks/useAppState";

const AuthApp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAppState();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        fullName: `${formData.username} User`,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username)}&background=007bff&color=fff`
      };

      login(userData);
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#007bff', margin: '0 0 0.5rem 0' }}>Welcome Back</h2>
          <p style={{ color: '#6c757d', margin: '0' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.username ? '#dc3545' : '#ced4da'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your username"
            />
            {errors.username && (
              <small style={{ color: '#dc3545', fontSize: '0.875rem' }}>
                {errors.username}
              </small>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.email ? '#dc3545' : '#ced4da'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <small style={{ color: '#dc3545', fontSize: '0.875rem' }}>
                {errors.email}
              </small>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.password ? '#dc3545' : '#ced4da'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <small style={{ color: '#dc3545', fontSize: '0.875rem' }}>
                {errors.password}
              </small>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isLoading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#6c757d'
        }}>
          Demo App - Any credentials work
        </div>
      </div>
    </div>
  );
};

export default AuthApp;