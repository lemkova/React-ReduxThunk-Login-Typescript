import React from 'react';
import './App.css';
import User from './components/User';
import Login from './components/Login';
import { useSelector } from 'react-redux'
import { AuthState } from './store/reducers/authSlice'
import { RootState } from './store/index'

function App() {
  const authState: AuthState = useSelector((state: RootState) => state.auth)
  return (
    <div className="App">
      <Login/>
      {
        authState.isLoginSuccess && ( <User/> )
      }
    </div>
  );
}

export default App;
