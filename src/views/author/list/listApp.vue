<template>
	<div id="app" :style = "height">
    <hb-head headfont="iconfont 字体"></hb-head>
    <div class = 'container'>
          <div class="mainBanner">
            <div class="topbanner">
              <span class = 'o-span'> 
                <p class="numName">浏览量</p>
                <p class ='font18' v-if="authorInfo.pbowsenum>9999">{{Math.floor((authorInfo.pbowsenum)/1000)/10}}<span class="el_w">w+</span></p>
                <p class ='font18' v-else>{{authorInfo.pbowsenum}}</p>
              </span>
              <span class = 'o-span'> 
                <p  class="numName">点赞数</p>
                 <p class ='font18' v-if="authorInfo.thumbupNum>9999">{{Math.floor((authorInfo.thumbupNum)/1000)/10}}<span class="el_w">w+</span></p>
                 <p class ='font18' v-else>{{authorInfo.thumbupNum}}</p>
              </span>
              <span class = 'athorAvatar'> 
                  <div class="circle">
                    <div>
                    <img v-if ="authorInfo.columnAvatar != null" class="circle2 " :src = "imgUrl + authorInfo.columnAvatar" />
                    <img v-else class="circle2 " src = "../../../assets/img/avatar.png" />

                  </div>
                  </div>
              </span>
              <span class = 'articleNum o-span'> 
                <p  class="numName">文章数</p>
                 <p class ='font18' v-if="authorInfo.artsum>9999">{{Math.floor((authorInfo.artsum)/1000)/10}}<span class="el_w">w+</span></p>
                 <p class ='font18' v-else>{{authorInfo.artsum}}</p>
              </span>
              <span  class = 'o-span'> 
                <p  class="numName">评论数</p>
                 <p class ='font18' v-if="authorInfo.comments>9999">{{Math.floor((authorInfo.comments)/1000)/10}}<span class="el_w">w+</span></p>
                 <p class ='font18' v-else>{{authorInfo.comments}}</p>
              </span>
            </div>

            <!-- <div class="atuotxt1 atuotxt">{{authorInfo.columnName}}</div> -->
            <!-- <div class="atuo ">北京|特约作者</div> -->
            <div class="atuotxt atuotxt1">{{authorInfo.columnName}}</div>
            <div class="atuotxt" v-if = "authorInfo.columnCity != null">{{authorInfo.columnCity}} | {{authorInfo.columnCounty}}</div>
            <div class="atuotxt">{{authorInfo.columnIntro == null ? '作者太忙了，还没来得及写...':authorInfo.columnIntro}}</div>
            <!-- <div class="atuotxt">北京|特约作者</div> -->
<!--             <div class="atuotxt">
    <el-button type="primary">关注</el-button><el-button>私信</el-button>
</div> -->
          </div>
          <div class = 'flexR'>
            <div class = 'container_left'>
              <article-list :articles = "listData" />
              <div class = 'upload_more' v-if = "loadmorebtn">
                  <el-button @click = "LoadMore" :loading = "moreLoading">加载更多</el-button>
              </div>
            </div>
            <div class = 'container_right'>
                <best-article class = 'martop20 pl20' :best ="authorList"/>
                <hours class = 'martop20 pl20'  />
            </div>
          </div>
    </div>
    <other-footer></other-footer>
        <to-top />
           <div v-if = "loadingShow" class = 'loadingGif'>
            <img src = '../../../assets/img/kg.gif'/>
        </div>
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
import ArticleList from 'components/ArticleList';
import TopRank from 'components/TopRank';
import HotImg from 'components/HotImg';
import BestArticle from 'components/BestArticle';
import Hours from 'components/Hours';
import ToTop from 'components/ToTop';
export default {
  data() {
    return {
      loadingShow:true,
            height:{
        height:document.body.clientHeight + 'px'
      },
      carousel_hotImg:[{}],
      authorInfo:{},
      listData:[{}],
      page:1,
      loadmorebtn:true,
      show:1,
      imgUrl:Lib.C.imgUrl,
      moreLoading:false,
      authorList:null
    }
  },
  components: {HbHead,OtherFooter,ArticleList,TopRank,HotImg,BestArticle,Hours,ToTop},
  //已成功挂载，相当ready()
  mounted(){
          //作者信息
         const that = this;
         let indexTitle = document.getElementsByTagName('title')[0];
         const author_column_id = Lib.M.getUrlQuery('id')
        const getColletct = Lib.M.dataRequest({
                      "userId":author_column_id,
        }) 
          Lib.M.ajax({
              'type':'post',
              'url':'userprofile/selectByuserprofileid',
              "data":getColletct,
              'success':function (data){
                  if(data.code == 10000){
                      data = data.responseBody.data;

                      that.authorInfo = data;
                      if(data.list != null || data.list.length != 0){
                        that.authorList = data.list;
                      }
                      indexTitle.innerHTML= data.columnName;
                      that.loadingShow = false;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });
          //作者文章列表
        const listData = Lib.M.dataRequest({
                      "createUser":author_column_id,
                      "currentPage":this.page,
                      "publishStatus":1
        }) 
          Lib.M.ajax({
              'type':'post',
              'url':'article/getuserArticleAll',
              "data":listData,
              'success':function (data){
                  if(data.code == 10000){
                    that.loadmorebtn = data.responseBody.totalNumber <= 20 ? false : true;
                    
                      data = data.responseBody.data;
                      let arr = [];
                      for(var i in data){
                          if(data[i].articleTagnames != null){
                           arr = data[i].articleTagnames.split(',');
                           arr = arr.slice(0,3)
                           data[i].articleTagnames = arr
                          }
                         const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle"+ Math.round(Math.random()*32) + ".png"
                         // const defaultImg = require("../../../assets/img/aticle"+ Math.round(Math.random()*32) + ".png")
                          if(data[i].articleImage == null || data[i].articleImage == ''){
                            data[i].defaultImage = defaultImg
                          }
                      }
                      that.listData = data;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          })
  },
  //相关操作事件
  methods: {
    LoadMore(){
      const author_column_id = Lib.M.getUrlQuery('id')
        this.page += 1;
        const listData = Lib.M.dataRequest({
                      "createUser":author_column_id,
                      "currentPage":this.page,
                      "publishStatus":1
        }) 
        Lib.M.loadMore('article/getuserArticleAll',listData,this.listData,this)
    },
  }
}
</script>

<style scoped>

.container{
 padding-top:11px;
 min-height:752px;
}
.el_w{
  font-weight: normal!important;
  font-size:18px!important;
  height:18px!important;
}
.container_left{
    width:70%;
}
.container_right{
    width:30%;
}
.numName{
  font-size:14px!important;
}
.mainBanner {
  height:290px;
  border-bottom:1px solid #f0f2f7;
}
.topbanner{
  height:122px;
  width:100%;
  background: #1d87ff;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: "微软雅黑";
}
.topbanner p{
  font-size:22px;
}
.topbanner span {
  display: inline-block;
  height:122px;
  width:17%;
  line-height:20px;
  font-size:16px;
  color:#fff;
}
.topbanner span:nth-child(3){
   width:30%;
}
.topbanner span p:nth-child(1){
  text-align: center;
  margin-top: 50px;
  color:#a8c9ff;
}
.topbanner span p:nth-child(2){
  text-align: center;
  margin-top: 14px;
}
.circle{
  display: flex;
  width:100px!important;
  height:100px!important;
  border-radius: 50px;
  background: #fff;
  margin: 70px auto 0;
  line-height: 100px!important;
}
.circle2{
  display: flex;
  width:90px!important;
  height:90px!important;
  border-radius:45px!important;
  /*background:#000;*/
  margin: 5px auto;
  margin-left:4px;
  border: 1px solid #f0f2f7;
}
.username {
   /*display: flex;*/
   
   width:100px!important;
   height:40px!important;
/*   justify-content: center;
 align-items: center; */
    text-align: center;
    color:#444;
    /*z-index: 999;*/
    line-height: 40px!important;
}
.atuo{
  display: flex;
  color:#bbbbbb;
  height:40px!important;
  justify-content: center;
  align-items: center;
  /*margin-top: 76px!important;*/
  font-size:16px;
  letter-spacing:5px;
}

.atuotxt{
  display: flex;
  font-size:16px;
  color:#444;
  /*height:40px!important;*/
  justify-content: center;
  align-items: center;
  margin-top:5px;
}
.atuotxt1{
  margin-top:55px;
}
.athorAvatar{
  /*margin-left:50px;*/
  position: absolute;
  right:0px;
  left:0px;
  margin:auto;
}
.articleNum{
  margin-left:160px;
}
.o-span{
  width:100px;
}
@media only screen and (max-width: 768px) {
  .circle{
    width:76px!important;
    height:76px!important;
  }
  .circle2{
    width:66px!important;
    height:66px!important;
  }
  .atuotxt1{
    margin-top:30px;
  }
  .articleNum{
    margin-left:0px;
  }
  .topbanner p{
    font-size:16px;
  }
  .topbanner span p:nth-child(1){
    margin-top:14px;
  }
  .topbanner span:nth-child(3){
    width:23%;
  }
}
</style>
