<template>
  <div class="graph-container" @dblclick="handleClick" @mousemove="updateTempLine" @mouseup="endConnection">
    <svg class="canvas-svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
        </marker>
      </defs>

      <!-- Dibujar caminos -->
      <line v-for="edge in edges" :key="edge.id + '-' + edge.directed"
            :x1="edge.start.x" :y1="edge.start.y"
            :x2="edge.end.x" :y2="edge.end.y"
            stroke="black" stroke-width="3"
            :marker-end="edge.directed ? 'url(#arrow)' : ''"
            @click="debugEdge(edge)" />

      <!-- Mostrar pesos de caminos -->
      <text v-for="edge in edges" :key="'text-edge-' + edge.id"
            :x="(edge.start.x + edge.end.x) / 2"
            :y="(edge.start.y + edge.end.y) / 2 - 5"
            text-anchor="middle" font-size="14" fill="red">
        {{ edge.weight }}
      </text>

      <!-- Dibujar nodos -->
      <circle v-for="node in nodes" :key="node.id"
              :cx="node.x" :cy="node.y" r="20"
              :fill="node.color"
              @mousedown.left="startConnection(node)"
              @contextmenu.prevent="openNodeMenu(node)" />

      <!-- Mostrar nombres de nodos -->
      <text v-for="node in nodes" :key="'text-' + node.id"
            :x="node.x" :y="node.y" text-anchor="middle"
            dy="5" font-size="14" fill="black">
        {{ node.name }}
      </text>

      <!-- Línea temporal para conexiones -->
      <line v-if="tempLine" :x1="tempLine.x1" :y1="tempLine.y1"
            :x2="tempLine.x2" :y2="tempLine.y2"
            stroke="gray" stroke-width="2" stroke-dasharray="5,5" />
    </svg>

    <!-- Modal de propiedades del nodo -->
    <NodePropertiesModal ref="nodeModal" :node="selectedNode" @save="updateNode" />
  </div>
</template>

<script>
import NodePropertiesModal from './NodePropertiesModal.vue';

export default {
  props: ['mode'],
  components: {
    NodePropertiesModal
  },
  data() {
    return {
      nodes: [],
      edges: [],
      nodeCounter: 1,
      tempLine: null,
      selectedNode: null,
    };
  },
  methods: {
    handleClick(event) {
      if (this.mode === 'node') {
        this.addNode(event);
      }
    },
    addNode(event) {
      const rect = this.$el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.nodes.push({
        id: this.nodeCounter,
        x, y,
        name: this.nodeCounter.toString(),
        color: 'blue'
      });
      this.nodeCounter++;
    },
    startConnection(node) {
      if (this.mode !== 'node') {
        this.selectedNode = node;
        this.tempLine = { x1: node.x, y1: node.y, x2: node.x, y2: node.y };
      }
    },
    updateTempLine(event) {
      if (this.tempLine) {
        const rect = this.$el.getBoundingClientRect();
        this.tempLine.x2 = event.clientX - rect.left;
        this.tempLine.y2 = event.clientY - rect.top;
      }
    },
    endConnection(event) {
      if (this.selectedNode && this.mode !== 'node') {
        const rect = this.$el.getBoundingClientRect();
        const targetNode = this.nodes.find(n =>
          Math.hypot(n.x - (event.clientX - rect.left), n.y - (event.clientY - rect.top)) < 20 && n !== this.selectedNode);
        
        if (targetNode) {
          const weight = prompt("Ingrese el peso del camino:");
          if (!isNaN(weight) && weight.trim() !== "") {
            const isDirected = this.mode === 'directed';

            const dx = targetNode.x - this.selectedNode.x;
            const dy = targetNode.y - this.selectedNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const nodeRadius = 20;
            const adjustedEndX = targetNode.x - (dx / distance) * nodeRadius;
            const adjustedEndY = targetNode.y - (dy / distance) * nodeRadius;

            this.edges.push({
              id: `${this.selectedNode.id}-${targetNode.id}`,
              start: { x: this.selectedNode.x, y: this.selectedNode.y },
              end: { x: adjustedEndX, y: adjustedEndY },
              weight,
              directed: isDirected
            });
          } else {
            alert("El peso debe ser un número válido.");
          }
        }
      }
      this.tempLine = null;
      this.selectedNode = null;
    },
    openNodeMenu(node) {
      this.selectedNode = node;
      this.$nextTick(() => {
        if (this.$refs.nodeModal) {
          this.$refs.nodeModal.openModal();
        }
      });
    },
    updateNode(updatedData) {
      if(!this.selectedNode) {
        console.error("No hay un nodo seleccionado.");
        return;
      }
      const index = this.nodes.findIndex(n => n.id === this.selectedNode.id);
      if (index !== -1) {
        this.nodes[index].name = updatedData.name;
        this.nodes[index].color = updatedData.color;
      }

      //limpia selectedNode despues de actualizar
      this.selectedNode = null;

    },
    debugEdge(edge) {
      console.log("Camino seleccionado:", edge);
    },
  }
};
</script>

<style>
.graph-container {
  width: calc(100vw - 400px); 
  height: calc(100vh - 40px); 
  background: white;
  border: 5px solid black;
  position: relative;
  margin: 20px auto; 
  box-sizing: border-box; 
}
.canvas-svg {
  width: 100%;
  height: 100%;
}
</style>
