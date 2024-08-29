<template>
    <div class="editor-container">
      <div ref="quillEditor"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  export default {
    setup() {
      const quillEditor = ref(null);
      let quillInstance;
  
      onMounted(() => {
        quillInstance = new Quill(quillEditor.value, {
          theme: 'snow',
          placeholder: 'Compose an epic...',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
  
              [{ list: 'ordered'}, { list: 'bullet' }],
              [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
              [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
              [{ direction: 'rtl' }],                         // text direction
  
              [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
              [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
  
              ['link', 'image', 'video'],
  
              ['clean']                                         // remove formatting button
            ]
          }
        });
      });
  
      return {
        quillEditor,
      };
    }
  };
  </script>
  
  <style scoped>
  .editor-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .ql-editor {
    min-height: 300px;
  }
  </style>
  