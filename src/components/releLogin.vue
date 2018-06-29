<!--短信快捷登陆-->
<template>
  <div>
    <el-dialog
      class = 'LoginModal'
      title="关联账号"
      :visible="visible"
      width="331px"
        :before-close = "closeModal"
        :close-on-click-modal = "false"
        :lock-scroll = "false"
      center
      >
      <div class="loginBox">
          <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item label="" prop="phone" >
                  <el-input  prefix-icon="el-icon-search"  size = 'small' type="text" v-model="ruleForm.phone" auto-complete="off"   placeholder='请输入手机号' >
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
                <div>
                  <div class="ln">
                    <div id="releLoginBlock"></div>
                  </div>
                  <input type='hidden' id='csessionid102' name='csessionid102'/>
                  <input type='hidden' id='sig102' name='sig102'/>
                  <input type='hidden' id='token102' name='token102'/>
                  <input type='hidden' id='scene102' name='scene102'/>
                </div>      
                <el-form-item label="" prop="code"  >
                      <el-input  size = 'small'type="text" v-model="ruleForm.code" auto-complete="off" class="code" placeholder="验证码">
                      <el-button  size = 'small' slot="suffix" id="getCode" type="primary" class="codeBtn getCode" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
                        <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">获取验证码</span>
                      </el-button>
                      </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  
                      type="primary"
                      @click="submitForm('ruleForm')"
                      class="btn width100" 
                       :loading="loginLoading"
                     >登录</el-button>
                </el-form-item>
                  <p class="messageLogin"><a @click = "toReady" class = 'cursorPointer'>账号密码登录</a></p>
        </el-form>
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
    toRetrieve:{},
    toReady: {},
    userInfo:{},
    slideInfo:{},
    handleSlide:{}
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
      select: "86"
    }
  },
  mounted(){
    this.areaCode = codeData;
  },
  //相关操作事件
  methods: {
/*    toReady () {
        this.toReady ();
    },*/
send(form) {
      this.sendMsg = false;
        const that = this;
        const send_list  = Lib.M.noSignRequest(
            {
              "verIfy":this.ruleForm.phone,
              "mobileArea":this.select,
              "platform":'3',
              "session":this.slideInfo.session,
              "sig":this.slideInfo.sig,
              "token":this.slideInfo.nc_token,
              "scene":this.slideInfo.nc_scene,
            }
          ) 
      Lib.M.sendMessage(form,this,send_list,'#releLoginBlock','csessionid102','sig102','token102','scene102');
    },
    focus(form){
      this.$refs[form].clearValidate()
    },
    submitForm(formName) {
      const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const login_phonelist = Lib.M.noSignRequest({
                  "userMobile":this.ruleForm.phone,
                  "code":this.ruleForm.code,
                  "openId":this.userInfo.openId,
                  "openType":localStorage.getItem('openType')
            })    
            const localUrl = localStorage.getItem('localUrl');
            this.loginLoading = true;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/thirdParty/bindMobileLogin',
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
                        // location.reload()
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
.messageLogin {text-align: center;}
#getCode  {
    font-size: 12px !important;
    font-family:'PingFangSC-Regular' !important; 
    position: relative;
    left: 5px;
}
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