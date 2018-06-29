<template>
	<div id="app" >
    <hb-head></hb-head>
    <div class = 'container'>
      <div class = 'top'>
        <img v-if = "infoData.avatar != null&& fromthird == null" :src = "imgUrl + infoData.avatar" />
        <img v-if = "infoData.avatar == null&& fromthird == null" src = "../../../assets/img/avatar.png" />
        <img v-if = "infoData.avatar != null && fromthird != null" :src = "infoData.avatar" />
        <div class = 'info'>
          <p>{{infoData.userName}}</p>
          <p v-if = "infoData.province != null">{{infoData.province}}|{{infoData.city}}</p>
          <p v-if ="infoData.resume !=null">简介：{{infoData.resume}}</p>
        </div>
      </div>
      <div class = 'bottom'>
        <ul class="martop20 font16 mycomment">
            <li class ='ping'>他的评论（{{total}}）条</li>
            <li v-for="(t,index) in commentData" :key="index" class="martop20">
                <div class="content">
                    <div class = 'omit1'>{{t.commentDesc}}</div>
                    <!-- <div @click = "onDelete(t)"><i class="iconfont del">&#xe603;</i></div> -->
                </div>
                <div class="time">
                    <span class = 'timer'>{{t.commentDate}}</span>
                     <div class = 'commentArticle omit1'>
                          <span>评论了《</span>
                            <a class = 'omit1 cursorPointer' @click = "toDetail(t)">{{t.articleTitle}}</a>
                          <span>》</span>
                    </div>
                </div>
            </li>
        </ul>
      </div>
    </div>
             <div v-if = "loadingShow" class = 'loadingGif'>
            <img src = '../../../assets/img/kg.gif'/>
        </div>
    <other-footer/>
        <to-top />
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import OtherFooter from 'components/OtherFooter';
import ToTop from 'components/ToTop';
export default {
  data() {
    return {
      loadingShow:false,
      height:{
        height:document.body.clientHeight - 236 + 'px'
      },
      commentData:{},
      infoData:{},
      total:"",
      imgUrl:Lib.C.imgUrl,
      fromthird:null
    }
  },
  components: {HbHead,OtherFooter,ToTop},
  //已成功挂载，相当ready()
  mounted(){
      const id = Lib.M.getUrlQuery('other_id');
      let indexTitle = document.getElementsByTagName('title')[0];
      const that = this;
      //他人评论信息
      const listData = Lib.M.dataRequest({
                  "userId":id,
                  "currentPage":1,
      })
      Lib.M.ajax({
              'type':'post',
              'url':'userComment/getothersComment',
              "data":listData,
              'success':function (data){
                  if(data.code == 10000){
                      data = data.responseBody;
                      that.commentData = data.data;
                      that.total = data.totalNumber;
                      that.loadingShow = false;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error',
                      });
                  }
              }
      })     
      const list_data = Lib.M.dataRequest({
                  "userId":id,
      })
      //他人个人信息 
      Lib.M.ajax({
              'type':'post',
              'url':'userprofile/getByIdProfile',
              "data":list_data,
              'success':function (data){
                  if(data.code == 10000){
                      data = data.responseBody.data;
                      that.infoData = data;
                      if(data.avatar != null && data.avatar != ''){
                        that.fromthird = data.avatar.indexOf("http") != '-1' ? '1' : null;
                      }
                      
                      indexTitle.innerHTML = data.userName;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error',
                      });
                  }
              }
      })
  },
  //相关操作事件
  methods: {
    toDetail(item){
       Lib.M.goDetail(item)
    }
  }
}
</script>

<style scoped>
.container{
 padding-top:11px;
}
.top{
  width:100%;
  height:200px;
  background:#fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.top img{
  display: inline-block;
  width:100px;
  height:100px;
  border-radius: 50%;
  margin-top:50px;
  border:1px solid #f0f0f0;
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left:20px;
}
.info p{
  margin-top:10px;
}
.bottom{
  background:#fff;
  margin:20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 477px;
}
  .mycomment{
    padding-left: 30px;
  }
  .mycomment li {
    width:90%;
    height:76px;
    border-bottom: 1px solid #f0f0f0;
  }
  .bottom .ping{
    border:0px;
    height:20px;
        margin-bottom: 35px;
    font-size: 20px;
  }
  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height:30px;
  }
  .time{
    color:#bfc5cf;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .time a{
    color:#1d87ff;
    cursor: pointer;
    text-decoration:none;
  }

  .timer{
    /*margin-right:150px;*/
  }

  .commentArticle{
    width: 530px;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
</style>
<style>
  .bottom_footer{
    position: absolute!important;
    bottom:0px;
  }
</style>
