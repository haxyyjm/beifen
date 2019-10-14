<template>
  <div class="module">

    <!--<div class="router">
      <router-view></router-view>
      <div class="ini"><logon-view></logon-view></div>
    </div>-->
<Not-opened></Not-opened>
  </div>
</template>

<script>
  let id = 1000;
    export default {
        name: "module-versioning",
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
          activeName2: 'first',
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data)),
          input:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          value1:''



        };
      },
      methods: {
        handleClick(tab, event) {
          // console.log(tab, event);
        },
        append(data) {
          // const newChild = { id: id++, label: '哈哈', children: [] };
          // if (!data.children) {
          //   this.$set(data, 'children', []);
          // }
          // data.children.push(newChild);
          console.log(1);
        },

        remove(node, data) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        },

        renderContent(h, { node, data, store }) {
          return (
            <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>);
        }

      }
    }
</script>

<style  lang="less" scoped>
  .module{
    width: 100%;
    height: calc(100% - 60px);
    /*height: 100%;*/
    overflow: hidden;
    .tree{
      height: 100%;
      background:rgba(247,247,247,1);
      float: left;
      .screen{
        height: 100%;
        .celerity{
          height:40px;
          background:rgba(238,238,238,1);
          margin-left: -16px;
          line-height: 40px;
          padding-left: 20px;
          margin-bottom: 20px;
          color: #777777;
          font-size: 16px;
        }
        .search{

          height: 40px;
          overflow: hidden;
          position: relative;
          margin-bottom: 20px;
          input{
            outline: none;
            width: 266px;
            height: 38px;
            border-right: none;
            padding-left: 17px;
            margin-left: 37px;
          }
          button{
            width: 50px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            position: absolute;
            top: 0;
            right:30px;
            background:rgba(68,136,233,1);
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            outline: none;

          }
        }
        .genre{
          margin-left: 9px;
          position: relative;
          input{
            width: 271px;
            height: 28px;
            margin-left: 9px;
            outline: none;
          }
          button{
            width: 41px;
            height: 28px;
            position: absolute;
            top: 0;
            right: 14px;
          }
        }
        .moduleTree{
          width: 110%;
          height:40px;
          background:rgba(238,238,238,1);
          font-size:16px;
          font-family:Adobe Heiti Std R;
          font-weight:normal;
          color:rgba(119,119,119,1);
          line-height:40px;
          margin-left: -15px;
          margin-top: 14px;
          padding-left: 20px;
        }
        .content{
          width: 110%;
          height: 100% ;
          background:rgba(247,247,247,1);
          margin-left: -10px;
          /*overflow-y: scroll;*/
          .control{
            width: 100%;

            p{
              font-size: 26px ;
              background:rgba(247,247,247,1);
              padding-left: 84px;

            }
          }
        }
      }

    }


    .router{
      width:calc(100% - 330px);
      height: 100%;
      font-size:20px;
      float: left;
      min-width: 50px;
      white-space:nowrap;
      .ini{
           height: calc(100% - 30px);
           position: absolute;
           right: 0;
           top: 30px;

         }
    }


  }
</style>
<style >
  /*.expanded{*/
    /*display: none;*/
  /*}*/

  /*.el-checkbox{*/
    /*display: none;*/
  /*}*/
  /*.el-tree{*/
    /*background: #F7F7F7FF;*/
  /*}*/
</style>
