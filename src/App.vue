<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  background-image: linear-gradient(
    to top,
    rgba(255, 145, 0, 0.8),
    rgba(255, 174, 0, 0.2)
  );
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
