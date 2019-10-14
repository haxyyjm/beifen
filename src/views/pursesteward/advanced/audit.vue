<template>
  <div class="audit">
    <!--支付方式 -->
    <div class="shopping">
      <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">查账原因</span>
      <el-button type="text" @click="dialogVisible = true;flush()">
        <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
      </el-button>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <!--<el-table-column-->
            <!--prop="in_or_out"-->
            <!--label="收/支">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="desc"
            label="中文描述">
          </el-table-column>

          <el-table-column
            prop="is_sys"
            label="是否系统码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_sys === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_group "
            label="是否集团码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_group === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="150"
            label="创建时间">
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
            prop="name"
            label="查帐原因">
            <template slot-scope="scope">
              <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>

          <!--查帐原因-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="查帐原因 : ">
                  <span>{{ props.row.name }}</span>
                </el-form-item>

              </el-form>
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
      <!--点击新增修改显示的页面-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li >
            <span style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否是系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否集团码 ：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span style="vertical-align: top">查账原因 ：</span>
            <!--<el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <textarea style="width: 200px; height: 100px;resize: none" v-model="name "></textarea>
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
        name: "audit",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          //分页
          total:10,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          income_list:[],//查账原因列表
          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新
          param :{},//新增查账里的内容

          //  查账原因的内容
          desc:'',//中文描述
          is_sys:1,//是否系统码
          is_group:1,//是否集团码
          create_time:'',//创建时间
          create_user:'',//创建用户
          modify_time:'',//修改时间
          modify_user :"",//修改用户
          name:'',//查账原因

        }
      },
      created:function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        console.info(that.authorization);
        that.enter_code();//获取查账原因
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
            create_time:'',//创建时间
            create_user:'',//创建用户
            modify_time:'',//修改时间
            modify_user :"",//修改用户

          }
             that.is_sys='',//是否系统码
            that.is_group="",//是否集团码
            that.name=''//查账原因


        },
        //封装获取查账原因
        enter_code(){
          let that=this
          that.$axios({
            url: ""+that.api+"/v1/finance/check_account_reason/info_list",
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
            url: ""+that.api+"/v1/finance/check_account_reason/info_list",
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
              url:""+that.api+"/v1/finance/check_account_reason/remove/"+id,
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
          that.Edite = true;
          that.id=id;
          console.log(srow);
          //  入账代码的内容
            that.param.desc=srow.desc,//中文描述
            that.is_sys=srow.is_sys +"",//是否系统码
            that.is_group=srow.is_group+"",//是否集团码
             that.name = srow.name//查账原因
        },
        //查账原因的新增和修改后的保存
        ensure(){
          let that=this;
          if(!that.is_sys || !that.is_group ||!that.name){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ? ("" + that.api + "/v1/finance/check_account_reason/update/" + that.id) : ("" + that.api + "/v1/finance/check_account_reason/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                //  入账代码的内容
                desc: that.param.desc,//中文描述
                is_sys: that.is_sys,//是否系统码
                is_group: that.is_group,//是否集团码
                name: that.name,//查账原因
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
  .audit{
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
<style>
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*!
    z-index: 0;
  }*/
</style>

