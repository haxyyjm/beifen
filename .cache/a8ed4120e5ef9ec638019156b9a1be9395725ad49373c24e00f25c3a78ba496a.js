{"source":"webpackJsonp([72],{lQPc:function(t,a){},qL4B:function(t,a,e){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var l={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l(\"div\",{staticClass:\"Equipment\"},[l(\"p\",{staticClass:\"iconTips\"},[e._v(\"设备设置\")]),e._v(\" \"),l(\"div\",{staticClass:\"SetShow\"},[l(\"el-tabs\",{attrs:{type:\"card\"},on:{\"tab-click\":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:\"activeName\"}},[l(\"el-tab-pane\",{attrs:{label:\"门锁参数\",name:\"LockParam\"}},[l(\"div\",{staticClass:\"LockParam PhoneParam\"},[l(\"ul\",[l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[e._v(\"启用门锁接口\")]),e._v(\" \"),l(\"el-switch\",{attrs:{\"active-color\":\"#68819E\",\"inactive-color\":\"#BFCAD1\"},model:{value:e.SwitchValue,callback:function(t){e.SwitchValue=t},expression:\"SwitchValue\"}})],1),e._v(\" \"),l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[l(\"i\",[e._v(\"*\")]),e._v(\" 门锁厂家\")]),e._v(\" \"),l(\"el-select\",{attrs:{multiple:\"\",filterable:\"\",\"allow-create\":\"\",\"default-first-option\":\"\",placeholder:\" \"},model:{value:e.optionsValue,callback:function(t){e.optionsValue=t},expression:\"optionsValue\"}},e._l(e.optionsData,function(t){return l(\"el-option\",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),e._v(\" \"),l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[l(\"i\",[e._v(\"*\")]),e._v(\" 通信端口\")]),e._v(\" \"),l(\"el-select\",{attrs:{multiple:\"\",filterable:\"\",\"allow-create\":\"\",\"default-first-option\":\"\",placeholder:\" \"},model:{value:e.optionsValue,callback:function(t){e.optionsValue=t},expression:\"optionsValue\"}},e._l(e.optionsData,function(t){return l(\"el-option\",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),e._v(\" \"),l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[e._v(\"发卡机型号\")]),e._v(\" \"),l(\"el-select\",{attrs:{multiple:\"\",filterable:\"\",\"allow-create\":\"\",\"default-first-option\":\"\",placeholder:\" \"},model:{value:e.optionsValue,callback:function(t){e.optionsValue=t},expression:\"optionsValue\"}},e._l(e.optionsData,function(t){return l(\"el-option\",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),e._v(\" \"),l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[e._v(\"系统标识码\")]),e._v(\" \"),l(\"el-input\",{staticStyle:{width:\"220px\",margin:\"0 16px\"},attrs:{placeholder:\"请输入内容\"},model:{value:e.SearchContent,callback:function(t){e.SearchContent=t},expression:\"SearchContent\"}})],1),e._v(\" \"),l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[e._v(\"酒店识别码\")]),e._v(\" \"),l(\"el-input\",{staticStyle:{width:\"220px\",margin:\"0 16px\"},attrs:{placeholder:\"请输入内容\"},model:{value:e.SearchContent,callback:function(t){e.SearchContent=t},expression:\"SearchContent\"}})],1),e._v(\" \"),l(\"li\",{staticClass:\"LockList\"},[l(\"span\",[e._v(\"退房强制注销房卡\")]),e._v(\" \"),l(\"el-checkbox\",{model:{value:e.CheckOut,callback:function(t){e.CheckOut=t},expression:\"CheckOut\"}},[e._v(\"是\")])],1)])]),e._v(\" \"),l(\"div\",{staticClass:\"CancleAndSave pull-right\"},[l(\"el-button\",{staticStyle:{\"background-color\":\"#68819E\"},attrs:{type:\"primary\"}},[e._v(\"取消\")]),e._v(\" \"),l(\"el-button\",{staticStyle:{\"background-color\":\"#4488E9\"},attrs:{type:\"primary\"}},[e._v(\"保存\")])],1)]),e._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"电话参数\",name:\"PhoneParam\"}},[l(\"div\",{staticClass:\"PhoneParam\"},[l(\"ul\",e._l(e.PhoneParamData,function(a,t){return l(\"li\",{key:t},[e._v(\"\\n                    \"+e._s(a.name)+\"\\n                    \"),l(\"el-input\",{staticClass:\"ListInputItem\",attrs:{placeholder:\"请输入内容\"},model:{value:a.value,callback:function(t){e.$set(a,\"value\",t)},expression:\"item.value\"}})],1)}),0)]),e._v(\" \"),l(\"div\",{staticClass:\"CancleAndSave pull-right\"},[l(\"el-button\",{staticStyle:{\"background-color\":\"#68819E\"},attrs:{type:\"primary\"}},[e._v(\"取消\")]),e._v(\" \"),l(\"el-button\",{staticStyle:{\"background-color\":\"#4488E9\"},attrs:{type:\"primary\"}},[e._v(\"保存\")])],1)]),e._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"酒店智控\",name:\"HotelAuto\"}},[l(\"div\",{staticClass:\"HotelAuto\"})]),e._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"公安接口\",name:\"PublicInter\"}},[l(\"div\",{staticClass:\"PublicInter\"})]),e._v(\" \"),l(\"el-tab-pane\",{attrs:{label:\"开房提醒\",name:\"CheckClock\"}},[l(\"div\",{staticClass:\"CheckClock\"},[l(\"p\",[e._v(\"微信推送人员设置\")]),e._v(\" \"),l(\"div\",{staticClass:\"search\"},[e._v(\"\\n                  人员设置：\\n                  \"),e._v(\" \"),l(\"el-select\",{attrs:{multiple:\"\",filterable:\"\",\"allow-create\":\"\",\"default-first-option\":\"\",placeholder:\" \"},model:{value:e.optionsValue,callback:function(t){e.optionsValue=t},expression:\"optionsValue\"}},e._l(e.optionsData,function(t){return l(\"el-option\",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),e._v(\" \"),l(\"el-input\",{staticStyle:{width:\"220px\",margin:\"0 16px\"},attrs:{placeholder:\"请输入内容\"},model:{value:e.SearchContent,callback:function(t){e.SearchContent=t},expression:\"SearchContent\"}}),e._v(\" \"),l(\"el-button\",{attrs:{type:\"primary\"}},[e._v(\"查询\")])],1),e._v(\" \"),l(\"div\",{staticClass:\"table\"},[l(\"table\",{staticStyle:{width:\"100%\"}},[l(\"thead\",[l(\"tr\",[l(\"th\",[e._v(\"卡券\")]),e._v(\" \"),l(\"th\",[e._v(\"名称\")]),e._v(\" \"),l(\"th\",[e._v(\"操作\")])])]),e._v(\" \"),l(\"tbody\",e._l(e.CheckClockData,function(t,a){return l(\"tr\",{key:a},[l(\"td\",[e._v(e._s(t.CardNum)+\"2\")]),e._v(\" \"),l(\"td\",[e._v(e._s(t.UserName))]),e._v(\" \"),l(\"td\",[l(\"span\",[e._v(\"删除\")]),e._v(\" \"),l(\"span\",{staticClass:\"col\"}),e._v(\" \"),l(\"span\",{on:{click:e.ShowToast}},[e._v(\"修改\")])])])}),0)])])])])],1)],1)])},staticRenderFns:[]};var s=e(\"VU/8\")({name:\"Equipment\",data:function(){return{activeName:\"LockParam\",ifShowToast:!0,SwitchValue:!0,CheckOut:!0,PhoneParamData:[{name:\"原始费率\",value:\"1.0\"},{name:\"市话费率\",value:\"1.0\"},{name:\"区间费率\",value:\"1.0\"},{name:\"国内长途\",value:\"1.0\"},{name:\"国际长途\",value:\"1.0\"}],SearchContent:\"\",optionsData:[{value:\"HTML\",label:\"HTML\"},{value:\"CSS\",label:\"CSS\"},{value:\"JavaScript\",label:\"JavaScript\"}],optionsValue:[],CheckClockData:[{CardNum:12034,UserName:\"客户名\"}]}},methods:{handleClick:function(){},ShowToast:function(){this.ifShowToast=!this.ifShowToast}}},l,!1,function(t){e(\"lQPc\")},\"data-v-f841d7f6\",null);a.default=s.exports}});"}