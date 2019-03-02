const { selectors, hasClass } = require("../infra/helpers");

const createFooterDriver = footerComponent => {
  const { $ } = selectors(footerComponent);
  const findButton = filter => $(`.filter-${filter}`);
  const clickButton = filter => findButton(filter).click();
  const hasClassSelected = hasClass("selected");
  const buttonSelected = filter => hasClassSelected(findButton(filter));

  return {
    active: () => Number($(".todo-count strong").textContent),

    clickActive: () => clickButton("Active"),

    clickComplete: () => clickButton("Completed"),

    clickAll: () => clickButton("All"),

    completeActive: () => buttonSelected("Completed")
  };
};

module.exports = createFooterDriver;
