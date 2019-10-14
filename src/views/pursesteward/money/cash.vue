<template>
  <div class="cash">
    <!--头部的搜索-->
    <ul class="title">
      <li style="margin-left: 34px">
        <span>收银点 : </span>
        <el-select v-model="register" placeholder="请选择" clearable  @change="cashier">
          <el-option
            v-for="item in register_list"
            :key="item.value"
            :label="item.desc"
            :value="item.id">
          </el-option>
        </el-select>
      </li>
      <li>
        <div class="block">
          <span class="demonstration">营业日期起 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="biz_start"
            type="date"
            @change="date_click"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
      <li>
        <div class="block">
          <span class="demonstration">营业日期止 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="closing_date"
            @change="closing_click"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
    </ul>
    <!--支付方式 -->
    <div class="shopping">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="现金" name="first">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="detail_all"
              size="mini"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="in_or_out"
                label="收/支"
                width="100"
                column-key="in_or_out"
                :filters="account_data"
                :filter-method="filterHandler"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.code_pay_for_id.in_or_out === 'in'">收</span>
                  <span v-else>支</span>
                </template>
              </el-table-column>


              <el-table-column
                prop="account_type"
                width="110"
                column-key="date"
                :filters="at_data"
                :filter-method="filterHandler"
                label="对应账户类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.account_type === 0">正常</span>
                  <span v-else>AR账户</span>
                </template>

              </el-table-column>




              <!--<el-table-column-->
                <!--prop="address"-->
                <!--label="对应账户">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="code_pay_for_id.desc"
                label="收支原因">
              </el-table-column>
              <el-table-column
                prop="cashier.desc"
                label="收银点">
              </el-table-column>
              <el-table-column
                prop="pay_status"
                label="收支状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.pay_status === 0">正常</span>
                  <span v-else-if="scope.row.pay_status === 1">已取消</span>
                  <span v-else-if="scope.row.pay_status === 2">已退款</span>
                  <span v-else>异常</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="pay_mode_id"
                label="付款方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.pay_mode_id === 0">现金</span>

                </template>
              </el-table-column>
              <el-table-column
                prop="pay_amount"
                label="收支金额">
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="address"-->
                <!--label="币种">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="biz_date"
                label="营业日期">
              </el-table-column>
              <el-table-column
                prop="gen_time"
                width="150"
                label="支付时间">
              </el-table-column>
              <el-table-column
                prop="check_status"
                label="审核状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.check_status === 0">未审核</span>
                  <span v-else>已审核</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="check_user.real_name"
                label="审核人">
              </el-table-column>
              <el-table-column
                width="150"
                prop="check_time"
                label="审核时间">
              </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           @current-change="handleCurrentChange"
                           :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="POS" name="second">POS</el-tab-pane>
        <el-tab-pane label="支付宝" name="third">支付宝</el-tab-pane>
        <el-tab-pane label="微信" name="routing">微信</el-tab-pane>
        <el-tab-pane label="AR" name="brew">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="detail_all"
              size="mini"
              :header-cell-style="{background:'#68819EFF',color:'white',}"
              height="600"
              style="width: 100%;">
              <el-table-column
                prop="date"
                label="账户种类">
              </el-table-column>
              <el-table-column
                prop="name"
                width="110"
                label="对应业务类型">
              </el-table-column>
              <el-table-column
                prop="address"
                label="业务主体">
              </el-table-column>
              <el-table-column
                prop="address"
                label="账户状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="营业日期">
              </el-table-column>
              <el-table-column
                prop="address"
                label="业务时间">
              </el-table-column>
              <el-table-column
                prop="address"
                label="对应模块">
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否团队">
              </el-table-column>
              <el-table-column
                prop="address"
                label="出账部门">
              </el-table-column>
              <el-table-column
                prop="address"
                label="冲转平帐">
              </el-table-column>
              <el-table-column
                prop="address"
                label="对应市场">
              </el-table-column>
              <el-table-column
                prop="address"
                label="总消费">
              </el-table-column>
              <el-table-column
                prop="address"
                label="支付款">
              </el-table-column>
              <el-table-column
                prop="address"
                label="余额">
              </el-table-column>
              <el-table-column
                prop="address"
                label="总开票">
              </el-table-column>
              <el-table-column
                prop="address"
                label="早餐">
              </el-table-column>
              <el-table-column
                prop="address"
                label="摘要">
              </el-table-column>
              <el-table-column
                prop="address"
                fixed="right"
                width="150"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" >删除</el-button>
                  <el-button size="small" >修改</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           @current-change="handleCurrentChange"
                           :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="预授权" name="payment ">预授权</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cash",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          //表头的选择--收支
          account_data:[
            {
              value:'in',
              text:'收'
            },
            {
              value:'out',
              text:'支'
            }
          ],
          //表头的选择对应账户类型
          at_data:[
            {
              value:0,
              text:'正常'
            },
            {
              value:1,
              text:'AR账户'
            },
          ],
          //分页
          total:5,
          pagesize:10,
          /*
          * 筛选条件
          * */
          biz_start:'',//筛选条件起始时间
          closing_date:'',//筛选条件营业日期止
          register:'',//筛选条件收银点
          //消费清单
          activeName2: 'first',
          register_list:[],//收银点列表
          branch_data:'',//部门id
          detail_all:[],//所有收支
          tabvelue:'',//选中的tab项


        }
      },
      props:['branch_id'],
      watch:{
        //  父级传过来的部门id
        branch_id:function (newData,oldData) {
          this.branch_data=newData
          console.log(newData);
          this.register='',
          this.cash_register();//收银点列表
        }
      },
      created:function () {
        let that = this;
        that.detail_list();//获取所有收支
      },
      methods: {
        //消费清单的table
        handleClick(tab, event) {
          console.log(tab, event);
          let that = this;
          that.tabvelue = tab.index;
          that.detail_list();
        },
        //表头的事件
        filterHandler(value, row, column) {
          console.log(value, row, column);

          const property = column['property'];
          return row[property] === value;
        },
        /*
        * 封装获取收银点
        * */
        cash_register(){
          let that=this
          that.$axios({
            url: ""+that.api+"/v1/finance/cash_register/info_list",
            method: "post",
            data:{
               dept_id:that.branch_id,
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }

          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.register_list=res.data.data.list;
                // if(that.register_list !=''){
                //   that.register=that.register_list[0].desc;
                // }else {
                //   that.register=''
                // }

              }
              else{
                console.log(res.data.message);
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },
         //收银点选择以后的筛选
        cashier(value){
          console.log(value);
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_detail/info_list",
            method: "post",
            data:{
              // pay_mode_id:that.tabvelue,
              cashier:value
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.detail_all=res.data.data.list;


              }
              else{
                console.log(res.data.message);
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //营业日期起的筛选
        date_click(value){
          console.log(value);
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_detail/info_list",
            method: "post",
            data:{
              // pay_mode_id:that.tabvelue,
              begin_time:that.biz_start,

            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.detail_all=res.data.data.list;
              }
              else{
                console.log(res.data.message);
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //营业日期止的筛选
        closing_click(value){
          console.log(value);
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_detail/info_list",
            method: "post",
            data:{
              // pay_mode_id:that.tabvelue,
              end_time:that.closing_date
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.detail_all=res.data.data.list;
              }
              else{
                console.log(res.data.message);
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },


        /*
        * 封装获取所有收支
        * */
        detail_list(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_detail/info_list",
            method: "post",
            data:{
              pay_mode_id:that.tabvelue
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.detail_all=res.data.data.list;


              }
              else{
                console.log(res.data.message);
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/common/module/info_list",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
      }
    }
</script>

<style lang="less" scoped>
  .cash{
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;

    /*overflow: hidden;*/
    overflow: scroll;
    .title{
      margin-top: 23px;
      min-width:1200px ;
      li{
        display: inline-block;
        margin-left: 10px;
        button{
          width:80px;
          height:30px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .shopping{
      margin-top: 20px;

      .shopping_title{
        li{
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
  }
</style>
<style>
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
    /*z-index: 0;*/
  /*}*/
  /*.el-table__column-filter-trigger i {*/
    /*color: white;*/
    /*font-size: 16px;*/
  /*}*/
</style>
