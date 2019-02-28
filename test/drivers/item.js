const setNativeValue = require("../infra/setNativeValue");
const simulateEvent = require("../infra/simulateEvent");
const KEYS = require("../infra/keys");
const classes = el => Array.from(el.classList);

const createItemDriver = itemComponent => {
  const get = (s, r = itemComponent) => r.querySelector(s);
  const exists = s => Boolean(get(s));
  return {
    toggle: () => {
      get(".toggle", itemComponent).click();
    },
    completed: () => classes(itemComponent).includes("completed"),

    doubleClick: () => {
      simulateEvent(get("label", itemComponent), "dblclick");
    },

    editable: () => {
      return classes(itemComponent).includes("editing");
    },

    rename: text => {
      const input = get(".edit", itemComponent);
      setNativeValue(input, text);
      simulateEvent(input, "input");
      simulateEvent(input, "keypress", KEYS.ENTER);
    },

    pressEnter: () => {
      const input = get(".edit", itemComponent);
      simulateEvent(input, "keydown", KEYS.ENTER);
    },

    pressEsc: () => {
      const input = get(".edit", itemComponent);
      simulateEvent(input, "keydown", KEYS.ESCAPE);
    },

    blur: () => {
      const input = get(".edit", itemComponent);
      simulateEvent(input, "blur");
    },

    showsLabel: () => exists(".toggle"),

    showsCheckbox: () => exists("label"),

    remove: () => {
      get(".destroy").click();
    }
  };
};

module.exports = createItemDriver;
