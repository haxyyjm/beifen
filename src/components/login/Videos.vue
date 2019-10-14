<template>
  <div class="videos" ref="videos">
    <video
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      id="video" class="vio" autoplay="autoplay" v-show="video_show"></video>
    <!--隐藏掉   为了发送照片-->
    <canvas id="canvas" width="498" height="238" v-show="canvas_show"></canvas>
  </div>
</template>

<script>
  export default {
    name: "Videos",
    props:{
      isOpen : false
    },
    data() {
      return {
        video_show : true,
        canvas_show : false,
        url : '',
        loading : true,
      }
    },
    watch:{
      isOpen(val){
        this.isOpen = val;
        console.info(val);
        if(val){
          this.camera_options();
        }
      }
    },
    methods: {
        camera_options(){
        let that = this;
        var constraints = {
          video: {
            width: 498,
            height: 238
          },
        };
        var videos = this.$refs.videos;
        console.info(videos);
        var promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then((MediaStream) => {
          /**
           * @desc MediaStream 返回参数
           * active: true
           * id: "ykCZTVor0KNVypRFZW8dFSwrFd9QuihhWmqA"
           * onactive: null
           * onaddtrack: null
           * oninactive: null
           * onremovetrack: null
           */
          console.info(MediaStream);
          video.srcObject = MediaStream;
          video.play();
        }).catch((error) => {
          console.info(error);
        });
        /**
         * @desc 倒计时以后进行拍照的操作
         */
        setTimeout(function() {
          let canvas = document.getElementById("canvas");
          console.info(canvas);
          canvas.getContext('2d').drawImage(video, 0, 0, 200, 100);
          console.info(typeof video);
          console.info(canvas.getContext('2d').drawImage(video, 0, 0, 200, 100));
          /**
           * @desc 拿到图片的base64
           * @param canvas base64
           */
          canvas = canvas.toDataURL("image/png");
          console.info(canvas);
          /**
           * @desc 拍照以后将video元素移除
           * @desc 拍照将base64转为file文件
           */
          if(canvas) {
            /**
             * 元素移除操作不进行，因为是直接发送照片，但是不进行照片的展示。
             */
            let blob = that.dataURLtoBlob(canvas);
            let file = that.blobToFile(blob, "imgName");
            if(blob){
              let url = that.url+'';
              that.$axios({
                   method : ' post',
                   url : url,
                   data : {

                   }
              }).then((res)=>{
                /**
                 * 判断是不是请求验证成功，如果成功直接登录，失败的话，直接重新发送
                 */
                 console.info(res);
              }).catch((err)=>{
                 console.info(err);
              })
            }
            console.info(file);
          } else {
            /**
             *
             */
          }
        }, 1000);
      },
      /**
       * 将图片转为file格式
       * @param {Object} dataurl 将拿到的base64的数据当做参数传递
       */
      dataURLtoBlob : function(dataurl) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
      },
      /**
       *
       * @param {Object} theBlob  文件
       * @param {Object} fileName 文件名字
       */
      blobToFile : function(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      }
    },
  }
</script>

<style scoped>
  .videos {
    /*height: 238px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #CCCCCC;
    border-radius: 4px*/
  }
  #video{
    height: 238px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #CCCCCC;
    border-radius: 4px
  }
</style>
