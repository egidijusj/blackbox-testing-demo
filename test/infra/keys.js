const defineKey = ({ code, key = code, keyCode, charCode = keyCode }) => ({
  charCode,
  code,
  key,
  keyCode,
  which: charCode
});

const KEYS = {
  BACKSPACE: defineKey({ code: "Backspace", keyCode: 8 }),
  DELETE: defineKey({ code: "Delete", keyCode: 46 }),
  ENTER: defineKey({ code: "Enter", keyCode: 13 }),
  ESCAPE: defineKey({ code: "Escape", keyCode: 27 }),
  LOWERCASE_A: defineKey({ charCode: 97, code: "KeyA", key: "a", keyCode: 65 }),
  SPACE: defineKey({ code: "Space", key: " ", keyCode: 32 }),
  ARROW_UP: defineKey({ code: "ArrowUp", keyCode: 38 }),
  ARROW_LEFT: defineKey({ code: "ArrowLeft", keyCode: 37 }),
  ARROW_RIGHT: defineKey({ code: "ArrowRight", keyCode: 39 }),
  ARROW_DOWN: defineKey({ code: "ArrowDown", keyCode: 40 }),
  TAB: defineKey({ code: "Tab", keyCode: 9 })
};

module.exports = KEYS;
