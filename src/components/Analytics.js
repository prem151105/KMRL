import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import './Analytics.css';

function Analytics({ user }) {
  // Mock analytics data
  const documentsData = [
    { period: 'Today', processed: 12, highPriority: 3 },
    { period: 'This Week', processed: 85, highPriority: 15 },
    { period: 'This Month', processed: 320, highPriority: 45 }
  ];

  const departmentData = [
    { name: 'Operations', documents: 120, color: '#4a90e2' },
    { name: 'Engineering', documents: 95, color: '#00a651' },
    { name: 'Safety', documents: 75, color: '#ffaa00' },
    { name: 'Finance', documents: 60, color: '#ff4444' },
    { name: 'HR', documents: 40, color: '#9b59b6' },
    { name: 'Procurement', documents: 35, color: '#e67e22' }
  ];

  const complianceData = [
    { month: 'Jan', onTime: 95, delayed: 5 },
    { month: 'Feb', onTime: 98, delayed: 2 },
    { month: 'Mar', onTime: 92, delayed: 8 },
    { month: 'Apr', onTime: 96, delayed: 4 },
    { month: 'May', onTime: 99, delayed: 1 },
    { month: 'Jun', onTime: 97, delayed: 3 }
  ];

  const processingTimeData = [
    { time: '00:00', avgTime: 2.1 },
    { time: '04:00', avgTime: 1.8 },
    { time: '08:00', avgTime: 2.5 },
    { time: '12:00', avgTime: 3.2 },
    { time: '16:00', avgTime: 2.8 },
    { time: '20:00', avgTime: 2.3 }
  ];

  const alerts = [
    { id: 1, type: 'Compliance', message: 'Safety audit due in 3 days', priority: 'High' },
    { id: 2, type: 'Deadline', message: 'Vendor contract expires tomorrow', priority: 'Medium' },
    { id: 3, type: 'Review', message: 'Monthly report pending approval', priority: 'Low' }
  ];

  return (
    <div className="analytics">
      <h2>Analytics Dashboard</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Documents Processed</h3>
          <div className="metric-value">320</div>
          <p className="metric-change">+15% from last month</p>
        </div>
        
        <div className="metric-card">
          <h3>High Priority Items</h3>
          <div className="metric-value">45</div>
          <p className="metric-change">12 requiring immediate attention</p>
        </div>
        
        <div className="metric-card">
          <h3>Average Processing Time</h3>
          <div className="metric-value">2.3s</div>
          <p className="metric-change">-0.5s from last week</p>
        </div>
        
        <div className="metric-card">
          <h3>Compliance Rate</h3>
          <div className="metric-value">97%</div>
          <p className="metric-change">+2% from last month</p>
        </div>
      </div>
      
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Documents Processed</h3>
          <BarChart width={400} height={300} data={documentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="processed" fill="#4a90e2" name="Total Processed" />
            <Bar dataKey="highPriority" fill="#ff4444" name="High Priority" />
          </BarChart>
        </div>
        
        <div className="chart-container">
          <h3>Distribution by Department</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={departmentData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="documents"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        
        <div className="chart-container">
          <h3>Compliance Performance</h3>
          <LineChart width={400} height={300} data={complianceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="onTime" stroke="#00a651" name="On Time %" />
            <Line type="monotone" dataKey="delayed" stroke="#ff4444" name="Delayed %" />
          </LineChart>
        </div>
        
        <div className="chart-container">
          <h3>Processing Time Trends</h3>
          <LineChart width={400} height={300} data={processingTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avgTime" stroke="#4a90e2" name="Avg Time (seconds)" />
          </LineChart>
        </div>
      </div>
      
      <div className="alerts-section">
        <h3>Active Alerts</h3>
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.priority.toLowerCase()}`}>
              <div className="alert-header">
                <span className="alert-type">{alert.type}</span>
                <span className={`alert-priority ${alert.priority.toLowerCase()}`}>
                  {alert.priority}
                </span>
              </div>
              <p className="alert-message">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;