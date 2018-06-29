<template>
  <div class = 'footer'>
    <div class = 'container'>
      <div class = 'about'>
          <!-- <a class = 'cursorPointer article_tit' @click = "preview ? false : toAboutUs(item)" v-for = "item in about" target = "_blank">{{item.infoName}}</a> -->
            <div class = 'cursorPointer article_tit'><a href = '../about/list.html' target = "_blank">关于我们</a></div>
            <div class = 'cursorPointer article_tit'><a href = '../about_contact/list.html' target = "_blank">联系我们</a></div>
            <div class = 'cursorPointer article_tit'><a href = '../about_state/list.html' target = "_blank">版权申明</a></div>
      </div>
      </div>
      <div class = 'info otherInfo'>
        <!-- 川公网安备33010602002085号 -->
        <span>蜀ICP备18000636号-1</span>
      </div>
   
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
            height:{
        height:document.body.clientHeight + 'px'
      },
      about:[{}],
      partnerData:[{}],
      servicePhone:Lib.C.servicePhone
    }
  },
  components: {},
  props: {
  	preview:{}
  }, 
  mounted(){
    const that = this;
        const list = Lib.M.dataRequest("");
    //获取关于我们
    Lib.M.ajax({
              'type':'post',
              'url':'/baseinfo/getfriendlyAll',
              "data":list,
              'success':function (data){
                if(data.code == 10000){      
                  data = data.responseBody.data;
                  that.about = data;
                }else{
                    that.$message({
                        message: data.message,
                        type: 'error'
                    });
                }

          }
    }); 
  },
  //相关操作事件
  methods: {
   toAboutUs(item){
      localStorage.setItem("kg_about",item.infoType)
      window.open('../about/list.html')
   },
  }
}
</script>

<style scoped>
body{
    font-family: "微软雅黑";
}
.footer{
width: 100%;
    background: #333;
    height: auto;
    /*padding-bottom: 50px;*/
   
    position: relative;
    bottom: 0;
    margin-top: 30px;
    padding-bottom: 70px;
}
.about{
   display: -webkit-box;
   display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   flex-direction: row;
   justify-content:space-between;
   font-size:12px;
   font-family:PingFangSC-Regular;
   color:rgba(255,255,255,1);
   margin: 20px 10px;
   padding-top:20px;
}
.about a{
  color:#fff;
  display: inline-block;
  text-align: center;
}
/* .about,.info{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin:10px 0px;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
} */
.info{
  color:#fff;
  margin-top:0px;
  /*margin-top:20px;*/
  text-align: center;
}
.info span{
  
  color:rgba(153,153,153,1);
  text-align: center;
}
/* @media only screen and (max-width:414px){
  .otherInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .otherInfo span{
    text-align: center;
  }
} */
/* @media only screen and (max-width:375px){
  .about a{
    margin-right:9px;
  }
}
@media only screen and (max-width:320px){
  .about a{
    margin-right: 5px;
    /*width: 199px;*/

</style>
