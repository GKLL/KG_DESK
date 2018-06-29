<template>
<div id="app" v-loading="loading">
	<div id="root" v-if="show">
		<p>验证成功!</p>
		<p class="time" id="main"><span id="TIME">{{sec}}</span>秒后跳转到首页</p>	
	</div>
  <div id="root2" v-else>
		<p>该链接已失效!</p>	
	</div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
 export default {
   data () {
     return {
       show: true,
       sec:3,
       loading: true
     }
   },
   methods: {
     verify () {
      var val = document.getElementById('main');
      //定时跳转
      var time1 = window.setInterval(()=>{
        --this.sec
        if(this.sec == 1){
          window.location.href = 'https://www.kg.com/';
        }
        if(this.sec == 0){
          val.innerHTML="<a href='https://www.kg.com/'>点击前往首页</a>";
          window.clearTimeout(time1);
        }
      },1000);
     }
   },
   created () {
      var verifyData = window.location.href.split('data=')[1];
      var vm = this;
       Lib.M.ajax({
            'type':'post',
            'url':'https://www.kg.com/kgApp/personal/modifyEmail?data='+verifyData,
            'success': function (data) {
              if(data.code == 10000) { //验证成功
                vm.show= true;
                vm.verify();
              }
              else vm.show = false //验证失败
              vm.loading = false;
            }
       })
   }
}


</script>

<style scoped>
.el-loading-mask {
  background-color: rgba(255,255,255,1);
}
#root, #root2 {
			margin: 0 auto;
			font-family: "微软雅黑";
			margin-top: 300px;
			text-align: center;
			color:#d6830d;
			font-size:26px;
		}
		.time{
			color:#666;
			font-size:20px;
		}
		#root a{
			text-decoration: none;
			color:#1890ff;
			font-size:16px;
		}
		@media only screen and (max-width: 768px) {
			#root,#root2 {
				margin: 0 auto;
				font-family: "微软雅黑";
				margin-top: 150px;
				text-align: center;
			}
		}
		@media only screen and (max-width: 320px) {
			#root, #root2 {
				margin: 0 auto;
				margin-top: 50px;
			}
		}
</style>

