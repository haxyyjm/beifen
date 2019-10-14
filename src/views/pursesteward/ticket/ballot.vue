<template>
  <div class="ballot">
    <!--头部的搜索-->
    <ul class="title">
      <li>
        <div class="block">
          <span class="demonstration">营业日期起 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="biz_start"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
      <li>
        <div class="block">
          <span class="demonstration">营业日期止 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="closing_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
      <li>
        <el-radio v-model="personage" label="0">个人</el-radio>
        <el-radio v-model="personage" label="1">公司</el-radio>



        <!--<span style="margin-right: 10px">个人 ：</span>-->
        <!--<el-checkbox v-model="personage" @change="personage_click"></el-checkbox>-->
      </li>
      <!--<li>-->
        <!--<span style="margin-right: 10px"> 公司 ：</span>-->
        <!--<el-checkbox v-model="company"  @change="company_click"></el-checkbox>-->
      <!--</li>-->
      <li><button @click="date_click">查找</button></li>
    </ul>
    <!--支付方式 -->
    <div class="shopping">
      <!--账户种类 状态 ... -->
      <div class="status" style="margin-top: 10px">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
          prop="code_bill_type_id"
          label="单据种类">
          </el-table-column>
          <el-table-column
          prop="person_or_corp"
          label="个人/公司">
            <template slot-scope="scope">
              <span v-if="scope.row.person_or_corp ===  0">个人</span>
              <span v-else>公司</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_merged"

            label="是否合并开票">
            <template slot-scope="scope">
              <span v-if="scope.row.is_merged ===  1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="总开票金额">
          </el-table-column>
          <el-table-column
            prop="pay_detail_id"
            label="合并开票账户的数量">
          </el-table-column>
          <el-table-column
            prop="gen_date"
            width="140"
            label="开票日期">
          </el-table-column>
          <el-table-column
            prop="gen_user"
            label="开票人">
          </el-table-column>
          <el-table-column
            prop="check_time"
            width="140"
            label="复核时间">
          </el-table-column>
          <el-table-column
            prop="check_user_id"
            label="复核人">
          </el-table-column>

          <el-table-column
            prop=" fields"
            width="100"
            fixed="right"
            label="查看更多详情">
            <template slot-scope="scope" >
              <el-button size="mini" @click="dialog_check = true; fields_list(scope.row,scope.row.id,scope.$index, income_list) ">查看</el-button>
            </template>
          </el-table-column>


          <el-table-column
            prop="address"
            width="180 "
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
      <!--点击修改显示的页面-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>单据种类 ：</span>
            <el-input v-model="param.code_bill_type_id" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>个人/公司 ：</span>
            <el-radio v-model="person_or_corp" label="1">个人</el-radio>
            <el-radio v-model="person_or_corp" label="0">公司</el-radio>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >是否合并开票 ：</span>
            <el-radio v-model="is_merged" label="1">是</el-radio>
            <el-radio v-model="is_merged" label="0">否</el-radio>
          </li>
          <li>
            <span style="margin-left: 10px">总开票金额 ：</span>
            <el-input v-model="param.amount" placeholder="请输入内容" style="width: 200px;" :disabled="true"></el-input>
          </li>
          <li>
            <span style="display: inline-block;width: 150px">合并开票账户的数量 ：</span>
            <el-input v-model="param.pay_detail_id" placeholder="请输入内容" style="width: 200px;" :disabled="true"></el-input>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>
             </span>
      </el-dialog>
      <!--点击查看字段自定义的页面-->
      <el-dialog
        title=""
        :visible.sync="dialog_check"
        width="80%"
        :before-close="handleClose">
        <p style="padding: 10px;font-weight: bold">更多详情</p>
        <div class="status">

           <!--更多详情的内容   遍历对象-->
          <ul v-for="(value, key) in segment_list">
              <li style="width: 50%;float: left;margin-bottom: 10px">
                <span style="display: inline-block;width: 120px">{{ key }}：</span>
                <span style="display: inline-block;width: 300px;height: 40px;border: 1px solid #dcdfe6;line-height: 40px;padding-left: 10px;border-radius: 4px">{{ value }}</span>
              </li>
          </ul>


        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_check = false">取 消</el-button>
             </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
    export default {
        name: "ballot",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          //分页
          total:5,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          dialog:false,//字段定义的显示和隐藏
          dialog_check:false,//字段自定义的查看显示与隐藏
          income_list:[],//票据列表
          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新
          param :{},//新增入账代码里的内容

          //  修改票的内容
          code_bill_type_id :'',//单据种类
          person_or_corp:'',//个人/公司
          is_merged:'',//是否合并开票
          amount:'',//总开票金额
          pay_detail_id:'',//合并开票账户的数量
          model_id:'',
          total_fields:1,//total
          p_fields:10,//每页展示
          segment_list:{},//获取字段自定义
          not_null: '1',//是否为空
          field_name:'',//字段名称
          field_type:'',//字段类型
          field_desc:'',//字段说明

          /*
        * 筛选条件
        * */
          biz_start:'',//筛选条件起始时间
          closing_date:'',//筛选条件营业日期止
          personage:'0',

          //消费清单
          activeName2: 'first',
          branch_data:'',//部门id

          model_id:"",//模型id




        }
      },
      created:function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        that.enter_code();//获取票
      },

      props:['branch_id'],
      watch:{
        //  父级传过来的部门id
        branch_id:function (newData,oldData) {
          this.branch_data=newData
          console.log(newData);
        }
      },
      methods: {
        //封装错误信息
        error_message(msg){
          this.$message.error('错了哦，错误消息为'+msg);
        },
        //筛选
        date_click(value){
          console.log(value);
          let that=this
          if(that.biz_start!=="" && that.closing_date!==""){
            that.$axios({
              url: that.api+"/v1/finance/bill_detail/info_list",
              method: "post",
              data:{
                // pay_mode_id:that.tabvelue,
                field_name:'create_time',
                begin_time:that.biz_start,
                end_time:that.closing_date,
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                if (res.data.message=="success"){
                  console.log(res.data.data)
                  that.income_list=res.data.data.list;
                }
                else{
                  console.log(res.data.message);
                  that.error_message(res.data.message)
                }

              })
              .catch(error=>{
                console.log(error);
              });
          }else {
            that.hintInfo("warning", "请选择筛选条件")
          }


        },

        //获取票列表
        enter_code(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/bill_detail/info_list",
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
            url: that.api+"/v1/finance/bill_detail/info_list",
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
              url:""+that.api+"/v1/finance/pay_mode/remove/"+id,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
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
          that.id=srow._id;
          console.log(srow,id,index);
          //  付款方式
              that.param.code_bill_type_id=srow.code_bill_type_id, //单据种类
              that.person_or_corp=srow.person_or_corp +"",//个人公司
              that.is_merged=srow.is_merged+"",//是否合并开票
            that.param.amount=srow.amount,//总开票金额
            that.param.pay_detail_id=srow.pay_detail_id,//合并开票账户的数量
          that.model_id=srow.model_id
        },
        //点击付款方式新增和修改后的保存
        ensure(){
          let that=this;
          if(!that.param.code_bill_type_id || !that.person_or_corp ||!that.is_merged || !that.param.amount ||!that.param.pay_detail_id){
            that.hintInfo("warning", "*为必填项")
          }else {

            // let urldata = that.Edite ? (that.api+"/v1/finance/pay_mode/update/"+that.id) :  (that.api+"/v1/finance/pay_mode/add");
            // console.info(urldata);
            that.$axios({
              url: that.api + "/v1/finance/bill_detail/update",
              method: "post",
              data: {
                //  入账代码的内容
                item_id:that.id,
                code_bill_type_id: that.param.code_bill_type_id,//票据种类
                person_or_corp: that.person_or_corp + "",//个人还是公司
                is_merged: that.is_merged + "",//是否合并开票
                amount: that.param.amount,//总开票金额
                pay_detail_id: that.param.pay_detail_id,//合并开票账户数量
                type_id:that.model_id,
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

        /*
        * 字段自定义
        *
        * */
        //查看字段自定义的信息
        fields_list(srow,id,index,list){
          let that=this
          console.log(srow, index, list);
          that.$axios({
            url: that.api+"/v1/finance/bill_detail/pretty_info",
            method: "post",
            data:{
              model_id:srow.model_id,
              item_id: srow._id,
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.segment_list=res.data.data
                that.total_fields=res.data.data.total_count;
              }
              else{
                // that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },
        //点击修改字段自定义
        recompose(srow,id,index,list){
          let that = this;
          that.Edite = true;
          that.id=id;
          console.log(srow);
          that.param. field_name=srow.field_name, //字段名称
            that.field_type=srow.field_type,//字段类型
            that.param.field_desc=srow.field_desc,//字段说明
            that.not_null=srow.not_null +""//是否可以为空

        },
        //点击字段定义的新增和修改后的保存
        augment(){
          let that=this;
          let urldata = that.Edite ? (that.api+"/v1/finance/pay_mode/update_field/"+that.id) :  (that.api+"/v1/finance/pay_mode/add_field");
          console.info(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data:{
              //  入账代码的内容
              model_id:that.model_id,
              field_name:that.param.field_name,//字段名称
              field_type:that.field_type,//字段类型
              field_desc :that.param.field_desc,//字段说明
              not_null:that.not_null+"",//是否可以为空
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message=="success"){
                //刷新修改后的数据
                that.$axios({
                  url: that.api+"/v1/finance/pay_mode/get_fields",
                  method: "post",
                  data:{
                    model_id:that.model_id,
                  },
                  headers: {
                    authorization: sessionStorage.getItem("authorization"),
                  }
                })
                  .then(res=>{
                    if (res.data.message=="success"){
                      console.log(res.data.data)
                      that.segment_list=res.data.data.list
                      that.total=res.data.data.total_count;
                    }
                    else{
                      // that.error_message(res.data.message)
                    }

                  })
                  .catch(error=>{
                    console.log(error);
                  });
              }
              else{
                that.error(res.data.message)
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //点击字段自定义的删除
        expurgate(id,index,list){
          console.log(id, index, list);
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
              url:that.api+"/v1/finance/bill_type/remove_field/"+id,
              method: "post",
              data:{
                model_id:that.model_id,
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  //刷新修改后的数据
                  that.$axios({
                    url: that.api+"/v1/finance/pay_mode/get_fields",
                    method: "post",
                    data:{
                      model_id:that.model_id,
                    }
                  })
                    .then(res=>{
                      if (res.data.message=="success"){
                        console.log(res.data.data)
                        that.segment_list=res.data.data.list
                        that.total=res.data.data.total_count;
                      }
                      else{
                        // that.error_message(res.data.message)
                      }

                    })
                    .catch(error=>{
                      console.log(error);
                    });
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
        //点击分页上的页数
        handleCurrentCe(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/finance/pay_mode/get_fields",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.p_fields
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
  .ballot{
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow-y: scroll;
    /*overflow: hidden;*/

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
          width: 110px;
        }
      }
    }
  }
</style>
<style>

  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
    /*z-index: 0;*/
  /*}*/

</style>
