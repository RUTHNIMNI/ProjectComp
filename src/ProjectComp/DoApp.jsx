import React, { useState, useEffect } from 'react'; 
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

  
  // לוג כללי על כל רינדור
  useEffect(() => {
    console.info("DoApp rendered. Current todos:", todos); // מדפיס בכל רינדור את מצב המשימות. חשוב כדי לעקוב אחרי שינויים בסטייט ולוודא שהרינדור מתבצע נכון.
  });
  
  const addTask = (task, deadline) => { // פונקציה להוספת משימה חדשה.
  const sanitizedTask = DOMPurify.sanitize(task).trim(); // טיהור והסרת רווחים מיותרים
  if (!sanitizedTask) {
    // אם אחרי הטיהור הקלט ריק, לא מוסיפים משימה
         console.warn("Attempted to add empty task. Ignored."); // מדווח שנעשה ניסיון להוסיף משימה ריקה. עוזר לזהות טעויות קלט של המשתמש
    return;
  }
    setTodos(prevTodos => {// 1. מבקשים מ-React את הרשימה הכי עדכנית של todos (המשימות).
   const newTask = {     
  
  id: Date.now(),         //    - יצירת מזהה ייחודי לכל משימה.       
   text: sanitizedTask,             //    - הטקסט של המשימה.
  completed: false,       //    - האם המשימה הושלמה (בהתחלה לא).  
  createdAt: new Date().toISOString(),  // 4. מוסיפים שדה תאריך, בפורמט ISO (תאריך מלא).
   deadline: deadline, //  בתוך האובייקט של המשימה שומר את הדד ליין
};

  console.log("Task added:", newTask);

  return [
    ...prevTodos,   // 2. משכפלים את כל המשימות הקיימות.
    newTask
  ];
});
 //  מוסיף משימה חדשה עם מזהה ייחודי (id) וטקסט לרשימת המשימות.
    clearTask(); // מנקה את שדה הקלט לאחר ההוספה.
    setDeadline(''); // מאפס  את הדד ליין
  };

  const clearTask = () => { // פונקציה שמנקה את שדה הקלט.
    setTask(''); // מאפסת את הטקסט של המשימה החדשה.
       console.debug("Task input cleared.");   // מדווח ששדה הקלט של המשימה נוקה. עוזר לוודא שהאפליקציה מתנהגת נכון אחרי הוספת משימה.

  };
  const removeTask = (id) => { // פונקציה שמסירה משימה לפי מזהה (id).
      console.error("Removing task with id:", id);     //  מדווח שמסירים משימה לפי מזהה. עוזר לעקוב אחרי פעולות מחיקה ולזהות אם נמחקה המשימה הנכונה.
    setTodos(todos.filter((task) => task.id !== id)); // מסננת את המשימה עם ה-id הנתון מתוך הרשימה.
  };
   // פונקציה שמחליפה את completed (true/false) של משימה לפי מזהה
  const toggleComplete = (id) => {
      console.log("Toggling completion for task with id:", id); //  מדווח שמחליפים את מצב ההשלמה של משימה מסוימת. עוזר לעקוב אחרי פעולות סימון/ביטול השלמה.
    
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
