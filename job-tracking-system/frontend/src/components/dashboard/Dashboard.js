import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../contexts/JobContext';
import JobStatusBadge from '../jobs/JobStatusBadge';

function Dashboard() {
  const { jobs, deleteJob } = useJobs();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJob(id);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Job Applications</h1>
        <Link to="/job/new" className="btn add-button">
          Add New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="card">
          <p>You haven't added any job applications yet.</p>
          <Link to="/job/new" className="btn">
            Add Your First Job
          </Link>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.company}</td>
                  <td>{job.position}</td>
                  <td>{formatDate(job.dateApplied)}</td>
                  <td>
                    <JobStatusBadge status={job.status} />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/job/edit/${job.id}`}
                        className="action-button edit-button"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="action-button delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 