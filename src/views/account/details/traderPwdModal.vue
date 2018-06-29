<template>
      <div>
        <el-dialog
         :v-show = "traderShow"
        class = 'safeModal'
                :title="traderBingding ? '设置交易密码' :'修改交易密码'"
                :visible="visible"
                width="15%"
                :lock-scroll = "false"
                center>
                <div class="forGetBox">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="">
                      <el-input  size = 'small' v-model = "defaultPhone" :disabled = "true" type="text">
                        <!-- <template slot="prepend">+{{areCode}}</template> -->
                      </el-input>
                    </el-form-item>
                    <!-- 滑动验证开始 -->
                      <div>
                        <div class="ln">
                          <div id="traderPwdBlock"></div>
                        </div>
                        <input type='hidden' id='csessionid55' name='csessionid55'/>
                        <input type='hidden' id='sig55' name='sig55'/>
                        <input type='hidden' id='token55' name='token55'/>
                        <input type='hidden' id='scene55' name='scene55'/>
                      </div>
                    <!-- 滑动验证结束 -->
                    <el-form-item label="" prop = "code">
                      <el-input  size = 'small' type="text" v-model="ruleForm.code" auto-complete="off" class=" code" placeholder="验证码">
                      <el-button   size = 'small' slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
                        <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">验证码</span>
                      </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop = 'pass'>
                      <el-input  
                      size = 'small'
                       type="password" 
                       v-model="ruleForm.pass" 
                       auto-complete="off" 
                         
                        placeholder="密码"
                        onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop = 'checkPass'>
                      <el-input   size = 'small' type="password" v-model="ruleForm.checkPass" auto-complete="off"    placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item class = 'footer_btn'>
                      <el-button  size = 'small' @click="cancelHandle('ruleForm')"  class=" btnModal" >取消</el-button>
                      <el-button  size = 'small' :loading = 'creatLoading' @click="onSubmit('ruleForm')" type="primary"  class=" btnModal2">确定</el-button>
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
  components: {
  
  },
  props:{
    traderShow:{
      type:Boolean,
      default: false
    },
    visible:{},
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    item:{},
    defaultPhone:{},
    traderBingding:{},
    traderChange:{},
    oldPhone:{},
    handleSlide:{},
    slideInfo:{}
  },
  data() {
      let validatePhone = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入手机号'));
        } else if(!(Lib.V.validatePhone(value))){
          callback(new Error('请正确输入手机号'));
        }
        else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
          if ( value == '') {
            return callback(new Error('请输入交易密码'));
          }else if(!(Lib.V.validateTraderPwd(value))){
            return callback(new Error('请正确输入交易密码(6位数字)'));
          }else {
              callback();
          }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入交易密码'));
        }else if (value !== this.ruleForm.pass){
          callback(new Error('两次密码不相同'));
        } else {
          callback();
        }
      };      
      let validateCode = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入验证码'));
        }else if(value.length >6){
          callback(new Error('验证码长度不超过6位数'));
        }else {
          callback();
        }
      };
    return {
 
      areaCodeData:[{}],
      sendMsgDisabled:false,
      time:90,
      ruleForm:{
          phone:"",
          pass: '',
          checkPass: '',
          code:"",
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
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

      },
      interval:null,
      creatLoading:false,
      hasPhone:true,
      areCode:"86",
      atskMobile:""
    }
  },
  mounted(){
    this.ruleForm.phone = this.item.userMobile;
    this.areCode = localStorage.getItem('kg_desk_mobileArea');
    this.atskMobile = localStorage.getItem('kg_desk_atskMobile');
  },
  //相关操作事件
  methods: {

    cancelHandle(form){
      this.cancel();
      this.sendMsgDisabled = false;
      this.$refs['ruleForm'].resetFields();
    },
    onSubmit(formName) {
      const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const submit_list = Lib.M.dataRequest({
              "userId":localStorage.getItem('kg_desk_userId'),
              "code":that.ruleForm.code,
              "password":that.ruleForm.pass,
            })
            that.creatLoading = true;
            Lib.M.ajax({
                    'type':'post',
                    'url':"lynn/setTxPassword",
                    "data":submit_list,
                    'success':function (data){
                      if(data.code == 10000){
                            that.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            that.creatLoading = false;
                            that.sendMsgDisabled = false;
                            that.traderChange(false);
                            setTimeout(()=>{
                                that.cancelHandle('ruleForm')
                            },1000);

                      }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                        that.creatLoading = false;
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
      const send_list = Lib.M.dataRequest({
        "verIfy":this.oldPhone,
        "mobileArea":this.areCode,
        "platform":'3',
        "session":this.slideInfo.session,
        "sig":this.slideInfo.sig,
        "token":this.slideInfo.nc_token,
        "scene":this.slideInfo.nc_scene,
      });
      const that = this;
      Lib.M.sendMessage(form,that,send_list,'#traderPwdBlock','csessionid55','sig55','token55','scene55');
    },
  }
}
</script>

<style scoped>
</style>
<style>
  .el-input__suffix{
    right:0px;
  }
</style>
