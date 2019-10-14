<template>
  <div class="page-all">
    <el-card>
      <el-header>
        <li>
          <img src="@/assets/images/pincontrol-treasure/treasure/cash-coupon/Diamond.png" />券使用明细:
          <div class="search-style"><span>券定义编码:</span><input/><button>搜索</button></div>
        </li>
      </el-header>
      <el-table :data="tableData_cash_coupon" size="mini" :header-cell-style="{background:'#68819E',color:'#FFFFFF'}" style="width: 100%">
        <el-table-column prop="date" label="券定义编码">
        </el-table-column>
        <el-table-column prop="name" label="券类别">
        </el-table-column>
        <el-table-column prop="address" label="定义名称">
        </el-table-column>
        <el-table-column prop="address" label="面值（折扣）" width="110">
        </el-table-column>
        <el-table-column prop="address" label="状态">
        </el-table-column>
        <el-table-column prop="address" label="销售方式">
        </el-table-column>
        <el-table-column prop="address" label="发行数量">
        </el-table-column>
        <el-table-column prop="address" label="已销售数量">
        </el-table-column>
        <el-table-column prop="address" label="剩余数量">
        </el-table-column>
        <el-table-column prop="address" label="已使用数量">
        </el-table-column>
        <el-table-column prop="address" label="生效时间">
        </el-table-column>
        <el-table-column prop="address" label="失效时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "cash-coupon",
    data() {
      return {
        //现金券的表格
        tableData_cash_coupon: [],
      }
    }
  }
</script>

<style scoped lang="less">
  //公共的按钮样式
  .common-button {
    width: 4rem;
    height: 30px;
    background: #68819E;
    border: none;
    color: #ffffff;
    line-height: 30px;
    border-radius: 4px;
    margin-left: 0.5rem;
  }
  /**
   页面总的样式
   */
  .page-all {
    width: 94%;
    margin-top: 1%;
    margin-left: 1%;
    .el-main {
      background-color: #F7F7F7;
      color: #333;
      text-align: left;
      border-radius: 4px;
      .el-col {
        border-radius: 4px;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
        background: #F7F7F7;
        ul {
          li {
            padding-top: 10px;
            span {
              display: inline-block;
              width: 6rem;
              text-align: left;
              margin-left: 10px;
            }
            input {
              height: 27px;
              width: 8rem;
              margin-left: 10px;
              border: 1px solid #cccccc;
              border-radius: 4px;
            }
            textarea {
              height: 40px;
              width: 140px;
              margin-left: 10px;
              border: 1px solid #cccccc;
              border-radius: 4px;
            }
            button {
              .common-button;
            }
          }
        }
        .grid-content-ul {
          li {
            padding-top: 20px;
            label {
              width: 40px;
              margin-left: 10px;
            }
          }
        }
      }
    }
    .el-card {
      margin-top: 10px;
      height: 200px;
      .el-header {
        li {
          display: flex;
          list-style: none;
          align-items: center;
          img {
            height: 25px;
            width: 25px
          }
        }
        font-weight: bold;
        margin-left: -20px;
      }
      .search-style{
        margin-left: 65%;
        display: flex;
        list-style: none;
        align-items: center;
        input{
          height: 27px;
          width: 8rem;
          margin-left: 10px;
          border: 1px solid #cccccc;
        }
        button{
          border: none;
          height: 27px;
          width: 4rem;
          background: #4488E9;
          color: #FFFFFF;
          line-height: 27px;
        }
      }
      .el-table {
        margin-top: -20px;
      }
    }
  }
</style>
