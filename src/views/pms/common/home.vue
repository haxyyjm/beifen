<template>
  <!--公共头文件-->
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <router-link to="/"><img src="@/assets/logo.png" style="padding-left:8px;"></router-link>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed"></span></a>
      </div>
      <div class="topbar-title">
        <el-row v-show="$store.state.topNavState==='home'"><!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-col :span="24">
            <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="/main">主页</el-menu-item>
              <el-menu-item index="/houseStatus">房态图</el-menu-item>
              <el-menu-item index="/orderList">订单</el-menu-item>
              <el-menu-item index="/accountsReceivable">账务</el-menu-item>
              <el-menu-item index="/customer">客户</el-menu-item>
              <el-menu-item index="/marketing/cleaning-task">房务</el-menu-item>
              <el-menu-item index="/invoicing">房销</el-menu-item>
              <el-menu-item index="/reports/cashierReport">报表中心</el-menu-item>
              <el-menu-item index="" @click="setMaskShow">交接班</el-menu-item>
              <el-menu-item index="/nightaudit">夜审</el-menu-item>
              <el-menu-item index="/setting/CRS">设置</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>

      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> {{nickname}} <i class="el-icon-caret-bottom"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--隐藏层-->
        <div class="mask" v-show="maskShow">
          <div class="mask-suspen">
            <div class="mask-head">
              <label>交接班报表</label>
            </div>
            <div class="mask-body">
              <div class="mask-left">
                <el-table
                  :data="tableData"
                  border
                  stripe
                  @row-dblclick="handover_table"
                  :header-cell-style="{background:'',color:'#000000'}"
                  height="500px"
                  size="mini"
                  style="width: 100%">
                  <el-table-column
                    prop="img"
                    label="Tips">
                    <!--label="">-->
                    <template slot-scope="scope">
                      <img style="width: 20px;height: 20px"
                           :src="scope.row.img"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="report"
                    label="报表">
                  </el-table-column>
                  <!--<el-table-column
                    prop="count"
                    label="份数">
                  </el-table-column>-->
                </el-table>
              </div>
              <div class="mask-right">
                <div class="mask-right-first" style="">
                  <label style="color: black">统计条件</label>
                </div>
                <div class="mask-right-second">
                  <div>
                    <i style="color: forestgreen;">*</i><input value="营业日期" style="width: 80px;border: none;margin-right: 10px;background: #ffffff" disabled readonly/>
                    <el-date-picker
                      v-model="reservearrive"
                      type="date"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      prefix-icon="el-icon-date"
                      placeholder="选择日期"
                      size="mini" style="width: 175px;margin-left: -10px">
                    </el-date-picker>
                  </div>
                  <div>
                    <i style="color: forestgreen">*</i><input value="用户名"  style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                    <input v-model="user_name_hand" style="padding-left: 10px;color: #555555"  @click="select_user_name"/>
                  </div>
                  <div>
                    <i style="color: forestgreen">*</i><input value="班次"  style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                    <el-select v-model="scheduleValue" size="mini" placeholder="早班">
                      <el-option v-for="item in schedule" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--<div>
                    <input value="班别" style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                    <input/>
                  </div>-->
                </div>
                <div class="mask-right-three">
                  <label style="color: black">报表反馈</label>
                </div>
                <div class="mask-right-fifth">
                  <el-radio-group v-model="radioshift">
                    <el-radio :label="3">打印</el-radio>
                    <el-radio :label="6">显示</el-radio>
                    <el-radio :label="9">导出</el-radio>
                  </el-radio-group>
                </div>
                <div class="mask-right-last">
                  <textarea></textarea>
                </div>
              </div>
            </div>
            <div class="mask-bottom">
              <button @click="setMaskShow" style="background: #303a41">退出</button>
            </div>
          </div>
        </div>
        <!--遮罩层-->
      </div>

      <!--
        右侧导航栏
       -->
      <!--新建预定单-->
      <preview-dialog :parentParam='preBillParam' :show.sync= previewFormVisible  v-on:listenToPreview="getPreviewFromChild"></preview-dialog>
      <!--新建入住单-->
      <enter-dialog :parentParam='preBillParam' :show.sync= enterFormVisible  v-on:listenToPreview="getPreviewFromChild"></enter-dialog>
      <link-house-dialog :show.sync= linkHouseFornVisible :parentInfoParam='linInfoParam' v-on:listenToPreview="getPreviewFromChild"></link-house-dialog>
      <div class="rightNav column" :style="{ height: availHeight }">
        <ul class="navItem">
          <li v-for="(item,index) in rightNav" :key="index" @click="actionFun(item)">
            <img :src=" item.url " alt="">
          </li>
        </ul>
      </div>
    </el-col>
    <el-dialog class="houseTypeClass" width="20%" title="卡操作" :visible.sync="cardVisible">
        <div style="height: 40px;">
          <el-row style="text-align: center">
            <el-button type="primary" @click="readCard()">读卡</el-button>
            <!-- <el-button type="primary" @click="handleWriteCard()">销卡</el-button> -->
            <el-button type="primary" @click="handleWriteCard()">写卡</el-button>
          </el-row>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>
      <el-dialog class="houseTypeClass" width="50%" title="制卡/销卡" :visible.sync="enterCardVisible">
        <div style="height: 400px;">
          <el-table center :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"   :data="enter_cardList" height="400" >
            <el-table-column prop="room_no" label="房号"></el-table-column>
            <el-table-column label="制卡">
              <template slot-scope="scope">
                <el-button  type="primary" @click="zhi_cancleCard(scope.row,'zhi')" size="mini">制卡</el-button>
              </template>
            </el-table-column>
            <el-table-column label="销卡">
              <template slot-scope="scope">
                <el-button  type="primary" @click="zhi_cancleCard(scope.row,'remote_cancle')" size="mini">销卡</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
        </span> -->
      </el-dialog>

    <!--中间-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <!--收银员交接表 - dialog  目前不做这个-->
    <!--<el-dialog title="收银员交接表" id="print_001" :close-on-click-modal = 'false'  :visible.sync="dialogTableVisible_001">
      <el-table :data="gridData_001" size="mini">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <button @click="printObj('print_001')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>-->
    <!--前台入账明细 - dialog-->
    <el-dialog title="前台入账明细" id="print_002" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_002">
      <el-table :data="gridData_002" size="mini" height="400" :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}">
        <el-table-column property="biz_date" label="营业日期" width="150"></el-table-column>
        <el-table-column property="charge_amount" label="消费金额"></el-table-column>
        <el-table-column property="code_income_type_id.name" label="入账代码名称"></el-table-column>
        <el-table-column property="code_income_type_id.in_or_out" label="收支方向">
          <template slot-scope="scope">
            <span v-if="scope.row.code_income_type_id.in_or_out === 'in'">收</span>
            <span v-else>支</span>
          </template>
        </el-table-column>
        <el-table-column property="create_user.real_name" label="操作者"></el-table-column>
        <el-table-column property="gen_time" label="交易时间"></el-table-column>
      </el-table>
      <button @click="printObj('print_002')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--前台入账简表 - dialog-->
    <el-dialog title="前台入账简表" id="print_003" :close-on-click-modal = 'false'  :visible.sync="dialogTableVisible_003">
      <el-table :data="gridData_003" height="400" :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" size="mini">
        <el-table-column property="amount" label="amount"></el-table-column>
        <el-table-column property="code" label="代码"></el-table-column>
        <el-table-column property="count" label="数量"></el-table-column>
      </el-table>
      <button @click="printObj('print_003')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--前台入账汇总 - dialog-->
    <el-dialog title="前台入账汇总" id="print_004" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_004">
      <el-table :data="gridData_004" height="400" size="mini">
        <el-table-column property="date" label="日期"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <button @click="printObj('print_004')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--前台收款明细 - dialog-->
    <el-dialog title="前台收款明细" id="print_005" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_005">
      <el-table :data="gridData_005" height="400" :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" size="mini">
        <el-table-column property="biz_date" label="营业日期"></el-table-column>
        <el-table-column property="code_pay_for_id.name" label="付款原因" width="200"></el-table-column>
        <el-table-column property="create_user.real_name" label="操作者"></el-table-column>
        <el-table-column property="gen_time" label="交易时间"></el-table-column>
        <el-table-column property="pay_amount" label="消费金额"></el-table-column>
        <el-table-column property="pay_mode_id.model_name" label="支付方式"></el-table-column>
      </el-table>
      <button @click="printObj('print_005')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--前台收款汇总 - dialog-->
    <el-dialog title="前台收款汇总" id="print_006" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_006">
      <el-table :data="gridData_006" height="400" size="mini">
        <el-table-column property="amount" label="amount"></el-table-column>
        <el-table-column property="count" label="数量"></el-table-column>
        <el-table-column property="pay_mode" label="支付模式"></el-table-column>
      </el-table>
      <button @click="printObj('print_006')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--前台转账报表 - dialog-->
    <el-dialog title="前台转账报表" id="print_007" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_007">
      <el-table :data="gridData_007" height="400" :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" size="mini">
        <el-table-column property="from_id.room_num" label="转出房间"></el-table-column>
        <el-table-column property="to_id.room_num" label="转入房间"></el-table-column>
        <el-table-column property="transfer_type" label="转账类型">
          <template slot-scope="scope">
            <span v-if="scope.row.transfer_type === 0">手动转账</span>
            <span v-else>分账转账</span>
          </template>
        </el-table-column>
        <el-table-column property="do_flag" label="转账结果">
          <template slot-scope="scope">
            <span v-if="scope.row.do_flag === 0">支付未完成</span>
            <span v-if="scope.row.do_flag === 1">成功</span>
            <span v-if="scope.row.do_flag === 2">撤销</span>
            <span v-if="scope.row.do_flag === 3">异常</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column property="submit_biz_date" label="提交转账日期"></el-table-column>
      </el-table>
      <button @click="printObj('print_007')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--冲账调账汇总 - dialog-->
    <el-dialog title="冲账调账汇总" id="print_008" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_008">
      <el-table :data="gridData_008" :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" height="400" size="mini">
        <el-table-column property="account_id.room_num" label="房间号"></el-table-column>
        <el-table-column property="account_id.balance" label="余额"></el-table-column>
        <el-table-column property="arranged_amount" label="冲调账金额"></el-table-column>
        <el-table-column property="arranged_amount" label="冲调账类型">
          <template slot-scope="scope">
            <span v-if="scope.row.arranged_amount === 'y'">冲账</span>
            <span v-else>调账</span>
          </template>
        </el-table-column>
        <el-table-column property="related_charge_id.charge_amount" label="消费金额"></el-table-column>
        <el-table-column property="related_charge_id.code_income_type_id/name" label="消费类型"></el-table-column>
        <el-table-column property="biz_date" label="冲调账营业日期"></el-table-column>
      </el-table>
      <button @click="printObj('print_008')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--结账实收统计 - dialog-->
    <el-dialog title="结账实收统计" id="print_009" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_009">
      <el-table :data="gridData_009" size="mini">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <button @click="printObj('print_009')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--结账实收明细 - dialog-->
    <el-dialog title="结账实收明细" id="print_010" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_010">
      <el-table :data="gridData_010" size="mini">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <button @click="printObj('print_010')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--AR收款报表- dialog-->
    <el-dialog title="AR收款报表" id="print_011" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_011">
      <el-table :data="gridData_011" size="mini">
        <el-table-column property="date" label="收款" width="150"></el-table-column>
        <el-table-column property="name" label="值" width="200"></el-table-column>
        <el-table-column property="address" label="描述"></el-table-column>
      </el-table>
      <button @click="printObj('print_011')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--应收账入账总表 - dialog-->
    <el-dialog title="应收账入账总表" id="print_012" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_012">
      <el-table :data="gridData_012" size="mini">
        <el-table-column property="date" label="收款" width="150"></el-table-column>
        <el-table-column property="name" label="值" width="200"></el-table-column>
        <el-table-column property="address" label="描述"></el-table-column>
      </el-table>
      <button @click="printObj('print_012')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--应收账入账明细 - dialog-->
    <el-dialog title="应收账入账明细" id="print_013" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_013">
      <el-table :data="gridData_013" size="mini">
        <el-table-column property="date" label="收款" width="150"></el-table-column>
        <el-table-column property="name" label="值" width="200"></el-table-column>
        <el-table-column property="address" label="描述"></el-table-column>
      </el-table>
      <button @click="printObj('print_013')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--AR入账简表 - dialog-->
    <el-dialog title="AR入账简表" id="print_014" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_014">
      <el-table :data="gridData_014" size="mini">
        <el-table-column property="date" label="收款" width="150"></el-table-column>
        <el-table-column property="name" label="值" width="200"></el-table-column>
        <el-table-column property="address" label="描述"></el-table-column>
      </el-table>
      <button @click="printObj('print_014')" style="width: 80px;height: 27px;line-height: 27px;margin-top: 10px;color: #FFFFFF;border: none;border-radius: 4px;background: #4488E9">打印</button>
    </el-dialog>
    <!--用户选择-->
    <el-dialog title="请选择用户" :close-on-click-modal = 'false' :visible.sync="dialogTableVisible_user_name">
      <el-table @row-click="select_user_name_to_input" :data="gridData_user_name" :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" height="400" size="mini">
        <el-table-column property="id" label="ID"></el-table-column>
        <el-table-column property="real_name" label="姓名"></el-table-column>
        <el-table-column property="gender" label="性别"></el-table-column>
        <el-table-column property="user_name" label="昵称"></el-table-column>
      </el-table>
    </el-dialog>
  </el-row>


</template>

<script>
  import moment from 'moment'
  import previewDialog from '../houseStatus/previewDialog'
  import enterDialog from '../houseStatus/enterDialog'
  import linkHouseDialog from '../houseStatus/linkHouseDialog'
  export default {
    name: 'home',
    components: {
      'preview-dialog': previewDialog,
      'enter-dialog': enterDialog,
      'link-house-dialog': linkHouseDialog
    },
    data () {
      return {
        enter_cardList: [],//所有再住房间
        enterCardVisible: false,
        // 排班数据
        schedule: [{
          value: 'morning_shift',
          label: '早班'
        },{
          value: 'middle_shift',
          label: '中班'
        },{
          value: 'night_shift',
          label: '晚班'
        },{
          value: 'night_auditor',
          label: '夜审'
        }],
        scheduleValue: '',
        dialogTableVisible_001 : false,
        gridData_001 : [],
        dialogTableVisible_002 : false,
        gridData_002 : [],
        dialogTableVisible_003 : false,
        gridData_003 : [],
        dialogTableVisible_004 : false,
        gridData_004 : [],
        dialogTableVisible_005 : false,
        gridData_005 : [],
        dialogTableVisible_006 : false,
        gridData_006 : [],
        dialogTableVisible_007 : false,
        gridData_007 : [],
        dialogTableVisible_008 : false,
        gridData_008 : [],
        dialogTableVisible_009 : false,
        gridData_009 : [],
        dialogTableVisible_010 : false,
        gridData_010 : [],
        dialogTableVisible_011 : false,
        gridData_011 : [],
        dialogTableVisible_012 : false,
        gridData_012 : [],
        dialogTableVisible_013 : false,
        gridData_013 : [],
        dialogTableVisible_014 : false,
        gridData_014 : [],
        preBillParam: {},
        cardVisible : false,//读写卡操作
        dialogTableVisible_user_name : false,//选择用户的dialog
        hand_user_id : undefined,//用户筛选的id 默认的是undefined
        user_name_hand : '',//交接班的用户名筛选
        gridData_user_name : [],//用来筛选的用户
        linInfoParam: {},
        enterInfoBillParam: {},
        previewFormVisible: false,//预订单dialog
        enterFormVisible: false,
        linkHouseFornVisible: false,
        //日期
        reservearrive: new Date(),
        //报表选项
        radioshift:3,
        //控制显示与隐藏
        maskShow:false,
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        availHeight: '500px;',
        //表格数据
        tableData: [
          // {
          //   img: [require("@/assets/images/pms/shifting/F.png")],
          //   report: '收银员交接表',
          //   count: '1',
          //   handover_flag : '001' //用来判断用户需要查询的事件
          // },
          {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台入账明细',
            count: '1',
            handover_flag : '002'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台入账简表',
            count: '1',
            handover_flag : '003'
          }, /*{
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台入账汇总',
            count: '1',
            handover_flag : '004'
          },*/ {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台收款明细',
            count: '1',
            handover_flag : '005'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台收款汇总',
            count: '1',
            handover_flag : '006'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台转账报表',
            count: '1',
            handover_flag : '007'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '冲账调账报表',
            count: '1',
            handover_flag : '008'
          }, /*{
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '结账实收统计',
            count: '1',
            handover_flag : '009'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '结账实收明细',
            count: '1',
            handover_flag : '010'
          },*//* {
            report: '',
            count: ''
          },*/ {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: 'AR收款报表',
            count: '1',
            handover_flag : '011'
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: '应收账入账总表',
            count: '1',
            handover_flag : '012'
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: '应收账入账明细',
            count: '1',
            handover_flag : '013'
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: 'AR入账简表',
            count: '1',
            handover_flag : '014'
          },/* {
            report: '',
            count: ''
          },*/ {
            img: [require("@/assets/images/pms/shifting/R.png")],
            report: '客房中心入账汇总表',
            count: '1',
            handover_flag : '015'
          }, {
            img: [require("@/assets/images/pms/shifting/R.png")],
            report: '商务中心入账汇总表',
            count: '1',
            handover_flag : '016'
          }, /*{
            report: '',
            count: ''
          },*/ {
            img: [require("@/assets/images/pms/shifting/C.png")],
            report: '储值卡款项汇总表',
            count: '1',
            handover_flag : '017'
          }, {
            img: [require("@/assets/images/pms/shifting/C.png")],
            report: '储值卡充值明细表',
            count: '1',
            handover_flag : '018'
          }, {
            img: [require("@/assets/images/pms/shifting/C.png")],
            report: '储值卡消费明细表',
            count: '1',
            handover_flag : '019'
          }
        ],
        //右侧导航栏
        rightNav:[
          {
            url: require('@/views/pms/common/img/icon-right-user.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-setting.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-code.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-home.png'),
            action: '入住'
          },
          {
            url: require('@/views/pms/common/img/icon-right-order.png'),
            action: '预定'
          },
          {
            url: require('@/views/pms/common/img/icon-right-card.png'),
            action: '卡'
          },
          {
            url: require('@/views/pms/common/img/icon-right-duka.png'),
            action: ''
          }
        ]
      }
    },
    created() {// 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      //this.fetchNavData();
      this.availHeight = screen.availHeight +'px';
    },
    methods: {
      //制卡操作/销卡操作（直接） 还有远程销卡
      zhi_cancleCard(row,param){
        console.log('parammm',param)
        let that = this
        let url = that.api.api_price_9101 + '/v1/' + `room/room_lock/activate_card/`
        let scopeParam
        scopeParam ={
          operate_type: param =='zhi' ? 2 : 4,//1, "读卡"), (2, "写卡"), (4, "销卡"),
          start_time: row.arr_time,
          end_time: row.leave_time,
          room_no: row.room_no,
          guest_no: 0,
        }
        that.$axios.post(url,scopeParam).then(res=>{
         if(res.data.message == 'success'){
            let resUrl = res.data.data.url
            param == 'zhi' ? this.zhicard_end(resUrl) : this.cancleCard_end(resUrl)
          }else{
            that.message.error('本地服务没开启!')
          }
        }).catch(error=>{
          console.error();
        })
      },
      //最终制卡/销卡
      zhicard_end(url){
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
      //最终销卡
      cancleCard_end(url){
        url = url.replace('angular.callbacks._2','userHandler') //替换
        console.log('url获取2',url)
        // url = 'http://127.0.0.1:32727/?startTime=2019-05-29%2010:35:55&endTime=2019-05-23%2010:43:35&type=2&roomNo=522&lockNo=None&guestNum=0&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF57&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0.0&Lock_AfterHour=0.0&jsonp=userHandler'
        this.$http.jsonp(url,{
          jsonp: 'callback',//可省略
          jsonpCallback: "userHandler"
        }).then(res =>{
          console.log('json',res.body)
          if(res.body.Result === true){
            this.$message.success('销卡成功!')
          }else{
            this.$message.warning('销卡失败!')
          }
        }).catch(error=>{
          console.error();
        })
      },
      /**
       * @readCard  读卡操作
       */
      //读卡操作
      readCard(){
        console.log('..enter 开始读卡')
        let that = this
        // that.cardInfoDialog = true //读卡器失败就不打开dialog
        let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=1&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF57&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&jsonp=angular.callbacks._0`
        url = url.replace('angular.callbacks._0','userHandler') //替换
        that.$http.jsonp(url,{
          jsonpCallback: "userHandler"
        }).then(res =>{
          console.log('res.......',res.data.Data,res.data.Data.LockNo)
          console.log('res.data.Data.LockNo.slice(2)',res.data.Data.LockNo.slice(2))
          if(res.data.Data.LockNo.length<9){
            let param = '8' + res.data.Data.LockNo.slice(2)
            console.log('param',param)
            if(res.data.Result === true){
              this.$message.success('读卡成功!')//跳转页面
              this.getEnterInfoByRoom(param)//根据房间号跳转
            }else{
              that.$message.warning('读卡失败!')
            }
          }else{
            that.$message.warning('此卡为空卡!')
          }
        }).catch(error=>{
          console.error();
        })
      },
      //进入写卡销卡界面进行操作
      handleWriteCard(){
        this.getCardList()
        this.cardVisible = false
        this.enterCardVisible = true
      },
      //获取所有再住得房间cardList==OC/OD
      getCardList(){
        let that = this
        let url = that.api.api_price_9101 + '/v1/' + `room/room_status/get_room_map_list?page_size=1000`
        let scopeParams = {
          room_state__in: 'OC,OD'
        }
        that.$axios({
           method : 'get',
            url : url,
            params: scopeParams
        }).then(res=>{
          if(res.data.message === 'success'){
            that.enter_cardList = res.data.data.results
          }else{
            that.$message.error('获取数据失败!')
          }
        }).catch(error=>{
        })
      },
      /**
       * @writeCard 写卡
       */
       writeCard(){

      },
      getEnterInfoByRoom(param){
        let scopeParams = {
          room_number: param
        };
        let that = this
        // let url = `http://192.168.2.224:9005/v1/checkin/all_master_info/`
        let url = that.api.api_bill_9202 + '/v1/' + `checkin/all_master_info/`
        that.$axios({
          method : 'get',
          url : url,
          params: scopeParams
        }).then(res=>{
          if(res.data.message === 'success'){
            that.enterInfoBillParam = res.data.data.results[0]
            console.log('aaaa',res.data.data.results[0])
            that.linInfoParam = _.cloneDeep(this.enterInfoBillParam) //联房详情
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
      getPreviewFromChild(data){
        console.log('previewData中的=>改变房态为已经预定了==>home文件',data)
      },
      /**
       * @printObj 打印
       * @param printWindow 接收页面元素
       * @param printContent 写入需要打印的元素
       */
      printObj(print_element){
        let printWindow;
        let printContent = document.getElementById(print_element).innerHTML;
        printWindow = window.open('','_blank','width=500,height=300,location=0,menubar=0,status=0,toolbar=0,scrollbars=1');
        printWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="Expires" content="0"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Cache-control" content="no-cache"><meta http-equiv="Cache" content="no-cache"><meta name="keywords" content="" /><meta name="description" content="" /><title></title></head><body>');
        printWindow.document.write('<div style="width:100%; height:100%; overflow:hidden;">'+printContent+"</div>");
        printWindow.document.write("</body></html>");
        printWindow.focus();//当前新建的窗口获得焦点
        printWindow.document.close();//关闭新建窗口的文档输出流，这个是必须的，否则下面的打印语句无效
        printWindow.print();//打印当前新建窗口中的内容
        printWindow.close();//关闭新建的窗口
      },
      /**
       * @select_user_name 选择用户
       */
      select_user_name(){
        let that = this;
        that.is_show_shift = true;
        that.dialogTableVisible_user_name = true;
        let url = that.api.api_9022_9519 + '/v1/common/employee/info_list'
        that.$axios({
          method : 'get',
          url : url,
        }).then((res)=>{
          console.info(res);
          that.gridData_user_name = res.data.data.list;
        }).catch((err)=>{
          console.error(err);
        })
      },
      /**
       * @select_user_name_to_input 选择用户给input赋值
       */
      select_user_name_to_input(row){
        let that = this;
        that.dialogTableVisible_user_name = false;
        that.user_name_hand = row.real_name;
        that.hand_user_id = row.id;
      },
      /**
       * @handover_table 交接班报表点击事件
       */
      handover_table(row){
        let that = this;
        if(that.reservearrive && that.hand_user_id && that.scheduleValue){
          if(row.handover_flag === '001'){
            //打开收银员交接表  将收银员交接表的数据填充上去
            that.dialogTableVisible_001 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '002'){
            //打开前台入账明细
            that.dialogTableVisible_002 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/charge_details_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
              that.gridData_002 = res.data.data.list;
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '003'){
            //打开前台入账简表
            that.dialogTableVisible_003 = true;
            let url = that.api.api_9022_9519 + '/v1/report/account/charge_details_by_code';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
              that.gridData_003 = res.data.data;
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '004'){
            //打开前台入账汇总
            that.dialogTableVisible_004 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '005'){
            //打开前台入收款明细
            that.dialogTableVisible_005 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/pay_details_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
              that.gridData_005 = res.data.data;
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '006'){
            //打开前台收款汇总
            that.dialogTableVisible_006 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/pay_summary_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
              that.gridData_006 = res.data.data;
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '007'){
            //打开前台转账报表(转账明细)
            that.dialogTableVisible_007 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/transfer_details_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
              that.gridData_007 = res.data.data;
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '008'){
            //打开前台冲账调账报表
            that.dialogTableVisible_008 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
              that.gridData_008 = res.data.data;
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '009'){
            //打开结账实收统计
            that.dialogTableVisible_009 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '010'){
            //打开结账实收明细
            that.dialogTableVisible_010 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '011'){
            //AR收款报表
            that.dialogTableVisible_011 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '012'){
            //应收账入账简表
            that.dialogTableVisible_012 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '013'){
            //应收账入账总表
            that.dialogTableVisible_013 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else if(row.handover_flag === '014'){
            //AR入账简表
            that.dialogTableVisible_014 = true;
            let url = that.api.api_9022_9519 + '/v1/report/change_shifts_record/arrange_operation_by_date';
            that.$axios({
              method : 'post',
              url : url,
              data : {
                biz_date_begin : that.reservearrive,
                employee_id : that.hand_user_id,
                shift_id : that.scheduleValue,
              }
            }).then((res)=>{
              console.info(res);
            }).catch((err)=>{
              console.error(err);
            })
          }else{
            console.info("loading...");
          }
        }else{
            that.hintInfo('warning','请选择统计条件')
        }
        console.info(row);

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
       * @getPreviewFromChild 改变房态为已经预定了
       */
      getPreviewFromChild(data){
        console.log('previewData中的=>改变房态为已经预定了==>home文件',data)
      },
      //侧边栏点击方法
      actionFun(item){
        console.log('item',item)
        switch (item.action) {
          case '预定':
            this.previewFormVisible = !this.previewFormVisible;
            this.preBillParam = {reserve_base: {leave_time: ''}} //侧边栏点开上来就有时间 赋值 父转子 最终可能时间需要接口请求
            this.preBillParam.reserve_base.leave_time =[new Date() ,moment(new Date()).add(+1,'days').format('YYYY-MM-DD 14:00:00')]
            break;
          case '入住':
            this.enterFormVisible = !this.enterFormVisible;
            this.preBillParam = {master_base: [{leave_time: ''}]} //侧边栏点开上来就有时间 赋值 父转子
            this.preBillParam.master_base[0].leave_time =[ new Date(), moment(new Date()).add(+1,'days').format('YYYY-MM-DD 14:00:00')]
            break;
          case '卡':
            this.cardVisible = !this.cardVisible;
            break;
          default:
            break;
        }
      },
      /**
       * 控制显示与隐藏
       * @param index
       */
      setMaskShow(){
        this.maskShow = !this.maskShow;
      },
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      /*fetchNavData () { // 初始化菜单激活项
        try{
          var cur_path = this.$route.path; //获取当前路由
          console.info(cur_path);
          var routers = this.$router.options.routes; // 获取路由对象
          var nav_type = "", nav_name = "";
          for (var i = 0; i < routers.length; i++) {
            var children = routers[i].children;
            if(children){
              for (var j = 0; j < children.length; j++) {
                var grand_children = children[j].children;
                console.info(grand_children);
                if(grand_children){
                  for (var k = 0; k < grand_children.length; k++) {
                    if (grand_children[k].path === cur_path) {
                      nav_type = routers[i].type;
                      nav_name = routers[i].name;
                      break;
                    }
                    // 如果该菜单下还有子菜单
                    if(children[j].children) {
                      let grandChildren = children[j].children;
                      for(let z=0; z<grandChildren.length; z++) {
                        if(grandChildren[z].path === cur_path) {
                          nav_type = routers[i].type;
                          nav_name = routers[i].name;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          this.$store.state.topNavState = nav_type;  // 改变topNavState状态的值
          this.$store.state.leftNavState = nav_name;  // 改变leftNavState状态的值
          if(nav_type == "home"){
            this.defaultActiveIndex = "/";
          } else {
            this.defaultActiveIndex = "/" + nav_name + "Manager";
          }
        }
        catch (e) {
          console.info(e);
        }

      },*/

      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){
        //logout
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          localStorage.removeItem('access-user');
          that.$router.go('/login'); //用go刷新
          console.info('passing');
          //调取注销的接口
          that.$axios({
             method : 'get',
             url : that.api.api_9022_9519 + '/v1/common/employee/logout',
          }).then((res)=>{
             console.info(res);
          }).catch((err)=>{
             console.error(err);
          });
        }).catch(() => {});
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    },
    /* watch: {
       '$route': 'fetchNavData'  //监听router值改变时，改变导航菜单激活项
     }*/
  }
</script>
<style lang="less" scoped>
  .rightNav{
    background: #373d41;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 99;
  }
  .navItem{
    width: 38px;
    height: 38px;
    margin: 10px;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    //这里的颜色是直接可以设置背景透明的，为什么不用opacity关键字的原因是这个关键字会导致一个子继承父透明度的问题
    background: rgba(7, 13, 32, 0.2);
    top: 0;
    left: 0;
    z-index: 998;
    //悬浮框样式
    .mask-suspen {
      background: #F5F5F5;
      width: 80%;
      height: 80%;
      position: fixed;
      z-index: 999;
      top: 10%;
      left: 10%;
      //头部样式
      .mask-head{
        height: 40px;
        background: #303A41;
        line-height: 40px;
        label{
          color: #ffffff;
          margin-left: 10px;
        }
      }
      //table层的样式
      .mask-body{
        border-bottom: 1px solid #CCCCCC;
        //table样式
        .mask-left{
          float: left;
          margin-top: 10px;
          margin-left: 10px;
          margin-bottom: 10px;
          width: 65%;
        }
        //右侧统计条件样式
        .mask-right{
          height: 500px;
          float: left;
          margin-left: 10px;
          margin-top: 10px;
          width: 33%;
          .mask-right-first{
            label{
              margin-left: 20px;
            }
          }
          .mask-right-second{
            border: 1px solid #CCCCCC;
            background: #ffffff;
            margin-top: 10px;
            padding-left: 10px;
            input{
              margin-left: 1px;
              height: 27px;
              width: 175px;
              margin-top: 10px;
              margin-bottom: 10px;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
          }
          .mask-right-three{
            margin-top: 10px;
            label{
              margin-left: 20px;
            }
          }
          .mask-right-fifth{
            height: 86px;
            line-height: 100px;
            margin-top: 10px;
            padding-left: 20px;
            background: #ffffff;
            border: 1px solid #CCCCCC;
          }
          .mask-right-last{
            margin-top: 10px;
            height: 70px;
            textarea{
              width: 100%;
              height: 100%;
              border: 1px solid #CCCCCC;
            }
          }
        }
      }
      //底部样式
      .mask-bottom{
        button{
          float: right;
          margin-right: 10px;
          margin-top: 10px;
          height: 27px;
          width: 100px;
          border: none;
          color: #ffffff;
          line-height: 27px;
          background: #4488E9;
          border-radius: 4px;
        }
      }
    }
  }
</style>
<style scoped>
  /*.el-menu{text-align: center}*/
  .el-menu--horizontal>.el-menu-item.is-active{border-bottom:5px solid #409EFF}
  .houseTypeClass>>> .el-dialog__header{
    background-color: #8895A8;
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
</style>

