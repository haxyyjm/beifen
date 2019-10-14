<template>
  <!--客户-->
  <div class="warp-main">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="warp-tab">
      <el-tab-pane label="客人资料" name="first">
        <div class="main-top">
          <label>房间号：</label>
          <input/>
          <label>客人姓名：</label>
          <input/>
          <label>入住时间：</label>
          <el-date-picker
            v-model="value1"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>离店时间：</label>
          <el-date-picker
            v-model="value2"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-select v-model="value" placeholder="在住" size="mini" style="width: 6rem;margin-left: 10px">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="全部" size="mini" style="width: 6rem;margin-left: 10px">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <button>查询</button>
          <button>打印</button>
          <button>导出Excel</button>
        </div>
        <div>
        </div>
        <div class="main-table">
          <el-table
            :data="tableData_guest"
            stripe
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            style="width: 100%">
            <el-table-column
              fixed
              prop="order_no"
              width="250px"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="master_guest"
              width="250px"
              label="详细信息" type="expand">
              <template slot-scope="scope">
                <span>姓名:</span><span v-for="(col,index) in scope.row.master_guest">{{col.name}}、</span>
                <span>手机号:</span><span v-for="(col,index) in scope.row.master_guest">{{col.telephone}}、</span>
                <span>身份证号:</span><span v-for="(col,index) in scope.row.master_guest">{{col.id_no}}、</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="room_number"
              width="60px"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="room_type"
              label="房间类型">
            </el-table-column>
            <el-table-column
              prop="fix_rate"
              width="70px"
              label="房价">
            </el-table-column>
            <el-table-column
              prop="biz_date"
              width="170px"
              label="入住时间">
            </el-table-column>
            <el-table-column
              prop="arr_time"
              width="170px"
              label="预定时间">
            </el-table-column>
            <el-table-column
              prop="resleave"
              width="40px"
              label="预离">
            </el-table-column>
            <el-table-column
              prop="unit"
              width="40px"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="passsource"
              width="40px"
              label="客源">
            </el-table-column>
            <el-table-column
              prop="hourroom"
              width="70px"
              label="钟点房">
            </el-table-column>
            <el-table-column
              prop="total_pay"
              width="100px"
              label="总付款">
            </el-table-column>
            <el-table-column
              prop="total_chartge"
              width="100px"
              label="总消费">
            </el-table-column>
            <el-table-column
              prop=""
              label="催款">
            </el-table-column>
            <el-table-column
              prop="breakfast"
              label="含早">
            </el-table-column>
            <el-table-column
              prop="blacklist"
              label="黑名单">
            </el-table-column>
            <el-table-column
              prop="badrecord"
              width="70px"
              label="不良记录">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button type="danger" @click="deleteClick(scope.$index, scope.row,tableData_guest)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange_list" :current-page="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="客人发票信息" name="second">
        <div class="main-top">
          <label>修改人：</label>
          <input/>
          <label>客户姓名：</label>
          <input/>
          <label>手机号：</label>
          <input/>
          <label>入住时间：</label>
          <el-date-picker
            v-model="value1"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>离店时间：</label>
          <el-date-picker
            v-model="value2"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-select v-model="value" placeholder="是否已开发票" size="mini" style="width: 8.5rem;margin-left: 10px">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="有效" size="mini" style="width: 6rem;margin-left: 10px">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <button>查询</button>
          <button>打印</button>
        </div>
        <div>

        </div>
        <div class="main-table">
          <el-table
            :data="tableDatainvoice"
            stripe
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            style="width: 100%">
            <el-table-column
              prop="num"
              width="50px"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="name"
              width="50px"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="wxnum"
              width="120px"
              label="用户微信号">
            </el-table-column>
            <el-table-column
              prop="invoicehead"
              width="100px"
              label="发票抬头">
            </el-table-column>
            <el-table-column
              prop="phone"
              width="120px"
              label="手机或电话">
            </el-table-column>
            <el-table-column
              prop="grttype"
              label="获取方式">
            </el-table-column>
            <el-table-column
              prop="address"
              width="70px"
              label="邮寄地址">
            </el-table-column>
            <el-table-column
              prop="expressnum"
              width="120px"
              label="快递编号">
            </el-table-column>
            <el-table-column
              prop="reservetime"
              width="170px"
              label="预定时间">
            </el-table-column>
            <el-table-column
              prop="status"
              width="40px"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="invoicetime"
              width="170px"
              label="开票时间">
            </el-table-column>
            <el-table-column
              prop="invoicevalid"
              width="90px"
              label="发票是否有效">
            </el-table-column>
            <el-table-column
              prop="updateper"
              width="70px"
              label="修改人">
            </el-table-column>
            <el-table-column
              prop="updatetime"
              width="170px"
              label="修改时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a
                  size="mini"
                  style="cursor: pointer"
                  @click="handleDeleteinvoice(scope.$index)">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50" class="pull-right" :current-page="5">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        value1:'',
        value2:'',
        value:'',
        /**
         * 分页
         */
        currentPage: 1, //当前页码
        page_size: 10, //每页显示数量
        total: 0, //总数
        activeName2: 'first',
        options2 : [],
        //下拉框的值
        //下拉框的数据
        options1: [],
        tableDatainvoice : [],//客人
        tableData_guest :[],//在住客人的信息
        // url : 'http://bill.crowncrystalhotel.com',
         url: 'http://47.98.113.173:9202',
      };
    },
    created : function(){
       let that = this;
       that.get_all_guest_info();
    },
    methods: {
      get_all_guest_info(){
         let that = this;
         let url = that.url + '/v1/checkin/all_master_list/';
         that.$axios({
            method : 'post',
            url : url,
            data : {
              guest_list: {
                master_from_lable: [],
                room_type: [],
                code_market_id: [],
                code_src_id: []
              }
            }
         }).then((res)=>{
            console.info(res);
            that.tableData_guest = res.data.data.results;
            that.total = res.data.data.count;
         }).catch((err)=>{
            console.error(err);
         })
      },
      /**
       * 删除的操作
       * @param index  当前行的下标
       * @param row  当前行的内容
       * @param TableData  当前操作的表格
       */
      deleteClick(index, row, TableData) {
        let that = this;
        let url = '';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            order_no: row.order_no
          }
        }).then(function(res) {
          TableData.splice(index, 1);
          that.hintInfo('success', '删除成功！');
        }).catch(function(err) {
          console.info(err);
          that.hintInfo('warning', '删除失败！');
        })
        console.info(index, row.id);
      },
      /**
       * @handleCurrentChange_list 分页
       */
      handleCurrentChange_list(currentPage) {
        let that = this;
        let url = that.url + '/v1/checkin/all_master_list/?page=' + currentPage;
        that.$axios({
          method: 'post',
          url: url,
          data: {
            guest_list: {
              master_from_lable: [], // 入住单类别
              room_type: [], //房间类型
              code_market_id: [], //市场码
              code_src_id: [] //来源码
            }
          }
        }).then((res) => {
          console.info(res);
          that.tableData_guest = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @hintInfo 操作提示信息
       * @param hint  成功提示
       * @param info 警告信息
       */
      hintInfo: function(hint, info) {
        let that = this;
        if(hint === "success") {
          that.$message({
            message: info,
            type: 'success'
          });
        } else if(hint === "warning") {
          that.$message({
            message: info,
            type: 'warning'
          });
        } else {
          this.$message.error('出错了！');
        }
      },
      //客人发票删除
      handleDeleteinvoice(index) {
        this.tableDatainvoice.splice(index,1)
      },
    }
  }
</script>
<style lang="less" scoped>
  /**
   客人资料css样式
   */
  .warp-main{
    width: calc(100% - 58px);
    .warp-tab{
      margin-left: 0.5%;
      width: 99%;
      .main-top{
        width: 100%;
        height: 40px;
        background: #F7F7F7;
        label{
          margin-left: 10px;
          font-size: small;
          color: #333333;
        }
        input{
          margin-top: 7.5px;
          border: 1px solid #CCCCCC;
          border-radius: 4px;
          width: 120px;
          height: 25px;
        }
        button{
          width: 60px;
          height: 27px;
          color: #fff;
          background: #4488E9;
          border: none;
          margin-left: 10px;
          border-radius: 4px;
        }
      }
    }
  }
  .main-table{
    margin-top: 10px;
  }
  .el-tabs--top.el-tabs--border-card .el-tabs__item.is-active{
    //border: none;
    border-top: 2px solid #4488E9;
  }
</style>
