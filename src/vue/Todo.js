export default {
  props: ["todo", "toggle", "remove", "rename"],
  data() {
    return {
      editing: false,
      value: ""
    };
  },
  render(h) {
    const self = this;
    return h(
      "li",
      { class: { completed: this.todo.completed, editing: self.editing } },
      [
        h(
          "div",
          {
            class: "view"
          },
          [
            !self.editing &&
              h("input", {
                class: "toggle",
                domProps: {
                  type: "checkbox",
                  checked: Boolean(this.todo.completed)
                },
                on: {
                  change: this.toggle
                }
              }),
            !self.editing &&
              h(
                "label",
                {
                  on: {
                    dblclick() {
                      self.editing = true;
                      self.value = self.todo.name;
                      setImmediate(
                        () => self.$refs.input && self.$refs.input.focus()
                      );
                    }
                  }
                },
                this.todo.name
              ),
            h("button", {
              class: "destroy",
              on: {
                click() {
                  self.remove();
                }
              }
            })
          ]
        ),
        h("input", {
          class: "edit",
          ref: "input",
          domProps: { value: self.value },
          on: {
            input(e) {
              self.value = e.target.value;
            },
            blur() {
              self.value = "";
              self.editing = false;
            },
            keydown(e) {
              if (e.key === "Enter") {
                self.value === "" ? self.remove() : self.rename(self.value);
                self.editing = false;
              } else if (e.key === "Escape") {
                self.editing = false;
              }
            }
          }
        })
      ]
    );
  }
};
