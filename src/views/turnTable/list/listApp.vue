<template>
    <div id="app">
    <div class="container">
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <button class="wheel-pointer" @click="rotate_handle()" :disabled="disabled" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}" hidden></button>
                </div>               
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
      
    </div>
	   <div id= "bg">
              <div class="tostBox">
                  <div class="toast_title">提示</div>
                    <div class="toast_content">
					 {{msg}}
				    </div>
					<div class="toast_info">请添加客服微信BTC123TT索要奖品</div>
                  <div class="toast_footer">
                    <div @click="toPage">我知道了</div>
                  </div>
              </div>
        </div>
         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
    </div>
</template>
<script>
import Lib from "assets/js/Lib";
import $ from "jquery";
import MessageMobile from "components/MessageMobile";
let Base64 = require("js-base64").Base64;
import { setTimeout } from 'timers';
export default {
    components: { MessageMobile },
    data() {
    return {
	  url_id: "",
	  message:"",
	  msg:"",
	  ismessage:false,
	  disabled:false,
    prize_list: [
        {
          icon:
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/coin.png", // 奖品图片
          name: "纪念币一枚", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon:
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/none.png", // 奖品图片
          name: "再接再厉", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon:
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/10.png", // 奖品图片
          name: "手机指环支架", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon:
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/vote.png", // 奖品图片
          name: "演唱会门票", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        }
      ], //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      i: 0 //测试使用
    };
  },
  created() {
    this.init_prize_list();
  },
  computed: {
    toast_title() {
      return this.hasPrize
        ? "恭喜您，获得" +
            this.prize_list[this.i].count +
            " " +
            this.prize_list[this.i].name
        : "未中奖";
    },
    toast_pictrue() {}
  },
  mounted() {
    this.url_id = Base64.decode(Lib.M.getUrlQuery("id"));
  },
  methods: {
    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      this.rotating();
      this.i = this.i + 2;
    },
    rotating(index) {
      let userId = this.url_id;
	  const list = Lib.M.dataRequest({ userId: userId });
	  $('.wheel-pointer').attr('disabled',true)
	  const _this = this;
	  _this.disabled =true;
      Lib.M.activityAjax({
        type: "POST",
        url: "/activitys/getPrize",
        data: list,
        success: function(data) {
				var num = data.responseBody;
				if(num == 3){
					num = num -2;
				}
				if(data.code ==29010){
					_this.ismessage = true;
					_this.message = data.message;
					_this.closeMessage(2000);
					_this.disabled = false;
          $('.wheel-pointer').attr('disabled',false);
          setTimeout(()=>{
            window.location.href= '../shareHelp/list.html?id='+Base64.encode(_this.url_id);
          },2000)
					return
				}else if(data.code == 10004){
					_this.ismessage = true;
					_this.message = data.message;
					_this.closeMessage(2000);
					_this.disabled = false;
					$('.wheel-pointer').attr('disabled',false)
					window.location.href = '../lottery/list.html';
				}else if(data.code == 10000){
					if (!_this.click_flag) return;
					var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
					var during_time = 5; // 默认为1s
					var random = Math.floor(Math.random() * 7);
					var result_index = num; // 最终要旋转到哪一块，对应prize_list的下标
					var result_angle = [315, 225, 135, 45]; //最终会旋转到下标的位置所需要的度数
					var rand_circle = 6; // 附加多转几圈，2-3
					_this.click_flag = false; // 旋转结束前，不允许再次触发
					if (type == 0) {
					// 转动盘子
					var rotate_angle =
					_this.start_rotating_degree +
					rand_circle * 360 +
					result_angle[result_index] -
					_this.start_rotating_degree % 360;
					_this.start_rotating_degree = rotate_angle;
					_this.rotate_angle = "rotate(" + rotate_angle + "deg)";
					// // //转动指针
					// this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
					// this.start_rotating_degree_pointer =360*rand_circle;
				
					// 旋转结束后，允许再次触发
					setTimeout(function() {
					_this.click_flag = true; //不允许
					_this.disabled = false;
					$('.wheel-pointer').attr('disabled',false)
					_this.showBox(num);
					}, during_time * 1000 + 1500); // 延时，保证转盘转完
					} else {
						//
					}
				}else if(data.code ==29008){
                  window.location.href = '../actEnd/list.html';
        }else if(data.code ==29009){
                  window.location.href = '../actStart/list.html';
        }else{
            _this.ismessage = true;
            _this.message = data.message;
            _this.closeMessage(3000);
          	_this.disabled = false;
					  $('.wheel-pointer').attr('disabled',false)
        }	
		       }	
		 });	
		

    },
    game_over() {
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.i].isPrize;
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
	},
	showBox(num){
	    var _this = this;
		if(num ==0){
			_this.msg = "恭喜您，离富豪又近了一步抽中BTC纪念币一枚!";
			$(".toast_info").css('display','block');
			$(".tostBox").css('height','210px');
		}else if(num == 1){
      $(".toast_content").css('height','75px');
			_this.msg = "非常遗憾，您未中奖!";
		}else{
			_this.msg = "恭喜您，抽中手机指环支架一个";
			$(".toast_info").css('display','block');
			$(".tostBox").css('height','210px');
		}

       $("#bg").toggle(true)
        $("#bg").bind("touchmove", function(e) {
        e.preventDefault();
      });
       document.body.style.overflow = "hidden";
        // document.html.style.height="100%";
       document.body.style.overflow = "hidden";
       document.body.style.height = "100%";
   },
   hideBox(){
	  $("#bg").toggle(false)
       document.body.style.overflow = "visible";
       // document.html.style.height="auto";
       document.body.style.overflow = "visible";
       document.body.style.height = "auto";
   },
   toPage(){
	   const _this = this;
	   window.location.href= '../shareHelp/list.html?id='+Base64.encode(_this.url_id);
   },
    closeMessage(t) {
      setTimeout(() => {
        this.ismessage = false;
      }, t);
    },
  }
};
</script>
<style scoped>
html,
body {
  height: 100%;
  margin: 0 !important;
  padding: 0;
}
#app {
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(
    left,
    #410f46,
    #190c3f
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #410f46,
    #190c3f
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #410f46, #190c3f);
  background: linear-gradient(to right, #410f46, #190c3f);
}
.lucky-wheel {
  width: 100%;
  height: 100%;
  background-size: 100%;
  padding-top: 1.5625rem;
}
.lucky-title {
  width: 60%;
  height: 6.125rem;
  margin: 0 auto;
  background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/start.png")
    no-repeat center top;
  background-size: 100%;
  margin-top: 4rem;
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  width: 20.8375rem;
  height: 20.8375rem;
  background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/turntable.png")
    no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 5.3125rem;
  height: 5.3125rem;

}
.wheel-pointer {
  display: block;
  border:none;
  width: 5.3125rem;
  height: 5.3125rem;
  background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042101/11.png")
    no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: 4.375rem;
  left: 8.825rem;
  transform: rotate(45deg);
}
.prize-list .prize-item:nth-child(2) {
  top: 7.315rem;
  left: 9.125rem;
  transform: rotate(135deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 7.175rem;
  left: 6rem;
  transform: rotate(-135deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 4.125rem;
  left: 6.125rem;
  transform: rotate(-45deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 9.2125rem;
  left: 4.4rem;
  transform: rotate(-160deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 6.3875rem;
  left: 1.9rem;
  transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 2.8rem;
  left: 1.8125rem;
  transform: rotate(-69deg);
}
.prize-list .prize-item:nth-child(8) {
  top: 0;
  left: 4.5rem;
  transform: rotate(-20deg);
}
.prize-item {
  width: 5.875rem;
  height: 9rem;
}
.prize-pic img {
  width: 4.0625rem;
  /* height: 2.5rem; */
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.75rem;
}
.main {
  position: relative;
  width: 100%;
  min-height: 14.25rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}
.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;
  /* background: url("../assets/img/luck_bg.png") no-repeat center top; */
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}

.content {
  position: absolute;
  top: 0.175rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: 1.125rem;
  color: #ffeb39;
  padding-left: 6.75rem;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.9375rem;
  right: -0.9375rem;
  width: 2rem;
  height: 2rem;
  background-size: 100%;
}
#bg{
  display:none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 8888;
}
.tostBox{
  background: #fff;
  width:70%;
  height:190px;
  margin: 0 auto;
  border-radius: 6px;
  margin-top: 50%;

}
.toast_title{
  height:38px;
  line-height:38px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  width:100%;
  text-align: center;
  border-bottom: 1px solid rgba(238,238,238,1);
}
.toast_content{
  height:60px;
  padding-top:20px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  width:80%;
  margin: 0 auto;
  text-align: center;
 
}
.toast_info{
	width:80%;
	display:none;
	text-align: center;
	font-size:14px;
	font-family:PingFangSC-Regular;
  color:rgba(244,61,173,1);
  margin: 0 auto;
	margin-bottom: 20px;
}
.toast_footer{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  justify-content:center;
  width:90%;
  margin: 0 auto;
  
}
.toast_footer div:nth-child(1){
  width:111px;
  height:35px;
  line-height:35px;
  font-size:14px;
  text-align: center;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  background: -webkit-linear-gradient(
    left,
    #ff4180,
    #9c26f7
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #ff4180,
    #9c26f7
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #ff4180, #9c26f7);
  background: linear-gradient(
    to right,
    #ff4180,
    #9c26f7
  ); /*background:rgba(2,132,254,1);*/
  border-radius: 4px;
  text-align: center;
}
.toast_footer div:nth-child(2){
  width:111px;
  height:35px;
  line-height:35px;
  text-align: center;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  background: -webkit-linear-gradient(
    left,
    #17d6dd,
    #13ade0
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #17d6dd,
    #13ade0
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #ff4180, #9c26f7);
  background: linear-gradient(
    to right,
    #ff4180,
    #9c26f7
  ); /*background:rgba(2,132,254,1);*/
  
  border-radius: 4px;
}
</style>