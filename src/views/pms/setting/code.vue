<template>
  <!--代码设置-->
  <div class="code-all">
    <div class="code-top">
      <i class="el-icon-setting"></i>
      <label>代码设置</label>
    </div>
    <div class="code-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
        <el-tab-pane label="证件类型" name="first">
          <div class="code-add"><button @click="setMaskDataCardType">新增</button></div>
          <el-table :data="tableDataCardType" class="tb-edit" style="width: 100%" size="mini" :header-cell-style="{background:'#303A41',color:'white'}" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="编号">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardNum" placeholder="请输入内容" @change="handleCardTypeEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="证件类型">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardType" placeholder="请输入内容" @change="handleCardTypeEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button size="small" type="danger" @click="handleCardTypeDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="入住类型" name="second">
          <div class="code-add"><button @click="setMaskDataCheck">新增</button></div>
          <el-table :data="tableDataCheck" class="tb-edit" style="width: 100%" size="mini" :header-cell-style="{background:'#303A41',color:'white'}" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="序号">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardNum" placeholder="请输入内容" @change="handleCheckEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入住类型">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardType" placeholder="请输入内容" @change="handleCheckEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button size="small" type="danger" @click="handleCheckDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客源类型" name="third">
          <div class="code-add"><button @click="setMaskDataGuest">新增</button></div>
          <el-table :data="tableDataGuest" class="tb-edit" style="width: 100%" size="mini" :header-cell-style="{background:'#303A41',color:'white'}" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="编号">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardNum" placeholder="请输入内容" @change="handleGuestEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="客源类型">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardType" placeholder="请输入内容" @change="handleGuestEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button size="small" type="danger" @click="handleGuestDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工作区域" name="fourth">
          <div class="code-add"><button @click="setMaskDataWork">新增</button></div>
          <el-table :data="tableDataWork" class="tb-edit" style="width: 100%" size="mini" :header-cell-style="{background:'#303A41',color:'white'}" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="编号">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardNum" placeholder="请输入内容" @change="handleWorkEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="工作区域">
              <template v-slot="scope">
                <el-input size="small" v-model="scope.row.cardType" placeholder="请输入内容" @change="handleWorkEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.cardType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button size="small" type="danger" @click="handleWorkDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="钟点房时间设置" name="fifth">
          <div class="code-sethour">
            <span>钟点房时间选择:</span>
            <ul>
              <li>
                <el-checkbox v-model="onehour">1小时</el-checkbox>
                <el-checkbox v-model="twohour">2小时</el-checkbox>
                <el-checkbox v-model="threehour">3小时</el-checkbox>
                <el-checkbox v-model="fourhour">4小时</el-checkbox>
                <el-checkbox v-model="fivehour">5小时</el-checkbox>
                <el-checkbox v-model="sixhour">6小时</el-checkbox>
              </li>
            </ul>
            <ul>
              <li>
                <button>保存</button>
                <button>取消</button>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加收房费设置" name="six">
          <!--加收房费设置-->
          <div class="code-rate">
            <el-checkbox v-model="handrate">手动加收房费</el-checkbox>
            <el-checkbox v-model="escalrate">自动加收房费</el-checkbox>
          </div>
          <div class="code-rate-main">
            <ul>
              <li style="padding-top: 20px"><label>日租房</label><label style="margin-left: 600px">钟点房</label></li>
              <li><label>默认退房时间：<span>13:00</span></label></li>
              <li><label>不加收房费截止时间：</label><label style="margin-left: 505px">超过每小时加收房费：</label></li>
              <li><input/><input style="margin-left: 455px" /></li>
              <li><label>超过每小时加收房费：</label></li>
              <li><input/></li>
              <li><label>超过半天房费时间：</label></li>
              <li><input/></li>
              <li><label>加收全天房费时间：</label></li>
              <li><input/></li>
            </ul>
          </div>
          <div class="code-rate-btn">
            <button>保存</button>
            <button>取消</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="凌晨房时段设置" name="seven">
          <div class="code-weehour">
            <ul>
              <li><label>凌晨房结束时间:</label></li>
              <li><label>00:00~</label>
                <el-date-picker
                  v-model="valuedatatime"
                  size="mini"
                  type="datetime"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                  placeholder="选择日期时间">
                </el-date-picker>
              </li>
              <li>*在此时段内开房默认退房时间为当天！</li>
            </ul>
          </div>
          <div class="code-rate-btn">
            <button>保存</button>
            <button>取消</button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--遮罩层-->
    <div class="mask" v-show="maskShow">
      <!--证件类型的新增-->
      <div class="mask-body" v-show="masktype">
           <div class="mask-top">
               <label>新增证件类型</label>
           </div>
           <div class="mask-main">
             <ul>
               <li><label>编号:</label><input placeholder="编号"/></li>
               <li><label>证件类型:</label><input placeholder="证件类型"/></li>
             </ul>
           </div>
           <div class="btn">
               <button>保存</button>
               <button @click="SetmaskShow('type')">取消</button>
           </div>
      </div>
      <div class="mask-body" v-show="maskcheck">
           <div class="mask-top">
             <label>新增入住类型</label>
           </div>
           <div class="mask-main">
             <ul>
               <li><label>序号:</label><input placeholder="序号"/></li>
               <li><label>入住类型:</label><input placeholder="入住类型"/></li>
             </ul>
           </div>
           <div class="btn">
               <button>保存</button>
               <button @click="SetmaskShow('check')">取消</button>
           </div>
      </div>
      <div class="mask-body" v-show="maskguest">
           <div class="mask-top">
             <label>新增客源类型</label>
           </div>
           <div class="mask-main">
             <ul>
               <li><label>编号:</label><input placeholder="编号"/></li>
               <li><label>客源类型:</label><input placeholder="客源类型"/></li>
             </ul>
           </div>
          <div class="btn">
              <button>保存</button>
              <button @click="SetmaskShow('guest')">取消</button>
          </div>
      </div>
      <div class="mask-body" v-show="maskwork">
           <div class="mask-top">
             <label>新增工作区域</label>
           </div>
           <div class="mask-main">
             <ul>
               <li><label>编号:</label><input placeholder="编号"/></li>
               <li><label>工作区域:</label><input placeholder="工作区域"/></li>
             </ul>
           </div>
          <div class="btn">
              <button>保存</button>
              <button @click="SetmaskShow('work')">取消</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //证件类型的遮罩层
        masktype : false,
        //入住类型的遮罩层
        maskcheck : false,
        //客源类型的遮罩层
        maskguest : false,
        //工作区域的遮罩层
        maskwork : false,
        //遮罩层
        maskShow: false,
        //凌晨房结束时间
        valuedatatime : '',
        //手动加收房费
        handrate: false,
        //自动加收房费
        escalrate: true,
        //切换控制
        activeName: 'first',
        //钟点房时间设置
        onehour: true,
        twohour: false,
        threehour: false,
        fourhour: false,
        fivehour: false,
        sixhour: false,
        //证件类型
        tableDataCardType: [{
          cardNum: '1002',
          cardType: '护照',
        }, {
          cardNum: '1003',
          cardType: '身份证',
        }, {
          cardNum: '1004',
          cardType: '军官证',
        }, {
          cardNum: '1005',
          cardType: '学生证',
        }],
        //入住类型
        tableDataCheck: [],
        //客源类型
        tableDataGuest: [],
        //工作区域
        tableDataWork: [],
        //钟点房时间设置
        tableDataHour: [],
        //加收房费设置
        tableDataRoomRate: [],
        //凌晨房时段设置
        tableDataWeeHour: [],
      }
    },
    created: function() {
      /**
       * 证件类型获取数据
       * 因为证件类型是页面进来默认加载的，所以是需要写到created里面的。
       */
    },
    methods: {
      /**
       * @handleClick tab切换的函数  这样可以根据参数的不同进行页面的不同数据渲染
       * @param ele 当前tab的name
       */
      handleClick: function(ele) {
        console.log(ele);
      },
      /**
       * @handleCurrentChange 点击某一行的时候触发的事件
       * @param row
       * @param event
       * @param column
       * @event.currentTarget 当前列渲染的的H5
       */
      handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
      },
      /**
       * @type 证件类型
       * @handleCardTypeEdit   点击修改某一行数据的时候，修改结束切换到别的行的时候出发的事件
       * @param index  当前行
       * @param row    当前行的数据
       */
      handleCardTypeEdit(index, row) {
        console.log(index, row);
      },
      /**
       * @type 证件类型
       * @handleCardTypeDelete 点击删除
       * @param index  当前行
       * @param row    当前行数据 (可以根据当前行的数据拿到该行的id，进行后端交互数据的删除)
       */
      handleCardTypeDelete(index, row) {
        console.log(index, row);
      },
      /**
       * @addDataCardType 点击保存新增证件类型
       * @param no
       */
      addDataCardType: function() {

      },
      /**
       * @setMaskDataCardType 点击新增按钮的操作
       */
      setMaskDataCardType : function(){
        this.maskShow = true;
        this.masktype = true;
      },
      /**
       * @type 入住类型
       * @handleCheckEdit   入住类型的修改
       * @param index  当前行
       * @param row    当前行的数据
       */
      handleCheckEdit(index, row) {
        console.log(index, row);
      },
      /**
       * @type 入住类型
       * @handleCheckDelete 点击删除当前行数据
       * @param index  当前行
       * @param row    当前行数据
       */
      handleCheckDelete(index, row) {
        console.log(index, row);
      },
      /**
       * @addDataCheck 新增入住类型
       * @param no
       */
      addDataCheck: function() {

      },
      /**
       * @setMaskDataCheck 点击新增按钮的操作
       */
      setMaskDataCheck : function(){
        this.maskShow = true;
        this.maskcheck = true;
      },
      /**
       * @type 客源类型
       * @handleGuestEdit   客源类型的修改
       * @param index  当前行
       * @param row    当前行的数据
       */
      handleGuestEdit(index, row) {
        console.log(index, row);
      },
      /**
       * @type 客源类型
       * @handleGuestDelete 点击删除当前行数据
       * @param index  当前行
       * @param row    当前行数据
       */
      handleGuestDelete(index, row) {
        console.log(index, row);
      },
      /**
       * @addDataGuest 新增客源类型
       * @param no
       */
      addDataGuest: function() {

      },
      /**
       * @setMaskDataGuest 点击新增按钮的操作
       */
      setMaskDataGuest : function(){
        this.maskShow = true;
        this.maskguest = true;
      },
      /**
       * @type 工作区域
       * @handleWorkEdit   工作区域的修改
       * @param index  当前行
       * @param row    当前行的数据
       */
      handleWorkEdit(index, row) {
        console.log(index, row);
      },
      /**
       * @type 工作区域
       * @handleWorkDelete 点击删除当前行数据
       * @param index  当前行
       * @param row    当前行数据
       */
      handleWorkDelete(index, row) {
        console.log(index, row);
      },
      /**
       * @addDataWork 新增入工作区域
       * @param no
       */
      addDataWork: function() {

      },
      /**
       * @setMaskDataWork 点击新增按钮的操作
       */
      setMaskDataWork : function(){
        this.maskShow = true;
        this.maskwork = true;
      },
      /**
       * @SetmaskShow 点击取消的时候遮罩层隐藏
       * @param no
       */
      SetmaskShow : function (flag) {
        console.info(flag);
        if(flag == "type"){
          this.maskShow = false;
          this.masktype = false;
        }else if(flag == "check"){
          this.maskShow = false;
          this.maskcheck = false;
        }else if(flag == "guest"){
          this.maskShow = false;
          this.maskguest = false;
        }else{
          this.maskShow = false;
          this.maskwork = false;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  //隐藏层
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(7, 13, 32, 0.6);
    top: 0;
    left: 0;
    z-index: 900;
    .mask-body{
      height: 200px;
      width: 30%;
      margin-top: 10%;
      margin-left: 35%;
      background: #ffffff;
      .mask-top{
        height: 30px;
        background: #303A41;
        line-height: 30px;
        label{
          color: #ffffff;
          margin-left: 10px;
        }
      }
      .mask-main{
         margin-top: 10px;
         text-align: center;
        ul{
          li{
            margin-top: 20px;
            label{
              text-align: right;
              margin-left: 20px;
              display: inline-block;
              width: 80px;
            }
            input{
              margin-left: 10px;
              height: 30px;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
              width: 200px;
              padding-left: 10px;
            }
          }
        }
      }
      .btn{
        margin-top: 20px;
        text-align: center;
         button{
           width: 80px;
           height: 30px;
           line-height: 30px;
           background: #4488E9;
           border: none;
           border-radius: 4px;
           color: #ffffff;
           margin-left: 20px;
         }
      }
    }
  }

  //公共的button
  .common-btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #4488E9;
    border: none;
    border-radius: 4px;
    color: #ffffff;
  }

  .code-all {
    width: 94%;
    margin-left: 10px;
    margin-top: 10px;
    .code-top {
      height: 40px;
      line-height: 40px;
      i {
        color: #777777;
        font-size: x-large;
      }
      label {
        position: absolute;
        margin-top: -3px;
        margin-left: 5px;
        font-size: small;
        color: #777777;
      }
    }
    //tab栏信息
    .code-tab {
      .code-add {
        margin-bottom: 10px;
        float: right;
        button {
          .common-btn;
        }
      }
      .code-sethour {
        span {
          display: inline-block;
        }
        ul {
          margin-top: 20px;
          li {
            button {
              margin-top: 200px;
              width: 80px;
              height: 27px;
              background: #4488E9;
              border: none;
              color: #ffffff;
              line-height: 27px;
              margin-left: 10%;
              border-radius: 4px;
            }
          }
        }
      }
      .el-table-add-row {
        margin-top: 10px;
        width: 100%;
        height: 34px;
        border: 1px dashed #c1c1cd;
        border-radius: 3px;
        cursor: pointer;
        justify-content: center;
        display: flex;
        line-height: 34px;
      }
      /**
       加收房费设置
       */
      .code-rate-main {
        margin-top: 10px;
        height: 350px;
        background: #F7F7F7;
        ul {
          li {
            margin-left: 20px;
            margin-top: 10px;
            input {
              height: 27px;
              width: 190px;
              border-radius: 4px;
              border: 1px solid #cccccc;
            }
          }
        }
      }
      .code-rate-btn {
        margin-top: 10px;
        button {
          float: right;
          background: #4488E9;
          margin-left: 20px;
          width: 80px;
          height: 30px;
          border: none;
          border-radius: 4px;
          color: #ffffff;
          line-height: 30px;
        }
      }
      .code-weehour{
        height: 200px;
        background: #F7F7F7;
        margin-top: 10px;
        ul{
          margin-top: 10px;
          li{
            padding-top: 10px;
            margin-top: 10px;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
<!--<style>
  * {
    margin: 0;
    padding: 0
  }

  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }

  .tb-edit .el-input {
    display: none
  }

  .tb-edit .current-row .el-input {
    display: block
  }

  .tb-edit .current-row .el-input+span {
    display: none
  }
</style>-->
