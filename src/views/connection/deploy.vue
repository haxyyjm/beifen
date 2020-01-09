<template>
  <div class="deploy">
    <header style="margin: 10px;overflow: hidden">
      <p style="font-size: 16px;display: inline-block;font-weight: bold" >OTA配置</p>
      <el-button type="primary" size="mini" style="width: 80px;margin-left: 20px;" @click="add">新增</el-button >
    </header>
    <div class="content ">
      <el-table
        :data="corporation_list"
        size="mini"
        height="620"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="account_no"
          label="OTA账号">
        </el-table-column>
        <el-table-column
          prop="login_user"
          label="OTA登陆用户名">
        </el-table-column>
        <el-table-column
          prop="contact_person"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="contact_mobile"
          label="联系人手机">
        </el-table-column>
        <el-table-column
          prop="contact_weixin"
          label="联系人微信">
        </el-table-column>
        <el-table-column
          prop="contact_qq"
          label="联系人QQ">
        </el-table-column>
        <el-table-column
          prop="rate_code_id.description"
          label="房价码">
        </el-table-column>
        <el-table-column
          prop="commission_percent"
          label="OTA体成">
          <template slot-scope="scope">
            <span>{{scope.row.commission_percent}}%</span>
          </template>
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
          <span> <i style="color: red;font-size: 18px">*</i>酒店OTA登陆账号 ：</span>
          <el-input v-model="param.account_no" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span> <i style="color: red;font-size: 18px">*</i>酒店OTA登陆密码 ：</span>
          <el-input v-model="param.password" placeholder="请输入" style="width: 300px;" size="mini" type="password"></el-input>
        </li>
        <li >
          <span> 酒店OTA用户名 ：</span>
          <el-input v-model="param.login_user" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>

        <li >
          <span> 酒店OTA联系人 ：</span>
          <el-input v-model="param.contact_person" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span> 酒店OTA联系人电话 ：</span>
          <el-input v-model="param.contact_mobile" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span>酒店OTA联系人微信 ：</span>
          <el-input v-model="param.contact_weixin" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span> 酒店OTA联系人QQ号 ：</span>
          <el-input v-model="param.contact_qq" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span> 房价码 ：</span>
          <el-select v-model="rate_code_id" placeholder="请选择" style="width: 300px;" size="mini" @focus="rate_code_data">
            <el-option
              v-for="item in rate_code_list"
              :key="item.id"
              :label="item.description"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li >
          <span> OTA提成百分比 ：</span>
          <el-input v-model="param.commission" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
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
        name: "deploy",
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
          account_no:'',//账号
          login_user:'',//用户名
          password:'',//密码
          contact_person:'',//人名
          contact_mobile:'',//手机
          contact_weixin:'',//微信
          contact_qq:'',//qq
          rate_code_list:[],//所有房价码
          rate_code_id:'',//房价码
          commission:'',//ota提成百分比
        }
      },
      created(){
        let that =this;
        that.visitant();//获取访客登记的列表
        that.rate_code_data();
      },
      methods: {
        //刷新数据
        flush() {
          let that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            account_no:'',//账号
            login_user:'',//用户名
            password:'',//密码
            contact_person:'',//人名
            contact_mobile:'',//手机
            contact_weixin:'',//微信
            contact_qq:'',//qq
            commission:''
          };
           that.rate_code_id="";
        },
        /**获取OTA配置的数据*/
        visitant() {
          let that = this;
          that.$axios({
            url: that.url + "/v1/ota/config/list",
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
        //获取房价码
        rate_code_data(){
          let that = this;
          that.$axios({
            url: that.api.api_newPrice_9107 + "/v1/room/rate_code/get_rate_code_list/?page_size=999",
            method: "get",
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.rate_code_list = res.data.data.results;

              } else {
                console.log(res);
                that.hintInfo("warning", res.data.data.message)
              }
            })
            .catch(err => {
              console.error(err)
            })
        },
        //新增OTA配置
        add() {
          let that = this;
          that.dialogVisible = true;
          that.title = "新增公司";
          that.flush();
        },
        /**修改OTA配置*/
        amend(row, id) {
          let that = this;
          that.Edite = true;
          console.log(row, id);
          // that.rate_code_data();
          that.title = "修改OTA配置"
          that.id = id;
          that.param = {
            account_no:row.account_no,//账号
            login_user:row.login_user,//用户名
            password:row.password,//密码
            contact_person:row.contact_person,//人名
            contact_mobile:row.contact_mobile,//手机
            contact_weixin:row.contact_weixin,//微信
            contact_qq:row.contact_qq,//qq
            commission:row.commission_percent,
          };
         that.rate_code_id = row.rate_code_id.id;
        },
        /**删除otaOTA配置*/
        cancel(id, index, list) {
          console.log(id);
          let that =this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$axios({
              url:  that.url + "/v1/ota/config/delete/" + id,
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
        /**新增修改otaOTA配置确定*/
        ensure(){
          let that =this;
          let url = that.Edite ? (that.url + "/v1/ota/config/update/" + that.id) : (that.url + "/v1/ota/config/add");
          that.$axios({
            url: url,
            method: "post",
            data: {
              account_no:that.param.account_no,//账号
              login_user:that.param.login_user,//用户名
              password:that.param.password,//密码
              contact_person:that.param.contact_person,//人名
              contact_mobile:that.param.contact_mobile,//手机
              contact_weixin:that.param.contact_weixin,//微信
              contact_qq:that.param.contact_qq,//qq
              rate_code_id:that.rate_code_id,
              commission_percent:that.param.commission,
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                if (that.Edite) {
                  that.hintInfo("success", "修改OTA配置成功")
                } else {
                  that.hintInfo("success", "新增OTA配置成功")
                }
                that.dialogVisible = false;
                that.visitant();
              } else {
                if (that.Edite) {
                  that.hintInfo("warning", "修改OTA配置失败")
                } else {
                  that.hintInfo("warning", "新增OTA配置失败")
                }

              }
            })
            .catch(err => {
              console.error(err)
              if (that.Edite) {
                that.hintInfo("warning", "修改OTA配置失败")
              } else {
                that.hintInfo("warning", "新增OTA配置失败")
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
  .deploy{
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
          width: 160px;
          text-align: right;
        }
      }
    }
  }
</style>
