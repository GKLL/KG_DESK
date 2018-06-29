<template>
  <div  v-if = "topListFirst.articleTitle == undefined ? false :true">
      <div class='topBox'>
        <div class='topTitle'>
          <span class = 'blueLine'></span>
          <span class = 'font18 fontbold'>TOP排行</span>
        </div>
        <div class="topImg">
          <div class=  'top_img'>
            <img class = 'tag' src="../assets/img/top1.png"/>
            <img  :src="topListFirst.articlefrom == 1 ? imgUrl + topListFirst.articleImage : topListFirst.articleImage" class = 'cursorPointer hoverImgScale' @click = "goDetail(topListFirst)"/>
            <span class = 'top_img_mask'>
            </span>
            <span class = "top_img_omit2 omit2" @click = "goDetail(topListFirst)"> {{topListFirst.articleTitle}}</span>
          </div>
          <ol>
            <li v-for="(item,key) in topList" :key="key" class ="omit2 cursorPointer article_tit font15 color666"  @click = "goDetail(item)"> {{key == 8? "":0}}{{key+2+"."}}{{item.articleTitle}}</li>
          </ol>
        </div>
      </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      topListFirst:{},
      topList:[{}],
      imgUrl:Lib.C.imgUrl
    }
  },
  components: {},
  props: {
  },
  //已成功挂载，相当ready()
  mounted(){
    var that = this;
    const list = Lib.M.dataRequest("");
    Lib.M.ajax({
            'type':'post',
            'url':'/article/selecttoparticle',
            'data':list,
            'success':function (data){
              data = data.responseBody;
              if(data.length !== 0){
                that.topListFirst = data[0];
                that.topList = data.splice(1,10);   
              }
              setTimeout(()=>{
                // self.$vux.loading.hide();
              },1000);
        }
    });
  },
  //相关操作事件
  methods: {
    goDetail(item){
      Lib.M.goDetail(item)
    }
  }
}
</script>

<style scoped>

body{
    font-family: "微软雅黑";
}
.topBox{

}
.topTitle{
  display: flex;
  height:26px;
  line-height: 26px;
  font-size:20px;
  
}
/* .topTitle span:nth-child(1){
  display: inline-block;
  width:5px;
  height:26px;
  line-height: 26px;
  background: #1d87ff;
} */
.topTitle span:nth-child(2){
  display: inline-block;
  
  color:#666666;
  /*margin-left: 15px;*/
}
.topImg{
  margin: 20px 0;
  position: relative;
}
.topImg img:nth-child(2){
  display: block;
  width:100%;
}
.topImg li {
  font-size:16px;
  color:#959595;
  margin:16px 0;
  line-height: 22px;
  padding:0px 10px;
}
.topImg li:nth-child(1) {
  font-size:16px;
  /*margin: 20px 0 10px;*/
  line-height: 22px;
}

.top_img{
  width:99%;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  border:1px solid #f0f2f7;
}
.top_img img{
  border:0px !important;
}
.top_img .tag{
  position: absolute;
  left:20px;
  z-index: 200;
  display: inline-block;
  width:51px;
  height:28px;
  border-radius: 0px!important;
}
.top_img_mask{
  width:100%;
  height:60px;
  line-height: 60px;
  background:rgba(0,0,0,0.7);
  position: absolute;
  bottom:0;
  /*border-radius: 5px;*/
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  text-align: left;
  font-size: 16px;
}
.top_img_omit2{
  width:90%;
  height:60px;
  position: absolute;
  bottom:-9px;
  margin-left:16px;
  color: #fff;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
}
.omit2{
  overflow: hidden;
}
.topBox img{
  display: inline-block;
  width:100%;
  height:195px;
  border-radius: 5px;
}
</style>
