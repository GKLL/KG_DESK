<template>
	<div  :style = "height">
    <hb-head ></hb-head>
    <div class = 'container flexR' >
      <div class = 'container_left hours24'>
        <div class = 'tit'>
          <span class = 'font18'>7x24小时快讯</span>
          <span @click = "selectType" class = 'font14 cursorPointer color999 titType'>全部</span>
          <span @click = "selectType" class = 'font14 cursorPointer color999 titType'>区块链快讯</span>
          <span @click = "selectType" class = 'font14 cursorPointer color999 titType'>金融快讯</span>
          <span @click = "selectType" class = 'font14 cursorPointer color999 titType'>股市快讯</span>
        </div>
          <div class = 'upload_more loadingnew' v-if = "moreNewsShow">
              <el-button class = 'loadingMore loadingNews' @click = "LoadNews" :loading = "moreLoading">有{{newsNuw}}条新快讯，请点击查看</el-button>
          </div>
        <p class = 'color999 font14' style = "margin-top:10px;margin-bottom:30px;">{{year}}.{{mouth}}.{{day}} 今天是星期{{weekDay}}</p>
          <ul>
            <li v-for = '(item,key) in hours24' :key="key">
              <div class = 'list'>
                <div class = 'list_l'>
                  <i class = 'dot'></i>
                  <p class = 'list_line'></p>
                </div>
                <div class = 'news' v-if = 'item.newsflashTitle != undefined'>
                  <span class = 'color999 date font14'>{{item.createDate}}</span>
<!--                   <span :class = 'hoursClass'  v-if = "item.remark == '证券时报网·快讯' || item.remark == '东方财富网'">{{item.newsflashTitle
           }}</span>       -->         
                  <span :class = 'hoursClass'>{{item.newsflashText
                    }}</span>
                    <span @click = 'unfold' class = 'color1d87 cursorPointer handle' v-if = "item.newsflashTitle.length > 120 || item.newsflashText.length > 120">展开></span>
                  <p class = 'list_footer'>
                    <a class = 'color999 fl' :href = 'item.newsflashLink' target="_blank" rel="nofollow" v-if = "item.newsflashLink != null && item.newsflashLink != ''">查看原文></a>
                    <span class = 'list_share fr'>
                      <span class = 'colorccc font14'>分享</span>
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
          <div class = 'upload_more' v-if = "loadmorebtn">
              <el-button class = 'loadingMore' @click = "LoadMore" :loading = "moreLoading">加载更多</el-button>
          </div>
      </div>
      <div class = 'container_right'>
            <div>
              <TopRank ></TopRank>
            </div>
      </div>
    </div>
    <other-footer  v-if = "listData !=null"/>
        <div v-if = "loadingShow" class = 'loadingGif'>
            <img src = '../../../assets/img/kg.gif'/>
        </div>
            <to-top />
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
import JQ from 'jquery';
import QRCode from 'qrcodejs2';
export default {
  data() {
    return {
      loading:true,
      loadingShow:true,
      height:{
        height:document.body.clientHeight + 'px'
      },
      listData:[{}],
      hot_articles:[{}],
      topList:[{}],
      right_hot:{},
      page:1,
      loadmorebtn:true,
      moreLoading:false,
      listShow:2,
      posImg:[{}],
      columnname:"",
      showList:true,


      hours24:[{}],
      hoursClass:"omit2 font14",
      newsflashType:'-1',
      year:"",
      mouth:'',
      day:'',
      weekDay:"",
      newsNuw:0,
      moreNewsShow:false,
      autoSaveInterval:null
    }
  },
  components: {HbHead,OtherFooter,ArticleList,TopRank,HotImg,RightImg,ToTop},
  //已成功挂载，相当ready()
  mounted(){
     this.loadingShow = false;
     const that = this;
     this.year = new Date().getFullYear();
     this.mouth = new Date().getMonth() + 1;
     this.day = new Date().getDate();
     // this.weekDay = new Date().getDay();
     switch(new Date().getDay()){
      case 0:
      this.weekDay = '天'
      break;
      case 1:
      this.weekDay = '一'
      break;      
      case 2:
      this.weekDay = '二'
      break;      
      case 3:
      this.weekDay = '三'
      break;      
      case 4:
      this.weekDay = '四'
      break;      
      case 5:
      this.weekDay = '五'
      break;     
      case 6:
      this.weekDay = '六'
      break;
     }
     // const id =localStorage.getItem('newsflashId');
     const type = Lib.M.getUrlQuery('type');
     this.newsflashType = type;
     const id = Lib.M.getUrlQuery('id');
     const titType = JQ('.titType')
      let indexTitle = document.getElementsByTagName('title')[0];
     if(id != '' && id != null){
         const list = Lib.M.dataRequest({
          'newsflashId':id,
         });
         Lib.M.ajax({
                'type':'post',
                'url':'/newsFlash/getNewsFlashDetail',
                'data':list,
                'success':function (data){
                  // self.ajaxResult = data;
                  const datalist = data.responseBody.data;
                  data = data.responseBody.data;
                  if(datalist.length !== 0){
                    that.hours24 = datalist;
                    indexTitle.innerHTML = data[0].newsflashTitle;
                    const typeid = datalist[0].newsflashType;
                    
                    for(var i =0,l = titType.length;i < l;i++){
                      titType[i].className = 'font14 cursorPointer color999 titType'
                    }
                switch(typeid){
                  case '-1':
                    titType[0].className = 'font14 cursorPointer color999 titType active';
                  break;
                  case 0:
                    titType[1].className = 'font14 cursorPointer color999 titType active';
                  break;
                  case 1:
                    titType[2].className = 'font14 cursorPointer color999 titType active';
                  break;
                  case 2:
                    titType[3].className = 'font14 cursorPointer color999 titType active';
                  break;
                  default:
                };
                    that.loadmorebtn = false;
                  }else{
                    that.hidden = false
                  }
                  setTimeout(()=>{
                    // self.$vux.loading.hide();
                  },1000);
            }
        });
     }else{
      // titType[0].className = 'font14 cursorPointer color999 titType active';
        const list = Lib.M.dataRequest({
        'currentPage':1,
        'pageSize':20,
        'newsflashType':type
       });


       Lib.M.ajax({
              'type':'post',
              'url':'/newsFlash/getNewsFlashListByType',
              'data':list,
              'success':function (data){
                const totalPage = data.responseBody.page.totalPage;
                const currentPage = data.responseBody.page.currentPage;
                const datalist = data.responseBody.page.data;
                that.requestTime = data.responseBody.requestTime;
                that.loadmorebtn = totalPage == currentPage ? false : true;
                data = data.responseBody.data;
                if(datalist.length !== 0){
                  that.hours24 = datalist;
                    /*  this.autoSaveInterval = window.setInterval(function() {
                                 that.getNumberUnread(that.requestTime)
                      }, 60000);*/
                      //websocket
                      var footerSocket;
                      var target = "wss://snatch.kg.com/newsFlashSocket";
                      let sendType = 'allCount';
                      switch(that.newsflashType){
                           case '-1':
                              sendType = 'allCount';
                            break;
                            case '0':
                              sendType = 'qukuailianCount';
                            break;
                            case '1':
                             sendType = 'jinrongCount';
                            break;
                            case '2':
                              sendType = 'gushiCount';
                            break;
                            default:
                      }

                          if (!!window.ActiveXObject || "ActiveXObject" in window){    
                                }else{    
                               //顶部币种行情
                                footerSocket = new WebSocket(target);
                                footerSocket.onopen = function () {
                                    footerSocket.send(sendType);
                                };
                                footerSocket.onmessage = function (data) {
                                  data = data.data;
                                   that.newsNuw =  parseInt(that.newsNuw) + parseInt(data)
                                   that.moreNewsShow = that.newsNuw != 0 ?true : false;
                                  
                                };
                          }
                }else{
                  that.hidden = false
                }
                setTimeout(()=>{
                },1000);
          }
      });   
                     for(var i =0,l = titType.length;i < l;i++){
                      titType[i].className = 'font14 cursorPointer color999 titType'
                    }
                switch(type){
                  case '-1':
                    titType[0].className = 'font14 cursorPointer color999 titType active';
                  break;
                  case '0':
                    titType[1].className = 'font14 cursorPointer color999 titType active';
                  break;
                  case '1':
                    titType[2].className = 'font14 cursorPointer color999 titType active';
                  break;
                  case '2':
                    titType[3].className = 'font14 cursorPointer color999 titType active';
                  break;
                  default:
              };
     }
  },
  //相关操作事件
  methods: {
    LoadNews(){
      const that = this;
        const list = Lib.M.dataRequest({
        'currentPage':1,
        'pageSize':20,
        'newsflashType':this.newsflashType
       });
       Lib.M.ajax({
              'type':'post',
              'url':'/newsFlash/getNewsFlashListByType',
              'data':list,
              'success':function (data){
                const totalPage = data.responseBody.page.totalPage;
                const currentPage = data.responseBody.page.currentPage;
                const datalist = data.responseBody.page.data;
                that.requestTime = data.responseBody.requestTime;
                that.loadmorebtn = totalPage == currentPage ? false : true;
                that.moreNewsShow =  false;
                that.newsNuw =0;
                 if(datalist.length !== 0){
                  that.hours24 = datalist;
                }
          }
      });    
    },
    getNumberUnread(createDate){
      const that = this;
        const list = Lib.M.dataRequest({
            'newsflashType':this.newsflashType,
            'createDate':createDate,
        });
        Lib.M.ajax({
                'type':'post',
                'url':'/newsFlash/getNumberUnread',
                'data':list,
                'success':function (data){
                  const dataNum = data.responseBody.data;
                  that.moreNewsShow = dataNum == 0 ? false : true;
                  if(dataNum != 0){
                    that.newsNuw = dataNum
                  }
            }
        }); 
    },

    selectType(e){
      const that = this;
      localStorage.setItem('newsflashId','');
      const type = Lib.M.getUrlQuery('type');
      this.page = 1;
      var target = e.target;
      const titType = JQ(".titType");
      for(var i =0,l = titType.length;i < l;i++){
        titType[i].className = 'font14 cursorPointer color999 titType'
      }
      target.className = 'font14 cursorPointer color999 titType active';

      var text = target.innerHTML;
      switch(text){
        case '全部':
        this.newsflashType = '-1'
        break;
        case '区块链快讯':
          this.newsflashType = '0'
        break;
        case '金融快讯':
          this.newsflashType = '1'
        break;
        case '股市快讯':
           this.newsflashType = '2'
        break;
        default:
      };
     // if(type == ''){
        window.location.href = '../hours/details.html?type=' + this.newsflashType;
        // return
      // }
      const list = Lib.M.dataRequest({
        'currentPage':1,
        'pageSize':20,
        'newsflashType':this.newsflashType
       });
       Lib.M.ajax({
              'type':'post',
              'url':'/newsFlash/getNewsFlashListByType',
              'data':list,
              'success':function (data){
                const totalPage = data.responseBody.page.totalPage;
                const currentPage = data.responseBody.page.currentPage;
                that.requestTime = data.responseBody.requestTime;
                const datalist = data.responseBody.page.data;
                that.loadmorebtn = totalPage == currentPage ? false : true;
                data = data.responseBody.data;
                if(datalist.length !== 0){
                  that.hours24 = datalist;

                }else{
                  that.hidden = false
                }
          }
      });
    },
    shareWeibo(item){
      Lib.M.share_weibo(item)
    },
    shareWeixin(e,key,item){
      const detail_url = Lib.C.newsFlashUrl + item.newsflashId;
      // const detail_url = "http://kg.btc123.com/dist/views/share_hours/details.html?id=" + item.newsflashId;
      const wechat_list = Lib.M.noSignRequest({"url":detail_url})
      this.loading = true;
            //调后台接口 返回config 配置
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
      this.loading = false;                    
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
    toShare(item){
      window.open('../share_hours/details.html?id=' + item.newsflashId)
    },
    LoadMore(){
      const me = this;
      this.page +=1;
      const sub_column_id = Lib.M.getUrlQuery('c');
        const list = Lib.M.dataRequest({
            'currentPage':this.page,
            'pageSize':20,
            'newsflashType':this.newsflashType
        })
      //加载更多文章
      me.moreLoading = true
      Lib.M.ajax({
            'type':'post',
            'url':'newsFlash/getNewsFlashListByType',
            "data":list,
            'success':function (data){
                const totalPage = data.responseBody.page.totalPage;
                const currentPage = data.responseBody.page.currentPage;
                const datalist = data.responseBody.page.data;
              me.loadmorebtn = totalPage == currentPage ? false : true;
                if(datalist.length == 0){
                        me.$message({
                              message:'没有更多数据了...',
                              type: 'info'
                        });
                        me.loadmorebtn = false;
              }
                for(var i in datalist){
                    me.hours24.push(datalist[i])
                       
              }
            me.moreLoading = false 
        }
      });   
    },
        unfold(e){
      var target = e.target;
      var text = target.innerHTML;
      // var target_span = target.previousSibling.previousElementSibling;
      var target_span = target.previousElementSibling;
      if(text.indexOf('展开') != -1){
         target_span.className = 'font14  article_';
         target.innerHTML = '收起>'
      }else{
          target_span.className = 'omit2 font14 ';
         target.innerHTML = '展开>'       
      }
    },
  }
}
</script>

<style scoped>
.container{
  padding-top:11px;
}

.container_left{
    width:70%;
}
.container_right{
 margin-left: 20px;
 display: flex;
  flex-direction: column;
  width:30%;
  margin-top:34px;
  min-height:700px;
}
.breadcrumb {
  position: relative;
  margin-top:15px;
  padding:10px;
  border-bottom: 1px solid #f0f2f7;
}
.rightImg{
   position: relative;
  /*margin-top:85px;*/
  padding:20px 0 20px 0px;
}
.breadcrumb {
  font-size:16px!important;
}

.rightImg img {
  width:300px!important;
  height:100%;

}
.listItem a {
  font-size:16px;
  color:#1d87ff;

}
.listItem {
   padding: 20px 0;
   border-bottom: 1px solid #f0f2f7
}
.listItem .word{
  height:60px;
  line-height:30px;
  font-size:14px;
  color:#666666;
  margin-top: 20px;
}
.itemFooter{
  font-size:14px;
  margin-top:20px; 
}
/*图片推荐位*/
.hot_imgs{
  width:98%;
  display: flex;
  flex-direction: column;
}



.hours24 {
  overflow: hidden;
  height:auto;
  margin-bottom:10px;
  min-height: 774px;
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
  /*color:#1d87ff;*/
  font-size:14px;
}
.hours24 h1 span{
  margin-right:10px;
  font-size:18px;
}
.hours24 ul{
  margin-top:18px;
}
.hours24 .list{
  display: flex;
  flex-direction: row;
}
.hours24 .list .news{
  display: flex;
  flex-direction: column;
  /*margin-left:20px;*/
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
.news .article_{
  /*margin-bottom:15px;*/
  height:auto;
}
.news .list_footer{
  margin-top:15px;
}
.list_footer{
  /*display: flex;*/
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:15px;
}
.list_footer span{
  display: flex;
}
.list_footer .list_share{
  /*display: none;*/
  opacity: 1;
}
.list_footer i {
  font-size:24px;
  margin-top:-7px;
  margin-left:5px;
}
.list_footer .icon-weixin-copy:hover{
  color:#5fc346;
}
.list_footer .icon-logo-weibo:hover{
  color:#f0382a;
}
.tit{
  margin-top:34px;
}
.tit .font14{
  line-height: 27px;
}
.tit .font18{
  margin-right:45px;
  font-weight: bold;
}
.tit .font14{
  margin-right:33px;
}
.news .weicode{
  display:none;
  position: absolute;
  width:222px;
  height:120px;
  background:#fff;
  z-index:999;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
.upload_more{
  width:100%;
}
.active{
  color:#1d87ff;
  border-bottom:2px solid #1d87ff;
  padding-bottom:2px;
}
.loadingnew{
  padding-top:14px;
}
.loadingNews{
  background:#4FA5FF;
  border-color:#4FA5FF;
  color:#fff;
}
.loadingNews:hover,.loadingNews:active,.loadingNews:focus{
    background:#4FA5FF;
  border-color:#4FA5FF;
  color:#fff;
}
</style>
<style>
  .list_share .el-loading-mask{
    top:45px;
    left:35px;
    background-color:transparent;
}
.upload_more button{
  width:100%;
  border-color: #dfdfdf;
  color:#999;
}
</style>
<style lang="less" scoped>
@media only screen and (max-width: 768px) {
  .container{padding-top: 11px;
    .tit{margin-top: 9px;}
  }
}
</style>
