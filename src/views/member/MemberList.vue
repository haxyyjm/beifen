<template>
  <div class="memberDiv">
    <!-- 列表清单显示 -->
    <div v-show=" listShow == true " class="MemberList">
      <!-- 会员列表 -->
      <p class="iconLogo">会员列表</p>
      <!-- 查询框 -->
      <div class="search">
        会员卡号/姓名：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
        <!-- 查询 -->
        <el-button type="primary">查询</el-button>
        <!-- 添加 -->
        <el-button type="primary" @click="NewAddBase();">添加</el-button>
      </div>
      <!-- 列表清单部分 -->
      <div class="table" style="width: 100%;">
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>卡号</th>
              <th>会员计划</th>
              <th>会员等级</th>
              <th>性别</th>
              <th>证件号</th>
              <th>手机</th>
              <th>Email</th>
              <th>积分累计</th>
              <th>积分消耗</th>
              <th>积分余额</th>
              <th>付款</th>
              <th>消费</th>
              <th>储值余额</th>
              <th>信用</th>
              <th>有效期</th>
              <th>卡状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in cardBaseList"
              :key="index"
              @click="get_certain_card_base_list(item.id);"
            >
              <td>{{ index+1 }}</td>
              <td>{{ item.card_name }}</td>
              <td>{{ item.card_no }}</td>
              <td>{{ item.card_type }}</td>
              <td>{{ item.card_level }}</td>
              <td>
                <span v-if=" item.sex=='1'">男</span>
                <span v-else>女</span>
              </td>
              <td>{{ item.id_no }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.point_pay }}</td>
              <td>{{ item.point_charge }}</td>
              <td>{{ item.point_pay-item.point_charge }}</td>
              <td>{{ item.money_pay }}</td>
              <td>{{ item.money_charge }}</td>
              <td>{{ item.money_pay - item.money_charge - item.money_freeze }}</td>
              <td>{{ item.credit }}</td>
              <td>{{ item.date_end }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="cardBaseList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentPageChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 会员显示 -->
    <div v-show=" listShow == false " style="width: 1660px;" class="MemberList">
      <!------------------------- 会员列表 ------------------------->
      <p class="iconLogo">
        会员列表
        <span class="pull-right" @click="showFunc();">返回</span>
      </p>

      <div class="memberMes">
        <!-- 基本信息部分 身份信息部分 -->
        <div class="basic">
          <!-- 左侧信息部分 -->
          <div class="pull-left" style="width: 60%;">
            <div class="link">
              <p class="title_demo">基本信息</p>
              <div class="inputCell" style="width: 40%;">
                <p>
                  <i>*</i> 姓名：
                </p>
                <!-- 查询input -->
                <el-input
                  v-model="certainBaseData.card_name"
                  placeholder="请输入内容"
                  style="width: 250px;"
                ></el-input>
              </div>
              <div class="inputCell" style="width: 40%;margin-left: 93px;">
                <p>别名：</p>
                <!-- 查询input -->
                <el-input
                  v-model="certainBaseData.card_base_link.card_name2"
                  placeholder="请输入内容"
                  style="width: 250px;"
                ></el-input>
              </div>
              <div class="inputCell" style="width: 40%;">
                <p>称呼：</p>
                <!-- 查询input -->
                <el-input
                  v-model="certainBaseData.card_base_link.salutation"
                  placeholder="请输入内容"
                  style="width: 250px;"
                ></el-input>
              </div>
              <div class="inputCell" style="width: 40%;margin-left: 93px;">
                <p>备注：</p>
                <!-- 查询input -->
                <el-input
                  v-model="certainBaseData.card_base_link.remark"
                  type="textarea"
                  maxlength="512"
                  placeholder="请输入内容"
                  style="width: 250px;height:80px;position: absolute;top: 0;left: 80px;"
                ></el-input>
              </div>
              <div class="inputCell" style="width: 40%;">
                <p>
                  <i>*</i> 性别：
                </p>
                <el-radio v-model="certainBaseData.sex" label="1">男</el-radio>
                <el-radio v-model="certainBaseData.sex" label="0">女</el-radio>
              </div>
            </div>
            <div class="link">
              <p class="title_demo">身份信息</p>
              <div class="inputCell" style="width: 40%;">
                <p>
                  <i>*</i>证件类型：
                </p>
                <el-select
                  v-model="certainBaseData.id_code"
                  filterable
                  placeholder="请选择"
                  style="width: 250px;"
                >
                  <el-option
                    v-for="(item,index) in idCodeArr"
                    :key="index"
                    :label="item.descript"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <div class="inputCell" style="width: 40%;margin-left: 93px;">
                <p>国籍：</p>
                <el-select
                  v-model="certainBaseData.card_base_link.nation"
                  disabled
                  filterable
                  placeholder="请选择"
                  style="width: 250px;"
                >
                  <el-option
                    v-for="(item,index) in nationArr"
                    :key="index"
                    :label="item.descript"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <div class="inputCell" style="width: 40%;">
                <p>
                  <i>*</i> 证件号：
                </p>
                <!-- 查询input -->
                <el-input v-model="certainBaseData.id_no" placeholder="请输入内容" style="width: 250px;"></el-input>
              </div>
              <div class="inputCell" style="width: 40%;margin-left: 93px;">
                <p>语种：</p>
                <el-select
                  v-model="certainBaseData.card_base_link.language"
                  filterable
                  placeholder="请选择"
                  style="width: 250px;"
                >
                  <el-option
                    v-for="(item,index) in languageArr"
                    :key="index"
                    :label="item.descript"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <div class="inputCell" style="width: 40%;">
                <p>生日：</p>
                <!-- 生日选择 -->
                <el-date-picker
                  v-if="newAddBtn"
                  v-model="certainBaseData.birth"
                  type="date"
                  placeholder="选择日期"
                  style="width: 250px;"
                ></el-date-picker>
                <el-date-picker
                  v-else
                  v-model="certainBaseData.birth"
                  type="date"
                  placeholder="选择日期"
                  style="width: 250px;"
                  disabled
                ></el-date-picker>
              </div>
              <div class="inputCell" style="width: 40%;margin-left: 93px;">
                <p>民族：</p>
                <el-select
                  v-model="certainBaseData.race"
                  filterable
                  placeholder="请选择"
                  style="width: 250px;"
                >
                  <el-option
                    v-for="(item,index) in raceArr"
                    :key="index"
                    :label="item.descript"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="pull-left basicRight">
            <div class="showbox">
              <div class="cardImg">
                <img src="../member/img/icon-level.png" alt>
              </div>
              <p>创建人：{{ certainBaseData.create_user}}</p>
              <p>创建日期：{{ certainBaseData.create_datetime}}</p>
              <p>修改人：{{ certainBaseData.modify_user }}</p>
              <p>修改日期：{{ certainBaseData.modify_datetime }}</p>
              <!-- 取消保存 -->
              <div class="resetBtn">
                <el-button
                  type="primary"
                  @click="remove_card_base(certainBaseData.id);"
                  style="background-color: #68819E;"
                >删除</el-button>
                <el-button
                  v-if="newAddBtn"
                  type="primary"
                  @click="add_card_base();"
                  style="background-color: #4488E9;"
                >添加</el-button>
                <el-button
                  v-else
                  type="primary"
                  @click="update_card_base(certainBaseData.id);"
                  style="background-color: #4488E9;"
                >保存</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 联系方式 -->
        <div class="link">
          <p class="title_demo">联系方式</p>
          <div class="inputCell">
            <p style="width: 16%;">手机：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.phone" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p style="width: 15%;">国家：</p>
            <el-select
              v-model="certainBaseData.card_base_link.country"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in countryArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>微信号：</p>
            <!-- 查询input -->
            <el-input disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p style="width: 16%;">电话：</p>
            <!-- 查询input -->
            <el-input placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p style="width: 15%;">州/省：</p>
            <el-select
              v-model="certainBaseData.card_base_link.province"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in provinceArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>邮编：</p>
            <!-- 查询input -->
            <el-input disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p style="width: 16%;">邮箱：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.email" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p style="width: 15%;">城市：</p>
            <el-select
              v-model="certainBaseData.card_base_link.city"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in cityArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>地址：</p>
            <el-input
              v-model="certainBaseData.card_base_link.address"
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
        </div>
        <!-- 会员类型 -->
        <div class="link">
          <p class="title_demo">会员类型</p>
          <div class="inputCell" style="width: 22%;">
            <p style="width: 23%;">市场：</p>
            <el-select
              v-model="certainBaseData.card_base_link.address"
              filterable
              placeholder="请选择"
              style="width: 200px;"
            >
              <el-option
                v-for="(item,index) in marketArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell" style="width: 21%;">
            <p>来源：</p>
            <el-select
              v-model="certainBaseData.card_src"
              filterable
              placeholder="请选择"
              style="width: 200px;"
            >
              <el-option
                v-for="(item,index) in srcArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell" style="width: 21%;">
            <p>推荐人：</p>
            <el-select
              v-model="certainBaseData.card_src"
              filterable
              disabled
              placeholder="请选择"
              style="width: 200px;"
            >
              <el-option
                v-for="(item,index) in idCodeArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell" style="width: 23%;">
            <p>服务经理：</p>
            <el-select
              v-model="certainBaseData.card_src"
              filterable
              disabled
              placeholder="请选择"
              style="width: 204px;"
            >
              <el-option
                v-for="(item,index) in idCodeArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 社会信息 -->
        <div class="link">
          <p class="title_demo">社会信息</p>
          <div class="inputCell" style="width: 23%;">
            <p style="width: 23%;">单位名称：</p>
            <el-select
              v-model="certainBaseData.card_base_link.company_name"
              disabled
              filterable
              placeholder="请选择"
              style="width: 200px;"
            >
              <!-- <el-option
                  v-for="(item,index) in idCodeArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
              </el-option>-->
            </el-select>
          </div>
          <div class="inputCell" style="width: 20%;">
            <p>职务：</p>
            <el-select
              v-model="certainBaseData.card_base_link.occupation"
              disabled
              filterable
              placeholder="请选择"
              style="width: 200px;"
            >
              <!-- <el-option
                  v-for="(item,index) in idCodeArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
              </el-option>-->
            </el-select>
          </div>
          <div class="inputCell" style="width: 21%;">
            <p>宗教：</p>
            <el-select
              v-model="certainBaseData.card_base_link.religion"
              filterable
              placeholder="请选择"
              style="width: 200px;"
            >
              <el-option
                v-for="(item,index) in religionArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell" style="width: 23%;">
            <p>收入级别：</p>
            <el-select
              v-model="certainBaseData.card_base_link.salary"
              filterable
              placeholder="请选择"
              style="width: 200px;"
            >
              <el-option
                v-for="(item,index) in salaryArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 喜好信息 -->
        <div class="link">
          <p class="title_demo">喜好信息</p>
          <div class="inputCell">
            <p>客房布置：</p>
            <el-select
              v-model="certainBaseData.card_prefer.amenity"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <!-- <el-option
                  v-for="(item,index) in idCodeArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
              </el-option>-->
            </el-select>
          </div>
          <div class="inputCell">
            <p>排房要求：</p>
            <el-select
              v-model="certainBaseData.card_prefer.room_prefer"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <!-- <el-option
                  v-for="(item,index) in idCodeArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
              </el-option>-->
            </el-select>
          </div>
          <div class="inputCell">
            <p>兴趣爱好：</p>
            <el-select
              v-model="certainBaseData.card_prefer.interest"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in interestArr"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>其它喜好：</p>
            <el-select
              v-model="certainBaseData.card_prefer.prefer_other"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <!-- <el-option
                  v-for="(item,index) in idCodeArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
              </el-option>-->
            </el-select>
          </div>
          <div class="inputCell">
            <p>特殊要求：</p>
            <el-select
              v-model="certainBaseData.card_prefer.specials"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <!-- <el-option
                  v-for="(item,index) in idCodeArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
              </el-option>-->
            </el-select>
          </div>
        </div>
      </div>
      <!------------------------- 卡信息 --------------------------->
      <p class="iconLogo">卡信息</p>
      <!-- v-if="newAddBtn||canEdit" -->
      <div v-if="newAddBtn||canEdit" class="memberMes">
        <!-- 卡信息 -->
        <div class="link">
          <div class="inputCell">
            <p>
              <i>*</i> 会员计划：
            </p>
            <!-- 查询input -->
            <!-- <el-input v-model="certainBaseData.card_type"  placeholder="请输入内容" style="width: 250px;"></el-input> -->
            <el-select
              v-model="certainBaseData.card_type"
              filterable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in CardTypeTree"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>
              <i>*</i> 会员等级：
            </p>
            <!-- 查询input -->
            <el-select
              v-model="certainBaseData.card_level"
              filterable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_card_level_tree();"
            >
              <el-option
                v-for="(item,index) in CardLevelTree"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>发展来源：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.card_src" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>状态：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.status" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>发卡酒店：</p>
            <!-- 查询input -->
            皇冠晶品酒店（虹桥店）
          </div>
          <div class="inputCell">
            <p>销售员：</p>
            <!-- 查询input -->
            <!-- {{ certainBaseData.salesman }} -->
            <!-- 查询input -->
            <el-select
              v-model=" certainBaseData.salesman "
              filterable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_salesman();"
            >
              <el-option
                v-for="(item,index) in salesmanArr"
                :key="index"
                :label="item.real_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>有效期起：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.date_begin"
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>有效期止：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.date_end" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>备注：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.remark"
              type="textarea"
              placeholder="请输入内容"
              style="width: 250px;height:80px;position: absolute;top: 0;left: 96px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>房价码：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.rate_code" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>餐饮码：</p>
            <!-- 查询input -->
            <el-input v-model="certainBaseData.pos_mode" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <br>
          <div class="inputCell">
            <p>积分余额：</p>
            {{ certainBaseData.point_pay-certainBaseData.point_charge}}
          </div>
          <div class="inputCell">
            <p>储值余额：</p>
            {{ certainBaseData.money_pay - certainBaseData.money_charge - certainBaseData.money_freeze}}
          </div>
        </div>
        <!-- 取消保存 -->
        <div class="resetBtn">
          <el-button type="primary" class="btn">注册打印</el-button>
          <el-button type="primary" class="btn">制卡</el-button>
          <el-button type="primary" class="btn" @click="canEdit = true">修改</el-button>
          <el-button type="primary" class="btn" @click="ifStatus('E');">激活</el-button>
          <el-button type="primary" class="btn" @click="ifStatus('R');">挂失</el-button>
          <el-button type="primary" class="btn" @click="ifStatus('S');">停用</el-button>
          <el-button type="primary" class="btn" disabled>升降级</el-button>
          <el-button type="primary" class="btn" disabled>消费密码</el-button>
          <router-link to="/IntegralList" style="display: inline-block;">
            <el-button type="primary" class="btn">积分</el-button>
          </router-link>
          <el-button type="primary" class="btn" disabled>储值</el-button>
        </div>
      </div>
      <div v-else class="memberMes">
        <!-- 卡信息 -->
        <div class="link">
          <div class="inputCell">
            <p>
              <i>*</i>会员计划：
            </p>
            <!-- 查询input -->
            <!-- <el-input v-model="certainBaseData.card_type"  placeholder="请输入内容" style="width: 250px;"></el-input> -->
            <el-select
              v-model="certainBaseData.card_type"
              filterable
              disabled
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in CardTypeTree"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>
              <i>*</i>会员等级：
            </p>
            <!-- 查询input -->
            <el-select
              v-model="certainBaseData.card_level"
              filterable
              disabled
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_card_level_tree();"
            >
              <el-option
                v-for="(item,index) in CardLevelTree"
                :key="index"
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>发展来源：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.card_src"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>状态：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.status"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>发卡酒店：</p>
            <!-- 查询input -->
            皇冠晶品酒店（虹桥店）
          </div>
          <div class="inputCell">
            <p>销售员：</p>
            <!-- 查询input -->
            <!-- 查询input -->
            <el-select
              v-model=" certainBaseData.salesman "
              filterable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_salesman();"
            >
              <el-option
                v-for="(item,index) in salesmanArr"
                :key="index"
                :label="item.real_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>有效期起：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.date_begin"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>有效期止：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.date_end"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>备注：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.remark"
              type="textarea"
              disabled
              placeholder="请输入内容"
              style="width: 250px;height:80px;position: absolute;top: 0;left: 96px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>房价码：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.rate_code"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>餐饮码：</p>
            <!-- 查询input -->
            <el-input
              v-model="certainBaseData.pos_mode"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <br>
          <div class="inputCell">
            <p>积分余额：</p>
            {{ certainBaseData.point_pay-certainBaseData.point_charge}}
          </div>
          <div class="inputCell">
            <p>储值余额：</p>
            {{ certainBaseData.money_pay - certainBaseData.money_charge - certainBaseData.money_freeze}}
          </div>
        </div>
        <!-- 取消保存 -->
        <div class="resetBtn">
          <el-button type="primary" class="btn">注册打印</el-button>
          <el-button type="primary" class="btn">制卡</el-button>
          <el-button type="primary" class="btn" @click="canEdit = true">修改</el-button>
          <el-button type="primary" class="btn" @click="ifStatus('有效');">激活</el-button>
          <el-button type="primary" class="btn" @click="ifStatus('挂失');">挂失</el-button>
          <el-button type="primary" class="btn" @click="ifStatus('停用');">停用</el-button>
          <el-button type="primary" class="btn">升降级</el-button>
          <el-button type="primary" class="btn">消费密码</el-button>
          <router-link to="/IntegralList" style="display: inline-block;">
            <el-button type="primary" class="btn">积分</el-button>
          </router-link>
          <el-button type="primary" class="btn">储值</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

//get_card_base_list    获取会员所有列表
//get_card_base_info+id 获取单个会员详情
//add_card_base         增加单条会员数据
//update_card_base+id   更新单条会员数据
//remove_card_base+id   删除单条会员数据

export default {
  name: "MemberList",
  data() {
    return {
      // 下拉框请求头
      SelectUrLHeader: "http://47.98.113.173:9103/",
      // 请求地址头
      UrLHeader: "http://47.98.113.173:9102/v1/", //http://member.crowncrystalhotel.com/47.98.113.173:8098
      // 分页
      currentPage: 1,
      pagesize: 10,
      total: 0,
      // 初始状态声明
      statusArr: [
        {
          code: "O",
          descript: "初始"
        },
        {
          code: "E",
          descript: "有效"
        },
        {
          code: "L",
          descript: "销卡"
        },
        {
          code: "R",
          descript: "挂失"
        },
        {
          code: "B",
          descript: "损坏"
        },
        {
          code: "S",
          descript: "停用"
        },
        {
          code: "D",
          descript: "休眠"
        }
      ],
      // 下拉框会员计划初始化数据
      CardTypeTree: [],
      // 下拉框会员等级初始化数据
      CardLevelTree: [],
      // 下拉框证件类型初始化数据
      idCodeArr: [],
      // 下拉框国籍初始化数据
      nationArr: [],
      //下拉框语种初始化数据
      languageArr: [],
      //下拉框民族初始化数据
      raceArr: [],
      //下拉框国家初始化数据
      countryArr: [],
      //下拉框州省初始化数据
      provinceArr: [],
      //下拉框城市初始化数据
      cityArr: [],
      //下拉框地址初始化数据
      addressArr: [],
      //下拉框宗教初始化数据
      religionArr: [],
      //下拉框收入等级初始化数据
      salaryArr: [],
      //下拉框市场码初始化数据
      marketArr: [],
      //下拉框来源吗初始化数据
      srcArr: [],
      //下拉框兴趣爱好初始化数据
      interestArr: [],
      // 销售人员
      salesmanArr:[],
      // 会员列表
      cardBaseList: [],
      // 单条会员数据初始化
      certainBaseData: {
        card_base_link: {
          language: "",
          title: "",
          salutation: "",
          religion: "",
          occupation: "",
          career: "",
          nation: "",
          country: "",
          province: "",
          city: "",
          zip_code: "",
          address: "",
          salary: "",
          education: "",
          marital: "",
          company_id: null,
          company_name: "",
          company_position: "",
          pic_photo: "",
          pic_sign: "",
          remark: ""
        },
        card_prefer: {
          create_user: "",
          modify_user: "",
          card_id: null,
          amenity: "",
          feature: "",
          interest: "",
          prefer_front: "",
          prefer_fb: "",
          prefer_other: "",
          specials: "",
          room_prefer: ""
        },
        create_user: "tom",
        create_datetime: "2019-02-27T20:58:24.228641",
        modify_user: "tom",
        modify_datetime: "2019-02-27T21:12:44.475837",
        card_no: "",
        card_master: null,
        status: "E",
        card_type: "",
        card_level: "",
        card_src: "WEB",
        card_name: " ",
        card_name2: null,
        rate_code: "",
        pos_mode: "",
        date_begin: new Date(),
        date_end: new Date(),
        phone: null,
        email: null,
        birth: "2019-02-26T14:08:15",
        race: null,
        sex: "1",
        id_code: " ",
        id_no: "",
        password: null,
        salesman: null,
        point_pay: "0.00",
        point_charge: "0.00",
        point_last_num: 0,
        point_last_num_link: 0,
        money_pay: "0.00",
        money_charge: "0.00",
        money_freeze: "0.00",
        money_receipt: "0.00",
        money_real_pay: "0.00",
        money_last_num: 0,
        money_last_num_link: 0,
        credit: "0.00",
        sta_transform_date: null,
        iss_hotel: "1",
        referees: null,
        service_manager: null,
        weixin_id: null,
        remark: null
      },
      // 是否显示列表
      listShow: true,
      // 是否是新添加
      newAddBtn: false,
      // 是否可以更改卡信息
      canEdit: false,
      checked: true,
      SearchContent: "",
      // 生日选择
      memberBirDate: "",
      // 中文名字或者英文名字判断
      name_reg: /^[a-zA-Z\u4e00-\u9fa5]+$/,
      // 身份证则表达式
      id_code_reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      //手机验证正则表达式
      phone_reg: /^1[3|4|5|7|8][0-9]{9}$/,
      //电话验证正则表达式
      telephone_reg: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
    };
  },
  methods: {
    // 修改状态激活按钮封装函数
    ifStatus(status) {
      this.certainBaseData.status = status;
      this.canEdit = true;
      this.$message({
        message: "状态已修改",
        type: "success"
      });
    },
    // 是否显示详情
    showFunc() {
      this.listShow = !this.listShow;
      this.newAddBtn = false;
    },
    // 获取会员所有列表get_card_base_list
    get_card_base_list() {
      //设置请求路径
      let url =
          this.UrLHeader +
          "customer/member/get_card_base_list/?page=1&page_size=10",
        _this = this;
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          // console.log(res.data);
          if (res.data.message == "success") {
            if (res.data.data.results.length) {
              // 初始化渲染tabs导航项目
              _this.cardBaseList = res.data.data.results;
              _this.total = res.data.data.count;
              // 数据转换---
              for (let i in _this.cardBaseList) {
                // 状态转换
                for (let j in _this.statusArr) {
                  if (_this.cardBaseList[i].status == _this.statusArr[j].code) {
                    _this.cardBaseList[i].status = _this.statusArr[j].descript;
                  }
                }
                // 会员计划转换
                for (let m in _this.CardTypeTree) {
                  if (
                    _this.cardBaseList[i].card_type ==
                    _this.CardTypeTree[m].code
                  ) {
                    _this.cardBaseList[i].card_type =
                      _this.CardTypeTree[m].descript;
                    //会员等级转换
                    for (let n in _this.CardTypeTree[m].children) {
                      if (
                        (_this.cardBaseList[i].card_level =
                          _this.CardTypeTree[m].children[n].code)
                      ) {
                        _this.cardBaseList[i].card_level =
                          _this.CardTypeTree[m].children[n].descript;
                      }
                    }
                  }
                }
              }
            } 
          } else {
            _this.$message.error("请求服务器失败，稍后重试");
          }
        })
        .catch(error => {});
    },

    // 获取单条会员所有列表
    get_certain_card_base_list(id) {
      //设置请求路径
      let url =
          this.UrLHeader + "customer/member/get_card_base_info/" + id + "/",
        _this = this;
      _this.showFunc();
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            _this.certainBaseData = res.data.data;
            // 状态转换
            for (let j in _this.statusArr) {
              if (_this.certainBaseData.status == _this.statusArr[j].code) {
                _this.certainBaseData.status = _this.statusArr[j].descript;
              }
            }
            // 会员计划转换
            for (let m in _this.CardTypeTree) {
              if (
                _this.certainBaseData.card_type == _this.CardTypeTree[m].code
              ) {
                _this.certainBaseData.card_type =
                  _this.CardTypeTree[m].descript;

                //会员等级转换
                for (let n in _this.CardTypeTree[m].children) {
                  if (
                    (_this.certainBaseData.card_level =
                      _this.CardTypeTree[m].children[n].code)
                  ) {
                    _this.certainBaseData.card_level =
                      _this.CardTypeTree[m].children[n].descript;
                  }
                }
              }
            }
          } else {
            _this.$message.error("请求服务器失败，稍后重试");
          }
        })
        .catch(error => {});
    },

    // 添加单条会员
    NewAddBase() {
      this.showFunc();
      this.newAddBtn = true;
      this.certainBaseData = {
        card_base_link: {
          card_id: null,
          language: "",
          title: "",
          salutation: "",
          religion: "",
          occupation: "",
          career: "",
          nation: "",
          country: "",
          province: "",
          city: "",
          zip_code: "",
          address: "",
          salary: "",
          education: "",
          marital: "",
          company_id: null,
          company_name: "",
          company_position: "",
          pic_photo: "",
          pic_sign: "",
          remark: ""
        },
        card_prefer: {
          card_id: null,
          amenity: "",
          feature: "",
          interest: "",
          prefer_front: "",
          prefer_fb: "",
          prefer_other: "",
          specials: "",
          room_prefer: ""
        },
        card_no: "",
        card_master: null,
        status: "E",
        card_type: "",
        card_level: "",
        card_src: "WEB",
        card_name: " ",
        card_name2: null,
        rate_code: "",
        pos_mode: "",
        date_begin: new Date(),
        date_end: new Date(),
        phone: null,
        email: null,
        birth: "2019-02-26T14:08:15",
        race: null,
        sex: "1",
        id_code: " ",
        id_no: "",
        password: null,
        salesman: null,
        point_pay: "0.00",
        point_charge: "0.00",
        point_last_num: 0,
        point_last_num_link: 0,
        money_pay: "0.00",
        money_charge: "0.00",
        money_freeze: "0.00",
        money_receipt: "0.00",
        money_real_pay: "0.00",
        money_last_num: 0,
        money_last_num_link: 0,
        credit: "0.00",
        sta_transform_date: null,
        iss_hotel: "1",
        referees: null,
        service_manager: null,
        weixin_id: null,
        remark: null
      };
    },

    // 增加请求后台接口
    add_card_base() {
      //设置请求路径
      let addCaseUrl = this.UrLHeader + "customer/member/add_card_base/",
        _this = this;

      let copyObj = Object.assign({}, _this.certainBaseData);
      let cardBaseLink = _this.certainBaseData.card_base_link;

      delete copyObj.card_base_link;

      let cardBase = copyObj;

      for (let j in _this.statusArr) {
        if (cardBase.status == _this.statusArr[j].descript) {
          cardBase.status = _this.statusArr[j].code;
        }
      }
      // 会员计划转换
      for (let m in _this.CardTypeTree) {
        if (cardBase.card_type == _this.CardTypeTree[m].code) {
          cardBase.card_type = _this.CardTypeTree[m].id;

          //会员等级转换
          for (let n in _this.CardTypeTree[m].children) {
            if (
              (cardBase.card_level = _this.CardTypeTree[m].children[n].code)
            ) {
              cardBase.card_level = _this.CardTypeTree[m].children[n].id;
            }
          }
        }
      }

      if (!_this.isnull(cardBase.card_name)) {
        // if (_this.id_code_reg.test(cardBase.id_no)) {
          if (_this.phone_reg.test(cardBase.phone)) {
            axios({
              url: addCaseUrl,
              method: "post",
              data: {
                card_base: cardBase,
                card_base_link: cardBaseLink
              }
            })
              .then(function(res) {
                if (res.data.message == "success") {
                  _this.get_card_base_list(_this.certainBaseData.id);
                  _this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                } else {
                  _this.$message.error("保存信息失败");
                }
              })
              .catch(error => {});
          } else {
            _this.$message.error("请输入正确的手机号码");
          }
        // } else {
        //   _this.$message.error("请输入正确的身份证号码");
        // }
      } else {
        _this.$message.error("姓名不能为空");
      }
    },
    // 更新单条会员列表update_card_base
    update_card_base(id) {
      //设置请求路径
      let updateCaseUrl =
          this.UrLHeader + "customer/member/update_card_base/" + id + "/",
        _this = this;

      let copyObj = Object.assign({}, _this.certainBaseData);
      let cardBaseLink = _this.certainBaseData.card_base_link;

      delete copyObj.card_base_link;

      let cardBase = copyObj;
      console.log( _this.certainBaseData);
      // 状态转换
      for (let j in _this.statusArr) {
        if (cardBase.status == _this.statusArr[j].descript) {
          cardBase.status = _this.statusArr[j].code;
        }
      }
      // 会员计划转换
      for (let m in _this.CardTypeTree) { 
        if (cardBase.card_type == _this.CardTypeTree[m].descript) {
          cardBase.card_type = _this.CardTypeTree[m].id;

          //会员等级转换
          for (let n in _this.CardTypeTree[m].children) {
            if (
              (cardBase.card_level = _this.CardTypeTree[m].children[n].descript)
            ) {
              cardBase.card_level = _this.CardTypeTree[m].children[n].id;
            }
          }
        }
      }
      console.log( _this.certainBaseData);
      // console.log("姓名"+!_this.isnull(cardBase.card_name));
      // console.log("身份证"+_this.id_code_reg.test(cardBase.id_no));
      // console.log("手机"+_this.phone_reg.test(cardBase.phone));
      //姓名判断
      if (!_this.isnull(cardBase.card_name)) {
        //身份证判断
        // if (_this.id_code_reg.test(cardBase.id_no)) {
          //手机号判断
          if (_this.phone_reg.test(cardBase.phone)) {
            axios({
              url: updateCaseUrl,
              method: "post",
              data: {
                card_base: cardBase,
                card_base_link: cardBaseLink
              }
            })
              .then(function(res) {
                if (res.data.message == "success") {
                  _this.get_card_base_list(_this.certainBaseData.id);
                  _this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                } else {
                  _this.$message.error("保存信息失败");
                }
              })
              .catch(error => {});
          } else {
            _this.$message.error("请输入正确的手机号码");
          }
        // } else {
        //   _this.$message.error("请输入正确的身份证号码");
        // }
      } else {
        _this.$message.error("姓名不能为空");
      }
    },

    // 删除单条会员列表update_card_base
    remove_card_base(id) {
      //设置请求路径
      let removeCaseUrl =
          this.UrLHeader + "customer/member/remove_card_base/" + id + "/",
        _this = this;
      _this
        .$confirm("是否永久该删除会员?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          axios
            .post(removeCaseUrl)
            .then(function(res) {
              if (res.data.message == "success") {
                _this.showFunc();
                _this.get_card_base_list();
                _this.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                this.$message.error("保存信息失败");
              }
            })
            .catch(error => {});
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 是否可编辑
    canEditClassInfo() {
      this.canEdit = true;
    },
    //请求字典项
    get_code_list() {
      this.get_card_setting_tree(); // 请求会员计划\会员等级数据
      this.get_id_code_tree(); // 下拉框请求证件类型
      this.get_nation_tree(); // 获取国籍数据
      this.get_language_tree(); //语种
      this.get_race_tree(); //名族
      this.get_country_tree(); //国家
      this.get_province_tree(); //省份
      this.get_city_tree(); //城市
      this.get_religion_tree(); //宗教
      this.get_salary_tree(); //薪资水平
      this.get_interest_tree(); //兴趣爱好

      this.get_market();//市场码
      this.get_src();//来源码
    },

    // ------------------------------------------------------
    // 请求会员计划\会员等级数据
    get_card_setting_tree() {
      // this.CardTypeTree=this.get_select_class('get_card_setting_tree');
      //设置请求路径
      let url = this.UrLHeader + "customer/member/get_card_setting_tree/?code_type=MB",
        _this = this;
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            // console.log(res.data.data);
            if(res.data.data.results.length){
            // 初始化渲染tabs导航项目
            _this.CardTypeTree = res.data.data.results;
            }
           
          } else {
            _this.$message.error("请求服务器失败，稍后重试");
          }
        })
        .catch(error => {});
    },

    // 请求会员等级
    get_card_level_tree() {
      let _this = this;

      if (_this.CardTypeTree.length) {
        for (let i in _this.CardTypeTree) {
          // console.log(_this.certainBaseData.card_type);
          if (_this.certainBaseData.card_type == _this.CardTypeTree[i].code) {
            _this.CardLevelTree = _this.CardTypeTree[i].children;
            // console.log(_this.CardLevelTree);
          }
        }
      } else {
        _this.$message({
          message: "请先选择会员计划",
          type: "warning"
        });
      }
    },
    // 下拉框请求证件类型
    get_id_code_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=idcode&page_size=300",
        _this = this;
      if (!_this.idCodeArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.idCodeArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },

    // 获取国籍数据
    get_nation_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=nation&page_size=300",
        _this = this;
      if (!_this.nationArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.nationArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => { });
      }
    },
    // 获取市场数据
    get_market() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=market_code&page_size=300",
        _this = this;
      if (!_this.marketArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.marketArr = res.data.data.results;
              console.log(res.data.data.results)
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    
    // 获取市场数据
    get_src() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=src_code&page_size=300",
        _this = this;
      if (!_this.srcArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.srcArr = res.data.data.results;
              console.log(res.data.data.results)
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // get_language_tree获取语种
    get_language_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=language&page_size=300",
        _this = this;
      if (!_this.languageArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.languageArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取民族数据
    get_race_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=race&page_size=300",
        _this = this;
      if (!_this.raceArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.raceArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },

    // 获取国家数据
    get_country_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_country_list/?page_size=300",
        _this = this;
      if (!_this.countryArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            // console.log(res.data);
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.countryArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    //获取州省（州/省）数据
    get_province_tree() {
      //设置请求路径
      let _this = this,
        url =
          _this.SelectUrLHeader +
          "v1/system/settings/get_province_list/?country=" +
          _this.certainBaseData.card_base_link.country +
          "&page_size=300";
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            // 初始化渲染tabs导航项目
            _this.provinceArr = res.data.data.results;
          } else {
            _this.$message.error("请求服务器失败，稍后重试");
          }
        })
        .catch(error => {
          console.log("请求失败");
        });
    },
    //获取城市数据
    get_city_tree() {
      //设置请求路径 this.certainBaseData.card_base_link.province
      let _this = this,
        url =
          this.SelectUrLHeader +
          "v1/system/settings/get_division_list/?province=" +
          _this.certainBaseData.card_base_link.province +
          "&page_size=300";
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            // 初始化渲染tabs导航项目
            _this.cityArr = res.data.data.results;
          } else {
            _this.$message.error("请求服务器失败，稍后重试");
          }
        })
        .catch(error => {});
    },
    //获取宗教数据
    get_religion_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=religion&page_size=300",
        _this = this;
      if (!_this.religionArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios.get(url).then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.religionArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          }).catch(error => { });
      }
    },
    //获取宗教数据
    get_salesman() {
      //设置请求路径
      let url = "http://47.98.113.173:9519/v1/common/employee/info_list?page_size=30000",
        _this = this;
      if (!_this.salesmanArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios.get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              console.log('人员',res.data.data);
              _this.salesmanArr = res.data.data.list;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => { });
      }
    },
    //获取收入数据
    get_salary_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=salary&page_size=300",
        _this = this;
      if (!_this.salaryArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.salaryArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    //获取兴趣数据
    get_interest_tree() {
      //设置请求路径
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=interest&page_size=300",
        _this = this;
      if (!_this.interestArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.interestArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 下拉框请求
    // get_select_class(url){
    //   //设置请求路径
    //        let get_url  = this.UrLHeader+"customer/member/"+url+"/",
    //           _this = this;
    //       // 发送请求:将数据返回到一个回到函数中
    //        // 并且响应成功以后会执行then方法中的回调函数
    //        axios.get(get_url).then(function(res) {
    //          if(res.data.message=="success"){
    //             // 初始化渲染tabs导航项目
    //             return res.data.data;

    //          }else{
    //            _this.$message.error('请求服务器失败，稍后重试');
    //          }
    //       }).catch((error) => {

    //       });
    // },
    // 分页
    handleCurrentPageChange(currentPage) {
      let that = this;
      let url = that.UrLHeader + "customer/member/get_card_base_list/";
      //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
      axios({
        method: "get",
        url: url,
        params: {
          page: currentPage,
          page_size: 10
        }
      })
        .then(function(res) {
          that.cardBaseList = res.data.data.results;
          that.total = res.data.data.count;
          console.log(res.data.data);
        })
        .catch(function(err) {
          console.info(err);
        });
    },

    // 公共函数
    // 判断输入值是否为空
    isnull(val) {
      var str = val.replace(/(^\s*)|(\s*$)/g, ""); //去除空格;
      if (str == "" || str == undefined || str == null) {
        // this.$message('确认输入值不能为空');
        return true;
      } else {
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

      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHours +
        seperator2 +
        strMinutes +
        seperator2 +
        strSeconds;
      return currentdate;
    }
  },
  created() {
    // 初始化列表数据
    this.get_code_list();
    this.get_card_base_list();
  }
};
</script>
<style lang="less" scoped>
.el-button--primary {
  color: #fff;
  background-color: #4488e9;
  border-color: #4488e9;
}
.el-checkbox {
  color: #ffffff;
}
.title_demo {
  font-size: 16px;
  padding: 5px 0;
  font-weight: bold;
}
.btn {
  background-color: #68819e;
  margin: 20px 60px 20px 0;
}
.inputCell {
  width: 30%;
  position: relative;
  display: inline-block;
  // overflow: hidden;
  line-height: 40px;
  margin: 2px 0;
  p {
    width: 20%;
    display: inline-block;
    i {
      color: #ff2929;
    }
  }
}
.memberDiv {
  background-color: #f7f7f7;
}
.MemberList {
  padding: 10px;

  .iconLogo {
    color: #333333;
    font-size: 22px;
    margin: 10px 0;
  }
  .iconLogo::before {
    content: " ";
    display: inline-block;
    width: 28px;
    height: 25px;
    background: url("../../assets/images/member/icon-logo.png") no-repeat center;
    background-size: 100%;
    vertical-align: -4px;
    margin-right: 10px;
  }
  // 搜索栏
  .search {
    background-color: #f7f7f7;
    padding: 10px 0 10px 20px;
    overflow: hidden;
    margin: 16px 0;
    font-size: 14px;
  }
  // 显示会员信息详情部分
  .memberMes {
    padding: 10px 30px;
    background-color: #f7f7f7;
    .basic {
      overflow: hidden;
      .basicRight {
        width: 40%;
        text-align: center;
        .showbox {
          width: 70%;
          .cardImg {
            margin: 0 auto 10px auto;
            width: 294px;
            height: 186px;
            // border: 1px red solid;
          }
          p {
            display: inline-block;
            width: 48%;
            color: 18px;
            margin: 4px 0;
          }
          .resetBtn {
            margin: 18px auto 0 auto;
          }
        }
      }
    }
    // // 四行显示部分
    // .link{
    //   // border: 1px red solid;
    // }
  }
  // 头部后台读取数据
  .table {
    font-size: 14px;
    border: #cccccc 1px solid;
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-align: center;
      thead {
        line-height: 40px;
        background-color: #68819e;
        color: #ffffff;
        tr {
          th {
            font-weight: 400;
            font-size: 16px;
          }
        }
      }
      tbody {
        line-height: 40px;
        color: #333333;
        tr {
          cursor: pointer;
          td {
            border: 1px solid #cccccc;
          }
          span {
            color: #68819e;
            cursor: pointer;
          }
          .col {
            border: 1px #68819e solid;
            margin: 0 10px;
          }
        }
        tr:hover {
          background-color: #eeeeee;
        }
      }
    }
  }
  // 分页
  .pagination {
    margin: 36px 0 14px 0;
    overflow: hidden;
    p {
      margin-left: 20px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #68819e;
      color: #fff;
    }
  }
}
</style>

