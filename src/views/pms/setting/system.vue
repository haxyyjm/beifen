<template>
  <!--系统设置-->
  <div class="System">
    <p class="iconTips">系统设置</p>
    <div class="SetShow">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 参数系统 -->
        <el-tab-pane label="参数系统" name="SystemParam">
            <div class="SystemParam">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="启用门锁"></el-checkbox>
                    <el-checkbox label="去呼呼门锁"></el-checkbox>
                    <el-checkbox label="OTA订单审核"></el-checkbox>
                </el-checkbox-group>

            </div>
            <div class="ClearData">
              <ul>
                  <li  v-for="(item,index) in SystemParData" :key="index">
                      <span class="ClearSpan">{{ item.name }}</span>
                      <el-input-number v-model="item.ListInputNumber" @change="handleChange" :min="1" :max="10" label="描述文字" class="ListInputItem"></el-input-number>
                  </li>
              </ul>

          </div>
          <div class="CancleAndSave pull-right">
              <el-button type="primary" style="background-color: #68819E;">取消</el-button>
              <el-button type="primary" style="background-color: #4488E9;">保存</el-button>
          </div>
        </el-tab-pane>
        <!-- 酒店数据清理 -->
        <el-tab-pane label="酒店数据清理" name="ClearData">
          <div class="">
                <div class="CheckAll">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="CheckAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div class="EndTime">
                            选择截止时间：
                            <el-input v-model="EndTimeValue" placeholder="请输入内容" class="ListInputItem"></el-input>
                        </div>

                </div>
                <div class="ClearTips">请注意：预订单和操作记录会全部清理，如有预订单请提前做好备份。如未选择截止时间将清理全部数据！</div>
                <el-checkbox-group v-model="CheckedList" @change="handleCheckedListChange">
                    <el-checkbox v-for="(item,index) in ClearCheckBoxData" :key="index" :label="item" >{{ item }}</el-checkbox>
                </el-checkbox-group>

          </div>
          <!-- 一键清理 -->
          <div class="CancleAndSave pull-right">
              <el-button type="primary" style="background-color: #4488E9;">一键清理</el-button>
          </div>
        </el-tab-pane>
        <!-- 夜审参数设置 -->
        <el-tab-pane label="夜审参数设置" name="NightAudit">
          <div class="NightAudit">
                <div class="table pull-left">
                    <p>夜审可选费用码</p>
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th>卡券</th>
                                <th>名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>2</td>
                                <td>2</td>
                                <td><span >删除</span> <span class="col"></span> <span @click="ShowToast">修改</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 分页 -->
                    <div class="pagination">
                        <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="50" class="pull-right">
                        </el-pagination>
                    </div>
                </div>
                <div class="table  pull-right">
                    <p>已选择夜审费用码</p>
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>类别</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>2</td>
                                <td>2</td>
                                <td><span >删除</span> <span class="col"></span> <span @click="ShowToast">修改</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 分页 -->
                    <div class="pagination">
                        <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="50" class="pull-right">
                        </el-pagination>
                    </div>
                </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "System",
        data(){
          return{
            // 是否显示设置
            activeName: 'SystemParam',
            // 是否显示弹框
            ifShowToast:true,
            // 系统参数数据------------------
            checkList: ['选中且禁用','启用门锁'],
            // 计数器数据
            ListInputNumber:0,
            SystemParData:[
                {
                    name:'自助机钟点时长',
                    ListInputNumber:1
                },
                {
                    name:'默认退房时间',
                    ListInputNumber:2
                },
                {
                    name:'默认预订预抵时间',
                    ListInputNumber:6
                }
            ],
            // 酒店清理数据--------------------
            // 选择截止时间
            EndTimeValue:' ',
            CheckAll: true,
            CheckedList: ['房间信息', '登记信息'],
            isIndeterminate: true,
            ClearCheckBoxData:['房间信息','登记信息', '预订信息', '交易信息', '团队信息', '夜审信息','查房信息','仓库信息',],
          }
        },
        methods:{
          handleClick(tab, event) {
            console.log(tab, event);
          },
          // 控制弹框显示的函数
          ShowToast(){
            this.ifShowToast=!this.ifShowToast;
          },
        //   计数器函数
        handleChange(value) {
            // console.log(value);
        },
        // 酒店清理数据checkbox
        handleCheckAllChange(val) {
            this.CheckedList = val ? this.ClearCheckBoxData : [];
            this.isIndeterminate = false;
        },
        handleCheckedListChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.ClearCheckBoxData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.ClearCheckBoxData.length;
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
// 系统参数
.System{
  padding: 20px;
  .iconTips{
    color: #777777;
    font-size: 16px;
    margin: 0 0 14px 0;
  }
  .iconTips::before{
    content: " ";
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("../../../assets/images/pms/setting/icon-setting.png") no-repeat center;
    background-size: 100%;
    vertical-align: middle;
    margin-right: 10px;
  }
}
// 参数系统
.SystemParam{
    padding: 0 0 14px 0;
}
// 酒店清理
.ClearData{
    padding: 30px 70px;
    overflow: hidden;
    background-color: #F7F7F7;
    ul{
        li{
            line-height: 40px;
            margin: 10px 0;
            .ClearSpan{
                display: inline-block;
                width: 150px;
            }

        }
    }
}
.ListInputItem{
    display: inline-block;
    width: 250px;
    margin-left:20px;
}
// 选择截止时间
.EndTime{
    display: inline-block;
    margin-left: 50px;
}
// 清理提示
.ClearTips{
    margin: 24px 0;
    color: #FB2E2E;
    font-size: 12px;
}
// 取消保存
.CancleAndSave{
    overflow: hidden;
    margin-top: 130px;
}
.NightAudit{
    // 夜审可选费用码
    p{
        color: #777777;
        font-size: 16px;
        margin:0 0 14px 0;
    }
}
// 表格
.table{
    width: 48%;
    font-size: 14px;

    table{
        border-collapse:collapse;
        border-spacing:0;
        text-align: center;
        border: #CCCCCC 1px solid;
        thead{
        line-height: 40px;
        background-color: #68819E;
        color: #ffffff;
        tr{
            th{
            font-weight:400;
            }
        }
        }
        tbody{
        line-height: 50px;
        color: #333333;
        tr{
            border-bottom: 1px solid #CCCCCC;
            span{
            color: #68819E;
            cursor: pointer;
            }
            .col{border:1px #68819E solid;margin:0 10px;}
        }
        }

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

