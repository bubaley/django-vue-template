import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

window.axios = require('axios')
window.axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
window.axios.defaults.headers.common = {'Accept-Language': 'ru-ru'}
window.axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://127.0.0.1:8000' : ''


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
