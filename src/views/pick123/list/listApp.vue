<template>
	<div id="app">
    <component :is='pick'></component >
	</div>
</template>
<script>
import PCPick from 'components/PCPick'
import H5Pick from 'components/H5Pick'

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
    return 'H5Pick'
  } else { 
    return 'PCPick'
  } 
})()

export default {
  data(){
    return {
      pick
    }
  },
  components: {
    PCPick,
    H5Pick
  },
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