import axios from 'axios'

async function getCountries () {
  await axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      return response.data
    })
}

const countries = {
  namespaced: true,
  state: () => ({
    countries: []
  }),
  actions: {
    async requestCountries ({ commit }) {
      console.log('requestCountries')
      const c = await getCountries()
      commit('setCountries', c)
    }
  },
  mutations: {
    setCountries (state, data) {
      state.countries = data
    }
  },
  getters: {}
}

export default countries
