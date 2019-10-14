<template>
  <div class="moduleType">
    <div class="title">
      <div class="titleSearch">
        <span style="margin-left: 76px">模块类型:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="state">
        <span style="margin-right: 64px">状态:</span>
        <el-checkbox v-model="checked" style="display: inline-block">正常</el-checkbox>
        <el-checkbox v-model="checked" style="display: inline-block">已停用</el-checkbox>
      </div>
      <!--模块列表-->
      <el-table
        :data="itemList"
        :header-cell-style="{background:'#68819EFF',color:'white'}"
        stripe
        style="width: 94%;margin-left: 24px">
        <el-table-column
          prop="name"
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
          prop="root_id"
          label="模块种类">
        </el-table-column>
        <el-table-column
          prop="has_entry"
          label="模块类型">
        </el-table-column>
        <el-table-column
          prop="url"
          label="链接">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop=" versions"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="last_time"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;margin-right: 4%"
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "module-type",
       data(){
          return{
            checked:false,//状态
            itemList: [
              {
                projectName: '模块名称',

              },
              // {
              //   projectName: '英文描述',
              //
              // },
              // {
              //   projectName: '模块代码',
              //
              // },
              // {
              //   projectName: '模块种类',
              //
              // },
              // {
              //   projectName: '模块类型',
              //
              // },
              // {
              //   projectName: '版本号',
              //
              // },
              // {
              //   projectName: '是否菜单项',
              //
              // },
              // {
              //   projectName: '是否登陆入口',
              //
              // },
              // {
              //   projectName: '创建人',
              //
              // },
              // {
              //   projectName: '创建时间',
              //
              // },
              // {
              //   projectName: '修改人',
              //
              // }
              // ,
              // {
              //   projectName: '修改时间',
              //
              // }
              // ,
              // {
              //   projectName: '操作',
              //
              // }


            ],
            amend:true,
            save:false,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            value: '',
            pagesize:6, //代表每页显示的条数
            total:16,//代表总条数
          }
       },
      methods:{
          //点击删除按钮元素消失
              cancel(){
          // this.amend=false;
        },
        // 父级点击加号
             parentHandleclick(e) {
          this.amend=true;
        },
         //点击分页上的页数
            handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          this.curPage=curPage;

        },
       //父级点击树形控件的元素
            handleClick(e){
          this.amend=true;
        },
        //点击修改
             revamp(){
          this.amend=false;
          this.save=true;

        },
        //点击取消
             abolish(){
          this.save=false;
          this.amend=true
        }
      }
    }
</script>

<style lang="less" scoped>
  input{
    outline: none;
  }
 .moduleType{
   .title{
     margin-top: 52px;
     font-size: 16px;

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
       margin-left: 86px;
       margin-bottom: 40px;
     }

     .amend ,.save{
       /*width: calc(100% - 128px);*/
       height: 44px;
       line-height: 44px;
       background:rgba(247,247,247,1);
       margin-bottom: 7px;
       overflow: hidden;
       min-width: 1000px;
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
 }
</style>
