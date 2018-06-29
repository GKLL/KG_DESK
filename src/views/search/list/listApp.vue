<template>
	<div id="app" :style = "height">

    <hb-head></hb-head>
    <div class = 'container'>
      <div class = 'container_left'>
          <div class="searchnum font14 martop10">千氪为您找到含<span class = 'color_red'>“{{showValue}}”</span>的搜索结果约 {{articleTotal}} 条</div>
          <div >
              <article-list :articles="articleList" v-if = "articleList[0] != undefined" />
          </div>
          <div class="martop20 btn" v-if = "loadmorebtn">
              <el-button @click = 'loadingMore' :loading = "loading" class = 'loadingMore'>浏览更多</el-button>
          </div>

           </div>
                        <div class = 'container_right'>
                          <div class="martop10">
                            <hot-search :tags="tagList"></hot-search>
                          </div>
                          <div class="martop20">
                              <lately :words="list" :clearList = "clearList"></lately>
                          </div>
                        </div>
            </div>

                <div v-if = "loadingShow" class = 'loadingGif'>
                    <img src = '../../../assets/img/kg.gif'/>
                </div>
                    <to-top />
	</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import ArticleList from 'components/ArticleList';
import HotSearch from 'components/HotSearch';
import Lately from 'components/Lately';
import ToTop from 'components/ToTop';
export default {
  components: {HbHead,ArticleList,HotSearch,Lately,ToTop},
  data() {
    return {
      loadingShow:true,
    	height:{
    		height:document.body.clientHeight + 'px'
    	},
      articleList:[{}],
      articleTotal:"",
      searchValue:"",
      tagList:[{}],
      list:[],
      loading:false,
      show:false,
      page:1,
      showValue:"",
      loadmorebtn:false,
      showList:true,
    }
  },
  //已成功挂载，相当ready()
  mounted(){
       const that = this;
       let indexTitle = document.getElementsByTagName('title')[0];
       //查询搜索结果
        var params = Lib.M.getUrlVars(); 
       this.showValue =  decodeURI(params);
       if(localStorage.getItem('kg_searchValue_lately') == null || localStorage.getItem('kg_searchValue_lately') == ''){
          this.list = ""
       }else{
          this.list = [...new Set(JSON.parse(localStorage.getItem('kg_searchValue_lately')))];
          this.list = this.list.reverse();
       }
       indexTitle.innerHTML = this.showValue
       const search_list = Lib.M.dataRequest({"articleTitle":this.showValue,"currentPage":"1"})
       this.showList = false;
       Lib.M.ajax({
            'type':'post',
            'url':'/article/getSearchArticle/',
            "data":search_list,
            'success':function (data){

              if(data.code == 10000){
                  that.loadmorebtn = data.responseBody.totalNumber <= 20 ? false: true;
                  that.articleTotal = data.responseBody.totalNumber; 
                  data = data.responseBody.data
                  that.loadingShow = false;
                  that.showList = true;
                  let arr = [];
                  for(var i in data){
                    if(data[i].articleTagnames != null){
                       arr = data[i].articleTagnames.split(',');
                       arr = arr.slice(0,3)
                       data[i].articleTagnames = arr
                    }
                    const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle"+ Math.round(Math.random()*32) + ".png"
                    // const defaultImg = require("../../../assets/img/aticle"+ Math.round(Math.random()*32) + ".png")
                    if(data[i].articleImage == null || data[i].articleImage == ''){
                        data[i].defaultImage = defaultImg
                    }
                  }


                  that.articleList = data;
              }else{
                that.$message({
                  type:"warning",
                  message:data.message
                })
              }

            }
       });
       //查询热搜词
       const hot_list = Lib.M.dataRequest("")
       Lib.M.ajax({
            'type':'post',
            'url':'/hotsearch/selectHotAll',
            "data":hot_list,
            'success':function (data){
              if(data.code == 10000){
                that.tagList = data.responseBody.data;
              }
            }
       });
  },
  //相关操作事件
  methods: {
    loadingMore(){
      this.page += 1;
      const list = Lib.M.dataRequest({"articleTitle":this.showValue,"currentPage":this.page})
      Lib.M.loadMore('/article/getSearchArticle/',list,this.articleList,this)
    },
    clearList(){
      this.list = []
    }
  },
}
</script>

<style scoped>
.container{
  padding-top:11px;
  display: flex;
  flex-direction: row;
}
.container_left{
  width:70%;
}
.container_right{
  width:30%;
  margin-left:30px;
  display: flex;
  flex-direction: column;
}
.searchnum{
  color:#a7afbe;
}
.btn{
  text-align: center;
  margin-bottom: 20px;
}


</style>
