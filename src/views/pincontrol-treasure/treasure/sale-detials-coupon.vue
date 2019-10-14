<template>
  <div class="page-all">
    <el-card>
      <el-header>
        <li>
          <img src="@/assets/images/pincontrol-treasure/treasure/cash-coupon/Diamond.png" />券销售明细:
          <div class="search-style"><span>券定义编码:</span><input/><button>搜索</button></div>
        </li>
      </el-header>
      <el-table :data="tableData_cash_coupon" size="mini" height="70vh" :header-cell-style="{background:'#68819E',color:'#FFFFFF'}" style="width: 100%">
        <el-table-column prop="coupon_code" label="券定义编码" fixed>
        </el-table-column>
        <el-table-column prop="coupon_source_type" label="券类别">
        </el-table-column>
        <el-table-column prop="no" label="券号" width="170">
        </el-table-column>
        <el-table-column prop="present_value" label="面值（折扣）" width="110">
        </el-table-column>
        <el-table-column prop="sta" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.sta === 'I'">销售</span>
              <span v-if="scope.row.sta === 'O'">使用</span>
              <span v-if="scope.row.sta === 'S'">停用</span>
            </template>
        </el-table-column>
        <el-table-column prop="sale_type" label="销售方式">
        </el-table-column>
      <!--  <el-table-column prop="address" label="发行数量">
        </el-table-column>
        <el-table-column prop="address" label="已销售数量">
        </el-table-column>
        <el-table-column prop="address" label="剩余数量">
        </el-table-column>
        <el-table-column prop="address" label="已使用数量">
        </el-table-column>-->
        <el-table-column prop="valid_from_date" label="生效时间" width="190">
        </el-table-column>
        <el-table-column prop="valid_to_date" label="失效时间" width="190">
        </el-table-column>
        <el-table-column fixed="right"
                         prop="address"
                         label="操作"
                         width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="lose_efficacy(scope.$index, scope.row,tableData_cash_coupon)">失效</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        //url
        url : 'http://192.168.4.99:8001/v1/',
        //分页
        currentPage: 1,
        pagesize: 20,
        total: 0,
      }
    },
    created : function () {
      this.search_coupon_list();
    },
    methods : {
      /**
       * @search_coupon_list 查询券列表的信息
       */
      search_coupon_list() {
        let that = this;
        let url = that.url + 'customer/coupon/get_coupon_list/';
        that.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
          that.total = res.data.data.count;
          that.tableData_cash_coupon = res.data.data.results;
          console.info(res);
        }).catch((err) => {
          console.info(err);
        })
      },
      /**
       * @handleCurrentChange_sale_card 会员列表的分页  点击每一页的时候的函数
       */
      handleCurrentChange: function (currentPage) {
        let that = this;
        let url = that.url + 'customer/coupon/get_coupon_list/';
        that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 20
          }
        }).then(function (res) {
          that.tableData_cash_coupon = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
       * @info 需要提示的信息
       */
      hintInfo : function(hint,info){
        let that = this;
        if(hint == "success"){
          that.$message({
            message: info,
            type: 'success'
          });
        }else if(hint == "warning"){
          that.$message({
            message: info,
            type: 'warning'
          });
        }else{
          this.$message.error('出错了！');
        }
      },
      /**
       * @lose_efficacy 失效操作
       * @param no
       */
      lose_efficacy(index,row,TableData){
          let that = this;
          let url = '';
          that.$axios({
               method : 'post',
               url : url,
               data:{
                sta : row.sta = 'S'
              },
          }).then((res)=>{
             that.hintInfo('success',''+that.row.no+'已失效！')
             that.handleCurrentChange(that.currentPage);
          }).catch((err)=>{
             console.info(err)
          });

      },
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
      width: 79vw;
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
