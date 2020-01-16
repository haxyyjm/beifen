<template>
    <div>
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
          <el-button @click="goSetting" type="primary" size="mini">配置</el-button>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            isDate_show: false,
            id: '',
            date_value: '',
            param: {}
        }
    },
    watch: {
        '$route.params': function(newval, oldval) {
            console.log('jinru ')
            this.param = newval
            this.id = this.param.id
            console.log('req_data',typeof  this.param.req_data)
            let req_data = JSON.parse(this.param.req_data)
            console.log('req_data.length ',req_data.length )
            req_data.length > 1 ? this.isDate_show = false : this.isDate_show = true
            req_data.length > 1 ? this.date_value = [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')]
            : this.date_value = this.$store.state.biz_date 
            this.getRepost_tabel_list()
        }
    },
    created(){
        //首次进入 必须得判断 注意
        console.log('jinru',this.$route.params)
        this.param = this.$route.params
        this.id = this.param.id
        let req_data = JSON.parse(this.param.req_data)
        console.log('req_data.length ',req_data.length )
        req_data.length > 1 ? this.isDate_show = false : this.isDate_show = true
        req_data.length > 1 ? this.date_value = [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')]
        : this.date_value = this.$store.state.biz_date 
        this.getRepost_tabel_list()
    },
    mounted(){
        // this.date_value = [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')]
    },
    methods: {
        /**
         * @desc 进入配置界面 通过id查询获取
         */
        goSetting(){
            console.log('this.param 到配置',this.param)
            this.$router.push({name: 'reportSetting', params:  this.param})
        },
       /**
       * 报表tabel的信息显示
       * @desc 这里是获取报表的配置信息  分为设置:请求的参数  返回的参数
       */
        getRepost_tabel_list(){
        console.log('date_value',this.date_value)
        console.log('this.param 传来的对象',this.param)
        //处理时间
        if(this.date_value != null && this.date_value != ''){
            this.startTime = moment(this.date_value[0]).format('YYYY-MM-DD')
            this.endTime = moment(this.date_value[1]).format('YYYY-MM-DD')
        }else{
            this.startTime = ''
            this.endTime = ''
        }
        let that = this
        let url = 'http://47.98.113.173:9115'  + '/v1/' + `report/unified_interface_info/` + this.id + '/'
        let scopeParam = {
            start_biz_date: that.startTime,
            end_biz_date: that.endTime,
        }
        console.log(' this.id', this.id)
        that.$axios.post(url, scopeParam).then(res=>{
            if(res.data.message == 'success'){
                // that.repost_all_list_obj = res.data.data
                // that.report_tabel_data.push({
                //   req_data: that.repost_all_list_obj.old_req_data,
                //   res_data: that.repost_all_list_obj.old_rep_data,
                //   order_data: that.repost_all_list_obj.old_order_data
                // })
                // console.log('that.report_tabel_data',that.report_tabel_data)
            }else{
                that.message.error('获取数据失败，请重试')
            }
        }).catch((error)=>{
          console.log(error)
        })
      },
    }
}
</script>

<style lang="less" scoped>

</style>