<template>
<div class="all">
  <div class="teacher">
    <div>
      <img v-if="user.realAvatar.length !=0" :src="user.realAvatar"  alt="用户头像1">
      <img v-else src="./../../../assets/img/avatar.png"  alt="用户头像2">
    </div>
    <div>{{user.userName}}</div>
    <div>我在千氪财经看资讯赚了10元</div>
    <div><p></p></div>
    <div><p></p></div>
    <div>
      <p><span>邀请码</span><span id="code_txt" >{{data.inviteCode}}</span><button  class="button" id="button" data-clipboard-action="copy" @click="copy_inviteCode" data-clipboard-target="#code_txt" title="复制">复制</button ></p>
    </div>
    <div class="text_bar">
      <p @click="make_money_now">马上去赚钱</p>
      <p class="text">领取的奖励可以在千氪财经</p>
      <p class="withdraw_txt">个人中心——“我的钛值”查看和提现</p>
    </div>
  </div>
  <div class="pc">
      <div class="logo">
      </div>
      <div class="bar">
          <div class="avatar">
             <img v-if="user.realAvatar.length !=0" :src="user.realAvatar"  alt="用户头像1">
             <img v-else src="./../../../assets/img/avatar.png"  alt="用户头像2">
          </div>
          <div class="name">{{user.userName}}</div>
          <div class="make_money">我在千氪财经看资讯赚了10元</div>
          <div class="min"></div>
          <div class="dis">领取的奖励可以在千氪财经个人中心——“我的钛值”查看和提现</div>
        </div>
        <div class="bottom">
            <div class="fl">
                <div class="code1 code">邀请码</div>
                <div class="code_info">{{data.inviteCode}} </div>
                <div class="button" @click="make_money_pc">马上去赚钱</div>
                <i class="icon"></i>
            </div>
        </div>
  </div>
         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
   <!-- 注册 -->
    <register class = 'login_register_modal' :inviteCode="inviteCode" :show_direct="showDir" :width="diaWidth" :visible = "registerVisible" :toLogin = "toLogin" :cancel = "cancelLogin" :aliBlock = "aliBlock" :slideInfo = "slideInfo" :handleSlide = "handleSlide" :registershow = "registershow"/>
</div>
</template>
<script>
import Lib from "assets/js/Lib";
import Clipboard from "assets/js/clipboard.min";
import conf from "./../../../assets/js/conf";
import codeData from "assets/js/phone";
import register from "./../../../components/Register";
import MessageMobile from "components/MessageMobile";
export default {
  components: { register, MessageMobile },
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (this.select == 86 && !Lib.V.validateChinaPhone(value)) {
        callback(new Error("请正确输入手机号"));
      } else if (!Lib.V.validatePhone(value)) {
        callback(new Error("请正确输入手机号"));
      } else {
        callback();
      }
    };
    let validateMail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!Lib.V.validateMail(value)) {
        callback(new Error("请正确输入邮箱"));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (value.replace(/(^\s*)|(\s*$)/g, "") == "") {
        callback(new Error("请填写您在千氪的昵称"));
      } else if (!Lib.V.checkLength(value)) {
        callback(new Error("请输入15个字以内的昵称"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入密码"));
      } else if (!Lib.V.validatePassWord(value)) {
        return callback(new Error("请输入6-20位，支持数字、英文、特殊字符"));
      } else {
        callback();
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不相同"));
      } else {
        callback();
      }
    };
    let validateAgree = (rule, value, callback) => {
      if (value == false) {
        callback(new Error("请同意并接受《千氪财经用户注册协议》"));
      } else {
        callback();
      }
    };
    let validateCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码"));
      } else if (value.length != 6) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      registershow: false,
      aliBlock: "",
      registerVisible: true,
      showDir: false,
      diaWidth: "20%",
      data: {
        name: "泡啦啦泡",
        award: 10,
        inviteCode: ""
      },
      user: {
        userName: "",
        realAvatar: ""
      },
      dialogVisible: false,
      showPaw: false,
      confirmShowPaw: false,
      areaCode: [{}],
      password: "",
      userId: "",
      choices: [
        {
          Id: 0,
          Name: "手机注册",
          iscur: true
        },
        {
          Id: 1,
          Name: "邮箱注册",
          iscur: false
        }
      ],
      ison: true,
      sendMsgDisabled: false,
      time: 90,
      ruleForm: {
        phone: "",
        pass: "",
        checkPass: "",
        mail: "",
        name: "",
        code: "",
        inviteCode: "",
        agree: false
      },
      inviteCode: "",
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
        mail: [{ validator: validateMail, trigger: "blur" }],
        agree: [{ validator: validateAgree, trigger: "change" }]
      },
      interval: null,
      select: "86",
      loading: false,
      slideInfo: {
        session: "",
        sig: "",
        token: "",
        scene: ""
      },
      ismessage: false,
      message: ""
    };
  },
  methods: {
    handleSlide(session, sig, nc_token, nc_scene) {
      this.slideInfo.session = session;
      this.slideInfo.sig = sig;
      this.slideInfo.nc_token = nc_token;
      this.slideInfo.nc_scene = nc_scene;
    },
    toAboutUs(e) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      const item = {
        infoType: "concert"
      };
      Lib.M.goAboutUs(item);
    },
    make_money_now() {
      window.location.href = "../register/list.html?inviteCode=" + this.inviteCode;
    },
    make_money_pc() {
      this.registerVisible = true;
      this.registershow = true;
      this.handleSlide("", "", "", "");
      Lib.M.aliBlock(
        "#registerBlock",
        this,
        "csessionid1",
        "sig1",
        "token1",
        "scene1"
      );
    },
    cancelLogin() {
      this.registerVisible = false;
    },
    closeMessage(t) {
      setTimeout(() => {
        this.ismessage = false;
      }, t);
    },

    copy_inviteCode() {
      var vm = this;
      var clipboard = new Clipboard("#button");

      clipboard.on("success", function(e) {
        vm.ismessage = true;
        vm.message = "复制成功";
        vm.closeMessage(3000);
      });
      clipboard.on("error", function(e) {
        vm.ismessage = true;
        vm.message = "复制成功";
        vm.closeMessage(3000);
      });
    },
    getdata() {
      const vm = this,
        list = Lib.M.dataRequest({
          userId: this.userId
        });
      Lib.M.ajax({
        type: "post",
        url: "userRelation/invite",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            vm.data = data.responseBody;
          }
        }
      });
    },
    getuser() {
      const userId = localStorage.getItem("kg_desk_userId"),
        vm = this,
        list = Lib.M.dataRequest({
          userId: this.userId
        });
      Lib.M.ajax({
        type: "post",
        url: "userprofile/getByIdProfile",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            var userdata = data.responseBody.data;
            if (
              userdata.userRole == 1 &&
              userdata.avatar &&
              userdata.avatar.length != 0
            ) {
              if (userdata.avatar.indexOf("http") == -1) {
                vm.user.realAvatar = conf.imgUrl + userdata.avatar;
              } else vm.user.realAvatar = userdata.avatar;
            } else if (
              userdata.userRole != 1 &&
              userdata.columnAvatar &&
              userdata.columnAvatar.length != 0
            ) {
              if (userdata.columnAvatar.indexOf("http") == -1) {
                vm.user.realAvatar = conf.imgUrl + userdata.columnAvatar;
              } else vm.user.realAvatar = userdata.avatar;
            } else {
              vm.user.realAvatar = "";
              // vm.user.realAvatar="/static/img/avatar.png"
            }
          }
        }
      });
    },
    toAboutUs(e) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      const item = {
        infoType: "concert"
      };
      Lib.M.goAboutUs(item);
    },
    toLogin() {},
    goLogin() {
      this.toLogin();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    next(item, index) {
      this.resetForm("ruleForm");
      this.choices.map(function(v, i) {
        i == index ? (v.iscur = true) : (v.iscur = false);
      });
      if (item.Name == "手机注册") {
        this.ison = true;
      }
      if (item.Name == "邮箱注册") {
        this.ison = false;
      }
    },
    send(form) {
      const that = this;
      const send_list = Lib.M.noSignRequest({
        verIfy: this.ruleForm.phone,
        mobileArea: this.select,
        valiDation: 1
      });
      Lib.M.sendMessage(form, this, send_list);
    }
  },
  created() {
    var search = window.location.search;
    this.userId = search.split("userId=")[1];
    this.userId = this.userId.split("inviteCode=")[0];
    this.inviteCode = search.split("inviteCode=")[1];
    this.ruleForm.inviteCode = this.inviteCode;
    this.getdata();
    this.getuser();
  },
  //  已成功挂载，相当ready()
  mounted() {
    this.registerVisible = false;
    this.areaCode = codeData;
  }
};
</script>
<style>
.loginForm .el-input__suffix {
  right: -15px !important;
}
@media only screen and (max-width: 1440px) {
  .el-dialog {
    width: 30% !important;
  }
}
</style>
<style lang="less" scoped>
@center: 0 auto;

.all {
  width: 100%;
  height: 100%;
  font-family: "PingFang-SC-Regular" !important;
  background-color: #2b2674;
}
@media only screen and (max-width: 800px) {
  .pc {
    display: none;
  }
  .teacher {
    width: 100%;
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/inviteh5.png");
    text-align: center;
    display: flex;
    flex-direction: column;
    div {
      &:nth-child(1) {
        margin-top: 30px;
        img {
          width: 60px;
          display: inline-block;
          height: 60px;
          border-radius: 60px;
          border: 3px solid #ffffff;

          margin-bottom: 12px;
        }
      }
      &:nth-child(2) {
        font-size: 15px;
        line-height: 0.8;
        color: #fff;
        margin-bottom: 16px;
      }
      &:nth-child(3) {
        font-size: 18px;
        line-height: 0.67;
        color: #fff;
        margin-bottom: 20px;
      }
      &:nth-child(4) {
        p {
          width: 288px;
          height: 72px;
          background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18032702/together.png");
          background-size: cover;
          margin: @center;
          margin-bottom: 10px;
        }
      }
      &:nth-child(5) {
        position: relative;
        width: 100%;
        height: 209px;
        background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18032702/buildings.png");
        p {
          height: 175px;
          width: 231px;
          background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18032702/peoples.png");
          margin: @center;
          margin-top: 36px;
        }
      }
      &:nth-child(6) {
        p {
          //width: 345px;
          height: 50px;
          opacity: 0.8;
          border-radius: 5px;
          background-color: #fff;
          border: solid 1px #17499d;
          margin: @center;
          span {
            color: #1f1363;
            &:first-child {
              font-size: 24px;
              line-height: 50px;
              margin-right: 11px;
            }
            &:nth-child(2) {
              font-size: 30px;
              font-weight: 900;
              line-height: 50px;
            }
          }
          .button {
            width: 50px;
            height: 23px;
            border-radius: 5px;
            color: #1e7df3;
            border: 1px solid #17499d;
            font-size: 15px;
            position: relative;
            display: inline-block;
            top: -6px;
            margin-left: 10px;
            background: none;
            font-family: 'PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STHeitiSC-Light, simsun, \\5B8B\4F53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";';
          }
        }
      }
      &:nth-child(7) {
        //width: 345px;
        height: 120px;
        opacity: 0.8;
        border-radius: 5px;
        background-color: #fff;
        border: 1px solid #17499d;
        margin: @center;
        margin-top: 10px;
        margin-bottom: 32px;
        padding: 0px 20px;
        p {
          font-size: 14px;
          color: #2f2b85;
          line-height: 0.8;
          &:first-child {
            color: #fff;
            height: 40px;
            width: 130px;
            font-size: 18px;
            font-weight: 900;
            line-height: 40px;
            border-radius: 40px;
            background-image: linear-gradient(to bottom, #1e7df3, #4544b3);
            margin: @center;
            margin-top: 20px;
          }
        }
      }
    }
  }
  .text_bar {
    .text {
      margin-top: 15px;
    }
    .withdraw_txt {
      margin-top: 5px;
    }
  }
}

@media only screen and (min-width: 801px) {
  .teacher {
    display: none;
  }
  .pc {
    width: 100%;
    background-color: #2b2674;
    background-size: contain;
    background-repeat: no-repeat;

    background-position: bottom;
    position: relative;
    .logo {
      background: url("./../../../assets/img/kglogo.png") no-repeat;
      width: 242px;
      height: 42px;
      margin: 50px 0 0 50px;
      position: absolute;
      top: 0;
      left: 0;
      background-size: contain;
    }
    .bar {
      background-image: url(https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18032702/invitepc.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
      .avatar {
        padding-top: 18px;
        img {
          width: 90px;
          display: block;
          height: 90px;
          border-radius: 90px;
          -moz-border-radius: 90px;
          -ms-border-radius: 90px;
          -ms-border-radius: 90px;
          border: 5px solid #fff;
          border-color: rgba(255, 255, 255, 0.2);
          margin: 0 auto;
        }
      }
      .name {
        font-size: 30px;
        color: #fff;
        text-align: center;
        padding-top: 15px;
      }
      .make_money {
        font-size: 36px;
        color: #fff;
        text-align: center;
        padding-top: 20px;
        font-weight: 600;
      }
      .min {
        background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18032702/togat.png")
          no-repeat;
        height: 686px;
        width: 743px;
        margin: 0 auto;
        margin-top: 40px;
      }
      .dis {
        font-size: 20px;
        color: #fff;
        text-align: center;
        padding-bottom: 21px;
      }
    }
    .bottom {
      height: 120px;
      background: rgba(214, 213, 228, 1);
      position: relative;
      .fl {
        margin: 0 auto;
        position: absolute;
        left: 50%;
        margin-left: -330px;
        div {
          float: left;
        }
      }
      .code1,
      .code_info {
        font-size: 48px;
        color: #1f1363;
        line-height: 120px;
        margin-right: 33px;
      }
      .code_info {
        font-size: 60px;
        margin-right: 30px;
        height: 100%;
      }
      .button {
        background: -webkit-linear-gradient(to right, #4544b3, #1e7df3);
        background: linear-gradient(to right, #4544b3, #1e7df3);
        font-size: 35px;
        color: #fff;
        font-weight: 900;
        line-height: 1.9;
        text-align: center;
        cursor: pointer;
        width: 260px;
        height: 66px;
        border-radius: 33px;
        margin-top: 26px;
        position: relative;
        z-index: 2;
      }
      .icon {
        width: 155px;
        height: 68px;
        display: inline-block;
        position: absolute;
        top: -20px;
        right: -48px;
        background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/icon.png");
        z-index: 1;
      }
    }
  }
  .hand {
    cursor: pointer;
  }
}
</style>

