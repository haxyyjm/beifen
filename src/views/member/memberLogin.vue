<template>
  <div class="memberLogin">
    <p class="login_title">
      <router-link to="/" class="self_inline_block pull-left el-icon-arrow-left" style="margin:10px 0 0 20px;"> </router-link>
      客管家</p>
    <ul class="items">
        <li v-for="(item,index) in itemsData" :key="index"  v-on:mouseover="changeActive(index)" v-on:mouseout="removeActive(index)" @click="navigate(item.router)">
            <img :src="item.url" :alt="item.desc">
            <p>{{ item.desc }}</p>
        </li>

    </ul>
  </div>
</template>
<script>
export default {
  name: "memberLogin",
  data(){
    return {
      itemsData:[
        {
          url: require('../member/img/icon-list01-default.png'),
          default_url: require('../member/img/icon-list01-default.png'),
          selected_url: require('../member/img/icon-list01.png'),
          desc:'协议',
          router: '/agreement',
        },
        {
          url: require('../member/img/icon-list02-default.png'),
          default_url: require('../member/img/icon-list02-default.png'),
          selected_url: require('../member/img/icon-list02.png'),
          desc:'宾客',
          router: '/guests'
        },
        {
          url: require('../member/img/icon-list03-default.png'),
          default_url: require('../member/img/icon-list03-default.png'),
          selected_url: require('../member/img/icon-list03.png'),
          desc:'团队',
          router: '/team'
        },
        {
          url: require('../member/img/icon-list04-default.png'),
          default_url: require('../member/img/icon-list04-default.png'),
          selected_url: require('../member/img/icon-list04.png'),
          desc:'会员',
          router: '/member'
        },
        {
          url: require('../member/img/icon-list05-default.png'),
          default_url: require('../member/img/icon-list05-default.png'),
          selected_url: require('../member/img/icon-list05.png'),
          desc:'设置',
          router: ''
        },
      ]
    }
  },
  methods: {
    navigate(router){
      this.$router.push({ path: router })
    },
    /* 
      鼠标悬浮函数
     */
    changeActive(index){
      this.itemsData[index].url = this.itemsData[index].selected_url;
    },
    removeActive(index){
      this.itemsData[index].url = this.itemsData[index].default_url;
    }
    
  }
  
};
</script>

<style lang="less" scoped>
.memberLogin {
  background: url("img/icon-bg.png") no-repeat center;
  width: 100%;
  min-width: 1366px;
  height: 100%;
  min-height: 768px;
  margin: auto;
  .login_title {
    text-align: center;
    font-size: 40px;
    color: #4488e9;
    font-weight: 400;
  }
  .items{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .items li{
    width: 250px;
    margin: 10% 45px;
    cursor: pointer;
    p{
      text-align: center;
      color: #ffffff;
      font-size: 40px;
      margin-top: 20px;
    }

  }
  .items li:hover p{ 
      color: #4488E9; 
    }
    
  
}
</style>

