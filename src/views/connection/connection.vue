<template>
  <div class="connection">
    <div class="navigation">
      <el-col class="pull-left" style="background-color: white; width: 280px;">
        <!--<p style="padding: 10px;background: rgb(104, 129, 158);margin-top: 0px;color: white;width: 274px;">OTA直连</p>-->
        <ul class="navigation"style="margin-top: 10px;">
          <router-link :to="item.path" v-for="(item,index) in connection_list " :key="index">
            <li :class="activeClass == index ? 'active':''" @click="getItem(index,item)">{{item.descript}}</li>
          </router-link>
        </ul>
      </el-col>
    </div>
    <div class="router" style="border-left:2px solid  #eeeeee ;">
      <div class="ini">
        <money-task></money-task>
      </div>
      <router-view  ></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "connection",
        data(){
          return{
            connection_list:[
              {
                descript:'订单',
                path:'/connection/order-form'
              },
              {
                descript:'公司',
                path:'/connection/corporation'
              },
              // {
              //   descript:'房型',
              //   path:'/connection/room-type'
              // },
              {
                descript:'产品',
                path:'/connection/product'
              },
              {
                descript:'调价',
                path:'/connection/configuration'
              },
              {
                descript:'配置',
                path:'/connection/deploy'
              },
              // {
              //   descript:'设置',
              //   path:'/connection/ota-set'
              // },
              {
                descript:'爬虫报错',
                path:'/connection/reptile'
              },
              {
                descript:'报表',
                path:'/connection/ota-report'
              }

            ],
            activeClass: 0,
          }
        },
      created(){

      },
      methods:{
        getItem(index,item){
          console.log(item);
          let that=this;
          this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
          that.service_type =item.id;
        },
      }

    }
</script>

<style lang="less" scoped>
  .connection {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 278px;
      height: 100%;
      background: white;
      li {
        height: 50px;
        padding-left: 40px;
        line-height: 50px;
      }
    }
    .router {
      width: calc(100% - 278px);
      height: 100%;
      overflow-y: scroll;
      float: left;
      background: white;
      padding-left: 4px;
      .ini {
        height: calc(100% - 60px);
        position: absolute;
        right: 0px;
        top: 60px;
        z-index: 10;
      }
    }
  }
  .active {
    /* background: #eee; */
    background: #eeeeee;
    font-weight: bolder;
    border-radius: 4px;
    width: 274px;
  }

</style>
<style scoped>
  .connection>>> .el-transfer-panel{
    width: 320px;
  }
</style>
