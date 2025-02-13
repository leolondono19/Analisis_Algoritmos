<template>
    <!-- Modal de Bootstrap -->
    <div class="modal fade" id="nodeModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Propiedades del Nodo</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <label>Nombre:</label>
            <input v-model="nodeName" class="form-control" />
  
            <label class="mt-2">Color:</label>
            <input type="color" v-model="nodeColor" class="form-control form-control-color" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="save">Aceptar</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css'; // Importa solo los estilos
  import { Modal } from 'bootstrap'; // Importa solo la funcionalidad del modal
  
  export default {
    props: ['node'],
    data() {
      return {
        nodeName: this.node?.name || '',
        nodeColor: this.node?.color || '#000000',
        modalInstance: null,
      };
    },
    methods: {
      save() {
        this.$emit('save', {
          name: this.nodeName.trim() || this.node.name,
          color: this.nodeColor || this.node.color,
        });
        this.closeModal();
      },
      openModal() {
        if (this.modalInstance) {
          this.modalInstance.show();
        }
      },
      closeModal() {
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      }
    },
    mounted() {
      this.modalInstance = new Modal(document.getElementById('nodeModal'));
    }
  };
  </script>
  
  <style>
  /* Asegura que el modal se vea bien */
  .modal-content {
    border-radius: 10px;
  }
  </style>
  