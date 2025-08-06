
const assert = require('node:assert');
const test = require('node:test');
const { addTask, removeTask, toggleComplete, filterTodos } = require('./doAppUtils');

test('addTask adds a new task', () => {
  const todos = [];
  const result = addTask(todos, 'משימה');
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].text, 'משימה');
  assert.strictEqual(result[0].completed, false);
});

test('removeTask removes the correct task', () => {
  const todos = [
    { id: 1, text: 'אחת', completed: false },
    { id: 2, text: 'שתיים', completed: false },
  ];
  const result = removeTask(todos, 1);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 2);
});

test('toggleComplete toggles the completed status', () => {
  const todos = [{ id: 1, text: 'אחת', completed: false }];
  const result = toggleComplete(todos, 1);
  assert.strictEqual(result[0].completed, true);
});

test('filterTodos filters by selection', () => {
  const todos = [
    { id: 1, text: 'אחת', completed: false },
    { id: 2, text: 'שתיים', completed: true },
  ];
  assert.strictEqual(filterTodos(todos, 'all').length, 2);
  assert.strictEqual(filterTodos(todos, 'active').length, 1);
  assert.strictEqual(filterTodos(todos, 'completed').length, 1);
});
