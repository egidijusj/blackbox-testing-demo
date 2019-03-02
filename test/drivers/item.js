const {
  simulateEvent,
  KEYS,
  classes,
  selectors,
  setInputValue
} = require("../infra/helpers");

const createItemDriver = itemComponent => {
  const { $, is } = selectors(itemComponent);

  return {
    toggle: () => {
      $(".toggle", itemComponent).click();
    },

    completed: () => classes(itemComponent).includes("completed"),

    doubleClick: () => {
      simulateEvent($("label", itemComponent), "dblclick");
    },

    editable: () => {
      return classes(itemComponent).includes("editing");
    },

    rename: text => {
      const input = $(".edit", itemComponent);
      setInputValue(input, text);
      simulateEvent(input, "input");
      simulateEvent(input, "keypress", KEYS.ENTER);
    },

    pressEnter: () => {
      const input = $(".edit", itemComponent);
      simulateEvent(input, "keydown", KEYS.ENTER);
    },

    pressEsc: () => {
      const input = $(".edit", itemComponent);
      simulateEvent(input, "keydown", KEYS.ESCAPE);
    },

    blur: () => {
      const input = $(".edit", itemComponent);
      simulateEvent(input, "blur");
    },

    showsLabel: () => is(".toggle"),

    showsCheckbox: () => is("label"),

    remove: () => {
      $(".destroy").click();
    }
  };
};

module.exports = createItemDriver;
