import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      data: {}
    }
  },
  mutations: {
    setData(state, payload) {
      state.data = payload
    }
  },
  actions: {
    setData({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('setData', payload)
        resolve()
      })
    }
  },
  getters: {
    getData: state => state.data
  }
})

export default store
