


import React, { useState } from "react";

const App = () => {
  const initialData = ["a", "b", "l", "c", "a", "e", "z", "g"];
  const uniqueData = [...new Set(initialData)]; // Remove duplicates
  const [data, setData] = useState(uniqueData);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleDeleteClick = (item) => {
    const updatedData = data.filter((i) => i !== item);
    setData(updatedData);
    setSelectedItems(selectedItems.filter((selected) => selected !== item));
  };

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item}
            {selectedItems.includes(item) && (
              <button onClick={() => handleDeleteClick(item)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

