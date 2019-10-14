<template>
  <div class="ticket">
    <div class="navigation">
      <div>
        <p style="padding: 10px;">酒店名称</p>
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
        <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white">酒店部门</p>
        <el-tree :data="branch_list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
    </div>


    <div class="router">
      <div class="ini"><money-task></money-task></div>
      <router-view  :branch_id="branch_id"></router-view>
    </div>

  </div>
</template>

<script>
    export default {
        name: "ticket",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          activeIndex: '1',
          hotel_list:[],//酒店
          branch_list:[],//酒店部门
          hotel_group:'',//酒店
          branch_id:'',//所选择的部门id
          defaultProps: {
            children: 'children',
            label: 'name'
          },
        }
      },
      created:function () {
        let that=this;
        that.examine();//获取酒店部门
        that.hotel();//获取酒店
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        //  获取部门
        examine(){
          let  that = this;
          this.$axios({
            url: that.api+"/v1/common/dept/info_list",
            method: "post",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.branch_list=res.data.data.list
                that.branch_id=that.branch_list[0].id;
                // //循环取出attr=1 =有账的部门
                // for( let item of res.data.data.list){
                //   // console.log(item.attr);
                //   if(item.attr === 1){
                //     that.branch_list.push(item);
                //     that.branch_id=that.branch_list[0].id;
                //   }
                // }

              }
              else{
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
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
        //部门事件
        handleNodeClick(data) {
          // console.log(data.id);
          let that=this;
          that.branch_id=data.id;

        },
      }
    }
</script>

<style lang="less" scoped>
  .ticket{
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation{
      float: left;
      width:249px;
      height: 100%;
      background: white;
      overflow-y: scroll;
    }
    .router{
      width:calc(100% - 249px) ;
      height:100% ;
      float: left;
      .ini{
        height: calc(100% - 60px);
        position: absolute;
        right: 0;
        top: 60px;
        z-index: 10;
      }
    }
  }
</style>

