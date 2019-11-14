<template>
  <!--订单-->
  <div class="global-style">
    <div class="order-see">
      <i class="el-icon-document" style="font-size: 16px;margin-left: 10px"></i><label>订单查看</label>
      <!-- <img src="@/assets/images/pms/orderList/addinfo.png" class="add-info" @click="setMaskShow" /> -->
       <!--新建预定单 -->
      <preview-dialog :parentParam='preBillParam' :show.sync= previewFormVisible  v-on:listenToPreview="getPreviewFromChild"></preview-dialog>
       <!-- 预定单转入住单 -->
      <preview-to-enterDialog :show.sync= previewToEnterVisible :parentInfoParam='preEnterInfoParam' v-on:listenToFlushOrder="flushByOrder"></preview-to-enterDialog>
      <chooseRoom-Dialog :show.sync= chooseRoomVisible :parentInfoParam='preEnterInfoParam' v-on:listenToFlushOrder="flushByOrder"></chooseRoom-Dialog>
      <!--入住详情单===>即联房列表-->
      <link-house-dialog :show.sync= linkHouseFornVisible :parentInfoParam='linInfoParam' v-on:listenToPreview="getPreviewFromChild"></link-house-dialog>
      <el-dialog
          title="二维码信息"
          class="houseTypeClass deletePadding_Class"
          :visible.sync="qrCode_dialog"
          @close="flushQrCode()"
          width="20%">
          <ul style="height: 200px; width: 100%;display: flex;justify-content: center;align-items: center">
            <li>
              <div id="qrcode" ref="qrcode"></div>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <!--<el-button @click="dialog_alipay = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="payment_ensure ">确 定</el-button>-->
          </span>
        </el-dialog>
    </div>
    <div class="tab-class">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="在住单" name="first">
          <div class="all-type"><label>所有分类</label><label>  > </label></div>
          <div class="order-type">
            <div style="float: left">
              <label>到店时间</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox v-model="checked" disabled>当天到店</el-checkbox>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>房间类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <el-checkbox-group v-model="room_types" @change="condition_inquire">
                <el-checkbox v-for="item_room_type in item_room_types" :label="item_room_type.descript" :key="item_room_type.code">{{item_room_type.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>付款类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <el-checkbox v-model="checked" disabled>现付</el-checkbox>
              <el-checkbox v-model="checked" disabled>预约</el-checkbox>
              <el-checkbox v-model="checked" disabled>担保</el-checkbox>
            </div>
          </div>
          <div class="order-source">
            <div style="float: left;height: 90px;overflow: auto">
              <label>订单来源</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="src_codes" @change="condition_inquire">
                <el-checkbox v-for="item_src_code in item_src_codes" :label="item_src_code.code" :key="item_src_code.code">{{item_src_code.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-customer">
            <div style="float: left;margin-bottom:10px">
              <label style="display: inline-block;width: 52px">市场码</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="code_market_ids" @change="condition_inquire">
                <el-checkbox v-for="code_market in item_code_market_ids" :label="code_market.code" :key="code_market.code">{{code_market.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="应到未到" name="second">
          <div class="all-type"><label>所有分类</label><label> > </label></div>
          <div class="order-type">
            <div style="float: left">
              <label>付款类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="checklistorder">
                <el-checkbox label="现付" disabled></el-checkbox>
                <el-checkbox label="预付" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>房间类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <!--<el-checkbox-group v-model="check_list_room" @change="condition_inquire">
                <el-checkbox v-for="room_type in room_types" :label="room_type" :key="room_type">{{room_type}}</el-checkbox>
              </el-checkbox-group>-->
              <el-checkbox-group v-model="room_types" @change="condition_inquire">
                <el-checkbox v-for="item_room_type in item_room_types" :label="item_room_type.descript" :key="item_room_type.code">{{item_room_type.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-source">
            <div style="float: left;height: 110px;overflow: auto">
              <label>订单来源</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="src_codes" @change="condition_inquire">
                <el-checkbox v-for="item_src_code in item_src_codes" :label="item_src_code.code" :key="item_src_code.code">{{item_src_code.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-customer">
            <div style="float: left;margin-bottom:10px">
              <label style="display: inline-block;width: 52px">市场码</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="code_market_ids" @change="condition_inquire">
                <el-checkbox v-for="code_market in item_code_market_ids" :label="code_market.code" :key="code_market.code">{{code_market.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="应离未离" name="third">
          <div class="all-type"><label>所有分类</label><label> > </label></div>
          <div class="order-type">
            <div style="float: left">
              <label>付款类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="checklistorder">
                <el-checkbox label="现付" disabled></el-checkbox>
                <el-checkbox label="预付" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>房间类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <el-checkbox-group v-model="room_types" @change="condition_inquire">
                <el-checkbox v-for="item_room_type in item_room_types" :label="item_room_type.descript" :key="item_room_type.code">{{item_room_type.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-source">
            <div style="float: left;height: 110px;overflow: auto">
              <label>订单来源</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <!-- <el-checkbox-group v-model="src_codes" @change="condition_inquire">
                <el-checkbox v-for="item_src_code in item_src_codes" :label="item_src_code.room_type_name" :key="item_src_code.code">{{item_src_code.descript}}</el-checkbox>
              </el-checkbox-group> -->
              <el-checkbox-group v-model="src_codes" @change="condition_inquire">
                <el-checkbox v-for="item_src_code in item_src_codes" :label="item_src_code.code" :key="item_src_code.code">{{item_src_code.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-customer">
            <div style="float: left;margin-bottom:10px">
              <label style="display: inline-block;width: 52px">市场码</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="code_market_ids" @change="condition_inquire">
                <el-checkbox v-for="code_market in item_code_market_ids" :label="code_market.code" :key="code_market.code">{{code_market.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="所有预定" name="fourth">
          <div class="all-type"><label>所有分类</label><label> > </label></div>
          <div class="order-type">
            <div style="float: left">
              <label>付款类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="checklistorder">
                <el-checkbox label="现付" disabled></el-checkbox>
                <el-checkbox label="预付" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>房间类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <el-checkbox-group v-model="room_types" @change="condition_inquire">
                <el-checkbox v-for="item_room_type in item_room_types" :label="item_room_type.descript" :key="item_room_type.code">{{item_room_type.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-source">
            <div style="float: left;height: 110px;overflow: auto">
              <label>订单来源</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="src_codes" @change="condition_inquire">
                <el-checkbox v-for="item_src_code in item_src_codes" :label="item_src_code.code" :key="item_src_code.code">{{item_src_code.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-customer">
            <div style="float: left;margin-bottom:10px">
              <label style="display: inline-block;width: 52px">市场码</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="code_market_ids" @change="condition_inquire">
                <el-checkbox v-for="code_market in item_code_market_ids" :label="code_market.code" :key="code_market.code">{{code_market.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="异常单" name="fifth">
          <div class="all-type"><label>所有分类</label><label> > </label></div>
          <div class="order-type">
            <div style="float: left">
              <label>到店时间</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="checklistorder">
                <el-checkbox label="当天到店" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>异常类型</label>
              <button class="common-btn disabled">不限</button>
            </div>
            <div class="room-select-top">
             <el-checkbox-group :max="1" @change="unusualEvent" v-model="unusualList">
                <el-checkbox label="预定异常"></el-checkbox>
                <el-checkbox label="入住异常"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>房间类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <el-checkbox-group v-model="room_types" @change="condition_inquire">
                <el-checkbox v-for="item_room_type in item_room_types" :label="item_room_type.descript" :key="item_room_type.code">{{item_room_type.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="room-type">
            <div style="float: left">
              <label>付款类型</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="room-select-top">
              <el-checkbox-group v-model="checklistroom">
                <el-checkbox label="现付" disabled></el-checkbox>
                <el-checkbox label="预约" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-source">
            <div style="float: left;height: 110px;overflow: auto">
              <label>订单来源</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="src_codes" @change="condition_inquire">
                <el-checkbox v-for="item_src_code in item_src_codes" :label="item_src_code.code" :key="item_src_code.code">{{item_src_code.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="order-customer">
            <div style="float: left;margin-bottom:10px">
              <label style="display: inline-block;width: 52px">市场码</label>
              <button class="common-btn">不限</button>
            </div>
            <div class="select-sty">
              <el-checkbox-group v-model="code_market_ids" @change="condition_inquire">
                <el-checkbox v-for="code_market in item_code_market_ids" :label="code_market.code" :key="code_market.code">{{code_market.descript}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="order-table">
      <!--table 这里的table是所有的tab选项里面的，数据是根据tab的不同进行不同的数据渲染的，所以这里是一个table-->
      <el-table @row-dblclick="rowClick" :data="tableData_orderlist" :cell-style="{textAlign:'center'}" style="width: 100%" size="mini" height="350px" :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}" stripe>
      <!--  <el-table-column prop="order_no" fixed width="160" label="预定编号">
        </el-table-column>-->
        <el-table-column type="expand" v-if="rsc_peo_flag">
          <template slot-scope="props">
            <div class="order_class_style">
              <div>
                <span>预定人:</span><span>{{props.row.rsv_person_name}}</span>
                <span>预定房间类型:</span>
                <span v-for="(col,index) in props.row.reserve_rate" :key="index">{{col.room_type}}</span>
                <span>房号:</span>
                <span v-for="col of props.row.reserve_rate" :key="Math.random()">
                  <span v-if="col.room_number != ''"> {{col.room_number}}、</span>
                </span>
                <span>房价码: <span>{{props.row.rate_code}}</span></span>
              </div>
              <div>
                <span>订单号: <span>{{props.row.order_no}}</span></span>
                <span>联系电话:</span><span v-for="(col,index) in props.row.master_guest" :key="index">{{col.telephone}}、</span>
                <span>备注：<span>{{props.row.remark}}</span></span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="reserve_guest" label="预订人" :key="Math.random()" width="160" v-if="rsc_peo_flag">
          <template slot-scope="scope">
            <span v-if="scope.row.reserve_base">{{scope.row.reserve_base[0].rsv_person_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="master_guest" label="入住人" :key="Math.random()" width="160" v-if="!rsc_peo_flag">
          <template slot-scope="scope">
            <span v-for="(col,index) in scope.row.master_guest">{{col.name}}、</span>
          </template>
        </el-table-column>
        <el-table-column prop="room_type" label="在住房间类型" :key="Math.random()" v-if="room_type_flag">
        </el-table-column>
        <el-table-column width="140" label="预定房间类型" :key="Math.random()" v-if="room_type_array_flag" >
          <template slot-scope="scope">
            <!-- <span>房间类型：</span> -->
            <span v-for="(col,index) in scope.row.reserve_rate">{{col.room_type}}、</span>
          </template>
        </el-table-column>
        <el-table-column prop="room_number" label="在住房间号" :key="Math.random()" v-if="room_type_flag">
        </el-table-column>
        <el-table-column prop="reserve_rate" width="140" label="房号" :key="Math.random()" v-if="room_type_array_flag">
          <template slot-scope="scope">
            <span v-for="(col,index) in scope.row.reserve_rate">
              <span v-if="col.room_number != ''"> {{col.room_number}}、</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="reserve_rate" width="140" label="排房" :key="Math.random()" v-if="room_type_array_flag">
          <template slot-scope="scope">
              <span v-if="scope.row.reserve_base"> <el-button :disabled="scope.row.reserve_base[0].rsv_status_lable !=0" style="color: #8e8e8e" @click="chooseRoom(scope.row)" round>排房</el-button></span>
          </template>
        </el-table-column>
        <el-table-column prop="master_guest" width="140" label="在住人联系电话" :key="Math.random()" v-if="!rsc_peo_flag" type="expand">
          <template slot-scope="scope">
            <span v-for="(col,index) in scope.row.master_guest">{{col.telephone}}、</span>
          </template>
        </el-table-column>
        <el-table-column prop="reserve_guest" width="240" label="预定人联系电话" :key="Math.random()" v-if="rsc_peo_flag">
          <template slot-scope="scope">
            <span v-if="scope.row.reserve_base">{{scope.row.reserve_base[0].telephone_master}}</span>
          </template>
        </el-table-column>
        <el-table-column :formatter="dateFormat_arr" prop="arr_time" label="预抵时间" width="140px">
        </el-table-column>
        <el-table-column :formatter="dateFormat_leave" prop="leave_time" label="预离时间" width="140px">
        </el-table-column>
        <!-- <el-table-column prop="retaintime" label="保留时间">
        </el-table-column> -->
        <el-table-column label="是否钟点房">
          <template slot-scope="scope" v-if="scope.row.reserve_base">
            <span v-if="scope.row.reserve_base[0].rsv_lable === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="modify_user_id" label="操作人">
        </el-table-column> -->
        <el-table-column prop="master_status_lable" label="单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.master_status_lable === 0">在住</span>
            <span v-else-if="scope.row.master_status_lable === 4">处理中</span>
            <span v-else-if="scope.row.master_status_lable === 5">已取消</span>
            <!-- <span v-else>NULL</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="250px" fixed="right">
          <template slot-scope="scope" v-if="scope.row.reserve_base || scope.row.master_guest">
            <el-button type="primary" size="small" v-if="!rsc_peo_flag" @click="handleChangeRoom(scope.row)">换房升降</el-button>
            <el-button v-if="rsc_peo_flag && scope.row.reserve_base && scope.row.reserve_base[0].rsv_status_lable ===0" type="danger" class="tabel_right"  @click="enterRoom(scope.row)" size="small">入住</el-button>
            <el-button v-if="rsc_peo_flag && scope.row.reserve_base && scope.row.reserve_base[0].rsv_status_lable ===1" type="text" class="tabel_right" size="small">已入住</el-button>
            <el-button v-if="rsc_peo_flag && scope.row.reserve_base && scope.row.reserve_base[0].rsv_status_lable ===2" type="text" class="tabel_right" size="small">部分入住</el-button>
            <el-button v-if="rsc_peo_flag && scope.row.reserve_base && scope.row.reserve_base[0].rsv_status_lable ===3" type="text" class="tabel_right" size="small">已结账</el-button>
            <el-button v-if="rsc_peo_flag && scope.row.reserve_base && scope.row.reserve_base[0].rsv_status_lable ===0" type="danger" class="tabel_right"  @click="getQr_code(scope.row)" size="small">二维码</el-button>
            <el-button v-if="rsc_peo_flag && scope.row.reserve_base && scope.row.reserve_base[0].rsv_status_lable ===0" type="danger" class="tabel_right"  @click="deleteReserve(scope.row)" size="small">删除</el-button>
            <!-- <el-button @click="handleClick(tableData2[scope.$index].id)" size="small">编辑</el-button> -->
            <!-- <el-button type="danger" @click="deleteClick(scope.$index, scope.row,tableData_orderlist)" style="float: right;margin-right: 20px" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange_list" :current-page.sync="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- <div class="order-page">
      <label>当前合计：</label>
      <label>订金：</label>
      <label>￥</label>
    </div> -->
    <!--换房升级房-->
      <el-dialog @close="flushData" width="35%" class="houseTypeClass background" title="换房升降级" :visible.sync="changeRoomVisible">
        <div style="height: 340px; overflow: auto">
          <div class="roomClass">
            <el-input size="mini" style="width: 13vw" v-model="roomParam.oldType"></el-input>
            <span>换房型</span>
            <el-select @focus="getRoomType()" style="width: 12vw" size="mini" v-model="roomParam.newType">
              <el-option
                v-for="item in roomTypeList"
                :key="item.id"
                :label="item.room_type_desc"
                :value="item.room_type">
              </el-option>
            </el-select>
          </div>
         <div class="roomClass">
            <el-input size="mini" style="width: 13vw" v-model="roomParam.oldNumber"></el-input>
            <span>换房号</span>
            <el-select  @focus="getRoomNo()" style="width: 12vw" size="mini" v-model="roomParam.newNumber">
              <el-option
                v-for="item in roomNoList"
                :key="item.id"
                :label="item.room_no"
                :value="item.room_no">
              </el-option>
            </el-select>
          </div>
          <el-row style="padding-left: 12px" class="roomClass_third">
            是否免费换房: 
            <el-radio @change="witchRoom" style="padding-left: 12px" v-model="roomParam.isFee" label="1">是</el-radio>
            <el-radio @change="witchRoom" v-model="roomParam.isFee" label="2">否</el-radio>
          </el-row>
          <el-row style="padding-left: 12px">
            <span style="padding-left: 15px">原房价:</span> 
            <el-input @input="roomParam.oldPrice = roomParam.oldPrice.replace(/[^\d.]/g,'')" size="mini" class="roomClass_third width" v-model="roomParam.oldPrice"></el-input>
          </el-row>
          <el-row style="padding-left: 12px">
          <span style="padding-left: 30px">折扣:</span> 
          <el-input :disabled="isDiscount" @blur="computeData" @input="roomParam.discount = roomParam.discount.replace(/[^\-?\d.]/g,'')" placeholder="示例:100或者-100" size="mini" class="roomClass_third width" v-model="roomParam.discount"></el-input>
          </el-row>
          <el-row style="padding-left: 12px">
            <span style="padding-left: 15px">现房价:</span> <el-input size="mini" class="roomClass_third width" v-model="roomParam.newPrice"></el-input>
          </el-row>
          <el-row style="padding-left: 12px">
            <span style="display: inline-block;height: 55px;">换房理由:</span> <el-input type="textarea" class="roomClass_third width" :rows="2" v-model="roomParam.reason"></el-input>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmChangeRoom()" type="primary">确认</el-button>
        </div>
        </el-dialog>
    <!--遮罩层-->
    <div class="mask" v-show="maskShow">
      <div class="mask-suspen">
        <div class="mask-close">
          <label>新建预订单</label>
          <label @click="setMaskShow" style="float: right;margin-right: 10px">X</label>
        </div>
        <div class="mask-guesttype">
          <label>客户类别:</label>
          <el-select v-model="value" placeholder="请选择" size="mini" style="width: 8rem;margin-left: 10px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <input placeholder="请输入客户手机号/会员卡号/身份证号" />
          <button>搜索</button>
        </div>
        <div class="mask-roomtype">
          <div>
            <label>入住类型:</label>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 8rem;margin-left: 10px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <label>预抵时间:</label>
            <el-date-picker v-model="reservearrive" type="datetime" prefix-icon="el-icon-date" placeholder="选择日期时间" size="mini" style="width: 175px">
            </el-date-picker>
            <label>预离时间:</label>
            <el-date-picker v-model="reservetime" prefix-icon="el-icon-date" type="datetime" placeholder="选择日期时间" size="mini" style="width: 175px">
            </el-date-picker>
            <label>共</label>
            <input/>
            <label>晚</label>
            <label>保留至:</label>
            <el-date-picker v-model="retaintime" prefix-icon="el-icon-date" type="datetime" placeholder="选择日期时间" size="mini" style="width: 175px">
            </el-date-picker>
          </div>
          <div>
            <label>选择房型:</label>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 8rem;margin-left: 10px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <label>房间数:</label>
            <el-input-number v-model="roomnum" :step="1" size="mini"></el-input-number>
            <button>+&nbsp选房号</button>
          </div>
        </div>
        <div class="mask-cardtype">
          <div>
            <label>房间号:</label>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 8rem;margin-left: 10px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <label>预订人:</label>
            <input/>
            <label>联系电话:</label>
            <input/>
            <label>性别:</label>
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </div>
          <div>
            <label>证件类型:</label>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 12rem;margin-left: 10px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <label>证件号:</label>
            <input/>
            <label>含早:</label>
            <el-input-number v-model="breakfast" :step="1" size="mini"></el-input-number>
            <label>份</label>
          </div>
        </div>
        <div class="mask-btn">
          <img src="../../../assets/images/pms/orderList/cardbtn.png" />
          <button style="margin-left: 120px">物品</button>
          <button>备注</button>
          <button>预约发票</button>
          <button>服务设置</button>
          <button class="btn-last">确认入住</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcodejs2'
  import moment from 'moment'
  import linkHouseDialog from '../houseStatus/linkHouseDialog'
  import previewToEnterDialog from '../houseStatus/previewToEnterDialog'
  import chooseRoomDialog from '../houseStatus/chooseRoomDialog'
  import previewDialog from '../houseStatus/previewDialog'
  //const room_types = ['舒适大床房', '舒适双床房', '舒适家庭房', '风雅商务大床房', '风雅商务双床房', '风雅商务套房'];
  export default {
    name: "orderList",
    data() {
      return {
        isDiscount: false,
        unusualList: [],//异常类型数组
        roomTypeList: [],//房型数组
        roomNoList: [],//可选房号数组
        rowParam: {},//行内对象
        /**换房升降级param */
        roomParam:{
          oldType: '',
          newType: '',
          oldNumber: '',
          newNumber: '',
          isFee: '2',
          oldPrice: '',
          discount: '',
          newPrice: '',
          reason: ''
        },
        changeRoomVisible: false,
        qrCode_dialog: false,
        preBillParam: {
          reserve_guest: [{
          liveCount: 0,//可选数
          room_number: null,//房间号
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
          company_na: '',
          pic_photo: null,
          pic_sign: null,
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
          }]
        },//prop值
        preEnterInfoParam: {},
        linInfoParam: {},
        previewFormVisible: false, //预定单弹出
        previewToEnterVisible: false,
        chooseRoomVisible: false,//排房界面
        linkHouseFornVisible: false,//联房
        /**
         * 条件查询
         */
        tab_pane_flag: 0, //用来判断当前查询的是哪一个
        guest_list: {}, //对在住单、应离未离、异常单的检索
        master_from_lable: [],
        check_list_room: [], //房间类型
        //room_types: room_types, //房间类型源数据
        code_market_ids: [], //市场码
        item_code_market_ids: [], //市场码遍历
        item_src_codes: [], //来源码遍历
        src_codes: [], //来源码
        item_room_types : [],//房型遍历
        room_types : [],//房型
        tableData_orderlist: [], //绑定的table
        room_type_flag: true, //房间类型为显示的  这时候是在住单 应离未离 异常单的情况
        room_type_array_flag: false, //房间类型为应到未到 所有预定的情况
        rsc_peo_flag: false,
        /**
         * 分页
         */
        currentPage: 1, //当前页码
        page_size: 10, //每页显示数量
        total: 0, //总数
        //遮罩层默认的是不显示的
        maskShow: false,
        checked: false,
        //预抵时间
        reservearrive: '',
        //预离时间
        reservetime: '',
        //保留时间
        retaintime: '',
        //性别
        radio: '1',
        //房间数
        roomnum: 5,
        //含早数
        breakfast: 5,
        //table数据
        tableData2: [],
        //下拉框的数据
        options: [],
        value: '',
        activeName2: 'first',
        checklistorder: [],
        checklistroom: [],
        checklistsource: [],
        checklistcustomer: [],
        //线下
        url: 'http://47.98.113.173:9202',
        // url: 'http://192.168.2.224:9005',
        UrLHeader_9103: 'http://47.98.113.173:9103/v2/',
        UrLHeader_bill: 'http://47.98.113.173:9202/v2/',
        UrLHeader_room: 'http://47.98.113.173:8091/v2/',
        reserve_guest:{
          liveCount: 0,//可选数
          room_number: null,//房间号
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
          company_na: '',
          pic_photo: null,
          pic_sign: null,
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
        }
        //线上
        // UrLHeader_9103: 'http://code.crowncrystalhotel.com/v2/',
        // UrLHeader_bill: 'http://192.168.2.224:9005/v2/',
        // UrLHeader_room: 'http://room.crowncrystalhotel.com/v2/',
        // url: 'http://bill.crowncrystalhotel.com',
      };
    },
    components: {
      QRCode,
      'preview-dialog': previewDialog,
      'preview-to-enterDialog': previewToEnterDialog,
      'chooseRoom-Dialog': chooseRoomDialog,
      'link-house-dialog': linkHouseDialog 
    },
    /**
     * 页面加载的时候直接拿到在住单的数据
     */
    created: function() {
      let that = this;
      /**
       * @search_live 进行第一次的无条件查询
       */
      that.search_live();
      that.tab_pane_flag = '0';
      /**
       * @get_market_code_list 将市场码的条件拿到
       */
      that.get_market_code_list();
      /**
       * @get_src_code 将来源码的条件拿到
       */
      that.get_src_code();
      /**
       * @get_room_type_list 将所有的房型拿到
       */
      that.get_room_type_list();
    },
    methods: {
      //是否免费 换房切换
      witchRoom(){
        if(this.roomParam.isFee == '1'){
          this.roomParam.newPrice = this.roomParam.oldPrice
          this.isDiscount  = true
        }else{
          // this.roomParam.oldPrice = ''
          this.roomParam.newPrice = ''
          this.isDiscount  = false
        }
        console.log('roomParam.isFee',this.roomParam.isFee) 
      },
      flushData(){
        this.roomParam.newType = ''
        this.roomParam.oldType = '',
        this.roomParam.oldNumber= '',
        this.roomParam.newNumber= '',
        this.roomParam.oldPrice = '',
        this.roomParam.discount = '',
        this.roomParam.newPrice = '',
        this.roomParam.reason = ''
      },
      /**
       * 对异常单进行筛选 综合查询
       */
      unusualEvent(){
        let that = this
        console.log('zhi',this.unusualList)
        if(this.unusualList[0] === '预定异常'){
          that.rsc_peo_flag = true;
          that.room_type_flag = false;
          that.room_type_array_flag = true;
          that.search_bookingAbnormal_list() //预定异常
        }else{
          that.room_type_flag = true;
          that.room_type_array_flag = false;
          that.rsc_peo_flag = false;
          this.search_abnormal_list() //入住异常单
        }
      },
      /**通过折扣和原价自动计算新的房价 */
      computeData(){
        this.roomParam.newPrice = Number(this.roomParam.oldPrice) + Number(this.roomParam.discount)
      },
      /**
       * @desc 确定进行换房
       */
      confirmChangeRoom(){
        let that = this
        if (that.roomParam.oldNumber && that.roomParam.newNumber && that.roomParam.oldType && that.roomParam.newType && that.roomParam.oldPrice){
          console.log('kaishi',this.rowParam)
          console.log('roomParam',this.roomParam)
          // let url = 'http://192.168.2.165:9005' + '/v2/' + `depend_ex/exchange_houses/`
          let url = that.api.api_newBill_9204 + '/v2/' + `depend_ex/exchange_houses/`
          let scopeParam ={
            order_no:  that.rowParam.order_no,
            old_room: that.roomParam.oldNumber, //原房间
            new_room: that.roomParam.newNumber,
            discount: Number(that.roomParam.discount), //折扣
            is_free: that.roomParam.isFee,
            new_fix_rate: Number(that.roomParam.newPrice),
            old_fix_rate: Number(that.roomParam.oldPrice),
            old_room_type: that.roomParam.oldType,
            new_room_type: that.roomParam.newType,
            change_result: that.roomParam.reason
          }
          console.log(scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            if(res.data.message === 'success'){
              that.$message.success(res.data.data.result.message)
              that.changeRoomVisible = false
              that.search_live();
              that.tab_pane_flag = '0';
            }else{
              that.$message.warning('换房失败!')
            }
            }).catch(error=>{
          })
        }else{
          this.$message.warning('有数据没填充或者价格为0!')
        }
        console.log('this.multipleSelectionget',this.multipleSelection)
      },
      /**
       * @desc 换房升级 可以换房间，也可以更改房价
       */
      handleChangeRoom(row){
        this.getRateCode_price(row)
        this.changeRoomVisible = true
        console.log('row',row)
        this.roomParam.isFee = '2' //切换===>重置
        this.isDiscount  = false //切换===>重置
        this.roomParam.oldNumber = row.room_number
        this.roomParam.oldType = row.room_type
        this.rowParam.order_no = row.order_no
        // this.roomParam.newType = row.room_type //默认老值 error
        this.rowParam = row
        // this.roomParam.oldPrice = row.
      },
      /**
         * @desc_1 根据房型得到对应房价(入住过后当天的房价)
      */
      getRateCode_price(param){
        // this.preBillLinkParam.room_type_name
        let that = this
        let url = that.api.api_newPrice_9114 + '/v1/' +  `room/rate_code/get_rate_code/`
        // let temp = []
        // temp.push(param.room_type)
        let scopeParam ={
          rate_code: param.rate_code,
          begin_date:  moment(new Date()).format('YYYY-MM-DD'),
          end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
          room_type_list: [param.room_type_descript_en]
        }
        that.$axios.post(url,scopeParam).then(res=>{
          // that.rate_breakfastList = res.data.data.price
          let temprate = res.data.data.price
          let key1 = param.room_type_descript_en
          let temprateValue = temprate[key1]
          let key2 = moment(new Date()).format('YYYY-MM-DD') //对象嵌套对象里的key值
          this.roomParam.oldPrice = temprateValue[key2]  //获取当天房价码===>房价
          }).catch(error=>{
        })
      },
      getRoomNo(){
        let that = this
        let start 
        let end
        if(this.rowParam.arr_time && this.rowParam.leave_time){
          start = moment(this.rowParam.arr_time).format('YYYY-MM-DD')
          end = moment(this.rowParam.leave_time).format('YYYY-MM-DD')
        }
        let url= that.api.api_newPrice_9114 + '/v1/' + `room/room_status/can_live_room_list/`
        let scopeParam = {
          room_type: this.roomParam.newType,
          start_time: start,
          end_time: end
        }
        that.$axios.post(url,scopeParam).then(res=>{
          that.roomNoList = res.data.data.data  //选房号tabel数组
        }).catch(error=>{

        })
      },
      //获取房型
      getRoomType(){
        let that = this
        let url =  that.api.api_newPrice_9114 + '/v1/' + 'room/room_status/get_room_type_occupy_list/'
        let start 
        let end
        if(this.rowParam.arr_time && this.rowParam.leave_time){
          start = moment(this.rowParam.arr_time).format('YYYY-MM-DD')
          end = moment(this.rowParam.leave_time).format('YYYY-MM-DD')
        }
        that.$axios({
          url : url,
          method : 'get',
          params:{
            biz_date__gte: start,
            biz_date__lt:  end
          },
        }).then(res=>{
          if(res.data.message === 'success'){
            this.roomTypeList = res.data.data.results
          }else{
              that.$message.error('获取房型失败!')
          }
        }).catch(error=>{
        })
      },
      dateFormat_arr: function (row) {
        return moment(row.arr_time).format("YYYY-MM-DD HH:mm:ss")
      },
      dateFormat_leave: function (row) {
        return moment(row.leave_time).format("YYYY-MM-DD HH:mm:ss")
      },
      rowClick(row){
        if(this.activeName2 === 'first'){
          this.getEnterInfoByRoom(row.room_number)
        }
      },
      //===>联房列表打开
      getEnterInfoByRoom(param,limitParam){
        let scopeParams = {
          room_number: param
        }
        let that = this
        // let url = `http://192.168.2.224:9005/v2/checkin/all_master_info/`
        // let url = that.api.api_bill_9202 + `/v2/checkin/all_master_info/`
        let url = that.api.api_newBill_9204 + `/v2/checkin/all_master_info/`
        that.$axios({
           method : 'get',
            url : url,
            params: scopeParams
        }).then(res=>{
          if(res.data.message === 'success'){
            that.linInfoParam = res.data.data.results[0]
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
      //排房，进行排房
      chooseRoom(param){
        console.log('parammm',param)
        console.log('param.reserve_base.order_no1111=====',param.reserve_base[0].order_no)
        this.getPreInfoByRoom(param.reserve_base[0].order_no,'排房') //预订单详情 通过单号
        console.log('chooseRoomVisible...',this.chooseRoomVisible)

      },
      /**
       * @删除预定
       */
      deleteReserve(row){
        console.log('row..',row)
        let that = this
        let url = that.api.api_newBill_9204 + '/v2/' + `booking/remove_reserve/`
        // let url = that.api.api_bill_9202 + '/v2/' + `booking/get_order_reserve_info/`
        let scopeParam = {
          order_no: row.reserve_base[0].order_no
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message == 'success'){
            this.$message.success('删除预定单成功!')
            this.handleCurrentChange_list(1)
            this.tab_pane_flag = 3
          }else{
            this.$message.warning(res.data.message)
          }
        })
      },
      //生成二维码信息生成二维码信息
      getQr_code(param){
        this.qrCode_dialog = true
        this.$nextTick(() => {
            this.qrcode(param)
        })
        console.log('生成二维码',param.order_no)
      },
      /**
       * @desc 刷新二维码数据
       */
      flushQrCode(){
        this.$refs.qrcode.innerHTML="";
      },
      //生成二维码
      qrcode(param){
        console.log('param,,,,,,,,,',param)
        let that= this;
        let qrcode = new QRCode('qrcode', {
          width: 200,  // 设置宽度
          height: 120, // 设置高度
          text: param.reserve_base[0].order_no,
        })
      },
      enterRoom(param){
        console.log('param',param)
        this.getPreInfoByRoom(param.reserve_base[0].order_no) //预订单详情 通过单号
      },
      //获取预定后的详情==>预定单详情
      getPreInfoByRoom(param,param2){
        console.log('param1111111111111111',param)
        let scopeParams = {
          order_no: param,
          search_type: "2" //根据预订单号查询预订单=== value值为2
        }
        let that = this
        let url = that.api.api_newBill_9204 + '/v2/' + `booking/get_reserve_method/`
        // let url = that.api.api_bill_9202 + '/v2/' + `booking/get_order_reserve_info/`
        that.$axios.post(url,scopeParams).then(res=>{
          if(res.data.message === 'success'){
            that.preInfoParam = res.data.data.results[0]
            console.log('订单=====>that.preInfoParam',that.preInfoParam)
            //处理数据然后传给子组件
            console.log('didididiid',that.reserve_guest)
            console.log('eeeeeeeeee',that.preInfoParam.reserve_guest)
            that.preBillParam.reserve_rate = that.preInfoParam.reserve_rate
            // that.preBillParam.reserve_guest = that.preInfoParam.reserve_guest
            if(that.preInfoParam.reserve_guest.length != 0){
              console.log('if')
              that.preBillParam.reserve_guest = []
              //关键一步，登记有身份证号要清空<===================mark
              for(var item of  that.preInfoParam.reserve_guest){
                item.id_no = ''
              }
              that.preBillParam.reserve_guest = [].concat(that.preInfoParam.reserve_guest)  
            }else{
              that.preBillParam.reserve_guest = []
              that.preBillParam.reserve_guest.push(that.reserve_guest)
              console.log('else')
              // console.log('that.preBillParam.reserve_guest',that.preBillParam.reserve_guest)
            }
            console.log('enterrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            // that.preInfoParam.reserve_guest.length != 0 ? that.preBillParam.reserve_guest = that.preInfoParam.reserve_guest : that.preBillParam.reserve_guest = that.preInfoParam.reserve_guest.push(that.reserve_guest)
            // that.handleParentParam(that.preInfoParam)  这里就不能处理了
            this.preBillParam.reserve_base = that.preInfoParam.reserve_base
            that.handleChildParam(that.preBillParam)
            // this.preBillParam.reserve_rate = this.concatData(this.preBillParam.reserve_rate)
            // that.preBillParam.reserve_base.leave_time = [moment(that.preBillParam.reserve_base.arr_time).format('YYYY-MM-DD HH:mm:ss'),moment(that.preBillParam.reserve_base.leave_time).format('YYYY-MM-DD HH:mm:ss')]
            // that.preBillParam.reserve_base.arr_time = ''
            console.log('enterrrrrrrrrrrrrrrrrrrrrrrrrrrrr111111111111111111111',param2)
            console.log('that.preBillParamthat.preBillParam',that.preBillParam)
            that.preEnterInfoParam = _.cloneDeep(that.preBillParam) //预定转入住详情
            console.log('this.preEnterInfoParam==11111',that.preEnterInfoParam)
            param2 ? that.chooseRoomVisible = true : that.previewToEnterVisible = true
            // this.preEnterInfoParam.parentRoomNumber = param
          }else{
            that.$message.error('获取预订单详情失败!')
          }
        }).catch(error=>{
        })
      },
      handleChildParam(param){
        console.log('进入。。。。。得不到',param)
        for(var item of param.reserve_rate){
          item.can_live_num = ''
          item.room_type_value = ''
          item.dynamic_roomNumber = item.room_number != '' ? item.room_number.split(',') : []
          item.roomCount = ''
          item.roomPrice = ''
        }
        console.log('进入...',param)
        for(var item of param.reserve_guest){
          item.liveCount = 0
        }
      },
      handleParentParam(param){
        console.log('订单2====>',param)
        // this.preBillParam.reserve_rate.can_live_num = ''
        // this.preBillParam.reserve_rate.room_type_value = ''
        // this.preBillParam.reserve_rate.dynamic_roomNumber = []
        // this.preBillParam.reserve_rate.roomCount = ''
        // this.preBillParam.reserve_rate.roomPrice = ''
        // this.preBillParam.reserve_guest.liveCount = 0
        this.preBillParam.reserve_base = [{
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
          id_no: param.id_no,
          fix_rate: param.room_price,
          rate_code: param.rate_code,//房价码
          is_change_rate: param.is_change_rate,
          AR_id: param.AR_id,
          code_commision_id: param.code_commision_id,
          code_market: param.code_market,
          code_src: param.code_src,
          reference_id: param.reference_id,
          rsv_status_lable: param.rsv_status_lable,
          account_opened: param.account_opened,
          total_chartge: param.total_chartge,
          total_pay: param.total_pay,
          last_account_id: param.last_account_id,
          last_pay_id: param.last_pay_id,
          account_num: param.account_num,
          pay_num: param.pay_num
        }]
      },
    //来自预定单子组件传来的值即子组件传给父组件
      getPreviewFromChild(data){
        console.log('previewData中的=>已经预定了',data)
      },
      //刷新order列表
      flushByOrder(data){
        console.log('listenToFlushOrder',data)
        this.handleCurrentChange_list(1)
        this.tab_pane_flag = 3
      },
      /**
       * @get_market_code_list  获取市场码
       * @param no
       */
      get_market_code_list() {
        let that = this;
        let url = that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_list/?parent_code=ratecode_categroy&page_size=100';
        that.$axios({
          method: 'get',
          url: url
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.item_code_market_ids = res.data.data.results;
          console.info(that.code_market);
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @get_src_code 来源码
       */
      get_src_code() {
        let that = this;
        let url = that.api.api_code_9103+ '/v1/' + 'system/settings/get_code_base_list/?parent_code=src_code&page_size=100';
        that.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.item_src_codes = res.data.data.results;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @get_room_type_list  获取房型信息
       */
      get_room_type_list(){
        let that = this
        let url = that.api.api_newPrice_9114+ '/v1/' + `room/room_status/get_room_type_list/`
        that.$axios.get(url).then(res=>{
            if(res.data.message == 'success'){
                that.item_room_types = res.data.data.results
            }else{
                that.message.error('获取数据失败，请重试')
            }
        }).catch((error)=>{
        })
      },
      /**
       * @condition_inquire 条件查询
       */
      condition_inquire() {
        let that = this;
        if(that.tab_pane_flag === '0') {
          /**
           * 在住单的查询
           */
          console.info(that.room_types);
          let url = that.api.api_newBill_9204 + '/v2/checkin/all_master_list/';
          // let url = that.api.api_bill_9202 + '/v2/checkin/all_master_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [],
                room_type: that.room_types,
                code_market: that.code_market_ids,
                code_src: that.src_codes
              }
            }
          }).then((res) => {
            console.info(res);
            // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        } else if(that.tab_pane_flag === '1') {
          /**
           * 应到未到的查询
           */
          console.info(that.room_types);
          // let url = that.api.api_bill_9202 + '/v2/booking/get_not_arrive_list/';
          let url = that.api.api_newBill_9204 + '/v2/booking/get_not_arrive_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              reserve_base: {
                code_market: that.code_market_ids,
                code_src: that.src_codes
              },
              reserve_guest: {},
              reserve_rate: {
                room_type: that.room_types,
                room_class: []
              }
            }
          }).then((res) => {
            console.info(res);
            // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        } else if(that.tab_pane_flag === '2') {
          /**
           * 应离未离的查询
           */
          console.info(that.room_types);
          // let url = that.api.api_bill_9202 + '/v2/checkin/get_leave_list/';
          let url = that.api.api_newBill_9204 + '/v2/checkin/get_leave_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [],
                room_type: that.room_types,
                code_market: that.code_market_ids,
                code_src: that.src_codes
              }
            }
          }).then((res) => {
            console.info(res);
            // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        } else if(that.tab_pane_flag === '3') {
          /**
           * 所有预定的查询
           */
          console.info(that.room_types);
          let url = that.api.api_newBill_9204 + '/v2/booking/get_all_reserve_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              reserve_base: {
                code_market: that.code_market_ids,
                code_src: that.src_codes
              },
              reserve_guest: {},
              reserve_rate: {
                room_type: that.room_types,
                room_class: []
              }
            }
          }).then((res) => {
            console.info(res);
            // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        } else {
          /**
           * 异常单的查询
           */
          console.info(that.room_types);
          // let url = that.api.api_bill_9202 + '/v2/checkin/exception_list';
          let url = that.api.api_newBill_9204 + '/v2/checkin/exception_list/';
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [],
                room_type: that.room_types,
                code_market: that.code_market_ids,
                code_src: that.src_codes
              }
            }
          }).then((res) => {
            console.info(res);
            // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        }
      },
      /**
       * 点击事件的tab
       * @param tab
       */
      handleClick(tab) {
        let that = this;
        this.unusualList = [] // 置空异常筛选操作
        that.tab_pane_flag = tab.index;
        console.log(tab.index);
        if(tab.index === '0') {
          /**
           * 在住单
           */
          that.room_type_flag = true;
          that.room_type_array_flag = false;
          that.rsc_peo_flag = false;
          that.search_live();
        } else if(tab.index === '1') {
          /**
           * 应到未到
           */
          that.rsc_peo_flag = true;
          that.room_type_flag = false;
          that.room_type_array_flag = true;
          that.search_should_to();
        } else if(tab.index === '2') {
          /**
           * 应离未离
           */
          that.room_type_flag = true;
          that.room_type_array_flag = false;
          that.rsc_peo_flag = false;
          that.search_should_leave();
        } else if(tab.index === '3') {
          /**
           * 所有预定
           */
          that.rsc_peo_flag = true;
          that.room_type_flag = false;
          that.room_type_array_flag = true;
          that.search_all_res();
        } else {
          /**
           * 异常单
           */
          that.room_type_flag = true;
          that.room_type_array_flag = false;
          that.rsc_peo_flag = false;
          that.search_abnormal_list();
        }
      },
      /**
       * @search_live  在住单查询
       */
      search_live() {
        let that = this;
        console.info(that.tab_pane_flag);
        // let url = that.api.api_bill_9202 + '/v2/checkin/all_master_list/';
        let url = that.api.api_newBill_9204 + '/v2/checkin/all_master_list/';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            guest_list: {
              master_from_lable: [],
              room_type: that.room_types,
              code_market: that.code_market_ids,
              code_src: that.src_codes
            }
          }
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.tableData_orderlist = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @search_should_to  应到未到
       */
      search_should_to() {
        let that = this;
        console.info(that.tab_pane_flag);
        // let url = that.api.api_bill_9202 + '/v2/booking/get_not_arrive_list/';
        let url = that.api.api_newBill_9204 + '/v2/booking/get_not_arrive_list/';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            reserve_base: {
              code_market: that.room_types,
              code_src: that.src_codes
            },
            reserve_guest: {},
            reserve_rate: {
              room_type: that.room_types,
              room_class: []
            }
          }
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.tableData_orderlist = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @search_should_leave  应离未离
       */
      search_should_leave() {
        let that = this;
        // let url = that.api.api_bill_9202 + '/v2/checkin/get_leave_list/';
        let url = that.api.api_newBill_9204 + '/v2/checkin/get_leave_list/';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            guest_list: {
              master_from_lable: [],
              room_type: that.room_types,
              code_market: that.code_market_ids,
              code_src: that.src_codes
            }
          }
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.tableData_orderlist = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @search_all_res  所有预定
       */
      search_all_res() {
        let that = this;
        let url = that.api.api_newBill_9204 + '/v2/booking/get_all_reserve_list/';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            reserve_base: {
              code_market: that.room_types,
              code_src: that.src_codes
            },
            reserve_guest: {},
            reserve_rate: {
              room_type: that.room_types,
              room_class: []
            }
          }
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.tableData_orderlist = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @search_abnormal_list  异常单-入住
       */
      search_abnormal_list() {
        let that = this;
        // let url = that.api.api_bill_9202 + '/v2/checkin/exception_list';
        let url = that.api.api_newBill_9204 + '/v2/checkin/exception_list/';
        that.$axios({
          method: 'post',
          url: url,
          data: {
            guest_list: {
              master_from_lable: [], // 入住单类别
              room_type: [], //房型
              code_market: [], //市场码
              code_src: [] //来源码
            }
          }
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.tableData_orderlist = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
            /**
       * @search_abnormal_list  异常单-预定
       */
      search_bookingAbnormal_list() {
        let that = this;
        // let url = that.api.api_bill_9202 + '/v2/checkin/exception_list';
        let url = that.api.api_newBill_9204 + '/v2/booking/exception_list/';
        that.$axios({
          method: 'post',
          url: url,
          data: {
              reserve_base: {
              code_market: that.code_market_ids,
              code_src: that.src_codes
              },
              reserve_guest: {},
              reserve_rate: {
                room_type: that.room_types,
                room_class: []
              }
          }
        }).then((res) => {
          console.info(res);
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          that.tableData_orderlist = res.data.data.results;
          that.total = res.data.data.count;
        }).catch((err) => {
          console.error(err);
        })
      },
      /**
       * @handleCurrentChange_list 分页
       */
      handleCurrentChange_list(currentPage) {
        let that = this;
        let url  = '';
        console.info(that.tab_pane_flag);
        /**
         * 这里的请求的url是根据用户点击不同的tab展示不用的接口的。
         */
        if(that.tab_pane_flag){
          switch (that.tab_pane_flag) {
            case '0' : url = that.api.api_newBill_9204 + '/v2/checkin/all_master_list/?page=' + currentPage;
              break;
            case '1' : url = that.api.api_newBill_9204 + '/v2/booking/get_not_arrive_list/?page=' + currentPage;
              break;
            case '2' : url = that.api.api_newBill_9204 + '/v2/checkin/get_leave_list/?page=' + currentPage;
              break;
            case '3' : url = that.api.api_newBill_9204 + '/v2/booking/get_all_reserve_list/?page=' + currentPage;
              break;
            case '4' : url = that.api.api_newBill_9204 + '/v2/checkin/exception_list/?page=' + currentPage;
              break;
            default : break;
          }
        }
        if(that.tab_pane_flag === '3' || that.tab_pane_flag === '1'){
           that.$axios({
            method: 'post',
            url: url,
            data: {
              reserve_base: {
                code_market: that.room_types,
                code_src: that.src_codes
              },
              reserve_guest: {},
              reserve_rate: {
                room_type: that.room_types,
                room_class: []
              }
            }
          }).then((res) => {
            console.info(res);
            //  that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        }else{
          that.$axios({
            method: 'post',
            url: url,
            data: {
              guest_list: {
                master_from_lable: [],
                room_type: that.room_types,
                code_market: that.code_market_ids,
                code_src: that.src_codes
              }
            }
          }).then((res) => {
            console.info(res);
            // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
            that.tableData_orderlist = res.data.data.results;
            that.total = res.data.data.count;
          }).catch((err) => {
            console.error(err);
          })
        }
      },
      setMaskShow() {
        // this.maskShow = !this.maskShow;
        this.previewFormVisible = !this.previewFormVisible
      },
      /**
       * 删除的操作
       * @param index  当前行的下标
       * @param row  当前行的内容
       * @param TableData  当前操作的表格
       */
      deleteClick(index, row, TableData) {
        let that = this;
        let url;
        console.info(that.tab_pane_flag);
        if(that.tab_pane_flag === '0' || that.tab_pane_flag === '2' || that.tab_pane_flag === '4') {
          /**
           * 删除的是入住单
           * @type {string}
           */
          url = that.api.api_bill_9202 + '/v2/checkin/remove_master_all/';
        } else {
          /**
           * 删除的是在住单
           * @type {string}
           */
          url = that.api.api_bill_9202 + '/v2/booking/remove_reserve/';
        }
        that.$axios({
          method: 'post',
          url: url,
          data: {
            order_no: row.order_no
          }
        }).then(function(res) {
          // that.$axios.defaults.headers.common['authorization'] = res.data.new_authorization;
          TableData.splice(index, 1);
          that.hintInfo('success', '删除成功！');
        }).catch(function(err) {
          console.info(err);
          that.hintInfo('warning', '删除失败！');
        })
        console.info(index, row.id);
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
    }
  }
</script>
<style scoped>
 @import "../../../assets/styles/topDialog.less";
</style>
<style scoped lang="less">
  .roomClass{
    margin-top: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-input{
      padding-left: 10px;
      padding-right: 20px;
    }
    .el-select{
      padding-right: 10px;
    }
  }
  .roomClass_third{
    width: 100%;
    margin-top: 12px;
  }
  .roomClass_third.width{
    width: 14vw;
  }
  .order_class_style{
    span{
      margin-left: 10px;
      line-height: 20px;
    }
  }
  .el-checkbox{
    margin-left: 0!important;
    margin-right: 15px!important;
  }
  .global-style{
    width: calc(100% - 58px);
    //遮罩层的样式
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(7, 13, 32, 0.6);
      top: 0;
      left: 0;
      z-index: 900;
      //悬浮框样式
      .mask-suspen {
        background: #F5F5F5;
        width: 90%;
        height: 90%;
        position: fixed;
        top: 5%;
        left: 5%;
        //新建预订单的样式
        .mask-close {
          background: #FFFFFF;
          height: 40px;
          width: 100%;
          background: #303A41;
          color: #ffffff;
          line-height: 40px;
          label {
            margin-left: 10px;
          }
        }
        //客户类别样式
        .mask-guesttype {
          background: #ffffff;
          border-bottom: 1px solid #CCCCCC;
          height: 80px;
          line-height: 80px;
          label {
            .common-mask-lable;
          }
          input {
            margin-left: 10px;
            width: 300px;
            height: 27px;
            border: 1px solid #CCCCCC;
            border-radius: 4px;
          }
          button {
            margin-left: 10px;
            width: 80px;
            height: 25px;
            background: #4488E9;
            border: none;
            line-height: 25px;
            color: #FFFFFF;
            font-size: small;
          }
        }
        //入住类型和选择房型样式
        .mask-roomtype {
          margin-top: 10px;
          height: 160px;
          background: #ffffff;
          border-bottom: 1px solid #CCCCCC;
          //两个div的样式，是一致的，所以是可以写到一个里面的
          div {
            height: 60px;
            line-height: 60px;
            margin-top: 10px;
            label {
              .common-mask-lable;
            }
            input {
              margin-left: 10px;
              width: 80px;
              height: 27px;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
            button {
              margin-left: 10px;
              width: 70px;
              height: 25px;
              background: gray;
              border: none;
              line-height: 25px;
              color: #FFFFFF;
              font-size: small;
              border-radius: 25px;
            }
          }
        }
        //房间号、预订人、证件类型样式
        .mask-cardtype {
          margin-top: 10px;
          height: 260px;
          background: #ffffff;
          border-bottom: 1px solid #CCCCCC;
          //每一个div的样式
          div {
            height: 75px;
            margin-top: 10px;
            label {
              .common-mask-lable;
            }
            input {
              width: 200px;
              margin-left: 10px;
              height: 27px;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
          }
        }
        .tabel_right{
          float: left;
          margin-left: 50px
        }
        //底部div-btn的样式
        .mask-btn {
          img {
            position: absolute;
            margin-left: 10px;
            margin-top: 80px;
            width: 90px;
            height: 30px;
          }
          button {
            position: relative;
            margin-top: 80px;
            margin-left: 10px;
            height: 30px;
            width: 80px;
            color: #ffffff;
            line-height: 30px;
            font-size: small;
            background: #8895A8;
            border: none;
          }
          .btn-last {
            float: right;
            margin-right: 10px;
            background: #58D56D;
            margin-top: 80px
          }
        }
      }
    }
    /**
    公用样式定义
    */

    .common-mask-lable {
      //遮罩层的lable的样式
      margin-left: 10px;
      font-size: 16px;
      color: #333333;
    }

    .common-input {
      width: 8rem;
      height: 25px;
      border: 1px solid #CCCCCC;
      margin-left: 10px;
    }

    .common-marleft {
      margin-left: 10px;
    }

    .common-font {
      margin-top: 20px;
      margin-left: 10px;
      font-size: small;
      color: #777777;
    }

    .common-btn {
      margin-left: 10px;
      width: 80px;
      height: 25px;
      background: #4488E9;
      line-height: 25px;
      color: #FFFFFF;
      border: none;
      margin-right: 40px;
    }
    .common-btn.disabled{
      background: #DCDFE6;
    }

    .select-sty {
      /*margin-top: 10px;*/
      height: auto !important;
      width: 75%;
      line-height: 20px;
    }
    /**
     第一层样式
     */

    .order-see {
      margin-top: 10px;
      color: #777777;
      img {
        .common-marleft
      }
      label {
        .common-marleft
      }
      .add-info {
        float: right;
        margin-right: 10px;
      }
    }
    /**
    第二层样式
     */

    .tab-class {
      border: 1px solid #CCCCCC;
      .common-marleft;
      margin-top: 10px;
      margin-right: 10px;
      //顶部样式
      .all-type {
        height: 30px;
        background: #F4F4F4;
        line-height: 30px;
        padding-left: 10px;
      }
      //付款类型样式
      .order-type {
        .common-font
      }
      //房间类型样式
      .room-type {
        .common-font
      }
      //订单来源样式
      .order-source {
        .common-font
      }
      //市场码样式
      .order-customer {
        .common-font
      }
      .room-select-bottom {
        margin-top: 10px;
      }
      .room-type-bottom {
        margin-top: 20px;
        margin-left: 196px;
        margin-bottom: 10px;
      }
    }
    /**
      表格样式
       */

    .order-table {
      border: 1px solid #CCCCCC;
      margin-top: 20px;
      margin-right: 10px;
      //.select-sty;
      .common-marleft;
    }
    /**
    分页样式
     */

    .order-page {
      .common-marleft;
      .select-sty;
      color: #777777;
      .pull-right {
        float: right;
        margin-right: 10px;
      }
    }
    /**
    筛选器的样式
     */

    .order-screen {
      .common-marleft;
      .select-sty;
      .btn {
        margin-left: 10px;
        width: 100px;
        height: 27px;
        background: rgba(68, 136, 233, 1);
        border-radius: 4px;
        border: none;
        color: #ffffff;
      }
    }
  }

</style>
<style scoped>
  .houseTypeClass>>> .el-dialog__header{
    background-color: #303A41FF;
}
</style>
<!--<style>
  .el-input-number__decrease {
    right: 1px;
    border: 0px solid #dcdfe6;
  }

  .el-input-number__increase {
    right: 1px;
    border: 0px solid #dcdfe6;
  }

  .el-input-number__decrease,
  .el-input-number__increase {
    opacity: 1;
    background: #ffffff;
    height: 0;
    /*margin-top: 15px;*/
    /*line-height: 24px;*/
  }

  .el-input-number {
    margin-left: 10px;
    outline: none;
  }
</style>-->
