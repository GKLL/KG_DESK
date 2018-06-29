<template>
  <div class = 'messageBox'>
       
        <span>  {{message}}</span>

  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import FeedBack from './FeedBack';
export default {
  data() {
    return {
      data:[{}],
      opinionVisible:false,
    }
  },
  components: {FeedBack},
  props: {
    message:{}
  },
  //已成功挂载，相当ready()
  mounted(){
     
  },
  //相关操作事件
  methods: {
      toTxb(){
        window.open('../tiWhite/list.html')
      },
      toWeibo(){
        window.open('https://weibo.com/6392207969/profile?topnav=1&wvr=6&is_all=1')
      },
       cancel(){
        this.opinionVisible = false
       },
       goTop(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
       }
  }
}
</script>
<style scoped>
.popoverContainer{
  display: flex;
  flex-direction: row;
}
.popoverFt{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.popoverFt p:nth-child(1){
  color:#333;
}
.popoverFt p:nth-child(2){
  color:#dfdfdf;
  font-size:12px;
  margin-top:15px;
}
  .imgLogo{
    display: inline-block;
    width:120px;
    height:120px;
  }
  .messageBox{
    position: fixed;
    top:30px;
    left:0px;
    width:100%;
    height:44px;
    line-height:44px;
    background:rgba(0,0,0,1);
    opacity:0.7;
    z-index:99999;
    text-align:center;
    color:#fff;
    font-size:14px;
  }
  .messageBox span{
    display: inline-block;
    
  }
  .toTop .topBlock{
    display: block;
    width:40px;
    height:40px;
    line-height: 40px;
    text-align: center;
    background:#ebebeb;
    margin-bottom:5px;
    cursor: pointer;
    border-radius: 2px;
  }
  .toTop i{
    font-size:28px;
    color:#fff;
  }
  .toTop .icon-jiantou-copy{
    font-size:26px;
  }
  .toTop .topBlock:hover{
    background:#999;
  }
  .toTop i:hover{
    /*color:#1d87ff;*/
  }
  .navGif{
    display: inline-block;
    width:67px;
    height:60px;
    margin-left:-12px;
  }
</style>
