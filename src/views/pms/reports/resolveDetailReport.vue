<template>
    <!--佣金方案-->
  <div style="width: calc(100% - 60px); margin: auto">
      <div style="border: 1px dashed; margin-top: 20px; margin-bottom: 20px; height: 50px">
          <el-row>
            <h2 style="text-align: center; line-height: 50px">营业日报（区间）表</h2>
            <span style="float: left; margin-top: -25px; margin-left: 18px">{{hotel_name}}</span>
            <span style="float: right; margin-top: -25px; margin-right: 18px">日期:&nbsp;{{todayDate}}</span>
          </el-row>
      </div>
      <div @click="getReportInfo">
        <report-head ref="childReport" :reportParam = 'reportParam' v-on:listenToChild = 'getInfowFromChild'></report-head>
      </div>
      <el-row>
          <el-table
          id="yingInvoice_id"
          :data="tabel_reportData"
          size="mini"
          height="600"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
          style="width: 100%;margin-top: 60px">
          <el-table-column  label="项目">
            <template slot-scope="scope">
              <span :class="{isFontColor: (scope.row.project== 'a、房间出租总数' || scope.row.project== 'b、出租率%' || scope.row.project== 'c、房租收入' || scope.row.project== 'd、平均房价')  ? !isColor :isColor}">
                {{scope.row.project}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="interval" label="本期">
          </el-table-column>
            <!-- <el-table-column prop="today" label="上期">
            </el-table-column> -->
        </el-table>
      </el-row>
  </div>
</template>

<script>
    import reportHead from '../../../components/report/reportHead'
    import moment from 'moment'
    export default {
        name: "cashierReport",
        data(){
            return{
              isColor: false,
              hotel_name: '',
              page_size: 10,
              currentPage: 1,
              total_page: 0,//分页总数
              tabel_reportData: [],
              todayDate: moment().format('YYYY-MM-DD'),
              reportParam: {
                name: '营业日报（区间）表',
                id: 'yingInvoice_id',
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
            this.tabel_reportData = data.reportData_list.result_list.total //暂时的
            console.log('this.tabel_reportData===传进来的值',this.tabel_reportData)
            let  receive_array = data.reportData_list.result_list.room_data
            let {count: a,percentage: b, price: c, average_price: d} = receive_array //解构赋值
            let resolveValue_a= this.resolveData(a,'房间出租总数','a、')//处理数据 
            let resolveValue_b= this.resolveData(b,'出租率%','b、')//处理数据 
            let resolveValue_c= this.resolveData(c,'房租收入','c、')//处理数据 
            let resolveValue_d= this.resolveData(d,'平均房价','d、')//处理数据 
            this.tabel_reportData = this.tabel_reportData.concat(resolveValue_a,resolveValue_b,resolveValue_c,resolveValue_d) //数组拼接
            this.hotel_name = data.hotel_name
          },
          /**
           * @descc 封装处理返回获得数据
           */
          resolveData(param,desc,prefix){
            let index_param = param.findIndex(item=>item.project == desc)
            let paramValue = param.splice(index_param,1)
            paramValue[0].project = prefix + paramValue[0].project
            param.unshift(paramValue[0]) //放在首位
            return param
          }
        }
    }
</script>

<style scoped>

</style>
