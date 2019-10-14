<template>
  <div class="hotel" style="background: #eeeeee">
    <div class="left">
      <div class="message">
        <p>基本信息</p>
        <ul>
          <li> <span style="vertical-align:top;">酒店全称：</span><div >{{bit.full_name}}</div></li>
          <li> <span>酒店简称：</span><div >{{bit.short_name}}</div></li>
          <li> <span>代码：</span><div >{{bit.code}}</div></li>
          <li style="height: 46px;line-height: 46px">
            <span>审核状态：</span>
            <el-checkbox v-if="bit.audit==1" v-model="checked" disabled style="display: inline-block">已通过</el-checkbox>
            <el-checkbox v-else="bit.audit==0"   v-model="checked" disabled style="display: inline-block">未通过</el-checkbox>
          </li>
          <li> <span>中文描述：</span><div >{{bit.desc}}</div></li>
          <li> <span>英文描述：</span><div >{{bit.desc_en}}</div></li>
        </ul>

      </div>
      <div class="contact">
        <p>联系方式</p>
        <ul>
          <li> <span>总机：</span><div >{{bit.office_tel}}</div></li>
          <li> <span>国家：</span><div >{{bit.country_code}}</div></li>
          <li> <span>订房电话：</span><div >{{bit.reserve_tel}}</div></li>
          <li> <span>州/省：</span><div >{{bit.province}}</div></li>
          <li> <span>服务电话：</span><div >{{bit.service_tel}}</div></li>
          <li> <span>城市：</span><div >{{bit.city}}</div></li>
          <li> <span>传真：</span><div >{{bit.fax}}</div></li>
          <li style="height: 46px;vertical-align: top">
            <span style="vertical-align: top;margin-top: 5px">地理位置：</span>
            <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 40px" >东经 ： </span>
            <span style="width: 60px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_east}}</span>
            <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 40px">北纬：</span>
            <span style="width: 60px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_west}}</span>

          </li>
          <li style="height: 46px;line-height: 46px">
            <span>状态：</span>
            <el-checkbox  v-if="bit.status==1"     v-model="checked" disabled style="display: inline-block">正常</el-checkbox>
            <el-checkbox    v-else="bit.status==0"   v-model="checked" disabled style="display: inline-block">停用</el-checkbox>
          </li>
          <li> <span>官网：</span><div >{{bit.web_site}}</div></li>
          <li> <span>邮箱：</span><div >{{bit.email}}</div></li>
        </ul>

      </div>
      <div class="phone">
        <img :src="src_group" alt="集团照片">

      </div>
    </div>
    <div class="right">
      <div class="log">
        <!--<span style="vertical-align: top">酒店logo</span>-->
        <img :src="src_log" alt="log">
      </div>

      <ul class="site">
        <li>
          <span>DNS ： </span>
          <div>{{bit.dns}}</div>
        </li>
        <li>
          <span>邮编 ： </span>
          <div>{{bit.postal_code}}</div>
        </li>
        <li>
          <span style="vertical-align: top">地址1 ：</span>
          <div style="width: 300px;height: 100px;">{{bit.address_1}}</div>
        </li>
        <li>
          <span style="vertical-align: top">地址2 ：</span>
          <div style="width: 300px;height: 100px;">{{bit.address_2}}</div>
        </li>
      </ul>
      <ul class="establish">
        <li><span>创建人 ： </span><span>{{bit.create_user }}</span></li>
        <li><span>创建日期 ： </span><span>{{bit.create_time }}</span></li>
        <li><span>修改日期 ： </span><span>{{bit.modify_time }}</span></li>
        <li><span>修改人 ： </span><span>{{bit.modify_user }}</span></li>
        <li><button @click="amend">修改酒店信息</button><button @click="remove">删除酒店</button>
          <button @click="examine">查看酒店部门</button></li>
         <li></li>
      </ul>
    </div>
    <!--点击修改酒店-->
    <el-dialog
      :visible.sync="dialog"
      width="80%"
      :before-close="handleClose">
      <div class="basicInfo" >
        <div class="left">
          <p>基本信息</p>
          <ul>
            <!--<li> <span>所属集团：</span><el-input v-model="affiliation_name " style="width: 217px" placeholder="请输入内容" :disabled="true"></el-input></li>-->
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>酒店全称:</span>
              <el-input v-model="input" style="width: 210px;" placeholder="请输入内容"></el-input></li>
            <li >
              <i style="color: red;font-size: 18px">*</i>
              <span>酒店简称：</span>
              <el-input v-model="hotel_input" style="width: 210px;margin-left: -4px" placeholder="请输入内容"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>代码：</span>
              <el-input v-model="code" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li style="height: 46px;line-height: 46px">
              <i style="color: red;font-size: 18px">*</i>
              <span>审核状态：</span>
              <el-radio v-model="radio" label="1">已通过</el-radio>
              <el-radio v-model="radio" label="0">未通过</el-radio>
            </li>
            <li>
              <span style="margin-left: 10px">中文描述：</span>
              <el-input v-model="desc " placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <span style="margin-left: 10px">英文描述：</span>
              <el-input v-model="desc_en " placeholder="请输入内容" style="width: 210px"></el-input></li>
          </ul>
          <p>联系方式</p>
          <ul>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>总机：</span>
              <el-input v-model="office_tel "   placeholder="请输入内容" style="width: 210px"></el-input></li>
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
              <el-input v-model="reserve_tel "    placeholder="请输入内容"   maxlength="11"  style="width: 210px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>州/省：</span>
              <el-input v-model="province" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>服务电话：</span>
              <el-input v-model="service_tel"       placeholder="请输入内容"  maxlength="11"  style="width: 210px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>城市：</span>
              <el-input v-model="city" placeholder="请输入内容" style="width: 210px"> </el-input></li>
            <li>
              <span style="margin-left: 10px">传真：</span>
              <el-input v-model="fax" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li style="height: 46px;vertical-align: top">
              <span style="margin-top: 5px;margin-left: 10px">地理位置：</span>
              <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block" >东经:</span>
              <input style="width: 50px;height: 36px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_east">
              <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block">北纬：</span>
              <input style="width: 50px;height: 36px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_west">

            </li>
            <li style="height: 46px;line-height: 46px">
              <i style="color: red;font-size: 18px">*</i>
              <span>状态：</span>
              <el-radio v-model="normal" label="1">正常</el-radio>
              <el-radio v-model="normal" label="0">停用</el-radio>
            </li>
            <li>
              <span style="margin-left: 10px">官网：</span>
              <el-input v-model="web_site " placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <span style="margin-left: 10px">邮箱：</span>
              <el-input v-model="email" placeholder="请输入内容" style="width: 210px"></el-input></li>
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
        <div class="right">
          <div class="log_amd">
            <el-upload
              class="avatar-uploader"
              action="http://47.97.178.98:9500/resource/hotel/logo/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="src_log" :src="src_log" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">log</i>
            </el-upload>
          </div>
          <ul class="site_right">
            <li>
              <span style="margin-left: 20px;">DNS：</span>
              <el-input v-model="dns " placeholder="请输入内容" style="width: 210px;margin-bottom: 10px"></el-input>
            </li>
            <li>
              <span style="margin-left: 20px">邮编：</span>
              <el-input v-model="postal_code"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 210px;margin-bottom: 10px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px;vertical-align: top">*</i>
              <span style="vertical-align: top">地址1 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_1 "></textarea>
            </li>
            <li>
              <span style="vertical-align: top ;margin-left: 10px">地址2 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_2 "></textarea>
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
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click=" save()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import eventVue from './eventVue'
  export default {
    name: "hotel",
    data(){
      return{
        api:'http://47.98.113.173:9519',
        input:'',
        authorization_token:'',
        checked: true,
        country_code_list:[],
        bit_list:[],
        //log
        dialogImageUrl: '',
        dialogVisible: false,
        dialog:false,//修改酒店的页面
        basic:false,//新增机构显示的页面
        info:true,//页面打开显示的页面
        bits:'',//监测酒店数据id的变动
        hotel_list:[],//接受后台传过来的酒店数据
        section_list:[],//接收后台传的部门信息
         hotel_id:'',//修改酒店的id
        toFatherList:[],
        imageUrl:'',
       //蒙版信息
       //  full_name :'', //酒店全称
        short_name :'',   //酒店简称
        hotel_input:'',//酒店简称
        code :'',  //代码
        radio: "1",//审核状态
        desc:'',//中文描述
        desc_en:'',//英文描述
        // 集团蒙版的联系方式
        office_tel:'',//总机
        country_code:'',//国家
        reserve_tel:'',//订房电话
        province:'',//州/省
        service_tel:'',//服务电话
        city:'',//城市
        fax:'',//传真
        //地理位置
        position_east:'',// 东经
        position_west:'',// 北纬
        position:'',
        //状态
        normal:'0',//正常
        web_site:'',//官网
        email:'',//邮箱
        photo:'',//集团照片
        log:'',//log
        dns:'',//DNS
        postal_code:'',//邮编
        address_1:'',//地址1
        address_2:'',//地址二
        bit:[],
        hotelid:'',
        old_list:[],
        detection:'',//
        splict_add:[],//地理位置
        imge_list:'',
        src_log:'',
        src_group:'',
      }
    },
    created:function () {
      let that=this;
      that.country_info();
      //JSON.parse
      that.hotelid = sessionStorage.getItem("hotelid")
     // that.examine();
    },
    props:["hotelid"],
    watch:{
      hotelid(val,oldval){
        let that = this;
        that.hotel_data();
      }
    },

    methods:{
      //封装获取国家的列表
      country_info(){
        this.$axios({
          url: "http://47.98.113.173:9103/v1/system/settings/get_country_list/?page_size=300",
          method: "get",
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res => {
            if (res.data.message=="success"){
              // console.log(res.data.data.results);
              this.country_code_list=res.data.data.results;
              this.hotel_data();
              sessionStorage.setItem("authorization",res.data.new_authorization)
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
      //酒店信息
      hotel_data(){
        let that = this;
        that.$axios({
          url: that.api+"/v1/common/hotel/get_info/"+that.hotelid,
          "method": "get",
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }

        })
          .then(res => {
            if (res.data.message==="success"){
              // if(data.children!=""){
                that.bit = res.data.data;
                console.log(that.bit);
                that.src_log = "http://47.97.178.98:9500/"+ that.bit.logo;
                that.src_group = "http://47.97.178.98:9500/"+ that.bit.photo;
                console.log(that.src_log);
              that.splict_add = that.bit.position.split(",")
              that.position_east =  that.splict_add[0];
              that.position_west =  that.splict_add[1];
                if (that.bit.country_code != null) {
                  that.bit.country_code = that.code_desc(1, that.bit.country_code);
                }
                //  JSON.stringify
                // sessionStorage.setItem('bit_list',(that.bit.id));
              }

            // }
            else{
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

       //查看部门信息
      examine(){
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if(root_level===3 || root_level===2){
          this.$router.push({path:"/organizationchart/sections"})
          sessionStorage.setItem("branch_id", this.bit.id)
          console.log(this.bit.id);
        }else {
          this.hintInfo("warning","您没有权限查看酒店部门")
        }
      },
     //修改酒店信息
      amend(){
        let that = this;
        console.log(sessionStorage.getItem("root_level"));
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if(root_level===3 ){
          let bit = that.bit;
          that.dialog = true;
          console.log(that.bit);
          that.input = bit.full_name;
          that.hotel_id = bit.id;
          that.hotel_input = bit.short_name;
          that.code = bit.code;
          that.radio = bit.audit + "",
            that.desc_en = bit.desc_en;
          that.desc = bit.desc;
          that.office_tel = bit.office_tel;
          that.country_code = bit.country_code;
          that.reserve_tel = bit.reserve_tel;
          that.province = bit.province;
          that.service_tel = bit.service_tel;
          that.city = bit.city;
          that.fax = bit.fax;
          // this.position_east=bit.position;
          that.position_west = bit.position;

          that.normal = bit.status + "",
          that.web_site = bit.web_site;//官网
          that.email = bit.email;//邮箱
          that.photo = bit.photo;//集团照片
          that.log = that.src;//log
          that.dns = bit.dns;//DNS
          that.postal_code = bit.postal_code;//邮编
          that.address_1 = bit.address_1;//地址1
          that.address_2 = bit.address_2;//地址二

          that.splict_add = bit.position.split(",")
          that.position_east = that.splict_add[0];
          that.position_west = that.splict_add[1];
        }else {
          this.hintInfo("warning","您没有权限修改酒店部门")
        }
      },
      //点击修改酒店信息显示蒙版后的保存
      save() {
        let that = this;
        if ( (!that.input) || (!that.hotel_input) || (!that.code) || (!that.radio) || (!that.office_tel) || (!that.country_code)
          || (!that.reserve_tel) || (!that.province) || (!that.service_tel) || (!that.city)  || (!that.normal) || (!that.address_1)
        ) {
          that.hintInfo("warning", "* 为必填项")

        } else {
          let tel = /0\d{2,3}-\d{7,8}/;
          if(!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)){
            that.hintInfo("warning","座机号码需以0开始,中间使用-分隔符")
          }else {
            if (that.radio=="0"){
              that.radio=0
            }else if (that.radio=="1"){
              that.radio=1
            }
            if (that.normal=="0"){
              that.normal=0
            }else if (that.normal=="1"){
              that.normal=1
            }
            that.$axios({
              url:that.api+"/v1/common/hotel/update/"+that.hotel_id,
              method: "post",
              // params:{},
              data:{
                //集团蒙版的基本信息
                full_name :that.input, //酒店全称
                short_name :that.hotel_input,   //酒店简称
                code :that.code, //代码
                audit:that.radio+"",//审核状态
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
                status:that.normal+"",//状态
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
            })
              .then(res=>{
                if(res.data.message==="success"){
                  // console.log(res.config.data);
                  that.hotel_data();
                  that.dialog = false;
                  // this.detection=1;
                  // this.old_list = JSON.stringify(res.config.data)
                  // sessionStorage.setItem('bit_list',JSON.stringify(res.config.data));
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
      //删除酒店
      remove(){
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if(root_level===3 || root_level===2){
          console.log(this.bits);
          let hotel_id = this.bit.id;
          console.log(hotel_id);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // list.splice(index, 1);
            this.$axios({
              url: this.api + "/v1/common/hotel/remove/" + hotel_id,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res => {
                console.log(res.message)
                if (res.data.message === "success") {
                  location.reload(); // 强制刷新
                  sessionStorage.setItem("authorization", res.data.new_authorization)
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
          this.hintInfo("warning","您没有删除酒店权限")

        }
      },
      //如果认证错误
      new_authorization(msg){
        let that=this;
        if(msg==="authorization invalid"){
          that.authorization()
        }
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
          that.$message.error('出错了！');
        }
      },

    },

  }
</script>

<style lang="less" scoped>
  .hotel{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .left{
      width:58%;
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
            width: 410px;
            font-size: 16px;
            margin-bottom: 5px;
            span{
              width: 78px;
              display: inline-block;
              vertical-align:top;
            }
            div{
              width: 220px;
              display: inline-block;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              line-height: 30px;
              padding-left: 10px;
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
            width: 410px;
            font-size: 16px;
            margin-bottom: 5px;
            span{
              width: 78px;
              display: inline-block;
              vertical-align: top;
            }
            div{
              display: inline-block;
              width: 220px;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              line-height: 30px;
              padding-left: 10px;
            }

          }
        }
      }
      .phone{
        width:700px;
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
      float: left;
      .log{
        /*width: 380px;*/
        /*height: 200px;*/
        margin-left: 60px;
        /*border: 1px solid #cccccc;*/
        margin-bottom: 10px;
        margin-top: 10px;
        img{
          width:368px;
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
            display: inline-block;width: 300px;
            height: 30px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 4px;
            line-height: 30px;
            padding-left: 10px;
          }

        }
      }
      .establish{
        margin-left: 79px;
        font-size: 16px;
        li{
          margin-bottom: 32px;
          button{
            outline: none;
            width: 110px;
            height: 40px;
            background:rgba(68,136,233,1);
            border-radius:4px;
            color: white;
          }
        }
      }
    }
    .basicInfo {
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
      .right {
        float: left;
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
        .log_amd{
          margin-left: 70px;
        }
      }
    }
    }

</style>
<<style>
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
