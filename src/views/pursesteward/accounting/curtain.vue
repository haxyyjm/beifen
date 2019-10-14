<template>
    <div class="curtain">
      <!--头部的搜索-->
     <ul class="title">
       <!--<li >-->
         <!--<span style="margin-left: 10px">入账代码 : </span>-->
         <!--<el-select v-model="net_code"   clearable  placeholder="请选择"   >-->
           <!--<el-option-->
             <!--v-for="item in enter_list"-->
             <!--:key="item.value"-->
             <!--:label="item.name"-->
             <!--:value="item.id">-->
           <!--</el-option>-->
         <!--</el-select>-->
       <!--</li>-->
       <li>
         <div class="block">
           <span class="demonstration">营业日期起 :</span>
           <el-date-picker
             style="width: 150px;"
             clearable
             v-model="business_date"
             type="date"
             placeholder="选择日期">
           </el-date-picker>
         </div>
       </li>
       <li>
         <div class="block">
           <span class="demonstration">营业日期止 :</span>
           <el-date-picker
             style="width: 150px;"
             clearable
             v-model="closing_date"
             type="date"
             placeholder="选择日期">
           </el-date-picker>
         </div>
       </li>
       <li>
         <span style="margin-right: 10px">AR帐</span>
         <el-checkbox v-model="ar_checked"></el-checkbox>
       </li>
       <li style="margin-left: 20px">
       <span style="margin-right: 10px">含分账前主账户</span>
       <el-checkbox v-model="before_fashionable"></el-checkbox>
     </li>
       <li style="margin-left: 30px">
         <span style="margin-right: 10px">已平账户</span>
         <el-checkbox v-model="account_checked"></el-checkbox>
       </li>
       <li>
         <button>并账</button>
       </li>
     </ul>
      <!--账户种类 状态 ... -->
      <div class="status" style="height: 50%">
        <el-table
          ref="multipleTable"
          :data="major_list"
          tooltip-effect="dark"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;margin-top: 10px"
          size="mini"
          height="100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            >
          </el-table-column>

          <el-table-column
            prop="id"
            label="账户id">
          </el-table-column>

          <el-table-column
            prop="reference_link_label"
            width="120"
            column-key="name"
            :filters="reference_link"
            :filter-method="filterHandler"
            label="主账户/子账户">
            <template slot-scope="scope">
              <span v-if="scope.row.reference_link_label === 0">主账户</span>
              <span v-else>子账户</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="sub_account_count"
            label="子账户数量">
          </el-table-column>
          <el-table-column
            prop="account_type"
            label="账户种类"
            width="100"
            column-key="name"
            :filters="account_data"
            :filter-method="filterHandler"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.account_type === 1">AR账户</span>
              <span v-else>正常账户</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="对应业务类型"-->
            <!--width="120">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="reference_link_label"
            label="业务主体">
            <template slot-scope="scope">
              <span v-if="scope.row.reference_link_label ===0">预定单账户</span>
              <span v-else-if="scope.row.reference_link_label ===1">入住单</span>
              <span v-else-if="scope.row.reference_link_label ===2">分账后的账户</span>
              <span v-else-if="scope.row.reference_link_label ===3">购物</span>
              <span v-else>餐饮</span>
            </template>
          </el-table-column>


          <el-table-column
            prop="account_status"
            label="账户状态"
            width="100"
            column-key="name"
            :filters="account_major_data"
            :filter-method="filterHandler"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.account_status ===0">正常进行中</span>
              <span v-else-if="scope.row.account_status ===1">已平帐</span>
              <span v-else-if="scope.row.account_status ===2">已取消</span>
              <span v-else>异常</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="biz_date"
            width="120"
            label="营业日期">
          </el-table-column>

          <el-table-column
            prop="gen_time"
            width="140"
            label="业务时间">
          </el-table-column>


          <!--<el-table-column-->
            <!--prop="module_id"-->
            <!--label="对应模块"-->
            <!--width="100"-->
            <!--column-key="name"-->
            <!--:filters="module_list"-->
            <!--:filter-method="filterHandler"-->
          <!--&gt;-->
            <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.module_id ===0">9527</span>-->
              <!--<span v-else-if="scope.row.account_status ===1">已平帐</span>-->
              <!--<span v-else-if="scope.row.account_status ===2">已取消</span>-->
              <!--<span v-else>异常</span>-->
            <!--</template>-->
          <!--</el-table-column>-->



          <el-table-column
            prop="team_flag"
            label="是否团队"
            width="100"
            column-key="name"
            :filters="team_flag_data"
            :filter-method="filterHandler"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.team_flag ===0">非团队账户</span>
              <span v-else>团队账户</span>
            </template>
          </el-table-column>

            <!-- :filters="account_data"-->
          <el-table-column
            prop="market_id"
            label="对应市场"
            width="100"
            column-key="name"

            :filter-method="filterHandler"
          >
          </el-table-column>

          <el-table-column
            prop="total_consumption"
            label="总消费"
          >
          </el-table-column>
          <el-table-column
            prop="pay_sum"
            label="支付款"
          >
          </el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
          >
          </el-table-column>
          <el-table-column
            prop="total_invoice"
            label="总开票"
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="早餐"-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            prop="name"
            label="摘要"
          >
          </el-table-column>

          <el-table-column
            prop="address"
            fixed="right"
            width="120"
            label="操作"
            >
            <template slot-scope="scope">
                <div>
                 <span style="color: #4488E9;cursor:default" >分账</span>
                  <span style="color: #4488E9;cursor:default">调账</span>
                  <span style="color: #4488E9;cursor:default">平帐</span>
                  <br>
                  <span style="color: #4488E9;cursor:default">付钱</span>
                  <span style="color: #4488E9;cursor:default">开票</span>
                  <span style="color: #4488E9;cursor:default">查账</span>
                </div>
            </template>


          </el-table-column>
        </el-table>
        <!--<div >-->
          <!--<el-button @click="toggleRowSelection(major_list )">选中状态</el-button>-->
          <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
        <!--</div>-->

        <!--分页-->
        <el-pagination style="float: right;margin-right: 2%"
                       layout="prev, pager, next"
                       :page-size="pagesize_advocate"
                       @current-change="handle_advocate"
                       :total="total_advocate">
        </el-pagination>
      </div>
      <!--消费清单 ,收支记录-->
      <div class="shopping">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" size="mini">
          <!--消费清单-->
          <el-tab-pane label="消费清单" name="first">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>收支种类 : </span>
                <el-select v-model="sub_account"  clearable  placeholder="请选择"   >
                  <el-option
                    v-for="item in enter_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    clearable
                    v-model="business_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    clearable
                    v-model="stop_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">含已结</span>
                <el-checkbox v-model="finished"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">含已挂 : </span>
                <el-checkbox v-model="hung"></el-checkbox>
              </li>
            </ul>
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="recorded_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="account_id"
                  label="主帐id">
                </el-table-column>

                <el-table-column
                  prop="code_income_type_id"
                  label="收/支"
                  column-key="name"

                >
                  <!--:filters="break_data"-->
                  <!--:filter-method="filterHandler"-->
                  <template slot-scope="scope">
                    <span v-if="scope.row.code_income_type_id.in_or_out === 'in'">收</span>
                    <span v-else>支</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="code_income_type_id.name"
                  label="收支种类">
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="desc"-->
                  <!--label="收支详情">-->
                <!--</el-table-column>-->
                <el-table-column
                  prop="pay_status"
                  label="支付状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.pay_status === 0">未付</span>
                    <span v-else-if="scope.row.pay_status === 1">结清</span>
                    <span v-else-if="scope.row.pay_status === 1">挂账/AR支付</span>
                    <span v-else-if="scope.row.pay_status === 1">部分支付</span>
                    <span v-else>异常</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="charge_amount"
                  label="应收支金额">
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="优惠金额">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="优惠原因">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="其它费用">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="服务费">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="税费附加">-->
                <!--</el-table-column>-->
                <el-table-column
                  prop="pay_amount"
                  label="实际收支">
                </el-table-column>
                <el-table-column
                  prop="name"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" >付款</span>
                      <span style="color: #4488E9;cursor:default">开票</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>

          <!--收支记录-->
          <el-tab-pane label="收支记录" name="second">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>入账代码 : </span>
                <el-select v-model="sub_account" placeholder="请选择"  >
                  <el-option
                    v-for="item in enter_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="business_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="stop_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">收入 ：</span>
                <el-checkbox v-model="finished"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">支出 : </span>
                <el-checkbox v-model="hung"></el-checkbox>
              </li>
            </ul>
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="income_and_expenses"
                :header-cell-style="{background:'#68819EFF',color:'white',}"
                size="mini"
                height="200"
                style="width: 100%;">
                <el-table-column
                  prop="name"
                  label="收/支"
                  width="100"
                  column-key="name"
                  :filters="break_data"
                  :filter-method="filterHandler"
                >
                </el-table-column>

                <el-table-column
                  prop="name"
                  label="对方账户类型"
                  width="120"
                  column-key="name"
                  :filters="account_data"
                  :filter-method="filterHandler"
                >
                </el-table-column>

                <el-table-column
                  width="150"
                  >
                  <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入对方账户"/>
                  </template>
                  <template slot-scope="scope">

                    <el-table-column
                      prop="name"
                      label="对方账号"  >
                      {{scope.row.name}}
                    </el-table-column>

                  </template>
                </el-table-column>


                <el-table-column
                  prop="address"
                  label="收支原因">
                  <template slot-scope="scope">
                    <el-tag

                     style="border: none;   background-color:transparent;color: #777777">{{scope.row.address}}</el-tag>
                  </template>
                </el-table-column>

               <!--收支原因-->
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="收支原因">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>

                    </el-form>
                  </template>
                </el-table-column>



                <el-table-column
                  prop="name"
                  label="收支状态">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="付款方式">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="收支金额">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="营业日期">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="收银点">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核状态">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核人">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="审核时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px" >开票</span>
                      <span style="color: #4488E9;cursor:default">核实</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>

          <!--查帐记录-->
          <el-tab-pane label="查账记录" name="third">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="examine_accounts"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="account_id"
                  label="主帐id">
                </el-table-column>

                <el-table-column
                  prop="biz_date"
                  label="查账时的营业日期">
                </el-table-column>
                <el-table-column
                  prop="check_time"
                  label="查账时间">
                </el-table-column>
                <el-table-column
                  prop="check_user.real_name"
                  label="账务检查">
                </el-table-column>
                <el-table-column
                  prop="account_id.id"
                  label="被检查账户">
                </el-table-column>
                <el-table-column
                  prop="check_reason_id.name"
                  label="查账原因">
                </el-table-column>
                <el-table-column
                  width="300"
                  prop="check_reason_id.desc"
                  label="查账说明">
                </el-table-column>
                <el-table-column
                  prop="check_reason_id"
                  label="查账操作状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.check_reason_id ===0">未操作</span>
                    <span v-else-if="scope.row.check_reason_id ===1">通过</span>
                    <span v-else>不通过</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" >付款</span>
                      <span style="color: #4488E9;cursor:default">开票</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>

          <!--分账记录-->
          <el-tab-pane label="分账记录" name="routing">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="general_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="before_sub_account"
                  label="主帐id">
                </el-table-column>
                <el-table-column
                  prop="account_type"
                  label="账户种类">
                  <template slot-scope="scope">
                    <span v-if="scope.row.account_type === 1">AR账户</span>
                    <span v-else>正常账户</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sub_account_count"
                  label="子账户数量">
                </el-table-column>
                <el-table-column
                  prop="modify_time"
                  label="操作时间">
                </el-table-column>
                <el-table-column
                  prop="dept_id.name"
                  label="操作部门">
                </el-table-column>
                <el-table-column
                  prop="create_user.user_name"
                  label="操作用户">
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" >付款</span>
                      <span style="color: #4488E9;cursor:default">开票</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>

          </el-tab-pane>

           <!--并账-->
          <el-tab-pane label="并账记录" name="booked">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="and_curtain_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                height="200"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="main_combine_account_id"
                  label="主帐id">
                </el-table-column>

                <el-table-column
                  prop="account_type"
                  label="账户状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.account_type === 1">AR账户</span>
                    <span v-else>正常账户</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="before_combine_account_count"
                  label="子账户数量">
                </el-table-column>

                <el-table-column
                  prop="modify_time"
                  label="操作时间">
                </el-table-column>
                <el-table-column
                  prop="dept_id.name"
                  label="操作部门">
                </el-table-column>
                <el-table-column
                  prop="create_user.user_name"
                  label="操作用户">
                </el-table-column>

                <el-table-column
                  prop="name"
                  width="120"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <div style=" height:44px;display: inline-block; ">
                      <span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" >付款</span>
                      <span style="color: #4488E9;cursor:default">开票</span>
                      <span style="color: #4488E9;cursor:default">挂AR</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>

          </el-tab-pane>

          <!--冲调帐-->
          <el-tab-pane label="冲调帐记录" name="brew">
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="brew_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini"
                height="200"
                style="width: 100%;">
                <el-table-column
                  prop="account_id"
                  label="主帐id">
                </el-table-column>
                <el-table-column
                  prop="arrange_flag"
                  label="操作类型"
                  column-key="name"
                  :filters="brew_data"
                  :filter-method="filterHandler"
                >

                  <template slot-scope="scope">
                    <span v-if="scope.row.arrange_flag === 'x'">调账</span>
                    <span v-else>冲账</span>
                  </template>

                </el-table-column>
                <el-table-column
                  prop="balance_after_arranged"
                  label="余额">
                </el-table-column>
                <el-table-column
                  prop="arranged_amount"
                  width="140"
                  label="冲调金额（可正可负）">
                </el-table-column>

                <el-table-column
                  prop="reason"
                  label="冲调原因">
                  <template slot-scope="scope">
                    <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.reason}}</el-tag>
                  </template>
                </el-table-column>

                <!--冲调原因-->
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="冲调原因 : ">
                        <span>{{ props.row.reason }}</span>
                      </el-form-item>

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="done_flag "
                  label="完成状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.done_flag === 1"> 成功</span>
                    <span v-else-if="scope.row.done_flag === 2">撤销</span>
                    <span v-else>异常</span>
                  </template>
                </el-table-column>status
                <el-table-column
                  prop="balance_after_arranged"
                  width="120"
                  label="冲调之后余额">
                </el-table-column>
                <el-table-column
                  prop="cashier.desc"
                  label="调账点">
                </el-table-column>
                <el-table-column
                  prop="gen_user.user_name"
                  label="调账人">
                </el-table-column>

                <el-table-column
                  prop="biz_date"
                  width="130"
                  label="营业日期">
                </el-table-column>
                <el-table-column
                  prop="arrange_time"
                  width="150"
                  label="时间">
                </el-table-column>

                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--width="120"-->
                  <!--fixed="right"-->
                  <!--label="操作">-->
                  <!--<template slot-scope="scope">-->
                    <!--<div style=" height:44px;display: inline-block; ">-->
                      <!--<span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px" >通过</span>-->
                      <!--<span style="color: #4488E9;cursor:default">不通过</span>-->
                    <!--</div>-->
                  <!--</template>-->
                <!--</el-table-column>-->

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>

          </el-tab-pane>

          <!--催账-->
          <el-tab-pane label="催账记录" name="payment ">
            <!--催账 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="payment_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini"
                height="200"
                style="width: 100%;">
                <el-table-column
                  prop="account_id"
                  label="主帐">
                </el-table-column>
                <el-table-column
                  prop="send_time"
                  label="催账日期"
                  width="150"
                  column-key="name"
                  :filters="account_data"
                  :filter-method="filterHandler"
                >
                </el-table-column>
                <el-table-column
                  prop="receive_name"
                  label="催账对象">
                </el-table-column>
                <el-table-column
                  prop="balance"
                  label="欠款金额">
                </el-table-column>
                <el-table-column
                  prop="code_msg_by_id.name"
                  label="通知方式">
                </el-table-column>
                <el-table-column
                  width="130"
                  prop="msg_to_phone"
                  label="手机号码">
                </el-table-column>
                <el-table-column
                  width="130"
                  prop="msg_to_tel"
                  label="电话号码">
                </el-table-column>
                <el-table-column
                  prop="msg_to_wx"
                  width="130"
                  label="微信号码">
                </el-table-column>

                <el-table-column
                  prop="msg_to_mail"
                  width="130"
                  label="电子邮件">
                </el-table-column>

                <el-table-column
                  prop="msg"
                  label="通知信息">
                  <template slot-scope="scope">
                    <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.msg}}</el-tag>
                  </template>
                </el-table-column>

                <el-table-column type="expand">

                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="通知信息 : ">
                        <span>{{ props.row.msg }}</span>
                      </el-form-item>

                    </el-form>
                  </template>
                </el-table-column>



                <el-table-column
                  prop="send_result"
                  label="发送结果">
                </el-table-column>

                <el-table-column
                  prop="send_user.user_name"
                  label="催账人">
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="send_time"-->
                  <!--width="150"-->
                  <!--label="催账时间">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="催账次数">-->
                <!--</el-table-column>-->
                <el-table-column
                  prop="create_user.user_name"
                  label="创建者">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  width="150"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  prop="modify_user.user_name"
                  label="修改人">
                </el-table-column>
                <el-table-column
                  prop="modify_time"
                  width="150"
                  label="修改时间">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  width="120"
                  fixed="right"
                  label="备注">
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!--平账-->
          <el-tab-pane label="平帐记录" name="accounts">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>入账代码 : </span>
                <el-select v-model="sub_account" placeholder="请选择"   >
                  <el-option
                    v-for="item in enter_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="business_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="stop_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">已结</span>
                <el-checkbox v-model="finished"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">已转未结 : </span>
                <el-checkbox v-model="hung"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">已冲账 : </span>
                <el-checkbox v-model="balance"></el-checkbox>
              </li>
              <li><button>搜索</button></li>
            </ul>
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="income_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini"
                height="200"
                style="width: 100%;">
                <el-table-column
                  prop="account_id"
                  label="主帐id">
                </el-table-column>
                  <el-table-column
                    prop="account_id.account_type"
                    label="账户类型"
                    width="100"
                    column-key="name"
                    :filters="account_data"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_id.account_type === 0">普通账户</span>
                      <span v-else>AR账户</span>
                    </template>

                  </el-table-column>

                <el-table-column
                  prop="close_type"
                  label="平帐类型"
                  width="100"
                  column-key="name"
                  :filters="handle"
                  :filter-method="filterHandler">
                  <template slot-scope="scope">
                    <span v-if="scope.row.close_type === 0">结账</span>
                    <span v-else-if="scope.row.close_type === 1">转账</span>
                    <span v-else-if="scope.row.close_type === 2">冲账</span>
                    <span v-else>其它</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="biz_date"
                  width="150"
                  label="营业日期">
                </el-table-column>
                <el-table-column
                  prop="charge_sum"
                  label="总消费">
                </el-table-column>
                <el-table-column
                  prop="pay_sum"
                  label="总付款">
                </el-table-column>
                <el-table-column
                  prop="balance"
                  label="余额">
                </el-table-column>
                <el-table-column
                  prop="status"
                  width="120"
                  label="平帐完成标志">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 0">支付未完成</span>
                    <span v-else-if="scope.row.status === 1">成功</span>
                    <span v-else-if="scope.row.status === 2">撤销</span>
                    <span v-else>异常</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cashier"
                  label="平帐点">
                </el-table-column>
                <el-table-column
                  prop="close_time"
                  width="150"
                  label="平帐时间">
                </el-table-column>
                <el-table-column
                  prop="gen_user.user_name"
                  label="平帐人">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  width="120"
                  fixed="right"
                  label="备注">
                </el-table-column>

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
                             :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!--转账-->
          <el-tab-pane label="转帐记录" name="transfer_accounts ">
            <!--头部的搜索-->
            <ul class="shopping_title">
              <li >
                <span>入账代码 : </span>
                <el-select v-model="sub_account" placeholder="请选择"   >
                  <el-option
                    v-for="item in enter_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期起 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="business_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">营业日期止 :</span>
                  <el-date-picker
                    style="width: 150px;"
                    v-model="stop_time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span style="margin-right: 10px">已结</span>
                <el-checkbox v-model="finished"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">已转未结 : </span>
                <el-checkbox v-model="hung"></el-checkbox>
              </li>
              <li>
                <span style="margin-right: 10px">已冲账 : </span>
                <el-checkbox v-model="balance"></el-checkbox>
              </li>
              <li><button>搜索</button></li>
            </ul>
            <!--账户种类 状态 ... -->
            <div class="status" style="margin-top: 10px">
              <el-table
                :data="transfer_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini"
                height="200"
                style="width: 100%;">
                <el-table-column
                  prop="split_account_operation_id"
                  label="主帐id">
                </el-table-column>
                <el-table-column
                  prop="from_id"
                  label="转出账户">
                </el-table-column>
                <el-table-column
                  prop="to_id"
                  label="转入账户">
                </el-table-column>
                <el-table-column
                  prop="do_flag"
                  label="转账结果">
                  <template slot-scope="scope">
                    <span v-if="scope.row.do_flag === 0">结账</span>
                    <span v-else-if="scope.row.do_flag === 1">转账</span>
                    <span v-else-if="scope.row.do_flag === 2">冲账</span>
                    <span v-else>其它</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="transfer_type"
                  width="130"
                  label="转账类型"
                  column-key="name"
                  :filters="do_flag"
                  :filter-method="filterHandler">
                  <template slot-scope="scope">
                    <span v-if="scope.row.do_flag=== 0">普通</span>
                    <span v-else>分账转账</span>
                  </template>
                </el-table-column>
                <el-table-column
                  width="150"
                  prop="submit_biz_date"
                  label="提交转账的营业日期">
                </el-table-column>
                <el-table-column
                  prop="submit_user.real_name"
                  label="提交者">
                </el-table-column>
                <el-table-column
                  prop="submit_time"
                  width="150"
                  label="转账提交时间">
                </el-table-column>
                <el-table-column
                  prop="cashier.desc"
                  width="150"
                  label="提交转账的收银点">
                </el-table-column>
                <el-table-column
                  prop="cancel_biz_date"
                  width="140"
                  label="撤销转账的营业日期">
                </el-table-column>
                <el-table-column
                  prop="cancel_reason_id"
                  width="150"
                  label="撤销转账的原因">
                </el-table-column>
                <el-table-column
                  prop="cancel_time"
                  width="150"
                  label="撤销转账的操作时间">
                </el-table-column>

                <el-table-column
                  prop="cancel_user"
                  label="撤销者">
                </el-table-column>
                <el-table-column
                  prop="cancel_cashier"
                  width="150"
                  label="撤销转账的收银点">
                </el-table-column>
                <!--<el-table-column-->

                  <!--prop="cancel_cashier"-->
                  <!--widrh="170"-->
                  <!--label="备注">-->
                <!--</el-table-column>-->

              </el-table>

              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             @current-change="general_minute"
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
        name: "curtain",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          Edite : true, //标志位 判断的是新增还是更新
          api_data:'',//子账户的分页url
          //主账户状态
          account_major_data:[
            {
              value: 0,
              text: '正常进行中'
            },
            {
              value: 1,
              text: '已平帐'
            },
            {
              value: 2,
              text: '已取消'
            },
            {
              value: 3,
              text: '异常'
            },
          ],
          //主账户是否团队
          team_flag_data:[
            {
              value: 0,
              text: '非团队账户'
            },
            {
              value: 1,
              text: '团队账户'
            },
          ],
          branch_data:'',//父组件传递的id
          advocate_id:[], //主账户点击后选中的id


          //账户类型
          account_data:[
            {
              value: 0,
              text: '正常账户'
            },
            {
              value: 1,
              text: 'AR账户'
            }
          ],
          //操作类型
          handle:[
            {
              value: 0,
              text: '结账'
            },
            {
              value: 1,
              text: '转账'
            },
            {
              value: 2,
              text: '冲账'
            },
            {
              value: 3,
              text: '其它'
            },
          ],
          //冲调帐操作类型
           brew_data:[
             {
               value: "x",
               text: '调账'
             },
             {
               value: "y",
               text: '冲账'
             },
           ],
          //主账户/子账户
          reference_link:[

            {
              value: 0,
              text:'主帐户'
            },
            {
              value: 1,
              text: '子账户'
            }
          ],
          //分账并账
          points_data:[
            {
              value: 1,
              text: '分账'
            },
            {
              value: 0,
              text: '并账'
            },
          ],
          //分账上的收支
          break_data:[
            {
              value: 'in',
              text: '收'
            },
            {
              value: 'out',
              text: '支'
            },
          ],
          //转账类型
          do_flag_data:[
            {
              value: 0,
              text: '普通'
            },
            {
              value: 1,
              text: '分账转账'
            },
          ],
          /*
          * 主帐的筛选
          * */
          net_code: '',//主帐的入账代码的筛选
          business_date: '',//主帐营业日期起
          closing_date:'',//主帐营业日期止
          ar_checked:'',//ar帐
          before_fashionable:'',//含分账前主账户
          account_checked:'',//已平帐户
          /*
          * 分账的筛选
          * 消费清单/收支记录/结转平帐记录    用过以后清空
          *
          * */
          sub_account:'',//分账的入账代码的筛选
          business_time:'',//分账的营业日期起
          stop_time:'',//分账的营业日期止
          finished:'',//已结
          hung:'',//已挂
          balance:'',//结转平帐记录的已冲账
          //分页
          total:1,
          pagesize:10,
          //主帐分页
          total_advocate:10,
          pagesize_advocate:10,
          //消费清单
          activeName2: 'first',
          content:'账户种类',//表头下拉
          search:'',//收支记录里的输入框
          /*
          * 子账户表头对应的数据
          * */
          recorded_list:[],//消费清单记录
          income_and_expenses:[], //收支记录
          examine_accounts:[],//查账记录
          general_list:[],//分账记录
          and_curtain_list:[],//并账记录
          brew_list:[],//冲调帐记录
          payment_list:[],//催账记录
          income_list:[],//平帐记录
          transfer_list:[],//转账记录




          major_list:[],//主帐信息列表
          enter_list:[],//获取入账代码
          module_list:[],//获取模块
          dataarr:[],

        }

      },
      props:['branch_id'],
      watch:{
        //  父级传过来的部门id
        branch_id:function (newData,oldData) {
          this.branch_data=newData
          console.log(newData);
          this.major_account();//主帐信息列表
        }
      },
      created:function () {
        let that=this;
        that.income_code();//获取入账代码
        that. module_list_methods();//获取模块



      },
      methods: {
          //账户状态
        toggleRowSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);

            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        //选中某一项的主帐展示分账
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(val);
          // advocate_id
          let advocate_arr = [];
          let that = this ;
         for (let item  in val){
           if(val[item].id){
             advocate_arr.push(val[item].id);
           }
         }

          that.advocate_id = new Set(advocate_arr)
          console.log(that.advocate_id);

        },


        //消费清单的table
        handleClick(tab, event) {
          console.log(tab, event);
          let that = this;
          if(tab.index==="0"){
            //获取消费清单
            that.enter_code();
            that.api_data='http://47.98.113.173:9519/v1/finance/charge_detail/get_by_account_ids'
          } else if(tab.index==="1"){
          //获取收支记录
            that.income_expenses()

          } else if(tab.index==="2"){
            //获取查账记录
            that.audit_accounts();
            that.api_data='http://47.98.113.173:9519/v1/finance/check_account_operation/get_by_account_ids'
          }else if(tab.index==="3"){
           //获取分账记录
          that.general_ledger();
            that.api_data='http://47.98.113.173:9519/v1/finance/account/get_sub_accounts'
         }else if(tab.index==="4"){
         //  获取并账记录
           that.and_curtain();
            that.api_data='http://47.98.113.173:9519/v1/finance/combine_account_operation/get_by_account_ids'
         }else if(tab.index==="5"){
            //  获取冲调帐记录
            that.brew_account();//冲调帐
            that.api_data='http://47.98.113.173:9519/v1/finance/arrange_account_operation/get_by_account_ids'
          } else if(tab.index==="6"){
            //  获取催账记录
            that.urge_payment();//催账记录
            that.api_data='http://47.98.113.173:9519/v1/finance/account_message/get_by_account_ids'
          } else if(tab.index==="7"){
            //  获取平帐记录
            that.flat_curtain();//平帐记录
            that.api_data='http://47.98.113.173:9519/v1/finance/account_close_operation/get_by_account_ids'
          }else if(tab.index==="8"){
            //获取转账记录
            that.transfer_voucher();
            that.api_data='http://47.98.113.173:9519/v1/finance/transfer_accounts_detail/get_by_account_ids'
          }



        },
        //表头下拉框
        resetDateFilter() {
          this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
          return row.address;
        },
        filterTag(value, row) {
          return row.tag === value;

        },

        filterHandler(value, row, column) {
          console.log(value, row, column);
          const property = column['property'];
          return row[property] === value;
        },

        //封装主帐信息列表
        major_account(){
          let that=this
          console.log(that.branch_data);
          that.$axios({
            url: that.api+"/v1/finance/account/get_list_by_dept",
            method: "post",
           data:{
              dept_id:that.branch_id
           },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.major_list=res.data.data.list
                that.total_advocate=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //点击主帐上分页上的页数
        handle_advocate(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url:  that.api+"/v1/finance/account/get_list_by_dept",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize_advocate
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.major_list=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },

        //封装获取入账代码
        income_code(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/incoming_account_code/info_list",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.enter_list=res.data.data.list
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        //封装获取模块信息
        module_list_methods(){
          let that = this;
          //获取树形结构数据
          that.$axios({
            url: ""+that.api+"/v1/common/module/get_tree",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data)
                that.dataarr = res.data.data.map((res,index)=>{
                  return {
                    text : res.name,
                    value : res.id,
                  }
                })
                console.info(that.dataarr);
                that.module_list = that.dataarr;
              }
              else{
                console.log(res.data.message);
              }

              // that.newlists=res.data.data
            })
            .catch(error=>{
              console.log(error);
            });


        },

        //封装错误信息
        error_message(msg){
          this.$message.error('错了哦，错误消息为'+msg);
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/finance/account/get_list_by_dept",
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
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.major_list=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },






        //封装获取消费清单
        enter_code(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/charge_detail/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.recorded_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },
        //封装获取收支记录----暂时不写，不知道写什么
        income_expenses(){
          let that=this;
          that.$axios({
            url: that.api+"/v1/finance/combine_account_operation/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data)
                that.and_curtain_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装查账记录
        audit_accounts(){
          let that=this;
          that.$axios({
            url: that.api+"/v1/finance/check_account_operation/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data)
                that.examine_accounts=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装分账记录
        general_ledger(){
          let that=this;
          that.$axios({
            url: that.api+"/v1/finance/account/get_sub_accounts",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.general_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装并账记录
        and_curtain(){
          let that=this;
          that.$axios({
            url: that.api+"/v1/finance/combine_account_operation/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data)
                that.and_curtain_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装冲调帐记录
        brew_account(){
          let that=this;
          that.$axios({
            url: that.api+"/v1/finance/arrange_account_operation/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.brew_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装催账记录
        urge_payment(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/account_message/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.payment_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },
        // 封装平帐记录
        flat_curtain(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/account_close_operation/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //转账记录
        transfer_voucher(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/transfer_accounts_detail/get_by_account_ids",
            method: "post",
            data:{
              account_ids:JSON.stringify(that.advocate_id),
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.transfer_list=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        /*
        分页
         */
        //子账记录的分页
        general_minute(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url:that.api_data,
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
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.general_list=res.data.data.list
                if(that.api_data==='http://47.98.113.173:9519/v1/finance/charge_detail/get_by_account_ids'){
                  that.recorded_list=res.data.data.list;
                }else if( that.api_data==='http://47.98.113.173:9519/v1/finance/check_account_operation/get_by_account_ids'){
                  that.examine_accounts=res.data.data.list;
                }else if( that.api_data==='http://47.98.113.173:9519/v1/finance/account/get_sub_accounts'){
                  that.general_list=res.data.data.list;
                }else if( that.api_data==='http://47.98.113.173:9519/v1/finance/combine_account_operation/get_by_account_ids'){
                  that.and_curtain_list=res.data.data.list;
                }else if(  that.api_data==='http://47.98.113.173:9519/v1/finance/arrange_account_operation/get_by_account_ids'){
                  that.brew_list=res.data.data.list;
                }else if(that.api_data==='http://47.98.113.173:9519/v1/finance/account_message/get_by_account_ids'){
                  that.payment_list=res.data.data.list;
                }else if(that.api_data==='http://47.98.113.173:9519/v1/finance/account_close_operation/get_by_account_ids'){
                  that.income_list=res.data.data.list
                }else if( that.api_data==='http://47.98.113.173:9519/v1/finance/transfer_accounts_detail/get_by_account_ids'){
                  that.transfer_list=res.data.data.list;
                }
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },





        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/common/module/info_list",
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
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
      }
    }
</script>

<style lang="less" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.curtain{
  width: 96%;
  height: 95%;
  margin: 1%;
  background: white;
  overflow: hidden;
  overflow-y: scroll;
  .title{
    margin-top: 10px;
    min-width:1300px ;
    li{
      display: inline-block;
      margin-left: 5px;
      button{
        width:80px;
        height:30px;
        background:rgba(68,136,233,1);
        border: none;
        border-radius:4px;
        color: white;
        margin-left: 10px;
      }
    }
  }
  .shopping{
    height: 40%;
    margin-top: 20px;
    min-width: 1200px;
    .shopping_title{
      li{
        display: inline-block;
        margin-left: 10px;
        button{
          width:80px;
          height:30px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
<style scoped>
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
    /*z-index: 0;*/
  /*}*/
  /*.el-table__column-filter-trigger i {*/
    /*color: white;*/
    /*font-size: 16px;*/
  /*}*/

</style>
