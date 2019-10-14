<template>
  <div class="information">
    <p>模块信息</p>
    <div class="paging">
      <!--模块列表-->
      <el-table
        :data="newlists"
        fit
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        size="mini"
        >
        <el-table-column
          prop="name"
          fixed
          label="模块名称">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文描述">
        </el-table-column>
        <el-table-column
          prop="code"
          label="模块代码">
        </el-table-column>
        <el-table-column
          prop="root_id.name"
          label="模块种类">
        </el-table-column>
        <el-table-column
          prop="has_entry"
          width="90"
          label="模块类型">
          <!--父级传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.has_entry === 0">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="链接">
        </el-table-column>
        <el-table-column
          prop="creator.real_name"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="create_time"
          width="150"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="version"
          width="90"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="last_time"
          width="150"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="address"
          width="190"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="danger" size="mini" >删除</el-button>
            <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
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

    <!--点击加号出现编辑的页面-->
    <div class="masking" v-show="masking">
      <ul class="mask_information">
        <li><span >模块名称</span><el-input v-model="name" placeholder="请输入内容" style="width: 217px;"></el-input></li>
        <li><span >英文描述</span><el-input v-model="desc_en" placeholder="请输入内容" style="width: 217px;"></el-input></li>
        <li><span >模块代码</span><el-input v-model="code" placeholder="请输入内容" style="width: 217px;"></el-input></li>
        <li>
          <span >模块种类</span>
          <el-input v-model="input_kind"  style="width: 217px;" :disabled="true" ></el-input>
        </li>
        <li>
          <span >模块类型</span>
          <el-select v-model="has_entry" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li><span >链接</span><el-input v-model="url" placeholder="请输入内容" style="width: 217px;"></el-input></li>
        <!--<li><span >创建人</span><el-input v-model="creator" placeholder="请输入内容" style="width: 300px;"></el-input></li>-->
        <!--<li><span >创建时间</span><el-input v-model="create_time" placeholder="请输入内容" style="width: 300px;"></el-input></li>-->
        <li>
          <span >父级模块</span>
          <el-input v-model="input_father"  style="width: 217px;" :disabled="true" ></el-input>
        </li>
        <li><span >版本号</span><el-input v-model="input" placeholder="1.0" style="width: 217px;" :disabled="true" ></el-input></li>
        <!--<li><span >修改时间</span><el-input v-model="last_time" placeholder="请输入内容" style="width: 300px;"></el-input></li>-->

        <li style="margin-top:50px;"><button @click="preserve">保存</button> <button @click="abolish">取消</button></li>



      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        name: "module-information",
      data(){
          return{
            api:'http://47.98.113.173:9519',
            labelModel:'',
            masking:false,
            checked:false,//状态
            // 蒙版里的信息
            name:'',//模块名称
            desc_en:'',//英文描述
            code:'',//代码
            root_id:'',//模块种类
            has_entry:'',//模块类型
            url:'',//链接
            creator:'',//创建人
            create_time:'',//创建时间
            last_time:'',//修改时间
            parent_id:'',//父级模块
            id:'',//修改此项的id 传给后台
            pagesize:10, //代表每页显示的条数
            total:10,//代表总条数
            input_kind:'',//模块种类
            input_father:'',//父级模块

            options: [{
              value: '0',
              name: '无登陆入口'
            }, {
              value: '1',
              name: '有登录入口'
            },],
            value: '',
            input:'',
            newlists:[],
            newlists_info:[],
            branch_data:[],
          }
      },
      // //子组件接收父级传过来的值
      // props:{
      //   newlists:{type:Array,required:true},
      //   total:{type:Number,required:true},
      // },

      created:function(){
         let that = this;
         that.message_list();
      },
      // watch:{
      //   //  父级传过来的值
      //   newlists:function (newData,oldData) {
      //     this.branch_data=newData
      //     console.log(newData);
      //   }
      // },
      methods:{
        //点击蒙版里的取消
        abolish(){
            this.masking=false
            this.name='',
            this.desc_en='',
            this.code='',
            this.root_id='',
            this.has_entry='',
            this.url='',
            this.creator='',
            this.create_time='',
            this.last_time='',
            this.parent_id=''

        },
        //封装模块信息
        message_list(){
          let that= this;
          //获取信息列表
          that.$axios({
            "url": ""+that.api+"/v1/common/module/info_list",
            "method": "get",
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list;
                that.total=res.data.data.total_count;
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //点击保存以后向后台发送数据
        preserve(){
          if (this.has_entry=="有登录入口"){
            this.has_entry=1
          }else if(this.has_entry=="无登录入口"){
            this.has_entry=0
          };
          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:""+this.api+"/v1/common/module/update/"+this.id,
            method: "post",
            // params:{},
            data:{
              name:this.name,
              desc_en:this.desc_en,
              code:this.code,
              root_id:this.root_id,
              has_entry:this.has_entry,
              url:this.url,
              creator:this.creator.name,
              // create_time:this.create_time,
              // last_time:this.last_time,
              parent_id:this.parent_id
            },
            //headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
                this.message_list();
                this.masking=false;
              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },
        //点击修改
        submit: function (srow,id,index,list) {
          this.masking=true
          this.id=id;
          console.log(id);
          console.log(index);
          console.log(list);
          console.log(srow);
          this.name=srow.name;
          this.desc_en=srow.desc_en;
          this.code=srow.code;
          // this.root_id=srow.root_id;
          this.has_entry=srow.has_entry;
          this.url=srow.url;
          this.creator=srow.creator;
          this.versions=srow.versions;
           this.input_kind=srow.root_id.name;//模块种类
            // this.input_father=srow.parent_id;//父级模块
          if(!srow.parent_id){
            this.input_father=srow.parent_id;
          }else {
            this.input_father=srow.parent_id.name;
          };
          if(srow.has_entry==1){
            this.has_entry="有登录入口"
          }else  if(srow.has_entry==0){
            this.has_entry="无登录入口"
          }


        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            url: ""+that.api+"/v1/common/module/info_list",
            method: "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });


        },
        //点击删除按钮元素消失
          cancel(id,index,list){
          console.log(id);
          console.log(index);
          console.log(list);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            this.$axios({
              url:""+this.api+"/v1/common/module/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              //headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res.message)
                if(res.data.message==="success")
                // location.reload(); // 强制刷新
                this.message_list();
              })
              .catch(error=>{
                console.log(error);
              })



          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


        },

      }

    }

</script>

<style lang="less" scoped>
 .information{
   width:100% ;
   height: 100%;
   /*min-width: 860px;*/
   background:#eeeeee;
   p{
    display: inline-block;
     width:142px;
     height:35px;
     font-size:26px;
     font-family:Adobe Heiti Std R;
     font-weight:normal;
     color:rgba(51,51,51,1);
     line-height:24px;
     /*margin: 42px  0px 38px 22px;*/
     margin-top: 20px;
     margin-left: 22px;
   }
   .paging{
     width: 97%;
     height: 590px;
     overflow-y: scroll;
     margin-left: 1%;
     /*margin-top: 20px;*/
     overflow: hidden;
     background:rgba(255,255,255,1);

     .title{
       width: 100%;
       height: 40px;
       background: #68819EFF;
       /*margin: 0 104px  0  24px;*/
       margin-right: 104px;
       line-height: 40px;
       display: flex;

       /*min-width: 1140px;*/
       li{
         /*width: 100% ;*/
         font-size:14px;
         font-family:Adobe Heiti Std R;
         font-weight:normal;
         color:rgba(255,255,255,1);
         flex-grow: 1;
         margin-left: 20px; ;
       }
     }
     .amend ,.save{
       width: 100%;
       height: 44px;
       line-height: 44px;
       /*background:rgba(247,247,247,1);*/
       border-bottom: 1px solid #EDEDED;
       margin-bottom: 7px;
       position: relative;
       /*min-width: 1200px;*/
       input{
         width:101.7px;
         background:rgba(247,247,247,1);
         /*border: none;*/
         outline:none;
         text-align: center;
       }
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
   .state{
     width: calc(100% - 470px);
     display: inline-block;
     font-size:18px;
     margin-top: 42px;

   }
   .title{
     width: calc(100% - 50px);
     height: 40px;
     background: #68819EFF;
     /*margin: 0 104px  0  24px;*/
     margin-left: 24px;
     line-height: 40px;
     display: flex;
     min-width: 1200px;
     li{
       width: 102px;
       font-size:14px;
       font-family:Adobe Heiti Std R;
       font-weight:normal;
       color:rgba(255,255,255,1);
       text-align: center;
     }
   }
   .amend ,.save{
     width: calc(100% - 50px);
     min-width: 1200px;
     height: 44px;
     margin-left: 24px;
     line-height: 44px;
     background:rgba(247,247,247,1);
     margin-bottom: 7px;
     position: relative;
     display: flex;
     input{
       width:101.7px;
       background:rgba(247,247,247,1);
       border: none;
       outline:none;
       text-align: center;
     }
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
   /*蒙版层*/
   .masking{
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: rgba(7, 13, 32, 0.3);
     z-index: 1000;
     .mask_information{
       width: 70%;
       height: 70%;
       background: white;
       margin: 7% auto;
       li{
         width: 45%;
         display: inline-block;
         margin-left: 30px;
         margin-top: 20px;
         float: left;
         span{
           width: 100px;
           display: inline-block;
           text-align: left;

         }
         button{
           width: 80px;
           height: 40px;
           line-height: 40px;
           text-align: center;
           background:rgba(68,136,233,1);
           color: white;
           border: none;
           border-radius:4px ;
           outline: none;
           margin-left: 20px;
         }
       }

     }
   }
 }
</style>
