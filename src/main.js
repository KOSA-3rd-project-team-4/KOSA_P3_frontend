import { createApp } from 'vue'
import router from './router';
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
   



// import Vue from 'vue'
// import App from './App.vue'
// import router from './router';

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')