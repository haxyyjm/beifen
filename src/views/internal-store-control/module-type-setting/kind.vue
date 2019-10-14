<template>
  <div class="kind">
    <div class="title">
      <div class="titleSearch">
        <span style="margin-left: 76px">模块种类:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="titleSearch">
        <span style="margin-left: 76px">模块种类:</span>
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <ul class="contentTitle">
        <li v-for="(item,i) in itemList"  :key="i"  >{{item.projectName}}</li>
      </ul>
      <div class="amend"  v-show="amend"> <div><span>删除</span> | <span style="margin-right: 36px" @click="alter">修改</span> </div></div>
      <div class="save" v-show="save">
        <div><span @click="cancel">取消</span> | <span style="margin-right: 36px">保存</span> </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "kind",
      data(){
        return{
          itemList: [
            {
              projectName: '模块名称',

            },
            {
              projectName: '英文描述',

            },
            {
              projectName: '模块代码',

            },
            {
              projectName: '模块种类',

            },
            {
              projectName: '模块类型',

            },
            {
              projectName: '版本号',

            },
            {
              projectName: '是否菜单项',

            },
            {
              projectName: '是否登陆入口',

            },
            {
              projectName: '创建人',

            },
            {
              projectName: '创建时间',

            },
            {
              projectName: '修改人',

            }
            ,
            {
              projectName: '修改时间',

            }
            ,
            {
              projectName: '操作',

            }


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
          value1:''
        }
      },
      methods:{
          /*
          点击修改
           */
        alter(){
            this.amend=false,
              this.save=true
        },
        /*
        点击取消
         */
        cancel(){
          this.amend=true,
            this.save=false
        }
      }
    }
</script>

<style  lang="less" scoped>
  input{
    outline: none;
  }
  .kind{
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
