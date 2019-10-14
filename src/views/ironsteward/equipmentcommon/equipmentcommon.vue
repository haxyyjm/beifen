<template>
    <!--设备类型-->
    <div class="ironsteward">
        <el-container>
            <!--左侧-->
            <el-aside  class="left"  style="width: 260px;  background-color: #fff;" >
                <span class="listStyle">酒店编号: <span>001</span></span>
                <div class="t-info">
                    皇冠晶品酒店
                </div>
                <div class="listStyle">
                    公共设备列表:
                </div>
                <div class="listStyle">
                    热水系统:
                </div>
                <div class="listStyle">
                    监控系统:
                    <el-tree :data="treeData" ref="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
                <div class="listStyle">
                    消防系统:
                </div>
            </el-aside>
        <!--右侧-->
            <el-main  class="right">
                <el-tabs v-model="activeName" type = "card" @tab-Click="handleClick">
                    <el-tab-pane label="中央空调" name="first"></el-tab-pane>
                    <el-tab-pane label="热水系统" name="second"></el-tab-pane>
                    <el-tab-pane label="梯控系统" name="third">
                        <el-card class="box-card">
                            <el-button @click="t_addAndUpdateDialog = true; handleControlAdd()" type="primary" >添加</el-button>
                            <!--梯控系统table-->
                            <el-table :data="t_controlData"  :header-cell-style="{background:'#68819E', color: '#FFFFFF'}" style="width: 100%; margin-top: 10px">
                                <el-table-column prop="hotel_id" label="酒店ID"></el-table-column>
                                <el-table-column prop="descript" label="酒店描述"></el-table-column>
                                <el-table-column prop="is_halt" label="是否停用">
                                     <template slot-scope="scope">
                                        <span v-if="scope.row.is_halt === false">停用</span>
                                        <span v-else>启用</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="device_serial" label="设备序列号"></el-table-column>
                                <el-table-column prop="device_name" label="设备名称"></el-table-column>
                                <el-table-column prop="modify_date" :formatter="dateFormat" label="更新时间"></el-table-column>
                                <el-table-column label="操作" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button @click="deleteControlCamera(scope.row)" type="text" size="small">删除</el-button>
                                        <el-button @click="addAndUpdate = false; t_addAndUpdateDialog = true; handleControlInfo(scope.row)" type="text" size="small">修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="getTcontrolData"
                                :current-page="currentPage"
                                :page-size="pagesize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>  
                        </el-card>
                        <!-- 添加/更新梯控系统 -->
                        <el-dialog class="houseTypeClass" width="50%"  :title="controlTitle" :visible.sync="t_addAndUpdateDialog" :close-on-click-modal="false">
                            <div style="height: 500px;">
                                <!-- <el-form :inline="true"   :model="t_param" class="demo-form-inline">
                                    <el-form-item label="代码">
                                        <el-input style="width: 260px" v-model="t_param.code"  placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="代码名称">
                                        <el-input style="width: 260px" v-model="t_param.code_name" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="创建者">
                                        <el-input style="width: 260px" v-model="t_param.create_user" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="中文描述">
                                        <el-input style="width: 260px" v-model="t_param.descript" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="英文描述">
                                        <el-input style="width: 260px" v-model="t_param.descript_en" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="集团id">
                                        <el-input style="width: 260px" v-model="t_param.hotel_id" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="酒店id">
                                        <el-input style="width: 260px" v-model="t_param.hotel_group_id" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                     <el-form-item label="是否停用">
                                        <el-switch
                                            style="width: 260px"
                                            v-model="t_param.is_halt"
                                            active-color="#13ce66"
                                            active-value="1"
                                            inactive-value="0"
                                            @change="getValue"
                                            inactive-color="#EAECF0">
                                        </el-switch>
                                    </el-form-item>
                                    <el-form-item label="排序">
                                        <el-input style="width: 260px" v-model="t_param.list_order" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="更新用户">
                                        <el-input style="width: 260px" v-model="t_param.modift_user" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备序列号">
                                        <el-input style="width: 260px" v-model="t_param.device_serial" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备名称">
                                        <el-input style="width: 260px" v-model="t_param.device_name" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备激活状态">
                                        <el-input style="width: 260px" v-model="t_param.activate_state" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="设备版本号">
                                        <el-input style="width: 260px" v-model="t_param.device_version" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="软件版本">
                                        <el-input style="width: 260px" v-model="t_param.software_version" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="硬件版本">
                                        <el-input style="width: 260px" v-model="t_param.hardware_version" placeholder="请输入内容"></el-input>
                                    </el-form-item>
                                    <el-form-item label="平面位置">
                                        <el-input style="width: 260px" v-model="t_param.position" placeholder="请输入内容"></el-input>
                                    </el-form-item> -->
                                <!-- </el-form> -->
                                <ul>
                                    <li><span>*代码:</span><input v-model="t_param.code" maxlength="9"/><span>*代码名称:</span><input v-model="t_param.code_name"/></li>
                                    <li><span>创建者:</span><input v-model="t_param.create_user"/><span>*中文描述:</span><input v-model="t_param.descript"/></li>
                                    <li><span>*英文描述:</span><input v-model="t_param.descript_en"/><span>集团ID:</span><input v-model="t_param.hotel_group_id" type="number"/></li>
                                    <li><span>酒店ID:</span><input v-model="t_param.hotel_id" type="number"/><span>*排序:</span><input v-model="t_param.list_order" type="number"/></li>
                                    <li><span>更新用户:</span><input v-model="t_param.modify_user"/><span>*设备序列号:</span><input v-model="t_param.device_serial"/></li>
                                    
                                    <li><span>软件版本:</span><input v-model="t_param.software_version"/><span>*硬件版本:</span><input v-model="t_param.hardware_version"/></li>
                                    
                                    <li><span>设备名称:</span><input v-model="t_param.device_name"/><span>*设备激活状态:</span><input v-model="t_param.activate_state"/></li>
                                    <li><span>设备版本号:</span><input v-model="t_param.building_name"/></li>
                                    <li>
                                        <span>*是否停用:</span>
                                        <el-radio v-model="t_param.is_halt" label='1'>是</el-radio>
                                        <el-radio v-model="t_param.is_halt" label='0'>否</el-radio>
                                    </li>
                                    <li>
                                        <span>*平面位置:</span>
                                        <!-- <el-input style="width: 260px" v-model="t_param.position" placeholder="请输入内容"></el-input> -->
                                  
                                    </li>
                                </ul>
                            </div>
                            <div style="margin-top: 60px">
                                <el-button @click="t_addAndUpdateDialog = false"   type = 'primary'>取消</el-button>
                                <el-button style="float: right;" @click="t_addAndUpdateCamera()"   type = 'primary'>确定</el-button>
                            </div>
                        </el-dialog>
                    </el-tab-pane>
                     <!--监控系统tab-pane---------------------------pane-------------------->
                    <el-tab-pane label="监控系统" name="fourth">
                        <el-card class="box-card">
                            <el-button @click="addDialog = true; handleAdd()" type="primary" >添加</el-button>
                            <el-button @click="getCameraList()" type="primary" >查询</el-button>
                            <!-- <el-button @click="openLive()" type="primary" >开启直播功能</el-button>
                            <el-button @click="closeLive()" type="primary" >关闭直播功能</el-button> -->
                            <el-row style="height: 10px"></el-row>
                            <!--监控系统table-->
                            <el-table :data="j_controlData" @selection-change="handleSelectionChange" height="400"  :header-cell-style="{background:'#68819E', color: '#FFFFFF'}" style="width: 100%">
                                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                                <el-table-column prop="hotel_id" label="酒店ID"></el-table-column>
                                <el-table-column prop="camera_no" label="设备编号"></el-table-column>
                                <el-table-column prop="device_name" label="设备名称"></el-table-column>
                                <el-table-column prop="zone" label="区域"></el-table-column>
                                <el-table-column prop="is_live_open" label="直播功能">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.is_live_open === 0">关闭</span>
                                        <span v-else>开启</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="floor" label="楼层"></el-table-column>
                                <el-table-column prop="device_serial" label="设备序列号"></el-table-column>
                                <el-table-column prop="modify_date" :formatter="dateFormat" label="更新时间"></el-table-column>
                                <el-table-column label="操作" fixed="right" width="300">
                                    <template slot-scope="scope">
                                        <el-button @click="settingDialog = true;activeName_name='0'; handleSetting(scope.row)" type="text" size="small">管理/配置</el-button>
                                        <el-button v-if="scope.row.is_live_open === 0" @click="openAndCloseLive(scope.row)" type="text" size="small">开启直播</el-button>
                                        <el-button v-else @click="openAndCloseLive(scope.row)" type="text" size="small">关闭直播</el-button>
                                        <el-button @click="infoDialog = true; handleInfo(scope.row)" type="text" size="small">修改</el-button>
                                        <!-- <el-button @click="deleteCamera(scope.row)" type="text" size="small">删除</el-button> -->
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="getCameraList"
                                :current-page="currentPage"
                                :page-size="pagesize"
                                layout="total, prev, pager, next, jumper"
                                :total="j_controlTotal">
                            </el-pagination>
                            <!-- 告警信息table -->
                            <!-- <el-row>
                                <div style="float: right;margin-top: 20px;margin-bottom: 20px ">
                                    <span style="font-size: 16px;padding-left:5px;">告警状态</span>
                                    <el-select v-model="status" placeholder="全部"  style="width: 100px">
                                        <el-option v-for="item in statuss" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>                    
                                    <span style="font-size: 16px;padding-left:5px;">设备列表</span>
                                    <el-select v-model="device_flag" placeholder="全部"  style="width: 100px">
                                        <el-option label="全部" value="0">
                                        </el-option>
                                        <el-option v-for="item in camerList" :key="item.id" :label="item.device_name" :value="item.id">
                                        </el-option>
                                    </el-select>                                   
                                    <span  style="font-size: 16px;padding-left:5px">时间筛选</span>
                                        <el-date-picker  value-format="timestamp" v-model="data_value1" type="datetime" placeholder="选择日期">
                                        </el-date-picker>
                                        <span>~</span>
                                        <el-date-picker  value-format="timestamp" v-model="data_value2" type="datetime" placeholder="选择日期">
                                        </el-date-picker>           
                                        <el-button type="primary" class="" @click="getAlarmData" icon="search">查询
                                        </el-button>         
                                    </div>
                                    <div class="clear"></div>
                            </el-row> -->
                            <!-- 告警信息table -->
                            <!-- <el-table :data="alarmData" height="400"  :header-cell-style="{background:'#68819E', color: '#FFFFFF'}" style="width: 100%;">
                                <el-table-column type="index" label="序号"></el-table-column>
                                <el-table-column prop="alarmName" label="告警源名称"></el-table-column>
                                <el-table-column prop="alarmType" label="告警类型"></el-table-column>
                                <el-table-column prop="alarmTime" width="150" :formatter="dateFormat" label="告警时间"></el-table-column>
                                <el-table-column prop="channelNo" width="80" label="通道号"></el-table-column>
                                <el-table-column prop="deviceSerial" label="设备序列号"></el-table-column>
                                <el-table-column prop="relationAlarms" label="关联的告警消息"></el-table-column>
                                <el-table-column prop="customerType" label="透传设备参数类型"></el-table-column>
                                <el-table-column prop="customerInfo" label="透传设备参数内容"></el-table-column>
                                <el-table-column label="操作" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button @click="alarmInfoDialog = true; handleAlarmInfo(scope.row)" type="text" size="small">详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="getAlarmData"
                                :current-page="currentPage"
                                :page-size="pagesize"
                                layout="total, prev, pager, next, jumper"
                                :total="alarmTotal">
                            </el-pagination> -->
                            <el-dialog class="houseTypeClass" title="详情" :visible.sync="alarmInfoDialog" :close-on-click-modal="false">
                                <div style="height: 500px;">
                                    <div style="display: flex; justify-content: space-between">
                                        <!-- 左边div -->
                                        <div>
                                            <!-- 左边div inner-->
                                            <div style="display: flex; justify-content: space-between">
                                                <span>告警源名称:</span><span>{{alarmParam.alarmName}}</span>
                                            </div>
                                            <div class="inner_div_Style" >
                                                <span>告警类型:</span><span>{{alarmParam.alarmType}}</span>
                                             </div>
                                            <div class="inner_div_Style" >
                                                <span>是否加密:</span><span>{{alarmParam.isEncrypt}}</span>
                                             </div>
                                             <div class="inner_div_Style" >
                                                <span>是否已读:</span><span>{{alarmParam.isChecked}}</span>
                                             </div>
                                             <div class="inner_div_Style" >
                                                <span>存储类型:</span><span>{{alarmParam.recState}}</span>
                                             </div>
                                             <div class="inner_div_Style" >
                                                <span>预录时间:</span><span>{{alarmParam.preTime}}</span>
                                             </div>
                                             <div class="inner_div_Style" >
                                                <span>透传设备参数类型:</span><span>{{alarmParam.customerType}}</span>
                                             </div>
                                        </div>
                                        <!-- 右边div -->
                                        <div>
                                            <!-- 右边div inner-->
                                            <div  style="display: flex; justify-content: space-between">
                                                <span>告警时间:</span><span>{{alarmParam.alarmTime}}</span>
                                            </div>
                                            <div class="inner_div_Style" >
                                                <span>通道号:</span><span>{{alarmParam.channelNo}}</span>
                                             </div>
                                            <div class="inner_div_Style">
                                                <span>延迟录像时间:</span><span>{{alarmParam.delayTime}}</span>
                                             </div>
                                             <div class="inner_div_Style" >
                                                <span>设备序列号:</span><span>{{alarmParam.deviceSerial}}</span>
                                             </div>
                                             <div class="inner_div_Style" >
                                                <!-- <span>告警图片地址:</span><span>{{alarmParam.alarmPicUrl}}</span> -->
                                             </div>
                                             <div class="inner_div_Style" >
                                                <span>关联的告警消息:</span><span>{{alarmParam.relationAlarms}}</span>
                                             </div>
                                             <div class="inner_div_Style">
                                                <span>透传设备参数内容:</span><span>{{alarmParam.customerInfo}}</span>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>
                        </el-card>
                        <!--监控系统添加按钮弹出dialog-->   
                        <el-dialog class="houseTypeClass" width="50%" title="添加" :visible.sync="addDialog" :close-on-click-modal="false">
                            <div style="height: 300px">
                                <div class="add_divStyle">
                                    <div class="little-box">
                                        <span style="">设备序列号:&nbsp;</span>
                                        <el-input style="width: 15vw" v-model="param.device_serial" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="little-box">
                                        <span style="">设备验证码:&nbsp;</span>
                                        <el-input style="width: 15vw" v-model="param.validate_code" placeholder="请输入内容"></el-input>
                                    </div>
                                </div>
                                <div class="add_divStyle">
                                    <div class="little-box">
                                        <span style="">摄像头编号:&nbsp;</span>
                                        <el-input style="width: 15vw" v-model="param.camera_no" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="little-box">
                                        <span style="span_style">区域:&nbsp;</span>
                                        <el-select style="width: 15vw" v-model="param.zone" @focus="getFloor()" placeholder="请选择" > 
                                            <el-option
                                            v-for="(item,index) of this.floorList"
                                            :key="index"
                                            :label="item.zone"
                                            :value="item.zone">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add_divStyle">
                                    <div class="little-box">
                                        <span class="span_style">楼层:&nbsp;</span> 
                                        <el-select style="width: 15vw" v-model="param.floor"  @focus="getFloor()"  placeholder="请选择" > 
                                            <el-option
                                            v-for="(item,index) of floorList"
                                            :key="index"
                                            :label="item.descript"
                                            :value="item.descript">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="little-box">
                                        <!-- <span class="span_style">楼栋:&nbsp;</span> -->
                                        <!-- <el-input style="width: 15vw" v-model="param.building"  placeholder="请输入内容"></el-input> -->
                                        <span class="span_style">楼栋:&nbsp;</span> 
                                        <el-select style="width: 15vw" v-model="param.building" @focus="getBuilding()" placeholder="请选择" >
                                            <el-option
                                            v-for="item in buildingList"
                                            :key="item.id"
                                            :label="item.descript"
                                            :value="item.descript">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="add_divStyle">
                                    <div class="little-box">
                                        <span class="span_style">IP端口:&nbsp;</span>
                                        <el-input style="width: 15vw" v-model="param.local_ip" placeholder="请输入内容"></el-input>
                                    </div>
                                    <div class="little-box">
                                        <span class="span_style">位置描述:&nbsp;</span>
                                        <el-input style="width: 15vw" v-model="param.position_string" placeholder="请输入内容"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="addDialog = false"  type = 'primary'>取消</el-button>
                                <el-button @click="addCamera()" type = 'primary'>确定</el-button>
                            </div>
                        </el-dialog>
                        <!--监控系统配置按钮弹出dialog-->
                        <el-dialog class="houseTypeClass" @close="flushData();" title="配置/设置:" :visible.sync="settingDialog" :close-on-click-modal="false">
                            <el-tabs v-model="activeName_name" type="border-card" @tab-click="handleSettingClick">
                                <el-tab-pane label="配置摄像头" name ='0'>
                                    <div style="height: 400px">
                                        <div>
                                            设备布撤防
                                            <el-switch
                                                style="width: 260px"
                                                v-model="defence"
                                                active-color="#13ce66"
                                                active-value="1"
                                                inactive-value="0"
                                                @change="setDefence"
                                                inactive-color="#EAECF0">
                                            </el-switch>
                                        </div>
                                        <div>
                                            设备视频加密
                                            <el-switch
                                                style="width: 260px"
                                                v-model="encrypt"
                                                active-color="#13ce66"
                                                active-value="1"
                                                inactive-value="0"
                                                @change="setEncrypt"
                                                inactive-color="#EAECF0">
                                            </el-switch>
                                        </div>
                                        <div>
                                            设备下线通知
                                            <el-switch
                                                style="width: 260px"
                                                v-model="notify"
                                                active-color="#13ce66"
                                                active-value="1"
                                                inactive-value="0"
                                                @change="setNotify"
                                                inactive-color="#EAECF0">
                                            </el-switch>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="升级摄像头">
                                    <div style="height: 400px">
                                        <el-button @click="getUpgrade()" type="primary" >设备升级</el-button>
                                        <el-button @click="getVersion()" type="primary" >查询摄像头版本</el-button>
                                        <div v-if="showVersion">
                                            <el-row style="margin-top: 20px">最新版本: {{versionParam.latestVersion}}</el-row>
                                            <el-row style="margin-top: 20px">当前版本: {{versionParam.currentVersion}}</el-row>
                                            <el-row style="margin-top: 20px">是否需要升级: {{versionParam.isNeedUpgrade}}</el-row>
                                            <el-row style="margin-top: 20px">是否正在升级: {{versionParam.isUpgrading}}</el-row>
                                        </div>
                                        <!--设备升级状态 正在升级显示状态条-->
                                        <div>
                                            <el-row>升级状态:
                                                <span>{{upgradeParam.status}}</span>
                                                <el-progress v-if="this.upgradeParam.status === '正在升级'" :text-inside="true" style="width: 50%" :stroke-width="18" :percentage="progessNumber"></el-progress>
                                            </el-row>
                                        </div>
                                    </div>    
                                </el-tab-pane>
                                <el-tab-pane label="直播功能">
                                    <div v-if="showMuch">
                                        <el-card class="box-card" style="height: 500px;overflow: auto">
                                            <div v-for="o in 10" :key="o" style="height: 260px;">
                                                <span>{{'摄像头 ' + o }}:</span>
                                                <el-button type="primary" size="mini" @click="playKeLuVideo(o)">播放</el-button>
                                                <div style="height: 240px">
                                                    <!-- <video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay>
                                                        <source id="videoUrl" :src="liveURL" type="application/x-mpegURL" />
                                                    </video> -->
                                                    <video
                                                        id="myPlayer"
                                                        :src="liveURL"
                                                        width="100%"
                                                        height="230"
                                                        poster="[这里可以填入封面图片URL]"
                                                        controls
                                                        playsInline
                                                        webkit-playsinline
                                                    >
                                                    </video>
                                                </div>
                                            </div>
                                        </el-card>
                                    </div>
                                    <div v-else>
                                        <el-button type="primary" @click="playVideo">播放</el-button>
                                        <div style="height: 450px; overflow: auto">
                                            <!-- <video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay>
                                                <source id="videoUrl" :src="liveURL" type="application/x-mpegURL" />
                                            </video> -->
                                            <video
                                                id="myPlayer"
                                                :src="liveURL"
                                                width="100%"
                                                height="400"
                                                poster="[这里可以填入封面图片URL]"
                                                controls
                                                playsInline
                                                webkit-playsinline
                                            >
                                            </video>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="生成配网二维码">
                                    <div style="height: 400px">
                                        ssid: <el-input style="width: 200px" v-model="ssid"></el-input>
                                        pwd: <el-input style="width: 200px" v-model="pwd"></el-input>
                                        <el-button @click="getSsid()" type="primary" >生成二维码</el-button>
                                        <div style="width: 200px;height: 200px; border: 1px solid; margin-top: 20px"><img id="img" src=""/></div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="抓拍图片">
                                     <div style="height: 400px">
                                        <el-button @click="getCapture()" type="primary" >抓拍图片</el-button>
                                        <div style="width: 200px;height: 200px; border: 1px solid; margin-top: 20px"><img id="img_2" src=""/></div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="设备状态">
                                    <div style="height: 400px;display: flex; justify-content: space-between;">
                                        <div>
                                            <div>隐私状态:<span>{{device_param.privacyStatus}}</span></div>
                                            <div style="margin-top: 10px">红外状态:<span>{{device_param.pirStatus}}</span></div>
                                            <div style="margin-top: 10px">告警声音模式:<span>{{device_param.alarmSoundMode}}</span></div>
                                            <div style="margin-top: 10px">电池电量:<span>{{device_param.battryStatus}}</span></div>
                                            <div style="margin-top: 10px">门锁和网关间的无线信号:<span>{{device_param.lockSignal}}</span></div>
                                        </div>
​                                        <div>
                                            <div>挂载的sd硬盘数量:<span>{{device_param.diskNum}}</span></div>
                                            <div style="margin-top: 10px">sd硬盘状态:<span>{{device_param.diskState}}</span></div>
                                            <div style="margin-top: 10px">云存储状态:<span>{{device_param.cloudStatus}}</span></div>
                                            <div style="margin-top: 10px">NVR上挂载的硬盘数量:<span>{{device_param.nvrDiskNum}}</span></div>
                                            <div style="margin-top: 10px">NVR上挂载的硬盘状态:<span>{{device_param.nvrDiskState}}</span></div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </el-dialog>
                        <!--监控系统修改按钮弹出dialog-->
                        <el-dialog class="houseTypeClass" title="监控摄像头设置:" :visible.sync="infoDialog" :close-on-click-modal="false">
                            <div style="height: 400px; overflow: auto">
                                <el-row>
                                    <span class="span_style">楼层:</span> 
                                    <el-select v-model="floorValue" style="width: 14vw" @focus="getFloor()" placeholder="请选择" > 
                                        <el-option
                                            v-for="item in floorList"
                                            :key="item.id"
                                            :label="item.descript"
                                            :value="item.descript">
                                        </el-option>
                                    </el-select>
                                </el-row>
                                <el-row style="margin-top: 20px">
                                    <span class="span_style">楼栋:</span> 
                                        <el-select v-model="buildingValue" style="width: 14vw" @focus="getBuilding()" placeholder="请选择" >
                                            <el-option
                                            v-for="item in buildingList"
                                            :key="item.id"
                                            :label="item.descript"
                                            :value="item.descript">
                                            </el-option>
                                        </el-select>
                                </el-row>
                                 <el-row style="margin-top: 20px">
                                    <span class="span_style">设备名称:</span> <el-input style="width: 14vw" v-model="param.device_name"></el-input>
                                </el-row>
                                <el-row style="margin-top: 20px">
                                    <span class="span_style">区域:</span>
                                     <el-select style="width: 14vw" v-model="param.zone" @focus="getFloor()" placeholder="请选择" > 
                                        <el-option
                                        v-for="(item,index) of this.floorList"
                                        :key="index"
                                        :label="item.zone"
                                        :value="item.zone">
                                        </el-option>
                                    </el-select> 
                                </el-row>
                                <el-row style="margin-top: 20px">
                                    <span class="span_style">设备编号:</span> <el-input style="width: 14vw" v-model="param.camera_no"></el-input>
                                </el-row>
                            </div>
                             <el-button  type="primary"  @click="infoDialog = false">取消 </el-button>
                            <el-button style="float: right"  type="primary"  @click="updateCamera()">确认</el-button>
                        </el-dialog>
                    </el-tab-pane>
                    <el-tab-pane label="消防系统" name="fifth"></el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
  </div>
</template>

<script>
    import _ from 'lodash'
    import { EZUIPlayer } from '../sdk/2.4/ezuikit.js'
    import axios from 'axios' 
    import util from '../../../common/util.js'
    import moment from 'moment'
    export default {
        name: "equipmenttype",
        data(){
          return {
            showMuch: false,
            activeName_name: '配置摄像头',
            // api.api_icon_8082 + '/v1/':'http://47.98.113.173:8082/v1/',
            // api.api_icon_8082 + '/v1/': 'http://elevators.crowncrystalhotel.com/v1/',
            // api.api_icon_8082 + '/v1/':'http://172.168.3.38:9002/v1/',
            // api.api_icon_8082 + '/v1/'_room: 'http://47.98.113.173:8091/v1/',
            value1: '0',
            t_controlData: [],
            j_controlData: [],
            floorList: [],
            buildingList: [],
            liveTotal: [],
             //树形结构
            treeData : [],
            defaultProps: {
                label: 'descript',
                children: 'children',
                floor: 'code'
            },
            alarmData: [],
            alarmTotal: 0,
            alarmInfoDialog: false, //告警信息dialog
            alarmParam:{}, //告警信息的param
            floorValue: '',
            buildingValue: '',
            settingDialog: false,
            controlTitle: '添加',
            t_addAndUpdateDialog: false,//梯控添加dislog
            addAndUpdate: true,//判断增加或修改标记
            ssid: '',
            pwd: '',
            multipleSelection: [], //关闭直播功能
            deviceSerial: '', //序列号
            liveData: [], //直播获取列表
            liveURL: '',//直播播放地址
            showVersion: true,//摄像头版本展示
            versionParam: {
                latestVersion:'',
                currentVersion: '',
                isNeedUpgrade:'',
                isUpgrading:''
            },//getversion摄像头版本
            upgradeParam: {},//设备升级状态
            progessNumber: '',//正在升级时显示的数字
            dateFormat: (row, column)=>{
                let date = row[column.property]
                if(date === undefined){
                    return ''
                }
                    return  moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            encrypt: '',//视频加密
            defence: '',
            notify: '',
            device_param: {
                privacyStatus: '',
                pirStatus: '',
                alarmSoundMode: '',
                battryStatus: '',
                lockSignal: '',
                diskNum: '',
                diskState: '',
                cloudStatus: '',
                nvrDiskNum: '',
                nvrDiskState: ''
            },
            //告警信息字段
            status: '',
            // 告警消息状态
            statuss: [
                {
                    value: '0',
                    label:'未读'
                },
                {
                    value: '1',
                    label:'已读'
                },
                {
                    value: '2',
                    label:'所有'
                },
            ],
            //告警类型
            // alarm_type: [],
            camerList: [], //设备列表不分页查询
            data_value1: '',//时间格式告警
            data_value2: '',
            device_flag: '',//告警设备传输 默认为0时则筛选全部，其它则传id
            //梯控param
            t_param: {
                code: '666',
                code_name: '六六六',
                create_user: '',
                descript: '大',
                descript_en: '大声道',
                hotel_group_id: '',
                hotel_id: '',
                is_halt: false,
                list_order: 213,
                modify_user: 'user',
                device_serial: 'C88692590',
                device_name: '213',
                activate_state: 'VPELFU',
                software_version: '',
                hardware_version: '',
                // position: '', //file类型
            },
            param: {
                local_ip: '',//ip端口
                floor: '',
                building: '',
                device_serial: '',
                validate_code: '',
                camera_no: '',
                zone: '',
                device_name: '',
                position_string: ''
            },
            infoDialog: false,
            addDialog: false,
            total: 0,
            j_controlTotal: 0,
            currentPage: 1,
            pagesize: 10,
            activeName: 'fourth',
            date_value1: '',
            date_value2: ''
        };
      },
        destroyed () {
            // clearInterval(this.inst)
        },
        mounted(){
            //定时调用告警信息
            // this.inst = setInterval(() => {
            //     this.getAlarmData()
            // }, 5000);
            //获取全部设备列表不分页
        //     let that = this
        //     let url = that.api.api_icon_8082 + '/v1/' + 'camera/ezviz/get_camera_list/'
        //     that.$axios.get(url).then(res=>{
        //         if(res.data.message == 'success'){
        //             that.camerList = res.data.data.results
        //         }else{
        //             that.message.error('获取数据失败，请重试')
        //         }
        //     }).catch((error)=>{
        // })
      },
      created(){
        this.getCameraList()//设备列表数据
        // this.getTcontrolData()//梯控数据列表
        // this.getAlarmData() //浏览器打开获取告警信息
        this.getFloorBuilding() //获取楼栋楼层数据=》tree服务
        // this.getFloor()
      },
      methods:{
          //节点点击事件
        handleNodeClick(data){
            console.log('data////',data)
            let floor = data.descript 
            // if(typeof floor === 'number'){
                this.getCameraList(this.currentPage,floor)
            // }
           
        },
        //关闭配置/刷新数据
        flushData(){
            // this.$router.go(0)
            document.getElementById('img_2').removeAttribute( 'src')//清除抓排图片
            document.getElementById('img').removeAttribute( 'src')//清除二维码图片
            this.liveURL = ''
            var player = new EZUIPlayer('myPlayer');
            console.log('player...',player)
            // player.on('stop', function(){
            //     console.log('stop');
            // });
            player.stop();
            this.device_serial = ''
        },
        flush(){
            this.param =  {
                local_ip: '',//ip端口
                floor: '',
                building: '',
                device_serial: '',
                validate_code: '',
                camera_no: '',
                zone: '',
                device_name: '',
                position_string: ''
            }
        },
        //梯控系统获得全部的设备列表
        getTcontrolData(currentPage){
            let that = this
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/baidu/get_camera_list/'
            that.$axios.get(url,{
                params: {
                    page: currentPage,
                    page_size: 10
                }
            }).then(res=>{
                if(res.data.message == 'success'){
                    that.t_controlData = res.data.data.results
                    that.total = res.data.data.count
                    // that.j_controlData.modify_date = moment().format('YYYY-MM-DD HH:mm:ss')
                }else{
                    that.message.error('获取数据失败，请重试')
                }
            }).catch((error)=>{
            })
        },
        //获取楼栋楼层数据
        getFloorBuilding(){
            let that = this
            let url = that.api.api_price_9101+ '/v1/' + 'room_status/get_room_floor_tree/'
            // let scopeParam = {
            //     hotel_id : 1
            // }
            that.$axios.get(url).then(res=>{
                console.log('res.data',res.data)
                if(res.data.message == 'success'){
                    that.treeData = res.data.data.data
                }else{
                    that.$message.error('获取数据失败，请重试')
                }
            }).catch((error)=>{
                //  that.$message.error('请求服务器数据失败，请重试')
            })
        },
        //获取楼层数据
        getFloor(){
            let that = this
            let url = that.api.api_price_9101+ '/v1/' + 'room_status/get_room_floor_list/?page_size=300'
            that.$axios.get(url).then(res=>{
                if(res.data.message == 'success'){
                    that.floorList = res.data.data.results
                    console.log('that.floorList',res.data.data.results)
                }else{
                    that.message.error('获取数据失败，请重试')
                }
            }).catch((error)=>{
            })
        },
        //开启直播功能
        // openLive(){
            // if(this.multipleSelection.length == 0){
            //      this.$message({
            //         message: '请选择摄像头!',
            //         type: 'warning'
            //     });
            //     return
            // }
        // },
        //开启/关闭直播功能
        openAndCloseLive(row){
            // if(this.multipleSelection.length == 0){
            //      this.$message({
            //         message: '请选择摄像头!',
            //         type: 'warning'
            //     });
            //     return
            // }
            let is_live_open = row.is_live_open 
            let id = row.id
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/live_isopen/' + id + '/'
            let _this = this
            // console.log(_this.multipleSelection,'_this.multipleSelection')
            // let map = new Map();
            // let data = []
            // for(var item of _this.multipleSelection){
            //     map.set(item.device_serial,1)
            // }
            // data.push(this.strMapToObj(map))
            // let a = JSON.stringify(data[0])
            // console.log(a, typeof a,'111')
            is_live_open === 0 ? is_live_open = '1' : is_live_open = '0'
            let scopeParam = {
                is_live_open: is_live_open, //出来的0和1
            //    number: a
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                console.log(',,,,,,,,,,,,,',res.data)
                if(res.data.data.code =='200'){
                    _this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error('操作失败');
                }
                _this.getCameraList()
            })
        },
        //Map转为对象的方法
        strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k,v] of strMap) {
                obj[k] = v;
            }
            return obj;
        },
        handleSelectionChange(val){
            this.multipleSelection = val //赋值
        },
        //获取楼栋数据
        getBuilding(){
            let that = this
            let url = that.api.api_price_9101+ '/v1/' + 'room_status/get_room_building_list/'
            that.$axios.get(url).then(res=>{
                if(res.data.message == 'success'){
                    that.buildingList = res.data.data.results
                    console.log('that.buildingListthat.buildingList',that.buildingList)
                }else{
                    that.message.error('获取数据失败，请重试')
                }
            }).catch((error)=>{
            })
        },
        //告警table列表数据查询
        getAlarmData(currentPage){
            if(this.device_flag === ''){
                this.device_flag = '0'
            }
            // currentPage = 0
            typeof currentPage == 'object' ? currentPage = 0 : currentPage = currentPage //当点击查询按钮的时候处理转换的格式
            if(this.data_value1 > this.data_value2){
                this.$message({
                    type: 'warning',
                    message: '开始时间不能大于结束时间!'
                })
                return
            }
            let that = this
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/ezviz/alarm_list/'
            that.$axios.get(url,{
                params: {
                    status: that.status,
                    start_time: this.data_value1,
                    end_time: this.data_value2,
                    alarm_type: '-1',
                    page_start: currentPage,
                    page_size: 10,
                    device_flag: that.device_flag //当为0时查询所有设备的告警信息，否则为相应id的告警信息
                }
            }).then(res=>{
                if(res.data.message == 'success'){
                    that.alarmData = res.data.data
                    that.alarmTotal = res.data.page.total
                    // that.j_controlData.modify_date = moment().format('YYYY-MM-DD HH:mm:ss')
                }else{
                    that.message.error('获取数据失败，请重试')
                }
            }).catch((error)=>{
            })
        },
        //告警信息详情
        handleAlarmInfo(row){
            let that = this
            let id = row.id
            that.alarmParam= row
            this.alarmParam.isEncrypt != null && this.alarmParam.isEncrypt === 0 ? this.alarmParam.isEncrypt = '不加密' : this.alarmParam.isEncrypt = '加密'
            this.alarmParam.isChecked != null &&this.alarmParam.isChecked === 0 ? this.alarmParam.isChecked = '未读' : this.alarmParam.isChecked = '已读'  
            this.alarmParam.preTime = this.alarmParam.preTime + '秒'
            this.alarmParam.delayTime = this.alarmParam.delayTime + '秒'
            if(this.alarmParam.recState != null){
                if(this.alarmParam.recState === 0){
                    this.alarmParam.recState = '无存储'
                }else if (this.alarmParam.recState === 1){
                    this.alarmParam.recState = '萤石云存储'
                }else if (this.alarmParam.recState === 4){
                    this.alarmParam.recState = 'sd卡存储'
                }else if (this.alarmParam.recState === 5){
                    this.alarmParam.recState = '萤石云存储和sd卡存储'
                }    
            }
            if(this.alarmParam.alarmTime != null){
               this.alarmParam.alarmTime = moment(this.alarmParam.alarmTime).format('YYYY-MM-DD HH:mm:ss'); 
            }
            if(this.alarmParam.relationAlarms.length === 0){
                this.alarmParam.relationAlarms = ''
            }   
        },
        //设备升级
        getUpgrade(){
            if(this.versionParam.latestVersion === this.versionParam.currentVersion){
                this.$message({
                        message: '版本到达最新，不需要升级!',
                        type: 'warning'
                    });
                return
            }
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/upgrade/' + id + '/'
            let _this = this
            _this.$axios.post(url).then((res)=>{
                if(res.data.message =='success'){
                    _this.$message({
                        message: '升级成功',
                        type: 'success'
                    });
                    this.getUpgradeStatus() //调用方法==>显示设备升级状态
                }else{
                    this.$message.error('升级失败');
                }
            }) 
        },
        //设备升级状态
        getUpgradeStatus(){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/upgrade_status/' + id + '/'
            let _this = this
            _this.$axios.post(url).then((res)=>{
                if(res.data.message =='upgrade_status camera success : 操作成功!'){
                    _this.upgradeParam = res.data.data
                    // _this.upgradeParam = {
                    //     progress: 2,
                    //     status: 0
                    // }
                    if(_this.upgradeParam.status === 0){
                        _this.upgradeParam.status = '正在升级'
                        _this.progessNumber = _this.upgradeParam.progress
                    }else if(_this.upgradeParam.status === 1){
                        _this.upgradeParam.status = '设备重启'
                    }else if(_this.upgradeParam.status === 2){
                        _this.upgradeParam.status = '升级成功'
                    }else{
                        _this.upgradeParam.status = '升级失败'
                    }
                    _this.$message({
                        message: '设备升级状态查询成功',
                        type: 'success'
                });
                }else{
                    this.$message.error('设备升级状态查询失败');
                }
            }) 
        },
        //查询摄像头的版本
        getVersion(){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/version/' + id + '/'
            let _this = this
            _this.$axios.post(url).then((res)=>{
                if(res.data.message =='success'){
                    try {
                        console.log('dd.',res.data.data.data)
                        if(res.data.data.data === undefined){
                            _this.versionParam.latestVersion ='',
                            _this.versionParam.currentVersion = '',
                            _this.versionParam.isNeedUpgrade ='',
                            _this.versionParam.isUpgrading =''
                        }else{
                            _this.versionParam = res.data.data.data
                        }
                        _this.versionParam.isNeedUpgrade === 0 ? _this.versionParam.isNeedUpgrade = '不需要' : _this.versionParam.isNeedUpgrade = '需要'
                        _this.versionParam.isUpgrading === 0 ? _this.versionParam.isUpgrading = '未升级' : _this.versionParam.isUpgrading = '正在升级'
                    } catch (error) {
                        _this.$message.warning(res.data.data.msg)                        
                    }
                    // _this.$message({
                    //     message: '操作成功',
                    //     type: 'success'
                    // });
                }else{
                    this.$message.error('操作失败');
                }
            }) 
        },
        //刻录机播放视频
        playKeLuVideo(param){
            console.log('param',param)
            this.getKeluLiveData(param)//获取地址
        },
        //获取刻录机直播地址 ==》展示 post请求
        getKeluLiveData(param){
            let id = this.rowId_2
            // let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/live_list/' + id + '/'
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/get_live_address_nvr/' + id + '/'
            let _this = this
            _this.$axios.post(url,{
               channelNo: String(param)
            }).then((res)=>{
                console.log('res.data',res.data)
                if(res.data.message =='success'){
                    _this.liveData = res.data.data.data
                    console.log('_this.liveData===>获取刻录机直播地址====',_this.liveData)
                    this.playVideo()//开始播放视频
                    // _this.$message({
                    //     message: '查询成功',
                    //     type: 'success'
                    // });
                }else{
                    this.$message.error('查询失败');
                }
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //播放视频
        playVideo(){
            console.log('this.liveData',this.liveData)
            console.log('this.liveURL============',this.liveURL)
            let data
            if(this.liveData != undefined && this.liveData.length>0){
                data = this.liveData.filter(item=> item.deviceSerial === this.deviceSerial)
                //判断
                if(data.length == 0){
                    this.$message({
                        message: '请检查视频是否加密或者摄像头是否在线!',
                        type: 'warning'
                    });
                    return
                } 
                if(data[0].hls == '' || data[0].hls == null || data == undefined){
                    this.$message.warning('直播地址未获得!')
                    return
                }
                console.log('data,,,',data)
                console.log('this.deviceSerial',this.deviceSerial)
                this.liveURL = data[0].hls
                // this.liveURL = 'http://hls01open.ys7.com/openlive/eaabb824d3f84ce19ebebb6498423688.hd.m3u8'
                console.log('this.liveURL',this.liveURL)
                try {
                    this.$nextTick(() => {
                        var player = new EZUIPlayer('myPlayer');
                        player.play();
                    })
                    
                } catch (error) {
                    this.$message.warning('该摄像头不能播放!')
                    console.log('error')
                }
            }else{
                this.$message.warning('直播地址未获得!')
            }
            // deviceSerial = 
            // player.on('error', function(){
            //     console.log('error');
            // });
            // player.on('pause', function(){
            //     console.log('pause');
            // });
        },
        //获取直播地址 ==》展示 post请求
        getLiveData(){
            let id = this.rowId_2
            // let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/live_list/' + id + '/'
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/get_live_address/' + id + '/'
            let _this = this
            _this.$axios.post(url,{
                pageStart: 0,
                pageSize: 100
            }).then((res)=>{
                console.log('res.data',res.data)
                if(res.data.message =='success'){
                    _this.liveData = res.data.data.data
                    console.log('_this.liveData===>获取直播地址====',_this.liveData)
                    // _this.$message({
                    //     message: '查询成功',
                    //     type: 'success'
                    // });
                }else{
                    this.$message.error('查询失败');
                }
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //开启关闭设备下线通知
        setNotify(value){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/notify/' + id + '/'
            let _this = this
            let scopeParam = {
               offline_notify: value,
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                if(res.data.message =='success'){
                    _this.$message({
                        message: '操作成功',
                        type: 'success'
                });
                }else{
                    if(_this.notify == '0'){
                        _this.notify = '1'
                    }else{
                        _this.notify = '0'
                    }
                    this.$message.error('操作失败');
                }
                _this.getCameraList()
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //开启关闭设备视频加密
        setEncrypt(value){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/encrypt/' + id + '/'
            let _this = this
            let scopeParam = {
               is_encrypt: String(value) //出来的0和1变为true和false
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                if(res.data.message =='success'){
                    _this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }else{
                    if(_this.encrypt == '0'){
                        _this.encrypt = '1'
                    }else{
                        _this.encrypt = '0'
                    }
                    this.$message.error('操作失败');
                }
                _this.getCameraList()
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //设备布撤防
        setDefence(value){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/defence/' + id + '/'
            let _this = this
            let scopeParam = {
               defence: value,
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                if(res.data.code =='200'){
                    _this.$message({
                        message: '操作成功',
                        type: 'success'
                });
                }else{
                    console.log('_this.defence',_this.defence)
                    if(_this.defence == '0'){
                        _this.defence = '1'
                    }else{
                        _this.defence = '0'
                    }
                    this.$message.error('操作失败');
                }
                console.log('_this.defence2222',_this.defence)
                _this.getCameraList()
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //点击管理/配置弹出tab页
        handleSettingClick(row){
            console.log('row...',row)
            if(row.label === '设备状态'){
                this.getDeviceStatus()//设备状态
            }else if(row.label === '直播功能'){
                if(this.showMuch == true){
                    console.log('这个是多个的刻录机!')
                }else{
                    this.getLiveData()
                }
            }
            console.log('row,=',row)
        },
        //置空处理数据
        handleSetting(row){
            this.liveURL = ''//刷新数据
            console.log('rowwww,',row)
            if(row.device_type === 'zhuji'){
                this.showMuch = true
            }else{
                this.showMuch = false
            }
            let that = this
            let id = row.id
            that.rowId_2 = id
            that.deviceSerial = row.device_serial
            that.defence = String(row.defence)
            that.encrypt = String(row.is_encrypt)
            console.log('that.encrypt,',that.encrypt)
            that.notify = String(row.offline_notify)//offline_notify
            that.ssid = ''//置空
            that.pwd = ''
            this.upgradeParam.status = '' //置空设备升级状态
            //设备版本
            this.versionParam.latestVersion ='',
            this.versionParam.currentVersion = '',
            this.versionParam.isNeedUpgrade ='',
            this.versionParam.isUpgrading =''
            //设备状态
            this.device_param.privacyStatus =''
            this.device_param.pirStatus =''
            this.device_param.alarmSoundMode =''
            this.device_param.battryStatus =''
            this.device_param.lockSignal =''
            this.device_param.diskNum =''
            this.device_param.diskState =''
            this.device_param.cloudStatus =''
            this.device_param.nvrDiskNum =''
            this.device_param.nvrDiskState =''
            // this.getUpgradeStatus() //设备升级状态==不要此处不放
            // this.getVersion() //查询摄像头版本
            // this.getLiveData() //暂时放这儿
        },
        //查询设备状态
        getDeviceStatus(){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/status/' + id + '/'
            let _this = this
            let scopeParam = {
               channelNo: '1',
            }
            setTimeout(() => {
                _this.$axios.post(url, scopeParam).then((res)=>{
                    console.log('res.data',res)
                    if(res.data.message =='success'){
                        try {
                            console.log('dd.',res.data.data.data)
                            if(res.data.data.data === undefined){
                                _this.device_param.privacyStatus =''
                                _this.device_param.pirStatus =''
                                _this.device_param.alarmSoundMode =''
                                _this.device_param.battryStatus =''
                                _this.device_param.lockSignal =''
                                _this.device_param.diskNum =''
                                _this.device_param.diskState =''
                                _this.device_param.cloudStatus =''
                                _this.device_param.nvrDiskNum =''
                                _this.device_param.nvrDiskState =''
                            }else{
                                _this.device_param = res.data.data.data
                                _this.handleData(_this.device_param) //处理数据
                            }
                        }catch (error) {
                            _this.$message.warning(res.data.data.msg)  
                        }
                        // _this.$message({
                        //     message: '查询设备状态成功',
                        //     type: 'success'
                        // });
                        // _this.settingDialog = false
                    }else{
                        this.$message.error('查询设备状态失败');
                    }
                    // _this.getCameraList()
                })
            }, 1000);
        },
        //处理设备状态数据
        handleData(data){
            switch (data.privacyStatus) {
                case 0:
                    data.privacyStatus = '隐私状态关闭'
                    break;
                case 1:
                    data.privacyStatus = '隐私状态打开'
                    break;
                case -1:
                    data.privacyStatus = '初始值'
                    break;
                case 2:
                    data.privacyStatus = '不支持,C1专用'
                    break;
                case -2:
                    data.privacyStatus = '设备没有上报或者设备不支持该状态'
                    break;
                default:
                    break;
            }
            switch (data.pirStatus) {
                case 0:
                    data.pirStatus = '红外禁用'
                    break;
                case 1:
                    data.pirStatus = '红外启用'
                    break;
                case -1:
                    data.pirStatus = '初始值'
                    break;
                case 2:
                    data.pirStatus = '不支持'
                    break;
                case -2:
                    data.pirStatus = '设备没有上报或者设备不支持该状态'
                    break;
                default:
                    break;
            }
            switch (data.alarmSoundMode) {
                case 0:
                    data.alarmSoundMode = '短叫'
                    break;
                case 1:
                    data.alarmSoundMode = '长叫'
                    break;
                case 3:
                    data.alarmSoundMode = '自定义语音'
                    break;
                case 2:
                    data.alarmSoundMode = '静音'
                    break;
                case -1:
                    data.alarmSoundMode = '设备没有上报或者设备不支持该状态'
                    break;
                default:
                    break;
            }
            //电池电量
            if(data.battryStatus > 1 && data.battryStatus < 100){
                data.battryStatus = data.battryStatus + '%'
            }else{
                data.battryStatus = '设备没有上报或者设备不支持该状态'
            }
            data.lockSignal = '设备没有上报或者设备不支持该状态'
            switch (data.diskNum) {
                case -1:
                    data.diskNum = '设备没有上报或者设备不支持该状态'
                    break;
                default:
                    break;
            }
            switch (data.diskState) {
                case '0':
                    data.diskState = '正常'
                    break;
                case '1':
                    data.diskState = '存储介质错'
                    break;
                case '2':
                    data.diskState = '未格式化'
                    break;
                case '3':
                    data.diskState = '正在格式化'
                    break;
                case '0---------------':
                    data.diskState = '一个硬盘'
                    break;
                case '00--------------':
                    data.diskState = '两个硬盘'
                    break;
                case '-1':
                    data.diskState = '设备没有上报或者设备不支持该状态'
                    break;        
                default:
                    break;
            }
            switch (data.cloudStatus) {
                case 0:
                    data.cloudStatus = '未激活'
                    break;
                case 1:
                    data.cloudStatus = '激活'
                    break;
                case -1:
                    data.cloudStatus = '未开通'
                    break;
                case 2:
                    data.cloudStatus = '过期'
                    break;
                case -2:
                    data.cloudStatus = '设备不支持'
                    break;
                default:
                    break;
            }
            switch (data.nvrDiskNum) {
                case -1:
                    data.nvrDiskNum = '设备没有上报或者设备不支持'
                    break;
                case -2:
                    data.nvrDiskNum = '未关联,类似于NVR类型的上级设备'
                    break;
                default:
                    break;
            }
             switch (data.nvrDiskState) {
                case '0':
                    data.nvrDiskState = '正常'
                    break;
                case '1':
                    data.nvrDiskState = '存储介质错'
                    break;
                case '2':
                    data.nvrDiskState = '未格式化'
                    break;
                case '3':
                    data.nvrDiskState = '正在格式化'
                    break;
                case '0---------------':
                    data.nvrDiskState = '一个硬盘'
                    break;
                case '00--------------':
                    data.nvrDiskState = '两个硬盘'
                    break;
                case '-1':
                    data.nvrDiskState = '设备没有上报或者设备不支持该状态'
                    break;
                case '-2':
                    data.nvrDiskState = '未关联,类似于NVR类型的上级设备'
                    break;        
                default:
                    break;
            }
        },
        //抓拍图片
        getCapture(){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/capture/' + id + '/'
            let _this = this
            let scopeParam = {
               channelNo: '1',
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                if(res.data.message =='success'){
                    console.log('res.data',res.data)
                    let imageData = res.data.data.data.picUrl
                    console.log('imageData',imageData) 
                    document.getElementById('img_2').setAttribute( 'src', imageData)
                    // document.getElementById('img_2').removeAttribute( 'src', imageData)
                    _this.$message({
                        message: '抓拍图片成功',
                        type: 'success'
                    });
                    // _this.settingDialog = false
                }else{
                    this.$message.error('抓拍图片失败');
                }
                _this.getCameraList()
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //生成二维码图片
        getSsid(){
            let id = this.rowId_2
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/qrcode/' + id + '/'
            let _this = this
            let scopeParam = {
               ssid: _this.ssid,
               password: _this.pwd
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                console.log('res.data==',res.data)
                if(res.data.message =='success'){
                    let imageData = 'data:image/png;base64,' + res.data.data.data.imageData 
                    document.getElementById('img').setAttribute( 'src', imageData)
                    _this.$message({
                        message: '生成二维码成功',
                        type: 'success'
                    });
                    // _this.settingDialog = false
                }else{
                    this.$message.error('生成二维码失败');
                }
                _this.getCameraList()
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //更新摄像头相关数据
        updateCamera(){
            let id = this.rowId
            let url = this.api.api_icon_8082 + '/v1/' + 'camera/ezviz/update_camera/' + id + '/'
            let _this = this
            let scopeParam = {
                floor: _this.floorValue,
                building: _this.buildingValue,
                device_name: _this.param.device_name,
                camera_no: _this.param.camera_no,
                zone: _this.param.zone
            }
            _this.$axios.post(url, scopeParam).then((res)=>{
                if(res.data.message =='success'){
                    _this.$message({
                        message: '保存信息成功',
                        type: 'success'
                    });
                    _this.infoDialog = false
                }else{
                    this.$message.error('保存信息失败');
                }
                _this.getCameraList()
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
        },
        //获取摄像头列表数据
        getCameraList(currentPage,floor){
            let that = this
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/ezviz/get_camera_list/'
            that.$axios.get(url,{
                params: {
                    page: currentPage,
                    page_size: 10,
                    floor, floor
                }
            }).then(res=>{
                if(res.data.message == 'success'){
                    console.log('res.data.data..///',res.data.data)
                    that.j_controlData = res.data.data.results
                    that.j_controlTotal = res.data.data.count
                    // that.j_controlData.modify_date = moment().format('YYYY-MM-DD HH:mm:ss')
                }else{
                    that.message.error('获取数据失败，请重试')
                }
            }).catch((error)=>{
            })
        },
        //获取单个摄像头对应详细数据
        handleInfo(row){
            let that = this
            let id = row.id
            that.rowId = id
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/ezviz/get_camera_info/' + id + '/'
            that.$axios.get(url).then(res=>{
                if(res.data.message == 'success'){
                    that.buildingValue = res.data.data.building
                    that.floorValue = res.data.data.floor
                    that.param.device_name = res.data.data.device_name
                    that.param.camera_no = res.data.data.camera_no
                    that.param.zone = res.data.data.zone
                }else{
                    that.$message.error('获取数据失败')
                }
            }).catch(error=>{
            })
        },
        //梯控获取单个摄像头对应详细数据
        handleControlInfo(row){
            this.controlTitle = '修改'
            this.addAndUpdate = false //标记: 增加
            let that = this
            let id = row.id
            that.rowId = id
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/baidu/get_camera_info/' + id + '/'
            that.$axios.get(url).then(res=>{
                if(res.data.message == 'success'){
                    that.t_param = res.data.data
                    that.t_param.is_halt === false ? that.t_param.is_halt = '0' : that.t_param.is_halt = '1'
                }else{
                    that.$message.error('获取数据失败')
                }
            }).catch(error=>{
            })
        },
         //添加前处理信息(梯控摄像头及其详细信息)
        handleControlAdd(){
            // this.flush()
            this.controlTitle = '添加'
            this.t_param = {} //置空
            this.addAndUpdate = true //标记: 增加
        },
         //梯控根据ID删除对应的单个摄像头数据
        deleteControlCamera(row){
            let that = this
            let id = row.id
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/baidu/remove_camera/' + id + '/'
            that.$confirm('是否进行删除操作','提示', {  
                confirmButtonText: '确定',
                cancleButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                that.$axios.post(url).then(()=>{
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    that.getTcontrolData()
                }).catch((error)=>{
                    that.$message.error('删除失败!')
                })
            }).catch(()=>{
                that.message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        //梯控添加/更新摄像头
        t_addAndUpdateCamera(){
            // if(!this.validateControlData()){
            //     return
            // }
            let that = this
            let id = that.rowId
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/baidu/add_camera/'
            let url_2 = that.api.api_icon_8082 + '/v1/' + 'camera/baidu/update_camera/' + id + '/'
            delete that.t_param.position //暂时删除这个字段放这儿
            that.$axios.post(that.addAndUpdate === true ? url : url_2 , that.t_param).then((res)=>{
                if(res.data.message == 'success'){
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                }else{
                    that.$message.error('操作失败')
                }
                that.getTcontrolData() 
            }).catch(error=>{
                that.$message.error('操作失败')
            })
            that.t_addAndUpdateDialog = false
        },
        //添加前处理信息(摄像头及其详细信息)
        handleAdd(){
            this.flush() //置空
        },
        //添加摄像头及其相关方法
        addCamera(){
            // if(!this.validateData()){
            //     return
            // }
            // console.log(this.param,'11')
            let that = this
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/ezviz/add_camera/'
            let scopeParam = {
                building: that.param.building,
                floor : that.param.floor,
                zone: that.param.zone,
                camera_no: that.param.camera_no, 
                device_serial: that.param.device_serial,
                validate_code: that.param.validate_code,
                local_ip: that.param.local_ip,
                position_string: that.param.position_string
            }
            that.$axios.post(url, scopeParam).then((res)=>{
                if(res.data.message == 'success'){
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    })
                    that.addDialog = false
                }else{
                    that.$message.warning(res.data.result)
                }
                that.getCameraList() 
            }).catch(error=>{
                that.$message.error('添加数据失败')
            })
        },
        //验证梯控系统数据方法
        validateControlData(){
            return (
                util.validateBlank(this.t_param.code, '代码是必填项', this)&&
                util.validateBlank(this.t_param.code_name, '代码名称是必填项', this)&&
                util.validateBlank(this.t_param.descript,'中文描述是必填项',this)&&
                util.validateBlank(this.t_param.descript_en,'英文描述是必填项',this)&&
                util.validateBlank(this.t_param.list_order,'排序是必填项',this)&&
                util.validateBlank(this.t_param.modify_user,'更新用户是必填项',this)&&
                util.validateBlank(this.t_param.device_serial,'设备序列号是必填项',this)&&
                util.validateBlank(this.t_param.device_name,'设备名称是必填项',this)&&
                // util.validateNAN(this.t_param.list_order,'排序是数字',this)&&
                util.validateNAN(this.t_param.activate_state,'设备激活状态是数字',this)
            )
        },
         //验证监控数据方法 返回值(boolean)
        validateData(){
            return (
                util.validateBlank(this.param.building,'楼栋是必填项',this)&&
                util.validateBlank(this.param.floor,'楼层是必填项',this)&&
                util.validateBlank(this.param.validate_code,'设备设备验证码是必填项',this)&&
                util.validateBlank(this.param.device_serial,'设备序列号是必填项',this)&&
                util.validateBlank(this.param.camera_no,'设备编号必填项',this)&&
                util.validateNAN(this.param.camera_no,'设备编号必须是数字',this)&&
                // util.validateNAN(this.param.floor,'楼层是数字',this)&&
                // util.validateNAN(this.param.defence,'布防状态是数字',this)&&
                // util.validateNAN(this.param.is_encrypt,'视频加密是数字',this)&&
                util.validateBlank(this.param.zone,'区域是必填项',this)
                // util.validateNAN(this.param.offline_notify,'设备下线通知是数字',this)&&
                // util.validateNAN(this.param.status,'设备状态是数字',this)
            )
        },
        //根据ID删除对应的单个摄像头数据
        deleteCamera(row){
            let that = this
            let id = row.id
            let url = that.api.api_icon_8082 + '/v1/' + 'camera/ezviz/remove_camera/' + id + '/'
            that.$confirm('是否进行删除操作','提示', {  
                confirmButtonText: '确定',
                cancleButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                that.$axios.post(url).then(()=>{
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    that.getCameraList()
                }).catch((error)=>{
                    that.$message.error('删除失败!')
                })
            }).catch(()=>{
                that.message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        handleSizeChange(){

        },
        //switch开关的值
        getValue(value){
            console.log(value, 'switch值')
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //编辑
        handleEdit(index, row) {
          this.$set(row,'isEgdit',true)
        },
        //删除
        handleDelete(index) {
          this.tableData.splice(index,1)
        },
        //编辑成功
        handleSuccessEdit(index, row) {
          this.$set(row,'isEgdit',false)
        },
      }
    }
</script>

<style lang="less" scoped>
  //左侧导航栏样式
.left{
  .t-info{
    margin-top: 10px;
    margin-left: 1%;
    height: 30px;
    width: 100%;
    background: #EEEEEE;
    text-align: center;
    line-height: 30px
  }
  .listStyle{
      margin-top: 20px;
      margin-left: 10px
  }
}
.houseTypeClass{
    ul{
        li{
        margin-top: 10px;
        span{
            display: inline-block;
            width: 6vw;
            text-align: right;
        }
        input{
            height: 27px;
            width: 15vw;
            margin-left: 10px;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }
        // label{
        //     margin-left: 10px;
        // }
        }
    }
}
.inner_div_Style{
    margin-top: 30px
}
.span_style{
    display: inline-block;
    width: 75px;
    text-align: right;
}
.divStyle{
    width: 300px;
    display: flex; 
    justify-content: space-between;
    margin-top: 10px;
}
.add_divStyle{
    flex-wrap: wrap; //加一层包裹 当你在布局中使用定宽或者定高的时候，可能会有一个问题出来即处于容器中的 弹性盒子子元素会溢出，破坏了布局
    margin-top: 20px;
    display: flex; 
    justify-content: space-between;
    .little-box{
        display: flex;
        justify-content: space-between;
        align-items: center
    }
}
.leftDiv{
    float: left;
}
.rightDiv{
    float: right;
}
</style>
<style scoped>
   .houseTypeClass>>> .el-dialog__header{
    background-color: #68819E;
   }
   .houseTypeClass>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
</style>
