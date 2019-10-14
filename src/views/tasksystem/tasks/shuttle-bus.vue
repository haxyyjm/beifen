<template>
  <div class="shuttle-bus">
    <div class="title">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="未接待" name="second">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="not_room" clearable placeholder="请选择">
                <el-option
                  v-for="item in room_number"
                  :key="item.value"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 40px">
              <span>接待日期 ：</span>
              <el-date-picker
                v-model="reception_time"
                type="date"
                value-format="yyyy-MM-dd"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <button  @click = filtrate()>筛选</button>
          </div>
          <el-button type="text" @click="dialogVisible = true;flush()">
            <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
          </el-button>
          <!--表格-->
          <div class="status">
            <el-table
              :data="income_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="status"
                label="订单状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">工作中</span>
                  <span v-else-if="scope.row.status === 30">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="origin"
                width="130"
                label="出发地">
              </el-table-column>
              <el-table-column
                prop="destination"
                width="130"
                label="目的地">
              </el-table-column>
              <el-table-column
                prop="plan_start_time"
                width="150"
                label="预约出发时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                width="150"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="car_type"
                label="车次类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.car_type === 10">班车</span>
                  <span v-else>专车</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="hotel_bus_name"
                width="120"
                label="	酒店车辆名称">
              </el-table-column>
              <el-table-column
                prop="address"
                width="220 "
                fixed="right"
                label="操作">
                <template slot-scope="scope" >
                  <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>
                  <el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>
                  <el-button size="mini" @click="dialog_entertain = true;reception(scope.row,scope.row.id,scope.$index, income_list) ">接待</el-button>
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
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
            <ul class="dialog_style">
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>编号 ：</span>
                <el-input v-model="param.master_single_num" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>房间号 ：</span>
                <!--<el-input v-model="param.in_or_out" placeholder="请输入内容" style="width: 200px;"></el-input>-->
                <el-select v-model="room_no" placeholder="请选择" >
                  <el-option
                    v-for="item in room_number"
                    :key="item.value"
                    :label="item.room_no"
                    :value="item.room_no">
                  </el-option>
                </el-select>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>订单状态 ：</span>
                <!--<el-input v-model="param.status" placeholder="请输入内容"  disabled ></el-input>-->
                <el-select v-model="status"   placeholder="请选择" >
                  <el-option
                    v-for="item in order_status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>出发地 ：</span>
                <el-input v-model="param.origin" placeholder="请输入内容" style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>目的地 ：</span>
                <el-input v-model="param.destination" placeholder="请输入内容" style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>预定人数 ：</span>
                <el-input v-model="param.people_number" placeholder="请输入内容" style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>预约出发时间 ：</span>
                <el-date-picker
                  v-model="plan_start_time"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>姓名 ：</span>
                <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>手机号 ：</span>
                <el-input v-model="param.phone" placeholder="请输入内容" maxlength="11"  oninput ="value=value.replace(/[^\d]/g,'')" style="width: 217px;"> </el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>车次类型：</span>
                <el-select v-model="car_type" placeholder="请选择" >
                  <el-option
                    v-for="item in car_list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>酒店车辆名称 ：</span>
                <el-select v-model="hotel_bus_name" placeholder="请选择" >
                  <el-option
                    v-for="item in car_data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>
             </span>
          </el-dialog>
          <!--点击接待-->
          <el-dialog
            title="请选择接待人"
            :visible.sync="dialog_entertain"
            width="80%"
            :before-close="handleClose">
            <ul class="dialog_style">
              <li >
                <span style="text-align: right">接待人 ：</span>
                <el-select v-model="borrowers_man"   placeholder="请选择" >
                  <el-option
                    v-for="item in room_data"
                    :key="item.room_no"
                    :label="item.user_name"
                    :value="item.user_name">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_entertain = false">取 消</el-button>
              <el-button type="primary" @click="determine()">确 定</el-button>
             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="待接待" name="third">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="reception_room"    clearable  placeholder="请选择">
                <el-option
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 40px">
              <span>接待日期 ：</span>
              <el-date-picker
                v-model="reception_data"
                type="date"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 40px">
              <span>接待人 ：</span>
              <el-select v-model="reception_man"   clearable placeholder="请选择">
                <el-option
                  v-for="item in room_data"
                  :key="item.room_no"
                  :label="item.user_name"
                  :value="item.user_name">
                </el-option>
              </el-select>
            </div>
            <button @click="reception_filtrate()" >筛选</button>
          </div>
          <!--<el-button type="text" @click="dialog = true;flush()">-->
            <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          <!--</el-button>-->
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="receive_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="status"
                label="订单状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">工作中</span>
                  <span v-else-if="scope.row.status === 30">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="origin"
                width="130"
                label="出发地">
              </el-table-column>
              <el-table-column
                prop="destination"
                width="130"
                label="目的地">
              </el-table-column>
              <el-table-column
                prop="plan_start_time"
                width="150"
                label="预约出发时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                width="150"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="car_type"
                label="车次类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.car_type === 10">班车</span>
                  <span v-else>专车</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="hotel_bus_name"
                width="120"
                label="	酒店车辆名称">
              </el-table-column>
              <el-table-column
                prop="regular_user_name"
                label="	接待人">
              </el-table-column>
              <el-table-column
                prop="address"
                width="180 "
                fixed="right"
                label="操作">
                <template slot-scope="scope" >
                  <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, receive_list)" >删除</el-button>
                  <!--<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
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
        <el-tab-pane label="已完成" name="routing">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="achieve_room" placeholder="请选择">
                <el-option
                  clearable
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 40px">
              <span>接待日期 ：</span>
              <el-date-picker
                v-model="achieve_time"
                type="date"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 40px">
              <span>接待人 ：</span>
              <el-select v-model="achieve_man"    clearable  placeholder="请选择">
                <el-option
                  v-for="item in room_data"
                  :key="item.user_name"
                  :label="item.user_name"
                  :value="item.user_name">
                </el-option>
              </el-select>
            </div>
            <button @click="achieve_filtrate()">筛选</button>
          </div>
          <!--<el-button type="text" @click="dialogGrabble = true;flush()">-->
            <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          <!--</el-button>-->
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="had_done"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="status"
                label="订单状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">工作中</span>
                  <span v-else-if="scope.row.status === 30">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="origin"
                width="130"
                label="出发地">
              </el-table-column>
              <el-table-column
                prop="destination"
                width="130"
                label="目的地">
              </el-table-column>
              <el-table-column
                prop="plan_start_time"
                width="150"
                label="预约出发时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                width="150"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="car_type"
                label="车次类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.car_type === 10">班车</span>
                  <span v-else>专车</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="bus_start_time"
                width="130"
                label="车辆出发时间">
              </el-table-column>
              <el-table-column
                prop="bus_end_time"
                width="130"
                label="车辆到达时间">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="regular_user_id"-->
              <!--label="完成任务员工id">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="regular_user_name"
                width="150"
                label="完成任务员工姓名">
              </el-table-column>
              <el-table-column
                prop="hotel_bus_name"
                width="120"
                label="	酒店车辆名称">
              </el-table-column>
              <el-table-column
                prop="create_user"
                label="	创建人">
              </el-table-column>
              <el-table-column
                prop="create_datetime"
                width="150"
                label="	创建时间">
              </el-table-column>
              <el-table-column
                prop="modify_user"
                label="	修改人">
              </el-table-column>
              <el-table-column
                prop="modify_datetime"
                width="150"
                label="	修改时间">
              </el-table-column>


              <el-table-column
                prop="address"
                width="180 "
                fixed="right"
                label="操作">
                <template slot-scope="scope" >
                  <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, had_done)" >删除</el-button>
                  <!--<el-button size="mini" @click="dialogGrabble = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
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
        <el-tab-pane label="已删除" name="delete">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="delete_room" placeholder="请选择">
                <el-option
                  clearable
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 40px">
              <span>接待日期 ：</span>
              <el-date-picker
                v-model="delete_time"
                type="date"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 40px">
              <span>接待人 ：</span>
              <el-select v-model="delete_man"    clearable  placeholder="请选择">
                <el-option
                  v-for="item in room_data"
                  :key="item.user_name"
                  :label="item.user_name"
                  :value="item.user_name">
                </el-option>
              </el-select>
            </div>
            <button @click="delete_filtrate()">筛选</button>
          </div>
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="delete_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="status"
                label="订单状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">工作中</span>
                  <span v-else-if="scope.row.status === 30">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="origin"
                width="130"
                label="出发地">
              </el-table-column>
              <el-table-column
                prop="destination"
                width="130"
                label="目的地">
              </el-table-column>
              <el-table-column
                prop="plan_start_time"
                width="150"
                label="预约出发时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                width="150"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="car_type"
                label="车次类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.car_type === 10">班车</span>
                  <span v-else>专车</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="bus_start_time"
                width="130"
                label="车辆出发时间">
              </el-table-column>
              <el-table-column
                prop="bus_end_time"
                width="130"
                label="车辆到达时间">
              </el-table-column>
              <el-table-column
                prop="regular_user_name"
                width="150"
                label="完成任务员工姓名">
              </el-table-column>
              <el-table-column
                prop="hotel_bus_name"
                width="120"
                label="	酒店车辆名称">
              </el-table-column>
              <el-table-column
                prop="create_user"
                label="	创建人">
              </el-table-column>
              <el-table-column
                prop="create_datetime"
                width="150"
                label="	创建时间">
              </el-table-column>
              <el-table-column
                prop="modify_user"
                label="	修改人">
              </el-table-column>
              <el-table-column
                prop="modify_datetime"
                width="150"
                label="	修改时间">
              </el-table-column>

              <el-table-column
                prop="address"
                width="180 "
                fixed="right"
                label="操作">
                <template slot-scope="scope" >
                  <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, had_done)" >删除</el-button>
                  <!--<el-button size="mini" @click="dialogGrabble = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shuttle-bus",
      data() {
        return {
          activeName2: 'second',//这个是默认头部

          //分页
          total:5,
          pagesize:5,
          dialogVisible: false,//未送物的修改页面和新增页面的显示与隐藏
          dialog:false,//代送物的修改页面和新增页面的显示与隐藏
          dialogGrabble:false,//已完成的修改页面和新增页面的显示与隐藏
          dialog_entertain:false,//接待
          room_data:[],//接待人
          income_list:[],//未接待的列表
          receive_list:[],//待接待列表
          room_number:[], //这个是房间号
          had_done:[],//已完成
          delete_list:[],//删除
          dept_list:[],//部门
          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新

          param :{},//新增入账代码里的内容
          //筛选条件

          //  班车未接待的内容
            //车次类型
          car_list:[
            {
              value:10,
              label:'班车'
            },
            {
              value:20,
              label:'专车'
            },
          ],

          //车辆名称（暂时是假数据，后台会给真实数据
          car_data:[
            {
              value:'0',
              label:'奥迪'
            },
            {
              value:'1',
              label:'保时捷'
            },
            {
              value:'2',
              label:'法拉利'
            },
          ],
          //订单状态
          order_status:[
            {
              value:0,
              label:'初始'
            },

          ],
          master_single_num:'', //编号
          /*
         * 未接待的筛选
         * */
          not_room:'',//未接待房间号
          reception_time:'',//未接待时间
          /*
         * 待接待的筛选
         * */
          reception_room:'',//待接待房间号
          reception_data:'',//待接待时间
          reception_man:'',//待接待人
          /*
          * 完成接待的筛选
          * */
          achieve_room:'',//完成接待日期
          achieve_time:'',//完成接待日期
          achieve_man:'',//完成接待人
          /**
           * 删除
           *
           * */
           delete_room:'',
          delete_time:'',
          delete_man:'',
          borrowers_man:'',//点击接待的接待人
          room_no:'',//房间号
          status:'',//订单状态
          origin:'',//出发地
          destination:'',//目的地
          people_number:'',//预定人数
          plan_start_time:'',//预约出发时间
          name:'',//姓名
          phone:'',//手机号
          car_type:'',//车次类型
          hotel_bus_name:'',//酒店车辆名称



        };
      },
      created:function () {
        let that = this;
        that.enter_code();//获取未送物的list
        that.room_list();//获取房间号
        // that.examine();

      },
      methods: {
        //    这个是选择头部的方法
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //封装错误信息
        error_message(msg){
          this.$message.error('错了哦，错误消息为'+msg);
        },
        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            master_single_num:'', //编号
            origin:'',//出发地
            destination:'',//目的地
            people_number:'',//预定人数
            name:'',//姓名
            phone:'',//手机号

          }

            that.room_no='',//房间号
            that.status='',//订单状态
            that.plan_start_time='',//预约出发时间
            that.car_type='',//车次类型
            that.hotel_bus_name=''//酒店车辆名称
        },
        //封装获取房间号
        room_list(){
          let that=this
          that.$axios({
            url:'http://room.crowncrystalhotel.com/v1/room/get_roomnumber_list_tree/',
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                // console.log(res.data.data)
                that.room_number=res.data.data
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装获取车辆名称
        car_name(){
          let that=this
          that.$axios({
            url:'http://192.168.2.224:9001/v1/room/get_roomnumber_list_tree/',
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.room_data=res.data.data.list
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装获取接待人
        receiver(){
          let that=this
          that.$axios({
            url:'http://47.98.113.173:9503/v1/manage/duty_record/on_duty_employees',
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.room_data=res.data.data
                if(res.data.data.length===0){
                  that.hintInfo("warning", "暂时没有可选择的接待员")
                }
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },

        //封装获取未接待
        enter_code(){
          let that = this;
          that.$axios({
            url: "http://47.98.113.173:9104/v1/room_service/regular_bus/get_rs_regular_bus_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.results);
               let  results=res.data.data.results
                that.total=res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.income_list = [];
                that.receive_list=[];
                that.had_done=[];
                for (let key in results) {
                  if(results[key].status===0){
                     that.income_list.push(results[key])
                     console.info(that.income_list);
                  }else if(results[key].status===5){
                    that.receive_list.push(results[key])
                  }else if(results[key].status===10){
                    that.had_done.push(results[key])
                  }else if(results[key].status===30){
                    that.delete_list.push(results[key])
                  }
                }
              }
              else{
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //点击未接待分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/finance/incoming_account_code/info_list",
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
                // that.income_list=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
        //  点击未接待删除
        cancel(id,index,list){
          console.log(id);
          console.log(index);
          console.log(list);
          let that = this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            that.$axios({
              url:"http://47.98.113.173:9104/v1/room_service/regular_bus/remove_rs_regular_bus/"+id +'/',
              method: "post",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  that.enter_code();
                }

              })
              .catch(error=>{
                console.log(error);
              })

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //点击未接待修改
        amend(srow,id,index,list){
          let that = this;
          that.Edite = true;
          that.id=id;
          console.log(srow);
          //
           that.param.master_single_num=srow.master_single_num, //编号
           that.room_no=srow.room_no,//房间号
           that.status=srow. status,//订单状态
            that.param.origin=srow.origin,//出发地
            that.param.destination=srow.destination,//目的地
            that.param.people_number=srow.people_number,//预定人数
            that.plan_start_time=srow.plan_start_time,//预约出发时间
            that.param.name=srow.name,//姓名
            that.param.phone=srow.phone,//手机号
            that.car_type=srow.car_type,//车次类型
            that.hotel_bus_name=srow.hotel_bus_name //酒店车辆名称
        },
        //点击未接待新增和修改后的保存
        ensure(){
          let that=this;
          if(that.param.master_single_num===""||that.room_no===""|| that.status===""||that.param.origin===""||that.param.destination===""||that.param.people_number===""
          ||that.plan_start_time===""||that.param.name===""||that.param.phone===""||that.car_type===""||that.hotel_bus_name===""
          ){
            that.hintInfo("warning", "*为必填项")
          }else {
            let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if (!tel.test(that.param.phone)) {
              that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
            }else {
              let urldata = that.Edite ? ("http://47.98.113.173:9104/v1/room_service/regular_bus/update_rs_regular_bus/" + that.id + '/') : ("http://47.98.113.173:9104/v1/room_service/regular_bus/add_rs_regular_bus/");
              console.info(urldata);
              that.$axios({
                url: urldata,
                method: "post",
                data: {
                  master_single_num: parseInt(that.param.master_single_num), //编号
                  room_no: that.room_no,//房价号
                  status: parseInt(that.status),//订单状态
                  origin: that.param.origin,//出发地
                  destination: that.param.destination,//目的地
                  people_number: that.param.people_number,//预定人数
                  plan_start_time: that.plan_start_time,//预约出发时间
                  name: that.param.name,//姓名
                  phone: that.param.phone,//手机号
                  car_type: parseInt(that.car_type),//车次类型
                  hotel_bus_name: that.hotel_bus_name //酒店车辆名称
                },
                headers: {
                  authorization: sessionStorage.getItem("authorization"),
                }

              })
                .then(res => {
                  if (res.data.message == "success") {
                    that.enter_code();
                    that.dialogVisible = false;
                  }
                  else {
                    that.error(res.data.message)
                    console.log(res.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
        },
        //点击接待
        reception(srow,id,index,list){
          let that = this;
          console.log(srow);
          that.id=id;
          srow.status=5;
          that.status = srow.status;
          that.receiver();//获取接待人
        },
        //点击接待后的保存
        determine(){
          let that = this ;
          if(that.borrowers_man===""){
            that.hintInfo("warning", "请选择接待员")
          }else {
            that.$axios({
              url: "http://47.98.113.173:9104/v1/room_service/regular_bus/update_rs_regular_bus/" + that.id + '/',
              method: "post",
              data: {
                status: parseInt(that.status),//订单状态
                regular_user_name: that.borrowers_man,//接待人
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message == "success") {
                  that.enter_code();
                  that.dialog_entertain = false;
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },

        /*
        * 筛选条件
        * */
        //点击未接待的筛选
        filtrate(){
          console.log(1);
          let that = this;
          if(that.not_room==="" && that.reception_time==="" ){
            that.hintInfo("warning", "请选择筛选条件")
          }else if(that.not_room===""){
            that.hintInfo("warning", "请选择房间号")
          }else if (that.reception_time===""){
            that.hintInfo("warning", "请选择时间")
          }else {
            that.$axios({
              url: "http://47.98.113.173:9104/v1/room_service/regular_bus/get_rs_regular_bus_list/?room_no="+that.not_room+"&"+"plan_start_time="+that.reception_time,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data.data.results);
                  let  results=res.data.data.results
                  that.total=res.data.data.count;
                  //push 的时候要先清空数组，保证这个是一个空的数组
                  that.income_list = [];
                  // that.receive_list=[];
                  // that.had_done=[];
                  for (let key in results) {
                    if(results[key].status===0){
                      that.income_list.push(results[key])
                    }
                  }
                }
                else{
                  console.log(res.data.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }

        },
        //点击待接待的筛选、
        reception_filtrate(){
          let that = this;
          if(that.reception_room==="" && that.reception_data==="" &&that.reception_man===""){
            that.hintInfo("warning", "请选择筛选条件")
          }else if(that.reception_room===""){
            that.hintInfo("warning", "请选择房间号")
          }else if (that.reception_data===""){
            that.hintInfo("warning", "请选择时间")
          }else if (that.reception_man===""){
            that.hintInfo("warning", "请选择接待人")
          } else {
            that.$axios({
              url: "http://47.98.113.173:9104/v1/room_service/regular_bus/get_rs_regular_bus_list/?room_no="+that.reception_room+"&"+"plan_start_time="+that.reception_data+"&"+"complete_user_name="+that.reception_man,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data.data.results);
                  let  results=res.data.data.results
                  that.total=res.data.data.count;
                  //push 的时候要先清空数组，保证这个是一个空的数组
                  that.receive_list = [];
                  // that.receive_list=[];
                  // that.had_done=[];
                  for (let key in results) {
                    if(results[key].status===20){
                      that.receive_list.push(results[key])
                    }
                  }
                }
                else{
                  console.log(res.data.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        //点击已完成
        achieve_filtrate(){
          let that = this;
          if(that.achieve_room==="" && that.achieve_time==="" &&that.achieve_man===""){
            that.hintInfo("warning", "请选择筛选条件")
          }else if(that.achieve_room===""){
            that.hintInfo("warning", "请选择房间号")
          }else if (that.achieve_time===""){
            that.hintInfo("warning", "请选择时间")
          }else if (that.achieve_man===""){
            that.hintInfo("warning", "请选择接待人")
          } else {
            that.$axios({
              url: "http://47.98.113.173:9104/v1/room_service/regular_bus/get_rs_regular_bus_list/?room_no="+that.achieve_room+"&"+"plan_start_time="+that.achieve_time+"&"+"complete_user_name="+that.achieve_man,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data.data.results);
                  let  results=res.data.data.results
                  that.total=res.data.data.count;
                  //push 的时候要先清空数组，保证这个是一个空的数组
                  that.had_done = [];
                  // that.receive_list=[];
                  // that.had_done=[];
                  for (let key in results) {
                    if(results[key].status===20){
                      that.had_done.push(results[key])
                    }
                  }
                }
                else{
                  console.log(res.data.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
         //点击删除
        delete_filtrate(){
          let that = this;
          if(that.delete_room==="" && that.delete_time==="" &&that.delete_man===""){
            that.hintInfo("warning", "请选择筛选条件")
          }else if(that.delete_room===""){
            that.hintInfo("warning", "请选择房间号")
          }else if (that.delete_time===""){
            that.hintInfo("warning", "请选择时间")
          }else if (that.delete_man===""){
            that.hintInfo("warning", "请选择接待人")
          } else {
            that.$axios({
              url: "http://47.98.113.173:9104/v1/room_service/regular_bus/get_rs_regular_bus_list/?room_no="+that.achieve_room+"&"+"plan_start_time="+that.achieve_time+"&"+"complete_user_name="+that.achieve_man,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data.data.results);
                  let  results=res.data.data.results
                  that.total=res.data.data.count;
                  //push 的时候要先清空数组，保证这个是一个空的数组
                  that.had_done = [];
                  // that.receive_list=[];
                  // that.had_done=[];
                  for (let key in results) {
                    if(results[key].status===20){
                      that.had_done.push(results[key])
                    }
                  }
                }
                else{
                  console.log(res.data.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },

        //修改页面的显示和隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
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
      }
    }
</script>

<style lang="less" scoped>
  .shuttle-bus{
    width: 97%;
    height: 100%;
    .title{
      width: 100%;
      height: 100%;
      background: white;
      padding-top: 16px;
      .grabble{
        div{
          display: inline-block;
        }
        button{
          width:80px;
          height:40px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 20px;
        }
      }
      .dialog_style{
        overflow: hidden;
        li{
          float: left;
          width: 50%;
          margin-bottom: 10px;
          span{
            display: inline-block;
            width: 110px;
          }
        }
      }

    }
  }
</style>

