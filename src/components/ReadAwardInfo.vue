<template>
      <div>
      <el-dialog
                :visible.sync="readAward.lookVisible"
                width="30%"
                :before-close="cancel"
                class = 'noPaddingDialog awardInfoDialog'
                center>
           <!-- <h2 class = 'color1d87 textcenter'>查看阅读奖励</h2> -->
             <div class = 'martop20 infoTitle' >
               <span class = 'omit1'>{{articleTitle}}</span>
               <div>
                    <span>阅读奖励</span>
               </div>
             </div>
             <div class = 'line'></div>
             <div class = 'awardInfoLists'>
                 <p v-for = " item in awardInfo" class = 'awardInfoList'>
                   <span>{{item.bonusTypename}}</span>
                   <span v-if = "item.bonusType == 1 ? true :false">浏览时长满{{item.browseTime}}秒</span>
                   <span v-if = "item.bonusKind == 1">奖励钛值 {{item.bonusValue}} 个/人</span>
                   <span v-if = "item.bonusKind == 2">总奖励钛值 {{item.bonusValue}}</span>
                   <span class = 'colorc5'>最大奖励人数 {{item.maxPeople}} 人</span>
                   <span class = 'color_red' v-if = "item.bonusStatus == 0">未生效</span>
                   <span class = 'color1d87' v-if = "item.bonusStatus == 1">已生效</span>
                   <span class = 'color_red' v-if = "item.bonusStatus == 2">暂停中</span>
                   <span class = 'color_red' v-if = "item.bonusStatus == 3">已终止</span>
                   <span class = 'color_red' v-if = "item.bonusStatus == 4">已结束</span> 
                 </p>
                 <p class = 'amountNum color1d87'>总计发放：{{awardInfo[0].bonusTotalValue}}钛值</p>
            </div>
             <div class = 'line'></div>
             <p class = 'martop20 color1d87 textright'>剩余奖励数：{{awardInfo[0].bonusTotalValue -awardInfo[0].bonusGetValue | toFixed3}}钛值</p>
             <span v-if = "awardInfo[0].bonusStatus != 0">若您认为此规则需要调整，可进行以下任意操作</span>
             <div class = 'flexR buttonBtn'>
                  <!-- <el-button size = 'small' class = 'martop10' v-if = "awardInfo[0].bonusStatus == 1" :loading = "pauseLoading" @click="onPause">暂停</el-button> -->
                  <el-button size = 'small' class = 'martop10' v-if = "pauseVisible" :loading = "pauseLoading" @click="onPause">暂停</el-button>
                  <el-button size = 'small' class = 'martop10' v-if = "openVisible" :loading = "openLoading" @click="onOpen">开启</el-button>
                  <el-button size = 'small' class = 'martop10' v-if = "awardInfo[0].bonusStatus != 3 && awardInfo[0].bonusStatus != 0"  :loading = "finishLoading" @click="onFinish" type="primary" >终止</el-button>
                  <el-button size = 'small' class = 'martop10' v-if = "awardInfo[0].bonusStatus == 3"  :loading = "againLoading" @click="onAgain" type="primary" >重新设置</el-button>
             </div>
        </el-dialog>
        <read-award :readAward = "readAward"  :awardData = "awardData" :articleTitle = "articleTitle" :handleClose = "handleClose" :getArticleAward = "getArticleAward" :changeTiValue = "changeTiValue"/>
      </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import ReadAward from './ReadAward';
export default {
  components: {ReadAward},
  props: {
    cancel:{
        type: Function,
        default: function () {
          
        }
    },
    awardInfo:{},
    articleTitle:{},
    readAward:{},
    openAward:{},
    awardData:{},
    changeReadAward:{},
    getArticleAward:{},
    changeTiValue:{},
    handleClose:{},
    pauseVisible:{},
    openVisible:{}
  },
  data() {
    return {
      pauseLoading:false,
      finishLoading:false,
      openLoading:false,
      againLoading:false,
      surplus:"",
      // pauseVisible:false,
    }
  },
  //已成功挂载，相当ready()
  mounted(){
    for(var i in this.awardInfo){
      if(this.awardInfo[i].bonusStatus == 1){
          this.pauseVisible = true
      }else if(this.awardInfo[i].bonusStatus == 4){
        this.pauseVisible = true
      }
      let surplus = this.awardInfo[0].bonusTotalValue - this.awardInfo[0].bonusGetValue;
      this.surplus = surplus.toFixed(2);
    }
  },
  //相关操作事件
  methods: {
       onAgain(item){
          const that = this;
          this.againLoading = true;
                  this.$confirm('', '您确定要给该篇文章重新设置阅读奖励吗？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center:true
                    }).then(() => {
                            const tivalue_list = Lib.M.dataRequest({
                                "userId":localStorage.getItem('kg_desk_userId'),
                            }) 
                            Lib.M.ajax({
                                        'type':'post',
                                        'url':'/account/selectByUserbalance',
                                        "data":tivalue_list,
                                        'success':function (data){
                                          if(data.code == 10000){
                                              data = data.responseBody.data;
                                              that.openAward()
                                              that.cancel()
                                              that.changeReadAward(data.balance)
                                              that.againLoading = false
                                          }else{
                                              me.$message({
                                                message: data.message,
                                                type: 'error'
                                              });
                                          }
                                    }
                            });
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });          
                    });
        },       
        onOpen(item){
          const that = this;
                  this.$confirm('开启后，该规则会立刻生效', '您确定要开启这条规则吗？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center:true
                    }).then(() => {
                              const list = Lib.M.dataRequest({
                                    "articleId":that.readAward.articleId,
                                    "bonusStatus":1,
                                })
                                that.openLoading = true
                                Lib.M.ajax({
                                    'type':'post',
                                    'url':'articleBonus/updateStatus',
                                    "data":list,
                                    'success':function (data){
                                      if(data.code == 10000){
                                        that.openLoading = false
                                        that.$message({
                                          message: '开启成功!',
                                          type: 'success'
                                        });
                                        that.cancel()
                                      }else{
                                        that.openLoading = false
                                        that.$message({
                                          message: data.message,
                                          type: 'error'
                                        });      
                                      }
                                  }
                                }); 
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });          
                    });
        },
        onPause(item){
          const that = this;
                  this.$confirm('暂停后，用户无法获得您的奖励，但剩余钛值依然处于冻结状态', '您确定要暂停这条规则吗？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center:true
                    }).then(() => {
                              const list = Lib.M.dataRequest({
                                    "articleId":that.readAward.articleId,
                                    "bonusStatus":2,
                                })
                                that.pauseLoading = true
                                Lib.M.ajax({
                                    'type':'post',
                                    'url':'articleBonus/updateStatus',
                                    "data":list,
                                    'success':function (data){
                                      if(data.code == 10000){
                                        that.pauseLoading = false
                                        that.$message({
                                          message: '暂停成功!',
                                          type: 'success'
                                        });
                                        that.cancel()
                                      }else{
                                        that.pauseLoading = false
                                        that.$message({
                                          message: data.message,
                                          type: 'error'
                                        });      
                                      }
                                  }
                                }); 
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });          
                    });
        },
        onFinish(){
          const that =this;
                  this.$confirm('终止后，这条规则将无法再次开启，只能重新设置奖励规则。终止成功，剩余钛值将变为可用状态', '您确定要终止这条规则吗？', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center:true
                    }).then(() => {
                              const list = Lib.M.dataRequest({
                                    "articleId":that.readAward.articleId,
                                    "bonusStatus":3,
                                })
                                that.finishLoading = true
                                Lib.M.ajax({
                                    'type':'post',
                                    'url':'articleBonus/updateStatus',
                                    "data":list,
                                    'success':function (data){
                                      if(data.code == 10000){
                                        that.finishLoading = false

                                        that.$message({
                                          message: '终止成功!',
                                          type: 'success'
                                        });
                                        that.cancel()
                                      }else{
                                        that.finishLoading = false
                                        that.$message({
                                          message: data.message,
                                          type: 'error'
                                        });      
                                      }
                                  }
                                }); 
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });          
                    });
        }
  }
}
</script>

<style scoped>
 .avatar-uploader{
  display:inline-block;
  margin-left: 30px;

}
/* .perId .avatar-uploader:first-child{
  margin-right: 15px;
} */
.perId {
  margin-bottom: 15px;
  display: inline-block;
}

.handId{
  display: inline-block;
}
.crlic{
  display: inline-block;
  width:38px;
  height:38px;
  background-image: url("../assets/img/xxx.png");
  position: absolute;
  left:38%;
  top:30%;
}
.avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 9;
      width:166px;
  height:102px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #d9d9d9!important;
  }
  .handId .avatar-uploader .avatar-uploader-icon{
     width: 166px;
    height: 138px;
    line-height: 144px;
  }
  .avatar-uploader-icon {
   
    font-size: 28px;
    color: #fff;
    width: 166px;
    height: 102px;
    line-height: 106px;
    text-align: center;
    background: #f4f4f4;
    position: relative;
    z-index: 100;
  }
.idcardContent{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.idCard{
  width:172px;
  height:106px;
}
.buttonBtn{
  justify-content: center;
  margin-top:5px;
}
.infoTitle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.infoTitle .omit1{
  width:400px;
}
.line{
  width:100%;
  height:1px;
  background:#ccc;
  margin:10px 0px;
}
.awardInfoLists{
  position: relative;
}
.amountNum{
  position: absolute;
  right:0px;
  bottom:-35px;
}
.awardInfoList{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:10px;
}
</style>
<style>
  .el-dialog{
    border-radius: 5px;
  }
 .noPaddingDialog .el-dialog--center .el-dialog__header{
  padding-top:0px;
 } 
 .noPaddingDialog .el-dialog__header{
  padding:0px;
 }
 .el-dialog__headerbtn .el-dialog__close{
  font-size:15px;
  border:1px solid #ccc;
  border-radius: 50%;
 }
 .el-dialog .el-button--small{
      padding:9px 35px;
 }


</style>
