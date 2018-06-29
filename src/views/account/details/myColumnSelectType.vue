<template>
   <div class = 'myColumn'>
    <header class = 'myColumn_header flexR'>
      <span class = 'title'>我的专栏</span>
      <div class = 'schedule_title'>
        <span class = 'color1d87'>选择类型</span>
        <span class = 'schedule_line'></span>
        <span class = 'colorb2b2'>申请资料</span>
      </div>
    </header>
    <div class = 'myColumn_main flexR'>
      <div class = 'flexC cursorPointer selectType' v-for = "item in datalist">
        <i :class = 'item.icon'></i>
        <span>{{item.name}}</span>
        <p class = 'textleft selectTypefont'>{{item.brief}}</p>
        <!-- :to = "item.link" -->
        <router-link  :to="{path:item.link,query:{id:item.id}}" class = 'primay-btn' @click="onClcik(item)">选择</router-link>
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
      datalist:[
          {
            "name":'个人',
            "icon":"icon iconfont icon-icon-test colorb2b2",
            "brief":'适合财经/金融/区块链领域专家、意见领袖、评论家及自媒体人士申请',
            "link":'personal',
            "id":"2",
          },
          {
            "name":'媒体',
            "icon":"icon iconfont icon-huatong1 colorb2b2",
            "brief":'适合财经类报纸，杂志，电视，电台，通讯社或其他以生产内容为主的组织机构',
            "link":'personal',
            "id":"3",
          },
          {
            "name":'企业',
            "icon":"icon iconfont icon-icon colorb2b2",
            "brief":'适合企业、公司、分支机构，企业相关品牌，产品与服务等',
            "link":'personal',
            "id":"4",
          },
          {
            "name":'组织',
            "icon":"icon iconfont icon-zuzhijiegou colorb2b2",
            "brief":'适合各类公共场馆、公益机构、学校、社团、民间组织等机构团体',
            "link":'personal',
            "id":"5",
          },
      ],
    }
  },
  methods: {
     onClcik(item){
        var domId =document.getElementsByClassName("domId");
          var domX =domId[0].children[0];
          if(domId[0]!=undefined){
             domX.style.cssText='display: inline-block;background:#1d87ff;';

          }
    }

  }
}
</script>

<style scoped>
.schedule_line{
  background:#a7afbe;
}
.myColumn_main .flexC{
  width:174px;
}
.flexC a{
  margin-top:60px;
}
.flexC i{
  font-size:80px;
}
.flexC span{
  color:#333;
  font-size:16px;
}
.textleft{
  height:100px;
}
.iconfont{
  cursor: pointer;
}
.selectType:hover .iconfont{
  color:#1d87ff;
}
.selectTypefont{
  font-size: 14px!important;
}
</style>
