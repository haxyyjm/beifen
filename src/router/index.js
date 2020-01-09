/**
 * @author  yilukeji   webpre
 * @date 2019-01-01
 * @aim  MIS-SYSTEM
 */
/**
 * 公共路由设置
 */
import Vue from 'vue'
import Router from 'vue-router'
/**
 * 登陆后进入的路由
 */
import Index from '@/views/main'
/**
 * PMS 路由设置  住管家
 */
import Home from '@/views/pms/common/home.vue'
import Main from '@/views/pms/main/main'
import HouseStatus from '@/views/pms/houseStatus/houseStatus'
import OrderList from '@/views/pms/orderList/orderList'
import Customer from '@/views/pms/customer/customer'
import AccountsReceivable from '@/views/pms/accountsReceivable/accountsReceivable'
import Marketings from '@/views/pms/marketing/marketing'
import Invoicing from '@/views/pms/invoicing/invoicing'
import Shifting from '@/views/pms/shifting/shifting'
import Reports from '@/views/pms/reports/reports'
import Nightaudit from '@/views/pms/nightaudit/nightaudit'
import Team from '@/views/pms/team/team'
/**
 * 点击内控店控进入的路由
 */
import Homes from '@/views/internal-store-control/common/home'
import ModuleTree from '@/views/internal-store-control/module-tree/module-tree'
import Moduleinformation from '@/views/internal-store-control/module-tree/module-information'
import Moduletypesetting from '@/views/internal-store-control/module-type-setting/module-type-setting'
import Moduletype from '@/views/internal-store-control/module-type-setting/module-type'
import Kind from '@/views/internal-store-control/module-type-setting/kind'
import Moduleloginlog from '@/views/internal-store-control/module-login-log/module-login-log'
import Log from '@/views/internal-store-control/module-login-log/log'
import Moduleversioning from '@/views/internal-store-control/module-versioning/module-versioning'
import Versionlist from '@/views/internal-store-control/module-versioning/version-list'
import Modulesalesmanagement from '@/views/internal-store-control/module-sales-management/module-sales-management'
import Management from '@/views/internal-store-control/module-sales-management/management'
//点击内控店控进入的组织架构管理的路由
import Organization from '@/views/internal-store-control/organization/organization'
import Basicinfo from '@/views/internal-store-control/organization/basic-info'
import Hotel from '@/views/internal-store-control/organization/hotel'
import Sections from '@/views/internal-store-control/organization/sections'
import Personalrole from '@/views/internal-store-control/personal-role/personal-role'
import Role from '@/views/internal-store-control/personal-role/role'
import Permissions from '@/views/internal-store-control/permissions/permissions'
import Roleprivileges from '@/views/internal-store-control/permissions/role-privileges'
//页面管理页面
import Pagemanagement from '@/views/internal-store-control/page-management/page-management'
import Pagetable from '@/views/internal-store-control/page-management/page-table'
//排班考勤管理
import Composing from '@/views/internal-store-control/composing/composing'
import Checkingin from '@/views/internal-store-control/composing/checking-in'
import Crew from '@/views/internal-store-control/composing/crew'
import SummaryOne from '@/views/internal-store-control/composing/summary_one'
import AuditManagement from '@/views/internal-store-control/composing/audit_management'
//点击内控店控进入的组织架构管理的设置路由
import Setting from '@/views/internal-store-control/setting/setting'
import Papers from '@/views/internal-store-control/setting/papers'
import Marketing from '@/views/internal-store-control/setting/marketing'
import Roomstatus from '@/views/internal-store-control/setting/room-status'
import Reserve from '@/views/internal-store-control/setting/reserve'
import Reception from '@/views/internal-store-control/setting/reception'
import Guestroom from '@/views/internal-store-control/setting/guest-room'
import Else from '@/views/internal-store-control/setting/else'
//薪资管理
import Pay from '@/views/internal-store-control/pay/pay'
import Compensation from '@/views/internal-store-control/pay/compensation'

/**
 * 客管家的路由
 */

/**
 * 点击铁管家进入的路由
 */
import Ironhome from '@/views/ironsteward/common/ironhome'
import Equipmentcommon from '@/views/ironsteward/equipmentcommon/equipmentcommon'
import Equipmentguest from '@/views/ironsteward/equipmentguest/equipmentguest'
import Equipmenttype from '@/views/ironsteward/equipmenttype/equipmenttype'
import Guestcontrol from '@/views/ironsteward/guestcontrol/guestcontrol'
import Ironsteward from '@/views/ironsteward/ironsteward/ironsteward'
/**
 * 点击OTA进入的页面
 */
/**ota直连*/
import Connectioncommon from '@/views/connection/common/home'
import Connection from '@/views/connection/connection'
import Orderform from '@/views/connection/order-form'
import OtaRoomType from '@/views/connection/room-type'
import OtaConfiguration from '@/views/connection/configuration'
import OtaDeploy from '@/views/connection/deploy'
import  OtaCorporation from '@/views/connection/corporation'
import Product from '@/views/connection/product'
import Otaset from '@/views/connection/ota-set'
import Reptile from '@/views/connection/reptile'
import Reportota from '@/views/connection/ota-report'
/**
 * 点击会管家进入的路由
 */
import Meetsteward from '@/views/meetsteward/meetsteward'
import Home_meet from '@/views/meetsteward/common/home_meet'
import LeftNav from '@/components/nav/leftNav.vue'
import NotFound from '@/components/404.vue'
import RightContent from '@/components/nav/rightContent.vue'
/**
 * 销控宝路由设置
 */
import Treasure from '@/views/pincontrol-treasure/treasure/treasure';

/**
 * 库管家
 */

/**
 * 地管家
 */

/**
 * 点击钱管家进入的路由
 */
//这个是导航栏
import HomeShopping from '@/views/pursesteward/common/home-shopping'
//帐
import Accounting from '@/views/pursesteward/accounting/accounting'
import Curtain from '@/views/pursesteward/accounting/curtain'

//钱
import Money from '@/views/pursesteward/money/money'
import Cash from '@/views/pursesteward/money/cash'

//票
import Ticket from '@/views/pursesteward/ticket/ticket'
import Ballot from '@/views/pursesteward/ticket/ballot'

//设置
import Advanced from '@/views/pursesteward/advanced/advanced'
import Entryvalue from '@/views/pursesteward/advanced/entry-value'
import Commercialbill from '@/views/pursesteward/advanced/commercial-bill'
import ARaccount from '@/views/pursesteward/advanced/ar_account'
import Cashiers from '@/views/pursesteward/advanced/cashiers'
import Checkstand from '@/views/pursesteward/advanced/checkstand'
import Audit from '@/views/pursesteward/advanced/audit'
import Brew from '@/views/pursesteward/advanced/brew'
import Revocation from '@/views/pursesteward/advanced/revocation'
import Paymentmethod from '@/views/pursesteward/advanced/payment_method'
import paymentaccount from '@/views/pursesteward/advanced/payment_account'
import Securitytype from '@/views/pursesteward/advanced/security_type'
import Currency from '@/views/pursesteward/advanced/currency'
import Fixedcharges from '@/views/pursesteward/advanced/fixed_charges'
import Creditcard from '@/views/pursesteward/advanced/credit-card'

/**
 * 车管家
 */

/**
 * 事管家 - 任务体系路由设置
 */
import Taskscommon from '@/views/tasksystem/common/tasks-common'
import Tasks from '@/views/tasksystem/tasks/tasks'
import Person from '@/views/tasksystem/tasks/person'
import Roomservice from '@/views/tasksystem/tasks/room-service'
import Purchase from '@/views/tasksystem/tasks/purchase'
import Shuttlebus from '@/views/tasksystem/tasks/shuttle-bus'
import Engineering from '@/views/tasksystem/tasks/engineering'
import Human from '@/views/tasksystem/tasks/human'
import Awaken from '@/views/tasksystem/tasks/awaken'

/**
 * 路由的加载部分
 * @param resolve
 * @constructor
 */
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve);

Vue.use(Router)

let router = new Router({
  /**
   * 这里是需要加一行代码的 但是为了本地测试，测试阶段不加
   * mode：'history',
   */
  routes: [{
    path: '/login',
    name:'/login',
    type: 'login',
    component: Login
  },
    {
      path: '*',
      component: NotFound //当相应路由没有内容的时候
    },
    //登陆后进入的路由
    {
      path: '/',
      name: '/',
      type: 'main',
      component: Index
    },
    /**
     * 点击pms进入的路由
     */
    {
      path: '/main',
      type: 'home',
      name: 'update',
      redirect: '/main',
      component: Home,
      menuShow: true,
      children: [{
        path: '/main',
        component: RightContent,
        // component: Home,
        name: 'main_page', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/main',
          component: Main,
          name: '主页',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/houseStatus',
      type: 'home',
      name: 'houseStatus_page',
      redirect: '/houseStatus',
      component: Home,
      menuShow: true,
      children: [{
        path: '/houseStatus',
        component: RightContent,
        // component: Home,
        name: 'houseStatus_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/houseStatus',
          component: HouseStatus,
          name: '房态',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/orderList',
      type: 'home',
      name: 'orderList_page',
      redirect: 'orderList',
      component: Home,
      menuShow: true,
      children: [{
        path: '/orderList',
        component: RightContent,
        name: 'orderList_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/orderList',
          component: OrderList,
          name: '预定',
          menuShow: true
        }]
      }]
    },
    {
      path: '/customer',
      type: 'home',
      name: 'customer_page',
      redirect: 'customer',
      component: Home,
      menuShow: true,
      children: [{
        path: '/customer',
        component: RightContent,
        name: 'customer_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/customer',
          component: Customer,
          name: '客户',
          menuShow: true
        }]
      }]
    },
    {
      path: '/marketing',
      type: 'home',
      name: 'marketing_page',
      redirect: 'marketing',
      component: Home,
      menuShow: true,
      children: [{
        path: '/marketing',
        component: RightContent,
        name: 'marketing_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/marketing',
          component: Marketings,
          name: '市场',
          menuShow: true
        }]
      }]
    },
    {
      path: '/invoicing',
      type: 'home',
      name: 'invoicing_page',
      redirect: 'invoicing',
      component: Home,
      menuShow: true,
      children: [{
        path: '/invoicing',
        component: RightContent,
        name: 'invoicing_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/invoicing',
          component: Invoicing,
          name: '发票',
          menuShow: true
        }]
      }]
    },
    {
      path: '/accountsReceivable',
      type: 'home',
      name: 'accountsReceivable_page',
      redirect: 'accountsReceivable',
      component: Home,
      menuShow: true,
      children: [{
        path: '/accountsReceivable',
        component: RightContent,
        name: 'accountsReceivable_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/accountsReceivable',
          component: AccountsReceivable,
          name: '财务',
          menuShow: true
        }]
      }]
    },
    {
      path: '/nightaudit',
      type: 'home',
      name: 'nightaudit_page',
      redirect: 'nightaudit',
      component: Home,
      menuShow: true,
      children: [{
        path: '/nightaudit',
        component: RightContent,
        name: 'nightaudit_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/nightaudit',
          component: Nightaudit,
          name: '夜审',
          menuShow: true
        }]
      }]
    },
    /**
     * 团队路由
     */
    {
      path: '/team',
      type: 'home',
      name: 'team_page',
      redirect: 'team',
      component: Home,
      menuShow: true,
      children: [{
        path: '/team',
        component: RightContent,
        name: 'team_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/team',
          component: Team,
          name: '团队',
          menuShow: true
        }]
      }]
    },
    {
      path: '/setting',
      type: 'home',
      name: 'setting_page',
      redirect: '/setting/roomSet',
      component: Home,
      menuShow: true,
      children: [{
        path: '/setting',
        component: () =>
          import('@/views/pms/setting/setting'),
        name: 'setting_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/setting/roomSet',
          component: () =>
            import('@/views/pms/setting/roomSet'),
          name: 'roomSet_page',
          menuShow: true,
        }, {
          path: '/setting/charges',
          component: () =>
            import('@/views/pms/setting/charges'),
          name: 'charges_page',
          menuShow: true,
        }, {
          path: '/setting/personnel',
          component: () =>
            import('@/views/pms/setting/personnel'),
          name: 'personnel_page',
          menuShow: true,
        }, {
          path: '/setting/discountidea',
          component: () =>
            import('@/views/pms/setting/discountidea'),
          name: 'discountidea_page',
          menuShow: true,
        }, {
          path: '/setting/hpcode',
          component: () =>
            import('@/views/pms/setting/hpcode'),
          name: 'hpcode_page',
          menuShow: true,
        }, {
          path: '/setting/houroomprice',
          component: () =>
            import('@/views/pms/setting/houroomprice'),
          name: 'houroomprice_page',
          menuShow: true,
        }, {
          path: '/setting/packageraly',
          component: () =>
            import('@/views/pms/setting/packageraly'),
          name: 'packageraly_page',
          menuShow: true,
        }, {
          path: '/setting/commissionidea',
          component: () =>
            import('@/views/pms/setting/commissionidea'),
          name: 'commissionidea_page',
          menuShow: true,
        }, {
          path: '/setting/coupontype',
          component: () =>
            import('@/views/pms/setting/coupontype'),
          name: 'coupontype_page',
          menuShow: true,
        }, {
          path: '/setting/creadittype',
          component: () =>
            import('@/views/pms/setting/creadittype'),
          name: 'creadittype_page',
          menuShow: true,
        }, {
          path: '/setting/code',
          component: () =>
            import('@/views/pms/setting/code'),
          name: 'code_page',
          menuShow: true,
        }, {
          path: '/setting/equipment',
          component: () =>
            import('@/views/pms/setting/equipment'),
          name: 'equipment_page',
          menuShow: true,
        }, {
          path: '/setting/system',
          component: () =>
            import('@/views/pms/setting/system'),
          name: 'system',
          menuShow: true,
        }, {
          path: '/setting/print',
          component: () =>
            import('@/views/pms/setting/print'),
          name: 'print_page',
          menuShow: true,
        }, ]
      }]
    },
    {
      path: '/reports',
      type: 'home',
      name: 'reports_page',
      redirect: '/reports/cashierReport',
      component: Home,
      menuShow: true,
      children: [{
        path: '/reports',
        component: () =>
        import('@/views/pms/reports/reports'),
        name: 'reports',
        menuShow: true,
        children: [{
          path: '/reports/cleanRoomRecord',
          component: () =>
          import('@/views/pms/reports/cleanRoomRecord'),
          name: 'cleanRoomRecord',
          menuShow: true
        },
        {
          path: '/reports/longLiveReport',
          component: () =>
            import('@/views/pms/reports/longLiveReport'),
          name: 'longLiveReport',
          menuShow: true,
        },
        {
          path: '/reports/continueReport',
          component: () =>
          import('@/views/pms/reports/continueReport'),
          name: 'continueReport',
          menuShow: true,
        },
        {
          path: '/reports/shouYinBill',
          component: () =>
          import('@/views/pms/reports/shouYinBill'),
          name: 'shouYinBill',
          menuShow: true
        },
        
        {
          path: '/reports/stockSouMai',
          component: () =>
          import('@/views/pms/reports/stockSouMai'),
          name: 'stockSouMai',
          menuShow: true
        },
        {
          path: '/reports/stockNoSouMai',
          component: () =>
          import('@/views/pms/reports/stockNoSouMai'),
          name: 'stockNoSouMai',
          menuShow: true
        },
        {
          path: '/reports/stockTui',
          component: () =>
            import('@/views/pms/reports/stockTui'),
          name: 'stockTui',
          menuShow: true
        },
        {
          path: '/reports/stockBaoFei',
          component: () =>
          import('@/views/pms/reports/stockBaoFei'),
          name: 'stockBaoFei',
          menuShow: true
        },
        {
          path: '/reports/shangPing',
          component: () =>
          import('@/views/pms/reports/shangPing'),
          name: 'shangPing',
          menuShow: true
        },
        {
          path: '/reports/memberCardSale',
          component: () =>
          import('@/views/pms/reports/memberCardSale'),
          name: 'memberCardSale',
          menuShow: true
        },
        {
          path: '/reports/arDetail',
          component: () =>
          import('@/views/pms/reports/arDetail'),
          name: 'arDetail',
          menuShow: true,
        },
        {
          path: '/reports/arSummary',
          component: () =>
          import('@/views/pms/reports/arSummary'),
          name: 'arSummary',
          menuShow: true,
        },
          {
            path: '/reports/checkRoomContent',
            component: () =>
            import('@/views/pms/reports/checkRoomContent'),
            name: 'checkRoomContent',
            menuShow: true,
          }, {
            path: '/reports/checkRoomRecord',
            component: () =>
            import('@/views/pms/reports/checkRoomRecord'),
            name: 'checkRoomRecord',
            menuShow: true,
          },
          {
            path: '/reports/commonReport',
            component: () =>
              import('@/views/pms/reports/commonReport'),
            name: 'commonReport',
            menuShow: true
          },
          {
            path: '/reports/cashierReport',
            component: () =>
              import('@/views/pms/reports/cashierReport'),
            name: 'cashierReport',
            menuShow: true,
          }, {
            path: '/reports/cashierNoReport',
            component: () =>
              import('@/views/pms/reports/cashierNoReport'),
            name: 'cashierNoReport',
            menuShow: true,
          },
          {
            path: '/reports/entryDetailReport',
            component: () =>
              import('@/views/pms/reports/entryDetailReport'),
            name: 'entryDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/entrySimpleReport',
            component: () =>
              import('@/views/pms/reports/entrySimpleReport'),
            name: 'entrySimpleReport',
            menuShow: true,
          },
          {
            path: '/reports/entrySummaryReport',
            component: () =>
              import('@/views/pms/reports/entrySummaryReport'),
            name: 'entrySummaryReport',
            menuShow: true,
          },
          {
            path: '/reports/receiveDetailReport',
            component: () =>
              import('@/views/pms/reports/receiveDetailReport'),
            name: 'receiveDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/receiveSummaryReport',
            component: () =>
              import('@/views/pms/reports/receiveSummaryReport'),
            name: 'receiveSummaryReport',
            menuShow: true,
          },
          {
            path: '/reports/chongDiaoReport',
            component: () =>
              import('@/views/pms/reports/chongDiaoReport'),
            name: 'chongDiaoReport',
            menuShow: true,
          },
          {
            path: '/reports/resolveSummaryReport',
            component: () =>
              import('@/views/pms/reports/resolveSummaryReport'),
            name: 'resolveSummaryReport',
            menuShow: true,
          },
          {
            path: '/reports/resolveDetailReport',
            component: () =>
              import('@/views/pms/reports/resolveDetailReport'),
            name: 'resolveDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/dateReport',
            component: () =>
              import('@/views/pms/reports/dateReport'),
            name: 'dateReport',
            menuShow: true,
          },
          {
            path: '/reports/dateCodeReport',
            component: () =>
              import('@/views/pms/reports/dateCodeReport'),
            name: 'dateCodeReport',
            menuShow: true,
          },
          {
            path: '/reports/monthReport',
            component: () =>
              import('@/views/pms/reports/monthReport'),
            name: 'monthReport',
            menuShow: true,
          },
          {
            path: '/reports/dateSimpleReport',
            component: () =>
              import('@/views/pms/reports/dateSimpleReport'),
            name: 'dateSimpleReport',
            menuShow: true,
          },
          {
            path: '/reports/dateCountReport',
            component: () =>
              import('@/views/pms/reports/dateCountReport'),
            name: 'dateCountReport',
            menuShow: true,
          },
          {
            path: '/reports/eatCountReport',
            component: () =>
              import('@/views/pms/reports/eatCountReport'),
            name: 'eatCountReport',
            menuShow: true,
          },
          {
            path: '/reports/lateCountReport',
            component: () =>
              import('@/views/pms/reports/lateCountReport'),
            name: 'lateCountReport',
            menuShow: true,
          },
          {
            path: '/reports/selfReport',
            component: () =>
              import('@/views/pms/reports/selfReport'),
            name: 'selfReport',
            menuShow: true,
          },
          {
            path: '/reports/previewReport',
            component: () =>
              import('@/views/pms/reports/previewReport'),
            name: 'previewReport',
            menuShow: true,
          },
          {
            path: '/reports/yaHouseReport',
            component: () =>
              import('@/views/pms/reports/yaHouseReport'),
            name: 'yaHouseReport',
            menuShow: true,
          },
          {
            path: '/reports/loginReport',
            component: () =>
              import('@/views/pms/reports/loginReport'),
            name: 'loginReport',
            menuShow: true,
          },
          {
            path: '/reports/cardReport',
            component: () =>
              import('@/views/pms/reports/cardReport'),
            name: 'cardReport',
            menuShow: true,
          },
          {
            path: '/reports/onLiveReport',
            component: () =>
              import('@/views/pms/reports/onLiveReport'),
            name: 'onLiveReport',
            menuShow: true,
          },
          {
            path: '/reports/historyReport',
            component: () =>
              import('@/views/pms/reports/historyReport'),
            name: 'historyReport',
            menuShow: true,
          },
          {
            path: '/reports/onPriceReport',
            component: () =>
              import('@/views/pms/reports/onPriceReport'),
            name: 'onPriceReport',
            menuShow: true,
          },
          {
            path: '/reports/tempReport',
            component: () =>
              import('@/views/pms/reports/tempReport'),
            name: 'tempReport',
            menuShow: true,
          },
          {
            path: '/reports/resolveBillReport',
            component: () =>
              import('@/views/pms/reports/resolveBillReport'),
            name: 'resolveBillReport',
            menuShow: true,
          },
          {
            path: '/reports/selfReport',
            component: () =>
              import('@/views/pms/reports/selfReport'),
            name: 'selfReport',
            menuShow: true,
          },
          {
            path: '/reports/operationReport',
            component: () =>
              import('@/views/pms/reports/operationReport'),
            name: 'operationReport',
            menuShow: true,
          },
          {
            path: '/reports/previewLeaveReport',
            component: () =>
              import('@/views/pms/reports/previewLeaveReport'),
            name: 'previewLeaveReport',
            menuShow: true,
          },
          {
            path: '/reports/exceptionReport',
            component: () =>
              import('@/views/pms/reports/exceptionReport'),
            name: 'exceptionReport',
            menuShow: true,
          },
          {
            path: '/reports/previewRecordReport',
            component: () =>
              import('@/views/pms/reports/previewRecordReport'),
            name: 'previewRecordReport',
            menuShow: true,
          },
          {
            path: '/reports/previewAlyReport',
            component: () =>
              import('@/views/pms/reports/previewAlyReport'),
            name: 'previewAlyReport',
            menuShow: true,
          },
          {
            path: '/reports/datePreviewReport',
            component: () =>
              import('@/views/pms/reports/datePreviewReport'),
            name: 'datePreviewReport',
            menuShow: true,
          },
          {
            path: '/reports/memberRegReport',
            component: () =>
              import('@/views/pms/reports/memberRegReport'),
            name: 'memberRegReport',
            menuShow: true,
          },
          {
            path: '/reports/memberCzdetailReport',
            component: () =>
              import('@/views/pms/reports/memberCzdetailReport'),
            name: 'memberCzdetailReport',
            menuShow: true,
          },
          {
            path: '/reports/memberXfdetailReport',
            component: () =>
              import('@/views/pms/reports/memberXfdetailReport'),
            name: 'memberXfdetailReport',
            menuShow: true,
          },
          {
            path: '/reports/memberXfCountReport',
            component: () =>
              import('@/views/pms/reports/memberXfCountReport'),
            name: 'memberXfCountReport',
            menuShow: true,
          },
          {
            path: '/reports/memberCzfreezeReport',
            component: () =>
              import('@/views/pms/reports/memberCzfreezeReport'),
            name: 'memberCzfreezeReport',
            menuShow: true,
          },
          {
            path: '/reports/memberScoreReport',
            component: () =>
              import('@/views/pms/reports/memberScoreReport'),
            name: 'memberScoreReport',
            menuShow: true,
          },
          {
            path: '/reports/memberCspointReport',
            component: () =>
              import('@/views/pms/reports/memberCspointReport'),
            name: 'memberCspointReport',
            menuShow: true,
          },
          {
            path: '/reports/memberOperationReport',
            component: () =>
              import('@/views/pms/reports/memberOperationReport'),
            name: 'memberOperationReport',
            menuShow: true,
          },
          {
            path: '/reports/unitDataReport',
            component: () =>
              import('@/views/pms/reports/unitDataReport'),
            name: 'unitDataReport',
            menuShow: true,
          },
          {
            path: '/reports/unitDetailReport',
            component: () =>
              import('@/views/pms/reports/unitDetailReport'),
            name: 'unitDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/unitXfReport',
            component: () =>
              import('@/views/pms/reports/unitXfReport'),
            name: 'unitXfReport',
            menuShow: true,
          },
          {
            path: '/reports/unitRecesiveReport',
            component: () =>
              import('@/views/pms/reports/unitRecesiveReport'),
            name: 'unitRecesiveReport',
            menuShow: true,
          },
          {
            path: '/reports/unitRecordReport',
            component: () =>
              import('@/views/pms/reports/unitRecordReport'),
            name: 'unitRecordReport',
            menuShow: true,
          },
          {
            path: '/reports/unitAgeReport',
            component: () =>
              import('@/views/pms/reports/unitAgeReport'),
            name: 'unitAgeReport',
            menuShow: true,
          },
          {
            path: '/reports/unitRegeReport',
            component: () =>
              import('@/views/pms/reports/unitRegeReport'),
            name: 'unitRegeReport',
            menuShow: true,
          },
          {
            path: '/reports/selfDetailReport',
            component: () =>
              import('@/views/pms/reports/selfDetailReport'),
            name: 'selfDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/selfFindReport',
            component: () =>
              import('@/views/pms/reports/selfFindReport'),
            name: 'selfFindReport',
            menuShow: true,
          },
          {
            path: '/reports/hsEditReport',
            component: () =>
              import('@/views/pms/reports/hsEditReport'),
            name: 'hsEditReport',
            menuShow: true,
          },
          {
            path: '/reports/hsCleanReport',
            component: () =>
              import('@/views/pms/reports/hsCleanReport'),
            name: 'hsCleanReport',
            menuShow: true,
          },
          {
            path: '/reports/foodDetailReport',
            component: () =>
              import('@/views/pms/reports/foodDetailReport'),
            name: 'foodDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/foodCountReport',
            component: () =>
              import('@/views/pms/reports/foodCountReport'),
            name: 'foodCountReport',
            menuShow: true,
          },
          {
            path: '/reports/foodSortReport',
            component: () =>
              import('@/views/pms/reports/foodSortReport'),
            name: 'foodSortReport',
            menuShow: true,
          },
          {
            path: '/reports/foodFlDetailReport',
            component: () =>
              import('@/views/pms/reports/foodFlDetailReport'),
            name: 'foodFlDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/foodFlCountReport',
            component: () =>
              import('@/views/pms/reports/foodFlCountReport'),
            name: 'foodFlCountReport',
            menuShow: true,
          },
          {
            path: '/reports/foodWaterReport',
            component: () =>
              import('@/views/pms/reports/foodWaterReport'),
            name: 'foodWaterReport',
            menuShow: true,
          },
          {
            path: '/reports/foodRecordReport',
            component: () =>
              import('@/views/pms/reports/foodRecordReport'),
            name: 'foodRecordReport',
            menuShow: true,
          },
          {
            path: '/reports/foodOperationReport',
            component: () =>
              import('@/views/pms/reports/foodOperationReport'),
            name: 'foodOperationReport',
            menuShow: true,
          },
          {
            path: '/reports/productCountReport',
            component: () =>
              import('@/views/pms/reports/productCountReport'),
            name: 'productCountReport',
            menuShow: true,
          },
          {
            path: '/reports/productDetailReport',
            component: () =>
              import('@/views/pms/reports/productDetailReport'),
            name: 'productDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/productWaterReport',
            component: () =>
              import('@/views/pms/reports/productWaterReport'),
            name: 'productWaterReport',
            menuShow: true,
          },
          {
            path: '/reports/productWaterCountReport',
            component: () =>
              import('@/views/pms/reports/productWaterCountReport'),
            name: 'productWaterCountReport',
            menuShow: true,
          },
          {
            path: '/reports/productVoucherReport',
            component: () =>
              import('@/views/pms/reports/productVoucherReport'),
            name: 'productVoucherReport',
            menuShow: true,
          },
          {
            path: '/reports/productUseReport',
            component: () =>
              import('@/views/pms/reports/productUseReport'),
            name: 'productUseReport',
            menuShow: true,
          },
          {
            path: '/reports/productParkReport',
            component: () =>
              import('@/views/pms/reports/productParkReport'),
            name: 'productParkReport',
            menuShow: true,
          },
          {
            path: '/reports/saleCountReport',
            component: () =>
              import('@/views/pms/reports/saleCountReport'),
            name: 'saleCountReport',
            menuShow: true,
          },
          {
            path: '/reports/saleDetailReport',
            component: () =>
              import('@/views/pms/reports/saleDetailReport'),
            name: 'saleDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/saleQsDetailReport',
            component: () =>
              import('@/views/pms/reports/saleQsDetailReport'),
            name: 'saleQsDetailReport',
            menuShow: true,
          },
          {
            path: '/reports/saleSortReport',
            component: () =>
              import('@/views/pms/reports/saleSortReport'),
            name: 'saleSortReport',
            menuShow: true,
          }
        ]
      }]
    },
    {
      path: '/shifting',
      type: 'home',
      name: 'shifting_page',
      redirect: 'shifting',
      component: Home,
      menuShow: true,
      children: [{
        path: '/shifting',
        component: RightContent,
        name: 'shifting_update',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/shifting',
          component: Shifting,
          name: '交接班',
          menuShow: true
        }]
      }]
    },
    /**
     * 点击店控进入的路由
     */
    {
      path: '/module-tree',
      type: 'home',
      name: 'moduleTree',
      redirect: '/module-tree',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-tree',
        component: ModuleTree,
        // component: Home,
        name: 'module-tree', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-tree/moduleinformation',
          component: Moduleinformation,
          name: '模块信息',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-type-setting',
      type: 'home',
      name: 'modulesetting',
      redirect: '/modulet-ype-setting',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-typese-sting',
        component: Moduletypesetting,
        // component: Home,
        name: 'module-type-setting', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-type-setting/module-type',
          component: Moduletype,
          name: '模块类型2',
          menuShow: true
        },
          {
            path: '/module-type-setting/kind',
            component: Kind,
            name: '模块种类',
            menuShow: true
          },
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-login-log',
      type: 'home',
      name: 'modulelog',
      redirect: '/module-login-log',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-login-log',
        component: Moduleloginlog,
        // component: Home,
        name: 'module-login-log', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-login-log/log',
          component: Log,
          name: '模块类型1',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-versioning',
      type: 'home',
      name: 'moduleversioning',
      redirect: '/module-versioning',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-versioning',
        component: Moduleversioning,
        // component: Home,
        name: 'module-versioning', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-versioning/version-list',
          component: Versionlist,
          name: '模块类型',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/module-sales-management',
      type: 'home',
      name: 'modulemanagement',
      redirect: '/module-sales-management',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/module-sales-management',
        component: Modulesalesmanagement,
        // component: Home,
        name: 'module-sales-management', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/module-sales-management/management',
          component: Management,
          name: '销售管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/organization',
      type: 'home',
      name: 'ozation',
      redirect: '/organization',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/organization',
        component: Organization,
        // component: Home,
        name: 'organization', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/organization/basic-info',
          component: Basicinfo,
          name: '组织机构管理',
          menuShow: true
        },
          {
            path: '/organizationchart/hotel',
            component: Hotel,
            name: '酒店',
            menuShow: true
          },
          {
            path: '/organizationchart/sections',
            component: Sections,
            name: '部门',
            menuShow: true
          },
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/personal-role',
      type: 'home',
      name: 'personalrole',
      redirect: '/personal-role',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/personal-role',
        component: Personalrole,
        // component: Home,
        name: 'personal-role', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/personal-role/role',
          component: Role,
          name: '人员角色管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/permissions',
      type: 'home',
      name: 'permi_ssions',
      redirect: '/permissions',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/permissions',
        component: Permissions,
        // component: Home,
        name: 'permissions', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/permissions/role-privileges',
          component: Roleprivileges,
          name: '排版考勤管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/composing',
      type: 'home',
      name: 'comp_osing',
      redirect: '/composing',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/composing',
        component: Composing,
        // component: Home,
        name: 'composing', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/composing/checking-in',
          component: Checkingin,
          name: '班次设置',
          menuShow: true
        },
          {
            path: '/composing/crew',
            component: Crew,
            name: '人员排班',
            menuShow: true
          },
          {
            path: '/composing/summary_one',
            component: SummaryOne,
            name: '考勤一览表',
            menuShow: true
          },
          {
            path: '/composing/audit_management',
            component: AuditManagement,
            name: '审核管理',
            menuShow: true
          }
        ]
      }]
    },
    {
      path: '/pay',
      type: 'home',
      name: 'pay_pay',
      redirect: '/pay',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/pay',
        component: Pay,
        // component: Home,
        name: 'pay', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/pay/compensation',
          component: Compensation,
          name: '薪资管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    {
      path: '/setting',
      type: 'home',
      name: 'seti',
      redirect: '/setting',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/setting',
        component: Setting,
        // component: Home,
        name: 'setg', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/setting/papers',
          component: Papers,
          name: '证件',
          menuShow: true
        },
          {
            path: '/setting/marketing',
            component: Marketing,
            name: '市场销售',
            menuShow: true
          },
          {
            path: '/setting/room-status',
            component: Roomstatus,
            name: '房态1',
            menuShow: true
          },
          {
            path: '/setting/reserve',
            component: Reserve,
            name: '预定1',
            menuShow: true
          },
          {
            path: '/setting/reception',
            component: Reception,
            name: '前台',
            menuShow: true
          },
          {
            path: '/setting/guest-room',
            component: Guestroom,
            name: '客房',
            menuShow: true
          },
          {
            path: '/setting/else',
            component: Else,
            name: '其他',
            menuShow: true
          }
        ]
      }]
    },
    {
      path: '/page-management',
      type: 'home',
      name: 'page-management',
      redirect: '/page-management',
      component: Homes,
      menuShow: true,
      children: [{
        path: '/page-management',
        component: Pagemanagement,
        // component: Home,
        name: 'page', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/page-management/page-table',
          component: Pagetable,
          name: '页面管理',
          menuShow: true
        },
          // {path: '/organizationchart/Internalcontrol',  component: Internalcontrol, name: '内控人员和权限管理', menuShow: true},
          // {path: '/organizationchart/personrole',  component: Personrole, name: '人员权限', menuShow: true},
          // {path: '/organizationchart/rolemanager',  component: Rolemanager, name: '权限管理', menuShow: true}
        ]
      }]
    },
    /**
     * 客管家
     */
    // member会员进入路由
    {
      path: '/member',
      type: 'index',
      name: '会员',
      component: () =>
        import('@/views/member/Member'),
      redirect: '/MemberList',
      children: [{
        path: '/MemberPlan',
        component: () =>
          import('@/views/member/MemberPlan'),
        name: 'memberPlan_page'
      },
        {
          path: '/Integral',
          component: () =>
            import('@/views/member/Integral'),
          name: 'Integral_page'
        },
        {
          path: '/Stored',
          component: () =>
            import('@/views/member/Stored'),
          name: 'Stored_page'
        },
        {
          path: '/SaleRules',
          component: () =>
            import('@/views/member/SaleRules'),
          name: 'SaleRules_page'
        },
        {
          path: '/MemberList',
          component: () =>
            import('@/views/member/MemberList'),
          name: 'MemberList_page'
        },
        {
          path: '/IntegralList',
          component: () =>
            import('@/views/member/IntegralList'),
          name: 'IntegralList_page'
        },
        {
          path: '/StoredList',
          component: () =>
            import('@/views/member/StoredList'),
          name: 'StoredList_page'
        }
      ]
    },
    {
      path: '/MemberLogin',
      component: ()=>import('@/views/member/MemberLogin'),
      name: 'MemberLogin'
    },
    {
      path: '/agreement',
      type: 'index',
      name: '会员',
      component: ()=>import('@/views/agreement/agreement'),
      redirect:'/agreementMemberList',
      children: [
        {
          path: '/agreementPlan',
          component: ()=>import('@/views/agreement/agreementPlan'),
          name: 'memberPlan_page'
        },
        {
          path: '/agreementIntegral',
          component: ()=>import('@/views/agreement/agreementIntegral'),
          name: 'Integral_page'
        },
        {
          path: '/agreementStored',
          component: ()=>import('@/views/agreement/agreementStored'),
          name: 'Stored_page'
        },
        {
          path:'/agreementSaleRules',
          component: ()=>import('@/views/agreement/agreementSaleRules'),
          name: 'agreementSaleRules_page'
        },
        {
          path: '/agreementMemberList',
          component: ()=>import('@/views/agreement/agreementMemberList'),
          name: 'agreementMemberList_page'
        },
        {
          path: '/agreementIntegralList',
          component: ()=>import('@/views/agreement/agreementIntegralList'),
          name: 'IntegralList_page'
        },
        {
          path: '/agreementStoredList',
          component: ()=>import('@/views/agreement/agreementStoredList'),
          name: 'agreementStoredList_page'
        }
      ]
    },
    // 客管家宾客的路由
    {
      path: '/guests',
      type: 'guests',
      name: '宾客',
      component: ()=>import('@/views/guests/guests'),
    },
    // 客管家宾客的路由
    {
      path: '/team',
      type: 'team',
      name: '团队',
      component: ()=>import('@/views/team/team'),
    },
    /**
     * 点击铁管家进入的路由
     */
    {
      path: '/ironsteward',
      type: 'ironhome',
      name: 'ironsteward_page',
      redirect: '/ironsteward',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/ironsteward',
        component: RightContent,
        // component: Home,
        name: 'ironsteward_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/ironsteward',
          component: Ironsteward,
          name: '铁管家',
          menuShow: true
        }, ]
      }]
    },
    /**点击ota进入的路由 */
    /**
     * ota直连
     * */
    {
      path: '/connection',
      type: 'home',
      name: 'connection',
      redirect: '/connection',
      component: Connectioncommon,
      menuShow: true,
      children: [{
        path: '/connection',
        component: Connection,
        // component: Home,
        name: 'connection_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [
          {
            path: '/connection/order-form',
            component: Orderform,
            name: '订单',
            menuShow: true
          },
          {
            path: '/connection/corporation',
            component: OtaCorporation,
            name: '公司',
            menuShow: true
          },
          {
            path: '/connection/room-type',
            component: OtaRoomType,
            name: '房型',
            menuShow: true
          },
          {
            path: '/connection/configuration',
            component: OtaConfiguration,
            name: '调价',
            menuShow: true
          },
          {
            path: '/connection/deploy',
            component: OtaDeploy ,
            name: '配置',
            menuShow: true
          },
          {
            path: '/connection/product',
            component:Product,
            name: '产品',
            menuShow: true
          },
          {
            path: '/connection/ota-set',
            component:Otaset,
            name: '设置',
            menuShow: true
          },
          {
            path: '/connection/reptile',
            component: Reptile,
            name: '爬虫报错',
            menuShow: true
          },
          {
            path: '/connection/ota-report',
            component:Reportota,
            name: '报表',
            menuShow: true
          },

        ]
      }]
    },
    {
      path: '/equipmentcommon',
      type: 'ironhome',
      name: 'equipmentcommon_page',
      redirect: '/equipmentcommon',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/equipmentcommon',
        component: RightContent,
        // component: Home,
        name: 'equipmentcommon_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/equipmentcommon',
          component: Equipmentcommon,
          name: '设备',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/equipmentguest',
      type: 'ironhome',
      name: 'equipmentguest_page',
      redirect: '/equipmentguest',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/equipmentguest',
        component: RightContent,
        // component: Home,
        name: 'equipmentguest_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/equipmentguest',
          component: Equipmentguest,
          name: '设备设置',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/equipmenttype',
      type: 'ironhome',
      name: 'equipmenttype_page',
      redirect: '/equipmenttype',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/equipmenttype',
        component: RightContent,
        // component: Home,
        name: 'equipmenttype_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/equipmenttype',
          component: Equipmenttype,
          name: '设备类型',
          menuShow: true
        }, ]
      }]
    },
    {
      path: '/guestcontrol',
      type: 'ironhome',
      name: 'guestcontrol_page',
      redirect: '/guestcontrol',
      component: Ironhome,
      menuShow: true,
      children: [{
        path: '/guestcontrol',
        component: RightContent,
        // component: Home,
        name: 'guestcontrol_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/guestcontrol',
          component: Guestcontrol,
          name: '客控',
          menuShow: true
        }, ]
      }]
    },
    /**
     * 点击会管家进入的路由
     */
    {
      path: '/meetsteward',
      type: 'home',
      name: 'update',
      redirect: '/meetsteward',
      component: Home_meet,
      menuShow: true,
      children: [{
        path: '/meetsteward',
        component: RightContent,
        // component: Home,
        name: 'main_page', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/meetsteward',
          component: Meetsteward,
          name: '主页',
          menuShow: true
        }, ]
      }]
    },
    /**
     * 销控宝路由新
     */
    {
      path: '/treasure',
      //type: 'home',
      name: 'treasure_page',
      redirect: '/treasure/deduction-coupon',
      component: Home,
      menuShow: true,
      children: [{
        path: '/treasure',
        component: () =>
          import('@/views/pincontrol-treasure/treasure/treasure'),
        name: 'treasure_update',
        redirect: '/treasure/deduction-coupon',
        leaf: true,
        iconCls: 'iconfont icon-home',
        menuShow: true,
        children: [{
          path: '/treasure/deduction-coupon',
          component: () =>
            import('@/views/pincontrol-treasure/treasure/deduction-coupon'),
          name: 'deduction-coupon_page',
          menuShow: true,
        },
          {
            path: '/treasure/cash-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/cash-coupon'),
            name: 'treasure_page',
            menuShow: true,
          }, {
            path: '/treasure/room-upgrade-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/room-upgrade-coupon'),
            name: 'room-upgrade-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/serve-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/serve-coupon'),
            name: 'serve-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/current-rate-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/current-rate-coupon'),
            name: 'current-rate-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/discount-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/discount-coupon'),
            name: 'discount-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/list-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/list-coupon'),
            name: 'list-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/issue-detials-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/issue-detials-coupon'),
            name: 'issue-detials-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/sale-detials-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/sale-detials-coupon'),
            name: 'sale-detials-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/use-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/use-coupon'),
            name: 'use-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/use-detials-coupon',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/use-detials-coupon'),
            name: 'use-detials-coupon_page',
            menuShow: true,
          }, {
            path: '/treasure/hpcode',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/hpcode'),
            name: 'hpcode_page',
            menuShow: true,
          }, {
            path: '/treasure/houroomprice',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/houroomprice'),
            name: 'houroomprice_page',
            menuShow: true,
          }, {
            path: '/treasure/packageraly',
            component: () =>
              import('@/views/pincontrol-treasure/treasure/packageraly'),
            name: 'hpcode_page',
            menuShow: true,
          }
        ]
      }]
    },
    /**
     * 库管家
     */
    /**
     * 地管家
     */
    {
      path: '/land',
      type: 'index',
      name: '地管家',
      component: () =>
        import('@/views/landsteward/land'),
      redirect: '/roomSetting',
      children: [{
        path: '/roomSetting',
        component: () =>
          import('@/views/landsteward/roomSetting'),
        name: 'roomSetting_page'
      },
        {
          path: '/buroomSetting',
          component: () =>
            import('@/views/landsteward/buroomsetting'),
          name: 'buroomsetting_page'
        },
        {
          path: '/cleanSetting',
          component: () =>
            import('@/views/landsteward/cleansetting'),
          name: 'cleansetting_page'
        },
        {
          path: '/eatSetting',
          component: () =>
            import('@/views/landsteward/eatsetting'),
          name: 'eatsetting_page'
        },
        {
          path: '/elevatorSetting',
          component: () =>
            import('@/views/landsteward/elevatorsetting'),
          name: 'elevatorsetting_page'
        },
        {
          path: '/gtingSetting',
          component: () =>
            import('@/views/landsteward/gtingsetting'),
          name: 'gtingsetting_page'
        },
        {
          path: '/ktvSetting',
          component: () =>
            import('@/views/landsteward/ktvsetting'),
          name: 'ktvsetting_page'
        },
        {
          path: '/lobbySetting',
          component: () =>
            import('@/views/landsteward/lobbysetting'),
          name: 'lobbysetting_page'
        },
        {
          path: '/mettingSetting',
          component: () =>
            import('@/views/landsteward/mettingsetting'),
          name: 'mettingsetting_page'
        },
        {
          path: '/storeSetting',
          component: () =>
            import('@/views/landsteward/storesetting'),
          name: 'storesetting_page'
        },
        {
          path: '/weakSetting',
          component: () =>
            import('@/views/landsteward/weaksetting'),
          name: 'weaksetting_page'
        }
      ]
    },
    /**
     * 钱管家路由
     */
    {
      path: '/accounting',
      type: 'home',
      name: 'accounting',
      redirect: '/accounting',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/accounting',
        component: Accounting,
        // component: Home,
        name: 'accounting_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/accounting/curtain',
          component: Curtain,
          name: '帐',
          menuShow: true
        },
          {
            path: '/accounting/money',
            component: Money,
            name: '钱',
            menuShow: true
          },
          {
            path: '/accounting/ticket',
            component: Ticket,
            name: '票',
            menuShow: true
          },
          {
            path: '/accounting/advanced',
            component: Advanced,
            name: '设置',
            menuShow: true
          },
        ]
      }]
    },
    {
      path: '/money',
      type: 'home',
      name: 'money',
      redirect: '/money',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/money',
        component: Money,
        // component: Home,
        name: 'money_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/money/cash',
          component: Cash,
          name: '现金',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/ticket',
      type: 'home',
      name: 'ticket',
      redirect: '/ticket',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/ticket',
        component: Ticket,
        // component: Home,
        name: 'ticket_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/ticket/ballot',
          component: Ballot,
          name: '票据',
          menuShow: true
        },

        ]
      }]
    },
    {
      path: '/advanced',
      type: 'home',
      name: 'advanced',
      redirect: '/advanced',
      component: HomeShopping,
      menuShow: true,
      children: [{
        path: '/advanced',
        component: Advanced,
        // component: Home,
        name: 'advanced_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/advanced/entry-value',
          component: Entryvalue,
          name: '入账代码',
          menuShow: true
        },
          {
            path: '/advanced/brew',
            component: Brew,
            name: '冲调帐原因',
            menuShow: true
          },
          {
            path: '/advanced/audit',
            component: Audit,
            name: '查账原因',
            menuShow: true
          },
          {
            path: '/advanced/revocation',
            component: Revocation,
            name: '撤销原因',
            menuShow: true
          },
          {
            path: '/advanced/payment_method',
            component: Paymentmethod,
            name: '付款方式设置',
            menuShow: true
          },
          {
            path: '/advanced/payment_account',
            component: paymentaccount,
            name: '付款原因',
            menuShow: true
          },
          {
            path: '/advanced/commercial-bill',
            component: Commercialbill,
            name: '票据种类设置',
            menuShow: true
          },
          {
            path: '/advanced/ar_account',
            component: ARaccount,
            name: 'AR账户设置',
            menuShow: true
          },
          {
            path: '/advanced/cashiers',
            component: Cashiers,
            name: '收银点操作记录',
            menuShow: true
          },
          {
            path: '/advanced/checkstand',
            component: Checkstand,
            name: '收银点设置',
            menuShow: true
          },
          {
            path: '/advanced/security_type',
            component: Securitytype,
            name: '担保种类设置',
            menuShow: true
          },
          {
            path: '/advanced/currency',
            component: Currency,
            name: '币种设置',
            menuShow: true
          },
          {
            path: '/advanced/fixed_charges',
            component: Fixedcharges,
            name: '固定支出',
            menuShow: true
          },
          {
            path: '/advanced/credit-card',
            component: Creditcard,
            name: '信用卡设置',
            menuShow: true
          },
        ]
      }]
    },
    /**
     * 车管家
     */

    /**
     * 事管家
     */
    {
      path: '/tasks',
      type: 'home',
      name: 'tasks',
      redirect: '/tasks',
      component: Taskscommon,
      menuShow: true,
      children: [{
        path: '/tasks',
        component: Tasks,
        // component: Home,
        name: 'tasks_update', // 当前路由的name
        leaf: true, // 只有一个节点
        iconCls: 'iconfont icon-home', // 图标样式class
        menuShow: true,
        children: [{
          path: '/tasks/person',
          component: Person,
          name: '送物',
          menuShow: true
        },
          {
            path: '/tasks/room-service',
            component: Roomservice,
            name: '送餐',
            menuShow: true
          },
          {
            path: '/tasks/purchase',
            component: Purchase,
            name: '采购',
            menuShow: true
          },
          {
            path: '/tasks/shuttle-bus',
            component: Shuttlebus,
            name: '班车',
            menuShow: true
          },
          {
            path: '/tasks/engineering',
            component: Engineering,
            name: '工程配合',
            menuShow: true
          },
          {
            path: '/tasks/human',
            component: Human,
            name: '人员协作',
            menuShow: true
          },
          {
            path: '/tasks/awaken',
            component: Awaken,
            name: '叫醒',
            menuShow: true
          },

        ]
      }]
    },
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if(to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else if(to.path.startsWith('/register')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if(!user) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
});

// router.addRoutes(orderManagerRouter)

export default router
