import React, { useState } from 'react';

function UserProfile(props) {
  const [count, setCount] = useState(0);
  
  // Potential issues for AI to catch:
  // 1. Missing prop validation
  // 2. Inline function in onClick
  // 3. No error handling
  // 4. Missing accessibility
  
  const handleClick = () => {
    setCount(count + 1);
    console.log('Count:', count); // Side effect in render
  };
  
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Email: {props.email}</p>
      <button onClick={() => handleClick()}>
        Clicked {count} times
      </button>
      <img src={props.avatar} />
    </div>
  );
}

export default UserProfile;