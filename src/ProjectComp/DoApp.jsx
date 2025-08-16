
import React, { useState } from 'react';
import Title from './Title';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import FilterToolbar from './FilterToolbar';
import './todoStyle.css';

function DoApp() { 
// הגדרת קומפוננטת הבסיס של האפליקציה.
  const [todos, setTodos] = useState([]); // יצירת state עבור רשימת המשימות, מתחיל כ-array ריק.
  const [task, setTask] = useState(''); // יצירת state עבור הטקסט של המשימה החדשה.
  const [filterSelection, setFilterSelection] = useState("all");

  //  חישוב הסיכום 
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const activeTasks = todos.filter(t => !t.completed).length;
  
  const addTask = (task) => { // פונקציה להוספת משימה חדשה.
    setTodos(prevTodos => [ // 1. מבקשים מ-React את הרשימה הכי עדכנית של todos (המשימות).
  ...prevTodos,        // 2. משכפלים את כל המשימות הקיימות.
  {
  id: Date.now(),         //    - יצירת מזהה ייחודי לכל משימה.       
  text: task,             //    - הטקסט של המשימה.
  completed: false,       //    - האם המשימה הושלמה (בהתחלה לא).  
  createdAt: new Date().toISOString(),  // 4. מוסיפים שדה תאריך, בפורמט ISO (תאריך מלא).
}
]);
 //  מוסיף משימה חדשה עם מזהה ייחודי (id) וטקסט לרשימת המשימות.
    clearTask(); // מנקה את שדה הקלט לאחר ההוספה.
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
        {/*   הצגת הסיכום  */}
      <div className="summary-bar">
        <span>סה"כ משימות: {totalTasks}</span>
        <span> | פעילות: {activeTasks}</span>
        <span> | הושלמו: {completedTasks}</span>
      </div>

      <AddTodo task={task} 
      setTask={setTask} 
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
