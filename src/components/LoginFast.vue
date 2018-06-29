<!--手机号码快速登录-->
<template>
  <div v-show = "loginfastshow">
    <el-dialog
        class = 'LoginModal LoginFastModal'
        title="登录"
        :visible="visible"
        width="331px"
         :before-close = "confirmClose"
         :close-on-click-modal = "false"
         :lock-scroll = "false"
        center>
        <div class="forGetBox LoginFast">
          <div class = 'bottom'>
               <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item label="" prop="phone" >
                  <el-input   size = 'small' type="text" v-model="ruleForm.phone" auto-complete="off"   placeholder='请输入手机号' >
                    <el-select slot="prepend" size = 'small' v-model="select">
                                  <el-option
                                  v-for="(item,key) in areaCode"
                                  :key="key"
                                  :label="'+'+item.code"
                                  :value="item.code">
                                  <span style="float: left; color: #8492a6; font-size: 13px">+{{item.code}}</span>
                                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryname }}</span>
                                </el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
                <!-- 滑块验证开始 -->
                <div>
                   <div class="ln">
                     <div id="loginfastBlock"></div>
                   </div>
                   <input type='hidden' id='csessionid' name='csessionid'/>
                   <input type='hidden' id='sig' name='sig'/>
                   <input type='hidden' id='token' name='token'/>
                   <input type='hidden' id='scene' name='scene'/>
                </div>
                <el-form-item label="" prop="code"  >
                      <el-input  size = 'small' type="text" v-model="ruleForm.code" auto-complete="off" class="code" placeholder="验证码">
                      <el-button  size = 'small' slot="suffix" type="primary" class="codeBtn getCode" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
                        <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">获取验证码</span>
                      </el-button>
                      </el-input>
                </el-form-item>
                <div class = 'handle'>
                   <a @click = "toRegister" class = 'cursorPointer'>立即注册</a>
                   <a @click = "toLogin" class = 'cursorPointer' >账号密码登录</a>
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
               <span class="line2">第三方登录</span>
             <div class="others">
               <div @click = 'toWeixin' class = 'cursorPointer'></div>
               <div @click = "toWeibo" class = 'cursorPointer'></div>
             </div>
              </el-form>
          </div>
        </div>
        <!-- <slide-block v-if = "slideVisible" :visible = "slideVisible"/> -->
<!--               <el-dialog
    class = 'LoginModal LoginFastModal'
    title="滑动验证"
    :visible="slideVisible"
    width="331px"
    
    center
     append-to-body
    >
    <div  class="forGetBox LoginFast">
        <div>
           <div class="ln">
             <div id="loginfastBlock"></div>
           </div>
           <input type='hidden' id='csessionid' name='csessionid'/>
           <input type='hidden' id='sig' name='sig'/>
           <input type='hidden' id='token' name='token'/>
           <input type='hidden' id='scene' name='scene'/>
        </div>
    </div>
 </el-dialog> -->
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
import SlideBlock from './SlideBlock';
export default {
  components: {
    SlideBlock
  },
  props:{
    visible:{},
    toRegister:{},
    cancel:{
      type: Function,
        default: function () {
          
        }
    },
    toRetrieve:{},
    toLogin:{},
    isSlide:{},
    slideInfo:{},
    handleSlide:{},
    loginfastshow:{}

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
      let validateCode = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入验证码!'));
        }else if(value.length != 6){
          callback(new Error('请输入正确的验证码'));
        }else {
          callback();
        }
      };
    return {
      loginfastBlock:false,
      areaCode:[{}],
      user:"",
      password:"",
      sendMsgDisabled:false,
      time:90,
      ruleForm: {
          code: '',
          phone: ''
      },
      rules: {
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
      },
      loginLoading:false,
      select: "86",
  
    }
  },
  mounted(){
     this.areaCode = codeData;
  },
  //相关操作事件
  methods: {
    toWeixin(){
     Lib.M.login_wx()
    },
    toWeibo(){
      Lib.M.login_weibo()
    },
    send(form) {
      this.sendMsg = false;
      const that = this;   
      const send_list  = Lib.M.noSignRequest(
            {
              "verIfy":this.ruleForm.phone,
              "mobileArea": this.select,
              "platform":'3',
              "session":this.slideInfo.session,
              "sig":this.slideInfo.sig,
              "token":this.slideInfo.nc_token,
              "scene":this.slideInfo.nc_scene,
            }
      ) 
      Lib.M.sendMessage(form,this,send_list,'#loginfastBlock','csessionid','sig','token','scene');
    },
    focus(form){
      this.$refs[form].clearValidate()
    },
    submitForm(formName) { // 短信快捷登陆
      const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const login_phonelist = Lib.M.noSignRequest({
                  "userMobile":this.ruleForm.phone,
                  "code":this.ruleForm.code
            })    
            this.loginLoading = true;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/mobileLogin',
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
                        that.$message({
                          message:'登录成功',
                          type: 'success'
                        });
                        setTimeout(()=>{
                        that.closeModal();
                        that.loginLoading = false
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
            // 快速登陆成功，跳到关联账户页面
            // window.location.href = "../relevanceAccount/list.html"
          } else {
            return false;
          }
        });
    },
    closeModal(){
      this.cancel();
      this.loginfastBlock = false;
      this.resetForm('ruleForm')
    },
    confirmClose(){
            this.cancel();
            this.loginfastBlock = false;
            this.resetForm('ruleForm')
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  },

}
</script>
<style lang="less">
.LoginFast {
  .el-input__inner {
    font-size:12px !important;
    font-family:'PingFangSC-Regular' !important;
    // color:rgba(206,206,206,1) !important;
  }
}
</style>

<style scoped lang="less">
.forGetBox {
  .el-button {font-family:'PingFangSC-Regular' !important;}
  font-family:'PingFangSC-Regular' !important;  
  .width100{font-size: 14px !important; font-family:'PingFangSC-Regular' !important;  }
  .getCode {
    height: 33px;
    width: 86px;
    padding: 0;
    font-size: 12px !important;
  }
  .handle {
    margin-bottom: 10px;
    a{
      &:last-child {
        color:rgba(34,138,255,1);
      }
    }
  }
  .el-form-item {
    margin-bottom: 16px;
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
          margin: 0px 10px;
      &:last-child {
        background-image: url('./../assets/img/weibo_ico.png');

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
