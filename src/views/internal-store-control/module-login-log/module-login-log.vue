<template>
  <div class="moduleLogin">
    <Not-opened></Not-opened>

  </div>
</template>

<script>
    export default {
        name: "module-login-log",
      data() {
        const data = [{
          id: 1,
          label: '总公司内控',
          children: [{
            id: 4,
            label: '董事会',
            children: [{
              id: 9,
              label: '办公室'
            }, {
              id: 10,
              label: '秘书组'
            }]
          }]
        }]
        return {
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data))
        }
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


      },
    }
</script>

<style  lang="less" scoped>
  .moduleLogin{
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
    .tree{
      width:268px ;
      height: 100%;
      float: left;
      margin-left: 10px;

        .moduleTree{
          font-size:18px;
          font-family:Adobe Heiti Std R;
          font-weight:normal;
          line-height:40px;
          margin-left: 15px;
          margin-top: 14px;
          margin-bottom: 10px;

        }
        .content{

          height: calc(100% - 100px) ;
          /*overflow-y: scroll;*/

          .control{

            p{
              width: 268px;
              font-size: 26px ;
              padding-left: 100px;
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
      margin-right: 50px;
      background: #eeeeee;
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
