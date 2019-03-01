import { remove, rename } from "../model";

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

// {
//   /* <input */
// }
//           ref={ref => (this.input = ref)}
//           className="edit"
//           value={value}
//           onChange={e =>
//             this.setState({ editing: true, value: e.target.value })
//           }
//           onBlur={() => this.setState({ editing: false })}
//           onKeyDown={e => {
//             if (e.key === "Enter") {
//               value === "" ? remove() : rename(value);
//               this.setState({ editing: false });
//             } else if (e.key === "Escape") {
//               this.setState({ editing: false });
//             }
//           }}
//         />

// import React, { Component } from "react";
// import classnames from "classnames";

// class Todo extends Component {
//   constructor() {
//     super();
//     this.state = {
//       editing: false,
//       value: ""
//     };
//   }

//   render() {
//     const { todo, toggle, rename, remove } = this.props;
//     const { editing, value } = this.state;
//     return (
//       <li className={classnames({ completed: todo.completed, editing })}>
//         <div className="view">
//           {!editing && (
//             <input
//               className="toggle"
//               type="checkbox"
//               checked={Boolean(todo.completed)}
//               onChange={toggle}
//             />
//           )}
//           {!editing && (
//             <label
//               onDoubleClick={() => {
//                 this.setState({ editing: true, value: todo.name });
//                 setImmediate(() => this.input && this.input.focus());
//               }}
//             >
//               {todo.name}
//             </label>
//           )}
//           <button className="destroy" onClick={remove} />
//         </div>
//         <input
//           ref={ref => (this.input = ref)}
//           className="edit"
//           value={value}
//           onChange={e =>
//             this.setState({ editing: true, value: e.target.value })
//           }
//           onBlur={() => this.setState({ editing: false })}
//           onKeyDown={e => {
//             if (e.key === "Enter") {
//               value === "" ? remove() : rename(value);
//               this.setState({ editing: false });
//             } else if (e.key === "Escape") {
//               this.setState({ editing: false });
//             }
//           }}
//         />
//       </li>
//     );
//   }
// }

// export default Todo;
