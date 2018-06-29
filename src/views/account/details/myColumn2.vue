<template>
  <div class = 'columnContainers'>
    <div  v-if = "visible == 1 ? true :false" class = 'myColumn columnContainer'>
      <header  class = 'myColumn_header'>
        <span class = 'title'>我的专栏</span>
      </header>
      <div  class = 'myColumn_main flexC'>
        <div class = "flexC appyColumnContainer">
          <img class = 'applyImg' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/column.png" />
          <p>申请专栏就能发表文章啦！</p>
          <router-link class = 'primay-btn' to='/select_type'><span @click="onClcik()">马上申请</span></router-link>
        </div>
      </div>
    </div>
    <articles v-if = "visible == 4 ? true : false" class = 'columnContainer'/>
    <applyPass  v-if = "visible == 3 ? true : false" class = 'columnContainer' />
    <schedule v-if = "visible == 2 ? true :false" class = 'columnContainer' :scheduleData = "scheduleData" />
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

import HbHead from 'components/HbHead';
import articles from './myColumnArticles';
import applyPass from './myColumnPass';
import schedule from './myColumnSchedule';

export default {
  components: {
    HbHead,articles,applyPass,schedule
  },
  data () {
    return {
      visible:null,
      scheduleData:{},
      loadingShow:true,
    }
  },
  mounted(){
    const that = this;
    //判断是否申请专栏
    const columnList = Lib.M.dataRequest({"userId":localStorage.getItem('kg_desk_userId')})
    Lib.M.ajax({
            'type':'post',
            'url':'/userprofile/checkProfile/',
            "data":columnList,
            'success':function (data){
              if(data.code == 10000){
                data = data.responseBody;
                if(data.userStatus == 20013){
                    that.visible = 4
                }else if(data.userStatus == 20011){
                    that.visible = 1
                }else if(data.userStatus == 20012){
                    that.visible = 3
                }else if(data.response != null){
                    that.scheduleData = data.response;
                    that.visible = 2
                }
                that.loadingShow = false;
              }else{
                that.$message({
                  message: data.message,
                  type: 'error'
                });
              }
            }
    });
  },
  methods: {
    onClcik(){
        var domId =document.getElementsByClassName("domId");
          var domX =domId[0].children[0];
          if(domId[0]!=undefined){
             domX.style.cssText='display: inline-block;background:#1d87ff;';

          }
    }
  },

}
</script>

<style scoped>
  .myColumn_main img{
  display: inline-block;
  width:222px;
  height:207px;
  margin:0 auto;
}
</style>
<style>
.columnContainers{
  width:82%;
}
.columnContainers .columnContainer{
  width:100%;
}
.myColumn_main{
  width:100%;
  height:487px;
}
.myColumn_main .flexC{
  margin:0 auto;
  justify-content: center;
  text-align: center;
}

.myColumn_main a{

}
.myColumn_main p{
  margin:24px 0px;
  font-size: 16px;
}
.applyImg{
  display: inline-block;
  width:200px;
  height:200px;
}
.appyColumnContainer{
  height:100%;
}
</style>

