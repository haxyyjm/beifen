<template>
  <div>
    <el-col  style="background-color: #EAEDF1; width: 250px">
      <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-caret-bottom"></i>
            <span>内控店控</span>
          </template>
          <el-menu-item-group>
            <router-link to="/organizationchart/Internalcontrol"><el-menu-item index="1-1">内控人员管理和权限设置</el-menu-item></router-link>
            <router-link to="/organizationchart/grouplimits"><el-menu-item index="1-2">组织架构</el-menu-item></router-link>
            <router-link to="/organizationchart/personrole"><el-menu-item index="1-3">人员角色管理</el-menu-item></router-link>
            <router-link to="/organizationchart/rolemanager"><el-menu-item index="1-4">权限管理</el-menu-item></router-link>
            <el-menu-item index="1-5">薪资管理</el-menu-item>
            <el-menu-item index="1-6">排班考勤管理</el-menu-item>
            <el-menu-item index="1-7">操作记录</el-menu-item>
            <el-menu-item index="1-8">设备设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>站点登录管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">站点管理</el-menu-item>
            <el-menu-item index="2-2">操作记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <router-view></router-view>
  </div>



</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1-1'
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
  .el-menu{
    background-color: #EAEDF1;
    color: #000000;
  }

</style>

