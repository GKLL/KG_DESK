<template>
  <div class = 'adver'>
    <div class = 'adverImgContainer'><img :src = 'imgSrc' class = 'cursorPointer hoverImgScale' @click = "bannerLink(item)"/></div>
    <span class = 'adver_tag'>广告</span>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      
    }
  },
  components: {},
  props: {
    imgSrc:{},
    imgHeight:{},
    item:{}
  },
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
  methods: {
        bannerLink(item){
          if(item.imageType == 1){
            item.articleId = item.imageDetail
            // window.open(item.imageDetail)
            Lib.M.goDetail(item)
          }else{
            window.open(item.imageDetail)
          }
    },
  }
}
</script>

<style scoped>
.adver{
    width:100%;
  position: relative;
}
.adver_tag{
  position: absolute;
  display: inline-block;
  width:45px;
  height:18px;
  line-height: 18px;
  text-align: center;
  background:rgba(0,0,0,0.7);
  top:0px;
  right:0px;
  color:#fff;
  border-radius: 5px;
}
.adverImgContainer{
  width:100%;
  /*height:170px;*/
  overflow: hidden;
}

img{
  display: inline-block;
  width:100%;
 /* height:170px;*/
  border-radius: 5px;
}
</style>
<style>
  .adver_tag{
  position: absolute;
  display: inline-block;
  width:45px;
  height:18px;
  line-height: 18px;
  text-align: center;
  background:rgba(0,0,0,0.7);
  top:0px;
  right:0px;
  color:#fff;
  border-radius: 5px;
}
.adverImgContainer img{
  height:170px;
}
@media only screen and (max-width: 768px){
  .adverImgContainer img{
    height:148px;
  }
}
@media only screen and (max-width: 464px){
  .adverImgContainer img{
    height:76.5px;
  }
}
</style>
