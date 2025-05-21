import { useState } from 'react';

const TestInput = () => {
  const [rows, setRows] = useState(1);

  return (
    <div>
      <input
        type="number"
        value={rows}
        name="rows"
        min="1"
        max="15" // Corresponds to validation in useEffect
        onChange={(e) => {
          e.preventDefault();
          console.log('input');
          setRows(Number(e.target.value));
        }}
        aria-label="Number of rows"
      />
    </div>
  );
};

export default TestInput;
