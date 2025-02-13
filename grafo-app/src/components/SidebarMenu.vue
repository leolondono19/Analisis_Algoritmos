<template>
  <div class="sidebar">
    <h3>Opciones</h3>
    <button @click="$emit('toggleMode', 'add')">Modo: Agregar Nodos</button>
    <button @click="$emit('toggleMode', 'connect')">Modo: Conectar Nodos</button>
    <label>
      <input type="checkbox" @change="$emit('toggleDirected', $event.target && ($event.target as HTMLInputElement).checked)">
      Caminos Dirigidos
    </label>
  </div>
</template>

<style>
.sidebar {
  width: 200px;
  background: #ddd;
  padding: 20px;
}
button {
  display: block;
  margin: 10px 0;
  padding: 10px;
}
</style>
