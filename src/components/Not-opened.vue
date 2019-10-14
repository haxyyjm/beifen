<template>
  <div>
    <img src="../assets/images/not_open.jpg"/>
    <h2>
      {{hint}}
    </h2>
  </div>
</template>
<script>
    export default {
        name: "Not-opened",
        data(){
          return {
            hint : '暂未开放，敬请期待',
          }
        }
    }
</script>

<style scoped lang="less">
  div{
    img{
      width: 30vw;
      height: auto;
    }
    text-align: center;
    color:  #222222;
  }
</style>
