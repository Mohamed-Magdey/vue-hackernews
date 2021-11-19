import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import Router from 'vue-router'
import routerConfig from './router/router-config'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'

Vue.use(Vuex)
Vue.use(Router)

const router = new Router(routerConfig)
const store = new Vuex.Store(storeConfig)
Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
