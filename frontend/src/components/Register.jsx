import React, { useState } from 'react';
import API from '../services/api';

export default function Register({ setToken, switchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await API.post('/auth/register', formData);
      setToken(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">Register</h2>
      {error && <div className="p-2 bg-red-600 text-white rounded text-sm">{error}</div>}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded transition"
      >
        Create Account
      </button>
      <p className="text-xs text-gray-400 text-center mt-3">
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-400 underline hover:text-blue-300"
        >
          Login here
        </button>
      </p>
    </form>
  );
}