import Vue from 'vue';
import App from './listApp';
import { Message, Tooltip } from 'element-ui';
// import {Menu,Submenu,MenuItem,Carousel,CarouselItem} from 'element-ui';
/*import vuescroll from 'vue-scroll';
Vue.use(vuescroll)

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Carousel);
Vue.use(CarouselItem);*/
Vue.use(Message, Tooltip);
// http://localhost:8091/views/teacher_pupli/list.html?c=319
new Vue({
  render: h => h(App)
}).$mount('#app')
