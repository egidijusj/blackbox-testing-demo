const renderApp = require('../../src/app').default

module.exports = ({ beforeEach, afterEach }) => {
  let unmountApp

  beforeEach(() => {
    const newBody = document.createElement("body")
    document.body = newBody

    const rootNode = document.createElement("div")
    rootNode.id = "root"

    const appNode = document.createElement("div")
    rootNode.appendChild(appNode)

    document.body.appendChild(rootNode)
  })

  afterEach(() => {
    unmountApp && unmountApp()
  })

  return {
    render: todos => {
      const rootNode = document.querySelector("#root")
      const appNode = rootNode.querySelector('div')
      unmountApp = renderApp(appNode, { todos })
      return rootNode
    }
  }
}
