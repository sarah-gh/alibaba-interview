<template>
  <div class="header" :data-bs-theme="theme">
    <h1><router-link to="/">Where in the world?</router-link></h1>
    <div @click="toggleTheme" class="dark-mode-toggle">
      <font-awesome-icon icon="moon" class="search-icon"></font-awesome-icon>
      Dark mode
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'app',

  setup () {
    const themeMap = {
      light: 'dark',
      dark: 'light'
    }

    let tmp

    const theme = ref(
      localStorage.getItem('theme') ||
      ((tmp = Object.keys(themeMap)[0]), localStorage.setItem('theme', tmp), tmp)
    )
    const bodyClass = document.body.classList
    bodyClass.add(theme.value)

    function toggleTheme () {
      const current = localStorage.getItem('theme')
      const next = themeMap[current]

      bodyClass.replace(current, next)
      localStorage.setItem('theme', next)
      theme.value = next
    }

    watch(theme, (newVal) => {
      bodyClass.replace(themeMap[newVal], newVal)
    })

    return {
      theme,
      toggleTheme,
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 30px;
  margin-bottom: 20px;
  display: flex;
  background-color: var(--bg-primary);
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.1);

  button {
    border: 0px;
    height: auto;
    font-size: 1.25rem;
    background-color: transparent;
  }

  .btn-link {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
  }

  a {
    font-weight: bold;
    font-size: 2rem;
    color: var(--text-primary);
  }

  a.router-link-exact-active {
    color: var(--text-primary);
  }
}

.dark-mode-toggle {
  font-size: 14px;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .header {
    padding: 16px;
    h1 a {
      font-size: 1.5rem;
    }
  }
}
</style>
