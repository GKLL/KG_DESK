<template>
        <!-- 资讯 -->
        <div class = 'right_hot'  v-if = "rightImg.imageType == 1">
          <img class = 'cursorPointer hoverImgScale' :src = "imgUrl+rightImg.imageAddress" @click = "bannerLink(rightImg)"/>
          <span class = 'ft omit2' @click = "bannerLink(rightImg)">{{rightImg.articleTitle}}</span>
          <span class = 'mask'></span>
        </div> 
        <!-- 广告 -->
         <div class = 'right_hot' v-else-if = "rightImg.imageType == 2">
          <img class = 'cursorPointer hoverImgScale' :src = "imgUrl+rightImg.imageAddress" @click = "bannerLink(rightImg)"/>
           <span class = 'adver_tag'>广告</span>
        </div>
        <!-- 其他 -->
        <div class = 'right_hot'  v-else-if = "rightImg.imageType == 3">
          <img class = 'cursorPointer hoverImgScale' :src = "imgUrl+rightImg.imageAddress" @click = "bannerLink(rightImg)"/>
          <!-- <span class = 'ft omit2'>{{rightImg.articleTitle}}</span> -->
          <!-- <span class = 'mask'></span> -->
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
    rightImg:{},
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
.right_hot{
  width:100%;
  height:200px;
  position: relative;
  overflow: hidden;
}
.right_hot img{
  display: inline-block;
  width:100%;
  height:200px;
  border-radius: 5px;
}
.right_hot .ft{
    width: 70%;
    height: 60px;
    position: absolute;
    bottom: -8px;
    color: #fff;
    font-size: 16px;
    z-index: 200;
    margin-left: 45px;
    cursor: pointer;
}
.right_hot .mask{
  width:100%;
  height:62px;
  position: absolute;
  bottom:0px;
  background:rgba(0,0,0,0.7);
  border-radius: 5px;
}

.adver_tag{
    position: absolute;
    width: 45px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: rgba(0,0,0,.7);
    bottom: 0;
    right: 0;
    color: #fff;
    border-radius: 4px;
}
</style>
