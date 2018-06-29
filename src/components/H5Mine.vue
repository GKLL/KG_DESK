/**
 *  @description: 移动端Banner活动内容页
 *  @author: liuzhen
 *  @date: 2018.5.22
 */
<template>
  <section class="banner-content">
    <section class="header-container"></section>
    <main class="banner-main">
      <section class="banner-note">
        <div>
          <h1>活动说明</h1>
          <p class = 'marbottom10'>本次活动由千氪财经发起，deepfin冠名，由熊猫矿机、kc-Chain、Coinwallet、币派提供商品赞助支持。</p>
        </div>
        <div>
          <h1>活动时间</h1>
          <p  class = 'marbottom10'>{{startTime}}-{{endTime}}</p>
        </div>
        <div>
          <h1>活动内容</h1>
          <section>
            <h3>一、稀世矿机、硬件钱包0元抢</h3>
            <p  class = 'marbottom10 '>用户下载千氪APP并注册并登录，进入本次活动页面，挑选喜欢的矿机或硬件钱包，点击“0元抢”按钮即可开抢！邀请好友助力，为矿机或硬件钱包蓄能！数量有限，先到先得！</p>
            <div class="note-text marbottom10">
              <p>注：</p>
              <p>1、所展示出的矿机或硬件钱包均由赞助商友情提供，数量唯一；</p>
              <p>2、用户参与本次活动，需消耗1000氪金开启本次活动；</p>
              <p>3、开启活动后，需通过邀请好友助力，为心仪的矿机或硬件钱包蓄能，能量值满则蓄能成功，即可0元拿走该矿机或硬件钱包；</p>
            </div>
          </section>
          <section>
            <h3>二、新用户注册享好礼送不停！</h3>
            <p>邀请好友下载千氪APP，新用户注册即享1888氪金再加100DFC！（氪金立即到账，DFC领取地址：www.deepfin.one）</p>
          </section>
        </div>
      </section>
      <section class="banner-shoplist">
        <ul>
          <li v-for="(shop,index) in shoplist" :key="index">
            <div class="shop-item">
              <div class="shop-img"><img :src="shop.url" alt=""></div>
              <div class="shop-info">
                <p class="shop-name">{{ shop.name }}</p>
                <p class="shop-price">当前市价：{{ shop.price }}元</p>
                <p class="shop-desc">{{ shop.desc }}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
    <footer class="footer">
      <div class="footer-desc">心动不如行动，扫描下方二维码，立即下载千氪APP开抢！</div>
      <div class="footer-qr-code">
        <span id = 'mineh5-code' class = 'mineh5-code'></span>
      </div>
      <div class="handle-open-app" @click="openMiGuApp"><a >App内打开</a></div>
      <div class="footer-note" style = "padding-bottom:10px">(参与活动需在App最新版本v1.0.3中打开)</div>
      <div class="footer-note">注：本次为千氪财经用户回馈活动，我们将对参与用户进行筛查，发现恶意刷奖行为，将不予以奖励。本次活动最终解释权归千氪财经所有。</div>
    </footer>
  </section>
</template>

<script type="text/ecmascript-6">
import Lib from 'assets/js/Lib';
import conf from "./../assets/js/conf"; // 引入邀请链接
import QRCode from "qrcodejs2"; // 引入生成二维码插件
export default {
  name: 'bannerContent',
  data () {
    return {
      title: '疯狂抢矿机',
      shoplist: [
        { 
          name: 'PandaMiner B3 Pro熊猫矿机', 
          url: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine1.png',
          price: 16800,
          desc: '挖掘币种：ETH/ETC/XMR/ZEC等多种GPU可支持算法币种！'
        },
        { 
          name: 'K矿机', 
          url: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine2.png',
          price: 12888,
          desc: '挖掘币种：KCC，K粉们的心头大爱！'
        },
        { 
          name: 'Bepal Pro S硬件钱包', 
          url: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine3.png',
          price: 3280,
          desc: '全面支持EOS、BTM主网生态，EOS一键映射和快捷投票功能。'
        },
        { 
          name: 'Ledger Nano S硬件钱包', 
          url: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine4.png',
          price: 998,
          desc: '市场认可度最高的硬件钱包产品之一。'
        },
        { 
          name: 'Trezor 硬件钱包', 
          url: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine5.png',
          price: 988,
          desc: '不同的币种可统一管理，无需安装Chrome扩展程序和桌面应用程序。'
        }
      ],
      startTime:'',
      endTime:''
    }
  },
  mounted(){
    var app_url = conf.devIp + "/mineH5/list.html";
      const wechatCode = document.getElementById("mineh5-code");
      var box = document.getElementById("mineh5-code").childNodes;
      if (!box.length) {
        new QRCode(wechatCode, {
          text: app_url,
          width: 85,
          height: 85,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      }
      const that = this;
      const time_list = Lib.M.postDataRequest('')
      console.log('11')
      Lib.M.loginAjax({
                  'type':'post',
                  'url':'/kgApp/miner/minerTime',
                  "data": time_list,
                  'success':function (data){
                    if(data.code == 10000){
                      let startTime = parseInt(data.data.minerActivityTime.startTime);
                      let endTime = parseInt(data.data.minerActivityTime.endTime);
                      that.startTime = new Date(startTime).toLocaleString();
                      that.endTime = new Date(endTime).toLocaleString();
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                    }
              }
    });
    Date.prototype.toLocaleString = function() {
      let minutes =  this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
      return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + ":" + minutes;
    };
  },
  methods: {
    openMiGuApp(){
       let config = {
            /*scheme:必须*/
            scheme_IOS: 'kg://',
            scheme_Adr: 'kgapp://www.kg.com/startapp',
            download_url: 'https://kg.com/mineH5/list.html',
            timeout: 1000
        };
        let ua = navigator.userAgent.toLowerCase();
        let startTime = Date.now();
        
        let flag =ua.indexOf('os') > 0;
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          var loadDateTime = new Date();
          window.setTimeout(function() {
          var timeOutDateTime = new Date();
          if (timeOutDateTime - loadDateTime < 500) {
            window.location = "https://itunes.apple.com/cn/app/千氪-每日为你提供高质量资讯/id1381042034?l=zh&ls=1&mt=8";
          } else {
            window.close();
          }
          },
          25);
          window.location = config.scheme_IOS;
        } else if (navigator.userAgent.match(/android/i)) {
           let ifr = document.createElement('iframe');
          ifr.src =  config.scheme_Adr;
          ifr.style.display = 'none';
            document.body.appendChild(ifr);
            let t = setTimeout(function() {
              document.body.removeChild(ifr);
              var endTime = Date.now();
              if (!startTime || endTime - startTime < 2000) {//唤起失败
                  window.open( config.download_url)
                 
              } else {//唤起成功
              }
          }, config.timeout);
        }
    },
  }
}
</script>

<style lang="less">
.marbottom10{
  margin-bottom:10px;
}
.banner-content {
  .header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
  }
  .header-container {
    width: 100%;
    height: 324px;
    background-image: url("./../assets/img/bannerContent/banner.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .banner-main {
    position: relative;
    top: -1px;
    background-color: #262762;
    .banner-note,
    .banner-shoplist {
      width: 95%;
      margin: 0 auto;
      background-color: #393a85;
      border-radius: 10px;
      color: #bfbff3;
      border: 1px solid #696ab5;
      padding: 15px 20px;
    }
    .banner-note {
      h1 {
        color: #fbe239;
        font-size: 12px;
      }
      h3 {
        color: #e4e5fd;
        font-size: 12px;
      }
      p {
        font-size: 10px;
      }
      .note-text {
        color: #add2f1;
        font-size: 9px;
      }
    }
    .banner-shoplist {
      position: relative;
      margin-top: 60px;
      &::before {
        content: "商品详情";
        display: inline-block;
        position: absolute;
        top: -30px;
        left: 20px;
        width: 100px;
        text-align: center;
        color: #fbe239;
        height: 30px;
        line-height: 33px;
        background-color: #393a85;
        border-top: 1px solid #696ab5;
        border-left: 1px solid #696ab5;
        border-right: 1px solid #696ab5;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 15px;
        font-weight:bold;
      }
      ul,
      li {
        list-style: none;
      }
      ul {
        padding: 0;
        li {
          border-bottom: 1px solid #5C5DAB;
          &:last-child {
            border-bottom: none;
          }
          div.shop-item {
            display: flex;
            padding: 20px 0;
            div.shop-img {
              margin-right: 20px;
              img {
                width: 80px;
                height: 80px;
                border-radius:5px;
              }
            }
            div.shop-info {
              p {
                margin: 0;
              }
              .shop-name {
                color: #E4E5FD;
                font-size: 13px;
                margin-bottom: 4px;
              }
              .shop-price {
                color: #FF9797;
                font-size: 12px;
                margin-bottom: 6px;
              }
              .shop-desc {
                color: #BFBFF3;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    background-color: #262762;
    text-align: center;
    color: #BFBFF3;
    position: relative;
    top: -1px;
    padding-top: 20px;
    .footer-desc {
      font-size: 12px;
      margin-bottom: 15px;
    }
    .footer-qr-code {
      margin-bottom: 15px;
      span {
        display:inline-block;
        width: 85px;
        height: 85px;
      }
    }
    .handle-open-app {
      margin-bottom: 15px;
      a {
        display: inline-block;
        width:110px;
        height:35px; 
        line-height: 35px;
        background:rgba(92,134,255,1);
        border-radius: 35px;
        color: #fff;
        font-size: 12px;
        text-decoration: none;
      }
    }
    .footer-note {
      width: 73%;
      margin: 0 auto;
      padding-bottom: 30px;
    }
  }
}
</style>