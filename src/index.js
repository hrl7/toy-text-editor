import Vue from "vue";
import Vuex from "vuex";
import Editor from "./components/editor.vue";
import createStore from "./store";

Vue.use(Vuex);
const store = createStore();

const app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);
new Vue({
  el: "#app",
  store,
  components: {
    Editor,
  },
  template: "<Editor></Editor>",
});
