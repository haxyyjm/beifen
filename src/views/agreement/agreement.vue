<template>
  <div class="member">
    <!-- 导航栏 -->
    <el-row class="container">
      <!--头部-->
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
          <router-link to="/">
            <img src="../../assets/logo.png" style="padding-left:8px;">
          </router-link>
        </div>
        <div class="topbar-logos">
          <a href="/" style="color: #fff;">
            <span v-show="!$store.state.collapsed"></span>
          </a>
        </div>
        <div class="topbar-account topbar-btn">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner">
              <i class="iconfont icon-user"></i>
              {{nickname}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo('/user/profile')">
                  <span style="color: #555;font-size: 14px;">个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/user/changepwd')">
                  <span style="color: #555;font-size: 14px;">修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!-- 左边导航 -->
      <div class="Setting">
        <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
          <el-menu
            default-active="2-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <!-- <i class="el-icon-caret-bottom"></i> -->
                <span>协议公司设置</span>
              </template>
              <el-menu-item-group :default-active="this.$route.path" router mode="horizontal">
                <el-menu-item index="1-1">
                  <router-link to="/agreementPlan">VIP等级设置</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/agreementIntegral">积分设置</router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <router-link to="/agreementStored">储值设置</router-link>
                </el-menu-item>
                <el-menu-item index="1-4">
                  <router-link to="/agreementSaleRules">促销规则</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2"> 
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <template slot="title">
                <!-- <i class="el-icon-caret-bottom"></i> -->
                <span>协议公司</span>
              </template>
              <el-menu-item-group :default-active="this.$route.path" router mode="horizontal">
                <el-menu-item index="2-1">
                  <router-link to="/agreementMemberList">协议公司列表</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/agreementIntegralList">积分列表</router-link>
                </el-menu-item>
                <el-menu-item index="2-3">
                  <router-link to="/agreementStoredList">储值列表</router-link>
                </el-menu-item>
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
      nickname: "",
      activeIndex: "1"
    };
  },

  methods: {
    // 跳转,登出
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },
    logout() {
      //logout
      let that = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          //确认
          localStorage.removeItem("access-user");
          that.$router.go("/login"); //用go刷新
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  created() {}
};
</script>
<style scoped>
.Setting {
  margin-top: 60px;
  overflow: hidden;
}
.el-menu {
  background-color: #eaedf1;
  color: #000000;
}
.router-link-active {
  color: #409eff;
}
.RightCotent {
  width: calc(100% - 250px);
}
</style>
<style>
.container {
  min-width: 1900px;
}
</style>


