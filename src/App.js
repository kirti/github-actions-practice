import React from 'react';
import './App.css';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import TodoForm from './components/TodoForm';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Actions Practice</h1>
        <p>Testing AI Code Review with Multiple Components</p>
        
        <UserProfile 
          name="John Doe"
          email="john@example.com"
          avatar="https://via.placeholder.com/150"
        />
        
        <UserList />
        
        <TodoForm />
        
        <ProductCard 
          name="Sample Product"
          price={99.99}
          imageUrl="https://via.placeholder.com/300"
          externalLink="https://example.com"
        />
      </header>
    </div>
  );
}

export default App;