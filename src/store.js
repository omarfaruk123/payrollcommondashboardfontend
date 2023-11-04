import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    user: null,
    parenturls: null,
    menuList :[],
  },
  getters:{
    user:(state) => {
      return state.user;
    },
    parenturls:(state) => {
      return state.parenturls;
    },
    getmenulist:(state) => {
      return state.menuList;
    },
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    user(state, user){
      state.user = user;
    },
    parenturls(state, parenturls){
      state.parenturls = parenturls;
    },
    setMenulist(state, menulist){
      state.menuList = menulist;
    },
  },
  actions: {
    user(context, user){
      context.commit('user',user);
    },
    parenturls(context, parenturls){
      context.commit('parenturls',parenturls);
    },
    menulist(context){
        axios.get('/api/menulist').then(response => {
          context.commit("setMenulist", response.data);
        })
    }
   
  },
})
