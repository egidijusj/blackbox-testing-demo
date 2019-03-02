export default {
  props: ["onAdd"],
  data() {
    return { input: "" };
  },
  mounted() {
    setImmediate(() => this.$refs.input && this.$refs.input.focus(), 0);
  },
  render(h) {
    const self = this;
    return h("header", { class: "header" }, [
      h("h1", "todos"),
      h("input", {
        class: "new-todo",
        attrs: {
          placeholder: "What needs to be done?"
        },
        domProps: {
          value: self.input
        },
        ref: "input",
        on: {
          input: e => {
            self.input = e.target.value;
          },
          keydown: e => {
            if (e.key === "Enter") {
              self.input !== "" && self.onAdd(self.input.trim());
              self.input = "";
            }
          }
        }
      })
    ]);
  }
};
