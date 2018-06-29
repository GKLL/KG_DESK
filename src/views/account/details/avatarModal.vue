<template>
      <div>
        <el-dialog
                title="更改头像"
                class = 'avatarModal'
                :visible="visible"
                width="40%"
                height = "500px"
                :before-close = "cancel"
                center>
               <div class = 'uploadbtn'>
                  <input id = 'doc' class = 'cursorPointer' type = 'file' name="coverImg" accept="image/jpeg,image/gif,image/png" multiple="multiple"
                     @change = "coverImgChang($event)" 
                     />
                   <button class = 'primay-btn cursorPointer'>上传图片</button>
               </div>
                <span>不超过2mb，支持jpg、png、jpeg等格式</span>
               <img v-if = "!vIf" :src = "initSrc" class = 'previewImg' />
               <div  class="wrapper" v-if = "vIf">
                        <vue-cropper
                          class = 'corpper checkedImg'
                          ref="cropper"
                          :img="checkedImg"
                          :canMove="false"
                          :outputSize="option.size"
                          :outputType="option.outputType"
                          :autoCrop="option.autoCrop"
                          :autoCropWidth="option.autoCropWidth"
                          :autoCropHeight="option.autoCropHeight"
                          :fixedNumber="option.fixedNumber"
                          :info="true"
                          :canScale = 'false'
                          :fixed = "true"
                          @realTime="realTime"
                          :full="option.full"
                        ></vue-cropper>
              </div>
              <div class = 'previewContainer' v-if = "vIf">
                    <p>预览</p>
                    <img class = "img120" :src = "previews"/>
                    <p>90px*90px</p>
                    <img class = "img70 " :src = "previews"/>
                    <p>50px*50px</p>
                    <img class = "img30 " :src = "previews"/>
                    <p>30px*30px</p>
              </div>
              <div class = 'submit_btn'>
                  <el-button   @click="cancel"  class=" btnModal" >取消</el-button>
                  <el-button   @click="onSubmit" type="primary" :loading = "loading" class=" btnModal2">确认</el-button>
              </div>
        </el-dialog>
      </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import axios from 'axios';
import vueCropper from 'vue-cropper';
export default {
  data() {
    return {
        option: {
          size: 1,
          outputType: 'png',
          full:false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 120 ,
          autoCropHeight: 120,
          fixedNumber: [1,1],
        },
        blobData:"",
        previews:'',
        checkedImg:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg",
        vIf:false,
        loading:false,
        imgUrl:Lib.C.imgUrl,
    }
  },
  components: {vueCropper},
  props: {
    visible:{},
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    initSrc:{}
  },
  //已成功挂载，相当ready()
  mounted(){
    // this.checkedImg = Lib.C.imgUrl +this.initSrc;
    this.checkedImg = "http://kgcom.oss-cn-shenzhen.aliyuncs.com/17529/396319909329641472.png";
  },
  //相关操作事件
  methods: {
    onSubmit(){
          const that = this;
            let formData = new FormData();
            formData.append('name', 'file');
            formData.append('file', this.blobData);
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
            this.loading = true;
            axios.post(Lib.C.uploadImgUrl, formData, config).then(function (res) {
                res =res.data; 
                if (res.errorCode == 10000) {
                    // that.ImgPost = res.data[0].filePath;
                          const  submit_list = Lib.M.dataRequest({
                                          "userId":localStorage.getItem('kg_desk_userId'),
                                          "roleId":localStorage.getItem('kg_desk_roleId'),
                                          "avatar":res.data[0].filePath,

                          });
                          Lib.M.ajax({
                                    'type':'post',
                                    'url':'/userprofile/updateProfile',
                                    "data":submit_list,
                                    'success':function (data){
                                      if(data.code == 10000){
                                        that.$message({
                                          message: '提交成功',
                                          type: 'success'
                                        });
                                        location.reload()
                                      }else{
                                        that.$message({
                                          message: data.message,
                                          type: 'error'
                                        });
                                      }
                                    }
                        });
                    that.loading = false
                    that.cancel()         
                }
            })
    },
    handleAvatarSuccess1(res, file) {
        this.ruleForm.idcard1= res.data[0].filePath;
        this.imageUrl.idcard1 = URL.createObjectURL(file.raw);
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
    },
    realTime (data) {
      this.previewsHandle()
    },
    previewsHandle(){
        const that= this;
        this.$refs.cropper.getCropBlob((data) => {
            that.blobData = data
        })
        this.$refs.cropper.getCropData((data) => {
            this.previews = data;
        })
    },
    coverImgChang(e){
      const that = this;
      // this.$refs.cropper.refresh()
                  var fileList=e.target.files[0]
                  //现在图片文件大小
                  var imgSize = fileList.size;
                  if(imgSize>2*1024*1024){
                   alert('上传的图片的大于2M,请重新选择');
                   // docobj.val('')
                   return false;
                  }
                  //将图片文件转换为base64
                  // var coverImg = this.coverImg
                  var reader=new FileReader();
                  reader.onload=function(e){
                    that.checkedImg = reader.result;
                  }  
                 reader.readAsDataURL(fileList)
              // this.$refs.cropper.reload()
              this.vIf = true;
      },
  }
}
</script>

<style scoped>
.wrapper{
  width:500px;
  height:300px;
  display: inline-block;
  float:left;
  margin-right:50px;
}
.previewContainer{
  position: absolute;
  right:50px;
  height:300px;
  width:110px;
  background:#dfdfdf;
  text-align: center;
}
.previewContainer p{
  margin:4px 0px;
  font-size:12px;
}
.previewContainer p:nth-child(1){
  font-size:16px;
}
.img120,.img70,.img30{
  display: block;
  border-radius: 50%;
  margin:0px auto;
}
.img120{
  width:90px;
  height:90px;
}
.img70{
  width:50px;
  height:50px;
}
.img30{
  width:30px;
  height:30px;
}
.uploadbtn{
  width:100px;
  height:30px;
  overflow: hidden;
  position: relative;
}
.uploadbtn button{
  position: absolute;
  top:0px;
  z-index: 1;
  border: 0px;
}
.uploadbtn input{
  opacity: 0;
  position: absolute;
  z-index: 2;
}
.previewImg{
  float:left;
  display: inline-block;
  width:500px;
  height:300px;
}
.submit_btn{
  position: absolute;
  bottom:7px;
  left:40%;
}
</style>
<style>
  .avatarModal .el-dialog{
    height:500px;
  }
</style>
