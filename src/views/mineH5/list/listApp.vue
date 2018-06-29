<template>
  <div class="appDownloadwrap">
    <div class="pc">
      请在手机上打开
    </div>
    <div class="h5">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img class = 'bg1' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg@2x.png" />
            <div class="btn" @click="appDown"><span >下载APP参与活动</span></div>
            <img class = 'bg2' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg2@2x.png" />
            <div class="down swiper-button-next"></div>
          </div>
          <div class="swiper-slide">
            <img class = 'bg1' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/gift@2x.png" />
            <div class="btn" @click="appDown"><span >下载APP参与活动</span></div>
             <img class = 'bg2' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg2@2x.png" />
             <div class="down swiper-button-next"></div>
          </div>
          <div class="swiper-slide">
            <img class = 'bg1' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/1888KG@2x.png" />
            <div class="btn"  @click="appDown"><span>下载APP参与活动</span></div>
            <img class = 'bg2' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg2@2x.png" />
            <div class="down swiper-button-next"></div>
          </div>
        </div>
        <div class="down swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "./../../../assets/css/swiper.min.css";
import Swiper from  "./../../../assets/js/swiper.min.js";
export default {
  methods: {
    appDown() {
      //判断是IOS还是Android
      let ua = navigator.userAgent.toLowerCase();
      let flag =ua.indexOf('os') > 0;
      if(flag){
        //跳转到appsotre
        window.location.href = 'https://itunes.apple.com/cn/app/千氪-每日为你提供高质量资讯/id1381042034?l=zh&ls=1&mt=8'
      }else{
        //跳转到android下载页
        window.location.href = 'https://www.pgyer.com/KG-Android'
      }
    },
    appAndroidDown(){
      window.location.href = 'https://www.pgyer.com/KG-Android'
    },
    appIosDown(){
      window.location.href = 'https://itunes.apple.com/cn/app/千氪-每日为你提供高质量资讯/id1381042034?l=zh&ls=1&mt=8'
    }
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      direction: "vertical",
      hideOnClick: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }
};
</script>

<style lang="less" scoped>
.swiper-container-vertical>.swiper-pagination-bullets{display: none;}
@media only screen and (max-width: 1920px) {
  .bg {
    height: 813px !important;
  }
  .content, .fastnews, .detail {
    height: 803px!important;
  }
}
@media only screen and (max-width: 1800px) {
  .bg {
    height: 813px !important;
  }
  .content, .fastnews, .detail {
    height: 803px!important;
  }
}
@media only screen and (max-width: 1700px) {
  .bg {
    height: 813px !important;
  }
  .content, .fastnews, .detail {
    height: 803px!important;
  }
}
@media only screen and (max-width: 1600px) {
  .bg {
    height: 678px !important;
  }
  .content, .fastnews, .detail {
    height: 670px!important;
  }
}
@media only screen and (max-width: 1440px) {
  .bg {
    height: 610px !important;
  }
  .content, .fastnews, .detail {
    height: 602px!important;
  }
}
@media only screen and (max-width: 1366px) {
  .bg {
    height: 578px !important;
  }
  .content, .fastnews, .detail {
    height: 570px !important;
  }
}
@media only screen and (max-width: 1280px) {
  .bg {
    height: 542px !important;
  }
  .content, .fastnews, .detail {
    height: 536px !important;
  }
}
// 
@media only screen and (min-width: 801px) {
  .appDownloadwrap {
    width: 100%;
    .h5 {
      display: none;
    }
  }
}
@media only screen and (max-width: 800px) {
  .appDownloadwrap {
    width: 100%;
    height: 100%;
    .pc {display: none;}
    .down {
      width: 16px;
      height: 9px;
      background-image: url('../../../assets/img/arrow@2x.png');
      margin:  0 auto;
      background-size: cover;
      margin-bottom:25px;
      &:focus{
        outline: none;
      }
    }
      .btn {
        width:210px;
        height:42px; 
        background:#9344F2;
        color:#fff;
        border: 1px solid #9344F2;
        border-radius: 22px;
        margin: 0 auto;
        text-align: center;
        position: absolute;
        bottom: 100px;
        left: 0px;
        right: 0px;
        z-index: 300;
        span{
          font-size:18px;
          font-family:'PingFangSC-Regular';
          color:rgba(255,255,255,1);
          line-height: 42px;
        }
      }
  }
  html,body {
    position: relative;
    height: 100%;
  }
  .swiper-container, .h5 {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    &:first-child {
      background: #262762;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &:nth-child(2) {
       background: #262762;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &:nth-child(3) {
      background: #262762;
      background-size: cover;
      background-repeat: no-repeat;
      .down{
        opacity:0;
      }
    }
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .copy{color: #fff;font-size: 12px;font-family: 'font-family:PingFangSC-Light'; margin:  0 auto;text-align: center;}
  }
  .swiper-button-next{
    position: static;
  }
  .bg1,.bg2{
    display: inline-block;
    width:100%;
  }
  .bg2{
    position: absolute;
    bottom:0px;
  }
}
@media only screen and (min-width: 414px) {
  .swiper-slide {
    &:nth-child(2) {
      .pic{
        height: 420px;
        width: 280px;
      }
    }
    &:nth-child(3) {
      .pic {
        height: 430px;
        width: 300px;
      }
    }
    &:nth-child(4) {
      .pic {
        height: 460px;
        width: 330px;
      }
    }
  }
}
@media only screen and (min-width: 768px) {
  .appDownloadwrap .btn{
    width: 420px;
    height: 84px;
    border-radius: 44px;
    span{
      font-size: 36px;
      line-height: 84px;
    }
  }
  .swiper-slide {
    &:nth-child(1) {
      background-size: 100% 100%;
      .logo{width: 360px;height: 360px;}
      .words{height: 144px;width: 564px;}
    }
    &:nth-child(2) {
      background-size: 100% 100%;
    }
    &:nth-child(3) {
      background-size: 100% 100%;
    }
    &:nth-child(4) {
      background-size: 100% 100%;
      .copy{font-size: 24px;}
    }
  }
}
</style>
