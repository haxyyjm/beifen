<template>
  <!--夜审-->
  <div class="warp-night">
    <el-container>
      <el-aside  width="500px" :style="{ height: availHeight }" style="background-color: #FFFFFF,"  class="left">
        <el-table size="mini" :row-class-name="tableRowClassName" @row-click="checkNightAuditAll" :data="nightData" :header-cell-style="{background:'#68819E', color: '#FFFFFF'}" style="width: 100%;margin-top: 10px">
          <el-table-column prop="nightItem" width="260" label="夜审项目"></el-table-column>
          <el-table-column prop="number" label="数量">
            <template slot-scope="scope">
              <span v-if="scope.row.number != '0'">
                <span style="color: red">{{scope.row.number}}</span>
              </span>
              <span v-else>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column label="标志">
            <template slot-scope="scope">
                <!-- <img src="@/assets/images/pms/houseStatus/trueicon.png"/> -->
                <span :class="[scope.row.number == 0?'flagClass': 'flagClass_2']">{{scope.row.src}}</span>
                <!-- <img width="40" height="40"  :src="scope.row.src"/> -->
                <!-- <i :class="scope.row.url"></i> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- <span class="start-night">点击开始夜审</span> -->
      </el-aside>
      <el-main class="right">
        <div>
          <div style="text-align: center; font-size:22px">
            <span>{{title}}</span>
          </div>
          <el-row style="float: right;margin-bottom: 10px">
            <el-button type="primary" size="mini" @click="nextOrBackTip('up')">上一步</el-button>
            <el-button type="primary" size="mini" @click="nextOrBackTip('down')">下一步</el-button>
          </el-row>
          <!--夜审tabel开始-->
          <div>
              <el-table size="mini" @row-click="pingAccount_resolve" height="550px" v-show="noPing" :data="noPingData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="room_number" label="房间号"></el-table-column>
                <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="lock_number" label="锁号"></el-table-column>
                <el-table-column prop="code_src" label="来源码"></el-table-column>
                <el-table-column prop="code_market" label="市场码"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离店时间"></el-table-column>
              </el-table>
              <el-table size="mini" height="550px" v-show="qingAccount" :data="qingAccountData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.master_guest_list" :key="index">
                      {{item.name}}、
                    </span>
                  </template>
                </el-table-column>
                  <el-table-column prop="room_number" label="房间"></el-table-column>
                  <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="order_no" label="单号"></el-table-column>
                <el-table-column prop="telephone_master" label="电话"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <!--缺失市场码来源码的数据-->
              <el-table size="mini" height="550px" v-show="srcLack" :data="srcData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="room_number" label="房间"></el-table-column>
                <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="order_no" label="单号"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <el-table size="mini" height="550px" v-show="hourLeave" :data="hourLeaveData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.master_guest_list" :key="index">
                      {{item.name}}、
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="room_number" label="房间"></el-table-column>
                <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="order_no" label="单号"></el-table-column>
                <el-table-column prop="telephone_master" label="电话"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <el-table size="mini" height="550px" v-show="noArrive" :data="noArriveData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="rsv_person_name" label="预定人"></el-table-column>
                <el-table-column prop="rate_code" label="房价码"></el-table-column>
                <el-table-column prop="mobile_master" label="电话"></el-table-column>
                <el-table-column prop="code_market" label="市场码"></el-table-column>
                <el-table-column prop="code_src" label="来源码"></el-table-column>
                <el-table-column  label="房间">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.reserve_guest_list" :key="index">
                      {{item.room_number}}、
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="order_no" label="单号"></el-table-column>
                <el-table-column prop="telephone_master" label="电话"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <!-- //异常检查 -->
              <el-table size="mini" height="550px" v-show="errorCheck" :data="errorCheckData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="rsv_person_name" label="预定人"></el-table-column>
                <el-table-column label="入住人">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.reserve_guest" :key="index">
                      {{item.name}}、
                    </span>
                  </template>
                </el-table-column>
                <el-table-column  label="房间">
                  <template slot-scope="scope">
                    <span v-for="(item,index) of scope.row.reserve_guest" :key="index">
                      {{item.room_number}}、
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="order_no" label="单号"></el-table-column>
                <el-table-column prop="telephone_master" label="电话"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <el-table size="mini" height="550px" v-show="noPay" :data="noPayData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" style="width: 100%">
                  <el-table-column type="index" width="90"  label="序号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                  <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <!--当日新增无地址宾客档案列表-->
              <el-table size="mini"  v-show="noAddress" :data="noAddressData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" height="550" style="width: 100%;">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="room_number" label="房号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column label="性别">
                  <template slot-scope="scope">
                    <span v-if="scope.row.sex === '0'">男</span>
                    <span v-else>女</span>
                  </template>
                </el-table-column>
                <el-table-column prop="street_add" label="地址"></el-table-column>
                <el-table-column prop="telephone" label="电话"></el-table-column>
              </el-table>
              <!-- 当日/全部已取消的预订单列表 -->
              <el-table size="mini" v-show="cancleOrder" :data="cancleOrderData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" height="550" style="width: 100%;">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column label="姓名">
                    <template slot-scope="scope">
                      <span v-for="(item,index) of scope.row.master_guest_list" :key="index">
                        {{item.name}}、
                      </span>
                    </template>
                  </el-table-column>
                <el-table-column prop="room_number" label="房间"></el-table-column>
                <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="order_no" label="单号"></el-table-column>
                <el-table-column prop="telephone_master" label="电话"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
              <!-- 到期预授权 -->
              <el-table size="mini" v-show="authorizeExpire" :data="authorizeData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" height="550" style="width: 100%;">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="authorize_num" label="预授权卡号"></el-table-column>
                <el-table-column prop="authorized_amount" label="预授权额度"></el-table-column>
                <el-table-column prop="card_expire" label="卡到期时间"></el-table-column>
                <el-table-column prop="create_user" label="操作人"></el-table-column>
              </el-table>
              <!--证件号码重复登记主单-->
              <el-table size="mini" v-show="cardRepeat" :data="cardRepeatData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" height="550" style="width: 100%;">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column label="姓名">
                    <template slot-scope="scope">
                      <span v-for="(item,index) of scope.row.master_guest_list" :key="index">
                        {{item.name}}、
                      </span>
                    </template>
                  </el-table-column>
                <el-table-column prop="room_number" label="房间"></el-table-column>
                <el-table-column prop="room_type" label="房型"></el-table-column>
                <el-table-column prop="id_no" label="身份证号"></el-table-column>
                <el-table-column prop="room_number" label="房间号"></el-table-column>
                <el-table-column prop="telephone" label="电话"></el-table-column>
                <el-table-column label="性别">
                  <template slot-scope="scope">
                    <span v-if="scope.row.sex=== '0'">男</span>
                    <span v-else>女</span>
                  </template>
                </el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
                <!--房租预审及入账-->
              <el-table size="mini" v-show="enterPreview" :data="enterPreviewData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" height="550" style="width: 100%;">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="room_number" label="房间号"></el-table-column>
                <el-table-column prop="room_type" label="房间类型"></el-table-column>
                <el-table-column label="预定/入住类型">
                   <template slot-scope="scope">
                      <span v-if="scope.row.master_from_label === 0">散客</span>
                      <span v-else>团队</span>
                    </template>
                </el-table-column>
                <el-table-column prop="order_no" label="预定单号"></el-table-column>
                <el-table-column prop="fix_rate" label="房价"></el-table-column>
                <el-table-column prop="room_amount" label="房间数量"></el-table-column>
                <el-table-column prop="arr_time" label="到达时间"></el-table-column>
                <el-table-column prop="leave_time" label="离开时间"></el-table-column>
              </el-table>
            <!--即将到期维修和锁定房-->
              <el-table size="mini" v-show="repairLock" :data="repairLockData" :header-cell-style="{background:'#CCCCCCFF', color: '#333333'}" height="550" style="width: 100%;">
                <el-table-column type="index" width="90"  label="序号"></el-table-column>
                <el-table-column prop="room_no" label="房间号"></el-table-column>
                <el-table-column prop="room_state_change_reason" label="维修/锁房原因"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column :formatter="dateFormat_arr" prop="start_time" label="开始时间"></el-table-column>
                <el-table-column :formatter="dateFormat_leave" prop="end_time" label="结束时间"></el-table-column>
              </el-table>
          </div>
        </div>
      </el-main>
      <!--未平账dialog-->
      <el-dialog @close="flushData" class="houseTypeClass" width="50%" title="账务处理" :visible.sync="accountResolve_dialog" :modal="true">
        <div style="height: 500px;overflow: auto">
          <el-form>
            <el-form-item label="预收:">
              <span>{{moneydesc.pay_amount}}</span>
            </el-form-item>
            <el-form-item label="总消费:">
              <span>{{moneydesc.total_consumption}}</span>
            </el-form-item>
            <el-form-item label="余额:">
              <span>{{moneydesc.balance}}</span>
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
            <el-form-item label="收银点:">
                <el-select style="margin-left: 12px" size="mini"  clearable   @focus="getCashRegister" v-model="previewEnterBill.cashValue"  placeholder="请选择">
                  <el-option
                    v-for="item in cashRegisterList"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款方式:">
                <el-select  clearable @change="previewEnterBill.enterAccountCode=''" size="mini"  @focus="getPayReason()" placeholder="付款原因"  v-model="previewEnterBill.payReasonValue">
                  <el-option
                    v-for="item in this.payInfoList"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入账代码:">
              <el-select clearable @change="showExpand"  @focus="getIncomingAccount()"  v-model="previewEnterBill.enterAccountCode" size="mini"  placeholder="请选择">
                <el-option
                  v-for="item in incomingAccoutList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!--附加信息==>需要判断储值卡,银行卡,积分兑换-->
            <div style="margin-top: 30px; margin-bottom: 20px">
              <span  style="color: #4488E9;">附加信息</span>
              <ul v-for="(item,index) of extraInformation" :key="index">
                <li v-if="item.is_show != 0">
                  <span style="display: inline-block;width: 66px">{{item.fields_describe}}:</span>
                  <el-input size="mini" v-model="item.acquiescence" style="width: 20vw; margin-top: 10px;"></el-input>
                </li>
              </ul>
            </div>
            <!-- <el-form-item label="封账:">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input size="mini" v-model="previewEnterBill.remark" type="textarea" :rows="4" style="width: 85%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button type="primary" v-if="moneydesc.balance >= 0" @click="jie_addChargeDetail('refund')">结账(退款)</el-button>
          <el-button type="primary" v-if="moneydesc.balance < 0" @click="jie_addChargeDetail()">结账(收钱)</el-button> -->
          <!-- <el-button type="primary" @click="jie_addChargeDetail()">结账(收钱)</el-button> -->
          <el-button type="primary" @click="handlePayCharge()">结账(收钱)</el-button>
          <!-- <el-button type="primary" v-if="moneydesc.balance == 0" @click="pingMoney">平账</el-button> -->
        </div>
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
          :visible.sync="dialog_img"
          @close="flushTime()"
          width="40%">
          <ul >
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
        <!-- 聚合支付 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="聚合支付" :visible.sync="prePayDialog" :modal="true">
          <div style="width: 100%; height: 400px">
            <ul class="enter_pay_ul">
              <li><span>本次扫码支付金额:</span> <span style="color: #38cb25;">￥200</span></li>
              <li><span>请使用扫码枪扫码:</span>
                  <el-input size="small" style="width: 8vw"></el-input>
                  <el-button size="small" type="danger" round>提交</el-button>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="prePayDialog=false">关闭</el-button>
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
    </el-container>
  </div>
</template>
<script>
import moment from 'moment'
import util from '../../../common/util.js'
import QRCode from 'qrcodejs2'
import _ from 'lodash'
  export default {
    data: function(){
      return {
        trading_unit: '',
        linkUrl: '',
        call_back_url: '',
        extraParam:[],
        scan_code: '0',
        prePayDialog: false, //聚合支付
        img_wz: true,
        qr_w: '',
        img_src: '',
        dialog_succeed: false,
        dialog_img: false,
        ihatetheqrcode: true,
        timer_src: null,
        // timer_incident: null,
        timer_r: null,
        timer: 0,
        order_form: '',
        original_pay_id: '',//微信/淘宝/第三方支付订单的id,现金支付没有此参数
        pay_amount_money_code: '',
        dialog_alipay: false, //聚合支付
        accountParam: {
          account_id: ''
        },
        payInfoList: [],
        incomingAccoutList: [],
        cashRegisterList: [],
        payModelist_other: [],
        extraInformation:[],
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
        //所有金额明细
        moneydesc: {
          pay_amount: 0,//预收
          balance: 0,//余额
          total_consumption: 0,//总消费
          need_pay: 0,//应付
          total_refund: 0,//总退款金额
        },
        accountResolve_dialog: false,//对未平账账务进行处理打开dialog
        is_night: true,
        index_flag: 0,
        noPing: false,
        qingAccount: false,
        noArrive: false,
        errorCheck: false,
        hourLeave: false,
        srcLack: false,
        noPay: false,
        noAddress: false,
        cancleOrder: false,
        authorizeExpire: false,
        cardRepeat: false,
        enterPreview: false,
        repairLock: false,
        repairLockData: [],
        cancleOrderData: [],
        authorizeData: [],
        cardRepeatData: [],
        enterPreviewData: [],
        noPayData: [],
        noAddressData: [],
        noPingData: [],
        qingAccountData: [],
        srcData: [],
        hourLeaveData:[],
        noArriveData: [],
        errorCheckData: [],
        title: '',
        UrLHeader_9519:'http://47.98.113.173:9519/v1/',
        // UrLHeader_9519:'http://47.98.113.173:9022/v1/',//9022
        availHeight: '',
        nightData:[{
          index: 0,
          nightItem: '退房未平帐的主帐信息',
          number: 0,
          src: '',
        },{
          index: 1,
          nightItem: '应离未离宾客列表',
          number: 0,
          src: '',
        },{
          index: 2,
          nightItem: '应离未离钟点房列表',
          number: 0,
          src: '',
        },{
          index: 3,
          nightItem: '应到未到客人列表',
          number: 0,
          src: '',
        },{
          index: 4,
          nightItem: '异常检查',
          number: 0,
          src: '',
        },
        // {
        //   index: 4,
        //   nightItem: '当日新增guest-type宾客档案列表',
        //   number: 0,
        //   src: '',
        // },
        {
          index: 5,
          nightItem: '当日新增无地址宾客档案列表',
          number: 0,
          src: '',
        },
        // {
        //   index: 6,
        //   nightItem: '当日新增无地址公司档案列表',
        //   number: 0,
        //   src: '',
        // },
        {
          index: 6,
          nightItem: '即将删除宾客档案列表',
          number: 0,
          src: '',
        },
        // {
        //   index: 8,
        //   nightItem: '应离未离客人列表',
        //   number: 0,
        //   src: '',
        // },
        {
          index: 7,
          nightItem: '夜审钟点房未离列表',
          number: 0,
          src: '',
        },{
          index: 8,
          nightItem: '缺失市场码来源码主单',
          number: 0,
          src: '',
        },{
          index: 9,
          nightItem: '证件号码重复登记主单',
          number: 0,
          src: '',
        },{
          index: 10,
          nightItem: '应到未到有效账务宾客列表',
          number: 0,
          src: '',
        },{
          index: 11,
          nightItem: '取消预订列表',
          number: 0,
          src: '',
        },{
          index: 12,
          nightItem: '餐饮服务关账检查',
          number: 0,
          src: '',
        },{
          index: 13,
          nightItem: '即将到期维修/锁房列表',
          number: 0,
          src: '',
        },{
          index: 14,
          nightItem: '到期预授权撤销列表',
          number: 0,
          src: '',
        },{
          index: 15,
          nightItem: '房租预审及入账',
          number: 0,
          src: '',
        },
        // {
        //   index: 18,
        //   nightItem: '系统运行状态',
        //   number: 0,
        //   src: '',
        // },{
        //   index: 19,
        //   nightItem: '统计报表及数据更新',
        //   number: 0,
        //   src: '',
        // }
        ],
        tableData_data: [],
      };
    },
    components: {
      QRCode
    },
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
      },
      focus_focus: {
        // 指令的定义
        inserted: function (el) {
          console.log('el',el)
          // 聚焦元素
          el.querySelector('input').focus()
        },
        // update: function (el) {
        //   // 聚焦元素
        //   el.querySelector('input').focus()
        // }
      }
    },
    created(){
      this.check_isNight()//开始检查是否已经夜审
      // let row = {
      //     index: 0,
      //     nightItem: '退房未平帐的主帐信息',
      //     number: 0,
      //     src: '',
      // }
      let row = this.nightData[0]
      this.getNight_noPing(row)
      this.noPing = true
      this.qingAccount = false
      this.errorCheck = false
      this.noArrive = false
      this.hourLeave = false
      this.srcLack = false
      this.noAddress = false
      this.noPay = false
      this.cancleOrder = false
      this.authorizeExpire = false
      this.cardRepeat = false
      this.enterPreview = false
      this.repairLock = false
      this.title = '退房未平帐的主帐信息'
      try {
        this.noPingData.length == 0 ? this.nightData[0].src = '通过' : ''
      } catch (error) {
        console.log('error')        
      }
    },
    mounted (){
      this.availHeight = (screen.availHeight -10)  +'px';
    },
    methods: {
      dateFormat_arr: function (row) {
        return moment(row.start_time).format("YYYY-MM-DD HH:mm:ss")
      },
      dateFormat_leave: function (row) {
        return moment(row.end_time).format("YYYY-MM-DD HH:mm:ss")
      },
      //刷新数据
      flushData(){
        this.extraInformation = []
        this.previewEnterBill.payMode = ''
        this.previewEnterBill.payReasonValue = ''
        this.previewEnterBill.enterAccountCode = ''
        this.previewEnterBill.cashValue = ''
      },
      //当有未平账的信息时，点击每一行进行处理
      pingAccount_resolve(row){
        let that = this
        this.accountParam.account_id = row.account_id
        // this.getEndpayInfoListByAccount(row.account_id)
        that.moneydesc.pay_amount = row.account.pay_amount
        that.moneydesc.total_consumption = row.account.total_consumption
        that.moneydesc.balance = row.account.balance
        this.previewEnterBill.money = Math.abs(row.account.balance) //退款或预收金额
        this.accountResolve_dialog = true
        // this.previewEnterBill.money = Math.abs(this.moneydesc.balance) //退款或预收金额
        this.$confirm('是否清账或挂临时帐?','提示',{
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(()=>{
          console.log('开始挂临时账!')
          this.guaAccount()
        }).catch(()=>{
          console.log('关闭confirm')
        })
        console.log('row,',row)
        console.log('开始处理未平账的信息!')
      },
      //挂临客账
      guaAccount(){
        let that = this
        let url= that.api.api_9022_9519+ '/v1/' + `finance/account/stand_by`
        let scopeParam = {
          account_id: that.accountParam.account_id
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message != 'success'){
            that.$message.warning("挂临客账失败!" + res.data.message)
          }else{
            this.accountResolve_dialog = false
            that.$message.success('操作成功!')
            let row = {
              index: 0,
              nightItem: '退房未平帐的主帐信息',
              number: 0,
              src: '',
            }
            this.getNight_noPing(row)//刷新右边tabel
            if(this.nightData[0].number > 0){
              this.nightData[0].number = this.nightData[0].number -1//刷新左边数据
            }else{
              this.nightData[0].number = 0//刷新左边对应数据
            }
          }
          }).catch(error=>{
            that.$message.warning("操作失败!")
        })
      },
      //查询该账务信息(是需要退款还是收钱===>这里实际上是针对员工的)
      getEndpayInfoListByAccount(id){
        console.log('idd==================',id)
          let that = this
          let param ={
            with_collections: 1,
            related_objects: 1
          }
          let url= that.api.api_9022_9519+ '/v1/' + `finance/account/get_info_pms/` + id
          that.$axios({
            method : 'get',
            url : url,
            params: param
        }).then(res=>{
            that.endPayListParam = res.data.data
            console.log('this.popverParam===================================》》》》》》最终账户',that.endPayListParam)
            try {
              that.moneydesc.pay_amount = that.endPayListParam.pay_amount + that.endPayListParam.usable_pre_authorized//添加了预授权
              that.moneydesc.total_consumption = that.endPayListParam.general_consumption
              that.moneydesc.balance = that.endPayListParam.balance
              that.moneydesc.need_pay = that.endPayListParam.need_pay
              this.previewEnterBill.money = Math.abs(this.moneydesc.balance) //退款或预收金额
            } catch (error) {
              that.$message.warning('数据出错!')                
            }
            // that.moneydesc.pay_amount = that.endPayListParam.pay_amount + that.endPayListParam.usable_pre_authorized//添加了预授权
            // that.moneydesc.total_consumption = that.endPayListParam.general_consumption
            // that.moneydesc.need_pay = that.endPayListParam.need_pay
            // that.moneydesc.balance = that.endPayListParam.balance
            // this.previewEnterBill.money = Math.abs(that.moneydesc.balance)//两外加 结账加收房费重置值
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
      //平账接口===>细微的情况才有
      pingMoney(){
        let that = this
        let url = that.api.api_9022_9519+ '/v1/' + `finance/account_close_operation/add`
        let scopeParam = {
          account_id: this.accountParam.account_id, //传入平账(结账)前的账号
          cashier: null,//平帐点id
          close_flag: 'c', //平帐类型(以何种方式平帐的?): a=冲帐 t=转帐 c=结帐
          remark: '',//备注
          force: 1,//1或0 1为强制平账
          change_room_status: 0//1/0,是否改变房态,默认是1(改变),
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message==='success'){
            this.accountResolve_dialog = false //退房关闭页面 res.data.message 为已有平帐记录则表示退房
            let row = {
              index: 0,
              nightItem: '退房未平帐的主帐信息',
              number: 0,
              src: '',
            }
            this.getNight_noPing(row)//刷新右边tabel
            if(this.nightData[0].number > 0){
              this.nightData[0].number = this.nightData[0].number -1//刷新左边数据
            }else{
              this.nightData[0].number = 0//刷新左边对应数据
            }
            this.$message.success('平账成功!')
          }else{
            this.$message.warning(res.data,message)
          }
          }).catch(error=>{
        })
      },
      //结账==>退款(当退款时只能选现金<=====此时)//先余额为0 在结账账 分两步
      jie_addChargeDetail(param){
        let that = this
        let url 
        if(param == 'refund'){
          url= that.api.api_newPrice_9114+ '/v1/' + `accounts/add_close_detail/`
        }else{
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/refund_pms`
        }
        if(this.previewEnterBill.payReasonValue && this.previewEnterBill.enterAccountCode){
          let scopeParam = {
            account: this.accountParam.account_id,//主账户id
            remark: this.previewEnterBill.remark,
          }
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message==='success'){
              that.$message.success('处理成功!')
              that.accountResolve_dialog = false
              let row = {
              index: 0,
              nightItem: '退房未平帐的主帐信息',
              number: 0,
              src: '',
            }
            this.getNight_noPing(row)//刷新右边tabel
            if(this.nightData[0].number > 0){
              this.nightData[0].number = this.nightData[0].number -1//刷新左边数据
            }else{
              this.nightData[0].number = 0//刷新左边对应数据
            }
            }else{
              that.$message.warning(res.data.message)
            }
          }).catch(error=>{
          })
        }else{
          this.$message.warning('请选择付款方式或者入账代码!')
        }
      },
      //进行付款
      handlePayCharge(){
        // this.extraParam = []//置空操作
        // console.log('...xinxi1',this.extraInformation)
        // this.handleExtraParam()
        if(!this.validatePayData()){
          return false
        }
        let that = this
        console.log('第一次paycharge')
        that.payCharge()
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
      //入预收==>付款 客人付款(针对现金从而进行支付)
      payCharge(){
        this.extraParam = []//置空操作
        console.log('...xinxi1',this.extraInformation)
        this.handleExtraParam()
        let that = this
        let url = that.api.api_newPrice_9114 + '/v1/' + 'accounts/pay/'
        // let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_pms`
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        let scopeParam = {
          pay_amount: -Number(that.previewEnterBill.money),//传负值
          desc: that.previewEnterBill.remark,
          account: that.accountParam.account_id, //主账id
          cashier_id:	that.previewEnterBill.cashValue,
          incoming_account_reason: that.previewEnterBill.payReasonValue,
          incoming_account_code: that.previewEnterBill.enterAccountCode,
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data)
          if(res.data.message != 'success'){
            that.$message.warning('调用后台接口失败')
          }else{
            that.get_refund_obj = res.data.data.data
            let payment_id = res.data.data.data.id
            if(this.linkUrl){
              //1.请求这个url得到相应数据例如二维码
              console.log(that.linkUrl,that.extraInformation,payment_id,that.extraInformation_no)
              that.getInfoByLinkUrl(that.linkUrl,that.extraInformation,payment_id,that.extraInformation_no) //类似kindle_dxg
              // this.kindle_dxg()
            }else{
              that.$message.success('操作成功!')
              that.accountResolve_dialog = false
              let row = {
                index: 0,
                nightItem: '退房未平帐的主帐信息',
                number: 0,
                src: '',
              }
              this.getNight_noPing(row)//刷新右边tabel
              if(this.nightData[0].number > 0){
                this.nightData[0].number = this.nightData[0].number -1//刷新左边数据
              }else{
                this.nightData[0].number = 0//刷新左边对应数据
              }
              // this.$router.go(0)
            }
          }
          }).catch(error=>{
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
            console.log(error)
            // this.$message.error(error)
          }
        })
      },
        /**封装获取商品订单号====>付款第一步*/
      article_number(){
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
      flushTime(){
        console.log('关掉')
        clearInterval(this.timer_src)
        clearInterval(this.timer_r)
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
          let that = this
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
      //封装查看微信二维码或者扫码枪扫描支付是否成功
        check_paid(url,payment_id){
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
            that.enterPreviewDialog = false//入预收界面关闭 另加add
            that.enterFormVisible = false//入住单关闭 另加add
            // that.fu_money();//付钱的确定
            that.payCharge()//付钱的确定 <==== 钱上的扣了然后==>账务上的调用

          }else {
            // if(that.img_src!=="" ){
            //   that.dialog_succeed=false;//成功或者失败的页面
            //   that.dialog_alipay = false;//扫码支付的页面
            // }else {
            //   that.dialog_succeed=false;//成功或者失败的页面
            //   that.dialog_alipay = true;//扫码支付的页面
            //   that.pay_amount_money_code="";
            //   util.hintInfo(this,'warning', '扫码付钱失败，请重新扫码！');

            // }
            if(that.qr_w){
              that.dialog_succeed=false;//成功或者失败的页面
              that.dialog_img=false;
              that.pay_amount_money_code="";
              that.enterPreviewDialog = true
              util.hintInfo(this,"warning", "扫码付钱失败，请重新扫码")
            }else {
              that.dialog_succeed=false;//成功或者失败的页面
              that.dialog_alipay = false;//扫码支付的页面
              that.pay_amount_money_code="";
              that.enterPreviewDialog = true
              util.hintInfo(this,"warning", "扫码付钱失败，请重新扫码")
            }
          }
        },
       validatePayData(){
          return(
            util.validateBlank(this.previewEnterBill.enterAccountCode,'入账代码是必填项',this)&&
            util.validateBlank(this.previewEnterBill.payReasonValue,'付款方式是必填项',this)
            // util.validateBlank(this.previewEnterBill.payReasonValue,'付(退)款原因是必填项',this)
            // util.validateBlank(this.previewEnterBill.money,'请输入正确身份证格式',this)
          )
        },
      tableRowClassName({row, rowIndex}) {
        try {
          if (row.index === this.index_flag) {
            return 'warning-row';
          }
          return '';
        } catch (error) {
          console.log('error')          
        }
      },
      //上一步或下一步
      nextOrBackTip(param){
        let nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        let endTime = moment(new Date()).format('YYYY-MM-DD 22:00:00')
        // if(nowTime < endTime){
        //   this.$message.warning('还未到夜审时间!')
        //   return 
        // }
        console.log('this.index_flag',this.index_flag)
        let index_flag = param === 'up' ? this.index_flag - 1 : this.index_flag + 1
        console.log('index_flag构造',index_flag)
        let row = this.nightData.filter(item=>item.index === index_flag)
        console.log('this...rrr值',row)
        if(row.length>0){
          console.log('row[0]=====',row[0])
          this.checkNightAuditAll(row[0]) //找到下一个要调用的
          this.tableRowClassName(row[0])
        }
      },
      //夜审所有项目(每一行点击)
      checkNightAuditAll(row){
        console.log('time',moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
        console.log('row,,,,',row)
        let nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        let endTime = moment(new Date()).format('YYYY-MM-DD 22:00:00')
        // if(nowTime < endTime){
        //   this.$message.warning('还未到夜审时间!')
        //   return 
        // }
        this.index_flag = row.index
        console.log('this.index_flag',this.index_flag)
        row.number = row.number + ''
        this.title = row.nightItem
        // this.$message.warning('正在夜审!')
        switch (row.nightItem) {
          case '退房未平帐的主帐信息':
            this.getNight_noPing(row)
            this.errorCheck = false
            this.noPing = true
            this.qingAccount = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noAddress = false
            this.noPay = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
            console.log('(row)====',row.number)
            break;
          case '应离未离宾客列表':
            this.getNight_qingAccount(row)
            this.qingAccount = true
            this.noPing = false
            this.noArrive = false
            this.errorCheck = false
            this.hourLeave = false
            this.srcLack = false
            this.noAddress = false
            this.noPay = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
          break;
          case '应离未离钟点房列表':
            this.getNight_hourLeave(row)
            this.qingAccount = false
            this.hourLeave = true
            this.srcLack = false
            this.noPing = false
            this.noArrive = false
            this.errorCheck = false
            this.noAddress = false
            this.noPay = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
          break;
          case '应到未到客人列表':
            this.getNight_noArrive(row)
            this.errorCheck = false
            this.noArrive = true
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.noAddress = false
            this.noPay = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
            break;
          case '异常检查':
            this.getNight_errorCheck(row)
            this.errorCheck = true
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.noAddress = false
            this.noPay = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
            break;
          case '当日新增无地址宾客档案列表':
            this.getNight_noAddress(row)
            this.errorCheck = false
            this.noAddress = true
            this.noPay = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
          break;
          case '应到未到有效账务宾客列表':
            this.getNight_noPay(row)
            this.errorCheck = false
            this.noPay = true
            this.noAddress = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
            break;
           case '到期预授权撤销列表':
            this.getNight_authorize(row)
            this.noPay = false
            this.noAddress = false
            this.errorCheck = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = true
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
            break;
          case '取消预订列表':
            this.getNight_cancleOrder(row)
            this.noPay = false
            this.noAddress = false
            this.errorCheck = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = true
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
            break;
          case '证件号码重复登记主单':
            this.getNight_cardRepeat(row)
            this.noPay = false
            this.errorCheck = false
            this.noAddress = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = true
            this.repairLock = false
            this.enterPreview = false
            break;
           case '缺失市场码来源码主单':
            this.getNight_noSrc(row)
            this.hourLeave = false
            this.noAddress = false
            this.noPay = false
            this.errorCheck = false
            this.noArrive = false
            this.srcLack = true
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = false
          break;
          case '房租预审及入账':
            this.getNight_enterPreview(row)
            this.errorCheck = false
            this.noPay = false
            this.noAddress = false
            this.noArrive = false
            this.hourLeave = false
            this.noPing = false
            this.srcLack = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.repairLock = false
            this.enterPreview = true
            //进入判断开始
            if(!nowTime){
            // if(nowTime > endTime){
              this.$message({
                type:'warning',
                duration:6000,
                message:'还未到夜审时间,不能入账!'
              });
              return 
            }else if(this.is_night == true){
              // this.$router.push('/login')//跳转到登陆界面
              // this.$message.warning('夜审时间未到或者已经夜审了，不能进行批量入账操作!')
              this.$message({
                type:'warning',
                duration:4000,
                message:'夜审时间未到或者已经夜审了，不能进行批量入账操作!'
              });
            }else{
              console.log('..router',this.$router)
              this.$confirm('开始进行入账操作?','提示',{
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(()=>{
                this.enterAccount()
              }).catch(()=>{
                this.$message.info('已取消入账!')
            })}
            break;
          case '即将到期维修/锁房列表':
            this.getNight_repairLock(row)
            this.noPay = false
            this.noAddress = false
            this.noArrive = false
            this.hourLeave = false
            this.srcLack = false
            this.noPing = false
            this.qingAccount = false
            this.cancleOrder = false
            this.authorizeExpire = false
            this.cardRepeat = false
            this.enterPreview = false
            this.repairLock = true
            break;
          default:
            break;
        }
      },
      //批量入账操作 =====新版本
      enterAccount(){
        let that = this
        // let url = that.api.api_9022_9519 + '/v1/' + 'report/night_audit/batch_add_rent'
        let url = that.api.api_newPrice_9114 + '/v1/' + 'report/night_audit/add_YSFF/'
        that.$axios.post(url).then(res=>{
          console.log('res入账',res.data)
          if(res.data.message === 'success'){
            that.$message.warning('夜审入账成功')
            // this.$router.push('/login')//跳转到登陆界面
            console.log('.......')
            // that.addNight_record()//添加一条夜审记录
          }
        })

      },
      //添加一条夜审记录
      addNight_record(){
        let that = this
        let url = that.api.api_9022_9519 + '/v1/' + 'report/night_audit/add'
        let scopeParam = {
          debug :1
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('res入账',res.data)
        })
      },
      //检查是否已经夜审
      check_isNight(){
        this.is_night = false//防止干扰
        console.log('jinrurururuur')
        let that = this
        let url = that.api.api_newPrice_9114 + '/v1/' + 'report/night_audit/night_check/'
        that.$axios.get(url).then(res=>{
          console.log('resss',res.data.data.data)
          if(res.data.message == 'success'){
            this.is_night = res.data.data.data
          }else{
            this.$message.warning(res.data.message)
          }
          console.log('res检查',res.data)
        })
      },
      //当日新增无地址宾客档案列表
      getNight_noAddress(row){
        let that = this
        let url = that.api.api_9022_9519+ '/v1/' + `report/account/guests_without_address`
        that.$axios.post(url).then(res=>{
          console.log('res.data.data',res.data.data)
          row.number = res.data.data.length
          row.src = row.number == 0 ? '通过' : '异常'
          if(row.src === '异常'){
            this.$message.warning('存在异常数据!')
          }
          that.noAddressData = res.data.data
          console.log('noAddressData',that.noAddressData)
        })
      },
      //应到未到有效账务宾客列表 ===不废弃
      getNight_noPay(row){
        let that = this
        let url = that.api.api_9022_9519+ '/v1/' + `report/account/no_whole_reached_and_paid`
        that.$axios.post(url).then(res=>{
          row.number = res.data.data.length
          row.src = row.number == 0 ? '通过' : '异常'
          if(row.src === '异常'){
            this.$message.warning('存在异常数据!')
          }
          that.noPayData = res.data.data
        })
      },
      //退房未平帐的主帐信息
      getNight_noPing(row){
        // row.number= 1
        let that = this
        let url = that.api.api_newPrice_9114+ '/v1/' + `report/night_audit/check_out_but_no_closed/`
        that.$axios.get(url).then(res=>{
          try {
            row.number = res.data.data.data.length
            row.src = row.number == 0 ? '通过' : '异常'
            console.log('row.srcrow.src',row.src)
            if(row.src === '异常'){
              this.$message.warning('存在异常数据!')
            }
            that.noPingData = res.data.data.data
            console.log('that.noPingData',that.noPingData)
          } catch (error) {
            console.log('error')            
          }
        })
      },
      //异常检查
      getNight_errorCheck(){
        let that = this;
        let url = that.api.api_newPrice_9114+ '/v1/' + `report/night_audit/get_abnormal_master_base/`
        that.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
            try {
            row.number = res.data.data.data.length
            row.src = row.number == 0 ? '通过' : '异常'
            if(row.src === '异常'){
              this.$message.warning('存在异常数据!')
            }
            that.errorCheckData = res.data.data.data
            // localStorage.setItem('qingAccount',row.number)
          } catch (error) {
            console.log('error')
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      // 应离未离钟点房列表
      getNight_hourLeave(row){
        let that = this;
        let url = that.api.api_newPrice_9114 + '/v1/checkin/night_audit/get_leave_hour_night_list/';
        that.$axios({
          method: 'post',
          url: url,
        }).then((res) => {
            try {
            row.number = res.data.data.results.length
            row.src = row.number == 0 ? '通过' : '异常'
            if(row.src === '异常'){
              this.$message.warning('存在异常数据!')
            }
            that.hourLeaveData = res.data.data.results
            // localStorage.setItem('qingAccount',row.number)
          } catch (error) {
            console.log('error')
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      //应离未离宾客列表
      getNight_qingAccount(row){
        let that = this;
        // let url = that.api.api_newPrice_9114 + '/v1/checkin/get_leave_night_list/?page_size=300';
        let url = that.api.api_newPrice_9114+ '/v1/' + `report/night_audit/should_leave_without_leave/`
        that.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
            try {
            row.number = res.data.data.data.length
            row.src = row.number == 0 ? '通过' : '异常'
            if(row.src === '异常'){
              this.$message.warning('存在异常数据!')
            }
            that.qingAccountData = res.data.data.data
            // localStorage.setItem('qingAccount',row.number)
          } catch (error) {
            console.log('error')
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      //缺少市场码来源码登记单
      getNight_noSrc(row){
        let that = this
        let url = that.api.api_newPrice_9114 + '/v1/report/night_audit/without_market_code_src_code/';
        that.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
          try {
            row.number = res.data.data.data.length
            row.src = row.number == 0 ? '通过' : '异常'
            if(row.src === '异常'){
              this.$message.warning('存在异常数据!')
            }
            that.srcData = res.data.data.data
            console.log('....',that.srcData)
            // localStorage.setItem('qingAccount',row.number)
          } catch (error) {
            console.log('error')
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      //应到未到客人列表
      getNight_noArrive(row){
        let that = this
        // let url = that.api.api_newPrice_9114 + '/v1/booking/get_not_arrive_night_list/?page_size=300';
        let url = that.api.api_newPrice_9114+ '/v1/' + `report/night_audit/should_check_in_without_check_in/`
        that.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
          try {
            row.number = res.data.data.data.length
            row.src = row.number == 0 ? '通过' : '异常'
            if(row.src === '异常'){
              this.$message.warning('存在异常数据!')
            }
            that.noArriveData = res.data.data.data
            // localStorage.setItem('qingAccount',row.number)
          } catch (error) {
            console.log('error')
          }
        }).catch((err) => {
          console.error(err);
        })
      },
      //取消预订列表
      getNight_cancleOrder(row){
        let that = this
        let url = that.api.api_newPrice_9114+ '/v1/' + `booking/get_cancel_reserve_night_list/?page_size=300`
        that.$axios.post(url).then(res=>{
          row.number = res.data.data.results.length
          row.src = row.number == 0 ? '通过' : '异常'
          if(row.src === '异常'){
            this.$message.warning('存在异常数据!')
          }
          that.cancleOrderData = res.data.data.results
        })
      },
      //到期预授权
      getNight_authorize(row){
        let that = this
        let url = that.api.api_9022_9519+ '/v1/' + `report/account/expire_pre_authorized_detail`
        that.$axios.post(url).then(res=>{
          row.number = res.data.data.length
          row.src = row.number == 0 ? '通过' : '异常'
          if(row.src === '异常'){
            this.$message.warning('存在异常数据!')
          }
          that.authorizeData = res.data.data
        })
      },
      //证件号码重复登记主单
      getNight_cardRepeat(row){
        let that = this
        let url = that.api.api_9022_9519+ '/v1/' + `report/account/guests_duplicate_id_no`
        that.$axios.post(url).then(res=>{
          row.number = res.data.data.length
          row.src = row.number == 0 ? '通过' : '异常'
          if(row.src === '异常'){
            this.$message.warning('存在异常数据!')
          }
          that.cardRepeatData = res.data.data
        })
      },
      //房租预审及入账
      getNight_enterPreview(row){
        let that = this
        // let url = that.api.api_9022_9519+ '/v1/' + `report/account/check_rent_and_entry_account`
        let url = that.api.api_9022_9519+ '/v1/' + `report/night_audit/check_rent`
        that.$axios.post(url).then(res=>{
          row.number = res.data.data.length
          row.src = row.number == 0 ? '通过' : '异常'
          // if(row.src === '异常'){
            // this.$message.warning('存在异常数据!')
          // }
          that.enterPreviewData = res.data.data
        })
      },
      //即将到期维修和锁定房
      getNight_repairLock(row){
        let that = this
        let url = that.api.api_newPrice_9114+ '/v1/' + `report/get_OO_room_list/`
        that.$axios.get(url).then(res=>{
          console.log('res.data.data==repair',res.data.data.results)
          row.number = res.data.data.results.length
          row.src = row.number == 0 ? '通过' : '异常'
          if(row.src === '异常'){
            this.$message.warning('存在异常数据!')
          }
          that.repairLockData = res.data.data.results
        })
      },
      //原因与入账代码的互相控制
      controlReason(){
        if(this.previewEnterBill.payReasonValue){
        }else{
          this.$message.warning('请先选择付款原因!')
          this.previewEnterBill.enterAccountCode = ''
          return
        }
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
      //入账代码
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
       * 付款原因接口
       */
      getPayReason(){
        let that = this
        // let url= that.api.api_9022_9519+ '/v1/' + `finance/code_pay_for/info_list?page_size=999`
        let url = that.api.api_newPrice_9114+ '/v1/' + `system/settings/get_code_pay_for_list/?code_type=2&page_size=300&parent_id=`
        that.$axios({
          method : 'get',
          url : url,
        }).then(res=>{
          that.payInfoList = res.data.data.results
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
      //通过支付方式id获取相对应的扩展
      get_fields_by_payId(){
        console.log('previewEnterBill.payMode',this.previewEnterBill.payMode)
        let that = this
        let url =  that.api.api_9022_9519+ '/v1/' + 'finance/pay_mode/get_fields_by_id'
        let scopeParam ={
          model_id: that.previewEnterBill.payMode
        }
        that.$axios.post(url,scopeParam).then(res=>{
          that.extraInformation = res.data.data
          console.log('res.data相应支付',this.extraInformation)
          }).catch(error=>{
        })
      },
    }
  }
</script>
<style scoped lang="less">
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
  .warp-night{
    width: calc(100% - 58px);
    .left{
      width: 500px;
      background:rgba(234,237,241,1);
      .start-night{
        display: block; 
        margin-top: 10px; 
        margin-bottom: 120px;
        cursor: pointer;
        color: #4488E9FF;
      }
      .flagClass{
        color: #67C23A
      }
      .flagClass_2{
        color: red
      }
    }
  }
</style>
  <style scoped>
    @import "../../../assets/styles/topDialog.less";
    .warp-night>>> .left,.container aside{
      background: #FFFFFF;
    }
    .el-table>>> .warning-row {
      background: oldlace;
    }
  </style>
