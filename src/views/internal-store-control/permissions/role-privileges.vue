<template>
  <div class="role-privileges">
    <div class="paging-title" style="position: relative" >
      <span >角色 ： </span>
        <img src="../../../../src/assets/images/internal-store-control/add.png" alt=""  @click="dialogVisible_role = true;plot()" style="position: absolute;top: 0px" >
      <!--新增角色出现的页面-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible_role"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <ul class="mask_information">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >角色名</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >角色组 ：</span>
            <el-select v-model="role_group " placeholder="请选择">
              <el-option
                v-for="item in role_set"

                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容"  style="width: 217px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >酒店 ：</span>
            <el-select v-model="hotel_id" placeholder="请选择">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li style="width: 317px;">
            <i style="color: red;font-size: 18px">*</i>
            <span>状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>
          <li>
            <span style="margin-left: 10px">中文备注 ：</span>
            <el-input v-model="param.desc"   style="width: 217px;margin-left: 12px"   placeholder="请输入内容"></el-input></li>
          <li>
            <span  style="margin-left: 10px">英文备注 ：</span>
            <el-input v-model="param.desc_en"  style="width: 217px;"     placeholder="请输入内容"></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_role = false">取 消</el-button>
          <el-button type="primary" @click=" saveInfo_role()">确 定</el-button>
        </span>
      </el-dialog>
      <!--新增权限出现的页面-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible_rower"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <ul class="mask_information">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >权限名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入内容"  style="width: 217px;" ></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >权限组 ：</span>
            <el-select v-model="rule_groups" placeholder="请选择">
              <el-option
                v-for="item in permission_group"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >代码 ：</span>
            <el-input v-model="param.code " placeholder="请输入内容"   style="width: 217px;" ></el-input>
          </li>
          <li style="width: 400px;">
            <i style="color: red;font-size: 18px">*</i>
            <span>状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>
          <li>
            <span style="margin-left: 10px">中文备注 ：</span>
            <el-input v-model="param.desc"    style="width: 217px;"   placeholder="请输入内容"></el-input></li>
          <li>
            <span style="margin-left: 10px">英文备注 ：</span>
            <el-input v-model="param.desc_en"   style="width: 217px;"     placeholder="请输入内容"></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_rower = false">取 消</el-button>
          <el-button type="primary" @click=" saveInfo_rower()">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑权限出现的页面-->
      <el-dialog
        title="编辑权限"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <!--<span style="display: inline-block;width: 290px;">可选择的权限</span>-->
        <p style="display: inline-block;width: 198px;">编辑权限角色 ：<span style="color:#4488e9"> {{authority}}</span></p>
        <ul class="mask_information" style="overflow: hidden;">
          <tree-transfer :title="title" :from_data='bind_list' :to_data='toData'  :defaultProps="{label:'name'}"
                             @addBtn='add' @removeBtn='remove' :mode='mode' height='450px'  width="700px" style="float: left">   
          </tree-transfer>

        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false; ensure()">确 定</el-button>
        </span>
      </el-dialog>
    <!--编辑API-->
      <el-dialog
        title="编辑API"
        :visible.sync="dialogVisibleApi"
        width="60%"
        :before-close="handleClose">
        <p style="display: inline-block;width: 198px;">编辑API权限名称 ：<span style="color:#4488e9"> {{authority}}</span></p>
        <ul style="overflow: hidden">
          <div style="float: left">
            <el-input v-model="arg" placeholder="请输入内容" style="width: 210px;float: left;margin-top: 10px"></el-input>
            <el-radio v-model="the_type" label="0" style="margin-top: 20px;margin-left: 10px">名字</el-radio>
            <el-radio v-model="the_type" label="1" >url</el-radio>
            <button @click="refer_type" style=" width: 80px;height: 30px; margin-left: 10px ; border: none;outline: none; margin-right: 28px;background:rgba(68,136,233,1); border-radius:4px; color: white;">查询</button>
            <el-select v-model="main_api"  clearable placeholder="请选择主api">
              <el-option
                v-for="item in check_data"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <el-transfer
            v-model="checkedNames"
            style="float: left;"
            :props="{key: 'id',label: 'name'}"
            :titles="['权限未拥有API', '权限已添加API ']"
            @change="handleChange"
            :data="api_list"
          ></el-transfer>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleApi = false ;cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleApi = false; saveInfo_api()">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改角色-->
      <el-dialog
        title=""
        :visible.sync="amend_role"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <!--点击角色上的修改弹出的蒙版-->
        <ul class="mask_information" >
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >角色名</span>
            <el-input v-model="part_name" placeholder="请输入内容"  style="width: 217px;" ></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >角色组</span>
            <!--<el-input v-model="name" placeholder="请输入内容" style="width: 300px;"></el-input>-->
            <el-select v-model="role_group" placeholder="请选择">
              <el-option
                v-for="item in role_set"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >代码</span>
            <el-input v-model="code" placeholder="请输入内容"  style="width: 217px;" ></el-input></li>
          <li>
            <span style="margin-left: 10px">状态</span>
            <el-input v-model="status" placeholder="请输入内容" :disabled="true"  style="width: 217px;"></el-input></li>
          <li>
            <span style="margin-left: 10px">中文备注</span>
            <el-input v-model="desc"  style="width: 217px;"  placeholder="请输入内容" ></el-input></li>
          <li>
            <span style="margin-left: 10px">英文备注</span>
            <el-input v-model="desc_en" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
          <li>
            <span style="margin-left: 10px">酒店</span>
            <el-input v-model="hotel_id"   style="width: 217px;"  :disabled="true"  placeholder="请输入内容"></el-input></li>
          <li style="width: 300px;height: 40px" ></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="amend_role = false">取 消</el-button>
          <el-button type="primary" @click=" preserve()">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改权限-->
      <el-dialog
        title=""
        :visible.sync="revamp_rower"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <ul class="mask_information" >
          <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >权限名称</span>
            <el-input v-model="permission_name" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >权限组</span>
            <el-select v-model="rule_groups" placeholder="请选择">
              <el-option
                v-for="item in permission_group"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span >状态</span><el-select v-model="status_bar" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          </li>
          <li>
            <span style="margin-left: 10px">中文备注</span>
            <el-input v-model="chinese_name" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
          <li>
            <span style="margin-left: 10px">英文备注</span>
            <el-input v-model="english_name" style="width: 217px;"   placeholder="请输入内容"></el-input></li>
          <li>
            <span style="margin-left: 10px">关联页面</span>
            <el-input v-model=" associated"   style="width: 217px;":disabled="true"    placeholder="请输入内容"></el-input></li>

        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="revamp_rower = false">取 消</el-button>
          <el-button type="primary" @click=" keep()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="seek"   style="display: inline-block;margin-left: 150px ;margin-top: 10px">
      <el-input v-model="seek_rolename" placeholder="请输入角色名" clearable  style="width: 217px;height: 30px;line-height: 30px" ></el-input>
      <el-select v-model="seek_rolegroup" placeholder="请选择角色组" clearable   style="height: 30px;line-height: 30px;margin-right: 10px">
        <el-option
          v-for="item in role_set"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <button  @click = grabble_role()>搜索</button>
    </div>
    <div class="paging">
      <!--列表-->
      <el-table
        :data="newlists"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',width:'100%',textAlign:'center'}"
        height="288px"
        size="mini"
        stripe>
        <el-table-column
          prop="name"
          fixed
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="role_group.name"
          label="角色组">
        </el-table-column>
        <el-table-column
          prop="code"
          label="代码">
        </el-table-column>
        <el-table-column
          prop="status "
          label="状态">
          <!--传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">禁用</span>
            <span v-else>可用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="中文备注">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文备注">
        </el-table-column>
        <el-table-column
          prop="hotel_id.short_name"
          label="酒店">
        </el-table-column>
        <el-table-column
          prop="address"
          width="240 "
          label="操作"
          fixed="right"
        >
          <!-- v-if="scope.row.is_sys===0"-->
          <template slot-scope="scope"  >
            <el-button @click="cancels(scope.row.id,scope.$index, newlists)"type="danger" size="mini" >删除</el-button>
            <el-button  size="mini" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
            <el-button   size="mini"  @click="compile_power(scope.row,scope.row.id,scope.$index, newlists) ">编辑权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;"
                     layout="prev, pager, next"
                     :page-size="pagesizes"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
    <!--权限-->
    <div class="rule" style="position: relative">
      <span style="" > 权限 ：</span>
        <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="position: absolute;top: 14px"@click="dialogVisible_rower = true;flush()">
      <div class="seek"   style="display: inline-block;margin-left: 150px ;margin-top: 10px">
        <el-input v-model="seek_rulename" placeholder="请输入权限名" clearable  style="width: 217px;height: 30px;line-height: 30px" ></el-input>
        <el-select v-model="seek_rulegroup" placeholder="请选择权限组" clearable    style="height: 30px;line-height: 30px;margin-right: 10px">
          <el-option
            v-for="item in permission_group"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <button   @click = grabble_rule()>搜索</button>
      </div>
      <div class="paging">
        <!--列表-->
        <el-table
          :data="rulelists"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center',}"
          style="height: 330px"
          size="mini"
          stripe>
          <el-table-column
            prop="name"
            fixed
            label="权限名称">
          </el-table-column>
          <el-table-column
            prop="rule_group.name"
            label="权限组">
          </el-table-column>
          <el-table-column
            prop="status "
            label="状态">
            <!--传过来的值改变格式-->
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">禁用</span>
              <span v-else>可用</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            width="190"
            label="中文备注">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            label="英文备注">
          </el-table-column>
          <el-table-column
            prop="page_id.desc"
            label="关联页面">
          </el-table-column>
          <el-table-column
            width="240"
            prop="address"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button @click="cance(scope.row.id,scope.$index, rulelists)"type="danger" size="mini">删除</el-button>
              <el-button   size="small" @click="revision(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
              <el-button   size="small" @click="compile(scope.row,scope.row.id,scope.$index, newlists)" >编辑API</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination style="float: right;"
                       layout="prev, pager, next"
                       :page-size="pagesize"
                       @current-change="permissionPage"
                       :total="power_total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import treeTransfer from 'el-tree-transfer';
  let id = 1000;
    export default {
        name: "role-privileges",
      props:{
        role_set:{type:Array,required:true},
        permission_group:{type:Array,required:true}
      },
      data(){
        return{
        title:["角色未拥有权限","角色已添加权限"],
          the_type:'0',//api筛选
          arg:'',//api筛选
          param :{},//新增权限的内容
          Edite : true, //标志位 判断的是新增还是更新
          mode: "transfer", // transfer addressList
          options: [{
            value: '0',
            name: '禁用'
          }, {
            value: '1',
            name: '可用'
          }],
          url_api:'http://47.98.113.173:9519',
          value: '',
          /**
           * 角色组的筛选
           * */
          seek_rolegroup:'',//筛选
          seek_rolename:'',//筛选角色名字
          /**
           * 权限组的筛选
           * */
          seek_rulename:'',//权限组名称
          seek_rulegroup:'',//所选权限组

          normal:"1",//新增角色的状态
          radio:'1',//单选
          pagesizes:4,//代表角色每页的条数
          pagesize:5, //代表每页显示的条数
          total:0,//代表总条数
          power_total:0,//代表全部权限总条数
          dialogVisible: false,//编辑权限显示隐藏
          dialogVisibleApi:false,//编辑API显示隐藏
          dialogVisible_role:false,//新增角色的显示隐藏
          dialogVisible_rower:false,//新增权限显示隐藏
          amend_role:false,//修改角色
          revamp_rower:false,//修改权限
          id:'',//修改此项的id 传给后台
          authorization_token:'',//获取token值
          newlists:[],//角色组
          rulelists:[],//权限组
          bind_list:[],//权限组树形
          // 蒙版里的角色信息
          part_name:'',////角色名
          role_group:'',//角色组
          roles_id:'',//传给后台的所选择的角色组id
          code:'',//代码
          status:'',//状态
          desc:'',//中文备注
          desc_en:'',//英文备注
          hotel_id:'',//酒店
          grogshop_id:'',//点击修改后传给后台的酒店id
          role_sets:[],//接受后台返回的角色组渲染蒙版层里的角色组
          root_id:'',//模块种类
          has_entry:'',//模块类型
          url:'',//链接
          creator:'',//创建人
          create_time:'',//创建时间
          last_time:'',//修改时间
          parent_id:'',//父级模块
          newlists:[],//接受后端传过来的数据
          setpro:false,//模块树上的图标显示和隐藏
          save_add:false,//点击加号显示的保存和取消
          save_childen:false,//点击自身图标显示的保存和取消
          save_preserve:false,//点击修改显示的保存和取消
        //  蒙版里的权限信息
          permission_name:'',//权限名称
          api:'',//API
          status_bar:'',//状态
          chinese_name:'',//中文备注
          english_name:'',//英文备注
          associated:'',//关联页面
          associated_id:'',//关联页面的id
          permission_name_id:'',//权限修改传给后台的id
          /*
          * 新增角色上用到的
          * */
          hotel_list:[],



        /*
        * 新增角色里的内容
        * */
          name:'',//角色名
          // role_group:'',//角色组
          code:'',//代码
          hotel_id:'',//酒店id
          status:'',//状态
          desc:'',//中文备注
          desc_en:'',//英文备注

         /*新增权限*/
          rule_groups:'',//权限组

        //编辑APi
          site_api:'',//api搜索的内容
          checked:false,
          api_list:[],//APi列表
          authority:'',//所选中的权限名
          checkedNames:[],//选中的所有API的id
          check_data:[],
          main_api:'',//所选择主api
          toData:[],//选中的所有的权限
          permission_id:'',//选择到的权限的id
          role_id:"",//选择到的角色的id
          direction_tf:"",//判断点击的是left还是right
        }
      },
      created:function () {
        let that=this;
        //获取角色信息列表
        that.part();
        //获取权限列表
        that.power();
        that.hotel()

      },
      components:{ treeTransfer }, // 注册
      methods:{
        handleChange(value, direction, movedKeys) {
          let that = this;


          // console.log(direction);
          // console.log(movedKeys);//发生移动数据的数组
          //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
          if(direction === "right") {
            that.direction_tf="1";
            for(let i in value){
              for(let item in that.api_list){
                if(value[i]===that.api_list[item].id){
                  that.check_data.push(that.api_list[item])
                }

              };
              console.log(that.check_data);
            }
          }
          if(direction === "left") {
            that.direction_tf="2";
            console.log(value);
            // for(let i in value){
            //   for(let item in that.check_data){
            //     if(value[i]!==that.check_data[item].id){
            //       that.check_data.push(that.check_data[item])
            //     }
            //
            //   };
            //   console.log(that.check_data);
            // }

          }


      },


        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            code:'',//说明
            name:'',//名字
            desc:'',//中文描述
            desc_en:'',//英文描述
          }
          that.rule_groups='',//权限组
          that.normal=''//状态

        },

        /**
        * plot  用来刷新角色的数据
        * */

        plot(){
          let  that = this;
          that.param = {
            name:'',//角色名
            code:'',//代码
            desc:'',//中文备注
            desc_en:'',//英文备注
          }
            that.role_group='',//角色组,//权限组
            that.normal='',//状态
            that.hotel_id=''//酒店id

        },

        //封装获取酒店的信息
        hotel(){
          let that=this;
          that.$axios({
            "url": ""+that.url_api+"/v1/common/dept/get_tree",
            "method": "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.hotel_list=res.data.data;
                // that.bit= res.data.data.list[0].id
                // that.hotel();
              }
              else{
                that.error(res.data.message);
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //封装获取角色信息列表
        part(){
          let that=this;
          that.$axios({
            "url": ""+that.url_api+"/v1/common/role/info_list",
            "method": "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                that.newlists=res.data.data.list;
                that.total=res.data.data.total_count;

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取权限列表
        power(){
          let that=this;
         that.$axios({
           "url":that.url_api+"/v1/common/rule/info_list",
           "method": "get",
           headers:{
             authorization:sessionStorage.getItem("authorization"),
           }
         })
           .then(res => {
             if (res.data.message=="success"){
               console.log(res.data.data);
               // var resp = res.data.data;
               // var new_lists = resp['list'];
               // var total_count= resp['total_count'];
               that.rulelists=res.data.data.list;
               that.power_total=res.data.data.total_count;
               console.log(that.rulelists)
             }
             else{
               // console.log(resp.data.message);
             }
           })
           .catch(error => {
             console.log(error);
           });
       },

        //封装获取Api
        api_methodes(){
          let that=this;
          that.$axios({
            "url": ""+that.url_api+"/v1/common/api/info_list",
            "method": "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                // console.log(res.data.data.list);
                that.api_list=res.data.data.list;
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //如果认证错误
        new_authorization(msg){
          let that=this;
          if(msg==="authorization invalid"){
            that.authorization()
          }
        },

        /**
         * 角色的筛选
         *
         * */
        grabble_role(){
          let that = this;
            that.$axios({
              "url": "" + that.url_api + "/v1/common/role/info_list",
              "method": "post",
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              },
              data: {
                role_group_id: that.seek_rolegroup,//筛选
                role_name: that.seek_rolename,//筛选角色名字
              }
            })
              .then(res => {
                if (res.data.message == "success") {
                  console.log(res);
                  that.newlists = res.data.data.list;
                  that.total = res.data.data.total_count;

                }
                else {
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
        },

        /**
         *
         *权限的筛选
         * */
        grabble_rule(){
          let that=this;
          that.$axios({
            "url":that.url_api+"/v1/common/rule/info_list",
            "method": "post",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            },
            data:{

              rule_group_id:that.seek_rulegroup,//权限组名称
              rule_name:that.seek_rulename,//所选权限组
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.rulelists=res.data.data.list;
                that.power_total=res.data.data.total_count;
                console.log(that.rulelists)
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
       /**
        *
        * API筛选
        *
        * */
       refer_type(){
         let that=this;
         that.$axios({
           "url": ""+that.url_api+"/v1/common/api/info_list",
           "method": "post",
           headers:{
             authorization:sessionStorage.getItem("authorization"),
           },
           data:{
             arg:that.arg,
             the_type:that.the_type+"",
           }
         })
           .then(res => {
             if (res.data.message==="success"){
               console.log(res.data.data.list);
               that.api_list=res.data.data.list;
             }
             else{
              console.log(res.data.data.message)
             }
           })
           .catch(error => {
             console.log(error);
           });
       },

        // 监听穿梭框组件添加
        add(fromData,toData,obj){
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('toData',toData);
          console.log('obj',obj);

          let that= this;
          that.toData=toData;

        },
        // 监听穿梭框组件移除
        remove(fromData,toData,obj){ 
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('fromData',fromData);
          console.log('toData',toData);
          console.log('obj',obj);
          let that = this;
          that.toData=toData;
          that.rolePrivileges();
        },

        //增加权限的显示隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },


        //封装转换角色组
          role_id_name(flag,data){
          // flag为1的时候code转desc
      for(let i in list){
        if(flag && data==list[i].code){
        return list[i].desc
      }else if(!flag && data==list[i].desc){
        return list[i].code
      }
    }
  },

        /*
        * 点击角色
        * */
        //点击角色分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            "url": ""+that.url_api+"/v1/common/role/info_list",
            "method": "get",
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
        //点击角色上的修改弹出蒙版层
        submit(srow,id,index,list){
          this.amend_role=true;
          this.id=id;
          console.log(srow);
          this.part_name=srow.name;
          this.role_group=srow.role_group
          this.code=srow.code;//代码
          //状态
          if(srow.status===0){
            this.status="禁用"
          }else if (srow.status===1){
            this.status="可用"
          }
          this.desc=srow.desc;//中文备注
          this.desc_en=srow.desc_en;//英文备注
          if(srow.hotel_id===null){
            this.hotel_id=srow.hotel_id;//酒店
          }else {
            this.hotel_id=srow.hotel_id.full_name
          }
          if(srow.hotel_id===null){
            this.grogshop_id=srow.hotel_id
          }else{
            this.grogshop_id=srow.hotel_id.id  //传给后台的酒店id
          }


        },
        //点击角色上的删除
        cancels(id,index,list){
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
              url:""+this.url_api+"/v1/common/role/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.part();
                  this.masking=false;
                }
                  // location.reload(); // 强制刷新
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
        //点击角色修改蒙版的保存
        preserve(){
          let that = this
          if(!that.part_name || !that.code  ||!that.role_group){
            that.hintInfo("warning","*为必填项")
          }else {
          if ( that.status=="可用"){
            that.status=1
          }else if(that.status=="禁用"){
            that.status=0
          };
          console.log("保存");
          console.log(this.creator)
          that.$axios({
            url:that.url_api+"/v1/common/role/update/"+that.id,
            method: "post",
            data:{
              name:that.part_name,
              code:that.code,
              desc:that.desc,
              desc_en:that.desc_en,
              status:that.status,
              hotel_id:that.grogshop_id,
              role_group:that.role_group.id,

            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
                that.part();
                that.amend_role=false;
              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })
          }
        },
        //点击角色新增后的保存
        saveInfo_role(){
          let that=this;
          if(!that.param.name || !that.role_group || !that.param.code ||!that.hotel_id ||!that.normal){
            this.hintInfo("warning","*为必填项")
          }else {
            if (that.normal == "0") {
              that.normal = 0
            } else if (that.normal == "1") {
              that.normal = 1
            }
            that.$axios({
              "url": "" + that.url_api + "/v1/common/role/add",
              "method": "post",
              data: {
                name: that.param.name,//角色名
                role_group: that.role_group,//角色组
                code: that.param.code,//代码
                hotel_id: that.hotel_id,//酒店id
                status: that.normal,//状态
                desc: that.param.desc,//中文备注
                desc_en: that.param.desc_en,//英文备注
                hotel_group_id:parseInt(sessionStorage.getItem("group_id"))
              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res => {
                if (res.data.message == "success") {
                  // console.log(res);
                  that.dialogVisible_role = false;
                  that.part();
                }
                else {
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        },


         /*
         * 点击权限
         * */
         //点击新增权限后的保存
        saveInfo_rower(){
          let that=this;
          if(! that.param.name ||!that.rule_groups ||!that.param.code  ||!that.normal){
            that.hintInfo("warning","*为必填项")
          }else {
          that.$axios({
            url: that.url_api+"/v1/common/rule/add",
            method: "post",
            data:{
              name:that.param.name,//角色名
              rule_group :that.rule_groups ,//权限组
              code:that.param.code,//代码
              status:that.normal+"",//状态
              desc:that.param.desc,//中文备注
              desc_en:that.param.desc_en,//英文备注
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                that.dialogVisible_rower = false;
                that.power();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

          }
        },

        //点击权限上的修改弹出蒙版层
        revision(srow,id,index,list){
          console.log(srow, id);
          this.revamp_rower=true;
          this.permission_name=srow.name;//权限名称
            this.api=srow.url;//API
            this.status_bar=srow.status;//状态
              if(srow.status===0){
                this.status_bar="禁用"
              }else  if(srow.status===1){
                this.status_bar="可用"
              }
              if(srow.rule_group===null){
                this.rule_groups=""
              }else {
                this.rule_groups=srow.rule_group.id
              }
            // this.rule_groups=srow.rule_group.name
            this.permission_name_id=srow.id;//id
            this.chinese_name=srow.desc;//中文备注
            this.english_name=srow.desc_en;//英文备注
          if(srow.page_id===null){
            this.associated=srow.page_id;//关联页面
          }else {
            this.associated=srow.page_id.name;//关联页面
          }

          // this.associated_id = srow.page_id.id
          console.log(this.permission_name_id);

        },

        //点击权限上的删除
        cance(id,index,list){
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
              url:""+this.url_api+"/v1/common/rule/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.power();
                }
                // location.reload(); // 强制刷新
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

        //点击权限上的修改后的保存
        keep(){
          let that = this;
          if(!that.permission_name || !that.rule_groups || !that.status_bar ){
            that.hintInfo("warning","*为必填项")
          }else {
            if (that.status_bar == "可用") {
              that.status_bar = 1
            } else if (that.status_bar == "禁用") {
              that.status_bar = 0
            };
            that.$axios({
              url: that.url_api + "/v1/common/rule/update/" + that.permission_name_id,
              // url:'http://192.168.2.154:9519/v1/common/rule/update/'+this.permission_name_id,
              method: "post",
              // params:{},
              data: {
                name: that.permission_name,
                desc: that.chinese_name,
                desc_en: that.english_name,
                status: that.status_bar,
                url: that.api,
                rule_group: that.rule_groups,
                // page_id: that.associated_id,

              },
              headers: {
                authorization: sessionStorage.getItem("authorization"),
              }
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  // location.reload();  //强制刷新
                  that.power();
                  that.revamp_rower = false;
                  // console.log(that.permission_name);

                } else {
                  console.log(res.data.message)
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        },

        //点击编辑权限出现的页面
        compile_power(id,index){
          let that = this;
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2){
            console.log(id);
            that.toData=[];
            that.authority=id.name;
            that.role_id=id.id;
            that.rolePrivileges();//获取所有权限
            that.role_referrer();//查询角色已有权限
            that.dialogVisible = true;
          }else{
            that.hintInfo("warning","您没有此操作的权限")
          }


        },

        //封装获取角色权限--树形格式
        rolePrivileges(){
          let that = this;
          that.$axios({
            url: ""+that.url_api+"/v1/common/rule_group/get_tree",
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.bind_list=res.data.data;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
      //查看角色已有的权限
        role_referrer(){
          let that = this;
          console.log(that.role_id);
          that.$axios({
            url: ""+that.url_api+"/v1/common/role/get_tree",
            method: "post",
            data:{
              role_id:that.role_id,
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.toData=res.data.data;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击编辑权限后的保存
        ensure(){
          console.log(this.role_id);
          let that=this;
          //传给后台两个值
          //1：所点击的角色的id   that.role_id
          //2：所选中的权限组    that.role_checked
         that.toData.forEach(item =>{
            console.log(item.id)
          });
            that.$axios({
              url: ""+that.url_api+"/v1/common/role/bind_rule",
              method: "post",
              data:{
                role_id:that.role_id,//所点击的id
                rules:JSON.stringify(that.toData),//选中的api
              },
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
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
        //点击API出现的页面
        compile(id,index){
          console.log(id);
          let that= this;
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2) {
            that.checkedNames = [];
            that.authority = id.name;
            that.permission_id = id.id;
            // console.log( that.permission_id)
            that.api_methodes();
            that.bind_api();
            that.dialogVisibleApi = true;
          }else {
            that.hintInfo("warning","您没有此操作的权限")
          }
        },
        //封装获得已有的api
        bind_api(){
          let that = this;
          that.$axios({
            url: ""+that.url_api+"/v1/common/api/info_list",
            method: "post",
            data:{
              rule_id:that.permission_id,
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.check_data= res.data.data.list;
                that.main_api = that.check_data[0].id
                // 遍历拿到所需要API
                res.data.data.list.forEach(item =>{
                  that.checkedNames.push(item.id)
                });
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //点击编辑Api后到的保存
        saveInfo_api(){
          console.log(this.checkedNames);
          let that=this;
            that.$axios({
              url: ""+that.url_api+"/v1/common/rule/bind_api",
              method: "post",
                data:{
                rule_id:that.permission_id,//所点击的id
                apis:JSON.stringify(that.checkedNames),//选中的api
                main_api:that.main_api,
          },
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data);
                  that.checkedNames=[];
                }
                else{
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });

        },

        //api里的api搜索
        searches(){
          let that=this;
          that.$axios({
            url: ""+that.url_api+"/v1/common/api/info_list",
            method: "post",
            data:{
              name:that.site_api,
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.api_list=res.data.data.list;
                console.log(that.rulelists)
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },

        //权限分页
        permissionPage(page){
          let that=this
          console.log(page) // 当前页}
          //获取信息列表
          that.$axios({
            "url": ""+that.url_api+"/v1/common/rule/info_list",
            "method": "get",
            params:{
              page_num:page,
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
                that.rulelists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },


    //点击取消
        cancel(){
          let that=this;
          that.permission="";
          that. power();
        },

        //点击蒙版的取消
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
  .role-privileges{
   width:calc(100% - 100px);
    margin-left: 32px;

    .paging-title{
      display: inline-block;
      /*height: 42px;*/
      /*line-height:68px;*/
      /*margin-bottom: 20px;*/
       div{
         display: inline-block;
         float: right;

       }
      .dialog-style{
        .mask_information{
          overflow: hidden;
          li{
            float: left;
            margin-right: 10%;
            height: 60px;
            span{
              display: inline-block;
              width: 100px;
              text-align:left ;

            }
          }
        }
      }
    }
    .seek{
      button{
        width:90px;
        height:30px;
        border: none;
        outline: none;
        margin-right: 28px;
        background:rgba(68,136,233,1);
        border-radius:4px;
        color: white;
      }
    }
    .paging_rule{
      /*width: 97%;*/
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
    .paging{
      /*width: 97%;*/
      margin-top: 20px;
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
            height: 30px;
            line-height: 30px;
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
<style >
 .el-transfer-panel{
    width: 317px;
   margin-top: 10px;
    height: 460px;
  }
 .el-transfer-panel__list{
    height: 460px;
  }

</style>
