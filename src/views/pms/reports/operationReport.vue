<template>
    <!--佣金方案-->
  <div style="width: calc(100% - 60px); margin: auto">
      <div style="border: 1px dashed; margin-top: 20px; margin-bottom: 20px; height: 50px">
          <el-row>
            <h2 style="text-align: center; line-height: 50px">本日将离客人报表</h2>
            <span style="float: left; margin-top: -25px; margin-left: 18px">{{hotel_name}}</span>
            <span style="float: right; margin-top: -25px; margin-right: 18px">日期:&nbsp;{{todayDate}}</span>
          </el-row>
      </div>
      <div @click="getReportInfo">
        <report-head ref="childReport" :reportParam = 'reportParam' v-on:listenToChild = 'getInfowFromChild'></report-head>
      </div>
      <el-row>
          <el-table
          id="dayLeave_id"
          :data="tabel_reportData"
          size="mini"
          height="500"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 60px">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="guest_list" label="姓名"></el-table-column>
          <el-table-column prop="id_no_list" label="身份证号"></el-table-column>
          <el-table-column prop="id_no_list" label="房间号"></el-table-column>
          <el-table-column prop="room_type" label="房型"></el-table-column>
          <el-table-column prop="order_no" label="订单号"></el-table-column>
          <el-table-column prop="arr_time" label="到达时间"></el-table-column>
          <el-table-column prop="leave_time" label="离开时间"></el-table-column>
        </el-table>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15,30,60]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_page">
      </el-pagination>
  </div>
</template>

<script>
    import reportHead from '../../../components/report/reportHead'
    import moment from 'moment'
    export default {
        name: "cashierReport",
        data(){
            return{
              hotel_name: '',
              page_size: 10,
              currentPage: 1,
              total_page: 0,//分页总数
              tabel_reportData: [],
              todayDate: moment().format('YYYY-MM-DD'),
              reportParam: {
                name: '本日将离客人报表',
                id: 'dayLeave_id',
                page_num: 1,
                page_size: 15
              }
            }
        },
        components: {
          'report-head': reportHead
        },
        mounted(){
          this.getReportInfo()
        },
        methods: {
          //父组件调用子组件方法
          getReportInfo(){
            console.log('this.reportParam.page_num====',this.reportParam)
            this.$refs.childReport.findToParent()
          },
          //监听子组件的值
          getInfowFromChild(data){
            console.log('data子组件传来的值',data)
            this.tabel_reportData = data.reportData_list
            this.total_page = data.reportData_count
            this.hotel_name = data.hotel_name

          },
          handleSizeChange(val) {
            this.reportParam.page_size = val//先后顺序很重要
            this.getReportInfo()
            console.log(`每页 ${val} 条`);
            console.log('page_num',this.reportParam.page_num)
          },
          handleCurrentChange(val) {
            this.reportParam.page_num = val
            this.getReportInfo()
            console.log(`当前页: ${val}`);
          }
        }
    }
</script>

<style scoped>

</style>
