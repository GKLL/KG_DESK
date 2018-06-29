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
				<img  src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/>
				<p class="nickName">昵称</p>
            </div>
        </div>
		<div>
			<p class="p1">TA还差<span>10</span>人，为他助力,赢周杰伦</p>
			<p class="p3">成都演唱会VIP前15排门票！</p>
		</div>
    <div class="shareCode">
			<span>ta的助力码：1314a3</span>	
		</div>
		<div class="shareBtn">
			<span @click="showBox">帮TA助力</span>	
		</div>
		<p class="p2">助力期：4月23日-4月27日截止，加油啊，老铁！</p>
		<div class="friendBox">
			<div class="login">
				<div class="login_content">  
					<div>助力帮</div>  
				</div>
			</div>
			<div class="fImg">
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
				<div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg3.png"/></div>
			</div>
		</div>
		</div>
	
		
		<div class="ruleBox">
			<p class="title">助力须知</p>
			<p>1.邀请好友满10人注册千氪帐号，视为助力成功。</p>
			<p>2.助力成功后，TA即可获取一次杰伦演唱会门票的抽奖资格。</p>
			<p>3..四张杰伦成都演唱会VIP前15排门票，抽完即止。</p>
		</div>
    <div class="logoFooter">
        <div><img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg6.png"/></div>
        <div class="Info">本活动最终解释权归千氪所有</div>
    </div>
         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
		 <!-- 浮层 -->
		 <div id="bg">
			 <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg8.png" @click="hideBox"/>
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
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电话号码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
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
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
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
      }
    };
  },
  mounted() {
    this.areaCode = codeData;
    this.url_id = Lib.M.getUrlQuery("id");
    const userName = localStorage.getItem("kg_desk_userName");
    Lib.M.aliBlock(
      "#offlineBlock",
      this,
      "csessionid1002",
      "sig1002",
      "token1002",
      "scene1002"
    );
  },
  methods: {
    handleSlide(session, sig, nc_token, nc_scene) {
      this.slideInfo.session = session;
      this.slideInfo.sig = sig;
      this.slideInfo.nc_token = nc_token;
      this.slideInfo.nc_scene = nc_scene;
    },
    cancelGetVisible() {
      window.location.href = "../index/list.html";
    },
    getCandyHandle() {
      window.location.href = "../account/details.html#/";
    },
    noSignRequest(data) {
      let list = {
        data: Base64.encode(JSON.stringify(data))
      };
      return list;
    },
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const login_phonelist = this.noSignRequest({
            userMobile: this.ruleForm.phone,
            code: this.ruleForm.code
          });
          that.loading = true;
          Lib.M.loginAjax({
            type: "post",
            url: "/userkg/mobileLogin",
            data: login_phonelist,
            success: function(data) {
              if (data.code == 10000) {
                that.loading = false;
                data = data.responseBody.data;
                localStorage.setItem("kg_desk_token", data.token);
                localStorage.setItem("kg_desk_approve", data.realnameAuthed);
                localStorage.setItem("kg_desk_userId", data.userId);

                localStorage.setItem("kg_desk_userMobile", data.userMobile);
                localStorage.setItem("kg_desk_atskMobile", data.atskMobile);
                localStorage.setItem("kg_desk_mobileArea", data.mobileArea);
                localStorage.setItem("kg_desk_roleId", data.userRole);
                localStorage.setItem("kg_desk_userName", data.userName);
                if (data.loginBonusStatus != 1) {
                  that
                    .$alert("恭喜您注册成功，获得1888氪金奖励", "提示", {
                      confirmButtonText: "知道了",
                      cancelButtonText: "取消",
                      center: true,
                      showClose: false,
                      customClass: "activeBox"
                    })
                    .then(() => {
                      setTimeout(() => {
                        window.location.href = "../index/list.html";
                      }, 200);
                    })
                    .catch(() => {});
                } else {
                  setTimeout(() => {
                    window.location.href = "../index/list.html";
                  }, 200);
                }

                // if(data.loginBonusStatus != 1){
                //   that.getCandyVisible = true;
                //   that.candyMaskVisible = true;
                // }else{

                // }
              } else {
                that.loading = false;
                that.$message({
                  type: "error",
                  message: data.message
                });
              }
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeMessage(t) {
      setTimeout(() => {
        this.ismessage = false;
      }, t);
    },
   showBox(){
	   console.log(111)
	   $("#bg").css("display", "block");
        document.body.style.overflow = "hidden";
        // document.html.style.height="100%";
       document.body.style.overflow = "hidden";
       document.body.style.height = "100%";
   },
   hideBox(){
	   console.log(111)
	   $("#bg").css("display", "none");
       document.body.style.overflow = "visible";
       // document.html.style.height="auto";
       document.body.style.overflow = "visible";
       document.body.style.height = "auto";
   },
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
    #410F46,
    #190C3F
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #410F46,
    #190C3F
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #410F46, #190C3F);
  background: linear-gradient(to right, #410F46, #190C3F);  
  height: 100%;
}
.cont{
	width: 100%;
	background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg.png") no-repeat;
	background-size: 100% 100%;
    height:866px;
	
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
  margin: 15px 0 71px;
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
  right: 0;
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
  height:50px;
  margin:0 auto;
  text-align: center;
  position: relative;
}
.avImg img{
	display: inline-block;
	width:100%;
}
.avImg span{
	display: inline-block;
	width:34px;
	height:18px;
	line-height:18px;
	color:#fff;
	font-size:12px;
	background:rgba(249,63,151,1);
	border-radius:9px;
	position:absolute;
	top:-8px;
	left:16%;
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
.p1{
	width:100%;
	text-align: center;
	font-size:18px;
	font-family:PingFangSC-Semibold;
	color:rgba(255,255,255,1);
	margin-top: 46px;
}
.p3{
	width:100%;
	text-align: center;
	font-size:18px;
	font-family:PingFangSC-Semibold;
	color:rgba(255,255,255,1);
	margin-top: 12px;
}
.p2{
	width:100%;
	text-align: center;
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,0.8);  
	margin-top: 22px;
}
.nickName{
	font-family:PingFangSC-Semibold;
  color:rgba(255,255,255,1);  
	font-size:12px; 
	margin-top: 6px;
}
.p1 span{
	color:#F93F97!important;
}
.shareBtn{
	width:100%;
	margin: 0 auto;
	margin-top: 22px;
	text-align: center;
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
.shareBtn span{
	display: inline-block;
	width:80%;
	height:44px;
	line-height: 44px;
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
  background: linear-gradient(to right, #ff4180, #9c26f7);
  border-radius: 6px;
}
.friendBox{
	width:80%;
	height:200px;
	border:1px solid #F93F97;
	border-radius: 6px;
	margin: 30px auto 0;
}
.login {
  width: 75%;
  margin: 0 auto;
  margin-top: 18px;
  height:40px;

}
.login_content {
  position: absolute;
  text-align: center;
  width: 60%;
  font-size: 14px;
  margin: 0 auto;
}

.login_content div {
  font-size:18px;
  font-family:PingFangSC-Regular;
  color:rgba(244,61,173,1);
  display: inline-block;
}

/*CSS伪类用法*/
.login_content div:after,
.login_content div:before {
  background: rgba(244,61,173,1);
  content: "";
  height: 1px;
  position: absolute;
  top: 50%;
  width: 32%;
}

/*调整背景横线的左右距离*/
.login_content div:before {
  left: 0;
}

.login_content div:after {
  right: 0;
}
.fImg{
	width:80%;
	margin: 0 auto;
    /* display: -webkit-flex;
	display: flex; */
	
}
.fImg div{
	display: inline-block;
	width:44px;
	height:44px;
	margin-top:10px;
}
.fImg div img{
	/* width:100%; */
}
.txt{
	width:100%;
	text-align: center;
	margin-top: 31px;
}
.txt img{
	width:80%;
}
.ruleBox{
	width:80%;
	height:184px;
	margin: 0 auto;
	background:rgba(255,255,255,0.1);
	border-radius: 5px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,0.8);
	font-size:12px;
	margin-bottom: 20px;
}
.ruleBox p{
	width:80%;
	margin: 0 auto;
}
.title{
	width:100%!important;
	font-size:14px!important;
	text-align: center;
	margin:13px 0 17px!important;
}
.logoFooter div{
  width:100%;

  text-align: center;
}
.logoFooter img{
  display: inline-block;
}
#bg{
	display: none;
	width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 8888;
}
#bg img{
	display: inline-block;
	position: absolute;
	top:106px;
	left:18%;
	margin: 0 auto;
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
    background: linear-gradient(#ff2323 ,#e10019);  */
  /*position: absolute;*/
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

@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 414px) {
  /* #app{
      height:100%;
      background:url('../../../assets/img/dec.png') no-repeat;
      background-size:100% 100%;
    }*/
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
  .keyword {
    font-size: 18px;
  }
  .logoBox {
    margin-top: 220px;
  }
  .decoration {
    width: 300px;
    height: 140px;
  }
  .ruleForm {
    margin-top: 50px;
    margin-bottom: 15px;
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
