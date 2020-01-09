<template>
  <div class="configuration">
    <header style="margin: 10px;overflow: hidden">
      <p style="font-size: 16px;display: inline-block;font-weight: bold" >OTA调价</p>
      <el-button type="primary" size="mini" style="width: 80px;margin-left: 20px;" @click="add">新增</el-button >
    </header>
    <div class="content ">
      <el-table
        :data="price_list"
        size="mini"
        height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="min_price"
          label="最低价格">
          <template slot-scope="scope">
            <span>{{scope.row.min_price}} 元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="occupy_ratio_limit"
          label="房型百分比">
          <template slot-scope="scope">
            <span>{{scope.row.occupy_ratio_limit}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price_value_lower"
          label="比竞争对手低的金额">
          <template slot-scope="scope">
            <span>{{scope.row.price_value_lower}} 元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price_percent_lower"
          label="比竞争对手低的百分比">
          <template slot-scope="scope">
             <span>{{scope.row.price_percent_lower}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="开始跟踪时间">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="结束跟踪时间">
        </el-table-column>

        <!--<el-table-column-->
          <!--prop="create_user"-->
          <!--label="创建者">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="create_time"-->
          <!--width="150"-->
          <!--label="创建时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="modify_time"-->
          <!--width="150"-->
          <!--label="修改时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="modify_user"-->
          <!--label="修改用户">-->
        <!--</el-table-column>-->

        <el-table-column
          prop="address"
          width="180 "
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, price_list)"
            >删除
            </el-button>
            <el-button size="mini"
                       @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, price_list) "
            >修改
            </el-button>
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
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name">{{ title }}</span>
      </div>
      <ul class="dialog_style">
        <li >
          <span>开始跟踪的时间 ：</span>
          <el-date-picker
            style="width: 300px;"
            size="mini"
            v-model="begin_time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li >
          <span>停止跟踪的时间 ：</span>
          <el-date-picker
            style="width: 300px;"
            size="mini"
            value-format="yyyy-MM-dd"
            v-model="end_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li >
          <span>最低价格 ：</span>
          <el-input v-model="param.min_price" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span>房型百分比 ：</span>
          <el-input v-model="param.occupy_ratio_limit" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span>低于竞争对手金额 ：</span>
          <el-input v-model="param.price_value_lower" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
        </li>
        <li >
          <span>低于竞争对手百分比 ：</span>
          <el-input v-model="param.price_percent_lower" placeholder="请输入" style="width: 300px;" size="mini"></el-input>
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
        name: "configuration",
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
          price_list:[],//ota调价list
          min_price:'',//最低价格
          begin_time:'',//开始跟踪时间
          end_time:'',//停止跟踪时间
          price_value_lower:'',//比竞争对手低的金额
          price_percent_lower:'',//比竞争对手低的百分比
          occupy_ratio_limit:'',//房型百分比
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
            min_price:'',//最低价格
            price_value_lower:'',//比竞争对手低的金额
            price_percent_lower:'',//比竞争对手低的百分比
            occupy_ratio_limit:'',//房型百分比
          };
          that.begin_time='';//开始跟踪时间
          that.end_time='';//停止跟踪时间
        },
        /**获取OTA调价的数据*/
        visitant() {
          let that = this;
          that.$axios({
            url: that.url + "/v1/ota/price/list",
            method: "get",
            params:{
              page_size:10,
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.price_list = res.data.data.list;
                console.log(that.price_list);
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
        //新增OTA调价
        add() {
          let that = this;
          that.dialogVisible = true;
          that.title = "新增OTA调价";
          that.flush();
        },
        /**修改OTA调价*/
        amend(row, id) {
          let that = this;
          that.Edite = true;
          console.log(row, id);
          that.title = "修改OTA调价"
          that.id = id;
          that.param = {
            min_price:row.min_price,//最低价格
            price_value_lower:row.price_value_lower,//比竞争对手低的金额
            price_percent_lower:row.price_percent_lower,//比竞争对手低的百分比
            occupy_ratio_limit:row.occupy_ratio_limit,//房型百分比
          };
          that.begin_time=row.begin_time;//开始跟踪时间
          that.end_time=row.end_time;//停止跟踪时间

        },
        /**删除otaOTA调价*/
        cancel(id, index, list) {
          console.log(id);
          let that =this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$axios({
              url:  that.url + "/v1/ota/price/delete/" + id,
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
        /**新增修改otaOTA调价确定*/
        ensure(){
          let that =this;
          let url = that.Edite ? (that.url + "/v1/ota/price/update/" + that.id) : (that.url + "/v1/ota/price/add");
          that.$axios({
            url: url,
            method: "post",
            data: {
              min_price:that.param.min_price,//最低价格
              price_value_lower:that.param.price_value_lower,//比竞争对手低的金额
              price_percent_lower:that.param.price_percent_lower,//比竞争对手低的百分比
              occupy_ratio_limit:that.param.occupy_ratio_limit,//房型百分比
              begin_time:that.begin_time,//开始跟踪时间
              end_time:that.end_time,//停止跟踪时间
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                if (that.Edite) {
                  that.hintInfo("success", "修改OTA调价成功")
                } else {
                  that.hintInfo("success", "新增OTA调价成功")
                }
                that.dialogVisible = false;
                that.visitant();
              } else {
                if (that.Edite) {
                  that.hintInfo("warning", "修改OTA调价失败")
                } else {
                  that.hintInfo("warning", "新增OTA调价失败")
                }

              }
            })
            .catch(err => {
              console.error(err)
              if (that.Edite) {
                that.hintInfo("warning", "修改OTA调价失败")
              } else {
                that.hintInfo("warning", "新增OTA调价失败")
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
                that.price_list = res.data.data.list;
                console.log(that.price_list);
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
  .configuration{
    width: 97%;
    margin-left: 4px;
    .dialog_style {
      margin-left: 20px;
      li {
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 150px;
          text-align: right;
        }
      }
    }
  }
</style>
