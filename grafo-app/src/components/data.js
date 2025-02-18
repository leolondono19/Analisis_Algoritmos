import { defineConfigs } from "v-network-graph";

const nodes = {
  node1: { name: "N1" },
  node2: { name: "N2" },
  node3: { name: "N3" },
};

const edges = {
  edge1: { source: "node1", target: "node2" },
  edge2: { source: "node2", target: "node3" },
};

const layouts = {
  nodes: {
    node1: { x: 50, y: 0 },
    node2: { x: 0, y: 75 },
    node3: { x: 100, y: 75 },
  },
};

const configs = defineConfigs({
  node: {
    selectable: 2, // Máximo de 2 nodos seleccionables a la vez
  },
  edge: {
    selectable: true,
    normal: {
      width: 3,
      color: "#4466cc",
      dasharray: "0",
    },
    marker: {
      source: {
        type: "none", // Opciones: none, arrow, angle, circle, custom
        width: 6,
        height: 6,
        margin: 0,
        offset: 0,
        color: null, // Usa el color del camino
        units: "strokeWidth",
      },
      target: {
        type: "arrow", // Opciones: none, arrow, angle, circle, custom
        width: 6,
        height: 6,
        margin: 0,
        offset: 0,
        color: null, // Usa el color del camino
        units: "strokeWidth",
      },
    },
  },
});

export default {
  nodes,
  edges,
  layouts,
  configs,
};
