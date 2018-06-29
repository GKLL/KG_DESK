<template>
  <div class="myTeacher" v-loading="loading" 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(250, 250, 250, 1)">
     <div v-if="have" class="has">
       <p class="myTeacher">我的师傅</p>
       <img v-if="!teacherData.defaultImg"  :src="teacherData.avatar"/>
       <img v-if="teacherData.defaultImg" src="./../../../../assets/img/avatar.png"/>
       <p>{{teacherData.userName}}</p>
       <div class="flexbox">
         <div>
           <p>今日进贡(TV)</p>
           <p>{{teacherData.todayIncome}}</p>
         </div>
         <div>
           <p>累计进贡(TV)</p>
           <p>{{teacherData.income}}</p>
         </div>
         <div>
           <p>我最近进贡时间(TV)</p>
           <p style="font-size:16px;line-height:16px;padding-right:70px;padding-top:10px">{{teacherData.recenflowDate == null ? '-': teacherData.recenflowDate}}</p>
         </div>
         <div>
           <p>我的奖赏(TV)</p>
           <p>{{teacherData.awrad}}</p>
         </div>
       </div>
       <div class="explain">
         <p>进贡规则</p>
         <p>1.师徒关系一旦绑定，无法手动解绑，如需解绑，请联系客服。</p>
        <p>2.师傅可自行对表现好的徒弟进行奖赏。每日可打赏一次，每次打赏最高50TV</p>
       </div>
     </div>
     <div v-else class="not">
       <p>你还没有师傅</p>
       <el-input v-model="params.inviteCode" placeholder=""></el-input>
       <p>输入好友邀请的邀请码</p>
       <p>绑定成功后您将成为好友的徒弟</p>
       <el-button type="primary" @click="bindTeacher">提交</el-button>
     </div>
  </div>
</template>

<script>
import conf from './../../../../assets/js/conf';
export default {
  data () {
    return {
      have: false, // 是否有师傅
      params:{
        inviteCode: '',
        userId: '',
        name: '小跑',
        src: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
      },
      teacherData: {},
      loading: true
    }
  },
  methods: {
    bindTeacher () { // 填写好友邀请码，成为好友徒弟。
      var vm = this;
      if (this.params.inviteCode.length == 0) {
        this.$message({
          type: 'warning',
          message: '请输入邀请码',
          center: true
        });
        return;
      }
      let  list = this.$Lib.M.dataRequest({
                "userId":this.params.userId,
                "inviteCode": this.params.inviteCode
          });
      this.$Lib.M.ajax({
        'type': 'post',
        'url': 'disciple/bindingTeacher', // 绑定师傅
        'data': list,
        'success': function (data) {
          if (data.code == 10000) {
            vm.$alert('绑定师傅成功', '', {
              confirmButtonText: '确认'
            });
            vm.getMyTeacher();
          }
          else if (data.code == 20029) {
            vm.$message.error(data.message);
            setTimeout(function () {
              window.location.reload();
            },2000)
          }
          else {
            vm.$message.error(data.message);
          }
        }
      });
    },
    getMyTeacher () { // 获得我的师傅
      vm = this;
      let list = this.$Lib.M.dataRequest({userId: this.params.userId});
      this.$Lib.M.ajax({
        "type": "post",
        "url": "disciple/getTeacherInfo",
        "data": list,
        "success": function (data) {
          if(data.code ==10000) {
            vm.teacherData = data.responseBody;
            // vm.teacherData.recenflowDate = '2012-12-01 19:21:21';
            if (!vm.teacherData.avatar) {
              vm.teacherData.defaultImg = 1
            } else {
                vm.teacherData.defaultImg = 0;
                if (vm.teacherData.avatar.indexOf('http') ==-1) { // 如果不是第三方头像
                    vm.teacherData.avatar = conf.imgUrl + vm.teacherData.avatar;
                }
              }
            if(!vm.teacherData.tUId) {
              vm.have = false; // 没师傅页面
              localStorage.setItem('haveTeacher', 0)
            } else {vm.have = true;localStorage.setItem('haveTeacher', 1)}
          }
          vm.loading = false
        }
      })
    }
  },
  created () {
    localStorage.setItem('is_new_reward', 0)
    this.have = localStorage.getItem('haveTeacher');
    this.params.userId = localStorage.getItem('kg_desk_userId');
    this.getMyTeacher();
  }
}
</script>
<style lang="less">
// 控制弹出大小
.el-message-box {
  font-family:'PingFang-SC-Regular' !important;
  width:408px;
  height:140px; 
  border: none;
  background:rgba(255,255,255,1);
  padding-bottom: 0;
  border-radius: 6px;
  text-align: center;
  .el-message-box__header{display: none;}
  .el-message-box__content{
    padding: 0;
    padding-top: 37px;
    padding-bottom: 31px;
  }
  .el-message-box__btns {
    padding: 0;
    text-align: unset;
    .el-button--default {
      width:99px;
      height:32px; 
      background:rgba(34,138,255,1);
      border-radius: 4px;
      font-size:14px;
      font-family:'MicrosoftYaHei';
      color:rgba(255,255,255,1); 
    }
  }
}
</style>

<style lang="less" scoped>
@textColor: rgba(51,51,51,1);
.myTeacher {
  font-family: 'PingFangSC-Light' !important;
  .has {
    text-align: center;
      .myTeacher {
        font-size:24px;
        color:rgba(51,51,51,1);
        margin-top: 50px;
        margin-bottom:29px;
      }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      &+p {
        font-size:18px;
        color:rgba(43,34,34,1);
        margin: 19px 0 30px 0;
      }
    }
    .flexbox {
        display: flex;
        justify-content: space-around;
        padding-left: 61px;
        padding-right:64px;
        div {
          width:160px;
          height:100px;
          background:rgba(244,244,244,1);
          border-radius: 4px; 
          padding-left:20px;
          text-align:start;
          text-align:left;
          p {
            &:first-child {
              font-size:14px;
              color:rgba(153,153,153,1);
              margin-top: 19px;
            }
            &:nth-child(2) {
              font-size:36px;
              font-family:'PingFangSC-Semibold';
              color:rgba(51,51,51,1);
            }
          }
        } 

    }
    .explain {
      text-align:start;
      margin-top:50px;
      padding-left: 61px;
      margin-bottom:90px;
      p {
        font-size:14px;
        font-family:'PingFangSC-Regular';
        color:rgba(179,179,179,1);
        line-height:28px;
        &:first-child {
          font-size:18px;
          color:rgba(43,34,34,1);
          margin-bottom:27px;
          line-height:0;
        }
      }
    }
  }
  // 没师傅
  .not {
    text-align: center;
    .el-input {
      width:220px;
      height:42px; 
      background:rgba(255,255,255,1);
      border-radius: 4px;
      margin-bottom: 19px;
    }
    p {
      &:first-child {
        font-size:24px;
        color:@textColor;
        margin: 60px 0 19px 0;
      }
      &:nth-child(3), &:nth-child(4) {
        font-size:14px;
        color:rgba(89,89,89,1);
        line-height:24px;
      }
    }
    .el-button--primary {
      margin-top: 52px;
      width:140px;
      height:42px; 
      background:rgba(34,138,255,1);
      border-radius: 4px;
      font-size:16px;
      color:rgba(255,255,255,1);
      font-family: 'PingFangSC-Light' !important;
    }
  }
}
</style>
-->


