import React, { useState, useEffect } from 'react';
import API from '../services/api';
import JobCard from './JobCard';

const COLUMNS = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

export default function KanbanBoard({ onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ companyName: '', jobTitle: '', location: '', status: 'Applied' });
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get('/jobs');
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!newJob.companyName || !newJob.jobTitle) return;
    try {
      const { data } = await API.post('/jobs', newJob);
      setJobs([...jobs, data]);
      setNewJob({ companyName: '', jobTitle: '', location: '', status: 'Applied' });
    } catch (err) {
      console.error('Failed to add job', err);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const { data } = await API.put(`/jobs/${jobId}`, { status: newStatus });
      setJobs(jobs.map((j) => (j._id === jobId ? data : j)));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await API.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((j) => j._id !== jobId));
    } catch (err) {
      console.error('Failed to delete job', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 my-0">Job Application Tracker</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      {/* Add Job Form */}
      <form onSubmit={handleAddJob} className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-3 items-end border border-gray-200">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Company</label>
          <input
            type="text"
            placeholder="Google, Amazon, etc."
            value={newJob.companyName}
            onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Job Title</label>
          <input
            type="text"
            placeholder="Software Engineer"
            value={newJob.jobTitle}
            onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
          <input
            type="text"
            placeholder="Bengaluru"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded text-sm transition"
        >
          + Add Job
        </button>
      </form>

      {/* Kanban Columns */}
      {loading ? (
        <div className="text-center py-10">Loading job applications...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const colJobs = jobs.filter((j) => j.status === col);
            return (
              <div key={col} className="bg-gray-100 p-4 rounded-lg min-h-[400px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700">{col}</h3>
                  <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    {colJobs.length}
                  </span>
                </div>
                {colJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}