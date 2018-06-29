<template>
  <div class=' footer'>
    <div class="container">
      <div class="keyword">
          <p>热门关键词</p>
          <div class = 'partner martop20'>
            <a @click = "toSearch(item)" v-for = "item in hotKey" class = 'cursorPointer'>{{item.keywordDesc}}</a>
          </div>
      </div>
      <div class="keyword"  v-if = "partnerShow">
        <p>合作伙伴</p>
        <div class = 'partner martop20'>
          <div class = 'partnerIcon' v-for = "item in partnerData">
                <img  :src = "item.linkName" class = 'cursorPointer iconShow' @click = "toPartner(item)"   />
                <img  :src = "item.linkIcon"  class = 'cursorPointer iconHidden' @click = "toPartner(item)" v />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      hotKey:[{}],
      partnerData:[{}],
      partnerShow:true,
    }
  },
  components: {},
  props: {
  	headfont: {
  		type: String,
  		default: '导航'
  	}
  }, 
  mounted(){
    const that = this;
    //获取热门关键词
    const hot_list = Lib.M.dataRequest({
                "secondChannel":0,
    })
    Lib.M.ajax({
              'type':'post',
              'url':'/keywords/getkeywordsAll',
              "data":hot_list,
              'success':function (data){
                if(data.code == 10000){
                  data = data.responseBody;
                  that.hotKey = data.data;
                  setTimeout(()=>{
                  },1000);          
                }else{
                    that.$message({
                        message: data.message,
                        type: 'error'
                    });
                }

          }
    });
    //获取合作伙伴
    const partner_list = Lib.M.dataRequest({
               "secondChannel":0,
    })
    this.partnerShow = false;
    Lib.M.ajax({
              'type':'post',
              'url':'/friendlylink/getfriendlyAll',
              "data":partner_list,
              'success':function (data){
                if(data.code == 10000){
                  data = data.responseBody;
                  that.partnerData = data.data;
                  that.partnerShow = true          

                  setTimeout(()=>{
                  },1000);
                }else{
                    that.$message({
                        message: data.message,
                        type: 'error'
                    });
                }

          }
    });   
  },
  //相关操作事件
  methods: {
   toPartner(item){
      window.open(item.linkAddress)
   },
   toSearch(item){
      if(item.keywordInsite == 1){
          Lib.M.goSearch(item.keywordDesc)
      }else{
          window.open(item.keywordLink)
      }
   },
    
  }
}
</script>

<style scoped>
body{
    font-family: "微软雅黑";
}
.partnerIcon{
  display: inline-block;
      margin: 0px 23px 25px 0px;
}
.partnerIcon:hover .iconHidden,.iconShow{
  display: inline-block;
}
.partnerIcon:hover .iconShow,.iconHidden{
  display: none;
}
.partnerIcon img{
   width:160px!important;
height:60px!important;
}
.footer{
  width:100%;
  background: #2d3237;
  height:auto;
  padding-bottom:50px;
  display: flex;
  position: relative;
  bottom: 0;
  margin-top:50px;
}
.keyword {
  margin-top: 20px;
  /*height:138px;*/
}
.keyword p{
    color:#fff;
    font-size:18px;

}
.partner a{
  color:#999;
margin-right: 73px;
    display: inline-block;
    width: 110px;
    margin-bottom: 5px;
}
.partner a:hover{
  color:#fff;
}
@media only screen and (max-width:375px){
  .partnerIcon{
    margin:0px 5px 0px 0px;
  }
  .partner a{
    margin-right:2px;
  }
    .partnerIcon img{
    width:107px!important;
    height:36px!important;
  }
}  
@media only screen and (max-width:320px){
  .partnerIcon{
    margin:0px;
  }
  .partnerIcon img{
    width:96px!important;
    height:35px!important;
  }
  .partner a{
    margin-right: 34px;
  }
}
</style>
<style>

</style>
