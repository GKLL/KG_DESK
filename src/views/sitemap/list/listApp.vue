<template>
	<div id="app">
    <ol class = 'sitemap'>
      <li v-for = "(item,key) in data" @click = "toDetail(item)" class = 'article_tit'>
            {{item.articleTitle}}
      </li>
    </ol>
      <div v-if = "loadingShow" class = 'loadingGif'>
          <img src = 'http://pro-kg-oss.oss-cn-beijing.aliyuncs.com/ico/kg.gif'/>
      </div>
	</div>
</template>
<script>
import Lib from 'assets/js/Lib';
let Base64 = require('js-base64').Base64;
export default {
  data() {
    return {
        data:[{}],
        loadingShow:true,
    }
  },
  components: {},
  //已成功挂载，相当ready()
  mounted(){
        const that = this;
          const list = Lib.M.noSignRequest({"currentPage":1,"pageSize":99999})
          Lib.M.ajax({
                'type':'post',
                'url':'/article/sitemap',
                "data":list,
                'success':function (data){
                  data = data.responseBody.data;
                  that.data = data;
                  that.loadingShow = false;
                }
          })
          
  },
  //相关操作事件
  methods: {
    toDetail(item){
      window.open(" https://www.kg.com/detail/list.html?article_id=" + Base64.encode(item.articleId));
    }
  }
}
</script>

<style scoped>
  .sitemap{
    width:50%;
    margin:0 auto;
    list-style-type:decimal!important;
  } 
  .sitemap li{
    list-style-type:decimal!important;
     list-style-position:outside;
     font-size:18px;
  } 
</style>
