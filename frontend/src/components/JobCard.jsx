import React from 'react';

export default function JobCard({ job, onDelete, onStatusChange }) {
  const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mb-3 hover:border-gray-600 transition">
      {/* Header section with Title, Company name & Delete button */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-white text-base">{job.jobTitle}</h4>
          <p className="text-sm text-gray-300 font-medium">{job.companyName}</p>
        </div>
        <button
          onClick={() => onDelete(job._id)}
          className="text-red-400 hover:text-red-300 hover:bg-gray-700 text-xs font-bold px-2 py-1 rounded transition"
        >
          ✕
        </button>
      </div>

      {/* Location */}
      {job.location && (
        <p className="text-xs text-gray-400 mb-2">📍 {job.location}</p>
      )}

      {/* View Resume Link */}
      {job.resumeUrl && (
        <div className="mb-3">
          <a
            href={`http://localhost:5000${job.resumeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline text-xs inline-flex items-center gap-1 font-medium transition"
          >
            📄 View Attached Resume
          </a>
        </div>
      )}

      {/* Status Selection Dropdown */}
      <div className="mt-3">
        <select
          value={job.status}
          onChange={(e) => onStatusChange(job._id, e.target.value)}
          className="w-full text-xs p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-gray-800 text-white">
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}