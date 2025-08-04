import React, { useState } from "react";

const LightToggle = () => {
  const [mode, setMode] = useState("Light Mode");

  const handleClick = () => {
    const newMode = mode === "Light Mode" ? "Dark Mode" : "Light Mode";
    setMode(newMode);
    document.body.style.backgroundColor = newMode === "Light Mode" ? "white" : "black";
    document.body.style.color = newMode === "Light Mode" ? "black" : "white";
  };
    
  // סגנון שמרכז את התוכן אנכית ואופקית
  const centerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // גובה כל המסך
  };



  return (
    <div style={centerStyle}>
        <p>Current Mode: {mode}</p>
      <button onClick={handleClick}>Toggle Mode</button>
    </div>
  );
};

export default LightToggle;
