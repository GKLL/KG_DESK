<template>
	<div id="app">
    <component :is='pick' :startTime = "startTime" :endTime = "endTime"></component >
	</div>
</template>
<script>
import PCMine from 'components/PCMine'
import H5Mine from 'components/H5Mine'
import Lib from 'assets/js/Lib';
let pick = (function () { 
  var sUserAgent= navigator.userAgent.toLowerCase(); 
  var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
  var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
  var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
  var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
  var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
  var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
  var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce"; 
  var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { 
    return 'H5Mine'
  } else { 
    return 'PCMine'
  } 
})()

export default {
  data(){
    return {
      startTime:'',
      endTime:'',
      pick
    }
  },
  components: {
    PCMine,
    H5Mine
  },
  mounted(){
      const that = this;
      const time_list = Lib.M.postDataRequest('')
      Lib.M.loginAjax({
                  'type':'post',
                  'url':'/kgApp/miner/minerTime',
                  "data": time_list,
                  'success':function (data){
                    if(data.code == 10000){
                      let startTime = parseInt(data.data.minerActivityTime.startTime);
                      let endTime = parseInt(data.data.minerActivityTime.endTime);
                      that.startTime = new Date(startTime).toLocaleString();
                      that.endTime = new Date(startTime).toLocaleString();
                    }else{
                        that.$message({
                          message: data.message,
                          type: 'error'
                        });
                    }
              }
    });
    Date.prototype.toLocaleString = function() {
      let minutes =  this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
      return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " + this.getHours() + ":" + minutes;
    };
  }
}
</script>
<style>  
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
}
*,*:after,*:before {
  box-sizing: border-box;
}
#app {
  position: relative;
  height: 100%;
}
</style>