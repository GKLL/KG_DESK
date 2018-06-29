<template>
        <div class = 'hours24'>
          <h1>
            <div class = 'fl'>
              <i class = 'blueLine'></i>
              <span class = 'blueLine_ft'>热门标签</span>
            </div>
          </h1>
          <ul>
            <li v-for="t in tags">
                <span class = 'omit1 font14 article_tit' @click = "toTag(t)">{{t.tagName}}</span>
            </li>
          </ul>
        </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      tags:[{}]
    }
  },
  components: {},
  props: {

  }, 
  //已成功挂载，相当ready()
  mounted(){
    //获取热门标签
      const that = this;
      const tag_list = Lib.M.dataRequest("")
      Lib.M.ajax({
            'type':'post',
            'url':'/tags/listTags',
            "data":tag_list,
            'success':function (data){
              if(data.code == 10000){
                data = data.responseBody.data;
                that.tags = data;
              }else{
                that.$message({
                  type:'error',
                  message:data.message
                })
              }
          }
        });
  },
  //相关操作事件
  methods: {
    toTag(item){
        Lib.M.goTag(item.tagName)
    },
  }
}
</script>

<style scoped>
.hours24 {
  overflow: hidden;
}
.hours24 h1{
  font-weight: 100;
  font-size:20px;
  height:26px;
  line-height: 26px;
}
.hours24 div{
  display: flex;
  flex-direction: row;
}
.hours24 a{
  color:#1d87ff;
  font-size:14px;
}
.hours24 h1 span{
  margin-right:10px;
}
.hours24 ul{
  margin-top:18px;
}
.hours24 ul li{
  float: left;
  margin-bottom:10px;
  cursor: pointer;
}
.hours24 .dot{
  display: inline-block;
  width:8px;
  height:8px;
  border-radius: 50%;
  background:#1d87ff;
  margin-top:7px;
  margin-right:8px;
  position: absolute;
}
.hours24 li p{
  display: flex;
  flex-direction: row;
  margin-bottom:10px;

}
.hours24 li span{
  margin-right:20px;
}
</style>
