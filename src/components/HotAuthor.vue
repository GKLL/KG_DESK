<template>
        <div class = 'hot_author' v-if = "authorShow">
          <div class = 'title'>
            <div class = 'fl'>
              <i class = 'blueLine'></i>
              <span class = 'blueLine_ft fontbold font18'>热门作者</span>
            </div>
          </div>
          <swiper :slides="slides"></swiper>
        </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import Swiper from 'components/Swiper';
export default {
  data() {
    return {
      authorShow:true,
      listData:[{}],
      slides: [
        {
          src: 'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg',
          title: 'xxx1',
          columnAvatar:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg",
          list:null
        },
        {
          src: "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=eff080687bcf3bc7fc0dc5beb069d1c4/80cb39dbb6fd526658ef4071a018972bd507368a.jpg",
          title: 'xxx2',
          columnAvatar:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg",
          list:null
        },
        {
          src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510922180493&di=74e0a9b7f8bd5039d973784abe033acc&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201504%2F25%2F20150425H2215_aYsFA.jpeg",
          title: 'xxx3',
          columnAvatar:"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg",
          list:null
        },
      ],
    }
  },
  components: {Swiper},
  props: {

  },
  //已成功挂载，相当ready()
  mounted(){
    const that = this;
    const list = Lib.M.dataRequest("");
    this.authorShow = false;
    Lib.M.ajax({
            'type':'post',
            'url':'/userprofile/getUserprofile',
            'data':list,
            'success':function (data){
              data = data.responseBody.data;
              if(data.length !== 0){
                that.slides =  data
                for(var i in that.slides){
                  if(that.slides[i].list != null || that.slides[i].list != undefined){
                    that.slides[i].list = that.slides[i].list.slice(0,3)
                  }
                }
              }
              that.authorShow = true
        }
    });
  },
  //相关操作事件
  methods: {
  }
}
</script>

<style scoped>
/*热门作者*/
.hot_author .title{
  width:100%;
  height:26px;
  line-height: 26px;
}
.hot_author .title div:nth-child(1){
    display: flex;
  flex-direction: row;
}


</style>
