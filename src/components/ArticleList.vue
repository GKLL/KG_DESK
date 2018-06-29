<template>
  <div>
    <div v-for = "item in articles">
      <div class = 'hot_article'>
          <div class = 'articleImgContainer'>
             <img v-if = "item.articleImage != null && item.articleImage != ''" :src="item.articlefrom == 1 ? imgUrl + item.articleImage : item.articleImage"  class = 'cursorPointer hoverImgScale' @click = "toDetail(item)" />
            <img v-else :src='item.defaultImage'  class = 'cursorPointer hoverImgScale' @click = "toDetail(item)" />
          </div>
          <div class = 'hot_article_character'>
              <a class = 'omit2 cursorPointer article_tit bolderTitle h2'  @click = "toDetail(item)">{{item.articleTitle}}</a>
              <p class = 'omit3 font14 cursorPointer'  @click = "toDetail(item)">{{item.articleDescription}}</p>
              <div class = 'hot_article_bottom'>
                <div class = 'authorInfo'>
                  <span class = 'cursorPointer omit1 article_tit username' @click = "toAuthor(item)">{{item.username != null ? item.username : '匿名'}}</span>
                  <span class = 'marlr2'>·</span>
                  <span class = 'timer'>{{item.updateDate}}</span>
                  <span class = 'moblietimer' v-if = "item.updateDate != undefined">{{item.updateDate.slice(0,10)}}</span>
                </div>
                <div class = 'center'>
                  <span class = 'icon iconfont icon-bookmark-remove fl' v-if = 'item.articleTagnames != null'></span>
                  <!-- <span class = 'cursorPointer article_tit' @click = "toColumn(item)">{{item.secondcolumnname == null ? item.columnname : item.secondcolumnname}}</span> -->
                  <!-- <span class = 'marlr2' v-if = "item.articleTagnames != null">·</span> -->
                  <span class = 'tagsName cursorPointer article_tit' @click = "toTag(tag)" v-for = "tag in item.articleTagnames" >
                        <span v-if = "tag.length < 8" class = 'short'> {{tag}}</span>
                        <span v-else class = 'long'> {{tag}}</span>
                  </span>          
                </div>
                <div class = 'right'>
                  <span>浏览{{item.browseNum}}</span>
<!--                   <span>评论{{item.comments}}</span>
          <span class = 'marlr2'>·</span>           
          <span>收藏{{item.collect}}</span>    -->          
                  <!-- <span>{{item.shou}}<i class = 'icon iconfont icon-shoucang'></i></span>              -->
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      visible:true,
      imgUrl:Lib.C.imgUrl,
      roundNum:'',
      imgAssets:false,
    }
  },
  components: {},
  props: {
  	articles: {}
  },
  //已成功挂载，相当ready()
  //相关操作事件
  methods: {
    getRoundNum(){
      return Math.round(Math.random()*32)
    },
    toDetail(item){
        Lib.M.goDetail(item)
    },
    toAuthor(item){
       Lib.M.goAuthor(item)
    },
    toSearch(item){
      Lib.M.goSearch(item)
    },
    toColumn(item){
      Lib.M.goSubColumn(item)
    },
    toTag(item){
      Lib.M.goTag(item)
    },
  }
}
</script>

<style scoped>
.bolderTitle{
  font-weight: bold!important;
}
img{
  border:1px solid #f0f2f7!important;
  border-radius: 4px!important;
}
.authorInfo{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.omit1{
  /*width:50px;*/
}
.hot_article{
  width:100%;
  height:142px;
  padding:18px 0px;
  display: flex;
  flex-direction: row;
  border-bottom:1px solid #f0f2f7;
}
.articleImgContainer{
  width:220px;
  height:142px;
  overflow: hidden;
  margin-right:20px;
      border: 1px solid #f0f2f7;
  border-radius: 4px;
  display: flex;
}
.hot_article img{
  display: inline-block;
  width:100%;
 /* height:100%;*/
  /*margin-right:20px;*/
  border:0px!important;

  /*position: absolute;
  clip: rect(0px,250px,200px,50px);*/
  vertical-align: middle!important;
   /*transition: all 0.6s; */
}
.hot_article_character{
  display: flex;
  flex-direction: column;
  position: relative;
  width:65%;
}
.hot_article_character .h2{
  color:#666!important;
  line-height: 25px;
  width:100%;
  /*height:50px;*/
  font-weight: 100;
  font-size:18px;
  max-height:50px;
  overflow-y: hidden;
}

.hot_article_character .h2:hover{
  color:#1d87ff!important;
  }
.hot_article_character p{
  margin-top:10px;
  line-height:20px;
  color:#959595;
  width:100%;
  height:58px;
  max-height:58px;
  overflow-y: hidden;
  /*height:46px;*/
}

.hot_article_bottom{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color:#959595;
  /*margin-top:30px;*/
  position: absolute;
  bottom:-5px;
  width:100%;
  font-size: 12px;
}
.hot_article_bottom .center{
  margin-top:-1px;
}
.icon-shoucang1{
  color:#f60;
}
.tagsName{
  /*display: inline-block;*/
  width:145px;
    /*display: inline-block;*/
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
/*   overflow: hidden;  
text-overflow: ellipsis;  
word-break: break-all;  */

}

.tagsName .long{
    display: inline-block;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    margin-top: 1px;
    margin-left: 5px;
}
.tagsName .short{
  float:left;
  margin-top:2px;
  margin-right:3px;
}
.moblietimer{
  display: none;
}
.timer{
  display: block;
}
.username{
  max-width:72px;
}
@media only screen and (max-width:700px){
  .hot_article{
    height:132px;
  }
  .hot_article img{
/*     width:120px;
height:85px; */
  }
.hot_article_character .h2{
    font-size:14px;
    height:auto;
    line-height: 18px;
    max-height:36px;
    overflow-y: hidden;
  }

  .hot_article_bottom div:nth-child(2),.hot_article_bottom div:nth-child(3){
    display: none
  }

   .hot_article_character p{
    font-size:12px;
    -webkit-line-clamp: 2;
    margin-top:2px;
    height:auto;
    max-height:38px;
    overflow-y: hidden;
  }


  .hot_article_bottom{
    font-size:12px;
    bottom:18px;
  }
  .authorInfo{
    position: absolute;
    width:100%;
  }
  .authorInfo .marlr2{
    display: none;
  }
}
@media only screen and (max-width:414px){
  .articleImgContainer{
    width:171px;
    height:107px;
    line-height:107px;
  }
  .hot_article_character{
    width:47%;
  }
  .hot_article{
    height:100px;
  }
  .hot_article_bottom{
    bottom:8px;
  }
  .moblietimer{
    display: block;
  }
  .timer{
    display: none;
  }
  .authorInfo .omit1{
    width:46px;
  }
}
@media only screen and (max-width:375px){
    .authorInfo .omit1{
    width:40px;
  }
}
@media only screen and (max-width:320px){
  .timer{
    width:70px;
    height:16px;
    overflow: hidden;
  }
  .articleImgContainer{
    width:150px;

  }
  .hot_article{
    height:102px;
  }
}
</style>
