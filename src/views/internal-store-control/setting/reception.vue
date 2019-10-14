<template>
  <div class="reception">
    <div class="title">
      <i class="el-icon-setting" style="font-size: 40px ;line-height: 70px;color:#777777FF"></i>
      <span style="color:#777777FF">基础信息设置</span>
    </div>
    <div class="label">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" >
        <!--保密-->
        <el-tab-pane label="保密级别" name="first">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="add();dialogVisible=true;flush()">新增</button>
          <!--保密-->
          <el-table
          :data="rmchg_reason_list"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          size="mini"
          style="width: 100%">
          <el-table-column
          prop="code"
          label="代码">
          </el-table-column>
          <el-table-column
          prop="descript"
          label="中文描述"
          width="180">
          </el-table-column>
          <el-table-column
          prop="descript_en"
          label="英文描述">
          </el-table-column>
          <el-table-column
          prop="is_halt"
          label="是否停用">
          <template slot-scope="scope">
          <span v-if="scope.row.is_halt === 0">否</span>
          <span v-else>是</span>
          </template>
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
          prop="is_group"
          label="是否集团码">
          <template slot-scope="scope">
          <span v-if="scope.row.is_group === 0">否</span>
          <span v-else>是</span>
          </template>
          </el-table-column>
          <el-table-column
          prop="create_user"
          label="创建者">
          </el-table-column>
          <el-table-column
          prop="modify_user"
          label="修改者">
          </el-table-column>
          <el-table-column
          prop="modify_datetime"
          label="修改时间">
          </el-table-column>
          <el-table-column
          prop="address"
          width="100"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
          <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, rmchg_reason_list);dialogVisible=true">修改</el-button>
          </template>
          </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
            <ul class="dialogVisible_style" >
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>代码 ：</span>
                <el-input v-model="param.code" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span >中文描述 ：</span>
                <el-input v-model="param.descript" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span >英文描述 ：</span>
                <el-input v-model="param.descript_en" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否停用 ：</span>
                <el-radio v-model="is_halt" label="1">正常</el-radio>
                <el-radio v-model="is_halt" label="0">停用</el-radio>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否集团码 ：</span>
                <el-radio v-model="is_group" label="1">是</el-radio>
                <el-radio v-model="is_group" label="0">否</el-radio>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否系统码 ：</span>
                <el-radio v-model="is_sys" label="1">是</el-radio>
                <el-radio v-model="is_sys" label="0">否</el-radio>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div></template>
<script>
    export default {
        name: "reception",
      // secret
      data() {
        return {
          activeName2: 'first',
          api:'http://47.98.113.173:9103',
          input: '',
          amend:true,
          dialogVisible:false,//预定类型
          Edite:true,//标志位
          delete_id:false,//删除的显示与隐藏
          save:true,
          tableData:[],

          total:10,//总条数
          pagesize:10,
          /**
           * 预定类型
           * */
          rmchg_reason_list:[],//预定类型列表
          param:{},
          code:"",//代码
          descript_en:'',//英文说明
          descript:'',//中文说明
          is_halt:"",//是否停用
          is_sys :"",//是否系统吗
          is_group:"",//是否集团码
          id:'',


        };
      },
      created:function () {
        let that = this;
        that.rmchg_reason();
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab);
          let that = this;
          if(tab.label==="预定类型"){
            that.rmchg_reason();
          }
        },
        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            code:"",//代码
            descript_en:'',//英文说明
            descript:'',//中文说明
          }
          that.is_halt="",//是否停用
            that.is_sys ="",//是否系统吗
            that.is_group=""//是否集团码

        },

        /**
         * 保密  secret
         * */
        //封装获取保密
        rmchg_reason(){
          let that= this;
          //获取信息列表
          that.$axios({
            url:that.api+"/v1/system/settings/get_code_base_list/?parent_code=secret",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.rmchg_reason_list=res.data.data.results;
                that.total=res.data.data.count;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //新增保密
        add(){
          let that = this;
          that.delete_id = false;

        },
        //修改保密
        submit(srow,id,index){
          let that = this;
          that.Edite = true;
          that.delete_id=true;
          that.id = srow.id;//所选择的id
          that.index = index;
          console.log(srow,id,index);
          that.param.code = srow.code;
          that.param.descript_en=srow.descript_en;
          that.param.descript = srow.descript;
          that.is_halt = srow.is_halt+"";//是否停用
          that.is_sys =srow.is_sys+"";//是否系统吗
          that.is_group=srow.is_group+"";//是否集团码
        },
        //新增和修改保密的保存
        ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'secret',
                code:that.param.code,
                is_halt:parseInt(that.is_halt),//是否停用
                is_sys:parseInt(that.is_sys),//是否系统码
                is_group:parseInt(that.is_group),//是否集团码
                descript_en:that.param.descript_en,//英文说明
                descript:that.param.descript,//中文说明
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  console.log("chenggong");
                  that.rmchg_reason();
                  that.dialogVisible = false
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
        //保密的删除
        cancel(){
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
            that.tableData.splice(that.index, 1);
            that.$axios({
              url:"http://47.98.113.173:9103/v1/system/settings/remove_code_base/" + that.id + '/',
              method: "post",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  that.rmchg_reason();
                  that.dialogVisible = false
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
        //保密的点击分页上的页数
        handleCurrentChange(curPage) {
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'secret',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.rmchg_reason_list=res.data.data.results;
                that.total=res.data.data.count;
              }
              else{
                console.log(res.data.message);
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
        //修改页面的显示和隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },

      }
    }
</script>

<style   lang="less" scoped>
  .reception{
    width:99%;
    margin-left: 20px;
    .title{
      width:100%;
      height: 70px;
      span{
        display: inline-block;
        height: 66px;
        line-height: 70px;
        vertical-align: top;
        margin-left:10px;
      }
    }
    .label{
      margin-top: 18px;
      .dialogVisible_style{
        width: 100% ;
        overflow: hidden;
        li{
          width: 50%;
          float: left;
          margin-bottom: 10px;
          span{
            display: inline-block;
            width: 80px;
          }
        }
      }
      .amend ,.save{
        /*width: calc(100% - 128px);*/
        height: 44px;
        line-height: 44px;
        background:rgba(247,247,247,1);
        margin-bottom: 7px;
        overflow: hidden;
        min-width: 1000px;
        position: relative;
        div{
          position: absolute;
          top: 0px;
          right: 0;
          span{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(104,129,158,1);
          }
        }
      }
      .search{
        width: 100%;
        height: 50px;
        background:rgba(247,247,247,1);
        span{
          margin: 0  16px;
        }
        input{
          width: 200px;
          height: 40px;
          margin: 5px 0;
          padding-left: 5px;
        }
        button{
          width: 80px;
          height: 40px;
          border-radius: 4px;
          border: none;
          background:#4488E9FF ;
          outline: none;
          color: white;
          margin-left: 20px;
        }
      }
    }

  }
</style>
