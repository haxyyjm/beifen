<template>
  <div class="else">
   <p>暂时没有开放</p>

  </div>
</template>

<script>
    export default {
        name: "else",
      data() {
        return {

        }

      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage) // 当前页}
          this.curPage=curPage;

        },
      }
    }
</script>

<style   lang="less" scoped>
  .else{
    width: 100%;
    margin-left: 20px;


  }
</style>
