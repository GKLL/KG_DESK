<template>
   <div class = 'myColumn'>
    <header class = 'myColumn_header flexR applyColumn'>
      <span class = 'title'>我的专栏</span>
      <div class = 'schedule_title'>
        <span class = 'color1d87'>选择类型</span>
        <span class = 'schedule_line'></span>
        <span class = 'color1d87'>申请资料</span>
      </div>
    </header>
    <div class = 'myColumn_main'>
        <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-form-item label="专栏名称"  prop="name">
          <el-input v-model="form.name" style="width:250px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="专栏介绍" prop="region">
          <el-input v-model="form.region"   type="textarea" style="width:80%" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="专栏头像" prop="nickImg">
           <div class="nickimg">
            <el-upload
              v-model="form.nickImg"
              class="avatar-uploader"
              :action= "uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl.avatar" :src="imageUrl.avatar" class="avatar">
              <i v-else class="el-icon-upload2 avatar-uploader-icon">
                <span class="crlic">
                </span>
              </i>
            </el-upload>
          </div>
            <span class="el-info">单张图片不超过2M,支持jpg、png、jpeg等</span>
        </el-form-item>
        <el-form-item label="所在地区" prop="select">
            <v-distpicker 
                     :province="form.select.province" 
                     :city="form.select.city" 
                     :area="form.select.area" 
                     @selected = "handleItemChange"  
                      class = 'distpicker'/>
        </el-form-item>
        <el-form-item :label="personalVisible ? '真实姓名':'管理员姓名'" prop='userName'>
          <el-input v-model="form.userName" style="width:255px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item :label="personalVisible ? '身份证号':'管理员身份证号'" prop="ID">
          <el-input v-model="form.ID" style="width:255px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item :label="personalVisible ? '身份证照片':'管理员身份证扫描件'" prop = 'cards'>
          <div class="perId">
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
          </div>
          <div class="handId">
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
          <div class="el-input colorc5">
                单张图片不超过2M,支持jpg、png、jpeg等，必须包含身份证正反两面、
手持身份证照片及其日期，且证件中的信息清晰可见
            </div>
        </el-form-item>
        <!-- 媒体、企业、组织-->
        <div v-if = "!personalVisible">
                <el-form-item :label="enterpriseVisible ? '企业名称':'组织机构名称'" prop = "companyName">
                  <el-input v-model="form.companyName" style="width:255px" class="el-input"></el-input>
                </el-form-item>
                <el-form-item :label="enterpriseVisible ? '企业营业执照扫描件':'组织机构代码'" prop = 'licensePic'>
                   <div class="nickimg">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :show-file-list="false"
                      :on-success="licensePicSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.licensePic" :src="form.licensePicShow" class = 'idCard' >
                      <i v-else class="el-icon-upload2 avatar-uploader-icon">
                        <span class="crlic">
                          
                        </span>
                      </i>
                    </el-upload>
                  </div>
                    <span class="el-info">单张图片不超过2M,支持jpg、png、jpeg等</span>
                </el-form-item>
                <!-- 相关链接 -->
                <el-form-item label="相关链接">
                  <el-input v-model="form.relateLink" style="width:255px" class="el-input"></el-input>
                </el-form-item>
        </div>
        <el-form-item label="资质上传">
          <el-upload
            class="upload-demo"
            v-model="form.otherPic"
            :action="uploadUrl"
            :on-remove="handleRemove"
            :on-success="otherPicSuccess"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" class="el-input uploadBtn">点击上传</el-button>
            <div slot="tip" class="el-upload__tip el-input colorc5">最多5张，每张大小不超过2M，支持jpg、png、jpeg等，资料越多，审核通过越快</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="form.email" style="width:255px" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="手机验证">
              <el-input   type="text" style="width:255px"   v-model="atskMobile" :disabled = "true"  auto-complete="off">
<!--         <el-select v-model="codeSelect" slot="prepend" >
  <el-option v-for = "item in areaCode" :label="item.countryname" :value="item.code"></el-option>
</el-select> -->
  </el-input>
        </el-form-item>
              <!-- 滑块验证开始 -->
              <el-form-item label="滑块验证" style= 'position:relative'>
                <div>
                   <div class="ln" style = "width:313px;">
                     <div id="personalBlock"></div>
                   </div>
                   <input type='hidden' id='csessionid88' name='csessionid88'/>
                   <input type='hidden' id='sig88' name='sig88'/>
                   <input type='hidden' id='token88' name='token88'/>
                   <input type='hidden' id='scene88' name='scene88'/>
                </div>
              <!-- 滑块验证结束 -->
              </el-form-item>

        <el-form-item prop="code">
            <el-input type="text" v-model="form.code" auto-complete="off" class="code" placeholder="验证码"style="width:255px" >
            <el-button slot="suffix" type="primary" class="codeBtn" @click="send('form')" :disabled='sendMsgDisabled'>
              <span v-if="sendMsgDisabled">{{'重新发送('+time+')'}}</span>
              <span v-if="!sendMsgDisabled">验证码</span>
            </el-button>
            </el-input>
        </el-form-item>
         <el-form-item prop="resource">
              <el-checkbox  v-model = "form.resource" name="type"  class="martop20 checkbox_el el-input"  >我同意并接受《<a  href = '../about_column/list.html' target="_blank">千氪财经专栏申请协议</a>》</el-checkbox>
        </el-form-item>
        <el-form-item>
          <div class="btn">
          <el-button  class="uploadBtn" @click = "lastStep">上一步</el-button>
          <el-button  type="primary" @click="onSubmit('form')" class="ml20 ml30">提交资料</el-button>
          </div>
        </el-form-item>
      </el-form>
 <!--      <span v-if = "enterpriseVisible" class = 'enterpriseWarning'>提示：申请企业角色，提交资料成功后，需要缴纳{{tvValue}}TV的钛值作为账户保证金，此保证金不会进入您的钛值可用余额。当您提出账号降级申请并通过后，保证金会全额退还给您</span> -->
    </div>
    <deposit-modal :visible = "depositVisible" :cancel = "cancelDeposit"/>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import VDistpicker from 'v-distpicker';
import HbHead from 'components/HbHead';
import { MessageBox } from 'element-ui';
import codeData from 'assets/js/phone'
import depositModal from './depositModal'
export default {
  components: {
    HbHead,VDistpicker,MessageBox,depositModal
  },
  data () {
    let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if(!(/^1[34578]\d{9}$/.test(value))){
          callback(new Error('请输入正确的手机号'));
        }else { 
          callback();
        }
    };       
    let validateMail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!(Lib.V.validateMail(value))){
          callback(new Error('请输入正确的邮箱'));
        }else { 
          callback();
        }
    };    
    let validateAddress = (rule, value, callback) => {
        if (this.form.select.province == '') {
          callback(new Error('请选择地区'));
        }else { 
          callback();
        }
    };
    let validateAgree = (rule, value, callback) => {
        if (value == false) {
          callback(new Error('请勾选!'));
        }else {
          callback();
        }
    };    
    let validateID = (rule, value, callback) => {
        if (value =="") {
          callback(new Error('请输入身份证号码'));
        }else if(!(Lib.V.validateIdCard(value))){
          callback(new Error('身份证号码输入不正确'));
        }else {
          callback();
        }
    };    
    let validateName = (rule, value, callback) => {
        if (value =="") {
          callback(new Error('请输入真实姓名'));
        }else if(!(Lib.V.validateRealName(value))){
          callback(new Error('请输入2-20个字的真实姓名'));
        }else {
          callback();
        }
    };     
    let validateCards = (rule, value, callback) => {
        if (this.imageUrl.idcard1 == '' && this.imageUrl.idcard2 == '' && this.imageUrl.idcard3 == '') {
          callback(new Error('请上传三张有效身份证件'));
        }else if(this.imageUrl.idcard1 == ''){
          callback(new Error('请上传身份证正面扫描件'));
        }else if(this.imageUrl.idcard2 == ''){
          callback(new Error('请上传身份证背面扫描件'));
        }else if(this.imageUrl.idcard3 == ''){
          callback(new Error('请上传手持身份证扫描件'));
        }else{
          callback()
        }
    };    
    let validateColumnName = (rule, value, callback) => {
        if(value == ''){
           callback(new Error('请输入专栏名称'));
        }
        else if (value !="" && !(Lib.V.validateColumnName(value))) {
          callback(new Error('请输入纯数字、纯字母、纯中文或者中英文数字的组合，长度2-15个字'));
        }else {
          callback();
        }
    };   
    let validatecompanyName = (rule, value, callback) => {
        if(value == ''){
           callback(new Error(this.enterpriseVisible ? '请填写企业名称':'请填写组织机构名称'));
        }
        else if (value !="" && !(Lib.V.validateCompanyName(value))) {
          callback(new Error( this.enterpriseVisible ? '请输入300字以内的企业名称，不能包含符号':'请输入300字以内的组织机构名称，不能包含符号'));
        }else {
          callback();
        }
    };
    return {
          tvValue:Lib.C.tvValue,
      
      atskMobile:"",
      mobileArea:"",
      codeSelect:"86",
      areaCode:[{}],
      form: {
          //个人
          name: '',
          region: '',
          resource: false,
          nickImg:'',
          idcard1:'',
          idcard2:'',
          idcard3:'',
          idcard4:'',
          otherPic:[],
          nick_show:'',
          userName:'',
          ID:'',
          email:'',
          phone:'',
          code:'',
          licensePic:"",
          licensePicShow:"",
          select: { 
            province: '', 
            city: '', 
            area: '' 
          },
          //媒体
          companyName:"",
          media_img:"",
          relateLink:"",
      },
    uploadUrl:Lib.C.url,
    id:'',
    rules:{ 
        name: [
            { required: true,validator: validateColumnName,  trigger: 'blur' },
        ],
        region:[
            { required: true, message: '请填写专栏介绍', trigger: 'blur' },
            { min: 10, max: 50, message: '请输入10-50个字的专栏介绍', trigger: 'blur' }
        ],
        nickImg:[
            { required: true, message: '请上传专栏头像', trigger: 'blur' }
        ],
        select:[
            { required: true,validator: validateAddress, message: '请选择地区', trigger: 'blur' }   
        ],
        userName:[
            { required: true,validator:validateName,trigger: 'blur' },
        ],
        ID:[
            { required: true,validator: validateID, trigger: 'blur' },
        ],
        cards:[{
          required: true,validator: validateCards, trigger: 'blur'
        }],
        email:[
            { required: true, validator:validateMail, trigger: 'blur' },
            // { type: 'email',message: '请输入正确的您的邮箱', trigger: 'blur' }
        ],
        phone:[
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
        ],
        code:[
            { required: true, message: '请填写验证码', trigger: 'blur' },
            { message: '请输入正确的验证码', trigger: 'blur' }
        ],
        //媒体
        companyName:[
            { required: true,message: '请填写组织/企业名称',trigger: 'blur' },
             { validator: validatecompanyName, trigger: 'blur' }
        ],     
        licensePic:[
            { required: true, message: '请上传照片', trigger: 'blur' },
        ],
        resource:[{validator: validateAgree, trigger: 'change'}]
      },
      imageUrl:{
        avatar:'',
        idcard1:"",
        idcard2:"",
        idcard3:"",
        idcard4:"",
      },
      avatar: '',
      fileList: [],
      sendMsgDisabled:false,
      time:90,
      personalVisible:false,
      mediaVisible:false,
      enterpriseVisible:false,
      interval:null,
      depositVisible:false,
                 slideInfo:{
        'session':'',
        'sig':'',
        'token':'',
        'scene':''
      },
    }
  },
  mounted(){
      this.id = this.$route.query.id;
      switch(this.id){
          case '2':
            this.personalVisible = true;
            break;
          case '3':
            this.mediaVisible = true;
            break;
          case '4':
            this.enterpriseVisible = true;
            break;
          default:
      };
      Lib.M.aliBlock('#personalBlock',this,'csessionid88','sig88','token88','scene88')
      this.areaCode = codeData;
      this.form.phone = localStorage.getItem('kg_desk_userMobile');
      this.atskMobile = localStorage.getItem('kg_desk_atskMobile');
      this.mobileArea = localStorage.getItem('kg_desk_mobileArea');
  },
  methods: {
            handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    cancelDeposit(){
      this.depositVisible = false
    },
    otherPicSuccess(res, file){
      this.form.otherPic.push(res.data[0].filePath)
    },
    licensePicSuccess(res,file){
      this.form.licensePic = res.data[0].filePath;
      this.form.licensePicShow = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
        this.form.nickImg = res.data[0].filePath;
        this.imageUrl.avatar = URL.createObjectURL(file.raw);
   },
    handleAvatarSuccess1(res, file) {
        this.form.idcard1= res.data[0].filePath;
        this.imageUrl.idcard1 = URL.createObjectURL(file.raw);
   },
  handleAvatarSuccess2(res, file) {
        this.form.idcard2 = res.data[0].filePath;
        this.imageUrl.idcard2 = URL.createObjectURL(file.raw);
   },
  handleAvatarSuccess3(res, file) {
        this.form.idcard3 =  res.data[0].filePath;
        this.imageUrl.idcard3 = URL.createObjectURL(file.raw);
   },
  handleAvatarSuccess4(res, file) {
        this.form.idcard4 =  res.data[0].filePath;
        this.imageUrl.idcard4 = URL.createObjectURL(file.raw);
   },
    beforeAvatarUpload(file) {
        let isTrue = false;
        if(file.type ==='image/jpeg' || file.type === 'image/png'){
          isTrue = true;
        }
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isTrue) {
          this.$message.error('图片格式不对!');
        }
        if (!isLt2M) {
          this.$message.error('图片大小不能超过 1MB!');
        }
        return isTrue && isLt2M;
      },
      handleRemove(file, fileList) {
        const res = file.response.data;
        for(var i in this.form.otherPic){
          if(res[0].filePath == this.form.otherPic[i]){
            this.form.otherPic.splice(i,1)
          }
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning('最多上传5张');
    },
    send(form) {
        const that  = this;
        const send_list = Lib.M.noSignRequest({
          "verIfy":this.form.phone,
          "mobileArea":this.mobileArea,
                        "platform":'3',
              "session":this.slideInfo.session,
              "sig":this.slideInfo.sig,
              "token":this.slideInfo.nc_token,
              "scene":this.slideInfo.nc_scene,
        })
        Lib.M.sendMessage(form,that,send_list,'#personalBlock','csessionid88','sig88','token88','scene88');
    },
    onSubmit(form) {
          const that = this;
/*          that.$alert('我们将在1-3个工作日内，审核您的材料，请耐心等待！', '您的资料已提交成功！', {
                                  confirmButtonText: '我知道了',
                                  center: true,
                                  callback: action => {
                                    that.$message({
                                      type: 'success',
                                      message: "提交成功"
                                    });
                                    window.location.href = "https://www.kg.com/account/details.html#/column";
                                  }
          });
      return*/
      let countryname = '中国';
      for(var i in codeData){
        if(this.mobileArea == codeData[i].code){
            countryname = codeData[i].countryname
        }
      }
      const otherPic_list = this.form.otherPic.join(',')
      let submit_list = {
                     "userId":localStorage.getItem('kg_desk_userId'),
                     "roleId":localStorage.getItem('kg_desk_roleId'),
                     "realName":this.form.userName,
                     "columnName":this.form.name,
                     "columnIntro":this.form.region,
                     "columnAvatar":this.form.nickImg,
                     "columnCountry":countryname,
                     "columnProvince":this.form.select.province,
                     "columnCity":this.form.select.city,
                     "columnCounty":this.form.select.area,
                     "idcard":this.form.ID,
                     "idcardFront":this.form.idcard1,
                     "idcardBack":this.form.idcard2,
                     "idcardPic":this.form.idcard3,
                     "code":this.form.code,
                     "otherPic":otherPic_list,
                     "email":this.form.email,
                     "mobile":this.form.phone,
      };
      const n = this.id;
      switch(n){
          case '2':
            submit_list.applyRole = "2";
            break;
          case '3':
            submit_list.applyRole = "3";
            submit_list.companyName = this.form.companyName;
            submit_list.licensePic = this.form.licensePic;
            submit_list.siteLink = this.form.relateLink;
            break;
          case '4':
            submit_list.applyRole = "4";
            submit_list.companyName = this.form.companyName;
            submit_list.licensePic = this.form.licensePic;
            submit_list.siteLink = this.form.relateLink;
            break;          
            case '5':
            submit_list.applyRole = "5";
            submit_list.companyName = this.form.companyName;
            submit_list.licensePic = this.form.licensePic;
            submit_list.siteLink = this.form.relateLink;
            break;
          default:
      };
      submit_list = Lib.M.dataRequest(submit_list)
      this.$refs[form].validate((valid) => {
          if (valid) {
              Lib.M.ajax({
                  'type':'post',
                  'url':'userprofile/addUserProfile',
                  "data":submit_list,
                  'success':function (data){
                      if(data.code == 10000){
                     /*     if(that.enterpriseVisible){
                              that.depositVisible = true
                          }else{*/
                                that.$alert('我们将在1-3个工作日内，审核您的材料，请耐心等待！', '您的资料已提交成功！', {
                                  confirmButtonText: '我知道了',
                                  center: true,
                                  callback: action => {
                                    that.$message({
                                      type: 'success',
                                      message: "提交成功"
                                    });
                                    window.location.href = "https://www.kg.com/account/details.html#/column";
                                  }
                                });
                          // }
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
    handleItemChange(val) {
        this.form.select.area = val.area.value;
        this.form.select.city = val.city.value;
        this.form.select.province = val.province.value;
    },
    lastStep(){
      this.$router.push({path: '/select_type'});
    }
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
  margin: 20px 0 0 30px;
  width:80%;
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
.myColumn .el-form-item__error{
  left:30px!important;
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
.enterpriseWarning{
    font-size: 12px;
    margin-left: 179px;
    display: block;
    margin-top: -10px;
    margin-bottom: 20px;
    color:#ccc;
}
</style>
<style>
  .el-upload-list__item-name{
    padding-left:30px;
  }
/*   .el-message-box__title,.el-message-box__content,.el-message-box__btns{
  text-align: center;
} */
#personalBlock{
  margin:0px 30px;
}
</style>
