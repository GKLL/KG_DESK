<template>
  <div class="invite">
      <div class="banner">
      </div>
      <div class="info">
        <p class="num">{{data.inviteCount}}</p>
        <p class="dis">成功邀请数</p>
        <div class="adard_progress">
          <p class="award_num">
            <span :class="[activeClass1]">10个</span>
            <span :class="[activeClass2]">30个</span>
            <span :class="[activeClass3]">50个</span>
            <span :class="[activeClass4]">80个</span>
          </p>
          <p class="award_level">
            <span :class="[activeClass1]">很简单</span>
            <span :class="[activeClass2]">有点难!</span>
            <span :class="[activeClass3]">特别难!!</span>
            <span :class="[activeClass4]">不可能!!!</span>
          </p>
          <p class="award_progress">
            <i :class="[activeClass1]"></i>
            <i :class="[activeClass2]"></i>
            <i :class="[activeClass3]"></i>
            <i :class="[activeClass4]"></i>
            <span class="award_progress_real" :style="{width: _width}"></span>
          </p>
          <p class="award_TV">
            <span style="color: #5e5e5e">奖励：</span>
            <span >2TV</span>
            <span >10TV</span>
            <span >30TV</span>
            <span >50TV</span>
          </p>
        </div>
        <p v-if="data.inviteStatus" class="dis2">再邀请{{params.rest_num}}个你就能领到{{params.award}}TV奖励了</p>
        <p v-else class="dis2">您的邀新奖励已冻结,<span v-if="data.inviteFreezeReason">原因：{{data.inviteFreezeReason}}。</span>请联系客服了解详情。</p>
        <p v-if="data.inviteStatus != 0 && data.inviteCount < 10"><el-button type="primary" class="fontf" @click="inviteNew">邀请收徒</el-button></p>
        <!-- 如果可以提现 -->
        <p v-if="data.inviteStatus == 1 && data.inviteCount >= 10"><el-button type="primary" @click="withdrawmask= !withdrawmask">立即提取奖励</el-button> <el-button type="primary" @click="inviteNew">继续邀请收徒</el-button></p>
        <p v-if="data.inviteStatus == 0 || data.inviteStatus == 2"><el-button disabled plain  >已冻结</el-button> <el-button type="primary" @click="inviteNew">继续邀请收徒</el-button></p>        
        <!-- <p>我的邀请码</p> -->
        <!-- <p class="my_code">{{data.inviteCode}}</p> -->
      </div>
      <div class="gray" style = "margin-top:20px">
        <p>规则：</p>
        <p>1.奖励兑换</p>

        <p>有效邀请数>=10即可领取2TV       有效邀请数>=30即可领取10TV</p>

        <p>有效邀请数>=50即可领取30TV     有效邀请数>=80即可领取50TV</p>

        <p>2.领取奖励后，将扣除相应的邀请数值，如：</p>

        <p>成功邀请12人，选择领取奖励将获得10人对应的2TV,奖励并扣除10人成功邀请数，剩余2人。</p>
        <p>3.发起提取后即时到账，获得的奖励5日内无法提现</p>

        <p>4.什么是有效邀请：好友通过您的邀请链接或者邀请码注册并登录，算为一次有效邀请。</p>

        <p>5.成功邀请的新用户将自动成为您的徒弟。</p>

        <p>6.邀请好友仅对于邀请新用户，老用户无效。</p>

        <p>7.邀请真实用户才会增加有效次数。</p>

        <p>8.若通过但不限于技术手段等方式，恶意邀请徒弟，赚取平台奖励者，一经平台发现，将冻结所有奖励。</p>
        <p>冻结后七日未处理，相应奖励将退回处理。</p>

        <p>9.活动最终解释权归千氪财经所有。</p>
        <span id="mincode" style="width:200px;height:200px;display:block"></span>
      </div>
      <div class="mask" v-show="mask">
        <div class="mask_info">
          <p><i class="el-icon-circle-close-outline" @click="mask=!mask"></i></p>
          <p><span>邀请链接</span><span class="invite_url">{{params.input}}</span></p>
          <div class="imgBox">
            <p>邀请二维码</p>
                          <span id = 'wechat_code1' class = 'wechatCode'></span>
            
            <!-- <img class="invite_code" id="wechat_code1" src="b64" alt="邀新二维码"> -->
          </div>
          <p>这是您的邀新专属链接，请复制该链接，或扫描二维码分享给您的好友，他们完成注册，您就可以拿到奖励啦！</p>          
          <p><el-button type="primary" @click="mask=!mask">我知道了</el-button></p>
        </div>
      </div>
      <div class="mask" v-if="withdrawmask">
        <div class="withdrawmask_info">
          <p><span>提取奖励</span><i class="el-icon-circle-close-outline" @click="withdrawmask=!withdrawmask"></i></p>
          <el-input v-model="input" type="password" placeholder="请输入交易密码"></el-input>
          <p class="without">还没有交易密码，马上去<el-button @click="setting" type="text">设置</el-button></p>
          <p>
            <el-button plain  @click="withdrawmask =!withdrawmask">取消</el-button>
            <el-button type="primary" @click="withdraw_money">确认</el-button>
          </p>
        </div>
      </div>
      <div class = 'mask' v-if="true" style = "position:absolute;background: rgba(0, 0, 0, 0.6);color:#fff;text-align: center;
    padding-top: 500px;">邀新与收徒已移至千氪APP啦，请下载千氪APP进行邀新与收徒</div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import QRCode from 'qrcodejs2'; // 引入生成二维码插件
import conf from './../../../../assets/js/conf'; // 引入邀请链接
export default {
  data () {
    return {
      num: 10, // 成功邀请的个数
      active:0,
      data: {
        inviteCount:0
      },
      _width: 10+'px',
      activeClass1: 'no_active',
      activeClass2: 'no_active',
      activeClass3: 'no_active',
      activeClass4: 'no_active',
      params: {
        rest_num: 10, // 再邀请人
        award: -1, // 获得奖励
        code: 'HJDUQW',
        input: "https://www.kg.com/detail/list.htmlid=NDE3MzY2MDIzMjQ3ODk2NTc2_412038012965363712"
      },
      mask: false,
      withdrawmask: false,
      userId: '',
      Qrdata: ''
    }
  },
  methods: {
    setting () { // 跳转到设置交易密码界面
        localStorage.setItem('trader_pwd',2)
        window.open("#/account_safe?from=psd")
        localStorage.setItem('trader_pwd',2)
    },
    inviteNew () {
      this.mask = !this.mask;
      var box = document.getElementById('wechat_code1').childNodes;
      if (!box.length) {
        this.params.input = conf.devIp+ 'teacher_pupil/list.html?userId='+this.userId+'inviteCode='+this.data.inviteCode;
            var invite_url = conf.devIp+ 'teacher_pupil/list.html?userId='+this.userId+ 'inviteCode='+this.data.inviteCode,
          wechat_share = Lib.M.noSignRequest({"url": invite_url});
          const wechatCode = document.getElementById('wechat_code1');
            new QRCode(wechatCode, {
              text: invite_url,
              width: 180,
              height: 180,
              colorDark: "#000000",
              colorLight: "#ffffff"
            })
      }
      else return
      
    },
    withdraw_money () {
      const vm = this,
            list = Lib.M.dataRequest({
                "userId":localStorage.getItem('kg_desk_userId'),
                "txPassword": vm.input
            });
      Lib.M.ajax({
        'type': 'post',
        'url': 'userRelation/applyWithdraw',
        'data': list,
        'success': function (data) {
          if (data.code == 10000) {
            vm.withdrawmask = !vm.withdrawmask
            vm.$message({
              message: '奖励提现成功',
              type: 'success'
            });
            vm.getdata();
          }
          else {
            vm.$message.error(data.message);
          }
        }
        })
    },
    getdata () {
      const userId = localStorage.getItem("kg_desk_userId"),
            vm = this,
            list = Lib.M.dataRequest({
                            "userId":localStorage.getItem('kg_desk_userId')
                });
                Lib.M.ajax({
              'type':'post',
              'url':'userRelation/invite',
              "data":list,
              'success':function (data){
                  if(data.code == 10000) {
                     vm.data = data.responseBody;
                    //  vm.data.inviteCount =70;
                    if  (vm.data.inviteCount >= 80) {
                        vm._width = 80*10 +'px';
                    }
                    else {vm._width = vm.data.inviteCount*10 +'px';}
                    if (vm.data.inviteCount <10) {
                      vm.params.rest_num = 10 - vm.data.inviteCount;
                      vm.params.award = 2;
                    }
                    else if(vm.data.inviteCount >=10 && vm.data.inviteCount< 30) {
                      vm.params.rest_num = 30 - vm.data.inviteCount;
                      vm.params.award = 10;
                      vm.activeClass1 ='active';
                    }
                    else if(vm.data.inviteCount >=30 && vm.data.inviteCount< 50) {
                      vm.params.rest_num = 50 - vm.data.inviteCount;
                      vm.params.award = 30;
                      vm.activeClass1 ='active';
                      vm.activeClass2 ='active';
                    }
                    else if(vm.data.inviteCount >=50 && vm.data.inviteCount< 80) {
                      vm.params.rest_num = 80 - vm.data.inviteCount;
                      vm.params.award = 50;
                      vm.activeClass1 ='active';
                      vm.activeClass2 ='active';
                      vm.activeClass3 ='active';
                    }
                    else if(vm.data.inviteCount >=80 ) {
                      vm.activeClass1 ='active';
                      vm.activeClass2 ='active';
                      vm.activeClass3 ='active';
                      vm.activeClass4 ='active';
                    }
                  }
                  else {
                    vm.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });
    }
  },
  created () {
    this.userId = localStorage.getItem("kg_desk_userId");
    localStorage.setItem('is_new_reward', 1)
    this.getdata();
  },
  destroyed () {
    localStorage.setItem('is_new_reward', 0)
  }
}
</script>

<style lang="less" scoped>
.invite, .fontf {
  font-family: 'PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STHeitiSC-Light, simsun, \\5B8B\4F53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";';

  .banner {
    width: 100%;
    height: 240px;
    background: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18032702/invite_banner.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .info{
    .adard_progress {
      .award_num {
        width: 871px;
        position: relative;
        height: 25px;
        top: -45px;
        margin: 0 auto;
        text-align: left;
        .active {
          color: #258bff;
        }
        span {
          // position: absolute;
          font-size: 16px;
          line-height: 3;
          color: #bfc4cf;
          padding-left: 120px;
          &:nth-child(2) {
          padding-left: 165px;          
          }
          &:nth-child(3) {
            padding-left: 160px;
          }
          &:nth-child(4) {
            padding-left: 245px;
          }
        }
      }
      .award_level {
        width: 871px;
        position: relative;
        height: 25px;
        top: -45px;
        margin: 0 auto;
        text-align: left;
        .active {
          color: #258bff;
        }
        span {
          // position: absolute;
          font-size: 16px;
          line-height: 3;
          color: #bfc4cf;
          padding-left: 110px;
          &:nth-child(2) {
          padding-left: 150px;          
          }
          &:nth-child(3) {
            padding-left: 139px;
          }
          &:nth-child(4) {
            padding-left: 205px;
          }
        }
      }
      .award_progress {
          width: 800px;
          height: 6px;
          border-radius: 3px;
          background-color: #e3e4e6;
          margin: 0 auto;
          position: relative;
          i{
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            background-color: #e3e4e6;
            position: absolute;
            top: -6px;
            left: 90px;
            &:nth-child(2) {
              left: 290px;
            }
            &:nth-child(3) {
              left: 490px;
            }
            &:nth-child(4) {
              left: 790px;
            }
          }
          .active {
            background-color: #258bff;
            // left: 200px;
            span {
              position: absolute;
              top: -6px;
            }
          }
      }
      .award_TV { // 奖励TV币
        width: 830px;
        font-size: 18px;
        height: 75px;
        line-height: 2.67;
        letter-spacing: 1.1px;
        color: #333;
        position: relative;
        margin:  0 auto;
        text-align: left;
        top: 23px;
        span {
          // position: absolute;
          // top: 23px;
          // left: 50px;
          padding-left: 15px;
          &:nth-child(2) {
            padding-left: 20px;
          }
          &:nth-child(3) {
            padding-left: 160px;
          }
          &:nth-child(4) {
            padding-left: 140px;
          }
          &:nth-child(5) {
            padding-left: 205px;
          }
        }
      }
    }
    p{
      text-align: center;
      &:nth-child(6) {
        font-size: 16px;
        line-height: 3;
        color:#5e5e5e;
      }
      &:nth-child(7) {
        font-size: 36px;
        line-height: 1.33;
        color:#333;
        font-weight: 600;
        letter-spacing: 2.2px;
        margin-bottom: 47px;
      }
    }
    .num  {
      font-size: 53px;
      color: #258bff;
      line-height: 48px;
      margin-top: 51px;
      letter-spacing: 4.3px;
    }
    .dis {
       margin-bottom: 63px;
    }
    .dis,.dis2 {
      font-size: 16px;
      line-height: 48px;
      letter-spacing: 1px;
      color: #5e5e5e;
    }
    .dis2{color: #bfc4cf}
    p {
      .el-button--primary {
        width: 161px;
        height: 42px;
        font-size: 16px;
        border-radius: 4px;
        background-color: #228aff;
        font-weight:normal;
        font-family: 'PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STHeitiSC-Light, simsun, \\5B8B\4F53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";' !important;
      }
    }
  }
    .gray {
      width: 770px;
      height: 430px;
      border-radius: 10px;
      background-color: #f4f4f4;
      margin: 0 auto 42px auto;
      padding: 30px 0 0 31px;;
      p{
        font-size: 16px;
        line-height: 2;
        color: #595959;
          &:first-child {
          font-size: 18px;
          height: 17px;
          font-weight: 600;
          line-height: 0.89;
        }
      }
    }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  .mask_info {
    width: 560px;
    height: 500px;
    border-radius: 6px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -280px;
    p {
      &:nth-child(1) {
        height: 58px;
        position: relative;
        .el-icon-circle-close-outline{
          position: absolute;
          font-size: 18px;
          color: #c6c6c6;
          top: 20px;
          right: 20px;
        }
      }
      &:nth-child(2) {
        position: relative;
        height: 33px;
        font-size: 14px;
        line-height: 1.29;
        margin-bottom: 31px;
        span {
          position: absolute;
          display: block;
          color: #999;
          left: 46px;
        }
        .invite_url {
          width: 390px;
          color: #228aff;
          left: 121px;
          word-wrap: break-word;
        }
      }
      &:nth-child(4) {
        font-size: 14px;
        position: relative;
        color: #999;
        width: 390px;
        word-wrap: break-word;
        left: 121px;
      }
      &:nth-child(5) {
        text-align: center;
        margin-top: 35px;
        .el-button--primary {
          width: 161px;
          height: 42px;
          font-family: 'PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STHeitiSC-Light, simsun, \\5B8B\4F53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";' !important;          
        }
      }
    }
    .imgBox {
      position: relative;
      font-size: 14px;
      height: 220px;
      color: #999;
      #wechat_code1{
        width: 180px;
        display: block;
        height: 180px;
        position: absolute;
        left: 121px;
        display: inline-block;
        border-top: 20px solid #f4f4f4;
        border-bottom: 16px solid #f4f4f4;
        border-right: 104px solid #f4f4f4;
        border-left: 103px solid #f4f4f4;
        
      }
      p{
        &:first-child {
          position: absolute;
          left: 30px;
          top: 0px;
        }
      }
    }
  }
}
.withdrawmask_info {
  width: 330px;
  height: 200px;
  border-radius: 6px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -165px;
  margin-top: -100px;
  p {
    text-align: center;
    &:nth-child(1) {
      position: relative;
      height: 67px;
      span {
        font-size: 18px;
        line-height: 3.33;
        letter-spacing: 1.1px;
        color: #767676;
      }
      .el-icon-circle-close-outline {
          position: absolute;
          font-size: 18px;
          color: #c6c6c6;
          top: 20px;
          right: 20px;
      }
    }
    &:last-child {
      .el-button {
        width: 100px;
        height: 32px;
        line-height: 8px;
      }
    }
  }
  .without {
    font-size: 14px;
    letter-spacing: 0.8px;
    color: #767676;
    // margin-bottom: 19px;
  }
  .el-input {
      width: 214px;
      height: 32px;
      margin: 0 auto 10px 59px;
    }
}
.award_progress_real { // 蓝色进度条
  position: absolute;
  height: 6px;
  border-radius: 6px;
  background-color: #258bff;
  left: 0;
  // width: 800px !important;
}
</style>
<style lang="less" >
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  .mask_info {
    width: 560px;
    height: 500px;
    border-radius: 6px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -280px;
    p {
      &:nth-child(1) {
        height: 58px;
        position: relative;
        .el-icon-circle-close-outline{
          position: absolute;
          font-size: 18px;
          color: #c6c6c6;
          top: 20px;
          right: 20px;
        }
      }
      &:nth-child(2) {
        position: relative;
        height: 33px;
        font-size: 14px;
        line-height: 1.29;
        margin-bottom: 31px;
        span {
          position: absolute;
          display: block;
          color: #999;
          left: 46px;
        }
        .invite_url {
          width: 390px;
          color: #228aff;
          left: 121px;
          word-wrap: break-word;
        }
      }
      &:nth-child(4) {
        font-size: 14px;
        position: relative;
        color: #999;
        width: 390px;
        word-wrap: break-word;
        left: 121px;
      }
      &:nth-child(5) {
        text-align: center;
        margin-top: 35px;
        .el-button--primary {
          width: 161px;
          height: 42px;
          font-family: 'PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STHeitiSC-Light, simsun, \\5B8B\4F53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";' !important;          
        }
      }
    }
    .imgBox {
      position: relative;
      font-size: 14px;
      height: 220px;
      color: #999;
      #wechat_code1{
        width: 180px;
        display: block;
        height: 180px;
        position: absolute;
        left: 121px;
        display: inline-block;
        border-top: 20px solid #f4f4f4;
        border-bottom: 16px solid #f4f4f4;
        border-right: 104px solid #f4f4f4;
        border-left: 103px solid #f4f4f4;
        
      }
      p{
        &:first-child {
          position: absolute;
          left: 30px;
          top: 0px;
        }
      }
    }
  }
}
.withdrawmask_info {
  width: 330px;
  height: 200px;
  border-radius: 6px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -165px;
  margin-top: -100px;
  p {
    text-align: center;
    &:nth-child(1) {
      position: relative;
      height: 67px;
      span {
        font-size: 18px;
        line-height: 3.33;
        letter-spacing: 1.1px;
        color: #767676;
      }
      .el-icon-circle-close-outline {
          position: absolute;
          font-size: 18px;
          color: #c6c6c6;
          top: 20px;
          right: 20px;
      }
    }
    &:last-child {
      .el-button {
        width: 100px;
        height: 32px;
        line-height: 8px;
      }
    }
  }
  .without {
    font-size: 14px;
    letter-spacing: 0.8px;
    color: #767676;
    // margin-bottom: 19px;
  }
  .el-input {
      width: 214px;
      height: 32px;
      margin: 0 auto 10px 59px;
    }
}
</style>



