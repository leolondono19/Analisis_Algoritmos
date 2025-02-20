<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  marker: Object, // Recibe la configuración del marcador (source o target)
});

const emit = defineEmits(["update:marker"]);
</script>

<template>
  <div class="marker-config">
    <label>Tipo:</label>
    <select v-model="props.marker.type" @change="emit('update:marker', props.marker)">
      <option value="none">Ninguno</option>
      <option value="arrow">Flecha</option>
      <option value="angle">Ángulo</option>
      <option value="circle">Círculo</option>
      <option value="custom">Personalizado</option>
    </select>

    <label>Ancho:</label>
    <input type="number" v-model="props.marker.width" @input="emit('update:marker', props.marker)" />

    <label>Alto:</label>
    <input type="number" v-model="props.marker.height" @input="emit('update:marker', props.marker)" />

    <label>Margen:</label>
    <input type="number" v-model="props.marker.margin" @input="emit('update:marker', props.marker)" />

    <label>Offset:</label>
    <input type="number" v-model="props.marker.offset" @input="emit('update:marker', props.marker)" />

    <label>Color:</label>
    <input type="color" v-model="props.marker.color" @input="emit('update:marker', props.marker)" />

    <label>Unidad:</label>
    <select v-model="props.marker.units" @change="emit('update:marker', props.marker)">
      <option value="strokeWidth">Stroke Width</option>
      <option value="userSpaceOnUse">User Space On Use</option>
    </select>
  </div>
</template>

<style scoped>
.marker-config {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
  margin-top: 5px;
}
</style>
