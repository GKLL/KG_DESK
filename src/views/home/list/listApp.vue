<template>
<div id="app">
    <div class = 'container'>
        <img src = "../../../assets/img/logoActive.png" class=  'logo'/>
        <div  class = 'theme'></div>
        <div class = 'keyword'>
          <span>——</span>
          <span>春节千氪豪礼送不停</span>
          <span>——</span>
        </div>
        <div class = 'decoration'></div>
      	<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="ruleForm activeForm">
            <el-form-item  prop="phone">
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
            </el-form-item>
            <el-form-item  prop="code">
              <el-input class = 'codeValue' placeholder="获取验证码" type="text" v-model="ruleForm.code" auto-complete="off">
                <el-button   slot="suffix" type="primary" class="codeBtn" @click="send('ruleForm')" :disabled='sendMsgDisabled'>
                  <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                  <span v-if="!sendMsgDisabled">获取验证码</span>
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" class ='submitBtn'>登录</el-button>
            </el-form-item>
      </el-form>
  </div>
  <div class = 'footer'>
    <div class = 'rules'>
      <p class ='title'>活动规则：</p>
      <div class = 'flexR'>
        <div>
          <p>1.用户登录千氪财经均可获得神秘大礼</p>
          <p>2.新老用户均可参加，每个账户只能获得一次奖励</p>
        </div>
        <div>
          <p>3.活动时间  截止2018年2月22日12:00</p>
          <p>4.活动最终解释权归千氪财经所有</p>
        </div>
      </div>
    </div>
  </div>
      <!-- 获取txb -->
    <div class = 'txbcandy marauto' v-if = 'getCandyVisible'>
      <img src = 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/pop_up1.png' class = 'marauto'/>
      <div class = 'candybtn'>
        <span class = 'cursorPointer' @click = 'cancelGetVisible'>我知道啦</span>
        <span class = 'cursorPointer color_red' @click = "getCandyHandle">前去查看</span>
      </div>
    </div>
    <div class = 'txbcandy_mask'  v-if = 'candyMaskVisible'></div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import codeData from 'assets/js/phone';
let Base64 = require('js-base64').Base64;
 export default {
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
        interval:null
      };
    },
    mounted(){
      this.areaCode = codeData;
      const userName = localStorage.getItem('kg_desk_userName');
    },
    methods: {
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
            Lib.M.loginAjax({
                  'type':'post',
                  'url':'/userkg/mobileLogin',
                  "data":login_phonelist,
                  'success':function (data){
                    if(data.code == 10000){
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
                          that.getCandyVisible = true;
                          that.candyMaskVisible = true;
                        }else{
                          setTimeout(()=>{
                                window.location.href = "../index/list.html"
                           },200);
                        }

                    }else{
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
      send(form) {
        const me = this;
       me.time =90
      window.clearInterval(me.interval);
          const send_list  =this.noSignRequest(
            {
              "verIfy":this.ruleForm.phone,
              "mobileArea":this.select
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
                          // alert("短信已经发送！")
                          me.sendMsgDisabled = true;
                        me.interval = window.setInterval(function() {
                        if ((me.time--) <= 0) {
                          me.time = 90;
                          me.sendMsgDisabled = false;
                        }
                      }, 1000);
                        }else{
                          // alert(data.message)
                             me.$message({
                              type:'error',
                              message:data.message
                            })
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
  .container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width:100%;
      background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/bgi1.png') no-repeat;
      background-size: cover;
      height:789px;
  }
  .ruleForm{
    width:300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:0 auto!important;
  }
  .logo{
    display: inline-block;
    width:58px;
    height:71px;
    position: absolute;
    top:21px;
    left:21px;
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
    background: -webkit-linear-gradient(#ff2323 ,#e10019); 
    background: -o-linear-gradient(#ff2323 ,#e10019); 
    background: -moz-linear-gradient(#ff2323 ,#e10019);
    background: linear-gradient(#ff2323 ,#e10019); 
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
    width:350px;
    margin-right:200px;
    margin-bottom:15px;
    font-size:16px;
  }

  @media only screen and (max-width:768px){
    .logo{
      width:30px;
      height:36px;
    }
    .container{
     height:auto;
     background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/bgi2.png') no-repeat;
     background-size:cover;
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
      background:#fafafa;
    }
    .rules{
      width:100%;
    }
    .rules .title{
      color:#000;
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
      color:#333;
      margin-right:0px;
      font-size:14px;
      margin-bottom:6px;
    }
  }
  @media only screen and (max-width:320px){
    .keyword{
      font-size: 18px;
    }
    .decoration{
            width:300px;
      height:140px;
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
    width:300px;
    height:45px;
    line-height: 45px;
    border-color: #ff2c2c;
  }  

  .activeForm .phoneValue{
     height:43px;
    line-height: 43px;
   
  }
  .activeForm .phoneValue .el-input__inner{
      width:230px;
  }
  .activeForm .areaValue  .el-input__inner{
    width:65px;
    height: 43px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border:0px;
  }
  .activeForm .el-input-group__prepend{
          border-color:#ff2c2c!important;
          background:#fff!important;
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
  }
  .activeForm .codeValue{
    /*width:200px;*/
  }
  .activeForm .el-button{
    height:44px;
    border-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .activeForm .el-input__suffix{
    right:0px!important;
  }
  .activeForm .el-button--primary,
  .activeForm .el-button--primary:active,
  .activeForm .el-button--primary:focus,
  .activeForm .el-button--primary.is-disabled,
  .activeForm .el-button--primary:hover,
  .activeForm .el-button--primary.is-disabled:hover,
  .activeForm .el-button--primary.is-disabled:active,
  .activeForm .el-button--primary.is-disabled:focus{
      background: -webkit-linear-gradient(left,#e10019, #ff2323); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right,#e10019, #ff2323); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right,#e10019, #ff2323); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right,#e10019, #ff2323); /* 标准的语法 */
      border-color:#ff2c2c;
  }
    .activeForm .el-input__inner,
  .activeForm .el-form-item.is-success .el-input__inner, 
  .activeForm .el-form-item.is-success .el-input__inner:focus, 
  .activeForm .el-form-item.is-success .el-textarea__inner, 
  .activeForm .el-form-item.is-success .el-textarea__inner:focus,
  .activeForm .el-input__inner:focus{
    border-color: #ff2c2c!important;
  }
</style>
