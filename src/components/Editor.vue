<template>
  <div>
      <div id="editorElem" style="text-align:left"></div>
      <!-- <button v-on:click="getContent">查看内容</button> -->
      <span class = 'marlr10 martop10 fr'>还可以输入{{n}}</span>    
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import E from 'wangeditor'
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          editorContent2:'',
          n:5000,
        }
      },
      methods: {
        getContent: function () {
          var text =  this.editorContent2
            var arr = text.split('&nbsp;')
            text = arr.join('')
        }
      },
      mounted() {
        const that = this;
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.editorContent2 = editor.txt.text()
          var text = this.editorContent2;
          var arr = text.split('&nbsp;')
          text = arr.join('') 
          var num = 5000;
          var l = text.length;
          var n = num -l;
          this.n = n;      
        }       
        editor.customConfig.uploadImgServer = Lib.C.uploadImgUrl;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
        editor.customConfig.zIndex = 100;
        editor.customConfig.customAlert = function (info) {
            // info 是需要提示的内容
                    that.$message({
                        message: info,
                        type: 'error'
                    });
        }
        editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                    // }
                },
                success: function (xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error: function (xhr, editor) {
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout: function (xhr, editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },

                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    var url = Lib.C.imgUrl + result.data[0].filePath;
                    insertImg(url)
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            }
               editor.customConfig.colors = [
                  '#000000',
                  '#f00',
              ]
          editor.customConfig.menus = [
              'head',
              'bold',
              'italic',
              'strikeThrough',
              'underline',
              'justify',
              'foreColor',
              'image',
              'undo',
              'redo',
          ]
          editor.create()
        }  
    }
</script>

<style scoped>
</style>
