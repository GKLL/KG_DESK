<template>
<div id="app">
    <div class = 'container' >
        <div class="logoBox2">
          <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg2.png" class="logo"/>
        </div>
		<div class="imgBox">
			<img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg7.png"/>
		</div>
		<div class="login">

		</div>
      	<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="ruleForm activeForm">
            <el-form-item  prop="phone" style = "margin-bottom:5px">
                      <el-input  class = 'phoneValue' placeholder="手机号" type="text" v-model="ruleForm.phone" auto-complete="off" >
                                <el-select slot="prepend"  v-model="select" class = 'areaValue'>
                                          <el-option
                                          v-for="(item,key) in areaCode"
                                          :key="key"
                                          :label="'+'+item.code"
                                          :value="item.code">
                                          <span style="float: left; color: #8492a6; font-size: 13px">+{{item.code}}</span>
                                          <span style="float: right; color: #8492a6; font-size: 13px">{{item.countryname}}</span>
                                        </el-option>
                                </el-select>
                        </el-input>
            </el-form-item >
            <!-- 滑块验证开始 -->
                <div>
                   <div class="ln">
                     <div id="offlineBlock"></div>
                   </div>
                   <input type='hidden' id='csessionid1002' name='csessionid1002'/>
                   <input type='hidden' id='sig1002' name='sig1002'/>
                   <input type='hidden' id='token1002' name='token1002'/>
                   <input type='hidden' id='scene1002' name='scene1002'/>
                </div>

            <!-- 滑块验证结束 -->
            <el-form-item  prop="code">
              <el-input class = 'codeValue' placeholder="验证码" type="text" v-model="ruleForm.code" auto-complete="off">
                <el-button   slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
                  <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                  <span v-if="!sendMsgDisabled">获取验证码</span>
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item  prop="invateCode">
              <el-input class = 'codeValue' placeholder="助力码" type="text" v-model="ruleForm.invateCode" auto-complete="off">
               
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading" class ='submitBtn'>马上注册，即助力成功</el-button>

            </el-form-item>
			<div class="fr">
            <span class="Info">本活动最终解释权归千氪所有</span>
			</div>
      </el-form>
         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
         <div id= "bg"  @touchmove.prevent >
              <div class="tostBox">
                  <div class="toast_title">提示</div>
                  <div class="toast_content">{{msg}}</div>
                  <div class="toast_footer">
                    <div @click="hideBox">取消</div>
                    <div @click="toPage">我也要门票</div>
                  </div>
              </div>
         </div>
  </div>
</div>
</template>

<script>
import Lib from "assets/js/Lib";
import $ from "jquery";
import codeData from "assets/js/phone";
let Base64 = require("js-base64").Base64;
import MessageMobile from "components/MessageMobile";
import { setTimeout } from 'timers';
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
    var validateinviteCode= (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入助力码"));
      } else {
        callback();
      }
    };
    return {
      getCandyVisible: false,
      candyMaskVisible: false,
      loading: false,
      msg:'',
      url_id: "",
      height: {
        height: document.body.clientHeight - 160 + "px"
      },
      ruleForm: {
        phone: "",
        code: "",
        invateCode:""
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        invateCode:[{ validator: validateinviteCode, trigger: "blur" }]
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
    this.ruleForm.invateCode = Lib.M.getUrlQuery("inviteCode");
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
            code: this.ruleForm.code,
            inviteCode:this.ruleForm.invateCode,
            activityId:1
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
                if(data.newUser ==0){
                  that.msg = '您已是老用户，不能助力哦~'
                    setTimeout(() => {
                    that.showBox();
                  }, 200);
                }else{
                  that.msg = '为TA助力成功！'
                    setTimeout(() => {
                    that.showBox();
                  }, 200);
                }
                
              } else {
                that.loading = false;
                that.ismessage = true;
                that.message = data.message;
                that.closeMessage(3000);
               
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
    send(form) {
      const me = this;
      me.time = 90;
      window.clearInterval(me.interval);
      const send_list = this.noSignRequest({
        verIfy: this.ruleForm.phone,
        mobileArea: this.select,
        platform: "3",
        session: this.slideInfo.session,
        sig: this.slideInfo.sig,
        token: this.slideInfo.nc_token,
        scene: this.slideInfo.nc_scene
      });
      me.$refs[form].validateField("phone", phone => {
        if (phone == "") {
          Lib.M.loginAjax({
            type: "post",
            url: "/userkg/sendSmsEmailcode",
            data: send_list,
            success: function(data) {
              if (data.code == 10000) {
                me.ismessage = true;
                me.message = "短信已经发送";
                me.closeMessage(3000);
                me.sendMsgDisabled = true;
                me.interval = window.setInterval(function() {
                  if (me.time-- <= 0) {
                    me.time = 90;
                    me.sendMsgDisabled = false;
                    Lib.M.aliBlock(
                      "#offlineBlock",
                      me,
                      "csessionid1002",
                      "sig1002",
                      "token1002",
                      "scene1002"
                    );
                    me.handleSlide("", "", "", "");
                  }
                }, 1000);
              } else if (data.code == 10020) {
                me.ismessage = true;
                me.message = data.message;
                me.closeMessage(3000);
                Lib.M.aliBlock(
                  "#offlineBlock",
                  me,
                  "csessionid1002",
                  "sig1002",
                  "token1002",
                  "scene1002"
                );
                me.handleSlide("", "", "", "");
              } else {
                me.ismessage = true;
                me.message = data.message;
                me.closeMessage(3000);
                Lib.M.aliBlock(
                  "#offlineBlock",
                  me,
                  "csessionid1002",
                  "sig1002",
                  "token1002",
                  "scene1002"
                );
                me.handleSlide("", "", "", "");
              }
            }
          });
        } else {
          return false;
        }
      });
      // Lib.M.sendMessage(form,this,send_list)
    },
    showBox(){
	   
     $("#bg").css('display','block')
     $('.btn_slide ').css('display','none')
     $('.btn_ok ').css('display','none')
      
      $("#bg").bind("touchmove", function(e) {
        e.preventDefault();
      },false);
        document.body.style.overflow = "hidden";
        // document.html.style.height="100%";
       document.body.style.height = "100%";
   },
   hideBox(){
    $("#bg").toggle(false);
     $('.btn_ok ').css('display','block')
      $('.btn_slide ').css('display','block')
       document.body.style.overflow = "visible";
       // document.html.style.height="auto";
       document.body.style.height = "auto";
       setTimeout(()=>{
         window.location.href = '../index/list.html'
       },200)
   },
   toPage(){
     const _this = this;
     _this.hideBox();
     window.location.href = '../shareHelp/list.html?id='+Base64.encode(localStorage.getItem('kg_desk_userId'));
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
  background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg.png")
    no-repeat;
  background-size: 100% 100%;
  height: 100%;
}

.ruleForm {
  width: 80%;
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
.fr{
	 width:100%;
	 text-align: center;
}
.Info {
  width:100%;
  font-family: PingFangSC-Regular;
  color:rgba(255,255,255,0.5);
  display:inline-block;
  font-size:12px;
  margin: 10px auto 42px;
}
.logoBox2 {
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
}
.logoBox2 p {
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  margin-top: 19px;
}

.logoBox2 img {
  width: 50%;
  display: inline-block;
}
.actDate {
  width: 100%;
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-top: 242px;
}
.actTime {
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-top: 13px;
}
.imgBox {
  margin: 0 auto;
  margin-top: 230px;
  text-align: center;
}
.imgBox img {
  width: 100%;
  display: inline-block;
}
.login {
  width: 80%;
  margin: 0 auto;
}
.login_content {
  position: absolute;
  text-align: center;
  width: 80%;
  font-size: 14px;
  margin: 0 auto;
}

.login_content div {
  font-family: PingFangSC-Regular;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.9);
  display: inline-block;
}

/*CSS伪类用法*/
.login_content div:after,
.login_content div:before {
  background: rgba(251, 249, 251, 0.5);
  content: "";
  height: 1px;
  position: absolute;
  top: 50%;
  width: 24%;
}

/*调整背景横线的左右距离*/
.login_content div:before {
  left: 0;
}

.login_content div:after {
  right: 0;
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
@media only screen and (max-width: 768px) {
  .ruleForm{
    margin-top: 50px;
  }
  .imgBox img{
    width:80%;
    display: inline-block;
  }
  .logoBox2 img{
    width:50%;
  }
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
  .tostBox{
    width:80%;
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
  color: #fff;
  background:rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.activeForm .phoneValue {
  height: 42px;
  line-height: 42px;
  background:rgba(255, 255, 255, 0.1);
}
.activeForm .phoneValue .el-input__inner {
  /*width:230px;*/
  color: #fff!important;
}
.activeForm .areaValue .el-input__inner {
  width: 100%;
  height: 44px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border:none;
  color: #ffffff;
  font-family: PingFang-SC-Regular !important;
}
.activeForm .el-input-group__prepend {
  color: #fff;
  border:0!important;
  border-right:1px solid rgba(255, 255, 255, 0.1)!important;
  background:rgba(255, 255, 255, 0.1);
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
  border:0!important;
}
.activeForm .codeValue {
  /*width:200px;*/
  color: #fff;
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
  background:rgba(255, 255, 255, 0.1)!important;
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
  background: linear-gradient(
    to right,
    #ff4180,
    #9c26f7
  ); /*background:rgba(2,132,254,1);*/
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
  border:0!important; 
}
input::-webkit-input-placeholder {
  color: #999 !important;
  font-family: PingFang-SC-Regular !important;
}
</style>
