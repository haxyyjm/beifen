<template>
    <div>
        <el-dialog width="70%" class="preview-dialog" title="新建预定单"  :visible.sync="previewFormVisible"
            @close="$emit('update:show', false) ;closeAndFlushData()"
            :show="show">
            <el-row style="margin-top: 20px">
              <el-col :span = "5">
                预定类型:
                <el-select  v-model="preBillParam.reserve_base.rsv_lable" style="width: 65%"  placeholder="请选择">
                    <el-option
                    v-for="item in labelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-col>
            <el-col :span="9" class="elColMiddle">
                <el-input  v-if="preBillParam.reserve_base.code_src == 'HY' || preBillParam.reserve_base.code_market == 'XYGS'" clearable v-model="infoShow"  @focus="queryCardPop" placeholder="请输入信息"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button v-if="preBillParam.reserve_base.code_src   == 'HY'|| preBillParam.reserve_base.code_market == 'XYGS'" style="margin-left: 10px" type="primary">搜索</el-button>
              </el-col>
            </el-row>
            <el-row style="height: 10px">
            </el-row>
            <el-row>
                <el-col :span="24">
                  <el-col :span="5">
                  &nbsp;&nbsp;&nbsp;市场码:
                  <el-select @change="flushRateCode" clearable @focus="getMarketSrc('market')"  v-model="preBillParam.reserve_base.code_market" style="width: 65%"  placeholder="请选择">
                      <el-option
                        v-for="item in marketSrcList"
                        :key="item.id"
                        :label="item.descript"
                        :value="item.code">
                      </el-option>
                  </el-select>
                  </el-col>
                  <el-col :span="9">
                    <span style="padding-left: 15px">来源码:</span>
                    <el-select @focus="getMarketSrc('src')" clearable v-model="preBillParam.reserve_base.code_src" style="width: 78%"  placeholder="请选择">
                      <el-option
                        v-for="item in marketSrcList"
                        :key="item.id"
                        :label="item.descript"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-col>
                   <el-col :span="10">
                    <span>房价码:</span>
                    <el-select @change="handleRateCode"  clearable @focus="getRateCode_list()"  v-model="preBillParam.reserve_base.rate_code"   placeholder="请选择">
                      <el-option
                        v-for="(item,index) in rateCode_list"
                        :key="index"
                        :label="item.description"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :span="8" class="elColMiddle">
                    <el-input clearable v-if="preBillParam.reserve_base.rsv_type !=1 && preBillParam.reserve_base.rsv_type !=2" v-model="infoShow" @focus="queryCardPop" placeholder="请输入客户手机号/会员卡号/身份证号"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button v-if="preBillParam.reserve_base.rsv_type !=1 && preBillParam.reserve_base.rsv_type !=2" style="margin-left: 10px" type="primary">搜索</el-button>
                </el-col>
            </el-row>
            <!-- <hr/> -->
            <el-row style="margin-top: 10px">
              <el-col :span="5">
                  <span style="padding-left: 14px">预定人:</span>
                  <el-input  style="width: 65%" v-model.trim="preBillParam.reserve_base.rsv_person_name" placeholder="请输入姓名"></el-input>
              </el-col>
              <el-col :span="18" class="elColMiddle">
                  联系电话:<el-input style="width: 300px"  v-model.trim="preBillParam.reserve_base.telephone_master " placeholder="请输入电话"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
                <el-col :span="13" class="elColMiddle" >
                <span style="margin-left: -10px">预离时间:</span>
                <el-date-picker style="width: 28vw" :picker-options="rangeDate"  :clearable ="false"
                    :default-time="[startDate_kaishi, '14:00:00']"
                    @change="haveChangeTime"
                    v-model="preBillParam.reserve_base.leave_time" type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
                </el-date-picker>
                <span  v-if="preBillParam.reserve_base.rsv_lable === 0">共 <span style="width: 80px">{{countDateRange}}</span> 晚</span>
                <!-- 保留至:<el-date-picker style="width: 10vw" v-model="value2" type="date" placeholder="选择日期"></el-date-picker> -->
                </el-col>
            </el-row>
            <!-- 选择房型一行 -->
            <el-row  style="margin-top: 10px">
              <div v-for="(item,index) in preBillParam.reserve_rate" :key="index">
                <div  style="margin-top: 10px">
                    选择房型:
                    <el-popover placement="bottom-start" width="300" trigger="click" v-model="item.visible">
                    <!-- 选择房型名称 input框的在对应值 ex:大床房 -->
                    <el-input readonly @focus="getRoomInfo()"  style="width: 9.0vw" slot="reference" v-model="item.room_type"></el-input>
                    <!-- 选出房型弹出框=》右边弹出框 -->
                    <div v-show="showPop_right" class="romm_pop_right">
                        <div>
                        <div style="width: 100%; background-color: #373d41; height: 30px; margin-top: 12px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">{{houseType_HeadValue}}</span>
                        </div>
                        <div style="height: 30px">
                            <!-- 右边展开项的数值 -->
                            <div @click="getHouseTypePrice(item,index); item.visible = false" class="romm_pop_right_behind">
                            <span>门市价</span>
                            <span>首日: <span style="color: #f3565d">{{item.room_price}}</span></span>
                            </div>
                        </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <!-- 选出房型弹出框=》左边 -->
                    <div class="room_pop">
                        <div style="width: 100%; background-color: #373d41; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">房型选择</span>
                        </div>
                        <ul class="popSelect_class">
                            <li style="height: 40px" v-for="(itemm,index) of roomInfoList" :key="itemm.id" @click="showPop_right=true; getHouseTypeNextValue(item,index,itemm)">
                                <span>{{itemm.room_type_desc}}</span>
                                <div style="line-height: 20px;">
                                  <span style="display: block">可售: {{itemm.can_live_num}}</span>
                                  <span>超预留:</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </el-popover>
                    <span style="margin-left: 20px;">房间数:</span> <el-input-number  @change="mountMoney(item)"  v-model="item.room_count" :min="0"></el-input-number>
                    <!-- 预订单=>选房号 -->
                    <img @click="chooseNo(item,index)" style="margin-left: 2px; cursor: pointer;  position: relative; top: 15px;"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
                    <!-- 标签组=》即为房间数 -->
                    <div style="display: inline-block; width: 220px; height: 40px;">
                    <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber.slice(0,3)" closable :disable-transitions="false" @close="handleClose(item,tag)">
                      {{tag}}
                    </el-tag>
                    <el-popover placement="right-start" width="200" trigger="click">
                      <div>
                        <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber">
                          <span>{{tag}}</span>
                        </el-tag>
                      </div>
                      <!-- 溢出的tag则显示在popover里面 -->
                      <span v-if="item.dynamic_roomNumber.length>3 ? showPoint = true : showPoint =false"  slot="reference" style="cursor: pointer; line-height: 40px;color: #378ff6; margin-left: 10px">...</span>
                    </el-popover>
                    </div>
                    <div  style="position: relative; top: 20px; float: right; height: 30px">
                    <!-- 房间首日价 -->
                    <span style="margin-right: 20px">
                      <div v-if="String(item.room_price)" style="display: inline-block">
                        首日价<el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.room_price" style="color: #f3565d;width: 60px"></el-input>
                        <span v-show="!span_input_flag" @click="span_input_flag = true" style="color: #f3565d">{{item.room_price}}</span> 元/间
                      </div>
                      <div v-else style="display: inline-block">
                        <el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.room_price" style="color: #f3565d;width: 60px"></el-input>
                        <span v-show="!span_input_flag" @click="span_input_flag = true" style="color: #f3565d">请选择房价</span>
                      </div>
                      <el-popover
                        placement="bottom-end"
                        width="650"
                        trigger="click"
                      >
                        <ul>
                          <li  style="display: inline-block;background-color: #303A41; color: #FFFFFF;" v-for="item of rateDateList" :key="item.id">
                            <span style="margin-left: 10px">{{item}}</span>
                          </li><br/>
                          <li style="display: inline-block; width: 85px; margin-top: 10px" v-for="item of rateValueList" :key="item.id">
                            <span  style="color: red; margin-left: 38px">{{item}}</span>
                          </li>
                        </ul>
                        <!-- <span v-for="item of rateDateList" :key="item.id">
                          <span>{{item}}</span>
                        </span>
                        <div></div>
                        <span v-for="item of rateValueList" :key="item.id">{{item}}</span> -->
                        <i  slot="reference" @click="getRateInfo(item)" class="el-icon-caret-bottom" style="background-color: #5bbbf5!important"></i>
                      </el-popover>
                    </span>
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showDeleteButton" @click="deleteSelect(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showAddButton" @click="addSelect" src="../../../assets/images/pms/houseStatus/add.png">
                    </div>
                </div>
              </div>
            </el-row>
            <!-- 入住人一行 -->
            <el-row style="margin-top: 10px;max-height: 300px;overflow: auto">
                <el-button type="info" round @click="is_addlive = true" v-show="!is_addlive">+入住人</el-button>
                <el-button type="info" round @click="is_addlive = false; flush_reserveGurst()" v-show="is_addlive">-入住人</el-button>
                <div v-show="is_addlive" v-for="(item,index) in preBillParam.reserve_guest" :key="index" style="margin-top: 10px">
                <div style="diplay: inline-block">
                    <span style="padding-left: 14px">入住人:</span>
                    <el-select @change="selectLive(item)"  @focus="getEnter_RommNumber" v-model="item.room_number" style="width: 9.8vw"  placeholder="房间">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span style="float: left">{{ itemm.roomNo }}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">已住:{{ itemm.liveCount }}</span> -->
                      </el-option>
                    </el-select>
                    <el-input  v-model.trim="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                    <el-select v-model.trim="item.sex " style="width: 5.8vw"  placeholder="性别">
                      <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                      <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                    </el-select>
                    <el-input  v-model.trim="item.id_no" maxlength="18" @blur="validateId_no(item,'输入')"  placeholder="证件号码"  style="width: 12vw"></el-input>
                    <el-input  v-model.trim="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                </div>
                <div style="display: inline-block">
                    <el-input  v-model.trim="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 64px; margin-top: 10px"></el-input>
                </div>
                <!-- 预定房间入住人多选 +-->
                <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </el-row>
            <el-row style="margin-top: 120px">
                <!-- <img style="cursor: pointer; display: inline-block; margin-bottom: -19px" src="../../../assets/images/pms/houseStatus/cardImport.png"> -->
                <!-- <el-button style="height: 50px; width: 150px; margin-left: 12px" type="info">物品</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="remarkDialog = false; resolveRemarkList()">备注</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="preview_billDialog = false">预约发票</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="consumeDialog = true">消费</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="settingDialog = false">服务设置</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="breakfastDialog = true; getBreakfastList()">早餐</el-button> -->
                <el-button style="height: 50px; width: 100px" type="primary" @click="addAndUpdate_remarkDialog = true;">备注</el-button>
                <div style="float: right">
                    <!-- 应收总额:<span style="margin-right: 10px">{{countMoney}}</span> -->
                    <el-popover
                      placement="top-end"
                      width="200"
                      height="300"
                      trigger="click">
                      <div>
                        房费:{{countMoney}}
                      </div>
                     <!-- <el-button slot="reference" style="margin-right: 10px;">明细</el-button> -->
                    </el-popover>
                <!-- <el-button style="height: 50px; width: 100px" type="primary" @click="authorizationDialog = true">预授权</el-button> -->
                <el-button :loading="isLoading" style="height: 50px; width: 100px;" type="primary" @click="senToParent();confirmPreview()">确认预定</el-button>
                </div>
            </el-row>
        </el-dialog>
        <!-- 预授权 -->
        <a-dialog :show.sync= authorizationDialog :parentParam='authorizationParam'></a-dialog>
        <!-- 选房号 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="选房号" :visible.sync="switchNumberDialog" :modal="true">
          <div style="height: 400px; width: 100%; background-color: #EBEDF1">
            <!-- <div style="float: left; width:25%">
              <ul class="choose_no_class">
                <li v-for="(item,index) of this.preBillParam.reserve_rate" :key="item.room_type" @click="selectHouseType(item,index)">
                  <span style="color: #5B97EB; ">{{item.room_type}}</span>
                  <span style=" margin-right: 20px">可订数:<span style="color: #FC6784">{{item.can_live_num}}</span></span>
                </li>
              </ul>
            </div> -->
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
            <div style="float: left;">
              自动排房<el-switch style="margin-left: 5px" @change="selfSelectHouse" v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
              <span style="margin-left: 10px">排房结果: <span>{{this.sortNumber}}</span></span>
              <span style="margin-left: 10px">未排房总数:<span style="color: #f3565d">{{this.noSortNumber}}</span></span>
              <span style="margin-left: 10px">已排房总数:<span style="color: #23c608">{{this.sortNumber}}</span></span>
            </div>
            <el-button @click="switchNumberDialog = false; getRoomNumber()" type="danger">提交</el-button>
          </div>
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
        <!--新建预订单=>早餐-->
        <el-dialog class="houseTypeClass deletePadding_Class" width="70%"   title="新增早餐" :visible.sync="breakfastDialog" :modal="true">
          <div style="height: 400px; width: 100%;">
            <div style="float: left;width: 20%;height: 400px; border-right: 1px solid #c8c8c8; background-color: #eaedf2;">
              <div style="width: 100%; background-color: #bfcad1; height: 47px; line-height: 47px; padding-left: 5px">
                早餐分类
              </div>
              <ul class="breakfast_class">
                <li v-for="item of this.breakfastAllList" :key="item.id">
                  <span>{{item.descript}}</span>
                  <span>
                    {{item.price}}
                    <el-button  circle size='mini' type="danger" @click="addbreakfastItem(item,'买')">买</el-button>
                    <el-button  circle size='mini' type="success" @click="addbreakfastItem(item,'赠')" style="margin-left: -2px;">赠</el-button>
                  </span>
                </li>
              </ul>
            </div>
            <div style="float: right;width: 80%">
              <el-table :data="preBillParam.breakfastInfoList" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" style="width: 100%; height:400px">
                <el-table-column prop="descript" label="早餐类型"></el-table-column>
                <el-table-column prop="date" label="周期"></el-table-column>
                <el-table-column prop="isBuy" label="买/赠"></el-table-column>
                <el-table-column prop="rangeTime" width="180" label="有效期"></el-table-column>
                <el-table-column prop="number"  width="150" label="数量">
                  <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.number"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="单价(元)"></el-table-column>
                <el-table-column prop="count" label="总计(元)">
                  <template>
                  <!-- <span>{{sumBreakfastMoney.toFixed(2)}}</span> -->
                </template>
                </el-table-column>
                <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="deleteBreakfastInfo(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              <el-button type="info" @click="preBillParam.breakfastInfoList = []">清空早餐</el-button>
              <span style="margin-left: 30px">选购商品总数:<span></span></span>
            </div>
            <span style="margin-right: 20px;">消费总计:<span></span></span>
            <el-button type="success"  @click="breakfastDialog=false">确定</el-button>
          </div>
        </el-dialog>
          <!--新建预订单=>设置-->
        <el-dialog class="houseTypeClass" width="50%"   title="设置" :visible.sync="settingDialog" :modal="true">
          <div style="height: 400px">
            <ul style="text-align: right; float:left;">
              <li>
                是否固定房价<el-switch style="margin-left: 5px"  v-model="preBillParam.reserve_base.is_room_price " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否保密订单<el-switch style="margin-left: 5px"  v-model="preBillParam.reserve_base.is_secrete  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否房价保密<el-switch style="margin-left: 5px"  v-model="preBillParam.reserve_base.is_secret_rate  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否允许记账<el-switch style="margin-left: 5px"  v-model="preBillParam.reserve_base.allowed_ar  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="settingDialog=false">保存</el-button>
          </div>
        </el-dialog>
          <!--新建预订单=>消费-->
        <c-dialog :show.sync= consumeDialog :parentParam='preBillParam'  v-on:listenTochildEvent="getConsumeData"></c-dialog>
          <!--新建预订单=>发票-->
        <el-dialog class="houseTypeClass" width="20%" title="预约发票" :visible.sync="preview_billDialog" :modal="true">
          <div style="height: 400px">
            <el-input  placeholder="请输入公司名称"></el-input>
            <el-input style="margin-top: 10px"  placeholder="请填写纳税人识别号"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写开户银行名称"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写开户银行账户"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写公司地址"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写公司电话"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="preview_billDialog=false">保存</el-button>
          </div>
        </el-dialog>
        <!--卡查询-->
        <el-dialog @close="card_input=false" class="houseTypeClass deletePadding_Class" :title="changeTitle" :visible.sync="cardQueryDialog" :modal="true">
          <div v-if="changeTitle === '卡查询'" style="height: 400px; width: 100%;">
            <el-row style="margin: 10px;10px;10px;10px">
              会员卡号: <el-input  v-if="card_input" @change="getcardInfo()" v-focus placeholder="填充会员卡号" size="mini" @focus="resetNull('card_no')" clearable v-model="cardParam.card_no" style="width: 8vw"></el-input>
              姓名: <el-input placeholder="填充姓名" @focus="resetNull('name')" clearable size="mini" v-model="cardParam.name" style="width: 8vw"></el-input>
              证件号码: <el-input placeholder="填充证件号码" @focus="resetNull('number')" clearable size="mini" v-model="cardParam.number" style="width: 8vw"></el-input>
              <!-- 手机号: <el-input placeholder="填充手机号" size="mini" @focus="resetNull('telephone')" clearable v-model="cardParam.telephone" style="width: 8vw"></el-input> -->
              <!-- <span style="margin-left: 10px">模糊搜索</span> <el-checkbox></el-checkbox> -->
              <!-- <el-button type="primary" style="float: right">读卡</el-button> -->
              <el-button type="primary" style="float: right;margin-right: 10px" size="mini" @click="getCardMemberList">查询</el-button>
            </el-row>
            <div>
                <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" height="300"  :data="cardBaseList" style="width: 100%;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="card_name" label="姓名"></el-table-column>
                <el-table-column prop="card_no" label="卡号"></el-table-column>
                <el-table-column label="性别">
                  <template slot-scope="scope">
                    {{scope.row.sex=== '1' ? '男' : '女'}}
                  </template>
                </el-table-column>
                <el-table-column prop="id_no" label="证件号码"></el-table-column>
                <el-table-column  label="积分余额">
                   <template slot-scope="scope">
                    {{scope.row.point_pay - scope.row.point_charge}}
                  </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="card_type" label="会员计划"></el-table-column>
                <el-table-column prop="card_level" label="卡等级"></el-table-column>
                <el-table-column prop="date_end" label="有效期"></el-table-column>
                <el-table-column prop="status" label="卡状态"></el-table-column>
                <el-table-column prop="iss_hotel" label="发行酒店"></el-table-column>
                <el-table-column prop="remark" fixed="right" label="备注"></el-table-column>
                </el-table>
            </div>
          </div>
          <!--v-if判断-->
          <div v-if="changeTitle === '订房中心查询'" style="height: 400px; width: 100%;">
            <div>
              <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"  :data="centerRoomList"  height="300"  style="width: 100%;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="changeTitle === '协议单位查询'" style="height: 400px; width: 100%;">
            <div>
              <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"  :data="centerRoomList"   height="300"  style="width: 100%;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
              </el-table>
            </div>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              <span style="margin-left: 10px">记录总数:<span style="color: #23c608"></span></span>
            </div>
            <el-button  type="primary">打卡主单</el-button>
            <el-button  type="primary" @click="setCardInfo">预订</el-button>
            <el-button  type="primary" @click="setCardInfo">确定</el-button>
            <el-button  type="info" @click="cardQueryDialog=false">取消</el-button>
          </div> -->
        </el-dialog>
        <!-- 新建/编辑预订单备注=》新建编辑备注 -->
        <el-dialog class="houseTypeClass" width="30%" title="新增备注" :visible.sync="addAndUpdate_remarkDialog" :modal="true">
          <div style="height: 200px">
            <el-input v-model="remarkContent_value" placeholder="请输入备注信息" type="textarea" :rows="10"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="add_remark()">保存</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import aDialog from './authorizationDialog'
import _ from 'lodash'
import util from '../../../common/util.js'
import moment from 'moment'
import cDialog from './consumeDialog'
export default {
    data(){
        return {
          isLoading: false,
          changeTime: false,
          rateCode_list: [],
          mainAccount_id: '',
          span_input_flag: false,
          card_input: true,
          cardParam: {
            name: '',
            number: '',
            card_no: ''
          },
          authorizationParam: {},
          authorizationDialog: false,
          infoShow: '',
          centerRoomList: [],//订房中心list
          changeTitle: '',//入住类型变动，不同的title
          rateCodeValue: 'BAR',
          rateDateList: [],//房价时间与价钱对应数组
          rateValueList: [],
           // 下拉框会员计划初始化数据
          CardTypeTree: [],
          // 下拉框会员等级初始化数据
          CardLevelTree: [],
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
          cardBaseList: [],//会员信息
          cardQueryDialog: false,
          collectionChargeData: [],//收款要选择的数据
          incomingAccoutList: [],//入账代码list
          accoutInfoById_param: {},
          return_accountParam_1: {},//开帐之后返回的param
          isAccout: true,
          isPay: true,
          marketSrcList: [],//市场码来源码数据
          selfSortArray: [],//自动排房
          payMoney: 0,
          returnPreviewParam: {},
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
            reference_id: '12345',//int 此时测试数据
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
          noSortNumber: 0,
          sortNumber: 0,
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
          previewFormVisible: this.show,
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
            reserve_rate:[{
              max_live_num: '',//add
              can_live_num: '',//add
              room_type_code: '',//房型名称对应ID
              room_type: '',//房型名称
              room_class: '',
              room_number: null,//房间数 数组变字符串
              dynamic_roomNumber: [],//动态房间号=》应是一个数组
              // ['111', '222', '333','444', '555','666', '777']
              ratecode_id: null,//房价码
              room_price: '',
              room_count: '1',//房间数量几件=add=
              roomPrice: '', //总价钱=add=
              // code: '123',
              // room_type_code: '123',
              // descript: '123',
              // descript_en: '123',

              // list_order: 123,
              remark: '',
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
            }],
            reserve_base:{
              remark_id_list: '',
              rate_code: '',//房价码
              is_change_rate: '',
              rsv_type : 1,//预定类型
              rsv_lable: 0,
              rsv_person_name : '',//预定人姓名
              telephone_master: '',//预定人电话
              arr_time: '',//预抵时间
              leave_time: '',//离开时间
              is_room_price: 1, //传的 false和 true
              is_secrete : 1,
              is_secret_rate : 1,//1传的
              allowed_ar : 1,
              // code: '11',
              // room_type_code: '11',
              // descript: '11',
              // descript_en: '11',

              // list_order: 1,
              account_id: null,
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
              name:'1111',
              email_master: '101608@qq.com',
              weixin_master: '1',
              mobile_master: '1',
              id_no: '1',
              room_price: null,
              ar_id: '1',
              code_commision_id: '1',
              code_market: '',
              code_src: '',
              // reference_id: '1',
              rsv_status_lable: 0,
              total_chartge: 0,
              total_pay: 0,
              last_account_id: null,
              last_pay_id: 1,
              account_num: 1,
              pay_num: 1
            },
            //入住人
            reserve_guest:[{
              liveCount: 0,//可选数
              room_number: null,//房间号
              id_code: '01',//证件类型
              id_no: '',//证件号码
              name: '', //姓名
              sex: '0',//性别
              telephone: '',//手机号
              street_add: '',//街道地址
              // code: '123',
              // room_type_code: '77777',
              // descript: null,
              // descript_en: null,

              // list_order: 1,
              last_name: null,
              first_name: null,
              name2: null,
              name_combi: null,
              is_save: false,
              language: '',
              title: null,
              salutation: null,
              race: null,
              religion: null,
              career: '',
              nation: null,
              visa_no: null,
              visa_grant: null,
              enter_port: null,
              where_from: null,
              where_to: null,
              salary: null,
              education: null,
              marital: null,
              company_id: null,
              company_na: '',
              pic_photo: null,
              pic_now: null,
              remark: '',
              is_anonymo: false,
              weixin: '',
              mobile: null,
              email: '',
              country_id: null,
              division_id: null,
              state_id: null,
              city_id: null,
              zipcode: null,
              reserve_base_id: '',
              guest_id: 0
            }],
            //早餐
            // breakfastInfoList: [],
            // settingInfo: {},//设置
            // //预定=》消费
            // consumeInfoList: [{
            //     name: '',
            //     number: '',
            //     price: '',
            //     count: ''
            // }],
            // billInfo: {},//发票
            // remarkList: [{
            //     remarkContent: '',
            //     remarkType: '',
            //     status: '',
            //     time: '',
            //     operationPeople: '',
            // }],//备注
            //选择房型list=》动态多选框
            // reserve_rate: [{
            //     room_type: '',//房间类型
            //     room_count: '',//房间数量
            //     roomPrice: '', //单价价钱
            //     dynamic_roomNumber: ['111', '222', '333','444', '555','666', '777'],//动态房间号=》应是一个数组
            //     mayCount: '2', //可预订数
            // }],
          },
          startDate_kaishi: moment(new Date()).format('HH:mm:ss'),
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
            label: '会员',
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
          labelList:[{
            label: '全日房',
            value: 0
            },
            // {
            //   label: '钟点房',
            //   value: 1
            // },
            {
              label: '夜宵房',
              value: 2
            },{
              label: '常住房',
              value: 3
            },{
              label: '免费房',
              value: 4
            }
          //   {
          //   label: '自用房',
          //   value: 2
          // },{
          //   label: '免费房',
          //   value: 3
          // }
          ],
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
          rangeDate:{
            disabledDate(time){
              return time.getTime() < Date.now() - 8.64e7
            }
          },
          isActive: false, // 样式true or false
          // UrLHeader_room: 'http://room.crowncrystalhotel.com/v1/',
          // UrLHeader_bill: 'http://bill.crowncrystalhotel.com/v1/',
          //线下======================
          UrLHeader_room: 'http://47.98.113.173:8091/v1/',
          UrLHeader_bill: 'http://47.98.113.173:9202/v1/',
          // UrLHeader_bill: 'http://192.168.2.224:9005/v1/',
          UrLHeader_9101:'http://47.98.113.173:9101/v1/',
          UrLHeader_9102: 'http://47.98.113.173:9102/v1/',
          UrLHeader_9103: 'http://47.98.113.173:9103/v1/',
          UrLHeader_9519:'http://47.98.113.173:9519/v1/',//9022
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
          leaveDialog: false,
          houseTypeDialog: false,
          switchNumberDialog: false,
          enterPreviewDialog: false,//入预收操作
          prePayDialog: false, //聚合支付
          editPriceDialog: false,
          addPersonDialog: false,
          continueLiveDialog: false,
      }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        parentParam: {
            type: Object,
            required: true
        }
    },
     components: {
      'cDialog': cDialog,
      'aDialog': aDialog
    },
    watch: {
      show () {
        this.preBillParam.reserve_base.code_market = ''
        this.preBillParam.reserve_base.code_src = ''
        this.preBillParam.reserve_base.rate_code = ''
        this.previewFormVisible = this.show
        this.getRoomType() //准备:循环得到匹配的房型中文名
      },
      parentParam(){
        console.log('this.preBillParam.reserve_rate',this.preBillParam.reserve_rate[0].dynamic_roomNumber[0] == undefined)
        // 此种就是进来子组件 从而直接得到相应房型房间价格 然后可选房号
        for(var item of this.preBillParam.reserve_rate){
          item.room_type = this.parentParam.roomType
          // item.room_count = 1
          item.room_type_code = this.parentParam.roomType_code
          if(this.parentParam.roomNo){
            item.dynamic_roomNumber.push(this.parentParam.roomNo)
          }else{
            item.dynamic_roomNumber = []
          }
        }
        let param = {
          room_type: this.parentParam.room_type_name
        }
        this.remarkContent_value = ''
        this.getCardListInfo()//获取房子信息所有数据
        this.getRateCode(item,param) //====下面没有用
        // this.getCanLiveRoom(param.room_type) //根据房型选未占用房间
      }
    },
    // 注册一个局部的自定义指令 v-focus
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          // 聚焦元素
          el.querySelector('input').focus()
        },
      }
    },
    computed:{
      //类似监听=====>计算时间控件默认时间
        getDateArray(){
          let date = moment().format('HH:mm:ss')
          return [date, '14:00:00']
        },
      //计算预离时间差天数
      countDateRange(){
        let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      }
    },
    created(){
      // this.getRoomOccupy()
      //  this.getRoomType() //准备:循环得到匹配的房型中文名
      // this.getTagByRoom()//得到房间对应标签
    },
    methods: {
         //筛选处理房价码
        handleRateCode(){
          this.rateCodeValue = this.preBillParam.reserve_base.rate_code
          console.log('preBillParam.reserve_base.rate_code',this.preBillParam.reserve_base.rate_code)
          this.getRateCode_newPrice()
          // this.clearMaseterBase()
        },
        getRateCode_newPrice(){
          let that = this
          let url = that.api.api_newPrice_9107 + '/v1/' +  `room/rate_code/get_rate_code/`
          // let temp = []
          // temp.push(param.room_type)
          // this.preBillParam.reserve_base.rsv_type
          let scopeParam ={
            rate_code: that.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res.data.data',res.data.data)
            let temprate = res.data.data.price
            this.handlePrice(temprate)//处理以得到价格
            }).catch(error=>{
          })
        },
        /**
       * 处理动态得到相应的房价信息
       */
      handlePrice(param){
        // let key1 = param.room_type
        // let temprateValue = temprate[key1]
        console.log('this.preBillParam.master_basekaishi',this.preBillParam.reserve_rate)
        let key2 = moment(new Date()).format('YYYY-MM-DD') //对象嵌套对象里的key值
        // that.houseType_priceValue_1 = temprateValue[key2]
        for(var item of this.preBillParam.reserve_rate){
          if(JSON.stringify(param) != "{}"){
            item.room_price = param[item.room_type_code][key2]
          }else{
            item.room_price = 0
          }
        }
      },
        //获取房价码list
        getRateCode_list(){
          if(!this.preBillParam.reserve_base.code_src || !this.preBillParam.reserve_base.code_market){
            this.$message.warning('请选择市场码或者来源码!')
            return
          }
          let that = this
          let url = that.api.api_newPrice_9107+ '/v1/' + `room/rate_code/get_rate_code_list/`
          that.$axios.get(url,{
            params: {
              market: that.preBillParam.reserve_base.code_market,
              src__icontains: that.preBillParam.reserve_base.code_src,
              is_day_user: 1
            }
          }).then(res=>{
            console.log('res.data.data.results',res.data.data.results,res.data.data)
              if(res.data.message == 'success'){
                  that.rateCode_list = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        openAuthorization(){
        },
        //验证是否存在已经住人的房间继续刷卡住人
        validateId_no(param,param2){
          console.log('param=====,card',param,param2)
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/is_checkin_info/`
          let url= that.api.api_bill_9202 + '/v1/' + `checkin/is_checkin_info/`
          let scopeParam = {
            id_no: param.id_no
          }
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.data.result === 'success'){
              that.$message.warning('检测该人已入住!')
              if(param2==='输入'){
                param.id_no='' //置空操作
                //置空操作，思路可以传一个上面循环中的index，从而清空该数据
                // console.log('cardInput==',this.$refs.cardInput)
                // console.log('输入1111')
                // this.$refs.cardInput[0].value = ''//置空操作
              }else{
                // that.cardInfoDialog = false //不打开dialog
              }
            }else{
              // if(param2==='输入'){
              // }else{
              //   that.cardInfoDialog = true //打开dialog
              // }
            }
          })
        },
        //卡查询 注意当为会员入住的时候
        queryCardPop(){
          if(this.preBillParam.reserve_base.code_src === 'HY'){
            this.$nextTick(()=>{
              this.card_input = true
            })
            this.cardQueryDialog = true
            this.changeTitle = '卡查询'
            this.cardParam.name = ''
            this.cardParam.number = ''
            this.cardParam.card_no = ''
            this.getCardMemberList()
            // setTimeout(() => {
              // this.get_code_list()//请求字典项
            // }, 300);
          }else if(this.preBillParam.reserve_base.rsv_type === 3){
            this.cardQueryDialog = true
            this.changeTitle = '订房中心查询'
            this.getCenterRoomList()
          }else if(this.preBillParam.reserve_base.code_market === 'XYGS'){
            this.cardQueryDialog = true
            this.changeTitle = '协议单位查询'
            this.getUnitList()
          }
        },
        //入住人塞入值
        setCardInfo(){
          this.cardQueryDialog = false
          this.is_addlive = true //入住人展开
        },
        //点击选中行数据 并查询该条的房价码
        selectCard(row, column, event){
          this.getRateCode_list()//字典数据
          if(this.changeTitle === '协议单位查询'){
            this.infoShow = row.name
            this.preBillParam.reserve_base.rate_code = row.rate_code// 填充房价码选择框，有默认值
            if(this.preBillParam.reserve_base.code_src === 'HY'){
              this.rateCodeValue = row.rate_code
            }else if(this.preBillParam.reserve_base.code_market == 'XYGS' || this.preBillParam.reserve_base.rsv_type === 3 || 4){
              this.rateCodeValue = row.rate_code
            }
            this.cardQueryDialog = false
            this.$message({
              type: 'info',
              message: '获取房价码!'
            });
          }else{
            this.$confirm('是否本人预定?','提示',{
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(()=>{
              try {
                this.preBillParam.reserve_base.rate_code = row.rate_code// 填充房价码选择框，有默认值
                if(this.preBillParam.reserve_base.code_src === 'HY'){
                  this.rateCodeValue = row.rate_code
                  this.infoShow = row.card_name
                  this.clearMaseterBase()
                }else if(this.preBillParam.reserve_base.code_market == 'XYGS' || this.preBillParam.reserve_base.rsv_type === 3 || 4){
                  this.rateCodeValue = row.rate_code
                  this.infoShow = row.name
                }
                row.sex === '0' ? row.sex = '1' : row.sex = '0' //定义规则不一样
                for(var item of this.preBillParam.reserve_guest){
                  this.preBillParam.reserve_guest[0].id_code = row.id_code
                  this.preBillParam.reserve_guest[0].id_no = row.id_no
                  this.preBillParam.reserve_guest[0].name = row.card_name
                  this.preBillParam.reserve_guest[0].telephone = row.phone
                  this.preBillParam.reserve_guest[0].sex = row.sex
                }
                this.cardQueryDialog = false
                this.is_addlive = true //入住人展开
                this.$message.success('已选择该条数据!')
              } catch (error) {
                console.log('error')
              }
            }).catch(()=>{
              if(this.preBillParam.reserve_base.code_src === 'HY'){
                this.rateCodeValue = row.rate_code
              }else if(this.preBillParam.reserve_base.code_market == 'XYGS' ||this.preBillParam.reserve_base.rsv_type === 3 || 4){
                this.rateCodeValue = row.rate_code
              }
              this.is_addlive = false //入住人关闭
              this.cardQueryDialog = false
              this.$message({
                type: 'info',
                message: '获取房价码!'
              });
            })
          }
            //        id_code: '0',//证件类型
            // id_no: '411521199612205367',//证件号码
            // name: 'haxx', //姓名
            // sex: '0',//性别
            // telephone: '15026864009',//手机号
            // street_add: '12312',//街道地址
          // this.get_card_code(row)
        },
        //重新选房价码的时候，重新选房价
        clearMaseterBase(){
          for(var item of this.preBillParam.reserve_rate){
            item.room_price = ''//重新选择房价码
          }
        },
        flushRateCode(){
          this.preBillParam.reserve_base.rate_code = ''
          this.preBillParam.reserve_base.code_src = ''//置空
          // if(this.preBillParam.reserve_base.rsv_type === 1){
          //   this.rateCodeValue = 'BAR'
          //   this.clearMaseterBase()
          // }else if (this.preBillParam.reserve_base.rsv_type != 0 && this.preBillParam.reserve_base.rsv_type != 1){
          //   this.clearMaseterBase()
          // }
          if(this.preBillParam.reserve_base.code_src == 'HY' || this.preBillParam.reserve_base.code_market == 'XYGS'){
            this.clearMaseterBase()
          }else{
            this.rateCodeValue = 'BAR'
          }
          this.infoShow = ''//置空操作
        },
        //获取指定会员计划，会员等级的价码信息 废弃
        get_card_code(row){
          let that = this
          let url = that.api.api_member_9102+ '/v1/' + `customer/member/get_card_code/`
          let scopeParam ={
            card_type:  row.card_type,
            card_level: row.card_level,
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let temp = res.data.data.results
            let rateValue = temp.find(item=>item.extra_item === 'rate_code')
            if(this.preBillParam.reserve_base.rsv_type === 0){
              this.rateCodeValue = rateValue.extra_item_value
            }
            }).catch(error=>{
          })
        },
        //协议单位查询
        getUnitList(){
          let that= this
          let url = that.api.api_member_9102+ '/v1/' + 'customer/company/get_company_base_list/'
          let param = {
            sys_cat__in: 'A,C'
          }
          that.$axios({
            method: 'get',
            url: url,
            params: param
          }).then(res=>{
            util.hintInfo(this,'success', '查询成功！');
            that.centerRoomList = res.data.data.results
          })
        },
        //订房中心查询(OTA)
        getCenterRoomList(){
          let that= this
          let url =  that.api.api_member_9102+ '/v1/' + 'customer/company/get_company_base_list/'
          let param = {
            sys_cat: 'S'
          }
          that.$axios({
            method: 'get',
            url: url,
            params: param
          }).then(res=>{
            util.hintInfo(this,'success', '查询成功！');
            that.centerRoomList = res.data.data.results
          })
        },
        //扫码枪触发查询
        getcardInfo(){
          console.log('触发')
          this.getCardMemberList()
        },
        //暂时 置空操作
        resetNull(param){
          if(param === 'name'){
            this.cardParam.number = ''
            this.cardParam.card_no = ''
          }else if(param === 'number'){
            this.cardParam.name = ''
            this.cardParam.card_no = ''
          }else{
            this.cardParam.name = ''
            this.cardParam.number = ''
          }
        },
        getCardMemberList(){
          let _this = this
          // let url = _this.api.api_member_9102+ '/v1/' + `customer/member/get_card_base_list/`
          let card_name__contains = _this.cardParam.name
          let id_no__contains = _this.cardParam.number
          let card_no__contains = _this.cardParam.card_no
          let url
          if(_this.cardParam.name){
            url = _this.api.api_member_9102+ '/v1/'  + `customer/member/get_card_base_list/?card_name__contains=` + card_name__contains
          }else if(_this.cardParam.number){
            url = _this.api.api_member_9102+ '/v1/'  + `customer/member/get_card_base_list/?id_no__contains=` + id_no__contains
          }else if(_this.cardParam.card_no){
            url = _this.api.api_member_9102+ '/v1/'  + `customer/member/get_card_base_list/?card_no__contains=` + card_no__contains
          }else{
            url = _this.api.api_member_9102+ '/v1/'  + `customer/member/get_card_base_list/`
          }
          _this.$axios({
            method: 'get',
            url: url
          }).then(res=>{
            if (res.data.message == "success") {
              // util.hintInfo(this,'success', '查询成功！');
              if (res.data.data.results.length) {
                 _this.cardBaseList = res.data.data.results;
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
                }else{
                  _this.cardBaseList = []
                }
              }else{
                _this.$message.error("请求服务器失败，稍后重试");
              }
          }).catch(error => {});
        },
        //清空重置对象或数组的数据
        flushData(){
          this.preBillParam.reserve_rate = [{
            max_live_num: '',
            can_live_num: '',//add
            room_type_code: '',//房型名称对应ID
            room_type: '',//房型名称
            room_class: '',
            room_number: null,//房间数几间 数组变字符串
            dynamic_roomNumber: [],//动态房间号=》应是一个数组
            // ['111', '222', '333','444', '555','666', '777']
            ratecode_id: null,//房价码
            room_price: '',
            room_count: '1',//房间数量=add=
            roomPrice: '', //总价钱=add=
            // code: '123',
            // room_type_code: '123',
            // descript: '123',
            // descript_en: '123',

            // list_order: 123,
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
            room_number: null,//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // room_type_code: '77777',
            // descript: null,
            // descript_en: null,

            // list_order: 1,
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '',
            nation: null,
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_id: null,
            company_na: '',
            pic_photo: null,
            pic_now: null,
            remark: '',
            is_anonymo: false,
            weixin: '',
            mobile: null,
            email: '',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            reserve_base_id: '',
            guest_id: 0
          }]
        },
        closeAndFlushData (){
          this.rateCodeValue = 'BAR'
          this.span_input_flag = false
          this.infoShow = ''
          this.preBillParam.reserve_base.rsv_type = 1,//预定类型
          this.preBillParam.reserve_base.rsv_person_name = '',//预定人姓名
          this.preBillParam.reserve_base.telephone_master= '',//预定人电话
          this.preBillParam.reserve_base.leave_time = [new Date(), moment(new Date()).add(+1,'days').format('YYYY-MM-DD 14:00:00')]
          this.flushData()
          this.flush_reserveGurst()
        },
        senToParent(){
          this.$emit('listenToPreview', '已经预定了')
        },
        //计算价钱总数
        mountMoney(param){
          console.log('param',param)
          if(param.can_live_num != ''){
            if(param.room_count > param.can_live_num){
              this.$message.warning('不能超过房间可选数!')
              param.room_count = 0
              return false
            }
          }
          this.countMoney = 0 //此处必须重新申明值为0避免全局变量的影响
          for(var item of this.preBillParam.reserve_rate){
            this.countMoney = this.countMoney + this.houseType_priceValue_1 * item.room_count
          }
        },
        //预订单=>确认预定 ===>光是预定
        confirmPreview(){
          this.isLoading = true
          console.log('enter 预定')
          if(!this.validatePreviewData() || !this.validatePreData()){
            this.isLoading = false
            return false
          }else{
            // this.enterPreviewDialog = true //入预付
            this.postPreview()
            // this.openAccount() //直接开帐
          }
        },
        /**先开帐 只把消费明细传进去 */
        openAccount(){
          this.isAccout = false
          this.addAccount() //1.先开帐
          this.getIncomingAccount()//入账代码
          setTimeout(() => {
            this.getInfoByAccount() //2.根据主账查看消费明细 ===>然后根据消费明细付款
            this.toUpdateCarryPayInfo() //把accountID传入进去 注意 此时情况为预定必然开帐
          }, 500);
        },
        /**
       * 根据账务id得到主账信息(查询预定的时候负的钱以及其他)
       */
        getInfoByAccount(){
            let id = this.return_accountParam_1.id
            let that = this
            let param ={
              with_collections: 1,
              related_objects: 1
            }
            let url= that.api.api_9022_9519+ '/v1/' +  `finance/account/get_info/` + id
            that.$axios({
            method : 'get',
              url : url,
              params: param
          }).then(res=>{
              this.accoutInfoById_param = res.data.data
              for(var item of this.accoutInfoById_param.charge_details){
                for(var itemm of this.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
              // this.accoutInfoById_param.charge_details = [{
              //   id: '1',
              //   name: '值',
              //   charge_amount: '100'
              // },{
              //   id: '2',
              //   name: '值2',
              //   charge_amount: '105'
              // },{
              //   id: '3',
              //   name: '值3',
              //   charge_amount: '95'
              // }]
            }).catch(error=>{
            })
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
         * 不同形式下的收款
         * 收钱时<===>前提没有主账户的时候就创建一个主账户
         */
        getMoney(){
          if(this.collectionChargeData.length === 0){
            this.$message.warning('请先选择消费明细!')
            return
          }
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
          let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_by_charges`
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
         * 新建预定不用 这个接口放弃
         * 付钱的时候
         * 增加支付记录
         */
        addPayDetail(){
          // this.account_param.charge_details = [{
          //   code_income_type_id: 15,
          //   reference_id: '121',
          //   charge_amount: 100,
          // }]
          //开始处理数据
          this.payDetail_param.account_ids = [1]
          this.payDetail_param.account_ids = JSON.stringify(this.payDetail_param.account_ids)
          this.payDetail_param.charge_details = JSON.stringify(this.payDetail_param.charge_details)
          this.payDetail_param.pay_amount = this.countMoney
          this.payDetail_param.pay_mode_id = this.payModeValue
          this.payDetail_param.pay_status = 0//	支付状态 ,0:正常、1：已取消、2、已退款 3：异常
          this.payDetail_param.pay_reason_id = this.payReasonValue

          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/add`
          let scopeParam = that.payDetail_param
          that.$axios.post(url,scopeParam).then(res=>{
            this.$message.success('增加支付记录成功!')
          }).catch(error=>{

          })
        },
        /**
         * 付款支付方式接口
         */
        getPayMode(){
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_mode/info_list`
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
          let url= that.api.api_9022_9519+ '/v1/' + `finance/code_pay_for/info_list`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payInfoList = res.data.data.list
          }).catch(error=>{
          })
        },
        //开帐 ====>增加一个(主)账户 需要消费的时候等
        addAccount(){
          //消费明细 暂时这样
          this.account_param.charge_details = [{
            // code_income_type_id: this.preBillParam.consumeInfoList[0].code_income_type_id,
            code_income_type_id: 11,//入账代码=>代表食品
            reference_id: '121',
            // charge_amount: this.preBillParam.consumeInfoList[0].price,
            charge_amount: this.countMoney,//此处应该是预计收款总额
          }]
          this.account_param.charge_details = JSON.stringify(this.account_param.charge_details)
          //支付明细 开帐的时候传的值为空
          // this.account_param.pay_detail = {
          //   // pay_amount: this.payMoney, //支付金额
          //   pay_mode_id: this.payModeValue, //支付方式
          //   account_type: 0,
          //   code_pay_for_id: 5,
          //   in_or_out: 'in',
          //   cashier: 9, //	收银点id某些类型的付款没有这一项.
          // }
          // this.account_param.pay_detail = JSON.stringify(this.account_param.pay_detail)
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/account/add`
          let scopeParam = that.account_param
          that.$axios.post(url,scopeParam).then(res=>{
            this.return_accountParam_1 = res.data.data
            this.$message.success('创建账户成功')
          }).catch(error=>{

          })
        },
        /**
         * 携带创建账户的信息然后传递给预定相关的表
         */
        toUpdateCarryPayInfo(){
          let that = this
          let url= that.api.api_bill_9202 + '/v1/' + `booking/update_reserve_base/`
          let reserve_base = {}
          let scopeParam = {
            reserve_base : {
              rsv_status_lable: 0,//订单状态
              account_opened: 1,
              last_account_id:  this.return_accountParam_1.id,
              // total_chartge: this.return_accountParam.total_consumption,//总消费 //
              total_chartge: this.countMoney,//总消费 //
              total_pay:  this.payMoney,//总付款
              account_id: this.return_accountParam_1.id,
              order_no: this.returnPreviewParam.order_no
            }
          }
          that.$axios.post(url,scopeParam).then(res=>{
            }).catch(error=>{
          })
        },
        //处理预授权=打开预授权界面
        handleAuthorization(){
          // this.authorizationParam.mainAccount_id='222'
          // console.log('this.authorizationParam父级传递',this.authorizationParam)
          console.log('this.mainAccount_id传过来的主账id===联房的时候为主账房id',this.mainAccount_id)
          let mainAccountId = this.mainAccount_id
          localStorage.setItem('mainAccountId',mainAccountId) //通过缓存弄暂时
          this.authorizationDialog = true;
        },
        //update_account_id
        /***
         * 这里时rj版本,垃圾代码可忽略
         * @param 主账户id Object.values(this.returnPreviewParam.account_id.master)
         */
        resloveAccountId(){
          let that = this
          console.log('this.returnPreviewParam.account_id.master',this.returnPreviewParam.account_id.master)
          this.mainAccount_id = Object.values(this.returnPreviewParam.account_id.master)[0] //获取唯一账户id
          console.log('this.mainAccount_id',this.mainAccount_id)
          this.handleAuthorization()//打开预授权界面
        
        },
        postPreview : _.debounce(function () {
          let that = this
          // let url= 'http://192.168.2.165:9005' + '/v2/' + `booking/add_reserve/`
          let url = that.api.api_newBill_9204 + `/v2/booking/add_reserve/`
          // let url= that.api.api_bill_9202 + '/v1/' + `booking/add_reserve/`
          // let url= 'http://172.168.3.206:9005' + '/v1/' + `booking/add_reserve/`
          // let url= that.UrLHeader_bill + `booking/add_reserve/`
          console.log('urlssss',url)
          console.log('that.preBillParam',that.preBillParam)
          for(var item of that.preBillParam.reserve_rate){
            if(!String(item.room_price)){
              this.$message.warning('请选择房价码!')
              return
            }
          }
          //当为false的时候就没有入住人
          let scopeParam = _.cloneDeep(that.preBillParam)
          scopeParam = this.handleDeleteAttribute(scopeParam)
          console.log('is_addlive',this.is_addlive)
          if(this.is_addlive == false ){
            scopeParam.reserve_guest = [] //删掉这个空对象
          }
          console.log('scopeParam',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message === 'success'){
              this.isLoading = false
              that.returnPreviewParam = res.data.data
              console.log('...zhanghu...',res.data)
              console.log('this.returnPreviewParam===>预定返回得加上account_ID',this.returnPreviewParam)
              try {
                console.log(',,,,,,,,')
                that.$confirm('是否添加预授权?','提示',{
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(()=>{
                  console.log('jinrururuuru')
                  that.resloveAccountId()//更新主账户
                  this.flushByPreview()
                  this.previewFormVisible = false
                  // this.handleAuthorization()//打开预授权界面
                }).catch((error)=>{
                  this.flushByPreview()
                  console.log('jinrururuuru========')
                  this.previewFormVisible = false
                  // this.$message.error('后台错误!')
                  console.log('关闭')
                })
                } catch (error) {
                console.log('error')
              }
              this.isLoading = false
              that.$message.success('预定成功!')
            }else{
              this.isLoading = false
              that.$message.warning(res.data.message)
            }
            console.log('res结果',res)
            }).catch(error=>{
              this.isLoading = false
          })
        },300),
        //预定成功后刷新房态图
        flushByPreview(){
          this.$emit('listenToPreview', '已经预定了,更新房态图')
        },
        //传入后台去掉多余属性 更改值
        handleDeleteAttribute(param){
          param.reserve_base.arr_time = moment(param.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          param.reserve_base.leave_time = moment(param.reserve_base.leave_time[1]).format('YYYY-MM-DD 14:00:00')
          // reserve_rate
          for(var item of param.reserve_guest){
              delete item.liveCount
          }
          for(var item of param.reserve_rate){
            item.room_number = item.dynamic_roomNumber.join(',')
            delete item.max_live_num
            delete item.can_live_num
            // delete item.room_type_code   房型code
            delete item.dynamic_roomNumber
            // delete item.room_count
            delete item.roomPrice
            delete item.visible
          }
          return param
        },
        datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
          var date1 = new Date(sDate1)
          var date2 = new Date(sDate2)
          var s1 = date1.getTime(),s2 = date2.getTime();
          var total = (s2 - s1)/1000;
          var day = parseInt(total / (24*60*60));//计算整数天数
        let flag_Day = moment().format('YYYY-MM-DD')
          let flag_startDay = `${flag_Day} 00:00:00`
          let flag_endDay = `${flag_Day} 14:00:00` 
          console.log('flag_startDay',flag_startDay)
          console.log('flag_endDay',flag_endDay)
          console.log(day,'天数')
          if((sDate1<flag_endDay && sDate1>flag_startDay) && (sDate2<flag_endDay && sDate2>flag_startDay)){
            console.log('进入1')
             day = 0
            return day
          }else if((sDate1<flag_endDay && sDate1>flag_startDay) && (sDate2>flag_endDay)){
            console.log('进入2')
            if(day === 0){
              day = 1
            }else if(day == 1){
              day = day
              console.log('day...1',day)
            }else{
              day = day
            }
            console.log('day...2',day)
            return day
          }else{
            console.log('进入3')
            if(day === 0){
              day = 1
            }else if(day == 1){
              day = day
              console.log('day...1',day)
            }else{
              day = day
            }
            console.log('day...2',day)
            return day
          }
          // var dateSpan,
          // tempDate,
          // iDays;
          // sDate1 = Date.parse(sDate1);
          // sDate2 = Date.parse(sDate2);
          // console.log('sDate2',sDate2,'sDate1',sDate1)
          // dateSpan = sDate2 - sDate1;
          // console.log('dateSpan',dateSpan)
          // dateSpan = Math.abs(dateSpan);
          // iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          // console.log('iDays',iDays)
          // return iDays
        },
        //选择房型一行房型相关信息
        getRoomInfo(){
          // this.getRoomType() //准备:循环得到匹配的房型中文名
          let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD')
          let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD')
          let that = this
          // let url =  that.api.api_newPrice_9107 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
          let url =  that.api.api_newPrice_9107 + '/v1/' + 'room/room_status/can_live_room_type_num/'
          that.$axios({
            url : url,
            method : 'get',
            params:{
              biz_date__gte: start,
              biz_date__lt: end
            },
          }).then(res=>{
          if(res.data.message === 'success'){
              that.roomInfoList = res.data.data.data
              // let start = '2019-04-06'
              // let end =  '2019-04-09'
              // for(var item of that.roomInfoList){
              //   for(var itemm of that.roomTypeList){
              //     if(item.room_type === itemm.code){
              //       item.room_type_name = itemm.descript
              //       // item.can_live_num = item.can_live_num
              //     }
              //   }
              // }
            // that.roomInfoList = _.uniqBy(that.roomInfoList,'room_type') //过滤具有相同属性的数组对象
            // console.log('that.roomInfoList2',that.roomInfoList)
          }else{
              that.$message.error('获取房型信息列表失败!')
          }
          }).catch(error=>{
          })
        },
        getCanLiveRoom(param){
          let start = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          let that = this
          let url= that.api.api_newPrice_9107 + '/v1/' + `room/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: param,
            start_time: start,
            end_time: end
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
        //获取code对应房型数据
        getRoomType(){
          let that = this
          let url = that.api.api_newPrice_9107+ '/v1/' + `room/room_status/get_room_type_list/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomTypeList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        //得到房间所对应的标签
        getTagByRoom(){
          let that = this
          let url = that.api.api_room_8091+ '/v1/' + `room/get_roomfeatures_list_tree/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
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
          let url = that.api.api_newPrice_9107 + '/v1/' + 'room/room_status/get_room_occupy_list/'
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
          console.log('preBillParam.reserve_rate"',this.preBillParam.reserve_rate)
          console.log('item一行数据preview',item)
          if(item.room_type === ''){
            this.$message.warning('请先选择房型!')
            return false
          }else{
            // this.getTagByRoom()//得到房间对应标签
            this.getCanLiveRoom(item.room_type_code) //根据房型选未占用房间
            // this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
            // this.getRoomOccupy()//得到房间占用
            // this.getRoomList(item)
            this.can_live_number = item.can_live_num//可预定数
            this.pre_live_number = item.room_count//选择的数
          }
          //开始置空
          this.sortNumber = 0; this.noSortNumber = 0
          this.switchValue = '0'
          this.switchNumberDialog = true;
          this._room_type = item.room_type_code
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
        //自动排房
        selfSelectHouse(val){
          // console.log('this.multipleSelection',this.multipleSelection)
          // if(this.multipleSelection.length>0){
          //   this.$message.warning('已经排房!')
          //   this.switchValue = '0'
          //   return false
          // }
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
        //单=》右边全选房号dialogtabel 并控制不可选房间号
        handleselectAll(selection){
          // if(this.can_live_number > this.pre_live_number){
            if(selection.length > this.pre_live_number){
              let indexNumber = selection.length - this.pre_live_number
              selection.splice(this.pre_live_number,indexNumber)//截取最大可选数的房间从数组可选数最大长度开始截取
              this.multipleSelection = selection //截取后的值
            }
          // }
        },
        //单=》右边选房号dialogtabel 并控制不可选房间号
        handleselect(selection, row){
          this.multipleSelection = selection;
          //可订数大于自选的入住数
          let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引 即行数
          // if(this.can_live_number > this.pre_live_number){
            if(this.multipleSelection.length > this.pre_live_number){
              this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
              this.$message.warning('不能超过该房间类型的可选数!')
            }
          // }
          // this.rowIndex.push(index)
          localStorage.setItem('mulSelection',JSON.stringify(this.multipleSelection));
          localStorage.setItem('rowIndex',JSON.stringify(this.rowIndex));
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
          for(var item of this.preBillParam.reserve_guest){
            item.room_number = ''
          }
          this.switchValue = '0'
          let _room_type = this._room_type
          let index = _.findIndex(this.preBillParam.reserve_rate,function(o){return o.room_type_code == _room_type})
          let array = []
          for(var item of this.multipleSelection){
            array.push(item.room_no)
          }
          array = array.filter(item=>item != undefined) //需要过滤
          this.preBillParam.reserve_rate[index].dynamic_roomNumber = array
        },
        //入住人可选房间号==>基于选择房型的
        getEnter_RommNumber(){
          let array = []
          let array3 = []
          if(this.liveoptions_NoChange.length > 0){
            this.flag = true
            this.liveoptions = this.liveoptions_NoChange
          }else{
            this.flag = false
            for(var item of this.preBillParam.reserve_rate){
              array.push({
                roomNO: item.dynamic_roomNumber,
                max_live_num: item.max_live_num
              })
            }
            let array2 = this.expandArrayData(array)
            // let array2 = array.roonNO.reduce(function (a, b) { return a.concat(b)}) //二维数组变为一组
            //组装数组
            for(var item of array2){
             array3.push({
               roomNo: item.roomNO + '',
               max_live_num: item.max_live_num,
               liveCount: '0'
             })
            }
          }
          this.liveoptions = array3
          this.flag === true ? this.liveoptions_Value = this.liveoptions_NoChange : this.liveoptions_Value = this.liveoptions
        },
      //展开数据
      expandArrayData(param){
        let newParam = [];
        param.map((p) => {
          p.roomNO.map((n) => {
            newParam.push({
              roomNO: [n],
              max_live_num: p.max_live_num,
            })
          })
        });
        return newParam
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
        selectLive(param){
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
          for(var item of this.liveoptions){
            for(var itemm of this.cardList)
            if(item.roomNo === itemm.room_no){
              if(item.liveCount>itemm.max_can_live_num){
                param.room_number = '' //当前置空操作，当超过最大max人数时,置空
                this.$message.warning('不能超过该房间允许最大入住人数!')
                return false
              }

            }
          }
          // //这个暂时这样判断
          // for(var item of this.liveoptions){
          //   if(item.liveCount  > item.max_live_num){
          //     // this.$message.warning('不能超过该房间下的最大可入住数')
          //     return
          //   }
          // }
          // this.liveoptions_NoChange = this.liveoptions
          // let index = _.findIndex(this.preBillParam.reserve_guest,function(o){return o.room_number == row})
        },
        //获取cardList==>获取基本信息
        getCardListInfo(){
          let that = this
          // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
          // let url = that.UrLHeader + 'room/get_roomnumber_list/'
          let scopeParams = {
            page : 1,
            page_size : 300,
            room_state: this.selectParam,
            building_name: that.building_value,
            floor_number: that.floor_value,
            room_type_name: that.roomType_value, //ex:大床房暂时
            room_no: that.room_no_value
          }
          let params = util.deleteNullParam(scopeParams)//删除对象里属性值为空的属性
          let url = that.api.api_newPrice_9107 + '/v1/' + `room/room_status/get_room_map_list/?page_size=1000`
          that.$axios({
            method : 'get',
              url : url,
              params: params
          }).then(res=>{
            if(res.data.message === 'success'){
              that.cardList = res.data.data.results
            }else{
              that.$message.error('获取列表失败!')
            }
          }).catch(error=>{
          })
        },
        //获取楼层列表option
        //增加入住人
        addSelect_2(){
          let enterValue = {
            liveCount: 0,//可选数
            room_number: null,//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // room_type_code: '77777',
            // descript: null,
            // descript_en: null,

            // list_order: 1,
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '',
            nation: null,
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_id: null,
            company_na: '',
            pic_photo: null,
            pic_now: null,
            remark: '',
            is_anonymo: false,
            weixin: '',
            mobile: null,
            email: '',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            reserve_base_id: '',
            guest_id: 0
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
        //增加选择框新建预定单里
        addSelect(){
          let room_type = {
            can_live_num: '',//add
            room_type_code: '',//房型名称对应ID
            room_type: '',//房型名称
            room_class: '',
            room_number: null,//房间数几间 数组变字符串
            dynamic_roomNumber: [],//动态房间号=》应是一个数组
            // ['111', '222', '333','444', '555','666', '777']
            room_price: '',
            ratecode_id: null,//房价码
            room_count: '1',//房间数量=add=
            roomPrice: '', //总价钱=add=
            // code: '123',
            // room_type_code: '123',
            // descript: '123',
            // descript_en: '123',
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
          this.preBillParam.reserve_rate.push(room_type)
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
          if(this.preBillParam.reserve_rate.length>1){
          if(this.preBillParam.reserve_rate.length ===2){
              this.showDeleteButton = false
          }
          this.preBillParam.reserve_rate.splice(index, 1)
          }else{
          this.showDeleteButton = false
          return
          }
        },
        //关闭tag
        handleClose(item,tag) {
          console.log('item==',item,tag)
          if(item.dynamic_roomNumber.length>0){
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
          }
          item.room_count =item.room_count - 1 //同步数据===>去掉同步计数此时的以后可能改
          for(var itemm of this.preBillParam.reserve_guest){
            itemm.room_number = ''
          }
          this.getEnter_RommNumber() //此时作用便于联房判断数据
        },
        //验证预定数据
        validatePreviewData(){
          //判断选择房型为空时
          for(var item of this.preBillParam.reserve_rate){
            if(item.room_type === '' || item.room_type === null){
                this.$message.warning('请选择房型!')
                return false
            }
            if(item.room_count === 0){
              this.$message.warning('请选择房间数!')
              return false
            }
            if(this.is_addlive === true){
              let array = []
              for(var item of this.preBillParam.reserve_guest){
                array.push(item.id_no)
              }
              if(new Set(array).size != array.length){
                this.$message.warning('不能有重复的身份证号!')
                return false
              }
              for(var item of this.preBillParam.reserve_guest){
                if(item.telephone !=''){
                  util.validateTelNumber(item.telephone,'请输入正确手机格式',this)
                }
                // util.validateBlank(item.id_no,'身份证是必填项',this)&&
                if(item.id_no){
                  util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
                }
              }
            }else{
              return true
            }
          }
          return true
            //有入住人的时候
        },
        validatePreData(){
          return (
            util.validateBlank(this.preBillParam.reserve_base.rsv_person_name, '预定人是必填项', this)&&
            util.validateBlank(this.preBillParam.reserve_base.telephone_master,'联系电话是必填项',this)&&
            util.validateTelNumber(this.preBillParam.reserve_base.telephone_master,'请输入正确手机格式',this)&&
            util.validateBlank(this.preBillParam.reserve_base.rsv_type,'请选择预定类型',this)&&
            util.validateBlank(this.preBillParam.reserve_base.rsv_lable,'请选择预定标签',this)&&
            // util.validateBlank(this.preBillParam.reserve_base.code_market,'请选择客户来源',this)&&
            util.validateBlank(this.preBillParam.reserve_base.code_src,'请选择来源码',this)&&
            util.validateBlank(this.preBillParam.reserve_base.code_market,'请选择市场码',this)&&
            util.validateBlank(this.preBillParam.reserve_base.rate_code,'请选择房价码',this)
          )
        },
        //预定=》获取早餐list
        getBreakfastList(){
          let that = this
          // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
          let url = that.api.api_newPrice_9107 + '/v1/' + 'room/rate_code/get_breakfast_list/'
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
          this.preBillParam.consumeInfoList = msg.consumeInfoList
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
          let index = _.findIndex(this.preBillParam.remarkList,function(o) { return o.time == row.time}) //扎到索引
          this.preBillParam.remarkList.splice(index,1)//删除指定索引
        },
        //预订单=》新增备注
        add_remark(){
         if(this.remarkContent_value){
            this.preBillParam.reserve_base.remark_id_list =  this.remarkContent_value
            this.addAndUpdate_remarkDialog = false
            // let that = this
            // let id = that.remark_id
            // let url = that.api.api_9022_9519+ '/v1/' + `finance/account_tip/add`
            // let scopeParam ={
            //   account_id: that.preBillLinkParam.account_id,
            //   content: that.remarkContent_value
            // }
            // that.$axios.post(url,scopeParam).then(res=>{
            //   if(res.data.message==='success'){
            //     that.remarkDialog = false
            //     that.getRemarkInfo()
            //   }
            //   console.log('resss',res.data)
            // }).catch(error=>{
            // })
          }else{
            this.$message.warning('请输入备注信息')
          }
        },
        //获取预订单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
          console.log('itemmm',item)
          //点击时判断不能重复选择房型
          if(String(item.room_price)){
            let indexs = _.findIndex(this.preBillParam.reserve_rate,function(o){return o.room_type_code == param.room_type})
            if(indexs >= 0){
              this.$message.warning('请不要重复选择!')
              return
            }
          }
          if(item.dynamic_roomNumber.length>0){
            item.dynamic_roomNumber = []//清空 以便于更新数据用
          }
          this.getRateCode(item,param)
          item.max_live_num = param.max_live_num
          item.can_live_num = param.can_live_num
          item.room_type = param.room_type_desc
          item.room_type_code = param.room_type
        },
        /**
         * 根据房型获得未来一周之内的房型
         * @1构造未来七天的时间为一个数组dataArray
         * @2构造相应时间的对应房价也为一个数组rateArray
         * @3可合并为一个数组
         */
        getRateInfo(item){
          let dateArray = []
          for(var i = 0; i < 7; i++){
            dateArray.push(moment(new Date()).add(i,'days').format('YYYY-MM-DD'))
          }
          this.getRateCodeMore(item)
          // moment(new Date()).add(1,'days').format('YYYY-MM-DD')
        },
        getRateCodeMore(item){
          let that = this
          let url = that.api.api_newPrice_9107 + '/v1/' +  `room/rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(7,'days').format('YYYY-MM-DD'),
            room_type_list: [item.room_type_code]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let temprate = res.data.data.price
            let key1 = item.room_type_code //英文code
            let temprateValue = temprate[key1]
            let rateObj = temprateValue
            let keys = []
            let values = []
            for(var key in rateObj){
              keys.push(key)
            }
            for(var key in rateObj){
              values.push(rateObj[key])
            }
            keys.pop()
            values.pop()
            this.rateDateList = keys
            this.rateValueList = values
            }).catch(error=>{
          })
        },
        //根据房型得到对应房价码
        getRateCode(item,param){
          let that = this
          let url = that.api.api_newPrice_9107 + '/v1/' +  `room/rate_code/get_rate_code/`
          // let temp = []
          // temp.push(param.room_type)
          // this.preBillParam.reserve_base.rsv_type
          let scopeParam ={
            rate_code: that.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
            room_type_list: [param.room_type]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res.data.data',res.data.data)
            console.log('房价码==单独',res.data.data)
            console.log('res.data.data.check_out_time',res.data.data.check_out_time)
            let time = res.data.data.limit.check_out_time
            //第一次进入
            if(this.changeTime === false){
              this.preBillParam.reserve_base.leave_time =[new Date() ,moment(new Date()).add(+1,'days').format('YYYY-MM-DD' + ' ' + time)]
            }
            let temprate = res.data.data.price
            let key1 = param.room_type
            let temprateValue = temprate[key1]
            let key2 = moment(new Date()).format('YYYY-MM-DD') //对象嵌套对象里的key值
            that.houseType_priceValue_1 = temprateValue[key2]
            item.room_price = that.houseType_priceValue_1
            }).catch(error=>{
          })
        },
        //时间控件确定改变后
        haveChangeTime(data){
          this.changeTime = true//改变了
          console.log('shijian改变',data)
        },
        //预订单获取对应房类型
        getHouseTypePrice(item,index){
          console.log('item',item)
          // item.room_type = value
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.reserve_rate[index].room_type = value//替换
          // console.log('this.preBillParam.reserve_rate',this.preBillParam.reserve_rate)
        },
        // getMarket(param){
          //   let that = this
        //   let url =  that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_sys_list'
        //   let params = {
          //    parent_code: param == 'market' ? 'market_code' : 'src_code'
        //   }
        //   that.$axios({
          //     method : 'get',
        //         url : url,
        //         params: params
        //     }).then(res=>{
          //       that.marketSrcList = res.data.data.results
        //     }).catch(error=>{
          //   })
        // },
        //市场码来源码
        getMarketSrc(param){
          console.log('param-------',param)
          let that = this
          this.preBillParam.reserve_base.rate_code = ''//置空房价码
          that.marketSrcList = []
          let url =  that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_sys_list/'
          let params = {}
          //src 代表市场码
          if(param == 'market'){
           params={
            parent_code: 'market_code'
           }
          }else if(param == 'src'){
            if(this.preBillParam.reserve_base.code_market){
                params={
                  parent_code: 'src_code',
                  code_category: that.preBillParam.reserve_base.code_market //要改
                  // code_category: 6977
              }
            }else{
              this.$message.warning('请先选择市场码!')
              return
            }
          }
          console.log(params)
          that.$axios({
            method : 'get',
                url : url,
                params: params
            }).then(res=>{
              that.marketSrcList = res.data.data.results
              console.log('that.marketSrcList',that.marketSrcList)
            }).catch(error=>{
          })
        },
        //入账代码
        getIncomingAccount(param){
          let that = this
          let url =  that.api.api_9022_9519+ '/v1/' + 'finance/incoming_account_code/info_list?page_size=999'
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              that.incomingAccoutList = res.data.data.list
              console.log('that.incomingAccoutList',that.incomingAccoutList)
            }).catch(error=>{
          })
        },
        //请求字典项
        get_code_list() {
          this.get_card_setting_tree(); // 请求会员计划\会员等级数据
        },
        // 请求会员计划\会员等级数据
        get_card_setting_tree() {
          // this.CardTypeTree=this.get_select_class('get_card_setting_tree');
          //设置请求路径
          let url = this.api.api_member_9102+ '/v1/' + "customer/member/get_card_setting_tree/?code_type=MB",
            _this = this;
          // 发送请求:将数据返回到一个回到函数中
          // 并且响应成功以后会执行then方法中的回调函数
          _this.$axios
            .get(url)
            .then(function(res) {
              if (res.data.message == "success") {
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
  /* .houseTypeClass>>> .el-dialog__body{
    background-color: #eaedf2;
  } */
  .houseTypeClass.deletePadding_Class>>> .el-dialog__body{
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
  .room_pop>>> .el-popover{
    padding: 0;
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
