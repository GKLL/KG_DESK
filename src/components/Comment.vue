
<!-- 评论对话框 -->
<template>
        <div>
          <div v-if = "articleDetails.commentSet == 1">
            <h2 class = 'commentTitle'>说两句吧</h2>
            <div class="martop10 textareaContainer">
                  <el-input
                  class="textarea"
                  type="textarea"
                  :rows="4"
                  :placeholder="placeholder"
                  v-model="textarea"
                  >
                </el-input>
                <span v-if = "areaDisabled" class = 'mask'>请先<a class = 'cursorPointer color1d87 login_a' @click = "toLogin">登录</a>再进行评论</span>
            </div>
            <span class = 'sensitive' v-if = 'sensitiveShow'>检测到评论区有敏感词：{{sensitive}}</span>
            <div class="comBtn martop20">
              <div class="subbtn">
                  <el-button size = 'small' type = 'primary' @click = "addComment" :loading = "loading" :disabled = "areaDisabled" >提交评论</el-button>
              </div>
            </div>
          </div>
            <ul class="comList">
                <li v-for="(item,index) in commentList" class="martop20" :key="index"> 
                  <div class="userimg">
                    <img v-show = "item.avatar != null" :src="item.avatar" class = 'cursorPointer' @click = "toOther(item)"/>
                    <!-- <img v-if = "item.avatar != null" :src="item.avatar" class = 'cursorPointer' @click = "toOther(item)"/> -->
                    <img v-show = "item.avatar == null" src="../assets/img/avatar.png" class = 'cursorPointer' @click = "toOther(item)"/>
                    <span class = 'omit1'>{{item.userName}}</span>
                    <span>·</span>
                    <span>{{item.commentDate}}</span>
                  </div>
                  <div class="comcontent"> 
                      <p class="martop10">{{item.commentDesc}}</p>
                  </div>
                </li>
            </ul>
            <div class="more" v-if = 'loadmorebtn'>
              <div>
                <el-button :loading = 'moreLoading' @click = "LoadMore" class = 'loadingMore'>查看更多评论</el-button>
              </div>
            </div>
        </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
      textarea:'',
      commentList:[{}],
      currentPage:1,
      show:1,
      loadmorebtn:false,
      loading:false,
      moreLoading:false,
      imgUrl:Lib.C.imgUrl,
      placeholder:"",
      isLogin:true,
      areaDisabled:false,
      article_id:'',
      sensitive:'',
      sensitiveShow:false
    }
  },
  components: {},
  props: {
    articleDetails:{},
    toLogin:{},
    fromthird:{}
  },
  //已成功挂载，相当ready()
  mounted(){
    if(localStorage.getItem('kg_desk_userId') == null || localStorage.getItem('kg_desk_userId') == undefined){
        this.isLogin = false
    }else{
        this.placeholder = "我想说点什么....."
        this.isLogin = true
    }
    this.areaDisabled = localStorage.getItem('kg_desk_userId') == null ? true:false;
    let Request = new Object();
    Request = Lib.M.GetRequest();
    let url_id = Request['id'];
    url_id = url_id.split('_');
    this.article_id = Base64.decode(url_id[0]);
    this.getComment(1);

  },
  //相关操作事件
  methods: {
      toOther(item){
        const userId = localStorage.getItem('kg_desk_userId');
        if(item.userId == userId){
          window.open("../account/details.html#/myTreasure");
        }else{
          window.open('../others/list.html?other_id='+item.userId )
        }
      },
      //获取评论列表
     getComment(currentPage){
      const that = this;
        //获取评论列表        
        const comment_list = Lib.M.dataRequest({
            "articleId":this.article_id,
            "currentPage":currentPage
        })
        Lib.M.ajax({
            'type':'post',
            'url':'userComment/getCommentArtAll',
            "data":comment_list,
            'success':function (data){
              that.loadmorebtn = data.responseBody.totalNumber <= 20 ? false : true;
              data = data.responseBody.data;
              that.commentList = data;
                                that.commentList.forEach((element, index) => {
                            if(element.avatar != null && element.avatar != '') {
                                if (element.avatar.indexOf('http') == '-1') { 
                                   element = Object.assign(element, {avatar: Lib.C.imgUrl + element.avatar}) 
                                   element = Object.assign(element, {realavatar: 1}) 
                                } else {
                                    element = Object.assign(element, {avatar: element.avatar}) 
                                    element = Object.assign(element, {realavatar: null}) 
                                }
                            }
                  });
          }
        });       
    },
    //添加评论
    addComment(){
        if(!this.isLogin){
               this.$message({
                  message: '请先登录再进行评论',
                  type: 'warning'
                });
          return
        }
        if(Lib.V.validateTrimStr(this.textarea) == ''){
                this.$message({
                  message: '发表内容不能为空',
                  type: 'warning'
                });    
                return
        }else if(this.textarea.length > 500){
                this.$message({
                  message: '请输入1-500个字符',
                  type: 'warning'
                });    
                return         
        }
        const that = this;
        let Request = new Object();
        Request = Lib.M.GetRequest();
        const add_comment_list = Lib.M.dataRequest({
            "articleId":this.article_id,
            "commentDesc":this.textarea,
            "userId":localStorage.getItem('kg_desk_userId')
        })
        var textarea = document.getElementsByClassName('el-textarea__inner')[0];
        textarea.style.border = "1px solid #dcdfe6"
        this.loading = true
        that.sensitiveShow = false;
        Lib.M.ajax({
            'type':'post',
            'url':'userComment/addComment',
            "data":add_comment_list,
            'success':function (data){
              if(data.code == 10000){
                that.getComment(1)
                that.loading = false;
                that.currentPage = 1;
                that.textarea = "";
                that.$message({
                    message: that.articleDetails.commentAudit == 1 ? '评论成功，需要审核，请耐心等待' : "评论成功",
                    type: 'success'
                });          
              }else if(data.code == '29007'){
                that.sensitive = data.message;
                 that.loading = false;
                 that.sensitiveShow = true;
                 textarea.style.border = "1px solid #f00"
              }else{
                 that.loading = false;
                that.$message({
                  message: data.message,
                  type: 'error'
                });  
              }
          }
        }); 
    },
    LoadMore(){
        let Request = new Object();
        Request = Lib.M.GetRequest();
        this.currentPage +=1;
        const data = Lib.M.dataRequest({
            "articleId":this.article_id,
            "currentPage":this.currentPage
          })

        Lib.M.loadMore('userComment/getCommentArtAll',data,this.commentList,this)
    }
  }
}
</script>

<style scoped>
.sensitive{
  color:#f00;
}
.login_a{
  /*padding-bottom:5px;*/
}
.login_a:hover{
  border-bottom:1px solid #1d87ff;

}
.commentTitle{
  margin-bottom:20px;
}
.textareaContainer{
  position: relative;
  height:auto;
  overflow: hidden;
}
.mask{
    width: 100%;
    top: 0px;
    left:0px;
    height: 100%;
    line-height: 90px;
    color: #666;
    font-size: 16px;
    position: absolute;
    z-index: 200;
    background: rgba(0,0,0,0.1);
    text-align: center;
}
.omit1{
  display: inline-block;
  /*width:50px;*/
}
  .textarea{
    background: #efefef;
  }
  .comBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size:14px;
    color:#505c62;
   
    margin-bottom: 20px;
    
  }
  .subbtn{
    width:100%;
  }
  .subbtn .el-button{
    float:right;
  }
  .btn span{
      display: inline-block;
      height:20px;
      padding: 5px 20px;
      line-height:20px;
      font-size:16px;
      text-align: center;
      border: 1px solid #1d87ff;
      border-radius: 4px;
      color:#1d87ff;
      cursor: pointer;
  }
  .comBtn img  {
    width:30px;
    height:30px;
    border-radius: 15px;
    float: left;
  }
  .user span{
    display: inline-block;
    height:30px;
    line-height: 30px;
    margin-left: 20px;
    color:#1d87ff;
    font-size:16px;
  }
  .userimg{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  } 
  .userimg img{
      width:30px;
    height:30px;
    border-radius: 15px;
    float: left;
  }
  .userimg span:nth-child(2) {
    display: inline-block;
    height:30px;
    line-height: 30px;
    margin-left: 20px;
    color:#1d87ff;
    font-size:14px;
  }
  .userimg span:nth-child(3) {
    display: inline-block;
    height:30px;
    line-height: 30px;
    margin-left: 10px;
    font-size:14px;
  }
   .userimg span:last-child {
    display: inline-block;
    height:30px;
    line-height: 30px;
    margin-left: 10px;
    font-size:14px;
  }
  .comcontent{
    /*margin-left:50px; */
    font-size:14px;
    color:#666;
  }
  .comcontent p{
      display: block;
      word-break: break-all;
  }
  .comList li {
    padding-bottom: 20px;

    border-bottom: 1px dashed #efefef;
  }
  .more{
    text-align: center;
    margin: 20px 0;
    
    color:#1d87ff!important;
  }
</style>
;