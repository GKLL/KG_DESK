<template>
<div id="app">
    <div class = 'container' >
        <!-- <img src = "../../../assets/img/logoActive.png" class=  'logo'/> -->
        <!-- <div  class = 'theme'></div> -->
        <!-- <div class = 'keyword'>
          <span>——</span>
          <span>春节千氪豪礼送不停</span>
          <span>——</span>
        </div> -->
        <!-- <div class = 'decoration'></div> -->
        <div class="logoBox2">
          <img src="../../../assets/img/KGLOGO2.png" class="logo"/>
        </div>
        <div class="logoBox3">
          <img src="../../../assets/img/btc123_2.png" class="logo"/>
        </div>
      	<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="ruleForm activeForm">
            <el-form-item  prop="phone" style = "margin-bottom:5px">
                      <el-input  class = 'phoneValue' placeholder="手机号" type="text" v-model="ruleForm.phone" auto-complete="off" >
                                <el-select slot="prepend"  v-model="select" class = 'areaValue'>
                                          <el-option
                                          v-for="(item,key) in areaCode"
                                          :key="key"
                                          :label="'+'+item.code"
                                          :value="item.code">
                                          <span style="float: left; color: #8492a6; font-size: 13px">+{{item.code}}</span>
                                          <span style="float: right; color: #8492a6; font-size: 13px">{{item.countryname}}</span>
                                        </el-option>
                                </el-select>
                        </el-input>
            </el-form-item >
            <!-- 滑块验证开始 -->
                <div>
                   <div class="ln">
                     <div id="offlineBlock"></div>
                   </div>
                   <input type='hidden' id='csessionid1002' name='csessionid1002'/>
                   <input type='hidden' id='sig1002' name='sig1002'/>
                   <input type='hidden' id='token1002' name='token1002'/>
                   <input type='hidden' id='scene1002' name='scene1002'/>
                </div>

            <!-- 滑块验证结束 -->
            <el-form-item  prop="code">
              <el-input class = 'codeValue' placeholder="验证码" type="text" v-model="ruleForm.code" auto-complete="off">
                <el-button   slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
                  <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                  <span v-if="!sendMsgDisabled">获取验证码</span>
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading" class ='submitBtn'>登录</el-button>

            </el-form-item>
            <span class="Info">点击登录按钮即可注册千氪账号，使用手机号就能登录千氪</span>
      </el-form>
         <message-mobile class="messageBox" :message="message" v-if="ismessage" />
  </div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
let Base64 = require('js-base64').Base64;
import MessageMobile from "components/MessageMobile";
 export default {
      components: {MessageMobile},
    data() {
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } else {
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      return {
        getCandyVisible:false,
        candyMaskVisible:false,
        loading:false,
        url_id:"",
        height:{
          height:document.body.clientHeight - 160 + 'px'
        },
        ruleForm: {
          phone:'',
          code:'',
        },
        rules: {
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
        },
        areaCode:[{}],
        select:"86",
        sendMsgDisabled:false,
        time:5,
        interval:null,
        ismessage:false,
        message:"",
        slideInfo:{
          'session':'',
          'sig':'',
          'token':'',
          'scene':''
        },
      };
    },
    mounted(){
      this.areaCode = codeData;
      this.url_id = Lib.M.getUrlQuery('id');
      const userName = localStorage.getItem('kg_desk_userName');
      Lib.M.aliBlock('#offlineBlock',this,'csessionid1002','sig1002','token1002','scene1002')
    },
    methods: {
      handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
      },
      cancelGetVisible(){
         window.location.href = "../index/list.html"
      },
      getCandyHandle(){
        window.location.href = '../account/details.html#/'
      },
      noSignRequest(data){
            let list = {
              "data" :Base64.encode(JSON.stringify(data))
            }
            return list
      },
      submitForm(formName) {
        const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
                const login_phonelist = this.noSignRequest({
                    "userMobile":this.ruleForm.phone,
                    "code":this.ruleForm.code,
                })
            that.loading =true;
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/mobileLogin',
                  "data":login_phonelist,
                  'success':function (data){
                    if(data.code == 10000){
                        that.loading =false;
                        data = data.responseBody.data;
                        localStorage.setItem('kg_desk_token', data.token);
                        localStorage.setItem('kg_desk_approve', data.realnameAuthed);
                        localStorage.setItem('kg_desk_userId', data.userId);
                        
                        localStorage.setItem('kg_desk_userMobile', data.userMobile);
                        localStorage.setItem('kg_desk_atskMobile', data.atskMobile);
                        localStorage.setItem('kg_desk_mobileArea', data.mobileArea);
                        localStorage.setItem('kg_desk_roleId', data.userRole);
                        localStorage.setItem('kg_desk_userName', data.userName);
                      if(data.loginBonusStatus != 1){
                            that.$alert('恭喜您注册成功，获得1888氪金奖励', '提示', {
                              confirmButtonText: '知道了',
                              cancelButtonText: '取消',
                              center: true,
                              showClose:false,
                              customClass:"activeBox",
                            }).then(() => {

                               setTimeout(()=>{
                                  window.location.href = "../index/list.html"
                             },200);
                            }).catch(() => {
                              
                            });
                      }else{
                              setTimeout(()=>{
                                  window.location.href = "../index/list.html"
                             },200);
                      }
                      
                        
                        // if(data.loginBonusStatus != 1){
                        //   that.getCandyVisible = true;
                        //   that.candyMaskVisible = true;
                        // }else{
                          
                        // }

                    }else{
                        that.loading =false;
                        that.$message({
                          type:'error',
                          message:data.message
                        })
                    }

              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
          closeMessage(t){
       setTimeout(()=>{
                  this.ismessage=false;
              },t);
      
    },
      send(form) {
        const me = this;
       me.time =90
      window.clearInterval(me.interval);
          const send_list  =this.noSignRequest(
            {
              "verIfy":this.ruleForm.phone,
              "mobileArea":this.select,
             "platform":'3',
            "session":this.slideInfo.session,
            "sig":this.slideInfo.sig,
            "token":this.slideInfo.nc_token,
            "scene":this.slideInfo.nc_scene,
            }
          ) 
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
                                     Lib.M.aliBlock('#offlineBlock',me,'csessionid1002','sig1002','token1002','scene1002')
                                    me.handleSlide('','','','')
                                  }
                                }, 1000);
                        }else if(data.code == 10020){
                            me.ismessage = true;
                            me.message = data.message
                            me.closeMessage(3000)
                             Lib.M.aliBlock('#offlineBlock',me,'csessionid1002','sig1002','token1002','scene1002')
                            me.handleSlide('','','','')
                        }else{
                          me.ismessage = true;
                            me.message = data.message
                            me.closeMessage(3000)
                             Lib.M.aliBlock('#offlineBlock',me,'csessionid1002','sig1002','token1002','scene1002')
                            me.handleSlide('','','','')
                        }
                      }
               })

            }else{
              return false
            }
          });  
        // Lib.M.sendMessage(form,this,send_list)
      }
    }
  }


</script>

<style scoped>
  html,body{
    height:100%;
  }
  #app{
    height:100%;
  }
  .container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width:100%;
      background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/bg_kg.png') no-repeat;
      background-size: 100% 100%;
      height:100%;
  }
  .bg{
     display: flex;
     flex-direction: column;
     justify-content: center;
     width:100%;
     background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/bg_kg.png') no-repeat;
     background-size: 100% 100%;
     height:328px;
  }
  .ruleForm{
    width:90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:0 auto;
  }

  .logoBox{
    margin: 0 auto;
    text-align: center;
    margin-top: 290px;
  }
  .Info{
    font-family:PingFangSC-Regular;
    color:#999999;
    display: inline-block;
    
  }
  .logoBox2{
     margin: 0 auto;
     margin-top: 160px;
  }
  .logoBox3{
    margin: 0 auto;
    margin-top: 30px;
  }
  .logoBox2 img{
  
      display: inline-block;
  }
  .logoBox2 img{

    
  }
  .logoBox3 img{
    display: inline-block;
  

  }
  .theme{
    width:630px;
    height:155px;
    background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/themepc.png') no-repeat;
  }
  .decoration{
    width:710px;
    height:300px;
    background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/decoration.png') no-repeat;
  }
  .theme,.decoration{
    background-size: contain;
    margin:0 auto;
  }
  .keyword{
    color:#fb1e22;
    margin:0 auto;
    font-size:24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom:20px;
  }
  .keyword span{
    margin:0px 10px;
  }

  .submitBtn{
    width:300px;
    border-radius: 5px!important;
  }
  .footer{
    width:100%;
    height:160px;
    background-color: #d14341;
    /* background: -webkit-linear-gradient(#ff2323 ,#e10019); 
    background: -o-linear-gradient(#ff2323 ,#e10019); 
    background: -moz-linear-gradient(#ff2323 ,#e10019);
    background: linear-gradient(#ff2323 ,#e10019);  */
    /*position: absolute;*/
    bottom:0px;
  }
  .rules{
    width:865px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color:#fff;
    margin:0 auto;
  }
  .rules .title{
      font-size:24px;
      margin-top:24px;
      margin-bottom:20px;
  }
  .rules .flexR{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .rules .flexR p{
    width:450px;
    margin-right:200px;
    margin-bottom:15px;
    font-size:16px;
  }

  @media only screen and (max-width:768px){
    .logo{
      display: block;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
    }
    .theme{
        width:278px;
        height:206px;
        background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/theme.png') no-repeat;
        background-size: contain;
         margin:0 auto;
        margin-top:62px;
    }
    .decoration{
      width:345px;
      height:140px;
      background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/decoration.png') no-repeat;
      background-size: contain;
       margin:0 auto;
    }
    .keyword{
      font-size: 20px;
    }
    .footer{
      width:100%;
      height:auto;
      flex-direction: column;
      background:#ff8961;
    }
    .rules{
      width:100%;
    }
    .rules .title{
      color:#fff;
      margin-left:20px;
      margin-right:20px;
      font-size:18px;
      margin-top: 5px;
      margin-bottom: 12px;
    }
    .rules .flexR{
      flex-direction: column;
      margin:0px 20px;
    }
    .rules .flexR p{
      width:100%;
      color:#fff;
      margin-right:0px;
      font-size:14px;
      margin-bottom:6px;
    }
  }
  @media only screen and (max-width:414px){
    .ruleForm{
      margin-top: 120px;
    }
    .logoBox2{
      margin-top: 0px;
    }
    
  }
   @media only screen and (max-width:375px){
      .logoBox{
        margin-top: 250px;
      }
      .bg{
      height:330px;
      }
      .ruleForm{
         margin-top: 50px;
        
      }
  
  }
  @media only screen and (max-width:320px){
    
    .keyword{
      font-size: 18px;
    }
    .logoBox{
        margin-top: 220px;
      }
    .decoration{
            width:300px;
      height:140px;
    }
    .ruleForm{
         margin-top: 50px;
         margin-bottom: 15px;
      }
  }
    @media only screen and (min-height:1024px){
      .container{
        height:872px;
      }
  }
  @media only screen and (min-height:1366px){
      .container{
        height:1205px;
      }
  }

</style>
<style>
  .activeForm .el-form-item__content{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .activeForm .phoneValue,.activeForm .codeValue,.activeForm .el-input__inner{
    width:100%;
    height:44px;
    line-height: 44px;
   /* border-color: #6fbced;*/
    color:#999999;
    background: #EEEEEE;
    border-radius: 5px;
  }  

  .activeForm .phoneValue{
     height:42px;
    line-height: 42px;
    background: #EEEEEE;
   
  }
  .activeForm .phoneValue .el-input__inner{
      /*width:230px;*/
       color:#333;
  }
  .activeForm .areaValue  .el-input__inner{
    width:100%;
    height: 44px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border:0px;
     color:#333;
     font-family:PingFang-SC-Regular!important;
  }
  .activeForm .el-input-group__prepend{
          color:#333;
          border-color:#EEEEEE;
          border-right: 1px solid #CCCCCC;
          background:#EEEEEE!important;
          font-family:PingFang-SC-Regular!important;
  }
  .activeForm .el-select .el-input .el-select__caret{
    display: none;
  }
  .areaValue .el-input__inner{
      padding:0px;
      text-align: center;
      width:65px;

  }
  .areaValue .el-input--suffix .el-input__inner{
    padding-right:0px;
    border-color:#292929!important;
  }
  .activeForm .codeValue{
    /*width:200px;*/
    color:#333;
  }
  .activeForm .el-button{
    width:100%;
    height:44px;
    border-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .activeForm .el-input__suffix{
    right:0px!important;
  }
  .codeBtn{
      background: -webkit-linear-gradient(left,#4CE9C7, #0FA9DB); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right,#4CE9C7, #0FA9DB); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right,#4CE9C7, #0FA9DB); 
      background: linear-gradient(to right,#4CE9C7, #0FA9DB); 
      border:0!important;
      font-family:PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, STHeitiSC-Light, simsun, \\5B8B\4F53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif"!important;
  }
  .activeForm .el-button--primary,
  .activeForm .el-button--primary:active,
  .activeForm .el-button--primary:focus,
  .activeForm .el-button--primary.is-disabled,
  .activeForm .el-button--primary:hover,
  .activeForm .el-button--primary.is-disabled:hover,
  .activeForm .el-button--primary.is-disabled:active,
  .activeForm .el-button--primary.is-disabled:focus{
      background: -webkit-linear-gradient(left,#17D6DD, #13ADE0); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right,#17D6DD, #13ADE0); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right,#17D6DD, #13ADE0); 
      background: linear-gradient(to right,#17D6DD, #13ADE0); 
      ;
      /*background:rgba(2,132,254,1);*/
     border:0!important;
      font-family:PingFang-SC-Regular!important;
  }
    .activeForm .el-input__inner,
  .activeForm .el-form-item.is-success .el-input__inner, 
  .activeForm .el-form-item.is-success .el-input__inner:focus, 
  .activeForm .el-form-item.is-success .el-textarea__inner, 
  .activeForm .el-form-item.is-success .el-textarea__inner:focus,
  .activeForm .el-input__inner:focus{
    /*border-color: #6fbced!important;*/
    border-color:#EEEEEE!important;
  }
  input::-webkit-input-placeholder {
       color: #999!important;
       font-family:PingFang-SC-Regular!important;
  }
</style>
