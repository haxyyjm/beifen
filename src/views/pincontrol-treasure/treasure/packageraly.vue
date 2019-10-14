<template>
  <!--包早-->
  <div class="early-all">
    <div class="early-top">
      <i class="el-icon-setting"></i>
      <label>包早设置</label>
    </div>
    <div class="early-search">
      <label>早餐份数:</label>
      <input v-model="count" />
      <label style="margin-left: 20px">显示内容:</label>
      <!--这里需要将该块级元素转为行内元素-->
      <el-checkbox v-model="checkfree">免费</el-checkbox>
      <el-checkbox v-model="checkexpired">含失效</el-checkbox>
      <el-checkbox v-model="checkis_half">含停用</el-checkbox>
      <button @click="inquire">查询</button>
    </div>
    <div class="early-table">
      <el-table :data="tableData" size="mini" border height="400px" :header-cell-style="{background:'#303A41'}" style="width: 100%">
        <el-table-column prop="code" label="代码">
        </el-table-column>
        <el-table-column prop="descript" label="中文描述">
        </el-table-column>
        <el-table-column prop="descript_en" label="英文描述">
        </el-table-column>
        <el-table-column prop="starting_days" label="有效期起">
        </el-table-column>
        <el-table-column prop="closing_days" label="有效期止">
        </el-table-column>
        <el-table-column prop="price" label="销售价格">
        </el-table-column>
        <el-table-column prop="cost" label="成本价格">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button @click="editEarlyInfo(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.row.id,scope.$index,tableData)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="early-page">
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="early-bottom">
      <button>保存</button>
      <button>续期</button>
      <button>日志</button>
      <button>清空</button>
      <button @click="setaddMaskShow">新增</button>
    </div>
    <!--遮罩层-->
    <div class="mask" v-show="maskShow">
      <div class="mask-suspen" v-show="maskShowadd">
        <div class="mask-close">
          <label>新增包早</label>
        </div>
        <div class="mask-body">
          <ul>
            <li><span>代码:</span><input v-model="code" /><span>早餐份数:</span><input v-model="quantity" type="number" /></li>
            <li><span>n天后生效起始日期:</span>
              <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="starting_days" size="mini" style="width: 200px;margin-left: 6px" type="date" placeholder="选择日期时间">
              </el-date-picker>
              <span>n天后生效结束日期:</span>
              <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="closing_days" size="mini" style="width: 200px;margin-left: 2px" type="date" placeholder="选择日期时间">
              </el-date-picker>
            </li>
            <li><span>起始时间:</span>
              <el-date-picker format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="starting_time" size="mini" style="width: 200px;margin-left: 6px" type="datetime" placeholder="选择日期时间">

              </el-date-picker>
              <span>结束时间:</span>
              <el-date-picker format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="closing_time" size="mini" style="width: 200px;margin-left: 2px" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </li>
            <li><span>描述:</span><input v-model="descript" /><span>英文描述:</span><input v-model="descript_en" /></li>
            <li><span>对应集团代码:</span><input v-model="group_code" /><span>集团ID:</span><input v-model="hotel_group_id" /></li>
            <li><span>酒店ID:</span><input v-model="hotel_id" /><span>销售价格:</span><input v-model="price" /></li>
            <li><span>成本:</span><input v-model="cost" /><span>排序:</span><input v-model="list_order" type="number" /></li>
            <li style="margin-left: -30px"><span>是否集团代码:</span>
              <el-radio v-model="is_group" label="1">是</el-radio>
              <el-radio v-model="is_group" label="2">否</el-radio>
              <span>是否停用:</span>
              <el-radio v-model="is_halt" label="1">是</el-radio>
              <el-radio v-model="is_halt" label="2">否</el-radio>
              <span>是否系统代码:</span>
              <el-radio v-model="is_sys" label="1">是</el-radio>
              <el-radio v-model="is_sys" label="2">否</el-radio>
            </li>
          </ul>

        </div>
        <div class="mask-btn">
          <button style="margin-left: 40%" @click="addEarlyInfo">保存</button>
          <button @click="setcauleMaskShow">取消</button>
        </div>
      </div>
      <!--更新信息-->
      <div class="mask-suspen" v-show="maskShowupdate">
        <div class="mask-close">
          <label>更新包早</label>
        </div>
        <div class="mask-body">
          <ul>
            <li><span>代码:</span><input v-model="code" /><span>早餐份数:</span><input v-model="quantity" type="number" /></li>
            <li><span>n天后生效起始日期:</span>
              <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="starting_days" size="mini" style="width: 200px;margin-left: 6px" type="date" placeholder="选择日期时间">
              </el-date-picker>
              <span>n天后生效结束日期:</span>
              <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="closing_days" size="mini" style="width: 200px;margin-left: 2px" type="date" placeholder="选择日期时间">
              </el-date-picker>
            </li>
            <li><span>起始时间:</span>
              <el-date-picker format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="starting_time" size="mini" style="width: 200px;margin-left: 6px" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
              <span>结束时间:</span>
              <el-date-picker format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="closing_time" size="mini" style="width: 200px;margin-left: 2px" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </li>
            <li><span>描述:</span><input v-model="descript" /><span>英文描述:</span><input v-model="descript_en" /></li>
            <li><span>对应集团代码:</span><input v-model="group_code" /><span>集团ID:</span><input v-model="hotel_group_id" /></li>
            <li><span>酒店ID:</span><input v-model="hotel_id" /><span>销售价格:</span><input v-model="price" /></li>
            <li><span>成本:</span><input v-model="cost" /><span>排序:</span><input v-model="list_order" type="number" /></li>
            <li style="margin-left: -30px"><span>是否集团代码:</span>
              <el-radio v-model="is_group" label="1">是</el-radio>
              <el-radio v-model="is_group" label="2">否</el-radio>
              <span>是否停用:</span>
              <el-radio v-model="is_halt" label="1">是</el-radio>
              <el-radio v-model="is_halt" label="2">否</el-radio>
              <span>是否系统代码:</span>
              <el-radio v-model="is_sys" label="1">是</el-radio>
              <el-radio v-model="is_sys" label="2">否</el-radio>
            </li>
          </ul>

        </div>
        <div class="mask-btn">
          <button style="margin-left: 40%" @click="updateEarlyInfo">保存</button>
          <button @click="setcauleMaskShow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "packageraly",
    data() {
      return {
        //分页
        currentPage: 1,
        pagesize: 10,
        total: 0,
        //url前缀
        url: '47.98.113.173:9101',
        index: 0, //
        //用户修改信息的时候的id值
        id: '',
        //是否免费
        checkfree: false,
        //是否过期
        checkexpired: false,
        //是否停用
        checkis_half: false,
        //份数
        count: '',
        //表格内容
        tableData: [],
        //遮罩层
        maskShow: false,
        //新增信息的遮罩层
        maskShowadd: false,
        //更新信息的遮罩层
        maskShowupdate: false,
        //新增操作绑定的数据
        code: '',
        quantity: 1,
        starting_days: '',
        closing_days: '',
        starting_time: '',
        closing_time: '',
        descript: '',
        descript_en: '',
        group_code: '',
        hotel_group_id: '',
        hotel_id: '',
        price: '',
        cost: '',
        is_group: '1',
        is_halt: '1',
        is_sys: '2',
        list_order: 1,
      }
    },
    /**
     * @created 页面加载请求包早数据
     */
    created: function() {
      this.searchall();
    },
    methods: {
      /**
       * @searchall 无条件查询
       * @param no
       */
      searchall: function() {
        let that = this;
        let url = 'http://' + that.url + '/v1/rate_code/get_breakfast_list/';
        this.$axios({
          method: 'get',
          url: url,
        }).then(function(res) {
          console.info(res);
          if(res && res.data.data.results && res.data.data.results.length > 0) {
            that.tableData = res.data.data.results;
            that.total = res.data.count;
          } else {
            console.info("没有数据")
          }
        }).catch(function(res) {
          console.info(res.message)
        })
      },
      /**
       * @inquire 多条件查询
       * @param no
       */
      inquire: function() {
        let that = this;
        let free;
        let expired;
        let is_halt;
        let count = "" ? "" : that.count;
        let url = 'http://' + that.url + '/breakfast/';
        that.checkfree === true ? free = 1 : free = "";
        that.checkexpired === true ? expired = 1 : expired = "";
        that.checkis_half === true ? is_halt = 1 : is_halt = "";
        if(count == "" && free === "" && expired == "" && is_halt == "") {
          that.searchall()
        } else {
          this.$axios({
            method: 'get',
            url: url,
            params: {
              quantity: count,
              free: free,
              expired: expired,
              is_halt: is_halt,
            }
          }).then(function(res) {
            console.log(res.data);
            that.tableData = res.data.results;
            that.total = res.data.count;
          }).catch(function(res) {
            console.log(res.message);
          })
        }
      },
      /**
       * @deleteClick 删除操作
       * @param id 当前数据的ID
       * @param index 当前行的行数
       * @param rows 当前行的数据
       */
      deleteClick: function(id, index, rows) {
        let url = 'http://' + this.url + '/breakfast/' + id + '/delete/';
        this.$axios({
          method: 'post',
          url: url,
        }).then(function(res) {
          rows.splice(index, 1);
          //删除提示
          alert(res.data.message);
          console.info(res.data.message);
        }).catch(function(res) {
          console.info(res.message);
        })
      },
      /**
       * @setaddMaskShow 新增操作时候的遮罩层的隐藏与显示
       * @param no
       */
      setaddMaskShow() {
        this.maskShow = true;
        this.maskShowadd = true;
      },
      /**
       * @setcauleMaskShow 取消操作
       * @param no
       */
      setcauleMaskShow: function() {
        this.maskShow = false;
        this.maskShowadd = false;
        this.maskShowupdate = false;
      },

      /**
       * @addEarlyInfo 新增包早信息
       * @param no
       */
      addEarlyInfo: function() {
        let that = this;
        let url = 'http://' + that.url + '/v1/rate_code/add_breakfast/';
        let is_group = that.is_group == '1' ? 1 : 0;
        let is_halt = that.is_halt == '1' ? 1 : 0;
        let is_sys = that.is_sys == '1' ? true : false;
        that.$axios({
          method: 'post',
          url: url,
          data: {
            code: that.code,
            quantity: that.quantity,
            starting_days: that.starting_days,
            closing_days: that.closing_days,
            starting_time: that.starting_time,
            closing_time: that.closing_time,
            descript: that.descript,
            descript_en: that.descript_en,
            group_code: that.group_code,
            hotel_group_id: that.hotel_group_id,
            hotel_id: that.hotel_id,
            price: that.price,
            cost: that.cost,
            is_group: is_group,
            is_halt: is_halt,
            is_sys: is_sys,
            list_order: that.list_order,
          }
        }).then(function(res) {
          console.info(res);
          if(res.data.message == "success") {
            console.info(res.data.message);
            that.maskShow = false;
            that.maskShowadd = false;
            that.searchall();
          } else {
            console.info(res.data.message);
          }
        }).catch(function(err) {
          console.info(err);
        })
      },
      /**
       * @editEarlyInfo 编辑操作
       * @param model 当前行的数据
       * @param index 当前行数
       */
      editEarlyInfo: function(model, index) {
        let that = this;
        let is_group = model.is_group == true ? '1' : '2';
        let is_halt = model.is_halt == true ? '1' : '2';
        let is_sys = model.is_sys == true ? '1' : '2';
        //console.info(model);
        that.index = index;
        that.code = model.code,
          that.quantity = model.quantity,
          that.starting_days = model.starting_days,
          that.closing_days = model.closing_days,
          that.starting_time = model.starting_time,
          that.closing_time = model.closing_time,
          that.descript = model.descript,
          that.descript_en = model.descript_en,
          that.group_code = model.group_code,
          that.hotel_group_id = model.hotel_group_id,
          that.hotel_id = model.hotel_id,
          that.price = model.price,
          that.cost = model.cost,
          that.is_group = is_group,
          that.is_halt = is_halt,
          that.is_sys = is_sys,
          that.list_order = model.list_order,
          that.id = model.id,
          that.maskShow = true;
        that.maskShowupdate = true;
      },
      /**
       * @updateEarlyInfo 更新信息
       * @param no
       */
      updateEarlyInfo: function() {
        let that = this;
        let is_group = that.is_group == '1' ? true : false;
        let is_halt = that.is_halt == '1' ? true : false;
        let is_sys = that.is_sys == '1' ? true : false;
        let url = 'http://' + that.url + '/v1/rate_code/update_breakfast/' + that.id + '/';
        this.$axios({
          method: 'post',
          url: url,
          data: {
            code: that.code,
            quantity: that.quantity,
            starting_days: that.starting_days,
            closing_days: that.closing_days,
            starting_time: that.starting_time,
            closing_time: that.closing_time,
            descript: that.descript,
            descript_en: that.descript_en,
            group_code: that.group_code,
            hotel_group_id: that.hotel_group_id,
            hotel_id: that.hotel_id,
            price: that.price,
            cost: that.cost,
            is_group: is_group ? 0 : 1,
            is_halt: is_halt ? 0 : 1,
            is_sys: is_sys,
            list_order: that.list_order,
          }
        }).then(function(res) {
          console.info(res);
          if(res.data.message == "success") {
            that.tableData[that.index] = res.data.results;
            that.maskShow = false;
            that.maskShowupdate = false;
            that.searchall();
          } else {
            console.info(res.data.message);
          }
        }).catch(function(err) {
          console.info(err);
        })
      },
      /**
       * @handleSizeChange  点击设置每页显示数量的时候触发的函数（该功能目前未开放）
       * @handleCurrentChange 点击页码的时候触发的函数
       * @param size 每页显示的页数
       * @param currentPage 当前的页码
       */
      handleSizeChange: function(size) {
        this.pagesize = size;
        console.info(size)
      },
      handleCurrentChange: function(currentPage) {
        let that = this;
        let url = 'http://' + that.url + '/breakfast/?page=' + currentPage + '';
        that.currentPage = currentPage;
        this.$axios({
          method: 'get',
          url: url,
        }).then(function(res) {
          that.tableData = res.data.results;
        }).catch(function(err) {
          console.info(err);
        })
      }
    },
  }
</script>

<style scoped lang="less">
  //遮罩层
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(7, 13, 32, 0.6);
    top: 0;
    left: 0;
    z-index: 900;
    .mask-suspen {
      background: #F5F5F5;
      width: 60%;
      height: 60%;
      position: fixed;
      top: 15%;
      left: 20%;
      .mask-close {
        background: #FFFFFF;
        height: 40px;
        width: 100%;
        background: #303A41;
        color: #ffffff;
        line-height: 40px;
        label {
          margin-left: 10px;
        }
      }
      .mask-body {
        ul {
          li {
            margin-top: 10px;
            span {
              display: inline-block;
              width: 140px;
              text-align: right;
              margin-left: 40px;
            }
            input {
              width: 200px;
              height: 27px;
              margin-left: 10px;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
          }
        }
      }
      .mask-btn {
        button {
          width: 80px;
          height: 30px;
          background: #4488E9;
          border: none;
          color: #ffffff;
          line-height: 30px;
          margin-left: 40px;
          margin-top: 20px;
        }
      }
    }
  }

  .early-all {
    width: 94%;
    margin-left: 10px;
    margin-top: 10px;
    .early-top {
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
    .early-search {
      margin-top: 10px;
      input {
        height: 25px;
        width: 200px;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
      button {
        margin-left: 10px;
        background: #4488E9;
        height: 30px;
        width: 60px;
        border: none;
        color: #ffffff;
        line-height: 30px;
        border-radius: 4px;
      }
    }
    .early-table {
      margin-top: 10px;
    }
    .early-page {
      margin-top: 10px;
      span {
        color: #333333;
      }
      .page {
        float: right;
      }
    }
    .early-bottom {
      margin-top: 50px;
      button {
        width: 80px;
        height: 30px;
        background: #68819E;
        border: none;
        color: #ffffff;
        line-height: 30px;
      }
    }
  }
</style>
