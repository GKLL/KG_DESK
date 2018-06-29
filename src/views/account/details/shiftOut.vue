<template>
  <div class = 'myColumn myColumn_noLeft'>
      <header class = 'myColumn_header'>
        <span class = 'title'>转出钛值</span>
       <!-- <router-link class = 'fr' to='/'>转出明细</router-link> -->
       <a class = 'fr cursorPointer' @click = "toshiftOut">转出明细</a>
      </header>
      <div class = 'unverified' v-if = "false">
        <p>抱歉，您还未进行实名认证，通过认证才能转出钛值</p>
        <el-button type = 'primary' @click = "toAccountSafe">认证</el-button>
      </div>
      <div >
          <div v-if = 'isOuting' >
              <table class = 'shiftout_table' >
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>转出地址</th>
                    <th>转出数量</th>
                    <th>手续费</th>
                    <th>到账数量</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{tableData.flowDate}}</td>
                    <td>{{tableData.txAddress}}</td>
                    <td>{{tableData.amount}}</td>
                    <td>{{tableData.poundageAmount}}</td>
                    <td>{{tableData.accountAmount}}</td>
                    <td>审核中</td>
                    <td @click = 'onRevocation' class = 'color1d87 cursorPointer'>撤销</td>
                  </tr>
                </tbody>
              </table>
              <p class = 'explain'>说明：当前这笔转出成功后，您才能进行下一笔转出操作</p>
          </div>
          <div class = 'outContainer'>
            <el-form  label-width="80px" ref="form"  :model="form"  :rules="rules" size = 'small'>
              <div class = 'outInfo font14'>
                <span>可用余额</span>
                <span>{{tableData.balance}}</span>
                <span>提币手续费</span>
                <span>0.2%/笔</span>
                <span>最少提币<span>{{tableData.actionMinTimes}}</span>钛值/每笔</span>
              </div>
              <el-form-item label="转出地址" prop = 'txAddress'>
                <el-input v-model="form.txAddress"  :disabled="formDisabled" style = "width:40%" type="text" class="el-input"></el-input>
              </el-form-item>
              <el-form-item label="转出数量" prop = 'amount'>
                <el-input v-model="form.amount"  :disabled="formDisabled" style = "width:40%" type="text" class="el-input" @change = "calculateAmount"></el-input>
              </el-form-item>             
              <el-form-item label="备注">
                <el-input v-model="form.remark"  :disabled="formDisabled" style = "width:40%" type="text" class="el-input"></el-input>
              </el-form-item>
              <el-form-item label="到账数量" prop = 'poundageAmount'>
                <el-input v-model="form.poundageAmount"  :disabled = "true" style = "width:40%" type="text" class="el-input"></el-input>
              </el-form-item>
              <el-form-item label="手机验证">
    <!--             <p v-if = "bindingValue == ''? true: false" class = 'cursorPointer' @click = "phoneVisible = true">请绑定手机后再提币，立即绑定</p>
    <p v-else>已绑定手机：<span>{{bindingValue}}</span></p> -->
                    <el-input   type="text" style="width:255px"   v-model="atskMobile" :disabled = "true"  auto-complete="off" />
              </el-form-item>
              <!-- 滑块验证开始 -->
              <el-form-item label="滑块验证" style= 'position =relative'>
                <div>
                   <div class="ln" style = "width:255px;">
                     <div id="shiftOutBlock"></div>
                   </div>
                   <input type='hidden' id='csessionid77' name='csessionid77'/>
                   <input type='hidden' id='sig77' name='sig77'/>
                   <input type='hidden' id='token77' name='token77'/>
                   <input type='hidden' id='scene77' name='scene77'/>
                </div>
                <div v-show = 'formDisabled' class = 'blockDisabled'></div>
              <!-- 滑块验证结束 -->
              </el-form-item>
              <el-form-item label="验证码" prop = 'code'>
                <el-input v-model="form.code"  :disabled="formDisabled" style = "width:40%" type="text" class="el-input"></el-input>
                <el-button v-if ="!isOuting" type="primary" @click="sendCode('form')" :disabled='sendMsgDisabled'>
                  <span v-if="sendMsgDisabled">{{'重新发送('+time+')'}}</span>
                  <span v-if="!sendMsgDisabled">获取验证码</span>
                </el-button>  

                <el-button v-else type="primary" @click="sendCode('form')" :disabled='formDisabled'>
                  <span v-if="sendMsgDisabled">{{'重新发送('+time+')'}}</span>
                  <span v-if="!sendMsgDisabled">获取验证码</span>
                </el-button>
              </el-form-item>
              <el-form-item label="交易密码" prpo = 'txPassword'>
                <el-input v-model="form.txPassword" :disabled='formDisabled' style = "width:40%" type="password" class="el-input"></el-input>
              </el-form-item>        
              <el-form-item label="">
                <el-button type = 'primary' :disabled='formDisabled'  @click = "submit('form')">确认转出</el-button>
              </el-form-item>
            </el-form>
            <!-- <div class = 'outMask' v-if ="isOuting"></div> -->
          </div>
        </div>
      <!-- 手机绑定 -->
      <binding-phone :visible = "phoneVisible" :cancel = "onCancel" :changeBindingValue = "changeBindingValue"/>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import bindingPhone from './bindingPhone';

export default {
  name: 'add',	
  components: {
    HbHead,bindingPhone
  },
  data () {
    let validateAmount = (rule, value, callback) => {
        if (value > this.tableData.balance) {
          callback(new Error('超出可用余额'));
        }else if(value == '') { 
          callback(new Error('请输入转出数量'));
        }else if(value < this.tableData.actionMinTimes) { 
          callback(new Error('小于最低转出额度'));
        }else{
          callback()
        }
    };
    return {
           slideInfo:{
        'session':'',
        'sig':'',
        'token':'',
        'scene':''
      },
      atskMobile:"",
      tableData:[{}],
      phoneVisible:false,
      form:{
        code:'',
        txAddress:"",
        amount:"",
        txPassword:"",
        poundageAmount:"",
        remark:""
      },
      rules:{ 
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        txAddress:[
            { required: true, message: '请输入转出地址', trigger: 'blur' },
        ],
        amount:[
              { required: true,validator: validateAmount, trigger: 'blur' }   
        ],
        txPassword:[
            { required: true,message: '请输入交易密码', trigger: 'blur' }   
        ],
      },
      isOuting:false,
      bindingValue:"",
      interval:null,
      time:90,
      sendMsgDisabled:false,
      isApprove:false,
      formDisabled:false,
    }
  },
  mounted(){
/*        const isApprove = localStorage.getItem('kg_desk_approve');
        if(isApprove == 1){
          this.isApprove = true
        }*/
        this.atskMobile = localStorage.getItem('kg_desk_atskMobile');
        this.getInfo();
        Lib.M.aliBlock('#shiftOutBlock',this,'csessionid77','sig77','token77','scene77')
  },
  methods: {
        handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    toAccountSafe(){
      localStorage.setItem('award_approve',2)
      Lib.M.accountSafe()
    },
    getInfo(){
      const that = this;
        const list = Lib.M.dataRequest({"userId":localStorage.getItem('kg_desk_userId')});
        Lib.M.ajax({
              'type':'post',
              'url':'account/auditAmount',
              "data":list,
              'success':function (data){
                  if(data.code == 10000){
                    that.tableData = data.responseBody.data;
                    that.isOuting = data.responseBody.data.flowStatus == null ? false :true;
                    that.formDisabled = data.responseBody.data.flowStatus == null ? false :true;
                    that.bindingValue = data.responseBody.data.userMobile;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
        })      
    },
    toshiftOut(){
      localStorage.setItem('activeName','4')
      // location.reload()
      // this.$router.push('./')
      window.location.href = '../account/details.html#/myTreasure'
    }, 
    calculateAmount(val){
      this.form.poundageAmount = val -val * 0.002;
    },
    submit(form){
      const that = this;
      const list = Lib.M.dataRequest({
        "userId":localStorage.getItem('kg_desk_userId'),
        "code":this.form.code,
        "txAddress":this.form.txAddress,
        "amount":this.form.amount,
        "txPassword":this.form.txPassword,
        "accountAmount":this.form.poundageAmount,
        "userMobile": localStorage.getItem('kg_desk_userMobile'),
        "remark":this.form.remark
      });
      this.$refs[form].validate((valid) => {
              if (valid) {
                  Lib.M.ajax({
                    'type':'post',
                    'url':"/accountFlow/addUserTimes",
                     "data":list,
                    'success':function (data){
                        if(data.code == 10000){
                          that.getInfo()
                              that.$message({
                                  message: '提交成功',
                                  type: 'success'
                              });
                        }else{
                            that.$message({
                              message:data.message,
                              type: 'error'
                            });
                        }
                    }
                  })
              }else{
                  return false;
              }
        });

    },
    sendCode(form){
      // window.clearInterval(this.interval);
      // const that = this;
      const send_list =  Lib.M.noSignRequest({
        "verIfy":this.bindingValue,
        "mobileArea":localStorage.getItem('kg_desk_mobileArea'),

        "platform":'3',
        "session":this.slideInfo.session,
        "sig":this.slideInfo.sig,
        "token":this.slideInfo.nc_token,
        "scene":this.slideInfo.nc_scene,
      });
      Lib.M.sendMessage(form,this,send_list,'#shiftOutBlock','csessionid77','sig77','token77','scene77')



    },
    onRevocation(){
      const that = this;
        this.$confirm('你确认要取消这笔转出申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
           center: true
        }).then(() => {
          //撤销成功
              const list =  Lib.M.dataRequest({
                  "userId":localStorage.getItem('kg_desk_userId'),
                  "withdrawFlowId":this.tableData.withdrawFlowId,
                  "status":2
              });
              Lib.M.ajax({
                     'type':'post',
                              'url':"/accountFlow/undoUserTimes",
                              "data":list,
                              'success':function (data){
                                if(data.code == 10000){
                                  that.getInfo()
                                  that.$message({
                                       message: '撤销成功！',
                                       type: 'success'
                                  });
                                }else{
                                  that.$message({
                                       message:data.message,
                                       type: 'error'
                                });
                        }
                    }
                })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤销'
          });          
        });
    },
    onCancel(){
      this.phoneVisible = false;
    },
    changeBindingValue(val){
      this.bindingValue = val;
    },
  }
}
</script>

<style scoped>
.myColumn_header{
  position: relative;
}
.myColumn_header .title{
  border:0px;
}
.myColumn_header .fr{
  font-size:14px;
  margin-right:20px;
}
.unverified{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:100%;
  height:500px;
}
.unverified p{
  margin:0 auto;
  font-size: 30px;
}
.unverified button{
  width:110px;
  margin: 0 auto;
  margin-top:110px;
}
.shiftout_table{
  width:100%;
  text-align: center;
  border-bottom:1px solid #ccc;
}
.shiftout_table th{
  padding:5px;
}
.shiftout_table td{
  padding:10px 5px;
}
.explain{
  padding:10px 20px 0px;
}
.outContainer{
  position: relative;
}
.outContainer form{
  padding-left:20px;
}
.outContainer  .outInfo{
  margin:10px 0px;
}
.outMask{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  position: absolute;
  z-index:100;
  padding-bottom:18px;
  top:0px;
}
.blockDisabled{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    z-index: 200;
}
</style>
<style>
#shiftOutBlock{
  margin:0px!important;
}
  .el-dialog .el-form-item__content{
    text-align: center;
  }
</style>
