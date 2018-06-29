<template>
	<div id="app" :style = "height" >
    <hb-head ></hb-head>
            <!-- pc端广告 -->
      <div class="marketAdvImgwrap">  
        <div class="marketAdvImg" v-if="marketImg.length == 4">
          <div  v-for="(item,key) in marketImg" :key="key" @click="toAdv(item)">
            <img class="cursorPointer hoverImgScale" :src="imgUrl+item.imageAddress" />
            <span class="poab adv" v-if="item.imageType == 2">广告</span>
            <span class="poab news" v-if="item.imageType == 1">{{item.articleTitle}}</span>
          </div>
        </div>
      </div>    
    <div class = 'container'>
      <div class = 'container_left' v-if = 'bannerShow'>
        <div class = 'carousel' >
          <el-carousel indicator-position = 'outside' v-if = 'bannerImg[0] != undefined' :interval = "7000">
            <el-carousel-item v-for="(item,key) in bannerImg" :key="key">
               <a class = 'banner_a cursorPointer' @click = "bannerLink(item)" ><img :src=" imgUrl+ item.imageAddress" class = 'hoverImgScale'/></a>
                <div class = 'carousel_mask' v-if = 'item.imageType == 1' @click = "bannerLink(item)">
                    {{item.articleTitle}}
                </div>
            </el-carousel-item>
          </el-carousel>
          <img  v-else src = "../../../assets/img/banner.png" class = 'defaultBanner hoverImgScale cursorPointer'/>

        </div>

        <div class = 'carousel_hotImgs' id = 'bannerBtmImg' v-if = 'bannerBtmImg[0] != undefined '>

              <div class = 'carousel_hotImg' v-for="(item,key) in bannerBtmImg" :key="key">
                <div class = 'carousel_hotImg_container' v-if = "item.imageType == 1">
                  <img class = 'cursorPointer hoverImgScale' :src="imgUrl + item.imageAddress" @click = "bannerLink(item)"/>
                  <div class = 'carousel_hotImg_mask' v-if = "item.imageType == 1? true : false">
                      <span class = 'omit2' @click = "bannerLink(item)">{{item.articleTitle}}</span>
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
        <div v-if = "hot_show == 1">
            <div class = 'hot_articles_container'>
              <h2 class = 'color666'>热门文章</h2>
              <div class = 'line martop15'></div>
              <article-list :articles = "hot_articles_one"/>
            </div>
            <div class = 'hot_imgs'>
                <div v-if ="article1Img[0].imageAddress !=undefined" v-for = "(item,key) in article1Img" :key = "key">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType != 2" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else />
                  <div class = 'line martop10'></div>
                </div>
            </div>
            <div class = 'hot_articles_container_two'>
              <article-list :articles = "hot_articles_two"/>
            </div>
            <div class = 'hot_imgs_two martop10'>
                <div v-if ="article2Img[0].imageAddress !=undefined" v-for = "(item,key) in article2Img" :key = "key">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType == 1" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else />
                  <div class = 'line martop10'></div>
                </div>
            </div>
            <div  class = 'hot_articles_container_three'>
              <article-list :articles = "hot_articles_three" />
            </div>
            <div class = 'hot_imgs_two martop10'>
                <div v-if ="article3Img[0].imageAddress !=undefined" v-for = "(item,key) in article3Img" :key = "key">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType == 1" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else />
                  <div class = 'line martop10'></div>
                </div>
            </div>
            <div  class = 'hot_articles_container_more' v-if = "hot_articles_more[0] != undefined">
              <article-list :articles = "hot_articles_more" />
            </div>
            <div class = 'upload_more' v-if = "loadmorebtn">
              <el-button class = 'loadingMore' @click = "LoadMore" :loading = "moreLoading">浏览更多</el-button>
            </div>
        </div>
 
      </div>
      <div class = 'container_right'>
        <hours />
        <right-img  :rightImg ="topImg[0]" :item = "topImg[0]" v-if = "topImg[0] != undefined"/>
        <top-rank class = 'martop10' />
        <hot-author  class = 'martop10' />
        <div class = 'right_hot_img ' :key = "key" v-for = "(item,key) in bottomImg" v-if = "bottomImg[0].imageAddress !=undefined">
                  <bottom-img   :imgSrc = "imgUrl + item.imageAddress" :item = "item" />
                  <!-- <bottom-tag  :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else /> -->
        </div>
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
import ArticleList from 'components/ArticleList';
import AdverTag from 'components/AdverTag';
import HotImg from 'components/HotImg';
import BottomImg from 'components/BottomImg';
import BottomTag from 'components/BottomTag';
import Hours from 'components/Hours';
import RightImg from 'components/RightImg';
import TopRank from 'components/TopRank';
import HotAuthor from 'components/HotAuthor';
import AboutUs from 'components/AboutUs';
import HbFooter from 'components/HbFooter';
import ToTop from 'components/ToTop';
export default {
  components: {HbHead,ArticleList,AdverTag,HotImg,Hours,RightImg,TopRank,HotAuthor,AboutUs,HbFooter,ToTop,BottomImg,BottomTag},
  data() {
    return {
    	height:{
    		height:document.body.clientHeight + 'px'
    	},
      ifshow:true,
    	user:"",
    	password:"",
      activeIndex: '1',
      activeIndex2: '1',
      carousel_mask:true,
      carousel_hotImg_mask:true,
      bannerImg:[{}],
      bannerBtmImg:[{}],
      carousel_hotImg:[{}],
      hot_articles:[{}],
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
      marketImg: [], // pc端 广告图 imageType1资讯 2广告 3 其他
      bannerShow:true,
      loadingShow:true,
    }
  },
  //已成功挂载，相当ready()
  mounted(){

      Lib.M.loseToken()
      let indexTitle = document.getElementsByTagName('title')[0];
      indexTitle.innerHTML = '千氪财经(kg.com)-区块链SAAS服务平台,金融财经综合门户';
      const that = this;
      //热门文章
      const hot_articles_list = Lib.M.dataRequest({"currentPage":1})
      Lib.M.ajax({
            'type':'post',
            'url':'/article/selectArticleAll/',
            "data":hot_articles_list,
            'success':function (data){
              that.loadingShow = false;
              that.loadmorebtn =  data.responseBody.totalNumber <= 20 ? false : true;
              data = data.responseBody;
              let arr = [];
              for(var i in data.data){
                const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle"+ Math.round(Math.random()*32) + ".png"
                // const defaultImg = require("../../../assets/img/aticle"+ Math.round(Math.random()*32) + ".png")
                if(data.data[i].articleTagnames != null){
                 arr = data.data[i].articleTagnames.split(',');
                 arr = arr.slice(0,3)
                 data.data[i].articleTagnames = arr
                }
                if(data.data[i].articleImage == null || data.data[i].articleImage == ''){
                  data.data[i].defaultImage = defaultImg
                }
              }
              that.hot_articles = data.data;
              that.hot_show = data.totalNumber == 0 ? 2: 1
              
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
      //首页推荐位
      const images_list = Lib.M.dataRequest({"navigator_pos":1})
      this.bannerShow = false;
      Lib.M.ajax({
            'type':'post',
            'url':'/siteimageapi/listsiteimage',
            "data":images_list,
            'success':function (data){
              data = data.responseBody;
              if(data.length != 0){
                for(var i in data){
                  switch(data[i].imagePos){
                    case 11:
                     that.bannerImg.push(data[i])
                    break;
                    case 12:
                     that.bannerBtmImg.push(data[i])
                    break;
                    case 13:
                    that.articleImg.push(data[i])
                    break;
                    case 14:
                    that.topImg.push(data[i])
                    break; 
                    case 15:
                    that.bottomImg.push(data[i])
                    break;
                    case 16:
                    that.marketImg.push(data[i])
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
              that.bannerShow = true;
              if (that.marketImg.length >=4) {that.marketImg = that.marketImg.splice(0, 4);}
            }

      })

  },
  //相关操作事件
  methods: {
    toAdv(item) { // 点广告跳
      if(item.imageType == 1){
            item.articleId = item.imageDetail
            // window.open(item.imageDetail)
            Lib.M.goDetail(item)
          }else{
            window.open(item.imageDetail)
          }
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
    LoadMore(){
      this.currentPage +=1;
      const hot_articles_list = Lib.M.dataRequest({"currentPage":this.currentPage})
      var that = this;
      //加载更多文章
      Lib.M.loadMore('/article/selectArticleAll/',hot_articles_list,that.hot_articles_more,that)      
    },
        
  },
}
</script>

<style scoped>

.container{
  padding-top:24px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}

/*轮播图*/
.carousel{
  position: relative;
  overflow: hidden;
}
.defaultBanner{
  display: block;
  width:100%;
  height:230px;
}
.el-carousel__indicators{
  z-index: 200;
}
.el-carousel{
  border-radius: 5px;
}
.el-carousel__item{
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
  cursor: pointer;
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
  /*height:148px;*/
  position: relative;
  border-radius: 5px;
    /*margin-right:10px;*/
}
.carousel_hotImg:nth-child(2n){
  margin:0px 15px!important;
}

.carousel_hotImg img{
  display: inline-block;
  width:100%;
  border:none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.carousel_hotImg_mask{
  bottom:0px;
  height:55px;
}

/*热门文章*/
.hot_articles_container,
.hot_articles_container_two,
.hot_articles_container_three,
.hot_articles_container_more{
  width:98%;
  height:auto;
  overflow: hidden;
}
.hot_articles_container{
  margin-top:15px;
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
.right_hot_img{
  width:100%;
  display: inline-block;
  height:90px;
  margin-bottom:20px;
}
.banner_a img{
      /*height:300px;*/
      width:100%;
     /* height:100%;*/
}
img{
  /*border:1px solid #f0f2f7!important;*/
  border-radius: 4px!important;
}
@media only screen and (max-width:768px){
  .carousel{margin-top: 11px;}
  .marketAdvImg{display: none;}
 /* .container{
    width:740px!important;
  }*/

}
@media only screen and (max-width:700px){
  .container{
    padding-top:0px;
  }

}
@media only screen and (max-width:414px){
 /* .container{
    width:370px!important;
  }*/
  .el-carousel__container{
      height: 113px!important;
  }
  .container{
    /*width:370px!important;*/
  }
}
@media only screen and (max-width:375px){
 /* .container{
    width:340px!important;
  }*/
  .el-carousel__container{
      height: 113px!important;
  }
}
@media only screen and (max-width:320px){
 /* .container{
    width:290px!important;
  }*/
}
</style>
<style>
  .container_left{
    width:750px;
  }
  .container_right{
    width:30%;
    margin-left:30px;
    display: flex;
    flex-direction: column;
  }
  /*.carousel_hotImg_container{
    height:100%!important;
  }*/

</style>
<style lang="less" scoped>
// 顶部广告
  .marketAdvImgwrap{
    width: 58%;
    margin: 0 auto;
  }
@media only screen and (max-width: 1750px){
  .marketAdvImgwrap{
    width: 80%;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1650px) {
  .marketAdvImgwrap{
    width: 70%;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1440px){
  .marketAdvImgwrap{
    width: 75%;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1350px){
  .marketAdvImgwrap{
    width: 85%;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1250px){
  .marketAdvImgwrap{
    width: 90%;
    margin: 0 auto;
  }
}
.marketAdvImg {
  padding-top: 11px;
  width: 100%;
  div{
    display: inline-flex;
    justify-content: space-between;
    margin-right:10px;position: relative;
    width:24.18%;
    height:80px;
    overflow: hidden;
  .poab{position: absolute;}
    .adv{
      display: inline-block;
      width: 45px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      background: rgba(0,0,0,0.7);
      top: 0px;
      right: 0px;
      color: #fff;
      border-radius: 5px;
    }
    .news {
      height: 30px;
      left: 0;
      line-height: 30px;
      font-size: 14px;
      text-align: left;
      width: 257px;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      color: #fff;
      padding-left: 10px;
      border-radius: 4px;
    }
  &:last-child{margin-right: 0;}
    img {width:100%;height:80px;
    }
  }
}
</style>

