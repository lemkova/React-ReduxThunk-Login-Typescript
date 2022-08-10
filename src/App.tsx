import React from 'react';
import './App.css';
import Counter from './components/Counter';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Login/>
      <Counter/>
    </div>
  );
}

export default App;
