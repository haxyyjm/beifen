<template>
  <div class="checking_in">
    <!--支付方式 -->
    <div class="shopping">
      <div class="head" style="width: 100%;height: 40px;margin-top: 10px">
        <span style="vertical-align: top;display: inline-block;margin-left: 10px;margin-top: 4px">班次设置列表</span>
        <el-button type="primary" @click="dialogVisible = true;flush()" class="btn"  :disabled="isDisabled" style="width: 80px;height: 32px;line-height: 2px"  data-code="/v1/manage/duty_shift/add">
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="margin-top: 18px">-->
          新增
        </el-button>
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
          <el-table-column
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="code"
            label="班次代码">
          </el-table-column>
          <el-table-column
            prop="desc_cn"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="days_per_week"
            width="110"
            label="每周工作天数">
          </el-table-column>
          <el-table-column
            prop="dept_id.name"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="start_time"
            width="120"
            label="起始时间">
          </el-table-column>
          <el-table-column
            prop="end_time"
            width="120"
            label="终止时间">
          </el-table-column>
          <el-table-column
            prop="time_continuous"
            width="130"
            label="工作时间是否连续">
            <template slot-scope="scope">
              <span v-if="scope.row.time_continuous === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="rest_period_remark"
            width="100"
            label="休息时段说明">
            <template slot-scope="scope">
              <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.rest_period_remark}}</el-tag>
            </template>
          </el-table-column>

          <!--休息时段说明-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="休息时段说明 : ">
                  <span>{{ props.row.rest_period_remark }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>

          <!--<el-table-column-->
            <!--prop="salary_type"-->
            <!--label="计薪方式">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="salary_unit"
            label="计薪单位">
            <template slot-scope="scope">
              <span v-if="scope.row.salary_unit === 0">时</span>
              <span v-else-if="scope.row.salary_unit === 1">日</span>
              <span v-else-if="scope.row.salary_unit === 2">周</span>
              <span v-else-if="scope.row.salary_unit === 3">月</span>
              <span v-else>年</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="unit_salary"
            label="单位薪资">
          </el-table-column>
          <el-table-column
            prop="create_date"
            width="120"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="create_user.user_name"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="modify_date"
            width="120"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="modify_user.user_name"
            label="修改人">
          </el-table-column>

          <el-table-column
            prop="address"
            width="150 "
            fixed="right"
            label="操作">
            <template slot-scope="scope" >
              <el-button  :disabled="show_hide_delete"   size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>
              <el-button   :disabled="show_hide_update" size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>
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
        title=""
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>班次代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 220px;"></el-input>
          </li>

          <li>
            <span  style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc_cn" placeholder="请输入内容" style="width: 220px;"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述 ：</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 220px;"></el-input>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>每周工作天数 ：</span>
            <!--<el-input v-model="param.in_or_out" placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <el-select v-model="days_per_week" placeholder="请选择" style="width: 220px;">
              <el-option
                v-for="item in in_out"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>所属部门 ：</span>
            <el-select v-model="dept_id" placeholder="请选择" style="width: 220px;">
              <el-option
                v-for="item in dept_list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <!--<li>-->
            <!--<span>计薪方式 ：</span>-->
            <!--<el-select v-model="salary_type" multiple placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in paid"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</li>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>起始时间 ：</span>
            <el-time-picker
              v-model="start_time"
              value-format="HH:mm:ss"
              placeholder="选择时间范围">
            </el-time-picker>


          </li>

          <li >
            <i style="color: red;font-size: 18px">*</i>
            <span>终止时间 ：</span>
            <el-time-picker
              v-model="end_time"
              value-format="HH:mm:ss"
              @focus="autofocus"
              placeholder="任意时间点">
            </el-time-picker>
            <!--<span v-show="tips">终止时间要大于起始时间</span>-->
            <!--<el-button type="danger"  v-show="tips">起始时间不能为空</el-button>-->
            <!--<el-button type="danger_err"  v-show="tips">终止时间要大于起始时间</el-button>-->
          </li>


          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>计薪单位 ：</span>
            <el-select v-model="salary_unit" placeholder="请选择" style="width: 220px;">
              <el-option
                v-for="item in paid_way"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>单位薪资 ：</span>
            <el-input v-model="param.unit_salary" placeholder="请输入内容" style="width: 220px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>工作时间是否连续 ：</span>
            <el-radio v-model="time_continuous" label="1">是</el-radio>
            <el-radio v-model="time_continuous" label="0">否</el-radio>
          </li>
          <li>
            <span style="margin-left: 10px">休息时段说明 ：</span>
            <textarea style="width: 220px; height: 100px;resize: none;vertical-align: top" v-model="param.rest_period_remark"></textarea>
          </li>

          <!--<li>-->
            <!--<input class="pub_textAlign_right" placeholder="例如，${memoDate }" type="text" name="preLiveInDate" id="preLiveInDate" maxlength="50" readonly="readonly">-->
            <!--<input class="pub_textAlign_right" placeholder="（长期入住可不填）" type="text" name="preLeaveOutDate" id="preLeaveOutDate" maxlength="50" readonly="readonly">-->

          <!--</li>-->

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
    name: "checking_in",
    data() {
      return {
        api:"http://47.98.113.173:9503",
        //分页
        total:10,
        pagesize:10,
        dialogVisible: false,//修改页面的显示和隐藏
        //收支
        in_out:[
          {
            value:'7',
            label: '七 天'
          }, {
            value:'6',
            label: '六 天'
          },
          {
            value:'5',
            label: '五 天'
          },
          {
            value:'4',
            label: '四 天'
          },
          {
            value:'3',
            label: '三 天'
          },
          {
            value:'2',
            label: '二 天'
          },
          {
            value:'1',
            label: '一 天'
          },

        ],
        //计薪单位
        paid:[
          {
            value:'0',
            label: '小时'
          },
          {
            value:'1',
            label: '月'
          },
          {
            value:'2',
            label: '其它'
          }

        ],
        //计薪方式
        paid_way:[
          {
            value:'0',
            label: '时'
          },
          {
            value:'1',
            label: '日'
          },
          {
            value:'2',
            label: '周'
          },
          {
            value:'3',
            label: '月'
          },
          {
            value:'4',
            label: '年'
          },
        ],
        income_list:[],//班次设置列表
        dept_list:[],//部门
        id:"",//选中修改项的id
        Edite : true, //标志位 判断的是新增还是更新
        tips:false,
        param :{},//新增入账代码里的内容

        //  入账代码的内容
        code:'',//班次代码
        desc_cn:'',//中文描述
        desc_en:'',//英文描述
        days_per_week:'',//每周工作天数
        dept_id:'',//归属部门
        start_time:'',//起始时间
        end_time:'',//终止时间
        time_continuous:0,//工作时间是否连续
        rest_period_remark:'',//休息时段说明
        salary_type:'',//计薪方式ID
        salary_unit:'',//计薪单位
        unit_salary:'', //单位薪资

        create_time:'',//创建时间
        create_user:'',//创建用户
        modify_time:'',//修改时间
        modify_user :"",//修改用户
        man_list:[],//先接收后台的值，然后添加自定义属性
        show_hide_delete:false,//判断删除按钮是否显示
        show_hide_update:false,//判断修改按钮是否显示
        isDisabled:false,//新增是否显示

      }
    },
    created:function () {
      let that = this;
      // that.authorization = sessionStorage.getItem("authorization");
      that.enter_code();//获取入账代码
      that. examine();
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
        that.param = {
          desc_cn:'',//中文描述
          desc_en:'',//英文描述
          code:'',//代码
          create_time:'',//创建时间
          create_user:'',//创建用户
          modify_time:'',//修改时间
          modify_user :"",//修改用户
          rest_period_remark:'',//休息时段说明
          unit_salary:'', //单位薪资
        }

          that.days_per_week='',//每周工作天数
          that.dept_id='',//归属部门
          that.start_time='',//起始时间
          that.end_time='',//终止时间
          that.time_continuous='',//工作时间是否连续
          // that.salary_type='',//计薪方式ID
          that.salary_unit=''//计薪单位
      },
      //查看部门信息
      examine(){
        let that = this;
        that.$axios({
          url: "http://47.98.113.173:9519/v1/common/dept/info_list",
          method: "post",
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res => {
            if (res.data.message=="success"){
              console.log(res.data);
              that.dept_list=res.data.data.list;


            }
            else{
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取班次设置列表
      enter_code(){
        let that=this
        that.$axios({
          url: ""+that.api+"/v1/manage/duty_shift/hotel_shifts",
          method: "get",
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res=>{
            console.log(res.data.message)
            if (res.data.message=="success"){
              console.log(res.data.data)
              this.man_list=res.data.data.list;
              let  keys =JSON.parse(sessionStorage.getItem("rules"))  ;//反序列化取出存储的序列化对象
              console.log(JSON.stringify(keys));
              if(JSON.stringify(keys) !== "{}" && keys !==null){
                let page_path = "/#"+this.$route.path;
                let keys_path = keys[page_path];
                console.log(keys_path);
                let show_delete = keys_path["/v1/manage/duty_shift/delete"];
                let show_update = keys_path["/v1/manage/duty_shift/update"];
                for(let item of  this.man_list){
                  let  source = { show_hide_delete: show_delete, show_hide_update: show_update};
                  let returnedTarget = Object.assign(item, source);
                  // console.log( returnedTarget);
                  this.income_list.push(item);
                  console.log(this.income_list);
                  //取出需要的字段并赋值到data的字段里
                  for(let i in this.income_list){
                    if(this.income_list[i].show_hide_delete===1){
                      this.show_hide_delete=false;
                    }else {
                      this.show_hide_delete=true;
                    };
                    if(this.income_list[i].show_hide_update===1){
                      this.show_hide_update=false;
                    }else {
                      this.show_hide_update=true;
                    };


                  }
                }
              }
              else if(keys ===null){
                this.income_list=res.data.data.list;
              } else {
                this.income_list=res.data.data.list;
                this.show_hide_delete=true;//判断删除按钮是否显示
                this.show_hide_update=true;//判断修改按钮是否显示
                this.isDisabled=true;//新增是否显示
              }
              // that.income_list=res.data.data.list
              that.total=res.data.data.total_count;
              that.init_btn();
            }
            else{
              that.error_message(res.data.message)
              console.log(res.data.message);
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
          url: ""+that.api+"/v1/manage/duty_shift/hotel_shifts",
          method: "get",
          params:{
            page_num:curPage,
            page_size:that.pagesize
          },
          headers:{
            authorization:sessionStorage.getItem("authorization"),
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
            url:""+that.api+"/v1/manage/duty_shift/delete/"+id,
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
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
        that.id=srow.id;
        console.log(srow);
        //  入账代码的内容
          that.param.code=srow.code,
          that.param.desc_cn=srow.desc_cn,//中文描述
          that.param.desc_en=srow.desc_en,//英文描述:
          that.days_per_week=srow.days_per_week,//每周工作天数
          that.dept_id=srow.dept_id.id,//归属部门
          that.start_time=srow.start_time,//起始时间
          that.end_time=srow.end_time,//终止时间
          that.time_continuous=srow.time_continuous +"",//工作时间是否连续
          that.param.rest_period_remark=srow.rest_period_remark,//休息时段说明
          // that.salary_type=srow.salary_type,//计薪方式ID
          that.salary_unit=srow.salary_unit+"",//计薪单位
          that.param.unit_salary=srow.unit_salary //单位薪资


      },
      //点击入账代码新增和修改后的保存
      ensure(){
        let that=this;
        if(!that.param.code ||!that.days_per_week ||!that.dept_id ||!that.start_time || !that.end_time ||!that.time_continuous
         ||!that.salary_unit  ||!that.param.unit_salary
        ) {
          that.hintInfo("warning", "*为必填项")
        }else {
        let urldata = that.Edite ? (that.api+"/v1/manage/duty_shift/update/"+that.id) :  (""+that.api+"/v1/manage/duty_shift/add");
        console.info(urldata);
        that.$axios({
          url: urldata,
          method: "post",
          data:{
            //  入账代码的内容
            code:that.param.code,
            desc_cn:that.param.desc_cn,//中文描述
            desc_en:that.param.desc_en,//英文描述:
            days_per_week:that.days_per_week,//每周工作天数
            dept_id:that.dept_id,//归属部门
            start_time:that.start_time,//起始时间
            end_time:that.end_time,//终止时间
            time_continuous:parseInt(that.time_continuous),//工作时间是否连续
            rest_period_remark:that.param.rest_period_remark,//休息时段说明
            // salary_type:that.salary_type,//计薪方式ID
            salary_unit:that.salary_unit,//计薪单位
            unit_salary:that.param.unit_salary, //单位薪资
          },
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }

        })
          .then(res => {
            if (res.data.message=="success"){
              that.enter_code();
              that.dialogVisible = false;
            }
            else{
              that.error(res.data.message);
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
        }
      },

      //终止时间获取焦点
      autofocus(){
        let that = this;
        if(that.start_time ===''){
             that.tips=true;

        }else if (that.start_time !==''){
          that.tips=false;
        }
        else if(that.start_time>that.end_time){
          that.tips=true;
        }

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
      /**
       * 给静态按钮设置权限
       *
       * */

      init_btn: function(){
        let that = this;
        let keys =JSON.parse(sessionStorage.getItem("rules"))  ;//反序列化取出存储的序列化对象
        let page_path = "/#"+that.$route.path;
        let keys_path = keys[page_path];
        console.log(keys_path)
        //取出所有按钮的code
        if(keys){
          let elementList = document.querySelectorAll(".btn");
          for(let item of elementList){
            Object.keys(keys_path).forEach(function(key){
              console.log(item.dataset.code,key);
              if(item.dataset.code===key){
                console.log(55);
                item.dataset.code=keys_path[key];
                console.log(item.dataset.code);
                that.isDisabled = parseInt(item.dataset.code);
                if(that.isDisabled===1){
                  that.isDisabled=false;
                }else {
                  that.isDisabled =true;
                }
              }

            });

          }
        }else{}
      },
    }

  }
</script>
<style lang="less" scoped>
  .checking_in{
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
          width: 130px;
        }
      }
    }
  }
</style>
<style>
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
    /*z-index: 0;*/
  /*}*/
</style>
