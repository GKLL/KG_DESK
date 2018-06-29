<template>
      <div class = 'sidebarContainer'>
          <div class = 'author_info flexC'>
            <div class = 'avatar'>
              <img v-if = "personInfo.avatar != null && fromthird == null"  :src = "imgUrl + personInfo.avatar"/>
              <img v-if = "personInfo.avatar == null  && fromthird == null" src = "../assets/img/avatar.png"/>
              <img v-if = "personInfo.avatar != null  && fromthird != null" :src = "personInfo.avatar"/>
              <span class ='avatar_mask cursorPointer' @click = 'avatarVisible = true'>编辑头像</span>
            </div>
            <p class = 'omit1' v-if = 'roleId == 1'>{{personInfo.userName.length >= 12 ? personInfo.userName.slice(0,10) + '...' : personInfo.userName}}</p>
            <p class = 'omit1' v-else>{{personInfo.columnName.length >= 12 ? personInfo.columnName.slice(0,10) + '...' : personInfo.columnName}}</p>
            <p v-if = "personInfo.province == null ? false : true">
              <span v-if = 'roleId != 1' class = "colorb2b2 letterSp2">{{personInfo.columnProvince}}</span>
              <span v-else  class = "colorb2b2 letterSp2">{{personInfo.province}}</span>
              <span  class = "colorb2b2 letterSp2">|</span>
              <span v-if = 'roleId != 1'  class = "colorb2b2 letterSp2">{{personInfo.columnCity}}</span>
              <span v-else  class = "colorb2b2 letterSp2">{{personInfo.city}}</span>
            </p>
          </div>
          <ul class = 'sidebar'>
            <li><a href = '../account/details.html#/myTreasure'><i></i><span @click="removeClass('tiValue')" >我的财富</span></a></li>
            <!-- <li><a href = '../account/details.html#/'><i></i><span @click="removeClass('tiValue')" >我的钛值</span></a></li> -->
            <li><a href = '../account/details.html#/column'><i class="dis"></i><span  @click="onClcik()">我的专栏</span></a></li>
            <li><a href = '../account/details.html#/collect'><i></i><span @click="removeClass()" >我的收藏</span></a></li>
            <li><a href = '../account/details.html#/comment'><i></i><span @click="removeClass()">我的评论</span></a></li>
            <li><a href = '../account/details.html#/account_safe'><i></i><span  @click="removeClass()">账号与安全</span></a></li>
            <li><a href = '../account/details.html#/invite_stu/invite_award' ><i></i><span  @click="removeClass()">邀请与收徒</span></a></li>
            <li><a><span @click = "Quit"><i></i>退出登录</span></a></li>
          </ul>
          <avatar-modal :visible = "avatarVisible" :cancel = "cancelAvatar" :roleId = "roleId" :initSrc = "personInfo.avatar" :fromthird = "fromthird"/>
      </div>
</template>
<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import avatarModal from './avatarModal';

export default {
  name: 'add',	
  components: {
    HbHead,avatarModal
  },
  data () {
    return {
      type:1,
      personInfo:{
        "userName":'',
        "columnName":'',
      },
      avatarVisible:false,
      imgUrl:Lib.C.imgUrl,
      initSrc:"123",
      roleId:"0",
      fromthird:null
    }
  },
  methods: {
    showEditorAvatar(){
       this.avatarVisible = true;
       this.initSrc = this.personInfo.avatar;
    },
    cancelAvatar(){
      this.avatarVisible = false
    },
    removeClass(){
        localStorage.setItem('award_approve',1)
        localStorage.setItem('trader_pwd',1)
      var domId =document.getElementsByClassName("domId");
          var domX =domId[0].children[0];
          if(domId[0]!=undefined){
             domX.style.cssText='';
          }
    },
    onClcik(){
        localStorage.setItem('award_approve',1)
        localStorage.setItem('trader_pwd',1)
        localStorage.setItem('isBind',1);
        localStorage.setItem('activeName','0')
        var domId =document.getElementsByClassName("domId");
          var domX =domId[0].children[0];
          if(domId[0]!=undefined){

             domX.style.cssText='display: inline-block;background:#1d87ff;width:2px;';
          }
    },
    Quit(){
          const list = Lib.M.dataRequest({
              "userId":localStorage.getItem('kg_desk_userId')
          })
          Lib.M.ajax({
              'type':'post',
              'url':'userkg/logOut',
              "data":list,
              'success':function (data){
                  // localStorage.clear();
                  // window.location.href = '../index/list.html'
                  if(data.code == 10000){

                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          }); 
    },
  },
  mounted(){

    // this.roleId = localStorage.getItem('kg_desk_roleId');
    if(window.location.hash == "#/select_type"||window.location.hash == "#/personal"||window.location.hash == "#/media"||window.location.hash == "#/publish"){

        var domId =document.getElementsByClassName("domId");

          domId[0].className = 'router-link-exact-active'; //在原来的后面加这个

    } 
      //请求用户信息
        const that = this;
          const list = Lib.M.dataRequest({
                      "userId":localStorage.getItem('kg_desk_userId')
                      // "roleId":localStorage.getItem('kg_desk_roleId'),
          })
          Lib.M.ajax({
              'type':'post',
              'url':'userprofile/getProfile',
              "data":list,
              'success':function (data){
                  if(data.code == 10000){
                    data = data.responseBody.data;
                    that.personInfo = data;
                    that.roleId = data.userRole
                    that.initSrc =data.userRole == 1 ? data.avatar:data.columnAvatar;
                    if(data.avatar != null  && data.avatar != ''){
                      that.fromthird = data.avatar.indexOf('http') != '-1' ? '1' : null;
                    }
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          }); 
  }
}
</script>

<style scoped>
body{
  background:#f4f4f4;
}
.sidebarContainer{
  width:175px;
  margin-right:20px;
}
.author_info{
  width:100%;
  height:210px;
  border-radius: 5px;
  background:#fff;
  border-radius: 5px;
  margin-bottom:20px;
  justify-content: center;
  overflow-y: hidden;
}
.avatar{
  position:relative;
  width:87px;
  height:87px;
  margin:0 auto;
  margin-bottom:8px;
}
.avatar:hover .avatar_mask{
  display: block;
}
.avatar_mask{
  display: none;
  position: absolute;
  z-index: 100;
  background:rgba(0,0,0,0.5);
  width:100%;
  height:100%;
  line-height: 87px;
  text-align: center;
  top:0px;
  border-radius: 50%;
  color:#fff;
}
.author_info img{
  display: inline-block;
  width:87px;
  height:87px;
  border-radius: 50%;
    border:1px solid #f0f2f7;
}
.author_info img,.author_info p{
  margin:0 auto;
}
.author_info p:first-of-type{
  /*width:50%;*/
  /*margin:15px 5px 25px;*/
  margin:10px auto;
  text-align: center;
  font-size:14px;
}
.sidebar{
  width:100%;
  height:auto;
  border-radius: 5px;
  background:#fff;

}
.sidebar li{
  height:50px;
  line-height: 50px;
  font-size: 14px;

}
.sidebar li:hover{
  background:#ebedf0;
  cursor: pointer;
}
.sidebar a:hover{
  text-decoration: none;
  color:#333;
}
.sidebar a{
  display: flex;
  flex-direction: row;
}
.sidebar a i{
  display: inline-block;
  margin-top:15px;
  height:20px;
  width:2px;
  background:transparent;
}
.sidebar a span{
  margin-left:15px;
  display: inline-block;
  width:90%;
}
.sidebar .router-link-exact-active i{
 display: inline-block;
 background:#1d87ff;
}
.dis{
    margin-top: 15px;
    height: 20px;
    width: 2px;
        display: inline-block;
    background: #1d87ff !important;
}
</style>
