import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/dist/css/materialize.css'
import M from 'materialize-css' 
require('./assets/styles.min.css')

Vue.use(Vuelidate)
Vue.use(M)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch('authenticate', token)
}

Vue.component('DefaultLayout', DefaultLayout)
Vue.component('AuthLayout', AuthLayout)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
