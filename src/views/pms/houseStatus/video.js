      //获取摄像头
     export function getMedia(wdith_value,height_value,id_value){
        console.log('进入sss',height_value)
        // navigator.getUserMedia()
        let constraints = {
          video: {width: wdith_value, height: height_value},
          audio: true
        };
        //获得video摄像头区域
        // let video = document.getElementById("video");
        // console.log('viedo',video)
        //这里介绍新的方法，返回一个 Promise对象
        // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
        // then()是Promise对象里的方法
        // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
        // 避免数据没有获取到
        let video = document.getElementById(id_value)
        console.log(video,'video','navigator.mediaDevices',navigator.mediaDevices,navigator.mediaDevices.getUserMedia)
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function(constraints) {
            // 首先，如果有getUserMedia的话，就获得它
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            // 否则，为老的navigator.getUserMedia方法包裹一个Promise
            return new Promise(function(resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          }
        }
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then(function (MediaStream) {
          if ("srcObject" in video) {
            video.srcObject = MediaStream;
          } else {
            // 防止在新的浏览器里使用它，应为它已经不再支持了
            video.src = window.URL.createObjectURL(MediaStream);
          }
            video.onloadedmetadata = function(e) {
            video.play();
          };
            // video.srcObject = MediaStream;
            // video.play();
        }).catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
      }