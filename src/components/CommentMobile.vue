
<!-- 评论对话框 -->
<template>
        <div>
          <div v-if = "articleDetails.commentSet == 1"  class="boderBotom">
            <div class="mobile_comment">
              <div class="mobile_tuijian">
                说两句吧
              </div>
              <div class="mobile_commentNum">
              {{commentList.length}}条评论
              </div>
            </div>
          </div>
            <ul class="comList">
                <li v-for="item in commentList" class="martop20"> 
                  <div class="userimg">
                    <div>
                    <img v-if = "item.avatar != null" :src="imgUrl + item.avatar" class = 'cursorPointer' @click = "toOther(item)"/>
                    <img v-else src="../assets/img/avatar.png" class = 'cursorPointer' @click = "toOther(item)"/>
                    <span class = 'cursorPointer'>{{item.userName}}</span>
                    </div>
                    <div class="userTime">{{item.commentDate}}</div>
                  </div>
                  <div class="comcontent"> 
                      <p class="martop10">{{item.commentDesc}}</p>
                  </div>
                </li>
            </ul>
            <div class="more" v-if = 'loadmorebtn'>
              <div>
                <el-button :loading = 'moreLoading' @click = "LoadMore" class = 'loadingMore' round>点我刷新</el-button>
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
      article_id:''
    }
  },
  components: {},
  props: {
    articleDetails:{},
    toLogin:{},
    isUpdate:0
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
          window.open('../account/details.html')
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
        this.loading = true
        Lib.M.ajax({
            'type':'post',
            'url':'userComment/addComment',
            "data":add_comment_list,
            'success':function (data){
              if(data.code == 10000){
                that.getComment(1)
                that.loading = false;
                that.textarea = "";
                that.$message({
                    message: that.articleDetails.commentAudit == 1 ? '评论成功，需要审核，请耐心等待' : "评论成功",
                    type: 'success'
                });          
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
/* .omit1{
  display: inline-block;
  /*width:50px;*/

  .textarea{
    background: #efefef;
    resize:none;
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
    justify-content: space-between;
    margin: 10px 20px;
  } 
  .userimg img{
    width: 32px;
    height: 32px;
    border-radius: 16px !important;
    line-height: 32px;
    vertical-align: middle;
  }
  .userTime{
    height: 32px;
    line-height: 32px;
    color: #9d9d9f;
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
    color:#232323;
    margin-left: 65px;
    margin-right:20px;
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
  .mobile_comment{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   height:36px;
   line-height:36px;
   margin: 10px 20px;
  }
  .mobile_tuijian{
    font-size:18px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    height:35px;
    line-height:35px;
    font-weight: bold;
  }
  .mobile_commentNum{
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);

  }
  .boderBotom{
    border-bottom:1px solid #DCCED1;
  }
  .loadingMore{
    background-color: #fff;
    border:1px solid #999!important;
    color:#999999;
    font-size:14px!important;
    font-family:PingFangSC-Regular;
    padding:5 30px!important;
  }
</style>
;