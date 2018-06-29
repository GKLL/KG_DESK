<template>
  <div class = 'myColumn'>
    <header class = 'myColumn_header'>
      <span class = 'title'>我的专栏</span>
    </header>
    <div class = 'myColumn_main flexC'>
      <div class = "flexC appyColumnContainer">
        <img  src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/pass.png"/>
        <p class = 'color1d87 letterSp5'>恭喜您，专栏申请已通过，已获得0.1TV奖励，现在可以发表文章和视频啦！</p>
        <!-- <router-link class = 'primay-btn' to='/publish'>发表文章</router-link> -->
        <div>
            <el-button @click = 'toVideo' type = 'primary' class = 'publishBtn'>发表视频</el-button>
            <el-button @click = 'toPubulish' type = 'primary' class = 'publishBtn'>发表文章</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

import HbHead from 'components/HbHead';

export default {
  components: {
    HbHead
  },
  data () {
    return {
      
    }
  },
  methods: {
    toPubulish(){
      window.location.href = "../publish/list.html"
    },
    toVideo(){
      window.location.href = '../uploadVideo/list.html'
    },
  }
}
</script>

<style scoped>
img{
  width:200px;
  height:200px;
  margin:0 auto;
}
.color1d87{
    font-family: "微软雅黑";
}
.publishBtn{
  width:120px;
  font-family: "微软雅黑";
}
.appyColumnContainer{
  height:100%;
}
</style>
