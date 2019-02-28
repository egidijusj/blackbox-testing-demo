const createFooterDriver = footerComponent => {
  const get = (s, r = footerComponent) => r.querySelector(s);
  const clickFilter = filter => get(`.filter-${filter}`).click();
  return {
    active: () => Number(get(".todo-count strong").textContent),
    clickActive: () => clickFilter("Active"),
    clickComplete: () => clickFilter("Completed"),
    clickAll: () => clickFilter("All")
  };
};

module.exports = createFooterDriver;
