<template>
    <div class="saleRules">
        <div class="btn-group">
              <div class="single-btn" @click="NewAddRules();">新增</div>
              <!-- <div class="single-btn">修改</div>
              <div class="single-btn">删除</div> -->
              <!-- <div class="single-btn" @click="handleCurrentPageChange(1);">刷新</div> -->
              <!-- <div class="single-btn">日志</div> -->
            </div>
        <!-- 表格 -->
            <div class="table" >  
              <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>代码</th>
                        <th>描述</th>
                        <th>开始日期</th>
                        <th>结束日期</th>
                        <th>协议单位计划</th>
                        <th>VIP等级</th>
                        <th>触发方式</th>
                        <th>奖励方式</th>
                        <th>奖励</th>
                        <th>停用</th>
                        <th>排序</th>
                        <th>用户</th>
                        <th>修改时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in promotionList" :key="index" @click="get_card_promotion_info(item.id) ">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.descript }}</td>
                        <td>{{ item.date_begin }}</td>
                        <td>{{ item.date_end }}</td>
                        <td>{{ item.card_type }}</td>
                        <td>{{ item.card_level }}</td>
                        <td>{{ item.trigger_way }}</td>
                        <td>{{ item.target_way }}</td>
                        <td>{{ item.target_number }}</td>
                        <td><p v-if="item.is_halt">是</p><p v-else>否</p></td>
                        <td>{{ item.descript_en }}</td>
                        <td>{{ item.target_member }}</td>
                        <td>{{ item.modify_datetime }}</td>
                    </tr>
                </tbody>
              </table>
              <p v-if="total==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
              <div class="pagination">
                <el-pagination
                  
                  @current-change="handleCurrentPageChange"
                  :current-page="currentPage"
                  :page-size="pagesize"
                  layout="total, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
        <!-- 协议单位计划外层dialog -->
      <el-dialog title="促销规则定义" :visible.sync="outerVisible">
            <div class="outdialog">
              <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>代码：<i class="red">*</i></p>
                        <el-input v-model="CertainPromotion.code" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                    <div class="inner pull-right">
                        <p>停用：</p>
                        <el-radio v-model="CertainPromotion.is_halt" label='0'>是</el-radio>
                        <el-radio v-model="CertainPromotion.is_halt" label='1'>否</el-radio>
                    </div>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>描述：<i class="red">*</i></p>
                        <el-input v-model="CertainPromotion.descript" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                    <div class="inner pull-right">
                        <p>英文描述：<i class="red">*</i></p>
                        <el-input v-model="CertainPromotion.descript_en" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <p >说明：<i class="red">*</i></p>
                    <el-input v-model="CertainPromotion.remark" type="textarea" placeholder="请输入内容" style="width: 85.6%;max-height: 100px;vertical-align: top;"></el-input>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>开始时间：<i class="red">*</i></p>
                        <!-- <el-input v-model="CertainPromotion.date_begin" placeholder="请输入内容" style="width: 70%;"></el-input> -->
                        <el-date-picker
                          v-model="CertainPromotion.date_begin"
                          type="date"
                          placeholder="选择日期" style="width: 70%;"> 
                          
                        </el-date-picker>
                    </div>
                    <div class="inner pull-right">
                        <p>结束时间：<i class="red">*</i></p>
                        <!-- <el-input v-model="CertainPromotion.date_end" placeholder="请输入内容" style="width: 70%;"></el-input> -->
                        <el-date-picker
                          v-model="CertainPromotion.date_end"
                          type="date"
                          placeholder="选择日期" style="width: 70%;"> 
                          
                        </el-date-picker>
                    </div>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>协议单位计划：<i class="red">*</i></p>
                        <!-- <el-input v-model="CertainPromotion.card_type" placeholder="请输入内容" style="width: 70%;"></el-input> -->
                        <el-select v-model="CertainPromotion.card_type" filterable placeholder="请选择"  style="width: 70%;" >
                          <el-option
                            v-for="(item,index) in CardTypeTree"
                            :key="index"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                    <div class="inner pull-right">
                        <p>VIP等级：</p>
                        <el-select v-model="CertainPromotion.card_level" filterable placeholder="请选择"  style="width: 70%;" @focus="get_card_level_tree()">
                          <el-option
                            v-for="(item,index) in CardLevelTree"
                            :key="index"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>适用酒店：</p>
                        <el-input v-model="CertainPromotion.hotel" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                    <div class="inner pull-right">
                        <p>排序：</p>
                        <el-input v-model="sort" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>触发方式：<i class="red">*</i></p>
                        <!-- <el-input v-model="CertainPromotion.trigger_way" placeholder="请输入内容" style="width: 70%;"></el-input> -->
                        <el-select v-model="CertainPromotion.trigger_way" filterable placeholder="请选择"  style="width: 70%;">
                          <el-option
                            v-for="(item,index) in trigger_wayArr"
                            :key="index"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                    <div class="inner pull-right">
                        <p>奖励方式：<i class="red">*</i></p>
                        <!-- <el-input v-model="CertainPromotion.target_way" placeholder="请输入内容" style="width: 70%;"></el-input> -->
                        <el-select v-model="CertainPromotion.target_way" filterable placeholder="请选择"  style="width: 70%;" >
                          <el-option
                            v-for="(item,index) in target_wayArr"
                            :key="index"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 单条内层 -->
                <div class="innerbox">
                    <div class="inner pull-left">
                        <p>奖励对象：<i class="red">*</i></p>
                        <!-- <el-input v-model="CertainPromotion.target_member" placeholder="请输入内容" style="width: 70%;"></el-input> -->
                        <el-select v-model="CertainPromotion.target_member" filterable placeholder="请选择"  style="width: 70%;" >
                          <el-option
                            v-for="(item,index) in target_memberArr"
                            :key="index"
                            :label="item.descript"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                    <div class="inner pull-right">
                        <p>奖励金额：<i class="red">*</i></p>
                        <el-input v-model="CertainPromotion.target_number" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                </div>
                <!-- 单条内层 -->
                <!-- <div class="innerbox">
                    <div class="inner pull-left">
                        <p>发展来源：</p>
                        <el-input v-model="CertainPromotion.descript" placeholder="请输入内容" style="width: 70%;"></el-input>
                    </div>
                </div> -->
                <!-- 删除保存 -->
                <div v-if="salesNewadd" class="CancleAndSave pull-right" style="margin: 20px 0;">
                  <el-button type="primary" @click="add_card_base();">保存</el-button>
                </div>
                <div v-else class="CancleAndSave pull-right" style="margin: 20px 0;">
                  <el-button type="primary" @click="remove_card_promotion_info(CertainPromotion.id)" style="background-color: #68819E;">删除</el-button>
                  <el-button type="primary" @click="update_card_promotion_info(CertainPromotion.id)">保存</el-button>
                </div>
            </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name:'saleRules',
    data(){
        return{
            // 控制弹窗变量
            outerVisible:false,
            // 假数据
            CardLevelList:[
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                },
                {
                    code:"code",
                    descript:'descript',
                    descript_en:"descript_en",
                    is_halt:0,
                }
            ],
            // 请求地址头
            UrLHeader:'http://47.98.113.173:9102/v1/',//http://192.168.4.234:9102/v1/
            // 下拉框请求头
            SelectUrLHeader:"http://47.98.113.173:9103/",//'http://47.98.113.173:9102/',
            // 分页
            currentPage: 1,
            pagesize: 10,
            total: 0,
            // 促销规则列表
            promotionList:[],
            // 单个促销规则
            sort:'',
            CertainPromotion:{
              "code_type":"CM",
                "code": " ",
                "descript": " ",
                "descript_en": " ",
                "remark": null,
                "date_begin": " ",
                "date_end": " ",
                "card_type": "",
                "card_level": null,
                "hotel": null,
                "trigger_way": "",
                "target_way": "",
                "target_member": "",
                "target_number": 0,
                "point_end_datetime": null,
                "is_only_once": null,
                "is_halt": '0',
                "create_user":'tom',
                
            },
            salesNewadd:false,//是否为新增
            // 协议单位计划vip
            CardTypeTree:[],
            CardLevelTree:[],
            // 触发方式
            trigger_wayArr:[
              {
                code: 'night_audit',
                descript: '每天夜审时'
              },
              {
                code: 'check_in',
                descript: '客房登记入住时'
              },
              {
                code: 'birthday',
                descript: '会员生日时'
              },
              {
                code: 'login_in',
                descript: '会员登录时'
              },
              
              {
                code: 'upgrade',
                descript: '会员升级时'
              },
              {
                code: 'evaluation',
                descript: '会员网站评价时'
              },
              {
                code: 'sing_in',
                descript: '会员网站签到时'
              },
              {
                code: 'card_charge',
                descript: '储值卡充值时'
              },
              {
                code: 'room_check_out',
                descript: '客房结账时'
              },
              {
                code: 'register_card',
                descript: '注册会员成功时'
              },
            ],
            // 奖励方式
            target_wayArr:[
              {
                code: 'point',
                descript: '积分'
              },
              {
                code: 'money',
                descript: '储值'
              },
            ],
            // 奖励对象
            target_memberArr:[
              {
                code: 'self',
                descript: '本人'
              },
              {
                code: 'referrer',
                descript: '推荐人'
              },
            ]
        }
    },
    // 加载页面
    created(){
      this.get_card_type_tree();
      this.handleCurrentPageChange(this.currentPage);
      
    },
    methods:{
      // 是否显示弹窗
      showFunc(){
        this.outerVisible=!this.outerVisible
      },
      
      // 初始化促销规则列表
      get_card_promotion_list(){
        let _this = this;
        //在created中
        _this.handleCurrentPageChange(this.currentPage);
      },
      // 获取单个的促销规则
      get_card_promotion_info(id){
          let that = this;
          let url = that.UrLHeader+'customer/member/get_card_promotion_info/'+id+"/";
          that.outerVisible= true;
          that.salesNewadd=false;
          //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
          axios.get(url ).then(function (res) {
            that.CertainPromotion = res.data.data;
            // 用户转换
            for(let j in that.target_memberArr){
              if(that.CertainPromotion.target_member == that.target_memberArr[j].code){
                that.CertainPromotion.target_member = that.target_memberArr[j].descript
              }
            }    
            // 协议单位计划转换
            for(let m in that.CardTypeTree){
              if(that.CertainPromotion.card_type == that.CardTypeTree[m].code){
                  that.CertainPromotion.card_type = that.CardTypeTree[m].descript;
                      //VIP等级转换
                  for(let n in that.CardTypeTree[m].children){
                    if(that.CertainPromotion.card_level = that.CardTypeTree[m].children[n].code){
                      that.CertainPromotion.card_level = that.CardTypeTree[m].children[n].descript;
                    }
                  }
              }
            }           

                
          }).catch(function (err) {
            console.info(err);
          })
        },
      NewAddRules(){
        let _this=this;
        _this.showFunc();
        _this.salesNewadd=true;
        _this.CertainPromotion={
                "code_type":"CM",
                "code": " ",
                "descript": " ",
                "descript_en": " ",
                "remark": null,
                "date_begin": new Date(),
                "date_end": new Date(),
                "card_type": " ",
                "card_level": ' ',
                "hotel": null,
                "trigger_way": "",
                "target_way": "",
                "target_member": "",
                "target_number": 0,
                "point_end_datetime": null,
                "is_only_once": null,
                "is_halt": '0',
                "create_user":'tom'
            }
        
      },
      // 增加请求后台接口
      add_card_base(){
        //设置请求路径
        let _this=this,addUrl  = this.UrLHeader+"customer/member/add_card_promotion/";   
        axios.post(addUrl,_this.CertainPromotion).then(function(res) {
                if(res.data.message =='success'){
                  
                  // _this.showFunc();
                  _this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  _this.handleCurrentPageChange(_this.currentPage);
                }else{
                  this.$message.error('保存信息失败');
                }
                
            }).catch((error) => {
              
            });
      },
        // 更新单个的促销规则
      update_card_promotion_info(id){
        let _this=this,updateUrl  = this.UrLHeader+"customer/member/update_card_promotion/"+id+'/';
        // 用户转换
            for(let j in _this.target_memberArr){
              if(_this.CertainPromotion.target_member == _this.target_memberArr[j].descript){
                _this.CertainPromotion.target_member = _this.target_memberArr[j].code;
              }
            }    
            // 协议单位计划转换
            for(let m in _this.CardTypeTree){
              if(_this.CertainPromotion.card_type == _this.CardTypeTree[m].descript){
                  _this.CertainPromotion.card_type = _this.CardTypeTree[m].code;
                      //VIP等级转换
                  for(let n in _this.CardTypeTree[m].children){
                    if(_this.CertainPromotion.card_level = _this.CardTypeTree[m].children[n].descript){
                      _this.CertainPromotion.card_level = _this.CardTypeTree[m].children[n].code;
                    }
                  }
              }
            }
        if(!_this.isnull(_this.CertainPromotion.code) && !_this.isnull(_this.CertainPromotion.descript) && !_this.isnull(_this.CertainPromotion.descript_en) && !_this.isnull(_this.CertainPromotion.remark) && !_this.isnull(_this.CertainPromotion.date_begin) && !_this.isnull(_this.CertainPromotion.date_end) && !_this.isnull(_this.CertainPromotion.card_type) && !_this.isnull(_this.CertainPromotion.card_level)){ 
            axios.post(updateUrl,_this.CertainPromotion).then(function(res) {
                if(res.data.message =='success'){
                  // _this.showFunc();
                  _this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  _this.handleCurrentPageChange(_this.currentPage);
                  _this.get_card_promotion_info(_this.CertainPromotion.id);

                }else{
                  this.$message.error('保存信息失败');
                }
                
            }).catch((error) => {
              
            });
        }else{
          _this.$message.error('带*项不能为空')
        }
        
      },
      // 删除单条促销规则
      remove_card_promotion_info(id){
        //设置请求路径
            let removeCaseUrl  = this.UrLHeader+"customer/member/remove_card_promotion/"+id+'/',
                  _this=this;    
            _this.$confirm('是否永久该删除促销规则?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  axios.post(removeCaseUrl).then(function(res) {
                  if(res.data.message =='success'){
                    _this.showFunc();  
                    _this.handleCurrentPageChange(_this.currentPage);
                    _this.$message({
                      message: '删除成功',
                      type: 'success'
                    });

                  }else{
                    this.$message.error( '保存信息失败' );
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
      
      // 分页
        handleCurrentPageChange(currentPage){
          let that = this;
          let url = that.UrLHeader+'customer/member/get_card_promotion_list/?code_type=CM';
          //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
          axios({
            method : 'get',
            url : url,
            params:{
              page : currentPage,
              page_size : 10
            }
          }).then(function (res) {
            that.promotionList = res.data.data.results;
            that.total=res.data.data.count;

            for(let i in that.promotionList){
              for(let j in that.target_memberArr){
                  if(that.promotionList[i].target_member == that.target_memberArr[j].code){
                    that.promotionList[i].target_member = that.target_memberArr[j].descript
                  }
              }
                // 协议单位计划转换
                for(let m in that.CardTypeTree){
                  if(that.promotionList[i].card_type == that.CardTypeTree[m].code){
                      that.promotionList[i].card_type = that.CardTypeTree[m].descript;
                      //VIP等级转换
                      for(let n in that.CardTypeTree[m].children){
                        if(that.promotionList[i].card_level = that.CardTypeTree[m].children[n].code){
                          that.promotionList[i].card_level = that.CardTypeTree[m].children[n].descript;
                        }
                      }
                    }
                  }
              }

          }).catch(function (err) {
            console.info(err);
          })
        },
        // ------------------------------------------------------
      // 请求协议单位计划\VIP等级数据
      get_card_type_tree(){
        //设置请求路径
             let url  = this.UrLHeader+"customer/member/get_card_setting_tree/?code_type=CM",
                _this = this;                
            // 发送请求:将数据返回到一个回到函数中
             // 并且响应成功以后会执行then方法中的回调函数
             axios.get(url).then(function(res) {

               if(res.data.message=="success"){

                  _this.CardTypeTree = res.data.data.results;
                  

               }else{
                 _this.$message.error('请求服务器失败，稍后重试');
               }
            }).catch((error) => {
                
            });
      },

      // 请求VIP等级
      get_card_level_tree(){
        let _this=this;

          if(_this.CardTypeTree.length){

              for(let i in _this.CardTypeTree){
                // console.log(_this.certainBaseData.card_type);
                if(_this.CertainPromotion.card_type == _this.CardTypeTree[i].code){

                  _this.CardLevelTree = _this.CardTypeTree[i].children;

                }

              }

          }else{
              _this.$message({
                message: '请先选择协议单位计划',
                type: 'warning'
              });
          }
      },
      // 判断为空函数
      isnull(val) {
              var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
              if (str == '' || str == undefined || str == null) {
                  // this.$message('确认输入值不能为空');
                  return true;
              } else{
                return false;
              }
          },
      
    }
    
}

</script>
<style>
.el-dialog{
  width: 40%;
}
</style>
<style lang="less" scoped>
.red{
    color: red;
}
.saleRules{
    padding: 10px;
     // 按钮组合
    .btn-group{
        margin: 8px 0;
        // border: 1px red solid;
        padding-right: 70px;
    }
    .single-btn{
        display: inline-block;
        padding: 0 30px;
        line-height: 30px;
        border-radius: 2px;
        color: #fff;
        background-color: #4488E9;
        margin-right: 10px;
        cursor: pointer;
    }
    // 模态框
  .outdialog{
    overflow: hidden;
    .innerbox{
      overflow: hidden;
      margin: 5px 0;
      .inner{
        width: 48%;
        p{
          width: 100px;
          display: inline-block;
        }
      }
      p{
          width: 100px;
          display: inline-block;
        }
    }
  }
}
// 表格
.table{
    font-size: 14px;
    border: #CCCCCC 1px solid;
    table{
        border-collapse:collapse;  
        border-spacing:0;
        text-align: center;
        thead{
            line-height: 40px;
            background-color: #68819E;
            color: #ffffff;
            tr{
                th{
                  font-weight:400;
                  font-size: 16px;
                }
            }
        }
        tbody{
            line-height: 40px;
            color: #333333;
            tr{
                cursor: pointer;
                td{
                  border: 1px solid #CCCCCC;
                }
                span{
                  color: #68819E;
                  cursor: pointer;
                }
                .col{border:1px #68819E solid;margin:0 10px;}
            }
            tr:hover{
              background-color: #eeeeee;
            }
        }
        
    }
    // 分页
    .pagination{
        margin: 36px 0 14px 0;
        overflow: hidden;
        
        p{
        margin-left: 20px;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #68819E;
        color: #fff;
        }
    }
}
</style>
