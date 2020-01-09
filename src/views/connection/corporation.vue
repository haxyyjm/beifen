<template>
  <div class="corporation">
    <header style="margin: 10px;overflow: hidden">
      <p style="font-size: 16px;display: inline-block;font-weight: bold" >OTA公司</p>
      <el-button type="primary" size="mini" style="width: 80px;margin-left: 20px;" @click="add">新增</el-button >
    </header>
    <div class="content ">
      <el-table
        :data="corporation_list"
        size="mini"
        height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="name"
          label="OTA公司">
        </el-table-column>

        <el-table-column
          prop="create_user"
          label="创建者">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="modify_user"
          label="修改用户">
        </el-table-column>

        <el-table-column
          prop="address"
          width="180 "
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, corporation_list)">删除</el-button>
            <el-button size="mini"
                       @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, corporation_list) ">修改</el-button>
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
      :close-on-click-modal='false'
      width="40%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name">{{ title }}</span>
      </div>
      <ul class="dialog_style">
        <li >
          <!--<i style="color: red;font-size: 18px">*</i>-->

          <span>OTA公司名称 ：</span>
          <el-input v-model="param.name" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>

      </ul>

      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false;" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "corporation",
      data () {
        return {
          url:this.api.api_9530_9503,
          pagesize:10,
          total:10,
          dialogVisible:false,
          Edite:true, //标志位 判断的是新增还是更新
          //  新增内容
          param:{},
          title:'',
          duration:"0",
          id:'',//修改的id
          corporation_list:[],//ota房型list
          name:'',
        }
      },
      created(){
        let that =this;
        that.visitant();//获取访客登记的列表

      },
      methods: {
        //刷新数据
        flush() {
          let that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            name:'' ,
          };

        },
        /**获取ota公司的数据*/
        visitant() {
          let that = this;
          that.$axios({
            url: that.url + "/v1/ota/company/list",
            method: "get",
            params:{
              page_size:10,
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.corporation_list = res.data.data.list;
                console.log(that.corporation_list);
                that.total = res.data.data.total_count;

              } else {
                console.log(res);
                that.hintInfo("warning", res.data.data.message)
              }
            })
            .catch(err => {
              console.error(err)
            })
        },
        //新增ota公司
        add() {
          let that = this;
          that.dialogVisible = true;
          that.title = "新增公司";
          that.flush();
        },
        /**修改ota公司*/
        amend(row, id) {
          let that = this;
          that.Edite = true;
          console.log(row, id);
          that.title = "修改OTA公司"
          that.id = id;
          that.param = {
            name:row.name ,
          };

        },
        /**删除otaOTA公司*/
        cancel(id, index, list) {
          console.log(id);
          let that =this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$axios({
              url:  that.url + "/v1/ota/company/delete/" + id,
              method: "post",
            })
              .then(res => {
                console.log(res)
                if (res.data.message === "success") {
                  that.visitant();
                  that.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  list.splice(index, 1);
                }
                // location.reload(); // 强制刷新
              })
              .catch(error => {
                console.log(error);
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /**新增修改otaOTA公司确定*/
        ensure(){
          let that =this;
          let url = that.Edite ? (that.url + "/v1/ota/company/update/" + that.id) : (that.url + "/v1/ota/company/add");
          that.$axios({
            url: url,
            method: "post",
            data: {
              name:that.param.name,//ota上面的OTA公司名称
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                if (that.Edite) {
                  that.hintInfo("success", "修改OTA公司成功")
                } else {
                  that.hintInfo("success", "新增OTA公司成功")
                }
                that.dialogVisible = false;
                that.visitant();
              } else {
                if (that.Edite) {
                  that.hintInfo("warning", "修改OTA公司失败")
                } else {
                  that.hintInfo("warning", "新增OTA公司失败")
                }

              }
            })
            .catch(err => {
              console.error(err)
              if (that.Edite) {
                that.hintInfo("warning", "修改OTA公司失败")
              } else {
                that.hintInfo("warning", "新增OTA公司失败")
              }
            })
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage);
          let that =this;
          that.$axios({
            url:that.url+"/v1/ota/company/list",
            method:"get",
            params:{
              page_num:curPage
            }
          })
            .then(res=>{
              if(res.data.message==="success"){
                console.log(res);
                that.corporation_list = res.data.data.list;
                console.log(that.corporation_list);
                that.total = res.data.data.total_count;
              }
            })
            .catch(err=>{
              console.error(err)
            })

        },
        //修改页面的显示和隐藏
        handleClose(done) {
          done();
        },

        /**
         * @hintInfo 操作提示信息
         * @param hint  成功提示
         * @param info 警告信息
         */
        hintInfo: function (hint, info) {
          let that = this;
          if (hint === "success") {
            that.$message({
              message: info,
              type: 'success'
            });
          } else if (hint === "warning") {
            that.$message({
              message: info,
              type: 'warning'
            });
          } else {
            this.$message.error('出错了！');
          }
        },

      },
    }
</script>

<style  scoped  lang="less">
  .corporation{
    width: 97%;
    margin-left: 4px;
    .dialog_style {
      margin-left: 20px;
      /*overflow: hidden;*/
      li {
        /*float: left;*/
        /*width: 50%;*/
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 132px;
          text-align: right;
        }
      }
    }
  }
</style>
