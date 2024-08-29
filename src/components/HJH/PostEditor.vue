<template>
    <div class="post-editor">
      <h1>Create a New Job Posting</h1>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Job Title:</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>
  
        <div class="form-group">
          <label for="salary">Salary:</label>
          <input type="text" id="salary" v-model="form.salary" required />
        </div>
  
        <div class="form-group">
          <label for="workingHours">Working Hours:</label>
          <input type="text" id="workingHours" v-model="form.workingHours" required />
        </div>
  
        <div class="form-group">
          <label for="recruitmentPeriod">Recruitment Period:</label>
          <input type="text" id="recruitmentPeriod" v-model="form.recruitmentPeriod" required />
        </div>
  
        <div class="form-group">
          <label for="numberOfPeople">Number of People:</label>
          <input type="number" id="numberOfPeople" v-model="form.numberOfPeople" required />
        </div>
  
        <div class="form-group">
          <label for="address">Workplace Address:</label>
          <input type="text" id="address" v-model="form.address" required />
        </div>
  
        <div class="form-group full-width">
          <label for="details">Job Details:</label>
          <div ref="quillEditor" class="quill-container"></div>
        </div>
  
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  export default {
    setup() {
      const form = ref({
        title: '',
        salary: '',
        workingHours: '',
        recruitmentPeriod: '',
        numberOfPeople: 1,
        address: '',
        details: '',
      });
  
      const quillEditor = ref(null);
      let quillInstance;
  
      onMounted(() => {
        quillInstance = new Quill(quillEditor.value, {
          theme: 'snow',
          placeholder: 'Enter job details...',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          },
        });
      });
  
      const submitPost = () => {
        form.value.details = quillInstance.root.innerHTML;
        // 여기에 form 데이터를 서버로 전송하는 로직을 추가할 수 있습니다.
        console.log('Submitted Form Data:', form.value);
      };
  
      return {
        form,
        quillEditor,
        submitPost,
      };
    },
  };
  </script>
  
  <style scoped>
  .post-editor {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .form-group label {
    flex: 0 0 25px;
    font-weight: bold;
    min-width: 100px;
  }
  
  .form-group input[type="text"],
  .form-group input[type="number"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group.full-width {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  
  .form-group.full-width label {
    margin-bottom: 8px;
  }
  
  .quill-container {
    width: 100%;
  }
  
  .ql-editor {
    min-height: 300px; /* 원하는 최소 높이로 설정하세요 */
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    width: 100%;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-start;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  