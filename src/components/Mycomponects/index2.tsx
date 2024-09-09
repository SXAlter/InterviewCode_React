import React, { useState, useEffect, useCallback } from 'react';

interface MyComponentProps {
  initialValue: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ initialValue }) => {
  const [count, setCount] = useState<number>(initialValue);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const handleClick = useCallback(() => {
    alert(`Current count is ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Show Count</button>
    </div>
  );
};

export default MyComponent;