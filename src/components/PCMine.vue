<template>
	<div class="container">
    <div class = 'banner'>
      <img class = 'logo' src = '../assets/img/logo@2x.png' @click = "goIndex" />
      <img class = 'logo deep' src = '../assets/img/deep.png' @click = "goIndex" />
    </div>
    <div class = 'mill-content'>
      <!-- 活动描述 -->
      <div class = 'descript'>
        <p class = 'tit'>活动说明</p>
        <p class = 'colorBF marbottom10'>本次活动由千氪财经发起，deepfin冠名，由熊猫矿机、kc-Chain、Coinwallet、币派提供商品赞助支持。</p>
        <p class = 'tit'>活动时间</p>
        <p class = 'colorBF marbottom10'>{{startTime}}-{{endTime}}</p>
        <p class = 'tit'>活动内容</p>
        <p class = 'colorE4'>一、稀世矿机、硬件钱包0元抢</p>
        <p class = 'colorBF marbottom10'>用户下载千氪APP并注册并登录，进入本次活动页面，挑选喜欢的矿机或硬件钱包，点击“0元抢”按钮即可开抢！邀请好友助力，为矿机或硬件钱包蓄能！数量有限，先到先得！</p>
        <p class = 'colorADD font14'>注：</p>
        <p class = 'colorADD font14'>1、所展示出的矿机或硬件钱包均由赞助商友情提供，数量唯一；</p>
        <p class = 'colorADD font14'>2、用户参与本次活动，需消耗1000氪金开启本次活动；</p>
        <p class = 'colorADD font14 marbottom10'>3、开启活动后，需通过邀请好友助力，为心仪的矿机或硬件钱包蓄能，能量值满则蓄能成功，即可0元拿走该矿机或硬件钱包；</p>
        <p class = 'colorE4'>二、新用户注册享好礼送不停！</p>
        <p class = 'colorBF'>邀请好友下载千氪APP，新用户注册即享1888氪金再加100DFC！（氪金立即到账，DFC领取地址：www.deepfin.one）</p>
      </div>
      <!-- 商品详情 -->
      <div class = 'detail'>
        <div class = 'detial-tit tit'>
          商品详情
        </div>
        <ul>
          <li v-for = '(item,index) in detail' :key = "index">
            <img :src = 'item.img'/>
            <div>
              <p class = 'font26 colorE4E' style = "marginTop:15px">{{item.title}}</p>
              <p class = 'font22 colorFF9'>{{item.price}}</p>
              <p class = 'font22 colorBF'>{{item.des}}</p>
            </div>
          </li>
        </ul>
      </div>
      <p class = 'colorBF font16'>心动不如行动，扫描下方二维码，立即下载千氪APP开抢！</p>
      <span id = 'mine-code' class = 'mine-code'></span>
      <p class = 'color838 font16'>注：本次为千氪财经用户回馈活动，我们将对参与用户进行筛查，发现恶意刷奖行为，将不予以奖励。</p>
      <p class = 'color838 font16' style = "paddingBottom:140px">本次活动最终解释权归千氪财经所有。</p>
    </div>
	</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import conf from "./../assets/js/conf"; // 引入邀请链接
import QRCode from "qrcodejs2"; // 引入生成二维码插件
document.documentElement.style.fontSize = '12px';
export default {
  data(){
    return {
      detail:[
        {'title':'PandaMiner B3 Pro熊猫矿机','price':'当前市价：16800元','des':'挖掘币种：ETH/ETC/XMR/ZEC等多种GPU可支持算法币种！','img':'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine1.png'},
        {'title':'K矿机','price':'当前市价：12888元','des':'挖掘币种：KCC，K粉们的心头大爱！','img':'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine2.png'},
        {'title':'Bepal Pro S硬件钱包','price':'当前市价：3280元','des':'全面支持EOS、BTM主网生态，EOS一键映射和快捷投票功能。','img':'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine3.png'},
        {'title':'Ledger Nano S硬件钱包','price':'当前市价：998元','des':'市场认可度最高的硬件钱包产品之一。','img':'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine4.png'},
        {'title':'Trezor硬件钱包','price':'当前市价：988元','des':'不同的币种可统一管理，无需安装Chrome扩展程序和桌面应用程序。','img':'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mine/mine5.png'},
      ],
      startTime:'',
      endTime:''
    }
  },
  mounted(){
    var app_url = conf.devIp + "/mineH5/list.html";
      const wechatCode = document.getElementById("mine-code");
      var box = document.getElementById("mine-code").childNodes;
      if (!box.length) {
        new QRCode(wechatCode, {
          text: app_url,
          width: 170,
          height: 170,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      }
      const that = this;
      const time_list = Lib.M.postDataRequest('')
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
  methods:{
    goIndex(){
      window.open('../index/list.html')
    }
  }
}
</script>
<style scoped>
.marbottom10{
  margin-bottom:10px;
}
.color838{
  color:#8384D1;
}
.colorE4E{
  color:#E4E5FD;
}
.colorADD{
  color:#ADD2F1;
}
.colorBF{
  color:#BFBFF3;
}
.colorFF9{
  color:#FF9797;
}
.colorE4{
  color:#E4E5FD;
}
.font14{
  font-size:14px;
}
.font26{
  font-size:26px;
}
.font24{
  font-size:24px;
}
.font22{
  font-size:22px;
}
.font16{
  font-size:16px;
}
.mine-code,.mine-code img{
  display: inline-block;
  width:170px;
  height:170px;
  margin:0 auto;
}
.mine-code{
  margin-top:30px;
  margin-bottom:80px;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  text-align: center;
  background: #262762;
}
.banner{
  position: relative;
  width:1440px;
  height:698px;
  margin:0 auto;
  background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180522112741.png') no-repeat;
}
.logo{
    display: inline-block;
    width: 91px;
    height: 37px;
    position: absolute;
    top: 25px;
    /*margin-top:25px;*/
    cursor: pointer;
    left:198px;
}
.deep{
    left: 317px;
    width: 114px;
}
.mill-content{
  width:1100px;
  margin:0 auto;
}
.descript,.detail{
  width:100%;
  border:1px solid #696AB5;
  border-radius: 5px;
  margin-top:10px;
  margin-bottom: 100px;
  padding:30px 52px;
  color:#BFBFF3;
  text-align: left;
  font-size: 16px;
  background: #393A85;
}
.tit{
  color:#FBE239;
  font-size:20px;
}

/*商品详情*/
.detail{
  position: relative;
}
.detial-tit{
    border: 1px solid #696AB5;
    background: #393A85;
    top: -50px;
    border-radius: 10px;
    position: absolute;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}
.detail ul{
  width:100%;
  display: flex;
  flex-direction: column;
  margin:0px;
  padding:0px;
}
.detail li{
  width:1000px;
  height:230px;
  list-style:none;
  display: flex;
  flex-direction: row;
  border-bottom:1px solid #5C5DAB;
  margin-bottom:50px;
  /*justify-content: space-between;*/
}
.detail li:last-child{
  border:0px;
}
.detail li img{
  display: inline-block;
  width:180px;
  height:180px;
  margin-right:40px;
  border-radius: 10px;
}
</style>