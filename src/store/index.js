import Vuex from "vuex";
import Vue from "vue";

const createStore = () =>
  new Vuex.Store({
    state: {
      texts: [""],
      currentX: 0,
      currentY: 0,
    },
    mutations: {
      addCharacter(state, key) {
        Vue.set(state.texts, state.currentY, state.texts[state.currentY].concat(key));
        state.currentX++;
      },
      enter(state) {
        state.currentY++;
        if (!state.texts[state.currentY]) {
          state.texts[state.currentY] = "";
          state.currentX = 0;
        }
      },
      arrow(state, dir) {
        console.log(dir);
      },
      backspace(state) {
        const lineStr = state.texts[state.currentY];
        let line = lineStr.split("");
        console.log(line, state.currentX)
        const x = state.currentX - 1;
        if (x > -1) {
          line.splice(x, 1);
          state.currentX--;
        }
        console.log(line)

        Vue.set(state.texts, state.currentY, line.join(""));
      },
    },
    getters: {
      texts: state => state.texts,
    },
  });

export default createStore;
