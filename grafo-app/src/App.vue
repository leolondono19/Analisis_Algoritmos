<template>
  <div id="app">
    <!-- Menú -->
    <div class="menu">
      <button @click="setMode('node')">Crear Nodo</button>
      <button @click="setMode('directed')">Camino Dirigido</button>
      <button @click="setMode('undirected')">Camino No Dirigido</button>
    </div>

    <!-- Canvas -->
    <GraphCanvas :mode="mode" />
  </div>
</template>

<script>
import GraphCanvas from "./components/GraphCanvas.vue";

export default {
  components: {
    GraphCanvas
  },
  data() {
    return {
      mode: 'node', // 'node', 'directed', 'undirected'
    };
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.menu {
  background: rgba(115, 160, 228, 0.9);
  padding: 10px;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.menu button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

.menu button:hover {
  background: #0056b3;
}
</style>
