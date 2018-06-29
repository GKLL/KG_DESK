<template>
  <div class="container">
    <div class="top">
      <a class="logo" href="../index/list.html"></a>
    </div>
    <div class="bottom">
      <div class="section-box">
        <div class="rule-img"></div>
        <div class="rules-box">
          <div class="title">
            <div class="icon"></div>
            <div class="text">找茬规则</div>
          </div>
          <div class="section">
            <div class="row">
              <div class="number">1、</div>
                在千氪站内阅读文章，发现错别字或其他错误，截图保存；
              </div>
            <div class="row">
              <div class="number">2、</div>
              关注千氪财经(服务号：kgcj-com)，回复关键字“找茬”；
            </div>
            <div class="row">
              <div class="number">3、</div>
              获得找茬链接，点击链接填写个人信息，并上传“找茬”截图；
            </div>
            <div class="row">
              <div class="number">4、</div>
              后台工作人员审核资料，确定无误后，我们将在2个工作日内给“找茬”成功的用户发放现金奖励(同一处错误的奖励，仅限前10位反馈者)。
            </div>
          </div>
        </div>
      </div>
      <div class="section-box">
        <div class="icon2"></div>
        <div class="title2">找茬123</div>
        <div class="step1">
          <div class="step1-icon">找茬并截图</div>
        </div>
        <div class="step2">
          <div class="step2-icon">进入千氪服务号<br>回复关键字</div>
        </div>
        <div class="step3">
          <div class="step3-icon">填写信息</div>
        </div>
        <div class="step4">
          <div class="step4-icon">24h内审核通过<br>公众号直接领取红包</div>
        </div>
        <div class="qr-code"></div>
      </div>
    </div>
  </div>
</template>

<script>
let pick = (function () { 
  var sUserAgent= navigator.userAgent.toLowerCase(); 
  var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
  var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
  var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
  var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
  var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
  var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
  var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce"; 
  var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { 
    return 'H5Pick'
  } else { 
    return 'PCPick'
  } 
})()

if(pick == 'H5Pick') {
  //页面自适应终端
  const WIDTH = 750;//原图宽度
  let clientWidth = parseInt(document.documentElement.clientWidth);//浏览器有效宽度
  document.documentElement.style.fontSize = clientWidth/WIDTH * 100 + 'px'; 
}
</script>

<style scoped>  
.container {
  width: 100%;
  background: #F7FAFC;
}
.container .top {
  position: relative;
  height: 6.72rem;
  background: url(../assets/img/pick/h5/banner.png) no-repeat center/cover;
}
.container .top .logo{
  position: absolute;
  top: 0.3rem;
  left: 0.5rem;
  width: 1.97rem;
  height: .34rem;
  background: url(../assets/img/pick/h5/logo.png) no-repeat center/cover;
}
.container .bottom {
  position: relative;
  color: #333;
  background: url(../assets/img/pick/h5/bg.png) no-repeat center/cover;
}
.section-box {
  position: relative;
  overflow: hidden;
}
.container .bottom .rule-img {
  position: absolute;
  top: 1.06rem;
  left: 0.3rem;
  width: 3rem;
  height: 3.32rem;
  background: url(../assets/img/pick/h5/rule-img.png) no-repeat center/cover;
}
.container .bottom .rules-box {
  padding: 1.24rem .4rem 0 3.59rem;
  font-size: 0.24rem;
}
.container .bottom .rules-box .title {
  position: relative;
  padding-left: 0.7rem;
  height: .57rem;
  line-height: .57rem;
}
.container .bottom .rules-box .title .icon {
  position: absolute;
  left: 0;
  top: 0;
  width: .57rem;
  height: .62rem;
  background: url(../assets/img/pick/h5/decoration1.png) no-repeat center/cover;
}
.container .bottom .rules-box .title .text {
  font-size: .36rem;
  font-weight: bold;
}
.container .bottom .rules-box .section {
  line-height: .33rem;
}
.container .bottom .rules-box .section .row {
  position: relative;
  padding-left: .31rem;
  margin-top: .2rem
}
.container .bottom .rules-box .section .row .number {
  position: absolute;
  top: 0;
  left: 0;
  width: .16rem;
  height: 100%;
}
.container .bottom .icon2 {
  margin: .8rem auto 0;
  width: .57rem;
  height: .62rem;
  background: url(../assets/img/pick/h5/decoration2.png) no-repeat center/cover;
}
.container .bottom .title2 {
  margin-top: .1rem;
  text-align: center;
  font-size: .36rem;
  font-weight: bold;
}
.container .bottom .step1 {
  margin: 0.62rem auto 0;
  transform: translateX(-1.25rem);
  position: relative;
  width: 2.98rem;
  height: 1.89rem;
  background: url(../assets/img/pick/h5/NO1.png) no-repeat center/cover;
}
.container .bottom .step1-icon {
  position: absolute;
  left: 3.48rem;
  top: .45rem;
  padding-top: .6rem;
  width: 2.53rem;
  font-size: .28rem;
  color: #666;
  background: url(../assets/img/pick/h5/1.png) no-repeat left top/.44rem .5rem;
}
.container .bottom .step2 {
  margin: .5rem auto 0;
  transform: translateX(1.25rem);
  position: relative;
  width: 2.98rem;
  height: 1.89rem;
  background: url(../assets/img/pick/h5/NO2.png) no-repeat center/cover;
}
.container .bottom .step2-icon {
  position: absolute;
  right: 3.48rem;
  top: .25rem;
  padding-top: .6rem;
  width: 2.53rem;
  font-size: .28rem;
  color: #666;
  text-align: right;
  background: url(../assets/img/pick/h5/2.png) no-repeat right top/.44rem .5rem;
}
.container .bottom .step3 {
  margin: .5rem auto 0;
  transform: translateX(-1.25rem);
  position: relative;
  width: 2.98rem;
  height: 1.89rem;
  background: url(../assets/img/pick/h5/NO3.png) no-repeat center/cover;
}
.container .bottom .step3-icon {
  position: absolute;
  top: .45rem;
  left: 3.48rem;
  padding-top: .6rem;
  width: 2.53rem;
  font-size: .28rem;
  color: #666;
  background: url(../assets/img/pick/h5/3.png) no-repeat left top/.44rem .5rem;
}
.container .bottom .step4 {
  margin: .5rem auto 0;
  transform: translateX(1.25rem);
  position: relative;
  width: 2.98rem;
  height: 1.89rem;
  background: url(../assets/img/pick/h5/NO4.png) no-repeat center/cover;
}
.container .bottom .step4-icon {
  position: absolute;
  top: .2rem;
  right: 3.48rem;
  padding-top: .6rem;
  width: 2.53rem;
  font-size: .28rem;
  color: #666;
  text-align: right;
  background: url(../assets/img/pick/h5/4.png) no-repeat right top/.44rem .5rem;
}
.container .bottom .qr-code {
  margin: .8rem auto 1.35rem;
  position: relative;
  width: 2rem;
  height: 2rem;
  background: url(../assets/img/pick/h5/QR.png) no-repeat center/cover;
}
.container .bottom .qr-code:after {
  content: "千氪财经服务号";
  position: absolute;
  left: 0;
  top: 100%;
  width: 2.05rem;
  font-size: .28rem;
  color: #666;
  text-align: center;
}
</style>