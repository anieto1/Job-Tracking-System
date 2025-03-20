import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../../contexts/JobContext';

function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addJob, updateJob, getJob } = useJobs();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    dateApplied: new Date().toISOString().substr(0, 10), // Format: YYYY-MM-DD
    status: 'Applied'
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const job = getJob(id);
      if (job) {
        setFormData({
          company: job.company,
          position: job.position,
          dateApplied: job.dateApplied ? new Date(job.dateApplied).toISOString().substr(0, 10) : '',
          status: job.status
        });
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, getJob, navigate, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      if (isEditMode) {
        updateJob(id, formData);
      } else {
        addJob(formData);
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save job application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2 className="form-title">{isEditMode ? 'Edit Job Application' : 'Add New Job Application'}</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="company"
              className="form-input"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="position"
              className="form-input"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date Applied</label>
            <input
              type="date"
              name="dateApplied"
              className="form-input"
              value={formData.dateApplied}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-input"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <button disabled={loading} className="btn btn-block" type="submit">
              {loading ? 'Saving...' : isEditMode ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm; 