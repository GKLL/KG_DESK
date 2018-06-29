<template>
      <div>
      <el-dialog
                title="绑定手机号"
                :visible.sync="visible"
                width="20%"
                :before-close="cancel"
                center>
                <div class="forGetBox">
                  <p class="title font14">验证码将会发送至你的手机号</p>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                  <el-form-item label="" prop="phone">
                        <el-input v-model="ruleForm.phone" type="text" class="martop20" placeholder='手机号'></el-input>
                  </el-form-item>
                  <el-form-item label="" prop = 'code'>
                        <el-input  v-model="ruleForm.code" type="text" class=" code" placeholder='验证码'>
                          <el-button  slot="suffix" type="primary" @click="sendCode('ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                            <span v-if="sendMsgDisabled">{{'重新发送('+time+')'}}</span>
                            <span v-if="!sendMsgDisabled">验证码</span>
                          </el-button>
                        </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button   @click="onCancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                    <el-button   @click = "onSubmit('ruleForm')" type="primary"  class=" btnModal2">确定</el-button>
                  </el-form-item>
              </el-form>
            </div>
        </el-dialog>
      </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  components: {},
  props: {
    visible:{},
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    changeBindingValue:{}
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
      let validateCode= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else if(value.length > 6){
           callback(new Error('验证码长度不超过6位数,请检查'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
          phone:'',
          pass: '',
          mail:"",
          name:'',
          code:"",
          userPassword:"",
          newPwd:"",
          confirmPwd:"",
          fixCode:"",
          newPhone:"",
          newEmail:"",
          oldCode:""
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],         
          code:[
            {validator: validateCode, trigger: 'blur' }
          ],
      },
      interval:null,
      time:180,
      sendMsgDisabled:false,
    }
  },
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
  methods: {
        onSubmit(formName){
          const that = this;
/*          const  submit_list = Lib.M.dataRequest({
                          "userId":localStorage.getItem('kg_desk_userId'),
                          "realname":this.ruleForm.name,
                          "idcardNo":this.ruleForm.idCode,
                          "idcardFront":this.ruleForm.idcard1,
                          "idcardBack":this.ruleForm.idcard2,
                          "idcardPic":this.ruleForm.idcard3,
          });
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  Lib.M.ajax({
                        'type':'post',
                        'url':'/lynn/userCert',
                        "data":submit_list,
                        'success':function (data){
                          if(data.code == 10000){
                            that.$message({
                              message: '提交成功',
                              type: 'success'
                            });
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
          });*/
          this.changeBindingValue(123)
        },
        sendCode(form){
            const that  = this;
            const send_list = Lib.M.noSignRequest({"verIfy":this.ruleForm.phone})
            Lib.M.sendMessage(form,that,send_list);
        },
        onCancel(formName){
          this.$refs[formName].resetFields();
          this.cancel()
        },
  }
}
</script>

<style scoped>
 .avatar-uploader{
  display:inline-block;
  margin-left: 30px;

}
/* .perId .avatar-uploader:first-child{
  margin-right: 15px;
} */
.perId {
  margin-bottom: 15px;
  display: inline-block;
}

.handId{
  display: inline-block;
}
.crlic{
  display: inline-block;
  width:38px;
  height:38px;
  background-image: url("../../../assets/img/xxx.png");
  position: absolute;
  left:38%;
  top:30%;
}
.avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 9;
      width:166px;
  height:102px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #d9d9d9!important;
  }
/*   .perId .avatar-uploader:nth-child(1) .avatar-uploader-icon{
  background-image: url("../../../assets/img/id1.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.perId .avatar-uploader:nth-child(2) .avatar-uploader-icon{
  background-image: url("../../../assets/img/id2.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.handId .avatar-uploader:nth-child(1) .avatar-uploader-icon{
  background-image: url("../../../assets/img/id3.png");
  background-repeat: no-repeat;
  background-size: 100%;
} */
  .handId .avatar-uploader .avatar-uploader-icon{
     width: 166px;
    height: 138px;
    line-height: 144px;
  }
  .avatar-uploader-icon {
   
    font-size: 28px;
    color: #fff;
    width: 166px;
    height: 102px;
    line-height: 106px;
    text-align: center;
    background: #f4f4f4;
    position: relative;
    z-index: 100;
  }
.idcardContent{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.idCard{
  width:172px;
  height:106px;
}

</style>
<style>
  .footer_btn .el-form-item__content{
    text-align: center;
    margin-left:0px!important;
  }
</style>
