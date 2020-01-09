<template>
  <div class="ota-set">
    <div class="title" >
      <h3 style="padding: 10px;display: inline-block">设置</h3>
      <el-button size="mini"  type="primary" style="width: 80px;" >新增</el-button>

    </div>
    <div class="status" style="margin-top: 10px">
      <el-table
        :data="monitoring_list"
        size="mini"
        height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="camera_name"
          fixed="left"
          label="市场">
        </el-table-column>
        <el-table-column
          prop="camera_name"
          fixed="left"
          label="来源">
        </el-table-column>
        <el-table-column
          prop="camera_name"
          fixed="left"
          label="平台名称">
        </el-table-column>
        <el-table-column
          prop="camera_num"
          fixed="left"
          label="平台账号">
        </el-table-column>
        <el-table-column
          prop="event_type"
          label="密码">
          <template slot-scope="scope">
            <span v-if="scope.row.event_type===0">登记</span>
            <span v-else-if="scope.row.event_type===1">陌生人</span>
            <span v-else-if="scope.row.event_type===2">访客</span>
            <span v-else-if="scope.row.event_type===3">其它</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="person_name"
          label="网址">
        </el-table-column>
        <el-table-column
          prop="event_time"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button  @click="cancel(scope.row.id,scope.$index, employee_list)"
                        type="danger" size="mini" data-code="/v1/common/employee/remove">删除
            </el-button>
            <el-button  size="small"
                        @click="submit(scope.row,scope.row.id,scope.$index, employee_list)"
                        data-code="/v1/common/employee/update">修改
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <!--分页-->
      <el-pagination style="float: right;margin-right: 2%"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     :current-page="cur_page"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ota-set",
    data() {
      return {
        url: this.api.api_9530_9503,
        title: '',
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        monitoring_list:[],//获取监控
        event_type:4,//图像类别

      }
    },
    created: function () {
      let that =this;
    },
    methods: {
      /**s删除*/
      cancel(){

      },
      /**修改*/
      submit(){

      },
      //点击分页上的页数
      handleCurrentChange(curPage) {

      }
    }
  }
</script>

<style scoped lang="less">
  .ota-set{
    width: 100%;
    .title{
      margin: 10px  0;
    }
    .status{
      width: 97%;
    }
  }
</style>
