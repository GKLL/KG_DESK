<template>
	<div id="app" :style = "height">
    <hb-head :preview = "true"></hb-head>
    <div class = 'previewMask'></div>
    <div class = 'container'>
                     <el-alert
      title="这是预览页面，不支持任何操作"
      type="warning"
      center
      :closable="false">
    </el-alert> 
          <div class = 'container1'>
          <div class="container_left martop20">
              <p class="title">{{articleDetails.title}}</p>
              <div class="font14 martop10 abstract" v-if = "publishKind == 1">{{articleDetails.textarea == '' ? abstract : articleDetails.textarea}}</div>
              <div class="font14 martop10 abstract" v-if = "publishKind == 2">{{articleDetails.textarea}}</div>
              <!-- 判断该篇文章是视频文章还是纯文章  -->
              <div v-if = "publishKind == 1" class="font14 article" v-html="preview_article"></div>
              <div v-if = "publishKind == 2 && articleDetails.videoUrl != ''" >
                  <video style = "width:100%" v-if = "(articleDetails.videoFilename != null && articleDetails.videoFilename != '') || articleDetails.videoUrl.indexOf('mp4') != '-1'" controls="controls" autoplay="autoplay" controlslist="nodownload" >
                    <!-- .avi,.3gp,.mpeg,.mpg,.flv,.asf,.rm,.dat,.mp4,.vob,.mkv,wmv,.rmvb,.mov -->
                      <source :src="articleDetails.videoUrl"type="video/mp4" />
                  </video>
                  <iframe v-if = "(articleDetails.videoFilename == null || articleDetails.videoFilename == '') && (articleDetails.videoUrl != '' || articleDetails.videoUrl != null)" style = "width:100%;height:450px" frameborder="0" allowfullscreen="true" :src="articleDetails.videoUrl"></iframe>
              </div>
               <!-- 判断结束  -->
              <!-- <div class="martop20 font14 article" v-html="preview_article"></div> -->
              <div class="martop20" v-if= "articleDetails.radio == 2"><span>本文来源：</span><span>{{articleDetails.articleSource}}</span><a :href = "articleDetails.articleLink" class="pl20 qunwen" v-if = "articleDetails.radio == 2" target = "_blank">阅读原文</a></div>
              <!-- 文章标签 -->
              <div class="martop20" v-if = "HotTags == null ? false : true">
                 <el-tag class = 'cursorPointer marR10' :key = "key" v-for="(t,key) in HotTags">{{t.value}}</el-tag>
              </div>
              <div class = 'line martop20'></div>
          </div>
          <div class="container_right">
          </div>
        </div>
    </div>

    <other-footer :preview = "true"></other-footer>
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
import TopRank from 'components/TopRank';
import HotImg from 'components/HotImg';
import BestArticle from 'components/BestArticle';
import Hours from 'components/Hours';
import Comment from 'components/Comment';
import RightImg from 'components/RightImg';
import ArticlesInterest from 'components/ArticlesInterest';
import AwardModal from 'components/AwardModal';


export default {
  components: {HbHead,OtherFooter,TopRank,RightImg,HotImg,BestArticle,Hours,Comment,ArticlesInterest,AwardModal},
  data() {
    return {
    	height:{
    		height:document.body.clientHeight + 'px'
    	},
      HotTags:[],
      right_hot:{"img":'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg',"title":'如何评价微信小程序如何评价微信小如何评价微信小程序如何评价微信小'},
      authorInfo:{},
      articleDetails:[{}],
      collectVisible:false,
      commentList:[{}],
      preview_article:"",
      abstract:"",
      publishKind:''
    }
  },
  mounted(){
        this.articleDetails = JSON.parse(localStorage.getItem('preview_data'));
        console.log('articleDetails',this.articleDetails)
        let arr  = JSON.parse(localStorage.getItem('preview_tag'));
        this.articleDetails.title = this.articleDetails.articleTitle != undefined ? this.articleDetails.articleTitle :this.articleDetails.title;
        this.articleDetails.textarea =  this.articleDetails.articleDescription != undefined ? this.articleDetails.articleDescription :this.articleDetails.textarea;
        if(this.articleDetails.textarea == ""||this.articleDetails.textarea==null||this.articleDetails.textarea==undefined){

        }else{
          this.articleDetails.textarea = this.articleDetails.textarea.replace(/&nbsp;/ig, "")
        }
        this.articleDetails.radio = this.articleDetails.articleType != undefined ? this.articleDetails.articleType:this.articleDetails.textarea;

        this.preview_article = localStorage.getItem('preview_article');
        if(this.preview_article == ""||this.preview_article==null||this.preview_article==undefined){
           
        }else{
          this.abstract = localStorage.getItem('preview_abstract').replace(/&nbsp;/ig, "");
           this.abstract = this.abstract.replace(/&/ig, "");
        }
       

       
        this.publishKind = localStorage.getItem('preview_publishKind')
        for(var i in arr){
          if(arr[i].value != ''){
             this.HotTags.push(arr[i])
          }
        }
  },
  //相关操作事件
}
</script>

<style scoped>  
.container{
 padding-top:11px;
 
}
.container1{
  display: flex;
 flex-direction: row;
}
.container_left{
  width:70%;
  min-height:652px;
}

.container_right{
  width:30%;
  margin-left:60px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.container_left .title{
  font-size:26px;

  line-height:40px;
  overflow: hidden;
}
.tif{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size:14px;
  color:#505c62;
}
.leftBox span {
  display: inline-block;
  margin: 0 2px;
}
.abstract{
  color:#b6b6b6;
  line-height: 25px;
}
.article{
  color:#7f8387;
  /*line-height: 30px;*/
  font-size:16px;
  overflow: hidden;
  /*min-height:472px;*/
}
/* .article h1{
  line-height: 38px;
} */
.article p,.article h1{
  width:100%;
   display: block;
  font-family: -moz-fixed;
  white-space: pre!important;
  margin: 1em 0;
  overflow:hidden;
  word-wrap: break-word;
}
.article img{
  width:100%;
  height:auto!important;
}
.qunwen{
  color:#1d87ff;
}
.artFooter{
  height:80px;
  background: #efefef;
  margin-top: 40px;
  line-height: 30px;
  padding-left: 20px;
  padding-top: 20px;
  color:#999999;
}
.tags span {
  display: inline-block;
  margin-right: 10px; 
  padding:0 10px;
  height:30px;
  font-size:14px;
  color:#999;
  line-height:30px;
  text-align: center;
  border:1px solid #999;
  border-radius: 15px;
}
.topbox{
  height:auto;
  border:1px solid #c8ced1;
  position: relative;
  margin-top:60px; 
  background: #fff;

}
.usename{
  width:180px;
  height:76px;
  line-height:76px;
  margin-top:-40px;
  margin-left:20px;
  background: #fff;
  z-index: 200;
}
.usename img{
  width:76px;
  height:76px;
  border-radius: 38px; 
  float: left;
  margin-right:10px;
}
.usename span {
  display: inline-block;
  text-align: center;
 
}
.rn{
  /*height:50px;*/
  text-align: center;
  line-height:30px;
  margin-left:60px; 
  /*margin-top: 23px;*/
}

.rn span {
  display: inline-block;
  
  height:22px;
  line-height:22px;
  border:1px solid #1d87ff;
  border-radius: 4px;
  padding: 2px 20px; 
  font-size:14px;
  background: #1d87ff;
  color:#fff;
}
.toptext{
  padding:0px 20px;
  margin:10px 0px;
  font-size:14px;
  color:#999;
}
.userdata{
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  text-align: center;
}
.userdata p {
  font-size:14px;
}
.ar{
  /*position: absolute;*/
  margin:10px 10px 10px 20px;
}
.ar p  {
  font-size:16px;
  margin-bottom:7px;
}
.ar li {
   font-size:14px;
   margin:0px 10px 10px 0px;
}
.ar li p{
  display: flex;
  flex-direction: row;
  margin-bottom:10px;
}
.ar li span{
  font-size:13px;
}
.ar .flexR{
  justify-content: space-between;
}
.num{
  float: right;
}
.share{
  width:100%;
  height:50px;
  line-height: 50px;
  margin-top:50px;
}
.share .fl img{
  display: inline-block;
  width:50px;
  height:50px;
  border-radius: 50%;
  margin-right:10px;
}
.share .fl span{
}
.next_last_article{
  border:1px solid #ccc;
  margin-bottom:83px;
  padding:10px;
}
.next_last_article p{
  color:#ccc;
}
.next_last_article a{
}
.font30{
  font-size:30px;
  margin-right:10px;
}

.icon-iconfonticonfontweibo{
  color:#f00;
}
.icon-wechat{
  color:#2eb106;
}


.article_award{
  width:100%;
  justify-content: center;
  margin:20px 0px;
}
.article_award span{
  color:#999;
  margin:0 auto;
}
.article_award .ico{
  display: inline-block;
  width:100px;
  height:100px;
  background:#f60;
  border-radius: 50%;
  color:#000;
  font-size:20px;
  line-height: 100px;
  text-align: center;
  margin-bottom:10px;
}
.previewMask{
  width:100%;
  height:150px;
  background:transparent;
  position: absolute;
  z-index: 999;
  top:0px;
}
</style>
<style>
/*   .article pre,.article p{
  font-family: '微软雅黑',"苹方","华文黑体","Helvetica Neue", "Ubuntu", "Hiragino Sans", "WenQuanYi Micro Hei";
  color:#000;
} */

  .article h1{
    /*line-height: 38px;*/
  }
</style>