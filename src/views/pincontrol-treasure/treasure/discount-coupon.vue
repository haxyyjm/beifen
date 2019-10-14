<template>
  <div class="page-all">
    <el-container>
      <el-main>
        <el-col :span="11">
          <div class="grid-content">
            <ul>
              <li><span>代码:</span><input v-model="param.code"/><span>名称:</span><input v-model="param.name"/>
              <li><span>面值(折扣):</span><input type="number" v-model="param.present_value"/><span>成本价:</span><input v-model="param.cost_price"/>
              <li><span>售价:</span><input v-model="param.sale_price"/><span>不适用日期:</span><input v-model="param.un_suit_data"/></li>
              <li><span>适用范围:</span>
                <el-select v-model="suit_scope" placeholder="请选择" size="mini" style="margin-left: 6px;width: 8vw">
                  <el-option v-for="item in options_suit_scope" :key="item.label" :label="item.label" :value="item.code">
                  </el-option>
                </el-select><span>提前预定(天):</span><input type="number" v-model="param.need_adv_rsv_days"/></li>
              <li><span>适用房型:</span><input v-model="param.suit_room_type"/><span>适用房价码:</span><input v-model="param.suit_rate_code"/></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content">
            <ul>
              <li>
                <el-checkbox v-model="is_halt" style="margin-left: 0.6rem;">是否停用</el-checkbox>
                <el-checkbox v-model="is_allow_that_day_use" style="margin-left: 1.5rem;">当天可用</el-checkbox>
                <el-checkbox v-model="is_only_first_use" style="margin-left: 1.5rem;">仅一个房晚有效</el-checkbox>
              </li>
              <li><span>适用酒店:</span><input v-model="param.suit_hotel_code"  value="皇冠晶品酒店" style="font-size: 0.8vw"/></li>
              <li><span>适用控制:</span>
                <el-select v-model="use_ctl" placeholder="请选择" size="mini" style="margin-left: 6px">
                  <el-option v-for="item in options_control" :key="item.label" :label="item.label" :value="item.code">
                  </el-option>
                </el-select>
              <li style="display:flex;align-items:center;"><span>描述:</span><textarea>{{param.description}}</textarea></li>
              <li class="show-btn-style">
                <button v-show="save_flag" @click="add_coupon_info">保存</button>
                <button v-show="reload_flag" @click="flush">重置</button>
                <button v-show="del_flag" @click="del_data">删除</button>
                <button v-show="empty_flag" @click="judge_flag">{{empty_add}}</button>
                <button v-show="sale_flag" @click="dialogVisible = true; sale_coupon_fun()">销售</button>
                <button v-show="update_flag"  @click="update_coupon_info">更新</button>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <ul class="grid-content-ul">
              <li><label>创建人:</label><label class="label-style">{{param.create_user}}</label></li>
              <li><label>创建时间:</label><label>{{param.create_datetime}}</label></li>
              <li><label>修改人:</label><label>{{param.modify_user}}</label></li>
              <li><label>修改时间:</label><label>{{param.modify_datetime}}</label></li>
            </ul>
          </div>
        </el-col>
      </el-main>
    </el-container>
    <el-card>
      <el-header>
        <li>
          <img src="@/assets/images/pincontrol-treasure/treasure/cash-coupon/Diamond.png" />折扣券列表:
        </li>
      </el-header>
      <el-table v-loading="loading" @row-click="show_Detials_Info" :data="tableData_deduction_coupon" size="mini" :header-cell-style="{background:'#68819E',color:'#FFFFFF'}" style="width: 100%">
        <el-table-column prop="" label="行号" fixed type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="code" label="CODE">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="present_value" label="面值（折扣）" width="110">
        </el-table-column>
        <el-table-column prop="sale_number" label="已销售数量">
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.is_halt === 1">有效</span>
            <span v-else>失效</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="销售优惠券"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-press-escape = "false"
      :close-on-click-modal = "false"
      :before-close="handleClose">
      <ul>
        <li><span>优惠券代码:</span><input disabled v-model="param.code"/></li>
        <li><span>销售方式:</span>
          <el-select v-model="param_sale.sale_type" placeholder="请选择" size="mini" style="margin-left: 6px;width: 8vw">
            <el-option v-for="item in options_sale_type" :key="item.label" :label="item.label" :value="item.code">
            </el-option>
          </el-select>
          <span>数量:</span><input type="number" style="margin-left: -2vw" v-model="param_sale.numbers"/></li>
        <li><span>备注:</span><input v-model="param_sale.remark"/></li>
        <li>
          <span>生效时间:</span>
          <el-date-picker
            v-model="param_sale.valid_from_date"
            size="mini"
            type="datetime"
            style="margin-left: 0.4vw"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
          <span>失效时间:</span>
          <el-date-picker
            v-model="param_sale.valid_to_date"
            size="mini"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </li>
      </ul>
      <ul>
        <li><span style="font-size: 1vw;font-weight: bold;">销售对象</span></li>
        <li>
          <el-radio v-model="member" label="1" @change="change_member">会员</el-radio>
          <el-radio v-model="member" label="0" @change="change_member">非会员</el-radio>
        </li>
        <li v-show="member_flag"><span>卡号:</span><input v-model="param_sale.sale_card_no" @click="dialogVisible_card_base = true; get_card_base_list()"/></li>
        <li v-show="nmember_flag"><span>邮箱:</span><input v-model="param_sale.sale_email"/><span>手机号码:</span><input style="margin-left: -1.5vw" type="number" maxlength="11" v-model="param_sale.sale_mobile"/></li>
      </ul>
      <span slot="footer" class="dialog-footer">
       <button @click="dialogVisible = false">取 消</button>
       <button type="primary" @click="dialogVisible = false;sale_coupon()">确 定</button>
      </span>
    </el-dialog>
    <!--销售人员的dialog-->
    <el-dialog
      title="会员列表"
      :visible.sync="dialogVisible_card_base"
      width="60%">
      <ul>
        <li><span></span><input/><button>查询</button></li>
      </ul>
      <el-table
        :data="tableData_sales"
        @row-click="set_sale_card_no"
        size="mini"
        height="300"
        style="width: 100%">
        <el-table-column
          fixed
          prop="card_no"
          label="卡号">
        </el-table-column>
        <el-table-column
          prop="card_name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="id_no"
          label="证件号码">
        </el-table-column>
        <el-table-column
          label="积分余额">
          <template slot-scope="scope">
            {{scope.row.point_pay - scope.row.point_charge}}
          </template>
        </el-table-column>
        <el-table-column
          label="可用余额">
          <template slot-scope="scope">
            {{scope.row.money_pay - scope.row.money_charge}}
          </template>
        </el-table-column>
        <el-table-column
          prop="money_freeze"
          label="冻结金额">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="card_type"
          label="会员计划">
        </el-table-column>
        <el-table-column
          prop="card_level"
          label="卡等级">
        </el-table-column>
        <el-table-column
          prop="date_end"
          label="有效期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="卡状态">
        </el-table-column>
        <el-table-column
          prop="iss_hotel"
          label="发行酒店">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange_sale_card"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "cash-coupon",
    data() {
      return {
        //分页
        currentPage: 1,
        pagesize: 10,
        total: 0,
        //销售对象是不是会员
        member : '1',
        member_flag : true,
        nmember_flag : false,
        tableData_sales : [],
        //生效时间
        valid_from_date: '',
        //失效时间
        valid_to_date : '',
        //是否停用 当日 仅一个房晚
        is_halt: false,
        is_allow_that_day_use: false,
        is_only_first_use: true,
        //测试数据是否加载结束
        loading : true,
        //控制dialog的隐藏与显示
        dialogVisible : false,
        //控制会员列表的显示与隐藏
        dialogVisible_card_base : false,
        //抵扣券的表格
        tableData_deduction_coupon: [],
        //url
        url : 'http://47.98.113.173:9102/v1/',
        //券类型
        coupon_type : 'RF',
        //数据对象
        param : {},
        //销售的数据
        param_sale : {},
        //控制button的显示与隐藏
        add_flag : true,
        save_flag : true,
        reload_flag : true,
        sale_flag : false,
        del_flag : false,
        stop_flag : false,
        empty_flag : false,
        update_flag : false,
        //销售方式
        options_sale_type : [{
          code : 'PT',
          label : '微信会员'
        }
        ],
        //适用控制的options
        use_ctl: '',
        options_control : [{
          code : 'OO',
          label : '同一天一个订单只能允许使用一张'
        }, {
          code : 'OM',
          label : '一个订单只允许使用一张'
        } ],
        //适用范围限制options
        suit_scope : '',
        options_suit_scope : [{
          code : 'online',
          label : '线上:网站,微信'
        }, {
          code : 'front',
          label : '线下:PMS前台'
        }],
        //擦操作一条数据使用的id
        coupon_id : '',
        //新增按钮和清空按钮
        empty_add : '清空',
      }
    },
    created : function () {
      let that = this;
      that._search_deduction();
    },
    methods : {
      /**
       * @set_sale_card_no 选择某一个会员
       */
      set_sale_card_no(row){
        let that = this;
        console.info(row);
        that.dialogVisible_card_base = false;
        that.param_sale.sale_card_no = row.card_no; //卡号
        that.param_sale.sale_card_id = row.id,      //卡id
          that.param_sale.sale_card_name = row.card_name;  //卡名称
      },
      /**
       * @handleCurrentChange_sale_card 会员列表的分页  点击每一页的时候的函数
       */
      handleCurrentChange_sale_card : function(currentPage){
        let that = this;
        let url = 'http://member.crowncrystalhotel.com/v1/customer/member/get_card_base_list/';
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method : 'get',
          url : url,
          params:{
            page : currentPage,
            page_size : 10
          }
        }).then(function (res) {
          that.tableData_sales = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @get_card_base_list 获取会员列表的接口
       * @param no
       */
      get_card_base_list(){
        let that = this;
        let url = 'http://member.crowncrystalhotel.com/v1/customer/member/get_card_base_list/';
        that.$axios({
          method : 'get',
          url : url,
        }).then((res)=>{
          that.total = res.data.data.count;
          that.tableData_sales = res.data.data.results;
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @change_member
       */
      change_member(){
        let that = this;
        console.info(that.member)
        if(that.member == 1){
          that.member_flag = true;
          that.nmember_flag = false;
        }else{
          that.member_flag = false;
          that.nmember_flag = true;
        }
      },
      /**
       *@flush 刷新新增数据
       */
      flush(){
        let that = this;
        that.empty_add = '新增';
        that.param = {
          code: '',
          cost_price: 0.00,
          create_datetime: '',
          create_user: '',
          description: '',
          id: 1,
          is_only_self: 0,
          is_wechat: 0,
          last_sale_id: 0,
          logo: '',
          modify_datetime: '',
          modify_user: '',
          name: '',
          need_adv_rsv_days: 0,
          pictures: '',
          present_value: 0.00,
          sale_price: 0.00,
          suit_cashier_point: '',
          suit_hotel_code: '',
          suit_rate_code: '',
          suit_room_type: '',
          un_suit_data: '',
          variable_proportion: 0.00,
          sale_number:0,
        }
      },
      /**
       * @sale_coupon_fun 销售卡券的函数
       * @param no
       */
      sale_coupon_fun(){
        let that = this;
        that.param_sale = {
          numbers : '',  //数量
          valid_from_date : '',  // 生效时间
          valid_to_date : '',    //失效时间
          present_value : '',
          sale_price : '',       //销售价格
          sale_date : '',        //销售日期
          sale_card_id : '',     //卡id
          sale_card_no : '',     //卡号
          sale_card_name : '',   //卡名称
          sale_type : '',        //销售类型  固定值 PT
          sale_mobile : '',      //手机号
          sale_email : '',       //邮箱
          remark : '' //备注
        }
      },
      /**
       * @sale_coupon 销售卡券
       * @param no
       */
      sale_coupon(){
        /**
         *
         * @param format 格式化当前时间
         * @returns {*}
         */
        Date.prototype.format = function (format) {
          var args = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds()
          };
          if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
          }
          return format;
        };
        let that = this;
        let url = that.url+'customer/coupon/sale_coupon/';
        that.$axios({
          method : 'post',
          url : url,
          data : {
            coupon_code : that.param.code,
            numbers : that.param_sale.numbers,
            valid_from_date : that.param_sale.valid_from_date,
            valid_to_date : that.param_sale.valid_to_date,
            present_value : that.param_sale.present_value,
            sale_price : that.param_sale.sale_price,
            sale_date : new Date().format("yyyy-MM-dd hh:mm:ss"),
            sale_card_id : parseInt(that.param_sale.sale_card_id),
            sale_card_no : that.param_sale.sale_card_no,
            sale_card_name : that.param_sale.sale_card_name,
            sale_type : that.param_sale.sale_type,
            sale_email : that.param_sale.sale_email,
            sale_mobile : that.param_sale.sale_mobile,
            remark : that.param_sale.remark,
          }
        }).then((res)=>{
          console.info(res);
          that.hintInfo('success','销售成功！');
        }).catch((err)=>{
          that.hintInfo('warning',err.data.message);
        })
      },
      /**
       * @indexMethod 自定义行号
       * @param no
       */
      indexMethod(index){
        return index+1;
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
       * @_search_deduction 查询所有的抵扣券的列表
       */
      _search_deduction(){
        let that = this;
        that.$axios({
          method : 'get',
          url : that.url+'customer/coupon/get_coupon_base_list/?coupon_type='+that.coupon_type+''
        }).then(function (res) {
          console.info(res);
          if(res.data.data.results){
            that.loading = false;
            that.tableData_deduction_coupon = res.data.data.results;
          }else{
            that.loading = true;
          }
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @show_Detials_Info 显示详细信息
       * @param row  当前行的信息
       * @param column 当前的行信息 不是数据
       * @param event  当前行数据的事件
       */
      show_Detials_Info(row, column, event){
        let that = this;
        that.del_flag = true;
        that.stop_flag =true;
        that.sale_flag = true;
        that.update_flag = true;
        that.save_flag = false;
        that.add_flag = false;
        that.empty_flag = true;
        that.reload_flag = false;
        that.empty_add = '清空',
          that.coupon_id = row.id;
        that.param.code = row.code;
        that.param.name = row.name;
        that.param.logo = row.logo;
        that.param.suit_hotel_code = row.suit_hotel_code;
        that.param.pictures = row.pictures;
        that.param.present_value = row.present_value;
        that.param.cost_price = row.cost_price;
        that.param.sale_price = row.sale_price;
        that.param.un_suit_data = row.un_suit_data;
        that.suit_scope = row.suit_scope;
        that.param.need_adv_rsv_days = row.need_adv_rsv_days;
        that.param.suit_room_type = row.suit_room_type;
        that.param.suit_rate_code = row.suit_rate_code;
        that.is_halt = row.is_halt === 1;
        that.is_allow_that_day_use = row.is_allow_that_day_use === 1;
        that.is_only_first_use = row.is_only_first_use === 1;
        that.use_ctl = row.use_ctl;
        that.param.description = row.description;
        that.param.create_user = row.create_user;
        that.param.create_datetime = row.create_datetime;
        that.param.modify_user = row.modify_user;
        that.param.modify_datetime = row.modify_datetime;
      },
      /**
       * @del_data 删除一个数据
       * @param no
       */
      del_data(){
        let that = this;
        let url = ''+that.url+'customer/coupon/remove_coupon_base/'+that.coupon_id+'/';
        that.$axios({
          method: 'post',
          url : url
        }).then((res)=>{
          that.hintInfo("success","删除成功！");
          console.info(res);
        }).catch((err)=>{
          console.info(err);
        })
      },

      /**
       * @handleClose 关闭之前的走的函数
       * @param no
       */
      handleClose : function () {
        let that = this;
        that.dialogVisible = false;
        /*let that = this;
        this.$confirm('您准备关闭该销售, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
           that.dialogVisible = false;
        }).catch(() => {
        });*/
      },
      /**
       * @add_coupon_info 新增一条信息
       * @param no
       */
      add_coupon_info(){
        let that = this;
        console.info(that.is_halt ? 1 : 0);
        //let url =that.url+'customer/coupon/add_coupon_base/';
        if(that.param.code && that.param.name && that.param.present_value){
          that.$axios({
            method : 'post',
            url : '',
            data : {
              code : that.param.code,
              name : that.param.name,
              logo : that.param.logo,
              pictures : that.param.pictures,
              description : that.param.description,
              coupon_type : 'RF',
              present_value : that.param.present_value,
              variable_proportion : that.param.variable_proportion,
              suit_hotel_code : that.param.suit_hotel_code,
              suit_cashier_point : that.param.suit_cashier_point,
              last_sale_id : that.param.last_sale_id,
              is_only_self : that.param.is_only_self,
              is_wechat : 0,
              cost_price  : that.param.cost_price,
              sale_price: that.param.sale_price,
              un_suit_data  : that.param.un_suit_data,
              suit_scope : that.suit_scope,
              need_adv_rsv_days : that.param.need_adv_rsv_days,
              suit_room_type : that.param.suit_room_type,
              suit_rate_code: that.param.suit_rate_code,
              is_halt : that.is_halt ? 1 : 0,
              is_allow_that_day_use: that.is_allow_that_day_use ? 1 : 0,
              is_only_first_use : that.is_only_first_use ? 1 : 0,
              use_ctl : that.use_ctl,
            }
          }).then((res)=>{
            if(res.data.message === "success"){
              that._search_deduction();
              that.hintInfo('success','新增成功！');
            }else{
              console.info(res);
            }
          }).catch((err)=>{
            that.hintInfo('warning','新增失败！');
            console.info(err);
          })
        }else{
          that.hintInfo('warning','参数不足！');
        }
      },
      /**
       * @update_coupon_info 更新数据
       * @param no
       */
      update_coupon_info(){
        let that = this;
        let url =that.url+'customer/coupon/update_coupon_base/'+that.coupon_id+'/';
        if(that.param.code && that.param.name && that.param.present_value){
          that.$axios({
            method : 'post',
            url : url,
            data : {
              code : that.param.code,
              name : that.param.name,
              logo : that.param.logo,
              pictures : that.param.pictures,
              description : that.param.description,
              coupon_type : 'RF',
              present_value : that.param.present_value,
              variable_proportion : that.param.variable_proportion,
              suit_hotel_code : that.param.suit_hotel_code,
              suit_cashier_point : that.param.suit_cashier_point,
              last_sale_id : that.param.last_sale_id,
              is_only_self : that.param.is_only_self,
              is_wechat : 0,
              cost_price  : that.param.cost_price,
              sale_price: that.param.sale_price,
              un_suit_data  : that.param.un_suit_data,
              suit_scope : that.suit_scope,
              need_adv_rsv_days : that.param.need_adv_rsv_days,
              suit_room_type : that.param.suit_room_type,
              suit_rate_code: that.param.suit_rate_code,
              is_halt : that.is_halt ? 1 : 0,
              is_allow_that_day_use: that.is_allow_that_day_use ? 1 : 0,
              is_only_first_use : that.is_only_first_use ? 1 : 0,
              use_ctl : that.use_ctl,
            }
          }).then((res)=>{
            if(res.data.message === "success"){
              that._search_deduction();
              that.hintInfo('success','更新成功！');
            }else{
              console.info(res);
            }
          }).catch((err)=>{
            that.hintInfo('warning','更新失败！');
            console.info(err);
          })
        }else{
          that.hintInfo('warning','参数不足！');
        }
      },
      /**
       * @judge_flag 判断是清空还是新增
       * @param no
       */
      judge_flag(){
        let that = this;
        console.info(that.empty_add);
        that.update_flag = false;
        that.sale_flag = false;
        that.empty_add === '清空' ? that.flush() : that.add_coupon_info();
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
    font-size: 1vw;;
  }
  .ul-style{
    ul {
      li {
        padding-top: 0.8vw;
        span {
          display: inline-block;
          width: 6rem;
          text-align: left;
          margin-left: 10px;
          font-size: 0.8vw;
        }
        input {
          height: 1.8vw;
          width: 8vw;
          margin-left: 0.7vw;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 0.7vw;
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
        .el-radio{
          margin-left: 0.8vw;
        }
      }
    }
  }
  /**
   页面总的样式
   */
  .page-all {
    width: 80vw;
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
        height: 15vw;
        min-height: 36px;
        background: #F7F7F7;
        .ul-style;
        .grid-content-ul {
          li {
            padding-top: 20px;
            label {
              width: 40px;
              margin-left: 10px;
              font-size: 0.8vw;
            }
          }
        }
        .show-btn-style{
          button{
            font-size: 0.8vw;
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
      .el-table {
        margin-top: -20px;
      }
    }
    .el-dialog{
      button{
        .common-button;
      }
      .ul-style;
    }
  }
</style>


