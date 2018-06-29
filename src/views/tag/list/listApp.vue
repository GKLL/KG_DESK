<template>
	<div id="app" :style = "height">
    <hb-head></hb-head>
    <div class = 'container flexR'>
      <div class = 'container_left'>
               <div class="breadcrumb"> 
                 <p class = 'font16'>{{tag_name}}</p>
                 <p class = 'font12 colorb2b2'>千氪财经为您提供（{{tag_name}}）相关文章</p>
               </div>
        <div class="newList" v-if = "showList">
            <article-list :articles = "listData" />
        </div>
        <div class = 'upload_more' v-if = "loadmorebtn">
            <el-button @click = "LoadMore" :loading = "moreLoading" class = 'loadingMore'>浏览更多</el-button>
        </div>
      </div>

      <div class = 'container_right'>
            <div class="rightImg" v-if = "posImg[0] != undefined">
              <right-img :rightImg ="posImg[0]" />
            </div>
            <div>
              <TopRank ></TopRank>
            </div>
      </div>
    </div>
    <other-footer />
                         <div v-if = "loadingShow" class = 'loadingGif'>
            <img src = '../../../assets/img/kg.gif'/>
        </div>
            <to-top />
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
import ArticleList from 'components/ArticleList';
import TopRank from 'components/TopRank';
import HotImg from 'components/HotImg';
import RightImg from 'components/RightImg';
import ToTop from 'components/ToTop';
export default {
  data() {
    return {
      loadingShow:true,
      height:{
        height:document.body.clientHeight + 'px'
      },
      listData:[{}],
      hot_articles:[{}],
      topList:[{}],
      right_hot:{},
      page:1,
      loadmorebtn:false,
      moreLoading:false,
      posImg:[{}],
      tag_name:"",
      showList:true,
    }
  },
  components: {HbHead,OtherFooter,ArticleList,TopRank,HotImg,RightImg,ToTop},
  //已成功挂载，相当ready()
  mounted(){
        const that = this;
        var params = Lib.M.getUrlVars(); 
        this.tag_name = decodeURI(params); 
        const list = Lib.M.dataRequest({
              "articleTagnames":this.tag_name,
              "currentPage":this.page,
        })
        let indexTitle = document.getElementsByTagName('title')[0];
        indexTitle.innerHTML = this.tag_name;
        this.showList = false;
          Lib.M.ajax({
              'type':'post',
              'url':'article/getChannelArt',
              "data":list,
              'success':function (data){
                  if(data.code == 10000){
                    that.loadmorebtn =  data.responseBody.totalNumber <= 20 ? false : true;
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
                    that.listData = data
                    that.showList = true;
                    that.loadingShow = false;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });
          //获取推荐位图片
          const images_list = Lib.M.dataRequest({"navigator_pos":2})
          Lib.M.ajax({
                'type':'post',
                'url':'/siteimageapi/listsiteimage',
                "data":images_list,
                'success':function (data){
                  data = data.responseBody;
                  if(data.length != 0){
                    for(var i in data){
                      if(data[i].imagePos == 22){
                        that.posImg.push(data[i])
                      }
                    }
                  }
                  that.posImg.splice(0,1)
                }
          })
          
  },
  //相关操作事件
  methods: {
    LoadMore(){
      this.page +=1;
        const list = Lib.M.dataRequest({
                      "articleTagnames":this.tag_name,
                      "currentPage":this.page,
        })
      //加载更多文章
     Lib.M.loadMore('article/getChannelArt',list,this.listData,this)     
    },
  }
}
</script>

<style scoped>
.container{
  padding-top:11px;
}

.container_left{
    width:70%;
}
.container_right{
 margin-left: 20px;
 display: flex;
  flex-direction: column;
  width:30%;
  min-height:700px;
  margin-top:15px;
}
.rightImg{
   position: relative;
  /*margin-top:85px;*/
  padding:20px 0 20px 0px;
}
.breadcrumb{
  font-size:16px!important;
}
.newList{
  
}

.rightImg img {
  width:300px!important;
  height:100%;

}
.listItem a {
  font-size:16px;
  color:#1d87ff;

}
.listItem {
   padding: 20px 0;
   border-bottom: 1px solid #f0f2f7
}
.listItem .word{
  height:60px;
  line-height:30px;
  font-size:14px;
  color:#666666;
  margin-top: 20px;
}
.itemFooter{
  font-size:14px;
  margin-top:20px; 
}
/*图片推荐位*/
.hot_imgs{
  width:98%;
  display: flex;
  flex-direction: column;
}
</style>
