import { useState } from "react";

function ToDoTask() { // מגדיר את הקומפוננטה ToDoTask
  const [text, setText] = useState(""); // מגדיר משתנה מצב text ופונקציה setText לשינויו, עם ערך התחלתי ריק
  const [tasks, setTasks] = useState([]); // מגדיר משתנה מצב tasks ופונקציה setTasks לשינויו, עם ערך התחלתי של מערך ריק

  function handleChange(e) { // מגדיר פונקציה לטיפול בשינוי בטקסט
    setText(e.target.value); // מעדכן את text לערך החדש מהקלט
  }

  function handleAdd() { // מגדיר פונקציה להוספת משימה חדשה
    if (text.trim() !== "") { // בודק אם הטקסט אינו ריק לאחר הסרת רווחים מיותרים
      setTasks([...tasks, text]); // מעדכן את tasks עם המשימה החדשה
      setText(""); // מאפס את הטקסט
    }
  }

  return ( // מחזיר JSX שמייצג את התצוגה של הקומפוננטה
    <div>
      <input 
        type="text" 
        value={text} // קושר את הערך של הקלט למשתנה text
        onChange={handleChange} // קושר את אירוע השינוי לפונקציה handleChange
        placeholder="Enter ToDo here" // מציג טקסט ברירת מחדל בקלט
      />
      <button onClick={handleAdd}>הוספה</button> 
      {/* //כפתור להוספת משימה חדשה, קושר את אירוע הלחיצה לפונקציה handleAdd  */}
      <ul>
        {tasks.map((task, idx) => ( // ממפה כל משימה במערך tasks לרשימה של אלמנטים
          <li key={idx}>{task}</li> // מציג כל משימה כאלמנט רשימה עם מפתח ייחודי
        ))}
      </ul>
    </div>
  );
}

export default ToDoTask; // מייצא את הקומפוננטה ToDoTask כברירת מחדל



