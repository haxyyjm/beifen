<template>
  <div>
<Not-opened></Not-opened>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        name: "module-sales-management",
      data() {
        return {
          //代表每页显示的条数
          pagesize:1,
          total:0,
          list:[],
          curPage:'',
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      created: function () {

          },
      methods: {
        handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          this.curPage=curPage;

        }
      }

    }
</script>

<style scoped>

</style>
