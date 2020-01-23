<script>
  const getClass = (c) => {
    switch (c) {
      case "\t":
        return "tab";
      case " ":
        return "space";
      default:
        return "";
    }
  };
  export default {
    name: "TheLine",
    props: {
      text: {
        type: String,
        required: true,
      },
    },
    render: function(createElement) {
      return createElement(
        "div",
        this.text
          .split("")
          .map(c => createElement("span", { class: getClass(c) }, c)),
      );
    },
  };
</script>
<style>
  .tab, .space {
    content: "";
    width: 0.6rem;
    display: inline-block;
  }
</style>
