import Vuex from 'vuex'
import axios from 'axios'

export default new Vuex.Store({
  state: () => ({
    countries: [],
    loading: false
  }),
  getters: {

  },
  actions: {
    async requestCountries ({ commit }) {
      await axios
        .get('https://restcountries.com/v2/all')
        .then(response => {
          commit('setCountries', response.data)
        })
    }
  },
  mutations: {
    setCountries (state, data) {
      state.loading = true
      state.countries = data
    }
  },
  modules: {
    // countries
  }
})
