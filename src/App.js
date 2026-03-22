import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>GitHub Actions Practice</h1>
        <p>
          Testing AI Code Review and CI/CD workflows
        </p>
        
        {/* UserProfile component with some props */}
        <UserProfile 
          name="John Doe"
          email="john@example.com"
          avatar="https://via.placeholder.com/150"
        />
      </header>
    </div>
  );
}

export default App;