<template>
<div id="app">
    <div class = 'container' >
        <div class="logoBox2">
          <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg2.png" class="logo"/>
        </div>
	
		<div class="imgBox">
			<img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/zjg1.png"/>
		</div>
		
			<div class="fr">
            <span class="Info">活动已结束</span>
			</div>

         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
  </div>
</div>
</template>

<script>
import Lib from "assets/js/Lib";
import codeData from "assets/js/phone";
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
  height: 100%;
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
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  font-size: 18px;
  margin: 10px auto 42px;
}
.logoBox2 {
  margin: 0 auto;
  margin-top: -20px;
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
  margin-top: 320px;
  text-align: center;
}
.imgBox img {
  width: 78%;
  display: inline-block;
}
.login {
  width: 80%;
  margin: 0 auto;
  margin-top: 33px;
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

@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 414px) {
  
  .logoBox2 {
    margin-top: -20px;
  }
}
@media only screen and (max-width: 375px) {
  
}
@media only screen and (max-width: 320px) {
   .logoBox2 {
    margin-top: -20px;
  }
  .imgBox {
  margin: 0 auto;
  margin-top: 250px;
  text-align: center;
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

