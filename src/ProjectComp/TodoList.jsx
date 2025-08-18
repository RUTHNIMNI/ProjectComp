import React from 'react'
import './todoStyle.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, removeTask, toggleComplete, updateTaskText  }) => { 
// קומפוננטה שמציגה את כל המשימות, מקבלת את הרשימה ופונקציית מחיקה כ-props.

  return (
    <div className="todo-list">
      {todos.map((task) => (
        <TodoItem key={task.id} 
        task={task}             // כאן מועבר האובייקט של המשימה, כולל ה-id
        removeTask={removeTask}
        toggleComplete={toggleComplete} // מעביר את הפונקציה הלאה
        updateTaskText={updateTaskText}
        />
      ))}
    </div>
  ); 
  // עובר על כל המשימות ומציג אותן בעזרת TodoItem.
}

export default TodoList

