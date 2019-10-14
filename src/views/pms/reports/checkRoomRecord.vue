<template>
  <!--查房记录表-->
  <div class="Charges">
    <p class="iconTips">查房记录表</p>
    <div class="SetShow">
          <div class="search GoodsAdd">
              <!-- 房型 -->
            <span>房型:</span><el-select v-model="optionsValue"  placeholder="房型"><el-option v-for="item in optionsData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
            <!-- 房间号显示  输入框不是select框-->
            <span>房间号:</span>
            <el-input v-model="AllGoodsValue" style="width: 15vw" placeholder="房间号"></el-input>
            <span>是否通过:</span><el-select v-model="AllGoodsValue" placeholder="全部">
              <el-option
              v-for="item in AllGoods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
            <el-button type="info">筛选</el-button>
          </div>
          <!-- 新增图片 -->
          <div class="newAddImg"><img src="../../../assets/images/pms/setting/icon-newAdd.png" alt="新增"></div>
          <!-- 表格展示 -->
          <div class="table">
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>房型</th>
                        <th>房间号</th>
                        <th>查房人</th>
                        <th>查房时间</th>
                        <th>是否通过</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in RoomSetData" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ item.RoomType }}</td>
                        <td>{{ item.RoomNum }}</td>
                        <td>{{ item.RoomPrice }}</td>
                        <td>{{ item.HourPrice }}</td>
                        <td>{{ item.RoomPrice }}</td>
                        <td>{{ item.HourPrice }}</td>
                    </tr>
                </tbody>
              </table>
              <!-- 分页 -->
              <!-- <div class="pagination">
                <p class="pull-left">显示第1到第6条记录，共6条记录</p>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="50" class="pull-right">
                </el-pagination>
              </div> -->
          </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Charges",
        data(){
          return{
            // 是否显示弹框
            ifShowToast:true,
            // select下拉框数据
            optionsData: [{
                value: 'HTML',
                label: 'HTML'
                }, {
                value: 'CSS',
                label: 'CSS'
                }, {
                value: 'JavaScript',
                label: 'JavaScript'
                }],
            optionsValue: [],
            // 全部商品展示
            AllGoods: [{
                value: '选项1',
                label: '全部'
                }, {
                value: '选项2',
                label: '酒水'
                }, {
                value: '选项3',
                label: '冷饮'
                }, {
                value: '选项4',
                label: '赔偿'
                }, {
                value: '选项5',
                label: '房费'
                }],
            AllGoodsValue: '',
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
            // console.log(tab, event);
          },
          // 控制弹框显示的函数
          ShowToast(){
            this.ifShowToast=!this.ifShowToast;
          }
        }
    }
</script>

<style lang="less" scoped>
.el-button{background: #4488E9;color: #fff;}
.Charges{
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
    background: url("../../../assets/images/pms/orderList/room-typeinfo.png") no-repeat center;
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
.GoodsAdd{
    height: 100px;
    line-height: 90px;
}
.GoodsAdd span{
  margin: 0px 10px 0px 10px;
}
.newAddImg{
  margin: 0 0 14px 0;
  cursor: pointer;
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

