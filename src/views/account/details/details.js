import Vue from 'vue'
import VueRouter from 'vue-router'
import Lib from 'assets/js/Lib'
import MyColumn from './myColumn';

import MyColumnSchedule from './myColumnSchedule';
import MyColumnArticles from './myColumnArticles';
import MyColumnMedia from './myColumnMedia';
import MyColumnPass from './myColumnPass';
import MyColumnPersonal from './myColumnPersonal';
// import MyColumnPublish from './myColumnPublish';
// import MyColumnEditor from './myColumnEditor';
import MyColumnSelectType from './myColumnSelectType';
import MyColumnAward from './myColumnAward';
import InviteStu from './inviteStu';

// 邀请有奖
import inviteAward from '@/views/account/details/invite&stu/inviteAward.vue'
// 我的徒弟
import myPupli from '@/views/account/details/invite&stu/myPupli.vue';
import today from '@/views/account/details/invite&stu/today.vue';
import all from '@/views/account/details/invite&stu/all.vue';
import myTeacher from '@/views/account/details/invite&stu/myTeacher.vue';

import TiValue from './tiValue';
import myTreasure from './myTreasure';

import MyCollect from './myCollect';
import MyComment from './myComment';
import AccountSafe from './accountSafe';
import shiftIn from './shiftIn';
import shiftOut from './shiftOut';

import Sidebar from 'components/sidebar';
import HbHead from 'components/HbHead';
import {Popover,Tooltip,Tabs,TabPane,RadioButton, RadioGroup,Cascader,Upload,Pagination,Table,TableColumn,DatePicker, progress} from 'element-ui';

Lib.M.loseToken()
Vue.use(VueRouter)
Vue.use(HbHead);
Vue.use(Tabs);
Vue.use(TabPane);



Vue.use(Cascader);
Vue.use(Upload);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(DatePicker);
Vue.use(progress);
Vue.use(RadioGroup);
Vue.use(RadioButton);
// 全局引入Lib yym
Vue.prototype.$Lib=Lib;

const routes = [
  { 
  	path: '/myTreasure', 
  	components: {
      // default:TiValue,
  		default:myTreasure,
  		a:HbHead,
  		b:Sidebar
  	}
  },  
  { 
    path: '/shift_in', 
    components: {
      default:shiftIn,
      a:HbHead,
      b:Sidebar
    }
  },
  { 
    path: '/shift_out', 
    components: {
      default:shiftOut,
      a:HbHead,
      b:Sidebar
    }
  },
  { 
  	path: '/column', 
  	components: {
  		default:MyColumn,
  		a:HbHead,
  		b:Sidebar
  	}
  },
  { 
  	path: '/collect', 
  	components: {
  		default:MyCollect,
  		a:HbHead,
  		b:Sidebar
  	} 
  },  
  { 
  	path: '/comment', 
  	components: {
  		default:MyComment,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
  { 
  	path: '/account_safe', 
  	components: {
  		default:AccountSafe,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
  { 
  	path: '/schedule', 
  	components: {
  		default:MyColumnSchedule,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
    {
  	path: '/media', 
  	components: {
  		default:MyColumnMedia,
  		a:HbHead,
  		b:Sidebar
  	}
  },
    { 
  	path: '/articles', 
  	components: {
  		default:MyColumnArticles,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
    { 
  	path: '/pass', 
  	components: {
  		default:MyColumnPass,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
    { 
  	path: '/personal/', 
  	components: {
  		default:MyColumnPersonal,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
  { 
  	path: '/select_type', 
  	components: {
  		default:MyColumnSelectType,
  		a:HbHead,
  		b:Sidebar
  	} 
  },
  { 
    path: '/award', 
    components: {
      default:MyColumnAward,
      a:HbHead,
      b:Sidebar
    } 
  },  
  { 
    path: '/invite_stu', 
    components: {
      default:InviteStu,
      a:HbHead,
      b:Sidebar
		}, 
		name: 'invite_stu',
		// children: [
		// 	{path: '', component: inviteAward, name: 'inviteAward'},
		// 	{
		// 	path: 'invite_award', component: inviteAward,name: 'inviteAward'
		// },{
		// 	path: 'my_pupil', component: myPupli,name: 'myPupli',
		// 		children: [
		// 			{path: '',component: all, name: "all"},
		// 			{path: 'all', component:all, name: 'all'},
		// 			{path: 'today', component:today, name: 'today'},
		// 		]
		// }, {
		// 	path: 'my_teacher', component: myTeacher
		// }]
  },
]





const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
