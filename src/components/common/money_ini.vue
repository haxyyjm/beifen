<template>
  <div class="money_ini">
    <div class="topbar-account topbar-btn">
      <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> {{nickname}}   <i class="el-icon-caret-bottom"></i></span>
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
    <!--<router-link to="/setting/papers"><img src="../../../src/assets/images/internal-store-control/logon.png" alt=" " ></router-link>-->

  </div>
</template>

<script>
    export default {
        name: "money_ini",
      data(){
        return{
          nickname: '',
        }
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
    }
</script>

<style lang="less" scoped>
  .money_ini{
    width:50px;
    height:100%;
    background:rgba(48,58,65,1);
    overflow: hidden;
    .topbar-account{
      margin-left: 5px;
      width:38px;
      height:38px;
      margin-top: 10px;
      background:rgba(222,131,132,1);
      border-radius:50%;
    }
    img{
      width:29px;
      height:28px;
      margin-top: 41px;
      margin-left: 12px;
    }
  }
</style>
<style>
  .el-dropdown{
    margin-top:10px;
    margin-left: 10px;
    color: white;
  }
  . icon-user{
    width: 20px;
    margin-top: 10px;

  }
  .el-icon-caret-bottom{
    display: none;
  }
</style>
