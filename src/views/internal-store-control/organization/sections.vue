<template>
  <div class="sections">
    <p style="margin-top: 15px;margin-left: 32px;font-size: 16px;font-weight: bold">部门信息</p>
    <div class="title">
      <div class="titleSearch">
        <span >部门名称:</span>
        <el-input v-model="input" placeholder="请输入内容" style="width: 217px"></el-input>
      </div>
      <div class="state">
        <span>状态：</span>
        <el-radio v-model="normal" label="0">正常</el-radio>
        <el-radio v-model="normal" label="1">停用</el-radio>
        <button @click="find">查找</button>
      </div>
      <!--模块列表-->
      <el-table
        :data="section"
        size="mini"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 97%;margin-top: 26px">
        <el-table-column
          prop="name"
          label="部门名称">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="中文描述">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          width="120"
          label="英文描述">
        </el-table-column>
        <el-table-column
          prop="parent_id.name"
          label="上级部门">
        </el-table-column>
        <el-table-column
          prop="audit"
          label="部门状态">
          <template slot-scope="scope">
            <span v-if="scope.row.audit ===0">停用</span>
            <span v-else>正常</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="attr"
          width="130"
          label="是否营业部门">
          <template slot-scope="scope">
            <span v-if="scope.row.attr ===0">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="hotel_id.short_name"
          label="所属酒店">
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
          prop="modify_user.user_name"
          label="修改人">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          width="150"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="address"
          width="150"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row.id,scope.$index, section)"type="danger" size="mini">删除</el-button>
            <el-button  size="mini" @click="submit(scope.row,scope.row.id,scope.$index, section)">修改</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;margin-right: 4%"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>

    <div class="department" v-show="department">
      <div class="message">
        <p>部门信息</p>
        <ul>
          <li>
            <span style="margin-left: 10px">所属酒店</span>
            <!--<el-select v-model="department_hotel " placeholder="请选择酒店"   style="width: 217px" :disabled="true" clearable ></el-select>-->
            <el-input v-model="department_hotel " placeholder="请输入内容" style="width: 217px" :disabled="true"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>部门名称：</span>
            <el-input v-model="department_name " placeholder="请输入内容" style="width: 217px"></el-input></li>
          <li>
            <span style="margin-left: 10px">上级部门：</span>
            <el-input v-model="superior_department " placeholder="请输入内容" style="width: 217px" :disabled="true"></el-input></li>

          <li style="height: 46px;line-height: 46px">
            <i style="color: red;font-size: 18px">*</i>
          <span>审核状态：</span>
          <el-radio v-model="radio" label="1">已通过</el-radio>
          <el-radio v-model="radio" label="0">未通过</el-radio>
        </li>
          <li style="height: 46px;line-height: 46px">
            <i style="color: red;font-size: 18px">*</i>
            <span>是否营业部门：</span>
            <el-radio v-model="attr" label="1">是</el-radio>
            <el-radio v-model="attr" label="0">否</el-radio>
          </li>
          <li>
            <span style="margin-left: 10px">中文描述：</span>
            <el-input v-model="chinese_name " placeholder="请输入内容" style="width: 217px"></el-input></li>
          <li>
            <span style="margin-left: 10px">英文描述：</span>
            <el-input v-model="english_name " placeholder="请输入内容" style="width: 217px"></el-input></li>
          <li>
            <button @click="hotel_save">保存</button>
            <button style="margin-left: 30px" @click="cancel">取消</button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import eventVue from './eventVue'
    export default {
        // name: "sections",
      data(){
        return{
          api:'http://47.98.113.173:9519',
          amend:true,
          save:true,
          input:'',
          checked:false,
          pagesize:10, //代表每页显示的条数
          total:10,//总条数
          section:[],//获取后台传递的部门数据
          authorization_token:'',//token值
          normal:"0",
          department_hotel:'',//选择的酒店
          department:false,//部门修改的显示隐藏
          id:'',//修改部门所需的id
          superior_department_id:'',//上级部门的id
          //  部门信息
          hotelid:'',//所点击的酒店id
          // hotel_id_name:'',//所属酒店
          department_name:'',//部门名称
          superior_department:'',//上级部门
          radio:1,//审核状态
          chinese_name:'',//中文备注
          english_name:'',//英文备注
          name:'',
          attr:'',
        }
        },
      created:function () {
        let that=this;
        that.hotelid=parseInt(sessionStorage.getItem('branch_id'));
        console.log(that.hotelid);
        this.examine();

      },
      methods:{
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/common/dept/info_list",
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
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.section=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
        //点击查找
        find(){
          let that=this;
          if(that.normal===''|| that.input==='' ){
            that.hintInfo("warning", "请输入部门名称和状态")
          }else {
            if (that.input === '') {
              that.hintInfo("warning", "请输入部门名称")
            } else {
              if (that.normal === '') {
                that.hintInfo("warning", "请选择状态")
              } else {
                that.$axios({
                  url: that.api + "/v1/common/dept/info_list",
                  method: "post",
                  params: {
                    is_halt: parseInt(that.normal),
                    name: that.input,
                  },
                  headers: {
                    authorization: sessionStorage.getItem("authorization"),
                  }
                })
                  .then(res => {
                    if (res.data.message == "success") {
                      console.log(res);
                      that.normal = "0";
                      that.section = res.data.data.list
                      that.total = res.data.data.total_count;
                    }
                    else {
                      console.log(res.data.message);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            }
          }
        },
        //查看部门信息
        examine(){
          console.log(this.hotelid);
          this.$axios({
            url: this.api+"/v1/common/dept/info_list",
            method: "post",
            data:{
              hotel_group_id:sessionStorage.getItem("group"),
              hotel_id:this.hotelid,
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                this.section=res.data.data.list;


              }
              else{
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击修改部门
        submit(srow,id,index){
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===3 ) {
            this.department = true;
            console.log(srow);
            this.id = srow.id;
            this.hotelid = srow.hotel_id.id;//所点击的酒店id
            this.department_hotel = srow.hotel_id.short_name;//所属酒店
            this.department_name = srow.name;  //部门名称

            if (srow.parent_id) {
              this.superior_department = srow.parent_id.name;//上级部门
              this.superior_department_id = srow.parent_id.id;
            } else {
              this.superior_department = '';//上级部门
              this.superior_department_id = '';
            }
            if (srow.audit == 1) {
              this.radio = "1"//审核状态
            } else if (srow.audit == 0) {
              this.radio = "0"//审核状态
            }
            this.chinese_name = srow.desc;//中文备注
            this.english_name = srow.desc_en;//英文备注
            this.attr = srow.attr + "";
          }else {
            this.hintInfo("warning","您没有修改部门权限")
          }
        },

        //点击修改部门后的保存
        hotel_save(){
          let that=this;
          if(that.radio=="1"){
            that. radio=1//审核状态
          }else if(that.radio=="0"){
            that. radio=0//审核状态
          }
          that.$axios({
            "url": ""+that.api+"/v1/common/dept/update/"+that.id,
            "method": "post",
            data:{
              name:that.department_name,
              desc:that.chinese_name,
              desc_en:that.english_name,
              parent_id:that.superior_department_id,
              hotel_id:that.hotelid,
              audit:that.radio+'',
              attr:that.attr,
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }

          })
            .then(res => {
              if (res.data.message=="success"){
                that.department=false;
                console.log(res.config.data);
                that.examine();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },

        //点击删除部门
        remove(id,index,lists){
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===3 ) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              lists.splice(index, 1);
              this.$axios({
                url: "" + this.api + "/v1/common/dept/remove/" + id,
                method: "post",
                headers: {
                  authorization: sessionStorage.getItem("authorization"),
                }
              })
                .then(res => {
                  console.log(res.message)
                  if (res.data.message === "success")
                    this.examine();
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
          }else {
            this.hintInfo("warning","您没有删除部门权限")
          }
        },

        //点击取消
        cancel(){
           this.department=false;
        },
        //如果认证错误
        new_authorization(msg){
          let that=this;
          if(msg==="authorization invalid"){
            that.authorization()
          }
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

      },


    }
</script>

<style  lang="less" scoped>
  input{
    outline: none;
  }
  .sections{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .title{
      /*width: calc(100% - 120px);*/
      /*width: 100%;*/
      height: 40px;
      margin-top: 15px;
      font-size: 16px;
      margin-left: 30px;
      .titleSearch{
        position: relative;
        display: inline-block;
        .btn{
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 30px;
          background: #EEEEEEFF;
          display: inline-block;
        }
        .search{
          width: 300px;
          height: 30px;
          padding-left: 15px;
        }
      }


      .state{
        display: inline-block;
        margin-left: 56px;
        button{
          margin-left: 30px;
          outline: none;
          width: 90px;
          height: 40px;
          background:rgba(68,136,233,1);
          border-radius:4px;
          color: white;
          border: none;
        }
      }
      .contentTitle{
        /*width: calc(100% - 130px);*/
        height: 40px;
        background: #68819EFF;
        margin-top: 40px;
        /*margin: 0 104px  0  24px;*/
        line-height: 40px;
        display: flex;
        li{
          font-size:14px;
          font-family:Adobe Heiti Std R;
          font-weight:normal;
          color:rgba(255,255,255,1);
          flex-grow: 1;
          margin-left: 20px; ;
        }
      }
      .amend ,.save{
        /*width: calc(100% - 128px);*/
        height: 44px;
        line-height: 44px;
        background:	#EDEDED;
        margin-bottom: 7px;
        overflow: hidden;
        min-width: 926px;
        position: relative;
        div{
          position: absolute;
          top: 0px;
          right: 0;
          span{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(104,129,158,1);
          }
        }
      }
    }
     .department {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 9000;

      .message {
        width: 70%;
        height: 70%;
        background: white;
        margin-left: 20%;
        margin-top: 10%;
        p {
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          padding-top: 16px;
          margin-bottom: 10px;
          margin-left: 60px;
          font-weight: bold;
        }
        ul {
          overflow: hidden;
          margin-left: 60px;
          li {
            float: left;
            width: 480px;
            font-size: 16px;
            margin-bottom: 15px;
            span {
              width: 120px;
              display: inline-block;
              vertical-align: top;
            }

          }
          button {
            outline: none;
            width: 90px;
            height: 40px;
            background: rgba(68, 136, 233, 1);
            border-radius: 4px;
            color: white;
          }
        }
      }

    }
  }
</style>
