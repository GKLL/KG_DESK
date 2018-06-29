<template>
	<div  >
    <hb-head ></hb-head>
    <img src = '../../../assets/img/476409614836852119.jpg' class = 'logo'/>
    <div class = 'container flexR' >
      <div class = 'container_left hours24 newsflashshare'>
        <div class = 'title'>{{hours24[0].newsflashTitle}}</div>
        <div class = 'time color999'>{{hours24[0].createDate}}</div>
        <div v-html = "hours24[0].newsflashText" class = 'news_main'></div>
        <a v-if = 'hours24[0].newsflashLink' :href = 'hours24[0].newsflashLink' rel = 'nofollow' class = 'read font14'>查看原文></a>
        <div class ='news_footer'>
          <img src = "../../../assets/img/wxLogo.jpg"/>
          <div class = 'share_footer'>
            <p>关注“千氪财经”官方公众号，了解更多信息</p>
            <p class = 'color999 fr'>分享自KG.COM</p>
          </div>
        </div>
      </div>
    <div v-if = "loadingShow" class = 'loadingGif'>
        <img src = '../../../assets/img/kg.gif'/>
    </div>
	</div>

</div>
</template>
<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
import ArticleList from 'components/ArticleList';
import TopRank from 'components/TopRank';
import HotImg from 'components/HotImg';
import RightImg from 'components/RightImg';
import ToTop from 'components/ToTop';
export default {
  data() {
    return {
      loadingShow:true,
      height:{
        height:document.body.clientHeight + 'px'
      },
      listData:[{}],
      hot_articles:[{}],
      topList:[{}],
      right_hot:{},
      page:1,
      loadmorebtn:false,
      moreLoading:false,
      listShow:2,
      posImg:[{}],
      columnname:"",
      showList:true,


      hours24:[{}],
      hoursClass:"omit2 font14 cursorPointer article_tit"
    }
  },
  components: {HbHead,OtherFooter,ArticleList,TopRank,HotImg,RightImg,ToTop},
  //已成功挂载，相当ready()
  mounted(){
      this.loadingShow = false;
     const that = this;
     let id = Lib.M.getUrlQuery('id');
     id = id.split('#')[0];
     let indexTitle = document.getElementsByTagName('title')[0];
     const list = Lib.M.dataRequest({
          'newsflashId':id,
     });
     let detail_url = window.location.href;
     const wechat_list = Lib.M.noSignRequest({"url":detail_url})
     Lib.M.ajax({
                'type':'post',
                'url':'/newsFlash/getNewsFlashDetail',
                'data':list,
                'success':function (data){
                  // self.ajaxResult = data;
                  data = data.responseBody.data;
                  if(data.length !== 0){
                    if(data[0].newsflashTitle != '' && data[0].newsflashTitle != null){
                      data[0].newsflashTitle = data[0].newsflashTitle;
                    }else{
                       data[0].newsflashTitle = '千氪财经最新快讯'
                    }
                    indexTitle.innerHTML = data[0].newsflashTitle
                    that.hours24 = data;
                    const articleData = data[0];
                    Lib.M.weixinAjax({
                                      'type':'post',
                                      'url':'weixin/weixinConfig',
                                      "data":wechat_list,
                                      'success':function (data){
                                      if(data.code == 10000){
                                        data = data.responseBody;                   
                                               wx.config({
                                                    debug: false,
                                                    appId: data.appId,
                                                    timestamp: data.timestamp,
                                                    nonceStr: data.nonceStr,
                                                    signature: data.signature,
                                                    jsApiList: [
                                                        'onMenuShareTimeline','onMenuShareAppMessage'
                                                    ]
                                              });
                                              Lib.M.share_weixin(detail_url,articleData)
                                        }
                                    }
                    });
                  }
            }
    });



  },
  //相关操作事件
  methods: {
    LoadMore(){
      const that = this;
      this.page +=1;
      const sub_column_id = Lib.M.getUrlQuery('c');
        const list = Lib.M.dataRequest({
                      "columnId":sub_column_id,
                      "currentPage":this.page,
        })
      //加载更多文章
     Lib.M.loadMore('article/getChannelArt',list,this.listData,that)     
    },
        unfold(e){
      var target = e.target;
      var text = target.innerHTML;
      var target_span = target.previousSibling.previousElementSibling;
      if(text.indexOf('展开') != -1){
         target_span.className = 'font14 cursorPointer article_tit';
         target.innerHTML = '收起>'
      }else{
          target_span.className = 'omit2 font14 cursorPointer article_tit';
         target.innerHTML = '展开>'       
      }
    },
  }
}
</script>

<style scoped>
.container{
  /*padding-top:100px;*/
}

.container_left{
    width:70%;
}
.hours24 img,.logo{
  width:100%;
  border:0px;
}
.logo{
  margin-top:0px;
}
.title{
  font-size: 16px;
  margin-top: 10px;
}
.time{
  margin:10px 0px;
}
.read{
  margin-top:10px;
  display: block;
  color:#1d87ff;
}
.news_main{
  font-size:14px;
}
.news_footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.news_footer img{
  display: inline-block;
  width:130px;
  height:130px;
  margin-left:-10px;
}
.share_footer{
  position: relative;
}
.share_footer p:nth-child(1){
    letter-spacing: 2px;
    font-size: 14px;
    color: #000;
    margin-top: 4px;
    line-height: 24px;
}
.share_footer p:nth-child(2){
  position: absolute;
  bottom: 10px;
  right: 15px;
}
</style>
<style>
  .newsflashshare img{
    width:100%;
  }
</style>
