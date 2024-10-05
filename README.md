Project Management System with Stepwise Tracking
Overview
This project is a Project Management System where team managers can assign projects, team members can update progress, and managers can track progress and review each step in real-time. The system implements Role-Based Access Control (RBAC) for Admin, Manager, and Team Members.

Features
Admin:
Create teams and assign projects.
Manage users, projects, and steps.
Assign roles to users (Admin, Manager, Team Member).
Manager:
Create and assign projects to team members.
Assign members to specific steps or the entire project.
Review progress for each step and approve or request revisions.
Filter projects by step, team members, and progress.
View detailed time-tracking and project performance.
Team Member:
View assigned projects and steps.
Update progress (completion percentage, time spent, comments).
Mark steps as completed and notify the manager for review.
Time Tracking:
Automatically track the time taken for each step.
Team members can manually log time if needed.
Managers can view a summary of time spent by each member and step.
Notifications:
Notify team members when new projects are assigned.
Notify managers when steps are marked as completed and ready for review.
Reports:
Generate reports on project progress, including time spent per step, per project, and per team member.
Export reports as PDF or CSV.
Dashboard (Advanced):
View high-level metrics such as ongoing projects, pending reviews, and team performance.

project-management-system/
├── backend/
│   ├── config/                   # Database configuration
│   ├── controllers/              # Logic for authentication, projects
│   ├── middleware/               # Authentication and role-based access control
│   ├── models/                   # Database models for User, Project, Step, etc.
│   ├── routes/                   # API endpoints for authentication and projects
│   ├── services/                 # Business logic for authentication, projects
│   ├── socket/                   # Real-time communication setup (Socket.io)
│   ├── utils/                    # Utility functions (e.g., CSV export)
│   └── server.js                 # Backend entry point
│
├── frontend/
│   ├── public/                   # Static assets like HTML and favicon
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── context/              # Context API for global state management
│   │   ├── hooks/                # Custom hooks for API calls and state management
│   │   ├── pages/                # Main pages of the application
│   │   ├── services/             # API service calls to backend
│   │   ├── utils/                # Utility functions
│   │   ├── App.js                # Main React component
│   │   └── index.js              # Frontend entry point
└── README.md                     # Documentation
Clone the repository:
git clone <repo-url>
cd project-management-system/backend
Install dependencies:
npm install
Run the backend/frontend
npm start
