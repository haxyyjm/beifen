<template>
  <!--人事管理设置-->
   <div class="Personnel">
    <p class="iconTips">人事管理设置</p>
    <div class="SetShow">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 部门设置 -->
        <el-tab-pane label="部门设置" name="first">
            <div class="tableTitle">部门设置</div>

        </el-tab-pane>
        <!-- 员工设置 -->
        <el-tab-pane label="员工设置" name="second">
            <div class="tableTitle">员工设置</div>

        </el-tab-pane>
        <!-- 权限设置 -->
        <el-tab-pane label="权限设置" name="third">
            <div class="newAddImg"><img src="../../../assets/images/pms/setting/icon-newAdd.png" alt="新增"></div>
            <!-- 表格 -->
            <div class="table pull-left"  style="width: 49%;">
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>员工号</th>
                        <th>组名</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in RoomSetData" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ item.RoomType }}</td>
                        <td>{{ item.RoomNum }}</td>
                        <td><span >删除</span> <span class="col"></span> <span @click="ShowToast">修改</span></td>
                    </tr>
                </tbody>
              </table>
              <div class="pagination">
                <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="50" class="pull-right">
                </el-pagination>
              </div>
            </div>

            <!-- 表格 -->
            <div class="table pull-right"  style="width: 49%;">
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>员工号</th>
                        <th>组名</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in RoomSetData" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ item.RoomType }}</td>
                        <td>{{ item.RoomNum }}</td>
                        <td><span >删除</span> <span class="col"></span> <span @click="ShowToast">修改</span></td>
                    </tr>
                </tbody>
              </table>
              <div class="pagination">
                <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="50" class="pull-right">
                </el-pagination>
              </div>
            </div>
        </el-tab-pane>
        <!-- 房务设置 -->
        <el-tab-pane label="房务设置" name="fourth">
            <div class="tableTitle">房务设置</div>
            <!-- 表格 -->
            <div class="table">
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>房间类型</th>
                        <th>房型编号</th>
                        <th>房价</th>
                        <th>钟点价</th>
                        <th>半天房价</th>
                        <th>标识字符</th>
                        <th>当日单价</th>
                        <th>押金金额</th>
                        <th>续住押金</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in RoomSetData" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ item.RoomType }}</td>
                        <td>{{ item.RoomNum }}</td>
                        <td>{{ item.RoomPrice }}</td>
                        <td>{{ item.HourPrice }}</td>
                        <td>{{ item.HalfPrice }}</td>
                        <td>{{ item.Ident }}</td>
                        <td>{{ item.DailyPrice }}</td>
                        <td>{{ item.Deposit }}</td>
                        <td>{{ item.Continue }}</td>
                        <td><span>删除</span> <span class="col"></span> <span>修改</span></td>
                    </tr>
                </tbody>
              </table>
              <div class="pagination">
                <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="50" class="pull-right">
                </el-pagination>
              </div>
            </div>
            <!-- 表头提示 -->
            <div class="tableTitle" style="padding: 20px 0;">房间列表</div>
            <!-- 表格 -->
            <div class="table">
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>房间类型</th>
                        <th>房型编号</th>
                        <th>房价</th>
                        <th>钟点价</th>
                        <th>半天房价</th>
                        <th>标识字符</th>
                        <th>当日单价</th>
                        <th>押金金额</th>
                        <th>续住押金</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in RoomSetData" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ item.RoomType }}</td>
                        <td>{{ item.RoomNum }}</td>
                        <td>{{ item.RoomPrice }}</td>
                        <td>{{ item.HourPrice }}</td>
                        <td>{{ item.HalfPrice }}</td>
                        <td>{{ item.Ident }}</td>
                        <td>{{ item.DailyPrice }}</td>
                        <td>{{ item.Deposit }}</td>
                        <td>{{ item.Continue }}</td>
                        <td><span>删除</span> <span class="col"></span> <span>修改</span></td>
                    </tr>
                </tbody>
              </table>
              <div class="pagination">
                <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="50" class="pull-right">
                </el-pagination>
              </div>
            </div>
        </el-tab-pane>
        <!-- 外包人员 -->
        <el-tab-pane label="外包人员" name="fivth">

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
            // 是否显示设置
            activeName: 'first',
            // 是否显示弹框
            ifShowToast:true,
            // 表格数据
            RoomSetData: [
              {
                RoomType: '舒适大床房',
                RoomNum: '8326',
                RoomPrice: 526,
                HourPrice:256,
                HalfPrice:123,
                Ident:'dcf',
                DailyPrice:120,
                Deposit:60,
                Continue:200

              },
              {
                RoomType: '舒适大床房',
                RoomNum: '8326',
                RoomPrice: 526,
                HourPrice:256,
                HalfPrice:123,
                Ident:'dcf',
                DailyPrice:120,
                Deposit:60,
                Continue:200

              },
              {
                RoomType: '舒适大床房',
                RoomNum: '8326',
                RoomPrice: 526,
                HourPrice:256,
                HalfPrice:123,
                Ident:'dcf',
                DailyPrice:120,
                Deposit:60,
                Continue:200

              },
              {
                RoomType: '舒适大床房',
                RoomNum: '8326',
                RoomPrice: 526,
                HourPrice:256,
                HalfPrice:123,
                Ident:'dcf',
                DailyPrice:120,
                Deposit:60,
                Continue:200
              },



            ]
          }
        },
        methods:{
          handleClick(tab, event) {

          },
          // 控制弹框显示的函数
          ShowToast(){
            this.ifShowToast=!this.ifShowToast;
          }
    }
  }
</script>

<style lang="less" scoped>
.Personnel{
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
.search{
  background-color: #F7F7F7;
  padding:10px 0 10px 20px;
  overflow: hidden;
  margin: 16px 0;
}
.newAddImg{
  margin: 0 0 14px 0;
  cursor: pointer;
}
.tableTitle{
  padding:0 0 20px 0;
  color: #68819E;
}
.table{
  font-size: 14px;
  border: #CCCCCC 1px solid;
  table{
    border-collapse:collapse;
    border-spacing:0;
    text-align: center;
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

