<template>
  <div class="all">
      <el-table
        ref="singleTable"
        :data="tableData"
        style="width: 100%"
        @sort-change="sortBy"
        :default-sort = "{prop: 'income', order: 'descending'}"
        header-row-class-name ="HeaderClassName"
        v-loading="loading" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(250, 250, 250, 1)"
        >
        <el-table-column
        prop="rank"
        label="排名"
        width="100">
            <template slot-scope="scope">
                <div class="star-six" :class="'star-six'+scope.row.rank"><span>{{ scope.row.rank }}</span></div>
            </template>
        </el-table-column>
        <el-table-column
        prop="name"
        label="徒弟"
        >
        <template slot-scope="scope">
            <div class="text">
                <img v-if="scope.row.avatar" :src="scope.row.avatar" class="avatar" />
                <img v-else src="./../../../../assets/img/avatar.png" class="avatar" />
                <span class="showElipse" style="position: relative;top: 0px;left: 10px;">{{ scope.row.userName}}</span>
            </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="reConbTime"
        label="进贡时间"
        sortable="custom"
        >
            <template slot-scope="scope">
                <span>{{ scope.row.relDate }}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="income"
        label="进贡(KG)"
        sortable="custom"
       >
        </el-table-column>
        <el-table-column label=""  width="120">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
           
            @click="dialogVisible = !dialogVisible;awardHim(scope.row)">打赏TA</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="more" v-if="moreBtn"><el-button @click="getMore">加载更多</el-button></div>
     <div class="more" v-if="!moreBtn && tableData.length!=0">已到最后，无更多信息~</div>
    <el-dialog
        title="打赏Ta"
        :visible.sync="dialogVisible"
        width="490px"
        custom-class="reward"
        center
        :before-close="reset"
        >
          <div>
                <el-radio-group v-model="rewardStuParams.rewardTv" @change="changeTV">
                    <el-radio-button label=1>1TV</el-radio-button>
                    <el-radio-button label=3>3TV</el-radio-button>
                    <el-radio-button label=5>5TV</el-radio-button>
                    <el-radio-button label=10>10TV</el-radio-button>
                    <el-radio-button label=15>15TV</el-radio-button>
                    <el-radio-button label=20>20TV</el-radio-button>
                    <el-radio-button label=30>30TV</el-radio-button>
                    <el-radio-button label=50>50TV</el-radio-button>
                </el-radio-group>
            </div>
            <el-input @focus="customPay" auto-complete="off" v-model="payInput" placeholder="自定义打赏额度"></el-input>
            <input v-model="payInput" style="display:none">
            <p class="expain">说明：每人每天最多打赏一次，每次最多50TV</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">取 消</el-button>
            <el-button type="primary" @click="paySure">确 定</el-button>
        </span>
    </el-dialog>
      <div class="mask" v-if="payVisible">
        <div class="withdrawmask_info">
          <p><span>确定打赏Ta {{rewardStuParams.rewardTv.length != 0 ? rewardStuParams.rewardTv : payInput}}TV吗？</span><i class="el-icon-circle-close-outline" @click="payVisible=!payVisible;rewardStuParams.txPassword='';rewardStuParams.rewardTv='';payInput=''"></i></p>
          <el-input auto-complete="off" v-model="rewardStuParams.txPassword" type="password" placeholder="请输入交易密码"></el-input>
          <input v-model="rewardStuParams.txPassword" style="display:none">
          <p class="without">还没有交易密码，马上去<el-button @click="setting" type="text">设置</el-button></p>
          <p>
            <el-button plain  @click="payVisible =!payVisible;rewardStuParams.txPassword='';rewardStuParams.rewardTv='';payInput=''">取消</el-button>
            <el-button type="primary" @click="pay">确认</el-button>
          </p>
        </div>
      </div>
  </div>
</template>
<script>
import Base from './mixin.js';
  export default {
    mixins: [Base],
    data() {
      return {
        params: {
             userId: '',
             columnType: 1, // 累计进贡 默认按照进贡数量的降序排
            //  orderByTime:1,
             orderByContribution: 0, //1正序 0倒序
             currentPage: 1,
             pageSize: 20
        },
      }
    }
  }
</script>
<style lang="less">
.showElipse{
    display: inline-block;
    width: 120px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.all {
    .el-tabs__item:focus.is-active.is-focus:not( :active) {
        box-shadow:  0 0 2px 2px rgba(250, 250, 250, 0) inset !important;
    }
    padding-top: 10px;
    font-family: 'PingFangSC-Regular' !important;
    .el-button {
        font-family: 'PingFangSC-Regular' !important;
    }
    .el-table th>.cell{font-weight: normal;}
    .el-table thead {
        font-size:16px;
        font-family:'PingFangSC-Regular'!important;
        color:rgba(51,51,51,1);}
    .el-table .HeaderClassName{
        height: 30px;
        .cell {
            line-height: 34px;
        }
        th {
       background-color: rgba(235,237,240,1);
       padding: 0;
       &:nth-child(2) {
           .cell {text-align: left;}
       }
    }}
    .el-table tr{height: 75px;}
    .cell{line-height: 35px;text-align: center;.text{text-align: left;}}
    .el-table th.is-leaf, .el-table td{border-bottom: none;}
    .avatar {
        width: 40px;
        display: inline-block;
        height: 40px;
        border-radius: 50%;
        border: none;
    }
    .star-six1, .star-six2, .star-six3{
        &:first-child {
                width: 26px; 
                height: 22px; 
                display: inline-block;
                background: rgba(0,122,255,1);
                border-top: 2px solid rgba(6,80,160,1);
                position: relative; 
                font-size:16px;
                font-family:'PingFangSC-Semibold';
                color:rgba(255,255,255,1);
                text-align: center;
                span{
                    position: relative;
                    top: -7px;
                }
                &:after{
                    width: 0; 
                    height: 0; 
                    border-right: 13px solid transparent; 
                    border-top: 13px solid rgba(0,122,255,1); 
                    position: absolute; 
                    content: ""; 
                    top: 20px; 
                    left: 0px; 
                }
                &:before {
                    width: 0; 
                    height: 0; 
                    border-left: 13px solid transparent; 
                    border-top: 13px solid rgba(0,122,255,1); 
                    position: absolute; 
                    content: ""; 
                    top: 20px; 
                    left: 13px; 
                }
        }
    }
    .star-six2{background-color: rgba(91,169,253,1) !important;}
    .star-six2::after, .star-six2::before{ border-top: 13px solid rgba(91,169,253,1) !important; }
    .star-six3{background-color: rgba(165,208,255,1) !important;}
    .star-six3::after, .star-six3::before{ border-top: 13px solid rgba(165,208,255,1) !important; }
    .more {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 55px;
        font-size: 16px;
        color: #606266;
        font-family: 'PingFangSC-Regular' !important;
    }
}
</style>
<style lang="less" >
.reward {
.el-dialog__header{
    padding: 18px 20px 14px;
    border-bottom: 1px solid rgba(240,240,240,1);
    .el-dialog__title{line-height: 0;}
}
.el-dialog__body {
    padding: 20px 29px 30px;
    .expain{font-size: 14px;margin-top: 20px;}
    .el-radio-group {
        label {
            width: 90px;
            height: 40px;
            margin-right: 20px;
            margin-bottom: 10px;
            &:nth-child(4n){margin-right: 0;}
        }
        .el-radio-button__inner{
            border: none;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #cccccc;
            height: 100%;
            text-align: center;
        }
        .el-radio-button__orig-radio:checked+.el-radio-button__inner{
            border-color: #409EFF;
        }
    }
    .el-input{
        width:200px;
        height:40px; 
        background:rgba(244,244,244,1);
        border-radius: 4px;
        input{text-align: center; }
    }
}
.el-dialog__footer {
    padding: 0;
    padding-bottom:25px;
}
}
</style>