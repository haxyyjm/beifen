<template>
  <div class="product">
    <div class="title">
      <h3 style="padding: 10px;display: inline-block">爬虫报错</h3>
      <el-button size="mini" type="primary" style="width: 80px;" @click="handleAdd">新增</el-button>
      <!-- <div style="float: right;margin-right: 50px">
        <span>OTA平台：</span>
        <el-select v-model="ota" placeholder="请选择" size="mini">
          <el-option
            v-for="item in all_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div> -->
    </div>
    <div class="status" style="margin-top: 10px">
      <el-table
        :data="all_list"
        size="mini"
        height="620"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;"
      >
        <el-table-column fixed="left" type="index" label="序号"></el-table-column>
        <el-table-column prop="error_type_id" label="错误类型">
          <template slot-scope="scope">
            <span v-if="scope.row.error_type_id == 1">没有房价码</span>
            <span v-else-if="scope.row.error_type_id == 2">ota产品没映射到本家房型</span>
            <span v-else>其它</span>
          </template>
        </el-table-column>
        <el-table-column prop="error_msg" label="错误信息"></el-table-column>
        <el-table-column prop="ota_company_id.name" label="ota公司"></el-table-column>
        <!-- <el-table-column prop="from_time" label="开始时间"></el-table-column>
        <el-table-column prop="to_time" label="结束时间"></el-table-column> -->
        <el-table-column width="180" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleUpdate(scope.row,scope.row.id)">修改</el-button>
            <el-button @click="deleteData(scope.row.id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑dialog -->
        <el-dialog class="houseTypeClass" center :close-on-click-modal = 'false'  width="50%" :title="title_desc" :visible.sync="dialogVisible" :modal="false">
          <div>
            <div style="height: 300px;text-align: left;overflow: auto">
              <el-form label-width="70px" :label-position="labelPosition" :inline="true" :model="dataParam" class="demo-form-inline">
                <el-form-item label="错误消息">
                  <el-input v-model="dataParam.error_msg" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="公司">
                  <el-select   style="width: 202px" v-model="dataParam.ota_company_id" placeholder="请选择">
                    <el-option
                      v-for="item in companyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item label="错误类型">
                  <el-select   style="width: 202px" v-model="dataParam.error_type_id" placeholder="请选择">
                    <el-option
                      v-for="item in errorTypeList"
                      :key="item.error_type_id"
                      :label="item.name"
                      :value="item.error_type_id">
                    </el-option>
                  </el-select>
                </el-form-item> 
              </el-form>
            </div>
          </div>
           <div slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="confirmAdd_update">确定</el-button>
          </div>
        </el-dialog>
      <!--分页-->
      <el-pagination
        :page-size="pagination.pageSize"
        @current-change="currentChange"
        @size-change="sizeChange"
        :current-page="pagination.pageNumber"
        :page-sizes="pagination.pageSizes"
        :total="pagination.totalRows"
        :layout="pagination.layout"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  data() {
    return {
      row_id: '',
      errorTypeList: [{
        error_type_id: 1,
        name: '没设房价码',
      },{
        error_type_id: 2,
        name: ' ota产品没映射到本家房型',
      },{
        error_type_id: 3,
        name: '其它',
      }],
      companyList: [],
      flag_addorupdate: false,
      title_desc: '更新',
      options: [{
        value: '1',
        label: '是',
      },{
        value: '0',
        label: '否',
      }],
      labelPosition: "left",
      dataParam: {
        ota_company_id: '',
        error_type_id: '',
        error_msg: '',
      },
      dialogVisible: false,
      url: this.api.api_9530_9503,
      title: "",
      //分页
      total: 10,
      pagesize: 10,
      cur_page: 1,
      all_list: [], //ota平台
      ota: "", //ota
      monitoring_list: [], //获取监控
      event_type: 4, //图像类别
      pagination: {
        totalRows: 0, //总条数
        pageSize: 15, //每页显示条数
        pageSizes: [15, 30, 45],
        pageNumber: 1,
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  created: function() {
    let that = this;
    that.getData();
    this.getCompany()
  },
  methods: {
    /**
     * @remark 产品列表
     */
    getData() {
      let that = this;
      that
        .$axios({
          url: that.url + `/v1/ota/error/list?page_size=${that.pagination.pageSize}&page_num=${that.pagination.pageNumber}`,
          method: "get"
        })
        .then(res => {
          //console.log(res.data.data.total_count);
          if (res.data.message === "success") {
            that.all_list = res.data.data.list;
            that.pagination.totalRows = res.data.data.total_count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取公司数据
    getCompany(){
      let that = this
      let url = that.url + '/v1/' + `ota/company/list`
      that.$axios.get(url).then(res=>{
        if(res.data.message == 'success'){
          that.companyList = res.data.data.list
        }else{
          that.message.error('获取数据失败，请重试')
        }
      }).catch((error)=>{
      })
    },
    //分页跳转
    currentChange(val) {
      // 改变页的时候调用一次
      this.pagination.pageNumber = val;
      this.getData();
    },
    //下拉框页数改变的时候调用
    sizeChange(val) {
      // 改变每页显示条数的时候调用一次
      this.pagination.pageSize = val;
      this.getData();
    },
    /**删除*/
    deleteData(id) {
      let that = this;
      that.$axios({
          url: that.url + `/v1/ota/product/delete/${id}`,
          method: "post"
        }).then(res => {
          if (res.data.message === "success") {
            this.$message.success("删除成功!");
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 增加
     */
    handleAdd(){
      this.flag_addorupdate = true
      this.title_desc = '增加'
      this.dialogVisible = true
      this.dataParam = {
        ota_company_id: '',
        error_type_id: '',
        error_msg: '',
      }
    },
    /**修改产品*/
    handleUpdate(param,id) {
      this.row_id = id
      this.flag_addorupdate = false,//更新
      this.title_desc = '更新'
      this.dialogVisible = true
      console.log('param',param)
      this.dataParam.ota_company_id = param.ota_company_id.id
      this.dataParam.error_type_id = param.error_type_id
      this.dataParam.error_msg = param.error_msg
    },
    /**
     * 更新和增加
     */
    confirmAdd_update(){
      if(!this.dataParam.ota_company_id ||  !this.dataParam.error_type_id || !this.dataParam.error_msg){
        this.$message.warning('存在未填项!')
        return
      }
      let that = this;
      let url
      console.log('hguole')
      let id = this.row_id
      !that.flag_addorupdate ? url = that.url + `/v1/ota/error/update/${id}` : url = that.url + `/v1/ota/error/add`
      let scopeParam = {
        ota_company_id: this.dataParam.ota_company_id,
        error_type_id: this.dataParam.error_type_id,
        error_msg: this.dataParam.error_msg,
      }
      that.$axios.post(url, scopeParam).then(res => {
          if (res.data.message === "success") {
            this.$message.success("操作成功!");
            this.dialogVisible = false;
            this.getData();
          }
        }).catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped lang="less">
.product {
  width: 100%;
  .title {
    margin: 10px 0;
  }
  .status {
    width: 97%;
  }
}
</style>

<style scoped>
 @import "../../assets/styles/topDialog.less";
</style>