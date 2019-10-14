<template>
  <div class="member">
    <!-- 导航栏 -->
    <el-row class="container">
      <!--头部-->
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
          <router-link to="/">
            <img src="../../assets/logo.png" style="padding-left:8px;">
          </router-link>
        </div>
        <div class="topbar-logos">
          <a href="/" style="color: #fff;">
            <span v-show=" !$store.state.collapsed "></span>
          </a>
        </div>
        <div class="topbar-account topbar-btn">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link userinfo-inner">
              <i class="iconfont icon-user"></i>
              {{ nickname }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo('/user/profile')">
                  <span style="color: #555;font-size: 14px;">个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/user/changepwd')">
                  <span style="color: #555;font-size: 14px;">修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!-- 子组件 -->
    <div class="Setting">
      <transition name="fade" mode="out-in">
        <div class="guestIndex">
          <!-- visible控制是否显示详细信息此时为显示 -->
          <div class="guestList" v-show=' visible '>
              <!-- '顶层操作按钮 -->
              <div class="btn_group row">
                  <el-button type="primary" @click=' newAddGuest() '>新建</el-button>
                  <el-button type="primary">组合查询</el-button>
                  <el-button type="primary">打印</el-button>
                  <el-button type="primary">导出</el-button>
                  <el-button type="primary" @click='handleCurrentPageChange(1)'>刷新</el-button>
                  <el-button type="primary" @click='navigate("/memberLogin")'>退出</el-button>
              </div>
              <!-- 列表清单部分 -->
              <div class="table" style="width: 100%;">
                  <table>
                  <thead>
                      <tr>
                      <th>档案号</th>
                      <th>状态</th>
                      <th>姓名</th>
                      <th>姓名1</th>
                      <th>姓名2</th>
                      <th>生日</th>
                      <th>证件号码</th>
                      <th>单位</th>
                      <th>房价码</th>
                      <th>国籍</th>
                      <th>电话</th>
                      <th>销售员</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr
                      v-for="(item,index) in guestList"
                      :key="index"
                      @click="get_certain_list(item.id)"
                      >
                      <td>{{ item.company_id  }}</td>
                      <td>{{ item.guest_type.sta  }}</td>
                      <td>{{ item.name  }}</td>
                      <td>{{ item.name1 }}</td>
                      <td>{{ item.name2 }}</td>
                      <td>{{ item.birth }}</td>
                      <td>{{ item.guest_type.id_no }}</td>
                      <td>{{ item.company_name }}</td>
                      <td>{{ item.guest_type.rate_code }}</td>
                      <td>{{ item.nation }}</td>
                      <td>{{ item.phone }}</td>
                      <td>{{ item.guest_type.saleman }}</td>
                      </tr>
                  </tbody>
                  </table>
                  <p v-if="guestList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
                  <div class="pagination">
                  <el-pagination @current-change="handleCurrentPageChange"
                      :current-page="currentPage"
                      :page-size="pagesize"
                      layout="total, prev, pager, next, jumper"
                      :total="total" ></el-pagination>
                  </div>
              </div>
          </div>

          <!-- visible控制是否显示详细信息 -->
          <div class='row' v-show=' !visible '>
              <!-- 左边部分 -->
              <div class='leftNav'>
                  <ul>
                    <!-- :class='[{'active':navIndex==4},'nav4']' -->
                    <li  class='href' v-for='(item,index) in leftNavList' :key='index' @click='goTop(item.link )' :style='hrefIndex==item.link?"background-color: #fff;color: #4488E9;":"" ' >{{ item.desc }}</li>
                  </ul>
              </div>
              <!-- 右边详细部分 -->
              <div class='rightNav'>
                <!-- 右边 -->
                <div class=" " style='text-align: right'>
                  <el-button v-if=" newAdd == false " type="primary" @click=' remove_card_base(guestJson.id) '>删除</el-button>
                  <el-button v-if=" newAdd == true " type="primary" @click=' add_card_base() ' >新增</el-button>
                  <el-button v-else type="primary" @click=' update_card_base(guestJson.id) ' >保存</el-button>
                  <el-button type="primary" @click=' visible = true '>返回</el-button>
                </div>
                <!-- 基本信息部分 -->
                <div class='p_title' id='basicInfo'>
                  基本信息
                </div>
                <ul class='nav_section'>
                    <li class="">
                      <p><i class="color_red">*</i> 姓名：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.name " clearable></el-input>
                    </li>
                    <li class="">
                      <p>语种：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.language " clearable></el-input>
                    </li>
                    <br/>
                    <li class=" ">
                      <p>姓名1：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.name2 " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>国籍：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.nation " clearable></el-input> -->
                      <el-select v-model=" guestJson.nation " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in nationArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <br/>
                    <li class=" ">
                      <p>姓名2：</p>
                      <el-input placeholder="请输入内容" size='small' v-model="guestJson.name3" clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>称呼：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.salutation " clearable></el-input>
                    </li>
                    <br/>
                    <li class=" ">
                      <p>性别：</p>
                      <el-input placeholder="请输入内容" size='small' :value=' guestJson.sex ?"女":"男" ' clearable></el-input>
                      
                    </li>
                    <li class=" ">
                      <p>头衔：</p>
                      <el-input placeholder="请输入内容" size='small' disabled clearable></el-input>
                    </li>
                </ul>

                <!-- 身份信息 -->
                <div class='p_title' id='codeInfo'>
                  身份信息
                </div>
                <ul class='nav_section'>
                    <li class="">
                      <p>证件类型：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.id_code " clearable></el-input> -->
                      <el-select v-model=" guestJson.id_code " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in idCodeArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class="">
                      <p>民族：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.race " clearable></el-input> -->
                      <el-select v-model=" guestJson.race " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in raceArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class=" ">
                      <p>职业：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.career " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>证件号码：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.id_no  " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>宗教：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.religion  " clearable></el-input> -->
                      <el-select v-model=" guestJson.religion " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in religionArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class=" ">
                      <p>职位：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.career " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>生日：</p>
                      <!-- <el-input placeholder="请输入内容" v-model=" guestJson.birth " clearable></el-input> -->
                       <el-date-picker v-model=" guestJson.birth  " size='small' type="date" placeholder="选择日期"> </el-date-picker>
                    </li>
                    <li class=" ">
                      <p>单位名称：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.company_name " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>车牌号：</p>
                      <el-input placeholder="请输入内容" size='small' disabled clearable></el-input>
                    </li>
                </ul>

                <!-- 联系方式 -->
                <div class='p_title' id='linkInfo'>
                  联系方式
                </div>
                <ul class='nav_section'>
                    <li class="">
                      <p><i class="color_red">*</i> 手机：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.mobile " clearable></el-input>
                    </li>
                    <li class="">
                      <p>地址：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.addr_name " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>州/省：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.state " clearable></el-input> -->
                      
                      <el-select v-model=" guestJson.guest_link_base.state " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in provinceArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class=" ">
                      <p>电话：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.phone " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>类型：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.addr_type  " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>行政区域：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.division " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>邮箱：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.email  " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>国家：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.country  " clearable></el-input> -->
                      <el-select v-model=" guestJson.guest_link_base.country " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in countryArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class=" ">
                      <p>邮编：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.zipcode  " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>传真：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.fax " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>城市：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.city  " clearable></el-input> -->
                      <el-select v-model=" guestJson.guest_link_base.city " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in cityArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class=" ">
                      <p>街道：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_link_base.street " clearable></el-input>
                    </li>
                </ul>

                <!-- 宾客喜好 -->
                <div class='p_title' id='preferInfo'>
                  团队喜好
                </div>
                <ul class='nav_section'>
                    <li class="">
                      <p>客房布置：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_prefer.amenity " clearable></el-input>
                    </li>
                    <li class="">
                      <p>排房要求：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_prefer.room_prefer " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>兴趣爱好：</p>
                      <!-- <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_prefer.interest " clearable></el-input> -->
                      <el-select v-model=" guestJson.guest_prefer.interest " size='small' filterable placeholder="请选择" >
                        <el-option v-for="(item,index) in interestArr" :key="index" :label="item.descript" :value="item.code" ></el-option>
                      </el-select>
                    </li>
                    <li class=" ">
                      <p>客房特征：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_prefer.feature " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>特殊要求：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_prefer.specials " clearable></el-input>
                    </li>
                    <br/>
                    <li class=" " style="width: 97%;">
                      <p>前台爱好：</p>
                      <el-input placeholder="请输入内容" type='textarea' style="width: 83.8%;" v-model=" guestJson.guest_prefer.prefer_front  " clearable></el-input>
                    </li>
                    <li class=" " style="width: 97%;">
                      <p>餐饮喜好：</p>
                      <el-input placeholder="请输入内容" type='textarea' style="width: 83.8%;" v-model=" guestJson.guest_prefer.prefer_fb " clearable></el-input>
                    </li>
                    <li class=" " style="width: 97%;">
                      <p>其它爱好：</p>
                      <el-input placeholder="请输入内容" type='textarea' style="width: 83.8%;" v-model=" guestJson.guest_prefer.prefer_other " clearable></el-input>
                    </li>

                </ul>

                <!-- 类型信息 -->
                <div class='p_title' id='classInfo'>
                  类型信息
                </div>
                <ul class='nav_section'>
                    <li class="">
                      <p>应用归属：</p>
                      <el-input placeholder="请输入内容" size='small' disabled clearable></el-input>
                    </li>
                    <li class="">
                      <p>卡号：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.card_no " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>VIP等级：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.vip_level " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>房价码：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.rate_code " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>市场：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.market " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>客户类型：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.latency " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>佣金码：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.comm_code " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>来源：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.src " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>黑名单类别：</p>
                      <el-input placeholder="请输入内容" size='small' disabled clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>餐饮码：</p>
                      <el-input placeholder="请输入内容" size='small' disabled clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>销售员：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_type.saleman" clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>黑名单描述：</p>
                      <el-input placeholder="请输入内容" size='small' disabled clearable></el-input>
                    </li>
                    <li class=" " style="width: 97%;">
                      <p>备注：</p>
                      <el-input placeholder="请输入内容" type='textarea' style="width: 83.8%;" v-model=" guestJson.guest_type.remark " clearable></el-input>
                    </li>
                </ul>

                <!-- 业绩信息 -->
                <div class='p_title' id='yejiInfo'>
                  业绩信息
                </div>
                <ul class='nav_section'>
                    <li class="">
                      <p>总消费：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.production_ttl   " clearable></el-input>
                    </li>
                    <li class="">
                      <p>客房费用：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.production_rm   " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>入住房晚：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.days_in  " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>入住次数：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.times_in  " clearable></el-input>
                    </li>
                    <!-- <li class=" ">
                      <p>现有积分：</p>
                      <el-input placeholder="请输入内容" size='small' v-model=" guestJson.guest_production.days_in " clearable></el-input>
                    </li> -->
                    <li class=" ">
                      <p>业绩明细</p>
                    </li>
                    <li class=" ">
                      <p>最近入住：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.last_visit_date " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>首次入住：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.first_visit_date " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>最近入住：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.last_visit_date " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>餐饮费用：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.production_fb " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>娱乐费用：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.production_en " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>NOSHOW：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.times_noshow " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>用餐次数：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.times_fb " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>会议费用：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.production_mt " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>其它费用：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.production_ot " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>取消次数：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.times_cxl " clearable></el-input>
                    </li>
                    <li class=" ">
                      <p>娱乐次数：</p>
                      <el-input placeholder="请输入内容" size='small' disabled v-model=" guestJson.guest_production.times_en " clearable></el-input>
                    </li>
                </ul>
              </div>

          </div>
          
        </div>
      </transition>
    </div>
    </el-row>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 头部
      loading: false,
      nickname: "",
      activeIndex: "1",

       // 下拉框请求头
            SelectUrLHeader: "http://47.98.113.173:9103/",
            // 请求地址头
            UrLHeader: "http://47.98.113.173:9102/v1/", //http://member.crowncrystalhotel.com/47.98.113.173:8098

            /* 
              code_base
             */
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
            //手机验证正则表达式
            phone_reg: /^1[3|4|5|7|8][0-9]{9}$/,
            //电话验证正则表达式
            telephone_reg: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
            // 分页
            currentPage: 1,
            pagesize: 10,
            total: 0,
            // 是否显示详情或者列表部分
            newAdd:false,
            visible: true,
            /*
                 后台请求数据 
            */
            guestList:[],
            guestJson: { 
                "sys_cat": 'G',
                "name": "",
                "name2": "",
                "name3": "",
                "sex": "",
                "language": "",
                "salutation": "",
                "birth": null,
                "race": "",
                "religion": "",
                "career": "",
                "nation": "",
                "id_code": "",
                "id_no": "",
                "id_photo": "",
                "id_end": null,
                "company_id": null,
                "company_name": "",
                "pic_photo": "",
                "pic_sign": "",
                "remark": "" ,
                "guest_type": {
                    "sta": "",
                    "flag_cat": "",
                    "grade": "",
                    "latency": "",
                    "company_type": "",
                    "address_type": "",
                    "industry_type": "",
                    "Nature_type": "",
                    "src": "",
                    "market": "",
                    "vip_level": "",
                    "belong_app_code": "",
                    "card_no": "",
                    "valid_begin": null,
                    "valid_end": null,
                    "rate_code": "",
                    "comm_code": "",
                    "flag": "",
                    "saleman": "",
                    "ar_no1": null,
                    "ar_no2": null,
                    "comments": ""
                },
                "guest_link_base": {
                    "mobile": "",
                    "phone": "",
                    "fax": "",
                    "email": "",
                    "website": "",
                    "qq": "",
                    "blog": "",
                    "linkman1": "",
                    "linkman2": "",
                    "addr_name": "",
                    "addr_type": "",
                    "is_default": "",
                    "country": "",
                    "state": "",
                    "city": "",
                    "division": "",
                    "street": "",
                    "zipcode": "",
                    "list_order": null,
                    "remark": ""
                },
                "guest_prefer": {
                    "specials": "",
                    "amenity": "",
                    "feature": "",
                    "room_prefer": "",
                    "interest": "",
                    "prefer_front": "",
                    "prefer_fb": "",
                    "prefer_other": ""
                },
                "guest_production":{
                  "first_visit_date":null,
                  "first_visit_room":null,
                  "first_visit_rate":null,
                  "last_visit_date":null,
                  "last_visit_room":null,
                  "last_visit_rate":null,
                  "days_in":null,
                  "times_in":0,
                  "times_cxl":0,
                  "times_noshow":0,
                  "times_trans":0,
                  "times_fb":0,
                  "times_en":0,
                  "production_rm":null,
                  "production_fb":null,
                  "production_en":null,
                  "production_mt":null,
                  "production_ot":null,
                  "production_ttl":null
              },
            },
           /* 
              显示详情的时候左侧边栏
           */
          hrefIndex:'basicInfo',
          leftNavList:[
            {
              link: 'basicInfo',
              desc: '基本信息'
            },
            {
              link: 'codeInfo',
              desc: '身份信息'
            },
            {
              link: 'linkInfo',
              desc: '联系方式'
            },
            {
              link: 'preferInfo',
              desc: '团队喜好'
            },
            {
              link: 'classInfo',
              desc: '类型信息'
            },
            {
              link: 'yejiInfo',
              desc: '业绩信息'
            },
            {
              link: 'foodInfo',
              desc: '餐饮喜好'
            }
          ]
    };
  },

  methods: {
    // 跳转,登出
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },
    logout() {
      //logout
      let that = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          //确认
          localStorage.removeItem("access-user");
          that.$router.go("/login"); //用go刷新
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    /* 页面请求函数 */
    /* 
        跳转路由 
      */
    navigate(router) {
      this.$router.push({ path: router });
    },
    goTop(goId){
      document.querySelector("#"+goId).scrollIntoView(true);
      this.hrefIndex = goId;
    },
    // 请求单个宾客数据
    get_certain_list(id){
      let that = this;
        let url = that.UrLHeader + "customer/guest/get_guest_base_info/" + id ;
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
            method: "get",
            url: url
        }).then(function(res) {
              if(res.data.message == 'success'){
                that.guestJson = res.data.data;
                that.visible = false;
                that.newAdd = false;
                console.log(res.data.data);
              }else{
                that.$message.error("删除信息失败");
              }
            }).catch(function(err) { });
    },
    /* 
      新增宾客
     */
    newAddGuest(){
      this.newAdd = true;
      this.visible = false
      this.guestJson = { 
              "sys_cat": 'G',
              "name": "",
              "name2": "",
              "name3": "",
              "sex": "",
              "language": "",
              "salutation": "",
              "birth": null,
              "race": "",
              "religion": "",
              "career": "",
              "nation": "",
              "id_code": "",
              "id_no": "",
              "id_photo": "",
              "id_end": null,
              "company_id": null,
              "company_name": "",
              "pic_photo": "",
              "pic_sign": "",
              "remark": "" ,
          "guest_type": {
              "sta": "",
              "flag_cat": "",
              "grade": "",
              "latency": "",
              "company_type": "",
              "address_type": "",
              "industry_type": "",
              "Nature_type": "",
              "src": "",
              "market": "",
              "vip_level": "",
              "belong_app_code": "",
              "card_no": "",
              "valid_begin": null,
              "valid_end": null,
              "rate_code": "",
              "comm_code": "",
              "flag": "",
              "saleman": "",
              "ar_no1": null,
              "ar_no2": null,
              "comments": ""
          },
          "guest_link_base": {
              "mobile": "",
              "phone": "",
              "fax": "",
              "email": "",
              "website": "",
              "qq": "",
              "blog": "",
              "linkman1": "",
              "linkman2": "",
              "addr_name": "",
              "addr_type": "",
              "is_default": "",
              "country": "",
              "state": "",
              "city": "",
              "division": "",
              "street": "",
              "zipcode": "",
              "list_order": null,
              "remark": ""
          },
          "guest_prefer": {
              "specials": "",
              "amenity": "",
              "feature": "",
              "room_prefer": "",
              "interest": "",
              "prefer_front": "",
              "prefer_fb": "",
              "prefer_other": ""
          },
          "guest_production":{
              "first_visit_date":'',
              "first_visit_room":'',
              "first_visit_rate":'',
              "last_visit_date":'',
              "last_visit_room":'',
              "last_visit_rate":'',
              "days_in":'',
              "times_in":0,
              "times_cxl":0,
              "times_noshow":0,
              "times_trans":0,
              "times_fb":0,
              "times_en":0,
              "production_rm":'',
              "production_fb":'',
              "production_en":'',
              "production_mt":'',
              "production_ot":'',
              "production_ttl":''
          },
      }
    },
    // 增加请求后台接口
    add_card_base() {
      //设置请求路径
      let url = this.UrLHeader + "customer/guest/add_guest_base/",
        that = this;

      let copyObj = Object.assign({}, that.guestJson);
      let guest_type = that.guestJson.guest_type;
      let guest_link_base = that.guestJson.guest_link_base;
      let guest_prefer = that.guestJson.guest_prefer;
      let guest_production = that.guestJson.guest_production;

      delete copyObj.guest_type;
      delete copyObj.guest_link_base;
      delete copyObj.guest_prefer;
      delete copyObj.guest_production;

      let guest_base = copyObj; 
      console.log(that.isnull(guest_base.name2));

      if(!that.isnull(guest_base.name)){
        if(!that.isnull(guest_base.name2)){
          guest_base.name2 = guest_base.name;
          if(!that.isnull(guest_base.name3)){
            guest_base.name3 = guest_base.name;
          }
        }

        if(that.phone_reg.test(guest_link_base.mobile)){ 
          that.$axios({
              url: url,
              method: "post",
              data: {  
                guest_base: guest_base,
                guest_type: guest_type,
                guest_link_base:guest_link_base,
                guest_prefer:guest_prefer
              }
          }).then(function(res) {
            console.log(res.data);
              if (res.data.message == "success") {
                that.get_certain_list(that.guestJson.id);
                that.$message({
                  message: "添加成功",
                  type: "success"
                });
              } else {
                that.$message.error("添加失败，请注意带*号必填字段");
              }
          }).catch(error => {});
        }else{
          that.$message.error("请输入正确的手机号码");
        }
      }else{
          that.$message.error("请输入姓名");
      }
      console.log({  
            guest_base: guest_base,
            guest_type: guest_type,
            guest_link_base:guest_link_base,
            guest_prefer:guest_prefer
          });
      

    },
    // 更新宾客信息
    update_card_base(id) {
      //设置请求路径
      let url = this.UrLHeader + "customer/guest/update_guest_base/" + id +'/',
        that = this;

      let copyObj = Object.assign({}, that.guestJson);
      let guest_type = that.guestJson.guest_type;
      let guest_link_base = that.guestJson.guest_link_base;
      let guest_prefer = that.guestJson.guest_prefer;
      let guest_production = that.guestJson.guest_production;

      delete copyObj.guest_type;
      delete copyObj.guest_link_base;
      delete copyObj.guest_prefer;
      delete copyObj.guest_production;

      let guest_base = copyObj; 
      console.log(that.isnull(guest_base.name2));

      if(!that.isnull(guest_base.name)){

        if(!that.isnull(guest_base.name2)){
          guest_base.name2 = guest_base.name;
          if(!that.isnull(guest_base.name3)){
            guest_base.name3 = guest_base.name;
          }
        }

        if(that.phone_reg.test(guest_link_base.mobile)){ 
          that.$axios({
              url: url,
              method: "post",
              data: {  
                guest_base: guest_base,
                guest_type: guest_type,
                guest_link_base:guest_link_base,
                guest_prefer:guest_prefer
              }
          }).then(function(res) {
            console.log(res.data);
              if (res.data.message == "success") {
                // that.get_card_base_list(that.certainBaseData.id);
                that.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                that.$message.error("保存信息失败，请注意带*号必填字段");
              }
          }).catch(error => { });
        }else{
          that.$message.error("请输入正确的手机号码");
        }
      }else{
          that.$message.error("请输入姓名");
      }
      console.log({  
            guest_base: guest_base,
            guest_type: guest_type,
            guest_link_base:guest_link_base,
            guest_prefer:guest_prefer
          });
      

    },
    // 删除单条会员列表 
    remove_card_base(id) {
      //设置请求路径
      let url =
          this.UrLHeader + "customer/guest/remove_guest_base/" + id + "/",
        that = this;
      that.$confirm("是否永久该删除团队信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.$axios
            .post(url)
            .then(function(res) {
              if (res.data.message == "success") {
                
                that.$message({
                  message: "删除成功",
                  type: "success"
                });
                that.visible = true
                that.handleCurrentPageChange(1);
              } else {
                this.$message.error("删除信息失败");
              }

            })
            .catch(error => {});
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分页
    handleCurrentPageChange(currentPage) {
        let that = this;
        let url = that.UrLHeader + "customer/guest/get_guest_base_list/?sys_cat=G";
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
            method: "get",
            url: url,
            params: {
              page: currentPage,
              page_size: 10
            }
        })
            .then(function(res) {
              if(res.data.message == 'success'){
                that.guestList = res.data.data.results;
                that.total = res.data.data.count;
                // that.get_certain_list(res.data.data.results[0].id);
                console.log(res.data.data);
                  that.$message({
                    showClose: true,
                    message: '刷新成功',
                    type: 'success'
                  });
              }
            
            })
            .catch(function(err) {
            console.info(err);
            });
        },

        // 公共函数
        // 判断输入值是否为空
        isnull(val) {
        var str = val.replace(/(^\s*)|(\s*$)/g, " "); //去除空格;
        if (str == "" || str == undefined || str == null) {
            // this.$message('确认输入值不能为空');
            return true;
        } else {
            return false;
        }
        },

        /**code_base*************************************************************************************************/
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
        _this.$axios
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
        _this.$axios
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

    // get_language_tree获取语种
    get_language_tree() {
      let url =
          this.SelectUrLHeader +
          "v1/system/settings/get_code_base_list/?parent_code=language&page_size=300",
        _this = this;
      if (!_this.languageArr.length) {
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        _this.$axios
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
        _this.$axios
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
        _this.$axios
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
          _this.guestJson.guest_link_base.country +
          "&page_size=300";
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      _this.$axios
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
          _this.guestJson.guest_link_base.state +
          "&page_size=300";
      // 发送请求:将数据返回到一个回到函数中
      // 并且响应成功以后会执行then方法中的回调函数
      _this.$axios
        .get(url)
        .then(function(res) {
          if (res.data.message == "success") {
            // 初始化渲染tabs导航项目
            _this.cityArr = res.data.data.results;
          } else {
            _this.$message.error("请求服务器失败，稍后重试");
          }
        })
        .catch(error => { });
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
        _this.$axios
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
        _this.$axios
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
        _this.$axios
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
  },
  created() {
    let that = this;
    this.handleCurrentPageChange(1,10);


    that.get_id_code_tree();
    that.get_nation_tree();
    that.get_language_tree();
    that.get_race_tree();
    that.get_country_tree();
    that.get_province_tree();
    that.get_city_tree();
    that.get_religion_tree();
    that.get_salary_tree();
    that.get_interest_tree();
    
  }
};
</script>
<style lang="less" scoped>
.row{
  display: flex;
  flex-direction: row;
}
.Setting {
  margin-top: 60px;
  min-width: 1570px;
}
.el-menu {
  background-color: #eaedf1;
  color: #000000;
}
.router-link-active {
  color: #409eff;
}
.RightCotent {
  width: calc(100% - 250px);
}
/* 页面展示部分 */
.guestIndex{
    padding: 10px 0;
}
.guestList{
  padding: 0 10px;
}
/* 顶层操作按钮 */
.btn_group{
    width: 100%;
}

// 头部后台读取数据
  .table {
    font-size: 14px;
    border: #cccccc 1px solid;
    margin-top: 20px;
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



  /* 控制显示新建之后 */
  .color_red{
    color: red;
  }
  .leftNav{
    width: 13%;
    background-color: #EAEDF1;
  }
  .href{
    line-height: 40px;
    text-align: center;
    color: #222222;
    cursor: pointer;
  }
  .rightNav{
    width: 84%;
    padding: 0 20px;
    overflow-y: scroll;
    // 标题
    .p_title{
      border-top: 1px #eeeeee solid;
      color: #4488E9;
      font-size: 18px;
      margin: 5px 0;
      padding: 10px 0;
    }
    // 表单input
    .nav_section{
      width: 100%;
      padding: 10px;
      li{
        width: 30%;
        display: inline-block;
        margin: 5px 0;
        // title
        p{
          // width: 25%;
          display: inline-block;
          line-height: 32px;
          text-align: right;
          margin-right: 20px;
        }
        .el-input,.el-textarea,.el-select{
          float: right;
          width: 68%;
          margin-right: 9%;
        }
      }
    }
  }
  

  
</style>



