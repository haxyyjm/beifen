<template>
  <div>
    <div style="margin-left: 20px">
        <span>常用报表</span>
    </div>
    <!--页面添加弹出框-->
    <!-- <div style="position:absolute; right: 0;width: 300px; z-index: 999; margin-top: -20px; border-left: #8ebcfc">
      <transition name="el-zoom-in-top">
        <el-card class="box-card list-wide" v-show="sidePanelShow" style="height: 680px;">
            <div style="background-color: #303A41; width: calc(100% + 60px);color: white; margin-left: -20px; margin-top: -22px; height: 40px">
                <span style="float: left; line-height: 40px; margin-left: 10px">添加常用报表</span>
                <i  style="position: absolute; right: 0; top: 10px; margin-right: 5px; cursor: pointer" @click="closeSidePanel(sidePanelShow)" class="el-icon-close"></i>
            </div>
            内容
        </el-card>
      </transition>
    </div>
    <el-row style="margin-top: 20px">
    <div style="overflow:auto; overflow-x:hidden; height: 640px">
      <el-col :span="5" v-for="(item, index) in commonReportList" :key="index" style="margin-top: 20px;margin-left: 20px">
        <div class="el-card-show">
          <el-card :body-style="{ padding: '0px' }" style="height: 160px;cursor:pointer;" >
          </el-card>
        </div>
      </el-col>
      <el-col :span="5" style="margin-top: 20px;margin-left: 20px">
        <div @click="openAddCommonReport" class="el-card-add">
          <el-card class="module-item" :body-style="{ padding: '0px' }" style="height: 160px">
            <i class="el-icon-circle-plus" style="font-size: 40px;font-weight: 900;position: relative;margin-left: 40%;margin-top: 20%;"></i>
          </el-card>
        </div>
      </el-col>
      </div>
    </el-row>
    <div class="block" style="float: right; margin-top: 20px">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next"
      :total="dataCount">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
//   import {mapState} from 'vuex'
  export default {
    data () {
      return {
        sidePanelShow: false,
        commonReportList: '',
      }
    },
    name: 'commonReport',
    computed: {
    },
    created () {
    },
    methods: {
      closeSidePanel (sidePanelShow) {
        this.sidePanelShow = !sidePanelShow
      },
      openAddCommonReport () {
        this.sidePanelShow = true
      }
    }
  }
</script>
<!--<style>
  .el-card-show {
    color: rgb(51, 51, 51);
    font-style: normal;
    font-weight: normal;
    font-size: 13.008px;
    font-variant-caps: normal;
    font-variant-ligatures: normal;
  }
  .el-card-show .content_text {
    height:120px;
    overflow:auto;
    overflow-x:hidden;
    background-color: #cccccc;
    padding: 10px
  }
  .el-card-show .content_bottom {
    background-color: #E0E0E0;
    font-size: small;
    padding-left: 10px
  }
  .el-card-show:hover .content_text {
    background-color: #f9f6ff;
  }
  .el-card-show:hover .content_bottom {
    background-color: #edf3ff;
  }
  .el-card-add .module-item {
    cursor:pointer;border: 1px solid;
  }
  .el-card-add:hover .module-item {
   border-color: #259cd6;
  }
  .el-card-add i {
    color: grey;
  }
  .el-card-add:hover i {
    color: #259CD6 !important;
  }
  html,body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-style: normal;
    font-weight: normal;
  }
</style>-->