<template>
  <div class="mask" v-show="maskShow">
    <div class="mask-suspen">
      <div class="mask-head">
        <label>交接班报表</label>
      </div>
      <div class="mask-body">
        <div class="mask-left">
          <el-table
            :data="tableData"
            border
            stripe
            :header-cell-style="{background:'#68819E',color:'#ffffff'}"
            height="500px"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="img">
              <!--label="">-->
              <template slot-scope="scope">
                <img style="width: 20px;height: 20px"
                     :src="scope.row.img"/><!--规定写法-->
                <!--如果要有label内容 放这里，没有 先注释-->
                <!--<span style="margin-left: 10px"></span>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="报表"
              width="280">
            </el-table-column>
            <el-table-column
              prop="count"
              label="份数">
            </el-table-column>
          </el-table>
        </div>
        <div class="mask-right">
            <div class="mask-right-first">
              <label>统计条件</label>
            </div>
            <div class="mask-right-second">
              <div>
                <input value="营业日期" style="width: 80px;border: none;margin-right: 10px;background: #ffffff" disabled readonly/>
                <el-date-picker
                  v-model="reservearrive"
                  type="datetime"
                  prefix-icon="el-icon-date"
                  placeholder="选择日期时间"
                  size="mini" style="width: 175px">
                </el-date-picker>
              </div>
              <div>
                <input value="用户名" style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                <input/>
              </div>
              <div>
                <input value="班别" style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                <input/>
              </div>
            </div>
            <div class="mask-right-three">
              <label>报表反馈</label>
            </div>
            <div class="mask-right-fifth">
              <el-radio-group v-model="radioshift">
                <el-radio :label="3">打印</el-radio>
                <el-radio :label="6">显示</el-radio>
                <el-radio :label="9">导出</el-radio>
              </el-radio-group>
            </div>
            <div class="mask-right-last">
                <textarea></textarea>
            </div>
        </div>
      </div>
      <div class="mask-bottom">
        <button>确定</button>
        <button @click="setMaskShow" style="background: #68819E">退出</button>
      </div>
    </div>
  </div>
</template>

<script>
  //引入图片
  import imgF from "@/assets/images/pms/shifting/F.png"
  export default {
    data() {
      return {
        //日期
        reservearrive:'',
        //报表选项
        radioshift:3,
        //控制隐藏与显示
        maskShow:'true',
        //表格数据
        tableData: [{
          img: [require("@/assets/images/pms/shifting/F.png")],
          name: '收银员交接表',
          count: '1'
        }, {
          img: '',
          name: '前台入账明细',
          count: '1'
        }, {
          img: '',
          name: '前台入账简表',
          count: '1'
        }, {
          img: '',
          name: '前台入账汇总',
          count: '1'
        }, {
          img: '',
          name: '前台收款明细',
          count: '1'
        }, {
          img: '',
          name: '前台收款汇总',
          count: '1'
        }, {
          img: '',
          name: '前台转账报表',
          count: '1'
        }, {
          img: '',
          name: '冲账调账报表',
          count: '1'
        }, {
          img: '',
          name: '结账实收统计',
          count: '1'
        }, {
          img: '',
          name: '结账实收明细',
          count: '1'
        }, {
          img: '',
          name: '',
          count: ''
        }, {
          img: '',
          name: 'AR收款报表',
          count: '1'
        }, {
          img: '',
          name: '应收账入账总表',
          count: '1'
        }, {
          img: '',
          name: '应收账入账明细',
          count: '1'
        }, {
          img: '',
          name: 'AR入账简表',
          count: '1'
        }, {
          img: '',
          name: '',
          count: ''
        }, {
          img: '',
          name: '客房中心入账汇总表',
          count: '1'
        }, {
          img: '',
          name: '商务中心入账汇总表',
          count: '1'
        }, {
          img: '',
          name: '',
          count: ''
        }, {
          img: '',
          name: '储值卡款项汇总表',
          count: '1'
        }, {
          img: '',
          name: '储值卡充值明细表',
          count: '1'
        }, {
          img: '',
          name: '储值卡消费明细表',
          count: '1'
        }]
      }
    },

    methods: {
      //控制遮罩层的函数
      setMaskShow(){
        this.maskShow = !this.maskShow;
      },
    }
  }
</script>
<style lang="less" scoped>
  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    height: 23px;
    //垂直属性
    display: flex;
    align-items: center;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    //这里的颜色是直接可以设置背景透明的，为什么不用opacity关键字的原因是这个关键字会导致一个子继承父透明度的问题
    background: rgba(7, 13, 32, 0.2);
    top: 0;
    left: 0;
    z-index: 998;
    //悬浮框样式
    .mask-suspen {
      background: #F5F5F5;
      width: 80%;
      height: 80%;
      position: fixed;
      z-index: 999;
      top: 10%;
      left: 10%;
      //头部样式
      .mask-head{
        height: 40px;
        background: #303A41;
        line-height: 40px;
        label{
          color: #ffffff;
          margin-left: 10px;
        }
      }
      //table层的样式
      .mask-body{
        border-bottom: 1px solid #CCCCCC;
        //table样式
        .mask-left{
          float: left;
          margin-top: 10px;
          margin-left: 10px;
          margin-bottom: 10px;
          width: 65%;
        }
        //右侧统计条件样式
        .mask-right{
          height: 500px;
          float: left;
          margin-left: 10px;
          margin-top: 10px;
          width: 33%;
          .mask-right-first{
              label{
                margin-left: 20px;
              }
          }
          .mask-right-second{
              border: 1px solid #CCCCCC;
              background: #ffffff;
              margin-top: 10px;
              input{
                   margin-left: 10px;
                   height: 27px;
                   width: 175px;
                   margin-top: 10px;
                   margin-bottom: 10px;
                   border: 1px solid #CCCCCC;
                   border-radius: 4px;
              }
          }
          .mask-right-three{
            margin-top: 10px;
              label{
              margin-left: 20px;
              }
          }
          .mask-right-fifth{
            height: 100px;
            line-height: 100px;
            margin-top: 10px;
            padding-left: 20px;
            background: #ffffff;
            border: 1px solid #CCCCCC;
          }
          .mask-right-last{
            margin-top: 10px;
            height: 70px;
            textarea{
              width: 100%;
              height: 100%;
              border: 1px solid #CCCCCC;
            }
          }
        }

      }
      //底部样式
      .mask-bottom{
        button{
          float: right;
          margin-right: 10px;
          margin-top: 10px;
          height: 27px;
          width: 100px;
          border: none;
          color: #ffffff;
          line-height: 27px;
          background: #4488E9;
          border-radius: 4px;
        }
      }

    }
  }
</style>
