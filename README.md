# Task Manager - Full Stack in One Folder

A complete task management application with both frontend (React) and backend (Express.js) in a single folder structure.

## Features

- ✅ Create, read, update, and delete tasks
- 🎯 Task status management (Todo, In Progress, Completed)
- 🚀 Modern React frontend with beautiful UI
- 📡 Express.js REST API backend
- 💾 In-memory data storage (no database required)
- 🔄 Real-time updates between frontend and backend

## Project Structure

```
task-manager-frontend/
├── server.js              # Complete backend API server
├── package.json           # Dependencies for both frontend and backend
├── public/                # Static files
├── src/                   # React frontend source
│   ├── App.js            # Main React component
│   ├── components/       # React components
│   └── ...
└── README.md             # This file
```

## Installation

1. Navigate to the project folder:
```bash
cd task-manager-frontend
```

2. Install all dependencies (frontend + backend):
```bash
npm install
```

## Running the Application

### Option 1: Run Both Frontend and Backend Separately

1. **Start the backend server** (in one terminal):
```bash
npm run server
```
Backend will run on: http://localhost:3000

2. **Start the frontend** (in another terminal):
```bash
npm start
```
Frontend will run on: http://localhost:3001

### Option 2: Development Mode with Auto-restart

1. **Start the backend in dev mode** (in one terminal):
```bash
npm run dev
```

2. **Start the frontend** (in another terminal):
```bash
npm start
```

## API Endpoints

The backend server (`server.js`) provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task status
- `DELETE /api/tasks/:id` - Delete a task

## Task Object Structure

```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "Task description",
  "status": "todo",
  "createdAt": "2025-06-13T10:30:00.000Z",
  "updatedAt": "2025-06-13T10:35:00.000Z"
}
```

## Valid Task Statuses

- `todo` - Task is pending
- `inprogress` - Task is being worked on
- `completed` - Task is finished

## Architecture

### Frontend (React)
- **App.js**: Main application component with state management
- **TaskForm**: Component for creating new tasks
- **TaskList**: Component for displaying task list
- **TaskItem**: Individual task component with actions

### Backend (Express.js)
- **TaskManager Class**: Handles all CRUD operations
- **REST API Routes**: Standard RESTful endpoints
- **CORS Configuration**: Allows frontend-backend communication
- **Error Handling**: Comprehensive error handling and validation

## Data Storage

Currently uses in-memory storage (JavaScript array). Data will be lost when the server restarts. 

To add persistent storage, you can:
1. Add database integration (MongoDB, PostgreSQL, etc.)
2. Use file-based storage (JSON files)
3. Add cloud database services

## Development Notes

- Frontend runs on port 3001
- Backend runs on port 3000
- CORS is configured to allow communication between the two
- Hot reloading enabled for both frontend and backend in dev mode
- All backend functionality is consolidated in `server.js`

## Troubleshooting

1. **Port conflicts**: Change ports in `server.js` and `App.js` if needed
2. **CORS errors**: Ensure backend CORS origin matches frontend URL
3. **Module not found**: Run `npm install` to install dependencies
4. **Connection refused**: Make sure backend server is running before accessing frontend

## Next Steps

- Add user authentication
- Implement data persistence with a database
- Add task categories and tags
- Implement task deadlines and reminders
- Add task priority levels
- Deploy to cloud services
