<template>
  <!--设置-->
  <div class="Reports" :style="{height: availHeight, overflow:'auto'}">
    <el-col class="pull-left"  style="background-color: #EAEDF1; width: 250px;">
      <div style="height: 66px; font-size: 22px; color: #222222; margin-left: 36px; line-height: 66px"  >
        报表分类
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <!-- <el-submenu index="12">
          <template slot="title">
            <span>客房查房</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="12-1"><router-link to="/reports/checkRoomContent">查房内容</router-link></el-menu-item>
            <el-menu-item index="12-2"><router-link to="/reports/checkRoomRecord">查房记录</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="13">
          <template slot="title">
            <span>客房打扫</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="13-1"><router-link to="/reports/cleanRoomRecord">打扫记录</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>1.财务报表</span>
          </template>
          <el-menu-item-group  :default-active="this.$route.path" router mode="horizontal">
            <el-menu-item index="1-1"><router-link to="/reports/cashierReport">冲调帐报表</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/reports/cashierNoReport">AR入账简表</router-link></el-menu-item>
            <el-menu-item index="1-3"><router-link to="/reports/entryDetailReport">AR账户实时余额表</router-link></el-menu-item>
            <el-menu-item index="1-4"><router-link to="/reports/entrySimpleReport">AR账户收款汇总表</router-link></el-menu-item>
            <el-menu-item index="1-5"><router-link to="/reports/entrySummaryReport">AR收款明细表</router-link></el-menu-item>
            <el-menu-item index="1-7"><router-link to="/reports/receiveDetailReport">AR入账汇总表</router-link></el-menu-item>
            <el-menu-item index="1-8"><router-link to="/reports/receiveSummaryReport">AR入账明细报表</router-link></el-menu-item>
            <el-menu-item index="1-9"><router-link to="/reports/chongDiaoReport">催账报表</router-link></el-menu-item>
            <el-menu-item index="1-10"><router-link to="/reports/resolveSummaryReport">结账区间明细报表</router-link></el-menu-item>
            <el-menu-item index="1-10"><router-link to="/reports/shouYinBill">收银清单</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="2">
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <template slot="title">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <span>2.综合报表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-7"><router-link to="/reports/resolveDetailReport">营业收入统计报表</router-link></el-menu-item>
            <el-menu-item index="2-8"><router-link to="/reports/arDetail">营业日报表</router-link></el-menu-item>
            <el-menu-item index="2-9"><router-link to="/reports/arSummary">销售员业绩汇总报表</router-link></el-menu-item>
            <el-menu-item index="2-1"><router-link to="/reports/dateReport">销售分析汇总表</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/reports/dateCodeReport">销售分析明细表</router-link></el-menu-item>
            <el-menu-item index="2-3"><router-link to="/reports/monthReport">销售分析区间报表</router-link></el-menu-item>
            <el-menu-item index="2-4"><router-link to="/reports/dateSimpleReport">市场码渠道分析表</router-link></el-menu-item>
            <el-menu-item index="2-5"><router-link to="/reports/dateCountReport">业主分成收入汇总表</router-link></el-menu-item>
            <el-menu-item index="2-6"><router-link to="/reports/eatCountReport">业主分成收入明细表</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>3.房单报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-11"><router-link to="/reports/lateCountReport">指定日期零房价报表</router-link></el-menu-item>
              <el-menu-item index="3-12"><router-link to="/reports/selfReport">指定日期免费房报表</router-link></el-menu-item>
              <el-menu-item index="3-13"><router-link to="/reports/previewReport">指定日期自用房报表</router-link></el-menu-item>
              <el-menu-item index="3-14"><router-link to="/reports/yaHouseReport">免费升级明细表</router-link></el-menu-item>
              <el-menu-item index="3-1"><router-link to="/reports/loginReport">当前在住免费房报表</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="/reports/cardReport">当前在住全日房报表</router-link></el-menu-item>
              <el-menu-item index="3-3"><router-link to="/reports/onLiveReport">当前在住钟点房报表</router-link></el-menu-item>
              <el-menu-item index="3-4"><router-link to="/reports/historyReport">当前在住夜宵房报表</router-link></el-menu-item>
              <el-menu-item index="3-20"><router-link to="/reports/longLiveReport">当前在住常住房报表</router-link></el-menu-item>
              <el-menu-item index="3-5"><router-link to="/reports/onPriceReport">当前在住客人报表</router-link></el-menu-item>
              <el-menu-item index="3-6"><router-link to="/reports/tempReport">当前在住客人余额报表</router-link></el-menu-item>
              <el-menu-item index="3-7"><router-link to="/reports/resolveBillReport">换房改房价报表</router-link></el-menu-item>
              <el-menu-item index="3-8"><router-link to="/reports/continueReport">本日续住报表</router-link></el-menu-item>
              <el-menu-item index="3-8"><router-link to="/reports/operationReport">本日将离客人报表</router-link></el-menu-item>
              <el-menu-item index="3-9"><router-link to="/reports/previewLeaveReport">本日离店客人报表</router-link></el-menu-item>
              <el-menu-item index="3-10"><router-link to="/reports/exceptionReport">本日入住客人报表</router-link></el-menu-item>
              <el-menu-item index="3-15"><router-link to="/reports/previewRecordReport">本日入住散客报表</router-link></el-menu-item>
              <el-menu-item index="3-16"><router-link to="/reports/previewAlyReport">本日入住团队成员报表</router-link></el-menu-item>
              <el-menu-item index="3-17"><router-link to="/reports/datePreviewReport">当前在住早餐明细表</router-link></el-menu-item>
              <el-menu-item index="3-18"><router-link to="/reports/memberRegReport">当前在住早餐汇总表</router-link></el-menu-item>
              <el-menu-item index="3-19"><router-link to="/reports/memberCzdetailReport">本日延迟退房客人报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>4.房态报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><router-link to="/reports/memberXfdetailReport">当前维修房报表</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to="/reports/memberXfCountReport">历史维修房报表</router-link></el-menu-item>
              <el-menu-item index="4-3"><router-link to="/reports/memberCzfreezeReport">历史维修房--解除报表</router-link></el-menu-item>
              <el-menu-item index="4-4"><router-link to="/reports/memberScoreReport">房态管理报表</router-link></el-menu-item>
              <el-menu-item index="4-5"><router-link to="/reports/memberCspointReport">实时房态报表</router-link></el-menu-item>
              <el-menu-item index="4-6"><router-link to="/reports/memberOperationReport">可用房报表</router-link></el-menu-item>
              <el-menu-item index="4-7"><router-link to="/reports/unitDataReport">当前临时锁房报表</router-link></el-menu-item>
              <el-menu-item index="4-8"><router-link to="/reports/unitDetailReport">当前临时锁房区间查询</router-link></el-menu-item>
              <el-menu-item index="4-9"><router-link to="/reports/unitXfReport">历史临时锁房报表</router-link></el-menu-item>
              <el-menu-item index="4-10"><router-link to="/reports/unitRecesiveReport">历史临时锁房-解除报表</router-link></el-menu-item>
              <el-menu-item index="4-11"><router-link to="/reports/unitRecordReport">客房清洁任务表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>5.宾客报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1"><router-link to="/reports/unitAgeReport">储值卡款项汇总表</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to="/reports/unitRegeReport">储值卡充值明细表</router-link></el-menu-item>
              <el-menu-item index="5-3"><router-link to="/reports/selfDetailReport">储值卡消费明细表</router-link></el-menu-item>
              <el-menu-item index="5-4"><router-link to="/reports/selfFindReport">宾客帐余额明细表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>6.预定报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1"><router-link to="/reports/hsEditReport">指定日期预定报表</router-link></el-menu-item>
              <el-menu-item index="6-2"><router-link to="/reports/hsCleanReport">指定日期团队预定表（含房价）</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="/reports/foodDetailReport">指定日期团队预定表（无房价）</router-link></el-menu-item>
              <el-menu-item index="6-4"><router-link to="/reports/foodCountReport">指定日期Cancel报表</router-link></el-menu-item>
              <el-menu-item index="6-5"><router-link to="/reports/foodSortReport">指定日期Noshow报表</router-link></el-menu-item>
              <el-menu-item index="6-6"><router-link to="/reports/foodFlDetailReport">本日将到客人报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>7.事管家报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1"><router-link to="/reports/foodFlCountReport">当前事务报表</router-link></el-menu-item>
              <el-menu-item index="7-2"><router-link to="/reports/foodWaterReport">历史事务报表</router-link></el-menu-item>
              <el-menu-item index="7-3"><router-link to="/reports/foodRecordReport">事务明细表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>8.发票审核报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="8-1"><router-link to="/reports/foodOperationReport">发票使用统计表</router-link></el-menu-item>
              <el-menu-item index="8-2"><router-link to="/reports/productCountReport">发票区间明细统计</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <!-- <i class="el-icon-caret-bottom"></i> -->
            <template slot="title">
              <!-- <i class="el-icon-caret-bottom"></i> -->
              <span>9.库存报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="9-1"><router-link to="/reports/productDetailReport">总部仓库入库清单表</router-link></el-menu-item>
              <el-menu-item index="9-2"><router-link to="/reports/productWaterReport">总部仓库出库清单表</router-link></el-menu-item>
              <el-menu-item index="9-3"><router-link to="/reports/productWaterCountReport">总部仓库领料明细表</router-link></el-menu-item>
              <el-menu-item index="9-4"><router-link to="/reports/productVoucherReport">总部仓库领料分类汇总表</router-link></el-menu-item>
              <el-menu-item index="9-5"><router-link to="/reports/productUseReport">总部仓库物品出入库存分类汇总表</router-link></el-menu-item>
              <el-menu-item index="9-6"><router-link to="/reports/productParkReport">总部仓库物品出入库存报表</router-link></el-menu-item>
              <el-menu-item index="9-7"><router-link to="/reports/saleCountReport">总部仓库供应商明细表</router-link></el-menu-item>
              <el-menu-item index="9-8"><router-link to="/reports/saleDetailReport">总部仓库报废商品报表</router-link></el-menu-item>
              <el-menu-item index="9-9"><router-link to="/reports/saleQsDetailReport">门店入库清单表</router-link></el-menu-item>
              <el-menu-item index="9-10"><router-link to="/reports/saleSortReport">门店出库清单表</router-link></el-menu-item>
              <el-menu-item index="9-11"><router-link to="/reports/stockSouMai">门店库存售卖报表</router-link></el-menu-item>
              <el-menu-item index="9-12"><router-link to="/reports/stockNoSouMai">门店非售卖物品出入库存报表</router-link></el-menu-item>
              <el-menu-item index="9-13"><router-link to="/reports/stockTui">门店退库报表</router-link></el-menu-item>
              <el-menu-item index="9-14"><router-link to="/reports/stockBaoFei">门店报废商品报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">
              <span>10.其他综合报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="10-1"><router-link to="/reports/shangPing">小商品区间报表</router-link></el-menu-item>
              <el-menu-item index="10-1"><router-link to="/reports/memberCardSale">会员卡销售报表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="11">
            <template slot="title">
              <span>11.销售报表</span>
            </template>
            <el-menu-item-group>
            </el-menu-item-group>
          </el-submenu> -->
      </el-menu>
    </el-col>
    <div class="RightCotent pull-left">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>



</template>

<script>
  export default {
    data() {
      return {
        availHeight: '',
        activeIndex: '1'
      }
    },
    created(){
       this.availHeight = (screen.availHeight -180) +'px';
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>
<style scoped>
.Reports{
  width: calc(100% - 58px);
  margin-top: 60px;
  overflow: hidden;
}
.el-menu{
  background-color: #EAEDF1;
  color: #000000;
}
.router-link-active{
  color: #409EFF;
}
.RightCotent{
  width: calc(100% - 250px);
}
</style>

