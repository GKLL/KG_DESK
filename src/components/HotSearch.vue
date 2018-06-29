<template>
        <div class = 'hours24'>
          <h1>
            <div class = 'fl'>
              <i class = 'blueLine'></i>
              <span class = 'blueLine_ft font18 fontbold'>热搜关键词</span>
            </div>
          </h1>
          <ul>
            <li v-for="t in tags">
                <span class = 'omit2 font14' @click = "toSearch(t)">{{t.searchwordDesc}}</span>
            </li>
          </ul>
        </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      searchValue_lately:[]
    }
  },
  components: {},
  props: {
    tags:{}
  },
  //已成功挂载，相当ready()
  mounted(){
  },
  //相关操作事件
  methods: {
    toSearch(t){
      Lib.M.goSearch(t.searchwordDesc)
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
  padding-left:10px;
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
