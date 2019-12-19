<template>
  <div class="wrap" :style="{ height: availHeight, overflow: 'auto' }">
    <el-container>
      <el-main>
        <div v-if="isShow">
          <!--头部-->
          <div class="container-top">
            <div>
              <el-button type="primary" size="mini">新建</el-button>
              <el-button type="primary" size="mini">保存</el-button>
              <el-button type="primary" size="mini">账户</el-button>
              <el-button @click="isShow = false" type="primary" size="mini">入账</el-button>
              <el-button type="primary" size="mini">允许记账</el-button>
              <el-button type="primary" size="mini">团队付费</el-button>
            </div>
            <div>
              <el-button type="primary" size="mini">打印</el-button>
              <el-button type="primary" size="mini">刷新</el-button>
              <el-button type="primary" size="mini">退出</el-button>
            </div>
          </div>
          <!--上部分主体-->
          <div class="container-banner">
            <ul>
              <li class="pingxing">
                <span>团名:</span>
                <el-input size="mini">
                  <template slot="append">档案</template>
                </el-input>
              </li>
              <li class="pingxing">
                <span>团队代码:</span>
                <el-input size="mini"></el-input>
              </li>
              <li class="special">
                <div class="pingxing">
                  <span>国籍:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing">
                  <span>民族:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
              <li class="special">
                <div class="pingxing">
                  <span>领队姓名:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing">
                  <span>电话:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
              <li class="special">
                <div class="pingxing">
                  <span>邮箱:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing">
                  <span>喜好:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
              <li class="pingxing">
                <span>排房要求:</span>
                <el-input size="mini"></el-input>
              </li>
            </ul>
            <div>
              <ul>
                <li class="special">
                  <div class="pingxing">
                    <span>到达日期:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>时间:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>天数:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>保留:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>离开日期:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>时间:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>人数:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>房数:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>房价码:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>活动码:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>包价:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>佣金码:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>销售渠道:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <span>销售员:</span>
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li style="margin-left: 80px">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="固定房号"></el-checkbox>
                    <el-checkbox label="固定房价">
                      <span style="color: #4488E9FF">固定房价</span>
                    </el-checkbox>
                    <el-checkbox label="房价保密">
                      <span style="color: #4488E9FF">房价保密</span>
                    </el-checkbox>
                    <el-checkbox label="简约模式"></el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li class="special">
                  <div class="pingxing">
                    <span>预定号:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>手工编号:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="special">
                  <div class="pingxing">
                    <span>预订人:</span>
                    <el-input size="mini"></el-input>
                  </div>
                  <div class="pingxing">
                    <el-input size="mini"></el-input>
                  </div>
                </li>
                <li class="pingxing">
                  <span>预定单位:</span>
                  <el-input size="mini"></el-input>
                </li>
                <li class="pingxing">
                  <span>公司:</span>
                  <el-input size="mini"></el-input>
                </li>
                <li class="pingxing">
                  <span>旅行社:</span>
                  <el-input size="mini"></el-input>
                </li>
                <li class="pingxing">
                  <span>订房中心:</span>
                  <el-input size="mini"></el-input>
                </li>
                <li class="pingxing">
                  <span>卡号:</span>
                  <el-input size="mini"></el-input>
                </li>
              </ul>
            </div>
          </div>
          <!--主体内容-->
          <div class="container-center">
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane :label="'预留' + ('(' +tabNumber + ')')" name="first">
                <el-table
                  border
                  :cell-style="{textAlign:'center'}"
                  :data="tableData"
                  size="mini"
                  height="350px"
                  :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
                >
                  <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
                  <el-table-column prop="from_name" label="类型"></el-table-column>
                  <el-table-column prop="from_name" label="姓名"></el-table-column>
                  <el-table-column prop="from_name" label="到日"></el-table-column>
                  <el-table-column prop="from_name" label="天数"></el-table-column>
                  <el-table-column prop="from_name" label="离日"></el-table-column>
                  <el-table-column prop="from_name" label="房价码"></el-table-column>
                  <el-table-column prop="from_name" label="房类"></el-table-column>
                  <el-table-column prop="from_name" label="营销活动"></el-table-column>
                  <el-table-column prop="from_name" label="从...升级"></el-table-column>
                  <el-table-column prop="from_name" label="房数"></el-table-column>
                  <el-table-column prop="from_name" label="房号"></el-table-column>
                  <el-table-column prop="from_name" label="人/间"></el-table-column>
                  <el-table-column prop="from_name" label="价格"></el-table-column>
                  <el-table-column prop="from_name" label="实价"></el-table-column>
                  <el-table-column prop="from_name" label="折扣"></el-table-column>
                  <el-table-column prop="from_name" label="优惠理由"></el-table-column>
                  <el-table-column prop="from_name" label="折扣"></el-table-column>
                  <el-table-column fixed="right" prop="from_name" label="包价"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane :label="'登记' + ('(' +tabNumber + ')')" name="second">
                <el-table
                  border
                  :cell-style="{textAlign:'center'}"
                  :data="tableData"
                  size="mini"
                  height="350px"
                  :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
                >
                  <el-table-column prop="from_name" fixed label="账号"></el-table-column>
                  <el-table-column prop="from_name" label="房类"></el-table-column>
                  <el-table-column prop="from_name" label="房号"></el-table-column>
                  <el-table-column prop="from_name" label="-"></el-table-column>
                  <el-table-column prop="from_name" label="姓名"></el-table-column>
                  <el-table-column prop="from_name" label="姓名2"></el-table-column>
                  <el-table-column prop="from_name" label="到达"></el-table-column>
                  <el-table-column prop="from_name" label="离开"></el-table-column>
                  <el-table-column prop="from_name" label="天数"></el-table-column>
                  <el-table-column prop="from_name" label="房价"></el-table-column>
                  <el-table-column prop="from_name" label="包价"></el-table-column>
                  <el-table-column fixed="right" prop="from_name" label="特殊要求"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane :label="'取消/未到' + ('(' +tabNumber + ')')" name="third">
                <el-table
                  border
                  :cell-style="{textAlign:'center'}"
                  :data="tableData"
                  size="mini"
                  height="350px"
                  :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
                >
                  <el-table-column prop="from_name" fixed label="类型"></el-table-column>
                  <el-table-column prop="from_name" label="-"></el-table-column>
                  <el-table-column prop="from_name" label="到日"></el-table-column>
                  <el-table-column prop="from_name" label="离日"></el-table-column>
                  <el-table-column prop="from_name" label="房价码"></el-table-column>
                  <el-table-column prop="from_name" label="房类"></el-table-column>
                  <el-table-column prop="from_name" label="房数"></el-table-column>
                  <el-table-column prop="from_name" label="价格"></el-table-column>
                  <el-table-column prop="from_name" label="实价"></el-table-column>
                  <el-table-column prop="from_name" label="优惠理由"></el-table-column>
                  <el-table-column prop="from_name" label="人/间"></el-table-column>
                  <el-table-column prop="from_name" label="包价"></el-table-column>
                  <el-table-column fixed="right" prop="from_name" label="特殊要求"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
            <!--操作行-->
            <div class="caozuo">
              <ul class="caozuo_color">
                <li>新增</li>
                <li>删除</li>
                <li>资源日志</li>
                <li>客房日志</li>
                <li>资源统计</li>
                <li>客房升级</li>
                <li>销售升级</li>
              </ul>
              <ul class="caozuo_color">
                <li>拆</li>
                <li>合</li>
                <li>转</li>
              </ul>
              <ul>
                <li>房数:10</li>
                <li>人数:10</li>
                <li>房费:</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else>
          <!--头部 第二部分-->
          <div class="container-top-second">
            <div>
              <el-button type="primary" size="mini">入账</el-button>
              <el-button type="primary" size="mini">调整</el-button>
              <el-button type="primary" size="mini">加收</el-button>
              <el-button type="primary" size="mini">挂账</el-button>
              <el-button type="primary" size="mini">转账</el-button>
              <el-button type="primary" size="mini">账单</el-button>
              <el-button type="primary" size="mini">冲账</el-button>
              <el-button type="primary" size="mini">扫码支付</el-button>
              <el-button type="primary" size="mini">结账</el-button>
              <el-button type="primary" size="mini">其它</el-button>
              <el-button type="primary" size="mini">允许记账</el-button>
            </div>
            <div>
              <el-button type="primary" size="mini">日志</el-button>
              <el-button type="primary" size="mini">删除</el-button>
              <el-button type="primary" size="mini">刷新</el-button>
              <el-button @click="isShow = true" type="primary" size="mini">退出</el-button>
            </div>
          </div>
          <!--主体部分内容 第二部分-->
          <div class="container-body-second">
            <!--主体部分 左侧-->
            <div class="left">
              <ul class="left-top">
                <li>
                  <span>明细账目:</span>
                  <el-radio-group v-model="radio_1">
                    <el-radio :label="1">有效</el-radio>
                    <el-radio :label="0">所有</el-radio>
                  </el-radio-group>
                </li>
                <li>
                  <span>账户过滤:</span>
                  <el-radio-group v-model="radio_2">
                    <el-radio :label="1">未结</el-radio>
                    <el-radio :label="0">部分</el-radio>
                  </el-radio-group>
                </li>
              </ul>
              <div>
                <el-table
                  border
                  :cell-style="{textAlign:'center'}"
                  :data="tableData"
                  size="mini"
                  height="530px"
                  :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
                >
                  <el-table-column prop="from_name" label="账户"></el-table-column>
                  <el-table-column prop="from_name" label="状态"></el-table-column>
                  <el-table-column prop="from_name" label="金额"></el-table-column>
                </el-table>
                <!--左边第二个tabel-->
                <el-table
                  border
                  :cell-style="{textAlign:'center'}"
                  :data="tableData"
                  size="mini"
                  height="380px"
                  :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="from_name" label="代码"></el-table-column>
                  <el-table-column prop="from_name" label="描述"></el-table-column>
                  <el-table-column prop="from_name" label="金额"></el-table-column>
                  <el-table-column fixed="right" prop="from_name" label="记录"></el-table-column>
                </el-table>
                <div class="left-end">
                  <span>合计: 233320</span>
                </div>
              </div>
              <!--最后一行-->
              <div class="left-bottom">
                <el-radio-group v-model="radio_3">
                  <el-radio :label="0">按营业项目</el-radio>
                  <el-radio :label="1">接客人</el-radio>
                  <el-radio :label="2">按房号</el-radio>
                </el-radio-group>
              </div>
            </div>
            <!--主体部分 右侧-->
            <div class="right">
              <div class="container-banner clear">
                <ul>
                  <li class="pingxing">
                    <span>姓名:</span>
                    <el-input size="mini"></el-input>
                  </li>
                  <li class="pingxing">
                    <span>团队名称:</span>
                    <el-input size="mini"></el-input>
                  </li>
                  <li class="pingxing">
                    <span>公司名称:</span>
                    <el-input size="mini"></el-input>
                  </li>
                  <li class="pingxing">
                    <span>旅行/中心:</span>
                    <el-input size="mini"></el-input>
                  </li>
                </ul>
                <div>
                  <ul>
                    <li class="pingxing">
                    <span>房价:</span>
                    <el-input size="mini"></el-input>
                    </li>
                    <li class="pingxing">
                      <span>房号:</span>
                      <el-input size="mini"></el-input>
                    </li>
                    <li class="pingxing">
                      <span>抵离:</span>
                      <el-input size="mini"></el-input>
                    </li>
                    <li class="pingxing">
                      <span>应收:</span>
                      <el-input size="mini"></el-input>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li class="pingxing">
                      <span style="color: #4488E9;text-decoration:underline;">信用:</span>
                      <el-input size="mini"></el-input>
                    </li>
                    <li class="pingxing">
                      <span>付款方式:</span>
                      <el-input size="mini"></el-input>
                    </li>
                    <li class="pingxing" style="margin-top: 10px">
                      <span>备注:</span>
                      <el-input type="textarea" resize="none" :rows="3" size="mini"></el-input>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 右侧主体部分 -->
              <div class="right-body">
                <el-table
                  border
                  :cell-style="{textAlign:'center'}"
                  :data="tableData"
                  size="mini"
                  height="805px"
                  :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
                >
                  <el-table-column fixed type="index" width="50"></el-table-column>
                  <el-table-column prop="from_name" label="代码"></el-table-column>
                  <el-table-column prop="from_name" label="业务日期"></el-table-column>
                  <el-table-column prop="from_name" label="营业项目"></el-table-column>
                  <el-table-column prop="from_name" label="金额"></el-table-column>
                  <el-table-column prop="from_name" label="摘要"></el-table-column>
                  <el-table-column prop="from_name" label="帐单码"></el-table-column>
                  <el-table-column prop="from_name" label="房号"></el-table-column>
                  <el-table-column prop="from_name" label="数量"></el-table-column>
                  <el-table-column prop="from_name" label="账务标记"></el-table-column>
                  <el-table-column prop="from_name" label="转账"></el-table-column>
                  <el-table-column prop="from_name" label="单号"></el-table-column>
                  <el-table-column prop="from_name" label="分账标记"></el-table-column>
                  <el-table-column prop="from_name" label="用户名"></el-table-column>
                  <el-table-column prop="from_name" label="入账时间"></el-table-column>
                  <el-table-column prop="from_name" label="账次"></el-table-column>
                  <el-table-column prop="from_name" label="结账单号"></el-table-column>
                  <el-table-column fixed="right" prop="from_name" label="营业日期"></el-table-column>
                </el-table>
              </div>
              <div class="right-bottom">
                <ul>
                  <li>记录: 88/80</li>
                  <li>消费: 23000</li>
                  <li>税金: 0.00</li>
                  <li>余额: 5000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <!--底部内容 注意是否显示-->
      <el-footer v-if="isShow">
        <div class="container-banner">
          <ul>
            <li class="pingxing">
              <span>预订类型:</span>
              <el-input size="mini"></el-input>
            </li>
            <li class="pingxing">
              <span>市场:</span>
              <el-input size="mini"></el-input>
            </li>
            <li class="pingxing">
              <span>来源:</span>
              <el-input size="mini"></el-input>
            </li>
            <li class="pingxing">
              <span>渠道:</span>
              <el-input size="mini"></el-input>
            </li>
          </ul>
          <div>
            <ul>
              <li class="special">
                <div class="pingxing">
                  <span>付款方式:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing singleColor">
                  <span>费用:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
              <li class="special">
                <div class="pingxing">
                  <span>保密:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing">
                  <span>款项:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
              <li class="special">
                <div class="pingxing">
                  <span>楼号:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing">
                  <span>余额:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
              <li class="special">
                <div class="pingxing">
                  <span>担保信息:</span>
                  <el-input size="mini"></el-input>
                </div>
                <div class="pingxing singleColor">
                  <span>信用:</span>
                  <el-input size="mini"></el-input>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li class="pingxing">
                <span>备注信息:</span>
                <el-input type="textarea" resize="none" :rows="3" size="mini"></el-input>
              </li>
              <li class="pingxing" style="margin-top: 40px">
                <span>结账提示:</span>
                <el-input type="textarea" resize="none" :rows="3" size="mini"></el-input>
              </li>
            </ul>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio_1:1,
      radio_2:1,
      radio_3:1,
      isShow: true,
      tableData: [
        {
          from_name: "测试"
        },
        {
          from_name: "测试"
        }
      ],
      tabNumber: 20,
      activeName: "first",
      checkList: [],
      availHeight: ""
    };
  },
  created() {
    this.availHeight = screen.availHeight - 180 + "px";
  },
  methods: {
    handleTabClick() {}
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: calc(100% - 58px);
  .container-top,
  .container-top-second
    {
      display: flex;
      white-space: nowrap; //flex布局内容不超过容器
      justify-content: space-between;
      padding-left: 10px;
      padding-right: 10px;
    }
  .container-banner {
    padding-top: 10px;
    margin-top: 5px;
    height: 340px;
    border-top: 1px solid #ccccccff;
    border-bottom: 1px solid #ccccccff;
    display: flex;
    justify-content: space-between;
    ul li {
      height: 40px;
    }
    span {
      width: 100px;
      padding-left: 5px;
    }
    .special {
      span {
        width: 120px;
      }
    }
    .pingxing,
    .special {
      display: flex;
    }
    .pingxing.singleColor {
      color: #4488e9ff;
      text-decoration:underline;
    }
    // .div:nth-child(3){
    //     flex: 1
    // }
  }
  .container-banner.clear{
    display: flex;
    justify-content: space-between;
    border: none;
    height: 200px;
  }
  .container-center {
    .caozuo {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 80px;
        }
      }
      .caozuo_color {
        color: #4488e9ff;
      }
    }
  }
  /**
    第二部分样式
  */
  .container-body-second{
    display: flex;
    .left{
      width: 460px;
      .left-top{
        span{
          margin-right: 5px;
        }
        padding: 15px 0 15px 20px;
      }
      .left-end{
        height: 30px;
        // background: #B0C4DE;
        background:rgba(68,136,233,.3);
        line-height: 30px;
        text-align: right;
        padding-right: 46px;
        color: #222222;
      }
      .left-bottom{
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
    }
    .right{
      width: calc(100% - 460px);
      // flex: 1; //这个不能在里面写，不然会出现问题(不同分辨率下)
      margin-left: 10px;
      .right-body{
        width: 100%;
      }
      .right-bottom ul{
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>
<style scoped>
</style>