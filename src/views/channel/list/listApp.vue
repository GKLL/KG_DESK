<template>
	<div id="app" :style = "height">
    <hb-head navId = "4"></hb-head>
    <div class = 'container'>
      <div class = 'container_left'>
        <div class = 'carousel' >
          <el-carousel indicator-position = 'outside' v-if = 'bannerImg[0] != undefined' :interval = "7000">
            <el-carousel-item v-for="(item,key) in bannerImg" :key="key">
               <a class = 'banner_a cursorPointer' @click = "bannerLink(item)" target = "_blank"><img :src=" imgUrl+ item.imageAddress" class ='hoverImgScale' /></a>
                <div class = 'carousel_mask' v-if = 'item.imageType == 1'>
                    {{item.articleTitle}}
                </div>
            </el-carousel-item>
          </el-carousel>
          <img v-else src = "../../../assets/img/banner.png" class = 'defaultBanner'/>
        </div>
        <div class = 'carousel_hotImgs' v-if = 'bannerBtmImg[0] != undefined '>
              <div class = 'carousel_hotImg' v-for="item in bannerBtmImg">
               <div class = 'carousel_hotImg_container' v-if = "item.imageType == 1">
                  <img class = 'cursorPointer hoverImgScale' :src="imgUrl + item.imageAddress" @click = "bannerLink(item)"/>
                  <div class = 'carousel_hotImg_mask' v-if = "item.imageType == 1? true : false">
                      <span class = 'omit2'>{{item.articleTitle}}</span>
                  </div>
                </div>
                <div class = 'carousel_hotImg_container' v-else-if = "item.imageType == 2">
                  <img class = 'cursorPointer hoverImgScale' :src="imgUrl + item.imageAddress" @click = "bannerLink(item)"/>
                  <span class = 'adver_tag'>广告</span>
                </div>
                <div class = 'carousel_hotImg_container' v-else-if = "item.imageType == 3">
                  <img class = 'cursorPointer hoverImgScale' :src="imgUrl + item.imageAddress" @click = "bannerLink(item)"/>
                </div>
              </div>

        </div>

        <!-- 热门文章         -->
        <div v-if = "hot_show == 1">
            <div class = 'hot_articles_container' v-if = "hot_articles_one[0].articleId != undefined">
              <h2 class = 'fontbold color666'>热门文章</h2>
              <div class = 'line martop15'></div>
              <article-list :articles = "hot_articles_one"/>
            </div>
            <div class = 'hot_imgs'>
                <div v-for = "item in article1Img" v-if = "article1Img[0] != undefined">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType == 1 ? true :false" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else class = 'martop10'/>
                  <div class = 'line martop10'></div>
                </div>
            </div>
            <div class = 'hot_articles_container_two'   v-if = "hot_articles_two[0].articleId != undefined">
              <article-list :articles = "hot_articles_two"/>
            </div>
            <div class = 'hot_imgs_two martop10' >
                <div  v-if ="article2Img[0] !=undefined" v-for = "item in article2Img">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType == 1 ? true :false" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else class = 'martop10'/>
                  <div class = 'line martop10'></div>
                </div>
            </div>
            <div  class = 'hot_articles_container_three' v-if = "hot_articles_three[0].articleId != undefined">
              <article-list :articles = "hot_articles_three" />
            </div>
            <div class = 'hot_imgs_two martop10'  >
                <div  v-if ="article3Img[0] !=undefined" v-for = "item in article3Img">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType == 1 ? true :false" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else class = 'martop10'/>
                  <div class = 'line martop10'></div>
                </div>
            </div>
            <div  class = 'hot_articles_container_more'  v-if = "hot_articles_more[0].articleId != undefined">
              <article-list :articles = "hot_articles_more" />
            </div>
            <div class = 'upload_more' v-if = "loadmorebtn">
              <el-button @click = "LoadMore" :loading = "moreLoading" class = 'loadingMore'>浏览更多</el-button>
            </div>
        </div>
      </div>
      <div class = 'container_right'>
        <right-img :rightImg ="topImg[0]" :item = "topImg[0]" v-if = "topImg[0] != undefined"/>
        <hot-info class = 'martop20' />
        <bottom-img :item = "bottomImg[0]" v-if = "bottomImg[0] !=undefined"/>
        <hot-author  class = 'martop10' />
        <hot-tag class = 'martop20' />
       <about-us />
      </div>
    </div>
    <hb-footer></hb-footer>
        <to-top />
               <div v-if = "loadingShow" class = 'loadingGif'>
            <img src = '../../../assets/img/kg.gif'/>
        </div>
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import HbFooter from 'components/HbFooter';
import ArticleList from 'components/ArticleList';
import AdverTag from 'components/AdverTag';
import HotImg from 'components/HotImg';
import Hours from 'components/Hours';
import RightImg from 'components/RightImg';
import HotInfo from 'components/HotInfo';
import HotTag from 'components/HotTag';
import AboutUs from 'components/AboutUs';
import HotAuthor from 'components/HotAuthor';
import ToTop from 'components/ToTop';

import BottomImg from 'components/BottomImg'
export default {
  components: {BottomImg,HbHead,ArticleList,AdverTag,HotImg,Hours,RightImg,HotInfo,HotTag,HbFooter,AboutUs,HotAuthor,ToTop},
  data() {
    return {
      loadingShow:true,
    	height:{
    		height:document.body.clientHeight + 'px'
    	},

      ifshow:true,
      nowindex:0,
      imgArray:['https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg',"https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=eff080687bcf3bc7fc0dc5beb069d1c4/80cb39dbb6fd526658ef4071a018972bd507368a.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510922180493&di=74e0a9b7f8bd5039d973784abe033acc&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201504%2F25%2F20150425H2215_aYsFA.jpeg"],
    	user:"",
    	password:"",
      activeIndex: '1',
      activeIndex2: '1',
      carousel_mask:true,
      carousel_hotImg_mask:true,
      carousel_title:'如何评价微信小程序',
            bannerImg:[{}],
      bannerBtmImg:[{}],
      carousel_hotImgs:1,
      carousel_hotImg:[{}],
      right_hot:{"img":'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg',"title":'如何评价微信小程序如何评价微信小如何评价微信小程序如何评价微信小'},
      tags:[{}],
      hot_articles_one:[{}],
      hot_articles_two:[{}],
      hot_articles_three:[{}],
      hot_articles_more:[{}],
      hot_show:2,
      currentPage:1,
      loadmorebtn:false,
      moreLoading:false,
      imgUrl:Lib.C.imgUrl,
      articleImg:[{}],
      article1Img:[{}],
      article2Img:[{}],
      article3Img:[{}],
      topImg:[{}],
      bottomImg:[{}],
    }
  },
  //已成功挂载，相当ready()
  mounted(){
      const that = this;
      const column_id =  Lib.M.getUrlQuery('channel_column_id');
        //调取seo接口
        Lib.M.selectSeo(column_id,this)
      //热门文章
        const hot_articles_list = Lib.M.dataRequest({
                "currentPage":1,"columnId":column_id
        }) 
      Lib.M.ajax({
            'type':'post',
            'url':'/article/getChannelArt',
            "data":hot_articles_list,
            'success':function (data){
              that.loadmorebtn =  data.responseBody.totalNumber <= 20 ? false : true;
                                that.loadingShow = false;
              data = data.responseBody;
              that.hot_articles = data.data;
              that.hot_show = data.totalNumber == 0 ? 2: 1
              for(var i in data.data){
                if(data.data[i].articleTagnames != null){
                 arr = data.data[i].articleTagnames.split(',');
                 arr = arr.slice(0,3)
                 data.data[i].articleTagnames = arr
                }
                const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle"+ Math.round(Math.random()*32) + ".png"
                // const defaultImg = require("../../../assets/img/aticle"+ Math.round(Math.random()*32) + ".png")
                if(data.data[i].articleImage == null || data.data[i].articleImage == ''){
                  data.data[i].defaultImage = defaultImg
                }
              }
              if(data.totalNumber >=0){
                that.hot_articles_one = data.data.slice(0,4)
              }
              if(data.totalNumber >4){
                that.hot_articles_two = data.data.slice(4,13)
              }
              if(data.totalNumber >14){
                that.hot_articles_three = data.data.slice(13,18)
              }
              if(data.totalNumber >18){
                that.hot_articles_more = data.data.slice(18,20)
              }
        }
      });
      //频道banner
        const images_list = Lib.M.dataRequest({
                "navigator_pos":3
        }) 
        Lib.M.ajax({
            'type':'post',
            'url':'/siteimageapi/listsiteimage',
            "data":images_list,
            'success':function (data){
              data = data.responseBody;
              if(data.length != 0){
                for(var i in data){
                  switch(data[i].imagePos){
                    case 31:
                     that.bannerImg.push(data[i])
                    break;
                    case 32:
                     that.bannerBtmImg.push(data[i])
                    break;
                    case 33:
                    that.articleImg.push(data[i])
                    break;
                    case 34:
                    that.topImg.push(data[i])
                    break; 
                    case 35:
                    that.bottomImg.push(data[i])
                    break;
                    default:

                  }
                }  
              }
                  that.bannerImg.splice(0,1)
                  that.bannerBtmImg.splice(0,1)
                  that.articleImg.splice(0,1)
                  that.topImg.splice(0,1)
                  that.bottomImg.splice(0,1)

                  that.bannerImg = that.bannerImg.splice(0,5)
                  that.bannerBtmImg=that.bannerBtmImg.splice(0,3)
                  that.article1Img = that.articleImg.slice(0,3)
                  that.article2Img = that.articleImg.slice(3,6)
                  that.article3Img = that.articleImg.slice(6,9)

            }
          }) 
  },
  //相关操作事件
  methods: {
    LoadMore(){
      this.currentPage +=1;
      const list = Lib.M.dataRequest({
               "currentPage":this.currentPage
        })
      Lib.M.loadMore('/article/getChannelArt',list,this.hot_articles_more,this)
    },
   bannerLink(item){
          if(item.imageType == 1){
            item.articleId = item.imageDetail
            // window.open(item.imageDetail)
            Lib.M.goDetail(item)
          }else{
            window.open(item.imageDetail)
          }
    }, 
  },
}
</script>

<style scoped>
img{
  border:1px solid #f0f2f7!important;
  border-radius: 4px!important;
}
body{
  font-family: "微软雅黑";
}
.container{
  padding-top:11px;
  display: flex;
  flex-direction: row;
}
.container_left{
  width:70%;
}
.container_right{
  width:30%;
  margin-left:30px;
  display: flex;
  flex-direction: column;
}
/*轮播图*/
.carousel{
  position: relative;
}
.el-carousel__indicators{
  z-index: 200;
}
.el-carousel{
  border-radius: 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*遮罩层*/
.carousel_mask,.carousel_hotImg_mask{
  position: absolute;
  z-index: 100;
  bottom:0px;
  width:100%;
  height:55px;
  line-height: 55px;
  background:rgba(0,0,0,0.7);
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: "微软雅黑";

}
/*轮播推荐位*/
.carousel_hotImgs{
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  overflow: hidden;
  margin-top:10px;

}
.carousel_hotImg{
  width:32%;
  height:150px;
  position: relative;
  border-radius: 5px;
    margin-right:10px;
}
.carousel_hotImgs .carousel_hotImg:last-child{
  margin-right:0px!important;
}
.carousel_hotImg img{
  display: inline-block;
  width:100%;
  height:100%;
  border:none;
  border-radius: 5px;
}
.carousel_hotImg_mask{
  bottom:0px;
  height:55px;
}
/*   .carousel_hotImg_container{
  position: relative;
  height:148px;
}
.carousel_hotImg_mask span{
  height: 30px;
  line-height: 19px;
  font-size: 14px;
  text-align: left;
  padding: 10px 9px;
} */
/*热门文章*/
.hot_articles_container,.hot_articles_container_two,.hot_articles_container_three{
  width:98%;
  /*height:970px;*/
  overflow: hidden;
}
.hot_articles_container{
  margin-top:15px;
}
.hot_articles_container_two{
  /*height:1100px;*/
}
.hot_articles_container_three{
  height:auto;
}
.hot_articles_container h2{
  font-weight: bold;
}

/*图片推荐位*/
.hot_imgs,.hot_imgs_two{
  width:100%;
  display: flex;
  flex-direction: column;
}
/*加载更多*/
.upload_more{
  width:98%;
}
.upload_more button{
  margin:5%;
  margin-left:44.5%;
}

/*热门作者*/
.hot_author .title{
  width:100%;
  height:26px;
  line-height: 26px;
}
.hot_author .title div:nth-child(1){
    display: flex;
  flex-direction: row;
}


  .banner_a img{
      height:100%;
      width:100%;
  }

</style>
