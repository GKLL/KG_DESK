<template>
  <div class="myPupli">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="累计进贡" name="all">
        <all-tab/>
      </el-tab-pane>
      <el-tab-pane label="今日进贡" name="today"><today-tab/></el-tab-pane>
      <div class="rulesBtn" @click="dialogVisible=!dialogVisible"> 师徒规则<i class="iconfont icon-wenti-m"></i></div>
    </el-tabs>
    <el-dialog
    title="师徒规则"
    custom-class="rules"
    center
    :visible.sync="dialogVisible"
    width="30%"
    >
    <p>1.邀请方式：</p>
    <div>a.邀请有奖页分享邀请链接给好友，好友通过您的链接首次注册登录</div>
    <div>b.输入您的邀请码，绑定师徒关系后就会成为您的徒弟</div>
    <p>2.师徒关系一旦绑定，无法手动解绑。</p>
    <p>3.师傅可自行对表现好的徒弟进行奖赏。每日可打赏一次，每次打赏最高50TV</p>
    </el-dialog>
  </div>
</template>
<script>
import todayTab from './today.vue';
import allTab from './all.vue';
  export default {
    components: {todayTab, allTab},
    data() {
      return {
        activeName: 'all',
        dialogVisible: false
      };
    },
    methods: {
      handleClick(tab) { // 用户点击的tab,页面刷新后
         localStorage.setItem('inviteTabName2', tab.name)     
      }
    },
    created () {
      localStorage.setItem('is_new_reward', 0)
      localStorage.setItem('discipleReminder', 0);
      var tabName = localStorage.getItem('inviteTabName2');
      if(tabName) {
        this.activeName = tabName;
      }
      else this.activeName = 'all'
    }
  };
</script>
<style lang="less" >
.myPupli {
// .el-tabs__item.is-active {color: #fff;}
.el-tabs__active-bar{width: 64px;}
.el-tabs__item:focus.is-active.is-focus:not( :active) {
  box-shadow:  0 0 2px 2px rgba(250, 250, 250, 0) inset  !important;
}
.HeaderClassName{
  th {
    &:nth-child(4) {
      .cell {
        color: #409EFF;
      }
    }
  }
  .ascending ,.descending {
    .cell {
      color: #409EFF !important;
    }
  }
}
  padding-right: 42px;
  padding-left: 40px;
  .el-tabs__nav {
    .el-tabs__item, .el-tabs__active-bar{margin-left: 0px !important; }
    }
  .el-tabs__item{
    height: 50px !important;
    line-height: 50px !important;
    color:rgba(51,51,51,1) !important;
  }
  .is-active {
    color: #409EFF !important;
  }
  .rulesBtn {
    cursor: pointer;
    &:hover {
       color: #409EFF;
    }
    .icon-wenti-m{font-size: 18px;margin-left: 4px;}
  }
  .el-tabs__content {
    overflow: visible;
  }
  .rulesBtn {
    position: absolute;
    top: -32px;
    right: 10px;
    font-size:16px;
    color:rgba(51,51,51,1);
  }
  .star-six{text-align: center;}
}
</style>

<style lang="less">
.rules {
  font-family:'PingFang-SC-Regular' !important;
  .el-dialog__header{
    border-bottom: 1px solid rgba(240,240,240,1);
    padding: 19px 20px 13px;
    font-size:18px;
    color:rgba(51,51,51,1);
      .el-dialog__headerbtn .el-icon-close{
        width:18px;
        height:18px; 
        border-radius: 50%;
        line-height: 18px;
        // border: 1px solid #ccc !important;
      }
  }
  .el-dialog__body{
    padding: 38px 50px;
    color:rgba(118,118,118,1);
    p {
      margin-top: 17px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>

<style lang="less">
.psd {
  .el-dialog__header{ padding: 20px 20px 10px;}
  .el-dialog__body , .el-dialog__footer{text-align: center;}
  .el-input__inner{font-family:'PingFang-SC-Regular' !important;}
}
</style>
