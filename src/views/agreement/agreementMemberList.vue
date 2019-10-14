<template>
  <div class="memberDiv">
    <!-- 列表清单显示 -->
    <div v-show=" listShow == true " class="MemberList">
      <!-- 协议单位列表 -->
      <p class="iconLogo">协议单位列表</p>
      <!-- 查询框 -->
      <div class="search">
        协议单位编号/单位名：
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
              <th>档案编号</th>
              <th>协议单位代码</th>
              <th>单位名称</th>
              <th>VIP 计划</th>
              <th>VIP 等级</th>
              <th>客户类别</th>
              <th>房价码</th>
              <th>联系人</th>
              <th>联系电话</th>
              <th>积分余额</th>
              <th>储值余额</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in cardBaseList"
              :key="index"
              @click="get_certain_card_base_list(item.id);"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.card_no }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.card_type }}</td>
              <td>{{ item.card_level }}</td>
              <td>{{ companyDict[item.sys_cat] }}</td>
              <td>{{ item.rate_code }}</td>
              <td>{{ item.linkman1 }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.point_pay-item.point_charge}}</td>
              <td>{{ item.money_pay - item.money_charge - item.money_freeze}}</td>
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
        协议单位信息
        <span class="pull-right" @click="showFunc();">返回</span>
      </p>

      <div class="memberMes">
        <!-- 基本信息部分 身份信息部分 -->
        <div class="basic">
          <!-- 左侧信息部分 -->
          <div class="" >
            <div class="link">
              <p class="title_demo">基本信息</p>
              <div class="inputCell" >
                <p>单位名称： </p> 
                <el-input v-model="certainBaseData.company_base.name" size="mini" placeholder="请输入内容" style="width: 250px;"></el-input>
              </div>
              <div class="inputCell">
                <p><i>*</i>客户类别：</p>
                <el-select v-model="certainBaseData.company_base.sys_cat" filterable clearable placeholder="请选择" style="width: 250px;"  size="mini" >
                  <el-option v-for="(item,index) in companyArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                </el-select>
              </div>
              
              <div class="inputCell">
                <p>联系人：</p>
                <el-input v-model="certainBaseData.company_base.linkman1" size="mini" placeholder="请输入内容" style="width: 250px;"></el-input>
              </div>  
              <br/>
              <div class="inputCell">
                <p>电话：</p> 
                <el-input v-model="certainBaseData.company_base.phone"  size="mini" placeholder="可输入多个号码" style="width: 250px;"></el-input>
              </div>
              
              <div class="inputCell">
              <p>备注：</p> 
              <el-input size="mini" v-model="certainBaseData.company_base.remark" type="textarea" placeholder="请输入内容" style="width: 250px;" ></el-input>
            </div>
            </div>
            <div class="link">
              <p class="title_demo">单位信息</p>
              <div class="inputCell">
                <p>合同编号：</p>
                <el-input v-model=" certainBaseData.company_base.manual_no "  size="mini" placeholder="请输入内容" style="width: 250px;" ></el-input>
              </div>
              <div class="inputCell" >
                <p >法人：</p>
                <el-input v-model=" certainBaseData.company_base.representative "  size="mini" placeholder="请输入内容" style="width: 250px;" ></el-input> 
              </div>
              <br/>
              <div class="inputCell" >
                <p>开户行：</p>
                <el-input v-model=" certainBaseData.company_base.bank_name "  size="mini" placeholder="请输入内容" style="width: 250px;" ></el-input> 
                <!-- <el-select v-model="certainBaseData.company_base.bank_name" size="mini" filterable clearable placeholder="请选择" style="width: 250px;" >
                  <el-option
                      v-for="(item,index) in idCodeArr"
                      :key="index"
                      :label="item.descript"
                      :value="item.code">
                  </el-option>
                </el-select> -->
              </div>
              <div class="inputCell" >
                <p>账号：</p>
                <el-input v-model="certainBaseData.company_base.bank_account"  size="mini" placeholder="请输入内容" style="width: 250px;"></el-input>
              </div>
              <br/>
              <div class="inputCell" >
                <p>税号：</p>
                <el-input v-model="certainBaseData.company_base.tax_no"  size="mini" placeholder="请输入内容" style="width: 250px;"></el-input> 
              </div>
              <div class="inputCell">
                <p>AR账号：</p>
                <!-- 查询input -->
                <el-input  size="mini" v-model="certainBaseData.company_base.ar_no1 " placeholder="请输入内容" style="width: 250px;"></el-input>
              </div>
            </div>
          </div>
          <div class=" basicRight row">
            
            <div class="showbox">
              <div class="cardImg">
                <img src="../member/img/icon-level.png" alt>
              </div>
              <p>创建人：{{ certainBaseData.company_base.create_user}}</p>
              <p>创建日期：{{ certainBaseData.company_base.create_datetime}}</p>
              <p>修改人：{{ certainBaseData.company_base.modify_user }}</p>
              <p>修改日期：{{ certainBaseData.company_base.modify_datetime }}</p>
              <!-- 取消保存 -->
              <div class="resetBtn">
                <el-button
                  type="primary"
                  @click="remove_card_base(certainBaseData.company_base.id);"
                  style="background-color: #68819E;"
                >删除</el-button>
                <el-button
                  v-if="newAddBtn"
                  type="primary"
                  @click="add_card_base();"
                  style="background-color: #4488E9;"
                >保存</el-button>
                <el-button
                  v-else
                  type="primary"
                  @click="update_card_base(certainBaseData.company_base.id);"
                  style="background-color: #4488E9;"
                >保存</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 地址信息 -->
        <div class="link">
          <p class="title_demo">地址信息</p>
     
          <div class="inputCell">
            <p >国家：</p>
            <el-select
              v-model="certainBaseData.company_base.country"
              filterable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_country_tree()"
               size="mini"
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
            <p>州/省：</p>
            <el-select
              v-model="certainBaseData.company_base.state "
              filterable
              clearable
              placeholder="请选择"  size="mini"
              style="width: 250px;" @focus="get_province_tree()">
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
            <el-input v-model="certainBaseData.company_base.zip_code "  size="mini"  placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>邮箱：</p> 
            <el-input v-model="certainBaseData.company_base.email "  size="mini" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>城市：</p>
            <el-select
              v-model="certainBaseData.company_base.city"
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_city_tree()"
               size="mini"
            >
              <el-option
                v-for="(item,index) in cityArr"
                :key="index"
                clearable
                :label="item.descript"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
                <p> 语种：</p>
                <el-select
                  v-model="certainBaseData.company_base.language"
                  filterable
                  clearable
                  placeholder="请选择"
                   size="mini"
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
            <div class="inputCell">
              <p>地址：</p>
              <el-input v-model="certainBaseData.company_base.street"  size="mini" placeholder="请输入内容" style="width: 250px;"></el-input>
            </div>
        </div>

        <!-- 分类信息 -->
        <div class="link">
          <p class="title_demo">分类信息</p>
          <div class="inputCell" >
            <p >公司分类：</p>
            <el-select
              v-model="certainBaseData.company_type.class1 "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini"
              @focus="get_class1Arr_tree()">
              <el-option
                v-for="(item,index) in class1Arr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell" >
            <p >地址分类：</p>
            <el-select
              v-model="certainBaseData.company_type.class2 "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini"
              @focus="get_class2Arr_tree()">
              <el-option
                v-for="(item,index) in class2Arr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell" >
            <p >行业分类：</p>
            <el-select
              v-model="certainBaseData.company_type.class3 "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini"
              @focus="get_class3Arr_tree()">
              <el-option
                v-for="(item,index) in class3Arr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell" >
            <p >资产性质：</p>
            <el-select
              v-model="certainBaseData.company_type.class4 "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini"
              @focus="get_class4Arr_tree()">
              <el-option
                v-for="(item,index) in class4Arr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell" >
            <p >标记类别：</p>
            <el-select
              v-model="certainBaseData.company_type.flag_cat "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini"
              @focus="get_guest_type_tree()">
              <el-option
                v-for="(item,index) in guestTypeArr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell" >
            <p>信用等级：</p>
            <el-select
              v-model="certainBaseData.company_type.grade "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini"
              @focus="get_guest_grade_tree()">
              <el-option
                v-for="(item,index) in guestGradeArr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell" >
            <p >市场：</p>
            <el-select
              v-model="certainBaseData.company_type.market "
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"  size="mini">
              <el-option
                v-for="(item,index) in marketArr"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell" >
            <p>来源：</p>
            <el-select
              v-model="certainBaseData.company_type.src "
              filterable
              clearable
              placeholder="请选择"
               size="mini"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in srcArr"
                :key="index"
                :label="item.descript"
                :value="item.id"
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
              v-model="certainBaseData.company_prefer.amenity "
              filterable
              clearable
               size="mini"
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
              v-model="certainBaseData.company_prefer.room_prefer"
              filterable
               size="mini"
              clearable
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
              v-model="certainBaseData.company_prefer.interest"
              filterable
              clearable
               size="mini"
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
             size="mini"
              v-model="certainBaseData.company_prefer.prefer_other"
              filterable
              clearable
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
             size="mini"
              v-model="certainBaseData.company_prefer.specials"
              filterable
              clearable
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
        <!-- 消费信息 -->
        <div class="link">
          <p class="title_demo">消费信息</p>
          <div class="inputCell">
            <p>首次入住房价</p> 
            <el-input  size="mini" v-model="certainBaseData.company_production.first_visit_rate" disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>最近入住房价</p>
             <el-input  size="mini" v-model="certainBaseData.company_production.last_visit_rate" disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>入住房晚：</p>
            <el-input  size="mini" v-model="certainBaseData.company_production.days_in " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>入住次数：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.times_in " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>NOSHOW次：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.times_noshow  " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>转管次数：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.times_trans  " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>用餐次数：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.times_fb   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>娱乐次数：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.times_en   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>房费：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.production_rm   "  disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>餐费：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.production_fb   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>娱乐费：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.production_en   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>会议费：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.production_mt   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>其它消费：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.production_ot   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>总消费：</p>
            <el-input size="mini" v-model="certainBaseData.company_production.production_ttl   " disabled placeholder="请输入内容" style="width: 250px;"></el-input>
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
              <i>*</i> VIP类型：
            </p>
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.card_type"
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in CardTypeTree"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>
              <i>*</i> VIP等级：
            </p>
            <!-- 查询input -->
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.card_level"
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_card_level_tree();"
            >
              <el-option
                v-for="(item,index) in CardLevelTree"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

          <div class="inputCell">
            <p>状态：</p>
            <!-- 查询input -->
            <el-input size="mini" v-model="certainBaseData.company_base.status" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <div class="inputCell">
            <p>发卡酒店：</p>
            <!-- 查询input -->
            皇冠晶品酒店（虹桥店）
          </div>
          <div class="inputCell">
            <p>销售员：</p>
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.salesman"
              filterable
              clearable 
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in CardTypeTree"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>有效期起：</p> 
            <el-date-picker v-model=" certainBaseData.company_base.date_begin " type="date" placeholder="选择日期" style="width: 250px;"> </el-date-picker>
          </div>
          <div class="inputCell">
            <p>有效期止：</p> 
            <el-date-picker v-model=" certainBaseData.company_base.date_begin " type="date" placeholder="选择日期" style="width: 250px;"> </el-date-picker>
          </div>
          
          <div class="inputCell">
            <p>房价码：</p> 
            <el-select size="mini" v-model="certainBaseData.company_base.rate_code" filterable clearable placeholder="请选择" style="width: 250px;" >
              <el-option v-for="(item,index) in fj_codeArr" :key="index" :label="item.description" :value="item.code" ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>佣金码：</p>
            <!-- 查询input -->
            <el-input size="mini" v-model="certainBaseData.company_base.comm_mode" placeholder="请输入内容" style="width: 250px;"></el-input>
          </div>
          <br>
          <div class="inputCell">
            <p>积分余额：</p>
            {{ certainBaseData.company_base.point_pay-certainBaseData.company_base.point_charge }}
          </div>
          <div class="inputCell">
            <p>储值余额：</p>
            {{ certainBaseData.company_base.money_pay - certainBaseData.company_base.money_charge - certainBaseData.company_base.money_freeze}}
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
              <i>*</i>VIP类型：
            </p>
            <!-- 查询input --> 
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.card_type"
              filterable
              clearable
              disabled
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in CardTypeTree"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>
              <i>*</i>VIP等级：
            </p>
            <!-- 查询input -->
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.card_level"
              filterable
              disabled
              clearable
              placeholder="请选择"
              style="width: 250px;"
              @focus="get_card_level_tree();"
            >
              <el-option
                v-for="(item,index) in CardLevelTree"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>AR账号：</p>
            <!-- 查询input -->
            <el-input
             size="mini"
              v-model="certainBaseData.company_type.ar_no1"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p><i>*</i>状态：</p>
            <!-- 查询input -->
            <el-input
             size="mini"
              v-model="certainBaseData.company_base.status"
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
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.salesman"
              filterable
              clearable 
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in CardTypeTree"
                :key="index"
                :label="item.descript"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>有效期起：</p>
            <!-- 查询input -->
            <el-input
             size="mini"
              v-model="certainBaseData.company_base.date_begin"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>有效期止：</p>
            <!-- 查询input -->
            <el-input
             size="mini"
              v-model="certainBaseData.company_base.date_end"
              disabled
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <div class="inputCell">
            <p>房价码：</p>
            <!-- 查询input -->
            <el-select
             size="mini"
              v-model="certainBaseData.company_base.rate_code"
              filterable
              clearable
              placeholder="请选择"
              style="width: 250px;"
            >
              <el-option
                v-for="(item,index) in fj_codeArr"
                :key="index"
                :label="item.description"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCell">
            <p>佣金码：</p>
            <!-- 查询input -->
            <el-input
             size="mini"
              v-model="certainBaseData.company_base.comm_mode"
               
              placeholder="请输入内容"
              style="width: 250px;"
            ></el-input>
          </div>
          <br>
          <div class="inputCell">
            <p>积分余额：</p>
            {{ certainBaseData.company_base.point_pay-certainBaseData.company_base.point_charge}}
          </div>
          <div class="inputCell">
            <p>储值余额：</p>
            {{ certainBaseData.company_base.money_pay - certainBaseData.company_base.money_charge - certainBaseData.company_base.money_freeze}}
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
      companyArr:[
        {
          code: "C",
          descript: "公司"
        },
        {
          code: "S",
          descript: "预定中心/OTA"
        },
        {
          code: "A",
          descript: "旅行社"
        }
      ],
      companyDict:
        {
           "C": "公司",
           "S": "预定中心/OTA",
           "A": "旅行社",
        },
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
      //下拉框兴趣爱好初始化数据
      interestArr: [],
      // 会员列表
      cardBaseList: [],
      //下拉框市场码初始化数据
      marketArr: [],
      //下拉框来源吗初始化数据
      srcArr: [],
      // 房价码
      fj_codeArr:[],
      // 标记类别
      guestTypeArr:[],
      // 信用等级
      guestGradeArr:[],
      // 潜在状态
      latencyArr:[],
      // 公司分类
      class1Arr:[],
      // 地址分类
      class2Arr:[],
      // 行业分类
      class3Arr:[],
      // 资产性质
      class4Arr:[],
      // 单条会员数据初始化
      certainBaseData: { 
        
        "company_type": { 
            "flag_cat": null,
            "grade": null,
            "latency": null,
            "class1": null,
            "class2": null,
            "class3": null,
            "class4": null,
            "src": null,
            "market": null,  
            "is_over_rsv_src": null
        },
        "company_prefer": {   
            "specials": null,
            "amenity": null,
            "feature": null,
            "room_prefer": null,
            "interest": null,
            "prefer_front": null,
            "prefer_fb": null,
            "prefer_other": null
        },
        "company_production": {   
            "first_visit_date": null,
            "first_visit_room": null,
            "first_visit_rate": null,
            "last_visit_date": null,
            "last_visit_room": null,
            "last_visit_rate": null,
            "days_in": "0.00",
            "times_in": 0,
            "times_cxl": 0,
            "times_noshow": 0,
            "times_trans": 0,
            "times_fb": 0,
            "times_en": 0,
            "production_rm": "0.00",
            "production_fb": "0.00",
            "production_en": "0.00",
            "production_mt": "0.00",
            "production_ot": "0.00",
            "production_ttl": "0.00"
        },  
        'company_base':{
          "card_type": "",
          "card_level": "",
          "card_no": "",
          "card_master": null,
          "status": "E",
          "rate_code": "",
          "comm_code": null,
          "sys_cat": "",
          "sale_man": null,
          "date_begin": null,
          "date_end": null,
          "name": "",
          "language": null,
          "country": null,
          "phone": null,
          "fax": null,
          "email": null,
          "website": null,
          "blog": null,
          "linkman1": null,
          "state": null,
          "city": null,
          "division": null,
          "street": null,
          "zip_code": null,
          "manual_no": null,
          "representative": null,
          "register_no": null,
          "bank_name": null,
          "bank_account": null,
          "tax_no": null,
          "ar_no1": null,
          "point_pay": "0.00",
          "point_charge": "0.00",
          "point_last_num": 0,
          "point_last_num_link": 0,
          "money_pay": "0.00",
          "money_charge": "0.00",
          "money_freeze": "0.00",
          "money_receipt": "0.00",
          "money_real_pay": "0.00",
          "money_last_num": 0,
          "money_last_num_link": 0,
          "credit": "0.00",
          "remark": null
        }
        
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
      this.certainBaseData.company_base.status = status;
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
          "customer/company/get_company_base_list/?page=1&page_size=10",
        _this = this;
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          console.log(res.data.data.results);
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
                  if ( _this.cardBaseList[i].card_type == _this.CardTypeTree[m].code ) {
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
          this.UrLHeader + "customer/company/get_company_base_info/" + id + "/",
        _this = this;
      _this.showFunc();
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            console.log(res.data.data);
            _this.certainBaseData = res.data.data;

            /*  */
            let A ={a:{a:'12',m: '45'},b:{b:'145'},c:{n:'1'}} ,B = {a:{a:'12',m: '121'},b:{b:'145'},c:{n:'454'}};

            for(let i in A){  
              for(let j in A[i]){ 
                if(A[i][j] == B[i][j]){
                  delete B[i][j]
                }
              }
            }
            console.log(B);


            // 状态转换
            for (let j in _this.statusArr) {
              if (_this.certainBaseData.company_base.status == _this.statusArr[j].code) {
                _this.certainBaseData.company_base.status = _this.statusArr[j].descript;
              }
            }
            // 会员计划转换
            for (let m in _this.CardTypeTree) {
              if (
                _this.certainBaseData.company_base.card_type == _this.CardTypeTree[m].code
              ) {
                _this.certainBaseData.company_base.card_type =
                  _this.CardTypeTree[m].descript;

                //会员等级转换
                for (let n in _this.CardTypeTree[m].children) {
                  if (
                    (_this.certainBaseData.company_base.card_level =
                      _this.CardTypeTree[m].children[n].code)
                  ) {
                    _this.certainBaseData.company_base.card_level =
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
        "company_type": { 
            "flag_cat": null,
            "grade": null,
            "latency": null,
            "class1": null,
            "class2": null,
            "class3": null,
            "class4": null,
            "src": null,
            "market": null,  
            "is_over_rsv_src": null
        },
        "company_prefer": {   
            "specials": null,
            "amenity": null,
            "feature": null,
            "room_prefer": null,
            "interest": null,
            "prefer_front": null,
            "prefer_fb": null,
            "prefer_other": null
        },
        "company_production": {   
            "first_visit_date": null,
            "first_visit_room": null,
            "first_visit_rate": null,
            "last_visit_date": null,
            "last_visit_room": null,
            "last_visit_rate": null,
            "days_in": "0.00",
            "times_in": 0,
            "times_cxl": 0,
            "times_noshow": 0,
            "times_trans": 0,
            "times_fb": 0,
            "times_en": 0,
            "production_rm": "0.00",
            "production_fb": "0.00",
            "production_en": "0.00",
            "production_mt": "0.00",
            "production_ot": "0.00",
            "production_ttl": "0.00"
        },  
        'company_base':{
          "card_type": "",
          "card_level": "",
          "card_no": "",
          "card_master": null,
          "status": "E",
          "rate_code": "",
          "comm_code": null,
          "sys_cat": "",
          "sale_man": null,
          "date_begin": null,
          "date_end": null,
          "name": "",
          "language": null,
          "country": null,
          "phone": null,
          "fax": null,
          "email": null,
          "website": null,
          "blog": null,
          "linkman1": null,
          "state": null,
          "city": null,
          "division": null,
          "street": null,
          "zip_code": null,
          "manual_no": null,
          "representative": null,
          "register_no": null,
          "bank_name": null,
          "bank_account": null,
          "tax_no": null,
          "ar_no1": null,
          "point_pay": "0.00",
          "point_charge": "0.00",
          "point_last_num": 0,
          "point_last_num_link": 0,
          "money_pay": "0.00",
          "money_charge": "0.00",
          "money_freeze": "0.00",
          "money_receipt": "0.00",
          "money_real_pay": "0.00",
          "money_last_num": 0,
          "money_last_num_link": 0,
          "credit": "0.00",
          "remark": null
        }
        
      }
    },

    // 增加请求后台接口
    add_card_base() {
      //设置请求路径
      let addCaseUrl = this.UrLHeader + "customer/company/add_company_base/",
        _this = this;

      let company_base = _this.certainBaseData.company_base;
      let company_type = _this.certainBaseData.company_type;
      let company_prefer = _this.certainBaseData.company_prefer;
      let company_production = _this.certainBaseData.company_production;

// 会员计划转换
      console.log(company_base.card_type);
      console.log(company_base.card_level);
      if(company_base.card_level && company_base.card_type ){
        for (let j in _this.statusArr) {
        if (company_base.status == _this.statusArr[j].descript) {
          company_base.status = _this.statusArr[j].code;
        }
      }
      
      // for (let m in _this.CardTypeTree) {
      //   if (company_base.card_type == _this.CardTypeTree[m].code) {
      //     company_base.card_type = _this.CardTypeTree[m].id;

      //     //会员等级转换
      //     for (let n in _this.CardTypeTree[m].children) {
      //       if (
      //         (company_base.card_level = _this.CardTypeTree[m].children[n].code)
      //       ) {
      //         company_base.card_level = _this.CardTypeTree[m].children[n].id;
      //       }
      //     }
      //   }
      // }

      console.log({
                'company_base': company_base,
                'company_type': company_type,
                'company_prefer':company_prefer
              });
      if (!_this.isnull(company_base.name)) {
        // if (_this.phone_reg.test(company_base.phone)) {
              axios({
              url: addCaseUrl,
              method: "post",
              data: {
                company_base: company_base,
                company_type: company_type,
                company_prefer:company_prefer
              }
            })
              .then(function(res) {
                if (res.data.message == "success") {
                  _this.get_card_base_list(_this.certainBaseData.company_base.id);
                  _this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                } else {
                  _this.$message.error("保存失败，请注意带*必填字段");
                }
              })
              .catch(error => { });

          // } else {
          //   _this.$message.error("请输入正确的手机号码");
          // }
      } else {
        _this.$message.error("姓名不能为空");
      }
      }else{
          _this.$message.error("请优先选择协议单位计划和协议单位VIP等级");
      }
      

      
    },

    // 更新单条会员列表update_card_base
    update_card_base(id) {
      //设置请求路径
      let updateCaseUrl =
          this.UrLHeader + "customer/company/update_company_base/" + id + "/",
        _this = this;

      let company_base = _this.certainBaseData.company_base;
      let company_type = _this.certainBaseData.company_type;
      let company_prefer = _this.certainBaseData.company_prefer;
      let company_production = _this.certainBaseData.company_production;

      if(company_base.card_level && company_base.card_type ){
        for (let j in _this.statusArr) {
        if (company_base.status == _this.statusArr[j].descript) {
          company_base.status = _this.statusArr[j].code;
        }
      }
      // 会员计划转换
      for (let m in _this.CardTypeTree) {

        // if (company_base.card_type == _this.CardTypeTree[m].code) {
        //   company_base.card_type = _this.CardTypeTree[m].id;

        //   //会员等级转换
        //   for (let n in _this.CardTypeTree[m].children) {
        //     if ( (company_base.card_level = _this.CardTypeTree[m].children[n].code) ) {
        //       company_base.card_level = _this.CardTypeTree[m].children[n].id;
        //     }
        //   }
        // }
console.log(company_base.card_type);
console.log(_this.CardTypeTree[m].descript);
        if (company_base.card_type == _this.CardTypeTree[m].descript) {
          company_base.card_type = _this.CardTypeTree[m].id;
          //会员等级转换
          for (let n in _this.CardTypeTree[m].children) {
            if ( (company_base.card_level = _this.CardTypeTree[m].children[n].descript) ) {
              company_base.card_level = _this.CardTypeTree[m].children[n].id;
            }
          }
        } 
      }

      if (!_this.isnull(company_base.name)) {
        // if (_this.phone_reg.test(company_base.phone)) {
              axios({
              url: updateCaseUrl,
              method: "post",
              data: {
                company_base: company_base,
                company_type: company_type,
                company_prefer:company_prefer
              }
            })
              .then(function(res) {
                if (res.data.message == "success") {
                  _this.get_card_base_list(_this.certainBaseData.company_base.id);
                  _this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                } else {
                  _this.$message.error("保存失败，请注意带*号必填字段");
                }
              })
              .catch(error => {});
            
          // } else {
          //   _this.$message.error("请输入正确的手机号码");
          // }
      } else {
        _this.$message.error("单位名称不能为空");
      }
      }else{
          _this.$message.error("请优先选择VIP等级和VIP类型");
      }
    },

    // 删除单条会员列表update_card_base
    remove_card_base(id) {
      //设置请求路径
      let removeCaseUrl =
          this.UrLHeader + "customer/company/remove_company_base/" + id + "/",
        _this = this;
      _this
        .$confirm("是否永久删除该协议单位?", "提示", {
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
                  message: "删除成功",
                  type: "success"
                });
              } else {
                this.$message.error("删除信息失败");
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
      // this.get_country_tree(); //国家
      // this.get_province_tree(); //省份
      // this.get_city_tree(); //城市
      this.get_religion_tree(); //宗教
      this.get_salary_tree(); //薪资水平
      this.get_interest_tree(); //兴趣爱好
    },

    // ------------------------------------------------------
    // 请求会员计划\会员等级数据
    get_card_setting_tree() {
      // this.CardTypeTree=this.get_select_class('get_card_setting_tree');
      //设置请求路径
      let url =
          this.UrLHeader +
          "customer/member/get_card_setting_tree/?code_type=CM",
        _this = this;
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            // console.log(res.data.data);
            if (res.data.data.results.length) {
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
          if (_this.certainBaseData.company_base.card_type == _this.CardTypeTree[i].id) {
            _this.CardLevelTree = _this.CardTypeTree[i].children;
            console.log(_this.CardLevelTree);
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
          .catch(error => {});
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
          _this.certainBaseData.company_base.country +
          "&page_size=300"; 
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
      //设置请求路径  
      let _this = this,
        url =
          this.SelectUrLHeader +
          "v1/system/settings/get_division_list/?province=" +
          _this.certainBaseData.company_base.state +
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
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.religionArr = res.data.data.results;
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
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
    //获取收入数据
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
    
    //获取收入数据
    get_fj_codeArr_tree() {
      //设置请求路径
      let url =  "http://47.98.113.173:9101/v1/rate_code/get_rate_code_list/",
        _this = this;
      if (!_this.fj_codeArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              _this.fj_codeArr = res.data.data.results;
              console.log(res.data.data.results)
            } else {
              _this.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取标记类别
    get_guest_type_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=guest_type&page_size=300",
          that = this;
      if (!that.guestTypeArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.guestTypeArr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取信用等级
    get_guest_grade_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=guest_grade&page_size=300",
          that = this;
      if (!that.guestGradeArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.guestGradeArr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取 公司分类
    get_class1Arr_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=profile_class1&page_size=300",
          that = this;
      if (!that.class1Arr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.class1Arr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取 地址分类
    get_class2Arr_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=profile_class2&page_size=300",
          that = this;
      if (!that.class2Arr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.class2Arr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取 行业分类
    get_class3Arr_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=profile_class3&page_size=300",
          that = this;
      if (!that.class3Arr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.class3Arr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },

    // 获取 资产性质
    get_class4Arr_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=profile_class4&page_size=300",
          that = this;
      if (!that.class4Arr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.class4Arr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
            }
          })
          .catch(error => {});
      }
    },
    // 获取潜在状态
    get_latency_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=latency&page_size=300",
          that = this;
      if (!that.latencyArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        axios
          .get(url)
          .then(function(res) {
            if (res.data.message == "success") {
              // 初始化渲染tabs导航项目
              that.latencyArr = res.data.data.results;
            } else {
              that.$message.error("请求服务器失败，稍后重试");
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
    this.get_fj_codeArr_tree();
    this.get_market();
    this.get_src();
  }
};
</script>

<style lang="less" scoped>
 .row {
    display: flex;
    flex-direction: row;
  }
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
  width: 24%;
  position: relative;
  display: inline-block;
  // overflow: hidden;
  line-height: 40px;
  margin: 2px 0;
  p {
    width: 25%;
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
      position: relative;
      .basicRight {
        width: 25%; 
        text-align: center;
        position: absolute;
        top: -34px;
        right: 0;
        .showbox {
          .cardImg {
            margin: 0 auto 10px auto;
            width: 294px;
            height: 186px; 
          }
          p {
            color: #000;
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

