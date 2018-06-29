<template>
  <div v-show = "registershow">
    <el-dialog
        title="注册"
        :visible="visible"
        :width="width"
        class = 'registerModal'
        :before-close = "closeModal"
           :close-on-click-modal = "false"
         :lock-scroll = "false"
        center>
        <div class="forGetBox">
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm registerForm">
          <el-form-item label="" prop="phone" >
               <el-input  size = 'small' placeholder="手机号" type="text" v-model="ruleForm.phone" auto-complete="off" >
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
                    <div id="registerBlock"></div>
                  </div>
                  <input type='hidden' id='csessionid1' name='csessionid1'/>
                  <input type='hidden' id='sig1' name='sig1'/>
                  <input type='hidden' id='token1' name='token1'/>
                  <input type='hidden' id='scene1' name='scene1'/>
          </div> 
          <!-- 滑块验证结束 -->
          <el-form-item label="" prop = "code">
            <el-input  size = 'small' type="text" v-model="ruleForm.code" auto-complete="off" class="code" placeholder="验证码">
            <el-button  size = 'small' slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
              <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
              <span v-if="!sendMsgDisabled">验证码</span>
            </el-button>
            </el-input>
          </el-form-item>
<!--           <el-form-item label="">
 <el-input   size = 'small' v-model="ruleForm.inviteCode" placeholder="邀请码" ></el-input>
</el-form-item> -->
          <el-form-item label="" prop = 'name'>
           <el-input   size = 'small' v-model="ruleForm.name" placeholder="昵称" ></el-input>
          </el-form-item>
          <el-form-item label="" prop = 'pass'>
            <el-input  
            onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
            size = 'small' 
             :type="showPaw ? 'text' : 'password'" 
            v-model="ruleForm.pass" 
            class = 'paw_el'
            auto-complete="off"  
             placeholder="密码">
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "showPaw" @click="showPaw = false"/>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="showPaw = true"/>
             </el-input>
          </el-form-item>
          <el-form-item label="" prop = 'checkPass'>
            <el-input  
            onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
            size = 'small' 
             :type="confirmShowPaw ? 'text' : 'password'" 
            class = 'paw_el'
             v-model="ruleForm.checkPass" auto-complete="off"   placeholder="确认密码">
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "confirmShowPaw" @click="confirmShowPaw = false"/>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="confirmShowPaw = true"/>
             </el-input>

          </el-form-item>
          <el-form-item prop = 'agree' class = 'agreeGroup '>
            <el-checkbox-group v-model = "ruleForm.agree">
              <el-checkbox name="type"  class="checkbox_el"  >我同意并接受《<a @click = "toAboutUs">千氪财经用户协议</a>》</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class = 'register_formItem'>
            <el-button  size = 'small' type="primary" :loading = "loading" @click="submitForm('ruleForm')" class="btn width100" >注册</el-button>
          </el-form-item>
          <p v-if="show_direct" class = 'hasAccount'>已有账号？<a class = 'cursorPointer' @click = "goLogin">直接登录</a></p>

        </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone'
import { SIGTTIN } from 'constants';
export default {
  components: {
    
  },
  props:{
    registershow:{},
    visible:{},
    show_direct: {
      type:Boolean,
      default: true
    },
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    inviteCode: {
      type: String,
      default: ''
    },
    toLogin:{},
    aliBlock:{},
    showGetCandy:{},
    width: {
      type: String,
      default: '17%'
    },
    slideInfo:{},
    handleSlide:{}
  },
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
          name:'',
          code:"",
          agree:false,
          inviteCode:''
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],
          name:[
            {validator:validateName,trigger:'blur'}
          ],
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
      loading:false
    }
  },
  //已成功挂载，相当ready()
  mounted(){
    this.areaCode = codeData;
    this.ruleForm.inviteCode = this.inviteCode;
  },
  //相关操作事件
  methods: {
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
                      "userName":this.ruleForm.name,
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
                                                          that.cancel();
                                                          that.loading = false;
/*                                                          if(data.loginBonusStatus != 1){
                                                            that.showGetCandy()
                                                             location.reload()
                                                          }else{
                                                             location.reload()
                                                          }*/
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
      closeModal(){
        this.cancel();
        this.sendMsgDisabled = false;
        this.resetForm('ruleForm');
        window.clearInterval(this.interval);
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
              "mobileArea": this.select,
              "valiDation":1,
              "platform":'3',
              "session":this.slideInfo.session,
              "sig":this.slideInfo.sig,
              "token":this.slideInfo.nc_token,
              "scene":this.slideInfo.nc_scene,
            }
      ) 
        Lib.M.sendMessage(form,this,send_list,'#registerBlock','csessionid1','sig1','token1','scene1')
      }
  }
}
</script>

<style scoped>
.registerTitle{
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.registerTitle li{
  float:left;
  width:150px;
  text-align:center;
  color:#b3b3b3;
  margin-top:10px;
  cursor: pointer;
}
.top p:nth-child(1){
  width:260px;
  height:85px;
  margin: 0 auto;
  line-height:85px;

}

.top p:nth-child(2){
   width:300px;
   font-size:16px;
   color:#2b2222;
   text-align:center;
   letter-spacing:5px;
   padding: 10px 0;
}
.top img{
  display: inline-block;
  float: left;
}
.top span{
  display: inline-block;
  width:173px;
  text-align:center;
  color:#1d87ff;
  font-size:75px;
}
.bottom{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btn{
  width:100%;
  background: #228aff!important;
}
.active{
  color:#1d87ff!important;
}
.active span{
  padding-bottom: 5px;
  display: inline-block;
  border-bottom:2px solid #1d87ff;
}
.code{
  position: relative;
}
.codeBtn{
  position: absolute;
  top:4px;
  right: -6px;
  background: #1d87ff!important;
  color:#fff!important;
  border-top-left-radius :0;
  border-bottom-left-radius :0;
  padding:8px 15px;
}
.checkbox_el{
 color:#999; 
}
.checkbox_el a {
  color:#1d87ff!important;
}
.el-select{
  width:100%;
}
.hasAccount{
  margin-top:-10px;
}
</style>
<style>
  .el-input-group__prepend .el-input{
    width:250px;
  }
  .registerModal .el-form-item__error{
    padding-top:0px;
  }
  .registerModal .el-dialog--center .el-dialog__body{
    padding-left:38px;
    padding-right:38px;

    padding-top:10px;
  }
  .registerForm .el-form-item{
    margin-bottom:13px;
  }
  .agreeGroup{
    margin-top:-10px;
  }
  .agreeGroup .el-form-item__error{
      margin-top:-16px;
  }
  .register_formItem{
    margin-top:-16px;
  }
  .el-select-dropdown__wrap{
    max-width:230px;
  }
</style>
