<template>
  <div class="inviteH5">
    <div class="bg">
      <div class="con"></div>
      <div class="action">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm registerForm">
          <el-form-item label="" prop="phone" >
               <el-input  size = 'small' placeholder="手机号" type="text" v-model="ruleForm.phone" auto-complete="off" >
                        <el-select slot="prepend" size = 'small' v-model="select">
                                  <el-option
                                 v-for="(item,key) in areaCode"
                                  :key="key"
                                  :label="'+'+item.code"
                                  :value="item.code">
                                  <span style="float: left; color: #8492a6; font-size: 13px">+{{item.code}}</span>
                                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryname }}</span>
                                </el-option>
                        </el-select>
                </el-input>
          </el-form-item>  
          <!-- 滑块验证开始 -->
          <div class="ali">
                  <div class="ln">
                    <div id="registerBlock2"></div>
                  </div>
                  <input type='hidden' id='csessionid12' name='csessionid12'/>
                  <input type='hidden' id='sig12' name='sig12'/>
                  <input type='hidden' id='token12' name='token12'/>
                  <input type='hidden' id='scene12' name='scene12'/>
          </div> 
          <!-- 滑块验证结束 -->
          <el-form-item label="" prop = "code">
            <el-input  size = 'small' type="text" v-model="ruleForm.code" auto-complete="off" class="code" placeholder="验证码">
            <el-button  size = 'small' slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
              <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
              <span v-if="!sendMsgDisabled">验证码</span>
            </el-button>
            </el-input>
          </el-form-item>
          <el-form-item >
            <el-button  type="primary"  @click="submitForm('ruleForm')"  :loading="loginLoading">立即收徒</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span class="line2">活动收益</span>
      <div class="income">
        <div class="incomeTv">
          <div class="mincon">
            <span class="TVnum">10TV</span>
          </div>
          <p>（约合￥10)</p>
          <p class="condition">收徒满10人</p>
        </div>
        <div class="incomeTv">
          <div class="mincon">
            <span class="TVnum">40TV</span>
          </div>
          <p>（约合￥40)</p>
          <p class="condition">收徒满30人</p>
        </div>
        <div class="incomeTv">
          <div class="mincon">
            <span class="TVnum">70TV</span>
          </div>
          <p>（约合￥70)</p>
          <p class="condition">收徒满50人</p>
        </div>
        <div class="incomeTv">
          <div class="mincon">
            <span class="TVnum">150TV</span>
          </div>
          <p>（约合￥150)</p>
          <p class="condition">收徒满80人</p>
        </div>
      </div>
      <div class="remark">*约合人民币金额请以交易市场为准</div>
      <div class="remark">*活动截至2018年4月27日22:00结束；活动结束后，邀新收益将降低至少1倍</div>
      <span class="line2 line3">收徒坐享进贡</span>
      <div class="income2">
        <div class="img"></div>
        <div class="text">
          <p>发文收益进贡</p>
          <p>徒弟获得一笔发文奖励您会有进贡收益</p>
        </div>
      </div>
      <div class="income2 income4">
        <div class="text">
          <p>阅读收益进贡</p>
          <p>徒弟获得一笔阅读奖励您也有进贡收益</p>
        </div>
        <div class="img"></div>
      </div>
      <div class="income2 income3">
        <div class="img"></div>
        <div class="text">
           <p>分享收益进贡</p>
          <p>徒弟获得一笔分享奖励您也有进贡收益</p>
        </div>
      </div>
      <span class="line2 rules">活动规则</span>
      <div class="rulesTxt">
        <p>1、活动时间：即日起至2018年4月27日22:00结束。活动结束后，邀新收益将降低至少1倍;</p>
        <p>2、点击立即收徒后，分享生成的活动页，好友可通过活动页成为你的徒弟；</p>
        <p>3、如果你是新用户，还能得到1888KG新人红包；</p>
        <p>4、邀新收徒仅针对新用户，邀请老用户无效；</p>
        <p>5、若通过但不限于技术手段等方式，恶意邀请徒弟，赚取平台奖励者，一经发现，将冻结所有奖励；</p>
        <p>6、活动最终解释权归千氪财经所有。</p>
      </div>
       <message-mobile class="messageBox" :message="message" v-if="ismessage" />
      <div class="logo"></div>
     
    </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
import MessageMobile from "components/MessageMobile";
export default {
  components: {MessageMobile},
  data() {
      let validatePhone = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入手机号'));
        } else if(this.select == 86 && !(Lib.V.validateChinaPhone(value))){
          callback(new Error('请正确输入手机号'));
        }else if(!(Lib.V.validatePhone(value))){
          callback(new Error('请正确输入手机号'));
        }
        else {
          callback();
        }
      };
      let validateCode = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入验证码'));
        }else if(value.length != 6){
          callback(new Error('请输入正确的验证码'));
        }else {
          callback();
        }
      };
    return {
      areaCode:[{}],
      sendMsgDisabled:false,
      time:90,
      ruleForm: {
          phone:'',
          code:"",
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],
          code:[
            {validator: validateCode, trigger: 'blur' }
          ]
      },
      interval:null,
      select:"86",
      slideInfo:{
        'session':'',
        'sig':'',
        'nc_token':'',
        'nc_scene':''
      },
      ismessage:false,
      message:"",
      loginLoading:false,
    }
  },
  //已成功挂载，相当ready()
  mounted(){
    this.areaCode = codeData;
    Lib.M.aliBlock('#registerBlock2',this,'csessionid12','sig12','token12','scene12');
  },
  //相关操作事件
  methods: {
    handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let register_phonelist = {
                      "userMobile":this.ruleForm.phone,
                      "code":this.ruleForm.code
            }
/*            if(this.slideInfo.session == ''){
              this.ismessage = true;
              this.message = '验证失败，请重新进行滑块验证'
              this.closeMessage(3000)
            }*/
            register_phonelist = Lib.M.noSignRequest(register_phonelist);
            const that = this;
            this.loginLoading = true;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/mobileLogin',
                  "data":register_phonelist,
                  'success':function (data){
                      if(data.code == 10000){
                        data = data.responseBody.data;
                        localStorage.setItem('kg_desk_token', data.token);
                        localStorage.setItem('kg_desk_approve', data.realnameAuthed);
                        localStorage.setItem('kg_desk_userId', data.userId);
                        localStorage.setItem('kg_desk_userName', data.userName);
                        localStorage.setItem('kg_desk_userMobile', data.userMobile);
                        localStorage.setItem('kg_desk_roleId', data.userRole);
                        localStorage.setItem('kg_desk_atskMobile', data.atskMobile);
                        localStorage.setItem('kg_desk_mobileArea', data.mobileArea);
                        localStorage.setItem('kg_desk_inviteCode', data.inviteCode);
                        that.loginLoading=false;
                        if(data.newUser) {
                          window.location.href = '../inviteH5New/list.html?userId='+ data.userId+ 'inviteCode='+data.inviteCode;
                        }
                        else window.location.href = '../inviteH5Old/list.html?userId='+ data.userId+ 'inviteCode='+ data.inviteCode;

                      }else{
                          that.ismessage = true;
                            that.message = data.message
                            that.closeMessage(3000)   
                            that.loginLoading = false;                  
                      }

              }
            });
          } else {
            return false;
          }
        });
      },
      closeMessage(t){
       setTimeout(()=>{
                  this.ismessage=false;
              },t);
      },
      send(form) {
        const send_list  = Lib.M.noSignRequest({
                "verIfy":this.ruleForm.phone,
                "mobileArea": this.select,
                "platform":'3',
                "session":this.slideInfo.session,
                "sig":this.slideInfo.sig,
                "token":this.slideInfo.nc_token,
                "scene":this.slideInfo.nc_scene,
              }) 
        // Lib.M.sendMessage(form,this,send_list,'#registerBloc2','csessionid12','sig12','token12','scene12')
        const me = this;
      me.time =90;
      
      window.clearInterval(me.interval);
          me.$refs[form].validateField('phone',(phone) => {
              if(phone == ""){
                Lib.M.loginAjax({
                      'type':'post',
                      'url':"/userkg/sendSmsEmailcode",
                      "data":send_list,
                      'success':function (data){
                        if(data.code == 10000){
                            me.ismessage = true;
                            me.message = '短信已经发送'
                            me.closeMessage(3000)
                          me.sendMsgDisabled = true;
                             me.interval = window.setInterval(function() {
                        if ((me.time--) <= 0) {
                          me.time = 90;
                          me.sendMsgDisabled = false;
                          Lib.M.aliBlock('#registerBlock2',me,'csessionid12','sig12','token12','scene12')
                          me.handleSlide('','','','')
                        }
                      }, 1000);
                        }else if(data.code == 10020){
                            me.ismessage = true;
                            me.message = data.message
                            me.closeMessage(3000)
                            Lib.M.aliBlock('#registerBlock2',me,'csessionid12','sig12','token12','scene12')
                            me.handleSlide('','','','')
                        }else{
                            me.ismessage = true;
                             me.message = data.message
                            me.closeMessage(3000)
                            Lib.M.aliBlock('#registerBlock2',me,'csessionid12','sig12','token12','scene12')
                           me.handleSlide('','','','')
                        }
                      }
               })

            }else{
              return false
            }
          });       
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="less">
 // 设计图的一半
  .inviteH5 {
    font-family:'PingFangSC-Regular' !important;
    .el-input__inner{ font-family:'PingFangSC-Regular' !important;}
    .bg{
      width:100%;
      text-align:center;
      position: relative;
      padding-top: 380px;
      height: 108px;
      background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/bg%402x.png');
      background-size:cover;
      background-repeat: no-repeat;
      background-position-x: 1px;
      .con{
        width: 170px;
        height: 141px;
        position: absolute;
        background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/coin%402x.png');
        background-size: contain;
        left: 0;
        top: 287px;
      }
      .action{
        width: 260px;
        height: 230px;
        padding: 25px 30px 30px 30px;
        margin: 0 auto;
        border-radius: 8px;
        background:rgba(255,255,255,1); 
        box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        -webkit-box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        -moz-box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        .nc_scale, .nc-container .nc_scale span{height: 44px;line-height: 44px;}
        .el-form-item{margin-bottom: 25px;}
        .nc-container .nc_scale span{height: 42px;}
        .el-input__suffix{
          right: 0;
          height: 44px;
        }
        .codeBtn{height: 44px;}
        .el-input__inner{height: 44px;}
        .el-button--primary{width: 100%;font-family:'PingFangSC-Regular' !important;height: 44px;background:rgba(34,138,255,1);}
      }

      // 
      .line2 {
        margin-top: 55px;
        margin-bottom: 33px;
        display: block;     /*设置为块级元素会独占一行形成上下居中的效果*/
        font-size: 18px;
        color:#228AFF;
        position: relative;
        text-align: center;
        &::before, &::after {
          content: '';                 /*CSS伪类用法*/
          position: absolute;         /*定位背景横线的位置*/
          top: 52%;
          background: #228AFF;       /*宽和高做出来的背景横线*/
          width: 18px;
          height: 3px
        }
        &::before {
          left: 30%;    
        }
        &::after {
          right: 30%;
        }
      }
      .income {
        display: inline-flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 18px;
        .incomeTv{
          width: 133px;
          height: 133px;
          background:rgba(245,245,245,1);
          border-radius: 6px;
          p{
            margin-top: 10px;
            color:rgba(153,153,153,1);
            font-size: 10px;
          }
          .condition{
            font-size: 13px;
          } 
          .mincon{
              width: 53px;
              height: 56px;
              background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/10tv%402x.png');
              background-size: contain;
              background-repeat: no-repeat;
              margin: 0 auto;
              margin-top: 15px;
              .TVnum{
                display: inline-block;
                width: 63px;
                height: 20px;
                background:rgba(34,138,255,1);
                border-radius: 3px; 
                font-size: 18px;
                color: #fff;
                line-height: 20px;
                position: relative;
                top: 45px;
                left: -4px;
              }
            }
          &:first-child{
            margin-right: 10px;
            margin-bottom: 8px;
          }
          &:nth-child(2) {
            .mincon{
              background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/40tv%402x.png');
            }
          }
          &:nth-child(3) {
            margin-right: 10px;
            .mincon{
              background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/70tv%402x.png');
            }
          }
          &:nth-child(4) {
            .mincon{
              background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/150tv%402x.png');
            }
          }
        }
      }
      .remark{
        margin: 0 45px 0 50px;
        font-size:11px;
        color:rgba(153,153,153,1);
        line-height: 20px;
      }
      .line3 {
        &::before {
          left: 25%;    
        }
        &::after {
          right: 25%;
        }
      }
      // 坐享收徒进贡
      .income2{
        display: inline-flex;
        justify-content: center;
        margin-bottom: 47px;
        .img {
          height: 87px;
          width: 165px;
          background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/write%402x.png');
          background-size:contain;
          background-repeat: no-repeat;
        }
        .text{
          width: 131px;
          height: 87px;
          margin-left: 20px;
          text-align: left;
          
          p:first-child{
            font-size:16px;
            color:rgba(102,102,102,1);
            line-height:20px;
            font-weight: bold;
            padding: 14px 0 12px 0;
            font-family:'PingFangSC-Medium'!important;
          }
          p:last-child {
            font-size:13px;
            font-family:'PingFangSC-Regular' !important;
            color:rgba(153,153,153,1);
            line-height:17px;
          }
        }
      }
      .income3 {
        .img {
            background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/share%402x.png');
        }
      }
      .income4{
          .text {
            margin-right: 20px;
            margin-left: 0;
          }
          .img {
            background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/read%402x.png');
          }
      }
      .rules{
        margin: 0;
      }
      .rulesTxt{
        padding: 38px 27px 56px 27px;
        font-size: 14px;
        font-family:'PingFangSC-Regular'!important;
        color:rgba(153,153,153,1);
        text-align: left;
        line-height: 20px;
        p{
          margin-bottom: 10px;
        }
      }
      .logo{
        height: 30px;
        width: 112px;
        background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/logo%402x.png');
        background-size: contain;
        margin: 0 auto;
        margin-bottom: 75px;
        display:inline-block;
      }
    }
  }

  @media only screen and (min-width:750px){ // 设计图
    .inviteH5 {
      .bg{
        padding-top: 760px;
        height: 216px;
        background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/bg%403x.png');
        .ali{
          height: 88px;
          margin-bottom: 20px;
        }
        .el-input-group__prepend .el-input, .el-input-group__prepend{width: 100px !important;padding-left: 0;}
        .con{
          width: 340px;
          height: 282px;
          background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/coin%403x.png');
          top: 574px;
        }
        .el-button--primary{
          font-size: 32px !important;
        } 
        .action{
          width: 520px;
          height: 400px;
          padding: 50px 60px 60px 60px;
          border-radius: 16px;
          box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          -webkit-box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          -moz-box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          .el-form-item{margin-bottom: 34px;}
          .el-form-item__error{font-size: 20px;}
          .nc_scale, .nc-container .nc_scale span{height: 88px;line-height: 88px;}
          .nc-container .nc_scale span{height: 86px;font-size: 24px;}
          #nc_1_n1z{width: 60px;}
          .el-input__suffix{
            height: 88px;
          }
          .codeBtn{height: 88px;}
          .el-input__inner{height: 88px;font-size: 32px;}
          .el-button--primary{height: 88px;}
        }

        // 
        .line2 {
          margin-top: 110px;
          margin-bottom: 66px;
          font-size: 36px;
          &::before, &::after {
            width: 36px;
            height: 6px
          }
        }
        .income {
          margin-bottom: 36px;
          .incomeTv{
            width: 266px;
            height: 266px;
            border-radius: 12px;
            p{
              margin-top: 20px;
              font-size: 20px;
            }
            .condition{
              font-size: 26px;
            } 
            .mincon{
                width: 106px;
                height: 112px;
                background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/10tv%403x.png');
                margin-top: 30px;
                .TVnum{
                  width: 126px;
                  height: 40px;
                  background:rgba(34,138,255,1);
                  border-radius: 6px; 
                  font-size: 36px;
                  line-height: 40px;
                  top: 90px;
                  left: -8px;
                }
              }
            &:first-child{
              margin-right: 20px;
              margin-bottom: 16px;
            }
            &:nth-child(2) {
              .mincon{
                background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/40tv%403x.png');
              }
            }
            &:nth-child(3) {
              margin-right: 20px;
              .mincon{
                background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/70tv%403x.png');
              }
            }
            &:nth-child(4) {
              .mincon{
                background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/150tv%403x.png');
              }
            }
          }
        }
        .remark{
          margin: 0 90px 0 100px;
          font-size:22px;
          line-height: 40px;
        }
        // 坐享收徒进贡
        .income2{
          display: inline-flex;
          justify-content: center;
          margin-bottom: 94px;
          .img {
            height: 174px;
            width: 330px;
            background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/write%403x.png');
          }
          .text{
            width: 262px;
            height: 174px;
            margin-left: 40px;
            p:first-child{
              font-size:32px;
              line-height:40px;
              padding: 28px 0 24px 0;
            }
            p:last-child {
              font-size:26px;
              line-height:34px;
            }
          }
        }
        .income3 {
          .img {
              background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/share%403x.png');
          }
        }
        .income4{
            .text {
              margin-right: 40px;
            }
            .img {
              background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/read%403x.png');
            }
        }
        .rulesTxt{
          padding: 76px 54px 112px 54px;
          font-size: 28px;
          line-height: 40px;
          p{
            margin-bottom: 20px;
          }
        }
        .logo{
          height: 60px;
          width: 224px;
          background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/logo%403x.png');
          margin-bottom: 104px;
        }
      }
    }
  }
</style>
<style>
@media only screen and (max-width:320px){
  .inviteH5 .bg .action{
    width:232px;
  }
  .inviteH5 .bg .income2 .img{
    width:125px;
    margin-top:10px;
  }
  .inviteH5 .bg{
    background-position: center;
  }
}
</style>
