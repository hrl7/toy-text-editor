<template>
  <div @click="handleClick">
    <h1>editor</h1>
    <div>col: {{x}}, line: {{y}}</div>
    <div class="container">
      <div class="line" v-for="text in texts">
        <TheLine :text="text" />
      </div>
      <span class="cursor" v-bind:style="{left: x * 0.6 + 'rem', top: y + 'rem'}"></span>
    </div>
    <textarea @keydown="handleKeyPress" ref="textarea"></textarea>
  </div>
</template>

<script>
  import TheLine from './line.vue'
  export default {
    name: "editor",
    components: {
      TheLine
    },
    methods: {
      handleClick: function(e) {
        this.$refs.textarea.focus();
      },
      handleKeyPress: function(e) {
        if (e.ctrlKey) {
          this.$store.commit("control", e.key);
          return;
        }
        switch (e.key) {
          case "Enter": {
            this.$store.commit("enter");
            break;
          }
          case "Backspace": {
            this.$store.commit("backspace");
            break;
          }
          case "ArrowLeft":
          case "ArrowRight":
          case "ArrowUp":
          case "ArrowDown": {
            this.$store.commit("arrow", e.key.replace("Arrow", ""));
            break;
          }
          case "Tab":
            e.preventDefault()
            this.$store.commit("addCharacter", "\t");
            break;
          case "Control":
          case "Meta":
          case "Shift":
          case "Alt":
            break;
          default:
            this.$store.commit("addCharacter", e.key);
        }
      },
    },
    computed: {
      texts() {
        return this.$store.getters.texts;
      },
      x() {
        return this.$store.state.currentX;
      },
      y() {
        return this.$store.state.currentY;
      },
    },
  };
</script>

<style>
  textarea {
    position: fixed;
    left: -100vw;
  }

  .line {
    content: "";
    height: 1rem;
  }

  .container {
    font-family: "Courier New";
    position: relative;
  }
  .cursor {
    width: 0.5rem;
    height: 1rem;
    position: absolute;
    background-color: gray;
  }
</style>
