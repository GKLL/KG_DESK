<!-- 版权说明-加入我们，前端未使用此页面，静态展示页面，与后台无数据交互，整理：杨玉梅 2018/3/13 -->

<template>
	<div id="app" class ='aboutContainer' >
    <hb-head></hb-head>
    <!-- <div class = 'container aboutContainer'  v-html = "aboutData.infoDetail"></div> -->
    <div class = 'aboutBanner'>
     <ul class = 'aboutTab'>
            <li class = 'fl '><a href = '../about/list.html'>关于我们</a></li>
            <li class = 'fl '><a href = '../about_contact/list.html'>联系我们</a></li>
            <li class = 'fl aboutliActive'><a href = '../about_join/list.html'>加入我们</a></li>
            <li class = 'fl'><a href = '../about_state/list.html'>版权申明</a></li>
            <li class = 'fl'><a href = '../about_register/list.html'>用户注册协议</a></li>
            <li class = 'fl'><a href = '../about_column/list.html'>专栏申请协议</a></li>
            <li class = 'fl'><a href = '../about_course/list.html'>使用教程</a></li>
      </ul>
    </div>
    <div class ='aboutMain'>
      <div class ='aboutTit'>
        <i></i>
        <h1>千氪财经简介</h1>
      </div>
      <p class ='aboutInfo'>1.千氪财经正式创办于2017年10月，千氪财经是中国一家具有国际视野的财经网站。将打造专业、权威、为用户着想的财经媒体。致力于数据挖掘的推荐引擎产品，为用户推荐信息，提供连接人与金融信息的金融服务的产品，为广大投资者提供不同种类的最新行业资讯，我们将邀请各大领域的专家，借助他们对于各自领域的深刻认识，构建一个覆盖面广，同时不断更新的资讯库；同时开创区块链SAAS创新创业生态服务平台。</p>
      <p class ='aboutInfo'>2.围绕这一理念，千氪财经传媒的报道方向从“区块链+互联网+新经济”向“新经济”全面升级，致力于报道能代表未来经济趋势的新商业公司。而背后三大动力，一个是新兴的区块链技术、一个是以移动互联网、人工智能为代表的“科技”，一个以创业融资为代表的“资本”，千氪财经将以此作为切入点，来报道和深度服务这些能代表未来经济趋势的新商业公司,以及各行业的最近动态。</p>
      <p class ='aboutInfo'>3.在信息爆炸的时代，人们面对的选择越来越多，选择过多，信息超载，也常常会使人无所适从。在这种情况下，推荐引擎便开始展现技术优势，发挥威力。千氪财经”就是一款基于数据挖掘的推荐引擎产品，它不是传统意义上的新闻客户端，算法模型会记录用户在千氪财经上的每一次行为，在海量的资讯里知道你感兴趣的内容，甚至知道你有可能感兴趣的内容，并将它们精准推送给你。</p>
    </div>
    <other-footer />
<!--     <div v-if = "loadingShow" class = 'loadingGif'>
      <img src = '../../../assets/img/kg.gif'/>
</div> -->
	</div>
</template>

<script>

// import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
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
  components: {HbHead,OtherFooter},
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


