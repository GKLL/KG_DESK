import Vue from 'vue';
import App from './listApp';
import {Menu,Submenu,MenuItem,Carousel,CarouselItem,Badge} from 'element-ui';
import vuescroll from 'vue-scroll';
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import $ from 'jquery';
Vue.use(vuescroll)

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Badge);
Vue.use(VueVideoPlayer);

new Vue({
  render: h => h(App)
}).$mount('#app')
