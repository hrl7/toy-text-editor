import Vuex from "vuex";
import Vue from "vue";

const moveCursor = (state, dx = 0, dy = 0) => {
  let x = state.currentX,
    y = state.currentY,
    texts = state.texts,
    line = "";
  x += dx;
  y += dy;
  if (y < texts.length && y >= 0) {
  }
  if (texts.length > 0 && y > texts.length - 1) {
    y = texts.length - 1;
  }
  line = texts[y];
  if (!line) {
    line = "";
    Vue.set(state.texts, y, line);
  }
  if (x >= line.length) {
    x = line.length;
  }
  if (y < 0) {
    y = 0;
  }
  if (x < 0) {
    x = 0;
  }
  return { x, y };
};

const createStore = () =>
  new Vuex.Store({
    state: {
      texts: [""],
      currentX: 0,
      currentY: 0,
    },
    mutations: {
      addCharacter(state, key) {
        let line = state.texts[state.currentY];
        const latterStr = line.substring(state.currentX);
        const formerStr = line.substring(0, state.currentX);
        console.log(formerStr, latterStr, formerStr + key + latterStr);
        Vue.set(state.texts, state.currentY, formerStr + key + latterStr);
        state.currentX++;
      },
      enter(state) {
        state.currentY++;
        if (!state.texts[state.currentY]) {
          state.texts[state.currentY] = "";
          state.currentX = 0;
        }
      },
      control(state, key) {
        console.log("C-", key);
        switch (key) {
          case "a":
            state.currentX = 0;
            break;
          case "e":
            state.currentX = state.texts[state.currentY].length;
            break;
          case "p": {
            const { x, y } = moveCursor(state, 0, -1);
            state.currentX = x;
            state.currentY = y;
            break;
          }
          case "n": {
            const { x, y } = moveCursor(state, 0, 1);
            state.currentX = x;
            state.currentY = y;
            break;
          }
        }
      },
      arrow(state, dir) {
        console.log(dir);
        let r;
        switch (dir) {
          case "Left":
            r = moveCursor(state, -1, 0);
            break;
          case "Right":
            r = moveCursor(state, 1, 0);
            break;
          case "Up":
            r = moveCursor(state, 0, -1);
            break;
          case "Down":
            r = moveCursor(state, 0, 1);
            break;
        }
        state.currentX = r.x;
        state.currentY = r.y;
      },
      backspace(state) {
        const lineStr = state.texts[state.currentY];
        let line = lineStr.split("");
        console.log(line, state.currentX);
        const x = state.currentX - 1;
        if (x > -1) {
          line.splice(x, 1);
          state.currentX--;
        }
        console.log(line);

        Vue.set(state.texts, state.currentY, line.join(""));
      },
    },
    getters: {
      texts: state => state.texts,
    },
  });

export default createStore;
