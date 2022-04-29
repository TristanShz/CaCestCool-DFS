import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from "./routes/index.js";
import './index.css'
import store from "./store/index"
Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: Routes,
});

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
