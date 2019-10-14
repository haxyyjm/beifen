<template>
  <el-dialog
    title="场地管理"
    :visible.sync="dialogVisible_site"
    width="50%"
    :before-close="handleClose">
    <el-row>
      <el-col :span="11">
        <el-table
          :data="tableData_site"
          :header-cell-style="{background:'#68819E',color:'#FFF'}"
          size="mini"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="代码">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <span></span>
      </el-col>
      <el-col :span="11">
        <ul>
          <li><span>代码:</span><input/></li>
          <li><span>代码:</span><input/></li>
          <li><span>代码:</span><input/></li>
          <li><span>代码:</span><input/></li>
          <li><span>代码:</span><input/></li>
          <li><span>代码:</span><input/></li>
          <li><span>代码:</span><input/></li>
        </ul>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_site = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible_site = false">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "site_manager",
        data(){
          return {

          };
        },
      props : {dialogVisible_site : false},
      watch  :{
        dialogVisible_site : function(flag){
          console.info(flag);
          this.dialogVisible_site = flag;
        }
      }
    }
</script>

<style scoped>
  .el-dialog{

  }
</style>
