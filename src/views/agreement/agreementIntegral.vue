<template>
  <div class="integral">
    <!-- 积分设置后台读卡部分 -->
    <div class="tableShow">
      <div class="leftShow pull-left">
        <el-tree
          style="background: #f7f7f7"
          :data="treeData"
          ref="tree"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <!-- 表格 -->
      <div class="table pull-right" style="width: 75%;">
        <el-table
          :data="tableData"
          @row-click="handleInfoById"
          :header-cell-style="{background:'#BFCAD1', color: '#68819E'}"
          style="width: 100%"
        >
          <el-table-column type="index" width="55" label="编号"></el-table-column>
          <el-table-column prop="code" label="积分规则代码"></el-table-column>
          <el-table-column prop="descript" label="中文描述"></el-table-column>
          <el-table-column prop="descript_en" label="英文描述"></el-table-column>
          <el-table-column prop="rate" label="积分比例"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getData"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 协议公司-VIP 级别 -->
    <p class="iconLogo">协议公司-VIP 级别</p>
    <!-- 输入框 -->
    <div class="classDiv">
      <!-- 左边 -->
      <div class="classCell">
        <div class="inputCell">
          <p>代码：</p>
          <!-- 查询input -->
          <el-input v-model="param.code" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>中文描述 ：</p>
          <!-- 查询input -->
          <el-input v-model="param.descript" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>英文描述：</p>
          <!-- 查询input -->
          <el-input v-model="param.descript_en" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>积分比例：</p>
          <!-- 查询input -->
          <el-input v-model.trim="param.rate_1" placeholder="请输入内容" style="width: 190px;"></el-input>
          <span style="margin-left: 4px;margin-right: 4px">:</span>
          <el-input v-model.trim="param.rate_2" placeholder="请输入内容" style="width: 190px;"></el-input>
        </div>
        <div class="inputCell">
          <p>起步金额：</p>
          <!-- 查询input -->
          <el-input v-model="param.base" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>消费酒店：</p>
          <!-- 查询input -->
          <el-input v-model="param.consume_hotel" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>来源：</p>
          <!-- 查询input -->
          <el-input v-model="param.src" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>渠道：</p>
          <!-- 查询input -->
          <el-input v-model="param.channel" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>房价码：</p>
          <!-- 查询input -->
          <el-input v-model="param.rate_code" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>费用类别：</p>
          <!-- 查询select -->
          <el-input v-model="param.fee_code" placeholder="请输入内容" style="width: 400px;"></el-input>
          <!-- <el-select v-model="param.fee_code" style="width: 400px;">
                        <el-option label="全部" value="All">
                        </el-option>
                        <el-option></el-option>
          </el-select>-->
        </div>
      </div>
      <!-- 中间 -->
      <div class="classCell">
        <div class="inputCell">
          <p>账务发生日期：</p>
          <!-- 查询input -->
          <!-- <el-input v-model="SearchContent" placeholder="请输入内容" style="width: 400px;"></el-input> -->
          <el-date-picker v-model="value1" type="date" style="width: 400px;" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="inputCell">
          <p>有效期起：</p>
          <!-- 查询input -->
          <el-date-picker
            v-model="param.date_begin"
            type="date"
            style="width: 400px;"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div class="inputCell">
          <p>有效期止：</p>
          <!-- 查询input -->
          <el-date-picker
            v-model="param.date_end"
            type="date"
            style="width: 400px;"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div class="inputCell">
          <p>截断方式：</p>
          <!-- 查询input -->
          <el-input v-model="param.truncate" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>开卡酒店：</p>
          <!-- 查询input -->
          <el-input v-model="param.card_produce_hotel" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>消费日期：</p>
          <!-- 查询input -->
          <el-date-picker v-model="value1" type="date" style="width: 400px;" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="inputCell">
          <p>市场：</p>
          <!-- 查询input -->
          <el-input v-model="param.market" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>预订渠道：</p>
          <!-- 查询input -->
          <el-input v-model="param.rsv_type" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
        <div class="inputCell">
          <p>房类：</p>
          <el-select v-model="param.room_type" style="width: 400px;">
            <el-option
              v-for="(item,index) in idCodeArr"
              :key="index"
              :label="item.descript"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div class="inputCell">
          <p>付款码：</p>
          <!-- 查询input -->
          <el-input v-model="param.pay_code" placeholder="请输入内容" style="width: 400px;"></el-input>
        </div>
      </div>
      <!-- 右边部分 -->
      <div class="classCell pull-right" style="width: 15%;margin-top: 5%;">
        <p class="cellp">创建人:{{param.create_user}}</p>
        <p class="cellp">创建日期:{{param.create_datetime}}</p>
        <p class="cellp">修改人:{{param.modify_user}}</p>
        <p class="cellp">修改日期:{{param.modify_datetime}}</p>
        <div>
          <!-- 添加 -->
          <el-button v-show="showAdd" @click="handleAdd()" type="primary">添加</el-button>
          <el-button v-show="showDeleteAndEdit" type="primary" @click="handleDelete()">删除</el-button>
          <el-button v-show="showDeleteAndEdit" type="primary" @click="handleEdit()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "integral",
  data() {
    return {
      // UrLHeader: 'http://47.98.113.173:9102/v1/',//http://member.crowncrystalhotel.com/
      UrLHeader: "http://47.98.113.173:9102/v1/",
      tableData: [],
      checked: true,
      SearchContent: "",
      param: {},
      showAdd: false,
      showDeleteAndEdit: false,
      //选中行所选取值id
      rowId: "",
      //树形结构
      treeData: [],
      value1: "",
      // 分页
      currentPage: 1,
      pagesize: 10,
      total: 0,
      str_before: "",
      str_after: "",
      card_type: "",
      card_level: "",
      defaultProps: {
        children: "children",
        label: "descript"
      },
      // 费用类别
      custom_wayArr: [
        {
          code: "point",
          descript: "积分"
        },
        {
          code: "money",
          descript: "现金"
        }
      ],
      idCodeArr: []
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    //节点点击事件
    handleNodeClick(data) {
      this.showAdd = true;
      this.showDeleteAndEdit = false;
      this.param = {};
      let card_type = data.card_type;
      let card_level = data.card_level;
      this.card_type = card_type;
      this.card_level = card_level;
      if (card_type != undefined && card_level != undefined) {
        this.getData(this.currentPage, card_type, card_level);
      }
    },
    handleSizeChange() {},
    //得到树状结构数据，并重新组装数据，改变数据结构
    getTreeData() {
      let that = this;
      let url =
        that.UrLHeader + "customer/member/get_card_setting_tree/?code_type=CM";
      axios
        .get(url)
        .then(res => {
          let newArr = res.data.data.results;
          for (let item of newArr) {
            for (let itemm of item.children) {
              itemm.card_type = item.code;
              itemm.card_level = itemm.code;
            }
          }
          this.treeData = res.data.data.results;
        })
        .catch(error => {
        //   console.log(error);
        });
    },
    //通过点击树状结构下节点 获取积分列表数据==》分页查询数据
    getData(currentPage, card_type, card_level) {
      let that = this;
      let url = that.UrLHeader + "customer/member/get_card_point_rule_list/";
      axios({
        method: "get",
        url: url,
        params: {
          page: currentPage,
          page_size: 8,
          card_type: card_type,
          card_level: card_level
        }
      })
        .then(res => {
          if (res.data.message == "success") {
            that.tableData = res.data.data.results;
            that.total = res.data.data.count;
          } else {
            that.$message.error("获取数据失败，请重试");
          }
        })
        .catch(error => {});
    },
    //点击table行 根据id查询制定的会员积分设置
    handleInfoById(row) {
      let that = this;
      that.showDeleteAndEdit = true;
      that.showAdd = false;
      that.rowId = row.id;
      let url =
        that.UrLHeader +
        "customer/member/get_card_point_rule_info/" +
        row.id +
        "/";
      axios.get(url).then(res => {
        if (res.data.message == "success") {
          that.param = res.data.data;
          that.getString(that.param.rate, ":");
          that.param.rate_1 = that.str_before;
          that.param.rate_2 = that.str_after;
          that.param.create_datetime = moment().format("YYYY-MM-DD HH:mm:ss");
          that.param.modify_datetime = moment().format("YYYY-MM-DD HH:mm:ss");
        } else {
          that.$message.error("获取数据失败，请重试");
        }
      });
    },
    //截取字符串获取特定符号前后数据
    getString(string, str) {
      this.str_before = string.split(str)[0];
      this.str_after =
        string.split(str)[1] === undefined ? "" : string.split(str)[1];
    },
    //根据id更新当前行数据
    handleEdit() {
      if (!this.validateData()) {
        return;
      }
      let id = this.rowId;
      let url =
        this.UrLHeader + "customer/member/update_card_point_rule/" + id + "/";
      let _this = this;
      _this.param.rate = _this.param.rate_1 + ":" + _this.param.rate_2;
      axios.post(url, _this.param).then(res => {
        if (res.data.message == "success") {
          _this.getData(_this.currentPage, _this.card_type, _this.card_level);
          _this.$message({
            message: "保存信息成功",
            type: "success"
          });
          _this.showDeleteAndEdit = false;
          _this.showAdd = true;
          _this.param = {}; //置空
        } else {
          this.$message.error("保存信息失败");
        }
      });
    },
    //根据id删除所点击行的数据
    handleDelete() {
      let _this = this;
      let id = _this.rowId;
      let url =
        _this.UrLHeader + "customer/member/remove_card_point_rule/" + id + "/";
      _this
        .$confirm("是否进行删除操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // 发送请求:将数据返回到数据库
          axios
            .post(url)
            .then(() => {
              _this.getData(
                _this.currentPage,
                _this.card_type,
                _this.card_level
              );
              _this.$message({
                message: "删除成功",
                type: "success"
              });
              _this.showDeleteAndEdit = false;
              _this.showAdd = true;
              _this.param = {};
            })
            .catch(error => {
              _this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加数据并展示在table上
    handleAdd() {
      if (this.card_type === undefined || this.card_level === undefined) {
        this.$message({
          message: "请点击具体子节点在进行添加!",
          type: "warning"
        });
        return;
      }
      if (!this.validateData()) {
        return;
      }
      let that = this;
      let url = that.UrLHeader + "customer/member/add_card_point_rule/";
      that.param.card_type = that.card_type;
      that.param.card_level = that.card_level;
      that.param.rate = that.param.rate_1 + ":" + that.param.rate_2;
      axios
        .post(url, that.param)
        .then(res => {
          that.getData(that.currentPage, that.card_type, that.card_level); //获取最新table数据
          that.$message({
            message: "添加成功",
            type: "success"
          });
          that.param = {}; //置空
        })
        .catch(error => {
          this.$message.error("添加数据失败");
        });
    },
    //验证数据方法 返回值(boolean)
    validateData() {
      return (
        this.validateBlank(this.param.code, "代码是必填项", this) &&
        this.validateBlank(this.param.descript, "中文描述是必填项", this) &&
        this.validateBlank(this.param.descript_en, "英文描述是必填项", this) &&
        this.validateBlank(this.param.rate_1, "积分比例是必填项", this) &&
        this.validateBlank(this.param.rate_2, "积分比例是必填项", this) &&
        this.validateNAN(this.param.rate_1, "积分比例是数字", this) &&
        this.validateNAN(this.param.rate_2, "积分比例是数字", this)
      );
    },
    //工具方法验证为空
    validateBlank: function(targetParam, warnMessage, VueInst, successMessage) {
      if (!warnMessage) {
        return !(
          targetParam === "" ||
          targetParam === null ||
          targetParam === undefined
        );
      } else {
        if (
          targetParam === "" ||
          targetParam === null ||
          targetParam === undefined
        ) {
          VueInst.$message({
            message: warnMessage,
            type: "error"
          });
          return false;
        } else {
          if (successMessage) {
            VueInst.$message({
              message: successMessage,
              type: "success"
            });
          }
          return true;
        }
      }
    },
    //工具方法验证为数字
    validateNAN: function(ce, warnMessage, VueInst, successMessage) {
      if (ce === "" || ce === null || ce === undefined) {
        return true;
      }
      var reg = /^(\-|\+)?\d+(\.\d+)?$/;
      if (!warnMessage) {
        return reg.test(ce);
      } else {
        if (!reg.test(ce)) {
          VueInst.$message({
            message: warnMessage,
            type: "error"
          });
          return false;
        } else {
          if (successMessage) {
            VueInst.$message({
              message: successMessage,
              type: "success"
            });
          }
          return true;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-checkbox {
  color: #ffffff;
}
// 积分
.integral {
  padding: 10px;
  // 头部后台读取数据
  .tableShow {
    width: 100%;
    overflow: hidden;
    .leftShow {
      width: 23%;
      height: 412px;
      background: #f7f7f7;
    }
  }
  // 会员卡列表
  .iconLogo {
    color: #333333;
    font-size: 22px;
  }
  .iconLogo::before {
    content: " ";
    display: inline-block;
    width: 28px;
    height: 25px;
    background: url("../../assets/images/member/icon-logo.png") no-repeat center;
    background-size: 100%;
    vertical-align: -4px;
    margin-right: 10px;
  }
  // 会员卡级别INPUT
  // 搜索栏
  .classDiv {
    background-color: #f7f7f7;
    padding: 0 0 0 20px;
    overflow: hidden;
    margin: 16px 0;
    font-size: 14px;
    .classCell {
      width: 33%;
      display: inline-block;
      .cellp {
        line-height: 50px;
      }
    }
    .inputCell {
      overflow: hidden;
      line-height: 40px;
      margin: 10px 0;
      p {
        width: 20%;
        display: inline-block;
      }
    }
  }
}
</style>

