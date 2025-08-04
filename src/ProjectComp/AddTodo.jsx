import React from 'react'
import './todoStyle.css'

function AddTodo({ task, setTask, addTask }) { 
// קומפוננטה להוספת משימה חדשה, מקבלת את הטקסט, פונקציית עדכון טקסט, ופונקציית הוספה כ-props.

  const handleAddClick = () => { // פונקציה שמופעלת בלחיצה על כפתור ההוספה.
    console.log(task); // מדפיס את הטקסט לקונסול (לא חובה, אפשר למחוק).
    if (task.trim()) { // בודק שהשדה לא ריק או מלא ברווחים.
      addTask(task); // מוסיף את המשימה.
      setTask(''); // מאפס את שדה הקלט.
    }
  };

  return (
    <div className="add-todo-container">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAddClick();
        }}
        placeholder="Enter a new Todo here"
      />
      <button onClick={handleAddClick}>Add Todo</button>
    </div>
  ); 
  // מציג שדה קלט וכפתור להוספה.
}

export default AddTodo

