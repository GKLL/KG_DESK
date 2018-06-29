<template>
  <div class = 'swiper' v-if = "swiperShow">
      <div class="slide-show" ><!-- @mouseover="clearInv" @mouseout="runInv" -->
        <div class="slide-img">
            <transition name="slide-trans">
              <!-- <img v-if="isShow" :src="slides[nowIndex].src"> -->
              <div class = 'hot_author flexC'>
                <div class = 'flexR hot_author_title' v-if = 'slides[nowIndex] !=null &&slides[nowIndex] !=undefined'>
                  <img v-if = 'slides[nowIndex] !=null &&slides[nowIndex] !=undefined' class=  'cursorPointer'  :src="imgUrl + slides[nowIndex].columnAvatar"   @click = "toAuthor(slides[nowIndex])"/>
                  <img v-else class=  'cursorPointer'  src="../assets/img/avatar.png"   @click = "toAuthor(slides[nowIndex])"/>
                  <div class = 'flexC hot_author_title_ft'>
                    <a class=  'cursorPointer'  @click = "toAuthor(slides[nowIndex])">{{slides[nowIndex].columnName}}</a>
                    <span>共发表{{slides[nowIndex].artsum}}篇</span>
                    <span class = 'omit2'>{{slides[nowIndex].columnIntro}}</span>
                  </div>
                </div>
                <dl v-if = 'slides[nowIndex] == null ? false : true'>
                  <ol v-for = "(item,key) in slides[nowIndex].list" :key="key">
                    <a class ='font16 cursorPointer' @click = "toDetail(item)" >{{item.articleTitle}}</a>
                    <p class = 'color888 martop10'>
                      <span class = 'timer'>{{item.updateDate}}</span>
                      <a class ='fr cursorPointer color1d87' @click = "toColumn(item)">{{item.columnname}}</a>
                    </p>
                  </ol>
                </dl>
                <div  v-if = "isHidden" class = 'martop10'>
                  <div class = 'flexR hot_author_title' v-if = 'slides[nowIndex+1] !=null &&  slides[nowIndex+1] !=undefined'>
                    <img v-if = 'slides[nowIndex+1] !=null &&  slides[nowIndex+1] !=undefined' class=  'cursorPointer'  :src="imgUrl + slides[nowIndex+1].columnAvatar"   @click = "toAuthor(slides[nowIndex+1])"/>
                    <img v-else class=  'cursorPointer'  src="../assets/img/avatar.png"    @click = "toAuthor(slides[nowIndex+1])"/>
                    <div class = 'flexC hot_author_title_ft'>
                      <a class=  'cursorPointer'     @click = "toAuthor(slides[nowIndex+1])">{{slides[nowIndex + 1].columnName}}</a>
                      <span>共发表{{slides[nowIndex + 1].artsum}}篇</span>
                      <span class = 'omit2'>{{slides[nowIndex+1].columnIntro}}</span>
                    </div>
                  </div>
                  <dl v-if = 'slides[nowIndex+1] == null ? false : true'>
                    <ol  v-for = "(item,key) in slides[nowIndex + 1].list" :key="key">
                      <a class ='font16 cursorPointer' @click = "toDetail(item)">{{item.articleTitle}}</a>
                      <p class = 'color888 martop10'>
                        <span class = 'timer'>{{item.updateDate}}</span>
                        <a class ='fr color1d87 cursorPointer' @click = "toColumn(item)">{{item.columnname}}</a>
                      </p>
                    </ol>
                  </dl>
                </div>
              </div>
            </transition>
        </div>
      </div>
      <ul class="slide-pages" @mouseover="clearInv" @mouseout="runInv">
        <li v-for="(item, index) in slides"
        @click="goto(index)" v-if = "slides.length <=2 ? false : true" :key="index"
        >
          <a v-if = "index %2 == 0 ? true : false" :class="{on: index === nowIndex}"></a>
        </li>
      </ul>
  </div>
</template>

<script>
import Lib from 'assets/js/Lib';
export default {
  props: {
    slides: {},
    inv: {
      type: Number,
      default: 7000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true,
      isHidden:this.slides.length >= 2 ? true : false,
      swiperShow:this.slides.length === 0 ? false : true,
      imgUrl:Lib.C.imgUrl
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      }
      else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      this.nowIndex = this.nowIndex + 1;
      this.isHidden = this.slides[this.nowIndex + 1] == undefined ? false : true
      if (this.nowIndex >= this.slides.length - 1) {
        return 0
      }
      else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    toAuthor(item){
      Lib.M.goAuthor(item)
    },
    toColumn(item){
      Lib.M.goSubColumn(item)
    },
    toDetail(item){
      Lib.M.goDetail(item)
    },
    goto (index) {
      this.isShow = false;
      this.isHidden = this.slides[index + 1] == undefined ? false : true
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    this.runInv();
  }
}
</script>

<style scoped>
.timer{
  color:#8590a6;
}
.omit2{
  color:#3d4b52;
}
/*轮播框*/
.swiper{
  position: relative;
  padding-top:25px;
  width:100%;
}
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(700px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-700px);
}
.slide-show {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  margin: 0;
  height: 32px;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
/* .slide-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
} */
.slide-pages {
  position: absolute;
  top: -25px;
  margin-bottom: 5px;
  right: 0px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 3px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;

}
.slide-pages li a{
  display: inline-block;
    width:8px;
  height:8px;
  border-radius: 50%;
  background:#eee;
}
.slide-pages li .on {
  background:#1d87ff;
}

/*热门作者框*/

.hot_author{
  width:100%;
  /*height:240px;*/
}
.hot_author_title{
  height:80px;
}
.hot_author_title img{
  display: inline-block;
  width:75px;
  height:75px;
  border-radius: 50%!important;
  margin-right:20px;
  border:1px solid #f0f0f0!important;
}
.hot_author_title_ft{
  width:58%;
}
.hot_author_title_ft span{
  font-size:12px;
  color:#d2d2d2;
  line-height: 20px
}
.hot_author_title_ft a{

  font-size:16px;
}
.hot_author dl{
  margin-top:16px;
  margin-bottom:10px;
  /*height:125px;*/
  /*overflow: hidden;*/
}
.hot_author dl ol{
  margin-bottom:25px;
  width:100%;
}
.hot_author dl ol a{
  word-break: break-word;
  word-wrap: break-word;
  overflow:hidden;
}
</style>
