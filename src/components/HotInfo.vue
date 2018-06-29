<template>
  <div>
      <div class='topBox'>
        <div class='topTitle'>
          <span></span>
          <span>热门资讯</span>
        </div>
<!--         <div class="topImg">
  <div>
     <img src="../assets/img/pic1.jpg" />
     <span class = 'ft omit2'>xxxxxxxxxxx</span>
     <span class = 'mask'></span>
  </div>
  <ul>
    <li v-for="item in hotinfo" class ="omit2">{{item.text}}</li>
  </ul>
</div> -->
        <div class="topImg">
          <div class=  'top_img' v-if = "hotinfo[0] != undefined">

            <img :src="imgUrl + hotinfo[0].articleImage" class = 'cursorPointer hoverImgScale' @click = "goDetail(hotinfo[0])"/>
            <span class = 'top_img_mask'>
            </span>
            <span class = "top_img_omit2 omit2"> {{hotinfo[0].articleTitle}}</span>
          </div>
          <ol>
            <li v-for="(item,key) in hotinfo" class ="omit2 cursorPointer article_tit"  @click = "goDetail(item)">{{item.articleTitle}}</li>
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
      hotinfo:[{}],
      imgUrl:Lib.C.imgUrl
    }
  },
  components: {},
  props: {
  },
  //已成功挂载，相当ready()
  mounted(){
      const that = this;
      const column_id  = localStorage.getItem('channel_column_id');
      const hot_articles_list = Lib.M.dataRequest({
               "columnId":column_id
      })
      Lib.M.ajax({
            'type':'post',
            'url':'/article/getChannelAll',
            "data":hot_articles_list,
            'success':function (data){
              data = data.responseBody;
              that.hotinfo = data.data;
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

<style>
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
.topTitle span:nth-child(1){
  display: inline-block;
  width:5px;
  height:26px;
  line-height: 26px;
  background: #1d87ff;
}
.topTitle span:nth-child(2){
  display: inline-block;
  
  color:#666666;
  margin-left: 15px;
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
  margin: 10px 0;
  height: 46px;
  line-height: 22px;
}
.topImg li:nth-child(1) {
  font-size:16px;
  margin: 20px 0 10px;
  line-height: 22px;
}

.top_img{
  width:100%;
  position: relative;
  overflow: hidden;
}
.top_img .tag{
  position: absolute;
  left:20px;
  z-index: 200;
  display: inline-block;
  width:51px;
  height:28px;
}
.top_img_mask{
  width:100%;
  height:60px;
  line-height: 60px;
  background:rgba(0,0,0,0.7);
  position: absolute;
  bottom:0;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  font-size: 16px;
}
.top_img_omit2{
  width:70%;
  height:60px;
  position: absolute;
  bottom:-8px;
  margin-left:45px;
  color: #fff;
  text-align: center;
  font-size: 16px;  
}
.omit2{
  overflow: hidden;
}
img{
  display: inline-block;
  width:100%;
  height:170px;
  border-radius: 5px;
}
/* .topImg{
  margin: 20px 0;
  position: relative;
}
.topImg p{
  height:200px;
  position: relative;
}
.topImg img:nth-child(1){
  display: block;
  width:100%;
  
}
.topImg li {
  font-size:16px;
  color:#959595;
  margin: 10px 0;
    height: 48px;
    line-height: 22px;
}
.topImg li:nth-child(1) {
  font-size:16px;
  color:#1d87ff;
  margin: 20px 0 10px;
    height: 48px;
    line-height: 22px;
}
.ft{
    width: 70%;
    height: 60px;
    position: absolute;
    bottom: -8px;
    color: #fff;
    font-size: 16px;
    z-index: 200;
    margin-left: 45px;
}
 .mask{
  width:99%;
  height:62px;
  position: absolute;
  bottom:0px;
  background:rgba(0,0,0,0.7);
  border-radius: 5px;
} */
</style>
