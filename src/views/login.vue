<template>
  <div class="loginView">
    <!--头部显示部分-->
    <div class="nav_title">
      <div class="logo">
        <p class="logo_text">颐陆智住酒店管理系统</p>
      </div>
      <p class="logo_en">ISpiderTech. Hotel MIS</p>
    </div>
    <!-- form提交表单部分 -->
    <el-form ref="AccountForm" :model="account"  label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title" @click="return_login">{{wel_login}}</h3>
      <!-- 默认登录门店 -->
      <div class="login_sty" v-show="login_flag">
        <!--账号密码登录-->
        <el-form-item prop="code">
          <!--<el-select v-model="HotelValue" placeholder="默认登录门店">
            <el-option
              v-for="item in HotelArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
          <el-input type="text" v-model="account.code" auto-complete="off"  placeholder="请输入集团代码"></el-input>
        </el-form-item>
        <!-- 用户姓名 -->
        <el-form-item prop="username">
          <el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入用户名/手机号"></el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="account.pwd" :autofocus="pwdFocus" auto-complete="off" placeholder="请输入账号密码"></el-input>
        </el-form-item>
        <!-- 选择早中晚班 -->
        <el-form-item>
          <el-select v-model="scheduleValue" placeholder="请选择班次" @focus="inquire_classes">
            <el-option v-for="item in schedule" :key="item.id" :label="item.desc_cn" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="login_sty" v-show="login_iphone">
        <!--手机验证码登录-->
        <el-form-item prop="code">
          <el-input type="text" v-model="account.code" onkeyup="this.value = this.value.toUpperCase();" auto-complete="off" placeholder="请输入集团代码"></el-input>
        </el-form-item>
        <!-- 用户姓名 -->
        <el-form-item prop="username">
          <el-input type="text" v-model="account.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item prop="check_code">
              <el-input type="password" v-model="account.check_code" :autofocus="pwdFocus" auto-complete="off" placeholder="请输入验证码">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="code">
              <el-button style="width: 110px" :disabled="dis_btn" @click="send_code">{{value_btn}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选择早中晚班 -->
        <el-form-item>
          <el-select v-model="scheduleValue" placeholder="请选择班次" @focus="handset_disembark">
            <el-option v-for="item in schedule" :key="item.id" :label="item.desc_cn" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="login_sty" v-show="login_wx">
        <!--微信扫码登录-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="code">
              <el-input type="text" v-model="account.code" auto-complete="off" placeholder="请输入集团代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-select v-model="scheduleValue" placeholder="请选择班次">
                <el-option v-for="item in schedule" :key="item.id" :label="item.desc_cn" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="height: 180px;text-align: center">
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="height: 238px;display: flex; align-items: center; justify-content: center;background: #FFFFFF;border-radius: 4px">
                <img src="../assets/images/login/clearlove.png" style="width: 190px;height: auto;" /><br/>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="login_sty" v-show="login_face">
        <!--扫脸登陆-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="code">
              <el-input type="text" v-model="account.code" auto-complete="off" placeholder="请输入集团代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-select v-model="scheduleValue" placeholder="请选择班次">
                <el-option v-for="item in schedule" :key="item.id" :label="item.desc_cn" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="height: 180px;text-align: center">
          <el-row :gutter="20">
            <el-col :span="24">
              <videos :isOpen="flag_camera"></videos>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 登录btn -->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;"  v-show="login_btn" @click.native.prevent="handleLogin">登录
        </el-button>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <!-- <el-form-item class="extra-text">
        <a href="javascript:;" class="forget-pwd" title="找回密码">忘记密码?</a>
        <router-link :to="{path: '/register'}" class="reg-text" title="立即注册">立即注册</router-link>
      </el-form-item> -->
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <!-- 微信扫码登录 -->
      <el-row :gutter="20">
        <el-col :span="6"><span @click="login_type('login_flag')">账号密码登录</span></el-col>
        <el-col :span="6"><span @click="login_type('login_iphone')">手机验证码登录</span></el-col>
        <el-col :span="6"><span @click="reminder">微信扫码登录</span></el-col><!--@click="login_type('login_wx')"-->
        <el-col :span="6"><span @click="reminder">人脸识别登录</span></el-col><!--@click="login_type('login_face')"-->
        <!--<el-col :span="6"><span @click="login_type('login_cus_num')">工号卡刷卡登录</span></el-col>-->
      </el-row>

    </el-form>
    <!-- allRight部分 -->
    <div class="footer">
      <p>Copyright ?2017 皇冠晶品All Rights Reserved 上海居客酒店投资管理有限公司版权所有<br> <span>备案号：沪ICP备08014899号</span></p>
    </div>
  </div>
</template>
<script>
  import crypto from 'crypto'
  import Videos from '@/components/login/Videos'

  export default {
    data() {
      return {
        //登录标志
        login_flag: true,
        login_wx: false,
        login_face: false,
        login_iphone: false,
        login_cus_num: false,
        check_login: 'login_flag',
        wel_login: '欢迎登录',
        login_btn: true,
        dis_btn: false,
        value_btn: '发送验证码',
        video : '',
        flag_camera : false,
        //url : 'http://47.98.113.173:9022',
        //loading: false,
        account: {
          username: '',
          pwd: '',
          code: '',
          phone: '',
          check_code : '',
        },
        pwdFocus: false,
        allowLogin: true,
        checked: true,
        // select选择门店数据
        HotelArr: [],
        HotelValue: '',
        // 排班数据
        schedule: [
        //   {
        //   value: 'morning_shift',
        //   label: '早班'
        // },{
        //   value: 'middle_shift',
        //   label: '中班'
        // },{
        //   value: 'night_shift',
        //   label: '晚班'
        // },{
        //   value: 'night_auditor',
        //   label: '夜审'
        // }
        ],
        scheduleValue: ''
      };
    },
    components : {
      'videos' : Videos
    },
    created() {
      let reg_user = JSON.parse(window.localStorage.getItem('register-user'));
      if(reg_user) {
        this.account.code = '';
        this.account.username = reg_user.username;
        this.account.pwd = '';
        this.pwdFocus = true;
      }
      localStorage.getItem('local_code') ? this.account.code = localStorage.getItem('local_code') : '';
      localStorage.getItem('local_username') ? this.account.username = localStorage.getItem('local_username') : '';
      localStorage.getItem('local_password') ? this.account.pwd = localStorage.getItem('local_password') : '';
      /**
       * 将登陆的事件绑定到回车键上
       * @param e
       * @returns {boolean}
       */
      /*let that = this;
      document.onkeypress = function(e) {
        let key_code = document.all ? event.keyCode : e.which;
        if (key_code === 13) {
          that.handleLogin();// 登录方法名
          return false;
        }
      };*/
      //localStorage.clear();  //将所有的缓存清空
    },
    methods: {
      /**
       * @reminder 提示没有实现的功能
       */
      reminder(){
        let that = this;
        that.hintInfo('success','暂未开放')
      },
      /**
       * 发送验证码
       */
      send_code() {
        let that = this;
        that.dis_btn = true;
        that.value_btn = 59;
        let flag = setInterval(function() {
          that.value_btn--;
          if(that.value_btn === 0) {
            clearInterval(flag);
            that.dis_btn = false;
            that.value_btn = '发送验证码';
          }
        }, 1000);
        if(!(/^1[34578]\d{9}$/.test(that.account.phone))){
          that.hintInfo('warning','手机号有误，请重新填写！');
          that.dis_btn = false;
          that.value_btn = '发送验证码';
          clearInterval(flag);
          return false;
        }else{
          let url = that.api.api_9022_9519 + '/v1/common/sms/employee/login';
          that.$axios({
            method: 'post',
            url : url,
            data : {
              phone : that.account.phone,
            }
          }).then((res)=>{
            if(res.data.message === 'success'){
              that.hintInfo('success','发送成功！');
            }else{
              console.info(res);
              that.hintInfo('success','发送失败！');
            }
          }).catch((err)=>{
            console.info(err);
          })
        }
      },
      /**
       * @getmd5 加密密码使用
       */
      getmd5: function(pwd) {
        var md5 = crypto.createHash("md5");
        md5.update(pwd);
        var password = md5.digest('hex');
        return password;
      },
      /**
       * 不同的登录方式
       */
      login_type(flag) {
        let that = this;
        /* if(flag != "login_flag") {
           that.wel_login = '返回密码登录'
         }*/
        that.scheduleValue="";
        that.schedule=[];
        if(flag === "login_cus_num") {
          /**
           * 刷工号卡登录
           */
          /*that.check_login = 'login_cus_num';
                    that.login_btn = true;
                    that.login_flag = false;
                    that.login_face = false;
                    that.login_iphone = false;
                    that.login_cus_num = true;
                    that.flag_camera = false;
                    that.login_wx = false;*/
        } else if(flag === "login_wx") {
          /**
           * 微信登录
           */
          that.account = {};
          that.check_login = 'login_wx';
          that.login_btn = false;
          that.login_flag = false;
          that.login_face = false;
          that.login_iphone = false;
          that.login_cus_num = false;
          that.login_wx = true;
          that.flag_camera = false;
        } else if(flag === "login_face") {
          /**
           * 人脸识别登录
           */
          that.account = {};
          that.allowLogin = false;
          that.login_btn = false;
          that.check_login = 'login_face';
          that.login_flag = false;
          that.login_face = true;
          that.login_iphone = false;
          that.login_cus_num = false;
          that.login_wx = false;
          that.flag_camera = true;
          console.info(that.flag_camera);
          //that.prototype.camera_options();
        } else if(flag === "login_iphone") {
          /**
           * 手机号登录
           */
          that.account = {};
          that.check_login = 'login_iphone';
          that.login_btn = true;
          that.login_flag = false;
          that.login_face = false;
          that.login_iphone = true;
          that.login_cus_num = false;
          that.login_wx = false;
          that.flag_camera = false;
        } else {
          /**
           * 常规登录
           */
          that.account = {};
          that.check_login = 'login_flag';
          that.login_btn = true;
          that.login_flag = true;
          that.login_face = false;
          that.login_iphone = false;
          that.login_cus_num = false;
          that.login_wx = false;
          that.flag_camera = false;
        }
      },
      /**
       * @return_login 返回到常规登录
       */
      return_login() {
        let that = this;
        that.check_login = 'login_flag';
        that.wel_login = '欢迎登录';
        that.login_btn = true;
        that.login_flag = true;
        that.login_face = false;
        that.login_iphone = false;
        that.login_cus_num = false;
        that.login_wx = false;
        that.flag_camera = false;
      },
      /**
       * 调用login的接口
       * http://192.168.4.53:1223/user/user_login/
       * 必传参数：{code,username,password}
       * 测试阶段登录为：super_root
       * 登录方法：handleLogin
       * @type {default.methods}
       * @param code name password  门店的code  用户名  密码
       */
    handleLogin: function() {
        let that = this;
        /**
         * 常规登录  && code.trim().length > 0
         */
        if(that.check_login === 'login_flag'){
          let url =  that.api.api_9022_9519 + '/v1/common/employee/login';
          let username = this.account.username;
          let pwd = this.account.pwd;
          let code = this.account.code;
          let shift_name = this.scheduleValue ;
            if(username.trim().length > 0 && pwd.trim().length > 0 ){
              this.$axios({
                method: 'post',
                url: url,
                data: {
                  code: code.toUpperCase(),
                  user_name: username,
                  password: that.getmd5(pwd),
                  shift_id : shift_name
                }
              }).then((res) => {
                console.info(res);
                if(res.data.message === "success") {
                  sessionStorage.setItem("root_level",res.data.root_level);
                  sessionStorage.setItem("rules",JSON.stringify(res.data.rules));
                  localStorage.setItem('access-user', JSON.stringify(res.data.real_name));
                  localStorage.setItem('userInfo', JSON.stringify(res.data.user_info));
                  localStorage.setItem('local_code',this.account.code);//记住账号密码
                  localStorage.setItem('local_username',this.account.username);//记住账号
                  localStorage.setItem('local_password',this.account.pwd);
                  sessionStorage.setItem("code",JSON.stringify(that.account.code));
                  that.$router.push({
                    path: '/'
                  });
                } else {
                  that.$message({
                    message: '登录失败',
                    type: 'warning'
                  });
                  //this.loading = false;
                  //console.info(data.data.message);
                  //this.$message.error("登录失败，账号或密码错误");
                  that.hintInfo('warning',res.data.message);
                }
              }).catch(function(err) {
                that.$message({
                  message: '登录失败',
                  type: 'warning'
                });
              })
            }else{
              that.hintInfo('warning',"请完善登录信息！");
            }
        }else if(that.check_login === 'login_ws'){
          /**
           * 微信登录
           */
        }else if(that.check_login === 'login_face'){
          /**
           * 人脸登录
           */
        }else if(that.check_login === 'login_iphone'){
          /**
           * 手机验证码登录
           */
          if(that.account['phone'].trim().length > 0 && that.account['check_code'].trim().length > 0){
            let url = that.api.api_9022_9519 + '/v1/common/sms/employee/check_login';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                code : that.account['code'],
                phone : that.account['phone'],
                sms : that.account['check_code'],
              }
            }).then((res)=>{
              if(res.data.message === 'success'){
                localStorage.setItem('access-user', JSON.stringify(res.data.real_name));
                sessionStorage.setItem("root_level",res.data.root_level);
                sessionStorage.setItem("rules",JSON.stringify(res.data.rules));
                that.$router.push({
                  path: '/'
                });
              }else{
                console.info(res);
                that.hintInfo('warning',res.data.message);
              }
            }).catch((err)=>{
              console.info(err);
              that.hintInfo('warning','登录失败！');
            })
          }else{
            that.hintInfo('warning','请完善登录信息！')
          }
        }else{
          /**
           * 工号刷卡登录
           */
        }
      },
      /**
       * 查寻人员班次信息
       * 再点击班次信息时发送请求，获取班次信息
       * 拿到人员班次
       *
       * */
      inquire_classes(){
        let that =this;
        if(that.account.code && that.account.username){
          console.log("调接口");
          that.$axios({
            url:that.api.api_9530_9503+"/v1/manage/duty_shift/hotel_shifts_at_login",
            method:"post",
            data:{
              hotel_group_code:that.account.code,
              user_name:that.account.username,
            }
          })
            .then(res => {
              if(res.data.message==="success"){
                console.log(res);
                that.schedule=res.data.data.list;
              }

            })
            .catch( error =>{
              console.log(error);
            })
        }
        else {
          that.hintInfo('warning','请正确填写集团码和用户名');
        }
      },
      /**
       * 手机号登陆查询班次
       *
       *
       * */
      handset_disembark(){
        let that =this;
        if(that.account.code!=="" && that.account.phone!==""){
          console.log("调接口");
          that.$axios({
            url:that.api.api_9530_9503+"/v1/manage/duty_shift/hotel_shifts_at_login",
            method:"post",
            data:{
              hotel_group_code:that.account.code,
              phone:that.account.phone,
            }
          })
            .then(res => {
              if(res.data.message==="success"){
                console.log(res);
                that.schedule=res.data.data.list;
              }else {
                that.hintInfo('warning','没有此用户');
              }

            })
            .catch( error =>{
              console.log(error);
            })
        }else {
          that.hintInfo('warning','请正确填写集团码和用户名');
        }
      },
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
       */
      hintInfo : function(hint,info){
        let that = this;
        if(hint === "success"){
          that.$message({
            message: info,
            type: 'success'
          });
        }else if(hint === "warning"){
          that.$message({
            message: info,
            type: 'warning'
          });
        }else{
          this.$message.error('出错了！');
        }
      },
    }
  }
</script>
<style scoped>
  .loginView {
    width: 100%;
    min-width: 768px;
    background: url(../assets/login-bg.png) no-repeat center;
  }
  /* 头部 */

  .nav_title {
    margin: auto;
    padding-top: 100px;
    text-align: center;
  }

  .nav_title .logo {
    color: #333333;
    font-size: 3.57rem;
  }

  .nav_title .logo_en {
    margin-top: 20px;
    color: #777;
    font-size: 30px;
  }

  .logo_text::before {
    content: " ";
    display: inline-block;
    width: 68px;
    height: 78px;
    background: url("../assets/login-logo.png") no-repeat center;
    background-size: 100%;
    vertical-align: middle;
    margin-right: 50px;
  }

  .login_sty {
    height: 260px;
  }

  .el-select {
    display: block;
    color: #333333;
  }

  .el-select input::-webkit-input-placeholder {
    color: #333333;
  }

  .el-select input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #333333;
  }

  .el-select input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #333333;
  }

  .el-select input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #333333;
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 124px auto 56px auto;
    width: 600px;
    padding: 26px 50px 30px 50px;
    background: #fff;
    border: 1px solid #eaeaea;
  }

  .login-container .title {
    margin: 0px auto 40px auto;
    color: #08478C;
  }

  .login-container .title:hover {
    cursor: pointer;
  }

  .login-container .remember {
    margin: 0px 0px 35px 0px;
  }

  .extra-text {
    position: relative;
    margin-bottom: 0;
    padding-left: 2px;
  }

  .extra-text a {
    font-size: 12px;
    float: left;
    color: #aaa;
  }

  .el-row span {
    color: #aaa;
  }

  .el-row span:hover {
    color: #29e;
    cursor: pointer;
  }

  .extra-text a:hover {
    color: #29e;
  }

  .extra-text .reg-text {
    position: absolute;
    top: 4px;
    right: 2px;
  }

  .footer {
    text-align: center;
    font-size: 12px;
    line-height: 30px;
    color: #333333;
    padding-bottom: 40px;
  }

  .footer p span {
    color: #00A888;
  }
</style>
