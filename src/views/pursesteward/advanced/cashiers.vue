<template>
  <div class="cashiers">
    <!--票据种类 -->
    <div class="shopping">
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="cashiers_list"
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
            prop="desc"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="cash_up"
            label="上缴现金">
          </el-table-column>
          <el-table-column
            prop="biz_date"
            width="130"
            label="营业日期">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="open_amount "-->
            <!--label="开账次数">-->
          <!--</el-table-column>-->
          <el-table-column
            v-if="event='open'"
            prop="open_time"
             width="130"
            label="开账时间">
          </el-table-column>
          <el-table-column
            prop="operator.user_name"
            label="开账人">
          </el-table-column>
          <el-table-column
            prop="open_amount"
            label="开账备用金">
          </el-table-column>
          <el-table-column
            width="130"
            prop="close_time"
            label="关账日期">
          </el-table-column>
          <el-table-column
            prop="close_user.user_name"
            label="关账用户">
          </el-table-column>
          <el-table-column
            prop="close_amount"
            label="关账备用金">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="ad"-->
            <!--width="180 "-->
            <!--fixed="right"-->
            <!--label="操作">-->
            <!--<template slot-scope="scope" >-->
              <!--<el-button  size="mini" type="danger"  >删除</el-button>-->
              <!--<el-button size="mini" >修改</el-button>-->
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
        name: "cashiers",
        data() {
        return {
          api:"http://47.98.113.173:9519",
          cashiers_list: [],
          //分页
          total:10,
          pagesize:10,


        }
      },
      created:function () {
        let that = this;
        that.details_list();
      },
         methods: {
           //封装错误信息
           error_message(msg){
             this.$message.error('错了哦，错误消息为'+msg);
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
      // 获得收银点操作记录
         details_list(){
           let that=this
           that.$axios({
             url: ""+that.api+"/v1/finance/cash_register_operation/info_list",
             method: "get",
             headers: {
               authorization: sessionStorage.getItem("authorization"),
             }
           })
             .then(res=>{
               if (res.data.message=="success"){
                 console.log(res.data.data);
                 let new_data = [];
                 for( let item of res.data.data.list){
                   let event = item['event'];
                   let temp = {};
                   if(event === "open"){
                     temp['desc'] = item['desc'];
                     temp['desc_en'] = item['desc_en'];
                     temp['biz_date']=item['biz_date']
                     temp['operator'] = item['operator'];
                     temp['cash_up']= item['cash_up']
                     temp['open_time'] = item['open_time'];
                     temp['open_amount'] = item['open_amount'];
                     temp['close_user'] = '';
                     temp['close_amount'] = '';
                     temp['close_time'] = '';
                   }else {
                     temp['desc'] = item['desc'];
                     temp['desc_en'] = item['desc_en'];
                     temp['biz_date']=item['biz_date']
                     temp['cash_up']= item['cash_up']
                     temp['operator'] = '';
                     temp['open_time'] = '';
                     temp['open_amount'] = '';
                     temp['close_user'] =item['operator'];
                     temp['close_amount'] = item['close_amount'];
                     temp['close_time'] = item['close_time'];
                   }
                   new_data.push(temp);
                   console.log(new_data);
                 }
                 that.cashiers_list=new_data
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
      }
    }
</script>

<style lang="less" scoped>
  .cashiers{
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
  }
</style>
