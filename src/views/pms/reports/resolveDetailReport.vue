<template>
    <!--佣金方案-->
  <div style="width: calc(100% - 60px); margin: auto">
      <div style="border: 1px dashed; margin-top: 20px; margin-bottom: 20px; height: 50px">
          <el-row>
            <h2 style="text-align: center; line-height: 50px">结账实收明细表</h2>
            <span style="float: left; margin-top: -25px; margin-left: 18px">上海皇冠晶品酒店虹桥店</span>
            <span style="float: right; margin-top: -25px; margin-right: 18px">日期:&nbsp;{{todayDate}}</span>
          </el-row>
      </div>
      <el-row>
          <div style="float: left">
            <el-select></el-select>
            <el-input style="width: 200px"></el-input>
            <el-input style="width: 200px"></el-input>
          </div>
          <div style="float: right">
              <el-button type='primary'>查询</el-button>
              <el-button type='primary'>打印</el-button>
              <el-button type='primary'>导出Excel</el-button>
          </div>
      </el-row>
      <el-row>
          <el-table
          :data="tableData"
          size="mini"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 60px">
          <el-table-column
            prop="date"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="房间类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="房间编号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="房价">
          </el-table-column>
          <el-table-column
            prop="address"
            label="钟点价">
          </el-table-column>
          <el-table-column
            prop="address"
            label="半天房价">
          </el-table-column>
          <el-table-column
            prop="address"
            label="标识字符">
          </el-table-column>
          <el-table-column
            prop="address"
            label="押金金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="续住押金">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handTypeDelete(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handTypeEdit()" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
  </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "cashierReport",
        data(){
            return{
                tableData: [],
                todayDate: moment().format('YYYY-MM-DD')
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
