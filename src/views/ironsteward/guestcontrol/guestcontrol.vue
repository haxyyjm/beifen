<template>
    <!--设备类型-->
  <div class="ironsteward">
    <el-container>
      <!--左侧-->
      <el-aside  class="left"  style="width: 350px">
        <div class="t-info">
          酒店名称
        </div>
        <p class="hotel_select" style="padding: 10px 0;">{{ hotel_name }}</p>
        <!-- <el-select v-model="value8" filterable placeholder="请选择"  class="hotel_select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <div class="t-info">
          设备类型树
        </div>
        <el-tree style="border-right: 1px #eeeeee solid" :data="equipment_type_tree" :props="defaultProps" node-key="node.id" default-expand-all  @node-click="handleNodeClick()">
          <span class="custom-tree-node" style="width: 100%;" slot-scope="{ node, data }" @click="get_table(data,data.id)">
            <span class="my_node" :data-id="data.id">{{data.equipment_name}}</span>
            <span class="pull-right" v-show="tree_show">
              <i class="el-icon-edit" @click="update_tree(data)" style="margin-right:30px;"></i>
              <i class="el-icon-delete" v-show="data.tier == '3' || !data.hierarchy.length" @click="remove_equipment_type(data.id)"  style="margin-right:30px;"></i>
              <i class="el-icon-circle-plus" v-show='data.tier != "3"' style="margin-right:30px;" @click="EQ_Visible = true;param = {equipment_name: '',english_description: '',is_set_common: '0',hierarchy:data.id}"></i>
            </span>
          </span>
        </el-tree>
        <!-- 添加最外层按钮 -->
        <div class="addNewTree" @click="EQ_Visible = true;param = {equipment_name: '',english_description: '',is_set_common: '0',hierarchy:''}"><i class="el-icon-circle-plus"></i></div>
      </el-aside>
      <!--右侧-->
      <el-main  class="right" >
        <el-card class="box-card">
            <p>舒适双床房设备方案1(ss-1）    欢迎模式</p>

        </el-card>
      </el-main>
      <!-- 弹窗 -->
        <el-dialog title="新增设备" :visible.sync="EQ_Visible" width="25%">
            <el-form :model="param">
                <el-form-item label="设备名称：" :label-width="formLabelWidth">
                    <el-input size="mini" placeholder="请输入内容" v-model="param.equipment_name" clearable></el-input>
                </el-form-item>

                <el-form-item label="英文描述：" :label-width="formLabelWidth">
                    <el-input size="mini" placeholder="请输入内容" v-model="param.english_description" clearable></el-input>
                </el-form-item>

                <el-form-item label="是否公共设置：" :label-width="formLabelWidth">
                    <el-radio v-model="param.is_set_common" label="1">是</el-radio>
                    <el-radio v-model="param.is_set_common" label="0">否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini"  @click="EQ_Visible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "guestcontrol",
        data(){
          return {
            UrLHeader: 'http://www.sunxm.cn:8002/v2/',
            // 左边搜索酒店内容
            hotel_name:'皇冠晶品酒店',
            options: [{
                value: '选项1',
                label: '皇冠晶品酒店01'
              }, {
                value: '选项2',
                label: '皇冠晶品酒店03'
              }, {
                value: '选项3',
                label: '皇冠晶品酒店04'
              }, {
                value: '选项4',
                label: '皇冠晶品酒店05'
              }, {
                value: '选项5',
                label: '皇冠晶品酒店06'
              }],
            // 左边树形结构
            equipment_type_tree:[],
            // 树形控件弹窗
            EQ_Visible: false,
            param: {
                  equipment_name: '',
                  english_description: '',
                  is_set_common: '0',
                  hierarchy:''
            },
            // 弹框表单宽度设定
            formLabelWidth: '120px',
            // 是否是更新的变量
            update_if:false,
            // 表格初始数据
            tableData: [ ],
            defaultProps: {
              children: 'hierarchy',
              label: 'equipment_name'
            },
            // 是否编辑树形控件
            tree_show: false
        };
      },
      methods:{
        async get_equipment_type_tree(){
          let _this=this,getUrl = this.UrLHeader+'equipment/ht/room/get_equipment_type_tree/';
          let res =  await _this.$axios.get(getUrl);
          _this.equipment_type_tree = res.data.data;
          _this.get_table('',res.data.data[1].id);
        },
        // 初始化表格数据
        // 点击树形出现表格数据
        get_table(data,id){
          let _this = this, getCertainUrl = this.UrLHeader+'equipment/ht/room/get_equipment_type/?hierarchy=' + id;
          _this.$axios.get(getCertainUrl).then(function(res) {
                // 判断返回数据是否有数据
                if(res.data.message =='success' && res.data.data.results){
                  _this.tableData = res.data.data.results;
                }else if(res.data.message =='success' && !res.data.data.results && !res.data.data.length){
                  _this.tableData = [];
                  data.created = '无';
                  data.last_update = '无';
                  _this.tableData.push(data);
                }else{
                  _this.$message.error('读取信息失败');
                }
              }).catch((error) => {

              });
        },
        // 更新或者添加函数封装
        add_or_update_type(url){
            let _this = this;
            _this.update_if = false;
            if(!_this.isnull(_this.param.equipment_name) &&  !_this.isnull(_this.param.english_description)) {
            _this.$axios.post(url,_this.param).then(function(res) {
                if(res.data.message =='success'){
                    _this.EQ_Visible = false;
                    _this.get_equipment_type_tree();
                    _this.$message({
                      message: '保存成功',
                      type: 'success'
                    });

                }else if(res.data.english_description){
                    _this.$message.error('英文描述不能重复');
                }else{
                    _this.$message.error('保存信息失败');
                }

              }).catch((error) => {

              });
            }else{
                _this.$message({
                      message: '请确保输入不为空',
                      type: 'warning'
                });
            }
          },
        // 添加树形控件add_equipment_type
        add_equipment_type(){
          let _this=this,add_url = _this.UrLHeader + "equipment/ht/room/add_equipment_type/";
          _this.add_or_update_type(add_url);
        },
        // 更新修改
        update_tree(data){

          console.log(data);
          this.update_if = true;
          this.EQ_Visible = true;
          this.param = data;

        },
        // 更新树形控件update_equipment_type
        update_equipment_type(id){
          let _this=this,up_url = _this.UrLHeader + "equipment/ht/room/update_equipment_type/" + id +'/';
          _this.add_or_update_type(up_url);
        },
        // 删除某一条设备
        remove_equipment_type(id){
          let _this=this,remove_url = _this.UrLHeader + "equipment/ht/room/remove_equipment_type/" + id +'/';
          _this.$confirm('是否永久删除该设备?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              _this.$axios.post(remove_url).then(function(res) {
                if(res.data.message =='success'){
                  _this.get_equipment_type_tree();
                  _this.$message({
                    message: '删除成功',
                    type: 'success'
                  });

                }else{
                  _this.$message.error('保存信息失败');
                }

              }).catch((error) => {

              });
          }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消删除'
              });
          });
        },
        // 弹出框确认按钮
        confirm(){
          // 添加
          this.add_equipment_type();
        },

        //展开树
        handleNodeClick() {
          this.tree_show = true;
        },
         // 判断输入值是否为空
          isnull(val) {
              var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
              if (str == '' || str == undefined || str == null) {
                  // this.$message('确认输入值不能为空');
                  return true;
              } else{
                return false;
              }
          },
      },

      created(){
        this.get_equipment_type_tree();
      }
    }
</script>

<style lang="less" scoped>
  //左侧导航栏样式
.left{
  .t-info{
    margin-top: 10px;
    padding: 5px 0 5px 20px;
    line-height: 30px;
    width: 100%;
    background: #BFCAD1;
  }
  .hotel_select{
    width:80%;
    margin: 10px 0 0 10%;
    .el-input{
      input{
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .addNewTree{
    text-align: center;padding: 5px 0;
  }
}
</style>
<style lang="less" scoped>
.el-dialog__header{
    padding: 10px;
    background-color: #303A41;
    .el-dialog__title{
        color: #fff;
        font-size: 16px;
    }
}
.el-dialog__body{
    padding: 10px 20px;
}
.el-form-item{
    margin: 0;
}
.el-dialog__headerbtn {
    top: 10px;
}
</style>

