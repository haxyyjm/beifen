<template>
  <!--设置-->
  <div class="Reports" :style="{height: availHeight, overflow:'auto'}">
    <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
      <div style=" font-size: 22px; color: #222222; margin-left: 36px; "  >
        报表分类
       <!-- <router-link  tag="div" to="/reports/setting/" slot="title" style="font-size: 14px;margin-top: 20px;margin-bottom: 10px;font-weight: bold">配置报表</router-link> -->
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu  v-for="(item,index) in repost_all_list_obj" :key="index" :index='index'>
          <template slot="title">
            <i class="el-icon-caret-bottom"></i>
            <span v-if="item.length> 0">{{item[0].type_desc}}</span>
          </template>
          <el-menu-item-group v-for="data_item of item" :key="data_item.id"  router mode="horizontal">
            <el-menu-item :index="String(data_item.id)"  @click="goReportContent(data_item)">
              <!-- <router-link  :to="'/reports/reportContent/' + data_item.id">
                  {{data_item.desc}}
              </router-link> -->
              {{data_item.desc}}
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



</template>

<script>
  export default {
    data() {
      return {
        availHeight: '',
        activeIndex: '1',
        report_tabel_data: [],
        repost_all_list_obj: {}//所有的关于报表的数据
      }
    },
    created(){
       this.availHeight = (screen.availHeight -180) +'px';
       this.getRepost_list()
    },
    methods: {
      /**
       * @desc 编程导航
       */
      goReportContent(param){
        console.log('参数',param)
        this.$router.push({name: 'reportContent', params: param})
      },
      /**
       * 报表的信息显示
       * @desc 这里是获取报表的配置信息  分为设置:请求的参数  返回的参数
       */
      getRepost_list(){
        let that = this
        let url = 'http://47.98.113.173:9115'  + '/v1/' + `report/unified_interface_list/`
        that.$axios.get(url).then(res=>{
            if(res.data.message == 'success'){
                that.repost_all_list_obj = res.data.data
                // that.report_tabel_data.push({
                //   req_data: that.repost_all_list_obj.old_req_data,
                //   res_data: that.repost_all_list_obj.old_rep_data,
                //   order_data: that.repost_all_list_obj.old_order_data
                // })
                // console.log('that.report_tabel_data',that.report_tabel_data)
            }else{
                that.message.error('获取数据失败，请重试')
            }
        }).catch((error)=>{
          console.log(error)
        })
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
<style scoped>
.Reports{
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
.flag_class{
  color: #409EFF;
}
</style>

