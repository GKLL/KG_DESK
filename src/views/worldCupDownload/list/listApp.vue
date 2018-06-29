<template>
    <div class="appDownloadwrap">
        <div class="pc">
            <div class="zero">
                <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/logo@3x.png" alt="">
            </div>
            <div class="one">
                <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/toppic@3x.png" alt="">
            </div>
            <div class="two">
                <img @click="appIosDown" src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/ios@3x.png" alt="" >
                <img @click="appAndroidDown" src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/and@3x.png" alt="" class="two-img ">
            </div>
            <div class="three">
                <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/title@3x.png" alt="">
            </div>
            <div class="four">
                <img  src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/rule@3x.png" alt="">
            </div>

            <div class="five">
                <img src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/free@3x.png" alt="">
            </div>
        </div>
        <div class="h5">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide re">
                        <img class = 'bg1 bg1-1' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/toppic.png" />
                        <div class="btn" @click="appDown"><span >下载APP参与活动</span></div>
                        <!--<img class = 'bg2' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg2@2x.png" />-->
                        <div class="down swiper-button-next"></div>
                    </div>
                    <div class="swiper-slide re">
                        <img class="re-right" src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/person.png" alt="" >
                        <img  class = 're-title' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/title.png" />
                        <img style="z-index: 66" class = 're-rules' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/rules.png" />
                        <div class="btn" @click="appDown"><span >下载APP参与活动</span></div>
                        <!--<img class = 'bg2' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg2@2x.png" />-->
                        <div class="down swiper-button-next"></div>
                    </div>
                    <div class="swiper-slide re" >
                        <img class="re-bottom" src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/last.png" alt="">
                        <img class = 'bg-fire' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/fire.png" />
                        <img class = 'bg1 re-guise' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/guise.png" />
                        <div class="re-guise-btn"  @click="appDown"><span>下载APP参与活动</span></div>

                        <!--<img class = 'bg2' src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/mineH5/bg2@2x.png" />-->
                        <!--<div class="down swiper-button-next"></div>-->
                    </div>
                </div>
                <div class="down swiper-button-next"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import "./../../../assets/css/swiper.min.css";
    import Swiper from  "./../../../assets/js/swiper.min.js";
    export default {
        methods: {
            appDown() {
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if(isiOS){
                    window.location.href = 'https://itunes.apple.com/cn/app/千氪-每日为你提供高质量资讯/id1381042034?l=zh&ls=1&mt=8'
                }else if(isAndroid){
                    window.location.href = 'https://www.pgyer.com/KG-Android'
                }
            },
            appAndroidDown(){
                window.location.href = 'https://www.pgyer.com/KG-Android'
            },
            appIosDown(){
                window.location.href = 'https://itunes.apple.com/cn/app/千氪-每日为你提供高质量资讯/id1381042034?l=zh&ls=1&mt=8'
            }
        },
        mounted() {
            var swiper = new Swiper(".swiper-container", {
                direction: "vertical",
                hideOnClick: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        }
    };
</script>

<style lang="less" scoped>
    .swiper-container-vertical>.swiper-pagination-bullets{display: none;}
    @media only screen and (max-width: 1920px) {
        .bg {
            height: 813px !important;
        }
        .content, .fastnews, .detail {
            height: 803px!important;
        }
    }
    @media only screen and (max-width: 1800px) {
        .bg {
            height: 813px !important;
        }
        .content, .fastnews, .detail {
            height: 803px!important;
        }
    }
    @media only screen and (max-width: 1700px) {
        .bg {
            height: 813px !important;
        }
        .content, .fastnews, .detail {
            height: 803px!important;
        }
    }
    @media only screen and (max-width: 1600px) {
        .bg {
            height: 678px !important;
        }
        .content, .fastnews, .detail {
            height: 670px!important;
        }
    }
    @media only screen and (max-width: 1440px) {
        .bg {
            height: 610px !important;
        }
        .content, .fastnews, .detail {
            height: 602px!important;
        }
    }
    @media only screen and (max-width: 1366px) {
        .bg {
            height: 578px !important;
        }
        .content, .fastnews, .detail {
            height: 570px !important;
        }
    }
    @media only screen and (max-width: 1280px) {
        .bg {
            height: 542px !important;
        }
        .content, .fastnews, .detail {
            height: 536px !important;
        }
    }
    //
    @media only screen and (min-width: 801px) {
        .appDownloadwrap {
            width: 100%;
            .h5 {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 800px) {
        .appDownloadwrap {
            width: 100%;
            height: 100%;
            .pc {display: none;}
            .down {
                width: 16px;
                height: 9px;
                background-image: url('../../../assets/img/arrow@2x.png');
                margin:  0 auto;
                background-size: cover;
                margin-bottom:25px;
                &:focus{
                    outline: none;
                }
            }
            .btn {
                width:210px;
                height:42px;
                /*background:#FCDD9C;*/
                /*color:#D7B47C;*/
                border: 2px solid #fff;
                border-radius: 22px;
                margin: 0 auto;
                text-align: center;
                position: absolute;
                bottom: 10vh;
                left: 0px;
                right: 0px;
                z-index: 300;
                box-shadow:4px 0px 10px rgba(12,54,117,0.7);
                background: -webkit-linear-gradient(to right,#FFEDC7,#FCDD9C); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(to right,#FFEDC7,#FCDD9C); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(to right,#FFEDC7,#FCDD9C); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right,#FFEDC7,#FCDD9C); /* 标准语法 (必须在最后) */
                span{
                    font-size:18px;
                    font-family:'PingFangSC-Regular';
                    color:#A76F26;
                    line-height: 42px;
                }
            }
        }
        html,body {
            position: relative;
            height: 100%;
        }
        .swiper-container, .h5 {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            &:first-child {
                background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/bg.png");
                background-size: cover;
                background-repeat: no-repeat;
            }
            &:nth-child(2) {
                background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/bg.png");
                background-size: cover ;
                background-repeat: no-repeat;
            }
            &:nth-child(3) {
                background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/download/bg.png");
                background-size: cover;
                background-repeat: no-repeat;
                .down{
                    opacity:0;
                }
            }
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .copy{color: #fff;font-size: 12px;font-family: 'font-family:PingFangSC-Light'; margin:  0 auto;text-align: center;}
        }
        .re{
            position: relative;
            .re-right{
                position:absolute;
                top: 0px;
                right: 0px;
                height: 100vh;
                width: 85vw;
            }
            .re-bottom{
                position:absolute;
                width: 100vw;
                bottom: 0px;
                right: 0px;
            }
            .re-title{
                z-index: 66;
                width: 85vw;
                height: 10vh;
                margin: 6vh auto;
            }
            .re-rules{
                width: 93vw;
                height: 48vh;
                margin: 10vh auto;
                margin-top: -10vh;
            }
            .re-guise{
                width: 69vw;
                /*height: 3vh;*/
                margin: 0 auto;
                margin-top: -5vh;
                z-index: 66;
            }
            .re-guise-btn{
                /*font-weight: bolder;*/
                width:210px;
                height:42px;
                /*background:#FCDD9C;*/
                /*color:#D7B47C;*/
                border: 2px solid #fff;
                border-radius: 22px;
                margin: 0 auto;
                text-align: center;
                /*position: absolute;*/
                margin-bottom: 7vh;
                z-index: 300;
                box-shadow:4px 0px 10px rgba(12,54,117,0.7);
                background: -webkit-linear-gradient(to right,#FFEDC7,#FCDD9C); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(to right,#FFEDC7,#FCDD9C); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(to right,#FFEDC7,#FCDD9C); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right,#FFEDC7,#FCDD9C); /* 标准语法 (必须在最后) */
                span{
                    font-size:18px;
                    font-family:'PingFangSC-Regular';
                    color:#A76F26;
                    line-height: 42px;
                }
            }
            .bg-fire{
                z-index: 66;
                width: 100vw;
            }
        }
        .swiper-button-next{
            position: static;
        }
        .bg1,.bg2{
            display: block;
            width: 100vw;
        }
        .bg1-1{
            height: 79vh;
        }
        .bg2{
            position: absolute;
            bottom:0px;
        }
    }
    @media only screen and (min-width: 414px) {
        .swiper-slide {
            &:nth-child(2) {
                .pic{
                    height: 420px;
                    width: 280px;
                }
            }
            &:nth-child(3) {
                .pic {
                    height: 430px;
                    width: 300px;
                }
            }
            &:nth-child(4) {
                .pic {
                    height: 460px;
                    width: 330px;
                }
            }
        }
    }
    @media only screen and (min-width: 768px) {
        .appDownloadwrap .btn{
            width: 420px;
            height: 84px;
            border-radius: 44px;
            span{
                font-size: 36px;
                line-height: 84px;
            }
        }
        .swiper-slide {
            &:nth-child(1) {
                background-size: 100% 100%;
                .logo{width: 360px;height: 360px;}
                .words{height: 144px;width: 564px;}
            }
            &:nth-child(2) {
                background-size: 100% 100%;
            }
            &:nth-child(3) {
                background-size: 100% 100%;
            }
            &:nth-child(4) {
                background-size: 100% 100%;
                .copy{font-size: 24px;}
            }
        }
    }
    .pc{
        position: relative;
        width: 100%;
        background: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/worldcup/cup/bg@3x.png");
        background-size: cover;
        background-repeat: no-repeat;
        img{
            display: block;
        }
        .zero{
            position: absolute;
            top: 0;
            left: 23vw;
            img{
                width: 7vw;
                z-index: 66;
            }
        }
        .one{
            img{
                width: 100%;
                /*height: 900px;*/
            }
        }
        .two{
            padding-bottom: 34px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            .two-img{
                margin-left: 3vw;
            }
            img{
                width: 19vw;
            }
        }
        .three{
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            padding: 41px 0;
            img{
                width: 34vw;
            }
        }
        .four{
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            img{
                width: 51vw;
            }
        }
        .five{
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            padding: 90px 0 131px 0;
            img{
                width: 32vw;
            }
        }
    }
</style>

