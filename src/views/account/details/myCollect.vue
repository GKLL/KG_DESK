<template>
  <div class = 'myColumn'>
<!--     <header class = 'myColumn_header'>
  <span class = 'title'>我的收藏</span>
  <router-link class = 'primay-btn' to='/select_type'>发表文章</router-link>
</header>
 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label=" '我的收藏(' + collectTotal + ')'" name="1">
            <div v-if = "collectTotal == 0 ? false :true">
              <ul class="martop20 ">
                    <li class = 'flexR' v-for ="(item,key) in collectData" :key="key">
                      <img  v-if="item.articleImage != '' && item.articleImage != null" :src = "item.articleFrom == 1 ? imgUrl + item.articleImage : item.articleImage" class = 'cursorPointer' @click = "toDetail(item)"/>
                      <img  v-else  :src="item.defaultImage" class = 'cursorPointer' @click = "toDetail(item)"/>
                      <div class = 'flexC'>
                        <p class = 'omit2 article_tit cursorPointer'  @click = "toDetail(item)">{{item.articleTitle}}</p>
                        <p class="martop20 comtime">
                          <span>收藏于 {{item.collectDate}}</span>
                          <span @click = "cancelCollect(item,1)" class="cancel">取消收藏</span>
                        </p>
                      </div>
                    </li>
              </ul>
              <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="collectTotal">
              </el-pagination>
            </div>
            <div v-else class = 'noData'>
              <img src = 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/collect.png'/> 
              <p class = 'noData_p'>暂无数据</p>
            </div>
          </el-tab-pane>
          <el-tab-pane :label=" '我的点赞(' + likeTotal + ')'" name="2">
            <div v-if = "likeTotal == 0 ? false :true">
                <ul class="martop20 ">
                      <li class = 'flexR' v-for ="(item,key) in likeData" :key="key">
                        <img  v-if="item.articleImage != '' && item.articleImage != null" :src = "item.articleFrom == 1 ? imgUrl + item.articleImage : item.articleImage" class = 'cursorPointer' @click = "toDetail(item)"/>
                        <img  v-else  :src="item.defaultImage" class = 'cursorPointer' @click = "toDetail(item)"/>
                        <div class = 'flexC'>
                          <p class = 'omit2 article_tit cursorPointer'  @click = "toDetail(item)">{{item.articleTitle}}</p>
                          <p class="martop20 comtime">
                            <span>点赞于 {{item.collectDate}}</span>
                            <span @click = "cancelCollect(item,2)" class="cancel">取消点赞</span>
                          </p>
                        </div>
                      </li>
                </ul>
                <el-pagination
                      @current-change="handleCurrentChange2"
                      :current-page.sync="page2"
                      :page-size="20"
                      layout="total, prev, pager, next"
                      :total="likeTotal">
                </el-pagination> 
            </div>
            <div v-else class = 'noData'>
              <img src = 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/goods.png'/>
              <p class = 'noData_p'>暂无数据</p>
            </div>
          </el-tab-pane>
        </el-tabs>

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
      loadingShow:true,
       activeName:'1',
       collectData:[{}],
       likeData:[{}],
       collectTotal:'0',
       likeTotal:'0',
       moreLoading:false,
       page:1,
       page2:1,
       loadmorebtn:true,
       imgUrl:Lib.C.imgUrl,
    }
  },
  mounted(){
    //获取收藏列表
    this.getColletct(1,1)
    this.getColletct(1,2)
  },
  methods: {
    //切换标签页
    handleClick(tab, event) {
      this.activeName = tab.name;
      // this.getColletct(1,this.activeName)
    },
    //获取收藏列表、点赞列表
    getColletct(page,operType){
        const that = this;
        const currentPage = operType == 1? this.page : this.page2;
        const getColletct = Lib.M.dataRequest({
                      "userId":localStorage.getItem('kg_desk_userId'),
                      "currentPage":page,
                      "operType":operType
        })
          Lib.M.ajax({
              'type':'post',
              'url':'usercollect/getCollectAll',
              "data":getColletct,
              'success':function (data){
                  if(data.code == 10000){
                    if(operType == 1){
                     const  newdata = data.responseBody.data;
                        for(var i in newdata){
                          const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle"+ Math.round(Math.random()*32) + ".png"
                          if(newdata[i].articleImage == null || newdata[i].articleImage == ''){
                            newdata[i].defaultImage = defaultImg
                          }
                        }
                         that.collectData =newdata
                      that.collectTotal = parseInt(data.responseBody.totalNumber);
                    }else{
                        const  newdata = data.responseBody.data;
                        for(var i in newdata){
                          const defaultImg = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle"+ Math.round(Math.random()*32) + ".png"
                          if(newdata[i].articleImage == null || newdata[i].articleImage == ''){
                            newdata[i].defaultImage = defaultImg
                          }
                        }
                        that.likeData =newdata;
                        that.likeTotal = parseInt(data.responseBody.totalNumber);                    
                    }
                    that.loadingShow = false;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });
    },
    //取消收藏、取消点赞
    cancelCollect(item,num){
        const that = this;
/*        const cancelList = Lib.M.dataRequest({
          "collectId":item.columnId,
        })*/
        const page = num == 1 ? this.page : this.page2;
        const collect_list = Lib.M.dataRequest({
                "operType":num,
                "articleId":item.articleId,
                "userId":localStorage.getItem("kg_desk_userId"),
        })
        const smg = num == 1? '取消收藏成功' : '取消点赞成功'
          // Lib.M.cancelCollect(collect_list,smg)
          Lib.M.ajax({
              'type':'post',
              'url':'usercollect/deleteCollect',
              "data":collect_list,
              'success':function (data){
                  if(data.code == 10000){
                      that.$message({
                            message: smg,
                            type: 'success'
                      });   
                      that.getColletct(page,num)           
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });
    },
    //加载更多文章
    handleCurrentChange(val){
      this.page = val
      this.getColletct(val,this.activeName)
    },    
    handleCurrentChange2(val){
      this.page2 = val
      this.getColletct(val,this.activeName)
    },
    //跳转至详情页
    toDetail(item){
      Lib.M.goDetail(item)
    },
  }
}
</script>

<style scoped>
.myColumn{
  min-height: 630px;
}
.myColumn_header{
  position: relative;
}
.primay-btn{
 position: absolute;
 top:13px;
 right:20px;
}
ul{
  width:80%;

}
ul li{
  margin-bottom:35px;
}
ul .flexC{
  margin-left:23px;
    width:72%;
      justify-content: space-between;
}
ul .omit2{
  line-height: 32px;
  font-size:19px;
}
.check_status{
  margin-bottom:3px;
}
.flexR{
  margin-left: 30px;
}
.flexR img{
  display: inline-block;
    width: 157px;
    height: 102px;
}
.cancel{
  float: right;
  cursor: pointer;

}
.cancel:hover{
  color:#1d87ff;
}
.comtime{
  color:#a9a9a9;
}

.btn{
  text-align: center;
  margin-bottom: 20px;
}
.noData{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.noData img{
    display: inline-block;
    width: 260px;
    height: 210px;
    margin: 0px auto;
    margin-top:50px;
    margin-bottom:10px;
}
.noData_p{
  font-size:16px;
  color:#b2b2b2;
  text-align: center;
}
</style>
