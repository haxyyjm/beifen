<template>
  <!--设置卡券-->
  <div class="Setting">
    <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>券</span>
          </template>
          <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <el-submenu index="1-1">
              <template slot="title">券定义</template>
              <el-menu-item index="1-1-1"><router-link to="/treasure/deduction-coupon">抵扣券</router-link></el-menu-item>
              <el-menu-item index="1-1-2"><router-link to="/treasure/current-rate-coupon">变价券</router-link></el-menu-item>
              <el-menu-item index="1-1-3"><router-link to="/treasure/cash-coupon">现金券</router-link></el-menu-item>
              <el-menu-item index="1-1-4"><router-link to="/treasure/discount-coupon">折扣券</router-link></el-menu-item>
              <el-menu-item index="1-1-5"><router-link to="/treasure/serve-coupon">服务券</router-link></el-menu-item>
              <el-menu-item index="1-1-6"><router-link to="/treasure/room-upgrade-coupon">客房升级券</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title"><span>券明细</span></template>
              <!--<el-menu-item index="2-1"><router-link to="/treasure/list-coupon">券列表</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="/treasure/issue-detials-coupon">券发行明细</router-link></el-menu-item>-->
              <el-menu-item index="1-2-1"><router-link to="/treasure/sale-detials-coupon">券销售明细</router-link></el-menu-item>
              <!--<el-menu-item index="2-4"><router-link to="/treasure/use-coupon">券使用</router-link></el-menu-item>-->
              <el-menu-item index="1-2-2"><router-link to="/treasure/use-detials-coupon">券使用明细</router-link></el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
           <template slot="title">
            <span>房价体系</span>
          </template>
          <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <el-menu-item index="2-1"><router-link to="/treasure/hpcode">房价码</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/treasure/houroomprice">钟点房价码</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>包早</span>
          </template>
          <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <el-menu-item index="3-1"><router-link to="/treasure/packageraly">包早</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>市场码</span>
          </template>
          <!-- <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <el-menu-item index="3-1"><router-link to="/treasure/deduction-coupon">包早</router-link></el-menu-item>
          </el-menu-item-group> -->
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>来源码</span>
          </template>
        </el-submenu>
         <el-submenu index="6">
          <template slot="title">
            <span>渠道</span>
          </template>
        </el-submenu>
      </el-menu>
    </el-col>
    <div class="RightCotent pull-left">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>



</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
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

