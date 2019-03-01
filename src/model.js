import set from "lodash/fp/set";

const modifyInList = (todos, fn) => todo =>
  todos.map(_t => (_t === todo ? fn(todo) : _t));

const toggleTodo = todo => set(["completed"], !todo.completed, todo);
const renameTodo = name => todo => set(["name"], name, todo);
const setCompleted = completed => todo => set(["completed"], completed, todo);

const toggle = (todos, todo) => modifyInList(todos, toggleTodo)(todo);

const toggleAll = (todos, completed) => todos.map(setCompleted(completed));

const rename = (todos, todo, name) =>
  modifyInList(todos, renameTodo(name))(todo);

const remove = (todos, todo) => todos.filter(_t => _t !== todo);

const notCompleted = x => !x.completed;
const filters = {
  All: () => true,
  Active: notCompleted,
  Completed: x => !notCompleted(x)
};

const filter = (todos, filter) => todos.filter(filters[filter]);
const countRemaining = todos => todos.filter(notCompleted).length;

const add = (todos, name) => [...todos, { name, completed: false }];

export { toggle, toggleAll, rename, remove, filter, countRemaining, add };
