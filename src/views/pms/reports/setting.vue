<template>
  <div class="through-panel-body">
    <!-- 直接展示下面这个 -->
    <el-tree
      v-if="treeSetData.editFlg"
      show-checkbox
      ref="tree"
      :default-checked-keys = treeSetData.defaultData
      :key="treeSetData.tree_key"
      :data="treeSetData.treeData"
      node-key="code"
      :render-content="renderContent"
      :expand-on-click-node="false"
      :default-expand-all="treeSetData.defaultExpandAll"
      highlight-current
      @check="getCheckedNodes"
      @node-click="handleNodeClick"
      class="tree-style"
    ></el-tree>
    <el-tree
      v-else
      ref="tree"
      :key="treeSetData.tree_key"
      :data="treeSetData.treeData"
      node-key="id"
      :render-content="renderContent"
      :expand-on-click-node="false"
      :default-expand-all="treeSetData.defaultExpandAll"
      highlight-current
      class="tree-style"
    ></el-tree>
    <!-- 增加值 -->
    <el-dialog
      title="增加"
      :visible.sync="dialogVisible"
      width="30%"
    >
      code:<input class="input-style" type="text" />
      desc:<input class="input-style" type="text" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      // const data = [{
      //   id: 1,
      //   name: '一级 1',
      //   isEdit: false,
      //   children: [{
      //       id: 4,
      //       isEdit: false,
      //       name: '二级 1-1',
      //   }]
      // }, {
      //   id: 2,
      //   name: '一级 2',
      //   isEdit: false,
      //   children: [{
      //       id: 5,
      //       isEdit: false,
      //       name: '二级 2-1'
      //   }, {
      //       id: 6,
      //       isEdit: false,
      //       name: '二级 2-2'
      //   }]
      // }];
    const data = [
      {
        code: 'id', 
        desc: 15, 
        isEdit: false,
        is_choose: 1
      },
      {
        code: 'account', 
        desc: '父类',
        isEdit: false, 
        is_choose: 0, 
        children: [
          {
            code: 'id_2', 
            desc: '父类', 
            is_choose: 0,
            isEdit: false, 
            children: [
              {
                code: 'a', 
                desc: 323, 
                isEdit: false,
                is_choose: 1
              },
              {
                code: 'bbb', 
                desc: 323534, 
                isEdit: false,
                is_choose: 1
              }
            ]
          },
          {
            code: 'account_type_desc', 
            desc: '普通账户', 
            isEdit: false,
            is_choose: 0
          },
          {
            code: 'account_status_desc', 
            desc: '正常', 
            isEdit: false,
            is_choose: 1
          },
          {
            code: 'reference_type_desc', 
            desc: '入住单',
            isEdit: false, 
            is_choose: 1
          },
        ]
      },
      {
        code: 'arrange_flag_desc', 
        desc: '调账', 
        isEdit: false,
        is_choose: 0
      }
    ]
    return {
      dialogVisible: false,
      response_data: [], //返回得数组
      //树形结构展示 所有数据
      treeSetData: {
        defaultData: [],
        tree_key: 0,
        defaultExpandAll: true, // 是否默认展开
        editFlg: true, // 是否是编辑状态
        treeData: data, // 树形组件数据集
        // 编辑树形数组内容
        editList: [],
        // 删除树形数据数组内容
        deleteList: [],
        // 添加树形数据数组内容
        addList: [],
        // 是否添加flg
        addNodeFlg: false,
        // 默认的id
        defaultId: 5000,
        // 新增的最外层节点名称
        newName: ""
      }
    };
  },
  // watch: {
  //      '$route.params': function(newval, oldval) {
  //         console.log('..报表配置..', this.$route.params)
  //      }
  // },
  /**
   * @desc 这里需要 继续计算默认展开得数组 把code放进去
   */
  mounted(){
      this.treeSetData.defaultData = []
      this.getDefaultTree(this.treeSetData.treeData) //递归调用判断 默认已经配置的树状节点
      console.log('this.treeSetData.defaultData',this.treeSetData.defaultData)
  },
  created() {
    console.log("..报表配置..", this.$route.params);
    this.response_data = JSON.parse(this.$route.params.old_rep_data);
  },
  methods: {
    /**
     * 递归调用 默认展示的数据
     */
    getDefaultTree(treeData){
      console.log('treeData',treeData)
      // let treeArr = []
      treeData.forEach(item=>{
          if(!item.children){
              if(item.is_choose == 1){
                this.treeSetData.defaultData.push(item.code)
              }
            }else{
              //有子级的话
              console.log('进入')
              //存在children 且和children同级的is_choose直接为1的时候,就直接默认为所有子集全选
              if(item.is_choose == 1){
                this.treeSetData.defaultData.push(item.code)
              }else{
                 if(item.children){
                   console.log('调用')
                   this.getDefaultTree(item.children)
                 }
                //具有层级 有children
                  // 这里继续 递归 调用
            }
          }
       })
       return this.treeSetData
    },
    /**
     * @desc 树状图节点点击
     */
    handleNodeClick(){

    },
    getCheckedNodes(data){
        console.log('data',data)
        // console.log('///',this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
        console.log('///',this.$refs.tree.getCheckedNodes())
    },
    // 通行区域树操作group node, 渲染 树状结构
    renderContent(h, { node, data, store }) {
      if (this.treeSetData.editFlg == true) {
          console.log('进入1====>数组里面得一个完整对象',data)
        return (
          <span class="tree-span">
            <span>{data.code}&nbsp; - &nbsp;{this.showOrEdit(data)}</span>
            <div class="tree_node_op">
              <i
                class="el-icon-edit"
                on-click={ev => this.nodeEdit(ev, store, data)}
                style="padding-left: 10px;"
              ></i>
              <i
                class="el-icon-remove"
                on-click={() => this.nodeDelete(node, data)}
                style="margin-left: 5px;"
              ></i>
              <i
                class="el-icon-circle-plus"
                on-click={() => this.nodeAdd(node, data)}
                style="margin-left: 5px;"
              ></i>
            </div>
          </span>
        );
      } else {
        return (
          <span class="tree-span">
            <span>{this.showOrEdit(data)}</span>
            <div class="tree_node_op"></div>
          </span>
        );
      }
    },

    // 节点编辑 界面展示
    showOrEdit(data) {
        console.log('节点编辑data',data)
        if (data.isEdit) {
            return <input class="input-style" type="text" value={data.desc} on-blur={ev => this.edit_sure(ev, data)}/>
        } else {
            return <span className="node_labe">{data.desc}</span>
        }
    },
    changeInput(e){
        
    },
    /**编辑 点击图标按钮 */
    nodeEdit(ev, store, data) {
      data.isEdit = true;
      this.$nextTick(() => {
        const $input =
          ev.target.parentNode.parentNode.querySelector("input") ||
          ev.target.parentElement.parentElement.querySelector("input");
        console.log('$input',$input)
        !$input ? "" : $input.focus();
      });
    },

    // 确认编辑
    edit_sure(ev, data) {
      console.log('确认编辑')
      const $input =
          ev.target.parentNode.parentNode.querySelector("input") ||
          ev.target.parentElement.parentElement.querySelector("input");
      if (!$input) {
          return false;
      } else {
          console.log('$input.value',$input.value)
          console.log('编辑当前行的data',data) //这里可以调用后台update的方法 传入对应值
          data.desc = $input.value;
          data.isEdit = false;
      }
      // 修改编辑树形数据的内容
      // let editFilter = this.treeSetData.editList.filter(
      //     item => item.id == data.id
      // );
      // console.log('editFilter',editFilter)
      this.treeSetData.editList.push(data); //这个应该并不需要
      console.log('this.treeSetData.editList=====编辑的数组 这是所有的',this.treeSetData.editList)
      // if (editFilter.length == 0) {
      //     this.treeSetData.editList.push(data);
      // } else {
      //     this.treeSetData.editList.forEach((item, i) => {
      //     if (item.id == data.id) {
      //         this.treeSetData.editList[i].desc = data.desc;
      //     }
      //     });
      // }
    },

    // 增加节点 //只能增加字节点
    nodeAdd(node, data) {
    //   if (data.pid !== 0) {
      this.dialogVisible = true
    //     this.$message({
    //       type: "error",
    //       message: "通行区域最多只能有两级层次结构。"
    //     });
    //     return false;
    //   } else {
        const newChild = {
            // id: 22,
            // isEdit: false,
            // desc: '新增加的内容',
            code: 'id-新增', 
            isEdit: false,
            is_choose: 0, //没有选中
            desc: '新增加的内容'
        };
        if (!data.children) {
          console.log('data.children',data)
          this.$set(data, "children", []);
        }
        data.children.push(newChild);
        this.treeSetData.addList.push(newChild);
    //   }
    },

    // 节点删除
    nodeDelete(node, data) {
      this.treeSetData.deleteList.push(data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
  }
};
</script>

<style lang="less">
    .input-style {height: 20px;width: 140px;}
    .through-panel-body {
        padding-top:12px;
        width: 100%;
        display: flex;
        .el-tree-node__content { 
            padding-left: 10px;display: flex;width: 100%; height: 50px;
            padding-right: 10px;
            .tree-span {
                display: flex; width: 100%; 
                .tree_node_op {
                    margin-left: 10px;color: #D3D3D3;
                }
            }
        }
    }
</style>