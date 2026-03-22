import { useState, useEffect } from 'react';

// INTENTIONAL MISTAKES:
// 1. React not imported (needed for JSX)
// 2. Prop drilling
// 3. No memoization
// 4. Expensive calculations in render
// 5. Security issues with external URLs
// 6. Missing alt attributes
// 7. No error boundaries
// 8. Inefficient event handlers
// 9. Missing cleanup
// 10. Password in code

const API_KEY = 'sk-1234567890abcdef'; // Hardcoded secret!

function ProductCard(props) {
  const [price, setPrice] = useState(props.price);
  const [quantity, setQuantity] = useState(1);
  
  // Expensive calculation on every render
  const discount = calculateComplexDiscount(price, quantity);
  
  // No cleanup for interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetching on interval without cleanup
      fetch(`https://api.example.com/price?key=${API_KEY}`)
        .then(r => r.json())
        .then(data => setPrice(data.price));
    }, 1000);
    // Missing return cleanup
  }, []);
  
  // Inefficient - recreated on every render
  const handleQuantityChange = (delta) => {
    setQuantity(quantity + delta);
  };
  
  // Expensive calculation not memoized
  const total = price * quantity - discount;
  
  return (
    <div className="product-card">
      {/* Security: No validation of external URL */}
      <img src={props.imageUrl} /> {/* Missing alt */}
      
      <h2>{props.name}</h2>
      
      {/* Inline styles - should use CSS */}
      <p style={{ color: 'red', fontSize: '20px' }}>
        ${total.toFixed(2)}
      </p>
      
      {/* Inline arrow functions - performance issue */}
      <button onClick={() => handleQuantityChange(-1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => handleQuantityChange(1)}>+</button>
      
      {/* External link without security */}
      <a href={props.externalLink} target="_blank">
        Learn More
      </a>
      
      {/* Direct DOM manipulation - anti-pattern */}
      <button onClick={() => {
        document.getElementById('cart').innerHTML = 'Added!';
      }}>
        Add to Cart
      </button>
      
      <div id="cart"></div>
    </div>
  );
}

// Missing memoization
function calculateComplexDiscount(price, quantity) {
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 10000; i++) {
    result += Math.sqrt(price * quantity);
  }
  return result / 10000;
}

// No PropTypes validation
export default ProductCard;