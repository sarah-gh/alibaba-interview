<template>
    <div class="header"  :data-bs-theme="theme">
        <h1><router-link to="/">Where in the world?</router-link></h1>
        <button type="button" class="btn btn-link">
          <button @click="toggleTheme" class="btn">change theme</button>
        </button>
        <!-- <button type="button">
            mode
        </button> -->
    </div>
</template>

<script>
export default {
  data () {
    const themeMap = {
      light: 'dark',
      dark: 'light'
    }
    let tmp

    const theme = localStorage.getItem('theme') || ((tmp = Object.keys(themeMap)[0]), localStorage.setItem('theme', tmp), tmp)

    return {
      themeMap,
      tmp,
      theme,
      leftDrawerOpen: false,
      bodyClass: document.body.classList
    }
  },
  methods: {
    toggleTheme () {
      console.log('toggleTheme')
      const current = localStorage.getItem('theme')
      const next = this.themeMap[current]

      document.body.classList.replace(current, next)
      localStorage.setItem('theme', next)
      this.theme = next
      console.log(document.body)
      console.log(this.theme)
    }
  },
  watch: {
    theme (newVal) {
      // const current = this.themeMap[newVal]
      document.body.classList.replace(this.themeMap[newVal], newVal)
    }
  },
  mounted () {
    // This will apply the theme when the component is mounted
    document.body.classList.add(this.theme)
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 11px 0px rgb(0 0 0 / 15%);
  button {
    border: 0px;
    height: auto;
    font-size: 20px;
    background-color: transparent;
  }
  .btn-link{
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
  }
  a {
    font-weight: bold;
    color: var(--text-primary);
  }
  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>
