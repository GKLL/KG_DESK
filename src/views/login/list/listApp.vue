<template>
	<div id="app">
    <div class="logo">
      <i class="iconfont icon-ziyuan"></i>
      <span>千氪</span>
    </div>
   <div class ='loginHead'>
     <p>登录千氪</p>
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
                <el-button @click="messageLogin">短信验证快捷登录</el-button>
                <div class = 'handle'>
                   <a class = 'cursorPointer fr font14' href = '../register/list.html'>立即注册</a>
                   <a class = 'cursorPointer fl font14' href = '../forget/list.html'>忘记密码?</a>
                </div> 
                 <span class="line2">其它登录方式</span>
                <div class="sina" @click = 'toWeibo'></div>
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
    toWeibo(){
      Lib.M.mobile_login_weibo()
    },
    focus(e){
      setTimeout(()=>{
            const pannel = e.target;
            pannel.scrollIntoView(true);
      },1000);
    },
    messageLogin () {
      window.location.href = "../phoneNumLogin/list.html"
    },
    submitForm(formName) {
      const that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
/*                  if(!this.aliBlock){
                    this.$message({
                      type:"warning",
                      message:"请滑动验证码"
                    })
                    return
                  }*/
            const login_phonelist = Lib.M.noSignRequest({
                  "userMobile":this.ruleForm.phone,
                  "userPassword":this.ruleForm.pass,
            })    
            const login_maillist = Lib.M.noSignRequest({
                "userEmail":this.ruleForm.phone,
                "userPassword":this.ruleForm.pass,
            }) 
            this.loginLoading = true;
            const isPhone = Lib.V.validatePhone(this.ruleForm.phone) ? true : false;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/checkLogin',
                  "data":isPhone ? login_phonelist : login_maillist,
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
                       /* that.$message({
                          message:'登录成功',
                          type: 'success'
                        });*/
                        that.ismessage = true;
                        that.message = '登录成功'
                        that.closeMessage(3000)
                        that.loginLoading = false;
                        setTimeout(()=>{
                        let loginUrl = localStorage.getItem('loginUrl');
                        window.location.href = loginUrl;
                      },1000);
                    }else{
/*                        that.$message({
                          message: data.message,
                          type: 'error'
                        });*/
                        that.ismessage = true;
                           that.message = data.message;
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
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    closeMessage(t){
       setTimeout(()=>{
                  this.ismessage=false;
              },t);
      
    },
  }
}
</script>
<style  lang="less">
.loginForm {
  .el-input__inner, .el-button {
    font-size: 14px !important;
  }
  .el-button--default {
    color:rgba(153,153,153,1);
  }
  .handle {
    margin-top: 25px;
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
      margin-bottom: 45px;
    }
</style>


