<template>
  <!--房态-->
  <div class="firstIndex">
    <el-container>
      <!--左侧-->
      <el-aside  class="left" :style="{ height: availHeight }"  style="width: 234px;margin-top: 10px; overflow: auto" >
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="房态筛选" name="first">
            <div>
              <div style="height: 40px; line-height: 40px; background-color: #EEEEEE; width: calc(100% + 40px); margin-left: -15px">
                <span style="margin-left: 10px">客房信息</span>
              </div>
              <div style="margin-top: 8px;display: flex; justify-content: space-between">
                <el-input size="mini" placeholder="请输入房间号" v-model="room_no_value"  style="width: 8vw"></el-input>
                <el-button size="mini"  type='primary' @click="getCardList()">查找</el-button>
              </div>
              <div>
                <el-row style="margin-top: 15px">楼栋:
                  <el-select size="mini" @focus="getBuilding()" @change="getCardList()" style="width: 8vw"  v-model="building_value">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in this.buildingList"
                      :key="item.id"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-row>
                <el-row style="margin-top: 10px">楼层:
                  <el-select size="mini" @focus="getFloor()" @change="getCardList()" style="width: 8vw"  v-model="floor_value">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in this.floorList"
                      :key="item.id"
                      :label="item.descript"
                      :value="item.code">
                      </el-option>
                  </el-select>
                </el-row>
                <el-row style="margin-top: 10px">房型:
                  <el-select size="mini" style="width: 8vw" @focus="getRoomType()" @change="getCardList()"  v-model="roomType_value">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in roomTypeList"
                      :key="item.id"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-row>
              </div>
              <div style="margin-top: 10px;height: 40px; line-height: 40px; background-color: #EEEEEE; width: calc(100% + 30px); margin-left: -15px">
                  <span style="margin-left: 10px">房态信息[{{allNumber}}]</span>
                  <span class="quanbu"><span style="float: right; padding-right: 10px;" @click="filterData('全部1')" :class="{quanbu_1: isActiveBlack_1}">全部</span></span>
              </div>
              <!--房态信息 开始图标筛选-->
              <div style="display: flex; justify-content: space-between; line-height: 40px;margin-top: 20px">
                <div>
                  <div class="boxStyle" @click="filterData('VC')"><div class='littleBox box1'></div><span class="oneLineStyle" @click="filterData('VC')" :class="{activeBlue: isActiveBlue_j}">净房[<span>{{VCNumber}}</span>]</span></div>
                  <div class="boxStyle" @click="filterData('VD')"><div class='littleBox box2'></div><span class="oneLineStyle" @click="filterData('VD')" :class="{activeBlue: isActiveBlue_z}">脏房[<span>{{VDNumber}}</span>]</span></div>
                  <div class="boxStyle" @click="filterData('OD')"><div class='littleBox box3'></div><span class="oneLineStyle" @click="filterData('OD')" :class="{activeBlue: isActiveBlue_check}">住脏[<span>{{ODNumber}}</span>]</span></div>
                </div>
                <div>
                  <div class="boxStyle" @click="filterData('OO')"><div class='littleBox box5'></div><span class="oneLineStyle" @click="filterData('OO')" :class="{activeBlue: isActiveBlue_w}">维修[<span>{{OONumber}}</span>]</span></div>
                  <div class="boxStyle" @click="filterData('OC')"><div class='littleBox box7'></div><span class="oneLineStyle" @click="filterData('OC')" :class="{activeBlue: isActiveBlue_enter}">住净[<span>{{OCNumber}}</span>]</span></div>
                  <div class="boxStyle" @click="filterData('OS')"><div class='littleBox box4'></div><span class="oneLineStyle" @click="filterData('OS')" :class="{activeBlue: isActiveBlue_suoding}">锁定[<span>{{OSNumber}}</span>]</span></div>
                </div>
              </div>
              <div style="height: 40px; margin-top: 20px; line-height: 40px; background-color: #EEEEEE; width: calc(100% + 30px); margin-left: -15px">
                  <span style="margin-left: 10px">图例说明</span>
                  <span style="float: right; padding-right: 10px; cursor: pointer;" @click="filterData('全部2')" :class="{quanbu_2: isActiveBlack_2}">全部</span>
              </div>
              <!--图例说明-->
              <div>
                <div class="boxStyle bigDiv">
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/team.png"/><span class="secondLineStyle" @click="filterSelectData('团队')" :class="{activeBlue: isActiveBlue_team}">团队</span></div>
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/qianFei.png"/><span class="secondLineStyle" @click="filterSelectData('欠费')" :class="{activeBlue: isActiveBlue_qf}">欠费</span></div>
                </div>
                <div class="boxStyle bigDiv">
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/computer.png"/><span class="secondLineStyle" @click="filterSelectData('电脑')" :class="{activeBlue: isActiveBlue_computer}">电脑</span></div>
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/timeHouse.png"/><span class="secondLineStyle" @click="filterSelectData('钟点')" :class="{activeBlue: isActiveBlue_clock}">钟点</span></div>
                </div>
                <div class="boxStyle bigDiv">
                  <!-- <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/lock.png"/><span class="secondLineStyle" @click="filterData('锁定')" :class="{activeBlue: isActiveBlue_lock}">锁定</span></div> -->
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/visitor.png"/><span class="secondLineStyle" @click="filterSelectData('访客')" :class="{activeBlue: isActiveBlue_visitor}">访客</span></div>
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/selfUse.png"/><span class="secondLineStyle" @click="filterSelectData('自用')" :class="{activeBlue: isActiveBlue_self}">自用</span></div>
                </div>
                 <div class="boxStyle bigDiv">
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/preLeave.png"/><span class="secondLineStyle" @click="filterSelectData('预离')" :class="{activeBlue: isActiveBlue_leave}">预离</span></div>
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/selfHelp.png"/><span style="margin-left: 5px" @click="filterSelectData('自助机')" :class="{activeBlue: isActiveBlue_zzj}">自助机</span></div>
                </div>
                 <div class="boxStyle bigDiv">
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/and.png"/><span class="secondLineStyle" @click="filterSelectData('联房')" :class="{activeBlue: isActiveBlue_lf}">联房</span></div>
                  <div class="boxStyle"><img src="@/assets/images/pms/houseStatus/preDestine.png"/><span class="secondLineStyle" @click="filterSelectData('预定')" :class="{activeBlue: isActiveBlue_yd}">预定</span></div>
                </div>
                 <div class="boxStyle bigDiv">
                </div>
              </div>
              <!--end底部图标-->
              <div class="boxStyle" style="margin-top: 50px">
                <!-- <el-popover
                  placement="right"
                  @hide="backStatus()"
                  width="450"
                  trigger="click">
                  <el-row style="width: 100%">
                    <el-date-picker
                      :clearable = false
                      v-model="houseSituation_date"
                      type="date"
                      :picker-options="rangeDate"
                      @change="getHouseSituation()"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-button type="primary" style="small" @click="changeDate(-1)">前一天</el-button>
                    <el-button type="primary" style="small" @click="changeDate(1)">后一天</el-button>
                  </el-row>
                  <div slot="reference">
                    <img class="imgStyle" src="@/assets/images/pms/houseStatus/futureHouse2x.png"/>
                    <div>
                      <span v-if="current_houseStatus === true">未来房情</span>
                      <span v-else>当前房情</span>
                    </div>
                  </div>
                </el-popover>
                <div>
                  <img class="imgStyle" src="@/assets/images/pms/houseStatus/printHouse2x.png"/>
                  <div><span>打印房态</span></div>
                </div>
                <div>
                  <img class="imgStyle" src="@/assets/images/pms/houseStatus/historyHouse2x.png"/>
                  <div><span>史客房价</span></div>
                </div> -->
              </div>
              <!-- <div class="boxStyle_2">
                <div>
                  <img class="imgStyle" src="@/assets/images/pms/houseStatus/editHouse2x.png"/>
                  <div><span>修改房态明细</span></div>
                </div>
                <div style="margin-left: 50px">
                  <img class="imgStyle" src="@/assets/images/pms/houseStatus/floor2x.png"/>
                  <div><span>查房明细</span></div>
                </div>
              </div> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="批量操作" name="second">
            <div style="height: 400px;">
              <div class="batchHead">
                <span style="margin-left:10px">已选中房间号[{{batchTags.length}}]</span>
              </div>
              <div style="height: 340px;overflow: auto">
                <el-tag
                  v-for="tag in batchTags" style="margin: 10px 5px 0 0;" :key="tag.id">
                  {{tag.room_no}}
                </el-tag>
              </div>
            </div>
            <div style="height: 400px">
              <div class="batchHead">
                <span style="margin-left:10px">批量操作</span>
              </div>
              <div style="margin-top: 20px">
                <el-row>
                  <el-button :disabled="isPress_1" @click="setBatchDirtyClean('dirty')" style="width: 84px;color: #c8c8c8" :class="{batchBtn: isShow_1}">置脏</el-button>
                  <el-button  @click="handleBatchRepairLock('repair'); repairDialog=true" :disabled="isPress_3" style="color: #c8c8c8" :class="{batchBtn: isShow_3}">置维修</el-button>
                </el-row>
                <el-row style="margin-top: 10px">
                  <!-- <el-button :disabled="isPress_2" @click="setBatchDirtyClean()" style="color: #c8c8c8" :class="{batchBtn: isShow_2}">置干净</el-button> -->
                  <!-- <el-button @click="handleBatchRepairLock(); lockDialog=true" :disabled="isPress_4" style="width: 84px;color: #c8c8c8" :class="{batchBtn: isShow_4}">锁房</el-button> -->
                </el-row>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <!--右侧-->
      <el-main class="right" style="overflow: auto; max-height: 800px" >
        <!-- 当批量操作的时候展示 -->
        <div class="parDiv" v-if="batchOperation">
          <div style="display: flex;flex-wrap: wrap;width: 100%;" v-for="(data,index) of newCardList" :key="index">
            <el-col  :span="2" class="right-card"  v-for="(item, index) of data" :key="index">
              <!-- 净房 -->
              <div @click="cardClick(item,index)" :class="{trueMark: item.is_halt}" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1"  v-if="item.room_state === 'VC'"  class="boxActive">
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
              </div>
              <!-- 入住房 住净-->
              <div  @click="cardClick(item,index)" :class="{trueMark: item.is_halt}" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1" v-if="item.room_state === 'OC'"  class="boxActive_6">
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
              </div>
              <!-- 脏房 -->
              <div  @click="cardClick(item,index)" :class="{trueMark: item.is_halt}" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1" v-if="item.room_state === 'VD'"  class="boxActive_3">
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
              </div>
              <!-- 检查 住脏-->
              <div  @click="cardClick(item,index)" :class="{trueMark: item.is_halt}" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1" v-if="item.room_state === 'OD'"  class="boxActive_2">
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
              </div>
              <!-- 维修 -->
              <div  @click="cardClick(item,index)" :class="{trueMark: item.is_halt}" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1" v-if="item.room_state === 'OO'"  class="boxActive_4">
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
              </div>
              <!-- 锁定房间 -->
              <div  @click="cardClick(item,index)" :class="{trueMark: item.is_halt}" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1" v-if="item.room_state === 'OS'"  class="boxActive_5">
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
              </div>
            </el-col>
          </div>
        </div>
        <!-- 当查看未来房情的时候展示 -->
        <div class="parDiv" v-if="future_houseStatus">
          <el-col  :span="2" class="right-card" v-for="(item, index) in future_cardList" :key="index">
            <!-- 净房 -->
            <div v-if="item.room_state === 'VC'"  class="boxActive">
              <div  style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px">{{item.building_name}}</span>
                <!-- <span>11</span> -->
                <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
              </div>
            </div>
            <!-- 入住房 住净-->
            <div v-if="item.room_state === 'OC'"  class="boxActive_6">
              <div  style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px">{{item.building_name}}</span>
                <!-- <span>11</span> -->
                <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
              </div>
            </div>
            <!-- 脏房 -->
            <div v-if="item.room_state === 'VD'"  class="boxActive_3">
              <div  style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px">{{item.building_name}}</span>
                <!-- <span>11</span> -->
                <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
              </div>
            </div>
             <!-- 检查 住脏-->
            <div v-if="item.room_state === 'OD'"  class="boxActive_2">
              <div  style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px">{{item.building_name}}</span>
                <!-- <span>11</span> -->
                <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
              </div>
            </div>
            <!-- 维修 -->
            <div v-if="item.room_state === 'OO'"  class="boxActive_4">
              <div  style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px">{{item.building_name}}</span>
                <!-- <span>11</span> -->
                <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
              </div>
            </div>
            <!-- 锁定房间 -->
            <div v-if="item.room_state === 'OS'"  class="boxActive_5">
              <div  style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px">{{item.building_name}}</span>
                <!-- <span>11</span> -->
                <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
              </div>
            </div>
          </el-col>
        </div>
        <!-- 右边房间(块状) 平铺展示===》当前房态(房情)-->
        <div class="parDiv" v-if="current_houseStatus">
          <div style="display: flex;flex-wrap: wrap;width: 100%;" v-for="(data,index) of newCardList" :key="index">
            <el-col  :span="2" v-for="(item, index) of data" :key="index">
              <el-popover
              width="370"
              ref="popover4"
              placement="bottom-end"
              :open-delay="300"
              trigger="hover">
              <!--单击时弹出浮动小方块-->
              <div>
                <!-- 浮动框的v-if====>不同状态下的房间弹出的内容不一样 净房-->
                <div v-if="item.room_state === 'VC'" class="pop_state"  style="width: 350px; height: 100px;overflow: auto">
                  <div><el-button type="primary" round size="mini">{{item.room_no}}</el-button>{{item.building_name}}&nbsp;{{item.room_type}}</div>
                  <div>
                    <el-row>
                      <button class="setbtn" @click="sendPreview(item);flushData()">预定</button>
                      <button class="setbtn" @click="sendEnter(item);flushData()">入住</button>
                      <!-- <el-button type="info">预定</el-button>
                      <el-button type="info" size="mini">入住</el-button> -->
                    </el-row>
                    <el-row style="margin-top: 10px">
                      <button class="setbtn" @click="setDirty(item);">置脏</button>
                      <button class="setbtn" @click="handleSetRepair(item); repairDialog=true">置维修</button>
                    </el-row>
                    <el-row style="margin-top: 10px">
                      <!-- <button class="setbtn" @click="setOpenDoor(item); openDoorDialog=true">请求开门</button> -->
                      <!-- <button class="setbtn" @click="handleSetLock(item,index); lockDialog = true">锁房</button> -->
                    </el-row>
                  </div>
                </div>
                 <!-- 浮动框的v-if====>不同状态下的房间弹出的内容不一样 住净-->
                <div v-if="item.room_state === 'OC'" style="width: 350px; min-height: 160px; overflow: auto">
                   <div class="pop_state">
                    <div>
                      <el-button type="primary" round size="mini">{{item.room_no}}</el-button>{{item.building_name}}&nbsp;{{item.room_type}}
                      <!-- <ul style="font-size: 12px;margin: 2px 0px 0px 5px" v-for="(item,index) of item.room_guest.split(',')" :key = index>
                        <li>{{item}}</li>
                      </ul> -->
                      <ul style="font-size: 12px;margin: 2px 0px 0px 5px" v-for="(item,index) of linInfoParam.master_guest" :key = index>
                        <li>{{item.name}}</li>
                      </ul>
                    </div>
                    <div>
                      <el-row style="display: flex; justify-content: flex-end">
                        <button class="setbtn" @click="openEnterAccount(item)">入消费</button>
                        <button class="setbtn" @click="openEndAccount(item)">结账</button>
                      </el-row>
                      <el-row style="margin-top: 10px; display: flex;  justify-content: flex-end">
                        <!-- <button class="setbtn">换房型</button> -->
                        <!-- <button class="setbtn" @click="setOpenDoor(item); openDoorDialog=true">请求开门</button> -->
                        <button class="setbtn" @click="openChangeRoomNumber(item)">换房</button>
                      </el-row>
                      <el-row style="margin-top: 10px;  display: flex;  justify-content: flex-end">
                        <button class="setbtn" @click="openPayAccount(item)">入预收</button>
                        <button class="setbtn" @click="openContinue(item);">续住</button>
                        <button class="setbtn" @click="activateCard(item);">制卡</button>
                        <!-- <button class="setbtn" @click="setDirty(item);">置脏</button> -->
                      </el-row>
                    </div>
                  </div>
                  <el-row style="margin-top: 5px; color: #666"><hr/></el-row>
                  <div  class="pop_bottom">
                    <div style="margin-top: 5px;color: #8e8e8e; width: 60%">
                      <el-row>{{linInfoParam.arr_time}}</el-row>
                      <el-row>{{linInfoParam.leave_time}}</el-row>
                      <div v-if="linInfoParam.combine_room_list" style="color: #5bbbf5">
                        <span>关联：</span>
                        <span v-for="(item,index) of linInfoParam.combine_room_list" :key="index">
                          {{item[0]}}、
                        </span>
                      </div>
                    </div>
                    <div>
                      <el-row style="margin-top: 5px">消费金额:{{popverParam.general_consumption}}</el-row>
                      <!--没含预授权-->
                      <el-row>预收金额:{{popverParam.pay_amount}}</el-row>
                      <el-row v-if="popverParam.balance > 0 ">应退金额:{{Math.abs(popverParam.balance)}}</el-row>
                      <el-row v-else>应收金额:{{Math.abs(popverParam.balance)}}</el-row>
                      <!-- <el-row>余额:{{popverParam.balance}}</el-row> -->
                    </div>
                  </div>
                </div>
                <!-- 浮动框的v-if====> 入住房 住脏-->
                <div v-if="item.room_state === 'OD'"   style="width: 350px;  min-height: 160px; ">
                  <div class="pop_state">
                    <div>
                      <el-button type="primary" round size="mini">{{item.room_no}}</el-button>{{item.building_name}}&nbsp;{{item.room_type}}
                      <!-- <ul style="font-size: 12px;margin: 2px 0px 0px 5px" v-for="(item,index) of popverParam" :key = index>
                        <li>{{item.name}}</li>
                      </ul> -->
                      <!-- <ul style="font-size: 12px;margin: 2px 0px 0px 5px" v-for="(item,index) of item.room_guest.split(',')" :key = index>
                        <li>{{item}}</li>
                      </!-->
                      <ul style="font-size: 12px;margin: 2px 0px 0px 5px" v-for="(item,index) of linInfoParam.master_guest" :key = index>
                        <li>{{item.name}}</li>
                      </ul>
                    </div>
                    <div>
                      <el-row style="display: flex; justify-content: flex-end">
                        <button class="setbtn" @click="openEnterAccount(item)">入消费</button>
                        <button class="setbtn" @click="openEndAccount(item)">结账</button>
                      </el-row>
                      <el-row style="margin-top: 10px; display: flex;  justify-content: flex-end">
                        <!-- <button class="setbtn">换房型</button> -->
                        <!-- <button class="setbtn" @click="setOpenDoor(item); openDoorDialog=true">请求开门</button> -->
                        <button class="setbtn" @click="openChangeRoomNumber(item)">换房</button>
                      </el-row>
                      <el-row style="margin-top: 10px;  display: flex;  justify-content: flex-end">
                        <button class="setbtn" @click="openPayAccount(item)">入预收</button>
                        <button class="setbtn" @click="openContinue(item);">续住</button>
                        <button class="setbtn" @click="activateCard(item);">制卡</button>
                        <!-- <button class="setbtn" @click="setDirty(item);">置脏</button> -->
                      </el-row>
                    </div>
                  </div>
                  <el-row style="margin-top: 5px; color: #666"><hr/></el-row>
                    <div  class="pop_bottom">
                      <div style="margin-top: 5px;color: #8e8e8e;">
                        <el-row>{{linInfoParam.arr_time}}</el-row>
                        <el-row>{{linInfoParam.leave_time}}</el-row>
                        <div v-if="linInfoParam.combine_room_list" style="color: #5bbbf5">
                        <span>关联：</span>
                        <span v-for="(item,index) of linInfoParam.combine_room_list" :key="index">
                          {{item[0]}}、
                        </span>
                        </div>
                      </div>
                      <div>
                        <el-row style="margin-top: 5px">消费金额:</el-row>
                        <el-row>预收金额:</el-row>
                        <el-row>应收金额:</el-row>
                      </div>
                  </div>
                </div>
                <!-- 浮动框的v-if====> 脏房-->
                <div v-if="item.room_state === 'VD'"   style="width: 350px; height: 80px; ">
                  <div class="pop_state">
                    <div><el-button type="primary" round size="mini">{{item.room_no}}</el-button>{{item.building_name}}&nbsp;{{item.room_type}}</div>
                    <div>
                      <el-row>
                        <!-- <button class="setbtn" @click="sendEnter(item);flushData()">入住</button> -->
                      </el-row>
                      <el-row style="display: flex; margin-top: 10px;">
                        <button class="setbtn" @click="sendPreview(item)">预定</button>
                        <button class="setbtn" @click="setClean(item);">置干净</button>
                      </el-row>
                      <el-row style="margin-top: 10px; display: flex;  justify-content: flex-end">
                        <button class="setbtn" @click="handleSetRepair(item); repairDialog=true">置维修</button>
                        <!-- <button class="setbtn" @click="setOpenDoor(item); openDoorDialog=true">请求开门</button> -->
                      </el-row>
                      <el-row style="margin-top: 10px;  display: flex;  justify-content: flex-end">
                        <!-- <button class="setbtn" @click="handleSetLock(item, index); lockDialog = true">锁房</button> -->
                      </el-row>
                    </div>
                  </div>
                </div>
                <!-- 浮动框的v-if====> 维修-->
                <div v-if="item.room_state === 'OO'"   style="width: 350px; height: 80px; ">
                  <div class="pop_state">
                    <div><el-button type="primary" round size="mini">{{item.room_no}}</el-button>{{item.building_name}}&nbsp;{{item.room_type}}</div>
                    <div>
                      <el-row>
                        <button class="setbtn" @click="endRepair(item)">结束维修</button>
                      </el-row>
                    </div>
                  </div>
                  <div style="position:absolute; top:50px; right:160px; width:100px; font-size:16px;">该房修理中</div>
                </div>
                 <!-- pop浮动框的v-if====> 锁房-->
                <div v-if="item.room_state === 'OS'"   style="width: 350px; height: 80px; ">
                  <div class="pop_state">
                    <div><el-button type="primary" round size="mini">{{item.room_no}}</el-button>{{item.building_name}}&nbsp;{{item.room_type}}</div>
                    <div>
                      <el-row>
                        <button class="setbtn">取消锁房</button>
                        <!-- <button @click="setOpenDoor(item); openDoorDialog=true" class="setbtn">请求开门</button> -->
                      </el-row>
                    </div>
                  </div>
                  <div style="position:absolute; top:50px; right:160px; width:100px; font-size:16px;">该房被锁定</div>
                </div>
              </div>
              <!-- 小方块即房间的v-if===>start 净房-->
              <div v-if="item.room_state === 'VC'"  slot="reference"  @mouseover="hoverIndex = index;mouseOver()" @mouseout="hoverIndex = -1;mouseOut()"   @click="popoverClick(item,index)"  :class="{popoverActive: activeClassName == index && isActive, lockCss: activeClassName == index && lockCss_active, hoverActive: true}"   @dblclick="sendEnter(item);flushData()"  class="boxActive">
                <!--单个房间(小方块)第一行-->
                <div  style="display: flex; justify-content: space-between;">
                    <span style="font-size: 14px">{{item.room_type_name}}</span>
                    <!-- <span>11</span> -->
                    <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.expandAttribute.name}} -->
                  </span>
                </div>
                <!-- <div :class="{iconEnd: item.expandAttribute.isleave === 1 ? true : false}">
                  <img src="@/assets/images/pms/houseStatus/preLeave.png" style="height: 16px">
                </div> -->
              </div>
            <!-- card入住房 住净-->
             <div v-if="item.room_state === 'OC'"  @mouseover="hoverIndex = index;mouseOver()" @mouseout="hoverIndex = -1;mouseOut()"   @click="popoverClick(item,index)"  slot="reference" :class="{popoverActive: activeClassName == index && isActive,lockCss: activeClassName == index && lockCss_active, hoverActive: true}"   @dblclick="openOrderInfo(item)"  class="boxActive_6">
                <!--单个房间(小方块)第一行-->
                <div  style="display: flex; justify-content: space-between;">
                    <span style="font-size: 14px">{{item.room_type_name}}</span>
                    <!-- <span>11</span> -->
                    <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px; height: 35px">
                  <span class="text-ellipsis" v-if="item.room_guest">
                    {{item.room_guest.split(',')[0]}}
                  </span>
                </div>
                <div :class="{iconEnd: item.room_state_extra.length != 0 ? true : false}">
                  <img v-if="item.room_state_extra[0] == '1'" src="@/assets/images/pms/houseStatus/team.png" style="height: 16px">
                  <img v-if="item.room_state_extra[1] == '1'" src="@/assets/images/pms/houseStatus/qianFei.png" style="height: 16px">
                  <img v-if="item.room_state_extra[2] == '1'" src="@/assets/images/pms/houseStatus/timeHouse.png" style="height: 16px">
                  <img v-if="item.room_state_extra[3] == '1'" src="@/assets/images/pms/houseStatus/preLeave.png" style="height: 16px;float: right;">
                  <img v-if="item.room_state_extra[4] == '1'&& item.master_room_no != item.room_no" src="@/assets/images/pms/houseStatus/and.png" style="height: 16px">
                  <img v-if="item.room_state_extra[4] == '1'&& item.master_room_no == item.room_no" src="@/assets/images/pms/houseStatus/main.png" style="height: 16px">
                  <img v-if="item.room_state_extra[5] == '1'" src="@/assets/images/pms/houseStatus/selfUse.png" style="height: 16px">
                  <img v-if="item.room_state_extra[6] == '1'" src="@/assets/images/pms/houseStatus/selfHelp.png" style="height: 16px">
                </div>
            </div>
               <!-- card入住房 住脏-->
             <div v-if="item.room_state === 'OD'"  @mouseover="hoverIndex = index;mouseOver()" @mouseout="hoverIndex = -1;mouseOut()"   @click="popoverClick(item,index)"  slot="reference" :class="{popoverActive: activeClassName == index && isActive,lockCss: activeClassName == index && lockCss_active, hoverActive: true}"   @dblclick="openOrderInfo(item)"  class="boxActive_2">
                <!--单个房间(小方块)第一行-->
                <div  style="display: flex; justify-content: space-between;">
                    <span style="font-size: 14px">{{item.room_type_name}}</span>
                    <!-- <span>11</span> -->
                    <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px; height: 35px">
                  <span class="text-ellipsis" v-if="item.room_guest">
                    {{item.room_guest.split(',')[0]}}
                  </span>
                </div>
                <div :class="{iconEnd: item.room_state_extra.length != 0 ? true : false}">
                  <img v-if="item.room_state_extra[0] == '1'" src="@/assets/images/pms/houseStatus/team.png" style="height: 16px">
                  <img v-if="item.room_state_extra[1] == '1'" src="@/assets/images/pms/houseStatus/qianFei.png" style="height: 16px">
                  <img v-if="item.room_state_extra[2] == '1'" src="@/assets/images/pms/houseStatus/timeHouse.png" style="height: 16px">
                  <img v-if="item.room_state_extra[3] == '1'" src="@/assets/images/pms/houseStatus/preLeave.png" style="height: 16px;float: right;">
                  <img v-if="item.room_state_extra[4] == '1'&& item.master_room_no != item.room_no" src="@/assets/images/pms/houseStatus/and.png" style="height: 16px">
                  <img v-if="item.room_state_extra[4] == '1'&& item.master_room_no == item.room_no" src="@/assets/images/pms/houseStatus/main.png" style="height: 16px">
                  <img v-if="item.room_state_extra[5] == '1'" src="@/assets/images/pms/houseStatus/selfUse.png" style="height: 16px">
                  <img v-if="item.room_state_extra[6] == '1'" src="@/assets/images/pms/houseStatus/selfHelp.png" style="height: 16px">
                </div>
              </div>
              <!-- card脏房 -->
             <div v-if="item.room_state === 'VD'"  @mouseover="hoverIndex = index;mouseOver()" @mouseout="hoverIndex = -1;mouseOut()"   @click="popoverClick(item,index)"  slot="reference" :class="{popoverActive: activeClassName == index && isActive, lockCss: activeClassName == index && lockCss_active, hoverActive: true}"    class="boxActive_3">
                <!--单个房间(小方块)第一行-->
                <div  style="display: flex; justify-content: space-between;">
                    <span style="font-size: 14px">{{item.room_type_name}}</span>
                    <!-- <span>11</span> -->
                    <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
                <div>
                </div>
              </div>
              <!-- card锁定房间 -->
             <div v-if="item.room_state === 'OS'"  @mouseover="hoverIndex = index;mouseOver()" @mouseout="hoverIndex = -1;mouseOut()"   @click="popoverClick(item,index)" slot="reference" :class="{popoverActive: activeClassName == index && isActive,  hoverActive: true}"    class="boxActive_5">
                <!--单个房间(小方块)第一行-->
                <div  style="display: flex; justify-content: space-between;">
                    <span style="font-size: 14px">{{item.room_type_name}}</span>
                    <!-- <span>11</span> -->
                    <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
                <div>
                </div>
              </div>
              <!-- 维修 -->
             <div v-if="item.room_state === 'OO'"  @mouseover="hoverIndex = index;mouseOver()" @mouseout="hoverIndex = -1;mouseOut()"  slot="reference" :class="{popoverActive: activeClassName == index && isActive,lockCss: activeClassName == index && lockCss_active,  hoverActive: true}"   @dblclick="openOrderInfo()"  class="boxActive_4">
                <!--单个房间(小方块)第一行-->
                <div  style="display: flex; justify-content: space-between;">
                  <span style="font-size: 14px">{{item.room_type_name}}</span>
                  <!-- <span>11</span> -->
                  <span style="font-weight: bold; font-size: 16px">{{item.room_no}}</span>
                </div>
                <div style="text-align: center;line-height: 35px">
                  <span>
                    <!-- {{item.room_type_name}} -->
                  </span>
                </div>
                <div>
                </div>
              </div>
            </el-popover>
            </el-col>
          </div>
          <!-- ================================================================================================== -->
        </div>
        <!--置干净dialog-->
        <el-dialog width="40%" class="houseTypeClass" title="置干净" :visible.sync="cleanDialog" :modal="false">
          <el-row style="text-align: center">打扫时间:
            <el-date-picker
              :clearable="false"
              v-model="clean_dateValue"
              type="datetime"
              style="width: 25vw"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="confirmClean">确定</el-button>
          </span>
        </el-dialog>
         <!--锁房dialog-->
        <el-dialog width="25%"  class="houseTypeClass" title="锁房" :visible.sync="lockDialog" :modal="true">
            <el-row>开始日期:
              <el-date-picker
                value-format = 'yyyy-MM-dd HH:mm:ss'
                v-model="repairAndParam.start_time"
                :picker-options="rangeDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-row>
            <el-row style="margin-top: 10px">结束日期:
              <el-date-picker
                value-format = 'yyyy-MM-dd HH:mm:ss'
                v-model="repairAndParam.end_time"
                :picker-options="rangeDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-row>
            <el-row style="margin-top: 10px">占用状态:
              <el-select @focus="getRepairOccupy()"  v-model="repairAndParam.room_occupy_after_code">
                <el-option
                  v-for="item in repairOccupyList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-row>
            <el-row style="margin-top: 10px;">锁房原因:
              <el-select @focus="getRepairReason()"  v-model="repairAndParam.room_state_change_reason">
                <el-option
                  v-for="item in repairReasonList"
                  :key="item.code"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-row>
            <el-row  style="margin-top: 20px; margin-bottom: 10px">备注:</el-row>
            <el-input type="textarea" :rows="5" v-model="repairAndParam.remark"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary"  v-if="btnShow" @click="setRepairAndLock();lockDialog = false">提交</el-button>
            <el-button type="primary" v-if="batchBtnShow" @click="setBatchRepairAndLock();lockDialog = false">提交</el-button>
          </span>
        </el-dialog>
        <!--置维修dialog-->
        <el-dialog width="25%"  class="houseTypeClass" title="置维修" :visible.sync="repairDialog" :modal="true">
            <el-row>开始日期:
              <el-date-picker
                value-format = 'yyyy-MM-dd HH:mm:ss'
                v-model="repairAndParam.start_time"
                :picker-options="rangeDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-row>
            <el-row style="margin-top: 10px">结束日期:
              <el-date-picker
                value-format = 'yyyy-MM-dd HH:mm:ss'
                v-model="repairAndParam.end_time"
                :picker-options="rangeDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-row>
            <!-- <el-row style="margin-top: 10px">占用状态:
              <el-select @focus="getRepairOccupy()"  v-model="repairAndParam.room_occupy_after_code">
                <el-option
                  v-for="item in repairOccupyList"
                  :key="item.id"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-row> -->
            <el-row style="margin-top: 10px;">维修原因:
              <el-select @focus="getRepairReason()"  v-model="repairAndParam.room_state_change_reason">
                <el-option
                  v-for="item in repairReasonList"
                  :key="item.code"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-row>
            <el-row  style="margin-top: 20px; margin-bottom: 10px">备注:</el-row>
            <el-input type="textarea" :rows="5" v-model="repairAndParam.remark"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" v-if="btnShow" @click="setRepairAndLock();">提交</el-button>
            <el-button type="primary" v-if="batchBtnShow" @click="setBatchRepairAndLock();repairDialog = false">提交</el-button>
          </span>
        </el-dialog>
        <!--请求开门dialog-->
        <el-dialog width="30%" class="houseTypeClass" title="请求开门" :visible.sync="openDoorDialog" :modal="true">
          <ul style="text-align: right">
            <li>开始日期:
              <el-date-picker
                v-model="repair_value1"
                type="datetime"
                :picker-options="rangeDate"
                placeholder="选择日期时间">
              </el-date-picker>
            </li>
            <li style="margin-top: 15px">结束日期:
              <el-date-picker
                v-model="repair_value2"
                :picker-options="rangeDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </li>
            <li  style="margin-top: 15px; margin-bottom: 10px">
              是否使原卡失效:
              <el-select  v-model="openDoor_value">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button type="info" >制卡</el-button>
            <el-button type="danger" >打印开门通知单</el-button>
          </span>
        </el-dialog>
          <!--新建预定单 新建预定单 新建预定单 新建预定单 新建预定单  新建预定单   新建预定单   新建预定单   新建预定单-->
          <preview-dialog :show.sync= previewFormVisible :parentParam='previewBillParam' v-on:listenToPreview="getPreviewFromChild"></preview-dialog>
          <!--新建入住单dialog-->
          <enter-dialog :show.sync= enterFormVisible :parentParam='enterBillParam' v-on:listenToFlushEnter="flushByEnter"></enter-dialog>
          <!--预定单详情dialog-->
          <preview-info-dialog :show.sync= preInfoFormVisible :parentInfoParam='preInfoParam' v-on:listenToPreview="getPreviewFromChild"></preview-info-dialog>
          <!-- 预定单转入住单 -->
          <preview-to-enterDialog :show.sync= previewToEnterVisible :parentInfoParam='preEnterInfoParam' v-on:listenToPreview="getPreviewFromChild"></preview-to-enterDialog>
          <!--联房列表dialog-->
          <link-house-dialog :show.sync= linkHouseFornVisible :parentInfoParam='linInfoParam' v-on:listenToFlushLink="flushByLink"></link-house-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  const orderOptions = [
    {
      name: 8026,
      status: 1,
      price: 100
    }
  ];
  import previewToEnterDialog from './previewToEnterDialog'
  import previewInfoDialog from './previewInfoDialog'
  import linkHouseDialog from './linkHouseDialog'
  import cDialog from './consumeDialog'
  import previewDialog from './previewDialog'
  import enterDialog from './enterDialog'
  import _ from 'lodash'
  import util from '@/common/util.js'
  import moment from 'moment'
  export default {
    name: 'firstIndex',
    data(){
      return {
        clickOrHover: 'hover',
        newCardList: [],
        cardList_t: [[{
           label: '身份证',
          value: '0'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },{
           label: '身份证,,',
          value: '000'
        },],[{
           label: '身份证_2',
          value: '0'
        }],[{
           label: '身份证_3',
          value: '0'
        }]],//会员数组
        clickTimeId: '',
        popverParam: [],//入住浮动框页面展示
        cardListCopy: [],
        cardListCopy_copy: [],
        mapArray: [],
        masterAllList: [],//入住人list
        availHeight: '',
        btnShow: true,
        batchBtnShow: false,
        isPress: true,
        isPress_1: true,
        isPress_2: true,
        isPress_3: true,
        isPress_4: true,
        isShow_1: true,
        isShow_2: true,
        isShow_3: true,
        isShow_4: true,
        batchTags: [],//批量选中的数据
        isShowTrueMark: false,
        allNumber: 0,
        VCNumber: 0,
        VDNumber: 0,
        ODNumber: 0,
        OONumber: 0,
        OCNumber: 0,
        OSNumber: 0,
        roomOccupyList: [],//房价占用类型
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
          value: '0'
        },{
          label: '户口簿',
          value: '1'
        },{
          label: '护照',
          value: '2'
        },{
          label: '台胞证',
          value: '3'
        },{
          label: '港澳通行证',
          value: '4'
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
        enterInfoBillParam: {},//联房入住单大对象
        preInfoParam: {},//预订单详情大对象
        previewBillParam: {},//新建预定时的大对象
        enterBillParam: {},//新建入住单时的大对象
        preEnterInfoParam: {},
        linInfoParam: {},
        //预订单大对象
        preBillParam: {
          rt_rate:{
            rmnum: '',//房间号
          },
          reserve_base:{
            rsv_type : '',//预定类型
            rsv_lable: '',
            rsv_person_name : '',//预定人姓名
            telephone_master: '',//预定人电话
            arr_time: '',//预抵时间
            leave_time: [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
            is_fix_rate: '', //传的 false和 true
            is_secrete : '',
            is_secret_rate : '',
            allowed_AR : '',
          },
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
          //预定=》直接入住的时候入住人list
          check_guest: [{
            enterRoom: '',
            name: '',
            sex : '',
            id_code : '',
            id_no : '',
            telephone : '',
            street_add : ''
          }],
          //选择房型list=》动态多选框
          houseTypeInfoList: [{
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //单价价钱
            dynamic_roomNumber: ['111', '222', '333','444', '555','666', '777'],//动态房间号=》应是一个数组
            mayCount: '2', //可预订数
          }],
        },
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
          label: '散客预定',
          value: 0
        },{
          label: '团队预定',
          value: 1
        },{
          label: '酒店预订',
          value: 2
        }],//会员数组
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
        lockCss_active: false,//锁定状态
        rangeDate:{
          disabledDate(time){
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        future_cardList: [],//未来房情
        current_houseStatus: true,
        future_houseStatus: false,
        batchOperation: false,//批量操作
        situationList: [], //未来房情数组
        houseSituation_date: new Date(),//未来房情状况日期
        date_flag: '',//标记未来房情
        //置维修参数对象=>锁房=>置脏
        repairAndParam:{
          room_no: '',
          start_time: new Date(),
          end_time: new Date(new Date().setHours(23,59,59)),
          room_state_before_code: '', //修改前状态特指净房等
          room_state_after_code: 'OO',//修改后状态特指维修或锁定
          room_occupy_before_code: '',//占用前状态
          room_occupy_after_code: '',//占用后状态
          room_occupy_change_reason: '',
          room_state_change_reason: '',//置维修原因
          remark: '',
          done_id: null,
          done_time: null,
          rsv_id: null,
          master_id: null,
        },
        //置维修修改状态
        repairOccupyList: [],
        //置维修原因
        repairReasonList: [],
        //锁房原因
        lockReasonList: [],
        showAddButton: true,//选择房型右边初始化时显示add按钮
        showDeleteButton: false,
        selfAddNumber: 1,//自增量初始值
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
        temp_value: '',
        clean_dateValue: new Date(),//置干净
        openDoor_value: '',//请求开门
        repair_value1: '', //置维修时间
        repair_value2: '',
        cleanDialog: false,//置干净
        repairDialog: false,//置维修dialog
        openDoorDialog: false,//请求开门dialog
        lockDialog: false,//锁房dialog
        showPopver: false,
        isActiveBlack_1: true,
        isActiveBlack_2: true,
        //样式
        // activeParam:{
        isActiveBlue_j: false, //净房
        isActiveBlue_z: false, //脏房
        isActiveBlue_zj: false,//住净
        isActiveBlue_zz: false,//住脏
        isActiveBlue_w: false, //维修
        isActiveBlue_t: false, //停用
        isActiveBlue_check: false, //检查 ==add
        isActiveBlue_suoding: false, //锁定==add
        isActiveBlue_enter: false,//入住==add
        //===========分割============
        isActiveBlue_team: false,//团队
        isActiveBlue_qf: false,//欠费
        isActiveBlue_computer: false,//电脑
        isActiveBlue_clock: false,//钟点
        isActiveBlue_lock: false,//锁定
        isActiveBlue_self: false,//自用
        isActiveBlue_leave: false,//预离
        isActiveBlue_zzj: false,//自助机
        isActiveBlue_lf: false,//联房
        isActiveBlue_yd: false,//预定
        isActiveBlue_visitor: false,//访客
        // },
        // isActiveBlue: false,//控制点击小图标等的样式
        hoverIndex: -1,
        activeClassName: '',
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
        editPriceDialog: false,
        addPersonDialog: false,
        continueLiveDialog: false,
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
        tableData_3: '',
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
        switchValue: '',
        activeName2: 'first',
        previewFormVisible: false,
        enterFormVisible: false,//入住单
        preInfoFormVisible: false, //预订单详情
        linkHouseFornVisible: false,//联房列表
        previewToEnterVisible: false,//预定转入住
        checkAll: false,
        isIndeterminate: true,
        orderHouses: [],
        orderHouseList: '',
        orderHouses: orderOptions,
        futureCardList:[],
        cardList_slice1: [],
        cardList_slice2: [],
        cardList: [
          // {
          //   room_state: 'VC',
          //   room_no: '1214'
          // },
          // {
          //   room_state: 'OS',
          //   room_no: '1211'
          // },
          // {
          //   room_state: 'OD',
          //   room_no: '1208'
          // },
          // {
          //   room_state: 'OD',
          //   room_no: '1209'
          // },
          // {
          //   room_state: 'VC',
          //   room_no: '1222'
          // },
          // {
          //   room_state: 'VC',
          //   room_no: '1223'
          // },
          // {
          //   room_state: 'OC',
          //   room_no: '1224'
          // },
          // {

          //   room_state: 'VC',
          //   room_no: '1243'
          // },
          // {
          //   room_state: 'OO',
          //   room_no: '8546'
          // }
        ]
      }
    },
    components: {
      'cDialog': cDialog,
      'preview-dialog': previewDialog,
      'enter-dialog': enterDialog,
      'preview-info-dialog': previewInfoDialog,
      'preview-to-enterDialog': previewToEnterDialog,
      'link-house-dialog': linkHouseDialog
    },
    created(){
      this.getCardList() //获取入住信息
      this.getFloor()//获取楼层
      // this.getRoomType()
      // this.enterFormVisible = true
    },
    mounted (){
      // this.getCardList()
      // this.getCardAllList()
      this.availHeight = (screen.availHeight -10)  +'px';
      // this.houseSituation_date = new Date()
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
        let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      }
		},
    methods: {
      //批量操作==控制样式=====>注意:暂时用数组自带的is_halt来控制样式是否显示
      cardClick(item,index){
        // this.isPress = false
        this.isPress_1= false
        this.isPress_2= false
        this.isPress_3= false
        this.isPress_4= false
        // this.activeClassName = index
        //点击选中勾选状态
        if(item.is_halt === 0){
          item.is_halt = 1
          // this.isShowTrueMark = true
          this.batchTags.push(item)
          this.handleBatchTags(this.batchTags)//处理选中的数据
        }else{
          item.is_halt = 0
          let index = this.batchTags.findIndex(itemm=>itemm.room_no == item.room_no)
          this.batchTags.splice(index, 1)
          this.handleBatchTags(this.batchTags)//处理选中的数据
          // this.isShowTrueMark = false
        }
        if(this.batchTags.length === 0){
          this.isPress_1= true
          this.isPress_2= true
          this.isPress_3= true
          this.isPress_4= true
        }
      },
      //处理选中的数据
      handleBatchTags(param){
        this.isShow_1 = true
        this.isShow_2 = true
        this.isShow_3 = true
        this.isShow_4 = true
        const status_base = {
        'OD': ['OC'], //住脏可修改状态
        'VC': ['VD', 'OO', 'OS'], //干净可修改状态
        'VD': ['VC', 'OO', 'OS'], //脏房可修改状态
        'OO': ['VD'], //修理可修改状态,,,
        'OC': ['OD'], //住净可修改状态
        'OS': []
        };
        for(var item of param){
          item.changeRoomState = status_base[item.room_state]
        }
        for(var item of param){
          //不能置脏
          if(!item.changeRoomState.includes('VD')){
            this.isShow_1 = false
            this.isPress_1= true
          }
          //不能置干净
          if(!item.changeRoomState.includes('VC')){
            this.isShow_2 = false
            this.isPress_2= true
          }
          //不能置维修
          if(!item.changeRoomState.includes('OO')){
            this.isShow_3 = false
            this.isPress_3= true
          }
          //不能锁房
          if(!item.changeRoomState.includes('OS')){
            this.isShow_4 = false
            this.isPress_4= true
          }
        }
      },
      //清空重置对象或数组的数据
      flushData(){
        this.preBillParam.houseTypeInfoList = [{
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //总价钱
            dynamic_roomNumber: [],
            mayCount: '2',
          }],
          this.preBillParam.check_guest = [{
            enterRoom: '',
            name: '',
            sex : '',
            id_code : '',
            id_no : '',
            telephone : '',
            street_add : ''
          }]
      },
      /**得到所有房间的数 */
      getCardAllList(){
        let that = this
        let scopeParam = {
          page : 1,
          page_size : 300,
        }
        let url = that.api.api_price_9101 + '/v1/' + `room/room_status/get_room_map_list?page_size=1000`
        that.$axios({
           method : 'get',
          url : url,
          params: scopeParam
        }).then(res=>{
          if(res.data.message === 'success'){
            let roomList = res.data.data.results
            //计算不同房态的房间数量
            that.VCNumber = roomList.filter(item=>item.room_state==='VC').length
            that.VDNumber = roomList.filter(item=>item.room_state==='VD').length
            that.ODNumber = roomList.filter(item=>item.room_state==='OD').length
            that.OONumber = roomList.filter(item=>item.room_state==='OO').length
            that.OCNumber = roomList.filter(item=>item.room_state==='OC').length
            that.OSNumber = roomList.filter(item=>item.room_state==='OS').length
            that.allNumber = that.VCNumber + that.VDNumber + that.ODNumber + that.OONumber + that.OCNumber + that.OSNumber
          }else{
            that.$message.error('获取房态列表失败!')
          }
        }).catch(error=>{
        })
      },
      //筛选预离的数据(需要重构数据)
      filterSelectData(param){
        let that = this
        that.newCardList = []
        switch (param) {
          case '团队':
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[0] === '1')
            that.cardListCopy_copy.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            newArr = [...map.values()];
            that.newCardList = newArr
            break;
          case '欠费':
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[1] === '1')
            that.cardListCopy_copy.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            newArr = [...map.values()];
            that.newCardList = newArr
            break;
          case '钟点':
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[2] === '1')
            that.cardListCopy_copy.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            newArr = [...map.values()];
            that.newCardList = newArr
            break;
          case '预离':
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[3] === '1')
            that.cardListCopy_copy.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            newArr = [...map.values()];
            that.newCardList = newArr
            break;
          case '联房':
            //按联房分组进行排列
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[4] === '1')
            console.log('that.cardListCopy_copythat.cardListCopy_copy',that.cardListCopy_copy)
            console.log('that.cardListCopy_copythat.cardListCopy_copy2',that.cardListCopy_copy)
            that.cardListCopy_copy.forEach(function(item,i){
              map.has(item.master_room_no) ? map.get(item.master_room_no).push(item) : map.set(item.master_room_no,[item])
            })
            console.log('map',map)
            console.log('that.cardListCopy_copy33',that.cardListCopy_copy)
            newArr = [...map.values()];
            console.log('newArr',newArr)
            that.newCardList = newArr
            // this.newCardList  = this.cardListCopy.filter(item=>item.room_state_extra[4] === '1')
            break;
          case '自用':
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[5] === '1')
            that.cardListCopy_copy.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            newArr = [...map.values()];
            that.newCardList = newArr
            break;
          case '自助机':
            var map = new Map();
            var newArr = [];
            that.cardListCopy_copy = that.cardListCopy.filter(item=>item.room_state_extra[6] === '1')
            that.cardListCopy_copy.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            newArr = [...map.values()];
            that.newCardList = newArr
            break;
          default:
            break;
        }
        // this.cardList = array
      },
      resolveData(param){
          var map = new Map();
          var newArr = [];
          param = param.filter(item=>item.room_state_extra[4] === '1')
          param.forEach(function(item,i){
              map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
          })
          newArr = [...map.values()];
          that.newCardList = param
      },
      //进入房态=>块状平铺展示//获取cardList
      getCardList(){
        let that = this
        let scopeParams = {
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
            let roomList = res.data.data.results
            that.VCNumber = roomList.filter(item=>item.room_state==='VC').length
            that.VDNumber = roomList.filter(item=>item.room_state==='VD').length
            that.ODNumber = roomList.filter(item=>item.room_state==='OD').length
            that.OONumber = roomList.filter(item=>item.room_state==='OO').length
            that.OCNumber = roomList.filter(item=>item.room_state==='OC').length
            that.OSNumber = roomList.filter(item=>item.room_state==='OS').length
            that.allNumber = that.VCNumber + that.VDNumber + that.ODNumber + that.OONumber + that.OCNumber + that.OSNumber
            //以上为分割 [...map.values]其中map.values得到的数据可组装为数组
            var map = new Map();
            var newArr = [];
            that.cardList.forEach(function(item,i){
                map.has(item.floor_number) ? map.get(item.floor_number).push(item) : map.set(item.floor_number,[item])
            })
            console.log('map对象',map)
            newArr = [...map.values()];
            that.newCardList = newArr
            console.log(newArr,'二维数组')
            console.log(that.cardList,'that.cardList')
            that.cardListCopy = _.cloneDeep(that.cardList)
            console.log('that.cardListCopy',that.cardListCopy)
            // let temp = that.mapArray[0] //从此步开始获取额外属性==>例如下角标
            // for(var item of that.cardList){
            //   item.room_state_extra = item.room_state_extra.split('')
            //   try {
            //     if(temp[item.room_no] != undefined){
            //       item.expandAttribute = temp[item.room_no]
            //     }else{
            //       item.expandAttribute = ''
            //     }
            //   } catch (error) {
            //     console.log('error')
            //   }
            // }
          }else{
            that.$message.error('获取房态列表失败!')
          }
        }).catch(error=>{
        })
      },
      //处理传进来的筛选条件
      handleSelectParam(selectParam){
        // switch (selectParam) {
        //   case '净房':
        //     selectParam = ''
        //     break;

        //   default:
        //     break;
        // }
      },
      //点击房间(小方块)预定的时候 传递值给子组件
      sendPreview(item){
        this.getRoomOccupyInfo(item) //获取该房间占用类型
        setTimeout(() => {
          // if(this.roomOccupyList.length>0){
          //   //此时预定=>未占用
          //   if(this.roomOccupyList[0].room_occupy === 'NNZ'){
          //     this.previewFormVisible = true
          //     //以下 暂时简单写通用 以后优化代码
          //     for(var itemm of this.roomTypeList){
          //       if(itemm.code === item.room_type_name){
          //         item.room_type_name_value = itemm.room_type_name
          //       }
          //     }
          //     this.previewBillParam = {
          //       roomType: item.room_type_name_value,
          //       roomNo: item.room_no,
          //       room_type_name: item.room_type_name
          //     }
          //   }
          //   else{
          //     //预定占用
          //     if(this.roomOccupyList[0].room_occupy === 'YDZ'){
          //       //获取预定后的详情===>预定转入住
          //       this.getPreInfoByRoom(item.room_no)
          //       this.preInfoFormVisible = true
          //     }
          //   }
          // }else
          // {
              this.previewFormVisible = true
              this.previewBillParam = {
                roomType_code:item.room_type_name,
                roomType: item.room_type,
                roomNo: item.room_no,
                room_type_name: item.room_type_name
              }
          // }
        }, 600);
          // this.getPreInfoByRoom(item.room_no)
          // this.preInfoFormVisible = true
      },

      //点击房间(小方块)入住的时候
      sendEnter(item){
        this.getRoomOccupyInfo(item)
        setTimeout(() => {
          // if(this.roomOccupyList.length>0){
          //   //此时入住=>未占用
          //   if(this.roomOccupyList[0].room_occupy === 'NNZ'){
          //     this.enterFormVisible = true
          //     for(var itemm of this.roomTypeList){
          //       if(itemm.code === item.room_type_name){
          //         item.room_type_name_value = itemm.room_type_name
          //       }
          //     }
          //     this.enterBillParam = {
          //       roomType: item.room_type_name_value,
          //       roomNo: item.room_no,
          //       room_type_name: item.room_type_name
          //     }
          //   }else if(this.roomOccupyList[0].room_occupy === 'YDZ'){
          //     this.getPreInfoByRoom(item.room_no)
          //     this.previewToEnterVisible = true
          //   }else if(this.roomOccupyList[0].room_occupy === 'OCZ'){
          //     //入住占用
          //       //获取入住后的详情===>入住==>打开联防列表
          //       // this.getPreInfoByRoom(item.room_no)
          //       // this.preInfoFormVisible = true
          //   }
          // }else{
              this.enterFormVisible = true
              this.enterBillParam = {
                roomType_code:item.room_type_name,
                roomType: item.room_type,
                roomNo: item.room_no,
                room_type_name: item.room_type_name
              // }
          }
        }, 600);
        // this.getPreInfoByRoom(item.room_no)
        // this.previewToEnterVisible = true
      },
      /**
       * 房间占用状态
       */
      getRoomOccupyInfo(param){
          let that = this
          let start = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(new Date()).format('YYYY-MM-DD 23:59:59')
          let room_no = param.room_no
          let url =  that.api.api_price_9101 + '/v1/' + 'room/room_status/get_room_occupy_list/'
          that.$axios({
            url : url,
            method : 'get',
            params:{
              start_time__lte: start,
              end_time__gte: end,
              room_no: room_no
            },
          }).then(res=>{
          if(res.data.message === 'success'){
              that.roomOccupyList = res.data.data.results
              // let newArray = []
              // for(var item of that.roomInfoList){
              //   for(var itemm of that.roomTypeList){
              //     if(item.room_type === itemm.code){
              //       item.room_type_name = itemm.room_type_name
              //     }
              //   }
              //   newArray.push(item)
              // }
          }else{
              that.$message.error('获取房型占用信息失败!')
          }
          }).catch(error=>{
          })
        },
      //获取预定后的详情==>预定单详情
      getPreInfoByRoom(param){
        // param = '8325' //暂时赋值
        let scopeParams = {
          room_number: param
        }
        let that = this
        // let url = `http://192.168.2.224:9005/v1/booking/get_all_reserve_info/`
        let url = that.api.api_bill_9202 + '/v1/' + `booking/get_all_reserve_info/`
        that.$axios({
           method : 'get',
            url : url,
            params: scopeParams
        }).then(res=>{
          if(res.data.message === 'success'){
            that.preInfoParam = res.data.data.results[0]
            //处理数据然后传给子组件
            this.preBillParam.rt_rate = this.preInfoParam.rt_rate
            this.preBillParam.reserve_guest = this.preInfoParam.reserve_guest
            this.handleParentParam(this.preInfoParam)
            this.handleChildParam(this.preBillParam)
            // this.preBillParam.rt_rate = this.concatData(this.preBillParam.rt_rate)
            this.preBillParam.reserve_base.leave_time = [moment(this.preBillParam.reserve_base.arr_time).format('YYYY-MM-DD HH:mm:ss'),moment(this.preBillParam.reserve_base.leave_time).format('YYYY-MM-DD HH:mm:ss')]
            this.preBillParam.reserve_base.arr_time = ''
            this.preInfoParam = this.preBillParam
            console.log('this.preInfoParam父级',this.preInfoParam)
            this.preEnterInfoParam = _.cloneDeep(this.preInfoParam) //预定转入住详情
            this.preEnterInfoParam.parentRoomNumber = param
          }else{
            that.$message.error('获取预订单详情失败!')
          }
        }).catch(error=>{
        })
      },
      //有入住得时候(双击)
      openOrderInfo(item){
        // this.linkHouseFornVisible = true
        clearTimeout(this.clickTimeId);
        this.getEnterInfoByRoom(item)
        // this.linkHouseFornVisible = true
      },
      //获取创建后的详情==>预定单详情===>联房列表打开
      getEnterInfoByRoom(param,limitParam){
        console.log('paramparam--------order----------',param)
        let scopeParams = {
          // room_number: param.room_no
          order_no: param.order_no
        }
        let that = this
        // this.linInfoParam = {}//置空 防止后台取出数据紊乱造成进一步错误
        // let url = `http://192.168.2.224:9005/v1/checkin/all_master_info/`
        // let url = that.api.api_bill_9202 + '/v1/' + `checkin/all_master_info/`
        let url = that.api.api_newBill_9204 + '/v2/' + `checkin/all_master_info/`
        // let url = that.api.api_bill_9202 + '/v1/' + `checkin/all_master_info_order/`
        that.$axios({
           method : 'get',
            url : url,
            params: scopeParams
        }).then(res=>{
          if(res.data.message === 'success'){
            console.log('param点击进入表',param)
            that.enterInfoBillParam = res.data.data.results[0]
            try {
              that.enterInfoBillParam.room_type_name = param.room_type_name
            } catch (error) {
              that.$message.warning('获取后台数据失败!')              
            }
            console.log('aaaa',res.data.data.results[0])
            that.linInfoParam = _.cloneDeep(this.enterInfoBillParam) //联房详情
            if(that.linInfoParam != undefined){
              if(limitParam != '单击'){
                that.linkHouseFornVisible = true //联房列表打开
                if(limitParam === '续住'){
                  that.linInfoParam.openChildDialog = '续住' //打开相应的dialog根据条件
                }else if(limitParam === '入消费'){
                  that.linInfoParam.openChildDialog = '入消费'
                }else if(limitParam === '结账'){
                  that.linInfoParam.openChildDialog = '结账'
                }else if(limitParam === '换房'){
                  that.linInfoParam.openChildDialog = '换房'
                }else if(limitParam === '入预收'){
                  that.linInfoParam.openChildDialog = '入预收'
                }else{
                  that.linInfoParam.openChildDialog = '' //打开相应的dialog根据条件
                }
              }else{
                // let array = []
                // for(var item of this.enterInfoBillParam.master_guest){
                //   array.push({name: item.name})
                // }
                console.log('that.linInfoParam............',that.linInfoParam)
                this.getEndpayInfoListByAccount(that.enterInfoBillParam.account_id)
                // that.popverParam = array
                that.linkHouseFornVisible = false //联房列表关闭
              }
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
      getEndpayInfoListByAccount(id){
          let that = this
          // let url= that.api.api_9022_9519+ '/v1/' + `finance/account/get_info_pms/` + id
          let url= 'http://192.168.4.168:8000'+ '/v1/' + `accounts/get_account_base_info/` + id + '/'
          console.log('kajhisssssssssssssss',url)
          that.$axios({
            method : 'get',
            url : url,
        }).then(res=>{
            that.popverParam = res.data.data
            console.log('this.popverParam===================================》》》》》》最终账户',that.popverParam)
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
      //组合数组
      concatData(param){
        var map = {},
        array = [];
        for(var item of param){
            if(!map[item.room_type]){
              array.push({
                // id: item.id,
                // number: item.number
                lock_number: item.lock_number,
                dynamic_roomNumber: item.dynamic_roomNumber,
                room_number: item.room_number,
                can_live_num: item.can_live_num,
                room_type_value: item.room_type_value,
                room_type: item.room_type,
                room_class: item.room_class,
                ratecode_id: item.ratecode_id,
                fix_rate: item.fix_rate,
                roomCount: item.roomCount,
                roomPrice: item.roomPrice,
                code: item.code,
                code_name: item.code_name,
                descript: item.descript,
                descript_en: item.descript_en,
                list_order: item.list_order,
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
              for(var itemm of array){
                if(itemm.room_type == item.room_type){
                  itemm.room_number.push(item.room_number[0])
                  break
                }
              }
            }
        }
        return array
        },
       handleChildParam(param){
        for(var item of param.rt_rate){
          item.can_live_num = ''
          item.room_type_value = ''
          item.dynamic_roomNumber = item.room_number != '' ? item.room_number.split(',') : []
          item.roomCount = ''
          item.roomPrice = ''
        }
        for(var item of param.reserve_guest){
          item.liveCount = 0
        }
      },
      handleParentParam(param){
        // this.preBillParam.rt_rate.can_live_num = ''
        // this.preBillParam.rt_rate.room_type_value = ''
        // this.preBillParam.rt_rate.dynamic_roomNumber = []
        // this.preBillParam.rt_rate.roomCount = ''
        // this.preBillParam.rt_rate.roomPrice = ''
        // this.preBillParam.reserve_guest.liveCount = 0
        this.preBillParam.reserve_base = {
          rsv_type : param.rsv_type,//预定类型
          rsv_lable: param.rsv_lable,
          rsv_person_name : param.rsv_person_name,//预定人姓名
          telephone_master: param.telephone_master,//预定人电话
          arr_time: param.arr_time,//预抵时间
          leave_time: param.leave_time,//离开时间
          is_fix_rate: param.is_fix_rate, //传的 false和 true
          is_secrete : param.is_secrete,
          is_secret_rate : param.is_secret_rate,//1传的
          allowed_AR : param.allowed_AR,
          code: param.code,
          code_name: param.code_name,
          descript: param.descript,
          descript_en: param.descript_en,
          list_order: param.list_order,
          account_id: param.account_id,
          biz_date: param.biz_date,
          team_id: param.team_id,
          rsv_from: param.rsv_from,
          order_no: param.order_no,
          confirmed: param.confirmed,
          sales_person_id: param.sales_person_id,
          code_occ_id: param.code_occ_id,
          extra_flag: param.extra_flag,
          adult_num: param.adult_num,
          children_num: param.children_num,
          purpose: param.purpose,
          name: param.name,
          email_master: param.email_master,
          weixin_master: param.weixin_master,
          mobile_master: param.mobile_master,
          ID_no: param.ID_no,
          fix_rate: param.fix_rate,
          AR_id: param.AR_id,
          code_commision_id: param.code_commision_id,
          code_market_id: param.code_market_id,
          code_src_id: param.code_src_id,
          reference_id: param.reference_id,
          rsv_status_lable: param.rsv_status_lable,
          account_opened: param.account_opened,
          total_chartge: param.total_chartge,
          total_pay: param.total_pay,
          last_account_id: param.last_account_id,
          last_pay_id: param.last_pay_id,
          account_num: param.account_num,
          pay_num: param.pay_num
        }
      },
      //预订单=>确认预定
      confirmPreview(){
        // if(!this.validatePreviewData() && !this.validatePreData()){
        //   return false
        // }
      },
      datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
        var dateSpan,
        tempDate,
        iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
      },
      //验证预定数据
      validatePreviewData(){
        //判断选择房型为空时
        for(var item of this.preBillParam.houseTypeInfoList){
          if(item.houseTypeValue === ''){
            this.$message.warning('请选择房型!')
            return false
          }
        }
        //有入住人的时候
        if(this.is_addlive === true){
          for(var item of this.preBillParam.check_guest){
            util.validateBlank(item.telephone,'联系电话是必填项',this)&&
            util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
            util.validateBlank(item.id_no,'身份证是必填项',this)&&
            util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
          }
        }
      },
      validatePreData(){
        return (
          util.validateBlank(this.preBillParam.reserve_base.rsv_person_name, '预定人是必填项', this)&&
          util.validateBlank(this.preBillParam.reserve_base.telephone_master,'联系电话是必填项',this)&&
          util.validateTelNumber(this.preBillParam.reserve_base.telephone_master,'请输入正确手机格式',this)
        )
      },
      //=入住子组件====入住成功后刷新页面数据
      flushByEnter(data){
        console.log('listenToFlushEnter',data)
        this.getCardList()
        // this.getCardAllList()
      },
      flushByLink(data){
        console.log('listenToFlushLink',data)
        this.getCardList()
        // this.getCardAllList()
      },
      //来自预定单子组件传来的值即子组件传给父组件
      getPreviewFromChild(data){
        console.log('previewData中的=>改变房态为已经预定了',data)
      },
      //根据条件筛选房态图数据=>cardList
      filterData(filterParam){
        this.selectParam = filterParam
        if(this.selectParam === '全部1' || this.selectParam === '全部2'){
          this.selectParam = ''
        }
        this.getCardList()
        this.handleData(filterParam) //根据不同参数控制样式
      },
      handleClick(row) {
        if(row.name==='first'){
          this.batchOperation = false
          this.current_houseStatus = true
          this.batchTags = []
        }else{
          //批量操作的时候
          this.getCardList()
          this.batchOperation = true
          this.current_houseStatus = false
        }
      },
      //切换效果
      mouseOver(){
        this.clickOrHover = 'hover' //触发显示
      },
      mouseOut(){
        this.clickOrHover = 'hover' //触发显示
      },
      //单击点击方法
      popoverClick(item,index){
        this.clickOrHover = 'click' //点击显示
        clearTimeout(this.clickTimeId);
        this.activeClassName = index //判断list单个样式标记量
        this.isActive =!this.isActive;
        //入住占用的时候
        if(item.room_state == 'OC' || item.room_state =='OD'){
          this.clickTimeId = setTimeout(() => {
            this.getEnterInfoByRoom(item,'单击')//获取账务
          }, 250);
          // console.log('popverParam')
          // console.log('数据==>',this.enterInfoBillParam)
        }
      },
      //制卡
      activateCard(param){
        let that = this
        let url = that.api.api_price_9101 + '/v1/' + `room/room_lock/activate_card/`
        let scopeParam ={
          operate_type: 2,//1, "读卡"), (2, "写卡"), (4, "销卡"),
          start_time: this.enterInfoBillParam.arr_time,
          end_time: this.enterInfoBillParam.leave_time,
          room_no: param.room_no,
          guest_no: 0,
        }
        that.$axios.post(url,scopeParam).then(res=>{
         if(res.data.message == 'success'){
            let resUrl = res.data.data.url
            //  that.$http.jsonp(resUrl, {
            //   }).then(function (res) {
            //     console.log(res);
            //   }).catch(error=>{
            //     console.error(error)
            //   })
            //  that.$http.jsonp(resUrl).success(function(data){
            //    console.log(data,'shuju')
            //  })
            this.zhicard(resUrl)
          }else{
            that.message.error('本地服务没开启!')
          }
        }).catch(error=>{
            console.error();
        })
      },
      zhicard(url){
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
            this.$message.warning(res.body.Msg)
          }
        }).catch(error=>{
          console.error();
        })
      },
      //续住=>已经入住的情况下
      openContinue(item){
        // this.linkHouseFornVisible = true
        this.getEnterInfoByRoom(item,'续住')
        // this.linkHouseFornVisible = true
        // this.linInfoParam ={
        //   openChildDialog: '续住'
        // }
        // console.log('this.linInfoParam传入子级',this.linInfoParam)
      },
      openPayAccount(item){
        this.getEnterInfoByRoom(item, '入预收')
      },
       //入账=>已经入住的情况下、入消费
      openEnterAccount(item){
        // this.linkHouseFornVisible = true
        this.getEnterInfoByRoom(item, '入消费')
      },
       //结账=>已经入住的情况下
      openEndAccount(item){
        // this.linkHouseFornVisible = true
        this.getEnterInfoByRoom(item,'结账')
      },
       //换房=>已经入住的情况下
      openChangeRoomType(item){
        // this.linkHouseFornVisible = true
        // this.getEnterInfoByRoom(item.room_no,'换房')
      },
       //换房号=>已经入住的情况下
      openChangeRoomNumber(item){
        // this.linkHouseFornVisible = true
        this.getEnterInfoByRoom(item,'换房')
      },
      //当popover消失的时候触发
      backStatus(){
        this.future_houseStatus = false
        this.current_houseStatus = true
        this.getCardList()
      },
      //通过按钮获取未来房情前一天后一天改变时间
      changeDate(val){
        this.future_houseStatus = true
        this.current_houseStatus = false
        let today = moment(new Date()).format('YYYY-MM-DD')
        this.date_flag = moment(this.houseSituation_date).format('YYYY-MM-DD')
        if(val === 1){ //后一天
          this.houseSituation_date = new Date(this.houseSituation_date.setDate(this.houseSituation_date.getDate() + 1))
        }else{
          if(this.date_flag > today){
            this.houseSituation_date = new Date(this.houseSituation_date.setDate(this.houseSituation_date.getDate() - 1))
          }
          let tempDate = moment(this.houseSituation_date).format('YYYY-MM-DD')
          if(tempDate === today){
            this.future_houseStatus = false
            this.current_houseStatus = true
            this.getCardList()
            return
          }
        }
        this.getHouseFutureList(moment(this.houseSituation_date).format('YYYY-MM-DD'))
      },
      //通过时间控件获取未来房情
      getHouseSituation(){
        let today = moment(new Date()).format('YYYY-MM-DD')
        this.date_flag = moment(this.houseSituation_date).format('YYYY-MM-DD')
        if(this.date_flag === today){
          this.future_houseStatus = false
          this.current_houseStatus = true
          this.getCardList()
          return
        }else{
          this.future_houseStatus = true
          this.current_houseStatus = false
        }
        this.getHouseFutureList(this.date_flag)
        },
      //通过时间参数获取未来房情list
      getHouseFutureList(date){
        let that = this
        let url= `http://192.168.4.99:8002/v1/room/room_status/get_room_future_list/`
        that.$axios({
          method : 'get',
            url : url,
            params:{
              biz_date: date
            }
        }).then(res=>{
          let flag
          if(res.data.message === 'success'){
            that.situationList = res.data.data.results//未来的要赋值的
            // console.log('that.situationList',that.situationList)
            // console.log('cardList',that.cardList)
            that.future_cardList = that.cardList;
            that.future_cardList.forEach(item => item.room_state = 'VC') //==R
            // console.log('that.future_cardList',that.future_cardList)
            for(var item of that.situationList){
              for(var itemCard of that.future_cardList){
                if(item.room_no == itemCard.room_no){
                  flag = true
                  if(flag == true){
                    itemCard.room_state = item.room_status_code
                    break
                  }
                }
              }
            }
            // console.info(that.future_cardList,'future');
          }else{
            that.$message.error('获取未来房情失败!')
          }
        })
      },
      //置干净参数dialog
      setClean(param){
        this.$confirm('是否强制置干净?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            try {
              this.repairAndParam.room_state_before_code = param.room_state//VD
              this.repairAndParam.room_state_after_code = 'VC'
              this.repairAndParam.room_occupy_before_code = param.room_occupy //置维修占用前状态==>OOZ
              this.repairAndParam.room_occupy_after_code = 'NNZ'
              this.repairAndParam.room_no = param.room_no
              let that = this
              let url= that.api.api_price_9101 + '/v1/' + `room/room_status/manual_change_room_status/`
              let scopeParam = that.repairAndParam
              console.log('scopeParam',scopeParam)
              that.$axios.post(url,scopeParam).then(res=>{
                this.flushRepairAndParam()  //刷新数据
                that.$message.success('操作成功')
                _.delay(function(){
                  that.getCardList()
                  // that.getCardAllList()
                },200)
              }).catch(error=>{

              })
            } catch (error) {
              console.log('error')
            }
          }).catch(() => {
            this.cleanDialog=true
            console.log('param,置干净',param)
            this.repairAndParam.room_no = param.room_no //暂时用这个接收
          });
      },
      //确认置干净
      confirmClean(){
        let that = this
        let url= that.api.api_service_9104+ '/v1/' + `task/room_service/add_sweep/`
        let scopeParam = {
          room_no: that.repairAndParam.room_no,//房间号
          sweep_type: 10, //	( (0, "微信"), (10, "前台"), (20, "其他"), )
          sweep_time:  moment(that.clean_dateValue).format('YYYY-MM-DD HH:mm:ss'), //sweep_time
          card_id: null,//微信会员id
          remark: ''  //备注
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('resssss',res.data)
          if(res.data.message==='success'){
            that.cleanDialog = false
            this.flushRepairAndParam()  //刷新数据
            that.$message.success('已发出打扫请求!')
            // that.getCardList()
          }else{
            this.$message.warning(res.data.message)
          }
          }).catch(error=>{
        })
      },
      //锁房
      handleSetLock(item,index){
        this.flushRepairAndParam()  //刷新数据
        this.repairAndParam.room_state_before_code = item.room_state
        this.repairAndParam.room_occupy_before_code = item.room_occupy //置维修占用前状态
        this.repairAndParam.room_occupy_after_code = 'OSZ'
        this.repairAndParam.room_no = item.room_no
        this.repairAndParam.room_state_after_code = 'OS'
        this.repairAndParam.start_time = moment(this.repairAndParam.start_time).format('YYYY-MM-DD HH:mm:ss')
        this.repairAndParam.end_time = moment(this.repairAndParam.end_time).format('YYYY-MM-DD HH:mm:ss')
        // this.setLock(item,index)
      },
      //锁房操作
      // setLock(item, index){
      //   let that = this
      //   console.log(that.repairAndParam,'that.repairAndParam')
      //   let url= `http://47.98.113.173:9101/v1/room/room_status/manual_change_room_status/`
      //   let scopeParam = that.repairAndParam
      //   that.$axios.post(url,scopeParam).then(res=>{
      //     that.activeClassName = index //判断list单个样式标记量 加载图片锁状图
      //     that.lockCss_active = true
      //     }).catch(error=>{
      //   })
      // },
      //批量维修锁房
      handleBatchRepairLock(param){
        if(this.batchTags.length==0){
          return false
        }
        if(param === 'repair'){
          this.repairAndParam.room_occupy_after_code = 'OOZ' //维修占用
          this.repairAndParam.room_state_after_code = 'OO'
        }else{
          this.repairAndParam.room_occupy_after_code = 'OSZ'//锁房占用
          this.repairAndParam.room_state_after_code = 'OS'
          this.repairAndParam.start_time = moment(this.repairAndParam.start_time).format('YYYY-MM-DD HH:mm:ss')
          this.repairAndParam.end_time = moment(this.repairAndParam.end_time).format('YYYY-MM-DD 23:59:59')
        }
        this.batchBtnShow = true
        this.btnShow = false
      },
      //批量操作提交====>维修和锁房
      setBatchRepairAndLock(){
        console.log('批量提交')
        let array = this.batchTags
         for(let i in array){
           if(!this.validateRepairData()){
             return false
           }
           // console.log('type', typeof this.repairAndParam.end_time)
           //控件瑕疵 因此需要再转一下
           typeof this.repairAndParam.end_time === 'object' ? this.repairAndParam.end_time = moment(this.repairAndParam.end_time).format('YYYY-MM-DD HH:mm:ss') : this.repairAndParam.end_time
           typeof this.repairAndParam.start_time === 'object' ? this.repairAndParam.start_time = moment(this.repairAndParam.start_time).format('YYYY-MM-DD HH:mm:ss') : this.repairAndParam.start_time
           if(this.repairAndParam.end_time){
             if(this.repairAndParam.start_time > this.repairAndParam.end_time){
               this.$message.warning('开始时间大于结束时间，请重新选择!')
               return
             }
           }
           // console.log(new Date(new Date(that.repairAndParam.end_time).setHours(23,59,59)),'that.repairAndParam')
           let that = this
           let url= that.api.api_price_9101 + '/v1/' + `room/room_status/manual_change_room_status/`
           let scopeParam = that.repairAndParam
           that.$axios.post(url,{
              room_no: array[i].room_no,
              start_time: this.repairAndParam.start_time,
              end_time: this.repairAndParam.end_time,
              room_state_before_code: array[i].room_state, //修改前状态特指净房等
              room_state_after_code: this.repairAndParam.room_state_after_code,//修改后状态特指维修或锁定
              room_occupy_before_code: array[i].room_occupy,//占用前状态
              room_occupy_after_code: this.repairAndParam.room_occupy_after_code,//占用后状态
              room_occupy_change_reason: '',
              room_state_change_reason: '',//置维修原因
              remark: '',
              done_id: null,
              done_time: null,
              rsv_id: null,
              master_id: null,
           }).then(res=>{
             that.repairDialog = false
             that.$message.success('操作成功')
             that.getCardList()
           }).catch(error=>{

           })
         }
      },
      //批量置脏
      setBatchDirtyClean(param){
        console.log('param批量',param)
        let array = this.batchTags
        if(array.length>0){
          for(let i in array){
            let that = this
            let url = that.api.api_price_9101 + '/v1/' + 'room/room_status/manual_change_room_status/'
            that.$axios.post(url,{
              room_no: array[i].room_no,
              start_time: moment(this.repairAndParam.start_time).format('YYYY-MM-DD HH:mm:ss'),
              end_time: moment(this.repairAndParam.end_time).format('YYYY-MM-DD HH:mm:ss'),
              room_state_before_code: array[i].room_state, //修改前状态特指净房等
              room_state_after_code: param == 'dirty' ? 'VD' : 'VC',//修改后状态特指维修或锁定
              room_occupy_before_code: array[i].room_occupy,//占用前状态
              room_occupy_after_code: array[i].room_occupy,//占用后状态
              room_occupy_change_reason: '',
              room_state_change_reason: '',//置维修原因
              remark: '',
              done_id: null,
              done_time: null,
              rsv_id: null,
              master_id: null,
            }).then(res=>{
              that.$message.success('操作成功')
              that.getCardList()
            }).catch(error=>{
              })
          }
        }
      },
      //置脏
      setDirty(param){
        this.repairAndParam.room_state_before_code = param.room_state
        this.repairAndParam.room_occupy_before_code = param.room_occupy //置维修占用前状态
        this.repairAndParam.room_occupy_after_code = param.room_occupy //置维修占用前状态
        this.repairAndParam.room_no = param.room_no
        this.repairAndParam.room_state_after_code = 'VD'
        this.repairAndParam.start_time = moment(this.repairAndParam.start_time).format('YYYY-MM-DD HH:mm:ss')
        this.repairAndParam.end_time = moment(this.repairAndParam.end_time).format('YYYY-MM-DD HH:mm:ss')
        let that = this
        let url = that.api.api_price_9101 + '/v1/' + 'room/room_status/manual_change_room_status/'
        let scopeParam = that.repairAndParam
        that.$axios.post(url,scopeParam).then(res=>{
          this.$message.success('置脏成功')
          // this.getCardAllList()
          that.getCardList()
        }).catch(error=>{

        })
      },
      flushRepairAndParam(){
          this.repairAndParam = {
            room_no: '',
            start_time: new Date(),
            end_time: new Date(new Date().setHours(23,59,59)),
            room_state_before_code: '', //修改前状态特指净房等
            room_state_after_code: 'OO',//修改后状态特指维修或锁定
            room_occupy_before_code: '',//占用前状态
            room_occupy_after_code: '',//占用后状态
            room_occupy_change_reason: '',
            room_state_change_reason: '',//置维修原因
            remark: '',
            done_id: null,
            done_time: null,
            rsv_id: null,
            master_id: null,
          }
      },
      //结束维修
      endRepair(param){
        console.log('param',param)
        this.repairAndParam.room_state_before_code = param.room_state//VD
        this.repairAndParam.room_state_after_code = 'VD'
        this.repairAndParam.room_occupy_before_code = param.room_occupy //置维修占用前状态==>OOZ
        this.repairAndParam.room_occupy_after_code = 'NNZ'
        this.repairAndParam.room_no = param.room_no
        let that = this
        let url= that.api.api_price_9101 + '/v1/' + `room/room_status/manual_change_room_status/`
        let scopeParam = that.repairAndParam
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          this.flushRepairAndParam()  //刷新数据
          that.$message.success('操作成功')
          that.getCardList()
          // that.getCardAllList()
        }).catch(error=>{

        })
      },
      //打开维修dialog
      handleSetRepair(param){
        this.flushRepairAndParam()  //刷新数据
        this.repairAndParam.room_state_before_code = param.room_state
        this.repairAndParam.room_occupy_before_code = param.room_occupy //置维修占用前状态
        this.repairAndParam.room_no = param.room_no
        this.repairAndParam.room_occupy_after_code = 'OOZ'
      },
      //置维修（或者锁定状态）===>注意此时锁房暂时放弃
      setRepairAndLock(){
        if(!this.validateRepairData()){
          return false
        }
        // console.log('type', typeof this.repairAndParam.end_time)
        //控件瑕疵 因此需要再转一下
        this.repairAndParam.end_time = moment(this.repairAndParam.end_time).format('YYYY-MM-DD 23:59:59')
        // typeof this.repairAndParam.end_time === 'object' ? this.repairAndParam.end_time = moment(this.repairAndParam.end_time).format('YYYY-MM-DD 23:59:59') : this.repairAndParam.end_time
        typeof this.repairAndParam.start_time === 'object' ? this.repairAndParam.start_time = moment(this.repairAndParam.start_time).format('YYYY-MM-DD HH:mm:ss') : this.repairAndParam.start_time
        console.log('this.repairAndParam.end_time===',this.repairAndParam.end_time)
        if(this.repairAndParam.end_time){
          if(this.repairAndParam.start_time > this.repairAndParam.end_time){
            this.$message.warning('开始时间大于结束时间，请重新选择!')
            return
          }
        }
        // console.log(new Date(new Date(that.repairAndParam.end_time).setHours(23,59,59)),'that.repairAndParam')
        let that = this
        let url= that.api.api_price_9101 + '/v1/' + `room/room_status/manual_change_room_status/`
        let scopeParam = that.repairAndParam
        that.$axios.post(url,scopeParam).then(res=>{
          that.$message.success('操作成功')
          that.getCardList()
          // that.getCardAllList()
          that.repairDialog = false
        }).catch(error=>{

        })
      },
      //验证置维修数据
      validateRepairData(){
        return (
          util.validateBlank(this.repairAndParam.start_time, '开始日期是必填项', this)&&
          util.validateBlank(this.repairAndParam.end_time,'结束日期是必填项',this)&&
          util.validateBlank(this.repairAndParam.room_state_change_reason,'原因是必填项',this)
        )
      },
      //请求开门dialog
      setOpenDoor(param){
      },
      //置维修占用状态option
      getRepairOccupy(){
        let that = this
        let parent_code = 'room_lock_reason'
        let url = that.api.api_price_9101 + '/v1/' + 'room/room_status/get_code_room_occupy_list/'
        // let url= `http://192.168.4.99:8002/v1/room/room_status/get_code_room_occupy_list/`
        that.$axios({
          method : 'get',
          url : url,
        }).then(res=>{
          that.repairOccupyList = res.data.data.results
        }).catch(error=>{
        })
      },
      //锁房置维修获取维修原因option
      getRepairReason(){
        let that = this
        let parent_code = 'room_lock_reason'
        let url = that.api.api_code_9103 + '/v1/'+ 'system/settings/get_code_base_list/'
        that.$axios({
          method : 'get',
          url : url,
          params:{
            parent_code : 'room_lock_reason'
          }
        }).then(res=>{
          that.repairReasonList = res.data.data.results
        }).catch(error=>{
        })
      },
      //获取楼栋列表option
      getBuilding(){
        let that = this
        let url = that.api.api_price_9101+ '/v1/' + 'room/room_status/get_room_building_list/'
        that.$axios.get(url).then(res=>{
            if(res.data.message == 'success'){
                that.buildingList = res.data.data.results
            }else{
                that.message.error('获取数据失败，请重试')
            }
        }).catch((error)=>{
        })
      },
      //获取楼层数据
      getFloor(){
        let that = this
        let url = that.api.api_price_9101+ '/v1/' + 'room/room_status/get_room_floor_list/'
        that.$axios.get(url).then(res=>{
            if(res.data.message == 'success'){
                that.floorList = res.data.data.results
            }else{
                that.message.error('获取数据失败，请重试')
            }
        }).catch((error)=>{
        })
      },
      //获取房型数据
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
      //获取所有入住单(详细)信息 ===废弃
      getAllMasterInfo(){
        let that = this
        let url = that.api.api_bill_9202 + '/v1/' + `checkin/all_master_list/?page_size=999`
        // let url = 'http://192.168.2.224:9005/v1/checkin/all_master_list/'
        let scopeParam = {
          guest_list:{}
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message == 'success'){
            that.masterAllList = res.data.data.results
            console.log('that.masterAllList',that.masterAllList)
            let array = []
            try {
              for(var item of that.masterAllList){
                console.log('item',item)
                let key = item.room_number
                let value = {
                  isleave: item.leave_time.substring(0,10) == moment(new Date()).format('YYYY-MM-DD') ? 1 : 0,
                  name: item.master_guest.length != 0 ?  item.master_guest[0].name : ''
                }
                let obj = {
                  key_key: key,
                  keyvalue: value
                }
                array.push(obj)
              }
            } catch (error) {
              console.log('error')
            }
            console.log('arrayarray==》获取姓名',array)
            let temp ={}
            for(var item in array){
              let key = array[item].key_key
              temp[key] =  array[item].keyvalue
            }
            this.mapArray.push(temp)
            this.getCardList()
          }else{
            that.message.error('获取数据失败，请重试')
          }
        }).catch((error)=>{
        })
      },
      //传入的数据样式处理
       handleData(filterParam){
        switch (filterParam) {
          case '全部1':
            // this.isActiveBlue = !this.isActiveBlue
            // this.activeParam.isActiveBlue_j = true
              this.isActiveBlack_1 = true//恒定为蓝色
              this.isActiveBlue_j = false, //净房
              this.isActiveBlue_z = false, //脏房
              this.isActiveBlue_zj = false,//住净
              this.isActiveBlue_zz = false,//住脏
              this.isActiveBlue_w = false //维修
              this.isActiveBlue_t = false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
          break;
          case '全部2':
            // this.isActiveBlue = !this.isActiveBlue
            // this.activeParam.isActiveBlue_j = true
              this.isActiveBlack_2 = true//恒定为蓝色
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
          break;
          case 'VC'://净房
            // this.isActiveBlue = !this.isActiveBlue
            // this.activeParam.isActiveBlue_j = true
            // this.activeParam = {
              this.isActiveBlack_1 = false
              this.isActiveBlue_j = true, //净房
              this.isActiveBlue_z = false, //脏房
              this.isActiveBlue_zj = false,//住净
              this.isActiveBlue_zz = false,//住脏
              this.isActiveBlue_w = false, //维修
              this.isActiveBlue_t = false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            // }
            break;
          case 'VD'://脏房
              this.isActiveBlack_1 = false
              this.isActiveBlue_j = false, //净房
              this.isActiveBlue_z=  true, //脏房
              this.isActiveBlue_zj=  false,//住净
              this.isActiveBlue_zz=  false,//住脏
              this.isActiveBlue_w=  false, //维修
              this.isActiveBlue_t=  false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            break;
          case 'OC':
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= true,//住净
              this.isActiveBlue_zz= false,//住脏
              this.isActiveBlue_w= false, //维修
              this.isActiveBlue_t= false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            break;
            case 'OD':
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= false,//住净
              this.isActiveBlue_zz= true,//住脏
              this.isActiveBlue_w= false, //维修
              this.isActiveBlue_t= false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            break;
          case 'OO'://维修
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= false,//住净
              this.isActiveBlue_zz= false,//住脏
              this.isActiveBlue_w= true, //维修
              this.isActiveBlue_t= false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            break;
          case '停用':
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= false,//住净
              this.isActiveBlue_zz= false,//住脏
              this.isActiveBlue_w= false, //维修
              this.isActiveBlue_t= true //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            break;
            case 'OD'://检查 ====>住脏
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= false,//住净
              this.isActiveBlue_zz= false,//住脏
              this.isActiveBlue_w= false, //维修
              this.isActiveBlue_t= false //停用
              this.isActiveBlue_check = true
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = false
            break;
            case 'OS'://锁定_1
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= false,//住净
              this.isActiveBlue_zz= false,//住脏
              this.isActiveBlue_w= false, //维修
              this.isActiveBlue_t= false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = false
              this.isActiveBlue_suoding = true
            break;
            case 'E'://入住
              this.isActiveBlack_1 = false
              this.isActiveBlue_j= false, //净房
              this.isActiveBlue_z= false, //脏房
              this.isActiveBlue_zj= false,//住净
              this.isActiveBlue_zz= false,//住脏
              this.isActiveBlue_w= false, //维修
              this.isActiveBlue_t= false //停用
              this.isActiveBlue_check = false
              this.isActiveBlue_enter = true
              this.isActiveBlue_suoding = false
            break;
          //以下是小图标
          case '团队':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= true,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '欠费':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= true,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '电脑':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= true,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '钟点':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= true,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '锁定':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= true,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '自用':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= true,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '预离':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= true,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '自助机':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= true,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '联房':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= true,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '预定':
              this.isActiveBlack_2 = false
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= true,//预定
              this.isActiveBlue_visitor= false//访客
            break;
          case '访客':
              this.isActiveBlack_2 = false
              // isActiveBlue_j: false, //净房
              // isActiveBlue_z: false, //脏房
              // isActiveBlue_zj: false,//住净
              // isActiveBlue_zz: false,//住脏
              // isActiveBlue_w: false, //维修
              // isActiveBlue_t: false, //停用
              this.isActiveBlue_team= false,//团队
              this.isActiveBlue_qf= false,//欠费
              this.isActiveBlue_computer= false,//电脑
              this.isActiveBlue_clock= false,//钟点
              this.isActiveBlue_lock= false,//锁定
              this.isActiveBlue_self= false,//自用
              this.isActiveBlue_leave= false,//预离
              this.isActiveBlue_zzj= false,//自助机
              this.isActiveBlue_lf= false,//联房
              this.isActiveBlue_yd= false,//预定
              this.isActiveBlue_visitor= true//访客
            break;
          default:
            break;
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .firstIndex{
    width: calc(100% - 58px);
    .left{
      background:rgba(234,237,241,1);
      #tab-first,#tab-second{
        width: 151px;
        line-height: 32px;
      }
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      border-top: none;
      border-top: 2px   solid   red;


    }
    .iconEnd{
      // box-sizing: content-box;
      width: 100%;
      height: 20px;
      position: relative;
      top: 0px;
      // left: 2px;
    }
    .text-ellipsis{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
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
  .boxActive_2{
    height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    cursor: pointer;
    background-color: #3D91F3;
    border-radius: 5px;
  }
  //脏房
  .boxActive_3{
    height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    cursor: pointer;
    background-color: #CCCCCC;
    border-radius: 5px;
  }
  //维修
  .boxActive_4{
    height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    cursor: pointer;
    background-color: #F33D52;
    border-radius: 5px;
  }
  //锁定
  .boxActive_5{
    height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    cursor: pointer;
    background-color: #F3823D;
    // background-image: url('@/assets/images/pms/houseStatus/lockPng.png');
    background-repeat:no-repeat;
    background-position: center;
    background-size: 32% 59%;
    border-radius: 5px;
  }
  .boxActive{
    height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    cursor: pointer;
    background-color: #58D56D;
    border-radius: 5px;
  }
  .trueMark{
    background-image: url('../../../assets/images/pms/houseStatus/true.png');
    background-repeat:no-repeat;
    background-position: center;
    background-size: 32% 59%;
  }
  //批量操作button样式
  .batchBtn{
    background: #5bbbf5;
  }
  .batchHead{
    height: 40px;
    line-height: 40px;
    background-color: #EEEEEE;
    width: calc(100% + 40px);
    margin-left: -15px;
  }
  .boxActive_6{
   height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    cursor: pointer;
    background-color: #2ce8d7;
    border-radius: 5px;
  }
  .boxActive_future{
    height: 70px;
    margin: 1px 4px 4px 1px; //上右下左
    background-color: #33CCFF;
    border-radius: 5px;
  }
  //单击块状房间时的样式
  .popoverActive{
    // background-image: url('@/assets/images/pms/houseStatus/lockPng.png');
    // background-repeat:no-repeat;
    // background-position: center;
    // background-size: 32% 59%;
  }
  //鼠标移入时蒙版效果，有透明度
  .hoverActive:hover{
    opacity:0.4;
  }
  // .lockCss{
  //   background-image: url('../../../assets/images/pms/houseStatus/lockPng.png');
  //   background-repeat:no-repeat;
  //   background-position: center;
  //   background-size: 32% 59%;
  // }
  .activeBlue{
    color: #4488E9;
  }
  .activeBlack{
    color: black
  }
  .inline-div{
    display: flex;
    justify-content: space-between;
    color: #969696;
    margin-top: 40px
  }
  .inline-div span{
    margin-left: 5px;
  }
  .quanbu span:hover{
    // color: #4488E9;
    cursor: pointer;
  }
  .quanbu{
    .quanbu_1{
      color: #4488E9;
    }
  }
  .quanbu_2{
    color: #4488E9;
    // float: right;
    // padding-right: 10px;
    // cursor: pointer;
  }
  .boxStyle{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    // margin-right: 7px;
  }
  .boxStyle_2{
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
  }
  .boxStyle .littleBox{
    width: 20px;
    height: 20px;
    border: 1px solid
  }
  .boxStyle.bigDiv{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    // align-items: center;
    margin-top: 20px
  }
  .secondLineStyle{
    margin-right: 15px;
    margin-left: 5px;
  }
  .oneLineStyle{
    margin-left: 5px;
    cursor: pointer;
  }
  .littleBox.box1{
    background-color: #58D56D;
  }
  .littleBox.box2{
    background-color: #CCCCCC;
  }
  .littleBox.box3{
    background-color: #3D91F3;
  }
  .littleBox.box4{
    background-color: #F3823D;
  }
  .littleBox.box5{
    background-color: #F33D52;
  }
  .littleBox.box6{
    background-color: #683DF3;
    cursor: pointer;
  }
  //检查
  .littleBox.box7{
    background-color: #2ce8d7;
    cursor: pointer;
  }
  .imgStyle{
    margin-left: 10px;
  }
  .right-card{
    // display: inline-block;
  }
  .rightCard{
    // overflow-wrap: break-word;
    // word-break: break-all;
    // word-spacing: 20%;
  }
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
