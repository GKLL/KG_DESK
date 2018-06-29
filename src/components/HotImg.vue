<template>
    <div class=  'hot_img '>
      <img :src = "imgSrc"  @click = "bannerLink(item)" class = 'hoverImgScale' />
      <span v-if = "item.imageType != 3" class = 'hot_img_mask cursorPointer' @click = "bannerLink(item)">{{item.articleTitle}}</span>
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
.hot_img{
  width:100%;
  position: relative;
  overflow: hidden;
  height:170px;
}
.hot_img:hover .hoverImgScale{
    transform: scale(1.1); 
}
.hot_img_mask{
  width:100%;
  background:rgba(0,0,0,0.4);
  position: absolute;
  bottom:0px;
  left:0px;
  border-radius: 5px;
  color: #fff;
  height:44px;
  line-height:44px;
  text-align: center;
  font-size: 16px;
}
.hot_img_mask:hover{

}

img{
  display: inline-block;
  width:100%;
  /*height:170px;*/
  border-radius: 5px;
}
@media only screen and (max-width:1440px){
  .hot_img_mask{
    bottom:6px;
  }
}
@media only screen and (max-width:1366px){
  .hot_img_mask{
    bottom:14px;
  }
}
@media only screen and (max-width:1280px){
  .hot_img_mask{
    bottom:6px;
  }
}
@media only screen and (max-width:414px){
  .hot_img{
    height:84px;
  }
  .hot_img_mask{
    font-size:12px;
    bottom:3px;
    height:28px;
    line-height:28px;
  }
}
@media only screen and (max-width:412px){
  .hot_img_mask{
    bottom:0px;
  }
}
@media only screen and (max-width:375px){
  .hot_img{
    height:78px;
  }
    .hot_img_mask{
    bottom:1px;
  }
}
@media only screen and (max-width:360px){
  .hot_img_mask{
    bottom:5px;
  }
}
@media only screen and (max-width:320px){
  .hot_img{
    height:65px;
  }
  .hot_img_mask{
    height:30px;
    line-height:30px;
    bottom:1px;
  }
}
</style>
