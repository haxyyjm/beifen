<template>
    <div class="basicInfo" style="background: #eeeeee">
      <div class="left">
        <div class="message">
          <p>基本信息</p>
          <ul >
            <li> <span style="vertical-align:top;">集团全称：</span><div >{{group_list.full_name}}</div></li>
            <li> <span>集团简称：</span><div >{{group_list.short_name}}</div></li>
            <li> <span>代码：</span><div >{{group_list.code}}</div></li>
            <!--<li style="height: 46px;line-height: 46px">-->
              <!--<span>审核状态：</span>-->
              <!--<el-checkbox v-if="group_list.creator==1" v-model="checked1" disabled style="display: inline-block">已通过</el-checkbox>-->
              <!--<el-checkbox v-else   v-model="checked1" disabled style="display: inline-block">未通过</el-checkbox>-->
            <!--</li>-->
            <li> <span>中文描述：</span><div >{{group_list.desc}}</div></li>
            <li> <span>英文描述：</span><div >{{group_list.desc_en}}</div></li>
          </ul>

        </div>
        <div class="contact">
          <p>联系方式</p>
          <ul>
            <li> <span>总机：</span><div >{{group_list.office_tel}}</div></li>
            <li> <span>国家：</span><div >{{group_list.country_code}}</div></li>
            <li> <span>订房电话：</span><div >{{group_list.reserve_tel}}</div></li>
            <li> <span>州/省：</span><div >{{group_list.province}}</div></li>
            <li> <span>服务电话：</span><div >{{group_list.service_tel}}</div></li>
            <li> <span>城市：</span><div >{{group_list.city}}</div></li>
            <li> <span>传真：</span><div >{{group_list.fax}}</div></li>
            <li style="height: 46px;vertical-align: top">
              <span style="vertical-align: top;margin-top: 5px">地理位置：</span>
              <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 40px" >东经 ： </span>
              <span style="width: 60px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_east}}</span>
                <!--v-for="item in ipaddrArray" :key="item">{{item}}</span>-->

              <!--<span style="width: 90px;height: 40px; border: 1px solid rgba(204,204,204,1);line-height: 40px;overflow: hidden;text-overflow: ellipsis">{{group_list.position}}</span>-->
              <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 40px">北纬：</span>
              <span style="width: 60px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_west}}</span>

            </li>
            <li style="height: 46px;line-height: 46px">
              <span>状态：</span>
              <el-checkbox v-if="group_list.status==1"  v-model="checked" disabled style="display: inline-block">正常</el-checkbox>
              <el-checkbox  v-else="group_list.creator==0"   v-model="checked" disabled style="display: inline-block">停用</el-checkbox>
            </li>
            <li> <span>官网：</span><div >{{group_list.web_site}}</div></li>
            <li> <span>邮箱：</span><div >{{group_list.email}}</div></li>
          </ul>

        </div>
        <div class="phone">
          <img :src="src_group" alt="集团照片">

        </div>
      </div>
      <div class="right">
        <div class="log">
          <img :src="src_log" alt="log">
        </div>
        <ul class="site">
          <li>
            <span>DNS ： </span>
            <div>{{group_list.dns}}</div>
          </li>
          <li>
            <span>邮编 ： </span>
            <div>{{group_list.postal_code}}</div>
          </li>
          <li>
            <span style="vertical-align: top">地址1 ：</span>
            <div style="width: 300px;height: 100px;">{{group_list.address_1}}</div>
          </li>
          <li>
            <span style="vertical-align: top">地址2 ：</span>
            <div style="width: 300px;height: 100px;">{{group_list.address_2}}</div>
          </li>
        </ul>
        <ul class="establish">
          <li><span>创建人 ： </span><span>{{group_list.creator }}</span></li>
          <li><span>创建日期 ： </span><span>{{group_list.create_time }}</span></li>
          <li><span>修改日期 ： </span><span>{{group_list.last_time}}</span></li>
          <li><span>修改人 ： </span><span>{{group_list.last_user }}</span></li>
          <li><button @click="amend">修改</button>  <button @click="omit">删除</button> <button @click=" appObtain()">集团APP</button></li>

        </ul>
      </div>
     <!--查看集团的APP-->
        <!--编辑APp出现的页面-->
        <el-dialog
          title="集团APP"
          :visible.sync="dialogVisibleApp"
          width="60%"
          style="overflow: hidden"
          :before-close="handleClose" class="dialog-style" >
          <p style="display: inline-block;width: 198px;margin-bottom: 10px">集团名称 ：<span style="color:#4488e9"> {{group_list.full_name}}</span></p>
          <ul style="overflow: hidden">
            <el-transfer
              v-model="multipleSelection"
              style="float: left"
              :props="{key: 'id',label: 'name'}"
              :titles="['集团未拥有APP', '集团已添加APP ']"
              @change="handleChange"
              :data="appList"
            ></el-transfer>

          </ul>

          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleApp = false ;cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleApp = false; saveInfo_app()">确 定</el-button>
        </span>
        </el-dialog>
         <!--修改集团-->
          <el-dialog
            :visible.sync="dialogVisible"
            width="90%"
            :before-close="handleClose">
            <div class="basicInfo_amd" >
              <div class="left">
                <p>基本信息</p>
                <ul>
                  <li >
                    <i style="color: red;font-size: 18px">*</i>
                    <span>集团全称：</span>
                    <el-input v-model="full_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
                  <li >
                    <i style="color: red;font-size: 18px">*</i>
                    <span>集团简称：</span>
                    <el-input v-model="short_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>代码：</span>
                    <el-input v-model="code" placeholder="请输入内容" style="width: 217px"></el-input></li>
                  <li style="height: 46px;line-height: 46px">
                    <i style="color: red;font-size: 18px">*</i>
                    <span>审核状态：</span>
                    <el-radio v-model="radio" label="1">已通过</el-radio>
                    <el-radio v-model="radio" label="0">未通过</el-radio>
                  </li>
                  <li>
                    <span style="margin-left: 10px">中文描述：</span>
                    <el-input v-model="desc " placeholder="请输入内容" style="width: 217px"></el-input></li>
                  <li>
                    <span style="margin-left: 10px">英文描述：</span>
                    <el-input v-model="desc_en " placeholder="请输入内容" style="width: 217px"></el-input></li>
                </ul>
                <p>联系方式</p>
                <ul>
                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>总机：</span>
                    <el-input v-model="office_tel "     placeholder="请输入内容" style="width: 217px"></el-input></li>
                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>国家：</span>
                    <el-select v-model="country_code" placeholder="请选择">
                      <el-option
                        v-for="item in country_code_list"
                        :key="item.value"
                        :label="item.descript"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </li>

                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>订房电话：</span>
                    <el-input v-model="reserve_tel " placeholder="请输入内容"   style="width: 217px"></el-input>
                  </li>
                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>州/省：</span>
                    <el-input v-model="province" placeholder="请输入内容" style="width: 217px"></el-input></li>
                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>服务电话：</span>
                    <el-input v-model="service_tel" placeholder="请输入内容"  style="width: 217px"></el-input></li>
                  <li>
                    <i style="color: red;font-size: 18px">*</i>
                    <span>城市：</span>
                    <el-input v-model="city" placeholder="请输入内容" style="width: 217px"> </el-input></li>
                  <li>
                    <span style="margin-left: 10px">传真：</span>
                    <el-input v-model="fax" placeholder="请输入内容" style="width: 217px"></el-input>
                  </li>
                  <li style="height: 46px;vertical-align: top">
                    <span style="margin-top: 5px;margin-left: 10px">地理位置：</span>
                    <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block;" >东经:</span>
                    <input style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_east">
                    <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block;">北纬：</span>
                    <input style="width: 50px;height: 40px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_west">

                  </li>
                  <li style="height: 46px;line-height: 46px">
                    <i style="color: red;font-size: 18px">*</i>
                    <span>状态：</span>
                    <el-radio v-model="normal" label="1">正常</el-radio>
                    <el-radio v-model="normal" label="0">停用</el-radio>
                  </li>
                  <li>
                    <span style="margin-left: 10px">官网：</span>
                    <el-input v-model="web_site " placeholder="请输入内容" style="width: 217px"></el-input></li>
                  <li>
                    <span style="margin-left: 10px">邮箱：</span>
                    <el-input v-model="email" placeholder="请输入内容" style="width: 217px"></el-input></li>
                  <li style="width: 80%;height: 260px ;border: 1px solid #eeeeee">
                    <el-upload
                      style=" text-align: center"
                      class="upload-demo"
                      drag
                      action="http://47.97.178.98:9500/resource/hotel_group/photo/upload"
                      :on-success="handlehotel_group"
                      :before-upload="beforehotel_group"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </li>
                </ul>
              </div>
              <div class="right_amd">
                <div class="log">
                  <el-upload
                    class="avatar-uploader"
                    action="http://47.97.178.98:9500/resource/hotel_group/logo/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="src_log" :src="src_log" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">log</i>
                  </el-upload>
                </div>
                <ul class="site">
                  <li>
                    <span style="margin-left: 10px">DNS ： </span>
                    <el-input v-model="dns " placeholder="请输入内容" style="width: 217px"></el-input>
                  </li>
                  <li>
                    <span style="margin-left: 10px">邮编 ： </span>
                    <el-input v-model="postal_code"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 217px"></el-input>
                  </li>
                  <li>
                    <i style="color: red;font-size: 18px;vertical-align: top">*</i>
                    <span style="vertical-align: top">地址1 ：</span>
                    <textarea style="width: 300px; height: 100px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px" v-model="address_1 "></textarea>
                  </li>
                  <li>
                    <span style="vertical-align: top;margin-left: 10px">地址2 ：</span>
                    <textarea style="width: 300px; height: 100px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px" v-model="address_2 "></textarea>
                  </li>
                </ul>
                <ul class="establish">
                  <!--<li><span>创建人 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
                  <!--<li><span>创建日期 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
                  <!--<li><span>修改日期 ： </span><span>2019.2.15</span></li>-->
                  <!--<li><span>修改人 ： </span><span>admin</span></li>-->
                </ul>
              </div>

            </div>

            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
          </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "basic-info",

      data(){
        return{
          api:'http://47.98.113.173:9519',
          input:'',
          checked1: true,
          checked:true,
          basic:false,//新增机构显示的页面
          info:true,//页面打开显示的页面,
          masking:false,//蒙版层
          dialogVisibleApp: false,//集团App的显示隐藏
          hotel_masking:false,//酒店添加的蒙版显示
          group_list:[],//获取后台的集团信息
          group_full_name:'',//集团信息
          id:'',//选取集团信息的id
          position:'',//地理位置
          logo:'',//log
          //log里的东西
          dialogImageUrl: '',
          dialogVisible: false,
          appList:[],//后台传过来的app数组
          multipleSelection: [],//所选中的App数组
          splict_add:[],//地理位置
          group_hotel_id:'',
          country_code_list:[],//国家列表
          imageUrl:'',
          imge_list:'',
          imge_group:'',
          group_id:'',
        /**
         * 集团修改
         *
         * */
          // group:'',//集团信息的选择框
          full_name :'', //集团全称
          short_name :'',   //集团简称
          code :'',  //代码
          radio: "1",//审核状态
          desc:'',//中文描述
          desc_en:'',//英文描述
          office_tel:'',//总机
          country_code:'',//国家
          reserve_tel:'',//订房电话
          province:'',//州/省
          service_tel:'',//服务电话
          city:'',//城市
          fax:'',//传真
          position_east:'',// 东经
          position_west:'',// 北纬
          normal:'1',//正常
          web_site:'',//官网
          email:'',//邮箱
          photo:'',//集团照片
          log:'',//log
          dns:'',//DNS
          postal_code:'',//邮编
          address_1:'',//地址1
          address_2:'',//地址二
          src_log:'',
          src_group:'',

      }
      },
      created:function () {
        let that=this;
        // that.group = that.$route.query.group,  //接受参数关键代码

        that.country_info();


      },

      props:['group'],

      watch:{
        // $route: {
        //   handler: function(val, oldVal){
        //     console.log(val.query.group, 'valaaaaa');
        //     this. group_hotel_id=val.query.group;
        //     // this.full();
        //
        //   },
        //   // 深度观察监听
        //   deep: true
        // }
        group(val, oldValue){
         let  that = this;
          that.full();
          // console.log(val);
        },
        deep: true

      },

      methods:{
        //封装获取国家的列表
        country_info(){
          let that =this;
          that.$axios({
            url: "http://47.98.113.173:9103/v1/system/settings/get_country_list/?page_size=300",
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                // console.log(res.data.data.results);
                that.country_code_list=res.data.data.results;
                that.full();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装后台传过来的国家转换为名字
        code_desc(flag,data){
          // flag为1的时候code转desc
          let that = this,
            list = that.country_code_list;
          // console.log(list)
          for(let i in list){
            if(flag && data==list[i].code){
              return list[i].descript
            }else if(!flag && data==list[i].descript){
              return list[i].code
            }
          }
        },
        //封装获取集团信息
        full(){
          console.log(sessionStorage.getItem("authorization"));
          let that=this;
          that.group = sessionStorage.getItem('group');
          that.$axios({
            url: that.api+"/v1/common/hotel_group/get_info/"+that.group,
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.group_list=res.data.data;
                that.src_log = "http://47.97.178.98:9500/"+ that.group_list.logo;
                that.src_group = "http://47.97.178.98:9500/"+ that.group_list.photo;
                // position
                that.splict_add = that.group_list.position.split(',');
                // console.log(that.splict_add);
                that.position_east =  that.splict_add[0];
                that.position_west =  that.splict_add[1];
                  if (that.group_list.country_code != null) {
                    that.group_list.country_code = that.code_desc(1, that.group_list.country_code);
                  }
                } else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击修改
        amend(){
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2){
            this.dialogVisible=true;
            //集团蒙版的基本信息
            this.full_name =this.group_list.full_name;//集团全称
            this. short_name=this.group_list.short_name;  //集团简称
            this. code =this.group_list.code;  //代码
            //审核状态
            if (this.creator==0){
              this.radio="2";
            }else if(this.creator==1){
              this.radio="1";
            }
            console.log(this.group_list);
            this.group_id= this.group_list.id
            this. desc=this.group_list.desc; //中文描述
            this.desc_en=this.group_list.desc_en;//英文描述
            // // 集团蒙版的联系方式
            this.office_tel=this.group_list.office_tel;//总机
            this.country_code=this.group_list.country_code;//国家
            this.reserve_tel=this.group_list.reserve_tel;//订房电话
            this.province=this.group_list.province;//州/省
            this.service_tel=this.group_list.service_tel//服务电话
            this.city=this.group_list.city;//城市
            this.fax=this.group_list.fax;//传真
            // //地理位置
            this.splict_add = this.group_list.position.split(",");
            this.position_west=this.splict_add[1];// 北纬
            this.position_east=this.splict_add[0];
            // //状态
            // normal:'1',//正常
            if(this.normal==0){
              this.normal="2"
            }else if(this.normal=1){
              this.normal="1"
            }
            this. web_site=this.group_list.web_site//官网
            this.email=this.group_list.email//邮箱
            // photo:'',//集团照片
            this.logo=this.imge_list,//log
              this.dns=this.group_list.dns;//DNS
            this.postal_code=this.group_list.postal_code;//邮编
            this.address_1=this.group_list.address_1;//地址1
            this.address_2=this.group_list.address_2;//地址二
          }else {
            this.hintInfo("warning","您没有修改集团权限")
          }


        },
        //点击修改集团后的保存
        save(){
          let that = this;
          if((!that.full_name) || (!that.short_name) || (!that.code) || (!that.office_tel) || (!that.country_code) || (!that.reserve_tel) || (!that.province)
            || (!that.service_tel) || (!that.city)  || (!that.normal)  || (!that.address_1)

          ){
            that.hintInfo("warning","* 为必填项")

          }else {
            let tel = /0\d{2,3}-\d{7,8}/;
            if(!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)){
              that.hintInfo("warning","座机号码需以0开始,中间使用-分隔符")
            }else {
              if (that.radio=="1"){
                that.radio=1
              }else if (that.radio=="2"){
                that.radio=0
              }
              if (that.normal=="1"){
                this.normal=1
              }else if (that.normal=="2"){
                that.normal=0
              }
              this.$axios({
                url:""+that.api+"/v1/common/hotel_group/update/"+that.group,
                method: "post",
                // params:{},
                data:{
                  //集团蒙版的基本信息
                  full_name :that.full_name, //集团全称
                  short_name :that.short_name,   //集团简称
                  code :that.code, //代码
                  audit:that.radio,//审核状态
                  desc:that.desc,//中文描述
                  desc_en:that.desc_en,//英文描述
                  // 集团蒙版的联系方式
                  office_tel:that.office_tel,//总机
                  country_code:that.country_code,//国家
                  reserve_tel:that.reserve_tel,//订房电话
                  province:that.province,//州/省
                  service_tel:that.service_tel,//服务电话
                  city:that.city,//城市
                  fax:that.fax,//传真
                  position:that.position_west+','+that.position_east,
                  //地理位置
                  // position_east:'',// 东经
                  // position_west:'',// 北纬

                  status:that.normal,//状态
                  web_site:that.web_site,//官网
                  email:that.email,//邮箱
                  photo:that.imge_group,//集团照片
                  logo:that.imge_list,//log
                  dns:that.dns,//DNS
                  postal_code:that.postal_code,//邮编
                  address_1:that.address_1,//地址1
                  address_2:that.address_2,//地址二
                },
                headers:{
                  authorization:sessionStorage.getItem("authorization"),
                }
                //headers: {'authorization': this.authorization_token}
              })
                .then(res=>{
                  if(res.data.message==="success"){
                    console.log(res);
                    this.dialogVisible = false;
                    this.full();
                  }else {
                    console.log(res.data.message)
                  }

                })
                .catch(error=>{
                  console.log(error);
                })
            }
          }

        },

        //点击删除
        omit(){
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              console.log(this.group);
              this.$axios({
                url: this.api + "/v1/common/hotel_group/remove/" + this.group,
                method: "post",
                // params:{},
                data: {},
                headers: {
                  authorization: sessionStorage.getItem("authorization"),
                }
                //headers: {'authorization': this.authorization_token}
              })
                .then(res => {
                  if (res.data.message === "success") {
                    location.reload();  //强制刷新;
                  } else {
                    console.log(res.data.message)
                  }

                })
                .catch(error => {
                  console.log(error);
                })


            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else {
            this.hintInfo("warning","您没有删除集团权限")
          }

        },

        //集团App的隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});

      },

        handleChange(value, direction, movedKeys) {
          let that = this;
          console.log(value);
          console.log(direction);
          console.log(movedKeys);//发生移动数据的数组
          //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边

        },

        //点击app
        appObtain(){
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2) {
            let that = this;
            that.dialogVisibleApp = true;
            that.multipleSelection = [];
            that.demandApp();
            that.$axios({
              url: "" + that.api + "/v1/common/app/info_list",
              method: "get",
              params: {
                page_size: 999
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res)
                  that.appList = res.data.data.list;
                }
                else {
                  this.error(res.data.message)
                  console.log(res.data.message);
                }

              })
              .catch(error => {
                console.log(error);
              })
          }else {
            this.hintInfo("warning","您没有集团APP权限")
          }
        },

       //点击确定
        saveInfo_app(){
          let that = this;
          that.$axios({
            url: ""+that.api+"/v1/common/hotel_group/bind_app",
            method: "post",
            data:{
              hotel_group_id:that.group,//所点击的id
              apps:JSON.stringify(that.multipleSelection),//选中的app
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res)
              }
              else{
                this.error(res.data.message)
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },

       //封装查询集团下有哪些app
        demandApp(){
          let that = this;
          that.$axios({
            url: ""+that.api+"/v1/common/app/info_list",
            method: "post",
            data:{
              hotel_group_id:that.group
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res)
                // 遍历拿到所需要APP
                res.data.data.list.forEach(item =>{
                  that.multipleSelection.push(item.id)
                });
                // that.multipleSelection=res.data.data.list;
              }
              else{
                this.error(res.data.message)
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },



        /**
         * 点击上传酒店logo 方法
         * */
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log( file);
          this.imge_list = file.response.url;
          this.src_log = "http://47.97.178.98:9500/"+  file.response.url;
        },
        beforeAvatarUpload(file) {
          console.log(file);
          // this.imge_list = file.
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },

        //集团照片
        handlehotel_group(res, file){
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log( file);
          this.imge_group = file.response.url;
          this.src_group = "http://47.97.178.98:9500/"+  file.response.url;
        },
        beforehotel_group(file){
          console.log(file);
          // this.imge_list = file.
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },

        //点击蒙版里的取消
        cancel(){
          this.masking=false;
          //集团蒙版的基本信息
          this.full_name ='', //集团全称
            this.short_name ='',   //集团简称
            this.code ='',  //代码
            this.radio= "1",//审核状态
            this.desc='',//中文描述
            this.desc_en='',//英文描述
            // 集团蒙版的联系方式
            this.office_tel='',//总机
            this.country_code='',//国家
            this.reserve_tel='',//订房电话
            this. province='',//州/省
            this.service_tel='',//服务电话
            this.city='',//城市
            this.fax='',//传真
            //地理位置
            this.position_east='',// 东经
            this.position_west='',// 北纬
            //状态
            this.normal='1',//正常
            this.web_site='',//官网
            this.email='',//邮箱
            this.photo='',//集团照片
            this.logo='',//log
            this.dns='',//DNS
            this.postal_code='',//邮编
            this.address_1='',//地址1
            this.address_2=''//地址二
        },

        /**
         * @hintInfo 操作提示信息
         * @param hint  成功提示
         * @param info 警告信息
         */
        hintInfo: function(hint, info) {
          let that = this;
          if(hint === "success") {
            that.$message({
              message: info,
              type: 'success'
            });
          } else if(hint === "warning") {
            that.$message({
              message: info,
              type: 'warning'
            });
          } else {
            this.$message.error('出错了！');
          }
        },

      }
    }
</script>

<style lang="less" scoped>
   .basicInfo{
     width: 97%;
     height: 100%;
     overflow-y: scroll;
     .left{
       width: 57%;
       min-width: 700px;
       float: left;
       .message{
         padding-left: 29px;
         p{
           font-size: 16px;
           /*height: 60px;*/
           /*line-height: 60px;*/
           margin-top: 16px;
           margin-bottom: 10px;
           font-weight: bold;
         }
          ul{
            overflow: hidden;

            li{
              float: left;
              width:335px;
              font-size: 16px;
              margin-bottom: 5px;
              span{
                width: 78px;
                display: inline-block;
                vertical-align:top;
              }
              div{
               display: inline-block;
                width: 220px;
                height: 30px;
                border: 1px solid rgb(204, 204, 204);
                border-radius: 4px;
                padding-left: 10px;
                line-height: 30px;
              }
            }
          }
       }
       .contact{
         padding-left: 29px;
         p{
           font-size: 16px;
           /*height: 60px;*/
           /*line-height: 60px;*/
           margin: 10px  0;
           font-weight: bold;
         }
         ul{
           overflow: hidden;

           li{
             float: left;
             width:335px;
             font-size: 16px;
             margin-bottom: 5px;
             span{
               width: 78px;
               display: inline-block;
               vertical-align: top;
             }
             div{
               width: 220px;
               display: inline-block;
               height: 30px;
               border: 1px solid rgb(204, 204, 204);
               border-radius: 4px;
               padding-left: 20px;
               line-height: 30px;
             }

           }
         }
       }
       .phone{
         width:80%;
         height:327px;
         /*line-height: 398px;*/
         text-align: center;
         background: white;
         margin-left: 31px;
         margin-top: 32px;
         margin-bottom: 24px;
         img{
           width:100%;
           height:327px;
         }
       }

     }
     .right{
       width:38%;
       float: left;
       .log{
         width:227px;
         height:227px;
         background: white;
         margin-left: 58px;
         line-height: 227px;
         text-align: center;
         margin-top: 8px;
         margin-bottom: 42px;
         img{
           width:327px;
           height:227px;
         }
       }
       .site{
         margin-left: 60px;
         font-size: 16px;
         li{
           margin-bottom: 10px;
           span{
             width: 70px;
             display: inline-block;
             text-align: left;
             vertical-align: top;
           }
           div{
             display: inline-block;
             width: 260px;
             height: 30px;
             border: 1px solid rgb(204, 204, 204);
             border-radius: 4px;
             padding-left: 20px;
             line-height: 30px;
           }

         }
       }
       .establish{
         margin-left: 180px;
         font-size: 16px;
         li{
           margin-bottom: 22px;
           button{
             border: none;
             outline: none;
             width: 90px;
             height: 40px;
             background:rgba(68,136,233,1);
             border-radius:4px;
             color: white;
           }
         }
       }
     }
     .basicInfo_amd {
       width:100%;
       height: 85%;
       overflow-y: scroll;
       background: white;
       .left {
         width: 68%;
         float: left;
         p {
           width: 80px;
           font-size: 16px;
           /*height: 60px;*/
           /*line-height: 60px;*/
           margin-top: 16px;
           margin-bottom: 10px;
           font-weight: bold;
         }
         ul {
           overflow: hidden;

           li {
             float: left;
             width: 50%;
             font-size: 16px;
             margin-bottom: 5px;
             span {
               width: 80px;
               display: inline-block;
               /*vertical-align: top;*/
             }

           }
         }
       }
       .contact {
         padding-left: 29px;
         p {
           font-size: 16px;
           margin: 10px 0;
           font-weight: bold;
         }
         ul {
           overflow: hidden;

           li {
             float: left;
             width: 50%;
             font-size: 16px;
             margin-bottom: 5px;
             span {
               width: 80px;
               display: inline-block;
               vertical-align: top;
             }

           }
         }
       }
       .phone {
         width:600px;
         height: 230px;
         /*line-height: 398px;*/
         text-align: center;
         background: white;
         margin-left: 31px;
         /*margin-top: 15px;*/
         margin-bottom: 24px;
         border: 1px solid rgb(204, 204, 204);
       }
       .right_amd {
         float: left;
         .log {
           width: 327px;
           height: 227px;
           background: white;
           text-align: center;
           /*margin-bottom: 22px;*/
           /*border: 1px solid rgb(204, 204, 204);*/
           margin-top: 50px;

         }
         .site {
           /*margin-left: 60px;*/
           font-size: 16px;
           margin-top: 40px;
           li {
             margin-bottom: 10px;
             span {
               width: 70px;
               display: inline-block;
               text-align: left;
               vertical-align: top;
             }

           }
         }
         .establish {
           /*margin-left: 132px;*/
           margin-top: 100px;
           font-size: 16px;
           li {
             margin-bottom: 22px;
             button {
               outline: none;
               width: 90px;
               height: 40px;
               background: rgba(68, 136, 233, 1);
               border-radius: 4px;
               color: white;
             }
           }
         }
       }
     }
     }
     .group_app{
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       background: rgba(7, 13, 32, 0.3);
       /*z-index: 9000;*/

     }

</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
