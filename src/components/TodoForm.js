import React from 'react';

// INTENTIONAL MISTAKES:
// 1. No useState import
// 2. Uncontrolled to controlled component issue
// 3. No form validation
// 4. Security: XSS vulnerability
// 5. No accessibility labels
// 6. Missing preventDefault
// 7. Props drilling instead of context
// 8. Async state updates not handled
// 9. No error boundaries
// 10. Hardcoded values

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    // Uncontrolled component
    this.state = {
      todo: undefined, // Should be empty string
      todos: [],
      count: 0
    };
  }
  
  handleSubmit(e) {
    // Missing e.preventDefault()
    
    // XSS vulnerability - dangerouslySetInnerHTML
    const newTodo = {
      id: Math.random(), // Should use proper ID generation
      text: this.state.todo,
      html: this.state.todo // Will be rendered as HTML
    };
    
    // Async state update issue
    this.setState({ 
      todos: [...this.state.todos, newTodo],
      count: this.state.count + 1 // Race condition
    });
    
    this.setState({
      count: this.state.count + 1 // Using stale state
    });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* No accessibility labels */}
        <input 
          type="text"
          value={this.state.todo}
          onChange={(e) => this.setState({ todo: e.target.value })}
        />
        
        {/* Inline function - performance issue */}
        <button onClick={() => this.handleSubmit()}>Add</button>
        
        {/* XSS vulnerability */}
        {this.state.todos.map((todo, index) => (
          <div 
            key={index} // Using index as key
            dangerouslySetInnerHTML={{ __html: todo.html }}
          />
        ))}
        
        {/* Not using setState properly */}
        <p onClick={() => this.state.count++}>
          Count: {this.state.count}
        </p>
      </form>
    );
  }
}

export default TodoForm;