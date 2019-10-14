<template>
  <div>
    <el-dialog width="70%" class="previewInfo-dialog deletePadding_Class" :title="preInfoTitle"  :visible.sync="preInfoFormVisible"
      @close="$emit('update:show', false); closePreInfo()"
      :show="show">
      <el-row style="background-color: #fff; height: 550px">
        <el-col :span="7" style="background-color: #F5F5F5; height: 100%">
          <el-row >
            <div style="margin-top: 10px">
              <el-checkbox disabled style="margin-left: 15px; float: left; height: 50px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                <span style="color: black">预订共{{expandPreInfo.length}}间</span>
              </el-checkbox>
              <span style="float: right;margin-right: 10px">
                <span style="margin-right: 10px">预收:</span><span style="color: #23c608;">¥{{this.preBillParam.reserve_base.total_pay}}</span>
              </span>
              <div style="clear: both"></div>
            </div>
          </el-row>
          <el-row class="left-nav">
            <el-checkbox-group  v-model="orderHouseList" @change="handleCheckedChange">
              <el-checkbox disabled style="display: block;margin-left: 15px; height: 50px" v-for="(item,index) in expandPreInfo" :label="item" :key="item.id">
                <span>
                  <div style="display:inline-block" v-if="item.room_number != ''">
                    <el-tag  :disable-transitions="false" @close="deleteHouse(item)"><span style="color: #4488E9">{{item.room_number}}</span></el-tag>
                  </div>
                  <div style="display:inline-block"  v-else>
                    <el-button type="info" size="mini" round @click="chooseNo(item,index)">+房号</el-button>
                  </div>
                  <span style="color: #7AAAEF; margin-left:10px">{{item.room_type}}</span>
                  <span v-if="item.is_checkin===true">在住</span>
                </span>
                <el-button style="float: right" type="info" @click="getInfoByRowThenEnter(item)" circle size="mini">住</el-button>
                <!-- <span style="color: #F97B9D; position: absolute; right: 0;margin-right: 10px; top: 12%">¥{{item.price}}</span> -->
              </el-checkbox>
            </el-checkbox-group>
          </el-row>
        </el-col>
        <!-- 右边部分 -->
        <el-col :span="16">
          <el-tabs v-model="activeName" type="card"  @tab-click='tabClick' style="margin-left: 20px; width: 100%;">
            <!-- 预定信息tab项 -->
            <el-tab-pane label="预定信息" name="1">
              <div>
                <div>
                  <div class="inline-div">
                    <span>订单来源：<span style="color: #9FBDF2 ">{{this.preBillParam.reserve_base.code_src_id}}</span>
                      <span style="margin-left: 10vw">客源:<span>{{this.preBillParam.reserve_base.rsv_type_id}}</span></span>
                    </span>
                    <!-- <span style="width: 10%">
                      <img style="cursor: pointer"  src="../../../assets/images/pms/houseStatus/date2x.png">
                    </span> -->
                  </div>
                  <div class="inline-div">
                    <span>
                      入离日期: <span>{{this.arr_time + '~' + this.leave_time}}</span>
                      <span>（共<span style="color: #FC6784 ">{{countDateRange}}</span>晚)</span>
                    </span>
                    <span>
                      <el-button type="info" size="small" round @click="updateOrder">修改订单</el-button>
                    </span>
                  </div>
                  <div class="inline-div">
                    <span>
                      预定房型:
                    </span>
                      <ul style="margin-left: -15vw">
                        <li v-for="item of previewRoomType"  :key="item.id">
                          {{item.name}} x {{item.number}}
                        </li>
                      </ul>
                      <span style="margin-left: 10vw">首日价<span>/间</span></span>
                  </div>
                  <!-- <div class="inline-div">
                    <span>
                      最晚保留时间: 保留到18:00
                    </span>
                     <span>
                      <el-button type="info" size="small" @click="updateTime" round>修改到店时间</el-button>
                    </span>
                  </div> -->
                  <div class="inline-div">
                    <span>
                      联系人:<span>{{this.preBillParam.reserve_base.name}}</span>
                    </span>
                    <span>
                      <el-button type="info" size="small" @click="updateLinkInfo" round>修改联系信息</el-button>
                    </span>
                  </div>
                  <div class="inline-div">
                    <span>
                      联系电话:<span>{{this.preBillParam.reserve_base.telephone_master}}</span>
                    </span>
                    <span>
                     <el-button type="info" @click="enterPersonVisible = true" size="small" round>+入住人</el-button>
                    </span>
                  </div>
                </div>
                <div style="margin-top: 10px">
                  <el-table :data="this.preBillParam.reserve_guest" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%;" :max-height="180">
                    <el-table-column prop="room_number" label="房间号"></el-table-column>
                    <el-table-column prop="name" label="入住人姓名"></el-table-column>
                    <!-- <el-table-column prop="number" label="账户类型"></el-table-column> -->
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column prop="id_code" label="证件类型"></el-table-column>
                    <el-table-column prop="id_no" label="证件号"></el-table-column>
                    <el-table-column prop="person" label="操作"></el-table-column>
                  </el-table>
                  <!-- <el-row class="pagination">
                    <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                  </el-row> -->
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="账务明细" name="2">
              <el-row>
                <span style="margin-right:5px">营业日:</span>
                <el-date-picker style="width: 30%" v-model="value4" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
                <el-select  v-model="temp_value" style="width: 15%"  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="danger" @click="getpayListByAccount">查询</el-button>
                <el-button type="info">校验预付款</el-button>
              </el-row>
              <el-table :data="accoutInfoList" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                <el-table-column prop="rate_code" label="项目代码"></el-table-column>
                <el-table-column prop="charge_amount" label="消费总数"></el-table-column>
                <el-table-column prop="pay_amount" label="付款"></el-table-column>
                <!-- <el-table-column prop="number" label="房号"></el-table-column> -->
                <el-table-column prop="gen_time" label="时间"></el-table-column>
                <!-- <el-table-column prop="person" label="操作人"></el-table-column>                        -->
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="早餐" name="3">
              <el-row style="padding: 10px;5px;10px;5px;">
                <div style="float: left;">
                  <span style="margin-right:5px">营业日:</span>
                  <el-date-picker style="width: 40%" v-model="value4" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
                  <el-button type="danger">查询</el-button>
                </div>
                <el-button type="info" style="float: right;">+买早餐卷</el-button>
              </el-row>
              <el-row>
                <el-button style="background-color: #CCCCCC; color: #fff">作废</el-button>
              </el-row>
              <el-table :data="tableData_4" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column prop="code" label="类型"></el-table-column>
                  <el-table-column prop="price" label="周期"></el-table-column>
                  <el-table-column prop="number" label="金额"></el-table-column>
                  <el-table-column prop="enterTime" label="有效日期"></el-table-column>
                  <el-table-column prop="person" label="状态人"></el-table-column>
                  <el-table-column prop="person" label="操作人/操作"></el-table-column>
              </el-table>
              <span>已选0条记录</span>
            </el-tab-pane>
            <el-tab-pane label="备注" name="4">
              <el-row style="padding: 10px;5px;10px;5px;">
                <div style="float: left;">
                  <span style="margin-right:5px">备注状态:</span>
                  <el-select  v-model="temp_value" style="width: 10vw"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin: 0px 5px 0px 5px;">操作人:</span>
                  <el-select  v-model="temp_value" style="width: 10vw"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button type="danger">查询</el-button>
                </div>
                <el-button type="info" style="float: right;">+新增备注</el-button>
              </el-row>
              <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                  <el-table-column prop="code" label="备注内容"></el-table-column>
                  <el-table-column prop="price" label="备注类型"></el-table-column>
                  <el-table-column prop="number" label="订单状态"></el-table-column>
                  <el-table-column prop="enterTime" label="备注日期"></el-table-column>
                  <el-table-column prop="person" label="操作人"></el-table-column>
                  <el-table-column prop="person" label="操作"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <!--最后一行样式-->
      <div slot="footer" class="dialog-footer">
        <el-button type="info" size="small">制卡[0]</el-button>
        <el-button :disabled="!cancleAndEnter_button" @click="cancleOrder"  type="info" size="small">取消</el-button>
        <!-- <el-button :disabled="true"  type="success" size="small" @click="getInfoThenEnter();previewToEnterVisible = true">办理入住</el-button> -->
        <el-button type="info" size="small">日志</el-button>
        <el-button type="info" @click="billDialog = true" size="small">发票</el-button>
        <el-button type="info" @click="consumptionDialog = true" size="small">消费</el-button>
        <el-button type="info" size="small">入预收</el-button>
        <el-button type="info" size="small">设置</el-button>
        <el-button type="info" size="small">打印单据</el-button>
      </div>
    </el-dialog>
     <!--添加入住人-->
      <el-dialog class="houseTypeClass" title="添加入住人" :visible.sync="addPersonDialog" :modal="false">
        <div style="height: 400px">
          <el-row>
            <el-select  v-model="temp_value" style="width: 120px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select  v-model="temp_value" placeholder="请输入姓名">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select  v-model="temp_value"  style="width: 150px" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <img style="cursor: pointer; position: relative; margin-left: 10px; top: 5px;" src="../../../assets/images/pms/houseStatus/add.png">
          </el-row>
          <el-row style="margin-top: 30px; margin-left: 125px">
            <el-select  v-model="temp_value"  style="width: 150px" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select  v-model="temp_value" placeholder="请输入姓名">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <el-row style="margin-top: 30px;">
            <el-input placeholder="联系电话" style="margin-left: 125px;width: 370px"></el-input>
          </el-row>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary">确定</el-button>
        </div>
      </el-dialog>
        <!--发票-->
        <el-dialog class="houseTypeClass" title="发票" :visible.sync="billDialog" :modal="false">
          <div style="height: 400px">
            <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column prop="billName" label="发票抬头"></el-table-column>
              <el-table-column prop="billType" label="发票类型"></el-table-column>
              <el-table-column prop="billPrice" label="发票金额"></el-table-column>
              <el-table-column prop="billNumber" label="发票编号"></el-table-column>
              <el-table-column prop="billStatus" label="发票状态"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
          </div>
          <div style="height: 40px">
            <div style="float: left">
              <el-button  type="info">预约发票</el-button>
            </div>
            <div style="float: right">
              <el-button  type="primary">开具专票</el-button>
              <el-button  type="primary">开具普票</el-button>
            </div>
          </div>
        </el-dialog>
          <!-- =========================================分割线 预定转入住单条======================================================================= -->
        <el-dialog width="70%" class="preview-enter-dialog" title="预定转入住"  :visible.sync="rowPreviewToEnterVisible">
          <el-row class="top-nav">
            <span>客源:
              <span v-if="this.rowPreBillParam.reserve_base.rsv_type_id === 0">非会员/会员</span>
              <span v-if="this.rowPreBillParam.reserve_base.rsv_type_id === 1">散客预定</span>
              <span v-if="this.rowPreBillParam.reserve_base.rsv_type_id === 2">团队预定</span>
              <span v-if="this.rowPreBillParam.reserve_base.rsv_type_id === 3">酒店预订</span>
              <span v-if="this.rowPreBillParam.reserve_base.rsv_type_id === 4">协议</span>
            </span>
            <span>联系人:<span>{{this.rowPreBillParam.reserve_base.rsv_person_name}}</span></span>
            <!-- <span>支付状态:<span>{{this.rowPreBillParam.reserve_base.total_pay}}</span></span> -->
            <span>开帐状态</span><span>{{this.rowPreBillParam.reserve_base.account_opened === 0 ? '未开帐' : '开帐'}}</span>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="5">
              入住类型:
              <el-select  v-model="temp_value"  style="width: 65%"  placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="18" class="elColMiddle" > -->
              <!-- 预抵时间:<el-date-picker style="width: 10vw" v-model="rowPreBillParam.reserve_base.arr_time" type="date" placeholder="选择日期"> -->
              <!-- </el-date-picker>&nbsp;&nbsp; -->
              <!-- 入离时间: -->
              <!-- 保留至:<el-date-picker style="width: 10vw" v-model="value2" type="date" placeholder="选择日期"></el-date-picker> -->
            <!-- </el-col> -->
              <el-date-picker :disabled="changeTrue" style="width: 18vw" :picker-options="rangeDate"  :clearable ="false"
                  v-model="preBillParam.reserve_base.leave_time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
              </el-date-picker>
              共 <span style="width: 80px">{{countDateRange}}</span> 晚
          </el-row>
            <!-- 选择房型一行 -->
            <el-row  style="margin-top: 10px">
              <div v-for="(item,index) in rowPreBillParam.rt_rate" :key="index">
                <div  style="margin-top: 10px">
                    选择房型:
                    <el-popover placement="bottom-start" width="300" trigger="click" v-model="item.visible">
                    <!-- 选择房型名称 input框的在对应值 ex:大床房 -->
                    <el-input @focus="getRoomInfo()" :disabled="true"   style="width: 9.0vw" slot="reference" v-model="item.room_type"></el-input>
                    <!-- 选出房型弹出框=》右边弹出框 -->
                    <div v-show="showPop_right" class="romm_pop_right">
                        <div>
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; margin-top: 12px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">{{houseType_HeadValue}}</span>
                        </div>
                        <div style="height: 30px">
                            <!-- 右边展开项的数值 -->
                            <div @click="getHouseTypePrice(item,index); item.visible = false" class="romm_pop_right_behind">
                            <span>门市价</span>
                            <span>首日: <span style="color: #f3565d">{{houseType_priceValue_1}}</span></span>
                            </div>
                        </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <!-- 选出房型弹出框=》左边 -->
                    <div class="room_pop">
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">房型选择</span>
                        </div>
                        <ul class="popSelect_class">
                            <li v-for="(itemm,index) of roomInfoList" :key="itemm.id" @click="showPop_right=true; getHouseTypeNextValue(item,index,itemm)">
                                <span>{{itemm.room_type_name}}</span>
                                <span>可订数: {{itemm.can_live_num}}<span></span></span>
                            </li>
                        </ul>
                    </div>
                    </el-popover>
                    <span style="padding-left: 10px;" >房间数:</span> <el-input-number :disabled="true"   @change="mountMoney"  v-model="item.roomCount" :min="1"></el-input-number>
                    <!-- 预订单=>选房号 -->
                    <img @click="chooseNo(item,index)" style="margin-left: 2px; cursor: pointer;  position: relative; top: 15px;"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
                    <!-- 标签组=》即为房间数 -->
                    <div style="display: inline-block; width: 300px; height: 40px;">
                    <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber.slice(0,3)"  :disable-transitions="false" @close="handleClose(item,tag)">
                      {{tag}}
                    </el-tag>
                    <el-popover placement="right-start" width="200" trigger="click">
                      <div>
                        <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber">
                          {{tag}}
                        </el-tag>
                      </div>
                      <!-- 溢出的tag则显示在popover里面 -->
                      <span v-if="item.dynamic_roomNumber.length>3 ? showPoint = true : showPoint =false"  slot="reference" style="cursor: pointer; line-height: 40px;color: #378ff6; margin-left: 10px">...</span>
                    </el-popover>
                    </div>
                    <div style="position: relative; top: 20px; float: right; height: 30px">
                    <!-- 房间首日价 -->
                    <span style="margin-right: 20px">首日价 <span style="color: #f3565d">{{item.fix_rate}}</span> /间</span>
                    <!-- <img  style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showDeleteButton" @click="deleteSelect(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                    <img  style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showAddButton" @click="addSelect" src="../../../assets/images/pms/houseStatus/add.png"> -->
                    </div>
                </div>
              </div>
            </el-row>
            <!-- 入住人一行 -->
            <el-row style="margin-top: 10px">
                <div  v-for="(item,index) in rowPreBillParam.reserve_guest" :key="index" style="margin-top: 10px">
                <div style="diplay: inline-block">
                    <span style="padding-left: 14px">入住人:</span>
                    <el-select @change="selectLive" @focus="getEnter_RommNumber" v-model="item.room_number" style="width: 9.8vw"  placeholder="房间">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span style="float: left">{{ itemm.roomNo }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">已住:{{ itemm.liveCount }}</span>
                      </el-option>
                    </el-select>
                    <el-input  v-model="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                    <el-select v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                      <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                      <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                    </el-select>
                    <el-input  v-model="item.id_no "  placeholder="证件号码"  style="width: 12vw"></el-input>
                    <el-input  v-model="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                </div>
                <div style="display: inline-block">
                    <el-input  v-model="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 15vw; margin-top: 10px"></el-input>
                </div>
                <!-- 预定房间入住人多选 +-->
                <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_row" src="../../../assets/images/pms/houseStatus/add.png">
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_row(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </el-row>
            <!-- <el-row style="margin-top: 20px">
              是否联房<el-switch style="margin-left: 5px"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
              <el-select  v-model="temp_value" style="width: 10vw;margin-left: 10px"  placeholder="选主账房">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
            </el-row>
            <el-row style="margin-top: 20px">
              免费升级<el-switch style="margin-left: 5px"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
            </el-row> -->
            <el-row style="margin-top: 120px">
                <img style="cursor: pointer; display: inline-block; margin-bottom: -19px" src="../../../assets/images/pms/houseStatus/cardImport.png">
                <!-- <el-button style="height: 50px; width: 150px; margin-left: 12px" type="info">物品</el-button> -->
                <el-button style="height: 50px; width: 100px" type="info" @click="remarkDialog = true; resolveRemarkList()">备注</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="preview_billDialog = true">预约发票</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="consumeDialog = true">消费</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="settingDialog = true">服务设置</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="breakfastDialog = true; getBreakfastList()">早餐</el-button>
                <div style="float: right">
                    <!--查询预定账户需要付的钱是为应收总额-->
                    <!-- 应收总额:<span style="margin-right: 10px">{{countMoney}}</span> -->
                    应收总额:<span style="margin-right: 10px">{{countMoney1}}</span>
                    <!-- 应收总额:<span style="margin-right: 10px">{{needPayCount}}</span> -->
                    <span style="margin-right: 10px">明细</span>
                <el-button style="height: 50px; width: 100px;" type="success" @click="confirmRowPreToEnter()">确定入住</el-button>
                </div>
            </el-row>
        </el-dialog>
        <!-- 修改订单 -->
        <el-dialog width="70%" class="preview-enter-dialog" title="修改订单"  :visible.sync="updateOrderVisible">
          <div style="height: 400px">
            <el-row style="margin-top: 10px">
              <el-col :span="18" class="elColMiddle" >
                <!-- 预抵时间:<el-date-picker style="width: 10vw" v-model="preBillParam.reserve_base.arr_time" type="date" placeholder="选择日期"> -->
                <!-- </el-date-picker>&nbsp;&nbsp; -->
                修改入离日期:
                <el-date-picker style="width: 18vw" :picker-options="rangeDate"  :clearable ="false"
                    v-model="preBillParam.reserve_base.leave_time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
                </el-date-picker>
                共 <span style="width: 80px">{{countDateRange}}</span> 晚
                <!-- 保留至:<el-date-picker style="width: 10vw" v-model="value2" type="date" placeholder="选择日期"></el-date-picker> -->
              </el-col>
            </el-row>
               <!-- 选择房型一行 -->
            <el-row  style="margin-top: 10px">
              <div v-for="(item,index) in preBillParam.rt_rate" :key="index">
                <div  style="margin-top: 10px">
                    选择房型:
                    <el-popover placement="bottom-start" width="300" trigger="click" v-model="item.visible">
                    <!-- 选择房型名称 input框的在对应值 ex:大床房 -->
                    <el-input @focus="getRoomInfo()"  style="width: 9.0vw" slot="reference" v-model="item.room_type"></el-input>
                    <!-- 选出房型弹出框=》右边弹出框 -->
                    <div v-show="showPop_right" class="romm_pop_right">
                        <div>
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; margin-top: 12px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">{{houseType_HeadValue}}</span>
                        </div>
                        <div style="height: 30px">
                            <!-- 右边展开项的数值 -->
                            <div @click="getHouseTypePrice(item,index); item.visible = false" class="romm_pop_right_behind">
                            <span>门市价</span>
                            <span>首日: <span style="color: #f3565d">{{houseType_priceValue_1}}</span></span>
                            </div>
                        </div>
                        </div>
                        <div>
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">权限价</span>
                        </div>
                        <div style="height: 30px">
                            <div @click="getHouseTypePrice(item,index)" class="romm_pop_right_behind">
                            <span>权限价</span>
                            <!-- <span>首日: <span style="color: #f3565d">￥80-￥100</span></span> -->
                            <span>首日: <span style="color: #f3565d">{{houseType_priceValue_2}}</span></span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <!-- 选出房型弹出框=》左边 -->
                    <div class="room_pop">
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">房型选择</span>
                        </div>
                        <ul class="popSelect_class">
                            <li v-for="(itemm,index) of roomInfoList" :key="itemm.id" @click="showPop_right=true; getHouseTypeNextValue(item,index,itemm)">
                                <span>{{itemm.room_type_name}}</span>
                                <span>可订数: {{itemm.can_live_num}}<span></span></span>
                            </li>
                            <!-- <li @click="showPop_right=true;getHouseTypeNextValue(item,index,'大床房')">
                                <span>大床房</span>
                                <span>可订数: <span></span></span>
                            </li>
                            <li @click="showPop_right=true;getHouseTypeNextValue(item,index,'标准双床房')">
                                <span>标准双床房</span>
                                <span>可订数: <span></span></span>
                            </li>
                            <li @click="showPop_right=true;getHouseTypeNextValue(item,index,'全新商务房B')">
                                <span>全新商务房B</span>
                                <span>可订数: <span></span></span>
                            </li> -->
                        </ul>
                    </div>
                    </el-popover>
                    <span style="padding-left: 10px;">房间数:</span> <el-input-number  @change="mountMoney"  v-model="item.roomCount" :min="1"></el-input-number>
                    <!-- 预订单=>选房号 -->
                    <img @click="chooseNo(item,index)" style="margin-left: 2px; cursor: pointer;  position: relative; top: 15px;"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
                    <!-- 标签组=》即为房间数 -->
                    <div style="display: inline-block; width: 300px; height: 40px;">
                    <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber.slice(0,3)" closable :disable-transitions="false" @close="handleClose(item,tag)">
                      {{tag}}
                    </el-tag>
                    <el-popover placement="right-start" width="200" trigger="click">
                      <div>
                        <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber">
                          {{tag}}
                        </el-tag>
                      </div>
                      <!-- 溢出的tag则显示在popover里面 -->
                      <span v-if="item.dynamic_roomNumber.length>3 ? showPoint = true : showPoint =false"  slot="reference" style="cursor: pointer; line-height: 40px;color: #378ff6; margin-left: 10px">...</span>
                    </el-popover>
                    </div>
                    <div style="position: relative; top: 20px; float: right; height: 30px">
                    <!-- 房间首日价 -->
                    <span style="margin-right: 20px">首日价 <span style="color: #f3565d">{{item.fix_rate}}</span> /间</span>
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showDeleteButton" @click="deleteSelect(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showAddButton" @click="addSelect" src="../../../assets/images/pms/houseStatus/add.png">
                    </div>
                </div>
              </div>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button style="height: 50px; width: 100px;" type="danger" @click="onUpdateOrder();updateOrderVisible=false">确定</el-button>
          </div>
        </el-dialog>
        <!-- 修改到店时间dialog -->
        <el-dialog class="houseTypeClass" width="30%" title="修改到店时间" :visible.sync="updateTimeVisible" :modal="true">
          <div style="height: 300px">
            <el-row>
              <el-radio-group v-model="radio1">
                <el-radio :label="1">未联系</el-radio>
                <el-radio :label="2">已联系</el-radio>
                <el-radio :label="3">无法联系上</el-radio>
              </el-radio-group>
            </el-row>
            <el-row style="margin-top: 30px">
              确认抵达时间 <el-switch style="margin-left: 5px"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
            </el-row>
            <el-row style="margin-top: 30px">
              最晚到店
              <el-time-select
                v-model="value1"
                :picker-options="{
                  start: '12:00',
                  step: '01:00',
                  end: '24:00'
                }"
                placeholder="选择时间">
              </el-time-select>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="updateTimeVisible=false">确定</el-button>
          </div>
        </el-dialog>
        <!-- 修改联系信息dialog -->
        <el-dialog class="houseTypeClass" width="30%" title="修改联系信息" :visible.sync="updateLinkInfoVisible" :modal="true">
          <div style="height: 300px">
            <ul style="text-align: center">
              <li>
                联系人&nbsp;&nbsp;&nbsp;&nbsp; <el-input style="width: 15vw" v-model="preBillParam.reserve_base.name"></el-input>
              </li>
              <li style="margin-top: 20px">
                联系电话 <el-input style="width: 15vw" v-model="preBillParam.reserve_base.telephone_master"></el-input>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="updateLinkInfoVisible=false">确定</el-button>
          </div>
        </el-dialog>
        <!-- 入住人dialog -->
        <el-dialog class="houseTypeClass" width="70%" title="入住人" :visible.sync="enterPersonVisible" :modal="true">
          <div style="height: 400px">
             <el-row style="margin-top: 10px">
                <div  v-for="(item,index) in preBillParam.reserve_guest" :key="index" style="margin-top: 10px">
                <div style="diplay: inline-block">
                    <span style="padding-left: 14px">入住人:</span>
                    <el-select @change="selectLive" @focus="getEnter_RommNumber" v-model="item.room_number" style="width: 9.8vw"  placeholder="房间">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span style="float: left">{{ itemm.roomNo }}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">已住:{{ itemm.liveCount }}</span> -->
                      </el-option>
                    </el-select>
                    <el-input  v-model="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                    <el-select v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                      <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                      <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                    </el-select>
                    <el-input  v-model="item.id_no "  placeholder="证件号码"  style="width: 12vw"></el-input>
                    <el-input  v-model="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                </div>
                <div style="display: inline-block">
                    <el-input  v-model="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 15vw; margin-top: 10px"></el-input>
                </div>
                <!-- 预定房间入住人多选 +-->
                <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="enterPersonVisible=false">确定</el-button>
          </div>
        </el-dialog>
        <!-- 选房号 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="选房号" :visible.sync="switchNumberDialog" :modal="true">
          <div style="height: 400px; width: 100%; background-color: #EBEDF1">
            <div style="float: right;width: 100%;">
                <el-table :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" ref="multipleTable"  :data="roomNo_data_list" style="width: 100%;height: 400px; overflow:scroll" @select-all="handleselectAll" @select="handleselect">
                <el-table-column  type="selection" width="55"></el-table-column>
                <el-table-column prop="room_no" label="房号"></el-table-column>
                <el-table-column prop="room_state" label="状态"></el-table-column>
                <el-table-column prop="floor_number" label="楼座/楼层">
                  <template slot-scope="scope">
                    {{scope.row.building_name}}/{{scope.row.floor_number}}
                  </template>
                </el-table-column>
                <el-table-column prop="tagName" label="标签"></el-table-column>
                </el-table>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              自动排房<el-switch style="margin-left: 5px" @change="selfSelectHouse" v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
              <span style="margin-left: 10px">排房结果: <span>{{this.sortNumber}}</span></span>
              <span style="margin-left: 10px">未排房总数:<span style="color: #f3565d">{{this.noSortNumber}}</span></span>
              <span style="margin-left: 10px">已排房总数:<span style="color: #23c608">{{this.sortNumber}}</span></span>
            </div>
            <el-button @click="switchNumberDialog = false; getRoomNumber()" type="danger">提交</el-button>
          </div>
        </el-dialog>
           <!-- 入预收操作 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="入预收操作" :visible.sync="payMoneyDialog" :modal="true">
          <div style="width: 100%; height: 400px">
            <ul class="enter_pre_ul">
              <!-- <li><span>&nbsp;&nbsp;订单号:</span> <span>111232131eer2</span></li> -->
              <li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应收: </span><span style="color: #f3565d;"></span>(预收款总计: <span style="color: #f3565d;"></span>已预收:<span>{{previewPay}}</span><span style="color: red">预收(未收完):</span><span>{{haveNotPayValue}}</span>预计消费总计:)</li>
              <li><span>预收操作:</span>
                <el-select style="width: 12vw" @focus="getPayMode()" placeholder="付款方式"  v-model="payModeValue">
                    <el-option
                      v-for="item in payModeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <!-- <el-input size="small" style="width: 8vw" v-model="payMoney"></el-input>
                  <el-button size="small" @click="getMoney()"  type="danger" round>收款</el-button> -->
                   <!-- <el-button size="small" v-if="isAccout" @click="openAccount()"  type="danger" round>开账</el-button>   -->
                  <el-input size="small" style="width: 8vw"  v-show="!isAccout" v-model="payMoney"></el-input>
                  <el-button size="small" v-if="!isAccout" @click="getMoney()"  type="danger" round>收款</el-button>
              </li>
              <li>
                    <span>消费明细</span>
                      <el-select @change="moutedPayMoney" v-model="collectionChargeData" multiple placeholder="请选择">
                        <el-option
                          v-for="item in accoutInfoById_param.charge_details"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                          <span style="float: left">{{ item.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.charge_amount }}</span>
                        </el-option>
                      </el-select>
                    <span>付款原因:</span>
                    <el-select style="width: 12vw" @focus="getPayReason()" placeholder="付款原因"  v-model="payReasonValue">
                      <el-option
                        v-for="item in this.payInfoList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
              </li>
              <li>
                  <span>
                    是否转账<el-switch style="margin-left: 5px"  v-model="switchPayValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
                  </span>
                  <span v-show="switchPayValue==='1' ? true : false">
                    开始转账:
                    <el-input style="width: 12vw; margin-left: 10px" v-model="haveNotPayValue"  placeholder="未收金额"></el-input>
                    <el-button type="primary" @click="transferAccount">转账</el-button><span>（如果转账,请先收款!）</span>
                  </span>
              </li>
            </ul>
            <div>
              <!-- <el-table :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"  :data="roomNo_data_list" style="width: 100%;">
                <el-table-column prop="room_no" label="支付方式"></el-table-column>
                <el-table-column prop="room_state" label="卡号"></el-table-column>
                <el-table-column prop="room_state" label="入账金额"></el-table-column>
                <el-table-column prop="floor_number" label="操作时间">
                  <template slot-scope="scope">
                    {{scope.row.building_name}}/{{scope.row.floor_number}}
                  </template>
                </el-table-column>
                <el-table-column prop="tagName" label="操作人"></el-table-column>
              </el-table> -->
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="isClickPayButton()">打印关闭</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
import cDialog from './consumeDialog'
export default {
    data(){
        return {
            havePreviewNumber: 0,//预定转入住入住已经入住的个数
            countMoney1: 0,//总数 不考虑预定的房价的总数只考虑买衣服冰棍啥的钱
            collectionChargeData: [],//收款要选择的数据
            incomingAccoutList: [],//入账代码list
            return_accountParam_1: {},//开帐之后返回的param
            isAccout: true,
            return_accountParamId: [],
            payMoney: 0,
            clickPayButton: false,//是否点击了收款按钮
            needPayCount: 0,
            previewRoomType: [],//预定房型
            accoutInfoById_param: {},//预定转入住主帐id相关的帐的值
            accoutInfoById_param_1: {},//预定主账
            previewCharge: null,
            previewPay: null,
            switchPayValue: '0',
            noSortNumber: 0,
            sortNumber: 0,
            selfSortArray: [],//自动排房
            haveNotPayValue: 0,//未收金额
            returnEnterParam: {},
            rowPreBillParam: {
              reserve_base:{
                account_opened: '',
                rsv_type_id: '',
                rsv_person_name: '',
                total_pay: '',
              }
            },
            activeName: '1',
            accoutInfoList: [],
            payReasonValue: '',//付款原因对应值
            payModeValue: '',//付款方式对应值
            payModeList: [],//支付方式接口
            payInfoList: [],//付款原因接口
            payDetail_param:{
              account_ids: [],//需要序列化
              pay_amount: null,//	支付金额.可正负.负代表支出
              pay_status: null,
              pay_reason_id: null,
              biz_date:	moment(new Date()).format('YYYY-MM-DD'),
              gen_time:		moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              pay_mode_id	: null,//以上都是必填 付款方式id, 目前已知 0. 现金 1. POS 2. 支付宝 3. 微信 4. AR 5. 预授权
              check_status: null,
              check_time: '',
              cashier: null,
              create_user: null,
              original_pay_dict: {},
              charge_details: [],
            },
            return_accountParam:{},
            //账户param
            account_param: {
              account_type: 0,//int 默认为正常账户 	账户类型:0:正常账户 1：AR账户
              reference_link_label: 0,//	关联方标志，0：预定账户，1：入住单，2：已分帐的单独客人账户
              reference_id: '123',//int 此时测试数据
              module_id: 1,//测试时填写
              charge_details: [], //消费明细必填
              pay_detail: {},//付款明细不是必填
              room_num: '',//房间号,有入住的情况下必填.
              biz_date: moment(new Date()).format('YYYY-MM-DD'),
              gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              hotel_id: '',
              hotel_group_id: '',
              account_status: '',
              check_flag: '',
              team_flag: '',
              team_id: '',
              market_id: '',
              market_code: '',
              remark: '',
            },
            payMoneyDialog: false,//预定转入住的时候 =>入住后可能存在付款现象
            tempPreBillparam: {},//办理入住 进入的时候的对象
            tempExpandEnter: [],
            changeTrue: true,//是否禁用（预定转入住）
            expandPreInfo: [],//展开时的数据=>prebillParam.ra_rate
            leave_time: '',
            arr_time: '',
            cancleAndEnter_button: true,
            // parentInfoParam: {},
            radio1: 1,
            enterPersonVisible: false,//入住人
            updateLinkInfoVisible: false,
            updateTimeVisible: false,
            updateOrderVisible: false,
            preInfoTitle: '',
            tableData_data: [],
            checkAll: false,
            isIndeterminate: true,
            orderHouseList: [],//默认进来全部选中
            previewOrders: [],
            tableData_4: [],
            switchValue: '',
            tableData_1: [{
              name: '李四',
              member: '',
              telphone: '13812345678',
              type: '身份证',
              cardNumber: '1531515315555454'
            }],
            tableData_2: [{
              code: '',
              price: '598.00',
              number: '1',
              enterTime: '2018/10/02 12:00',
              person: '管理员'
            }],
            num: 1,
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            value8: '',
            value9: '',
            value10: '',
            preInfoFormVisible: this.show,
           countMoney: null,
          roomTagList: [],
          flag: false,
          liveoptions_Value: [],
          liveoptions_NoChange: [],
          liveoptions: [],//入住人一行下拉
          _room_type: '',//房型
          rowIndex: [],//行数数组
          pre_live_number: '',//准备预定数
          can_live_number: '',//可订数
          roomList: [],//房间list
          roomInfoList: [],//其中一行数据房子
          switchValue: '',
          showAddButton: true,//选择房型右边初始化时显示add按钮
          showDeleteButton: false,
          options: [{
          value: '1',
          label: '是'
          },{
          value: '0',
          label: '否'
          },{
          value: '选项4',
          label: '龙须面'
          },{
          value: '选项5',
          label: '龙须面'
          }],
          selectParam: '',//小方块选择参数全局定义
          is_addlive: false,//是否添加入住人
          sexOptions:[{
          label: '男',
          value: '0'
          },{
          label: '女',
          value: '1'
          }],
          //证件类型
          idCodeOptions: [{
            label: '身份证',
            value: '01'
            },{
            label: '户口簿',
            value: '02'
            },{
            label: '护照',
            value: '03'
            },{
            label: '台胞证',
            value: '04'
            },{
            label: '港澳通行证',
            value: '05'
          }],
          breakfastAllList: [],//早餐列表
          countDate: '',//共几晚
          middle_remarkRow: '',
          addAndUpdate: true,//编辑新增标记
          remarkContent_value: '',//备注值
          showAddButton_2: true,//选择房型右边初始化时显示add按钮
          showDeleteButton_2: false,
          countChecked: 0,
          isDisabled: false,//是否禁选
          haveChecked: false,
          booleanChecked: '',
          multipleSelection: [],
          houseType_priceValue_1: '',//选择房型右边弹框价钱1
          houseType_priceValue_2: '',//选择房型右边弹框价钱2
          houseType_HeadValue: '',//选择房型右边弹框头部值
          showPop_right: false,//是否显示预定单选择房型右边弹框
          //预订单大对象
          preBillParam: {
            //选择房型一行
            rt_rate:[{
              can_live_num: '',//add
              room_type_value: '',//房型名称对应ID
              room_type: '',//房型名称
              room_class: '1',
              room_number: '',//房间数 数组变字符串
              dynamic_roomNumber: [],//动态房间号=》应是一个数组
              // ['111', '222', '333','444', '555','666', '777']
              ratecode_id: '',//房价码
              fix_rate: '',
              roomCount: '',//房间数量几件=add=
              roomPrice: '', //总价钱=add=
              // code: '123',
              // code_name: '123',
              // descript: '123',
              // descript_en: '123',

              list_order: 123,
              reserve_base_id: '',
              checkin_date: '2018-12-01 10:10:01',
              checkin_time: '2018-12-01 10:10:01',
              code_room_special_ids: '1',
              code_room_facilities_ids: '1',
              is_arranged: false,
              rmocc_ids: '',
              add_person_num: 1,
              add_person_price: 1,
              add_bed_num: 1,
              add_bed_price: 1,
              code_pkg_id: 1,
              add_pkg_num: 1,
              add_pkg_price: 1,
              rate_service_fee: 1,
              rate_tax: 1,
              lower_price_id: 1,
              lower_price_reason: '1',
              lower_price_amount: 1,
              real_rate: 1,
              remark: ''
            }],
            reserve_base:{
              rsv_type_id : '',//预定类型
              rsv_person_name : 'hax',//预定人姓名
              telephone_master: '15026864009',//预定人电话
              arr_time: '',//预抵时间
              leave_time: '',//离开时间
              is_fix_rate: 1, //传的 false和 true
              is_secrete : 1,
              is_secret_rate : 1,//1传的
              account_id: 1, //存进去账户id
              allowed_AR : 1,
              // code: '11',
              // code_name: '11',
              // descript: '11',
              // descript_en: '11',

              list_order: 1,
              biz_date: '2018-12-01 10:10:01',
              team_id: 1,
              rsv_from: 1,
              order_no: '',
              confirmed: false,
              sales_person_id: 1,
              code_occ_id: 1,
              extra_flag: 1,
              adult_num: 1,
              children_num: 1,
              purpose: '1',
              name:'deng123',
              email_master: '101608@qq.com',
              weixin_master: '1',
              mobile_master: '1',
              ID_no: '1',
              fix_rate: null,
              AR_id: '1',
              code_commision_id: '1',
              code_market_id: '1',
              code_src_id: '1',
              // reference_id: '1',
              rsv_status_lable: 1,
              total_chartge: 1,
              total_pay: 0,
              last_account_id: 1,
              last_pay_id: 1,
              account_num: 1,
              pay_num: 1
            },
            //入住人
            reserve_guest:[{
              liveCount: 0,//可选数
              room_number: '',//房间号
              id_code: '01',//证件类型
              id_no: '',//证件号码
              name: '', //姓名
              sex: '0',//性别
              telephone: '',//手机号
              street_add: '',//街道地址
              // code: '123',
              // code_name: '77777',
              // descript: '22',
              // descript_en: '22',
              list_order: 1,
              last_name: '22',
              first_name: '22',
              name2: '22',
              name_combi: '22',
              is_save: false,
              language: '2',
              title: '22',
              salutation: '22',
              race: '22',
              religion: '22',
              career: '122',
              nation: '22',
              visa_no: '22',
              visa_grant: '22',
              enter_port: '22',
              where_from: '22',
              where_to: '22',
              salary: '22',
              education: '22',
              marital: '22',
              company_id: '22',
              company_na: '222',
              pic_photo: '22',
              pic_sign: '22',
              remark: '222',
              is_anonymo: false,
              weixin: '2',
              mobile: '22',
              email: '1016068291@qq.com',
              country_id: '22',
              division_id: '22',
              state_id: '22',
              city_id: '22',
              zipcode: '22',
              reserve_base_id: null,
              guest_id: 123456
            }],
            //早餐
            breakfastInfoList: [],
            settingInfo: {},//设置
            //预定=》消费
            consumeInfoList: [{
                name: '',
                number: '',
                price: '',
                count: ''
            }],
            billInfo: {},//发票
            remarkList: [{
                remarkContent: '',
                remarkType: '',
                status: '',
                time: '',
                operationPeople: '',
            }],//备注
          },
          temp_value: '',
          showPoint: false,//预定=>多余部分
          activeNames: ['1'],
          consumeData: [],//预定=》消费数组
          remarkData: [],//备注数组
          breakfastDialog: false,//预定=》早餐dialog
          settingDialog: false,//预定=》设置dialog
          consumeDialog:false,//预定=》消费dialog
          preview_billDialog: false,//预约发票
          addAndUpdate_remarkDialog: false,//预定=>备注dialog=>新增备注
          remarkDialog: false,//预定=>备注dialog
          previewTypeList: [{
          label: '散客预定',
          value: 0
          },{
          label: '团队预定',
          value: 1
          },{
          label: '酒店预订',
          value: 2
          }],//会员数组
          roomNo_data_list: [],//选房号数组
          building_value: '',
          floor_value: '',
          roomStatus_value: '',
          roomType_value: '',//房型
          room_no_value: '',//房间号
          floorList: [],//楼层
          buildingList: [],//楼栋
          roomTypeList: [],//房型option
          roomStatusList: [],//房态option
          roomOccupyList: [],
          lockCss_active: false,//锁定状态
          rangeDate:{
          disabledDate(time){
              return time.getTime() < Date.now() - 8.64e7
          }
          },
          isActive: false, // 样式true or false
          UrLHeader:'http://47.98.113.173:9101/v1/',//http://member.crowncrystalhotel.com/,
          UrLHeader_2:'http://47.98.113.173:8092/v1/',
          UrLHeader_3: 'http://47.98.113.173:9103/v1/',
          consumptionDialog: false,
          borrowingDialog: false,
          billDialog: false,
          leaveDialog: false,
          houseTypeDialog: false,
          switchNumberDialog: false,
          enterPreviewDialog: false,//入预收操作
          prePayDialog: false, //聚合支付
          editPriceDialog: false,
          addPersonDialog: false,
          continueLiveDialog: false,
          previewToEnterVisible: false,//预定转入住单
          rowPreviewToEnterVisible: false,
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        parentInfoParam: {
            type: Object,
            required: true
        }
    },
     components: {
      'cDialog': cDialog,
    },
    created(){
      // this.getRoomType() //准备:循环得到匹配的房型中文名
      // this.payMoneyDialog = true
    },
    watch: {
      show () {
        this.preInfoFormVisible = this.show;
        this.getRoomType() //准备:循环得到匹配的房型中文名
      },
      parentInfoParam(){
        console.log('====1监听到数据',this.parentInfoParam)
        this.preBillParam = _.cloneDeep(this.parentInfoParam)
        console.log('====2监听到数据',this.preBillParam)
        this.preInfoTitle = '预订单详情'+ ' ' + '[' + this.preBillParam.reserve_base.order_no + ']'
        this.arr_time = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD')
        this.leave_time = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD')
        // let tempParam = _.cloneDeep(this.preBillParam)
        // this.tempPreBillparam = _.cloneDeep(this.preBillParam) //办理入住的对象 没用此时
        // this.expandPreInfo = this.expandData(tempParam)
        // this.orderHouseList = this.expandPreInfo
        // this.previewOrders = this.expandPreInfo
        this.expandPreInfo = _.cloneDeep(this.preBillParam.rt_rate) //此时不需要展开
        console.log(this.expandPreInfo,'展开的值this.expandPreInfo')
        console.log('prebill.............',this.preBillParam)
        //构造预定房型数组
        for(var item of this.preBillParam.rt_rate){
          this.previewRoomType.push({
            name: item.room_type,
            number: item.dynamic_roomNumber.length
          })
        }
      console.log('11113==',this.previewRoomType)
      },
      //对象的watch
      // parentParam: {
      //     handler(newValue,oldValue){
      //         console.log('new',newValue)
      //         console.log('old',oldValue)
      //     },
      // },
      // param(){
      //     this.getData()
      // }
    },
    computed:{
      // sumMoney(){
			// 	return this.preBillParam.consumeInfoList.map(
			// 		item=>item.number*item.price).reduce(
			// 		(acc, cur) => (parseFloat(cur) + acc), 0)
      //   },
      sumBreakfastMoney(){
        return this.preBillParam.breakfastInfoList.map(
					item=>item.number*item.price).reduce(
					(acc, cur) => (parseFloat(cur) + acc), 0)
        },
      //计算预离时间差天数
      countDateRange(){
        let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      },
      // needPayCount(){
      //   //未开账 单一房间的金额
      //   if(this.preBillParam.reserve_base.account_opened === 0){
      //     let  a =
      //   }
      // }
    },
    methods: {
      //取消订单
      cancleOrder(){

      },
      //切换tab
      tabClick(row){
        if(row.name==='2'){
          this.getpayListByAccount()
        }
      },
      //清空重置对象或数组的数据
      flushData(){
        this.preBillParam.rt_rate = [{
          can_live_num: '',//add
          room_type_value: '',//房型名称对应ID
          room_type: '',//房型名称
          room_class: '1',
          room_number: '',//房间数几间 数组变字符串
          dynamic_roomNumber: [],//动态房间号=》应是一个数组
          // ['111', '222', '333','444', '555','666', '777']
          ratecode_id: '',//房价码
          fix_rate: '',
          roomCount: '',//房间数量=add=
          roomPrice: '', //总价钱=add=
          // code: '123',
          // code_name: '123',
          // descript: '123',
          // descript_en: '123',

          list_order: 123,
          reserve_base_id: '',
          checkin_date: '2018-12-01 10:10:01',
          checkin_time: '2018-12-01 10:10:01',
          code_room_special_ids: '1',
          code_room_facilities_ids: '1',
          is_arranged: false,
          rmocc_ids: '',
          add_person_num: 1,
          add_person_price: 1,
          add_bed_num: 1,
          add_bed_price: 1,
          code_pkg_id: 1,
          add_pkg_num: 1,
          add_pkg_price: 1,
          rate_service_fee: 1,
          rate_tax: 1,
          lower_price_id: 1,
          lower_price_reason: '1',
          lower_price_amount: 1,
          real_rate: 1,
          remark: ''
        }]
      },
      //刷新入住人
      flush_reserveGurst(){
        this.preBillParam.reserve_guest = [{
          // liveCount: 0,
          // room_number: '',
          // name: '',
          // sex : '',
          // id_code : '',
          // id_no : '',
          // telephone : '',
          // street_add : ''
          liveCount: 0,//可选数
          room_number: '',//房间号
          id_code: '01',//证件类型
          id_no: '',//证件号码
          name: '', //姓名
          sex: '0',//性别
          telephone: '',//手机号
          street_add: '',//街道地址
          // code: '123',
          // code_name: '77777',
          // descript: '22',
          // descript_en: '22',
          list_order: 1,
          last_name: '22',
          first_name: '22',
          name2: '22',
          name_combi: '22',
          is_save: false,
          language: '2',
          title: '22',
          salutation: '22',
          race: '22',
          religion: '22',
          career: '122',
          nation: '22',
          visa_no: '22',
          visa_grant: '22',
          enter_port: '22',
          where_from: '22',
          where_to: '22',
          salary: '22',
          education: '22',
          marital: '22',
          company_id: '22',
          company_na: '222',
          pic_photo: '22',
          pic_sign: '22',
          remark: '222',
          is_anonymo: false,
          weixin: '2',
          mobile: '22',
          email: '1016068291@qq.com',
          country_id: '22',
          division_id: '22',
          state_id: '22',
          city_id: '22',
          zipcode: '22',
          reserve_base_id: null,
          guest_id: 123456
        }]
      },
      //是否点击收款按钮
      isClickPayButton(){
        if(this.clickPayButton === false){
          this.$message.warning('请先收款!')
          return
        }else{
          this.payMoneyDialog=false;
          this.rowPreviewToEnterVisible = false
        }
      },
      /**
       * 根据账务id得到账务明细
       * 此时取预定时的消费 然后在去消费之后 也就是另外一个(预定转入住)accountID之下得到的值
       */
      getpayListByAccount(){
        console.log('this.return_accountParamId,入住新建账户下的消费',this.return_accountParamId)
        let array = []
        array.push(this.preBillParam.reserve_base.account_id)
        console.log('this.preBillParam.reserve_base',this.preBillParam.reserve_base.account_id)
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/charge_detail/list_by_account`
          let param = {
            account_ids: array
          }
          param.account_ids = JSON.stringify(param.account_ids)
          let scopeParam = param
          that.$axios.post(url,scopeParam).then(res=>{
            this.accoutInfoList = res.data.data.list
            console.log(',,,',res.data)
          }).catch(error=>{
          })
      },
       /**先开帐 只把消费明细传进去 */
        openAccount(){
          this.isAccout = false
          this.addAccount() //先开帐
          this.getIncomingAccount()//入账代码
          setTimeout(() => {
            this.getEnterInfoByAccount()
            this.toUpdateCarryPayInfo() //把accountID传入进去 注意 此时情况为预定必然开帐
          }, 600);
        },
        /**最后一个  已开账 */
        isOpenAccount(){
          console.log('进入 最后一个房间预定')
          this.isAccout = false
          this.getIncomingAccount()//入账代码
          setTimeout(() => {
            this.getInfoByAccount() //预定单的主账id
            this.toUpdateCarryPayInfo() //把accountID传入进去 注意 此时情况为预定必然开帐
          }, 600);
        },
         //计算收款的时候根据消费明细得到的钱
        moutedPayMoney(row){
          let number = 0
          this.payMoney = 0
          for(var item of this.collectionChargeData){
            for(var itemm of this.accoutInfoById_param.charge_details){
              if(item === itemm.id){
                number = itemm.charge_amount
              }
            }
            this.payMoney =  Number(this.payMoney) + Number(number)
          }
        },
      /**
       * 根据账务id得到主账信息(查询预定的时候负的钱以及其他) 预定时有开账的情况下
       */
      getInfoByAccount(){
        console.log('this.rowPreBillParam====this.rowPreBillParam',this.rowPreBillParam)
        //开账的时候就会直接赋值
        if(this.rowPreBillParam.reserve_base.account_opened===1){
          // let id = this.rowPreBillParam.reserve_base.account_id
          let id = this.rowPreBillParam.reserve_base.last_account_id
          console.log('id',id)
          let that = this
          let param ={
            with_collections: 1,
            related_objects: 1
          }
          let url= `http://47.98.113.173:9519/v1/finance/account/get_info/` + id
          that.$axios({
           method : 'get',
            url : url,
            params: param
        }).then(res=>{
            that.accoutInfoById_param_1 = res.data.data
            for(var item of that.accoutInfoById_param_1.charge_details){
                for(var itemm of that.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
            that.accoutInfoById_param.charge_details = _.cloneDeep(that.accoutInfoById_param_1.charge_details)
            console.log('this.accoutInfoById_param_1============',this.accoutInfoById_param_1)
            // if(this.preBillParam.reserve_base.account_opened === 0){
              this.needPayCount = this.accoutInfoById_param_1.total_consumption - this.accoutInfoById_param_1.pay_amount  //应收总额
            // }else{
            //   this.needPayCount = this.preBillParam.reserve_base.total_chartge - this.preBillParam.reserve_base.total_pay//应收总额 开账的时候是合计几个房间的价钱还是单个的

              this.previewCharge = this.accoutInfoById_param_1.total_consumption
              this.previewPay = this.accoutInfoById_param_1.pay_amount
              // 计算
              this.haveNotPayValue = this.previewCharge - this.previewPay //预收金额 即还没分配的金额
            // }
          }).catch(error=>{
          })
        }
      },
      /**
       * 根据预定转入住创建主账得到主账信息
       */
      getEnterInfoByAccount(){
        console.log('this.rowPreBillParam====this.rowPreBillParam',this.rowPreBillParam)
        //开账的时候就会直接赋值
          let id = this.return_accountParam.id  //创建主账返回的id 不是预定单id
          console.log('id',id)
          let that = this
          let param ={
            with_collections: 1,
            related_objects: 1
          }
          let url= `http://47.98.113.173:9519/v1/finance/account/get_info/` + id
          that.$axios({
           method : 'get',
            url : url,
            params: param
        }).then(res=>{
            this.accoutInfoById_param = res.data.data
            console.log('this.accoutInfoById_param入住的时候',this.accoutInfoById_param)
              for(var item of this.accoutInfoById_param.charge_details){
                for(var itemm of this.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
            // }
          }).catch(error=>{
          })
      },
      /**
       * 转账 当收款时创建该房间的主账id 然后可以转账  就是预定单的主账id的钱就可转到该房间下的账单 一对一
       */
      transferAccount(){
        if(this.rowPreBillParam.reserve_base.account_id === ''){
          this.$message.warning('预订时未创建账户，不能转账!')
          return
        }
        // this.haveNotPayValue = this.rowPreBillParam.reserve_base.total_pay //预收付款金额
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/transfer_accounts_detail/add`
        let scopeParam = {
          from_id: this.rowPreBillParam.reserve_base.account_id,  //转出主帐id
          to_id: this.return_accountParam.id,  //转入主帐id addAccount得到的此时
          submit_biz_date: moment(new Date()).format('YYYY-MM-DD'),
          amount: this.haveNotPayValue, //转账金额
        }
        console.log('====this.rowPreBillParam.reserve_base=',this.rowPreBillParam.reserve_base)
        console.log('==============传入的值scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          this.$message.success('转账成功')
        }).catch(error=>{

        })
        // this.getInfoByAccount() //转账之后为啥要查这个信息
        console.log('this.accoutInfoById_param')
      },
       /**
         * 不同形式下的收款
         * 收钱时 没有主账户的时候<===>就创建一个主账户
         */
      // getMoney(){
      //   this.clickPayButton = true //证明点击了收款按钮
      //   console.log('this.payModeValue',this.payModeValue)
      //   if(this.payModeValue === 0){
      //     //这个方法不能用 此时不创建主账户啦=====> this.addAccount()
      //     // if(this.rowPreBillParam.reserve_base.rsv_status_lable !=1){
      //       this.addAccount()//添加账户 注意：此时没有按照预定的时候来开帐是直接增加账户
      //     setTimeout(() => {
      //       this.toUpdateCarryPayInfo() //传递到预定表==>到入住表
      //     }, 400);
      //     // }else{
      //     //   this.addPayDetail()
      //     // // this.addChargeDetail() //增加消费记录
      //     // }
      //   }else{
      //     this.prePayDialog = true;
      //   }
      // },
      /**
         * 不同形式下的收款
         * 收钱时<===>前提没有主账户的时候就创建一个主账户
         */
        getMoney(){
          this.clickPayButton = true //证明点击了收款按钮
          if(this.collectionChargeData.length === 0){
            this.$message.warning('请先选择消费明细!')
            return
          }
          console.log('payMoney加的值',this.payMoney)
          console.log('消费明细集合id===需要序列化',this.collectionChargeData)
          console.log('this.payModeValue',this.payModeValue)
          if(this.payModeValue === 0){
            this.addSomePay()
            // this.addPayDetail() 此时需要调用吗?
            // setTimeout(() => {
              this.toUpdateCarryPayInfo()
            // }, 600);
          }else{
            this.prePayDialog = true;
          }
        },
        //创建账户根据消费记录选择然后支付
        addSomePay(){
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/pay_detail/pay_by_charges`
          console.log('collectionChargeDatavalue消费明细的数组========',this.collectionChargeData)
          this.collectionChargeData = JSON.stringify(this.collectionChargeData)
          let scopeParam = {
            charge_ids: this.collectionChargeData,
            pay_amount: this.payMoney,
            code_pay_for_id: this.payReasonValue,
            biz_date: moment(new Date()).format('YYYY-MM-DD'),
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            cashier_id:	9,
            pay_mode_id: this.payModeValue,
            // original_pay_dict: {}
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res,收款',res.data,res)
            if(res.data.message === 'success'){
              this.$message.warning('收款成功!')
              // this.enterPreviewDialog = false //入预收关闭
              // this.previewFormVisible =false
            }else{
              this.$message.warning('后台收款报错!')
            }
            }).catch(error=>{
          })
        },
        /**
         * 携带创建账户的信息然后传递给预定相关的表
         */
        toUpdateCarryPayInfo(){
          console.log('进入携带',this.return_accountParam)
          console.log('进入携带2',this.returnEnterParam)
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/update_master_base/`
          let url= `http://bill.crowncrystalhotel.com/v1/checkin/update_master_base/`
          let master_base = {}
          let scopeParam
          if(this.preBillParam.rt_rate.length - this.havePreviewNumber === 1){
            scopeParam = {
              master_base : {
                // returnEnterParam
                account_opened: 1,
                order_no: this.returnEnterParam[0].order_no,
                total_chartge: this.countMoney,//总消费return_accountParam.total_consumption
                total_pay:  this.payMoney,//总付款
                account_id: this.accoutInfoById_param_1.id, //accoutInfoById_param_1
                last_account_id:  this.accoutInfoById_param_1.id,//accoutInfoById_param_1
                last_pay_id:  null,
              }
            }
          }else{
            scopeParam = {
              master_base : {
                // returnEnterParam
                account_opened: 1,
                order_no: this.returnEnterParam[0].order_no,
                total_chartge: this.countMoney,//总消费return_accountParam.total_consumption
                total_pay:  this.payMoney,//总付款
                account_id: this.return_accountParam.id, //accoutInfoById_param_1
                last_account_id:  this.return_accountParam.id,//accoutInfoById_param_1
                last_pay_id:  null,
              }
            }
          }
          console.log('scopeParam========================= 创建账户后=>param',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            }).catch(error=>{
          })
        },
      /**
       * 新建预定不用
       * 付钱的时候
       * 增加支付记录
       */
      addPayDetail(){
        // this.account_param.charge_details = [{
        //   code_income_type_id: 15,
        //   reference_id: '121',
        //   charge_amount: 100,
        // }]
        this.account_param.charge_details = [] //为空表示支付account_ids关联下的所有支付记录
        let array = []
        array.push(this.preBillParam.reserve_base.account_id)
        //开始处理数据
        this.payDetail_param.account_ids = JSON.stringify(array) //序列化
        this.payDetail_param.charge_details = JSON.stringify(this.payDetail_param.charge_details)
        this.payDetail_param.pay_amount = this.countMoney
        this.payDetail_param.pay_amount = this.payModeValue
        this.payDetail_param.pay_status = 0//	支付状态 ,0:正常、1：已取消、2、已退款 3：异常
        this.payDetail_param.pay_reason_id = this.payReasonValue

        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/pay_detail/add`
        // let url = that.UrLHeader + 'room/room_status/manual_change_room_status/'
        let scopeParam = that.payDetail_param
        that.$axios.post(url,scopeParam).then(res=>{
          this.$message.success('增加支付记录成功!')
        }).catch(error=>{

        })
      },
      /**
       * 新建预定不用
       * 付钱的时候或者产生消费行为将要付钱的时候
       * 增加消费记录
       */
      addChargeDetail(){
        console.log('this.preBillParam.reserve_base.account_id==增加消费记录',this.preBillParam.reserve_base.account_id)
        let scopeParam = {
          // cashier_id: 9,//	收银点id
          account_id: this.preBillParam.reserve_base.account_id,//主账户id
          charges: [{
            code_income_type_id: 11,   //入账类型代码id
            reference_id: 1232,   // 关联消费单id
            biz_date: moment(new Date()).format('YYYY-MM-DD'),  // 营业日期
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),    // 业务发生的实际时间
            pay_status: 0,   // 支付状态 0：未付，1：结清，2：挂账/AR支付，3：部分支付 4: 异常
            is_fixed: 0,  // 是否固定消费. 0 不是,1 是.
            fixed_name: '0',   // 固定消费名称.可空
            rate_code: 'ddf',   // 房价码, 不一定有
            charge_amount: 200,  // 消费金额
            pay_amount: 0,   // 已支付的部分,一般是0,
            desc:  '测试内容',  // 说明
          }], //消费明细字典组成的数组
        }
        scopeParam.charges = JSON.stringify(scopeParam.charges)
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/charge_detail/add_charges`
        // let url = that.UrLHeader + 'room/room_status/manual_change_room_status/'
        that.$axios.post(url,scopeParam).then(res=>{
          this.$message.success('增加消费记录成功!')
        }).catch(error=>{
        })
      },
        //入账代码
        getIncomingAccount(param){
          let that = this
          let url =  `http://47.98.113.173:9519/v1/finance/incoming_account_code/info_list?page_size=999`
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              that.incomingAccoutList = res.data.data.list
              console.log('that.incomingAccoutList',that.incomingAccoutList)
            }).catch(error=>{
          })
        },
      //修改预订单详情==>调用修改方法
      closePreInfo(){
        this.updatePostPreview()
        console.log('guanbi')
      },
      //编辑页面 关闭按钮弹出
      updatePostPreview(){
        let that = this
        // let url= `http://192.168.2.224:9005/v1/booking/update_reserve/`
        let url= `http://bill.crowncrystalhotel.com/v1/booking/update_reserve/`
        console.log('关闭详情页面 编辑传进去的数据',that.preBillParam)
        let scopeParam = _.cloneDeep(that.preBillParam) //此处必须深拷贝
        scopeParam = this.handleDeleteAttribute(scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          this.preInfoFormVisible = false
          }).catch(error=>{
        })
      },
      /**
       * 单个房间确定入住
       */
      confirmRowPreToEnter(){
        console.log(this.preBillParam.rt_rate.length,'总共预定房间总数')
        console.log(this.havePreviewNumber,'已入住个数')
        console.log('1',this.rowPreBillParam.reserve_base.total_pay)
        console.log('2',this.rowPreBillParam.reserve_base.total_chartge)
        // this.previewCharge = this.rowPreBillParam.reserve_base.total_chartge
        // this.previewPay = this.rowPreBillParam.reserve_base.total_pay
        // // 计算
        // this.haveNotPayValue = this.previewCharge - this.previewPay //预收金额 即还没分配的金额
        // this.getInfoByAccount()
        delete this.rowPreBillParam.reserve_base.account_id //此时删除
        // let url = that.UrLHeader + 'room/room_status/manual_change_room_status/'
        let that = this
        // let url= `http://192.168.2.224:9005/v1/checkin/booking_check_in/`
        let url= `http://bill.crowncrystalhotel.com/v1/checkin/booking_check_in/`
        let scopeParam = _.cloneDeep(that.rowPreBillParam) //此处必须深拷贝
        scopeParam = this.handleDeleteAttribute(scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          this.returnEnterParam = res.data.data.result.result
          console.log('确定入住===>单个房间',res.data)
         if(res.data.message === 'success'){
              this.$message.warning('预定转为入住成功!')
              debugger
              if(this.preBillParam.rt_rate.length - this.havePreviewNumber == 1){
                this.isOpenAccount()
                // this.rowPreBillParam.reserve_base.account_id
              }else{
                this.openAccount() //当不是预订单最后一个的时候就先直接开帐
              }
            }else{
              this.$message.warning('入住失败!')
            }
        }).catch(error=>{
        })
        this.payMoneyDialog = true
      },
      //直接办理入住
      confirmPreToEnter(){
        // let url = that.UrLHeader + 'room/room_status/manual_change_room_status/'
        let that = this
        let url= `http://bill.crowncrystalhotel.com/v1/checkin/booking_check_in/`
        let scopeParam = _.cloneDeep(that.preBillParam) //此处必须深拷贝
        scopeParam = this.handleDeleteAttribute(scopeParam)
        scopeParam.reserve_base.fix_rate = 1 //暂时赋值
        that.$axios.post(url,scopeParam).then(res=>{
          this.$message.success('预定转为入住成功!')
        }).catch(error=>{
        })
        this.payMoneyDialog = true
      },
      //删除该行的对应要预定的房号
      deleteHouse(item){
        item.room_number = '' //置空
        // let index =  _.findIndex(this.orderHouseList, o => {return o.number === item.number})
        // this.orderHouseList.splice(index, 1)
        // console.log('index',index)
        console.log('item',item)
      },
      //计算房间========>金额
      getNeedPayCount(item){
        console.log('item未开账',item)
        //未开账的时候
        // if(this.preBillParam.reserve_base.account_opened === 0){
        //   this.needPayCount = item.fix_rate  //应收总额
        // }else{
        //    this.needPayCount = this.preBillParam.reserve_base.total_chartge - this.preBillParam.reserve_base.total_pay//应收总额 开账的时候是合计几个房间的价钱还是单个的
        // }
      },
      /**
       * 从每行得到相应预定信息然后入住
       */
      getInfoByRowThenEnter(item){
        // this.getNeedPayCount(item)
        console.log('this.preBillParam获取',this.preBillParam)
        console.log('item==单行===========',item)
        this.rowPreBillParam = _.cloneDeep(this.preBillParam)
        this.getInfoByAccount() //查询预定单过来的主账的id下的消费情况 //预定有开账的情况下
        console.log('this.rowPreBillParam====this.rowPreBillParam',this.rowPreBillParam)
        console.log('111',this.rowPreBillParam.reserve_guest.filter(p=>p.room_number === item.room_number))
        //字符串与int类型的区别
        if(this.rowPreBillParam.reserve_guest.filter(p=>p.room_number === item.room_number).length <= 0){
          this.rowPreBillParam.reserve_guest = [{
              liveCount: 0,//可选数
              room_number: '',//房间号
              id_code: '01',//证件类型
              id_no: '',//证件号码
              name: '', //姓名
              sex: '0',//性别
              telephone: '',//手机号
              street_add: '',//街道地址
              // code: '123',
              // code_name: '77777',
              // descript: '22',
              // descript_en: '22',
              list_order: 1,
              last_name: '22',
              first_name: '22',
              name2: '22',
              name_combi: '22',
              is_save: false,
              language: '2',
              title: '22',
              salutation: '22',
              race: '22',
              religion: '22',
              career: '122',
              nation: '22',
              visa_no: '22',
              visa_grant: '22',
              enter_port: '22',
              where_from: '22',
              where_to: '22',
              salary: '22',
              education: '22',
              marital: '22',
              company_id: '22',
              company_na: '222',
              pic_photo: '22',
              pic_sign: '22',
              remark: '222',
              is_anonymo: false,
              weixin: '2',
              mobile: '22',
              email: '1016068291@qq.com',
              country_id: '22',
              division_id: '22',
              state_id: '22',
              city_id: '22',
              zipcode: '22',
              reserve_base_id: this.rowPreBillParam.reserve_base.order_no,
              guest_id: 123456
          }]
        }else{
          this.rowPreBillParam.reserve_guest = this.rowPreBillParam.reserve_guest.filter(p=>p.room_number == item.room_number)
        }
        console.log('this.rowPreBillParam.reserve_guest',this.rowPreBillParam.reserve_guest.filter(p=>p.room_number == item.room_number))
        this.rowPreBillParam.rt_rate = []
        this.rowPreBillParam.rt_rate.push(item)
        //@以后要改为传的值
        // this.rowPreBillParam.reserve_base.leave_time =  [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
        // this.preBillParam = scopeParam
        console.log('parentInfoParam子组件传来的值',this.parentInfoParam)
        this.rowPreviewToEnterVisible = true
        // this.preBillParam = _.cloneDeep(this.parentInfoParam)
        //  this.preBillParam.reserve_base.arr_time = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        //  this.preBillParam.reserve_base.leave_time = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        // this.preBillParam.reserve_base.leave_time = [moment(this.preBillParam.reserve_base.arr_time).format('YYYY-MM-DD HH:mm:ss'),moment(this.preBillParam.reserve_base.leave_time).format('YYYY-MM-DD HH:mm:ss')]
        // this.preBillParam.rt_rate = this.parentInfoParam.rt_rate
        // this.preBillParam.reserve_guest = this.parentInfoParam.reserve_guest
        // // this.preBillParam.reserve_base = this.parentInfoParam.
        // this.handleParentParam(this.parentInfoParam)
        // this.handleChildParam(this.preBillParam)
        // console.log('this.preBillParam-value',this.preBillParam)
        // this.previewToEnterVisible = true
      },
      //当修改订单的时候处理数据
      onUpdateOrder(){
        // this.expandData(this.preBillParam)
        console.log(this.expandPreInfo,'修改订单点击确定按钮this.expandPreInfo222')
        this.orderHouseList = this.expandPreInfo //此处赋值保证预定单详情全选
      },
      //展开数据
      expandData(param){
        let newParam = [];
        param.rt_rate.map((p) => {
          console.log('====enter=====',p.dynamic_roomNumber)
          if(p.dynamic_roomNumber.length > 0) {
            p.dynamic_roomNumber.map((n) => {
              newParam.push({
                dynamic_roomNumber: [n],
                room_number: n,
                can_live_num: p.can_live_num,
                room_type_value: p.room_type_value,
                room_type: p.room_type,
                room_class: p.room_class,
                ratecode_id: p.ratecode_id,
                fix_rate: p.fix_rate,
                roomCount: p.roomCount,
                roomPrice: p.roomPrice,
                // code: p.code,
                // code_name: p.code_name,
                // descript: p.descript,
                // descript_en: p.descript_en,
                list_order: p.list_order,
                reserve_base_id: p.reserve_base_id,
                checkin_date: p.checkin_date,
                checkin_time: p.checkin_time,
                code_room_special_ids: p.code_room_special_ids,
                code_room_facilities_ids: p.code_room_facilities_ids,
                is_arranged: p.is_arranged,
                rmocc_ids: p.rmocc_ids,
                add_person_num: p.add_person_num,
                add_person_price: p.add_person_price,
                add_bed_num: p.add_bed_num,
                add_bed_price: p.add_bed_price,
                code_pkg_id: p.code_pkg_id,
                add_pkg_num: p.add_pkg_num,
                add_pkg_price: p.add_pkg_price,
                rate_service_fee: p.rate_service_fee,
                rate_tax: p.rate_tax,
                lower_price_id: p.lower_price_id,
                lower_price_reason: p.lower_price_reason,
                lower_price_amount: p.lower_price_amount,
                real_rate: p.real_rate,
                remark: p.remark,
                is_checkin: p.is_checkin//add
              })
            })
            console.log('newparam===',newParam)
          }else{
              newParam.push({
                dynamic_roomNumber: [],
                can_live_num: p.can_live_num,
                room_type_value: p.room_type_value,
                room_type: p.room_type,
                room_class: p.room_class,
                room_number: p.room_number,
                ratecode_id: p.ratecode_id,
                fix_rate: p.fix_rate,
                roomCount: p.roomCount,
                roomPrice: p.roomPrice,
                // code: p.code,
                // code_name: p.code_name,
                // descript: p.descript,
                // descript_en: p.descript_en,
                list_order: p.list_order,
                reserve_base_id: p.reserve_base_id,
                checkin_date: p.checkin_date,
                checkin_time: p.checkin_time,
                code_room_special_ids: p.code_room_special_ids,
                code_room_facilities_ids: p.code_room_facilities_ids,
                is_arranged: p.is_arranged,
                rmocc_ids: p.rmocc_ids,
                add_person_num: p.add_person_num,
                add_person_price: p.add_person_price,
                add_bed_num: p.add_bed_num,
                add_bed_price: p.add_bed_price,
                code_pkg_id: p.code_pkg_id,
                add_pkg_num: p.add_pkg_num,
                add_pkg_price: p.add_pkg_price,
                rate_service_fee: p.rate_service_fee,
                rate_tax: p.rate_tax,
                lower_price_id: p.lower_price_id,
                lower_price_reason: p.lower_price_reason,
                lower_price_amount: p.lower_price_amount,
                real_rate: p.real_rate,
                remark: p.remark,
                is_checkin: p.is_checkin//add
              })
          }
        });
        this.expandPreInfo = newParam
        console.log('param========11111',param)
        console.log('展开方法this.expandPreInfo',this.expandPreInfo)
        return this.expandPreInfo
      },
      //修改订单
      updateOrder(){
        this.updateOrderVisible = true;
        console.log('thhis.tempExpandEnter',this.tempExpandEnter)
      },
      //修改到店时间
      updateTime(){
        this.updateTimeVisible = true
      },
      //修改联系信息
      updateLinkInfo(){
        this.updateLinkInfoVisible = true
      },
      //vue 多选框自带方法 => 全选
      handleCheckAllChange(val) {
        // console.log('全选val1',val)
        console.log('this.checkAll1',this.checkAll)
        console.log('this.isIndeterminate1',this.isIndeterminate)
        this.orderHouseList = val ? this.expandPreInfo : [];
        if(this.orderHouseList.length === 0){
          this.cancleAndEnter_button = false
        }else{
          this.cancleAndEnter_button = true
        }
        console.log('this.orderHouseList',this.orderHouseList)
        this.isIndeterminate = false;
      },
      //vue 多选框自带方法 =>单选
      handleCheckedChange(value) {
        // console.log('this.isIndeterminate2',this.isIndeterminate)
        // console.log('this.checkAll2',this.checkAll)
        this.tempExpandEnter = value
        this.tempPreBillparam = _.cloneDeep(this.preBillParam)
        this.tempPreBillparam.rt_rate = this.concatData(this.tempExpandEnter) //暂时
        console.log('单选val2=>数据',value)
        console.log('选择',this.preBillParam.rt_rate)
        let checkedCount = value.length;
        if(checkedCount === 0){
          this.cancleAndEnter_button = false
        }else{
          this.cancleAndEnter_button = true
        }
        this.checkAll = checkedCount === this.previewOrders.length;
        console.log('checkedCount2 为 0时 ',checkedCount)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.previewOrders.length;
      },
      concatData(param){
        var map = {},
        array = [];
        for(var item of param){
            if(!map[item.room_type]){
              array.push({
                // id: item.id,
                // number: item.number
                dynamic_roomNumber: item.dynamic_roomNumber,
                room_number: item.room_number,
                can_live_num: item.can_live_num,
                room_type_value: item.room_type_value,
                room_type: item.room_type,
                room_class: item.room_class,
                ratecode_id: item.ratecode_id,
                fix_rate: item.fix_rate,
                roomCount: item.roomCount,
                roomPrice: item.roomPrice,
                // code: item.code,
                // code_name: item.code_name,
                // descript: item.descript,
                // descript_en: item.descript_en,
                list_order: item.list_order,
                reserve_base_id: item.reserve_base_id,
                checkin_date: item.checkin_date,
                checkin_time: item.checkin_time,
                code_room_special_ids: item.code_room_special_ids,
                code_room_facilities_ids: item.code_room_facilities_ids,
                is_arranged: item.is_arranged,
                rmocc_ids: item.rmocc_ids,
                add_person_num: item.add_person_num,
                add_person_price: item.add_person_price,
                add_bed_num: item.add_bed_num,
                add_bed_price: item.add_bed_price,
                code_pkg_id: item.code_pkg_id,
                add_pkg_num: item.add_pkg_num,
                add_pkg_price: item.add_pkg_price,
                rate_service_fee: item.rate_service_fee,
                rate_tax: item.rate_tax,
                lower_price_id: item.lower_price_id,
                lower_price_reason: item.lower_price_reason,
                lower_price_amount: item.lower_price_amount,
                real_rate: item.real_rate,
                remark: item.remark,
              })
              map[item.room_type] = item
            }else{
              console.log('array111',array)
              for(var itemm of array){
                if(itemm.room_type == item.room_type){
                  itemm.room_number.push(item.room_number[0])
                  break
                }
              }
            }
        }
        return array
        console.log(array);
        },
        senToParent(){
          this.$emit('listenToPreview', '已经预定了')
        },
        //计算价钱总数
        mountMoney(){
          this.countMoney = 0 //此处必须重新申明值为0避免全局变量的影响
          if(this.rowPreviewToEnterVisible === true){  //当单个房间点开的时候
            for(var item of this.rowPreBillParam.rt_rate){
              this.countMoney = this.countMoney + item.fix_rate * item.roomCount
            }
          }else{
            for(var item of this.preBillParam.rt_rate){
              this.countMoney = this.countMoney + item.fix_rate * item.roomCount
            }
          }
        },
        //自动排房
        selfSelectHouse(val){
          this.selfSortArray = []
          if(val === '1'){
            let array = []
            this.sortNumber = this.roomNo_data_list.length - (this.roomNo_data_list.length - this.pre_live_number)
            this.noSortNumber = this.roomNo_data_list.length - this.pre_live_number
            var f = length => Array.from({length}).map((v, k) => k)
            array = f(this.sortNumber)
            for(var item in array){
              this.toggleSelection([this.roomNo_data_list[item]])
              this.selfSortArray.push(this.roomNo_data_list[item])
            }
            this.multipleSelection = this.selfSortArray
          }else{
            this.sortNumber = 0
            this.noSortNumber = 0
            this.$refs.multipleTable.clearSelection();
          }
        },
        //增加一个(主)账户 需要消费的时候
        addAccount(){
          console.log('进入创建预定转入住主账!')
         this.account_param.charge_details = [{
            // code_income_type_id: this.preBillParam.consumeInfoList[0].code_income_type_id,
            code_income_type_id: 11,//入账代码=>代表食品
            reference_id: '121',
            // charge_amount: this.preBillParam.consumeInfoList[0].price,
            // charge_amount: this.countMoney,//此处应该是预计收款总额
            charge_amount: this.countMoney1
          }]
          this.account_param.charge_details = JSON.stringify(this.account_param.charge_details)
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/account/add`
          // let url = that.UrLHeader + 'room/room_status/manual_change_room_status/'
          let scopeParam = that.account_param
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('预定转入住主账res',res.data)
            this.return_accountParam = res.data.data
            this.return_accountParamId.push(this.return_accountParam.id)
            console.log('======创建主账户account_param 会返回总高消费的钱',this.return_accountParam)
            this.$message.success('创建账户成功')
          }).catch(error=>{

          })
        },
        //传入后台去掉多余属性 更改值
        handleDeleteAttribute(param){
          param.reserve_base.arr_time = moment(param.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          param.reserve_base.leave_time = moment(param.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          console.log('param传入后台去掉多余属性',param,'11')
          // rt_rate
          for(var item of param.reserve_guest){
              delete item.liveCount
          }
          for(var item of param.rt_rate){
            item.room_number = item.dynamic_roomNumber.join(',')
            delete item.can_live_num
            delete item.room_type_value
            delete item.dynamic_roomNumber
            delete item.roomCount
            delete item.roomPrice
            delete item.visible
          }
          console.log('paramdelete',param)
          return param
        },
        datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
            var dateSpan,
            tempDate,
            iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        },
       //选择房型一行房型相关信息
        getRoomInfo(){
          // this.getRoomType() //准备:循环得到匹配的房型中文名
          let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD')
          let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD')
          let that = this
          let url =  that.UrLHeader + 'room/room_status/get_room_type_occupy_list/'
          that.$axios({
            url : url,
            method : 'get',
            params:{
              biz_data__gte: start,
              biz_data__lt: end
            },
          }).then(res=>{
          if(res.data.message === 'success'){
              that.roomInfoList = res.data.data.results
              // let start = '2019-04-06'
              // let end =  '2019-04-09'
              for(var item of that.roomInfoList){
                for(var itemm of that.roomTypeList){
                  if(item.room_type === itemm.code){
                    item.room_type_name = itemm.descript
                  }
                }
              }
              // //在时间范围内的数据
              // let roomInfoArray = newArray.filter(item=> item.biz_data >= start && item.biz_data < end) //过滤时间范围内的数据
              // // that.roomInfoList = roomInfoArray
              // if(roomInfoArray.length > 0){
              //   this.handlerRoomData(roomInfoArray) //处理房型信息
              //   console.log('roomInfoList',this.roomInfoList)
              // }else{
              //   this.roomInfoList = []
              // }
          }else{
              that.$message.error('获取房型信息列表失败!')
          }
          }).catch(error=>{
          })
        },
        getCanLiveRoom(param){
          let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD 14:00:00')
          let that = this
          let url= `http://47.98.113.173:9101/v1/room/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: param,
            start_time: start,
            end_time: end
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let array
            array = res.data.data.data
            console.log('array房间',res.data.data.data)
              //组装带标签的数组
              for(var item of array){
                for(var itemm of that.roomTagList){
                  if(item.room_no == itemm.room_no){
                    item.tagName = itemm.feature_name
                  }
                }
              }
              that.roomNo_data_list = array  //选房号tabel数组
          }).catch(error=>{

          })
        },
        //排序方法数组对象根据对象属性
        compare(property){
          return function(obj1,obj2){
              var value1 = obj1[property];
              var value2 = obj2[property];
              return value1 - value2;     // 升序
          }
        },
        handlerRoomData(array){
          //先排序 在去重 ===此处 时间范围内有重复数据 得筛选去重得到重复中最小的
          array[0].can_live_num = 10
          array[1].can_live_num = 100
          var sortObj = array.sort(this.compare('can_live_num'));
          //开始去重
          var result = [];
          var obj = {};
          for(var i =0; i<sortObj.length; i++){
            if(!obj[sortObj[i].room_type]){
                result.push(sortObj[i]);
                obj[sortObj[i].room_type] = true;
            }
          }
          this.roomInfoList = result
        },
        //获取code对应房型数据
        getRoomType(){
          let that = this
          let url = that.api.api_price_9101+ '/v1/' + `room/room_status/get_room_type_list/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                console.log('res.data.data.results321312',res.data.data.results)
                  that.roomTypeList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
         //选择房间号得到所有list(根据房型筛选)
        getRoomList(param){
          let that = this
          let scopeParams = {
            page : 1,
            page_size : 300,
            room_type_name: param.room_type_value, //ex:大床房暂时 房型 对应code
          }
          // let params = util.deleteNullParam(scopeParams)//删除对象里属性值为空的属性
          let url = `http://47.98.113.173:9101/v1/room/room_status/get_room_map_list?page_size=1000`
          that.$axios({
            method : 'get',
              url : url,
              params: scopeParams
          }).then(res=>{
            if(res.data.message === 'success'){
              that.roomList = res.data.data.results
              let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD')
              let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD')
              // let start = '2019-04-03'
              // let end =  '2019-04-05'
              //组装带标签的数组
              for(var item of that.roomList){
                for(var itemm of that.roomTagList){
                  if(item.room_no == itemm.room_no){
                    item.tagName = itemm.feature_name
                  }
                }
              }
               //在时间范围内占用的数据
              let roomArrayByTime = that.roomOccupyList.filter(item => moment(item.start_time).format('YYYY-MM-DD') >= start && moment(item.end_time).format('YYYY-MM-DD') < end) //过滤时间范围内的数据
              let roomArrayByTime_2 = roomArrayByTime.splice(2,1) //暂时test放这儿
              let array = []
              //得到 交集
              for(var item of that.roomList){
                for(var itemm of roomArrayByTime_2){
                  if(item.room_no == itemm.room_no){
                    array.push(item)
                  }
                }
              }
              console.log('array重复的值',array)
              // 减去重复得 并集
              var array_2 = that.roomList.filter(item => !array.includes(item))
              that.roomList = array_2
              //删除数组中占用的
              // that.roomList.forEach()
              // that.roomList.concat(roomArrayByTime_2.filter(item=>item.roomNo))

              that.roomNo_data_list = that.roomList  //选房号tabel数组
              // room_type_value
              localStorage.setItem(param.room_type_value,JSON.stringify(that.roomNo_data_list));
            }else{
              that.$message.error('获取房间列表失败!')
            }
          }).catch(error=>{
          })
        },
        //得到房间所对应的标签
        getTagByRoom(){
          console.log('enter tag')
          let that = this
          let url = `http://room.crowncrystalhotel.com/v1/room/get_roomfeatures_list_tree/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                console.log('res.data.data',res.data.data)
                  that.roomTagList = res.data.data
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        //得到房间占用
        getRoomOccupy(){
          let that = this
          let url = that.UrLHeader + 'room/room_status/get_room_occupy_list/'
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomOccupyList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        //选房号 =>不同房型展示不同的tabel
        chooseNo(item,index){
            // if(!this.validatePreviewData()){
            //   return false
            // }
            if(item.room_type_value === ''){
              let tempvalue = this.roomTypeList.filter(p=>p.room_type_name===item.room_type)
              item.room_type_value = tempvalue[0].code
            }
            if(item.room_type === ''){
              this.$message.warning('请先选择房型!')
              return false
            }else{
              this.getCanLiveRoom(item.room_type_value) //根据房型选未占用房间
              // this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
              // this.getRoomOccupy()//得到房间占用
              this.getTagByRoom()//得到房间对应标签
              // this.getRoomList(item)
              this.can_live_number = item.can_live_num//可预定数
              this.pre_live_number = item.roomCount//选择的数
            }
            this.switchNumberDialog = true;
            this._room_type = item.room_type_value
        },
        //暂时废弃======>选房号dialog点击左边根据房型得到不同的房间信息
        selectHouseType(item){
          console.log('itemmmm',item)
          this.can_live_number = item.can_live_num//可预定数
          this.pre_live_number = item.roomCount//选择的数
          console.log('item.room_type_value',item.room_type_value)
          // if(JSON.parse(localStorage.getItem(item.room_type_value)) || JSON.parse(localStorage.getItem('selection'))){
          //   console.info("pass缓存");
          //   this.roomNo_data_list  = JSON.parse(localStorage.getItem(item.room_type_value))
          //   this.multipleSelection = JSON.parse(localStorage.getItem('mulSelection'))
          //   this.rowIndex = JSON.parse(localStorage.getItem('rowIndex'))
          //   this.toggleSelection(this.rowIndex)
            console.log('this.multipleSelection缓存',this.multipleSelection)
          //   let array = []
          //   for(var item of this.multipleSelection){
          //     array.push(item.room_no)
          //   }
          //   console.log('点击不同每一行的array组装房间号',array)
          //   console.log('item 哪一行的值',item)
          // }else{
          //   console.info("pass不缓存");
            this.getRoomList(item)//根据房型筛选房间数（没有被占用）
          // }
          // console.log('itemxuanz',item)
        },
        //切换是否状态
        toggleSelection(rows) {
          // toggleSelection([tableData[1], tableData[2]])
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        //单=》右边全选房号dialogtabel 并控制不可选房间号
        handleselectAll(selection){
          if(this.can_live_number > this.pre_live_number){
            if(selection.length > this.pre_live_number){
              let indexNumber = selection.length - this.pre_live_number
              selection.splice(this.pre_live_number,indexNumber)//截取最大可选数的房间从数组可选数最大长度开始截取
              this.multipleSelection = selection //截取后的值
              localStorage.setItem('selection',JSON.stringify(this.multipleSelection));
            }
          }
        },
        //单=》右边选房号dialogtabel 并控制不可选房间号
        handleselect(selection, row){
          this.multipleSelection = selection;
          //可订数大于自选的入住数
          let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引 即行数
          if(this.can_live_number > this.pre_live_number){
            if(this.multipleSelection.length > this.pre_live_number){
              this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
              this.$message.warning('不能超过该房间类型的可选数!')
            }
          }
          // this.rowIndex.push(index)
          console.log('this.rowIndex',this.rowIndex)
          console.log(this.rowIndex,'this',this.multipleSelection)
          localStorage.setItem('mulSelection',JSON.stringify(this.multipleSelection));
          localStorage.setItem('rowIndex',JSON.stringify(this.rowIndex));
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
          this.switchValue = '0'
          let _room_type = this._room_type
          let index = _.findIndex(this.preBillParam.rt_rate,function(o){return o.room_type_value == _room_type})
          console.log('index',index)
          let array = []
          for(var item of this.multipleSelection){
            array.push(item.room_no)
          }
          this.preBillParam.rt_rate[index].dynamic_roomNumber = array
          console.log('this.preBillParam.rt_rate[index].dynamic_roomNumber',this.preBillParam.rt_rate[index].dynamic_roomNumber)
        },
        //入住人可选房间号==>基于选择房型的
        getEnter_RommNumber(){
          console.log('点击行时this.liveoptions_NoChange',this.liveoptions_NoChange)
          let array = []
          let array3 = []
          if(this.liveoptions_NoChange.length > 0){
            this.flag = true
            this.liveoptions = this.liveoptions_NoChange
          }else{
            this.flag = false
            console.log('enter else')
            for(var item of this.preBillParam.rt_rate){
              array.push(item.dynamic_roomNumber)
            }
            let array2 = array.reduce(function (a, b) { return a.concat(b)}) //二维数组变为一组
            //组装数组
            for(var item of array2){
             array3.push({
               roomNo: item,
               liveCount: '0',
             })
            }
          }
          this.liveoptions = array3
          this.flag === true ? this.liveoptions_Value = this.liveoptions_NoChange : this.liveoptions_Value = this.liveoptions
          console.log('下拉时',this.liveoptions)
        },
        //重复属性个数计算
        getWordCnt(arr){
          var obj = {};
          for(var i= 0, l = arr.length; i< l; i++){
            var item = arr[i];
            obj[item] = (obj[item] +1 ) || 1;
          }
          return obj;
        },
        //入住行下拉选中后change
        selectLive(row){
          // this.liveoptions.filter(item=>item.roomNo = row)
          let array = []
          for(var item of this.preBillParam.reserve_guest){
            array.push(item.room_number)
          }
          let array_1 = []//构造数组:选中的房间号 以及选中房间号的数量
          let a = this.getWordCnt(array)//obj
          for (let i in a) {
            array_1.push({
              roomNumber: i,
                count: a[i]
              }); //属性
          }
          for(var item of this.liveoptions){
            for(var itemm of array_1){
              if(item.roomNo === itemm.roomNumber){
                item.liveCount = itemm.count
              }
            }
          }
          this.liveoptions_NoChange = this.liveoptions
          console.log('点击行时this.liveoptions',this.liveoptions)
          console.log('点击行时this.liveoptions_NoChange',this.liveoptions_NoChange)
          // let index = _.findIndex(this.preBillParam.reserve_guest,function(o){return o.room_number == row})
          // console.log('index',index)

        },
        //获取楼层列表option
        //增加入住人
        addSelect_2(){
          let enterValue = {
            liveCount: 0,//可选数
            room_number: '',//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: '22',
            // descript_en: '22',
            list_order: 1,
            last_name: '22',
            first_name: '22',
            name2: '22',
            name_combi: '22',
            is_save: false,
            language: '2',
            title: '22',
            salutation: '22',
            race: '22',
            religion: '22',
            career: '122',
            nation: '22',
            visa_no: '22',
            visa_grant: '22',
            enter_port: '22',
            where_from: '22',
            where_to: '22',
            salary: '22',
            education: '22',
            marital: '22',
            company_id: '22',
            company_na: '222',
            pic_photo: '22',
            pic_sign: '22',
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: '22',
            email: '1016068291@qq.com',
            country_id: '22',
            division_id: '22',
            state_id: '22',
            city_id: '22',
            zipcode: '22',
            reserve_base_id: null,
            guest_id: 123456
          }
          this.preBillParam.reserve_guest.push(enterValue)
          this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_2(index){
          if(this.preBillParam.reserve_guest.length>1){
            if(this.preBillParam.reserve_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.preBillParam.reserve_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        addSelect_row(){
          let enterValue = {
            liveCount: 0,//可选数
            room_number: '',//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: '22',
            // descript_en: '22',
            list_order: 1,
            last_name: '22',
            first_name: '22',
            name2: '22',
            name_combi: '22',
            is_save: false,
            language: '2',
            title: '22',
            salutation: '22',
            race: '22',
            religion: '22',
            career: '122',
            nation: '22',
            visa_no: '22',
            visa_grant: '22',
            enter_port: '22',
            where_from: '22',
            where_to: '22',
            salary: '22',
            education: '22',
            marital: '22',
            company_id: '22',
            company_na: '222',
            pic_photo: '22',
            pic_sign: '22',
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: '22',
            email: '1016068291@qq.com',
            country_id: '22',
            division_id: '22',
            state_id: '22',
            city_id: '22',
            zipcode: '22',
            reserve_base_id: this.rowPreBillParam.reserve_base.order_no,
            guest_id: 123456
          }
          this.rowPreBillParam.reserve_guest.push(enterValue)
          this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_row(index){
          if(this.rowPreBillParam.reserve_guest.length>1){
            if(this.rowPreBillParam.reserve_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.rowPreBillParam.reserve_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        //增加选择框新建预定单里
        addSelect(){
          let room_type = {
            can_live_num: '',//add
            room_type_value: '',//房型名称对应ID
            room_type: '',//房型名称
            room_class: '1',
            room_number: '',//房间数几间 数组变字符串
            dynamic_roomNumber: [],//动态房间号=》应是一个数组
            // ['111', '222', '333','444', '555','666', '777']
            ratecode_id: '',//房价码
            fix_rate: '',
            roomCount: '',//房间数量=add=
            roomPrice: '', //总价钱=add=
            // code: '123',
            // code_name: '123',
            // descript: '123',
            // descript_en: '123',

            list_order: 123,
            reserve_base_id: '',
            checkin_date: '2018-12-01 10:10:01',
            checkin_time: '2018-12-01 10:10:01',
            code_room_special_ids: '1',
            code_room_facilities_ids: '1',
            is_arranged: false,
            rmocc_ids: '',
            add_person_num: 1,
            add_person_price: 1,
            add_bed_num: 1,
            add_bed_price: 1,
            code_pkg_id: 1,
            add_pkg_num: 1,
            add_pkg_price: 1,
            rate_service_fee: 1,
            rate_tax: 1,
            lower_price_id: 1,
            lower_price_reason: '1',
            lower_price_amount: 1,
            real_rate: 1,
            remark: ''
          }
          this.preBillParam.rt_rate.push(room_type)
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
            if(this.preBillParam.rt_rate.length>1){
            if(this.preBillParam.rt_rate.length ===2){
                this.showDeleteButton = false
            }
            this.preBillParam.rt_rate.splice(index, 1)
            }else{
            this.showDeleteButton = false
            return
            }
        },
        //关闭tag
        handleClose(item,tag) {
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
        },
        //验证预定数据
        validatePreviewData(){
            //判断选择房型为空时
          for(var item of this.preBillParam.rt_rate){
            if(item.room_type === ''){
                this.$message.warning('请选择房型!')
                return false
            }
          }
            //有入住人的时候
          if(this.is_addlive === true){
            for(var item of this.preBillParam.reserve_guest){
                util.validateBlank(item.telephone,'入住人中联系电话是必填项',this)&&
                util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
                util.validateBlank(item.id_no,'身份证是必填项',this)&&
                util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
            }
          }
        },
        validatePreData(){
          return (
            util.validateBlank(this.preBillParam.reserve_base.rsv_person_name, '预定人是必填项', this)&&
            util.validateBlank(this.preBillParam.reserve_base.telephone_master,'联系电话是必填项',this)&&
            util.validateTelNumber(this.preBillParam.reserve_base.telephone_master,'请输入正确手机格式',this)&&
            util.validateBlank(this.preBillParam.reserve_base.rsv_type_id,'请选择预定类型',this)
          )
        },
        //预定=》获取早餐list
        getBreakfastList(){
          let that = this
          // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
          // let url = that.UrLHeader + 'room/get_roomnumber_list/'
          let url = that.UrLHeader + 'room/rate_code/get_breakfast_list/'
          // let url = `http://47.98.113.173:9101/v1/room/rate_code/get_breakfast_list/`
          that.$axios({
          method : 'get',
          url : url,
          }).then(res=>{
            if(res.data.message === 'success'){
                that.breakfastAllList = res.data.data.results
            }else{
                // that.$message.error('获取早餐列表失败!')
            }
          }).catch(error=>{
          })
        },
        getConsumeData(msg){
            this.preBillParam.consumeInfoList = msg
            console.log(msg,'msg')//获取消费子组件传来的值
        },
        //预定单 早餐=》添加早餐项
        addbreakfastItem(item,param){
            if(param === '买'){
            let breakfastInfoValue={
                descript: item.price,//早餐描述=》类型
                date: '按天',//周期
                isBuy: '买',//买/赠
                rangeTime: item.starting_days + '-' + item.closing_days,//有效期
                number: '',
                price: item.price,
                count: '',
            }
            //暂时
            if(this.preBillParam.breakfastInfoList.length>0){
                return false
            }else{
                this.preBillParam.breakfastInfoList.push(breakfastInfoValue)
            }
            }else{
            let breakfastInfoValue={
                descript: item.price,//早餐描述=》类型
                date: '按天',//周期
                isBuy: '赠',//买/赠
                rangeTime: item.starting_days + '-' + item.closing_days,//有效期
                number: '',
                price: item.price,
                count: '',
                }
            //暂时
            if(this.preBillParam.breakfastInfoList.length>0){
                return false
            }else{
                this.preBillParam.breakfastInfoList.push(breakfastInfoValue)
            }
            }
        },
        //删除早餐项
        deleteBreakfastInfo(row){
            let index = _.findIndex(this.breakfastAllList,function(o) { return o.id == row.id}) //扎到索引
            this.preBillParam.breakfastInfoList.splice(index,1)//删除指定索引
        },
        //处理备注数据 第一次进去传个空[]进去
        resolveRemarkList(){
            if(this.preBillParam.remarkList.length === 1 && this.preBillParam.remarkList[0].remarkContent === ''){
            this.preBillParam.remarkList = []
            console.log('this.preBillParam.remarkList',this.preBillParam.remarkList)
            }
        },
        //预订单编辑详情备注
        handleRemarkInfo(row){
            this.addAndUpdate = false //标记
            this.remarkContent_value = row.remarkContent
            this.middle_remarkRow = row //接收
        },
        //预订单=》删除备注
        deleteRemarkInfo(row){
            console.log('row',row)
            let index = _.findIndex(this.preBillParam.remarkList,function(o) { return o.time == row.time}) //扎到索引
            console.log('index',index)
            this.preBillParam.remarkList.splice(index,1)//删除指定索引
        },
        //预订单=》新增备注
        addAndUpdateRemarkInfo(){
            console.log('this.addAndUpdate',this.addAndUpdate)
            //  remarkContent: '',
            //     remarkType: '订单备注',
            //     status: '预定',
            //     time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
            //     operationPeople: '',
            if(this.addAndUpdate === true){
                let remarkValue={
                    remarkContent: this.remarkContent_value,
                    remarkType: '订单备注',
                    status: '预定',
                    time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
                    operationPeople: '',
                }
                if(remarkValue.remarkContent){
                    this.preBillParam.remarkList.push(remarkValue)
                }else{
                    this.$message.warning('请输入备注信息')
                }
                console.log(this.preBillParam.remarkList)
            }else{
                this.middle_remarkRow.remarkContent =  this.remarkContent_value
            }
        },
        //获取预订单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
          //点击时判断不能重复选择房型
          let indexs = _.findIndex(this.preBillParam.rt_rate,function(o){return o.room_type_value == param.room_type})
            if(indexs >= 0){
              this.$message.warning('请不要重复选择!')
              return
            }
          console.log('item',item)
          console.log('param2131231',param)
          item.can_live_num = param.can_live_num
          item.room_type = param.room_type_name
          item.room_type_value = param.room_type
          switch (param) {
          case '风雅智能大床房':
              this.houseType_HeadValue = '标准正价[大床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥100'
              break;
          case '舒适大床房':
              this.houseType_HeadValue = '标准正价[标准双床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥80-￥95'
              break;
          case '风雅商务双床房':
              this.houseType_HeadValue = '标准正价[特惠双床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥80-￥95'
              break;
          case '风雅商务套房':
              this.houseType_HeadValue = '标准正价[特惠大床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥80-￥95'
              break;
          default:
              break;
          }
        },
        //预订单获取对应房类型
        getHouseTypePrice(item,index){
          // item.room_type = value
          console.log('item',item)
          console.log('index',index)
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.rt_rate[index].room_type = value//替换
          // console.log('this.preBillParam.rt_rate',this.preBillParam.rt_rate)
        },
         /**
         * 付款支付方式接口
         */
        getPayMode(){
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/pay_mode/info_list`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payModeList = res.data.data.list
            this.payModeList.push({
              id: 0,
              name: '现金'
            })
          }).catch(error=>{
          })
        },
        /**
         * 付款原因接口
         */
        getPayReason(){
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/code_pay_for/info_list`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payInfoList = res.data.data.list
          }).catch(error=>{
          })
        },
    }
}
</script>
<style lang="less" scoped>
  .houseTypeClass{
    .breakfast_class{
      li{
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        padding-right: 10px;
        padding-left: 10px;
      }
    }
  }
  .pop_bottom{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    // color: #666
  }
  .pop_state{
    display: flex;
    justify-content: space-between;
    .setbtn{
        width: 60px;
        height: 20px;
        line-height: 10px;
        background-color: #f7f7f7;;
        border: none;
        border: 1px solid #ddd;
        color: #666;
        font-size: 12px;
        cursor: pointer;
        // border-radius: 4px;
      }
  }
  .pop_state button:nth-child(2n-1) {
    margin-right: 5px
  }
  .pop_state button:nth-child(2) {
    margin-right: 5px
  }
  //选房号左侧
  .choose_no_class{
    li{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #b1bdbd;
      height: 47px;
      line-height: 47px;
      cursor: pointer;
    }
    background-color: #fff
  }
  //入预收操作ul
  .enter_pre_ul{
    li{
      margin-top: 15px;
      margin-left: 20px;
      margin-bottom: 5px;
      span{
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .choose_no_class li:nth-child(n){
    margin-left: 5px
  }
  .imgStyle{
    margin-left: 10px;
  }
  // .right> .right-card{
  //   // display: inline-block;
  // }
  .right> .right-card2{
    width: 120px;
    height: 70px;
    margin-top: -10px;
    background-color: #3D92F1;
    display: flex;
    justify-content: space-between
  }
  .checkIn-dialog .elColMiddle{
    margin-left: 10px
  }
  .preview-dialog .elColMiddle{
    margin-left: 10px
  }
  //消费样式
  .cousume_class{
    display: flex;
    justify-content: space-between;
    margin: 10px 0px 0px 10px;
  }
  .inline-div{
    display: flex;
    justify-content: space-between;
    color: #969696;
    margin-top: 20px;
  }
  .inline-div span{
    margin-left: 5px;
  }
  .room_pop{
    li{
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        padding-right: 10px;
        padding-left: 10px;
        &:hover{
          background-color:#E5E5E5;
          cursor: pointer;
        }
    }
  }
  .romm_pop_right {
      position: absolute;
      display: block;
      width: 350px;
      border: 1px solid #EBEEF5;
      top: 0px;
      left: 300px;
      background-color: #fff;
      border-radius: 4px;
    .romm_pop_right_behind{
      display: flex;
      justify-content: space-between;
      line-height: 35px;
      padding-right: 10px;
      padding-left: 10px;
      &:hover{
        background-color:#E5E5E5;
        cursor: pointer;
      }
    }
  }
  #singleModel{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2;
    background-color: rgba(9, 9, 9, 0.46);
  }
  .singleModel_2{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2;
    background-color: rgba(9, 9, 9, 0.46);
  }
  .dialog-header{
    background-color: #303A41;
    height: 10%;
    color: #fff;
    height: 54px;
    line-height: 54px;
  }
  .el-tag {
    border-radius: 24px
  }
  .pagination{
    margin: 36px 0 14px 0;
    overflow: hidden;
  }
  .preview-enter-dialog{
    .top-nav{
      background-color: #eff5f7;
      height: 28px;
      line-height: 28px;
      color: #2e5285;
      span{
        margin-left: 10px
      }
    }
  }
  // .el-pagination.is-background .el-pager li:not(.disabled).active {
  //   background-color: #68819E;
  //   color: #fff;
  // }
</style>
<style scoped>
  .buttonStyle>>> .el-button{
      margin-left: 10px;
      width: 10%;
      background-color: #8895A8
   }
   .button-style_2>>> .el-button{
     width: 80px;
     background-color: #8895A8
   }
   .preview-enter-dialog>>> .el-dialog__header{
    background-color: #8895A8;
   }
  .preview-enter-dialog>>>.el-dialog__title {
    color: white;
  }
  .preview-enter-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
   .houseTypeClass>>> .el-dialog__header{
    background-color: #8895A8;
   }
  .houseTypeClass>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .previewInfo-dialog>>> .el-dialog__footer{
    text-align: left;
  }
  .houseTypeClass>>> .el-dialog__footer{
    background-color: #F5F5F5;
    line-height: 35px;
  }
  .left-nav>>>.el-checkbox__label{
    width: 18vw;
  }
  /* .houseTypeClass>>> .el-dialog__body{
    background-color: #eaedf2;
  } */
  .houseTypeClass.deletePadding_Class>>> .el-dialog__body{
    padding: 0px 0px;
  }
  .previewInfo-dialog.deletePadding_Class>>> .el-dialog__body{
    padding: 0px 0px;
  }
  /* 消费 */
  .houseTypeClass>>> .el-collapse-item__content {
    padding-bottom: 10px
  }
  .houseTypeClass>>> .el-collapse-item__header{
    background-color: transparent;
    height: 40px;
    padding-left:10px;
  }
  .preview-dialog>>> .el-dialog__header{
    background-color: #ffb948;
  }
  .previewInfo-dialog>>> .el-dialog__header{
    background-color: #ffb948;
  }
  .room_pop>>> .el-popover{
    padding: 0;
  }
  .previewInfo-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .previewInfo-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .preview-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .preview-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .checkIn-dialog>>> .el-dialog__header{
    background-color: #303A41;
  }
  .checkIn-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .checkIn-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .colClass>>> .el-input-number{
    width: 130px;
  }
</style>
