{"source":"webpackJsonp([98],{LzO5:function(t,e){},kCJn:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=a(\"Qoyp\"),o=a(\"PJh5\"),n=a.n(o),i={name:\"cashierReport\",data:function(){return{isColor:!1,hotel_name:\"\",page_size:10,currentPage:1,total_page:0,tabel_reportData:[],todayDate:n()().format(\"YYYY-MM-DD\"),reportParam:{name:\"营业日报（区间）表\",id:\"yingInvoice_id\",page_num:1,page_size:15}}},components:{\"report-head\":r.a},mounted:function(){this.getReportInfo()},methods:{getReportInfo:function(){console.log(\"this.reportParam.page_num====\",this.reportParam),this.$refs.childReport.findToParent()},getInfowFromChild:function(t){this.tabel_reportData=t.reportData_list.result_list.total,console.log(\"this.tabel_reportData===传进来的值\",this.tabel_reportData);var e=t.reportData_list.result_list.room_data,a=e.count,r=e.percentage,o=e.price,n=e.average_price,i=this.resolveData(a,\"房间出租总数\",\"a、\"),l=this.resolveData(r,\"出租率%\",\"b、\"),s=this.resolveData(o,\"房租收入\",\"c、\"),p=this.resolveData(n,\"平均房价\",\"d、\");this.tabel_reportData=this.tabel_reportData.concat(i,l,s,p),this.hotel_name=t.hotel_name},resolveData:function(t,e,a){var r=t.findIndex(function(t){return t.project==e}),o=t.splice(r,1);return o[0].project=a+o[0].project,t.unshift(o[0]),t}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticStyle:{width:\"calc(100% - 60px)\",margin:\"auto\"}},[a(\"div\",{staticStyle:{border:\"1px dashed\",\"margin-top\":\"20px\",\"margin-bottom\":\"20px\",height:\"50px\"}},[a(\"el-row\",[a(\"h2\",{staticStyle:{\"text-align\":\"center\",\"line-height\":\"50px\"}},[e._v(\"营业日报（区间）表\")]),e._v(\" \"),a(\"span\",{staticStyle:{float:\"left\",\"margin-top\":\"-25px\",\"margin-left\":\"18px\"}},[e._v(e._s(e.hotel_name))]),e._v(\" \"),a(\"span\",{staticStyle:{float:\"right\",\"margin-top\":\"-25px\",\"margin-right\":\"18px\"}},[e._v(\"日期: \"+e._s(e.todayDate))])])],1),e._v(\" \"),a(\"div\",{on:{click:e.getReportInfo}},[a(\"report-head\",{ref:\"childReport\",attrs:{reportParam:e.reportParam},on:{listenToChild:e.getInfowFromChild}})],1),e._v(\" \"),a(\"el-row\",[a(\"el-table\",{staticStyle:{width:\"100%\",\"margin-top\":\"60px\"},attrs:{id:\"yingInvoice_id\",data:e.tabel_reportData,size:\"mini\",height:\"600\",\"cell-style\":{textAlign:\"center\"},\"header-cell-style\":{background:\"#303A41\",color:\"white\",textAlign:\"center\"}}},[a(\"el-table-column\",{attrs:{label:\"项目\"},scopedSlots:e._u([{key:\"default\",fn:function(t){return[a(\"span\",{class:{isFontColor:\"a、房间出租总数\"==t.row.project||\"b、出租率%\"==t.row.project||\"c、房租收入\"==t.row.project||\"d、平均房价\"==t.row.project?!e.isColor:e.isColor}},[e._v(\"\\n              \"+e._s(t.row.project)+\"\\n            \")])]}}])}),e._v(\" \"),a(\"el-table-column\",{attrs:{prop:\"interval\",label:\"本期\"}})],1)],1)],1)},staticRenderFns:[]};var s=a(\"VU/8\")(i,l,!1,function(t){a(\"LzO5\")},\"data-v-6e1481be\",null);e.default=s.exports}});"}