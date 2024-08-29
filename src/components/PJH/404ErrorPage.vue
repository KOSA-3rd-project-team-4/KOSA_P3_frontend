<template>
    <div class="error-page">
      <h1>404</h1>
      <p class="error-message">File not found</p>
      <p class="error-description">
        페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
      </p>
      <p class="error-instructions">
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>
      <router-link to="/" class="documentation-link">
        홈으로 돌아가기
      </router-link>
      <img src="/src/assets/KBC/present-logo-nonbg.png" alt="Logo" class="error-logo" />
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    font-family: Arial, sans-serif;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
  }
  
  h1 {
    font-size: 6rem;
    margin-bottom: 20px;
  }
  
  .error-message {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .error-description {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .error-instructions {
    font-size: 0.9rem;
    margin-bottom: 20px;
    line-height: 1.5;
    max-width: 600px;
  }
  
  .documentation-link {
    font-size: 1rem;
    color: #0366d6;
    text-decoration: none;
    margin-bottom: 40px;
  }
  
  .documentation-link:hover {
    text-decoration: underline;
  }

  .error-logo {
    width: 80px;
    height: 80px;
    margin-top: 20px;
  }
  </style>
  