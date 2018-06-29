<template>
  <div>
              <el-dialog
                  class = 'LoginModal LoginFastModal'
                  title="登录"
                  :visible="visible"
                  width="331px"
                   :before-close = "closeModal"
                  center
                   append-to-body
                  >
                  <div v-if = "visible" class="forGetBox LoginFast">
                      <div>
                          <div class="ln">
                              <div id="loginfastBlock"></div>
                          </div>
                            <input type='hidden' id='csessionid' name='csessionid'/>
                            <input type='hidden' id='sig' name='sig'/>
                            <input type='hidden' id='token' name='token'/>
                            <input type='hidden' id='scene' name='scene'/>
                      </div>
                    </div>
               </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  data() {
    return {

    }
  },
  components: {},
  props: {
    visible:{}
  },
  //已成功挂载，相当ready()
  mounted(){

  },
  //相关操作事件
  methods: {

  }
}
</script>
<style scoped>

</style>
