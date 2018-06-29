<template>
  <div class="accountSafe setAccountSafe">
      <div class="baseBox accountCenter" id ='baseBox' >
        <el-tabs v-model="activeName" @tab-click="handleClick" class="font16">
            <el-tab-pane label="基本资料" name="first" v-loading="allLoading">
              <!-- 普通用户 -->

              <el-form ref="infoForm" :rules = "rules" :model="personInfo" label-width="110px" v-if = "accountInfoVisible == 1 ">
                <!-- accountInfoVisible == 1 -->
                <el-form-item style = "margin-bottom:0px;margin-top:20px">
                  <el-button type="primary" class="subBtn" @click = "save('infoForm')">保存</el-button>
                </el-form-item>
                <el-form-item label="昵称" prop = 'userName'>
                  <el-input v-model = "personInfo.userName" type="text" class="nickname" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio  v-model="radio" label="1">男</el-radio>
                    <el-radio  v-model="radio" label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="家乡">
                     <v-distpicker 
                     :province="personInfo.province"
                     :city="personInfo.city" 
                     :area="personInfo.county"
                     @selected = "selected"
                     @city = "selectCity" 
                     @province = "selectProvince"
                     @area = "selectArea"
                     class = 'distpicker'/>
                </el-form-item>
                <el-form-item label="个人简介" prop = 'resume'>
                    <el-input v-model = "personInfo.resume" type="textarea" class="offer"></el-input>
                </el-form-item>
              </el-form>
              <!-- 个人 -->
              <person-info :personInfo = "personInfo" v-else-if = "accountInfoVisible == 2"/>
              <!-- 媒体 -->
              <media-info :personInfo = "personInfo" v-else-if = "accountInfoVisible == 3"/>
              <!-- 公司 -->
              <company-info :personInfo = "personInfo" v-else-if = "accountInfoVisible == 4"/>
              <!-- 组织 -->
              <org-info :personInfo = "personInfo" v-else-if = "accountInfoVisible == 5"/>
            </el-tab-pane>
            <el-tab-pane label="账户安全" name="second">
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">绑定手机</el-col>
                <el-col :span="12" class="phonenum"  v-if = "phoneBingding">
                  <p>{{defaultPhone}}</p>
                  <p class="bind font14 colorccc" >已绑定的手机可以用于登录千氪账号，重置密码或其它安全验证</p>
                </el-col>
                <el-col :span="12" class = 'bind font14' v-if = "!phoneBingding">暂未绑定手机</el-col>
                <el-col :span="6" class="pBtn">
                  <span @click="centerDialogVisible = true" v-if = "!phoneBingding">绑定</span>
                  <span @click="fixPhoneHandle" v-else>修改</span>
                </el-col>
                <!-- fixPhone = true -->
              </el-row>
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">绑定邮箱</el-col>
                <el-col :span="12" class="phonenum"  v-if = "emailBingding">
                  <p>{{defaultEmail}}</p>
                  <p class="bind font14 color colorccc">已绑定的邮箱可以用于登录千氪账号，重置密码或其它安全验证</p>
                </el-col>
                <el-col :span="12" class="bind font14 color444" v-if = "!emailBingding">暂未绑定邮箱</el-col>
                <el-col :span="6" class="pBtn">
                  <span @click="bindEmailHandle" v-if = "!emailBingding">绑定</span>
                  <span @click="fixEmailHandle" v-if = "emailBingding">修改</span>
                </el-col>
                
              </el-row>

              <!-- 绑定微博开始 -->
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">绑定微博</el-col>
                <el-col :span="12" class="phonenum">
                  <!-- <p>大叔大婶多</p> -->
                  <p v-if = "isBindWeibo">{{accountData.wbName}}</p>
                  <p class="bind font14 color colorccc">绑定的微博号可以用于微博授权登录千氪账号</p>
                </el-col>
                <el-col :span="6" class="pBtn">
                  <span @click="bindWeibo(0)" v-if = "!isBindWeibo">绑定</span>
                  <span @click="unbind(0)" v-else>解绑</span>
                </el-col>
              </el-row>
              <!-- 绑定微博结束 -->
              
              <!-- 绑定微信开始 -->
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">绑定微信</el-col>
                <el-col :span="12" class="phonenum">
                  <!-- <p>大叔大婶多</p> -->
                  <p v-if = "isBindWx">{{accountData.wxName}}</p>
                  <p class="bind font14 color colorccc">绑定的微信号可以用于微信授权登录千氪账号</p>
                </el-col>
                <el-col :span="6" class="pBtn">
                  <span @click="bindWeibo(1)" v-if = "!isBindWx">绑定</span>
                  <span @click="unbind(1)" v-else>解绑</span>
                </el-col>
              </el-row>
              <!-- 绑定微信结束 -->
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">登录密码</el-col>
                <el-col :span="12" class="info color444">密码要求至少包含字母、数字或符号中的两项且长度超过六位，建议您经常修改密码。</el-col>
                <!-- 根据用户是否设置过密码来控制显示是初次设置密码or修改密码 -->
                <el-col :span="6" v-if="hasPwd == 1" class="pBtn"><span @click="centerPawVisible = true">修改</span></el-col>
                <el-col :span="6" v-if="hasPwd != 1" class="pBtn"><span @click="settingPsdHandle">设置</span></el-col>
              </el-row>
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">实名认证</el-col>
                <el-col :span="12" class="phonenum">
                  <p v-if = "accountData.realnameAuthed == '-1'">未认证</p>
                  <p v-if = "accountData.realnameAuthed == 2">审核中</p>
                  <p v-if = "accountData.realnameAuthed == 0">不通过</p>
                  <p v-if = "accountData.realnameAuthed == 1">已认证</p>
                  <p class="bind font14 colorccc" v-if = "accountData.realnameAuthed != 0">通过实名认证后，您可以在发布文章时设置阅读奖励，并转出钛值</p>
                  <p class="bind font14" v-if = "accountData.realnameAuthed == 0">原因：{{accountData.refuseReason}}</p>
                </el-col>
                <el-col :span="6" class="pBtn">
                  <span @click = "approveVisible = true" v-if = "accountData.realnameAuthed == '-1'">去认证</span>
                  <span @click = "approveVisible = true" v-if = "accountData.realnameAuthed == 0">重新认证</span>
                  <span @click = "showApprove" v-if = "accountData.realnameAuthed == 1 || accountData.realnameAuthed == 2">查看</span>
                </el-col>
              </el-row>
              <el-row class="phone martop20 font14 pt15">
                <el-col :span="6" class="bindP">交易密码</el-col>
                <el-col :span="12" class="phonenum" >
                  <p v-if ="traderBingding">未设置</p>
                  <p v-else>已设置</p>
                  <p class="bind font14 colorccc">设置阅读奖励及转出钛值时均需要交易密码</p>
                </el-col>
                <el-col :span="6" class="pBtn">
                  <span @click = "traderHandle" v-if ="traderBingding">设置</span>
                  <!-- <span @click = "traderVisible = true" v-if ="traderBingding">设置</span> -->
                  <span @click = "traderHandle" v-else>修改</span>
                </el-col>
              </el-row>
            </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 绑定手机 -->
<!--         <el-dialog
        title="绑定手机号"
        :visible.sync="centerDialogVisible"
        width="20%"
        center>
        <div class="forGetBox">
          <p class="title font14">验证码将会发送至你的手机号</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" prop="phone">
                <el-input v-model="ruleForm.phone" type="text" class="martop20" placeholder='手机号'></el-input>
          </el-form-item>
          <el-form-item label="" prop = 'code'>
                <el-input v-model="ruleForm.code" type="text" class=" code" placeholder='验证码'>
                  <el-button slot="suffix" type="primary" @click="send('first_phone','ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                    <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                    <span v-if="!sendMsgDisabled">验证码</span>
                  </el-button>
                </el-input>
          </el-form-item>
          <el-form-item>
            <el-button  @click="cancel" plain class=" btnModal" >取消</el-button>
            <el-button @click = "onSubmit('first_phone','ruleForm')" type="primary"  class=" btnModal2">确定</el-button>
          </el-form-item>
      </el-form>
    </div>
</el-dialog> -->

        <!-- 绑定邮箱 -->
        <el-dialog
                    v-show = "bindEmailShow"
                    class = 'safeModal'
                    title="绑定邮箱"
                    :visible="centerMailVisible"
                    :before-close="beforeClose"
                    :close-on-click-modal = "false"
                    :lock-scroll = "false"
                    width="15%"
                    center>
                      <div class="forGetBox">
                        <p class="title font14">验证码将会发送至你的邮箱号</p>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                          <el-form-item label="" prop ='mail' >
                              <el-input size = 'small' v-model="ruleForm.mail" type="text" class="martop20" placeholder='邮箱号'></el-input>
                          </el-form-item>
                          <!-- 滑动验证开始 -->
                            <div>
                              <div class="ln">
                                <div id="bindEmailBlock"></div>
                              </div>
                              <input type='hidden' id='csessionid66' name='csessionid66'/>
                              <input type='hidden' id='sig66' name='sig66'/>
                              <input type='hidden' id='token66' name='token66'/>
                              <input type='hidden' id='scene66' name='scene66'/>
                            </div>
                          <!-- 滑动验证结束 -->
                          <el-form-item label=""  prop = 'code'>
                            <el-input size = 'small' type="text" class=" code" v-model="ruleForm.code" placeholder='验证码'>
                            <el-button size = 'small' slot="suffix" type="primary" @click="send('first_email','ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                              <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                              <span v-if="!sendMsgDisabled">验证码</span>
                            </el-button>
                            </el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button  size = 'small' @click="cancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                            <el-button size = 'small' @click ="onSubmit('first_email','ruleForm')" type="primary"  class=" btnModal2">确认</el-button>
                          </el-form-item>
                        </el-form>
                      </div>
        </el-dialog>
        <!-- 修改密码 -->
        <el-dialog
                  class = 'safeModal'
                  title='修改密码'
                  :visible="centerPawVisible"
                  :before-close="beforeClose"
                                      :close-on-click-modal = "false"
                    :lock-scroll = "false"
                  width="15%"
                  center>
            <div class="forGetBox">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop = 'userPassword'>
                          <el-input size = 'small' v-model = "ruleForm.userPassword" type="password" placeholder='请输入原密码'></el-input>
                    </el-form-item>
                    <el-form-item  prop = 'newPwd'>
                               <el-input size = 'small' v-model = "ruleForm.newPwd" type="password"  placeholder='请输入新密码'></el-input>
                    </el-form-item>
                    <el-form-item  prop = 'confirmPwd'>
                               <el-input size = 'small' v-model = "ruleForm.confirmPwd" type="password"  placeholder='请再次输入新密码'></el-input>
                    </el-form-item>
                    <el-form-item>
                              <el-button  size = 'small' @click="cancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                            <el-button  size = 'small' @click ="onSubmit('fixPass','ruleForm')" type="primary"  class=" btnModal2">确认</el-button>
                    </el-form-item>
              </el-form>
          </div> 
        </el-dialog>
<!--设置密码-->
        <el-dialog
          class = 'safeModal'
          title='设置登录密码'
          v-show="settingPsdShow"
          :visible="settingPsd"
          :before-close="beforeClose2"
                              :close-on-click-modal = "false"
                    :lock-scroll = "false"
          width="20%"
          center>
            <div class="forGetBox">
              <p class="title font14">我们将往你的绑定手机号上发送验证码</p>
              <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
                    <el-form-item  prop = 'newPwd'>
                               <el-input v-model = "ruleForm2.newPwd" type="password"  placeholder='请输入新密码'></el-input>
                    </el-form-item>
                    <el-form-item  prop = 'confirmPwd'>
                               <el-input v-model = "ruleForm2.confirmPwd" type="password"  placeholder='请再次输入新密码'></el-input>
                    </el-form-item>
                    <!-- 滑块验证开始 -->
                    <div>
                            <div class="ln">
                              <div id="settingPsdBlock"></div>
                            </div>
                            <input type='hidden' id='csessionid99' name='csessionid99'/>
                            <input type='hidden' id='sig99' name='sig99'/>
                            <input type='hidden' id='token99' name='token99'/>
                            <input type='hidden' id='scene99' name='scene99'/>
                    </div> 
                    <!-- 滑块验证结束 -->
                    <el-form-item label=""  prop = 'code'>
                      <el-input  v-model = "ruleForm2.code" type="text"  class=" code codeInput" placeholder='验证码'>
                        <el-button slot="suffix" type="primary" @click="send('oldPhone','ruleForm2')" class="codeBtn setpsd" :disabled='sendMsgDisabled'>
                          <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                          <span v-if="!sendMsgDisabled">验证码</span>
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button style="margin-left:0px"  @click="cancel2('ruleForm2')" plain class="btnModal" >取消</el-button>
                      <el-button style="margin-left:0px"  @click ="out_user_submit('ruleForm2')" type="primary" class="btnModal">确认</el-button>
                    </el-form-item>
              </el-form>
          </div> 
        </el-dialog>



        <!-- 修改手机绑定 -->

        <!-- 老手机 -->
        <el-dialog
                v-show = 'newphoneshow'
                class = 'safeModal'
                title="修改手机号绑定"
                :visible="fixPhone"
                :before-close="beforeClose"
                                    :close-on-click-modal = "false"
                    :lock-scroll = "false"
                width="15%"
                center>
                <div class="forGetBox">
                  <p class="title font14">验证码将会发送至你的旧手机号</p>
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="">
                      <el-input type="text"  size = 'small' class="martop20" :placeholder="defaultPhone" :disabled="true"></el-input>
                    </el-form-item>
                <!-- 滑动验证开始 -->
                  <div>
                    <div class="ln">
                      <div id="oldPhoneBlock"></div>
                    </div>
                    <input type='hidden' id='csessionid11' name='csessionid11'/>
                    <input type='hidden' id='sig11' name='sig11'/>
                    <input type='hidden' id='token11' name='token11'/>
                    <input type='hidden' id='scene11' name='scene11'/>
                  </div>
                <!-- 滑动验证结束 -->
                     <el-form-item label=""  prop = 'oldCode'>
                      <el-input   size = 'small' v-model = "ruleForm.oldCode" type="text"  class=" code codeInput" placeholder='验证码'>
                        <el-button  size = 'small' slot="suffix" type="primary" @click="send('oldPhone','ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                          <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                          <span v-if="!sendMsgDisabled">验证码</span>
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button   size = 'small' @click="cancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                    <el-button  size = 'small' @click="nextStep('newPhone','ruleForm')" type="primary"  class=" btnModal2">下一步</el-button>
                  </el-form-item>
              </el-form>
            </div>
        </el-dialog>

        <!-- 新手机 -->
        <el-dialog
                v-show = 'newphoneshow2'
                class = 'safeModal'
                title="修改手机号绑定"
                :visible="newPhone"
                :before-close="beforeClose"
                                    :close-on-click-modal = "false"
                    :lock-scroll = "false"
                width="15%"
                center>
                <div class="forGetBox">
                  <p class="title font14">验证码将会发送至你的新手机号</p>
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="">
                          <el-select  v-model="select" size = 'small' >
                                <el-option :key = "key" v-for = "(item,key) in areaCode" :label="item.countryname + '(+' +item.code + ')'" :value="item.code"></el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label=""  prop = 'phone'>
                      <el-input size = 'small' v-model = "ruleForm.phone" type="text"  placeholder="手机号" ></el-input>
                    </el-form-item>
                 <!-- 滑动验证开始 -->
                  <div>
                    <div class="ln">
                      <div id="newPhoneBlock"></div>
                    </div>
                    <input type='hidden' id='csessionid22' name='csessionid22'/>
                    <input type='hidden' id='sig22' name='sig22'/>
                    <input type='hidden' id='token22' name='token22'/>
                    <input type='hidden' id='scene22' name='scene22'/>
                  </div>
                <!-- 滑动验证结束 -->
                     <el-form-item label=""  prop = 'code'>
                      <el-input size = 'small' v-model = "ruleForm.code" type="text"  class=" code" placeholder='验证码'>
                        <el-button size = 'small' slot="suffix" type="primary" @click="send('newPhone','ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                          <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                          <span v-if="!sendMsgDisabled">验证码</span>
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button size = 'small'  @click="cancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                    <el-button size = 'small' @click ="onSubmit('newPhone','ruleForm')" type="primary"  class=" btnModal2">确认</el-button>
                  </el-form-item>
              </el-form>
            </div>
        </el-dialog>
        <!-- 修改邮箱绑定 -->

        <!-- 老邮箱 -->
        <el-dialog
            v-show = "newEmailShow"
            class = 'safeModal'
            title="修改邮箱绑定"
            :visible="fixEmail"
            :before-close="beforeClose"
                                :close-on-click-modal = "false"
                    :lock-scroll = "false"
            width="15%"
            center>
              <div class="forGetBox">
                        <p class="title font14">验证码将会发送至你的旧邮箱地址</p>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                          <el-form-item label=""  >
                              <el-input size = 'small' type="text" class="martop20" :placeholder="defaultEmail" :disabled="true"></el-input>
                          </el-form-item>
                          <!-- 滑动验证开始 -->
                            <div>
                              <div class="ln">
                                <div id="oldEmailBlock"></div>
                              </div>
                              <input type='hidden' id='csessionid33' name='csessionid33'/>
                              <input type='hidden' id='sig33' name='sig33'/>
                              <input type='hidden' id='token33' name='token33'/>
                              <input type='hidden' id='scene33' name='scene33'/>
                            </div>
                          <!-- 滑动验证结束 -->
                          <el-form-item label=""  prop = 'oldCode'>
                            <el-input size = 'small' id = "codeInput2" v-model = "ruleForm.oldCode" type="text" class=" code" placeholder='验证码'>
                            <el-button size = 'small' slot="suffix" type="primary" @click="send('oldEmail','ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                              <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                              <span v-if="!sendMsgDisabled">验证码</span>
                            </el-button>
                            </el-input>
                            <span class = 'error_msg' id = 'error_msg2'>请输入验证码</span>
                          </el-form-item>
                          <el-form-item>
                            <el-button size = 'small' @click="cancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                            <el-button size = 'small' @click="nextStep('newEmail','ruleForm')" type="primary"  class=" btnModal2">下一步</el-button>
                          </el-form-item>
                        </el-form>
            </div>
        </el-dialog>

        <!-- 新邮箱 -->
        <el-dialog
                v-show = "newEmailShow2"
                class = 'safeModal'
                title="修改邮箱绑定"
                :visible="newEmail"
                width="15%"
                :before-close="beforeClose"
                                    :close-on-click-modal = "false"
                    :lock-scroll = "false"
                center>
                <div class="forGetBox">
                  <p class="title font14">验证码将会发送至你的新邮箱地址</p>
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label=""  prop = "newEmail">
                      <el-input size = 'small' v-model = "ruleForm.newEmail" type="text" class="martop20" placeholder="邮箱地址" ></el-input>
                    </el-form-item>
                      <!-- 滑动验证开始 -->
                            <div>
                              <div class="ln">
                                <div id="newEmailBlock"></div>
                              </div>
                              <input type='hidden' id='csessionid77' name='csessionid77'/>
                              <input type='hidden' id='sig77' name='sig77'/>
                              <input type='hidden' id='token77' name='token77'/>
                              <input type='hidden' id='scene77' name='scene77'/>
                            </div>
                          <!-- 滑动验证结束 -->
                     <el-form-item label=""  prop = 'code'>
                      <el-input size = 'small' v-model = "ruleForm.code" type="text"  class=" code" placeholder='验证码'>
                        <el-button size = 'small' slot="suffix" type="primary" @click="send('newEmail','ruleForm')" class="codeBtn" :disabled='sendMsgDisabled'>
                          <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                          <span v-if="!sendMsgDisabled">验证码</span>
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button  size = 'small' @click="cancel('ruleForm')" plain class=" btnModal" >取消</el-button>
                    <el-button size = 'small' @click="onSubmit('newEmail','ruleForm')" type="primary"  class=" btnModal2">确认</el-button>
                  </el-form-item>
              </el-form>
            </div>
        </el-dialog>
        <div id = 'parentValue'></div>
        <!-- 实名认证 -->
        <approve-modal :visible ="approveVisible" :cancel  = "cancelSubModal" :getInitPhone = "getInitPhone" :accountData = "accountData"/>
        <!-- 交易密码 -->
        <traderPwdModal  :visible ="traderVisible" :cancel  = "canceltraderModal" :item = "accountData" :defaultPhone = "defaultPhone"
          :traderBingding = "traderBingding" :traderChange = "traderChange" :oldPhone = "oldPhone" :slideInfo = "slideInfo"  :handleSlide = "handleSlide" :traderShow = "traderShow"
        />

  </div>
</template>
<script>

import Lib from 'assets/js/Lib';
import VDistpicker from 'v-distpicker';
import HbHead from 'components/HbHead';
import personInfo from './personInfo';
import mediaInfo from './mediaInfo';
import approveModal from './approveModal';
import traderPwdModal from './traderPwdModal';
import CompanyInfo from './companyInfo';
import orgInfo from './orgInfo';
import codeData from 'assets/js/phone';
import { setTimeout } from 'timers';
import { fail } from 'assert';
export default {
  components: {
    HbHead,VDistpicker,personInfo,mediaInfo,approveModal,traderPwdModal,CompanyInfo,orgInfo
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
      let validateMail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if(!(Lib.V.validateMail(value))){
           callback(new Error('请正确输入邮箱'));
        } else {
          callback();
        }
      };  
      let validateCode= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }else if(value.length > 6){
           callback(new Error('验证码长度不超过6位数,请检查'));
        } else {
          callback();
        }
      }; 
      let validateUserPwd = (rule,value,callback) =>{
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length < 6){
           callback(new Error('密码至少6位数'));
        } else {
          callback();
        }  
      }      
      let validateNewPwd = (rule,value,callback) =>{
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(value.length < 6){
           callback(new Error('密码至少6位数'));
        } else {
          callback();
        }      
      }
      let validateConfirm = (rule,value,callback) =>{
        if (value === '') {
          callback(new Error('请输入确认密码'));
        }else if(value !== this.ruleForm.newPwd){
           callback(new Error('两次密码不相同'));
        } else {
          callback();
        }      
      }
      let validateConfirm2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm2.newPwd) {
        callback(new Error("两次密码不相同"));
      } else {
        callback();
      }
    };      
      let validateName = (rule,value,callback) =>{
        if (value.replace(/(^\s*)|(\s*$)/g,"") == '') {
          callback(new Error('请输入昵称'));
        }else if(!(Lib.V.checkLength(value))){
           callback(new Error('请输入15个字以内的昵称'));
        } else {
          callback();
        }      
      }      
      let validateResume = (rule,value,callback) =>{
        if (value != '' && value != null && (value.length > 100 || value.length < 10)) {
          callback(new Error('请输入10-100字以内的个人简介'));
        }else {
          callback();
        }      
      }
    return {
      traderShow:false,
      settingPsdShow:false,
      traderShow2: true,
      newEmailShow2:false,
      newEmailShow:false,
      newphoneshow2:false,
      newphoneshow:false,
      bindEmailShow:false,
      allLoading:true,
      accountData:{},
      hasPwd:0,
      settingPsd:true, //设置密码弹窗
      loadingShow:true,
      activeName: 'first',
      radio:'',
      centerDialogVisible:false,
      centerPawVisible:false,
      sendMsgDisabled:false,
      time:90,
      // select: { province: '四川省', city: '成都市', area: '双流区' },
      interval:null,
      ruleForm: {
          phone:'',
          pass: '',
          mail:"",
          name:'',
          code:"",
          userPassword:"",
          newPwd:"",
          confirmPwd:"",
          fixCode:"",
          newPhone:"",
          newEmail:"",
          oldCode:""
      },
      rules: {
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],         
          newPhone: [
            {validator: validatePhone, trigger: 'blur' }
          ],
          mail: [
            {validator: validateMail, trigger: 'blur' }
          ],       
          newEmail: [
            {validator: validateMail, trigger: 'blur' }
          ],
          code:[
            {validator: validateCode, trigger: 'blur' }
          ],     
          oldCode:[
            {validator: validateCode, trigger: 'blur' }
          ],
          userPassword:[{
             validator: validateUserPwd, trigger: 'blur' 
          }],
          userName:[{
            validator: validateName, trigger: 'blur' 
          }],
          newPwd:[{
            validator: validateNewPwd, trigger: 'blur' 
          }],
          confirmPwd:[{
           validator: validateConfirm, trigger: 'blur'  
          }],
          resume:[{
             validator: validateResume, trigger: 'blur'  
          }]
      },
      rules2: {
        newPwd: [
          {
            validator: validateNewPwd,
            trigger: "blur"
          }
        ],
        confirmPwd: [
          {
            validator: validateConfirm2,
            trigger: "blur"
          }
        ],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      ruleForm2: {
        newPwd: "",
        confirmPwd: "",
        code: ""
      },
      defaultPhone:null,
      oldPhone:"",
      defaultEmail:null,
      oldEmail:"",
      phoneBingding:false,
      emailBingding:false,
      realnameBingding:true,
      realnamePass:false,
      traderBingding:true,
      fixPhone:true,
      fixEmail:true,
      newPhone:true,
      newEmail:true,
      centerMailVisible:true,

      personInfo:{
        "userName":'',
        "resume":''
      },

      comVisible:true,
      orgVisible:true,
      //查看基本资料
      accountInfoVisible:null,
      //认证
      approveVisible:false,
      //查看认证信息
      showApproveName:"",
      showApproveId:'',

      //交易密码
      traderVisible:true,
      //修改手机
      atskMobile:null,
      select:'86',
      areaCode:[{}],
      allSelect:true,
      defaultProvince:'',

      //绑定微博
      isBindWeibo:false,
      isBindWx:false,
      slideInfo:{
        'session':'',
        'sig':'',
        'token':'',
        'scene':''
      }
    }
  },
  mounted(){
      // this.roleId = localStorage.getItem('kg_desk_roleId');
      this.areaCode = codeData;
      this.getInfo()

      let award_approve = localStorage.getItem('award_approve');
      let trader_pwd = localStorage.getItem('trader_pwd');
      let isBind = localStorage.getItem('isBind')
      if(award_approve == 2 || trader_pwd == 2 || isBind == 2){
        this.activeName = 'second';
        this.getInitPhone()
      }else{
        this.activeName = 'first';
      }
      this.fixPhone = false;
      this.newPhone = false;
      this.newEmail = false;
      this.fixEmail = false;
      this.centerMailVisible = false;
      this.settingPsd = false;
      localStorage.setItem('award_approve',1)
      localStorage.setItem('trader_pwd',1)
      localStorage.setItem('isBind',1)
      // this.traderVisible = trader_pwd == 2 ? true :false;
/*      if (trader_pwd == 2) {
        this.traderVisible = true;
        this.traderShow = true;
         setTimeout (()=> {
          Lib.M.aliBlock('#traderPwdBlock',this,'csessionid55','sig55','token55','scene55')
        }, 1000)
      }else{
        this.traderVisible = false;
        this.traderShow = false;
      }*/
      this.approveVisible = award_approve == 2 ? true :false;
      this.atskMobile = localStorage.getItem('kg_desk_atskMobile');
      this.defaultPhone = localStorage.getItem('kg_desk_atskMobile');
  },
  created () {
    let trader_pwd = localStorage.getItem('trader_pwd');
          if (trader_pwd == 2) {
        this.traderVisible = true;
        this.traderShow = true;
         setTimeout (()=> {
          Lib.M.aliBlock('#traderPwdBlock',this,'csessionid55','sig55','token55','scene55')
        }, 1000)
      }else{
        this.traderVisible = false;
        this.traderShow = false;
      }
  },
  methods: {
    settingPsdHandle() {
      //设置交易密码
      this.settingPsd = true;
      this.settingPsdShow = true;
      Lib.M.aliBlock(
        "#settingPsdBlock",
        this,
        "csessionid99",
        "sig99",
        "token99",
        "scene99"
      );
    },
    traderHandle(){
      this.traderShow = true;
      this.traderVisible = true;
      setTimeout (()=> {
          Lib.M.aliBlock('#traderPwdBlock',this,'csessionid55','sig55','token55','scene55')
        }, 200)
    },
    handleSlide(session,sig,nc_token,nc_scene){
        this.slideInfo.session = session
        this.slideInfo.sig = sig
        this.slideInfo.nc_token = nc_token
        this.slideInfo.nc_scene = nc_scene
    },
    unbind(res){
      const that = this;
      const str = res == 0 ?'微博':'微信'
        this.$confirm('是否要解除'+str+'绑定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          customClass:'bindMessageBox'
          
        }).then(() => {
          const getPhone = Lib.M.dataRequest({
            "userId":localStorage.getItem('kg_desk_userId'),
            "openType":res,
          })
          Lib.M.ajax({
              'type':'post',
              'url':'thirdParty/unbind',
              "data":getPhone,
              'success':function (data){
                  if(data.code == 10000){
                      if(res == 0){
                         that.isBindWeibo = false;
                       }else{
                         that.isBindWx = false;
                       }
                      that.$message({
                            message: '解绑成功',
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消解绑'
          });          
        });
    },
    bindWeibo(data){
      // Lib.M.weiboBind();
      if(data == 0){
        Lib.M.weiboBind();
      }else{
        Lib.M.wxBind()
      }
    },
    fixPhoneHandle(){
      this.fixPhone = true;
      this.newphoneshow = true;
       Lib.M.aliBlock('#oldPhoneBlock',this,'csessionid11','sig11','token11','scene11')
    },
    bindEmailHandle(){
      this.bindEmailShow = true;
      this.centerMailVisible = true
       Lib.M.aliBlock('#bindEmailBlock',this,'csessionid66','sig66','token66','scene66')
    },
    fixEmailHandle(){
      this.fixEmail = true
      this.newEmailShow = true;
       // Lib.M.aliBlock('#oldEmailBlock',this)
       Lib.M.aliBlock('#oldEmailBlock',this,'csessionid33','sig33','token33','scene33')
    },
    showApprove(){
      const html = "<div><p><span class = 'html_span'>真实姓名</span><span>"+this.accountData.realName+"</span></p><p><span class = 'html_span'>身份证号</span><span>"+this.accountData.idcardNo+"</span></p><p><span class = 'html_span'>身份证扫描件</span><span>已上传</span></p></div>"
        this.$alert(html, '实名认证信息', {
          dangerouslyUseHTMLString: true,
          lockScroll : false,
          customClass:'approveMessageBox'
        });
    },
    cancelSubModal(){
      this.approveVisible = false;
    },
    canceltraderModal(){
      this.traderVisible = false;
    },
    //获取账号信息
    getInitPhone(){
      const that = this;
          const getPhone = Lib.M.dataRequest({"userId":localStorage.getItem('kg_desk_userId')})
          Lib.M.ajax({
              'type':'post',
              'url':'userkg/getuserdetails',
              "data":getPhone,
              'success':function (data){
                  if(data.code == 10000){
                    data = data.responseBody.data;
                    that.accountData = data;
                    that.oldPhone = data.mobIle;
                    that.oldEmail = data.userEmail;
                    that.defaultPhone = data.userMobile;
                    that.defaultEmail = data.userEmail;
                    // 账号是否来自本站
                    that.hasPwd = data.accountFrom == 0 ? 0 : 1;
                    that.phoneBingding = data.userMobile == null ? false : true 
                    that.emailBingding = data.userEmail == null ? false : true 
                    that.traderBingding = data.tradepasswordSet == 0 ? true : false 
                    that.loadingShow = false;
                    that.isBindWeibo = data.bindWeibo == 0 ? false : true;
                    that.isBindWx = data.bindWeiXin == 0 ? false : true;

                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });      
    },
    getInfo(){
          const that = this;
          const list = Lib.M.dataRequest({
                      "userId":localStorage.getItem('kg_desk_userId')
                      // "roleId":localStorage.getItem('kg_desk_roleId'),
          })
          Lib.M.ajax({
              'type':'post',
              'url':'userprofile/getProfile',
              "data":list,
              'success':function (data){
                  if(data.code == 10000){
                    data = data.responseBody.data;
                    that.personInfo = data;
                    that.roleId = data.userRole;
                    that.radio = data.sex;
                          switch(data.userRole){
                                case '1':
                                  that.accountInfoVisible = 1;
                                break;
                                case '2':
                                  that.accountInfoVisible = 2;
                                break;
                                case '3':
                                  that.accountInfoVisible = 3;
                                break;
                                case '4':
                                  that.accountInfoVisible = 4;
                                break;
                                case '5':
                                  that.accountInfoVisible = 5;
                                break;
                                default:
                              }
                   that.allLoading = false;
                  }else{
                      that.$message({
                            message: data.message,
                            type: 'error'
                      });
                  }
              }
          });        
    },
    handleClick(tab, event){
      localStorage.setItem('award_approve',1)
      localStorage.setItem('isBind',1);
      localStorage.setItem('trader_pwd',1)
      if(tab.label == '账户安全'){
           //获取初始邮箱和手机号信息
          this.getInitPhone();
      }
    },
    onSubmit(value,formName) {
      const that = this;
      let submit_list = {}
      let url = '/userkg/centerUped';
      //绑定手机
      if(value === 'first_phone'){
          submit_list = Lib.M.dataRequest({
                      "verIfy":this.ruleForm.phone,
                      "code":this.ruleForm.code,
                      "call_method":"Onebinding",
                      "userId":localStorage.getItem('kg_desk_userId'),
          })
      //绑定邮箱
      }
      if(value === 'first_email'){
          submit_list = Lib.M.dataRequest({
                      "verIfy":this.ruleForm.mail,
                      "code":this.ruleForm.code,
                      "call_method":"Onebinding",
                      "userId":localStorage.getItem('kg_desk_userId'),
                      "userEmail":this.ruleForm.mail
                      
          })          
          if(this.ruleForm.mail == ''){
                 this.$message({
                          message: '请输入邮箱',
                          type: 'warning'
                });
                 return
          }else if(!(Lib.V.validateMail(this.ruleForm.mail))){
              this.$message({
                  message: '请正确输入邮箱',
                 type: 'warning'
              });
              return
          } else if(this.ruleForm.code == ''){
              this.$message({
                  message: '请输入验证码',
                 type: 'warning'
              });     
          }
          Lib.M.ajax({
                        'type':'post',
                        'url':url,
                        "data":submit_list,
                        'success':function (data){
                          if(data.code == 10000){
                            that.getInitPhone();
                            that.$message({
                              message: '提交成功',
                              type: 'success'
                            });
                            that.$refs[formName].resetFields()
                            setTimeout(()=>{
                               that.cancel('ruleForm')
                            },1000);
                          }else{
                            that.$message({
                              message: data.message,
                              type: 'error'
                            });
                          }
                        }
          });
          return
      //修改手机
      }
      if(value === 'newPhone'){
          submit_list = Lib.M.dataRequest({
                      "verIfy":this.ruleForm.phone,
                      "code":this.ruleForm.code,
                      "call_method":"newVerIfy",
                      "userId":localStorage.getItem('kg_desk_userId'),
                      "userMobile":this.ruleForm.phone,
          })  
              Lib.M.ajax({
                    'type':'post',
                    'url':url,
                    "data":submit_list,
                    'success':function (data){
                      if(data.code == 10000){
                        that.getInitPhone();
                        that.$message({
                          message: '提交成功',
                          type: 'success'
                        });
                        that.$refs[formName].resetFields()
                        setTimeout(()=>{
                           that.cancel('ruleForm')
                        },1000);
                      }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                      }
                    }
              });
              return
      //修改邮箱
      }
      if(value === 'newEmail'){
          submit_list = Lib.M.dataRequest({
                      "verIfy":this.ruleForm.newEmail,
                      "code":this.ruleForm.code,
                      "call_method":"newVerIfy",
                      "userId":localStorage.getItem('kg_desk_userId'),
                      "userEmail":this.ruleForm.newEmail
          }) 
          if(this.ruleForm.newEmail == ''){
                 this.$message({
                          message: '请输入邮箱',
                          type: 'warning'
                });
                 return
          }else if(!(Lib.V.validateMail(this.ruleForm.newEmail))){
              this.$message({
                  message: '请正确输入邮箱',
                 type: 'warning'
              });
              return
          } else if(this.ruleForm.code == ''){
              this.$message({
                  message: '请输入验证码',
                 type: 'warning'
              });     
          }
              Lib.M.ajax({
                    'type':'post',
                    'url':url,
                    "data":submit_list,
                    'success':function (data){
                      if(data.code == 10000){
                        that.getInitPhone();
                        that.$message({
                          message: '提交成功',
                          type: 'success'
                        });
                        that.$refs[formName].resetFields()
                        setTimeout(()=>{
                           that.cancel('ruleForm')
                        },1000);
                      }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                      }
                    }
              });
              return
      //修改密码
      }
      if(value === 'fixPass'){
            submit_list = {
                      "userId":localStorage.getItem('kg_desk_userId'),
                      "userPassword":this.ruleForm.userPassword,
                      "newPwd":this.ruleForm.newPwd,
                      "confirmPassword":this.ruleForm.confirmPwd,
                      "userMobile":this.oldPhone
            } 
          submit_list = Lib.M.dataRequest(submit_list)
          url = '/userkg/centerUpdatePd';  
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
              Lib.M.ajax({
                    'type':'post',
                    'url':url,
                    "data":submit_list,
                    'success':function (data){
                      if(data.code == 10000){
                        that.getInitPhone();
                        that.$message({
                          message: '提交成功',
                          type: 'success'
                        });
                        that.$refs[formName].resetFields()
                        setTimeout(()=>{
                           that.cancel('ruleForm')
                        },1000);
                      }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                      }
                    }
              });
          }else{
              return false;
          }
      });
      
    },
    send(value,form) {
      let me = this;
      let send_list = {}
      let url = "/userkg/sendSmsEmailcode";
      //绑定手机
      if(value == 'first_phone'){
                if(this.ruleForm.phone === ''){
                  this.$message({
                    message: '请输入手机号',
                    type: 'error'
                  });
                  return
                }else if(!(Lib.V.validatePhone(this.ruleForm.phone))){
                  this.$message({
                    message: '手机号不正确',
                    type: 'error'
                  });
                  return 
                }else{
                  send_list = {"data" :Lib.M.dataRequest({
                    "verIfy":this.ruleForm.phone,
                    "mobileArea":localStorage.getItem('kg_desk_mobileArea')
                  })}
                }   
      //绑定邮箱     
      }else if(value == 'first_email'){
           /*   if(this.ruleForm.mail === ''){
                this.$message({
                  message: '请输入邮箱',
                  type: 'warning'
                });
                return
              }*/
          if(this.ruleForm.mail == ''){
                 this.$message({
                          message: '请输入邮箱',
                          type: 'warning'
                });
                 return
          }else if(!(Lib.V.validateMail(this.ruleForm.mail))){
              this.$message({
                  message: '请正确输入邮箱',
                 type: 'warning'
              });
              return
          } 
                send_list = Lib.M.noSignRequest({
                  "verIfy":this.ruleForm.mail,
                  "platform":'3',
                  "session":this.slideInfo.session,
                  "sig":this.slideInfo.sig,
                  "token":this.slideInfo.nc_token,
                  "scene":this.slideInfo.nc_scene,
                })
                me.time =90;
                Lib.M.loginAjax({
                      'type':'post',
                      'url':"/userkg/sendSmsEmailcode",
                      "data":send_list,
                      'success':function (data){

                        if(data.code == 10000){
                          me.$message({
                               message: '验证码已发送！',
                               type: 'success'
                          });
                          me.sendMsgDisabled = true;
                            me.interval = window.setInterval(function() {
                        if ((me.time--) <= 0) {
                          me.sendMsgDisabled = false;
                          Lib.M.aliBlock('#bindEmailBlock','csessionid66','sig66','token66','scene66')
                          me.handleSlide('','','','')
                          window.clearInterval(me.interval);
                        }
                      }, 1000);
                        }else if(data.code == 10020){
                          me.$message({
                               message:data.message,
                               type: 'warning'
                          }); 
                          Lib.M.aliBlock('#bindEmailBlock','csessionid66','sig66','token66','scene66')
                    me.handleSlide('','','','')
                        }else{
                          me.$message({
                               message:data.message,
                               type: 'error'
                          });
                          Lib.M.aliBlock('#bindEmailBlock','csessionid66','sig66','token66','scene66')
                    me.handleSlide('','','','')
                        }
                      }
               })
                // Lib.M.sendMessage(form,me,send_list,'#bindEmailBlock','csessionid66','sig66','token66','scene66'); 
          

      //老手机发验证码         
      }else if(value == 'oldPhone'){
        send_list = Lib.M.noSignRequest({
          "verIfy":this.oldPhone,
          "mobileArea":localStorage.getItem('kg_desk_mobileArea'),
          "platform":'3',
          "session":this.slideInfo.session,
          "sig":this.slideInfo.sig,
          "token":this.slideInfo.nc_token,
          "scene":this.slideInfo.nc_scene,
        })
        Lib.M.sendMessage(form,me,send_list,'#oldPhoneBlock','csessionid11','sig11','token11','scene11');
      //老邮箱发验证码  
      }else if(value == 'oldEmail'){
        send_list = Lib.M.noSignRequest({
          "verIfy":this.oldEmail,

          "platform":'3',
          "session":this.slideInfo.session,
          "sig":this.slideInfo.sig,
          "token":this.slideInfo.nc_token,
          "scene":this.slideInfo.nc_scene,
        })
        Lib.M.sendMessage(form,me,send_list,'#oldEmailBlock','csessionid33','sig33','token33','scene33');
      //新手机发验证码  
      }else if(value == 'newPhone'){
                  send_list = Lib.M.noSignRequest({
                          "verIfy":this.ruleForm.phone,
                          "mobileArea":this.select,
                          "valiDation":1,

                              "platform":'3',
                              "session":this.slideInfo.session,
                              "sig":this.slideInfo.sig,
                              "token":this.slideInfo.nc_token,
                              "scene":this.slideInfo.nc_scene,
                  })
                   Lib.M.sendMessage(form,me,send_list,'#newPhoneBlock','csessionid22','sig22','token22','scene22');
      //新邮箱发验证码  
      }else if(value == 'newEmail'){
/*        send_list = Lib.M.noSignRequest({
          "verIfy":this.ruleForm.newEmail
        })*/
            me.$refs[form].validateField('newEmail',(newEmail) => {
                    if(newEmail == ""){
                      this.atskMobile = localStorage.getItem('kg_desk_atskMobile');
                      send_list = Lib.M.noSignRequest({
                        "verIfy":this.ruleForm.newEmail,


                        "platform":'3',
                        "session":this.slideInfo.session,
                        "sig":this.slideInfo.sig,
                        "token":this.slideInfo.nc_token,
                        "scene":this.slideInfo.nc_scene,
                      })
                    }else{
                       me.atskMobile = null
                       me.sendMsgDisabled = false;
                      return
                    }
            })
             Lib.M.sendMessage(form,me,send_list,'#newEmailBlock','csessionid66','sig66','token66','scene66');
      }
     
    },
    selectArea(value){
      
    },
    selectProvince(value){
      
      this.defaultProvince = value.value;
      this.allSelect = false;
    },
    selectCity(value){
     
    },
    selected(value){

      this.personInfo.province = value.province.value
      this.personInfo.city = value.city.value
      this.personInfo.county = value.area.value
      this.allSelect = true;
      // this.allSelect = false;

    },
    nextStep(value,formName){
      const that = this;
      if(this.ruleForm.oldCode == ''){
        this.$message({
          type:"error",
          message:"请输入验证码"
        })
/*        const codeInput = document.getElementById('codeInput2');
        const error_msg = document.getElementById("error_msg2");
        codeInput.style.borderColor = "#f00";
        error_msg2.style.display = 'block';*/
        return
      }
      if(value == 'newPhone'){
/*        this.$refs[formName].validate((valid) => {
            if (valid) {*/
              Lib.M.aliBlock('#newPhoneBlock',this,'csessionid22','sig22','token22','scene22')
              const next_list = Lib.M.dataRequest({
                          "userMobile":this.oldPhone,
                          "code":this.ruleForm.oldCode,
              }) 
              Lib.M.ajax({
                    'type':'post',
                    'url':"userkg/chckSmsEmailCode",
                    "data":next_list,
                    'success':function (data){
                      if(data.code == 10000){
                            that.newPhone = true;
                            that.fixPhone = false;
                            that.sendMsgDisabled = false;
                            // that.atskMobile = null;
                            that.newphoneshow2 = true;
                      }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                      }
                    }
              });
/*              }else{
                return false;
              }
        });  */    
      }else if(value == 'newEmail'){
/*           this.$refs[formName].validate((valid) => {
            if (valid) {*/
              Lib.M.aliBlock('#newEmailBlock',this,'csessionid66','sig66','token66','scene66')
              const next_list = Lib.M.dataRequest({
                          "userEmail":this.oldEmail,
                          "code":this.ruleForm.oldCode,
              }) 
              Lib.M.ajax({
                    'type':'post',
                    'url':"userkg/chckSmsEmailCode",
                    "data":next_list,
                    'success':function (data){
                      if(data.code == 10000){
                            that.newEmail = true;
                            that.fixEmail = false;
                            that.sendMsgDisabled = false;
                            that.newEmailShow2 = true;
                            // that.atskMobile = null;
                      }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                      }
                    }
              });
/*              } else {
                return false;
              }
        });  */    

      }

    },
    beforeClose(){
      this.cancel('ruleForm')
    },
    beforeClose2() {
      this.cancel2("ruleForm2");
    },
    out_user_submit(formName) {
      var that = this;
      var list = Lib.M.dataRequest({
        newPwd: this.ruleForm2.newPwd,
        confirmPassword: this.ruleForm2.confirmPwd,
        verIfy: this.oldPhone,
        code: this.ruleForm2.code
      });
      var url = "userkg/updatePwdFromOuter";
      this.$refs[formName].validate(valid => {
        if (valid) {
          Lib.M.ajax({
            type: "post",
            url: url,
            data: list,
            success: function(data) {
              if (data.code == 10000) {
                that.getInitPhone();
                that.$message({
                  message: "提交成功",
                  type: "success"
                });
                that.$refs[formName].resetFields();
                setTimeout(() => {
                  that.cancel2("ruleForm2");
                }, 1000);
              } else {
                that.$message({
                  message: data.message,
                  type: "error"
                });
                setTimeout(() => {
                  that.cancel2("ruleForm2");
                }, 1000);
              }
            }
          });
        }
      });
    },
    cancel2(form) {
      this.settingPsd = false;
      this.$refs[form].resetFields();
      this.ruleForm2.newPwd = "";
      this.ruleForm2.confirmPwd = "";
      this.$refs[form].resetFields()
      window.clearInterval(this.interval);
      this.sendMsgDisabled = false;
      this.ruleForm2.code = "";
      this.handleSlide('','','','');
    },
    cancel(form){
      this.settingPsd = false;
      this.fixPhone = false;
      this.centerDialogVisible = false;
      this.centerMailVisible =false;
      this.fixEmail =false;
      this.sendMsgDisabled = false;
      this.newEmail = false;
      this.newPhone = false;
      this.centerPawVisible = false;
      this.ruleForm.code = "";
      this.ruleForm.oldCode = "";
      this.atskMobile = localStorage.getItem('kg_desk_atskMobile');
      this.$refs[form].resetFields()
      window.clearInterval(this.interval);
      this.handleSlide('','','','')
    },
    save(formName){
      const that = this;
      const column_id = localStorage.getItem('channel_column_id')
      const userId = localStorage.getItem('kg_desk_userId')
      // const roleId = localStorage.getItem('kg_desk_roleId')
      const roleId = this.roleId;
      if(!this.allSelect && this.defaultProvince != ''){
        this.$message({
          type:"warning",
          message:'请选择完整的家乡地址'
        })
        return
      }
     const list = Lib.M.dataRequest({
          "roleId":roleId,
          "userId":userId,
          "sex":this.radio,
          "country":this.personInfo.country,
          "province":this.personInfo.province,
          "city":this.personInfo.city,
          "county":this.personInfo.county,
          "resume":this.personInfo.resume,
          "userName":this.personInfo.userName,
      })
      this.$refs[formName].validate((valid) => {
            if (valid) {
                Lib.M.ajax({
                      'type':'post',
                      'url':'/userprofile/updateProfile',
                      "data":list,
                      'success':function (data){
                       if(data.code == 10000){
                          that.$message({
                            message: '保存成功',
                            type: 'success'
                          });
                          localStorage.setItem('kg_desk_userName',that.personInfo.userName);
                          setTimeout(()=>{
                              location.reload()
                          },1000);
                       }else{
                            that.$message({
                              message: data.message,
                              type: 'error'
                           });
                       }
                      }
                });

              } else {
                return false;
              }
        }); 

    },
    traderChange(item){
      this.traderBingding = item
    },
    test(){
      window.location.reload()
    },
  }
}
</script>

<style scoped>
.accountSafe{
  width:82%;
  background: #fff;
  border-radius: 4px;
  min-height:580px;
}
.baseBox .el-tabs__item.is-active{
  color:#bfc4cf!important;
}
.nickname{
  width:20%;
}
.offer{
  width:80%;
}
.subBtn{
  float:right;
  margin-right: 30px;
}
.bindP{
  text-align: center;
  color:#999999;
}
.bind{
   color:#999999;
}
.phonenum{
  color:#1d87ff;
}
.pBtn{
   text-align: center;
   float:right;
}

.pBtn span{
  display: inline-block;
  background: #1d87ff;
  color:#fff;
  padding:2px 20px;
  border:1px solid #1d87ff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.info{
  color:#828282;
}
.textInfo{
  display: block;
  width: 100%;
  text-align: center;
}
.title{
  color:#989898;
  text-align: center;
}
.forGetBox{
  width:70%;
  margin: 0 auto;
}

.code{
  position: relative;
}
.codeBtn{
  position: absolute;
  right:0px;
  top:4px;
  height:32px;
  background: #1d87ff!important;
  color:#fff!important;
  border-top-left-radius :0;
  border-bottom-left-radius :0;
}
.imgeye{
  width:30px;
  height:25px;
  top:7px;
  right:0;
  position: absolute;
  display: inline-block;
  cursor: pointer;
}
.paw .paw_el{
 position: relative;
}
.el-select{
  width:100%;
}
.error_msg{
  font-size: 12px;
    color: #fa5555;
    text-align: left;
    position: absolute;
    top: 30px;
    left: 0px;
    display: none;
}
</style>
<style>
.el-form .setpsd {
  top: 0px;
  height: 40px;
}
.setAccountSafe .el-dialog .el-button--small{
  padding:9px 15px;
}
  .html_span{
      display: inline-block;
      width:100px;
      margin-right:30px;
      margin-bottom:10px;
      color:#999;
  }
  .safeModal .el-dialog--center .el-dialog__body{
    padding:4px 0px 15px;
  }
  .safeModal .forGetBox{
    width:78%;
    margin:0 auto;
  }
.safeModal .btnModal{
  width: 49%;
}
.safeModal .btnModal2{
  width: 45%;
  float: right;
  margin-top:3px;
}
.approveMessageBox{
  height:300px;
}
.el-message-box .el-message-box__header{
  display: block;
}
.approveMessageBox .el-message-box__message p{
  text-align: left;
}
.html_span{
  margin-left:50px;
  width:122px;
}
.bindMessageBox{
  height:200px;
}
.bindMessageBox .el-message-box__message p{
  text-align: center;
}
.bindMessageBox  .el-message-box__content{
  padding-top:15px;
}

.setAccountSafe .el-dialog__headerbtn .el-dialog__close{
  display: none;
}
</style>
