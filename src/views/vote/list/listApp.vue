<template>
<div id="app">
    <div class = 'container'>
      <div class="logo">
        <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/vote3.png"/>
      </div>
      <ul 
      class="voteList" 
      v-loading="loading2"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
      >
          <li v-for="(item,index) in data" :key="index">
            <div>
                <span class="voteSort">{{index+1<10?"0"+(index+1):index+1}}</span>
            </div>
            <div class="title">
                <p>{{item.companyName}}</p>
                <p>{{item.voteNum}}票</p>
            </div>
            <div>
                <span class="voteBtn" @click="voteClick(item)">投票</span>
            </div>
          </li>
      </ul>
      <div class="info">本活动最终解释权归主办方所有</div>
    </div>
    <!-- 评论弹窗 -->
    <div id="bg" class="mobile_mask">
          <div class="commentBox">
              <div class="boxTop">
                  <div class="cancelColor" @click="closeVoteBox">
                      取消
                  </div>
                  <div class="them">
                      投票
                  </div>
                  <div class="okColor" @click = "voteOk" v-if="loading">
                    确认投票
                  </div>
                  <div class="okColor"  v-else>
                    <i class="el-icon-loading"></i>
                  </div>
              </div>
              <div class="commentInput">
               
                  <el-input
                  id="inputNumber"
                  class="textarea"
                  type="number"
                  placeholder="自定义数量"
                  v-model="textarea"
                  ref="voteNum"
                  @keyup="handleFilterLetters"
                  >
                  </el-input>
            
                <span  class="voteNum">票</span>
              </div>
              <span class="awardInfo">说明：投票时千氪账户余额需达到100TV，每天总共可投10000票。</span>
          </div>
    </div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import $ from 'jquery';
import codeData from 'assets/js/phone';
let Base64 = require('js-base64').Base64;
 export default {
    data() {
      
      return {
        getCandyVisible:false,
        candyMaskVisible:false,
        textarea:"",
        item:{},
        loading2:false,
        loading:true,
        data:[{
          "id":"01",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"02",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字反对犯得上",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },{
          "id":"03",
          "name":"项目方最长是是十个字",
          "count":1000,
        },
        ],
        url_id:"",
        height:{
          height:document.body.clientHeight - 160 + 'px'
        }
      };
    },
    mounted(){
        const _this =this;
        _this.voteList();  //页面加载投票列表
      
    },
    methods: {
      handleFilterLetters(){
          var self = this;
          self.textarea=self.textarea.replace(/^[1-9]\d*$/,'');
      },
      voteList(){
        /*投票列表传参*/
       const voteList = Lib.M.dataRequest({
              "activityId":"1",
        })
       const _this = this;
       /*投票列表*/
        _this.loading2 =true;
        Lib.M.ajax({
            'type':'post',
            'url':'/vote/voteList',
            "data":voteList,
            'success':function (data){
                if(data.code=="10000"){
                  var res = data.responseBody;
                  _this.loading2 =false;
                  _this.data = res;
                }else{
                  const msg = data.message;
                   _this.loading2 =false;
                    this.$confirm(msg,'提示',{
                      confirmButtonText: '知道了',
                      center: true,
                      showClose:true,
                      showCancelButton:false,
                      closeOnClickModal:true,
                      customClass:"mobile_vote"
                    })
                }
            }
          })
      },
      voteClick(item){
        const id = localStorage.getItem("kg_desk_userId");
        if (id == null) {
        this.$alert('请先登录！', '提示', {
          confirmButtonText: '立即前往',
          center: true,
          showCancelButton:false,
          closeOnClickModal:true,
          customClass:"mobile_vote",
        }).then(() => {
          const url = window.location.href;
          localStorage.setItem('loginUrl',url)
          window.location.href = '../login/list.html'
        }).catch(() => {
      
        });
          return;
        }
        $('#bg').css('display','block');
        const that =this;
        that.item =item;
        $('html,body').animate({scrollTop: '0px'}, 100);
        $('#bg').bind("touchmove",function(e){  
                  e.preventDefault();  
          },false);  
        document.body.style.overflow="hidden";
        // document.html.style.height="100%";
        document.body.style.overflow="hidden";
        document.body.style.height="100%";
      },
      closeVoteBox(){
        $('#bg').css('display','none');
        this.textarea = "";
        document.body.style.overflow="visible";
        document.body.style.overflow="visible";
        document.body.style.height="auto";
      },
      voteOk(){
        const id = localStorage.getItem("kg_desk_userId");
        if(this.textarea==""){
                this.$alert("请输入数量！",'提示',{
                  confirmButtonText: '知道了',
                  center: true,
                  showClose:true,
                  showCancelButton:false,
                  closeOnClickModal:true,
                  customClass:"mobile_vote",
                })
                   
                return
        }
        if(!Lib.V.validateInteger(this.textarea)){
                this.$alert("请输入正整数！",'提示',{
                  confirmButtonText: '知道了',
                  center: true,
                  showClose:true,
                  showCancelButton:false,
                  closeOnClickModal:true,
                  customClass:"mobile_vote",
                })
                   
                return
        }
        
        const textarea = parseInt(this.textarea);
        if(textarea > 10000){
              this.$alert('您输入的数量大于10000！','提示', {
                  confirmButtonText: '知道了',
                  center: true,
                  showClose:true,
                  showCancelButton:false,
                  closeOnClickModal:true,
                  customClass:"mobile_vote",
                })
              return
        }
        const that = this;
        const voteItem = this.item;  //选择的公司;
        //投票参数
        const list = Lib.M.dataRequest({
              "userId":id,
              "voteId":voteItem.voteId,
              "voteNum":textarea
        })
        that.loading=false;
        /*投票操作*/
        Lib.M.ajax({
            'type':'post',
            'url':'/vote/vote',
            "data":list,
            'success':function (data){
                if(data.code=="10000"){
                  const msg = data.responseBody;
                  that.loading=true;
                  that.$confirm(msg,'提示',{
                        confirmButtonText: '知道了',
                        center: true,
                        showClose:true,
                        showCancelButton:false,
                        closeOnClickModal:true,
                        customClass:"mobile_vote"
                  }).then(() => {
                      that.closeVoteBox();
                      that.voteList();
                    }).catch(() => {
                      that.closeVoteBox();
                      that.voteList();
                    });
                  
                }else{
                  that.loading=true;
                  //账户余额不足时
                  if(data.code == "20024"){
                    that.closeVoteBox();
                    that.$confirm('您的余额不足100TV，请充值！',"提示", {
                              confirmButtonText: '立即前往',
                              center: true,
                              showClose:true,
                              showCancelButton:false,
                              closeOnClickModal:true,
                              customClass:"mobile_vote",
                    }).then(() => {
                      window.location.href = '../account/details.html#/'
                    }).catch(() => {
                  
                    });
                  }else{
                    that.closeVoteBox();
                    const msg = data.message;
                      that.$confirm(msg,'提示',{
                        confirmButtonText: '知道了',
                        center: true,
                        showClose:true,
                        showCancelButton:false,
                        closeOnClickModal:true,
                        customClass:"mobile_vote"
                      })
                  }
                  
                }
            }
          })
        
    }
  }
  }


</script>

<style scoped>
  html,body{
    height:100%;
  }
  #app{
    width:100%;
    height:100%;
  }
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
    background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/vote2.png') no-repeat;
    background-size: 100% 100%;
    /*height:100%;*/
  }

  .voteSort{
    display: inline-block;
    width:54px;
    height:54px;
    line-height:54px;
    background-image: url('../../../assets/img/vote4.png');
    background-size: 100% 100%;
    font-weight: bold;
    font-size:16px;
    font-family:HYQiHeiX1-IEW;
    background-repeat: no-repeat;
    color:#fff;
    text-align: center;
  }
  .voteList li:nth-child(1) div:nth-child(1) span{
    background-image: url('../../../assets/img/vote5.png');
    color:#ECCE53;
  }
  .voteList li:nth-child(2) div:nth-child(1) span{
    background-image: url('../../../assets/img/vote6.png');
    color:#C9D5EE;
  }
  .voteList li:nth-child(3) div:nth-child(1) span{
    background-image: url('../../../assets/img/vote7.png');
    color:#E39756;
  }
  .voteList{
     width:84%;
     margin:40px auto 20px;
     border:1px solid #15E1FF;
     padding-bottom: 30px;
     background: #101010;
  }
  .voteList li{
    width:98%;
    color:#fff;
    font-size:14px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding:30px 4px 0px;
  }
  .title{
    padding-top: 4px;
    width:45%;
  }
  .title p:nth-child(1){
      font-size:16px;
      color:#fff;
      font-weight: bold;
      font-family: PingFangSC-Semibold;
      text-overflow : ellipsis; 
      white-space : nowrap; 
      overflow : hidden;   
  }
  .title p:nth-child(2){
      font-size:12px;
      color:#15E1FF;
      font-family: PingFangSC-Regular;  
  }
  .voteBtn{
    display: inline-block;
    width:70px;
    height:36px;
    border-radius: 18px;
    color:#15E1FF;
    border:1px solid #15E1FF;
    line-height:35px;
    text-align: center;
  }
  .info{
    width: 100%;
    text-align: center;
    height:20px;
    line-height: 20px;
    font-size:12px;
    color:#cccccc;
    margin:0px 0 20px;
  }
  #bg{
    display: none;
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    background: rgba(0,0,0,0.6);
    z-index: 1000; 
  }
  .commentBox{
    width:100%;
    position: fixed;
    bottom:0;
    z-index: 99999;
    height:200px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .boxTop{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 12px;
    font-size:14px;
    border-bottom:1px solid #C8CED1;
  }
  .cancelColor{
    color:#666;
  }
  .okColor{
    color:#1D87FF;
  }
  .them{
    color:#333333;
  }
  .commentInput{
    width:80%;
    margin: 20px auto;
    position: relative;
  }
  .voteNum{
    position: absolute;
    top:0;
    right:15px;
    font-size:16px;
    display: inline-block;
    height:16px;
    line-height: 34px;

  }
  .awardInfo{
    display:block;
    width:80%;
    margin: 20px auto;
    color:#333333;
    font-family:PingFangSC-Regular;
  }
  @media only screen and (max-width:768px){
    .logo{
      width:80%;
      margin: 43px auto 0px;
      display: block;
      display: flex;
      flex-direction: column;
      justify-content: center;
     
    }
    .logo img{
      width:100%;
    }
   
  }
  @media only screen and (max-width:414px){
    
  }
  @media only screen and (max-width:375px){
   .title{
    width:47%;
   }  
  }
  @media only screen and (max-width:320px){
    
    .keyword{
      font-size: 18px;
    }
    .logoBox{
        margin-top: 220px;
      }
    .decoration{
      width:300px;
      height:140px;
    }
  }
  
</style>
<style>
  .textarea .el-input__inner{
    background: #EEEEEE!important;
    border:0!important;
    border-radius: 30px!important;
  }
  input::-webkit-input-placeholder {
       color: #999!important;
       font-family:PingFang-SC-Regular!important;
  }
</style>
