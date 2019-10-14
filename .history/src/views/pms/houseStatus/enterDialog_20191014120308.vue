<template>
    <div>
        <el-dialog width="70%" class="enter-dialog" title="新建入住单"  :visible.sync="enterFormVisible"
            @close="$emit('update:show', false);closeAndFlushData()"
            :show="show">
            <div class="wrap_div">
              <div style="width: 100%">
                <ul>
                  <li>
                      <el-col :span="12" class="elColMiddle">
                        <el-input style="padding-left: 55px" v-if="preBillParam.master_base[0].code_src == 'HY' || preBillParam.master_base[0].code_market  == 'XYGS'" clearable v-model="infoShow"  @focus="queryCardPop" placeholder="请输入信息"></el-input>
                      </el-col>
                      <el-col :span="6">
                        <el-button v-if="preBillParam.master_base[0].code_src   == 'HY'|| preBillParam.master_base[0].code_market  == 'XYGS'" style="margin-left: 10px" type="primary">搜索</el-button>
                      </el-col>
                  </li>
                  <li>
                    <el-col :span="8">
                      &nbsp;&nbsp;&nbsp;&nbsp;市场码:
                      <el-select @change="flushRateCode" clearable @focus="getMarketSrc('market')"  v-model="preBillParam.master_base[0].code_market " style="width: 65%"  placeholder="请选择">
                          <el-option
                            v-for="item in marketSrcList"
                            :key="item.id"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                      </el-select>
                      </el-col>
                      <el-col :span="7">
                        <span>来源码:</span>
                        <el-select @focus="getMarketSrc('src')" clearable @change="watchValue"  v-model="preBillParam.master_base[0].code_src" style="width: 70%"  placeholder="请选择">
                          <el-option
                            v-for="item in marketSrcList"
                            :key="item.id"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="9">
                      <span>房价码:</span>
                       <el-select @change="handleRateCode"  clearable @focus="getRateCode_list()"  v-model="preBillParam.master_base[0].rate_code"   placeholder="请选择">
                        <el-option
                          v-for="(item,index) in rateCode_list"
                          :key="index"
                          :label="item.description"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </el-col>

                  </li>
                  <li>
                    <el-col :span="24" class="elColMiddle" >
                    <!-- 预抵时间:<el-date-picker style="width: 10vw" v-model="preBillParam.master_base.arr_time" type="date" placeholder="选择日期"> -->
                    <!-- </el-date-picker>&nbsp;&nbsp; -->
                    <span style="margin-left: -10px">入离时间:</span>
                    <el-date-picker :disabled="preBillParam.master_base[0].master_lable === 1 ? true : false" style="width: 28vw" :picker-options="rangeDate"  :clearable ="false"
                        @change="haveChangeTime"
                        v-model="preBillParam.master_base[0].leave_time" 
                        :default-time="[startDate_kaishi, '14:00:00']"
                        type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
                    </el-date-picker>
                    <span v-if="preBillParam.master_base[0].master_lable === 0">共 <span style="width: 80px">{{countDateRange}}</span> 晚</span>
                    <!-- 保留至:<el-date-picker style="width: 10vw" v-model="value2" type="date" placeholder="选择日期"></el-date-picker> -->
                    </el-col>
                  </li>
                  <li>
                    <el-col :span="10">
                      入住类型:
                      <el-select @change="flushTime_hour"  v-model="preBillParam.master_base[0].master_lable" style="width: 65%"  placeholder="请选择">
                          <el-option
                          v-for="(item,index) of labelList"
                          :key="index"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                    </el-col>
                      <el-col v-if="preBillParam.master_base[0].master_lable === 1" :span="12">
                        <span>钟点房房价码:</span>
                        <el-select clearable style="width: 55%" @focus="getRateCode_hour" @change="getHour_time"  placeholder="房价码"  v-model="rateCode_hour">
                          <el-option
                            v-for="(item,index) in rateCodeList_hour"
                            :key="index"
                            :label="item.description"
                            :value="item.check_out_time">
                          </el-option>
                        </el-select>
                      </el-col>
                  </li>
                  <li>
                    <el-col :span="10" v-if="liveoptions_Value.length>1">
                      <span>选择主帐房:</span>
                      <el-select clearable style="width: 65%" @focus="getEnter_RommNumber"  placeholder="入住房号"  v-model="previewEnterBill.room_no_value">
                        <el-option
                          v-for="(item,index) in liveoptions_Value"
                          :key="index"
                          :label="item.roomNo"
                          :value="item.roomNo">
                          <span style="float: left">{{ item.roomNo }}</span>
                        </el-option>
                      </el-select>
                    </el-col>
                    <!-- <el-col :span="12">
                      <span>市场来源:</span>
                      <el-select @focus="getMarket('market')"  v-model="marketValue" style="width: 55%"  placeholder="请选择">
                          <el-option
                          v-for="item in marketSrcList"
                          :key="item.id"
                          :label="item.descript"
                          :value="item.code">
                          </el-option>
                      </el-select>
                    </el-col> -->
                  </li>
                  <li>
                      <!-- <el-col :span="12">
                        客户来源:
                        <el-select @focus="getMarket('src')"  v-model="srcValue" style="width: 65%"  placeholder="请选择">
                            <el-option
                            v-for="item in marketSrcList"
                            :key="item.id"
                            :label="item.descript"
                            :value="item.code">
                            </el-option>
                        </el-select>
                      </el-col> -->
                  </li>
                </ul>
                  <!-- <hr/> -->
              </div>
              <!-- <div >
                房价码:
                <el-select  clearable @focus="getRateCode_list()"  v-model="preBillParam.master_base[0].rate_code"   placeholder="请选择">
                    <el-option
                      v-for="(item,index) in rateCode_list"
                      :key="index"
                      :label="item.description"
                      :value="item.code">
                    </el-option>
                </el-select>
              </div> -->
              <!-- <div>
                <div class="block" style="height: 200px; width: 410px; border: 1px solid #CCCCCC; margin-bottom: 10px">
                  <video id="video" style="display: left" width="200px" height="200px" autoplay="autoplay"></video>
                  <canvas id="canvas" style="display: right"  width="200px" height="200px"></canvas>
                </div>
                <el-button type="primary" size="mini" @click="getMedia()" >开启摄像头</el-button>
                <el-button type="primary" size="mini" @click="takePhoto()" >拍照上传</el-button>
              </div> -->
            </div>
            <!-- 选择房型一行 -->
            <el-row>
              <div v-for="(item,index) in preBillParam.master_base" :key="index">
                <div>
                    选择房型:
                    <el-popover placement="bottom-start" width="300" trigger="click" v-model="item.visible">
                    <!-- 选择房型名称 input框的在对应值 ex:大床房 -->
                    <el-input readonly  @focus="getRoomInfo()"  style="width: 10vw;" slot="reference" v-model="item.room_type"></el-input>
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
                            <span>首日: <span style="color: #f3565d">{{item.fix_rate}}</span></span>
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
                              <div style="line-height: 20px;">
                                <span style="display: block">可售: {{itemm.can_live_num}}</span>
                                <span>超预留:</span>
                              </div>
                            </li>
                        </ul>
                    </div>
                    </el-popover>
                    <span style="padding-left: 10px;">房间数:</span> <el-input-number  @change="selfMount(item)" :max="maxNumber"  v-model="item.room_amount" :min="1"></el-input-number>
                    <!-- 入住单=>选房号 -->
                    <img @click="chooseNo(item,index)" style="margin-left: 2px; cursor: pointer;  position: relative; top: 15px;"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
                    <!-- 标签组=》即为房间数 -->
                    <div style="display: inline-block; width: 220px; height: 40px;">
                    <el-tag  :show-overflow-tooltip="true" :key="tag"  v-for="tag in item.dynamic_roomNumber" closable :disable-transitions="false" @close="handleClose(item,tag)">
                      {{tag}}
                    </el-tag>
                    <el-popover placement="right-start" width="200" trigger="click">
                      <div>
                        <el-tag :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber">
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
                    <!-- item.fix_rate || item.fix_rate === 0 这个判断条件可能有误 -->
                      <div v-if="String(item.fix_rate)" style="display: inline-block">
                        首日价<el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.fix_rate" style="color: #f3565d;width: 60px"></el-input>
                        <span v-show="!span_input_flag" @click="span_input_flag = true" style="color: #f3565d">{{item.fix_rate}}</span> /间
                      </div>
                      <div v-else style="display: inline-block">
                        <el-input v-show="span_input_flag" @blur="span_input_flag = false" v-model="item.fix_rate" style="color: #f3565d;width: 60px"></el-input>
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
                        <i v-show="preBillParam.master_base[0].master_lable != 1" slot="reference" @click="getRateInfo(item)" class="el-icon-caret-bottom" style="background-color: #5bbbf5!important"></i>
                      </el-popover>
                    </span>
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showDeleteButton" @click="deleteSelect(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showAddButton" @click="addSelect" src="../../../assets/images/pms/houseStatus/add.png">
                    </div>
                </div>
              </div>
            </el-row>
            <!-- 入住人一行 -->
            <el-row style="margin-top: 10px; max-height: 300px;overflow: auto">
                <div  v-for="(item,index) in preBillParam.master_guest" :key="index" style="margin-top: 10px">
                <div style="diplay: inline-block">
                    <span style="padding-left: 14px">入住人:</span>
                    <el-select @change="selectLive(item)" @focus="getEnter_RommNumber" v-model="item.room_number" style="width: 9.8vw"  placeholder="房间">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span style="float: left">{{ itemm.roomNo }}</span>
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
                    <el-input  v-model.trim="item.id_no" maxlength="18" :class="{errorClass: isErrorClass}" @blur="validateId_no(item,'输入')"  placeholder="证件号码"  style="width: 12vw"></el-input>
                    <el-input  v-model.trim="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                </div>
                <div style="display: inline-block">
                    <el-input  v-model.trim="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 5vw; margin-top: 10px"></el-input>
                    <el-button type="danger" @click="handlePicture(item,index)">上传照片</el-button>
                </div>
                <!-- 入住房间入住人多选 +-->
                <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </el-row>
            <el-row style="margin-top: 120px">
                <img style="cursor: pointer; display: inline-block; margin-bottom: -19px" @click="cardImport" src="../../../assets/images/pms/houseStatus/cardImport.png">
                <!-- <el-button style="height: 50px; width: 150px; margin-left: 12px" type="info">物品</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="remarkDialog = true; resolveRemarkList()">备注</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="preview_billDialog = false">预约发票</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="consumeDialog = true">消费</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="settingDialog = false">服务设置</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="pictureImportDialog = true;">图像拍摄</el-button> -->
                <div style="float: right">
                    <!-- 应收总额:<span style="margin-right: 10px">{{countMoney}}</span> -->
                    <!-- <el-popover
                      placement="top-end"
                      width="200"
                      height="300"
                      trigger="click">
                      <div>
                        房费:{{countMoney}}
                      </div> -->
                     <!-- <el-button slot="reference" style="margin-right: 10px;">明细</el-button> -->
                    <!-- </el-popover> -->
                <!-- <el-button style="height: 50px; width: 100px" type="primary" @click="handleAuthorization()">预授权</el-button> -->
                <!-- <el-button style="height: 50px; width: 100px" type="primary"  @click="handlePicture()">上传照片</el-button> -->
                <el-button style="height: 50px; width: 100px" type="primary"  @click="handlePolice()">上传公安</el-button>
                <el-button style="height: 50px; width: 100px" type="primary" @click="handleBreakfastList()">早餐</el-button>
                <el-button :loading="isLoading" style="height: 50px; width: 100px;" type="success" @click="confirmEnter()">确认入住</el-button>
                </div>
            </el-row>
        </el-dialog>
        <!-- 身份证信息 -->
        <a-dialog :show.sync= authorizationDialog :parentInfoParam='authorizationParam' v-on:listenTochildEvent="getConsumeData"></a-dialog>
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
         <!--卡查询-->
        <el-dialog @close="card_input=false" class="houseTypeClass deletePadding_Class" :title="changeTitle" :visible.sync="cardQueryDialog" :modal="true">
          <div v-if="changeTitle === '卡查询'" style="height: 400px; width: 100%;">
            <el-row style="margin: 10px;10px;10px;10px">
              会员卡号: <el-input v-if="card_input" v-focus_focus placeholder="填充会员卡号" size="mini" @focus="resetNull('card_no')" @change="getcardInfo()" clearable v-model="cardParam.card_no" style="width: 8vw"></el-input>
              姓名: <el-input placeholder="填充姓名" @focus="resetNull('name')" clearable size="mini" v-model="cardParam.name" style="width: 8vw"></el-input>
              证件号码: <el-input placeholder="填充证件号码" @focus="resetNull('number')" clearable size="mini" v-model="cardParam.number" style="width: 8vw"></el-input>
              <!-- <span style="margin-left: 10px">模糊搜索</span> <el-checkbox></el-checkbox> -->
              <!-- <el-button type="primary" style="float: right">读卡</el-button> -->
              <el-button type="primary" style="float: right;margin-right: 10px" size="mini" @click="getCardMemberList">查询</el-button>
            </el-row>
            <div>
                <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" height="300" :data="cardBaseList" style="width: 100%;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="card_name" label="姓名"></el-table-column>
                <el-table-column prop="card_no" label="卡号"></el-table-column>
                <el-table-column label="性别">
                  <template slot-scope="scope">
                    {{scope.row.sex==='1' ? '男' : '女'}}
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
                <el-table-column prop="remark" fixed="right" label="备注" ></el-table-column>
                </el-table>
            </div>
          </div>
          <!--v-if判断-->
          <div v-if="changeTitle === '订房中心查询'" style="height: 400px; width: 100%;">
            <div>
              <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" height="300"  :data="centerRoomList" style="width: 100%;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
              </el-table>
            </div>
          </div>
           <div v-if="changeTitle === '协议单位查询'" style="height: 400px; width: 100%;">
            <div>
              <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" height="300"  :data="centerRoomList" style="width: 100%;">
                <el-table-column  type="index" label="序号"></el-table-column>
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
        <!-- 选房号 -->
        <el-dialog @close="clearSelection()"  class="houseTypeClass deletePadding_Class" title="选房号" :visible.sync="switchNumberDialog" :modal="true">
          <div style="height: 400px; width: 100%; background-color: #EBEDF1">
            <!-- <div style="float: left; width:25%">
              <ul class="choose_no_class">
                <li v-for="(item,index) of this.preBillParam.master_base" :key="item.room_type" @click="selectHouseType(item,index)">
                  <span style="color: #5B97EB; ">{{item.room_type}}</span>
                  <span style=" margin-right: 20px">可订数:<span style="color: #FC6784">{{item.can_live_num}}</span></span>
                </li>
              </ul>
            </div> -->
            <div style="float: right;width: 100%;">
              <!-- <keep-alive> :row-key="getRowKeys" -->
                <el-table   :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" ref="multipleTable"  :data="roomNo_data_list" style="width: 100%;height: 400px; overflow:scroll" @select-all="handleselectAll" @select="handleselect">
                <el-table-column :reserve-selection="true" type="selection" width="55"></el-table-column>
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
              自动排房<el-switch style="margin-left: 5px" @change="selfSelectHouse"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
              <span style="margin-left: 10px">排房结果: <span>{{this.sortNumber}}</span></span>
              <span style="margin-left: 10px">未排房总数:<span style="color: #f3565d">{{this.noSortNumber}}</span></span>
              <span style="margin-left: 10px">已排房总数:<span style="color: #23c608">{{this.sortNumber}}</span></span>
            </div>
            <el-button @click="switchNumberDialog = false; getRoomNumber()" type="danger">提交</el-button>
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
        <!-- 入预收操作 -->
        <el-dialog @close="extraInformation = [];" :close-on-click-modal = 'false' class="houseTypeClass deletePadding_Class" title="入预收操作" :visible.sync="enterPreviewDialog" :modal="true">
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
              <span v-if="extraInformation.length>0" style="color: #4488E9;margin-top: 10px;margin-left: 15px">附加信息</span>
              <ul v-for="(item,index) of extraInformation" :key="index">
                <li>
                  <span style="padding-left: 28px;width: 130px;display: inline-block;">{{item.field_name_cn}}:</span>
                  <el-input size="mini" v-model="item.field_name_value" style="width: 20vw; margin-top: 10px;"></el-input>
                </li>
              </ul>
            </div>
            <div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="authorizationDialog = true">预授权</el-button>
            <!-- <el-button @click="flushEnterAccount()" type="info">清空</el-button> -->
            <el-button v-if="previewEnterBill.payMode == 1 || previewEnterBill.payMode == 38" type="primary" @click="article_number();pay_amount_money_code = ''">结算</el-button>
            <el-button v-else type="primary" @click="handlePayCharge()">付款</el-button>
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
        <!--新建入住单=>早餐-->
        <el-dialog class="houseTypeClass deletePadding_Class" width="40%"   title="新增早餐" :visible.sync="breakfastDialog" :modal="true">
          <div class="breakfastClass">
              <ul v-for="(item,index) of rate_breakfastList" :key="index">
                <li>
                  <span style="margin-right: 10px">房间:</span>{{item.roomNo}}
                  <el-input-number v-model="item.amount"  :max="item.count" :min="0"></el-input-number>
                  <span>({{item.desc}})</span>
                </li>
              </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="success"  @click="confirmBreakfast();breakfastDialog=false">确定</el-button>
          </div>
        </el-dialog>
           <!--新建入住单=>上传公安-->
        <el-dialog :close-on-click-modal="false" @close="flushPolice" class="houseTypeClass" width="60%"   title="上传公安" :visible.sync="policeDialog" :modal="true">
          <div style="height: 400px; display: flex; justify-content: space-between;">
            <div>
              <el-form  label-width="80px" :inline="true" :model="policeInfoParam">
                <el-form-item label="姓名">
                  <el-input  v-model="policeInfoParam.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="房间号">
                  <!-- <el-input v-model="policeInfoParam.room_no" placeholder="房间号"></el-input> -->
                    <el-select  @focus="getEnter_RommNumber" v-model="policeInfoParam.room_no" style="width: 206px">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span>{{ itemm.roomNo }}</span>
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input  v-model="policeInfoParam.sex" placeholder="性别"></el-input>
                </el-form-item>
                <el-form-item label="入住时间">
                  <el-input  v-model="policeInfoParam.time" placeholder="入住时间"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-input  v-model="policeInfoParam.cardType" placeholder="证件类型"></el-input>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input  v-model="policeInfoParam.cardNo" placeholder="证件号码"></el-input>
                </el-form-item>
                <el-form-item label="民族">
                  <el-input  v-model="policeInfoParam.nation" placeholder="民族"></el-input>
                </el-form-item>
                <el-form-item label="户籍地址">
                  <el-input  v-model="policeInfoParam.address" placeholder="户籍地址"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                  <!-- <el-input readOnly v-model="policeInfoParam.birthday" placeholder="出生日期"></el-input> -->
                  <el-date-picker
                    v-model="policeInfoParam.birthday"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="policeInfoParam.telephone" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="policeInfoParam.remark" placeholder="备注"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- <div style="width: 90%;height: 200px;border: 1px solid;margin-right: 50px">
            </div> -->
          </div>
          <div slot="footer"  class="dialog-footer">
            <div style="text-align: center">
              <el-button  size="mini" type="primary" @click="handleCompare()">对比入住</el-button>
              <!-- <el-button  size="mini" type="primary">入住</el-button> -->
              <span style="margin-left: 50px;margin-right: 20px">同住:</span>
              <el-radio-group v-model="policeInfoParam.liveStatus">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-dialog>
        <!--公安摄像头展示-->
        <el-dialog @close="flushMedia" :close-on-click-modal="false" class="police-class" :modal="false" :append-to-body="true" :show-close="false" :visible.sync="policeDialog_2" width="30%">
          <div style="height: 150px;width:100%">
              <div style="margin:0 auto; margin-left: 40px;height: 150px; width: 160px; border: 1px solid #CCCCCC;background-color: #000000">
                  <video id="video_2"  width="150px" height="150px" autoplay="autoplay"></video>
                  <canvas id="canvas" style="position: absolute;left: 220px"  width="150px" height="150px"></canvas>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <div style="text-align: center">
              <el-button size="mini" type="primary" @click="policeDialog_2=false">取消操作</el-button>
              <el-button size="mini" type="primary" @click="getMedia()">扫描拍照</el-button>
              <el-button @click="comparePic()"  size="mini" type="primary">对比登记</el-button>
              <el-button  size="mini" type="primary" @click="takePhoto()">照片上传</el-button>
              <!-- <el-button  size="mini" type="primary">上传图片</el-button> -->
              <!-- <el-button  size="mini" type="primary">外接对比</el-button> -->
              <!-- <el-button type="primary" size="mini" @click="takePhoto()" >拍照上传</el-button> -->
            </div>
          </span>
        </el-dialog>
        <!--新建入住单=>图像导入-->
        <el-dialog class="houseTypeClass" width="50%"   title="图像导入" :visible.sync="pictureImportDialog" :modal="true">
        </el-dialog>
        <!--新建入住单=>设置-->
        <el-dialog class="houseTypeClass" width="50%"   title="设置" :visible.sync="settingDialog" :modal="true">
          <div style="height: 400px">
            <ul style="text-align: right; float:left;">
              <li>
                是否固定房价<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_fix_rate " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否保密订单<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_secrete  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否房价保密<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_secret_rate  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <!-- <li style="margin-top: 10px">
                是否walkin<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_walkin  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li> -->
              <li style="margin-top: 10px">
                是否允许记账<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.allowed_ar  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="settingDialog=false">保存</el-button>
          </div>
        </el-dialog>
        <!--上传图片-->
        <picture-dialog :show.sync= pictureComponentDialog :pictureParam='pictureParam' v-on:listenToPicture="getPictureParam"></picture-dialog>
        <!--新建入住单=>消费-->
        <c-dialog :show.sync= consumeDialog :parentParam='preBillParam'  v-on:listenTochildEvent="getConsumeData"></c-dialog>
          <!--新建入住单=>发票-->
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
        <!-- 新建/编辑入住单备注=》新建编辑备注 -->
        <el-dialog class="houseTypeClass" width="30%" title="新增备注" :visible.sync="remarkDialog" :modal="true">
          <div style="height: 300px">
            <el-select  @focus="getEnter_RommNumber" v-model="remark_roomNo" placeholder="房间号">
              <el-option  v-for="item in liveoptions_Value" :key="item.roomNo" :label="item.roomNo" :value="item.roomNo">
                <span style="float: left">{{ item.roomNo }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">已住:{{ itemm.liveCount }}</span> -->
              </el-option>
            </el-select>
            <el-input v-model="remarkContent_value" style="margin-top: 20px" placeholder="请输入备注信息" type="textarea" :rows="10"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="info"   @click="addRemark();remarkDialog=false">保存</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import aDialog from './authorizationDialog'
import * as media from './video.js'
// import * as crypt from '../../../common/crypt.js'
import crypt from '../../../common/crypt.js'
import QRCode from 'qrcodejs2'
import _ from 'lodash'
import util from '../../../common/util.js'
import moment from 'moment'
import cDialog from './consumeDialog'
import pictureDialog from './pictureDialog'
export default {
    data(){
        return {
          isLoading: false,
          rate_other_list: [],//最终组装的数据 
          rateAllPrice_list: [],//房价码价格数组
          master_rtrate: [],//每日每间房的房价房价码等
          changeTime: false,
          pictureComponentDialog: false,
          pictureParam: {},
          // isShow: '',//互斥显示上传公安和上传照片
          dataNow: new Date(),
          cloneData:{},
          rateCode_list: [],//房价码list
          mainAccount_id: '',
          card_number: '',
          card_type: '',
          span_input_flag:false,
          extraParam:[],
          extraInformation: [],//附加信息
          card_input: true,
          cardParam: {
            name: '',
            number: '',
            card_no: ''
          },
          cardRegisterParam: {},
          percent: '',
          card_imgUrl: '',//身份证图片地址
          police_imgUrl: '',
          police_img_src: '',
          authorizationParam: {},
          authorizationDialog: false,
          policeDialog_2: false,
          policeInfoParam: {
            name: '',
            room_no: '',
            sex: '',
            time: '',
            cardType: '',
            cardNo: '',
            nation: '',
            address: '',
            birthday: '',
            telephone: '',
            remark: '',
            liveStatus: 0,
          },//上传公安对象
          maxNumber: 100,//置为2方便计算此时置为100
          no_hour_time: '',//时间后缀
          rateCode_hour: '',//钟点房房价码==>以后要变
          rateCodeList_hour: [],//钟点房房价码信息列表
          rate_breakfastList: [],//房价list
          cardInfoParam:{
            name: '',
            sex: '',
            cardType: '01',
            cardNo: '',
            address: '',
            birthday: '',
            nation: '',
          },
          cardInfoDialog: false,//身份证信息dialog
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
          sum_money: 0,
          scan_code: '0',
          remark_roomNo: '',//备注中的房间号
          imageUrl: '',//图片地址
          uploadUrl: 'https://image.eloadspider.com/resource/employee/head_image/upload',
          isErrorClass: false,
          infoShow: '',
          changeTitle: '',//入住类型变动，不同的title
          cardBaseList: [],//会员信息
          centerRoomList: [],//订房中心list
          cardQueryDialog: false,
          collectionCharge: '',
          collectionChargeData: [],//收款要选择的数据
          incomingAccoutList: [],//入账代码list
          rateCodeValue: 'BAR',
          rateDateList: [],//房价时间与价钱对应数组
          rateValueList: [],
          accoutInfoById_param: {},
          return_accountParam_1: {},
          isAccout: true,
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
          marketValue: '',
          srcValue: '',
          marketSrcList: [],//市场码来源码数据
          pictureImportDialog: false,
          policeDialog: false,
          selfSortArray: [],
          payMoney: 0,
          roomNumberList: [],//已选的入住房间
          returnEnterParam: {},
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
            create_user_id: 0,
            original_pay_dict: {},
            charge_details: [],
          },
          return_accountParam:{},
          startDate_kaishi: moment(new Date()).format('HH:mm:ss'),
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
            pre_live_number: '',//准备入住数
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
            enterFormVisible: this.show,
            selectParam: '',//小方块选择参数全局定义
            is_addlive: true,//是否添加入住人
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
            houseType_priceValue_1: 0,//选择房型右边弹框价钱1
            houseType_priceValue_2: '',//选择房型右边弹框价钱2
            houseType_HeadValue: '',//选择房型右边弹框头部值
            showPop_right: false,//是否显示入住单选择房型右边弹框
            //入住单大对象
            preBillParam: {
              room_list: [], //入住人房间号
              //选择房型一行及其他
              master_base: [{
                extra_flag: '',
                lock_number:'',
                rate_code: '',//房价码
                is_change_rate: '',
                room_amount: 1,//房间数量几件=add=
                fix_rate: 0,//房价
                master_lable: 0,//入住单标签
                master_type: 1, //另加<========2019.06.11
                arr_time: '',//预抵时间
                leave_time: '',//离开时间
                can_live_num: '',//add
                room_type_value: '',//房型名称对应ID
                dynamic_roomNumber: [],//动态房间号=》应是一个数组
                roomPrice: '', //总价钱=add= 前面都是自己加的===========
                room_type: '',//房型名称
                room_number: '',//房间数几间 数组变字符串 // ['111', '222', '333','444', '555','666', '777']
                exp_sta: '11', //备注
                account_id: null,
                team_id: 2,
                team_name: '2',
                biz_date: '2018-12-01 10:10:01',
                // rsv_type_id: 22,
                order_no: '123',
                sales_person_id: 2,
                code_occ_id: 2,
                extra_flag: '2',
                adult_num: 2,
                children_num: 2,
                is_fix_rate: 1,
                is_secrete: 1,
                is_secret_rate: 1,
                allowed_ar: 1,
                ar_id: 0,
                code_commision_id: '1',
                code_market: '',
                code_src: '',
                reference_id: 1,
                master_status_lable: null,
                total_chartge: 0,
                total_pay: 0,
                last_account_id: null,
                last_pay_id: null,
                account_num: null,
                pay_num: 0,
                master_id: null,
                sub_lable: null,
                is_room_posted: false,
                building_name: null,
                room_facility_ids: '11',
                extra_person_num: null,
                extra_person_price: null,
                extra_bed_num: null,
                extra_bed_price: null,
                rm_occ_id: null,
              }],
              //入住人一行
              master_guest:[{
                room_floor: 0,
                arr_time: '2019-04-08 12:20:20',//预抵时间
                leave_time: '2019-04-10 12:20:20',//离开时间
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
                // descript: null,
                // descript_en: null,
                list_order: 1,
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
                company_na: '222',
                pic_sign: null,
                pic_photo: null,
                remark: '222',
                is_anonymo: false,
                weixin: '2',
                mobile: null,
                email: '1016068291@qq.com',
                country_id: null,
                division_id: null,
                state_id: null,
                city_id: null,
                zipcode: null,
                // master_base_id: 1231231231,
                guest_id: 123456
              }],
              //早餐
              // breakfastInfoList: [],
              // settingInfo: {},//设置
              // //入住=》消费
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
              // master_base: [{
              //     room_type: '',//房间类型
              //     room_amount : '',//房间数量
              //     roomPrice: '', //单价价钱
              //     dynamic_roomNumber: ['111', '222', '333','444', '555','666', '777'],//动态房间号=》应是一个数组
              //     mayCount: '2', //可入住数
              // }],
            },
            temp_value: '',
            showPoint: false,//入住=>多余部分
            activeNames: ['1'],
            consumeData: [],//入住=》消费数组
            remarkData: [],//备注数组
            breakfastDialog: false,//入住=》早餐dialog
            settingDialog: false,//入住=》设置dialog
            consumeDialog:false,//入住=》消费dialog
            preview_billDialog: false,//预约发票
            remarkDialog: false,//入住=>备注dialog=>新增备注
            previewTypeList: [{
              label: '会员',
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
              value: 0
              },{
              label: '钟点房',
              value: 1
            },{
              label: '夜宵房',
              value: 2
            },{
              label: '常住房',
              value: 3
            },{
              label: '免费房',
              value: 4
            }
            // ,{
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
            lockCss_active: false,//锁定状态
            rangeDate:{
            disabledDate(time){
                return time.getTime() < Date.now() - 8.64e7
            }
            },
            isActive: false, // 样式true or false
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
      'aDialog': aDialog,
      'pictureDialog': pictureDialog,
      QRCode
    },
    watch: {
      show () {
        this.srcValue = '',
        this.marketValue = '',
        this.imageUrl = ''
        this.enterFormVisible = this.show
        this.getRoomType() //准备:循环得到匹配的房型中文名
      },
      parentParam(){
        console.log('this.parentParam',this.parentParam)
        //这个循环是为了避免数据被污染===>入住人这一行重置数据
        for(var item of this.preBillParam.master_guest){
          item.room_number = this.parentParam.roomNo
        }
        console.log('this.preBillParam.master_basethis.preBillParam.master_base',this.preBillParam)
        // 此种就是进来子组件 得到相应房型房间价格 然后可选房号
        for(var item of this.preBillParam.master_base){
          item.room_type = this.parentParam.roomType
          item.room_type_value = this.parentParam.roomType_code
          // item.roomCount = 0
          item.dynamic_roomNumber.push(this.parentParam.roomNo)
        }
        let param = {
          room_type: this.parentParam.room_type_name
        }
        this.getCardListInfo()//获取房子信息所有数据
        this.getRateCode_price(item,param) //====下面没有用
        console.log('watch',param.room_type,param)
        this.cloneData.room_type = _.cloneDeep(param.room_type)  //开始限制数据
        this.cloneData.room_no = _.cloneDeep(this.parentParam.roomNo)
        this.getCanLiveRoom(param.room_type) //根据房型选未占用房间===>可以在这个地方废弃
        // this.previewEnterBill.room_no_value = this.parentParam.roomNo
        console.log('roomNumberList',this.roomNumberList,this.previewEnterBill.room_no_value)
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
    computed:{
      //计算===>类似监听时间控件默认时间
      // getDateArray(){
      //   let date = moment(new Date()).format('HH:mm:ss')
      //   return [date, '14:00:00']
      // },
      //此处有bug===>不能实时，因为computed会有缓存
      getDateArray() {
        // let date = moment(new Date()).format('HH:mm:ss')
        // return [date, '14:00:00']
      },
      // sumMoney(){
			// 	return this.preBillParam.consumeInfoList.map(
			// 		item=>item.number*item.price).reduce(
			// 		(acc, cur) => (parseFloat(cur) + acc), 0)
      //   },
      // sumBreakfastMoney(){
      //   return this.preBillParam.breakfastInfoList.map(
			// 		item=>item.number*item.price).reduce(
			// 		(acc, cur) => (parseFloat(cur) + acc), 0)
      //   },
      //计算入离时间差天数
      countDateRange(){
        try {
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          return this.datedifference(start, end)
        } catch (error) {
          console.log('error')
        }
      }
    },
    created(){
      // this.enterPreviewDialog = true
      // this.getRoomOccupy()
      // this.getRoomType() //准备:循环得到匹配的房型中文名
      // this.findHtNation()//民族获取
    },
    methods: {
      //获取图片param 子传父emit
      getPictureParam(param){
        console.log('接收从子组件传来的入住人对应的入住照片!',param)
        // for(var item in this.preBillParam.master_guest){
        //   if(item == param.index){
        //     this.preBillParam.master_guest[item].pic_sign = param.imageUrl
        //   }
        // }
        this.preBillParam.master_guest.forEach((item,index)=>{
          if(index == param.index){
            item.pic_sign =  param.imageUrl
          }
        })
        console.log('this.preBillParam.master_guest=====end',this.preBillParam.master_guest)
      },
      //上传照片
      handlePicture(item,index){
        this.pictureComponentDialog = true
        // this.pictureParam.master_guest = [].concat(this.preBillParam.master_guest) //赋值入住人数组
        // console.log('this.pictureParam.master_guest==1',this.pictureParam.master_guest)
        // console.log('this.pictureParam..',this.pictureParam)
        // localStorage.setItem('pictureParam_guest',JSON.stringify(this.pictureParam))
        localStorage.setItem('pictureParam_guest',JSON.stringify(item))
        localStorage.setItem('pictureParam_index',index)
        console.log('1111', JSON.parse(localStorage.getItem('pictureParam_guest')))
      },
      //筛选处理房价码
      handleRateCode(){
        this.rateCodeValue = this.preBillParam.master_base[0].rate_code
        console.log('preBillParam.master_base[0].rate_code',this.preBillParam.master_base[0].rate_code)
        this.clearMaseterBase()
      },
      //获取房价码list
      getRateCode_list(){
        if(!this.preBillParam.master_base[0].code_src || !this.preBillParam.master_base[0].code_market ){
          this.$message.warning('请选择市场码或者来源码!')
          return
        }
        let that = this
        let url = that.api.api_price_9101+ '/v1/' + `room/rate_code/get_rate_code_list/`
        that.$axios.get(url,{
          params: {
            market: that.preBillParam.master_base[0].code_market ,
            src__icontains: that.preBillParam.master_base[0].code_src
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
      watchValue(){
        console.log('preBillParam.master_base[0].code_src',this.preBillParam.master_base[0].code_src)
      },
      handleAuthorization(){
        // this.authorizationParam.mainAccount_id='222'
        // console.log('this.authorizationParam父级传递',this.authorizationParam)
        console.log('this.mainAccount_id传过来的主账id===联房的时候为主账房id',this.mainAccount_id)
        let mainAccountId = this.mainAccount_id
        localStorage.setItem('mainAccountId',mainAccountId) //通过缓存弄暂时
        this.authorizationDialog = true;
      },
      handlePolice(){
        console.log('card身份',this.cardInfoParam)
        console.log('policeInfoParam',this.policeInfoParam)
        console.log('this.preBillParam.master_guest<=====',this.preBillParam.master_guest)
        // this.policeInfoParam
        this.policeInfoParam.name = this.cardInfoParam.name
        this.policeInfoParam.sex = this.cardInfoParam.sex === '0' ? '男' : '女'
        this.policeInfoParam.cardNo = this.cardInfoParam.cardNo //读卡获取到身份证信息了
        this.policeInfoParam.address = this.cardInfoParam.address
        this.policeInfoParam.birthday = this.cardInfoParam.birthday
        this.policeInfoParam.nation = this.cardInfoParam.nation
        this.policeInfoParam.time = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss') + '至'+ moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        this.policeInfoParam.cardType = this.cardInfoParam.cardType === '01' ? '身份证' : ''
        //筛选得到匹配的对应值===废弃
        // let array = this.preBillParam.master_guest.filter(item=>item.id_no === this.policeInfoParam.cardNo)
        // console.log('array',array)
        // if(array.length>0){
        //   this.policeInfoParam.room_no = array[0].room_number
        //   this.policeInfoParam.telephone = array[0].telephone
        // }
        this.policeDialog = true;
        // this.policeDialog_2 = true
        this.$nextTick(_=>{
          media.getMedia('150','150','video_2')
        })
      },
      flushMedia(){
        this.clearPhoto() //清除掉图片
      },
      //处理早餐
      handleBreakfastList(){
        this.getRateCode_BreakFast()
      },
      getMaxNumber(item){
        console.log('itemkaish',item)
        let maxLength = item.can_live_num === '' ? 2 : item.can_live_num
        return maxLength
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
          original_pay_dict: that.extraParam.length>0 ? JSON.stringify(that.extraParam) : null,
          // ar_account_id: '',//	ar账户id, ar支付必须.
          cashier_id:	9,
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data)
          if(res.data.message != 'success'){
            that.$message.warning('调用后台接口失败')
          }else{
            that.$message.success('操作成功!')
            // this.$router.go(0)
          }
          }).catch(error=>{
        })
      },
      //获取摄像头
      getMedia(){
        this.clearPhoto() //清除掉图片
        media.getMedia('150','150','video_2')
      },
      clearPhoto(){
        try {
          var c=document.getElementById("canvas");
          var ctx=c.getContext("2d");
          ctx.fillRect(0, 0, 150, 150);
        } catch (error) {
          console.log('error')
        }
      },
      //刷新入住公安
      flushPolice(){
        this.policeInfoParam.room_no = ''//刷新
      },
      handleCompare(){
        try {
          if(this.policeInfoParam.cardNo){
            if(this.policeInfoParam.room_no){
              this.policeDialog_2=true;
            }else{
              this.$message.warning('请选择房间号!')
            }
          }else{
            this.$message.warning('请录入信息!')
          }
        } catch (error) {
          this.$message.warning('请正确操作!')
          console.log('error')
        }
      },
      //认证对比
      comparePic(){
        console.log('...1',this.card_imgUrl)
        console.log('...2',this.imageUrl)
        // this.registerInfo()//入住人登记接口,以后可能还有同住人
        this.getPercent()
      },
      // //得到百分比(对比照片得到百分比参数)==feiqi
      getPercent(){
        let that = this
        // that.getToken()//获取token 废弃
        // let url = 'http://47.98.113.173:9504/v1/authentication/ht/rf/no_auth_one_to_one_percent/'
        let url = 'https://sms.eloadspider.com/v1/authentication/ht/rf/no_auth_one_to_one_percent/'
        let scopeParam = {
          image_url1: that.card_imgUrl,
          image_url2: that.imageUrl,
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('res',res)
          if(res===undefined){
            this.$message.warning('请正确操作!')
          }else{
            console.log('res百分比',res.data.data)
            that.percent = res.data.data
            that.registerInfo()//开始登记
          }
        })
      },
      encodeContent(data){  
        return encodeURI(data).replace(/&/g,'%26').replace(/\+/g,'%2B').replace(/\=/g, '%3D').replace(/\s/g,'%20').replace(/#/g,'%23');  
      }, 
      //获取身份证token==废弃
      getToken(){
        let that = this
        // let url = `http://117.186.167.138:8086/inn-app-rest/rest/appLogin/userLogin?`
        // + 'identificationNumber=' +  encodeURIComponent(identificationNumber)
        // + '&interfaceKey=' + encodeURIComponent(interfaceKey)
        // + '&deviceCode=' + encodeURIComponent(deviceCode)
        // let url = `http://117.186.167.138:8086/inn-app-rest/rest/appLogin/userLogin?identificationNumber=YtpvUxaoIQW38gjIt4xBAjc7fYf40YK1ORVqSULoxoM%3D&interfaceKey=qazwsxedc&deviceCode=yjzd001`
        let url=  that.api.api_9022_9519 + '/v1/' + `outside/api/public_security_token_raw`
        // url = encodeURI(url)
        this.cardRegisterParam.identificationNumber = this.policeInfoParam.cardNo
        // let appSimilarityDegreeVo = {
          //   profilePhoto: crypt.encrypt(that.card_imgUrl),//证件照片（必填）
        //   photo: crypt.encrypt(that.imageUrl),//现场照片（必填）
        //   similarityDegree: crypt.encrypt(that.percent),//相似度（必填）
        //   deviceType: crypt.encrypt("2")//设备类型1表示加密狗、2表示外接设备（必填）
        // }
        // let identificationNumber = 'U2FsdGVkX189L7IGkzxhm+yfu3w/c5ipHoWDcILtal6BAbNu3B9hu0OP4BU67pU/'
        // let interfaceKey = 'nIva7aKEDP2+DEI6asO89mWIQTB9ehk+sy3KJaYkrpY='
        // let deviceCode = '7bmCtHM/EJ3XcDGkloXVnGwiqE+6ZhHE8ukPY9zKJVs='
        // let profilePhoto =  'U2FsdGVkX1+sXmTgq3JoPu4AxlI8RYJVZSLyV9PjAQv7JmlUEKhk8cgokCMLK7EjzHh5sQf5jSQ1VOZ4zzU4S60cRfHMpyA5ePPyjwNyaaOGO5IaOfP4wKuyKclFus+t'
        // let photo= 'U2FsdGVkX19omirExbTvf8+j+xpK1wdy37cROjZdBr/26xUgqo/mR7mvkKIdAn24bJkypb2o6ovkg7kZS3DT3B83EjzU0m49LF8NXESPJMgGmudNwdz664OgFF6cSwbp'//现场照片（必填）
        // let similarityDegree= 'U2FsdGVkX186QDUuuzNKiUZSNRpp+sbcu1TYOFGQaCA='//相似度（必填）
        // let deviceType= 'U2FsdGVkX1/gDYFnKZS8abyC7ce1phytTpfI8v7jGxI='
        // let identificationNumber = crypt.encrypt(that.cardRegisterParam.identificationNumber)
        // let identificationNumber = crypt.encrypt('513021199401300326')
        let identificationNumber = 'WjKbl/oI8eIMK3B+b7z1ADI9mpWkoWXSzY9761QQJds='
        let profilePhoto =  crypt.encrypt(that.card_imgUrl)//身份证照片
        let photo= crypt.encrypt(that.imageUrl)//现场照片（必填）
        let interfaceKey = 'nIva7aKEDP2+DEI6asO89mWIQTB9ehk+sy3KJaYkrpY='//接口秘钥
        let deviceCode = '7bmCtHM/EJ3XcDGkloXVnGwiqE+6ZhHE8ukPY9zKJVs='//设备号
        console.log('crypt.decrypt(that.imageUrl)',crypt.decrypt(photo))
        let similarityDegree= crypt.encrypt(that.percent)//相似度（必填）
        let deviceType= 'Xx0EPrrDjjfH0a03ptmeFw==' //为'2'
        console.log('deviceType=============开始====================',deviceType)
        // let deviceType= crypt.encrypt('2') //为'2'
        console.log('deviceType=================================',deviceType)
        let scopeParam = {
          interface_key: interfaceKey,
          device_code: deviceCode,
          id_num: identificationNumber,
          id_code_photo: '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',
          now_photo: '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',
          similar_degree: 'XtylijEucmbdThsL7lv7gg==',//相似度（必填）
          device_type: deviceType
        }
        // scopeParam = JSON.stringify(scopeParam)
        console.log('socpe......集合',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('token',res.data.data)
          let token = res.data.data.tokenId
        })
      },
      //注册身份证信息上传到公安(境内主入住人的人脸和身份信息到公安接口)
      registerInfo(){
        console.log('if(policeInfoParam.liveStatus)',this.policeInfoParam.liveStatus)
        console.log('this.policeInfoParam.birthday.length====',this.policeInfoParam.birthday.length)
        this.policeInfoParam.birthday.length > 9 ? this.policeInfoParam.birthday : this.policeInfoParam.birthday = this.policeInfoParam.birthday.slice(0,4) + '-' + this.policeInfoParam.birthday.slice(4,6) + '-' + this.policeInfoParam.birthday.slice(6,8)
        console.log('this.policeInfoParam.birthday...',this.policeInfoParam.birthday)
        let that = this
        let scopeParam
        let url
        // that.transferData()//转换处理数据
        let url_enter= that.api.api_9022_9519+ '/v1/' + `outside/api/submit_check_in_master`
        let url_same = that.api.api_9022_9519+ '/v1/' + `outside/api/submit_check_in_add` //提交同住人url
        //入住人
        if(this.policeInfoParam.liveStatus === 0){
          let scopeParam_enter = {
            card_type: this.policeInfoParam.cardType,//证件类型
            register_type: 14,//登记类型
            similarity_degree: this.percent === '0' ? this.percent + '%'  : this.percent,
            room_number:  this.policeInfoParam.room_no,
            // room_number:  '1001',
            card_number: this.policeInfoParam.cardNo,
            user_name: this.policeInfoParam.name,
            sex: this.policeInfoParam.sex + '性',
            birthday: this.policeInfoParam.birthday,
            permanent_address: this.policeInfoParam.address,
            nation: this.policeInfoParam.nation + '族',
            photo: this.imageUrl,//现场拍摄照片
            profile_photo: this.card_imgUrl//身份证照片
          }
          if(scopeParam_enter.room_number){
            this.card_number = scopeParam_enter.card_number
            this.card_type = scopeParam_enter.card_type
            url = url_enter
            scopeParam = scopeParam_enter
          }else{
            this.$message.warning('请选择房间号!')
          }
        }else{
          console.log('this.cardTypethis.cardType',this.cardType)
          //同住人对象
            let scopeParam_same = {
              similarity_degree: this.percent === '0' ? this.percent + '%'  : this.percent,
              room_number:  this.policeInfoParam.room_no,
              // room_number:  '1001',
              // card_number: '342427199509182519',//证件号码
              // original_card_number: '411323199309163430',//入住人证件号码
              original_card_number: this.card_number,//入住人证件号码//相反操作
              card_number: this.policeInfoParam.cardNo,//同住人证件号码//相反操作
              // card_type:  '身份证',//证件类型
              // original_card_type: '身份证',//入住人证件类型
              original_card_type: this.cardType ? this.cardType : '身份证',//入住人证件类型
              card_type:  this.policeInfoParam.cardType,//同住人证件类型
              user_name: this.policeInfoParam.name,
              sex: this.policeInfoParam.sex + '性',
              birthday: this.policeInfoParam.birthday,
              permanent_address: this.policeInfoParam.address,
              register_type: 14,//登记类型
              nation: this.policeInfoParam.nation + '族',
              photo: this.imageUrl,//现场拍摄照片
              profile_photo: this.card_imgUrl//身份证照片
            }
            if(scopeParam_same.card_number && scopeParam_same.room_number){
              url = url_same
              scopeParam = scopeParam_same
            }else{
              this.$message.warning('请登记入住人或选择房间号!')
            }
        }
        console.log('url',url)
        console.log('scopeParamscopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('res',res)
          if(res.data.msg == 'OK'){
            that.$message.warning('登记成功')
            that.policeDialog_2 = false;//关闭dialog
            that.policeDialog = false
          }else{
            that.$message.warning(res.data.msg)
          }
        }).catch(()=>{
            that.$message.warning('接口错误!')
        })
      },
      //废弃===暂时
      transferData(){
        this.cardRegisterParam.similarityDegree= this.percent//人证比对相似度（必填） ,
        this.cardRegisterParam.deviceType= '2'//设备类型1表示加密狗、2表示外接设备（必填） ,
        this.cardRegisterParam.htCidcardRegisterType = ''//登记类型（必填） ,  华住 5
        this.cardRegisterParam.htCidcardRoomnum = this.policeInfoParam.room_no//房间号（必填） ,
        this.cardRegisterParam.htCidcardCardnumber = this.policeInfoParam.cardNo//证件号码（必填） ,
        this.cardRegisterParam.htCidcardUsername = this.policeInfoParam.name//姓名（必填） ,
        this.cardRegisterParam.htCidcardSex = this.policeInfoParam.sex//性别（必填） ,
        this.cardRegisterParam.profilePhoto = this.card_imgUrl//证件照片（必填） ,
        this.cardRegisterParam.photo = this.imageUrl//登记照片（必填） ,
        this.cardRegisterParam.htCidcardPermanentaddress = this.policeInfoParam.address//户籍地址（必填） ,
        this.cardRegisterParam.htCidcardBirthday = this.policeInfoParam.birthday//出生日期（必填） ,
        this.cardRegisterParam.htCidcardCardtype = this.policeInfoParam.cardType//证件类型（必填） ,
        this.cardRegisterParam.htCardtypeCode = ''//证件类型代码（必填） ,
        this.cardRegisterParam.htNationCode = ''//民族代码（必填） ,
        this.cardRegisterParam.htCidcardNation = this.policeInfoParam.nation//民族（必填） ,
        this.cardRegisterParam.htCidcardResidentialaddress = ''//居住地址（非必填） ,
        this.cardRegisterParam.htCidcardPlaceorigin = ''//籍贯（非必填） ,
        this.cardRegisterParam.htCidcardPhysical = ''//体貌特征（非必填） ,
        this.cardRegisterParam.htCidcardWorkunit = ''//工作单位（非必填） ,
        this.cardRegisterParam.htCidcardOccupation = ''//职业/职务（非必填） ,
        this.cardRegisterParam.htCidcardPurposeofstay = ''//停留事由（非必填） ,
        this.cardRegisterParam.htCidcardCreditcardtype = ''//信用卡类型（非必填） ,
        this.cardRegisterParam.htCidcardCreditcardnumber = ''//信用卡号（非必填） ,
        this.cardRegisterParam.htCidcardPhone = ''//联系电话（非必填） ,
        this.cardRegisterParam.htCidcardContext = ''//备注信息（非必填） ,
        this.cardRegisterParam.htPlaceoriginCode = ''//籍贯代码（非必填） ,
        this.cardRegisterParam.htStorageGoodsname = ''//寄存物品名称（非必填） ,
        this.cardRegisterParam.htStorageGoodsnumber= ''//寄存物品数量（非必填） ,
        this.cardRegisterParam.htStorageSecurity = ''//安检情况（非必填） ,
        this.cardRegisterParam.htStorageContext = ''//物品备注（非必填） ,
        this.cardRegisterParam.htStoragePhone = ''//联系电话（非必填）
      },
      //字典量获取
      findHtNation(){
        console.log('jinruruuuuuuuuuuu')
        let that= this
        let url = 'http://117.186.167.138:8086/inn-app-rest/rest/appDs/findHtNation?deviceCode=1&interfaceKey=1&tokenId=789dcaa028444ac9998b154c4b925634'
        that.$http.jsonp(url).then(res =>{
          console.log('json',res)
          if(res.body.Result === true){
            that.$message.success('制卡成功!')
          }else{
            that.$message.warning('制卡失败!')
          }
        }).catch(error=>{
          console.error();
        })
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
                  console.log('。。。。',this.preBillParam.master_guest)
                  for(var item of that.preBillParam.master_guest){
                     if(!item.pic_sign && !item.pic_photo){
                          item.pic_sign = that.imageUrl  //拍摄照片传入
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
      //手动上传
      submitUpload(){
        console.log('111')
        this.$refs.upload.submit()
      },
      //上传之后==废弃
      // handlePicturlSucess(response,file){
      //   console.log('response',response)
      //   console.log('file',file)
      //   if(response.message == 'success'){
      //     this.imageUrl = 'http://47.97.178.98:9500/' +  response.url
      //     this.$message.success('上传成功!')
      //   }else{
      //     this.$message.error('上传失败!')
      //   }
      // },
      //上传之前
      beforeUpload(){

      },
      //确认导入入住人信息
      confirmGuestInfo(){
        //当为1的时候没有手输的情况，默认通过卡导入填充===>进行赋值
        console.log('this.preBillParam.master_guest最开始',this.preBillParam.master_guest)
        if(this.preBillParam.master_guest[0].id_no ===''){
          this.cardInfoDialog = false
          this.preBillParam.master_guest[0].name = this.cardInfoParam.name
          this.preBillParam.master_guest[0].sex = this.cardInfoParam.sex
          this.preBillParam.master_guest[0].id_code = this.cardInfoParam.cardType
          this.preBillParam.master_guest[0].id_no = this.cardInfoParam.cardNo
          this.preBillParam.master_guest[0].street_add = this.cardInfoParam.address
        //当数组长度大于1的时候，要进行2步，自动加行自动填充数据
        }else if(this.preBillParam.master_guest.length>=1){
          // let array = _.cloneDeep(this.preBillParam.master_guest)
          // for(var item of this.preBillParam.master_guest){
          //   if(item.id_no === ''){
          //   }else{}
          // }
          let enterValue = {
            room_floor: 0,
            name: this.cardInfoParam.name, //姓名
            sex: this.cardInfoParam.sex,//性别
            id_code: this.cardInfoParam.cardType,//证件类型
            id_no: this.cardInfoParam.cardNo,//证件号码
            street_add: this.cardInfoParam.address,//街道地址
            arr_time: '2019-04-08 12:20:20',//预抵时间
            leave_time: '2019-04-10 12:20:20',//离开时间
            liveCount: 0,//可选数
            room_number: '',//房间号
            telephone: '',//手机号
            // code: '123',
            // code_name: '77777',
            // descript: null,
            // descript_en: null,
            list_order: 1,
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
            company_na: '222',
            pic_sign: null,
            pic_photo: null,
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: null,
            email: '1016068291@qq.com',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            // master_base_id: 1231231231,
            guest_id: 123456
          }
          console.log('需要判断preBillParam.master_guest===>第二',this.preBillParam.master_guest)
          //避免重复的身份证号
          console.log('this.cardInfoParam.cardNo',this.cardInfoParam.cardNo)
          for(var item of this.preBillParam.master_guest){
            if(item.id_no === this.cardInfoParam.cardNo){
              this.$message.warning('不能有重复的身份证号!')
              return false
            }else{
              this.preBillParam.master_guest = this.preBillParam.master_guest.filter(item=>item.id_no != '') //过滤掉身份证号为空的从而删除入住人一行数据
            }
          }
            this.preBillParam.master_guest.push(enterValue)
            this.cardInfoDialog = false
            console.log('需要判断preBillParam.master_guest',this.preBillParam.master_guest)
            this.showDeleteButton_2 = true
            // this.takePhoto()
          // if(!this.validataRepeatCard()){
          //   return false
          // }else{
          // }
        }else{

        }
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
          // that.cardInfoParam.birthday = res.Data.Birthday
          // that.cardInfoParam.nation = res.Data.Nation
          // res.data.Result = true
          console.log('that.cardInfoParam==>读卡成功',res)
          that.validateId_no(that.cardInfoParam.cardNo)//验证身份证 //测试数据==>终废弃
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
      //卡查询 注意当为会员入住的时候
        queryCardPop(){
          if(this.preBillParam.master_base[0].code_src === 'HY'){
            this.$nextTick(()=>{
              this.card_input = true
            })
            this.cardQueryDialog = true
            this.cardParam.name = ''
            this.cardParam.number = ''
            this.cardParam.card_no = ''
            this.changeTitle = '卡查询'
            this.getCardMemberList()
            setTimeout(() => {
              // this.get_code_list()//请求字典项
            }, 300);
          }else if(this.preBillParam.master_base[0].master_type === 3){
            this.cardQueryDialog = true
            this.changeTitle = '订房中心查询'
            this.getCenterRoomList()
          }else if(this.preBillParam.master_base[0].code_market  == 'XYGS'){
            this.cardQueryDialog = true
            this.changeTitle = '协议单位查询'
            this.getUnitList()
          }
        },
        //入住人塞入值
        setCardInfo(){
          this.cardQueryDialog = false
        },
        //点击选中行数据 并查询该条的房价码协议单位查询是特殊的
        selectCard(row, column, event){
          this.getRateCode_list()//字典数据
          if(this.changeTitle === '协议单位查询'){
            this.infoShow = row.name
            this.preBillParam.master_base[0].rate_code = row.rate_code// 填充房价码选择框，有默认值
            if(this.preBillParam.master_base[0].code_src === 'HY'){
              this.rateCodeValue = row.rate_code
            }else if(this.preBillParam.master_base[0].code_market  == 'XYGS' || this.preBillParam.master_base[0].master_type === 3 || 4){
              this.rateCodeValue = row.rate_code
            }
            this.cardQueryDialog = false
            this.$message({
              type: 'info',
              message: '获取房价码!'
            });
          }else{
            this.$confirm('是否本人入住?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              try {
                  this.$message.info('已选择该条数据!')
                  console.log('row....会员',row)
                  this.preBillParam.master_base[0].rate_code = row.rate_code// 填充房价码选择框，有默认值
                if(this.preBillParam.master_base[0].code_src === 'HY'){
                  console.log('row....会员。。。jinru',row)
                  this.rateCodeValue = row.rate_code
                  this.clearMaseterBase()
                  console.log('选择房型一行========',this.preBillParam.master_base)
                  this.infoShow = row.card_name
                }else if(this.preBillParam.master_base[0].code_market  == 'XYGS' || this.preBillParam.master_base[0].master_type === 3 || 4){
                  this.rateCodeValue = row.rate_code
                  this.infoShow = row.name
                }else{
                  this.rateCodeValue = 'BAR'//恢复默认数据
                }
                // this.get_card_code(row)
                  row.sex === '0' ? row.sex = '1' : row.sex = '0' //定义规则不一样
                for(var item of this.preBillParam.master_guest){
                  this.preBillParam.master_guest[0].id_code = row.id_code
                  this.preBillParam.master_guest[0].id_no = row.id_no
                  this.preBillParam.master_guest[0].name = row.card_name
                  this.preBillParam.master_guest[0].telephone = row.phone
                  this.preBillParam.master_guest[0].sex = row.sex
                }
                //会员id赋值到team_id上去
                for(var item of this.preBillParam.master_base){
                  item.team_id = row.id
                }
                console.log('this.preBillParam.master_base',this.preBillParam.master_base)
                // this.fillGuestrData(row)//通过会员===>填充数据
                this.cardQueryDialog = false
                this.$message.success('已选择该条数据!')
              } catch (error) {
                console.log('error')
              }
            }).catch(()=>{
              if(this.preBillParam.master_base[0].code_src === 'HY'){
                this.rateCodeValue = row.rate_code
              }else if(this.preBillParam.master_base[0].code_market  == 'XYGS' || this.preBillParam.master_base[0].master_type === 3 || 4){
                this.rateCodeValue = row.rate_code
              }
              this.cardQueryDialog = false
              this.$message({
                type: 'info',
                message: '获取房价码!'
              });
            })
          }
        },
        //填充入住数据==>以后优化==>暂时废弃
        fillGuestrData(row){
          if(this.preBillParam.master_guest[0].id_no ===''){
            this.cardInfoDialog = false
            this.preBillParam.master_guest[0].id_code = row.id_code
            this.preBillParam.master_guest[0].id_no = row.id_no
            this.preBillParam.master_guest[0].name = row.card_name
            this.preBillParam.master_guest[0].telephone = row.phone
            this.preBillParam.master_guest[0].sex = row.sex
          //当数组长度大于1的时候，要进行2步，自动加行自动填充数据
          }else if(this.preBillParam.master_guest.length>=1){
            // let array = _.cloneDeep(this.preBillParam.master_guest)
            // for(var item of this.preBillParam.master_guest){
            //   if(item.id_no === ''){
            //   }else{}
            // }
            console.log('需要判断preBillParam.master_guest===>第二',this.preBillParam.master_guest)
            //避免重复的身份证号
            console.log('this.cardInfoParam.cardNo',this.cardInfoParam.id_no)
            for(var item of this.preBillParam.master_guest){
              if(item.id_no === row.id_no){
                this.$message.warning('不能有重复的证件号!')
                return false
              }else{
                this.preBillParam.master_guest[0].id_code = row.id_code
                this.preBillParam.master_guest[0].id_no = row.id_no
                this.preBillParam.master_guest[0].name = row.card_name
                this.preBillParam.master_guest[0].telephone = row.phone
                this.preBillParam.master_guest[0].sex = row.sex
              }
              // else{
              //   this.preBillParam.master_guest = this.preBillParam.master_guest.filter(item=>item.id_no != '') //过滤掉身份证号为空的从而删除入住人一行数据
              // }
            }
              this.showDeleteButton_2 = true
              // this.preBillParam.master_guest.push(enterValue)
              // this.takePhoto()
            // if(!this.validataRepeatCard()){
            //   return false
            // }else{
            // }
          }
        },
        //获取指定会员计划，会员等级的价码信息
        get_card_code(row){
          let that = this
          let url = that.api.api_member_9102+ '/v1/' + `customer/member/get_card_code/`
          let scopeParam ={
            card_type:  row.card_type,
            card_level: row.card_level,
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res,会员信息返回房价码',res.data.data.results)
            let temp = res.data.data.results
            let rateValue = temp.find(item=>item.extra_item === 'rate_code')
            console.log('rateValue,',rateValue)
            console.log('rateValue[extra_item_value]',rateValue.extra_item_value)
            if(this.preBillParam.master_base[0].code_src === 'HY'){
              this.rateCodeValue = rateValue.extra_item_value
            }
            console.log('this.rateCodeValue',this.rateCodeValue)
            }).catch(error=>{
          })
        },
        //订房中心查询(OTA)
        getCenterRoomList(){
          let that= this
          let url = that.api.api_member_9102+ '/v1/' + 'customer/company/get_company_base_list/'
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
        //卡查询
        getCardMemberList(){
          console.log(this.cardParam,'cardparam')
          let _this = this
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
          console.log('ur',url)
          _this.$axios({
            method: 'get',
            url: url,
          }).then(res=>{
            if (res.data.message == "success") {
              if (res.data.data.results.length != 0) {
                 _this.cardBaseList = res.data.data.results;
                 console.log('llll11111111111',_this.cardBaseList)
                 console.log('222222222因该开始',_this.CardTypeTree)
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
        flushOnlyData(){
          this.preBillParam.master_base[0].room_amount =1
          this.preBillParam.master_base[0].fix_rate =0
          // this.preBillParam.master_base[0].master_lable =0
          // this.preBillParam.master_base[0].master_type =1
          this.preBillParam.master_base[0].arr_time =''
          this.preBillParam.master_base[0].leave_time =[ new Date(), moment(new Date()).add(+1,'days').format('YYYY-MM-DD 14:00:00')]
          this.preBillParam.master_base[0].can_live_num =''
          this.preBillParam.master_base[0].room_type_value =''
          this.preBillParam.master_base[0].dynamic_roomNumber =[]
          this.preBillParam.master_base[0].roomPrice =''
          this.preBillParam.master_base[0].room_type =''
          this.preBillParam.master_base[0].room_number =''
        },
        //清空重置对象或数组的数据
        flushData(){
          this.preBillParam.master_base = [{
                extra_flag: '',
                lock_number:'',
                rate_code: '',//房价码
                is_change_rate: '',
                room_amount: 1,//房间数量几件=add=
                fix_rate: 0,//房价码
                master_lable: 0,
                master_type: 1, //另加<========2019.06.11 //入住类型
                arr_time: '',//预抵时间
                leave_time: [ new Date(), moment(new Date()).add(+1,'days').format('YYYY-MM-DD 14:00:00')],//离开时间
                can_live_num: '',//add
                room_type_value: '',//房型名称对应ID
                dynamic_roomNumber: [],//动态房间号=》应是一个数组
                roomPrice: '', //总价钱=add= 前面都是自己加的===========
                room_type: '',//房型名称
                room_number: '',//房间数几间 数组变字符串 // ['111', '222', '333','444', '555','666', '777']
                // room_class: '',
                // code: '12',
                // code_name: '13',
                // create_user_id: 0,
                // descript: '11',
                // descript_en: '123',
                // hotel_group_id: 123,
                // hotel_id: 123,
                // list_order: 123,
                // modify_user_id: 0,
                account_id: null,
                team_id: 2,
                team_name: '2',
                biz_date: '2018-12-01 10:10:01',
                // rsv_type_id: 22,
                order_no: '123',
                sales_person_id: 2,
                code_occ_id: 2,
                extra_flag: '2',
                adult_num: 2,
                children_num: 2,
                is_fix_rate: 1,
                is_secrete: 1,
                is_secret_rate: 1,
                allowed_ar: 1,
                ar_id: 0,
                code_commision_id: '1',
                code_market: '',
                code_src: '',
                reference_id: 1,
                master_status_lable: null,
                total_chartge: 0,
                total_pay: 0,
                last_account_id: null,
                last_pay_id: null,
                account_num: null,
                pay_num: 0,
                master_id: null,
                sub_lable: null,
                is_room_posted: false,
                building_name: null,
                room_facility_ids: '11',
                extra_person_num: null,
                extra_person_price: null,
                extra_bed_num: null,
                extra_bed_price: null,
                exp_sta: '11',
                rm_occ_id: null,
          }]
        },
        //刷新入住人
        flush_reserveGurst(){
          this.preBillParam.master_guest = [{
            room_floor: 0,
            arr_time: '2019-04-08 12:20:20',//预抵时间
            leave_time: '2019-04-10 12:20:20',//离开时间
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
            // descript: null,
            // descript_en: null,
            list_order: 1,
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
            company_na: '222',
            pic_sign: null,
            pic_photo: null,
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: null,
            email: '1016068291@qq.com',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            // master_base_id: 1231231231,
            guest_id: 123456
          }]
        },
         closeAndFlushData (){
          this.rateCodeValue = 'BAR'
          this.span_input_flag = false
          // this.clearPhoto() //清除掉图片
          this.infoShow = ''
          this.flushData()
          this.flush_reserveGurst()
          this.previewEnterBill.room_no_value = ''  //联房置空
          this.liveoptions_Value = [] //联房置空
          //刷新入住类型
          this.previewTypeList =  [{
              label: '会员',
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
          }]
        },
        //开始计算自动添加房间(该类型下的房间)
        selfMount(item){
          // this.roomNo_data_list = []//同步数据
          this.getCanLiveRoom_self(item) //根据房型选未占用房间
          // let array = []
          // array = this.roomNo_data_list.filter(itemm=>item.dynamic_roomNumber.indexOf(itemm.room_no) === -1)
          // if(item.room_amount > item.dynamic_roomNumber.length){
          //   item.dynamic_roomNumber.push(array[0].room_no)
          // }else{
          //   item.dynamic_roomNumber.pop()
          //   console.log('去掉')
          // }
          // this.getEnter_RommNumber() //计算liveoptions_Value 出现选择主帐房
          // console.log('array',array,this.roomNo_data_list)
          // this.countMoney = 0 //此处必须重新申明值为0避免全局变量的影响
          // for(var item of this.preBillParam.master_base){
          //   this.countMoney = this.countMoney  + this.houseType_priceValue_1 * item.room_amount
          // }
        },
        //点击选项时重新计算(有时间的话可以优化方法)
        getCanLiveRoom_self_2(param){
          console.log('param_2222222',param)
          param.dynamic_roomNumber = []//点击选项时重新计算避免上次的数据干扰
          param.room_amount = 1//点击选项时重新计算避免上次的数据干扰
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          let that = this
          let url= that.api.api_price_9101 + '/v1/' + `room/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: param.room_type_value,
            start_time: start,
            end_time: end
          }
          that.$axios.post(url,scopeParam).then(res=>{
            that.roomNo_data_list = res.data.data.data  //选房号tabel数组
            that.maxNumber = that.roomNo_data_list.length
            let array = []
            array = this.roomNo_data_list.filter(itemm=>param.dynamic_roomNumber.indexOf(itemm.room_no) === -1)
            console.log('array',array)
            console.log('===比较',param.room_amount,param.dynamic_roomNumber)
            if(param.room_amount > param.dynamic_roomNumber.length){
              console.log('进入')
              param.dynamic_roomNumber.push(array[0].room_no)
            }else{
              param.dynamic_roomNumber.pop()
              console.log('去掉')
            }
            this.getEnter_RommNumber() //计算liveoptions_Value 出现选择主帐房
            console.log('array',array,this.roomNo_data_list)
          }).catch(error=>{

          })
        },
        getCanLiveRoom_self(param){
          console.log('触发触发======================')
          console.log('paramwatch1111111',param)
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          let that = this
          let url= that.api.api_price_9101 + '/v1/' + `room/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: param.room_type_value,
            start_time: start,
            end_time: end
          }
          that.$axios.post(url,scopeParam).then(res=>{
            that.roomNo_data_list = res.data.data.data  //选房号tabel数组
            that.maxNumber = that.roomNo_data_list.length
            let array = []
            array = this.roomNo_data_list.filter(itemm=>param.dynamic_roomNumber.indexOf(itemm.room_no) === -1)
            console.log('array',array)
            console.log('===比较',param.room_amount,param.dynamic_roomNumber)
            if(param.room_amount > param.dynamic_roomNumber.length){
              console.log('进入')
              param.dynamic_roomNumber.push(array[0].room_no)
            }else{
              param.dynamic_roomNumber.pop()
              console.log('去掉')
            }
            this.getEnter_RommNumber() //计算liveoptions_Value 出现选择主帐房
            // console.log('array',array,this.roomNo_data_list)
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
          //   reference_id: 121,
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
          let url=  that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/add`
          let scopeParam = that.payDetail_param
          that.$axios.post(url,scopeParam).then(res=>{
            this.$message.success('增加支付记录成功!')
          }).catch(error=>{

          })
        },
        /**新建入住的时候先开帐 只把消费明细传进去 */
        openAccount(){
          this.isAccout = false
          this.addAccount() //先开帐
          // this.getIncomingAccount()//入账代码
          // setTimeout(() => {
          //   this.getInfoByAccount()
          // }, 500);
        },
        /**
         * reference_link_label是关联方标志，0：预定单账户，1：入住单，2：分账后的账户 3：购物, 4. 餐饮 ......
          reference_link_label 会随着业务范围的变更不断扩充/调整. 一般认为 reference_link_label >= 3 的都是哑房账
         */
         //增加一个(主)账户 需要消费的时候等
        addAccount(){
          //消费明细 暂时这样
          // this.account_param.charge_details = [{
          //   // code_income_type_id: this.preBillParam.consumeInfoList[0].code_income_type_id,
          //   code_income_type_id: 11,//入账代码=>代表食品
          //   reference_id: '121',
          //   // charge_amount: this.preBillParam.consumeInfoList[0].price,
          //   charge_amount: this.countMoney,//此处应该是预计收款总额
          // }]
          // this.account_param.charge_details = JSON.stringify(this.account_param.charge_details)
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
          // let batch_account_param = {
          //   reference_link_label: 1,
          //   reference_ids: [],
          // }
          that.account_param.reference_id = '1'
          that.account_param.reference_link_label = 1  //入住单为1 预订单为0
          let scopeParam = that.account_param
          that.$axios.post(url,scopeParam).then(res=>{
            this.return_accountParam_1 = res.data.data
            // this.getInfoByAccount()  //查询账户信息 版本1
            console.log('this.return_accountParam_1',this.return_accountParam_1)
            console.log('this.return_accountParam',this.return_accountParam)
            this.$message.success('创建账户成功')
          }).catch(error=>{
          })
        },
          /**
       * 根据账务id得到主账信息(查询预定的时候负的钱以及其他)
       */
        getInfoByAccount(){
          console.log('this.return_accountParam_1',this.return_accountParam_1)
            let id = this.return_accountParam_1.id
            let that = this
            let param ={
              with_collections: 1,
              related_objects: 1
            }
            let url= that.api.api_9022_9519+ '/v1/' + `finance/account/get_info/` + id
            that.$axios({
            method : 'get',
              url : url,
              params: param
          }).then(res=>{
              this.accoutInfoById_param = res.data.data
              console.log('this.accoutInfoById_param.charge_details11==标记1',this.accoutInfoById_param)
              console.log('this.incomingAccoutList22===标记2',this.incomingAccoutList)
              for(var item of this.accoutInfoById_param.charge_details){
                for(var itemm of this.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
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
         * 当没有收款的时候 信息 总金额总付款等的默认值要规范
         */
        /**@000000002
         * 携带创建账户的信息然后传递给   入住相关的表<===============
         */
        toCarryPayInfo(param){
          console.log('运行toCarryPayInfo')
          console.log('param携带',param)
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/update_master_base/`
          let url= that.api.api_bill_9202 + '/v1/' + `checkin/update_master_base/`
          let master_base = {}
          let scopeParam = {
            master_base : {
              account_opened: 1,
              order_no: param,
              total_chartge: this.payMoney,//总消费return_accountParam.total_consumption
              total_pay:  this.payMoney,//总付款
              account_id: this.return_accountParam_1.id,
              last_account_id:  this.return_accountParam_1.id,
              last_pay_id:  null,
            }
          }
          console.log('scopeParam 创建账户后=>param',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            }).catch(error=>{
          })
        },
        /**
         * 不同形式下的收款
         * 收钱时<===>前提没有主账户的时候就创建一个主账户
         */
        getMoney(){
          console.log('payModeList',this.payModeList)
          console.log('payMoney加的值',this.payMoney)
          console.log('this.payModeValue',this.payModeValue)
          // if(this.payModeValue === 0){
            if(!this.validatePayData()){
              return false
            }
            this.addSomePay()
            // this.addPayDetail() 此时需要调用吗?
            // let paramValue = ''
            // for(var item of this.returnEnterParam){
            //   if(item.room_number === this.room_no_value){
            //     paramValue = item.order_no
            //   }
            // }
            // console.log('paramValue',paramValue)
            // setTimeout(() => {
            //   this.toCarryPayInfo(paramValue) //把数据更新到入住单那里
            // }, 500);
            this.enterPreviewDialog = false   //关闭界面
            this.enterFormVisible = false
            // this.$router.go(0) //刷新当前界面
          // }else{
            // this.prePayDialog = true;
          // }
        },
        //创建账户根据消费记录选择然后支付
        addSomePay(){
          let that = this
          let url= that.api.api_9022_9519+ '/v1/' + `finance/pay_detail/pay_by_charges`
          // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
          console.log('collectionChargeDatavalue========',this.collectionCharge)
          let array_collectionCharge = [{
            code_income_type_id: this.collectionCharge,   //入账类型代码id
            reference_id: 1232,   // 关联消费单id
            // biz_date: moment(new Date()).format('YYYY-MM-DD'),  // 营业日期
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),    // 业务发生的实际时间
            // pay_status: 0,//enterBill.payMode,   // 支付状态 0：未付，1：结清，2：挂账/AR支付，3：部分支付 4: 异常
            is_fixed: 0,  // 是否固定消费. 0 不是,1 是.
            fixed_name: '0',   // 固定消费名称.可空
            rate_code: 'ddf',   // 房价码, 不一定有
            charge_amount: this.countMoney,  // 消费金额 负的 ===>应该是房价码
            pay_amount: 0,   // 已支付的部分,一般是0,
            desc:  '',  // 说明===>此时为摘要
          }]
          array_collectionCharge = JSON.stringify(array_collectionCharge)
          this.returnEnterParam = {
            1074: 1036
          }
          let accountId = Object.values(this.returnEnterParam)[0] //数组转int数组
          console.log('hhhh',accountId)
          let scopeParam = {
            account_id: accountId, //创建主账
            charges: array_collectionCharge,//组装的
            // charge_ids: this.collectionChargeData,
            pay_amount: this.payMoney,
            code_pay_for_id: this.payReasonValue,
            biz_date: moment(new Date()).format('YYYY-MM-DD'),
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            cashier_id:	9,
            pay_mode_id: this.payModeValue,
            // original_pay_dict: {}
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('this.returnEnterParam',this.returnEnterParam)
            // let paramValue = ''
            // for(var item of this.returnEnterParam){
            //   if(item.room_number === this.room_no_value){
            //     paramValue = item.order_no
            //   }
            // }
            // console.log(paramValue,'paramValue')
            // that.toCarryPayInfo(paramValue) //把数据更新到入住单那里
            }).catch(error=>{
          })
        },
        //入住单=>确认入住
        confirmEnter(){
          this.isLoading = true
          if(!this.validatePreviewData() || !this.validatePreData() || !this.validateEnterData()){
              // this.isErrorClass=true
            this.isLoading = false
            return false
          }
          this.getCardList()
          //   this.postEnter()  //这个方法暂且注销==>搬地方了
          // for(var item of this.preBillParam.master_base){
          //   for(var itemm of item.room_number){
          //     sum = sum + itemm * item.fix_rate
          //   }
          // }
          // this.isErrorClass=false
          // this.getIncomingAccount()//入账代码 版本1 此时不调用
          // setTimeout(() => {
          // }, 500);
           // this.openAccount() //直接开帐
          // this.enterPreviewDialog = true //入预收操作
          // this.enterFormVisible=false
          let array_1 = []
          for(var item of this.preBillParam.master_base){
            // item.code_market  = this.marketValue
            // item.code_src = this.srcValue
            item.room_number = item.dynamic_roomNumber
            array_1.push(item.room_number)//把循环所有项的值拼接为一个数组便于构造room_list
          }
          this.roomNumberList = this.handleDynamicNumber(array_1)
          //分割
          this.sum_money = 0//置空操作
          for(var item of this.preBillParam.master_base){
            this.sum_money = this.sum_money  + item.fix_rate * item.dynamic_roomNumber.length
          }
          console.log('roomNumberList',this.roomNumberList)
          console.log('roomNo_data_list,所有可选房间号==canlive',this.roomNo_data_list)
          let new_roomNo_data_list = []
          this.roomNo_data_list.forEach(item=>{
            if(this.roomNumberList.includes(item.room_no)){
                new_roomNo_data_list.push(item)
            }
          })
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
          // this.previewEnterBill.room_no_value = this.roomNumberList[0]//有默认值===>此处默认第一间为主房
          this.previewEnterBill.money = this.sum_money//默认赋值
        },
        // getRoomNumberList(){
        //   let array = []
        //   for(var item of this.roomNumberList){
        //     array.push({
        //        number: item,
        //        isPay: '未收款',
        //      })
        //   }
        //   this.roomNumberList = _.cloneDeep(array)
        //   console.log('this.roomNumberList',this.roomNumberList)
        // },
        //入住单入住方法
        postEnter(){
          let that = this
          // let url= `http://192.168.4.147:9005/v1/checkin/nobooking_checkin/`
          // let url= that.api.api_bill_9202 + '/v1/' + `checkin/nobooking_checkin/`
          let url= 'http://192.168.2.165:9005/v2/' + `checkin/nobooking_checkin/`
          // that.preBillParam.pic_sign = that.imageUrl //这个暂时为空的数据废弃
          let scopeParam = _.cloneDeep(that.preBillParam)
          scopeParam = this.handleDeleteAttribute(scopeParam)
          let array = scopeParam.room_list.filter(item=>item != this.previewEnterBill.room_no_value)
          let twoArray = []
          twoArray.push(this.previewEnterBill.room_no_value)
          twoArray.push(array)
          console.log('twoArraytwoArray',twoArray)
          twoArray.flat()
          let finalArray = [].concat.apply([], twoArray) //二维数组降维
          scopeParam.room_list = finalArray
          scopeParam.room_list = scopeParam.room_list.filter(item=>item !='')//数组中‘’去掉
          //开始组装楼层数据==>每个房间对应
          for(var item of scopeParam.master_guest){
            for(var itemm of this.cardList){
              if(item.room_number === itemm.room_no){
                item.room_floor = itemm.floor_number
                break
              }
            }
          }
          for(var item of scopeParam.master_base){
            for(var itemm of this.roomTypeList){
              if(item.room_type === itemm.descript){
                item.code_name = itemm.code
                break
              }
            }
          }
          scopeParam.lock_arrary = this.lock_arrary[0] //锁号数组map
          // this.getPriceFromType(scopeParam)
          console.log('this.rate_other_listxiaixiai',this.rate_other_list)
          scopeParam.master_rtrate = this.rate_other_list 
          // console.log('roomNo_data_list,所有可选房间号',this.roomNo_data_list)
          console.log('scopeParam=====传入param',scopeParam)
          setTimeout(() => {
            that.$axios.post(url,scopeParam).then(res=>{
              // if(res.data.message === 'fail'){
              //   this.$message.warning('已有在住的人身份证号为')
              // }
              if(res.data.message === 'success'){
                  console.log(res.data.data)
                if(res.data.data.error){
                  console.log('进入一个')
                  this.$message.warning(res.data.data.error)
                }else{
                  console.log('进入另一个')
                  // this.openAccount() //入住成功直接开帐
                  this.enterFormVisible = false
                  this.$message.success('开始入住!')
                  // this.enterPreviewDialog = true //打开入预收界面 此时收房费
                  console.log('res.data.data.data',res.data.data.data)
                  Object.keys(res.data.data.data.main).length===0 ? res.data.data.data.main = res.data.data.data.member : res.data.data.data.main
                  this.returnEnterParam = res.data.data.data.main
                  console.log('this.returnEnterParam=====入住单返回xinxi=======',this.returnEnterParam,Object.values(this.returnEnterParam))
                  // this.$router.go(0)//废弃
                  try {
                    let mainAccount_id = Object.values(this.returnEnterParam)
                    this.mainAccount_id = mainAccount_id[0]
                    console.log('mainAccount_id',this.mainAccount_id)
                    this.$confirm('是否添加预授权?','提示',{
                      confirmButtonText: '是',
                      cancelButtonText: '否',
                      type: 'warning'
                    }).then(()=>{
                      this.flushByEnter()
                      this.handleAuthorization()//打开预授权界面
                    }).catch(()=>{
                      this.flushByEnter()
                      // this.$router.go(0)
                      console.log('关闭')
                    })
                  } catch (error) {
                    console.log('error')
                  }
                }
                this.isLoading = false
              }else{
                this.isLoading = false
                this.$message.error('入住失败!')
                // this.enterPreviewDialog = false //入预收操作
              }
              // this.enterPreviewDialog = true
              }).catch(error=>{
                this.isLoading = false
                this.$message.error('入住失败,请确认数据正确!')
                console.log('error======',error)
            })
          }, 900);
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
          console.log('item',item)
          let that = this
          let url = that.api.api_price_9101 + '/v1/' +  `room/rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date(item.master_base[0].arr_time)).format('YYYY-MM-DD'),
            end_date: moment(new Date(item.master_base[0].leave_time)).format('YYYY-MM-DD'),
            room_type_list: []
          }
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message == 'success'){
              this.rateAllPrice_list = res.data.data.price
              setTimeout(() => {
                console.log('this.rateAllPrice_list----',this.rateAllPrice_list)
                let rate_list = []
                let rate_other_list = []
                item.master_base.forEach(itemIndex=>{
                  rate_list.push(
                    itemIndex.code_name
                    // room_number: item.room_number,
                    // rate_code: item.rate_code,
                    // code_name: item.code_name
                  )
                  rate_other_list.push({
                    room_number: itemIndex.room_number,
                    rate_code: itemIndex.rate_code,
                    room_type: itemIndex.room_type
                  })
                })
                // scopeParam.master_base.forEach(item=>{
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
                console.log('组装后的==>rate_other_list',this.rate_other_list) 
                // need_rateAllPrice_Object = need_rateAllPrice_Object.concat(rate_other_list)
                console.log('need_rateAllPrice_Object---------',need_rateAllPrice_Object)
                // this.rateAllPrice_list.filter(item=>{
                //   console.log('Object.keys(item)',Object.keys(item))
                //   rate_list.includes(Object.keys(item))  
                //   // Object.keys(item)
                // })
              }, 300);
              console.log('success')
            }
            let temprate = res.data.data.price
            // this.rateAllPrice_list = res.data.data.price
            console.log('temprate7天数据',temprate)
            // let key1 = item.room_type_value
            // let temprateValue = temprate[key1]
            // let rateObj = temprateValue
            // let keys = []
            // let values = []
            // for(var key in rateObj){
            //   keys.push(key)
            // }
            // for(var key in rateObj){
            //   values.push(rateObj[key])
            // }
            // keys.pop()
            // values.pop()
            // this.rateDateList = keys
            // this.rateValueList = values
            // console.log('this.rateDateList',this.rateDateList)
            // console.log('this.rateValueList',this.rateValueList)
            }).catch(error=>{
          })
        },
        //入住成功后刷新房态图
        flushByEnter(){
          this.$emit('listenToFlushEnter', '已经入住了,更新房态图')
        },
        //传入后台去掉多余属性 更改值
        handleDeleteAttribute(param){
          let scopeParam = _.cloneDeep(param)//深拷贝
          // scopeParam.master_base[0].arr_time = moment(scopeParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          // scopeParam.master_base[0].leave_time = moment(scopeParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          for(var item of scopeParam.master_base){
            item.arr_time = moment(item.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
            item.leave_time = moment(item.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          }
          // master_base
          for(var item of scopeParam.master_guest){
              delete item.liveCount
          }
          let array_1 = []
          for(var item of scopeParam.master_base){
            item.room_number = item.dynamic_roomNumber
            array_1.push(item.room_number)//把循环所有项的值拼接为一个数组便于构造room_list
            item.room_number = item.dynamic_roomNumber.join(',')//传入后台说需
            // item.room_number = 1//传入后台说需此时为int
            delete item.can_live_num
            delete item.room_type_value
            delete item.dynamic_roomNumber
            delete item.roomPrice
            delete item.visible
          }
          let array_2 = []
          //key value 对象的数组取value变为一个新的数组
          for(let item in array_1){
            array_2.push(array_1[item])
          }
          let str = array_1.join(',') //数组变为字符串
          scopeParam.room_list = str.split(',') //字符串变为数组
          // scopeParam.room_list = this.handleDynamicNumber(array_1)
          return scopeParam
        },
        handleDynamicNumber(array){
           let array_2 = []
          //key value 对象的数组取value变为一个新的数组
          for(let item in array){
            array_2.push(array[item])
          }
          let str = array.join(',') //数组变为字符串
          return str.split(',')
        },
        datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
          // sDate1 = '2019-09-11 01:18:14'
          // sDate2 = '2019-09-12 14:18:14'
          var date1 = new Date(sDate1)
          var date2 = new Date(sDate2)
          var s1 = date1.getTime(),s2 = date2.getTime();
          var total = (s2 - s1)/1000;
          var day = parseInt(total / (24*60*60));//计算整数天数
          console.log('sDate1',sDate1,'sDate2',sDate2)
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
          // dateSpan = sDate2 - sDate1;
          // dateSpan = Math.abs(dateSpan);
          // iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          // return iDays
        },
        //选择房型一行房型相关信息
        getRoomInfo(){
          // this.getRoomType() //准备:循环得到匹配的房型中文名
          console.log('roomTypeList==1=',this.roomTypeList)
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD')
          //暂时加判断，当为钟点房的时候时间需要推一天
          let end = this.preBillParam.master_base[0].master_lable != 1 ? moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD'): moment(new Date()).add(+1,'days').format('YYYY-MM-DD')
          let that = this
          let url =  that.api.api_price_9101 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
          that.$axios({
            url : url,
            method : 'get',
            params:{
              biz_date__gte: start,
              biz_date__lt: end
            },
          }).then(res=>{
          if(res.data.message === 'success'){
            let arrayInfo = res.data.data.results
            // that.roomInfoList = res.data.data.results
            console.log('that.roomInfoList',that.roomInfoList)
            // let start = '2019-04-06'
            // let end =  '2019-04-09'
            for(var item of arrayInfo){
              for(var itemm of that.roomTypeList){
                if(item.room_type === itemm.code){
                  item.room_type_name = itemm.descript
                  // item.can_live_num = item.can_live_num
                  break
                }
              }
            }
            that.roomInfoList = _.uniqBy(arrayInfo,'room_type') //过滤具有相同属性的数组对象
          }else{
              that.$message.error('获取房型信息列表失败!')
          }
          }).catch(error=>{
          })
        },
        haveChangeTime(data){
          this.changeTime = true//改变了
          console.log('shijian改变',data)
        },
        //获取code对应房型数据
        getRoomType(){
          let that = this
          let url = that.api.api_price_9101+ '/v1/' + `room/room_status/get_room_type_list/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomTypeList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        //刷新时间(钟点房及全日房等) no_hour_time==>标记
        flushTime_hour(data){
          console.log('data....',data)
          console.log('......this.preBillParam.master_base[0].master_lable',this.preBillParam.master_base[0].master_lable)
          // this.getRateCode_price()
          this.rateCode_hour = '' //置空操作
          if(this.preBillParam.master_base[0].master_lable != 1){
          console.log('......this.preBillParam.master_base[0].master_lable2222',this.preBillParam.master_base[0].master_lable)
            this.reSetData('非钟点房')
            this.preBillParam.master_base[0].leave_time =[new Date() ,moment(new Date()).add(+1,'days').format('YYYY-MM-DD' + ' ' + this.no_hour_time)]
            //房型为免费房的时候，房价为0==>有bug 要改成房价码市场码里有这个免费房，选择的时候置为0
            if(this.preBillParam.master_base[0].master_lable == 4){
              for(var item of this.preBillParam.master_base){
                item.fix_rate = 0
              }
            }else{
              for(var item of this.preBillParam.master_base){
                item.fix_rate = ''//重新选择房价码
              }
            }
            //限制客户来源
            // this.previewTypeList =  [{
            //   label: '会员',
            //   value: 0
            //   },{
            //   label: '散客入住',
            //   value: 1
            //   },{
            //   label: '团队入住',
            //   value: 2
            //   },{
            //   label: '订房中心/OTA',
            //   value: 3
            //   },{
            //   label: '协议单位',
            //   value: 4
            // }]
          }else if(this.preBillParam.master_base[0].master_lable === 1){
            this.preBillParam.master_base[0].master_type = 1//入住类型变为散客入住 当为钟点房的时候固定住
            //限制客户来源
            // this.previewTypeList =  [{
            //   label: '散客入住',
            //   value: 1
            // }]
          }
        },
        //点击市场码刷新房价码等数据
        flushRateCode(){
          this.preBillParam.master_base[0].rate_code = ''
          this.preBillParam.master_base[0].code_src = ''//置空
          console.log('preBillParam.master_base[0].master_type',this.preBillParam.master_base[0].master_type)
          // if(this.preBillParam.master_base[0].master_type === 1){
          //   this.rateCodeValue = 'BAR'
          //   this.clearMaseterBase()
          // }else if (this.preBillParam.master_base[0].master_type != 0 && this.preBillParam.master_base[0].master_type != 1){
          //   this.clearMaseterBase()
          // }
          if(this.preBillParam.master_base[0].code_src == 'HY' || this.preBillParam.master_base[0].code_market  == 'XYGS'){
            this.clearMaseterBase()
          }
          else if(this.preBillParam.master_base[0].code_market  == 'ZY'){
            this.clearMaseterBase()
            // this.rateCodeValue = ''
            console.log('this.preBillParam.master_base',this.preBillParam.master_base)
          }
          else{
            // this.clearMaseterBase()
            this.rateCodeValue = 'BAR'
          }
          this.infoShow = ''//置空操作
        },
        //重新选房价码的时候，重新选房价
        clearMaseterBase(){
          for(var item of this.preBillParam.master_base){
            item.fix_rate = ''//重新选择房价码
          }
        },
        //通过钟点房的值筛选时间=====>自动得到时间
        getHour_time(param){
          this.reSetData('钟点房')//重置数据 必须要放在前面
          console.log('param',param)
          console.log('this.rateCode_hour2222',this.rateCode_hour)
          param = param !=null ? param.slice(1,2) : ''
          console.log('param',param)
          let time2 = moment().add(param,'hours').format('YYYY-MM-DD HH:mm:ss')
          this.preBillParam.master_base[0].leave_time =[new Date() ,time2]
          console.log('------')
          this.getRateCode_hourPrice()
          console.log('-2------')
          console.log('..chuan.',this.preBillParam.master_base)
        },
        //筛选不同房价码其他要置空(必须得，不然无法统一值)
        reSetData(param){
          if(param==='钟点房'){
            // this.flushOnlyData()
            // this.flush_reserveGurst()
            // this.liveoptions_Value = []
            this.preBillParam.master_guest.forEach(item=>item.room_number='') //置空
            this.preBillParam.master_base[0].master_lable = 1  //钟点房的时候
          }else{ //入住类型不为钟点房的时候置空
            // this.flushOnlyData()
            // this.preBillParam.master_guest.forEach(item=>item.room_number='') //置空
          }
        },
        //房获取酒店钟点房价格(通过房价码获取)
        getRateCode_hourPrice(item,param){
          console.log('jinrrr',item,param)
          let that = this
          let url = that.api.api_price_9101+ '/v1/' + `room/rate_code/get_hours_rate_code/`
          console.log('get_hours_rate_code',that.rateCodeList_hour)
          let rate_code
          let rate_code_value
          try {
            rate_code = that.rateCodeList_hour.filter(item=> item.check_out_time == that.rateCode_hour)
            rate_code_value = rate_code[0].code
          } catch (error) {
            console.log('error,没有对应数据匹配')            
          }
          console.log('rate_code',rate_code_value)
          let scopeParam = {
            rate_code: rate_code_value
          }
          that.$axios.post(url,scopeParam).then(res=>{
              if(res.data.message == 'success'){
                console.log('....',res.data.data)
                let temprate = res.data.data.price
                if(JSON.stringify(temprate) != "{}"){
                  let key1 = param.room_type
                  let temprateValue = temprate[key1]
                  that.houseType_priceValue_1 = temprateValue.price
                  item.fix_rate = that.houseType_priceValue_1
                }else{
                  item.fix_rate = 0
                }
                console.log('temprateValue==hour',temprateValue)
                console.log('111hour',temprateValue[key2])
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        //获取所有的钟点房房价码列表
        getRateCode_hour(){
          let that = this
          let url = that.api.api_price_9101+ '/v1/' + `room/rate_code/get_rate_code_list/?category=T`
          that.$axios.get(url).then(res=>{
            console.log('res.data.data.results',res.data.data.results,res.data.data)
              if(res.data.message == 'success'){
                  that.rateCodeList_hour = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        getCanLiveRoom(param){
          console.log('paramwatch',param)
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
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
              //组装带标签的数组
              for(var item of array){
                for(var itemm of that.roomTagList){
                  if(item.room_no == itemm.room_no){
                    item.tagName = itemm.feature_name
                    break
                  }
                }
              }
              that.roomNo_data_list = array  //选房号tabel数组
          }).catch(error=>{

          })
        },
        //得到房间所对应的标签
        getTagByRoom(){
          let that = this
          let url = that.api.api_room_8091+ '/v1/' + `room/get_roomfeatures_list_tree/`
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
        getRowKeys(row){
          return row.id
        },
        showRoomNumber(){
          // console.log('111',this.$refs.multipleTable)
  //         this.$nextTick(_ => {
  // //         selected.forEach(i => {
  //   //         })
  //             this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[1], true)  // 设置默认选中
  //         })
        },
         //选房号 =>不同房型展示不同的tabel
        chooseNo(item,index){
          console.log('preBillParam.master_base watch',this.preBillParam.master_base)
          // if(!this.validatePreviewData()){
          //   return false
          // }
          console.log('item一行数据enter',item,'index',index)
          if(item.room_type === ''){
            this.$message.warning('请先选择房型!')
            return false
          }else{
            this.getCanLiveRoom(item.room_type_value) //根据房型选未占用房间
            // this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
            // this.getRoomOccupy()//得到房间占用
            this.getTagByRoom()//得到房间对应标签
            this.can_live_number = item.can_live_num//可预定数
            this.pre_live_number = item.room_amount//选择的数
          }
          this.sortNumber = 0; this.noSortNumber = 0
          this.switchValue = '0'
          this.switchNumberDialog = true;//打开选房号dialog
          this._room_type = item.room_type_value
          // console.log('this.roomNo_data_list',this.roomNo_data_list)
          // let room_index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == item.dynamic_roomNumber[0]}) //扎到索引
          // console.log('room_indexroom_index',room_index)
//           this.$nextTick(_ => {
//             this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[room_index], true)  // 设置默认选中
//           })
          //开始选中测试
          // for(var item in array){
            // }
        },
        //切换是否状态
        toggleSelection(rows) {
          console.log('rows,',rows)
          // toggleSelection([tableData[1], tableData[2]])
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row,true);
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
        },
        //后来加上避免再次勾选
        clearSelection(){
          this.$refs.multipleTable.clearSelection();
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
          this.switchValue = '0'
          let _room_type = this._room_type
          let index = _.findIndex(this.preBillParam.master_base,function(o){return o.room_type_value == _room_type})
          console.log('index',index)
          let array = []
          for(var item of this.multipleSelection){
            array.push(item.room_no)
          }
          array = array.filter(item=>item != undefined) //需要过滤
          this.preBillParam.master_base[index].dynamic_roomNumber = array
          //下面这一行重置数据=====>关键
          this.preBillParam.master_base[index].room_amount = this.preBillParam.master_base[index].dynamic_roomNumber.length
          console.log('this.preBillParam.master_base[index]',this.preBillParam.master_base[index])
          //清空一下
          for(var item of this.preBillParam.master_guest){
            item.room_number = ''
          }
          this.previewEnterBill.room_no_value = '' //清空一下
          this.getEnter_RommNumber()//==其中一个作用联房组装数据
        },
        //入住人可选房间号==>基于选择房型的
        getEnter_RommNumber(){
          let array = []
          let array3 = []
          //先把判断去掉
          // if(this.liveoptions_NoChange.length > 0){
          //   this.flag = true
          //   this.liveoptions = this.liveoptions_NoChange
          // }else{
            this.flag = false
            for(var item of this.preBillParam.master_base){
              array.push(item.dynamic_roomNumber)
            }
            console.log(' preBillParam.master_guest', this.preBillParam.master_guest)
            console.log('this.preBillParam.master_base，选的',this.preBillParam.master_base)
            let array2 = array.reduce(function (a, b) { return a.concat(b)}) //二维数组变为一组
            //组装数组
            for(var item of array2){
             array3.push({
               roomNo: item,
               liveCount: '0',
             })
            }
          // }
          console.log('that.roomTypeList<====>房型list',this.roomTypeList )
          this.liveoptions = array3
          this.flag === true ? this.liveoptions_Value = this.liveoptions_NoChange : this.liveoptions_Value = this.liveoptions
          console.log('下拉时',this.liveoptions)
          console.log('....最终检车',this.preBillParam.master_base)
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
        //入住行下拉选中后change====>从而限制每个房间最大可选数
        selectLive(param){
          console.log('param======hax========>',param)
          // console.log('this.liveoptions<=====',this.liveoptions)
          // this.liveoptions.filter(item=>item.roomNo = row)
          let array = []
          for(var item of this.preBillParam.master_guest){
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
          // this.liveoptions_NoChange = this.liveoptions
          console.log('liveoptions_Value',this.liveoptions_Value)
          console.log('hax1====',this.cardList)
          console.log('hax2====this.liveoptions===>',this.liveoptions)
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
          // console.log('点击行时this.liveoptions_NoChange',this.liveoptions_NoChange)
          // let index = _.findIndex(this.preBillParam.master_guest,function(o){return o.room_number == row})
          // console.log('index',index)
        },
        //自动排房
     selfSelectHouse(val){
      //  if(this.multipleSelection.length>0){
      //    this.$message.warning('已经排房!')
      //    this.switchValue = '0'
      //    return false
      //  }
       console.log('this.multipleSelection',this.multipleSelection)
        this.selfSortArray = []
        if(val === '1'){
          let array = []
          this.sortNumber = this.roomNo_data_list.length - (this.roomNo_data_list.length - this.pre_live_number)
          this.noSortNumber = this.roomNo_data_list.length - this.pre_live_number
          var f = length => Array.from({length}).map((v, k) => k)
          array = f(this.sortNumber)
          console.log('自动排房',array)
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
        //增加入住人
        addSelect_2(){
          let enterValue = {
            room_floor: 0,
            arr_time: '2019-04-08 12:20:20',//预抵时间
            leave_time: '2019-04-10 12:20:20',//离开时间
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
            // descript: null,
            // descript_en: null,
            list_order: 1,
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
            company_na: '222',
            pic_sign: null,
            pic_photo: null,
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: null,
            email: '1016068291@qq.com',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            // master_base_id: 1231231231,
            guest_id: 123456
          }
          this.preBillParam.master_guest.push(enterValue)
          this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_2(index){
          if(this.preBillParam.master_guest.length>1){
            if(this.preBillParam.master_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.preBillParam.master_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        //增加选择框新建入住单里
        addSelect(){
          let room_type = {
            extra_flag: '',
            lock_number:'',
            rate_code: this.rateCodeValue,//房价码  这里标记一下，整个页面只有一个房价码
            is_change_rate: '',
            room_amount: 1,
            master_lable: 0,
            master_type: 0, //另加<========2019.06.11 //入住类型
            arr_time: '',//预抵时间
            leave_time: [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
            can_live_num: '',//add
            room_type_value: '',//房型名称对应ID
            dynamic_roomNumber: [],//动态房间号=》应是一个数组
            roomPrice: '', //总价钱=add= 前面都是自己加的===========
            room_type: '',//房型名称
            room_number: '',//房间数几间 数组变字符串 // ['111', '222', '333','444', '555','666', '777']
            // room_class: '',
            fix_rate: 0,//房价码
            account_id: null,
            team_id: 2,
            team_name: '2',
            biz_date: '2018-12-01 10:10:01',
            // rsv_type_id: 22,
            order_no: '123',
            sales_person_id: 2,
            code_occ_id: 2,
            extra_flag: '2',
            adult_num: 2,
            children_num: 2,
            is_fix_rate: 1,
            is_secrete: 1,
            is_secret_rate: 1,
            allowed_ar: 1,
            ar_id: 0,
            code_commision_id: '1',
            code_market: '',
            code_src: '',
            reference_id: 1,
            master_status_lable: null,
            total_chartge: 0,
            total_pay: 0,
            last_account_id: null,
            last_pay_id: null,
            account_num: null,
            pay_num: 0,
            master_id: null,
            sub_lable: null,
            is_room_posted: false,
            building_name: null,
            room_facility_ids: '11',
            extra_person_num: null,
            extra_person_price: null,
            extra_bed_num: null,
            extra_bed_price: null,
            exp_sta: '11',
            rm_occ_id: null,
          }
          this.preBillParam.master_base.push(room_type)
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
          if(this.preBillParam.master_base.length>1){
            if(this.preBillParam.master_base.length ===2){
                this.showDeleteButton = false
            }
            this.preBillParam.master_base.splice(index, 1)
          }else{
            this.showDeleteButton = false
            return
          }
        },
        //关闭tag
        handleClose(item,tag) {
          //不能删除最后一个tag
          console.log('item,tag',item,tag)
          if(item.dynamic_roomNumber.length>1){
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
          }
          item.room_amount =item.room_amount - 1 //同步数据===>去掉同步计数
          // this.preBillParam.master_guest.splice(item.room_number.indexOf(tag), 1)
          for(var item of this.preBillParam.master_guest){
            item.room_number = ''
          }
          this.getEnter_RommNumber() //此时作用便于联房判断数据
          console.log('preBillParam.master_guest', this.preBillParam.master_guest)
        },
        //验证入住数据
        validatePreviewData(){
            //判断选择房型为空时
          console.log('this.preBillParam.master_base, padnuan',this.preBillParam.master_base)
          for(var item of this.preBillParam.master_base){
            if(item.room_type === '' || item.room_type === null){
                this.$message.warning('请选择房型!')
                return false
            }
            if(item.dynamic_roomNumber.length == 0){
              this.$message.warning('请根据房型选择房间号!')
              return false
            }
            if(item.room_amount === 0){
              this.$message.warning('请选择房间数!')
              return false
            }
            if(!String(item.fix_rate)){
              this.$message.warning('请根据房型选择房价!')
              return false
            }
          }
            return true
        },
        /**
         * 判断入住人信息数据=====>身份证不能重复
         */
        validateEnterData(){
          //有入住人的时候
          let array = []
          for(var item of this.preBillParam.master_guest){
            array.push(item.id_no)
          }
          if(new Set(array).size != array.length){
            this.$message.warning('不能有重复的身份证号!')
            return false
          }
          console.log('this.preBillParam.master_guest panduan',this.preBillParam.master_guest)
          for(var item of this.preBillParam.master_guest){
            if(item.telephone){
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
            if(!item.pic_sign){
              this.$message.warning(item.name + '没有上传照片,' + '请上传照片!')
              return false
            }
            // return(
            //   // util.validateBlank(item.telephone,'入住人中联系电话是必填项',this)&&
            //   // util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
            //   // util.validateBlank(item.id_no,'请拍照',this)&& //暂时废弃
            //   util.validateBlank(item.id_no,'身份证是必填项',this)&&
            //   util.validateBlank(item.room_number,'房间号是必填项',this)&&
            //   util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
            // )
          }
          return true
        },
        validataRepeatCard(){
          let array = []
          for(var item of this.preBillParam.master_guest){
            array.push(item.id_no)
          }
          if(new Set(array).size != array.length){
            this.$message.warning('不能有重复的身份证号!')
            return false
          }else{
            return true
          }
        },
        validatePreData(){
          if(this.preBillParam.master_base[0].master_lable === 1){
           return  util.validateBlank(this.rateCode_hour,'请选择钟点房房价码',this)
          }
          if(this.liveoptions_Value.length>1){
            return util.validateBlank(this.previewEnterBill.room_no_value,'请选择主帐房',this)
          }
          return (
            util.validateBlank(this.preBillParam.master_base[0].code_src,'请选择来源码',this)&&
            util.validateBlank(this.preBillParam.master_base[0].code_market ,'请选择市场码',this)&&
            util.validateBlank(this.preBillParam.master_base[0].rate_code,'请选择房价码',this)
          )
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
        getConsumeData(msg){
          this.preBillParam.consumeInfoList = msg
          console.log(msg,'msg')//获取消费子组件传来的值
        },
        //入住单 早餐=》添加早餐项
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
          console.log('this.preBillParam.remarkList',this.preBillParam.remarkList)
          }
        },
        //入住单编辑详情备注
        handleRemarkInfo(row){
          this.addAndUpdate = false //标记
          this.remarkContent_value = row.remarkContent
          this.middle_remarkRow = row //接收
        },
        //入住单=》删除备注
        deleteRemarkInfo(row){
          let index = _.findIndex(this.preBillParam.remarkList,function(o) { return o.time == row.time}) //扎到索引
          this.preBillParam.remarkList.splice(index,1)//删除指定索引
        },
        //入住单=》新增备注
        addRemark(){
          console.log('hhrema',this.preBillParam.master_base)
          console.log('beizhu',this.remark_roomNo,this.remarkContent_value)
        },
        //获取入住单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
          this.previewEnterBill.room_no_value = ''//置空刷新数据
          console.log('item===>',item)
          if(String(item.fix_rate)){
            //点击时判断不能重复选择房型
            let indexs = _.findIndex(this.preBillParam.master_base,function(o){return o.room_type_value == param.room_type})
              if(indexs >= 0){
                this.$message.warning('请不要重复选择!')
                return
            }
          }
          this.preBillParam.master_guest.forEach(item=>item.room_number='')//遍历清除入住人相关房间的的数据
          //一层判断钟点房和非钟点房判断条件不同 这里默认判断力 根据房价码获取价格
          this.preBillParam.master_base[0].master_lable === 1 && this.rateCode_hour ? this.getRateCode_hourPrice(item,param) : this.getRateCode_price(item,param)
          item.can_live_num = param.can_live_num
          item.room_type = param.room_type_name
          item.room_type_value = param.room_type
          console.log('this.cloneData.room_type',this.cloneData.room_type)//缓存进来的到的房型数据
          console.log('item.dynamic_roomNumber111',item.dynamic_roomNumber)
          console.log('this.cloneData.room_no)',this.cloneData.room_no)
          //限制数据选择
          if(this.cloneData.room_type){
            if(this.cloneData.room_type != item.room_type_value){
              this.getCanLiveRoom_self_2(item) //此时调用
            }else{
              if(!item.dynamic_roomNumber.includes(this.cloneData.room_no)){
                console.log('item.dynamic_roomNumber',item.dynamic_roomNumber)
                console.log('this.cloneData.room_no',this.cloneData.room_no)
                this.getCanLiveRoom_self_2(item) //此时调用,点击一哥房型，在返回点击这个房型
              }
            }
          }else{
            this.getCanLiveRoom_self_2(item) //此时调用
          }
          console.log('preBillParam.master_base最终检测',this.preBillParam.master_base)
        },
         /**
         * 根据房型获得未来一周之内的房型
         * @1构造未来七天的时间为一个数组dataArray
         * @2构造相应时间的对应房价也为一个数组rateArray
         * @3可合并为一个数组
         */
        getRateInfo(item){
          console.log('进入reteinfo',item)
          let dateArray = []
          for(var i = 0; i < 7; i++){
            dateArray.push(moment(new Date()).add(i,'days').format('YYYY-MM-DD'))
          }
          this.getRateCodeMore(item)
          console.log('dateArray',dateArray)
          // moment(new Date()).add(1,'days').format('YYYY-MM-DD')
        },
        getRateCodeMore(item){
          console.log('this.rateDateList---1',this.rateDateList)
          console.log('this.rateValueList----2',this.rateValueList)
          console.log('item',item)
          let that = this
          let url = that.api.api_price_9101 + '/v1/' +  `room/rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(7,'days').format('YYYY-MM-DD'),
            room_type_list: [item.room_type_value]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let temprate = res.data.data.price
            console.log('temprate7天数据',temprate)
            let key1 = item.room_type_value
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
            console.log('this.rateDateList',this.rateDateList)
            console.log('this.rateValueList',this.rateValueList)
            }).catch(error=>{
          })
        },
        //构造早餐数据传给后端
        confirmBreakfast(){
          console.log('rate_breakfastListque传给后台',this.rate_breakfastList)
        },
        //根据房型得到对应房价码==>多写是因为需要单独处理早餐的情况=>以后优化 构造房间号及对应的早餐
        getRateCode_BreakFast(){
          this.getEnter_RommNumber()//得到选中的房间数
          let that = this
          let url = that.api.api_price_9101 + '/v1/' +  `room/rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
            room_type_list: [this.parentParam.roomType_code]
          }
          console.log('scopeParamtest=====ratecode',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message === 'success'){
              that.breakfastDialog = true;
              that.rate_breakfastList = res.data.data.breakfast//只取早餐
              let array = []
              for(var item of that.liveoptions_Value){
                array.push({
                  roomNo: item.roomNo,
                  count: that.rate_breakfastList.count,
                  desc: that.rate_breakfastList.desc,
                  amount: 0
                })
              }
              that.rate_breakfastList = array
            }else{
              that.$message.warning('获取数据失败!')
              that.breakfastDialog = false;
            }
            }).catch(error=>{
          })
          console.log('this.liveoptions_Value',this.liveoptions_Value)
        },
          //根据房型得到对应房价码
        getRateCode_price(item,param){
          console.log('item,param==普通的',item,param)
          let that = this
          let url = that.api.api_price_9101 + '/v1/' +  `room/rate_code/get_rate_code/`
          // let temp = []
          // temp.push(param.room_type)
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
            room_type_list: [param.room_type]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('房价码==单独',res.data.data)
            console.log('res.data.data.check_out_time',res.data.data.limit.check_out_time)
            that.no_hour_time = res.data.data.limit.check_out_time
            // this.preBillParam.master_base[0].leave_time[1]
            // [ new Date(), moment(new Date()).add(+1,'days').format('YYYY-MM-DD 12:00:00')]
            // console.log('moment(new Date())',moment(new Date().format('YYY-MM-DD HH:mm:ss')))
            // var time2=moment().add(2,'hours').format('YYYY-MM-DD HH:mm:ss');
            // if(this.preBillParam.master_base[0].master_lable != 1){
            if(this.changeTime === false){
              this.preBillParam.master_base[0].leave_time =[new Date() ,moment(new Date()).add(+1,'days').format('YYYY-MM-DD' + ' ' + that.no_hour_time)]
            }
            // }else{
            //   this.preBillParam.master_base[0].leave_time =[new Date() ,time2]
            // }
            console.log('111this.preBillParam.master_base[0].leave_time[1]', this.preBillParam.master_base[0].leave_time)
            // that.rate_breakfastList = res.data.data.price
            let temprate = res.data.data.price
            let key1 = param.room_type
            let temprateValue = temprate[key1]
            let key2 = moment(new Date()).format('YYYY-MM-DD') //对象嵌套对象里的key值
            that.houseType_priceValue_1 = temprateValue[key2]
            item.fix_rate = that.houseType_priceValue_1
            console.log('item.fix_rate检测',item.fix_rate)
            console.log('temprateValue',temprateValue)
            console.log('111',temprateValue[key2])
            console.log('preBillParam.master_base检测',this.preBillParam.master_base)
            }).catch(error=>{
          })
        },
        //入住单获取对应房类型
        getHouseTypePrice(item,index){
          // item.room_type = value
          console.log('item',item)
          console.log('index',index)
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.master_base[index].room_type = value//替换
          // console.log('this.preBillParam.master_base',this.preBillParam.master_base)
        },
        //入账代码
        getIncomingAccount(){
          let that = this
          let url =  that.api.api_9022_9519+ '/v1/' +  'finance/incoming_account_code/info_list'
          let scopeParam = {
            code_pay_for: that.previewEnterBill.payReasonValue,
            in_or_out: null,
            only_system: null,//	0或者1 一般不传传递此参数
            page_size: 300
          }
          that.$axios.post(url,scopeParam).then(res=>{
              console.log('res.data',res.data.data.list)
              that.incomingAccoutList = res.data.data.list
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
        /**
         * 付款支付方式接口
         */
        getPayMode(){
          let that = this
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
          let url= that.api.api_9022_9519+ '/v1/' + `finance/code_pay_for/info_list?page_size=999`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payInfoList = res.data.data.list
          }).catch(error=>{
          })
        },
          //市场码
        getMarketSrc(param){
          console.log('that.preBillParam.master_base[0].code_market ',this.preBillParam.master_base[0].code_market )
          console.log('param-------',param)
          let that = this
          this.preBillParam.master_base[0].rate_code = ''//置空房价码
          that.marketSrcList = []
          let url =  that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_list'
          let params = {}
          //src 代表市场码
          if(param == 'market'){
           params={
            parent_code: 'market_code'
           }
          }else if(param == 'src'){
            console.log('this.preBillParam.master_base[0].code_market ',this.preBillParam.master_base[0].code_market )
            if(this.preBillParam.master_base[0].code_market ){
                params={
                  parent_code: 'src_code',
                  code_category: that.preBillParam.master_base[0].code_market  //要改
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
          let url = that.api.api_price_9101 + '/v1/' + `room/room_status/get_room_map_list?page_size=1000`
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
        //进入房态=>块状平铺展示//获取cardList
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
          let url = that.api.api_price_9101 + '/v1/' + `room/room_status/get_room_map_list?page_size=1000`
          that.$axios({
            method : 'get',
              url : url,
              params: params
          }).then(res=>{
            if(res.data.message === 'success'){
              that.cardList = res.data.data.results
              that.postEnter()  //搬到这里来了
            }else{
              that.$message.error('获取房态列表失败!')
            }
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
    .breakfastClass{
      height: 260px;
      text-align: center;
      line-height: 50px;
      margin-top: 30px;
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
  //包裹
  .wrap_div{
    display: flex;
    // justify-content: space-between;
    li{
      line-height: 60px;
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
  .enter-dialog .elColMiddle{
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
  .errorClass>>> .el-input__inner{
    border-color: #e07163!important;
    background-color: #ffcbcb;
    color:  #e07163;
    opacity: 0.5;
  }
  .buttonStyle>>> .el-button{
      margin-left: 10px;
      width: 10%;
      background-color: #8895A8
   }
   .button-style_2>>> .el-button{
     width: 80px;
     background-color: #8895A8
   }
   .police-class >>> .el-dialog__header{
      padding: 0px 0px 0px;
   }
  .police-class >>> .el-dialog__body{
    background-color: #000000;
    opacity: 0.7;
   }
  .police-class >>> .el-dialog__footer{
    background-color: #000000;
    opacity: 0.7;
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
  .enter-dialog>>> .el-dialog__header{
    background-color: #00a3df;
  }
  .room_pop>>> .el-popover{
    padding: 0;
  }
  .enter-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .enter-dialog>>> .el-dialog__headerbtn .el-dialog__close{
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
