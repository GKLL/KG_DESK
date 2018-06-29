<template>
  <div v-show = "retrieveshow">
    <el-dialog
        class = 'retrieve'
        title="找回密码"
        :visible.sync="visible"
        width="15%"
        :before-close = "cancelHandle"
        :close-on-click-modal = "false"
        :lock-scroll = "false"
        center>
        <div class="forGetBox">
          <p class="title">验证码将会发送至你的手机</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">  
                <el-form-item label=""  prop = 'phone'>
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
                <!-- 滑动验证开始 -->
                <div>
                  <div class="ln">
                    <div id="retrieveDetailBlock"></div>
                  </div>
                  <input type='hidden' id='csessionid0002' name='csessionid0002'/>
                  <input type='hidden' id='sig0002' name='sig0002'/>
                  <input type='hidden' id='token0002' name='token0002'/>
                  <input type='hidden' id='scene0002' name='scene0002'/>
                </div>
                <!-- 滑动验证结束 -->
                 <el-form-item label=""  prop = 'code'>
                  <el-input  v-model="ruleForm.code" size = "small" type="text" class=" code" placeholder='验证码'>
                    <el-button size = "small" slot="suffix" type="primary"  @click="send('ruleForm')"  class="codeBtn" :disabled='sendMsgDisabled'>
                      <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                      <span v-if="!sendMsgDisabled">验证码</span>
                    </el-button>
                  </el-input>
                </el-form-item>
                 <el-form-item label="" prop = 'pass'>
                  <el-input 
                  onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
                  v-model="ruleForm.pass" size = "small" :type="showPaw ? 'text' : 'password'" class="paw_el" placeholder='新密码'>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "showPaw" @click="showPaw = false"/>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="showPaw = true"/>
                  </el-input>
                </el-form-item>
                 <el-form-item label=""  prop = 'checkPass'>
                  <el-input
                  onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
                   v-model="ruleForm.checkPass" size = "small" :type="newshowPaw ? 'text' : 'password'" class="paw_el" placeholder='确认密码'>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing' v-if = "newshowPaw" @click="newshowPaw = false"/>
                    <span  slot="suffix" class='imgeye icon iconfont icon-yanjing1' v-else @click="newshowPaw = true"/>
                   </el-input>
                </el-form-item>
                <el-form-item>
                <el-button  size = "small" type="primary" @click = "submitForm('ruleForm')"  class=" btnModal2 width100">确认</el-button>
              </el-form-item>
              </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone'
export default {
  props:{
    retrieveshow:{},
    visible:{},
    cancel:{},
    aliBlock:{},
    handleSlide:{},
    slideInfo:{}
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
    }
  },
  components: {
    
  },
  mounted(){
  this.areaCode = codeData;
  },
  //相关操作事件
  methods: {
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
                        that.$message({
                          message: '恭喜你，修改密码成功',
                          type: 'success'
                        });
                          setTimeout(()=>{
                            that.cancelHandle()
                          },1000);
                      }else{
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
    send(form) {
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
        Lib.M.sendMessage(form,that,send_list,'#retrieveDetailBlock','csessionid0002','sig0002','token0002','scene0002')
    }
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom:12px;
}

.codeBtn{
  position: absolute;
  top:4px;
  right: -4px;
  background: #1d87ff!important;
  color:#fff!important;
  border-top-left-radius :0;
  border-bottom-left-radius :0;
  padding:8px 15px;
}
.el-select{
  width:100%;
}
</style>
<style>
  .retrieve .el-dialog--center .el-dialog__body{
  padding-top:8px;
}
.retrieve .el-form-item__error{
  padding-top:0px;
}
</style>
