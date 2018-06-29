import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './listApp';
import HbHead from 'components/HbHead';


new Vue({
  render: h => h(App)
}).$mount('#app')

