<template>
    <div id="box" v-if = "timeVisible" class = 'countDown'>
      <el-popover
        v-if = "browseAward.bonusValue !=undefined || browseAward.bonusValue!=null"
        ref="popover1"
        placement="top-start"
        width="150"
        trigger="hover"
        :content=" randomBrowseVisible ? '满足浏览时长，您将获得作者的钛值奖励' :'满足浏览时长，您将获得' + browseAward.bonusValue +'个钛值'">
      </el-popover>
        <!-- <p >倒计时：{{minute}}:{{second}}</p> -->
        <el-button v-popover:popover1><span class="linlan">浏览倒计时：</span>{{minute}}:{{second}}</el-button>
    </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import $ from 'jquery';
export default {
  data() {
    return {
          minutes:1,
          seconds:0,
          timeVisible:true,
    }
  },
  components: {},
  props: {
    browseAward:{},
    randomBrowseVisible:{}
  },
  //已成功挂载，相当ready()
  mounted(){
    if(this.browseAward.browseTime < 60){
      this.minutes = 0
      this.seconds = this.browseAward.browseTime
    }else if (this.browseAward.browseTime == 60){
      this.minutes = 1;
      this.seconds = 0;
    }else if(this.browseAward.browseTime > 60){
      this.minutes = parseInt(this.browseAward.browseTime/60);
      this.seconds  = this.browseAward.browseTime%60;
    }
    // this.minutes = this.browseAward.browseTime
    this.add();
    var _this = this;
    var _width = $(window).width(); 
    if(_width<768){
      $('.linlan').text('TIME:');
    }else{
      $('.linlan').text('浏览倒计时：');
    }
  },
  //相关操作事件
        methods:{
            num:function (n) {
                return n<10 ? "0" + n : "" + n
            },
            add:function () {
                let Request = new Object();
                Request = Lib.M.GetRequest();
                let url_id = Request['id'];
                url_id = url_id.split('_');
                const article_id = Base64.decode(url_id[0]);
                var _this = this;
                var time = window.setInterval(function () {

                    if (_this.seconds == 0 && _this.minutes != 0) {
                        _this.seconds = 59;
                        _this.minutes -= 1; 
                    }else if(_this.minutes == 0 && _this.seconds == 0){
                        _this.seconds = 0;
                        window.clearInterval(time);
                           const articles_list = Lib.M.dataRequest({
                                  "userId":localStorage.getItem('kg_desk_userId'),
                                  "articleId":article_id,   
                                  "bonusType":1,
                            })
                            Lib.M.ajax({
                                    'type':'post',
                                    'url':'/account/updateUserbalance/',
                                    "data":articles_list,
                                    'success':function (data){
                                      if(data.code == 10000){
                                          _this.timeVisible = false;
                                          if(data.responseBody != 0){
                                            const awardStr =  '感谢您付出的注意力，请收下浏览奖励' + data.responseBody + '钛值';
                                                _this.$alert(awardStr, "提示", {
                                                    confirmButtonText: '我知道了',
                                                    center: true,
                                                    customClass:"miableAwardBox",
                                                    showClose:false,
                                                    callback: action => {  
                                                       // _this.articleData = data.responseBody.data;
                                                      // _this.articleTotal = parseInt(data.responseBody.totalNumber);    
                                                      // window.location.reload()    
                                                    }
                                                  })
                                          }else{
                                                  // _this.articleData = data.responseBody.data;
                                                  // _this.articleTotal = parseInt(data.responseBody.totalNumber);    
                                                  // window.location.reload()    
                                          }
     
                                      }

                                      // loading.close();
                                }
                            });
                    }else{
                        _this.seconds -= 1 
                    }

                },1000);
            }
        },
        watch:{
            second:{
                handler(newVal){
                    this.num(newVal)
                }
            },
            minute:{
                handler(newVal){
                    this.num(newVal)
                }
            }
        },
        computed:{
            second:function () {
                return this.num(this.seconds)
            },
            minute:function () {
                return this.num(this.minutes)
            }
        }
}
</script>

<style scoped>
.el-button{
    /*position: absolute;*/
    bottom: 5px;
    border: 0px;
    border-radius: 0px;
    font-size:12px;
   right:0px;
   top:30px;
}
.el-button,.el-button:hover{
  background:transparent;
}
.aboutus{
  border-top:1px solid #f0f2f7;
  font-size:14px;
  color:#3d4b52;
  margin-bottom:50px;
}
.aboutus span{
  display: inline-block;
  margin-right:10px;
}
.aboutus p{
  margin-top: 10px;
}
.countDown .el-button{
  padding-top:22px;
}

@media only screen and (max-width:700px){
  .el-button{
    right:0px!important;
    top:30px!important;
  }
}
</style>
