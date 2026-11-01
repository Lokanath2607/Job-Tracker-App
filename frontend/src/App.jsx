import React, { useState, useEffect } from 'react';
import API from './services/api';
import AddJob from './components/AddJob';
import JobCard from './components/JobCard';
import Login from './components/Login';         // Your Login component
import Register from './components/Register';   // Your Register component

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isRegistering, setIsRegistering] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Fetch user jobs whenever token changes/exists
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchJobs();
    } else {
      localStorage.removeItem('token');
      setJobs([]);
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      const response = await API.get('/jobs');
      setJobs(response.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      if (err.response?.status === 401) {
        handleLogout(); // Token expired or invalid
      }
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
  try {
    // Send PUT request to backend
    const response = await API.put(`/jobs/${id}`, { status: newStatus });
    
    // Update local React state with the returned updated job object
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === id ? response.data : job))
    );
  } catch (err) {
    console.error('Error updating status:', err);
  }
};

  // 1. IF NOT LOGGED IN: Show Login / Register Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-2xl font-bold text-center mb-6">Job Application Tracker</h1>
          
          {isRegistering ? (
            <Register setToken={setToken} switchToLogin={() => setIsRegistering(false)} />
          ) : (
            <Login setToken={setToken} switchToRegister={() => setIsRegistering(true)} />
          )}
        </div>
      </div>
    );
  }

  // 2. IF LOGGED IN: Show Full Dashboard + Add Job + Kanban Board
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-blue-400">Job Tracker Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-sm font-semibold transition"
          >
            Logout
          </button>
        </header>

        {/* Add Job Form with Upload Support */}
        <AddJob onJobAdded={handleJobAdded} />

        {/* Job Cards Display */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Your Applications</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-400">No job applications added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}