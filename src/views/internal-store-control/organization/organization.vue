<template>
  <div class="organization">
    <div class="tree" >
          <router-link to="/organization/basic-info">
            <div class="serialNumber" style="color: black" ><span>集团信息:</span>
              <span style="margin: 0;color:#4488e9; ">{{group_name}}</span>
              <!--<span style=" font-size:26px; margin-left: 84px;margin-top: 10px;margin-bottom: 20px"  @click="group_add" >+</span>-->
            </div>

          </router-link>
          <el-select v-model="group" placeholder="请选择集团" clearable   @change="bloc"   style="margin-left: 10px">
            <el-option
              v-for="item in group_list"
              :key="item.value"
              :label="item.full_name"
              :value="item.id"

            >
            </el-option>
          </el-select>
       <div class="btn" style="margin-top: 30px">
         <button @click="group_add(); flush()" >新增集团</button>
         <button @click="hotel_add(); flush()">新增酒店</button>
       </div>
      <!--<div class="moduleTree" style="margin-top: 60px"><router-link to="/organizationchart/hotel"><span style="color: black">添加酒店</span></router-link></div>-->
          <div class="content">
            <div class="control">
              <router-link to="/organizationchart/hotel">
                <el-tree
                  :data="hotel_list"
                  node-key="node.id"
                  :expand-on-click-node="false"
                  node-contextmenu
                  @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }" >
                     <span class="my_node" :data-id="data.id " style="padding-left: 15px;">{{data.name}}</span>
                    <span style="margin-left: 50px ;position: absolute;right: 0" v-show="setpro" >
                      <!--<i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>-->
                      <!--<i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px "></i>-->
                      <i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "></i>
                    </span>
                 </span>
                </el-tree>


              </router-link>
            </div>
          </div>


    </div>
    <!--子路由-->
    <div class="router">
      <router-view    :hotelid="hotelid"   @handleClick="hande_list"  :group="group"></router-view>
      <div class="ini"><logon-view></logon-view></div>
    </div>

    <!--点击新增集团-->
    <el-dialog
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose">
      <div class="basicInfo" >
        <div class="left">
          <p>基本信息</p>
          <ul>
            <li >
              <i style="color: red;font-size: 18px">*</i>
              <span>集团全称：</span>
              <el-input v-model="full_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
            <li >
              <i style="color: red;font-size: 18px">*</i>
              <span>集团简称：</span>
              <el-input v-model="short_name " style="width: 217px" placeholder="请输入内容"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>代码：</span>
              <el-input v-model="code" placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li>
              <span style="margin-left: 10px">中文描述：</span>
              <el-input v-model="desc " placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li>
              <span style="margin-left: 10px">英文描述：</span>
              <el-input v-model="desc_en " placeholder="请输入内容" style="width: 217px"></el-input></li>
          </ul>
          <p>联系方式</p>
          <ul>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>总机：</span>
              <el-input v-model="office_tel "   placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>国家：</span>
              <el-select v-model="country_code" placeholder="请选择">
                <el-option
                  v-for="item in country_code_list"
                  :key="item.value"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </li>

            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>订房电话：</span>
              <el-input v-model="reserve_tel " placeholder="请输入内容"     style="width: 217px" ></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>州/省：</span>
              <el-input v-model="province" placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>服务电话：</span>
              <el-input v-model="service_tel" placeholder="请输入内容"   style="width: 217px">

              </el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>城市：</span>
              <el-input v-model="city" placeholder="请输入内容" style="width: 217px"> </el-input></li>
            <li>
              <span style="margin-left: 10px">传真：</span>
              <el-input v-model="fax" placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li style="height: 46px;vertical-align: top">
              <span style="margin-top: 5px;margin-left: 10px">地理位置：</span>
              <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block" >东经:</span>
              <input style="width: 50px;height:36px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_east">
              <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block">北纬：</span>
              <input style="width: 50px;height: 36px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_west">

            </li>
            <li style="height: 46px;line-height: 46px">
              <i style="color: red;font-size: 18px">*</i>
              <span>状态：</span>
              <el-radio v-model="normal" label="1">正常</el-radio>
              <el-radio v-model="normal" label="0">停用</el-radio>
            </li>
            <li>
              <span style="margin-left: 10px">官网：</span>
              <el-input v-model="web_site " placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li>
              <span style="margin-left: 10px">邮箱：</span>
              <el-input v-model="email" placeholder="请输入内容" style="width: 217px"></el-input></li>
            <li style="width: 80%;height: 260px ;border: 1px solid #eeeeee">
              <el-upload
                style=" text-align: center"
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="log" style="margin-left: 10px">
            <el-upload
              class="avatar-uploader"
              action="http://47.97.178.98:9500/resource/hotel/logo/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">添加logo</i>
            </el-upload>

          </div>
          <ul class="site">
            <li>
              <span style="margin-left: 10px">DNS ： </span>
              <el-input v-model="dns " placeholder="请输入内容" style="width: 217px"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">邮编 ： </span>
              <el-input v-model="postal_code"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 217px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px;vertical-align: top">*</i>
              <span style="vertical-align: top">地址1 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_1 "></textarea>
            </li>
            <li>
              <span style="vertical-align: top;margin-left: 10px">地址2 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_2 "></textarea>
            </li>
          </ul>
          <ul class="establish">
            <!--<li><span>创建人 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
            <!--<li><span>创建日期 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
            <!--<li><span>修改日期 ： </span><span>2019.2.15</span></li>-->
            <!--<li><span>修改人 ： </span><span>admin</span></li>-->
          </ul>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </span>
    </el-dialog>
    <!--点击新增酒店-->
    <el-dialog
      title=""
      :visible.sync="dialog"
      width="90%"
      :before-close="handleClose">
      <div class="basicInfo" >
        <div class="left">
          <p>基本信息</p>
          <ul>
            <li >
              <i style="color: red;font-size: 18px">*</i>
            <span>选择集团：</span><el-select v-model="group" placeholder="请选择集团"  >
            <el-option
            v-for="item in group_list"
            :key="item.value"
            :label="item.full_name"
            :value="item.id"
            >
            </el-option>
            </el-select></li>
            <!--<li> <span>所属集团：</span><el-input v-model="affiliation_name " style="width: 217px" placeholder="请输入内容" :disabled="true"></el-input></li>-->
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>酒店全称:</span>
              <el-input v-model="input" style="width: 210px;" placeholder="请输入内容"></el-input></li>
            <li >
              <i style="color: red;font-size: 18px">*</i>
              <span>酒店简称：</span>
              <el-input v-model="hotel_input" style="width: 210px;margin-left: -4px" placeholder="请输入内容"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>代码：</span>
              <el-input v-model="code" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li style="height: 46px;line-height: 46px">
              <i style="color: red;font-size: 18px">*</i>
              <span>审核状态：</span>
              <el-radio v-model="radio" label="1">已通过</el-radio>
              <el-radio v-model="radio" label="0">未通过</el-radio>
            </li>
            <li>
              <span style="margin-left: 10px">中文描述：</span>
              <el-input v-model="desc " placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <span style="margin-left: 10px">英文描述：</span>
              <el-input v-model="desc_en " placeholder="请输入内容" style="width: 210px"></el-input></li>
          </ul>
          <p>联系方式</p>
          <ul>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>总机：</span>
              <el-input v-model="office_tel "   placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>国家：</span>
              <el-select v-model="country_code" placeholder="请选择">
                <el-option
                  v-for="item in country_code_list"
                  :key="item.value"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </li>

            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>订房电话：</span>
              <el-input v-model="reserve_tel "   placeholder="请输入内容" style="width: 210px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>州/省：</span>
              <el-input v-model="province" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>服务电话：</span>
              <el-input v-model="service_tel"       placeholder="请输入内容"  style="width: 210px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>城市：</span>
              <el-input v-model="city" placeholder="请输入内容" style="width: 210px"> </el-input></li>
            <li>
              <span  style="margin-left: 10px">传真：</span>
              <el-input v-model="fax" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li style="height: 46px;vertical-align: top">
              <span style="margin-top: 5px;margin-left: 10px">地理位置：</span>
              <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block" >东经:</span>
              <input style="width: 50px;height: 36px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_east">
              <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block">北纬：</span>
              <input style="width: 50px;height: 36px; border: 1px solid rgba(204,204,204,1);border-radius: 4px" v-model="position_west">

            </li>
            <li style="height: 46px;line-height: 46px">
              <i style="color: red;font-size: 18px">*</i>
              <span>状态：</span>
              <el-radio v-model="normal" label="1">正常</el-radio>
              <el-radio v-model="normal" label="0">停用</el-radio>
            </li>
            <li>
              <span style="margin-left: 10px">官网：</span>
              <el-input v-model="web_site " placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li>
              <span style="margin-left: 10px">邮箱：</span>
              <el-input v-model="email" placeholder="请输入内容" style="width: 210px"></el-input></li>
            <li style="width: 80%;height: 260px ;border: 1px solid #eeeeee">
              <el-upload
                style=" text-align: center"
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </li>

          </ul>
        </div>
        <div class="right">
          <div class="log">
            <el-upload
              class="avatar-uploader"
              action="http://47.97.178.98:9500/resource/hotel/logo/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">添加logo</i>
            </el-upload>

          </div>
          <ul class="site">
            <li>
              <span style="margin-left: 10px">DNS ： </span>
              <el-input v-model="dns " placeholder="请输入内容" style="width: 210px"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">邮编 ： </span>
              <el-input v-model="postal_code"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 210px"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px;vertical-align: top">*</i>
              <span style="vertical-align: top">地址1 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_1 "></textarea>
            </li>
            <li>
              <span style="vertical-align: top ;margin-left: 10px">地址2 ：</span>
              <textarea style="width: 300px; height: 100px;resize: none" v-model="address_2 "></textarea>
            </li>
          </ul>
          <ul class="establish">
            <!--<li><span>创建人 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
            <!--<li><span>创建日期 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
            <!--<li><span>修改日期 ： </span><span>2019.2.15</span></li>-->
            <!--<li><span>修改人 ： </span><span>admin</span></li>-->
          </ul>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog = false">取 消</el-button>
    <el-button type="primary" @click=" hold()">确 定</el-button>
  </span>
    </el-dialog>
    <!--新增酒店的部门-->
    <el-dialog
      title=""
      :visible.sync="dialog_section"
      width="80%"
      :before-close="handleClose">
      <div class="message">
        <p>部门信息</p>
        <ul>
          <li>
            <span>所属酒店：</span>
            <el-select v-model="department_hotel " placeholder="请选择酒店"  style="width: 217px"  :disabled="true" clearable >
            <el-option
              v-for="item in hotel_list"
              :key="item.value"
              :label="item.full_name"
              value-key="id"
              :value="item.id"
            >
            </el-option>
          </el-select></li>
          <li>
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span>部门名称：</span>
            <el-input v-model="department_name " style="width: 210px" placeholder="请输入内容"></el-input></li>
          <li>
            <span>上级部门：</span>
            <el-input v-model="superior_department " style="width: 210px" placeholder="请输入内容"  :disabled="true"></el-input></li>

          <li style="height: 46px;line-height: 46px">
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span>审核状态：</span>
            <el-radio v-model="radio" label="1">已通过</el-radio>
            <el-radio v-model="radio" label="0">未通过</el-radio>
          </li>

          <li>
            <span>中文描述：</span>
            <el-input v-model="chinese_name " placeholder="请输入内容" style="width: 210px"></el-input></li>
          <li style="height: 46px;line-height: 46px">
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span>是否营业部门：</span>
            <el-radio v-model="attr" label="1">是</el-radio>
            <el-radio v-model="attr" label="0">否</el-radio>
          </li>
          <li>
            <span>英文描述：</span>
            <el-input v-model="english_name " placeholder="请输入内容" style="width: 210px"></el-input></li>

        </ul>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_section = false">取 消</el-button>
    <el-button type="primary" @click=" hotel_save()">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Son from "./basic-info";
  import Childen from "./sections";
  import HotelSon from "./hotel"
  let id = 1000;
    export default {
        name: "organization",
      data() {

        const data = [{

          id: 1,
          label: '内控店控',
          children: [{
            id: 2,
            label: '组织机构管理'
          }, {
            id: 3,
            label: '权限管理'
          },
            {
              id: 4,
              label: '薪资管理'
            }
          ]
        }];
        return {
          api:'http://47.98.113.173:9519',
          country_code_list:[],//获取国家列表
          son:false,
          hotelson:false,
          childen:false,
          activeName2: 'first',
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data)),
          masking:false,//蒙版的显示隐藏
          department:false,//添加部门的显示和隐藏
          input:'',//酒店的全程
          hotel_input:'',//酒店的简称
          group_name:'',//集团名
          // checked:'',//状态
          options: [{
            value: '0',
            name: '无登陆入口'
          }, {
            value: '1',
            name: '有登录入口'
          },],
          value: '',
          attr:'',
          dialogVisible:false,//新增集团
          dialog:false,//新增酒店
          dialog_section:false,//新增酒店的部门
          affiliation_name:'',//所属集团
          group_list:[],//获取后台的集团信息
          hotel_list:[],//获取酒店的信息
          setpro:false,//酒店后的自带修改和删除
          hotel_id:'',//需要修改的酒店的


          /**
           * 新增集团下的内容
           * */
          param:{},
          group:'',//集团信息的选择框
          full_name :'', //集团全称
          short_name :'',   //集团简称
          code :'',  //代码
          radio: "1",//审核状态
          desc:'',//中文描述
          desc_en:'',//英文描述
          office_tel:'',//总机
          country_code:'',//国家
          reserve_tel:'',//订房电话
          province:'',//州/省
          service_tel:'',//服务电话
          city:'',//城市
          fax:'',//传真
          position_east:'',// 东经
          position_west:'',// 北纬
          normal:'1',//正常
          web_site:'',//官网
          email:'',//邮箱
          photo:'',//集团照片
          log:'',//log
          dns:'',//DNS
          postal_code:'',//邮编
          address_1:'',//地址1
          address_2:'',//地址二

          group_full_name:'',//集团信息
          id:'',//选取集团信息的id
          //集团蒙版的基本信息

          //状态

          //log里的东西
          imageUrl: '',
          imge_list:[],

          circle :'',

        //  酒店的基本信息de id
        //  bit:[],
          //点击添加部门时获得的酒店
          department_hotel:'',
          department_hotel_id:'',
        //  获得上级部门id
          superior_department_id:'',
        //  部门信息
          hotelid:'',//所点击的酒店id
          hotel_id_name:'',//所属酒店
          department_name:'',//部门名称
          superior_department:'',//上级部门
          chinese_name:'',//中文备注
          english_name:'',//英文备注
        };
      },
      created:function () {
        let that=this;
        that.full();
        // that.hotel();
        that. country_info()
        console.log(sessionStorage.getItem("authorization"))


      },
      methods: {

        /**
         * @flush 是用来刷新数据的
         * */
        flush(){
          let  that = this;
            that.full_name ='', //集团全称
            that.short_name ='',   //集团简称
            that.code ='',  //代码
            that.desc='',//中文描述
            that.desc_en='',//英文描述
            that.office_tel='',//总机

            that.reserve_tel='',//订房电话
            that.province='',//州/省
            that.service_tel='',//服务电话
            that.city='',//城市
            that.fax='',//传真
            that.position_east='',// 东经
            that.position_west='',// 北纬
            that.web_site='',//官网
            that.email='',//邮箱
            that.photo='',//集团照片
            that.log='',//log
            that.dns='',//DNS
            that.postal_code='',//邮编
            that.address_1='',//地址1
            that.address_2='',//地址二
            that.radio='',//审核状态
            that.country_code='',//国家
            that.group='',//集团信息的选择框
            that. normal=''//正常/
        },
        /**
         * @refresh 用来刷新增部门
         *
         * **/
        refresh(){
          let that = this;
           that.hotelid='',//所点击的酒店id
            that.hotel_id_name='',//所属酒店
            that.department_name='',//部门名称
             that.radio="",
             that.attr='',
            that.superior_department='',//上级部门
            that.chinese_name='',//中文备注
            that.english_name=''//英文备注
        },

        //这里缓存集团的id
        bloc(val){
          console.log(val);
         let  that = this;
          that.circle  = val;
          that.$axios({
            "url": that.api+"/v1/common/hotel_group/get_info/"+val,
            "method": "get",
            //"headers": {"authorization": that.authorization_token}
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                sessionStorage.setItem("group", res.data.data.id);
                that.group_name=res.data.data.full_name;
                that.group= res.data.data.id;
                that.hotel();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

          //封装获取集团信息
        full(){
          console.log(sessionStorage.getItem("authorization"))
          let that=this;
          that.$axios({
            "url": ""+that.api+"/v1/common/hotel_group/info_list",
            "method": "get",
            //"headers": {"authorization": that.authorization_token}
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                // sessionStorage.setItem('authorization',res.data.new_authorization)
                that.group_name=res.data.data.list[0].full_name;
               that.group_list=res.data.data.list;
               that.group= res.data.data.list[0].id;
                sessionStorage.setItem("group", res.data.data.list[0].id);
                console.log(that.group);
                that.group_full_name = res.data.data.list.full_name;
                that.hotel()

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取酒店的信息
        hotel(){
          console.log(sessionStorage.getItem("authorization"));
          let that=this;
          console.log(that.group);
          that.$axios({
            url: that.api+"/v1/common/dept/get_tree",
            method: "post",
            data:{
              hotel_group_id:that.group
            },
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                // sessionStorage.setItem('authorization',res.data.new_authorization);
                console.info(sessionStorage.getItem('authorization') + 'this is last auth')
                console.log(res.data);
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

        //封装获取国家的列表
        country_info(){
          this.$axios({
            url: "http://47.98.113.173:9103/v1/system/settings/get_country_list/?page_size=300",
            method: "get",
            headers:{
              authorization:sessionStorage.getItem("authorization"),
            },

          })
            .then(res => {
              if (res.data.message=="success"){
                // console.log(res.data.data.results);
                this.country_code_list=res.data.data.results;
                this.hotel()

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

       //封装后台传过来的国家转换为名字
        code_desc(flag,data){
          // flag为1的时候code转desc
          let that = this,
            list = that.country_code_list;
          // console.log(list)
          for(let i in list){
            if(flag && data==list[i].code){
              return list[i].descript
            }else if(!flag && data==list[i].descript){
              return list[i].code
            }
          }
        },
       //封装错误信息提示
        error(message){
          this.$message({
            showClose: true,
            message: '错误哦，这是'+message+"的错误",
            type: 'warning'
          });
        },
        group_add(){
          let that = this;
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2){
            that.dialogVisible=true;
          }else {
            this.hintInfo("warning","您没有新增集团权限")
          }


        },
        //点击添加集团显示蒙版后的保存
        save(){
          let that = this;
          if((!that.full_name) || (!that.short_name) || (!that.code) || (!that.office_tel) || (!that.country_code) || (!that.reserve_tel) || (!that.province)
            || (!that.service_tel) || (!that.city)  || (!that.normal)   || (!that.address_1)

          ){
            that.hintInfo("warning","* 为必填项")

          }else {
            let tel = /0\d{2,3}-\d{7,8}/;
            if(!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)){
              that.hintInfo("warning","座机号码需以0开始,中间使用-分隔符")
            }else {
              that.$axios({
                // url:that.api+"/v1/common/hotel_group/add",
                url:that.api+'/v1/common/hotel_group/add',
                method: "post",
                // params:{},
                data:{
                  //集团蒙版的基本信息
                  full_name :that.full_name, //集团全称
                  short_name :that.short_name,   //集团简称
                  code :that.code, //代码
                  audit:that.radio+"",//审核状态
                  desc:that.desc,//中文描述
                  desc_en:that.desc_en,//英文描述
                  // 集团蒙版的联系方式
                  office_tel:that.office_tel,//总机
                  country_code:that.country_code,//国家
                  reserve_tel:that.reserve_tel,//订房电话
                  province:that.province,//州/省
                  service_tel:that.service_tel,//服务电话
                  city:that.city,//城市
                  fax:that.fax,//传真
                  position:that.position_west+','+that.position_east,
                  //地理位置
                  // position_east:'',// 东经
                  // position_west:'',// 北纬
                  status:that.normal+"",//状态
                  web_site:that.web_site,//官网
                  email:that.email,//邮箱
                  photo:'',//集团照片
                  logo:'',//log
                  dns:that.dns,//DNS
                  postal_code:that.postal_code,//邮编
                  address_1:that.address_1,//地址1
                  address_2:that.address_2,//地址二
                },
                headers:{
                  authorization:sessionStorage.getItem("authorization"),
                }
              })
                .then(res=>{
                  if(res.data.message==="success"){
                    that.dialogVisible = false;
                    console.log(res);
                    that.full();

                  }else {
                    console.log(res.data.message)
                  }

                })
                .catch(error=>{
                  console.log(error);
                })
            }
          }
        },
         //点击添加酒店显示蒙版，添加酒店
        hotel_add(){
          let that = this;
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===1 || root_level===2){
            that.code = '',  //代码
              that.desc = '',//中文描述
              that.desc_en = '',//英文描述
              // 集团蒙版的联系方式
              that.office_tel = '',//总机
              that.country_code = '',//国家
              that.reserve_tel = '',//订房电话
              that.province = '',//州/省
              that.service_tel = '',//服务电话
              that.city = '',//城市
              that.fax = '',//传真
              //地理位置
              that.position_east = '',// 东经
              that.position_west = '',// 北纬
              //状态
              that.web_site = '',//官网
              that.email = '',//邮箱
              that.photo = '',//集团照片
              that.postal_code = '',//邮编
              that.address_1 = '',//地址1
              that.address_2 = '',//地址二
              that.full();
              that.dialog=true;
          }else {
            this.hintInfo("warning","您没有新增酒店权限")
          }
        },
        //点击添加酒店后的保存
        hold(){
          let that = this;
          if((!that.group) || (!that.input) || (!that.hotel_input) || (!that.code) || (!that.radio) || (!that.office_tel) || (!that.country_code)
            || (!that.reserve_tel) || (!that.province) || (!that.service_tel) || (!that.city)  || (!that.normal) ||(!that.address_1)
          ){
            that.hintInfo("warning","* 为必填项")
          }else {
            let tel = /0\d{2,3}-\d{7,8}/;
            if(!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)){
              that.hintInfo("warning","座机号码需以0开始,中间使用-分隔符")
            }else {
              that.$axios({
                url: that.api+"/v1/common/hotel/add",
                method: "post",
                data:{
                  //集团蒙版的基本信息
                  hotel_group_id:that.group,
                  full_name :that.input, //酒店全称
                  short_name :that.hotel_input,   //酒店简称
                  code :that.code, //代码
                  audit:that.radio,//审核状态
                  desc:that.desc,//中文描述
                  desc_en:that.desc_en,//英文描述
                  // 集团蒙版的联系方式
                  office_tel:that.office_tel,//总机
                  country_code:that.country_code,//国家
                  reserve_tel:that.reserve_tel,//订房电话
                  province:that.province,//州/省
                  service_tel:that.service_tel,//服务电话
                  city:that.city,//城市
                  fax:that.fax,//传真
                  position:that.position_west+','+that.position_east,
                  //地理位置
                  // position_east:'',// 东经
                  // position_west:'',// 北纬

                  status:that.normal,//状态
                  web_site:that.web_site,//官网
                  email:that.email,//邮箱
                  // photo:that.imge_list,//集团照片
                  logo:'',//log
                  dns:that.dns,//DNS
                  postal_code:that.postal_code,//邮编
                  address_1:that.address_1,//地址1
                  address_2:that.address_2,//地址二
                },
                //headers: {"authorization": this.authorization_token}
                headers:{
                  authorization:sessionStorage.getItem("authorization"),
                }
              })
                .then(res=>{
                  if (res.data.message=="success"){
                    console.log(res)
                    that.hotel();
                    that.dialog = false;
                    //  console.log(this.module_list);
                  }
                  else{
                    this.error(res.data.message)
                    console.log(res.data.message);
                  }

                  // that.newlists=res.data.data
                })
                .catch(error=>{
                  console.log(error);
                })
            }
          }





        },

        //点击下属酒店
        handleNodeClick(data){
          let that=this;
          that.setpro=true;
            that.hotelid=data.id;
            sessionStorage.setItem("hotelid",data.id)
            },
        //子组件改变后的传过来的值
        hande_list(str){
          console.log(str);
          // this.bit = str
        },


        //点击树状图上的添加
        append(data) {
          console.log(sessionStorage.getItem("root_level"));
          let root_level = parseInt(sessionStorage.getItem("root_level"))
          if(root_level===3){
            console.log(data);
            this.dialog_section=true;
            this.refresh();
            // this.department_hotel_id=data.hotel_id;//酒店id
            this.superior_department_id=data.id;//上级部门
            this.superior_department=data.name;//上级名字
            // this.department_hotel=data.short_name;//酒店名字

            if(data.is_hotel && data.is_hotel==1){
              this.department_hotel_id=data.id;
              this.department_hotel=data.name;//酒店名字
              this.superior_department_id=null//上级部门
              this.superior_department='';//上级名字

            }else {
              this.department_hotel_id=data.hotel_id;
              this.department_hotel=data.short_name;//酒店名字
              this.superior_department_id=data.id;//上级部门
              this.superior_department=data.name;//上级名字
            }


          }else {
            this.hintInfo("warning","您没有添加酒店部门权限")

          }

        },
        //点击树状图上的添加后的保存
        hotel_save(){
          let that = this;
          if(!that.department_name || !that.radio ||!that.attr){
            that.hintInfo("warning","* 为必填项")
          }else {
            that.$axios({
              url:that.api+"/v1/common/dept/add",
              method: "post",
              data:{
                hotel_id:that.department_hotel_id,//所属酒店
                name:that.department_name,//部门名称
                parent_id :that.superior_department_id,//上级部门id
                audit:that.radio+"",//审核状态
                desc:that.chinese_name,//中文备注
                desc_en:that.english_name,//英文备注
                attr:that.attr+""//上级部门的

              },
              headers:{
                authorization:sessionStorage.getItem("authorization"),
              }
            })
              .then(res=>{
                if(res.data.message==="success"){
                  console.log(res);
                  that.dialog_section=false;
                  that.hotel();

                }else {
                  console.log(res.data.message)
                }

              })
              .catch(error=>{
                this.error(res.data.message)
                console.log(error);
              })
          }

        },

        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },

        //酒店的删除
        remove(node, data) {
          console.log(node, data);
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

              this.$axios({
                url:""+this.api+"/v1/common/hotel/remove/${id}",
                method: "post",
                //headers: {'authorization': this.authorization_token}
                headers:{
                  authorization:sessionStorage.getItem("authorization"),
                }
              })
                .then(res=>{
                  console.log(res.data.message)
                  if (res.data.message=="success"){
                    //获取信息列表
                    this.hotel();
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
        /**
         * 点击上传酒店logo 方法
         * */
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log( file);
          this.imge_list = file.response.id;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        /**
         * 集团的上传
         *
         * */
        handlePreview( file){
          console.log(res,file);
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


        }

    }
</script>

<style  lang="less"  scoped>
  .organization {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);
    overflow-y: scroll;
    min-width: 1500px;
    .tree {
      width: 280px;
      max-width: 410px;
      height: 100%;
      /*overflow-y: scroll;*/
      /*min-height: 1000px;*/
      /*background: rgba(247, 247, 247, 1);*/
      float: left;
      .serialNumber {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 10px;
        span {
          margin-left: 20px;
        }
      }
      .btn {
        margin-left: 10px;
        button {
          border: none;
          outline: none;
          width: 90px;
          height: 40px;
          background: rgba(68, 136, 233, 1);
          border-radius: 4px;
          color: white;
        }

      }
      .moduleTree {
        width: 286px;
        height: 40px;
        background: rgba(238, 238, 238, 1);
        font-size: 16px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: black;
        line-height: 40px;
        margin-left: -15px;
        padding-left: 98px;
      }
      .content {
        width: 100%;
        margin-top: 10px;
        .control {
          width: 100%;
          p {
            font-size: 26px;
            background: rgba(247, 247, 247, 1);
            padding-left: 84px;

          }
        }
      }

    }
    .router {
      width: calc(100% - 300px);
      /*overflow: hidden;*/
      overflow-y: scroll;
      /*height: 100%;*/
      font-size: 20px;
      float: left;
      overflow: hidden;
      /*min-height: 1000px;*/
      white-space: nowrap;
      /*background: rgba(247, 247, 247, 1);*/
      /*background: red;*/
      .ini {
        height: 96.8%;
        position: absolute;
        right: 0;
        top: 30px;

      }
    }
    .basicInfo {
        width:100%;
        height: 85%;
        overflow-y: scroll;
        background: white;
        .left {
          width: 68%;
          float: left;
            p {
              width: 80px;
              font-size: 16px;
              /*height: 60px;*/
              /*line-height: 60px;*/
              margin-top: 16px;
              margin-bottom: 10px;
              font-weight: bold;
            }
            ul {
              overflow: hidden;

              li {
                float: left;
                width: 50%;
                font-size: 16px;
                margin-bottom: 5px;
                span {
                  width: 80px;
                  display: inline-block;
                  /*vertical-align: top;*/
                }

              }
            }
          }
          .contact {
            padding-left: 29px;
            p {
              font-size: 16px;
              margin: 10px 0;
              font-weight: bold;
            }
            ul {
              overflow: hidden;

              li {
                float: left;
                width: 50%;
                font-size: 16px;
                margin-bottom: 5px;
                span {
                  width: 80px;
                  display: inline-block;
                  vertical-align: top;
                }

              }
            }
          }
          .phone {
            width:600px;
            height: 230px;
            /*line-height: 398px;*/
            text-align: center;
            background: white;
            margin-left: 31px;
            /*margin-top: 15px;*/
            margin-bottom: 24px;
            border: 1px solid rgb(204, 204, 204);
          }
          .right {
        float: left;
        /*.log {*/
          /*width: 227px;*/
          /*height: 227px;*/
          /*background: white;*/
          /*!*margin-left: 100px;*!*/
          /*line-height: 227px;*/
          /*text-align: center;*/
          /*!*margin-bottom: 22px;*!*/
          /*border: 1px solid rgb(204, 204, 204);*/
          /*margin-top: 50px;*/

        /*}*/
        .site {
          /*margin-left: 60px;*/
          font-size: 16px;
          margin-top: 40px;
          li {
            margin-bottom: 10px;
            span {
              width: 70px;
              display: inline-block;
              text-align: left;
              vertical-align: top;
            }

          }
        }
        .establish {
          /*margin-left: 132px;*/
          margin-top: 100px;
          font-size: 16px;
          li {
            margin-bottom: 22px;
            button {
              outline: none;
              width: 90px;
              height: 40px;
              background: rgba(68, 136, 233, 1);
              border-radius: 4px;
              color: white;
            }
          }
        }
      }
        }
      .message {
        p {
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          padding-top: 16px;
          margin-bottom: 10px;
          margin-left: 60px;
          font-weight: bold;
        }
        ul {
          overflow: hidden;
          margin-left: 60px;
          li {
            float: left;
            width: 480px;
            font-size: 16px;
            margin-bottom: 15px;
            span {
              width: 120px;
              display: inline-block;
              vertical-align: top;
            }

          }
          button {
            outline: none;
            width: 90px;
            height: 40px;
            background: rgba(68, 136, 233, 1);
            border-radius: 4px;
            color: white;
          }
        }
      }

    }






</style>
<style >
  /*.expanded{*/
    /*display: none;*/
  /*}*/
/*.el-select{*/
  /*width: 217px;*/
/*}*/
  /*.update/deep/ .el-checkbox{*/
    /*display: none;*/
  /*}*/
  /*.ee-node{*/
    /*padding-top: 10px;*/
  /*}*/
  /*.el-select-dropdown .el-popper{*/
    /*z-index: 9999;*/
  /*}*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
