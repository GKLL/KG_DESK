<!--账号密码登录-->
<template>
  <div>
    <el-dialog
      class = 'LoginModal'
      title="登录"
      :visible="visible"
      width="15%"
      :before-close = "closeModal"
      :close-on-click-modal = "false"
      :lock-scroll = "false"
      center
      >
      <div class="loginBox">
          <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item label="" prop="phone" >
                  <el-input   id = 'loginInput'   @focus = "focus" size = 'small' type="text" v-model="ruleForm.phone" auto-complete="off"   placeholder='请输入手机号' >
                   
                  </el-input>
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
                    <!-- <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "showPaw" @click="showPaw = false"/>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="showPaw = true"/> -->
                  </el-input>
                </el-form-item>
               <div class = 'handle'>
                   <a @click = "toRegister" class = 'cursorPointer'>立即注册</a>
                   <a @click = "toRetrieve" class = 'cursorPointer' >忘记密码?</a>
                </div>      
                <el-form-item class="no_bottom">
                  <el-button  
                      size = 'small'
                      type="primary"
                      @click="submitForm('ruleForm')"
                      class="btn width100" 
                       :loading="loginLoading"
                     >登录</el-button>
                </el-form-item>
                  <a @click = "toLoginFast" class = 'cursorPointer messageLogin'>短信快捷登录</a>
                   <span class="line2">第三方登录</span>
        <div class="others">
          <div @click = 'toWeixin' class = 'cursorPointer'></div>
          <div @click = "toWeibo" class = 'cursorPointer'></div>
        </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  props:{
    visible:{},
    toRegister:{},
    cancel:{},
    toRetrieve:{},
    toLoginFast:{},
    aliBlock:{},
    showGetCandy:{}
  },
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
      loginLoading:false
    }
  },
  mounted(){

  },
  //相关操作事件
  methods: {
    toWeixin(){
     Lib.M.login_wx()
    },
    toWeibo(){
      Lib.M.login_weibo()
    },
    focus(e){
     /* setout(()=>{
            const pannel = e.target;
            pannel.scrollIntoView(true);
      },1000);*/
    },
    submitForm(formName) {
      const that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
                        that.$message({
                          message:'登录成功',
                          type: 'success'
                        });
                        setTimeout(()=>{
                        that.closeModal();
                        that.loginLoading = false;
/*                        if(data.loginBonusStatus != 1){
                          that.showGetCandy()
                           location.reload()
                        }else{
                           location.reload()
                        }*/
                        location.reload()
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
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  },

}
</script>

<style scoped lang="less">
#loginInput, #bodyMain {
  font-size: 12px;
}
.paw .paw_el{
 position: relative;
}
.el-form-item__error{
  left:0px!important;
}
.el-form-item {
  margin-bottom: 16px;
}
.handle{
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  a {
    &:first-child {
      font-size:14px;
      font-family:'PingFangSC-Regular';
      color:rgba(34,138,255,1);
    }
  }
}
.el-button {font-family:'PingFangSC-Regular' !important;}
.loginBox {
  font-family:'PingFangSC-Regular' !important;
  text-align: center;
  .width100 {
    font-family:'PingFangSC-Regular' !important;
    font-size: 14px  !important; 
  }
  .messageLogin {
    font-size:14px;
    color:rgba(51,51,51,1);
    line-height:60px;
    &:hover {
      color: rgba(34,138,255,1);
    }
  }
    .line2 {
      display: block;     /*设置为块级元素会独占一行形成上下居中的效果*/
      font-size: 14px;
      color:rgba(153,153,153,1);
      position: relative;
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
  .no_bottom{
    margin-bottom: 0;
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
          margin: 0px 10px;
      &:last-child {
        background-image: url('./../assets/img/weibo_ico.png');

      }
    }
  }
</style>
<style>
  .LoginModal .el-dialog--center .el-dialog__body{
  padding-top:0px;
}
.el-dialog__headerbtn .el-dialog__close{
  font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 50%;
}
.LoginModal .el-form-item__error{
  padding-top:0px;
}
.loginBox .el-input__inner {
  font-size: 12px;
}
</style>
