<template>
  <!--场地设置-->
<div class="site-all">
  <div class="code-top">
    <i class="el-icon-setting"></i>
    <label>场地设置</label>
  </div>
  <div class="tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="楼栋设置" name="first">
        <button class="setbtn" @click="dialogVisibleLd = true; flush()">新增</button>
        <el-table
          :data="tableDataBuilding"
          size="mini"
          align="center"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 10px">
          <el-table-column
            prop="code"
            fixed
            label="代码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="code_name"
            label="代码名称"
            width="140">
          </el-table-column>
          <!--<el-table-column
            prop="create_datetime"
            label="创建时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="创建用户">
          </el-table-column>-->
          <el-table-column
            prop="descript"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="descript_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <!--<el-table-column
            prop="modify_date"
            label="更新日期"
            width="170">
          </el-table-column>
          <el-table-column
            prop="modify_user"
            label="更新用户">
          </el-table-column>-->
          <!--<el-table-column
            prop="parent_code"
            label="父节点"
            width="140">
          </el-table-column>-->
          <el-table-column
            prop="building_name"
            label="楼栋">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="address"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogVisibleLd =true; EditeInfoLd(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteLd(scope.$index, scope.row,tableDataBuilding)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeLd"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="楼层设置" name="second">
        <button class="setbtn" @click="dialogVisibleLc = true; flush()">新增</button>
        <el-table
          :data="tableDataRoomFloor"
          size="mini"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 10px">
          <el-table-column
            prop="code"
            fixed
            label="代码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="code_name"
            label="代码名称"
            width="140">
          </el-table-column>
          <el-table-column
            prop="create_datetime"
            label="创建时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="descript"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="descript_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="modify_date"
            label="更新日期"
            width="170">
          </el-table-column>
          <el-table-column
            prop="modify_user"
            label="更新用户">
          </el-table-column>
          <el-table-column
            prop="parent_code"
            label="父节点"
            width="140">
          </el-table-column>
          <el-table-column
            prop="building_name"
            label="楼栋">
          </el-table-column>
          <el-table-column
            prop="number"
            label="层">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogVisibleLc =true; EditeInfoLc(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteLc(scope.$index, scope.row,tableDataRoomFloor)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeLc"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="房型设置" name="third">
        <button class="setbtn" @click="dialogVisibleFx = true; flush()">新增</button>
        <el-table
          :data="tableDataRoomSet"
          size="mini"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 10px">
        <el-table-column
          prop="code"
          fixed
          label="代码"
          width="140">
        </el-table-column>
        <el-table-column
          prop="code_name"
          label="代码名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="area"
          label="面积">
        </el-table-column>
        <el-table-column
          prop="bed_num"
          label="床数">
        </el-table-column>
        <el-table-column
          prop="bed_type"
          label="床型">
        </el-table-column>
        <el-table-column
          prop="create_datetime"
          label="创建时间"
          width="170">
        </el-table-column>
        <el-table-column
          prop="create_user"
          label="创建人">
          <!--<template slot-scope="scope">
            <span v-if="scope.row.is_halt === 0">禁用</span>
            <span v-else>可用</span>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="descript"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="descript_en"
          label="英文描述">
        </el-table-column>
        <el-table-column
          prop="is_halt"
          label="是否停用">
          <template slot-scope="scope">
            <span v-if="scope.row.is_halt === true">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_hour_room"
          label="是否钟点房">
          <template slot-scope="scope">
            <span v-if="scope.row.is_hour_room === true">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_overbooking"
          label="是否允许超预定">
          <template slot-scope="scope">
            <span v-if="scope.row.is_overbooking === true">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
          <el-table-column
            prop="is_selfmachine_use"
            label="是否只对自助机可见">
            <template slot-scope="scope">
              <span v-if="scope.row.is_selfmachine_use === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="list_order"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="max_checkin_num"
            label="最大入住人数">
          </el-table-column>
          <el-table-column
            prop="modify_date"
            label="更新日期"
            width="170">
          </el-table-column>
          <el-table-column
            prop="modify_user"
            label="更新用户">
          </el-table-column>
          <el-table-column
            prop="overbokking_number"
            label="超预定数量">
          </el-table-column>
          <el-table-column
            prop="room_type_name"
            label="房型名称中文">
          </el-table-column>
          <el-table-column
            prop="room_type_name_en"
            label="房型名称英文">
          </el-table-column>
          <el-table-column
            prop="short_name"
            label="房型英文缩写">
          </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dialogVisibleFx = true; EditeInfoFx(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteFx(scope.$index, scope.row,tableDataRoomSet)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeFx"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="房类设置" name="fourth">
        <button class="setbtn" @click="dialogVisibleFl = true; flush()">新增</button>
        <el-table
          :data="tableDataRoomType"
          size="mini"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 10px">
          <el-table-column
            fixed
            prop="code"
            label="代码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="code_name"
            label="代码名称">
          </el-table-column>
          <el-table-column
            prop="create_datetime"
            label="创建时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="descript"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="descript_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="list_order"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="modify_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="modify_user"
            label="更新用户">
          </el-table-column>
          <el-table-column
            prop="room_class_name"
            label="房类">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="option"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogVisibleFl = true; EditeInfoFl(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteFl(scope.$index, scope.row,tableDataRoomType)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeFl"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="房间特征" name="fifth">
        <button class="setbtn" @click="dialogVisibleTrait = true; flush()">新增</button>
        <el-table
          :data="tableDataRoomTrait"
          size="mini"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 10px">
          <el-table-column
            fixed
            prop="code"
            label="代码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="code_name"
            label="代码名称">
          </el-table-column>
          <el-table-column
            prop="create_datetime"
            label="创建时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="descript"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="descript_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="feature_name"
            label="房间特征">
          </el-table-column>
          <el-table-column
            prop="feature_en"
            label="房间特征英文">
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="list_order"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="modify_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="modify_user"
            label="更新用户">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="option"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogVisibleTrait = true; EditeInfoTrait(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handDeleteTrait(scope.$index, scope.row,tableDataRoomTrait)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeTrite"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="房间设置" name="six">
        <button class="setbtn" @click="dialogVisibleRoomNum = true; flush()">新增</button>
        <el-table
          :data="tableDataRoomNum"
          size="mini"
          :header-cell-style="{background:'#303A41',color:'white'}"
          style="width: 100%;margin-top: 10px">
          <el-table-column
            fixed
            prop="code"
            label="代码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="code_name"
            label="代码名称">
          </el-table-column>
          <el-table-column
            prop="building_name"
            label="楼栋中文名称">
          </el-table-column>
          <el-table-column
            prop="create_datetime"
            label="创建时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="create_user"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="descript"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="descript_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="floor_number"
            label="楼层">
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="list_order"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="modify_date"
            label="更新日期">
          </el-table-column>
          <el-table-column
            prop="modify_user"
            label="更新用户">
          </el-table-column>
          <el-table-column
            prop="room_class_name"
            label="房类名称">
          </el-table-column>
          <el-table-column
            prop="room_no"
            label="房号">
          </el-table-column>
          <el-table-column
            prop="room_num_state"
            label="房间状态">
          </el-table-column>
          <el-table-column
            prop="room_number_guest"
            label="对客门牌号">
          </el-table-column>
          <el-table-column
          prop="room_number_guest_en"
          label="对客门牌号英文">
        </el-table-column>
          <el-table-column
          prop="room_phone"
          label="客房座机长号">
        </el-table-column>
          <el-table-column
            prop="room_phone_short"
            label="客房座机短号">
          </el-table-column>
          <el-table-column
            prop="room_type_name"
            label="房型名称">
          </el-table-column>
          <el-table-column
            prop="self_machine_can_sale"
            label="自助机可用状态">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="option"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogVisibleRoomNum = true; EditeInfoRoomNum(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handDeleteRoomNum(scope.$index, scope.row,tableDataRoomNum)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeRoomNum"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="房间特征与信息" name="seven">
        <button class="setbtn" @click="SetMaskTrueShow">新增</button>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!--楼栋dialog-->
  <el-dialog
        title="新增楼栋"
        :visible.sync="dialogVisibleLd"
        width="50%"
        class="dialog-style">
        <ul>
          <li><span>*代码:</span><input v-model="param.code" maxlength="9"/><span>*代码名称:</span><input v-model="param.code_name"/></li>
          <li><span>创建用户:</span><input v-model="param.create_user"/><span>*描述:</span><input v-model="param.descript"/></li>
          <li><span>*英文描述:</span><input v-model="param.descript_en"/><span>集团ID:</span><input v-model="param.hotel_group_id" type="number"/></li>
          <li><span>酒店ID:</span><input v-model="param.hotel_id" type="number"/><span>*排序:</span><input v-model="param.list_order" type="number"/></li>
          <li><span>更新用户:</span><input v-model="param.modify_user"/><span>*父节点:</span><input v-model="param.parent_code"/></li>
          <li><span>*楼栋:</span><input v-model="param.building_name"/></li>
          <li>
            <span>*是否停用:</span>
            <el-radio v-model="param.is_halt" label='1'>是</el-radio>
            <el-radio v-model="param.is_halt" label='0'>否</el-radio>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleLd = false">取 消</button>
        <button type="primary" @click="saveInfoLd">确 定</button>
        </span>
      </el-dialog>
  <!--楼层dialog-->
  <el-dialog
    title="新增楼层"
    :visible.sync="dialogVisibleLc"
    width="50%"
    class="dialog-style">
    <ul>
      <li><span>*代码:</span><input v-model="param.code" maxlength="9"/><span>*代码名称:</span><input v-model="param.code_name"/></li>
      <li><span>创建用户:</span><input v-model="param.create_user"/><span>*描述:</span><input v-model="param.descript"/></li>
      <li><span>*英文描述:</span><input v-model="param.descript_en"/><span>*排序:</span><input v-model="param.list_order" type="number"/></li>
      <li><span>楼层:</span><input v-model="param.number" type="number"/><span>更新用户:</span><input v-model="param.modify_user"/></li>
      <li>
        <span>*楼栋:</span>
        <el-select v-model="param.building_name" @focus="selectBuildName()" placeholder="请选择" size="mini" style="margin-left: 6px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.building_name">
          </el-option>
        </el-select>
      </li>
      <li><span>图片:</span><input v-model="param.picture"/></li>
      <li>
        <span>*是否停用:</span>
        <el-radio v-model="param.is_halt" label='1'>是</el-radio>
        <el-radio v-model="param.is_halt" label='0'>否</el-radio>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleLc = false">取 消</button>
        <button type="primary" @click="saveInfoLc">确 定</button>
        </span>
  </el-dialog>
  <!--房型dialog-->
  <el-dialog
    title="新增房型"
    :visible.sync="dialogVisibleFx"
    width="60%"
    class="dialog-style">
    <ul>
      <li><span>*代码:</span><input v-model="param.code" maxlength="9"/><span>*代码名称:</span><input v-model="param.code_name"/></li>
      <li><span>创建用户:</span><input v-model="param.create_user"/><span>*描述:</span><input v-model="param.descript"/></li>
      <li><span>*英文描述:</span><input v-model="param.descript_en"/><span>*排序:</span><input v-model="param.list_order" type="number"/></li>
      <li><span>更新用户:</span><input v-model="param.modify_user"/><span>最大入住数:</span><input v-model="param.max_checkin_num" type="number"/></li>
      <li><span>*房型名称:</span><input v-model="param.room_type_name"/><span>*房型名称英文:</span><input v-model="param.room_type_name_en"/></li>
      <li><span>*英文缩写:</span><input v-model="param.short_name"/><span>*面积:</span><input v-model="param.area"/></li>
      <li><span>*床数:</span><input v-model="param.bed_num" type="number"/>
        <span>*是否自助机可见:</span>
        <el-radio  v-model="param.is_selfmachine_use" label='1'>是</el-radio>
        <el-radio  v-model="param.is_selfmachine_use" label='0'>否</el-radio></li>
      <li>
        <span>超预定数量:</span><input v-model="param.overbokking_number" type="number"/>
        <span>*是否允许超预定:</span>
        <el-radio  v-model="param.is_overbooking" label='1'>是</el-radio>
        <el-radio  v-model="param.is_overbooking" label='0'>否</el-radio>
      </li>
      <li>
        <span>*床型:</span><input v-model="param.bed_type"/>
        <span>*是否是钟点房:</span>
        <el-radio  v-model="param.is_hour_room" label='1'>是</el-radio>
        <el-radio  v-model="param.is_hour_room" label='0'>否</el-radio>
      </li>
      <li>

        <span>*是否停用:</span>
        <el-radio  v-model="param.is_halt" label='1'>是</el-radio>
        <el-radio  v-model="param.is_halt" label='0'>否</el-radio>
      </li>
      <li>
        <span>图片:</span>
        <!--<el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :limit="1"
          :auto-upload="true"
          :on-change="handleChange"
          :show-file-list="true"
          :file-list="fileList"
          :on-error="handleError"
          :on-success="handleSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>-->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleFx = false">取 消</button>
        <button type="primary" @click="saveInfoFx">确 定</button>
        </span>
  </el-dialog>
  <!--房类dialog-->
  <el-dialog
    title="新增房类"
    :visible.sync="dialogVisibleFl"
    width="50%"
    class="dialog-style">
    <ul>
      <li><span>*代码:</span><input v-model="param.code" maxlength="9"/><span>*代码名称:</span><input v-model="param.code_name"/></li>
      <li><span>创建用户:</span><input v-model="param.create_user"/><span>*描述:</span><input v-model="param.descript"/></li>
      <li><span>*英文描述:</span><input v-model="param.descript_en"/><span>*排序:</span><input v-model="param.list_order" type="number"/></li>
      <li><span>集团ID:</span><input v-model="param.hotel_group_id" type="number"/><span>酒店ID:</span><input v-model="param.hotel_id" type="number"/></li>
      <li>
        <span>更新用户:</span>
        <input v-model="param.modify_user"/>
        <span>*是否停用:</span>
        <el-radio v-model="param.is_halt" label='1'>是</el-radio>
        <el-radio v-model="param.is_halt" label='0'>否</el-radio>
      </li>
      <li>
        <span>*房类名称:</span>
        <input v-model="param.room_class_name"/>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleFl = false">取 消</button>
        <button type="primary" @click="saveInfoFl">确 定</button>
        </span>
  </el-dialog>
  <!--房间特征dialog-->
  <el-dialog
    title="新增房类"
    :visible.sync="dialogVisibleTrait"
    width="50%"
    class="dialog-style">
    <ul>
      <li><span>*代码:</span><input v-model="param.code" maxlength="9"/><span>*代码名称:</span><input v-model="param.code_name"/></li>
      <li><span>创建用户:</span><input v-model="param.create_user"/><span>*描述:</span><input v-model="param.descript"/></li>
      <li><span>*英文描述:</span><input v-model="param.descript_en"/><span>*排序:</span><input v-model="param.list_order" type="number"/></li>
      <li><span>集团ID:</span><input v-model="param.hotel_group_id" type="number"/><span>酒店ID:</span><input v-model="param.hotel_id" type="number"/></li>
      <li><span>更新用户:</span><input v-model="param.modify_user"/><span>*房间特征英文:</span><input v-model="param.feature_en"/></li>
      <li><span>*房间特征:</span><input v-model="param.feature_name"/>
        <span>*是否停用:</span>
        <el-radio v-model="param.is_halt" label='1'>是</el-radio>
        <el-radio v-model="param.is_halt" label='0'>否</el-radio>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleTrait = false">取 消</button>
        <button type="primary" @click="saveInfoTrait">确 定</button>
        </span>
  </el-dialog>
  <!--房间号dialog-->
  <el-dialog
    title="新增房号"
    :visible.sync="dialogVisibleRoomNum"
    width="50%"
    class="dialog-style">
    <ul>
      <li><span>*代码:</span><input v-model="param.code" maxlength="9"/><span>*代码名称:</span><input v-model="param.code_name"/></li>
      <li><span>创建用户:</span><input v-model="param.create_user"/><span>*描述:</span><input v-model="param.descript"/></li>
      <li><span>房间号:</span><input v-model="param.room_no" type="number"/><span>*楼层:</span><input v-model="param.floor_number"/></li>
      <li><span>*描述英文:</span><input v-model="param.descript_en"/><span>集团ID:</span><input v-model="param.hotel_group_id" type="number"/></li>
      <li><span>酒店ID:</span><input v-model="param.hotel_id" type="number"/><span>排序:</span><input v-model="param.list_order" type="number"/></li>
      <li><span>更新用户:</span><input v-model="param.modify_user"/><span>房间号:</span><input v-model="param.room_number_id" type="number"/></li>
      <li><span>对客门牌号:</span><input v-model="param.room_number_guest"/><span>对客门牌号英文:</span><input v-model="param.room_number_guest_en"/></li>
      <li><span>对内门牌号:</span><input v-model="param.room_number_inner"/><span>对内门牌号英文:</span><input v-model="param.room_number_inner_en"/></li>
      <li><span>所属房型:</span>
        <el-select v-model="param.room_type_name" @focus="selectroom_type_name()" placeholder="请选择" size="mini" style="margin-left: 6px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.room_type_name">
          </el-option>
        </el-select>
         <span>客房座机长号:</span><input v-model="param.room_phone"/></li>
      <li><span>客房座机短号:</span><input v-model="param.room_phone_short"/><span>自助机可用状态:</span>
        <el-radio v-model="param.self_machine_can_sale" label='1'>是</el-radio>
        <el-radio v-model="param.self_machine_can_sale" label='0'>否</el-radio>
      </li>
      <li><span>*房间特征:</span>
        <el-select v-model="param.feature_name" @focus="selectFeature()" placeholder="请选择" size="mini" style="margin-left: 6px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.feature_name">
          </el-option>
        </el-select><span>*是否停用:</span>
        <el-radio v-model="param.is_halt" label='1'>是</el-radio>
        <el-radio v-model="param.is_halt" label='0'>否</el-radio>
      </li>
      <li>
        <span>*楼栋:</span>
        <el-select v-model="param.building_name" @focus="selectBuildName()" placeholder="请选择" size="mini" style="margin-left: 6px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.building_name">
          </el-option>
        </el-select><span>房间状态:</span><input v-model="param.room_num_state" type="number"/>
      </li>
      <li>
        <span>*房类名称:</span>
        <el-select v-model="param.room_class_name" @focus="selectRoom_class_name()" placeholder="请选择" size="mini" style="margin-left: 6px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.room_class_name">
          </el-option>
        </el-select>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleRoomNum = false">取 消</button>
        <button type="primary" @click="saveInfoRoomNum">确 定</button>
        </span>
  </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "RoomSet",
        data(){
          return{
            //文件上传
            imageUrl : '',
            fileList2 : [],
            dialogImageUrl: '',
            dialogVisible: false,
            //提示信息
            hint : '好开心啊！删除成功啦！',
            //分页
            currentPage: 1,
            pagesize: 10,
            total: 0,
            //url   http://room.crowncrystalhotel.com/v1/room/
            url : 'room.crowncrystalhotel.com/v1',
            //dialog的隐藏于显示
            dialogVisibleLd : false, //楼栋的dialog
            dialogVisibleLc : false,//楼层的dialog
            dialogVisibleFx : false,//房型的dialog
            dialogVisibleFl : false,//房类的dialog
            dialogVisibleTrait : false,//房间特征dialog
            dialogVisibleRoomNum : false,//房间号dialog
            maskShow : false,
            //新增房型遮罩层控制
            maskShowaddroomtype : false,
            //新增房间遮罩层控制
            maskShowaddroom : false,
            // 是否显示房间房型设置
            activeName: 'first',
            // 搜索房间号
            SearchNum:'',
            //楼栋设置
            tableDataBuilding : [],
            //楼层设置
            tableDataRoomFloor : [],
            //房型设置
            tableDataRoomSet : [],
            //房间分类
            tableDataRoomType : [],
            //房间特征
            tableDataRoomTrait : [],
            //房间信息（房号）
            tableDataRoomNum : [],
            //房间特征与房间信息
            tableDataRoomTraAndNum  : [],
            //控制遮罩层的开启与关闭
            flagopenwin : '',
            //下拉框
            options : [],
            //新增需要的字段
            param:{},
            //编辑操作的Id
            comEdite : {},
            //是否是编辑 true;编辑 false：新增
            isEdite:true,
            //文件数据
            fileList : [],
            isConfirm: true,
          }
        },
          /**
          * 默认加载的是第一个tab的数据
          */
        created : function(){
          let that = this;
          let url = 'http://'+that.url+'/room/get_room_building_list/';
          that.$axios({
            method : 'get',
            url : url,
            params:{
              page : that.currentPage,
              page_size : that.pagesize
            }
          }).then(function (res) {
            console.info(res);
            that.total = res.data.data.count;
            console.info(res.data.data.results);
            that.tableDataBuilding = res.data.data.results;
          }).catch(function (err) {
            console.info(err);
          })
          },
        methods:{
          /**
           * @handleAvatarSuccess
           */
          /*handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.info("This is file");
            console.log(file);
          },
          handleError(err, file) {
            console.info(err,file);
            this.fileList = [];
          },
          handleSuccess(res, file) {
            console.info(res,file);
            this.fileList = [];
          },
          handleExceed(files, fileList) {},
          async handleChange() {
            const isSubmit = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return false
            }).catch(() => {
              return true
            });
            if (isSubmit) {
              this.$refs.upload.submit()
            } else {
              this.fileList = []
            }
          },*/
          /**
           * @hintInfo 操作提示信息
           * @param success  成功提示
           * @param warning 警告信息
           */
          hintInfo : function(hint){
            let that = this;
            if(hint == "success"){
              that.$message({
                message: '操作成功！',
                type: 'success'
              });
            }else if(hint == "warning"){
              that.$message({
                message: '*为必填项！',
                type: 'warning'
              });
            }else{
              this.$message.error('出错了！');
            }
          },
          /**
           * @flush 初始化数据 给数据制空的操作
           * @param no
           */
          flush(){
            let that = this;
            that.isEdite = false
            that.param = {
                  code : '', //代码
                  code_name : '',//代码名称
                  create_user : '',  // 创建者
                  descript : '', //描述
                  descript_en : '', //英文描述
                  hotel_group_id : '1939', //酒店ID
                  hotel_id : '1939', //
                  modify_user : '', //更新者
                  building_name : '', //楼栋中文名称
                  parent_code : '',  //父节点
                  create_datetime : '',  //创建时间
                  modify_date : '',  //更新日期
                  area : '',  //面积
                  bed_type : '',  //床型
                  picture : '', //图片
                  room_type_name : '',  //房型中文名称
                  room_type_name_en : '', //房型英文名称
                  short_name : '', //房型英文缩写
                  tag : '',       //房类名称
                  feature : '',  //房间特征
                  feature_en : '', //房间特征英文
                  room_phone_short : '', //房间座机短号
                  room_phone : '',  //房间座机长号
                  room_number_guest_en : '',//对客门牌号英文
                  room_number_inner_en : '',//对内门牌号英文
                  room_number_inner : '', //对内门牌号
                  room_number_guest : '', //对客门牌号
                  room_no : '',  //房间号
                  room_class_name : '', //房类名称
                  bed_num : 1,  //床数
                  list_order : 100, //排序
                  max_checkin_num : 1, //最大入住人数
                  overbokking_number : 1, //超预定数量
                  floor_number : 1, //楼层
                  self_machine_can_sale : '1', //自助机可用状态
                  room_num_state : 1, //房间状态
                  is_hour_room : '1', //是否钟点房
                  is_overbooking : '1', //是否允许超预定
                  is_selfmachine_use : '1', //是否只对自助机可见
                  is_halt : '0',  //是否停用
                  number : 1,//楼层
                  room_number_id : 1001,//房间号
                  feature_name : ''//房间特征名称
            }
          },
          /**
           *@selectBuildName 选择楼栋的操作 options（select）
           * @param no
           */
          selectBuildName : function(){
                let that = this;
                let url = 'http://'+that.url+'/room/get_room_building_list_tree/';
                that.$axios({
                    method : 'get',
                    url : url
                }).then(function (res) {
                   that.options = res.data.data;
                   console.info(res);
                }).catch(function (err) {
                   console.info(err);
                })
          },
          /**
           * @selectRoom_class_name 选择房类的操作 options（select）
           * @param no
           */
          selectRoom_class_name : function(){
                let that = this;
                let url = 'http://'+that.url+'/room/get_roomclass_list_tree/';
                that.$axios({
                  method : 'get',
                  url : url
                }).then(function (res) {
                  that.options = res.data.data;
                  console.info(res);
                }).catch(function (err) {
                  console.info(err);
                })
          },
          /**
           * @selectroom_type_name 选择房型的操作
           */
          selectroom_type_name  : function(){
                let that = this;
                let url = 'http://'+that.url+'/room/get_roomtype_list_tree/';
                that.$axios({
                  method : 'get',
                  url : url
                }).then(function (res) {
                  that.options = res.data.data;
                  console.info(res);
                }).catch(function (err) {
                  console.info(err);
                })
          },
          /**
           * @selectFeature 选择房间特征的操作 options （select）
           * @param no
           */
          selectFeature : function(){
                let that = this;
                let url = 'http://'+that.url+'/room/get_roomfeatures_list_tree/';
                that.$axios({
                  method : 'get',
                  url : url
                }).then(function (res) {
                  that.options = res.data.data;
                  console.info(res.data);
                }).catch(function (err) {
                  console.info(err);
                })
          },
          /**
           * @handleClick tab切换的事件
           * @param tab  可以根据tab.name判断用户点击的是哪一个tab 进而得到相应的数据
           * @param event 该tab的所有事件
           */
          handleClick(tab, event) {
            let that = this;
            //楼栋信息
            if(tab.name === 'first'){
               that.flagopenwin = tab.name;
               let url = 'http://'+that.url+'/room/get_room_building_list/';
               that.$axios({
                 method : 'get',
                 url : url,
                 params:{
                   page : that.currentPage,
                   page_size : 10
                 }
               }).then(function (res) {
                  console.info(res);
                  that.total = res.data.data.count;
                  that.tableDataBuilding = res.data.data.results;
               }).catch(function (err) {
                  console.info(err);
               })
               console.log(tab.name);
            }
            //楼层设置
            else if(tab.name === 'second'){
              //that.flagopenwin = tab.name;
              let url = 'http://'+that.url+'/room/get_roomfloor_list/';
              that.$axios({
                method : 'get',
                url : url,
                params:{
                  page : that.currentPage,
                  page_size : 10
                }
              }).then(function (res) {
                console.info(res);
                that.tableDataRoomFloor = res.data.data.results;
                that.total = res.data.data.count;
              }).catch(function (err) {
                console.info(err);
              })
            }else if(tab.name === 'third'){
              that.flagopenwin = tab.name;
              let url = 'http://'+that.url+'/room/get_roomtype_list/';
              that.$axios({
                method : 'get',
                url : url,
                params:{
                  page : that.currentPage,
                  page_size : 10
                }
              }).then(function (res) {
                console.info(res);
                that.tableDataRoomSet = res.data.data.results;
                that.total = res.data.data.count;
              }).catch(function (err) {
                console.info(err);
              })
            }else if(tab.name === 'fourth'){
              that.flagopenwin = tab.name;
              let url = 'http://'+that.url+'/room/get_roomclass_list/';
              that.$axios({
                method : 'get',
                url : url,
                params:{
                  page : that.currentPage,
                  page_size : 10
                }
              }).then(function (res) {
                console.info(res);
                that.tableDataRoomType = res.data.data.results;
                that.total = res.data.data.count;
              }).catch(function (err) {
                console.info(err);
              })
            }else if(tab.name === 'fifth'){
              that.flagopenwin = tab.name;
              let url = 'http://'+that.url+'/room/get_roomfeatures_list/';
              that.$axios({
                method : 'get',
                url : url,
                params:{
                  page : that.currentPage,
                  page_size : 10
                }
              }).then(function (res) {
                console.info(res);
                that.tableDataRoomTrait = res.data.data.results;
                that.total = res.data.data.count;
              }).catch(function (err) {
                console.info(err);
              })
            }else if(tab.name === 'six'){
              that.flagopenwin = tab.name;
              let url = 'http://'+that.url+'/room/get_roomnumber_list/';
              that.$axios({
                method : 'get',
                url : url,
                params:{
                  page : that.currentPage,
                  page_size : 10
                }
              }).then(function (res) {
                console.info(res);
                that.tableDataRoomNum = res.data.data.results;
                that.total = res.data.data.count;
              }).catch(function (err) {
                console.info(err);
              })
            }else{
                that.flagopenwin = tab.name;
                that.$message({
                  message: "接口飞速编码中...",
                  type: 'success'
                });
                console.info("该选项暂未开放！")
            }
          },
          /**
           * 该函数只做隐藏的操作，不做显示的操作，原因是每一个页面的隐藏都是需要将遮罩层取消的。
           * @SetMaskFalseShow 控制遮罩层隐藏，根据flagopenwin来判断当前是属于哪一个页面的关闭
           * @param no
           */
          SetMaskFalseShow:function(){
              let that = this;
              that.maskShow = false;
              if(that.flagopenwin == 'first'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'second'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'third'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'fourth'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'fifth'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'six'){
                console.info('当前点击的是'+that.flagopenwin);
              }else{
                console.info('当前点击的是'+that.flagopenwin);
              }
          },
          //==================分页操作===============================
          /**
           * 分页-楼栋的分页
           * @handleSizeChange 控制每页显示多少条数据的函数 当前该功能未开放
           * @handleCurrentChangeLd 控制当前的页数
           * @param currentPage 当前的页码
           */
          handleSizeChange : function(size){
            /*this.pagesize = size;
            console.info(size)*/
          },
          handleCurrentChangeLd : function (currentPage) {
            console.info(currentPage);
            let that = this;
            let url = 'http://'+that.url+'/room/get_room_building_list/';
            //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
            that.$axios({
              method : 'get',
              url : url,
              params:{
                page : currentPage,
                page_size : 10
              }
            }).then(function (res) {
              console.info(res.data.data.results);
              that.tableDataBuilding = res.data.data.results;
            }).catch(function (err) {
              console.info(err);
            })
          },
          /**
           * @handleCurrentChangeLc 楼层的分页
           */
          handleCurrentChangeLc : function(currentPage){
            console.info(currentPage);
            let that = this;
            let url = 'http://'+that.url+'/room/get_roomfloor_list/';
            that.$axios({
              method : 'get',
              url : url,
              params:{
                page : currentPage,
                page_size : 10
              }
            }).then(function (res) {
              console.info(res.data.data.results);
              that.tableDataRoomFloor = res.data.data.results;
            }).catch(function (err) {
              console.info(err);
            })
          },
          /**
           * @handleCurrentChangeFx 房型的分页
           */
          handleCurrentChangeFx : function(currentPage){
            console.info(currentPage);
            let that = this;
            let url = 'http://'+that.url+'/room/get_roomtype_list/';
            //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
            that.$axios({
              method : 'get',
              url : url,
              params:{
                page : currentPage,
                page_size : 10
              }
            }).then(function (res) {
              console.info(res.data.data.results);
              that.tableDataRoomSet = res.data.data.results;
            }).catch(function (err) {
              console.info(err);
            })
          },
          /**
           * @handleCurrentChangeFl 房间分类的分页
           */
          handleCurrentChangeFl : function(currentPage){
            console.info(currentPage);
            let that = this;
            let url = 'http://'+that.url+'/room/get_roomclass_list/';
            //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
            that.$axios({
              method : 'get',
              url : url,
              params:{
                page : currentPage,
                page_size : 10
              }
            }).then(function (res) {
              console.info(res.data.data.results);
              that.tableDataRoomType = res.data.data.results;
            }).catch(function (err) {
              console.info(err);
            })
          },
          /**
           * @handleCurrentChangeTrite 房间特征的分页
           */
          handleCurrentChangeTrite : function(currentPage){
            console.info(currentPage);
            let that = this;
            let url = 'http://'+that.url+'/room/get_roomfeatures_list/';
            //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
            that.$axios({
              method : 'get',
              url : url,
              params:{
                page : currentPage,
                page_size : 10
              }
            }).then(function (res) {
              console.info(res.data.data.results);
              that.tableDataRoomTrait = res.data.data.results;
            }).catch(function (err) {
              console.info(err);
            })
          },
          /**
           * @handleCurrentChangeRoomNum 房间号（房间信息）的分页
           */
          handleCurrentChangeRoomNum : function(currentPage){
            console.info(currentPage);
            let that = this;
            let url = 'http://'+that.url+'/room/get_roomnumber_list/';
            //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
            that.$axios({
              method : 'get',
              url : url,
              params:{
                page : currentPage,
                page_size : 10
              }
            }).then(function (res) {
              console.info(res.data.data.results);
              that.tableDataRoomNum = res.data.data.results;
            }).catch(function (err) {
              console.info(err);
            })
          },
          //===================删除操作==============================
          /**
           * 删除操作-楼栋
           * @handleDeleteLd 删除楼栋的操作
           * @param index 当前的行数
           * @param row 当前行的数据  为了拿到id 进行删除
           * @param TableData 当前被渲染的表格
           */
          handleDeleteLd : function (index,row,TableData) {
            let that = this;
            let url = 'http://'+that.url+'/room/remove_room_building/'+row.id+'/';
            that.$axios({
                  method : 'post',
                  url : url
            }).then(function (res) {
               console.info(res);
               TableData.splice(index, 1);
               that.$message({
                message: that.hint,
                type: 'success'
               });
            }).catch(function (err) {
              console.info(err);
            })
            console.info(index,row.id);
          },
          /**
           * 删除操作-楼层
           * @handleDeleteLc 楼层的删除
           * @param index 当前的行数
           * @param row 当前行的数据
           * @param TableData 当前被渲染的表格  为了做假删除
           */
          handleDeleteLc : function(index,row,TableData){
            let that = this;
            let url = 'http://'+that.url+'/room/remove_roomfloor/'+row.id+'/';
            that.$axios({
              method : 'post',
              url : url
            }).then(function (res) {
              console.info(res);
              TableData.splice(index, 1);
              that.$message({
                message: that.hint,
                type: 'success'
              });
            }).catch(function (err) {
              console.info(err);
            })
            console.info(index,row.id);
          },
          /**
           * 删除操作-房型
           * @handleDeleteFx 房型的删除
           * @param index 当前的行数
           * @param row 当前行的数据
           * @param TableData 当前被渲染的表格
           */
          handleDeleteFx : function (index,row,TableData) {
            let that = this;
            let url = 'http://'+that.url+'/room/remove_roomtype/'+row.id+'/';
            that.$axios({
              method : 'post',
              url : url
            }).then(function (res) {
              console.info(res);
              TableData.splice(index, 1);
              that.$message({
                message: that.hint,
                type: 'success'
              });
            }).catch(function (err) {
              console.info(err);
            })
            console.info(index,row.id);
          },
          /**
           * 删除操作-房类
           * @handleDeleteFl 房型的删除
           * @param index 当前的行数
           * @param row 当前行的数据
           * @param TableData 当前被渲染的表格
           */
          handleDeleteFl : function (index,row,TableData) {
            let that = this;
            let url = 'http://'+that.url+'/room/remove_roomclass/'+row.id+'/';
            that.$axios({
              method : 'post',
              url : url
            }).then(function (res) {
              console.info(res);
              TableData.splice(index, 1);
              that.$message({
                message: that.hint,
                type: 'success'
              });
            }).catch(function (err) {
              console.info(err);
            })
            console.info(index,row.id);
          },
          /**
           * 删除操作-房间特征
           * @handleDeleteFl 房类的删除
           * @param index 当前的行数
           * @param row 当前行的数据
           * @param TableData 当前被渲染的表格
           */
          handDeleteTrait : function (index,row,TableData) {
            let that = this;
            let url = 'http://'+that.url+'/room/remove_roomfeatures/'+row.id+'/';
            that.$axios({
              method : 'post',
              url : url
            }).then(function (res) {
              console.info(res);
              TableData.splice(index, 1);
              that.$message({
                message: that.hint,
                type: 'success'
              });
            }).catch(function (err) {
              console.info(err);
            })
            console.info(index,row.id);
          },
          /**
           * 删除操作-房间号
           * @handleDeleteFl 房间号的删除
           * @param index 当前的行数
           * @param row 当前行的数据
           * @param TableData 当前被渲染的表格
           */
          handDeleteRoomNum : function (index,row,TableData) {
            let that = this;
            let url = 'http://'+that.url+'/room/remove_roomnumber/'+row.id+'/';
            that.$axios({
              method : 'post',
              url : url
            }).then(function (res) {
              console.info(res);
              TableData.splice(index, 1);
              that.$message({
                message: that.hint,
                type: 'success'
              });
            }).catch(function (err) {
              console.info(err);
            })
            console.info(index,row.id);
          },
          //===================编辑操作===============================
          /**
           * @EditeInfoLd 编辑楼栋的信息
           * @param  rows
           */
          EditeInfoLd : function(rows){
              let that = this;
              console.info(rows);
              let is_halt = rows.is_halt ? '1' : '0';
              //这里将一个是否编辑的操作改为true 重置当前的isEdite
              that.isEdite = true;
              that.comEdite = rows,
              that.param.code = rows.code,
              that.param.code_name = rows.code_name,
              that.param.create_user = rows.create_user,
              that.param.descript = rows.descript,
              that.param.descript_en = rows.descript_en,
              that.param.hotel_group_id = rows.hotel_group_id,
              that.param.hotel_id = rows.hotel_id,
              that.param.list_order = rows.list_order,
              that.param.modify_user = rows.modify_user,
              that.param.building_name = rows.building_name,
              that.param.is_halt = is_halt,
              that.param.parent_code = rows.parent_code
          },
          /**
           * @EditeInfoLc 编辑楼层的信息
           * @param  rows
           */
          EditeInfoLc : function(rows){
            let that = this;
            let is_halt = rows.is_halt ? '1' : '0';
            that.isEdite = true;
            that.comEdite = rows,
              that.param.code = rows.code,
              that.param.code_name = rows.code_name,
              that.param.create_user = rows.create_user,
              that.param.descript = rows.descript,
              that.param.descript_en = rows.descript_en,
              that.param.list_order = rows.list_order,
              that.param.modify_user = rows.modify_user,
              that.param.building_name = rows.building_name,
              that.param.is_halt = is_halt,
              that.param.number = rows.number,
              that.param.hotel_id = rows.hotel_id//该字段不是必传项，但是没有的话就检索不到！
            //picture : that.param.picture,
          },
          /**
           * @EditeInfoFx 编辑房型的信息
           * @param  rows
           */
          EditeInfoFx : function(rows){
            console.info(rows);
            let that = this;
            let is_halt = rows.is_halt ? '1' : '0';
            let is_hour_room = rows.is_hour_room ? '1' : '0';
            let is_overbooking = rows.is_overbooking ? '1' : '0';
            let is_selfmachine_use = rows.is_selfmachine_use ? '1' : '0';
            that.isEdite = true;
            that.comEdite = rows,
              that.param.code = rows.code,
              that.param.code_name = rows.code_name,
              that.param.create_user = rows.create_user,
              that.param.descript = rows.descript,
              that.param.descript_en = rows.descript_en,
              that.param.list_order = rows.list_order,
              that.param.room_type_name = rows.room_type_name,
              that.param.room_type_name_en = rows.room_type_name_en,
              that.param.is_halt = is_halt,
              that.param.short_name = rows.short_name,
              that.param.area = rows.area,
              that.param.bed_num = rows.bed_num,
              that.param.bed_type = rows.bed_type,
              that.param.modify_user = rows.modify_user,
              //that.dialogImageUrl = rows.dialogImageUrl,
              that.param.is_overbooking = is_overbooking,
              that.param.overbokking_number = rows.overbokking_number,
              that.param.is_hour_room = is_hour_room,
              that.param.is_selfmachine_use = is_selfmachine_use,
              that.param.max_checkin_num = rows.max_checkin_num
          },
          /**
           * @EditeInfoFl 编辑房类的信息
           * @param  rows
           */
          EditeInfoFl : function(rows){
            let that = this;
            let is_halt = rows.is_halt ? '1' : '0';
            that.isEdite = true;
            that.comEdite = rows,
              that.param.code = rows.code,
              that.param.code_name = rows.code_name,
              that.param.create_user = rows.create_user,
              that.param.descript = rows.descript,
              that.param.descript_en = rows.descript_en,
              that.param.hotel_group_id = rows.hotel_group_id,
              that.param.hotel_id = rows.hotel_id,
              that.param.is_halt = is_halt,
              that.param.list_order = rows.list_order,
              that.param.modify_user = rows.modify_user,
              that.param.room_class_name = rows.room_class_name
          },
          /**
           * @EditeInfoTrait 编辑房间特征的信息
           * @param  rows
           */
          EditeInfoTrait : function(rows){
            let that = this;
            let is_halt = rows.is_halt ? '1' : '0';
            that.isEdite = true;
            that.comEdite = rows,
              that.param.code = rows.code,
              that.param.code_name = rows.code_name,
              that.param.create_user = rows.create_user,
              that.param.descript = rows.descript,
              that.param.descript_en = rows.descript_en,
              that.param.hotel_group_id = rows.hotel_group_id,
              that.param.hotel_id = rows.hotel_id,
              that.param.is_halt = is_halt,
              that.param.list_order = rows.list_order,
              that.param.modify_user = rows.modify_user,
              that.param.feature_name = rows.feature_name,
              that.param.feature_en = rows.feature_en
          },
          /**
           * @EditeInfoRoomNum 编辑房间号的信息
           * @param  rows
           */
          EditeInfoRoomNum : function(rows){
            let that = this;
            let is_halt = rows.is_halt ? '1' : '0';
            let self_machine_can_sale = rows.self_machine_can_sale ? '1' : '0';
            that.isEdite = true;
            that.comEdite = rows,
              that.param.code = rows.code,
              that.param.code_name = rows.code_name,
              that.param.create_user = rows.create_user,
              that.param.descript = rows.descript,
              that.param.descript_en = rows.descript_en,
              that.param.hotel_group_id = rows.hotel_group_id,
              that.param.hotel_id = rows.hotel_id,
              that.param.is_halt = is_halt,
              that.param.list_order = rows.list_order,
              that.param.modify_user = rows.modify_user,
              that.param.room_number_id = rows.room_number_id,
              that.param.building_name = rows.building_name,
              that.param.room_number_guest = rows.room_number_guest,
              that.param.room_number_inner = rows.room_number_inner,
              that.param.room_number_guest_en = rows.room_number_guest_en,
              that.param.room_number_inner_en = rows.room_number_inner_en,
              that.param.room_class_name = rows.room_class_name,
              that.param.room_type_name = rows.room_type_name,
              that.param.feature_name = rows.feature_name,
              that.param.self_machine_can_sale = self_machine_can_sale,
              that.param.room_num_state = rows.room_num_state,
              that.param.room_phone = rows.room_phone,
              that.param.room_phone_short = rows.room_phone_short,
              that.param.room_no = rows.room_no,
              that.param.floor_number = rows.floor_number
          },
          //===================新增操作===============================
          /**
           * @openWinLd 打开楼栋的遮罩层  根据flagopenwin来判断当前是属于哪一个页面的打开
           * @param no
           */
          SetMaskTrueShow : function(){
              let that = this;
              if(that.flagopenwin == 'first'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'second'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'third'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'fourth'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'fifth'){
                console.info('当前点击的是'+that.flagopenwin);
              }else if(that.flagopenwin == 'six'){
                console.info('当前点击的是'+that.flagopenwin);
              }else{
                console.info('当前点击的是'+that.flagopenwin);
              }
          },
          /**
           * @saveInfoLd 新增楼栋的操作
           * @param no
           * @isEdit  判断一个当前的值是不是新增  true为编辑  false为新增
           * @urlData 当前的url是属于编辑还是新增的的操作
           */
          saveInfoLd : function () {
            let that = this;
            //如果isEdite为false就是进行新增操作
            let urlData = that.isEdite ? 'http://'+that.url+'/room/update_room_building/'+that.comEdite.id+'/' : 'http://'+that.url+'/room/add_room_building/';
            if(that.param.code && that.param.code_name && that.param.descript && that.param.descript_en && that.param.list_order && that.param.parent_code){
              that.$axios({
                method : 'post',
                url : urlData,
                data : {
                  code : that.param.code,
                  code_name : that.param.code_name,
                  create_user : that.param.create_user,
                  descript : that.param.descript,
                  descript_en : that.param.descript_en,
                  hotel_group_id : that.param.hotel_group_id,
                  hotel_id : that.param.hotel_id,
                  list_order : that.param.list_order,
                  modify_user : that.param.modify_user,
                  building_name : that.param.building_name,
                  is_halt : that.param.is_halt,
                  parent_code : that.param.parent_code,
                }
              }).then(function (res) {
                that.dialogVisibleLd = false;
                console.info(res);
              }).catch(function (err) {
                console.info(err);
              })
            }else{
              that.$message({
                message: '*为必填项！',
                type: 'warning'
              });
            }
          },
          /**
           * @saveInfoLc 新增楼层的操作
           * @param no
           */
          saveInfoLc : function () {
            let that = this;
            let urlData=that.isEdite ? 'http://'+that.url+'/room/update_roomfloor/'+that.comEdite.id+'/' : 'http://'+that.url+'/room/add_roomfloor/';
            if(that.param.code && that.param.code_name && that.param.descript && that.param.descript_en && that.param.list_order && that.param.building_name && that.param.number){
              that.$axios({
                method : 'post',
                url : urlData,
                data : {
                  code : that.param.code,
                  code_name : that.param.code_name,
                  create_user : that.param.create_user,
                  descript : that.param.descript,
                  descript_en : that.param.descript_en,
                  list_order : that.param.list_order,
                  modify_user : that.param.modify_user,
                  building_name : that.param.building_name,
                  is_halt : that.param.is_halt,
                  number: that.param.number,
                  hotel_id : that.param.hotel_id,//该字段不是必传项，但是没有的话就检索不到！
                  //picture : that.param.picture,
                }
              }).then(function (res) {
                that.dialogVisibleLc = false;
                that.hintInfo("success");
                console.info(res);
              }).catch(function (err) {
                 that.$message({
                  message: err.message,
                  type: 'warning'
                 });
              })
            }else{
              that.hintInfo("warning");
            }
          },
          /**
           * @saveInfoFx 新增房型的操作
           * @param no
           * @explain room_type_name 唯一的
           */
          saveInfoFx : function () {
            let that = this;
            let urlData = that.isEdite ? 'http://'+that.url+'/room/update_roomtype/'+that.comEdite.id+'/' : 'http://'+that.url+'/room/add_roomtype/';
            if(that.param.code && that.param.code_name && that.param.descript && that.param.descript_en && that.param.is_halt && that.param.list_order){
              that.$axios({
                method : 'post',
                url : urlData,
                data : {
                  code : that.param.code,
                  code_name : that.param.code_name,
                  create_user : that.param.create_user,
                  descript : that.param.descript,
                  descript_en : that.param.descript_en,
                  hotel_group_id : that.param.hotel_group_id,
                  hotel_id : that.param.hotel_id,
                  is_halt : that.param.is_halt,
                  list_order : that.param.list_order,
                  modify_user : that.param.modify_user,
                  room_type_name : that.param.room_type_name,
                  room_type_name_en : that.param.room_type_name_en,
                  short_name : that.param.short_name,
                  area : that.param.area,
                  bed_num : that.param.bed_num,
                  bed_type : that.param.bed_type,
                  //picture : that.param.picture,
                  is_overbooking : that.param.is_overbooking,
                  overbokking_number : that.param.overbokking_number,
                  max_checkin_num : that.param.max_checkin_num,
                  is_hour_room : that.param.is_hour_room,
                  is_selfmachine_use : that.param.is_selfmachine_use,
                }
              }).then(function (res) {
                that.dialogVisibleFx = false;
                that.hintInfo("success");

                console.info(res);
              }).catch(function (err) {
                console.info(err);
              })
            }else{
              that.hintInfo("warning");
            }
          },
          /**
           * @saveInfoFl 新增房类设置的操作
           * @param no
           */
          saveInfoFl : function () {
            let that = this;
            let urlData = that.isEdite ? 'http://'+that.url+'/room/update_roomclass/'+that.comEdite.id+'/' : 'http://'+that.url+'/room/add_roomclass/';
            if(that.param.code && that.param.code_name && that.param.descript && that.param.descript_en && that.param.is_halt && that.param.list_order && that.param.room_class_name){
               that.$axios({
                 method : 'post',
                 url : urlData,
                 data : {
                   code : that.param.code,
                   code_name : that.param.code_name,
                   create_user : that.param.create_user,
                   descript : that.param.descript,
                   descript_en : that.param.descript_en,
                   hotel_group_id : that.param.hotel_group_id,
                   hotel_id : that.param.hotel_id,
                   is_halt : that.param.is_halt,
                   list_order : that.param.list_order,
                   modify_user : that.param.modify_user,
                   room_class_name : that.param.room_class_name
                 }
               }).then(function (res) {
                  that.dialogVisibleFl = false;
                  that.hintInfo("success");
                  console.info(res);
               }).catch(function (err) {
                  console.info(err);
               })
            }else{
              that.hintInfo("warning");
            }
          },
          /**
           * @saveInfoTrait 新增房类特征的操作
           * @param no
           */
          saveInfoTrait : function () {
            /*that.param.code && that.param.code_name && that.param.descript && that.param.descript_en
            && that.param.is_halt && that.param.list_order && that.param.feature && that.param.feature_en*/
            let that = this;
            let urlData = that.isEdite ? 'http://'+that.url+'/room/update_roomfeatures/'+that.comEdite.id+'/' : 'http://'+that.url+'/room/add_roomfeatures/';
              that.$axios({
                method:'post',
                url : urlData,
                data : {
                  code : that.param.code,
                  code_name : that.param.code_name,
                  create_user : that.param.create_user,
                  descript : that.param.descript,
                  descript_en : that.param.descript_en,
                  hotel_group_id : that.param.hotel_group_id,
                  hotel_id : that.param.hotel_id,
                  is_halt : that.param.is_halt,
                  list_order : that.param.list_order,
                  modify_user : that.param.modify_user,
                  feature_name : that.param.feature_name,
                  feature_en : that.param.feature_en,
                }
              }).then(function (res) {
                that.dialogVisibleTrait = false;
                that.hintInfo("success");
                console.info(res);
              }).catch(function (err) {
                console.info(err);
              })
          },
          /**
           * @saveInfoRoomNum 新增一个房号
           * @param no
           * dialogVisibleRoomNum
           */
          saveInfoRoomNum : function(){
           /* that.param.code && that.param.code_name && that.param.descript && that.param.descript_en && that.param.is_halt
            && that.param.list_order && that.param.room_number_id && that.param.building_name && that.param.room_number_guest
            && that.param.room_number_inner && that.param.room_number_guest_en && that.param.room_number_inner_en && that.param.room_class_name
            && that.param.feature_en && that.param.feature_name && that.param.self_machine_can_sale && that.param.room_num_state
            && that.param.room_phone && that.param.room_phone_short*/
               let that = this;
               let urlData = that.isEdite ? 'http://'+that.url+'/room/update_roomnumber/'+that.comEdite.id+'/' : 'http://'+that.url+'/room/add_roomnumber/';
               console.info(that.param.room_class_name);
                 that.$axios({
                   method : 'post',
                   url : urlData,
                   data : {
                     code : that.param.code,
                     code_name : that.param.code_name,
                     create_user : that.param.create_user,
                     descript : that.param.descript,
                     descript_en : that.param.descript_en,
                     hotel_group_id :that.param.hotel_group_id,
                     hotel_id : that.param.hotel_id,
                     is_halt : that.param.is_halt,
                     list_order : that.param.list_order,
                     modify_user : that.param.modify_user,
                     room_number_id : that.param.room_number_id,
                     building_name : that.param.building_name,
                     room_number_guest : that.param.room_number_guest,
                     room_number_inner : that.param.room_number_inner,
                     room_number_guest_en : that.param.room_number_guest_en,
                     room_number_inner_en : that.param.room_number_inner_en,
                     room_class_name : that.param.room_class_name,
                     room_type_name : that.param.room_type_name,
                     feature_name : that.param.feature_name,
                     self_machine_can_sale : that.param.self_machine_can_sale,
                     room_num_state : that.param.room_num_state,
                     room_phone : that.param.room_phone,
                     room_phone_short : that.param.room_phone_short,
                     room_no : that.param.room_no,
                     floor_number : that.param.floor_number,
                   }
                 }).then(function (res) {
                    console.info(res)
                    that.hintInfo("success");
                    that.dialogVisibleRoomNum = false;
                 }).catch(function (err) {
                    console.info(err);
                 })

          },
        }
    }
</script>

<style lang="less" scoped>
  .site-all{
    width: 94%;
    margin-left: 10px;
    margin-top: 10px;
    .code-top {
      height: 40px;
      line-height: 40px;
      i {
        color: #777777;
        font-size: x-large;
      }
      label {
        position: absolute;
        margin-top: -3px;
        margin-left: 5px;
        font-size: small;
        color: #777777;
      }
    }
    .tab{
      .setbtn{
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #4488E9;
        border: none;
        border-radius: 4px;
        color: #ffffff;
      }
    }
    .dialog-style{
       ul{
          li{
            margin-top: 10px;
            span{
               display: inline-block;
               width: 140px;
               text-align: right;
            }
            input{
              height: 27px;
              width: 200px;
              margin-left: 10px;
              border: 1px solid #cccccc;
              border-radius: 4px;
            }
            label{
              margin-left: 10px;
            }
          }
       }
      button{
        width: 80px;
        height: 30px;
        background: #4488E9;
        border: none;
        color: #ffffff;
        line-height: 30px;
        border-radius: 4px;
      }
    }
  }
  //遮罩层样式
  .mask{
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(7, 13, 32, 0.6);
      top: 0;
      left: 0;
      z-index: 900;
    //控制房间类型的样式

    //控制房间的样式
    .mask-room{
    }
  }
</style>
