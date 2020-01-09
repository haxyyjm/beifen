<template>
  <div class="room-type">
    <header style="margin: 10px;overflow: hidden">
      <p style="font-size: 16px;display: inline-block;font-weight: bold" >OTA房型</p>
      <el-button type="primary" size="mini" style="width: 80px;margin-left: 20px;" @click="add">新增</el-button >
    </header>
    <div class="content ">
      <el-table
        :data="room_type_list"
        size="mini"
        height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="ota_company_id.name"
          label="OTA公司">
        </el-table-column>
        <el-table-column
          prop="ctrip_hotel_id.name"
          :show-overflow-tooltip="true"
          label="携程下酒店">
        </el-table-column>
        <el-table-column
          prop="name"
          label="房型名称">
        </el-table-column>
        <el-table-column
          prop="bed_count"
          label="床数">
        </el-table-column>
        <el-table-column
          prop="local_room_type_id.descript"
          label="酒店房型">
        </el-table-column>
        <el-table-column
          prop="breakfast"
          label="是否含早餐">
          <template slot-scope="scope">
           <span  v-if="scope.row.breakfast===1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="remark"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="create_user"
          label="创建者">
        </el-table-column>
        <el-table-column
          prop="create_time"
          width="150"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          width="150"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="modify_user"
          label="修改用户">
        </el-table-column>

        <el-table-column
          prop="address"
          width="180 "
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, room_type_list)"
            >删除
            </el-button>
            <el-button size="mini"
                       @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, room_type_list) "
            >修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;margin-right: 2%"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
    <!--点击新增修改显示的页面-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name">{{ title }}</span>
      </div>
      <ul class="dialog_style">
        <li >
          <span><i style="color: red;font-size: 18px">*</i>OTA公司 ：</span>
          <el-select v-model="ota_company_id" placeholder="请选择" @focus="corporation_data" size="mini" style="width: 300px;">
            <el-option
              v-for="item in corporation_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li v-if="!Edite">
          <span><i style="color: red;font-size: 18px">*</i>城市下区县：</span>
          <el-select v-model="county" placeholder="请选择" @focus="county_data" size="mini" style="width: 300px;">
            <el-option
              v-for="item in county_list"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </li>
        <li v-if="!Edite">
          <span><i style="color: red;font-size: 18px">*</i>区县下商业圈：</span>
          <el-select v-model="business" placeholder="请选择" @focus="business_data" size="mini" style="width: 300px;">
            <el-option
              v-for="item in business_list"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </li>
        <li v-if="Edite">
          <span><i style="color: red;font-size: 18px">*</i>携程下酒店 ：</span>
          <el-select v-model="ctrip_hotel_id" placeholder="请选择" @focus="ctrip_hotel_id_data" disabled  size="mini" style="width: 300px;">
            <el-option
              v-for="item in ctrip_hotel_id_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li v-if="!Edite">
          <span><i style="color: red;font-size: 18px">*</i>携程下酒店 ：</span>
          <el-select v-model="ctrip_hotel_id" placeholder="请选择" @focus="ctrip_hotel_id_data" size="mini" style="width: 300px;">
            <el-option
              v-for="item in ctrip_hotel_id_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <!--<li>-->
          <!--<span>床型 ：</span>-->
          <!--<el-input v-model="param.bed_type" placeholder="请输入" style="width: 300px;"  size="mini"></el-input>-->
        <!--</li>-->
        <li>
          <span><i style="color: red;font-size: 18px">*</i>OTA房型名称 ：</span>
          <el-input v-model="param.name" placeholder="请输入" style="width: 300px;"  size="mini"></el-input>
        </li>
        <li>
          <span>床数 ：</span>
          <el-input v-model="bed_count" placeholder="请输入" style="width: 300px;"  size="mini" type="number"></el-input>
        </li>
        <li>
          <span>是否含早餐 ：</span>
          <el-radio v-model="breakfast" label="1">是</el-radio>
          <el-radio v-model="breakfast" label="0">否</el-radio>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px">*</i>酒店房型 ：</span>
          <el-select v-model="local_room_type_id" placeholder="请选择" @focus="hotel_room" size="mini" style="width: 300px;">
            <el-option
              v-for="item in hotel_room_list"
              :key="item.id"
              :label="item.descript"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>说明 ：</span>
          <el-input v-model="param.remark"  type="textarea"
                    :rows="2"
                    placeholder="请输入内容"   style="width: 300px;"  size="mini"></el-input>
        </li>

      </ul>

      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false;" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "room-type",
        data () {
          return {
            url:this.api.api_9530_9503,
            pagesize:16,
            total:1,
            dialogVisible:false,
            Edite:true, //标志位 判断的是新增还是更新
            //  新增内容
            param:{},
            title:'',
            duration:"0",
            id:'',//修改的id
            corporation_list:[],//ota公司list
            hotel_room_list:[],//本酒店的房型
            room_type_list:[],//ota房型list
            ota_company_id:'',//ota公司id
            county:'',//选中县城
            county_list:[],//所有县城
            business:'',//选中的商业圈
            business_list:[],//所有县城下的商业圈
            ctrip_hotel_id_list:[],//所有携程旅馆
            ctrip_hotel_id:'',//携程旅馆id
            ctrip_hotel_id_Edite:'',//修改时携程酒店id
            name:'',//ota上面的房型名称
            // bed_type:'',//床型：大床，双人床, ...
            bed_count:'',//床数
            breakfast:'1',//价格是否含早餐 0-不， 1-含
            remark:'',//说明
            local_room_type_id:"",// 该酒店下的房型

          }
        },
        created(){
          let that =this;
          that.visitant();//获取访客登记的列表

        },
        methods: {
          //刷新数据
          flush() {
            let that = this;
            //第一件事    将标志位改为false
            that.Edite = false;
            that.param = {
              name:'',//ota上面的房型名称
              // bed_type:'',//床型：大床，双人床, ...
              remark:'',//说明
            };
            that.business='';
            that.county='';
            that.county_list=[];
            that.business_list=[],//所有县城下的商业圈
            that.ctrip_hotel_id_list=[],//所有携程酒店
            that.ctrip_hotel_id='',//携程旅馆id
            that.bed_count='',//床数
            that.local_room_type_id="",// 该酒店下的房型
            that.ota_company_id='',//ota公司id
            that.breakfast = "1";//价格是否含早餐 0-不， 1-含
          },
          //获取ota 公司
          corporation_data(){
            let that = this;
            that.$axios({
              url: that.url + "/v1/ota/company/list",
              method: "get",
              params:{
                page_size:999,
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.corporation_list = res.data.data.list;

                } else {
                  console.log(res);
                  that.hintInfo("warning", res.data.data.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          },
          //获取县城
          county_data(){
            let that = this;
            that.$axios({
              url: that.url + "/v1/ota/ctrip_hotel/city_districts",
              method: "get",
              params:{
                page_size:999,
                city_id:1
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.county_list = res.data.data;

                } else {
                  console.log(res);
                  that.hintInfo("warning", res.data.data.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          },
          //查看是否选中城市下区县
          business_data(){
            let that =this;
            if(that.county===''){
              that.hintInfo("warning", "请选择城市下区县")
            }else {
              that.commerce();//获取商业圈
            }
          },
          //获取商业圈
          commerce(){
            let that = this;
            that.$axios({
              url: that.url + "/v1/ota/ctrip_hotel/city_biz_zones",
              method: "get",
              params:{
                page_size:999,
                city_id:1,
                district:that.county
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.business_list = res.data.data;

                } else {
                  console.log(res);
                  that.hintInfo("warning", res.data.data.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          },
          //查看是否选中商业圈
          ctrip_hotel_id_data(){
            let that =this;
            if(that.business===''){
              that.hintInfo("warning", "请选择区县下商业圈")
            }else {
              that.Ctrip_data();//获取携程
            }
          },
          //获取携程酒店
          Ctrip_data(){
            let that = this;
            that.$axios({
              url: that.url + "/v1/ota/ctrip_hotel/list",
              method: "get",
              params:{
                page_size:999,
                city_id:1,//上海
                district:that.county,//区县
                biz_zone:that.business,
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.ctrip_hotel_id_list = res.data.data.list;

                } else {
                  console.log(res);
                  that.hintInfo("warning", res.data.data.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          },
          //获取本酒店房型
          hotel_room(){
            let that = this;
            that.$axios({
              url: that.api.api_payment_9107 + "/v1/room/room_status/get_room_type_list/",
              method: "get",
              params:{
                page_size:999,
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.hotel_room_list = res.data.data.results;

                } else {
                  console.log(res);
                  that.hintInfo("warning", res.data.data.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          },
          /**获取ota房型的数据*/
          visitant() {
            let that = this;
            that.$axios({
              url: that.url + "/v1/ota/room/list",
              method: "get",
              params:{
                page_size:16,
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.room_type_list = res.data.data.list;
                  console.log(that.room_type_list);
                  that.total = res.data.data.total_count;

                } else {
                  console.log(res);
                  that.hintInfo("warning", res.data.data.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          },
          //新增ota房型
          add() {
            let that = this;
            that.dialogVisible = true;
            that.title = "新增房型";
            that.flush();
          },
          /**修改ota房型*/
          amend(row, id) {
            let that = this;
            that.Edite = true;
            that.hotel_room();//获取酒店房型
            that.corporation_data();//获取ota公司
            console.log(row, id);
            that.title = "修改房型";
            that.param = {
              name:row.name,//ota上面的房型名称
              // bed_type:'',//床型：大床，双人床, ...
              remark:row.remark,//说明
            };
            that.ota_company_id=row.ota_company_id.id;//ota公司id
            that.ctrip_hotel_id=row.ctrip_hotel_id.name;//携程旅馆
            that.ctrip_hotel_id_Edite = row.ctrip_hotel_id.id;//携程旅馆id
            // that.param.bed_type=row.bed_type;//床型：大床，双人床, ...
            that.bed_count=row.bed_count;//床数
            that.breakfast=row.breakfast+"";//价格是否含早餐 0-不， 1-含
            that.local_room_type_id=row.local_room_type_id.id;// 该酒店下的房型
            that.id = id;

          },
          /**删除ota房型*/
          cancel(id, index, list) {
            console.log(id);
            let that =this;
            that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.$axios({
                url:  that.url + "/v1/ota/room/delete/" + id,
                method: "post",
              })
                .then(res => {
                  console.log(res)
                  if (res.data.message === "success") {
                    that.visitant();
                    that.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    list.splice(index, 1);
                  }
                  // location.reload(); // 强制刷新
                })
                .catch(error => {
                  console.log(error);
                })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          /**新增修改ota房型确定*/
          ensure(){
            let that = this;
            if(that.ota_company_id==='' || that.ctrip_hotel_id==='' ||that.param.name==='' || that.local_room_type_id===''){
              that.hintInfo("warning", "*为必填项")
            }else {
              console.log(that.local_room_type_id);
              let obj_data = {};
              let obj = {
                ota_company_id: that.ota_company_id,//ota公司id
                ctrip_hotel_id: that.ctrip_hotel_id,//携程旅馆id
                name: that.param.name,//ota上面的房型名称
                // bed_type:that.param.bed_type,//床型：大床，双人床, ...
                bed_count: that.bed_count,//床数
                breakfast: that.breakfast,//价格是否含早餐 0-不， 1-含
                remark: that.param.remark,//说明
                local_room_type_id: that.local_room_type_id,// 该酒店下的房型
              };
              let obj_Edite = {
                ota_company_id: that.ota_company_id,//ota公司id
                ctrip_hotel_id: that.ctrip_hotel_id_Edite,//携程旅馆id
                name: that.param.name,//ota上面的房型名称
                // bed_type:that.param.bed_type,//床型：大床，双人床, ...
                bed_count: that.bed_count,//床数
                breakfast: that.breakfast,//价格是否含早餐 0-不， 1-含
                remark: that.param.remark,//说明
                local_room_type_id: that.local_room_type_id,// 该酒店下的房型
              };
              if (that.Edite) {
                obj_data = obj_Edite
              } else {
                obj_data = obj
              }
              console.log(obj_data);
              let url = that.Edite ? (that.url + "/v1/ota/room/update/" + that.id) : (that.url + "/v1/ota/room/add");
              that.$axios({
                url: url,
                method: "post",
                data: obj_data
              })
                .then(res => {
                  if (res.data.message === "success") {
                    console.log(res);
                    if (that.Edite) {
                      that.hintInfo("success", "修改房型成功")
                    } else {
                      that.hintInfo("success", "新增房型成功")
                    }
                    that.dialogVisible = false;
                    that.visitant();
                  } else {
                    if (that.Edite) {
                      that.hintInfo("warning", "修改房型失败")
                    } else {
                      that.hintInfo("warning", "新增房型失败")
                    }

                  }
                })
                .catch(err => {
                  console.error(err)
                  if (that.Edite) {
                    that.hintInfo("warning", "修改房型失败")
                  } else {
                    that.hintInfo("warning", "新增房型失败")
                  }
                })
            }
          },
          //点击分页上的页数
          handleCurrentChange(curPage) {
            console.log(curPage);
            let that =this;
            that.$axios({
              url:that.url + "/v1/ota/room/list",
              method:"get",
              params:{
                page_num:curPage
              }
            })
              .then(res=>{
                if(res.data.message==="success"){
                  console.log(res);
                  that.room_type_list = res.data.data.list;
                  console.log(that.room_type_list);
                  that.total = res.data.data.total_count;
                }
              })
              .catch(err=>{
                console.error(err)
              })

          },
          //修改页面的显示和隐藏
          handleClose(done) {
            done();
          },

          /**
           * @hintInfo 操作提示信息
           * @param hint  成功提示
           * @param info 警告信息
           */
          hintInfo: function (hint, info) {
            let that = this;
            if (hint === "success") {
              that.$message({
                message: info,
                type: 'success'
              });
            } else if (hint === "warning") {
              that.$message({
                message: info,
                type: 'warning'
              });
            } else {
              this.$message.error('出错了！');
            }
          },

        },
    }
</script>
<style  scoped  lang="less">
  .room-type{
    width: 97%;
    margin-left: 4px;
  .dialog_style {
    margin-left: 20px;
  /*overflow: hidden;*/
  li {
    /*float: left;*/
    /*width: 50%;*/
    margin-bottom: 10px;
  span {
    display: inline-block;
    width: 132px;
    text-align: right;
  }
  }
  }
  }
</style>


