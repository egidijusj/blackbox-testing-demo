const classes = el => Array.from(el.classList);

const createFooterDriver = footerComponent => {
  const get = (s, r = footerComponent) => r.querySelector(s);
  const clickFilter = filter => get(`.filter-${filter}`).click();
  const filterActive = filter =>
    classes(get(`.filter-${filter}`)).includes("selected");
  return {
    active: () => Number(get(".todo-count strong").textContent),
    clickActive: () => clickFilter("Active"),
    clickComplete: () => clickFilter("Completed"),
    clickAll: () => clickFilter("All"),
    completeActive: () => filterActive("Completed")
  };
};

module.exports = createFooterDriver;
