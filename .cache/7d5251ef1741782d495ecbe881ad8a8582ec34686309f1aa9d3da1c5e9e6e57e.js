{"source":"webpackJsonp([102],{Vpbv:function(e,t){},f8CI:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var l={data:function(){return{masktype:!1,maskcheck:!1,maskguest:!1,maskwork:!1,maskShow:!1,valuedatatime:\"\",handrate:!1,escalrate:!0,activeName:\"first\",onehour:!0,twohour:!1,threehour:!1,fourhour:!1,fivehour:!1,sixhour:!1,tableDataCardType:[{cardNum:\"1002\",cardType:\"护照\"},{cardNum:\"1003\",cardType:\"身份证\"},{cardNum:\"1004\",cardType:\"军官证\"},{cardNum:\"1005\",cardType:\"学生证\"}],tableDataCheck:[],tableDataGuest:[],tableDataWork:[],tableDataHour:[],tableDataRoomRate:[],tableDataWeeHour:[]}},created:function(){},methods:{handleClick:function(e){console.log(e)},handleCurrentChange:function(e,t,a){console.log(e,t,a,t.currentTarget)},handleCardTypeEdit:function(e,t){console.log(e,t)},handleCardTypeDelete:function(e,t){console.log(e,t)},addDataCardType:function(){},setMaskDataCardType:function(){this.maskShow=!0,this.masktype=!0},handleCheckEdit:function(e,t){console.log(e,t)},handleCheckDelete:function(e,t){console.log(e,t)},addDataCheck:function(){},setMaskDataCheck:function(){this.maskShow=!0,this.maskcheck=!0},handleGuestEdit:function(e,t){console.log(e,t)},handleGuestDelete:function(e,t){console.log(e,t)},addDataGuest:function(){},setMaskDataGuest:function(){this.maskShow=!0,this.maskguest=!0},handleWorkEdit:function(e,t){console.log(e,t)},handleWorkDelete:function(e,t){console.log(e,t)},addDataWork:function(){},setMaskDataWork:function(){this.maskShow=!0,this.maskwork=!0},SetmaskShow:function(e){console.info(e),\"type\"==e?(this.maskShow=!1,this.masktype=!1):\"check\"==e?(this.maskShow=!1,this.maskcheck=!1):\"guest\"==e?(this.maskShow=!1,this.maskguest=!1):(this.maskShow=!1,this.maskwork=!1)}}},n={render:function(){var a=this,e=a.$createElement,l=a._self._c||e;return l(\"div\",{staticClass:\"code-all\"},[a._m(0),a._v(\" \"),l(\"div\",{staticClass:\"code-tab\"},[l(\"el-tabs\",{attrs:{type:\"card\"},on:{\"tab-click\":function(e){return a.handleClick(a.activeName)}},model:{value:a.activeName,callback:function(e){a.activeName=e},expression:\"activeName\"}},[l(\"el-tab-pane\",{attrs:{label:\"证件类型\",name:\"first\"}},[l(\"div\",{staticClass:\"code-add\"},[l(\"button\",{on:{click:a.setMaskDataCardType}},[a._v(\"新增\")])]),a._v(\" \"),l(\"el-table\",{staticClass:\"tb-edit\",staticStyle:{width:\"100%\"},attrs:{data:a.tableDataCardType,size:\"mini\",\"header-cell-style\":{background:\"#303A41\",color:\"white\"},\"highlight-current-row\":\"\"},on:{\"row-click\":a.handleCurrentChange}},[l(\"el-table-column\",{attrs:{label:\"编号\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleCardTypeEdit(t.$index,t.row)}},model:{value:t.row.cardNum,callback:function(e){a.$set(t.row,\"cardNum\",e)},expression:\"scope.row.cardNum\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardNum))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"证件类型\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleCardTypeEdit(t.$index,t.row)}},model:{value:t.row.cardType,callback:function(e){a.$set(t.row,\"cardType\",e)},expression:\"scope.row.cardType\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardType))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"操作\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-button\",{attrs:{size:\"small\",type:\"danger\"},on:{click:function(e){return a.handleCardTypeDelete(t.$index,t.row)}}},[a._v(\"删除\")])]}}])})],1)],1),a._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"入住类型\",name:\"second\"}},[l(\"div\",{staticClass:\"code-add\"},[l(\"button\",{on:{click:a.setMaskDataCheck}},[a._v(\"新增\")])]),a._v(\" \"),l(\"el-table\",{staticClass:\"tb-edit\",staticStyle:{width:\"100%\"},attrs:{data:a.tableDataCheck,size:\"mini\",\"header-cell-style\":{background:\"#303A41\",color:\"white\"},\"highlight-current-row\":\"\"},on:{\"row-click\":a.handleCurrentChange}},[l(\"el-table-column\",{attrs:{label:\"序号\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleCheckEdit(t.$index,t.row)}},model:{value:t.row.cardNum,callback:function(e){a.$set(t.row,\"cardNum\",e)},expression:\"scope.row.cardNum\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardNum))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"入住类型\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleCheckEdit(t.$index,t.row)}},model:{value:t.row.cardType,callback:function(e){a.$set(t.row,\"cardType\",e)},expression:\"scope.row.cardType\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardType))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"操作\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-button\",{attrs:{size:\"small\",type:\"danger\"},on:{click:function(e){return a.handleCheckDelete(t.$index,t.row)}}},[a._v(\"删除\")])]}}])})],1)],1),a._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"客源类型\",name:\"third\"}},[l(\"div\",{staticClass:\"code-add\"},[l(\"button\",{on:{click:a.setMaskDataGuest}},[a._v(\"新增\")])]),a._v(\" \"),l(\"el-table\",{staticClass:\"tb-edit\",staticStyle:{width:\"100%\"},attrs:{data:a.tableDataGuest,size:\"mini\",\"header-cell-style\":{background:\"#303A41\",color:\"white\"},\"highlight-current-row\":\"\"},on:{\"row-click\":a.handleCurrentChange}},[l(\"el-table-column\",{attrs:{label:\"编号\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleGuestEdit(t.$index,t.row)}},model:{value:t.row.cardNum,callback:function(e){a.$set(t.row,\"cardNum\",e)},expression:\"scope.row.cardNum\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardNum))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"客源类型\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleGuestEdit(t.$index,t.row)}},model:{value:t.row.cardType,callback:function(e){a.$set(t.row,\"cardType\",e)},expression:\"scope.row.cardType\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardType))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"操作\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-button\",{attrs:{size:\"small\",type:\"danger\"},on:{click:function(e){return a.handleGuestDelete(t.$index,t.row)}}},[a._v(\"删除\")])]}}])})],1)],1),a._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"工作区域\",name:\"fourth\"}},[l(\"div\",{staticClass:\"code-add\"},[l(\"button\",{on:{click:a.setMaskDataWork}},[a._v(\"新增\")])]),a._v(\" \"),l(\"el-table\",{staticClass:\"tb-edit\",staticStyle:{width:\"100%\"},attrs:{data:a.tableDataWork,size:\"mini\",\"header-cell-style\":{background:\"#303A41\",color:\"white\"},\"highlight-current-row\":\"\"},on:{\"row-click\":a.handleCurrentChange}},[l(\"el-table-column\",{attrs:{label:\"编号\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleWorkEdit(t.$index,t.row)}},model:{value:t.row.cardNum,callback:function(e){a.$set(t.row,\"cardNum\",e)},expression:\"scope.row.cardNum\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardNum))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"工作区域\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-input\",{attrs:{size:\"small\",placeholder:\"请输入内容\"},on:{change:function(e){return a.handleWorkEdit(t.$index,t.row)}},model:{value:t.row.cardType,callback:function(e){a.$set(t.row,\"cardType\",e)},expression:\"scope.row.cardType\"}}),a._v(\" \"),l(\"span\",[a._v(a._s(t.row.cardType))])]}}])}),a._v(\" \"),l(\"el-table-column\",{attrs:{label:\"操作\"},scopedSlots:a._u([{key:\"default\",fn:function(t){return[l(\"el-button\",{attrs:{size:\"small\",type:\"danger\"},on:{click:function(e){return a.handleWorkDelete(t.$index,t.row)}}},[a._v(\"删除\")])]}}])})],1)],1),a._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"钟点房时间设置\",name:\"fifth\"}},[l(\"div\",{staticClass:\"code-sethour\"},[l(\"span\",[a._v(\"钟点房时间选择:\")]),a._v(\" \"),l(\"ul\",[l(\"li\",[l(\"el-checkbox\",{model:{value:a.onehour,callback:function(e){a.onehour=e},expression:\"onehour\"}},[a._v(\"1小时\")]),a._v(\" \"),l(\"el-checkbox\",{model:{value:a.twohour,callback:function(e){a.twohour=e},expression:\"twohour\"}},[a._v(\"2小时\")]),a._v(\" \"),l(\"el-checkbox\",{model:{value:a.threehour,callback:function(e){a.threehour=e},expression:\"threehour\"}},[a._v(\"3小时\")]),a._v(\" \"),l(\"el-checkbox\",{model:{value:a.fourhour,callback:function(e){a.fourhour=e},expression:\"fourhour\"}},[a._v(\"4小时\")]),a._v(\" \"),l(\"el-checkbox\",{model:{value:a.fivehour,callback:function(e){a.fivehour=e},expression:\"fivehour\"}},[a._v(\"5小时\")]),a._v(\" \"),l(\"el-checkbox\",{model:{value:a.sixhour,callback:function(e){a.sixhour=e},expression:\"sixhour\"}},[a._v(\"6小时\")])],1)]),a._v(\" \"),l(\"ul\",[l(\"li\",[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",[a._v(\"取消\")])])])])]),a._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"加收房费设置\",name:\"six\"}},[l(\"div\",{staticClass:\"code-rate\"},[l(\"el-checkbox\",{model:{value:a.handrate,callback:function(e){a.handrate=e},expression:\"handrate\"}},[a._v(\"手动加收房费\")]),a._v(\" \"),l(\"el-checkbox\",{model:{value:a.escalrate,callback:function(e){a.escalrate=e},expression:\"escalrate\"}},[a._v(\"自动加收房费\")])],1),a._v(\" \"),l(\"div\",{staticClass:\"code-rate-main\"},[l(\"ul\",[l(\"li\",{staticStyle:{\"padding-top\":\"20px\"}},[l(\"label\",[a._v(\"日租房\")]),l(\"label\",{staticStyle:{\"margin-left\":\"600px\"}},[a._v(\"钟点房\")])]),a._v(\" \"),l(\"li\",[l(\"label\",[a._v(\"默认退房时间：\"),l(\"span\",[a._v(\"13:00\")])])]),a._v(\" \"),l(\"li\",[l(\"label\",[a._v(\"不加收房费截止时间：\")]),l(\"label\",{staticStyle:{\"margin-left\":\"505px\"}},[a._v(\"超过每小时加收房费：\")])]),a._v(\" \"),l(\"li\",[l(\"input\"),l(\"input\",{staticStyle:{\"margin-left\":\"455px\"}})]),a._v(\" \"),l(\"li\",[l(\"label\",[a._v(\"超过每小时加收房费：\")])]),a._v(\" \"),l(\"li\",[l(\"input\")]),a._v(\" \"),l(\"li\",[l(\"label\",[a._v(\"超过半天房费时间：\")])]),a._v(\" \"),l(\"li\",[l(\"input\")]),a._v(\" \"),l(\"li\",[l(\"label\",[a._v(\"加收全天房费时间：\")])]),a._v(\" \"),l(\"li\",[l(\"input\")])])]),a._v(\" \"),l(\"div\",{staticClass:\"code-rate-btn\"},[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",[a._v(\"取消\")])])]),a._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"凌晨房时段设置\",name:\"seven\"}},[l(\"div\",{staticClass:\"code-weehour\"},[l(\"ul\",[l(\"li\",[l(\"label\",[a._v(\"凌晨房结束时间:\")])]),a._v(\" \"),l(\"li\",[l(\"label\",[a._v(\"00:00~\")]),a._v(\" \"),l(\"el-date-picker\",{attrs:{size:\"mini\",type:\"datetime\",format:\"yyyy-MM-dd\",\"value-format\":\"yyyy-MM-dd\",placeholder:\"选择日期时间\"},model:{value:a.valuedatatime,callback:function(e){a.valuedatatime=e},expression:\"valuedatatime\"}})],1),a._v(\" \"),l(\"li\",[a._v(\"*在此时段内开房默认退房时间为当天！\")])])]),a._v(\" \"),l(\"div\",{staticClass:\"code-rate-btn\"},[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",[a._v(\"取消\")])])])],1)],1),a._v(\" \"),l(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.maskShow,expression:\"maskShow\"}],staticClass:\"mask\"},[l(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.masktype,expression:\"masktype\"}],staticClass:\"mask-body\"},[a._m(1),a._v(\" \"),a._m(2),a._v(\" \"),l(\"div\",{staticClass:\"btn\"},[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",{on:{click:function(e){return a.SetmaskShow(\"type\")}}},[a._v(\"取消\")])])]),a._v(\" \"),l(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.maskcheck,expression:\"maskcheck\"}],staticClass:\"mask-body\"},[a._m(3),a._v(\" \"),a._m(4),a._v(\" \"),l(\"div\",{staticClass:\"btn\"},[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",{on:{click:function(e){return a.SetmaskShow(\"check\")}}},[a._v(\"取消\")])])]),a._v(\" \"),l(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.maskguest,expression:\"maskguest\"}],staticClass:\"mask-body\"},[a._m(5),a._v(\" \"),a._m(6),a._v(\" \"),l(\"div\",{staticClass:\"btn\"},[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",{on:{click:function(e){return a.SetmaskShow(\"guest\")}}},[a._v(\"取消\")])])]),a._v(\" \"),l(\"div\",{directives:[{name:\"show\",rawName:\"v-show\",value:a.maskwork,expression:\"maskwork\"}],staticClass:\"mask-body\"},[a._m(7),a._v(\" \"),a._m(8),a._v(\" \"),l(\"div\",{staticClass:\"btn\"},[l(\"button\",[a._v(\"保存\")]),a._v(\" \"),l(\"button\",{on:{click:function(e){return a.SetmaskShow(\"work\")}}},[a._v(\"取消\")])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t(\"div\",{staticClass:\"code-top\"},[t(\"i\",{staticClass:\"el-icon-setting\"}),this._v(\" \"),t(\"label\",[this._v(\"代码设置\")])])},function(){var e=this.$createElement,t=this._self._c||e;return t(\"div\",{staticClass:\"mask-top\"},[t(\"label\",[this._v(\"新增证件类型\")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"mask-main\"},[a(\"ul\",[a(\"li\",[a(\"label\",[e._v(\"编号:\")]),a(\"input\",{attrs:{placeholder:\"编号\"}})]),e._v(\" \"),a(\"li\",[a(\"label\",[e._v(\"证件类型:\")]),a(\"input\",{attrs:{placeholder:\"证件类型\"}})])])])},function(){var e=this.$createElement,t=this._self._c||e;return t(\"div\",{staticClass:\"mask-top\"},[t(\"label\",[this._v(\"新增入住类型\")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"mask-main\"},[a(\"ul\",[a(\"li\",[a(\"label\",[e._v(\"序号:\")]),a(\"input\",{attrs:{placeholder:\"序号\"}})]),e._v(\" \"),a(\"li\",[a(\"label\",[e._v(\"入住类型:\")]),a(\"input\",{attrs:{placeholder:\"入住类型\"}})])])])},function(){var e=this.$createElement,t=this._self._c||e;return t(\"div\",{staticClass:\"mask-top\"},[t(\"label\",[this._v(\"新增客源类型\")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"mask-main\"},[a(\"ul\",[a(\"li\",[a(\"label\",[e._v(\"编号:\")]),a(\"input\",{attrs:{placeholder:\"编号\"}})]),e._v(\" \"),a(\"li\",[a(\"label\",[e._v(\"客源类型:\")]),a(\"input\",{attrs:{placeholder:\"客源类型\"}})])])])},function(){var e=this.$createElement,t=this._self._c||e;return t(\"div\",{staticClass:\"mask-top\"},[t(\"label\",[this._v(\"新增工作区域\")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"mask-main\"},[a(\"ul\",[a(\"li\",[a(\"label\",[e._v(\"编号:\")]),a(\"input\",{attrs:{placeholder:\"编号\"}})]),e._v(\" \"),a(\"li\",[a(\"label\",[e._v(\"工作区域:\")]),a(\"input\",{attrs:{placeholder:\"工作区域\"}})])])])}]};var s=a(\"VU/8\")(l,n,!1,function(e){a(\"Vpbv\")},\"data-v-5fbfb89e\",null);t.default=s.exports}});"}