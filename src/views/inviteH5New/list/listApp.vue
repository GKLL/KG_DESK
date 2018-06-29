<template>
  <div class="inviteH5">
    <div class="bg">
      <div class="con"></div>
      <div class="action">
        <p>您的手机号可以直接登录千氪财经阅读海量优质内容；</p>
        <p>您也可以前往收徒活动页，把活动页分享给好友建立师徒关系</p>
        <div>
          <el-button @click="toIndex">查看千氪</el-button>
          <el-button  type="primary"  @click="doIt">马上收徒</el-button>
        </div>
            
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userId: '',
      inviteCode: ''
    }
  },
  methods: {
    toIndex () {
      window.location.href='../index/list.html'
    },
    doIt () {
      window.location.href = '../teacher_pupil/list.html?userId='+this.userId+'inviteCode='+this.inviteCode;
    }
  },
  created () {
    this.userId = localStorage.getItem('kg_desk_userId');
    this.inviteCode = localStorage.getItem('kg_desk_inviteCode')
  }
}
</script>

<style lang="less">
 // 设计图的一半
  .inviteH5 {
    font-family:'PingFangSC-Regular' !important;
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
      .action{
        width: 275px;
        height: 179px;
        text-align: left;
        padding: 25px 25px 30px 20px;
        margin: 0 auto;
        border-radius: 8px;
        background:rgba(255,255,255,1); 
        box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        -webkit-box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        -moz-box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        margin-bottom: 39px;
        p{
          font-size:16px;
          font-family:'PingFangSC-Regular' !important;
          color:rgba(102,102,102,1);
          margin-bottom: 20px;
        }
        .codeBtn{height: 44px;}
        .el-button--default, .el-button--primary{width: 128px;font-family:'PingFangSC-Regular' !important;height: 44px;background:rgba(34,138,255,1);border-radius: 22px;}
        .el-button--default{background:rgba(246,246,246,1);color:rgba(34,138,255,1);border-color: rgba(34,138,255,1);}
      }

    }
  }

  @media only screen and (min-width:750px){ // 设计图
    .inviteH5 {
     
      .bg{
       
        padding-top: 760px;
        height: 216px;
        background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041001/bg%403x.png');

        .el-button--primary{
          font-size: 32px !important;
        } 
        .action{
          width: 550px;
          height: 358px;
          padding: 50px 50px 60px 40px;

          border-radius: 16px;
        
          box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          -webkit-box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          -moz-box-shadow:10px 0px 152px rgba(28,42,83,0.24);  
          margin-bottom: 78px;
          p{
            font-size:32px;
           
            margin-bottom: 40px;
          }     
          .codeBtn{height: 88px;}
          .el-button--default,.el-button--primary{width: 258px;height: 88px;border-radius: 44px;}
        }

      }
    }
  }
</style>
<style>
@media only screen and (max-width:320px){
 .inviteH5 .bg .action .el-button--default, .inviteH5 .bg .action .el-button--primary{
  width:106px;
 }
 .inviteH5 .bg .action{
  width:232px;
 }
  .inviteH5 .bg{
    background-position: center;
  }
}
</style>
