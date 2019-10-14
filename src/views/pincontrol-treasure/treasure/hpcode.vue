<template>
  <!--房价码-->
  <div class="hp-all">
    <el-tabs v-model="editableTabsValue2" type="card" @tab-click="handleEditClick" @tab-remove="removeTab">
      <el-tab-pane  v-for="(item, index) in editableTabs2" :key="item.key" :label="item.title" :name="item.name"  :labelContent="item.labelContent" :closable="item.name+''!=='0' ? true : false" >
        <!--除了第一个之外的数据-->
        <div v-if="item.name+''!=='0'">
          <el-tabs v-model="editableTabsValueIn" type="card">
            <el-tab-pane v-for="(item, index) in editableTabsIn" :key="item.name" :label="item.title" :name="item.name" >
              <div v-if="item.name === '0'">
                <div class="early-style">
                  <div class="early-style-left">
                    <ul>
                      <li><span>代码:</span><input v-model="param.code" disabled/><span>类别:</span><input v-model="param.category" @click="dialogVisiblecategory = true; select_info('category')"/></li>
                      <li>
                        <span>中文描述:</span><input v-model="param.description"/><span>英文描述:</span><input v-model="param.description_en"/></li>
                      <li>
                        <el-checkbox v-model="is_halt" style="margin-left: 1.5rem">是否停用</el-checkbox>
                        <el-checkbox v-model="is_day_user" style="margin-left: 1.5rem">日租房</el-checkbox>
                        <el-checkbox v-model="is_free" style="margin-left: 1.5rem">免费房</el-checkbox>
                        <el-checkbox v-model="is_house_user" style="margin-left: 1.5rem">自用房</el-checkbox>
                      </li>
                      <li>
                        <el-checkbox v-model="is_nego" style="margin-left: 1.5rem">是否私有</el-checkbox>
                        <el-checkbox v-model="is_secret" style="margin-left: 1.5rem">房价保密</el-checkbox>
                        <el-checkbox v-model="hpearly" style="margin-left: 1.5rem">固定房价</el-checkbox>
                        <el-checkbox v-model="hpearly" style="margin-left: 1.5rem">启用验证</el-checkbox>
                      </li>
                    </ul>
                    <ul class="ul-house-btn">
                      <button @click="refresh_Current">刷新</button><button @click="is_Edite = true; saveInfohpCode()">保存</button><button>日志</button><button>子码同步</button>
                    </ul>
                  </div>
                  <div class="early-style-right">
                    <ul>
                      <li><span>有效期起:</span><el-date-picker
                          v-model="start_date"
                          type="date"
                          size="mini"
                          style="width: 140px;margin-left: 6px"
                          placeholder="选择日期时间">
                        </el-date-picker>
                        <span>有效期止:</span><el-date-picker
                          v-model="end_date"
                          type="date"
                          size="mini"
                          style="width: 140px;margin-left: 6px"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </li>
                      <li><span>引用自:</span><input v-model="param.parent_code" @click="dialogVisibleparent_id=true; select_info()"/>
                          <span>房价码类别:</span><input v-model="param.code_type"/>
                      </li>
                      <li><span>乘法系数:</span><input v-model="param.multi"/><span>加法系数::</span><input v-model="param.addition"/></li>
                      <li><span>四舍五入:</span><el-select v-model="round_size" placeholder="请选择" size="mini" style="margin-left: 6px;width: 8vw">
                        <el-option v-for="item in RoomSizeChoice" :key="item.label" :label="item.label" :value="item.key">
                        </el-option>
                      </el-select>
                        <el-select v-model="round_tail" placeholder="请选择" size="mini" style="margin-left: 6px;width: 8vw">
                          <el-option v-for="item in RoomTailChoice" :key="item.label" :label="item.label" :value="item.key">
                          </el-option>
                        </el-select>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="item.name == '1'">
                <div class="early-style">
                  <ul>
                    <li><span>佣金码:</span><input v-model="param.cms_code" @click="dialogVisiblecms_code=true; select_info('cms_code')"/>
                      <el-checkbox v-model="is_group" style="margin-left: 1.5rem">是否集团码</el-checkbox>
                    </li>
                    <li><span>市场码:</span><input v-model="param.market" @click="dialogVisiblemarket=true; select_info('market')"/>
                      <!--<el-checkbox v-model="hpearly" style="margin-left: 1.5rem">锁定</el-checkbox>--><span>集团码:</span><input v-model="param.group_code"/></li>
                    <li><span>来源码:</span><input v-model="param.src" @click="dialogVisiblesrc=true; select_info('src')"/>
                      <!--<el-checkbox v-model="hpearly" style="margin-left: 1.5rem">锁定</el-checkbox>-->
                    </li>
                  </ul>
                  <ul class="ul-market-btn">
                    <button @click="refresh_Current">刷新</button><button @click="is_Edite = true; saveInfohpCode()">保存</button><button>日志</button><button>子码同步</button>
                  </ul>
                </div>
              </div>
              <div v-if="item.name == '2'">
                <div class="early-style">
                  <ul>
                    <li><span>包价:</span><input v-model="param.packages"/><span>客房布置:</span><input @click="dialogVisibleamenities = true; select_info('amenities')" v-model="param.amenities"/>
                      <el-checkbox v-model="hpearly" style="margin-left: 1.5rem">启用验证</el-checkbox>
                    </li>
                    <li><span>提前天数:</span><input style="width: 90px" type="number" v-model="param.adv_min_day"/><label>至</label><input style="width: 90px" type="number" v-model="param.adv_max_day"/><span>入住天数:</span><input style="width: 90px" type="number" v-model="param.checkin_min_day"/><label>至</label><input style="width: 90px" type="number" v-model="param.checkin_max_day"/>
                      <el-checkbox v-model="hpearly" style="margin-left: 1.5rem">必须预付</el-checkbox>
                    </li>
                  </ul>
                  <ul class="ul-btn">
                    <button @click="refresh_Current">刷新</button><button @click="is_Edite = true; saveInfohpCode()">保存</button><button>日志</button><button>子码同步</button>
                  </ul>
                </div>
              </div>
              <div v-if="item.name == '3'" class="">
                <el-table :data="tableDataupdate" style="width: 100%" :header-cell-style="{background:'#68819E',color:'#FFFFFF'}" size="mini" height="200px">
                  <el-table-column prop="date" label="用户名">
                  </el-table-column>
                  <el-table-column prop="name" label="修改时间" width="170">
                  </el-table-column>
                  <el-table-column prop="address" label="修改起始日" width="170">
                  </el-table-column>
                  <el-table-column prop="address" label="修改截止日" width="170">
                  </el-table-column>
                  <el-table-column prop="address" label="房型">
                  </el-table-column>
                  <el-table-column prop="address" label="原始房价">
                  </el-table-column>
                  <el-table-column prop="address" label="改后房价">
                  </el-table-column>
                  <el-table-column prop="address" label="备注">
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <div class="common-search">
              <span>检索条件:</span><input disabled/><span>房型:</span><input disabled/><span>显示内容:</span>
              <el-checkbox v-model="houseprice" disabled="">房价</el-checkbox>
              <el-checkbox v-model="hpearly" disabled="">包早</el-checkbox>
              <el-checkbox v-model="addbedprice" disabled="">加床价</el-checkbox>
              <button @click="search_hint()">查询</button>
            </div>
            <div class="common-div">
              <el-table :data="commontableinfo" max-height="500" :cell-style="{textAlign:'center'}" style="width: 100%" :header-cell-style="{background:'#303A41',color:'#FFFFFF',textAlign:'center'}" size="mini" height="200px">
                <!--表头-->
                <el-table-column prop="room_type" label="房型">
                </el-table-column>
                <template v-for="(col,index) in base_title">
                  <el-table-column :prop=col.prop :label=col.label>
                  </el-table-column>
                </template>
              </el-table>
            </div>
            <div class="common-btn">
              <button @click="dialogVisibleafastSet = true; flushSet()">设置</button><button>续期</button><button>钟点价</button><button>日志</button><button @click="delete_byid">删除</button><button>清空</button>
            </div>
          </el-tabs>
        </div>
        <!--第一个tab的数据-->
        <div v-else style="padding: 1%;padding-top: 0">
          <div class="z-fixed" style="height: 4rem;line-height: 4rem;">
            <i class="el-icon-setting" style="font-size: 1.5rem"></i>
            <span style="padding-left: 0.5rem">房间码列表</span>
          </div>
          <div style="height: 3rem">
            <div style="width: 15%;height: 100%;float: left;" class="z-fixed">
              <div style="width: 20%;float: left;">
                <span class="font-four">类别:</span>
              </div>
              <div style="width: 74%;float: left">
                <el-select disabled v-model="valuetype" placeholder="请选择" size="mini">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div style="width: 18%;height: 100%;float: left;" class="z-fixed">
              <div style="width: 25%;float: left;text-align: center">
                <span class="font-four">房价码:</span>
              </div>
              <div style="width: 74%;float: left">
                <el-input v-model="input1" placeholder="请输入内容" size="mini" disabled></el-input>
              </div>
            </div>
            <div style="width: 18%;height: 100%;float: left;" class="z-fixed">
              <div style="width: 25%;float: left;text-align: center">
                <span class="font-four">描述:</span>
              </div>
              <div style="width: 74%;float: left">
                <el-input disabled v-model="input2" placeholder="请输入内容" size="mini"></el-input>
              </div>
            </div>
            <div style="width: 8%;height: 100%;float: left;" class="z-fixed">
              <div style="width: 100%;float: left;text-align: center">
                <span class="font-four">包括停用:</span>
              </div>
              <div style="width: 50%;float: left">
                <el-checkbox disabled v-model="checked"></el-checkbox>
              </div>
            </div>

            <div style="width: 18%;height: 100%;float: left;" class="z-fixed">
              <el-button @click="search_hint" type="primary" size="mini">查询</el-button>
            </div>
          </div>
          <div style="margin-top: 1rem">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="flush();setTitle()">新增</el-button>
          </div>
          <div style="margin-top: 1rem">
            <template>
              <div>
                <el-table @row-click="handleClick" :cell-style="{textAlign:'center'}" v-loading="loading" @tab-click="handleChangeClick" :header-cell-style="{background:'rgb(48, 58, 65)',color:'#FFFFFF',textAlign:'center'}" :data="tableDatahpcode" size="mini" height="300px" style="width: 100%">
                  <el-table-column fixed="left" label="代码">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">
                        {{scope.row.code}}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="parent_code" label="引用自">
                  </el-table-column>
                  <el-table-column prop="multi" label="乘法系数">
                  </el-table-column>
                  <el-table-column prop="addition" label="加法系数">
                  </el-table-column>
                  <el-table-column prop="category" label="类别">
                  </el-table-column>
                  <el-table-column prop="description" label="描述">
                  </el-table-column>
                  <el-table-column prop="start_date" label="开始时间" width="140">
                  </el-table-column>
                  <el-table-column prop="end_date" label="结束时间" width="140">
                  </el-table-column>
                  <el-table-column prop="packages" label="包价">
                  </el-table-column>
                  <el-table-column prop="market" label="市场码">
                  </el-table-column>
                  <el-table-column prop="src" label="来源码">
                  </el-table-column>
                  <el-table-column prop="ta_code" label="佣金码">
                  </el-table-column>
                  <el-table-column prop="create_user" label="创建用户">
                  </el-table-column>
                  <el-table-column prop="create_time" label="创建时间" width="170px">
                  </el-table-column>
                </el-table>
              </div>
              <div class="block" style="float: right;margin-top: 10px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </template>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--dialog部分，实现的是新增和更新的操作-->
    <el-dialog :title="title" fullscreen :visible.sync="dialogVisibleHpCode" width="60%" class="dialog-style">
      <el-card class="card">
        <ul>
          <li><span>*代码:</span><input v-model="param.code" /><span>排序:</span><input type="number" v-model="param.order" /></li>
          <li><span>对应集团码:</span><input v-model="param.group_code" /><span>*描述:</span><input v-model="param.description" /></li>
          <li><span>*英文描述:</span><input v-model="param.description_en" /><span>取消规则:</span><input v-model="param.cancel_rule" /></li>
          <li><span>特惠描述:</span><input v-model="param.remark" /><span>最大提前天数:</span><input type="number" v-model="param.adv_max_day" /></li>
          <li><span>最小提前天数:</span><input type="number" v-model="param.adv_min_day" /><span>*房价码类别：</span><input v-model="param.code_type"/></li>
          <li><span>*开始日期:</span><el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="start_date" size="mini" style="width: 200px;margin-left: 10px" type="date" placeholder="选择日期时间"></el-date-picker><span>*结束日期:</span><el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="end_date" size="mini" style="width: 200px;margin-left: 10px" type="date" placeholder="选择日期时间"></el-date-picker></li>
        </ul>
        <ul>
          <li>
            <span>*类别:</span>
            <el-select v-model="param.category" @focus="select_info('category')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in options_category" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
            <span>包价:</span>
            <el-select v-model="param.packages" @focus="select_info('packages')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 3px">
              <el-option v-for="item in options_packages" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>佣金码:</span>
            <el-select v-model="param.cms_code" @focus="select_info('cms_code')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in options_cms_code" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
            <span>客房布置:</span>
            <el-select multiple collapse-tags v-model="param.amenities" @focus="select_info('amenities')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 3px">
              <el-option  v-for="item in options_amenities" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>市场码:</span>
            <el-select v-model="param.market" @focus="select_info('market')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in options_market" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
            <span>来源码:</span>
            <el-select v-model="param.src" @focus="select_info('src')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 3px">
              <el-option v-for="item in options_src" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
          </li>
          <li>
            <!--<span>入账代码:</span>
            <el-select v-model="param.ta_code" @focus="select_info('ta_code')" placeholder="请选择" size="mini" style="margin-left: 6px">
              <el-option v-for="item in options" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>-->
            <span>基础房价码设置:</span>
            <el-select v-model="param.parent_code" @focus="select_info()" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in options_parent_code" :key="item.code" :label="item.description" :value="item.code">
              </el-option>
            </el-select>
            <span v-show="maskparent">引用自:</span>
            <el-select v-show="maskparent" v-model="param.parent_code" @focus="select_info()" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in options_parent_code" :key="item.value" :label="item.descript" :value="item.code">
              </el-option>
            </el-select>
          </li>

          <li v-show="maskextendli">
            <!--这里是新建房价码内容的设置-->
            <span>四舍五入位数:</span>
            <el-select v-model="round_size" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in RoomSizeChoice" :key="item.value" :label="item.label" :value="item.key">
              </el-option>
            </el-select>
            <span>四舍五入末尾数:</span>
            <el-select v-model="round_tail" @focus="select_info('round_tail')" placeholder="请选择" size="mini" style="width: 200px;margin-left: 6px">
              <el-option v-for="item in RoomTailChoice" :key="item.value" :label="item.label" :value="item.key">
              </el-option>
            </el-select>
          </li>
          <li v-show="maskextendli">
            <!--这里是新建房价码内容的设置-->
            <span>加法系数:</span><input type="number" v-model="param.addition"/>
            <span>乘法系数:</span><input v-model="param.multi"/>
          </li>
        </ul>
      </el-card>
      <el-card class="card" style="margin-top: 10px">
        <el-checkbox v-model="param.is_group">是否集团</el-checkbox>
        <el-checkbox v-model="param.is_house_user">是否可用</el-checkbox>
        <el-checkbox v-model="param.checked">是否自用房</el-checkbox>
        <el-checkbox v-model="param.is_free">是否免费房</el-checkbox>
        <el-checkbox v-model="param.is_day_user">是否日租房</el-checkbox>
        <el-checkbox v-model="param.is_secret">是否房价保密</el-checkbox>
        <el-checkbox v-model="param.is_nego">是否协议公司私有价格</el-checkbox>
        <ul>
          <li>
            <!--<el-checkbox v-model="param.is_nego">是否协议公司私有价格</el-checkbox>-->
          </li>
        </ul>
      </el-card>
      <span slot="footer" class="dialog-footer">
         <button @click="dialogVisibleHpCode = false">取 消</button>
         <button type="primary" @click="saveInfohpCode">确 定</button>
      </span>
    </el-dialog>
    <!--dialog 来源码的部分-->
    <el-dialog title="来源码" fullscreen :visible.sync="dialogVisiblesrc" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <el-table
        :data="tableDatasrc"
        size="mini"
        @row-click="select_src"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF'}"
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
      </el-table>
    </el-dialog>
    <!--dialog 市场码部分-->
     <el-dialog title="市场码" fullscreen :visible.sync="dialogVisiblemarket" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <el-table
        :data="tableDatamarket"
        size="mini"
        @row-click="select_market"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF'}"
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
      </el-table>
    </el-dialog>
    <!--dialog 佣金码部分-->
    <el-dialog title="佣金码" fullscreen :visible.sync="dialogVisiblecms_code" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <el-table
        :data="tableDatacms_code"
        size="mini"
        @row-click="select_cms_code"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF'}"
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
      </el-table>
    </el-dialog>
    <!--dialog 引用自部分-->
    <el-dialog title="引用自" fullscreen :visible.sync="dialogVisibleparent_id" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <el-table
        :data="tableDataparent_code"
        size="mini"
        @row-click="select_parent_code"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF',textAlign:'center'}"
        style="width: 100%">
        <el-table-column
          prop="code"
          label="代码">
        </el-table-column>
        <el-table-column
          prop="description"
          label="中文描述">
        </el-table-column>
        <el-table-column
          prop="description_en"
          label="英文描述">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--dialog 类别部分-->
    <el-dialog title="类别" fullscreen :visible.sync="dialogVisiblecategory" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <el-table
        :data="tableDatacategory"
        size="mini"
        @row-click="select_category"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF'}"
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
      </el-table>
    </el-dialog>
    <!--dialog 客房设置部分-->
    <el-dialog title="客房布置" fullscreen :visible.sync="dialogVisibleamenities" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <el-table
        ref="multipleTable"
        :data="tableDataamenities"
        size="mini"
        @selection-change="SelectionChange_amenities"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF'}"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
      </el-table>
      <span slot="footer" class="dialog-footer">
          <button @click="dialogVisibleamenities = false">取 消</button>
          <button type="primary" @click="dialogVisibleamenities = false">确 定</button>
      </span>
    </el-dialog>
    <!--快速设置的dialog-->
    <el-dialog title="快速设置" fullscreen :visible.sync="dialogVisibleafastSet" width="30vw" :style="{height:'50vw'}" top="20vh"  class="dialog-style">
      <ul style="margin-bottom: 10px">
        <li><span>有效期起:</span><el-date-picker
          v-model="start_date_price_code"
          type="date"
          size="mini"
          value-format="yyyy-MM-dd"
          style="width: 140px;margin-left: 6px"
          placeholder="选择日期时间">
        </el-date-picker>
          <span>有效期止:</span><el-date-picker
            v-model="end_date_price_code"
            type="date"
            size="mini"
            value-format="yyyy-MM-dd"
            style="width: 140px;margin-left: 6px"
            placeholder="选择日期时间">
          </el-date-picker>
        </li>
      </ul>
      <el-table
        ref="multipleTable"
        size="mini"
        :data="tableDatafastSet"
        :cell-style="{textAlign:'center'}"
        tooltip-effect="dark"
        :header-cell-style="{background:'#68819E',color:'#FFFFFF',textAlign:'center'}"
        style="width: 100vw"
        @selection-change="SelectionfastSet">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          label="房类">
          <template slot-scope="scope">
            <span style="cursor: pointer" @click="setRow(scope.row,scope.$index)" type="text" size="mini">{{scope.row.room_type_name+"→"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="week0"
          label="周日">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week0" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="week1"
          label="周一">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week1" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="week2"
          label="周二">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week2" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="week3"
          label="周三">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week3" :value="scope.row.week3" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="week4"
          label="周四">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week4" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="week5"
          label="周五">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week5" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="week6"
          label="周六">
          <template slot-scope="scope">
            <el-input v-model="scope.row.week6" @input="SetValue($event,scope.$index)" size="mini" style="width: 6vw"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleafastSet = false">取 消</button>
        <button type="primary" @click="fast_set()">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "hpcode",
    data() {
      return {
        rate_code : '',//当前的房价码
        room_type_list : [],//请求房价码下面房型的价格的参数
        start_date_price_code : '',//房价码开始时间
        end_date_price_code  : '',//房价码结束时间
        start_date: '', //开始时间
        end_date: '', //结束时间
        scope:{},
        base_title:[],//动态修改表头
        //datetest
        datetest : 'this is test',
        //全局的authorization   http://47.98.113.173:9519/v1/common/employee/create_token?hotel_group_id=1&hotel_id=1&user_id=1&user_name=super_root
        authorization : '',
        //来源码的dialog
        dialogVisiblesrc : false,
        tableDatasrc : [],
        //市场码的dialog
        dialogVisiblemarket : false,
        tableDatamarket : [],
        //佣金码的dialog
        dialogVisiblecms_code : false,
        tableDatacms_code : [],
        //引用自的dialog
        dialogVisibleparent_id : false,
        tableDataparent_id : [],
        //类别的dialog
        dialogVisiblecategory : false,
        tableDatacategory : [],
        //客房布置的dialog
        dialogVisibleamenities : false,
        tableDataamenities : [],
        //快速设置的dialog
        dialogVisibleafastSet : false,
        //重置用户输入的最后一条数据
        reSetValue : '',
        curr_index : '',
        curr_row : [],
        tableDatafastSet : [],
        set_table_fast : [],//用户选择的对应列
        //新增dialog 的显示与隐藏
        dialogVisibleHpCode: false,
        //所有下拉框的数据
        category : '',//类别
        cms_code : '',//佣金码
        market : '',//市场码
        src : '',//来源码
        parent_id : '',//引用自
        //所有check的默认值
        is_halt : false,//是否停用
        is_house_user: false, //是否自用房
        is_free: false, //是否免费房
        is_day_user: false, //是否日租房
        is_nego: false, //是否协议公司私有价格
        is_secret: false, //是否房价保密
        is_group: false, //是否集团
        //checkbox
        houseprice: false, //房价
        hpearly: false, //包早
        addbedprice: false, //加床价
        //公共部分的table - and id
        commontableinfo: [],
        //删除使用的common_id
        common_id : 0,
        title : '房价码',
        //测试数据是否加载结束
        loading : true,
        //tabpane的修改记录
        tableDataupdate: [],
        //页面的刷新操作
        refresh_flag : true,
        //url
        url: '47.98.113.173:9101/v1',
        //parent_id 隐藏
        maskparent: false,
        //扩展的li
        maskextendli: false,
        //每一行的id
        rowid: '',
        //分页
        currentPage: 1,
        pagesize: 10,
        total: 0,
        //url
        //url: '47.98.113.173:9502',
        //tab栏
        editableTabsValue2: '0',
        editableTabsValueIn: '0',
        //房价码列表绑定的tab
        editableTabs2: [{
          title: '房价码列表',
          name: '0',
          labelContent: ()=>{},
          content: 'Tab 1 content'
        }],
        //房价码详细信息绑定的tab
        editableTabsIn: [{
          title: '房价码基础信息',
          name: '0',
        }, {
          title: '市场信息',
          name: '1',
        }, {
          title: '早餐及限定条件',
          name: '2',
        }, {
          title: '修改记录',
          name: '3',
        }],
        tabIndex: 2,
        //所有的下拉框 作为一个中转站
        options: [],
        //类别绑定字段
        valuetype: '',
        input1: "",
        input2: "",
        //多选框的字段绑定
        checked: false,
        //主页中list-table数据
        tableDatahpcode: [{
          parent_id:"12",
          multi:"456"
        }],
        //新增需要的数据，作为一个刷新数据用的
        param : {},
        //快速设置需要的数据
        paramSet : {},
        addition : '0',//加法系数
        multi : '0',//乘法系数
        //四舍五入位数
        round_size : '',
        RoomSizeChoice: [{
          key: '100',
          label: '100',
        }, {
          key: '10',
          label: '10',
        }, {
          key: '1',
          label: '1',
        }, {
          key: '0.1',
          label: '0.1',
        }, {
          key: '0.01',
          label: '0.01',
        }],
        //四舍五入末尾数
        round_tail : '',
        RoomTailChoice: [{
          key: 'up',
          label: '全部入上',
        }, {
          key: 'down',
          label: '全部舍去',
        }, {
          key: 'normal',
          label: '正常四舍五入',
        }],
        options_cms_code : [],
        SizeChoice: '',
        TailChoice: '',
        //用来绑定options的值
        options_category: [], //类别
        options_amenities: [], //客房布置
        options_market: [], //市场码
        options_src: [], //来源码
        options_parent_code : [],//房价码基础设置
        options_packages : [], //包价选择
        //判断是否为更新的操作
        is_Edite : true,
        //引用自
        options_parent_id : [],

      }
    },
    created: function() {
      this.getAuthorization();
    },
    methods: {
      /**
       * @search_hint 搜索提示
       */
      search_hint(){
        let that = this;
         that.hintInfo('warning','该功能暂未开放！')
      },
      /**
       * @SetValue 重置最后一组数据
       * @param no
       */
      SetValue(value,index){
         let that = this;
         console.info(value);
         that.curr_index = index;
         that.check_number(value);
      },
      /**
       * @check_number 判断用户输入是不是合理的数字
       * @param no
       */
      check_number(value){
        let that = this;
        //that.reSetValue = val;
        let re_gu = "^([0-9]*[.0-9])$"; // 小数测试
        let re = new RegExp(re_gu);
        value.search(re) === -1 ? that.reSetValue = value.toFixed(2) : that.reSetValue = parseInt(value.replace(/[^0-9-]+/,'')).toFixed(2);
        console.info(that.reSetValue);
      },
      /**
       * @setRow 重置当前行的数据
       * @param no
       */
      setRow(row,index){
        let that = this;
        console.info(row);
        if(parseInt(index) === parseInt(that.curr_index)){
          row.week0 = that.reSetValue;
          row.week1 = that.reSetValue;
          row.week2 = that.reSetValue;
          row.week3 = that.reSetValue;
          row.week4 = that.reSetValue;
          row.week5 = that.reSetValue;
          row.week6 = that.reSetValue;
        }else{
          that.hint_sync(row);
        }
      },
      /**
       * @hint_sync 同步数据
       * @param no
       */
      hint_sync(row) {
        let that = this;
        that.$confirm('指定的数据不在当前行，是否继续？', '同步警告！！！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '同步成功!',
          });
          that.Set_row_vlaue(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消同步',
          });
        });
      },
      /**
       * @Set_row_vlaue  同步当前行的数据
       * @param no
       */
      Set_row_vlaue(row){
        let that = this;
        console.info(row,that.reSetValue);
        row.week0 = that.reSetValue;
        row.week1 = that.reSetValue;
        row.week2 = that.reSetValue;
        row.week3 = that.reSetValue;
        row.week4 = that.reSetValue;
        row.week5 = that.reSetValue;
        row.week6 = that.reSetValue;
        console.info(row.week0);
        console.info(that.tableDatafastSet);
      },
      /**
       * @SelectionfastSet 快速设置的函数多选的情况
       */
      SelectionfastSet(selection){
        let that = this;
        that.set_table_fast = selection;
        console.info(that.set_table_fast);
      },
      /**
       * @fast_set 提交快速设置的信息
       */
      fast_set(){
        let that= this;
        /**
         * 判断用户是不是将时间段选择了！然后判断时间段的合理性
         */
        if(!that.start_date_price_code || !that.end_date_price_code){
           that.hintInfo('warning','请选择设置的时间段！');
           that.dialogVisibleafastSet = true;
           return false;
        }else{
          if((that.start_date_price_code === that.end_date_price_code) || (that.start_date_price_code > that.end_date_price_code)){
            that.hintInfo('warning','请选择合理的时间段！');
            that.dialogVisibleafastSet = true;
            return false;
          }else{
            that.dialogVisibleafastSet = false;
            let dataobj = {};
            let days_data = {};
            let tableDatafastSet = [];
            console.info(that.set_table_fast);
            console.info(that.tableDatafastSet);
            for(let i in that.set_table_fast){
              tableDatafastSet.push(that.set_table_fast[i]);
            }
            let final_data = [];
            let url = 'http://'+that.url + '/rate_code/add_rate_code_log/';
            for(let i in tableDatafastSet){
              /**
               * 将第一个值room重置为一个新的数组
               * @type {string}
               */
              if(final_data.length > 0){
                final_data = [];
                final_data.push(tableDatafastSet[i]);
              }else{
                final_data.push(tableDatafastSet[i]);
              }
              dataobj = final_data.map((res,index)=>{
                return {
                  room_class_name : res.room_class_name,
                  code : res.code,
                }
              });
              days_data = final_data.map((res,index)=>{
                return {
                  0 : res.week0 ? res.week0 : "0.00",
                  1 : res.week1 ? res.week1 : "0.00",
                  2 : res.week2 ? res.week2 : "0.00",
                  3 : res.week3 ? res.week3 : "0.00",
                  4 : res.week4 ? res.week4 : "0.00",
                  5 : res.week5 ? res.week5 : "0.00",
                  6 : res.week6 ? res.week6 : "0.00",
                }
              });
              that.$axios({
                method : 'post',
                url : url,
                data :{
                  operation_type : 'A',
                  rate_code : that.param.code,
                  begin_date : that.start_date_price_code,
                  end_date : that.end_date_price_code,
                  room_types : dataobj[0].code,
                  days_data : JSON.stringify(days_data[0]),
                }
              }).then((res)=>{
                console.info(res);
              }).catch((err)=>{
                console.error(err);
              })
            }
          }
        }
      },

      /**
       * @flush 初始化除了快速设置的数据 新增用到的所有数据
       */
      flush: function() {
        let that = this;
        //新增的时候将编辑的标志位重置为false
        that.is_Edite = false;
        that.param = {
            code: '', //代码
            is_group: false, //是否集团
            group_code: '', //对应集团码
            category: '', //类别
            description: '', //描述
            description_en: '', //英文描述
            remark: '', //特惠描述
            is_halt: false, //是否可用
            parent_code: '', //父节点（引用自）
            parent_id: '', //引用id
            addition: 0, //加法系数
            multi: 0.00, //乘法系数
            packages: '', //包价
            amenities: '', //客房布置
            adv_max_day: 0, //最大提前天数
            adv_min_day: 0, //最小提前天数
            cancel_rule: '', //取消规则
            cms_code: '', //佣金码
            market: '', //市场码
            src: '', //来源码
            is_house_user: false, //是否自用房
            is_free: false, //是否免费房
            is_day_user: false, //是否日租房
            is_nego: false, //是否协议公司私有价格
            is_secret: false, //是否房价保密
            order: 0, //排序
            ta_code: '', //入账代码
            checkin_max_day : 1,//最大入住天数
            checkin_min_day : 0,//最小入住天数
            code_type : '',//类别
        }
      },
      /**
       * @flushSet  初始化快速设置的数据  需要将全部的房类拿到
       * @param no
       * @aim 该函数在点击重置的时候可以初始化所有的数据，点击设置的时候也可以重置数据
       */
      flushSet(){
        let that = this;
        that.paramSet = {
             week1 : 0.00,
             week2 : 0.00,
             week3 : 0.00,
             week4 : 0.00,
             week5 : 0.00,
             week6 : 0.00,
             week0 : 0.00,
        };
       let url = 'http://room.crowncrystalhotel.com/v1/room/get_roomtype_list_tree/';
        that.$axios({
            method : 'get',
            url : url,
            params:{
             rate_code : that.param.code
            }
        }).then((res)=>{
          console.info(res);
           that.tableDatafastSet = res.data.data;
        }).catch((err)=>{
          console.error(err);
        })
      },
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
       * @info 需要提示的信息
       */
      hintInfo : function(hint,info){
        let that = this;
        if(hint === "success"){
          that.$message({
            message: info,
            type: 'success'
          });
        }else if(hint == "warning"){
          that.$message({
            message: info,
            type: 'warning'
          });
        }else{
          this.$message.error('出错了！');
        }
      },
      /**
       * @options_select
       */
      fatherData(urlData) {
        return this.$axios({
          methods: 'get',
          url: urlData.url
        }).then((res) => {
          if(res && res.data.data.results && res.data.data.results.length > 0) {
            return res.data.data.results
          }
        }).catch((err) => {
        });
      },
      /**
       * @select_info options的选择函数
       * @param category packages cms_code amenities market src ta_code parent_code
       * @desc 直接根据用户选择不同的option 进行不同的url，将options的值重置掉
       * @urlData
       */
      select_info: function(flag_char) {
        let that = this;
        let urlData = '';
        if(flag_char === 'category') {
          //分类  需要更改接口的地方
          urlData = "http://47.98.113.173:9103/v1/system/settings/get_code_base_list/?parent_code=ratecode_categroy&page_size=100"
          that.fatherData({
            url: urlData
          }).then((res) => {
            console.info(res);
            that.options_category = res;
            that.tableDatacategory = res;
          });
        } else if(flag_char === 'packages') {
          //包价
          //urlData = 'http://192.168.4.234:8002/v1/rate_code/get_breakfast_list/';
          that.fatherData({
            url: urlData
          }).then((res) => {
            that.options_packages = res;
          });
        } else if(flag_char === 'cms_code') {
          //佣金码
          urlData = '';
          that.fatherData({
            url: urlData
          }).then((res) => {
            that.options_cms_code = res;
          });
        } else if(flag_char === 'amenities') {
          //客房布置
          urlData = 'http://47.98.113.173:8095/v1/system/settings/get_code_base_list/?parent_code=amenities&page_size=100';
          that.fatherData({
            url: urlData
          }).then((res) => {
            that.options_amenities = res;
            that.tableDataamenities = res;
            //that.toggleSelection(that.tableDataamenities[1]);
          });
        } else if(flag_char === 'market') {
          //市场码
          urlData = 'http://47.98.113.173:9103/v1/system/settings/get_code_base_list/?parent_code=market_code&page_size=100';
          that.fatherData({
            url: urlData
          }).then((res) => {
            that.options_market = res;
            that.tableDatamarket = res;
          });
        } else if(flag_char === 'src') {
          //来源码
          urlData = 'http://47.98.113.173:9103/v1/system/settings/get_code_base_list/?parent_code=src_code&page_size=100';
          that.fatherData({
            url: urlData
          }).then((res) => {
            that.options_src = res;
            that.tableDatasrc = res;
          });
        } else if(flag_char === 'ta_code') {
          //入账代码
          urlData = 'http://47.98.113.173:9103/v1/system/settings/get_code_transaction_list/';
        } else if(flag_char === 'parent_code') {
          //查询基础房价码设置
          that.maskextendli = true;
          //urlData = 'http://192.168.4.234:8002/v1/rate_code/get_breakfast_list/';
        } else {
          //引用id
          urlData = 'http://47.98.113.173:9101/v1/rate_code/get_rate_code_list/';
          that.maskextendli = true;
          that.fatherData({
            url: urlData
          }).then((res) => {
            console.info(res);
            that.options_parent_code = res;
            console.info(that.rate_code);
            let tableDataparent_code = res.map((res)=>{
               if(res.code !== that.rate_code)
               return {
                 code : res.code,
                 description : res.description,
                 description_en : res.description_en
               }
            })
            that.tableDataparent_code = tableDataparent_code;
          });
        }
      },
      /**
       * @getAuthorization 获取授权信息
       * @param no
       */
      getAuthorization(){
        let that = this;
        let url = 'http://47.98.113.173:9519/v1/common/employee/create_token?hotel_group_id=1&hotel_id=1&user_id=1&user_name=super_root';
        that.$axios({
          method : 'get',
          url : url,
        }).then((res)=>{
          if(res.data.message === 'success'){
            that.authorization = res.data.authorization;
            that.hintInfo('success','授权刷新成功');
            that.searchall();
          }else{
            console.info(res);
          }
        }).catch((err)=>{
          console.info(err);
        })
      },
      /**
       * @param searchall  查询所有的房价码列表
       * @param code group_id hotel_id
       */
      searchall: function() {
        let that = this;
        let url = 'http://' + that.url + '/rate_code/get_rate_code_list/';
        //let url = 'http://47.98.113.173:8095/v1/system/settings/get_code_transaction_list/';
        this.$axios({
          method: 'get',
          url: url,
        }).then(function(res) {
          console.info(res);
          if(res.data.message === 'success'){
            that.tableDatahpcode = res.data.data.results;
            that.total = res.data.data.count;
            that.loading = false;
          }else{
            that.loading = true;
          }
        }).catch(function(err) {
          that.loading = true;
        })
      },
      /**
       * @handleChangeClick 切换tab的时候的函数
       */
      handleChangeClick: function(tab, event) {
        console.log(tab.name);
      },
      /**
       * @getTime 获取当前日期
       */
      getTime(){
        let date = new Date(); //创建时间对象
        let year = date.getFullYear(); //获取年
        let month = date.getMonth()+1;//获取月
        let day = date.getDate(); //获取当日
        let time = year+"-"+month+"-"+day; //组合时间
        return time;
       },
      /**
       * @getTime_seven 获取当前日期的往后七天
       */
      getTime_seven(){
        let value_day = new Date();
        let target_day_milliseconds = value_day.getTime() + 1000 * 60 * 60 * 24 * 7;
        value_day.setTime(target_day_milliseconds);
        let year = value_day.getFullYear(); //获取年
        let month = value_day.getMonth()+1;//获取月
        let day = value_day.getDate(); //获取当日
        let time = year+"-"+month+"-"+day; //组合时间
        return time;
      },
      /**
       * @param val  新增一个tab栏
       */
      handleClick(val) {
        let that = this;
        console.info(val);
        that.rate_code = val.code;//将当前的房价码重置一下
        /**
         * 先拿到所有的房型
         */
        let rooms_list = [];
        let url = 'http://room.crowncrystalhotel.com/v1/room/get_roomtype_list_tree/';
        that.$axios({
           method : 'get',
           url : url,
           params : {
             rate_code : val.code
           }
        }).then((res)=>{
           that.room_type_list = res.data.data;
           console.info(that.room_type_list);
           for(let i in that.room_type_list){
              rooms_list.push(that.room_type_list[i].code);
           }
           console.info(rooms_list);
          /**
           *  成功以后将表格的数据渲染出来
           *  拿到的是未来七天的房价码
           */
          that.$axios({
              method : 'post',
              url : 'http://47.98.113.173:9101/v1/rate_code/get_rate_code/',
              data : {
                rate_code : val.code,
                begin_date : that.getTime(),
                end_date : that.getTime_seven(),
                room_type_list : rooms_list,
              }
          }).then((res)=>{
             console.info(res);
             that.commontableinfo = res.data.data.room_type_price;
             console.info(that.commontableinfo);
          }).catch((err)=>{
             console.error(err);
          })
        }).catch((err)=>{
           console.error(err);
        });
        if(this.editableTabs2 && this.editableTabs2.length > 0) {
          let isHave = that.editableTabs2.find(function(item) {
            let data = '';
            if(val.code + '' === item.title + '') {
              data = item;
            }
            return data;
          });
          if(!isHave) {
            let dataList = [];
            let param = {
              title: val.code,
              name: that.editableTabs2.length + "",
              labelContent: that.reSet_id(val.id),
              tab_id : that.reSet_id(val.id),
              content: ""
            };
            dataList = that.editableTabs2.concat(param);
            that.editableTabs2 = dataList;
            //请求详细信息的接口
            that.common_id = val.id;
            that.editableTabsValue2 = (that.editableTabs2.length - 1) + '';
            that.searchInfo_Details(val.id,val.code);
            that.change_days();
          } else {
            that.editableTabsValue2 = isHave.name;
            that.common_id = val.id;
            that.searchInfo_Details(val.id,val.code);
            that.change_days();
          }
        }
      },
      /**
       * @reSet_id
       * @param id
       */
      reSet_id(id){
        return id;
      },
      searchInfo_Details(id,rate_code){
        let that = this;
        that.rate_code = rate_code;//将当前的房价码重置一下
        console.info(that.rate_code);
        /**
         * 请求详细信息的接口  每次新建一个的时候都会加载
         */
        /**
         * 先拿到所有的房型
         */
        let rooms_list = [];
        that.$axios({
          method : 'get',
          url : 'http://room.crowncrystalhotel.com/v1/room/get_roomtype_list_tree/',
          params : {
            rate_code : rate_code
          }
        }).then((res)=>{
          that.room_type_list = res.data.data;
          console.info(that.room_type_list);
          for(let i in that.room_type_list){
            rooms_list.push(that.room_type_list[i].code);
          }
          console.info(rooms_list);
          /**
           *  成功以后将表格的数据渲染出来
           *  拿到的是未来七天的房价码
           */
          that.$axios({
            method : 'post',
            url : 'http://47.98.113.173:9101/v1/rate_code/get_rate_code/',
            data : {
              rate_code : rate_code,
              begin_date : that.getTime(),
              end_date : that.getTime_seven(),
              room_type_list : rooms_list,
            }
          }).then((res)=>{
            console.info(res);
            that.commontableinfo = res.data.data.room_type_price;
          }).catch((err)=>{
            console.error(err);
          })
        }).catch((err)=>{
          console.error(err);
        });
        that.flush();
        let url = 'http://' + that.url + '/rate_code/get_rate_code_info/' + id + '/';
        that.$axios({
          method: 'get',
          url: url,
        }).then(function(res) {
          that.refresh_flag = true;
          let resinfo = res.data.data;
          console.info(res);
          that.param.code = resinfo.code;
          that.param.parent_code = resinfo.parent_code;
          that.param.description = resinfo.description;
          that.param.description_en = resinfo.description_en;
          that.param.cms_code = resinfo.cms_code;
          that.param.amenities = resinfo.amenities;
          that.param.packages = resinfo.packages;
          that.param.adv_max_day = resinfo.adv_max_day;
          that.param.adv_min_day = resinfo.adv_min_day;
          that.start_date = resinfo.start_date;
          that.end_date = resinfo.end_date;
          that.param.code_type = resinfo.code_type;
          that.param.group_code = resinfo.group_code;
          that.param.addition = resinfo.addition;
          that.param.multi = resinfo.multi;
          that.param.packages = resinfo.packages;
          that.param.checkin_min_day = resinfo.checkin_min_day;
          that.param.checkin_max_day = resinfo.checkin_max_day;
          that.param.market = resinfo.market;
          that.param.src = resinfo.src;
          that.round_size = resinfo.round_size;
          that.round_tail = resinfo.round_tail;
          that.param.category = resinfo.category;
          that.is_halt = resinfo.is_halt === 1;
          that.is_house_user = resinfo.is_house_user === 1;
          that.is_hour_room = resinfo.is_hour_room === 1;
          that.is_free = resinfo.is_free === 1;
          that.is_nego = resinfo.is_nego === 1;
          that.is_secret = resinfo.is_secret === 1;
          that.is_group = resinfo.is_group === 1;
          that.is_day_user = resinfo.is_day_user === 1;
        }).catch(function(err) {
           that.refresh_flag = false;
           console.info(err);
        })
      },
      /**
       * @select_parent_id 选取引用自
       */
      select_parent_code(row){
        let that = this;
        that.param.parent_code = row.code;
        that.dialogVisibleparent_id = false;
      },
      /**
       * @select_cms_code  选取佣金码
       */
      select_cms_code(row){
        let that = this;
        that.param.cms_code = row.code;
        that.dialogVisiblecms_code = false;
      },
      /**
       * @select_src 选取来源码
       */
      select_src(row){
        let that = this;
        that.param.src = row.code;
        that.dialogVisiblesrc = false;
      },
      /**
       * @select_market 选取市场码
       */
      select_market(row){
        let that = this;
        that.param.market = row.code;
        that.dialogVisiblemarket = false;
      },
      /**
       * @select_category 选取类别
       */
      select_category(row){
        let that = this;
        that.param.category = row.code;
        that.dialogVisiblecategory = false;
      },
      /**
       * @SelectionChange_amenities
       */
      SelectionChange_amenities(selection) {
        let amenities = [];
        let that = this;
        for(let i in selection){
          amenities.push(selection[i].code);
        }
        that.param.amenities = amenities;
        //console.log(that.tableDataamenities);
        //that.toggleSelection(that.tableDataamenities[1]);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.tableDataamenities.toggleRowSelection(row);
          });
        } else {
          this.$refs.tableDataamenities.clearSelection();
        }
      },

      /**
       * @ setTitle 设置新增头部信息
       */
      setTitle(){
        let that = this;
        that.dialogVisibleHpCode = true;
        that.title = '新增房价码';
      },
      //删除一个tab栏
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if(activeName === targetName) {
          tabs.forEach((tab, index) => {
            if(tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if(nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      /**
       * @handleEditClick 进行tab切换的时候的函数
       * @param no
       */
      handleEditClick: function(tab, event) {
        let that = this;
        console.info(tab);
        console.info(event);
        if(tab.active === true) {
          that.common_id = tab.labelContent;
          if(tab.label === '房价码列表'){
            that.searchall();
            that.change_days();
          }else{
            console.info(tab.labelContent,tab.label);
            that.searchInfo_Details(tab.labelContent,tab.label);
          }
        }
      },
      /**
       * @handleSizeChange  点击设置每页显示数量的时候触发的函数（该功能目前未开放）
       * @handleCurrentChange 点击页码的时候触发的函数
       * @param size 每页显示的页数
       * @param currentPage 当前的页码
       */
      handleSizeChange: function(size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage) {
        let that = this;
        let url = 'http://' + that.url + '/rate_code/?page=' + currentPage + '';
        that.currentPage = currentPage;
        this.$axios({
          method: 'get',
          url: url,
        }).then(function(res) {
          that.tableData = res.data.results;
        }).catch(function(err) {
        })
      },
      /**
       * @delete_byid 删除的接口
       */
      delete_byid(){
        let that = this;
        let url = 'http://' + that.url + '/rate_code/remove_rate_code/' + that.common_id + '/';
        that.$axios({
          method:'post',
          url : url,
        }).then((res)=>{
          that.hintInfo('success','删除成功！');
        }).catch((err)=>{
          that.hintInfo('warning','删除失败！');
        })
      },
      /**
       * @refresh_Current 刷新当前页面的数据
       */
      refresh_Current(){
         let that = this;
         that.searchInfo_Details(that.common_id);
         if(that.refresh_flag){
            that.hintInfo('success','刷新成功！')
         }else{
            that.hintInfo('warning','刷新失败！')
         }
      },
      /**
       * @saveInfohpCode 新增一个房价码
       * @param no
       */
      saveInfohpCode: function() {
        let that = this;
        let urlData = that.is_Edite ? 'http://' + that.url + '/rate_code/update_rate_code/'+that.common_id+'/' : 'http://' + that.url + '/rate_code/add_rate_code/';
        console.info(that.is_Edite);
        if(that.param.code && that.param.description && that.param.description_en && that.param.category){
          that.$axios({
            method: 'post',
            url: urlData,
            data: {
              code : that.param.code,
              group_code : that.param.group_code,
              category : that.param.category,
              description : that.param.description,
              description_en : that.param.description_en,
              remark : that.param.remark,
              start_date : that.start_date,
              end_date : that.end_date,
              parent_code : that.param.parent_code,
              code_type : that.param.code_type,
              parent_id :'',
              addition : that.param.addition,
              multi : that.param.multi,
              round_size : that.round_size,
              round_tail : that.round_tail,
              packages :that.param.packages,
              amenities :that.param.amenities.toString(),
              adv_max_day : that.param.adv_max_day,
              adv_min_day : that.param.adv_min_day,
              cancel_rule : that.param.cancel_rule,
              cms_code : that.param.cms_code,
              market :that.param.market,
              src : that.param.src,
              order : that.param.order,
              ta_code : that.param.ta_code,
              checkin_min_day : that.param.checkin_min_day,
              checkin_max_day : that.param.checkin_max_day,
              is_group : that.is_group ? 1 : 0,
              is_halt : that.is_halt ? 1 : 0,
              is_house_user : that.is_house_user ? 1 : 0,
              is_free : that.is_free ? 1 : 0,
              is_day_user : that.is_day_user ? 1 : 0,
              is_nego : that.is_nego ? 1 : 0,
              is_secret : that.is_secret ? 1 : 0,
            },
          }).then(function(res) {
            if(res.data.message === 'success'){
              that.dialogVisibleHpCode = false;
              that.searchall();
              that.hintInfo('success','操作成功！');
              console.info(res);
            }else{
              console.info(res);
            }
          }).catch(function(err) {
            that.hintInfo('warning','操作失败！')
            console.info(err);
          })
        }else{
          that.hintInfo('warning','*为必填项！')
        }
      },
      /**
       * @change_days 改变table的表头数量
       */
      change_days(){
        let that = this;
        that.base_title = [];
        let Max_length = 7;
        for(let i = 0;i<Max_length;i++){
          that.value_date =  that.value_dateVal;
          let param = {
            label : that.getDay(i,that.value_date)/*+""+(that.getWeek(that.getDay(i,val).toString()))*/,
            prop : that.getDay(i,that.value_date)
          };
          that.base_title.push(param);
        }
        console.info(that.base_title);
      },
      /**
       * @getDay 获取日期
       * @doHandleMonth
       * @getWeek 获取当前星期
       */
      getDay(day){
        let that = this;
        let curr_data = new Date();
        let target_day_milliseconds= curr_data.getTime() + 1000*60*60*24*day;
        curr_data.setTime(target_day_milliseconds); //注意，这行是关键代码
        let tYear = curr_data.getFullYear();
        let tMonth = curr_data.getMonth();
        let tDate = curr_data.getDate();
        tMonth = that.doHandleMonth(tMonth + 1);
        tDate = that.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
      },
      getWeek(dateString){
        let weekArray = ["(星期日)", "(星期一)", "(星期二)", "(星期三)", "(星期四)", "(星期五)", "(星期六)"];
        return weekArray[new Date(dateString).getDay()];
      },
      doHandleMonth(month){
        let m = month;
        if(month.toString().length === 1){
          m = "0" + month;
        }
        return m;
      },
    }
  }
</script>

<style scoped lang="less">
  //公共的按钮样式
  .common-button {
    width: 5vw;
    height: 2vw;
    background: #68819E;
    border: none;
    color: #ffffff;
    line-height: 2vw;
    border-radius: 0.2vw;
    font-size: 0.8vw;
    margin-left: 0.5rem;
  }

  .z-fixed {
    display: flex;
    align-items: center;
  }

  .hp-all {
    width: 80vw;
    margin-top: 0.8vw;
    margin-left: 0.8vw;
    .hp-all-top {
      margin-top: 10px;
      height: 50px;
      background: #303A41;
      line-height: 50px;
      color: #ffffff;
      label {
        margin-left: 10px;
      }
    }
    //icon设置的样式
    .hp-icon {
      margin-top: 10px;
      height: 40px;
      line-height: 40px;
      i {
        color: #777777;
      }
      label {
        position: absolute;
        margin-top: -3px;
        margin-left: 5px;
        font-size: small;
        color: #777777;
      }
    }
    //search样式  搜索
    .hp-search {
      height: 50px;
      background: #F7F7F7;
      line-height: 50px;
      label {
        margin-left: 10px;
      }
      input {
        width: 200px;
        height: 25px;
        border: #CCCCCC;
      }
      button {
        height: 25px;
        width: 80px;
        background: #3C81E4;
        border: none;
        color: #ffffff;
        line-height: 25px;
        margin-left: 50px;
      }
    }
    //新增样式
    .hp-add {
      margin-top: 10px;
    }
    //table样式
    .hp-table {
      margin-top: 10px;
    }
    //分页样式
    .hp-page {}
    //button样式
    .hp-save {
      margin-top: 150px;
      button {
        border: none;
        background: #3C81E4;
        width: 80px;
        height: 25px;
        color: #ffffff;
        line-height: 25px;
        margin-bottom: 20px;
        float: right;
      }
    }
    //详细信息公共部分的div的样式
    .common-div {
      margin-top: 10px;
    }
    .common-search {
      margin-top: 10px;
      span {
        margin-left: 0.5rem;
      }
      input {
        height: 27px;
        width: 200px;
        border-radius: 4px;
        border: 1px solid #cccccc;
        margin-left: 0.5rem;
      }
      button {
        .common-button;
        background: #4488E9;
      }
    }
    .common-btn {
      margin-top: 10px;
      button {
        .common-button;
      }
    }
    .early-style {
      height: 240px;
      background: #F7F7F7;
      ul {
        margin-top: 0.5rem;
        li {
          padding-top: 20px;
          span {
            display: inline-block;
            width: 80px;
            text-align: left;
            margin-left: 0.5rem;
          }
          input {
            height: 27px;
            width: 200px;
            border-radius: 4px;
            border: 1px solid #cccccc;
            margin-left: 0.5rem;
          }
        }
      }
      .ul-btn {
        margin-top: 60px;
        button {
          .common-button
        }
      }
      .ul-market-btn {
        margin-top: 20px;
        button {
          .common-button;
        }
      }
      .early-style-left {
        float: left;
        width: 52%;
        height: 100%;
        ul {
          li {
            span {
              display: inline-block;
              width: 70px;
              text-align: left;
              margin-left: 10px;
            }
            input {
              height: 27px;
              width: 140px;
              border-radius: 4px;
              border: 1px solid #cccccc;
              margin-left: 6px;
            }
          }
        }
        button {
          .common-button;
        }
        .ul-house-btn {
          margin-top: 20px;
          button {
            .common-button
          }
        }
      }
      .early-style-right {
        float: right;
        width: 45%;
        height: 100%;
        ul {
          li {
            padding-top: 10px;
            span {
              display: inline-block;
              width: 90px;
              text-align: left;
              margin-left: 10px;
            }
            input {
              height: 27px;
              width: 140px;
              border-radius: 4px;
              border: 1px solid #cccccc;
              margin-left: 0.5rem;
            }
          }
        }
      }
    }
    //dialog样式
    .dialog-style {
      .card {
        max-height: 400px;
        overflow: scroll;
        ul {
          li {
            margin-top: 10px;
            span {
              display: inline-block;
              width: 140px;
              text-align: right;
              em {
                color: red;
                font-size: 20px;
              }
            }
            input {
              height: 27px;
              width: 200px;
              margin-left: 10px;
              border: 1px solid #cccccc;
              border-radius: 4px;
            }
            label {
              margin-left: 10px;
            }
          }
        }
      }
      button {
        width: 80px;
        height: 30px;
        background: #4488E9;
        border: none;
        color: #ffffff;
        line-height: 30px;
        border-radius: 4px;
      }
    }
  }
</style>
<style>
  /*  .el-tabs__item {
      padding: 0 20px;
      height: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 0.8vw;
      font-weight: 500;
      color: #303133;
      position: relative;
    }
    .el-checkbox__label {
      display: inline-block;
      padding-left: 10px;
      line-height: 19px;
      font-size: 0.8vw;
    }*/
</style>
