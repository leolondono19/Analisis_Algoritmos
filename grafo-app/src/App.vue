<template>
  <div id="app">

    <!-- Componente del grafo -->
    <GraphView :configs="configs" />
  </div>
</template>

<script>
import GraphView from "./views/GraphView.vue";
import EdgeMarkerConfig from "./components/EdgeMarkerConfig.vue";
import data from "./components/data";

export default {
  components: {
    GraphView,
    EdgeMarkerConfig,
  },
  data() {
    return {
      configs: data.configs, // Pasamos la configuración al GraphView y al EdgeMarkerConfig
    };
  },
  methods: {
    updateMarkerConfig(target, { key, value }) {
      this.configs.edge.marker[target][key] = value;
    },
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Organiza en vertical */
  align-items: center;
  background-color: #f5f5f5;
}
</style>
