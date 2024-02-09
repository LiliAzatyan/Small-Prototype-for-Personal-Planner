import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [motivationalMessage, setMotivationalMessage] = useState('');

  // List of motivational messages
  const motivationalMessages = [ 
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "You are never too old to set another goal or to dream a new dream.",
    "The only limit to our realization of tomorrow will be our doubts of today."
  ];

  // Load tasks and motivational message from local storage on component mount
  useEffect(() => {
    const storedDailyTasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];
    setDailyTasks(storedDailyTasks);

    const storedWeeklyTasks = JSON.parse(localStorage.getItem('weeklyTasks')) || [];
    setWeeklyTasks(storedWeeklyTasks);

    // Select a random motivational message
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setMotivationalMessage(motivationalMessages[randomIndex]);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  useEffect(() => {
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
  }, [weeklyTasks]);

  const addTask = (taskList, setTaskList) => {
    if (newTask.trim() !== '') {
      setTaskList([...taskList, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (taskList, setTaskList, index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskList(updatedTasks);
  };

  const deleteTask = (taskList, setTaskList, index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
  };

  return (
    <div className="container">
      <div className="header">
        <h1><i>Personal Planner</i></h1>
      </div>
      <div className="main-section">
        <div className="motivational-message">
          <p>{motivationalMessage}</p>
        </div>
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a daily task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={() => addTask(dailyTasks, setDailyTasks)}><i>Add Daily Task</i></button>
          <button onClick={() => addTask(weeklyTasks, setWeeklyTasks)}><i>Add Weekly Task</i></button>
        </div>
        <div className="task-list">
          <h2><i>Daily Tasks</i></h2>
          {dailyTasks.map((task, index) => (
            <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(dailyTasks, setDailyTasks, index)}
              />
              <div className="task-text">{task.text}</div>
              <button onClick={() => deleteTask(dailyTasks, setDailyTasks, index)}><i>Delete</i></button>
            </div>
          ))}
          <h2><i>Weekly Tasks</i></h2>
          {weeklyTasks.map((task, index) => (
            <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(weeklyTasks, setWeeklyTasks, index)}
              />
              <div className="task-text">{task.text}</div>
              <button onClick={() => deleteTask(weeklyTasks, setWeeklyTasks, index)}><i>Delete</i></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
