// App.js

import React from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      <TaskList />
    </div>
  );
}

export default App;
