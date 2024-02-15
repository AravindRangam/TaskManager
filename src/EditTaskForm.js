import React, { useState } from 'react';

function EditTaskForm({ task, updateTask, closeEditForm }) {
    const [editedTask, setEditedTask] = useState(task);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(editedTask);
        closeEditForm();
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: '999', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
                                <label htmlFor="title">Title:</label>
                            </td>
                            <td>
                                <input type="text" id="title" name="title" value={editedTask.title} onChange={handleChange} style={{ width: '100%', boxSizing: 'border-box' }} required />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
                                <label htmlFor="description">Description:</label>
                            </td>
                            <td>
                                <input type="text" id="description" name="description" value={editedTask.description} onChange={handleChange} style={{ width: '100%', boxSizing: 'border-box' }} required />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
                                <label htmlFor="dueDate">Due Date:</label>
                            </td>
                            <td>
                                <input type="date" id="dueDate" name="dueDate" value={editedTask.dueDate} onChange={handleChange} style={{ width: '100%', boxSizing: 'border-box' }} required />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '50%', textAlign: 'right', paddingRight: '10px' }}>
                                <label htmlFor="completed">Completed:</label>
                            </td>
                            <td>
                                <input type="checkbox" id="completed" name="completed" checked={editedTask.completed} onChange={(e) => setEditedTask({ ...editedTask, completed: e.target.checked })} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center', paddingTop: '20px' }}>
                                <button type="submit" style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px', padding: '10px 20px', borderRadius: '4px', border: 'none' }}>Save</button>
                                <button type="button" onClick={closeEditForm} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none' }}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditTaskForm;
