<template>
      <div>
        <el-dialog
                title="更改头像"
                class = 'avatarModal'
                :visible="visible"
                width="40%"
                height = "500px"
                :before-close = "closeModal"
                center>
               <div class = 'uploadbtn'>
                  <input id = 'uploadInput' class = 'cursorPointer' type = 'file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
                     @change = "coverImgChang($event)" 
                     />
                   <button class = 'primay-btn cursorPointer'>上传图片</button>
               </div>
                <span class ='warningTil'>不超过2mb，支持jpg、png、jpeg等格式</span>
                <div class = 'previewImgContainer' v-if ="!vIf">
                      <img v-if = " initSrc != null && fromthird == null" :src = " imgUrl + initSrc" class = 'previewImg' />
                      <img v-if = "initSrc == null && fromthird == null" src = "../assets/img/article.png" class = 'previewImg' />
                      <img v-if = "initSrc != null && fromthird != null" :src = "initSrc" class = 'previewImg' />
                </div>
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
              <div class = 'previewContainer' v-if ="!vIf && initSrc !=null && fromthird == null">
                    <p>预览</p>
                    <img class = "img120" :src = " imgUrl +initSrc"/>
                    <p>90px*90px</p>
                    <img class = "img70 " :src = " imgUrl +initSrc"/>
                    <p>50px*50px</p>
                    <img class = "img30 " :src = "imgUrl + initSrc"/>
                    <p>30px*30px</p>
              </div>
              <div class = 'previewContainer' v-if = '!vIf && initSrc == null'>
                    <p>预览</p>
                    <img class = "img120" src = "../assets/img/avatar.png"/>
                    <p>90px*90px</p>
                    <img class = "img70 " src = "../assets/img/avatar.png"/>
                    <p>50px*50px</p>
                    <img class = "img30 " src = "../assets/img/avatar.png"/>
                    <p>30px*30px</p>
              </div>
              <div class = 'previewContainer' v-if = '!vIf && initSrc != null && fromthird != null'>
                    <p>预览</p>
                    <img class = "img120" :src = "initSrc"/>
                    <p>90px*90px</p>
                    <img class = "img70 " :src = "initSrc"/>
                    <p>50px*50px</p>
                    <img class = "img30 " :src = "initSrc"/>
                    <p>30px*30px</p>
              </div>
              <div class = 'submit_btn'>
                  <el-button   @click="closeModal"  class=" btnModal" >取消</el-button>
                  <el-button   @click="onSubmit" type="primary" :loading = "loading" class=" btnModal2">确认</el-button>
              </div>
        </el-dialog>
      </div>
</template>

<script>
import Lib from "assets/js/Lib";
import axios from "axios";
import JQ from "jquery";
import vueCropper from "vue-cropper";
export default {
  data() {
    return {
      option: {
        size: 1,
        outputType: "png",
        full: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 120,
        autoCropHeight: 120,
        fixedNumber: [1, 1]
      },
      blobData: "",
      previews: "",
      checkedImg: "",
      vIf: false,
      loading: false,
      imgUrl: Lib.C.imgUrl
    };
  },
  components: { vueCropper },
  props: {
    visible: {},
    cancel: {
      type: Function,
      default: function() {}
    },
    initSrc: {},
    roleId: {},
    fromthird: {}
  },
  //已成功挂载，相当ready()
  //相关操作事件
  methods: {
    closeModal() {
      this.cancel();
      this.loading = false;
    },
    onSubmit() {
      const that = this;
      if (this.blobData == "") {
        this.loading = false;
        this.cancel();
        return;
      }
      /*            setTimeout(()=>{
              this.loading = false;
              alert('当前网络较忙，请稍后再试')
            },20000);*/
      let formData = new FormData();
      formData.append("name", "file");
      formData.append("file", this.blobData);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.loading = true;
      axios
        .post(Lib.C.uploadImgUrl, formData, config)
        .then(function(res) {
          res = res.data;
          if (res.errorCode == 10000) {
            let submit_list = {
              userId: localStorage.getItem("kg_desk_userId"),
              roleId: that.roleId,
              avatar: res.data[0].filePath
            };
            if (that.roleId == 1) {
              submit_list.avatar = res.data[0].filePath;
            } else {
              submit_list.columnAvatar = res.data[0].filePath;
            }
            submit_list = Lib.M.dataRequest(submit_list);
            Lib.M.ajax({
              type: "post",
              url: "/userprofile/updateProfile",
              data: submit_list,
              success: function(data) {
                if (data.code == 10000) {
                  that.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  location.reload();
                } else {
                  that.$message({
                    message: data.message,
                    type: "error"
                  });
                }
              }
            });
            that.loading = false;
            that.cancel();
          }
        })
        .catch(function(error) {
          that.loading = false;
          alert("当前网络较忙，请稍后再试");
        });
    },
    handleAvatarSuccess1(res, file) {
      this.ruleForm.idcard1 = res.data[0].filePath;
      this.imageUrl.idcard1 = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let isTrue = false;
      if (file.type === "image/jpeg" || file.type === "image/png") {
        isTrue = true;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isTrue) {
        this.$message.error("图片格式不对!");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
      }
      return isTrue && isLt2M;
    },
    realTime(data) {
      this.previewsHandle();
    },
    previewsHandle() {
      const that = this;
      this.$refs.cropper.getCropBlob(data => {
        that.blobData = data;
      });
      this.$refs.cropper.getCropData(data => {
        this.previews = data;
      });
    },
    coverImgChang(e) {
      // Lib.M.uploadfile(e,JQ,this)
      const that = this;
      var fileList = e.target.files[0];
      //现在图片文件大小
      var imgSize = fileList.size;
      const type = fileList.type;

      //将图片文件转换为base64
      // var coverImg = this.coverImg
      var reader = new FileReader();
      if (
        imgSize > 2 * 1024 * 1024 ||
        (type != "image/png" && type != "image/jpeg")
      ) {
        this.$message({
          type: "warning",
          message: "封面图不超过2M，仅支持jpg、png、jpeg格式"
        });
        var jqObj = JQ("#uploadInput");
        jqObj.val("");
        var domObj = jqObj[0];
        domObj.outerHTML = domObj.outerHTML;
        var newJqObj = jqObj.clone();
        jqObj.before(newJqObj);
        jqObj.remove();
        JQ("#uploadInput")
          .unbind()
          .change(function(e) {
            //alert("ab");
            that.coverImgChang(e);
          });
        return;
      }
      reader.onload = function(e) {
        that.checkedImg = reader.result;
      };
      reader.readAsDataURL(fileList);
      // this.$refs.cropper.reload()
      this.vIf = true;
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 500px;
  height: 300px;
  display: inline-block;
  float: left;
  margin-right: 50px;
}
.previewContainer {
  position: absolute;
  right: 50px;
  height: 300px;
  width: 110px;
  background: #dfdfdf;
  text-align: center;
}
.previewContainer p {
  margin: 4px 0px;
  font-size: 12px;
}
.previewContainer p:nth-child(1) {
  font-size: 16px;
}
.img120,
.img70,
.img30 {
  display: block;
  border-radius: 50%;
  margin: 0px auto;
}
.img120 {
  width: 90px;
  height: 90px;
}
.img70 {
  width: 50px;
  height: 50px;
}
.img30 {
  width: 30px;
  height: 30px;
}
.uploadbtn {
  width: 100px;
  height: 30px;
  overflow: hidden;
  position: relative;
}
.warningTil {
  display: block;
  margin: 8px 0px;
}
.uploadbtn button {
  position: absolute;
  top: 0px;
  z-index: 1;
  border: 0px;
}
.uploadbtn input {
  opacity: 0;
  position: absolute;
  z-index: 2;
}
.previewImgContainer {
  position: relative;
  float: left;
  display: inline-block;
  width: 500px;
  height: 300px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.previewImg {
  display: block;
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
}
.submit_btn {
  position: absolute;
  bottom: 14px;
  left: 40%;
}
</style>
<style>
.avatarModal .el-dialog {
  height: 500px;
}
.avatarModal .el-dialog--center .el-dialog__body {
  padding: 0px 27px;
}
</style>
