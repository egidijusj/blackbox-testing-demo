const setNativeValue = require("../infra/setNativeValue");
const simulateEvent = require("../infra/simulateEvent");
const KEYS = require("../infra/keys");

const createItemDriver = require("./item");
const createFooterDriver = require("./footer");

const createTodosDriver = appComponent => {
  const get = (s, r = appComponent) => r.querySelector(s);
  const getAll = (s, r = appComponent) => r.querySelectorAll(s);
  const exists = s => Boolean(get(s));
  const items = () => Array.from(getAll(".todo-list li"));
  const item = i => items()[i];
  return {
    showsList: () => exists(".main"),
    showsFooter: () => exists(".footer"),
    getInputValue: () => get(".new-todo").value,
    type: text => {
      const input = get(".new-todo");
      setNativeValue(input, text);
      simulateEvent(input, "input");
      simulateEvent(input, "keypress", KEYS.ENTER);
    },
    getItems: () => items().map(el => el.textContent),

    item: index => createItemDriver(item(index)),

    toggleAll: () => {
      get(".toggle-all").click();
    },

    toggleAllChecked: () => get(".toggle-all").checked,

    footer: () => createFooterDriver(get(".footer")),

    inputFocused: () => document.activeElement === get(".new-todo")
  };
};

module.exports = createTodosDriver;
