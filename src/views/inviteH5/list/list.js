import Vue from 'vue';
import App from './listApp';
import { Input, Form, FormItem } from 'element-ui';
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
new Vue({
  render: h => h(App)
}).$mount('#app')
