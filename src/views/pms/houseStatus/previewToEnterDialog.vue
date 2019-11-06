<template>
    <div>
        <el-dialog width="70%" class="preview-enter-dialog" title="预定转入住"  :visible.sync="previewToEnterVisible"
          @close="$emit('update:show', false);closeAndFlushData()"
          :show="show">
          <el-row class="top-nav">
            <!-- rsv_type -->
            <!-- <span>客源:
              <span v-if="preBillParam.reserve_base[0].rsv_type === 0">非会员/会员</span>
              <span v-if="preBillParam.reserve_base[0].rsv_type === 1">散客入住</span>
              <span v-if="preBillParam.reserve_base[0].rsv_type === 2">团队入住</span>
              <span v-if="preBillParam.reserve_base[0].rsv_type === 3">订房中心/OTA</span>
              <span v-if="preBillParam.reserve_base[0].rsv_type === 4">协议单位</span>
            </span> -->
            <span>联系人:<span>{{preBillParam.reserve_base[0].rsv_person_name}}</span></span>
            <span>联系电话:<span>{{preBillParam.reserve_base[0].telephone_master}}</span></span>
            <span>订单号:<span>{{preBillParam.reserve_base[0].order_no}}</span></span>
          </el-row>
           <div class="wrap_div">
             <div>
               <ul>
                 <!-- <li>
                    入住类型:
                      <el-select disabled  v-model="preBillParam.reserve_base[0].rsv_type " style="width: 65%"  placeholder="请选择">
                        <el-option
                        v-for="item in previewTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>  
                    </el-select>
                 </li> -->
                 <li>
                    &nbsp;入住类型:
                    <el-select  v-model="preBillParam.reserve_base[0].rsv_lable" style="width: 65%"  placeholder="请选择">
                        <el-option
                        v-for="item in labelList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>  
                    </el-select>
                 </li>
                  <!-- <li>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市场码:
                      <el-select  disabled  v-model="preBillParam.reserve_base[0].code_market" style="width: 65%"  placeholder="请选择">
                          <el-option
                            v-for="item in marketSrcList"
                            :key="item.id"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>  
                      </el-select>
                  </li>
                  <li>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源码:</span>
                      <el-select disabled  v-model="preBillParam.reserve_base[0].code_src" style="width: 65%"  placeholder="请选择">
                        <el-option
                          v-for="item in marketSrcList"
                          :key="item.id"
                          :label="item.descript"
                          :value="item.code">
                        </el-option>  
                      </el-select>
                  </li> -->
                    <li>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;房价码:</span>
                      <el-select  v-model="preBillParam.reserve_base[0].rate_code"  style="width: 65%"   placeholder="请选择">
                      <el-option
                        v-for="(item,index) in rateCode_list"
                        :key="index"
                        :label="item.description"
                        :value="item.code">
                      </el-option>  
                    </el-select>
                  </li>
                 <!-- <li>
                   <el-col :span="24">
                      <span style="display: inline-block">入离时间:</span>
                      <el-date-picker style="width:75%" :disabled="changeTrue"  :picker-options="rangeDate"  :clearable ="false"
                        v-model="preBillParam.reserve_base[0].leave_time" type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
                      </el-date-picker> 
                      <span v-if="preBillParam.reserve_base[0].rsv_lable === 0">共 <span style="width: 80px">{{countDateRange}}</span> 晚</span>
                   </el-col>
                 </li> -->
               </ul>
             </div>
             <div style="width:100%;">
               <ul>
                 <li>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市场码:
                      <el-select  v-model="preBillParam.reserve_base[0].code_market" style="width: 40%"  placeholder="请选择">
                          <el-option
                            v-for="item in marketSrcList"
                            :key="item.id"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>  
                      </el-select>
                  </li>
                  <li>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源码:</span>
                      <el-select  v-model="preBillParam.reserve_base[0].code_src" style="width: 40%"  placeholder="请选择">
                        <el-option
                          v-for="item in marketSrcList"
                          :key="item.id"
                          :label="item.descript"
                          :value="item.code">
                        </el-option>  
                      </el-select>
                  </li>
               </ul>
             </div>
              <!-- <div>
                <div class="block" style="height: 200px; width: 410px; border: 1px solid #CCCCCC; margin-bottom: 10px">
                  <video id="video" style="display: left" width="200px" height="200px" autoplay="autoplay"></video>
                  <canvas id="canvas" style="display: right"  width="200px" height="200px"></canvas>
                </div>
                <el-button type="primary" size="mini" @click="getMedia()" >开启摄像头</el-button>
                <el-button type="primary" size="mini" @click="takePhoto()" >拍照上传</el-button>
              </div> -->
           </div>
           <el-row style="margin-top: 10px">
              <el-col :span="24">
                <span style="display: inline-block">入离时间:</span>
                <el-date-picker  :disabled="changeTrue"  :picker-options="rangeDate"  :clearable ="false"
                  v-model="preBillParam.reserve_base[0].leave_time" type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
                </el-date-picker> 
                <span v-if="preBillParam.reserve_base[0].rsv_lable === 0">共 <span style="width: 80px">{{countDateRange}}</span> 晚</span>
              </el-col>
           </el-row>
          <el-row style="margin-top: -10px">
            <!-- <el-col :span="18" class="elColMiddle" > -->
              <!-- 预抵时间:<el-date-picker style="width: 10vw" v-model="preBillParam.reserve_base[0].arr_time" type="date" placeholder="选择日期"> -->
              <!-- </el-date-picker>&nbsp;&nbsp; -->
              <!-- 入离时间: -->
              <!-- <el-date-picker :disabled="changeTrue" style="width: 18vw" :picker-options="rangeDate"  :clearable ="false"
                  v-model="preBillParam.reserve_base[0].leave_time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
              </el-date-picker> 
              共 <span style="width: 80px">{{countDateRange}}</span> 晚 -->
              <!-- 保留至:<el-date-picker style="width: 10vw" v-model="value2" type="date" placeholder="选择日期"></el-date-picker> -->
            <!-- </el-col> -->
          </el-row>
            <!-- 选择房型一行 -->
            <el-row  style="margin-top: 10px">
              <div v-for="(item,index) in preBillParam.reserve_rate" :key="index">
                <div  style="margin-top: 10px">
                    选择房型:
                    <el-popover placement="bottom-start" width="300" trigger="click" v-model="item.visible">
                    <!-- 选择房型名称 input框的在对应值 ex:大床房 -->
                    <el-input @focus="getRoomInfo()" :disabled="true"   style="width: 9.0vw" slot="reference" v-model="item.room_type"></el-input>
                    <!-- 选出房型弹出框=》右边弹出框 -->
                    <div v-show="showPop_right" class="romm_pop_right">
                        <div>
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; margin-top: 12px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">{{houseType_HeadValue}}</span>
                        </div>
                        <div style="height: 30px">
                            <!-- 右边展开项的数值 -->
                            <div @click="getHouseTypePrice(item,index); item.visible = false" class="romm_pop_right_behind">
                            <span>门市价</span>
                            <span>首日: <span style="color: #f3565d">{{houseType_priceValue_1}}</span></span>
                            </div>
                        </div>
                        </div>
                        <div>
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">权限价</span>
                        </div>
                        <div style="height: 30px">
                            <div @click="getHouseTypePrice(item,index)" class="romm_pop_right_behind">
                            <span>权限价</span>
                            <!-- <span>首日: <span style="color: #f3565d">￥80-￥100</span></span> -->
                            <span>首日: <span style="color: #f3565d">{{houseType_priceValue_2}}</span></span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <!-- 选出房型弹出框=》左边 -->
                    <div class="room_pop">
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">房型选择</span>
                        </div>
                        <ul class="popSelect_class">
                            <li v-for="(itemm,index) of roomInfoList" :key="itemm.id" @click="showPop_right=true; getHouseTypeNextValue(item,index,itemm)">
                                <span>{{itemm.room_type_name}}</span>
                                <span>可订数: {{itemm.can_live_num}}<span></span></span>
                            </li>
                        </ul>
                    </div>
                    </el-popover>
                    <span style="padding-left: 10px;" >房间数:</span> <el-input-number disabled @change="mountMoney"  v-model="item.room_count" :min="1"></el-input-number>
                    <!-- 预订单=>选房号 -->
                    <img @click="chooseNo(item,index)" style="margin-left: 2px; cursor: pointer;  position: relative; top: 15px;"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
                    <!-- 标签组=》即为房间数 -->
                    <div style="display: inline-block; width: 240px; height: 40px;">
                    <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber.slice(0,3)" closable  :disable-transitions="false" @close="handleClose(item,tag)">
                      {{tag}}
                    </el-tag>
                    <el-popover placement="right-start" width="200" trigger="click">
                      <div>
                        <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber">
                          {{tag}}
                        </el-tag>
                      </div>
                      <!-- 溢出的tag则显示在popover里面 -->
                      <span v-if="item.dynamic_roomNumber.length>3 ? showPoint = true : showPoint =false"  slot="reference" style="cursor: pointer; line-height: 40px;color: #378ff6; margin-left: 10px">...</span>
                    </el-popover>
                    </div>
                    <div style="position: relative; top: 20px; float: right; height: 30px">
                    <!-- 房间首日价 -->
                    <span style="margin-right: 20px">
                      <!-- 首日价<el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.room_price" style="color: #f3565d;width: 60px"></el-input>
                      <span v-show="!span_input_flag" @click="span_input_flag = true" style="color: #f3565d">{{item.room_price}}</span> /间 -->
                      <div v-if="String(item.room_price)" style="display: inline-block">
                        首日价<el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.room_price" style="color: #f3565d;width: 60px"></el-input>
                        <span v-show="!span_input_flag" @click="span_input_flag = true" style="color: #f3565d">{{item.room_price}}</span> /间
                      </div>
                      <div v-else style="display: inline-block">
                        <el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.room_price" style="color: #f3565d;width: 60px"></el-input>
                        <span v-show="!span_input_flag" @click="span_input_flag = true" style="color: #f3565d">请选择房价</span>
                      </div>
                    </span>
                    </div>
                </div>
              </div>
            </el-row>
            <el-row v-if="liveoptions_Value.length>1 || showlink">
              <span>选择主帐房:</span>
              <el-select clearable style="width: 9vw;margin-top: 20px" @focus="getEnter_RommNumber"  placeholder="入住房号"  v-model="previewEnterBill.room_no_value">
                <el-option
                  v-for="(item,index) in liveoptions_Value"
                  :key="index"
                  :label="item.roomNo"
                  :value="item.roomNo">
                  <span style="float: left">{{ item.roomNo }}</span>
                </el-option>  
              </el-select>
            </el-row>
            <!-- 入住人一行 -->
            <el-row style="margin-top: 10px;max-height: 300px;overflow: auto">
                <div  v-for="(item,index) in preBillParam.reserve_guest" :key="index" style="margin-top: 10px">
                <div style="diplay: inline-block">
                    <span style="padding-left: 14px">入住人:</span>
                    <el-select @change="selectLive(item)" @focus="getEnter_RommNumber" v-model="item.room_number" style="width: 9.8vw"  placeholder="房间">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span>{{ itemm.roomNo }}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">已住:{{ itemm.liveCount }}</span> -->
                      </el-option>  
                    </el-select>
                    <el-input  v-model.trim="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                    <el-select v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                      <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>  
                    </el-select>
                    <el-select v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                      <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>  
                    </el-select>
                    <el-input  v-model.trim="item.id_no"  maxlength="18" @blur="validateId_no(item,'输入')"  placeholder="证件号码"  style="width: 12vw"></el-input>
                    <el-input  v-model.trim="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                </div>
                <div style="display: inline-block">
                  <el-input  v-model.trim="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 5vw; margin-top: 10px"></el-input>
                    <el-button type="danger" @click="handlePicture(item,index)">上传照片</el-button>
                </div>
                <!-- 预定房间入住人多选 +-->
                <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </el-row>
            <!-- <el-row style="margin-top: 20px">
              是否联房<el-switch style="margin-left: 5px"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch> 
              <el-select  v-model="temp_value" style="width: 10vw;margin-left: 10px"  placeholder="选主账房">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>  
                </el-select>
            </el-row>
            <el-row style="margin-top: 20px">
              免费升级<el-switch style="margin-left: 5px"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch> 
            </el-row> -->
            <el-row style="margin-top: 120px">
                <img style="cursor: pointer; display: inline-block; margin-bottom: -19px" @click="cardImport" src="../../../assets/images/pms/houseStatus/cardImport.png">
                <!-- <el-button style="height: 50px; width: 150px; margin-left: 12px" type="info">物品</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="remarkDialog = false; resolveRemarkList()">备注</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="preview_billDialog = false">预约发票</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="consumeDialog = true">消费</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="settingDialog = false">服务设置</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="breakfastDialog = true; getBreakfastList()">早餐</el-button> -->
                <div style="float: right">
                    <!-- 应收总额:<span style="margin-right: 10px">{{countMoney}}</span> -->
                     <!-- 应收总额:<span style="margin-right: 10px">{{needPayCount}}</span> -->
                    <!-- 应收总额:<span style="margin-right: 10px">{{countMoney1}}</span>
                    <span style="margin-right: 10px">明细</span> -->
                <el-button style="height: 50px; width: 100px" type="primary" @click="handlePolice()">上传公安</el-button>
                <el-button :loading="isLoading" style="height: 50px; width: 100px;" type="primary" @click="confirmPreToEnter()">确认入住</el-button>
                <!-- <el-button  style="height: 50px; width: 100px;" type="primary" @click="confirmPreToEnter()">确认入住</el-button> -->
                </div>
            </el-row>
        </el-dialog>
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
                <!-- <el-table-column prop="count" label="总计(元)">
                  <template>
                  <span>{{sumBreakfastMoney.toFixed(2)}}</span>
                </template>
                </el-table-column> -->
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
        <!-- 入预收操作 -->
        <el-dialog @close="extraInformation = []" :close-on-click-modal = 'false' class="houseTypeClass deletePadding_Class" title="入预收操作" :visible.sync="enterPreviewDialog" :modal="true">
          <div style="width: 100%; height: 400px;overflow: auto">
            <ul class="enter_pre_ul">
              <!-- <li><span>&nbsp;&nbsp;订单号:</span> <span>{{this.returnEnterParam.order_no}}</span></li> -->
              <li>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应收: </span><span style="color: #f3565d;">{{sum_money}}</span>
              (预收款总计: <span style="color: #f3565d;">{{previewEnterBill.money}}</span>已收:  <span>{{previewEnterBill.money}})</span>
              <!-- 预计消费总计: {{countMoney}}) -->
              </li>
              <!-- <li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应收: </span><span style="color: #f3565d;">{{payMoney}}</span>(预收款总计: <span style="color: #f3565d;">{{payMoney}}</span>已收:  <span>{{payMoney}}</span>预计消费总计: {{payMoney}})</li> -->
              <!-- <li>
                <span>设为主房:</span>
                <el-select clearable style="width: 12vw"  placeholder="入住房号"  v-model="previewEnterBill.room_no_value">
                    <el-option
                      v-for="item in roomNumberList"
                      :key="item.id"
                      :label="item"
                      :value="item">
                      <span style="float: left">{{ item }}</span>
                    </el-option>  
                  </el-select>
              </li> -->
              <li><span>付款方式:</span> 
                <el-select clearable style="width: 12vw" @change="get_fields_by_payId" @focus="getPayMode()" placeholder="付款方式"  v-model="previewEnterBill.payMode">
                    <el-option
                      v-for="item in payModeList"
                      :key="item.id"
                      :label="item.model_name"
                      :value="item.id">
                    </el-option>  
                  </el-select>
                  <!-- <el-button size="small" v-if="isAccout" @click="openAccount()"  type="danger" round>开账</el-button>   -->
              </li>
              <li v-if="previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38" style="margin-top: 10px;">
                <span>扫码方式:</span>
                <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
                <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
              </li>
              <li>
                <span>付款原因:</span>
                <el-select clearable style="width: 12vw" @change="previewEnterBill.enterAccountCode=''" @focus="getPayReason()" placeholder="付款原因"  v-model="previewEnterBill.payReasonValue">
                  <el-option
                    v-for="item in this.payInfoList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                  </el-option>  
                </el-select>
                <span>入账代码:</span>
                <el-select clearable  @focus="getIncomingAccount('pay')"  v-model="previewEnterBill.enterAccountCode"  style="width: 12vw"  placeholder="请选择">
                  <el-option
                    v-for="item in incomingAccoutList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>  
                </el-select>    
              </li>
              <li>
                <span>付款金额:</span>
                <el-input  style="width: 12vw"  v-model="previewEnterBill.money"></el-input>
                <!-- <span style="color: red">(付款金额必须大于预计消费总计!)</span> -->
              </li>
            </ul>
            <!--附加信息==>需要判断储值卡,银行卡,积分兑换-->
            <div style="margin-top: 30px; margin-bottom: 20px;">
              <span style="color: #4488E9;margin-top: 10px;margin-left: 15px">附加信息</span>
              <ul v-for="(item,index) of extraInformation" :key="index">
                <li>
                  <span style="margin-left: 28px">{{item.field_name_cn}}:</span>
                  <el-input size="mini" v-model="item.field_name_value" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
              </ul>
            </div>
            <div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="flushEnterAccount()" type="info">清空</el-button> -->
            <el-button v-if="previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38" type="primary" @click="article_number();pay_amount_money_code = ''">结算</el-button>
            <el-button v-else type="primary" @click="handlePayCharge()">付款</el-button>
          </div>
        </el-dialog>
        <!-- 预授权dialog -->
        <a-dialog :show.sync= authorizationDialog :parentInfoParam='authorizationParam'></a-dialog>
        <!--新建预订单=>消费-->
        <c-dialog :show.sync= consumeDialog :parentParam='preBillParam'  v-on:listenTochildEvent="getConsumeData"></c-dialog>
        <!--上传公安-->
        <police-dialog :show.sync= policeComponentDialog :policeParam='policeParam' v-on:listenToPolice="getPrebillParam"></police-dialog>
         <!--上传图片-->
        <picture-dialog :show.sync= pictureComponentDialog :pictureParam='pictureParam' v-on:listenToPicture="getPictureParam"></picture-dialog>
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
        <!--新建预订单=>备注-->
        <el-dialog class="houseTypeClass deletePadding_Class" title="备注" :visible.sync="remarkDialog" :modal="true">
          <div style="height: 400px">
            <el-table :data="preBillParam.remarkList" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" style="width: 100%">
              <el-table-column prop="remarkContent" label="备注内容"></el-table-column>
              <el-table-column prop="remarkType" label="备注类型"></el-table-column>
              <el-table-column prop="status" label="订单状态"></el-table-column>
              <el-table-column prop="time" label="操作时间"></el-table-column>
              <el-table-column prop="operationPeople" label="操作人"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="addAndUpdate_remarkDialog = true; addAndUpdate = false; handleRemarkInfo(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteRemarkInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              <el-button type="info" @click="addAndUpdate_remarkDialog=true; addAndUpdate = true; remarkContent_value = ''">新增备注</el-button>
            </div>
            <el-button type="info" plain  @click="remarkDialog=false">关闭</el-button>
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
        <!--支付成功或者失败后显示的页面-->
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
        <!-- 新建/编辑预订单备注=》新建编辑备注 -->
        <el-dialog class="houseTypeClass" width="30%" title="新增备注" :visible.sync="addAndUpdate_remarkDialog" :modal="true">
          <div style="height: 200px">
            <el-input v-model="remarkContent_value" placeholder="请输入备注信息" type="textarea" :rows="10"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="info"   @click="addAndUpdateRemarkInfo();addAndUpdate_remarkDialog=false">保存</el-button>
          </div>
        </el-dialog>
        <!--证件导入弹出dialog-->
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
import aDialog from './authorizationDialog'
import QRCode from 'qrcodejs2'
import util from '../../../common/util.js'
import moment from 'moment'
import cDialog from './consumeDialog'
import policeDialog from './policeDialog'
import pictureDialog from './pictureDialog'
export default {
    data(){
        return {
          face_set: '',//获取face-set
          isLoading: false,
          rate_other_list: [],//最终组装的数据 
          rateAllPrice_list: [],//房价码价格数组
          master_rtrate: [],//每日每间房的房价房价码等
          lock_arrary: [],
          pictureComponentDialog:false,
          showlink: false,
          // uploadUrl: 'https://image.eloadspider.com/resource/employee/head_image/upload',
          uploadUrl: 'https://oss.crowncrystalhotel.com/resource/live/upload',
          policeInfoParam:{},
          card_imgUrl: '',//身份证图片
          police_img_src: '',//地址
          imageUrl: '',//图片地址
          policeParam: {},
          pictureParam: {},
          authorizationParam:{},
          mainAccount_id: '',
          authorizationDialog: false,
          policeComponentDialog: false,
          marketSrcList: [],
          rateCode_list: [],
          span_input_flag: false,
          extraParam:[],
          extraInformation: [],//附加信息
          room_no_floor: [],
          cardList: [],
          scan_code: '0',
          remark_roomNo: '',//备注中的房间号
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
          sum_money: 0,
            //入预收对象
          previewEnterBill:{
            room_no_value: '',//联房房间
            cashValue: '',
            billInfo: '',
            payMode: '',
            payReasonValue: '',
            enterAccountCode: '',
            money: '',
            accountData: '',
            summary: '',
            remark: '',
          },
          cardInfoParam:{
            name: '',
            sex: '',
            cardType: '01',
            cardNo: '',
            address: ''
          },
          cardInfoDialog: false,//身份证信息dialog
          switchPayValue: '0',
          collectionChargeData: [],//收款要选择的数据
          incomingAccoutList: [],//入账代码list
          return_accountParam_1: {},//开帐之后返回的param
          return_accountParamId: [],
          returnEnterParam: {},
          payMoney: 0,
          isAccout: true,
          countMoney1: 0,//总数 不考虑预定的房价的总数只考虑买衣服冰棍啥的钱
          previewCharge: 0,
          previewPay: 0,
          haveNotPayValue: 0,
          needPayCount: 0,
          accoutInfoById_param: {},
          selfSortArray: [],
           payReasonValue: '',//付款原因对应值
            payModeValue: '',//付款方式对应值
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
            //账户param
            account_param: {
              account_type: 0,//int 默认为正常账户 	账户类型:0:正常账户 1：AR账户
              reference_link_label: 0,//	关联方标志，0：预定账户，1：入住单，2：已分帐的单独客人账户
              reference_id: 1,//int 此时测试数据
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
            return_accountParam:{},
            payMoneyDialog: false,
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
            tableData_data: [],
            checkAll: false,
            isIndeterminate: true,
            orderHouseList: [],//默认进来全部选中
            previewOrders: [],
            tableData_4: [],
            switchValue: '',
            tableData_1: [{
              name: '李四',
              member: '',
              telphone: '13812345678',
              type: '身份证',
              cardNumber: '1531515315555454'
            }],
            tableData_2: [{
              code: '',
              price: '598.00',
              number: '1',
              enterTime: '2018/10/02 12:00',
              person: '管理员'
            }],
            num: 1,
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            value8: '',
            value9: '',
            value10: '',
            previewToEnterVisible: this.show,
          countMoney: 100,
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
          noSortNumber: 0,
          sortNumber: 0,
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
            room_no_floor: [],
            room_list: [], //入住人房间号主要为设置住房服务
            //选择房型一行
            reserve_rate:[{
              can_live_num: '',//add
              room_type_value: '',//房型名称对应ID
              room_type: '',//房型名称
              room_class: '1',
              room_number: '',//房间数 数组变字符串
              dynamic_roomNumber: [],//动态房间号=》应是一个数组
              // ['111', '222', '333','444', '555','666', '777']
              ratecode_id: '',//房价码
              room_price: '',
              room_count: '',//房间数量几件=add=
              roomPrice: '', //总价钱=add=
              // code: '123',
              // code_name: '123',
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
            }],
            reserve_base:[{
              rate_code: '',//房价码
              is_change_rate: '',
              rsv_from : '',//预定类型
              rsv_person_name : '',//预定人姓名
              telephone_master: '',//预定人电话
              arr_time: '',//预抵时间
              leave_time: '',//离开时间
              is_fix_rate: 1, //传的 false和 true
              is_secrete : 1,
              is_secret_rate : 1,//1传的
              allowed_ar : 1,
              // code: '11',
              // code_name: '11',
              // descript: '11',
              // descript_en: '11',
              
              account_id: 1,
              biz_date: '2018-12-01 10:10:01',
              team_id: 1,
              rsv_type: 1,
              rsv_lable: '',
              order_no: '',
              confirmed: false,
              sales_person_id: 1,
              code_occ_id: 1,
              extra_flag: 1,
              adult_num: 1,
              children_num: 1,
              purpose: '1',
              name:'',
              email_master: '',
              weixin_master: '1',
              mobile_master: '1',
              id_no: '1',
              room_price: null,
              ar_id: '1',
              code_commision_id: '1',
              code_market: '1',
              code_src: '1',
              reference_id: 1,
              rsv_status_lable: 1,
              total_chartge: 1,
              total_pay: 1,
              last_account_id: 1,
              last_pay_id: 1,
              account_num: 1,
              pay_num: 1
            }],
            //入住人
            reserve_guest:[{
              room_no: 0,
              face_id: null,
              pic_photo: null,//证件照
              pic_now: null,//当前拍摄照片
              liveCount: 0,//可选数
              room_number: '',//房间号
              id_code: '01',//证件类型
              id_no: '',//证件号码
              name: '', //姓名
              sex: '0',//性别
              telephone: '',//手机号
              street_add: '',//街道地址
              // code: '123',
              // code_name: '77777',
              // descript: '22',
              // descript_en: '22',
              last_name: '',
              first_name: '',
              name2: '',
              name_combi: '',
              is_save: false,
              language: '',
              title: '',
              salutation: '',
              race: '',
              religion: '',
              career: '',
              nation: '',
              visa_no: '',
              visa_grant: '',
              enter_port: '',
              where_from: '',
              where_to: '2',
              salary: '',
              education: '',
              marital: '',
              company_na: '',
              remark: '',
              is_anonymo: false,
              weixin: '',
              mobile: '',
              email: '',
              country_id: '',
              division_id: '',
              state_id: '',
              city_id: '',
              zipcode: '',
              reserve_base_id: '',
            }],
            //早餐
            breakfastInfoList: [],
            settingInfo: {},//设置
            //预定=》消费
            consumeInfoList: [{
                name: '',
                number: '',
                price: '',
                count: ''
            }],
            billInfo: {},//发票
            remarkList: [{
                remarkContent: '',
                remarkType: '',
                status: '',
                time: '',
                operationPeople: '',
            }],//备注
          },
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
            label: '非会员/会员',
            value: 0
            },{
            label: '散客入住',
            value: 1
            },{
            label: '团队入住',
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
              value: '0'
              },{
              label: '钟点房',
              value: '1'
            }
            // ,{
            //   label: '夜宵房',
            //   value: '2'
            // },{
            //   label: '常住房',
            //   value: '3'
            // },{
            //   label: '免费房',
            //   value: '4'
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
          UrLHeader_9101:'http://47.98.113.173:9101/v1/',
          UrLHeader_9102: 'http://47.98.113.173:9102/v1/',
          UrLHeader_9519:'http://47.98.113.173:9519/v1/',
          UrLHeader_9103: 'http://47.98.113.173:9103/v1/',
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
        parentInfoParam: {
            type: Object,
            required: true
        }
    },
     components: {
      'cDialog': cDialog,
      'aDialog': aDialog,
      'policeDialog': policeDialog,
      'pictureDialog': pictureDialog,
      QRCode
    },
    created(){
      // this.getRoomType() //准备:循环得到匹配的房型中文名
      // this.enterPreviewDialog = true
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
      }
    },
    watch: {
      show () {
        this.previewToEnterVisible = this.show;
        this.getRoomType() //准备:循环得到匹配的房型中文名
      },
      parentInfoParam(){
        //关键一步，登记有身份证号要清空<===================mark 在上一步已经清空
        this.getCardListInfo()//获取房子信息所有数据
        this.preBillParam = _.cloneDeep(this.parentInfoParam)
        this.preBillParam.reserve_base[0].leave_time = [moment(this.preBillParam.reserve_base[0].arr_time).format('YYYY-MM-DD HH:mm:ss'),moment(this.preBillParam.reserve_base[0].leave_time).format('YYYY-MM-DD HH:mm:ss')]
        console.log('this.preBillParam.reserve_base[0].leave_time',this.preBillParam.reserve_base[0].leave_time)
        console.log(this.preBillParam,'this.preBillParam===================终店点111')
        console.log('preBillParam.reserve_base[0].rsv_lable',this.preBillParam.reserve_base[0].rsv_lable)
       // this.arr_time = moment(this.preBillParam.reserve_base[0].leave_time[0]).format('YYYY-MM-DD')
        // this.leave_time = moment(this.preBillParam.reserve_base[0].leave_time[1]).format('YYYY-MM-DD')
        // let tempParam = _.cloneDeep(this.preBillParam)
        // this.tempPreBillparam = _.cloneDeep(this.preBillParam) //办理入住的对象
        // this.expandPreInfo = this.expandData(tempParam)
        // let roomNo = this.parentInfoParam.parentRoomNumber
        // console.log('父级传过来的roomNo',roomNo)
        // console.log('this.parentInfoParam',this.parentInfoParam)
        // this.preBillParam.reserve_rate =  this.parentInfoParam.reserve_rate.filter(item=>item.room_number == roomNo)
        // this.getInfoByRowThenEnter(roomNo)//处理入住人
        this.previewEnterBill.room_no_value = this.preBillParam.reserve_rate[0].dynamic_roomNumber[0]//申明默认房间号
        console.log('选择主帐房',this.liveoptions_Value)
        if(this.preBillParam.reserve_guest.length>1 || this.preBillParam.reserve_rate.length>1){
          this.showlink = true
        }
        console.log(this.preBillParam,'this.preBillParam===================终店点')
        this.getMarketSrc('src')
        this.getMarketSrc('market')
        this.getRateCode_list()
        this.getCanLiveRoom()
      },
      //对象的watch
      // parentParam: {
      //     handler(newValue,oldValue){
      //         console.log('new',newValue)
      //         console.log('old',oldValue)
      //     },
      // },
      // param(){
      //     this.getData()
      // }
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
        let start = moment(this.preBillParam.reserve_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.reserve_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      }
    },
    methods: {
      //上传照片 父传子 但是没传
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
        this.getFaceSet(param)
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
      //子传父
      getPictureParam(param){
        console.log('接收从子组件传来的入住人对应的入住照片!',param)
        this.preBillParam.reserve_guest.forEach((item,index)=>{
          if(index == param.index){
            item.pic_now =  param.imageUrl
            item.face_id = param.face_id
          }
        })
        console.log('this.preBillParam.check_guest=====end',this.preBillParam.reserve_guest)
      },
      //子组件传过来的值，以便于更新入住人this.preBillParam.reserve_guest的证件地址和拍照地址
      getPrebillParam(msg){
        console.log('msg传过来得信息',msg)
        this.preBillParam.reserve_guest = [].concat(msg.reserve_guest) //更新了入住人的信息==>主要是为了更新入住人的照片和证件照信息
      },
      handlePolice(){
        //开始分情况处理1.有预定且有入住人的信息(包括多条的时候)2.无预定，直接刷身份证的时候
        this.handlePoliceParam()
        console.log('this.policeInfoParam',this.policeInfoParam)
        // this.policeParam = {
        //   name: '1233'
        // }
        console.log('this.preBillParam传入入住人信息',this.preBillParam.reserve_guest)
        this.policeParam =  Object.assign(this.policeInfoParam) //刷卡产生的对象赋值
        this.getEnter_RommNumber()//获取房间号下拉
        console.log('getEnter_RommNumber',this.liveoptions_Value)
        this.policeParam.card_imgUrl = this.card_imgUrl //公安照片
        this.policeParam.liveoptions_Value = this.liveoptions_Value//入住房间
        this.policeParam.reserve_guest = [].concat(this.preBillParam.reserve_guest) //赋值入住人数组
        console.log('that.card_imgUrl,shenfenzheng',this.card_imgUrl)
        console.log('this.policeParamthis.policeParam',this.policeParam)
        this.policeComponentDialog = true
        console.log('this.policeComponentDialog',this.policeComponentDialog)
      },
      //开始分情况处理1.有预定且有入住人的信息(包括多条的时候)
      //2.无预定，直接刷身份证的时候
      handlePoliceParam(){
        console.log('card身份',this.cardInfoParam)
        console.log('policeInfoParam',this.policeInfoParam)
        console.log('this.preBillParam.reserve_guest<=====',this.preBillParam.reserve_guest)
        // this.policeInfoParam
        this.policeInfoParam.name = this.cardInfoParam.name
        this.policeInfoParam.sex = this.cardInfoParam.sex === '0' ? '男' : '女'
        this.policeInfoParam.cardNo = this.cardInfoParam.cardNo //读卡获取到身份证信息了
        this.policeInfoParam.address = this.cardInfoParam.address
        this.policeInfoParam.birthday = this.cardInfoParam.birthday
        this.policeInfoParam.nation = this.cardInfoParam.nation
        this.policeInfoParam.time = moment(this.preBillParam.reserve_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss') + '至'+ moment(this.preBillParam.reserve_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        this.policeInfoParam.cardType = this.cardInfoParam.cardType === '01' ? '身份证' : ''
        // this.policeParam = this.policeInfoParam
        //筛选得到匹配的对应值===废弃
        // let array = this.preBillParam.reserve_guest.filter(item=>item.id_no === this.policeInfoParam.cardNo)
        // console.log('array',array)
        // if(array.length>0){
        //   this.policeInfoParam.room_no = array[0].room_number
        //   this.policeInfoParam.telephone = array[0].telephone
        // }
        // this.policeDialog = true;
        // this.policeDialog_2 = true
        // this.$nextTick(_=>{
        //   media.getMedia('150','150','video_2')
        // })
        console.log('this.preBillParam.预定客人',this.preBillParam.reserve_guest)
      },
      closeAndFlushData(){
        this.span_input_flag = false
        this.showlink = false
      },
      //获取摄像头
      getMedia(){
        console.log('进入')
        // navigator.getUserMedia()
        let constraints = {
          video: {width: 200, height: 200},
          audio: true
        };
        //获得video摄像头区域
        // let video = document.getElementById("video");
        // console.log('viedo',video)
        //这里介绍新的方法，返回一个 Promise对象
        // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
        // then()是Promise对象里的方法
        // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
        // 避免数据没有获取到
        let viedo = document.getElementById("video")
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then(function (MediaStream) {
            video.srcObject = MediaStream;
            video.play();
        });
      },
      clearPhoto(){
        var c=document.getElementById("canvas");
          var ctx=c.getContext("2d");
          ctx.fillRect(0, 0, 200, 200);
      },
        //拍照上传
      takePhoto(param){
        let that = this
        if(param){
          console.log('enter')
               /**
             * 元素移除操作不进行，因为是直接发送照片，但是不进行照片的展示。
             */
            let blob = that.dataURLtoBlob(param);
            let file = that.blobToFile(blob, "imgName");
            var fd = new FormData();
            fd.append("upfile", file,"image.png");
            console.log('fd',fd)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            if(blob){
              let url = that.uploadUrl;
              that.$axios.post(url,fd,config).then(res=>{
                console.log('res==blob',res)
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
          let canvas = document.getElementById("canvas");
          let ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, 150, 150);
          canvas = canvas.toDataURL("image/png");
          console.log('canvas=================base64',canvas)
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
            console.log('fd',fd)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            if(blob){
              let url = that.uploadUrl;
              that.$axios.post(url,fd,config).then(res=>{
                console.log('res==blob',res)
                if(res.data.url){
                  // that.imageUrl = 'https://image.eloadspider.com/' +  res.data.url
                  that.imageUrl = res.data.complete
                  that.$message.success('上传图片成功!')
                  console.log('。。。。',this.preBillParam.reserve_guest)
                  for(var item of that.preBillParam.reserve_guest){
                    if(item.pic_now){
                    }else{
                      item.pic_now = that.imageUrl
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
      //确认导入入住人信息
      confirmGuestInfo(){
        this.cardInfoDialog = false
        console.log('preBillParam.reserve_guest',this.preBillParam.reserve_guest)
        //当为1的时候没有手输的情况，默认通过卡导入填充===>进行赋值
        if(this.preBillParam.reserve_guest[0].id_no ===''){
          this.preBillParam.reserve_guest[0].name = this.cardInfoParam.name
          this.preBillParam.reserve_guest[0].sex = this.cardInfoParam.sex
          this.preBillParam.reserve_guest[0].id_code = this.cardInfoParam.cardType
          this.preBillParam.reserve_guest[0].id_no = this.cardInfoParam.cardNo
          this.preBillParam.reserve_guest[0].street_add = this.cardInfoParam.address
        //当数组长度大于1的时候，要进行2步，自动加行自动填充数据
        }else if(this.preBillParam.reserve_guest.length>=1){
          // let array = _.cloneDeep(this.preBillParam.reserve_guest)
          // for(var item of this.preBillParam.reserve_guest){
          //   if(item.id_no === ''){
          //   }else{}
          // }
          let enterValue = {
            room_no: 0,
            pic_photo: null,
            face_id: null,
            pic_now: null,
            name: this.cardInfoParam.name, //姓名
            sex: this.cardInfoParam.sex,//性别
            id_code: this.cardInfoParam.cardType,//证件类型
            id_no: this.cardInfoParam.cardNo,//证件号码
            street_add: this.cardInfoParam.address,//街道地址
            liveCount: 0,//可选数
            room_number: '',//房间号
            telephone: '',//手机号
            // code: '123',
            // code_name: '77777',
            // descript: '22',
            // descript_en: '22',
            last_name: '',
            first_name: '',
            name2: '',
            name_combi: '',
            is_save: false,
            language: '',
            title: '',
            salutation: '',
            race: '',
            religion: '',
            career: '',
            nation: '',
            visa_no: '',
            visa_grant: '',
            enter_port: '',
            where_from: '',
            where_to: '',
            salary: '',
            education: '',
            marital: '',
            company_na: '',
            remark: '',
            is_anonymo: false,
            weixin: '',
            mobile: '',
            email: '',
            country_id: '',
            division_id: '',
            state_id: '',
            city_id: '',
            zipcode: '',
            reserve_base_id: '',
          }
          //避免重复的身份证号
          for(var item of this.preBillParam.reserve_guest){
            if(item.id_no === this.cardInfoParam.cardNo){
              this.$message.warning('不能有重复的身份证号!')
              return false
            }else{
              this.preBillParam.reserve_guest = this.preBillParam.reserve_guest.filter(item=>item.id_no != '') //过滤掉身份证号为空的从而删除入住人一行数据
            }
          }
          this.preBillParam.reserve_guest.push(enterValue)
          this.cardInfoDialog = false
          console.log('需要判断preBillParam.reserve_guest',this.preBillParam.reserve_guest)
          this.showDeleteButton_2 = true
        }else{

        }
        // this.preBillParam.reserve_guest.forEach(function (item) {
        //     if(!item.pic_photo){
        //       item.pic_photo = this.card_imgUrl
        //     }
        // } )
        // console.log('====开始传入证件照片===')
        // console.log('准备传入证件照片',this.preBillParam.reserve_guest)
      },
      //证件导入功能 自动填充入住人信息
      cardImport(){
        let that = this
        // that.cardInfoDialog = true //读卡器失败就不打开dialog
        // let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=HuaShiDianZi_IDC_Card&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&jsonp=angular.callbacks._0`
        let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=JingLunDianZi_IDC&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&jsonp=angular.callbacks._0`
        url = url.replace('angular.callbacks._0','userHandler') //替换
        // let url = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=HuaShiDianZi_IDC_Card&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0`
        that.$http.jsonp(url,{
          jsonpCallback: "userHandler"
        }).then(res =>{
          /**
           * 测试数据
           */
          // res.body = {
          //   Result: true,
          //   Msg: "读贵宾身份证信息成功",
          //   Id: "05-03-20190118-0009300013",
          //   Name: "徐立杰",
          //   Sex: "男",
          //   Nation: "汉",
          //   Birthday: "1976-12-11",
          //   Address: "河南省潢川县城关镇航空南道97-8",
          //   Code: "413024197612110019",
          // }
          // res.Data = res.body
          // that.cardInfoParam.name = res.Data.Name
          // that.cardInfoParam.sex = res.Data.Sex === '男' ? '0' : '1'
          // that.cardInfoParam.cardNo = res.Data.Code
          // that.cardInfoParam.address = res.Data.Address
          // res.data.Result = true
          // that.validateId_no(that.cardInfoParam.cardNo)//验证身份证 //测试数据==>终废弃
          // console.log('that.cardInfoParam==>读卡成功',that.cardInfoParam)
         /**分割=====>上面为测试数据 */
          if(res.data.Result === true){
            that.police_img_src= "data:image/png;base64,"+res.data.Data.Photo;
            console.log('tuphoto',res.data.Data.Photo)
            that.cardInfoParam.name = res.data.Data.Name
            that.cardInfoParam.sex = res.data.Data.Sex === '男' ? '0' : '1'
            that.cardInfoParam.cardNo = res.data.Data.Code //读卡获取到身份证信息了
            that.cardInfoParam.address = res.data.Data.Address
            that.cardInfoParam.birthday = res.data.Data.Birthday
            that.cardInfoParam.nation = res.data.Data.Nation
            that.validateId_no(that.cardInfoParam)//验证身份证方法
            that.cardInfoDialog = true
            console.log('开始上传公安照片')
            that.takePhoto(that.police_img_src)
          }else{
            that.cardInfoDialog = false //读卡器失败就不打开dialog
            that.$message.warning('读卡失败!请重新刷身份证!')
          }
        }).catch(error=>{
          console.error();
        })
      },
        //验证是否存在已经住人的房间继续刷卡住人
        validateId_no(param,param2){
          console.log('param=====,card',param,param2)
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/is_checkin_info/`
          let url= that.api.api_bill_9202 + '/v1/' + `checkin/is_checkin_info/`
          let scopeParam = {
            id_no: param2==='输入' ? param.id_no : param.cardNo
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
                that.cardInfoDialog = true //打开dialog
              }
            }
          })
        },
      flushTime(){
        console.log('关掉')
        clearInterval(this.timer_src)
        clearInterval(this.timer_r)
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
      //进行付款
      handlePayCharge(){
        if(!this.validatePayData()){
          return false
        }
        let that = this
          //在判断是不是支付宝或者微信
          if (that.previewEnterBill.payMode === 1 || that.previewEnterBill.payMode === 38) {
            // that.article_number() //可能有异步产生 此处不要
            //判断是不是选择扫码枪 在弹出的扫码页面里进行支付
            console.log('that.scan_code',that.scan_code)
            if (that.scan_code === "0") {
              that.dialog_alipay = true;
            }
            //如果不是扫码枪
            else {
              that.dialog_alipay = false;
              //判断是微信还是支付宝==>并列
              if(that.previewEnterBill.payMode === 38){
                // 首先请求微信或者支付宝的接口，获取动态的二维码
                that.kindle_dxg();//获取维信的二维码
              }else{
                that.alipay_dxg();//支付宝
              }
              // that.fu_money();//付钱的结算
            }
          }
          //如果不是支付宝或者微信 ===>此时默认现金支付
          else {
            that.payCharge()
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
                console.log(res.data.data);
                that.img_src= "data:image/png;base64,"+res.data.data.qr_img_b64;
                console.log(that.img_src);
                that.dialog_img=true;
                that.img_wz=true//判断二维码展示flag
               that.check_paid();//查询二维码支付是否成功
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
        check_paid(){
          let that = this;
          clearInterval(that.timer_src);
          that.$axios({
            url: that.api.api_9530_9503+ '/v1/' + "payment/weixin/check_paid",
            method: "post",
            data:{
              out_trade_no:that.order_form
            },
          }).then(res=>{
              if(res.data.data.paid === "yes"){
                that.dialog_img=false;
                that.dialog_succeed=true;//成功或者失败的页面
                that.ihatetheqrcode=true;
                clearInterval(that.timer_src);
              }else{
                if(that.timer>=60){
                  clearInterval(that.timer_src);
                  if (res.data.data === "yes"){
                    that.dialog_img=false;
                    that.dialog_succeed=true;//成功或者失败的页面
                    that.ihatetheqrcode=true;
                  }else {
                    that.dialog_img=false;
                    that.dialog_succeed=true;//成功或者失败的页面
                    that.ihatetheqrcode=false;
                  }
                  return;
                }
                that.timing();
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //封装扫描二维码后触发的定时器
        timing(){
          let that = this;
          // that.timer=0;
          that.timer_src=setInterval(function()   //开启循环：
          {
            that.timer++;
            console.log(that.timer++);
            that.check_paid();
            if(that.timer >=60){
              clearInterval(that.timer_src);
              console.log(that.timer);
              return;
              //判断res

            }
          },1000);
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
              that.enterPreviewDialog = true
              that.pay_amount_money_code="";
              util.hintInfo(this,"warning", "扫码付钱失败，请重新扫码")
            }else {
              that.dialog_succeed=false;//成功或者失败的页面
              that.dialog_alipay = false;//扫码支付的页面//这是扫码枪的界面
              that.enterPreviewDialog = true
              that.pay_amount_money_code="";
              util.hintInfo(this,"warning", "扫码付钱失败，请重新扫码")
            }
          }
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
        console.log('this.returnEnterParam',this.returnEnterParam,this.returnEnterParam)
        let that = this
        let value = Object.values(this.returnEnterParam) //需要联房的主账值
        console.log('accountId 的值',value)
        let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_money_pms`
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        let scopeParam = {
          account_id: value[0], //主账id//==========>标记:入住付款的时候得先得到主账id
          // account_id: 76,//暂时测试
          pay_mode_id: that.previewEnterBill.payMode,		
          code_pay_for_id: that.previewEnterBill.payReasonValue,
          pay_amount: that.previewEnterBill.money,		
          code_income_type_id: that.previewEnterBill.enterAccountCode,   //入账类型代码id
          // biz_date: moment(new Date()).format('YYYY-MM-DD'),
          original_pay_id: that.order_form == '' ? '': that.order_form, //	微信/淘宝/第三方支付订单的id,现金支付没有此参数
          // ar_account_id: '',//	ar账户id, ar支付必须.
          original_pay_dict: that.extraParam.length>0 ? JSON.stringify(that.extraParam) : null,
          cashier_id:	9,
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data)
          if(res.data.message != 'success'){
            that.$message.warning('调用后台接口失败')
          }else{
            that.$message.success('操作成功!')
            that.enterPreviewDialog = false
            that.previewToEnterVisible = false
            // this.$router.go(0)
          }
          }).catch(error=>{
        })
      },
      //清空重置对象或数组的数据
      flushData(){
        this.preBillParam.reserve_rate = [{
          can_live_num: '',//add
          room_type_value: '',//房型名称对应ID
          room_type: '',//房型名称
          room_class: '1',
          room_number: '',//房间数几间 数组变字符串
          dynamic_roomNumber: [],//动态房间号=》应是一个数组
          // ['111', '222', '333','444', '555','666', '777']
          ratecode_id: '',//房价码
          room_price: '',
          room_count: '',//房间数量=add=
          roomPrice: '', //总价钱=add=
          // code: '123',
          // code_name: '123',
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
        }]
      },
      //刷新入住人
      flush_reserveGurst(){
        this.preBillParam.reserve_guest = [{
          room_no: 0,
          pic_photo: null,
          face_id: null,
          pic_now: null,
          // liveCount: 0,
          // room_number: '',
          // name: '',
          // sex : '',
          // id_code : '',
          // id_no : '',
          // telephone : '',
          // street_add : ''
          liveCount: 0,//可选数
          room_number: '',//房间号
          id_code: '01',//证件类型
          id_no: '',//证件号码
          name: '', //姓名
          sex: '0',//性别
          telephone: '',//手机号
          street_add: '',//街道地址
          // code: '123',
          // code_name: '77777',
          // descript: '22',
          // descript_en: '22',
          last_name: '',
          first_name: '',
          name2: '',
          name_combi: '',
          is_save: false,
          language: '',
          title: '',
          salutation: '',
          race: '',
          religion: '',
          career: '',
          nation: '',
          visa_no: '',
          visa_grant: '',
          enter_port: '',
          where_from: '',
          where_to: '',
          salary: '',
          education: '',
          marital: '',
          company_na: '',
          remark: '',
          is_anonymo: false,
          weixin: '',
          mobile: '',
          email: '',
          country_id: '',
          division_id: '',
          state_id: '',
          city_id: '',
          zipcode: '',
          reserve_base_id: '',
        }]
      },
       /**
       * 根据账务id得到主账信息(查询预定的时候负的钱以及其他) 预定时有开账的情况下
       */
      getInfoByAccount(){
        console.log('this.rowPreBillParam====this.rowPreBillParam',this.preBillParam)
        //开账的时候就会直接赋值
        if(this.preBillParam.reserve_base[0].account_opened===1){
          let id = this.preBillParam.reserve_base[0].account_id
          console.log('id',id)
          let that = this
          let param ={
            with_collections: 1,
            related_objects: 1
          }
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/account/get_info/' + id
          that.$axios({
           method : 'get',
            url : url,
            params: param
        }).then(res=>{
           this.accoutInfoById_param_1 = res.data.data
            // if(this.preBillParam.reserve_base[0].account_opened === 0){
            this.needPayCount = this.accoutInfoById_param_1.total_consumption - this.accoutInfoById_param_1.pay_amount  //应收总额
            // }else{
            //   this.needPayCount = this.preBillParam.reserve_base[0].total_chartge - this.preBillParam.reserve_base[0].total_pay//应收总额 开账的时候是合计几个房间的价钱还是单个的
              
            this.previewCharge = this.accoutInfoById_param_1.total_consumption
            this.previewPay = this.accoutInfoById_param_1.pay_amount
            // 计算
            this.haveNotPayValue = this.previewCharge - this.previewPay //预收金额 即还没分配的金额
            // }
          }).catch(error=>{
          })
        }
      },
      /**
       * 根据预定转入住创建主账得到主账信息
       */
      getEnterInfoByAccount(){
        console.log('this.rowPreBillParam====this.rowPreBillParam',this.rowPreBillParam)
        //开账的时候就会直接赋值
          let id = this.return_accountParam.id  //创建主账返回的id 不是预定单id
          console.log('id',id)
          let that = this
          let param ={
            with_collections: 1,
            related_objects: 1
          }
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/account/get_info/' + id
          that.$axios({
           method : 'get',
            url : url,
            params: param
        }).then(res=>{
            this.accoutInfoById_param = res.data.data
            console.log('this.accoutInfoById_param入住的时候',this.accoutInfoById_param)
              for(var item of this.accoutInfoById_param.charge_details){
                for(var itemm of this.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
            // }
          }).catch(error=>{
          })
      },
      /**
       * 根据预定转入住创建主账得到主账信息
       */
      getEnterInfoByAccount(){
        console.log('this.rowPreBillParam====this.rowPreBillParam',this.rowPreBillParam)
        //开账的时候就会直接赋值
          let id = this.return_accountParam.id  //创建主账返回的id 不是预定单id
          console.log('id',id)
          let that = this
          let param ={
            with_collections: 1,
            related_objects: 1
          }
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/account/get_info/' + id 
          that.$axios({
           method : 'get',
            url : url,
            params: param
        }).then(res=>{
            this.accoutInfoById_param = res.data.data
            console.log('this.accoutInfoById_param入住的时候',this.accoutInfoById_param)
              for(var item of this.accoutInfoById_param.charge_details){
                for(var itemm of this.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
            // }
          }).catch(error=>{
          })
      },
      /**
       * 转账 当收款时创建该房间的主账id 然后可以转账  就是预定单的主账id的钱就可转到该房间下的账单 一对一
       */
      transferAccount(){
        if(this.rowPreBillParam.reserve_base[0].account_id === ''){
          this.$message.warning('预订时未创建账户，不能转账!')
          return
        }
        // this.haveNotPayValue = this.rowPreBillParam.reserve_base[0].total_pay //预收付款金额
        let that = this
        // let url= `http://47.98.113.173:9519/v1/finance/transfer_accounts_detail/add`
        let url = that.api.api_9022_9519+ '/v1/' + 'finance/transfer_accounts_detail/add'
        let scopeParam = {
          from_id: this.rowPreBillParam.reserve_base[0].account_id,  //转出主帐id
          to_id: this.return_accountParam.id,  //转入主帐id addAccount得到的此时
          submit_biz_date: moment(new Date()).format('YYYY-MM-DD'),
          amount: this.haveNotPayValue, //转账金额
        }
        console.log('====this.rowPreBillParam.reserve_base[0]=',this.rowPreBillParam.reserve_base[0])
        console.log('==============传入的值scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          this.$message.success('转账成功')
        }).catch(error=>{

        })
        // this.getInfoByAccount() //转账之后为啥要查这个信息
        console.log('this.accoutInfoById_param')
      },
        //创建账户根据消费记录选择然后支付
        addSomePay(){
          let that = this
          // let url= `http://47.98.113.173:9519/v1/finance/pay_detail/pay_by_charges`
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/pay_detail/pay_by_charges'
          console.log('collectionChargeDatavalue消费明细的数组========',this.collectionChargeData)
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
            console.log('res,收款',res.data,res)
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
        //入账代码
        getIncomingAccount(param){
          let that = this
          // let url =  `http://47.98.113.173:9519/v1/finance/incoming_account_code/info_list`
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/incoming_account_code/info_list?page_size=999&subject=' + param
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              that.incomingAccoutList = res.data.data.list
              console.log('that.incomingAccoutList',that.incomingAccoutList)
            }).catch(error=>{
          })
        },
       //直接办理入住===>批量入住
      confirmPreToEnter(){
        this.isLoading = true
        console.log('preBillParam确认入住',this.preBillParam)
        // return  
        // this.postEnter() //等会废弃
        this.getCardList()
        // this.enterPreviewDialog = true //打开入预收界面 此时收房费
        let array_1 = []
        let roomNumberList = []
        for(var item of this.preBillParam.reserve_rate){
          item.room_number = item.dynamic_roomNumber
          array_1.push(item.room_number)//把循环所有项的值拼接为一个数组便于构造room_list
        }
        roomNumberList = this.handleDynamicNumber(array_1)
        console.log('roomNo_data_list======-1',this.roomNo_data_list)
        console.log('roomNumberList======0',roomNumberList)
        let new_roomNo_data_list = []
        this.roomNo_data_list.forEach(item=>{
          if(roomNumberList.includes(item.room_no)){
              new_roomNo_data_list.push(item)
          }
        })
        console.log('new_roomNo_data_list==1',new_roomNo_data_list)
        //构造了新数组然后进行下一次的筛选
        this.lock_arrary = []
        let lock_temp ={}
          for(var item in new_roomNo_data_list){
            if(new_roomNo_data_list[item].room_no){
              let key = new_roomNo_data_list[item].room_no
              lock_temp[key] =  new_roomNo_data_list[item].lock_no
            }
          }
        this.lock_arrary.push(lock_temp)
        console.log('this.lock_arrary',this.lock_arrary)
        console.log('array_1',array_1)
        console.log(' 选择房roomNo_data_list ',this.roomNo_data_list )
        //另加
        this.sum_money = 0//置空操作
        for(var item of this.preBillParam.reserve_rate){
          this.sum_money = this.sum_money  + item.room_price * item.dynamic_roomNumber.length
        }
        console.log('roomNumberList',this.roomNumberList,this.previewEnterBill.room_no_value)
        // this.previewEnterBill.room_no_value = this.roomNumberList[0]//有默认值===>此处默认第一间为主房
        this.previewEnterBill.money = this.sum_money//默认赋值
      },
      /**
       * @desc 扁平化
       */
      handleDynamicNumber(array){
          let array_2 = []
        //key value 对象的数组取value变为一个新的数组
        for(let item in array){
          array_2.push(array[item])
        }
        let str = array.join(',') //数组变为字符串
        return str.split(',')
      },
      postEnter(){
        console.log('jinru1111')
        if(!this.validatePreData()){
          this.isLoading = false
          return false
        }
        if(!this.validatePreviewData() ||  !this.validateEnterData()){
          this.isLoading = false
          return false
        }
        console.log('jinru222')
        let that = this
        let url= that.api.api_newBill_9204 + '/v2/' + `checkin/batch_booking_check_in/`
        // let url = that.api.api_bill_9202 + '/v1/' + 'checkin/batch_booking_check_in/'
        let scopeParam = _.cloneDeep(that.preBillParam) //此处必须深拷贝
        console.log('scopeParam22',scopeParam)
        scopeParam = this.handleDeleteAttribute(scopeParam)
        let array = scopeParam.room_list.filter(item=>item != this.previewEnterBill.room_no_value)
        console.log('array===flat',array)
        let twoArray = []
        twoArray.push(this.previewEnterBill.room_no_value)
        twoArray.push(array)
        twoArray.flat()
        let finalArray = [].concat.apply([], twoArray) //二维数组降维
        scopeParam.room_list = finalArray
        scopeParam.room_list = scopeParam.room_list.filter(item=>item !='')//数组中‘’去掉
        console.log('scopeParamscopeParam=预定转入住',scopeParam)
        that.room_no_floor = []
        // scopeParam.reserve_base[0].room_price = '' //暂时
        console.log('...',this.cardList)
        //这里注释掉是因为此时的room_floor不需要
        // for(var item of scopeParam.room_list){
        //   console.log('item=',item)
        //   for(var itemm of that.cardList)
        //     if(item === itemm.room_no){
        //       that.room_no_floor.push({
        //         room_no: item,
        //         floor_number: itemm.floor_number
        //       })
        //       break
        //     }
        // }
        for(var item of scopeParam.reserve_guest){
            for(var itemm of this.cardList){
              if(item.room_number === itemm.room_no){
                item.room_floor = itemm.floor_number
                break
              }
            }
          }
        // scopeParam.room_no_floor = that.room_no_floor//构造一个房间号对应的楼层数
        for(var item of scopeParam.reserve_rate){
          if(String(item.room_price) ==''){
            this.$message.warning('房价码不能为空!')
            return
          }
        }
        console.log('this.lock_arrary===锁号',this.lock_arrary)
        scopeParam.lock_arrary = this.lock_arrary[0] //锁号数组map
        this.getPriceFromType(scopeParam) //进行入住前得准备
        // console.log('scopeParamscopeParamscopeParam',scopeParam)
        // that.$axios.post(url,scopeParam).then(res=>{
        //   if(res.data.message === 'success'){
        //       if(res.data.data.error){
        //           this.$message.warning(res.data.data.error)
        //       }else{
        //         //需要判断，当不联房的时候，那么就替换，联房的时候
        //         Object.keys(res.data.data.data.main).length===0 ? res.data.data.data.main = res.data.data.data.member : res.data.data.data.main
        //         that.returnEnterParam = res.data.data.data.main
        //         // this.enterPreviewDialog = true //打开入预收界面 此时收房费
        //         console.log('that.returnEnterParam=====预定转入住',that.returnEnterParam)
        //         try {
        //           let mainAccount_id = Object.values(this.returnEnterParam)
        //           this.mainAccount_id = mainAccount_id[0]
        //           console.log('mainAccount_id',this.mainAccount_id)
        //           this.$confirm('是否添加预授权?','提示',{
        //             confirmButtonText: '是',
        //             cancelButtonText: '否',
        //             type: 'warning'
        //           }).then(()=>{
        //             this.flushByOrder()
        //             this.handleAuthorization()//打开预授权界面
        //             this.previewToEnterVisible = false //直接关闭预定转入住界面
        //           }).catch(()=>{
        //             this.flushByOrder()
        //             // this.$router.go(0)
        //             this.previewToEnterVisible = false //直接关闭预定转入住界面
        //             console.log('关闭')
        //           })
        //         } catch (error) {
        //           console.log('error')
        //         }
        //         that.$message.warning('预定转为入住成功!')
        //         // that.previewToEnterVisible = false
        //       }
        //     this.isLoading = false
        //   }else{
        //     this.isLoading = false
        //     this.enterPreviewDialog = false //打开入预收界面 此时收房费1
        //     that.$message.warning('预定转入住失败!')
        //   }
        // }).catch(error=>{
        //     this.isLoading = false
        // })
      },
       /**
         * @desc 真正得进行入住,分开是因为要组装选定时间范围的每天对应的价格
         * @master_rtrate  这里存着每天对应的房价
         * @room_list 存房间即入住的是哪几个房间
         * @reserve_guest 入住人数组，一行
         * @reseeve_base 
        */
      truePostEnter(scopeParam){
          let that = this
          // let url= that.api.api_bill_9202 + '/v1/' + `checkin/nobooking_checkin/`
          let url= that.api.api_newBill_9204 + '/v2/' + `checkin/batch_booking_check_in/`
          console.log('scopeParam===true==传入param',scopeParam)
          setTimeout(() => {
            that.$axios.post(url,scopeParam).then(res=>{
              if(res.data.message === 'success'){
                //需要判断，当不联房的时候，那么就替换，联房的时候
                that.returnEnterParam = res.data.data
                // this.enterPreviewDialog = true //打开入预收界面 此时收房费
                console.log('that.returnEnterParam=====预定转入住',that.returnEnterParam)
                try {
                  let mainAccount_id = Object.values(this.returnEnterParam.account_id.data.master)
                  this.mainAccount_id = mainAccount_id[0]
                  console.log('mainAccount_id',this.mainAccount_id)
                  this.$confirm('是否添加预授权?','提示',{
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                  }).then(()=>{
                    this.flushByOrder()
                    this.handleAuthorization()//打开预授权界面
                    this.previewToEnterVisible = false //直接关闭预定转入住界面
                  }).catch(()=>{
                    this.flushByOrder()
                    // this.$router.go(0)
                    this.previewToEnterVisible = false //直接关闭预定转入住界面
                    console.log('关闭')
                  })
                } catch (error) {
                  console.log('error')
                }
                that.$message.warning('预定转为入住成功!')
                // that.previewToEnterVisible = false
                this.isLoading = false
              }else{
                this.isLoading = false
                // this.enterPreviewDialog = false //打开入预收界面 此时收房费1
                // that.$message.warning('预定转入住失败!')
                this.$message.error(res.data.message)
              }
            }).catch(error=>{
                this.isLoading = false
            })
          }, 300);
        },
        /**
         * @desc 获取每个房型下的房间以及对应的房价码房价
         * 主要是为了获得房价
         */
        getPriceFromType(scopeParam){
          // this.rateAllPrice_list = []
          console.log('scopeparam----',scopeParam)
          this.getRateCodeAll(scopeParam)
        },
        getRateCodeAll(item){
          console.log('this.rateDateList---1',this.rateDateList)
          console.log('this.rateValueList----2',this.rateValueList)
          console.log('item====数据',item)
          let that = this
          let url = that.api.api_price_9101 + '/v1/' +  `room/rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.preBillParam.reserve_base[0].rate_code,
            begin_date:  moment(new Date(item.reserve_base[0].arr_time)).format('YYYY-MM-DD'),
            end_date: moment(new Date(item.reserve_base[0].leave_time)).format('YYYY-MM-DD'),
            room_type_list: []
          }
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message == 'success'){
              this.rateAllPrice_list = res.data.data.price
              setTimeout(() => {
                console.log('this.rateAllPrice_list----',this.rateAllPrice_list)
                let rate_list = []
                let rate_other_list = []
                item.reserve_rate.forEach(itemIndex=>{
                  rate_list.push(
                    itemIndex.room_type_code
                    // room_number: item.room_number,
                    // rate_code: item.rate_code,
                    // code_name: item.code_name
                  )
                  rate_other_list.push({
                    room_number: itemIndex.room_number,
                    rate_code: this.preBillParam.reserve_base[0].rate_code,
                    room_type: itemIndex.room_type
                  })
                })
                // scopeParam.reserve_base.forEach(item=>{
                //   rate_other_list.push(
                //     item.room_number,
                //     item.rate_code,
                //     item.code_name
                //   )
                // })
                console.log('rate_list-----这是获取key值的集合---------',rate_list)
                let need_rateAllPrice_Object  = []
                for (let key in this.rateAllPrice_list) {
                  if (rate_list.includes(key)) {
                    need_rateAllPrice_Object.push(this.rateAllPrice_list[key])
                  }
                }
                console.log('rate_other_list',rate_other_list)
                console.log('need_rateAllPrice_Object',need_rateAllPrice_Object)
                for(var itemIndex of rate_other_list){
                  for(var itemm of need_rateAllPrice_Object){
                    if(itemIndex.room_type == itemm.room_type){
                      itemIndex.price = itemm
                      delete itemIndex.price.room_type
                    }
                  }
                }
                this.rate_other_list = rate_other_list
                item.master_rtrate = this.rate_other_list
                this.truePostEnter(item)
                console.log('组装后的==>rate_other_list',this.rate_other_list) 
                // need_rateAllPrice_Object = need_rateAllPrice_Object.concat(rate_other_list)
                console.log('need_rateAllPrice_Object---------',need_rateAllPrice_Object)
                // this.rateAllPrice_list.filter(item=>{
                //   console.log('Object.keys(item)',Object.keys(item))
                //   rate_list.includes(Object.keys(item))  
                //   // Object.keys(item)
                // })
              },300);
              console.log('success')
            }
            let temprate = res.data.data.price
            // this.rateAllPrice_list = res.data.data.price
            console.log('temprate7天数据',temprate)
            }).catch(error=>{
          })
        },
      //预定转入住成功后刷新orderlist
      flushByOrder(){
        this.$emit('listenToFlushOrder', '已经入住了,更新orderlist')
      },
      //打开预授权界面
      handleAuthorization(){
        // this.authorizationParam.mainAccount_id='222'
        // console.log('this.authorizationParam父级传递',this.authorizationParam)
        console.log('this.mainAccount_id传过来的主账id===联房的时候为主账房id',this.mainAccount_id)
        let mainAccountId = this.mainAccount_id
        localStorage.setItem('mainAccountId',mainAccountId) //通过缓存弄暂时
        this.authorizationDialog = true;
      },
      //进入房态=>块状平铺展示//获取cardList 获取房间基础信息(大量)
      getCardList(){
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
        let url = that.api.api_price_9101 + '/v1/' + `room/room_status/get_room_map_list/?page_size=1000`
        that.$axios({
          method : 'get',
            url : url,
            params: params
        }).then(res=>{
          if(res.data.message === 'success'){
            that.cardList = res.data.data.results
            that.postEnter()  //搬到这里来了=>开始入住
          }else{
            that.$message.error('获取房态列表失败!')
          }
        }).catch(error=>{
        })
      },
        /**
         * 判断入住人信息数据=====>身份证不能重复
         */
        validateEnterData(){
          //有入住人的时候
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
              return util.validateTelNumber(item.telephone,'请输入正确手机格式',this)
            }
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
            if(!item.pic_now){
              // this.$message.warning(item.name + '没有上传照片,' + '请上传照片!')
              this.$message.warning(item.name + '没有上传照片或者没有录入正确人脸!,' + '请重新上传照片!')
              return false
            }
            if(!item.face_id){
              this.$message.warning(item.name + '上传照片不对,' + '请重新上传照片!')//没有获取sxm的token
              return false
            }
            // return(
              //   // util.validateBlank(item.telephone,'入住人中联系电话是必填项',this)&&
            //   // util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
            //   util.validateBlank(item.id_no,'证件号码是必填项',this)&&
            //   util.validateBlank(item.sex,'性别是必填项',this)&&
            //   util.validateBlank(item.name,'姓名是必填项',this)&&
            //   util.validateBlank(item.id_code,'证件类型是必填项',this)&&
            //   util.validateBlank(item.room_number,'房间号是必填项',this)&&
            //   util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
            // )
          }
          return true
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
      //修改订单
      updateOrder(){
        this.updateOrderVisible = true;
        console.log('thhis.tempExpandEnter',this.tempExpandEnter)
      },
      //修改到店时间
      updateTime(){
        this.updateTimeVisible = true
      },
      //修改联系信息
      updateLinkInfo(){
        this.updateLinkInfoVisible = true
      },
      //vue 多选框自带方法 => 全选
      handleCheckAllChange(val) {
        // console.log('全选val1',val)
        console.log('this.checkAll1',this.checkAll)
        console.log('this.isIndeterminate1',this.isIndeterminate)
        this.orderHouseList = val ? this.expandPreInfo : [];
        if(this.orderHouseList.length === 0){
          this.cancleAndEnter_button = false
        }else{
          this.cancleAndEnter_button = true
        }
        console.log('this.orderHouseList',this.orderHouseList)
        this.isIndeterminate = false;
      },
      //vue 多选框自带方法 =>单选
      handleCheckedChange(value) {
        // console.log('this.isIndeterminate2',this.isIndeterminate)
        // console.log('this.checkAll2',this.checkAll)
        this.tempExpandEnter = value
        this.tempPreBillparam = _.cloneDeep(this.preBillParam)
        this.tempPreBillparam.reserve_rate = this.concatData(this.tempExpandEnter) //暂时
        console.log('单选val2=>数据',value)
        console.log('选择',this.preBillParam.reserve_rate) 
        let checkedCount = value.length;
        if(checkedCount === 0){
          this.cancleAndEnter_button = false
        }else{
          this.cancleAndEnter_button = true
        }
        this.checkAll = checkedCount === this.previewOrders.length;
        console.log('checkedCount2 为 0时 ',checkedCount) 
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.previewOrders.length;
      },
      //自动排房
        selfSelectHouse(val){
          this.selfSortArray = []
          console.log('this.roomNo_data_list拍房',this.roomNo_data_list)
          console.log('val',val)
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
      concatData(param){
        var map = {},
        array = [];
        for(var item of param){
            if(!map[item.room_type]){
              array.push({
                // id: item.id,
                // number: item.number
               dynamic_roomNumber: item.dynamic_roomNumber,
                room_number: item.room_number,
                can_live_num: item.can_live_num,
                room_type_value: item.room_type_value,
                room_type: item.room_type,
                room_class: item.room_class,
                ratecode_id: item.ratecode_id,
                room_price: item.room_price,
                room_count: item.room_count,
                roomPrice: item.roomPrice,
                // code: item.code,
                // code_name: item.code_name,
                // descript: item.descript,
                // descript_en: item.descript_en,
                reserve_base_id: item.reserve_base_id,
                checkin_date: item.checkin_date,
                checkin_time: item.checkin_time,
                code_room_special_ids: item.code_room_special_ids,
                code_room_facilities_ids: item.code_room_facilities_ids,
                is_arranged: item.is_arranged,
                rmocc_ids: item.rmocc_ids,
                add_person_num: item.add_person_num,
                add_person_price: item.add_person_price,
                add_bed_num: item.add_bed_num,
                add_bed_price: item.add_bed_price,
                code_pkg_id: item.code_pkg_id,
                add_pkg_num: item.add_pkg_num,
                add_pkg_price: item.add_pkg_price,
                rate_service_fee: item.rate_service_fee,
                rate_tax: item.rate_tax,
                lower_price_id: item.lower_price_id,
                lower_price_reason: item.lower_price_reason,
                lower_price_amount: item.lower_price_amount,
                real_rate: item.real_rate,
                remark: item.remark,
              })
              map[item.room_type] = item
            }else{
              console.log('array111',array)
              for(var itemm of array){
                if(itemm.room_type == item.room_type){
                  itemm.room_number.push(item.room_number[0])
                  break
                }
              }
            }
        }
        return array
        console.log(array);
        },
        /**
         * 入账收款的时候验证
         */
        validatePayData(){
          return(
            util.validateBlank(this.previewEnterBill.enterAccountCode,'入账代码是必填项',this)&&
            util.validateBlank(this.previewEnterBill.payMode,'支付方式是必填项',this)&&
            util.validateBlank(this.previewEnterBill.payReasonValue,'付(退)款原因是必填项',this)&&
            util.validateBlank(this.previewEnterBill.money,'金额是必填项',this)
            // util.validateBlank(this.previewEnterBill.room_no_value,'必须选择房间进行联房',this)
          )
        },
        senToParent(){
          this.$emit('listenToPreview', '已经预定了')
        },
        //计算价钱总数
        mountMoney(){
          this.countMoney = 0 //此处必须重新申明值为0避免全局变量的影响
          for(var item of this.preBillParam.reserve_rate){
            this.countMoney = this.countMoney + item.room_price * item.room_count
          }
        },
         //增加一个(主)账户 需要消费的时候
        addAccount(){
          console.log('进入创建预定转入住主账!')
         this.account_param.charge_details = [{
            // code_income_type_id: this.preBillParam.consumeInfoList[0].code_income_type_id,
            code_income_type_id: 11,//入账代码=>代表食品
            reference_id: 1,
            // charge_amount: this.preBillParam.consumeInfoList[0].price,
            // charge_amount: this.countMoney,//此处应该是预计收款总额
            charge_amount: this.countMoney1
          }]
          this.account_param.charge_details = JSON.stringify(this.account_param.charge_details)
          let that = this
          // let url= `http://47.98.113.173:9519/v1/finance/account/add`
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/account/add'
          let scopeParam = that.account_param
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('预定转入住主账res',res.data)
            this.return_accountParam = res.data.data
            this.return_accountParamId.push(this.return_accountParam.id)
            console.log('======创建主账户account_param 会返回总高消费的钱',this.return_accountParam)
            this.$message.success('创建账户成功')
          }).catch(error=>{

          })
        },
        //传入后台去掉多余属性 更改值
        handleDeleteAttribute(param){
          param.reserve_base[0].arr_time = moment(param.reserve_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          param.reserve_base[0].leave_time = moment(param.reserve_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          console.log('param传入后台去掉多余属性',param,'11')
          // reserve_rate
          for(var item of param.reserve_guest){
              delete item.liveCount            
          }
          let array_1 = []
          for(var item of param.reserve_rate){
            // item.room_number = item.dynamic_roomNumber.join(',')
            item.room_number = item.dynamic_roomNumber
            array_1.push(item.room_number)//把循环所有项的值拼接为一个数组便于构造room_list
            item.room_number = item.dynamic_roomNumber.join(',')//传入后台说需
            delete item.can_live_num
            delete item.room_type_value   
            delete item.dynamic_roomNumber
            // delete item.room_count   
            delete item.roomPrice
            delete item.visible
          }
          let array_2 = []
          //key value 对象的数组取value变为一个新的数组
          for(let item in array_1){
            array_2.push(array_1[item])
          }
          let str = array_1.join(',') //数组变为字符串
          param.room_list = str.split(',') //字符串变为数组
          console.log('paramdelete',param)
          return param
        },
        datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
          var date1 = new Date(sDate1)
          var date2 = new Date(sDate2)
          var s1 = date1.getTime(),s2 = date2.getTime();
          var total = (s2 - s1)/1000;
          var day = parseInt(total / (24*60*60));//计算整数天数
          if(day === 0){
            day = 1
          }else if(day == 1){
            day = 1
          }
          return day
            // var dateSpan,
            // tempDate,
            // iDays;
            // sDate1 = Date.parse(sDate1);
            // sDate2 = Date.parse(sDate2);
            // dateSpan = sDate2 - sDate1;
            // dateSpan = Math.abs(dateSpan);
            // iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            // return iDays
        },
        //选择房型一行房型相关信息
        getRoomInfo(){
          // this.getRoomType() //准备:循环得到匹配的房型中文名
          let that = this
          let url =  that.api.api_price_9101 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
          that.$axios({
          method : 'get',
              url : url,
          }).then(res=>{
          if(res.data.message === 'success'){
              that.roomInfoList = res.data.data.results
              // let start = moment(this.preBillParam.reserve_base[0].leave_time[0]).format('YYYY-MM-DD')
              // let end = moment(this.preBillParam.reserve_base[0].leave_time[1]).format('YYYY-MM-DD')
               // let start = '2019-03-25'
              // let end =  '2019-03-28'
              let start = '2019-04-06'
              let end =  '2019-04-09'
              let newArray = []
              for(var item of that.roomInfoList){
                for(var itemm of that.roomTypeList){
                  if(item.room_type === itemm.code){
                    item.room_type_name = itemm.descript
                  }
                }
                // if(item.biz_data >= start && item.biz_data < end){
                // }
                newArray.push(item)
              }
              //在时间范围内的数据
              let roomInfoArray = newArray.filter(item=> item.biz_data >= start && item.biz_data < end) //过滤时间范围内的数据
              // that.roomInfoList = roomInfoArray
              if(roomInfoArray.length > 0){
                this.handlerRoomData(roomInfoArray) //处理房型信息
              }else{
                this.roomInfoList = []
              }
          }else{
              that.$message.error('获取房型信息列表失败!')
          }
          }).catch(error=>{
          })
        },
        //排序方法数组对象根据对象属性
        compare(property){
          return function(obj1,obj2){
              var value1 = obj1[property];
              var value2 = obj2[property];
              return value1 - value2;     // 升序
          }
        },
        handlerRoomData(array){
          //先排序 在去重 ===此处 时间范围内有重复数据 得筛选去重得到重复中最小的
          array[0].can_live_num = 10
          array[1].can_live_num = 100
          var sortObj = array.sort(this.compare('can_live_num'));
          //开始去重
          var result = [];
          var obj = {};
          for(var i =0; i<sortObj.length; i++){
            if(!obj[sortObj[i].room_type]){
                result.push(sortObj[i]);
                obj[sortObj[i].room_type] = true;
            }
          }
          this.roomInfoList = result
        },
        //获取code对应房型数据
        getRoomType(){
          let that = this
          let url = that.api.api_price_9101+ '/v1/' + `room/room_status/get_room_type_list/`
          // let url = this.billUrl + 'room/get_roomtype_list/'
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                console.log('res.data.data.results321312',res.data.data.results)
                  that.roomTypeList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        getCanLiveRoom(param){
          let start = moment(this.preBillParam.reserve_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.reserve_base[0].leave_time[1]).format('YYYY-MM-DD 14:00:00')
          let that = this
          let url= that.api.api_price_9101 + '/v1/' + `room/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: param,
            start_time: start,
            end_time: end
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let array
            array = res.data.data.data
            console.log('array房间',res.data.data.data)
              //组装带标签的数组
              for(var item of array){
                // for(var itemm of that.roomTagList){
                //   if(item.room_no == itemm.room_no){
                //     item.tagName = itemm.feature_name
                //   }
                // }
              }
              that.roomNo_data_list = array  //选房号tabel数组
          }).catch(error=>{

          })
        },
        //选择房型一行房型相关信息
        getRoomInfo(){
          // this.getRoomType() //准备:循环得到匹配的房型中文名
          console.log('roomTypeList==1=',this.roomTypeList)
          let start = moment(this.preBillParam.reserve_base[0].leave_time[0]).format('YYYY-MM-DD')
          let end = moment(this.preBillParam.reserve_base[0].leave_time[1]).format('YYYY-MM-DD')
          let that = this
          let url =  that.api.api_price_9101 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
          that.$axios({
            url : url,
            method : 'get',
            params:{
              biz_data__gte: start,
              biz_data__lt: end
            },
          }).then(res=>{
          if(res.data.message === 'success'){
              that.roomInfoList = res.data.data.results
              // let start = '2019-04-06'
              // let end =  '2019-04-09'
              for(var item of that.roomInfoList){
                for(var itemm of that.roomTypeList){
                  if(item.room_type === itemm.code){
                    item.room_type_name = itemm.descript
                  }
                }
              }
              // //在时间范围内的数据
              // let roomInfoArray = newArray.filter(item=> item.biz_data >= start && item.biz_data < end) //过滤时间范围内的数据
              // // that.roomInfoList = roomInfoArray
              // if(roomInfoArray.length > 0){
              //   this.handlerRoomData(roomInfoArray) //处理房型信息
              //   console.log('roomInfoList',this.roomInfoList)
              // }else{
              //   this.roomInfoList = []
              // }
          }else{
              that.$message.error('获取房型信息列表失败!')
          }
          }).catch(error=>{
          })
        },
        //得到房间所对应的标签
        getTagByRoom(){
          console.log('enter tag')
          let that = this
          let url = that.api.api_room_8091+ '/v1/' + `room/get_roomfeatures_list_tree/`
          // let url = this.billUrl + 'room/get_roomfeatures_list_tree/'
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                console.log('res.data.data',res.data.data)
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
          let url = that.api.api_price_9101 + '/v1/' + 'room/room_status/get_room_occupy_list/'
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
            console.log('item,,',item)
            // if(item.room_type_value === ''){
            //   let tempvalue = this.roomTypeList.filter(p=>p.descript===item.room_type)
            //   item.room_type_value = tempvalue[0].code
            // }
            console.log('item一行数据',item)
            if(item.room_type === ''){
              this.$message.warning('请先选择房型!')
              return false
            }else{
              this.getCanLiveRoom(item.room_type_code) //根据房型选未占用房间
              // this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
              // this.getRoomOccupy()//得到房间占用
              this.getTagByRoom()//得到房间对应标签
              // this.getRoomList(item)
              this.can_live_number = item.can_live_num//可预定数
              this.pre_live_number = item.room_count//选择的数
            }
            this.sortNumber = 0; this.noSortNumber = 0
            this.switchValue = '0'
            this.switchNumberDialog = true;
            this._room_type = item.room_type_code
        },
        //暂时废弃======>选房号dialog点击左边根据房型得到不同的房间信息
        selectHouseType(item){
          console.log('itemmmm',item)
          this.can_live_number = item.can_live_num//可预定数
          this.pre_live_number = item.room_count//选择的数
          console.log('item.room_type_value',item.room_type_value)
          // if(JSON.parse(localStorage.getItem(item.room_type_value)) || JSON.parse(localStorage.getItem('selection'))){
          //   console.info("pass缓存");
          //   this.roomNo_data_list  = JSON.parse(localStorage.getItem(item.room_type_value))
          //   this.multipleSelection = JSON.parse(localStorage.getItem('mulSelection'))
          //   this.rowIndex = JSON.parse(localStorage.getItem('rowIndex'))
          //   this.toggleSelection(this.rowIndex)
            console.log('this.multipleSelection缓存',this.multipleSelection)
          //   let array = []
          //   for(var item of this.multipleSelection){
          //     array.push(item.room_no)
          //   }
          //   console.log('点击不同每一行的array组装房间号',array)
          //   console.log('item 哪一行的值',item)
          // }else{
          //   console.info("pass不缓存");
            this.getRoomList(item)//根据房型筛选房间数（没有被占用）
          // }
          // console.log('itemxuanz',item)
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
        //单=》右边全选房号dialogtabel 并控制不可选房间号
        handleselectAll(selection){
          // if(this.can_live_number > this.pre_live_number){
          if(selection.length > this.pre_live_number){
            let indexNumber = selection.length - this.pre_live_number
            selection.splice(this.pre_live_number,indexNumber)//截取最大可选数的房间从数组可选数最大长度开始截取
            this.multipleSelection = selection //截取后的值
            // localStorage.setItem('selection',JSON.stringify(this.multipleSelection));
          }else{
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
          console.log('this.rowIndex',this.rowIndex)
          console.log(this.rowIndex,'this',this.multipleSelection)
          // localStorage.setItem('mulSelection',JSON.stringify(this.multipleSelection));
          // localStorage.setItem('rowIndex',JSON.stringify(this.rowIndex));
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
          // console.log('this.multipleSelection',this.multipleSelection)
          // if(this.multipleSelection.length>0){
            //   this.$message.warning('已经排房!')
          //   this.switchValue = '0'
          //   return false
          // }
          this.switchValue = '0'
          let _room_type = this._room_type
          console.log('_room_type',_room_type)
          console.log('...这里...',this.preBillParam.reserve_rate)
          let index = _.findIndex(this.preBillParam.reserve_rate,function(o){return o.room_type_code == _room_type})
          console.log('index',index)
          let array = []
          for(var item of this.multipleSelection){
            array.push(item.room_no)
          }
          array = array.filter(item=>item != undefined) //需要过滤
          console.log('array排房===>',array)
          this.preBillParam.reserve_rate[index].dynamic_roomNumber = array
          console.log('this.preBillParam.reserve_rate[index].dynamic_roomNumber',this.preBillParam.reserve_rate[index].dynamic_roomNumber)
          for(var item of this.preBillParam.reserve_guest){
            item.room_number = ''
          }
          this.previewEnterBill.room_no_value = '' //清空一下
          this.getEnter_RommNumber()
        },
        //入住人可选房间号==>基于选择房型的
        getEnter_RommNumber(){
          console.log('点击行时this.liveoptions_NoChange',this.liveoptions_NoChange)
          let array = []
          let array3 = []
          // if(this.liveoptions_NoChange.length > 0){
          //   this.flag = true
          //   this.liveoptions = this.liveoptions_NoChange
          // }else{
            this.flag = false
            console.log('enter else')
            for(var item of this.preBillParam.reserve_rate){
              array.push(item.dynamic_roomNumber)
            }
            let array2 = array.reduce(function (a, b) { return a.concat(b)}) //二维数组变为一组
            //组装数组
            for(var item of array2){
             array3.push({
               roomNo: item,
               liveCount: '0',
             })
            }
          // }
          this.liveoptions = array3
          this.flag === true ? this.liveoptions_Value = this.liveoptions_NoChange : this.liveoptions_Value = this.liveoptions
          console.log('下拉时',this.liveoptions)
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
          // this.liveoptions_NoChange = this.liveoptions
          console.log('点击行时this.liveoptions',this.liveoptions)
          console.log('点击行时this.liveoptions_NoChange',this.liveoptions_NoChange)
          // let index = _.findIndex(this.preBillParam.reserve_guest,function(o){return o.room_number == row})
          // console.log('index',index)
          
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
          let url = that.api.api_price_9101 + '/v1/' + `room/room_status/get_room_map_list/?page_size=1000`
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
            room_no: 0,
            pic_photo: null,
            pic_now: null,
            liveCount: 0,//可选数
            room_number: '',//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: '22',
            // descript_en: '22',
            last_name: '',
            first_name: '',
            name2: '',
            name_combi: '',
            is_save: false,
            language: '',
            title: '',
            salutation: '',
            race: '',
            religion: '',
            career: '',
            nation: '',
            visa_no: '',
            visa_grant: '',
            enter_port: '',
            where_from: '',
            where_to: '',
            salary: '',
            education: '',
            marital: '',
            company_na: '',
            remark: '',
            is_anonymo: false,
            weixin: '',
            mobile: '',
            email: '',
            country_id: '',
            division_id: '',
            state_id: '',
            city_id: '',
            zipcode: '',
            reserve_base_id: '',
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
            room_type_value: '',//房型名称对应ID
            room_type: '',//房型名称
            room_class: '1',
            room_number: '',//房间数几间 数组变字符串
            dynamic_roomNumber: [],//动态房间号=》应是一个数组
            // ['111', '222', '333','444', '555','666', '777']
            ratecode_id: '',//房价码
            room_price: '',
            room_count: '',//房间数量=add=
            roomPrice: '', //总价钱=add=
            // code: '123',
            // code_name: '123',
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
          console.log('item==删除',item)
          if(item.dynamic_roomNumber.length>1){
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
          }
          for(var item of this.preBillParam.reserve_guest){
            item.room_number = ''
          }
          this.getEnter_RommNumber() //此时作用便于联房判断数据
        },
        //验证预定数据
        validatePreviewData(){
          console.log('this.preBillParam111111判断',this.preBillParam.reserve_rate)
            //判断选择房型为空时
          for(var item of this.preBillParam.reserve_guest){
            if(item.room_number === '' || item.room_number === null){
                this.$message.warning('请选择房号!')
                return false
            }
            // else{
            //   return true
            // }
          }
          for(var item of this.preBillParam.reserve_rate){
            if(item.dynamic_roomNumber.length == 0){
              this.$message.warning('请根据房型选择房间号!')
              return false
            }
          }
            //有入住人的时候 去掉
          // if(this.is_addlive === true){
            // for(var item of this.preBillParam.reserve_guest){
            //     util.validateBlank(item.telephone,'入住人中联系电话是必填项',this)&&
            //     util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
            //     util.validateBlank(item.id_no,'证件号码是必填项',this)&&
            //     util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
            // }
          // }
          return true
        },
        validatePreData(){
          console.log('this.liveoptions_Value铺地暖',this.liveoptions_Value)
          if(this.liveoptions_Value.length>1){
            return util.validateBlank(this.previewEnterBill.room_no_value,'请选择主帐房',this)
          }else{
            return true
          }
          // return (
          //   util.validateBlank(this.preBillParam.reserve_base[0].rsv_person_name, '预定人是必填项', this)&&
          //   util.validateBlank(this.preBillParam.reserve_base[0].telephone_master,'联系电话是必填项',this)&&
          //   util.validateTelNumber(this.preBillParam.reserve_base[0].telephone_master,'请输入正确手机格式',this)
          // )
        },
        //预定=》获取早餐list
        getBreakfastList(){ 
          let that = this
          // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
          let url = that.api.api_price_9101 + '/v1/' + 'room/rate_code/get_breakfast_list/'
          // let url = `http://47.98.113.173:9101/v1/rate_code/get_breakfast_list/`
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
          return false
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
            console.log('row',row)
            let index = _.findIndex(this.preBillParam.remarkList,function(o) { return o.time == row.time}) //扎到索引
            console.log('index',index)
            this.preBillParam.remarkList.splice(index,1)//删除指定索引
        },
        //预订单=》新增备注
        addAndUpdateRemarkInfo(){
            console.log('this.addAndUpdate',this.addAndUpdate)
            //  remarkContent: '',
            //     remarkType: '订单备注',
            //     status: '预定',
            //     time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
            //     operationPeople: '',
            if(this.addAndUpdate === true){
                let remarkValue={
                    remarkContent: this.remarkContent_value,
                    remarkType: '订单备注',
                    status: '预定',
                    time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
                    operationPeople: '',
                }
                if(remarkValue.remarkContent){
                    this.preBillParam.remarkList.push(remarkValue)
                }else{
                    this.$message.warning('请输入备注信息')
                }
                console.log(this.preBillParam.remarkList)
            }else{
                this.middle_remarkRow.remarkContent =  this.remarkContent_value
            }
        },
        //获取预订单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
          if(String(item.room_price)){
            //点击时判断不能重复选择房型
            let indexs = _.findIndex(this.preBillParam.reserve_rate,function(o){return o.room_type_value == param.room_type})
              if(indexs >= 0){
                this.$message.warning('请不要重复选择!')
                return
              }
          }
          console.log('item',item)
          console.log('param2131231',param)
          item.can_live_num = param.can_live_num
          item.room_type = param.room_type_name
          item.room_type_value = param.room_type
          switch (param) {
          case '风雅智能大床房':
              this.houseType_HeadValue = '标准正价[大床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥100'
              break;
          case '舒适大床房':
              this.houseType_HeadValue = '标准正价[标准双床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥80-￥95'
              break;
          case '风雅商务双床房':
              this.houseType_HeadValue = '标准正价[特惠双床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥80-￥95'
              break;
          case '风雅商务套房':
              this.houseType_HeadValue = '标准正价[特惠大床房]'
              this.houseType_priceValue_1= '￥100'
              this.houseType_priceValue_2= '￥80-￥95'
              break;
          default:
              break;
          }
        },
        //获取房价码list
        getRateCode_list(){
          let that = this
          that.rateCode_list = []
          let url = that.api.api_price_9101+ '/v1/' + `room/rate_code/get_rate_code_list/`
          that.$axios.get(url,{
            params: {
              market: that.preBillParam.reserve_base[0].code_market,
              src__icontains: that.preBillParam.reserve_base[0].code_src,
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
        getMarketSrc(param){
          console.log('param-------',param)
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
            if(this.preBillParam.reserve_base[0].code_market){
                params={
                  parent_code: 'src_code',
                  code_category: that.preBillParam.reserve_base[0].code_market //要改
                  // code_category: 6977
              } 
            }else{
              // this.$message.warning('请先选择市场码!')
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
        //预订单获取对应房类型
        getHouseTypePrice(item,index){
          // item.room_type = value
          console.log('item',item)
          console.log('index',index)
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.reserve_rate[index].room_type = value//替换
          // console.log('this.preBillParam.reserve_rate',this.preBillParam.reserve_rate)
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
         /**
         * 付款支付方式接口
         */
        getPayMode(){
          let that = this
          // let url= `http://47.98.113.173:9519/v1/finance/pay_mode/info_list`
          // let url = that.api.api_9022_9519+ '/v1/' + 'finance/pay_mode/info_list'
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
        /**
         * 付款原因接口
         */
        getPayReason(){
          let that = this
          // let url= `http://47.98.113.173:9519/v1/finance/code_pay_for/info_list`
          let url = that.api.api_9022_9519+ '/v1/' + 'finance/code_pay_for/info_list?page_size=999'
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payInfoList = res.data.data.list
          }).catch(error=>{
          })
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
  .inline-div{
    display: flex; 
    justify-content: space-between; 
    color: #969696;
    margin-top: 20px;
  }
  .inline-div span{
    margin-left: 5px;
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
  .preview-enter-dialog{
    .top-nav{
      background-color: #eff5f7;
      height: 28px;
      line-height: 28px;
      color: #2e5285;
      span{
        margin-left: 10px
      }
    }
    //包裹
    .wrap_div{
      display: flex;  
      justify-content: space-center;
      li{
        line-height: 65px;
      }
      li:first-child{
        margin-top: 20px
      }
    }
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
   .preview-enter-dialog>>> .el-dialog__header{
    background-color: #8895A8;
   }
  .preview-enter-dialog>>>.el-dialog__title {
    color: white;
  }
  .preview-enter-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
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
  .previewInfo-dialog>>> .el-dialog__footer{
    text-align: left;
  }
  .houseTypeClass>>> .el-dialog__footer{
    background-color: #F5F5F5;
    line-height: 35px;
  }
  .left-nav>>>.el-checkbox__label{
    width: 18vw;
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