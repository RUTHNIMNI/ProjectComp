
import React, { useState } from 'react';
import { differenceInDays } from 'date-fns'; // מייבא את הפונקציה שמחשבת את ההפרש בימים
import './todoStyle.css';

const TodoItem = ({ task, removeTask, toggleComplete, updateTaskText }) => { // מקבל props: משימה, פונקציית מחיקה, ופונקציית השלמה
  console.log(task); // בדיקה
  // state לניהול הופעת המודאל
  const [showModal, setShowModal] = useState(false);      // state שמנהל האם להציג את המודאל (ברירת מחדל: false)

    // state לניהול מצב עריכה וערך זמני
  const [isEditing, setIsEditing] = useState(false); 
  const [editValue, setEditValue] = useState(task.text); 

    // חישוב הימים שנשארו עד הדד-ליין (אם יש דד-ליין)
  let daysLeft = null; // משתנה שישמור את מספר הימים שנשארו
  if (task.deadline) { // אם יש דד-ליין למשימה
    const today = new Date(); // תאריך היום
    const deadlineDate = new Date(task.deadline); // תאריך הדד-ליין
    daysLeft = differenceInDays(deadlineDate, today); // מחשב את ההפרש בימים
  }
  
  const handleDelete = () => {     // כשמפעילים את הפונקציה, פותחים את המודאל
    setShowModal(true);
  };

  const confirmDelete = () => {      // פונקציה שמופעלת כאשר מאשרים מחיקה
   removeTask(task.id);             // קוראת לפונקציית המחיקה מההורה עם מזהה המשימה
   setShowModal(false);             // סוגרת את המודאל
  };

  const cancelDelete = () => setShowModal(false); // סוגרת את המודאל בלי למחוק

  //  פונקציה לשמירת העריכה
  const handleSaveEdit = () => {
    if (editValue.trim()) {
      updateTaskText(task.id, editValue); 
      setIsEditing(false); 
    }
  };


  return (
    <div className="todo-item">     {/* עטיפה של המשימה */}
        <input
        type="checkbox"
        checked={task.completed} // קושר את מצב הסימון לערך completed של המשימה
        onChange={() => toggleComplete(task.id)} // קורא לפונקציה שמעדכנת את מצב המשימה
      />
       {/* חדש! הצגת שם המשימה או שדה עריכה */}
      {!isEditing ? (
        <>
          <span className="task-text">{task.text}</span>
          <button
            className="edit-button" // חדש!
            onClick={() => {
              setIsEditing(true); // חדש!
              setEditValue(task.text); // חדש!
            }}
          >
            ערוך
          </button>
        </>
      ) : (
        <>
          <input
            className="edit-input" // חדש!
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)} // חדש!
            onKeyDown={e => {
              if (e.key === 'Enter') handleSaveEdit(); // חדש!
              if (e.key === 'Escape') setIsEditing(false); // חדש!
            }}
            autoFocus
          />
          <button className="save-button" onClick={handleSaveEdit}>שמור</button> {/* חדש! */}
          <button className="cancel-button" onClick={() => setIsEditing(false)}>ביטול</button> {/* חדש! */}
        </>
      )}

   
    <span className="task-date">
        Start date: {task.createdAt && (
        new Date(task.createdAt).toLocaleDateString('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        })
    )}
     </span>
      {task.deadline && ( // מציג את הדד ליין אם קיים
        <span className="task-date">
          Deadline: {new Date(task.deadline).toLocaleDateString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </span>
      )}

      
      {/* הצגת מספר הימים שנשארו עד הדד-ליין */}
      {task.deadline && ( // מציג את ההפרש רק אם יש דד-ליין
        <span
    className="days-left"
    // הגדרת צבע דינמי לפי מצב הדד-ליין
    style={{
      marginRight: '10px',
      // אם נשארו 2 ימים או פחות, או שהדד-ליין עבר, הצבע יהיה אדום. אחרת, צבע חום-צהבהב.
      color: (daysLeft <= 2) ? '#ff1a1a' : '#b67c31', // אדום אם 2 ימים או פחות, אחרת חום
      fontWeight: 'bold'
    }}
  >
          {/* אם נשארו ימים, מציג את מספר הימים. אם עבר הדד-ליין, מציג הודעה מתאימה */}
           {daysLeft >= 0
          ? `Days left: ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}` // If days left
          : 'Deadline passed' // אם הדד ליין עבר
    }
        </span>
      )}


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




