<template>
	<div id="app" :style = "height">
    <hb-head ></hb-head>
    <div class = 'container flexR' >
      <div class = 'container_left'>
        <div   >
               <div class="breadcrumb"> 
                 <p class = 'font16'>{{kg_columnName}}</p>
                 <p class = 'font12 colorb2b2'>千氪财经为您提供（{{kg_columnName}}）相关文章</p>
               </div>
                <div class="newList"  v-if = "listData !=null">
                    <article-list :articles = "listData" />
                </div>
                <div class = 'textcenter martop15' v-if = "listData ==null">暂无栏目信息</div>
                <div class = 'upload_more' v-if = "loadmorebtn">
                    <el-button @click = "LoadMore" :loading = "moreLoading" class = 'loadingMore'>浏览更多</el-button>
                </div>
        </div>
      </div>
      <div class = 'container_right'>
            <div class="rightImg" v-if = "posImg[0] != undefined">
              <RightImg :rightImg ="posImg[0]" />
            </div>
            <div>
              <TopRank ></TopRank>
            </div>
      </div>
    </div>
    <other-footer  />
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
import {index_nav} from 'assets/js/header';
import JQ from "jquery";
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
      listShow:2,
      posImg:[{}],
      columnname:"",
      showList:true,
      kg_columnName:''
    }
  },
  components: {HbHead,OtherFooter,ArticleList,TopRank,HotImg,RightImg,ToTop},
  //已成功挂载，相当ready()
  mounted(){
        const that = this;
        this.showList = false;
        let indexTitle = document.getElementsByTagName('title')[0];

        var curUrlId = window.location.href.split('c=')[1];
          for(var i in index_nav){
            if(index_nav[i].list == null){
              if(index_nav[i].columnId == curUrlId){
                this.kg_columnName = index_nav[i].columnName
              }
            }else{
              let list = index_nav[i].list;
              for(var j in list){
                if(list[j].columnId == curUrlId){
                   this.kg_columnName = list[j].columnName
                }
              }
            }
          }
        // this.kg_columnName = localStorage.getItem("kg_columnName");


        const sub_column_id = Lib.M.getUrlQuery('c');
        //调取seo接口
        Lib.M.selectSeo(sub_column_id,this)
        const list = Lib.M.dataRequest({
              "columnId":sub_column_id,
              // "columnId":localStorage.getItem('sub_column_id'),
              "currentPage":this.page,
        })



        //调取栏目列表信息

          Lib.M.ajax({
              'type':'post',
              'url':'article/getChannelArt',
              "data":list,
              'success':function (data){
                  if(data.code == 10000){
                                        that.loadingShow = false;
                    if(data.responseBody.totalNumber == 0){
/*                      that.$message({
                            message: '暂无栏目信息',
                            type: 'warning'
                      });*/
                      that.listData = null

                      return
                    }


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
                    that.listData =data
                    that.showList = true
/*                    that.columnname = data[0].secondcolumnname != null ? data[0].secondcolumnname : data[0].columnname;*/

                    // indexTitle.innerHTML = data[0].columnname;
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
                      if(data[i].imagePos == 21){
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
      const that = this;
      this.page +=1;
      const sub_column_id = Lib.M.getUrlQuery('c');
        const list = Lib.M.dataRequest({
                      "columnId":sub_column_id,
                      "currentPage":this.page,
        })
      //加载更多文章
     Lib.M.loadMore('article/getChannelArt',list,this.listData,that)     
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
  margin-top:15px;
  min-height:691px;
}
.breadcrumb {
  position: relative;
  margin-top:15px;
  padding:10px;
  border-bottom: 1px solid #f0f2f7;
}
.rightImg{
   position: relative;
  /*margin-top:85px;*/
  padding:20px 0 20px 0px;
}
.breadcrumb {
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
@media only screen and (max-height: 823px){
  .container_left {
    min-height: 521px;
  }
}
@media only screen and (max-height: 812px){
  .container_left {
    min-height: 529px;
  }
}
@media only screen and (max-height: 736){
  .container_left {
    min-height: 434px;
  }
}
@media only screen and (max-height: 667px){
  .container_left {
    min-height: 385px;
  }
}
@media only screen and (max-height: 568px){
  .container_left {
    min-height: 267px;
  }
}
</style>
