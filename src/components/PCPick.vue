<template>
	<div class="container">
    <div class="top-bg"></div>
    <div class="main-bg"></div>
    <div class="content-box">
      <div class="content">
        <div class="top">
          <a class="logo" href="../index/list.html"></a>
          <div class="title"></div>
          <div class="pic"></div>
        </div>
        <div class="main">
          <div class="left"></div>
          <div class="right">
            <div class="title">
              <div class="decoration1"></div>
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
            <div class="qr-code"><span>千氪财经服务号</span></div>
          </div>
          <div class="decoration2"></div>
          <div class="text2">找茬123</div>
          <div class="line123"></div>
          <div class="item item1">找茬并截图</div>
          <div class="item item2">进入千氪服务号<br>回复关键字</div>
          <div class="item item3">填写信息</div>
          <div class="item item4">24h内审核通过<br>公众号直接领取红包</div>
        </div>
      </div>
    </div>
    
	</div>
</template>

<script>
document.documentElement.style.fontSize = '12px';
</script>
<style scoped>
.container {
  position: relative;
  height: 1376px;
  width: 100%;
  text-align: center;
  background: #F7FAFC;
}
.top-bg {
  height: 470px;
  background: url(../assets/img/pick/pc/top-bg.png) no-repeat center/cover;
}
.main-bg {
  height: 853px;
  background: url(../assets/img/pick/pc/main-bg.png) no-repeat center/cover;
}
.content-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.content {
  display: inline-block;
  width: 1280px;
}
.top {
  position: relative;
  height: 470px;
}
.top .logo {
  position: absolute;
  top: 20px;
  left: 70px;
  width: 132px;
  height: 23px;
  background: url(../assets/img/pick/pc/logo.png) no-repeat center/cover;
}
.top .title {
  position: absolute;
  top: 62px;
  left: 399px;
  width: 477px;
  height: 78px;
  background: url(../assets/img/pick/pc/title.png) no-repeat center/cover;
}
.top .pic {
  position: absolute;
  bottom: 0;
  left: 324px;
  width: 632px;
  height: 300px;
  background: url(../assets/img/pick/pc/pic.png) no-repeat center/cover;
}
.main {
  padding: 0;
  position: relative;
  height: 853px;
  width: 100%;
}
.main .left {
  position: absolute;
  top: 43px;
  left: 273px;
  width: 327px;
  height: 362px;
  background: url(../assets/img/pick/pc/rules.png) no-repeat center/cover;
}
.main .right {
  position: absolute;
  top: 70px;
  left: 667px;
  width: 310px;
  text-align: left;
  font-size: 14px;
}
.main .right .title {
  padding-left: 64px;
  position: relative;
  height: 55px;
  line-height: 48px;
}
.main .right .title .decoration1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 51px;
  height: 55px;
  background: url(../assets/img/pick/pc/decoration1.png) no-repeat center/cover;
}
.main .right .title .text {
  color: #333;
  font-family: "FZYANS_ZHONGJW--GB1";
  font-size: 32px;
  font-weight: bold;
}
.main .right .section {
  margin-top: 10px;
  font-family: "PingFangSC";
  font-weight: "Regular";
}
.main .right .section .row {
  padding-left: 17px;
  position: relative;
  margin-bottom: 8px;
}
.main .right .section .row .number {
  position: absolute;
  left: 0;
  top: 0;
}
.main .right .qr-code {
  margin-top: 10px;
  padding-left: 80px;
  position: relative;
  height: 80px;
  line-height: 140px;
  font-size: 14px;
  background: url(../assets/img/pick/pc/QR2.png) no-repeat left top/80px 80px;
}
.main .decoration2 {
  position: absolute;
  top: 500px;
  left: 610px;
  width: 51px;
  height: 55px;
  background: url(../assets/img/pick/pc/decoration2.png) no-repeat center/cover;
}
.main .text2 {
  position: absolute;
  left: 577px;
  top: 558px;
  font-family: "FZYANS_ZHONGJW--GB1";
  font-size: 32px;
  font-weight: bold;
}
.main .line123 {
  position: absolute;
  left: 302px;
  top: 629px;
  width: 687px;
  height: 167px;
  background: url(../assets/img/pick/pc/line123.png) no-repeat center/cover;
}
.main .item {
  position: absolute;
  top: 810px;
  text-align: center;
  font-size: 14px;
}
.main .item1 {
  left: 352px;
}
.main .item2 {
  left: 500px;
}
.main .item3 {
  left: 692px;
}
.main .item4 {
  left: 840px;
}
</style>