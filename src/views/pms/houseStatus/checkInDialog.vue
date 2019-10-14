<template>
    <div>
        <el-dialog width="70%" class="checkIn-dialog" title="新建入住单"  :visible.sync="checkInFormVisible"
            @close="$emit('update:show', false)"
            :show="show">
             <!-- <el-dialog width="70%" class="checkIn-dialog" title="新建入住单" :visible.sync= 'checkInFormVisible'> -->
            <el-row>
              <el-col :span="5">
                客户类别:
                <el-select  v-model="temp_value" style="width: 70%"  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8" class="elColMiddle">
                 <el-input placeholder="请输入客户手机号/会员卡号/身份证号"></el-input>
              </el-col>
               <el-col :span="8">
                  <el-button style="margin-left: 10px" type="primary">搜索</el-button>
              </el-col>
            </el-row>
            <!-- <hr/> -->
            <el-row style="margin-top: 10px">
              <el-col :span="5">
                入住类型:
                <el-select  v-model="temp_value" style="width: 70%"  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="16" class="elColMiddle" >
                入店时间:<el-date-picker style="width: 180px" v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>&nbsp;&nbsp;
                离开时间:<el-date-picker style="width: 180px" v-model="value2" type="date" placeholder="选择日期">
                </el-date-picker> 共 <el-input style="width: 80px" v-model="value3"></el-input> 晚
              </el-col>
            </el-row>
            <!-- <el-row style="margin-top: 10px">
              <el-col :span="5">
                <div>
                    选择房型:
                    <el-select  v-model="temp_value" style="width: 70%"  placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
              </el-col>
              <el-col :span="5" style="margin-left: 10px" class="colClass">
                <span style="padding-left: 10px">房间数:</span> <el-input-number  v-model="num" :min="1"></el-input-number>
              </el-col>
              <el-col :span="13" style="margin-left: 10px">
                <img style="margin-left: 2px; cursor: pointer"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
              </el-col>
              <img style="cursor: pointer; position: relative; top: 10px; float: right" @click="selfAddNumber++" src="../../../assets/images/pms/houseStatus/add.png">
            </el-row> -->
            <!-- <el-row  style="margin-top: 10px">
              <div v-for="(item,index) in houseTypeInfoList" :key="index">
                <div style="margin-top: 10px">
                  选择房型:
                  <el-select  v-model="item.houseTypeValue" style="width: 9.8vw"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <img style="cursor: pointer; position: relative; top: 10px; float: right" v-show="showAddButton" @click="addSelect" src="../../../assets/images/pms/houseStatus/add.png">
                  <img style="cursor: pointer; position: relative; top: 10px; float: right" v-show="showDeleteButton" @click="deleteSelect(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
              </div>
            </el-row> -->
            <el-row style="margin-top: 10px">
              <el-col :span="5">
                <span style="padding-left: 14px">房间号:</span>
                <el-select  v-model="temp_value" style="width: 9.8vw"  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <!-- 最后一行 -->
            <el-row style="margin-top: 10px">
              <el-col :span="5">
                <span style="padding-left: 14px">入住人:</span>
                <el-select  v-model="temp_value" style="width: 9.8vw"  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="18" class="elColMiddle">
                 联系电话:<el-input style="width: 270px"></el-input>
                 <span style="margin-left: 20px;">性别:</span>
                 <span style="margin-left: 20px; margin-right: 10px">男</span><el-checkbox></el-checkbox>
                 <span style="margin-left: 20px; margin-right: 10px">女</span><el-checkbox></el-checkbox>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="5">
                <span>证件类型:</span>
                <el-select  v-model="temp_value" style="width: 9.8vw"  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="18" class="elColMiddle">
                 <span style="padding-left: 14px">证件号:</span><el-input style="width: 270px"></el-input>
                 <span style="margin-left: 20px;">含早:</span>
                 <el-input-number  v-model="num" :min="1"></el-input-number>
              </el-col>
              <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png">
            </el-row>
            <el-row style="margin-top: 120px">
              <img style="cursor: pointer; display: inline-block; margin-bottom: -19px" src="../../../assets/images/pms/houseStatus/cardImport.png">
               <el-button style="height: 50px; width: 150px; margin-left: 12px" type="info">物品</el-button>
               <el-button style="height: 50px; width: 150px" type="info">备注</el-button>
               <el-button style="height: 50px; width: 150px" type="info">预约发票</el-button>
               <el-button style="height: 50px; width: 150px" type="info">服务设置</el-button>
               <el-button style="height: 50px; width: 150px; float: right" type="success">确认入住</el-button>
            </el-row>
          </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import cDialog from './consumeDialog'
export default {
    data(){
        return {
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
            //预订单大对象
            preBillParam: {
                rt_rate:{
                    rmnum: '',//房间号
                },
                reserve_base:{
                    rsv_from : '',//预定类型
                    rsv_person_name : '',//预定人姓名
                    telephone_master: '',//预定人电话
                    arr_time: '',//预抵时间
                    leave_time: [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
                    is_fix_rate: '', //传的 false和 true
                    is_secrete : '',
                    is_walkin : '',
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
                //预定=》入住人list
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
            isActive: false, // 样式true or false
            UrLHeader:'http://47.98.113.173:9101/v1/',//http://member.crowncrystalhotel.com/,
            UrLHeader_2:'http://47.98.113.173:8092/v1/',
            UrLHeader_3: 'http://47.98.113.173:9103/v1/',
            consumptionDialog: false,
            borrowingDialog: false,
            billDialog: false,
            leaveDialog: false,
            houseTypeDialog: false,
            switchNumberDialog: false,
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
    },
    watch: {
            show () {
                this.previewFormVisible = this.show;
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
        let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      }
    },
    methods: {
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

        senToParent(){
            this.$emit('listenToPreview', '已经预定了')
        },
        //预订单=>确认预定
        confirmPreview(){
            // if(!this.validatePreviewData() && !this.validatePreData()){
            //   return false
            // }
            this.previewFormVisible=false
            console.log('preBillParam.consumeInfoList',this.preBillParam.consumeInfoList)
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
        //预定=》获取早餐list
        getBreakfastList(){
            let that = this
            // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
            // let url = that.UrLHeader + 'room/get_roomnumber_list/'
            let url = that.UrLHeader + 'room/rate_code/get_breakfast_list/'
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
            if(this.preBillParam.remarkList.length === 1 && this.preBillParam.remarkList[0].remarkContent === ''){
            this.preBillParam.remarkList = []
            console.log('this.preBillParam.remarkList',this.preBillParam.remarkList)
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
            item.houseTypeValue = param
            switch (param) {
            case '大床房':
                this.houseType_HeadValue = '标准正价[大床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥100'
                break;
            case '标准双床房':
                this.houseType_HeadValue = '标准正价[标准双床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '特惠双床房':
                this.houseType_HeadValue = '标准正价[特惠双床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '特惠大床房':
                this.houseType_HeadValue = '标准正价[特惠大床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '复式商务房':
                this.houseType_HeadValue = '标准正价[复式商务房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '商务大床房':
                this.houseType_HeadValue = '标准正价[商务大床房]'
                this.houseType_priceValue_1= '￥169'
                this.houseType_priceValue_2= '￥135-￥161'
                break;
            case '全新商务房B':
                this.houseType_HeadValue = '标准正价[全新商务房B]'
                this.houseType_priceValue_1= '￥169'
                this.houseType_priceValue_2= '￥135-￥161'
                break;
            default:
                break;
            }
        },
        //预订单获取对应房类型
        getHouseTypePrice(item,index){
            // item.houseTypeValue = value
            console.log('item',item)
            console.log('index',index)
            item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
            // this.preBillParam.houseTypeInfoList[index].houseTypeValue = value//替换
            // console.log('this.preBillParam.houseTypeInfoList',this.preBillParam.houseTypeInfoList)
        },
        //选房号 =>不同房型展示不同的tabel
        chooseNo(item,index){
            // if(!this.validatePreviewData()){
            //   return false
            // }
            if(item.houseTypeValue === ''){
            this.$message.warning('请先选择房型!')
            return false
            }else{
            this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
            }
            this.switchNumberDialog = true;
            // roomNo_data_list 根据item里的不同房型把数组更新
            console.log(item,'itemlist')
        },
        //选房号左边根据房型得到不同的房间信息
        selectHouseType(item){
            this.getSelectRoomInfo(item)
            console.log('itemxuanz',item)
        },
        //筛选相应房间信息
        getSelectRoomInfo(param){
            switch (param.houseTypeValue) {
            case '大床房':
                this.roomNo_data_list = [{
                room_no: 502,
                status: 'vc',
                },{
                room_no: 503,
                status: 'vc',
                },{
                room_no: 505,
                status: 'vc',
                }]
                break;
            case '标准双床房':
                this.roomNo_data_list = [{
                room_no: 508,
                status: 'vc',
                },{
                room_no: 509,
                status: 'vc',
                },{
                room_no: 501,
                status: 'vc',
                }]
                break;
            default:
                this.roomNo_data_list = []
                break;
            }
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
            console.log('this.multipleSelectionget',this.multipleSelection)
        },
        //单=》选房号dialogtabel 并控制不可选房间号
        handleselect(selection, row){
            this.multipleSelection = selection;
            if(this.multipleSelection.length>2){
            let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引
            this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
            this.$message.warning('不能超过该房间类型的可选数!')
            }
        },
        //废除不用啦暂时
        handleSelectionChange(val,row) {
            // let index = _.findIndex(this.multipleSelection,function(o) { return o.time == row.time}) //扎到索引
            // this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[0],false)
            // let may_count = 2 //self
            this.multipleSelection = val;
            for(var item of this.multipleSelection){
                item.isDisabled = true
            }
            if(this.multipleSelection.length>1){
            return false
            }
            //   if(val.length > 2){
            //     for(var item in this.roomNo_data_list){
            //     }
            //   }
        },
        //获取楼层列表option
        //增加入住人
        addSelect_2(){
            let enterValue = {
            enterRoom: '',
                name: '',
                sex : '',
                id_code : '',
                id_no : '2',
                telephone : '',
                street_add : '',
            }
            this.preBillParam.check_guest.push(enterValue)
            this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_2(index){
          if(this.preBillParam.check_guest.length>1){
            if(this.preBillParam.check_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.preBillParam.check_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        //增加选择框新建入住单里
        addSelect(){
          let houseTypeValue = {
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //总价钱
            dynamic_roomNumber: [],
            mayCount: '2',
          }
          this.preBillParam.houseTypeInfoList.push(houseTypeValue)
          console.log(this.preBillParam.houseTypeInfoList,'this.preBillParam.houseTypeInfoList')
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
            if(this.preBillParam.houseTypeInfoList.length>1){
            if(this.preBillParam.houseTypeInfoList.length ===2){
                this.showDeleteButton = false
            }
            this.preBillParam.houseTypeInfoList.splice(index, 1)
            }else{
            this.showDeleteButton = false
            return
            }
        },
        //关闭tag
        handleClose(item,tag) {
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
        },
        init(){
            console.log('init')
        },
        ininhide(){
            console.log('hide',this.$refs['popover4'].value)
        },
        //根据条件筛选房态图数据=>cardList
        filterData(filterParam){
            this.selectParam = filterParam
            if(this.selectParam === '全部1'){
            this.selectParam = ''
            }
            this.getCardList()
            this.handleData(filterParam) //根据不同参数控制样式
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        hideTest(){
            console.log('hide','test')
        },
        //单击点击方法
        popoverClick(item,index){
            this.activeClassName = index //判断list单个样式标记量
            this.isActive =!this.isActive;
        },
        //没入住得时候空房:双击弹出对话框
        openCheckIn(){
            console.log('双击')
            this.checkInFormVisible = true
        },
        //有入住得时候
        openOrderInfo(){
            this.orderFormVisible = true
        },
        closeModel(){
            this.orderFormVisible = false
        },
        //vue 多选框自带方法
        handleCheckAllChange(val) {
            this.orderHouseList = val ? orderOptions : [];
            this.isIndeterminate = false;
        },
        //vue 多选框自带方法
        handleCheckedChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.orderHouses.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.orderHouses.length;
        },
        //当popover消失的时候触发
        backStatus(){
            this.future_houseStatus = false
            this.current_houseStatus = true
            this.getCardList()
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
