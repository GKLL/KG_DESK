<template fullscreen>
  <div class = 'myColumn'>
    <header class = 'myColumn_header'>
      <span class = 'title'>我发表了{{articleTotal}}篇文章</span>
      <span>
          <!--发文有奖引导页面暂时没有，先隐藏-->
          <el-button type="text" @click = "publishAward = true"> 发文有奖<i class="iconfont icon-wenti-m"></i></el-button>
          <el-button @click="uploadVideo" class="dis" type = 'primary' size = 'small'>发布视频</el-button >
          <el-button @click="onClcik" class="dis" type = 'primary' size = 'small'>发表文章</el-button >
      </span>
    </header>
    <div class = 'my_articles flexC' v-loading="allLoading" >
      <el-select class = 'select_title' size = 'small' v-model="value" placeholder="全部文章" @change = "changeArticleType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <ul class = 'articles-list' >
        <li v-for ="(item, index) in articleData" :key="index">
          <div  class = 'flexR'>
            <div v-if = "item.articleImage != null && item.articleImage != '' " class = 'imgContainer'>
                <span class="articleMark" :class="'articleMark'+item.publishStatus">{{item.articleMark_txt}}</span>
                <img  :src = "item.articlefrom == 1 ? imgUrl + item.articleImage : item.articleImage" class = 'cursorPointer imgContainerHoverImg' @click = "goDetail(item)"/>
            </div>
            <div v-else class = 'imgContainer'>
                <span class="articleMark" :class="'articleMark'+item.publishStatus">{{item.articleMark_txt}}</span>
                <img  src = "../../../assets/img/article.png" class = 'cursorPointer imgContainerHoverImg' @click = "goDetail(item)"/>
            </div>
            <div class = 'flexC'>
              <p class = 'omit2 article_tit cursorPointer' @click = "goDetail(item)">{{item.articleTitle}}</p>
              <!-- <p v-if = "item.publishStatus == 2" class = 'check_status audit' >审核中</p> -->
              <!-- <p v-if = "item.publishStatus == 4 || item.publishStatus == 0"  class = 'check_status colorb2b2' >草稿</p> -->
              <!-- <p v-if = "item.publishStatus == 3"  class = 'check_status color_red' >
                <span v-if = "item.publishStatus == 3 && item.refuseReason != null"  class = 'check_status refuseReason'>未通过原因：{{item.refuseReason}}</span>
              </p> -->
              <!-- <p v-if = "item.publishStatus == 1"  class = 'check_status pass'>已通过</p> -->
              <!-- <p v-if = "item.publishStatus == 3 && item.refuseReason != null"  class = 'check_status'>原因：{{item.refuseReason}}</p> -->
              <div class = 'flexR bottom_info'>
                <span class = 'colorb2b2'>发布于 {{item.updateDate}}</span>
                <span class = 'color_red' v-if = "item.displayStatus == 3">被推荐到首页</span>
                <span class = 'color_red' v-if = "item.displayStatus == 2"> 被置顶到首页</span>
                <span class = 'colorb2b2' v-if = "item.displayStatus == 4"> 被隐藏</span>
                <span class = 'color_red' v-if = "item.publishBonusStatus == 1 && item.publishStatus == 1"> 获得发文奖励</span>
                <span class = 'color_red' v-if = "item.articleMark == 1 && item.publishStatus == 1"> 获得优质原创奖励</span>
                <!-- <span class = 'color_red' v-if = "item.publishBonusStatus == 0 && item.publishStatus == 1"> 发文奖励被冻结<span v-if = "item.publishBonusStatus == 0 && item.freezeReason && item.publishStatus == 1">，原因：{{item.freezeReason}}</span></span> -->
                <div class="action_btns">
                  <!-- 阅读奖励任何时候都可以设置 -->
                  <span  v-if = "item.publishStatus != 2" class = 'marR20 cursorPointer readawardfont' @click = "readAwardInfo(item)">阅读奖励</span> 
                  <!-- <span v-if = "item.publishStatus != 2" class = 'marR20 cursorPointer readawardfont' @click = "readAwardInfo(item)">阅读奖励</span>  -->
                  <!-- 审核中的文章不显示阅读奖励 -->
                  <!-- <span v-if = "item.publishStatus == 2" class = 'readAwardFt marR20'>阅读奖励</span> -->

                  <span v-if = "item.publishStatus == 3 || item.publishStatus == 4 || item.publishStatus == 0" class = 'marR20 cursorPointer editorBtn' @click = "editorArticle(item)">编辑</span>   
                <!-- 审核中和已通过的文章，不能再编辑 -->
                  <!-- <span v-if = "item.publishStatus == 2 || item.publishStatus == 1" class = 'marR20  editorIcon editorBtn'>编辑</span> -->

                  <!-- <span v-if = "item.publishStatus == 3 || item.publishStatus == 4 || item.publishStatus == 0" class = 'marR20 cursorPointer icon iconfont icon-bianji' @click = "editorArticle(item)"></span>   
                  <span v-if = "item.publishStatus == 2 || item.publishStatus == 1" class = 'marR20 icon iconfont icon-bianji editorIcon'></span> -->
                  <span v-if = "item.publishStatus != 2" class = 'cursorPointer deleteBtn' @click = "deleteArticle(item)"> 删除</span>     
                          <!-- 已通过的文章不能被删除 -->
                  <!-- <span v-if = "item.publishStatus == 2" class = 'deleteIcon'>删除</span> -->
                  <!-- <span v-if = "item.publishStatus != 2" class = 'cursorPointer icon iconfont icon-shanchu1' @click = "deleteArticle(item)"></span>              
                  <span v-if = "item.publishStatus == 2" class = 'icon iconfont icon-shanchu1 deleteIcon'></span> -->
                </div>
              </div>
            </div>
          </div>
              <p v-if = "item.publishStatus == 3 && item.refuseReason != null && item.refuseReason" style="margin-top:13px"  class = 'check_status color_red color_oringe' >
                <span  v-if = "item.publishStatus == 3 && item.refuseReason != null && item.refuseReason"  class = 'check_status refuseReason'>未通过原因：{{item.refuseReason}}</span>
              </p>
               <p style="margin-top:13px" class = 'color_red color_oringe' v-if = "item.publishBonusStatus == 0 && item.publishStatus == 1"> 发文奖励被冻结<span v-if = "item.publishBonusStatus == 0 && item.freezeReason && item.publishStatus == 1">，原因：{{item.freezeReason}}</span></p>
        </li>
      </ul>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="articleTotal">
      </el-pagination>
    </div>
    <read-award-info :readAward = "readAward"  :cancel = "cancelAwardInfo" :awardInfo = "awardData" :articleTitle = "articleTitle" :handleClose = "handleClose" :openAward = "openAward" :changeReadAward = "changeReadAward"
      :pauseVisible = "pauseVisible" :openVisible = "openVisible" :videoAward = "2"
    />
    <read-award :readAward = "readAward" :cancel = "cancelAwardInfo" :awardData = "awardData" :articleTitle = "articleTitle" :handleClose = "CloseAward" :tiValue = "tiValue" :getUserbalance = "getUserbalance" :getArticleAward = "getArticleAward" :videoAward = "2"/>
        <!-- 认证 -->
    <el-dialog
      :visible.sync="approveVisible"
      width="30%"
      :before-close="handleClose(this.approveVisible)">
      <p class = 'font16 approveInfo'>需通过实名认证，才能设置阅读奖励</p>
      <div class = 'approveInfo'>
        <el-button size = 'small' @click="approveVisible = false">取 消</el-button>
        <el-button size = 'small' type="primary"  @click="goApprove">去认证</el-button>      
      </div>
    </el-dialog>
    <!-- 重新 认证 -->
    <el-dialog
      :visible.sync="reApproveVisible"
      width="30%"
      :before-close="handleClose(this.reApproveVisible)">
      <p class = 'font16 approveInfo'>您的实名认证审核不通过，请重新认证</p>
      <div class = 'approveInfo'>
        <el-button size = 'small' @click="reApproveVisible = false">取 消</el-button>
        <el-button size = 'small' type="primary"  @click="goApprove">去认证</el-button>      
      </div>
    </el-dialog>
    <!-- 发文奖励规则 -->
    <el-dialog
      :visible.sync="publishAward"
      width="30%"
      :before-close="handleClose(this.publishAward)"
      :close-on-click-modal = "false"
      :lock-scroll = "false"
      class = 'publishAwardModal'
      >
      <p class = 'font16 approveInfo'>发文奖励规则</p>
      <p class = 'font16 marb5'>1.根据文章在千氪财经APP中被浏览及分享的情况，我们将给出一定的发文奖励。文章被有效浏览越多，有效分享越多，奖励越多。奖励为钛值（TV）。</p>
      <p class = 'font16 marb5'>2.每天的发文奖励将在次日凌晨零点进行结算并告知作者</p>
      <p class = 'font16 marb5'>3.发文奖励将会持续7天，7天后停止发放发文奖励</p>
      <p class = 'font16 marb5'>4.若通过但不限于技术手段等方式，恶意刷量，赚取平台奖励者，一经平台发现，将冻结奖励。冻结后该篇文章内容将无法获得发文奖励</p>
      <p class = 'font16 marb5'>5.用户在相应的文章详情页可以查看到文章所得的奖励数，该奖励数为发文奖励、读者打赏、平台对优质文章额外奖励的总和。</p>
      <p class = 'font16 marb5'>6.活动最终解释权归千氪财经所有。</p>
      <div class = 'approveInfo'>
        <el-button  @click="publishAward = false" type = 'primary' size = 'small'>知道啦</el-button>  
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

import HbHead from 'components/HbHead';
import ReadAwardInfo from 'components/ReadAwardInfo';
import ReadAward from 'components/ReadAward';
import { O_RDONLY } from 'constants';

export default {
  components: {
    HbHead,ReadAwardInfo,ReadAward
  },
  data () {
    return {
      allLoading:true,
      loadingShow:true,
      imgUrl:Lib.C.imgUrl,
      readAward:{
        visible:false,
        bonusId:"",
        articleId:"",
        lookVisible:false,
      },
      articleData:null,
      articleTotal:0,
      options: [{
          value: '0',
          label: '全部文章'
        },{
          value: '2',
          label: '审核中'
        }, {
          value: '1',
          label: '已通过'
        }, {
          value: '3',
          label: '未通过'
        },{
          value: '4',
          label: '草稿'
        }],
      article_award_status:[{
        value: 1,
        label: "获得发文奖励"
      }, {
        value: 2,
        label: "获得优质原创奖励"
      }],
      userId: '',
      value:'',
      currentPage:1,
      awardInfo:false,
      awardData:[{}],
      articleTitle:"",
      articleId:"",
      tiValue:{
        "balance":'0'
      },
      totalNumber:"0",
      approveVisible:false,
      reApproveVisible:false,

      //查看阅读奖励按钮
      pauseVisible:false,
      openVisible:false,
      publishStatus:'',
      //发文奖励弹框
      publishAward:false,
    }
  },
  methods: {
    goApprove(){
        localStorage.setItem('award_approve',2)
        Lib.M.accountSafe();
      },
    handleClose(item) {
        item = false;
    },
    getUserbalance(val){
      this.tiValue = val
    },
    changeReadAward(val){
      this.readAward.balance = val
    },
    CloseAward(){
      this.readAward.visible = false;
    },
    openAward(){
      this.readAward.visible = true;
    },
    getArticleAward(list){
      list = Lib.M.dataRequest(list);
          Lib.M.ajax({
               'type':'post',
               'url':'/articleBonus/updateBonus',
                "data":award_info,
                'success':function (data){
                          if(data.code == 10000){
                              data = data.responseBody.data;
                              if(data[0].balance != null){
                                  that.awardData = data;

                                  that.articleTitle = item.articleTitle
                                  that.awardInfo = true;
                                  that.readAward.lookVisible = true;

                              }else{
                                  that.readAward.visible = true;
                                  that.readAward.bonusId = true;
                              }

                          }else{
                               that.$message({
                                type: 'error',
                                message: data.message
                              });
                          }
                  }
            });
    },
    readAwardInfo(item){
            const that = this;
            localStorage.setItem("isSetAward",2);
            const award_info = Lib.M.dataRequest({"articleId":item.articleId})
            Lib.M.ajax({
               'type':'post',
               'url':'/articleBonus/getArticleBonus',
                "data":award_info,
                'success':function (data){
                          if(data.code == 10000){
                              data = data.responseBody.data;
                              if(data[0].balance == null){
                                  that.awardData = data;
                                  that.pauseVisible= false
                                  that.openVisible= false
                                  for(var i in data){
                                      if(data[i].bonusStatus == 1){
                                          that.pauseVisible = true
                                      }
                                      if(data[i].bonusStatus == 2){
                                        that.openVisible = true
                                      }
                                  }
                                  that.articleTitle = item.articleTitle
                                  that.readAward.articleId = item.articleId
                                  // that.readAward.balance = data[0].balance;
                                  that.awardInfo = true;
                                  that.readAward.lookVisible = true;
                              }else{
                                  // const isApprove = localStorage.getItem('kg_desk_approve');
                                  const isSet = localStorage.getItem("isSetAward");
  /*                                if(isApprove == 1){
                                        that.readAward.visible = true;
                                        that.readAward.articleId = item.articleId;
                                        that.readAward.createUser = item.createUser;
                                        that.readAward.balance = data[0].balance;
                                    // Lib.M.getUserbalance(that)
                                  }else{
                                    that.approveVisible = true;
                                  }*/
                                  function fn(){
                                        that.readAward.visible = true;
                                        that.readAward.articleId = item.articleId;
                                        that.readAward.createUser = item.createUser;
                                        that.readAward.balance = data[0].balance;
                                        that.readAward.textnum = item.textnum
                                        const textnum = that.readAward.textnum;
                                        if(textnum >1500 && textnum < 2500){
                                          that.readAward.minutes = 3
                                        }else if(textnum>2500 && textnum < 3500){
                                          that.readAward.minutes = 4
                                        }else if(textnum>3500 && textnum < 4500){
                                          that.readAward.minutes = 5
                                        }else if(textnum>4500 && textnum <= 5000){
                                          that.readAward.minutes = 6
                                        }else if(textnum < 1500){
                                          that.readAward.minutes = 2
                                        }
                                  }
                                      //调用实名认证判断方法
                                      Lib.M.isApprove(fn,that)
                                  // Lib.M.getUserbalance(that)
                              }
                          }else{
                               that.$message({
                                type: 'error',
                                message: data.message
                              });
                          }
                  }
            });
      },
      cancelAwardInfo(){
        // this.awardInfo = false;
        this.readAward.lookVisible  = false;
        // this.readAward.visible = false;
      },
      editorArticle(item){
        
        localStorage.setItem('editor_articleId',item.articleId);
        localStorage.setItem("isSetAward",1);
        // window.location.reload();
        // this.$router.push('./editor')
        // window.location.href = '../editor/list.html'
        if(item.publishKind == 1){
          window.location.href = '../editor/list.html'
        }else{
          window.location.href = '../uploadVideoEditor/list.html'
        }
      },
      deleteArticle(item){
        const that = this;
        const delete_list = Lib.M.dataRequest({"articleId":item.articleId})

        //删除文章
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'deleteMessagebox',
          type: 'warning',
          center: true,
        }).then(() => {
              Lib.M.ajax({
                    'type':'post',
                    'url':'/article/updateArticle',
                    "data":delete_list,
                    'success':function (data){
                      if(data.code == 10000){
                         that.$message({
                            type: 'success',
                            message: '删除成功!'
                          });
                      }else if(data.code == 30001){
                          that.$alert('系统检测到您还有已生效/暂停中的阅读奖励，请终止奖励规则后，再删除文章，以免对您造成资产损失', {
                            confirmButtonText: '知道了',
                            customClass:'deleteMessagebox',
                            center: true,
                            callback: action => {

                            }
                          });
                      }else{
                          that.$message({
                            type: 'error',
                            message: data.message
                          });               
                      }

                      that.getList(that.currentPage)
                    }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   
      },
      getList(page,publishStatus){
        const that= this;
/*        const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });*/
        this.allLoading = true;
        //我的文章列表
        this.userId = localStorage.getItem('kg_desk_userId');
        const articles_list = Lib.M.dataRequest({
          "currentPage":page,
          "createUser":this.userId,
          "publishStatus":this.publishStatus
        })
        Lib.M.ajax({
                'type':'post',
                'url':'/article/getuserArticleAll/',
                "data":articles_list,
                'success':function (data){
                  that.articleData = data.responseBody.data;
                  that.articleTotal = parseInt(data.responseBody.totalNumber);
                  that.loadingShow = false;
                  that.allLoading = false;
                  if(that.articleData.length != 0) {
                    that.articleData.forEach(element => {
                      if(element.publishStatus == 1) {
                        element = Object.assign(element, {articleMark_txt: '已通过'})
                      }
                      else if(element.publishStatus == 2) {
                        element = Object.assign(element, {articleMark_txt: '审核中'})
                      }
                      else if(element.publishStatus == 3) {
                        element = Object.assign(element, {articleMark_txt: '未通过'})
                      }
                      else if(element.publishStatus == 4  ) {
                        element = Object.assign(element, {articleMark_txt: '草稿'})
                      }
                      else if(element.publishStatus == 0  ) {
                        element = Object.assign(element, {articleMark_txt: '草稿'})
                      }
                    });
                  }
                  // loading.close();
            }
        });        
      },
      changeArticleType(e){
        this.publishStatus = e == 0 ? "" :e

        let articles_list = {
              "currentPage":1,
              "createUser":this.userId, 
              "publishStatus":this.publishStatus,  
        }
/*        if(e != 0){
            articles_list = {
                "currentPage":1,
                "createUser":this.userId,   
                "publishStatus":e,
          }
        }*/
        const that = this;
        articles_list = Lib.M.dataRequest(articles_list)
        Lib.M.ajax({
                'type':'post',
                'url':'/article/getuserArticleAll/',
                "data":articles_list,
                'success':function (data){
                  if(data.code == 10000){
                    that.articleData = data.responseBody.data;
                    that.articleTotal = parseInt(data.responseBody.totalNumber);
                    that.currentPage = 1;
                    if(that.articleData.length != 0) {
                      that.articleData.forEach(element => {
                        if(element.publishStatus == 1) {
                          element = Object.assign(element, {articleMark_txt: '已通过'})
                        }
                        else if(element.publishStatus == 2) {
                          element = Object.assign(element, {articleMark_txt: '审核中'})
                        }
                        else if(element.publishStatus == 3) {
                          element = Object.assign(element, {articleMark_txt: '未通过'})
                        }
                        else if(element.publishStatus == 4) {
                          element = Object.assign(element, {articleMark_txt: '草稿'})
                        }
                      });
                    }
                  }

                  // loading.close();
            }
        }); 
      },
      onClcik(){
          localStorage.setItem("isSetAward",1);
          location.href = '../publish/list.html'
      },
      uploadVideo () { // 跳转到发布视频页面
        window.location.href = '../uploadVideo/list.html'
      },
      goDetail(item){
         if(item.publishStatus == 1){
              Lib.M.goDetail(item)
         }else{
          let arr  = item.articleTagnames.split(',');
          let newArr = [{}];
          for(var i in arr){
            newArr.push({"id":i,"value":arr[i]})
          }
          newArr.splice(0,1)
              localStorage.setItem('preview_data',JSON.stringify(item))
              localStorage.setItem('preview_tag',JSON.stringify(newArr))
              localStorage.setItem('preview_article',item.articleText)
              localStorage.setItem('preview_abstract',item.articleTitle)
              localStorage.setItem('preview_publishKind',item.publishKind)
              window.open('../preview/list.html') ;
         }
      },
      handleCurrentChange(val){
          this.currentPage = val;
          this.getList(val,this.publishStatus)
      },
  },
  mounted(){
      this.getList(1,this.publishStatus)
        const isSet = localStorage.getItem("isSetAward");
  },
}
</script>

<style scoped lang="less">
.color_oringe {
  color: #FF8737 !important;
  border:  1px solid #FF8737;
  padding: 10px 19px;
  background:rgba(255,249,233,1);
  border-radius: 4px 
}
.articles-list {
  // 最后一个按钮无marR20
  .action_btns {
    span {
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  // 灰色不可点击按钮
  // .deleteIcon {
  //   width:38px;
  //   display: inline-block;
  //   height:22px; 
  //   border: 1px solid #cdcdcd;
  //   border-radius: 4px;
  //   text-align: center;
  //   line-height: 22px; 
  // }
  .deleteBtn, .readawardfont, .editorBtn {
    width:38px;
    display: inline-block;
    height:22px; 
    border: 1px solid rgba(181,181,181,1);
    border-radius: 4px;
    text-align: center;
    line-height: 22px; 
    color: #444
  }
  .readawardfont {
    width:60px;
    height:22px; 
  }
  .editorBtn:hover,  .deleteBtn:hover, .readawardfont:hover{
    background-color: #1d87ff;
    color: #fff;
    border-color: #1d87ff;
  }
}


.el-button--text{
  font-family: "\5FAE\8F6F\96C5\9ED1" !important;
  color: #606266;
  .icon-wenti-m{
    font-weight: normal;
    font-size: 18px;
  }
  &:hover {
    color: #409EFF;
  }
}
.myColumn_header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.myColumn_header .fr{
  margin-right:35px;
  margin-top:12.5px;
}
.my_articles{
  min-height: 550px;
  padding: 18px 30px 0 30px;
}
.my_articles img{
  display: inline-block;
  width:157px;
  height:102px;
}
.my_articles .imgContainer{
  display: inline-block;
  width:157px;
  height:102px;
  border:1px solid #f0f2f7;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.imgContainer .articleMark { // 文章审核状态
  position: absolute;
  background:rgba(29,135,255,1);
  color: #fff;
  font-size:12px;
  font-family:'PingFangSC-Regular' !important;
  text-align: center;
  line-height: 20px;
  top: 4px;
  left: 4px;
  width:48px;
  height:20px;
  border-radius: 10px;
  display: block; 
  z-index: 1;
}
.articleMark2 { // 文章审核中
  background:rgba(242,173,74,1) !important;
}
.articleMark3 { // 文章未通过
  background:rgba(242,76,74,1) !important;
}
.imgContainerHoverImg{
  transition: all 0.6s;
}

.imgContainer:hover .imgContainerHoverImg{
    transform: scale(1.1); 
}
.select_title{
  width:120px;
    margin-bottom:18px;
}
.dis{
    display: inline-block;
    width: 100px;
    height: 40px;
    margin-top: 7px;
    margin-right: 15px;
    font-size:14px;
}
.articles-list{
  width:100%;
}
.articles-list li{
  padding-bottom:17px;
  padding-top: 33px;
  border-bottom: 1px solid rgba(230,230,230,1);
}
.articles-list .flexC{
  margin-left:23px;
  width:74%;
    position: relative;
}
.articles-list .omit2{
    line-height: 24px;
    font-size: 16px;
    height: 46px;
}
.check_status{
  margin-bottom:3px;
  // margin-top:15px;
}
.articles-list .flexR{
  justify-content: space-between;
  line-height: 15px;
}
.bottom_info{
  position: absolute;
  bottom:0px;
  width:100%;
}
.article_award {
  position: absolute;
  bottom: 24px;
}
.approveInfo{
  text-align: center;
}
.marb5{
  margin-bottom:5px;
}
.approveInfo:nth-child(1){
  margin-bottom:20px;
}
.iconfont{
  font-weight: bold;
}
.icon-shanchu1,.readawardfont{
  color:#666;
}
.readAwardFt{
  color:#dfdfdf;
}
.icon-shanchu1:hover{
  color:#f00;
}
.icon-bianji:hover,.readawardfont:hover{
  color:#1d87ff;
}
.deleteIcon,.deleteIcon:hover,.editorIcon,.editorIcon:hover{
  color:#cdcdcd;
}

.audit{
  color:rgb(242,173,74);
}
.pass{
  color:rgb(29,135,255);
}
</style>
<style type="text/css">
  .deleteMessagebox{
    height:200px;
  }
  .el-message-box{
    height:auto!important;
    padding-bottom:30px!important;
  }
  .publishAwardModal .el-dialog__body{
    padding-top:0px;
  }
</style>
