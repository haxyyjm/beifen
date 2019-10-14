<template>
  <div class="module-tree">
    <el-container style="height: 93%; border: 1px solid #eee">
      <!--左侧内容-->
      <el-aside width="300px" style="background-color: white">
          <div class="filtrate">
            <p>快速筛选</p>
            <el-input v-model="module_name" placeholder="请输入模块名称" style="width: 240px;margin-top: 10px"></el-input>
            <button @click="seek">查找</button>
            <div style="display: inline-block;margin-top: 10px">
              <span>模块种类 ：</span>
              <el-select v-model="modulization"  clearable  placeholder="请选择"  >
                <el-option
                  v-for="item in kinds"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select >
            </div>
            <div style="display: inline-block;margin-top: 10px">
              <span>模块类型 ：</span>
              <el-select v-model="module_type"  clearable  placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
         <div class="tree">
           <p>模块树</p>
           <div class="content">
             <div id="control"  >
               <el-tree
                 class="ddd"
                 :data="module_list"
                 node-key="node.id"
                 :expand-on-click-node="false"
                 node-contextmenu
                 style="font-size: 14px"
                 @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="position: absolute;right: 20px">
                      <!--v-show="setpro"-->
                      <!--<i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>-->
                      <i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px "></i>
                      <i class="el-icon-circle-plus" @click="append(data);flush()"   style="margin-right: 30px "></i>
                    </span>
                 </span>
               </el-tree>
               <p @click="masking_true=dialogVisible = true;flush()" style="margin-top: 10px;font-size: 30px;padding-left: 120px">+</p >
             </div>
           </div>
         </div>

      </el-aside>

      <!--新增模块树-->
      <el-dialog
        title="新增模块树"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose">
        <ul class="mask_information">
          <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块名称</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;"  maxlength="8"></el-input></li>
          <li>
            <span style="margin-left: 10px">英文描述</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 217px;" ></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块代码</span>
            <el-input v-model="param.code" placeholder="请输入内容"  @blur="unfocused('code', code)"style="width: 217px;" ></el-input></li>
          <li>
            <span style="margin-left: 10px">模块种类</span>
            <el-input v-model="param.root_id"  style="width: 217px;"  :disabled="true" ></el-input>
          <li>
          <i style="color: red;font-size: 18px">*</i>
            <span >模块类型</span>
            <el-select v-model="has_entry" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >链接</span>
            <el-input v-model="param.url" placeholder="请输入内容" @blur="unfocused('url', url)" style="width: 217px;" ></el-input></li>
          <!--<li v-show="bbb">-->
            <!--<span >父级模块</span>-->
            <!--<el-select v-model="parent_id" placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in parents"-->
                <!--:key="item.id"-->
                <!--:label="item.name"-->
                <!--:value="item.id"-->
              <!--&gt;-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</li>-->
          <li >
            <i></i>
            <span style="margin-left: 10px">父级模块</span>
            <el-input v-model="param.parent_id"   style="width: 217px;"   :disabled="true" ></el-input></li>
          <li>
            <span style="margin-left: 10px">版本号</span>
            <el-input v-model="versions" placeholder="1.0" style="width: 217px;"  :disabled="true" ></el-input></li>
          <!--<li style="margin-top:50px;" v-show="save_add"><button @click="save">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_childen"><button @click="conserve">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_preserve "><button @click="preserve ">保存</button> <button @click="cancel">取消</button></li>-->
        </ul>

       <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
      </el-dialog>
      <!--模块树里的加号新增模-->
      <el-dialog
        title=""
        :visible.sync="dialog"
        width="70%"
        :before-close="handleClose">
        <ul class="mask_information">
          <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块名称</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;"  maxlength="8"></el-input></li>
          <li>
            <span style="margin-left: 10px">英文描述</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 217px;" ></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块代码</span>
            <el-input v-model="param.code" placeholder="请输入内容"  @blur="unfocused('code', code)"style="width: 217px;" ></el-input></li>
          <li>
            <span  style="margin-left: 10px">模块种类</span>
            <el-input v-model="param.root_id"  style="width: 217px;"  :disabled="true" ></el-input>
          <li>
          <i style="color: red;font-size: 18px">*</i>
            <span >模块类型</span>
            <el-select v-model="has_entry" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >链接</span>
            <el-input v-model="param.url" placeholder="请输入内容" @blur="unfocused('url', url)" style="width: 217px;" ></el-input></li>
          <li >
            <i style="color: red;font-size: 18px">*</i>
          <span >父级模块</span>
          <el-select v-model="parent_id" placeholder="请选择">
          <el-option
          v-for="item in parents"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
          </el-option>
          </el-select>
          </li>
          <!--<li ><span >父级模块</span><el-input v-model="parent_id"   style="width: 217px;"   :disabled="true" ></el-input></li>-->
          <li>
            <span  style="margin-left: 10px">版本号</span>
            <el-input v-model="param.versions" placeholder="1.0" style="width: 217px;"  :disabled="true" ></el-input></li>
          <!--<li style="margin-top:50px;" v-show="save_add"><button @click="save">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_childen"><button @click="conserve">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_preserve "><button @click="preserve ">保存</button> <button @click="cancel">取消</button></li>-->
        </ul>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="save_append()">确 定</el-button>
      </span>
      </el-dialog>
      <!--模块信息的更改-->
      <el-dialog
        :visible.sync="dialog_mask"
        width="70%"
        :before-close="handleClose">
        <ul class="mask_information">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块名称</span>
            <el-input v-model="mask_name" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <span >英文描述</span>
            <el-input v-model="mask_desc_en" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块代码</span>
            <el-input v-model="mask_code" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <span >模块种类</span>
            <el-input v-model="mask_input_kind"  style="width: 217px;" :disabled="true" ></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >模块类型</span>
            <el-select v-model="mask_has_entry" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>

          <li>
            <span >父级模块</span>
            <el-input v-model="mask_input_father"  style="width: 217px;" :disabled="true" ></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >链接</span>
            <el-input v-model="mask_url" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <span >版本号</span>
            <el-input v-model="mask_input" placeholder="1.0" style="width: 217px;" :disabled="true" ></el-input></li>
        </ul>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_mask = false">取 消</el-button>
        <el-button type="primary" @click="preserve_keep()">确 定</el-button>
        </span>
      </el-dialog>


      <!--右侧内容-->
      <el-container>
        <div class="paging">
          <p>模块信息</p>
          <!--模块列表-->
          <el-table
            :data="newlists"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%;"
          >
            <el-table-column
              prop="name"
              width="150"
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
              width="250"
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
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
        <div class="ini"><logon-view></logon-view></div>

      </el-container>

    </el-container>
  </div>
</template>
<script>
  export default {
    name: "module-tree",
    data() {
      return {
        api:'http://47.98.113.173:9519',
        total:10,
        pagesize:10,
        /*
        * 筛选条件
        * */
        module_name:'',//筛选模块名称
        modulization:'',//模块种类
        kinds:[],//模块种类的列表
        module_type:'',//模块类型
        //模块类型
        options: [{
          value:1,
          label: '有登陆入口'
        }, {
          value:0,
          label: '无登陆入口'
        }],

        dialogVisible:false,//新增模块树的显示与隐藏
        dialog:false,//模块树的新增显示和隐藏
        dialog_mask:false,//模块信息的修改页面的显示和隐藏
        module_list:[],//模块树列表
        newlists:[],//模块信息
      //  新增模块树的内容
        param:{},
        name:'',//模块名称
        desc_en:'',//英文描述
        code:'',//模块代码
        root_id:'',//模块种类
        parent_id:'',//父级模块
        has_entry:'',//模块类型
        url:'',//链接
        versions:'',//版本号

      //  m模块树里的加号点击显示的内容
        parents:[],
        codes:[],
        urls:[],

      // 模块信息里的内容
        mask_name:'',//模块名字
        mask_desc_en:'',//英文描述
        mask_code:'',//模块代码
        mask_input_kind:'',//模块种类
        mask_has_entry:'',//模块类型
        mask_url:'',//url
        mask_input_father:'',//父级模块
        mask_input:'',//版本号
        mask_input_father_id:'',//父级模块id
        id:'',
      }
    },
    created:function () {
      // console.log('拿到验证开始:'+sessionStorage.getItem("authorization"));
      let that = this;
      that.module_list_methods();//获取模块树
      that.kinds_methodes();//模块种类
      that. message_list();//模块信息
    },
    methods:{
      /**
       * @flush 是用来刷新数据的
       * */
      flush(){
        let  that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          desc_en:'',//英文描述
          name:'',//模块名称
          code:'',//模块代码
          root_id:'',//模块种类
          url:'',//url

        }
          that.has_entry='',//模块类型
          that.parent_id =""//父级模块


      },
      //封装获取树状结构
      module_list_methods(){
        let that = this;
        //获取树形结构数据
        that.$axios({
          url: that.api+"/v1/common/module/get_tree",
          method: "get",
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res=>{
            if (res.data.message==="success"){
              sessionStorage.setItem("authorization",res.data.new_authorization)
              console.log(res.data.new_authorization)
              that.module_list=res.data.data;
              console.log(that.module_list);
            }
            else{
              console.log(res.data.message);
            }

            // that.newlists=res.data.data
          })
          .catch(error=>{
            console.log(error);
          });
      },
      //封装获取模块种类
      kinds_methodes(){
        let that =this;
        //  获取模块种类
        that.$axios({
          url: that.api+"/v1/common/module/root_list",
          method: "get",
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res=>{
            if (res.data.message=="success"){
              sessionStorage.setItem("authorization",res.data.new_authorization)
              console.log(res.data.data)
              that.kinds=res.data.data
            }
            else{
              console.log(res.data.message);
            }

          })
          .catch(error=>{
            console.log(error);
          });

      },
      //封装模块信息
      message_list(){
        let that= this;
        //获取信息列表
        that.$axios({
          "url": ""+that.api+"/v1/common/module/info_list",
          "method": "get",
          //"headers": {"authorization": that.authorization_token}
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res => {
            if (res.data.message=="success"){
              console.log(res.data);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.newlists=res.data.data.list;
              that.total=res.data.data.total_count;
              sessionStorage.setItem("authorization",res.data.new_authorization)
            }
            else{
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 检查去重
      check_repeat(field, keyword){
        // console.log(this.urls.indexOf(keyword));
        // field 字段名
        //keyworld 输入值
        // 关键词
        if(field === "param.url"){
          if(this.urls.indexOf(keyword)==-1){
            // alert("bu重复")
          }else {
            alert("输入内容已存在，请检查后重新输入")
          }
        }
        else if(field === "param.code"){
          if(this.code.indexOf(keyword)==-1){
            // alert("bu重复")
          }else {
            alert("输入内容已存在，请检查后重新输入")
          }
        }
        else{
          //
        }
      },
      //全局查找
      seek(){
        let that = this;
        if(that.module_name===""&&that.modulization===""&&that.module_type===""){
          that.hintInfo("warning","请选择筛选条件")
        }else if(that.module_name==="") {
          that.hintInfo("warning","请选择筛选模块名称")
        }else if (that.modulization===""){
          that.hintInfo("warning","请选择筛选模块种类")
        }else if(that.module_type===""){
          that.hintInfo("warning","请选择筛选模块类型")
        } else {
          if (that.has_entry=="有登陆入口"){
            that.has_entry=0
          }else {
            that.has_entry=1
          }
          //发送查找内容给后台  查找
          that.$axios({
            url: that.api+"/v1/common/module/info_list",
            method: "post",
            data:{
              keyword:that.module_name,
              root_id:that.modulization,
              has_entry:that.module_type
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
            //headers: {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                sessionStorage.setItem("authorization",res.data.new_authorization)
                console.log(res.data);
                that.newlists=res.data.data.list
                that.total=res.data.data.total_count
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }


      },




      //点击树形控件的节点
      handleNodeClick( data,e){
        // this.$refs.mychild.handleClick();
        this.dataLabel=data.label;
        this.setpro=true
      },

      //点击加号显示的保存以后向后台发送数据
      save(){
        console.log("保存");
        let that = this;
        if((!that.param.name) || (!that.param.code) || (!that.param.url) || (!that.has_entry)){
                that.hintInfo("warning","* 为必填项")
        }else {
          that.$axios({
            url: that.api+"/v1/common/module/add",
            method: "post",
            data:{
              name:that.param.name,
              desc_en:that.param.desc_en,
              code:that.param.code,
              root_id:that.param.root_id,
              has_entry:that.has_entry+"",
              url:that.param.url,
              creator:that.creator,
              parent_id:that.param.parent_id
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message==="success"){
                that.dialogVisible=false;
                that. message_list();
                that.module_list_methods();
                sessionStorage.setItem("authorization",res.data.new_authorization)
              }
              else{
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            });
        }

      },
      //点击树状图上的添加
      append(data) {
        let that = this;
        that.dialog=true;
        // console.log(data.data.id);
        this.$axios({
          url:this.api+"/v1/common/module/parents",
          method: "post",
          // params:{},
          data:{
            item_id:data.id,
          },
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
        })
          .then(res=>{
            if(res.data.message==="success"){
              that.parents=res.data.data.parents;
              that.codes =res.data.data.codes;
              that.urls =res.data.data.urls;
              console.log(res.data.data.parents)

              console.log(res.data.data.root);
              that.root_id=res.data.data.root.name
              sessionStorage.setItem("authorization",res.data.new_authorization)
            }else {
              console.log(res.data.message)
            }

          })
          .catch(error=>{
            console.log(error);
          })

      },
      //点击树状图上的添加后的保存
      save_append(){
        console.log("保存");
        let that = this;
        if((!that.param.name) || (!that.param.code) || (!that.param.url) || (!that.has_entry) ||(!that.parent_id)){
          that.hintInfo("warning","* 为必填项")
        }else {
          that.$axios({
            url: that.api+"/v1/common/module/add",
            method: "post",
            data:{
              name:that.param.name,
              desc_en:that.param.desc_en,
              code:that.param.code,
              root_id:that.param.root_id,
              has_entry:that.has_entry+"",
              url:that.param.url,
              creator:that.creator,
              parent_id:that.parent_id
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              if (res.data.message=="success"){
                that.dialog = false;
                that.message_list();
                that.module_list_methods();
                sessionStorage.setItem("authorization",res.data.new_authorization)
              }
              else{
                console.log(res.data.message);
              }

            })
            .catch(error=>{
              console.log(error);
            });
        }

      },
      //树状图上的删除
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        let id=data.id;
        console.log(id)
        console.log(children);
        if (node.childNodes==""){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            children.splice(index, 1);
            console.log(this.authorization_token);
            this.$axios({
              url:""+this.api+"/v1/common/module/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              //headers: {'authorization': this.authorization_token}
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res.data.message)
                if (res.data.message==="success"){
                  //获取信息列表
                  this.module_list_methods();
                  this.message_list();
                  sessionStorage.setItem("authorization",res.data.new_authorization)

                }else{
                  console.log(res.data.message)
                }
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
        }else {
          alert("这是一个父目录，子目录还存在，不能删除")
        }

      },
      //点击树状图上的修改
      amend(node, data){
        this.masking=true;
        this.save_preserve=true;
        this.save_add=false;
        this.save_childen=false;
        this.id=node.data.id;
        console.log(node,data);
        this.name=data.name;
        if (data.parent_id==""){
          this.parent_id=node.parent.data.name
        }else {
          this.parent_id=node.parent.data.name;
        }

      },
      //点击树状图上的修改后的保存
      preserve(){
        let that = this;
          if (that.has_entry=="有登录入口"){
            that.has_entry=1
          }else if(that.has_entry=="无登录入口"){
            that.has_entry=0
          };
          console.log("保存");
          // console.log(that.creator)
          that.$axios({
            url:that.api+"/v1/common/module/update/"+that.id,
            method: "post",
            // params:{},
            data:{
              name:that.name,
              desc_en:that.desc_en,
              code:that.code,
              root_id:that.root_id,
              has_entry:that.has_entry,
              url:that.url,
              creator:that.creator.name,
              // create_time:this.create_time,
              // last_time:this.last_time,
              parent_id:that.parent_id
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
            //headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                that.masking=false;
                that.message_list();
                that.module_list_methods();
                // location.reload();  //强制刷新
                sessionStorage.setItem("authorization",res.data.new_authorization)
              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })


      },

      //模块信息的修改
      submit(srow,id,index,list) {
        let that = this;
        console.log(srow);
        that.dialog_mask=true
        that.id=id;
         that.mask_name=srow.name,//模块名字
          that.mask_desc_en=srow.desc_en,//英文描述
          that.mask_code=srow.code,//模块代码
          that.mask_input_kind=srow.root_id.name,//模块种类
          // that.mask_has_entry=srow.has_entry+"",//模块类型
           that.mask_url=srow.url,//url
          // that.mask_input_father=srow.parent_id.name,//父级模块
          that.mask_input=srow.version//版本号
        that.mask_input_father_id = srow.parent_id.id

        if(!srow.parent_id){
          that.mask_input_father=srow.parent_id;

        }else {
          that.mask_input_father=srow.parent_id.name;

        };
        if(srow.has_entry==1){
          that.mask_has_entry="有登录入口"
        }else  if(srow.has_entry==0){
          that.mask_has_entry="无登录入口"
        }


      },
      //模块信息的更改后的保存
      preserve_keep(){
        let that = this;
        if((!that.mask_name) || (!that.mask_code) || (!that.mask_url) || (!that.mask_has_entry) ){
          that.hintInfo("warning","* 为必填项")
        }else {
          if (that.mask_has_entry == "有登录入口") {
            that.mask_has_entry = 1
          } else if (that.mask_has_entry == "无登录入口") {
            that.mask_has_entry = 0
          }
          ;
          console.log("保存");
          that.$axios({
            url: that.api + "/v1/common/module/update/" + that.id,
            method: "post",
            // params:{},
            data: {
              name: that.mask_name,
              desc_en: that.mask_desc_en,
              code: that.mask_code,
              root_id: that.mask_input_kind,
              has_entry: that.mask_has_entry,
              url: that.mask_url,
              // creator:that.creator.name,
              parent_id: that.mask_input_father_id
            },
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                // location.reload();  //强制刷新
                that.dialog_mask = false;
                that.message_list();
                that.module_list_methods()
                sessionStorage.setItem("authorization",res.data.new_authorization)
              } else {
                console.log(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            })
        }
      },
      //模块信息的删除
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
            url:that.api+"/v1/common/module/remove/"+id,
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              console.log(res.message)
              if(res.data.message==="success")
              // location.reload(); // 强制刷新
                that.message_list();
              that.module_list_methods();
              sessionStorage.setItem("authorization",res.data.new_authorization)
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


      //当添加信息里的模块代码，链接 失焦事件
      unfocused(field, keyword){
        this.check_repeat(field, keyword);
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
          headers:{
            authorization:sessionStorage.getItem("authorization"),
          }
          //"headers": {"authorization": that.authorization_token}
        })
          .then(res => {
            if (res.data.message=="success"){
              console.log(res);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.newlists=res.data.data.list;
              sessionStorage.setItem("authorization",res.data.new_authorization)
            }
            else{
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },

      //新增的显示与隐藏
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


    },
  }
</script>

<style lang="less"  scoped>
  .module-tree{
    width: 100%;
    height: 100%;
    .filtrate{
      p{
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        padding-left: 10px;
        margin-top: 10px;
      }
      button{
        display: inline-block;
        width: 44px;
        height: 40px;
        background:#4488E9 ;
        color: white;
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
        border: none;
      }
    }
    .tree{
      p{
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        padding-left: 10px;
        margin-top: 10px;
      }
    }
    .mask_information{
      overflow: hidden;
      li{
        float: left;
        width: 50%;
        margin-bottom: 10px;
        span{
          display: inline-block;
          width: 80px;

        }
      }
    }
    .paging{
      width: 96% ;
      /*height: 800px;*/
      background:#eeeeee;
      margin-left: 10px;
      padding: 0  10px;
      p{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        padding-left: 10px;
        margin-top: 10px;
      }
    }
  }
</style>
