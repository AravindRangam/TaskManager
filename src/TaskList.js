import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskForm from './EditTaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', completed: false });
    const [editedTask, setEditedTask] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, searchTerm, showCompleted]);

    async function fetchTasks() {
        try {
            const response = await axios.get('http://localhost:8080/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    function filterTasks() {
        let filtered = tasks.filter(task => {
            return (
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!showCompleted || task.completed)
            );
        });
        setFilteredTasks(filtered);
    }

    async function addTask(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/tasks', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', dueDate: '', completed: false });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async function updateTask(task) {
        try {
            const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, task);
            const updatedTasks = tasks.map(t => (t.id === task.id ? response.data : t));
            setTasks(updatedTasks);
            setEditedTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    async function deleteTask(id) {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${id}`);
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    const handleEdit = (task) => {
        setEditedTask(task);
    };

    const closeEditForm = () => {
        setEditedTask(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Add Task</h2>
                    <form onSubmit={addTask}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginRight: '10px' }}>
                                <input type="text" placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} required />
                            </div>
                            <div style={{ marginRight: '10px' }}>
                                <input type="text" placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} required />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                <label style={{ marginRight: '5px' }}>Due Date:</label>
                                <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} required />
                            </div>
                            <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                                <label style={{ marginRight: '5px' }}>Completed:</label>
                                <input type="checkbox" checked={newTask.completed} onChange={e => setNewTask({ ...newTask, completed: e.target.checked })} />
                            </div>
                            <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <h2 style={{ textAlign: 'center' }}>Task List</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <input type="text" placeholder="Search by title" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <label style={{ marginLeft: '10px' }}>
                        Show Completed:
                        <input type="checkbox" checked={showCompleted} onChange={e => setShowCompleted(e.target.checked)} />
                    </label>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'lightblue' }}>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Title</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Description</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Due Date</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Completed</th>
                            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.id}>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{task.title}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{task.description}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{task.dueDate}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{task.completed ? 'Yes' : 'No'}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    <button style={{ backgroundColor: 'blue', color: 'white', marginRight: '5px' }} onClick={() => handleEdit(task)}>Edit</button>
                                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteTask(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editedTask && (
                <EditTaskForm task={editedTask} updateTask={updateTask} closeEditForm={closeEditForm} />
            )}
        </div>
    );
}

export default TaskList;
