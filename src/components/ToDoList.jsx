import React, { useState } from 'react';
import '../styles/ToDoList.css'

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [flag, setFlag] = useState(0);
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
            [tasks[editindex]] = [task];
            setEditIndex(null);
            setFlag(0);
        }
        else {
            setTasks([...tasks, task]);
        }

        setTask('');
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    }

    function editTask(index) {
        setFlag(1);
        setTask(tasks[index]);
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
                {flag === 1 ? <button className='btn' onClick={addTask}>Update Task</button> : <button className='btn' onClick={addTask}>Add Task</button>}
            </div>

            {tasks.length === 0 ? <h3>No Task Added!</h3> : null}

            <ol>
                {tasks.map((item, index) => (
                    <li key={index}>
                        <span className="task-content">{item}</span>
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