import { createStore } from 'vuex'
import axios from 'axios'
const API = 'http://localhost:8082/users'
const APIpayload = 'http://localhost:8082/payload'
const APILogin = 'http://localhost:8082/login'
export default createStore({
  state: {
    users:[],
    payload: {},
    logged: false
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
    }
  },
  actions: {

    async fetchUsers({commit}){
      try {
        const data = await axios.get(API)
        console.log(data.data);
        commit('setUsers', data.data)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPayload({commit}){
      try {
        const data = await axios.get(APIpayload)
        console.log(data.data[0]);
        commit('setPayload', data.data[0])
      } catch (error) {
        console.error(error)
      }
    },
    async log_in({ commit }, user) {
      try {
        let { data } = await axios.post(APILogin, user);
        console.log(data);
    
        if (data.token !== undefined) {
          $cookies.set('jwt', data.token);
          console.log($cookies);
          alert('success');
          commit('setLogged');
        } else {
          throw new Error("Email or password is incorrect");
        }
      } catch (error) {
        $cookies.remove('jwt');
        commit('setLogged');
        throw error; // Re-throw the error to be caught in the component method
      }
    }
  },
  modules: {
  }
})
