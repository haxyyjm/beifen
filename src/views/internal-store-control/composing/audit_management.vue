<template>
  <div class="audit_management">
    <!--支付方式 -->
    <div class="shopping">
      <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">人员异常考勤表</span>
      <div style="margin-bottom: 10px;margin-left: 20px;">
        <el-select v-model="user_id" clearable  placeholder="请选择人员搜索">
          <el-option
            v-for="item in employee_list"
            :key="item.value"
            :label="item.real_name"
            style="margin-top: 20px"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="duty_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择考勤日期">
        </el-date-picker>
        <button style="width:80px;
          height:30px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 20px;"  @click="search">搜索</button>
      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="user_id.real_name"
            label="人员">
          </el-table-column>
          <el-table-column
            prop="duty_date"
            label="考勤日期">
          </el-table-column>

          <el-table-column
            prop="duty_time"
            label="考勤时间">
          </el-table-column>

          <el-table-column
            prop="duty_place"
            label="考勤地点">
          </el-table-column>
          <el-table-column
            prop="duty_type_id"
            label="考勤方式">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination style="float: right;margin-right: 2%"
                       layout="prev, pager, next"
                       :page-size="pagesize"
                       @current-change="handleCurrentChange"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "audit_management",
      data() {
        return {
          api:"http://47.98.113.173:9503",
          //分页
          total:10,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          income_list:[],//收支列表
          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新

          param :{},//新增入账代码里的内容
          employee_list:[],//获取人员列表
          //  人员异常考勤表的内容
          user_id:'',//人员
          duty_date:'',//考勤日期
          duty_time:'',//考勤时间
          duty_place:'',//考勤地点
          duty_type_id:''//考勤方式

        }
      },
      created:function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        console.info(that.authorization);
        that.enter_code();//获取异常考勤
        that. employee();//获取人员
      },
      methods: {
        //封装错误信息
        error_message(msg){
          this.$message.error('错了哦，错误消息为'+msg);
        },
        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {

            desc:'',//中文描述
            desc_en:'',//英文描述
            code:'',//代码
            create_time:'',//创建时间
            create_user:'',//创建用户
            modify_time:'',//修改时间
            modify_user :"",//修改用户

          }
          that.is_sys='',//是否系统码
            that.is_group="",//是否集团码
            that.belong_to_balance='',//归属部门
            that.is_halt='',//是否停用
            that.app_id='',//所属模块
            that.in_or_out=''//收支
        },
        //封装获取人员考勤列表
        enter_code(){
          let that=this
          that.$axios({
            url: ""+that.api+"/v1/manage/duty_abnormal/hotel_abnormals",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        //封装获取人员列表
        employee(){
          this.$axios({
            url: "http://47.98.113.173:9519/v1/common/employee/info_list",
            method: "post",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.list);
                this.employee_list=res.data.data.list;
                this.total=res.data.data.total_count;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击搜索
        search(){
          let that=this
          that.$axios({
            url: that.api+"/v1/manage/duty_abnormal/hotel_abnormals",
            method: "post",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            data:{
              user_id:that.user_id,
              duty_date:that.duty_date,
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },



        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/manage/duty_abnormal/hotel_abnormals",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // that.income_list=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },


      }
    }
</script>

<style lang="less" scoped>
  .audit_management{
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow: hidden;
    .title{
      margin-top: 23px;
      min-width:1200px ;
      li{
        display: inline-block;
        margin-left: 10px;
        button{
          width:80px;
          height:30px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .shopping{
      /*margin-top: 20px;*/
      .shopping_title{
        li{
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .dialog_style{
      overflow: hidden;
      li{
        float: left;
        width: 50%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          width: 130px;
        }
      }
    }
  }
</style>
<style>
  /*.el-table .cell{*/
    /*text-align:center;*/
  /*}*/
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
    /*z-index: 0;*/
  /*}*/
</style>
