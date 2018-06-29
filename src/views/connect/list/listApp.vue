<template>
  <div id="app">
    <div class="logo">
      <i class="iconfont icon-ziyuan"></i>
      <span>千氪</span>
    </div>
   <div class ='loginHead'>
     <p>关联千氪</p>
     <p>让您看到的每一篇文章都有质量</p>
   </div>
  <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm loginForm">

          <el-form-item label="" prop="phone" class = 'phoneInput'>
               <el-input   size = 'small' placeholder="输入手机号" type="text" v-model="ruleForm.phone" auto-complete="off" >

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
                     <div id="connect"></div>
                   </div>
                   <input type='hidden' id='csessionid06' name='csessionid06'/>
                   <input type='hidden' id='sig06' name='sig06'/>
                   <input type='hidden' id='token06' name='token06'/>
                   <input type='hidden' id='scene06' name='scene06'/>
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

          <!-- <el-form-item label="" prop = 'name'>
           <el-input   size = 'small' v-model="ruleForm.name" placeholder="昵称" ></el-input>
          </el-form-item> -->
          

          <el-form-item label="" prop = 'pass'>
            <el-input  
            onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
            size = 'small' 
             :type="showPaw ? 'text' : 'password'" 
            v-model="ruleForm.pass" 
            class = 'paw_el'
            auto-complete="off"  
             placeholder="密码">
<!--                     <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "showPaw" @click="showPaw = false"/>
<span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="showPaw = true"/> -->
             </el-input>
          </el-form-item>
          <el-form-item label="" prop = 'checkPass'>
            <el-input  
            onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
            size = 'small' 
             :type="confirmShowPaw ? 'text' : 'password'" 
            class = 'paw_el'
             v-model="ruleForm.checkPass" auto-complete="off"   placeholder="确认密码">
             </el-input>

          </el-form-item>
          <el-form-item label="" prop = 'inviteCode'>
           <el-input   size = 'small' v-model="ruleForm.inviteCode" placeholder="邀请码" ></el-input>
          </el-form-item>
          <el-form-item class = 'register_formItem'>
            <el-button  size = 'small' type="primary" :loading = "loading" @click="submitForm('ruleForm')" class="btn width100" >注册</el-button>
          </el-form-item>
            <el-button  style="margin-bottom:55px;" @click="exist"  class="btn width100" >关联已有账号</el-button>          
          <!-- <p class = 'hasAccount'>已有账号？<a class = 'cursorPointer color1d87' href = '../login/list.html'>直接登录</a></p> -->

    </el-form>
    <div class ='areaMask' v-if = 'areaMask' @click = 'cancelMask'></div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
export default {
data() {
      let validatePhone = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入手机号'));
        } else if(this.select == 86 && !(Lib.V.validateChinaPhone(value))){
          callback(new Error('请正确输入手机号'));
        }else if(!(Lib.V.validatePhone(value))){
          callback(new Error('请正确输入手机号'));
        }
        else {
          callback();
        }
      };
      let validateMail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if(!(Lib.V.validateMail(value))){
           callback(new Error('请正确输入邮箱'));
        } else {
          callback();
        }
      };      
      let validateName = (rule,value,callback) =>{
        if (value.replace(/(^\s*)|(\s*$)/g,"") == '') {
          callback(new Error('请填写您在千氪的昵称'));
        }else if(!(Lib.V.checkLength(value))){
           callback(new Error('请输入15个字以内的昵称'));
        } else {
          callback();
        }      
      } 
      let validatePass = (rule, value, callback) => {
          if ( value == '') {
            return callback(new Error('请输入密码'));
          }else if(!(Lib.V.validatePassWord(value))){
            return callback(new Error("请输入6-20位，支持数字、英文、特殊字符"));
          }else {
              callback();
          }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入密码'));
        }else if (value !== this.ruleForm.pass){
          callback(new Error('两次密码不相同'));
        } else {
          callback();
        }
      };      
      let validateAgree = (rule, value, callback) => {
        if (value == false) {
          callback(new Error('请同意并接受《千氪财经用户注册协议》'));
        }else {
          callback();
        }
      };
      let validateCode = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入验证码'));
        }else if(value.length != 6){
          callback(new Error('请输入正确的验证码'));
        }else {
          callback();
        }
      };
    return {
      areacodeShow:false,
      areaMask:false,
      showPaw:false,
      confirmShowPaw:false,
      areaCode:[{}],
      user:"",
      password:"",
      choices:[{
        "Id":0,
        'Name':'手机注册',
        "iscur":true
      },{
        "Id":1,
        'Name':'邮箱注册',
        "iscur":false
      }],
      ison:true,
      sendMsgDisabled:false,
      time:90,
      ruleForm: {
          phone:'',
          pass: '',
          checkPass: '',
          mail:"",
          // name:'',
          code:"",
          inviteCode: '',

          agree:false
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],
          // name:[
          //   {validator:validateName,trigger:'blur'}
          // ],
          code:[
            {validator: validateCode, trigger: 'blur' }
          ],
          pass:[
            {validator: validatePass, trigger: 'blur' }
          ],        
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur' }
          ],
          mail: [
            {validator: validateMail, trigger: 'blur' }
          ],
          agree:[
            {validator: validateAgree, trigger: 'change' }
          ],
      },
      interval:null,
      select:"86",
      loading:false,
      slideInfo:{
        'session':'',
        'sig':'',
        'token':'',
        'scene':''
      },
    }
  },
  components: {},
  //已成功挂载，相当ready()
  mounted(){
        this.areaCode = codeData;
         Lib.M.aliBlock('#connect',this,'csessionid06','sig06','token06','scene06')
  },
  //相关操作事件
  methods: {
    handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    exist () {
      window.location.href = '../connectHasAccount/list.html'
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
    toAboutUs(e){
      window.event? window.event.cancelBubble = true : e.stopPropagation();
      const item = {
        infoType:"concert"
      }
      Lib.M.goAboutUs(item)
    },
    goLogin(){
        this.toLogin()
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let register_phonelist = {
                      "userMobile":this.ruleForm.phone,
                      // "userName":this.ruleForm.name,
                      "userPassword":this.ruleForm.pass,
                      "confirmPassword":this.ruleForm.checkPass,
                      "code":this.ruleForm.code,
                      "mobileArea":this.select,
                      "call_method":"adduser"
            }
            if(this.ruleForm.inviteCode != ''){
              register_phonelist.inviteCode = this.ruleForm.inviteCode
            }
            register_phonelist = Lib.M.noSignRequest(register_phonelist);
            const that = this;
            this.loading = true
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/adduser',
                  "data":register_phonelist,
                  // "data":this.choices[0].iscur ? register_phonelist : register_emaillist,
                  'success':function (data){
                      if(data.code == 10000){
                          //注册成功后自动登录
                                       const login_phonelist = Lib.M.noSignRequest({
                                              "userMobile":that.ruleForm.phone,
                                              "userPassword":that.ruleForm.pass,
                                        })    
                                    Lib.M.loginAjax({
                                              'type':'post',
                                              'url':'/userkg/checkLogin',
                                              "data":login_phonelist,
                                              'success':function (data){
                                                if(data.code == 10000){
                                                          data = data.responseBody.data;
                                                          localStorage.setItem('kg_desk_token', data.token);
                                                          localStorage.setItem('kg_desk_approve', data.realnameAuthed);
                                                          localStorage.setItem('kg_desk_userId', data.userId);
                                                          localStorage.setItem('kg_desk_userName', data.userName);
                                                          localStorage.setItem('kg_desk_userMobile', data.userMobile);
                                                          localStorage.setItem('kg_desk_roleId', data.userRole);
                                                           localStorage.setItem('kg_desk_atskMobile', data.atskMobile);
                                                          localStorage.setItem('kg_desk_mobileArea', data.mobileArea);
                                                          that.$message({
                                                            message:'恭喜你，注册成功！',
                                                            type: 'success'
                                                          });
                                                          that.loading = false;
                                                          setTimeout(()=>{
                                                            window.location.href = '../index/list.html'
                                                          },1000);
                                                }else{
                                                    that.$message({
                                                      message: data.message,
                                                      type: 'error'
                                                    });
                                                   that.loading = false;
                                                }

                                          }
                                        });

                      }else{
                        that.loading = false;
                          that.$message({
                            message: data.message,
                            type: 'error'
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
      next(item,index) {
        this.resetForm("ruleForm");
        this.choices.map(function (v,i) {
           i==index? v.iscur=true: v.iscur=false;
        });
        if(item.Name=='手机注册'){
          this.ison=true;
        }
        if(item.Name=='邮箱注册'){
           this.ison=false;
        }
       
      },
      send(form) {
        const that = this;
        const send_list  = Lib.M.noSignRequest(
          {
            "verIfy":this.ruleForm.phone,
            "mobileArea":this.select,
            "valiDation":1,

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
                                  Lib.M.aliBlock('#connect',me,'csessionid06','sig06','token06','scene06')
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
                            //         Lib.M.aliBlock('#connect',me,'csessionid06','sig06','token06','scene06')
                            //         me.handleSlide('','','','')
                            //       }
                            //     }, 1000);
                        }else if(data.code == 10020){
                            me.ismessage = true;
                            me.message = data.message
                            me.closeMessage(3000)
                             me.sendMsgDisabled = false;
								              window.clearInterval(me.interval);
                           Lib.M.aliBlock('#connect',me,'csessionid06','sig06','token06','scene06')
                            me.handleSlide('','','','')
                        }else{
                              me.ismessage = true;
                              me.message = data.message
                              me.closeMessage(3000)
                               me.sendMsgDisabled = false;
								              window.clearInterval(me.interval);
                             Lib.M.aliBlock('#connect',me,'csessionid06','sig06','token06','scene06')
                                    me.handleSlide('','','','')
                        }
                      }
               })

            }else{
              return false
            }
      });  
      }
  },
  created () {
    var search = window.location.search;
    this.ruleForm.inviteCode =search.split('inviteCode=')[1];
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
  font-family:'PingFangSC-Regular'!important;
  .logo {
    width: 100%;
    height: 44px;
    color:rgba(2,132,254,1);
    font-size: 22px;
    text-align: center;
    line-height: 44px;
    .icon-ziyuan{font-size: 22px;}
  }
}
  .agree{
    margin-bottom: 20px;
    margin-top: -3px;
    span {
      &:last-child {
        color:rgba(2,132,254,1);
      }
    }
  }
</style>
