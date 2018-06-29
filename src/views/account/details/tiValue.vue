<template>
  <div class = 'myColumn tiValueContainer'>
      <header class = 'myColumn_header'>
        <span class = 'title fontbold font16'>我的可用钛值 <span style = "font-weight:100;" class = 'tv'>{{tiValue.balance}}<span>tv</span></span></span>
        <div>
          <span class = 'title fontbold font16'>冻结钛值 <span class = 'tv' style = 'font-size:20px;font-weight:100;'><span  style = "font-size:18px;">{{tiValue.frozenBalance != null ? tiValue.frozenBalance : 0}}</span><span>tv</span></span></span>
              <el-button @click = "shift('./shift_out')" type="info"  size = 'mini'  class = 'fr primay-btn1 fontbold'>转出</el-button>
              <el-button @click = "shift('./shift_in')" type="primary" size = 'mini' class = 'fr primay-btn2'>转入</el-button>     
        </div>
      </header>
      <div>
        <div class = 'myTiValue myTiValue2'>
          <p>
            <span>今日获得钛值</span>
            <span>{{tiValue.todayIncome}}tv</span>
          </p>
          <p>
            <span>今日消耗</span>
            <span>{{tiValue.reduce}}tv</span>
          </p>
          <p>
            <span>昨日获得钛值</span>
            <span>{{tiValue.beforeIncome}}tv</span>
          </p>    
          <p>
            <span>累计获得钛值</span>
            <span>{{tiValue.income}}tv</span>
          </p>
        </div>
      </div>
      <div class = 'table_list'>
        <h2 class = 'font16'>账单明细</h2>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0">
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                  header-align = "center"
                                    align ='center'
                    prop="typename"
                    label="类型"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    align ='center'
                    prop="flowDate"
                    label="时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    header-align = "center"
                    prop="flowDetail"
                    label="事由|状态">
                  </el-table-column>
                  <el-table-column
                    align ='center' 
                    label="钛值">
                    <template slot-scope="scope">
                       <p> {{ scope.row.freezeAmount == 0 || scope.row.freezeAmount == null ? scope.row.amount : scope.row.freezeAmount }}tv</p>
                       <p class="freezeColor"> {{ scope.row.freezeAmount > 0 ? "冻结中":"" }}</p>
                    </template>
                  </el-table-column>
                </el-table>
          </el-tab-pane>
          <el-tab-pane label="奖励" name="1">
              <el-table

                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    header-align = "center"
                    align ='center'
                    prop="typename"
                    label="类型"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    align ='center'
                    prop="flowDate"
                    label="时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    header-align = "center"
                    prop="flowDetail"
                    label="事由|状态">
                  </el-table-column>
                  <el-table-column
                    align ='center' 
                    label="钛值">
                    <template slot-scope="scope">
                       <p> {{ scope.row.freezeAmount == 0 || scope.row.freezeAmount == null ? scope.row.amount : scope.row.freezeAmount }}tv</p>
                       <p class="freezeColor"> {{ scope.row.freezeAmount > 0?"冻结中":"" }}</p>
                    </template>
                  </el-table-column>
                </el-table>
          </el-tab-pane>
          <el-tab-pane label="打赏" name="2">
                <el-table

                  :data="tableData"
                  style="width: 100%">
                                    <el-table-column
                  header-align = "center"
                                    align ='center'
                    prop="typename"
                    label="类型"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   align ='center'
                    prop="flowDate"
                    label="时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   header-align = "center"
                    prop="flowDetail"
                    label="事由|状态">
                  </el-table-column>
                  <el-table-column
                    align ='center' 
                    label="钛值">
                    <template slot-scope="scope">
                       <p> {{ scope.row.freezeAmount == 0 || scope.row.freezeAmount == null ? scope.row.amount : scope.row.freezeAmount }}tv</p>
                       <p class="freezeColor"> {{ scope.row.freezeAmount > 0?"冻结中":"" }}</p>
                    </template>
                  </el-table-column>
                </el-table>
          </el-tab-pane>
          <el-tab-pane label="转入" name="3">
                <el-table

                  :data="tableData"
                  style="width: 100%">
                                    <el-table-column
                  header-align = "center"
                                    align ='center'
                    prop="typename"
                    label="类型"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   align ='center'
                    prop="flowDate"
                    label="时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   header-align = "center"
                    prop="flowDetail"
                    label="事由|状态">
                  </el-table-column>
                  <el-table-column
                    align ='center' 
                    label="钛值">
                    <template slot-scope="scope">
                       <p> {{ scope.row.freezeAmount == 0 || scope.row.freezeAmount == null ? scope.row.amount : scope.row.freezeAmount }}tv</p>
                       <p class="freezeColor"> {{ scope.row.freezeAmount > 0?"冻结中":"" }}</p>
                    </template>
                  </el-table-column>
                </el-table>
          </el-tab-pane>
          <el-tab-pane label="转出" name="4">
                <el-table

                  :data="tableData"
                  style="width: 100%">
                                    <el-table-column
                  header-align = "center"
                                    align ='center'
                    prop="typename"
                    label="类型"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   align ='center'
                    prop="flowDate"
                    label="时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   align ='center'
                    prop="txAddress"
                    label="提币地址"
                    width="180">
                  </el-table-column>
                  <el-table-column
                   header-align = "center"
                    prop="flowDetail"
                    label="事由|状态">
                  </el-table-column>
                  <el-table-column
                    align ='center' 
                    label="钛值">
                    <template slot-scope="scope">
                       <p> {{ scope.row.freezeAmount == 0 || scope.row.freezeAmount == null ? scope.row.amount : scope.row.freezeAmount }}tv</p>
                       <p class="freezeColor"> {{ scope.row.freezeAmount > 0?"冻结中":"" }}</p>
                    </template>
                  </el-table-column>
                </el-table>
          </el-tab-pane>
<!--                     <el-tab-pane label="进贡" name="5">
                <el-table

                  :data="tableData"
                  style="width: 100%">
                <el-table-column
                  header-align = "center"
                align ='center'
prop="typename"
label="类型"
width="180">
                  </el-table-column>
                  <el-table-column
                   align ='center'
prop="flowDate"
label="时间"
width="180">
                  </el-table-column>
                  <el-table-column
                   header-align = "center"
prop="flowDetail"
label="事由|状态">
                  </el-table-column>
                  <el-table-column
align ='center' 
label="钛值">
<template slot-scope="scope">
   <p> {{ scope.row.freezeAmount == 0 ? scope.row.amount : scope.row.freezeAmount }}tv</p>
   <p class="freezeColor"> {{ scope.row.freezeAmount > 0?"冻结中":"" }}</p>
</template>
                  </el-table-column>
                </el-table>
          </el-tab-pane> -->
        </el-tabs>
        <div class = 'date_list'>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            :unlink-panels = "true"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            size = 'small'
            @change = "dateChange"
            >
          </el-date-picker>
          <el-button type = 'primary' size = 'small' @click = 'searchData'>查询</el-button>
        </div>
        <el-pagination
                      @current-change="handleCurrentChange"
                      :current-page.sync="page"
                      :page-size="20"
                      layout="total, prev, pager, next"
                      :total="total">
        </el-pagination> 
      </div>
      <!-- 认证 -->
      <el-dialog
      :visible.sync="approveVisible"
      width="30%"
      class = 'approveModal'
      :before-close="handleClose(this.approveVisible)">
      <p class = 'font16 approveInfo'>需通过实名认证，才能转出钛值</p>
      <div class = 'approveInfo martop20'>
        <el-button size = 'small' @click="approveVisible = false">取 消</el-button>
        <el-button size = 'small' type="primary"  @click="goApprove">去认证</el-button>      
      </div>
    </el-dialog>
    <!-- 重新 认证 -->
    <el-dialog
      :visible.sync="reApproveVisible"
      width="30%"
      class = 'approveModal'
      :before-close="handleClose(this.reApproveVisible)">
      <p class = 'font16 approveInfo'>您的实名认证审核不通过，请重新认证</p>
      <div class = 'approveInfo martop20'>
        <el-button size = 'small' @click="reApproveVisible = false">取 消</el-button>
        <el-button size = 'small' type="primary"  @click="goApprove">去认证</el-button>      
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';

export default {
  name: 'add',	
  components: {
    HbHead
  },
  data () {
    return {
      approveVisible:false,
      reApproveVisible:false,
     activeName: '0',
     tiValue:{},
     tableData: [{}],
     pickerOptions: {
    disabledDate(time) {
            return time.getTime() > Date.now();
          },
      },
      value6: '',
      value7: '',
      table_list:{},
      page:1,
      total:1,
      startTime:"",
      endTime:""
    }
  },
  mounted(){
      const that = this;
      //我的钛值信息
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
                        that.tiValue = data;
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                    }
              }
      });
      //流水信息
      this.activeName = localStorage.getItem('activeName')  == null ? '0' :  localStorage.getItem('activeName');
      this.getTableData(this.activeName,this.page)
  },
  methods: {
    goApprove(){
        localStorage.setItem('award_approve',2)
        Lib.M.accountSafe();
    },
    handleClose(item){
      item = false
    },
    getTableData(index,page){
      let list = {
          "userId":localStorage.getItem('kg_desk_userId'),
          "currentPage":page
      }

      // localStorage.setItem('activeName',tab.name)
      switch(index){
        case '0':
         list = {
              "userId":localStorage.getItem('kg_desk_userId'),
              "currentPage":page
          }
        break;
        case '1':
          list = {
              "userId":localStorage.getItem('kg_desk_userId'),
              "Type":1,
              "currentPage":page
          }
        break;        
        case '2':
          list = {
              "userId":localStorage.getItem('kg_desk_userId'),
              "Type":2,
              "currentPage":page
          }
        break;        
        case '3':
          list = {
              "userId":localStorage.getItem('kg_desk_userId'),
              "businessTypeId":10,
              "currentPage":page
          }
        break;        
        case '4':
          list = {
              "userId":localStorage.getItem('kg_desk_userId'),
              "businessTypeId":20,
              "currentPage":page
          }
        break;
        case '5':
          list = {
              "userId":localStorage.getItem('kg_desk_userId'),
               "Type":3,
              "currentPage":page
          }
        break;
        default:
      }
      if(this.startTime  != "" && this.endTime != ""){
        list.startTime  = this.startTime
        list.endTime  = this.endTime
      }
      list = Lib.M.dataRequest(list)
      const that = this;
      Lib.M.ajax({
                  'type':'post',
                  'url':'/accountFlow/selectByUserflow',
                  "data":list,
                  'success':function (data){
                    if(data.code == 10000){
                        that.total = data.responseBody.totalNumber

                        data = data.responseBody.data;
                         for(var i in data){
                          if(data[i].amount > 0){
                            data[i].amount = '+' + data[i].amount;
                          }
                        }
                        that.tableData = data;
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                    }
              }
      });       
    },
    searchData(){
        if(this.startTime == '' || this.endTime == ''){
          this.$message({
            type:"warning",
            message:'筛选日期不能为空'
          })
          return
        }
        this.getTableData(this.activeName,1)
    },
    dateChange(val){
        if(val == null){
            this.startTime = '';
            this.endTime = '';
          return
        }
      function getNowFormatDate(date) {
          // var date = new Date();
          var seperator1 = "/";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
      }
      this.startTime = getNowFormatDate(val[0])
      this.endTime = getNowFormatDate(val[1])
    },
    handleClick(tab, event) {
      localStorage.setItem('activeName',tab.index);
      this.activeName = tab.index;
      this.page = 1;
      this.getTableData(tab.index,1)
    },
    handleCurrentChange(currentPage){
      this.page = currentPage
           this.getTableData(this.activeName,currentPage)
    },
    shift(val){
      const that = this;
      function fn(){
        that.$router.push(val)
      }
      const tiValue_i = document.getElementsByClassName("tiValue")[0];
      tiValue_i.style.background = "#1d87ff";
      if(val == './shift_out'){
        Lib.M.isApprove(fn,that)
      }else{
        // localStorage.setItem('tiValue_shiftIn','1')

        this.$router.push(val)
      }
    },
  }
}
</script>

<style scoped>

.myColumn_header{
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}
.primay-btn1,.primay-btn2{
 margin-top:11px;
 margin-right:20px;
 font-size:16px;
 display: inline-block;
 font-family: "微软雅黑";
 /*height:28px;*/
}

.primay-btn1{
  background:transparent;
  border-color: #fff;

  color:#ccc;
}
.primay-btn2{

}
.myColumn_header .title{
  border:0px;
  height:auto;
}
h2{
  margin:18px 0px -7px;
  margin-left:32px;
}
.table_list{
  position: relative;
}
.date_list{
  position: absolute;
  top:30px;
  right:45px;
}

.myTiValue{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom:16px;
}
.myTiValue2{
  border-bottom:1px solid #ccc;
}
.myTiValue p{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.myTiValue p span{
  text-align: center;
  display: inline-block;
  width:100px;
  font-size:16px;
}
.myTiValue p span:nth-child(1){
  margin:18px 0px;

}
.line{
  width:85%;
  margin:0 auto;
  height:1px;
  background:#ccc;
}
.freezeColor{
  color:#999;
  font-size:12px!important;
}
.tv{
  font-size:26px;
  color:#1d87ff;
    font-family: "微软雅黑"
}
.tv span,.txbSpan{
  font-size:12px;
}
</style>
<style>
  .approveModal .el-dialog__body{
    text-align: center;
  }
  .tiValueContainer{
    /*width:82%!important;*/
  }
  .tiValueContainer .el-tabs__nav-wrap::after{
  height:1px;
}

.tiValueContainer .el-tabs__content{
  margin:0 auto;
  width:90%;
}
  .tiValueContainer .el-tabs__header{
    margin:0 auto;
    width:90%;
    padding-bottom:20px;
  }
  .tiValueContainer .el-table th{
    padding:5px 0px;
    background:#dddfe1;
  }
.tiValueContainer .el-tabs__item.is-active{
   color:#409EFF!important
}
.tiValueContainer .el-date-editor--daterange.el-input__inner{
  width:240px!important;
}
.tiValueContainer .el-date-editor .el-range-input{
  width:34%;
}
</style>
