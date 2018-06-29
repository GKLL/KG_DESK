require('assets/css/common.css');
require('assets/css/navMarket.less')
require('assets/css/demo.css');
require('assets/css/iconfont.css');
import 'element-ui/lib/theme-chalk/base.css';
//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大，估计是vux OR vue 抽风了


import {Upload,Scrollbar,Radio,RadioGroup,Popover,MenuItemGroup,Loading,Alert,MessageBox,Input,Button,Row,Col,Breadcrumb,BreadcrumbItem,Autocomplete,Menu,Submenu,MenuItem,Select,Option,Dialog,Message,Checkbox,CheckboxGroup,Form,FormItem,Tag} from 'element-ui';
import Vue from 'vue';
Vue.directive('focus', function (el, option) {
        var defClass = 'el-input', defTag = 'input';
        var value = option.value || true;
        if (typeof value === 'boolean')
            value = { cls: defClass, tag: defTag, foc: value };
        else
            value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false };
        if (el.classList.contains(value.cls) && value.foc)
            el.getElementsByTagName(value.tag)[0].focus();
});
Vue.use(Scrollbar); 
Vue.use(Menu); 
Vue.use(Submenu); 
Vue.use(MenuItem); 
Vue.use(MenuItemGroup); 
Vue.use(Input); 
Vue.use(Button); 
Vue.use(Row); 
Vue.use(Col); 
Vue.use(Breadcrumb); 
Vue.use(BreadcrumbItem); 
Vue.use(Autocomplete); 
Vue.use(Dialog); 
Vue.use(Select); 
Vue.use(Option); 
Vue.use(Checkbox); 
Vue.use(CheckboxGroup); 
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Loading);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);

Vue.prototype.$message = Message;

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert  = MessageBox.alert;
Vue.prototype.$prompt  = MessageBox.prompt;

import C from './conf';
import M from './common';
import V from './verification';
// import JQ from './jquery-1.12.4.min';

import vueFilter from './vueFilter';

//解决click点击300毫秒延时问题
// import FastClick from 'fastclick';
// FastClick.attach(document.body);	

export default{
	M,C,V
}