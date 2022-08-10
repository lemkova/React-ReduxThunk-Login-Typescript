import React from 'react';
import './App.css';
import User from './components/User';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Login/>
      <User/>
    </div>
  );
}

export default App;
