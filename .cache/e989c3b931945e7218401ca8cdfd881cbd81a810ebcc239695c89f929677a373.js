{"source":"webpackJsonp([131],{tyL1:function(t,a,_){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var e={render:function(){var e=this,t=e.$createElement,v=e._self._c||t;return v(\"div\",{staticClass:\"Charges\"},[v(\"p\",{staticClass:\"iconTips\"},[e._v(\"收费项目设置\")]),e._v(\" \"),v(\"div\",{staticClass:\"SetShow\"},[v(\"el-tabs\",{attrs:{type:\"card\"},on:{\"tab-click\":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:\"activeName\"}},[v(\"el-tab-pane\",{attrs:{label:\"费用设置\",name:\"FeeSet\"}},[v(\"div\",{staticClass:\"newAddImg\"},[v(\"img\",{attrs:{src:_(\"PL6p\"),alt:\"新增\"}})]),e._v(\" \"),v(\"div\",{staticClass:\"table\"},[v(\"table\",{staticStyle:{width:\"100%\"}},[v(\"thead\",[v(\"tr\",[v(\"th\",[e._v(\"序号\")]),e._v(\" \"),v(\"th\",[e._v(\"房间类型\")]),e._v(\" \"),v(\"th\",[e._v(\"房型编号\")]),e._v(\" \"),v(\"th\",[e._v(\"房价\")]),e._v(\" \"),v(\"th\",[e._v(\"钟点价\")]),e._v(\" \"),v(\"th\",[e._v(\"半天房价\")]),e._v(\" \"),v(\"th\",[e._v(\"标识字符\")]),e._v(\" \"),v(\"th\",[e._v(\"当日单价\")]),e._v(\" \"),v(\"th\",[e._v(\"押金金额\")]),e._v(\" \"),v(\"th\",[e._v(\"续住押金\")]),e._v(\" \"),v(\"th\",[e._v(\"操作\")])])]),e._v(\" \"),v(\"tbody\",e._l(e.RoomSetData,function(t,a){return v(\"tr\",{key:a},[v(\"td\",[e._v(e._s(a))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomType))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomNum))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HourPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HalfPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Ident))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.DailyPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Deposit))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Continue))]),e._v(\" \"),v(\"td\",[v(\"span\",[e._v(\"删除\")]),e._v(\" \"),v(\"span\",{staticClass:\"col\"}),e._v(\" \"),v(\"span\",[e._v(\"修改\")])])])}),0)]),e._v(\" \"),v(\"div\",{staticClass:\"pagination\"},[v(\"p\",{staticClass:\"pull-left\"},[e._v(\"显示第1到第6条记录，共6条记录\")]),e._v(\" \"),v(\"el-pagination\",{staticClass:\"pull-right\",attrs:{background:\"\",layout:\"prev, pager, next\",total:50}})],1)])]),e._v(\" \"),v(\"el-tab-pane\",{attrs:{label:\"分类列表\",name:\"ClassifyList\"}},[v(\"div\",{staticClass:\"search\"},[e._v(\"\\n          房间号：\\n          \"),v(\"el-input\",{staticStyle:{width:\"250px\"},attrs:{placeholder:\"请输入内容\"},model:{value:e.SearchNum,callback:function(t){e.SearchNum=t},expression:\"SearchNum\"}},[v(\"el-button\",{attrs:{slot:\"append\"},slot:\"append\"},[e._v(\"搜索\")])],1)],1),e._v(\" \"),v(\"div\",{staticClass:\"newAddImg\"},[v(\"img\",{attrs:{src:_(\"PL6p\"),alt:\"新增\"}})]),e._v(\" \"),v(\"div\",{staticClass:\"table\"},[v(\"table\",{staticStyle:{width:\"100%\"}},[v(\"thead\",[v(\"tr\",[v(\"th\",[e._v(\"序号\")]),e._v(\" \"),v(\"th\",[e._v(\"房间类型\")]),e._v(\" \"),v(\"th\",[e._v(\"房型编号\")]),e._v(\" \"),v(\"th\",[e._v(\"房价\")]),e._v(\" \"),v(\"th\",[e._v(\"钟点价\")]),e._v(\" \"),v(\"th\",[e._v(\"半天房价\")]),e._v(\" \"),v(\"th\",[e._v(\"标识字符\")]),e._v(\" \"),v(\"th\",[e._v(\"当日单价\")]),e._v(\" \"),v(\"th\",[e._v(\"押金金额\")]),e._v(\" \"),v(\"th\",[e._v(\"续住押金\")]),e._v(\" \"),v(\"th\",[e._v(\"操作\")])])]),e._v(\" \"),v(\"tbody\",e._l(e.RoomSetData,function(t,a){return v(\"tr\",{key:a},[v(\"td\",[e._v(e._s(a))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomType))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomNum))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HourPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HalfPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Ident))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.DailyPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Deposit))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Continue))]),e._v(\" \"),v(\"td\",[v(\"span\",[e._v(\"删除\")]),e._v(\" \"),v(\"span\",{staticClass:\"col\"}),e._v(\" \"),v(\"span\",{on:{click:e.ShowToast}},[e._v(\"修改\")])])])}),0)]),e._v(\" \"),v(\"div\",{staticClass:\"pagination\"},[v(\"p\",{staticClass:\"pull-left\"},[e._v(\"显示第1到第6条记录，共6条记录\")]),e._v(\" \"),v(\"el-pagination\",{staticClass:\"pull-right\",attrs:{background:\"\",layout:\"prev, pager, next\",total:50}})],1)])]),e._v(\" \"),v(\"el-tab-pane\",{attrs:{label:\"商品列表\",name:\"GoodsList\"}},[v(\"div\",{staticClass:\"search\"},[e._v(\"\\n          房间号：\\n          \"),v(\"el-input\",{staticStyle:{width:\"250px\"},attrs:{placeholder:\"请输入内容\"},model:{value:e.SearchNum,callback:function(t){e.SearchNum=t},expression:\"SearchNum\"}},[v(\"el-button\",{attrs:{slot:\"append\"},slot:\"append\"},[e._v(\"搜索\")])],1)],1),e._v(\" \"),v(\"div\",{staticClass:\"newAddImg\"},[v(\"img\",{attrs:{src:_(\"PL6p\"),alt:\"新增\"}})]),e._v(\" \"),v(\"div\",{staticClass:\"table\"},[v(\"table\",{staticStyle:{width:\"100%\"}},[v(\"thead\",[v(\"tr\",[v(\"th\",[e._v(\"序号\")]),e._v(\" \"),v(\"th\",[e._v(\"房间类型\")]),e._v(\" \"),v(\"th\",[e._v(\"房型编号\")]),e._v(\" \"),v(\"th\",[e._v(\"房价\")]),e._v(\" \"),v(\"th\",[e._v(\"钟点价\")]),e._v(\" \"),v(\"th\",[e._v(\"半天房价\")]),e._v(\" \"),v(\"th\",[e._v(\"标识字符\")]),e._v(\" \"),v(\"th\",[e._v(\"当日单价\")]),e._v(\" \"),v(\"th\",[e._v(\"押金金额\")]),e._v(\" \"),v(\"th\",[e._v(\"续住押金\")]),e._v(\" \"),v(\"th\",[e._v(\"操作\")])])]),e._v(\" \"),v(\"tbody\",e._l(e.RoomSetData,function(t,a){return v(\"tr\",{key:a},[v(\"td\",[e._v(e._s(a))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomType))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomNum))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HourPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HalfPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Ident))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.DailyPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Deposit))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Continue))]),e._v(\" \"),v(\"td\",[v(\"span\",[e._v(\"删除\")]),e._v(\" \"),v(\"span\",{staticClass:\"col\"}),e._v(\" \"),v(\"span\",{on:{click:e.ShowToast}},[e._v(\"修改\")])])])}),0)]),e._v(\" \"),v(\"div\",{staticClass:\"pagination\"},[v(\"p\",{staticClass:\"pull-left\"},[e._v(\"显示第1到第6条记录，共6条记录\")]),e._v(\" \"),v(\"el-pagination\",{staticClass:\"pull-right\",attrs:{background:\"\",layout:\"prev, pager, next\",total:50}})],1)])]),e._v(\" \"),v(\"el-tab-pane\",{attrs:{label:\"商品关联\",name:\"GoodsLink\"}},[v(\"div\",{staticClass:\"search GoodsAdd\"},[v(\"el-select\",{attrs:{multiple:\"\",filterable:\"\",\"allow-create\":\"\",\"default-first-option\":\"\",placeholder:\"商品简码\"},model:{value:e.optionsValue,callback:function(t){e.optionsValue=t},expression:\"optionsValue\"}},e._l(e.optionsData,function(t){return v(\"el-option\",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),e._v(\" \"),v(\"el-select\",{attrs:{placeholder:\"全部\"},model:{value:e.AllGoodsValue,callback:function(t){e.AllGoodsValue=t},expression:\"AllGoodsValue\"}},e._l(e.AllGoods,function(t){return v(\"el-option\",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),e._v(\" \"),v(\"el-button\",{attrs:{slot:\"append\"},slot:\"append\"},[e._v(\"添加\")])],1),e._v(\" \"),v(\"div\",{staticClass:\"newAddImg\"},[v(\"img\",{attrs:{src:_(\"PL6p\"),alt:\"新增\"}})]),e._v(\" \"),v(\"div\",{staticClass:\"table\"},[v(\"table\",{staticStyle:{width:\"100%\"}},[v(\"thead\",[v(\"tr\",[v(\"th\",[e._v(\"序号\")]),e._v(\" \"),v(\"th\",[e._v(\"房间类型\")]),e._v(\" \"),v(\"th\",[e._v(\"房型编号\")]),e._v(\" \"),v(\"th\",[e._v(\"房价\")]),e._v(\" \"),v(\"th\",[e._v(\"钟点价\")]),e._v(\" \"),v(\"th\",[e._v(\"半天房价\")]),e._v(\" \"),v(\"th\",[e._v(\"标识字符\")]),e._v(\" \"),v(\"th\",[e._v(\"当日单价\")]),e._v(\" \"),v(\"th\",[e._v(\"押金金额\")]),e._v(\" \"),v(\"th\",[e._v(\"续住押金\")]),e._v(\" \"),v(\"th\",[e._v(\"操作\")])])]),e._v(\" \"),v(\"tbody\",e._l(e.RoomSetData,function(t,a){return v(\"tr\",{key:a},[v(\"td\",[e._v(e._s(a))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomType))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomNum))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.RoomPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HourPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.HalfPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Ident))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.DailyPrice))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Deposit))]),e._v(\" \"),v(\"td\",[e._v(e._s(t.Continue))]),e._v(\" \"),v(\"td\",[v(\"span\",[e._v(\"删除\")]),e._v(\" \"),v(\"span\",{staticClass:\"col\"}),e._v(\" \"),v(\"span\",{on:{click:e.ShowToast}},[e._v(\"修改\")])])])}),0)]),e._v(\" \"),v(\"div\",{staticClass:\"pagination\"},[v(\"p\",{staticClass:\"pull-left\"},[e._v(\"显示第1到第6条记录，共6条记录\")]),e._v(\" \"),v(\"el-pagination\",{staticClass:\"pull-right\",attrs:{background:\"\",layout:\"prev, pager, next\",total:50}})],1)])])],1)],1)])},staticRenderFns:[]};var v=_(\"VU/8\")({name:\"Charges\",data:function(){return{activeName:\"FeeSet\",ifShowToast:!0,SearchNum:\"\",optionsData:[{value:\"HTML\",label:\"HTML\"},{value:\"CSS\",label:\"CSS\"},{value:\"JavaScript\",label:\"JavaScript\"}],optionsValue:[],AllGoods:[{value:\"选项1\",label:\"全部\"},{value:\"选项2\",label:\"酒水\"},{value:\"选项3\",label:\"冷饮\"},{value:\"选项4\",label:\"赔偿\"},{value:\"选项5\",label:\"房费\"}],AllGoodsValue:\"\",RoomSetData:[{RoomType:\"舒适大床房\",RoomNum:\"8326\",RoomPrice:526,HourPrice:256,HalfPrice:123,Ident:\"dcf\",DailyPrice:120,Deposit:60,Continue:200},{RoomType:\"舒适大床房\",RoomNum:\"8326\",RoomPrice:526,HourPrice:256,HalfPrice:123,Ident:\"dcf\",DailyPrice:120,Deposit:60,Continue:200},{RoomType:\"舒适大床房\",RoomNum:\"8326\",RoomPrice:526,HourPrice:256,HalfPrice:123,Ident:\"dcf\",DailyPrice:120,Deposit:60,Continue:200},{RoomType:\"舒适大床房\",RoomNum:\"8326\",RoomPrice:526,HourPrice:256,HalfPrice:123,Ident:\"dcf\",DailyPrice:120,Deposit:60,Continue:200}]}},methods:{handleClick:function(){},ShowToast:function(){this.ifShowToast=!this.ifShowToast}}},e,!1,function(t){_(\"yuWZ\")},\"data-v-192dc058\",null);a.default=v.exports},yuWZ:function(t,a){}});"}