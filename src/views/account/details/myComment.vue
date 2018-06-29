<template>
  <div class="accountSafe">
       <header class = 'myColumn_header'>
          <span class = 'title'>我的评论</span><span>({{this.commentTotal}})</span>
        </header>
        <ul class="martop20 font16 mycomment" v-loading="allLoading">
            <li v-for="t in commentData" class="martop20" v-if = "commentShow">
                <div class="content">
                    <div class = 'omit1'>{{t.commentDesc}}</div>
                    <div @click = "onDelete(t)"><i class="iconfont del icon icon-shanchu1"></i></div>
                </div>
                <div class="time">
                    <span class = 'timer'>{{t.commentDate}}</span>
                    <div class = 'commentArticle omit1'>
                        <span class = ' sp'>评论了<span class = 'color1d87'>《</span></span>
                          <a class = 'omit1 cursorPointer' @click ="toDetail(t)">{{t.articleTitle}}</a>
                        <span  class = ' sp color1d87'>》</span>
                    </div>
                     
                    <div class = 'hideFt' v-if = 't.displayStatus == 0'>
                      <span class = 'colorb2b2'>被隐藏</span>
                           <el-tooltip class="item" effect="dark" content="也许是您的评论内容不太适合展示出来，如有疑问，请联系客服" placement="top">
                               <span   class = 'colorb2b2 icon iconfont icon-wenhao cursorPointer'></span>
                          </el-tooltip>
<!--                     <el-button v-popover:popover1>hover 激活</el-button>
  <span   class = 'colorb2b2 icon iconfont icon-wenhao cursorPointer'>
  
  </span>
  <el-popover
         ref="popover1"
    placement="top"
    width="230"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  </el-popover> -->

                    </div>
                </div>

            </li>
        </ul>
        
      <el-pagination
      v-if = "commentShow"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="commentTotal">
      </el-pagination>
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
      commentShow:false,
      allLoading:true,
      commentData:[{}],
      commentTotal:1,
      page:1
    }
  },
  methods: {
      toDetail(item){
        Lib.M.goDetail(item)
      },
      getList(page){
        const that= this;
        //我的评论列表
        const articles_list = Lib.M.dataRequest({
              "currentPage":page,
              "userId":this.userId
        }) 
        Lib.M.ajax({
                'type':'post',
                'url':'/userComment/getCommentAll/',
                "data":articles_list,
                'success':function (data){
                  that.commentData = data.responseBody.data;
                  that.commentTotal = parseInt(data.responseBody.totalNumber);
                                    that.commentShow = true;
                  that.allLoading = false;

            }
        });        
      },
      handleCurrentChange(val){
        this.page = val;
          this.getList(val)
      },
      onDelete(item){
        const that= this;
        //删除评论
        const articles_list = Lib.M.dataRequest({
              "commentId":item.commentId
        }) 
        Lib.M.ajax({
                'type':'post',
                'url':'/userComment/deleteComment/',
                "data":articles_list,
                'success':function (data){
                  if(data.code == 10000){
                      that.getList(that.page)
                      that.$message({
                            message: '删除成功',
                            type: 'success'
                      });                      
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
                }
        }); 
      },
  },
  mounted(){
    this.userId = localStorage.getItem('kg_desk_userId');
    this.getList(1)
  },
}
</script>

<style scoped>
.icon-wenhao{
  font-size:20px;
  display: inline-block;
}
.hideFt{
  margin-right:50px;
  font-size:14px;
}
.accountSafe{
  width:82%;
  min-height: 600px;
}
  .mycomment{
    padding-left: 30px;
  }
  .mycomment li {
    width:90%;
    height:76px;
    border-bottom: 1px solid #f0f0f0;
  }
  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height:30px;
  }
  .time{
    color:#bfc5cf;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .time a{
    color:#1d87ff;
    cursor: pointer;
    text-decoration:none;
  }
  .del{
    font-size:16px;
    color:#ccc;
    cursor: pointer;
  }
  .del:hover{
    color: rgb(242,76,74);
    font-weight: bold;
  }
  .timer{
    /*margin-right:150px;*/
  }
/*   .omit1{
  width:100px;
} */
.sp{
  /*width:100px;*/
}
  .commentArticle{
    width: 388px;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
</style>
