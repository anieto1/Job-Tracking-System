y# Job Tracking System

A modern web application to help job seekers track their job applications, manage resumes, and receive follow-up reminders.

## Features

- User Registration & Login (Authentication)
- Job Application Dashboard
- Add/Edit/Delete Job Applications
- Resume Upload (with AWS S3 integration)
- Email Notifications for Follow-Ups (AWS SES integration)

## Tech Stack

- **Frontend**: React.js
- **Backend**: To be implemented (placeholder for API integration)
- **Storage**: AWS S3 for resume storage
- **Notifications**: AWS SES for email reminders

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/job-tracking-system.git
cd job-tracking-system
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── Auth/           # Authentication components
  │   ├── Dashboard/      # Dashboard components
  │   ├── Jobs/           # Job-related components
  │   └── Resume/         # Resume-related components
  ├── contexts/           # React contexts for state management
  ├── styles/             # CSS styles
  ├── App.js              # Main App component
  └── index.js            # Entry point
```

## Backend Implementation (Future)

The current implementation uses mock data stored in localStorage. For a production environment, you would need to implement:

1. A backend API (using Node.js/Express, Django, Rails, etc.)
2. Database integration (MongoDB, PostgreSQL, etc.)
3. AWS S3 integration for resume storage
4. AWS SES integration for email notifications

## License

MIT 
>>>>>>> 21b2209 (Front end template setup)
