<template>
    <div>
      <el-dialog
          :visible="visible"
          width="24%"
          :before-close = "cancel"
          class = 'awardModal'
          center>
          <p>打赏Ta</p>
          <div class = 'tags'>
            <span class="active_tag award_tag cursorPointer" v-for = "item in data" @click = 'tagChecked(item)'>{{item.label}}</span>
            <span v-if = 'inputVisible' class = 'award_tag cursorPointer custom_input' @click = 'custom'>自定义</span>
            <div v-else class = 'cutomContent'>
              <el-input    @change = "onChange(form.value)" id = "custom_input" class = 'custom_input'  v-model = "form.value" type="text"  placeholder = "自定义"
                onkeypress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"
              ></el-input>
                              <!-- onkeypress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false" -->
              <span>TV</span>
            </div>
          </div>
          <el-form >
                <span class = 'explain'>说明：每天最多打赏5次，每次最多100钛值</span>
                <el-form-item class = 'footer_btn martop10'>
                      <el-button   @click="cancel"  class=" btnModal" >取消</el-button>
                      <el-button   @click="nextStep" type="primary"  class=" btnModal2">确定</el-button>
                </el-form-item>
          </el-form>

        </el-dialog>
           <el-dialog
          :visible="pswVisible"
          width="28%"
          :before-close = "cancelPws"
          class = 'awardModal'
          center>
          <p>确认为Ta打赏吗？</p>
          <el-form   :model="form"  :rules="rules" ref="form">
               <el-form-item prop = 'password'>
                        <el-input 
                         class = 'martop10'
                          v-model = "form.password" 
                          type="password" 
                          placeholder="请输入交易密码"
                          onpaste="return false"  oncopy="return false" oncut="return false"
                          onkeypress="if(event.keyCode== 13)event.returnValue=false"
                           ></el-input>
                </el-form-item>
                <span class = 'martop10 toTraderPwd'>如果还没有交易密码，请去<a class = 'cursorPointer color1d87' @click = "toTraderPwd">设置交易密码</a></span>
                 <el-form-item class = 'footer_btn martop10'>
                      <el-button   @click="cancelPws('form')"  class=" btnModal" >取消</el-button>
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
      var validateValue = (rule, value, callback) => {
         if(value > 100) {
          callback(new Error('每次最多100TV'));
        }else {
          callback();
        }
      };
    return {
      data:[
          {'value':"1","label":"1TV","iscur":"true"},
          {'value':"3","label":"3TV","iscur":"false"},
          {'value':"5","label":"5TV","iscur":"false"},
          {'value':"10","label":"10TV","iscur":"false"},
          {'value':"15","label":"15TV","iscur":"false"},
          {'value':"20","label":"20TV","iscur":"false"},
          {'value':"30","label":"30TV","iscur":"false"},
          {'value':"50","label":"50TV","iscur":"false"},
      ],
      checkedVal:"1",
      pswVisible:false,
      form:{
        password:'',
        value:'',
      },
      rules: {
          password: [
            { required: true, message: '请输入交易密码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入6位交易密码（数字）', trigger: 'blur' }
          ],
          value:[
              { validator: validateValue, trigger: 'blur' }
          ]
      },
      inputVisible:true,
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
    returnFalse(){
      return false
    },
    cancelPws(formName){
      // this.cancel()
      this.pswVisible = false
      this.$refs[formName].resetFields();
    },
    toTraderPwd(){
      localStorage.setItem('trader_pwd',2)
      // Lib.M.accountSafe()
      window.open ("../account/details.html#/account_safe")
    },
    onChange(value){

        let reg = /^[1-9]\d*$/;
        if (value) {
            if (value > 999999 || new RegExp(reg).test(value) ==false) {
                value ='';
            }
        }

    },
    custom(){
      let tags = document.getElementsByClassName('award_tag');
          // custom_input.select(); 
          this.$nextTick(function(){
      const custom_input = document.getElementById('custom_input');
      const custom_input1 = document.getElementsByClassName('custom_input')[0];
          })
          // document.execCommand("Copy")
      for(var i = 0,l = tags.length;i < l;i++){
           tags[i].style.backgroundColor = "#fff"
           tags[i].style.color = "#333"
           tags[i].style.borderColor = "#ccc"
      }
      this.checkedVal = ''
      this.form.value = '';
      this.inputVisible = false;

    },
    nextStep(){
      if(this.form.value == '' && this.checkedVal == ''){
            this.$message({
                 message:'请输入或者选择要打赏的金额',
                type: 'warning'
            });
            return
      }else if(this.form.value != "" && (this.form.value < 0.001 || this.form.value > 100)){
             this.$message({
                 message:'请输入0.001-100钛值的打赏金额',
                type: 'warning'
            });           
      }else{
        this.pswVisible = true
      }     
    },
    onSubmit(form){
      const that = this;
        this.$refs[form].validate((valid) => {
          if (valid) {
                  let Request = new Object();
                  Request = Lib.M.GetRequest();
                          let url_id = Request['id'];
                        url_id = url_id.split('_');
                        const article_id = Base64.decode(url_id[0]);
                  const award_list = Lib.M.dataRequest({
                              "articleId":article_id,
                              "userId":localStorage.getItem('kg_desk_userId'),
                              "balance":this.form.value == ''? this.checkedVal:this.form.value,
                              "txPassword":this.form.password,

                   })
                  this.loading = true;
                  Lib.M.ajax({
                              'type':'post',
                              'url':'/account/updateBalance',
                              "data":award_list,
                              'success':function (data){
                                if(data.code == 10000){
                                    that.$message({
                                      message:'打赏成功',
                                      type: 'success'
                                    });
                                    that.loading = false
                                    that.pswVisible = false
                                    that.cancel()
                                    that.$refs[form].resetFields();
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
    tagChecked(item){
      let tags = document.getElementsByClassName('award_tag');
      for(var i = 0,l = tags.length;i < l;i++){
        if(tags[i].innerText == item.label){
            tags[i].style.backgroundColor = "#1d87ff"
            tags[i].style.color = "#fff"
            tags[i].style.borderColor = "#1d87ff"
        }else{
           tags[i].style.backgroundColor = "#fff"
           tags[i].style.borderColor = "#ccc"
           tags[i].style.color = "#333"
        }
      }
      this.form.value = "";
      this.checkedVal = item.value;
      this.inputVisible = true;
    },
  }
}
</script>

<style scoped>
  .awardModal p{
    text-align: center;
    font-size:20px;
    font-weight: bold;
  }
  .tags{
    width:100%;
    margin:20px 0px 0px;
    padding:0px 12px;
  }
  .awardModal .award_tag {
    display: inline-block;
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    color: #333;
    margin: 10px 15px 0px 0px;
  }
  .footer_btn{
    text-align: center;
  }
  .active_tag{
    background-color:#1d87ff;
    color:#fff;
  }
  .award_tag:nth-child(1){
    background-color:#1d87ff;
    color:#fff;
  }

  .cutomContent span{
    position: absolute;
    top:9px;
    right:10px;
    background:#fff;
    z-index: 100;
  }
  .custom_input{
    border:none;
    width:94%!important;
    margin-right:0px!important;
  }
  .toTraderPwd{
    display: block;
    text-align: right;
  }
    .cutomContent{
    position: relative;
    width:95%;
    border-radius: 4px;
    margin-top:10px;
  }
  .explain{
    /*margin-left:4px;*/
    margin:5px 13px 6px 13px;
    display: inline-block;
  }
</style>
<style>
  .awardModal .el-dialog__body{
      padding:0px 20px 20px;
  }
  .awardModal .el-dialog--center .el-dialog__header{
      padding-top:5px;
  }
  .awardModal .el-form-item{
    margin-bottom:2px;
  }
  .custom_input input{
    display: inline-block;
    width:94%!important;
    margin-right:0px!important;
    height:38px;
    line-height: 38px;
    text-align: left;
    background:#fff;
    /*margin:10px;*/
    border-radius: 0px;
  }
    .cutomContent .custom_input, .cutomContent .custom_input input{
    width:100%!important;
    border-radius: 4px;
  }
  @media only screen and (max-width: 768px){
    .cutomContent .custom_input, .cutomContent .custom_input input{
        width:100%!important;
        border-radius: 30px;
        border: 1px solid #FFF!important;

    }
    .custom_input input{
      background: #eee;
    }
  }
</style>
