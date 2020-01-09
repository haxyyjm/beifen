<template>
<!--主页-->
  <div class="font-five" :style="{ height: availHeight, overflow: 'auto' }">
    <!--上部分-->
    <div style="padding: 0 1%;height: 300px">
      <!--入住单-->
      <link-house-dialog :show.sync= linkHouseFornVisible :parentInfoParam='linInfoParam'></link-house-dialog>
       <!-- 预定单转入住单 -->
      <preview-to-enterDialog :show.sync= previewToEnterVisible :parentInfoParam='preEnterInfoParam'></preview-to-enterDialog>
      <div style="width: 28%;float: left;height: 300px">
        <div style="height: 50px;line-height: 50px">
          <!--<i class="el-icon-document" style="font-size: 16px"></i>-->
          <button class="font-light_future" @click="dialogVisible_future = true;get_time_room_status()">实时房情</button>
        </div>
        <div class="font-w"
             style="height: 50px;border:1px solid #ebeef5;line-height: 50px;padding: 0 8px;font-size: 16px">
          <div style="width: 33.3%;float: left">RevPar：<span style="color: green">{{RevPar}}</span></div>
          <div style="width: 33.3%;float: left">入住率：<span style="color: orange">{{check_percent}}</span></div>
          <div style="width: 33.3%;float: left">预计收益：<span style="color: green">{{predict_earn}}</span></div>
        </div>
        <!--<div style="height: 50px;line-height: 50px">
          <i class="el-icon-document" style="font-size: 16px"></i>
          <span class="font-light">未来房情</span>
          <el-table
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}"
            :data="tableData_future"
            style="width: 100%">
            <template v-for="(col,index) in base_title_future">
              <el-table-column :prop=col.prop :label=col.label>
              </el-table-column>
            </template>
          </el-table>
        </div>-->
        <!--未来房情的日历-->
        <div>
          <!--还没有写-->
        </div>
      </div>

      <!--上右边部分-->
      <div style="width: 71.6%;float: right;height: 300px">
        <div style="height: 50px;width: 85%">
          <!--<div style="width:20%;float: left;height: 100%">
            <div style="height: 50px;line-height: 50px">
              <i class="el-icon-document" style="font-size: 16px"></i>
              <span class="font-light">房价及房屋：</span>
            </div>
          </div>-->
          <div style="width:30%;float: left;height: 50px;line-height: 50px">
            <div class="demo-input-suffix">
              <!--<div style="width: 25%;float: left;text-align: center">
                <span class="font-four">来店时间:</span>
              </div>-->
              <div style="width: 74%;float: left">
                <el-date-picker
                  style="width: 100%"
                  v-model="startTime"
                  type="date"
                  size="mini"
                  @change="set_time"
                  placeholder="选择开始时间">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div style="width:30%;float: left;height: 50px;line-height: 50px">
            <div class="demo-input-suffix">
              <!--<div style="width: 25%;float: left;text-align: center">
                <span class="font-four">来店时间:</span>
              </div>-->
              <div style="width: 74%;float: left">
                <el-select v-model="rate_code" size="mini" @change="get_room_type_rate_code_info('code')" @focus="get_room_code()" placeholder="BAR">
                  <el-option
                    v-for="item in rate_codes"
                    :key="item.code"
                    :label="item.code"
                    :value="item.code">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>

        <div style="border: 1px solid #ebeef5">
          <template>
            <el-table
              size="mini"
              border
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#CCCCCCFF',textAlign:'center',color: '#222222FF'}"
              :data="common_table_info"
              height="250"
              style="width: 100%">
              <el-table-column
                prop="room_type"
                label="可预定数/当日价"
                width="150">
              </el-table-column>
              <el-table-column  v-for="(col,index) in base_title" :prop=col.prop :label=col.label :key="index">
                <template slot-scope="scope">
                  <span style="color: #0FB135FF">{{scope.row[scope.column.property].split('/')[0] + '间'}}</span>
                  {{'/'}} 
                  <span style="color: #D20C0CFF">{{'￥' + scope.row[scope.column.property].split('/')[1]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <!--下部分-->
    <div style="padding: 20px 1%;height: auto;width: 100%" >
      <!--这是上面的切换部分tabs 数据是写的for循环取出来的-->
      <el-tabs type="card"  v-model="activeName" tab-position="top" @tab-click="handleClick">
        <el-tab-pane v-for='(lab,index) in labelData'  :key="index"
                     :label="lab.name + (('[' ) +lab.num+(']'))">
          <!--每一个tabs下的表及数据-->
          <div style="border: 1px solid #ebeef5">
            <template>
              <el-table  @row-dblclick="rowClick"  border :default-sort = "{prop: 'arr_time', order: 'descending'}" :cell-style="{textAlign:'center'}" :data="tableData_orderlist" style="width: 100%" size="mini" height="350px" :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}" stripe>
                <el-table-column type="index" width="50" label="序号">
                </el-table-column>
                <!-- <el-table-column prop="reserve_guest" label="预订人" :key="Math.random()" width="160">
                  <template slot-scope="scope">
                    <span v-for="(col,index) in scope.row.reserve_guest">{{col.name}}、</span>
                  </template>
                </el-table-column> -->
                <el-table-column prop="master_guest_list" label="在住人" :key="Math.random()" width="160" v-if="!rsc_peo_flag">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.master_guest_list" :key="index">
                      {{item.name + '、'}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="from_name" label="团队名">
                </el-table-column>
                <el-table-column  label="是否联房" :key="Math.random()" v-if="room_type_flag">
                    <template slot-scope="scope">
                      <span>{{scope.row.link_id == false ? '否' : '是'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="room_type" label="房型" :key="Math.random()" v-if="room_type_flag">
                </el-table-column>
                <el-table-column prop="room_number" label="在住房间号" :key="Math.random()" v-if="room_type_flag">
                </el-table-column>
                <el-table-column prop="master_guest_list" width="140" label="联系电话" :key="Math.random()" v-if="!rsc_peo_flag">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.master_guest_list" :key="index">
                      <span v-if="item.telephone"> 
                        {{item.telephone + '、'}}
                      </span>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="rsv_person_name" label="预定人" :key="Math.random()" v-if="rsc_peo_flag">
                </el-table-column>
                <el-table-column prop="telephone_master"  label="联系电话" :key="Math.random()" v-if="rsc_peo_flag">
                </el-table-column>
                <el-table-column sortable prop="arr_time" label="入住时间" width="140px">
                </el-table-column>
                <el-table-column prop="leave_time" label="离店时间" width="140px">
                </el-table-column>
                <el-table-column prop="rate_code" label="房价码">
                </el-table-column>
                <el-table-column prop="code_market_desc" label="市场码">
                </el-table-column>
                <el-table-column prop="code_src_desc" label="来源码">
                </el-table-column>
                <el-table-column  label="房价">
                  <template slot-scope="scope">
                    <el-tooltip effect="light" placement="bottom">
                      <div slot="content">
                        <ul style="display: inline-block" v-for="(item,index) of scope.row.room_price_dict" :key="index">
                          <li  style="text-align: center;margin-right: 5px;margin-top: 5px">
                            <div>{{item.price_date}}</div>
                            <div style="color: rgb(243, 86, 93)">{{item.price + '元'}}</div>
                          </li>
                        </ul>
                      </div>
                      <span style="color: #f3565d"> 
                        {{scope.row.room_price + '元'}}
                      </span>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="account.balance" label="余额">
                </el-table-column>
                <el-table-column prop="account.usable_pre_authorized" label="信用">
                </el-table-column>
                <el-table-column prop="create_user_name" label="销售员">
                </el-table-column>
                <!--<el-table-column prop="master_status_lable" label="单状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.master_status_lable === 0">在住</span>
                    <span v-else-if="scope.row.master_status_lable === 1">正常离店</span>
                    <span v-else-if="scope.row.master_status_lable === 2">欠费离店</span>
                    <span v-else-if="scope.row.master_status_lable === 3">部分离店</span>
                    <span v-else-if="scope.row.master_status_lable === -1">异常单</span>
                    <span v-else>未知</span>
                  </template>
                </el-table-column>-->
                <!-- <el-table-column prop="remark" label="备注">
                </el-table-column> -->
                <!--<el-table-column prop="operation" label="" width="250px" fixed="right">
                  <template slot-scope="scope">
                    &lt;!&ndash; <el-button @click="handleClick(tableData2[scope.$index].id)" size="small">入住</el-button> &ndash;&gt;
                    &lt;!&ndash; <el-button @click="handleClick(tableData2[scope.$index].id)" size="small">编辑</el-button> &ndash;&gt;
                    &lt;!&ndash;<el-button type="danger" @click="deleteClick(scope.$index, scope.row,tableData_orderlist)" size="small">删除</el-button>&ndash;&gt;
                  </template>
                </el-table-column>-->
              </el-table>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination @current-change="currentChange" 
        :current-page="currentPage"
        :page-size="page_size"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--底部页面-->
    <!--<div class="main-bottom-top">
      <i class="el-icon-document" style="font-size: 16px;margin-left: 10px"></i>
      <label style="margin-left: 5px;color: #cccccc">排房列表</label>
      <label style="margin-left: 10px">当前合计：</label><label></label>
      <label>订金：</label><label></label>
    </div>-->
    <el-dialog title="实时房情" :visible.sync="dialogVisible_future" top="1vh" :close-on-click-modal='false' width="60%">
      <el-row :gutter="20">
        <el-col :span="8"><div>
          <el-row style="height: 300px">
             <h3>汇总情况</h3><br/>
            <el-table
              size="mini"
              :data="room_count"
              border
              max-height="230"
              style="width: 100%">
              <el-table-column property="name" label="描述"></el-table-column>
              <el-table-column property="num" label="数目"></el-table-column>
            </el-table>
          </el-row><br/>
          <el-row style="height: 300px">
             <h3>来源房情</h3><br/>
            <el-table
              size="mini"
              :data="src_return"
              border
              max-height="230"
              style="width: 100%">
              <el-table-column property="src_decript" label="来源"></el-table-column>
              <el-table-column property="room_number" label="房数"></el-table-column>
              <el-table-column property="room_price" label="房价"></el-table-column>
            </el-table>
          </el-row>
        </div></el-col>
        <el-col :span="8"><div>
          <el-row style="height: 300px">
            <h3>客房中心</h3><br/>
            <el-table
              size="mini"
              :data="room_status"
              border
              max-height="230"
              style="width: 100%">
              <el-table-column property="name" label="描述"></el-table-column>
              <el-table-column property="num" label="在住"></el-table-column>
            </el-table>
          </el-row><br/>
          <el-row style="height: 340px">
              <h3>市场房情</h3><br/>
              <el-table
                size="mini"
                :data="market_return"
                border
                style="width: 100%">
                <el-table-column property="market_decript" label="市场"></el-table-column>
                <el-table-column property="room_number" label="房数"></el-table-column>
                <el-table-column property="room_price" label="房价"></el-table-column>
              </el-table>
             <!-- <span>本夜占用=当前在住-预计离店+预计到达</span><br/>
              <span>可卖房=总房数-维修房+本夜占用</span>-->
          </el-row>
            <!--<el-row :gutter="20">
               <el-col :span="12">
                 <el-date-picker
                   v-model="value1"
                   type="date"
                   width="120"
                   size="mini"
                   placeholder="选择日期">
                 </el-date-picker>
               </el-col>
            </el-row>-->
          <br/>
        </div>
        </el-col>

        <el-col :span="8"><div>
          <el-row style="height: 300px">
            <h3>业务流转</h3><br/>
            <el-table
              size="mini"
              :data="room_live"
              border
              max-height="230"
              style="width: 100%">
              <el-table-column property="name" label="描述"></el-table-column>
              <el-table-column property="num" label="数目"></el-table-column>
            </el-table>
          </el-row><br/>
          <el-row style="height: 300px">
            <h3>预计收益</h3><br/>
            <el-table
              size="mini"
              :data="room_price"
              border
              max-height="230"
              style="width: 100%">
              <el-table-column property="name" label="描述"></el-table-column>
              <el-table-column property="price" label="值"></el-table-column>
            </el-table>
          </el-row>
        </div></el-col>
        <el-row :gutter="20">
          <el-col :span="12">
          <!--<button style="height: 27px;width: 80px;color: #FFFFFF;background: #4488E9;border: none;border-radius: 3px">打印</button>-->
          </el-col>
        </el-row>
      </el-row>

    </el-dialog>
    <!--最底部-->
    <!--<div style="margin-top: 10px;margin-left: 10px;margin-bottom: 10px">
      <label style="font-size: small">房型：</label>
      <el-select v-model="value" placeholder="请选择" size="mini" style="width: 10rem;margin-left: 5px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <label style="font-size: small">房间号：</label>
      <el-select v-model="value" placeholder="请选择" size="mini" style="width: 10rem;margin-left: 5px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <button class="main-btn">快速分房</button>
      <button class="main-btn">保存</button>
      <button class="main-btn">批量制卡</button>
    </div>-->
  </div>
</template>

<script>
  import linkHouseDialog from '../houseStatus/linkHouseDialog'
  import previewToEnterDialog from '../houseStatus/previewToEnterDialog'
  import moment from 'moment'
    export default {
      data() {
        return {
          reserve_guest:{
            hotelInfo: {},
            liveCount: 0,//可选数
            room_number: null,//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: null,
            // descript_en: null,
            
            // list_order: 1,
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '',
            nation: null,
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_na: '',
            pic_photo: null,
            pic_sign: null,
            remark: '',
            is_anonymo: false,
            weixin: '',
            mobile: null,
            email: '',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            reserve_base_id: '',
          },
          preBillParam: {
            reserve_guest: [{
            liveCount: 0,//可选数
            room_number: null,//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: null,
            // descript_en: null,
            
            // list_order: 1,
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '',
            nation: null,
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_na: '',
            pic_photo: null,
            pic_sign: null,
            remark: '',
            is_anonymo: false,
            weixin: '',
            mobile: null,
            email: '',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            reserve_base_id: '',
            }]
          },//prop值
          preEnterInfoParam: {},
          linInfoParam: {},
          linkHouseFornVisible: false,//联房
          previewToEnterVisible: false,
          activeName: '',
          isCurrent: '1',//判断标志
          availHeight: '',
          interval : '',//定时器
          url_codebase : this.api.api_price_9101,//获取codebase的接口
          rate_codes : [],//拿到的是房价码数组
          rate_code : 'BAR',//拿到的是房价码
          //所有下拉框的数据，写的时候记得不一样的下拉框数据分开定义变量
          value1 : '',//今日预测的日期
          options: [],
          tab_pane_flag : '0',//用来判断当前的分页是哪一种
          value:'',
          startTime: '', //该时间是用来重置当前的起始时间的
          flagTime : '',//结束时间
          room_count : [],//汇总情况
          room_live : [],//业务流转
          room_status : [],//客房中心
          tableData_forecast : [],//本日预测
          market_return : [],//市场房情
          src_return : [],//来源房情
          room_price : [],//预计收益
          RevPar : '',//RevPar
          check_percent : '',//入住率
          predict_earn : '',//预计收益
          //结束时间
          endTime:'',
          dialogVisible_future : false,//实时房情dialog
          base_title:[],//动态修改表头
          base_title_future : [],//动态修改未来房情的表头
          common_table_info : [],//可预订的房间的表展示
          tableData_future : [],//未来房情的表格
          //底部表格的数据
          tableData_orderlist : [],
          room_type_flag: true, //房间类型为显示的  这时候是在住单 应离未离 异常单的情况
          room_type_array_flag: false, //房间类型为应到未到 所有预定的情况
          rsc_peo_flag: false,
          // url: this.api.api_newBill_9204,
          url: this.api.api_newPrice_9107,
          /**
           * 分页
           */
          currentPage: 1, //当前页码
          page_size: 8, //每页显示数量
          total: 0, //总数
          //右上表格数据
          tableData: [],
          //tabs数据
          labelData:[{
            id:0,
            name:"在住单",
            num:"0"
          },{
            id:4,
            name:"异常单",
            num:"0"
          },{
            id:5,
            name:"团队",
            num:"0"
          },{
            id:6,
            name:"钟点房",
            num:"0"
          },
          {
            id:2,
            name:"应离未离",
            num:"0"
          },
          {
            id:1,
            name:"应到未到",
            num:"0"
          },
          {
            id:3,
            name:"所有预订",
            num:"0"
          },{
            id:7,
            name:"今日将到",
            num:"0"
          }],
          //房间号输入框的定义
          input1:"",
        }
      },
      components: {
        'link-house-dialog': linkHouseDialog,
        'preview-to-enterDialog': previewToEnterDialog,
      },
      created(){
        //第一次进来时tabs下的表格数据,默认是第一个tabs下的表格数据（自己随意造的数据）
        let that = this;
        /**
         * @search_live 进行第一次的无条件查询
         */
        that.search_live();
        /**
         * @change_days 进行未来七天的展示
         */
        that.change_days();
        /**
         * @get_roomtype_rate_code_info 未来七天的可预订数
         */
        that.get_room_type_rate_code_info('flag_time');
        that.get_time_room_status();

      },
      mounted (){
        this.availHeight = (screen.availHeight -220)  +'px';
      },
      methods:{
        /**
         * @desc 当点击不通过tabel的时候跳转的页面
         */
        rowClick(row){
          console.log('row',row)
          console.log('activeName',this.activeName)
          if(this.activeName == 0 || this.activeName == 4){
            this.getEnterInfoByRoom(row.order_no)
          }else if(this.activeName == 5 || this.activeName == 6 || this.activeName == 7){
            this.getPreInfoByRoom(row.order_no)
          }
        },
        //===>联房列表打开
        getEnterInfoByRoom(param){
          let scopeParams = {
            // room_number: param
            order_no: param
          }
          let that = this
          // let url = `http://192.168.2.224:9005/v2/checkin/all_master_info/`
          // let url = that.api.api_bill_9202 + `/v2/checkin/all_master_info/`
          let url = that.api.api_newBill_9204 + `/v2/checkin/all_master_info/`
          that.$axios({
            method : 'get',
              url : url,
              params: scopeParams
          }).then(res=>{
            if(res.data.message === 'success'){
              that.linInfoParam = res.data.data.results[0]
              if(that.linInfoParam != undefined){
                  that.linkHouseFornVisible = true //联房列表打开
              }else{
                that.$message.warning('获取后台数据失败!')
              }
            }else{
              that.$message.error('获取入住单详情失败!')
            }
          }).catch(error=>{
            console.log(error)
          })
        },
        getPreInfoByRoom(param){
          console.log('param1111111111111111',param)
          let scopeParams = {
            order_no: param,
            search_type: "2" //根据预订单号查询预订单=== value值为2
          }
          let that = this
          let url = that.api.api_newBill_9204 + '/v2/' + `booking/get_reserve_method/`
          // let url = that.api.api_bill_9202 + '/v2/' + `booking/get_order_reserve_info/`
          that.$axios.post(url,scopeParams).then(res=>{
            if(res.data.message === 'success'){
              that.preInfoParam = res.data.data.results[0]
              //处理数据然后传给子组件
              that.preBillParam.reserve_rate = that.preInfoParam.reserve_rate
              if(that.preInfoParam.reserve_guest.length != 0){
                // that.preBillParam.reserve_guest = []
                //关键一步，登记有身份证号要清空<===================mark
                for(var item of  that.preInfoParam.reserve_guest){
                  item.id_no = ''
                }
                that.preBillParam.reserve_guest = [].concat(that.preInfoParam.reserve_guest)  
              }else{
                that.preBillParam.reserve_guest = []
                that.preBillParam.reserve_guest.push(that.reserve_guest)
              }
              this.preBillParam.reserve_base = that.preInfoParam.reserve_base
              that.handleChildParam(that.preBillParam)
              console.log('that.preBillParamthat.preBillParam',that.preBillParam)
              that.preEnterInfoParam = _.cloneDeep(that.preBillParam) //预定转入住详情
              that.previewToEnterVisible = true
            }else{
              that.$message.error('获取预订单详情失败!')
            }
          }).catch(error=>{
            console.log(error)
          })
        },
        handleChildParam(param){
          for(var item of param.reserve_rate){
            item.can_live_num = ''
            item.room_type_value = ''
            item.dynamic_roomNumber = item.room_number != '' ? item.room_number.split(',') : []
            item.roomCount = ''
            item.roomPrice = ''
          }
          // for(var item of param.reserve_guest){
          //   item.liveCount = 0
          // }
        },
        currentChange(val) {
          // 改变页的时候调用一次
          this.currentPage = val;
          console.log('val',val)
          console.log('this.currentPage',this.currentPage)
          console.log('this.tab_pane_flag',this.tab_pane_flag)
          this.isCurrent = '1'
          this.handleClick(this.tab_pane_flag,this.isCurrent);
        },
        //下拉框页数改变的时候调用===>此时不需要
        sizeChange(val) {
          // 改变每页显示条数的时候调用一次
          this.page_size = val;
          this.handleClick(this.tab_pane_flag);
        },
        /**
         * @ get_time_room_status 实时房情
         */
        get_time_room_status(){
          let that = this;
          let url =  that.api.api_price_9101 + '/v1/room/room_status/real_time_situation/';
          that.$axios({
               method : 'get',
               url : url
          }).then((res)=>{
               //console.info(res);
               that.room_count = res.data.data.room_count;
               that.room_live = res.data.data.room_live;
               that.room_status = res.data.data.room_status;
               that.room_price = res.data.data.room_price;
               //that.RevPar = res.data.data.room_price;
               for(let i of res.data.data.room_price){
                  if(i.name === 'RevPar'){
                    if(i.price){
                      that.RevPar = i.price.toFixed(2);
                    }else{
                      that.RevPar = 0;
                    }
                  }else if(i.name === '预计收入'){
                      that.predict_earn = i.price;
                  }
               }
               for(let i of res.data.data.room_count){
                 var count;
                 var check_in_num;
                 if(i.name === '房间数'){
                     count = i.num;
                 }else if(i.name === '入住房间数'){
                     check_in_num = i.num
                 }
                 if(count>=0 && check_in_num>=0){
                     that.check_percent = count >= 0 ? parseFloat(((check_in_num/count).toFixed(2) * 100).toPrecision(12))+"%" : 0; //(check_in_num/count).toFixed(2);
                     //parseFloat(((check_in_num/count).toFixed(2) * 100).toPrecision(12))+"%";
                 }else{
                   //nothing...
                 }
               }
               that.src_return = res.data.data.expected_return.src_return;
               that.market_return = res.data.data.expected_return.market_return;
          }).catch((err)=>{
               console.error(err);
          });
        },
        /**
         * @get_room_code 获取房价码
         */
        get_room_code(){
          let that = this;
          let url = that.url_codebase+ '/v1/room/rate_code/get_rate_code_list/';
          that.$axios({
               method : 'get',
               url : url,
          }).then((res)=>{
               console.info(res);
               that.rate_codes = res.data.data.results;
          }).catch((err)=>{
               console.error(err);
          })
        },
        /**
         *  @get_roomtype_rate_code_info 获取未来七天的房型的所有房价码信息
         *  @rate_code BAR 因为这里的房价码是不确定的，没有供选择的信息，所以目前是挂牌价
         */
        get_room_type_rate_code_info(flag){
          let that = this;
            //console.info(that.rate_code);
            //console.info(that.startTime);
            /**
             *  成功以后将表格的数据渲染出来
             *  拿到的是未来七天的房价码
             */
            that.$axios({
              method : 'post',
              url : that.api.api_price_9101 + '/v1/room/rate_code/get_rate_code/',
              data : {
                rate_code : that.rate_code,
                begin_date : flag === 'flag_time' ? that.getTime() : that.cut_time_seven(),
                end_date : that.getTime_seven(),
                //room_type_list : rooms_list,
                code_type : 1
              }
            }).then((res)=>{
              //console.info(that.startTime);
              let common_table_info = [];
              /**
               * 这里需要将拿到的对象转为数组，进行赋值，这样才不会类型错误
               */
              for(let i in res.data.data.price){
                common_table_info.push(res.data.data.price[i]);
              }
              that.common_table_info = common_table_info;
            }).catch((err)=>{
               console.error(err);
            })
        },
        /**
         * @cut_time_seven 重置当前选择的时间
         */
        cut_time_seven(){
          let that = this;
          let value_day = '';
          that.startTime ? value_day = that.startTime : value_day = new Date();
          let target_day_milliseconds = value_day.getTime() - 1000 * 60 * 60 * 24 * 7;
          value_day.setTime(target_day_milliseconds);
          let year = value_day.getFullYear(); //获取年
          let month = value_day.getMonth()+1;//获取月
          let day = value_day.getDate(); //获取当日
          let time = year+"-"+month+"-"+day; //
          console.info(that.startTime);
          return time;
        },
          /**
          * @getTime 获取当前日期
          */
        getTime(){
          let that = this;
          let date = '';
          that.startTime ? date = that.startTime : date = new Date();
          let year = date.getFullYear(); //获取年
          let month = date.getMonth()+1;//获取月
          let day = date.getDate(); //获取当日
          let time = year+"-"+month+"-"+day; //组合时间
          return time;
        },
        /**
         * @getTime_seven 获取当前日期的往后七天  这里拿到的是当前日期的第七天的日期
         */
        getTime_seven(){
          let that = this;
          let value_day = '';
          that.startTime ? value_day = that.startTime : value_day = new Date();
          let target_day_milliseconds = value_day.getTime() + 1000 * 60 * 60 * 24 * 7;
          value_day.setTime(target_day_milliseconds);
          let year = value_day.getFullYear(); //获取年
          let month = value_day.getMonth()+1;//获取月
          let day = value_day.getDate(); //获取当日
          let time = year+"-"+month+"-"+day; //
          //console.info(that.startTime);
          return time;
        },
        /**
         * @set_time 重置用户选择的时间
         */
        set_time(){
          let that = this;
          //console.info(that.startTime);
          that.change_days();
          /**
           * 如果用户更改了时间，直接给后端发送当前用户选择的时间和往后七天的房价码
           */
          that.get_room_type_rate_code_info('flag_time');
        },
        /**
         * @change_days 改变table的表头数量
         */
        change_days(){
          let that = this;
          that.base_title = [];
          that.base_title_future = [];
          let Max_length = 7;
          for(let i = 0;i<Max_length;i++){
            //that.value_date =  that.value_dateVal;
            /**
             * 右侧的未来七天的信息
             */
            let param = {
              label : that.getDay(i),
              prop : that.getDay(i)
            };
            /**
             * 左侧的未来房情的信息
             * @type {{label: *, prop: *}}
             */
            let params = {
              label : /*that.get_date(i)*/that.getWeek(that.getDay_week(i).toString()),
              prop : that.getWeek(that.getDay_week(i).toString())
            };
            that.base_title.push(param);
            that.base_title_future.push(params);
          }
          //console.info(that.base_title);
        },
        /**
         * @getDay 获取日期
         * @doHandleMonth
         * @getWeek 获取当前星期
         */
        getDay(day){
          let that = this;
          let curr_data = new Date();
          let target_day_milliseconds = '';
          that.startTime ? target_day_milliseconds= that.startTime.getTime() + 1000*60*60*24*day :  target_day_milliseconds= curr_data.getTime() + 1000*60*60*24*day;//判断时间是不是存在的
          curr_data.setTime(target_day_milliseconds); //将时间戳转为正常的时间格式
          let tYear = curr_data.getFullYear();
          let tMonth = curr_data.getMonth();
          let tDate = curr_data.getDate();
          tMonth = that.doHandleMonth(tMonth + 1);
          tDate = that.doHandleMonth(tDate);
          return tYear+"-"+tMonth+"-"+tDate;
        },
        /**
         * @getDay_week 获取日期 这里重写一次是为了不给用户选择日期的时候更新星期
         *              如果需要根据用户的选择的时间来更新星期的话，那么是需要将该函数删除的
         * @doHandleMonth
         * @getWeek 获取当前星期
         */
        getDay_week(day){
          let that = this;
          let curr_data = new Date();
          let target_day_milliseconds= curr_data.getTime() + 1000*60*60*24*day;
          curr_data.setTime(target_day_milliseconds); //将时间戳转为正常的时间格式
          let tYear = curr_data.getFullYear();
          let tMonth = curr_data.getMonth();
          let tDate = curr_data.getDate();
          tMonth = that.doHandleMonth(tMonth + 1);
          tDate = that.doHandleMonth(tDate);
          return tYear+"-"+tMonth+"-"+tDate;
        },
        /**
         *  @get_date  未来七天的房情信息，这里是不可以直接根据用户选择的日期进行一个调整的，所以是直接拿到的未来七天的信息
         *  @type {{ day ：*}}
         */
        get_date(day){
          let that = this;
          let curr_data = new Date();
          let target_day_milliseconds= curr_data.getTime() + 1000*60*60*24*day;//判断时间是不是存在的
          curr_data.setTime(target_day_milliseconds); //将时间戳转为正常的时间格式
          let tYear = curr_data.getFullYear();
          let tMonth = curr_data.getMonth();
          let tDate = curr_data.getDate();
          tMonth = that.doHandleMonth(tMonth + 1);
          tDate = that.doHandleMonth(tDate);
          return tYear+"-"+tMonth+"-"+tDate;
        },
        /**
         *  @getWeek 获取星期
         */
        getWeek(dateString){
          let weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
          return weekArray[new Date(dateString).getDay()];
        },
        doHandleMonth(month){
          let m = month;
          if(month.toString().length === 1){
            m = "0" + month;
          }
          return m;
        },
        /**
         * 点击事件的tab
         * @param tab
         */
        handleClick(tab,isCurrent) {
          let that = this;
          // that.tab_pane_flag = tab.index;
          typeof tab == 'string' ? that.tab_pane_flag : that.tab_pane_flag = tab.index;
          let indexNumber = typeof tab == 'string' ? tab :  tab.index
          console.log(indexNumber,'indexNumber');
          this.activeName = indexNumber //进一步赋值判断双击的时候显示的详情
          that.tableData_orderlist = [] //置空防止数据污染
          if(typeof isCurrent != 'string'){
            that.page_size = 8;
            that.currentPage = 1;
          }else{
            that.page_size = that.page_size;
            that.currentPage = that.currentPage;
          }
          console.log('这里')
          if(indexNumber=== '0') {
            console.log('进入')
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_live();
          }else if(indexNumber == '1'){
            /**
             * 异常单
            */
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            // that.search_abnormal_list(); 暂时错误不调取
          } else if(indexNumber == '2'){
            /**
             * 团队
            */
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_team_list();
          } else if(indexNumber == '3'){
            /**
             * 钟点房
            */
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_hour_list(); 
          } 
          //应离未离
          else if(indexNumber === '4') {
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_should_leave();
          } 
          //应到未到
          else if(indexNumber === '5') {
            that.rsc_peo_flag = true;
            that.room_type_flag = false;
            that.room_type_array_flag = true;
            that.search_arrive_to();
          }
          //所有预定 
          else if(indexNumber === '6') {
            that.rsc_peo_flag = true;
            that.room_type_flag = false;
            that.room_type_array_flag = true;
            that.search_all_res();
          //今日将到
          }else{
            that.rsc_peo_flag = true;
            that.room_type_flag = false;
            that.room_type_array_flag = true;
            that.search_todata_arrive();
          }
        },
        /**
         * @search_live  在住单查询
         */
        search_live() {
          let that = this;
          let url = that.url + `/v1/ordering/master_base_list/?page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @desc 获取数量
         */
        getNum(param){
          this.labelData[0].num = param.master_base_count
          this.labelData[1].num = param.abnormal_count
          this.labelData[2].num = param.team_count
          this.labelData[3].num = param.hour_count
          this.labelData[4].num = param.should_leave_count
          this.labelData[5].num = param.should_not_arrive
          this.labelData[6].num = param.reserve_base_count
          this.labelData[7].num = param.today_reserve_count
        },
        /**
         * @search_arrive_to  应到未到
         */
        search_arrive_to() {
          let that = this;
          let nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
          let url = that.url + `/v1/ordering/reserve_base_list/?arr_time__lte=${nowTime}&page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_should_leave  应离未离
         */
        search_should_leave() {
          let that = this;
          let nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
          console.log('nowTime',nowTime)
          let url = that.url + `/v1/ordering/master_base_list/?leave_time__lt=${nowTime}&page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @desc 今日将到
         */
        search_todata_arrive(){
          let that = this;
          let today = moment().format('YYYY-MM-DD')
          let nextday = moment().add(1, 'days').format('YYYY-MM-DD')
          let time_arrage = today + ',' + nextday
          let url = that.url + `/v1/ordering/reserve_base_list/?arr_time__range=${time_arrage}&page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_all_res  所有预定
         */
        search_all_res() {
          let that = this;
          let url = that.url + `/v1/ordering/reserve_base_list/?page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * 钟点房
         */
        search_hour_list(){
          let that = this;
          let url = that.url + `/v1/ordering/master_base_list/?master_type=1&page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * 团队或协议单位
         */
        search_team_list(){
          let that = this;
          let url = that.url + `/v1/ordering/master_base_list/?from_type__in=0,1&page_size=${that.page_size}&page=${that.currentPage}`;
          that.$axios({
            method: 'get',
            url: url,
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.getNum(res.data.data.count_dict)
            // that.labelData[0].num = that.total ? that.total : 0;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_abnormal_list  异常单
         */
        search_abnormal_list() {
          let that = this;
          let url = that.url + '/v2/checkin/exception_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [], // 入住单类别
                room_type: [], //房型
                code_market_id: [], //市场码
                code_src_id: [] //来源码
              }
            }
          }).then((res) => {
            console.info(res);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.labelData[4].num = that.total ? that.total : 0;
          }).catch((err) => {
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
          let url;
          console.info(that.tab_pane_flag);
          if(that.tab_pane_flag === '0' || that.tab_pane_flag === '2' || that.tab_pane_flag === '4') {
            /**
             * 删除的是入住单
             * @type {string}
             */
            url = that.url + '/v1/checkin/remove_master_all/';
          } else {
            /**
             * 删除的是在住单
             * @type {string}
             */
            url = that.url + '/v1/booking/remove_reserve/';
          }
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
        /**
         * 更改样式的函数
         */
        tableRowClassName(row,rowindex){
          if (rowindex%2 === 0) {
            return 'warning-row';
          } else{
            return 'success-row';
          }
        },
      },
      /**
       * @dialogVisible_future 监听dialog实时房情的变化
       */
      watch : {
        dialogVisible_future(val){
          console.log(val);
          if(val===true){
            this.interval = setInterval(this.get_time_room_status,3000);
          }else {
            clearInterval(this.interval);
          }
        },
      }
    }
</script>

<style scoped>
.main-btn{
   margin-left: 10px;
   width: 80px;
   height: 27px;
   background: #4488E9;
   border: none;
   line-height: 27px;
   color: #FFFFFF;
   font-size: small;
  border-radius: 4px;
 }
.font-light{
  font-size: 14px;
  color: #ACACAC;
}
.font-light_future{
  width: 80px;
  height: 27px;
  background: #4488E9;
  color: #ffffff;
  border: none;
  border-radius: 3px;
}
.font-five{
  width:calc(100% - 58px);
  font-size: 15px;
}
.font-four{
  font-size: 14px;
}
.font-w{
  font-weight: bold;
}
.el-table .bg-row {
  background: #EEEEEE;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
