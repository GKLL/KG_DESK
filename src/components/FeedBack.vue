<template>
    <div>
        <el-dialog
          :visible="visible"
          width="28%"
          :before-close = "cancelHandel"
          class = 'awardModal'
          center>
          <p>意见反馈</p>
          <el-form   :model="form"  :rules="rules" ref="form">
                <el-form-item prop = 'textarea'>
                        <el-input  class = 'martop10' v-model = "form.textarea" :autosize="{ minRows: 5, maxRows: 7}"  type="textarea" placeholder="您的意见" ></el-input>
                </el-form-item>
                <el-form-item prop = 'email'>
                        <el-input  class = 'martop10' v-model = "form.email" type="text" placeholder="您的邮箱" ></el-input>
                </el-form-item>
                <el-form-item>
                        <el-input  class = 'martop10' v-model = "form.phone" type="text" placeholder="您的手机号" ></el-input>
                </el-form-item>
                 <el-form-item class = 'footer_btn martop10'>
                      <el-button   @click="cancelHandel"  class=" btnModal" >取消</el-button>
                      <el-button  :loading = "loading" @click="onSubmit('form')" type="primary"  class=" btnModal2">确定</el-button>
                </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
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
      let validateMail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if(!(Lib.V.validateMail(value))){
           callback(new Error('请正确输入邮箱'));
        } else {
          callback();
        }
      }; 
    return {
      form:{
        textarea:'',
        phone:'',
        email:''
      },
      rules: {
          textarea: [
            { required: true, message: '请输入意见反馈', trigger: 'blur' },
            { min: 1, max: 500, message: '不超过500个字', trigger: 'blur' }
          ],
          phone:[
              { validator: validatePhone, trigger: 'blur' }
          ],         
          email:[
              { validator: validateMail, trigger: 'blur' }
          ],
      },
      loading:false,
    }
  },
  components: {},
  props: {
    visible:{},
    cancel:{}
  },
  //相关操作事件
  methods: {
    onSubmit(form){
      const that = this;
      let feed_url = window.location.href;
        this.$refs[form].validate((valid) => {
          if (valid) {
                  const post_list = Lib.M.dataRequest({
                              "feedbackDetail":this.form.textarea,
                              "feedbackEmail":this.form.email,
                              "feedbackPhone":this.form.phone,
                              "fromUrl":feed_url
                   })
                  this.loading = true;
                  Lib.M.ajax({
                              'type':'post',
                              'url':'/feedback/addFeedback',
                              "data":post_list,
                              'success':function (data){
                                if(data.code == 10000){
                                    that.$message({
                                      message:'提交成功',
                                      type: 'success'
                                    });
                                    that.$refs['form'].resetFields()
                                    that.loading = false
                                    that.pswVisible = false
                                    that.form.phone = ''
                                    that.cancel()
                                }else{
                                    that.$message({
                                      message: data.message,
                                      type: 'error'
                                    });
                                    that.loading = false
                                }
                          }
                  });
          } else {
            return false;
          }
        });
    },
    cancelHandel(){
      this.cancel();
      this.$refs['form'].resetFields();
      this.form.phone = ''
    },
  }
}
</script>

<style scoped>
</style>
