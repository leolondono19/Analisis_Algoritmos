<!-- EdgeMarkerConfig.vue Basico pero el codigo funciona-->
<script setup>
import { defineProps, defineEmits, reactive, watch } from "vue";
import { ElTabs, ElTabPane } from "element-plus";

// Recibir la configuración desde App.vue
const props = defineProps(["markerConfig"]);
const emit = defineEmits(["update"]);

// Crear una copia reactiva de los valores para evitar modificar `props` directamente
const localConfigs = reactive({
  source: { ...props.markerConfig.source },
  target: { ...props.markerConfig.target },
});

// Sincronizar cambios con `props.markerConfig` cuando cambie
watch(
  () => props.markerConfig,
  (newVal) => {
    if (newVal) {
      localConfigs.source = { ...newVal.source };
      localConfigs.target = { ...newVal.target };
    }
  },
  { deep: true, immediate: true }
);

// Emitir cambios cuando se edita la configuración
function updateMarkerConfig(target, key, value) {
  emit("update", target, { key, value });
}
</script>

<template>
  <div class="edge-marker-config">
    <el-tabs type="border-card">
      <el-tab-pane label="Marker">
        <div>
          <label>Source Arrow Size:</label>
          <input type="number" v-model="localConfigs.source.width" @input="updateMarkerConfig('source', 'width', localConfigs.source.width)" />
          <input type="number" v-model="localConfigs.source.height" @input="updateMarkerConfig('source', 'height', localConfigs.source.height)" />
        </div>
        <div>
          <label>Target Arrow Size:</label>
          <input type="number" v-model="localConfigs.target.width" @input="updateMarkerConfig('target', 'width', localConfigs.target.width)" />
          <input type="number" v-model="localConfigs.target.height" @input="updateMarkerConfig('target', 'height', localConfigs.target.height)" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.edge-marker-config {
  width: 100%;
  background: white;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
}
</style>
