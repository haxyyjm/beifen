<template>
  <div class="summary_one">
    <!--支付方式 -->
    <div class="shopping">
      <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">考勤一览表</span>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          :cell-style="{textAlign:'center'}"
          max-height="700"
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
            prop="shift_id.desc_cn"
            label="班次代码">
          </el-table-column>
          <el-table-column
            prop="duty_date"
            width="130"
            label="轮值日期">
          </el-table-column>

          <el-table-column
            prop="checkin_time"
            width="130"
            label="开始时间">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="checkin_time"-->
            <!--width="130"-->
            <!--label="考勤开始">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="checkin_place"
            width="130"
            label="开始考勤地点">
          </el-table-column>
          <el-table-column
            prop="checkout_time"
            width="130"
            label="结束时间">
          </el-table-column>

          <!--<el-table-column-->
            <!--prop="checkout_place"-->
            <!--width="130"-->
            <!--label="结束考勤地点">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="duty_type_id"
            width="130"
            label="考勤方式">
            <template slot-scope="scope">
              <span v-if="scope.row.duty_type_id === 0">手机</span>
              <span v-else-if="scope.row.duty_type_id === 1">指纹</span>
              <span v-else>面部识别</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="verified"
            label="是否查核">
            <template slot-scope="scope">
              <span v-if="scope.row.verified === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="verify_user"
            label="查核人">
          </el-table-column>

          <!--<el-table-column-->
            <!--prop="address"-->
            <!--width="150 "-->
            <!--fixed="right"-->
            <!--label="操作">-->
            <!--<template slot-scope="scope" >-->
              <!--<el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>-->
              <!--<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->

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
        name: "summary_one",
      data() {
        return {
          api:"http://47.98.113.173:9503",
          //分页
          total:5,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          //收支
          in_out:[
            {
              value:'收',
              label: '收'
            }, {
              value:'支',
              label: '支'
            },
          ],

          Edite : true, //标志位 判断的是新增还是更新

          param :{},//新增入账代码里的内容

          //  入账代码的内容
          income_list:[],//考勤一览表




        }
      },
      created:function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        console.info(that.authorization);
        that.enter_code();//获取入账代码
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
        //封装获取考勤列表
        enter_code(){
          let that=this
          that.$axios({
            url: that.api+"/v1/manage/duty_record/hotel_records",
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
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/manage/duty_record/hotel_records",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },

          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                that.income_list=res.data.data.list
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
  .summary_one{
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
