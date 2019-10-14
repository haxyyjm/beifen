<template>
  <div class="payment_method">
    <!--支付方式 -->
    <div class="shopping">
      <div  style="position: relative">
        <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">付款方式</span>
        <el-button type="text" @click="dialogVisible = true;flush()">
          <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
        </el-button>
        <div style="position: absolute;top: 18px;left: 200px">
          <el-checkbox v-model="is_groups"  @change="screen">是否集团码</el-checkbox>
          <el-checkbox v-model="is_syss" @change="screen_sys">是否系统码</el-checkbox>
          <el-checkbox v-model="is_halts" @change="screen_halt">是否停用</el-checkbox>
        </div>

      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          :cell-style="{textAlign:'center'}"
          max-height="700"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <!--<el-table-column-->
            <!--prop="hotel_group_id.desc"-->
            <!--label="集团ID">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="hotel_id.desc"-->
            <!--label="酒店ID">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="model_name"
            width="150"
            label="模型名称">
          </el-table-column>
          <el-table-column
            prop="code"
            label="付款代码">
          </el-table-column>
          <el-table-column
            prop="desc"
            width="150"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            width="150"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="is_group "
            label="是否集团码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_group === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_sys"
            label="是否系统码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_sys === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="140"
            label="创建日期">
          </el-table-column>
          <el-table-column
            prop="create_user.user_name"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="modify_time"
            width="140"
            label="修改日期">
          </el-table-column>
          <el-table-column
            prop="modify_user.user_name"
            label="修改用户">
          </el-table-column>

          <el-table-column
            prop=" fields"
            width="150"
            fixed="right"
            label="字段定义">
            <template slot-scope="scope" >
              <el-button size="mini" @click="dialog = true; empty(scope.row.id,scope.$index, income_list) ">添加</el-button>
              <el-button size="mini" @click="dialog_check = true; fields_list(scope.row.id,scope.$index, income_list) ">查看</el-button>
              <!--<el-button  size="mini" type="danger"  @click="expurgate(scope.row.id,scope.$index, income_list)" >删除</el-button>-->
              <!--<el-button size="mini" @click="dialog = true;recompose(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            width="180 "
            fixed="right"
            label="操作">
            <template slot-scope="scope" >
              <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>
              <el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>
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
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>模型名称 ：</span>
            <el-input v-model="param.model_name " placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <!--<li>-->
            <!--<span>模型英文名称 ：</span>-->
            <!--<el-input v-model="param.collection_name " placeholder="请输入内容" style="width: 200px;"></el-input>-->
          <!--</li>-->

          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>付款代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述 ：</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>是否是系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>是否集团码 ：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>是否停用 ：</span>
            <el-radio v-model="is_halt" label="1">是</el-radio>
            <el-radio v-model="is_halt" label="0">否</el-radio>

          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>
             </span>
      </el-dialog>
      <!--点击新增修改字段定义的页面-->
      <el-dialog
        :visible.sync="dialog"
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>字段名称 ：</span>
            <el-input v-model="param.field_name " placeholder="请输入内容" style="width: 200px;"></el-input>

          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>字段类型 ：</span>
            <!--<el-input v-model="param.field_type " placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <el-select v-model="field_type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>


          </li>

          <li>
            <i style="color: red;font-size: 18px ;vertical-align: top">*</i>
            <span style="vertical-align: top">字段说明 ：</span>
            <!--<el-input v-model="param.field_desc" placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <textarea style="width: 200px; height: 100px;resize: none ;border: 1px solid #dcdfe6;border-radius: 4px" v-model="param.field_desc "></textarea>
          </li>
          <li>
            <span style="margin-left: 10px">是否不能为空 ：</span>
            <el-radio-group v-model="not_null" size="mini" disabled>
              <el-radio label="1" >是</el-radio>
              <el-radio label="0" >否</el-radio>
            </el-radio-group>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialog = false">取 消</el-button>
              <el-button type="primary" @click="augment()">确 定</el-button>
             </span>
      </el-dialog>

      <!--点击查看字段自定义的页面-->
      <el-dialog
        :visible.sync="dialog_check"
        width="80%"
        :before-close="handleClose">
        <p style="padding: 10px;font-weight: bold">字段定义</p>
        <div class="status">
          <el-table
            :data="segment_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="field_name"
              label="字段名称">
            </el-table-column>
            <el-table-column
              prop="field_type"
              label="字段类型">
            </el-table-column>
            <el-table-column
              prop="field_desc"
              label="字段说明">
            </el-table-column>

            <el-table-column
              prop="not_null"
              label="是否不能为空">
              <template slot-scope="scope">
                <span v-if="scope.row.not_null === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="address"
              width="180 "
              fixed="right"
              label="操作">
              <template slot-scope="scope" >
                <el-button  size="mini" type="danger"  @click="expurgate(scope.row.id,scope.$index, income_list)" >删除</el-button>
                <el-button size="mini" @click="dialog=true;recompose(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>
              </template>
            </el-table-column>

          </el-table>

          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next"
                         :page-size="p_fields"
                         @current-change="handleCurrentCe"
                         :total="total_fields">
          </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_check = false">取 消</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "payment_method",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          //分页
          total:5,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          dialog:false,//字段定义的显示和隐藏
          dialog_check:false,//字段自定义的查看显示与隐藏
          income_list:[],//票据种类
          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新
          param :{},//新增入账代码里的内容

          //  入账代码的内容
          model_name :'',//模型名称
          collection_name:'',//模型英文名称
          code:'',//付款代码
          desc:'',//中文描述
          desc_en:'',//英文描述
          is_sys:'',//是否系统码
          is_group:'',//是否集团码
          is_halt:'',//是否停用

          //筛选条件
          is_syss:false,//是否系统码
          is_groups:false,//是否集团码
          is_halts:false,//是否停用

         // 字段自定义
          options: [{
            value: 'str',
            label: '字符串'
          }, {
            value: 'list',
            label: '数组'
          }, {
            value: 'dict',
            label: '字典/对象'
          }, {
            value: 'int',
            label: '整数'
          }, {
            value: 'Decimal',
            label: '高精度数字'
          },
          ],

          model_id:'',
          total_fields:1,//total
          p_fields:10,//每页展示
          segment_list:[],//获取字段自定义
          not_null: '1',//是否为空
          field_name:'',//字段名称
          field_type:'',//字段类型
          field_desc:'',//字段说明




        }
      },
      created:function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        that.enter_code();//获取付款方式
      },
      methods: {
        //封装错误信息
        error_message(msg){
          this.$message.error('错了哦，错误消息为'+msg);
        },
        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.Edite_false=true;
          that.param = {
            model_name :'',//模型名称
            // collection_name:'',//模型英文名称
            code:'',//付款代码
            desc:'',//中文描述
            desc_en:'',//英文描述


          }
            that.is_sys='',//是否系统码
            that.is_group="",//是否集团码
            that.is_halt=''//是否停用

        },
        //用来刷新字段定义的数据刷新
        empty(srow,index, list){
          let  that = this;
          console.log(srow,index,list);
          that.model_id=srow;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            field_name :'',//字段名称
            field_desc:'',//字段说明
          }
             that.not_null='1'//是否为空
            that.field_type=''//字段类型

        },
        //筛选条件--是否集团码
        screen(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_mode/info_list",
            method: "post",
            data:{
              is_group:that.is_groups?1:0,
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        //筛选条件--是否系统码
        screen_sys(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_mode/info_list",
            method: "post",
            data:{
              is_sys:that.is_syss?1:0,
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        //筛选条件--是否停用
        screen_halt(){
          let that=this

          that.$axios({
            url: that.api+"/v1/finance/pay_mode/info_list",
            method: "post",
            data:{
              is_halt:that.is_halts?1:0
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(that.is_halts);
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },

        //获取付款方式
        enter_code(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/pay_mode/info_list",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.income_list=res.data.data.list
                that.total=res.data.data.total_count;
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/finance/incoming_account_code/info_list",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // that.income_list=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
        //  点击删除
        cancel(id,index,list){
          console.log(id);
          console.log(index);
          console.log(list);
          let that = this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            that.$axios({
              url:""+that.api+"/v1/finance/pay_mode/remove/"+id,
              method: "get",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  that.enter_code();
                }

              })
              .catch(error=>{
                console.log(error);
              })

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //点击修改
        amend(srow,id,index,list){
          let that = this;
          that.Edite = true;
          that.Edite_false=false;
          that.id=id;
          console.log(srow);
          //  付款方式
             that.param.model_name=srow.model_name, //模型名称
               // that.param.collection_name=srow.collection_name,//模型英文名称
            that.param.code=srow.code,//code
            that.param.desc=srow.desc,//中文描述
            that.param.desc_en=srow.desc_en,//英文描述
            that.is_sys=srow.is_sys +"",//是否系统码
            that.is_group=srow.is_group+"",//是否集团码
            that.is_halt=srow.is_halt +""//是否停用


        },
        //点击付款方式新增和修改后的保存
        ensure(){
          let that=this;
          if(!that.param.model_name ||!that.param.code ||!that.is_sys ||!that.is_group ||!that.is_halt){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ? (that.api + "/v1/finance/pay_mode/update/" + that.id) : (that.api + "/v1/finance/pay_mode/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                //  入账代码的内容
                model_name: that.param.model_name,//模型名称
                code: that.param.code,//代码
                // collection_name :that.param.collection_name,//模型英文名称
                desc: that.param.desc,//中文描述
                desc_en: that.param.desc_en,//英文描述
                is_sys: that.is_sys + "",//是否系统码
                is_group: that.is_group + "",//是否集团码
                is_halt: that.is_halt + "",//是否停用

              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message == "success") {
                  that.enter_code();
                  that.dialogVisible = false;
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },

        /*
        * 字段自定义
        *
        * */
        //查看字段自定义的信息
        fields_list(id,index,list){
          let that=this
          console.log(id, index, list);
          that.model_id=id;
          that.$axios({
            url: that.api+"/v1/finance/pay_mode/get_fields",
            method: "post",
            data:{
              model_id:that.model_id,
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data)
                that.segment_list=res.data.data.list
                that.total_fields=res.data.data.total_count;
              }
              else{
                // that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });
        },

        //点击修改字段自定义
        recompose(srow,id,index,list){
          let that = this;
          that.Edite = true;
          that.id=id;
          console.log(srow);
            that.param. field_name=srow.field_name, //字段名称
            that.field_type=srow.field_type,//字段类型
            that.param.field_desc=srow.field_desc,//字段说明
            that.not_null=srow.not_null +""//是否可以为空

        },
        //点击字段定义的新增和修改后的保存
        augment(){
          let that=this;
          if(!that.param.field_name || !that.field_type ||!that.param.field_desc ){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ? (that.api + "/v1/finance/pay_mode/update_field/" + that.id) : (that.api + "/v1/finance/pay_mode/add_field");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                //  入账代码的内容
                model_id: that.model_id,
                field_name: that.param.field_name,//字段名称
                field_type: that.field_type,//字段类型
                field_desc: that.param.field_desc,//字段说明
                not_null: that.not_null + "",//是否可以为空

              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message == "success") {
                  that.dialog = false;
                  //刷新修改后的数据
                  that.$axios({
                    url: that.api + "/v1/finance/pay_mode/get_fields",
                    method: "post",
                    data: {
                      model_id: that.model_id,
                    },
                    headers: {
                      authorization: sessionStorage.getItem("authorization"),
                    }
                  })
                    .then(res => {
                      if (res.data.message == "success") {
                        console.log(res.data.data)
                        that.segment_list = res.data.data.list
                        that.total = res.data.data.total_count;
                        that.dialog = false;
                      }
                      else {
                        // that.error_message(res.data.message)
                      }

                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        //点击字段自定义的删除
        expurgate(id,index,list){
          console.log(id, index, list);
          let that = this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            that.$axios({
              url:that.api+"/v1/finance/bill_type/remove_field/"+id,
              method: "post",
              data:{
                model_id:that.model_id,
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  //刷新修改后的数据
                  that.$axios({
                    url: that.api+"/v1/finance/pay_mode/get_fields",
                    method: "post",
                    data:{
                      model_id:that.model_id,
                    }
                  })
                    .then(res=>{
                      if (res.data.message=="success"){
                        console.log(res.data.data)
                        that.segment_list=res.data.data.list
                        that.total=res.data.data.total_count;
                      }
                      else{
                        // that.error_message(res.data.message)
                      }

                    })
                    .catch(error=>{
                      console.log(error);
                    });
                }

              })
              .catch(error=>{
                console.log(error);
              })

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //点击分页上的页数
        handleCurrentCe(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/finance/pay_mode/get_fields",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.p_fields
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // that.income_list=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },

        //修改页面的显示和隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        /**
         * @hintInfo 操作提示信息
         * @param hint  成功提示
         * @param info 警告信息
         */
        hintInfo: function(hint, info) {
          let that = this;
          if(hint === "success") {
            that.$message({
              message: info,
              type: 'success'
            });
          } else if(hint === "warning") {
            that.$message({
              message: info,
              type: 'warning'
            });
          } else {
            this.$message.error('出错了！');
          }
        },
      }
    }
</script>

<style lang="less" scoped>
  .payment_method{
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow: hidden;
    .title{
      margin-top: 23px;
      min-width:1200px ;
      li{
        display: inline-block;
        margin-left: 10px;
        button{
          width:80px;
          height:30px;
          background:rgba(68,136,233,1);
          border: none;
          border-radius:4px;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .shopping{
      /*margin-top: 20px;*/
      .shopping_title{
        li{
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .dialog_style{
      overflow: hidden;
      li{
        float: left;
        width: 50%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          width: 110px;
        }
      }
    }
  }
</style>
<style>
/*  .el-table--border::after, .el-table--group::after, .el-table::before{
    z-index: 0;
  }*/
</style>
