# KMRL Intelligent Document Management Platform

A React-based demo application for KMRL's intelligent document processing system that transforms document management challenges into actionable intelligence.

## Features

### Authentication System
- Admin and Controller login roles
- Secure access with professional KMRL branding

### Document Upload & AI Analysis
- Drag-and-drop file upload interface
- Support for PDF, DOCX, DOC, PNG, JPG, JPEG formats
- Simulated AI analysis using Gemini API (mocked for demo)
- Real-time processing with progress indicators

### Intelligent Analysis Results
- Executive summaries highlighting business impact
- Key points extraction (5-7 critical items)
- Urgency classification (High/Medium/Low)
- Department relevance identification
- Compliance tracking with deadlines
- Action items for next steps

### Smart Distribution System
- Pre-configured stakeholder database
- Auto-recommendation engine for recipients
- One-click distribution to relevant departments
- Delivery confirmation tracking

### Document Library & Search
- Searchable document repository
- Advanced filtering by date, department, urgency
- Quick preview of summaries
- Status tracking (Distributed/Pending)

### Analytics Dashboard
- Document processing metrics
- Department distribution statistics
- Compliance performance charts
- Processing time analytics
- Active alerts and notifications

## Demo Flow (5-minute presentation)

1. **Login** (5 seconds) - Enter 'admin' or 'controller' with password 'demo'
2. **Upload Document** (10 seconds) - Drag and drop a sample file
3. **AI Analysis** (15 seconds) - Watch real-time processing
4. **Review Results** (30 seconds) - Examine summary and recommendations
5. **Distribute** (10 seconds) - Send to stakeholders
6. **Library View** (20 seconds) - Browse searchable repository
7. **Dashboard** (30 seconds) - Review key metrics and alerts

## Technology Stack

- **Frontend**: React 18 with Hooks
- **UI Framework**: Material-UI (MUI)
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **Styling**: CSS Modules with KMRL brand colors
- **State Management**: React useState/useEffect

## Installation & Setup

1. Ensure Node.js (v16+) and npm are installed
2. Clone or navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Sample Documents for Demo

The application includes mock analysis for these sample files:
- `safety_bulletin.pdf` - Emergency procedures update
- `maintenance_schedule.pdf` - Rolling stock maintenance
- Vendor invoices, HR policies, engineering drawings, etc.

## KMRL Brand Colors

- Primary Blue: #003366
- Light Blue: #4a90e2
- Green: #00a651
- Gray: #f5f5f5
- Dark Gray: #333333

## Key Demo Highlights

- **Time Savings**: Reduced review time from hours to minutes
- **Improved Coordination**: Zero missed regulatory deadlines
- **Knowledge Retention**: 100% searchable document access
- **Compliance Enhancement**: Automated regulatory tracking
- **Cost Reduction**: Eliminated redundant summaries

## Project Structure

```
kmrl-document-management/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js/css
│   │   ├── Dashboard.js/css
│   │   ├── Upload.js/css
│   │   ├── Library.js/css
│   │   └── Analytics.js/css
│   ├── App.js/css
│   └── index.js/css
├── package.json
└── README.md
```

## Future Enhancements

- Real Gemini API integration
- Backend database for document storage
- Email service integration
- Multi-language OCR support
- Advanced user permissions
- Mobile app version

## Contact

This demo showcases the potential of AI-powered document management for government and enterprise environments, specifically tailored for KMRL's operational needs.