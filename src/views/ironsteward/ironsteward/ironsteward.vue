<template>
  <div class="ironsteward">
    <el-container>
      <!--左侧-->
      <el-aside  class="left"  style="width: 300px" >
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="房态筛选" name="first">
            <div class="f-one">客房信息</div>
            <div class="f-two">
              <el-input placeholder="请输入房间号" clearable v-model="inputnum">
                <template slot="append">搜索</template>
              </el-input>
            </div>
            <div class="f-three">
              <label>楼栋：</label>
              <el-select v-model="valueld" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.valueld"
                  :label="item.label"
                  :value="item.valueld">
                </el-option>
              </el-select>
            </div>
            <div class="f-three">
              <label>楼层：</label>
              <el-select v-model="valuelc" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.valuelc"
                  :label="item.label"
                  :value="item.valuelc">
                </el-option>
              </el-select>
            </div>
            <div class="f-three">
              <label>房型：</label>
              <el-select v-model="valuefx" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.valuefx"
                  :label="item.label"
                  :value="item.valuefx">
                </el-option>
              </el-select>
            </div>
            <div class="f-three">
              <label>房态：</label>
              <el-select v-model="valueft" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :key="item.valueft"
                  :label="item.label"
                  :value="item.valueft">
                </el-option>
              </el-select>
            </div>
            <div class="f-one">
              设备房态信息<label>[100]</label>
              <a>全部</a>
            </div>
            <div class="f-fore">
              <div></div>
            </div>
            <div class="f-five">
              <div></div>
            </div>
            <div class="f-six">
              <div></div>
            </div>
            <div class="f-one">
              图例说明
              <a>全部</a>
            </div>
            <div class="f-seven">
              <img src="@/assets/images/ironsteward/cateye.png"/>
              <img src="@/assets/images/ironsteward/RCU.png"/>
              <img src="@/assets/images/ironsteward/door.png"/>
            </div>
            <div class="f-eight">
              <img src="@/assets/images/ironsteward/equipment.png"/>
              <img src="@/assets/images/ironsteward/editroom.png"/>
            </div>
            <div class="f-eight">
              <img style="margin-left: 35px" src="@/assets/images/ironsteward/floorlook.png"/>
              <img style="margin-left: 68px" src="@/assets/images/ironsteward/printroom.png"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批量操作" name="second">批量操作</el-tab-pane>
        </el-tabs>
      </el-aside>
      <!--右侧-->
      <el-main  class="right" >
        <el-tabs type="card">
          <el-tab-pane label="设备房态图">
            <!--设备房态图-->
          </el-tab-pane>
          <el-tab-pane label="设备/房态对比表">
            <el-table
              :data="tableData"
              size="mini"
              style="width: 100%"
              :header-cell-style="{background:'#68819E',color:'#FFF'}">
              <el-table-column
                label="房间号码">
                <template slot-scope="scope">
                  <span>{{ scope.row.roomnum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="设备房态">
                <template slot-scope="scope">
                  <span>{{ scope.row.equroomtype }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房态">
                <template slot-scope="scope">
                  <span>{{ scope.row.roomtype }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="不一致预警">
                <template slot-scope="scope">
                  <span>{{ scope.row.inconformity }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="通知预警">
                <template slot-scope="scope">
                  <span>{{ scope.row.informwarn }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="通知次数">
                <template slot-scope="scope">
                  <span>{{ scope.row.informnum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="通知人">
                <template slot-scope="scope">
                  <span>{{ scope.row.inforperson }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注信息">
                <template slot-scope="scope">
                  <span>{{ scope.row.remarkinfo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注">
                <template slot-scope="scope">
                  <span>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <a v-if="!scope.row.isEgdit" style="cursor: pointer"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</a>
                  <a v-if="scope.row.isEgdit" style="cursor: pointer"
                    size="mini"
                    @click="handleSuccessEdit(scope.$index, scope.row)">保存</a>
                  <a
                    size="mini" style="cursor: pointer"
                    @click="handleDelete(scope.$index)">删除</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'ironsteward',
    data(){
      return {

        valueld : '',//楼栋
        valuelc : '',//楼层
        valuefx : '',//房型
        valueft : '',//房态
        inputnum :'',//搜索
        activeName2: 'first',
        tableData: [{
          roomnum: '8301',
          equroomtype: 'RCU',
          roomtype: '房态',
          inconformity : 'rcu',
          informwarn : 'rcu',
          informnum :'rcu',
          inforperson : 'mr wang',
          remarkinfo : '断线',
          remark : '无'
        }]
      }
    },

    mounted (){
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //编辑
      handleEdit(index, row) {
          this.$set(row,'isEgdit',true)
      },
      //删除
      handleDelete(index) {
          this.tableData.splice(index,1)
      },
      //编辑成功
      handleSuccessEdit(index, row) {
          this.$set(row,'isEgdit',false)
      }
    }
  }
</script>
<style lang="less" scoped>
  @left-rgba:rgba(234,237,241,1);
  //图例说明的公共样式
  .common-legend{
    margin-top: 10px;
    margin-left: 30%;
    width: 30px;
    height: 30px;
  }
  .f-style{
    margin-top: 10px;
  }
  .ironsteward{
    width: 100%;
    .left{
      background:@left-rgba;
      #tab-first,#tab-second{
        width: 151px;
        line-height: 32px;
      }
      .f-one{
        width: 100%;height: 30px;background: #EEEEEE;margin-top: 10px;
        color: #777777;line-height: 30px;padding-left: 10px;font-size: small;
        a{
          margin-right: 10px;
          float: right;
        }
      }
      .f-two{
        margin-top: 10px;
        input{
            height: 30px;
        }
        .el-input-group__append, .el-input-group__prepend{
          background-color: #4488E9;
          color: #FFFFFF;
          vertical-align: middle;
          display: table-cell;
          position: relative;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          padding: 0 20px;
          width: 1px;
          white-space: nowrap;
        }
      }
      .f-three{
        margin-top: 15px;
        label{
          font-size: 14px;
        }
        .el-select{
          margin-left: 20px;
          height: 30px;
        }
      }
      .f-fore{
        margin-top: 10px;
        div{
          .common-legend;
          background: RGB(81 199 131);
        }
      }
      .f-five{
        margin-top: 10px;
        div{
          .common-legend;
          background: RGB(58 141 245);
        }
      }
      .f-six{
        margin-top: 10px;
        div{
          .common-legend;
          background: RGB(213 70 108);
        }
      }
      .f-seven{
        margin-top: 10px;
        img{
          margin-left: 15px;
        }
      }
      .f-eight{
        margin-top: 15px;
        img{
          margin-left: 20px;
        }
      }
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      border-top: none;
      border-top: 2px solid #4488E9;
    }
    //右侧导航栏
    .el-main{
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0px;
    }
  }

</style>
