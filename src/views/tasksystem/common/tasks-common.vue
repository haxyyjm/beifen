
<template>

  <el-row class="container" >
    <!--头部-->
    <el-col :span="24" class="topbar-wrap"  style=" min-width: 1400px;white-space:nowrap; overflow: hidden">
      <div class="topbar-logo topbar-btn">
        <router-link to="/"><img src="../../../assets/logo.png" style="padding-left:8px;"></router-link>
      </div>
      <div class="topbar-logos" >
        <a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed"></span></a>
      </div>
      <div class="topbar-title" style="margin-left: 86px">
        <el-row v-show="$store.state.topNavState==='home'"><!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-col :span="24">
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true"  style="float: left">
              <el-menu-item v-for="(item,i) in itemList"  :key="i"  :index="item.path" style="width:100px;text-align: center">{{item.projectName}}</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!--<div class="search" style=" float: right;" >-->
        <!--<input type="text" placeholder="手机号/姓名/房号/订单号">-->
      <!--</div>-->

    </el-col>

    <!--中间-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-row>
</template>

<script>
  export default {
    name: "home-shopping",
    data () {
      return {
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        itemList: [
          {
            projectName: '任务体系',
            path: '/tasks/person'
          }



        ],
      }
    },
    created() {// 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchNavData();
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      fetchNavData () { // 初始化菜单激活项
        // debugger
        var cur_path = this.$route.path; //获取当前路由
        var routers = this.$router.options.routes; // 获取路由对象
        var nav_type = "", nav_name = "";
        for (var i = 0; i < routers.length; i++) {
          var children = routers[i].children;
          if(children){
            for (var j = 0; j < children.length; j++) {
              var grand_children = children[j].children;
              if(grand_children){
                for (var k = 0; k < grand_children.length; k++) {
                  if (grand_children[k].path === cur_path) {
                    nav_type = routers[i].type;
                    nav_name = routers[i].name;
                    break;
                  }
                  // 如果该菜单下还有子菜单
                  if(children[j].children) {
                    let grandChildren = children[j].children;
                    for(let z=0; z<grandChildren.length; z++) {
                      if(grandChildren[z].path === cur_path) {
                        nav_type = routers[i].type;
                        nav_name = routers[i].name;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.$store.state.topNavState = nav_type;  // 改变topNavState状态的值
        this.$store.state.leftNavState = nav_name;  // 改变leftNavState状态的值
        if(nav_type == "home"){
          this.defaultActiveIndex = "/";
        } else {
          this.defaultActiveIndex = "/" + nav_name + "Manager";
        }
      },
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
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    },
    watch: {
      '$route': 'fetchNavData'  //监听router值改变时，改变导航菜单激活项
    }
  }
</script>

<style  lang="less" scoped>
  .search{
    input{
      width: 200px;
      height: 30px;
      margin-right: 10px;
    }


  }
  .topbar-title{

    white-space:nowrap;

  }
</style>
<!--<style>
  .el-menu-item{
    padding: 0;
    padding-right: 20px;
  }
</style>-->
