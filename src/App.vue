<template>
  <header-page></header-page>
  <router-view/>
</template>

<script>
import headerPage from '@/components/headerPage'
import { useStore } from 'vuex'
const { onMounted } = require('vue')

export default {
  components: {
    headerPage
  },
  setup () {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('requestCountries')
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
}
.body {
    min-width: none !important;
    max-width: none !important;
}
</style>
