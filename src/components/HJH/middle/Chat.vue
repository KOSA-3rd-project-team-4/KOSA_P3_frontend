<template>
    <div class="chat-container">
      <div class="chat-box">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          {{ msg }}
        </div>
      </div>
      <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ws: null,
        inputMessage: '',
        messages: [],
      };
    },
    methods: {
      sendMessage() {
        if (this.inputMessage.trim() !== '') {
          this.ws.send(this.inputMessage);
          this.inputMessage = '';
        }
      },
      setupWebSocket() {
        this.ws = new WebSocket('ws://localhost:8080');
  
        this.ws.onmessage = (event) => {
          // Blob 데이터를 처리하여 텍스트로 변환
          const reader = new FileReader();
          
          reader.onload = () => {
            this.messages.push(reader.result);
          };
          
          reader.readAsText(event.data);
        };
  
        this.ws.onopen = () => {
          console.log('Connected to WebSocket server');
        };
  
        this.ws.onclose = () => {
          console.log('Disconnected from WebSocket server');
        };
      },
    },
    mounted() {
      this.setupWebSocket();
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .chat-box {
    border: 1px solid #ccc;
    padding: 10px;
    height: 400px;
    overflow-y: scroll;
    margin-bottom: 10px;
  }
  
  .chat-message {
    padding: 5px;
    border-bottom: 1px solid #eee;
  }
  
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  </style>
  