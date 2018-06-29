<template>
    <div id="box" v-if = "timeVisible">
      <el-popover
        v-if = "browseAward.bonusValue !=undefined || browseAward.bonusValue!=null"
        ref="popover1"
        placement="top-start"
        width="150"
        trigger="hover"
        :content=" randomBrowseVisible ? '满足浏览时长，您将获得作者的钛值奖励' :'满足浏览时长，您将获得' + browseAward.bonusValue +'个钛值'">
      </el-popover>
        <!-- <p >倒计时：{{minute}}:{{second}}</p> -->
        <el-button v-popover:popover1>TIME:{{minute}}:{{second}}</el-button>
    </div>
</template>
<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {

    }
  },
  components: {},
  props: {

  },
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
    methods:{
           
    }
}
</script>
<style scoped></style>