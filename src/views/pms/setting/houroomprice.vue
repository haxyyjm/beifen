<template>
  <!--钟点房价码-->
  <div class="hour-all">
       <div class="hour-top">
         <i class="el-icon-setting"></i>
         <label>钟点房价详情</label>
       </div>
       <div>
         <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
           <el-tab-pane
             v-for="(item, index) in editableTabs2"
             :key="item.name"
             :label="item.title"
             :name="item.name"
           >
             <div class="hour-detail">
               <div class="detail-left">
                 <div class="detail-left-input">
                   <label>代码:</label>
                   <label>D2</label>
                   <label style="margin-left: 40px">中文描述:</label>
                   <input v-model="valuedesc"/>
                   <label>英文描述:</label>
                   <input/>
                 </div>
                 <div>
                     <el-checkbox v-model="isstop">是否停用</el-checkbox>
                     <el-checkbox v-model="isdaily">日租房</el-checkbox>
                     <el-checkbox v-model="isfree">免费房</el-checkbox>
                     <el-checkbox v-model="isself">自用房</el-checkbox>
                 </div>
                 <div>
                     <el-checkbox v-model="isprivate">是否私有</el-checkbox>
                     <el-checkbox v-model="issecurity">房价保密</el-checkbox>
                     <el-checkbox v-model="isfixprice">固定房价</el-checkbox>
                     <el-checkbox v-model="isverifi">启用验证</el-checkbox>
                     <el-checkbox v-model="istaxes">价外税</el-checkbox>
                 </div>
                 <div class="detail-button">
                   <button>刷新</button>
                   <button>新增</button>
                   <button>保存</button>
                   <button>日志</button>
                   <label style="margin-left: 10px">加时单位:</label>
                   <input style="width: 122px;height: 25px;border: 1px solid #c0c4cc;"/>
                   <label>小时</label>
                 </div>

               </div>
               <div class="detail-right">
                 <div>
                   <label>有效期起:</label>
                   <el-date-picker
                     v-model="usertimestart"
                     format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
                     size="mini"
                     type="datetime"
                     placeholder="选择日期时间" style="width: 172px">
                   </el-date-picker>
                   <label>有效期止:</label>
                   <el-date-picker
                     v-model="usertimeend"
                     format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
                     size="mini"
                     type="datetime"
                     placeholder="选择日期时间" style="width: 172px">
                   </el-date-picker>
                 </div>
                 <div>
                   <label>最早时间:</label>
                   <el-date-picker
                     v-model="earlytime"
                     format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
                     size="mini"
                     type="datetime"
                     placeholder="选择日期时间" style="width: 172px">
                   </el-date-picker>
                   <label>最晚时间:</label>
                   <el-date-picker
                     v-model="endtime"
                     format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"
                     size="mini"
                     type="datetime"
                     placeholder="选择日期时间" style="width: 172px">
                   </el-date-picker>
                 </div>
                 <div>
                   <label>引用自:</label>
                   <input style="width: 428px;margin-left: 28px"/>
                 </div>
                 <div>
                   <label>乘法系数:</label>
                   <input/>
                   <label>加法系数:</label>
                   <input/>
                   <label>四舍五入:</label>
                   <input/>
                 </div>
               </div>
             </div>
           </el-tab-pane>
         </el-tabs>
       </div>

       <div class="hour-serach">
         <label>检索条件:</label>
         <input/>
         <label>房型:</label>
         <input/>
           <!--这里需要将该块级元素转为行内元素-->
         <button>查询</button>
         <button>保存</button>
       </div>
       <div class="hour-table">
         <el-table
           :data="tableData"
           size="mini"
           border
           height="300px"
           :header-cell-style="{background:'#303A41'}"
           style="width: 100%" @selection-change="handleSelectionChange">
           <el-table-column
             type="selection"
             width="55">
           </el-table-column>
           <el-table-column
             prop="rm_type"
             label="房型">
           </el-table-column>
           <el-table-column
             prop="chinesedesc"
             label="房价">
           </el-table-column>
           <el-table-column
             prop="enlishdesc"
             label="早餐">
           </el-table-column>
           <el-table-column
             prop="periodstart"
             label="备注">
           </el-table-column>
         </el-table>
       </div>
       <div class="hour-page">
         <span>
        显示1到6条记录，共6条记录
         </span>
         <div class="page">
           <el-pagination
             layout="prev, pager, next"
             :total="1000">
           </el-pagination>
         </div>
       </div>
       <div class="hour-buttom">
         <button>设置</button>
         <button>续期</button>
         <button>钟点价</button>
         <button>日志</button>
         <button>删除</button>
         <button>清空</button>
       </div>

  </div>
</template>

<script>
    export default {
        name: "hourroomprice",
      data(){
          return {
            //遮罩层
            maskShow: false,
            //中文描述
            valuedesc : '',
            //url
            url :'47.98.113.173:9502',
            activeName2 :'1',
            //tab框
            editableTabs2 : [{
              title: '1小时',
              name: '1',
              content: 'Tab 1 content'
            },{
              title: '2小时',
              name: '2',
              content: 'Tab 2 content'
            },{
              title: '3小时',
              name: '3',
              content: 'Tab 2 content'
            },{
              title: '4小时',
              name: '4',
              content: 'Tab 2 content'
            },{
              title: '6小时',
              name: '5',
              content: 'Tab 2 content'
            }],
            //tab下的多选框
            checkList:[],
            //显示内容多选框
            checkListsearch:[],
            //表格数据
            tableData :[],
            //时间绑定
            usertimestart : '',
            usertimeend : '',
            earlytime : '',
            endtime : '',
            //checkbox控件绑定  是否停用
            isstop : false,
            //免费房
            isfree : false,
            //日租房
            isdaily : false,
            //自用房
            isself : false,
            //是否私有
            isprivate : false,
            //房价保密
            issecurity : false,
            //固定房价
            isfixprice : false,
            //启用验证
            isverifi : false,
            //价外税
            istaxes : false,
          }
      },
      created:function () {
           this.searchall();
      },
      methods:{
        /**
         * @searchall 无条件查询
         */
        searchall : function () {
           let that = this;
           let url = 'http://'+that.url+'/hourly_room/';
           this.$axios({
             method:'get',
             url : url
           }).then(function (res) {
              console.info(res);
              that.tableData = res.data.result;
           }).catch(function (res) {
              console.info(res)
           })
        },
        /**
         * @inquire 多条件查询
         */
        inquire : function(){

        },
        /**
         *@handleClick  tab切换的时候的函数，根据tab.name判断用户点击的是哪一个tab进行相应的操作
         */
        handleClick(tab, event) {
           let that = this;
           let url = '';
           console.log(tab.name);
           if(tab.active == true){
              that.$axios({
                  method: 'get',
                  url : url,
                  params : {
                    name : tab.name
                  }
              }).then(function (res) {
                   //将数据渲染上去
                   console.info(res);
              }).catch(function (err) {
              })
           }
        },
        /**
         * @saveAllInfo 保存修改信息
         * @param no
         */
        saveAllInfo : function(){
           //update * from table where name like  = 'name= 123';
        },
        /**
         *
         */
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        /**
         * 点击取消的时候遮罩层隐藏
         */
        SetmaskShow : function () {
          this.maskShow = false;
        }
      }
    }
</script>

<style scoped lang="less">
  //公共样式
  .common-button{
    width: 80px;
    height: 30px;
    border: none;
    background: #68819E;
    color: #ffffff;
    line-height: 30px;
  }
 //页面总的样式
.hour-all{
  width: 94%;
  margin-left: 10px;
  margin-top: 10px;
  .hour-top{
    height: 40px;
    line-height: 40px;
    i{
      color: #777777;
      font-size: x-large;
    }
    label{
      position: absolute;
      margin-top: -3px;
      margin-left: 5px;
      font-size: small;
      color: #777777;
    }
  }
  .hour-detail{
      height: 160px;
      background: #F7F7F7;
    .detail-left{
      width: 55%;
      float: left;
      .detail-left-input{
        label{
          margin-left: 10px;
        }
        input{
          border: 1px solid #c0c4cc;
          height: 25px;
          width: 150px;
          border-radius: 4px;
        }
      }
      div{
        margin-left: 5px;
        margin-top: 15px;
      button{
          .common-button;
           width: 70px;
        }
      }
    }
    .detail-right{
      div{
        margin-left: 15px;
        margin-top: 10px;
      }
      input{
        margin-left: 15px;
        border: 1px solid #c0c4cc;
        width: 87px;
        height: 25px;
        border-radius: 4px;
      }
    }
  }
  .hour-serach{
    margin-top: 10px;
    label{
      margin-left: 5px;
      color: #333333;
    }
    input{
      border: 1px solid #c0c4cc;
      height: 25px;
      width: 200px;
      border-radius: 4px;
    }
    button{
      margin-left: 20px;
      background: #4488E9;
      height: 30px;
      width: 60px;
      border: none;
      color: #ffffff;
      line-height: 30px;
      border-radius: 4px;
    }
  }
  .hour-table{
    margin-top: 10px;
  }
  .hour-page{
    margin-top: 10px;
    .page{
      float: right;
    }
  }
  .hour-buttom{
    margin-top: 10px;
    button{
      .common-button;
    }
  }

}
</style>
