{"source":"webpackJsonp([88],{j5Ga:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=a(\"Qoyp\"),o=a(\"PJh5\"),n=a.n(o),l={name:\"cashierReport\",data:function(){return{hotel_name:\"\",page_size:10,currentPage:1,total_page:0,tabel_reportData:[],todayDate:n()().format(\"YYYY-MM-DD\"),reportParam:{name:\"AR账户收款汇总表\",id:\"arCount_id\",page_num:1,page_size:15}}},components:{\"report-head\":r.a},mounted:function(){this.getReportInfo()},methods:{getReportInfo:function(){console.log(\"this.reportParam.page_num====\",this.reportParam),this.$refs.childReport.findToParent()},getInfowFromChild:function(t){console.log(\"data子组件传来的值\",t),this.tabel_reportData=t.reportData_list,this.total_page=t.reportData_count,this.hotel_name=t.hotel_name},handleSizeChange:function(t){this.reportParam.page_size=t,this.getReportInfo(),console.log(\"每页 \"+t+\" 条\"),console.log(\"page_num\",this.reportParam.page_num)},handleCurrentChange:function(t){this.reportParam.page_num=t,this.getReportInfo(),console.log(\"当前页: \"+t)}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticStyle:{width:\"calc(100% - 60px)\",margin:\"auto\"}},[a(\"div\",{staticStyle:{border:\"1px dashed\",\"margin-top\":\"20px\",\"margin-bottom\":\"20px\",height:\"50px\"}},[a(\"el-row\",[a(\"h2\",{staticStyle:{\"text-align\":\"center\",\"line-height\":\"50px\"}},[t._v(\"AR账户收款汇总表\")]),t._v(\" \"),a(\"span\",{staticStyle:{float:\"left\",\"margin-top\":\"-25px\",\"margin-left\":\"18px\"}},[t._v(t._s(t.hotel_name))]),t._v(\" \"),a(\"span\",{staticStyle:{float:\"right\",\"margin-top\":\"-25px\",\"margin-right\":\"18px\"}},[t._v(\"日期: \"+t._s(t.todayDate))])])],1),t._v(\" \"),a(\"div\",{on:{click:t.getReportInfo}},[a(\"report-head\",{ref:\"childReport\",attrs:{reportParam:t.reportParam},on:{listenToChild:t.getInfowFromChild}})],1),t._v(\" \"),a(\"el-row\",[a(\"el-table\",{staticStyle:{width:\"100%\",\"margin-top\":\"60px\"},attrs:{id:\"arCount_id\",data:t.tabel_reportData,size:\"mini\",height:\"500\",\"header-cell-style\":{background:\"#303A41\",color:\"white\"}}},[a(\"el-table-column\",{attrs:{label:\"序号\",type:\"index\"}}),t._v(\" \"),a(\"el-table-column\",{attrs:{prop:\"pay_mode\",label:\"支付方式\"}}),t._v(\" \"),a(\"el-table-column\",{attrs:{prop:\"sum\",label:\"金额\"}}),t._v(\" \"),a(\"el-table-column\",{attrs:{prop:\"count\",label:\"笔数\"}})],1)],1),t._v(\" \"),a(\"el-pagination\",{attrs:{\"current-page\":t.currentPage,\"page-sizes\":[15,30,60],\"page-size\":t.page_size,layout:\"total, sizes, prev, pager, next, jumper\",total:t.total_page},on:{\"size-change\":t.handleSizeChange,\"current-change\":t.handleCurrentChange}})],1)},staticRenderFns:[]};var p=a(\"VU/8\")(l,i,!1,function(t){a(\"q9rJ\")},\"data-v-8221e63a\",null);e.default=p.exports},q9rJ:function(t,e){}});"}