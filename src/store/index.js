import { createStore } from 'vuex'
import axios from 'axios'
import  router from '../router'
const API = 'https://technical-y0j9.onrender.com/users'
const APIpayload = 'https://technical-y0j9.onrender.com/payload'
const APILogin = 'https://technical-y0j9.onrender.com/login'
export default createStore({
  state: {
    users:[],
    payload: {},
    logged: false,
    oneUser: {}
  },
  getters: {
  },
  mutations: {
    setUsers(state, payload){
      state.users = payload
    },
    setPayload(state, payload){
      state.payload = payload
    },
    setLogged(state){
      state.logged = true
    },
    setOne(state, payload){
     state.oneUser = payload
    }

  },
  actions: {

    async fetchUsers({commit}){
      try {
        const data = await axios.get(API)
        // console.log(data.data);
        commit('setUsers', data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPayload({commit}){
      try {
        const data = await axios.get(APIpayload)
        // console.log(data.data);
        commit('setPayload', data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async log_in({ commit }, user) {
      try {
        let { data } = await axios.post(APILogin, user);
        // console.log(data);
    
        if (data.token !== undefined) {
          $cookies.set('jwt', data.token);
          $cookies.set('user', data.user.id);
          console.log($cookies);
          // alert('success');
          commit('setLogged');
          router.push('/home');
        } else {
          throw new Error("Email or password is incorrect");
        }
      } catch (error) {
        $cookies.remove('jwt');
        $cookies.remove('userId');
        commit('setLogged');
        throw error; // Re-throw the error to be caught in the component method
      }
    },
    async fetchoneuser({ commit},userid) {
      try {
        const data = await axios.get(API+'/'+userid)
        // console.log(data.data);
        commit('setOne', data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async logout({ commit}){
      $cookies.remove('jwt');
      $cookies.remove('userId');
      commit('setLogged');
      router.push('/');
    }
  },
  modules: {
  }
})
