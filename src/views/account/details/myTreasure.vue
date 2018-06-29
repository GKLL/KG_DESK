<!--个人中心-我的财富tab选项卡分别引入了 tiValue和tiWhite-->

<template>
  <div class="accountSafe">
      <div class="baseBox">
  		  <el-tabs v-model="activeName" @tab-click="handleClick" class="font16">
            <el-tab-pane label="我的钛值" name="first">
              <ti-value />
            </el-tab-pane>
            <el-tab-pane label="氪金" name="second">
              <ti-white />
            </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import approveModal from './approveModal';
import tiValue from './tiValue';
import tiWhite from './tiWhite';
export default {
  components: {
    HbHead,approveModal,tiValue,tiWhite
  },
  data () {
    return {
      activeName: 'first',
    }
  },
  mounted(){
  },
  methods: {
    handleClick(tab, event){
      // localStorage.setItem('award_approve',1)
      if(tab.label == '氪金'){
           //获取氪金数据
          // this.getInitPhone();
      }
    }
  }
}
</script>

<style scoped>
.accountSafe{
  width:82%;
  background: #fff;
  border-radius: 4px;
  min-height: 580px;
}
.baseBox .el-tabs__item.is-active{
  color:#bfc4cf!important;
}
.nickname{
  width:20%;
}
.offer{
  width:80%;
}
.subBtn{
  float:right;
  margin-right: 30px;
}
.bindP{
  text-align: center;
  color:#999999;
}
.bind{
   color:#999999;
}
.phonenum{
  color:#1d87ff;
}
.pBtn{
   text-align: center;
   float:right;
}

.pBtn span{
  display: inline-block;
  background: #1d87ff;
  color:#fff;
  padding:2px 20px;
  border:1px solid #1d87ff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.info{
  color:#828282;
}
.textInfo{
  display: block;
  width: 100%;
  text-align: center;
}
.title{
  color:#989898;
  text-align: center;
}
.forGetBox{
  width:70%;
  margin: 0 auto;
}

.code{
  position: relative;
}
.codeBtn{
  position: absolute;
  right:0px;
 
  background: #1d87ff!important;
  color:#fff!important;
  border-top-left-radius :0;
  border-bottom-left-radius :0;
}
.imgeye{
  width:30px;
  height:25px;
  top:7px;
  right:0;
  position: absolute;
  display: inline-block;
  cursor: pointer;
}
.paw .paw_el{
 position: relative;
}
.el-select{
  width:100%;
}
.error_msg{
  font-size: 12px;
    color: #fa5555;
    text-align: left;
    position: absolute;
    top: 30px;
    left: 0px;
    display: none;
}
</style>
<style>
  .accountSafe{
    min-height: 600px;
  }

  .html_span{
      display: inline-block;
      width:100px;
      margin-right:30px;
      margin-bottom:10px;
      color:#999;
  }
  .safeModal .el-dialog--center .el-dialog__body{
    padding:4px 0px 15px;
  }
  .safeModal .forGetBox{
    width:78%;
    margin:0 auto;
  }
.safeModal .btnModal{
  width: 49%;
}
.safeModal .btnModal2{
  width: 45%;
  float: right;
}
</style>
