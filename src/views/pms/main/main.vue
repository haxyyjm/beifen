<template>
<!--主页-->
  <div class="font-five">
    <!--上部分-->
    <div style="padding: 0 1%;height: 300px">
      <div style="width: 28%;float: left;height: 300px">
        <div style="height: 50px;line-height: 50px">
          <!--<i class="el-icon-document" style="font-size: 16px"></i>-->
          <button class="font-light_future" @click="dialogVisible_future = true">实时房情</button>
        </div>
        <div class="font-w"
             style="height: 50px;border:1px solid #ebeef5;line-height: 50px;padding: 0 8px;font-size: 16px">
          <div style="width: 33.3%;float: left">PevPar:dadd</div>
          <div style="width: 33.3%;float: left">入住率:20%</div>
          <div style="width: 33.3%;float: left">钟点房数:233</div>
        </div>
        <div style="height: 50px;line-height: 50px">
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
        </div>
        <!--未来房情的日历-->
        <div>
          <!--还没有写-->
        </div>
      </div>

      <!--上右边部分-->
      <div style="width: 71.6%;float: right;height: 300px">
        <div style="height: 50px;height: 50px;width: 85%">
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
        </div>

        <div style="border: 1px solid #ebeef5">
          <template>
            <el-table
              size="mini"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#F4F4F4',textAlign:'center'}"
              :data="common_table_info"
              height="250"
              style="width: 100%;">
              <el-table-column
                prop="room_type"
                label="可预定数/当日价"
                width="150">
              </el-table-column>
              <template v-for="(col,index) in base_title">
                <el-table-column :prop=col.prop :label=col.label>
                </el-table-column>
              </template>
            </el-table>
          </template>

        </div>

      </div>
    </div>
    <!--下部分-->
    <div style="padding: 20px 1%;height: auto;width: 100%" >
      <!--这是上面的切换部分tabs 数据是写的for循环取出来的-->
      <el-tabs tab-position="top" @tab-click="handleClick">
        <el-tab-pane v-for='(lab,index) in labelData'  :key="index"
                     :label="lab.name + ((lab.num ? '(' :'') +lab.num+(lab.num ? ')':''))"><!--这是一个三目运算，当lab.num 有就显示括号和数据没有就不显示-->
          <!--每一个tabs下的表及数据-->
          <div style="border: 1px solid #ebeef5">
            <template>
              <!--<el-table
                size="mini"
                :data="tableData2"
                style="width: 100%"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#F4F4F4',textAlign:'center'}"
                :row-class-name="tableRowClassName">
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  &lt;!&ndash;这部分是操作下的内容&ndash;&gt;
                  <template slot-scope="scope">
                    <div>
                      <el-button @click="changeClick(scope.row)" type="text" size="small">改</el-button>
                      <el-button @click="rowClick(scope.row)" type="text" size="small">排</el-button>
                      <el-button @click="inClick(scope.row)" type="text" size="small">入</el-button>
                    </div>

                    <div>
                      <el-button @click="exClick(scope.row)" type="text" size="small">拆</el-button>
                      <el-button @click="joinClick(scope.row)" type="text" size="small">合</el-button>
                      <el-button @click="turnClick(scope.row)" type="text" size="small">转</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>-->
              <el-table :cell-style="{textAlign:'center'}" :data="tableData_orderlist" style="width: 100%" size="mini" height="350px" :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}" stripe>
                <el-table-column prop="order_no" fixed width="160" label="预定编号">
                </el-table-column>
                <el-table-column prop="reserve_guest" label="预订人" :key="Math.random()" width="160" v-if="rsc_peo_flag">
                  <template slot-scope="scope">
                    <span v-for="(col,index) in scope.row.reserve_guest">{{col.name}}、</span>
                  </template>
                </el-table-column>
                <el-table-column prop="master_guest" label="入住人" :key="Math.random()" width="160" v-if="!rsc_peo_flag">
                  <template slot-scope="scope">
                    <span v-for="(col,index) in scope.row.master_guest">{{col.name}}、</span>
                  </template>
                </el-table-column>
                <el-table-column prop="room_type" label="在住房间类型" :key="Math.random()" v-if="room_type_flag">
                </el-table-column>
                <el-table-column prop="rt_rate" width="140" label="预定房间类型" :key="Math.random()" v-if="room_type_array_flag" type="expand">
                  <template slot-scope="scope">
                    <span>房间类型：</span><span v-for="(col,index) in scope.row.rt_rate">{{col.room_type}}、</span>
                  </template>
                </el-table-column>
                <el-table-column prop="room_number" label="在住房间号" :key="Math.random()" v-if="room_type_flag">
                </el-table-column>
                <el-table-column prop="rt_rate" width="140" label="预定房间号" :key="Math.random()" v-if="room_type_array_flag">
                  <template slot-scope="scope">
                    <span v-for="(col,index) in scope.row.rt_rate">{{col.room_number}}、</span>
                  </template>
                </el-table-column>
                <el-table-column prop="master_guest" width="140" label="在住人联系电话" :key="Math.random()" v-if="!rsc_peo_flag" type="expand">
                  <template slot-scope="scope">
                    <span v-for="(col,index) in scope.row.master_guest">{{col.telephone}}、</span>
                  </template>
                </el-table-column>
                <el-table-column prop="reserve_guest" width="240" label="预定人联系电话" :key="Math.random()" v-if="rsc_peo_flag">
                  <template slot-scope="scope">
                    <span v-for="(col,index) in scope.row.reserve_guest">{{col.telephone}}、</span>
                  </template>
                </el-table-column>
                <el-table-column prop="arr_time" label="预抵时间" width="140px">
                </el-table-column>
                <el-table-column prop="leave_time" label="预离时间" width="140px">
                </el-table-column>
                <el-table-column prop="retaintime" label="保留时间">
                </el-table-column>
                <el-table-column prop="" label="是否钟点房">
                </el-table-column>
                <el-table-column prop="modify_user_id" label="操作人">
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
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="operation" label="操作" width="250px" fixed="right">
                  <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(tableData2[scope.$index].id)" size="small">入住</el-button> -->
                    <!-- <el-button @click="handleClick(tableData2[scope.$index].id)" size="small">编辑</el-button> -->
                    <el-button type="danger" @click="deleteClick(scope.$index, scope.row,tableData_orderlist)" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination @current-change="handleCurrentChange_list" :current-page="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--底部页面-->
    <div class="main-bottom-top">
      <i class="el-icon-document" style="font-size: 16px;margin-left: 10px"></i>
      <label style="margin-left: 5px;color: #cccccc">排房列表</label>
      <label style="margin-left: 10px">当前合计：</label><label></label>
      <label>订金：</label><label></label>
    </div>
    <el-dialog title="实时房情" :visible.sync="dialogVisible_future"  :close-on-click-modal='false' width="60%">
      <el-row :gutter="20">
        <el-col :span="12"><div>
          <el-row style="height: 300px">
             <h3>汇总情况</h3><br/>
            <el-table
              size="mini"
              :data="tableData_collect"
              border
              style="width: 100%">
            </el-table>
          </el-row><br/>
          <el-row style="height: 300px">
             <h3>业务流转</h3><br/>
            <el-table
              size="mini"
              :data="tableData_business"
              border
              style="width: 100%">
            </el-table>
          </el-row>
        </div></el-col>
        <el-col :span="12"><div>
          <el-row style="height: 300px">
            <h3>客房中心</h3><br/>
            <el-table
              size="mini"
              :data="tableData_guest"
              border
              style="width: 100%">
            </el-table>
          </el-row><br/>
          <el-row style="height: 300px">
            <el-row style="height: 250px">
              <h3>本日预测</h3><br/>
              <el-table
                size="mini"
                :data="tableData_forecast"
                border
                style="width: 100%">
              </el-table>
              <span>本夜占用=当前在住-预计离店+预计到达</span><br/>
              <span>可卖房=总房数-维修房+本夜占用</span>
            </el-row>
            <el-row :gutter="24">
               <el-col :span="12">
                 <el-date-picker
                   v-model="value1"
                   type="date"
                   size="mini"
                   placeholder="选择日期">
                 </el-date-picker>
               </el-col>
               <el-col :span="12">
                 <button style="height: 27px;width: 80px;color: #FFFFFF;background: #4488E9;border: none;border-radius: 3px">刷新</button>
                 <button style="height: 27px;width: 80px;color: #FFFFFF;background: #4488E9;border: none;border-radius: 3px">打印</button>
               </el-col>
            </el-row>
          </el-row><br/>
        </div></el-col>
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
    export default {
      data() {
        return {
          //所有下拉框的数据，写的时候记得不一样的下拉框数据分开定义变量
          value1 : '',//今日预测的日期
          options: [],
          tab_pane_flag : 0,//用来判断当前的分页是哪一种
          value:'',
          startTime: '', //该时间是用来重置当前的起始时间的
          tableData_collect : [],//汇总情况
          tableData_business : [],//业务流转
          tableData_guest : [],//客房中心
          tableData_forecast : [],//本日预测
          //结束时间
          endTime:'',
          dialogVisible_future : false,//未来房情dialog
          base_title:[],//动态修改表头
          base_title_future : [],//动态修改未来房情的表头
          common_table_info : [],//可预订的房间的表展示
          tableData_future : [],//未来房情的表格
          //底部表格的数据
          tableData_orderlist : [],
          room_type_flag: true, //房间类型为显示的  这时候是在住单 应离未离 异常单的情况
          room_type_array_flag: false, //房间类型为应到未到 所有预定的情况
          rsc_peo_flag: false,
          // url: 'http://bill.crowncrystalhotel.com',
          url: 'http://47.98.113.173:9202',
          /**
           * 分页
           */
          currentPage: 1, //当前页码
          page_size: 10, //每页显示数量
          total: 0, //总数
          //右上表格数据
          tableData: [],
          //tabs数据
          labelData:[{
            id:0,
            name:"在住单",
            num:""
          },{
            id:1,
            name:"应到未到",
            num:""
          },{
            id:2,
            name:"应离未离",
            num:""
          },{
            id:3,
            name:"所有预订",
            num:""
          },{
            id:4,
            name:"异常单",
            num:""
          },{
            id:5,
            name:"团队",
            num:""
          },{
            id:6,
            name:"钟点房",
            num:""
          }],
          //房间号输入框的定义
          input1:"",
        }
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
        that.get_room_type_rate_code_info();
      },
      methods:{
        /**
         *  @get_roomtype_rate_code_info 获取未来七天的房型的所有房价码信息
         *  @rate_code BAR 因为这里的房价码是不确定的，没有供选择的信息，所以目前是挂牌价
         */
        get_room_type_rate_code_info(){

          let that = this;
          let rooms_list = [];
          let url = 'http://47.98.113.173:8091/v1/room/get_roomtype_list_tree/';
          that.$axios({
            method : 'get',
            url : url,
            params : {
              rate_code : 'BAR'
            }
          }).then((res)=>{
            localStorage.setItem('authorization',res.data.new_authorization);
            that.room_type_list = res.data.data;
            for(let i in that.room_type_list){
              rooms_list.push(that.room_type_list[i].code);
            }
            console.info(rooms_list);
            /**
             *  成功以后将表格的数据渲染出来
             *  拿到的是未来七天的房价码
             */
            that.$axios({
              method : 'post',
              url : 'http://47.98.113.173:9101/v1/rate_code/get_rate_code/',
              data : {
                rate_code : 'BAR',
                begin_date : that.getTime(),
                end_date : that.getTime_seven(),
                room_type_list : rooms_list,
                code_type : 1
              }
            }).then((res)=>{
              localStorage.setItem('authorization',res.data.new_authorization);
              that.common_table_info = res.data.data.room_type_price;
              console.info(that.common_table_info);
            }).catch((err)=>{
              console.error(err);
            })
          }).catch((err)=>{
            console.error(err);
          });
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
          let time = year+"-"+month+"-"+day; //组合时间
          return time;
        },
        /**
         * @set_time 重置用户选择的时间
         */
        set_time(){
          let that = this;
          console.info(that.startTime);
          that.change_days();
          /**
           * 如果用户更改了时间，直接给后端发送当前用户选择的时间和往后七天的房价码
           */
          that.get_room_type_rate_code_info();
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
          console.info(that.base_title);
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
        handleClick(tab) {
          let that = this;
          that.tab_pane_flag = tab.index;
          console.log(tab.index);
          if(tab.index === '0') {
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_live();
          } else if(tab.index === '1') {
            that.rsc_peo_flag = true;
            that.room_type_flag = false;
            that.room_type_array_flag = true;
            that.search_should_to();
          } else if(tab.index === '2') {
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_should_leave();
          } else if(tab.index === '3') {
            that.rsc_peo_flag = true;
            that.room_type_flag = false;
            that.room_type_array_flag = true;
            that.search_all_res();
          } else {
            /**
             * 异常单
             */
            that.room_type_flag = true;
            that.room_type_array_flag = false;
            that.rsc_peo_flag = false;
            that.search_abnormal_list();
          }
        },
        /**
         * @search_live  在住单查询
         */
        search_live() {
          let that = this;
          let url = that.url + '/v1/checkin/all_master_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [],
                room_type: that.check_list_room,
                code_market_id: that.code_market_ids,
                code_src_id: that.src_codes
              }
            }
          }).then((res) => {
            console.info(res);
            localStorage.setItem('authorization',res.data.new_authorization);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.labelData[0].num = that.total;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_should_to  应到未到
         */
        search_should_to() {
          let that = this;
          let url = that.url + '/v1/booking/get_not_arrive_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              reserve_base: {
                code_market_id: that.check_list_room,
                code_src_id: that.src_codes
              },
              reserve_guest: {},
              rt_rate: {
                room_type: that.check_list_room,
                room_class: []
              }
            }
          }).then((res) => {
            console.info(res);
            localStorage.setItem('authorization',res.data.new_authorization);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.labelData[1].num = that.total;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_should_leave  应离未离
         */
        search_should_leave() {
          let that = this;
          let url = that.url + '/v1/checkin/get_leave_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [],
                room_type: that.check_list_room,
                code_market_id: that.code_market_ids,
                code_src_id: that.src_codes
              }
            }
          }).then((res) => {
            console.info(res);
            //localStorage.setItem('authorization',res.data.new_authorization);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.labelData[2].num = that.total;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_all_res  所有预定
         */
        search_all_res() {
          let that = this;
          let url = that.url + '/v1/booking/get_all_reserve_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              reserve_base: {
                code_market_id: that.check_list_room,
                code_src_id: that.src_codes
              },
              reserve_guest: {},
              rt_rate: {
                room_type: that.check_list_room,
                room_class: []
              }
            }
          }).then((res) => {
            console.info(res);
            //localStorage.setItem('authorization',res.data.new_authorization);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.labelData[3].num = that.total;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @search_abnormal_list  异常单
         */
        search_abnormal_list() {
          let that = this;
          let url = that.url + '/v1/checkin/exception_list/';
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
            //localStorage.setItem('authorization',res.data.new_authorization);
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
            that.labelData[4].num = that.total;
          }).catch((err) => {
            console.error(err);
          })
        },
        /**
         * @handleCurrentChange_list 分页
         */
        handleCurrentChange_list(currentPage) {
          let that = this;
          let url = '';
          if(that.tab_pane_flag){
            switch (that.tab_pane_flag) {
              case '0' : url = that.url + '/v1/checkin/all_master_list/?page=' + currentPage;
                break;
              case '1' : url = that.url + '/v1/booking/get_not_arrive_list/?page=' + currentPage;
                break;
              case '2' : url = that.url + '/v1/checkin/get_leave_list/?page=' + currentPage;
                break;
              case '3' : url = that.url + '/v1/booking/get_all_reserve_list/?page=' + currentPage;
                break;
              case '4' : url = that.url + '/v1/checkin/exception_list/?page=' + currentPage;
                break;
              default : break;
            }
          }
          if(that.tab_pane_flag === '3' || that.tab_pane_flag === '1'){
            that.$axios({
              method: 'post',
              url: url,
              data: {
                reserve_base: {
                  code_market_id: that.room_types,
                  code_src_id: that.src_codes
                },
                reserve_guest: {},
                rt_rate: {
                  room_type: that.room_types,
                  room_class: []
                }
              }
            }).then((res) => {
              console.info(res);
              //localStorage.setItem('authorization',res.data.new_authorization);
              that.tableData_orderlist = res.data.data.results;
              that.total = res.data.data.count;
            }).catch((err) => {
              console.error(err);
            })
          }else{
            that.$axios({
              method: 'post',
              url: url,
              data: {
                guest_list: {
                  master_from_lable: [],
                  room_type: that.room_types,
                  code_market_id: that.code_market_ids,
                  code_src_id: that.src_codes
                }
              }
            }).then((res) => {
              console.info(res);
              //localStorage.setItem('authorization',res.data.new_authorization);
              that.tableData_orderlist = res.data.data.results;
              that.total = res.data.data.count;
            }).catch((err) => {
              console.error(err);
            })
          }
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
            //localStorage.setItem('authorization',res.data.new_authorization);
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
        //操作中改的点击事件
        changeClick(info){
          console.log(info)
        },
        //操作中排的点击事件
        rowClick(info){

        },
        //操作中入的点击事件
        inClick(info){

        },
        //操作中拆的点击事件
        exClick(info){

        },
        //操作合改的点击事件
        joinClick(info){

        },
        //操作中转的点击事件
        turnClick(info){

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
</style>
