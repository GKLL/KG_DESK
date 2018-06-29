<template>
      <div>
        <el-dialog
                class = 'depositModal'
                title="您的资料已经提交成功"
                :visible="visible"
                width="40%"
                :before-close = "cancel"
                center>
              <div>
                <p>申请企业角色还需缴纳{{tvValue}}TV的钛值作为账号保证金，请转入此地址：</p>
                <p class = 'color_red'>{{addressUrl}}   转账时请务必在备注中填写您的手机号</p>
                <p class = 'colorc5'>说明：未缴纳保证金，将无法通过审核</p>
              </div>
              <div class = 'submit_btn'>
                  <el-button   @click="subimit" type="primary"  class=" btnModal2">我知道了</el-button>
              </div>
        </el-dialog>
      </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      addressUrl:Lib.C.addressUrl,
      tvValue:Lib.C.tvValue
    }
  },
  props: {
    visible:{},
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    initSrc:{}
  },
  //已成功挂载，相当ready()
  mounted(){

  },
  //相关操作事件
  methods: {
    subimit(){
      this.cancel();
      window.location.href = "../account/details.html#/column";
    }
  }
}
</script>

<style scoped>
.submit_btn{
  margin:20px auto;
  text-align: center;
}
</style>
<style>
  .depositModal .el-dialog--center .el-dialog__body{
    padding:0px 27px 0px;
  }
</style>

