import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {  const tasksByStatus = {
    pending: tasks.filter(task => task.status === 'pending'),
    inprogress: tasks.filter(task => task.status === 'inprogress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  const statusColors = {
    pending: '#ff6b6b',
    inprogress: '#4ecdc4',
    completed: '#45b7d1'
  };

  const statusLabels = {
    pending: 'Pending',
    inprogress: 'In Progress',
    completed: 'Completed'
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2 className="list-title">Your Tasks ({tasks.length})</h2>
      
      <div className="task-columns">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="task-column">
            <div className="column-header" style={{ borderColor: statusColors[status] }}>
              <h3 className="column-title">
                {statusLabels[status]}
                <span className="task-count">({statusTasks.length})</span>
              </h3>
            </div>
            
            <div className="task-items">
              {statusTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                  statusColor={statusColors[status]}
                />
              ))}
              {statusTasks.length === 0 && (
                <div className="empty-column">
                  <p>No {statusLabels[status].toLowerCase()} tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
