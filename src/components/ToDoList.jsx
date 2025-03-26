import React, { useState } from 'react';
import '../styles/ToDoList.css'

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editMode, setEditMode] = useState(0);
  const [editindex, setEditIndex] = useState(null);

  function handleChanges(event) {
    setTask(event.target.value);
  }

  function addTask() {
    if (task.trim() === '') {
      alert('Please enter a task!');
      return;
    }
    if (editindex !== null) {
      tasks[editindex].text = task;
      setEditIndex(null);
      setEditMode(0);
    }
    else {
      setTasks([...tasks, { text: task, Completed: false }]);
    }

    setTask('');
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    setEditMode(1);
    setTask(tasks[index].text);
    setEditIndex(index);
  }

  function moveUp(index) {
    if (index > 0) {
      [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
      setTasks([...tasks]);
    }
    else {
      alert('Cannot move up!');
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
      setTasks([...tasks]);
    }
    else {
      alert('Cannot move down!');
    }
  }

  function deleteAllTasks() {
    setTasks([]);
  }

  function toggleCompleted(index) {
    tasks[index].Completed = !tasks[index].Completed;
    setTasks([...tasks]);
  }

  return (
    <div className='container'>
      <h1>To-Do-List</h1>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Enter a Task...'
          value={task}
          onChange={handleChanges}
        />
        {editMode === 1 ? <button className='btn' onClick={addTask}>Update Task</button> : <button className='btn' onClick={addTask}>Add Task</button>}
      </div>

      {tasks.length === 0 ? <h3>No Task Added!</h3> : <h5>Click a Task to mark it as completed.</h5>}

      <ol>
        {tasks.map((item, index) => (
          <li key={index} style={{ backgroundColor: item.Completed ? '#99d7a8' : '#4A90E2' }}>
            <span className="task-content" onClick={() => { toggleCompleted(index) }} style={{ cursor: 'pointer' }}>{item.text}{item.Completed ? '✅' : null} </span>
            <div className="task-actions">
              <button onClick={() => editTask(index)}>✏️</button>
              <button onClick={() => moveUp(index)}>🔼</button>
              <button onClick={() => moveDown(index)}>🔽</button>
              <button onClick={() => deleteTask(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ol>

      {tasks.length > 1 && <button className='btn' onClick={deleteAllTasks}>Delete All</button>}
    </div>
  )
}

export default ToDoList;