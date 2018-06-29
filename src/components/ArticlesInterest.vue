<template>
    <div class = 'interestArticles'>
        <p class = 'article_title'>你可能感兴趣的文章</p>
        <div @click = "goDetail(item)" class = 'interestArticle cursorPointer' v-for = 'item in data'>
            <div class = 'interestImgContainer'>
              <img v-if = "item.articleImage != null && item.articleImage != '' && item.articlefrom == 1" :src = "imgUrl + item.articleImage"  class = 'cursorPointer hoverImg'/>
              <img v-else-if = "item.articlefrom != 1 && item.articleImage != null && item.articleImage != ''" :src="item.articleImage"  class = 'cursorPointer hoverImg'/>
              <img v-else-if = "item.articleImage != null || item.articleImage != ''" :src="item.defaultImage"  class = 'cursorPointer hoverImg'/>
            </div>
            <span class = 'omit2 article_tit'>{{item.articleTitle}}</span>
        </div>
    </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  components: {},
  props: {
    data:{}
  },
  data() {
    return {
      imgUrl:Lib.C.imgUrl
    }
  },
  //已成功挂载，相当ready()
  //相关操作事件
  methods: {
    goDetail(item){
      Lib.M.goDetail(item);
    }
  }
}
</script>

<style scoped>

.interestArticles{
  width:100%;
}
.interestArticles .article_title{
  font-size:16px;
  margin:20px 0px;
}
.interestArticle{
  width:30%;
  height:175px;
  display: inline-block;
  margin-right:20px;
  overflow: hidden;
}
.interestArticle span{
  height:35px;
}
.interestArticles .interestArticle:nth-child(2),.interestArticles .interestArticle:nth-child(5){
  margin-left:10px;
}
.interestArticles .interestArticle:nth-child(4),.interestArticles .interestArticle:nth-child(7){
  margin:0px;
}
.interestImgContainer{
  width:99%;
  height:118px;
  overflow: hidden;
  border:1px solid #f0f2f7;
  border-radius: 4px;
  margin-bottom:7px;
}
.interestImgContainer:hover .hoverImg{
  transform: scale(1.1); 
}
.interestArticle img{
  display: inline-block;
  width:100%;
  height:118px;
  transition: all 0.6s;
}
@media only screen and (max-width:1500px){
  .interestArticles .interestArticle:nth-child(2),.interestArticles .interestArticle:nth-child(5){
    margin-left:5px;
  }
}
@media only screen and (max-width:1350px){
  .interestArticles .interestArticle:nth-child(2),.interestArticles .interestArticle:nth-child(5){
    margin-left:0px;
  }
  .interestArticle{
    margin-right:10px;
  }
}
@media only screen and (max-width:414px){
  .interestArticle{
    width:31%;
    height:auto;
  }

  .interestImgContainer{
        
    height:64px;
  }
  .interestImgContainer img{
width:100%;
height:100%;

  }
}

</style>
