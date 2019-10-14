<template>
    <div class="block">
        <div>
            <span v-if="childData.length?true:false" :class="expand?'el-icon-caret-bottom':'el-icon-caret-right'" class=" expand-icon"></span>
            <span v-else class="blank"></span>
            <ul>
                <li>
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
                        <el-button type="primary" size="" plain round>{{parentText.split('|')[0]}}</el-button>
                        {{parentText.split('|')[1]}}
                        <!-- <el-button type="primary">设主账房</el-button> -->
                    </el-checkbox>
                </li>
            </ul>
        </div>

        <!-- <el-checkbox-group v-model="checkedItem" @change="handleCheckedCitiesChange" >
            <el-checkbox class="childCheckbox" v-for="childItem in childData" :label="childItem[showFlied]" :key="childItem[showFlied]"></el-checkbox>
        </el-checkbox-group> -->
    </div>
</template>

<script>
export default {
    props: [
        "childData",
        "parentText",
        "showFlied",
        "showFlied2",
        "transferData",
        "childFlid"
    ],
    data() {
        return {
            checkAll: false,
            checkedItem: [],
            isIndeterminate: true
        }
    },
    computed: {
        //选中并且转换后的数据
        checkArr() {
            let obj = {};
            let arr = [];
            console.log(this.childData,'this.childDatathis.childData')
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
        handleCheckAllChange(event) {

            //处理选中的元素名字数组，并返回到上级组件
            let obj = {};
            obj[this.showFlied] = this.parentText;
            obj.checked = this.checkedItem
            console.log(obj,111111111111111111111111111111111)
            this.$emit("getCheckArr", obj)

            this.$emit("checkBoxChange", this.checkArr)
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