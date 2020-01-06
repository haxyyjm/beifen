import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        biz_date: '',
        date_delta: '',
        hotel_name: '',//酒店名称
    },
})