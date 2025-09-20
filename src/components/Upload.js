import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Upload.css';

function Upload({ user }) {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [distributing, setDistributing] = useState(false);
  const [docId, setDocId] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setAnalyzing(true);
    setAnalysisResult(null);

    // Upload to backend and get summary
    const formData = new FormData();
    formData.append('file', uploadedFile);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setAnalyzing(false);
      setDocId(data.id);
      setAnalysisResult({
        summary: data.summary,
        keyPoints: ['Document processed successfully'],
        urgency: 'Medium',
        departments: ['General'],
        compliance: 'N/A',
        actionItems: ['Review summary']
      });
    })
    .catch(error => {
      setAnalyzing(false);
      console.error('Upload failed:', error);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: false
  });



  const handleDistribute = () => {
    if (!email || !docId) {
      alert('Please enter email and ensure document is uploaded.');
      return;
    }
    setDistributing(true);

    fetch('http://localhost:8000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        document_id: docId,
        recipient: email,
        message: message || 'Please review the attached document and summary.'
      })
    })
    .then(response => response.json())
    .then(data => {
      setDistributing(false);
      alert(`Email sent: ${data.status}`);
    })
    .catch(error => {
      setDistributing(false);
      console.error('Send failed:', error);
      alert('Failed to send email.');
    });
  };

  return (
    <div className="upload">
      <h2>Document Upload & Analysis</h2>
      
      {!file && (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <h3>Drag & drop a document here</h3>
            <p>or click to select a file</p>
            <p>Supported formats: PDF, DOCX, DOC, PNG, JPG, JPEG</p>
          </div>
        </div>
      )}

      {file && (
        <div className="file-info">
          <h3>Uploaded File: {file.name}</h3>
          <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      {analyzing && (
        <div className="analyzing">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>Analyzing document with AI...</p>
        </div>
      )}

      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Results</h3>
          <div className="result-section">
            <h4>Executive Summary</h4>
            <p>{analysisResult.summary}</p>
          </div>
          
          <div className="result-section">
            <h4>Key Points</h4>
            <ul>
              {analysisResult.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="result-meta">
            <span className={`urgency ${analysisResult.urgency.toLowerCase()}`}>
              Urgency: {analysisResult.urgency}
            </span>
            <span>Departments: {analysisResult.departments.join(', ')}</span>
            <span>Compliance: {analysisResult.compliance}</span>
          </div>
          
          <div className="result-section">
            <h4>Action Items</h4>
            <ul>
              {analysisResult.actionItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="email-section">
            <h4>Send to Department</h4>
            <input
              type="email"
              placeholder="Department email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Custom message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            className="distribute-btn"
            onClick={handleDistribute}
            disabled={distributing}
          >
            {distributing ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;