// Codigo experimental para importar y exportar sin afectar el resto de Codigo

<script setup>
import * as vNG from "v-network-graph";
import { onMounted, reactive, ref, watch } from "vue";
import data from "../components/data";
import EdgeMarkerConfig from "../components/EdgeMarkerConfig.vue";

//vista pdf
import PdfViewer from '../components/PdfViewer.vue';

export default {
  components: {
    PdfViewer
  }
};
// Configuración del grafo
const configs = reactive(
  vNG.defineConfigs({
    node: {
      selectable: true, // Permitir selección de nodos
      label:{
        visible: true,
        direction: "south",
        directionAutoAdjustment: true,
      }
    },
    edge: {
      selectable: true, // Permitir selección de caminos
      marker: {
        source: {
          type: "none",
          width: 4,
          height: 4,
          margin: -1,
          offset: 0,
          units: "strokeWidth",
          color: null,
        },
        target: {
          type: "arrow",
          width: 4,
          height: 4,
          margin: -1,
          offset: 0,
          units: "strokeWidth",
          color: null,
        },
      },
    },
  })
);

// Datos del grafo (reactivos)
const nodes = reactive({ ...data.nodes });
const edges = reactive({ ...data.edges });

const nextNodeIndex = ref(Object.keys(nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(edges).length + 1);

const selectedNodes = ref([]);
const selectedEdges = ref([]);

// 🚀 Añadir nodo en la posición clickeada
function addNode(event) {
  const nodeId = `node${nextNodeIndex.value}`;
  nodes[nodeId] = {
    name: `N${nextNodeIndex.value}`,
    x: event?.offsetX || Math.random() * 500,
    y: event?.offsetY || Math.random() * 500,
  };
  nextNodeIndex.value++;
}

// ❌ Eliminar nodos seleccionados
function removeNode() {
  for (const nodeId of selectedNodes.value) {
    delete nodes[nodeId];

    // Eliminar caminos relacionados con el nodo eliminado
    Object.keys(edges).forEach((edgeId) => {
      if (edges[edgeId].source === nodeId || edges[edgeId].target === nodeId) {
        delete edges[edgeId];
      }
    });
  }
  selectedNodes.value = [];
}

// 🚀 Añadir caminos entre dos nodos seleccionados
function addEdge() {
  if (selectedNodes.value.length !== 2) return;
  const [source, target] = selectedNodes.value;
  const edgeId = `edge${nextEdgeIndex.value}`;
  edges[edgeId] = { source, target };
  nextEdgeIndex.value++;
}

// ❌ Eliminar caminos seleccionados
function removeEdge() {
  for (const edgeId of selectedEdges.value) {
    delete edges[edgeId];
  }
  selectedEdges.value = [];
}

// 🔄 Exportar el grafo a un archivo JSON
function exportGraph() {
  const graphData = JSON.stringify({ nodes, edges }, null, 2);
  const blob = new Blob([graphData], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "grafo.json";
  link.click();
}

// 📂 Importar un archivo JSON para cargar un grafo
function importGraph(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      Object.keys(nodes).forEach((key) => delete nodes[key]); // Limpiar nodos actuales
      Object.keys(edges).forEach((key) => delete edges[key]); // Limpiar caminos actuales

      Object.assign(nodes, importedData.nodes); // Cargar nodos desde JSON
      Object.assign(edges, importedData.edges); // Cargar caminos desde JSON

      nextNodeIndex.value = Object.keys(nodes).length + 1;
      nextEdgeIndex.value = Object.keys(edges).length + 1;
    } catch (error) {
      alert("Error al importar el archivo. Verifique el formato JSON.");
    }
  };
  reader.readAsText(file);
}

// ⚡ Habilitar selección múltiple con Shift
onMounted(() => {
  window.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
      configs.node.selectable = "multiple";
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
      configs.node.selectable = true;
    }
  });
});

// ⚡ Sincronizar nodos y caminos al eliminar elementos
watch(selectedNodes, () => {
  selectedEdges.value = selectedEdges.value.filter((edgeId) => edges[edgeId]);
});
</script>

<template>
  <div class="graph-container">
    <!-- Sección del grafo -->
    <div class="graph-content">
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
        <div>
          <label>Guardar/Cargar:</label>
          <button @click="exportGraph">Exportar</button>
          <input type="file" @change="importGraph" accept=".json" />
        </div>
      </div>

      <!-- Grafo -->
      <v-network-graph
        v-model:selected-nodes="selectedNodes"
        v-model:selected-edges="selectedEdges"
        :nodes="nodes"
        :edges="edges"
        :layouts="data.layouts"
        :configs="configs"
        class="graph"
      />
    </div>

    <!-- Panel de Configuración de Caminos -->
    <div class="config-panel">
      <h3>Configuración de Caminos</h3>
      <h4>Inicio (Source)</h4>
      <EdgeMarkerConfig v-model:marker="configs.edge.marker.source" />

      <h4>Fin (Target)</h4>
      <EdgeMarkerConfig v-model:marker="configs.edge.marker.target" />
    </div>
  </div>
</template>

<style scoped>
.graph-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.graph-content {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.graph {
  width: 100%;
  height: 80vh;
}

/* Estilo para el panel de configuración */
.config-panel {
  flex: 1;
  background-color: #f0f0f0;
  border-left: 2px solid #ccc;
  padding: 20px;
  overflow-y: auto;
}
</style>
