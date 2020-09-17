import Vue from 'vue'
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        global:{},
        korea:{},
        kr_history:{},
        kr_confirmed:{},
        // it_date:{},
        it_confirmed:{},
        italy:{},
        cn_confirmed:{},
        am_confirmed:{},
        kr_date2:{}

    },
    getters :{
        get_fetch_korea(state){
            return state.korea
        },
        get_kr_history(state){
            return state.kr_history
        },
        // get_age_double(state){
        //     return state.age*2
        // },
        // get_fetch_item(state){
        //     return state.item
        // }
    },
    mutations :mutations,
    actions,
})

