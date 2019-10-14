<template>
  <!--账务-->
  <div class="warp-main">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" class="warp-tab">
      <el-tab-pane label="已结账" name="first">
        <div class="main-top">
          <label>入住时间：</label>
          <el-date-picker
            v-model="value_live_in"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>离店时间：</label>
          <el-date-picker
            v-model="value_leave"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>结账营业日期：</label>
          <el-date-picker
            v-model="value_account"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>姓名：</label>
          <input style="width: 70px" v-model="name"/>
          <input placeholder="手机号" v-model="phone"/>
          <input placeholder="房间号" style="width: 50px" v-model="room_num"/>
          <input placeholder="团队名称" style="width: 60px" v-model="team_name"/>
          <button @click="close_account_search">查询</button>
          <button>打印</button>
          <button>导出Excel</button>
        </div>
        <div>
        </div>
        <div class="main-table">
          <el-table
            :data="tableDatacloseaccount"
            stripe
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            style="width: 100%">
            <el-table-column
              prop="master_base_id.order_no"
              fixed
              width="200px"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="create_user.real_name"
              width="160px"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="create_user.create_time"
              width="170px"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="account_type"
              width="100px"
              label="账单类型">
              <template slot-scope="scope">
                <span v-if="scope.row.account_type === 0">普通</span>
                <span v-else>AR</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="100px"
              label="客人姓名">
              <template slot-scope="scope">
                <span v-for="col in scope.row.master_guests">{{col.name}}、</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="master_base_id.team_name"
              width="100px"
              label="团队名称">
            </el-table-column>
            <el-table-column
              prop="master_base_id.arr_time"
              label="到达时间"
              width="170px">
            </el-table-column>
            <el-table-column
              prop="master_base_id.leave_time"
              width="170px"
              label="离店时间">
            </el-table-column>
            <el-table-column
              prop="balance"
              width="100px"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="master_base_id.total_pay"
              width="100px"
              label="总付款">
            </el-table-column>
            <el-table-column
              prop="master_base_id.total_charge"
              width="120px"
              label="总消费">
            </el-table-column>
            <el-table-column
              prop="total_invoice"
              width="140px"
              label="已开票金额">
            </el-table-column>
            <el-table-column
              prop="before_sub_account"
              width="140px"
              label="分账前主账户">
            </el-table-column>
            <el-table-column
              prop="master_base_id.room_number"
              width="120px"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="master_base_id.room_type"
              width="120px"
              label="房间类型">
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="140px"
              label="手机号" type="expand">
              <template slot-scope="scope">
               <span>手机号:</span><span v-for="col in scope.row.master_guests">{{col.telephone}}、</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeletecloseaccount(scope.$index, scope.row,tableDatacloseaccount)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange_account_code_list"
            :current-page="currentPage"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="临客账" name="second">
        <div class="main-top">
          <label>姓名：</label>
          <input style="width: 70px" v-model="name"/>
          <label>入住时间：</label>
          <el-date-picker
            v-model="value_live_in"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <label>离店时间：</label>
          <el-date-picker
            v-model="value_leave"
            type="datetime"
            size="mini"
            prefix-icon="el-icon-date"
            style="width: 177px"
            placeholder="选择日期时间">
          </el-date-picker>
          <input placeholder="手机号" v-model="phone"/>
          <input placeholder="房间号" style="width: 50px" v-model="room_num"/>
          <input placeholder="团队名称" style="width: 60px" v-model="team_name"/>
          <button @click="extraaccount_search">查询</button>
          <button>打印</button>
          <button>导出Excel</button>
        </div>
        <div>
        </div>
        <div class="main-table">
          <el-table
            :data="tableDataextraaccount"
            stripe
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            style="width: 100%">
            <el-table-column
              prop="master_base_id.order_no"
              fixed
              width="200px"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="master_base_id.team_name"
              width="60px"
              label="团队名称">
            </el-table-column>
            <el-table-column
              prop="master_base_id.room_number"
              width="120px"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="100px"
              label="客人姓名">
              <template slot-scope="scope">
                <span v-for="col in scope.row.master_guests">{{col.name}}、</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="guestsource"
              width="70px"
              label="客源">
            </el-table-column>
            <el-table-column
              prop="roomprice"
              width="100px"
              label="房价">
            </el-table-column>
            <el-table-column
              prop="balance"
              width="100px"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="140px"
              label="手机号">
              <template slot-scope="scope">
                <span v-for="col in scope.row.master_guests">{{col.telephone}}、</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="hourroom"
              width="100px"
              label="钟点房">
            </el-table-column>
            <el-table-column
              prop="master_base_id.arr_time"
              width="170px"
              label="抵达日期">
            </el-table-column>
            <el-table-column
              prop=""
              width="140px"
              label="挂账日期">
            </el-table-column>
            <el-table-column
              prop=""
              width="70px"
              label="开票">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="create_user.real_name"
              label="接待人员">
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  style="cursor: pointer"
                  type="danger"
                  @click="handleDeleteextraaccount(scope.$index,scope.row,tableDataextraaccount)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange_extraaccount_list"
            :current-page="currentPage"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="哑房账" name="three" class="three">
        <!--<div>
          <button class="btn" @click="setMaskShow"></button>
        </div>-->
        <div class="main-top">
            <label>姓名：</label>
            <input style="width: 70px" v-model="name"/>
            <label>入住时间：</label>
            <el-date-picker
              v-model="value_live_in"
              type="datetime"
              size="mini"
              prefix-icon="el-icon-date"
              style="width: 177px"
              placeholder="选择日期时间">
            </el-date-picker>
            <button @click="dummyaccount_search">查询</button>
            <button>打印</button>
            <button>导出Excel</button>
        </div>
        <div class="main-table">
          <el-table
            ref="multipleTable"
            :data="tableDatadummyaccount"
            size="mini"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small'}"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="num"
              label="序号">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="billnum"
              label="账单编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="goodsnum"
              label="商品数量">
            </el-table-column>
            <el-table-column
              prop="price"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="paytype"
              label="支付方式">
            </el-table-column>
            <el-table-column
              prop="chargetime"
              label="记账时间">
            </el-table-column>
            <el-table-column
              prop="businetime"
              label="营业日期">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="操作人">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div></div>
      </el-tab-pane>
    </el-tabs>
    <!--遮罩层-->
    <dialog
    title="新增哑房账"
    :visible.sync="dialogVisible_dummyaccount"
    :close-on-click-modal='false'
    width="50%">
        <el-row>
          <el-col :span="6">
              <span>类别:</span><input/>
          </el-col>
          <el-col :span="6">
              <span>出品部:</span><input/>
          </el-col>
          <el-col :span="6">
              <span>商品:</span><input/>
          </el-col>
          <el-col :span="6">
              <span>结账方式:</span><input/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">

          </el-col>
        </el-row>
    </dialog>
    <div class="mask" v-show="maskShow">
        <!--内容框-->
      <div class="mask-suspen">
        <div class="mask-close">
          <label>新增哑房账</label>
          <label @click="maskShow = false" style="float: right;margin-right: 10px">X</label>
        </div>
        <div class="mask-first">
            <label>类别:</label>
            <el-select v-model="value_type" placeholder="请选择" size="mini" style="width: 12rem;margin-left: 10px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label>出品部:</label>
            <el-select v-model="value_chupin" placeholder="请选择" size="mini" style="width: 12rem;margin-left: 10px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
            <label>商品:</label>
            <input/>
            <label>结账方式:</label>
            <el-select v-model="value_account_type" placeholder="请选择" size="mini" style="width: 12rem;margin-left: 10px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
        </div>
        <div class="mask-second">
            <label>金额:</label>
            <input/>
        </div>
        <div class="mask-three">
            <label>备注:</label>
        </div>
        <div class="mask-reamrk">
          <textarea></textarea>
        </div>
        <div class="mask-fore">
          <label>已选商品</label>
          <label>注：数量点击可更改</label>
        </div>
        <div class="mask-five">
          <el-table
            :data="tableData6"
            border
            sum-text="总数"
            show-summary
            height="300px"
            size="mini"
            :header-cell-style="{background:'#68819E',color:'white'}"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="coding"
              label="编码">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="unitprice"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="count"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="moneysum"
              sortable
              label="金额">
            </el-table-column>
            <el-table-column
              prop="inventory"
              label="库存">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作">
            </el-table-column>
          </el-table>
        </div>
        <div class="mask-six">
          <button style="background: #4488E9">保存</button>
          <button @click="maskShow = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        /**
         * 查询
         */
        value_live_in:'', //入住时间
        value_leave:'',  //离店时间
        value_account:'', //结账日期
        name : '',  // 姓名
        phone : '', // 手机号
        room_num : '', // 房间号
        team_name : '', // 团队名称
        account_num : '', // 账单编号
        /**
         * 分页
         */
        currentPage: 1,//当前页码
        page_size: 10,//每页显示数量
        total: 0,//总数
        //遮罩层默认的是不显示的
        maskShow: false,
        /**
         * 新增哑房账
         */
        value_type : '',
        value_chupin : '',
        value_account_type : '',
        //下拉框的值
        url:'http://47.98.113.173',//url地址
        activeName2: 'first',
        //已结账
        tableDatacloseaccount :[],
        //临客账
        tableDataextraaccount :[],
        //哑房账
        dialogVisible_dummyaccount : false,//哑房账dialog
        tableDatadummyaccount:[
          {
            num : '123',
            billnum : '123'
          }
        ],
        //已选商品
        tableData6: [{
          id: '12987122',
          coding : '123456',
          name: '王小虎',
          moneysum: '244'
        }],
        //下拉框数据
        //下拉框的数据
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      };
    },
    created:function () {
      let that = this;
      that.get_tableDatacloseaccount();
    },
    /**
     * 方法层
     */
    methods: {
      /**
       * @get_tableDatacloseaccount  获取已结账的list数据
       */
      get_tableDatacloseaccount(){
        let that = this;
        let url = that.url+':9519/v1/finance/account/full_info_page';
        that.$axios({
          method: 'post',
          url : url,
        }).then((res)=>{
          console.info(res);
          that.total = res.data.data.total_count;
          that.tableDatacloseaccount = res.data.data.list;
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @handleCurrentChange_account_code_list  获取已结账的分页操作
       */
      handleCurrentChange_account_code_list(currentPage){
        let that = this;
        let url = that.url+':9519/v1/finance/account/full_info_page';
        that.$axios({
          method: 'post',
          url : url,
          params : {
            page_num : currentPage,
            page_size : 10,
            /*find_cond : JSON.stringify({close_flag : 'c'})*/
          }
        }).then((res)=>{
          that.tableDatacloseaccount = res.data.data.list;
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @handleDeletecloseaccount 删除已结账的数据
       */
      handleDeletecloseaccount(index, row, TableData) {
        let that = this;
        console.info(row);
        let url = that.url + ':9519/v1/finance/account/remove/'+row.id;
        that.$axios({
          method : 'post',
          url : url,
        }).then((res)=>{
          TableData.splice(index,1);
          that.get_tableDatacloseaccount();
          console.info(res);
        }).catch((err)=>{
          console.error(err);
        })
      },
      /**
       * @closeaccount_search 已结账的查询
       */
      close_account_search(){
         let that = this;
         let url = that.url + ':9519/v1/finance/account/full_info_page';
         that.$axios({
              method : 'post',
              url : url,
              data : {
                check_in_date : that.value_live_in  ? that.value_live_in : undefined,
                leave_date : that.value_leave ? that.value_leave : undefined,
                check_out_date : that.value_account ? that.value_account : undefined,
                name : that.name ? that.name : undefined,
                phone : that.phone ? that.phone : undefined,
                room_num  : that.room_num  ? that.room_num  : undefined,
                team_name : that.team_name ? that.team_name : undefined
              }
         }).then((res)=>{
            console.info(res);
            that.total = res.data.data.total_count;
            that.tableDatacloseaccount = res.data.data.list;
         }).catch((err)=>{
            console.error(err);
         })
      },
      /**
       * @extraaccount_search 临客账的查询
       */
      extraaccount_search(){
        let that = this;
        let url = that.url + ':9519/v1/finance/account/full_info_page';
        that.$axios({
          method : 'post',
          url : url,
          data : {
            check_in_date : that.value_live_in  ? that.value_live_in : undefined,
            leave_date : that.value_leave ? that.value_leave : undefined,
            check_out_date : that.value_account ? that.value_account : undefined,
            name : that.name ? that.name : undefined,
            phone : that.phone ? that.phone : undefined,
            room_num  : that.room_num  ? that.room_num  : undefined,
            team_name : that.team_name ? that.team_name : undefined
          }
        }).then((res)=>{
          console.info(res);
          that.total = res.data.data.total_count;
          that.tableDataextraaccount = res.data.data.list;
        }).catch((err)=>{
          console.error(err);
        })
      },
      /**
       * @dummyaccount_search 哑房账的查询
       */
      dummyaccount_search(){
        let that = this;
        let url = that.url + ':9519/v1/finance/account/full_info_page';
        that.$axios({
          method : 'post',
          url : url,
          data : {
            check_in_date : that.value_live_in  ? that.value_live_in : undefined,
            leave_date : that.value_leave ? that.value_leave : undefined,
            check_out_date : that.value_account ? that.value_account : undefined,
            name : that.name ? that.name : undefined,
            phone : that.phone ? that.phone : undefined,
            room_num  : that.room_num  ? that.room_num  : undefined,
            team_name : that.team_name ? that.team_name : undefined
          }
        }).then((res)=>{
          console.info(res);
        }).catch((err)=>{
          console.error(err);
        })
      },
      /**
       * @get_tableDataextraaccount  获取临客账的list数据
       */
      get_tableDataextraaccount(){
        let that = this;
        let url = that.url+':9519/v1/finance/account/info_list';
        that.$axios({
          method: 'post',
          url : url,
          /*data : {
            find_cond : JSON.stringify({ar_account_id  : null , account_type : 1})
          }*/
        }).then((res)=>{
          console.info(res);
          that.total = res.data.data.total_count;
          that.tableDataextraaccount = res.data.data.list;
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @handleCurrentChange_account_code_list  获取临客账的分页操作
       */
      handleCurrentChange_extraaccount_list(currentPage){
        let that = this;
        let url = that.url+':9519/v1/finance/account/full_info_page';
        that.$axios({
          method: 'post',
          url : url,
          data : {
            page_num : currentPage,
            page_size : 10,
            /*find_cond : JSON.stringify({close_flag : 'c'})*/
          }
        }).then((res)=>{
          console.info(res);
          that.tableDataextraaccount = res.data.data.list;
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @handleDeletecloseaccount 删除临客账的数据
       */
      handleDeleteextraaccount(index,row) {
        let that = this;
        console.info(row);
        let url = that.url + ':9519/v1/finance/account/remove/'+row.id;
        that.$axios({
          method : 'post',
          url : url,
        }).then((res)=>{
          that.tableDataextraaccount.splice(index,1);
          that.get_tableDataextraaccount();
          console.info(res);
        }).catch((err)=>{
          console.error(err);
        })
      },
      /**
       * @get_tableDataextraaccount  获取哑房账的list数据
       */
      get_tableDatadummyaccount(){
        let that = this;
        let url = that.url+'';
        that.$axios({
          method: 'post',
          url : url
        }).then((res)=>{
          console.info(res);
          that.tableDatacloseaccount = res.data;
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @handleClick tab切换
       */
      handleClick(tab, event) {
        let that = this;
        if(tab.label === '已结账'){
           that.get_tableDatacloseaccount();
        }else if(tab.label === '临客账'){
           that.get_tableDataextraaccount();
        }else{
           that.get_tableDatadummyaccount();
        }
        console.log(tab, event);
      },

      //控制遮罩层的函数
      setMaskShow(){
        this.maskShow = !this.maskShow;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
      //计算列表的总值
      /*getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }*/
    }
  }
</script>
<style lang="less" scoped>
  //遮罩层样式
  .mask{
      width: 100%;
      height: 100%;
      position: fixed;
      //这里的颜色是直接可以设置背景透明的，为什么不用opacity关键字的原因是这个关键字会导致一个子继承父透明度的问题
      background: rgba(7, 13, 32, 0.6);
      top: 0;
      left: 0;
      z-index: 998;
    //悬浮框样式
    .mask-suspen {
      background: #F6FAFF;
      width: 90%;
      height: 90%;
      position: fixed;
      z-index: 999;
      top: 5%;
      left: 5%;
      //关闭新增哑房账的样式
      .mask-close {
        background: #FFFFFF;
        height: 40px;
        width: 100%;
        background: #303A41;
        color: #ffffff;
        line-height: 40px;
        label {
          margin-left: 10px;
        }
      }
      //出品部类别商品样式
      .mask-first{
        height: 60px;
        line-height: 60px;
        label{
          margin-left: 10px;
          margin-top: 10px;
        }
        input{
          margin-left: 10px;
          width: 200px;
          height: 27px;
          line-height: 30px;
          border:1px solid rgba(204,204,204,1);
          border-radius: 4px;
        }
      }
      //金额样式
      .mask-second{
        .mask-first;
      }
      //备注样式
      .mask-three{
        height: 50px;
        line-height: 50px;
        label{
          margin-left: 10px;
          margin-top: 10px;
        }
      }
      //备注框样式
      .mask-reamrk{
         height: 70px;
         line-height: 90px;
         margin-left: 10px;
         textarea{
           width: 99%;
           height: 70px;
         }
      }
      //已选商品样式
      .mask-fore{
          height: 20px;
          margin-top: 10px;
          label{
            margin-left: 10px;
          }
          label:last-child{
            float: right;
            margin-right: 10px;
            color: #68819E;
          }
      }
      //table样式  这里是做的有合计的操作，不需要将样式调节到举例左边的10px
      .mask-five{
            width: 100%;
      }
      //button样式
      .mask-six{
        margin-right: 10px;
        button{
          margin-top: 10px;
          margin-left: 10px;
          width: 150px;
          height: 50px;
          border: none;
          background: #68819E;
          float: right;
          color: #ffffff;
          border-radius: 4px;
        }
      }
    }
  }
  /**
   客人资料css样式
   */
  //导航栏的样式
  .all-label-input{
    label{
      margin-left: 10px;
      font-size: x-small;
      color: #333333;
    }
    input{
      margin-top: 7.5px;
      width: 110px;
      height: 25px;
      border: RGB(220 223 230);
      border-radius: 2px;
    }
    button{
      width: 65px;
      height: 30px;
      color: #fff;
      background: #4488E9;
      border: none;
      margin-left: 10px;
      border-radius: 4px;
    }
  }
  .warp-main{
    width: calc(100% - 58px);
    .dialog{
      .el-row{
        .el-col{
          span{
            display: inline-block;
            width: 40px;
          }
          input{
            width: 40%;
          }
        }
      }
    }
     /*蒙层样式*/
    .popContainer{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.2);
    }
    .add-info-card{
      position: absolute;
      width: 80%;
      margin: 5% 10%;
      background:rgba(246,250,255,1);
    }
    .add-header{
      width: 100%;
      height: 40px;
      border-radius: 2px;
      background:rgba(48,58,65,1);
    }
    .add-info-card div:first-child span{
      font-size: 15px;
      color: #FFFFFF;
      font-family: PingFangSC-Regular;
      line-height: 40px;
      margin-left: 20px;
    }
    .add-info-card div:first-child span:last-child{
      float: right;
      margin-right: 1.5rem;
    }
    .add-info-card div:nth-child(even) span{
      margin: 14px 0px 14px 19px;
      color: #333333;
      font-weight: bold;
    }
    .add-info-card div:nth-child(5){
      margin-top: 5px;
      margin-left: 14px;
    }
    .add-info-card div:last-child button{
      width:70px;
      height:30px;
      border: none;
      margin-top: 14px;
      background:rgba(104,129,158,1);
      border-radius:4px;
    }
    .last-btn{
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .last-btn button{
      color: #ffffff;
      margin-left: 5rem;
    }

    .warp-tab{
      margin-left: 0.5%;
      width: 99%;
      .main-top{
        width: 100%;
        height: 40px;
        margin-top: 10px;
        background: #F7F7F7;
        .all-label-input
      }
      //第三部分样式
      .three{
        .btn{
          margin-top: 10px;
          width:80px;
          height:30px;
          border-radius:4px;
          border: none;
          color: #FFFEFE;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          line-height: 30px;
          background-image: url("../../../assets/images/pms/accountsReceivable/addinfo.png");
        }
        .all-label-input
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
