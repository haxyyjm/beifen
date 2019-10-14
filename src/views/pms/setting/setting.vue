<template>
  <!--设置-->
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
            <span>酒店基础设置</span>
          </template>
          <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <!--<el-menu-item index="1-1"><router-link to="/setting/roomSet">场地设置</router-link></el-menu-item>-->
            <el-menu-item index="1-2"><router-link to="/setting/charges">收费项目设置</router-link></el-menu-item>
            <el-menu-item index="1-3"><router-link to="/setting/personnel">人事管理设置</router-link></el-menu-item>
            <!--<el-menu-item index="1-4"><router-link to="/setting/Market">
              市场方案设置
            </router-link></el-menu-item>-->
            <el-submenu index="1-4">
              <template slot="title"><router-link to="/setting/discountidea">市场方案设置</router-link></template>
              <!--<el-submenu index="1-4-1">
                <template slot="title"><router-link to="/setting/hpcode">房价体系</router-link></template>
                <el-menu-item index="1-4-1-1"><router-link to="/setting/hpcode">房价码</router-link></el-menu-item>
                <el-menu-item index="1-4-1-2"><router-link to="/setting/houroomprice">钟点房价码</router-link></el-menu-item>
                <el-menu-item index="1-4-1-3"><router-link to="/setting/packageraly">包早</router-link></el-menu-item>
              </el-submenu>-->
              <el-menu-item index="1-4-2"><router-link to="/setting/discountidea">折扣方案</router-link></el-menu-item>
              <el-menu-item index="1-4-3"><router-link to="/setting/commissionidea">佣金方案</router-link></el-menu-item>
              <el-menu-item index="1-4-4"><router-link to="/setting/coupontype">卡券类型</router-link></el-menu-item>
              <el-menu-item index="1-4-5"><router-link to="/setting/creadittype">信用卡类型</router-link></el-menu-item>
            </el-submenu>
            <el-menu-item index="1-5"><router-link to="/setting/code">代码设置</router-link></el-menu-item>
            <el-menu-item index="1-6"><router-link to="/setting/equipment">设备设置</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><router-link to="/setting/system">系统设置</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/setting/print">打印设置</router-link></el-menu-item>
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
  width: calc(100% - 58px);
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

