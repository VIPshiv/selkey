const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory task storage - Task Controller functionality
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }

    addTask(title, description, status) {
        const newTask = {
            id: this.currentId++,
            title,
            description,
            status,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    getAllTasks() {
        return this.tasks;
    }

    updateTask(id, status) {
        const taskId = parseInt(id);
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.status = status;
            task.updatedAt = new Date().toISOString();
            return task;
        }
        return null;
    }

    deleteTask(id) {
        const taskId = parseInt(id);
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            return this.tasks.splice(index, 1)[0];
        }
        return null;
    }

    getTaskById(id) {
        const taskId = parseInt(id);
        return this.tasks.find(task => task.id === taskId);
    }
}

// Create task manager instance
const taskManager = new TaskManager();

// Middleware
app.use(cors({
    origin: ['http://localhost:3001'], // Allow frontend on port 3001
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// API Routes
// Create a new task
app.post('/api/tasks', (req, res) => {
    try {
        const { title, description, status } = req.body;
          if (!title || !description || !status) {
            return res.status(400).json({ 
                error: 'All fields are required: title, description, and status' 
            });
        }

        // Validate status
        const validStatuses = ['pending', 'inprogress', 'completed'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ 
                error: 'Status must be one of: pending, inprogress, completed' 
            });
        }
        
        const task = taskManager.addTask(title, description, status);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    try {
        const tasks = taskManager.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific task by ID
app.get('/api/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const task = taskManager.getTaskById(id);
        
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
          if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        // Validate status
        const validStatuses = ['pending', 'inprogress', 'completed'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ 
                error: 'Status must be one of: pending, inprogress, completed' 
            });
        }
        
        const updatedTask = taskManager.updateTask(id, status);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = taskManager.deleteTask(id);
        
        if (deletedTask) {
            res.status(200).json({ 
                message: 'Task deleted successfully', 
                task: deletedTask 
            });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Task Manager API is running',
        timestamp: new Date().toISOString(),
        totalTasks: taskManager.getAllTasks().length
    });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Task Manager API Server is running on port ${PORT}`);
    console.log(`📋 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📝 Tasks Endpoint: http://localhost:${PORT}/api/tasks`);
    console.log(`🌐 CORS enabled for: http://localhost:3001`);
});

module.exports = app;
