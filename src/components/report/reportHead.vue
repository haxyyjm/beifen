<template>
    <div style="display: flex;justify-content: space-between">
        <div>
          <!-- <el-select @focus="getEmployeeInfo" clearable v-model="employeeValue" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.user_name"
                :value="item.id">
            </el-option>
          </el-select> -->
          <span v-if="isDate_show == false">日期:<el-date-picker size="mini" :clearable=false style="width: 15vw" v-model="date_value" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker></span>
          <span v-else>
               <el-date-picker
                value-format="yyyy-MM-dd"
                size="mini"
                v-model="date_value"
                :clearable=false
                type="date"
                placeholder="选择日期">
                </el-date-picker>
          </span>
        </div>
        <div>
            <el-button type='primary' size="mini" >查询</el-button>
            <el-button type='primary' size="mini" @click="printObj()">打印</el-button>
            <!-- <el-button type='primary'>导出Pdf</el-button> -->
        </div>
      </div>
</template>
<script>
    import moment from 'moment'
    export default {
        name: "reportHead",
        data(){
            return{
                isDate_show: false,
                employeeValue: '',
                startTime: '',
                endTime: '',
                reportData: {
                    reportData_list: [],
                    reportData_count: 0,
                    hotel_name: ''
                },
                date_value: '',
                options: [],
                value: ''
            }
        },
        props: {
            reportParam: {
                type: Object,
                required: true
            }
        },
        watch: {
            reportParam () {
                console.log('1111',this.reportParam)
            },
        },
        // created: function() {
        //    this.$on('handleChange', function(){
        //        this.findToParent()
        //     });  
        // },
        mounted(){
            console.log('this.$store.state.biz_date',this.$store.state.biz_date)
            console.log('this.reportParam jinru',this.reportParam)
            this.reportParam.id == 'dateYingye_id' ? this.date_value = this.$store.state.biz_date : this.date_value = [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')]
        },
        methods: {
            /**
             * @printObj 打印
             * @param printWindow 接收页面元素
             * @param printContent 写入需要打印的元素
             */
            printObj(){
                let print_element = this.reportParam.id
                console.log('print_element',print_element)
                let printWindow;
                let printContent = document.getElementById(print_element).innerHTML;
                printWindow = window.open('','_blank','width=500,height=600,location=0,menubar=0,status=0,toolbar=0,scrollbars=1');
                printWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="Expires" content="0"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Cache-control" content="no-cache"><meta http-equiv="Cache" content="no-cache"><meta name="keywords" content="" /><meta name="description" content="" /><title></title></head><body>');
                printWindow.document.write('<div style="width:100%; text-align: center; height:100%; ">'+printContent+"</div>");
                printWindow.document.write("</body></html>");
                printWindow.focus();//当前新建的窗口获得焦点
                printWindow.document.close();//关闭新建窗口的文档输出流，这个是必须的，否则下面的打印语句无效
                printWindow.print();//打印当前新建窗口中的内容
                printWindow.close();//关闭新建的窗口
            },
            /**子传父查询得到的值传过去 */
            sendInfoToParent(){
                this.reportData.hotel_name = this.$store.state.hotel_name //store里面数据赋值进去酒店名称
                this.$emit('listenToChild',this.reportData)
            },
            //子组件自带方法查询tabel方法
            findToParent(){
                console.log('1111222',this.reportParam)
                this.reportParam.id == 'dateYingye_id' ? this.isDate_show = true : this.isDate_show = false
                //营业日期赋值
                console.log('this.date_value======',this.date_value,)
                console.log('this.isDate_show',this.isDate_show)
                //处理时间
                if(this.date_value != null && this.date_value != ''){
                    this.startTime = moment(this.date_value[0]).format('YYYY-MM-DD')
                    this.endTime = moment(this.date_value[1]).format('YYYY-MM-DD')
                }else{
                    this.startTime = ''
                    this.endTime = ''
                }
                console.log('startTime',this.startTime)
                console.log('endTime',this.endTime)
                console.log('this.reportParam.namethis.reportParam.name',this.reportParam.name)
                switch (this.reportParam.name) {
                    case '营业日报表':
                        this.getReport_dayYingye()//即为收款汇总
                        break;
                    case '营业日报（区间）表':
                        this.getReport_YingyeInvoice()//即为收款汇总
                        break;       
                    case '冲调账报表':
                        this.getReport_ctACount()
                        break;
                    case 'AR入账简表':
                        this.getReport_arACount()
                        break;
                    case 'AR账户入账明细表':
                        this.getReport_arDetailACount()
                        break;
                    case 'AR账户实时余额表':
                        this.getReport_arBalance()
                        break;
                    case 'AR付款明细':
                        this.getReport_shouDetailACount()
                        break;
                     case 'AR收款简表':
                        this.getReport_shouKuanCount()
                        break;
                    //分割
                    // case '收银清单':
                    //     this.getReport_shouACount()
                    //     break;
                    // case '结账区间明细表':
                    //     this.getReport_jieACount()
                    //     break;
                    // case '催账报表':
                    //     this.getReport_cuiACount()
                    //     break;
                    // case 'AR账户入账汇总表':
                    //     this.getReport_arEnterACount()
                    //     break;
                    // case 'AR账户收款汇总表':
                    //     this.getReport_arCountACount()
                    //     break;
                    // case 'AR账户实时余额表':
                    //     this.getReport_arBalance()
                    //     break;
                    // case '换房改房价报表':
                    //     this.getReport_changeRoom()
                    //     break;
                    // case '本日续住报表':
                    //     this.getReport_continueLive()
                    //     break;
                    // case '本日将离客人报表':
                    //     this.getReport_preLeaveRoom()
                    //     break;
                    // case '本日离店客人报表':
                    //     this.getReport_haveLeaveRoom()
                    //     break;
                    // case '当前在住客人报表':
                    //     this.getReport_currentLive()
                    //     break;
                    // case '本日入住客人报表':
                    //     this.getReport_dayLive()
                    //     break;
                    // case '当前在住全日房报表':
                    //     this.getReport_feeRoom(0)
                    //     break;
                    // case '当前在住钟点房报表':
                    //     this.getReport_feeRoom(1)
                    //     break;
                    // case '当前在住夜宵房报表':
                    //     this.getReport_feeRoom(2)
                    //     break;
                    // case '当前在住常住房报表':
                    //     this.getReport_feeRoom(3)
                    //     break;
                    // case '当前在住免费房报表':
                    //     this.getReport_feeRoom(4)
                    //     break;
                    // case '销售员业绩汇总报表':
                    //     this.getReport_xSCount()
                    //     break;
                    // case '前台入账明细':
                    //     this.getReport_enterDetail()
                    //     break;
                    // case '冲账调账报表':
                    //     this.getReport_chongDiao()
                    //     break;
                    // case '前台转账报表':
                    //     this.getReport_receiveSummary()
                    //     break;
                    // case '前台收款明细':
                    //     this.getReport_receiveDetail()
                    //     break;
                    // case '前台入账简表':
                    //     this.getReport_entrySimple()
                    //     break;
                    // case '收银员交接表':
                    //     this.getReport_cashierReport()//即为收款汇总
                    //     break;
                    // case 'ar支付明细':
                    //     this.getReport_arDetail()//即为收款汇总
                    //     break;
                    // case 'ar支付汇总':
                    //     this.getReport_arSummary()//即为收款汇总
                    //     break;         
                    default:
                        break;
                }
                setTimeout(() => {
                    this.sendInfoToParent()
                }, 1000);
            },
            /**
             *  营业日报表
             */
            getReport_dayYingye(){
                console.log('jinru')
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/biz_date_daily_report/`
                let scopeParam = {
                    biz_date:  that.date_value,
                }
                console.log('scopeParam',scopeParam)
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                }).catch(error=>{
                    console.log(error)
                })
            },
            /**
             * 营业日报（区间）表
             */
            getReport_YingyeInvoice(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/biz_date_daily_interval_report/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                   that.reportData.reportData_list = res.data.data
                })
            },
            //---------------分割
            //前台入账明细
            getReport_enterDetail(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/charge_details_by_date`
                let scopeParam = {
                    biz_date_begin: that.startTime,
                    biz_date_end: that.endTime,
                    employee_id: that.employeeValue, //	员工id
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_xSCount(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/sales_achievement_summary`
                let scopeParam = {
                    begin_date: that.startTime,
                    end_date: that.endTime,
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    ignore_date: 1//  是否忽略日期错误,调试用.
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_shouDetailACount(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/report_ar_account_pay_details/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res....',res.data.data.results)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    // console.log('.....冲调账', localStorage.getItem('userInfo'))
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_shouKuanCount(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/report_ar_pay_summary_by_date/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res....',res.data.data.results)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    // console.log('.....冲调账', localStorage.getItem('userInfo'))
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            //收银清单=第一次
            getReport_shouACount(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/pay_details_by_date`
                let scopeParam = {
                    begin_date: that.startTime,
                    end_date: that.endTime,
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    ignore_date: 1//  是否忽略日期错误,调试用.
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_jieACount(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/check_out_list`
                let scopeParam = {
                    begin_date: that.startTime,
                    end_date: that.endTime,
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    ignore_date: 1//  是否忽略日期错误,调试用.
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_cuiACount(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/balance_less_than_rent`
                let scopeParam = {
                    begin_date: that.startTime,
                    end_date: that.endTime,
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    ignore_date: 1//  是否忽略日期错误,调试用.
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_arDetailACount(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/report_ar_account_charge_details/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res....',res.data.data.results)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    // console.log('.....冲调账', localStorage.getItem('userInfo'))
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_arEnterACount(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/ar_account_charge_summary`
                let scopeParam = {
                    begin_date: that.startTime,
                    end_date: that.endTime,
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    ignore_date: 1//  是否忽略日期错误,调试用.
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            getReport_arCountACount(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/ar_account_pay_summary`
                let scopeParam = {
                    begin_date: that.startTime,
                    end_date: that.endTime,
                    page_num: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    ignore_date: 1//  是否忽略日期错误,调试用.
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    
                    that.reportData.reportData_list = res.data.data.list
                    that.reportData.reportData_count = res.data.data.total_count
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            /**
             * ar账户实时余额表
             */
            getReport_arBalance(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/report_ar_account_real_time/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res....',res.data.data.results)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    // console.log('.....冲调账', localStorage.getItem('userInfo'))
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            // AR入账简表
            getReport_arACount(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/report_ar_charge_summary_by_date/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res....',res.data.data.results)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    // console.log('.....冲调账', localStorage.getItem('userInfo'))
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            //本日续住
            getReport_continueLive(){
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `depend_ex/today_continued_houses_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            getReport_changeRoom(){
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `depend_ex/today_exchange_houses_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            //本日将离客人报表
            getReport_preLeaveRoom(){
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `checkin/get_leave_today_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            getReport_dayLive(){
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `checkin/get_living_today_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            //当前在住客人报表
            getReport_currentLive(){
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `checkin/get_living_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            //本日离店客人报表
            getReport_haveLeaveRoom(){
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `checkin/get_left_today_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            //开始加====>deng 当前在住免费房报表===>第一版本(未来会有第二版本)
            getReport_feeRoom(labelparam){
                console.log('......................免费房')
                let that = this
                let url = that.api.api_newBill_9204 + '/v2/' + `checkin/get_master_type_report/`
                let scopeParam = {
                    biz_date_min: that.startTime ? `${that.startTime} 00:00:00` : that.startTime,
                    biz_date_max: that.startTime ? `${that.endTime} 00:00:00`: that.startTime,
                    page_number: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                    master_lable: labelparam//  区分5种入住类型
                }
                console.log('url===',url,scopeParam)
                that.$axios.get(url,{
                    params: scopeParam
                }).then(res=>{
                    console.log('jirnu===========',res.data)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    console.log('that.reportData.reportData_list==>明细===',that.reportData)
                })
            },
            getReport_ctACount(){
                let that = this
                let url = that.api.api_newPrice_9107+ '/v1/' + `report/comprehensive/report_arrange_detail_list/`
                let scopeParam = {
                    start_biz_date: that.startTime,
                    end_biz_date: that.endTime,
                    page: that.reportParam.page_num,//当前页数
                    page_size: that.reportParam.page_size,
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    console.log('res....',res.data.data.results)
                    that.reportData.reportData_list = res.data.data.results
                    that.reportData.reportData_count = res.data.data.count
                    // console.log('.....冲调账', localStorage.getItem('userInfo'))
                    console.log('that.reportData.reportData_list==>明细',that.reportData.reportData_list)
                })
            },
            //前台入账汇总
            getReport_enterSummary(){
            },
            //冲调报表明细
            getReport_chongDiao(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/arrange_operation_by_date`
                let scopeParam = {
                    biz_date_begin: that.startTime,
                    biz_date_end: that.endTime,
                    employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                    console.log('that.reportData.reportData_list',this.reportData)
                })
            },
            //前台转账报表==>transfer_details_by_date
            getReport_receiveSummary(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/transfer_details_by_date`
                let scopeParam = {
                        biz_date_begin: this.startTime,
                        biz_date_end: this.endTime,
                        employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                }) 
            },
            //前台收款明细
            getReport_receiveDetail(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/pay_details_by_date`
                let scopeParam = {
                        biz_date_begin: that.startTime,
                        biz_date_end: that.endTime,
                        employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                }) 
            },
            //前台入账简表
            getReport_entrySimple(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/charge_details_by_code`
                let scopeParam = {
                        biz_date_begin: this.startTime,
                        biz_date_end: this.endTime,
                        employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                }) 
            },
            //收银员交接表==>即查看指定日期收款汇总(汇总分组: 支付方式)
            getReport_cashierReport(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/pay_summary_by_date`
                let scopeParam = {
                        biz_date_begin: this.startTime,
                        biz_date_end: this.endTime,
                        employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                    console.log('that.reportData.reportData_list',this.reportData)
                }) 
            },
            //ar支付明细
            getReport_arDetail(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/ar_pay_details_by_date`
                let scopeParam = {
                        biz_date_begin: this.startTime,
                        biz_date_end: this.endTime,
                        employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                    console.log('that.reportData.reportData_list',this.reportData)
                }) 
            },
            //ar支付汇总
            getReport_arSummary(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `report/account/ar_pay_summary_by_date`
                let scopeParam = {
                        biz_date_begin: this.startTime,
                        biz_date_end: this.endTime,
                        employee_id: that.employeeValue //	员工id
                }
                that.$axios.post(url,scopeParam).then(res=>{
                    that.reportData.reportData_list = res.data.data
                    console.log('that.reportData.reportData_list',this.reportData)
                }) 
            },
            //人员信息列表
            getEmployeeInfo(){
                let that = this
                let url = that.api.api_9022_9519+ '/v1/' + `common/employee/info_list?page_size=999`
                that.$axios.get(url).then(res=>{
                    console.log('res.data.data',res.data.data.list)
                    that.options = res.data.data.list
                    // that.reportData.reportData_list = res.data.data
                    // console.log('that.reportData.reportData_list',this.reportData)
                }) 
            },
        }
    }
</script>

