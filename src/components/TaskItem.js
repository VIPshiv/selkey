import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, statusColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(task.status);

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    setNewStatus(status);
    await onUpdateTask(task.id, status);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'inprogress': return '🔄';
      case 'completed': return '✅';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="task-item" style={{ borderLeftColor: statusColor }}>
      <div className="task-header">
        <div className="task-status-icon">
          {getStatusIcon(task.status)}
        </div>
        <div className="task-actions">
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
            title="Change Status"
          >
            ✏️
          </button>
          <button 
            className="delete-btn"
            onClick={handleDelete}
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="task-content">
        <h4 className="task-title">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        
        <div className="task-meta">
          <span className="task-id">ID: {task.id}</span>
          {task.createdAt && (
            <span className="task-date">
              Created: {formatDate(task.createdAt)}
            </span>
          )}
        </div>

        {isEditing && (
          <div className="status-editor">
            <label htmlFor={`status-${task.id}`}>Change Status:</label>            <select
              id={`status-${task.id}`}
              value={newStatus}
              onChange={handleStatusChange}
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
