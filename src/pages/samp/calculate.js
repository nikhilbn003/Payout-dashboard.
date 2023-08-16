import React, { useState, useEffect } from 'react';

const YourNormalReactComponent = () => {
  // Dummy JSON data for demonstration
  const initialJsonData = [
    { id: 1, amount: 100 },
    { id: 4, amount: 400 },
    { id: 2, amount: 200 },
    { id: 4, amount: 400 },
    { id: 4, amount: 400 },
    { id: 4, amount: 400 },
    { id: 3, amount: 300 },
    { id: 4, amount: 400 },
    // Add more data items with 'amount' property
  ];

  const [jsonData, setJsonData] = useState(initialJsonData);
  const [totalAmountForId4, setTotalAmountForId4] = useState(0);

  // Calculate the total amount for 'id: 4' whenever 'jsonData' changes
  useEffect(() => {
    const calculateTotalAmountForId4 = () => {
      const filteredItems = jsonData.filter((item) => item.id === 4);
      const total = filteredItems.reduce((acc, item) => acc + item.amount, 0);
      setTotalAmountForId4(total);
    };

    calculateTotalAmountForId4();
  }, [jsonData]);

  return (
    <div>
      {/* Display your component content here */}
      <h2>JSON Data</h2>
      <ul>
        {jsonData.map((item) => (
          <li key={item.id}>
            ID: {item.id}, Amount: {item.amount}
          </li>
        ))}
      </ul>
      <p>Total Amount for ID 4: {totalAmountForId4}</p>
    </div>
  );
};

export default YourNormalReactComponent;
