<!-- 版权说明-联系我们，静态展示页面，与后台无数据交互，整理：杨玉梅 2018/3/13 -->
<template>
	<div id="app" class ='aboutContainer' >
    <hb-head></hb-head>
    <!-- <div class = 'container aboutContainer'  v-html = "aboutData.infoDetail"></div> -->
    <div class = 'aboutBanner'>
     <ul class = 'aboutTab'>
            <li class = 'fl '><a href = '../about/list.html'>关于我们</a></li>
            <li class = 'fl aboutliActive'><a href = '../about_contact/list.html'>联系我们</a></li>
            <!-- <li class = 'fl'><a href = '../about_join/list.html'>加入我们</a></li> -->
            <li class = 'fl'><a href = '../about_state/list.html'>版权申明</a></li>
            <li class = 'fl'><a href = '../about_register/list.html'>用户注册协议</a></li>
            <li class = 'fl'><a href = '../about_column/list.html'>专栏申请协议</a></li>
           <li class = 'fl'><a href = '../about_course/list.html'>使用教程</a></li>
      </ul>
    </div>
    <div class ='aboutMain'>
       <div class ='aboutTit'>
  <i></i>
  <h1>联系方式</h1>
</div>
      <p class ='aboutInfo'>市场、商务合作请联系邮箱 :support@kg.com</p>
      <p class ='aboutInfo'>用户反馈请联系邮箱 : service@kg.com</p>

    </div>
    <other-footer />
        <to-top />
<!--     <div v-if = "loadingShow" class = 'loadingGif'>
      <img src = '../../../assets/img/kg.gif'/>
</div> -->
	</div>
</template>

<script>

// import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
import ToTop from 'components/ToTop';
export default {
  data() {
    return {
      minHeight:{
        height:document.body.clientHeight - 236 + 'px'
      },
      // loadingShow:true,
      // aboutData:{},
    }
  },
  components: {HbHead,OtherFooter,ToTop},
  //已成功挂载，相当ready()
  mounted(){
/*      const that = this;
      //关于我们
      const listData = Lib.M.dataRequest({
          "infoType":localStorage.getItem('kg_about'),
      })
      let indexTitle = document.getElementsByTagName('title')[0];
      Lib.M.ajax({
              'type':'post',
              'url':'baseinfo/getbaseinfoType',
              "data":listData,
              'success':function (data){
                  if(data.code == 10000){
                      data = data.responseBody.data;
                      that.aboutData = data;
                      indexTitle.innerHTML = data.infoName;
                      that.loadingShow = false;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
      })*/
  },
  //相关操作事件
  methods: {
  }
}
</script>




