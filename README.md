Task List React Component
This React component implements a task list management interface. It allows users to view, add, edit, and delete tasks.

Features
Display a list of tasks with their titles, descriptions, due dates, and completion status.
Add new tasks with a title, description, due date, and completion status.
Edit existing tasks.
Delete tasks.
Filter tasks by title and completion status.
Technologies Used
React: A JavaScript library for building user interfaces.
Axios: A promise-based HTTP client for making HTTP requests.
JavaScript (ES6+): The latest version of JavaScript used for writing the component logic.
HTML/CSS: Markup and styling languages used for structuring and styling the user interface.
Component Structure
The TaskList component is structured as follows:

State variables:
tasks: Array of tasks fetched from the server.
newTask: Object representing a new task to be added.
editedTask: Object representing a task being edited.
filteredTasks: Array of tasks filtered based on search term and show completed status.
searchTerm: String representing the current search term.
showCompleted: Boolean representing whether completed tasks should be shown.
useEffect hooks for fetching tasks and filtering tasks.
Functions for handling task operations:
fetchTasks: Fetches tasks from the server.
filterTasks: Filters tasks based on search term and show completed status.
addTask: Adds a new task.
updateTask: Updates an existing task.
deleteTask: Deletes a task.
handleEdit: Sets the task to be edited.
closeEditForm: Closes the edit task form.
JSX markup for rendering the task list interface including:
Form for adding new tasks.
Table for displaying tasks with options to edit and delete.
