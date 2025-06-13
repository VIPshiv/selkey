import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_BASE_URL = 'http://localhost:3000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Make sure your API server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setError('');
      return true;
    } catch (err) {
      setError('Failed to add task');
      return false;
    }
  };

  const updateTask = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setError('');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle">Organize your tasks efficiently</p>
        </header>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-btn">×</button>
          </div>
        )}
        
        <div className="main-content">
          <div className="form-section">
            <TaskForm onAddTask={addTask} />
          </div>
          
          <div className="tasks-section">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading tasks...</p>
              </div>
            ) : (
              <TaskList 
                tasks={tasks} 
                onUpdateTask={updateTask} 
                onDeleteTask={deleteTask} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
