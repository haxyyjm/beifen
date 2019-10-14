<template>
  <div class="marketing">
    <div class="title">
      <i class="el-icon-setting" style="font-size: 40px ;line-height: 70px;color:#777777FF"></i>
      <span style="color:#777777FF">基础信息设置</span>
    </div>
    <div class="label">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" >
        <el-tab-pane label="优惠原因" name="first">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="add();dialogVisible=true;flush()">新增</button>
          <!--优惠原因-->
          <el-table
            :data="tableData"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
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
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
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
        <el-tab-pane label="市场码" name="second">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="market_add();dialogmarket=true;flush()">新增</button>
          <!--市场码-->
          <el-table
            :data="market_Data"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
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
                <el-button size="small" @click="market_submit(scope.row,scope.row.id,scope.$index, market_Data);dialogmarket=true">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handle_market"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogmarket"
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
              <el-button @click="market_cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogmarket = false">取 消</el-button>
              <el-button type="primary" @click="market_ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="来源码" name="source">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="src_add();dialogsrc=true;flush()">新增</button>
          <!--市场码-->
          <el-table
            :data="src_Data"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
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
                <el-button size="small" @click="src_submit(scope.row,scope.row.id,scope.$index, src_Data);dialogsrc=true">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handle_src"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogsrc"
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
              <el-button @click="src_cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogsrc = false">取 消</el-button>
              <el-button type="primary" @click="src_ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="渠道" name="ditch">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="channel_add();dialogchannel=true;flush()">新增</button>
          <!--渠道-->
          <el-table
            :data="channel_Data"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
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
                <el-button size="small" @click="channel_submit(scope.row,scope.row.id,scope.$index, channel_Data);dialogchannel=true">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handle_channel"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogchannel"
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
              <el-button @click="channel_cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogchannel = false">取 消</el-button>
              <el-button type="primary" @click="channel_ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="签约渠道" name="signing">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="exchangeChannel_add();dialogexchangeChannel=true;flush()">新增</button>
          <p>暂时没有接口</p>
          <!--&lt;!&ndash;签约渠道&ndash;&gt;-->
          <!--<el-table-->
            <!--:data="exchange_Data"-->
            <!--:cell-style="{textAlign:'center'}"-->
            <!--:header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"-->
            <!--size="mini"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
              <!--prop="code"-->
              <!--label="代码">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="descript"-->
              <!--label="中文描述"-->
              <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="descript_en"-->
              <!--label="英文描述">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="is_halt"-->
              <!--label="是否停用">-->
              <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.row.is_halt === 0">否</span>-->
                <!--<span v-else>是</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="is_sys"-->
              <!--label="是否系统码">-->
              <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.row.is_sys === 0">否</span>-->
                <!--<span v-else>是</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="is_group"-->
              <!--label="是否集团码">-->
              <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.row.is_group === 0">否</span>-->
                <!--<span v-else>是</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="create_user"-->
              <!--label="创建者">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="modify_user"-->
              <!--label="修改者">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="modify_datetime"-->
              <!--label="修改时间">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="address"-->
              <!--width="100"-->
              <!--fixed="right"-->
              <!--label="操作">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button size="small" @click="exchangeChannel_submit(scope.row,scope.row.id,scope.$index, exchange_Data);dialogexchangeChannel=true">修改</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handle_exchangeChannel"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogexchangeChannel"
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
              <el-button @click="exchangeChannel_cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogexchangeChannel = false">取 消</el-button>
              <el-button type="primary" @click="exchangeChannel_ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="营业部门" name="business">营业部门暂时没有接口</el-tab-pane>
        <el-tab-pane label="费用码" name="cost ">费用码暂时没有接口</el-tab-pane>
        <el-tab-pane label="包价" name="contract ">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
          border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="category_add();dialogcategory=true;flush()">新增</button>
          <!--市场码-->
          <el-table
            :data="category_Data"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
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
                <el-button size="small" @click="category_submit(scope.row,scope.row.id,scope.$index, category_Data);dialogcategory=true">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handle_category"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogcategory"
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
              <el-button @click="category_cancel()"type="danger"   v-show="delete_id">删除</el-button>
              <el-button @click="dialogcategory = false">取 消</el-button>
              <el-button type="primary" @click="category_ensure()">确 定</el-button>

             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="应收账户类型" name="type ">
          <div class=" search">
            <el-input v-model="input" placeholder="请输入内容" style="width: 210px;"></el-input>
            <button>搜索</button>
          </div>
          <button style="width: 80px;height: 30px;margin-top: 16px;background: #4488E9FF;color: white;outline: none; border: none;
              border-radius: 4px;line-height: 30px ;margin-bottom: 24px" @click="category_add();dialogar_class=true;flush()">新增</button>
          <!--应收账户类型-->
          <el-table
            :data="ar_class_Data"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="中文描述"
              width="180">
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
                <el-button size="small" @click="ar_class_submit(scope.row,scope.row.id,scope.$index, ar_class_Data);dialogar_class=true">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handle_ar_class"
                         :total="total">
          </el-pagination>
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogar_class"
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
                  <el-button @click="ar_class_cancel()"type="danger"   v-show="delete_id">删除</el-button>
                  <el-button @click="dialogar_class = false">取 消</el-button>
                  <el-button type="primary" @click="ar_class_ensure()">确 定</el-button>

                 </span>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    export default {
        name: "marketing",
      data() {
        return {
          api:'http://47.98.113.173:9103',
          activeName2: 'first',
          dialogVisible:false,//优惠原因的新增和修改
          delete_id:false,//删除的显示与隐藏
          Edite:true,//标志位
          input: '',
          amend:true,
          save:true,
          itemList: [
            {
              projectName: '代码',

            },
            {
              projectName: '中文描述',

            },
            {
              projectName: '英文描述',

            },
            {
              projectName: '是否停用',

            },
            {
              projectName: '创建者',

            },
            {
              projectName: '创建时间',

            },
            {
              projectName: '修改者',

            },
            {
              projectName: '修改时间',

            },
            {
              projectName: '操作',

            }


          ],
          total:10,
          tableData: [],
          pagesize:10,
        /**
         * 优惠原因里的内容
         *
         * */
           param:{},
          code:"",//代码
          descript_en:'',//英文说明
          descript:'',//中文说明
          is_halt:"",//是否停用
          is_sys :"",//是否系统吗
          is_group:"",//是否集团码

          /**
           * 市场码
           * */
          dialogmarket:false,
          market_Data:[],//市场码的列表
          /**
           * 来源码
           * */
          src_Data:[],
          dialogsrc:false,
          /**
           * 渠道
           * */
          channel_Data:[],
          dialogchannel:false,

          /**
           * 签约渠道
           * */
          exchange_Data:[],
          dialogexchangeChannel:false,

          /**
           * 包价
           * */
          category_Data:[],
          dialogcategory:false,
          /**
           * 应收账户类型
           *
           * */
          ar_class_Data:[],
          dialogar_class:false,


        };
      },
      created: function () {
          let that = this;
         that.papers_id();//优惠原因
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
          console.log(tab);
          let that = this;
          if(tab.label==="优惠原因"){
            that.papers_id()
          }else if(tab.label==="市场码"){
            that.gain_market()
          }else if(tab.label==="来源码"){
            that.gain_src()
          }else if(tab.label==="渠道"){
            that.gain_channel();
          }else if(tab.label==="签约渠道"){
            that.gain_exchangeChannel();
          }else if(tab.label==="包价"){
            that.gain_category()
          }else if(tab.label==="应收账户类型"){
            that.gain_ar_class();
          }
        },

        /**
         * 获取优惠原因
         *
         * */
        papers_id(){
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=reason_type&ordering=-modify_datetime",
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
       //新增优惠原因
        add(){
          let that = this;
          that.delete_id = false;

        },
        //修改优惠原因
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
        //新增和修改优惠原因的保存
        ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'reason_type',
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
        //优惠原因的删除
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
        //优惠原因的点击分页上的页数
        handleCurrentChange(curPage) {
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'reason_type',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.market_Data=res.data.data.results;
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
        /**
         * 获取市场码  market_code
         *
         * */
        gain_market(){
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=market_code&ordering=-modify_datetime",
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
                that.market_Data=res.data.data.results;
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
        //新增市场码
        market_add(){
          let that = this;
          that.delete_id = false;

        },
        //修改市场码
        market_submit(srow,id,index){
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
        //新增和修改市场码的保存
        market_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'market_code',
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
                  that.gain_market();
                  that.dialogmarket = false
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
        //市场码的删除
        market_cancel(){
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
                  that.gain_market();
                  that.dialogmarket = false
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
        //分页
        handle_market(curPage) {
          console.log(curPage) // 当前页}
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'market_code',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.market_Data=res.data.data.results;
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

        /**
         *
         * 获取来源码  src_code
         *
         * */
        gain_src(){
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=src_code&ordering=-modify_datetime",
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
                that.src_Data=res.data.data.results;
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
        //新增来源码
        src_add(){
          let that = this;
          that.delete_id = false;

        },
        //修改来源码
        src_submit(srow,id,index){
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
        //新增和修改来源码的保存
        src_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'src_code',
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
                  that.gain_src();
                  that.dialogsrc = false
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
        //来源码的删除
        src_cancel(){
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
                  that.gain_src();
                  that.dialogsrc = false
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
        //分页
        handle_src(curPage) {
          console.log(curPage) // 当前页}
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'src_code',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.src_Data=res.data.data.results;
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

        /**
         * 获取渠道  channel
         *
         * */
        gain_channel(){
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=channel&ordering=-modify_datetime",
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
                that.channel_Data=res.data.data.results;
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
        //新增渠道
        channel_add(){
          let that = this;
          that.delete_id = false;

        },
        //修改渠道
        channel_submit(srow,id,index){
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
        //新增和修改渠道的保存
        channel_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'channel',
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
                  that.gain_channel();
                  that.dialogchannel = false
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
        //渠道的删除
        channel_cancel(){
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
                  that.gain_channel();
                  that.dialogchannel = false
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
        //分页
        handle_channel(curPage) {
          console.log(curPage) // 当前页}
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'channel',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.channel_Data=res.data.data.results;
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

      /**
       * 签约渠道  exchangeChannel
       *
       *
       * */
         gain_exchangeChannel(){
        let that= this;
        //获取信息列表
        that.$axios({
          url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=exchangeChannel&ordering=-modify_datetime",
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
              that.exchange_Data=res.data.data.results;
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
        //新增签约渠道
        exchangeChannel_add(){
          let that = this;
          that.delete_id = false;

        },
        //修改签约渠道
        exchangeChannel_submit(srow,id,index){
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
        //新增和修改签约渠道的保存
        exchangeChannel_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'exchangeChannel',
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
                  that.gain_exchangeChannel();
                  that.dialogexchangeChannel = false
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
        //签约渠道的删除
        exchangeChannel_cancel(){
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
                  that.gain_exchangeChannel();
                  that.dialogexchangeChannel = false
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
        //签约渠道分页
        handle_exchangeChannel(curPage) {
          console.log(curPage) // 当前页}
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'exchangeChannel',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.exchange_Data=res.data.data.results;
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
      /**
       * 营业部门
       *
       * */
      /**
       * 包价   package_category
       *
       * */
        gain_category(){
        let that= this;
        //获取信息列表
        that.$axios({
          url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=package_category&ordering=-modify_datetime",
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
              that.category_Data=res.data.data.results;
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
        //新增包价
        category_add(){
          let that = this;
          that.delete_id = false;

        },
        //修改包价
        category_submit(srow,id,index){
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
        //新增和修改包价的保存
        category_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'package_category',
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
                  that.gain_category();
                  that.dialogcategory = false
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
        //包价的删除
        category_cancel(){
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
                  that.gain_category();
                  that.dialogcategory = false
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
        //包价分页
        handle_category(curPage) {
          console.log(curPage) // 当前页}
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'package_category',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.category_Data=res.data.data.results;
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
        /**
         * ar_class  应收账户类型
         * */
        gain_ar_class(){
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/?page_size=100&parent_code=ar_class&ordering=-modify_datetime",
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
                that.ar_class_Data=res.data.data.results;
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
        //新增包价
        ar_class_add(){
          let that = this;
          that.delete_id = false;

        },
        //修改包价
        ar_class_submit(srow,id,index){
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
        //新增和修改包价的保存
        ar_class_ensure(){
          let that = this;
          if(that.param.code==="" || that.is_halt==="" ||that.is_sys==="" || that.is_group==="" ||that.param.descript_en===""||that.param.descript===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ?(that.api+"/v1/system/settings/update_code_base/" + that.id + '/') : (that.api+"/v1/system/settings/add_code_base/");
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                parent_code:'ar_class',
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
                  that.gain_ar_class();
                  that.dialogar_class = false
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
        //包价的删除
        ar_class_cancel(){
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
                  that.gain_ar_class();
                  that.dialogar_class = false
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
        //包价分页
        handle_ar_class(curPage) {
          console.log(curPage) // 当前页}
          let that= this;
          //获取信息列表
          that.$axios({
            url: that.api+"/v1/system/settings/get_code_base_list/",
            method: "get",
            headers: {
              authorization: sessionStorage.getItem("authorization"),
            },
            params:{
              page_num:curPage,
              page_size:this.pagesize,
              parent_code:'ar_class',
            }
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                that.ar_class_Data=res.data.data.results;
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
        //修改页面的显示和隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      }
    }
</script>

<style lang="less" scoped>
  .marketing{
    width: 98%;
    margin-left: 20px;
    .title{
      width:100%;
      height: 70px;
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
        min-width: 1000px;
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
        min-width: 1000px;
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
