/*
 * @Description: 个人中心页
 * @Author: cb
 * @Date: 2018-05-31
 * @Last Modified time: 2018-05-31 14:01:57
 */
<template>
  <section class="columnContainers">
    <!-- <header class = 'column-header'>
        <span>我的专栏</span>
    </header> -->
    <section class = 'column-main'>
      <section class = 'column-tit'>
        <span class = 'block'></span>
        <span class="fontstyle">什么是千氪专栏？</span>
      </section>
      <p class = 'column-des'>千氪专栏是为内容创作者提供创作环境与读者分析的平台。申请千氪专栏，即可在千氪发表文章，收获粉丝和文章奖励，文章质量越高，收益越多。千氪专栏旨在链接千氪、传递价值，满足优质作者的创作需求。</p>
      <section class = 'column-tit'>
        <span class = 'block'></span>
        <span  class="fontstyle">千氪专栏能为你提供</span>
      </section>
      <div class = 'column-type-content'>
        <div class = 'column-type' v-for = '(item,index) in columnType' :key = "index" >
          <img :src = 'item.img' />
          <div>
            <p>{{item.tit}}</p>
            <p>{{item.text}}</p>
          </div>
        </div>
      </div>
      <div class = 'column-btm'>
        <p>{{text}}</p>
        <el-button @click="toAuthor" type="primary">{{words}}</el-button>
      </div>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
import Lib from 'assets/js/Lib';
export default {
  data () {
    return {
      columnType:[
        {'img':require('../../../assets/img/personal/duzhe.png'),'tit':'几十万优质读者','text':'与你共同成长'},
        {'img':require('../../../assets/img/personal/yue.png'),'tit':'丰厚的文章奖励','text':'阅读、分享等交互均能带来奖励'},
        {'img':require('../../../assets/img/personal/good.png'),'tit':'官方推荐','text':'首页推荐，获得更多展示'},
        {'img':require('../../../assets/img/personal/ping.png'),'tit':'与平台共享广告收益','text':'功能将于近期上线'},
      ],
      authorUrl:Lib.C.toAuthorUrl,
      words:'',
      text:''
    }
  },
  components: {
  },
  computed: {
  },
  created(){
    // const userRole = localStorage.getItem('kg_desk_roleId');
  const that = this;
          const list = Lib.M.dataRequest({
                      "userId":localStorage.getItem('kg_desk_userId')
          })
          Lib.M.ajax({
              'type':'post',
              'url':'userprofile/getProfile',
              "data":list,
              'success':function (data){
                  if(data.code == 10000){
                    data = data.responseBody.data;
                    const userRole = data.userRole;
                   
                    if(userRole == 1){
                      that.authorUrl = Lib.C.leadUrl
                      that.words = '立即申请'
                      that.text = '快去拥有自己的千氪专栏吧'
                    }else{
                      that.authorUrl = Lib.C.toAuthorUrl
                      that.words = '前往千氪专栏'
                      that.text = ''
                    }
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          }); 
  },
  methods:{
    toAuthor(){
      window.open(this.authorUrl)
    }
  }
}
</script>

<style lang="less">
.fontstyle{
  font-family: "微软雅黑","PingFang SC", "Lantinghei SC", "Helvetica Neue", "Helvetica", "Arial", "Microsoft YaHei";
  font-weight: bold;
}
.columnContainers{
  width:82%;
}
.column-header{
  span:nth-child(1){
      padding-bottom:15px;
      border-bottom:2px solid #2382EA;
    }
}
.column-main{
  width :100%;
  height :auto;
  padding :60px 50px;
  background :#fff;
  .column-tit{
    font-size :24px;
    color :#333;
    font-weight :100;
    display :flex;
    margin-bottom :47px;
    }
    .block{
      display :inline-block;
      width :10px;
      height :10px;
      margin-top :11px;
      margin-right :17px;
      background :#1373db;
      transform :rotate(45deg);
      }
  .column-des{
    font-size :16px;
    color :#666;
    margin-bottom: 49px;
    }
}
.column-type-content{
  width:100%;
  .column-type{
    display :flex;
    float :left;
    width :410px;
    height :120px;
    border :1px solid #f0f0f0;
    margin-right :30px;
    }
    img{
      width:60px;
      height :60px;
      margin :30px 60px 0px 52px;
    }
    div{
      display :inline-block;
      margin-top :30px;
      p:nth-child(1){
        font-size: 18px;
        color :#333;
        margin-bottom: 12px;
      }
      p:nth-child(2){
        font-size: 14px;
        color :#747474;
      }
    }
  .column-type:nth-child(2),.column-type:nth-child(4){
    margin-right :0px;
  }
  .column-type:nth-child(3),.column-type:nth-child(4){
    margin-top :30px;
    margin-bottom :30px;
  }
}
.column-btm{
  width :100%;
  height :147px;
  text-align: center;
  border :1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
  .columnContainers .el-button--primary{
    width :248px;
    height: 40px;
    line-height: 0px;
    margin :0 auto;
    margin-top :15px;
    border-radius: 20px;
    background: #2382EA;
  }
  p{
    font-size: 14px;
    color :#9b9b9b;
  }
@media only screen and (max-width:1366px){
  .columnContainers{
    width:85%;
  }
  .column-type-content .column-type{
    width :398px;
  }
}

</style>
