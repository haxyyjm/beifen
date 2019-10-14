<template>
  <div class="papers">
    <div class="title">
      <i class="el-icon-setting" style="font-size: 40px ;line-height: 70px;color:#777777FF"></i>
      <span style="color:#777777FF">基础信息设置</span>
    </div>
    <div class="label">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="一般证件类型" name="first" >
           <div class=" search">
             <el-input v-model="input" placeholder="请输入内容" style="width: 217px;"></el-input>
             <button>搜索</button>
           </div>
           <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px;margin-bottom: 24px" @click="add();dialogVisible=true;flush()">新增</button>
          <!--证件类型-->
          <el-table
            :data="tableData"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            max-height="500"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码"
             >
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              >
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="是否系统码">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_group"
              label="是否集团码">
              <template slot-scope="scope">
                <span v-if="scope.row.is_group === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="修改者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="修改时间">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, tableData);dialogVisible=true">修改</el-button>
              </template>

            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            style="float: right;"
            layout="prev, pager, next"
            :page-size="5"
            prev-text=""
            :total=total>
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
              <ul class="dialogVisible_style" >
                <li>
                  <i style="color: red;font-size: 18px">*</i>
                  <span>代码 ：</span>
                  <el-input v-model="param.code" placeholder="请输入内容"  style="width: 217px;"></el-input>
                </li>
                <li>
                  <i style="color: red;font-size: 18px">*</i>
                  <span >中文描述 ：</span>
                  <el-input v-model="param.descript" placeholder="请输入内容"  style="width: 217px;"></el-input>
                </li>
                <li>
                  <i style="color: red;font-size: 18px">*</i>
                  <span >英文描述 ：</span>
                  <el-input v-model="param.descript_en" placeholder="请输入内容"  style="width: 217px;"></el-input>
                </li>
                <li>
                  <i style="color: red;font-size: 18px">*</i>
                  <span>是否停用 ：</span>
                  <el-radio v-model="is_halt" label="1">正常</el-radio>
                  <el-radio v-model="is_halt" label="0">停用</el-radio>
                </li>
                <li>
                  <i style="color: red;font-size: 18px">*</i>
                  <span>是否集团码 ：</span>
                  <el-radio v-model="is_group" label="1">是</el-radio>
                  <el-radio v-model="is_group" label="0">否</el-radio>
                </li>
                <li>
                  <i style="color: red;font-size: 18px">*</i>
                  <span>是否系统码 ：</span>
                  <el-radio v-model="is_sys" label="1">是</el-radio>
                  <el-radio v-model="is_sys" label="0">否</el-radio>
                </li>
              </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>
        <!--签证代码设置-->
        <el-tab-pane label="签证代码设置" name="second" >
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 217px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px;margin-bottom: 24px" @click="increase();dialog=true;flush()">新增</button>
          <!--证件类型-->
          <el-table
            :data="vsia_list"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            max-height="500"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_group"
              label="是否集团码">
              <template slot-scope="scope">
                <span v-if="scope.row.is_group === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="是否系统码">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="修改者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="修改时间">
            </el-table-column>
            <el-table-column
              prop="address"
              width="150"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" @click="dialog_submit(scope.row,scope.row.id,scope.$index, vsia_list);dialog=true">修改</el-button>
              </template>

            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            style="float: right;"
            layout="prev, pager, next"
            :page-size="5"
            prev-text=""
            :total=total>
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialog"
            width="80%"
            :before-close="handleClose">
            <ul class="dialogVisible_style" >
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>代码 ：</span>
                <el-input v-model="param.code" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span >中文描述 ：</span>
                <el-input v-model="param.descript" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span >英文描述 ：</span>
                <el-input v-model="param.descript_en" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否停用 ：</span>
                <el-radio v-model="is_halt" label="1">正常</el-radio>
                <el-radio v-model="is_halt" label="0">停用</el-radio>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否集团码 ：</span>
                <el-radio v-model="is_group" label="1">是</el-radio>
                <el-radio v-model="is_group" label="0">否</el-radio>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否系统码 ：</span>
                <el-radio v-model="is_sys" label="1">是</el-radio>
                <el-radio v-model="is_sys" label="0">否</el-radio>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialog = false">取 消</el-button>
              <el-button type="primary" @click="dialog_ensure()">确 定</el-button>

             </span>
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="签证机关设置" name="third">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 217px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px;margin-bottom: 24px" @click="organ_add();dialog_organ=true;flush()">新增</button>
          <!--证件类型-->
          <el-table
            :data="visa_office_list"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            max-height="500"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_group"
              label="是否集团码">
              <template slot-scope="scope">
                <span v-if="scope.row.is_group === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="是否系统码">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="修改者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="修改时间">
            </el-table-column>
            <el-table-column
              prop="address"
              width="150"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="small" @click="organ_submit(scope.row,scope.row.id,scope.$index, visa_office_list);dialog_organ=true">修改</el-button>
              </template>

            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            style="float: right;"
            layout="prev, pager, next"
            :page-size="5"
            prev-text=""
            :total=total>
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialog_organ"
            width="80%"
            :before-close="handleClose">
            <ul class="dialogVisible_style" >
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>代码 ：</span>
                <el-input v-model="param.code" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span >中文描述 ：</span>
                <el-input v-model="param.descript" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span >英文描述 ：</span>
                <el-input v-model="param.descript_en" placeholder="请输入内容"  style="width: 217px;"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否停用 ：</span>
                <el-radio v-model="is_halt" label="1">正常</el-radio>
                <el-radio v-model="is_halt" label="0">停用</el-radio>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否集团码 ：</span>
                <el-radio v-model="is_group" label="1">是</el-radio>
                <el-radio v-model="is_group" label="0">否</el-radio>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>是否系统码 ：</span>
                <el-radio v-model="is_sys" label="1">是</el-radio>
                <el-radio v-model="is_sys" label="0">否</el-radio>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="organ_delete()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialog_organ = false">取 消</el-button>
              <el-button type="primary" @click="organ_ensure()">确 定</el-button>

             </span>
          </el-dialog>

        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
    export default {
        name: "papers",
      data() {
        return {
          activeName2: 'first',
          input: '',
          Edite:true,//标志位
          delete_id:false,//删除的显示与隐藏
          id:'',//所修改喝删除选择的id
          index:'',//所删除选择的index
          dialogVisible:false,//一般证件类型的显示隐藏
          dialog:false,//签证代码设置
          dialog_organ:false,//签证机关设置
          tableData: [], //获取证件列表
          total:10,//总页数
          pagesize:10,//一页显示的数量
          vsia_list:[],//获取签证列表
          visa_office_list:[],//签证机关设置列表
          /*
          * 一般证件类型的内容
          * */
          param:{},
          id_code:"idcode",//一般证件类型
          code:'',
          is_halt:'',//是否停用
          is_sys:'',//是否系统码
          is_group:'',//是否集团码
          descript_en:'',//英文说明
          descript:'',//中文说明

        // 签证代码设置
          visaid:'visaid',//签证代码设置
        // 签证机关设置
          visaunit:'visaunit'

        }
      },
      created: function () {
        let that = this;
        //获取证件列表
        that. papers_id();
        //获取签证列表
        that. visa_id();
        //获取签证设置的列表
        that.visa_office()

      },
      methods: {

        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            code:"",//代码
            descript_en:'',//英文说明
            descript:'',//中文说明
          }
          that.is_halt="",//是否停用
          that.is_sys ="",//是否系统吗
          that.is_group=""//是否集团码

        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          let that = this;
          //获取信息列表
          that.$axios({
            "url":" http://47.98.113.173:8095/v1/system/settings/get_code_base_list/?parent_code=idcode&page_size=300&page=2&ordering=-modify_datetime",
            "method": "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            data:{
              pagesize:that.pagesize,
              page:curPage
            },
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //封装获取证件类型设置
          papers_id(){
          let that= this;
          //获取信息列表
          that.$axios({
            url:" http://47.98.113.173:9103/v1/system/settings/get_code_base_list/?page_size=100&parent_code=idcode&ordering=-modify_datetime",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.tableData=res.data.data.results;
                that.total=res.data.data.count;
              }
              else{
                 console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取签证类型设置
        visa_id(){
          let that= this;
          //获取信息列表
          that.$axios({
            "url":" http://47.98.113.173:9103/v1/system/settings/get_code_base_list/?page_size=100&parent_code=visaid&ordering=-modify_datetime",
            "method": "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.vsia_list=res.data.data.results;
                that.total=res.data.data.count;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装签证机关设置
        visa_office(){
          let that= this;
          //获取信息列表
          that.$axios({
            url:" http://47.98.113.173:9103/v1/system/settings/get_code_base_list/?page_size=100&parent_code=visaunit&ordering=-modify_datetime",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.visa_office_list=res.data.data.results;
                that.total=res.data.data.count;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

      //新增一般证件类型
        add(){
          let that = this;
          that.delete_id = false;

        },
        //新增和修改一般证件类型后的保存
        ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?("http://47.98.113.173:9103/v1/system/settings/update_code_base/" + that.id + '/') : ("http://47.98.113.173:9103/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:that.id_code,
                code:that.param.code,
                is_halt:parseInt(that.is_halt),//是否停用
                is_sys:parseInt(that.is_sys),//是否系统码
                is_group:parseInt(that.is_group),//是否集团码
                descript_en:that.param.descript_en,//英文说明
                descript:that.param.descript,//中文说明
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.papers_id();
                  that.dialogVisible = false
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        //一般证件类型的修改
        submit(srow,id,index){
          let that = this;
          that.Edite = true;
          that.delete_id=true;
          that.id = srow.id;//所选择的id
          that.index = index;
          console.log(srow,id,index);
          that.param.code = srow.code;
          that.param.descript_en=srow.descript_en;
          that.param.descript = srow.descript;
          that.is_halt = srow.is_halt+"";//是否停用
          that.is_sys =srow.is_sys+"";//是否系统吗
          that.is_group=srow.is_group+"";//是否集团码
        },
        //一般证件类型的删除
        cancel(){
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
            that.tableData.splice(that.index, 1);
            that.$axios({
              url:"http://47.98.113.173:9103/v1/system/settings/remove_code_base/" + that.id + '/',
              method: "post",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  that.papers_id();
                  that.dialogVisible = false
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


        /**
         * 签证代码设置
         *
         * */
        //新增
        increase(){
          let that = this;
          that.delete_id = false;
        },
        //新增后和修改后的保存
        dialog_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?("http://47.98.113.173:9103/v1/system/settings/update_code_base/" + that.id + '/') : ("http://47.98.113.173:9103/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:that.visaid,
                code:that.param.code,
                is_halt:parseInt(that.is_halt),//是否停用
                is_sys:parseInt(that.is_sys),//是否系统码
                is_group:parseInt(that.is_group),//是否集团码
                descript_en:that.param.descript_en,//英文说明
                descript:that.param.descript,//中文说明
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.visa_id();
                  that.dialog = false
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        //修改
        organ_submit(srow,id,index){
          let that = this;
          that.Edite = true;
          that.delete_id=true;
          that.id = srow.id;//所选择的id
          that.index = index;
          console.log(srow,id,index);
          that.param.code = srow.code;
          that.param.descript_en=srow.descript_en;
          that.param.descript = srow.descript;
          that.is_halt = srow.is_halt+"";//是否停用
          that.is_sys =srow.is_sys+"";//是否系统吗
          that.is_group=srow.is_group+"";//是否集团码
        },
        //删除
        dialog_cancel(){
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
            that.vsia_list.splice(that.index, 1);
            that.$axios({
              url:"http://47.98.113.173:9103/v1/system/settings/remove_code_base/" + that.id + '/',
              method: "post",
              data:{
                parent_code:that.visaid,
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  that.visa_id();
                  that.dialog = false
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


       /**
        *
        * 签证机关设置
        *
        * */

       //新增
       organ_add(){
         let that = this;
         that.delete_id = false;
       },
        //新增后和修改后的保存
        organ_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?("http://47.98.113.173:9103/v1/system/settings/update_code_base/" + that.id + '/') : ("http://47.98.113.173:9103/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:that.visaunit,
                code:that.param.code,
                is_halt:parseInt(that.is_halt),//是否停用
                is_sys:parseInt(that.is_sys),//是否系统码
                is_group:parseInt(that.is_group),//是否集团码
                descript_en:that.param.descript_en,//英文说明
                descript:that.param.descript,//中文说明
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that. visa_office();
                  that.dialog_organ = false
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        //修改
        dialog_submit(srow,id,index){
          let that = this;
          that.Edite = true;
          that.delete_id=true;
          that.id = srow.id;//所选择的id
          that.index = index;
          console.log(srow,id,index);
          that.param.code = srow.code;
          that.param.descript_en=srow.descript_en;
          that.param.descript = srow.descript;
          that.is_halt = srow.is_halt+"";//是否停用
          that.is_sys =srow.is_sys+"";//是否系统吗
          that.is_group=srow.is_group+"";//是否集团码
        },
        //删除
        organ_delete(){
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
            that.visa_office_list.splice(that.index, 1);
            that.$axios({
              url:"http://47.98.113.173:9103/v1/system/settings/remove_code_base/" + that.id + '/',
              method: "post",
              data:{
                parent_code:that.visaunit,
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  that.visa_office();
                  that.dialog_organ = false
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
      },

    }
</script>

<style lang="less" scoped>
  .papers{
    width: 99%;
    margin-left: 20px;
    .title{
      width:100%;
      height: 50px;
      span{
        display: inline-block;
        height: 66px;
        line-height: 70px;
        vertical-align: top;
        margin-left: 10px;
      }
    }
    .label{
      margin-top: 18px;
      .contentTitle{
        width: 100% ;
        height: 40px;
       // min-width: 1000px;
        background: #68819EFF;
        margin-top: 16px;
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
        //min-width: 1000px;
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
      .search{
        width: 100%;
        height: 50px;
        background:rgba(247,247,247,1);
        span{
          margin: 0  16px;
        }
        input{
          width: 200px;
          height: 40px;
          margin: 5px 0;
          padding-left: 5px;
        }
        button{
          width: 80px;
          height: 40px;
          border: none;
          border-radius: 4px;
          background:#4488E9FF ;
          outline: none;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .dialogVisible_style{
      overflow: hidden;
      li{
        width: 50%;
       float: left;
        margin-bottom: 10px;
        span{
          display: inline-block;
          width: 80px;
        }
      }
    }

  }
</style>

<style>
  /*.el-table .cell{*/
    /*text-align:center;*/
  /*}*/
</style>
