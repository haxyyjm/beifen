<template>
  <div class="log">
    <div class="block">
      <span class="demonstration">开始日期时间：</span>
      <el-date-picker v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间"
                      prefix-icon="el-icon-date"
      ></el-date-picker>
      <span class="demonstration" style="margin-left: 32px">结束日期时间：</span>
      <el-date-picker v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间"
                      prefix-icon="el-icon-date"
      ></el-date-picker>
    </div>

    <div class="title">
      <div class="titleSearch">
        <span style="margin-left: 36px">模块类型 :</span>
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
        <span style="margin-right: 64px">状态 :</span>
        <el-checkbox v-model="checked" style="display: inline-block">正常</el-checkbox>
        <el-checkbox v-model="checked" style="display: inline-block">停用</el-checkbox>
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
        name: "log",
      data() {
        return {
          checked:false,//状态
          pickerOptions1: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          value1: '',
          value2: '',
          value3: '',
          itemList: [
            {
              projectName: '登录号',

            },
            // {
            //   projectName: '模块名称',
            //
            // },
            // {
            //   projectName: '模块类型',
            //
            // },
            // {
            //   projectName: '模块种类',
            //
            // },
            // {
            //   projectName: '登陆时间',
            //
            // },
            // {
            //   projectName: '发出时间',
            //
            // },
            // {
            //   projectName: '链接',
            //
            // },
            // {
            //   projectName: '登陆方法',
            //
            // },
            // {
            //   projectName: '创建人',
            //
            // },
            // {
            //   projectName: '用户名',
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

        };
      },
      methods:{
        //点击修改
           alter(){
          this.amend=false,
            this.save=true
        },
       //点击取消
           cancel(){
          this.amend=true,
            this.save=false
        },
        //点击分页上的页数
           handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          this.curPage=curPage;

        },
      }
    }
</script>

<style   lang="less" scoped>
  .log{
    width: 100%;
    .block{
      margin-top:50px;
      margin-left: 96px;
      .demonstration{
        font-size: 18px;
      }
    }
    .title{
      margin-top: 28px;
      font-size: 16px;
      margin-left: 60px;

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
          margin-left: 60px;
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
  }
</style>
<style>
  .el-input__prefix{
    font-size: 20px;
    color: black;
  }
  /*.el-date-editor.el-input{*/
    /*width: 300px;*/
  /*}*/
/*  .el-input__inner{
    padding-left: 50px;
  }*/
</style>
