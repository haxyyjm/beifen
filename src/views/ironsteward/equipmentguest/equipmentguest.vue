<template>
  <!--客房设备方案-->
  <div class=" equipmentguest">
    <el-row>
      <!-- 左部 -->
      <el-col :span="4" class="leftNav">
        <div class="hotel_num">
          <p>酒店编号：</p>
          <el-input
            placeholder="请输入内容"
            v-model="hotel_data.hid"
            clearable disabled>
          </el-input>
        </div>
        <div class="hotel_num" style="padding-bottom: 10px;">
          <p>酒店名称：</p>
          <el-input
            placeholder="请输入内容"
            v-model="hotel_data.hotel_name"
            clearable disabled>
          </el-input>
        </div>
        <hr>
        <!-- 客控 -->
        <div class="hotel_num hotel_num_2" style="margin-top: 10px;">
          <div class="title">1.邦奇客控：</div>
          <div class="url">服务器地址：</div>
          <el-input
            placeholder="请输入内容"
            v-model="hotel_data.bangqi_url"
            clearable>
          </el-input>
          <div class="url">云端/本地：</div>
          <el-input placeholder="云端" v-if="hotel_data.bq_in_cloud" disabled clearable></el-input>
          <el-input placeholder="本地" v-else clearable disabled></el-input>
        </div>
        <!-- 豪力士门锁： -->
        <div class="hotel_num hotel_num_2">
          <div class="title">2.豪力士门锁：</div>
          <div class="url">服务器地址：</div>
          <el-input
            placeholder="请输入内容"
            v-model="hotel_data.hls_url"
            clearable>
          </el-input>
          <div class="url">云端/本地：</div>
          <el-input placeholder="云端" v-if="hotel_data.hls_in_cloud" disabled clearable></el-input>
          <el-input placeholder="本地" v-else clearable disabled></el-input>
        </div>
        <!-- 梯控： -->
        <div class="hotel_num hotel_num_2" >
          <div class="title">3.梯控：</div>
          <div class="url">服务器地址：</div>
          <el-input
            placeholder="请输入内容"
            v-model="hotel_data.samsung_ac_url"
            clearable>
          </el-input>
          <div class="url">云端/本地：</div>
          <el-input placeholder="云端" v-if="hotel_data.samsung_in_cloud" disabled clearable></el-input>
          <el-input placeholder="本地" v-else clearable disabled></el-input>

        </div>
        <!-- 按钮 -->
        <div style="margin-top: 20px;text-align: center;">
          <!-- 保存 -->
          <!-- <el-button size="small" type="primary" style="background-color: #4488E9;">创建</el-button> -->
          <!-- 取消 -->
          <el-button size="small" type="primary" style="background-color: #68819E;">取消</el-button>
          <!-- 保存 -->
          <el-button size="small" @click="update_hotel(hotel_data.hid)"  type="primary" style="background-color: #4488E9;">保存</el-button>
        </div>

      </el-col>
      <!-- 右部 -->
      <el-col  class="rightNav">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <!-- 设备方案设置 -->
          <el-tab-pane label="设备方案设置" name="first">
            <el-row>
              <!-- 左部 -->
              <el-col :span="6" class="eq_Project">
                <div class="hotel_num hotel_num_3">
                  <p>房型：</p>
                  <el-select v-model="form.region" placeholder="请选择内容" >
                    <el-option v-for="item in roomTypeList" :key="item.value"
                               :label="item.room_type_name"
                               :value="item.room_type_name">
                    </el-option>
                  </el-select>
                </div>
                <div class="hotel_num hotel_num_3">
                  <p>房间：</p>
                  <el-select v-model="add_cs_form.room_list" multiple collapse-tags placeholder="请选择内容">
                    <el-option v-for="item in roomList" :key="item.value"
                               :label="item.room_number"
                               :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="hotel_num hotel_num_3">
                  <p>设备方案：</p>
                  <el-select v-model="add_cs_form.control_scheme" placeholder="请选择内容" @change='check_cs_scheme()'>
                    <el-option v-for="item in schemeList" :key="item.value"
                               :label="item.cs_name"
                               :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <!-- 按钮 -->
                <div class="btn_group">
                  <!-- 取消 -->
                  <el-button size="small" type="primary" style="background-color: #68819E;">取消</el-button>
                  <!-- 保存 -->
                  <el-button size="small" type="primary" style="background-color: #4488E9;" @click="add_cs_to_room()">保存</el-button>
                </div>
              </el-col>
              <!-- 右部 -->
              <el-col :span="17">
                <div class="nav_select">
                  <p>房型：</p>
                  <el-select v-model="form.control_scheme" placeholder="请选择内容" @change="query_room_type(form.control_scheme)">
                    <el-option v-for="item in roomTypeList" :key="item.value"
                               :label="item.room_type_name"
                               :value="item.room_type_name">
                    </el-option>
                  </el-select>

                  <p style="margin-left: 20px;">设备方案：</p>
                  <el-select v-model="form.room_num" placeholder="请选择">
                    <el-option v-for="item in schemeList" :key="item.value" :label="item.cs_name" :value="item.id">
                      <span class="pull-left">{{ item.cs_name }}</span>
                      <span class="pull-right" style="color: #8492a6; font-size: 13px">({{ item.cs_serial_number }})</span>
                    </el-option>
                  </el-select>
                </div>

                <!-- 表格 -->
                <el-table
                  :data="roomList"
                  height="218"
                  border
                  style="width: 100%"
                  :header-cell-style="{ background:'#68819E' , color:'#fff' }"
                  :default-sort = "{prop: 'room_type_name', order: 'descending'}">
                  <el-table-column prop="room_type_name"  label="房型"
                                   width="180"
                                   sortable>
                  </el-table-column>
                  <el-table-column prop="room_number" label="房间"
                                   width="180"
                                   sortable>
                  </el-table-column>
                  <el-table-column prop="control_scheme" label="设备方案"
                                   sortable>
                  </el-table-column>
                  <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="remove_cs_to_room(scope.row.id)">删除</el-button>
                      <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row>
              <p class="pro_list">设备方案列表</p>
              <div class="nav_select">
                <p>设备方案名称/编号：</p>

                <el-select filterable  v-model="schemeList_value" placeholder="请选择" @change="get_schemeList_single(schemeList_value)">
                  <el-option v-for="item in schemeList" :key="item.cs_name" :label="item.cs_name" :value="item.id">
                    <span class="pull-left">{{ item.cs_name }}</span>
                    <span class="pull-right" style="color: #8492a6; font-size: 13px">({{ item.cs_serial_number }})</span>
                  </el-option>
                </el-select>
                <!-- 按钮 -->
                <div class="btn_group pull-right">
                  <!-- 修改方案名称 -->
                  <el-button @click="updateTypeVisible = true" style="background-color: #4488E9;"  size="small" type="primary" >修改方案</el-button>
                  <!-- 新增方案 -->
                  <el-button @click="AddTypeVisible = true" style="background-color: #4488E9;"  size="small" type="primary" >新增方案</el-button>
                  <!-- 新增设备 -->
                  <el-button size="small" @click="AddEqVisible = true" style="background-color: #4488E9;" type="primary" >新增设备</el-button>
                </div>
              </div>
              <el-col :span="24">
                <!-- 表格 -->
                <el-table
                  :data="equipmentList"
                  height="300"
                  border
                  style="width: 100%"
                  :header-cell-style="{background:'#68819E',color:'#fff','line-height': '30px'}">
                  <el-table-column
                    prop="control_scheme"
                    label="方案编号/名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="control_scheme"
                    label="ID"
                  >
                  </el-table-column>

                  <el-table-column
                    prop="equipment_type"
                    label="设备">
                  </el-table-column>
                  <el-table-column
                    prop="manufacture"
                    label="厂家">
                  </el-table-column>
                  <el-table-column
                    prop="device_id"
                    label="内容">
                  </el-table-column>
                  <el-table-column
                    prop="created"
                    label="创建时间">

                  </el-table-column>
                  <el-table-column
                    prop="last_update"
                    label="更新时间">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="remove_control_scheme_eqt(scope.row.id)">删除</el-button>
                      <!-- <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 保存
                <el-button size="small" style="background-color: #4488E9;float: right;margin-top: 20px;" type="primary">保存</el-button> -->
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 独立设备设置 -->
          <el-tab-pane label="独立设备设置" name="second">
            <el-row>
              <el-col :span="24" >
                <div>
                  <div class="nav_select inline-block">
                    <p>设备方案：</p>
                    <el-select v-model="form_room_set.scheme_type" placeholder="请选择">
                      <el-option
                        v-for="item in schemeList"
                        :key="item.cs_name"
                        :label="item.cs_name"
                        :value="item.id">
                        <span style="float: left">{{ item.cs_name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">({{ item.cs_serial_number}})</span>
                      </el-option>
                    </el-select>
                  </div>
                  <div class="nav_select inline-block">
                    <p>可选房间：</p>
                    <el-select v-model="form_room_set.room_id" placeholder="请选择" @change="query_room_detail()">
                      <el-option v-for="item in roomList" :key="item.id"
                                 :label="item.room_number"
                                 :value="item.id">
                      </el-option >
                    </el-select>
                  </div>
                </div>
                <p style="margin: 10px;">必填设备信息</p>
                <!-- 滑动 -->
                <div>
                  <el-tabs v-model="activeName2" @tab-click="handleClick">
                    <el-tab-pane label="猫眼" name="one">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> &nbsp;厂 家 ：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="cateyeJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">设备号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="cateyeJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small" @click="showwarning()"  style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="门锁" name="two">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> 厂 家：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="lockJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">锁 号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="lockJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small"  @click="showwarning()" style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>

                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="RCU" name="three">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> 厂 家：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="rcuJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">锁 号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="rcuJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small"  @click="showwarning()" style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>

                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="空调" name="four">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> 厂 家：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">锁 号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small" @click="showwarning()" style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>

                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <p style="margin: 10px;">其它设备信息</p>
                <!-- 滑动 -->
                <div>
                  <el-tabs v-model="activeName3" @tab-click="handleClick">
                    <el-tab-pane label="主灯" name="num_1">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> 厂 家：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">锁 号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small"  style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="卫灯" name="num_2">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> 厂 家：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">锁 号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small" @click="showwarning()"  style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="廊灯" name="num_3">
                      <div class="nav_pane">
                        <!-- IP地址 -->
                        <div class="hotel_num pane_cell">
                          <div class="url inline-block" style="font-size: 14px;"> 厂 家：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.manufacture"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <!-- 端口地址 -->
                        <div class="hotel_num pane_cell" >
                          <div class="url inline-block" style="font-size: 14px;">锁 号：</div>
                          <el-input
                            placeholder="请输入内容"
                            v-model="acJson.push_id"
                            clearable style="width: 20%;">
                          </el-input>
                        </div>
                        <div class="btn_group " style="overflow: hidden;">
                          <el-button class="pull-right" size="small" @click="showwarning()" style="background-color: #4488E9;" type="primary" >提交</el-button>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-col>
            </el-row>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 修改方案弹窗框 -->
    <el-dialog title="修改方案" :visible.sync="updateTypeVisible" width="25%">
      <el-form :model="update_json">
        <el-form-item label="设备方案名称：" :label-width="formLabelWidth">
          <el-input size="mini" v-model="update_json.cs_name" placeholder="请选择设备"></el-input>
        </el-form-item>
        <el-form-item label="设备方案编号：" :label-width="formLabelWidth">
          <el-input size="mini" v-model="update_json.cs_serial_number" placeholder="请选择设备种类"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="updateTypeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="update_control_scheme_eqt(schemeList_value)">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 新增方案弹窗框 -->
    <el-dialog title="新增方案" :visible.sync="AddTypeVisible" width="25%">
      <el-form :model="form_type">
        <el-form-item label="设备方案名称：" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form_type.cs_name" placeholder="请选择设备"></el-input>
        </el-form-item>
        <el-form-item label="设备方案编号：" :label-width="formLabelWidth">
          <el-input size="mini" v-model="form_type.cs_serial_number" placeholder="请选择设备种类"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="AddTypeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="add_control_scheme()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 新增设备弹窗框 -->
    <el-dialog title="新增设备" :visible.sync="AddEqVisible" width="25%">
      <el-form :model="form">
        <el-form-item label="设备父类：" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form_equipment.parent_equipment" placeholder="请选择设备种类">
            <el-option v-for="item in eq_tree_list" :key="item.english_description"
                       :label="item.equipment_name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备种类：" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form_equipment.equipment_type" placeholder="请选择设备种类" @focus="get_eq_item()" @change="get_is_set_common()">
            <el-option v-for="item in eq_tree_item_list" :key="item.english_description"
                       :label="item.equipment_name"
                       :value="item.id" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂家：" :label-width="formLabelWidth">
          <el-select size="mini" v-model="form_equipment.manufacture" placeholder="请选择厂家">
            <el-option v-for="item in const_list" :key="item.manufacture_name"
                       :label="item.manufacture_name"
                       :value="item.const">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容：" :label-width="formLabelWidth">
          <el-input size="mini" style="width: 61%;" v-model="form_equipment.device_id" placeholder="为公共设置的时候不能为空"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="AddEqVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="add_control_scheme_eqt()">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "equipmentguest",
    data(){
      return{
        // 请求头
        UrLHeader: 'http://www.sunxm.cn:8002/v2/',
        // 左侧酒店设备详情
        hotel_data:{},

        hotel_num:'001',
        hotel_name: '皇冠晶品酒店(虹桥店)',
        activeName: 'first',
        activeName2:'one',
        activeName3:'num_1',
        // 新增设备弹窗
        AddEqVisible: false,
        form: {
          control_scheme:'',
          room_num:'',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 修改方案提交数据
        update_json:{
          cs_name:'',//方案名称
          cs_serial_number:''//编号
        },
        // 新增方案提交数据
        form_type:{
          cs_name:'',//方案名称
          cs_serial_number:''//编号
        },
        // 新增设备提交数据
        // 设备父类：客房设备的子类/灯，空调
        //设备种类：灯的子类
        // 厂家：请求接口
        //内容： 为公共设置的时候哦不能为空
        form_equipment:{
          parent_equipment:'',//父类设备
          manufacture:'',//厂家
          equipment_type:'',//设备id
          control_scheme:'',//设备方案id
          device_id:'',//内容
          is_set_common: ''
        },
        // 保存提交分发设备方案
        add_cs_form:{
          control_scheme: '',
          room_list: []
        },
        formLabelWidth: '120px',
        // 修改方案
        updateTypeVisible:false,
        // 新增方案弹出窗
        AddTypeVisible: false,
        // 房间初始数据
        roomList:[],
        // 设备列表初始化
        equipmentList:[],
        // 父类设备列表
        eq_tree_list:[],
        // 设备种类
        eq_tree_item_list:[],
        // 厂家列表
        const_list:[],
        // 方案列表
        schemeList:[],
        // 房型列表
        roomTypeList:[],

        // 独立设备设置------------
        form_room_set:{
          scheme_type:'',//设备方案
          room_id: ''
        },

        value6: '',

        // 设备方案列表查询
        schemeList_value:'',
        cateyeJson:{
          manufacture:'',
          push_id: ''
        },
        lockJson:{
          manufacture:'',
          push_id: ''
        },
        rcuJson:{
          manufacture:'',
          push_id: ''
        },
        acJson:{
          manufacture:'',
          push_id: ''
        },
      }
    },
    created(){
      this.get_hotel(1939);
      // 房型列表
      this.get_control_scheme();
      // 房间列表
      this.get_room();
      // // 设备列表
      // this.get_control_scheme_eqt(id);
      // 房型列表
      this.get_room_type();
      // 父类设备
      this.get_eq();
      // 厂家
      this.get_man_const();
      this.handle();

    },
    methods:{
      // 弹出提示
      showwarning(){
        this.$message({
          message: '由于特殊原因暂不能更改该设备信息',
          type: 'warning'
        });
      },
      handle(){
        let labelList =[{code:'1',desc:'第一个'},{code:'2',desc:'第二个'}];
        let opList =[{code:'1',desc:'修一个'},{code:'3',desc:'修三个'}];
        for(var i in labelList){
          for(var j in opList){
            console.log(labelList[i].code);
            console.log(opList[j].code);
            console.log(labelList[i].code == opList[j].code);
            if(labelList[i].code == opList[j].code){
              console.log(j);
              opList[j].desc = '2'
            }else{
              opList[j].desc = '没修改'
            }
          }
        }
        console.log(labelList)
        console.log(opList)
      },
      // 切换tabs
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      // 右部上方设备方案查询
      check_cs_scheme(){

      },
      // 上部分操作删除
      remove_cs_to_room(id){
        let _this = this,remove_cs_list = [], remove_cs_Url = this.UrLHeader+'equipment/ht/room/remove_cs_to_room/';
        remove_cs_list.push(id);
        // console.log(remove_cs_list);
        _this.$axios.post(remove_cs_Url,remove_cs_list).then(function(res) {
          // 判断返回数据是否有数据
          if(res.data.message =='success'){
            _this.get_room();
            _this.$message({
              message: '解除方案成功',
              type: 'success'
            });

          }else{
            _this.$message.error('解除方案失败');
          }
        }).catch((error) => { });
      },
      // 分配设备方案
      add_cs_to_room(){
        let _this = this, add_cs_Url = this.UrLHeader+'equipment/ht/room/add_cs_to_room/';
        console.log(_this.add_cs_form);
        if(_this.add_cs_form.control_scheme && _this.add_cs_form.room_list.length){

          _this.$axios.post(add_cs_Url,_this.add_cs_form).then(function(res) {
            // 判断返回数据是否有数据
            if(res.data.message =='success'){
              console.log(res.data);
              _this.$message({
                message: '保存成功',
                type: 'success'
              });
            }else{
              _this.$message.error('读取信息失败');
            }
          }).catch((error) => { });
        }else{
          _this.$message({
            message: '请输入完整信息！',
            type: 'warning'
          });
        }


      },
      // 左部请求酒店设备URL
      get_hotel(id){
        let _this = this, getUrl = this.UrLHeader+'equipment/ht/room/get_hotel/?hid=' + id ;
        _this.$axios.get(getUrl).then(function(res) {
          // 判断返回数据是否有数据
          if(res.data.message =='success'){
            _this.hotel_data = res.data.data.results[0];

          }else{
            _this.$message.error('读取信息失败');
          }
        }).catch((error) => {

        });
      },
      // 左部更新酒店设备URL
      update_hotel(id){
        let _this = this, up_Url = this.UrLHeader+'equipment/ht/room/update_hotel/' + id +'/';
        // console.log(_this.hotel_data);
        _this.$axios.post(up_Url,_this.hotel_data).then(function(res) {
          // 判断返回数据是否有数据
          if(res.data.message =='success'){
            _this.$message({
              message: '保存成功',
              type: 'success'
            });
          }else{
            _this.$message.error('读取信息失败');
          }
        }).catch((error) => { });
      },
      // 获取方案列表
      get_control_scheme(){
        let _this = this, getUrl = this.UrLHeader+'equipment/ht/room/get_control_scheme/';
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            console.log('方案')
            console.log(res.data.data);
            _this.schemeList = res.data.data.results;
            if(_this.isnull(_this.schemeList_value)){

              _this.schemeList_value = res.data.data.results[0].cs_name ;
              _this.get_schemeList_single(res.data.data.results[0].id);

              _this.update_json={
                cs_name: res.data.data.results[0].cs_name ,//方案名称
                cs_serial_number:res.data.data.results[0].cs_serial_number //编号
              }
            }

          }else{_this.$message.error('读取信息失败');}
        }).catch((error) => {});
      },
      // 修改方案
      update_control_scheme_eqt(id){
        let _this = this,update_Url ;
        console.log(id);
        for(let i in _this.schemeList){
          if(id==_this.schemeList[i].cs_name){
            id = _this.schemeList[i].id;
            update_Url = _this.UrLHeader+'equipment/ht/room/update_control_scheme_eqt/'+ id +'/'
          }
        }
        if(_this.schemeList_value){
          if(!_this.isnull(_this.update_json.cs_name) && !_this.isnull(_this.update_json.cs_name)){

            _this.$axios.post(update_Url,_this.update_json).then(function(res) {
              // 判断返回数据是否有数据
              if(res.data.message =='success'){
                _this.$message({message: '添加成功',type: 'success'});
                _this.updateTypeVisible = false;
                _this.get_control_scheme();
              }else{
                _this.$message.error('添加信息失败,确保名称或编号不能重复');
              }
            }).catch((error) => {});
          }else{_this.$message({message: '确保输入不为空',type: 'warning'});}
        }else{
          _this.$message({message: '请先选择设备方案',type: 'warning'});
        }
      },
      // 新增方案
      add_control_scheme(){
        let _this = this, add_Url = this.UrLHeader+'equipment/ht/room/add_control_scheme/';
        if(!_this.isnull(_this.form_type.cs_name) && !_this.isnull(_this.form_type.cs_name)){

          _this.$axios.post(add_Url,_this.form_type).then(function(res) {
            // 判断返回数据是否有数据
            if(res.data.message =='success'){
              _this.$message({message: '添加成功',type: 'success'});
              _this.AddTypeVisible = false;
              _this.get_control_scheme();

            }
            else{_this.$message.error('添加信息失败,确保名称或编号不能重复');}
          }).catch((error) => {});

        }else{
          _this.$message({message: '确保输入不为空',type: 'warning'});
        }
      },


      // 获取房型列表
      get_room_type(){
        let _this = this, getUrl = this.UrLHeader+'equipment/ht/room/get_room_type/';
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            console.log('房型');
            console.log(res.data.data);
            _this.roomTypeList = res.data.data;
          }else{_this.$message.error('读取信息失败');}
        }).catch((error) => { });
      },
      // 获取房间列表
      get_room(){
        let _this = this, getUrl = this.UrLHeader+'equipment/ht/room/get_room/';
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            // console.log('房间列表');
            // console.log(res.data.data);
            _this.roomList = res.data.data.results;
          }else{
            _this.$message.error('读取信息失败');
          }
        }).catch((error) => { });
      },
      // 查找房间
      query_room_type(room_type){
        let _this = this, getUrl = this.UrLHeader+'equipment/ht/room/get_room/?room_type_name='+ room_type;
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            // console.log('房间列表');
            // console.log(res.data.data);

            _this.roomList = res.data.data.results;
          }else{
            _this.$message.error('读取信息失败');
          }
        }).catch((error) => {});
      },
      // 下方获取设备方案设备列表
      // get_control_scheme_eqt(){
      //     let _this = this, getUrl = this.UrLHeader+'equipment/ht/room/get_control_scheme_eqt/';
      //     _this.$axios.get(getUrl).then(function(res) {
      //         if(res.data.message =='success'){
      //             // console.log("方案设备列表");
      //             // console.log(res.data.data);
      //             _this.equipmentList = res.data.data.results;
      //         }else{_this.$message.error('读取信息失败');}
      //     }).catch((error) => {});
      // },

      // 获取方案设备列表
      get_schemeList_single(id){
        let _this = this, getUrl = this.UrLHeader + 'equipment/ht/room/get_control_scheme_eqt/?control_scheme='+ id;
        console.log(_this.schemeList_value );
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            console.log("单个方案设备列表");
            console.log(res.data.data);

            for(let i in _this.schemeList){
              if(id==_this.schemeList[i].id){
                _this.update_json={
                  cs_name:_this.schemeList[i].cs_name,//方案名称
                  cs_serial_number:_this.schemeList[i].cs_serial_number//编号
                }
              }
            }

            if(res.data.data.results){
              _this.equipmentList = res.data.data.results;
            }else{
              _this.equipmentList = res.data.data;
            }
          }else{_this.$message.error('读取信息失败');}
        }).catch((error) => {});
      },
      // 删除设备
      remove_control_scheme_eqt(id){
        let remove_Url  = this.UrLHeader+"equipment/ht/room/remove_control_scheme_eqt/"+id+'/',
          _this=this;
        _this.$confirm('是否永久删除该设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$axios.post(remove_Url).then(function(res) {
            if(res.data.message && res.data.message =='success'){
              _this.get_schemeList_single(schemeList_value);
              _this.$message({
                message: '删除成功',
                type: 'success'
              });

            }else{
              this.$message.error('删除信息失败');
            }

          }).catch((error) => {

          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 父类设备
      get_eq(){
        let _this=this,getUrl = this.UrLHeader+'equipment/ht/room/get_equipment_type_tree/';
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            console.log("父类设备列表");
            console.log(res.data.data);
            _this.eq_tree_list = res.data.data;
          }else{_this.$message.error('读取信息失败');}
        }).catch((error) => {});
      },
      // 设备名称
      get_eq_item(){
        let _this=this;
        if(_this.form_equipment.parent_equipment){
          for(let i in _this.eq_tree_list){
            if(_this.form_equipment.parent_equipment == _this.eq_tree_list[i].id){
              _this.eq_tree_item_list = _this.eq_tree_list[i].hierarchy;
            }
          }
        }else{
          _this.$message({message: '优先选择父类设备',type: 'warning'});
        }
      },
      get_is_set_common(){
        let _this=this;
        for(let i in _this.eq_tree_item_list){
          if(_this.form_equipment.equipment_type == _this.eq_tree_item_list[i].id){
            _this.form_equipment.is_set_common = _this.eq_tree_item_list[i].is_set_common;
          }
        }
      },
      // 厂家列表
      get_man_const(){
        let _this=this,getUrl = this.UrLHeader+'equipment/ht/room/get_man_const/';
        _this.$axios.get(getUrl).then(function(res) {
          if(res.data.message =='success'){
            console.log("厂家列表");
            console.log(res.data);
            _this.const_list =  res.data.data.manufacture;
          }else{_this.$message.error('读取信息失败');}
        }).catch((error) => {});
      },
      // 新增设备方案设备
      add_control_scheme_eqt(){
        let _this = this, add_eqt_Url = this.UrLHeader+'equipment/ht/room/add_control_scheme_eqt/';
        for(let i in _this.schemeList){
          if(_this.schemeList_value ==_this.schemeList[i].cs_name){
            _this.form_equipment.control_scheme = _this.schemeList[i].id;
          }
        }
        // console.log(_this.form_equipment);
        // console.log(_this.isnull(_this.form_equipment.device_id));
        if(_this.form_equipment.is_set_common && _this.isnull(_this.form_equipment.device_id)){

          _this.$message({message: '此为公共设置，内容不能为空',type: 'warning'});

        }else{
          if((_this.form_equipment.manufacture==0||_this.form_equipment.manufacture) && _this.form_equipment.equipment_type && _this.form_equipment.control_scheme){

            _this.$axios.post(add_eqt_Url,_this.form_equipment).then(function(res) {
              // 判断返回数据是否有数据
              if(res.data.message =='success'){
                _this.$message({message: '添加成功',type: 'success'});
                _this.AddEqVisible = false;
              }
              else{_this.$message.error('添加信息失败,确保名称或编号不能重复');}
            }).catch((error) => {});

          }else{
            _this.$message({message: '确保输入不为空',type: 'warning'});
          }
        }

      },

      // 获取猫眼，门锁。rcuRCU，空调
      async query_room_detail(){
        let _this = this,room_id = _this.form_room_set.room_id;
        console.log(room_id);
        // _this.
        // 猫眼
        let cateye = (await _this.$axios.get(this.UrLHeader+'equipment/ht/cateye/get_cateye/?room=' + room_id)).data.data;
        if(cateye.results){
          _this.cateyeJson = cateye.results[0];
        }
        console.log(_this.cateyeJson);

        // 门锁.
        let lock =  (await _this.$axios.get(this.UrLHeader+'equipment/ht/lock/get_lock/?room=' + room_id)).data.data;
        console.log(lock);
        if(lock.results){
          _this.lockJson = lock.results[0];
        }
        console.log(_this.lockJson);

        // RCU
        let rcu =  (await _this.$axios.get(this.UrLHeader+'equipment/ht/rcu/get_rcu/?room=' + room_id)).data.data;
        console.log(rcu);
        if(rcu.results){
          _this.lockJson = rcu.results[0];
        }
        console.log(_this.rcuJson);

        // 空调
        let ac =  (await _this.$axios.get(this.UrLHeader+'equipment/ht/ac/get_ac/?room=' + room_id)).data.data;
        console.log(ac);
        if(ac.results){
          _this.acJson = ac.results[0];
        }
        console.log(_this.acJson);
        // this.get_cateye(this.UrLHeader+'equipment/ht/room/get_cateye/');
        // this.get_lock(room_num);
        // this.get_rcu(room_num);
        // this.get_ac(room_num);
        // this.get_light(room_num);
        // this.get_infrared(room_num);
        // this.get_ac(room_num);

      },

      // 判断输入值是否为空
      isnull(val) {
        var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
        if (str == '' || str == undefined || str == null) {
          // this.$message('确认输入值不能为空');
          return true;
        } else{
          return false;
        }
      },
      //后台传code与descript互转
      code_desc(flag,data,list){
        //   flag为1的时候code转desc
        for(let i in list){
          if(flag && data == list[i].code){ return list[i].desc; }
          else if(!flag && data == list[i].desc){ return list[i].code; }
        }
      },

    }
  }
</script>
<style lang="less" scoped>
  .equipmentguest{
    background-color: #f7f7f7;
  }
  .leftNav{
    padding-top: 10px;
  }
  .hotel_num{
    background-color: #fff;
    padding:6px 10px;
    font-size: 16px;
    line-height: 30px;
    p{
      display: inline-block;
    }
    .title{
      padding:6px 10px;
      background-color: #BFCAD1;
    }
    .url{
      padding: 6px 10px;
      font-size: 14px;
      color: #777777;
    }
  }
  .hotel_num_2{
    padding: 0 0 5px 0;
  }
  .hotel_num_3{
    margin: 10px 0;
    p{
      width: 20%;
      font-size: 14px;
      text-align: right;
    }
  }
  .nav_select{
    background-color: #fff;
    padding:6px 10px;
    font-size: 14px;
    line-height: 30px;
    p{
      display: inline-block;
    }

  }

  // 右部
  .rightNav{
    width: 81%;
    background-color: #fff;
    margin: 10px 0 0 20px;
  }
  .eq_Project{
    margin-right: 20px;
    border: 1px #eeeeee solid;
    padding: 26px 0;
    .btn_group{
      margin-top: 20px;
      text-align: center;
    }
  }
  .bg_table{
    background-color: #68819E;
    color: #fff;
  }
  .pro_list{
    font-size: 16px;
    line-height: 30px;
    padding: 20px 0 0 10px;
  }
  .pro_list::before{
    content: '';
    width: 18px;
    height: 20px;
    display: inline-block;
    background: url("../img/icon-prolist.png") no-repeat center;
    background-size: 100%;
    vertical-align: -4px;
    margin-right: 10px;
  }
  .nav_pane{
    margin: 0 10px;
    padding: 20px 0;
    background-color: #FAFAFA;
  }
  .pane_cell{
    padding: 2px 10px;
    background-color: transparent;
  }


  .hotel_num{
    .el-input{
      width: 65%;
      input{
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
      }
    }
  }
  .hotel_num_2{
    .el-input{
      width: 90%;
      margin-left: 10px ;
    }
  }
  .hotel_num_3{
    text-align: center;
    .el-input{
      width: 50%;
    }
    .el-select{
      width: 60%;
      .el-input{
        width: 100%;
      }
    }
  }
  .nav_select{
    .el-select input{
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
    }
  }
  .el-table td, .el-table th{
    padding: 3px 0;
  }
  .cell{
    text-align: center;
  }
  .el-input__icon{
    line-height: 30px;
  }
  .el-dialog__header{
    padding: 10px;
    background-color: #303A41;
    .el-dialog__title{
      color: #fff;
      font-size: 16px;
    }
  }
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-form-item{
    margin: 0;
  }
  .el-dialog__headerbtn {
    top: 10px;
  }
</style>



