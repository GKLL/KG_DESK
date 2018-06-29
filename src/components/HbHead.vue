<template>
  <div >
    
    <div class = 'topNav'>
      <div class="marquee_box">
       <div  id="pcMarketBar" ref="con1" style="width:100%;white-space: nowrap;" class="pcMarketBar" >
          <div id="demo" class="qimo8">
        <div class="qimo">
            <div id="demo1">
                <div class="ul">
                    <div class="li">
                        <div v-for="(item, index) in tickData" :key="index"   :class="{grayBlock: item.riseRate < 0, firstDiv: index == 0}">
                          <p class="flexBoxMarquee">
                            <span @click = "toTradeUrl(item)" style = "color:#fff" class = 'cursorPointer article_tit'>{{item.coinType}}/{{item.name}}</span>
                            <span  v-if = "item.riseRate >= 0">+{{item.riseRate}}%</span>
                            <span  v-else ><span>{{item.riseRate}}%</span></span>
                          </p>
                          <p>
                            <span v-if = "item.riseRate >= 0" style = "color:#F1444C;margin-left: -3px;">￥{{item.price}}</span>
                            <span v-else  style = "color:#3BB982;margin-left: -3px;">￥{{item.price}}</span>
                            <span class="frIcon"><i class="statusIcon statusIcon3" :class="{statusIconGreen: item.riseRate >= 0, statusIconRed: item.riseRate < 0}"></i></span>
                          </p>
          </div>
                    </div>
                    <div class="li">
                        <div  v-for="(it, idx) in tiketMarkData.hsMarket" :key="idx" :class="{isDesc: it.increPer <0, grayBlock: it.increPer <0}">
            <p class="flexBoxMarquee">
              <span >{{it.stockName}}</span>
              <span :class="{isRed: it.increPer > 0}"><span style="color:#fff;" v-if="it.increPer> 0">+</span>{{it.increPer}}%</span>
            </p>
            <p class="statusDetail statusDetail2" :class="{isRed: it.increPer > 0}">
              <span>￥{{it.nowPri}}</span>
              <span class="frIcon"><i class="statusIcon" :class="{statusIconRed: it.increPer <0, statusIconGreen: it.increPer >0}"></i></span>
              
              </p>
          </div>
                    </div>
                    <div class="li">
                        <div  v-for="(it, idx) in tiketMarkData.ggMarket" :key="idx" :class="{isDesc: it.increPer <0, grayBlock: it.increPer <0}">
            <p class="flexBoxMarquee"><span >{{it.stockName}}</span>
            <span class="fr" :class="{isRed: it.increPer > 0}"><span style="color:#fff;" v-if="it.increPer> 0">+</span>{{it.increPer}}%</span>
            </p>
            <p class="statusDetail statusDetail2" :class="{isRed: it.increPer > 0}">
              <span >￥{{it.nowPri}}</span>
              <span class="frIcon"><i class="statusIcon" :class="{statusIconRed: it.increPer <0, statusIconGreen: it.increPer >0}"></i></span>
              
              </p>
          </div>
                    </div>
                    <div class="li">
                      <div  v-for="(it, idx) in tiketMarkData.mgMarket" :key="idx" :class="{isDesc: it.increPer <0, grayBlock: it.increPer <0}">
            <p class="flexBoxMarquee"><span >{{it.stockName}}</span>
              <span class="fr" :class="{isRed: it.increPer > 0}"><span style="color:#fff;" v-if="it.increPer> 0">+</span>{{it.increPer}}%</span>
            </p>
            <p class="statusDetail statusDetail2" :class="{isRed: it.increPer > 0}">
              <span>￥{{it.nowPri}}</span>
              <span class="frIcon"><i class="statusIcon" :class="{statusIconRed: it.increPer <0, statusIconGreen: it.increPer >0}"></i></span>
            </p>
          </div>
                    </div>
                </div>
            </div>
            <div id="demo2"></div>
        </div>
    </div>
      </div>
      </div>



<!-- 移动端行情无缝滚动开始 -->
         <div id="gongao"> 
            <div style="width:100%;height:30px;white-space: nowrap;overflow:hidden;" id="scroll_div" class="scroll_div"> 
            <div id="scroll_begin"> 
                <span v-for = '(item,key) in tickData' :key = "key">
                    <span @click = "toTradeUrl(item)" style = "color:#fff;margin-left:18px" class = 'cursorPointer article_tit'>{{item.coinType}}-{{item.name}}:</span>
                    <span style = "color:#fff">￥{{item.price}}</span>
                    <span  v-if = "item.riseRate >= 0"><span style = "color:#F24C4A">+{{item.riseRate}}%</span></span>
                    <span v-else><span   style = "color:#39FFA9">{{item.riseRate}}%</span></span>
                </span>
               <!--股市动态图-->
               
                <span class="mobileMarqueeBar" v-for="(it, index) in tiketMarkData.hsMarket" :key="'hsMarket1' + index">
                  <span>{{it.stockName}}</span><span>￥{{it.nowPri}}</span><span class="redRate" :class="{greenRate: it.increPer>0}" v-if="it.increPer>= 0">+</span><span class="redRate" :class="{greenRate: it.increPer>0}">{{it.increPer}}%</span>
                </span>
              
                <span class="mobileMarqueeBar" v-for="(it, index) in tiketMarkData.ggMarket" :key="'ggMarket1'+index">
                  <span>{{it.stockName}}</span><span>￥{{it.nowPri}}</span><span class="redRate" :class="{greenRate: it.increPer>0}" v-if="it.increPer>= 0">+</span><span class="redRate" :class="{greenRate: it.increPer>0}">{{it.increPer}}%</span>
                </span>

  
                <span class="mobileMarqueeBar" v-for="(it, index) in tiketMarkData.mgMarket" :key="'mgMarket1'+index">
                  <span>{{it.stockName}}</span><span>￥{{it.nowPri}}</span><span class="redRate" :class="{greenRate: it.increPer>0}" v-if="it.increPer>= 0">+</span><span class="redRate" :class="{greenRate: it.increPer>0}">{{it.increPer}}%</span>
                </span> 
            </div> 
            <div id="scroll_end">
              <span v-for = '(item,key) in tickData' :key = "key">
                    <span @click = "toTradeUrl(item)" style = "color:#fff;margin-left:18px" class = 'cursorPointer article_tit'>{{item.coinType}}-{{item.name}}:</span>
                    <span style = "color:#fff">￥{{item.price}}</span>
                    <span v-if = "item.riseRate >= 0" style = "color:#39FFA9">+{{item.riseRate}}%</span>
                    <span v-else  style = "color:#F24C4A">{{item.riseRate}}%</span>
               </span>
               <!--股市动态图-->
         
                <span class="mobileMarqueeBar" v-for="(it, index) in tiketMarkData.ggMarket" :key="'ggMarket2' + index">
                  <span>{{it.stockName}}</span><span>￥{{it.nowPri}}</span><span class="redRate" :class="{greenRate: it.increPer>0}" v-if="it.increPer> 0">+</span><span class="redRate" :class="{greenRate: it.increPer>0}">{{it.increPer}}%</span>
                </span>
         
                <span class="mobileMarqueeBar" v-for="(it, index) in tiketMarkData.hsMarket" :key="'hsMarket2'+ index">
                  <span>{{it.stockName}}</span><span>￥{{it.nowPri}}</span><span class="redRate" :class="{greenRate: it.increPer>0}" v-if="it.increPer> 0">+</span><span class="redRate" :class="{greenRate: it.increPer>0}">{{it.increPer}}%</span>
                </span>
        
                <span class="mobileMarqueeBar" v-for="(it, index) in tiketMarkData.mgMarket" :key="'mgMarket2'+ index">
                  <span>{{it.stockName}}</span><span>￥{{it.nowPri}}</span><span class="redRate" :class="{greenRate: it.increPer>0}" v-if="it.increPer> 0">+</span><span class="redRate" :class="{greenRate: it.increPer>0}">{{it.increPer}}%</span>
                </span>  
            </div> 
            </div> 
        </div>  
        <!-- 移动端行情无缝滚动结束 -->
    </div>
    <!-- 手机端头部 -->
    <div class = 'mobileTopMenu' v-if ="mobileTopMenu"  @touchmove = "mobileTopMenuScroll">
            <div class = 'login' >
              <img class = 'loginBg' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/moblieLoginBg.jpg" />
              <!-- <img class = 'loginBg' src = "../assets/img/moblieLogin.png" /> -->
              <img class = 'loginAvatar' src = '../assets/img/avatar.png'/>
              <div class = 'loginContainer'>
                <a  v-if = "userId == null" @click = "moblile_toLogin(1)">登录</a>
                <a  v-if = "userId == null" @click ="moblile_toLogin(2)">注册</a>
                <a v-if = "userId != null" href = '../account/details.html#/myTreasure' class = 'omit1'>{{userName}}</a>
              </div>
            </div>
            <div @click = 'exitLogin' class = 'exitLogin' v-if = "userId != null">退出登录</div>
    </div>
    <div class = 'mobile_mask' v-if = "mobileTopMenu" @click = "mobileTopMenu = false"></div>








    <div class = 'nav transNav' id = 'fixedNav'>
      <div class="grid-content  container">
          <i @click = "mobileTopMenu = true" class = 'icon iconfont icon-mulu font28 '></i> 

           <!-- 头部LOGO 开始-->
          <div class = 'header_logo'>
            <img @click = "goIndex" class = 'nav_logo cursorPointer' src = '../assets/img/logo.png' />
            <span @click = 'goIndex' class = 'nav_logo_title cursorPointer'>千氪</span>
          </div>
          <!-- 头部LOGO 结束-->
          <div v-if = "menuShow" class = 'menu_nav'>
              <div class = 'parentMenu'>
                 <a href = '../index/list.html' class = 'menu_normal parentcolumn'>首页</a>
              </div>
              <div class = 'parentMenu' :key = "key" v-for = "(item,key) in index_nav"   @click = "openSub($event,key)"  @mouseenter = "openSub($event,key)" @mouseleave = 'hiddenSub(key)'>
                  <img v-if = "item.columnName == '看氪'" class = 'hot_new' src = '../assets/img/new.png'>
                  <a   class = 'parentcolumn' @click = "toSubColumn($event,item,key)">{{item.columnName}}</a>
                  <i v-if = "item.list !=null" :id = "'navIcon' + key" class = 'icon iconfont icon-arrowdropdown navIcon'></i>
                  <ul v-if = "item.list !=null" :id = "'sub' + key" class = 'subItem'>
                    <!-- <i class = 'sanjiao'></i> -->
                    <li  @click = "toSubColumn($event,sub,key)" :key = "index" v-for = "(sub, index) in item.list">
                      <a class = 'active-a'>{{sub.columnName}}</a>   
                    </li>
                  </ul>
              </div>
              
          </div>
          <!-- 头部导航 结束-->

      <div class = 'navHandle'>
          <!-- 搜索按钮 开始-->
          <div class = 'pcSearch'>
            <i  v-if = "menuShow" @click = "Search"  class = 'icon iconfont icon-sousuo   cursorPointer'></i>
          </div>
          <div class = 'mobileSearch'>
            <i  v-if = "menuShow" @click = "Search"  class = 'icon iconfont icon-sousuo   cursorPointer'></i>
          </div>
          <!-- 搜索结束 开始-->




          <!-- 写文章按钮 开始 -->
            <div class = 'writeArticle cursorPointer' v-show ="!elShow" @click = "toWrite">
              <span>写文章</span>
              <!-- <img src = '../assets/img/write.png'/> -->
            </div>
              <span v-show ="!elShow" @click="toAppDownload" @mouseover="appDownloadshow" @mouseout="appDownloadshide" class="cursorPointer appDownload">APP下载</span>
              
              <div v-show="appDownload" class="appDown">
                <i class="sanjiao"></i>
                <span id = 'app_download_code' class = 'app_download_code'></span>
                <div>
                  <p>千氪财经APP</p>
                  <p>Android/ios</p>
                </div>
              </div>
          <!-- 写文章按钮 结束 -->  

           <!-- <el-button @click="changeRed">默认按钮</el-button> -->
          <!-- 登录框 开始 -->
            <ul class = 'topNav_r fr loginHandle' v-show="!elShow">
              <li class = 'fl cursorPointer'    v-if = "userId == null ? true : false"><a @click = "toLogin">登录</a><a @click ="toRegister">/注册</a></li>
              <li class = 'fl cursorPointer userContainer' v-else >
                <a v-if="redDot" class = 'omit1 headerUserName' id="invite">欢迎您，{{userName}}</a>
                <a v-else class = 'omit1 headerUserName' >欢迎您，{{userName}}</a>
                <ul class = 'navAccount'>
                  <li><a href = '../account/details.html#/myTreasure'>我的财富</a></li>
                  <li><a href = '../account/details.html#/column'>我的专栏</a></li>
                  <li><a href = '../account/details.html#/collect'>我的收藏</a></li>
                  <li><a href = '../account/details.html#/comment'>我的评论</a></li>
                  <li><a href = '../account/details.html#/account_safe'>账号与安全</a></li>
                  <li v-if="redDot"><a href = '../account/details.html#/invite_stu' id="invite">邀请与收徒</a></li>
                  <li v-else><a href = '../account/details.html#/invite_stu'>邀请与收徒</a></li>
                  <li><a @click = "Quit">退出登录</a></li>
                </ul>
              </li>         
            </ul>
      </div>
          <!-- 登录框 结束 -->
          <!-- 搜索框 开始-->
          <transition name="el-zoom-in-center" v-show="elShow">
            <div :style = "{display:searchShow}"   class="transition-box search">
                <i @click = "closeSearch" class = 'icon iconfont icon-cha   cursorPointer'></i>
                <el-input
                v-if = "searchShow == 'block'"
                  style = "display:inline-block;width:340px"
                  v-model="searchValue"
                  placeholder="搜索"
                  @keyup.enter.native="toSearch"
                  id = 'searchInput'
               
                />
                <i @click = "toSearch" class = 'icon iconfont icon-sousuo   cursorPointer'></i> 
            </div>
          </transition>
          <!-- 搜索框 结束-->
      </div>
      <div class = 'headerMobile '>
        <div class="lr_nb">
          <div class="slider_wrap nav_line" @scroll = 'topOnScroll'>
            <div class="wx_items">
              <div  class="item_cell"><a href = '../index/list.html' class = 'topparentcolumn' >首页</a></div>
              <div class="item_cell"  v-for="(item, index) in top_nav" :key="index"> <a :id ="'top' +index" class = 'topparentcolumn' @click = "toSubColumn($event,item,key)">{{item.columnName}}</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if = "loadingShow" class = 'loadingGif'>
            <img src = '../assets/img/kg.gif'/>
    </div>
    <!-- <img class = 'pickGif cursorPointer' loop = "-1" src = '../assets/img/pick.png' @click = "toPick"/> -->
    <!-- 登录 -->
    <login class = 'login_register_modal' :visible = "loginVisible" :toRegister = "toRegister" :toRetrieve = "toRetrieve" :cancel = "cancelLogin" :toLoginFast = "toLoginFast" :aliBlock = "aliBlock" :showGetCandy = "showGetCandy"
    />
    <login-fast class = 'login_register_modal' :visible = "loginfastVisible" :toRegister = "toRegister"  :toLogin = "toLogin" :cancel = "cancelLogin" :isSlide = "isSlide" :slideInfo = "slideInfo" :handleSlide = "handleSlide" :loginfastshow = "loginfastshow"
    />
    <!-- 注册 -->
    <register class = 'login_register_modal' :visible = "registerVisible" :toLogin = "toLogin" :cancel = "cancelLogin" :aliBlock = "aliBlock" :slideInfo = "slideInfo" :handleSlide = "handleSlide" :registershow = "registershow"/>
    <!-- 找回密码 -->
    <retrieve class = 'login_register_modal' :visible = "retrieveVisible" :cancel = "cancelLogin" :aliBlock = "aliBlock"
      :slideInfo = "slideInfo"  :handleSlide = "handleSlide" :retrieveshow = "retrieveshow"
    />

  </div>
</template>

<script>
import Lib from "assets/js/Lib";
import login from "components/Login";
import loginFast from "components/LoginFast";
import register from "components/Register";
import retrieve from "components/Retrieve";
import "assets/css/common.css";
import JQ from "jquery";
import conf from "./../assets/js/conf"; // 引入邀请链接
import QRCode from "qrcodejs2"; // 引入生成二维码插件
import {index_nav,top_nav} from 'assets/js/header';
export default {
  components: { login, register, retrieve, loginFast },
  data() {
    return {
      topActiveName:'首页',
      activeName:'首页',
      showSub:false,
      isIndex: true,
      currentMune: '0',
      retrieveshow: false,
      registershow: false,
      loginfastshow: false,
      loadingShow: true,
      elShow: false,
      mobileTopMenu: false,
      height: {
        height: document.body.clientHeight + "px"
      },
      tickData: [
        {
          coinType: "BTC",
          name: "比特币",
          price: "--",
          riseRate: "--",
          tradeUrl: "https://www.btc123.com/trades"
        },
        {
          coinType: "ETH",
          name: "以太坊",
          price: "--",
          riseRate: "--",
          tradeUrl: "https://www.btc123.com/trades"
        },
        {
          coinType: "BCH",
          name: "比特现金",
          price: "--",
          riseRate: "--",
          tradeUrl: "https://www.btc123.com/trades"
        },
        {
          coinType: "TV",
          name: "钛值",
          price: "--",
          riseRate: "--",
          tradeUrl: "https://www.btc123.com/trades"
        }
      ],
      tiketMarkData: {
        ggMarket: [
          {
            stockName: "恒生指数",
            nowPri: '--',
            increPer: '--'
          },
          {
            stockName: "红筹指数",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "国企指数",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "标普香港创业板指数",
            nowPri: "--",
            increPer: "--"
          }
        ],
        mgMarket: [
          {
            stockName: "道琼斯指数",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "纳斯达克指数",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "标普500指数",
            nowPri: "--",
            increPer: "--"
          }
        ],
        hsMarket: [
          {
            stockName: "上证指数",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "深证成指",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "沪深300",
            nowPri: "--",
            increPer: "--"
          },
          {
            stockName: "创业板指",
            nowPri: "--",
            increPer: "--"
          }
        ]
      },
      top_nav: [{}],
      index_nav: [{}],
      more_nav: [{}],
      user: "",
      password: "",
      activeIndex: localStorage.getItem("menu_key"),
      menuShow: true,
      searchShow: "none",
      restaurants: [],
      searchValue: "",
      timeout: null,
      loginVisible: false,
      registerVisible: true,
      retrieveVisible: true,
      loginfastVisible: true,
      slideVisible: true,
      userName: null,
      userId: null,
      searchValue_lately: [],
      roleId: "0",
      autofocus: true,
      //滑块验证
      aliBlock: false,
      kg_desk_loginBonusStatus: null,
      kg_desk_token: null,
      candyVisible: false,
      candyMaskVisible: false,
      getCandyVisible: false,
      search_maskVisible: false,
      redDot: false,
      isSlide: false,
      slideInfo: {
        session: "",
        sig: "",
        token: "",
        scene: ""
      },
      initTop: 0,
      keyPath: "",
      appDownload: false
    };
  },
  props: {
    navId: {},
    showLogin: {},
    columnId:{}
  },
  created() {
    const that = this;
    if (localStorage.getItem("tickData")) {
      that.tickData = JSON.parse(localStorage.getItem("tickData"));
    }
    if (localStorage.getItem("tiketMarkData")) {
      that.tiketMarkData = JSON.parse(localStorage.getItem("tiketMarkData"));
    }
    if (localStorage.getItem("kg_desk_userId")) {
      this.watchRedDot();
      if (localStorage.getItem("discipleReminder") > 0) {
        this.redDot = true;
      }
    }
    setInterval(() => {
      if (localStorage.getItem("discipleReminder") == 0) {
        this.redDot = false;
      }
    }, 1000);
      this.index_nav = index_nav;
    this.top_nav = top_nav;
  },
  //已成功挂载，相当ready()
  mounted() {
    const that = this;
    that.loadingShow = false;
    var curUrlId = this.columnId != undefined ? this.columnId : window.location.href.split('c=')[1];
    var _url = window.location.href;
    var localMenu =  localStorage.getItem('localMenu', this.currentMune);
    // console.log('curUrlId',curUrlId)
    if(curUrlId || localMenu) {
      this.isIndex = false;
      this.currentMune = curUrlId ? curUrlId : localMenu;
      localStorage.setItem('localMenu', this.currentMune)
    }
    if(_url.indexOf('index') != -1 || _url == 'https://www.kg.com' || _url == 'http://www.kg.com'){
      this.activeName = '首页'
      this.topActiveName = '首页'
    }else if(curUrlId != undefined){
      for(var i in index_nav){
        if(index_nav[i].list == null){
          if(index_nav[i].columnId == curUrlId){
            this.activeName = index_nav[i].columnName
          }
        }else{
          let list = index_nav[i].list;
          for(var j in list){
            if(list[j].columnId == curUrlId){
               this.activeName = index_nav[i].columnName
            }
          }
        }
      }
      for(var i in top_nav){
        if(top_nav[i].columnId == curUrlId){
          this.topActiveName = top_nav[i].columnName
        }
      }
    }else if(_url.indexOf('preview') != -1 || _url.indexOf('publish') != -1 || _url.indexOf('editor') != -1 || _url.indexOf('account') != -1 || _url.indexOf('uploadVideoEditor') != -1 || _url.indexOf('uploadVideo') != -1 || curUrlId == ''||curUrlId == undefined || _url.indexOf('author') != -1){
      this.activeName = ''
      this.topActiveName = ''
    }
    const parentcolumn = JQ(".parentcolumn");
    const topparentcolumn = JQ(".topparentcolumn");
    let subPosition = {};
    for(var i =0,l=parentcolumn.length;i<l;i++){
      if(parentcolumn[i].innerHTML == this.activeName){
        parentcolumn[i].className = 'parentcolumn activeColumn'
      }
    }
    for(var i = 0,l=topparentcolumn.length;i<l;i++){
      if(topparentcolumn[i].innerHTML == this.topActiveName){
        topparentcolumn[i].className = 'topparentcolumn topactiveColumn'
      }
    }
    this.browserRedirect();
    this.registerVisible = false;
    this.retrieveVisible = false;
    this.loginfastVisible = false;
    this.slideVisible = false;
    const menu_key = localStorage.getItem("menu_key");

    let url = window.location.href;
    let urlIndex = url.indexOf("search");
    let _index = url.indexOf("index");
    let _account = url.indexOf("account");
    let _publish = url.indexOf("publish");
    let _editor = url.indexOf("editor");
    this.kg_desk_loginBonusStatus = localStorage.getItem(
      "kg_desk_loginBonusStatus"
    );
    this.kg_desk_token = localStorage.getItem("kg_desk_token");
    if (this.kg_desk_token == null) {
      if (
        _index != "-1" ||
        url == "https://www.kg.com/" ||
        url == "http://www.kg.com/"
      ) {
        this.candyVisible = true;
        this.candyMaskVisible = true;
      }
    }
    this.roleId = localStorage.getItem("kg_desk_roleId");
    window.addEventListener("scroll", this.onScroll);

    this.restaurants = this.loadAll();

    

    var demo = document.getElementById("demo");
    var demo1 = document.getElementById("demo1");
    var demo2 = document.getElementById("demo2");
    demo2.innerHTML = document.getElementById("demo1").innerHTML;
    function Marquee2() {
      if (demo.scrollLeft - demo2.offsetWidth >= 0)
        demo.scrollLeft -= demo1.offsetWidth;
      else demo.scrollLeft++;
    }
    var myvar = setInterval(Marquee2, 30);
    demo.onmouseout = function() { //PC端滚动
      myvar = setInterval(Marquee2, 30);
    };
    demo.onmouseover = function() {
      clearInterval(myvar);
    };
    Marquee2();

    //读取token userId
    this.userId = localStorage.getItem("kg_desk_userId");
    this.userName = localStorage.getItem("kg_desk_userName");
    //读取搜索词

    this.searchValue =
      urlIndex == "-1" ? "" : localStorage.getItem("kg_searchValue");
    this.searchShow = urlIndex == "-1" ? "none" : "block";
    this.elShow = urlIndex == "-1" ? false : true;
    this.menuShow = urlIndex == "-1" ? true : false;
    if (menu_key != null) {
      if (_index != "-1") {
        this.activeIndex = "0";
        localStorage.setItem("menu_key", 0);
      } else if (_account != "-1" || _publish != "-1" || _editor != "-1") {
        this.activeIndex = "-1";
      }
    } else {
      this.activeIndex = "0";
      localStorage.getItem("menu_key");
    }

    var tiketSoket;
    var urlTiket = "wss://snatch.kg.com/indexPriceSocket";
    // var urlTiket = "ws://172.16.1.159:8085/indexPriceSocket";
    tiketSoket = new WebSocket(urlTiket);
    tiketSoket.onopen = function() {
      tiketSoket.send("index_Price");
    };
    tiketSoket.onmessage = function(data) {
      var allData = JSON.parse(data.data);
      if (allData.ifHave != undefined) {
      } else {
        // 分别缓存数据
        if (allData.coinTicker) {
          localStorage.setItem("tickData", JSON.stringify(allData.coinTicker));
          that.tickData = allData.coinTicker;
        }
        if (allData.stock) {
          localStorage.setItem("tiketMarkData", JSON.stringify(allData.stock));
          that.tiketMarkData = allData.stock;
        }
      }
    };
    const windowWidth = JQ(window).width();
    if(windowWidth<=768){
        subPosition = JQ('.topactiveColumn').parent('.item_cell').position();
        if(subPosition == undefined){
          return
        }
        if(subPosition.left <1100){
          subPosition.left = subPosition.left -200
          JQ('.slider_wrap').scrollLeft(subPosition.left)
        }else{
          JQ('.slider_wrap').scrollLeft(subPosition.left + 300)
        }   
    }
  },
  //相关操作事件
  methods: {
    toPick(){
      window.open('../pick/list.html')
    },
    topOnScroll(){
      var left = JQ('.slider_wrap').scrollLeft();
    },
    hiddenSub(key){
      const subs = document.getElementsByClassName('subItem');
      for(var i = 0,l=subs.length;i<l;i++){
        subs[i].style.display = 'none';
      }
      const navIcon = JQ("#navIcon" + key);
      navIcon.removeClass('hdrotateUp')
      navIcon.addClass('hdrotateDown')
    },
    openSub(e,key){
      e.preventDefault();
      e.stopPropagation()
      const navIcon = JQ("#navIcon" + key);
      navIcon.removeClass('hdrotateDown')
      navIcon.addClass('hdrotateUp')
      const subs = document.getElementsByClassName('subItem');
      for(var i = 0,l=subs.length;i<l;i++){
        subs[i].style.display = 'none';
      }
      var iDiv = JQ("#sub"+key)
      iDiv.css({"display":'inline-block'})
    },
    toAppDownload() {
      // 跳转至下载页
      window.location.href = "../appDownload/list.html";
    },
    appDownloadshow() {
      this.appDownload = true;
      var app_url = conf.devIp + "appDownload/list.html";
      const wechatCode = document.getElementById("app_download_code");
      var box = document.getElementById("app_download_code").childNodes;
      if (!box.length) {
        new QRCode(wechatCode, {
          text: app_url,
          width: 80,
          height: 80,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      }
    },
    appDownloadshide() {
      this.appDownload = false;
    },
    mobileTopMenuScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      this.mobileTopMenu = true;
    },
    ScrollImgLeft() {
      var speed = 50;
      var scroll_begin = document.getElementById("scroll_begin");
      var scroll_end = document.getElementById("scroll_end");
      var scroll_div = document.getElementById("scroll_div");
      scroll_end.innerHTML = scroll_begin.innerHTML;
      function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
          scroll_div.scrollLeft -= scroll_begin.offsetWidth;
        else scroll_div.scrollLeft++;
      }
      var MyMar = setInterval(Marquee, speed);
    },
    // 判断设备
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        this.ScrollImgLeft();
      }
    },
    watchRedDot() {
      // 查看是否有新的进贡消息，显示小红点
      const list = Lib.M.dataRequest({
        userId: localStorage.getItem("kg_desk_userId")
      });
      Lib.M.ajax({
        type: "post",
        url: "disciple/inviteRemind",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            localStorage.setItem(
              "discipleReminder",
              data.responseBody.discipleReminder
            );
          }
        }
      });
    },

    toTradeUrl(item) {
      window.open(item.tradeUrl);
    },
    toTxb() {
      window.open("../tiWhite/list.html");
    },
    toWrite() {
      const token = localStorage.getItem("kg_desk_token");
      if (token == null) {
        this.$message({
          type: "warning",
          message: "请先登录，才能发表文章"
        });
      } else {
        window.open("../account/details.html#/column");
      }
    },
    Quit() {
      const list = Lib.M.dataRequest({
        userId: localStorage.getItem("kg_desk_userId")
      });
      Lib.M.ajax({
        type: "post",
        url: "userkg/logOut",
        data: list,
        success: function(data) {
          localStorage.clear();
          window.location.href = "../index/list.html";
          if (data.code == 10000) {
          } else {
            that.$message({
              message: data.message,
              type: "error"
            });
          }
        }
      });
    },
    candyCancel() {
      this.candyVisible = false;
      this.candyMaskVisible = false;
    },
    showGetCandy() {
      this.getCandyVisible = true;
      this.candyMaskVisible = true;
    },
    cancelGetVisible() {
      this.getCandyVisible = false;
      this.candyMaskVisible = false;
      window.location.reload();
    },
    getCandyHandle() {
      window.location.href = "../account/details.html#/";
    },
    candyHandle() {
      this.candyVisible = false;
      this.candyMaskVisible = false;
      this.toRegister();
    },
    moblile_toLogin(n) {
      this.mobileTopMenu = false;
      const url = window.location.href;
      localStorage.setItem("loginUrl", url);

      if (n == 1) {
        window.location.href = "../login/list.html";
      } else {
        window.location.href = "../register/list.html";
      }
    },
    exitLogin() {
      localStorage.clear();
      window.location.href = "../index/list.html";
    },
    toSearch() {
      if (this.searchValue == "") {
        this.$message({
          message: "请输入搜索内容",
          type: "warning"
        });
        return;
      }
      Lib.M.goSearch(this.searchValue);
    },
    goIndex() {
      localStorage.setItem("menu_key", "0");
      window.location.href = "../index/list.html";
    },
    onScroll: function(e, position) {
      if (this.mobileTopMenu) {
        document.documentElement.scrollTop = this.initTop;
        document.body.scrollTop = this.initTop;
        return;
      } else {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
          this.initTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
          this.initTop = document.body.scrollTop;
        }
        const fixedNav = document.getElementById("fixedNav");
        const headerMobile = document.getElementsByClassName("headerMobile")[0];
      }

      // if (scrollTop > 0) {
      //   this.mobileTopMenu = false;
      // }
    },
    HandleSelect(key, keyPath) {
      this.keyPath = keyPath[0];
      // if(keyPath[1] != undefined){
      localStorage.setItem("menu_key", keyPath[0]);
      // }
    },
    Search() {
      this.menuShow = false;
      this.searchShow = "block";
      this.autofocus = true;
      this.elShow = !this.elShow;
      this.search_maskVisible = true;
    },
    closeSearch() {
      this.search_maskVisible = false;
      this.elShow = !this.elShow;
      this.searchShow = "none";
      setTimeout(() => {
        this.menuShow = true;
      }, 200);
    },
    mouseout() {
      this.menuShow = true;
      this.searchShow = false;
    },
    loadAll() {
      return [
        { value: "比特币", address: "" },
        { value: "霍特比", address: "" },
        { value: "火币", address: "" },
        { value: "BTC123", address: "" },
        { value: "123BTC", address: "" }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
      cb(results);
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        );
      };
    },
    toLogin() {
      this.loginVisible = true;
      this.registerVisible = false;
      this.retrieveVisible = false;
      this.loginfastVisible = false;
    },
    toLoginFast() {
      this.loginfastVisible = true;
      this.loginVisible = false;
      this.loginfastshow = true;
      this.handleSlide("", "", "", "");
      Lib.M.aliBlock(
        "#loginfastBlock",
        this,
        "csessionid",
        "sig",
        "token",
        "scene"
      );
    },
    changeslideVisible() {
      this.slideVisible = true;
    },
    toRegister() {
      this.registerVisible = true;
      this.registershow = true;
      this.handleSlide("", "", "", "");
      Lib.M.aliBlock(
        "#registerBlock",
        this,
        "csessionid1",
        "sig1",
        "token1",
        "scene1"
      );
    },
    toRetrieve() {
      this.retrieveVisible = true;
      this.loginVisible = false;
      this.retrieveshow = true;
      this.handleSlide("", "", "", "");
      Lib.M.aliBlock(
        "#retrieveBlock",
        this,
        "csessionid2",
        "sig2",
        "token2",
        "scene2"
      );
    },
    cancelLogin() {
      this.registerVisible = false;
      this.loginVisible = false;
      this.retrieveVisible = false;
      this.loginfastVisible = false;
      this.isSlide = false;
      this.handleSlide("", "", "", "");
    },
    cancelRegister() {
      this.registerVisible = false;
      this.loginVisible = false;
      this.retrieveVisible = false;
    },
    cancelRetrieve() {
      this.registerVisible = false;
      this.loginVisible = false;
      this.retrieveVisible = false;
    },
    toChannel(item, key) {
      window.location.href = "../subColumn/list.html?c=" + item.columnId;
    },
    toSubColumn(e,item, key) {
      if(item.list != undefined){
        e.preventDefault();
        e.stopPropagation();
        return
      }
      window.location.href = "../subColumn/list.html?c=" + item.columnId;
    },
    handleSlide(session, sig, nc_token, nc_scene) {
      this.slideInfo.session = session;
      this.slideInfo.sig = sig;
      this.slideInfo.nc_token = nc_token;
      this.slideInfo.nc_scene = nc_scene;
    }
  }
};
</script>
<style>
.appDownload {
  display: inline-block;
  width: 85px;
  height: 24px;
  background: rgba(24, 134, 250, 1);
  border-radius: 12px;
  font-size: 14px;
  font-family: "PingFangSC-Light" !important;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  margin: 0px 13px;
  margin-top: 17px;
}
#gongao {
  display: none;
  width: 100%;
  height: 30px;
  overflow: hidden;
  line-height: 30px;
  font-family: "微软雅黑";
  background: #1d2632;
  margin-top: 20px;
}
#gongao #scroll_begin,
#gongao #scroll_end {
  display: inline;
}

/* 用户旁边红色小圆点 */
#invite {
  position: relative;
  padding-right: 5px;
}
#invite::after {
  content: "";
  background: red;
  position: absolute;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  right: 0px;
  top: 15px;
}
.navAccount #invite::after {
  left: 80px;
}

.parentMenu{
  display: inline-block;
  position: relative;
  font-size:16px;
  width:80px;
  line-height: 60px;
  text-align: center;
}
.parentcolumn{
  display: inline-block;
  width:100%;
  height:100%;
  cursor: pointer;
  position: relative;
}
.subItem{
  display:none;
  position: absolute;
  top:61px;
  left:0px;
  width:160px;
  border-radius: 2px;
  background:#fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index:1002;
}
.navIcon{
  position: absolute;
  top:0px;
  right:0px;
  font-size:18px;
}
.subItem li{
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    
}

.subItem li:hover .active-a,.parentcolumn:hover{
  color:#2382ea;
}
.subItem li a{
  display: inline-block;
  width:80%;
  height:100%;
  border-bottom:1px dashed #ccc;
  font-size:14px;
}
.subItem li:last-child a{
  border:0px;
}
 .subItem .sanjiao {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 16px solid #fff;
    position: absolute;
    top: -15px;
    right: 150px;
  }
  .activeColumn,.topactiveColumn{
    border-bottom:2px solid #2382ea;
    height:58px;
    display: inline-block;
    width:100%;
  }
  .topactiveColumn{
    height:22px;
  }
  .hdrotateDown{
      transform:rotate(0deg);
      -ms-transform:rotate(0deg); 
      -moz-transform:rotate(0deg); 
      -webkit-transform:rotate(0deg); 
      -o-transform:rotate(0deg); 
     animation:hrotateDown 500ms 1 linear;
     -webkit-animation:hrotateDown 500ms 1 linear;
     -moz-animation:hrotateDown 500ms 1 linear;
     -o-animation:hrotateDown 500ms 1 linear;
     -ms-animation:hrotateDown 500ms 1 linear;
  }
  .hdrotateUp{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);
    -moz-transform:rotate(180deg);
    -webkit-transform:rotate(180deg);
    -o-transform:rotate(180deg);
    animation:hrotateUp 500ms 1 linear;
     -moz-animation:hrotateUp 500ms 1 linear;
     -webkit-animation:hrotateUp 500ms 1 linear;
     -o-animation:hrotateUp 500ms 1 linear;
     -ms-animation:hrotateUp 500ms 1 linear;
  }
  .pickGif{
    position: absolute;
    top: 126px;
    right: 200px;
    z-index:999;
  }
@keyframes hrotateUp {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
}
@keyframes hrotateDown {
  0%   { transform: rotate(180deg); }
  100% { transform: rotate(0deg); }
}
</style>

<style lang="less">
//

.appDown {
  .sanjiao {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 16px solid #fff;
    position: absolute;
    top: -16px;
    right: 40px;
  }
  position: absolute;
  display: inline-flex;
  width: 208px;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  top: 68px;
  left: 40px;
  .app_download_code {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-top: 13px;
    margin-left: 9px;
    margin-right: 9px;
  }
  p {
    font-size: 16px;
    font-family: "PingFangSC-Regular" !important;
    color: rgba(51, 51, 51, 1);
  }
  p:last-child {
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
  }
}
.hot_new {
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 12px;
  background: rgba(255, 55, 55, 1);
  border-radius: 6px 6px 6px 0px;
  right: -7px;
  top: 14px;
}
.el-menu,
.el-menu--horizontal .el-menu-item:focus,
.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-submenu .el-submenu__title:hover,
.el-menu--horizontal .el-submenu > .el-menu {
  background: transparent !important;
}
.el-submenu__title ul li a:hover,
.el-submenu__title ul li:hover a {
  color: #fff !important;
}
/* .el-menu--horizontal li:hover{

} */

.navHandle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}
.writeArticle {
  /*width: 72px;*/
  height: 24px;
  margin: 0px 13px;
  margin-top: 17px;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  overflow: hidden;
  border: solid 1px rgba(102, 102, 102, 1);
}
.writeArticle span {
  line-height: 24px;
  font-size: 14px;
  color: #333;
  margin: 0px 5px;
}
.writeArticle img {
  width: 12px;
  height: 16px;
  display: inline-block;
  margin-top: 3px;
}
.userContainer {
  position: relative;
  height: 60px;
}
.userContainer ul {
  display: none;
  background: #fff;
  margin-top: -26px;
  width: 172px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  /*padding-left: 20px;*/
  margin-left: -20px;
}
.userContainer li {
  /*width:100%;*/
  padding-left: 20px;
  height: 48px;
  line-height: 48px;
}
.userContainer li:hover {
  background: #1d87ff;
}
.userContainer a {
  display: inline-block;
  /*width:100%;*/
  color: #333;
  display: inline-block;
  width: 100%;
  font-size: 16px;
}
.loginHandle a {
  font-size: 16px;
  max-width: 170px;
}
.userContainer:hover .navAccount {
  display: block;
}
.navGif {
  display: inline-block;
  width: 67px;
  height: 60px;
  margin-left: 20px;
}
.el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
  display: none;
}
.el-submenu .el-menu-item,
.el-submenu {
  padding: 0px !important;
}
.el-menu--horizontal .el-menu-item a {
  color: #333;
}
.el-menu--horizontal .el-menu-item a:hover {
  color: #0075fa;
}
.el-submenu .el-menu-item:hover a,
.navAccount li:hover a {
  color: #fff;
}
.el-submenu .el-menu-item a:hover {
  color: #fff;
}
.el-submenu .el-menu-item {
  /*width:100%;*/
}
.el-submenu .el-menu-item:hover {
  background: #1d87ff !important;
  /*display: inline-block;*/
  color: #fff;
}
.el-submenu .el-menu-item a {
  margin-left: 20px;
}
.headerNav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.headerUserName {
  display: inline-block;
  /*width:100px;*/
}
body {
  font-family: "微软雅黑";
}
.topNav {
  width: 100%;
  /*margin-top: 60px;*/
  padding-top: 60px;
  line-height: 30px;
  // background: #1d2632;
  color: #fff;
  opacity: 1;
  z-index: 999;
}
.topNav .dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: rgba(88, 102, 122, 1);
  border-radius: 50%;
  position: absolute;
  top: 12px;
}
.nav {
  position: fixed;
  width: 100%;
  top: 0;
  /*border-bottom:1px solid #f0f0f0;*/
  box-shadow: 0px 0px 1px 0px rgba(128, 128, 128, 0.5);
  z-index: 1000;
  /*background:#fff;*/
  background-color: rgba(255, 255, 255, 1);
  height: 85px;
  transition: height 0.5s;
  /*top:0px;*/
  /*overflow: hidden;*/
}

/*固定nav样式*/
.transNavMobile {
  box-shadow: none !important;
}
.transNav .el-menu--horizontal .el-submenu > .el-menu {
  top: 60px !important;
  background: #fff !important;
  z-index: 999 !important;
}
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background: #1d87ff !important;
  z-index: 999 !important;
  color: #fff !important;
}
.transNav,
.transNav .container,
.transNav .el-menu--horizontal .el-menu-item,
.transNav .el-menu--horizontal .el-submenu .el-submenu__title {
  height: 60px !important;
  line-height: 60px !important;
}
.el-menu--horizontal .el-submenu .el-menu .el-menu-item {
  /*display: block!important;*/
  padding: 0px;
}
.transNavMobile,
.transNavMobile .container,
.transNavMobile .el-menu--horizontal .el-menu-item,
.transNavMobile .el-menu--horizontal .el-submenu .el-submenu__title,
.el-menu--horizontal .el-submenu .el-menu .el-menu-item {
  height: 48px !important;
  line-height: 48px !important;
}
.transNav .nav_logo {
  margin-top: 13px;
  width: 34px;
  height: 34px;
  transition: height 0.5s, width 0.5s;
}
.transNav .nav_logo_title {
  font-size: 26px;
}
.topNav_r li:last-child {
  margin-right: 0px;
}
.nav .container {
  display: flex;
  height: 85px;
  line-height: 85px;
  transition: height 0.5s;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
}
.content {
  height: 1000px;
}
.el-menu--horizontal {
  border: 0px;
}
.el-menu--horizontal .el-submenu .el-submenu__title,
.el-menu--horizontal .el-menu-item {
  height: 85px;
  line-height: 85px;
  font-size: 16px;
  transition: height 0.5s;
}
.el-menu-item a {
  display: inline-block;
}
.el-submenu__title:hover {
  border-color: none !important;
  background-color: transparent !important;
}
.el-menu--horizontal .el-submenu > .el-menu {
  top: 90px;
}
.el-submenu__title {
  padding-top: 2px;
}
.nav_logo {
  display: inline-block;
  width: 38px;
  height: 38px;
  margin-top: 25px;
  margin-right: 10px;
}
.nav_logo_title {
  font-size: 28px;
  color: #1d87ff;
}
.floatR {
  position: absolute;
  right: 0px;
}
.font28 {
  font-size: 28px !important;
  cursor: pointer;
}

.search {
  margin: 0 auto;
}
.search .el-input__inner,
.search .el-input__inner:focus,
.search .el-input__inner:hover {
  border-color: #fff;
}
.search .el-input__inner {
  width: 240px;
}

/*登录*/

/*注册*/

/* .imgeye{
  width:30px;
  height:25px;
  top:7px;
  right:0;
  position: absolute;
  display: inline-block;
  cursor: pointer;
} */
.paw .paw_el {
  position: relative;
}
/*模态框*/
.el-dialog {
  overflow: hidden;
}
.el-form-item__error {
  left: 0px !important;
}
.elMenu {
  /*   display: inline-block;
width:100%;
height:100%; */
  float: left;
}
.header_logo {
  display: flex;
  flex-direction: row;
  /*width:120px;*/
  overflow: hidden;
}
.headerMobile {
  display: none;
}
.moblileMenu {
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
}
.icon-mulu {
  display: none;
}
.search .el-input__inner {
  font-family: "微软雅黑";
}
.search .icon-cha {
  font-size: 20px;
  padding-right: 10px;
  /*border-right:1px solid #ccc;*/
}
.icon-sousuo {
  font-size: 26px !important;
}
.el-menu--horizontal .el-menu-item {
  padding: 0 24px;
}
.el-submenu__title {
  padding: 2px 0px;
}
.header_logo {
  /*margin-right:20px;*/
}
.exitLogin {
  border-top: 1px solid #f0f0f0;
  height: 43px;
  line-height: 43px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  color: #666;
}
.mobileSearch {
  display: none;
}
.pctop {
  /*position: fixed;*/
  /*top:0px;*/
  display: flex;
  background: #1d2632;
}
.moblieTop {
  /*position: fixed;*/
  top: 0px;
  display: none;
}
.el-menu--horizontal .el-menu--popup .el-menu-item:hover {
  background: #1d87ff !important;
  /*display: inline-block;*/
  color: #fff;
}
.el-menu--horizontal .el-menu--popup .el-menu-item:hover a {
  color: #fff !important;
}
@media only screen and (max-width: 1800px) {
  .login_register_modal .el-dialog {
    width: 16% !important;
  }
}
@media only screen and (max-width: 1700px) {
  .login_register_modal .el-dialog {
    width: 18% !important;
  }
}
@media only screen and (max-width: 1550px) {
  .login_register_modal .el-dialog {
    width: 20% !important;
  }
}
@media only screen and (max-width: 1400px) {
  .login_register_modal .el-dialog {
    width: 22% !important;
  }
}
@media only screen and (max-width: 1250px) {
  .login_register_modal .el-dialog {
    width: 24% !important;
  }
}
@media only screen and (max-width: 768px) {
  .pickGif{
    display:none;
  }
  .topNav {
    padding-top: 84px;
    line-height: 0;
  }
  .pcMarketBar {
    display: none;
  }
  .pctop,
  .marquee_box {
    display: none;
  }
  .moblieTop {
    display: flex;
  }
  #gongao {
    display: inline-block;
  }
  .login_register_modal .el-dialog {
    width: 75% !important;
  }
  .icon-mulu {
    display: inline-block;
  }
  .menu_nav {
    display: none;
  }
  .header_logo {
    margin: 0 auto;
    width: auto;
  }
  .headerMobile {
    display: block;
    background: #fff;
    z-index: 300;
  }
  // .headerMobile .el-menu--horizontal .el-menu-item,
  // .transNav .el-menu--horizontal .el-submenu .el-submenu__title {
  //   height: 30px !important;
  //   line-height: 30px !important;
  // }
  // .headerMobile .el-menu-item a {
  //   color: #333 !important;
  // }
  // .headerMobile .el-menu--horizontal > .el-menu-item.is-active,
  // .headerMobile
  //   .el-menu--horizontal
  //   > .el-submenu.is-active
  //   .el-submenu__title {
  //   border-bottom: 2px solid #409eff !important;
  // }
  .transNav .icon-mulu {
    color: #333;
  }
  .nav {
    z-index: 300;
  }
  .nav .container {
    height: 45px;
    line-height: 45px;
    z-index: 300;
  }
  .nav_logo {
    margin-top: 5px;
    margin-right: 5px;
    width: 36px;
    height: 36px;
  }
  .nav_logo_title {
    font-size: 25px;
    margin-top: 1px;
  }
  .font28 {
    font-size: 20px !important;
  }
  .search .el-input,
  .search .el-input__inner {
    width: 120px !important;
  }
  .mobileTopMenu {
    position: fixed;
    z-index: 9999;
    width: 110px;
    text-align: center;
    top: 0px;
    left: 0px;
    background: #fff;
    height: 100%;
    width: 60%;
    display: flex;
    flex-direction: column;
  }
  .mobileTopMenu .loginBg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .loginAvatar {
    width: 65px;
    height: 65px;
    display: inline-block;
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  .loginContainer {
    position: absolute;
    bottom: 34px;
    left: 100px;
    font-size: 14px;
  }
  .loginContainer a {
    color: #fff;
  }
  .loginContainer .omit1 {
    width: 90px;
    height: 27px;
  }
  .mobileTopMenu ul {
    margin-top: 20px;
    height: 550px;
    overflow: scroll;
  }
  .mobileTopMenu li {
    margin: 20px 0px;
  }
  .mobileTopMenu .login {
    position: relative;
    width: 100%;
    height: 180px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    /*background:url("../assets/img/moblieLogin.png") no-repeat;*/
  }
  .mobile_mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8888;
  }
  .pcSearch {
    display: none;
  }
  .mobileSearch {
    display: inline-block;
  }
}
@media only screen and (max-width: 414px) {
  .marquee_box,
  .pcMarketBar {
    display: none;
  }
  .icon-sousuo {
    font-size: 22px !important;
  }
  .icon-cha {
    font-size: 16px;
  }
  .nav_logo {
    margin-top: 12px;
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
  .nav_logo_title {
    font-size: 18px;
  }
}
@media only screen and (max-height: 736px) {
  .mobileTopMenu ul {
    margin-top: 20px;
    height: 460px;
    overflow: scroll;
  }
}
@media only screen and (max-width: 1600px) {
  .parentMenu{
    width:65px;
  }
  .pickGif{
    right:50px;
  }
}
@media only screen and (max-width: 1280px) {
  .pickGif{
    right:10px;
  }
}
@media only screen and (max-height: 667px) {
  .mobileTopMenu ul {
    margin-top: 20px;
    height: 390px;
    overflow: scroll;
  }
}
@media only screen and (max-height: 568px) {
  .mobileTopMenu ul {
    margin-top: 10px;
    height: 320px;
    overflow: scroll;
  }
}
</style>
<style lang="less" scoped>
.flexBoxMarquee{
  padding-right:16px;
  display: inline-flex;
  width: 159px;
  justify-content: space-between;
}
.mobileMarqueeBar {
  span {
    margin-left: 18px;
  }
  .redRate {
    color: rgb(57, 255, 169);
    margin-left: 5px;
  }
  .greenRate {
    color: rgb(242, 76, 74);
  }
}
.anim {
  transition: all 1.5s;
}
.pctop .article_tit {
  font-size: 16px;
  color: #fff;
}
.pctop div {
  height: 65px;
  padding-top: 15px;
  padding-right: 35px;
  padding-left: 30px;
}
.pctop div p:first-child {
  margin-bottom: 5px;
}
.pctop .statusDetail {
  font-size: 18px;
}
.pc .statusDetailSecond{

}
.frIcon{
  position: absolute;
  right: 18px;
}
.statusIcon {
  display: inline-block;
  width: 20px;
  height: 12px;
  background-size: 100% 100%;
}
.statusIconGreen {
  // 红色上升
  background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180424/redup.png");
}
.statusIconRed {
  // 绿色下跌
  background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180424/greendown.png");
}
.grayBlock {
  // background-color: #242730;
}
// 头部行情滚动条
.marquee_box {
  height: 80px;
  overflow: hidden;
  // transition: all 0.5s;
  .market {
    height: 80px;
    display: flex;
    justify-content: space-between;

    background: #17191f;
    div {
      height: 65px;
      padding-top: 15px;
      padding-right: 35px;
      padding-left: 30px;
      color: rgb(255, 255, 255);
      font-size: 16px;
      p {
        &:last-child {
          color: rgb(59, 185, 130);
          font-size: 20px;
        }
      }
    }
    .isDesc {
      p {
        &:last-child {
          color: rgb(241, 68, 76);
          font-size: 18px;
        }
      }
    }
  }
}
</style>


<style scoped lang="less">
.statusDetail2 {
  span:first-child {
    padding-right: 5px;
    margin-left: -3px;
  }
}
.statusDetail {
  span {
    color: rgb(59, 185, 130);
  }
}
.isRed {
  span {
    color: #f1444c;
  }
}

.qimo8 {
  overflow: hidden;
  width: 100%;
  height: 66px;
  background: #1d2632;
}
.qimo8 p {
  color: #fff;
}

.qimo8 .qimo {
  width: 8000%;
  height: 80px;
}

.qimo8 .qimo div {
  float: left;
}

.qimo8 .qimo .ul {
  float: left;
  height: 80px;
  overflow: hidden;
  zoom: 1;
}

.qimo8 .qimo .ul .li {
  float: left;
  list-style: none;
  height: 80px;
}
.qimo8 .qimo .ul .li div {
  width: 195px;
  margin: 6px 0;
  height: 55px;
  margin-right:6px;
  background:rgba(255, 255, 255, .08);
  position: relative;
}
.qimo8 .qimo .ul .li div p {
  padding-left: 18px;
  font-size: 12px;
}
.qimo8 .qimo .ul .li div p:last-child {
  font-size: 12px;
  margin-top:-5px;
}
</style>
<style lang="less" scoped>
    .lr_nb{width:100%;box-sizing:border-box;z-index:100000;max-width:1080px;-webkit-transition:.3s all;transition:.3s all}
    .lr_nb .slider_wrap.nav_line{overflow:hidden;overflow-x:scroll;width:100%;-webkit-overflow-scrolling:touch;}
    .lr_nb .slider_wrap.nav_line .item_cell{display:inline-block;overflow:hidden;position:relative;}
    .lr_nb .slider_wrap.box{overflow:hidden;width:100%}
    .lr_nb .slider_wrap::-webkit-scrollbar{display:none}
    .lr_nb .wx_items{white-space:nowrap}
    .lr_nb .wx_items span{color:#666;font-size: 15px; white-space:nowrap;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:center;cursor:pointer}
    .lr_nb_after{height:40px;display:block;clear:both;}
    /*滚动水平导航栏 start*/
  .wx_items{
    .isIndex, .isMune {
      border-bottom: 2px solid #409eff!important;
    }
    white-space:nowrap;
    height: 40px;
    .item_cell{
      border-bottom: 2px solid #fff;
      display: inline-block;
      padding: 0px 10px;
      overflow: hidden;
      height: 30px;
      line-height:30px;
    }
  }
    /*滚动水平导航栏 end*/
</style>
