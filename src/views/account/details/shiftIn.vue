<template>
  <div class = 'myColumn'>
      <header class = 'myColumn_header'>
        <span class = 'title'>转入钛值</span>
        <!-- <router-link class = 'fr' to='/'>转入明细</router-link> -->
        <a class = 'fr cursorPointer' @click = "toShiftIn">转入明细</a>
      </header>
      <div class = 'table_list'>
          <div class = 'martop10'>
            <span>请将您的钛值转入此地址：</span>
            <el-input id = 'copyInput' v-model = "value" size = 'small' style = "width:300px"/>
            <el-button @click = "copy" size = 'small'>复制</el-button>
          </div>
          <div class = 'martop10'>
            <p class = 'color_red'>注意：转账时请在备注框中填写：{{userId}}，填错或不填，将无法到账！</p>
          </div>
          <div class = 'line'></div>
          <p>转入说明:</p>
          <p>1、钛值（TV）转账需要整个钛值（TV）网络进行确认，因此每笔转账需预留至少0.01个钛值在原地址，达到30个确认后您的钛值（TV）会自动充值到您的账户中。</p>         
          <p>2、您在操作钛值钱包向此地址转账时，务必填上备注信息：{{userId}},否则将无法到账。</p>
          <p>3、此地址禁止充值除钛值（TV）以外的其他任何币种，否则丢失将无法找回，责任自负。</p>
          <p>对转入钛值有疑问，您可以在线咨询客服，或拨打客服电话：{{servicePhone}}</p>
      </div>
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
     servicePhone:Lib.C.servicePhone,
     activeName: 'all',
     tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
     }],
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      value: '',
      userId:""
    }
  },
  mounted(){
    const that = this;
    const search_list = Lib.M.dataRequest("")
    //查询转入地址
       Lib.M.ajax({
            'type':'post',
            'url':'/accountFlow/TopupTimes',
            "data":search_list,
            'success':function (data){
              that.value = data.responseBody.data.txAddress;
        }
    });
       this.userId = localStorage.getItem('kg_desk_userId');
  },
  methods: {
    toShiftIn(){
      localStorage.setItem('activeName','3')
      // location.reload()
      // this.$router.push('./')
       window.location.href = '../account/details.html#/myTreasure'
    },
    copy() {
        const value=document.getElementById("copyInput");
        value.select(); 
        document.execCommand("Copy");
                        this.$message({
                          message:'复制成功',
                          type: 'success'
                        });
    },
    handleCurrentChange(){},
    shift(val){
      this.$router.push(val)
    },
  }
}
</script>

<style scoped>

.myColumn_header{
  position: relative;
}
.myColumn_header .title{
  border:0px;
}
.myColumn_header .fr{
  font-size:14px;
  margin-right:20px;
}
.table_list{
  position: relative;
  padding-left:30px;
}
.martop10 img{
  display: block;
  width:300px;
  height:300px;
}
</style>
