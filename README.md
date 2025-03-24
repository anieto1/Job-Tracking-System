# Job Tracking System

This is a full-stack job tracking application with:
- React frontend
- Spring Boot backend

## Features

- User Registration & Login (Authentication)
- Job Application Dashboard
- Add/Edit/Delete Job Applications
- Resume Upload (with AWS S3 integration)
- Email Notifications for Follow-Ups (AWS SES integration)

## Tech Stack

- **Frontend**: React.js
- **Backend**: Spring Boot
- **Storage**: AWS S3 for resume storage
- **Notifications**: AWS SES for email reminders

## Project Structure

```
job-tracking-system/
├── package.json                # Workspace manager
├── job-tracking-system/        # Main project directory
│   ├── frontend/               # React frontend
│   │   ├── package.json        # Frontend dependencies
│   │   ├── tsconfig.json       # TypeScript config
│   │   ├── src/                # Frontend source code
│   │   └── public/             # Static files
│   ├── backend/                # Spring Boot backend
│   │   └── src/                # Backend source code
│   └── pom.xml                 # Maven configuration
```

## Getting Started

### Install dependencies

```bash
# Install workspace and frontend dependencies
npm install
```

### Run the application

```bash
# Run frontend only
npm run frontend

# Run backend only
npm run backend

# Run both frontend and backend
npm run dev
```

### Build for production

```bash
# Build frontend
npm run frontend:build

# Build backend
npm run backend:build
```

## Backend

The backend is a Spring Boot application using:
- Spring Data JPA for data access
- REST APIs for communication with frontend

## Frontend

The frontend is a React application using:
- TypeScript
- React Router for navigation
- Axios for API calls
- Formik and Yup for form handling

## License

MIT 
