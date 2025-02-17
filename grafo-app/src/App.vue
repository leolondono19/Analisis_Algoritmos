<template>
  <div id="app">
    <GraphView />
  </div>
</template>

<script>
import GraphView from "./views/GraphView.vue";

export default {
  components: {
    GraphView,
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>
