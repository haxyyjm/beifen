<template>
  <div class="checkstand">
    <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">收银点</span>
    <el-button type="text" @click="dialogVisible = true;flush()">
      <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
    </el-button>
    <!--票据种类 -->
    <div class="shopping">
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="register_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="desc"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="code"
            label="代码">
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="150"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="create_user.user_name"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="modify_time"
            width="150"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="modify_user.user_name"
            label="修改用户">
          </el-table-column>
          <el-table-column
            prop="dept_id.name"
            label="所在部门">
          </el-table-column>
          <el-table-column
            prop="mac"
            label="IP地址">
          </el-table-column>
          <el-table-column
            prop="initial_cash"
            label="起始备用金">
          </el-table-column>
          <el-table-column
            prop="address"
            width="150 "
            fixed="right"
            label="操作">
            <template slot-scope="scope" >
              <el-button  size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, register_list)"  >删除</el-button>
              <el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, register_list)">修改</el-button>
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
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <span style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述 ：</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>IP地址 ：</span>
            <el-input v-model="param.mac" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>起始备用金 ：</span>
            <el-input v-model="param.initial_cash" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>所属部门 ：</span>
            <el-select v-model="belong_to_balance" placeholder="请选择" style="width: 200px;">
              <el-option
                v-for="item in dept_list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
        name: "checkstand",
        data() {
          return {
            api:"http://47.98.113.173:9519",
            //分页
            total:10,
            pagesize:10,
            Edite : true, //标志位 判断的是新增还是更新
            dialogVisible: false,//修改页面的显示和隐藏
            register_list:[],//获得所有的收银点设置
            dept_list:[],//部门
            param:{},
          //  收银点设置的内容
            desc:'',//中文描述
            desc_en:'',//英文描述
            code:'',//代码
            create_user:'',//创建人
            create_date:'',//创建时间
            modify_user:'',//修改用户
            modify_date:'',//修改时间
            belong_to_balance:'',//所在部门
            mac:'',//地址
            initial_cash:'',//起始备用金




          }
        },
      created:function () {
        let that= this;
        that.cash_register();
        that. examine();
      },
        methods: {
          //封装错误信息
          error_message(msg){
            this.$message.error('错了哦，错误消息为'+msg);
          },
          //封装获取收银点设置
          cash_register(){
            let that=this
            that.$axios({
              url: ""+that.api+"/v1/finance/cash_register/info_list",
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                if (res.data.message=="success"){
                  console.log(res)
                  that.register_list=res.data.data.list
                  that.total=res.data.data.total_count;
                }
                else{
                  console.log(res.data.message);
                  that.error_message(res.data.message)
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
              url: ""+that.api+"/v1/common/dept/info_list",
              method: "post",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
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
              mac:'',//地址
              initial_cash:'',//起始备用金
            }
              that.belong_to_balance=''//归属部门


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
                url:""+that.api+"/v1/finance/cash_register/remove/"+id,
                method: "get",
                headers: {
                  authorization: sessionStorage.getItem("authorization"),
                }
              })
                .then(res=>{
                  console.log(res)
                  if(res.data.message==="success"){
                    that.cash_register();
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
              that.param.desc=srow.desc,//中文描述
              that.param.desc_en=srow.desc_en,//英文描述
              that.param.code=srow.code,//代码
              that.belong_to_balance=srow.dept_id.id//归属部门
              that.param.mac=srow.mac,//地址
              that.param.initial_cash=srow.initial_cash//起始备用金


          },
          //点击入账代码新增和修改后的保存
          ensure(){
            let that=this;
            if(that.param.code===""||that.belong_to_balance==="" ||that.param.mac==="" ||that.param.initial_cash===""){
              that.hintInfo("warning", "*为必填项")
            }else {
            let urldata = that.Edite ? (""+that.api+"/v1/finance/cash_register/update/"+that.id) :  (""+that.api+"/v1/finance/cash_register/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data:{
                //  入账代码的内容
                desc:that.param.desc,//中文描述
                desc_en:that.param.desc_en,//英文描述
                code:that.param.code,//代码
                dept_id:that.belong_to_balance,//归属部门
                mac:that.param.mac,//ip地址
                initial_cash:that.param.initial_cash,//起始备用金

              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message=="success"){
                  that.cash_register();
                  that.dialogVisible = false;
                }
                else{
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
            }
          },

          //修改页面的显示和隐藏
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
          //点击分页上的页数
          handleCurrentChange(curPage) {
            let that=this
            console.log(curPage) // 当前页}
            //获取信息列表
            that.$axios({
              url: ""+that.api+"/v1/common/module/info_list",
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
                  // var resp = res.data.data;
                  // var new_lists = resp['list'];
                  // var total_count= resp['total_count'];
                  that.newlists=res.data.data.list
                }
                else{
                  // console.log(resp.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
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
  .checkstand{
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
          width: 110px;
        }
      }
    }
  }
</style>


