<template>
    <div class="member">
        <!-- 导航栏 -->
        <el-row class="container">
            <!--头部-->
            <el-col :span="24" class="topbar-wrap">
                <div class="topbar-logo topbar-btn">
                  <router-link to="/"><img src="@/assets/logo.png" style="padding-left:38px;"></router-link>
                </div>
                <div class="topbar-logos" >
                    <a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed"></span></a>
                </div>
                <div class="topbar-account topbar-btn">
                    <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo-inner">
                        <i class="iconfont icon-user"></i> {{nickname}} <i class="el-icon-caret-bottom"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                        <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                        <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
                        </el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <!-- 左边导航 -->
            <div class="Setting">
                <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
                <el-menu
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                    <template slot="title">
                          <div>
                              <span>选择酒店:</span>
                              <el-select style="width: 6vw"  v-model="roomValue" size="mini">
                                  <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                  </el-option>
                              </el-select>
                          </div>
                      </template>
                      <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
                          <el-menu-item index="1-1"><router-link to="/roomSetting">房设置</router-link></el-menu-item>
                          <el-menu-item index="1-2"><router-link to="/mettingSetting">会场设置</router-link></el-menu-item>
                          <el-menu-item index="1-3"><router-link to="/eatSetting">餐区设置</router-link></el-menu-item>
                          <el-menu-item index="1-4"><router-link to="/storeSetting">仓库设置</router-link></el-menu-item>
                          <el-menu-item index="1-5"><router-link to="/buroomSetting">布草间设置</router-link></el-menu-item>
                          <el-menu-item index="1-6"><router-link to="/lobbySetting">大堂设置</router-link></el-menu-item>
                          <el-menu-item index="1-7"><router-link to="/ktvSetting">KTV设置</router-link></el-menu-item>
                          <el-menu-item index="1-8"><router-link to="/elevatorSetting">电梯厅设置</router-link></el-menu-item>
                          <el-menu-item index="1-9"><router-link to="/cleanSetting">清洁室设置</router-link></el-menu-item>
                          <el-menu-item index="1-10"><router-link to="/gtingSetting">岗亭设置</router-link></el-menu-item>
                          <el-menu-item index="1-11"><router-link to="/weakSetting">弱点机房设置</router-link></el-menu-item>
                      </el-menu-item-group>
                  </el-submenu>
                </el-menu>
                </el-col>
                <div class="RightCotent pull-left">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        // 头部
        loading: false,
        nickname: '',
        activeIndex: '1',
        roomValue: '',
        options: [],
      }
    },

    methods: {
        // 跳转,登出
        jumpTo(url){
            this.defaultActiveIndex = url;
            this.$router.push(url); //用go刷新
        },
        logout(){
            //logout
            let that = this;
            this.$confirm('确认退出吗?', '提示', {
            confirmButtonClass: 'el-button--warning'
            }).then(() => {
            //确认
            localStorage.removeItem('access-user');
            that.$router.go('/login'); //用go刷新
            }).catch(() => {});
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
    },
    created(){
    }
  }
</script>
<style scoped>
.Setting{
  margin-top: 60px;
  overflow: hidden;
}
.el-menu{
  background-color: #EAEDF1;
  color: #000000;
}
.router-link-active{
  color: #409EFF;
}
.RightCotent{
  width: calc(100% - 250px);
}
</style>
<!--<style>
.container{
    min-width: 1900px;
}
</style>-->


