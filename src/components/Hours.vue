<!--分享7*24小时快讯到微信和新浪微博-->
<template>
        <div class = 'hours24' v-if = 'hours24[0].newsflashId == undefined ? false :true'>
          <div id = 'wechat_code99'></div>

          <h1>
            <div class = 'fl'>
              <i class = 'blueLine'></i>
              <span class = 'blueLine_ft fontBold'>7x24小时快讯</span>
              <!-- <span class = 'blueLine_ft fontBold'></span> -->
            </div>
            <a class = 'fr color999 cursorPointer getMore' @click = 'tohours'>更多></a>
          </h1>
          <p  style = "height:30px;margin-top:20px">
            <span class = 'color999 fl font14'>{{mouth}}月{{day}}日</span>
            <span v-if = 'moreshow'  @click = "loadingMore" class = 'color1d87 cursorPointer fr font14'>
              查看更多快讯
              <!-- <i class = 'moreNews'></i> -->
            </span>
          </p>
          <el-scrollbar style = "height:525px;overflow-x:hidden">
                      <ul>
            <li v-for = '(item,key) in hours24' :key="key">
              <div class = 'list'>
                <div class = 'list_l'>
                  <i class = 'dot'></i>
                  <p class = 'list_line'></p>
                </div>
                <div class = 'news'>
                  <span class = 'color999 date font14'>{{item.createDate}}</span>
<!--                   <span :class = 'hoursClass' @click = "goHours(item)" v-if = "item.remark == '证券时报网·快讯' || item.remark == '东方财富网'">{{item.newsflashTitle
          }}</span>        -->        
                  <span :class = 'hoursClass' @click = "goHours(item)" v-html = 'item.newsflashText'></span>
                  <span @click = 'unfold' class = 'color1d87 cursorPointer handle' v-if = "item.newsflashTitle.length > 45 || item.newsflashText.length > 45">展开></span>
                  <p class = 'list_footer'>
                    <a class = 'color999 fl' :href = 'item.newsflashLink' target="_blank" rel="nofollow" v-if = "item.newsflashLink != null && item.newsflashLink != ''">查看原文></a>
                    <span class = 'list_share fr'>
                      <span class = 'colorccc font14'>分享</span>
                      <!-- mouseenter -->
                       <!-- @mouseleave = "leave" -->
                      <i class = 'icon iconfont icon-weixin-copy cursorPointer colorccc' @mouseenter = "shareWeixin($event,key,item)" @mouseleave = "leave">
                         <span class = 'weicode'>
                           <span :id = "'wechat_code' + key" v-loading="loading" class = 'weichat_code'></span>
                           <span class = 'share_warning'>打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮</span>
                         </span>
                      </i>
                      <i class = 'icon iconfont icon-logo-weibo cursorPointer colorccc' @click = "shareWeibo(item)"></i>
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
          </el-scrollbar>

        </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import JQ from 'jquery';
import QRCode from 'qrcodejs2';
export default {
  data() {
    return {
        hours24:[{}],
        hoursClass:"omit2 font14 cursorPointer",
        loading:true,
        mouth:'',
        day:'',
        requestTime:"",
        autoSaveInterval:null,
        moreshow:false,
    }
  },
  components: {},
  props: {
  },
  //已成功挂载，相当ready()
  mounted(){
     //24小时资讯
     const that = this;
     const list = Lib.M.dataRequest("");
     Lib.M.ajax({
            'type':'post',
            'url':'/newsFlash/getNewsFlashList',
            'data':list,
            'success':function (data){
                const datalist = data.responseBody.newsFlashList;
                that.requestTime = data.responseBody.requestTime;
                if(datalist.length !== 0){
                  that.hours24 = datalist;

                          if (!!window.ActiveXObject || "ActiveXObject" in window){    
                                }else{    
                               //顶部币种行情
                                var footerSocket;
                                var target = "wss://snatch.kg.com/newsFlashSocket";
                                footerSocket = new WebSocket(target);
                                footerSocket.onopen = function () {
                                    footerSocket.send("allCount");
                                };
                                footerSocket.onmessage = function (data) {
                                   data = data.data;
                                   that.moreshow = data != 0 ?true : false;
                                };
                          }
                }else{
                  that.hidden = false
                }
        }
    });
     const date = new Date();
     this.mouth = date.getMonth() + 1;
     this.day = date.getDate();
  },
  //相关操作事件
  methods: {
    loadingMore(){
      const that = this;
       const list = Lib.M.dataRequest("");
       Lib.M.ajax({
              'type':'post',
              'url':'/newsFlash/getNewsFlashList',
              'data':list,
              'success':function (data){
                  const datalist = data.responseBody.newsFlashList;
                  that.requestTime = data.responseBody.requestTime;
                  that.moreshow = false;
                  if(datalist.length !== 0){
                    that.hours24 = datalist;
                  }else{
                    that.hidden = false
                  }
          }
      });
    },
    getNumberUnread(createDate){
      const that = this;
        const list = Lib.M.dataRequest({
            'newsflashType':'-1',
            'createDate':createDate,
        });
        
        Lib.M.ajax({
                'type':'post',
                'url':'/newsFlash/getNumberUnread',
                'data':list,
                'success':function (data){   
                  if(data.code === '10000'){
                    data = data.responseBody.data;
                    if(data != 0){
                      that.moreshow = true;
                    }
                  }else{
                    that.$message({
                      type:"error",
                      message:data.message
                    })
                  }
            }
        }); 
    },
    goDetails(item){
      Lib.M.goDetail(item)
    },
    unfold(e){
      e = window.event||e;
      var target = e.target;
      var text = target.innerHTML;
      // var target_span = target.previousSibling.previousElementSibling;
      var target_span = target.previousElementSibling;
      if(text.indexOf('展开') != -1){
         target_span.className = 'font14 cursorPointer article_tit';
         target.innerHTML = '收起>'
      }else{
        target_span.className = 'omit2 font14 cursorPointer';
         target.innerHTML = '展开>'       
      }
    },
    goHours(item){
      // Lib.M.goHours(item)
      window.open('../hours/details.html?id=' + item.newsflashId)
    },
    tohours(){
      localStorage.setItem('newsflashId','');
      window.open('../hours/details.html?type=-1');
    },
    shareWeibo(item){
      Lib.M.share_weibo(item)
    },
    shareWeixin(e,key,item){
      const that = this;
       let detail_url = Lib.C.newsFlashUrl + item.newsflashId;
       // let detail_url ="http://kg.btc123.com/dist/views/share_hours/details.html?id=" + item.newsflashId;
      const wechat_list = Lib.M.noSignRequest({"url":detail_url})
      this.loading = true;
      var wechat_code = document.getElementById("wechat_code" + key);
      while(wechat_code.hasChildNodes()) 
          {
                wechat_code.removeChild(wechat_code.firstChild);
          }
      new QRCode(wechat_code, {
         text: detail_url,
         width: 100,
         height: 100,
         colorDark: "#000000",
         colorLight: "#ffffff"
      });
      that.loading = false;
      const codes = JQ('.weicode');
      for(var i = 0,l=codes.length;i<l;i++){
        codes[i].style.display = 'none'
      }
      var target = e.target;
      var code = target.firstChild;
      code.style.display = 'block';
    },
    leave(e){
      var target = e.target;
      var code = target.firstChild;
      code.style.display = 'none';
    },
  }
}
</script>

<style scoped>

.fontBold{
  font-weight: bold;
}
.hours24 {
  overflow: hidden;
  height:auto;
  margin-bottom:10px;
}

.hours24 h1{
  font-weight: 100;
  font-size:20px;
  height:26px;
  line-height: 26px;
  border-bottom:1px solid;
  border-color: rgba(238, 238, 238, 1);
  padding-bottom:10px;
}
.hours24 div{
  display: flex;
  flex-direction: row;
}
.hours24 a{
  font-size:14px;
}
.hours24 h1 span{
  margin-right:10px;
  font-size:18px;
}
.hours24 ul{
  margin-top:18px;
  padding-right:13px;
}
.hours24 ul li{
  position: relative;
}
.hours24 .list{
  display: flex;
  flex-direction: row;
}
.hours24 .list .news{
  display: flex;
  flex-direction: column;
  width:100%;
}
.hours24 .list .news:hover .list_share{
  opacity: 1;
}
.hours24 .dot{
  display: inline-block;
  width:14px;
  height:14px;
  border-radius: 50%;
  background:#1d87ff;
  margin-top:0px;
  margin-right:8px;
  position: absolute;
}
.list_line{
    width: 1px;
    background-color: rgba(238, 238, 238, 1);
    margin-left: 6px;
    margin-top: 14px;
}
.hours24 li span,.list_footer a{
  margin-left:18px;
}
.news .date{
  margin-bottom:13px;
  margin-top:-4px;
}
.news .omit2{
  width:95%;
  max-height:41px;
}
.news .article_tit{
  height:auto;
}
.news .list_footer{
  margin-top:5px;
  max-height:20px;
}
.list_footer{
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:15px;
}
.list_footer span{
  display: flex;
}
.list_footer .list_share{
  opacity: 1;
}
.list_footer i {
  font-size:20px;
  margin-top:-4px;
  margin-left:5px;
}
.list_footer .icon-weixin-copy:hover{
  color:#5fc346;
}
.list_footer .icon-logo-weibo:hover{
  color:#f0382a;
}
.news .weicode{
  display:none;
  position: absolute;
  width:222px;
  height:120px;
  background:#fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  left:65px;
  bottom:10px;
}
.hours24 ul li:nth-child(1) .weicode{
  bottom:-22px!important;
}
.weichat_code{
  position: absolute;
  top: 10px;
  left: -10px;
}
.share_warning{
  font-size:12px;
  color:#333!important;
  width: 100px;
    position: absolute;
    right: 5px;
    top: 20px;
}
</style>
<style>
.hours24 .getMore:hover{
    color:#1d87ff;
}
.color999{
  color:#999;
  font-family: "微软雅黑"
}
.list_share .el-loading-mask{
    top:45px;
    left:35px;
    background-color:transparent;
}
.el-scrollbar__wrap{
  overflow-x:hidden;
}
.el-scrollbar__bar.is-horizontal{
  display: none;
}
</style>
