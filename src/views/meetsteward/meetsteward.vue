<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="预定列表" name="ward_list">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <button @click="dialogVisible_site = true;get_site()">场地管理</button>
                <button @click="dialogVisible_resource = true;get_resource_list()">资源管理</button>
                <button @click="dialogVisible_search = true">组合查询</button>
                <button @click="get_meeting_list">刷新</button>
              </div>
            </el-col>
          </el-row>
          <el-table :data="tableData_ward_list" :row-style="{cursor:'pointer'}" @row-dblclick="dialogVisible_search_detials = true;show_detials()" :cell-style="{textAlign:'center'}" stripe size="mini" :header-cell-style="{background:'#68819E',color:'white',textAlign:'center'}" style="width: 100%">
            <el-table-column fixed prop="meeting_type" label="预定类型">
              <template slot-scope="scope">
                <span v-if="scope.row.meeting_type === 0">纯会议</span>
                <span v-else-if="scope.row.meeting_type === 1">纯用餐</span>
                <span v-else-if="scope.row.meeting_type === 2">综合</span>
                <span v-else-if="scope.row.meeting_type === 3">婚宴</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="topic" label="主题">
            </el-table-column>
            <el-table-column prop="name" label="场地">
            </el-table-column>
            <el-table-column prop="begin_time" label="开始时间" sortable width="170">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="170">
            </el-table-column>
            <el-table-column prop="arrange_type" label="宴会类型">
              <template slot-scope="scope">
                <span v-if="scope.row.arrange_type === 0">课桌式</span>
                <span v-else-if="scope.row.arrange_type === 1">剧院式</span>
                <span v-else-if="scope.row.arrange_type === 2">鱼骨式</span>
                <span v-else-if="scope.row.arrange_type === 3">岛屿式</span>
                <span v-else>婚宴</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="预定名称">
            </el-table-column>
            <el-table-column prop="contact_person" label="联系人">
            </el-table-column>
            <el-table-column prop="contact_phone" label="联系电话">
            </el-table-column>
            <el-table-column prop="people_num" label="人数">
            </el-table-column>
            <el-table-column prop="address" label="指示牌">
            </el-table-column>
            <el-table-column prop="salesman_id" label="销售员">
            </el-table-column>
            <el-table-column prop="total_consumption" label="费用">
            </el-table-column>
            <el-table-column prop="total_payment" label="综合费用">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange_list" :current-page="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="预定状态" name="ward_status">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <button @click="dialogVisible_site = true;get_site()">场地管理</button>
                <button @click="dialogVisible_resource = true;get_resource_list()">资源管理</button>
                <button @click="dialogVisible_search = true">组合查询</button>
                <button @click="get_site">刷新</button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <button @click="dialogVisible_feast = true">预定</button>
                <button>取消</button>
                <button>维修</button>
                <button>自用</button>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="grid-content bg-purple-dark">
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-dark" style="display: flex;align-items: center;font-size: 0.8vw;">
                <div style="display: flex;align-items: center;">
                  <div style="white-space:normal;text-overflow:ellipsis;overflow:hidden;max-width:70%;margin-right: 2px;">waill...</div>
                  <div style="width: 20px;height: 20px;background: #ECE819"></div>
                </div>
                <div style="margin-left: 5px;display: flex;align-items: center;">
                  <div style="white-space:normal;text-overflow:ellipsis;overflow:hidden;max-width:70%;margin-right: 2px;">不确定</div>
                  <div style="width: 20px;height: 20px;background: #58D56D"></div>
                </div>
                <div style="margin-left: 5px;display: flex;align-items: center;">
                  <div style="white-space:normal;text-overflow:ellipsis;overflow:hidden;max-width:70%;margin-right: 2px;">确定</div>
                  <div style="width: 20px;height: 20px;background: #4488E9"></div>
                </div>
                <div style="margin-left: 5px;display: flex;align-items: center;">
                  <div style="white-space:normal;text-overflow:ellipsis;overflow:hidden;max-width:70%;margin-right: 2px;">担保</div>
                  <div style="width: 20px;height: 20px;background: #BA7828"></div>
                </div>
                <div style="margin-left: 5px;display: flex;align-items: center;">
                  <div style="white-space:normal;text-overflow:ellipsis;overflow:hidden;max-width:70%;margin-right: 2px;">自用</div>
                  <div style="width: 20px;height: 20px;background:#784311"></div>
                </div>
                <div style="margin-left: 5px;display: flex;align-items: center;">
                  <div style="white-space:normal;text-overflow:ellipsis;overflow:hidden;max-width:70%;margin-right: 2px;">维修</div>
                  <div style="width: 20px;height: 20px;background: #F33D52"></div>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">
              <el-date-picker
                @change="change_dates"
                v-model="value_date"
                size="mini"
                style="width: 180px"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-dark">
                <el-select v-model="select_days" placeholder="请选择" style="width: 90px" size="mini" @change="change_days">
                  <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-table :data="tableData_ward_status" border size="mini" :header-cell-style="{background:'#68819E',color:'white'}" :cell-style="rowClass">
            <el-table-column prop="hall_name" label="场地" fixed width="150">
            </el-table-column>
            <template v-for="(col,index) in base_title">
              <el-table-column :prop="col.data_time" :label="col.label">
                <!--<el-table-column :prop="col.index" label="上午" :filterPlacement = "col.data_time" :align="col.data_time" width="120">
                </el-table-column>
                <el-table-column :prop="col.label" label="下午" :filterPlacement = "col.data_time" :align="col.data_time" width="120">
                </el-table-column>-->
              </el-table-column>
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="预定时间段" name="ward_times">
          <el-row>
            <el-col :span="24">
              <Not-opened></Not-opened>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--场地管理-->
    <el-dialog title="场地管理" :visible.sync="dialogVisible_site" :close-on-click-modal='false' width="50%">
      <el-row>
        <el-col :span="11">
          <el-table @row-click="site_edit_click" :data="tableData_site" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="code" label="代码">
            </el-table-column>
            <el-table-column prop="hall_name" label="名称">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2">
          <span></span>
        </el-col>
        <el-col :span="11">
          <ul>
            <li style="margin-top: 0px"><span>*代码:</span><input v-model="site_code" /></li>
            <li><span>父厅:</span><input :disabled="disabled_parent_hall" v-model="parent_hall" /></li>
            <li><span>*名称:</span><input :disabled="disabled_hall_name" v-model="hall_name" /></li>
            <li><span>名称2:</span><input :disabled="disabled_site_name2" v-model="site_name2" /></li>
            <li><span>面积:</span><input :disabled="disabled_site_area" v-model="site_area" /></li>
            <li><span>费用:</span><input :disabled="disabled_site_cost" v-model="site_cost" /></li>
            <li><span>排序:</span><input :disabled="disabled_site_sort" v-model="site_sort" /></li>
            <li><span>备注:</span><input :disabled="disabled_site_remark" v-model="site_remark" /></li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button @click="add_site_click">增加</button>
          <button @click="delete_site_click">删除</button>
          <button @click="edit_site_click">编辑</button>
          <button @click="save_site_click">保存</button>
          <button @click="dialogVisible_site = false">退出</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--组合查询-->
    <el-dialog title="组合条件查询" :visible.sync="dialogVisible_search" :close-on-click-modal='false' width="30%">
      <el-row>
        <el-col :span="24">
          <ul>
            <li style="margin-top: 0px"><span>代码:</span><input v-model="ser_code" /></li>
            <li><span>主题:</span><input v-model="ser_theme" /></li>
            <li><span>预定名称:</span><input v-model="ser_res_name" /></li>
            <li><span>状态:</span><input v-model="ser_status" @click="dialogVisible_search_status = true;" />
            </li>
            <li><span>场地:</span><el-select @focus="select_meeting_type" v-model="ser_place" placeholder="请选择" size="mini" style="width: 50%">
                <el-option v-for="item in options_ser_place" :key="item.value" :label="item.hall_name" :value="item.hall_id">
                </el-option>
              </el-select>
            </li>
            <li><span>宴会类型:</span><el-select v-model="select_feast_type" placeholder="请选择" size="mini" style="width: 50%">
                 <el-option v-for="item in options_feast_type" :key="item.value" :label="item.meeting_type" :value="item.meeting_type_code">
                 </el-option>
              </el-select>
            </li>
            <li><span>销售员:</span><input v-model="sale_man" @click="dialogVisible_sale_man = true;Get_sale_man()" /></li>
            <li>
              <span>开始时段:</span>
              <el-date-picker v-model="value_search_begin" value-format="yyyy-MM-dd" size="mini" type="date" style="width: 130px" placeholder="选择日期">
              </el-date-picker>
              <span style="width: 20px">至:</span>
              <el-date-picker v-model="value_search_end" size="mini" value-format="yyyy-MM-dd" type="date" style="width: 130px" placeholder="选择日期">
              </el-date-picker>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button>清除</button>
          <button @click="group_search">确认</button>
          <button @click="dialogVisible_search = false">取消</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--资源管理-->
    <el-dialog title="资源管理" :visible.sync="dialogVisible_resource" :close-on-click-modal='false' width="50%">
      <el-row>
        <el-col :span="4">
          <el-table :data="tableData_resource_type" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" @row-click="get_resource" style="width: 100%">
            <el-table-column prop="name" label="资源类型">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="19" style="margin-left: 10px">
          <el-table @row-dblclick="get_resource_details" v-show="show_resource_flag" :data="tableData_resource" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="dept_id" label="部门">
            </el-table-column>
            <el-table-column prop="is_consumable" label="易耗品">
              <template slot-scope="scope">
                <span v-if="scope.row.is_consumable === 1">消耗品</span>
                <span v-else>非消耗品</span>
              </template>
            </el-table-column>
            <el-table-column prop="unit_price" label="价格">
            </el-table-column>
            <el-table-column prop="quantity" label="数量">
            </el-table-column>
          </el-table>
          <ul v-show="!show_resource_flag">
            <li><span>代码：</span><input v-model="resource_code" /></li>
            <li><span>名称：</span><input v-model="resource_name" /></li>
            <li><span>部门：</span>
              <el-select v-model="value_resources_dept" placeholder="请选择" size="mini" @focus="select_dept">
                <el-option v-for="item in value_resource_dept_select" :key="item.value" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li><span>资源类型:</span>
              <el-select v-model="value_resources" placeholder="请选择" size="mini">
                <el-option v-for="item in value_resource_select" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button @click="add_resource" v-show="add_info_resource_flag">增加</button>
          <button @click="delete_resource" v-show="delete_resource_flag">删除</button>
          <button @click="save_resource" v-show="save_resource_flag">保存</button>
          <button @click="dialogVisible_resource = false">退出</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--酒店部门-->
    <el-dialog title="酒店部门" :visible.sync="dialogVisible_hotel_sector" :close-on-click-modal='false' width="40%">
      <el-row>
        <el-col :span="24" style="margin-left: 10px">
          <el-table :data="tableData_hotel_sector" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="date" label="代码">
            </el-table-column>
            <el-table-column prop="name" label="描述">
            </el-table-column>
            <el-table-column prop="name" label="英文描述">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="10" style="text-align: left">
          <button>反选</button>
          <button>全选</button>
        </el-col>
        <el-col :span="14" style="text-align: right">
          <button>清空</button>
          <button>确定</button>
          <button @click="dialogVisible_hotel_sector = false">取消</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--宴会弹出框-->
    <el-dialog title="宴会" top="1vh" :visible.sync="dialogVisible_feast" :close-on-click-modal='false' width="85%">
      <el-tabs style="margin-top: -20px" v-model="activeName_feast" type="card" @tab-click="handleClick">
        <el-tab-pane label="预定列表" name="ward_list_feast">
          <el-table :data="tableData_ward_list"  stripe size="mini" :row-style="{cursor:'pointer'}" @row-dblclick="dialogVisible_search_detials = true;show_detials()" :header-cell-style="{background:'#68819E',color:'white'}" style="width: 100%">
            <el-table-column fixed prop="meeting_type" label="预定类型">
              <template slot-scope="scope">
                <span v-if="scope.row.meeting_type === 0">纯会议</span>
                <span v-else-if="scope.row.meeting_type === 1">纯用餐</span>
                <span v-else-if="scope.row.meeting_type === 2">综合</span>
                <span v-else-if="scope.row.meeting_type === 3">婚宴</span>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column prop="topic" label="主题">
            </el-table-column>
            <el-table-column prop="address" label="场地">
            </el-table-column>
            <el-table-column prop="begin_time" label="开始时间" sortable width="170">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="170">
            </el-table-column>
            <el-table-column prop="arrange_type" label="宴会类型">
              <template slot-scope="scope">
                <span v-if="scope.row.arrange_type === 0">课桌式</span>
                <span v-else-if="scope.row.arrange_type === 1">剧院式</span>
                <span v-else-if="scope.row.arrange_type === 2">鱼骨式</span>
                <span v-else-if="scope.row.arrange_type === 3">岛屿式</span>
                <span v-else>婚宴</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="预定名称">
            </el-table-column>
            <el-table-column prop="contact_person" label="联系人">
            </el-table-column>
            <el-table-column prop="contact_phone" label="联系电话">
            </el-table-column>
            <el-table-column prop="people_num" label="人数">
            </el-table-column>
            <el-table-column prop="address" label="指示牌">
            </el-table-column>
            <el-table-column prop="salesman_id" label="销售员">
            </el-table-column>
            <el-table-column prop="total_consumption" label="费用">
            </el-table-column>
            <el-table-column prop="total_payment" label="综合费用">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange_list" :current-page="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="预定状态" name="ward_status_feast">
          <el-row>
            <el-col :span="4" style="float: right;">
              <div class="grid-content bg-purple-dark">
                <el-select v-model="select_days" placeholder="请选择" style="width: 90px" size="mini" @change="change_days">
                  <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="4" style="float: right">
              <!--<div class="grid-content bg-purple-dark">
                <el-date-picker
                  @change="change_dates"
                  v-model="value_date"
                  size="mini"
                  format="yyyy-MM-dd"
                  style="width: 140px"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>-->
            </el-col>
          </el-row>
          <el-table border style="margin-top: 10px" :data="tableData_ward_status" size="mini" :header-cell-style="{background:'#68819E',color:'white'}">
            <el-table-column prop="hall_name" label="场地" fixed width="150">
            </el-table-column>
            <template v-for="(col,index) in base_title">
              <el-table-column :prop="col.data_time" :label="col.label">

                <!--<el-table-column prop="morning" label="下午" width="120" :align="col.data_time" :filterPlacement = "col.data_time">
                </el-table-column>
                <el-table-column prop="afternoon" label="下午" width="120" :align="col.data_time" :filterPlacement = "col.data_time">
                </el-table-column>-->
              </el-table-column>
            </template>
          </el-table>
        </el-tab-pane>
        <el-row style="margin-top: 10px">
          <el-col :span="8">
            <ul>
              <li><span>预定编号:</span><input @click="dialogVisible_account_query = true" /></li>
              <li><span>宴会编号:</span><input/></li>
              <li><span>主题:</span><input/></li>
              <li><span>状态:</span>
                <el-select @focus="select_status_click" v-model="select_status" placeholder="请选择" size="mini" style="width: 50%">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.meeting_status" :value="item.meeting_status_code">
                  </el-option>
                </el-select>
              </li>
              <li><span>指示牌:</span><input/></li>
              <li><span>宴会类型:</span>
                <el-select @focus="select_meeting_type" v-model="select_feast_type" placeholder="请选择" size="mini" style="width: 50%">
                  <el-option v-for="item in options_feast_type" :key="item.meeting_type" :label="item.meeting_type" :value="item.meeting_type_code">
                  </el-option>
                </el-select>
              </li>
              <li><span>布展:</span><input/></li>
              <li><span>备注:</span><input/></li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul>
              <li><span>预定名称:</span><input/></li>
              <li><span>开始时间:</span>
                <el-date-picker v-model="datetime_begin" type="datetime" size="mini" style="width: 50%" placeholder="选择开始时间">
                </el-date-picker>
              </li>
              <li><span>结束时间:</span>
                <el-date-picker v-model="datetime_end" type="datetime" size="mini" style="width: 50%" placeholder="选择结束时间">
                </el-date-picker>
              </li>
              <li><span>人数:</span><input/></li>
              <li><span>场地:</span><input v-model="rsv_place" disabled/></li>
              <li><span>费用:</span><input/></li>
              <li><span>折展:</span><input/></li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul>
              <li><span>销售员:</span><input v-model="sale_man" @click="dialogVisible_sale_man = true;Get_sale_man()" /></li>
              <li><span>联系人:</span><input/></li>
              <li><span>联系电话:</span><input/></li>
              <li><span>桌数:</span><input/></li>
              <li><span>协议单位:</span><input @click="dialogVisible_bargaining = true" /></li>
              <li><span>综合费用:</span><input/></li>
            </ul>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24" style="text-align: right">
            <ul>
              <li><span>创建:</span><span></span><span>修改:</span><span></span></li>
              <li><span>会议相关:</span>
                <span style="color: #4488E9" @click="dialogVisible_department = true">部门任务</span>
                <span style="color: #4488E9" @click="dialogVisible_feast_list = true">相关资源</span>
                <span style="color: #4488E9" @click="dialogVisible_accessory_list = true">附件</span></li>
            </ul>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="10" style="text-align: left">
            <button @click="dialogVisible_feast = false">退出</button>
            <button>日志</button>
            <button @click="dialogVisible_print = true">打印</button>
          </el-col>
          <el-col :span="14" style="text-align: right">
            <button @click="dialogVisible_current = true">入账</button>
            <button @click="dialogVisible_batch = true">批量处理</button>
            <button>删除</button>
            <button @click="rsv_meeting">保存</button>
            <button>复制</button>
            <button>新建</button>
          </el-col>
        </el-row>
      </el-tabs>
    </el-dialog>
    <!--账户查询-->
    <el-dialog title="账户查询" top="3vh" :visible.sync="dialogVisible_account_query" :close-on-click-modal='false' width="80%">
      <el-table :data="tableData_account_query" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
        <el-table-column prop="date" label="预定号">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="name" label="房号">
        </el-table-column>
        <el-table-column prop="name" label="到达时间">
        </el-table-column>
        <el-table-column prop="name" label="离开时间">
        </el-table-column>
        <el-table-column prop="name" label="余额">
        </el-table-column>
        <el-table-column prop="name" label="信用">
        </el-table-column>
        <el-table-column prop="name" label="备注">
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="3" style="text-align: left">
          <fieldset style="border: 1px solid #CCCCCC;padding: 10px;text-align: left">
            <legend>主单</legend>
            <ul>
              <li>
                <el-radio v-model="radio_account" label="1">散客预订</el-radio>
              </li>
              <li>
                <el-radio v-model="radio_account" label="2">团队主单</el-radio>
              </li>
              <li>
                <el-radio v-model="radio_account" label="3">登记散客</el-radio>
              </li>
              <li>
                <el-radio v-model="radio_account" label="4">团队成员</el-radio>
              </li>
              <li>
                <el-radio v-model="radio_account" label="5">消费账</el-radio>
              </li>
            </ul>
          </fieldset>
        </el-col>
        <el-col :span="3" style=";margin-left: 10px">
          <fieldset style="border: 1px solid #CCCCCC;padding: 10px;text-align: left">
            <legend>状态</legend>
            <ul>
              <li>
                <el-checkbox v-model="checked_live">在住</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked_reserve">预定</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked_leave">离店</el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checked_buyer">挂账</el-checkbox>
              </li>
            </ul>
          </fieldset>
        </el-col>
        <el-col :span="10" style=";margin-left: 10px">
          <fieldset style="border: 1px solid #CCCCCC;padding: 10px;text-align: left">
            <legend>输入条件</legend>
            <el-row>
              <el-col :span="14" class="el-condition">
                <ul>
                  <li><span>名称:</span><input/></li>
                  <li><span>预定号:</span><input/></li>
                  <li><span>房号:</span><input/></li>
                  <li><span>备注:</span><input/></li>
                </ul>
              </el-col>
              <el-col :span="10" style="text-align: left">
                <ul>
                  <li>
                    <el-checkbox v-model="dim_search">模糊匹配</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="written_person">成员/签单人</el-checkbox>
                  </li>
                  <li><button>清空条件</button></li>
                  <li><button>精确查找</button></li>
                </ul>
              </el-col>
            </el-row>
          </fieldset>
        </el-col>
        <el-col :span="6" class="el-fast-search">
          <ul>
            <li><span>快速查找:</span><input style="width: 140px" /></li>
            <li><button>Enter检索</button><button>确定</button><button @click="dialogVisible_account_query = false">退出</button></li>
          </ul>
        </el-col>
      </el-row>
    </el-dialog>
    <!--销售员-->
    <el-dialog title="销售员" :visible.sync="dialogVisible_sale_man" :close-on-click-modal='false' width="40%">
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData_sale_man" @row-dblclick="Row_Get_sale_man" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="id" label="代码">
            </el-table-column>
            <el-table-column prop="user_name" label="姓名">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button>确定</button>
          <button @click="dialogVisible_sale_man = false">取消</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--宴会资源清单-->
    <el-dialog title="宴会资源清单" :visible.sync="dialogVisible_feast_list" :close-on-click-modal='false' width="50%">
      <el-row>
        <el-col :span="12">
          <ul>
            <li><span>预定编号:</span><input/></li>
            <li><span>资源:</span><input/></li>
            <li><span>数量:</span><input/></li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul>
            <li><span>场地:</span><input/></li>
            <li><span>价格:</span><input/></li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <el-table :data="tableData_feast_list" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="date" label="名称">
            </el-table-column>
            <el-table-column prop="name" label="数量">
            </el-table-column>
            <el-table-column prop="name" label="价格">
            </el-table-column>
            <el-table-column prop="name" label="部门">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button>增加</button>
          <button>删除</button>
          <button>编辑</button>
          <button>保存</button>
          <button @click="dialogVisible_feast_list = false">退出</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--附件列表-->
    <el-dialog title="附件列表" :visible.sync="dialogVisible_accessory_list" :close-on-click-modal='false' width="50%">
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData_accessory_list" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="name" label="文件名">
            </el-table-column>
            <el-table-column prop="size" label="大小（K）">
            </el-table-column>
            <el-table-column prop="name" label="创建用户">
            </el-table-column>
            <el-table-column prop="lastModified" label="创建时间">
            </el-table-column>
            <el-table-column prop="name" label="修改用户">
            </el-table-column>
            <el-table-column prop="name" label="修改时间">
            </el-table-column>
            <el-table-column prop="type" label="单据类型">
            </el-table-column>
          </el-table>
          <el-progress :percentage="80" status="success"></el-progress>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <label for="fileinp">
            <input type="button" id="btn" v-model="value_text">
            <input type="file" ref="input" id="fileinp" @click="Get_files">
          </label>
          <button>下载</button>
          <button>删除</button>
          <button @click="dialogVisible_accessory_list = false">退出</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--批量处理-->
    <el-dialog title="批量处理" :visible.sync="dialogVisible_batch" :close-on-click-modal='false' width="60%">
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData_batch" height="400px" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="date" label="状态">
            </el-table-column>
            <el-table-column prop="name" label="场地">
            </el-table-column>
            <el-table-column prop="name" label="开始时间">
            </el-table-column>
            <el-table-column prop="name" label="结束时间">
            </el-table-column>
            <el-table-column prop="name" label="宴会类型">
            </el-table-column>
            <el-table-column prop="name" label="主题">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <ul>
            <li><span>主题：</span><input/></li>
            <li><span>状态：</span><input/></li>
            <li><span>指示牌：</span><input/></li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li><span>预定编号：</span><input/></li>
            <li><span>预定名称：</span><input/></li>
            <li><span>宴会类型：</span><input/></li>
          </ul>
        </el-col>
        <el-col :span="8">
          <ul>
            <li><span>销售员：</span><input/></li>
            <li><span>联系人：</span><input/></li>
            <li><span>联系电话：</span><input/></li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button>保存</button>
          <button @click="dialogVisible_batch = false">取消</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--入账-->
    <el-dialog title="入账" :visible.sync="dialogVisible_current" :close-on-click-modal='false' width="30%">
      <el-row>
        <el-col :span="24" style="text-align: center">
          <ul>
            <li><span>费用:</span><input/></li>
            <li><span>综合费用:</span><input/></li>
            <li><span>入账金额:</span><input/></li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="text-align: right">
          <button>入账</button>
          <button @click="dialogVisible_current = false">退出</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--打印-->
    <el-dialog title="单据打印选择" :visible.sync="dialogVisible_print" :close-on-click-modal='false' width="40%">
      <el-row>
        <el-col :span="8" style="border: 1px solid #CCCCCC">
          <el-table :data="tableData_print" height="350px" :header-cell-style="{background:'#CCCCCC',color:'#333333'}" size="mini" style="width: 100%">
            <el-table-column prop="date" label="宴会单">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16">
          <el-row style="margin-left: 10px;border: 1px solid #CCCCCC">
            <el-col :span="24" style="text-align: center">
              <ul style="margin-top: 20px;margin-bottom: 20px">
                <li><span>语种</span><input/></li>
                <li><span>单号</span><input/></li>
                <el-row>
                  <el-col :span="12" style="text-align: center">
                    <li>
                      <el-radio v-model="radio_print" label="1">预览</el-radio>
                    </li>
                    <li>
                      <el-radio v-model="radio_print" label="3">打印</el-radio>
                    </li>
                    <li>
                      <el-radio v-model="radio_print" label="5">签名</el-radio>
                    </li>
                  </el-col>
                  <el-col :span="12" style="text-align: left">
                    <li>
                      <el-radio v-model="radio_print" label="2">Word</el-radio>
                    </li>
                    <li>
                      <el-radio v-model="radio_print" label="4">Excel</el-radio>
                    </li>
                    <li>
                      <el-radio v-model="radio_print" label="6">PDF</el-radio>
                    </li>
                  </el-col>
                </el-row>

                <li><span>打印份数：</span><input type="number" /></li>
              </ul>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="24" style="text-align: right">
              <button>确定</button>
              <button @click="dialogVisible_print = false">关闭</button>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </el-dialog>
    <!--部门任务-->
    <el-dialog title="部门任务" :visible.sync="dialogVisible_department" :close-on-click-modal='false' width="50%">
      <el-row>
        <el-col :span="24">
          <ul>
            <li>
              <el-checkbox v-model="checked_protocol"><span>礼宾</span><textarea style="width: 300px;height: 80px;"></textarea></el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked_proscenium"><span>前台</span><textarea style="width: 300px;height: 80px;"></textarea></el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked_guest"><span>客房</span><textarea style="width: 300px;height: 80px;"></textarea></el-checkbox>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <button>保存</button>
          <button @click="dialogVisible_hotel_sector = true">增加</button>
          <button>删除</button>
          <button @click="dialogVisible_department = false">退出</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--协议单位档案查找-->
    <el-dialog title="协议单位档案查找" top="2vh" :visible.sync="dialogVisible_bargaining" :close-on-click-modal='false' width="80%">
      <el-row style="margin-top: -20px">
        <el-col :span="24">
          <el-table :data="tableData_bargaining" height="400px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="date" label="名称">
            </el-table-column>
            <el-table-column prop="name" label="人工编号">
            </el-table-column>
            <el-table-column prop="name" label="房价码">
            </el-table-column>
            <el-table-column prop="name" label="佣金码">
            </el-table-column>
            <el-table-column prop="name" label="来源码">
            </el-table-column>
            <el-table-column prop="name" label="市场码">
            </el-table-column>
            <el-table-column prop="name" label="备注">
            </el-table-column>
            <el-table-column prop="name" label="电话">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="9">
          <el-tabs v-model="active_bargaining" type="card" @tab-click="handleClick_bargaining">
            <el-tab-pane label="基本信息" name="base">
              <el-row>
                <el-col :span="12">
                  <ul>
                    <li><span>名称:</span><input/></li>
                    <li><span>名称:</span><input/></li>
                    <li><span>房价码:</span><input/></li>
                    <li><span>地址:</span><input/></li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <ul>
                    <li><span>合同编号:</span><input/></li>
                    <li><span>销售员:</span><input/></li>
                    <li><span>佣金码:</span><input/></li>
                    <li><span>备注:</span><input/></li>
                  </ul>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="预定/登记" name="prep">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableData_bargaining_prep" height="200px" :header-cell-style="{background:'#68819E',color:'#FFF'}" size="mini" style="width: 100%">
                    <el-table-column prop="date" label="类型">
                    </el-table-column>
                    <el-table-column prop="name" label="状态">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="name" label="到达">
                    </el-table-column>
                    <el-table-column prop="name" label="离开">
                    </el-table-column>
                    <el-table-column prop="name" label="房型">
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="14" style="margin-left: 10px">
          <fieldset style="border: 1px solid #CCCCCC;padding: 10px;text-align: left">
            <legend>查询</legend>
            <el-row>
              <el-col :span="10">
                <ul>
                  <li><span>名称:</span><input/></li>
                  <li><span>查询:</span><input/></li>
                  <li><span>国家:</span><input/></li>
                  <li><span>电话:</span><input/></li>
                </ul>
              </el-col>
              <el-col :span="10">
                <ul>
                  <li><span>人工编号:</span><input/></li>
                  <li><span>城市:</span><input/></li>
                  <li><span>档案号:</span><input/></li>
                  <li><span>邮箱:</span><input/></li>
                </ul>
              </el-col>
              <el-col :span="4">
                <ul>
                  <li><button>查询</button></li>
                  <li>
                    <el-checkbox v-model="checked_group_search">集团检索</el-checkbox>
                  </li>
                </ul>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="12" style="text-align: left">
                <button>新建</button>
                <button>编辑</button>
                <button>菜单</button>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <button>清除条件</button>
                <button>确定</button>
                <button @click="dialogVisible_bargaining = false">退出</button>
              </el-col>
            </el-row>
          </fieldset>
        </el-col>

      </el-row>
    </el-dialog>
    <!--状态查询-->
    <el-dialog title="状态列表" :visible.sync="dialogVisible_search_status" :close-on-click-modal='false' width="40%">
      <el-row>
        <el-col :span="24" style="border: 1px solid #CCCCCC">
          <el-table @row-dblclick="Get_status" :data="tableData_serach_status" height="350px" :header-cell-style="{background:'#303A41',color:'#FFF'}" size="mini" style="width: 100%">
            <el-table-column prop="code" label="代码">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
    <!--宴会详情页-->
    <el-dialog title="预定详情" :visible.sync="dialogVisible_search_detials" :close-on-click-modal='false' width="40%">
        <el-tabs style="margin-top: -20px" v-model="activeName_feast" type="card" @tab-click="handleClick">
          <el-row style="margin-top: 10px">
            <el-col :span="8">
              <ul>
                <li><span>预定编号:</span><input/></li>
                <li><span>宴会编号:</span><input/></li>
                <li><span>主题:</span><input/></li>
                <li><span>状态:</span>
                  <el-select @focus="select_status_click" v-model="select_status" placeholder="请选择" size="mini" style="width: 50%">
                    <el-option v-for="item in options_status" :key="item.value" :label="item.meeting_status" :value="item.meeting_status_code">
                    </el-option>
                  </el-select>
                </li>
                <li><span>指示牌:</span><input/></li>
                <li><span>宴会类型:</span>
                  <el-select @focus="select_meeting_type" v-model="select_feast_type" placeholder="请选择" size="mini" style="width: 50%">
                    <el-option v-for="item in options_feast_type" :key="item.meeting_type" :label="item.meeting_type" :value="item.meeting_type_code">
                    </el-option>
                  </el-select>
                </li>
                <li><span>布展:</span><input/></li>
                <li><span>备注:</span><input/></li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul>
                <li><span>预定名称:</span><input/></li>
                <li><span>开始时间:</span>
                  <el-date-picker v-model="datetime_begin" type="datetime" size="mini" style="width: 50%" placeholder="选择开始时间">
                  </el-date-picker>
                </li>
                <li><span>结束时间:</span>
                  <el-date-picker v-model="datetime_end" type="datetime" size="mini" style="width: 50%" placeholder="选择结束时间">
                  </el-date-picker>
                </li>
                <li><span>人数:</span><input/></li>
                <li><span>场地:</span><input v-model="rsv_place" disabled/></li>
                <li><span>费用:</span><input/></li>
                <li><span>折展:</span><input/></li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul>
                <li><span>销售员:</span><input/></li>
                <li><span>联系人:</span><input/></li>
                <li><span>联系电话:</span><input/></li>
                <li><span>桌数:</span><input/></li>
                <li><span>协议单位:</span><input/></li>
                <li><span>综合费用:</span><input/></li>
              </ul>
            </el-col>
          </el-row>
        </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "meetsteward",
    data() {
      return {
        activeName: 'ward_list', //状态切换
        activeName_feast: 'ward_status_feast', //宴会的状态切换
        loading: true, // loading状态
        tableData_ward_list: [], //预定列表
        tableData_ward_status: [],
        currentPage: 1, //当前页码
        page_size: 10, //每页显示数量
        total: 0, //总数
        url: 'http://47.98.113.173', //url
        base_title: [], //动态修改表头
        days: [{
          value: 1,
          label: '1天'
        }, {
          value: 3,
          label: '3天'
        }, {
          value: 5,
          label: '5天'
        }, {
          value: 7,
          label: '7天'
        }, {
          value: 15,
          label: '15天'
        }, {
          value: 30,
          label: '30天'
        }],
        select_days: 7,
        value_day: new Date(),
        value_date: new Date(), //选择日期
        value_dateVal: new Date(), //选择日期
        /**
         * 场地设置
         */
        show_resource_flag: true,
        disabled_parent_hall: true,
        disabled_hall_name: true,
        disabled_site_name2: true,
        disabled_site_area: true,
        disabled_site_cost: true,
        disabled_site_sort: true,
        disabled_site_remark: true,
        rsv_place : '',//场地
        site_Edit_flag: false, //判断是编辑还是新增
        site_index: '', //当前行 用来删除数据
        site_id: '', // id用来删除和更新
        site_code: '',
        parent_hall: '',
        hall_name: '',
        site_name2: '',
        site_area: '',
        site_cost: '',
        site_sort: '',
        site_remark: '',
        resource_code: '', //代码
        resource_name: '', //名字
        resource_dept: '', //部门
        /**
         * dialog
         */
        dialogVisible_site: false,//场地设置
        meeting_name : '',//会场名字
        meeting_code : '',//会场代码
        meeting_halls : '',//会场id
        meeting_begin_time : '',//会场开始预定时间
        meeting_end_time : '',//会场预定结束时间
        tableData_site: [], //场地设置的table
        dialogVisible_search: false, //组合查询
        options_ser_place: [], //组合查询的场地管理的选择框
        value_search_begin: '', //开始时间
        value_search_end: '', //结束时间
        dialogVisible_resource: false, //资源管理
        tableData_resource_type: [{
          'id': 0,
          'code': '纯会议'
        }, {
          'id': 1,
          'code': '纯用餐'
        }, {
          'id': 2,
          'code': '综合'
        }, {
          'id': 3,
          'code': '婚宴'
        }, ], //资源管理类别table
        resource_id: '',
        resource_type: '',
        tableData_resource: [], //资源管理
        value_resources_dept: '', //绑定的部门
        value_resource_dept_select: [], //部门的选择
        delete_resource_flag: false, //删除的按钮只有点击某一条编辑的时候才会出现
        add_info_resource_flag: true, //默认的是可以增加的
        save_resource_flag: false, //默认的是不显示的
        add_resource_flag: true, //默认的是不可以新增的
        value_resources: '', //资源类型的选择
        value_resource_select: [], //绑定的资源类型的数组
        tableData_hotel_sector: [], //酒店部门
        dialogVisible_hotel_sector: false, //酒店部门
        dialogVisible_feast: false, //宴会
        dialogVisible_account_query: false, //账户查询
        tableData_account_query: [], //账户查询
        radio_account: '1', //主单 单选按钮
        checked_live: true, //在住
        checked_reserve: false, //预定
        checked_leave: false, //离店
        checked_buyer: true, //挂账
        dim_search: '', //模糊匹配
        written_person: '', //成员/签单人
        dialogVisible_sale_man: false, //销售员
        tableData_sale_man: [], //销售员
        datetime_begin: '', //开始时间
        datetime_end: '', //结束时间
        select_status: '', //状态
        options_status: [], //绑定的下拉框状态
        select_feast_type: '', //宴会类型
        options_feast_type: [{meeting_type_code : 0,meeting_type : '纯会议'},{meeting_type_code : 1,meeting_type : '纯用餐'},{meeting_type_code : 2,meeting_type : '综合'},{meeting_type_code : 3,meeting_type : '婚宴'}], //绑定的下拉框的宴会类型 0:纯会议 1:纯用餐 2:综合 3.婚宴
        dialogVisible_feast_list: false, //宴会资源清单
        tableData_feast_list: [], //宴会资源清单表格
        dialogVisible_accessory_list: false, //附件列表
        tableData_accessory_list: [], //附件列表table
        dialogVisible_batch: false, //批量处理
        tableData_batch: [], //批量处理table
        dialogVisible_current: false, //入账
        dialogVisible_print: false, //打印
        tableData_print: [], //打印table
        radio_print: '6', //打印
        dialogVisible_department: false, //部门任务
        checked_protocol: false, //礼宾
        checked_proscenium: false, //前台
        checked_guest: true, //客房
        dialogVisible_bargaining: false, //协议单位
        tableData_bargaining: [], //协议单位Table
        active_bargaining: 'base', //基本信息
        checked_group_search: false, //集团检索
        tableData_bargaining_prep: [], //预定/登记
        fileList: [], //文件上传
        value_text: '选择文件', //input绑定的值
        /**
         * dialog 绑定的值
         */
        sale_man: '', //销售员
        status_data: [], //预定的时候状态的数组
        meeting_type: [], //预定的时候宴会类型的数组
        /**
         * 详情的页面
         */
        dialogVisible_search_detials : false,
        /**
         * 组合查询
         */
        ser_code: '',
        ser_theme: '',
        ser_res_name: '',
        ser_status: '',
        ser_place: '',
        label_flag: '', //点击的时候将最新的label的数据拿到，用来判断进行的是哪一个查询的。
        dialogVisible_search_status: false,
        tableData_serach_status: [{
          code: 1,
          status: 'Waiting'
        }, {
          code: 2,
          status: '不确定'
        }, {
          code: 3,
          status: '确定'
        }, {
          code: 4,
          status: '取消'
        }, {
          code: 5,
          status: '删除'
        }, {
          code: 6,
          status: '维修'
        }, {
          code: 7,
          status: '担保'
        }, {
          code: 8,
          status: '自用'
        }, {
          code: 0,
          status: '空闲'
        }, ], //组合查询状态表
      }
    },
    created: function() {
      let that = this;
      console.info(that.value_day);
      that.change_days(that.value_date);
      that.get_meeting_list();

    },
    methods: {
      /**
       * @show_detials 展示预定的详情信息，用户双击
       */
      show_detials(row){
        console.info(row);
      },
      /**
       * @get_meeting_list  拿到预定列表信息
       */
      get_meeting_list() {
        let that = this;
        let url = that.url + ':9503/v1/meeting/base/list';
        that.$axios({
          method: 'post',
          url: url
        }).then((res) => {
          console.info(res);
          that.total = res.data.data.total_count; //list总数
          that.tableData_ward_list = res.data.data.list;
          /**
           * 将数据缓存到本地，为了后面的option可以直接拿到该数
           */
          sessionStorage.setItem('base_data', JSON.stringify(res.data.data.list));
          console.info(JSON.parse(sessionStorage.getItem('base_data')));
        }).catch((err) => {
          console.info(err);
        })
      },
      /**
       * @group_search 组合查询 查询的是预定的状态的表
       */
      group_search() {
        let that = this;
        console.info(that.label_flag);
        console.info(that.select_feast_type);
        let url = that.label_flag === '预定列表' ? that.url + ':9503/v1/meeting/base/search' : that.url + ':9503/v1/meeting/base/search';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            code: that.ser_code ? that.ser_code : undefined,
            topic: that.ser_theme ? that.ser_theme : undefined,
            name: that.ser_res_name ? that.ser_res_name : undefined,
            status: that.ser_status ? that.ser_status : undefined,
            hall_id: that.ser_place ? that.ser_place : undefined,
            meeting_type : that.select_feast_type === 0 ? that.select_feast_type : undefined,
            salesman_id: that.sale_man ? that.sale_man : undefined,
            from_date: that.value_search_begin ? that.value_search_begin : undefined,
            to_date: that.value_search_end ? that.value_search_end : undefined,
          }
        }).then((res) => {
          console.info(res);
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @Get_status 获取所有的状态
       */
      Get_status(row) {
        let that = this;
        that.ser_status = row.code;
        that.dialogVisible_search_status = false;
      },
      /**
       * @select_dept 获取到部门的列表显示
       */
      select_dept() {
        let that = this;
        let url = that.url + ':9519/v1/common/dept/info_list';
        that.$axios({
          method: 'get',
          url: url
        }).then((res) => {
          console.info(res);
          that.value_resource_dept_select = res.data.data.list;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @handleCurrentChange_list 预定列表的分页
       */
      handleCurrentChange_list(currentPage ) {
        console.info(currentPage);
        let that = this;
        let url = that.url + ':9503/v1/meeting/base/list';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page_num: currentPage,
            page_size: 10
          }
        }).then(function(res) {
          console.info(res);
          that.tableData_ward_list = res.data.data.list;
        }).catch(function(err) {
          console.info(err);
        })
      },
      /**
       * @Get_sale_man 获取销售员
       * @param page_size ：10000
       * 默认的是十条数据，但是这里不做任何的分页，所以直接就拿到一万条数据，默认是公司员工不超过一万人！
       */
      Get_sale_man() {
        let that = this;
        let url = that.url + ':9519/v1/common/employee/info_list?page_size=10000';
        that.$axios({
          method: 'get',
          url: url
        }).then((res) => {
          console.info(res);
          that.tableData_sale_man = res.data.data.list;
        }).catch((err) => {
          console.info(err);
        })
      },
      /**
       * @getsite 获取场地管理
       */
      get_site() {
        let that = this;
        let url = that.url + ':9503/v1/meeting/hall/list';
        that.$axios({
          method: 'get',
          url: url
        }).then((res) => {
          that.tableData_site = res.data.data.list;
          console.info(res);
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @get_resource_list 获取资源管理列表
       */
      get_resource_list() {
        let that = this;
        let url = that.url + ':9503/v1/resource/type/list';
        that.$axios({
          method: 'get',
          url: url
        }).then((res) => {
          that.tableData_resource_type = res.data.data.list;
          console.info(res.data.data.list);
          that.value_resource_select = res.data.data.list.map((res, index) => {
            return {
              label: res.name,
            }
          })
          console.info(that.value_resource_select);
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @getsite 获取资源管理详情
       */
      get_resource(row) {
        let that = this;

        /**
         * 将resource_id 拿到，拿到的就是用户点击的那一行数据
         */
          that.resource_type = row.name;
          that.show_resource_flag = true;
          that.edit_resource_flag = false; //当前处于编辑状态
          that.delete_resource_flag = false;
          that.delete_resource_flag = false, //删除的按钮只有点击某一条编辑的时候才会出现
          that.add_info_resource_flag = true, //默认的是可以增加的
          that.save_resource_flag = true, //默认的是不显示的
          console.info(that.resource_type);
        let url = that.url + ':9503/v1/resource/base/list/resource_type_id=' + row.id;
        that.$axios({
          method: 'get',
          url: url
        }).then((res) => {
          /**
           * 将拿到的数据赋值到新的table中
           */
          that.tableData_resource = res.data.data.list;
          console.info(res);
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @get_resource_details 获取每一条数据的详情
       */
      get_resource_details(row) {
        let that = this;
          that.resource_id = row.id;
          that.value_resources = that.resource_type;
          that.show_resource_flag = false;
          that.edit_resource_flag = true; //当前处于编辑状态
          that.delete_resource_flag = true;
          that.delete_resource_flag = true, //删除的按钮只有点击某一条编辑的时候才会出现
          that.add_info_resource_flag = false, //默认的是可以增加的
          that.save_resource_flag = true, //默认的是不显示的
          that.resource_code = row.code;
          that.resource_name = row.name;
          that.resource_dept = row.dept_id;
          console.info(that.resource_id);
      },
      /**
       * @save_resource 保存资源
       */
      save_resource() {
        let that = this;
        that.show_resource_flag = true;
        console.info(that.edit_resource_flag);
        let url = that.edit_resource_flag ? that.url + ':9503/v1/resource/base/update/' + that.resource_id : that.url + ':9503/v1/resource/base/add'; //判断当前的保存是处于编辑还是新增的状态\
        that.$axios({
          method: 'post',
          url: url,
          data: {
            code: that.resource_code,
            name: that.resource_name,
            dept_id: that.resource_dept,
            resource_type: that.value_resources_dept
          }
        }).then((res) => {
            console.info(res);
          if(res.data.message === 'success') {
            that.hintInfo('success', '操作成功！');
          } else {
            that.hintInfo('warning', '操作失败！');
          }
        }).catch((err) => {
            console.error(err);
        })
      },
      /**
       * @add_resource 新增资源
       */
      add_resource() {
        let that = this;
          that.value_resources = that.resource_type;
          console.info(that.value_resources);
        if(!that.value_resources) {
          that.hintInfo('warning', '请选择需要增加的资源类型！');
          return;
        } else {
          that.show_resource_flag = false;
          that.edit_resource_flag = false; // 当前处于新增状态
          that.resource_code = ''; //代码
          that.resource_name = ''; //名字
          that.resource_dept = ''; //部门
        }
        /**
         * 将输入的数据给后端
         */
      },
      /**
       * @delete_resource 删除资源
       */
      delete_resource() {
        let that = this;
        let url = that.url + ':9503/v1/resource/base/delete/' + that.resource_id;
        that.$axios({
          method: 'post',
          url: url
        }).then((res) => {
          if(res.data.message === 'success') {
            that.hintInfo('success', '删除成功');
          } else {
            that.hintInfo('warning', '删除失败');
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @site_click 点击table的某一行
       */
      site_edit_click(row) {
        let that = this;
          that.site_Edit_flag = true;
          that.site_id = row.id;
          that.site_index = row.index;
          that.site_code = row.code,
          that.parent_hall = row.site_code, // 父厅目前没有
          that.hall_name = row.hall_name,
          that.site_name2 = row.site_code, //name2目前没有
          that.site_area = (row.height * row.width), //面积是计算出来的
          that.site_cost = row.site_code, //费用没有
          that.site_sort = row.list_order,
          that.site_remark = row.remark
      },
      /**
       * @edit_site_click 将标志位重置
       */
      edit_site_click() {
        let that = this;
          that.site_Edit_flag = true;
          that.disabled_parent_hall = false,
          that.disabled_hall_name = false,
          that.disabled_site_name2 = false,
          that.disabled_site_area = false,
          that.disabled_site_cost = false,
          that.disabled_site_sort = false,
          that.disabled_site_remark = false
      },
      /**
       * @save_site_click 保存场地设置
       */
      save_site_click() {
        let that = this;
        let url;
        if(that.site_Edit_flag === true) {
          url = that.url + ':9503/v1/meeting/hall/update/' + that.site_id;
        } else {
          url = that.url + ':9503/v1/meeting/hall/add'
        }
        that.$axios({
          method: 'post',
          url: url,
          data: {
            /**
             * @param  code  hall_name 这两个是必传参数
             */
            code: that.site_code,
            hall_name: that.hall_name,
          }
        }).then((res) => {
          console.info(res);
            that.get_site();
            that.tableData_site.splice(that.index, 1);
            that.disabled_parent_hall = true,
            that.disabled_hall_name = true,
            that.disabled_site_name2 = true,
            that.disabled_site_area = true,
            that.disabled_site_cost = true,
            that.disabled_site_sort = true,
            that.disabled_site_remark = true
        }).catch((err) => {
            console.error(err);
        })
      },
      /**
       * @delete_site_click 删除场地设置
       */
      delete_site_click() {
        let that = this;
        let url = that.url + ':9503/v1/meeting/hall/delete/' + that.site_id;
        that.$axios({
          method: 'post',
          url: url
        }).then((res) => {
          console.info(res);
            that.site_code = '',
            that.parent_hall = '', // 父厅目前没有
            that.hall_name = '',
            that.site_name2 = '', //name2目前没有
            that.site_area = '', //面积是计算出来的
            that.site_cost = '', //费用没有
            that.site_sort = '',
            that.site_remark = ''
            that.tableData_site.splice(that.index, 1);

        }).catch((err) => {
          console.error(err);
        })

      },
      /**
       * @add_site_click 新增场地设置
       */
      add_site_click() {
        let that = this;
        that.site_Edit_flag = false;
        that.site_code = '',
          that.parent_hall = '', // 父厅目前没有
          that.hall_name = '',
          that.site_name2 = '', //name2目前没有
          that.site_area = '', //面积是计算出来的
          that.site_cost = '', //费用没有
          that.site_sort = '',
          that.site_remark = ''
          that.disabled_parent_hall = false,
          that.disabled_hall_name = false,
          that.disabled_site_name2 = false,
          that.disabled_site_area = false,
          that.disabled_site_cost = false,
          that.disabled_site_sort = false,
          that.disabled_site_remark = false
      },
      /**
       * @Row_Get_sale_man 点击表格的某一行的时候将数据赋值给销售员的input，同时将table关闭
       */
      Row_Get_sale_man(row) {
        console.info(row);
        let that = this;
        that.sale_man = row.user_name;
        that.dialogVisible_sale_man = false;
      },
      /**
       * @Get_files 文件上传
       */
      Get_files($event) {
        let that = this;
        that.fileList = $event.target.files[0];
        console.log(that.fileList);
        that.tableData_accessory_list = that.fileList;
        console.info(that.tableData_accessory_list);
      },
      /**
       * @handleClick_bargaining 协议单位tab切换
       */
      handleClick_bargaining(tab, event) {
        console.info(tab, event);
      },
      /**
       * @handleSelectionChange 批量处理表格的选择
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /**
       * @cell_click 点击某一个单元格触发函数
       */
      /*cell_click(row, column, cell, event) {
        let that = this;
        /!**
         * 将用户点击的值赋值给当前点击的表格
         * @type {string|*}
         *!/
        let srart_time = '';
        let end_time = '';
        if(column.label === '上午'){
           srart_time = '00:00:00';
           end_time = '11:59:59'
        }else{
           srart_time = '12:00:00';
           end_time = '23:59:59'
        }
        console.log(cell);
        cell.innerHTML = row.hall_name;
        //document.getElementById("column.id").value = row.hall_name;
        that.rsv_place = row.hall_name;
        that.meeting_name = row.hall_name;
        that.meeting_code = row.code;
        that.meeting_halls = row.id;
        that.meeting_begin_time = column.filterPlacement + " " + srart_time;
        that.meeting_end_time = column.filterPlacement + " " + end_time;
        if(event.isTrusted) {
          that.rowClass();
        }
      },*/
      /**
       * @rsv_metting 预定会场
       */
      rsv_meeting(){
         let that = this;
         let url = that.url + ':9503/v1/meeting/base/add';
         that.$axios({
             method : 'post',
             url : url,
             data : {
              name : that.meeting_name,
              code : that.meeting_code,
              halls : that.meeting_halls,
              begin_time : that.meeting_begin_time,
              end_time : that.meeting_end_time
             }
         }).then((res)=>{
             if(res.data.message === 'success'){
                that.hintInfo('success','预订成功！');
                that.dialogVisible_feast = false;
             }else{
                that.hintInfo('warning','预订失败！');
             }
         }).catch((err)=>{
             console.error(err);
         })
      },
      /**
       * @select_meeting_type 选择宴会类型的操作
       */
      select_meeting_type() {
        let that = this;
        let obj = [];
        obj = JSON.parse(sessionStorage.getItem('base_data'));
        console.info(obj);
        that.status_data = obj.map((res, index) => {
          console.info(res.meeting_type);
          let meeting_type_label;
          if(res.meeting_type === 0) {
            meeting_type_label = '纯会议'
          } else if(res.meeting_type === 1) {
            meeting_type_label = '纯用餐'
          } else if(res.meeting_type === 2) {
            meeting_type_label = '综合'
          } else if(res.meeting_type === 3) {
            meeting_type_label = '婚宴'
          } else {
            meeting_type_label = null
          }
          return {
            meeting_type_code: res.meeting_type,
            meeting_type: meeting_type_label
          }
        });
        console.info(that.status_data);
        that.options_feast_type = that.status_data;
      },
      /**
       * @select_status 选择状态的操作
       */
      select_status_click() {
        let that = this;
        let obj = [];
        obj = JSON.parse(sessionStorage.getItem('base_data'));
        console.info(obj);
        that.status_data = obj.map((res, index) => {
          console.info(res.status);
          let meeting_status;
          if(res.status === 0) {
            meeting_status = '洽谈'
          } else if(res.status === 1) {
            meeting_status = '预定'
          } else if(res.status === 2) {
            meeting_status = '付定金'
          } else if(res.status === 3) {
            meeting_status = '执行中'
          } else if(res.status === 4) {
            meeting_status = '欠费'
          } else if(res.status === 5) {
            meeting_status = '已结账'
          } else {
            meeting_status = null
          }
          return {
            meeting_status_code: res.status,
            meeting_status: meeting_status
          }
        });
        console.info(that.status_data);
        that.options_feast_type = that.status_data;
      },
      /**
       * @rowClass 改变table的样式
       */
      rowClass(row) {
        if(row) {
          //return 'border-color:rgb(148,0,211)';
        }
      },
      get_hall_room_status(){
        let that = this;
        let url = that.url + ':9503/v1/meeting/base/search_occupied';
        that.$axios({
            method : 'post',
            url : url,
            data : {
              from_time : that.value_date ? that.value_date : new Date(),
              days : that.select_days ? that.select_days : 7
            }
        }).then((res)=>{
           console.info(res);
           that.tableData_ward_status = res.data.data;
        }).catch((err)=>{
           console.error(err);
        })
      },
      /**
       * @date_change
       */
      change_dates() {
        let that = this;
        console.info(that.value_date);
        that.change_days();
        that.get_hall_room_status();
      },
      /**
       * @change_days 改变table的表头数量
       */
      change_days() {
        let that = this;
        that.base_title = [];
        let Max_length = that.select_days;
        console.log(Max_length);
        for(let i = 0; i < Max_length; i++) {
          let param = {
            label: that.getDay(i) + "" + (that.getWeek(that.getDay(i).toString())),
            data_time : that.getDay(i)
          };
          that.base_title.push(param);
        }
        console.info(that.base_title);
      },
      /**
       * @getDay 获取日期
       * @doHandleMonth
       * @getWeek 获取当前星期
       */
      getDay(day) {
        let that = this;
        let value_day = new Date();
        let target_day_milliseconds = '';
        that.value_date ? target_day_milliseconds= that.value_date.getTime() + 1000*60*60*24*day :  target_day_milliseconds= value_day.getTime() + 1000*60*60*24*day;//判断时间是不是存在的
        value_day.setTime(target_day_milliseconds);
        let tYear = value_day.getFullYear();
        let tMonth = value_day.getMonth();
        let tDate = value_day.getDate();
        tMonth = that.doHandleMonth(tMonth + 1);
        tDate = that.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
      },
      getWeek(dateString) {
        let weekArray = ["(星期日)", "(星期一)", "(星期二)", "(星期三)", "(星期四)", "(星期五)", "(星期六)"];
        return weekArray[new Date(dateString).getDay()];
      },
      doHandleMonth(month) {
        let m = month;
        if(month.toString().length === 1) {
          m = "0" + month;
        }
        return m;
      },
      /**
       * @handleClick tab切换的函数 最外层的预定列表和预定状态以及预定时间段的切换
       */
      handleClick(tab, event) {
        /**
         * 根据tab.label来判断用户点击是什么
         */
        let that = this;
        that.label_flag = tab.label;
        if(tab.label === '预定列表') {
          that.get_meeting_list();
        } else if(tab.label === '预定状态') {
          /**
           * 这里是需要调预定状态的接口
           * @get_hall_room_status  获取的是预定的状态信息
           */
          that.get_hall_room_status();
          /*let url = that.url + ':9503/v1/meeting/hall/list';
          that.$axios({
            method: 'get',
            url: url
          }).then((res) => {
            console.info(res);
            that.tableData_ward_status = res.data.data.list;
            /!**
             * 可以直接拿id
             * @type {{hall_name: (string|*), hall_id: *}[]}
             *!/
            that.options_ser_place = res.data.data.list.map((res, index) => {
              return {
                hall_name: res.hall_name,
                hall_id: res.id,
              }
            });
            console.info(res);
          }).catch((err) => {
            console.error(err);
          });*/
        } else {}
        console.log(tab, event);
      },
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
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

<style scoped lang="less">
  body {
    font-size: 0.8vw;
  }

  .el-card {
    width: 94vw;
    height: 90vh;
    .el-tabs {
      margin-left: -0.8vw;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #FFFFFF;
      button {
        height: 4vh;
        width: 5vw;
        color: #ffffff;
        font-size: 0.8vw;
        line-height: 4vh;
        border: none;
        border-radius: 0.3vw;
        background: #4488E9;
      }
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }

  .el-dialog {
    .el-row {
      .el-col {
        text-align: center;
        span {
          display: inline-block;
          width: 40px;
        }
        .el-condition {
          ul {
            li {
              span {
                display: inline-block;
                width: 70px;
                text-align: left;
              }
              input {
                width: 140px;
              }
            }
          }
        }
        ul {
          li {
            margin-top: 10px;
            span {
              display: inline-block;
              width: 70px;
              text-align: left;
            }
            span:hover {
              cursor: pointer;
            }
            input {
              width: 50%;
              height: 27px;
              border-radius: 4px;
              border: 1px solid #CCCCCC;
            }
          }
        }
        button {
          width: 80px;
          height: 30px;
          border: none;
          border-radius: 4px;
          background: #4488E9;
          color: #fff;
          margin-left: 10px;
        }
        label {
          position: relative;
        }
        #fileinp {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
        #btn {
          width: 80px;
          height: 30px;
          border: none;
          border-radius: 4px;
          background: #4488E9;
          color: #fff;
          margin-left: 10px;
        }
        #text {
          color: red;
        }
      }
    }
  }
</style>
