<template>
<!--市场-->
  <div class="global-style">
      <Not-opened></Not-opened>
  </div>
</template>

<script>
    export default {
        name: "market",
        data() {
          return {
          }
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        }
    }
</script>

<style scoped>
  .global-style{
    width: calc(100% - 58px);
  }
</style>
