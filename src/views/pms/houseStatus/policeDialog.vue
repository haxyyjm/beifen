
<template>
    <div>
        <el-dialog class="houseTypeClass" width="50%"   title="上传公安" @close="$emit('update:show', false);policeParamInfo.liveStatus = 0" :show="show" :visible.sync="policeComponentDialog" :modal="false">
          <div style="height: 400px; display: flex; justify-content: space-between;">
            <div>
              <el-form  label-width="80px" :inline="true" :model="policeParamInfo">
                <el-form-item label="姓名">
                  <el-input  v-model="policeParamInfo.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="房间号">
                  <!-- <el-input v-model="policeParam.room_no" placeholder="房间号"></el-input> -->
                    <el-select   v-model="policeParamInfo.room_no" style="width: 206px">
                      <el-option  v-for="itemm in  policeParamInfo.liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span>{{ itemm.roomNo }}</span>
                      </el-option>  
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input  v-model="policeParamInfo.sex" placeholder="性别"></el-input>
                </el-form-item>
                <el-form-item label="入住时间">
                  <el-input readOnly v-model="policeParamInfo.time" placeholder="入住时间"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-input  v-model="policeParamInfo.cardType" placeholder="证件类型"></el-input>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input  v-model="policeParamInfo.cardNo" placeholder="证件号码"></el-input>
                </el-form-item>
                <el-form-item label="民族">
                  <el-input  v-model="policeParamInfo.nation" placeholder="民族"></el-input>
                </el-form-item>
                <el-form-item label="户籍地址">
                  <el-input  v-model="policeParamInfo.address" placeholder="户籍地址"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                  <!-- <el-input  v-model="policeParam.birthday" placeholder="出生日期"></el-input> -->
                    <el-date-picker
                        v-model="policeParamInfo.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="policeParamInfo.telephone" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="policeParamInfo.remark" placeholder="备注"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- <div style="width: 90%;height: 200px;border: 1px solid;margin-right: 50px">
            </div> -->
          </div>
          <div slot="footer"  class="dialog-footer">
            <div style="text-align: center">
              <el-button  size="mini" type="primary" @click="handleCompare()">对比入住</el-button>
              <!-- <el-button  size="mini" type="primary">入住</el-button> -->
              <span style="margin-left: 50px;margin-right: 20px">同住:</span>  
              <el-radio-group v-model="policeParamInfo.liveStatus">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-dialog>
          <!--公安摄像头展示-->
        <el-dialog @close="flushMedia" :close-on-click-modal="false" class="police-class" :modal="false" :append-to-body="true" :show-close="false" :visible.sync="policeDialog_2" width="30%">
          <div style="height: 150px;width:100%">
              <div style="margin:0 auto; margin-left: 40px;height: 150px; width: 160px; border: 1px solid #CCCCCC;background-color: #000000">
                  <video id="video_2"  width="150px" height="150px" autoplay="autoplay"></video>
                  <canvas id="canvas" style="position: absolute;left: 220px"  width="150px" height="150px"></canvas>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <div style="text-align: center">
              <el-button size="mini" type="primary" @click="policeDialog_2=false">取消操作</el-button>
              <el-button size="mini" type="primary" @click="getMedia()">扫描拍照</el-button>
              <el-button @click="comparePic()"  size="mini" type="primary">对比登记</el-button>
              <el-button  size="mini" type="primary" @click="takePhoto()">照片上传</el-button>
            </div>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import _ from 'lodash'
    import * as media from './video.js'
    export default {
        data () {
            return {
                card_number: '',
                cardType: '',
                // uploadUrl: 'https://image.eloadspider.com/resource/employee/head_image/upload',
                uploadUrl: 'http://oss.crowncrystalhotel.com/resource/police/upload',
                policeDialog_2: false,
                liveoptions_Value: [],
                policeParamInfo: {
                    liveStatus: 0,
                },//上传公安对象
                policeComponentDialog: this.show,
            };
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            policeParam:{
                type: Object,
                required: true
            }
        },
        watch: {
            show () {
                this.policeComponentDialog = this.show;
            },
            policeParam(){
                console.log('policeParamInfo=======子组件',this.policeParamInfo)
                this.policeParamInfo = _.cloneDeep(this.policeParam)
                this.policeParamInfo.liveStatus = 0
                console.log('this.policeParam===',this.policeParam)
            },
        },
        computed:{
        },
        created(){
        },
        methods: {
            getEnter_RommNumber(){
                
            },
            handleCompare(){
                this.policeDialog_2=true;
                // try {
                //     if(this.policeParam.cardNo){
                //         if(this.policeParam.room_no){
                //         this.policeDialog_2=true;
                //         }else{
                //         this.$message.warning('请选择房间号!')
                //         }
                //     }else{
                //         this.$message.warning('请录入信息!')
                //     }
                // } catch (error) {
                //     this.$message.warning('请正确操作!')
                //     console.log('error')          
                // }
            },
            flushMedia(){
                this.clearPhoto() //清除掉图片
            },
            clearPhoto(){
                try {
                    var c=document.getElementById("canvas");
                    var ctx=c.getContext("2d");
                    ctx.fillRect(0, 0, 150, 150);
                } catch (error) {
                    console.log('error')
                }
            },
            //获取摄像头
            getMedia(){
                this.clearPhoto() //清除掉图片
                media.getMedia('150','150','video_2')
            },
            //拍照上传
            takePhoto(param){
                let that = this
                //获得Canvas对象
                let video = document.getElementById("video_2");
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 150, 150);
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
                        console.log('res==blob',res.data.url)
                        if(res.data.url){
                        // that.imageUrl = 'https://image.eloadspider.com/' +  res.data.url
                        that.imageUrl = res.data.complete
                        that.$message.success('上传图片成功!')
                        console.log('。。。。',this.policeParamInfo.reserve_guest)
                        //暂时这样判断
                        for(var item of that.policeParamInfo.reserve_guest){
                            if(!item.pic_sign && !item.pic_photo){
                                item.pic_sign = that.imageUrl  //拍摄照片传入
                                item.pic_photo = that.policeParamInfo.card_imgUrl //该入住人得证件照
                                break
                            }
                        }
                        console.log('。。。。ddudididididididi',this.policeParamInfo.reserve_guest)
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
                //认证对比
                comparePic(){
                    console.log('...1',this.policeParamInfo.card_imgUrl)
                    console.log('...2',this.imageUrl)
                    // this.registerInfo()//入住人登记接口,以后可能还有同住人
                    this.getPercent()
                },
                //得到百分比(对比照片得到百分比参数)==feiqi====>认证对比之后拿到对比度然后上传调用
                getPercent(){
                    let that = this
                    // that.getToken()//获取token废弃===>在后台实现了
                    // let url = 'http://sms.crowncrystalhotel.com/v1/authentication/ht/rf/no_auth_one_to_one_percent/'
                    let url = 'https://sms.eloadspider.com/v1/authentication/ht/rf/no_auth_one_to_one_percent/'
                    let scopeParam = {
                        image_url1: that.policeParamInfo.card_imgUrl,
                        image_url2: that.imageUrl,
                    }
                    that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res',res)
                    if(res===undefined){
                        this.$message.warning('请正确操作!')
                    }else{
                        console.log('res百分比',res.data.data)
                        that.percent = res.data.data
                        that.registerInfo()//开始登记
                    }
                    })
                },
                //注册身份证信息上传到公安(境内主入住人的人脸和身份信息到公安接口)
                registerInfo(){
                    console.log('if(policeParam.liveStatus)',this.policeParam.liveStatus)
                    this.policeParamInfo.birthday.length > 9 ? this.policeParamInfo.birthday : this.policeParamInfo.birthday = this.policeParamInfo.birthday.slice(0,4) + '-' + this.policeParamInfo.birthday.slice(4,6) + '-' + this.policeParamInfo.birthday.slice(6,8)
                    let that = this
                    let urerInfo = JSON.parse(localStorage.getItem('userInfo'))
                    let hotel_id = urerInfo['hotel_id']
                    let scopeParam
                    let url
                    // that.transferData()//转换处理数据
                    let url_enter = 'http://organ.crowncrystalhotel.com/v1/organization/ht/public_security/pms_submit_check_in_master/'
                    let url_same = 'http://organ.crowncrystalhotel.com/v1/organization/ht/public_security/pms_submit_check_in_add/'
                    //入住人
                    if(this.policeParamInfo.liveStatus === 0){
                        let scopeParam_enter = {
                            // hotel_id: hotel_id,
                            // device_code: 'ByA29WcYF94SoWTjo533RLeV3JBi9KcIsLdYTdzjnk4=',
                            card_type: this.policeParamInfo.cardType,//证件类型
                            // register_type: 14,//登记类型
                            similarity_degree: this.percent === '0' ? this.percent + '%'  : this.percent,
                            room_number:  this.policeParamInfo.room_no,
                            // room_number:  '1001',
                            card_number: this.policeParamInfo.cardNo,
                            user_name: this.policeParamInfo.name,
                            sex: this.policeParamInfo.sex + '性',
                            birthday: this.policeParamInfo.birthday,
                            permanent_address: this.policeParamInfo.address,
                            nation: this.policeParamInfo.nation + '族',
                            photo: this.imageUrl,//现场拍摄照片
                            profile_photo: this.policeParamInfo.card_imgUrl//身份证照片
                        }
                        if(scopeParam_enter.room_number){
                            this.card_number = scopeParam_enter.card_number
                            this.card_type = scopeParam_enter.card_type
                            url = url_enter
                            scopeParam = scopeParam_enter
                        }else{
                            this.$message.warning('请选择房间号!')
                        }
                    }else{
                        console.log('this.cardTypethis.cardType',this.cardType)
                        //同住人对象
                        let scopeParam_same = {
                            // hotel_id: hotel_id,
                            // device_code: 'ByA29WcYF94SoWTjo533RLeV3JBi9KcIsLdYTdzjnk4=',
                            similarity_degree: this.percent === '0' ? this.percent + '%'  : this.percent,
                            room_number:  this.policeParam.room_no,
                            // room_number:  '1001',
                            // card_number: '342427199509182519',//证件号码
                            // original_card_number: '411323199309163430',//入住人证件号码
                            original_card_number: this.card_number,//入住人证件号码//相反操作
                            card_number: this.policeParamInfo.cardNo,//同住人证件号码//相反操作
                            // card_type:  '身份证',//证件类型
                            // original_card_type: '身份证',//入住人证件类型
                            original_card_type: this.cardType ? this.cardType : '身份证',//入住人证件类型
                            card_type:  this.policeParamInfo.cardType,//同住人证件类型
                            user_name: this.policeParamInfo.name,
                            sex: this.policeParamInfo.sex + '性',
                            birthday: this.policeParamInfo.birthday,
                            permanent_address: this.policeParamInfo.address,
                            // register_type: 14,//登记类型
                            nation: this.policeParamInfo.nation + '族',
                            photo: this.imageUrl,//现场拍摄照片
                            profile_photo: this.policeParamInfo.card_imgUrl//身份证照片
                        }
                        if(scopeParam_same.card_number && scopeParam_same.room_number){
                            url = url_same
                            scopeParam = scopeParam_same
                        }else{
                            this.$message.warning('请登记入住人或选择房间号!')
                        }
                    }
                    console.log('url',url)
                    console.log('scopeParamscopeParam同住人',scopeParam)
                    that.sendToParent()
                    that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res',res)
                        if(res.data.msg == 'OK'){
                            that.$message.warning('登记成功')
                            that.policeDialog_2 = false;//关闭dialog
                            that.policeComponentDialog = false
                        }else{
                            that.$message.warning(res.data.msg)
                        }
                    }).catch(()=>{
                        that.$message.warning('接口错误!')
                    })
                },
                //数据到父级更新prebillParam
                sendToParent(){
                    console.log('....更新reserveguest',this.policeParam)
                    this.$emit('listenToPolice', this.policeParamInfo)
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