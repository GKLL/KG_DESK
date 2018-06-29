<template>
  <div class = 'myColumn myColumn_noLeft'>
        <hb-head></hb-head>
        <div class = 'publishContainer publishVideo'>
              <sidebar />
              <div class = 'publishArticle'>
                 <header class = 'myColumn_header flexR'>
                      <span class = 'title'>发布视频</span>
                  </header>
                  <div class = 'myColumn_main'>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item class = 'ml20' label="视频标题" prop="title">
                          <el-input @blur = "autoSave" size = 'small' v-model="ruleForm.title" placeholder = '请输入视频标题'></el-input>
                        </el-form-item>
                        <el-form-item class = 'ml20' label="视频" style = "margin-bottom:0px">
                            <el-radio-group v-model = "ruleForm.videoType">
                                <el-radio label="11">本地视频</el-radio>
                                <el-radio label="22">视频链接</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class = 'ml20' prop = 'videoInfo' style = "margin-bottom:20px">
<!--                             <div class = 'uploadbtn videoUploadBtn' v-if = "ruleForm.videoType == '11'">
        <input id = 'uploadInput' class = 'cursorPointer' type = 'file' name="coverImg" accept="video/*" multiple="multiple"
           @change = "uploadVideo($event)" 
           />
         <button class = 'primay-btn cursorPointer'>添加视频</button>
         <div v-if = "videoInfo != ''" slot="tip" class="el-upload__tip color999">限200M以内mp4/avi/rm/rmvb格式视频</div>
</div> -->
    <!--                           :limit="1"
                                  :on-exceed="handleExceed" -->
                            <el-upload
                             v-show = "ruleForm.videoType == '11'"
                              class="upload-demo uploadVideo"
                              :action="uploadVideoUrl"
                              :on-change="handleChange"
                              :on-error = "handleError"
                              :on-success = "handleSuccess"
                              :on-remove = "handleRemove"
                              :before-upload = "handleBefore"
                              :before-remove="beforeRemove"
                              accept = '.mp4'
                              :on-exceed="handleExceed"
                              :file-list="fileList"
                              :disabled = "limitUpload"
                              >
                              <el-button :loading = "limitUpload" size="small" type="primary">{{ruleForm.videoInfo == '' ? '添加视频':'重新上传'}}</el-button>
                              <div slot="tip" class="el-upload__tip color999">限200M以内mp4格式视频</div>
                            </el-upload>
                            <div v-show = "ruleForm.videoType == '22'">
                              <el-input  size = 'small' v-model="ruleForm.videoInfo2" placeholder = '请粘贴外部视频网站的视频通用代码' @change = "autoSave"></el-input>
                              <p class="tishi">示例：&lt;iframe frameborder="0" width="640" height="498" src="……" allowfullscreen&gt;
                                &lt;/iframe&gt;</p>
                              <a style = "display:block;width:140px" class = 'color1d87' href = '../about_course/list.html' target="_blank">如何上传视频链接？</a>
                            </div>
                        </el-form-item>
                        <div class = 'pl20'>
                                      <el-form-item class = 'marginTop' label="Tag标签" prop = 'tag'>
                                        <el-input v-for = "(item,key) in tag" :key = "key" size = 'small' class = 'tagInput' v-model="item.value" placeholder = '' @change = "autoSave">
                                        </el-input>
                                      </el-form-item>
                                      <el-form-item label="视频简介" prop = 'textarea'>
                                          <el-input
                                            size = "small"
                                            type="textarea"
                                            :rows="2"
                                            placeholder="视频简介，100个字以内"
                                            v-model="ruleForm.textarea"
                                             @change = "autoSave"
                                            >
                                          </el-input>
                                      </el-form-item>
                                      <el-form-item label="封面图" prop="listCoverImgPost">
                                          <div class = 'showDialog cursorPointer'>
                                                <img v-if = "ruleForm.listCoverImgPost == null" class = 'cursorPointer listCoverImg' src = "../../../assets/img/xxx.png" />
                                                <img v-else class = 'cursorPointer listCoverShow' :src = "ruleForm.listCoverImgShow"  />
                                                <input  id = 'uploadInput1' class = 'cursorPointer uploadCoverImg' type = 'file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
                                                   @change = "showDialog($event,'#uploadInput1')" 
                                                   />
                                          </div>
                                          <p>找不到合适的图片？您可以用以下任一张图作为封面图</p>
                                          <div class = 'chooseCover'>
                                            <div>
                                              <img src = '../../../assets/img/article1.jpg' @click = "chooseCover($event)"/>
                                            </div>
                                           <div>
                                              <img src = '../../../assets/img/article2.jpg' @click = "chooseCover($event)"/>
                                            </div>
                                            <div>
                                              <img src = '../../../assets/img/article3.jpg' @click = "chooseCover($event)"/>
                                            </div>
                                          </div>
                                      </el-form-item>
                                      <el-form-item label="类别" prop = "articleType" @change = "autoSave">
                                              <el-radio-group v-model = "ruleForm.articleType">
                                                <el-radio label="1">原创</el-radio>
                                                <el-radio label="2">转载</el-radio>
                                              </el-radio-group>
                                      </el-form-item>
                                      <div v-if = "ruleForm.articleType == '' ? false : true">
                                        <el-form-item  v-if = "ruleForm.articleType == 1 ? false : true" label="视频来源" prop = "articleSource">
                                          <el-input size = 'small' v-model="ruleForm.articleSource" placeholder = '请输入' @change = "autoSave"></el-input>
                                        </el-form-item>
                                        <el-form-item  v-if = "ruleForm.articleType == 1 ? false : true" label="原视频链接" prop = "articleLink">
                                         <el-input size = 'small' v-model="ruleForm.articleLink" placeholder = '请输入' @change = "autoSave"></el-input>
                                        </el-form-item>
                                      </div>

<!--                                       <el-form-item label="视频来源">
   <el-input size = 'small' v-model="ruleForm.articleLink" placeholder = '请输入' @change = "autoSave"></el-input>                                        
</el-form-item>
<el-form-item label="原视频链接">
   <el-input size = 'small' v-model="ruleForm.articleLink" placeholder = '请输入' @change = "autoSave"></el-input>                                        
</el-form-item> -->
                                      <el-form-item label="打赏" prop = "award">
                                              <el-radio-group v-model = "ruleForm.award" @change = "autoSave">
                                                <el-radio label="1">
                                                  开启                                   
                                                  <span style = "color: #999" class = 'marlr10'>                                                                   注：开启打赏后，可在视频详情页展示打赏入口，其他用户可以向您打赏一定额度的钛值
                                                  </span>
                                                </el-radio><br/>
                                                <el-radio label="0" class = 'martop10'>
                                                    不开启
                                                    <span style = "color: #999" class = 'marlr10'>                                                                   注：不开启打赏，则视频详情页无打赏入口
                                                    </span>
                                                  </el-radio>
                                              </el-radio-group>
                                      </el-form-item>
                                      <el-form-item label="权利声明" class = 'powerStatement'>
                                          <span>考虑到用户浏览体验，所有投稿千氪财经的稿件，千氪财经均有权对标题、头图进行调整，这些调整并不会影响资讯内容，如果需要进行内容调整，编辑会与作者联系确认，不会直接修改。</span>
                                      </el-form-item>
                        </div>
                      </el-form>
                      <div class = 'flexR'>
                        <el-button @click = "submit('ruleForm')" type="primary" :loading = "publishLoading">发表视频</el-button>
                        <el-button @click = "setAward"  type="warning">设置浏览奖励</el-button>
                        <el-button @click = "saveDraft" type="info" :loading = "draftLoading">存草稿</el-button>
                        <el-button @click = 'onPreview'>预览</el-button>
                      </div>
                  </div>             
              </div>

        </div>

    <el-dialog
      title="上传封面"
      class = "tailorDialog"
      :visible.sync="tailorVisible"
      width="44%"
      :before-close="tailorCancle">
      <!-- 裁剪框中间部分 -->
      <div class = 'tailorContent'>
          <p class = 'suggest color999'>建议尺寸：800 x 500或以上</p>
          <div  class="wrapper" v-if = "vIf">
            <!-- 裁剪图片 -->
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
          <div class = "preview">
              <img :src =  "previews"/>
            <!-- </div> -->
          </div>
          <p class = 'font16 color999'>封面预览</p>

          <!-- 裁剪框操作栏 -->
          <div class = 'tailorHandle'>
            <div class = 'uploadbtn'>
                        <input id = 'uploadInput2' class = 'cursorPointer' type = 'file' name="coverImg" accept="image/jpeg,image/png" multiple="multiple"
                           @change = "showDialog($event,'#uploadInput2')" 
                           />
                         <button class = 'primay-btn cursorPointer'>重新上传</button>
            </div>
            <div>
              <span class = 'icon iconfont icon-jiahao cursorPointer tailorIcon' @click = "changeScale(1)"></span>
              <span class = 'icon iconfont icon-sub cursorPointer tailorIcon'  @click = "changeScale(-1)"></span>
              <span class = 'icon iconfont icon-xuanzhuan2 cursorPointer tailorIcon' @click = "rotateRight"></span>
              <span slot="footer" class="dialog-footer"></span>
            </div>
          </div>
      </div>
      <!-- 裁剪框底部 -->
      <div class = 'tailorFooter'>
          <el-button @click="tailorCancle">取 消</el-button>
          <el-button type="primary" :loading = "loading" @click="tailorCreate">确 定</el-button>    
      </div>
    </el-dialog>
    <!-- 阅读奖励 -->
    <read-award :readAward = "readAward" :editorContentText = "editorContentText" :editorContentHtml = "editorContentHtml" :tag = "tagStr" :handleClose = "handleCloseRead" :ruleForm = "ruleForm" :getArticleAward = "getArticleAward" :tiValue = "tiValue" :changeTiValue = "changeTiValue" :videoAward = "2"
    />
    <!-- 认证 -->
    <el-dialog
      :visible.sync="approveVisible"
      width="30%"
      :before-close="handleClose(this.approveVisible)">
      <p class = 'font16 approveInfo'>需通过实名认证，才能设置阅读奖励</p>
      <div class = 'approveInfo'>
        <el-button size = 'small' @click="approveVisible = false">取 消</el-button>
        <el-button size = 'small' type="primary"  @click="goApprove">去认证</el-button>      
      </div>
      <p class = 'approveInfo'>若视频还未保存，请保存后，再去认证。<a @click = "saveDraft">存草稿</a></p>
    </el-dialog>
    <!-- 重新认证 -->
        <el-dialog
      :visible.sync="reApproveVisible"
      width="30%"
      :before-close="handleClose(this.reApproveVisible)">
      <p class = 'font16 approveInfo'>您的实名认证审核不通过，请重新认证</p>
      <div class = 'approveInfo'>
        <el-button size = 'small' @click="reApproveVisible = false">取 消</el-button>
        <el-button size = 'small' type="primary"  @click="goApprove">去认证</el-button>      
      </div>
      <p class = 'approveInfo'>若视频还未保存，请保存后，再去认证。<a @click = "saveDraft">存草稿</a></p>
    </el-dialog>
        <!-- <other-footer /> -->
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import vueCropper from 'vue-cropper';
import HbHead from 'components/HbHead';
import ReadAward from 'components/ReadAward';
import axios from 'axios';
import OtherFooter from 'components/OtherFooter';
import Sidebar from 'components/sidebar2';
import JQ from 'jquery'
  export default {
    name: 'UE',
    components: {
      vueCropper,ReadAward,HbHead,OtherFooter,Sidebar
    },
    data () {
      var validateTitle = (rule,value,callback) =>{
        if (value == "") {
          callback(new Error('视频标题不能为空'));
        }else if(value != '' && typeof(this.sensitive) === "string"){
          const sensitive = this.sensitive.split(',');
          for(var i in sensitive){
            if(value.indexOf(sensitive[i]) != '-1'){
                callback(new Error('视频标题检测到敏感词：' + this.sensitive));
            }else{
                  callback()
                }
          }
        }else if(value !="" &&  (value.length > 64 || value.length < 1)) {
          callback(new Error('视频标题长度在 1 到 64 个字符'));
        }else {
          callback();
        }      
      }
      var validateTag = (rule, value, callback) => {
        var n = 0;
        var res = [this.tag[0].value];
        for(var i in this.tag){
            if (this.tag[i].value == '') {
              n +=1
            }else if(!Lib.V.validateTag(this.tag[i].value)){
              callback(new Error('每个tag：2-16个字符'));
            }else if(this.tag[i].value != '' && typeof(this.sensitive) === "string" ){
              const sensitive = this.sensitive.split(',');
              for(var j in sensitive){
                if(this.tag[i].value.indexOf(sensitive[j]) != '-1'){
                    callback(new Error('视频标签检测到敏感词：' + this.sensitive));
                }
              }
            }
        }
      　for(var k=1;k<this.tag.length;k++){
      　　　　var repeat = false;
      　　　　for(var j=0;j<res.length;j++){
      　　　　　　if(this.tag[k].value == res[j] && res[j] != ''){
      　　　　　　　　repeat = true;
                      callback(new Error('tag标签不能重复'));
      　　　　　　　　break;
      　　　　　　}
      　　　　}
      　　　　if(!repeat){
      　　　　　　res.push(this.tag[k].value);
      　　　　}
      　}
        if(n > 2){
          callback(new Error('至少输入3个tag'));
        }else{
          callback()
        }
      };       
      var validateCoverImg = (rule, value, callback) => {
        if(this.ruleForm.listCoverImgPost == null){
          callback(new Error('请选择封面图片'));
        }else{
          callback()
        }
      };
      var validateVideo= (rule, value, callback) => {
        if(this.ruleForm.videoInfo == '' && this.ruleForm.videoInfo2 == ''){
          callback(new Error('请上传视频'));
        }else{
          callback()
        }
      };
     let validateTextarea = (rule, value, callback) => {
        if (value !="" &&  (value.length > 100 || value.length < 10)) {
          callback(new Error('请输入10-100个字作为视频简介'));
        }else if(value != '' && typeof(this.sensitive) === "string"){
          const sensitive = this.sensitive.split(',');
          for(var i in sensitive){
            if(value.indexOf(sensitive[i]) != '-1'){
                callback(new Error('视频简介检测到敏感词：' + this.sensitive));
            }else{
                  callback()
                }
          }
        }else {
          callback();
        }
      };
       let validateSource = (rule, value, callback) => {
        if (value =="") {
          callback(new Error('请输入视频来源'));
        }else if(value !="" &&  (value.length > 500 || value.length < 1)){
          callback(new Error('请输入1-500字的视频来源'));
        }else if(value != '' && typeof(this.sensitive) === "string"){
          const sensitive = this.sensitive.split(',');
          for(var i in sensitive){
            if(value.indexOf(sensitive[i]) != '-1'){
                callback(new Error('视频来源检测到敏感词：' + this.sensitive));
            }else{
                  callback()
                }
          }
        }else {
          callback();
        }
      };      
      return {
        limitUpload:false,
        uploadVideoUrl:Lib.C.uploadVideoUrl,
        obj:{},
        radio:1,
        tiValue:{},
        imgUrl:Lib.M.imgUrl,
        canMove:false,
        editor: null,
        input: '',
        editorShow:true,
        fileList: [],
        ruleForm: {
          title:'',
          textarea:'',
          tag:'',
          articleType:'',
          award:'',
          articleSource:"",
          articleLink:"",
          listCoverImgShow:'',
          listCoverImgPost:null,
          videoType:"11",
          videoInfo:"",
          videoInfo2:"",
          videoFilename:"",
        },
        rules: {
          title: [
              { required: true, validator: validateTitle, trigger: 'blur' },
          ],
          tag:[
            {required:true,validator: validateTag, trigger: 'blur'}
          ],
          articleSource:[
            { required: true, validator: validateSource, trigger: 'blur' },
          ],
          articleLink:[
            { required: true, message: '请输入原文链接', trigger: 'blur' },
            { min: 1, max: 500, message: '长度不能超过500个字符', trigger: 'blur' }
          ],
          articleType: [
            { required: true, message: '请选择视频类别', trigger: 'change' }
          ],
          award: [
            { required: true, message: '请选择是否开启打赏', trigger: 'change' }
          ],
          listCoverImgPost:[
            {required:true,validator: validateCoverImg, trigger: 'change'}   
          ],         
          videoInfo:[
            {required:true,validator: validateVideo, trigger: 'change'}   
          ],
          textarea:[
            { required:true,validator:validateTextarea,trigger: 'blur' },
          ],
        },
        tag:[
        {'id':'1','value':''},
        {'id':'2','value':''},
        {'id':'3','value':''},
        {'id':'4','value':''},
        {'id':'5','value':''},
        ],
        tagStr:"",
        dialogVisible: false,
        tailorVisible:false,
        coverImg:[],
        coverImgArr:[],
        // coverImg2:[],
        checkedImg:null,
        //上传封面配置
        dialogImageUrl:'',
        showFileList:false,
        //裁剪图片配置
        crap: false,
        option: {
          size: 1,
          outputType: 'png',
          full:false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
/*          autoCropWidth: 220 ,
          autoCropHeight: 142,
          fixedNumber: [110,71],*/
              autoCropWidth: 250 ,
          autoCropHeight: 140,
          fixedNumber: [16,9],

        },
        downImg: '#',
        previews: "",
        vIf:false,
        blobData:null,
        loading:false,
        editorContentHtml: '',
        content:'',
        editorContentText:'',
        n:5000,
        publishLoading:false,
        draftLoading:false,
        // isApprove:true,
        approveVisible:false,
        reApproveVisible:false,
        //阅读奖励
        readAward:{
          visible:false,
          balance:"0"
        },
        award_list:null,
        limitNum:false,
        //实名认证
        isApprove:null,
        //自动保存
        autoSaveInterval:null,
        tagInterval:null,
        articleInterVal:null,
        textInterVal:null,
        articleId:null,
        busying:null,
        limitLength:'0',
        coverRandom1:'',
        coverRandom2:'',
        coverRandom3:'',
        //敏感词检测
        sensitive:null,
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const token = localStorage.getItem("kg_desk_token");
      if(token == null){
        window.onbeforeunload = null
      }
      //监听浏览器关闭
      window.addEventListener("popstate", function() {  
          alert("离开后，视频不会被保存，确定离开吗？")        
      });
      window.onbeforeunload = function(){
          return "您的视频尚未保存，确定要离开吗";
      }
      var a = [];
            for(var i = 0; i < 20; i++){
                a.push(i);
            }
            a.sort(function(){return 0.5 - Math.random()});
            a.length = 3;
      const isSet = localStorage.getItem("isSetAward");
      const that = this;
    },
    methods:{
      handleExceed(files, fileList) {
        if(this.ruleForm.videoInfo != ''){
          this.fileList = []
        }
      },
      handleBefore(file){
        this.limitUpload = true;
        this.publishLoading = true;
        let isTrue = false;
        if(file.type ==='video/mp4'){
          isTrue = true;
        }
        if (!isTrue) {
          this.$message.error('请用mp4视频格式!');
          this.limitUpload = false;
          this.publishLoading = false;
        }
        const isLt200M = file.size / 1024 / 1024 < 200;
        if (!isLt200M) {
          this.$message.error('上传视频大小不能超过 200MB!');
          this.limitUpload = false;
          this.publishLoading = false;
        }
        return isTrue && isLt200M;
      },
      handleRemove(files, fileList){
        if(fileList.length == 0){
          this.ruleForm.videoInfo = '';
        }
      },
      beforeRemove(file, fileList){
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(response, file, fileList){
        // clearFiles()
 
        if(response.errorCode == 10000){
                  this.ruleForm.videoInfo = response.data[0].filePath
                  this.ruleForm.videoFilename = file.name;
                  this.fileList = [{"name":file.name,"url":response.data[0].filePath}];
                  this.limitUpload = false;
                  this.publishLoading = false;
                  this.autoSave()
              this.$refs['ruleForm'].validateField('videoInfo',(videoInfo) => {
                  if(videoInfo == ""){
                }else{
                  return false
                }
              });
        }else{
          this.fileList = []
          this.ruleForm.videoInfo = '';
          this.limitUpload = false;
          this.publishLoading = false;
            this.$message({
              type:'error',
              message:response.errorMsg
            })
        }
      },
      handleChange(file, fileList) {

      },
      handleError(err, file, fileList){
          this.limitUpload = false;
          this.publishLoading = false;
      },
      uploadVideo(e){
        const that = this;
      var fileList=e.target.files[0]
                  //现在图片文件大小
                  var videoSize = fileList.size;
                  const type = fileList.type;
                    if(videoSize>200*1024*1024) {
                      this.$message({
                        type:"warning",
                        message:'限200M以内mp4格式视频'
                      })
                      var jqObj = JQ("#uploadInput");
                      jqObj.val("");
                      var domObj = jqObj[0];
                      domObj.outerHTML = domObj.outerHTML;
                      var newJqObj = jqObj.clone();
                      jqObj.before(newJqObj);
                      jqObj.remove();
                      JQ("#uploadInput").unbind().change(function (e) {
                          //alert("ab");
                          that.uploadVideo(e);
                      });
                        return;
                    }
            let formData = new FormData();
            formData.append('name', 'file');
            formData.append('file', fileList);
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
                axios.post(Lib.C.uploadVideoUrl, formData, config).then(function (res) {
                res =res.data; 
                if (res.errorCode == 10000) {
                    that.ruleForm.videoInfo = res.data[0].filePath;    
                }else{
                      that.$message({
                        type:"error",
                        message:res.errorMsg
                      }) 
                }
            }).catch(function (error) {
                  that.loading = false;
                  alert('当前网络较忙，请稍后再试')
            })
      },
      chooseCover(e){
          var _this = e.target.src;
          const that = this;
          function getBase64(img){//传入图片路径，返回base64
              function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
                var canvas = document.createElement("canvas");
                canvas.width = width ? width : img.width;
                canvas.height = height ? height : img.height;
       
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                var dataURL = canvas.toDataURL();
                return dataURL;
              }
              var image = new Image();
              image.crossOrigin = '';
              image.src = img;
              var deferred=JQ.Deferred();
              if(img){
                image.onload =function (){
                  deferred.resolve(getBase64Image(image));//将base64传给done上传处理
                }
                return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
              }
            }
            function dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
                while(n--) {
                u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                type: mime
                });
            }
        getBase64(_this)
        .then(function(base64){
            let formData = new FormData();
            formData.append('name', 'file');
            formData.append('file', dataURLtoBlob(base64));
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
           axios.post(
            Lib.C.uploadImgUrl,
             formData, 
             config).then(function (res) {
             that.busying = null;  
                res =res.data; 
                if (res.errorCode == 10000) {
                    that.ruleForm.listCoverImgShow = Lib.C.imgUrl + res.data[0].filePath;
                    that.ruleForm.listCoverImgPost = res.data[0].filePath;
                    that.autoSave()

                    // that.vIf = false; 
                    that.checkedImg = null; 
                }
            }).catch(function (error) {
            })
        },function(err){
        });
      },
      autoSave(){
        if(this.ruleForm.videoInfo2 != ''){
            if(this.ruleForm.videoInfo2.indexOf('src') != '-1' && this.ruleForm.videoInfo2.indexOf('://') != '-1') {
              this.ruleForm.videoInfo2 = this.ruleForm.videoInfo2.replace(new RegExp("'","gm"),'"');
              this.ruleForm.videoInfo2 = 'https://'+this.ruleForm.videoInfo2.match(/:\/\/(\S*)"/)[1];
            }else if(this.ruleForm.videoInfo2.indexOf('http') != '-1' && this.ruleForm.videoInfo2.indexOf('src') == '-1'){
                this.ruleForm.videoInfo2 = 'https://'+this.ruleForm.videoInfo2.match(/:\/\/(\S*)/)[1];
            }
        }
        const that = this;
                 let n = 0;
         let arr = [];
         for(var i in this.tag){
            if(this.tag[i].value == ''){
              n +=1
            }else{
              arr.push(this.tag[i].value)
            }
         }
         this.tagStr =arr.join(',')
               //视频自动保存
            let autoSave_list= {
                      //发布基础信息
                       "createUser":localStorage.getItem('kg_desk_userId'),
                       "articleTitle":this.ruleForm.title,
                       "articleId":this.articleId,
                       "articleImage":this.ruleForm.listCoverImgPost,
                       "articleDescription":this.ruleForm.textarea,
                       "articleTagnames":this.tagStr,
                       "articleType":this.ruleForm.articleType,
                       "articleFrom":1,
                       "bonusStatus":this.ruleForm.award,
                       "publishStatus":4,
                       "publishKind":2,
                       'videoFilename':this.ruleForm.videoType == '11' ? this.ruleForm.videoFilename : "",
            };
            if(this.ruleForm.videoType == '11'){
              if(this.ruleForm.videoInfo == ''){
                 autoSave_list.videoUrl = '';
              }else{
                autoSave_list.videoUrl =Lib.C.videoUrl +  this.ruleForm.videoInfo
              }
            }else{
              autoSave_list.videoUrl = this.ruleForm.videoInfo2;
            }
/*            if(this.ruleForm.videoType == '11'){
              autoSave_list.videoFilename = this.ruleForm.videoFilename
            }*/
          if(this.ruleForm.articleType == 2){
              autoSave_list.articleLink = this.ruleForm.articleLink
              autoSave_list.articleSource = this.ruleForm.articleSource
            }
            if(this.award_list != null){
                      autoSave_list.list = this.award_list
          }
          Lib.M.autoSave(autoSave_list,that)
      },
      changeScale(item){
        this.$refs.cropper.changeScale(item) 
      },
      rotateRight(){
        this.$refs.cropper.rotateRight()
      },
      coverImgCancel(){
        this.dialogVisible = false
        this.editorShow =true
        this.checkedImg = null
      },
      changeTiValue(val){
        this.tiValue = val;
      },
      getArticleAward(list){
          this.award_list = list;
      },
      onPreview(){
        let obj = this.ruleForm;
        obj.publishKind = 2;
        obj.videoFilename = this.ruleForm.videoType == '11' ? this.ruleForm.videoFilename :'';

        if(this.ruleForm.videoType == '11' && this.ruleForm.videoInfo !=''){
          obj.videoUrl =  Lib.C.videoUrl + this.ruleForm.videoInfo
        }else if(this.ruleForm.videoType == '11'  && this.ruleForm.videoInfo =='') {
          obj.videoUrl = ''
        }else if(this.ruleForm.videoType == '22'){
          obj.videoUrl = this.ruleForm.videoInfo2
        }
        // obj.videoUrl = this.ruleForm.videoType == '11'? Lib.C.videoUrl +  this.ruleForm.videoInfo : this.ruleForm.videoInfo2;
        localStorage.setItem('preview_data',JSON.stringify(this.ruleForm))
        localStorage.setItem('preview_publishKind',2)
        localStorage.setItem('preview_tag',JSON.stringify(this.tag))
        // localStorage.setItem('preview_article',this.editorContentHtml)
        // localStorage.setItem('preview_abstract',this.editorContentText.substring(0,100))
        window.open('../preview/list.html')
      },
      goApprove(){
        localStorage.setItem('award_approve',2)
        Lib.M.accountSafe();
      },
      handleCloseRead(){
        this.readAward.visible = false;
      },
      //设置阅读奖励
      setAward(){
        const that = this;
        function fn(){
            that.readAward.visible = true;
            Lib.M.getUserbalance(that)
            that.readAward.textnum = 5000-that.n
            const textnum = that.readAward.textnum;
            if(textnum >1500 && textnum < 2500){
              that.readAward.minutes = 3
            }else if(textnum>2500 && textnum < 3500){
              that.readAward.minutes = 4
            }else if(textnum>3500 && textnum < 4500){
              that.readAward.minutes = 5
            }else if(textnum>4500 && textnum <= 5000){
              that.readAward.minutes = 6
            }else if(textnum < 1500){
                  that.readAward.minutes = 2
            }
        }
        //调用实名认证判断方法
        Lib.M.isApprove(fn,this)
      },
      //存草稿
      saveDraft(){
        if(this.ruleForm.videoInfo2 != ''){
            if(this.ruleForm.videoInfo2.indexOf('src') != '-1' && this.ruleForm.videoInfo2.indexOf('://') != '-1') {
              this.ruleForm.videoInfo2 = this.ruleForm.videoInfo2.replace(new RegExp("'","gm"),'"');
              this.ruleForm.videoInfo2 = 'https://'+this.ruleForm.videoInfo2.match(/:\/\/(\S*)"/)[1];
            }else if(this.ruleForm.videoInfo2.indexOf('http') != '-1' && this.ruleForm.videoInfo2.indexOf('src') == '-1'){
                this.ruleForm.videoInfo2 = 'https://'+this.ruleForm.videoInfo2.match(/:\/\/(\S*)/)[1];
            }else{
                this.$message({
                  type:'warning',
                  message:'视频地址不正确'
                })
                return
            }
        }
         const that = this;
         let n = 0;
         let arr = [];
         for(var i in this.tag){
            if(this.tag[i].value == ''){
              n +=1
            }else{
              arr.push(this.tag[i].value)
            }
         }
          // window.clearInterval(this.autoSaveInterval);
         this.tagStr =arr.join(',')
            let saveDraft_list= {
                      //发布基础信息
                       "createUser":localStorage.getItem('kg_desk_userId'),
                       "articleTitle":this.ruleForm.title,
                       "articleId":this.articleId,
                       "articleImage":this.ruleForm.listCoverImgPost,
                       "articleDescription":this.ruleForm.textarea,
                       "articleTagnames":this.tagStr,
                       "articleType":this.ruleForm.articleType,
                       "articleFrom":1,
                       "bonusStatus":this.ruleForm.award,
                       "publishStatus":4,
                       "publishKind":2,
                       'videoFilename':this.ruleForm.videoType == '11' ? this.ruleForm.videoFilename : "",
            };
            if(this.ruleForm.videoType == '11'){
              if(this.ruleForm.videoInfo == ''){
                 saveDraft_list.videoUrl = '';
              }else{
                saveDraft_list.videoUrl =Lib.C.videoUrl +  this.ruleForm.videoInfo
              }
            }else{
              saveDraft_list.videoUrl = this.ruleForm.videoInfo2;
            }
/*            if(this.ruleForm.videoType == '11'){
              saveDraft_list.videoFilename = this.ruleForm.videoFilename
            }*/
          if(this.ruleForm.articleType == 2){
              saveDraft_list.articleLink = this.ruleForm.articleLink
              saveDraft_list.articleSource = this.ruleForm.articleSource
            }
            if(this.award_list != null){
                      saveDraft_list.list = this.award_list
            }
            Lib.M.saveDraft(saveDraft_list,that)
            window.onbeforeunload=null
      },
      //获取富文本输入值
      getContent: function () {
            var text =  this.editorContentText
            var arr = text.split('&nbsp;')
            text = arr.join('')
      },
      tailorCreate(){
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
           axios.post(
            Lib.C.uploadImgUrl,
             formData, 
             config).then(function (res) {
             that.busying = null;  
                res =res.data; 
                if (res.errorCode == 10000) {
                    that.ruleForm.listCoverImgShow = Lib.C.imgUrl + res.data[0].filePath;
                    that.ruleForm.listCoverImgPost = res.data[0].filePath;
                    that.loading = false
                    that.tailorVisible = false   
                    // that.tailorVisible = false;
                    that.editorShow = true;
                    that.$refs.cropper.clearCrop()
                    that.vIf = false; 
                    that.checkedImg = null;
                         
                }
            }).catch(function (error) {
                  that.loading = false;
                  alert('当前网络较忙，请稍后再试')
            })
      },
      //发布视频
      submit(formName){
        if(this.ruleForm.videoInfo2 != ''){
            if(this.ruleForm.videoInfo2.indexOf('src') != '-1' && this.ruleForm.videoInfo2.indexOf('://') != '-1') {
                this.ruleForm.videoInfo2 = this.ruleForm.videoInfo2.replace(new RegExp("'","gm"),'"');
                this.ruleForm.videoInfo2 = 'https://'+this.ruleForm.videoInfo2.match(/:\/\/(\S*)"/)[1];
            }else if(this.ruleForm.videoInfo2.indexOf('http') != '-1' && this.ruleForm.videoInfo2.indexOf('src') == '-1'){
                this.ruleForm.videoInfo2 = 'https://'+this.ruleForm.videoInfo2.match(/:\/\/(\S*)/)[1];
            }else{
                this.$message({
                  type:'warning',
                  message:'视频地址不正确'
                })
                return
            }
        }
         let n = 0;
         let arr = [];
         for(var i in this.tag){
            if(this.tag[i].value == ''){
              n +=1
            }else{
              arr.push(this.tag[i].value)
            }
         }
         this.tagStr =arr.join(',')
        const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let publish_list = {
                           //发布基础信息
                       "createUser":localStorage.getItem('kg_desk_userId'),
                       "articleTitle":this.ruleForm.title,
                       "articleId":this.articleId,
                       "articleImage":this.ruleForm.listCoverImgPost,
                       "articleDescription":this.ruleForm.textarea,
                       "articleTagnames":this.tagStr,
                       "articleType":this.ruleForm.articleType,
                       "articleFrom":1,
                       "bonusStatus":this.ruleForm.award,
                       "publishStatus":2,
                       "publishKind":2,
                       "videoUrl":this.ruleForm.videoType == '11'? Lib.C.videoUrl +  this.ruleForm.videoInfo : this.ruleForm.videoInfo2,
                       'videoFilename':this.ruleForm.videoType == '11' ? this.ruleForm.videoFilename : "",
            };
/*            if(this.ruleForm.videoType == '11'){
              publish_list.videoFilename = this.ruleForm.videoFilename
            }*/
            if(this.ruleForm.articleType == 2){
              publish_list.articleLink = this.ruleForm.articleLink
              publish_list.articleSource = this.ruleForm.articleSource
            }
            if(this.award_list != null){
                      publish_list.list = this.award_list
            }
            publish_list = Lib.M.postDataRequest(publish_list)       
            this.publishLoading = true;
           Lib.M.postAjax({
                  'type':'POST',
                  'url':'/article/AddArticle',
                  "data":publish_list,
                  'success':function (data){
                    if(data.code == 10000){
                        data = data.responseBody.data;
                        // localStorage.setItem('kg_desk_token', data.token);
                                 that.$alert('您的视频已成功发布，通过审核后，即可展示出来，请耐心等待！', {
                                  confirmButtonText: '我知道了',
                                  center: true,
                                  callback: action => {
                                    that.$message({
                                      type: 'success',
                                      message: "提交成功"
                                    });
                                    if(that.award_list != null){
                                      localStorage.setItem('kg_desk_readAward',1)
                                    }
                                    that.publishLoading = false
                                    window.onbeforeunload=null;//取消事件绑定
                                    setTimeout(()=>{
                                      window.location.href = '../account/details.html#/column';
                                    },200);
                                  }
                                });

                    }else if(data.code === '29001'){
                                  that.sensitive = data.message
                                  that.$refs['ruleForm'].validateField('title',(title) => {
                                          if(title == ""){
                                          }else{
                                            return false
                                          }
                                            });
                                  that.publishLoading = false
                    }else if(data.code === '29002'){
                                  let sensitive = [];
                                  sensitive = data.message.split(',');
                                  that.sensitive = data.message.split(',')
                                  for(var i in sensitive){
                                      (function(i){
                                          setTimeout(function(){
                                              var reg = new RegExp("(" + sensitive[i] + ")", "g");  
                                          that.content = that.editorContentHtml.replace(reg, "<span style = 'color:red'>$1</span>"); 
                                          },200)
                                      })(i)
                                  }
                                  that.$message({
                                            message: '视频正文中检测到敏感词：'+ data.message,
                                            type: 'warning'
                                  })
                                  that.publishLoading = false
                    }else if(data.code === '29003'){
                              that.sensitive = data.message
                                        that.$refs['ruleForm'].validateField('tag',(tag) => {
                                      if(tag == ""){
                                      }else{
                                        return false
                                      }
                                });
                            that.publishLoading = false
                    }else if(data.code === '29004'){
                              that.sensitive = data.message
                                        that.$refs['ruleForm'].validateField('textarea',(textarea) => {
                                      if(textarea == ""){
                                      }else{
                                        return false
                                      }
                                });
                            that.publishLoading = false
                    }else if(data.code === '29006'){
                            that.sensitive = data.message
                                    that.$refs['ruleForm'].validateField('articleSource',(articleSource) => {
                                  if(articleSource == ""){
                                  }else{
                                    return false
                                  }
                            });
                            that.publishLoading = false
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                        that.publishLoading = false
                    }

              }
            });
          } else {
            return false;
          }
        });
      },
      handleClose(item) {
        item = false;
      },
      //上传封面图
      showDialog(e,element){
      const that = this;
                  var fileList=e.target.files[0]
                  //现在图片文件大小
                  var imgSize = fileList.size;
                  const type = fileList.type
                    if(imgSize>2*1024*1024 || (type != "image/png"  && type != "image/jpeg")) {
                      this.$message({
                        type:"warning",
                        message:'封面图不超过2M，仅支持jpg、png、jpeg格式'
                      })
                      var jqObj = JQ(element);
                      jqObj.val("");
                      var domObj = jqObj[0];
                      domObj.outerHTML = domObj.outerHTML;
                      var newJqObj = jqObj.clone();
                      jqObj.before(newJqObj);
                      jqObj.remove();
                      JQ(element).unbind().change(function (e) {
                          //alert("ab");
                          that.showDialog(e,element);
                      });
                        return;
                    }
                  //将图片文件转换为base64
                  // var coverImg = this.coverImg
                  var reader=new FileReader();
                  reader.onload=function(e){
                    that.checkedImg = reader.result;
                  }  
                 reader.readAsDataURL(fileList)
              // this.$refs.cropper.reload()
              this.tailorVisible = true;
              this.vIf = true;
              this.autoSave()
      },
      //裁剪图片
      // 实时预览函数
      realTime (data) {
          this.previewsHandle()
      },
      tailorCancle(){
          // this.coverImg2 = [];
          this.tailorVisible = false;
          this.editorShow = true;
          this.loading =false;
          // this.$refs.cropper.clearCrop()
          this.vIf = false;
          this.checkedImg = null;
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
    onEditorBlur (editor) {
       this.autoSave()
    },

    onEditorChange(html,text) {
      this.editorContentHtml = html;
      this.editorContentText = text;
      let l = text.replace(/\s+/g, "")
      this.limitLength = l.length;
    },
    changeContent(val){
      this.editorContentHtml=val;
    },
    // end
    },

  }
</script>

<style scoped>
.el-upload__tip{
  display: inline-block;
  margin-left:10px;
}
  .videoUploadBtn{
  width:100%!important;
}
.gou{
  display:none;
  position: absolute;
    right: 0px;
    bottom: 0px;
    margin: auto;
    color: green;
    border: 1px solid green;
    width:15px;
    height:15px;
}
.icon-gou{
    font-size: 23px;
    position: absolute;
    top: -4px;
    right: -4px;

}
.myColumn{
  width:100%;
  height:auto;
  margin-bottom:200px;
  background:#f4f4f4;
}

.myColumn_main{
  padding:20px 0px;
  position: relative;
}
.el-input,.el-textarea{
  width:50%;
}
.el-input{
  height:30px;
}
.myColumn_main{
  height:auto;
}

.myColumn_main .flexR{
  justify-content: center;
}
.marginTop{
  /*margin-top:50px;*/
}
.tagInput{
  width:100px;
  margin-right:15px;
}
.coverImg,.chooseImgDiv{
  position: relative;
  display: inline-block;
    width: 174px;
    /*height: 108px;*/
    margin-right: 10px;
    margin-top: 10px;
    /*border:2px solid transparent;*/
}
.chooseImgDiv{
  background:#f6f6f6;
  border-radius: 4px
}
.chooseImg img{
  border-color:#ccc;
}
.tishi{
  font-size:14px;
  color:rgb(153, 153, 153);
  line-height:20px!important;
}
/* .checkedImg{
  display: inline-block;
  width:400px;
  height:300px;
} */


.wrapper{
  width:500px;
  height:300px;
  display: inline-block;
  float:left;
  margin-right:50px;
  margin-bottom:10px;
}
.preview{
  display: inline-block;
  width:220px;
  height:144px;
  background:rgba(0,0,0,0.7);
  /*margin-top:20px;*/
  border:1px solid #ccc;
}
.preview img{
  display: inline-block;
  width:220px;
  height:144px;
}

.uploadbtn{
  width:280px;
  height:30px;
  overflow: hidden;
  position: relative;
  display: inline-block;
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
.listCoverImg{
  display: inline-block;
  width:38px;
  height:38px;
  margin:0 auto;
}
.listCoverShow{
  display: inline-block;
  width:100%;
  height:100%;
}

.approveInfo{
  margin:0 auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.approveInfo:nth-child(2){
  margin:20px 0px;
}
.approveInfo a{
  color:#1d87ff;
  cursor: pointer;
}
.showDialog{
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 244px;
    height: 144px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}
  .uploadCoverImg{
  width:100%;
  height:100%;
  position: absolute;
  filter:alpha(opacity=0);  
  -moz-opacity:0;
  -khtml-opacity: 0;  
  opacity: 0;
  top:0px;
  left:0px;
}

</style>
<style>
  .coverSuggest{
    display: inline-block;
    margin-left: 110px;
    font-size: 12px;
  }
  .suggest{
    font-size:14px;
    margin:10px 0px;
  }
  .uploadCover .el-dialog__body{
    padding-top:0px;
    padding-bottom:0px;
  }
  .uploadCover .el-dialog__header{
    padding-left:20px;
  }

  .publishContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:1170px;
    margin:0 auto;
    padding-top:90px;
  }
  .publishArticle{
    background:#fff;
    width:82%;
  }
  .auto_save{
    position: absolute;
    top: 85px;
    right: 10px;
    font-size: 16px;
    color: #b2b2b2;
  }
  .auto_save .iconfont{
    margin-top:2px;
    margin-left:2px;
    font-size:18px!important;
  }
  .limit_f{
    font-size:14px;
    color:#b2b2b2;
  }

</style>
<style scoped>
.quill-editor-example {
  .ql-editor{
    min-height: 200px !important;
  }
}

</style>

<style>

@media only screen and (max-width:1790px) {
    .tailorDialog .el-dialog{
      width:50%!important;
    }
  }
  @media only screen and (max-width:1655px) {
    .tailorDialog .el-dialog{
      width:51%!important;
    }
  }  
  @media only screen and (max-width:1655px) {
    .tailorDialog .el-dialog{
      width:53%!important;
    }
  }
  @media only screen and (max-width:1560px) {
    .tailorDialog .el-dialog{
      width:55%!important;
    }
  }
  @media only screen and (max-width:1500px) {
    .tailorDialog .el-dialog{
      width:60%!important;
    }
  }
  @media only screen and (max-width:1380px) {
    .tailorDialog .el-dialog{
      width:62%!important;
    }
  }
  @media only screen and (max-width:1320px) {
    .tailorDialog .el-dialog{
      width:65%!important;
    }
  }
  @media only screen and (max-width:1140px) {
    .tailorDialog .el-dialog{
      width:46%!important;
    }
  }
  @media only screen and (max-width:1040px) {
    .tailorDialog .el-dialog{
      width:48%!important;
    }
    .publishContainer{
      padding-top:120px;
    }
  }
</style>
