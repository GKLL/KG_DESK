import Vue from 'vue';
import App from './listApp';
import {Menu,Submenu,MenuItem} from 'element-ui';
import vuescroll from 'vue-scroll';
Vue.use(vuescroll)

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);




new Vue({
  render: h => h(App)
}).$mount('#app')
