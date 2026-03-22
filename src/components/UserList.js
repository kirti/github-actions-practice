import React, { useState } from 'react';

// INTENTIONAL MISTAKES:
// 1. useEffect not imported
// 2. Memory leak - no cleanup
// 3. No error handling
// 4. No loading state
// 5. Inefficient re-renders
// 6. Missing key in map
// 7. Inline function in map
// 8. Direct state mutation
// 9. No PropTypes
// 10. Missing dependency in useEffect

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  
  // Missing useEffect import - will cause error
  useEffect(() => {
    // No loading state
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Direct mutation instead of spreading
        users.push(...data);
        setUsers(users);
      });
    // No cleanup, no error handling
  }, []); // Missing filter dependency
  
  // Inefficient - should use useMemo
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      {/* Missing key prop, inline function */}
      {filteredUsers.map(user => (
        <div onClick={() => console.log(user)}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;