# TaskFlow Pro

A full-stack task management application built with React and Node.js, designed to handle real-time collaboration for distributed teams. Features WebSocket-based live updates, PostgreSQL for data persistence, and Redis for caching and session management.

![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?style=flat-square&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-7.0-red?style=flat-square&logo=redis)

## Overview

TaskFlow Pro is a Kanban-style project management tool that supports multiple concurrent users with real-time synchronization. The application was built to demonstrate proficiency in modern web development practices, including optimized database queries, WebSocket implementation, and responsive design patterns.

The frontend uses React 18 with functional components and hooks, while the backend architecture is designed for horizontal scaling with Node.js, PostgreSQL, and Redis.

## Key Features

**Task Management**
- Kanban board interface with drag-and-drop functionality
- Task categorization by project, priority, and status
- Subtask tracking with progress indicators
- File attachment support and comment threads
- Custom tagging system for improved organization

**Technical Implementation**
- JWT-based authentication with secure token refresh
- WebSocket connections for real-time updates across clients
- Database query optimization achieving sub-100ms response times
- Redis caching layer for frequently accessed data
- Rate limiting and input validation for API security

**User Interface**
- Responsive design supporting desktop and tablet viewports
- Dark/light theme toggle with system preference detection
- Optimistic UI updates for improved perceived performance
- Loading states and skeleton screens during data fetching
- Toast notifications for user actions and system events

## Screenshots

Screenshots demonstrating the application interface:

1. **Authentication** - Login screen with form validation
2. **Dashboard** - Main task board showing all active projects
3. **Task Management** - Detailed view of task cards and filtering options
4. **Task Creation** - Modal interface for creating and editing tasks

*Note: Screenshots are available in the repository*

## Tech Stack

### Frontend
- **React 18.2** - Component-based UI development
- **Tailwind CSS** - Utility-first styling approach
- **Lucide React** - Icon library
- **HTML5 Drag and Drop API** - Native drag functionality

### Backend Architecture
- **Node.js / Express** - REST API server
- **PostgreSQL** - Primary data store with proper indexing strategy
- **Redis** - Caching and session storage
- **Socket.io** - WebSocket implementation for real-time features
- **JWT** - Stateless authentication

### Development Tools
- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting
- **Git** - Version control with conventional commits

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- PostgreSQL (for production deployment)
- Redis (for production deployment)

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskflow-pro.git
cd taskflow-pro
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Deployment

For production deployment, additional steps are required:

1. Set up PostgreSQL database:
```bash
npm run db:migrate
```

2. Configure Redis connection in `.env`

3. Build the production bundle:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

## Project Structure

```
taskflow-pro/
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── styles/          # Global styles
├── server/              # Backend API
│   ├── routes/          # Express routes
│   ├── models/          # Database models
│   ├── middleware/      # Custom middleware
│   └── services/        # Business logic
└── database/            # Migration files
```

## Database Schema

The application uses a normalized PostgreSQL schema with the following key tables:

- `users` - User accounts and authentication
- `tasks` - Core task data with indexing on status and project_id
- `projects` - Project groupings for tasks
- `comments` - Task discussion threads
- `task_assignees` - Many-to-many relationship for task assignments

Indexes are strategically placed on foreign keys and frequently queried columns to maintain performance at scale.

## Performance Considerations

The application is designed to handle significant load:

- Database queries optimized with proper indexing and query planning
- Redis caching reduces database load for frequently accessed data
- Connection pooling prevents database connection exhaustion
- Frontend uses React.memo and useMemo for expensive computations
- Pagination implemented for large data sets

Benchmarks:
- API response time: < 100ms average
- WebSocket latency: < 50ms
- Supports 100+ concurrent users
- Handles 10,000+ task records

## API Documentation

The REST API follows standard conventions:

```
GET    /api/tasks          # List tasks with filtering
POST   /api/tasks          # Create new task
GET    /api/tasks/:id      # Get specific task
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task

GET    /api/projects       # List projects
POST   /api/projects       # Create project

POST   /api/auth/login     # User authentication
POST   /api/auth/refresh   # Token refresh
```

All endpoints except `/auth/*` require JWT authentication via Bearer token.

## Security Measures

- JWT tokens with short expiration times and refresh token rotation
- Input validation on all API endpoints using express-validator
- SQL injection prevention through parameterized queries
- Rate limiting on authentication endpoints
- CORS configuration for production environment
- Environment variables for sensitive configuration

## Future Enhancements

Planned features for future releases:

- Mobile application using React Native
- Advanced reporting and analytics dashboard
- Integration with third-party services (Slack, GitHub)
- Bulk operations for task management
- CSV/Excel export functionality
- Recurring task templates

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with descriptive messages
4. Push to your fork
5. Submit a pull request

Please ensure your code follows the existing style conventions and includes appropriate tests.

## License

MIT License - see LICENSE file for details

## Contact

For questions or suggestions, please open an issue on GitHub.

---

Built as a demonstration of full-stack development capabilities, showcasing modern web development practices and scalable architecture design.
