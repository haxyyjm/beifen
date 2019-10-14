<template>
  <div class="tasks">
    <div class="navigation">
      <div>
        <p style="padding: 10px;">请选择酒店 ：</p>
        <el-select v-model="hotel_group" placeholder="请选择"   style="width: 229px;margin: 10px">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
            <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
              <el-menu-item index="1-1"><router-link to="/tasks/person">送物</router-link></el-menu-item>
              <el-menu-item index="1-2"><router-link to="/tasks/room-service">送餐</router-link></el-menu-item>
              <el-menu-item index="1-3"><router-link to="/tasks/purchase">采购</router-link></el-menu-item>
              <el-menu-item index="1-4"><router-link to="/tasks/shuttle-bus">班车</router-link></el-menu-item>
              <el-menu-item index="1-5"><router-link to="/tasks/engineering">工程配合</router-link></el-menu-item>
              <el-menu-item index="1-6"><router-link to="/tasks/human">人员协作</router-link></el-menu-item>
              <el-menu-item index="1-7"><router-link to="/tasks/awaken">叫醒</router-link></el-menu-item>
            </el-menu-item-group>
        </el-menu>
      </el-col>

    </div>


    <div class="router">
      <div class="ini"><money-task></money-task></div>
      <router-view ></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: "tasks",
    data() {
      return {
        api:"http://47.98.113.173:9519",
        activeIndex: '1',
        hotel_list:[],//获取酒店
        hotel_group: '',
        id:'',
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created:function () {
      let that = this;
      that. hotel();


    },

    methods: {

      //封装错误信息
      error_message(msg){
        this.$message.error('错了哦，错误消息为'+msg);
      },
      //封装获取酒店的信息
      hotel(){
        let that=this;
        that.$axios({
          "url": ""+that.api+"/v1/common/dept/get_tree",
          "method": "get",
          headers: {
            authorization: sessionStorage.getItem("authorization"),
          }
        })
          .then(res => {
            if (res.data.message=="success"){
              console.log(res.data.data);
              that.hotel_list=res.data.data;
              that.hotel_group=that.hotel_list[0].name;
              that.id=that.hotel_list[0].id;

            }
            else{
              that.error(res.data.message);
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },



      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>

<style lang="less" scoped>
  .tasks{
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation{
      float: left;
      width:256px;
      height: 100%;
      background: white;
      overflow-y: scroll;

    }
    .router{
      width:calc(100% - 256px) ;
      height:100% ;
      overflow-y: scroll;
      float: left;
      .ini{
        height: calc(100% - 60px);
        position: absolute;
        right: 0px;
        top: 60px;
        z-index: 10;
      }
    }
  }
</style>
