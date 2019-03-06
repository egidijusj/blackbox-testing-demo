const eventually = require("@wix/wix-eventually").with({
  timeout: 10
})
const setupDom = require("./infra/dom")
const createTodosDriver = require("./drivers/app")

describe("Todos", () => {
  const { render } = setupDom({ beforeEach, afterEach })

  const setup = (todos = []) => {
    const appComponent = render(todos)
    const driver = createTodosDriver(appComponent)
    return driver
  }

  test("should focus input initially", async () => {
    const todos = setup()
    await eventually(() => expect(todos.inputFocused()).toBeTruthy())
  })

  describe("given no todos", async () => {
    test("should hide list", async () => {
      const todos = setup()
      expect(todos.showsList()).toBe(false)
    })

    test("should hide footer", async () => {
      const todos = setup()
      expect(todos.showsFooter()).toBe(false)
    })
  })

  describe("new todo", async () => {
    test("should create todo on enter keypress", async () => {
      const todos = setup()
      todos.type("New todo")
      await eventually(() => expect(todos.getItems()).toEqual(["New todo"]))
    })

    test("should clear input when todo is added", async () => {
      const todos = setup()
      todos.type("New todo")
      await eventually(() => expect(todos.getInputValue()).toEqual(""))
    })

    test("should append new todo to the bottom of the list", async () => {
      const todos = setup([{ name: "Old todo" }])
      todos.type("New todo")
      await eventually(() =>
        expect(todos.getItems()).toEqual(["Old todo", "New todo"])
      )
    })

    test("should trim todo name", async () => {
      const todos = setup()
      todos.type(" New todo  ")
      await eventually(() => expect(todos.getItems()).toEqual(["New todo"]))
    })

    test("should show list when item is added", async () => {
      const todos = setup()
      todos.type("New todo")
      await eventually(() => expect(todos.showsList()).toBe(true))
    })

    test("should show footer when item is added", async () => {
      const todos = setup()
      todos.type("New todo")
      await eventually(() => expect(todos.showsFooter()).toBe(true))
    })
  })

  describe("existing todo", () => {
    test("allows to mark as active completed", async () => {
      const todos = setup([{ name: "Old todo" }])
      const item = todos.item(0)
      item.toggle()
      await eventually(() => expect(item.completed()).toEqual(true))
    })

    test("allows to mark as active", async () => {
      const todos = setup([{ name: "Old todo", completed: true }])
      const item = todos.item(0)
      item.toggle()
      await eventually(() => expect(item.completed()).toEqual(false))
    })

    describe("editing", () => {
      test("shows input on double-click", async () => {
        const todos = setup([{ name: "Old todo" }])
        const item = todos.item(0)
        item.doubleClick()
        await eventually(() => expect(item.editable()).toEqual(true))
      })

      test("hides label when editing", async () => {
        const todos = setup([{ name: "Old todo" }])
        const item = todos.item(0)
        item.doubleClick()
        await eventually(() => expect(item.showsLabel()).toEqual(false))
      })

      test("hides checkbox when editing", async () => {
        const todos = setup([{ name: "Old todo" }])
        const item = todos.item(0)
        item.doubleClick()
        await eventually(() => expect(item.showsCheckbox()).toEqual(false))
      })

      test("allows to change name", async () => {
        const todos = setup([{ name: "Old todo" }])
        const item = todos.item(0)
        item.doubleClick()
        item.rename("Updated todo")
        item.pressEnter()
        await eventually(() =>
          expect(todos.getItems()).toEqual(["Updated todo"])
        )
      })

      test("cancels editing on ESC keypress", async () => {
        const todos = setup([{ name: "Old todo" }])
        const item = todos.item(0)
        item.doubleClick()
        item.rename("Updated todo")
        item.pressEsc()
        expect(item.editable()).toEqual(false)
      })

      test("cancels editing on blur", async () => {
        const todos = setup([{ name: "Old todo", completed: true }])
        const item = todos.item(0)
        item.doubleClick()
        item.blur()
        expect(item.editable()).toEqual(false)
      })

      test("removes todo when empty string is submited", async () => {
        const todos = setup([{ name: "Old todo" }])
        const item = todos.item(0)
        item.doubleClick()
        item.rename("")
        item.pressEnter()
        await eventually(() => expect(todos.getItems()).toEqual([]))
      })
    })
  })

  describe("todos list", () => {
    test("renders multiple todos", () => {
      const todos = setup([{ name: "A" }, { name: "B" }, { name: "C" }])
      expect(todos.getItems()).toEqual(["A", "B", "C"])
    })

    describe("toggle all", () => {
      test("marks all active todos completed", async () => {
        const todos = setup([{ name: "A" }, { name: "B" }])
        todos.toggleAll()
        await eventually(() => {
          expect(todos.item(0).completed()).toBeTruthy()
          expect(todos.item(1).completed()).toBeTruthy()
        })
      })

      test("marks mixed todos all completed", async () => {
        const todos = setup([{ name: "A", completed: true }, { name: "B" }])
        todos.toggleAll()
        await eventually(() => {
          expect(todos.item(0).completed()).toBeTruthy()
          expect(todos.item(1).completed()).toBeTruthy()
        })
      })

      test("renders checkbox checked when all todos are completed", () => {
        const todos = setup([
          { name: "A", completed: true },
          { name: "B", completed: true }
        ])
        expect(todos.toggleAllChecked()).toBeTruthy()
      })

      test("renders checkbox unchecked when some todos are not completed", () => {
        const todos = setup([
          { name: "A", completed: false },
          { name: "B", completed: true }
        ])
        expect(todos.toggleAllChecked()).toBeFalsy()
      })
    })
  })

  describe("footer", () => {
    test("shows number of active todos", () => {
      const todos = setup([{ name: "A" }, { name: "B" }])
      expect(todos.footer().active()).toEqual(2)
    })

    test("shows zero when there are no active todos", () => {
      const todos = setup([
        { name: "A", completed: true },
        { name: "B", completed: true }
      ])
      expect(todos.footer().active()).toEqual(0)
    })

    test("filters active todos", async () => {
      const todos = setup([
        { name: "A", completed: false },
        { name: "B", completed: true }
      ])
      todos.footer().clickActive()
      await eventually(() => expect(todos.getItems()).toEqual(["A"]))
    })

    test("filters complete todos", async () => {
      const todos = setup([
        { name: "A", completed: false },
        { name: "B", completed: true }
      ])
      todos.footer().clickComplete()
      await eventually(() => expect(todos.getItems()).toEqual(["B"]))
    })

    test("shows all todos", async () => {
      const todos = setup([
        { name: "A", completed: false },
        { name: "B", completed: true }
      ])
      todos.footer().clickComplete()
      await eventually(() => expect(todos.getItems()).toEqual(["B"]))
      todos.footer().clickAll()
      await eventually(() => expect(todos.getItems()).toEqual(["A", "B"]))
    })

    test("marks clicked filter active", async () => {
      const todos = setup([{ name: "A", completed: false }])
      todos.footer().clickComplete()
      await eventually(() =>
        expect(todos.footer().completeActive()).toBeTruthy()
      )
    })
  })
})
