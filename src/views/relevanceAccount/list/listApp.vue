<template>
<div class="connect">
<!--以下为手机端-->
	<div id="mobile" v-if = "relevanceVisible">
    <div class="logo">
      <i class="iconfont icon-ziyuan"></i>
      <span>千氪</span>
    </div>
    <div class="mainBody">
      <img :src="userInfo.headImgurl" alt="用户头像">
      <div>{{userInfo.nickName}}</div>
      <div>您尚未关联千氪账号</div>
      <div><el-button @click="connectNew"  type="primary">关联新账号</el-button></div>
      <div><el-button  @click="connectExits">关联已有账号</el-button></div>
    </div>
	</div>
<!--以下为电脑端-->
  <div class="relevance">
    <hb-head></hb-head>
    <div class="info">
      <img :src="userInfo.headImgurl" alt="用户头像">
      <p>{{userInfo.nickName}}</p>
      <p>你尚未关联账号</p>
      <div><el-button type="primary" @click="newAcount">关联新账号</el-button></div>
      <div><el-button @click="toReady">关联已有账号</el-button></div>
      <rele-rigister class = 'login_register_modal' :visible = "registerVisible" :toReady="toReady" :cancel = "cancelRele" :userInfo = "userInfo" :slideInfo = "slideInfo" :handleSlide = "handleSlide"></rele-rigister>
      <rele-ready-account :toRetrieve = "toRetrieve" :visible = "releReadyVisible" :toMessage="toMessage" :toRelce="newAcount"  :cancel = "cancelRele" :userInfo = "userInfo"></rele-ready-account>
      <rele-login :visible="messageVisible" :toReady="toReady" :cancel = "cancelRele" :userInfo = "userInfo" :slideInfo = "slideInfo"
      :handleSlide = "handleSlide"
      />
      <retrieve class = 'login_register_modal' :visible = "retrieveVisible" :cancel="cancelRetrieve" :slideInfo = "slideInfo"
        :handleSlide = "handleSlide"
      />
    </div>
  </div>
  <div v-if = "visible"
    v-loading="visible"
    element-loading-text="拼命加载中"
     class = 'relevanceModal'
      element-loading-spinner="el-icon-loading"
     ></div>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import releRigister from 'components/releRigister'
import releReadyAccount from 'components/releReadyAccount'
import releLogin from 'components/releLogin'
import retrieve from 'components/Retrieve';
export default {
  components: { HbHead, releRigister, releReadyAccount, releLogin, retrieve },
  data () {
    return {
      registerVisible:true,
      releReadyVisible: false,
      messageVisible: true,
      retrieveVisible: true,
      userInfo:{},
      openId:'',
      visible:false,
      relevanceVisible:false,
      slideInfo:{
        'session':'',
        'sig':'',
        'token':'',
        'scene':''
      }
    }
  },
  mounted(){
    const that = this;
    this.registerVisible = false;
    this.messageVisible = false;
    this.retrieveVisible = false;
    const localUrl = localStorage.getItem('localUrl');
    const code = Lib.M.getUrlQuery('code');
    const openType = localStorage.getItem('openType');
    let bindOppId = localStorage.getItem('kg_third_openId');
    let bindData = JSON.parse(localStorage.getItem('kg_bind_data'));
    let bindData2 = JSON.parse(localStorage.getItem('bindData2'));
    if(bindOppId == null || bindOppId == ''){
          const thirdParty = Lib.M.noSignRequest({
                  "code":code,
                  "openType":openType,
                  'source':localUrl.indexOf('account_safe') != '-1' ? '0' : '1'
          })
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/thirdParty/checkThirdUserInfo',
                  "data":thirdParty,
                  'success':function (data){
                    if(data.code == 10000){
                                            data = data.responseBody.data;
                                           
                                            that.openId = data.openId
                                            if(localUrl.indexOf('account_safe') != '-1'){
                                                const bindWeibo = Lib.M.dataRequest({
                                                                  "openId":data.openId,
                                                                  "userId":localStorage.getItem('kg_desk_userId'),
                                                                  "openType":openType,
                                                })
                                                Lib.M.ajax({
                                                      'type':'post',
                                                      'url':'/thirdParty/bindUser',
                                                      "data":bindWeibo,
                                                      'success':function (data){
                                                          if(data.code == 10000){
                                                              let indexTitle = document.getElementsByTagName('title')[0];
                                                              indexTitle.innerHTML = '绑定账号';
                                                              localStorage.setItem('isBind',2);
                                                              that.$message({
                                                                type:"success",
                                                                message:"绑定成功"
                                                              })
                                                              setTimeout(()=>{
                                                                window.opener.reload();
                                                                window.open("about:blank","_self").close()
                                                              },1000);     
                                                          }else{
                                                            that.$message({
                                                              message: data.message,
                                                              type: 'error'
                                                            });
                                                            setTimeout(()=>{
                                                              window.open("about:blank","_self").close()
                                                            },1000);

                                                          }

                                                    }
                                                });
                                                return
                                            }else if(data.bindStatus == 2){
                                              window.location.href = 'https://api.weibo.com/oauth2/authorize?client_id='+Lib.C.wbappid+'&redirect_uri='+ Lib.C.redirectUrl;
                                            }else if(data.bindStatus == 3){
                                              window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid='+Lib.C.wxappid+'&redirect_uri='+Lib.C.redirectUrl+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
                                            }else if(data.bindStatus == 1){
                                                          that.visible = true;
                                                          localStorage.setItem('kg_desk_token', data.token);
                                                          localStorage.setItem('kg_desk_approve', data.realnameAuthed);
                                                          localStorage.setItem('kg_desk_userId', data.userId);
                                                          localStorage.setItem('kg_desk_userMobile', data.userMobile);
                                                          localStorage.setItem('kg_desk_atskMobile', data.atskMobile);
                                                          localStorage.setItem('kg_desk_mobileArea', data.mobileArea);
                                                          localStorage.setItem('kg_desk_roleId', data.userRole);
                                                          localStorage.setItem('kg_desk_userName', data.userName);
                                                          that.visible = false;
                                                          const clientWidth = document.body.clientWidth;
                                                          if(clientWidth <700){
                                                            window.location.href = localUrl
                                                          }else{
                                                            window.opener.reload2()
                                                            window.open("about:blank","_self").close()
                                                          }
                                            }else if(data.bindStatus == 0){
                                              localStorage.setItem('kg_third_openId',data.openId);
                                              localStorage.setItem('kg_bind_data',JSON.stringify(data));
                                              localStorage.setItem('bindData2','11');
                                              that.userInfo = data;
                                              that.relevanceVisible = true;
                                              that.visible = false;
                                              window.opener.reload()
                                              window.open("about:blank","_self").close()
                                            }
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                        setTimeout(()=>{
                            window.open("about:blank","_self").close()
                        },1000);
                        that.loginLoading = false
                    }

              }
           });
    }else{
      that.userInfo = bindData;
      that.relevanceVisible = true;
      that.visible = false;
       window.opener.reload();
       window.open("about:blank","_self").close()
    }
  },
  methods: {
   handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    connectExits () { // 手机端调到关联已有账号
      window.location.href = "../connectHasAccount/list.html?id=" + this.openId;
    },
    connectNew () {
      window.location.href = "../connectNew/list.html?id=" + this.openId;
    },
    newAcount () {
      this.registerVisible = true;
      Lib.M.aliBlock('#rele_registerBlock',this,'csessionid101','sig101','token101','scene101')
    },
    cancelRele () {
      this.registerVisible = false;
      this.releReadyVisible = false;
      this.messageVisible= false;
    },
    cancelRetrieve () {
      this.retrieveVisible = false;
      this.releReadyVisible = false;
      this.messageVisible = false;
    },
    toReady () {
      this.releReadyVisible = true;
      this.registerVisible = false;
      this.messageVisible= false;
    },
    toMessage () {
      this.messageVisible = true;
      Lib.M.aliBlock('#releLoginBlock',this,'csessionid102','sig102','token102','scene102')
    },
      toRetrieve(){
        this.retrieveVisible = true;
      },
  }
}
</script>
<style lang="less">
#mobile {
  .el-button {
    font-family: 'PingFangSC-Regular' !important;
    }
  .el-button--default {
    color:rgba(153,153,153,1);
  }
}
.relevanceModal{
  .el-loading-mask{
  z-index:200
}
}

</style>

<style lang="less" scoped>
.relevanceModal{
  width:100%;
  height:100%;
}
.connect {
  width: 100%;
  height: 100%;
}
@media only screen and (max-width:700px) {
  .relevance{display: none;}
  #mobile {
  width: 100%;
  height: 100%;
  font-family: 'PingFangSC-Regular' !important;
  }
  .logo {
    width: 100%;
    height: 44px;
    color:rgba(2,132,254,1);
    font-size: 22px;
    text-align: center;
    line-height: 44px;
    background: #fff;
  }
   .icon-ziyuan{font-size: 22px;}
   .mainBody {
     text-align: center;
     background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/connect.png');
     background-size: cover;
     img {
       width: 90px;
       height: 90px;
       border-radius: 50%;
       margin-top: 125px;
       border: 5px solid rgba(140,199,255,0.25);
     }
     div {
       &:nth-child(2) {
         font-size:18px;
        font-family:'PingFangSC-Regular';
        color:rgba(51,51,51,1);
        margin-top: 25px;
        margin-bottom: 19px;
       }
       &:nth-child(3) {
         font-size:14px;
        font-family:'PingFangSC-Regular';
        color:rgba(51,51,51,1);
        margin-bottom: 26px;
       }
       padding: 0  21px;
       .el-button {
         width: 100%;
         height: 45px;
         margin-bottom: 20px;
       }
     }
   }

}
@media only screen and (min-width:701px) {
#mobile {display: none;}
.relevance{
  height: 100%;
  width: 100%;
  font-family:'PingFangSC-Regular' !important;
  position: relative;
  .info {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin-left: -200px;
    margin-top: -154px;
  }
  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
  }
  p {
    font-size:18px;
    color:rgba(51,51,51,1);
    line-height:60px;
    &:nth-child(3) {
      font-size:14px;
    }
  }
  .el-button {
    width:267px;
    height:32px; 
    background:rgba(34,138,255,1);
    border-radius: 4px;
    line-height: 0;
    font-family:'PingFangSC-Regular' !important;
  }
  .el-button--default{
    background:rgba(255,255,255,1);
    margin-top: 25px;
  }
}
}
</style>
