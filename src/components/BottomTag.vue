<template>
  <div class = 'adver'>
    <img :src = "imgUrl + item.imageAddress" class = 'cursorPointer hoverImgScale' @click = "goDetails(item)"/>
    <span class = 'adver_tag'>广告</span>
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
    item:{}
  },
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
  methods: {
    goDetails(item){
      window.open(item.imageDetail)
    }
  }
}
</script>

<style scoped>
.adver{
    width:100%;
  position: relative;
  height:90px;
  overflow: hidden;
  margin-bottom:20px;
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
img{
  display: inline-block;
  width:100%;
  height:90px;
  border-radius: 5px;
}
</style>
