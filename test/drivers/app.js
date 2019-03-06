const { selectors, setInputValue, enter } = require("../infra/helpers")
const createItemDriver = require("./item")
const createFooterDriver = require("./footer")

const createAppDriver = appComponent => {
  const { $, $$, is } = selectors(appComponent)
  const items = () => Array.from($$(".todo-list li"))
  const item = i => items()[i]

  return {
    showsList: () => is(".main"),

    showsFooter: () => is(".footer"),

    getInputValue: () => $(".new-todo").value,

    type: text => {
      const input = $(".new-todo")
      setInputValue(input, text)
      enter(input)
    },

    getItems: () => items().map(el => el.textContent),

    item: index => createItemDriver(item(index)),

    toggleAll: () => $(".toggle-all").click(),

    toggleAllChecked: () => $(".toggle-all").checked,

    footer: () => createFooterDriver($(".footer")),

    inputFocused: () => document.activeElement === $(".new-todo")
  }
}

module.exports = createAppDriver
