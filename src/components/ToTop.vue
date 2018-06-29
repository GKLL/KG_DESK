<template>
  <div>
        <div class = 'toTop'>
          <!-- <img src = '../assets/img/navGif.gif' class ='navGif cursorPointer' @click = "toTxb"> -->
          <span v-popover:popover1 class = 'topBlock'>
            <i class = 'icon iconfont icon-weixin'></i>
                     <el-popover
                        ref="popover1"
                        placement="left"
                        width="230"
                        trigger="hover"
                         >  
                        <div class = 'popoverContainer'>
                          <img src = '../assets/img/wxLogo.jpg' class = 'imgLogo'/>
                          <div class = 'popoverFt'>
                              <p>千氪财经官方微信公众号</p>
                              <p>微信号：KG_COM</p>
                          </div>
                        </div>
                      </el-popover>
          </span>
          <span @click = "toWeibo"><i class = 'icon iconfont icon-weibo topBlock'></i></span>
          <span  v-popover:popover2 class = 'topBlock'>
            <i class = 'icon iconfont icon-qq'></i>
            <el-popover
                        ref="popover2"
                        placement="left"
                        width="230"
                        trigger="hover"
                         >  
                        <div class = 'popoverContainer'>
                          <img src = '../assets/img/qqLogo.png'  class = 'imgLogo'/>
                          <div class = 'popoverFt'>
                              <p>千氪财经官方QQ群</p>
                              <p>群号：711044678</p>
                          </div>
                        </div>
            </el-popover>
          </span>
          <span @click = "opinionVisible = true"><i class = 'icon iconfont icon-pinglun1 topBlock'></i></span>
          <span @click = "goTop"><i class = 'icon iconfont icon-jiantou-copy topBlock'></i></span>
        </div>
        <feed-back :visible = "opinionVisible" :cancel = "cancel"/>
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
    rightImg:{}
  },
  //已成功挂载，相当ready()
  mounted(){
      const that = this;
      const list = Lib.M.dataRequest("")
/*      Lib.M.ajax({
            'type':'post',
            'url':'/baseinfo/getfriendlyAll',
            "data":list,
            'success':function (data){
              data = data.responseBody.data;
              that.data = data;
          }
      });*/  
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
  .toTop{
    position: fixed;
    bottom:100px;
    right:100px;
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
