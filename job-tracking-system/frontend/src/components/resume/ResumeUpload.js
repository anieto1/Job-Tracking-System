import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function ResumeUpload() {
  const { currentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedResumes, setUploadedResumes] = useState([]);

  // Mock function to load existing resumes from localStorage
  useEffect(() => {
    const storedResumes = localStorage.getItem(`resumes_${currentUser.id}`);
    if (storedResumes) {
      setUploadedResumes(JSON.parse(storedResumes));
    }
  }, [currentUser]);

  // Mock function to save resumes to localStorage
  const saveResumesToStorage = (resumes) => {
    localStorage.setItem(`resumes_${currentUser.id}`, JSON.stringify(resumes));
    setUploadedResumes(resumes);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Mock function to upload resume to AWS S3
  const handleUpload = (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setError('');
    setLoading(true);

    // This is a mock implementation - in a real app, you would upload to AWS S3
    setTimeout(() => {
      const newResume = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        uploadDate: new Date().toISOString(),
        fileSize: selectedFile.size,
        url: URL.createObjectURL(selectedFile) // This creates a temporary URL for the file
      };
      
      const updatedResumes = [...uploadedResumes, newResume];
      saveResumesToStorage(updatedResumes);
      
      setSelectedFile(null);
      setLoading(false);
      
      // Reset the file input
      document.getElementById('resumeInput').value = '';
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const updatedResumes = uploadedResumes.filter(resume => resume.id !== id);
      saveResumesToStorage(updatedResumes);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="resume-upload">
      <h1>Resume Management</h1>
      
      <div className="card">
        <h2 className="form-title">Upload Resume</h2>
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleUpload}>
          <div className="file-upload" onClick={() => document.getElementById('resumeInput').click()}>
            <input 
              type="file" 
              id="resumeInput" 
              className="file-input" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange}
            />
            {selectedFile ? (
              <div>Selected: {selectedFile.name}</div>
            ) : (
              <div>
                <p>Click to select or drop your resume here</p>
                <p>Supports PDF, DOC, DOCX</p>
              </div>
            )}
          </div>
          
          <button 
            disabled={loading || !selectedFile} 
            className="btn btn-block" 
            type="submit"
          >
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
      
      {uploadedResumes.length > 0 && (
        <div className="card">
          <h2 className="form-title">Your Resumes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedResumes.map((resume) => (
                <tr key={resume.id}>
                  <td>
                    <a href={resume.url} target="_blank" rel="noopener noreferrer">
                      {resume.fileName}
                    </a>
                  </td>
                  <td>{formatDate(resume.uploadDate)}</td>
                  <td>{formatFileSize(resume.fileSize)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleDelete(resume.id)}
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
      
      <div className="card">
        <h2 className="form-title">Notes</h2>
        <p>
          In the final implementation, resume uploads will be stored on AWS S3 for secure and reliable storage.
          The backend will manage the actual upload process and provide a secure URL for accessing the resumes.
        </p>
        <p>
          This demo version stores files locally for demonstration purposes only.
        </p>
      </div>
    </div>
  );
}

export default ResumeUpload; 