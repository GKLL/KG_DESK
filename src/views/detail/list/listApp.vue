<template>
  <div id="app" :style = "height">
    <hb-head v-show="isAndroidPlay" ref="head" :showLogin = "showLogin" class="heading" :columnId = "columnId"></hb-head>
    <div class="pcShow">
    <div class = 'container'>
          <div class = 'topImgcontainer' v-if = "topImg[0] != undefined">
            <div class = 'hot_img'  v-if = "topImg[0].imageType == 1">
              <img :src = "imgUrl + topImg[0].imageAddress" class = 'detailImg cursorPointer hoverImgScale' @click = "bannerLink(topImg[0])"/>
            </div> 
            <!-- 广告 -->
             <div class = 'hot_img' v-else-if = "topImg[0].imageType == 2">
              <img :src = "imgUrl + topImg[0].imageAddress" class = 'detailImg cursorPointer hoverImgScale' @click = "bannerLink(topImg[0])"/>
               <span class = 'adver_tag'>广告</span>
            </div>
            <!-- 其他 -->
            <div class = 'hot_img'  v-else-if = "topImg[0].imageType == 3">
              <img :src = "imgUrl + topImg[0].imageAddress" class = 'detailImg cursorPointer hoverImgScale' @click = "bannerLink(topImg[0])"/>
            </div>
          </div>
          <div class = 'container1'>
          <div class="container_left martop20">
              <p class="title">{{articleDetails.articleTitle}}</p>
              <div class="tif font14 martop10">
                <div class="leftBox">
                  <span @click = "toAuthor(articleDetails)" class = 'cursorPointer article_tit color1d87'>{{articleDetails.userColumn}}</span><span>·</span>
                  <span>{{articleDetails.updateDate}}</span><span>·</span>
                  <span>{{articleDetails.articleType == 1 ? '原创' : '转载'}}</span><span>·</span>
                  <span>发布于</span><span  class = 'cursorPointer article_tit color1d87' @click = "toColumn(articleDetails)">{{articleDetails.columnname}}</span>
                </div>
                <div class = 'font12'>
                  <span>{{articleDetails.browseNum}}</span><span>浏览</span><span>·</span>
                  <span>{{articleDetails.comments}}</span><span>评论</span><span>·</span>
                  <span>{{articleDetails.collect}}</span><span>收藏</span>
                </div>
              </div>

              <div class="font14 martop10 abstract">{{articleDetails.articleDescription}}</div>
              <div class = 'parLine'></div>
              <!-- 判断该篇文章是视频文章还是纯文章  -->
              <div v-if = "articleDetails.publishKind == 1" class="font14 article" v-html="articleDetails.articleText">
                
              </div>
              <div v-else class="el_video" @click = "noSave">
                    <video-player  class="video-player vjs-custom-skin"
                         v-if = "(articleDetails.videoFilename != null && articleDetails.videoFilename != '') || (articleDetails.videoUrl != '' && articleDetails.videoUrl != null && articleDetails.videoUrl.indexOf('mp4') != '-1')" 
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true"
                         
                         >
                    </video-player>
                  <iframe v-else-if="(articleDetails.videoFilename == null || articleDetails.videoFilename == '') && articleDetails.videoUrl.indexOf('<iframe') == -1"  style = "width:100%;height:450px" frameborder="0" allowfullscreen="true" :src="articleDetails.videoUrl"></iframe>
                  <div style="height:450px" class="article-iframe" v-else-if="(articleDetails.videoFilename == null || articleDetails.videoFilename == '') && articleDetails.videoUrl.indexOf('<iframe') != -1" v-html="articleDetails.videoUrl"></div>
                  <!-- <div style="height:450px" class="article-iframe" v-html="testIfame"></div> -->
             </div>

               <!-- 判断结束  -->
              <div class="martop20" v-if = "articleDetails.articleType == 2"><span>本文来源：</span><span>{{articleDetails.articleSource}}</span><a :href = "articleDetails.articleLink" class="pl20 qunwen"  target = "_blank">阅读原文</a></div>
              <div class="artFooter font14"  >
                    <p class = 'marR20'>声明：千氪财经登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考，不构成投资建议。投资者据此操作，风险自担。</p>
              </div>
 

              <div class="martop20">
                <div :key = "key" v-for = "(item,key) in bottomImg">
                  <hot-img :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-if = "item.imageType == 1 || item.imageType == 3" />
                  <adver-tag :imgSrc = "imgUrl + item.imageAddress" :item = "item" v-else-if = "item.imageType == 2" class = 'martop10'/>
                  <div class = 'line martop10'></div>
                </div>
              </div>
              <!-- 文章标签 -->
              <div class="martop20" v-if = "HotTags == null ? false : true">
                <div :key = "key" v-for="(t,key) in HotTags"  @click = "toTag(t)" style = "display:inline-block" class = 'detailTag'>
                    <el-tag class = 'cursorPointer marR10' :key = "key" >{{t}}</el-tag>
                </div>

              </div>

              <!-- 打赏 -->
              <div class = 'article_award flexC' v-if = "articleDetails.bonusStatus == 1">
                <span class = 'ico cursorPointer' @click = "awardHandle">赏</span>
                <span>已有{{articleDetails.tipsinCount}}人打赏</span>
              </div>
              <span id='shareSign'></span>
              

              <div id ='shareDiv' class = 'share sharefixed'>

                <div class ='fl flexR'>
                  <img v-if = "articleDetails.columnAvatar != null && articleDetails.columnAvatar != ''" class = 'cursorPointer' :src= "imgUrl + articleDetails.columnAvatar" @click = "toAuthor(articleDetails)"/>
                  <img v-else class = 'cursorPointer' src="../../../assets/img/avatar.png" @click = "toAuthor(articleDetails)"/>
                  <span class = 'cursorPointer' @click = "toAuthor(articleDetails)">{{articleDetails.userColumn}}</span>

                </div>
                <div class = 'right_share'>
                <!-- 浏览倒计时       -->
                <span v-if="isDown">
                </span>
                                  <div class = 'badgeContainer'>
                                          <button :disabled ="goodsDisabled" @click = "onGoods(articleDetails)" v-if = "!goodsVisible" class= 'goodsSpan'>
                                                  <i class = 'icon iconfont icon-zan1  font30 cursorPointer'></i>
                                          </button> 
                                          <button :disabled = "cancelgoodsDisabled" @click = "onGoods(articleDetails)" v-if = "goodsVisible"  class= 'goodsSpan'>
                                              <i class = 'icon iconfont   icon-zan font30 cursorPointer'></i>
                                          </button>
                                          <span class = 'badge'>{{articleDetails.thumbupNum}}</span>
                                  </div> 
                                  <div class = 'badgeContainer'>
                                                <button :disabled = "collectDisabled" @click = "onCollect(articleDetails)" v-if = "!collectVisible" class= 'goodsSpan'><i class = 'icon iconfont   icon-xihuan1 font30 cursorPointer'></i></button> 
                                                <button :disabled = "cancelcollectDisabled" @click = "onCollect(articleDetails)" v-if = "collectVisible" class= 'goodsSpan'><i class = 'icon iconfont  icon-xihuan  font30 cursorPointer '></i></button> 
                                          <span class = 'badge'>{{articleDetails.collect}}</span>
                                   </div> 
                                   <div class = 'badgeContainer'>
                                                <span @click = "toComments"><i class = 'icon iconfont icon-pinglun2 font30 cursorPointer'></i></span> 
                                          <span class = 'badge'>{{articleDetails.comments}}</span>
                                    </div> 
            <!-- 微信分享 -->
            <span  v-popover:popover1 class = 'wechat_share' @mouseover = "codeHover">
                     <el-popover
                        ref="popover1"
                        placement="top"
                        width="230"
                        trigger="hover"
                         >  
                        <div class = 'shareCode'>
                          <span id = 'wechat_code1' class = 'wechatCode'></span>
                          <div>
                            <span class = 'scan font12'>打开微信“扫一扫”就能分享给微信好友或者朋友圈了</span>
                            <span class = 'scan font12' v-if = "shareWeiChat && shareAward != null">
                              <span v-if = "!randomBrowseVisible">在APP中首次分享该篇内容可获得奖励哦</span>
                              <span v-if = "randomBrowseVisible">在APP中首次分享该篇内容可获得奖励哦</span>
                            </span>
                            <span class = 'scan font12' v-if ="shareWeiChatLogin && shareAward != null">
                              <span v-if = "!randomBrowseVisible">在APP中首次分享该篇内容可获得奖励哦</span>
                              <span v-if = "randomBrowseVisible">在APP中首次分享该篇内容可获得奖励哦</span>
                            </span>
                          </div>
                        </div>
                        <p class = 'font12 colorb2b2 martop10' v-if = "shareWeiChatLogin">说明：您将文章分享到微信后，他人在微信内成功打开了这篇文章，即视为您分享成功</p>
                      </el-popover>
                       <i  class = 'icon iconfont icon-wechat font30 cursorPointer '></i>
              </span> 
              <!-- 微博分享 -->
                <span v-popover:popover2 v-if = "shareWeiboAward" class = 'weibo_share'>
                         <el-popover
                           ref="popover2"
                           placement="top"
                           width="230"
                           trigger="hover"
                            >  
                           <p @click = "shareToWeibo" v-if = "shareWeiBoLogin" class = 'cursorPointer color1d87'>点这里分享到微博</p>
                           <p class = 'font12 colorb2b2 martop10' v-if = "shareWeiBoLogin">说明：您将文章分享到微博后，他人在微博内成功打开了这篇文章，即视为您分享成功</p>
                         </el-popover>
                       <i class = 'icon iconfont icon-iconfonticonfontweibo font30 cursorPointer'  @click = "shareToWeibo"></i>
                  </span> 
                 <span v-else>
                      
                       <i class = 'icon iconfont icon-iconfonticonfontweibo font30 cursorPointer' @click = "shareToWeibo"></i>
                  </span>

                </div>
              </div>
              <div class = 'martop20' v-if = "goodsCollectVisbile == 1">
                <p class = 'flexR awardSet'>
                  <span>登录后</span>
                  <span v-if = "goodsAward != null">{{goodsAward.bonusTypename}} 、</span>
                  <span v-if = "collectAward != null">{{collectAward.bonusTypename}}</span>
                  <span v-if = "randomBrowseVisible">您将获得作者的钛值奖励</span>
                  <span v-if = "!randomBrowseVisible">作者将分别奖励</span>
                  <span v-if = "!randomBrowseVisible">{{maxAward}}</span>
                  <span v-if = "!randomBrowseVisible">个钛值</span>
                </p>
                <el-button   type="primary" @click="toLogin()" class = 'toLoginbtn'>马上登录</el-button>
              </div>
              <div class = 'martop20' v-if = "goodsCollectVisbile == 2">
                <p class = 'flexR awardSet'>
                  <span v-if = "goodsAward != null">{{goodsAward.bonusTypename}} ,</span>
                  <span v-if = "collectAward != null">{{collectAward.bonusTypename}}</span>
                  <span v-if = "randomBrowseVisible">您将获得作者的钛值奖励</span>
                  <span v-if = "!randomBrowseVisible">作者将分别奖励</span>
                  <span v-if = "!randomBrowseVisible">{{maxAward}}</span>
                  <span v-if = "!randomBrowseVisible">个钛值</span>
                </p>
              </div>
              <div class = 'line martop20'></div>
              <articles-interest :data = "interestArticles" v-if = "interestArticles.length == 0 ? false : true"/>
              <!-- 评论区 -->
              <a name = 'comments'></a>
              <div class="martop20">
                  <comment :commentList="commentList" :articleDetails = "articleDetails" :toLogin = "toLogin" :fromthird = "fromthird"/> 
              </div> 
          </div>
          <div class="container_right">
              <div class="topbox">
                  <div class="usename">
                    <img v-if = "authorInfo.columnAvatar !=null && authorInfo.columnAvatar != ''"  class = 'cursorPointer' :src=" imgUrl + authorInfo.columnAvatar" @click = "toAuthor(authorInfo)"/> 
                    <img v-else class = 'cursorPointer' src="../../../assets/img/avatar.png" @click = "toAuthor(authorInfo)"/>
                    <div class="font16 cursorPointer omit1 authorName" @click = "toAuthor(authorInfo)">{{authorInfo.columnName}}</div>
                  </div>
                  <div class="toptext omit3 ">{{authorInfo.columnIntro}}</div>
                  <div class="userdata">
                      <div>
                        <h2 v-if="authorInfo.artsum>9999">{{Math.floor((authorInfo.artsum)/1000)/10}}<span class="el_w">w+</span></h2>
                        <h2 v-else> {{authorInfo.artsum}}</h2>
                        <p  class = 'font12'>文章数</p>
                      </div>
                      <div>
                        <h2 v-if="authorInfo.comments>9999">{{Math.floor((authorInfo.comments)/1000)/10}}<span class="el_w">w+</span></h2>
                        <h2 v-else> {{authorInfo.comments}}</h2>
                        <p  class = 'font12'>被评论</p>
                      </div>
                      <div>
                        <h2 v-if="authorInfo.pbowsenum>9999">{{Math.floor((authorInfo.pbowsenum)/1000)/10}}<span class="el_w">w+</span></h2>
                        <h2 v-else> {{authorInfo.pbowsenum}}</h2>
                        <p  class = 'font12'>浏览数</p>
                      </div>
                  </div>
                  <div class="ar">
                      <p>最佳文章</p>
                      <ul>
                          <li v-for = "(item,index) in authorInfo.list" :key="index">
                              <p class = 'omit2 font14 article_tit' @click = "toDetail(item)">{{item.articleTitle}}</p>
                              <div class = 'flexR'>
                                <span class = 'color999 font12'>{{item.updateDate}}</span>
                                <span class = 'color999 num font12'>{{item.bowseNum}}浏览</span>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="martop20">
                <right-img :rightImg="item" :item = "item" v-for = "(item,index) in rightImg" :key="index" class = 'marginBottom27'></right-img>
              </div>
              <top-rank  class="martop20"/>
              <div class = 'next_last_article'>
                <p class = 'font16'>上一篇：</p>
                <a class = 'font14 cursorPointer martop10' 
                  @click = "last_next_article.upArticleTitle == null ? false : toOthers(
                  last_next_article.upArticleId,
                  last_next_article.upArticleAuthor
                  )">
                  {{last_next_article.upArticleTitle == null ? '没有了' : last_next_article.upArticleTitle}}
                </a>
                <p class = 'font16 martop10'>下一篇</p>
                <a class = 'font14 cursorPointer martop10' 
                  @click = "last_next_article.downArticleTitle == null ? false : toOthers(
                  last_next_article.downArticleId,
                  last_next_article.downArticleAuthor
                  )">
                  {{last_next_article.downArticleTitle == null ? '没有了' : last_next_article.downArticleTitle}}
                </a>
              </div>
          </div>
        </div>
    </div>
    <other-footer></other-footer>
     <to-top />

    <award-modal :visible = "awardVisible" :cancel = "closeAward" />
    <!-- 登录 -->
     <login class = 'login_register_modal' :visible = "loginVisible" :toRegister = "toRegister" :toRetrieve = "toRetrieve" :cancel = "cancelLogin"
      :toLoginFast = "toLoginFast" :aliBlock = "aliBlock" :showGetCandy = "showGetCandy"
    />    
    <login-fast-detail class = 'login_register_modal' :visible = "loginfastVisible"  :toRegister = "toRegister"  :toLogin = "toLogin" :cancel = "cancelLogin" :aliBlock = "aliBlock" :slideInfo = "slideInfo" :handleSlides = "handleSlide" :loginfastshow = "loginfastshow"/>
    <!-- 注册 -->
     <register-detail class = 'login_register_modal' :visible = "registerVisible" :toLogin = "toLogin" :cancel = "cancelLogin" :aliBlock = "aliBlock" :showGetCandy = "showGetCandy" :slideInfo = "slideInfo" :handleSlide = "handleSlide" :registershow = "registershow"/>
    <!-- 找回密码 -->
    <retrieve-detail class = 'login_register_modal' :visible = "retrieveVisible" :cancel = "cancelLogin" :aliBlock = "aliBlock" :slideInfo = "slideInfo" :handleSlide = "handleSlide" :retrieveshow = "retrieveshow"/>

    <div v-if = "loadingShow" class = 'loadingGif'>
      <img src = '../../../assets/img/kg.gif'/>
    </div>
        <to-top />
  </div>
  <div class="mobile" @click="touchmove" >
      <message-mobile class="messageBox" :message="message" v-if="ismessage"/>
      <div v-show="isAndroidPlay" class="mobile_titile">
          {{articleDetails.articleTitle}}
      </div>
      <div class="mobile_main">
          <div v-show="isAndroidPlay" class="userInfo">
      	    	<div class="avadImg">
      	    		 <img v-if = "articleDetails.columnAvatar != null && articleDetails.columnAvatar != ''" class = 'cursorPointer' :src= "imgUrl + articleDetails.columnAvatar" @click = "toAuthor(articleDetails)"/>
                  <img v-else class = 'cursorPointer' src="../../../assets/img/avatar.png" @click = "toAuthor(articleDetails)"/>
      	    		<span class="userName"  @click = "toAuthor(articleDetails)">
      	    		{{articleDetails.userColumn}}
      	    	    </span>
      	    	</div>
      	    	<div class="rule">
      	    		{{articleDetails.updateDate}}
      	    	</div>
      	  </div>
          <!-- 移动端文章判断 -->
            <div  v-if = "articleDetails.publishKind == 1" class="font14 article mobile_content" v-html="articleDetails.articleText"></div>
              <div v-else class="mobile_content">
                  <video-player  class="video-player vjs-custom-skin"
                         v-if="(articleDetails.videoFilename != null && articleDetails.videoFilename != '') ||(articleDetails.videoUrl != '' && articleDetails.videoUrl != null && articleDetails.videoUrl.indexOf('mp4') != '-1')" 
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true"
                          @play="onPlayerPlay($event)"
                          @playing="onPlayerPlay($event)"
                          @pause="onPlayerPause($event)"
                          @ended="onPlayerEnd($event)"
                          @statechanged="playerStateChanged($event)"
                          x5-video-player-type="h5"
                         >
                  </video-player>
                  <iframe v-else-if="(articleDetails.videoFilename == null || articleDetails.videoFilename == '') && articleDetails.videoUrl.indexOf('<iframe') == -1" style = "width:100%;height:180px" frameborder="0" allowfullscreen="true" :src="articleDetails.videoUrl"></iframe>
                  <div class="article-iframe" stlye="height:180px" v-else-if="(articleDetails.videoFilename == null || articleDetails.videoFilename == '') && articleDetails.videoUrl.indexOf('<iframe') != -1" v-html="articleDetails.videoUrl"></div>
              </div>
              <!-- 移动端文章判断结束 -->
          <div v-show="isAndroidPlay" class="mobile_info">
             声明：本文经授权发布。如若转载请联系原作者
           </div>
      <div v-show="isAndroidPlay" class="martop20 " v-if = "articleDetails.articleType == 2"><span>本文来源：</span><span>{{articleDetails.articleSource}}</span><a :href = "articleDetails.articleLink" class="pl20 qunwen"  target = "_blank">阅读原文</a>
      </div>
      <!-- 文章标签 -->
      <div v-show="isAndroidPlay" class="martop20" v-if = "HotTags == null ? false : true">
        <div :key = "key" v-for="(t,key) in HotTags"  @click = "toTag(t)" style = "display:inline-block" class = 'detailTag'>
            <el-tag class = 'mobile_cursorPointer marR10' :key = "key" >{{t}}</el-tag>
        </div>
      <div>
      </div>
       <!-- 打赏 -->
        <div v-show="isAndroidPlay" class="mobile_cursor martop20">
          <div class = 'article_award2 flexC' v-if = "articleDetails.bonusStatus == 1">
            <span class = 'mobile_ico cursorPointer' @click = "awardMobileHandle">赏</span>
            <span>赏({{articleDetails.tipsinCount}})</span>
          </div>
          <div class = 'article_award2 flexC'>
                <span :disabled ="goodsDisabled" @click = "onGoods(articleDetails)" v-if = "!goodsVisible" class= 'goodsSpan mobile_ico2 cursorPointer'>
                      <i class = 'icon iconfont icon-dianzan  font30 '></i>
                </span> 
                <span :disabled = "cancelgoodsDisabled" @click = "onGoods(articleDetails)" v-if = "goodsVisible"  class= 'goodsSpan mobile_ico2 cursorPointer colorActive'>
                  <i class = 'icon iconfont   icon-dianzan font30 colorActive'></i>
               </span>
              <span>点赞({{articleDetails.thumbupNum}})</span>
          </div>
        </div>
      </div>
    <div v-show="isAndroidPlay" class="mobile_tuijian">
        为您推荐
    </div>
    <div v-show="isAndroidPlay">
        <div class="mobile_invis" v-for = '(item,index) in interestArticles' :key="index">
            <div class="mobile_InvistImg" @click = "goDetail(item)">
              <img v-if = "item.articleImage != null && item.articleImage != '' && item.articlefrom == 1" :src = "imgUrl + item.articleImage" class = 'hoverImg img_id'/>
              <img v-else-if = "item.articlefrom != 1 && item.articleImage != null && item.articleImage != ''" :src="item.articleImage"  class = 'hoverImg'/>
              <img v-else-if = "item.articleImage != null || item.articleImage != ''" :src="item.defaultImage"  class = 'hoverImg'/>
            </div>o
            <p class="mobile_InvistTitle" @click = "goDetail(item)">
              {{item.articleTitle}}
              </p> 
        </div>
    </div>
    <div>
    
    </div>
    </div>
    <div class="mobile_spacing martop20">
    </div>
         <div>
          <div v-if = "articleDetails.commentSet == 1"  class="boderBotom">
            <div class="mobile_comment">
              <div class="mobile_tuijian">
                说两句吧
              </div>
              <div class="mobile_commentNum">
              {{commentListLength}}条评论
              </div>
            </div>
          </div>
            <ul class="comList">
                <li v-for="(item,index) in commentList" :key="index" class="martop20"> 
                  <div class="userimg">
                    <div class="avadImg">
                    <img v-if = "item.avatar != null" :src="item.avatar" class = 'cursorPointer' @click = "toOther(item)"/>
                    <img v-else src="../../../assets/img/avatar.png" class = 'cursorPointer' @click = "toOther(item)"/>
                    <span class="userName">{{item.userName}}</span>
                    </div>
                    <div class="rule">{{item.commentDate}}</div>
                  </div>
                  <div class="comcontent"> 
                      <p class="martop10" >{{item.commentDesc}}
                      
                      </p>
                  </div>
                </li>
            </ul>
            <div class="more" v-if = 'loadmorebtn'>
              <div>
                <el-button :loading = 'moreLoading' @click = "LoadMore" class = 'loadingMore'>查看更多评论</el-button>
              </div>
            </div>
        </div>
        <div id ='shareDiv2' class = 'share sharefixed '>
          <div>
              <span  class="LeftBox" @click="showCommentBox">吐个槽吧</span>
          </div>
          <div class="collentTime" v-if="isMobileDowm">            
          </div>
          <div>
           <span class="shareBox">
              <span class="parentBox">
              <i class = 'icon iconfont icon-chakan'></i>
              <span class="browseNum">{{articleDetails.browseNum}}</span>
              </span>
              <button :disabled = "collectDisabled" @click = "onCollect(articleDetails)" v-if = "!collectVisible" class= 'goodsSpan'><i class = 'icon iconfont  icon-shoucang cursorPointer'></i></button> 
              <button :disabled = "cancelcollectDisabled" @click = "onCollect(articleDetails)" v-if = "collectVisible" class= 'goodsSpan'><i class = 'icon iconfont  icon-shoucang cursorPointer colorActive'></i>
              </button> 

              <i class = 'icon iconfont icon-icon_share' @click = "showShareBox"></i>
            </span>

          </div>
          <div >

          </div>
      </div>
      <span id='shareSign2'>
        
      </span>
      <mobile-footer></mobile-footer>
      <!-- 评论弹窗 -->
      <div id="bg" class="mobile_mask">
          <div class="commentBox">
              <div class="boxTop">
                  <div class="cancelColor" @click="closeCommentBox">
                      取消
                  </div>
                  <div class="okColor" @click = "addComment">
                      发布
                  </div>
              </div>
              <div class="commentInput">
                  <el-input
                  class="textarea"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容..."
                  v-model="textarea"
                  >
                </el-input>
              </div>
          </div>
      </div>
      <!-- 分享弹窗 -->
      <div id="bg2"  @click="closeShareBox(e)">
          <div class="shaerBox" @click="shareEvernt(event)">
            <div class="mobiele_shareico">
              <div  @click="showBgBox">
                  <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1111/kg-20180326171148.png"/>
                  <div class="ico_text">微信</div>
               </div>
               <div  @click="showBgBox">
                  <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1111/kg-20180326171133.png"/>
                  <div class="ico_text">朋友圈</div>
               </div>
               <div @click="shareToWeibo">
                  <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1111/kg-20180326171153.png"/>
                  <div class="ico_text" >微博</div>
               </div>

             </div>
          </div>
      </div>
      <!-- 分享窗口 -->
       <div id="bg3">
          <div class="bgImg" >
              <img src="../../../assets/img/chuangkou.png" @click="closeBgBox" v-if="shareBg"/>
              <img v-else src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18041801/share_qita.png" @click="closeBgBox" class="share_qita"/>
          </div>
      </div>
      <!-- 手机端打赏弹窗 -->
       <div id="bg4">
          <div class="awardBox">
              <div class="boxTop">
                  <div class="cancelColor" @click="closeMBox">
                      取消
                  </div>
                  <div class="okColor"  @click="nextStep">
                      确认打赏
                  </div>
              </div>
              <div class="mobile_tags">
                 <span :key = "i" class="award_tag cursorPointer" v-for = "(item,i) in data" @click = 'tagChecked(item)'>{{item.label}}</span>
                <span v-if = 'inputVisible' class = 'award_tag cursorPointer custom_input' @click = 'custom'>自定义数额</span>
            <div v-else class = 'cutomContent'>
              <el-input    @change = "onChange(form.value)" id = "custom_input" class = 'custom_input'  v-model = "form.value" type="text"  placeholder = "自定义数额"
               
              ></el-input>
                              
              <span class="tv">TV</span>
            </div>
            </div>
            <span class="awardInfo">说明：每人每天最多打赏5次，每次最多100TV</span>
            </div>
            
          </div>
            <div id="bg6">
                <div class="pay-tool">
                      <div class="pay-tool-title border-bottom">
                            <span class="icon icon-back" @click="backHandle">取消</span><span>请输入交易密码</span>
                            <span v-if="pawLoading">
                              <i class="el-icon-loading"></i>
                            </span>
                            <span @click="onSubmit" v-else>确认</span> 
                      </div>
                      <div class="pay-tool-content">
                          <div class="pay-tool-inputs">
                              <div class="item" v-for="(i,index) in items" :key="index"><span class="icon_dot" v-if="paw[i]"></span></div>
                          </div>
                          <div class="pay-tool-link"><span class = 'martop10 toTraderPwd'>如果还没有交易密码，请去<a class = 'cursorPointer color1d87' @click = "toTraderPwd">设置交易密码</a></span>
                          </div>
                      </div>
                      <div class="pay-tool-keyboard">
                          <ul>
                          <li @click="keyUpHandle($event)" v-for="(val,index) in keys" :key="index">
                          {{ val }}
                          </li>
                          <li class="del" @click="delHandle"><span class="icon-del">删除</span></li>
                          </ul>
                        </div>
                    </div>
            </div>
          <div>
      
 
 </div>
      </div>
        <el-dialog
          :show-close = "showClose"
          :visible="awardV"
          width="600px"
          center
          class= "awardDialog"
          >
          <div class= "awardbox">
            <div class="awardLeftBox">
                <img src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/2018050701.png"/>
            </div>
            <div class="awardRightBox">
              <div class="topIcon"><i class = 'el-icon-error'  @click="awardV = false"></i></div>
              <div class="boxCentert">使用APP浏览该文章可获得钛值奖励哦！</div>
              <span id = 'app_code' class = 'app_download_code'></span>
              <span  class = 'app_text'>扫一扫,下载千氪APP千万豪礼等你拿</span>
              <div slot="footer" class="dialog-footer footer">
                <el-button @click="awardV = false" size="medium">我就不要</el-button>
                <el-button type="primary" @click="downAPP"  size="medium">下载APP</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
        <!-- 手机端提示 -->
        <div id= "bg8"   >
              <div class="tostBox">
                  <div class="toast_title"><i class = 'el-icon-error'  @click="hideBox"></i></div>
                  <div class="toast_content">使用APP浏览该文章，可获得钛值奖励哦！</div>
                  <div class="toast_footer">
                    <div @click="hideBox">我就不要</div>
                    <div @click="gotoAPP">用APP打开</div>
                  </div>
              </div>
         </div>
</div>
</template>

<script>
import QRCode from "qrcodejs2";
import conf from "../../../assets/js/conf"; // 引入邀请链接
import $ from "jquery";
import Lib from "assets/js/Lib";
import HbHead from "components/HbHead";
import OtherFooter from "components/OtherFooter";
import MobileFooter from "components/MobileFooter";
import TopRank from "components/TopRank";
import HotImg from "components/HotImg";
import BestArticle from "components/BestArticle";
import Hours from "components/Hours";
import Comment from "components/Comment";
import CommentMobile from "components/CommentMobile";
import RightImg from "components/RightImg";
import ArticlesInterest from "components/ArticlesInterest";
import AwardModal from "components/AwardModal";
import AdverTag from "components/AdverTag";

import login from "components/Login";
import loginFast from "components/LoginFast";
import LoginFastDetail from "components/LoginFastDetail";
import register from "components/Register";
import registerDetail from "components/RegisterDetail";
import retrieve from "components/Retrieve";
import retrieveDetail from "components/RetrieveDetail";

import CountDown from "components/CountDown";
import ToTop from "components/ToTop";
import MessageMobile from "components/MessageMobile";
import { setTimeout } from 'timers';
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];
export default {
  components: {
    loginFast,
    ToTop,
    CountDown,
    login,
    register,
    retrieve,
    HbHead,
    OtherFooter,
    TopRank,
    RightImg,
    HotImg,
    BestArticle,
    Hours,
    Comment,
    ArticlesInterest,
    AwardModal,
    AdverTag,
    CommentMobile,
    MobileFooter,
    MessageMobile,
    LoginFastDetail,
    registerDetail,
    retrieveDetail
  },
  data() {
    var validateValue = (rule, value, callback) => {
      if (value > 50) {
        callback(new Error("每次最多50TV"));
      } else {
        callback();
      }
    };
    return {
      isAndroidPlay:true,
      testIfame:"<iframe height=498 width=510 src='https://player.youku.com/embed/XMzY3MzgwNjQ1Ng==' frameborder=0 'allowfullscreen'></iframe>",
      columnId:'',
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      paw: [],
      mobileV:false,
      pawLoading: false,
      showClose:false,
      playerOptions: { 
          height: '460',
          autoplay: false,
          muted: false,
          language: 'zh-CN',
          preload: 'auto',
          sources: [{
            type: "video/mp4",
            // mp4
            src: "null",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
      },
      retrieveshow: false,
      registershow: false,
      awardV:false,
      commentListLength:0,
      loginfastshow: false,
      ismobile: false,
      fromthird: null,
      isMobileDowm: false,
      loadingShow: true,
      visible2: false,
      loginVisible: false,
      loginfastVisible: true,
      registerVisible: true,
      retrieveVisible: true,
      mVisible: false,
      aliBlock: false,
      isHeader: true,
      ismessage: false,
      message: "",
      shareBg: false,
      height: {
        height: document.body.clientHeight + "px"
      },
      commentVisible: false,
      shareVisible: false,
      bgVisible: false,
      textarea: "",
      HotTags: null,
      right_hot: {},
      interestArticles: [{}],
      authorInfo: {},
      articleDetails: [{}],
      last_next_article: {},
      next_article: {},
      last_article: {},
      commentList: [{}],
      collectVisible: false,
      awardVisible: false,
      wechatConfig: null,
      goodsVisible: false,
      loadmorebtn: false,
      articleImg: [{}],
      imgUrl: Lib.C.imgUrl,
      item: {},

      //阅读奖励
      browseAward: null,
      goodsAward: null,
      collectAward: null,
      isDown: false,
      goodsCollectVisbile: null,
      randomBrowseVisible: false,
      shareWeiboAward: false,
      maxAward: "",
      //分享奖励
      shareAward: null,
      shareWeiChat: false,
      shareWeiChatLogin: false,
      shareWeiBo: false,
      shareWeiBoLogin: false,
      //元素距离顶部距离
      shareTop: "0",
      canvansImg: "",
      //推荐位图片
      topImg: [{}],
      bottomImg: [{}],
      rightImg: [{}],
      share_user_id: "",
      article_id: "",

      // 获取txb
      getCandyVisible: false,
      candyMaskVisible: false,

      goodsDisabled: false,
      cancelgoodsDisabled: false,
      collectDisabled: false,
      cancelcollectDisabled: false,
      isUpdate: 0,
      currentPage: 1,
      data: [
        { value: "1", label: "1TV", iscur: "true" },
        { value: "3", label: "3TV", iscur: "false" },
        { value: "5", label: "5TV", iscur: "false" },
        { value: "10", label: "10TV", iscur: "false" },
        { value: "15", label: "15TV", iscur: "false" },
        { value: "20", label: "20TV", iscur: "false" },
        { value: "30", label: "30TV", iscur: "false" },
        { value: "50", label: "50TV", iscur: "false" }
      ],
      checkedVal: "1",
      inputVisible: true,
      pswVisible: false,
      form: {
        password: "",
        value: ""
      },
      password: "",
      rules: {
        password: [
          { required: true, message: "请输入交易密码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "请输入6位交易密码（数字）",
            trigger: "blur"
          }
        ],
        value: [{ validator: validateValue, trigger: "blur" }]
      },
      loading: false,
      moreLoading: false,
      slideInfo: {
        session: "",
        sig: "",
        token: "",
        scene: ""
      }
    };
  },
  computed:{
    awardV:function(){
      return false
    }
    
  },
  created(){
    this.columnId = Lib.M.getUrlQuery('c');
  },
  mounted() {
  // window.addEventListener("popstate", function(e) { 
  //   alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能 
  //   }, false);
    var u = navigator.userAgent;
    // var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    window.addEventListener("scroll", this.onScroll);
    var _width = $(window).width();
    if (_width < 768) {
      $("#app").addClass("isMobile");
      this.ismobile = true;
      this.isDown = false;
      this.isMobileDowm = true;
      $(document).ready(function() {
        $(window).resize(function() {
          var windowWidth = $(window).innerWidth();
          var windowHeight = $(window).innerHeight();
          $(".c-h5").css({
            width: windowWidth,
            height: "220px"
          });
        });
      });
    } else {
      $("#app").removeClass("isMobile");
      this.ismobile = false;
      this.isDown = true;
      this.isMobileDowm = false;
    }
    const that = this;
    let Request = new Object();
    Request = Lib.M.GetRequest();
    let article_id, author_id, column_id, article_tags, display_order, user_id;
    let detail_url = window.location.href;
    const share_weibo_index = detail_url.indexOf("tsina");
    let indexTitle = document.getElementsByTagName("title")[0];

    author_id = Base64.decode(localStorage.getItem("author_id"));
    column_id = Base64.decode(localStorage.getItem("column_id"));
    display_order = Base64.decode(localStorage.getItem("display_order"));
    user_id = localStorage.getItem("kg_desk_userId");

    // article_id = Base64.decode(Request['article_id']);
    let url_id = Request["id"];
    url_id = url_id.split("_");
    this.article_id = Base64.decode(url_id[0]);
    this.share_user_id = url_id[1];
    if (url_id[1] == "" && user_id != null && share_weibo_index == "-1") {
      window.location.href =
        "../detail/list.html?id=" +
        Base64.encode(this.article_id) +
        "_" +
        user_id;
      return;
    }

    // this.user_id = user_id;
    //资讯详情
    const articleDetails = Lib.M.dataRequest({
      articleId: this.article_id,
      userId: user_id
    });
    Lib.M.ajax({
      type: "post",
      url: "/article/selectByiddetails",
      data: articleDetails,
      success: function(data) {
        if (data.code == 30002) {
          that.$alert("该页面内容暂时无法访问", {
            confirmButtonText: "知道了",
            center: true,
            callback: action => {
              location.href = "../index/list.html";
            }
          });
        }
        that.loginfastVisible = false;
        that.registerVisible = false;
        that.retrieveVisible = false;
        setTimeout(() => {
          that.loadingShow = false;
        }, 500);
        data = data.responseBody.data;
        let $mobile_content = $(".mobile .mobile_content");
        setTimeout(() => {
          let width = $mobile_content.width();
          $mobile_content.find("iframe").height(width * 0.5625);
        }, 100);
        indexTitle.innerHTML = data.articleTitle;
        that.articleDetails = data;
        that.columnId = data.columnId;
        that.playerOptions.sources[0].src = data.videoUrl;
        document
          .querySelector('meta[name="keywords"]')
          .setAttribute(
            "content",
            data.articleTagnames == null
              ? "区块链,数字货币,股票,财经,证券,基金,债券,期货,外汇,保险理财,银行,网贷"
              : data.articleTagnames
          );
        document
          .querySelector('meta[name="description"]')
          .setAttribute(
            "content",
            data.articleDescription == null
              ? "千氪财经（Kg.com）—金融财经综合门户，提供7*24小时全天候金融财经资讯服务，包括区块链、数字货币、股票、银行、证券、保险、期货、网贷等行业及时权威的要闻推送.并为用户提供一站式金融投资和理财交流服务平台。"
              : data.articleDescription
          );
        if (user_id != null) {
          that.goodsVisible = data.praisestatus === 0 ? false : true;
        } else {
          that.goodsVisible = false;
        }
        that.collectVisible = data.collectstatus === 0 ? false : true;
        that.HotTags =
          data.articleTagnames == null ? null : data.articleTagnames.split(",");
        //判断阅读奖励状态
        if (data.listArtBonus != null) {
          for (var i in data.listArtBonus) {
            //浏览奖励
            if (data.listArtBonus[i].bonusType == 1&& data.getStatus != 1) {
              var _width = $(window).width();
              if(_width>768){
                  that.awardV = true;
                  setTimeout(()=>{
                    var app_url = conf.devIp + "appDownload/list.html";
                    const wechatCode = document.getElementById("app_code");
                    var box = document.getElementById("app_code").childNodes;
                    if (!box.length) {
                      new QRCode(wechatCode, {
                        text: app_url,
                        width: 112,
                        height: 112,
                        colorDark: "#000000",
                        colorLight: "#ffffff"
                      });
                    }
                    },100)   
              }else{
                  //that.mobileV = true;
                  that.showBox();
              }
            } 
              // that.browseAward = data.listArtBonus[i]
             
              
              //that
                // .$confirm("", "使用APP浏览该文章，可获得钛值奖励哦！", {
                //   dangerouslyUseHTMLString: true,
                //   confirmButtonText: "下载APP",
                //   cancelButtonText: "我就不要",
                //   center: true,
                //   customClass: "mobilde_cofirmBox"
                // })
                // .then(() => {
                //   var _width = $(window).width();
                //   if (_width < 768) {
                //     const url = window.location.href;
                //     localStorage.setItem("loginUrl", url);
                //     window.location.href = "../login/list.html";
                //   } else {
                //     window.location.href = '../appDownload/list.html'
                //   }
                // })
                // .catch(() => {
                //   /*                                  const wechat_code1 = document.getElementById("wechat_code1")
                //             new QRCode(wechat_code1, {
                //                 text: detail_url,
                //                 width: 100,
                //                 height: 100,
                //                 colorDark: "#000000",
                //                 colorLight: "#ffffff"
                //             })*/
                // });
            }
            switch (data.listArtBonus[i].bonusType) {
              /*                        case 1:
                          that.browseAward = data.listArtBonus[i]
                        break;*/
              case 2:
                that.goodsAward = data.listArtBonus[i];
                break;
              case 3:
                that.collectAward = data.listArtBonus[i];
                break;
              case 4:
                that.shareAward = data.listArtBonus[i];
                break;
            }
            //随机奖励
            if (data.listArtBonus[i].bonusKind == 2) {
              that.randomBrowseVisible = true;
            }
        }
        //点赞、收藏奖励
        if (that.goodsAward != null || that.collectAward != null) {
          if (that.goodsAward != null && that.collectAward != null) {
            if (that.goodsAward.bonusValue > that.collectAward.bonusValue) {
              that.maxAward = that.goodsAward.bonusValue;
            } else {
              that.maxAward = that.collectAward.bonusValue;
            }
          } else if (that.goodsAward != null && that.collectAward == null) {
            that.maxAward = that.goodsAward.bonusValue;
          } else {
            that.maxAward = that.collectAward.bonusValue;
          }
          if (
            (that.goodsAward != null || that.collectAward != null) &&
            user_id == null
          ) {
            that.goodsCollectVisbile = 1;
          } else {
            that.goodsCollectVisbile = 2;
          }
        }
        //分享奖励
        //微信分享
        //41：首次分享成功至微信或微博，42：首次分享成功至微信，43：首次分享成功至微博
        if (
          user_id != null &&
          (that.shareAward.bonusSecondType == 41 ||
            that.shareAward.bonusSecondType == 42)
        ) {
          that.shareWeiChatLogin = true;
        } else if (
          user_id == null &&
          (that.shareAward.bonusSecondType == 41 ||
            that.shareAward.bonusSecondType == 42)
        ) {
          that.shareWeiChat = true;
        }

        //微博分享
        if (
          user_id != null &&
          (that.shareAward.bonusSecondType == 41 ||
            that.shareAward.bonusSecondType == 43)
        ) {
          that.shareWeiBoLogin = true;
          // that.shareWeiBo  = true;
          that.shareWeiboAward = true;
        } else if (
          user_id == null &&
          (that.shareAward.bonusSecondType == 41 ||
            that.shareAward.bonusSecondType == 43)
        ) {
          // that.shareWeiBoLogin = true;
          that.shareWeiBo = true;
          that.shareWeiboAward = true;
        }

        if (
          that.shareAward.bonusSecondType == 41 ||
          that.shareAward.bonusSecondType == 43
        ) {
          //微博分享奖励
          // if (share_weibo_index != "-1" && that.share_user_id != "") {
          //   let share_weibo_list = Lib.M.dataRequest({
          //     userId: that.share_user_id,
          //     articleId: that.article_id,
          //     source: "Weibo"
          //   });
          //   Lib.M.ajax({
          //     type: "post",
          //     url: "/account/updateUserbalance/",
          //     data: share_weibo_list,
          //     success: function(data) {
          //       if (data.code == 10000) {
          //       /*  that.$message({
          //           type: "success",
          //           message: "微博分享成功"
          //         });*/
          //       }
          //       // loading.close();
          //     }
          //   });
          // }
        }
      }
    });

    //作者栏
    const author_list = Lib.M.dataRequest({ articleId: this.article_id });
    Lib.M.ajax({
      type: "post",
      url: "/userprofile/selectByuserprofileid",
      data: author_list,
      success: function(data) {
        data = data.responseBody.data;
        const data_list = data.list;
        /*              if(data_list.length != 0){
                for(var i in data_list){
                    data_list[i].updateDate = Lib.M.fmtDate(data.list[i].updateDate)
                }              
              }*/
        that.authorInfo = data;
      }
    });
    //感兴趣的文章
    const interest_list = Lib.M.dataRequest({ articleId: this.article_id });
    Lib.M.ajax({
      type: "post",
      url: "article/relatedArticle",
      data: interest_list,
      success: function(data) {
        data = data.responseBody.data;
        for (var i in data) {
          const defaultImg =
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/180327/aticle" +
            Math.round(Math.random() * 32) +
            ".png";
          // const defaultImg = require("../../../assets/img/aticle"+ Math.round(Math.random()*32) + ".png")
          if (data[i].articleImage == null || data[i].articleImage == "") {
            data[i].defaultImage = defaultImg;
          }
        }
        that.interestArticles = data;
        var divImg = document.getElementsByClassName("img_id");
        var _width = $(window).width();
        if (_width < 768) {
          var divImg = $(".mobile_InvistImg");
          for (var i in data) {
            if (
              data[i].articleImage != null &&
              data[i].articleImag != "" &&
              data[i].articlefrom == 1
            ) {
              divImg[i].css(
                "backgroundImage",
                url(imgUrl + data[i].articleImage)
              );
            } else {
              divImg[i].css("backgroundImage", data[i].articleImage);
            }
            divImg[i].css("backgroundPosition", "center center");
            divImg[i].css("backgroundRepeat", "no-repeat");
          }
        } else {
        }
      }
    });
    //上下篇文章
    const next_last_list = Lib.M.dataRequest({ articleId: this.article_id });
    Lib.M.ajax({
      type: "post",
      url: "article/getUpdownArticle",
      data: next_last_list,
      success: function(data) {
        data = data.responseBody.data;
        that.last_next_article = data[0];
        setTimeout(() => {}, 1000);
      }
    });

    // }

    //浏览奖励
    const brower_list = Lib.M.dataRequest({
      userId: user_id,
      articleId: this.article_id,
      operType: 4
    });
    Lib.M.ajax({
      type: "post",
      url: "/usercollect/addCollect",
      data: brower_list,
      success: function(data) {
        if (data.code == 10000) {
        }
      }
    });

    //详情页推荐图片
    const images_list = Lib.M.dataRequest({ navigator_pos: 4 });
    Lib.M.ajax({
      type: "post",
      url: "/siteimageapi/listsiteimage",
      data: images_list,
      success: function(data) {
        data = data.responseBody;
        if (data.length != 0) {
          for (var i in data) {
            switch (data[i].imagePos) {
              case 41:
                that.topImg.push(data[i]);
                break;
              case 42:
                that.bottomImg.push(data[i]);
                break;
              case 43:
                that.rightImg.push(data[i]);
                break;
              default:
            }
          }
        }
        that.topImg.splice(0, 1);
        that.bottomImg.splice(0, 1);
        that.rightImg.splice(0, 1);

        that.topImg = that.topImg.slice(0, 2);
        that.bottomImg = that.bottomImg.slice(0, 2);
        that.rightImg = that.rightImg.slice(0, 2);
      }
    });
    //微信分享
    const wechat_list = Lib.M.noSignRequest({
      url: window.location.href.split("#")[0]
    });
    //调后台接口 返回config 配置
    Lib.M.weixinAjax({
      type: "post",
      url: "weixin/weixinConfig",
      data: wechat_list,
      success: function(data) {
        if (data.code == 10000) {
          data = data.responseBody;
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });
          setTimeout(() => {
            that.wxInit(data);
          }, 2000);
        }
      }
    });

    //评论列表
    this.getComment(1);
  },
   computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
  //相关操作事件
  methods: {
    onPlayerPlay(e){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      const pauseBtn = $(".vjs-custom-skin .vjs-play-control")
      
      if(isAndroid){
        this.isAndroidPlay = false
        pauseBtn.css("display",'none')
      }  
    },
     playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
    onPlayerPause(player) {
      const fullscreen = document.getElementsByClassName('vjs-fullscreen')[0];
      var u = navigator.userAgent;
        // const pauseBtn = document.getElementsByClassName('vjs-play-control')[0];
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      // alert('fullscreen:'+fullscreen)
      if(isAndroid){
        this.isAndroidPlay = true
        
      }
    },
    onPlayerEnd(player) {
      var u = navigator.userAgent;
      //  const pauseBtn = document.getElementsByClassName('vjs-play-control')[0];
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if(isAndroid){
        this.isAndroidPlay = false
          // pauseBtn.style.display = 'block'
      }
    },
    backHandle() {
      $("#bg6").css("display", "none");
      this.commonHide();
      this.paw = [];
      document.body.style.overflow = "visible";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
      },
      keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.paw.length;
      if (!text || len >= 6) {
      return;
      } else {
      this.paw.push(text);
      this.ajaxData();
      }
      },
      delHandle() {
      if (this.paw.length <= 0) return false;
      this.paw.shift();
      },
      ajaxData() {
      if (this.paw.length >= 6) {
      }
      return false;
      },
      clearPasswordHandle: function() {
      this.paw = [];
      },
    noSave() {
      $("#myvideo").bind("contextmenu", function() {
        return false;
      });
    },
    handleSlide(session, sig, nc_token, nc_scene) {
      this.slideInfo.session = session;
      this.slideInfo.sig = sig;
      this.slideInfo.nc_token = nc_token;
      this.slideInfo.nc_scene = nc_scene;
    },
    toOther(item) {
      const userId = localStorage.getItem("kg_desk_userId");
      if (item.userId == userId) {
        window.open("../account/details.html#/myTreasure");
      } else {
        window.open("../others/list.html?other_id=" + item.userId);
      }
    },
    codeHover() {
     const wechat_code1 = document.getElementById("wechat_code1");
      while (wechat_code1.hasChildNodes()) {
        wechat_code1.removeChild(wechat_code1.firstChild);
      }
      new QRCode(wechat_code1, {
        text: window.location.href,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    },
    getCandyHandle() {
      window.location.href = "../account/details.html";
    },

    cancelGetVisible() {
      this.getCandyVisible = false;
      this.candyMaskVisible = false;
      window.location.reload();
    },
    showGetCandy() {
      this.getCandyVisible = true;
      this.candyMaskVisible = true;
      // window.location.reload();
    },
    showCommentBox() {
      const id = localStorage.getItem("kg_desk_userId");
      if (id == null) {
        /*  this.$message({
          message: "请先登录...",
          type: "warning"
        });*/
        this.ismessage = true;
        this.message = "请先登录";
        this.closeMessage(1500);
        return;
      }
      this.commonShow();
      $("#bg").css("display", "block");
      // $('html,body').animate({scrollTop: '0px'}, 100);
      $("#bg").bind(
        "touchmove",
        function(e) {
          e.preventDefault();
        },
        false
      );
      document.body.style.overflow = "hidden";
      // document.html.style.height="100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    },
    closeCommentBox() {
      //this.commentVisible = false;
      this.commonHide();
      $("#bg").css("display", "none");
      document.body.style.overflow = "visible";
      // document.html.style.height="auto";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    },
    commonShow() {
      //this.commentVisible = true;
      $(".heading").css("display", "none");
      // $(".mobile_titile").css("paddingTop", "60px");
    },
    commonHide() {
      $(".heading").css("display", "block");
      // $(".mobile_titile").css("paddingTop", "140px");
    },
    showShareBox() {
      this.commonShow();
      $("#bg2").css("display", "block");
      this.shareVisible = true;
      $("#bg2").bind("touchmove", function(e) {
        e.preventDefault();
      });
      document.body.style.overflow = "hidden";
      // document.html.style.height="100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    },
    closeShareBox(event) {

      this.commonHide();
      $("#bg2").css("display", "none");
      document.body.style.overflow = "visible";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    },
    showBgBox() {
      var is_wechat = this.is_weixn();
      if (is_wechat) {
        this.shareBg = true;
      } else {
        this.shareBg = false;
      }
      $("#bg2").css("display", "none");
      $("#bg3").css("display", "block");
      this.commonShow();
      $("#bg3").bind("touchmove", function(e) {
        e.preventDefault();
      });
      document.body.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    },
    closeBgBox() {
      this.commonHide();
      $("#bg3").css("display", "none");
      document.body.style.overflow = "visible";
      // document.html.style.height="auto";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    },

    shareEvernt(evernt) {
      event.stopPropagation(); //阻止事件冒泡即可
    },
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    bannerLink(item) {
      if (item.imageType == 1) {
        item.articleId = item.imageDetail;
        // window.open(item.imageDetail)
        Lib.M.goDetail(item);
      } else {
        window.open(item.imageDetail);
      }
    },
    toComments() {
      location.href = "#comments";
    },
    onScroll: function(e, position) {
      var scrollTop = 0;
      var shareSign = document.getElementById("shareSign");

      var top = shareSign.offsetTop - 600;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      var shareDiv = document.getElementById("shareDiv");
      if (scrollTop > top) {
        shareDiv.setAttribute("class", "share");
      } else {
        shareDiv.setAttribute("class", "share sharefixed");
      }
      const fixedNav = document.getElementsByClassName("nav");
    },
    onScrollTwo: function(e, position) {
      var scrollTop = 0;
      var shareSign2 = document.getElementById("shareSign2");

      var top = shareSign2.offsetTop - 600;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      var shareDiv2 = document.getElementById("shareDiv2");
      if (scrollTop > top) {
        shareDiv.setAttribute("class", "share");
      } else {
        shareDiv.setAttribute("class", "share sharefixed");
      }
    },
    //滚动加载评论
    onScrollComment() {
      var scrollTop = 0;
      var shareSign5 = document.getElementById("shareSign5");
      var comList = document.getElementsByClassName("comList");
      var top = shareSign5.offsetTop - 10;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      var shareDiv2 = document.getElementById("shareDiv2");
      if (scrollTop > top) {
        this.LoadMore();
      }
    },
    //点赞、收藏奖励
    goodsCollectAward(type) {
      // 1浏览 2点赞 3收藏 41：首次分享成功至微信或微博，42：首次分享成功至微信，43：首次分享成功至微博
      let Request = new Object();
      Request = Lib.M.GetRequest();
      const article_id = this.article_id;
      const author_id = Base64.decode(localStorage.getItem("author_id"));
      const award_list = Lib.M.dataRequest({
        userId: author_id,
        articleId: article_id,
        operType: type
      });
      Lib.M.ajax({
        type: "post",
        url: "/usercollect/addCollect",
        data: award_list,
        success: function(data) {
          if (data.code == 10000) {
          }
        }
      });
    },
    //打开登录框
    toLogin() {
      this.loginVisible = true;
      this.registerVisible = false;
      this.retrieveVisible = false;
      this.loginfastVisible = false;
    },
    toLoginFast() {
      const me = this;
      this.loginfastVisible = true;
      this.loginVisible = false;
      this.loginfastshow = true;

      this.handleSlide("", "", "", "");
      setTimeout(function(){
        Lib.M.aliBlock(
          "#loginfastDetailBlock0001",
          me,
          "csessionid0001",
          "sig0001",
          "token0001",
          "scene0001"
        );
      },200)

    },
    toRegister() {
      const me = this;
      this.registerVisible = true;
      this.registershow = true;
      this.handleSlide("", "", "", "");
       setTimeout(function(){
      Lib.M.aliBlock(
        "#registerDetailBlock",
        me,
        "csessionid0003",
        "sig0003",
        "token0003",
        "scene0003"
      );
            },200)
    },
    toRetrieve() {
      const me = this;
      this.loginVisible = false;
      this.retrieveshow = true;
      this.retrieveVisible = true;
      this.handleSlide("", "", "", "");
       setTimeout(function(){
      Lib.M.aliBlock(
        "#retrieveDetailBlock",
        me,
        "csessionid0002",
        "sig0002",
        "token0002",
        "scene0002"
      );
       },200)
    },
    cancelLogin() {
      this.registerVisible = false;
      this.loginVisible = false;
      this.retrieveVisible = false;
      this.loginfastVisible = false;
      // this.aliBlock = false;
      this.handleSlide("", "", "", "");
    },
    showLogin(item) {
      item = true;
    },
    //打赏点击
    tagChecked(item) {
      let tags = document.getElementsByClassName("award_tag");
      for (var i = 0, l = tags.length; i < l; i++) {
        if (tags[i].innerText == item.label) {
          tags[i].style.backgroundColor = "#007AFF";
          tags[i].style.color = "#fff";
        } else {
          tags[i].style.backgroundColor = "#eee";
          tags[i].style.color = "#333";
        }
      }
      this.form.value = "";
      this.checkedVal = item.value;
      this.inputVisible = true;
    },
    custom() {
      let tags = document.getElementsByClassName("award_tag");
      // custom_input.select();
      this.$nextTick(function() {
        const custom_input = document.getElementById("custom_input");
        const custom_input1 = document.getElementsByClassName(
          "custom_input"
        )[0];
      });
      // document.execCommand("Copy")
      for (var i = 0, l = tags.length; i < l; i++) {
        tags[i].style.backgroundColor = "#eee";
        tags[i].style.color = "#333";
      }
      this.checkedVal = "";
      this.form.value = "";
      this.inputVisible = false;
    },
    //微信分享
    wxInit(sd) {
      const that = this;
      let Request = new Object();
      Request = Lib.M.GetRequest();
      let links = window.location.href.split("#")[0]; //分享出去的链接
      let title = this.articleDetails.articleTitle; //分享的标题
      let desc = this.articleDetails.articleDescription.slice(0, 40) + "..."; //分享的详情介绍
      let articleImage =
        this.articleDetails.articlefrom == 1
          ? this.imgUrl +
            this.articleDetails.articleImage +
            "?x-oss-process=image/resize,h_100"
          : this.articleDetails.articleImage;

      //生成微信二维码
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: links, // 分享链接'
          imgUrl: articleImage, // 分享图标
          success: function() {
            // 分享纪录
            // shareRecord();

            //获取微信分享奖励
            // alert('userId',Request['user_id'])
            if (that.share_user_id == null) {
              return;
            }
            const articles_list = Lib.M.dataRequest({
              userId: that.share_user_id,
              articleId: that.article_id,
              source: "Weixin"
            });
            // Lib.M.ajax({
            //   type: "post",
            //   url: "/account/updateUserbalance/",
            //   data: articles_list,
            //   success: function(data) {
            //     if (data.code == 10000) {
            //       that.$message({
            //         type: "success",
            //         message: "分享成功"
            //       });
            //       that.bgVisible = false;
            //     }

            //     // loading.close();
            //   }
            // });
          },
          cancel: function() {}
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: articleImage, // 分享图标
          success: function() {
            // alert('userId',Request['user_id'])

            if (that.share_user_id == null) {
              return;
            }

            const articles_list = Lib.M.dataRequest({
              userId: that.share_user_id,
              articleId: that.article_id,
              source: "Weixin"
            });
            // Lib.M.ajax({
            //   type: "post",
            //   url: "/account/updateUserbalance/",
            //   data: articles_list,
            //   success: function(data) {
            //     if (data.code == 10000) {
            //       that.$message({
            //         type: "success",
            //         message: "分享成功"
            //       });
            //     }

            //     // loading.close();
            //   }
            // });
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    },

    closeAward() {
      this.awardVisible = false;
    },
    awardHandle() {
      const id = localStorage.getItem("kg_desk_userId");
      if (id == null) {
        this.$message({
          message: "请先登录...",
          type: "warning"
        });
        return;
      }
      if (id == this.articleDetails.createUser) {
        this.$message({
          message: "不能打赏自己发表的文章...",
          type: "warning"
        });
        return;
      }
      this.awardVisible = true;
    },
    onChange(value) {

      let reg = /^[1-9]\d*$/;
      if (value) {
        if (value > 999999 || new RegExp(reg).test(value) == false) {
          value = "";
        }
      }
    },
    awardMobileHandle() {
      const that = this;
      const id = localStorage.getItem("kg_desk_userId");

      if (id == null) {
        that.ismessage = true;
        that.message = "请先登录";
        this.closeMessage(3000);
        return;
      }
      if (id == this.articleDetails.createUser) {
        that.ismessage = true;
        that.message = "不能打赏自己发表的文章";
        this.closeMessage(3000);
        return;
      }
      //this.mVisible = true;
      this.commonShow();
      $("#bg4").css("display", "block");
      $("#bg4").bind("touchmove", function(e) {
        e.preventDefault();
      },false);
      document.body.style.overflow = "hidden";
      // document.html.style.height="100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    },

    closeMBox() {
      $("#bg4").css("display", "none");
      this.commonHide();
      document.body.style.overflow = "visible";
      // document.html.style.height="auto";
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
    },
    toDetail(item) {
      Lib.M.goDetail(item);
    },
    closeMessage(t) {
      setTimeout(() => {
        this.ismessage = false;
      }, t);
    },
    shareToWeibo() {

      this.shareVisible = false;
      let url = window.location.href.split('#')[0];
      const articleImage =
        this.articleDetails.articlefrom == 1
          ? this.imgUrl + this.articleDetails.articleImage
          : this.articleDetails.articleImage;
      const share_url =
        "http://share.baidu.com/s?type=text&searchPic=1&sign=on&to=tsina&key=595885820&url=" +
        url +
        "&title=" +
        this.articleDetails.articleTitle +
        "&pic=" +
        articleImage;
      window.open(
        share_url,
        "newwindow",
        "height=400,width=400,top=100,left=100"
      );
    },
    toOthers(id, authorId) {
      window.open(
        "../detail/list.html?id=" +
          Base64.encode(id) +
          "_" +
          localStorage.getItem("kg_desk_userId")
      );
      localStorage.setItem("author_id", Base64.encode(authorId));
    },
    onCollect(item) {
      let Request = new Object();
      Request = Lib.M.GetRequest();
      const that = this;
      const collect_list = Lib.M.dataRequest({
        operType: 1,
        articleId: this.article_id,
        userId: localStorage.getItem("kg_desk_userId")
      });
      if (!this.collectVisible) {
        //收藏
        Lib.M.onCollect(collect_list, "收藏成功", that);
        // this.goodsCollectAward(3)
      } else {
        //取消收藏
        Lib.M.cancelCollect(collect_list, "取消收藏成功", that);
      }
    },
    onGoods(item) {
      let Request = new Object();
      Request = Lib.M.GetRequest();
      const userId = localStorage.getItem("kg_desk_userId");
      const that = this;
      let goods_list = {
        operType: 2,
        articleId: this.article_id
        // "userId":localStorage.getItem("kg_desk_userId"),
      };
      //判断是否登录
      if (userId == null) {
        /*              me.$message({
               message:'请先登录!',
               type: 'warning'
              });
              return*/
        that.goodsVisible = true;
        goods_list = Lib.M.dataRequest(goods_list);
        Lib.M.onGoods(goods_list, "点赞成功", that);
      } else {
        goods_list.userId = userId;
        goods_list = Lib.M.dataRequest(goods_list);
        if (!this.goodsVisible) {
          //点赞
          Lib.M.onGoods(goods_list, "点赞成功", that);
          // this.goodsCollectAward(2)
        } else {
          //取消点赞
          Lib.M.cancelGoods(goods_list, "取消点赞成功", that);
        }
      }
    },
    toTag(item) {
      Lib.M.goTag(item);
    },
    toAuthor(item) {
      Lib.M.goAuthor(item);
    },
    toColumn(item) {
      Lib.M.goSubColumn(item);
    },
    getComment(currentPage) {
      const that = this;
      //获取评论列表
      const comment_list = Lib.M.dataRequest({
        articleId: this.article_id,
        currentPage: currentPage
      });
      Lib.M.ajax({
        type: "post",
        url: "userComment/getCommentArtAll",
        data: comment_list,
        success: function(data) {
          that.loadmorebtn = data.responseBody.totalNumber <= 20 ? false : true;
          var commentList = data.responseBody.data;
          that.commentList = commentList;
          that.commentListLength = data.responseBody.totalNumber;
          that.commentList.forEach((element, index) => {
            if (element.avatar != null && element.avatar != "") {
              if (element.avatar.indexOf("http") == "-1") {
                element = Object.assign(element, {
                  avatar: Lib.C.imgUrl + element.avatar
                });
                element = Object.assign(element, { realavatar: 1 });
              } else {
                element = Object.assign(element, { avatar: element.avatar });
                element = Object.assign(element, { realavatar: null });
              }
            }
          });
        }
      });
    },
    addComment() {
      if (Lib.V.validateTrimStr(this.textarea) == "") {
        this.ismessage = true;
        this.message = "发表内容不能为空";
        this.closeMessage(1500);

        return;
      } else if (this.textarea.length > 500) {
        this.ismessage = true;
        this.message = "请输入1-500个字符";
        this.closeMessage(2000);
        // this.$message({
        //   message: '',
        //   type: 'warning'
        // });
        return;
      }
      const that = this;
      let Request = new Object();
      Request = Lib.M.GetRequest();
      const add_comment_list = Lib.M.dataRequest({
        articleId: this.article_id,
        commentDesc: this.textarea,
        userId: localStorage.getItem("kg_desk_userId")
      });
      this.moreLoading = true;
      Lib.M.ajax({
        type: "post",
        url: "userComment/addComment",
        data: add_comment_list,
        success: function(data) {
          if (data.code == 10000) {
            that.getComment(1);
            that.currentPage = 1;
            that.moreLoading = false;
            $("#bg").css("display", "none");
            that.commonHide();
            document.body.style.overflow = "visible";
            document.body.style.overflow = "visible";
            document.body.style.height = "auto";
            that.textarea = "";
            that.ismessage = true;
            that.message =
              that.articleDetails.commentAudit == 1
                ? "评论成功，需要审核，请耐心等待"
                : "评论成功";
            that.closeMessage(2000);
            // that.$message({
            //     message: that.articleDetails.commentAudit == 1 ? '评论成功，需要审核，请耐心等待' : "评论成功",
            //     type: 'success'
            // });
          }else if(data.code == '29007'){
             that.ismessage = true;
            that.message = '检测到评论区有敏感词：'+data.message;
            that.closeMessage(2000);
            that.moreLoading = false;
          } else {
            that.ismessage = true;
            that.message = data.message;
            that.closeMessage(2000);
            that.moreLoading = false;
            // that.$message({
            //   message: data.message,
            //   type: 'error'
            // });
          }
        }
      });
    },
    LoadMore() {
      let Request = new Object();
      Request = Lib.M.GetRequest();
      this.currentPage += 1;
      const data = Lib.M.dataRequest({
        articleId: this.article_id,
        currentPage: this.currentPage
      });
      Lib.M.loadMore(
        "userComment/getCommentArtAll",
        data,
        this.commentList,
        this
      );
    },
    touchmove() {},
    nextStep() {

      if (this.form.value == "" && this.checkedVal == "") {
        this.ismessage = true;
        this.message = "请输入或者选择要打赏的金额";
        this.closeMessage(2000);
        return;
      } else if (
        this.form.value != "" &&
        (this.form.value < 0.001 || this.form.value > 100)
      ) {
        this.ismessage = true;
        this.message = "请输入0.001-100钛值的打赏金额";
        this.closeMessage(2000);
        //  this.$message({
        //      message:'',
        //     type: 'warning'
        // });
      } else {
        //this.mVisible =false;
        $("#bg4").css("display", "none");
       $("#bg6").css("display", "block");
        // localStorage.setItem('trader_pwd',2)
        // // Lib.M.accountSafe()
        // this.$prompt('<div>如果还没有交易密码，请去<a class = "cursorPointer color1d87" href="../account/details.html#/account_safe" @click = "toTraderPwd" target="view_window">设置交易密码</a></div>', '确认为Ta打赏吗？', {
        //   dangerouslyUseHTMLString:true,
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   roundButton:true,
        //   center:true,
        //   customClass:'mobile_paw',
        //   inputType:"password",
        //   inputPattern: /^\d{6}\b/,
        //   inputErrorMessage: '请输入6位交易密码（数字）'
        // }).then(({ value }) => {
        //   //this.onSubmit(value)
        //   let Request = new Object();
        //   Request = Lib.M.GetRequest();
        //   let url_id = Request['id'];
        //       url_id = url_id.split('_');
        //   const article_id = Base64.decode(url_id[0]);
        //   const award_list = Lib.M.dataRequest({
        //             "articleId":article_id,
        //             "userId":localStorage.getItem('kg_desk_userId'),
        //             "balance":this.form.value == ''? this.checkedVal:this.form.value,
        //             "txPassword":value,
        //   });
        //   const that = this;
        //   Lib.M.ajax({
        //       'type':'post',
        //       'url':'/account/updateBalance',
        //       "data":award_list,
        //       'success':function (data){
        //         if(data.code == 10000){
        //             // that.$message({
        //             //   message:'打赏成功',
        //             //   type: 'success'
        //             // });
        //             that.ismessage =true;
        //             that.message="打赏成功";
        //             that.closeMessage(3000);
        //             that.password = "";
        //             that.loading = false
        //             that.commonHide();
        //             that.pswVisible = false
        //             that.cancel();
        //             that.password = "";
        //             //that.$refs[form].resetFields();
        //         }else{

        //             that.ismessage =true;
        //             that.message=data.message;
        //             that.closeMessage(3000);
        //             that.loading = false
        //         }
        //       }
        //     });

        // }).catch(() => {
        //   // this.$message({
        //   //   type: 'info',
        //   //   message: '取消输入'
        //   // });
        // });
      }
    },
    downAPP(){
      const that =this;
      that.awardV =false;
      window.location.href = '../../appDownload/list.html'
    },
    gotoAPP(){
      const that =this;
      //that.mobileV =false;
      that.openMiGuApp();
      // let openMiGuApp = () => {
       

      // }
    },
    openMiGuApp(){
       const that =this;
       let config = {
            /*scheme:必须*/
            scheme_IOS: 'kg://?articleId='+that.article_id+'&type=3',
            scheme_Adr: 'kgapp://www.kg.com/startapp?articleId='+that.article_id,
            download_url: 'https://kg.com/appDownload/list.html',
            timeout: 1000
        };
        let ua = navigator.userAgent.toLowerCase();
        let startTime = Date.now();
        
        let flag =ua.indexOf('os') > 0;
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          var loadDateTime = new Date();
          window.setTimeout(function() {
          var timeOutDateTime = new Date();
          if (timeOutDateTime - loadDateTime < 500) {
            window.location = "https://itunes.apple.com/cn/app/千氪-每日为你提供高质量资讯/id1381042034?l=zh&ls=1&mt=8";
          } else {
            window.close();
          }
          },
          25);
          window.location = config.scheme_IOS;
        } else if (navigator.userAgent.match(/android/i)) {
           let ifr = document.createElement('iframe');
          ifr.src =  config.scheme_Adr;
          ifr.style.display = 'none';
            document.body.appendChild(ifr);
            let t = setTimeout(function() {
              document.body.removeChild(ifr);
              var endTime = Date.now();
              if (!startTime || endTime - startTime < 2000) {//唤起失败
                  window.open( config.download_url)
                 
              } else {//唤起成功
              }
          }, config.timeout);
        }
    },
    showBox(){
	   
     $("#bg8").css('display','block')
      
      $("#bg8").bind("touchmove", function(e) {
        e.preventDefault();
      },false);
        document.body.style.overflow = "hidden";
        // document.html.style.height="100%";
       document.body.style.height = "100%";
   },
   hideBox(){
    $("#bg8").toggle(false);
       document.body.style.overflow = "visible";
       // document.html.style.height="auto";
       document.body.style.height = "auto";
   },
    onSubmit(form) {
            const that = this;
            let len = that.paw.length;
            if (len == 0) {
            that.ismessage = true;
            that.message = "请输入交易密码";
            that.closeMessage(3000);
            return;
            } else if (len < 6) {
            that.ismessage = true;
            that.message = "请输入6位交易密码(数字)";
            that.closeMessage(3000);
            return;
            } else {
            var password = that.paw.join("");
            let Request = new Object();
            Request = Lib.M.GetRequest();
            let url_id = Request["id"];
            url_id = url_id.split("_");
            const article_id = Base64.decode(url_id[0]);
            const award_list = Lib.M.dataRequest({
            articleId: article_id,
            userId: localStorage.getItem("kg_desk_userId"),
            balance: this.form.value == "" ? this.checkedVal : this.form.value,
            txPassword: password
            });
            this.pawLoading = true;
            Lib.M.ajax({
            type: "post",
            url: "/account/updateBalance",
            data: award_list,
            success: function(data) {
            if (data.code == 10000) {
            // that.$message({
            // message:'打赏成功',
            // type: 'success'
            // });

            that.pawLoading = false;
            that.paw = [];
            setTimeout(() => {
            that.backHandle();
            that.ismessage = true;
            that.message = "打赏成功";
            that.closeMessage(3000);
            }, 500);
            //that.$refs[form].resetFields();
            } else {
            that.pawLoading = false;
            that.ismessage = true;
            that.message = data.message;
            that.closeMessage(3000);
            }
            }
            });
            }
    },

    cancelPws(formName) {
      this.pswVisible = false;
      this.commonHide();
      this.password = "";
    },
    toTraderPwd() {
      // 调过来打开交易密码弹窗
      localStorage.setItem("trader_pwd", 2);
      // Lib.M.accountSafe()
      window.open("../account/details.html#/account_safe");
    },
    goDetail(item) {
      Lib.M.goDetail(item);
    }
  }
};
</script>
<style>
/* .vjs-control-bar{
  z-index:9999
}
.vjs-custom-skin > .video-js .vjs-big-play-button{
  z-index:9999
}
.video-js .vjs-tech{
  z-index:8888
} */
.article-iframe iframe{
  width:100%!important;
  height: 100%;
}
.el_w{
  font-weight: normal!important;
  font-size:18px!important;
}
</style>
<style scoped>
.hot_img {
  position: relative;
}
.hot_img_mask {
  width: 100%;
  height: 90px;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0px;
  border-radius: 5px;
  color: #fff;
  line-height: 65px;
  text-align: center;
  font-size: 16px;
}
.hot_img:hover .hoverImgScale {
  transform: scale(1.1);
}
#wbbutton {
  margin-top: 10px;
}
.authorName {
  display: inherit;
}
.container {
  padding-top: 11px;
}
.container1 {
  display: flex;
  flex-direction: row;
}
.container_left {
  width: 730px;
  position: relative;
  margin-top: 43px;
}
.container_right {
  width: 29%;
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.container_left .title {
  font-size: 26px;

  line-height: 40px;
  word-wrap: break-word;
}
.tif {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  color: #505c62;
  margin-top: 27px;
}
.leftBox span {
  display: inline-block;
  margin: 0 2px;
}
.abstract {
  color: #b6b6b6;
  line-height: 25px;
  margin-top: 28px;
  word-wrap: break-word;
}
.article {
  color: #7f8387;
  /*line-height: 30px;*/
  font-size: 16px;
  overflow: hidden;
}

.article h1 {
  /*line-height: 38px!important;*/
}
.article pre,
.article p {
  font-family: "微软雅黑";
  word-wrap: break-word;
}
.article img {
  /*width: 100%;*/
  border-radius: 5px !important;
}
.qunwen {
  color: #1d87ff;
}
.artFooter {
  height: 80px;
  background: #efefef;
  margin-top: 40px;
  line-height: 30px;
  padding-left: 20px;
  padding-top: 20px;
  color: #999999;
}
.tags span {
  display: inline-block;
  margin-right: 10px;
  padding: 0 10px;
  height: 30px;
  font-size: 14px;
  color: #999;
  line-height: 30px;
  text-align: center;
  border: 1px solid #999;
  border-radius: 15px;
}
.topbox {
  height: auto;
  border: 1px solid #c8ced1;
  position: relative;
  margin-top: 60px;
  background: #fff;
}
.usename {
  width: 180px;
  height: 76px;
  line-height: 76px;
  margin-top: -40px;
  margin-left: 20px;
  background: #fff;
  z-index: 200;
}
.usename img {
  width: 76px;
  height: 76px;
  border-radius: 38px !important;
  float: left;
  margin-right: 10px;
}
.usename span {
  display: inline-block;
  text-align: center;
}
.rn {
  /*height:50px;*/
  text-align: center;
  line-height: 30px;
  margin-left: 60px;
  /*margin-top: 23px;*/
}

.rn span {
  display: inline-block;

  height: 22px;
  line-height: 22px;
  border: 1px solid #1d87ff;
  border-radius: 4px;
  padding: 2px 20px;
  font-size: 14px;
  background: #1d87ff;
  color: #fff;
}
.toptext {
  padding: 0px 20px;
  margin: 10px 0px;
  font-size: 14px;
  color: #999;
}
.userdata {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}
.userdata h2 {
  font-size: 22px;
}
.parLine {
  width: 120px;
  height: 4px;
  background: #efefef;
  margin: 28px 0px;
}
/* video::-internal-media-controls-download-button {
    display:none;
}
video::-webkit-media-controls-enclosure {
    overflow:hidden;
}
video::-webkit-media-controls-panel {
    width: calc(100% + 30px); 
} */
.ar {
  /*position: absolute;*/
  margin: 10px 10px 10px 20px;
}
.ar p {
  font-size: 16px;
  margin-bottom: 18px;
}
.ar li {
  font-size: 14px;
  margin: 0px 10px 10px 0px;
}
.ar li p {
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
  /*font-size:14px;*/
}
.ar .flexR {
  justify-content: space-between;
}
.num {
  float: right;
}
.share {
  width: 725px;
  height: 50px;
  line-height: 50px;
  margin-top: 50px;

  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.LeftBox {
  display: inline-block;
  width: 120px;
  height: 24px;
  line-height: 24px;
  background: rgba(244, 244, 244, 1);
  border-radius: 12px;
  margin-top: 14px;
  margin-left: 20px;
  cursor: pointer;
  text-align: center;
  color: #cccccc;
  font-size: 12px;
}
.sharefixed {
  background: rgba(255, 255, 255, 0.93);
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #ccc;
  z-index: 300;
}
.share .fl img {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50% !important;
  margin-right: 10px;
  margin-top: 10px;
}
.share .fl span {
}
.next_last_article {
  border: 1px solid #ccc;
  margin-bottom: 50px;
  padding: 15px 15px 20px 15px;
}
.next_last_article p {
  color: #ccc;
}
.next_last_article a {
}
.font30 {
  font-size: 30px;
  margin-right: 15px;
}

.icon-iconfonticonfontweibo {
  color: #f00;
}
/* .icon-zan{
  color:#1d87ff;
} */
.icon-wechat:hover {
  color: #2eb106;
}
.icon-iconfonticonfontweibo:hover {
  color: rgb(242, 76, 74);
}
.icon-xihuan1,
.icon-zan1,
.icon-pinglun2,
.icon-wechat,
.icon-iconfonticonfontweibo {
  color: #d4d8dc;
}
.icon-wechat,
.icon-iconfonticonfontweibo {
  /*color:#f0f2f7*/
}

.icon-xihuan,
.icon-zan,
.icon-zan1:hover,
.icon-xihuan1:hover,
.icon-pinglun2:hover {
  color: #1d87ff;
}

.article_award {
  width: 100%;

  justify-content: center;
  margin: 20px 0px;
}
.article_award2 {
  width: 100%;
  height:100%;
  justify-content: center;
  /* margin: 20px 0px; */
}
.article_award span {
  color: #999;
  margin: 0 auto;
}
.article_award .ico {
  display: inline-block;
  width: 78px;
  height: 78px;
  line-height: 78px;

  background: #1d87ff;
  border-radius: 50%;
  color: #fff;
  font-size: 26px;
  text-align: center;
  margin-bottom: 10px;
}
.article_award2 span {
  color: #999;
  margin: 0 auto;
}
.article_award2 .ico {
  display: inline-block;
  width: 78px;
  height: 78px;
  line-height: 78px;

  background: #1d87ff;
  border-radius: 50%;
  color: #fff;
  font-size: 26px;
  text-align: center;
  margin-bottom: 10px;
}

.wechatCode {
  display: block;
  /*position: absolute;*/
  /*right:36px;*/
  /*top:-55px;*/
}

.wechatCode img {
  display: inline-block;
}
.wechat_share {
  position: relative;
  margin-left: 9px;
}
.wechat_share:hover .wechatCode {
  display: inline-block;
}

.goodsSpan {
  position: relative;
  border: 0px;
  background: transparent;
}
.awardTimer {
  /*   position: fixed;
bottom:0px; */
  margin-left: 30px;
  justify-content: space-between;
}
.toLoginbtn {
  margin: 10px auto;
  display: inherit;
}
.awardSet {
  justify-content: center;
}
.item i {
  font-size: 24px;
}
.right_share {
  display: flex;
  flex-direction: row;
}
.badgeContainer {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 4px;
}
.badgeContainer .font30 {
  margin-right: 0px;
  font-size: 25px;
}
.sharefixed2 {
  width: 100%;
}
.badge {
  left: 26px;
  top: 20px;
  width: 30px;
  height: 16px;
  border-radius: 10px;
  color: #ccc;
  text-align: center;
  line-height: 16px;
  width: auto;
  padding: 2px 2px;
  margin-top: 0px;
  display: inline-block;
  margin-top: 20px;
}
.topImgcontainer {
  width: 100%;
  height: 67px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}
.detailImg {
  display: block;
  width: 100%;
  /*height:67px;*/
  margin-bottom: 10px;
  border: 0px !important;
}
#shareSign {
  display: inline-block;
  width: 1px;
  height: 1px;
}
.shareCode {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.shareCode .scan {
  display: inline-block;
  width: 100%;
  margin-top: 5px;
  padding: 0 5px;
}
.marginBottom27 {
  margin-bottom: 20px;
}

@media only screen and (max-width: 1600px) {
  .share {
    width: 720px;
  }
}
@media only screen and (max-width: 1570px) {
  .share {
    width: 700px;
  }
}
@media only screen and (max-width: 1530px) {
  .share {
    width: 690px;
  }
}
@media only screen and (max-width: 1500px) {
  .share {
    width: 680px;
  }
}
@media only screen and (max-width: 1480px) {
  .share {
    width: 660px;
  }
}
@media only screen and (max-width: 1440px) {
  .share {
    width: 687px;
  }
}
@media only screen and (max-width: 1390px) {
  .share {
    width: 670px;
  }
}
@media only screen and (max-width: 1366px) {
  .share {
    width: 670px;
  }
}
@media only screen and (max-width: 768px) {
  .pcShow {
    display: none;
  }
  .mobile {
    display: block;
  }
  .mobile_titile {
    font-size: 20px;
    color: #000;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    margin: 0px 50px 20px 50px;
    text-align: center;
    word-break: break-all;
    text-align: left;
    padding-top: 140px;
    /* margin-top: 30px; */
  }
  .mobile_main {
    margin: 0 auto;
    width: 90%;
  }
  .userInfo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 8px;
	}
  .rule{
    height:32px;
    line-height: 32px;
    font-size:12px;
    color: #9d9d9f;
  }
  .userName{
    display: inline-block;
    width:180px;
    height:32px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:32px;
    padding-left:6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .realName{
    display: inline-block;
    /*height:40px;*/
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:#1886FA;
    line-height:24px;
    padding:0 5px;
    margin-left:10px;
    background:rgba(236,245,255,1);
    border-radius: 3px ; 
  }
  .avadImg{
    display: flex;
  }
  .avadImg img{
    display: inline-block;
    vertical-align: middle;
    width:32px;
    height:32px;
    line-height:32px;
    border-radius: 20px!important;
  }
  .mobile_CommentAuto {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  }
  .mobile_Av img {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 16px !important;
    line-height: 32px;
    vertical-align: middle;
  }
  .mobile_Av span{
    display: inline-block;
    height:32px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    line-height:32px;
    padding-left:10px;
  }
  .mobile_Av .omit1{
    max-width:140px;
  }
  .mobile_autid {
    padding-left: 10px;
    color: #353535;
    font-family: PingFangSC-Regular;
    font-size: 13px;
  }
  .mobile_content {
    margin: 20px 0;
    font-family: PingFang SC;
    font-size: 14px;
    color: #333333;
    letter-spacing: 1px;
    line-height: 27px;
    width: 100% !important;
    overflow: hidden;
  }
  .mobile_content p {
    margin-bottom: 10px;
  }
  .mobile_content img {
    width: 100% !important;
    border-radius: 5px !important;
  }
  .mobile_content .video-wrap video {
    display: block;
    width: 100% !important;
  }
  .commentBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    height: 200px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .shaerBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    height: 150px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .mobile_info {
    margin: 20px 0;
    height: 45px;
    line-height: 45px;
    background: rgba(244, 244, 244, 1);
    border-radius: 6px;
    color: #999999;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    padding-left: 15px;
  }
  .mobile_content img {
    width: 100%;
    border-radius: 5px !important;
  }
  .boxTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 12px;
    font-size: 14px;
    border-bottom: 1px solid #c8ced1;
  }
  .cancelColor {
    color: #666;
  }
  .okColor {
    color: #1d87ff;
  }
  .mobile_cursorPointer {
    height: 30px !important;
    padding: 0px 20px;
    line-height: 30px !important;
    border-radius: 15px !important;
    background: rgba(244, 244, 244, 1) !important;
    border: 0 !important;
    font-family: PingFangSC-Regular !important;
    color: rgba(68, 68, 68, 1) !important;
  }
  .textarea {
    /*border:none!important;
    resize:none!important;*/
  }
  .textarea .el-textarea__inner {
  }
  .textarea .el-textarea__inner {
    border: 0 !important;
    resize: none;
  }
  .awardInfo {
    display: inline-block;
    margin-left: 20px;
    color: #999999;
    font-family: PingFangSC-Regular;
  }
  .commentInput {
    margin: 10px 12px;
  }
  .mobile_ico {
    background: #fff;
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    border-radius: 50%;
    color: rgba(102, 102, 102, 1);
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
    border: 1px solid #999;
    font-family: "微软雅黑";
    text-align: center;
  }
  .mobile_ico2 {
    background: #fff;
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 36px;
    border-radius: 50%;
    color: rgba(102, 102, 102, 1);
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
    border: 1px solid #999;
    font-family: "微软雅黑";
    text-align: center;
  }
  .mobile_ico2 i {
    margin-right: 0px !important;
    font-size: 24px;
  }
  .mobile_ico i {
    margin-right: 0px !important;
    font-size: 24px;
  }
  .colorActive {
    border-color: rgba(241, 77, 112, 1) !important;
    color: rgba(241, 77, 112, 1) !important;
  }
  .mobile_cursor {
    width: 50%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    margin: 20px auto;
  }
  .mobile_tuijian {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    height: 35px;
    line-height: 35px;
  }
  .mobile_invis {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e5e5e5;
  }
  .mobile_InvistImg {
    line-height: 80px;
  }
  .mobile_InvistImg img {
    border-radius: 5px;
    width: 80px;
    height: 80px;
    line-height: 80px;
    vertical-align: middle;
  }
  #bg {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8888;
  }
  #bg2 {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8888;
  }
  #bg3 {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 8888;
  }
  #bg4 {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8888;
  }
  .awardBox {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 9999;
    height: 300px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .parentBox {
    position: relative;
  }

  .browseNum {
    position: absolute;
    right: -20px;
    top: -32px;
    text-align: center;
    width: 100px;
  }
  .mobile_InvistTitle {
    display: inline-block;
    width: 68%;
    height: 40px;
    line-height: 26px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    padding: 18px 0px 10px 20px;
    font-family: PingFangSC-Regular;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
  .mobile_InvistTitle:hover {
    color: #1d87ff;
  }
  .mobile_spacing {
    width: 100%;
    height: 16px;
    background: rgba(244, 244, 244, 1);
  }
  .mobile_comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
    margin: 10px 0;
  }
  .detailTag {
    margin-bottom: 10px;
  }
  .boderBotom {
    border-bottom: 1px solid #dcced1;
  }
  .mobile_commentText {
    font-family: PingFangSC-Regular;
    color: rgba(35, 35, 35, 1);
    font-size: 15px;
    padding-left: 40px;
    margin: 0 auto;
  }
  .mobile_footer {
    margin: 20px 20px;
  }
  .sharefixed {
    width: 100% !important;
  }
  .inputComment {
    width: 116px;
    height: 24px;
    background: rgba(244, 244, 244, 1);
    border-radius: 12px;
  }
  #shareDiv2 {
    line-height: 50px !important;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff !important;
  }
  .shareBox {
    text-align: right;
  }
  .shareBox i {
    font-size: 24px;
    margin-right: 14px;
  }
  .collentTime {
    width: 100px;
    text-align: center;
    color: #666666;
    font-size: 14px;
  }
  .iconShare {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .mobiele_shareico {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .mobiele_shareico img {
    display: inline-block;
    margin-top: 30px;
    width: 42px;
    height: 42px;
    border: 0 !important;
  }
  .ico_text {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 10px;
  }
  .bgImg img {
    display: inline-block;
    border: 0 !important;
    float: right;
    margin-right: 30px;
    z-index: 1500;
  }
  .em-widget-pop-bar {
    /*display:none!important;*/
  }
  .commentTitle {
    margin-bottom: 20px;
  }
  .textareaContainer {
    position: relative;
    height: auto;
    overflow: hidden;
  }
  .share_qita {
    width: 75% !important;
    display: inline-block;
    margin: 225px 50px 0 0;
  }
  .mask {
    width: 100%;
    top: 0px;
    left: 0px;
    height: 100%;
    line-height: 90px;
    color: #666;
    font-size: 16px;
    position: absolute;
    z-index: 200;
    background: rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  /* .omit1{
  display: inline-block;
  /*width:50px;*/

  .textarea {
    background: #efefef;
    resize: none;
  }
  .comBtn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    color: #505c62;

    margin-bottom: 20px;
  }
  .subbtn {
    width: 100%;
  }
  .subbtn .el-button {
    float: right;
  }
  .btn span {
    display: inline-block;
    height: 20px;
    padding: 5px 20px;
    line-height: 20px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #1d87ff;
    border-radius: 4px;
    color: #1d87ff;
    cursor: pointer;
  }
  .comBtn img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    float: left;
  }
  .user span {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    color: #1d87ff;
    font-size: 16px;
  }
  .userimg {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 20px;
  }

  .userTime {
    height: 32px;
    line-height: 32px;
    color: #9d9d9f;
  }


  .userimg .omit1{
    max-width:120px;
  }
  .comcontent {
    margin-left: 50px;
    font-size: 14px;
    color: #232323;
    margin-left: 65px;
    margin-right: 20px;
    font-family: PingFang SC;
  }
  .comcontent p {
    line-height: 24px;
    display: block;
    /*display: -webkit-box;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;*/
  }
  .comList li {
    padding-bottom: 20px;

    border-bottom: 1px dashed #efefef;
  }
  .more {
    text-align: center;
    margin: 20px 0;

    color: #1d87ff !important;
  }
  .mobile_comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
    margin: 10px 20px;
  }
  .mobile_tuijian {
    font-size: 17px;
    font-family: PingFangSC-Regular;
    color: #000;
    height: 35px;
    line-height: 35px;
  }
  .mobile_commentNum {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(153, 153, 153, 1);
  }
  .boderBotom {
    border-bottom: 1px solid #dcced1;
  }
  .loadingMore {
    background-color: #fff;
    border: 1px solid #999 !important;
    color: #999999;
    border-radius: 30px;
    font-size: 14px !important;
    font-family: PingFangSC-Regular;
    padding: 5 30px;
  }
  .loadingMore:hover {
    background-color: #fff;
    border: 1px solid #999 !important;
    color: #999999;
  }
  .awardModal p {
    text-align: center;
    color: #333;
    font-size: 14px;
  }
  .mobile_tags {
    width: 100%;
    margin: 20px 10px 10px 10px;
  }
  .mobile_tags .award_tag {
    display: inline-block;
    background: #eeeeee;
    color: #333;
    width: 68px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    font-size: 14px;
    padding: 2px 5px;
    margin: 10px 5px;
  }
  .tv {
    display: inline-block;
    background: #eeeeee;
    color: #333;

    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    font-size: 14px;

    margin: 10px 5px;
  }
  .awardModal .award_tag {
    display: inline-block;
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 4px;
    background: #eeeeee;
    color: #333;
    margin: 10px 15px 0px 0px;
  }
  .footer_btn {
    text-align: center;
    z-index: 2200;
  }
  .active_tag {
    background-color: #007aff;
    color: #fff;
  }
  .award_tag:nth-child(1) {
    background-color: #007aff;
    color: #fff;
  }

  .cutomContent span {
    position: absolute;
    top: 1px;
    right: 190px;
    background: #eee;
    z-index: 100;
  }
  .custom_input {
    border: none;
    width: 43% !important;
    margin-right: 0px !important;
    padding: 6px 2px !important;
  }
  .inputBox {
    width: 100% !important;
    height: 44px;
    line-height: 44px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0px 2px !important;
    color: transparent;
    text-shadow: 0 0 0 black;
  }
  .custom_input .el-input__inner {
    border-radius: 20px !important;
  }
  .toTraderPwd {
    display: block;
    text-align: center;
  }
  .cutomContent {
    position: relative;
    width: 95%;
    border-radius: 4px;
    margin-top: 10px;
  }
  .explain {
    /*margin-left:4px;*/
    margin: 5px 13px 6px 13px;
    display: inline-block;
  }
  .cutomContent .custom_input,
  .cutomContent .custom_input input {
    width: 51% !important;
    border-radius: 30px !important;
  }
  .cancelPwsTitle {
    font-size: 14px;
    color: #333;
  }
  .awardModal .el-dialog {
    width: 30%;
    margin-top: 50vh;
  }
  .btnModal {
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    border-radius: 30px;
    border: 1px solid #999999;
    color: #333;
  }
  .btnModal2 {
    display: inline-block;
    background: #007aff;
    width: 100px;
    height: 35px;
    line-height: 35px;
    border-radius: 30px;
    color: #fff;
    border: 1px solid #007aff;
  }
  .el_awardModal {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 700px) {
  .container_left {
    width: 100%;
    padding-top: 0px;
  }
  .share {
    width: 100%;
  }
  .sharefixed {
    width: 90%;
  }
  .wechat_share,
  .weibo_share {
    display: none;
  }
  .weibo_share2{
    display: none;
  }
  .count-down .el-message-box__message p {
    font-size: 14px !important;
  }
}
@media only screen and (max-width: 414px) {
  .tif {
    flex-direction: column;
    margin-top: 10px;
  }
  .artFooter {
    height: 80px;
    background: #efefef;
    margin-top: 40px;
    line-height: 20px;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 12px;
    color: #999999;
  }
  .mobile_tags {
    width: 100%;
    margin: 20px 10px 10px 30px;
  }
  .share {
    margin-top: 16px;
  }
  .cutomContent span {
    right: 190px;
    top: 0px;
  }
  .awardInfo {
    margin-left: 38px;
  }
  .el_awardModal {
    margin-top: 78px !important;
  }
}
@media only screen and (max-width: 375px) {
  .mobile_tags {
    width: 100%;
    margin: 20px 10px 10px 10px;
  }
  .cutomContent span {
    right: 176px;
    top: 0px;
  }
  .el_awardModal {
    margin-top: -22px !important;
  }
  .awardInfo {
    margin-left: 20px;
  }
}
@media only screen and (max-width: 320px) {
  .mobile_tags {
    width: 100%;
    margin: 20px 10px 10px 30px;
  }
  .el_awardModal {
    margin-top: 0px !important;
  }
  .LeftBox {
    width: 76px;
  }
  .cutomContent span {
    right: 149px;
    top: 0px;
  }
  .mobile_tags .award_tag {
    margin-bottom: 0px;
  }
  .awardInfo {
    margin-left: 38px;
  }
}
img {
  border: 1px solid #f0f2f7 !important;
  border-radius: 4px !important;
}
.loadingGif img {
  border: 0px !important;
}
</style>
<style type="text/css">
.count-down .el-message-box__message p {
  font-size: 17px !important;
}
.article img {
  /*width: 100%;*/
  display: inline-block;
  border-radius: 5px;
}
.el-badge__content {
  position: absolute;
  top: 17px !important;
  left: 0px !important;
  display: inline-block !important;
}
.el-badge__content.is-fixed {
  right: 19px !important;
  position: absolute;
  top: 0;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
.detailTag .el-tag {
  background: #fff;
  color: #999;
  border-color: #999;
  border-radius: 10px;
  /*width:58px;*/
  height: 20px;
  line-height: 19px;
  text-align: center;
}
.detailTag .el-tag:hover {
  color: #fff;
  background: #409eff;
  border-color: #409eff;
}
/*   .article pre,.article p{
  font-family: '微软雅黑',"苹方","华文黑体","Helvetica Neue", "Ubuntu", "Hiragino Sans", "WenQuanYi Micro Hei";
  color:#000;
} */
.article p em {
  font-style: italic !important;
}
.pay-tool {
position: fixed;
width: 100%;
height: 22.93333333rem;
background-color: #fff;
overflow: hidden;
bottom: 0;
border-top-right-radius: 8px;
border-top-left-radius: 8px;
font-family: "微软雅黑";
}
.pay-tool-title {
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 6px 12px;
font-size: 14px;
border-bottom: 1px solid #c8ced1;
height: 2.08888888rem;
/* padding: 0 0.8rem; */
line-height: 2.08888888rem;
text-align: center;
overflow: hidden;
}
.pay-tool-title span:nth-child(1) {
color: #007aff;
}
.pay-tool-title span:nth-child(2) {
font-size: 0.8rem;
font-weight: bold;
}
.pay-tool-title span:nth-child(3) {
color: #007aff;
}
.pay-tool strong {
font-size: 0.8rem;
}
.pay-tool-title .icon {
float: left;
/* margin-top: 0.72222222rem; */
}
.pay-tool-inputs {
width: 14.46666666rem;
height: 2.31111111rem;
margin: 1.28888888rem auto 0;
border: 1px solid #b9b9b9;
border-radius: 0.26666666rem;
box-shadow: 0 0 1px #e6e6e6;
display: flex;
}
.item {
width: 16.66666666%;
height: 2.31111111rem;
border-right: 1px solid #b9b9b9;
line-height: 3.31111111rem;
text-align: center;
}
.item:last-child {
border-right: none;
}
.icon_dot {
display: inline-block;
width: 1.51111111rem;
height: 1.51111111rem;
background: url("../../../assets/img/icon_dot.png") no-repeat;
background-size: cover;
}
.pay-tool-link {
padding: 0.53333333rem 0.8rem 0;
text-align: right;
}
.link {
font-size: 0.66666666rem;
color: #3c8cfb;
}
.pay-tool-keyboard {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
.pay-tool-keyboard ul {
width: 100%;
display: flex;
flex-wrap: wrap;
}
.pay-tool-keyboard ul li {
width: 33.1222%;
height: 3.25442834rem;
line-height: 3.25442834rem;
text-align: center;
border-right: 1px solid #aeaeae;
border-bottom: 1px solid #aeaeae;
font-size: 1rem;
font-weight: bold;
}
/* .pay-tool-keyboard ul li:hover {
background: #d1d4dd;
}
.pay-tool-keyboard ul li:active {
background: #d1d4dd;
} */
.pay-tool-keyboard ul li:nth-child(1) {
border-top: 1px solid #aeaeae;
}
.pay-tool-keyboard ul li:nth-child(2) {
border-top: 1px solid #aeaeae;
}
.pay-tool-keyboard ul li:nth-child(3) {
border-top: 1px solid #aeaeae;
border-right: none;
}
.pay-tool-keyboard ul li:nth-child(6) {
border-right: none;
}
.pay-tool-keyboard ul li:nth-child(9) {
border-right: none;
}
.pay-tool-keyboard ul li:nth-child(12) {
border-right: none;
border-bottom: none;
background-color: #d1d4dd;
}
.pay-tool-keyboard ul li:nth-child(10) {
border-bottom: none;
background-color: #d1d4dd;
}
.pay-tool-keyboard ul li:nth-child(11) {
border-bottom: none;
}
#bg6 {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8888;
}

</style>
<style>
.vjs-custom-skin .vjs_video_3-dimensions{
  width:100%!important;
}

#vjs_video_396{
  width:100%!important;
  border-radius:4px!important;
  height:193px!important;
}
/* .vjs-custom-skin .vjs_video_396-dimensions{
	width:100%!important;
} */
#app.isMobile #fixedNav  {
  position: absolute!important;
}
.mobile {
  display: none;
}
#app.isMobile .mobile {
  overflow-y: hidden;
}
.boxCentert{
  width:70%;
  margin:10px auto 0;
  font-size:18px;
  text-align:center;
  font-family:PingFangSC-Medium;
  color:rgba(51,51,51,1);
  font-weight:bold;
 
}
.boxCent{
  width:90%;
  margin:10px auto 0;
  font-size:16px;
  text-align:center;
  font-family:PingFangSC-Medium;
  color:rgba(51,51,51,1);
 
}
  .app_download_code {
    display: inline-block;
    width: 100%;
    margin:18px auto 0px;
    text-align:center;
    
  }
  .app_download_code img{
    display: inline-block;
    margin:0px auto 0;
    border:4px solid #F0F0F0;
  }
  .app_text{
     display:block;
     font-family:PingFangSC-Regular;
     color:rgba(77,77,77,1);
     width:50%;
     margin:0px auto 0;
     text-align:center;
     font-size:12px;
  }
  .awardDialog .el-dialog{
    margin-top: 30vh!important;
  }
  .awardDialog .el-dialog__header{
     padding: 0px!important;
  }
  .mobile_dig .el-dialog__header{
     padding-top: 15px!important;
    
  }
   .mobile_dig .el-dialog__body{
     padding-top: 0px!important;
     font-size:14px!important;
  }
  .awardDialog .el-dialog__body{
     padding: 0px!important;
  }
  .awardDialog .awardbox{
    position: relative;
    height:342px;
  }
  .awardDialog .dialog-footer{
    display:block;
    width:100%;
    margin:10px auto 0;
    text-align:center;
  }
  .awardLeftBox{
    position: absolute;
    left:0;
    top:0;
    width:300px;
      }
  .awardLeftBox img{
    width:100%;
    border:0!important;
    border-radius:0!important;
  }
  .awardRightBox{
    position: absolute;
    right:0;
    top:0;
    width:300px;
  }
  .awardRightBox .topIcon{
    width:96%;
    text-align:right;
    font-size:20px;
    color:#C6C6C6;
    margin-right:15px;
    margin-top:7px;
    
  }
  .awardRightBox .topIcon i{
      cursor: pointer;
  }
  .awardRightBox footer{
    margin-left:20px;
    width:100%;
    margin:10px auto 0;
    text-align:center;
  }
  #bg8{
  display:none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 8888;
}
.tostBox{
  background: #fff;
  width:70%;
  height:190px;
  margin: 0 auto;
  border-radius: 6px;
  margin-top: 50%;

}
.toast_title{
  height:38px;
  line-height:38px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  /* width:100%; */
  text-align: center;
  /* border-bottom: 1px solid rgba(238,238,238,1); */
}
.toast_title i{
  display: inline-block;
  text-align:right;
  float:right;
  font-size:16px;
  height:38px;
  line-height:38px;
  color:#C6C6C6;
  padding-right:20px;
  cursor: pointer;
}
.toast_content{
  height:70px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  width:80%;
  text-align: center;
  margin:10px auto 0;
 
}
.toast_footer{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  width:85%;
  margin: 0 auto;
  
}
.toast_footer div:nth-child(1){
  width:100px;
  height:35px;
  line-height:35px;
  font-size:14px;
  text-align: center;
  font-family:PingFangSC-Regular;
  color:#C6C6C6;
  border:1px solid #C6C6C6;
  border-radius: 4px;
  text-align: center;
}
.toast_footer div:nth-child(2){
  width:100px;
  height:35px;
  line-height:35px;
  text-align: center;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  background: #228AFF;
  border:1px solid #228AFF;
  border-radius: 4px;
}
@media only screen and (max-width: 320px) {
    .toast_footer div:nth-child(1){
  width:86px;
  height:35px;
  line-height:35px;
  font-size:14px;
  text-align: center;
  font-family:PingFangSC-Regular;
  color:#C6C6C6;
  border:1px solid #C6C6C6;
  border-radius: 4px;
  text-align: center;
}
.toast_footer div:nth-child(2){
  width:86px;
  height:35px;
  line-height:35px;
  text-align: center;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  background: #228AFF;
  border:1px solid #228AFF;
  border-radius: 4px;
}
}
</style>
