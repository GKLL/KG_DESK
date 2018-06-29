<!--关联账户BY 手机-->
<template>
	<div id="app">
    <div class="logo">
      <i class="iconfont icon-ziyuan"></i>
      <span>千氪</span>
    </div>
   <div class ='loginHead'>
     <p>关联千氪账号</p>
     <p>让您看到的每一篇文章都有质量</p>
   </div>
  <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm loginForm">
                <el-form-item label="" prop="phone" >
                  <el-input   id = 'loginInput' @focus = "focus" size = 'small' type="text" v-model="ruleForm.phone" auto-complete="off"   placeholder='请输入手机号' >
                       <div slot="prepend" class = 'selectArea cursorPointer'>
                        <span class = 'defaultArea cursorPointer' @click ="showSelect">+{{select}}</span>
                        <ul v-show = "areacodeShow">
                              <li v-for="(item,key) in areaCode" :key="key" @click ="onSelect(item)">
                                    <span style="float: left; color: #8492a6; font-size: 13px">+{{item.code}}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryname }}</span> 
                              </li>
                        </ul>
                    </div>

                  </el-input>
                </el-form-item>
                <!-- 滑块验证开始 -->
                <div>
                   <div class="ln">
                     <div id="connectMessage"></div>
                   </div>
                   <input type='hidden' id='csessionid05' name='csessionid05'/>
                   <input type='hidden' id='sig05' name='sig05'/>
                   <input type='hidden' id='token05' name='token05'/>
                   <input type='hidden' id='scene05' name='scene05'/>
                </div>

                <!-- 滑块验证结束 --> 
          <el-form-item label="" prop = "code">

            <el-input  size = 'small' type="text" v-model="ruleForm.code" auto-complete="off" class="code" placeholder="请输入6位验证码">

            <el-button  size = 'small' slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
              <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
              <span v-if="!sendMsgDisabled">发送验证码</span>
            </el-button>
            </el-input>
          </el-form-item>      
                <el-form-item>
                  <el-button  
                      size = 'small'
                      type="primary"
                      @click="submitForm('ruleForm')"
                      class="btn width100" 
                       :loading="loginLoading"
                     >登录</el-button>
                </el-form-item>
                <el-button @click="login">关联新账号</el-button>
                <div class = 'handle'>
                   <a style="color:rgba(2,132,254,1);" class = 'cursorPointer fr font14' @click = "login">账号密码登录</a>
                </div> 
    </el-form>
        <message-mobile class="messageBox" :message="message" v-if="ismessage" />
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
import MessageMobile from "components/MessageMobile";
export default {
  data() {
      var validatePhone = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入手机号'));
        }else if(!(Lib.V.validatePhone(value) || Lib.V.validateMail(value))){
          callback(new Error('请正确输入手机号'));
        }else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!Lib.V.validatePassWord(value)){
          callback(new Error('密码长度为6-20位，支付数字和英文，特殊符号'));
        }else {
          callback();
        }
      };
    return {
            areaCode:[{}],
            areacodeShow:false,
      areaMask:false,
      height:{
        height:document.body.clientHeight + 'px'
      },
      user:"",
      password:"",
      centerDialogVisible: false,
      showPaw:false,
      sendMsgDisabled:false,
      time:60,
      ruleForm: {
          pass: '',
          phone: ''
      },
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
      },
      loginLoading:false,
      select: "86",
      ismessage:false,
      message:"",
      slideInfo:{
        'session':'',
        'sig':'',
        'token':'',
        'scene':''
      },
    }
  },
  components: {MessageMobile},
  //已成功挂载，相当ready()
  mounted(){
    this.ruleForm.pass = '';
    this.ruleForm.phone = '';
    this.areaCode = codeData;
     Lib.M.aliBlock('#connectMessage',this,'csessionid05','sig05','token05','scene05')
  },
  //相关操作事件
  methods: {
    cancelMask(){
      this.areacodeShow = false;
      this.areaMask = false;
    },
    handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    onSelect(item){
      this.select = item.code;
      this.cancelMask();
    },
    showSelect(){
      this.areacodeShow = true;
      this.areaMask = true;
    },
    login () {
      const id  = Lib.M.getUrlQuery('id')
      window.location.href = "../connectNew/list.html?id=" + id;
    },
    focus(e){
      setTimeout(()=>{
            const pannel = e.target;
            pannel.scrollIntoView(true);
      },1000);
    },
      send(form) {
        const me = this;
        const send_list  = Lib.M.noSignRequest(
          {
            "verIfy":this.ruleForm.phone,
            "mobileArea":this.select,
            "platform":'3',
            "session":this.slideInfo.session,
            "sig":this.slideInfo.sig,
            "token":this.slideInfo.nc_token,
            "scene":this.slideInfo.nc_scene,
          },
          ) 
         me.time =90
        window.clearInterval(me.interval); 
        me.$refs[form].validateField('phone',(phone) => {
              if(phone == ""){
                if(me.slideInfo.session == ''){
                    me.ismessage = true;
                    me.message = '验证失败，请重新进行滑块验证'
                    me.closeMessage(3000)
                      return
                    }
                    me.ismessage = true;
                    me.message = '短信已经发送'
                    me.closeMessage(3000)
                    me.sendMsgDisabled = true;
                    me.interval = window.setInterval(function() {
                        if ((me.time--) <= 0) {
                                   me.time = 90;
                                    me.sendMsgDisabled = false;
                                    Lib.M.aliBlock('#connectMessage',me,'csessionid05','sig05','token05','scene05')
                                    me.handleSlide('','','','')
                        }
                    }, 1000);
                Lib.M.loginAjax({
                      'type':'post',
                      'url':"/userkg/sendSmsEmailcode",
                      "data":send_list,
                      'success':function (data){
                        if(data.code == 10000){
                            //   me.ismessage = true;
                            //  me.message = '短信已经发送'
                            // me.closeMessage(3000)
                            //   me.sendMsgDisabled = true;

                            //  me.interval = window.setInterval(function() {
                            //       if ((me.time--) <= 0) {
                            //         me.time = 90;
                            //         me.sendMsgDisabled = false;
                            //          Lib.M.aliBlock('#connectMessage',me,'csessionid05','sig05','token05','scene05')
                            //         me.handleSlide('','','','')
                            //       }
                            //     }, 1000);
                        }else if(data.code == 10020){
                            me.ismessage = true;
                            me.message = data.message
                            me.closeMessage(3000)
                             me.sendMsgDisabled = false;
								              window.clearInterval(me.interval);
                           Lib.M.aliBlock('#connectMessage',me,'csessionid05','sig05','token05','scene05')
                            me.handleSlide('','','','')
                        }else{
                              me.ismessage = true;
                              me.message = data.message
                              me.closeMessage(3000)
                               me.sendMsgDisabled = false;
								              window.clearInterval(me.interval);
                              Lib.M.aliBlock('#connectMessage',me,'csessionid05','sig05','token05','scene05')
                                    me.handleSlide('','','','')
                        }
                      }
               })

            }else{
              return false
            }
      });  
/*        Lib.M.sendMessage(form,this,send_list)*/
    },
    submitForm(formName) {
      const that = this
      const openId = Lib.M.getUrlQuery('id');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const login_phonelist = Lib.M.noSignRequest({
                  "userMobile":this.ruleForm.phone,
                  "code":this.ruleForm.code,
                  "openId":openId,
                  "openType":localStorage.getItem('openType')
            })    
            this.loginLoading = true;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/thirdParty/bindMobileLogin',
                  "data": login_phonelist,
                  'success':function (data){
                    if(data.code == 10000){
                        data = data.responseBody.data;
                        localStorage.setItem('kg_desk_token', data.token);
                        localStorage.setItem('kg_desk_approve', data.realnameAuthed);
                        localStorage.setItem('kg_desk_userId', data.userId);
                        
                        localStorage.setItem('kg_desk_userMobile', data.userMobile);
                        localStorage.setItem('kg_desk_atskMobile', data.atskMobile);
                        localStorage.setItem('kg_desk_mobileArea', data.mobileArea);
                        localStorage.setItem('kg_desk_roleId', data.userRole);
                        localStorage.setItem('kg_desk_userName', data.userName);
                        localStorage.setItem('kg_desk_loginBonusStatus', data.loginBonusStatus);
                   /*     that.$message({
                          message:'恭喜你，关联成功！',
                          type: 'success'
                        });*/
                        that.ismessage = true;
                            that.message = '恭喜你，关联成功'
                            that.closeMessage(3000)
                        that.loginLoading = false;
                        setTimeout(()=>{
                        let loginUrl = localStorage.getItem('loginUrl');
                        window.location.href = loginUrl;
                      },1000);
                    }else{
                      /*  that.$message({
                          message: data.message,
                          type: 'error'
                        });*/
                             that.ismessage = true;
                            that.message = data.message
                            that.closeMessage(3000)
                        that.loginLoading = false
                    }

              }
            });
          } else {
            return false;
          }
        });
    },
    closeModal(){
      this.resetForm('ruleForm')
    },
    closeMessage(t){
       setTimeout(()=>{
                  this.ismessage=false;
              },t);
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  }
}
</script>
<style  lang="less" scoped>
.loginForm {
  .el-input__inner, .el-button{
    font-size: 14px !important;
    font-family:'PingFangSC-Regular'!important;
  }
  .el-button--default {
    color:rgba(153,153,153,1);
  }
  .handle {
    margin-top: 22px;
  }
}
.loginHead {
  p {
    &:last-child {
      font-size: 13px;
      margin-top: 11px;
    }
  }
}
#app {
  font-family: 'PingFangSC-Regular' !important;
}
  .logo {
    width: 100%;
    height: 44px;
    color:rgba(2,132,254,1);
    font-size: 22px;
    text-align: center;
    line-height: 44px;
  }
   .icon-ziyuan{font-size: 22px;}
   .loginForm .el-input__inner{
     font-size: 14px !important;
     font-family:'PingFangSC-Regular'!important;
   }
   .el-button--default {
     width: 100%;
     font-size:14px;
     height: 45px;
    font-family:'PingFangSC-Regular'!important;
    margin-bottom: 22px;
   }
    .line2 {
      display: block;     /*设置为块级元素会独占一行形成上下居中的效果*/
      font-size: 14px;
      color:rgba(153,153,153,1);
      position: relative;
      margin-top: 86px;
      text-align: center;
      &::before, &::after {
        content: '';                 /*CSS伪类用法*/
        position: absolute;         /*定位背景横线的位置*/
        top: 52%;
        background: rgba(238,238,238,1);       /*宽和高做出来的背景横线*/
        width: 25%;
        height: 1px
      }
      &::before {
        left: 0;    
      }
      &::after {
        right: 0;
      }
    }
    .sina{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: url('./../../../assets/img/wechat-gray.png');
      margin: 0 auto;
      margin-top: 38px;
    }
</style>


