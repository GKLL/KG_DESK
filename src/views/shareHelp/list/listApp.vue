<template>
<div id="app">
    <div class = 'container' >
		<div class="cont">
        <div class="logoBox2">
          <div class="img1"><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg2.png" class="logo"/></div>
          <div class="img2"><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg5.png" class="logo"/></div>
        </div>
        <div class="avart">
            <div class="avImg">
				<span>帮主</span>
				<img  :src="imgUrl+headImage" v-if="headImage!=null"/>
				<img v-else src="../../../assets/img/avatar.png">
				
            </div>
        </div>
        <p class="nickName">{{nickName}}</p>
		<div v-if="isLogin&&length!=10">
			<div>
				<p class="p1">已有{{inviteNum}}人助力，还差<span>{{10-inviteNum}}</span>人,继续分享吧</p>
				<p class="p2">杰伦成都演唱会VIP前15排门票，只有4张，抽中即止！</p>
				<p class="p2">满10人助力成功，就有一次抽奖机会哦！</p>
			</div>
			<div class="shareBtn">
				<span @click="showBox">分享好友一起助力</span>	
			</div>
			<p class="p4">助力期：4月25日13:14—4月29日20:00截止</p>
		</div>
		<div v-else-if="isLogin&&length==10">
			<div>
				<p class="p1">已邀请10人，可以抽奖了！</p>
				<p class="p3">赢周杰伦成都演唱会VIP前15排门票！</p>
			</div>
			<div class="shareBtn" v-if="isDraw ==0">
				<span @click="turnTable">马上抽奖</span>	
			</div>
			<div class="disBtn" v-else>
				<span>马上抽奖</span>	
			</div>
      <div class="p2" v-if="isDraw ==0">
				<span @click="turnTable">一次机会，要珍惜哦！</span>	
			</div>
			<p class="p2" v-if="prizeIndex!=null">
				{{prizeIndex === 0?'您获得的奖品：BTC纪念币一枚':null}}
				{{prizeIndex === 1?'很遗憾，您未中奖!':null}}
				{{prizeIndex === 2?'您获得的奖品：手机指环支架一个':null}}
			</p>
      <p class="p2" v-if="prizeIndex ==0 ||prizeIndex ==2">
				请添加客服微信BTC123TT索要奖品
			</p>
		</div>
		<div v-else>
			<div>
				<p class="p1">TA还差<span>{{10-inviteNum}}</span>人，为他助力,赢周杰伦</p>
				<p class="p3">成都演唱会VIP前15排门票！</p>
		    </div>
			<div class="shareCode">
				<span>ta的助力码：{{inviteCode}}</span>	
			</div>
       <div class="shareBtn" v-if = "length == 10">
			    <span @click="showSuc">帮TA助力</span>	
		    </div>
			  <div class="shareBtn" v-else>
			    <span @click="invitePage">帮TA助力</span>	
		    </div>
		    <p class="p4">助力期：4月25日13:14—4月29日20:00截止，加油啊，老铁！</p>
		</div>
		<div class="friendBox">
			<div class="login">
				<div class="login_content">  
					<div>助力帮</div>  
				</div>
			</div>
			<div class="fImg">
				<div v-for="(item,index) in inviteUsers" >
					<img v-if= "item.headImage ==null" src="../../../assets/img/avatar.png"/>
					<img v-else-if = "item.headImage ==''" src="../../../assets/img/avatar.png" />
          <img v-else  :src="imgUrl+item.headImage" />
				</div>
				<div v-for="item in (10-inviteUsers.length)"><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				
			</div>
		</div>
		<div class="txt" v-if="isLogin&&length!=10">
			<img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg4.png"/>
		</div>
		</div>
	
		<div  v-if="isLogin && length!=10">
		<div class="ruleBox">
			<div class="login">
				<div class="login_content">  
					<div>活动规则</div>  
				</div>
			</div>
			<p>1.新用户注册，用户通过带有邀请码的链接，邀请10位好友注册千氪财经；</p>
			<p>2.邀请10名新人成功注册千氪财经，获得一次抽奖机会。</p>
      <div class="login">
				<div class="login_content">  
					<div>规则说明</div>  
				</div>
			</div>
			<p>1.用户需如实填写资料，奖品一律按照千氪注册用户资料发放；</p>
			<p>2.为保证公平公正，以防不法分子进行转票等行径，获得演唱会门票的用户，需拍一张和千氪财经字样的kt板及门票合影，进行公开。</p>
			<p>3.本次抽奖活动与官方演唱会无关，千氪财经享有最终解释权。</p>
		</div>
		</div>
		<div  v-else-if="isLogin && length==10">
		<div class="ruleBox2" >
      <div class="login">
				<div class="login_content">  
					<div>助力须知</div>  
				</div>
			</div>
			<p>1.邀请好友满10人注册千氪帐号，视为助力成功。</p>
			<p>2.助力成功后，您即可获取一次杰伦演唱会门票的抽奖资格。</p>
			<p>3.四张杰伦成都演唱会VIP前15排门票，抽完即止。</p>
		</div>
		<div class="logoFooter">
			<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg6.png"/></div>
			<div class="Info">本活动最终解释权归千氪所有</div>
		</div>
		</div>
		<div v-else>
		<div class="ruleBox2" >
			<div class="login">
				<div class="login_content">  
					<div>助力须知</div>  
				</div>
			</div>
			<p>1.邀请好友满10人注册千氪帐号，视为助力成功。</p>
			<p>2.助力成功后，TA即可获取一次杰伦演唱会门票的抽奖资格。</p>
			<p>3.四张杰伦成都演唱会VIP前15排门票，抽完即止。</p>
		</div>
		<div class="logoFooter">
			<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg6.png"/></div>
			<div class="Info">本活动最终解释权归千氪所有</div>
		</div>
		</div>
         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
		 <!-- 浮层 -->
		 <div id="bg">
			 <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg8.png" @click="hideBox"/>
		 </div>
      <div id= "bg2"  @touchmove.prevent >
              <div class="tostBox">
                  <div class="toast_title">提示</div>
                  <div class="toast_content">他已完成助力！</div>
                  <div class="toast_footer">
                    <div @click="hideBox2">取消</div>
                    <div @click="toPage">我也要门票</div>
                  </div>
              </div>
         </div>
  </div>
</div>
</template>

<script>
import Lib from "assets/js/Lib";
import codeData from "assets/js/phone";
import $ from "jquery";
let Base64 = require("js-base64").Base64;
import MessageMobile from "components/MessageMobile";
export default {
  components: { MessageMobile },
  data() {
    return {
	  imgUrl:Lib.C.imgUrl,
      getCandyVisible: false,
      candyMaskVisible: false,
      loading: false,
      url_id: "",
      height: {
        height: document.body.clientHeight - 160 + "px"
      },
      ruleForm: {
        phone: "",
        code: ""
      },
      areaCode: [{}],
      select: "86",
      sendMsgDisabled: false,
      time: 5,
      interval: null,
      ismessage: false,
      message: "",
      slideInfo: {
        session: "",
        sig: "",
        token: "",
        scene: ""
      },
	  isLogin: false,
	  headImage:"",
	  inviteCode:"",
	  nickName:'',
	  inviteNum:0,
	  inviteUsers:[],
	  length:0,
	  prizeIndex:-1,
	  isDraw:0
    };
  },
  mounted() {
    this.areaCode = codeData;
    this.url_id = Base64.decode(Lib.M.getUrlQuery("id"));
    const userName = localStorage.getItem("kg_desk_userName");
    const userId = localStorage.getItem("kg_desk_userId");
    if (this.url_id === userId) {
	  this.isLogin = true;
	  this.getUserList()
    } else {
	  this.isLogin = false;
	  this.getUserInfo()
    }
    this.weixinShare()
     
  },
  methods: {
  weixinShare(){
    const that = this;
    const wechat_list = Lib.M.noSignRequest({
      url: window.location.href.split("#")[0]
    });
    let url = window.location.href.split("#")[0]
    //调后台接口 返回config 配置
    Lib.M.weixinAjax({
      type: "post",
      url: "weixin/weixinConfig",
      data: wechat_list,
      success: function(data) {
        if (data.code == 10000) {
          data = data.responseBody;
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });
          setTimeout(() => {
            that.wxInit(data);
          }, 200);
        }
      }
    });
  },
	getUserInfo(){
		let userId = this.url_id;
		const list = Lib.M.dataRequest({"userId":userId});
		const _this = this;
		Lib.M.activityAjax({
			type:"POST",
			'url':'/activitys/jayCheerDetail',
            "data":list,
            'success':function (data){
              $('.cont').css('height',"820px");
              if(data.code == 10000){
                 _this.headImage = data.responseBody.headImage;
                 _this.inviteCode = data.responseBody.inviteCode;
                 _this.nickName = data.responseBody.nickName;
                _this.inviteNum = data.responseBody.inviteNum;
                _this.inviteUsers = data.responseBody.inviteUsers;
                 _this.length = data.responseBody.inviteUsers.length;
              }else if(data.code ==29008){
                  window.location.href = '../actEnd/list.html';
              }else if(data.code ==29009){
                  window.location.href = '../actStart/list.html';
              }else{
                	_this.ismessage = true;
				        	_this.message = data.message;
				        	_this.closeMessage(3000);
              }
            }
          })
	},
	getUserList(){
		let userId = this.url_id;
		const list = Lib.M.dataRequest({"userId":userId});
		const _this = this;
		Lib.M.activityAjax({
			type:"POST",
			'url':'/activitys/jayZhouCheerDetail',
            "data":list,
            'success':function (data){
              if(data.code ==10000){
                _this.headImage = data.responseBody.headImage;
                _this.inviteCode = data.responseBody.inviteCode;
                _this.nickName = data.responseBody.nickName;
                _this.inviteNum = data.responseBody.inviteNum;
                _this.inviteUsers = data.responseBody.inviteUsers;
                _this.length = data.responseBody.inviteUsers.length;
                _this.prizeIndex = data.responseBody.prizeIndex;
                _this.isDraw = data.responseBody.isDraw;
                if( _this.length == 10){
                  if(_this.isDraw ==0){
                    $('.cont').css('height',"740px");
                  }
                }else{
                  $('.cont').css('height',"870px");
                }
              }else if(data.code == '10004'){
                _this.ismessage = true;
                _this.message = data.message;
                _this.closeMessage(3000);
                window.location.href = '../lottery/list.html';
              }else if(data.code == '29008'){
                window.location.href = '../actEnd/list.html';
              }else if(data.code ==29009){
                  window.location.href = '../actStart/list.html';
              }else{
                _this.ismessage = true;
                _this.message = data.message;
                _this.closeMessage(3000);
              }
              
            }
		})
	},
	turnTable(){
		let userId = this.url_id;
		window.location.href = '../turnTable/list.html?id='+ Base64.encode(userId);
	},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeMessage(t) {
      setTimeout(() => {
        this.ismessage = false;
      }, t);
    },
    showBox() {

      $("#bg").css("display", "block");
      $("#bg").bind("touchmove", function(e) {
        e.preventDefault();
      });
      document.body.style.overflow = "hidden";
      // document.html.style.height="100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    },
    hideBox() {
     
      $("#bg").css("display", "none");
      document.body.style.overflow = "visible";
      // document.html.style.height="auto";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
	},
	invitePage(){
		const _this = this;
		window.location.href = '../lotteryTwo/list.html?inviteCode='+ _this.inviteCode;
  },
     wxInit(sd) {
      const _this = this;
      let Request = new Object();
      Request = Lib.M.GetRequest();
      let links = window.location.href.split("#")[0]; //分享出去的链接
      let title = "周杰伦成都演唱会门票免费送"; //分享的标题
      let desc ="邀满10人为你助力，即可获得门票抽奖机会"; //分享的详情介绍
      let articleImage = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/ico.png"
      //生成微信二维码
      //分享到朋友圈
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: links, // 分享链接'
          imgUrl: articleImage, // 分享图标
          success: function() {
                _this.ismessage = true;
                _this.message = "分享成功";
                _this.closeMessage(3000);
         
          },
          cancel: function() {}
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: articleImage, // 分享图标
          success: function() {
                _this.ismessage = true;
                _this.message = "分享成功";
                _this.closeMessage(3000);
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    },
    showSuc(){
     $("#bg2").css('display','block')
      
      $("#bg2").bind("touchmove", function(e) {
        e.preventDefault();
      },false);
        document.body.style.overflow = "hidden";
        // document.html.style.height="100%";
       document.body.style.height = "100%";
   },
   hideBox2(){
    $("#bg2").toggle(false);
       document.body.style.overflow = "visible";
       // document.html.style.height="auto";
       document.body.style.height = "auto";
   },
    toPage(){
     const _this = this;
     _this.hideBox2();
     window.location.href = '../lottery/list.html';
   }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
#app {
  height: auto;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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
  height: 100%;
}
.cont {
  width: 100%;
  background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg.png")
    no-repeat;
  background-size: 100% 100%;
  height: 790px;
}
.ruleForm {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
.logoBox {
  margin: 0 auto;
  text-align: center;
  margin-top: 290px;
}
.fr {
  width: 100%;
  text-align: center;
}
.Info {
  width: 100%;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 0.5);
  display: inline-block;
  font-size: 12px;
  margin: 10px auto 42px;
}
.logoBox2 {
  margin-top: 31px;
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.img1 {
  position: absolute;
  top: 0;
  left: 0;
 
}
.img1 img {
  width: 50%;
  display: inline-block;
}
.img2 {
  position: absolute;
  top: 0;
  right: 0px;
  text-align: right;
}
.img2 img{
  width:40%;
  display: inline-block;
}
.avart {
  margin-top: 260px;
}
.actDate {
  width: 100%;
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-top: 242px;
}
.avImg {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.avImg img {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 25px;

}
.avImg span {
  display: inline-block;
  width: 34px;
  height: 18px;
  line-height: 18px;
  color: #fff;
  font-size: 12px;
  border:2px solid rgba(249, 63, 151, 1);
  background: rgba(249, 63, 151, 1);
  border-radius: 11px;
  position: absolute;
  top: -8px;
  left: 10%;
}
.imgBox {
  margin: 0 auto;
  margin-top: 29px;
  text-align: center;
}
.imgBox img {
  width: 78%;
  display: inline-block;
}
.p1 {
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
  margin-top: 20px;
}
.p2 {
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 12px;
}
.p4{
   width: 80%;
  text-align: center;
  margin:0 auto;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 20px;
}
.nickName {
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  margin-top: 6px;
  text-align: center;
  width:100%;
}
.p1 span {
  color: #f93f97 !important;
}
.shareBtn {
  width: 100%;
  margin: 0 auto;
  margin-top: 22px;
  text-align: center;
}
.shareBtn span {
  display: inline-block;
  width: 80%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 1);
  background: -webkit-linear-gradient(
    left,
    #17d6dd,
    #13ade0
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #17d6dd, #13ade0);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #ff4180, #9c26f7);
  background: linear-gradient(to right, #ff4180, #9c26f7);
  border-radius: 6px;
}
.disBtn{
	width: 100%;
  margin: 0 auto;
  margin-top: 22px;
  text-align: center;
}
.disBtn span{
	display: inline-block;
	width: 80%;
	height: 44px;
	line-height: 44px;
	font-size: 14px;
	font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
	background:rgba(255,255,255,0.5);
	border-radius: 6px;
}
.shareCode{
  width:100%;
	margin: 0 auto;
	margin-top: 22px;
	text-align: center;
}
.shareCode span{
  display: inline-block;
	width:80%;
	height:44px;
	line-height: 44px;
	font-size:14px;
  font-family:PingFangSC-Regular;
  color:#F43DAD;
  border:1px solid #F43DAD;
  background:rgba(255,255,255,0);
   border-radius: 6px;
}
.friendBox {
  width: 80%;
  height: 200px;
  border: 1px solid #f93f97;
  border-radius: 6px;
  margin: 30px auto 0;
}
.login {
  width: 75%;
  margin: 0 auto;
  margin-top: 18px;
  height: 40px;
}
.login_content {
  position: absolute;
  text-align: center;
  width: 60%;
  font-size: 14px;
  margin: 0 auto;
}
.login_content div {
  font-size: 18px;
  font-family: PingFangSC-Regular;
  color: rgba(244, 61, 173, 1);
  display: inline-block;
}
/* CSS伪类用法 */
.login_content div:after,
.login_content div:before {
  background: rgba(244, 61, 173, 1);
  content: "";
  height: 1px;
  position: absolute;
  top: 50%;
  width: 32%;
}
/* 调整背景横线的左右距离 */
.login_content div:before {
  left: 0;
}
.login_content div:after {
  right: 0;
}
.ruleBox .login_content{
    margin-top: 10px;
}
.ruleBox .login_content div {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 1);
  display: inline-block;

}
.ruleBox .login_content div:after,
.ruleBox .login_content div:before {
  background: rgba(255, 255, 255, 0.1);
  content: "";
  height: 1px;
  position: absolute;
  top: 50%;
  width: 32%;
}
/* 调整背景横线的左右距离 */
ruleBox .login_content div:before {
  left: 0;
}
ruleBox .login_content div:after {
  right: 0;
}
/* 调整背景横线的左右距离 */
ruleBox2 .login_content div:before {
  left: 0;
}
ruleBox2 .login_content div:after {
  right: 0;
}
.ruleBox2 .login_content{
    margin-top: 10px;
}
.ruleBox2 .login_content div {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 1);
  display: inline-block;

}
.ruleBox2 .login_content div:after,
.ruleBox2 .login_content div:before {
  background: rgba(255, 255, 255, 0.1);
  content: "";
  height: 1px;
  position: absolute;
  top: 50%;
  width: 32%;
}

.fImg {
  width: 80%;
  margin: 0 auto;
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.fImg div {
  display: inline-block;
  width: 44px;
  height: 44px;
  line-height: 44px;
  margin-top: 10px;
}
.fImg div img {
  /* width:100%; */
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 50%;
}
.txt {
  width: 100%;
  text-align: center;
  margin-top: 31px;
}
.txt img {
  width: 80%;
}
.p3{
	width:100%;
	text-align: center;
	font-size:18px;
	font-family:PingFangSC-Semibold;
	color:rgba(255,255,255,1);
	margin-top: 12px;
}
.ruleBox {
  width: 80%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin-bottom: 20px;
  margin-top: 30px;
  padding-bottom: 20px;
}
.ruleBox p {
  width: 80%;
  margin: 0 auto;
}
.title {
  width: 100% !important;
  font-size: 14px !important;
  text-align: center;
  margin: 13px 0 17px !important;
  padding-top: 10px;
}
.ruleBox2{
	width:80%;

	margin: 0 auto;
	background:rgba(255,255,255,0.1);
	border-radius: 5px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,0.8);
	font-size:12px;
  margin-bottom: 20px;
   margin-top: 30px;
    padding-bottom: 20px;
}
.ruleBox2 p {
  width: 80%;
  margin: 0 auto;
}
#bg {
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 8888;
}
#bg img {
  display: inline-block;
  position: absolute;
  top: 106px;
  left: 18%;
  margin: 0 auto;
  width:65%;
}
#bg2{
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
  height:75px;
  line-height:75px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  width:100%;
  text-align: center;
 
}
.toast_footer{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  justify-content:space-between;
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
  color:#F43DAD;
  border:1px solid #F43DAD;
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
.submitBtn {
  width: 300px;
  border-radius: 5px !important;
}
.footer {
  width: 100%;
  height: 160px;
  background-color: #d14341;
  /* background: -webkit-linear-gradient(#ff2323 ,#e10019); 
    background: -o-linear-gradient(#ff2323 ,#e10019); 
    background: -moz-linear-gradient(#ff2323 ,#e10019);
    background: linear-gradient(#ff2323 ,#e10019); */ /* position: absolute; */
  bottom: 0px;
}
.rules {
  width: 865px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  margin: 0 auto;
}
.rules .title {
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 20px;
}
.rules .flexR {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.rules .flexR p {
  width: 450px;
  margin-right: 200px;
  margin-bottom: 15px;
  font-size: 16px;
}
.logoFooter div{
  width:100%;

  text-align: center;
}
.logoFooter img{
  width:25%;
  display: inline-block;
}
@media only screen and (max-width: 768px) {
  .fImg div{
    width:54px;
    height:54px;
  }
  .logoBox2{
    margin-top: 31px;
  }
}
@media only screen and (max-width: 414px) {
  /* #app{
      height:100%;
      background:url('../../../assets/img/dec.png') no-repeat;
      background-size:100% 100%;
    } */
  .fImg div{
    width:44px;
    height:44px;
  }
  .ruleForm {
    margin-top: 50px;
  }
  .logoBox2 {
    margin-top: 31px;
  }
}
@media only screen and (max-width: 375px) {
  .logoBox {
    margin-top: 250px;
  }
  .bg {
    height: 330px;
  }
  .ruleForm {
    margin-top: 52px;
  }
}
@media only screen and (max-width: 320px) {
  .fImg {
    width: 85%;
  }
  .fImg div {
    width: 42px;
  }
}
@media only screen and (min-height: 1024px) {
  .container {
    height: 872px;
  }
}
@media only screen and (min-height: 1366px) {
  .container {
    height: 1205px;
  }
}
</style>
<style>
.activeForm .el-form-item__content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.activeForm .phoneValue,
.activeForm .codeValue,
.activeForm .el-input__inner {
  width: 100%;
  height: 44px;
  line-height: 44px;
  /* border-color: #6fbced;*/
  color: #999999;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.activeForm .phoneValue {
  height: 42px;
  line-height: 42px;
  background: rgba(255, 255, 255, 0.1);
}
.activeForm .phoneValue .el-input__inner {
  /*width:230px;*/
  color: #fff;
}
.activeForm .areaValue .el-input__inner {
  width: 100%;
  height: 44px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  color: #ffffff;
  font-family: PingFang-SC-Regular !important;
}
.activeForm .el-input-group__prepend {
  color: #fff;
  border: 0 !important;
  border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: rgba(255, 255, 255, 0.1);
  font-family: PingFang-SC-Regular !important;
}
.activeForm .el-select .el-input .el-select__caret {
  display: none;
}
.areaValue .el-input__inner {
  padding: 0px;
  text-align: center;
  width: 65px;
}
.areaValue .el-input--suffix .el-input__inner {
  padding-right: 0px;
  border: 0 !important;
}
.activeForm .codeValue {
  /*width:200px;*/
  color: #333;
}
.activeForm .el-button {
  width: 100%;
  height: 44px;
  border-radius: 0px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.activeForm .el-input__suffix {
  right: 0px !important;
}
.codeBtn {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 0 !important;
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
    Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light, simsun, \\5b8b\4f53,
    WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif" !important;
}
.activeForm .el-button--primary,
.activeForm .el-button--primary:active,
.activeForm .el-button--primary:focus,
.activeForm .el-button--primary.is-disabled,
.activeForm .el-button--primary:hover,
.activeForm .el-button--primary.is-disabled:hover,
.activeForm .el-button--primary.is-disabled:active,
.activeForm .el-button--primary.is-disabled:focus {
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
  background: linear-gradient(to right, #ff4180, #9c26f7);
  /*background:rgba(2,132,254,1);*/
  border: 0 !important;
  font-family: PingFang-SC-Regular !important;
}
.activeForm .el-input__inner,
.activeForm .el-form-item.is-success .el-input__inner,
.activeForm .el-form-item.is-success .el-input__inner:focus,
.activeForm .el-form-item.is-success .el-textarea__inner,
.activeForm .el-form-item.is-success .el-textarea__inner:focus,
.activeForm .el-input__inner:focus {
  /*border-color: #6fbced!important;*/
  border: 0 !important;
}
input::-webkit-input-placeholder {
  color: #999 !important;
  font-family: PingFang-SC-Regular !important;
}
</style>
