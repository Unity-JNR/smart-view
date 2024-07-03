import { createStore } from 'vuex'
import axios from 'axios'
const API = 'http://localhost:8082/users'
const APIpayload = 'http://localhost:8082/payload'
export default createStore({
  state: {
    users:[],
    payload: []
  },
  getters: {
  },
  mutations: {
    setUsers(state, payload){
      state.users = payload
    },
    setPayload(state, payload){
      state.payload = payload
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
        console.log(data.data);
        commit('setPayload', data.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
