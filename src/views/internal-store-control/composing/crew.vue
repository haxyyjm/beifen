<template>
  <div class="crew">
    <!--支付方式 -->
    <div class="shopping">
      <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">人员排班列表</span>
      <el-button type="text" @click="dialogVisible = true; flush()">
        <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
      </el-button>
      <div style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
        <el-select v-model="dept_id" clearable  placeholder="请选择部门搜索">
          <el-option
            v-for="item in dept_list"
            :key="item.value"
            :label="item.name"
            style="margin-top: 20px"
            :value="item.id">
          </el-option>
        </el-select>
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
          :cell-style="{textAlign:'center'}"
          max-height="700"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="dept_id.name"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="user_id.real_name"
            label="人员">
          </el-table-column>
          <el-table-column
            prop="user_id.id"
            label="人员ID">
          </el-table-column>
          <el-table-column
            prop="shift_id.desc_cn"
            label="班次">
          </el-table-column>
          <el-table-column
            prop="shift_id.days_per_week"
            label="每周工作天数">
          </el-table-column>

          <el-table-column
            prop="start_date"
            label="起始日期">
          </el-table-column>
          <el-table-column
            prop="end_date"
            label="终止日期">
          </el-table-column>

          <el-table-column
            prop="address"
            width="150 "
            fixed="right"
            label="操作">
            <template slot-scope="scope" >
              <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>
              <el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>
            </template>
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
      <!--点击新增修改显示的页面-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>归属部门 ：</span>
            <el-select v-model="dept_id" placeholder="请选择" clearable style="width: 220px;">
              <el-option
                v-for="item in dept_list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>人员 ：</span>
            <el-select v-model="user_id" placeholder="请选择"  clearable style="width: 220px;">
            <el-option
              v-for="item in employee_list"
              :key="item.value"
              :label="item.real_name"
              :value="item.id">
            </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>班次 ：</span>
            <!--<el-input v-model="param.in_or_out" placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <el-select v-model="shift_id" placeholder="请选择"  clearable  style="width: 220px;">
              <el-option
                v-for="item in number_list"
                :key="item.value"
                :label="item.desc_cn"
                :value="item.id">
              </el-option>
            </el-select>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>起始日期 ：</span>
            <el-date-picker
              v-model="start_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>

          </li>

          <li >
            <i style="color: red;font-size: 18px">*</i>
            <span>终止日期 ：</span>
            <el-date-picker
              v-model="end_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>


          </li>

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "crew",
        data() {
          return {
            api:"http://47.98.113.173:9503",
            //分页
            total:20,
            pagesize:5,
            dialogVisible: false,//修改页面的显示和隐藏
            //工作天数
            in_out:[
              {
                value:'1',
                label: '七 天'
              }, {
                value:'2',
                label: '六 天'
              },
              {
                value:'3',
                label: '五 天'
              },
              {
                value:'4',
                label: '四 天'
              },
              {
                value:'5',
                label: '三 天'
              },
              {
                value:'6',
                label: '二 天'
              },
              {
                value:'7',
                label: '一 天'
              },

            ],
            income_list:[],//收支列表
            dept_list:[],//部门
            employee_list:[],//人员列表
            id:"",//选中修改项的id
            Edite : true, //标志位 判断的是新增还是更新
            number_list:[],//获取班次
            param :{},//新增入账代码里的内容

            //  人员排班
            dept_id:'',//归属部门
            start_date:'',//开始时间
            end_date:'',//结束时间
            user_id:'',//人员
            shift_id:''//班次

          }
        },
        created:function () {
          let that = this;
          // that.authorization = sessionStorage.getItem("authorization");
          console.info(that.authorization);
          that.enter_code();//获取入账代码
          that.number_runsr();
          that.examine();
          that.employee();//获取人员列表
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



            }
              that.dept_id='',//归属部门
              that.start_date='',//开始时间
              that.end_date='',//结束时间
              that.user_id='',//人员
              that.shift_id=''//班次

          },

          //封装获取人员列表
          employee(){
            this.$axios({
              url: "http://47.98.113.173:9519/v1/common/employee/info_list",
              method: "post",
              headers:{
                authorization:sessionStorage.getItem("authorization"),
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

          //封装班次列表
          number_runsr(){
            let that=this
            that.$axios({
              url: ""+that.api+"/v1/manage/duty_shift/hotel_shifts",
              method: "get",
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res.data.message)
                if (res.data.message=="success"){
                  console.log(res.data)
                  that.number_list=res.data.data.list
                  that.total=res.data.data.total_count;
                }
                else{

                  that.error_message(res.data.message)
                  console.log(res.data.message);
                }

              })
              .catch(error=>{
                console.log(error);
              });

          },
          //查看部门信息
          examine(){
            let that = this;
            that.$axios({
              url: "http://47.98.113.173:9519/v1/common/dept/info_list",
              method: "post",
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data);
                  that.dept_list=res.data.data.list;

                }
                else{
                  console.log(res.data.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          },
          //封装获取人员排班列表
          enter_code(){
            let that=this
            that.$axios({
              url: that.api+"/v1/manage/duty_schedule/hotel_schedules",
              method: "get",
              headers:{
                authorization:sessionStorage.getItem("authorization"),
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
              url: ""+that.api+"/v1/manage/duty_schedule/hotel_schedules",
              method: "get",
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              },
              params:{
                page_num:curPage,
                page_size:that.pagesize
              },

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
          //  点击删除
          cancel(id,index,list){
            console.log(id);
            console.log(index);
            console.log(list);
            let that = this;
            that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              list.splice(index, 1);
              that.$axios({
                url:""+that.api+"/v1/manage/duty_schedule/delete/"+id,
                method: "get",
                params:{
                  remark:0,
                },
                headers:{
                  authorization:sessionStorage.getItem("authorization"),
                }
              })
                .then(res=>{
                  console.log(res)
                  if(res.data.message==="success"){
                    that.enter_code();
                  }

                })
                .catch(error=>{
                  console.log(error);
                })

            }).catch(() => {
              that.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //点击修改
          amend(srow,id,index,list){
            let that = this;
            that.Edite = true;
            that.id=id;
            console.log(srow);
            //  入账代码的内容
              that.dept_id =srow.dept_id.id,//归属部门
             that.start_date=srow.start_date,//开始时间
            that.end_date=srow.end_date,//结束时间
            that.user_id=srow.user_id.id,//人员
            that.shift_id=srow.shift_id.id//班次
          },
          //点击人员新增和修改后的保存
          ensure(){
            let that=this;
            if(!that.dept_id ||!that.start_date ||!that.end_date ||!that.user_id ||!that.shift_id){
              that.hintInfo("warning", "*为必填项")
            }else {
              let urldata = that.Edite ? ("" + that.api + "/v1/manage/duty_schedule/update/" + that.id) : ("" + that.api + "/v1/manage/duty_schedule/add");
              console.info(urldata);
              that.$axios({
                url: urldata,
                method: "post",
                data: {
                  //  入账代码的内容
                  dept_id: that.dept_id,//归属部门
                  start_date: that.start_date,//开始时间
                  end_date: that.end_date,//结束时间
                  user_id: that.user_id,//人员
                  shift_id: that.shift_id//班次
                },
                headers: {
                  authorization: sessionStorage.getItem("authorization"),
                }

              })
                .then(res => {
                  if (res.data.message == "success") {
                    that.enter_code();
                    that.dialogVisible = false;
                  }
                  else {
                    that.error(res.data.message)
                    console.log(res.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }
          },

          //点击搜索
          search(){
            let that=this
            that.$axios({
              url: that.api+"/v1/manage/duty_schedule/hotel_schedules",
              method: "post",
              data:{
                dept_id:that.dept_id,
              },
              headers:{
                authorization:sessionStorage.getItem("authorization"),
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

          //修改页面的显示和隐藏
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
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

<style lang="less" scoped>
  .crew{
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
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
    /*z-index: 0;*/
  /*}*/
  /*.el-date-editor.el-input{*/
    /*width: 220px;*/
  /*}*/
</style>

