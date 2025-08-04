
import React, { useState } from 'react';
import './todoStyle.css';

const TodoItem = ({ task, removeTask, toggleComplete }) => { // מקבל props: משימה, פונקציית מחיקה, ופונקציית השלמה
  console.log(task); // בדיקה
  // state לניהול הופעת המודאל
  const [showModal, setShowModal] = useState(false);      // state שמנהל האם להציג את המודאל (ברירת מחדל: false)
  
  const handleDelete = () => {     // כשמפעילים את הפונקציה, פותחים את המודאל
    setShowModal(true);
  };

  const confirmDelete = () => {      // פונקציה שמופעלת כאשר מאשרים מחיקה
   removeTask(task.id);             // קוראת לפונקציית המחיקה מההורה עם מזהה המשימה
   setShowModal(false);             // סוגרת את המודאל
  };

  const cancelDelete = () => setShowModal(false); // סוגרת את המודאל בלי למחוק

  return (
    <div className="todo-item">     {/* עטיפה של המשימה */}
        <input
        type="checkbox"
        checked={task.completed} // קושר את מצב הסימון לערך completed של המשימה
        onChange={() => toggleComplete(task.id)} // קורא לפונקציה שמעדכנת את מצב המשימה
      />
    <span className="task-text">{task.text}</span>
    <span className="task-date">
        Start date: {task.createdAt && (
        new Date(task.createdAt).toLocaleDateString('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        })
    )}
    </span>

<button
  className="delete-button"
  onClick={handleDelete}
>
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
  </svg>
</button>{/* כפתור שמפעיל את הפונקציה removeTask עם מזהה המשימה (task.id) בעת לחיצה, ומציג את הטקסט "Remove" */}
{/* מודאל מותאם אישית למחיקת משימה */}
      {showModal && (
        <div className="modal-overlay">     {/* שכבת רקע כהה שמכסה את המסך */}
          <div className="modal-content">     {/* חלון המודאל עצמו */}
            <p>Are you sure you want to delete the ToDo?</p>
            <button className="confirm-btn" onClick={confirmDelete}>Yes</button>
            <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}

    </div>

  ); 

  // מציג את טקסט המשימה וכפתור למחיקה.

}

export default TodoItem




