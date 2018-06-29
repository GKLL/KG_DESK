<template>
<!--     <div class=  'hot_img'>
      <img :src = "imgUrl + item.imageAddress" class = 'cursorPointer' @click = "bannerLink(item)" />
      <span class = 'hot_img_mask cursorPointer' @click = "bannerLink(item)">{{item.articleTitle}}</span>
    </div> -->
    <div>
            <!-- 资讯 -->
        <div class = 'hot_img'  v-if = "item.imageType == 1">
          <img :src = "imgUrl + item.imageAddress" class = 'cursorPointer hoverImgScale' @click = "bannerLink(item)"/>
          <span class = 'hot_img_mask omit2 cursorPointer' @click = "bannerLink(item)">{{item.articleTitle}}</span>
          <span class = 'mask'></span>
        </div> 
        <!-- 广告 -->
         <div class = 'hot_img' v-else-if = "item.imageType == 2">
          <img :src = "imgUrl + item.imageAddress" class = 'cursorPointer hoverImgScale' @click = "bannerLink(item)"/>
           <span class = 'adver_tag'>广告</span>
        </div>
        <!-- 其他 -->
        <div class = 'hot_img'  v-else-if = "item.imageType == 3">
          <img :src = "imgUrl + item.imageAddress" class = 'cursorPointer hoverImgScale' @click = "bannerLink(item)"/>
        </div>
      </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      imgUrl:Lib.C.imgUrl
    }
  },
  components: {},
  props: {
    imgSrc:{},

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
    }
  }
}
</script>

<style scoped>
.hot_img{
  width:100%;
  position: relative;
    margin-bottom:20px;
    overflow: hidden;
    height:90px;
    border-radius: 4px;

}
.hot_img:hover  .hoverImgScale{
    transform: scale(1.1); 
}

.hot_img_mask{
  width:100%;
  height:40px;
  background:rgba(0,0,0,0.7);
  position: absolute;
  bottom:0;
  left:0px;
  border-radius: 5px;
  color: #fff;
  line-height:40px;
  text-align: center;
  font-size: 16px;
}
img{
  display: inline-block;
  width:100%;
  /*height:90px;*/
  border-radius: 5px;

}
</style>
