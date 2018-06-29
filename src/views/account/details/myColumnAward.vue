<template>
   <div class = 'myColumn myColumn_noLeft'>
    <header class = 'myColumn_header flexR'>
      <div class = 'schedule_title'>
        <span class = 'color1d87'>写文章</span>
        <span class = 'schedule_line'></span>
        <span class = 'color1d87'>阅读奖励</span>
      </div>
    </header>
    <div class = 'myColumn_main'>
        <el-form :inline="true" ref="form"  :model="form"  size = 'small'>
          <p>当前您账户中的钛值:<span  class = 'color_red'>342</span><span  class = 'color_red'>奖励数已超出账户余额</span></p>

          <!-- 浏览 -->
          <el-form-item label="">
              <el-checkbox  @change = "onChange('browse')" v-model = "form.browseChecked" name="type"  class="checkbox_el el-input" >首次浏览文章</el-checkbox>
          </el-form-item><br/>
          <el-form-item label="浏览时长满">
            <el-input v-model="form.browseTiem" :disabled = "form.browse"  type="text" class="el-input"></el-input>
            <span class = 'marlr'>分钟</span>
          </el-form-item>
          <el-form-item label="奖励钛值" >
            <el-input v-model="form.browseAward"  :disabled = "form.browse" class="el-input"></el-input>
            <span class = 'marlr'>个/人</span>
          </el-form-item>
          <el-form-item label="最大奖励人数" >
            <el-input v-model="form.browseMaxAward" :disabled = "form.browse" class="el-input"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div>您的文章有3000字，正常阅读完约<span class = 'color_red'>4</span>分钟，建议您设置为4分钟以上，以保证文章内容被有效获知</div>
          <!-- 点赞 -->
          <el-form-item label="">
              <el-checkbox @change = "onChange('like')"  v-model = "form.likeChecked" name="type"  class="checkbox_el el-input" >首次点赞文章</el-checkbox>
          </el-form-item>
          <el-form-item label="奖励钛值" >
            <el-input v-model="form.likeAward"  :disabled = "form.like" class="el-input"></el-input>
            <span class = 'marlr'>个/人</span>
          </el-form-item>
          <el-form-item label="最大奖励人数">
            <el-input v-model="form.likeMaxAward" :disabled = "form.like" class="el-input"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div>为确保您的文章点赞数有效累加，我们规定了其他用户<span  class = 'color_red'>首次点赞成功</span>时才能获得您的奖励。这个规则不合理？可以给我们反馈</div>
          <!-- 收藏 -->
          <el-form-item label="" >
              <el-checkbox  @change = "onChange('collect')"  v-model = "form.collectChecked" name="type"  class="checkbox_el el-input" >首次收藏文章</el-checkbox>
          </el-form-item>
          <el-form-item label="奖励钛值" >
            <el-input v-model="form.collectAward" :disabled = "form.collect" class="el-input"></el-input>
            <span class = 'marlr'>个/人</span>
          </el-form-item>
          <el-form-item label="最大奖励人数">
            <el-input v-model="form.collectMaxAward" :disabled = "form.collect" class="el-input"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div>为确保您的文章收藏数有效累加，我们规定了其他用户<span  class = 'color_red'>首次收藏成功</span>时才能获得您的奖励。这个规则不合理？可以给我们反馈</div>
          <!-- 分享 -->
          <el-form-item label="">
              <el-checkbox  @change = "onChange('share')" v-model = "form.shareChecked" name="type"  class="checkbox_el el-input" >首次分享文章</el-checkbox>
          </el-form-item><br />
          <el-form-item>
                <el-radio-group :disabled = "form.radioDisabled" @change = "radioChang" v-model="form.shareRadio">
                  <el-radio :label="1">首次分享成功至微信或微博</el-radio>
                  <el-radio :label="2">首次分享成功至微信</el-radio>
                  <el-radio :label="3">首次分享成功至微博</el-radio>
                </el-radio-group>
          </el-form-item><br/>
          <el-form-item label="奖励钛值  " prop="shareAward">
            <el-input v-model="form.shareAward"  :disabled = "form.share" class="el-input"></el-input>
            <span class = 'marlr'>个/人</span>
          </el-form-item>
          <el-form-item label="最大奖励人数" prop="shareMaxAward">
            <el-input v-model="form.shareMaxAward" :disabled = "form.share" class="el-input"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div>分享成功：用户将文章分享到微信或微博后，他人在微信或微博内成功打开了这篇文章，即视为该用户分享成功</div>
          <el-form-item>
            <div class="btn">
            <el-button  type="primary" @click="onSubmit('form')" class="ml20 ml30">确认提交</el-button>
            <el-button    class="ml20 ml30">存草稿</el-button>
            </div>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

export default {
  components: {
  },
  data () {
    return {
      form: {
          //浏览
          browse:true,
          browseChecked:false,
          browseTiem:"",
          browseAward:"",
          browseMaxAward:"",
          //点赞
          like:true,
          likeChecked:false,
          likeAward:"",
          likeMaxAward:"",
          //收藏
          collect:true,
          collectChecked:false,
          collectAward:"",
          collectMaxAward:"",
          //分享
          radioDisabled:true,
          share:true,
          shareChecked:false,
          shareRadio:null,
          shareAward:"",
          shareMaxAward:"",
      },
    id:'',
    }
  },
  mounted(){
      this.id = this.$route.query.id;
      switch(this.id){
          case '2':

            break;
          case '3':
            this.mediaVisible = true;
            break;
          case '4':

            break;
          default:
      };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
/*              Lib.M.ajax({
                  'type':'post',
                  'url':'userprofile/addUserProfile',
                  "data":submit_list,
                  'success':function (data){
                      if(data.code == 10000){
                          that.$message({
                                message:"提交成功",
                                type: 'success'
                          });
                          that.$router.push('/column')                       
                      }else{
                          that.$message({
                                message: data.message,
                                type: 'error'
                          });
                      }
                  }
              }); */
          } else {
            return false;
          }
        });
    },
    onChange(val){
      switch(val){
        case "browse":
        this.browseChecked = !this.browseChecked;
        break;
        case "like":
        this.likeChecked = !this.likeChecked;
        break;
        case "collect":
        this.collectChecked = !this.collectChecked;
        break;       
        case "share":
        this.shareChecked = !this.shareChecked;
        break;
        default:
      }
      this.form.browse = this.browseChecked ? false:true
      this.form.like = this.likeChecked ? false:true
      this.form.collect = this.collectChecked ? false:true
      this.form.radioDisabled = this.shareChecked ? false:true
      if(!this.shareChecked){
        this.form.share = true
      }else if(this.shareChecked && this.form.shareRadio !== null){
        this.form.share = false
      }
    },
    radioChang(val){
      this.form.shareRadio = val;
      if(this.shareChecked){
        this.form.share = this.form.shareRadio !== null ? false:true      
      }else{
        this.form.share = false
      }
    },
  }
}
</script>

<style scoped>
.myColumn {
  /*height:1360px;*/
  margin-bottom: 100px;
}
.myColumn_header{
  position: relative;
}
.myColumn_main{
  padding-left: 20px;
  width:97%;
  height:auto;
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
}

.handId .avatar-uploader:last-child{
  /*margin-left: 15px;*/
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
.el-info{
  display: inline-block;
  color:#bfc5cf;
  margin-left: 25px;
}
.avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 9;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #d9d9d9!important;
  }
  .perId .avatar-uploader:nth-child(1) .avatar-uploader-icon{
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
  }
  .handId .avatar-uploader:nth-child(2) .avatar-uploader-icon{
    background-image: url("../../../assets/img/id4.png");
    background-repeat: no-repeat;
   background-size: 100%;
  }
  .handId .avatar-uploader .avatar-uploader-icon{
     width: 166px;
    height: 138px;
    line-height: 144px;
  }
  .nickimg .avatar-uploader-icon{
     border:1px solid #a7afbe!important;
     border-radius: 6px;
     display: inline-block;
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .code{
     position: relative;
  }
.codeBtn{
  position: absolute;
  right:-5px;
  border:1px solid #a7afbe!important;
  background: #f4f4f4!important;
  color:#5e5e5e!important;
  border-top-left-radius :0;
  border-bottom-left-radius :0;
}
.uploadBtn{
  background: #f4f4f4!important;
  border:1px solid #a7afbe!important;
}
.btn{
  margin-left:30px;
}
.distpicker{
  padding-left:30px;
}
.avatar{
  width:90px;
  height:90px;
  border-radius: 50%;
}
.idCard{
  width:200px;
  height:140px;
}


.el-input{
  margin:0px;
  width:145px;
}

@media screen and (max-width: 1890px){
  .el-input{
    width:100px;
  }
}
@media screen and (max-width: 1650px){
  .el-input{
    width:220px;
  }
  .el-form-item__label{
    text-align: left;
  }
}
/* @media screen and (max-width: 1500px){
  .el-input{
    width:60px;
  }
}
@media screen and (max-width: 1450px){
  .el-input{
    width:50px;
  }
}
@media screen and (max-width: 1360px){
  .el-input{
    width:40px;
  }
}
@media screen and (max-width: 1300px){
  .el-input{
    width:30px;
  }
} */
</style>
