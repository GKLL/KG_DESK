<template>
  <div class = 'footer'>
    <div class = 'container'>
      <div class = 'about'>
          <!-- <a class = 'cursorPointer article_tit' @click = "preview ? false : toAboutUs(item)" v-for = "item in about" target = "_blank">{{item.infoName}}</a> -->
                      <span class = 'cursorPointer article_tit'><a href = '../about/list.html'>关于我们</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_contact/list.html'>联系我们</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_state/list.html'>版权申明</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_register/list.html'>用户注册协议</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_column/list.html'>专栏申请协议</a></span>
      </div>
      <div class = 'info otherInfo'>
        <!-- 川公网安备33010602002085号 -->
        <span>蜀ICP备18000636号-1</span>
        <span>举报电话：{{servicePhone}}</span>
        <span>举报邮箱：maxin@kg.com</span>
      </div>
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
    background: #2d3237;
    height: auto;
    /*padding-bottom: 50px;*/
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    bottom: 0;
    margin-top: 50px;
}
.about a{
  color:#fff;
  margin-right:30px;
  display: inline-block;
}
.about,.info{
  display: flex;
    flex-direction: row;
    justify-content: center;
    margin:10px 0px;
}
.info{
  color:#fff;
  margin-top:0px;
  /*margin-top:20px;*/
}
.info span{
  margin-right:10px;
}
@media only screen and (max-width:414px){
  .otherInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .otherInfo span{
    text-align: center;
  }
}
@media only screen and (max-width:375px){
  .about a{
    margin-right:9px;
  }
}
@media only screen and (max-width:320px){
  .about a{
    margin-right: 5px;
    /*width: 199px;*/
  }
}
</style>
