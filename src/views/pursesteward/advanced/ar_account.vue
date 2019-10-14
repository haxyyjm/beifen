<template>
  <div class="ar_account">
    <!--支付方式 -->
    <div class="shopping">
      <div  style="position: relative">
        <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">AR账户设置</span>
        <el-button type="text" @click="dialogVisible = true;flush()">
          <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
        </el-button>
        <div style="position: absolute;top: 18px;left: 200px">
          <el-checkbox v-model="is_groups"  @change="screen">是否永久账户</el-checkbox>
          <el-checkbox v-model="is_halts" @change="screen_halt">是否停用</el-checkbox>
        </div>
      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="ar_no"
            label="账户代码">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="ar_category"-->
            <!--label="账户分类">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="is_permanent"
            width="150"
            label="是否永久账户">
            <template slot-scope="scope">
              <span v-if="scope.row.is_permanent === 0">否</span>
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
          <!--<el-table-column-->
            <!--prop="posting_flag"-->
            <!--label="结账周期">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="reminder_msg"-->
            <!--label="催账文字">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="msg_num"
            label="催账次数">
          </el-table-column>
          <el-table-column
            prop="reference_id"
            label="档案编号">
          </el-table-column>
          <el-table-column
            prop="ar_status"
            label="账户状态">
            <template slot-scope="scope">
              <span v-if="scope.row.ar_status === 0">有效</span>
              <span v-else-if="scope.row.ar_status === 1">结清账户</span>
              <span v-else-if="scope.row.ar_status === 2">限制使用账户</span>
              <span v-else-if="scope.row.ar_status === 3">黑名单账户</span>
              <span v-else>异常</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="credit_limit"
            label="信用限额">
          </el-table-column>
          <el-table-column
            prop="guarantor_type"
            label="担保类型">
            <template slot-scope="scope">
              <span v-if="scope.row.guarantor_type === 0">宾客</span>
              <span v-else-if="scope.row.guarantor_type === 1">团队</span>
              <span v-else-if="scope.row.guarantor_type === 2">协议公司</span>
              <span v-else-if="scope.row.guarantor_type === 3">黑名单账户</span>
              <span v-else>异常</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="guarantor"
            label="担保人">
          </el-table-column>
          <el-table-column
            prop="sales_id.real_name"
            label="销售员">
          </el-table-column>
          <el-table-column
            prop="charge_need_pay"
            label="未结帐单">
          </el-table-column>
          <el-table-column
            prop="pay_after_last_close "
            label="未结付款">
          </el-table-column>
          <el-table-column
            prop="halt_date"
            width="150"
            label="停用日期">
          </el-table-column>
          <el-table-column
            prop="halt_user"
            label="停用人">
          </el-table-column>
          <el-table-column
            prop="reference_type"
            label="客户类型">
            <template slot-scope="scope">
              <span v-if="scope.row.reference_type === 0">协议公司</span>
              <span v-else-if="scope.row.reference_type === 1">客人</span>
              <span v-else-if="scope.row.reference_type === 2">团队</span>
              <span v-else>临时客帐</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_user.user_name"
            label="创建人">
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
            prop="modify_user.user_name"
            label="修改用户">
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
        width="60%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>账户代码 ：</span>
            <el-input v-model="param.ar_no" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <!--<li>-->
            <!--<span>账户分类 ：</span>-->
            <!--<el-select v-model="app_id" placeholder="请选择" style="width: 200px;">-->
              <!--<el-option-->
                <!--v-for="item in app_list"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</li>-->

          <!--<li>-->
            <!--<span>结账周期 ：</span>-->
            <!--<el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;"></el-input>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span>催账文字 ：</span>-->
            <!--<el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;"></el-input>-->
          <!--</li>-->


          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>信用限额 ：</span>
            <el-input v-model="param.credit_limit" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>客户类型 ：</span>
            <el-select v-model="reference_type" placeholder="请选择" style="width: 200px;" @change="options_type"  clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>档案编号 ：</span>
            <el-select v-model="reference_id" placeholder="请选择" style="width: 200px;" clearable>
              <el-option
                v-for="item in file_number"
                :key="item.value"
                :label="item.id"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>担保类型 ：</span>
            <el-select v-model="guarantor_type" placeholder="请选择" style="width: 200px;" @change="assure_type" clearable>
              <el-option
                v-for="item in assure"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>

          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>担保人 ：</span>
            <el-select v-model="guarantor" filterable placeholder="请选择" style="width: 200px;" clearable>
              <el-option
                v-for="item in bondsman"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>销售员 ：</span>
            <el-select v-model="sales_id" placeholder="请选择" style="width: 200px;" clearable>
              <el-option
                v-for="item in bonds_list"
                :key="item.value"
                :label="item.real_name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否永久账户 ：</span>
            <el-radio v-model="is_permanent" label="1">是</el-radio>
            <el-radio v-model="is_permanent" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否停用 ：</span>
            <el-radio v-model="is_halt" label="1">是</el-radio>
            <el-radio v-model="is_halt" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>账户状态 ：</span>
            <el-select v-model="ar_status" placeholder="请选择" style="width: 200px;" clearable>
              <el-option
                v-for="item in condition"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </li>

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ar_account",
      data() {
        return {
          api:"http://47.98.113.173:9519",
          //分页
          total:10,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          income_list:[],//AR账户列表
          //客户类型
          options: [
            {
            id : 0,
            label: '协议公司'
          }, {
              id: 1,
            label: '客人'
          }, {
              id: 2,
              label: '团队'
            }
            , {
              id: 3,
              label: '临时客帐'
            }
          ],
          //担保类型
          assure: [
            {
              id: 0,
              label: '宾客'
            }, {
              id: 1,
              label: '团队'
            }, {
              id: 2,
              label: '协议公司'
            }, {
              id: 3,
              label: '员工'
            }
          ],

          //状态
          condition:[
            {
              id: 0,
              label: '有效'
            }, {
              id: 1,
              label: '结清账户'
            }, {
              id: 2,
              label: '限制使用账户'
            }, {
              id: 3,
              label: '黑名单账户'
            }
            , {
              id: 4,
              label: '异常'
            }
          ],

          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新
          bonds_list:[],//销售员
          param :{},//新增入账代码里的内容

          //  账户设置的内容
          ar_no:'', //账户代码
          reference_id:'',//档案编号
          credit_limit:'',//信用限额
          sales_id:'',//销售员
          guarantor:'',//担保人
          reference_type:'',//客户类型
          guarantor_type:'',//担保类型
          ar_status :'',//账户状态
          is_permanent:0,//是否永久账户
          is_halt:0,//是否停用
          //筛选条件
          is_groups:false,//是否集团码
          is_halts:false,//是否停用

         /*
         * 客户类型选择
         * */
          file_number:[],//档案编号后台获取
          url_api:'',//请求档案编号的url

          /*
          * 担保类型
          *
          * */

          bondsman:[], //担保人后台获取
          assure_api:'',
          dataarr : [],

        }
      },
      created:function () {
        let that = this;
        that.enter_code();//获取AR账户设置
        that.employ();//获取销售人员
        // that.employee();//获取担保人
      },
      methods: {
        //封装错误信息
        error_message(msg){
          this.$message.error('错了哦，错误消息为'+msg);
        },
        //封装获取人员列表
        employee(){
          let that = this;
          that.$axios({
            url: that.api+"/v1/common/employee/info_list",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message === "success"){
                that.bondsman=res.data.data.list;
                that.dataarr = that.bondsman.map((res,index)=>{
                     return {
                       name : res.real_name,
                       id : res.id,
                     }
                })
                console.info(that.dataarr);
                that.bondsman = that.dataarr;
                that.guarantor =that.bondsman[0].id
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取销售人员列表
        employ(){
          let that = this;
          that.$axios({
            url: that.api+"/v1/common/employee/info_list",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message === "success"){
                that.bonds_list=res.data.data.list;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {

            ar_no:'', //账户代码
            credit_limit:'',//信用限额


          }
             that.reference_type='',//客户类型
             that.reference_id='',//档案编号
             that.guarantor_type='',//担保类型
             that.guarantor='',//担保人
             that.sales_id='',//销售员
             that.ar_status='',//账户状态
            that.is_permanent="",//是否永久账户
            that.is_halt=''//是否停用

        },
        //筛选条件--是否永久账户
        screen(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/ar_account/info_list",
            method: "post",
            data:{
              is_permanent:that.is_groups?1:0,
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
            url: that.api+"/v1/finance/ar_account/info_list",
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

        //封装获取AR账户设置
        enter_code(){
          let that=this
          that.$axios({
            url: that.api+"/v1/finance/ar_account/info_list",
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
            url:that.api+"/v1/finance/ar_account/info_list",
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
              url:""+that.api+"/v1/finance/ar_account/remove/"+id,
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
          that.id=id;
          console.log(srow);
          //  账户设置的内容
            that.param.ar_no=srow.ar_no, //账户代码
            that.reference_id=srow.reference_id,//档案编号
            that.param.credit_limit=srow.credit_limit,//信用限额
            that.sales_id=srow.sales_id.id,//销售员
            that.guarantor=srow.guarantor,//担保人
            that.reference_type=srow.reference_type,//客户类型
            that.guarantor_type=srow.guarantor_type,//担保类型
            that.ar_status =srow.ar_status,//账户状态
            that.is_permanent=srow.is_permanent+"",//是否永久账户
            that.is_halt=srow.is_halt+""//是否停用


        },
        //点击入账代码新增和修改后的保存
        ensure(){
          let that=this;
          if(that.param.ar_no===''||that.param.credit_limit===''||that.reference_type===''||that.reference_id===''||that.guarantor_type===''
          ||that.guarantor===''||that.sales_id===''||that.is_permanent===''||that.is_halt===''||that.ar_status===''
          ){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ? ("" + that.api + "/v1/finance/ar_account/update/" + that.id) : ("" + that.api + "/v1/finance/ar_account/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                //  入账代码的内容
                ar_no: that.param.ar_no, //账户代码
                reference_id: that.reference_id,//档案编号
                credit_limit: that.param.credit_limit,//信用限额
                sales_id: that.sales_id,//销售员
                guarantor: that.guarantor,//担保人
                reference_type: that.reference_type,//客户类型
                guarantor_type: that.guarantor_type,//担保类型
                ar_status: that.ar_status,//账户状态
                is_permanent: that.is_permanent + "",//是否永久账户
                is_halt: that.is_halt + ""//是否停用
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
       * 客户类型
       * */
        //options_type  客户类型的选择
        options_type(value){
          let that= this;
          console.log(value);
          if(value===0){
            that.url_api = 'http://47.98.113.173:9102/v1/customer/company/get_company_base_list/';
            that.archives_type();//获取档案编号
          }else if(value===1){
            that.url_api = 'http://47.98.113.173:9102/v1/customer/guest/get_guest_base_list/';
            that.archives_type();//获取档案编号
          }else if(value===2){
            that.url_api = 'http://47.98.113.173:9102/v1/customer/team/get_team_base_list/';
            that.archives_type();//获取档案编号
          }else{
            that.url_api = '';
            that.full_name=''
          }
        },
        //获取档案编号
        archives_type(){
          let that=this
          that.$axios({
            url:that.url_api,
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data.results)
                that.file_number=res.data.data.results
                if(res.data.data.count!==0){
                  that.reference_id = res.data.data.results[0].id
                }else {
                  that.reference_id=''
                }
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            });

        },
        /*
        * 担保类型
        *
        * */
        //担保类型的选择
        assure_type(value){
          let that= this;
          console.log(value);
          if(value === 0){
            //宾客信息的api
            that.assure_api = 'http://47.98.113.173:9102/v1/customer/guest/get_guest_base_list/';
            that.archives_number();//获取担保人

          }else if(value === 1){
            //团队信息到的api
            that.assure_api = 'http://47.98.113.173:9102/v1/customer/team/get_team_base_list/';
            that.archives_number();//获取担保人
          }else if(value === 2){
            //协议单位的api
            that.assure_api = 'http://47.98.113.173:9102/v1/customer/company/get_company_base_list/';
            that.archives_number();//获取担保人
          }else if(value === 3){
            //员工的api
            that.employee()
            // that.archives_number();//获取担保人
          }

        },
        //获取担保人
        archives_number(){
          let that=this
          that.$axios({
            url:that.assure_api,
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.data.results)
                that.bondsman = res.data.data.results;
                if(res.data.data.count!==0){
                  that.guarantor = res.data.data.results[0].id;
                }else {
                  that.guarantor=''
                }
              }
              else{
                that.error_message(res.data.message)
              }

            })
            .catch(error=>{
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
  .ar_account{
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
