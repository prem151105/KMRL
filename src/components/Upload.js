import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Upload.css';

function Upload({ user }) {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [distributing, setDistributing] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult(mockAnalysis(uploadedFile.name));
    }, 3000); // 3 seconds for demo
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

  const mockAnalysis = (filename) => {
    // Mock analysis based on filename
    const analyses = {
      'safety_bulletin.pdf': {
        summary: 'Critical safety update regarding metro rail operations requiring immediate attention from all station controllers.',
        keyPoints: [
          'Implement emergency evacuation procedures',
          'Train staff on new safety protocols',
          'Update safety documentation'
        ],
        urgency: 'High',
        departments: ['Operations', 'Safety', 'Engineering'],
        compliance: 'Regulatory deadline: 30 days',
        actionItems: ['Schedule training sessions', 'Update emergency manuals']
      },
      'maintenance_schedule.pdf': {
        summary: 'Updated rolling stock maintenance schedule affecting multiple stations.',
        keyPoints: [
          'Maintenance window: 2-4 AM daily',
          'Affecting trains 101-150',
          'Alternative routing required'
        ],
        urgency: 'Medium',
        departments: ['Engineering', 'Operations'],
        compliance: 'Operational requirement',
        actionItems: ['Notify affected stations', 'Plan alternative services']
      }
      // Add more mock data as needed
    };

    return analyses[filename] || {
      summary: 'Document uploaded successfully. Analysis complete.',
      keyPoints: ['Review content thoroughly', 'Share with relevant teams', 'Track implementation'],
      urgency: 'Low',
      departments: ['General'],
      compliance: 'No immediate requirements',
      actionItems: ['File for reference', 'Monitor for updates']
    };
  };

  const handleDistribute = () => {
    setDistributing(true);
    setTimeout(() => {
      setDistributing(false);
      alert('Document distributed successfully to selected stakeholders!');
    }, 2000);
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
          
          <button 
            className="distribute-btn" 
            onClick={handleDistribute}
            disabled={distributing}
          >
            {distributing ? 'Distributing...' : 'Distribute to Stakeholders'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;