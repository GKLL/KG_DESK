<template>
      <div>
        <el-dialog
                title="实名认证"
                :visible="visible"
                width="40%"
                class = 'approveModal'
                :before-close = "cancel"
                center>
                <div class="forGetBox">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                    <el-form-item label="真实姓名" prop = 'name'>
                      <el-input size = 'small' v-model = "ruleForm.name" type="text" placeholder="请输入真实姓名" ></el-input>
                    </el-form-item>
                     <el-form-item label="身份证号" prop = 'idCode'>
                      <el-input size = 'small' v-model = "ruleForm.idCode" type="text"   placeholder='请输入身份证号'>
                      </el-input>
                    </el-form-item>
                              <div class = 'idcardContent'>
                                       <el-upload
                                                  class="avatar-uploader"
                                                  :action="uploadUrl"
                                                  :show-file-list="false"
                                                  :on-success="handleAvatarSuccess1"
                                                  :before-upload="beforeAvatarUpload">
                                                  <img v-if="imageUrl.idcard1" :src="imageUrl.idcard1" class="idCard" />
                                                  <i v-else class="el-icon-plus avatar-uploader-icon">
                                                    <span class="crlic"></span>
                                                  </i>
                                        </el-upload>
                                        <el-upload
                                              class="avatar-uploader"
                                              :action="uploadUrl"
                                              :show-file-list="false"
                                              :on-success="handleAvatarSuccess2"
                                              :before-upload="beforeAvatarUpload">
                                              <img v-if="imageUrl.idcard2" :src="imageUrl.idcard2" class="idCard">
                                              <i v-else class="el-icon-plus avatar-uploader-icon">
                                                <span class="crlic">
                                                </span>
                                              </i>
                                        </el-upload>
                                        <el-upload
                                                  class="avatar-uploader"
                                                  :action="uploadUrl"
                                                  :show-file-list="false"
                                                  :on-success="handleAvatarSuccess3"
                                                  :before-upload="beforeAvatarUpload">
                                                  <img v-if="imageUrl.idcard3" :src="imageUrl.idcard3" class="idCard">
                                                  <i v-else class="el-icon-plus avatar-uploader-icon">
                                                    <span class="crlic"> 
                                                    </span>
                                                  </i>
                                        </el-upload>
                                </div>
                                <div class="el-input colorc5 martop10">
                                      单张图片不超过2M,支持jpg、png、jpeg等，必须包含身份证正反两面、
                                    手持身份证照片及其日期，且证件中的信息清晰可见
                                </div>
                    <el-form-item class = 'footer_btn'>
                      <el-button size = 'small'  @click="cancel"  class=" btnModal" >取消</el-button>
                      <el-button  :loading = "loading" size = 'small' @click="onSubmit('ruleForm')" type="primary"  class=" btnModal2">提交认证</el-button>
                    </el-form-item>
              </el-form>
            </div>
        </el-dialog>
        <div class="el-message-box__wrapper" v-if="isRepeat">
          <div class="isRepeat el-message-box" >
            <i class="el-message-box__close el-icon-close isRepeatClose" @click="isRepeat=!isRepeat"></i>
            <div class="el-dialog__header">
              <span class="el-dialog__title">认证失败</span>
            </div>
            <div class="el-message-box__content">
              <p>已有用户使用了你提交的认证信息,请重新提交</p>
              <p>如有疑问，请联系客服：028-86056123</p>
            </div>
            <div class="el-message-box__btns">
              <el-button type="primary" @click="isRepeat=!isRepeat">我知道了</el-button>
            </div>
          </div>
        </div>

      </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    let validateID = (rule, value, callback) => {
      if(value == ""){
          callback(new Error('请输入身份证号'));
      }else if (value !="" && !(Lib.V.validateIdCard(value))) {
          callback(new Error('身份证号码输入不正确'));
        }else {
          callback();
        }
    };     
    let validateRealName = (rule, value, callback) => {
       if(value ==""){
          callback(new Error('请输入真实姓名'));
      }else if (value !="" && !(Lib.V.validateRealName(value))) {
          callback(new Error('真实姓名输入不正确'));
        }else {
          callback();
        }
    };   
    return {
      loadingShow:true,
        ruleForm:{
          name:'',
          idCode:'',
          idcard1:"",
          idcard2:"",
          idcard3:"",
        },
        rules:{
          name:[
            { required: true, validator: validateRealName, trigger: 'blur' },
          ],
          idCode:[
            { required: true,  validator:validateID, trigger: 'blur' }
          ],
        },
        uploadUrl:Lib.C.url,
        imageUrl:{
            avatar:'',
            idcard1:require("../../../assets/img/id1.png"),
            idcard2:require("../../../assets/img/id2.png"),
            idcard3:require("../../../assets/img/id3.png"),
        },
        loading:false,
        isRepeat: false
    }
  },
  components: {},
  props: {
    visible:{},
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    getInitPhone:{},
    accountData:{},
  },
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
  methods: {
    onSubmit(formName){
      const that = this;
      const  submit_list = Lib.M.dataRequest({
                      "userId":localStorage.getItem('kg_desk_userId'),
                      "realname":this.ruleForm.name,
                      "idcardNo":this.ruleForm.idCode,
                      "idcardFront":this.ruleForm.idcard1,
                      "idcardBack":this.ruleForm.idcard2,
                      "idcardPic":this.ruleForm.idcard3,
      });

    
      this.$refs[formName].validate((valid) => {
          if (valid) {
                  if(that.ruleForm.idcard1 == '' || that.ruleForm.idcard2 == "" || that.ruleForm.idcard3 == ""){
                        that.$message({
                            message: '请上传3张证件照片',
                            type: 'error'
                       });
                    return
                 }
              that.loading = true
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
                        that.loading = false;
                        that.cancel();
                        that.getInitPhone(that.accountData);
                        that.loadingShow = false;
                      }
                      else if (data.code == 20118) {
                        that.isRepeat = true;
                        that.loading = false;
                      }
                      else{
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
    handleAvatarSuccess1(res, file) {
        this.ruleForm.idcard1= res.data[0].filePath;
        this.imageUrl.idcard1 = URL.createObjectURL(file.raw);
     },
    handleAvatarSuccess2(res, file) {
          this.ruleForm.idcard2 = res.data[0].filePath;
          this.imageUrl.idcard2 = URL.createObjectURL(file.raw);
     },
    handleAvatarSuccess3(res, file) {
          this.ruleForm.idcard3 = res.data[0].filePath;
          this.imageUrl.idcard3 = URL.createObjectURL(file.raw);
     },
    beforeAvatarUpload(file) {
        let isTrue = false;
        if(file.type ==='image/jpeg' || file.type === 'image/png'){
          isTrue = true;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isTrue) {
          this.$message.error('图片格式不对!');
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能超过 2MB!');
        }
        return isTrue && isLt2M;
      }
    }
}
</script>
<style lang="less">
.el-button  {
  span {
    font-family: 'Adobe Heiti Std R' !important;
  }
  
}
</style>

<style scoped lang="less">
.isRepeat{
  position: relative;
  padding: 0 32px;
  .el-dialog__title{
    font-size:18px;
    font-family:'Adobe Heiti Std R' !important;
    color:rgba(77,77,77,1);
  }
  .el-button--primary{
    background: #228AFF;
  }
}
.isRepeatClose{
  position:absolute;
  right:10px;
  top:10px;
  width:18px;
  height:18px;
  display:block;
  color: #C6C6C6;
  border: 1px solid;
  border-radius: 50%;
}
.el-message-box{
  width:330px;
}
.el-message-box__content{
  font-size: 14px;
  padding-top:20px;
  padding-bottom:40px;
  color:#4D4D4D;
  font-family: 'Adobe Heiti Std R' !important;
}
.el-message-box__wrapper{
  z-index: 2080;
  background: rgba(0, 0, 0, 0.3)
}
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
