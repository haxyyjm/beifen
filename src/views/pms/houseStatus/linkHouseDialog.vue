<template>
  <div>
    <el-dialog :close-on-click-modal = 'false' width="80%" class="previewInfo-dialog deletePadding_Class" title="联房列表"  :visible.sync="linkHouseFornVisible"
      @close="$emit('update:show', false);refundHouse = true;"
      :show="show">
      <el-row style="background-color: #fff; height: 450px">
        <el-col :span="5" style="background-color: #FFF; height: 100%">
            <el-row >
            <div style="margin-top: 10px;margin-bottom: 10px">
              <!-- <el-checkbox style="margin-left: 15px; float: left; height: 50px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                预订共<span>4</span>间
              </el-checkbox> -->
               <input  type='checkbox' class='input-checkbox more_class'  v-model='flag_checked' @click='selectCheckedAll'>详情
              <!-- <span style="margin-left: 20px">详情</span> -->
              <span style="float: right;margin-right: 10px">
                <!-- <span style="margin-right: 10px">预收:</span><span style="color: red;">¥{{moneydesc.pay_amount}}</span> -->
              </span>
              <div style="clear: both"></div>
            </div>
          </el-row>
          <el-row class="left-nav" style="height: 400px; overflow: auto">
            <!-- <div v-for='item in orderHouseInfo' :key="item.room_number" style="margin-bottom: 10px"> -->
              <!--给每个复选按钮绑定同一个v-mode数组变量，数组里面有相应的value就被选中-->
              <!-- <input type='checkbox'  name='checkboxinput' class='input-checkbox' v-model='checkboxList' :value="item.room_number">
              {{item.room_type}}
              <div style="display: inline-block; width: 18vw" @click="chooseInfo(item)">
            </div>
            </div> -->
              <ul v-for="(item,index) of preBillLinkParam.combine_room_list" :key="index">
                <li @click="getInfoByImportant(item,index)" :class="{activeColor: isActiveColor === index ? true : false}"  style="display: flex;justify-content:space-between; line-height: 40px; cursor: pointer;">
                  <input type='checkbox'  name='checkboxinput' class='input-checkbox' v-model='checkboxList' :value="item[0]">
                  <el-tag style="position: absolute;left: 16px;margin-top: 2px"  :disable-transitions="false">
                    <span style="color: #4488E9">{{item[0]}}</span>
                  </el-tag>
                    <span style="color: #7AAAEF;">{{item[2]}}</span>
                  <div style="margin-top: 5px">
                    <div class="refundClass" v-if="item[5] === 1">已退房</div>
                    <el-button v-if="item[3] === item[4]" size="mini" circle type="warning">主</el-button>
                    <el-button v-else-if="item[3] != null" size="mini" circle type="success">联</el-button>
                  </div>
                </li>
              </ul>
          </el-row>
        </el-col>
        <el-col :span="18">
          <el-tabs  v-model="activeName" @tab-click='tabClick' type="card" style="margin-left: 20px; width: 100%;">
            <el-tab-pane :label="tabValue" name="1">
              <div>
                <el-row class="buttonStyle">
                  <el-button  type="info" :disabled="banDisable()" @click="handleChangeRoom(preBillLinkParam)" round  size="mini">换房升降</el-button>
                  <!-- <el-button  type="info" :disabled="banDisable()" @click="changeNo()" round  size="mini">换房号</el-button> -->
                  <!-- <el-button type="info" @click="houseTypeDialog = true" round  size="small">换房型</el-button> -->
                  <!-- <el-button type="info" :disabled="banDisable()" @click="editPriceDialog = true" round  size="mini">修改价格</el-button> -->
                  <!-- <el-button type="info" round  size="small">转全天房</el-button> -->
                  <el-button type="info" :disabled="banDisable()" @click="leaveDialog = true;handleDate()" round  size="mini">提前离店</el-button>
                  <el-button type="info" :disabled="banDisable()" @click="continueLiveDialog = true; handleDate()" round  size="mini">续住</el-button>
                  <!-- <el-button type="info" round  size="small">无等待</el-button> -->
                  <el-button type="info" :disabled="banDisable()" round @click="enterPersonVisible = true;handleEnterPeople()"  size="mini">+入住人</el-button>
                  <!-- <el-button type="info" :disabled="banDisable()" round @click="handleUpdate()"  size="mini">更新</el-button> -->
                </el-row>
                <!--转全天房-->
                <div>
                  <div class="inline-div">
                    <span>订单状态：<span style="color: #9FBDF2 ">入住</span></span>
                    <span>市场码:<span>{{market_src}}</span></span>
                    <span>房型：<span>{{preBillLinkParam.room_type}}</span></span>
                    <span>当日价：<span style="color: #FC6784">¥{{current_rate_price}}</span></span>
                    <!-- <span style="width: 10%">
                      <img style="cursor: pointer"  src="../../../assets/images/pms/houseStatus/date2x.png">
                    </span> -->
                  </div>
                  <div class="inline-div">
                    <!-- <span style="width: 25%">入住类型：（共<span style="color: #FC6784 "></span>天)</span> -->
                    <span>来源码:
                      <!-- <span v-if="preBillLinkParam.master_type === 0">非会员/会员</span>
                      <span v-if="preBillLinkParam.master_type === 1">散客入住</span>
                      <span v-if="preBillLinkParam.master_type === 2">团队入住</span>
                      <span v-if="preBillLinkParam.master_type === 3">订房中心/OTA</span>
                      <span v-if="preBillLinkParam.master_type === 4">协议单位</span> -->
                      {{enter_src}}
                    </span>
                    <span>入住日期:<span>{{preBillLinkParam.arr_time}}</span></span>
                    <span>预计离店：<span>{{preBillLinkParam.leave_time}}</span></span>
                  </div>
                </div>
                <el-row style="height: 20px"></el-row>
                <div>
                  <el-table height="220" :data="preBillLinkParam.master_guest" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <!-- <el-table-column prop="member" label="会员"></el-table-column> -->
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column label="证件类型">
                       <template slot-scope="scope">
                        <span v-if="scope.row.id_code==='01'">身份证</span>
                        <span v-if="scope.row.id_code==='02'">户口簿</span>
                        <span v-if="scope.row.id_code==='03'">护照</span>
                        <span v-if="scope.row.id_code==='04'">台胞证</span>
                        <span v-if="scope.row.id_code==='05'">港澳通行证</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id_no" label="证件号"></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="账户明细" name="2">
              <el-row>
                <span style="margin-right:5px">营业日:</span>
                <el-date-picker :disabled="banDisable()" size="mini" style="width: 15vw" v-model="charge_date" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
                <el-button :disabled="banDisable()" type="primary" size="mini"  @click="queryData();clearTable();only_consume_flag = 0">查询</el-button>
                <!-- <el-button type="info" size="mini">校验预付款</el-button> -->
                <!-- <el-checkbox style="margin-left: 20px" v-model="pay_checked" @change="filterData('pay')">付款(钱)</el-checkbox>
                <el-checkbox v-model="refund_checked" @change="filterData('refund')">退款</el-checkbox>
                <el-checkbox v-model="consume_checked" @change="filterData('consume')">消费(账)</el-checkbox> -->
                <el-checkbox-group :disabled="banDisable()" v-model="checkList" @change="filterData" style="display: inline-block">
                  <el-checkbox style="margin-left: 20px" label="pay">付款(钱)</el-checkbox>
                  <el-checkbox label="refund" >退款</el-checkbox>
                  <el-checkbox label="consume">消费(账)</el-checkbox>
                </el-checkbox-group>
              </el-row>
              <el-table height="300" ref="table" :row-class-name="tableRowClassName" @selection-change="handleChargeChange" :data="tableData" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%; margin-top: 20px">
                <el-table-column
                  type="selection"
                  width="30">
                </el-table-column>
                <el-table-column  label="房间号">
                  <template slot-scope="scope">
                    {{scope.row.room_num}}
                  </template>
                </el-table-column>
                <el-table-column  label="类别">
                  <template slot-scope="scope">
                    <span v-if="scope.row.subject==='pay'">付款</span>
                    <span v-if="scope.row.subject==='refund'">退款</span>
                    <span v-if="scope.row.subject==='consume'">消费</span>
                    <!-- <span v-if="scope.row.subject==='transfer'">转账</span> -->
                  </template>
                </el-table-column>
                <el-table-column  label="入账代码">
                  <template slot-scope="scope">
                    {{scope.row.incoming_account_code_desc}}
                  </template>
                </el-table-column>
                <!--支付方式/付款原因-->
                <el-table-column  label="付款方式">
                  <template slot-scope="scope">
                    <span>{{scope.row.incoming_account_reason_desc}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="charge_amount" label="消费总数"></el-table-column>
                <el-table-column prop="can_arrange" label="剩余金额"></el-table-column>
                <!-- <el-table-column prop="pay_amount" label="付款"></el-table-column> -->
                <el-table-column prop="desc" label="备注"></el-table-column>
                <el-table-column prop="create_time" label="时间"></el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <el-tooltip effect="light" placement="bottom">
                      <div slot="content">{{scope.row.desc}}</div>
                      <span v-if="(scope.row.pay_status === 4)">已转账</span>
                      <span v-else-if="scope.row.subject === 'pay' && scope.row.pay_status === 0">已付款(入预收)</span>
                      <span v-else-if="scope.row.pay_status === 0 && scope.row.subject === 'consume'" style="color: #E6A23C">待结账</span>
                      <span v-else-if="scope.row.pay_status === 1">部分结账</span>
                      <span v-else-if="scope.row.pay_status === 2" >已结账</span>
                      <span v-else-if="scope.row.pay_status === 3" >已冲账</span>
                      <span v-else-if="scope.row.pay_status === 5" >挂AR</span>
                      <span v-else-if="scope.row.pay_status === 6" >异常</span>
                      <span v-else-if="scope.row.pay_status === 7">初始化</span>
                      <!-- <span v-else-if="scope.row.subject === 'refund'">已退款</span> -->
                    </el-tooltip>
                    <!-- <span v-if="scope.row.pay_status === 0 && scope.row.subject === 'transfer'">已到账</span> -->
                  </template>
                </el-table-column>
                 <!-- <el-table-column prop="desc" label="备注">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <!-- <el-button type="text" @click="setChongAccountRow(scope.row)" size="small">冲账</el-button> -->
                    <!-- <el-button type="text" @click="transferAccountDialog = true; getTransferAccountRow(scope.row)" size="small">转账</el-button> -->
                    <!-- <el-button :disabled="infoDisable(scope.row)" @click="checkAccount(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" :disabled="refundDisable(scope.row)"  @click="handleRefund(scope.row)" size="small">退款</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="pagination">
                <!-- <p class="pull-left">显示第1到第6条记录，共{{accoutInfoList.length}}条记录</p> -->
                <!-- <el-pagination @current-change="queryData" :current-page="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination> -->
                <el-pagination :page-size="pagination.pageSize" @current-change="currentChange"
                    @size-change='sizeChange'
                    :current-page="pagination.pageNumber"
                    :page-sizes="pagination.pageSizes"
                    :total="pagination.totalRows"
                    :layout="pagination.layout"
                    >
                </el-pagination>
              </el-row>
              <el-row>
                <span style="float: left;">
                  <span>消费: &nbsp;<span style="color: #FC6784">¥{{moneydesc.total_consumption}}</span></span>
                  <span style="margin-left: 5px">预收:&nbsp;(含预授权): &nbsp;<span style="color: #96BAF1">¥{{moneydesc.pay_amount}}</span></span>
                  <span style="margin-left: 5px">余额:&nbsp;: &nbsp;<span style="color: #FC6784">¥{{moneydesc.balance}}</span></span>
                  <span style="margin-right: 20px"><span v-if="moneydesc.balance<0">应付:</span> <span v-else>应退:</span> &nbsp;<span style="color: #96BAF1">¥{{Math.abs(moneydesc.balance)}}</span></span>
                </span>
                <span style="float: right">
                  <el-button-group>
                    <!-- <el-button type="primary" @click="tiaoDialog = true;flushTiaoData()">调账</el-button>  -->
                    <!-- <el-button type="info" size="mini" v-if="multipleSelection_page.length> 0 ||multipleSelectionAll.length > 0" disabled>分账</el-button>
                    <el-button :disabled="banDisable()" type="primary" v-else size="mini"  @click="fenAccountDialog = true;flushSplitParam()">分账</el-button> -->
                    <el-button type="info" size="mini" v-if="multipleSelection_page.length=== 0 && multipleSelectionAll.length === 0"  disabled  plain>转账</el-button>
                    <el-button type="primary" size="mini" @click="handleTransferData();" v-else>转账</el-button>
                    <el-button type="info" size="mini"  v-if="controlShow()" disabled>结账</el-button>
                    <el-button :disabled="banDisable()" type="danger" size="mini" v-else  @click="handleJieAccount();">结账</el-button>
                    <el-button type="primary" size="mini" @click="calculateAccount()">部分结账</el-button>
                    <!-- <el-button  type="danger" size="mini"   @click="clearTable();">清除</el-button> -->
                    <!-- <el-button type="primary" size="mini" @click="calculateAccount();">合并结账</el-button> -->
                  </el-button-group>
                  <!-- <el-row style="height: 10px"></el-row>
                  <el-row> -->
                    <!-- <el-button type="primary">平账</el-button>  -->
                  <!-- </el-row> -->
                </span>
              </el-row>
              <el-row style="height: 20px"></el-row>
              <!-- <hr style="width: calc(100% + 20px); margin-top: 20px; background-color: #D0D0D0"/> -->
            </el-tab-pane>
            <el-tab-pane label="预授权" name="6">
              <el-table height="350" :data="authorizationList"  :header-cell-style="{background:'#373d41', color: '#FFFFFF'}">
                <el-table-column prop="status_desc"  label="状态">
                  <!-- <template slot-scope="scope">
                    <span v-if="scope.row.status === 0">正常</span>
                    <span v-if="scope.row.status === 1">已完成</span>
                    <span v-if="scope.row.status === 2">已撤销</span>
                    <span v-if="scope.row.status === 3">异常</span>
                  </template> -->
                </el-table-column>
                <el-table-column prop="card_type_desc" label="项目">
                </el-table-column>
                <el-table-column prop="authorized_amount" label="金额"></el-table-column>
                <el-table-column prop="authorize_num" label="授权号"></el-table-column>
                <el-table-column prop="card_num" label="卡号"></el-table-column>
                <el-table-column prop="desc" label="备注"></el-table-column>
                <el-table-column label="撤销">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleCancle(scope.row)">撤销</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="早餐" name="3">
              <el-row style="background-color: #F4F4F4; padding: 10px;5px;10px;5px; border: 1px solid #E9E9E9">
                <div style="float: left;">
                  <span style="margin-right:5px">营业日:</span>
                  <el-date-picker size="mini" style="width: 40%" v-model="value4" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
                  <el-button type="primary" size="mini">查询</el-button>
                </div>
                <el-button size="mini" type="info" style="float: right; background-color: #8895A8; color: #fff">+买早餐卷</el-button>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-button size="mini" style="background-color: #CCCCCC; color: #fff">作废</el-button>
                <el-button size="mini" style="background-color: #CCCCCC; color: #fff">使用</el-button>
              </el-row>
              <el-table :data="tableData_4" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                  <el-table-column prop="code" label="备注内容"></el-table-column>
                  <el-table-column prop="price" label="备注类型"></el-table-column>
                  <el-table-column prop="number" label="状态"></el-table-column>
                  <el-table-column prop="enterTime" label="备注日期"></el-table-column>
                  <el-table-column prop="person" label="操作人"></el-table-column>
                  <el-table-column prop="person" label="操作"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="备注" name="4">
              <el-row style="background-color: #F4F4F4; padding: 10px;5px;10px;5px; border: 1px solid #E9E9E9">
                <div style="float: left;">
                </div>
                <el-button size="mini" type="info" :disabled="banDisable()" @click="remarkDialog = true;addAndUpdate = true;remarkTitle = '新增备注'" style="float: right; background-color: #8895A8; color: #fff">+新增备注</el-button>
              </el-row>
              <el-table height="300" :data="remarkList" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%">
                <el-table-column prop="content" label="备注内容"></el-table-column>
                  <!-- <el-table-column prop="person" label="状态"></el-table-column> -->
                  <el-table-column prop="modify_time" label="备注日期"></el-table-column>
                  <el-table-column prop="modify_user.user_name" label="操作人"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button :disabled="banDisable()" @click="remarkDialog = true; addAndUpdate = false; handleRemarkInfo(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button :disabled="banDisable()" @click="deleteRemarkInfo(scope.row)" type="text" size="small">注销</el-button>
                    </template>
                  </el-table-column>
              </el-table>
            </el-tab-pane>
             <el-tab-pane label="发票" name="5">
              <div style="height: 350px">
                <el-table :data="invoiceList" height="300" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%">
                  <el-table-column prop="invoice_number" label="发票号码"></el-table-column>
                  <el-table-column prop="invoice_title" label="发票抬头"></el-table-column>
                  <el-table-column label="发票类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.invoice_type == 0">普票</span>
                      <span v-else>增值税专用发票</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="发票金额"></el-table-column>
                  <el-table-column prop="create_time" label="时间"></el-table-column>
                  <el-table-column prop="desc" label="备注"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="deleteInvoice(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
             </el-tab-pane>
             <!-- <el-tab-pane label="借物" name="6">
             </el-tab-pane> -->
          </el-tabs>
        </el-col>
      </el-row>
      <!--最后一行样式-->
      <div slot="footer" class="dialog-footer">
        <div style="float: left">
          <el-button :disabled="banDisable_2()" type="info" size="small" @click="linkRoomDialog = true; getLinkRoomData()" style="background-color: #FDB754;border-color: #FDB754">编辑联房</el-button>
          <!-- <el-button type="info" size="small" style="background-color: #CCCCCC; border-color: #CCCCCC; ">欠离</el-button> -->
          <!-- <el-button :disabled="banDisable()" type="danger" size="small" :loading="!refundHouse"  @click="selectPerson();">
            <span v-if="refundHouse == true">退房</span>
            <span v-else>查房</span>
          </el-button> -->
          <el-button type="danger" @click="pingAccount()" :disabled="banDisable_2()" size="small">退房</el-button>
        </div>
        <!-- <el-button type="info" size="small">日志[1]</el-button> -->
        <el-button type="info" :disabled="banDisable()"  @click="billDialog = true;billParam.invoice_type = 0" size="small">发票</el-button>
        <!-- <el-button type="info" @click="consumptionDialog = false" size="small">消费</el-button> -->
        <!-- <el-button type="info" @click="borrowingDialog = false" size="small">借物</el-button> -->
        <el-button type="info" :disabled="banDisable()" @click="handleAuthorization()"  size="small">预授权</el-button>
        <el-button type="info" :disabled="banDisable()" @click="activateCard()"  size="small">制卡</el-button>
        <!-- <el-button type="info" @click="settingDialog = false" size="small">设置</el-button> -->
        <el-button type="info" :disabled="banDisable()" @click="handlePreviewEnterBill()" size="small">入预收</el-button>
        <el-button type="info" :disabled="banDisable()" @click="enterBillDialog = true;consume_check_flag = false;fee_check_flag= false;handleEnterBill()" size="small">入消费</el-button>
        <!-- <el-button type="info" :disabled="banDisable()" size="small">打印单据</el-button> -->
      </div>
      </el-dialog>
        <!--换房升级房-->
      <el-dialog @close="flushChangeData" width="35%" class="houseTypeClass background" title="换房升降级" :visible.sync="changeRoomVisible">
        <div style="height: 340px; overflow: auto">
          <div class="roomClass">
            <el-input size="mini" style="width: 13vw" v-model="roomParam.oldType"></el-input>
            <span>换房型</span>
            <el-select @focus="getOnlyRoomType()" style="width: 12vw" size="mini" v-model="roomParam.newType">
              <el-option
                v-for="item in roomOnlyTypeList"
                :key="item.id"
                :label="item.room_type_desc"
                :value="item.room_type">
              </el-option>
            </el-select>
          </div>
         <div class="roomClass">
            <el-input size="mini" style="width: 13vw" v-model="roomParam.oldNumber"></el-input>
            <span>换房号</span>
            <el-select  style="width: 12vw" size="mini" v-model="roomParam.newNumber">
              <el-option
                v-for="item in roomNo_data_list"
                :key="item.id"
                :label="item.room_no"
                :value="item.room_no">
              </el-option>
            </el-select>
          </div>
          <el-row style="padding-left: 12px" class="roomClass_third">
            是否免费换房: 
            <el-radio @change="witchRoom" style="padding-left: 12px" v-model="roomParam.isFee" label="1">是</el-radio>
            <el-radio @change="witchRoom" v-model="roomParam.isFee" label="2">否</el-radio>
          </el-row>
          <el-row style="padding-left: 12px">
            <span style="padding-left: 15px">原房价:</span> 
            <el-input @input="roomParam.oldPrice = roomParam.oldPrice.replace(/[^\d.]/g,'')" size="mini" class="roomClass_third width" v-model="roomParam.oldPrice"></el-input>
          </el-row>
          <el-row style="padding-left: 12px">
          <span style="padding-left: 30px">折扣:</span> 
          <el-input :disabled="isDiscount" @blur="computeData" @input="roomParam.discount = roomParam.discount.replace(/[^\-?\d.]/g,'')" placeholder="示例:100或者-100" size="mini" class="roomClass_third width" v-model="roomParam.discount"></el-input>
          </el-row>
          <el-row style="padding-left: 12px">
            <span @input="roomParam.newPrice = roomParam.newPrice.replace(/[^\d.]/g,'')" style="padding-left: 15px">现房价:</span> <el-input size="mini" class="roomClass_third width" v-model="roomParam.newPrice"></el-input>
          </el-row>
          <el-row style="padding-left: 12px">
            <span style="display: inline-block;height: 55px;">换房理由:</span> <el-input type="textarea" class="roomClass_third width" :rows="2" v-model="roomParam.reason"></el-input>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmChangeRoom()" type="primary">确认</el-button>
        </div>
      </el-dialog>
      <!--计算结账-->
       <el-dialog class="houseTypeClass" title="结账" :visible.sync="calculateDialog">
        <div style="height: 200px; overflow: auto">
          <el-form>
            <el-form-item label="房间号:">
              <span>{{preBillLinkParam.room_number}}</span>
            </el-form-item>
            <el-form-item label="预收:">
              <span>{{moneydesc.pay_amount}}</span>
            </el-form-item>
            <el-form-item label="总消费:">
              <span>{{moneydesc.total_consumption}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary">结账</el-button>
        </div>
      </el-dialog>
      <!-- 人员查询 -->
      <el-dialog class="houseTypeClass"  title="查房人员" :visible.sync="personDialog" :modal="true">
          <div style="height: 400px">
            <el-table @row-click="watchRoom" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" ref="multipleTable"  :data="personOptions" style="width: 100%;height: 400px; overflow:scroll">
              <el-table-column prop="user_name" label="姓名"></el-table-column>
              <el-table-column prop="id" label="id"></el-table-column>
              <el-table-column prop="open_id" label="open_id"></el-table-column>
            </el-table>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
          </div> -->
      </el-dialog>
      <!--账务提醒，备注-->
      <el-dialog class="houseTypeClass" width="30%" :title="remarkTitle" :visible.sync="remarkDialog">
        <div style="height: 200px">
          <el-input v-model="remarkContent_value" placeholder="请输入备注信息" type="textarea" :rows="10"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"   @click="addAndUpdateRemarkInfo();">保存</el-button>
        </div>
      </el-dialog>
      <!--新建预订单=>设置-->
      <el-dialog class="houseTypeClass" width="50%"   title="设置" :visible.sync="settingDialog" :modal="true">
        <div style="height: 400px">
          <ul style="text-align: right; float:left;">
            <li>
              是否固定房价<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.is_fix_rate" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
            <li style="margin-top: 10px">
              是否保密订单<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.is_secrete" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
            <li style="margin-top: 10px">
              是否房价保密<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.is_secret_rate" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
            <li style="margin-top: 10px">
              是否允许记账<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.allowed_ar" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger"  @click="settingDialog=false">保存</el-button>
        </div>
      </el-dialog>
      <!-- ==========================================================分割========================================================================================================= -->
        <!-- 添加入住人dialog -->
        <el-dialog @close="getEnterInfoByRoom()" class="houseTypeClass" width="70%" title="入住人" :visible.sync="enterPersonVisible" :modal="true">
          <div style="height: 400px">
             <div style="height: 400px;margin-top: 10px; overflow: auto">
                <div  v-for="(item,index) in preBillLinkParam.master_guest" :key="index" style="margin-top: 10px">
                  <div style="diplay: inline-block">
                      <span style="padding-left: 14px">入住人:</span>
                      <el-input size="mini"  v-model="item.room_number" style="width: 9.8vw" disabled placeholder="房间号"></el-input>
                      <el-input size="mini" :disabled="index<disableLength" v-model="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                      <el-select size="mini" :disabled="index<disableLength" v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                        <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-select size="mini" :disabled="index<disableLength" v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                        <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                      </el-select>
                      <el-input size="mini" :disabled="index<disableLength"  v-model="item.id_no "  placeholder="证件号码"  style="width: 12vw"></el-input>
                      <el-input size="mini" :disabled="index<disableLength"  v-model="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                  </div>
                  <div style="display: inline-block">
                      <el-input size="mini" :disabled="index<disableLength"  v-model="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 64px; margin-top: 10px"></el-input>
                  </div>
                  <!-- 预定房间入住人多选 +-->
                  <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                  <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                  <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="confirmAddPeople()">确定</el-button>
          </div>
        </el-dialog>
        <!--更新入住后的数据-->
       <el-dialog class="houseTypeClass" width="50%" title="更新" :visible.sync="updateVisible" :modal="true">
          <div style="height: 400px">
            <div style="height: 400px;margin-top: 10px; overflow: auto">
              <el-form ref="ruleForm" label-width="100px">
                <el-form-item label="市场码" prop="name">
                  <el-input v-model="market_src"></el-input>
                </el-form-item>
                <el-form-item label="来源码" prop="region">
                  <el-input v-model="enter_src"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="confirmAddPeople()">确定</el-button>
          </div>
        </el-dialog>
       <!--转账 针对账户id-->
      <el-dialog class="houseTypeClass" title="转账" :visible.sync="transferAccountDialog" :modal="false">
        <div style="height: 400px">
            <el-table :data="transferTabel" :header-cell-style="{background:'#3d4a53', color: '#879AB4'}" style="width: 100%; height: 260px;overflow: auto; margin-top: 20px">
              <el-table-column prop="incoming_account_code_desc"  label="入账代码">
                </el-table-column>
                <el-table-column prop="charge_amount" label="消费总数"></el-table-column>
                <!-- <el-table-column prop="pay_amount" label="付款"></el-table-column> -->
                <!-- <el-table-column prop="number" label="房号"></el-table-column> -->
                <el-table-column prop="create_time" label="时间"></el-table-column>
            </el-table>
            <div>
            <el-row style="height: 20px"></el-row>
            <el-row>
              转账目标:
              <el-select size="mini"  @focus="getTransferOption"  v-model="transferAccountId"  placeholder="请选择">
                <el-option
                  v-for="item in transferOptions"
                  :key="item.account_id"
                  :label="item.room_number"
                  :value="item.account_id">
                </el-option>
              </el-select>
              <span v-show="transferAccountId === '-1'">AR账户:</span>
              <el-select v-show="transferAccountId === '-1'" size="mini" @focus="getArOption" filterable clearable  v-model="arAccountId"  placeholder="请选择">
                <el-option
                  v-for="item in arOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.account.id">
                </el-option>
              </el-select>
            </el-row>
            <el-row style="height: 20px"></el-row>
            <el-row>
              转出金额:
              <el-input size="mini" style="width: 14vw" disabled v-model="transferMoneyValue"></el-input>
              <!-- (可转账金额<span style="color: red">{{transferNeedpayValue}}</span>)   -->
            </el-row>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmTransfer()">确定</el-button>
          </div>
      </el-dialog>
       <!--针对支付明细进行退款 -->
      <el-dialog class="houseTypeClass" title="退款" :visible.sync="refunAccountDialog" :modal="false">
        <div style="height: 400px">
          <!-- <el-row>
            退款金额:
            <el-input style="width: 14vw" v-model="refundMoneyValue"></el-input>
            最大可退款额度为<span style="color: red">{{maxRefundMoney}}</span>
          </el-row> -->
          <el-form>
            <el-form-item label="退款金额:">
              <el-input size="mini" style="width: 14vw" v-model="refundMoneyValue"></el-input>
              最大可退款额度为<span style="color: red">{{maxRefundMoney}}</span>
            </el-form-item>
            <el-form-item>
              <span style="margin-right: 22px">收银点:</span>
              <el-select size="mini" clearable  style="width: 14vw"  @focus="getCashRegister" v-model="previewEnterBill.cashValue"  placeholder="请选择">
                <el-option
                  v-for="item in cashRegisterList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款方式:">
              <el-select clearable @change="previewEnterBill.enterAccountCode=''" size="mini" style="width: 14vw; margin-top: 10px"  @focus="getPayReason()" placeholder="退款原因"  v-model="previewEnterBill.payReasonValue">
                <el-option
                  v-for="item in this.payInfoList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入账代码:">
              <el-select clearable @change="showExpand"  @focus="getIncomingAccount()"  v-model="previewEnterBill.enterAccountCode" size="mini" style="width: 14vw; margin-top: 10px;"  placeholder="请选择">
                <el-option
                  v-for="item in incomingAccoutList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
               <span style="margin-right: 24px">备注:</span>
              <el-input type="textarea" v-model.trim="previewEnterBill.remark" size="mini" :rows="2" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="备注:">
              <el-input type="textarea" :rows="4" style="width: 85%"></el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmRefund()">确定</el-button>
        </div>
      </el-dialog>
      <!--提前离店-->
      <el-dialog class="houseTypeClass" title="提前离店" :visible.sync="leaveDialog" :modal="false">
        <div style="height: 400px">
          <el-form>
            <el-form-item label="原入离日期:">
              <el-date-picker size="mini" disabled style="width: 30%" v-model="before_leave_time" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="现离店日期:">
              <el-date-picker size="mini" disabled type="date" v-model="after_leave_time_1"></el-date-picker>
              <span>-</span>
              <el-date-picker size="mini" type="date" v-model="after_leave_time_2"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input size="mini" v-model="remark_continue" style="width: 85%" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary"  @click="confirmContinueRoom">确定</el-button>
        </div>
      </el-dialog>
      <!--编辑联房-->
      <el-dialog class="houseTypeClass" width="70%" title="编辑联房" :visible.sync="linkRoomDialog">
        <div style="height: 400px;" class="transfer_class">
            <el-transfer
              style="text-align: left; display: inline-block"
              filterable
              filter-placeholder="请输入房间号"
              v-model="linkValue"
              @change="handleChange"
              @right-check-change = 'rightLink'
              :titles="['可联房间', '已联房间']"
              :props="{
                key: 'account_id',
                label: 'room_number'
              }"
              :data="linkData">
              <span slot-scope="{ option }">
                <el-button size="mini" type="primary" plain round>{{option.room_number}}</el-button>
                <span style="margin-left: 15px">{{option.name}}</span>
                <el-tag style="margin-left: 15px"  type="success" v-if="option.id === option.master_id">主</el-tag>
                <el-tag style="margin-left: 15px"  type="success" v-if="option.master_id != null && option.master_id != '' && option.id != option.master_id">联</el-tag>
              </span>
              <el-button class="transfer-footer" type="danger" round @click="setAccount()" slot="right-footer" size="small">设主账房</el-button>
            </el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmLinkRoom" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <!--分账-->
      <el-dialog class="houseTypeClass" title="拆分项目" :visible.sync="fenAccountDialog">
        <div style="height: 400px;">
          <el-form :label-position="labelPosition" label-width="160px" >
            <!-- <el-form-item label="营业项目:">
              <el-input style="width: 20vw"></el-input>
            </el-form-item> -->
            <el-form-item label="描述:">
              <el-input size="mini" v-model="splitAccountParam.desc"  style="width: 20vw"></el-input>
            </el-form-item>
            <el-form-item label="分账方式:">
              <el-select size="mini" style="width: 20vw" v-model="splitAccountParam.split_method_id">
                <el-option  v-for="item in splitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="单号:">
               <el-input  style="width: 20vw"></el-input>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input size="mini" v-model="splitAccountParam.remark" style="width: 20vw"></el-input>
            </el-form-item>
            <el-form-item v-if="splitAccountParam.split_method_id === 0" label="请输入拆分后的金额:">
               <el-input size="mini" placeholder="请输入金额" v-model="splitAccountParam.split_amount"  style="width: 20vw"></el-input>
            </el-form-item>
            <el-form-item v-if="splitAccountParam.split_method_id === 1" label="请输入拆分后的数量:">
               <el-input  size="mini" placeholder="请输入拆分数量" v-model="splitAccountParam.num" style="width: 20vw"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="splitAccount()" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <!--结账-->
      <el-dialog @close="extraInformation=[];previewEnterBill.pre_author_id = '';jie_authorization_flag = false;jie_flag = false " class="houseTypeClass" :title="jieAccountTitle" :visible.sync="jieAccountDialog">
        <div style="height: 550px; overflow: auto">
          <el-form>
            <!-- <el-form-item label="加收房费:">
              <el-radio>免加收</el-radio>
              <el-radio>加收全天</el-radio>
              <el-radio>加收半天</el-radio>
            </el-form-item> -->
            <el-form-item label="房间号:">
              <span>{{preBillLinkParam.room_number}}</span>
            </el-form-item>
            <el-form-item label="预收(含预授权):">
              <span>{{moneydesc.pay_amount}}</span>
              <span style="padding-left: 30px">(预授权:</span><span style="color:rgb(252, 103, 132);bold">{{endPayListParam.usable_pre_authorized}}</span>)
            </el-form-item>
            <el-form-item label="总消费:">
              <span>{{moneydesc.total_consumption}}</span>
            </el-form-item>
            <el-form-item label="余额:">
              <span>{{-moneydesc.balance}}</span>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance > 0" label="总退款金额:">
              <span>{{Math.abs(moneydesc.balance)}}</span>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance < 0" label="应收金额:">
              <span>{{Math.abs(moneydesc.balance)}}</span>
            </el-form-item>
            <!-- <el-form-item label="欠款离店:">
              <el-switch active-value="1" inactive-value="0" active-text="是" inactive-text="否"  v-model="isDebt"></el-switch>
            </el-form-item> -->
            <!-- <el-form-item label="收银点:">
                <el-select style="margin-left: 15px" size="mini"  clearable   @focus="getCashRegister" v-model="previewEnterBill.cashValue"  placeholder="请选择">
                  <el-option
                    v-for="item in cashRegisterList"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="付款方式:">
              <el-select size="mini" clearable  @change="get_fields_by_payId" @focus="get_list_by_hotel" v-model="previewEnterBill.payMode"   placeholder="请选择">
                <el-option
                  v-for="item in payModelist_other"
                  :key="item.id"
                  :label="item.model_name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span style="margin-left: 10px">金额:</span> <el-input  size="mini" placeholder="请输入金额" v-model="previewEnterBill.money" style="width: 12vw"></el-input>
            </el-form-item> -->
              <!--预授权-->
            <el-form-item label="预授权:" v-if="moneydesc.balance < 0 && endPayListParam.usable_pre_authorized !=0">
              <el-select size="mini" style="width:35%" clearable @change="changeMoney"  @focus="findAuthorizationList" v-model="previewEnterBill.pre_author_id"   placeholder="请选择">
                <el-option
                  v-for="item in authorizationList_normal"
                  :key="item.id"
                  :label="item.authorize_num"
                  :value="item.id">
                  <span style="float: left">授权号:{{ item.authorize_num }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">金额:{{ item.authorized_amount }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="(previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38)&& moneydesc.balance >= 0">
              扫码方式:
              <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
              <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
            </el-form-item> -->
            <!-- <el-form-item label="付款方式:">
                <el-select size="mini" @change="previewEnterBill.enterAccountCode=''" clearable  @focus="getPayReason()" placeholder="付款原因"  v-model="previewEnterBill.payReasonValue">
                  <el-option
                    v-for="item in this.payInfoList"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item  label="入账代码:">
              <el-select size="mini" clearable  @focus="getIncomingAccount()" v-model="previewEnterBill.enterAccountCode"  placeholder="请选择">
                <el-option
                  v-for="item in incomingAccoutList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> -->
            <!--附加信息==>需要判断储值卡,银行卡,积分兑换-->
            <!-- <div style="margin-top: 30px; margin-bottom: 20px">
              <span style="color: #4488E9;margin-top: 10px;margin-left: -20vw">附加信息</span>
              <ul v-for="(item,index) of extraInformation" :key="index">
                <li v-if="item.is_show != 0">
                  <span style="margin-left: 28px">{{item.fields_describe}}:</span>
                  <el-input size="mini" v-model="item.acquiescence" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
              </ul>
            </div> -->
            <!-- <el-form-item label="封账:">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input size="mini" v-model="previewEnterBill.remark" type="textarea" :rows="4" style="width: 85%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-row style="height: 40px"></el-row>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button v-if="(previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38) && moneydesc.balance <= 0" type="primary" @click="article_number();pay_amount_money_code = ''">结算</el-button> -->
          <!-- <el-button v-if="moneydesc.balance <= 0" @click="handlePayCharge()"  type="primary">结账(收钱)</el-button>
          <el-button type="primary" v-if="moneydesc.balance > 0" @click="jie_addChargeDetail">结账(退款)</el-button> -->
          <el-button type="primary" @click="jie_addChargeDetail">结账</el-button>
          <!-- <el-button type="primary" v-if="(previewEnterBill.payMode != 1 && previewEnterBill.payMode != 38) &&moneydesc.balance > 0" @click="jie_addChargeDetail">结账(退款)</el-button>
          <el-button type="primary" v-if="(previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38) && moneydesc.balance > 0" @click="refundByWxWay">退款</el-button> -->
          <!-- <el-button v-else type="primary" @click="handlePayCharge()">付款</el-button> -->
        </div>
      </el-dialog>
      <!--选择房号-->
      <el-dialog class="houseTypeClass deletePadding_Class" title="换房号" :visible.sync="switchNumberDialog" :modal="true">
          <div style="height: 400px; width: 100%; background-color: #EBEDF1">
            <!-- <el-checkbox-group  v-model="checkList" @change="filterData" style="display: inline-block">
              <el-checkbox style="margin-left: 20px" label="pay">付款(钱)</el-checkbox>
              <el-checkbox label="refund" >退款</el-checkbox>
              <el-checkbox label="consume">消费(账)</el-checkbox>
            </el-checkbox-group> -->
            <div style="float: right;width: 100%;">
              <!-- <keep-alive> -->
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
              <!-- </keep-alive> -->
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changeRoom()" type="danger">提交</el-button>
          </div>
        </el-dialog>
        <!--续住-->
      <el-dialog class="houseTypeClass" title="续住" :visible.sync="continueLiveDialog">
        <div style="height: 400px;">
          <el-form>
            <!-- <el-form-item label="是否原价换房(免费升级):">
              <el-switch  active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item> -->
            <el-form-item label="原入离日期:">
              <el-date-picker size="mini" disabled style="width: 30%" v-model="before_leave_time" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="现离店日期:">
              <el-date-picker size="mini" disabled type="date" v-model="after_leave_time_1"></el-date-picker>
              <span>-</span>
              <el-date-picker size="mini" type="date" v-model="after_leave_time_2"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="选择换房型:">
              <el-select  v-model="temp_value"  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input size="mini" v-model="remark_continue" style="width: 85%" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary" @click="confirmContinueRoom">确定</el-button>
        </div>
      </el-dialog>
      <!--修改价格-->
      <el-dialog class="houseTypeClass" title="修改价格" :visible.sync="editPriceDialog" :modal="false">
        <div style="height: 400px">
          <el-form>
            <el-form-item label="是否换房源:">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item>
            <el-row style="background-color: #EFF5F7; color: #5B97EB; height: 30px;  margin-bottom: 15px">
              <span style="line-height: 32px; margin-left: 5px">客源:非会员</span>
            </el-row>
            <el-form-item label="房型首日价:">
              <span><span style="color: #FC6784">¥598.00</span>间</span>
              <el-button style="float: right" round type="primary">修改价格</el-button>
            </el-form-item>
            <el-form-item label="改价格理由:">
              <el-input type="textarea" :rows="4" style="width: 85%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <!--换房型-->
      <el-dialog class="houseTypeClass" title="换房型" :visible.sync="houseTypeDialog" :modal="false">
        <div style="height: 400px">
          <el-form  label-width="180px">
            <el-form-item label="是否原价换房(免费升级):">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item>
            <el-form-item label="选择换房型:">
              <el-select  v-model="temp_value"  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
              <span style="margin-left: 10px">当前房价:<span style="color: #FC6784">¥598.00</span>每间</span>
            </el-form-item>
            <el-form-item label="选择房间号:">
                <img style="margin-left: 2px; cursor: pointer"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
            </el-form-item>
            <el-form-item label="换房理由:">
              <el-input type="textarea" :rows="4" style="width: 90%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary">确定</el-button>
        </div>
      </el-dialog>
        <!--商品消费-->
        <el-dialog class="houseTypeClass" title="商品消费" :visible.sync="consumptionDialog" :modal="false">
          <div style="height: 400px">
            <el-row>
              <div style="float: left; margin-top: 10px "><span style="text-align: center">账单编号: M1212324432</span></div>
              <div style="float: right; margin-bottom: 20px">
                商品名称: <el-select  v-model="temp_value"   placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                <el-button type="primary">查询</el-button></div>
            </el-row>
            <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="code" label="商品编码"></el-table-column>
              <el-table-column prop="name" label="商品名称"></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="unitPrice" label="单价"></el-table-column>
              <el-table-column prop="number" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column prop="repertory" label="库存"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
            <el-row class="pagination">
              <p class="pull-left">显示第1到第6条记录，共6条记录</p>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="50" class="pull-right">
              </el-pagination>
            </el-row>
            <el-row>
              部门:<el-select  v-model="temp_value" style="width: 120px"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>  &nbsp;
              类别:<el-select  v-model="temp_value" style="width: 120px"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-row>
            <el-row style="margin-top: 20px; display: flex; justift-content: space-between">
              <span style="width: 35px">备注:</span>
              <el-input type="textarea" :rows="4" ></el-input>
            </el-row>
          </div>
          <div style="height: 40px; margin-top: 40px">
            <div style="float: left">
              <el-button  type="info">预约发票</el-button>
            </div>
            <div style="float: right">
              <el-button  type="primary">开具专票</el-button>
              <el-button  type="primary">开具普票</el-button>
            </div>
          </div>
        </el-dialog>
        <!--入预收-->
        <el-dialog @close="extraInformation = []" class="houseTypeClass" :close-on-click-modal = 'false'  width="50%" title="入预收" :visible.sync="preview_enterBillDialog" :modal="false">
          <div>
            <div style="height: 380px; text-align: center;overflow: auto">
              <ul>
                <li>
                  账户信息:<el-input v-model="previewEnterBill.billInfo"  size="mini" style="width: 20vw;margin-left:10px"></el-input>
                </li>
                <!-- <li>
                  支付方式:<el-select clearable @change="get_fields_by_payId"   @focus="get_list_by_hotel" v-model="previewEnterBill.payMode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in payModelist_other"
                              :key="item.id"
                              :label="item.model_name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li> -->
                 <li>
                  <span style="margin-left: 15px">收银点:</span><el-select clearable   @focus="getCashRegister" v-model="previewEnterBill.cashValue" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in cashRegisterList"
                              :key="item.id"
                              :label="item.desc"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li>
                <li v-if="previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38" style="margin-top: 10px;">
                  扫码方式:
                  <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
                  <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
                </li>
                <li>
                  <span>付款方式:</span>
                  <el-select clearable @change="previewEnterBill.enterAccountCode=''" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  @focus="getPayReason()" placeholder="付款原因"  v-model="previewEnterBill.payReasonValue">
                    <el-option
                      v-for="item in this.payInfoList"
                      :key="item.id"
                      :label="item.desc"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  入账代码:
                  <el-select clearable @change="showExpand"  @focus="getIncomingAccount()"  v-model="previewEnterBill.enterAccountCode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                    <el-option
                      v-for="item in incomingAccoutList"
                      :key="item.id"
                      :label="item.desc"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">金额:</span><el-input type="text" v-model.trim="previewEnterBill.money" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
                 <li>
                  <span style="margin-left: 28px">备注:</span><el-input type="textarea" v-model.trim="previewEnterBill.remark" size="mini" :rows="2" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
                <!--附加信息==>需要判断储值卡,银行卡,积分兑换-->
                <div style="margin-top: 30px">
                  <span style="color: #4488E9;margin-top: 10px;margin-left: -20vw">附加信息</span>
                  <ul v-for="(item,index) of extraInformation" :key="index">
                    <li v-if="item.is_show != 0">
                      <span style="margin-left: 28px">{{item.fields_describe}}:</span>
                      <el-input size="mini" v-model="item.acquiescence" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                    </li>
                  </ul>
                  <!-- <li>
                    <span style="color: #4488E9;margin-top: 10px;margin-left: -20vw">附加信息</span>
                  </li>
                   -->
                </div>
              </ul>
            </div>
            <!-- <div style="width: 55%; margin-left:20px">
              <el-table height="380" :data="accountMaxInfoList2" :header-cell-style="{background:'#CCCCCC', color: '#222222'}" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="code_income_type_id.name" label="入账代码"></el-table-column>
              <el-table-column prop="charge_amount" label="金额"></el-table-column>
              <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="deleteEnterBill(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            </div> -->
          </div>
           <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="openAuthorization()" type="primary">预授权</el-button> -->
            <!-- <el-button v-if="previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38" type="primary" @click="article_number();pay_amount_money_code = ''">结算</el-button> -->
            <el-button  type="primary" @click="handlePayCharge();">付款</el-button>
          </div>
        </el-dialog>
        <!-- <el-dialog class="houseTypeClass_authorization"  width="60%" title="信用预授权" :visible.sync="authorizationDialog" :modal="false">
          <div class="authorizationClass">
            <div class="div1">
              <el-table height="350"  :header-cell-style="{background:'#373d41', color: '#FFFFFF'}">
                <el-table-column prop="name" label="状态"></el-table-column>
                <el-table-column prop="member" label="项目"></el-table-column>
                <el-table-column prop="telephone" label="金额"></el-table-column>
                <el-table-column prop="id_no" label="已支付"></el-table-column>
                <el-table-column prop="id_no" label="单号"></el-table-column>
                <el-table-column prop="id_no" label="授权号"></el-table-column>
                <el-table-column prop="id_no" label="卡号"></el-table-column>
                <el-table-column prop="id_no" label="备注"></el-table-column>
              </el-table>
              <div class="div1_child">
                <div class="div1_child_1">
                  常用代码
                  <div>

                  </div>
                </div>
                <div class="div1_child_2">
                  宾客信用卡
                  <div>

                  </div>
                </div>
                <div class="div1_child_3">
                  宾客授权信息
                  <div></div>
                </div>
              </div>
            </div>
            <div class="div2">
              <div>
                <el-row><el-button type="primary" size="mini">增加预授权</el-button></el-row>
                <el-row><el-button type="primary" size="mini">预授权核对</el-button></el-row>
                <el-row><el-checkbox></el-checkbox>显示已撤销</el-row>
              </div>
              <div>
                <el-row><el-button type="primary" size="mini">转入登记单</el-button></el-row>
                <el-row><el-button type="primary" size="mini">转至其它</el-button></el-row>
              </div>
              <div>
                <el-row><el-button type="primary" size="mini">刷新</el-button></el-row>
              </div>
              <div>
                <el-row><el-button type="primary" size="mini">保存</el-button></el-row>
                <el-row><el-button type="primary" size="mini">日志</el-button></el-row>
              </div>
              <div>
                <el-row><el-button type="primary" size="mini">打印</el-button></el-row>
                <el-row><el-button type="primary" size="mini">退出</el-button></el-row>
              </div>
            </div>
          </div>
        </el-dialog> -->
        <!-- 打开预授权界面 -->
        <a-dialog :show.sync= authorizationDialog :parentInfoParam='authorizationParam' v-on:listenTochildEvent="getConsumeData"></a-dialog>
        <!--入账===入消费-->
        <el-dialog class="houseTypeClass" @close="queryData"  width="50%" title="入消费" :visible.sync="enterBillDialog" :modal="false">
          <div>
            <div style="height: 300px; text-align: center">
              <ul>
                <li>
                  账户信息:<el-input type="text" v-model="enterBill.billInfo"  size="mini" style="width: 20vw;margin-left:10px"></el-input>
                </li>
                <!-- <li>
                  支付方式:<el-select clearable  @focus="get_list_by_hotel" v-model="enterBill.payMode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in payModelist_other"
                              :key="item.id"
                              :label="item.model_name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li> -->
                <li>
                  <span>付款方式:</span>
                  <el-select clearable size="mini" @change="enterBill.enterAccountCode=''" style="width: 20vw; margin-top: 10px;margin-left:10px"  @focus="getPayReason()" placeholder="付款原因"  v-model="previewEnterBill.payReasonValue">
                    <el-option
                      v-for="item in this.payInfoList"
                      :key="item.id"
                      :label="item.desc"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                <li>
                  入账代码:<el-select clearable  @focus="getIncomingAccount()"  v-model="enterBill.enterAccountCode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in incomingAccoutList"
                              :key="item.id"
                              :label="item.desc"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span style="margin-left: 15px">收银点:</span><el-select clearable   @focus="getCashRegister" v-model="enterBill.cashValue" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in cashRegisterList"
                              :key="item.id"
                              :label="item.desc"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">金额:</span><el-input type="text" v-model.trim="enterBill.money" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
                <!-- <li>
                  <span style="color: #4488E9;margin-top: 10px">附加信息</span>
                </li>
                <li>
                  <span style="margin-left: 28px">账户:</span><el-select clearable  v-model="enterBill.accountData" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">摘要:</span>
                  <el-input  v-model.trim="enterBill.summary" type="textarea" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li> -->
                <li>
                  <span style="margin-left: 28px;line-height: 64px;">备注:</span>
                  <el-input  v-model.trim="enterBill.summary" type="textarea" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
              </ul>
            </div>
            <!-- <div style="width: 55%; margin-left:20px">
              <el-table :data="accountMaxInfoListCopy" :header-cell-style="{background:'#CCCCCC', color: '#222222'}" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="code_income_type_id.name" label="入账代码"></el-table-column>
              <el-table-column prop="charge_amount" label="金额"></el-table-column>
              <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="deleteEnterBill(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            </div> -->
          </div>
           <div slot="footer" class="dialog-footer">
            <el-button @click="flushEnterAccount()" type="info">清空</el-button>
            <el-button type="primary" @click="enterAccount_addChargeDetail()">入账</el-button>
          </div>
        </el-dialog>
        <!--支付成功后显示的页面-->
        <el-dialog
          :visible.sync="dialog_succeed"
          width="40%">
          <ul>
            <li style="text-align: center" v-if="ihatetheqrcode">
              <img src="@/assets/images/pms/houseStatus/triumph.png" alt="" style="width: 46px;height: 46px;">
              <span style="display: inline-block;height: 40px;line-height: 40px;vertical-align: top;margin-left: 10px;font-size: 20px">支付成功！</span>
            </li>
            <li style="text-align: center" v-else>
              <img src="@/assets/images/pms/houseStatus/fault.png" alt="" style="width: 46px;height: 46px;">
              <span style="display: inline-block;height: 40px;line-height: 40px;vertical-align: top;margin-left: 10px;font-size: 20px">支付失败！请返回重试</span>
            </li>
          </ul>

          <span slot="footer" class="dialog-footer">
            <!--<el-button @click="dialog_succeed = false">取 消</el-button>-->
            <el-button type="primary" @click="succeed_failed">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog class="houseTypeClass" title="调账" :visible.sync="tiaoDialog" :modal="false">
          <div style="height: 400px">
            <span>调账金额:</span>
            <el-input v-model="tiaoMoney" style="width: 10vw"></el-input>
            <span style="margin-left: 5vw">调账原因:</span>
            <el-select clearable  @focus="getTiaoReason"  v-model="tiaoReasonValue"  style="width: 12vw"  placeholder="请选择">
              <el-option
                v-for="item in tiaoReasonList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button type="primary"  @click="tiaoDialog=false">关闭</el-button> -->
            <el-button type="primary"  @click="setTiaoAccount()">确定</el-button>
          </div>
        </el-dialog>
        <!--发票-->
        <el-dialog @close="flushInvoice" class="houseTypeClass" title="发票" :visible.sync="billDialog" :modal="false">
          <div style="height: 300px;text-align: center;line-height: 50px">
            <ul>
              <li>发票号码:<el-input v-model="billParam.invoice_number" style="width: 60%" size="mini" type="text"></el-input></li>
              <li>发票抬头:<el-input v-model="billParam.invoice_title" style="width: 60%" size="mini" type="text"></el-input></li>
              <li>
                发票类型:
                <el-select v-model="billParam.invoice_type"  clearable  style="width: 60%" size="mini" type="text">
                  <el-option v-for="item in invoiceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </li>
              <li>开票金额:<el-input v-model="billParam.amount" style="width: 60%" size="mini" type="text"></el-input></li>
              <li><span style="margin-left: 26px">备注:</span><el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="billParam.desc" style="width: 60%" type="textarea"></el-input></li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="billDialog=false">关闭</el-button>
            <el-button type="primary" @click="addInvoice()">开具发票</el-button>
          </div>
          <!-- <div style="height: 40px">
            <div style="float: left">
              <el-button  type="info">预约发票</el-button>
            </div>
            <div style="float: right">
              <el-button  type="primary">开具专票</el-button>
              <el-button  type="primary">开具普票</el-button>
            </div>
          </div> -->
        </el-dialog>
        <!-- 扫码枪扫描 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="聚合支付" :visible.sync="dialog_alipay" :modal="true">
          <div style="width: 100%; height: 400px">
            <ul class="enter_pay_ul">
              <li><span>本次扫码支付金额:</span> <span style="color: #38cb25;"></span></li>
              <li><span>请使用扫码枪扫码:</span>
                  <el-input v-focus size="small" v-model="pay_amount_money_code" style="width: 8vw"></el-input>
                  <el-button size="small" @click="payment_ensure" type="danger" round>提交</el-button>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="dialog_alipay=false">关闭</el-button>
          </div>
        </el-dialog>
        <!--弹出微信二维码-->
        <el-dialog
          title="请扫描二维码"
          @close="flushTime()"
          :visible.sync="dialog_img"
          width="40%">
          <ul>
            <li v-if="img_wz" style="width: 100%">
              <img :src="img_src" alt="" style="margin-left: 24%">
            </li>
            <li v-else>
              <div id="qrcode" ref="qrcode" style="margin-left: 25%"></div>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <!--<el-button @click="dialog_alipay = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="payment_ensure ">确 定</el-button>-->
          </span>
        </el-dialog>
        <!--借物-->
        <el-dialog class="houseTypeClass" title="借物" :visible.sync="borrowingDialog">
          <div style="height: 400px">
            <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column prop="borrowing" label="租借物品"></el-table-column>
              <el-table-column prop="remark" label="备注内容"></el-table-column>
              <el-table-column prop="number" label="房号"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="time" label="操作时间"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
          </div>
          <div style="height: 40px">
            <div style="float: right">
              <el-button  type="primary">新增借物</el-button>
            </div>
          </div>
        </el-dialog>
        <!--退房提示-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <span>还未平账,是否强制退房?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false;cancleReturnHouse()">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false;confirmReturnHouse()">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 查房产生的消费 -->
        <el-dialog
          class="houseTypeClass" title="查房消费明细"
          :visible.sync="consume_dialogVisible"
          >
          <div style="height: 400px">
            <el-table :data="consume_data" height="380" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column prop="name" label="商品名"></el-table-column>
              <el-table-column prop="num" label="商品数量"></el-table-column>
              <el-table-column prop="price" label="单价"></el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <span style="margin-right: 10px">总消费金额:{{consume_checkRoom_price}}</span>
            <el-button size="mini" @click="confirm_consume_account('取消')">取 消入账</el-button>
            <el-button size="mini" type="primary" @click="confirm_consume_account('入账')">入账</el-button>
          </span>
        </el-dialog>
        <!-- 加收房费 -->
        <el-dialog
          class="houseTypeClass roomfee" width="30%" height="300" title="加收房费"
          :visible.sync="room_fee_dialog"
          >
          <div class="roomfeeClass">
            <div style="text-align:center">
              房间号:<span style="color: red;font-size: 20px;">{{preBillLinkParam.room_number}}</span>
            </div>
            <ul class="fee_ul">
              <li>
                <span>全天： 所选房间加收全天房费。</span>
              </li>
              <li>
                <span>半天： 所选客人加收半天房费。</span>
              </li>
              <li>
                <span>手工： 手工输入房费</span>
              </li>
              <!-- <li>
                <span>不加收： 不加收房费，按现有费用结账</span>
              </li> -->
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="confirmFee('全天')">全天</el-button>
            <el-button size="mini" type="primary" @click="confirmFee('半天')">半天</el-button>
            <el-button size="mini" type="primary" @click="confirmFee('手工')">手工</el-button>
            <el-button style="margin-right: 25%;" size="mini" type="primary" @click="confirmFee('不加收')">不加收</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import aDialog from './authorizationDialog'
import QRCode from 'qrcodejs2'
import util from '../../../common/util.js'
import transfer from '@/components/transfer/transfer'
import moment from 'moment'
import cDialog from './consumeDialog'
export default {
    data(){
      // const generateData = _ => {
      //   const data = [];
      //   for (let i = 1; i <= 15; i++) {
      //     data.push({
      //       key: i,
      //       label: `备选项 ${ i }`,
      //       disabled: i % 4 === 0
      //     });
      //   }
      //   return data;
      // };
        return {
          isDiscount: false,
          linkUrl: '',
          roomOnlyTypeList: [],
          rowParam: {},//行内对象
          /**换房升降级param */
          roomParam:{
            oldType: '',
            newType: '',
            oldNumber: '',
            newNumber: '',
            isFee: '2',
            oldPrice: '',
            discount: '',
            newPrice: '',
            reason: ''
          },
          changeRoomVisible: false,
          current_rate_price: 0,//当日价
          updateVisible: false,
          invoiceOptions:[
            {
              value: 0,
              label: '普票'
            },
            {
              value: 1,
              label: '增值税专用发票'
            },
          ],
          invoiceList: [],
          marketSrcList: [],//来源吗list
          marketList: [],
          enter_src: '',//客户来源
          market_src: '',
          billParam: {},
          jie_authorization_flag: false,//预授权结账
          jie_flag: false,//打开结账flag
          authorizationParam: {},
          authorizationList: [],//预授权list
          authorizationList_normal: [],//预授权list
          room_fee_dialog: false,//加收房费的dialog
          extraParam:[],
          extraInformation: [],//附加信息
          extraInformation_no: [],//去0
          consume_check_flag: false,//标记退房查房入账
          fee_check_flag: false,//标记加收房费等入账
          consume_data: [],
          consume_checkRoom_price: 0,//查房产生的消费总数
          consume_dialogVisible: false,//查房产生的消费dialog
          disableLength: 0,
          //退款的对象
          refundParam:{
            payReasonValue: '',
            enterAccountCode: '',
          },
          pagination: {
            totalRows: 0, //总条数
            pageSize: 5, //每页显示条数
            pageSizes: [5, 10, 15],
            pageNumber: 1,
            layout: "total, sizes, prev, pager, next, jumper"
          },
          multipleSelectionAll: [],   // 所有选中的数据包含跨页数据
          multipleSelection_page: [],   // 当前页选中的数据
  　　    idKey: 'id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
          authorizationDialog: false,
          // data: generateData(),
          pay_sum: 0,
          consume_sum: 0,
          calculateDialog: false,
          checkList: [],
          pay_checked: false,
          refund_checked: false,
          consume_checked: false,
          img_wz: true,
          qr_w: '',
          remark_continue: '',
          isNewRoom_task: true,//默认需要新建查房任务 true,1,2,3
          dialogVisible: false,
          employeeValue: '',
          personOptions: [],
          personDialog: false,//退房选择人员
          isActiveColor: '',
          rightLinkList: [],//联房右边数据
          remarkTitle: '',
          remarkList: [],//备注信息
          refundRow: {},
          maxRefundMoney: '',//针对支付明细的余额最大可退款金额
          refundMoneyValue: '',//针对支付明细的余额
          master_guest_value: [],//入住人数组
          timer_room: null,
          checkRoomFlag: '',
          rightData: [],//穿梭框右边数据
          // linkData: generateData(),
          linkData: [],
          linkValue: [],
          refundHouse: true,
          only_consume_flag: 0,
          accountMaxInfoList2: [],//账户入预收明细
          tiaoReasonValue: '',
          tiaoReasonList: [],
          cashRegisterList: [],//收银点list
          tiaoMoney: '',
          tiaoDialog: false,//调账接口
          img_src: '',
          pay_amount_money_code: '',
          dialog_succeed: false,
          dialog_img: false,
          ihatetheqrcode: true,
          timer_src: null,
          // timer_incident: null,
          timer_r: null,
          timer: 0,
          order_form: '',
          scan_code: '0',//是否扫码枪
          original_pay_id: '',//微信/淘宝/第三方支付订单的id,现金支付没有此参数
          //所有金额明细
          moneydesc: {
            pay_amount: 0,//预收
            balance: 0,//余额
            total_consumption: 0,//总消费
            need_pay: 0,//应付
            total_refund: 0,//总退款金额
          },
          accountMaxInfoListCopy: [],
          preview_enter_flag: '',//????区分钱的付款原因还是账的付款原因
          charge_date: '',
          /**
           * 分页
           */
          currentPage: 1, //当前页码
          page_size: 4, //每页显示数量
          total: 0, //总数
          total_consumption_value: '0',//总消费
          need_pay_value: '0',//应付
          incomingAccoutList: [],//入账代码list
          payModelist_other: [],//支付方式===>第二种接口
          //入账收对象
          enterBill:{
            billInfo: '',
            enterAccountCode: '',
            money: '',
            accountData: '',
            summary: '',
            cashValue: '',
          },
          //入预收对象
          previewEnterBill:{
            cashValue: '',
            billInfo: '',
            payMode: '',
            payReasonValue: '',
            enterAccountCode: '',
            money: '',
            accountData: '',
            summary: '',
            remark: '',
            pre_author_id: '',//预授权id
          },
          transferMoneyValue: '',
          transferNeedpayValue: 0,
          transferAccountId: '',//to要转账的ID
          arAccountId: '',//ar/挂临客账id
          transferOptions: [],
          arOptions: [],
          transferTabel: [],//转账tabel
          jieAccountTitle: '',//title
          isDebt: '0',//是否欠款离店
          collectionChargeData: [],//消费明细ID
          jie_payValue: null,//结账时要付的钱
          jieParam:{
            jie_payValue: '',
            jie_payModeValue: '',
            jie_payReasonValue: '',
            jie_incomeValue: '',
          },
          needpayValue: 0,//应收总额
          accountSelection: [],//多选=>从而转账
          chongAccountRowTabel: [],
          transferAccountRowTabel: [],
          chongAccountDialog: false,
          transferAccountDialog: false,
          refunAccountDialog: false,//退款dialog
          search1:"",
          search2:"",
          transferData_left:[],
          transferData_right:[],
          // //可以在回调函数中进行提交操作以及数据操作。
          // callback:function () {
          //     console.log(this.transferData_left)
          //     console.log(this.transferData_right)
          // },
          countConsume: 0,
          countPay: 0,
          endPayListParam: {},
          room_pay: 0,
          sundry_pay: 0,//杂项统计
          deposit_pay: 0,//押金统计
          splitOptions: [{
            label: '按金额分',
            value: 0
          },{
            label: '按数量分',
            value: 1
          }],
          //分账对象
          splitAccountParam: {
            desc: '',
            remark: '',
            split_method_id: 0
          },
          charge_count: 0,//消费总数
          pay_count: 0,//预收总数
          accoutInfoList: [],
          tableData: [],//详细的账户明细
          value: [],
          filterMethod(query, item) {
            return item.pinyin.indexOf(query) > -1;
          },
          linkRoomDialog: false,//编辑联房
          noSortNumber: 0,
          sortNumber: 0,
          labelPosition: 'right',//form排列房向
          fenAccountDialog: false,//分账
          jieAccountDialog: false,//结账
          tabValue: '',//tabs显示的值
          // orderHouseInfo:[{
          //       id:'1',
          //       value:'苹果'
          //   },{
          //       id:'2',
          //       value:'荔枝'
          //   },{
          //       id:'3',
          //       value:'香蕉'
          //   },{
          //       id:'4',
          //       value:'火龙果'
          //   }],
            checkboxList:[],
            flag_checked: false,
            orderHouseInfo: [{
              room_number: '123',
              room_type: '大床房'
            },{
              room_number: '11241',
              room_type: '大床房2'
            }],
            payReasonValue: '',//付款原因对应值
            payModeValue: '',//付款方式对应值
            incomeModeValue: '',//结账入账对应值
            payModeList: [],//支付方式接口
            payInfoList: [],//付款原因接口
            payDetail_param:{
              account_ids: [],//需要序列化
              pay_amount: null,//	支付金额.可正负.负代表支出
              pay_status: null,
              pay_reason_id: null,
              biz_date:	moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
              reference_id: 12345,//int 此时测试数据
              module_id: 1,//测试时填写
              charge_details: [], //消费明细必填
              pay_detail: {},//付款明细不是必填
              room_num: '',//房间号,有入住的情况下必填.
              biz_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
            num: 1,
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            before_leave_time: '',
            after_leave_time_1: '',
            after_leave_time_2: '',
          linkHouseFornVisible: this.show,
          countMoney: 0,
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
            value: '0',
            label: '否'
            },{
            value: '1',
            label: '是'
            },{
            value: '2',
            label: '测试数据1'
            },{
            value: '3',
            label: '测试数据2'
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
          remark_id: '',
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
          //此时入住单详情即联房大对象
          preBillLinkParam: {
            combine_room_list: [] //默认一个空数组
          },
          temp_value: '',
          showPoint: false,//预定=>多余部分
          activeName: '1',
          activeNames: ['1'],
          consumeData: [],//预定=》消费数组
          remarkData: [],//备注数组
          breakfastDialog: false,//预定=》早餐dialog
          settingDialog: false,//预定=》设置dialog
          consumeDialog:false,//预定=》消费dialog
          preview_billDialog: false,//预约发票
          addAndUpdate_remarkDialog: false,//预定=>备注dialog=>新增备注
          remarkDialog: false,//联房=>备注dialog
          previewTypeList: [{
           label: '非会员/会员',
            value: 0
            },{
            label: '散客预定',
            value: 1
            },{
            label: '团队预定',
            value: 2
            },{
            label: '订房中心/OTA',
            value: 3
            },{
            label: '协议单位',
            value: 4
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
          //线下======================
          UrLHeader_room: 'http://47.98.113.173:8091/v1/',
          UrLHeader_bill: 'http://47.98.113.173:9202/v1/',
          //  UrLHeader_bill: 'http://192.168.2.224:9005/v1/',
          UrLHeader_9101:'http://47.98.113.173:9101/v1/',
          UrLHeader_9519:'http://47.98.113.173:9519/v1/',
          UrLHeader_9503:'http://47.98.113.173:9503/v1/',
          UrLHeader_9104: 'http://47.98.113.173:9104/v1/',
          //线上======================
          // UrLHeader_room: 'http://room.crowncrystalhotel.com/v1/',
          // UrLHeader_bill: 'http://bill.crowncrystalhotel.com/v1/',
		      // UrLHeader_9101:'http://price.crowncrystalhotel.com/v1/',
          // UrLHeader_9102: 'http://member.crowncrystalhotel.com/v1/',
          // UrLHeader_9103: 'http://code.crowncrystalhotel.com/v1/',
          // UrLHeader_9519:'http://47.98.113.173:9022/v1/',//9022
          // UrLHeader_9104:'http://service.crowncrystalhotel.com/v1/',//9022
          //======分割======
          consumptionDialog: false,
          borrowingDialog: false,
          billDialog: false,
          enterBillDialog: false,//入账
          preview_enterBillDialog: false,
          leaveDialog: false,
          houseTypeDialog: false,
          switchNumberDialog: false,
          enterPreviewDialog: false,//入预收操作
          dialog_alipay: false, //聚合支付
          editPriceDialog: false,
          addPersonDialog: false,
          continueLiveDialog: false,
          previewToEnterVisible: false,//预定转入住单
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
      'transfer': transfer,
      'aDialog': aDialog,
      QRCode
    },
    // mounted(){
      // this.$nextTick(() => {
      //   this.$refs.inputRef.focus()
      // })
    // },
    // 注册一个局部的自定义指令 v-focus
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          // 聚焦元素
          el.querySelector('input').focus()
        },
        update: function (el) {
          // 聚焦元素
          el.querySelector('input').focus()
        }
      }
    },
    //清空定时器
    beforeDestroy() {
      clearInterval(this.timer_room)
      clearInterval(this.timer_r)
      clearInterval(this.timer_incident)
      clearInterval(this.timer_src)
      this.timer_room = null
      this.timer_r = null
      this.timer_incident = null
      this.timer_src = null
    },
    beforeMount(){
        //  let data = [
        //         {
        //             "children": [
        //             ],
        //             roomInfo: [],
        //             room_number: "1201",
        //             name: "张三",
        //         },
        //         {
        //             "children": [
        //             ],
        //             roomInfo: [],
        //             room_number: "1202",
        //             name: "李四",
        //         },
        //     ]

        //     this.transferData_left = data;
        },
    watch: {
      show () {
        this.linkHouseFornVisible = this.show;
        this.activeName = '1'
        //清除定时器 在beforeDestroy这个生命周期里清除掉定时器
        clearInterval(this.timer_room)
        clearInterval(this.timer_r)
        clearInterval(this.timer_incident)
        clearInterval(this.timer_src)
      },
      /**
       * 注意: 监听该父级传来的对象的时候,根据房间号得到相应的处理
       */
      parentInfoParam(){
        this.getRoomType()
        console.log('this.parentInfoParam 监听父级;openChildDialog',this.parentInfoParam )
        console.log('this.parentInfoParam.openChildDialog',this.parentInfoParam.openChildDialog)
        if(this.parentInfoParam.openChildDialog === '续住'){
          this.continueLiveDialog = true
          this.handleDate()
        }else if(this.parentInfoParam.openChildDialog === '入消费'){
          this.enterBillDialog = true
          this.handleEnterBill() //处理数据====>根据条件监听当中弹出入消费dialog
        }else if(this.parentInfoParam.openChildDialog === '结账'){
          this.jieAccountDialog = true
          this.handleJieAccount()
        }else if(this.parentInfoParam.openChildDialog === '入预收'){
          this.preview_enterBillDialog = true;
          this.handlePreviewEnterBill() //处理数据====>根据条件监听当中弹出入预收dialog
        }else if(this.parentInfoParam.openChildDialog === '换房'){
          this.handleChangeRoom(this.parentInfoParam)
          // this.switchNumberDialog = true;
          // this.changeNo()
        }
        try {
          this.tabValue = this.parentInfoParam.room_number //tab房间号
          this.preBillLinkParam = _.cloneDeep(this.parentInfoParam)
          console.log(this.preBillLinkParam.master_guest,'this.preBillLinkParam')
          let guestValue = {
            room_number: this.preBillLinkParam.room_number,
            account_id: null,
            guest_id: 123456,
            id_code: "01",
            id_no: "",
            sex: '',
            master_base_id: "",
            name: "",
            reserve_base_id: null,
            telephone: "",
          }
          if(this.preBillLinkParam.master_guest.length ===0){
            this.preBillLinkParam.master_guest.push(guestValue)
          }
        } catch (error) {
          console.log(error)
        }
        setTimeout(() => {
          this.getEndpayInfoListByAccount() //查看主账
        }, 200);
        // this.getRoomInfoOther()//查询是否在查房，避免再次新建查房任务 去掉了
        this.getMarketSrc('src')
        this.getMarketSrc('market')
        // this.getRateCode_price(this.preBillLinkParam)  //以后必须要的获取最新房价码
        this.getRateCode_price_self()
        // console.log('this.parentInfoParam.openChildDialog',this.parentInfoParam.openChildDialog)
        // if(this.parentInfoParam.openChildDialog === '续住'){
        //   console.log('xuzhu===============')
        //   this.continueLiveDialog = true
        // }
      },
      checkboxList: {
        handler: function (val, oldVal) {
          if (this.checkboxList.length === this.preBillLinkParam.combine_room_list.length) {
            this.flag_checked=true;
          } else {
            this.flag_checked=false;
          }
        },
        deep: true
      }
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
      }
    },
    methods: {
      //是否免费 换房切换
      witchRoom(){
        if(this.roomParam.isFee == '1'){
          this.roomParam.newPrice = this.roomParam.oldPrice
          this.isDiscount  = true
        }else{
          // this.roomParam.oldPrice = ''
          this.roomParam.newPrice = ''
          this.isDiscount  = false
        }
        console.log('roomParam.isFee',this.roomParam.isFee) 
      },
      flushChangeData(){
        this.roomParam.newType = ''
        this.roomParam.oldType = '',
        this.roomParam.oldNumber= '',
        this.roomParam.newNumber= '',
        this.roomParam.oldPrice = '',
        this.roomParam.discount = '',
        this.roomParam.newPrice = '',
        this.roomParam.reason = ''
      },
      /**通过折扣和原价自动计算新的房价 */
      computeData(){
        this.roomParam.newPrice = Number(this.roomParam.oldPrice) + Number(this.roomParam.discount)
      },
      /**
       * @desc 确定进行换房==升降级 新版本
       */
      confirmChangeRoom(){
        let that = this
        if (that.roomParam.oldNumber && that.roomParam.newNumber && that.roomParam.oldType && that.roomParam.newType && that.roomParam.oldPrice){
          console.log('kaishi',this.rowParam)
          console.log('roomParam',this.roomParam)
          // let url = 'http://192.168.2.165:9005' + '/v2/' + `depend_ex/exchange_houses/`
          let url = that.api.api_newBill_9204 + '/v2/' + `depend_ex/exchange_houses/`
          let scopeParam ={
            order_no:  that.rowParam.order_no,
            old_room: that.roomParam.oldNumber, //原房间
            new_room: that.roomParam.newNumber,
            discount: Number(that.roomParam.discount), //折扣
            is_free: that.roomParam.isFee,
            new_fix_rate: Number(that.roomParam.newPrice),
            old_fix_rate: Number(that.roomParam.oldPrice),
            old_room_type: that.roomParam.oldType,
            new_room_type: that.roomParam.newType,
            change_result: that.roomParam.reason
          }
          console.log(scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message === 'success'){
              that.$message.success(res.data.data.result.message)
              that.changeRoomVisible = false
              this.linkHouseFornVisible = false;
              this.flushByLink()//刷新数据
            }else{
              that.$message.warning('换房失败!')
            }
            }).catch(error=>{
          })
        }else{
          this.$message.warning('有数据没填充或者价格为0!')
        }
        console.log('this.multipleSelectionget',this.multipleSelection)
      },
      /**
       * @desc 换房升级 可以换房间，也可以更改房价
       */
      handleChangeRoom(row){
        console.log('row',row)
        this.getLiveRoom(row.room_type_name)
        this.roomParam.isFee = '2' //切换===>重置
        this.changeRoomVisible = true
        this.isDiscount  = false //切换===>重置
        console.log('row',row)
        this.roomParam.oldNumber = row.room_number
        this.roomParam.oldType = row.room_type
        this.rowParam.order_no = row.order_no
        this.roomParam.oldPrice = this.current_rate_price
        // this.roomParam.newType = row.room_type //默认老值 error
        this.rowParam = row
        // this.roomParam.oldPrice = row.
      },
        /**
         * 更新接口数据
        */
        handleUpdate(){
          this.updateVisible = true
        },
        /**
         *@current_rate_price 从多个数据里获取当日价  
         */
        getRateCode_price_self(){
          console.log('this.preBillLinkParam.room_price',this.preBillLinkParam.room_price)
          console.log('11',moment().format('YYYY-MM-DD'))
          try {
            let  temp = this.preBillLinkParam.room_price.filter(item=>item.price_date == moment().format('YYYY-MM-DD'))
            console.log('temp',temp)
            if(temp){
              this.current_rate_price = temp[0].room_price
            }else{
              this.current_rate_price = 0
            }
          } catch (error) {
            console.log('入住超过期限查不到房价' + error)            
          }
        },
        /**
           注意:此方法已废弃<=========
         * @desc_1 根据房型得到对应房价(入住过后当天的房价)
         * @desc_2 以后住几天每天的房价都要展示清楚 构造了房型的英文名字，以后需要后端提供
         */
        getRateCode_price(param){
          console.log('jinru--------------------')
          // this.preBillLinkParam.room_type_name
          let that = this
          let url = that.api.api_newPrice_9114 + '/v1/' +  `room/rate_code/get_rate_code/`
          // let temp = []
          // temp.push(param.room_type)
          let scopeParam ={
            rate_code: 'BAR',
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
            room_type_list: [param.room_type]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            // that.rate_breakfastList = res.data.data.price
            let temprate = res.data.data.price
            let key1 = param.room_type_name
            let temprateValue = temprate[key1]
            let key2 = moment(new Date()).format('YYYY-MM-DD') //对象嵌套对象里的key值
            that.houseType_priceValue_1 = temprateValue[key2]
            param.fix_rate = that.houseType_priceValue_1
            console.log('param检测',param.fix_rate)
            console.log('temprateValue',temprateValue)
            console.log('111',temprateValue[key2])
            console.log('preBillParam.master_base检测',this.preBillParam.master_base)
            }).catch(error=>{
          })
        },
      //删除发票
      deleteInvoice(row){
        let that = this
        let id = row.id
        let url = this.api.api_9022_9519 + '/v1/' + 'finance/invoice_detail/remove/' + id
        that.$axios.post(url).then((res)=>{
            if(res.data.message =='success'){
              this.$message.success('删除成功');
              this.getInvoice()
            }else{
              this.$message.error('删除失败');
            }
        }).catch(error=>{
            this.$message.error('请求服务端失败!');
        })
      },
      flushInvoice(){
        this.billParam.invoice_title = ''
        this.billParam.invoice_number = ''
        this.billParam.desc = ''
        this.billParam.amount = ''
        this.billParam.invoice_type = ''
      },
      //开具发票
      addInvoice(){
        console.log('this.billParam',this.billParam)
        if(this.billParam.invoice_number && this.billParam.amount){
          let that = this
          let url = this.api.api_9022_9519 + '/v1/' + 'finance/invoice_detail/add'
          let scopeParam = {
            account_id: that.preBillLinkParam.account_id,
            invoice_title: that.billParam.invoice_title,//发票抬头
            invoice_number: that.billParam.invoice_number,//发票号码
            amount: that.billParam.amount,//发票金额
            desc: that.billParam.desc,//发票备注
            issued_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            invoice_type: 0,//发票类型,0普通,1增票
          }
          that.$axios.post(url,scopeParam).then((res)=>{
              if(res.data.message =='success'){
                this.$message.success('开票成功');
                this.billDialog = false
                this.getInvoice()
              }else{
                  this.$message.error('添加失败');
              }
          }).catch(error=>{
              this.$message.error('请求服务端失败!');
          })
        }else{
          this.$message.warning('发票号码与发票金额是必填项!')
        }
      },
      getInvoice(){
          let that = this
          let id = that.preBillLinkParam.account_id
          let url = this.api.api_9022_9519 + '/v1/' + 'finance/invoice_detail/get_by_account_ids'
          let scopeParam = {
            account_ids: JSON.stringify([].concat(id)),
            page_size: 300
          }
          that.$axios.post(url,scopeParam).then((res)=>{
              if(res.data.message =='success'){
                this.invoiceList = res.data.data.list
                console.log('this.invoiceList',this.invoiceList)
              }else{
                this.$message.error('查询失败');
              }
          }).catch(error=>{
              this.$message.error('请求服务端失败!');
          })
      },
      //确定入账代码值 判断是否展示额外信息及内容
      showExpand(){
        let that = this
        console.log('previewEnterBill.enterAccountCode',this.previewEnterBill.enterAccountCode)
        console.log('showExpand',)
        let expandInfo =  this.incomingAccoutList.filter(item=>item.id==this.previewEnterBill.enterAccountCode)
        console.log('expandInfo',expandInfo)
        this.linkUrl = expandInfo[0].link_url
        this.trading_unit = expandInfo[0].trading_unit
        that.call_back_url = expandInfo[0].call_back_url
        console.log('this.linkUrl',this.linkUrl)
        if(expandInfo[0].link_data){
          //字符串数组变化为数组，用json的parse的方法进行转换,这个变量接收额外信息
          that.extraInformation = JSON.parse(expandInfo[0].link_data)
          let extraInformation_All = _.cloneDeep(that.extraInformation) 
          that.extraInformation = extraInformation_All.filter(item=>item.is_show == '1')
          that.extraInformation_no = extraInformation_All.filter(item=>item.is_show == '0')
          console.log('that.extraInformation额外信息',that.extraInformation)
        }else{
          that.extraInformation = []
        }
      },
      //批量查看预授权list(一个accountId下面)
      findAuthorizationList(){
        let that = this
        // let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/list_by_account_ids'
        let url= that.api.api_newPrice_9114+ '/v1/' + `accounts/get_pre_authorized_detail_list/?page_size=100&page=1`
        that.$axios.get(url).then((res)=>{
            console.log('res.data',res.data,this.authorizationList)
            if(res.data.message =='success'){
              that.authorizationList = res.data.data.results
              that.authorizationList_normal = that.authorizationList.filter(item=>item.status == 0)//正常的预授权
            }else{
                this.$message.error('查询失败');
            }
        }).catch(error=>{
        })
      },
      //打开预授权界面
      handleAuthorization(){
        this.authorizationDialog = true
        // this.authorizationParam.mainAccount_id='222'
        // console.log('this.authorizationParam父级传递',this.authorizationParam)
        console.log('this.mainAccount_id传过来的主账id===联房的时候为主账房id',this.mainAccount_id)
        let mainAccountId = this.preBillLinkParam.account_id
        console.log('mainAccountIdmainAccountId====',mainAccountId)
        localStorage.setItem('mainAccountId',mainAccountId) //通过缓存弄暂时
        localStorage.setItem('mainAccountId_flag','联房') //通过缓存弄暂时===>当通过联防这个dialog打开预授权的时候，不需要强制重新刷新界面
        this.authorizationDialog = true;
      },
      //撤销预授权
      handleCancle(row){
        console.log('row,,',row)
        let that = this
        let id = row.id
        // let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/remove/' + id
        let url= that.api.api_newPrice_9114+ '/v1/' + `accounts/remove_pre_authorized_detail/` + id + '/'
        that.$axios.post(url).then((res)=>{
            console.log('res.data撤销',res.data)
            if(res.data.message =='success'){
              that.findAuthorizationList()
              that.$message({
                  message: '撤销成功',
                  type: 'success'
              });
            }else{
                this.$message.error('查询失败');
            }
        }).catch(error=>{
            this.$message.error('请求服务端失败!');
        })
      },
      //打开预授权(处理)
      openAuthorization(){
        this.authorizationDialog = true
      },
      //联房的房间禁选状态
      banDisable(){
        if(this.preBillLinkParam.master_status_lable===1){
          // return true   //正常离店
          return false   //正常离店
        }else{
          return false  //在住
        }
      },
      banDisable_2(){
        if(this.preBillLinkParam.master_status_lable===1){
          return true   //正常离店
          // return false   //正常离店
        }else{
          return false  //在住
        }
      },
      refundDisable(row){
        // if(row.hasOwnProperty('related_pay_id') === true && (row.related_pay_id.pre_authorized_detail != undefined && row.related_pay_id.pre_authorized_detail.status === 1)){
        //   return true
        // }else {
        //   if(row.hasOwnProperty('related_pay_id') === true && row.related_pay_id != null && row.related_pay_id.pay_status === 0){
        //     return false
        //   }else{
        //     return true
        //     console.log('false')
        //   }
        // }
        if(row.subject === 'pay' && row.can_arrange>0){
          return false
        }else{
          return true
        }
        // if(related_pay_id)
      },
      //账务明细===>查看
      checkAccount(row){
        console.log('row=chakan',row)
        let that = this
        let url = that.api.api_9022_9519 + '/v1/' + `finance/pay_detail/get_original_pay_info_pms`
        let scopeParam = {
          pay_detail_id: row.related_pay_id.id,
          return_type: 'dict',
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message === 'success'){
            console.log('res.',res.data)
          }
        })
      },
      //第三方支付才显示查看按钮
      infoDisable(row){
        if(row.hasOwnProperty('related_pay_id') === true && row.related_pay_id != null){
          if(row.related_pay_id.original_pay_id != null){
            return false
          }else{
            return true
          }
        }else{
          return true
          console.log('false')
        }
      },
      //结账==>合并计算结账
      calculateAccount(){
        let that = this
        this.changePageCoreRecordData()//分页记忆勾选
        //有勾选项则存在
        this.pay_sum = 0
        this.consume_sum = 0
        let scopeParam = {
          desc: null,//描述
          charge_list: [],//消费id数组
          pay_list: []//	支付id数组
        }
        console.log('this.multipleSelectionAll----',this.multipleSelectionAll)
        ////筛选可支付的和可消费的item.related_pay_id.real_pay < item.related_pay_id.pay_amount 判断剩余金额为0了就不能部分结账了
        for(var item of this.multipleSelectionAll){
          if(item.subject === 'pay' && (item.pay_status === 0 || item.pay_status === 1)){
            this.pay_sum = this.pay_sum + 1
            scopeParam.pay_list.push(item.id)
          }else if(item.subject === 'consume' && (item.pay_status === 0 || item.pay_status === 1)){
            this.consume_sum = this.consume_sum + 1
            scopeParam.charge_list.push(item.id)
          }
        }
        console.log('scopeParam',scopeParam)
        console.log('this.pay_sum',this.pay_sum)
        console.log('this.consume_sum',this.consume_sum)
        if(this.pay_sum===0 || this.consume_sum===0){
          this.$message.warning('请选者已付款或者待结账状态的明细!')
          return
        }else{
           this.$confirm('是否针对勾选的账务进行部分结账?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              console.log('jinru')
              try {
                console.log('jinru2')
                // let url = this.api.api_9022_9519+ '/v1/' + `finance/account/calculate_pms`
                let url = that.api.api_newPrice_9114 + '/v1/' + 'accounts/add_calculate_record/'
                this.$axios.post(url,scopeParam).then(res=>{
                  console.log('jinru2===>')
                  this.clearTable()
                  this.queryData()//刷新得到列表账务最新数据
                  console.log('jinru3',res.data)
                  if(res.data.message == 'success'){
                    this.$message.success('部分结账成功！')
                  }else{
                    this.$message.error('部分结账错误!')
                  }
                })
              } catch (error) {
                console.log(error)
                this.$message.error('部分结账错误!')
              }
            }).catch(() => {
              this.clearTable()
              // this.queryData()
              this.$message({type: 'info',message: '已取消操作'});
            });
        }
        console.log(this.pay_sum,'dad',this.consume_sum)
        console.log('accountSelection==计算结账',this.accountSelection)
      },
      //过滤数据
      filterData(param){
        this.queryData() //筛选调用查询消费明细的方法
      },
      //控制tabel中每行颜色
      tableRowClassName({row, rowIndex}) {
        if (row.subject==='pay') {
          return 'warning-row';
        } else{
          return 'success-row';
        }
        return '';
      },
      flushTime(){
        console.log('关掉')
        clearInterval(this.timer_src)
        clearInterval(this.timer_r)
      },
      //开始切换=====>联房，主房===>得到相应的所有信息
      getInfoByImportant(item,index){
        // item[0] === '8520' ? item[4] = '2' : item[4] = '3'
        // if(item[0] === '8502'){
        //   item[4] = '1'
        // }
        this.pagination.pageNumber = 1,//分页 ==>数据刷新
        this.pagination.pageSize = 5
        clearInterval(this.timer_room)
        console.log('开始查询联房===>主房',item)
        this.isActiveColor = index
        console.log('this.isActiveColor',this.isActiveColor)
        console.log('that.preBillLinkParam==原始',this.preBillLinkParam)
        console.log('activeName',this.activeName)
        this.getEnterInfoByRoom(item[1])//这个变为1不是0，从单号开始查
        this.getRoomInfoOther(item)//查房
        this.getEndpayInfoListByAccount(item[6])//查询金额防止缓存的影响
      },
      //联房列表打开==>详情
      getEnterInfoByRoom(param){
        console.log('param',param)
        console.log('this.preBillLinkParam.room_number',this.preBillLinkParam.room_number)
        param ? param : param = this.preBillLinkParam.order_no//这里取订单号，以便查询(改了)
        console.log('param-----',param)
        let scopeParams = {
          // room_number: param
          order_no: param
        }
        let that = this
        // let url = `http://192.168.2.224:9005/v1/checkin/all_master_info/`
        // let url = that.api.api_bill_9202 + '/v1/' + `checkin/all_master_info/`
        let url = that.api.api_newBill_9204 + '/v2/' + `checkin/all_master_info/`
        that.$axios({
          method : 'get',
          url : url,
          params: scopeParams
        }).then(res=>{
          if(res.data.message === 'success'){
            that.preBillLinkParam = res.data.data.results[0]
            this.activeName = '1' //切换到最开始的tab标签
            this.tabValue = that.preBillLinkParam.room_number //tab首页标签值替换
            if(that.preBillLinkParam != undefined){
              console.log('that.preBillLinkParam==改变',that.preBillLinkParam)
              // that.$message.success('获取相应房间数据成功!')
            }else{
              that.$message.warning('获取后台数据失败!')
            }
          }else{
            that.$message.error('获取数据失败!')
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      flushRefundData(){
        this.refundMoneyValue = '',
        this.previewEnterBill.cashValue = ''
        this.previewEnterBill.payReasonValue = '',
        this.previewEnterBill.enterAccountCode = ''
      },
      //联房=》新增备注
        addAndUpdateRemarkInfo(){
          // this.addAndUpdate 标记
          if(this.remarkContent_value){
            let that = this
            let id = that.remark_id
            let url = that.addAndUpdate === true ? that.api.api_9022_9519+ '/v1/' + `finance/account_tip/add` : that.api.api_9022_9519+ '/v1/' + `finance/account_tip/update/` + id
            let scopeParam ={
              account_id: that.preBillLinkParam.account_id,
              content: that.remarkContent_value
            }
            that.$axios.post(url,scopeParam).then(res=>{
              if(res.data.message==='success'){
                that.remarkDialog = false
                that.getRemarkInfo()
              }
              console.log('resss',res.data)
            }).catch(error=>{
            })
          }else{
            this.$message.warning('请输入备注信息')
          }
        },
      //针对支付明细的==>开始退款时的处理
      handleRefund(row){
        let that = this
        this.preview_enter_flag = 0
        console.log('row',row)
        this.flushRefundData()
        this.refundRow = row
        console.log('that.moneydesc.balance',that.moneydesc.balance)
        if(that.moneydesc.balance <= 0){
          this.$message.warning('余额为负或者0，不能进行退款!')
        }else{
          this.refunAccountDialog = true;
          // this.refundParam.payReasonValue = this.previewEnterBill.payReasonValue
          // this.refundParam.enterAccountCode = this.previewEnterBill.enterAccountCode //转换
          // this.refundParam.payMode = row.related_pay_id.pay_mode_id.model_name + '-' + row.related_pay_id.pay_mode_id.id
          // this.refundParam.payReasonValue = row.related_pay_id.code_pay_for_id.name + '-' + row.related_pay_id.code_pay_for_id.id
          // this.refundParam.enterAccountCode = row.code_income_type_id.name + '-' + row.code_income_type_id.id
          // this.refundParam.charge_id = row.id
          // console.log('this.refundParam.payMode',this.refundParam.payMode.substr(0,this.refundParam.payMode.indexOf("-")))
          // console.log('this.refundParam.payMode',this.refundParam.payMode)
          // console.log('this.refundParam.payMode',this.refundParam.payMode.substr(this.refundParam.payMode.indexOf("-")+1,this.refundParam.payMode.length))
          // if(row.related_pay_id.pay_amount <= row.account_id.balance){
          //   this.maxRefundMoney = row.related_pay_id.pay_amount
          // }else{
          //   this.maxRefundMoney = row.account_id.balance
          // }
        this.maxRefundMoney = row.can_arrange //最大可退款金额
        this.refundMoneyValue = row.can_arrange //赋值默认
        }
      },
      //针对支付明细进行退款(包括第三方)
      confirmRefund(){
        let that = this
        console.log('this.refundRow',that.refundRow)
        let row = that.refundRow
        if(that.refundMoneyValue > that.maxRefundMoney){
          that.$message.warning('不能超过最大可退款额度!')
          return false
        }else{
          if(that.refundMoneyValue){
            // if(!this.validatePayData()){
            //   return false
            // }
            that.refund_pointByAccont(row)
          }else{
            that.$message.warning('退款金额为必填项!')
          }
        }
      },
      //1.先进行支付宝退款2.账上也需要调一层接口进行账方面的退款====>
      refundByAliWay(param){
        console.log('param支付宝',param)
        let scopeParam = {
          out_trade_no: param.related_pay_id.original_pay_id,//商家唯一定单号，与transaction_id二选一
          // total_fee: param.related_pay_id.pay_amount,
          refund_amount: this.refundMoneyValue,   // 	需要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数
          trade_no: this.order_form,//支付宝交易号，和商户订单号不能同时为空
          out_request_no: this.refundMoneyValue === this.maxRefundMoney ? null : util.guid(),//	标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
        }
        let that = this
        let url= that.api.api_pay_8094+ '/v1/' + `alipay/trade_refund/`
        // let url= 'http://192.168.2.224:9006'+ '/v1/' + `alipay/trade_refund/`
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('支付宝退款=======>',res.data)
          if(res.data.data.alipay_trade_refund_response.code === '10000'){
            that.refund_pointByAccont(param)//开始账务上的退款
          }else if(res.data.data.alipay_trade_refund_response.code === '40004'){
            this.$message.warning('交易已经关闭！')
          }else if(res.data.data.alipay_trade_refund_response.fund_change === 'N'){
            this.$message.warning('交易失败')
          }
          else{
            this.$message.warning('支付宝退款接口报错!')
          }
          // that.queryData()//根据账户查询消费明细
          // that.$message.success('操作成功!')
          // that.jieAccountDialog = false
        }).catch(error=>{
        })
      },
      //1.先进行微信退款2.账上也需要调一层接口进行账方面的退款====>
      refundByWxWay(param){
        console.log('param',param)
        let scopeParam = {
          out_trade_no: param.related_pay_id.original_pay_id,//商家唯一定单号，与transaction_id二选一
          // transaction_id: '',//微信自己的付款流水号。与out_trade_no二选一
          total_fee: param.related_pay_id.pay_amount*100,
          refund_fee: this.refundMoneyValue*100,   // 退款总金额. 单位为分
          out_refund_no: this.order_form,//商户内部退款单号，商户内唯一. 以此号入公司账
          refund_desc: this.previewEnterBill.payReasonValue,//退款原因
          refund_fee_type: null,//币种, 缺省是CNY
        }
        let that = this
        let url= that.api.api_9530_9503+ '/v1/' + `payment/weixin/refund`
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message === 'success'){
            console.log('成功')
            that.refund_pointByAccont(param)//开始账务上的退款
          }else if(res.data.message === 'fail'){
            this.$message.warning(res.data.data)
          }else{
            this.$message.warning('微信退款接口报错!')
          }
          // that.queryData()//根据账户查询消费明细
          // that.$message.success('操作成功!')
          // that.jieAccountDialog = false
        }).catch(error=>{
        })
      },
      //封装==>针对账务上的现金与非现金的退款====>
      refund_pointByAccont(param){
        let that = this
        // this.previewEnterBill.payMode.substr(this.previewEnterBill.payMode.indexOf("-")+1,this.previewEnterBill.payMode.length)
        console.log('param=====param',param)
        console.log('this.previewEnterBill.payReasonValue',this.previewEnterBill.payReasonValue)
        console.log('other',this.previewEnterBill.enterAccountCode)
        let scopeParam = {
          pay_amount: Number(this.refundMoneyValue),
          desc: this.previewEnterBill.remark,
          account: param.account,
          cashier: this.previewEnterBill.cashValue,
          incoming_account_reason: this.previewEnterBill.payReasonValue,
          incoming_account_code: this.previewEnterBill.enterAccountCode,
          charge_detail: param.id,//消费单id
        }
        console.log('scope==tuikuan',scopeParam)
        let url= that.api.api_newPrice_9114+ '/v1/' + `accounts/refund/`
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message==='success'){
            that.queryData()//根据账户查询消费明细
            that.$message.success('操作成功!')
            that.refunAccountDialog = false
          }else{
            that.$message.warning(res.data.message)
          }
        }).catch(error=>{
        })
      },
      //联房=>确定并打印
      confirmLinkRoom(){
        console.log('this.linkvalue------------------',this.linkValue)
        if(this.rightData.length=== 0){
          this.$message.warning('请先选择主账!')
          return
        }
        if(this.rightData.length>1){
          this.$message.warning('只能选择一间房间设为主账!')
          return
        }
        console.log('右边所有数据rightLinkList',this.rightLinkList)
        console.log(' this.rightData,设为主账数据',this.rightData)
        let main
        let member
        let main_account_param
        let members_param = []
        //第一种情况，右边穿梭狂不左右穿梭，默认右边的数据进行联房
        if(this.rightLinkList.length===0 && this.linkValue.length>0){
          console.log('第一种情况')
          main = this.linkValue.filter(item=>item === this.rightData[0])
          member = this.linkValue.filter(item=>item != this.rightData[0])
          console.log('mainmain',main)
          console.log('membermember',member)
          main_account_param = main[0]
          members_param = member//数组
        }else{
          console.log('第二种情况')
          main = this.rightLinkList.filter(item=>item.account_id === this.rightData[0])
          member = this.rightLinkList.filter(item=>item.account_id != this.rightData[0])
          console.log('main=====',main[0],member)
          main_account_param = main[0].account_id
          members_param = []
          for(var item of member){
            members_param.push(item.account_id)
          }
          console.log('account',main_account_param,members_param)
        }
        // console.log('transferData_right==>选中的数据',this.transferData_right)
        // let tempArray = _.cloneDeep(this.transferData_right)
        // let zhuparam = this.transferData_right.find(item=>item.zhulianValue === '主')
        // let main_account_param = zhuparam.room_number.split('|')[2]
        // let lianParamArray = tempArray.filter(item=>item.zhulianValue != '主')
        // let members_param = []
        // for(var item of lianParamArray){
        //   members_param.push(item.room_number.split('|')[2])
        // }
        let that = this
        let url= that.api.api_9022_9519+ '/v1/' + `finance/combine_account_operation/combine_accounts`
        let scopeParam = {
          cashier_id: 9,
          main_account: main_account_param,
          members: JSON.stringify(members_param),
          // code_income_types: [] //入账类型代码的数组,为空表示合并账户所有类型的消费
        }
        console.log('scopeparam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message == "success"){
            this.$message.success('操作成功!')
            that.linkRoomDialog = false
            that.getEnterInfoByRoom(that.preBillLinkParam.order_no)//查询，重置数据//===>以后要另改(可能)
            that.flushByLink()//刷新房态图
          }else{
            this.$message.warning(res.data.message)
          }
        }).catch(error=>{

        })
      },
      rightLink(value){
        console.log('value====右边',value)
        this.rightData = value
      },
      setAccount(){
        if(this.rightData.length>1){
          this.$message.warning('只能选择一间房间设为主账!')
          return false
        }else{
          if(this.rightData.length=== 0){
            this.$message.warning('请先选择主账!')
            return
          }else{
            this.$message.success('该房间设为主账!')
          }
        }
        console.log('右边所有数据',this.rightLinkList)
        console.log(' this.rightData',this.rightData)
      },
      handleChange(value, direction, movedKeys) {
        console.log('change==========================开始')
        this.rightData = ''//置空操作 重要，判断是否选择主房的标志
        console.log(' this.rightData', this.rightData)
        console.log('this.linkData所有数据',this.linkData)
        console.log('value, direction, movedKeys',value, direction, movedKeys)
        let temp = value
        console.log('temp',temp)
        this.rightLinkList = this.linkData.filter(item=>temp.indexOf(item.account_id) != -1)
        console.log('this.rightLinkList',this.rightLinkList)
        console.log('change===========================结束')
      },
      //联房列表获取数据==>构造数据
      getLinkRoomData(){
        let that = this
        // let url= `http://192.168.2.224:9005/v1/checkin/get_combine_list_post/`
        let url= that.api.api_newBill_9204 + '/v2/' + `checkin/get_combine_list_post/`
          // method : 'post',
          // url : url,
          // params: {
          //   order_no: this.preBillLinkParam.order_no
          // }
        let scopeParam = {
          order_no: that.preBillLinkParam.order_no
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('res',res.data.data)
          let array = []
          for(var item of res.data.data){
            item.master_guest.length === 0 ? item.master_guest.push({name: ''}) : item.master_guest//暂时放这儿，可能有副作用
            for(var itemm of item.master_guest){
              array.push({
                room_number: item.room_number,
                id: item.id,
                master_id: item.master_id,
                name: itemm.name,
                account_id: item.account_id
              })
            }
          }
          console.log('arrayyyy列表联房构造列表',array)
          that.linkData = array
          let arrayGet = that.concatData(array) //重复组合数组
          that.linkData = arrayGet
          // let array_2 = []
          // for(var item of array){
          //   array_2.push({
          //     key: item.room_number,
          //     label: item.account_id,
          //     master_id: item.master_id
          //   })
          // }
          // this.linkData = this.linkData.slice(10,15)
          that.linkValue = []//置空操作
          console.log('this.linkValue',this.linkValue)
          console.log('linkData===>默认数据',this.linkData)
          console.log('preBillLinkParam.combine_room_list',this.preBillLinkParam.combine_room_list)
          //构造数据(把id组合一起组成默认数据)
          that.preBillLinkParam.combine_room_list.forEach(item=>{
            that.linkValue.push(item[6])
          })
          console.log('this.linkValue===这里要另加一个数组',this.linkValue)
          // let tempArray = arrayGet.map(item=>item.room_number+ '|' + item.name+ '|' + item.account_id)
          // // this.transferData_left
          // for(var item of tempArray){
          //   this.transferData_left.push({
          //     zhulianValue: '联',
          //     children: [],
          //     roomInfo: [],
          //     room_number: item,
          //     name: '',
          //   })
          // }
          // console.log('this.transferData_left',this.transferData_left)
          if(res.data.message === "success") {
            // that.$message({
            //   message: '调用接口成功',
            //   type: 'success'
            // });
          } else {
            that.$message({
              message: '调用接口失败',
              type: 'warning'
            });
          }
        }).catch(error=>{
        })
      },
      concatData(param){
        console.log('param',param)
        var map = {},
        array = [];
        for(var item of param){
            if(!map[item.room_number]){
              array.push({
                // id: item.id,
                // number: item.number
                name: item.name,
                room_number: item.room_number,
                id: item.id,
                master_id: item.master_id,
                account_id: item.account_id
              })
              map[item.room_number] = item
            }else{
              // item.array.length === 0 ? item.array.push({room_number: ''}) : item.array  //废弃放这里，避免数组循环无形中减少
              for(var itemm of array){
                if(itemm.room_number == item.room_number){
                  itemm.name = item.name + ',' + itemm.name
                  break
                }
              }
            }
        }
        console.log('array组合，',array)
        return array
        },
      deleteEnterBill(row){
        console.log('删除入账',row)
        let that = this
        // let id = row.id
        let url = that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/remove/` + id
        that.$axios.post(url).then(res=>{
          util.hintInfo(this,'success', '删除成功！');
        })
      },
      //清空入账内容
      flushEnterAccount(){
        this.previewEnterBill.payReasonValue = ''//付款原因
        this.enterBill.enterAccountCode = ''
        this.enterBill.money =  ''
        this.enterBill.summary = ''
        this.enterBill.accountData = ''
      },
      //处理附加信息
      handleExtraParam(){
        if(this.extraInformation.length>0){
          console.log('jinru11')
          let array = []
          for(var item of this.extraInformation){
            let key = item.field_name
            let value = item.field_name_value === undefined ? '' : item.field_name_value
            let obj = {
              key_key: key,
              keyvalue: value
            }
            array.push(obj)
          }
          console.log(array,'......11.......')
          let temp ={}
          for(var item in array){
            if(array[item].key_key === undefined){
              break
            }
            let key = array[item].key_key
            temp[key] =  array[item].keyvalue
          }
          this.extraParam.push(temp)
          console.log(this.extraParam,'.....11........')
        }else{
          this.extraParam = []
        }
      },
      /**封装获取商品订单号*/
      article_number(){
        // console.log('.xinxi..',this.extraInformation)
        // this.handleExtraParam()
        this.previewEnterBill.payReasonValue = 1 //付款理由====此时默认
        if(!this.validatePayData()){
          return false
        }
        let that = this;
        that.timer=0;
        //判断付款金额是否小于等于0
        if(that.previewEnterBill.money<=0){
          util.hintInfo(this,'warning', '付款金额不能小于等于0！');
        }else {
          that.$axios({
            url: that.api.api_9022_9519+ '/v1/' + 'finance/extend_pay/get_order_number',
            method: "post",
            data:{
              amount:that.previewEnterBill.money,
            },
          }).then(res=>{
              if (res.data.message === "success"){
                console.log(res.data._id);
                that.order_form = res.data._id;
                that.handlePayCharge()//主帐付钱
              }
            })
            .catch(error=>{
              console.log(error);
            });
          }
      },
      /**首先请求支付宝二维码接口*/
      alipay_dxg(){
          let that = this;
          let code_pay_for_id="";
          // if(that.collect_pay === "out"){
          //   code_pay_for_id=that.pay_reason_one
          // }else {
          //   code_pay_for_id=that.pay_reason
          // };
          that.$axios({
            url: that.api.api_pay_8094+"/v1/alipay/trade_precreate/",
            method: "post",
            data:{
              out_trade_no:that.order_form,
              subject: that.previewEnterBill.payReasonValue,
              total_amount:parseFloat(that.previewEnterBill.money).toFixed(2),
            },
          })
            .then(res=>{
              if (res.data.message="success"){
                console.log(res.data.data.alipay_trade_precreate_response.qr_code);
                that.img_wz=false;
                that.qr_w = res.data.data.alipay_trade_precreate_response.qr_code;
                that.$nextTick (function () {
                  that.qrcode();
                });
                //如果生成了二维码，就要调用查询付款成功
                if(that.qr_w){
                  console.log("成功");
                 that.timer_qr()
                }
                that.dialog_img=true;
                that.$refs.qrcode.innerHTML="";
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },

//  //封装支付宝二维码后的定时器
        timer_qr(){
          let that = this;
          // that.timer=0;

          that.timer_r=setInterval(function()   //开启循环：
           {
            that.timer++;
            console.log(that.timer++);
            that.syntony_function();
              if(that.timer >=60){
                clearInterval(that.timer_r);
                console.log(that.timer);
                return;
              }
          },2000);
        },
        /**解析后端给的数据生成二维码*/
        qrcode () {
          let that= this;
          let qrcode = new QRCode('qrcode', {
            width: 370,  // 设置宽度
            height: 370, // 设置高度
            text:that.qr_w,
          })
        },
      //进行付款
      handlePayCharge(){
        if(this.jie_flag){
          if(this.moneydesc.balance == 0){
            this.$message.warning('余额为0，不需要结账!')
            return
          }
        }
        // this.extraParam = []//置空操作
        // console.log('...xinxi1',this.extraInformation)
        // this.handleExtraParam()
        if(!this.validatePayData()){
          return false
        }
        let that = this
        //如果不是支付宝或者微信 ===>此时默认现金支付
        console.log('第一次paycharge')
        that.payCharge()
      },
      //结账改变money值
      changeMoney(param){
        this.jie_authorization_flag = true //结账用预授权flag标志
        let scopeParam = this.authorizationList.find(item=>item.id==param)
        let scopeMoney = scopeParam.authorized_amount //选中的预授权金额值，控制金额不能大于该值
        // this.previewEnterBill.money = scopeMoney
        // if(this.previewEnterBill.money > scopeMoney){
        //   this.$message.warning('不能大于预授权金额!')
        //   return false
        // }
        console.log('scopeParam',scopeParam)
        console.log(',',param)
        console.log('..',this.previewEnterBill.money)
      },
      //入预收==>付款 客人付款
      payCharge(){
        // if(this.jie_flag){
        //   if(this.moneydesc.balance == 0){
        //     this.$message.warning('余额为0，不需要结账!')
        //     return
        //   }
        // }
        this.extraParam = []//置空操作
        console.log('...xinxi1',this.extraInformation)
        console.log('previewEnterBill.pre_author_id===>预授权id',this.previewEnterBill.pre_author_id)
        this.handleExtraParam()
        let that = this
        // let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_by_charges`
        // let url_1= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_pms`
        // let url_2 = that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_by_author_pms`//预授权付款,即预授权转预收
        // let url = this.previewEnterBill.pre_author_id != '' && this.jie_authorization_flag == true ? url_2 : url_1
        let url = that.api.api_newPrice_9114 + '/v1/' + 'accounts/pay/'
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        let scopeParam = {
          pay_amount: -Number(that.previewEnterBill.money),//传负值
          account: that.preBillLinkParam.account_id, //主账id
          desc: that.previewEnterBill.remark,
          cashier_id:	that.previewEnterBill.cashValue,
          incoming_account_reason: that.previewEnterBill.payReasonValue,
          incoming_account_code: that.previewEnterBill.enterAccountCode,
        }
        console.log('url',url,'scopeParam',scopeParam)
        let money_money  = Math.min(this.endPayListParam.usable_pre_authorized,this.moneydesc.total_consumption)
        console.log('money_money',money_money)//取总消费和预授权最小值
        if(this.jie_authorization_flag == true){ //当为结账的时候
          if(this.previewEnterBill.money > money_money){
            this.$message.warning('不能大于预授权金额及总消费金额!')
            return false
          }
        }
          // if(this.previewEnterBill.money> )
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data.message)
          if(res.data.message != 'success'){
            that.$message.warning('调用后台接口失败')
          }else{
            that.get_refund_obj = res.data.data.data
            let payment_id = res.data.data.data.id
            if(this.linkUrl){
              console.log('jirnu111')
              console.log('payment_id',payment_id)
              //1.请求这个url得到相应数据例如二维码
              console.log('this.linkUrl',this.linkUrl)
              console.log(that.linkUrl,that.extraInformation,payment_id,that.extraInformation_no)
              that.getInfoByLinkUrl(that.linkUrl,that.extraInformation,payment_id,that.extraInformation_no) //类似kindle_dxg
              // this.kindle_dxg()
            }else{
              that.$message.success('操作成功!')
              that.preview_enterBillDialog = false
              that.jieAccountDialog=false
            }
            that.queryData()
            // 下面暂时注释
            // that.$message.success('操作成功!')
            // that.preview_enterBillDialog = false
            // that.jieAccountDialog=false
            // that.queryData()
          }
          }).catch(error=>{
            console.log(error)
        })
      },
      getInfoByLinkUrl(url,description,payment_id,link_data){
        console.log('iiiiiiiii',url,description,payment_id,link_data)
        let that = this;
        let params = {};
        let obj={},
        params_obj={};
        //实现取值拼接json给后台的值
        for(let item of description){
          params[item.fields_name] = item.acquiescence
        }
        for(let i  of link_data){
          if(i.parallelism === "pay_amount"){
            params_obj[i.fields_name] = -Number(that.get_refund_obj[i.parallelism])*that.trading_unit;
          }else {
            params_obj[i.fields_name] = that.get_refund_obj[i.parallelism];
          }
        }
        console.log('params_obj',params_obj)
        console.log('params',params)
        let merge_obj = Object.assign(obj,params,params_obj);
        console.log('merge_obj',merge_obj)
        console.log('.......',this.linkUrl)
        console.log('进入得到二维码')
        console.log('url',url)
        that.$axios({
          url: url,
          method: "post",
          data: merge_obj,
        }).then(res=>{
          if(res.data.message == 'success'){
            if(res.data.data.qr_img_b64){
              that.img_src = "data:image/png;base64," + res.data.data.qr_img_b64;
              console.log(that.img_src);
              that.dialog_img = true;
              that.img_wz = true;
              if(that.img_src){
                that.check_paid(that.call_back_url,payment_id);//查询二维码支付是否成功
              }
            }else {
              that.check_paid(that.call_back_url,payment_id);//查询二维码支付是否成功
            }
          }else{
            this.$message.error(error)
          }
        })
      },
      /**通过扫码枪，需要第三方才能支付扫码后确定*/
      payment_ensure(){
        let that = this;
          //http://47.98.113.173:8093
        //如果微信扫码后确定
        if(this.previewEnterBill.payMode === 38){
          let that = this;
          let transform = that.previewEnterBill.money*100;
          let code_pay_for_id= that.previewEnterBill.payReasonValue;
          // if(that.collect_pay === "out"){
          //   code_pay_for_id=that.pay_reason_one
          // }else {
          //   code_pay_for_id=that.pay_reason
          // };
          that.$axios({
            url: that.api.api_9530_9503+ '/v1/' + "payment/weixin/micropay",
            method: "post",
            data:{
              out_trade_no:that.order_form,//付钱的订单
              auth_code:that.pay_amount_money_code,//授权码
              total_fee:transform,
              product_id:5,//商品id现在是写死数据，后期改
              body:code_pay_for_id,
              spbill_create_ip:58548487,//	生成订单的IP地址现在是写死数据，后期改
            },
          }).then(res=>{
              //如果扫码成功
              if (res.data.message === "success"){
                // that.dialog_alipay = false;
                that.check_paid();//查看扫码是否成功
              }
              else{
                util.hintInfo(this,'warning', '扫码错误请重新扫码！');
              }
            })
            .catch(error=>{
              console.log(error);
            });
        }//如果支付宝扫码后确定
        else {
          that.$axios({
            url: that.api.api_pay_8094+ '/v1/' + 'alipay/trade_pay/',
            method: "post",
            data:{
              out_trade_no:that.order_form+"",//付钱的订单
              auth_code:that.pay_amount_money_code,//授权码
              total_amount:that.previewEnterBill.money ,//支付金额
              // pay_mode_id:that.pay_mode,//付款方式
              // subject :that.pay_reason,//付款原因
              subject :that.previewEnterBill.payReasonValue,//付款原因
            },

          }).then(res=>{
              //如果扫码成功即通过扫码枪==>支付宝接口提供的参数
              if (res.data.data.alipay_trade_pay_response.code === "10000"){
                // that.dialog_alipay = false;
                that.syntony_function()
              }
              else{
                util.hintInfo(this,'warning', '扫码错误请重新扫码！');
              }
            })
            .catch(error=>{
              console.log(error);
            });
        }
      },
      /***查询支付宝扫码支付成功与否的回调*/
      syntony_function(){
        let that = this;
        clearInterval(that.timer_r);
        that.$axios({
          // url: "http://pay.crowncrystalhotel.com/v1/alipay/query_result/",
          url: that.api.api_pay_8094+ '/v1/' + 'alipay/query_result/',
          method: "post",
          data:{
            out_trade_no:that.order_form + "",
          },
        })
          .then(res=>{
            console.log('支付宝扫码支付成功与否的回调',res.data)
            if (res.data.data.pay_status === "TRADE_SUCCESS"){
              console.log(res.data.data.pay_status)
              that.dialog_alipay=false;//扫码页面消失
              that.dialog_succeed=true;//成功或者失败的页面
              that.ihatetheqrcode=true;
              clearInterval(that.timer_r);
            }
            else{
              if(that.qr_w){
                  clearInterval(that.timer_r);
                  that.timer_qr();
                  if(that.timer>=60){
                    clearInterval(that.timer_r);
                    if (res.data.data === "TRADE_SUCCESS"){
                      that.dialog_succeed=true;//成功或者失败的页面
                      that.ihatetheqrcode=true;
                    }else {
                      that.dialog_succeed=true;//成功或者失败的页面
                      that.ihatetheqrcode=false;
                    }
                    return;
                  }
                }else {
                  clearInterval(that.timer_r);
                  that.timer_incident();
                  console.log(that.timer);
                  if(that.timer>=6){
                    clearInterval(that.timer_r);
                    if (res.data.data === "TRADE_SUCCESS"){
                      that.dialog_succeed=true;//成功或者失败的页面
                      that.ihatetheqrcode=true;
                    }else {
                      that.dialog_succeed=true;//成功或者失败的页面
                      that.ihatetheqrcode=false;
                    }
                    return;
                  }
                }
              // console.log(res.data.data.pay_status);
              // if(that.timer>=5){
              //   clearInterval(that.timer_r);
              //   if (res.data.data === "TRADE_SUCCESS"){
              //     that.dialog_succeed=true;//成功或者失败的页面
              //     that.ihatetheqrcode=true;
              //   }else {
              //     that.dialog_succeed=true;//成功或者失败的页面
              //     that.ihatetheqrcode=false;
              //   }
              //   return;
              // }
              // that.timer_incident();
            }
          })
          .catch(error=>{
            console.log(error);
          });
        },
        timer_incident(){
          let that = this;
          // that.timer=0;
          that.timer_r=setInterval(function()   //开启循环：
          {
            that.timer++;
            console.log(that.timer++);
            that.syntony_function();
            if(that.timer >=5){
              clearInterval(that.timer_r);
              console.log(that.timer);
              return;
            }
          },1000);
        },
        /** 封装获取微信的二维码*/
        kindle_dxg(){
          let that = this;
          let transform = that.previewEnterBill.money*100;
          // let code_pay_for_id="";
          // if(that.collect_pay === "out"){
          //   code_pay_for_id=that.pay_reason_one
          // }else {
          //   code_pay_for_id=that.pay_reason
          // };
          that.$axios({
            url: that.api.api_9530_9503+ '/v1/' + "payment/weixin/native",
            method: "post",
            data:{
              out_trade_no:that.order_form,
              total_fee:transform,
              product_id:5,//商品id现在是写死数据，后期改
              body: that.previewEnterBill.payReasonValue,
              spbill_create_ip:58548487,//	生成订单的IP地址现在是写死数据，后期改
            },
          }).then(res=>{
              if (res.data.message=="success"){
                if(res.data.data.qr_img_b64){
                  that.img_src = "data:image/png;base64," + res.data.data.qr_img_b64;
                  that.dialog_img = true;
                  that.img_wz = true;
                  that.check_paid(that.call_back_url,payment_id);//查询二维码支付是否成功
                }else {
                  that.check_paid(that.call_back_url,payment_id);//查询二维码支付是否成功
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
      //入账=>增加消费记录 不需要付款原因
      enterAccount_addChargeDetail(){
        if(this.enterBill.cashValue && this.enterBill.enterAccountCode && this.enterBill.money){
          // this.previewEnterBill.payReasonValue === '房费' ? this.previewEnterBill.payReasonValue = 5 : this.previewEnterBill.payReasonValue
          console.log('his.consume_check_flag==方法',this.consume_check_flag,this.fee_check_flag)
          //加收房费变换字段
          // if(this.fee_check_flag === true){
          //   this.previewEnterBill.payReasonValue === '房费' ? this.previewEnterBill.payReasonValue = 5 : this.previewEnterBill.payReasonValue
          //   if(this.enterBill.enterAccountCode = '全天房费'){
          //     this.previewEnterBill.enterAccountCode = 10
          //   }else if(this.enterBill.enterAccountCode = '半天房费'){
          //     this.previewEnterBill.enterAccountCode = 13
          //   }else if(this.enterBill.enterAccountCode = '手工房费'){
          //     this.previewEnterBill.enterAccountCode = 14
          //   }
          // }
          let scopeParam = {
            cashier_id: this.enterBill.cashValue,//	收银点id
            subject: 'consume',
            incoming_account_reason: this.previewEnterBill.payReasonValue, //付款原因
            incoming_account_code: this.enterBill.enterAccountCode,//入账代码
            account: this.preBillLinkParam.account_id,//主账户id
            charge_amount: Number(this.enterBill.money),//消费金额
            desc: this.enterBill.summary,
            // pay_mode_id: this.enterBill.payMode
          }
          let that = this
          // let url = that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/add_charges_pms`
          let url = that.api.api_newPrice_9114 + '/v1/' + `accounts/add_charge_detail/`
          console.log('++++',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res.data.mess',res.data.message)
            if(res.data.message === 'success'){
              if(this.consume_check_flag === true){//标记查房消费入账
                this.confirmChangeStatus()
                that.enterBillDialog = false //关闭入账界面
                this.pingAccount()
              }else if(this.fee_check_flag === true){
                console.log('加收房费')
                this.previewEnterBill.payReasonValue = ''//置空
                console.log('moneydesc.balance.。。。',this.moneydesc.balance)
                console.log('this.previewEnterBill.money钱。。。',this.previewEnterBill.money)
                that.enterBillDialog = false //关闭入账界面
                that.room_fee_dialog = false//关闭加收房费界面
              }else{
                console.log('入账之后==========>最终的进入')
                that.enterBillDialog = false //关闭入账界面
                that.only_consume_flag = 1
                that.queryData()//根据账户查询消费明细
                that.$message.success('入账(增加消费记录)成功!')
              }
            }
          }).catch(error=>{
          })
        }else{
          this.$message.warning("请填写收银点、入账代码或者金额！")
        }
      },
      //打开入账单dialog的时候处理数据
      handleEnterBill(){
        this.payInfoList = [] //置空防止干扰
        //刷新数据
        this.flushEnterAccount()
        this.only_consume_flag= 1
        this.preview_enter_flag = 1
        console.log('preBillLinkParam',this.preBillLinkParam,'master_guest[0].name')
        // this.enterBill.billInfo = this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name
        this.enterBill.billInfo =this.preBillLinkParam.master_guest.length > 0 ? this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name : this.preBillLinkParam.room_number
        this.queryData() //按主帐id批量查看消费明细 /v1/finance/charge_detail/get_by_account_ids
      },
      //打开入预收付钱
      handlePreviewEnterBill(){
        this.payInfoList = [] //置空防止干扰
        this.previewEnterBill.money = ''
        this.preview_enter_flag = 0
        this.flushPreviewEnterBill() //刷新入预收对象
        console.log('this.preBillLinkParam',this.preBillLinkParam)
        this.previewEnterBill.billInfo =this.preBillLinkParam.master_guest.length > 0 ? this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name : this.preBillLinkParam.room_number
        // this.getpayInfoListByAccount2() //按主帐id批量查看消费明细==>收支记录 /v1/finance/charge_detail/get_by_account_ids
        this.preview_enterBillDialog = true;
        console.log('dadafilter=================',this.tableData)
      },
      //刷新调账页面dialog
      flushTiaoData(){
        this.tiaoMoney = '',
        this.tiaoReasonValue = ''
      },
      flushPreviewEnterBill(){
        //入预收对象
        this.previewEnterBill = {
          billInfo: '',
          payMode: '',
          payReasonValue: '',
          enterAccountCode: '',
          money: '',
          accountData: '',
          summary: '',
          cashValue: '',
        }
      },
      // checkSelectable(row){
      //   //四种情况判断勾选状态。不能进行账务上操作，避免分开慢慢判断(退款、付款、已转账的，转账产生的明细都不能进行转账!)
      //   if(row.is_deleted == 0 && row.pay_status == 0){
      //     return true //可勾选
      //   }else{
      //     return false //不可勾选
      //   }
      //   // return row.related_transfer_id != undefined
      // },
      //账务明细====>转账操作aR转账
      confirmArTransfer(){
        let that = this
        console.log('ar')
        if(this.transferAccountId && this.transferMoneyValue && this.arAccountId){
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/ar_account/batch_transfer`
          let chargeIdArray = []
          for(var item of this.transferTabel){
            chargeIdArray.push(item.id)
          }
          let scopeParam = {
            ar_id: that.arAccountId, //转入的AR账户id
            charge_ids: JSON.stringify(chargeIdArray),
            from_id: null,
            cashier: null,
          }
          console.log('=========ar=====传入的值scopeParam',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            try {
              if(res.data.message != 'success'){
                that.$message.warning(res.data.message)
              }else{
                that.$message.success('转账成功!')
                that.transferAccountDialog = false
                that.clearTable()//清除勾选状态等其它状态
                that.queryData()
              }
            } catch (error) {
              that.$message.error('后台接口出错!')
            }
          }).catch(error=>{
          })
        }else{
          that.$message.warning('金额或挂临客/AR账户不能为空!')
        }
      },
      /**
      新版本转账===>合并功能(ar 与 普通账户)
       */
      confirmTransfer(){
        console.log('this.transferAccountId',this.transferAccountId)
        console.log('this.transferMoneyValue',this.transferMoneyValue)
        if(this.transferAccountId && this.transferMoneyValue){
          console.log('this.transferTabel====23132==',this.transferTabel,this.moneydesc.balance)
          let chargeIdArray = []
          for(var item of this.transferTabel){
            chargeIdArray.push(item.id)
          }
          console.log('chargeIdArray',chargeIdArray)
          // if(this.transferMoneyValue> this.transferNeedpayValue){
          //   this.$message.warning('请不要超出可转账金额!')
          // }
          console.log('查探this.transferAccountId',this.transferAccountId)
          let that = this
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/transfer_accounts_detail/batch_add`
          let url= that.api.api_newPrice_9114+ '/v1/' + `accounts/add_transfer_detail/`
          let scopeParam = {
            desc: null,//描述
            submit_reason_id: null,//转账原因
            from_account: this.preBillLinkParam.account_id,  //转出主帐id
            to_account:  this.transferAccountId != '-1'  ? this.transferAccountId : this.arAccountId, //this.transferAccountId,  //转入主帐id addAccount得到的此时
            submit_cashier: null,//收银点id
            // amount: this.moneydesc.balance >= 0 ? -Math.abs(this.transferMoneyValue) : Math.abs(this.transferMoneyValue), //转账金额
            charge_detail: chargeIdArray,
            is_ar_account: this.transferAccountId != '-1' ? 0 : 1 , //是否挂ar账户
          }
          console.log('==============传入的值scopeParam',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            try {
              if(res.data.message != 'success'){
                that.$message.warning(res.data.message)
              }else{
                that.$message.success('转账成功!')
                that.transferAccountDialog = false
                that.clearTable()//清除勾选状态等其它状态
                that.queryData()
              }
            } catch (error) {
              that.$message.error('后台接口出错!')
            }
          }).catch(error=>{
          })
        }else{
          this.$message.warning('金额或账户不能为空!') 
        }
      },
      //针对账户进行转账(不是单一一条消费明细==>通过checkbox)
      handleTransferData(){
        this.changePageCoreRecordData()
        this.transferAccountId = ''
        this.transferMoneyValue = 0
        this.arAccountId = '' //进入前置空
        console.log('multipleSelection_page',this.multipleSelection_page)
        console.log('multipleSelectionAll==flag',this.multipleSelectionAll)
        //第一步=>处理数据
        console.log('this.transferTabel',this.transferTabel)
        for(var item of this.multipleSelectionAll){
          if(item.subject == 'consume' && (item.pay_status == 0 || item.pay_status == 1)){
            this.transferAccountDialog = true
            if(item.can_arrange > 0){
              this.transferMoneyValue = Number(this.transferMoneyValue) + Number(item.can_arrange)
            }else{
              this.transferMoneyValue = Number(this.transferMoneyValue) + Number(item.charge_amount)
            }
          }else{
            this.$message.warning('请选择待结账或者已到账的消费明细!')
            this.transferAccountDialog = false
          }
        }
        this.multipleSelectionAll = this.multipleSelectionAll.filter(item=>item.subject == 'consume' && (item.pay_status == 0 || 1))
        this.transferTabel = this.multipleSelectionAll
        console.log('this.multipleSelectionAll===>转账明细',this.multipleSelectionAll)
      },
      //清除勾选状态
      clearTable(){
        this.multipleSelectionAll = []
        this.$refs.table.clearSelection();
      },
         // 设置选中的方法
        setSelectRow() {
          if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
            return;
          }
          // 标识当前行的唯一键的名称
          let idKey = this.idKey;
          let selectAllIds = [];
          let that = this;
          this.multipleSelectionAll.forEach(row => {
            selectAllIds.push(row[idKey]);
          });
          this.$refs.table.clearSelection();
          for (var i = 0; i < this.tableData.length; i++) {
            if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
              // 设置选中，记住table组件需要使用ref="table"
              this.$refs.table.toggleRowSelection(this.tableData[i], true);
            }
          }
        },
    currentChange(val) {
      // 改变页的时候调用一次
      this.changePageCoreRecordData();
      this.pagination.pageNumber = val;
      this.queryData();
    },
    //下拉框页数改变的时候调用
    sizeChange(val) {
      // 改变每页显示条数的时候调用一次
      this.changePageCoreRecordData();
      this.pagination.pageSize = val;
      this.queryData();
    },
    queryData(){
        this.tableData = []
        let startTime = null
        let endTime = null
        if(this.charge_date != null && this.charge_date != ''){
          startTime =  moment(this.charge_date[0]).format('YYYY-MM-DD')
          endTime = moment(this.charge_date[1]).format('YYYY-MM-DD')
        }
        console.log('checkList',this.checkList)
          let that = this
          let url 
          let subject_param = this.checkList.join(',')
          that.pagination.pageSize = Number(that.pagination.pageSize)
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/get_by_account_id_pms`
          if(startTime && endTime){
            if(subject_param){
              url= that.api.api_newPrice_9114+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&subject__in=${subject_param}&biz_date__gte=${startTime}&biz_date__lt=${endTime}&ordering=-create_datetime`
            }else{
              url= that.api.api_newPrice_9114+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&biz_date__gte=${startTime}&biz_date__lt=${endTime}&ordering=-create_datetime`
            }
          }else{
            if(subject_param){
              url= that.api.api_newPrice_9114+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&subject__in=${subject_param}&ordering=-create_datetime`
            }else{
              url= that.api.api_newPrice_9114+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&ordering=-create_datetime`
            }
          }
          console.log('this.checkList进入',this.checkList)
          let scopeParam = {
            only_self:1,
            account: [].concat(that.preBillLinkParam.account_id),
            // subjects: JSON.stringify(this.checkList), //	科目id的数组
            // in_or_out: '',
            // code_income_type_ids: null,
            // begin_date: startTime,//开始时间
            // end_date: endTime,//结束时间
          }
          that.$axios.post(url,scopeParam).then(res=>{
            that.tableData = res.data.data.results
            console.log('that.tableData',that.tableData)
            // this.only_consume_flag = 0
            // that.getEndpayInfoListByAccount()
            // that.total = res.data.totoal_count
              that.getEndpayInfoListByAccount()
              that.pagination.totalRows = res.data.data.count
              // that.total_consumption_value = that.tableData[0].account_id.total_consumption
              // that.need_pay_value = that.tableData[0].account_id.need_pay
            setTimeout(() => {
              this.setSelectRow();
            }, 20);
          }).catch(error=>{
          })
      },
      // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection_page;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection_page.forEach(row => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
      //账户明细===>处理转账
      handleChargeChange(val){
        this.multipleSelection_page = val;
        this.accountSelection = val
        // this.multipleSelection_page.length === 0 ? this.multipleSelectionAll = [] : this.multipleSelectionAll //重置数据
        console.log('multipleSelection_page',this.multipleSelection_page)
        console.log('multipleSelectionAll==flag',this.multipleSelectionAll)
        console.log('val',this.accountSelection)
      },
      //开始冲账
      setChongAccountRow(row){
        console.log('rowwwwwww',row)
        this.chongOrTiaoAccount(row,'冲账')
      },
      //开始调账
      setTiaoAccount(){
        if(this.tiaoMoney == '' || this.tiaoReasonValue == ''){
          this.$message.warning('数据不能为空!')
        }else{
          this.chongOrTiaoAccount(null,'调账')
        }
      },
      //冲调账接口
      chongOrTiaoAccount(row,param){
        console.log('qqq',row,param)
        let that = this
        // let url= `http://192.168.2.224:9005/v1/checkin/get_combine_list/`
        let url= that.api.api_9022_9519+ '/v1/' + `finance/arrange_account_operation/add`
        let scopeParam={
          account_id: that.preBillLinkParam.account_id,
          amount: row != null ? row.charge_amount + '' : that.tiaoMoney,
          arrange_flag: param == '冲账' ? 'y': 'x',//	冲调帐操作类型 x:调账 y:冲账
          reason_id: that.tiaoReasonValue,//	及冲调账原因，
          do_flag: 1,//	返回完成标志（冲调账结果标志 0：支付未完成， 1：成功，2：撤销，3：
          cashier: null,
          biz_date: moment(new Date()).format('YYYY-MM-DD'),
          gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          return_id: 1, //	返回的是id还是实例本身, 1返回id,0返回实例.
          charge_id: row != null ? row.id : '',//	int消费明细id,冲账时必须此参数
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('res',res.data.message)
          if(res.data.message === 'success'){
              that.$message.success('冲调账成功!')
              that.tiaoDialog = false
              that.getEndpayInfoListByAccount()
            }else{
              that.$message.warning('后台接口错误!')
            }
          })
      },
      getTransferAccountRow(row){
        // this.transferMoneyValue = ''
        this.transferAccountId = ''
        this.transferTabel = []
        console.log('rowww',row)
        this.transferTabel.push(row)
      },
      callback(){
        console.log(this.transferData_left,'callback1')
        console.log(this.transferData_right,'callback2')
      },
      //获取ar账户列表
      getArOption(){
        let that = this
        // let url=  that.api.api_9022_9519 + '/v1/' + `finance/ar_account/info_list`
        let url=  that.api.api_newPrice_9114 + '/v1/' + `accounts/get_ar_account_list/`
        that.$axios({
          method : 'get',
          url : url,
        }).then(res=>{
        if(res.data.message === 'success'){
          that.arOptions = res.data.data.results
          //  this.arOptions.unshift({
          //   id: '-2', //临时构造数据
          //   name: '挂临客帐'
          // })
          console.log('res,ar',res.data.data.results)
          }else{
            this.$message.warning('后台接口错误!')
          }
        })
      },
      //得到可选择的转账账户
      getTransferOption(){
        let that = this
        // let url= `http://192.168.2.224:9005/v1/checkin/get_combine_list/`
        // let url=  that.api.api_bill_9202 + '/v1/' + `checkin/get_combine_list_post/`
        let url= that.api.api_newBill_9204 + '/v2/' + `checkin/get_combine_list_post/`
        let scopeParam = {
          order_no: this.preBillLinkParam.order_no
        }
        that.$axios.post(url,scopeParam).then(res=>{
        console.log('res',this.transferOptions)
        if(res.data.message === 'success'){
          console.log('dddd',this.preBillLinkParam)
          // room_number
          this.transferOptions = res.data.data.filter(item=>item.room_number != that.preBillLinkParam.room_number)
          //暂时去掉下面的
          this.transferOptions.unshift({
            account_id: '-1',
            room_number: 'AR'
          })
          console.log('this.transferOptions',this.transferOptions)
          }else{
            this.$message.warning('后台接口错误!')
          }
        })
      },
      //tab切换选中事件
      tabClick(row){
        console.log(row,'tab')
        if(row.name=='2'){
          this.only_consume_flag = 0
          // this.queryData()
          this.clearTable()//清掉勾选
          this.queryData()
        }else if(row.name == '4'){
          this.getRemarkInfo() //获取备注信息==>即批量查看帐务提醒
        }else if(row.name=='6'){
          this.findAuthorizationList()
        }else if(row.name == '5'){
          console.log('jinruruuu')
          this.getInvoice()//按照主帐id查看一条开票记录
          // this.billDialog = true
        }
      },
      getRemarkInfo(){
        let that = this
        let id = that.preBillLinkParam.account_id
        let url = that.api.api_9022_9519+ '/v1/' + `finance/account_tip/get_by_account`
        that.$axios.get(url,{
          params: {
            account_id: id
          }}).then(res=>{
          console.log('res',res.data.data.list)
          that.remarkList = res.data.data.list
        })
      },
      //制卡操作
      activateCard(){
        let that = this
        let url = that.api.api_newPrice_9114 + '/v1/' + `room/room_lock/activate_card/`
        let scopeParam ={
          operate_type: 2,//1, "读卡"), (2, "写卡"), (4, "销卡"),
          start_time: this.preBillLinkParam.arr_time,
          end_time: this.preBillLinkParam.leave_time,
          room_no: this.preBillLinkParam.room_number,
          guest_no: 0,
          reference_id: this.preBillLinkParam.id
        }
        that.$axios.post(url,scopeParam).then(res=>{
         if(res.data.message == 'success'){
            let resUrl = res.data.data.url
            //  that.$http.jsonp(resUrl, {
            //   }).then(function (res) {
            //     console.log(res);
            //   }).catch(error=>{
            //     console.error(error)
            //   })
            //  that.$http.jsonp(resUrl).success(function(data){
            //    console.log(data,'shuju')
            //  })
            this.zhicard(resUrl)
          }else{
            that.message.error('本地服务没开启!')
          }
        }).catch(error=>{
            console.error();
        })
      },
      zhicard(url){
        url = url.replace('angular.callbacks._1','userHandler') //替换
        console.log('url获取',url)
        // url = 'http://127.0.0.1:32727/?startTime=2019-05-29%2010:35:55&endTime=2019-05-23%2010:43:35&type=2&roomNo=522&lockNo=None&guestNum=0&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF57&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0.0&Lock_AfterHour=0.0&jsonp=userHandler'
        this.$http.jsonp(url,{
          jsonp: 'callback',//可省略
          jsonpCallback: "userHandler"
        }).then(res =>{
          console.log('json',res.body)
          if(res.body.Result === true){
            this.$message.success('制卡成功!')
          }else{
            this.$message.warning('制卡失败!')
          }
        }).catch(error=>{
          console.error();
        })
      },
      //退房===>选择人员,在这之前应该进行结账的操作
      selectPerson(){
        this.getRoomInfoOther()//查询是否在查房，避免再次新建查房任务
        setTimeout(() => {
          if (this.isNewRoom_task === 2){
            this.pingAccount()
            return
          }
          // this.getEndpayInfoListByAccount()//再次查询余额多少防止缓存影响==换位置了
          //判断该房间是否需要查房
          for(var item of this.roomTypeList){
            if(item.descript === this.preBillLinkParam.room_type){
              this.preBillLinkParam.is_check_room = item.is_check_room //赋值 是否查房
            }
          }
          // this.getRoomType()
          // console.log('roomTypeList后续判断',this.roomTypeList)
          // console.log('111',this.preBillLinkParam)
          // console.log('preBillLinkParam.combine_room_list',this.preBillLinkParam.combine_room_list)
          // console.log('this.endPayListParam.balance',this.endPayListParam.balance)
          //当未结账的时候==>即帐未平的时候
          // if(this.endPayListParam.balance != 0){
          //   this.handleJieAccount() //先结账
          // }else{
            //判断是否需要查房 0为不查房否则需要查房
            if(this.preBillLinkParam.is_check_room === 0){
              console.log('00')
              this.pingAccount()
            }else{
              this.personDialog=true
              this.getEmployeeInfo()//获取人员信息
            }
          // }
        }, 500);
      },
      //退房===》查房==>接口
      watchRoom(row, column, event){
        console.log('重要标志isNewRoom_task',this.isNewRoom_task)
        console.log('111',row)
        this.checkRoomFlag = ''
        // this.refundHouse = false
        console.log('新建查房任务===>开始查房')
        if(this.isNewRoom_task === true){
          this.nweRoomInfo(row) //=======
        }else{
          this.timeTask()
        }
      },
      //新建查房任务
      nweRoomInfo(row){
        this.personDialog=false//关闭页面
        this.refundHouse = false
        let that = this
        let url= that.api.api_service_9104+ '/v1/' + `task/room_service/add_room_check/`
        let scopeParam = {
          check_type: 'CO', //( ('CK', "入住报房"), ('CO', "离店查房"), )
          room_no: that.preBillLinkParam.room_number,//房间号
          master_id: that.preBillLinkParam.order_no, //入住单号
          account_id: that.preBillLinkParam.account_id,//主账单id
          // work_user_id:65  //人员id====================>以后改动
          work_user_id: row.id  //人员id====================>以后改动
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('resssss============',res.data)
          if(res.data.message==='success'){
            // that.timer_room = setTimeout(() => {
            that.timeTask()//轮询方法开始查房任务
            // that.timer_room = setInterval(() => {
            //   that.getRoomInfo()//查房
            //   console.log('this.endPayListParam11==>新建查房任务',this.endPayListParam, this.endPayListParam.balance)
            // }, 5000);
            console.log('that.checkRoomFlag',that.checkRoomFlag)
            // if(that.checkRoomFlag === 1){
            //   // clearInterval(that.timer_room)
            //   console.log('进入进入进入进入进入')
            //   this.refundHouse = true
            //   this.pingAccount()
            // }
          }else{
            this.$message.warning(res.data.message)
          }
          }).catch(error=>{
        })
      },
      timeTask(){
        let that = this
        that.personDialog=false//关闭页面
        that.refundHouse = false
        that.timer_room = setInterval(() => {
          that.getRoomInfo()//查房
          console.log('this.endPayListParam11==>新建查房任务',this.endPayListParam, this.endPayListParam.balance)
        }, 5000);
      },
      //开始查房
      getRoomInfo(){
        let that = this
        let url= that.api.api_service_9104+ '/v1/' + `task/room_service/validate_room_check/`
        let scopeParam = {
          room_no: that.preBillLinkParam.room_number,//房间号
          master_id: that.preBillLinkParam.order_no, //入住单号
          account_id: that.preBillLinkParam.account_id,//主账单id
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log(res.data.data,'res.data.data.....========账11111=======........................')
          //当为1需要循环查询，当为2查房完成不入账直接正常退房 当为3弹出dialog查房消费信息
          console.log('res.data.data.success',res.data.data.success)
          if(res.data.data.success === 3){  //标记<=======最终要改(已经)
            that.checkRoomFlag = 1 //
            clearInterval(that.timer_room)
            console.log('进入panduan是否加载ing',that.refundHouse)
            console.log('开始真正退房!')
            that.refundHouse = true
            console.log('进入panduan是否加载ing',that.refundHouse)
            if(res.data.data.consume_detail){
              that.pingAccount(res.data.data.consume_detail)
            }else{
              that.$message.warning('循环中的产生<===直接退房！不调用，不循环新建任务查房了 和2类似啦，不需要入账类似!')
            }
          }else if(res.data.data.success === 2){
            that.refundHouse = true
          }
          else{
            console.log('........》......................')
            // that.$message.warning('后台报错!')
          }
          }).catch(error=>{
        })
        // setInterval(() => {

        // }, 1000);
        // setTimeout(() => {
        //   this.refundHouse = true
        // }, 1000);
      },
      //查房,避免再次新建查房任务===>检测机制
      getRoomInfoOther(param){
        console.log('查房,避免再次新建查房任务,,')
        let that = this
        let consume_detail
        let url= that.api.api_service_9104+ '/v1/' + `task/room_service/validate_room_check/`
        let scopeParam
        if(param){
          scopeParam = {
            room_no: param[0],//房间号
            master_id: param[1], //入住单号
            account_id: param[6],//主账单id
          }
        }else{
          scopeParam = {
            room_no: that.preBillLinkParam.room_number,//房间号
            master_id: that.preBillLinkParam.order_no, //入住单号
            account_id: that.preBillLinkParam.account_id,//主账单id
          }
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('查房首次进入.................',res.data.data)
          //当为1需要循环查询，当为2查房完成不入账直接正常退房 当为3弹出dialog查房消费信息
          if(res.data.data.success === 1){  //标记<=======
            console.log('开始进入不创建查房任务.................',res.data.data)
            that.isNewRoom_task = 1 //不许新建查房任务
            that.refundHouse = false //就加载
            that.timeTask()
          }else if(res.data.data.success === 3){
            that.refundHouse = true //就不加载
            console.log('....',res.data.data.consume_detail)
            if(res.data.data.consume_detail){
              that.pingAccount(res.data.data.consume_detail)
            }else{
              that.$message.warning('直接退房！不调用，不循环新建任务查房了 和2类似啦，不需要入账类似!')
            }
          }else if(res.data.data.success === 2){
            that.isNewRoom_task = 2 //不许新建查房任务
            that.refundHouse = true //不加载
          }
          else if(res.data.data.success === true){
            console.log('else...')
            that.refundHouse = true //就不加载
            that.isNewRoom_task = true //需要新建查房任务
          }
          }).catch(error=>{
            console.log('error')
        })
      },
      //新版本 ====>退房
      pingAccount(){
        this.consume_checkRoom_price = 0
        // if(this.endPayListParam.close_flag != null && this.endPayListParam.close_flag != ''){
          //必须要强制平账
          let forceValue = 0
          // if(param){
          //   this.consume_data = eval('('+param+')')
          //   console.log('this.consume_data',this.consume_data)
          //   this.consume_dialogVisible = true//查房产生的消费dialog
          //   for(var item of this.consume_data){
          //     this.consume_checkRoom_price = this.consume_checkRoom_price + item.num*item.price
          //   }
          // }else{
          //   this.$message.warning('没有消费或者查房完成了,直接开始退房!')
            if(this.moneydesc.balance != 0){
              forceValue = 1
              this.dialogVisible = true
              console.log('进入进入弹出',this.dialogVisible)
            }else{
              console.log('进入进入弹出22',this.dialogVisible)
              forceValue = 0
              this.refundMoney(forceValue)
            }
          // }
          // console.log('this.endPayListParam.balance',this.endPayListParam.balance)
          // console.log('forceValue',forceValue)
        // }else{
        //   this.$message.warning('请先结账，才能退房!')
        // }
      },
      //查房产生的消费进行入账
      confirm_consume_account(param){
        this.consume_check_flag = true//查房消费入账标记
        console.log('consume_checkRoom_price',this.consume_checkRoom_price)
        //当入账和不入账的时候的操作
        if(param==='入账'){
          this.enterBillDialog = true //入账框弹出
          this.enterBill.money = this.consume_checkRoom_price
        }else{
          this.confirmChangeStatus()
          this.pingAccount()
        }
        // this.consume_dialogVisible = false;
      },
      //改变房子的状态为2(入消费了一笔)
      confirmChangeStatus(){
        let that = this
        let url= that.api.api_service_9104+ '/v1/' + `task/room_service/update_room_check/`
        let scopeParam = {
         room_no: this.preBillLinkParam.room_number,
         code: 2
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message==='success'){
            this.enterBillDialog = false //入账框消失
          }
          }).catch(error=>{
        })
      },
      //确定强制退房
      confirmReturnHouse(){
        try {
          let forceValue = 1
          this.refundMoney(forceValue)//强制退款!
        } catch (error) {
          console.log('error')
        }
      },
      cancleReturnHouse(){
        this.$message({
          type: 'info',
          message: '取消退房'
        });
      },
      //正式开始退款====>金额==>退房的时候 ====>新版本
      refundMoney(param){
        console.log('parammmm',param)
        console.log('...',this.preBillLinkParam.master_guest)
        let policeArray = []
        this.preBillLinkParam.master_guest.forEach(item=>{
          policeArray.push({
            card_type: '身份证',
            card_number: '232724199504230729'
          })
        })
        console.log('policeArray',policeArray)
        // this.refundPolice(policeArray)
        // return
        let that = this
        // let url = 'http://192.168.2.165:9005'+ '/v2/' + `checkin/check_out/`
        let url= that.api.api_newBill_9204 + '/v2/' + `checkin/check_out/`
        let scopeParam = {
          order_no: this.preBillLinkParam.order_no, //传入平账(结账)前的账号
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message==='退房成功！'){
            //退房===>公安销毁
            // this.refundPolice(policeArray) 暂时注销
            this.linkHouseFornVisible = false //退房关闭页面 res.data.message 为已有平帐记录则表示退房
            // this.$router.go(0)
            this.flushByLink()//刷新数据
            this.$message.success('退房成功!')
          }else{
            this.$message.warning(res.data.message)
          }
          }).catch(error=>{
        })
      },
      //公安退房销毁 === >需要循环调用退房 不需要
      refundPolice(param){
        let that = this
        let url = 'http://organ.crowncrystalhotel.com/v1/organization/ht/public_security/pms_submit_array_check_out/'
        let scopeParam = {
          guest_array: param
        }
        console.log('scopeParam',scopeParam)
        that.$axios({
          method: "POST",
          url: url,
          data: scopeParam,
          // headers: {
          //     'authorization': 'auth_d5e4b051a5ed49db93cefd548216331e'
          // }
        }).then(res=>{
          console.log('res',res)
          if(res.data.data.faild_guest.length == 0){
            that.$message.warning('公安退房成功!')
          }else{
            that.$message.warning('公安退房存在问题!')
          }
        }).catch(()=>{
            that.$message.warning('接口错误!')
        })
      },
    //结账==>直接就结账了
      jie_addChargeDetail(){
        // if(this.previewEnterBill.payReasonValue && this.previewEnterBill.cashValue && this.previewEnterBill.enterAccountCode){
          let scopeParam = {
            account: this.preBillLinkParam.account_id,//主账户id
            remark: this.previewEnterBill.remark,
          }
          let that = this
          let url= that.api.api_newPrice_9114+ '/v1/' + `accounts/add_close_detail/`
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message==='success'){
              that.queryData()//根据账户查询消费明细
              that.$message.success('操作成功!')
              that.jieAccountDialog = false
            }else{
              that.$message.warning(res.data.message)
            }
          }).catch(error=>{
          })
        // }
        // else{
        //   this.$message.warning('请选择或者输入必要数据!')
        // }
      },
      //结账==>付款==>废弃
      jie_payCharge(){
         let that = this
        let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_pms`
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        let scopeParam = {
          account_id: this.preBillLinkParam.account_id, //主账id
          pay_amount: this.jieParam.jie_payValue,
          code_pay_for_id: this.jieParam.jie_payReasonValue,
          code_income_type_id: this.jieParam.jie_incomeValue,   //入账类型代码id
          gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          cashier_id:	9,
          pay_mode_id: this.jieParam.jie_payModeValue,
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data.message)
          if(res.data.message != 'success'){
            this.$message.warning('调用后台接口失败')
          }else{
            this.$message.success('操作成功!')
            that.queryData()//根据账户查询消费明细
          }
          }).catch(error=>{
        })
      },
      //加收房费(半天全天等)
      confirmFee(param){
        // this.getPayReason()
        // this.getIncomingAccount()
        // this.getPayReason()
        this.enterBill.billInfo =this.preBillLinkParam.master_guest.length > 0 ? this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name : this.preBillLinkParam.room_number
        if(param==='全天'){
          this.fee_check_flag = true
          this.enterBillDialog = true
          this.previewEnterBill.payReasonValue = 5//5
          this.enterBill.enterAccountCode = 16//10
           this.enterBill.money= this.current_rate_price
        }else if(param==='半天'){
          this.fee_check_flag = true
          this.enterBillDialog = true
          this.previewEnterBill.payReasonValue = 5//5
          this.enterBill.enterAccountCode = 18//13
           this.enterBill.money= (this.current_rate_price/2).toFixed(0)
        }else if(param==='手工'){
          this.fee_check_flag = true
          this.enterBillDialog = true
          this.previewEnterBill.payReasonValue = 5//5
          this.enterBill.money= ''
          this.enterBill.enterAccountCode = 19//14
        }else{
          this.room_fee_dialog = false
        }
      },
      controlShow(){
        console.log('========验证=====this.multipleSelectionAll=======',this.multipleSelectionAll)
        console.log('========验证====this.multipleSelection_page',this.multipleSelection_page)
        if(this.multipleSelection_page.length === 0){
          return false
        }
        if(this.multipleSelectionAll.length != 0 || this.moneydesc.balance == 0 || this.multipleSelection_page.length> 0){
          return true
        }else{
          return false
        }
      },
      /**进入结账dialog ==param */
      handleJieAccount(){
        this.moneydesc.balance <= 0 ? this.preview_enter_flag = 0 : this.preview_enter_flag = 1
        console.log('离房时间',this.preBillLinkParam)
        console.log('time',moment().format('YYYY-MM-DD HH:mm:ss'))
        let now_date = moment().format('YYYY-MM-DD HH:mm:ss')
        let leave_time = this.preBillLinkParam.leave_time
        //超过离房时间了
        if(now_date > leave_time){
          console.log('jinru-')
          this.room_fee_dialog = true
          this.getPayReason()//再查一遍默认选择值
          this.getIncomingAccount()//再查一遍默认选择值
          this.previewEnterBill.payReasonValue = 5 //默认付款方式
        }
        this.flushPreviewEnterBill()
        this.jieAccountTitle = '结账'
        this.jieAccountDialog = true
        this.jie_flag = true
        console.log('v-if="endPayListParam.usable_pre_authorized !=0"',this.endPayListParam.usable_pre_authorized)
        //有预授权的时候
        if(this.moneydesc.balance < 0 && this.endPayListParam.usable_pre_authorized>0){
          this.get_list_by_hotel()//请求一遍
          this.previewEnterBill.payMode = 34 //线上环境需同步
        }
        // preview_enter_flag = 0
        console.log('this.previewEnterBill.payMode////',this.previewEnterBill.payMode)
        // this.previewEnterBill.money = this.moneydesc.total_consumption
        // this.jieParam.jie_payValue = Math.abs(this.moneydesc.balance)
        this.previewEnterBill.money = Math.abs(this.moneydesc.balance)
        // this.previewEnterBill.money = 0.01
      },
      flushSplitParam(){
        this.splitAccountParam = {
          desc: '',
          remark: '',
          split_method_id: 0
        }
      },
      /**分账 */
      splitAccount(){
        console.log('that.preBillLinkParam.account_id',this.preBillLinkParam.account_id)
        let that = this
        let url= that.api.api_9022_9519+ '/v1/' + `finance/split_account_operation/add`
        let scopeParam = {
          main_account: that.preBillLinkParam.account_id, //传入分帐前的账号
          split_method_id: that.splitAccountParam.split_method_id,
          num: that.splitAccountParam.num,//暂时
          cashier_id: null,
          split_amount: that.splitAccountParam.split_amount,
          desc: this.splitAccountParam.desc
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message === 'success'){
            that.$message.success('分账成功!')
            that.fenAccountDialog = false
          }else{
            that.$message.warning('分账失败!')
          }
          }).catch(error=>{
        })
      },
      /**
       * 添加入住人
       */
      confirmAddPeople(){
        let that = this
        // let url =
        console.log('preBillLinkParam.master_guest',this.master_guest_value)
        if(that.master_guest_value){
          // let url= that.api.api_bill_9202 + '/v1/' + `checkin/add_master_guest_list/`
          let url= that.api.api_newBill_9204 + '/v2/' + `checkin/add_master_guest/`
          // let url= `http://192.168.2.224:9005/v1/checkin/add_master_guest_list/`
          that.$axios.post(url, that.master_guest_value).then(res=>{
            // that.enterPersonVisible=false;
            if(res.data.message === 'success'){
              that.enterPersonVisible=false;
              that.$message.success('添加成功!')
            }
            }).catch(error=>{
          })
        }else{
          that.$message.success('请添加入住人!')
        }
      },
      /**
       * 计算
       */
      countDay(){
        let start = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.after_leave_time_2).format('YYYY-MM-DD HH:mm:ss')
        let day
        console.log('jinru')
        day = this.datedifference(start, end)
        console.log('day',day)
        // return this.datedifference(start, end)
      },
      /**
       * 续住或者提前离店
       */
      confirmContinueRoom(){
        let that = this
        let total_continue_day
        let url= that.api.api_newBill_9204 + '/v2/' + `depend_ex/extend_check/`
        // let url= `http://192.168.2.224:9005/v1/depend_ex/extend_check/`
        let start = moment(this.preBillLinkParam.leave_time).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.after_leave_time_2).format('YYYY-MM-DD 14:00:00')
        console.log('..',start.slice(0,10))
        //处理续住或提前离店时间=======>total_continue_day
        if(start.slice(0,10) == end.slice(0,10)){
          total_continue_day = 0
        }else{
          total_continue_day = this.datedifference(start, end)
        }
        let scopeParam = {
          order_no: this.preBillLinkParam.order_no,
          chang_leave_time: moment(this.after_leave_time_2).format('YYYY-MM-DD 14:00:00'),
          total_continue_day: total_continue_day,//暂时
          total_day: null,
          remark: this.remark_continue,
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message === 'success'){
            that.continueLiveDialog = false
            that.leaveDialog = false
            // this.this.preBillLinkParam.room_number
            that.getEnterInfoByRoom(that.preBillLinkParam.order_no)//查询，重置数据
            that.$message.success('操作成功!')
          }else{
            that.$message.warning('操作失败!')
          }
          // this.getEnterInfoByRoom(this.preBillLinkParam.room_no) //更新数据 失效
          }).catch(error=>{
        })
      },
      handleEnterPeople(){
        console.log('入住。。',this.preBillLinkParam.master_guest)
        this.disableLength = this.preBillLinkParam.master_guest.length
        console.log('入住..。。',this.disableLength)
      },
      //处理续住的时间
      handleDate(){
        console.log('this.xuzhu',this.preBillLinkParam.room_number)
        this.remark_continue = '' //刷新数据作用，进入页面后
        this.before_leave_time = [new Date(this.preBillLinkParam.arr_time), new Date(this.preBillLinkParam.leave_time)]
        this.after_leave_time_1 = new Date(this.preBillLinkParam.arr_time)
        this.after_leave_time_2 = new Date(this.preBillLinkParam.leave_time)
      },
      /**
       * 根据账务id得到账务明细 ===>粗略废弃
       */
      getpayListByAccount(){
        let array = []
        array.push(this.preBillLinkParam.account_id)
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/list_by_account`
          let param = {
            account_ids: array
          }
          param.account_ids = JSON.stringify(param.account_ids)
          let scopeParam = param
          that.$axios.post(url,scopeParam).then(res=>{
            this.accoutInfoList = res.data.data.list
            let charge_count = 0
            // let pay_count = 0
            for(var item of this.accoutInfoList){
              this.charge_count = item.charge_amount + charge_count
              // this.pay_count = item.pay_count + pay_count
            }
          }).catch(error=>{
        })
      },
      /**
       * 根据账户id查询消费及对应支付记录=>详细  /v1/finance/account/get_info/
       */
      // queryData(interParam){
      //   if(interParam){
      //     this.changePageCoreRecordData()
      //   }
      //   console.log('only_consume_flag',this.only_consume_flag)
      //   console.log('charge_date',this.charge_date)
      //   let startTime = null
      //   let endTime = null
      //   if(this.charge_date != null && this.charge_date != ''){
      //     startTime =  moment(this.charge_date[0]).format('YYYY-MM-DD')
      //     endTime = moment(this.charge_date[1]).format('YYYY-MM-DD')
      //   }
      //   let testInt = Number.isInteger(interParam) //判断处理传入页码 分页
      //   // let array = []
      //   // array.push(this.preBillLinkParam.account_id)
      //     let array = []
      //     array = JSON.stringify(array)
      //     let that = this
      //     // let url= that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/get_by_account_ids `
      //     let url= that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/get_by_account_id_pms`
      //     console.log('this.checkList进入',this.checkList)
      //     let scopeParam = {
      //       account_id: that.preBillLinkParam.account_id,
      //       subjects: JSON.stringify(this.checkList), //	科目id的数组
      //       in_or_out: '',
      //       code_income_type_ids: null,
      //       begin_date: startTime,//开始时间
      //       end_date: endTime,//结束时间
      //       page_num: testInt === true ? interParam : interParam = 1,//分页
      //       page_size: that.page_size
      //     }
      //     that.$axios.post(url,scopeParam).then(res=>{
      //       // console.log('res.data',res.data)
      //       that.tableData = res.data.list
      //       // console.log('that.tableData========',that.tableData)
      //       // console.log('that.preview_enter_flag',that.preview_enter_flag)
      //       // if(that.only_consume_flag === 1){
      //       //   that.accountMaxInfoListCopy = _.cloneDeep(that.tableData)
      //       // }
      //       // this.only_consume_flag = 0
      //       that.getEndpayInfoListByAccount()
      //       that.total = res.data.totoal_count
      //       that.total_consumption_value = that.tableData[0].account_id.total_consumption
      //       that.need_pay_value = that.tableData[0].account_id.need_pay
      //       that.setSelectRow()
      //     }).catch(error=>{
      //     })
      // },
      /**
       * 只查入预收消费明细
       */
         /**
       * 根据账户id查询消费及对应支付记录=>详细  /v1/finance/account/get_info/
       */
      getpayInfoListByAccount2(interParam){
        return //新(老)版本不请求
        console.log('charge_date',this.charge_date)
        let startTime = null
        let endTime = null
        if(this.charge_date != null && this.charge_date != ''){
          startTime =  moment(this.charge_date[0]).format('YYYY-MM-DD')
          endTime = moment(this.charge_date[1]).format('YYYY-MM-DD')
        }
        let testInt = Number.isInteger(interParam) //判断处理传入页码 分页
        let array = []
        array.push(this.preBillLinkParam.account_id)
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/charge_detail/get_by_account_ids2`
          let param = {
            account_ids: array,
            // pay_status: JSON.stringify([-1]),//	-1全部,1,已结,2已挂,-2其它.
            only_consume: 0,//是否仅仅显示消费的内容?1是,0不是即显示所有账户消费明细等
            begin_date: startTime,//开始时间
            end_date: endTime,//结束时间
            code_income_type_id: null,//入账代码id
            page_num: testInt === true ? interParam : interParam = 1,//分页
            page_size: this.page_size
          }
          param.account_ids = JSON.stringify(param.account_ids)
          let scopeParam = param
          that.$axios.post(url,scopeParam).then(res=>{
            that.accountMaxInfoList2 = res.data.data.list
          }).catch(error=>{
          })
      },
       /**
       *高级权限=>查看账户最终消费情况  /v1/finance/account/get_info/
       */
        getEndpayInfoListByAccount(params){
          params ? params : '' //重新计算params从而判断相应房间的账户从而计算最终账户值从而退房判断不会出错
          console.log('params=====。。。。。zhanghu',params)
          console.log('this.preBillLinkParam.account_id值',this.preBillLinkParam)
            let id =  params ? params : this.preBillLinkParam.account_id
            let that = this
            // let param ={
            //   with_collections: 1,
            //   related_objects: 1
            // }
            // id = 1
            // let url= that.api.api_9022_9519+ '/v1/' + `finance/account/get_info_pms/` + id
            let url= that.api.api_newPrice_9114+ '/v1/' + `accounts/get_account_base_info/` + id + '/'
            that.$axios({
              method : 'get',
              url : url,
          }).then(res=>{
              that.endPayListParam = res.data.data
              console.log('this.accoutInfoById_param===================================》》》》》》最终账户',that.endPayListParam)
              try {
                that.moneydesc.pay_amount = Number(that.endPayListParam.pay_amount) + Number(that.endPayListParam.usable_pre_authorized)//添加了预授权
                that.moneydesc.total_consumption = that.endPayListParam.general_consumption //消费
                that.moneydesc.balance = that.endPayListParam.balance //余额
                that.moneydesc.need_pay = that.endPayListParam.balance //应收应退
              } catch (error) {
                that.$message.warning('数据出错!')                
              }
              this.previewEnterBill.money = Math.abs(that.moneydesc.balance)//两外加 结账加收房费重置值
              // for(var item of this.endPayListParam.charge_details){
              //   for(var itemm of this.incomingAccoutList){
              //     if(item.code_income_type_id === itemm.id){
              //       item.name = itemm.name
              //     }
              //   }
              // }
            }).catch(error=>{
            })
      },
      /**已废弃 */
      // chooseInfo(item){
      //   this.tabValue = item.room_number
      //   console.log('点击',item.room_number)
      //   this.finRoomByNumber(item) //不一定适用方法
      // },
      selectCheckedAll: function() {
        console.log('checkboxList=====>',this.checkboxList)
        if (this.flag_checked) {//实现反选
            this.checkboxList = [];
        } else { //实现全选
            this.checkboxList = [];
            this.preBillLinkParam.combine_room_list.forEach( (item) => {
                this.checkboxList.push(item[0]);
            });
        }
      },
      //清空重置对象或数组的数据
      flushData(){
        this.preBillParam.houseTypeInfoList = [{
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //总价钱
            dynamic_roomNumber: [],
            mayCount: '2',
        }],
        this.preBillParam.check_guest = [{
            enterRoom: '',
            name: '',
            sex : '',
            id_code : '',
            id_no : '',
            telephone : '',
            street_add : ''
        }]
      },
        senToParent(){
          this.$emit('listenToPreview', '已经预定了')
        },
        //预订单=>确认预定
        confirmPreview(){
          // if(!this.validatePreviewData() && !this.validatePreData()){
          //   return false
          // }
          this.previewFormVisible=false
          console.log('preBillParam.consumeInfoList',this.preBillParam.consumeInfoList)
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
        validatePayData(){
          return(
            util.validateBlank(this.previewEnterBill.enterAccountCode,'入账代码是必填项',this)&&
            // util.validateBlank(this.previewEnterBill.payMode,'支付方式是必填项',this)&&
            util.validateBlank(this.previewEnterBill.money,'请输入金额',this)
            // util.validateBlank(this.previewEnterBill.payReasonValue,'付(退)款原因是必填项',this)
          )
        },
        //验证预定数据
        validatePreviewData(){
            //判断选择房型为空时
            for(var item of this.preBillParam.houseTypeInfoList){
            if(item.houseTypeValue === ''|| item.houseTypeValue === null){
                this.$message.warning('请选择房型!')
                return false
            }
            }
            //有入住人的时候
            if(this.is_addlive === true){
                for(var item of this.preBillParam.check_guest){
                    util.validateBlank(item.telephone,'联系电话是必填项',this)&&
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
          util.validateTelNumber(this.preBillParam.reserve_base.telephone_master,'请输入正确手机格式',this)
          )
        },
        //预定=》获取早餐list
        getBreakfastList(){
            let that = this
            // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
            // let url = that.UrLHeader + 'room/get_roomnumber_list/'
            let url = that.api.api_newPrice_9114 + '/v1/' + 'room/rate_code/get_breakfast_list/'
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
          this.remarkTitle = '编辑备注'
          this.addAndUpdate = false //标记
          this.remarkContent_value = row.content
          this.remark_id = row.id
        },
        //联房=》删除备注
        deleteRemarkInfo(row){
          console.log('row',row)
          let that = this
          let id =  row.id
          let url = that.api.api_9022_9519+ '/v1/' + `finance/account_tip/remove/` + id
          that.$axios.post(url).then(res=>{
            console.log('resssdelete',res.data)
            if(res.data.message==='success'){
              that.getRemarkInfo()
            }
          }).catch(error=>{
          })
        },
        //获取预订单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
            item.houseTypeValue = param
            switch (param) {
            case '大床房':
                this.houseType_HeadValue = '标准正价[大床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥100'
                break;
            case '标准双床房':
                this.houseType_HeadValue = '标准正价[标准双床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '特惠双床房':
                this.houseType_HeadValue = '标准正价[特惠双床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '特惠大床房':
                this.houseType_HeadValue = '标准正价[特惠大床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '复式商务房':
                this.houseType_HeadValue = '标准正价[复式商务房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '商务大床房':
                this.houseType_HeadValue = '标准正价[商务大床房]'
                this.houseType_priceValue_1= '￥169'
                this.houseType_priceValue_2= '￥135-￥161'
                break;
            case '全新商务房B':
                this.houseType_HeadValue = '标准正价[全新商务房B]'
                this.houseType_priceValue_1= '￥169'
                this.houseType_priceValue_2= '￥135-￥161'
                break;
            default:
                break;
            }
        },
        //预订单获取对应房类型
        getHouseTypePrice(item,index){
          // item.houseTypeValue = value
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.houseTypeInfoList[index].houseTypeValue = value//替换
          // console.log('this.preBillParam.houseTypeInfoList',this.preBillParam.houseTypeInfoList)
        },
        //选房号dialog=》提交得到相应房号confirm
        changeRoom(){
          let that = this
          console.log('that.multipleSelection',that.multipleSelection)
          if(that.multipleSelection.length>1){
            that.$message.warning('只能选一间房间换房!')
            return false
          }else{
            if(that.multipleSelection.length === 0){
            that.$message.warning('请选择房间进行换房!')
            }else{
              // let url = 'http://192.168.2.224:9005' + '/v1/' + `checkin/exchange_houses/`
              let url = that.api.api_bill_9202 + '/v1/' + `checkin/exchange_houses/`
              let scopeParam ={
                order_no:  that.preBillLinkParam.order_no,
                room_number: that.multipleSelection[0].room_no,
              }
              that.$axios.post(url,scopeParam).then(res=>{
                console.log('res.data.data',res.data.data)
                if(res.data.message === 'success'){
                  that.switchNumberDialog = false;
                  this.linkHouseFornVisible = false;
                  this.flushByLink()//刷新数据
                  that.$message.success('换房成功!')
                  // that.$router.go(0)
                }else{
                  that.$message.warning('换房失败!')
                }
                }).catch(error=>{
              })
            }
            console.log('this.multipleSelectionget',this.multipleSelection)
            }
        },
        //子组件刷新更新父组件数据
        flushByLink(){
          this.$emit('listenToFlushLink', '已经换房/退房/更改房态了了,更新房态图')
        },
        //单=》选房号dialogtabel 并控制不可选房间号
        handleselect(selection, row){
          console.log('selection',selection)
          this.multipleSelection = selection;
          // if(this.multipleSelection.length>1){
          //   this.$message.warning('只能选一间房间进行换房!')
          //   return false
          //   // let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引
          //   // this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
          // }
        },
        //增加入住人
        addSelect_2(){
          let enterValue = {
              order_no: this.preBillLinkParam.order_no,
              room_number: this.preBillLinkParam.room_number,
              master_base_id: this.preBillLinkParam.master_guest[0].master_base_id,
              reserve_base_id: this.preBillLinkParam.master_guest[0].reserve_base_id,
              guest_id: this.preBillLinkParam.master_guest[0].guest_id,
              arr_time: this.preBillLinkParam.arr_time,
              leave_time: this.preBillLinkParam.leave_time,
              name: '',
              sex : '',
              id_code : '',
              id_no : '',
              telephone : '',
              street_add : ''
          }
          this.master_guest_value.push(enterValue)
          console.log('this.master_guest_value',this.master_guest_value)
          this.preBillLinkParam.master_guest.push(enterValue)
          this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_2(index){
          if(this.preBillLinkParam.master_guest.length>1){
            if(this.preBillLinkParam.master_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.preBillLinkParam.master_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        //增加选择框新建入住单里
        addSelect(){
          let houseTypeValue = {
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //总价钱
            dynamic_roomNumber: [],
            mayCount: '2',
          }
          this.preBillParam.houseTypeInfoList.push(houseTypeValue)
          console.log(this.preBillParam.houseTypeInfoList,'this.preBillParam.houseTypeInfoList')
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
            if(this.preBillParam.houseTypeInfoList.length>1){
            if(this.preBillParam.houseTypeInfoList.length ===2){
                this.showDeleteButton = false
            }
            this.preBillParam.houseTypeInfoList.splice(index, 1)
            }else{
            this.showDeleteButton = false
            return
            }
        },
        //关闭tag
        handleClose(item,tag) {
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
        },
        //单=》右边全选房号dialogtabel 并控制不可选房间号
        handleselectAll(selection){
          console.log('selection1',selection)
          this.multipleSelection = selection
          // if(this.multipleSelection.length>1){
          //   this.$message.warning('只能选一间房间进行换房!')
          //   return false
          //   // let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引
          //   // this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
          // }
          // if(this.can_live_number > this.pre_live_number){
          //   if(selection.length > this.pre_live_number){
          //     let indexNumber = selection.length - this.pre_live_number
          //     selection.splice(this.pre_live_number,indexNumber)//截取最大可选数的房间从数组可选数最大长度开始截取
          //     this.multipleSelection = selection //截取后的值
          //     // localStorage.setItem('selection',JSON.stringify(this.multipleSelection));
          //   }
          // }
        },
        changeNo(){
          this.switchNumberDialog = true;
          this.getTagByRoom()
          this.getLiveRoom(this.preBillLinkParam.room_type_name)
        },
        //封装查看微信二维码或者扫码枪扫描支付是否成功
        check_paid(url,payment_id) {
          console.log('url////////////////////',url)
          console.log('payment_id',payment_id)
          let that = this;
          clearInterval(that.timer_r);
          clearInterval(that.timer_src);
          that.$axios({
            // url: "http://47.98.113.173:9503/v1/payment/weixin/check_paid",
            url:url+payment_id+"/",
            method: "get",
          })
            .then(res => {
              console.log(res);
              if (res.data.data.pay_status === 0) {
                console.log(res);
                that.dialog_img = false;
                that.dialog_succeed = true;//成功或者失败的页面
                that.ihatetheqrcode = true;
                clearInterval(that.timer_r);
                clearInterval(that.timer_src);
                that.timer=0;
                that. pay_ament_particulars(that.major_account_id);//刷新付款
              }
              else {
                if (that.img_src) {
                  that.timing_wx(url,payment_id);
                  if (that.timer >= 60) {
                    clearInterval(that.timer_r);
                    clearInterval(that.timer_src);
                    that.timer=0;
                    if (res.data.data.pay_status === 0) {
                      that.dialog_img = false;
                      that.dialog_succeed = true;//成功或者失败的页面
                      that.ihatetheqrcode = true;
                      that. pay_ament_particulars(that.major_account_id);//刷新付款
                    } else {
                      that.dialog_img = false;
                      that.dialog_succeed = true;//成功或者失败的页面
                      that.ihatetheqrcode = false;
                    }
                    return;
                  }
                } else {
                  that.timing(url,payment_id);
                  if (that.timer >= 6) {
                    clearInterval(that.timer_r);
                    clearInterval(that.timer_src);
                    that.timer=0;
                    if (res.data.data.pay_status === 0) {
                      that.dialog_img = false;
                      that.dialog_succeed = true;//成功或者失败的页面
                      that.ihatetheqrcode = true;
                    } else {
                      that.dialog_img = false;
                      that.dialog_succeed = true;//成功或者失败的页面
                      that.ihatetheqrcode = false;
                    }
                    return;

                  }
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装微信二维码后的定时器
        timing_wx(url,payment_id) {
          let that = this;
          // that.timer=0;
          that.timer_src = setInterval(function ()   //开启循环：
          {
            that.timer++;
            console.log(that.timer++);
            that.check_paid(url,payment_id);
            if (that.timer >= 60) {
              clearInterval(that.timer_src);
              console.log(that.timer);
              return;
              //判断res
            }
          }, 2000);
        },
        //封装扫描二维码后触发的定时器
        timing(url,payment_id){
          let that = this;
          // that.timer=0;
          that.timer_src=setInterval(function()   //开启循环：
          {
            that.timer++;
            console.log(that.timer++);
            that.check_paid(url,payment_id);
            if(that.timer >=60){
              clearInterval(that.timer_src);
              console.log(that.timer);
              return;
              //判断res

            }
          },2000);
        },
        /** 成功页面或者失败页面的确定按钮*/
        succeed_failed(){
          let that = this;
          if(that.ihatetheqrcode===true){
            that.scan_code = "1";
            that.dialog_succeed=false;//成功或者失败的页面
            that.dialog_alipay = false;//扫码支付的页面
            that.dialog_img = false
            that.preview_enterBillDialog = false //入预收关闭 另加add
            that.jieAccountDialog = false
            // clearInterval(that.timer_src); //最后加的<========================================
            // that.fu_money();//付钱的确定
            that.payCharge()//付钱的确定 <==== 钱上的扣了然后==>账务上的调用

          }else {
            if(that.img_src!=="" ){
              that.dialog_succeed=false;//成功或者失败的页面
              that.dialog_alipay = false;//扫码支付的页面
              that.dialog_img=false;
              that.jieAccountDialog = false
            }else {
              // that.dialog_succeed=false;//成功或者失败的页面
              // that.dialog_alipay = true;//扫码支付的页面
              // that.pay_amount_money_code="";
              // util.hintInfo(this,'warning', '扫码付钱失败，请重新扫码！');
              if(that.qr_w){
                that.dialog_succeed=false;//成功或者失败的页面
                that.dialog_img=false;
                that.preview_enterBillDialog = true
                that.jieAccountDialog = false
                that.pay_amount_money_code="";
                util.hintInfo(this,"warning", "扫码付钱失败，请重新扫码")
              }else {
                that.dialog_succeed=false;//成功或者失败的页面
                that.dialog_alipay = false;//扫码支付的页面
                that.preview_enterBillDialog = true
                that.pay_amount_money_code="";
                that.jieAccountDialog = false
                util.hintInfo(this,"warning", "扫码付钱失败，请重新扫码")
              }
            }

          }
        },
        //获取最终房间号
        getLiveRoom(param){
          let that = this
          let url= that.api.api_newPrice_9114 + '/v1/' + `room/room_status/can_live_room_list/`
          console.log('房间类型',this.preBillLinkParam)
          let scopeParam = {
            room_type: param,
            start_time: this.preBillLinkParam.arr_time,
            end_time: moment(this.preBillLinkParam.leave_time).format('YYYY-MM-DD 14:00:00')
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let array
            array = res.data.data.data
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
        //获取房间号
        getCanLiveRoom(){
          let that = this
          // that.getRoomType()
          // let url= that.api.api_newPrice_9114 + '/v1/' + `room/room_status/can_live_room_list/`
          // console.log('房间类型',this.preBillLinkParam)
          // let scopeParam = {
          //   // room_type: param,
          //   start_time: this.preBillLinkParam.arr_time,
          //   end_time: moment(this.preBillLinkParam.leave_time).format('YYYY-MM-DD 14:00:00')
          // }
          // that.$axios.post(url,scopeParam).then(res=>{
          //   let array
          //   array = res.data.data.data
          //     //组装带标签的数组
          //     for(var item of array){
          //       for(var itemm of that.roomTagList){
          //         if(item.room_no == itemm.room_no){
          //           item.tagName = itemm.feature_name
          //         }
          //       }
          //     }
          //     console.log('1dasdsroomTypeList',this.roomTypeList)
          //     that.roomNo_data_list = array  //选房号tabel数组
          // }).catch(error=>{

          // })
        },
        //得到房间所对应的标签
        getTagByRoom(){
          console.log('enter tag')
          let that = this
          let url =  that.api.api_room_8091+ '/v1/' + `room/get_roomfeatures_list_tree/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomTagList = res.data.data
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        /**
         * 付款支付方式接口
         */
        getPayMode(){
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_mode/info_list?page_size=999`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payModeList = res.data.data.list
            // this.payModeList.push({
            //   id: 0,
            //   name: '现金'
            // })
          }).catch(error=>{
          })
        },
        //入账代码
        /**
         * 这里要判断 link_ur,link_data 是否为空
         */
        getIncomingAccount(){
          let that = this
          that.incomingAccoutList = [] //防止数据污染
          let parent_id = that.previewEnterBill.payReasonValue
          console.log('id',that.previewEnterBill.payReasonValue)
          if(!parent_id){
            this.$message.warning('请先选择付款方式!')
            return
          }
          // let url =  that.api.api_9022_9519+ '/v1/' +  'finance/incoming_account_code/info_list'
          let url =  that.api.api_newPrice_9114 + '/v1/' +  'system/settings/get_code_pay_for_list/?parent_id=' + parent_id + '&page_size=300'
          that.$axios.get(url).then(res=>{
              console.log('res.data',res.data.data.results)
              that.incomingAccoutList = res.data.data.results
            }).catch(error=>{
          })
        },
        //以hotel_id获取支付方式的接口
        get_list_by_hotel(){
          let that = this
          // let url =  that.api.api_9022_9519+ '/v1/' + 'finance/pay_mode/get_list_by_hotel?page_size=999'
          let url =  that.api.api_9022_9519+ '/v1/' + 'finance/pay_mode/info_list?page_size=999'
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              console.log('res.data支付',res.data.data.list)
              that.payModelist_other = res.data.data.list
            }).catch(error=>{
          })
        },
        /**
         * 收银点list
         */
        getCashRegister(){
          let that = this
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/cash_register/info_list`
          let url =  that.api.api_newPrice_9114 + '/v1/' +  'accounts/get_cash_register_list/'

          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.cashRegisterList = res.data.data.results
          }).catch(error=>{
          })
        },
        /**
         * 调账原因
         */
        getTiaoReason(){
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/arrange_account_reason/info_list`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.tiaoReasonList = res.data.data.list
          }).catch(error=>{
          })
        },
        /**
         * 付款原因接口
         */
        getPayReason(){
          let that = this
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/code_pay_for/info_list?page_size=999`
          let url
          if(this.preview_enter_flag === 0){
            //钱
            url= that.api.api_newPrice_9114+ '/v1/' + `system/settings/get_code_pay_for_list/?code_type=2&page_size=300&parent_id=`
          }else{
            url= that.api.api_newPrice_9114+ '/v1/' + `system/settings/get_code_pay_for_list/?code_type=1&page_size=300&parent_id=`
          }
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payInfoList = res.data.data.results
          }).catch(error=>{
          })
        },
        //人员信息列表
        getEmployeeInfo(){
            let that = this
            let url = that.api.api_9022_9519+ '/v1/' + `common/employee/info_list?page_size=999`
            that.$axios.get(url).then(res=>{
                that.personOptions = res.data.data.list
                // that.reportData = res.data.data
                // console.log('that.reportData',this.reportData)
            })
        },
        /**
          @desc 获取能获取的房型 区别一下
        */
        getOnlyRoomType(){
          let that = this
          let url =  that.api.api_newPrice_9114 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
          let start 
          let end
          if(this.rowParam.arr_time && this.rowParam.leave_time){
            start = moment(this.rowParam.arr_time).format('YYYY-MM-DD')
            end = moment(this.rowParam.leave_time).format('YYYY-MM-DD')
          }
          that.$axios({
            url : url,
            method : 'get',
            params:{
              biz_date__gte: start,
              biz_date__lt:  end
            },
          }).then(res=>{
            if(res.data.message === 'success'){
              this.roomOnlyTypeList = res.data.data.results
            }else{
                that.$message.error('获取房型失败!')
            }
          }).catch(error=>{
          })
        },
        //获取房型数据
        getRoomType(){
          let that = this
          let url = that.api.api_newPrice_9114+ '/v1/' + `room/room_status/get_room_type_list/`
          that.$axios.get(url).then(res=>{
            if(res.data.message == 'success'){
              that.roomTypeList = res.data.data.results
              this.roomTypeList.forEach(item=>{
                if(item.descript === this.preBillLinkParam.room_type){
                  this.preBillLinkParam.room_type_name = item.code
                }
              })
              console.log('最终that.roomTypeList',that.roomTypeList)
              console.log('',that.roomTypeList)
              // that.getLiveRoom()//获取房间号
            }else{
              that.message.error('获取数据失败，请重试')
            }
          }).catch((error)=>{
          })
        },
        //市场码来源码
        getMarketSrc(param){
          let that = this
          that.marketSrcList = []
          let url =  that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_list/'
          let params = {}
          //src 代表市场码
          if(param == 'market'){
           params={
            parent_code: 'market_code'
           }
          }else if(param == 'src'){
            if(this.preBillLinkParam.code_market){
                params={
                  parent_code: 'src_code',
                  code_category: that.preBillLinkParam.code_market //要改
                  // code_category: 6977
              }
            }else{
              return false
            }
          }
          that.$axios({
            method : 'get',
                url : url,
                params: params
            }).then(res=>{
              if(param == 'src'){
                that.marketSrcList = res.data.data.results
                try {
                  this.enter_src = this.marketSrcList.filter(item=> item.code == this.preBillLinkParam.code_src)[0].descript
                } catch (error) {
                  console.log('error')                
                }
              }else{
                  that.marketList = res.data.data.results
                  this.market_src = this.marketList.filter(item=> item.code == this.preBillLinkParam.code_market)[0].descript

              }
              console.log('that.marketSrcList',that.marketSrcList)
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
  /**换房升降级 */
  .roomClass{
    margin-top: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-input{
      padding-left: 10px;
      padding-right: 20px;
    }
    .el-select{
      padding-right: 10px;
    }
  }
  .roomClass_third{
    width: 100%;
    margin-top: 12px;
  }
  .roomClass_third.width{
    width: 14vw;
  }
  .activeColor{
    background-color: #FFF5F5F5;
    // opacity: 0.6;
  }
  .refundClass{
    display: inline-block;
    position: absolute;
    right: 32px;
    z-index: 1;
    color: #F56C6C;
  }
  .roomfeeClass{
    height: 200px;
    border: 1px solid #dedede;
    .fee_ul li{
      margin-top: 20px;
      padding-left: 30px;
      line-height: 30px;
      position: relative;
    }
  }
  //全选与单选框
  .input-checkbox{
    display: inline-block;
    width: 20px;
    height: 15px;
    background-color: #F2F6FC;
    border-color: #DCDFE6;
    margin-top: 5px;
  }
  .input-checkbox,.more_class{
    margin-top:10px
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
  //预授权class
  .authorizationClass{
    height: 550px;
    display: flex;
    justify-content: space-between;
    .div1{
      width: 80%;
      .div1_child{
        height: 170px;
        display: flex;
        // justify-content: space-between;
         justify-content: flex-start;
        flex-direction: row;
        .div1_child_1 div{
          width: 200px;
          height: 170px;
          border: 1px solid #CCCCCC;
        }
        .div1_child_2 div{
          width: 200px;
          height: 170px;
          border: 1px solid #CCCCCC;
        }
        .div1_child_3 div{
          width: 360px;
          height: 170px;
          border: 1px solid #CCCCCC;
        }
      }
    }
    .div2{
      margin-top: 10px;
      line-height: 35px;
      text-align: center;
      width: 20%;
    }
  }
  .inline-div{
    display: flex;
    justify-content: space-between;
    color: #969696;
    margin-top: 40px
  }
  .inline-div span{
    margin-left: 5px;
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
  //聚合支付
  .enter_pay_ul{
    margin: 0 auto;
    margin-top: 100px;
    width: 100%;
    margin-left: 30%;
    li{
      margin-top: 20px;
      span{
        margin-left: 5px;
        margin-right: 10px;
      }
    }
  }
  // .el-pagination.is-background .el-pager li:not(.disabled).active {
  //   background-color: #68819E;
  //   color: #fff;
  // }
</style>
<style scoped>
  .transfer_class>>> .el-transfer-panel{
    width: 26vw;
    /* height: 300px; */
    margin-left: 3vw;
  }
  .transfer_class>>> .el-checkbox__label{
    margin-top: 12px;
  }
  .transfer_class>>> .el-transfer-panel{
    height: 360px;
  }
  /* checkbox-group */
  .transfer_class>>> .el-checkbox-group.el-transfer-panel__list{
    height: 206px;
  }
  .buttonStyle>>> .el-button{
      margin-left: 5px;
      width: 80px;
      background-color: #8895A8
   }
   .button-style_2>>> .el-button{
     width: 80px;
     background-color: #8895A8
   }
   .houseTypeClass_authorization>>>.el-dialog__header{
      background-color: #598FBC;
   }
  .houseTypeClass_authorization>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass_authorization>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .houseTypeClass_authorization>>> .el-dialog__body{
    padding: 0px 0px;
  }
   .houseTypeClass>>> .el-dialog__header{
    background-color: #8895A8;
   }
   .houseTypeClass.roomfee>>> .el-dialog__header{
    background-color: #27A9E3;
   }
   .houseTypeClass>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .houseTypeClass>>> .el-dialog__footer{
    background-color: #F5F5F5;
    line-height: 35px;
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
  .left-nav>>>.el-checkbox__label{
    width: 18vw;
    z-index: -1;
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
<style>
  /*控制表格行中的颜色*/
  .el-table .warning-row {
    background: #E6E6FA;
  }
  .el-table .success-row {
    background: #FFFFFF;
  }
</style>


