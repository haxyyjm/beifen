<template>
  <div class="product">
    <div class="title">
      <h3 style="padding: 10px;display: inline-block">产品</h3>
      <el-button size="mini" type="primary" style="width: 80px;" @click="handleAdd">新增</el-button>
      <!-- <div style="float: right;margin-right: 50px">
        <span>OTA平台：</span>
        <el-select v-model="ota" placeholder="请选择" size="mini">
          <el-option
            v-for="item in ota_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div> -->
    </div>
    <div class="status" style="margin-top: 10px">
      <el-table
        :data="ota_list"
        size="mini"
        height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;"
      >
        <el-table-column fixed="left" type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="ctrip_hotel_id.name" label="携程对应旅馆"></el-table-column>
        <el-table-column prop="ota_company_id.name" label="ota公司"></el-table-column>
        <el-table-column prop="local_room_type_id.descript" label="房型"></el-table-column>
        <el-table-column prop="bed_count" label="床数"></el-table-column>
        <el-table-column label="是否含早">
          <template slot-scope="scope">{{scope.row.breakfast == 1 ? '是' : '否'}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="其它说明"></el-table-column>

        <el-table-column width="180" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleUpdate(scope.row,scope.row.id)">修改</el-button>
            <el-button @click="deleteProduct(scope.row.id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑dialog -->
        <el-dialog class="houseTypeClass" center :close-on-click-modal = 'false'  width="50%" :title="title_desc" :visible.sync="dialogVisible" :modal="false">
          <div>
            <div style="height: 300px;text-align: left;overflow: auto">
              <el-form label-width="70px" :label-position="labelPosition" :inline="true" :model="dataParam" class="demo-form-inline">
                <el-form-item label="名称">
                  <el-input v-model="dataParam.name" placeholder="名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="旅馆">
                  <el-input v-model="dataParam.hotel_id" placeholder="旅馆id"></el-input>
                </el-form-item> -->
                <el-form-item label="公司">
                  <!-- <el-input v-model="dataParam.ota_id" placeholder="ota公司id"></el-input> -->
                  <el-select   style="width: 202px" v-model="dataParam.ota_id" placeholder="请选择">
                    <el-option
                      v-for="item in companyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item label="房型">
                  <!-- <el-input v-model="dataParam.room_type_id" placeholder="房型id"></el-input> -->
                  <el-select   style="width: 202px" v-model="dataParam.room_type_id" placeholder="请选择">
                    <el-option
                      v-for="item in roomTypeList"
                      :key="item.id"
                      :label="item.descript"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item label="床数">
                  <el-input v-model="dataParam.bed_count" placeholder="床数"></el-input>
                </el-form-item> 
                <el-form-item label="是否含早">
                   <el-select style="width: 202px" v-model="dataParam.is_breakfast" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item label="其它说明">
                  <el-input v-model="dataParam.remark" placeholder="其它说明"></el-input>
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
      roomTypeList: [],
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
        name: '',
        // hotel_id: '',
        ota_id: '',
        bed_count: '',
        is_breakfast: '0',
        remark: '',
        room_type_id: ''
      },
      dialogVisible: false,
      url: this.api.api_9530_9503,
      title: "",
      //分页
      total: 10,
      pagesize: 10,
      cur_page: 1,
      ota_list: [], //ota平台
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
    that.getProduct();
    this.getRoomType()
    this.getCompany()
  },
  methods: {
    /**
     * @remark 产品列表
     */
    getProduct() {
      let that = this;
      that
        .$axios({
          url:
            that.url +
            `/v1/ota/product/list?page_size=${that.pagination.pageSize}&page_num=${that.pagination.pageNumber}`,
          method: "get"
        })
        .then(res => {
          //console.log(res.data.data.total_count);
          if (res.data.message === "success") {
            that.ota_list = res.data.data.list;
            that.pagination.totalRows = res.data.data.total_count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页跳转
    currentChange(val) {
      // 改变页的时候调用一次
      this.pagination.pageNumber = val;
      this.getProduct();
    },
    //下拉框页数改变的时候调用
    sizeChange(val) {
      // 改变每页显示条数的时候调用一次
      this.pagination.pageSize = val;
      this.getProduct();
    },
    //获取房型数据
    getRoomType(){
      let that = this
      let url = that.api.api_newPrice_9107+ '/v1/' + `room/room_status/get_room_type_list/`
      that.$axios.get(url).then(res=>{
        if(res.data.message == 'success'){
          that.roomTypeList = res.data.data.results
        }else{
          that.message.error('获取数据失败，请重试')
        }
      }).catch((error)=>{
      })
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
    /**删除*/
    deleteProduct(id) {
      let that = this;
      that.$axios({
          url: that.url + `/v1/ota/product/delete/${id}`,
          method: "post"
        }).then(res => {
          if (res.data.message === "success") {
            this.$message.success("删除成功!");
            this.getProduct();
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
        name: '',
        // hotel_id: '',
        ota_id: '',
        bed_count: '',
        is_breakfast: '0',
        remark: '',
        room_type_id: ''
      }
    },
    /**修改产品*/
    handleUpdate(param,id) {
      this.row_id = id
      this.flag_addorupdate = false,//更新
      this.title_desc = '更新'
      this.dialogVisible = true
      console.log('param',param)
      this.dataParam.name = param.name
      // this.dataParam.hotel_id = param.ctrip_hotel_id.id
      this.dataParam.bed_count = param.bed_count
      this.dataParam.is_breakfast = String(param.breakfast)
      this.dataParam.remark = param.remark
      this.dataParam.ota_id = param.ota_company_id.id
      this.dataParam.room_type_id = param.local_room_type_id.id

    },
    /**
     * 更新和增加
     */
    confirmAdd_update(){
      if(!this.dataParam.name ||  !this.dataParam.room_type_id || !this.dataParam.ota_id){
        this.$message.warning('存在未填项!')
        return
      }
      let that = this;
      let url
      console.log('hguole')
      let id = this.row_id
      !that.flag_addorupdate ? url = that.url + `/v1/ota/product/update/${id}` : url = that.url + `/v1/ota/product/add`
      let scopeParam = {
        ota_company_id: this.dataParam.ota_id,
        // ctrip_hotel_id: this.dataParam.hotel_id,
        name: this.dataParam.name,
        local_room_type_id: this.dataParam.room_type_id,
        bed_count: this.dataParam.bed_count,
        breakfast: this.dataParam.is_breakfast,
        remark: this.dataParam.remark
      }
      that.$axios.post(url, scopeParam).then(res => {
          if (res.data.message === "success") {
            this.$message.success("操作成功!");
            this.dialogVisible = false;
            this.getProduct();
          }
        })
        .catch(err => {
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