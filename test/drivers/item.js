const {
  selectors,
  setInputValue,
  enter,
  escape,
  blur,
  doubleClick,
  hasClass
} = require("../infra/helpers")

const createItemDriver = itemComponent => {
  const { $, is } = selectors(itemComponent)
  const isCompleted = hasClass("completed")
  const isEdited = hasClass("editing")

  return {
    toggle: () => $(".toggle", itemComponent).click(),

    completed: () => isCompleted(itemComponent),

    doubleClick: () => doubleClick($("label", itemComponent)),

    editable: () => isEdited(itemComponent),

    rename: text => setInputValue($(".edit", itemComponent), text),

    pressEnter: () => enter($(".edit", itemComponent)),

    pressEsc: () => escape($(".edit", itemComponent)),

    blur: () => blur($(".edit", itemComponent)),

    showsLabel: () => is(".toggle"),

    showsCheckbox: () => is("label"),

    remove: () => $(".destroy").click()
  }
}

module.exports = createItemDriver
