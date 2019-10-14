
<template>
    <div>
        <el-dialog
            class="houseTypeClass deletePadding_Class" width="70%"  title="消费"  :modal="true"
            :visible.sync="visible"
            @close="$emit('update:show', false)"
            :show="show">
            <div style="height: 520px; width: 100%;">
        <div style="float: left;width: 20%; height: 520px; overflow: auto;">
        <el-row style="display: flex; justify-content: space-between;">
            <el-input style="width: 12vw" placeholder="请输入关键字查询"></el-input>
            <el-button type="danger" >查询</el-button>
        </el-row>
        <el-collapse v-model="activeNames" @change="handleChange" style="background-color: #bfcad1">
            <el-collapse-item title="常售商品" name="1">
            <div class="cousume_class">
                <span style="text-align: center">火腿肠</span>
                <span>3.00 
                <img style="cursor: pointer; margin-left: 10px;  margin-right: 10px;position: relative; top: 0px; float: right"  @click="addConsumeItem" src="../../../assets/images/pms/houseStatus/add.png">
                </span>
            </div>
            </el-collapse-item>
            <el-collapse-item title="餐饮收入" name="2">
                <span style="text-align: center">面包</span>
                <span>5.00 
                <img style="cursor: pointer; margin-left: 10px;  margin-right: 10px;position: relative; top: 0px; float: right"  @click="addConsumeItem" src="../../../assets/images/pms/houseStatus/add.png">
                </span>
            </el-collapse-item>
            <el-collapse-item title="代收代付" name="3">
                {{parentParam.consumeInfoList}}
            </el-collapse-item>
            <el-collapse-item title="服饰织品" name="4">
            </el-collapse-item>
            <el-collapse-item title="个人护理" name="5">
            </el-collapse-item>
            <el-collapse-item title="会议费" name="6">
            </el-collapse-item>
            <el-collapse-item title="会员卡" name="7">
            </el-collapse-item>
            <el-collapse-item title="赔偿费" name="8">
            </el-collapse-item>
            <el-collapse-item title="其他" name="9">
            </el-collapse-item>
            <el-collapse-item title="日常用品" name="10">
            </el-collapse-item>
            <el-collapse-item title="食品" name="11">
            </el-collapse-item>
            <el-collapse-item title="商务费用" name="12">
            </el-collapse-item>
        </el-collapse>
        </div>
        <div style="float: left;width: 80%">
        <el-table :data="param.consumeInfoList" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="number" label="数量">
            <template slot-scope="scope">
            <el-input-number size="mini" v-model="scope.row.number"></el-input-number>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="单价(元)"></el-table-column>
        <el-table-column prop="count" label="总计(元)">
            <template>
            <!-- <el-input size="mini" >{{sumMoney}}</el-input> -->
            <span>{{sumMoney.toFixed(2)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button @click="deleteConsumeInfo(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
        <div style="float: left;">
        选购商品总数:<span></span>
        </div>
        <span style="margin-right: 20px">消费总计:<span></span></span>  
        <el-button type="success"  @click="sendConsumeData">确定</el-button>
    </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                sumMoneyData: '',
                paramData: {},
                visible: this.show,
                activeNames: ['1'],
                param: {
                    consumeInfoList:[{
                        name: '',
                        number: '',
                        price: '',
                        count: ''
                    }]
                }
            };
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            parentParam: {
                type: Object,
                required: true
            }
        },
        watch: {
            show () {
                this.visible = this.show;
            },
            //对象的watch
            // parentParam: {
            //     handler(newValue,oldValue){
            //         console.log('new',newValue)
            //         console.log('old',oldValue)
            //     },
            // },
            // param(){
            //     this.getData()
            // }
        },
        computed:{
            // consumeInfoList: ()=>{
            //     if(this.parentParam.consumeInfoList.length === 1 && this.parentParam.consumeInfoList[0].name === ''){
            //         this.param.consumeInfoList = []
            //     }
            // },
            sumMoney(){
                this.sumMoneyData = this.param.consumeInfoList.map(
                    item=>item.number*item.price).reduce(
                    (acc, cur) => (parseFloat(cur) + acc), 0)
                return this.sumMoneyData
            },
        },
        created(){
            if(this.param.consumeInfoList.length === 1 && this.param.consumeInfoList[0].name === ''){
                this.param.consumeInfoList = []
            }
        },
        methods: {
            // getData(){
            //     this.paramData = this.parentParam
            //     console.log('this.paramData',this.paramData)
            // },
            sendConsumeData(){
                console.log(this.sumMoneyData,'sumMoney')
                console.log(this.param,'parammmmm')
                // this.param.consumeInfoList[0].count = this.sumMoneyData.toFixed(2)
                this.$emit('listenTochildEvent', this.param)
                this.visible=false
            },
            //预定单 消费=》添加消费项
            addConsumeItem(){
                let consumeInfoValue={
                    code_income_type_id: 11,//入账代码=>代表食品
                    name: '11',
                    number: '',
                    price: '33',
                    count: ''
            }
            //暂时
            // if(this.param.consumeInfoList.length>0){
            // return false
            // }else{
            this.param.consumeInfoList.push(consumeInfoValue)
            // }
        },
            //删除消费项
            deleteConsumeInfo(row){
                let index = _.findIndex(this.param.consumeInfoList,function(o) { return o.name == row.name}) //扎到索引
                this.param.consumeInfoList.splice(index,1)//删除指定索引
            },
            handleChange(val) {
                console.log(val);
            },
        }
    }
</script>
<style lang="less" scoped>
//消费样式
.cousume_class{
    display: flex; 
    justify-content: space-between;
    margin: 10px 0px 0px 10px;
}
</style>
<style scoped>
    .houseTypeClass>>> .el-dialog__header{
        background-color: #8895A8;
    }
    .houseTypeClass>>>.el-dialog__title {
        color: white;
    }
    .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
        color: white;
    }
    .houseTypeClass>>> .el-dialog__footer{
        background-color: #F5F5F5;
        line-height: 35px;
    }
    .houseTypeClass.deletePadding_Class>>> .el-dialog__body{
        padding: 0px 0px;
    }
    .houseTypeClass>>> .el-collapse-item__content {
        padding-bottom: 10px
    }
    .houseTypeClass>>> .el-collapse-item__header{
        background-color: transparent;
        height: 40px;
        padding-left:10px;
    }
</style>