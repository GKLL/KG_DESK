<template>
    <div>
      <el-dialog
        class = 'readAward'
        :visible.sync="readAward.visible"
        width="50%"
              :close-on-click-modal = "false"
      :lock-scroll = "false"
        :before-close="handleClose">
        <h2 class = 'color1d87 textcenter'>{{videoAward == 1 ? '设置阅读奖励' : '设置浏览奖励'}}</h2>
     <div class = 'myColumn_main myColumn_noLeft readAwardmodal'>
        <el-alert
          class = 'martop5'
          title="您可以选择以下一种或多种方式进行奖励"
          type="warning"
          close-text="知道了"
          v-if = "firstAward"
          >
        </el-alert>
        <el-form :inline="true" ref="form"  :model="form" :rules="rules" size = 'small'>
          <p class = 'account_tivalue'>当前您账户中的钛值:<span  class = 'color_red'>{{readAward.balance}}</span><span  class = 'color_red'></span></p>
          <div class = 'line'></div>
                <el-radio-group v-if = "hideRandom"  @change = "browseRadioChang" v-model="form.browseRadio" class = 'martop20'>
                  <el-radio :label="110">普通奖励</el-radio>
                  <el-radio :label="111">随机奖励</el-radio>
                </el-radio-group><br v-if = "hideRandom"/>
          <!-- 浏览 -->
          <el-form-item label=""   class = 'martop15'>
              <el-checkbox  @change = "onChange('browse')" v-model = "form.browseChecked" name="type"  class="checkbox_el el-input" >
                {{videoAward == 1 ? '首次浏览文章' : '首次浏览'}} 
              </el-checkbox>
              <span v-popover:popover1 class = 'icon iconfont icon-wenhao cursorPointer'>
                  <el-popover
                    ref="popover1"
                    placement="top"
                    title="为什么只有首次浏览？"
                    width="200"
                    trigger="hover"
                    :content="videoAward == 1 ? '一是为防止读者恶意刷文，获取您给予的奖励；二是确保您的文章在有奖励的情况下，得到有效阅读量。':'一是为防止读者恶意刷，获取您给予的奖励；二是确保您的视频在有奖励的情况下，得到有效浏览量。'">
                  </el-popover>
              </span>
          </el-form-item><br/>

          <el-form-item label="浏览时长满" prop = 'browseTime' class = 'ml25'>
            <el-input v-model="form.browseTime" :disabled = "form.browse"  type="text" class="el-input"></el-input>
            <span class = 'marlr'>秒</span>
          </el-form-item>
          <el-form-item :label="form.browseRadio == 110 ?'奖励钛值' : '总奖励钛值'" prop = 'browseAward'>
            <el-input v-model="form.browseAward"  :disabled = "form.browse" class="el-input"></el-input>
            <span class = 'marlr'>{{form.browseRadio == 110 ? '个/人' : 'TV'}}</span>
          </el-form-item>
          <el-form-item label="最大奖励人数" prop = 'browseMaxAward'>
            <el-input v-model="form.browseMaxAward" :disabled = "form.browse" class="el-input" @blur = "otherInputChange('form','browseAward')"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div class = 'articlenum ml25 colorb2b2' v-if = "readAward.textnum == 0 ? false : true && videoAward == 1">您的文章有{{this.readAward.textnum}}字，正常阅读完约<span class = 'color_red'>{{this.readAward.minutes}}</span>分钟，建议您设置为{{this.readAward.minutes}}分钟以上，以保证文章内容被有效获知</div>
          <div v-if = "videoAward == 2" class = 'articlenum ml25 colorb2b2'>请根据您的视频时长来设置您的浏览时长</div>
          <!-- 点赞 -->
          <el-form-item label=""   class = 'martop15'>
              <el-checkbox @change = "onChange('like')"  v-model = "form.likeChecked" name="type"  class="checkbox_el el-input" >
                {{videoAward == 1 ? '首次点赞' : '首次点赞'}}
                </el-checkbox>
                <span v-popover:popover2 class = 'icon iconfont icon-wenhao cursorPointer'>
                  <el-popover
                    ref="popover2"
                    placement="top"
                    title="为什么只有首次点赞？"
                    width="200"
                    trigger="hover"
                    :content="videoAward == 1 ? '首次点赞给奖励可以规避一个读者对您的某篇文章进行多次点赞，从而反复获得奖励的情况。':'首次点赞给奖励可以规避一个读者对您的某篇视频进行多次点赞，从而反复获得奖励的情况。' ">
                  </el-popover>
                </span>
          </el-form-item><br/>
<!--                 <el-radio-group  v-if = "hideRandom" :disabled = "form.like" @change = "likeRadioChang" v-model="form.likeRadio" class = 'ml25'>
  <el-radio :label="210">普通奖励</el-radio>
  <el-radio :label="211">随机奖励</el-radio>
</el-radio-group><br v-if = "hideRandom"/> -->
          <el-form-item :label="form.browseRadio == 110 ?'奖励钛值' : '总奖励钛值'"  prop = 'likeAward' class = 'ml25'>
            <el-input v-model="form.likeAward"  :disabled = "form.like" class="el-input"></el-input>
            <span class = 'marlr'>{{form.browseRadio == 110 ? '个/人' : 'TV'}}</span>
          </el-form-item>
          <el-form-item label="最大奖励人数" prop ='likeMaxAward'>
            <el-input v-model="form.likeMaxAward" :disabled = "form.like" class="el-input"  @blur = "otherInputChange('form','likeAward')"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div  class = 'ml25 colorb2b2 articlenum' v-if = "videoAward == 1">为确保您的文章点赞数有效累加，我们规定了其他用户<span  class = 'color_red'>首次点赞成功</span>时才能获得您的奖励。这个规则不合理？可以给我们反馈</div>
          <div  class = 'ml25 colorb2b2 articlenum' v-else>为确保您的点赞数有效累加，我们规定了其他用户<span  class = 'color_red'>首次点赞成功</span>时才能获得您的奖励。</div>
          <!-- 收藏 -->
          <el-form-item label=""  class = 'martop15'>
              <el-checkbox  @change = "onChange('collect')"  v-model = "form.collectChecked" name="type"  class="checkbox_el el-input" >
                {{videoAward == 1 ? '首次收藏文章' : '首次收藏'}}
                </el-checkbox>
                <span v-popover:popover3 class = 'icon iconfont icon-wenhao cursorPointer'>
                  <el-popover
                    ref="popover3"
                    placement="top"
                    title="为什么只有首次收藏？"
                    width="200"
                    trigger="hover"
                    :content="videoAward == 1 ? '首次收藏给奖励可以规避一个读者对您的某篇文章进行多次收藏，从而反复获得奖励的情况。' :'首次收藏给奖励可以规避一个读者对您的某篇视频进行多次收藏，从而反复获得奖励的情况。'">
                  </el-popover>
                </span>
          </el-form-item><br/>
<!--                 <el-radio-group  v-if = "hideRandom" :disabled = "form.collect" @change = "collectRadioChang" v-model="form.collectRadio" class = 'ml25'>
  <el-radio :label="310">普通奖励</el-radio>
  <el-radio :label="311">随机奖励</el-radio>
</el-radio-group><br v-if = "hideRandom"/> -->
          <el-form-item :label="form.browseRadio == 110 ?'奖励钛值' : '总奖励钛值'" prop = 'collectAward'  class = 'ml25'>
            <el-input v-model="form.collectAward" :disabled = "form.collect" class="el-input"></el-input>
            <span class = 'marlr'>{{form.browseRadio == 110 ? '个/人' : 'TV'}}</span>
          </el-form-item>
          <el-form-item label="最大奖励人数" prop = 'collectMaxAward'>
            <el-input v-model="form.collectMaxAward" :disabled = "form.collect" class="el-input"  @blur = "otherInputChange('form','collectAward')"></el-input>
            <span class = 'marlr'>人</span>
          </el-form-item>
          <div  class = 'ml25 colorb2b2 articlenum' v-if = "videoAward == 1">为确保您的文章收藏数有效累加，我们规定了其他用户<span  class = 'color_red'>首次收藏成功</span>时才能获得您的奖励。这个规则不合理？可以给我们反馈</div>
          <div  class = 'ml25 colorb2b2 articlenum' v-else>为确保您的收藏数有效累加，我们规定了其他用户<span  class = 'color_red'>首次收藏成功</span>时才能获得您的奖励。</div>
          <!-- 分享 -->
          <el-form-item label="" class = 'martop15'>
              <el-checkbox  @change = "onChange('share')" v-model = "form.shareChecked" name="type"  class="checkbox_el el-input" >
                {{videoAward == 1 ? '首次分享文章' : '首次分享'}}
                </el-checkbox>
                <span v-popover:popover4 class = 'icon iconfont icon-wenhao cursorPointer'>
                  <el-popover
                    ref="popover4"
                    placement="top"
                    title="为什么只有首次分享？"
                    width="200"
                    trigger="hover"
                    :content="videoAward == 1 ? '读者首次分享您的文章，主动性和有效性更强，分享后带来的浏览量转化率也更高。同时，我们也规定了读者首次分享您的文章至微信或微博后，必须有人打开分享的链接，在微信或微博内阅读您的文章，才能最终获得您给予的奖励。这也保证了您的文章转发率真实有效。':'读者首次分享您的视频，主动性和有效性更强，分享后带来的浏览量转化率也更高。同时，我们也规定了读者首次分享您的视频至微信或微博后，必须有人打开分享的链接，在微信或微博内浏览您的视频，才能最终获得您给予的奖励。这也保证了您的视频转发率真实有效。'">
                  </el-popover>
                </span>
          </el-form-item><br />
<!--                 <el-radio-group  v-if = "hideRandom"  :disabled = "form.radioDisabled" @change = "shareAwardRadioChang" v-model="form.shareAwardRadio" class = 'ml25'>
  <el-radio :label="410">普通奖励</el-radio>
  <el-radio :label="411">随机奖励</el-radio>
</el-radio-group><br v-if = "hideRandom"/> -->
          <el-form-item  class = 'ml25'>
                <el-radio-group :disabled = "form.radioDisabled" @change = "radioChang" v-model="form.shareRadio">
                  <el-radio :label="41">首次分享成功至微信或微博</el-radio>
                  <el-radio :label="42">首次分享成功至微信</el-radio>
                  <el-radio :label="43">首次分享成功至微博</el-radio>
                </el-radio-group>
          </el-form-item><br/>
          <div class = 'martop-6'>
              <el-form-item :label="form.browseRadio == 110 ?'奖励钛值' : '总奖励钛值'" prop="shareAward"  class = 'ml25'>
                <el-input v-model="form.shareAward"  :disabled = "form.share" class="el-input"></el-input>
                <span class = 'marlr'>{{form.browseRadio == 110 ? '个/人' : 'TV'}}</span>
              </el-form-item>
              <el-form-item label="最大奖励人数" prop="shareMaxAward">
                <el-input v-model="form.shareMaxAward" :disabled = "form.share" class="el-input"  @blur = "otherInputChange('form','shareAward')"></el-input>
                <span class = 'marlr'>人</span>
              </el-form-item>
              <div  class = 'ml25 colorb2b2 articlenum' v-if = "videoAward == 1">分享成功：用户将文章分享到微信或微博后，他人在微信或微博内成功打开了这篇文章，即视为该用户分享成功</div>   
              <div  class = 'ml25 colorb2b2 articlenum' v-else>分享成功：用户将视频分享到微信或微博后，他人在微信或微博内成功打开了这篇文章，即视为该用户分享成功</div>   

              <div class = 'line'></div>
                <div  class = 'ml25 colorb2b2 martop15' v-if = "videoAward == 1">说明：您设置的奖励规则提交成功会立即生效，在文章审核中与审核通过两种状态</div>
                <div  class = 'ml25 colorb2b2 martop15' v-else>说明：您设置的奖励规则提交成功会立即生效，在审核中与审核通过两种状态</div>
          </div>
<!-- 

          <el-form-item>
            <div class="btn">
            <el-button  type="primary" @click="onSubmit('form')" class="ml20 ml30">确认提交</el-button>
            <el-button    class="ml20 ml30">存草稿</el-button>
            </div>
          </el-form-item> -->
      </el-form>

    </div>
        <span slot="footer" class="dialog-footer">
          <el-button :loading = "draftLoading" @click="handleClose">取消</el-button>
          <el-button :loading = "creatLoading" @click="onSubmit('form')" type="primary" >保存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>

import Lib from 'assets/js/Lib';

export default {
  components: {
  },
  props:{
    readAward:{},
    handleClose:{},
    getArticleAward:{},
    tiValue:{},
    videoAward:{}
  },
  data () {
      var validateTime = (rule, value, callback) => {
        if (this.browseChecked && value === '') {
          callback(new Error('请输入浏览时长'));
        }else if(this.browseChecked && (value > 300 || value < 10)){
          callback(new Error('浏览时长需10-300秒之间'));
        }else if(this.browseChecked && !Lib.V.validateInteger(value)){
          callback(new Error('浏览时长需输入正整数'));
        }else {
          callback();
        }
      };        
      var validateMaxAward1 = (rule, value, callback) => {
        if (this.browseChecked &&value === '') {
          callback(new Error('请输入奖励人数'));
        }else if(this.browseChecked &&!Lib.V.validateInteger(value)){
          callback(new Error('奖励人数需输入正整数'));
        }else {
          callback();
        }
      };
      var validateAward1 = (rule, value, callback) => {
        if (this.browseChecked &&value === '') {
          callback(new Error('请输入奖励钛值'));
        }else if(this.browseChecked && !Lib.V.validatePosNum(value)){
           callback(new Error('奖励钛值需为数字'));
        }else if(this.browseChecked && value < 0.001 ){
          callback(new Error('奖励钛值需大于0.001'));
        }else if(this.form.browseRadio != 110 && this.form.browseMaxAward != '' && (value/this.form.browseMaxAward < 0.001)){
          callback(new Error('每人可获取的钛值不可低于0.001TV，请重新填写金额'))
        }else {
          callback();
        }
      };
      var validateMaxAward2 = (rule, value, callback) => {
        if (this.likeChecked &&value === '') {
          callback(new Error('请输入奖励人数'));
        }else if(this.likeChecked &&!Lib.V.validateInteger(value)){
          callback(new Error('奖励人数需输入正整数'));
        }else {
          callback();
        }
      };
      var validateAward2 = (rule, value, callback) => {
        if (this.likeChecked &&value === '') {
          callback(new Error('请输入奖励钛值'));
        }else if(this.likeChecked && !Lib.V.validatePosNum(value)){
           callback(new Error('奖励钛值需为数字'));
        }else if(this.likeChecked && value < 0.001){
          callback(new Error('奖励钛值需大于0.001'));
        }else if(this.form.browseRadio != 110 && this.form.likeMaxAward != '' && (value/this.form.likeMaxAward < 0.001)){
          callback(new Error('每人可获取的钛值不可低于0.001TV，请重新填写金额'))
        }else {
          callback();
        }
      };
      var validateMaxAward3 = (rule, value, callback) => {
        if (this.collectChecked &&value === '') {
          callback(new Error('请输入奖励人数'));
        }else if(this.collectChecked &&!Lib.V.validateInteger(value)){
          callback(new Error('奖励人数需输入正整数'));
        }else {
          callback();
        }
      };
      var validateAward3 = (rule, value, callback) => {
        if (this.collectChecked &&value === '') {
          callback(new Error('请输入奖励钛值'));
        }else if(this.collectChecked && !Lib.V.validatePosNum(value)){
           callback(new Error('奖励钛值需为数字'));
        }else if(this.collectChecked && value < 0.001 ){
          callback(new Error('奖励钛值需大于0.001'));
        }else if(this.form.browseRadio != 110 && this.form.collectMaxAward != '' && (value/this.form.collectMaxAward < 0.001)){
          callback(new Error('每人可获取的钛值不可低于0.001TV，请重新填写金额'))
        }else {
          callback();
        }
      };
      var validateMaxAward4 = (rule, value, callback) => {
        if (this.shareChecked && this.form.shareRadio != null && value === '') {
          callback(new Error('请输入奖励人数'));
        }else if(this.shareChecked && this.form.shareRadio != null && !Lib.V.validateInteger(value)){
          callback(new Error('奖励人数需输入正整数'));
        }else {
          callback();
        }
      };
      var validateAward4 = (rule, value, callback) => {
        if (this.shareChecked && this.form.shareRadio != null && value === '') {
          callback(new Error('请输入奖励钛值'));
        }else if(this.shareChecked && this.form.shareRadio != null && !Lib.V.validatePosNum(value)){
           callback(new Error('奖励钛值需为数字'));
        }else if(this.shareChecked && this.form.shareRadio != null && value < 0.001 ){
          callback(new Error('奖励钛值需大于0.001'));
        }else if(this.form.browseRadio != 110 && this.form.shareMaxAward != '' && (value/this.form.shareMaxAward < 0.001)){
          callback(new Error('每人可获取的钛值不可低于0.001TV，请重新填写金额'))
        }else {
          callback();
        }
      };


    return {
        minutes:"",
        form: {
              //浏览
              browse:true,
              browseChecked:false,
              browseTime:"",
              browseAward:"",
              browseMaxAward:"",
              browseRadio:110,
              //点赞
              like:true,
              likeChecked:false,
              likeAward:"",
              likeMaxAward:"",
              likeRadio:210,
              //收藏
              collect:true,
              collectChecked:false,
              collectAward:"",
              collectMaxAward:"",
              collectRadio:310,
              //分享
              radioDisabled:true,
              share:true,
              shareChecked:false,
              shareAwardRadio:410,
              shareRadio:null,
              shareAward:"",
              shareMaxAward:"",
        },
        rules: {
            browseTime: [
              { validator: validateTime, trigger: 'blur' }
            ],
            browseMaxAward: [
              { validator: validateMaxAward1, trigger: 'blur' }
            ],
            browseAward: [
              {validator: validateAward1, trigger: 'blur' }
            ],      


            likeMaxAward: [
              { validator: validateMaxAward2, trigger: 'blur' }
            ],
            likeAward: [
              { validator: validateAward2, trigger: 'blur' }
            ],      


            collectMaxAward: [
              { validator: validateMaxAward3, trigger: 'blur' }
            ],
            collectAward: [
              { validator: validateAward3, trigger: 'blur' }
            ],       


            shareMaxAward: [
              {validator: validateMaxAward4, trigger: 'blur' }
            ],
            shareAward: [
              {validator: validateAward4, trigger: 'blur' }
            ],
        },
        id:'',
        creatLoading:false,
        draftLoading:false,
        firstAward:0,
        hideRandom:true
    }
  },
  mounted(){
      const isSet = localStorage.getItem("isSetAward");
      const userId = localStorage.getItem("kg_desk_userId");
      // this.hideRandom = userId == Lib.C.userId ? true :false;
      const firstAward = localStorage.getItem('kg_desk_readAward') == 1 ? false : true;
  },
  methods: {
    handleCancel(){
       this.form.browseRadio = 110;
      this.handleClose();
      this.$refs['form'].resetFields();
    },
    otherInputChange(form,award){
      const me = this;
          me.$refs[form].validateField(award,(award) => {
            if(award == ""){

            }else{
              return false
            }
          }); 
    },
    likeRadioChang(){},
    collectRadioChang(){},
    shareAwardRadioChang(){},
    browseRadioChang(val){
    this.$refs['form'].resetFields();

    },
    onSubmit(form) {
      const that = this;
      this.$refs[form].validate((valid) => {
          if (valid) {
            let award_list = [{}];
            const bonusKind = this.form.browseRadio == 110 ? 1 : 2;
            let totalAccount =  Number(totalAccount);
            function toNumber(value){
                value = Number(value);
                return value.toFixed(3)
            }
            if(bonusKind == 2){
                totalAccount = parseFloat(toNumber(this.form.browseAward)) + parseFloat(toNumber(this.form.likeAward)) + parseFloat(toNumber(this.form.collectAward)) + parseFloat(toNumber(this.form.shareAward));
            }else{
              totalAccount = this.form.browseMaxAward * this.form.browseAward + this.form.likeMaxAward * this.form.likeAward+ this.form.collectMaxAward *this.form.collectAward +this.form.shareMaxAward *this.form.shareAward;
            }
            totalAccount = totalAccount
            if(totalAccount > parseFloat(this.readAward.balance)){
              this.$message({
                type:"warning",
                message:"奖励额度大于当前账户余额"
              })
              this.creatLoading = false;
              return
            }

            if(this.form.browseChecked){
              award_list.push({
                  "bonusType":1,
                  "bonusSecondType":0,
                  "browseTime":this.form.browseTime,
                  "maxPeople":this.form.browseMaxAward,
                  "bonusValue": this.form.browseAward,
                  "bonusStatus":1,
                  "bonusKind":bonusKind
              })
            }
            if(this.form.likeChecked){
              award_list.push({
                  "bonusType":2,
                  "bonusSecondType":0,
                  "maxPeople":this.form.likeMaxAward,
                  "bonusValue":this.form.likeAward,
                  "bonusStatus":1,
                  "bonusKind":bonusKind
              })           
            }
            if(this.form.collectChecked){
              award_list.push({
                  "bonusType":3,
                  "bonusSecondType":0,
                  "maxPeople":this.form.collectMaxAward,
                  "bonusValue":this.form.collectAward,
                  "bonusStatus":1,
                  "bonusKind":bonusKind
              })           
            }
            if(this.form.shareChecked && this.form.shareRadio != null){
              award_list.push({
                  "bonusType":4,
                  "bonusSecondType":this.form.shareRadio,
                  "maxPeople":this.form.shareMaxAward,
                  "bonusValue":this.form.shareAward,
                  "bonusStatus":1,
                  "bonusKind":bonusKind
              })           
            }
            award_list.splice(0,1);
            this.creatLoading = true;
            const isSet = localStorage.getItem("isSetAward");
            if(isSet == 2){
              const editorAwardList = Lib.M.dataRequest({
                "articleId":this.readAward.articleId,
                "createUser":localStorage.getItem('kg_desk_userId'),
                "list":award_list
              })

                  const tivalue_list = Lib.M.dataRequest({
                          "userId":localStorage.getItem('kg_desk_userId'),
                  })
                   localStorage.setItem("isSetAward",1); 
                  Lib.M.ajax({
                                  'type':'post',
                                  'url':'/account/selectByUserbalance',
                                  "data":tivalue_list,
                                  'success':function (data){
                                    if(data.code == 10000){
                                        data = data.responseBody.data;
                                        // that.getUserbalance(data[0])
                                                          Lib.M.ajax({
                                                                    'type':'post',
                                                                    'url':'kgArticleBonus/addArticleBonus',
                                                                    "data":editorAwardList,
                                                                    'success':function (data){
                                                                        if(data.code == 10000){
                                                                            that.$message({
                                                                                  message:"保存成功",
                                                                                  type: 'success'
                                                                            });
                                                                            that.creatLoading = false;
                                                                            localStorage.setItem('kg_desk_readAward',1)
                                                                                  // window.location.reload()  
                                                                                  // that.handleCancel()  
                                                                                  that.handleClose()             
                                                                        }else{
                                                                            that.$message({
                                                                                  message: data.message,
                                                                                  type: 'error'
                                                                            });
                                                                            that.creatLoading = false;
                                                                        }
                                                                    }
                                                          });
                                    }else{
                                        that.$message({
                                          message: data.message,
                                          type: 'error'
                                        });
                                         that.creatLoading = false;
                                    }
                              }
                  });
            }else{
              that.getArticleAward(award_list)
              that.handleClose()
              that.$message({
                  message:"保存成功",
                  type: 'success'
              });
               that.creatLoading = false;
            }
          } else {
            return false;
          }
        });
    },
    onChange(val){
      switch(val){
        case "browse":
        this.browseChecked = !this.browseChecked;
        break;
        case "like":
        this.likeChecked = !this.likeChecked;
        break;
        case "collect":
        this.collectChecked = !this.collectChecked;
        break;       
        case "share":
        this.shareChecked = !this.shareChecked;
        break;
        default:
      };
      this.form.browse = this.browseChecked ? false:true
      this.form.like = this.likeChecked ? false:true
      this.form.collect = this.collectChecked ? false:true
      this.form.radioDisabled = this.shareChecked ? false:true
      if(!this.shareChecked){
        this.form.share = true
      }else if(this.shareChecked && this.form.shareRadio !== null){
        this.form.share = false
      }
    },
    radioChang(val){
      this.form.shareRadio = val;
      if(this.shareChecked){
        this.form.share = this.form.shareRadio !== null ? false:true      
      }else{
        this.form.share = false
      }
    },
  }
}
</script>

<style scoped>
.line{
  width:100%;
  height:1px;
  background:#f0f0f0;
  margin-top:10px;
}
.myColumn {
  /*height:1360px;*/
  margin-bottom: 100px;
}
.myColumn_header{
  position: relative;
}
.myColumn_main{
  padding-left: 20px;
  width:97%;
  height:auto;
}

.el-input{
  margin:0px;
  width:145px;
}
.icon-wenhao{
  font-size:18px;
  color:#b2b2b2;
  margin-left:4px;
}
.icon-wenhao:hover{
  color:#1d87ff;
  font-weight: bold;
}
.articlenum{
  margin-top:4px;
}
.account_tivalue{
  margin:24px 0px 0px;
}
@media screen and (max-width: 1890px){
  .el-input{
    width:120px;
  }
}
@media screen and (max-width: 1650px){
/*   .el-input{
  width:220px;
} */
  .el-form-item__label{
    text-align: left;
  }
}
</style>
<style>
      .readAward .el-dialog__body{
          padding:0px 20px 30px 20px;
      }
      .readAward .el-form-item--small.el-form-item{
        margin-bottom:6px;
      }
      .readAward .el-checkbox__label{
        font-size:18px;
      }
      .readAward .el-radio-group{
        /*margin-top:20px;*/
      }
      .readAward  .el-dialog__footer{
   padding: 10px 15px 38px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: -26px;     
      }
      .readAward .el-form-item--small .el-form-item__error{
        text-align: left;
        width:300px;
        display: inline-block;
      }
      @media only screen and (max-width:1800px){
      .readAward .el-dialog{
          width:50%!important;
          }
      }
      @media only screen and (max-width:1750px){
        .readAward .el-dialog{
            width:50%!important;
        }
      }  
     @media only screen and (max-width:1700px){
        .readAward .el-dialog{
            width:55%!important;
        }
      }     
      @media only screen and (max-width:1650px){
        .readAward .el-dialog{
            width:59%!important;
        }
      }      
      @media only screen and (max-width:1600px){
        .readAward .el-dialog{
            width:61%!important;
        }
      } 
      @media only screen and (max-width:1550px){
        .readAward .el-dialog{
            width:61%!important;
        }
      }     
      @media only screen and (max-width:1465px){
        .readAward .el-dialog{
            width:66%!important;
        }
      }
      @media only screen and (max-width:1440px){
        .readAward .el-dialog{
            width:68%!important;
        }
      }      
      @media only screen and (max-width:1380px){
        .readAward .el-dialog{
            width:70%!important;
        }
      }   
      @media only screen and (max-width:1366px){
        .readAward .el-dialog{
            width:70%!important;
        }
      }  
     @media only screen and (max-width:1360px){
        .readAward .el-dialog{
            width:72%!important;
        }
      }
      @media only screen and (max-width:1280px){
        .readAward .el-dialog{
            width:75%!important;
        }
      }     
     @media only screen and (max-width:1250px){
        .readAward .el-dialog{
            width:60%!important;
        }
        .readAward .el-form-item--small.el-form-item{
          display: block;
          margin-left:0px;
        }
        .readAward .el-input{
          width:158px;
        }
        .readAwardmodal .myColumn_noLeft .el-form-item__error{
            left: 204px!important;
            top: 4px;
        }
        .articlenum{
          margin-left:0px;
        }
      }
</style>





