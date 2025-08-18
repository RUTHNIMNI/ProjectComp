import React from 'react'
import './todoStyle.css'

function AddTodo({ task, setTask, deadline, setDeadline, addTask }) { 
// קומפוננטה להוספת משימה חדשה, מקבלת את הטקסט, פונקציית עדכון טקסט, ופונקציית הוספה כ-props.

  const handleAddClick = () => { // פונקציה שמופעלת בלחיצה על כפתור ההוספה.
    console.log(task); // מדפיס את הטקסט לקונסול (לא חובה, אפשר למחוק).
      if (task.trim() && deadline) { // בודק ששני השדות לא ריק או מלא ברווחים.
      addTask(task, deadline); // מוסיף את המשימה.
      setTask(''); // מאפס את שדה הקלט.
      setDeadline('');
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
      <input
        type="date"   // מאפשר למשתמש לבחור תאריך דד ליין
        value={deadline}    // ערך הדד ליין שמגיע מהסטייט
        onChange={(e) => setDeadline(e.target.value)}  // מעדכן את הדד ליין בסטייט
        placeholder="בחר דד ליין"
        style={{ marginLeft: '10px' }}
      />
      <button onClick={handleAddClick}>Add Todo</button>
    </div>
  ); 
  // מציג שדה קלט וכפתור להוספה.
}

export default AddTodo

