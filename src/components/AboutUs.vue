<template>
        <div class="aboutus">
            <!-- <p><span class = 'cursorPointer article_tit' v-for = "item in data" @click = "toAboutUs(item)">{{item.infoName}}</span></p> -->
            <span class = 'cursorPointer article_tit'><a href = '../about/list.html' target = "_blank">关于我们</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_contact/list.html' target = "_blank">联系我们</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_state/list.html' target = "_blank">版权申明</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_register/list.html' target = "_blank">用户注册协议</a></span>
            <span class = 'cursorPointer article_tit'><a href = '../about_column/list.html' target = "_blank">专栏申请协议</a></span>
            <p>蜀ICP备18000636号-1</p>
        </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      data:[{}]
    }
  },
  components: {},
  props: {
    rightImg:{}
  },
  //已成功挂载，相当ready()
  mounted(){
      const that = this;
      const list = Lib.M.dataRequest("")
      Lib.M.ajax({
            'type':'post',
            'url':'/baseinfo/getfriendlyAll',
            "data":list,
            'success':function (data){
              data = data.responseBody.data;
              that.data = data;
          }
      }); 
  },
  //相关操作事件
  methods: {
       toAboutUs(item){
      localStorage.setItem("kg_about",item.infoType)
      window.open('../about/list.html')
   },
  }
}
</script>

<style scoped>
  .aboutus{
  border-top:1px solid #f0f2f7;
  font-size:14px;
  color:#3d4b52;
  margin-bottom:50px;
}
.aboutus span{
  display: inline-block;
  margin-right:13px;
  line-height: 26px;
}
  .aboutus p:nth-child(1){
    margin-top: 10px;
  }
</style>
