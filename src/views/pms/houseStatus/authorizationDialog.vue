
<template>
    <div>
         <el-dialog class="houseTypeClass_authorization" @close="$emit('update:show', false);flushData()" :show="show"  width="60%" title="信用预授权" :visible.sync="visible" :modal="true">
          <div class="authorizationClass">
            <div class="div1">
              <el-table height="350" :data="authorizationList"  :header-cell-style="{background:'#373d41', color: '#FFFFFF'}">
                <el-table-column prop="status_desc"  label="状态">
                </el-table-column>
                <el-table-column prop="card_type_desc" label="项目">
                </el-table-column>
                <el-table-column prop="authorized_amount" label="金额"></el-table-column>
                <el-table-column prop="authorize_num" label="授权号"></el-table-column>
                <el-table-column prop="card_num" label="卡号"></el-table-column>
                <el-table-column prop="desc" label="备注"></el-table-column>
                <el-table-column label="撤销">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleCancle(scope.row)">撤销</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="div1_child">
                <div class="div1_child_1">
                  常用代码
                  <div>
                    <ul>
                      <li>国内卡</li>
                    </ul>
                  </div>
                </div>
                <!-- <div class="div1_child_2">
                  宾客信用卡
                  <div>

                  </div>
                </div> -->
                <div class="div1_child_3">
                  信用授权信息
                  <div style="display: flex;justify-content: space-between">
                    <ul class="ul_2">
                      <li>&nbsp;&nbsp;&nbsp;项目:
                        <el-select v-model="authorizationParam.card_type" clearable size="mini" style="width: 10vw;height: 10px;margin-top:10px"  placeholder="请选择">
                            <el-option
                            v-for="item in card_type_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>  
                        </el-select>
                      </li>
                      <li>授权号:<el-input v-model="authorizationParam.authorize_num" size="mini" style="width: 10vw;height: 10px;margin-top:10px"></el-input></li>
                      <li>有效期:
                        <el-date-picker
                          value-format = "yyyy-MM-dd"
                          size="mini" style="width: 10vw;height: 10px;margin-top:10px"
                          v-model="authorizationParam.card_expire"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </li>
                    </ul>
                    <ul class="ul_2">
                      <li>金额:<el-input  @input="authorizationParam.authorized_amount = authorizationParam.authorized_amount.replace(/[^\d.]/g,'')" v-model="authorizationParam.authorized_amount" size="mini" style="width: 10vw;height: 10px;margin-top:10px"></el-input></li>
                      <li>卡号:<el-input v-model="authorizationParam.card_num" size="mini" style="width: 10vw;height: 10px;margin-top:10px"></el-input></li>
                      <li>备注:<el-input v-model="authorizationParam.desc" size="mini" style="width: 10vw;height: 10px;margin-top:10px"></el-input></li>
                    </ul>                          
                  </div>
                </div>
              </div>
            </div>
            <div class="div2">
              <div>
                <el-row><el-button type="primary" size="mini" @click="addAuthorization">增加预授权</el-button></el-row>
                <el-row><el-button type="primary" @click="findAuthorizationList" size="mini">查看预授权</el-button></el-row>
                <!-- <el-row><el-checkbox></el-checkbox>显示已撤销</el-row> -->
              </div>
              <!-- <div class="div2_child">
                <el-row><el-button type="primary" size="mini">转入登记单</el-button></el-row>
                <el-row><el-button type="primary" size="mini">转至其它</el-button></el-row>
              </div> -->
              <div>
                <!-- <el-row><el-button type="primary" size="mini">刷新</el-button></el-row> -->
              </div>
              <div>
                <!-- <el-row><el-button type="primary" size="mini">保存</el-button></el-row> -->
                <!-- <el-row><el-button type="primary" size="mini">日志</el-button></el-row> -->
              </div>
              <div>
                <!-- <el-row><el-button type="primary" size="mini">打印</el-button></el-row> -->
                <!-- <el-row><el-button type="primary" size="mini">退出</el-button></el-row> -->
              </div>
            </div>            
          </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data () {
            return {
              card_type_list: [
                {
                  id: 1,
                  name: '国内卡'
                },
                {
                  id: 2,
                  name: '国外卡'
                },{
                  id: 3,
                  name: '储值卡'
                },
                // {
                //   id: 4,
                //   name: '挂AR账户'
                // },
              ],
              authorizationParam:{
                card_type: '',
                authorize_num: '',
                card_expire: '',
                card_num: '',
                desc: '',
                authorized_amount: ''
              },
              authorizationList: [],
              visible: this.show,
            };
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            parentInfoParam: {
                type: Object,
                // required: true
            }
        },
        watch: {
            show () {
                this.visible = this.show;
            },
            //对象的watch
            parentInfoParam(){
              console.log('this.parentInfoParamautr===',this.parentInfoParam)
              this.authorizationParam.mainAccount_id = this.parentParam.mainAccount_id
            },
        },
        computed:{
        },
        created(){
        },
        methods: {
          flushData(){
            this.authorizationParam.card_type = null;
            this.authorizationParam.authorize_num = null;
            this.authorizationParam.card_expire = null;
            this.authorizationParam.card_num = null;
            this.authorizationParam.desc = null;
            this.authorizationParam.authorized_amount = null;
            if(localStorage.getItem('mainAccountId_flag')){
            }else{
              // this.$router.go(0)
            }
            console.log(',....111',localStorage.getItem('mainAccountId'))
            console.log(',....mainAccountId_flag',localStorage.getItem('mainAccountId_flag'))
            localStorage.removeItem('mainAccountId')
            localStorage.removeItem('mainAccountId_flag')
            console.log(',....',localStorage.getItem('mainAccountId'))
          },
          //撤销预授权
          handleCancle(row){
            console.log('row,,',row)
            let that = this
            let id = row.id//缓存中获取
            // let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/remove/' + id
            let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/remove_pre_authorized_detail/` + id + '/'
            that.$axios.post(url).then((res)=>{
                console.log('res.data撤销',res.data)
                if(res.data.message =='success'){
                  that.findAuthorizationList()
                  that.$message({
                      message: '撤销成功',
                      type: 'success'
                  });
                }else{
                    this.$message.error('查询失败');
                }
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
          },
          //增加预授权
          addAuthorization(){
            if(this.authorizationParam.card_type && this.authorizationParam.authorize_num && this.authorizationParam.card_expire && this.authorizationParam.card_num  && this.authorizationParam.authorized_amount){
              let that = this
              // let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/add'
              let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/add_pre_authorized_detail/`
              let scopeParam
              console.log('localStorage',localStorage.getItem('mainAccountId'))
              this.authorizationParam.mainAccount_id = localStorage.getItem('mainAccountId')
              scopeParam = {
                desc: this.authorizationParam.desc,
                pay_amount: Number(this.authorizationParam.authorized_amount), //已支付金额
                authorized_amount: this.authorizationParam.authorized_amount, //授权额度
                card_type:  this.authorizationParam.card_type,
                card_num: this.authorizationParam.card_num,
                card_expire: this.authorizationParam.card_expire,
                expire_date: this.authorizationParam.card_expire,//授权过期日期
                authorize_num: this.authorizationParam.authorize_num,
                code_cash_type: null,
                account: this.authorizationParam.mainAccount_id,//关联主帐
              }
              console.log('scopeParam',scopeParam)
              that.$axios.post(url,scopeParam).then((res)=>{
                  console.log('res.data',res.data)
                  if(res.data.message =='success'){
                      that.$message({
                        message: '添加成功',
                        type: 'success'
                      });
                    that.findAuthorizationList()
                  }else{
                      this.$message.error('查询失败');
                  }
              }).catch(error=>{
                  this.$message.error('请求服务端失败!');
              })
            }else{
              this.$message.warning('请填写相应数据!')
            }
          },
          //查看一个预授权
          findAuthorization(){
            let that = this
            let id = localStorage.getItem('mainAccountId')//缓存中获取
            let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/get_info/' + id
            that.$axios.get(url).then((res)=>{
                console.log('res.data',res.data)
                if(res.data.message =='success'){
                    // that.$message({
                    //     message: '添加成功',
                    //     type: 'success'
                    // });
                }else{
                    this.$message.error('查询失败');
                }
            }).catch(error=>{
                this.$message.error('请求服务端失败!');
            })
          },
          //批量查看预授权list(一个accountId下面)
          findAuthorizationList(){
            let that = this
            // let url = this.api.api_9022_9519 + '/v1/' + 'finance/pre_authorized_detail/list_by_account_ids'
            let url= that.api.api_newPrice_9107+ '/v1/' + `accounts/get_pre_authorized_detail_list/?page_size=100&page=1`
            that.$axios.get(url).then((res)=>{
                if(res.data.message =='success'){
                  that.authorizationList = res.data.data.results
                }else{
                    this.$message.error('查询失败');
                }
            }).catch(error=>{
            })
          },
        }
    }
</script>
<style lang="less" scoped>
  //预授权class
  .authorizationClass{
    height: 550px;
    display: flex; 
    justify-content: space-between;
    .div1{
      width: 80%;
      .div1_child{
        width: calc(100% + 100px);
        height: 170px;
        display: flex;
        flex-wrap: wrap; 
        // justify-content: space-between;
        justify-content: flex-start;
        flex-direction: row;
        .div1_child_1 div{
          width: 100px;
          height: 170px;
          border: 1px solid #CCCCCC;
        }
        .div1_child_2 div{
          width: 200px;
          height: 170px;
          border: 1px solid #CCCCCC;
        }
        .div1_child_3 div{
          width: 480px;
          height: 170px;
          border: 1px solid #CCCCCC;
        }
        .ul_2{
          li{
            height: 40px
          }
        }
      }
    }
    .div2 .div2_child{
      margin-top: 20px
    }
    .div2{
      margin-top: 10px;
      line-height: 55px;
      text-align: center;
      width: 20%;
    }
  }
</style>
<style scoped>
  .div2>>> .el-button{
    width: 100px;
  }
  .houseTypeClass_authorization>>>.el-dialog__header{
      background-color: #598FBC;
   }
  .houseTypeClass_authorization>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass_authorization>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .houseTypeClass_authorization>>> .el-dialog__body{
    padding: 0px 0px;
  }
</style>