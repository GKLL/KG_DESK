<!--手机号码快速登录-->
<template>
  <div>
    <el-dialog
        class = 'LoginModal LoginFastModal'
        title="关联账号"
        :visible="visible"
        width="331px"
         :before-close = "closeModal"
         :lock-scroll = "false"
        center>
        <div class="forGetBox releReadyAccount">
          <div class = 'bottom'>
               <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item label="" prop="phone" >
                  <el-input  prefix-icon="el-icon-search"  size = 'small' type="text" v-model="ruleForm.phone" auto-complete="off"   placeholder='请输入手机号' >
                  </el-input>
                </el-form-item>
                <div>
                  <div class="ln">
                    <div id="loginfastBlock"></div>
                  </div>
                  <input type='hidden' id='csessionid' name='csessionid'/>
                  <input type='hidden' id='sig' name='sig'/>
                  <input type='hidden' id='token' name='token'/>
                  <input type='hidden' id='scene' name='scene'/>
                </div>
                <el-form-item label="" prop="pass" class="paw">
                  <el-input 
                   id = "bodyMain" 
                   size = 'small'
                    prefix-icon="el-icon-search"
                    type="password" 
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
                <div class = 'handle2'>
                   <a @click ="toRelce" class = 'cursorPointer'>关联新账户</a>
                   <a @click = "toRetrieve"  class = 'cursorPointer' >忘记密码</a>
                </div>  
                <el-form-item>
                  <el-button  
                      size = 'small'
                      type="primary"
                      @click="submitForm('ruleForm')"
                      class="btn width100" 
                       :loading="loginLoading"
                     >登录</el-button>
                </el-form-item>
                <div class = 'message'>
                   <a @click="toMessage"  class = 'cursorPointer' >短信快捷登录</a>
                </div> 
              </el-form>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone'
import { setInterval, clearInterval } from 'timers';
export default {
  components: {
    
  },
  props:{
    visible:{},
    cancel:{},
    toRelce: {},
    toMessage: {},
    toRetrieve:{},
    userInfo:{}
  },   
  data() {
      let validatePhone = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请输入手机号'));
        }else if(this.select == 86 && !(Lib.V.validateChinaPhone(value))){
          callback(new Error('请正确输入手机号'));
        }else if(!(Lib.V.validatePhone(value))){
          callback(new Error('请正确输入手机号'));
        }
        else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
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
      user:"",
      password:"",
      sendMsgDisabled:false,
      time:90,
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
      select: "86"
    }
  },
  mounted(){
     this.areaCode = codeData;
  },
  //相关操作事件
  methods: {
    send(form) {
      this.sendMsg = false;
        const that = this;
        const send_list  = Lib.M.noSignRequest(
            {
              "verIfy":this.ruleForm.phone,
              "mobileArea":this.select,
            }
          ) 
      Lib.M.sendMessage(form,this,send_list);
    },
    focus(form){
      this.$refs[form].clearValidate()
    },
    submitForm(formName) {
      const that = this;
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
                  "openId":this.userInfo.openId,
                  "userPassword":this.ruleForm.pass,
                  "openType":localStorage.getItem('openType')
            })    
            const localUrl = localStorage.getItem('localUrl');
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

                        that.$message({
                          message:'恭喜你，关联成功！',
                          type: 'success'
                        });
                        setTimeout(()=>{
                        that.closeModal();
                        that.loginLoading = false
                        window.location.href = localUrl
                      },1000);
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                        that.loginLoading = false
                    }

              }
            });
            // window.location.href = "../index/list.html"
          } else {
            return false;
          }
        });
    },
    closeModal(){
      this.cancel();
      this.resetForm('ruleForm')
    },
/*    tomessage () {
        this.toMessage();
    },*/
      resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  },

}
</script>
<style lang="less">
.releReadyAccount {
  .el-input__inner {
    font-size:12px !important;
    font-family:'PingFangSC-Regular' !important;
    // color:rgba(206,206,206,1) !important;
  }
}
</style>
<style scoped lang="less">
.forGetBox {
  font-family:'PingFangSC-Regular' !important;  
  .width100{font-size: 14px !important; font-family:'PingFangSC-Regular' !important;  }
  .getCode {
    height: 32px;
    width: 86px;
    position: relative;
    padding: 0;
    font-size: 12px !important;
  }
  .message {
      text-align: center;
      a {
          color:rgba(51,51,51,1);
          font-size: 14px;
      }
  }
  .handle {
    margin-bottom: 10px;
    text-align: center;
    a{
      &:last-child {
        color:rgba(34,138,255,1);
      }
    }
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .handle2{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family:'PingFangSC-Regular' !important;
        a {
                &:first-child {
                font-size:14px;
                color:rgba(34,138,255,1);
                }
        }
    }
    input {
        font-size: 12px !important;
        font-family:'PingFangSC-Regular' !important;  
    }
}
.paw .paw_el{
 position: relative;
}
.el-form-item__error{
  left:0px!important;
}
.handle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
    .line2 {
      display: block;     /*设置为块级元素会独占一行形成上下居中的效果*/
      font-size: 14px;
      color:rgba(153,153,153,1);
      position: relative;
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
  .others {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    width: 100%;
    margin-top: 25px;
    div {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      background-image: url('./../assets/img/wechat_ico.png');
      background-size: contain;
      &:last-child {
        background-image: url('./../assets/img/weibo_ico.png');
        margin-left: 30px;
      }
    }
  }
</style>
<style>
  .LoginModal .el-dialog--center .el-dialog__body{
  padding-top:10px;
}
.el-dialog__headerbtn .el-dialog__close{
  font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 50%;
}
.LoginFastModal .el-input__suffix{
  right:0px;
}

</style>
