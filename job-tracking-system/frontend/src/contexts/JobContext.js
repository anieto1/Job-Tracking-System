import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const JobContext = createContext();

export function useJobs() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load jobs from localStorage on initial render
  useEffect(() => {
    if (currentUser) {
      const storedJobs = localStorage.getItem('jobs');
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      }
    }
    setLoading(false);
  }, [currentUser]);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs, currentUser]);

  // Add a new job
  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setJobs([...jobs, newJob]);
    return newJob;
  };

  // Update an existing job
  const updateJob = (id, updatedJob) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, ...updatedJob, updatedAt: new Date().toISOString() } : job
    );
    setJobs(updatedJobs);
  };

  // Delete a job
  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  // Get a job by ID
  const getJob = (id) => {
    return jobs.find(job => job.id === id);
  };

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJob,
    loading
  };

  return (
    <JobContext.Provider value={value}>
      {!loading && children}
    </JobContext.Provider>
  );
} 