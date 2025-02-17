<script setup>
import { reactive, ref } from "vue";
import data from "../components/data";

// Crear nodos y caminos de manera reactiva
const nodes = reactive({ ...data.nodes });
const edges = reactive({ ...data.edges });

const nextNodeIndex = ref(Object.keys(nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(edges).length + 1);

const selectedNodes = ref([]);
const selectedEdges = ref([]);

// Función para añadir nodos
function addNode() {
  const nodeId = `node${nextNodeIndex.value}`;
  const name = `N${nextNodeIndex.value}`;
  nodes[nodeId] = { name };
  nextNodeIndex.value++;
}

// Función para eliminar nodos seleccionados
function removeNode() {
  for (const nodeId of selectedNodes.value) {
    delete nodes[nodeId];
  }
  selectedNodes.value = [];
}

// Función para añadir caminos entre dos nodos seleccionados
function addEdge() {
  if (selectedNodes.value.length !== 2) return;
  const [source, target] = selectedNodes.value;
  const edgeId = `edge${nextEdgeIndex.value}`;
  edges[edgeId] = { source, target };
  nextEdgeIndex.value++;
}

// Función para eliminar caminos seleccionados
function removeEdge() {
  for (const edgeId of selectedEdges.value) {
    delete edges[edgeId];
  }
  selectedEdges.value = [];
}
</script>

<template>
  <div class="graph-container">
    <!-- Controles para añadir y eliminar nodos y caminos -->
    <div class="controls">
      <div>
        <label>Nodo:</label>
        <button @click="addNode">Añadir</button>
        <button :disabled="selectedNodes.length === 0" @click="removeNode">Eliminar</button>
      </div>
      <div>
        <label>Camino:</label>
        <button :disabled="selectedNodes.length !== 2" @click="addEdge">Añadir</button>
        <button :disabled="selectedEdges.length === 0" @click="removeEdge">Eliminar</button>
      </div>
    </div>

    <!-- Grafo interactivo -->
    <v-network-graph
      v-model:selected-nodes="selectedNodes"
      v-model:selected-edges="selectedEdges"
      :nodes="nodes"
      :edges="edges"
      :layouts="data.layouts"
      :configs="data.configs"
      class="graph"
    />
  </div>
</template>

<style>
.graph-container {
  width: 90vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white; /* Fondo del área del grafo */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
}

.controls {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.graph {
  width: 90%;
  height: 80vh;
}
</style>
