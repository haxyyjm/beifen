<template>
  <div>
    <el-dialog :close-on-click-modal = 'false' width="80%" class="previewInfo-dialog deletePadding_Class" :title="orderTitle"  :visible.sync="linkHouseFornVisible"
      @close="$emit('update:show', false);flushByLink();refundHouse = true;"
      :show="show">
      <el-row style="background-color: #fff; height: 450px">
        <el-col :span="6" style="background-color: #FFF; height: 100%">
            <el-row >
            <div style="margin-top: 10px;margin-bottom: 10px">
              <!-- <el-checkbox style="margin-left: 15px; float: left; height: 50px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                预订共<span>4</span>间
              </el-checkbox> -->
               <!-- <input  type='checkbox' class='input-checkbox more_class'  v-model='flag_checked' @click='selectCheckedAll'> -->
               详情
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
              <ul v-for="(item,index) of endPayListParam.room_list" :key="index">
                <li @click="getInfoByImportant(item,index)" :class="{activeColor: isActiveColor === index ? true : false}"  style="display: flex;justify-content:space-between; align-items: center; cursor: pointer">
                  <!-- <input type='checkbox'  name='checkboxinput' class='input-checkbox' v-model='checkboxList' :value="item[0]"> -->
                  <el-tag :disable-transitions="false">
                    <span style="color: #4488E9">{{item.room_num}}</span>
                  </el-tag>
                  <span style="color: #7AAAEF">{{item.room_type}}</span>
                  <div style="margin-top: 5px;">
                     <el-button v-if="item.master_status == 1 || item.master_status == 2 || item.master_status == 3" size="mini" circle type="danger">
                      <span>退</span>
                    </el-button>
                    <el-button v-else size="mini" circle type="success">
                      <span>住</span>
                    </el-button>
                    <!-- <el-button  size="mini" circle type="success">
                      <span v-if="item.account_status == 0">常</span>
                      <span v-if="item.account_status == 1">结</span>
                      <span v-if="item.account_status == 2">挂</span>
                      <span v-if="item.account_status == 3">锁</span>
                      <span v-if="item.account_status == 4">异</span>
                    </el-button> -->
                    <el-button v-if="item.account_status == 0" size="mini" circle type="success">
                      <span>常</span>
                    </el-button>
                     <el-button v-if="item.account_status == 1" size="mini" circle type="danger">
                      <span>结</span>
                    </el-button>
                     <el-button v-if="item.account_status == 2" size="mini" circle type="warning">
                      <span>挂</span>
                    </el-button>
                     <el-button v-if="item.account_status == 3" size="mini" circle type="success">
                      <span>锁</span>
                    </el-button>
                     <el-button v-if="item.account_status == 4" size="mini" circle type="success">
                      <span>异</span>
                    </el-button>
                    <el-button v-if="endPayListParam.room_list.length>1 && item.is_main" size="mini" circle type="warning">主</el-button>
                    <el-button v-if="endPayListParam.room_list.length>1 && !item.is_main" size="mini" circle type="success">联</el-button>
                  </div>
                </li>
              </ul>
          </el-row>
        </el-col>
        <el-col :span="17">
        <!--上传公安-->
        <police-dialog :show.sync= policeComponentDialog :policeParam='policeParam' v-on:listenToPolice="getPrebillParam"></police-dialog>
        <!--上传照片-->
        <picture-dialog :show.sync= pictureComponentDialog :pictureParam='pictureParam' v-on:listenToPicture="getPictureParam"></picture-dialog>
        <!--主体内容-->
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
                </el-row>
                <!--转全天房-->
                <div  style="display: flex">
                  <div style="width: 55%;height:140px;display: flex;align-items:center;flex-wrap: wrap">
                    <!-- <div>订单状态：<span style="color: #9FBDF2 ">入住</span></div> -->
                    <div class="panduan">市场码:<span>{{market_src}}</span></div>
                    <div class="panduan">来源码:
                      {{enter_src}}
                    </div>
                    <!-- <div>房型：<span>{{preBillLinkParam.room_type}}</span></div> -->
                    <div class="panduan">
                      当日价:<el-input  size="mini" style="color: #f3565d;width: 70px;"  @blur="span_input_flag = false;update_price()" v-model="current_rate_price"></el-input>
                    </div>
                    <!-- <div v-show="!span_input_flag">
                      当日价:
                      <span style="color: #FC6784"  @click="changeFlag()">¥{{current_rate_price}}元 </span> 
                    </div> -->
                    <div class="panduan">
                      <span>房价码:<span>{{preBillLinkParam.rate_code}}</span></span>
                    </div>
                    <div class="panduan">
                      <span>入住日期:<span>{{preBillLinkParam.arr_time}}</span></span>
                    </div>
                    <div class="panduan">
                      <span>预计离店：<span>{{preBillLinkParam.leave_time}}</span></span>
                    </div>
                  </div>
                  <div style="width: 20%;height:140px;display: flex;padding-top: 1vw;flex-wrap: wrap;margin-right: 10px">
                    <div>
                      <span style="font-weight: 600">备注:</span>
                    </div>
                    <div style="flex: 1">
                      <el-input placeholder="暂无"  @blur="handleRemark" resize="none" v-model="preBillLinkParam.remark_id_list" type="textarea" :rows="4"></el-input>
                    </div>
                  </div>
                  <div style="width: 20%;height:140px;padding-top: 1vw;display: flex;flex-wrap: wrap;flex-direction: row;">
                    <div>
                      <span style="font-weight: 600">提醒:</span>
                    </div>
                    <div style="flex: 1">
                      <el-input @blur="updateAccountRemark" resize="none" v-model="endPayListParam.remark" type="textarea" :rows="4"></el-input>
                    </div>
                  </div>
                </div>
                <el-row style="height: 20px"></el-row>
                <div>
                  <el-table height="180" :data="preBillLinkParam.master_guest" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <!-- <el-table-column prop="member" label="会员"></el-table-column> -->
                    <el-table-column label="性别">
                       <template slot-scope="scope">
                        <span v-if="scope.row.sex==='0'">男</span>
                        <span v-else>女</span>
                      </template>
                    </el-table-column>
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
              <el-table size="mini" height="300" ref="table" :row-class-name="tableRowClassName" @selection-change="handleChargeChange" :data="tableData" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%; margin-top: 20px">
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
                <!-- <el-table-column prop="desc" label="备注"></el-table-column> -->
                <!-- <el-table-column prop="create_time" width="150" label="时间"></el-table-column> -->
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
                <!-- <el-table-column prop="desc" label="备注"></el-table-column> -->
                <el-table-column prop="create_time" width="150" label="时间"></el-table-column>
                 <!-- <el-table-column prop="desc" label="备注">
                </el-table-column> -->
                <el-table-column fixed="right" width="160" label="操作">
                  <template slot-scope="scope">
                    <el-button :disabled="tiaoDisable(scope.row)" type="text" @click="handleTiaoAccount(scope.row)" size="small">调账</el-button>
                    <el-button :disabled="tiaoDisable(scope.row)" type="text" @click="handleFenAccount(scope.row)" size="small">分账</el-button>
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
                    <!-- <el-button type="primary" @click="tiaoAccountDialog = true;flushTiaoData()">调账</el-button>  -->
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
              <!-- <el-row style="background-color: #F4F4F4; padding: 10px;5px;10px;5px; border: 1px solid #E9E9E9">
                <div style="float: left;">
                </div>
                <el-button size="mini" type="info" :disabled="banDisable()" @click="remarkDialog = true;addAndUpdate = true;remarkTitle = '新增备注'" style="float: right; background-color: #8895A8; color: #fff">+新增备注</el-button>
              </el-row>
              <el-table height="300" :data="remarkList" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%">
                <el-table-column prop="content" label="备注内容"></el-table-column>
                  <el-table-column prop="modify_time" label="备注日期"></el-table-column>
                  <el-table-column prop="modify_user.user_name" label="操作人"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button :disabled="banDisable()" @click="remarkDialog = true; addAndUpdate = false; handleRemarkInfo(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button :disabled="banDisable()" @click="deleteRemarkInfo(scope.row)" type="text" size="small">注销</el-button>
                    </template>
                  </el-table-column>
              </el-table> -->
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
             <el-tab-pane label="房卡" name="7">
                <el-table height="300" :data="cardList" :header-cell-style="{background:'#373d41', color: '#FFFFFF'}" style="width: 100%">
                <el-table-column prop="room_no" label="房间号"></el-table-column>
                  <el-table-column prop="lock_no" label="门锁号"></el-table-column>
                  <el-table-column prop="start_time" label="开始时间"></el-table-column>
                  <el-table-column prop="end_time" label="结束时间"></el-table-column>
                  <el-table-column prop="operate_type" label="操作类型"></el-table-column>
                  <el-table-column prop="create_user_name" label="操作人"></el-table-column>
              </el-table>
             </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <!--最后一行样式-->
      <div slot="footer" class="dialog-footer">
        <div style="float: left">
          <el-button :disabled="banDisable_2()" type="info" size="small" @click="linkRoomDialog = true; getLinkRoomData()" style="background-color: #00a3df;border-color: #00a3df">编辑联房</el-button>
          <!-- <el-button type="info" size="small" style="background-color: #CCCCCC; border-color: #CCCCCC; ">欠离</el-button> -->
          <!-- <el-button :disabled="banDisable()" type="danger" size="small" :loading="!refundHouse"  @click="selectPerson();">
            <span v-if="refundHouse == true">退房</span>
            <span v-else>查房</span>
          </el-button> -->
          <el-button type="danger" @click="pingAccount()" :disabled="banDisable_2()" size="small">退房</el-button>
        </div>
        <el-button type="info"  @click="handleLittleBill()" size="small">小票</el-button>
        <el-button type="info"  @click="flushAccount_all()" size="small">账务</el-button>
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
      <!--小票-->
      <el-dialog class="houseTypeClass" width="400px"  title="小票" :visible.sync="little_billDialog" :modal="true">
        <div id="littleBill" ref="littleBill_ref" style="width: 360px;">
          <ul class="little_bill">
            <li>{{printParam.hotel_name}}</li>
            <li>账目明细</li>
            <li><span style="float: left">机器编号:{{printParam.machine_id}}</span><span>打印:</span> {{printParam.date}}</li>
            <li>
         	    <div class="little_bill_header">
                <div><span>姓名</span>{{printParam.master_guest_name}}</div>
                <div><span>账号</span>{{printParam.account_id}}</div>
                <div><span>到达日期</span>{{printParam.arr_time}}</div>
                <div><span>离店日期</span>{{printParam.leave_time}}</div>
                <div><span>房号</span>{{printParam.room_num}}</div>
                <!-- <div><span>收银点</span>0989</div> -->
              </div>
            </li>
            <li class="little_bill_title">
              <div>项目</div>
              <div>消费</div>
              <div>付款</div>
            </li>
            <li v-for="item of printParam.account" :key="item.id" class="little_bill_title">
              <span>{{item.desc}}</span>
              <span>{{item.code_type == 1 ? item.amount : 0.00}}</span>
              <span>{{item.code_type == 2 ? item.amount : 0.00}}</span>
            </li>
             <li class="little_bill_title">
              <span>总额</span>
              <span>{{consumeCount}}</span>
              <span>{{payCount}}</span>
            </li>
            <li class="little_bill_title">
              <span>金额</span>
              <span></span>
              <span>{{consumeCount + payCount}}</span>
            </li>
            <li class="little_sign">
              <span>宾客签字</span>
            </li>
            <li class="little_sign_en">
              <span>SIGNATURE</span>
              <div></div>
            </li>
            <li class="little_end">
              <div class="little_end_content">
                <span>地址:{{printParam.address1}}</span>
                <span>ADD: {{printParam.address2}}</span>
                <span>电话:{{printParam.office_tel}}</span>
                <span>TEL:{{printParam.office_tel}}</span>
              </div>
              <div style="flex:1">
                <!-- <img id="print_img" :src="printParam.logo" style="float:right;width: 80px"/> -->
              </div>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handlePrint" v-print="'#littleBill'" type="primary">打印</el-button>
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
            <el-select @focus="getRoomNo()" style="width: 12vw" size="mini" v-model="roomParam.newNumber">
              <el-option
                v-for="item in roomNoList"
                :key="item.id"
                :label="item.room_no"
                :value="item.room_no">
              </el-option>
            </el-select>
          </div>
          <el-row style="padding-left: 20px" class="roomClass_third">
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
                      <el-input size="mini" :disabled="sameDisabled(item)" v-model="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                      <el-select size="mini" :disabled="sameDisabled(item)" v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                        <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-select size="mini" :disabled="sameDisabled(item)" v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                        <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                      </el-select>
                      <el-input size="mini" :disabled="sameDisabled(item)" maxlength="18" v-model="item.id_no "  @blur="validateId_no(item,'输入')" placeholder="证件号码"  style="width: 12vw"></el-input>
                      <el-input size="mini" :disabled="sameDisabled(item)"  v-model="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                  </div>
                  <div style="display: inline-block">
                    <el-input size="mini" :disabled="sameDisabled(item)"  v-model="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 64px; margin-top: 10px"></el-input>
                    <el-button type="danger" size="mini" @click="handleNewPolice(item,index)">上传公安</el-button>
                    <el-button type="danger" size="mini" @click="handlePicture(item,index)">上传照片</el-button>
                  </div>
                  <!-- 预定房间入住人多选 +-->
                  <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                  <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                  <img :disabled="sameDisabled(item)" style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(item,index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="cardImport()">证件导入</el-button>
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
      <el-dialog class="houseTypeClass" @close="refundFlag = false" title="退款" :visible.sync="refunAccountDialog" :modal="false">
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
            <!-- <el-form-item label="退款方式:">
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
            </el-form-item> -->
            <el-form-item>
               <span style="margin-right: 24px">备注:</span>
              <el-input type="textarea" v-model.trim="previewEnterBill.remark" size="mini" :rows="2" style="width: 14vw; margin-top: 10px;margin-left:10px"></el-input>
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
          <el-button style="float: right" type="primary">确定</el-button>
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
      <el-dialog class="houseTypeClass" title="分账" :visible.sync="fenAccountDialog">
         <ul class="open_ticket">
          <li>
            <span>可分账金额：</span>
            <p
              style="width: 300px;height: 24px;border:1px solid #DCDFE6;border-radius: 4px;display: inline-block;line-height: 24px;padding-left: 10px;color: red">
              {{need_pay}}元</p>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>分账方式：</span>
            <el-radio v-model="splitAccountParam" label="0">数量</el-radio>
            <el-radio v-model="splitAccountParam" label="1">金额</el-radio>
          </li>

          <li v-if="splitAccountParam === '1'">
            <span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>拆分金额：</span>
            <el-input placeholder="请输入金额" v-model="splitAccountParam_split_amount" clearable style="width: 300px;"
                      size="mini"></el-input>
          </li>
          <li v-if="splitAccountParam === '0'">
            <span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>拆分数量：</span>
            <el-input placeholder="拆分数量" v-model="splitAccountParam_num" clearable style="width: 300px;"
                      size="mini"></el-input>
          </li>

          <li>
            <span style="vertical-align: top">描述：</span>
            <el-input v-model="comment"  type="textarea"
                      :rows="2"  clearable placeholder="请输入内容" style="width: 300px;" size="mini"></el-input>
          </li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="fenAccountDialog = false" size="mini">取消</el-button>
          <el-button @click="splitAccount()" type="primary" size="mini">确定</el-button>
        </div>
      </el-dialog>
      <!--结账-->
      <el-dialog @close="extraInformation=[];previewEnterBill.pre_author_id = '';jie_authorization_flag = false;jie_flag = false " class="houseTypeClass" :title="jieAccountTitle" :visible.sync="jieAccountDialog">
        <div style="height: 400px; overflow: auto">
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
              <span style="color: red">{{Math.abs(moneydesc.balance)}}</span>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance < 0" label="应收金额:">
              <span style="color: red">{{Math.abs(moneydesc.balance)}}</span>
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
              <el-input size="mini" v-model="previewEnterBill.remark" resize="none" type="textarea" :rows="5" style="width: 85%"></el-input>
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
              <el-date-picker  :picker-options="rangeDate" size="mini" type="date" v-model="after_leave_time_2"></el-date-picker>
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
          :close-on-click-modal = 'false'
          @close="preview_enterBillDialog = false"
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
        <el-dialog class="houseTypeClass" title="调账" :visible.sync="tiaoAccountDialog" :modal="false">
            <ul class="open_ticket">
              <li>
                <span>可调账金额：</span>
                <div style="width: 300px;height: 28px;line-height: 28px;border-bottom:1px solid rgb(220, 223, 230) ;display: inline-block;color: red">￥{{need_pay_data}}</div>
              </li>
              <li>
              <span style="vertical-align: top">调账原因：</span>
                <el-select v-model="reason_id" placeholder="请选择调账原因" size="mini" style="width: 300px;">
                  <el-option
                    v-for="item in adjustment_list"
                    :key="item.value"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>金额：</span>
                <el-input v-model="arranged_amount" clearable placeholder="请输入金额" style="width: 300px;" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                          size="mini"></el-input>
              </li>
              <li  >
                <span >收银点：</span>
                <el-select v-model="cashier_id"  @focus="getCashRegister" clearable  placeholder="请选择业务种类" size="mini" style="width: 300px;">
                  <el-option
                    v-for="item in cashRegisterList"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span style="vertical-align: top">备注：</span>
                <textarea cols="30" rows="8" v-model="invoice_desc"
                          style="width: 300px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                          size="mini"></textarea>
              </li>
            </ul>
            <div slot="footer" class="dialog-footer">
              <el-button @click="tiaoAccountDialog = false" size="mini">取消</el-button>
              <el-button @click="regulation()" type="primary" size="mini">确定</el-button>
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
            <li>
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
        <!--zpj拉过来的账务-->
        <el-dialog width="70%" class="houseTypeClass" title="账务" :visible.sync="accountDialog" :modal="false">
          <el-tabs style="height: 500px;overflow: auto" v-model="activeName2" type="card" @tab-click="handleTabClick" size="mini">
            <el-tab-pane label="冲调账记录" name="1">
              <el-table
                  :data="account_all_list" :cell-style="{textAlign:'center'}" :header-cell-style="{background:'#373d41',color:'#FFFFFF',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column prop="biz_date" label="营业日期"></el-table-column>
                  <el-table-column prop="arranged_amount" label="冲调金额（可正可负）"></el-table-column>
                  <el-table-column prop="balance_after_arranged" label="调账后金额"></el-table-column>
                  <el-table-column prop="arrange_flag_desc" label="操作类型"></el-table-column>
                  <el-table-column prop="reason" label="冲调原因"></el-table-column>
                  <el-table-column prop="modify_user" label="操作人">
                  </el-table-column>
                  <el-table-column prop="modify_time" width="150" label="操作时间">
                  </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination :page-size="pagination_all.pageSize" @current-change="currentChange_account"
                    @size-change='sizeChange_account'
                    :current-page="pagination_all.pageNumber"
                    :page-sizes="pagination_all.pageSizes"
                    :total="pagination_all.totalRows"
                    :layout="pagination_all.layout"
                    >
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="分账记录" name="2">
                <el-table
                  :data="account_all_list" :cell-style="{textAlign:'center'}" :header-cell-style="{background:'#373d41',color:'#FFFFFF',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column prop="biz_date" label="营业日期"></el-table-column>
                  <el-table-column prop="account_type" label="账户种类">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_type === 1">AR账户</span>
                      <span v-else>正常账户</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="split_method" label="分账方法">
                    <template slot-scope="scope">
                      <span v-if="scope.row.split_method===0">金额分账</span>
                      <span v-else>数量分账</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="split_info" label="分账金额"></el-table-column>
                  <el-table-column prop="modify_time" label="操作时间"></el-table-column>
                  <el-table-column prop="modify_user" label="操作用户"></el-table-column>
                  <el-table-column prop="desc" label="说明"></el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination :page-size="pagination_all.pageSize" @current-change="currentChange_account"
                    @size-change='sizeChange_account'
                    :current-page="pagination_all.pageNumber"
                    :page-sizes="pagination_all.pageSizes"
                    :total="pagination_all.totalRows"
                    :layout="pagination_all.layout"
                    >
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="转账记录" name="3">
              <el-table
                :data="account_all_list" :cell-style="{textAlign:'center'}" :header-cell-style="{background:'#373d41',color:'#FFFFFF',textAlign:'center'}"
                size="mini"
                height="400"
                style="width: 100%;">
                <el-table-column prop="submit_biz_date" label="营业日期"></el-table-column>
                <el-table-column prop="submit_reason_id" label="转账原因"></el-table-column>
                <el-table-column prop="from_account.room_num" label="转出账户房间号"></el-table-column>
                <el-table-column prop="to_account.room_num" label="转入账户房间号"></el-table-column>
                <el-table-column prop="amount" label="转账金额"></el-table-column>
                <el-table-column width="130" label="转账类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.transfer_type=== 0">普通</span>
                    <span v-else>分账转账</span>
                  </template>
                </el-table-column>
                <el-table-column prop="create_user" label="操作人"></el-table-column>
                <el-table-column prop="create_time" width="150" label="操作时间"></el-table-column>
                <!-- <el-table-column prop="submit_cashier" width="150" label="收银点"></el-table-column> -->
                <el-table-column prop="desc" width="260" :show-overflow-tooltip="true" label="说明"></el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination :page-size="pagination_all.pageSize" @current-change="currentChange_account"
                  @size-change='sizeChange_account'
                  :current-page="pagination_all.pageNumber"
                  :page-sizes="pagination_all.pageSizes"
                  :total="pagination_all.totalRows"
                  :layout="pagination_all.layout"
                  >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="支付订单" name="4">
              <el-table
                :data="account_all_list" :cell-style="{textAlign:'center'}" :header-cell-style="{background:'#373d41',color:'#FFFFFF',textAlign:'center'}"
                size="mini"
                height="400"
                style="width: 100%;">
                <el-table-column prop="biz_date" label="营业日期"></el-table-column>
                <el-table-column prop="pay_amount" label="金额"></el-table-column>
                <el-table-column prop="usable_amount" label="可用金额"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="create_user" label="操作人"></el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination :page-size="pagination_all.pageSize" @current-change="currentChange_account"
                  @size-change='sizeChange_account'
                  :current-page="pagination_all.pageNumber"
                  :page-sizes="pagination_all.pageSizes"
                  :total="pagination_all.totalRows"
                  :layout="pagination_all.layout"
                  >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="结账记录" name="5">
              <el-table
                :data="account_all_list" :cell-style="{textAlign:'center'}" :header-cell-style="{background:'#373d41',color:'#FFFFFF',textAlign:'center'}"
                size="mini"
                height="400"
                style="width: 100%;">
                <el-table-column prop="biz_date" label="营业日期"></el-table-column>
                <el-table-column prop="pay_amount" label="金额"></el-table-column>
                <el-table-column prop="balance" label="余额"></el-table-column>
                <el-table-column prop="night_rent_sum" label="夜审房费"></el-table-column>
                <el-table-column prop="manual_rent_sum" label="手工房费"></el-table-column>
                <el-table-column prop="cash_sum" label="微信"></el-table-column>
                <el-table-column prop="wx_sum" label="微信"></el-table-column>
                <el-table-column prop="ali_sum" label="支付宝"></el-table-column>
                <el-table-column prop="create_user" label="操作人"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination :page-size="pagination_all.pageSize" @current-change="currentChange_account"
                  @size-change='sizeChange_account'
                  :current-page="pagination_all.pageNumber"
                  :page-sizes="pagination_all.pageSizes"
                  :total="pagination_all.totalRows"
                  :layout="pagination_all.layout"
                  >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="部分结账记录" name="6">
              <el-table
                :data="account_all_list" :cell-style="{textAlign:'center'}" :header-cell-style="{background:'#373d41',color:'#FFFFFF',textAlign:'center'}"
                size="mini"
                height="400"
                style="width: 100%;">
                <el-table-column prop="biz_date" label="营业日期"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="create_user" label="操作人"></el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination :page-size="pagination_all.pageSize" @current-change="currentChange_account"
                  @size-change='sizeChange_account'
                  :current-page="pagination_all.pageNumber"
                  :page-sizes="pagination_all.pageSizes"
                  :total="pagination_all.totalRows"
                  :layout="pagination_all.layout"
                  >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="accountDialog=false">关闭</el-button>
          </div>
        </el-dialog>
        <!-- 身份证信息 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="身份证信息" :visible.sync="cardInfoDialog" :modal="true">
          <ul class="cardInfoClass">
            <li>
              <img :src="police_img_src" alt="">
            </li>
            <li>姓名:<span>{{cardInfoParam.name}}</span></li>
            <li>性别:<span>{{cardInfoParam.sex === '0' ? '男' : '女'}}</span></li>
            <li>证件类型:<span>身份证</span></li>
            <li>卡号:<span>{{cardInfoParam.cardNo}}</span></li>
            <li>地址:<span>{{cardInfoParam.address}}</span></li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="confirmGuestInfo">确定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import * as media from './video.js'
import aDialog from './authorizationDialog'
import QRCode from 'qrcodejs2'
import util from '../../../common/util.js'
import transfer from '@/components/transfer/transfer'
import moment from 'moment'
import cDialog from './consumeDialog'
import policeDialog from './policeDialog'
import pictureDialog from './pictureDialog'
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
          value_price: {},
          rateAllPrice_list: [],//构造房价数组
          cancle_order: true,
          pay_order_id: '',
          update_date: null, //更新当日价传递的日期
          roomNoList: [],
          cloneMasterGuest: [],//克隆的深拷贝的入住人数组
          cloneMainId: null,
          cloneRightData: [],//联房右边的数组(旧数组)
          orderTitle: '',
          refundFlag: false,
          face_set: '',
          pictureComponentDialog: false,//子组件==>上传照片打开
          policeComponentDialog: false,//子组件==>公安dialog打开
          pictureParam: {},//上传照片的功能
          policeParam: {},//父组件的公安对象，下面对象的拷贝
          policeInfoParam:{},//上传公安的对象?
          /**证件导入的对象同住人 start*/
          cardInfoParam:{
            name: '',
            sex: '',
            cardType: '01',
            cardNo: '',
            address: '',
            birthday: '',
            nation: '',
          },
          /**同住人 end*/
          police_img_src: '',//身份证图片填充
          cardInfoDialog: false,
          imageUrl: '',//图片地址
          card_imgUrl: '',//身份证图片地址
          uploadUrl: 'https://oss.crowncrystalhotel.com/resource/live/upload',
          transfer_flag: false,
          consumeCount: 0,
          payCount: 0,
          printParam: {
          },
          little_billDialog: false,
          pagination_all: {
            totalRows: 0, //总条数
            pageSize: 5, //每页显示条数
            pageSizes: [5, 10, 15],
            pageNumber: 1,
            layout: "total, sizes, prev, pager, next, jumper"
          },
          account_all_list: [],
          api_data: '',//子账户的分页url
          cur_pages: 1,//分账上的默认页==>即账务上的页数
          pagesize: 10,
          total_count: 10,
          activeName2: '1',
          /**分账start */
          splitAccountParam:'0',
          split_account: '',
          need_pay: '',
          comment: '',
          biz_date_day: '',
          splitAccountParam_num: '',
          splitAccountParam_split_amount: '',
          fenAccountDialog: false,//分账
          /**分账end */
          /**调账start */
          adjustment_list: [],
          account_separate_id: '',
          separate_id: '',
          need_pay_data: '',
          reason_id: '',//原因
          arranged_amount: '',//金额
          invoice_desc: '',//备注
          cashier_id: '',//s收银点
          tiaoAccountDialog: false,//调账接口
          /**调账end */
          accountDialog: false,
          pay_refund_flag: 1,
          span_input_flag: false,
          error_pay_flag: true,
          circulation: null,
          cardList: [],
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
          img_src: '',
          pay_amount_money_code: '',
          dialog_succeed: false,
          dialog_img: false,
          ihatetheqrcode: true,
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
      'policeDialog': policeDialog,//上传公安
      'pictureDialog': pictureDialog,//上传照片
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
        this.span_input_flag = false//初始化
        this.endPayListParam.room_list = []
        console.log('parentInfoParam=====',this.parentInfoParam)
        if(this.parentInfoParam || this.parentInfoParam.openChildDialog ){
          // this.getRoomType()
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
            this.orderTitle = `入住单[${this.preBillLinkParam.order_no}]`
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
          this.getMarketSrc('src')//可能要改
          this.getMarketSrc('market')
          // this.getRateCode_price(this.preBillLinkParam)  //以后必须要的获取最新房价码
          this.getRateCode_price_self()
          // console.log('this.parentInfoParam.openChildDialog',this.parentInfoParam.openChildDialog)
          // if(this.parentInfoParam.openChildDialog === '续住'){
          //   console.log('xuzhu===============')
          //   this.continueLiveDialog = true
          // }
        }else{
          console.log('else')
        }
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
    },
    methods: {
      /**
       * 已经离店的就不能更改房价了
       */
      changeFlag(){
        // span_input_flag = true
        let todaty = moment().format('YYYY-MM-DD HH:mm:ss');
        if(this.preBillLinkParam.leave_time < todaty){
          this.span_input_flag = false
          this.$message.warning('超过入住日期了，不能更改房价了!')
        }else{
          this.span_input_flag = true
        }
      },
      /**
       * @desc 更新房价
      */
      update_price(){
        //current_rate_price
        let that = this
        let url = that.api.api_newBill_9204 + '/v2/' + `checkin/update_price/`
        // let url = `http://192.168.2.165:9005/v2/checkin/update_price/`
        let scopeParam = {
          order_no: that.preBillLinkParam.order_no,
          price_date: this.update_date, //这个更新的日期
          room_price: that.current_rate_price
        }
        that.$axios.post(url,scopeParam).then(res=>{

        }).catch(error=>{
          console.log(error)
        })
      },
      /**暂时不用 */
      handlePrint(){
        // document.querySelector("#print_img").src = this.printParam.logo;
        document.querySelector("#littleBill").style.margin = "0 auto";
        // console.log('this.printParam.logo',this.printParam.logo)
      },
      /**
       * @desc 小票打印
       */
      handleLittleBill(){
        this.consumeCount = 0
        this.payCount = 0
        this.little_billDialog = true;
        let url = this.api.api_newPrice_9107 + '/v1/report/receipt/master_base_summary/'
        let scopeParam = {
          account_id: this.preBillLinkParam.account_id,
          master_base_id: this.preBillLinkParam.id,
          // cash_id: null
        }
        this.$axios.post(url,scopeParam).then(res=>{
          this.printParam = res.data.data
          this.printParam.account.forEach(item=>{
            if(item.code_type == 1){
              this.consumeCount = item.amount + this.consumeCount
            }else{
              this.payCount = item.amount + this.payCount
            }
          })
        }).catch(error=>{
          console.log('error')
        })
      },
      /**
       * @desc  同住人上传照片 父传子 但是没传
      */
      handlePicture(item,index){
        this.pictureComponentDialog = true
        // this.pictureParam.check_guest = [].concat(this.preBillParam.check_guest) //赋值入住人数组
        // console.log('this.pictureParam.check_guest==1',this.pictureParam.check_guest)
        // console.log('this.pictureParam..',this.pictureParam)
        // localStorage.setItem('pictureParam_guest',JSON.stringify(this.pictureParam))
        localStorage.setItem('pictureParam_guest',JSON.stringify(item))
        localStorage.setItem('pictureParam_index',index)
        console.log('1111', JSON.parse(localStorage.getItem('pictureParam_guest')))
        let param = JSON.parse(localStorage.getItem('userInfo'))
        console.log('param-param',param)
        this.getFaceSet(param)//上传照片需要
      },
       /**
       *@desc 获取酒店的face_set
       */
      getFaceSet(param){
        let that = this
        that.$axios({
          url: 'http://sms.crowncrystalhotel.com/v1/authentication/ht/rf/query_hotel_face_set/',
          method: "post",
          data:{
            group_id: param.hotel_group_id,
            hotel_id: param.hotel_id
          },
        }).then(res=>{
            //如果扫码成功
            if (res.data.message === "success"){
              this.face_set = res.data.data.face_set
              localStorage.setItem('face_set',this.face_set)
              console.log('....',res.data)
            }
            else{
            }
          })
        .catch(error=>{
          console.log(error);
        });
      },
      //子组件传过来的值，以便于更新入住人this.preBillParam.reserve_guest的证件地址和拍照地址
      getPrebillParam(msg){
        console.log('msg传过来得信息',msg)
        this.preBillLinkParam.master_guest = [].concat(msg.reserve_guest) //更新了入住人的信息==>主要是为了更新入住人的照片和证件照信息
      },
      getPictureParam(param){
        console.log('接收从子组件传来的入住人对应的入住照片!',param)
        this.preBillLinkParam.master_guest.forEach((item,index)=>{
          if(index == param.index){
            item.pic_now =  param.imageUrl
            item.face_id = param.face_id
          }
        })
      },
      /**
       * 添加入住人(这里就是同住人)
       */
      confirmAddPeople(){
        let that = this
        // let url =
        this.master_guest_value = this.master_guest_value.filter(item=>item.id_no != '')//需要过滤一下
        console.log('部分',this.master_guest_value)
        console.log('全部',this.preBillLinkParam.master_guest)
        if(that.master_guest_value){
          if(!this.validateSamePeople()){
            return false
          }
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
       * @desc 增加同住人参数判断
       */
      validateSamePeople(){
        for(var item of this.master_guest_value){
           if(!item.id_no){
              this.$message.warning("证件号是必填项!")
              return false
            }
            if(!item.name){
              this.$message.warning("姓名是必填项!")
              return false
            }
            if(!item.room_number){
              this.$message.warning("房间号是必填项!")
              return false
            }
            if(!item.id_code){
               this.$message.warning("证件类型是必填项!")
              return false
            }
            item.pic_now = 'https://ispider-oss.oss-cn-hangzhou.aliyuncs.com/live/4577c1b6.png'
            // if(!item.pic_now){
            //   // this.$message.warning(item.name + '没有上传照片,' + '请上传照片!')
            //   this.$message.warning(item.name + '没有上传照片或者没有录入正确人脸!,' + '请重新上传照片!')
            //   return false
            // }
            // if(!item.face_id){
            //   this.$message.warning(item.name + '上传照片不对,' + '请重新上传照片!')//没有获取sxm的token
            //   return false
            // }
        }
        return true
      },
      /**
       * @desc 新版上传公安
       */
      handleNewPolice(item,index){
        let index_2 = this.cloneMasterGuest.findIndex(param=>param.id_no == item.id_no)
        //原来的数组，就不能进行上传公安操作，默认入住的时候进行判断了已经上传公安了<=========需要这样判断吗
        if(index_2 > -1){
          this.$message.warning('原有入住人禁止再次上传公安!')
          return false
        }
        //开始分情况处理1.有预定且有入住人的信息(包括多条的时候)2.无预定，直接刷身份证的时候
        console.log('....item',item)
        this.handlePoliceParam(item,index)
        this.policeParam =  Object.assign({},this.policeInfoParam) //刷卡产生的对象赋值==>手动输入的值
        console.log('传过来的手动输入的值',this.policeParam)
        // this.getEnter_RommNumber()//获取房间号下拉===>先废弃
        this.policeParam.card_imgUrl = this.card_imgUrl //公安照片===>和上传照片所得到的不同
        this.policeParam.reserve_guest = item //赋值入住人数组 ====>这个master_guest 改为 reserve_guest
        this.policeParam.cardIndex = index
        this.policeParam.enterCardnumber = this.cloneMasterGuest[0].id_no //暂时这样，，默认为标记了不是同住人的入住人
        this.policeComponentDialog = true
      },
      //开始分情况处理1.有入住人的信息(包括多条的时候)
      //2.无入住人，直接刷身份证的时候
      handlePoliceParam(item){
        this.policeInfoParam.liveStatus = 1 //此时这里是同住人 因此需要为1
        // this.policeInfoParam
        this.policeInfoParam.room_no = item.room_number
        this.policeInfoParam.nation = item.nation
        this.policeInfoParam.name = item.name
        this.policeInfoParam.sex = item.sex === '0' ? '男' : '女'
        this.policeInfoParam.cardNo = item.id_no //读卡获取到身份证信息了
        this.policeInfoParam.address = item.street_add
        this.policeInfoParam.telephone = item.telephone
        this.policeInfoParam.birthday = item.birthday
        // this.policeInfoParam.time = item.arr_time + '至' + item.leave_time
        this.policeInfoParam.time = moment(this.preBillLinkParam.arr_time).format('YYYY-MM-DD HH:mm:ss') + '至'+ moment(this.preBillLinkParam.leave_time).format('YYYY-MM-DD HH:mm:ss')
        this.policeInfoParam.cardType = item.id_code === '01' ? '身份证' : ''
      },
      /**
       * @desc 添加同住人=>禁止
       * 现有的进行判断
       */
      sameDisabled(item){
        if(this.cloneMasterGuest.findIndex(itemm=>itemm.id_no == item.id_no) != -1){
          return true
        }else{
          return false
        }
      },
      //证件导入功能 自动填充入住人信息
      cardImport(){
        let that = this
        // that.cardInfoDialog = true //读卡器失败就不打开dialog
        let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=HuaShiDianZi_IDC_Card&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&jsonp=angular.callbacks._0`
        // let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=JingLunDianZi_IDC&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&jsonp=angular.callbacks._0`
        url = url.replace('angular.callbacks._0','userHandler') //替换
        // let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=HuaShiDianZi_IDC_Card&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0`
        that.$http.jsonp(url,{
          jsonpCallback: "userHandler"
        }).then(res =>{
          console.log('that.cardInfoParam==>读卡成功',res)
          // that.validateId_no(that.cardInfoParam.cardNo)//验证身份证 //测试数据==>终废弃
         /**分割=====>上面为测试数据 */
          if(res.data.Result === true){
            that.police_img_src= "data:image/png;base64,"+res.data.Data.Photo;
            that.cardInfoParam.name = res.data.Data.Name
            that.cardInfoParam.sex = res.data.Data.Sex === '男' ? '0' : '1'
            that.cardInfoParam.cardNo = res.data.Data.Code //读卡获取到身份证信息了
            that.cardInfoParam.address = res.data.Data.Address
            that.cardInfoParam.birthday = res.data.Data.Birthday
            that.cardInfoParam.nation = res.data.Data.Nation
            that.validateId_no(that.cardInfoParam)//验证身份证方法
            that.cardInfoDialog = true
            that.takePhoto(that.police_img_src)//此时去掉====>获取身份证照片地址//这里貌似你并没有什么用===>标记一下有用
          }else{
            that.cardInfoDialog = false //读卡器失败就不打开dialog
            that.$message.warning('读卡失败!请重新刷身份证!')
          }
        }).catch(error=>{
          console.error();
        })
      },
      /**
       * @desc new 确认导入入住人信息,其实就是填充同住人
       */
      confirmGuestInfo(){
        //当为1的时候没有手输的情况，默认通过卡导入填充===>进行赋值
        if(this.preBillLinkParam.master_guest[0].id_no ===''){
          this.cardInfoDialog = false
          this.preBillLinkParam.master_guest[0].name = this.cardInfoParam.name
          this.preBillLinkParam.master_guest[0].sex = this.cardInfoParam.sex
          this.preBillLinkParam.master_guest[0].id_code = this.cardInfoParam.cardType
          this.preBillLinkParam.master_guest[0].id_no = this.cardInfoParam.cardNo
          this.preBillLinkParam.master_guest[0].street_add = this.cardInfoParam.address
          this.preBillLinkParam.master_guest[0].nation = this.cardInfoParam.nation
          this.preBillLinkParam.master_guest[0].birthday = this.cardInfoParam.birthday
        //当数组长度大于1的时候，要进行2步，自动加行自动填充数据
        }else if(this.preBillLinkParam.master_guest.length>=1){
          let enterValue = {
            room_number: this.preBillLinkParam.room_number,//房间号
            birthday: this.cardInfoParam.birthday,
            nation: this.cardInfoParam.nation,
            room_floor: 0,
            name: this.cardInfoParam.name, //姓名
            sex: this.cardInfoParam.sex,//性别
            id_code: this.cardInfoParam.cardType,//证件类型
            id_no: this.cardInfoParam.cardNo,//证件号码
            street_add: this.cardInfoParam.address,//街道地址
            arr_time: this.preBillLinkParam.arr_time,//预抵时间
            leave_time: this.preBillLinkParam.leave_time,//离开时间
            liveCount: 0,//可选数
            telephone: '',//手机号
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '2',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '122',
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_id: null,
            company_na: null,
            face_id: null,
            pic_now: null,
            pic_photo: null,
            remark: null,
            is_anonymo: false,
            weixin: null,
            mobile: null,
            email: null,
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            guest_id: null
          }
          console.log('需要判断preBillLinkParam.master_guest===>第二',this.preBillLinkParam.master_guest)
          //避免重复的身份证号
          for(var item of this.preBillLinkParam.master_guest){
            if(item.id_no === this.cardInfoParam.cardNo){
              this.$message.warning('不能有重复的身份证号!')
              return false
            }else{
              this.preBillLinkParam.master_guest = this.preBillLinkParam.master_guest.filter(item=>item.id_no != '') //过滤掉身份证号为空的从而删除入住人一行数据
            }
          }
          this.master_guest_value.push(enterValue)
          this.preBillLinkParam.master_guest.push(enterValue)
          this.cardInfoDialog = false
          console.log('需要判断preBillLinkParam.master_guest',this.preBillLinkParam.master_guest)
          this.showDeleteButton_2 = true
          // this.takePhoto() //这里需要去掉吗
          // if(!this.validataRepeatCard()){
          //   return false
          // }else{
          // }
        }else{

        }
      },
      //验证是否存在已经住人的房间继续刷卡住人
      /**
       * 调取dyl接口
       */
      validateId_no(param,param2){
        let that = this
        // let url= `http://192.168.2.224:9005/v1/checkin/is_checkin_info/`
        let url= that.api.api_bill_9202 + '/v1/' + `checkin/is_checkin_info/`
        let scopeParam = {
          id_no:  param2==='输入' ?  param.id_no : param.cardNo
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.data.result === 'success'){
            that.$message.warning('检测该人已入住!')
            if(param2==='输入'){
              param.id_no = ''
              //置空操作，思路可以传一个上面循环中的index，从而清空该数据
              // console.log('cardInput==',this.$refs.cardInput)
              // console.log('输入1111')
              // this.$refs.cardInput[0].value = ''//置空操作
            }else{
              that.cardInfoDialog = false //不打开dialog
            }
          }else{
            if(param2==='输入'){
            }else{
              // that.cardInfoDialog = true //打开dialog
            }
          }
        })
      },
      //拍照上传
      takePhoto(param){
        let that = this
        /**读取身份证==>有图片地址 */
        if(param){
               /**
             * 元素移除操作不进行，因为是直接发送照片，但是不进行照片的展示。
             */
            let blob = that.dataURLtoBlob(param);
            let file = that.blobToFile(blob, "imgName");
            var fd = new FormData();
            fd.append("upfile", file,"image.png");
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            if(blob){
              let url = that.uploadUrl;
              that.$axios.post(url,fd,config).then(res=>{
                if(res.data.url){
                  // that.card_imgUrl = 'https://image.eloadspider.com/' +  res.data.url
                  that.card_imgUrl = res.data.complete
                  that.$message.success('上传图片成功!')
                }
              }).catch((err)=>{
                  console.info(err);
              })
            }
        }else{
          //获得Canvas对象
          let video = document.getElementById("video_2");
          let canvas = document.getElementById("canvas_2");
          let ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, 150, 150);
          canvas = canvas.toDataURL("image/png");
          /**
           * @desc 拍照以后将video元素移除
           * @desc 拍照将base64转为file文件
           */
          if(canvas) {
            /**
             * 元素移除操作不进行，因为是直接发送照片，但是不进行照片的展示。
             */
            let blob = that.dataURLtoBlob(canvas);
            let file = that.blobToFile(blob, "imgName");
            var fd = new FormData();
            fd.append("upfile", file,"image.png");
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            if(blob){
              let url = that.uploadUrl;
              that.$axios.post(url,fd,config).then(res=>{
                if(res.data.url){
                  that.imageUrl = res.data.complete
                  that.$message.success('上传图片成功!')
                  for(var item of that.preBillLinkParam.master_guest){
                     if(!item.pic_now && !item.pic_photo){
                          item.pic_now = that.imageUrl  //拍摄照片传入
                          item.pic_photo = that.card_imgUrl //该入住人得证件照
                          break
                      }
                  }
                }
              }).catch((err)=>{
                  console.info(err);
              })
            }
          } else {
            /**
             *
             */
          }
        }
      },
         /**
         * 将图片转为file格式
         * @param {Object} dataurl 将拿到的base64的数据当做参数传递
         */
        dataURLtoBlob : function(dataurl) {
          let arr = dataurl.split(','),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
          while(n--) {
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {
              type: mime
          });
        },
        /**
         *
         * @param {Object} theBlob  文件
         * @param {Object} fileName 文件名字
         */
        blobToFile : function(theBlob, fileName) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        },
      //重置数据==>打开账务dialog
      flushAccount_all(){
        let that = this
        this.pagination_all = {
          totalRows: 0, //总条数
          pageSize: 10, //每页显示条数
          pageSizes: [5, 10, 15],
          pageNumber: 1,
          layout: "total, sizes, prev, pager, next, jumper"
        }
        that.api_data = that.api.api_newPrice_9107 + `/v1/accounts/get_arrange_operation_list/`
        this.queryAccountData();
        this.activeName2 = '1'
        this.accountDialog = true;
      },
      /**
       * 账务tab点击查询
       */
      handleTabClick(tab, event){
        let that = this
        //重置数据
        this.pagination_all = {
          totalRows: 0, //总条数
          pageSize: 10, //每页显示条数
          pageSizes: [5, 10, 15],
          pageNumber: 1,
          layout: "total, sizes, prev, pager, next, jumper"
        }
        console.log('tab',tab)
        this.transfer_flag = false
        if (tab.name === "1") {
          //  获取冲调帐记录
            that.api_data = that.api.api_newPrice_9107 + `/v1/accounts/get_arrange_operation_list/`
          } else if (tab.name === "2") {
            //获取分账记录
            that.api_data = that.api.api_newPrice_9107+`/v1/accounts/get_split_charge_operation_list/`
          }else if (tab.name === "3") {
            this.transfer_flag = true
            //获取转账记录
            that.api_data = that.api.api_newPrice_9107 + `/v1/accounts/get_transfer_detail_list/`
          } else if (tab.name === "4") {
            //  获取所有支付订单列表
            that.api_data = that.api.api_newPrice_9107 + `/v1/accounts/get_pay_detail_list/`
          } else if (tab.name === "5") {
            //  获取结账记录
            that.api_data = that.api.api_newPrice_9107 + `/v1/accounts/get_close_detail_list/`
          }else if (tab.name === "6") {
            //获取部分结账记录
            that.api_data = that.api.api_newPrice_9107 +  `/v1/accounts/get_calculate_record_list/`
          }
          //查询所有记录
          that.queryAccountData()
      },
      /**
       * 改变页码的时候
       */
      currentChange_account(val){
        this.pagination_all.pageNumber = val;
        console.log('this.pagination_all.pageNumber',val)
        this.queryAccountData();
      },
      /**
       * 改变每页显示条数的时候调用一次
       */
      sizeChange_account(val) {
        this.pagination_all.pageSize = val;
        this.queryAccountData();
      },
      /**
       * @desc 归纳 查询多个接口对的数据
       */
      queryAccountData(){
        let that = this;
        let url_end = this.transfer_flag 
        ? `?page_size=${that.pagination_all.pageSize}&page=${that.pagination_all.pageNumber}&from_account=${that.preBillLinkParam.account_id}`
        : `?page_size=${that.pagination_all.pageSize}&page=${that.pagination_all.pageNumber}&account=${that.preBillLinkParam.account_id}`
        that.$axios({
          url: that.api_data + url_end,
          method: "get",
        }).then(res => {
          if (res.data.message === "success") {
            console.log(res.data.data)
            that.account_all_list = res.data.data.results;
            that.pagination_all.totalRows = res.data.data.count;
          }
          else {
            console.log(res.data.message);
          }

        })
        .catch(error => {
          console.log(error);
        });
      },
      //处理备注
      handleRemark(){
        console.log('鼠标丢失触发')
        let that = this
        // let url = 'http://192.168.2.165:9005/v2/checkin/update_mark/'
        let url = that.api.api_newBill_9204 + '/v2/checkin/update_mark/'
        let scopeParam ={
          order_no: this.preBillLinkParam.order_no,
          remark: this.preBillLinkParam.remark_id_list
        }
        that.$axios.post(url,scopeParam).then(res=>{
            // console.log('res',res)
          }).catch(error=>{
        })
      },
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
         *@current_rate_price 从多个数据里获取当日价 以营业日期来判断 
         */
        getRateCode_price_self(){
          console.log('this.preBillLinkParam.room_price',this.preBillLinkParam.room_price)
          let biz_date = this.$store.state.biz_date //从store取营业日期
          let biz_date_2 =  moment(biz_date, 'YYYY-MM-DD').valueOf(); //时间戳
          let time = biz_date_2 - 24*60*60*1000
          let before_date = moment(time).format('YYYY-MM-DD') //时间戳转换为日期字符串格式
          try {
            let  temp = this.preBillLinkParam.room_price.filter(item=>item.price_date == biz_date)
            console.log('temp',temp)
            if(temp.length > 0){
              this.update_date =  biz_date
              this.current_rate_price = temp[0].room_price
            }else{
              console.log('else-----')
              console.log('before_date',before_date)
              let  temp2 = this.preBillLinkParam.room_price.filter(item=>item.price_date == before_date)
              console.log('temp2',temp2)
              if(temp2.length > 0){
                this.current_rate_price = temp2[0].room_price
                this.update_date =  before_date
              }else{
                this.update_date =  biz_date
                this.current_rate_price = 0
              }
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
          let url = that.api.api_newPrice_9107 + '/v1/' +  `room/rate_code/get_rate_code/`
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
        this.linkUrl = expandInfo[0].request_data
        // this.trading_unit = expandInfo[0].trading_unit
        // that.call_back_url = expandInfo[0].call_back_url
        console.log('this.linkUrl',this.linkUrl)
        if(expandInfo[0].request_data){
          //字符串数组变化为数组，用json的parse的方法进行转换,这个变量接收额外信息
          that.extraInformation = JSON.parse(expandInfo[0].request_data)
          let extraInformation_All = _.cloneDeep(that.extraInformation) 
          that.extraInformation = extraInformation_All
          // that.extraInformation_no = extraInformation_All.filter(item=>item.is_show == '0')
          console.log('that.extraInformation额外信息',that.extraInformation)
        }else{
          that.extraInformation = []
        }
      },
      //批量查看预授权list(一个accountId下面)
      findAuthorizationList(){
        let that = this
        let id = this.preBillLinkParam.account_id
        // let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/list_by_account_ids'
        let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_pre_authorized_detail_list/?page_size=100&page=1&account=` + id
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
        let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/remove_pre_authorized_detail/` + id + '/'
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
      tiaoDisable(row){
        console.log('tiaorow',row)
        if(row.subject === 'consume' && (row.pay_status ==0 || row.pay_status ==1)){
          return false
        }else{
          return true
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
                let url = that.api.api_newPrice_9107 + '/v1/' + 'accounts/add_calculate_record/'
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
        console.log('row',row)
        if (row.subject=='pay') {
          return 'pay-row';
        } else if (row.subject == 'consume'){
          return 'consume-row';
        }
        return '';
      },
      flushTime(){
        console.log('this.cancle_order',this.cancle_order)
        if(this.cancle_order){
          this.closeOrder() //这里要判断:不支付的话关,闭订单
        }
        console.log('关掉')
        clearInterval(this.timer_src)
        clearInterval(this.timer_r)
      },
      /**
       * @desc 关闭订单
       */
      closeOrder(){
        let that = this
        let url = that.api.api_newPrice_9107 + '/v1/accounts/cancel/'
        let scopeParam = {
          id: this.pay_order_id
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message == 'success'){
            this.$message.info(res.data.data.info)
          }
        }).catch(errer=>{
          console.log(error)
        })
      },
      //开始切换=====>联房，主房===>得到相应的所有信息
      getInfoByImportant(item,index){
        this.pagination.pageNumber = 1,//分页 ==>数据刷新
        this.pagination.pageSize = 5
        // clearInterval(this.timer_room)查房 暂时没啥用
        console.log('开始查询联房===>主房',item)
        this.isActiveColor = index
        console.log('that.preBillLinkParam==原始',this.preBillLinkParam)
        this.getEnterInfoByRoom(item.order_no)//这个变为1不是0，从单号开始查
        // this.getRoomInfoOther(item)//查房 暂时没啥用
        this.getEndpayInfoListByAccount(item.account_id)//查询金额防止缓存的影响
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
        this.pay_refund_flag = 2,
        this.previewEnterBill.remark = '' //置空
        this.flushRefundData()
        this.refundRow = row
        console.log('that.moneydesc.balance',that.moneydesc.balance)
        if(that.moneydesc.balance <= 0){
          this.$message.warning('余额为负或者0，不能进行退款!')
        }else{
          this.refunAccountDialog = true;
          this.maxRefundMoney = row.can_arrange //最大可退款金额
          this.refundMoneyValue = row.can_arrange //赋值默认
        }
      },
      //针对支付明细进行退款(包括第三方)
      confirmRefund(){
        let that = this
        console.log('this.refundRow',that.refundRow)
        let row = that.refundRow
        console.log('that.refundMoneyValue',that.refundMoneyValue)
        console.log('that.maxRefundMoney',that.maxRefundMoney)
        if(Number(that.refundMoneyValue) > Number(that.maxRefundMoney)){
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
          // incoming_account_reason: this.previewEnterBill.payReasonValue,
          // incoming_account_code: this.previewEnterBill.enterAccountCode,
          charge_detail: param.id,//消费单id
        }
        console.log('scope==tuikuan',scopeParam)
        let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/refund/`
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message==='success'){
            let refund_id = res.data.data.data.id
            this.refundFlag = true
            this.check_refund(refund_id)
            // that.queryData()//根据账户查询消费明细
            // that.$message.success('操作成功!')
            // that.refunAccountDialog = false
          }else{
            that.$message.warning(res.data.message)
          }
        }).catch(error=>{
        })
      },
      //联房=>确定并打印
      confirmLinkRoom(){
        console.log('this.linkvalue------------------',this.linkValue)
        if(this.linkValue.length > 1 &&  this.rightData.length=== 0){
          this.$message.warning('请先选择主账!')
          return
        }
        if(this.rightData.length>1){
          this.$message.warning('只能选择一间房间设为主账!')
          return
        }
        if(this.linkValue.length == 1){
           this.rightData = this.linkValue  //一个的时候可以直接赋值
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
        let url = that.api.api_newBill_9204 + '/v2/' + `checkin/combine_accounts/`
        // let url = `http://192.168.2.165:9005/v2/checkin/combine_accounts/`
        let other_account
        if(this.cloneMainId){
          if(members_param[0] != this.cloneMainId){
            other_account = this.cloneMainId
          }else{
            other_account = null
          }
        }
        let scopeParam = {
          main_account: main_account_param,
          secondary_account_list: members_param,//从账房
          other_account: other_account,//存放===>当原来的主账房被去掉之后的主账id
          // remark: [] //备注
        }
        console.log('scopeparam',scopeParam)
        console.log('....有主账的原主账id',this.cloneMainId)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('...',res.data.data)
          if(res.data.data.message == "success"){
            this.$message.success('操作成功!')
            that.linkRoomDialog = false
            that.getEnterInfoByRoom(that.preBillLinkParam.order_no)//查询，重置数据//===>以后要另改(可能)
            that.flushByLink()//刷新房态图
          }else{
            this.$message.warning(res.data.data.message)
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
        console.log('this.rightLinkList=====打开dialog',this.rightLinkList)
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
          let cloneMain = this.linkData.filter(item=>item.id == item.master_id)
          this.cloneMainId = cloneMain[0].account_id
          this.cloneRightData = _.cloneDeep(this.linkValue)
          console.log('cloneMainId',cloneMain,this.cloneMainId)
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
        /**解析后端给的数据生成二维码*/
        qrcode () {
          let that= this;
          let qrcode = new QRCode('qrcode', {
            width: 300,  // 设置宽度
            height: 300, // 设置高度
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
        this.pay_order_id = ''
        this.extraParam = []//置空操作
        console.log('...xinxi1',this.extraInformation)
        console.log('previewEnterBill.pre_author_id===>预授权id',this.previewEnterBill.pre_author_id)
        // this.handleExtraParam()
        let that = this
        // let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_by_charges`
        // let url_1= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_pms`
        // let url_2 = that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_by_author_pms`//预授权付款,即预授权转预收
        // let url = this.previewEnterBill.pre_author_id != '' && this.jie_authorization_flag == true ? url_2 : url_1
        //判断是否有二维码存在，如果有先清空
        if(that.qr_w){
          that.$refs.qrcode.innerHTML = "";
        }
        let params_obj={};
        //判断是不是有多余的参数
        console.log(this.extraInformation);
        if(this.extraInformation && this.extraInformation.length > 0){
          console.log('if')
          for(let i of this.extraInformation){
            params_obj[i.fields_name] =i.acquiescence;
            params_obj.desc= that.previewEnterBill.remark;//备注
            params_obj.pay_amount = Number(that.previewEnterBill.money);//支付金额 0
            params_obj.account = that.preBillLinkParam.account_id;//主账户id
            params_obj.cashier = that.previewEnterBill.cashValue;//收银点
            params_obj.incoming_account_reason = that.previewEnterBill.payReasonValue;//付款方式
            params_obj.incoming_account_code = that.previewEnterBill.enterAccountCode;//入账代码
          }
        }else {
          console.log('进入else')
          params_obj.desc = that.previewEnterBill.remark;//备注
          params_obj.pay_amount = Number(that.previewEnterBill.money);//支付金额 0
          params_obj.account = that.preBillLinkParam.account_id;//主账户id
          params_obj.cashier = that.previewEnterBill.cashValue;//收银点
          params_obj.incoming_account_reason = that.previewEnterBill.payReasonValue;//付款方式
          params_obj.incoming_account_code = that.previewEnterBill.enterAccountCode;//入账代码
        }
        console.log('params_obj',params_obj)
        let url = that.api.api_newPrice_9107 + '/v1/' + 'accounts/pay/'
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        // let scopeParam = {
        //   pay_amount: -Number(that.previewEnterBill.money),//传负值
        //   account: that.preBillLinkParam.account_id, //主账id
        //   desc: that.previewEnterBill.remark,
        //   cashier_id:	that.previewEnterBill.cashValue,
        //   incoming_account_reason: that.previewEnterBill.payReasonValue,
        //   incoming_account_code: that.previewEnterBill.enterAccountCode,
        // }
        let money_money  = Math.min(this.endPayListParam.usable_pre_authorized,this.moneydesc.total_consumption)
        console.log('money_money',money_money)//取总消费和预授权最小值
        if(this.jie_authorization_flag == true){ //当为结账的时候
          if(this.previewEnterBill.money > money_money){
            this.$message.warning('不能大于预授权金额及总消费金额!')
            return false
          }
        }
          // if(this.previewEnterBill.money> )
        that.$axios.post(url,params_obj).then(res=>{
          console.log('aa',res.data.message)
          if(res.data.data.info && res.data.data.info!=false){
              util.hintInfo(this,"warning", res.data.data.info)
          }else{
            that.get_refund_obj = res.data.data.data
            let payment_id = res.data.data.data.id
            this.pay_order_id = payment_id
            console.log('....入预收弹出验证',)
            if(res.data.data.url){
              console.log('payment_id',payment_id)
              that.dialog_img = true;
              that.qr_w = res.data.data.url;
              that.$nextTick(function () {
                that.qrcode();
              });
              that.check_paid(payment_id)
            }else{
              that.check_paid(payment_id)
              console.log('error_pay_flagerror_pay_flagerror_pay_flag',that.error_pay_flag)
              setTimeout(() => {
                if(that.error_pay_flag == true){
                  // that.$message.success('操作成功!')
                  that.preview_enterBillDialog = false
                  that.jieAccountDialog=false
                  that.queryData()
                }
              }, 500);
            }
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
          let url = that.api.api_newPrice_9107 + '/v1/' + `accounts/add_charge_detail/`
          console.log('++++',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res.data.mess',res.data.message)
            if(res.data.message === 'success'){
              if(this.consume_check_flag === true){//标记查房消费入账==>以前的逻辑,不用担忧
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
        console.log('测试',this.preBillLinkParam)
        this.pay_refund_flag = '' //置空<===
        this.payInfoList = [] //置空防止干扰
        //刷新数据
        this.flushEnterAccount()
        this.only_consume_flag= 1
        this.preview_enter_flag = 1
        // this.enterBill.billInfo = this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name
        this.enterBill.billInfo =this.preBillLinkParam.master_guest.length > 0 ? this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name : this.preBillLinkParam.room_number
        this.queryData() //按主帐id批量查看消费明细 /v1/finance/charge_detail/get_by_account_ids
      },
      //打开入预收付钱
      handlePreviewEnterBill(){
        this.payInfoList = [] //置空防止干扰
        this.previewEnterBill.money = ''
        this.preview_enter_flag = 0
        this.pay_refund_flag = 1,
        this.flushPreviewEnterBill() //刷新入预收对象
        console.log('this.preBillLinkParam',this.preBillLinkParam)
        this.previewEnterBill.billInfo =this.preBillLinkParam.master_guest.length > 0 ? this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name : this.preBillLinkParam.room_number
        // this.getpayInfoListByAccount2() //按主帐id批量查看消费明细==>收支记录 /v1/finance/charge_detail/get_by_account_ids
        this.preview_enterBillDialog = true;
        this.cancle_order = true//重置值
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
          let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/add_transfer_detail/`
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
    /**
     * 综合查询===>账户明细
     */
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
              url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&subject__in=${subject_param}&biz_date__gte=${startTime}&biz_date__lt=${endTime}&ordering=-create_datetime`
            }else{
              url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&biz_date__gte=${startTime}&biz_date__lt=${endTime}&ordering=-create_datetime`
            }
          }else{
            if(subject_param){
              url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&subject__in=${subject_param}&ordering=-create_datetime`
            }else{
              url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_charge_detail_list/?page_size=${that.pagination.pageSize}&page=${that.pagination.pageNumber}&ordering=-create_datetime`
            }
          }
          let zhuRoom = this.preBillLinkParam.combine_room_list.filter(item=>item[0] == this.preBillLinkParam.room_number)
          let only_self = zhuRoom[0][3] == zhuRoom[0][4] ? 0 : 1 //主账房判断
          console.log('only_self',only_self)
          let scopeParam = {
            only_self: only_self,
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
      //开始冲调账账
      handleTiaoAccount(row){
        console.log('rowwwwwww',row)
        let that = this;
        that.account_separate_id = row.account
        that.separate_id = row.id;
        that.need_pay_data = row.can_arrange;
        that.reason_id = '';//原因
        that.arranged_amount = "";//金额
        that.invoice_desc = '';//备注
        that.cashier_id='';//s收银点
        this.tiaoAccountDialog = true
        that.adjustment_codes();
      },
      /**封装获取调账原因*/
      adjustment_codes() {
        let that = this
        that.adjustment_list = []
        return
        that.$axios({
          url: that.api.api_newPrice_9107 + "/v1/finance/arrange_account_reason/info_list",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.adjustment_list = res.data.data.list
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**消费上的调账的确定*/
      regulation() {
        let that = this;
        if ( that.arranged_amount === "") {
          util.hintInfo(this,"warning", "*为必填项")
        } else {
          if (Number(that.arranged_amount) > Number(that.need_pay_data) && Number(that.arranged_amount)>0.01 ) {
            util.hintInfo(this,"warning", "不能大于可调帐金额并且不能小于0.01")
          } else {
            that.$axios({
              url: that.api.api_newPrice_9107 + "/v1/accounts/add_arrange_operation/",
              method: "post",
              data: {
                arrange_flag:0,
                account: that.account_separate_id, //调账id的主id
                // reason_id: that.reason_id,//原因
                charge_detail: that.separate_id,//需要调账的id
                arranged_amount: -Number(that.arranged_amount),//金额
                desc:that.invoice_desc,//备注
              },
            }).then(res => {
              if (res.data.message === "success") {
                that.tiaoAccountDialog = false;
                that.queryData()
                util.hintInfo(this,"success", "调账成功")
                }
                else {
                  that.error_message(res.data.message)
                }
              })
              .catch(error => {
                console.log(error);
            });
          }
        }
      },
      handleFenAccount(row){
        let that = this;
        that.separate_id = row.id;
        that.split_account = row.account;
        // that.need_pay = row.general_consumption;
        that.need_pay= row.can_arrange;
        that.comment = '';
        that.biz_date_day = "";
        that.splitAccountParam_num = "";
        that.splitAccountParam_split_amount = "";
        that.fenAccountDialog = true;
      },
      //开始分账处理
      splitAccount(){
        let that = this;
        let show;
        if (that.splitAccountParam_split_amount >= Number(that.need_pay)) {
          util.hintInfo(this,"warning", "拆分金额不能大于等于可分金额")
        } else {
          if(that.splitAccountParam==='0'){
            if(that.splitAccountParam_num==='' ){
             show=false
            }else {
              show=true
            }
          }else if(that.splitAccountParam==='1'){
            if(that.splitAccountParam_split_amount==="" ){
              show=false
            }else {
              show=true
            }
          }
          if(show){
            that.$axios({
              url: that.api.api_newPrice_9107+"/v1/accounts/add_split_charge_operation/",
              method: "post",
              data: {
                desc: that.comment,
                charge_detail:that.separate_id,//消费id
                account: that.split_account, //主帐id
                split_method: Number(that.splitAccountParam),//分账方法
                // biz_date:that.biz_date_day,
                num: that.splitAccountParam_num,//数量
                split_info: -(that.splitAccountParam_split_amount)//拆分金额
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  that.fenAccountDialog = false;
                  that.queryData()
                  util.hintInfo(this,"success", "分帐成功")
                }
                else {
                  that.error_message(res.data.message)
                }

              })
              .catch(error => {
                console.log(error);
              });
          }else {
            util.hintInfo(this,"warning", "*为必填项")
          }
        }
      },
      getTransferAccountRow(row){
        // this.transferMoneyValue = ''
        this.transferAccountId = ''
        this.transferTabel = []
        console.log('rowww',row)
        this.transferTabel.push(row)
      },
      //获取ar账户列表
      getArOption(){
        let that = this
        // let url=  that.api.api_9022_9519 + '/v1/' + `finance/ar_account/info_list`
        let url=  that.api.api_newPrice_9107 + '/v1/' + `accounts/get_ar_account_list/`
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
          // this.getRemarkInfo() //获取备注信息==>即批量查看帐务提醒
        }else if(row.name=='6'){
          this.findAuthorizationList()
        }else if(row.name == '5'){
          console.log('jinruruuu')
          // this.getInvoice()//按照主帐id查看一条开票记录 废弃?
          // this.billDialog = true
        }else if(row.name == '7'){
          console.log('jinruruuu')
          this.getCardInfo()//查看房卡
          // this.billDialog = true
        }
      },
      //获取房卡记录
      getCardInfo(){
        let that = this
        let url = that.api.api_newPrice_9107+ '/v1/' + `room/room_lock/get_door_lock_status_list/`
        that.$axios.get(url,{
          params: {
            reference_id: this.preBillLinkParam.id,
            is_success:1
          }}).then(res=>{
            this.cardList = res.data.data.results
            console.log('res',res.data.data.results)
        })
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
        let url = that.api.api_newPrice_9107 + '/v1/' + `room/room_lock/activate_card/`
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
           console.log('res,,',res.data.data.id)
            let resUrl = res.data.data.url
            let id = res.data.data.id
            //  that.$http.jsonp(resUrl, {
            //   }).then(function (res) {
            //     console.log(res);
            //   }).catch(error=>{
            //     console.error(error)
            //   })
            //  that.$http.jsonp(resUrl).success(function(data){
            //    console.log(data,'shuju')
            //  })
            this.zhicard(resUrl,id)
            // this.updateCard(id)
          }else{
            that.message.error('本地服务没开启!')
          }
        }).catch(error=>{
            console.error();
        })
      },
      updateCard(id){
        let that = this
        let url = that.api.api_newPrice_9107 + '/v1/' + `room/room_lock/update_door_lock_card/` + id + '/'
         that.$axios.post(url).then(res=>{
           console.log('res',res.data)
         }).catch(error=>{
           console.log('error')
         })
      },
      zhicard(url,id){
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
            this.updateCard(id)
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
        // 退房的时候要判断主房的时候解除联房  但特殊情况 =>有联房已退 则不需要解开直接退(条件is_main: true 其余is_main 都为false)
        let room_no = this.preBillLinkParam.room_number
        if(this.endPayListParam.room_list.length > 1){ //存在多个房间
          let index = this.endPayListParam.room_list.findIndex(item=> (item.room_num == room_no && item.is_main)) //判断这个房间为主房
          let otherlink_room = this.endPayListParam.room_list.filter(item=>item.room_num != room_no)
          console.log('index',index)
          console.log('otherlink_room',otherlink_room)
          if(index > -1){
            let other_index = otherlink_room.findIndex(item=>item.master_status == 0) //联房状态下 且  房子为在住状态
            if(other_index > -1){
              this.$message.error('该房间为主房,退房时请在编辑联房里先解除已联的房间或者退掉所有的联房房间!')
              return
            }
          }
        }
        console.log('到这一步啦!')
        this.consume_checkRoom_price = 0
        //必须要强制平账
        let forceValue = 0
          if(this.moneydesc.balance != 0){
            forceValue = 1
            this.dialogVisible = true
            console.log('进入进入弹出',this.dialogVisible)
          }else{
            console.log('进入进入弹出22',this.dialogVisible)
            forceValue = 0
            this.refundMoney(forceValue)
          }
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
            this.$message.success({
              message: '退房成功!',
              showClose: true
            })
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
          let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/add_close_detail/`
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
      /**
       * 计算
       */
      /**
       * 续住或者提前离店
       */
      confirmContinueRoom(){
        this.resolveRateCodeAll()//得到房价对象
        console.log('dengdai---等待',this.value_price)
      },
      /**
       *@desc 真正执行异步方法
       */
      continueRoom(){
        let that = this
        let total_continue_day
        let url= that.api.api_newBill_9204 + '/v2/' + `depend_ex/extend_check/`
        // let url= `http://192.168.2.165:9005/v2/depend_ex/extend_check/`
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
          continued_room: {
            order_no: this.preBillLinkParam.order_no,
            chang_leave_time: moment(this.after_leave_time_2).format('YYYY-MM-DD 14:00:00'),
            total_continue_day: total_continue_day,//暂时
            total_day: null,
            remark: this.remark_continue,
          },
          master_rtrate:[{
            rate_code: this.preBillLinkParam.rate_code,
            price_date: this.$store.state.biz_date,
            price: this.value_price
          }]
        }
        console.log('end scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('进入续住')
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
            this.$message.error(error)
        })
      },
      /**
       * @desc 处理房价获取每天对应的房价码
       */
      resolveRateCodeAll(){
         let that = this
          let url = that.api.api_newPrice_9107 + '/v1/' +  `room/rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.preBillLinkParam.rate_code,
            // begin_date:  moment(new Date(item.master_base[0].arr_time)).format('YYYY-MM-DD'),
            begin_date: this.$store.state.biz_date, //需要请求营业日期的
            end_date: moment(this.after_leave_time_2).format('YYYY-MM-DD'),
            room_type_list: []
          }
          that.$axios.post(url,scopeParam).then(res=>{
            this.rateAllPrice_list = res.data.data.price
            console.log('this.rateAllPrice_list===start',this.rateAllPrice_list)
            console.log('...房型英文描述',this.preBillLinkParam.room_type_descript_en)
            for (let key in this.rateAllPrice_list) {
              if (this.preBillLinkParam.room_type_descript_en == key) {
                this.value_price = this.rateAllPrice_list[key]
              }
            }
            delete this.value_price['room_type']
            if(this.value_price){
              this.continueRoom()
            }else{
              this.$message.error('房价code没有获取!')
            }
            console.log('this.value_price',this.value_price)
          }).catch(error=>{
            console.log(error)
          })
      },
      handleEnterPeople(){
        this.cloneMasterGuest = _.cloneDeep(this.preBillLinkParam.master_guest)
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
       * @desc 更新账务提醒
       */
      updateAccountRemark(){
        let that = this
        let id =  this.preBillLinkParam.account_id
        let url = that.api.api_newPrice_9107+ '/v1/' + `accounts/update_account_base_remark/` + id + '/'
        let scopeParam = {
          remark: that.endPayListParam.remark
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('res',res)
        }).catch(error=>{
          this.$message.error(error)
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
            let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_account_base_info/` + id + '/'
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
        getConsumeData(msg){
          // this.preBillParam.consumeInfoList = msg  //不对
          console.log(msg,'msg')//获取消费子组件传来的值
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
          this.$emit('listenToFlushLink', '已经换房/退房/更改房态/夜审打开了,更新房态图/或者夜审')
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
        deleteSelect_2(item,index){
          console.log('this.preBillLinkParam.master_guest',this.preBillLinkParam.master_guest)
          console.log('删除',item)
          let index_2 = this.cloneMasterGuest.findIndex(param=>param.id_no == item.id_no)
          //原来的数组，就不能进行删除操作
          if(index_2 > -1){
            this.$message.warning('原有入住人禁止更改删除!')
            return false
          }
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
        //封装查退款是否成功
        check_refund(payment_id) {
          console.log('payment_id',payment_id)
          let that = this;
          clearInterval(that.circulation)
          let url = that.api.api_newPrice_9107 + '/v1/accounts/verify/'
          that.$axios({
            url: url,
            method: "post",
            data: {
              id: payment_id
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.message == 'success') {
                if(res.data.data.info == true){
                  clearInterval(that.circulation)
                  that.timer=0;
                  that.$message.success('退款成功!')
                  that.queryData()//根据账户查询消费明细
                  that.refunAccountDialog = false
                }else if(res.data.data.info == false){
                  that.whether(payment_id);
                  if (that.timer >= 60) {
                    clearInterval(that.circulation);
                    if (res.data.data.is_success === true) {
                      that.queryData()//根据账户查询消费明细
                      that.$message.success('退款成功!')
                      that.refunAccountDialog = false
                    } else {
                    }
                    return;
                  }
                }else{
                  this.$message.warning(res.data.data.info)
                }
              }
              else {
                that.error_pay_flag = false
                this.$message.warning('接口调用失败!')
              }
            })
            .catch(error => {
              // this.$message.warning('订单(付款码)输入错误或者接口请求失败!')
              console.log(error);
            });
        },
        //封装查支付是否成功
        check_paid(payment_id) {
          console.log('payment_id',payment_id)
          let that = this;
          // clearInterval(that.timer_r);
          // clearInterval(that.timer_src);
          clearInterval(that.circulation)
          let url = that.api.api_newPrice_9107 + '/v1/accounts/verify/'
          that.$axios({
            url: url,
            method: "post",
            data: {
              id: payment_id
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.message == 'success') {
                if(res.data.data.info == true){
                  that.cancle_order = false
                  that.dialog_img = false;
                  that.dialog_succeed = true;//成功或者失败的页面
                  that.ihatetheqrcode = true;
                  // clearInterval(that.timer_r);
                  // clearInterval(that.timer_src);
                  // that.pay_ament_particulars(that.major_account_id);//刷新付款
                  clearInterval(that.circulation)
                  that.timer=0;
                }else if(res.data.data.info == false){
                  console.log('进入info-------')
                  that.whether(payment_id);
                  if (that.timer >= 60) {
                    clearInterval(that.circulation);
                    if (res.data.data.is_success === true) {
                      that.cancle_order = false
                      that.dialog_img = false;
                      that.dialog_succeed = true;//成功或者失败的页面
                      that.ihatetheqrcode = true;
                    } else {
                      that.cancle_order = false
                      that.dialog_img = false;
                      that.dialog_succeed = true;//成功或者失败的页面
                      that.ihatetheqrcode = false;
                    }
                    return;
                  }
                }else{
                  that.error_pay_flag = false
                  that.preview_enterBillDialog = true
                  this.$message.warning(res.data.data.info)
                }
              }
              else {
                that.error_pay_flag = false
                this.$message.warning('接口调用失败!')
              }
            })
            .catch(error => {
              // this.$message.warning('订单(付款码)输入错误或者接口请求失败!')
              console.log(error);
            });
        },
        //封装微信二维码后的定时器
        whether(payment_id) {
          let that = this;
          // that.timer=0;
          that.circulation = setInterval(function ()   //开启循环：
          {
            that.timer++;
            console.log(that.timer++);
            //判断支付还是退款的循环验证
            this.refundFlag ? this.check_refund(payment_id) : that.check_paid(payment_id);
            if (that.timer >= 60) {
              clearInterval(that.circulation);
              console.log(that.timer);
              return;
              //判断res
            }
          }, 2000);
        },
        /** 成功页面或者失败页面的确定按钮*/
        succeed_failed(){
          let that = this;
          that.dialog_succeed=false;//成功或者失败的页面
          that.dialog_img = false
          that.cancle_order = false
          that.preview_enterBillDialog = false //入预收关闭 另加add
          that.jieAccountDialog = false
          //如果付款成功
          if (that.ihatetheqrcode === true) {
            this.queryData()
            util.hintInfo(this,"success", "付钱成功")
          }
          //如果付钱失败
          else {
            util.hintInfo(this,"warning", "付钱失败")
          }
        },
        getRoomNo(){
          let that = this
          let start 
          let end
          if(this.rowParam.arr_time && this.rowParam.leave_time){
            start = moment(this.rowParam.arr_time).format('YYYY-MM-DD')
            end = moment(this.rowParam.leave_time).format('YYYY-MM-DD')
          }
          let url= that.api.api_newPrice_9107 + '/v1/' + `room/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: this.roomParam.newType,
            start_time: start,
            end_time: end
          }
          that.$axios.post(url,scopeParam).then(res=>{
            that.roomNoList = res.data.data.data  //选房号tabel数组
          }).catch(error=>{

          })
      },
        //获取最终房间号
        // getLiveRoom(param){
        //   let that = this
        //   let url= that.api.api_newPrice_9107 + '/v1/' + `room/room_status/can_live_room_list/`
        //   console.log('房间类型',this.preBillLinkParam)
        //   let scopeParam = {
        //     room_type: param,
        //     start_time: this.preBillLinkParam.arr_time,
        //     end_time: moment(this.preBillLinkParam.leave_time).format('YYYY-MM-DD 14:00:00')
        //   }
        //   that.$axios.post(url,scopeParam).then(res=>{
        //     let array
        //     array = res.data.data.data
        //       //组装带标签的数组
        //       // for(var item of array){
        //       //   for(var itemm of that.roomTagList){
        //       //     if(item.room_no == itemm.room_no){
        //       //       item.tagName = itemm.feature_name
        //       //     }
        //       //   }
        //       // }
        //       that.roomNo_data_list = array  //选房号tabel数组
        //   }).catch(error=>{

        //   })
        // },
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
            let url
          if(this.pay_refund_flag == 1){
            url =  that.api.api_newPrice_9107 + '/v1/' +  'system/settings/get_code_pay_for_list/?parent_id=' + parent_id + '&page_size=300' + '&in_or_out=1'
          }else if(this.pay_refund_flag == 2){
            url =  that.api.api_newPrice_9107 + '/v1/' +  'system/settings/get_code_pay_for_list/?parent_id=' + parent_id + '&page_size=300' + '&in_or_out=2'
          }else{
            url =  that.api.api_newPrice_9107 + '/v1/' +  'system/settings/get_code_pay_for_list/?parent_id=' + parent_id + '&page_size=300'
          }
          // let url =  that.api.api_9022_9519+ '/v1/' +  'finance/incoming_account_code/info_list'
          that.$axios.get(url).then(res=>{
              console.log('res.data',res.data.data.results)
              // that.incomingAccoutList = res.data.data.results
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
          let url =  that.api.api_newPrice_9107 + '/v1/' +  'accounts/get_cash_register_list/'

          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.cashRegisterList = res.data.data.results
          }).catch(error=>{
          })
        },
        /**
         * 付款原因接口
         */
        getPayReason(){
          console.log('pay_refund_flag',this.pay_refund_flag)
          let that = this
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/code_pay_for/info_list?page_size=999`
          let url
          if(this.preview_enter_flag === 0){
            //钱==>收钱时得flag
            if(this.pay_refund_flag == 1){
              url= that.api.api_newPrice_9107+ '/v1/' + `system/settings/get_code_pay_for_list/?code_type=2&page_size=300&in_or_out__in=0,1&parent_id=`
            }else{
              url= that.api.api_newPrice_9107+ '/v1/' + `system/settings/get_code_pay_for_list/?code_type=2&page_size=300&in_or_out__in=0,2&parent_id=`
            }
          }else{
            url= that.api.api_newPrice_9107+ '/v1/' + `system/settings/get_code_pay_for_list/?code_type=1&page_size=300&parent_id=`
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
          // let url =  that.api.api_newPrice_9107 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
          let url =  that.api.api_newPrice_9107 + '/v1/' + 'room/room_status/can_live_room_type_num/'
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
              this.roomOnlyTypeList = res.data.data.data
            }else{
                that.$message.error('获取房型失败!')
            }
          }).catch(error=>{
          })
        },
        //获取房型数据
        getRoomType(){
          let that = this
          let url = that.api.api_newPrice_9107+ '/v1/' + `room/room_status/get_room_type_list/`
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
          let url =  that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_sys_list/'
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
  .panduan{
    width: 14vw
  }
  /**小票打印 */
  .little_bill{
    font-size: 16px;
    li:nth-child(1){
      text-align: center;
      font-size:40 / 2px;
      font-family:Songti SC;
      font-weight: 400;
      color:rgba(0,0,0,1);
    }
    li:nth-child(2){
      text-align: center;
      font-size:40 / 2px;
      font-family:Songti SC;
      font-weight: 400;
      color:rgba(0,0,0,1);
    }
    li:nth-child(3){
      text-align: right;
      span{
        font-family:Songti SC;
        font-weight: 400;
        color:rgba(0,0,0,1);
      }
      padding-bottom: 4px;
      border-bottom: 2px solid #000000FF;
    }
    .little_bill_header{
      margin-left: 36px;
      line-height: 30PX;
      margin-top: 15px;
      span{
        display: inline-block;
        width: 70px;
        margin-right: 10px;
      }
    }
    .little_bill_title{
      display: flex;
      div{
        flex: 1;
        text-align: center;
        border: 1px solid;
        height: 35px;
        line-height: 35px;
      }
      span{
        flex: 1;
        text-align: center;
        height: 25px;
        margin-top: 5px;
        
      }
    }
    .little_sign{
      font: bold;
      font-size: 20px;
      margin-top: 20px;
    }
    .little_sign_en {
      display: flex;
      font: bold;
      font-size: 20px;
      div{
        flex: 1;
        height: 1px;
        background: black;
        margin-top: 15px;
      }
    }
    .little_end{
      margin-top: 20px; 
      display: flex;
      .little_end_content{
        font-size: 10px;
        line-height: 20px;
        span{
          display: block
        }
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
  //zpj
  .open_ticket {
    overflow: hidden;
    margin: 20px 0 0 20px;
    li {
      margin-bottom: 20px;
      span {
        display: inline-block;
        width: 88px;
        text-align:center;
      }
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
  .cardInfoClass{
    overflow: auto;
    height: 350px;
    text-align: left;
    margin: 20px 0px 0px 5vw;
    line-height: 40px;
    li span{
      margin-left:20px
    }
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
    background-color: #00a3df;
  }
  .previewInfo-dialog>>> .el-dialog__header{
    background-color: #00a3df;
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
<style scoped>
  /*控制表格行中的颜色==>深入影响*/
  .el-table>>> .pay-row {
    background: #F0FFFF;
  }

  .el-table>>> .consume-row {
    background:#D3D3D3;
  }
</style>


