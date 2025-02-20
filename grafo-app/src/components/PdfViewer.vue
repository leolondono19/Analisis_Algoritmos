<template>
    <div>
      <!-- Botón fijo en la parte superior izquierda -->
      <button class="help-button" @click="togglePopup">
        ?
      </button>
  
      <!-- Ventana emergente -->
      <div v-if="isPopupVisible" class="popup-overlay" @click="togglePopup">
        <div class="popup-content" @click.stop>
          <iframe :src="pdfUrl" class="pdf-viewer"></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isPopupVisible: false,
        //pdfUrl: '../src/documents/manual.pdf' // C:\Users\Usuario\Github\algoritmos\Analisis_Algoritmos\grafo-app\src\documents\manual.pdf
        pdfUrl: 'public/manual.pdf',
    };
    },
    methods: {
      togglePopup() {
        this.isPopupVisible = !this.isPopupVisible;
      }
    }
  };
  </script>
  
  <style scoped>
  .help-button {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .popup-content {
    width: 33.33%;
    height: 33.33%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .pdf-viewer {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>