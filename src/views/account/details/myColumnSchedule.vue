<template>
  <div class = 'myColumn'>
    <header class = 'myColumn_header flexR'>
      <span class = 'title'>申请进度</span>
      <div class = 'schedule_title'>
        <span class = 'color1d87'>选择类型</span>
        <span class = 'schedule_line'></span>
        <span class = 'color1d87'>申请资料</span>
      </div>
    </header>
    <div class = 'myColumn_main'>
      <table>
        <tr class = 'thead'>
          <td>申请类型</td>
          <td>提交时间</td>
          <td>审核状态</td>
          <!-- <td v-if = "scheduleData.applyRole == 4"></td> -->
        </tr>
        <tr class = 'info'>
            <td v-if = "scheduleData.applyRole == 2">个人</td>
            <td v-if = "scheduleData.applyRole == 3">媒体</td>
            <td v-if = "scheduleData.applyRole == 4">企业</td>
            <td v-if = "scheduleData.applyRole == 5">其他组织</td>
            <td>{{scheduleData.applyColumnTime}}</td>
            <td v-if = "scheduleData.auditStatus == 2">
              <span>不通过</span>
              <!-- <a class = 'color1d87 cursorPointer'></a> -->
            </td> 
            <td v-else-if = "scheduleData.auditStatus === 0">
              <span>审核中</span>
            </td>
<!--             <td>
  <span v-if = "scheduleData.applyRole == 4"  class = 'color_red'>还剩{{scheduleData.remainingAmount}}TV未缴纳</span>
</td> -->
        </tr>  
      </table>
<!--       <p  v-if = "scheduleData.applyRole == 4">请将{{scheduleData.depositAmount}}TV的保证金转入此地址：<span class = 'color_red'>{{scheduleData.depositAddress}} <br />  转账时请务必在备注中填写您的UID:{{userId}}</span></p> -->
      <div class = 'reason' v-if = "scheduleData.auditStatus == 2">不通过原因：{{scheduleData.refuseReason}}</div>
      <router-link v-if = "scheduleData.auditStatus == 2" class = 'color1d87 cursorPointer reApply' to='/select_type'><el-button type = 'primary' >重新申请</el-button></router-link>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

import HbHead from 'components/HbHead';

export default {
  components: {
    HbHead
  },
  data () {
    return {
      userId:""
    }
  },
  props: {
      scheduleData: {}
  },
  mounted(){
    this.userId = localStorage.getItem('kg_desk_userId')
  },
  methods: {
  }
}
</script>

<style scoped>
.myColumn_header{
  position: relative;
}


.myColumn_main{
  width:auto;
  padding:0px 32px;
}
.myColumn_main table{
  width:100%;
  margin-top:20px;
  text-align: center;
  font-size: 14px;
}
.thead{
  background:#f4f4f4;
  height:30px;
  line-height: 30px;
}
.info{
  margin:18px 0px;
}
.info td{
  padding:18px 0px;
}
.reason{
  padding:10px 33px;
  background:#f4f4f4;
}
.reApply{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
