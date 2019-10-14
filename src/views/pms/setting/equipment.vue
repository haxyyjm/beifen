<template>
  <!--设备设置-->
  <div class="Equipment">
    <p class="iconTips">设备设置</p>
    <div class="SetShow">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 门锁参数 -->
        <el-tab-pane label="门锁参数" name="LockParam">
            <div class="LockParam PhoneParam">
                <ul>
                    <li class="LockList">
                        <span>启用门锁接口</span>
                        <el-switch
                            v-model="SwitchValue"
                            active-color="#68819E"
                            inactive-color="#BFCAD1">
                        </el-switch>
                    </li>
                    <li class="LockList">
                        <span><i>*</i> 门锁厂家</span>
                        <el-select
                            v-model="optionsValue"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder=" ">
                            <el-option
                            v-for="item in optionsData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>


                    </li>
                    <li class="LockList">
                        <span><i>*</i> 通信端口</span>
                        <el-select
                            v-model="optionsValue"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder=" ">
                            <el-option
                            v-for="item in optionsData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="LockList">
                        <span>发卡机型号</span>
                        <el-select
                            v-model="optionsValue"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder=" ">
                            <el-option
                            v-for="item in optionsData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="LockList">
                        <span>系统标识码</span>
                         <!-- 查询input -->
                        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
                    </li>
                    <li class="LockList">
                        <span>酒店识别码</span>
                         <!-- 查询input -->
                        <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
                    </li>
                    <li class="LockList">
                        <span>退房强制注销房卡</span>
                        <el-checkbox v-model="CheckOut">是</el-checkbox>
                    </li>
                </ul>

            </div>
            <div class="CancleAndSave pull-right">
              <el-button type="primary" style="background-color: #68819E;">取消</el-button>
              <el-button type="primary" style="background-color: #4488E9;">保存</el-button>
          </div>
        </el-tab-pane>
        <!-- 电话参数 -->
        <el-tab-pane label="电话参数" name="PhoneParam">
          <div class="PhoneParam">
              <ul>
                  <li v-for="(item,index) in PhoneParamData" :key="index">
                      {{ item.name }}
                      <el-input v-model="item.value" placeholder="请输入内容" class="ListInputItem"></el-input>
                  </li>
              </ul>

          </div>
          <div class="CancleAndSave pull-right">
              <el-button type="primary" style="background-color: #68819E;">取消</el-button>
              <el-button type="primary" style="background-color: #4488E9;">保存</el-button>
          </div>
        </el-tab-pane>
        <!-- 酒店智控 -->
        <el-tab-pane label="酒店智控" name="HotelAuto">
          <div class="HotelAuto">

          </div>
        </el-tab-pane>
        <!-- 公安接口 -->
        <el-tab-pane label="公安接口" name="PublicInter">
            <div class="PublicInter">

            </div>
        </el-tab-pane>
        <!-- 开房提醒 -->
        <el-tab-pane label="开房提醒" name="CheckClock">
            <div class="CheckClock">
                <p>微信推送人员设置</p>
                <div class="search">
                    人员设置：
                    <!-- 人员设置 -->
                    <el-select
                        v-model="optionsValue"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder=" ">
                        <el-option
                        v-for="item in optionsData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 查询input -->
                    <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
                    <!-- 查询 -->
                    <el-button type="primary">查询</el-button>
                </div>
                <div class="table">
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th>卡券</th>
                                <th>名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in CheckClockData" :key="index">
                                <td>{{ item.CardNum }}2</td>
                                <td>{{ item.UserName }}</td>
                                <td><span >删除</span> <span class="col"></span> <span @click="ShowToast">修改</span></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Equipment",
        data(){
          return{
            // 是否显示设置
            activeName: 'LockParam',
            // 是否显示弹框
            ifShowToast:true,
            // 是否启用门锁接口
            SwitchValue:true,
            // 退房强制注销房卡
            CheckOut:true,
            // 电话参数数据------------------
            PhoneParamData:[
                {
                    name:'原始费率',
                    value:'1.0'
                },
                {
                    name:'市话费率',
                    value:'1.0'
                },
                {
                    name:'区间费率',
                    value:'1.0'
                },
                {
                    name:'国内长途',
                    value:'1.0'
                },
                {
                    name:'国际长途',
                    value:'1.0'
                },

            ],
            // 开房提醒部分数据---------------
            SearchContent:'' ,
            // 人员设置查询下拉框
            // select下拉框数据
            optionsData: [
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'CSS',
                    label: 'CSS'
                },
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }
            ],
            optionsValue: [],
            // 提醒数据
            CheckClockData:[
                {
                    CardNum:12034,
                    UserName:'客户名'
                }
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
.el-button--primary {
    color: #fff;
    background-color: #4488E9;
    border-color: #4488E9;
}
// 外层
.Equipment{
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

.PhoneParam{
    padding: 30px 70px;
    overflow: hidden;
    background-color: #F7F7F7;
    ul{
        li{
            line-height: 40px;
            margin: 10px 0;
            .ListInputItem{
                display: inline-block;
                width: 250px;
                margin-left:20px;
            }
        }
    }
}
.LockParam{
    padding: 30px 50px;
    ul{
        .LockList{
            span{
                display: inline-block;
                width: 10%;
                i{
                    color: #FC4A4A;
                }
            }
        }
    }
}
// 取消保存
.CancleAndSave{
    overflow: hidden;
    margin-top: 130px;
}
.CheckClock{
    // 微信推送人员
    p{
        color: #777777;
        font-size: 16px;
        margin:0 0 14px 0;
    }
    // 搜索栏
    .search{
        background-color: #F7F7F7;
        padding:10px 0 10px 20px;
        overflow: hidden;
        margin: 16px 0;
        font-size: 14px;

    }
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

