<template>
   <div class = 'myColumn'>
    <header class = 'myColumn_header flexR'>
      <span class = 'title'>我的专栏</span>
      <div class = 'schedule_title'>
        <span class = 'color1d87'>选择类型</span>
        <span class = 'schedule_line'></span>
        <span class = 'color1d87'>申请资料</span>
      </div>
    </header>
    <div class = 'myColumn_main'>
        <el-form ref="form" :model="form" label-width="96px">
        <el-form-item label="栏目名称">
          <el-input v-model="form.name" style="width:116px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="专栏介绍">
          <el-input v-model="form.name"   type="textarea" style="width:80%" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="专栏头像">
           <div class="nickimg">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-upload2 avatar-uploader-icon">
                <span class="crlic">
                  
                </span>
              </i>

            </el-upload>
          </div>
            <span class="el-info">单张图片不超过2M,支持jpg、png、jpeg等</span>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select v-model="form.region" placeholder="请选择活动区域" class="el-input" style="width:116px" >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.name" style="width:116px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.name" style="width:255px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="身份证照片">
          <div class="perId">
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon">
                    <span class="crlic"></span>
                  </i>
              </el-upload>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">
                <span class="crlic">
                  
                </span>
              </i>
            </el-upload>
          </div>
          <div class="handId">
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon">
                    <span class="crlic">
                  
                </span>
                  </i>
              </el-upload>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">
                <span class="crlic">
                  
                </span>
              </i>
            </el-upload>
            
          </div>
          <div class="el-input colorc5">
                单张图片不超过2M,支持jpg、png、jpeg等，必须包含身份证正反两面、
手持身份证照片及其日期，且证件中的信息清晰可见
            </div>
        </el-form-item>
        <el-form-item label="组织机构名称">
          <el-input v-model="form.name" style="width:255px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="组织机构代码">
           <div class="nickimg">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-upload2 avatar-uploader-icon">
                <span class="crlic">
                  
                </span>
              </i>

            </el-upload>
          </div>
            <span class="el-info">单张图片不超过2M,支持jpg、png、jpeg等</span>
        </el-form-item>
        <el-form-item label="资质上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" class="el-input uploadBtn">点击上传</el-button>
            <div slot="tip" class="el-upload__tip el-input colorc5">最多5张，每张大小不超过2M，支持jpg、png、jpeg等，资料越多，审核通过越快</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="form.name" style="width:255px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="手机验证">
          <el-input v-model="form.name" style="width:255px" class="el-input"></el-input>
          
        </el-form-item>
        <el-form-item>
            <el-input type="password" auto-complete="off" class="code" placeholder="验证码"style="width:255px" >
            <el-button slot="suffix" type="primary" class="codeBtn" @click="send" :disabled='sendMsgDisabled'>
              <span v-if="sendMsgDisabled">{{'重新发送('+time+')'}}</span>
              <span v-if="!sendMsgDisabled">验证码</span>
            </el-button>
            </el-input>
        </el-form-item>
         <el-form-item prop="pass">
           
              <el-checkbox name="type"  class="martop20 checkbox_el el-input"  >我同意并接受《<a>千氪财经用户协议</a>》</el-checkbox>
            
        </el-form-item>
        <el-form-item>
          <div class="btn">
          <el-button  class="uploadBtn">上一步</el-button>
          <el-button  type="primary" @click="onSubmit" class="ml20 ml30">提交资料</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

import HbHead from 'components/HbHead';

export default {
  components: {
    HbHead
  },
  data () {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      imageUrl: '',
      fileList: [],
      sendMsgDisabled:false,
      time:60,
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    send() {
        let me = this;
        me.sendMsgDisabled = true;
        let interval = window.setInterval(function() {
          if ((me.time--) <= 0) {
            me.time = 60;
            me.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
    onSubmit() {
     
    }

  }
}
</script>

<style scoped>
.myColumn {
  height:1600px;
  margin-bottom: 100px;
}
.myColumn_header{
  position: relative;
}
.myColumn_main{
  margin: 20px 0 0 30px;
  width:80%;
}
 .avatar-uploader{
  display:inline-block;
  margin-left: 30px;
}
.perId .avatar-uploader:last-child{
  margin-left: 15px;
}
.perId {
  margin-bottom: 15px;
}

.handId .avatar-uploader:last-child{
  margin-left: 15px;
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
.el-input{
  margin-left: 30px;
}
.uploadBtn{
  background: #f4f4f4!important;
  border:1px solid #a7afbe!important;
}
.btn{
  margin-left:30px;
}
</style>
