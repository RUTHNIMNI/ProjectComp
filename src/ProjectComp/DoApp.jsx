
import React, { useState } from 'react';
import Title from './Title';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import FilterToolbar from './FilterToolbar';
import DOMPurify from 'dompurify';
import './todoStyle.css';

function DoApp() { 
// הגדרת קומפוננטת הבסיס של האפליקציה.
  const [todos, setTodos] = useState([]); // יצירת state עבור רשימת המשימות, מתחיל כ-array ריק.
  const [task, setTask] = useState(''); // יצירת state עבור הטקסט של המשימה החדשה.
  const [deadline, setDeadline] = useState(''); // הוספת // שדה חדש: תאריך דד ליין שהמשתמש בוחרן
  const [filterSelection, setFilterSelection] = useState("all");

  
  const addTask = (task, deadline) => { // פונקציה להוספת משימה חדשה.
  const sanitizedTask = DOMPurify.sanitize(task).trim(); // טיהור והסרת רווחים מיותרים
  if (!sanitizedTask) {
    // אם אחרי הטיהור הקלט ריק, לא מוסיפים משימה
    return;
  }
    setTodos(prevTodos => [ // 1. מבקשים מ-React את הרשימה הכי עדכנית של todos (המשימות).
  ...prevTodos,        // 2. משכפלים את כל המשימות הקיימות.
  {
  id: Date.now(),         //    - יצירת מזהה ייחודי לכל משימה.       
   text: sanitizedTask,             //    - הטקסט של המשימה.
  completed: false,       //    - האם המשימה הושלמה (בהתחלה לא).  
  createdAt: new Date().toISOString(),  // 4. מוסיפים שדה תאריך, בפורמט ISO (תאריך מלא).
   deadline: deadline, //  בתוך האובייקט של המשימה שומר את הדד ליין
}
]);
 //  מוסיף משימה חדשה עם מזהה ייחודי (id) וטקסט לרשימת המשימות.
    clearTask(); // מנקה את שדה הקלט לאחר ההוספה.
    setDeadline(''); // מאפס  את הדד ליין
  };

  const clearTask = () => { // פונקציה שמנקה את שדה הקלט.
    setTask(''); // מאפסת את הטקסט של המשימה החדשה.
  };
  const removeTask = (id) => { // פונקציה שמסירה משימה לפי מזהה (id).
    setTodos(todos.filter((task) => task.id !== id)); // מסננת את המשימה עם ה-id הנתון מתוך הרשימה.
  };
   // פונקציה שמחליפה את completed (true/false) של משימה לפי מזהה
  const toggleComplete = (id) => {
    setTodos(todos.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // סינון המשימות לפי filterSelection
const filteredTodos = todos.filter(task => {
  if (filterSelection === "all") return true;
  if (filterSelection === "active") return !task.completed;
  if (filterSelection === "completed") return task.completed;
  return true;
});
  
  return (
<div className="app-container">
      <Title />
      <AddTodo task={task} 
      setTask={setTask}
      deadline={deadline} // חדש!
      setDeadline={setDeadline} // חדש! 
      addTask={addTask} 
      />
      <FilterToolbar setFilterSelection={setFilterSelection} />
      <TodoList 
      todos={filteredTodos} // filteredTodos הוא מערך של כל המשימות שרוצים להציג 
      removeTask={removeTask}
      toggleComplete={toggleComplete}
      />
      
    </div>
  ); 
  // מציג את שלוש הקומפוננטות: כותרת, הוספת משימה, ורשימת משימות.
}

export default DoApp
