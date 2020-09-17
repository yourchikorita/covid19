import Vue from 'vue'
import App from './App.vue'
import router from './routs/index'
import {store} from './store/index'
import ChartPlugin from './plugins/ChartPlugin'



Vue.use(ChartPlugin);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
