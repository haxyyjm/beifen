<template>
  <div class="guestIndex">
      <!-- visible控制是否显示详细信息此时为显示 -->
    <div v-show=' visible '>
        <!-- '顶层操作按钮 -->
        <div class="btn_group row">
            <el-button type="primary" @click=' visible = false '>新建</el-button>
            <el-button type="primary">组合查询</el-button>
            <el-button type="primary">打印</el-button>
            <el-button type="primary">导出</el-button>
            <el-button type="primary">刷新</el-button>
            <el-button type="primary">退出</el-button>
        </div>
        <!-- 列表清单部分 -->
        <div class="table" style="width: 100%;">
            <table>
            <thead>
                <tr>
                <th>档案号</th>
                <th>状态</th>
                <th>姓名</th>
                <th>姓名1</th>
                <th>姓名2</th>
                <th>生日</th>
                <th>证件号码</th>
                <th>单位</th>
                <th>房价码</th>
                <th>国籍</th>
                <th>电话</th>
                <th>销售员</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(item,index) in guestList"
                :key="index"
                @click="get_certain_card_base_list(item.id);"
                >
                <td>{{ item.id  }}</td>
                <td>{{ item.guest_type.sta  }}</td>
                <td>{{ item.name  }}</td>
                <td>{{ item.name1 }}</td>
                <td>{{ item.name2 }}</td>
                <td>{{ item.birth }}</td>
                <td>{{ item.id_no }}</td>
                <td>{{ item.company_name }}</td>
                <td>{{ item.guest_type.rate_code }}</td>
                <td>{{ item.nation }}</td>
                <td>{{ item.point_pay }}</td>
                <td>{{ item.money_pay }}</td>
                </tr>
            </tbody>
            </table>
            <p v-if="guestList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
            <div class="pagination">
            <el-pagination
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
            </div>
        </div>
    </div>

    <!-- visible控制是否显示详细信息 -->
    <div class='row' v-show=' !visible '>
        <!-- 左边部分 -->
        <div class='leftNav'>

        </div>
        <!-- 右边详细部分 -->
        <div class='rightNav'>
            
        </div>

    </div>
    
  </div>
</template>
<script>
export default {
    name: "guestIndex",
    data(){
        return{
            // 下拉框请求头
            SelectUrLHeader: "http://47.98.113.173:9103/",
            // 请求地址头
            UrLHeader: "http://47.98.113.173:9102/v1/", //http://member.crowncrystalhotel.com/47.98.113.173:8098
            // 分页
            currentPage: 1,
            pagesize: 10,
            total: 0,
            // 是否显示详情或者列表部分
            visible: true,
            /*
                 后台请求数据 
            */
           guestList:[]
        }
    },
    methods:{

       // 分页
        handleCurrentPageChange(currentPage) {
        let that = this;
        let url = that.UrLHeader + "customer/guest/get_guest_base_list/";
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
            method: "get",
            url: url,
            params: {
            page: currentPage,
            page_size: 10
            }
        })
            .then(function(res) {
            that.guestList = res.data.data.results;
            that.total = res.data.data.count;
            console.log(res.data.data);
            })
            .catch(function(err) {
            console.info(err);
            });
        },

        // 公共函数
        // 判断输入值是否为空
        isnull(val) {
        var str = val.replace(/(^\s*)|(\s*$)/g, ""); //去除空格;
        if (str == "" || str == undefined || str == null) {
            // this.$message('确认输入值不能为空');
            return true;
        } else {
            return false;
        }
        },
        clickf(){
            console.log(this.visible);
        }
    },
    created(){
        this.handleCurrentPageChange(1,10);
    },
    mounted() {
       
    },
}
</script>


<style lang="less" scoped>
.guestIndex{
    padding: 20px;
}
/* 顶层操作按钮 */
.btn_group{
    width: 100%;
}

// 头部后台读取数据
  .table {
    font-size: 14px;
    border: #cccccc 1px solid;
    margin-top: 20px;
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-align: center;
      thead {
        line-height: 40px;
        background-color: #68819e;
        color: #ffffff;
        tr {
          th {
            font-weight: 400;
            font-size: 16px;
          }
        }
      }
      tbody {
        line-height: 40px;
        color: #333333;
        tr {
          cursor: pointer;
          td {
            border: 1px solid #cccccc;
          }
          span {
            color: #68819e;
            cursor: pointer;
          }
          .col {
            border: 1px #68819e solid;
            margin: 0 10px;
          }
        }
        tr:hover {
          background-color: #eeeeee;
        }
      }
    }
  }
// 分页
  .pagination {
    margin: 36px 0 14px 0;
    overflow: hidden;
    p {
      margin-left: 20px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #68819e;
      color: #fff;
    }
  }
</style>
