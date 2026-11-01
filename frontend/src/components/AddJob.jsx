import React, { useState } from 'react';
import API from '../services/api';

export default function AddJob({ onJobAdded }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    location: '',
    status: 'Applied',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState(''); // <-- Added error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (resumeFile) {
      data.append('resume', resumeFile);
    }

    try {
      const response = await API.post('/jobs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onJobAdded(response.data);
      // Reset form
      setFormData({ companyName: '', jobTitle: '', location: '', status: 'Applied' });
      setResumeFile(null);
    } catch (err) {
      console.error('Error adding job:', err);
      // Show error message on screen
      setError(err.response?.data?.error || 'Failed to add job. Check if you are logged in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded shadow-md mb-6 space-y-4">
      <h3 className="text-white font-semibold text-lg mb-2">Add New Job Application</h3>
      
      {/* Display error message if any */}
      {error && (
        <div className="bg-red-500 text-white text-sm p-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="p-1 rounded bg-gray-700 text-white text-sm"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-medium">
        + Add Job
      </button>
    </form>
  );
}