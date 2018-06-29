import Vue from 'vue';
import App from './listApp';
import { Button } from 'element-ui';
Vue.use(Button)
new Vue({
  render: h => h(App)
}).$mount('#app')
