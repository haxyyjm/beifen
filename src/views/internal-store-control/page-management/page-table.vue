<template>
  <div class="page-table">
    <!--支付方式 -->
    <div class="shopping">
      <span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">页面设置</span>
      <el-button type="text" @click="dialogVisible = true;flush()">
        <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >
      </el-button>
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
            prop="name"
            label="页面名称">
          </el-table-column>
          <el-table-column
            prop="rule_groups"
            label="关联权限组">
            <template slot-scope="scope">
              <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.rule_groups}}</el-tag>
            </template>
          </el-table-column>
          <!--关联权限组-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="所关联的权限组 : ">
                  <span>{{ props.row.rule_groups }},</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>


          <el-table-column
            prop="url"
            label="页面地址">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="说明">
          </el-table-column>


          <el-table-column
            prop="address"
            width="240 "
            fixed="right"
            label="操作">
            <template slot-scope="scope" >
              <el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>
              <el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>
              <el-button   size="small" @click="compile(scope.row,scope.row.id,scope.$index, income_list)" >编辑权限</el-button>
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
            <span>页面名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 220px;"></el-input>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>页面地址 ：</span>
            <el-input v-model="param.url" placeholder="请输入内容" style="width: 220px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span style="vertical-align: top;">说明 ：</span>
            <textarea style="width: 220px; height: 100px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px" v-model="param.desc "></textarea>
          </li>

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>
             </span>
      </el-dialog>
      <!--编辑权限出现的页面-->
      <!--<el-dialog-->
        <!--title="编辑权限"-->
        <!--:visible.sync="dialogVisibleApi"-->
        <!--width="60%"-->
        <!--style="overflow: hidden"-->
        <!--:before-close="handleClose" class="dialog-style" >-->
        <!--&lt;!&ndash;<span style="display: inline-block;width: 290px;">可选择的API</span>&ndash;&gt;-->
        <!--<p style="display: inline-block;width: 228px;margin-bottom: 10px">编辑页面权限名称 ：<span style="color:#4488e9">{{authority}}</span></p>-->
        <!--<ul style="overflow: hidden">-->
          <!--<el-transfer-->
            <!--v-model="checkedNames"-->
            <!--style="float: left;"-->
            <!--:props="{key: 'id',label: 'name'}"-->
            <!--:titles="['页面未有权限组', '页面已添加权限组']"-->
            <!--@change="handleChange"-->
            <!--:data="bind_list"-->
          <!--&gt;</el-transfer>-->

        <!--</ul>-->

        <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="dialogVisibleApi = false ;">取 消</el-button>-->
          <!--<el-button type="primary" @click="dialogVisibleApi = false; saveInfo_api()">确 定</el-button>-->
        <!--</span>-->
      <!--</el-dialog>-->


      <el-dialog
        title="编辑权限"
        :visible.sync="dialogVisibleApi"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <p style="display: inline-block;width: 228px;margin-bottom: 10px">编辑页面权限名称 ：<span style="color:#4488e9">{{authority}}</span></p>
        <ul style="overflow: hidden">
          <el-transfer
            v-model="checkedNames"
            style="float: left;"
            :props="{key: 'id',label: 'name'}"
            :titles="['页面未有权限组', '页面已添加权限组']"
            @change="handleChange"
            :data="bind_list"
          ></el-transfer>

        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleApi = false ;">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleApi = false; saveInfo_api()">确 定</el-button>
        </span>
      </el-dialog>











    </div>
  </div>
</template>

<script>
    export default {
        name: "page-table",
      props:['branch_id'],
      watch:{
        //  父级传过来的部门id
        branch_id:function (newData,oldData) {
          this.branch_data=newData
          console.log(newData);
        }
      },
      data() {
        return {
          api:"http://47.98.113.173:9519",
          //分页
          total:5,
          pagesize:10,
          dialogVisible: false,//修改页面的显示和隐藏
          dialogVisibleApi:false,//编辑API显示隐藏
          api_list:[],//APi列表
          authority:'',//所选中的页面名字
          permission_id:'',//选择到的权限的id
          checkedNames:[],//选中的所有权限的id
          bind_list:[],//获取权限组
          income_list:[],//页面
          id:"",//选中修改项的id
          Edite : true, //标志位 判断的是新增还是更新
          param :{},//新增入账代码里的内容

          //  入账代码的内容
          name:'',//名字
          desc:'',//说明
          url:'',//地址


          create_time:'',//创建时间
          create_user:'',//创建用户
          modify_time:'',//修改时间
          modify_user :"",//修改用户



        }
      },
      created:function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        that.enter_code();//获取入账代码
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
            desc_cn:'',//说明
            name:'',//名字
            url:'',//地址

          }

        },
        //查看页面
        enter_code(){
          let that = this;
          that.$axios({
            url: that.api+"/v1/common/page/info_list",
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message==="success"){
                let pages = res.data.data.list;
                for(let page of pages){
                  let current_names = [];
                  for(let rule of page.rule_groups){
                    current_names.push(rule['name']);
                  }
                  //join() 方法用于把数组中的所有元素放入一个字符串。
                  let str = current_names.join(" ，");
                  page.rule_groups = str;
                }
                that.income_list=res.data.data.list;

               that.total=res.data.data.total_count;

              }
              else{
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
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
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },

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
              url:""+that.api+"/v1/common/page/remove/"+id,
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
            that.param.name=srow.name,//名字
            that.param.desc=srow.desc,//说明
            that.param.url=srow.url//地址:



        },
        //点击页面设置新增和修改后的保存
        ensure(){
          let that=this;
          if(!that.param.name || !that.param.desc ||!that.param.url){
            this.hintInfo("warning","*为必填项")
          }else {
          let urldata = that.Edite ? (that.api+"/v1/common/page/update/"+that.id) :  (""+that.api+"/v1/common/page/add");
          that.$axios({
            url: urldata,
            method: "post",
            data:{
              //  入账代码的内容
              name:that.param.name,
              desc:that.param.desc,//中文描述
              url:that.param.url,//url
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
        //编辑页面的穿梭框
        handleChange(value, direction, movedKeys) {
          let that = this;
          console.log(value);
          console.log(direction);
          console.log(movedKeys);//发生移动数据的数组
          //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
          if(direction === "right") {
            that.direction_tf="1";

          }
          if(direction === "left") {
            that.direction_tf="2";
          }


        },
        //点击编辑权限出现的页面
        compile(id,index){
          console.log(id);
          let that= this;
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2) {
          that.checkedNames=[];
          that.authority=id.name;
          that.permission_id=id.id;
          console.log( that.permission_id)
          that.rolePrivileges();
          that.bind_api();
          that.dialogVisibleApi = true;
          }else {
            this.hintInfo("warning","您没有此操作的权限")
          }

        },
        //封装获取权限组
        rolePrivileges(){
          let that = this;
          that.$axios({
            url: that.api+"/v1/common/rule_group/get_tree",
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.bind_list=res.data.data;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获得已有的权限
        bind_api(){
          let that = this;
          console.log(that.permission_id);
          that.$axios({
            url: that.api+"/v1/common/page/get_info/"+that.permission_id,
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.rule_groups);
                // 遍历拿到所需要权限
                res.data.data.rule_groups.forEach(item =>{
                  that.checkedNames.push(item.id)
                });
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //点击编辑权限后到的保存
        saveInfo_api(){
          console.log(this.checkedNames);
          let that=this;
          that.$axios({
            url: that.api+"/v1/common/page/bind_access_rules",
            method: "post",
            data:{
              page_id:that.permission_id,//所点击的id
              rule_group_ids :JSON.stringify(that.checkedNames),//选中的api
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
            //headers: {"authorization": that.authorization_token,}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.checkedNames=[];
                that. enter_code();
              }
              else{
                console.log(res.data.message);
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
  .page-table{
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
          width: 76px;
        }
      }
    }
  }
</style>
<style>
  .el-transfer-panel{
    width: 317px;
    margin-top: 10px;

  }
  .el-transfer-panel__list{
    height: 470px;
  }
  .el-transfer-panel__body {
    height: 470px;
  }
</style>
