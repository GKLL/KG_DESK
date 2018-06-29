<template>
  <div class="accountSafe">
      <div class="baseBox"  >
  		  <el-tabs v-model="activeName" @tab-click="handleClick" class="font16">
            <el-tab-pane label="邀请有奖" name="invite_stu/invite_award" >
              <!-- 邀请有奖 -->
              <invite-award />
              
            </el-tab-pane>
            <el-tab-pane  name="invite_stu/my_pupil">
                   <span slot="label"><span :class="{redDot:redDot}"></span> 我的徒弟</span>
                   <my-pupli/>
            </el-tab-pane>
            <el-tab-pane label="我的师傅" name="invite_stu/my_teacher">
            <my-teacher />
            </el-tab-pane>
        </el-tabs>
        <!-- <router-view/> -->
      </div>
  </div>
</template>
<script>

import Lib from 'assets/js/Lib';
import HbHead from 'components/HbHead';
import codeData from 'assets/js/phone'
import { setInterval, clearInterval } from 'timers';
import inviteAward from  './invite&stu/inviteAward.vue';
import myPupli from  './invite&stu/myPupli.vue';
import myTeacher from  './invite&stu/myTeacher.vue';



export default {
  components: {
    HbHead, inviteAward, myPupli, myTeacher
  },
  data () {
      let validatePhone = (rule, value, callback) => {
         if(value === '') {
          callback(new Error('请输入手机号'));
        } else if(!(Lib.V.validatePhone(value))){
          callback(new Error('请正确输入手机号'));
        }
        else {
          callback();
        }
      };
    return {
      activeName: 'invite_stu/invite_award',
      ruleForm: {
          phone:'',
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],         
      },
      redDot: false,
      timer: '',
    }
  },
  mounted(){
    
  },
  created () {
    let  url = window.location.href; 
    let hash = window.location.hash;
    hash = hash.split('#/')[1];
    if (hash == 'invite_stu/my_pupil/today') {
      this.activeName = 'invite_stu/my_pupil'
    }
    else if (hash == 'invite_stu/my_pupil/all') {
      this.activeName = 'invite_stu/my_pupil'
    }
    else if(hash == 'invite_stu') {
       this.activeName = 'invite_stu/invite_award';
    }
    else if (hash == 'invite_stu/invite_award') {
       this.activeName = 'invite_stu/invite_award';
    }
    else this.activeName = hash;
    // 如果url在我的徒弟列表,不显示红点
    if(url.indexOf('my_pupil') > 0) {
      this.redDot = false;
    } 
    if (localStorage.getItem('kg_desk_userId')){
      this.watchRedDot();
        if(localStorage.getItem('discipleReminder') > 0) {
          this.redDot =true;
        }
    }
    setInterval(()=> {
      if(localStorage.getItem('discipleReminder') == 0) {
        this.redDot = false
      }
    },1000)
    var tabName = localStorage.getItem('inviteTabName');
    if(tabName) {
      this.activeName = tabName
    }
    else this.activeName = 'invite_stu/invite_award'
  },
  methods: {
    watchRedDot () { // 查看是否有新的进贡消息，显示小红点
      const list = Lib.M.dataRequest({userId: localStorage.getItem('kg_desk_userId')});
      Lib.M.ajax({
        type: 'post',
        url: 'disciple/inviteRemind',
        data: list,
        'success': function (data) {
          if(data.code == 10000) {
             localStorage.setItem("discipleReminder",data.responseBody.discipleReminder);
            
          }
        }
      });
    },
    handleClick(tab, event){
      localStorage.setItem('inviteTabName', tab.name);
      localStorage.setItem('inviteTabName2', 'all');
    },
    isShowRedDot () { // 查看是否有新的进贡信息
      Lib.M.ajax({
                'type': 'post',
                'url': 'disciple/inviteRemind', 
                'data': Lib.M.dataRequest({userId: localStorage.getItem('kg_desk_userId')}),
                'success': function (data) {
                if (data.code == 10000) {
                    this.tableData = data.responseBody.data;
                    }
                else {
                    vm.$message.error(data.message);
                    }
                }
      });
    }
  }
}
</script>

<style  lang="less">
  .accountSafe{
    min-width: 850px;
    width:82%;
    margin-bottom: 50px;
    .baseBox {
      .el-tabs__header {margin: 0}
    }
  }
</style>
<style>
/* 用户旁边红色小圆点 */
.redDot{position: relative;overflow: visible;}
.redDot::after{
  content: "";
  background: red;
  position: absolute;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  left: 65px;
  top: 0px;
}
</style>
