import classnames from "classnames";
const filters = ["All", "Active", "Completed"];

const filterTemplate = (h, activeFilter, onClick) => filter =>
  h("span", { key: filter }, [
    h("li", [
      h(
        "span",
        {
          domProps: { href: "#/" },
          class: classnames({
            selected: activeFilter === filter,
            [`filter-${filter}`]: true,
            btn: true
          }),
          on: {
            click: () => onClick(filter)
          }
        },
        filter
      )
    ])
  ]);

export default {
  props: ["remainingItems", "activeFilter", "onFilterChange"],
  methods: {
    onClick(filter) {
      this.onFilterChange(filter);
    }
  },

  render(h) {
    const renderFilter = filterTemplate(h, this.activeFilter, this.onClick);
    return h("footer", { class: "footer", key: "footer" }, [
      h("span", { class: "todo-count", key: "footer" }, [
        h("strong", this.remainingItems),
        h("span", " "),
        h("span", "items left")
      ]),
      h("ul", { class: "filters" }, filters.map(renderFilter))
    ]);
  }
};
