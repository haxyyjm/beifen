<template>
  <div class="setting">
    <ul class="type" >
      <router-link :to="item.path" v-for="(item,index) in itemList " :key="index">
        <li :class="activeClass == index ? 'active':''" @click="getItem(index)">{{item.projectName}}</li>
      </router-link>


    </ul>





    <div class="router">
      <router-view></router-view>
      <div class="ini"><logon-view></logon-view></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "moduletypesetting",
      data() {
        return {
          itemList: [
            {
              projectName: '模块类型',
              path:'/module-type-setting/module-type'

            },
            {
              projectName: '模块种类',
              path:'/module-type-setting/kind'
            }


          ],
          activeClass: 0,
        };
      },
      methods:{
        getItem(index){
          this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        }
      }
    }
</script>

<style  lang="less"  scoped>
  .active {
    background: #4488e9;
    color: white;

  }
 .setting{
   width: 100%;
   height:calc(100% - 77px);
    .type{
      float: left;
      width: 68px;
      height: 100%;
      margin: 0px 50px 0 8px;
      li{
        height: 214px;
        border:1px solid rgba(204,204,204,1);
        margin-top: 12px;
        padding:60px  24px;
        font-size: 16px;

        span{
            display: inline-block;
            width: 20px;
            font-size: 18px;
            margin-top: 60px;
            margin-left: 22px;
            color: #333333FF;

        }
      }
    }





   .router{
     float: left;
     width:calc(100% - 200px);
     height: 100%;
     font-size:20px;
     min-width: 60px;
     white-space:nowrap;
     .ini{
       height: calc(100% - 30px);
       position: absolute;
       right: 0;
       top: 30px;

     }
   }
 }



</style>
<style>

</style>
