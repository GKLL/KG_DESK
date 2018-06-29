<template>
  <div class="inviteH5">
    <div class="bg">
      <div class="con"></div>
      <div class="action">
        <p>分享生成的收徒活动页，好友可通过收徒活动页成为你的徒弟</p>
        <div>
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
    doIt () {
      window.location.href = '../teacher_pupil/list.html?userId='+this.userId+'inviteCode='+this.inviteCode;
    }
  },
  created () {
    this.userId = localStorage.getItem('kg_desk_userId');
    this.inviteCode = localStorage.getItem('kg_desk_inviteCode')
  }
  //已成功挂载，相当ready()
  //相关操作事件
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
        width: 260px;
        height: 125px;
        text-align: left;
        padding: 25px 30px 30px 30px;
        margin: 0 auto;
        border-radius: 8px;
        background:rgba(255,255,255,1); 
        box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        -webkit-box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        -moz-box-shadow:5px 0px 76px rgba(28,42,83,0.24);
        margin-bottom: 67px;
        margin-top: 15px;
        p{
          font-size:16px;
          font-family:'PingFangSC-Regular' !important;
          color:rgba(102,102,102,1);
          margin-bottom: 20px;
        }
        .codeBtn{height: 44px;}
        .el-button--primary{width: 100%;font-family:'PingFangSC-Regular' !important;height: 44px;background:rgba(34,138,255,1);border-radius: 22px;}
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
          width: 520px;
          height: 250px;
          padding: 50px 60px 60px 60px;
         
          border-radius: 16px;
          margin-bottom: 134px;
          margin-top: 30px;
         
          box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          -webkit-box-shadow:10px 0px 152px rgba(28,42,83,0.24);
          -moz-box-shadow:10px 0px 152px rgba(28,42,83,0.24);  
          p{
            font-size:32px;
            
            margin-bottom: 40px;
          }     
          .codeBtn{height: 88px;}
          .el-button--primary{height: 88px;border-radius: 44px;}
        }

      }
    }
  }
</style>
<style>
@media only screen and (max-width:320px){
 .inviteH5 .bg .action{
  width:232px;
 }
.inviteH5 .bg{
  background-position: center;
}
}
</style>
