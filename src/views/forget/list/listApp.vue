<template>
	<div id="app">
    <div class="logo">
      <i class="iconfont icon-ziyuan"></i>
      <span>千氪</span>
    </div>
   <div class ='loginHead'>
     <p>修改密码</p>
     <p>让您看到的每一篇文章都有质量</p>
   </div>
  <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm loginForm">
                <el-form-item label=""  prop = 'phone' class = 'phoneInput'>
                <el-input  size = 'small' placeholder="请输入手机号" type="text" v-model="ruleForm.phone" auto-complete="off" >
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
                     <div id="moblie_forgetBlock"></div>
                   </div>
                   <input type='hidden' id='csessionid03' name='csessionid03'/>
                   <input type='hidden' id='sig03' name='sig03'/>
                   <input type='hidden' id='token03' name='token03'/>
                   <input type='hidden' id='scene03' name='scene03'/>
                </div>

                <!-- 滑块验证结束 --> 
                 <el-form-item label=""  props = 'code'>
                  <el-input  v-model="ruleForm.code" size = "small" type="text" class=" code" placeholder='输入6位验证码'>
                    <el-button size = "small" slot="suffix" type="primary"  @click="send('ruleForm')"  class="codeBtn" :disabled='sendMsgDisabled'>
                      <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                      <span v-if="!sendMsgDisabled">发送验证码</span>
                    </el-button>
                  </el-input>
                </el-form-item>
                 <el-form-item label="" prop = 'pass'>
                  <el-input 
                  onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
                  v-model="ruleForm.pass" size = "small" :type="showPaw ? 'text' : 'password'" class="paw_el" placeholder='新密码'>

                  </el-input>
                </el-form-item>
                 <el-form-item label=""  prop = 'checkPass'>
                  <el-input
                  onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
                   v-model="ruleForm.checkPass" size = "small" :type="newshowPaw ? 'text' : 'password'" class="paw_el" placeholder='确认密码'>

                   </el-input>
                </el-form-item>
                <el-form-item>
                <el-button  size = "small" type="primary" @click = "submitForm('ruleForm')"  class=" btnModal2 width100">确认</el-button>
              </el-form-item>
    </el-form>
    <message-mobile class="messageBox" :message="message" v-if="ismessage" />

        <div class ='areaMask' v-if = 'areaMask' @click = 'cancelMask'></div>
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
import MessageMobile from "components/MessageMobile";
export default {
  props:{
    visible:{},
    cancel:{},
    aliBlock:{}
  },
  data() {
      var validatePhone = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入手机号'));
        }else if(!(Lib.V.validatePhone(value) || Lib.V.validateMail(value))){
          callback(new Error('请输入正确的手机号'));
        }else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length < 6){
          callback(new Error('密码至少6位数'));
        }else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else if(value !== this.ruleForm.pass){
            callback(new Error('两次密码不相同'));
        }else {
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入验证码'));
        }else {
          callback();
        }
      };
    return {
            areacodeShow:false,
      areaMask:false,
      showPaw:false,
      showPaw:false,
      newshowPaw:false,
      height:{
        height:document.body.clientHeight + 'px'
      },
      user:"",
      password:"",
      centerDialogVisible: false,
      sendMsgDisabled:false,
      time:90,
      ruleForm: {
          pass: '',
          checkPass: '',
          phone: '',
          code:''
      },
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
      },
      interval:null,
      select:"86",
      areaCode:[{}],
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
  components: {
    MessageMobile
  },
  mounted(){
    this.areaCode = codeData;
   Lib.M.aliBlock('#moblie_forgetBlock',this,'csessionid03','sig03','token03','scene03')
  },
  //相关操作事件
  methods: {
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
    cancelMask(){
            this.areacodeShow = false;
      this.areaMask = false;
    },
    showSelect(){
      this.areacodeShow = true;
      this.areaMask = true;
    },
    cancelHandle(){
      this.cancel();
      this.ruleForm.code = ""
      this.$refs['ruleForm'].resetFields()
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const retrieve_list = Lib.M.noSignRequest({
                      "verIfy":this.ruleForm.phone,
                      "code":this.ruleForm.code,
                      "confirmPassword":this.ruleForm.checkPass,
                      "userPassword":this.ruleForm.pass,
            }) 
            const that = this;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/chckCodePwd',
                  "data":retrieve_list,
                  'success':function (data){
                      if(data.code == 10000){
/*                        that.$message({
                          message: '恭喜你，修改密码成功',
                          type: 'success'
                        });*/
                            that.ismessage = true;
                            that.message = '恭喜你，修改密码成功'
                            that.closeMessage(3000)
                        setTimeout(()=>{
                          window.location.href = '../login/list.html'
                        },1000);
                      }else{
            /*            that.$message({
                          message: data.message,
                          type: 'error'
                        });*/
                         that.ismessage = true;
                            that.message = data.message
                            that.closeMessage(3000)
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
              closeMessage(t){
       setTimeout(()=>{
                  this.ismessage=false;
              },t);
      
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
                                   Lib.M.aliBlock('#moblie_forgetBlock',me,'csessionid03','sig03','token03','scene03')
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
                            //         Lib.M.aliBlock('#moblie_forgetBlock',me,'csessionid03','sig03','token03','scene03')
                            //         me.handleSlide('','','','')
                            //       }
                            //     }, 1000);
                        }else if(data.code == 10020){
                            me.ismessage = true;
                            me.message = data.message
                            me.closeMessage(3000)
                             me.sendMsgDisabled = false;
								              window.clearInterval(me.interval);
                           Lib.M.aliBlock('#moblie_forgetBlock',me,'csessionid03','sig03','token03','scene03')
                            me.handleSlide('','','','')
                        }else{
                              me.ismessage = true;
                              me.message = data.message
                              me.closeMessage(3000)
                               me.sendMsgDisabled = false;
								              window.clearInterval(me.interval);
                                Lib.M.aliBlock('#moblie_forgetBlock',me,'csessionid03','sig03','token03','scene03')
                                    me.handleSlide('','','','')
                        }
                      }
               })

            }else{
              return false
            }
      });
    }
  }
}
</script>
<style  lang="less">
.loginForm {
  .el-input__inner, .el-button{
    font-size: 14px !important;
    font-family:'PingFangSC-Regular'!important;
  }
  .el-button--default {
    color:rgba(153,153,153,1);
  }
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
   .loginHead {
  p {
    &:last-child {
      font-size: 13px;
      margin-top: 11px;
    }
  }
}
</style>


