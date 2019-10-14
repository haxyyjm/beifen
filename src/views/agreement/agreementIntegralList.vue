<template>
<div class="IntegralList">
  <!-- 积分列表 -->
  <p class="iconLogo">积分列表</p>
  <!-- 输入框 -->
  <div class="search">
      <div class="inputCell">
        会员卡号：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        持卡人 ：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        会员计划：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>

      <div class="inputCell">
        积分余额：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        所属酒店：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        卡等级 ：
        <!-- 查询input -->
        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="btn-group">
        <div class="single-btn" @click="transferDialog = true">积分转移</div>
        <div class="single-btn" @click="changeDialog = true">积分调整</div>
        <div class="single-btn">积分兑换</div>
        <div class="single-btn">兑换撤销</div>
        <div class="single-btn">兑换账单</div>
        <div class="single-btn" @click="selfDialog = true, param ={}">手工录入</div>
      </div>
  </div>
  <!-- 列表清单部分 -->
  <!-- 表格 -->
      <div class="table" style="width: 100%;">
          <el-table :data="tableData" @row-click='handleInfoById' :height="300" :header-cell-style="{background:'#BFCAD1', color: '#68819E'}" style="width: 100%">
            <el-table-column type="index" width="55" label="编号"></el-table-column>
            <el-table-column prop="code" label="日期"></el-table-column>
            <el-table-column prop="descript" label="积分产生酒店"></el-table-column>
            <el-table-column prop="descript" label="金额"></el-table-column>
            <el-table-column prop="descript_en" label="产生积分"></el-table-column>
            <el-table-column prop="rate" label="消费积分"></el-table-column>
            <el-table-column prop="descript" label="积分余额"></el-table-column>
            <el-table-column prop="descript_en" label="积分有效期至"></el-table-column>
            <el-table-column prop="rate" label="积分有效/失效"></el-table-column>
            <el-table-column prop="rate" label="状态"></el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="getData"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, prev, pager, next, jumper"
              :total="total">
          </el-pagination>    
      </div>
      <!--积分转移-->
      <el-dialog class="houseTypeClass" title="积分转移" :visible.sync="transferDialog" :close-on-click-modal="false">
        <div style="height: 400px">
            <el-col :span="8">
              <el-row>
                <span>转出卡:</span><el-input style="width: 200px"></el-input>
              </el-row>
              <el-row class="secondClass">
                <span style="display: block; width: 50px;float: left;">卡信息:</span><el-input type="textarea" :rows="4" style="width: 200px"></el-input>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row style="margin-top: 10px">
                <span>转积分数量:</span>
              </el-row>
              <el-row style="margin-top: 30px">
                <el-input type="textarea" :rows="2"  style="width: 200px"></el-input>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-button type="primary">重置</el-button>
                <el-button type="primary">保存</el-button>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <span>转入卡:</span><el-input style="width: 200px"></el-input>
              </el-row>
              <el-row class="secondClass">
                <span style="display: block; width: 50px;float: left;">卡信息:</span><el-input type="textarea" :rows="4" style="width: 200px"></el-input>
              </el-row>
            </el-col>
        </div>
      </el-dialog>
      <!--积分调整-->
      <el-dialog class="houseTypeClass" title="积分调整" :visible.sync="changeDialog" :close-on-click-modal="false">
        <div style="height: 400px">
          <el-col :span="8">
              <el-row>
                <span>转出卡:</span><el-input style="width: 200px"></el-input>
              </el-row>
              <el-row class="secondClass">
                <span style="display: block; width: 50px;float: left;">卡信息:</span><el-input type="textarea" :rows="6" style="width: 200px"></el-input>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <div><span style="margin-left: 28px;">调整方向:</span><el-select style="width: 200px"></el-select></div>
                <div style="margin-top: 15px"><span style="margin-left: 28px;">调整原因:</span><el-select style="width: 200px"></el-select></div>
                <div style="margin-top: 10px"><span>积分失效日期:</span><el-input style="width: 200px"></el-input></div>
                <div style="margin-top: 10px"><span>转移积分数量:</span><el-input style="width: 200px"></el-input></div>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <span>备注:</span>
              </el-row>
              <el-row class="secondClass">
                <el-input type="textarea" :rows="7" style="width: 200px"></el-input>
              </el-row>
            </el-col>
        </div>
      </el-dialog>
      <!--手工录入-->
      <el-dialog class="houseTypeClass" title="手工录入" :visible.sync="selfDialog" :close-on-click-modal="false">
        <div style="height: 400px">
          <div class="search">
            <div class="inputCellBlock"  style="">
              消费金额：
              <!-- 查询input -->
              <el-input v-model.trim="param.charge" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
            </div>
            <div class="inputCellBlock">
              付款代码：
              <!-- 查询input -->
              <el-input v-model="param.ta_code" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
            </div>
            <div class="inputCellBlock">
              付款方式：
              <!-- 查询input -->
              <!-- <el-input v-model="param.pay_code" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input> -->
              <el-select v-model="param.pay_code " placeholder="请输入内容" style="width: 220px;margin: 0 16px;">
                <el-option
                  v-for="(item,index) in custom_wayArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="inputCellBlock">
              消费酒店：
              <!-- 查询input -->
              <el-input v-model="param.consume_hotel" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
            </div>
            <div class="inputCellBlock">
              消费类型：
              <!-- 查询input -->
              <el-select v-model="param.cat_sum " placeholder="请输入内容" style="width: 220px;margin: 0 16px;">
                <el-option
                  v-for="(item,index) in custom_wayArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="pull-right" style="height: 100px; padding-top: 50px">
              <!-- 查询 -->
              <el-button type="primary" @click="param = {}">重置</el-button>
              <!-- 添加 -->
              <el-button type="primary" @click="addIntegral()" style="margin-right: 20px;">保存</el-button>
            </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name:'MemberList',
    data(){
        return{
          UrLHeader:'http://member.crowncrystalhotel.com/v1/',//http://member.crowncrystalhotel.com/,
          tableData: [],
          selfDialog: false,
          transferDialog: false,
          changeDialog: false,
          currentPage: 1,
          pagesize: 10,
          total: 0,
          checked:true,
          SearchContent:'',
          param: {}, //手工录入==积分录入对象
          // 消费类型
          custom_wayArr:[
            {
              code: 'point',
              descript: '积分'
            },
            {
              code: 'money',
              descript: '现金'
            },
          ],
        }
    },
    methods: {
      //积分录入方法
      addIntegral(){
        
        let that = this
        // let url = that.UrLHeader + 'customer/member/entry_card_point/'
        let url = that.UrLHeader + 'customer/member/entry_card_point/';
        if(!this.validateData()){
          return
        }
        that.param.charge = Number(that.param.charge)
        that.param.point_type = 'entering';
        that.param.card_id = 1;
        that.param.card_no = 'wx0403hgjp';
        that.param.biz_date = new Date();
        that.param.gen_date = new Date();

        this.$axios.post(url, that.param).then((res)=>{
          that.$message({
            message: '添加成功',
            type: 'success'
          })
          that.selfDialog = false
        }).catch((error)=>{
          that.$message.error('添加数据失败!')
        }) 
      },
      // 未填充函数
      handleInfoById(){

      },
      getData(){

      },
      handleSizeChange(){

      },
      //验证数据方法 返回值(boolean)
      validateData(){
        return (
          this.validateBlank(this.param.charge, '消费金额是必填项', this)&&
          this.validateNAN(this.param.charge, '消费金额必须是数字', this)
        )

      },
      //工具方法验证为空
      validateBlank: function(targetParam, warnMessage, VueInst, successMessage){
        if (!warnMessage) {
            return !(targetParam === '' || targetParam === null || targetParam === undefined)
            } else {
            if (targetParam === '' || targetParam === null || targetParam === undefined) {
                VueInst.$message({
                message: warnMessage,
                type: 'error'
                })
                return false
            } else {
                if (successMessage) {
                    VueInst.$message({
                        message: successMessage,
                        type: 'success'
                    })
                }
                return true
            }
        }
      },
      //工具方法验证为数字
      validateNAN: function (ce, warnMessage, VueInst, successMessage) {
        if (ce === '' || ce === null || ce === undefined) {
            return true
        }
        var reg = /^(\-|\+)?\d+(\.\d+)?$/;
        if (!warnMessage) {
            return reg.test(ce)
        } else {
            if (!reg.test(ce)) {
                VueInst.$message({
                message: warnMessage,
                type: 'error'
                })
                return false
            } else {
                if (successMessage) {
                VueInst.$message({
                    message: successMessage,
                    type: 'success'
                })
                }
                return true
            }
        }
      }
    }
}
</script>
<style lang="less" scoped>

.el-button--primary {
    color: #fff;
    background-color: #4488E9;
    border-color: #4488E9;
}
.el-checkbox{
   color: #ffffff; 
}
.IntegralList{
    padding: 10px;
    .iconLogo{
        color: #333333;
        font-size: 22px;
    }
    .iconLogo::before{
        content: " ";
        display: inline-block;
        width: 28px;
        height: 25px;
        background: url("../../assets/images/member/icon-logo.png") no-repeat center;
        background-size: 100%;
        vertical-align: -4px;
        margin-right: 10px; 
    }
    // 搜索栏
    .search{
        background-color: #F7F7F7;
        padding:0 0 0 20px;
        overflow: hidden;
        margin: 16px 0;
        font-size: 14px;
        .inputCell{
          width: 19%;
          display: inline-block;
          overflow: hidden;
          line-height: 30px;
          margin: 10px 0 10px 0;

          .el-input{ 
            float: right;
          }
        }
        // block
        .inputCellBlock{
          overflow: hidden;
          line-height: 30px;
          margin: 10px 20px 10px 0;
          p{
            width: 11%;
            text-align: left;
          }
        }
        
        // 按钮组合
        .btn-group{
          width: 80%;
          margin: 8px 0;
          float: right;
          // border: 1px red solid;
          padding-right: 70px;
        }
        .single-btn{
          float: right;
          padding: 0 30px;
          line-height: 40px;
          border-radius: 2px;
          color: #fff;
          background-color: #4488E9;
          margin-right: 10px;

        }
    }
    // 头部后台读取数据

    .secondClass{
      margin-top: 20px
    }
    // 分页
  .pagination{
    margin: 36px 0 14px 0;
    overflow: hidden;
    
    p{
      margin-left: 20px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #68819E;
      color: #fff;
    }
  }
}

</style>
<style scoped>
   .houseTypeClass>>> .el-dialog__header{
    background-color: #8895A8;
   }
   .houseTypeClass>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
</style>


