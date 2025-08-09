
function addTask(todos, text) {
  return [
    ...todos,
    {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ];
}

function removeTask(todos, id) {
  return todos.filter((task) => task.id !== id);
}

function toggleComplete(todos, id) {
  return todos.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

function filterTodos(todos, filterSelection) {
  if (filterSelection === "all") return todos;
  if (filterSelection === "active") return todos.filter((t) => !t.completed);
  if (filterSelection === "completed") return todos.filter((t) => t.completed);
  return todos;
}

module.exports = { addTask, removeTask, toggleComplete, filterTodos };
