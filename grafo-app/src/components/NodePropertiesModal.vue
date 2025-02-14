<template>
  <div class="modal fade" id="nodeModal" tabindex="-1" aria-hidden="true" ref="nodeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Nodo</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <label>Nombre:</label>
          <input v-model="nodeName" type="text" class="form-control" />
          <label>Color:</label>
          <input v-model="nodeColor" type="color" class="form-control" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="saveChanges">Aceptar</button>
          <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

export default {
  props: ['node'],
  data() {
    return {
      nodeName: '',
      nodeColor: '#000000',
      modalInstance: null,
    };
  },
  watch: {
    node: {
      immediate: true,
      handler(newNode) {
        if (newNode) {
          this.nodeName = newNode.name;
          this.nodeColor = newNode.color.startsWith("#") ? newNode.color : "#000000";
        }
      }
    }
  },
  methods: {
    saveChanges() {
      this.$emit('save', { name: this.nodeName, color: this.nodeColor });
      this.closeModal();
    },
    openModal() {
      this.$nextTick(() => {
        if (!this.modalInstance) {
          this.modalInstance = new Modal(this.$refs.nodeModal, {});
        }
        this.modalInstance.show();
      });
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    }
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
.modal-content {
  padding: 20px;
  border-radius: 5px;
}
</style>
