<template>
  <div class="node-properties" v-if="selectedNode">
    <h3>Editar Nodo</h3>
    <input v-model="selectedNode.name" />
  </div>
</template>

<script>
export default {
  props: ['selectedNode']
};
</script>

<style>
.node-properties {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 10px;
  border: 1px solid black;
}
</style>
