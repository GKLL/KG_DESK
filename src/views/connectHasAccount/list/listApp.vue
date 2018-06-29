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
                  <el-input   id = 'loginInput' @focus = "focus" size = 'small' type="text" v-model="ruleForm.phone" auto-complete="off"   placeholder='请输入手机号' ></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass" class="paw">
                  <el-input 
                   id = "bodyMain" 
                   size = 'small'
                    :type="showPaw ? 'text' : 'password'" 
                    v-model="ruleForm.pass"
                     auto-complete="off" 
                     class="paw_el" 
                     placeholder='密码' 
                      @keyup.enter.native="submitForm('ruleForm')"
                      onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
                      @focus = "focus"
                      >
                    <!-- <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "showPaw" @click="showPaw = false"/> -->
                    <!-- <span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="showPaw = true"/> -->
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
                                <el-form-item>
                  <el-button  @click="connectNew">关联新账号</el-button>
                </el-form-item>
                <div class = 'handle'>
                   <a class = 'cursorPointer fl font14' href = '../forget/list.html'>忘记密码？</a>
                   <a style="color: rgba(2,132,254,1);" class = 'cursorPointer fr font14' @click = "messageLogin">短信快捷登录</a>
                </div> 
    </el-form>
    <message-mobile class="messageBox" :message="message" v-if="ismessage" />
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
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
                       ismessage:false,
      message:"",
    }
  },
  components: {MessageMobile},
  //已成功挂载，相当ready()
  mounted(){
    this.ruleForm.pass = '';
    this.ruleForm.phone = '';
  },
  //相关操作事件
  methods: {
    connectNew () {
      const id  = Lib.M.getUrlQuery('id')
      window.location.href = "../connectNew/list.html?id=" + id;
    },
    focus(e){
      setTimeout(()=>{
            const pannel = e.target;
            pannel.scrollIntoView(true);
      },1000);
    },
    messageLogin () {
      const id  = Lib.M.getUrlQuery('id')
      window.location.href = "../connectHasMessage/list.html?id=" + id;
    },
    submitForm(formName) {
      const that = this
      const openId = Lib.M.getUrlQuery('id');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const login_phonelist = Lib.M.noSignRequest({
                  "userMobile":this.ruleForm.phone,
                  "openId":openId,
                  "userPassword":this.ruleForm.pass,
                  "openType":localStorage.getItem('openType')
            })
            this.loginLoading = true;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/thirdParty/bindLoginUser',
                  "data":login_phonelist,
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
                        that.ismessage = true;
                        that.message = '恭喜你，关联成功'
                        that.closeMessage(3000)
                        that.loginLoading = false;
                        let loginUrl = localStorage.getItem('loginUrl');
                        setTimeout(()=>{
                          window.location.href = loginUrl;
                      },1000);
                    }else{
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


