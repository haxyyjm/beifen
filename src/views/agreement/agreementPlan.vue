<template>
  <div class="MemberPlan">
      <el-tabs v-model="activeName" type="card"  @tab-click="handleClick">
        <!--tab -->
        <el-tab-pane  v-for="(item,index) in tabsList" :key="index"  :label="item.descript" :name="item.descript">
            <div class="ShowDetail">
              <!-- 左边部分 -->
              <div class="leftDetail pull-left">
                <!-- 上层input -->
                <div class="inputCell">
                    <p> 代码：</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.code" :placeholder="tabsDetailData.code" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 卡有效期（天）:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.valid_days" :placeholder="tabsDetailData.valid_days" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 中文描述:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript" :placeholder="tabsDetailData.descript" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 初始密码:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.init_password" :placeholder="tabsDetailData.init_password" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 英文描述:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript_en" :placeholder="tabsDetailData.descript_en" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 备注:</p>
                    <!-- 查询input -->
                    <!-- type="textarea" -->
                    <el-input v-model="tabsDetailData.remark" :placeholder="tabsDetailData.remark" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 适用范围:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript" disabled placeholder="请输入内容" style="width: 65%;"></el-input>
                </div>

                <!-- 下方选择 -->
                <div class="botCheck">
                  <div class="check">
                    <span>是否自动激活</span> <el-checkbox v-model="tabsDetailData.is_auto_activated"></el-checkbox>
                  </div>
                  <div class="check">
                    <span>允许线上使用</span><el-checkbox v-model="tabsDetailData.is_allow_online_use"></el-checkbox>
                  </div>
                </div>
                <div class="botCheck">
                  <!--<div class="check">
                    <span>是否物理卡</span><el-checkbox v-model="tabsDetailData.is_physical"></el-checkbox>
                  </div> -->
                  <div class="check">
                    <span style="margin-right: 25px;">是否允许匿名卡</span><el-checkbox v-model="tabsDetailData.is_anonymous"></el-checkbox>
                  </div>
                  <div class="check">
                    <span>是否停用</span><el-checkbox v-model="tabsDetailData.is_halt"></el-checkbox>
                  </div>
                </div>
                <!-- <div class="botCheck">
                  <div class="check">
                    <span>是否允许匿名卡</span><el-checkbox v-model="tabsDetailData.is_anonymous"></el-checkbox>
                  </div>
                </div> -->

              </div>
              <!-- 右边部分 -->
              <div class="rightDetail pull-right">
                <div class="rightLeft">
                    <div class="botCheck">
                      <div class="check">
                        <el-checkbox v-model="tabsDetailData.is_point"></el-checkbox><span>是否积分卡</span>
                      </div>
                      <div v-if="tabsDetailData.is_point" class="check">
                        <span style="margin-left: 50px;">是否仅本人消费累计</span>
                        <el-checkbox v-model="tabsDetailData.is_point_in_self"></el-checkbox>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">是否仅本人消费累计</span>
                        <el-checkbox v-model="tabsDetailData.is_point_in_self" disabled=""></el-checkbox>
                      </div>
                      <!-- 判断是否选中是否为积分卡 -->
                      <div v-if="tabsDetailData.is_point" class="check">
                        <span style="margin-left: 50px;">积分有效期（天）</span>
                        <el-input v-model="tabsDetailData.point_valid_days" :placeholder="tabsDetailData.point_valid_days" style="width: 30%;"></el-input>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">积分有效期（天）</span>
                        <el-input v-model="tabsDetailData.point_valid_days" :placeholder="tabsDetailData.point_valid_days" disabled style="width: 30%;"></el-input>
                      </div>
                    </div>
                    <div class="botCheck" style="margin-top: 80px;">
                      <div class="check">
                        <el-checkbox v-model="tabsDetailData.is_account"></el-checkbox><span>是否储值卡</span>
                      </div>
                      <div v-if="tabsDetailData.is_account" class="check">
                        <span style="margin-left: 50px;">是否允许附属卡</span><el-checkbox v-model="checked" disabled></el-checkbox>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">是否允许附属卡</span><el-checkbox v-model="checked" disabled></el-checkbox>
                      </div>
                      <div v-if="tabsDetailData.is_account" class="check">
                        <span style="margin-left: 50px;">仅发卡酒店充值</span><el-checkbox v-model="tabsDetailData.is_pay_self_hotel"></el-checkbox>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">仅发卡酒店充值</span><el-checkbox v-model="tabsDetailData.is_pay_self_hotel" disabled=""></el-checkbox>
                      </div>
                      <div class="check">
                        <span style="margin-left: 50px;">是否允许充值</span><el-checkbox v-model="checked" disabled></el-checkbox>
                      </div>
                    </div>
                </div>
                <!-- 显示信息部分 -->
                <div class="rightShow">
                  <!-- 右边部分 -->
                      <p class="cellp">创建人：{{ tabsDetailData.create_user }}</p>
                      <p class="cellp">创建日期：{{ tabsDetailData.create_datetime }}</p>
                      <p class="cellp">修改人：{{ tabsDetailData.modify_user }}</p>
                      <p class="cellp">修改日期：{{ tabsDetailData.modify_datetime }}</p>
                      <div >
                          <!-- 查询 -->
                          <el-button type="primary" @click="delInfo(tabsDetailData.id)">删除</el-button>
                          <!-- 添加 -->
                          <el-button type="primary" @click="updateTabsData(tabsDetailData.id);">保存</el-button>
                      </div>
                </div>
              </div>
            </div>
            <!-- 协议单位 VIP 等级 -->
            <p class="iconLogo">协议单位 VIP 等级</p>
            <div class="cardTypeLevel"><img @click="classNewCardLevel()" src="../member/img/icon-newAdd.png" alt=""></div>
            <!-- 表格 -->
            <div class="table" >
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>代码</th>
                        <th>中文描述</th>
                        <th>英文描述</th>
                        <th>是否停用</th>
                        <th>备注信息</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in CardLevelList" :key="index" @click="CardLevelShow(item.id)">
                        <td>{{ item.code }}</td>
                        <td>{{ item.descript }}</td>
                        <td>{{ item.descript_en }}</td>
                        <td><p v-if="item.is_halt">是</p><p v-else>否</p></td>
                        <td>{{ item.remark }}</td>
                    </tr>
                </tbody>
              </table>
              <p v-if="CardLevelList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
              <div v-if="CardLevelList.length>=10" class="pagination">
                <p class="pull-left">总共{{ CardLevelList.length }}条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="CardLevelList.length" class="pull-right">
                </el-pagination>
              </div>
            </div>
        </el-tab-pane>
        <!------------------------------------------ 新增的模块------------------------------ -->
        <el-tab-pane label="+" name="新增">
            <div class="ShowDetail">
              <!-- 左边部分 -->
              <div class="leftDetail pull-left">
                <!-- 上层input -->
                <div class="inputCell">
                    <p> 代码：</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.code" :placeholder="tabsDetailData.code" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 卡有效期（天）:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.valid_days" :placeholder="tabsDetailData.valid_days" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 中文描述:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript" :placeholder="tabsDetailData.descript" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 初始密码:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.init_password" :placeholder="tabsDetailData.init_password" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 英文描述:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript_en" :placeholder="tabsDetailData.descript_en" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 备注:</p>
                    <!-- 查询input -->
                    <!-- type="textarea" -->
                    <el-input v-model="tabsDetailData.remark" :placeholder="tabsDetailData.remark" style="width: 65%;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 适用范围:</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript" disabled placeholder="请输入内容" style="width: 65%;"></el-input>
                </div>

                <!-- 下方选择 -->
                <div class="botCheck">
                  <div class="check">
                    <span>是否自动激活</span> <el-checkbox v-model="tabsDetailData.is_auto_activated"></el-checkbox>
                  </div>
                  <div class="check">
                    <span>允许线上使用</span><el-checkbox v-model="tabsDetailData.is_allow_online_use"></el-checkbox>
                  </div>
                </div>
                <div class="botCheck">
                  <!--<div class="check">
                    <span>是否物理卡</span><el-checkbox v-model="tabsDetailData.is_physical"></el-checkbox>
                  </div> -->
                  <div class="check">
                    <span style="margin-right: 25px;">是否允许匿名卡</span><el-checkbox v-model="tabsDetailData.is_anonymous"></el-checkbox>
                  </div>
                  <div class="check">
                    <span>是否停用</span><el-checkbox v-model="tabsDetailData.is_halt"></el-checkbox>
                  </div>
                </div>
                <!-- <div class="botCheck">
                  <div class="check">
                    <span>是否允许匿名卡</span><el-checkbox v-model="tabsDetailData.is_anonymous"></el-checkbox>
                  </div>
                </div> -->

              </div>
              <!-- 右边部分 -->
              <div class="rightDetail pull-right">
                <div class="rightLeft">
                    <div class="botCheck">
                      <div class="check">
                        <el-checkbox v-model="tabsDetailData.is_point"></el-checkbox><span>是否积分卡</span>
                      </div>
                      <div v-if="tabsDetailData.is_point" class="check">
                        <span style="margin-left: 50px;">是否仅本人消费累计</span>
                        <el-checkbox v-model="tabsDetailData.is_point_in_self"></el-checkbox>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">是否仅本人消费累计</span>
                        <el-checkbox v-model="tabsDetailData.is_point_in_self" disabled=""></el-checkbox>
                      </div>
                      <!-- 判断是否选中是否为积分卡 -->
                      <div v-if="tabsDetailData.is_point" class="check">
                        <span style="margin-left: 50px;">积分有效期（天）</span>
                        <el-input v-model="tabsDetailData.point_valid_days" :placeholder="tabsDetailData.point_valid_days" style="width: 30%;"></el-input>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">积分有效期（天）</span>
                        <el-input v-model="tabsDetailData.point_valid_days" :placeholder="tabsDetailData.point_valid_days" disabled style="width: 30%;"></el-input>
                      </div>
                    </div>
                    <div class="botCheck" style="margin-top: 80px;">
                      <div class="check">
                        <el-checkbox v-model="tabsDetailData.is_account"></el-checkbox><span>是否储值卡</span>
                      </div>
                      <div v-if="tabsDetailData.is_account" class="check">
                        <span style="margin-left: 50px;">是否允许附属卡</span><el-checkbox v-model="checked" disabled></el-checkbox>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">是否允许附属卡</span><el-checkbox v-model="checked" disabled></el-checkbox>
                      </div>
                      <div v-if="tabsDetailData.is_account" class="check">
                        <span style="margin-left: 50px;">仅发卡酒店充值</span><el-checkbox v-model="tabsDetailData.is_pay_self_hotel"></el-checkbox>
                      </div>
                      <div v-else class="check">
                        <span style="margin-left: 50px;">仅发卡酒店充值</span><el-checkbox v-model="tabsDetailData.is_pay_self_hotel" disabled=""></el-checkbox>
                      </div>
                      <div class="check">
                        <span style="margin-left: 50px;">是否允许充值</span><el-checkbox v-model="checked" disabled></el-checkbox>
                      </div>
                    </div>
                </div>
                <!-- 显示信息部分 -->
                <div class="rightShow">
                  <!-- 右边部分 -->
                      <p class="cellp">创建人：{{ tabsDetailData.create_user }}</p>
                      <p class="cellp">创建日期：{{ tabsDetailData.create_datetime }}</p>
                      <p class="cellp">修改人：{{ tabsDetailData.modify_user }}</p>
                      <p class="cellp">修改日期：{{ tabsDetailData.modify_datetime }}</p>
                      <div >
                          <!-- 删除 -->
                          <el-button type="primary" style="background-color: #CCCCCC;border-color: #cccccc;cursor: not-allowed;">删除</el-button>
                          <!-- 添加 -->
                          <el-button type="primary" @click="AddTabInfo">保存</el-button>
                      </div>
                </div>
              </div>
            </div>
            <!-- 协议单位  VIP 等级 -->
            <p class="iconLogo">协议单位 VIP 等级</p>
            <div class="cardTypeLevel"><img style="cursor: not-allowed;" src="../member/img/icon-newAdd.png" alt=""></div>
            <!-- 表格 -->
            <div class="table" >
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>代码</th>
                        <th>中文描述</th>
                        <th>英文描述</th>
                        <th>是否停用</th>
                        <th>备注信息</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in CardLevelList" :key="index">
                        <td>{{ item.code }}</td>
                        <td>{{ item.descript }}</td>
                        <td>{{ item.descript_en }}</td>
                        <td><p v-if="item.is_halt">是</p><p v-else>否</p></td>
                        <td>{{ item.remark }}</td>
                        <td><span @click="deleCertainCardLevel(item.id)">删除</span> <span class="col"></span> <span @click="CardLevelShow(item.id)">修改</span></td>
                    </tr>
                </tbody>
              </table>
              <p v-if="CardLevelList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
              <div v-if="CardLevelList.length>=10" class="pagination">
                <p class="pull-left">总共{{ CardLevelList.length }}条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="CardLevelList.length" class="pull-right">
                </el-pagination>
              </div>
            </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 会员计划外层dialog -->
      <el-dialog title="编辑" :visible.sync="outerVisible">
            <div class="outdialog">
              <p class="title">等级信息</p>
              <div class="classMes" style="padding: 10px 20px;">
                <div class="pull-left" style="width: 80%;">
                  <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> <i>*</i>代码：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.code" placeholder="请输入内容" style="width: 50%;"></el-input>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"><i>*</i> 中文描述：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.descript" placeholder="请输入内容" style="width: 50%;"></el-input>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> <i>*</i>英文描述：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.descript_en" placeholder="请输入内容" style="width: 50%;"></el-input>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> VIP等级：</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript" placeholder="请输入内容" disabled style="width: 50%;"></el-input>
                    <!-- <el-select v-model=" " placeholder="请选择" style="width: 50%;">
                      <el-option
                        v-for="item in tabsList"
                        :key="item.id"
                        :label="item.descript"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> 是否停用：</p>
                    <!-- 查询input -->
                    <el-checkbox v-model="CertainCardLevelJson.is_halt"></el-checkbox>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> NoShow积分扣减：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.no_show_point" placeholder="请输入内容" style="width: 45%;"></el-input>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> 积分使用限制：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.point_use_limit" placeholder="请输入内容" style="width: 45%;"></el-input>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> 开启注册验证：</p>
                    <!-- 查询input -->
                    <el-checkbox v-model="CertainCardLevelJson.is_registration_verify"></el-checkbox>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> 积分隔天可使用：</p>
                    <!-- 查询input -->
                    <el-checkbox v-model="CertainCardLevelJson.point_use_next_day"></el-checkbox>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> 允许手动升级：</p>
                    <!-- 查询input -->
                    <el-checkbox v-model="CertainCardLevelJson.is_manual_upgrade"></el-checkbox>
                </div>
                <div class="inputCell" style="width: 24%;">
                    <p style="width: 45%;"> 卡号规则：</p>
                    <!-- 查询input -->
                    <el-checkbox v-model="CertainCardLevelJson.is_special_card_rule"></el-checkbox>
                </div>
                <div v-show="CertainCardLevelJson.is_special_card_rule" class="inputCell" style="width: 24%;">
                    <p  style="width: 45%;color: #4488E9;cursor: pointer;text-decoration: underline;" @click="cardRulesShow"> 卡号产生规则：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.special_card_rule" placeholder="请输入内容" disabled style="width: 45%;"></el-input>
                </div>
                <div class="inputCell" style="width: 50%;">
                    <p style="width: 21%;"> 备注：</p>
                    <!-- 查询input -->
                    <el-input type="textarea" v-model="CertainCardLevelJson.remark" placeholder="请输入内容"  style="width: 50%;"></el-input>
                </div>
                </div>
                <!-- 右侧卡等级图片 -->
                <div class="pull-right" style="width: 20%;">
                    <div class="inputCell" style="width: 100%;">
                    <!-- <p style="width: 30%;"> 卡等级图片：</p> -->
                    <!-- 查询input -->
                    <div>
                      <!-- <img :src="CertainCardLevelJson.pic" alt=""> -->
                      <img style="width:100%;" src="../member/img/icon-level.png" alt="卡等级图片">
                    </div>
                </div>
                </div>
              </div>
              <p class="title">充值金额要求（单位元）</p>
              <div class="classMes" style="padding: 10px 20px;">
                <div class="inputCell" >
                    <p > 首充>=：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.first_pay_min" placeholder="请输入内容" style="width: 500px;"></el-input>
                </div>
                <div class="inputCell" >
                    <p > 续充>=：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.continue_pay_min" placeholder="请输入内容" style="width: 500px;"></el-input>
                </div>
                <div class="inputCell" >
                    <p> 累计充值>=：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.limit_balance" placeholder="请输入内容" style="width: 500px;"></el-input>
                </div>
                <div class="inputCell">
                    <p> 提醒充值余额：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.limit_balance" disabled placeholder="请输入内容" style="width: 500px;"></el-input>
                </div>
              </div>
              <p class="title">等级扩展</p>
              <div v-if="cardLevelNewadd" class="cardTypeLevel" ><img style="cursor: not-allowed;" src="../member/img/icon-newAdd.png" alt=""></div>
              <div v-else class="cardTypeLevel" @click="classNewAddExtraShow()"><img src="../member/img/icon-newAdd.png" alt=""></div>
              <div class="classMes">
                <!-- 表格 -->
                <div class="table">
                  <table style="width: 100%;">
                    <thead>
                        <tr>
                            <th>协议单位计划</th>
                            <th>协议单位VIP等级</th>
                            <th>扩展项目</th>
                            <th>扩展项目值</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>是否停用</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in LevelExtraInfo" :key="index" @click="classExtra(item.id)">
                            <td>{{ tabsDetailData.descript }}</td>
                            <td>{{ CertainCardLevelJson.descript }}</td>
                            <td>{{ item.extra_item }}</td>
                            <td>{{ item.extra_item_value }}</td>
                            <td>{{ item.date_begin }}</td>
                            <td>{{ item.date_end }}</td>
                            <td><span v-if="item.is_halt">是</span> <span v-else>否</span></td>
                        </tr>
                    </tbody>
                  </table>
                  <p v-if="LevelExtraInfo.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
                </div>
              </div>
              <!-- 删除保存 -->
                <div v-if="cardLevelNewadd" class="CancleAndSave pull-right" style="margin-top: 20px;">
                  <el-button type="primary" @click="NewAddCardLevel();">保存</el-button>
                </div>
                <div v-else class="CancleAndSave pull-right" style="margin-top: 20px;">
                  <el-button type="primary" @click="deleCertainCardLevel(CertainCardLevelJson.id)" style="background-color: #68819E;">删除</el-button>
                  <el-button type="primary" @click="update_card_level(CertainCardLevelJson.id);">保存</el-button>
                </div>
            </div>
            <!-- 内层dialog -->
            <el-dialog
              width="40%"
              title="卡号规则设置"
              :visible.sync="innerVisible"
              append-to-body>
              <div class="innerDialog">
                <div class="inputCell" style="width: 80%;">
                    <p style="width: 20%;"> 卡号前缀：</p>
                    <!-- 查询input -->
                    <el-input v-model="Rules_pre" placeholder="请输入内容" style="width: 50%;"></el-input>
                    <p> (不填代表无前缀）</p>
                </div>
                <div class="inputCell" style="width: 80%;">
                    <p style="width: 20%;"> 卡号后缀：</p>
                    <!-- 查询input -->
                    <el-input v-model="Rules_last" placeholder="请输入内容" style="width: 50%;"></el-input>
                    <p> (不填代表无后缀）</p>
                </div>
                <div class="inputCell" style="width: 80%;">
                    <p style="width: 20%;"> 序号长度：</p>
                    <!-- 查询input -->
                    <el-input v-model="Rules_length" maxlength="20" placeholder="请输入内容" style="width: 50%;"></el-input>
                </div>
              </div>
              <!-- 取消删除保存 -->
              <div class="CancleAndSave pull-right" >
                <el-button type="primary" @click="innerVisible = false" style="background-color: #68819E;">取消</el-button>
                <el-button type="primary" @click="clearCardRules()" style="background-color: #68819E;">重置</el-button>
                <el-button type="primary" @click="saveCardRules();" style="background-color: #4488E9;">保存</el-button>
              </div>
            </el-dialog>

            <!----------------- 第二个内层dialog -------------------->
            <el-dialog
              width="50%"
              title="VIP等级"
              :visible.sync="innerSecVisible"
              append-to-body>
              <div class="innerDialog">
                <div class="inputCell">
                    <p style="width: 30%;"> 协议单位计划：</p>
                    <!-- 查询input -->
                    <el-input v-model="tabsDetailData.descript " placeholder="请输入内容" disabled style="width: 60%;"></el-input>
                </div>
                <div class="inputCell">
                    <p style="width: 30%;"> 协议单位VIP等级：</p>
                    <!-- 查询input -->
                    <el-input v-model="CertainCardLevelJson.descript" placeholder="请输入内容 " disabled style="width: 60%;"></el-input>
                </div>
                <div class="inputCell" >
                    <p style="width: 30%;"> 扩展项目：</p>
                    <!-- 查询input -->
<!--                <el-select v-model="ExtraItemJson.extra_item" placeholder="请选择" style="width: 60%;">
                      <el-option
                        v-for="item in itemsData"
                        :key="item.code"
                        :label="item.descript"
                        :value="item.code">
                      </el-option>
                    </el-select> -->
                    <el-input v-model="ExtraItemJson.extra_item" placeholder="请输入内容" style="width: 60%;"></el-input>
                </div>
                <div class="inputCell">
                    <p style="width: 30%;"> 扩展项目值：</p>
                    <!-- 查询input -->
                    <el-input v-model="ExtraItemJson.extra_item_value" placeholder="请输入内容" style="width: 60%;"></el-input>
                </div>
                <div class="inputCell">
                    <p style="width: 30%;"> 有效期开始：</p>
                    <!-- 查询input -->
                    <el-date-picker
                        v-model="ExtraItemJson.date_begin"
                        type="date"
                        placeholder="选择日期" style="width:60%;">
                      </el-date-picker>
                </div>
                <div class="inputCell">
                    <p style="width: 30%;"> 有效期结束：</p>
                    <!-- 查询input -->
                    <el-date-picker
                        v-model="ExtraItemJson.date_end"
                        type="date"
                        placeholder="选择日期" style="width:60%;">
                      </el-date-picker>
                </div>
                <div class="inputCell">
                    <p style="width: 30%;"> 是否停用：</p>
                    <el-checkbox v-model="ExtraItemJson.is_halt"></el-checkbox>
                </div>
                <div v-show="!innerSecNewAdd" class="secDiaAdmin">
                  <p>创建：{{ ExtraItemJson.create_user }} &nbsp; {{ ExtraItemJson.create_datetime }}</p>
                  <p>修改：{{ ExtraItemJson.modify_user }} &nbsp; {{ ExtraItemJson.modify_datetime }}</p>
                </div>
              </div>
              <!-- 取消保存 -->
              <!-- 新增协议单位 VIP 等级扩展 -->
              <div v-if="innerSecNewAdd" class="CancleAndSave pull-right" >
                <el-button type="primary" @click="innerSecVisible = false" style="background-color: #68819E;">取消</el-button>
                <el-button type="primary"  @click="AddCardLevelExtra" style="background-color: #4488E9;">保存</el-button>
              </div>
              <!-- 更新更改 -->
              <div v-else class="CancleAndSave pull-right" >
                <el-button type="primary" @click="innerSecVisible = false" style="background-color: #68819E;">取消</el-button>
                <el-button type="primary" @click="remove_card_level_extra(ExtraItemJson.id)" style="background-color: #68819E;">删除</el-button>
                <el-button type="primary" @click="update_card_level_extra(ExtraItemJson.id)" style="background-color: #4488E9;">保存</el-button>
              </div>
            </el-dialog>
      </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
// 接口说明
// get_card_type_list：查询所有导航tabs
// get_card_type_info：查询单个的tab内容
// update_card_type：  更新单个tab内的信息
// remove_card_type：  删除单个tab内容信息
// add_card_type：     新增一个会员计划tab


//get_card_level_list：  查询会员卡等级列表
//get_card_level_info：  查询指定的会员卡等级
//add_card_level：       增加会员卡等级
//add_card_level_extra： 增加会员卡等级域
//remove_card_level：    删除会员卡等级
//update_card_level：    更新修改指定的会员卡等级


//get_card_level_extra_list：  查询会员卡等级列表
//get_card_level_extra_info：  查询指定的会员卡等级
//add_card_level_extra：       增加会员卡等级
//add_card_level_extra： 增加会员卡等级域
//remove_card_level_extra：    删除会员卡等级
//update_card_level_extra：    更新修改指定的会员卡等级

    export default {
        name: "MemberPlan",
        data(){
          return{
            // 请求地址头
            UrLHeader:'http://47.98.113.173:9102/v1/',//http://member.crowncrystalhotel.com/
            // 初试导航项
            tabsList:'',
            // 是否显示设置
            activeName: '新增',
            // 会员计划具体信息
            tabsDetailData:{
                      "code_type":"CM",
                      "code":"",
                      "descript":'',
                      "descript_en":'',
                      "is_point":false,
                      "is_point_in_self":false,
                      "is_point_out_self":false,
                      "point_valid_days":10958,
                      "is_account":false,
                      "is_pay_self_hotel":false,
                      "is_post_self":false,
                      "is_anonymous":false,
                      "is_auto_activated":false,
                      "is_allow_online_use":false,
                      "registered_limit":"A",
                      "num_generate_rule":"",
                      "last_generated_no":"",
                      "valid_days":10958,
                      "init_password":"000000",
                      "is_physical":false,
                      "is_must_read":false,
                      "is_must_password_validate":false,
                      "remark":"无",
                      "is_halt":false,
                      "iss_mode":"EW"
            },
            // 等级扩展信息
            LevelExtraInfo:[],
            // 会员卡等级所有数据
            AllCardLevelList:[],
            // 会员卡等级单个数据
            CardLevelList:[],
            // 按照单个id查询的会员等级信息
            CertainCardLevelJson:'',
            // 点击等级扩展单条的会员计划弹窗数据
            ExtraItemJson:'',
            // 选择
            checked: false,
            // 第一层弹框
            outerVisible: false,
            // 是否新增
            cardLevelNewadd:false,
            // 内层弹框
            innerVisible: false,
            // 第二个内层dialog
            innerSecVisible:false,
            // 新增等级扩展
            innerSecNewAdd:false,
            // 卡号生成规则
            // 前缀
            Rules_pre:'',
            // 后缀
            Rules_last:'',
            // 序号长度
            Rules_length:"",
            itemsData:""
          }
        },
        methods:{
          // 扩展项值
          get_items_data(){
             let url  = 'http://47.98.113.173:9101/v1/rate_code/get_rate_code_list/' ,
                _this = this;
            // 发送请求:将数据返回到一个回到函数中
             // 并且响应成功以后会执行then方法中的回调函数
             axios.get(url).then(function(res) {
               if(res.data.message=="success"){
                console.log(res.data)
                 if(res.data.data.results.length){
                    // 初始化渲染tabs导航项目
                    _this.itemsData=res.data.data.results;

                 }
               }else{
                 _this.$message.error('请求服务器失败，稍后重试');
               }
            }).catch((error) => {

            });
          },
          // 请求会员计划tabs数据--------------------------
          getTabsData:function() {
             //设置请求路径
             let url  = this.UrLHeader+"customer/member/get_card_type_list/?code_type=CM",
                _this = this;
            // 发送请求:将数据返回到一个回到函数中
             // 并且响应成功以后会执行then方法中的回调函数
             axios.get(url).then(function(res) {

               if(res.data.message=="success"){
                console.log(res.data)
                 if(res.data.data.results.length){
                    // 初始化渲染tabs导航项目
                    _this.tabsList=res.data.data.results;
                    // 第一次渲染第一项tabs
                    _this.getCertainTabData(res.data.data.results[0].id);
                 }
               }else{
                 _this.$message.error('请求服务器失败，稍后重试');
               }
            }).catch((error) => {

            });
          },


          // 点击单个tabs获取---------
          handleClick(tab, event) {
            let _this=this;
            if(event.target.id=='tab-新增'){
                  _this.tabsDetailData={
                    "code_type":"CM",
                      "code":"",
                      "descript":'',
                      "descript_en":'',
                      "is_point":false,
                      "is_point_in_self":false,
                      "is_point_out_self":false,
                      "point_valid_days":10958,
                      "is_account":false,
                      "is_pay_self_hotel":false,
                      "is_post_self":false,
                      "is_anonymous":false,
                      "is_auto_activated":false,
                      "is_allow_online_use":false,
                      "registered_limit":"A",
                      "num_generate_rule":"",
                      "last_generated_no":"",
                      "valid_days":10958,
                      "init_password":"000000",
                      "is_physical":false,
                      "is_must_read":false,
                      "is_must_password_validate":false,
                      "remark":"无",
                      "is_halt":false,
                      "iss_mode":"EW"
                  };
                  _this.CardLevelList=[];
            }
            for(let i in _this.tabsList){
              if(_this.activeName==_this.tabsList[i].descript){
                // 请求单个tab
                _this.getCertainTabData(_this.tabsList[i].id);
              }
            }
          },

          // 会员计划增删改查接口函数.js---------------------------------------------------------------------
          // 处理后端返回数据值：true或者false转为0，1问题
          dealBooleanData(json){
            json.is_point=this.BooleanInt(json.is_point);
            json.is_point_in_self=this.BooleanInt(json.is_point_in_self);
            json.is_point_out_self=this.BooleanInt(json.is_point_out_self);
            json.is_account=this.BooleanInt(json.is_account);
            json.is_pay_self_hotel=this.BooleanInt(json.is_pay_self_hotel);
            json.is_post_self=this.BooleanInt(json.is_post_self);
            json.is_anonymous=this.BooleanInt(json.is_anonymous);
            json.is_auto_activated=this.BooleanInt(json.is_auto_activated);
            json.is_allow_online_use=this.BooleanInt(json.is_allow_online_use);
            json.is_physical=this.BooleanInt(json.is_physical);
            json.is_must_read=this.BooleanInt(json.is_must_read);
            json.is_must_password_validate=this.BooleanInt(json.is_must_password_validate);
            json.is_halt=this.BooleanInt(json.is_halt);
            return json;
          },
          // 获取单个的tab信息
          getCertainTabData(id){
            let tabUrl=this.UrLHeader+'customer/member/get_card_type_info/'+id+'/',
                _this=this;
            axios.get(tabUrl).then(function(res) {
              if(res.data.message =='success'){
                _this.tabsDetailData=_this.dealBooleanData(res.data.data);
                _this.activeName=res.data.data.descript;
                // 渲染会员卡等级列表
                _this.get_card_level_list(res.data.data.id);
              }else{
              }
            }).catch((error) => {
              this.$message.error('请求服务器失败，稍后重试');
            });
          },


          // 修改指定的card信息
          updateTabsData(id){
            //设置请求路径
             let updateUrl  = this.UrLHeader+"customer/member/update_card_type/"+id+'/',
                  _this=this;
            // 发送请求:将数据返回到数据库
            // axios({
            //     url: updateUrl,
            //     method: 'post',
            //     responseType: 'json', // 默认的
            //     data:_this.tabsDetailData
            // })
            // 修改数据格式
            if(typeof _this.tabsDetailData.is_point === "boolean"){
              _this.tabsDetailData=_this.dealBooleanData(_this.tabsDetailData);
            }

            axios.post(
                updateUrl,
                _this.tabsDetailData
            )
            .then(function(res) {
                if(res.data.message =='success'){
                  _this.getCertainTabData(id);
                  _this.$message({
                    message: '保存信息成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error('保存信息失败');
                }

            })
            .catch((error) => {

            });
          },


          // 删除单条数据
          delInfo(id){
            let delUrl=this.UrLHeader+'customer/member/remove_card_type/'+id+'/',
                _this=this;
                _this.$confirm('是否永久删除该计划?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 发送请求:将数据返回到数据库
                  axios.post(delUrl).then(function(res) {
                    _this.getTabsData();
                    _this.$message({
                      message: '删除成功',
                      type: 'success'
                    });

                  })
                  .catch((error) => {
                    _this.$message.error('删除失败');
                  });
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
          },

          // 添加新的tab函数
          AddTabInfo(){
            let _this=this,addUrl=_this.UrLHeader+'customer/member/add_card_type/',
                isTrue=false;
            // 判断是否与当前计划命名重复
            for(let i in _this.tabsList){
              if(_this.tabsList[i].descript == _this.tabsDetailData.descript){
                isTrue=true;
              }
            }
            // 判断是否重复命名
            if(!isTrue){
              // 判断代码输入值是否为空
              if(!_this.isnull(_this.tabsDetailData.code)){
                // 判断中文描述值是否为空
                if(!_this.isnull(_this.tabsDetailData.descript)){
                    // 判断初始密码值是否为空
                    // if(!_this.isnull(_this.tabsDetailData.init_password)){
                        // 判断英文描述值是否为空
                        if(!_this.isnull(_this.tabsDetailData.descript_en)){
                            // 判断传入后端的值是否做过处理
                            if(typeof _this.tabsDetailData.is_point === "boolean"){
                              _this.tabsDetailData=_this.dealBooleanData(_this.tabsDetailData);
                            }
                            // 请求后台，添加数据
                            axios.post(addUrl,_this.tabsDetailData).then(function(res) {
                              // 刷新tabs
                              _this.getTabsData();
                              // 延时刷新页面
                              setTimeout(() => {
                                _this.getCertainTabData(_this.tabsList[_this.tabsList.length-1].id);
                              }, 1000);
                              // 提示
                              _this.$message({
                                message: '添加成功',
                                type: 'success'
                              });
                            })
                            .catch((error) => {
                              this.$message.error('添加失败');
                            });
                        }else{
                          _this.$message('确认英文文描述值不能为空');
                        }
                    // }else{
                    //   _this.$message('确认初始密码值不能为空');
                    // }
                }else{
                  _this.$message('确认中文描述值不能为空');
                }
              }else{
                _this.$message('确认代码输入值不能为空');
              }
            }else{
              this.$message.error('描述重复');
            }

          },
          // 会员计划增删改查接口函数.js结束---------------------------------------------------------


          // *********************会员卡等级增删改查接口函数.js开始-------------------------------------------------------
          // 处理后端返回数据值：true或者false转为0，1问题
          dealCardLevel(json){
            json.is_halt=this.BooleanInt(json.is_halt);
            json.is_manual_upgrade=this.BooleanInt(json.is_manual_upgrade);
            json.is_must_password_validate=this.BooleanInt(json.is_must_password_validate);
            json.is_must_read=this.BooleanInt(json.is_must_read);
            json.is_physical=this.BooleanInt(json.is_physical);
            json.is_registration_verify=this.BooleanInt(json.is_registration_verify);
            json.is_special_card_rule=this.BooleanInt(json.is_special_card_rule);
            json.point_use_next_day=this.BooleanInt(json.point_use_next_day);

            return json;
          },

          // 获取所有的会员卡等级列表list
          get_all_card_level_list(){
            let _this=this,allcardLevelUrl=_this.UrLHeader+'customer/member/get_card_level_list/';
            // 请求后台数据
            axios.get(allcardLevelUrl).then(function(res) {
              if(res.data.message=='success'){
                _this.AllCardLevelList=res.data.data.results;
              }
            }).catch((error) => {
              _this.$message.error('请求服务器错误');
            });
          },

          // 获取单个tabs中的会员卡等级列表
          get_card_level_list(id){
            //cardType即是上述会员计划中的code字段
            let _this=this,cardLevelUrl=_this.UrLHeader+'customer/member/get_card_level_list/?card_type='+id;

            // 请求后台数据
            axios.get(cardLevelUrl).then(function(res) {
              if(res.data.message=='success' && res.data.data.results){
                _this.CardLevelList=res.data.data.results;
              }else{
                _this.CardLevelList=res.data.data;
              }
            }).catch((error) => {
              _this.$message.error('请求服务器错误');
            });
          },

          // 按照id查询单个会员卡等级
          get_certain_card_level(id){
            let _this=this,certainCardLevelUrl=_this.UrLHeader+'customer/member/get_card_level_info/'+id+'/';

            // 请求后台数据
            axios.get(certainCardLevelUrl).then(function(res) {
              if(res.data.message=='success' && res.data.data){
                _this.CertainCardLevelJson=_this.dealCardLevel(res.data.data);

              }else{
                _this.$message.error('请求服务器错误');
              }
            }).catch((error) => {
              _this.$message.error('请求服务器错误');
            });
          },

          //新增会员卡等级
          classNewCardLevel(){
            let _this=this;
            _this.CertainCardLevelJson={
                buy_card_amount: 0,
                card_type: _this.tabsDetailData.id,
                code: '',
                continue_pay_max: 0,
                continue_pay_min: 0,
                descript: "",
                descript_en: "",
                first_pay_max: 0,
                first_pay_min: 0,
                is_halt: 0,
                is_manual_upgrade: 0,
                is_must_password_validate: 0,
                is_must_read: 0,
                is_physical: 0,
                is_registration_verify: 0,
                is_special_card_rule: 0,
                last_registration_no: "",
                limit_balance: 0,
                no_show_point: 0,
                pic: "",
                point_use_limit: null,
                point_use_next_day: 0,
                reissue_card_amount: 0,
                renewal_card_amount: 0,
                special_card_rule: ""
              };
              _this.LevelExtraInfo=[];
              _this.outerVisible = true;
              // 判断是否是新增
              _this.cardLevelNewadd = true;

          },

          dealCardLevelList(item){
            if(typeof item === "boolean"){
                item=this.BooleanInt(item);
            }
            return item
          },

          // 新增会员卡等级单项数据
          NewAddCardLevel(){
            let _this=this,addCardLevelUrl=_this.UrLHeader+'customer/member/add_card_level/',
                isTrue=false;
             let CertainCardLevelJson=_this.CertainCardLevelJson;

             console.log(_this.CertainCardLevelJson);

             if(!_this.isnull(CertainCardLevelJson.code)){

                if(!_this.isnull(CertainCardLevelJson.descript)){

                  if(!_this.isnull(CertainCardLevelJson.descript_en)){

                      // 字段更改：boolean==>0,1
                      CertainCardLevelJson.is_halt=_this.dealCardLevelList(CertainCardLevelJson.is_halt);
                      CertainCardLevelJson.is_manual_upgrade=_this.dealCardLevelList(CertainCardLevelJson.is_manual_upgrade);
                      CertainCardLevelJson.is_must_password_validate=_this.dealCardLevelList(CertainCardLevelJson.is_must_password_validate);
                      CertainCardLevelJson.is_must_read=_this.dealCardLevelList(CertainCardLevelJson.is_must_read);
                      CertainCardLevelJson.is_physical=_this.dealCardLevelList(CertainCardLevelJson.is_physical);
                      CertainCardLevelJson.is_registration_verify=_this.dealCardLevelList(CertainCardLevelJson.is_registration_verify);
                      CertainCardLevelJson.is_special_card_rule=_this.dealCardLevelList(CertainCardLevelJson.is_special_card_rule);
                      CertainCardLevelJson.point_use_next_day=_this.dealCardLevelList(CertainCardLevelJson.point_use_next_day);


                      axios.post(addCardLevelUrl,CertainCardLevelJson).then(function(res) {
                        if(res.data.message == 'success'){
                          _this.get_card_level_list(_this.tabsDetailData.id);
                          _this.outerVisible = false;
                          // 判断是否是新增
                          _this.cardLevelNewadd = true;
                          // 提示
                          _this.$message({
                            message: '添加成功',
                            type: 'success'
                          });
                        }else{
                          this.$message.error('添加失败');
                        }
                      })
                      .catch((error) => {

                      });
                  }else{
                      this.$message({
                        message: '英文描述不能为空',
                        type: 'warning'
                      });
                  }
                }else{
                    this.$message({
                      message: '中文描述不能为空',
                      type: 'warning'
                    });
                }
             }else{
                this.$message({
                  message: '代码值不能为空',
                  type: 'warning'
                });
             }

          },

          // 删除单个指定的card等级
          deleCertainCardLevel(id){
            let delUrl=this.UrLHeader+'customer/member/remove_card_level/'+id+'/',
                _this=this;
                _this.$confirm('是否永久该删除会员卡等级?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 发送请求:将数据返回到数据库
                  axios.post(delUrl).then(function(res) {
                    _this.get_card_level_list(_this.tabsDetailData.id);
                    _this.outerVisible = false;
                    _this.$message({
                      message: '删除成功',
                      type: 'success'
                    });

                  })
                  .catch((error) => {
                    _this.$message.error('删除失败');
                  });
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
          },

          // 点击表格中的修改显示弹窗、
          CardLevelShow(id){
            let _this=this;
            _this.outerVisible = true;
            // 判断是否是新增
            _this.cardLevelNewadd = false;
            // 请求后台数据
            _this.get_certain_card_level(id);
            _this.get_certain_card_level_extra(_this.tabsDetailData.id,id);
          },

          // 更改单个指定的cardlevel
          update_card_level(id){
            //设置请求路径
             let updateCardLevelUrl  = this.UrLHeader+"customer/member/update_card_level/"+id+'/',
                  _this=this;
            // 修改数据格式
            // if(typeof _this.tabsDetailData.is_point === "boolean"){
            //   _this.tabsDetailData=_this.dealBooleanData(_this.tabsDetailData);
            // }
            axios.post(
                updateCardLevelUrl,
                _this.dealCardLevel(_this.CertainCardLevelJson)
            )
            .then(function(res) {
                if(res.data.message =='success'){
                  _this.get_card_level_list(_this.tabsDetailData.id);
                  _this.outerVisible = false;
                  _this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error('保存信息失败');
                }

            })
            .catch((error) => {

            });
          },


          // --------------等级扩展的请求函数--------------------------------------------------
          get_certain_card_level_extra(cardtype,card_level){
            let _this=this,certainLevelUrl=_this.UrLHeader+'customer/member/get_card_level_extra_list/?card_type='+cardtype+'&card_level='+card_level;

            // 请求后台数据
            axios.get(certainLevelUrl).then(function(res) {
              if(res.data.message=='success' && res.data.data){
                if(res.data.data.results){
                  _this.LevelExtraInfo=res.data.data.results;
                }else{
                  _this.LevelExtraInfo=[]
                }

              }else{
                _this.$message.error('请求服务器错误');
              }
            }).catch((error) => {
              _this.$message.error('请求服务器错误');
            });

          },

          // 添加单个会员卡等级的等级扩展部分
          classExtra(id){
            let _this=this,certainLevelUrl=_this.UrLHeader+'customer/member/get_card_level_extra_info/'+id+'/';
            // 请求后台数据
            axios.get(certainLevelUrl).then(function(res) {
              if(res.data.message=='success' && res.data.data){

                res.data.data.is_halt = _this.BooleanInt(res.data.data.is_halt);
                _this.ExtraItemJson=res.data.data;

                _this.innerSecVisible = true;
                _this.innerSecNewAdd  = false;

              }else{
                _this.$message.error('请求服务器错误');
              }
            }).catch((error) => {
              _this.$message.error('请求服务器错误');
            });


          },

          // 更新单个会员等级中的单条等级扩展
          update_card_level_extra(id){
            //设置请求路径
             let updateCardLevelExtraUrl  = this.UrLHeader+"customer/member/update_card_level_extra/"+id+'/',
                  _this=this;

            // 修改数据格式
            if(typeof _this.ExtraItemJson.is_halt === "boolean"){
              _this.ExtraItemJson.is_halt=_this.BooleanInt(_this.ExtraItemJson.is_halt);
            }

            if(!_this.isnull(_this.ExtraItemJson.extra_item)){

              if(!_this.isnull(_this.ExtraItemJson.extra_item_value)){
                axios.post(
                    updateCardLevelExtraUrl,
                    _this.ExtraItemJson
                )
                .then(function(res) {
                    if(res.data.message =='success'){
                      _this.innerSecVisible = false;
                      _this.get_certain_card_level_extra(_this.tabsDetailData.id,_this.CertainCardLevelJson.id);
                      _this.$message({
                        message: '保存成功',
                        type: 'success'
                      });
                    }else{
                      this.$message.error('保存信息失败');
                    }

                })
                .catch((error) => {

                });
              }else{
                this.$message({
                  message: '扩展项目值不能为空',
                  type: 'warning'
                });
              }
            }else{
              this.$message({
                message: '扩展项目不能为空',
                type: 'warning'
              });
            }

          },

          // 删除单个会员等级中的单条等级扩展
          remove_card_level_extra(id){
            let delUrl=this.UrLHeader+'customer/member/remove_card_level_extra/'+id+'/',
                _this=this;
                _this.$confirm('是否永久该删除等级扩展?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 发送请求:将数据返回到数据库
                  axios.post(delUrl).then(function(res) {
                    _this.get_certain_card_level_extra(_this.tabsDetailData.id,_this.CertainCardLevelJson.id);
                    _this.innerSecVisible = false;
                    _this.$message({
                      message: '删除成功',
                      type: 'success'
                    });

                  })
                  .catch((error) => {
                    _this.$message.error('删除失败');
                  });
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
          },

          // 外层弹框点击新增
          classNewAddExtraShow(){
            let _this=this;
            _this.ExtraItemJson={
                card_type: _this.tabsDetailData.id,
                card_level: _this.CertainCardLevelJson.id,
                extra_item:'',
                extra_item_value:' ',
                date_begin:_this.getNowFormatDate(),
                date_end:_this.AddgetNowFormatDate(1),
                is_halt:false
              }
            _this.innerSecVisible = true;
            _this.innerSecNewAdd  = true;

          },

          // 增加按钮
          AddCardLevelExtra(){
            let _this = this,addCardLevelUrl = _this.UrLHeader + 'customer/member/add_card_level_extra/';
              console.log(_this.ExtraItemJson)
              // 修改数据格式
              if(typeof _this.ExtraItemJson.is_halt === "boolean"){
                _this.ExtraItemJson.is_halt=_this.BooleanInt(_this.ExtraItemJson.is_halt);
              }
              if(!_this.isnull(_this.ExtraItemJson.extra_item)){

                if(!_this.isnull(_this.ExtraItemJson.extra_item_value)){
                    // 请求后台，添加数据
                    axios.post(addCardLevelUrl,_this.ExtraItemJson).then(function(res) {
                      if(res.data.message == 'success'){
                        _this.get_certain_card_level_extra(_this.tabsDetailData.id,_this.CertainCardLevelJson.id);
                        _this.innerSecVisible = false;
                        // 提示
                        _this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                      }else{
                        this.$message.error('添加失败');
                      }
                    }).catch((error) => {

                    });
                }else{
                    this.$message({
                      message: '扩展项目值不能为空',
                      type: 'warning'
                    });
                  }
                }else{
                  this.$message({
                    message: '扩展项目不能为空',
                    type: 'warning'
                  });
                }


          },

          // 卡号规则设置
          cardRulesShow(){
            let _this=this;
            if(!_this.isnull(_this.CertainCardLevelJson.code)){
              if(_this.isnull(this.CertainCardLevelJson.special_card_rule)){
                this.Rules_pre='';
                // 后缀
                this.Rules_last='';
                // 序号长度
                this.Rules_length="";
              }else{
                let rules=this.CertainCardLevelJson.special_card_rule.split('/');

                this.Rules_pre = rules[0];
                // 后缀
                this.Rules_last=rules[2];
                // 序号长度
                this.Rules_length=parseInt(rules[1]);
              }
              _this.innerVisible = true;
            }else{

              _this.$message({
                message: '请先输入带*号必填项',
                type: 'warning'
              });
            }

          },

          // 保存卡号规则
          saveCardRules(){
            let _this=this,reg= /^[0-9a-zA-Z]+$/;

            if(!_this.isnull(_this.Rules_length)){

              if(!isNaN(parseInt(_this.Rules_length))){

                  if(reg.test(_this.Rules_pre)&&reg.test(_this.Rules_last)){

                      if((_this.Rules_pre.length+parseInt(_this.Rules_length)+_this.Rules_last.length)>20){

                        _this.$message({
                          message: '长度不能超过20',
                          type: 'warning'
                        });

                      }else{

                        _this.innerVisible = false;
                        _this.CertainCardLevelJson.special_card_rule = _this.Rules_pre+'/'+_this.Rules_length+'/'+_this.Rules_last;
                        console.log(_this.CertainCardLevelJson.special_card_rule);
                      }

                  }else{

                    _this.$message({
                      message: '禁止输入特殊字符',
                      type: 'warning'
                    });
                  }

              }else{
                    _this.$message({
                      message: '长度必须为数字',
                      type: 'warning'
                    });
              }
            }else{
                    _this.$message({
                      message: '长度为必填选项',
                      type: 'warning'
                    });
            }


          },

          // 清空规则
          clearCardRules(){
            this.Rules_pre="",this.Rules_last="",this.Rules_length="";
            this.CertainCardLevelJson.special_card_rule = "";
          },



          // 页面公共函数.js***********************************************************************

          // 改变布尔值函数
          BooleanInt(msg){
            if(typeof msg==="boolean"&&msg){
              msg=1;
            }else if(typeof msg==="boolean"&&!msg){
              msg=0;
            }else if(typeof msg==="number"&&msg){
              msg=true;
            }else if(typeof msg==="number"&&!msg){
              msg=false;
            }
            return msg;
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

          // 获取当前时间具体到秒
          getNowFormatDate() {
              var date = new Date();
              let seperator1 = "-";
              let seperator2 = ":";
              let month = date.getMonth() + 1;
              let strDate = date.getDate();
              let strHours = date.getHours();
              let strMinutes = date.getMinutes();
              let strSeconds = date.getSeconds();

              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              if (strHours >= 0 && strHours <= 9) {
                  strHours = "0" + strHours;
              }
              if (strMinutes >= 0 && strMinutes <= 9) {
                  strMinutes = "0" + strMinutes;
              }
              if (strSeconds >= 0 && strSeconds <= 9) {
                  strSeconds = "0" + strSeconds;
              }

              var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                      + " " + strHours + seperator2 + strMinutes
                      + seperator2 + strSeconds;
              return currentdate;
          },
          // 当前时间加年数
          AddgetNowFormatDate(num) {
              var date = new Date();
              let seperator1 = "-";
              let seperator2 = ":";
              let month = date.getMonth() + 1;
              let strDate = date.getDate()-1;
              let strHours = date.getHours();
              let strMinutes = date.getMinutes();
              let strSeconds = date.getSeconds();

              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }

              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }

              if (strHours >= 0 && strHours <= 9) {
                  strHours = "0" + strHours;
              }

              if (strMinutes >= 0 && strMinutes <= 9) {
                  strMinutes = "0" + strMinutes;
              }

              if (strSeconds >= 0 && strSeconds <= 9) {
                  strSeconds = "0" + strSeconds;
              }

              var currentdate = date.getFullYear()+num + seperator1 + month + seperator1 + strDate
                      + " " + strHours + seperator2 + strMinutes
                      + seperator2 + strSeconds;

              return currentdate;
          },

        },

        // 页面created 初始数据加载
        created(){
          this.getTabsData();
          this.get_items_data();

        }
    }
</script>
<style>
.el-dialog{
  width: 80%;
  min-width: 1336px;
}
</style>
<style lang="less" scoped>
  // 更改button-primary
  .el-button--primary {
      color: #fff;
      background-color: #4488E9;
      border-color: #4488E9;
  }
  // 会员计划
  .MemberPlan{
      padding: 10px;
      // 搜索栏
      .search{
          background-color: #F7F7F7;
          padding:10px 0 10px 20px;
          overflow: hidden;
          margin: 16px 0;
          font-size: 14px;
      }
  }
  .inputCell{
    width: 40%;
    display: inline-block;
    overflow: hidden;
    line-height: 40px;
    margin: 10px 0;
    p{
      width: 30%;
      display: inline-block;
      i{
        color: #FF2929;
      }
    }
  }
  // 微信会员显示详情
  .ShowDetail{
      padding:0 20px;
      background-color: #F7F7F7;
      overflow: hidden;
      .leftDetail{
        width: 60%;
        // 选择
          .botCheck{
            .check{
              width: 20%;
              display: inline-block;
              margin: 8px 0;
              span{
                display: inline-block;
                width: 70%;
                margin-right: 20px;
              }
            }
          }
      }
      .rightDetail{
        width: 39%;
        overflow: hidden;
        .rightLeft{
          float: left;
          width: 50%;
          // 选择
          .botCheck{
            .check{
              margin:10px 0 20px 0;
              span{
                display: inline-block;
                width: 45%;
                margin-left: 20px;
              }
            }
          }
        }
        .rightShow{
          float: right;
          width: 45%;
          .cellp{
                line-height: 50px;
              }
        }

      }
  }
  // 会员列表logo
  .iconLogo{
      color: #333333;
      font-size: 22px;
      margin: 20px 0;
  }
  .iconLogo::before{
      content: " ";
      display: inline-block;
      width: 28px;
      height: 25px;
      background: url("../../assets/images/member/icon-logo.png") no-repeat center;
      background-size: 100%;
      vertical-align: -4px;
      margin-right: 10px;
  }
  .cardTypeLevel{
    padding:0 0 5px 0;
    img{
      cursor: pointer;
    }
  }
  // 取消保存
  .CancleAndSave{
      overflow: hidden;
      margin-top: 50px;
      margin-bottom: 20px;
  }
  // 表格
  .table{
      font-size: 14px;
      border: #CCCCCC 1px solid;
      table{
          border-collapse:collapse;
          border-spacing:0;
          text-align: center;
          thead{
              line-height: 40px;
              background-color: #68819E;
              color: #ffffff;
              tr{
                  th{
                    font-weight:400;
                    font-size: 16px;
                  }
              }
          }
          tbody{
              line-height: 40px;
              color: #333333;
              tr{
                  cursor: pointer;
                  td{
                    border: 1px solid #CCCCCC;
                  }
                  span{
                    color: #68819E;
                    cursor: pointer;
                  }
                  .col{border:1px #68819E solid;margin:0 10px;}
              }
              tr:hover{
                background-color: #eeeeee;
              }
          }
      }
      // 分页
      .pagination{
          margin: 36px 0 14px 0;
          overflow: hidden;
          p{
          margin-left: 20px;
          }
          .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #68819E;
          color: #fff;
          }
      }
  }
  // 模态框
  .outdialog{
    overflow: hidden;
    // 标题
    .title{
      font-size:22px;
      padding: 10px 0;
    }
    // 等级信息
    .classMes{
      background-color: #fff;
      overflow: hidden;
      .inputCell{
        margin: 2px 0;
      }
    }
  }
  // 内层dialog
  .innerDialog{
    overflow: hidden;
  }
  .secDiaAdmin{
    line-height: 40px;
    p{
      width: 48%;
      display: inline-block;
      text-align: center;
    }
  }
</style>
