<template>
  <div class="product">
    <div class="title">
      <h3 style="padding: 10px;display: inline-block">订单</h3>
      <div style="float: right;margin-right: 50px">
        <span>OTA平台：</span>
        <el-select @focus="getOtaList" @change="getData" v-model="ota_value" placeholder="请选择" size="mini">
          <el-option value="" label="全部">全部</el-option>
          <el-option
            v-for="item in ota_list"
            :key="item.id"
            :label="item.descript"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="status" style="margin-top: 10px">
      <el-table
        :data="all_list"
        size="mini"
        height="620"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;"
      >
        <el-table-column type="index" fixed="left" width="50" label="序号"></el-table-column>
        <el-table-column prop="from_name" label="团队名"></el-table-column>
        <el-table-column label="是否联房" :key="Math.random()">
          <template slot-scope="scope">
            <span>{{scope.row.link_id == false ? '否' : '是'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rsv_person_name" label="预定人" :key="Math.random()"></el-table-column>
        <el-table-column prop="telephone_master" label="联系电话" :key="Math.random()"></el-table-column>
        <el-table-column sortable prop="arr_time" label="入住时间" width="140px"></el-table-column>
        <el-table-column prop="leave_time" label="离店时间" width="140px"></el-table-column>
        <el-table-column prop="rate_code" label="房价码"></el-table-column>
        <el-table-column prop="code_market_desc" label="市场码"></el-table-column>
        <el-table-column prop="code_src_desc" label="来源码"></el-table-column>
        <el-table-column label="房价">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="bottom">
              <div slot="content">
                <ul
                  style="display: inline-block"
                  v-for="(item,index) of scope.row.room_price_dict"
                  :key="index"
                >
                  <li style="text-align: center;margin-right: 5px;margin-top: 5px">
                    <div>{{item.price_date}}</div>
                    <div style="color: rgb(243, 86, 93)">{{item.price + '元'}}</div>
                  </li>
                </ul>
              </div>
              <span style="color: #f3565d">{{scope.row.room_price + '元'}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="account.balance" label="余额"></el-table-column>
        <el-table-column prop="account.usable_pre_authorized" label="信用"></el-table-column>
        <el-table-column prop="create_user_name" label="销售员"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toThird(scope.row)">转入PMS</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        :page-size="pagination.pageSize"
        @current-change="currentChange"
        @size-change="sizeChange"
        :current-page="pagination.pageNumber"
        :page-sizes="pagination.pageSizes"
        :total="pagination.totalRows"
        :layout="pagination.layout"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  data() {
    return {
      ota_list: [],
      row_id: "",
      errorTypeList: [
        {
          error_type_id: 1,
          name: "没设房价码"
        },
        {
          error_type_id: 2,
          name: " ota产品没映射到本家房型"
        },
        {
          error_type_id: 3,
          name: "其它"
        }
      ],
      flag_addorupdate: false,
      title_desc: "更新",
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      labelPosition: "left",
      dataParam: {
        ota_company_id: "",
        error_type_id: "",
        error_msg: ""
      },
      dialogVisible: false,
      url: this.api.api_9530_9503,
      title: "",
      //分页
      total: 10,
      pagesize: 10,
      cur_page: 1,
      all_list: [], //ota平台
      ota_value: "", //ota_value
      monitoring_list: [], //获取监控
      event_type: 4, //图像类别
      pagination: {
        totalRows: 0, //总条数
        pageSize: 15, //每页显示条数
        pageSizes: [15, 30, 45],
        pageNumber: 1,
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  created: function() {
    let that = this;
    that.getData();
    this.getOtaList();
  },
  methods: {
    /**
     * @desc 转入PMS 可能还会转入其他第三方
     */
    toThird(param){
      console.log('param',param)
      let that = this;
            // let room_no = '';
            // let lock_no = ''
            // let lock_arrary = {}
            // lock_arrary[room_no] = lock_no
            let check_guest = 
                [{
                    room_floor: 5,
                    arr_time: param.arr_time,
                    leave_time: param.leave_time,
                    room_number: '',
                    id_code: "01",
                    id_no: '',
                    name: param.rsv_person_name,
                    sex: '01',
                    telephone: param.telephone_master,
                    pic_sign: '', //人脸照片
                    street_add: 'china', //地址
                }]
            let master_base = {
                    rsv_type: '',
                    market: '',
                    channel: '',
                    room_amount: 1,
                    fix_rate: '',
                    master_lable: 0, //判断是否为全日房
                    master_type: 1, //判断是否散客入住
                    arr_time: param.arr_time,
                    leave_time: param.leave_time,
                    room_type: param.rsv_type_desc,
                    code_name: '',
                    room_number: '',
                    biz_date: param.biz_date,
                    adult_num: 2,
                    code_market_id: param.code_market,
                    code_src_id: param.code_src,
                    rate_code: param.rate_code,
                    card_no:  '',
                    order_id: param.order_no //将订单号传过去
            };
            let scopeParam = {
              room_list: [],
              lock_arrary: [],
              master_base: master_base,
              check_guest: check_guest,
              machineCode: 'SJK'
            }
            console.log('scopeParam',scopeParam)
            return
            that.$axios({
                method: 'post',
                url: that.api.api_zt + 'checkin/nobooking_checkin/',
                data: scopeParam
            }).then((res) => {
                console.info("李文龙入住接口返回===============")
                console.info(JSON.stringify(res));
                if (res.data.message === 'success') {
                    that.regist_id = res.data.regist_id;
                    sessionStorage.setItem('regist_id', that.regist_id);
                    //进行中台入账
                    this.zt_pay_by_charges()
                } else {
                    instance('入住失败，请联系工作人员')
                    //进行mis系统的记录失败，办理退款的相关业务
                    
                    //进行解锁操作
                    this.unlock_room_error();
                }
            }).catch((err) => {
                console.error(err);
            })
    },
    /**
     * @remark 订单列表
     */
    getData() {
      console.log('ota_value',this.ota_value)
      let that = this;
      let url
      this.ota_value ? 
      url = that.api.api_newPrice_9107 + `/v1/ordering/reserve_base_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&code_src=${this.ota_value}`
      : url = that.api.api_newPrice_9107 + `/v1/ordering/reserve_base_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}`
      that.$axios({
        url: url,
        method: "get"
      }).then(res => {
          //console.log(res.data.data.total_count);
          if (res.data.message === "success") {
            that.all_list = res.data.data.results;
            that.pagination.totalRows = res.data.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取公司数据
    getOtaList() {
      let that = this;
      let url = that.api.api_code_9103 + "/v1/" + `system/settings/get_code_base_sys_list/?parent_code=src_code&code_category=OTA`;
      that.$axios
        .get(url)
        .then(res => {
          if (res.data.message == "success") {
            that.ota_list = res.data.data.results;
          } else {
            that.message.error("获取数据失败，请重试");
          }
        })
        .catch(error => {});
    },
    //分页跳转
    currentChange(val) {
      // 改变页的时候调用一次
      this.pagination.pageNumber = val;
      this.getData();
    },
    //下拉框页数改变的时候调用
    sizeChange(val) {
      // 改变每页显示条数的时候调用一次
      this.pagination.pageSize = val;
      this.getData();
    }
  }
};
</script>

<style scoped lang="less">
.product {
  width: 100%;
  .title {
    margin: 10px 0;
  }
  .status {
    width: 97%;
  }
}
</style>

<style scoped>
@import "../../assets/styles/topDialog.less";
</style>