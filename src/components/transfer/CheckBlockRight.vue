<template>
    <div class="block">
        <div>
            <span v-if="childData.length?true:false" :class="expand?'el-icon-caret-bottom':'el-icon-caret-right'" class=" expand-icon" @click.prev.stop="expand = !expand"></span>
            <span v-else class="blank"></span>
            <ul>
                <li>
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
                        <!-- {{parentText}} -->
                        <span style="color: #06c91c">{{parentText2}}</span>
                         <el-button type="primary" size="mini" plain round>{{parentText.split('|')[0]}}</el-button>
                        {{parentText.split('|')[1]}}
                    </el-checkbox>
                    <el-button type="info" style="float: right"  round size="mini" @click="setAccount()">设主账房</el-button>
                </li>
            </ul>
        </div>

        <!-- <el-checkbox-group v-model="checkedItem" @change="handleCheckedCitiesChange" v-show="expand">
            <el-checkbox class="childCheckbox" v-for="childItem in childData" :label="childItem[showFlied]" :key="childItem[showFlied]"></el-checkbox>
        </el-checkbox-group> -->
    </div>
</template>

<script>
export default {
    props: [
        "childData",
        "parentText",
        "parentText2",
        "showFlied",
        "showFlied2",
        "transferData",
        "childFlid"
    ],
    data() {
        return {
            expand: false,
            checkAll: false,
            checkedItem: [],
            isIndeterminate: true
        }
    },
    computed: {
        accountData(){
            let obj = {};
            let arr = [];
            for (let item of this.transferData) {
                if (item[this.showFlied2] === this.parentText2) {
                    item[this.showFlied2] = '主'
                    break;
                }

            }
            //  if (this.childFlid && obj) {
            //     obj[this.childFlid] = arr
            // }
        //    return obj
        },
        //选中并且转换后的数据
        checkArr() {
            let obj = {};
            let arr = [];
            console.log(this.childData,'右边this.childDatathis.childData')
            // for (let item of this.childData) {
            //     //在选中的
            //     if (~this.checkedItem.indexOf(item[this.showFlied])) {
            //         arr.push(item)
            //     }
            // }

            for (let item of this.transferData) {
                if (item[this.showFlied] === this.parentText) {
                    for (let key in item) {
                        if (Object.prototype.toString.call(item[key]).slice(8, -1).toLocaleLowerCase() !== "array") {
                            obj[key] = item[key]

                        }
                    }
                    break;
                }

            }

            if (this.childFlid && obj) {
                obj[this.childFlid] = arr
            }
           return obj
            
        }
    },
    methods: {
        setAccount(){
            console.log('设为主账的...')
            console.log(this.parentText2,'传递最底层子组件')
            console.log(this.parentText,'传递最底层子组件222')
            this.$emit('setAccount',this.accountData)
            // console.log(this.accountData,'accountData')
        },
        handleCheckAllChange(event) {
            //处理选中的元素名字数组，并返回到上级组件
            let obj = {};
            obj[this.showFlied] = this.parentText;
            this.$emit("getCheckArr", obj)
            console.log(obj,'右边点击事件子传父')
            this.$emit("checkBoxChange", this.checkArr)
            console.log(this.checkArr,'右边点击事件子传父22')
        },
    }
}

</script>

<style  scoped>
.block {
    margin-top: 5px;
}

.el-checkbox {
    display: inline-block;
}

.el-checkbox+.el-checkbox {
    margin: 0px;
}

.childCheckbox {
    padding-left: 46px;
    display: block;
}

.expand-icon {
    display: inline-block;
    position: relative;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    color: #fff;
    background-color: #20a0ff;
    border-color: #0190fe;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
}
.blank{
    display: inline-block;
    width: 18px;
    height: 18px;
}
.el-checkbox__label {
    padding: 0px;
}
</style>