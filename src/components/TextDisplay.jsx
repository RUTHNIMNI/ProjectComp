import React, { useState } from 'react';

const TextDisplay = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h2>הטקסט שהוזן:</h2>
      <p>{text}</p>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="הכנס טקסט כאן"
      />
    </div>
  );
};

export default TextDisplay;

