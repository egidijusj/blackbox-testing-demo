import set from "lodash/fp/set";
import negate from "lodash/fp/negate";

const completed = x => x.completed;
const notCompleted = negate(completed);

const filters = {
  All: () => true,
  Active: notCompleted,
  Completed: completed
};

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

const filter = (todos, filter) => todos.filter(filters[filter]);

const countRemaining = todos => todos.filter(notCompleted).length;

const add = (todos, name) => [...todos, { name, completed: false }];

const allCompleted = todos => todos.every(completed);

export {
  toggle,
  toggleAll,
  rename,
  remove,
  filter,
  countRemaining,
  add,
  allCompleted
};
