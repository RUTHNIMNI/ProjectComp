const assert = require('node:assert');
const test = require('node:test');

// פונקציה מדומה להוספת משימה
function addTask(task) {
  console.log(`Task added: ${task}`);
}

// פונקציה מדומה לעדכון משימה
function setTask(task) {
  console.log(`Task set to: ${task}`);
}

// בדיקה לפונקציה handleAddClick
test('handleAddClick should add task and clear input', (t) => {
  let task = 'New Task';
  const setTaskMock = (newTask) => {
    task = newTask;
  };
  const addTaskMock = (task) => {
    console.log(`Task added: ${task}`);
  };

  const handleAddClick = () => {
    console.log(task);
    if (task.trim()) {
      addTaskMock(task);
      setTaskMock('');
    }
  };

  handleAddClick();
  assert.strictEqual(task, '', 'Task should be cleared after adding');
});

// בדיקה לפונקציה setTask
test('setTask should update the task', (t) => {
  let task = '';
  const setTaskMock = (newTask) => {
    task = newTask;
  };

  setTaskMock('Updated Task');
  assert.strictEqual(task, 'Updated Task', 'Task should be updated');
});
