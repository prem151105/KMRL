import React, { useState } from 'react';
import './Library.css';

function Library({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  // Mock document data
  const mockDocuments = [
    {
      id: 1,
      name: 'Safety Bulletin - Emergency Procedures.pdf',
      uploadDate: '2025-01-15',
      urgency: 'High',
      departments: ['Operations', 'Safety'],
      summary: 'Critical safety update regarding metro rail operations requiring immediate attention.',
      status: 'Distributed'
    },
    {
      id: 2,
      name: 'Maintenance Schedule Update.pdf',
      uploadDate: '2025-01-14',
      urgency: 'Medium',
      departments: ['Engineering', 'Operations'],
      summary: 'Updated rolling stock maintenance schedule affecting multiple stations.',
      status: 'Distributed'
    },
    {
      id: 3,
      name: 'Vendor Invoice - Station Equipment.pdf',
      uploadDate: '2025-01-13',
      urgency: 'Low',
      departments: ['Finance', 'Procurement'],
      summary: 'Invoice for new station equipment requiring approval and payment processing.',
      status: 'Pending Review'
    },
    {
      id: 4,
      name: 'HR Policy Update - Leave Guidelines.pdf',
      uploadDate: '2025-01-12',
      urgency: 'Low',
      departments: ['HR', 'Operations'],
      summary: 'Updated leave policy guidelines for all employees effective immediately.',
      status: 'Distributed'
    },
    {
      id: 5,
      name: 'Engineering Drawing Revision.pdf',
      uploadDate: '2025-01-11',
      urgency: 'Medium',
      departments: ['Engineering', 'Safety'],
      summary: 'Revised engineering drawings for platform modifications with safety implications.',
      status: 'Distributed'
    }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = filterUrgency === '' || doc.urgency === filterUrgency;
    const matchesDepartment = filterDepartment === '' || doc.departments.includes(filterDepartment);
    return matchesSearch && matchesUrgency && matchesDepartment;
  });

  const departments = [...new Set(mockDocuments.flatMap(doc => doc.departments))];

  return (
    <div className="library">
      <h2>Document Library</h2>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={filterUrgency}
          onChange={(e) => setFilterUrgency(e.target.value)}
          className="filter-select"
        >
          <option value="">All Urgencies</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="filter-select"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      
      <div className="document-list">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="document-card">
            <div className="document-header">
              <h3>{doc.name}</h3>
              <span className={`urgency-badge ${doc.urgency.toLowerCase()}`}>
                {doc.urgency}
              </span>
            </div>
            <p className="upload-date">Uploaded: {doc.uploadDate}</p>
            <p className="departments">Departments: {doc.departments.join(', ')}</p>
            <p className="summary">{doc.summary}</p>
            <div className="document-actions">
              <button className="preview-btn">Quick Preview</button>
              <button className="download-btn">Download</button>
              <span className={`status ${doc.status.toLowerCase().replace(' ', '-')}`}>
                {doc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredDocuments.length === 0 && (
        <p className="no-results">No documents match your search criteria.</p>
      )}
    </div>
  );
}

export default Library;