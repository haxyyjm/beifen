
<template>
    <div>
        <el-dialog class="houseTypeClass"  append-to-body width="50%"   title="上传图片" @close="$emit('update:show', false);flushMedia()" :show="show" :visible.sync="pictureComponentDialog" :modal="false">
            <div style="height: 300px;width:601px;margin:0 auto">
                <div style="border:1px solid ; display: flex;">
                    <video id="video_1" style="width= 100%; height=100%; object-fit: fill"  autoplay="autoplay"></video>
                    <canvas id="canvas_2"  width="300px" height="300px"></canvas>
                </div>
          </div>
          <div slot="footer"  class="dialog-footer">
            <div style="text-align: center">
                <el-button size="mini" type="primary" @click="getMedia()">扫描拍照</el-button>
                <el-button  size="mini" type="primary" @click="takePhoto()">照片上传</el-button>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
    import _ from 'lodash'
    import * as media from './video.js'
    export default {
        data () {
            return {
                img_token:'',//需传给dyl
                card_number: '',
                cardType: '',
                // uploadUrl: 'https://image.eloadspider.com/resource/employee/head_image/upload',
                uploadUrl: 'http://oss.crowncrystalhotel.com/resource/live/upload',
                policeDialog_2: false,
                liveoptions_Value: [],
                pictureParamInfo: {
                },//上传公安对象
                pictureParamIndex: '',
                pictureUrl:{
                    imageUrl: '',
                    index: '',
                    face_id: ''
                },
                pictureComponentDialog: this.show,
            };
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            pictureParam:{
                type: Object,
                required: true
            }
        },
        watch: {
            show () {
                this.pictureComponentDialog = this.show;
            },
            pictureParam(){
                console.log('...........................')
                console.log('pictureParamInfo',this.pictureParam)
                this.pictureParamInfo = _.cloneDeep(this.pictureParam)
                console.log('this.pictureParamInfo===2',this.pictureParamInfo)
            },
        },
        computed:{
        },
        created(){
        },
        methods: {
            flushMedia(){
                this.clearPhoto() //清除掉图片
            },
            clearPhoto(){
                try {
                    var c=document.getElementById("canvas_2");
                    var ctx=c.getContext("2d");
                    ctx.fillRect(0, 0, 300, 300);
                } catch (error) {
                    console.log('error')
                }
            },
            //获取摄像头
            getMedia(){
                this.clearPhoto() //清除掉图片
                media.getMedia('300','300','video_1')
            },
            //拍照上传
            takePhoto(param){
                console.log('localStorage.', JSON.parse(localStorage.getItem('pictureParam_guest')))
                this.pictureParamInfo = JSON.parse(localStorage.getItem('pictureParam_guest'))//获取当前行
                this.pictureParamIndex = localStorage.getItem('pictureParam_index')//获取当前行
                console.log('localStorage...2222',this.pictureParamIndex)
                let that = this
                //获得Canvas对象
                let video = document.getElementById("video_1");
                let canvas = document.getElementById("canvas_2");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 300, 300);
                canvas = canvas.toDataURL("image/png");
                console.log('canvas=================base64',canvas)
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
                    var fd = new FormData();
                    fd.append("upfile", file,"image.png");
                    console.log('fd',fd)
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    if(blob){
                    let url = that.uploadUrl;
                    that.$axios.post(url,fd,config).then(res=>{
                        console.log('res==blob===21312312========',res.data.url)
                        if(res.data.url){
                        // that.imageUrl = 'https://image.eloadspider.com/' +  res.data.url
                        that.imageUrl = res.data.complete
                        that.$message.success('上传图片成功!')
                        console.log('that.imageUrl=====',that.imageUrl)
                        console.log('。。。。',this.pictureParamInfo.reserve_guest)
                        this.pictureUrl.imageUrl = that.imageUrl //获取拍摄的照片====>然后调取小萌的接口进行face判断
                        this.pictureUrl.index = that.pictureParamIndex//获取拍摄的照片与对应人的索引，从而找到相应index
                        this.addFaceUrl(that.imageUrl)//添加图片地址给sxm 并传值给父级
                        // this.sendToParent()
                        this.pictureComponentDialog = false
                        //暂时这样判断
                        // for(var item of that.pictureParamInfo.reserve_guest){
                        //     if(!item.pic_sign && !item.pic_photo){
                        //         item.pic_sign = that.imageUrl  //拍摄照片传入
                        //         item.pic_photo = that.pictureParamInfo.card_imgUrl //该入住人得证件照
                        //         break
                        //     }
                        // }
                    }
                    }).catch((err)=>{
                        console.info(err);
                    })
                    } else {
                        /**
                         *
                         */
                    }
                }
            },
            /**
             * 添加每一行图片地址给sxm=>数据传到父级更新
             */
            addFaceUrl(imageUrl){
                let that = this
                let face_set = localStorage.getItem('face_set')
                that.$axios({
                url: 'http://sms.crowncrystalhotel.com/v1/authentication/ht/rf/faceset_add_face_url/',
                method: "post",
                data:{
                   img_list: [{
                       user_id:"sxm",
                       img_url: imageUrl,
                       id: ''
                   }],
                   outer_id: face_set,
                },
                }).then(res=>{
                    //如果扫码成功
                    console.log('..imgToken..',res)
                    if (res.data.message === "success"){
                        this.img_token = res.data.data.result[0].img_token
                        this.pictureUrl.face_id = this.img_token//获取拍摄的照片与对应人的索引，从而找到相应index
                        console.log('this.img_token',this.img_token)
                        this.sendToParent()
                    }
                    else{
                        this.$message.warning('请正对摄像头拍照!保持录入人脸!')
                    }
                })
                .catch(error=>{
                console.log(error);
                });
            },
            //数据到父级更新prebillParam
            sendToParent(){
                console.log('....更新reserveguest',this.pictureParam)
                console.log('this.pictureUrl',this.pictureUrl)
                this.$emit('listenToPicture', this.pictureUrl)
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
            },
        }
    }
</script>
<style lang="less" scoped>
//消费样式
.cousume_class{
    display: flex; 
    justify-content: space-between;
    margin: 10px 0px 0px 10px;
}
</style>
<style scoped>
    .houseTypeClass>>> .el-dialog__header{
        background-color: #8895A8;
    }
    .houseTypeClass>>>.el-dialog__title {
        color: white;
    }
    .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
        color: white;
    }
    .houseTypeClass>>> .el-dialog__footer{
        background-color: #F5F5F5;
        line-height: 35px;
    }
    .houseTypeClass.deletePadding_Class>>> .el-dialog__body{
        padding: 0px 0px;
    }
    .houseTypeClass>>> .el-collapse-item__content {
        padding-bottom: 10px
    }
    .houseTypeClass>>> .el-collapse-item__header{
        background-color: transparent;
        height: 40px;
        padding-left:10px;
    }
    .police-class >>> .el-dialog__header{
        padding: 0px 0px 0px;
   }
    .police-class >>> .el-dialog__body{
        background-color: #000000;
        opacity: 0.7;
   }
    .police-class >>> .el-dialog__footer{
        background-color: #000000;
        opacity: 0.7;
   }
</style>