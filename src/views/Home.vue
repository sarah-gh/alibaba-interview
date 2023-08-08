<template>
  <div class="home" v-if="loading">
    <div class="selection">
      <div class="left-elements">
        <div class="search-container">
          <div class="search-icon-container">
            <font-awesome-icon icon="search" class="search-icon"></font-awesome-icon>
          </div>
          <!-- <input type="text" v-model="page.wordSearch" class="search-input" v-on:keyup.enter="onEnterSearch"> -->
          <input type="text" v-model="page.wordSearch" class="search-input" v-on:keyup="onEnterSearch">
        </div>
        <div class="buttons">
          <button type="button" class="btn btn-default" :class="{'active' : isSortByPopulation}" @click="sortByPopulation()">
            sortByPopulation
          </button>
          <button type="button" class="btn btn-default" :class="{'active' : isSortByName}" @click="sortByName()">
            sortByName
          </button>
        </div>
      </div>

      <select class v-model="page.selectRegion">
        <option value="all">all</option>
        <template v-for="i in items" :key="i">
          <option :value="i.name">{{ i.name }}</option>
        </template>
      </select>
    </div>
    <div class="cards">
      <template v-for="country in myinfo" :key="country">
        <country :country="country"></country>
      </template>
    </div>
    <div class="pagination-container">
      <v-pagination class="pagination" v-if="info.length > 0" v-model="page.currentPage" :pages="totalPage"
        :range-size="1" active-color="#DCEDFF" @update:modelValue="updateHandler" />
    </div>
  </div>
  <div class="home loading" v-else>
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>

/* eslint-disable prefer-const */
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import country from '@/components/country.vue'
import { useStore } from 'vuex'
const { onMounted, ref, computed, watch } = require('vue')

export default {
  name: 'HomePage2',
  components: {
    country,
    VPagination
  },
  setup () {
    const store = useStore()
    let info = ref([])
    let myinfo = ref([])
    let loading = ref()
    let isSortByPopulation = ref(false)
    let isSortByName = ref(false)
    loading.value = false
    let selectRegion = ''
    let items = [
      {
        name: 'Europe',
        code: 'eu'
      },
      {
        name: 'Africa',
        code: 'au'
      },
      {
        name: 'Americas',
        code: 'usna'
      },
      {
        name: 'Asia',
        code: 'asean'
      },
      {
        name: 'Oceania',
        code: 'ame'
      }
    ]
    const page = ref({
      currentPage: 1,
      showUpto: 32,
      showFromto: 0,
      pageSize: 32,
      selectRegion: '',
      wordSearch: ''
    })
    let totalPage = computed(() => {
      const total = Math.ceil(info.value.length / page.value.pageSize)
      return total
    })
    onMounted(() => {
      info.value = [...store.state.countries]
      if (store.state.loading) {
        loading.value = true
      }
      const list = info.value.slice(page.value.showFromto, page.value.showUpto)
      totalPage = Math.ceil(info.value.length / page.value.pageSize)
      myinfo.value = list
    })

    // برای دنبال کردن تغییرات اینپوت سلکت برای قاره ها
    watch(() => page.value.selectRegion, async (val) => {
      info.value = [...store.state.countries]
      const list = info.value.slice(page.value.showFromto, page.value.showUpto)
      totalPage = Math.ceil(info.value.length / page.value.pageSize)
      myinfo.value = list
      const i = info.value
      if (val !== 'all') {
        info.value = []
        i.forEach(element => {
          if (element.region === val) {
            info.value.push(element)
            totalPage = Math.ceil(info.value.length / page.value.pageSize)
          }
        })
        const list = info.value.slice(page.value.showFromto, page.value.showUpto)
        totalPage = Math.ceil(info.value.length / page.value.pageSize)
        myinfo.value = list
      }
    })

    // برای تغییرات اطلاعات کشورها در استور
    watch(() => store.state.countries, function () {
      info.value = [...store.state.countries]
      const list = info.value.slice(page.value.showFromto, page.value.showUpto)
      myinfo.value = list
    })

    watch(() => store.state.loading, function () {
      loading.value = true
    })

    // تابع مرتب‌سازی کشورها بر اساس جمعیت (بزرگتر به کوچکتر)
    function sortByPopulation () {
      isSortByPopulation.value = true
      isSortByName.value = false
      info.value.sort((a, b) => b.population - a.population)
      const list = info.value.slice(page.value.showFromto, page.value.showUpto)
      myinfo.value = list
    }

    // تابع مرتب‌سازی کشورها بر اساس نام کشور
    function sortByName () {
      isSortByName.value = true
      isSortByPopulation.value = false
      info.value.sort((a, b) => a.name.localeCompare(b.name))
      const list = info.value.slice(page.value.showFromto, page.value.showUpto)
      myinfo.value = list
    }

    // سرچ
    async function onEnterSearch () {
      page.value.selectRegion = 'all'
      isSortByName.value = false
      isSortByPopulation.value = false
      updateHandler(1)
      const i = [...store.state.countries]
      const searchStr = page.value.wordSearch.toLowerCase()
      const searchStrWithoutVowel = searchStr.replace(/a|i|o|e|u/g, '')

      // جستجو با استفاده از کلمه دقیق
      const exactMatches = i.filter(item => item.name.toLowerCase().includes(searchStr))

      // جستجو با حذف حروف صدادار
      const filteredMatches = i.filter(item => {
        const itemNameWithoutVowel = item.name.toLowerCase().replace(/a|i|o|e|u/g, '')
        return itemNameWithoutVowel.includes(searchStrWithoutVowel) && searchStrWithoutVowel.length > 1
      })

      // حذف تکراری‌ها و ادغام نتایج
      const combinedMatches = [...new Set([...exactMatches, ...filteredMatches])]

      info.value = combinedMatches
      const list = info.value.slice(page.value.showFromto, page.value.showUpto)
      totalPage = Math.ceil(info.value.length / page.value.pageSize)
      myinfo.value = list
    }

    // async function onEnterSearch () {
    //   isSortByName.value = false
    //   isSortByPopulation.value = false
    //   updateHandler(1)
    //   const i = [...store.state.countries]
    //   const searchStr = page.value.wordSearch.toLowerCase()
    //   const searchStrWithoutVowel = searchStr.replace(/a|i|o|e|u/g, '')

    //   const matches = i.filter(item => {
    //     const itemNameWithoutVowel = item.name.toLowerCase().replace(/a|i|o|e|u/g, '')
    //     return (
    //       item.name.toLowerCase().includes(searchStr) ||
    //   (itemNameWithoutVowel.includes(searchStrWithoutVowel) && searchStrWithoutVowel.length > 1)
    //     )
    //   })

    //   if (page.value.selectRegion !== 'all') {
    //     myinfo.value = matches.filter(item => item.region === page.value.selectRegion)
    //   } else {
    //     myinfo.value = matches
    //   }

    //   totalPage = Math.ceil(myinfo.value.length / page.value.pageSize)
    //   const list = myinfo.value.slice(page.value.showFromto, page.value.showUpto)
    //   myinfo.value = list
    // }

    // تغییر صفحات

    function updateHandler (e) {
      page.value.currentPage = e
      page.value.showFromto = ((page.value.currentPage - 1) * page.value.pageSize)
      page.value.showUpto = (page.value.currentPage * page.value.pageSize)
      myinfo.value = info.value.slice(page.value.showFromto, page.value.showUpto)
    }
    return {
      info,
      myinfo,
      updateHandler,
      onEnterSearch,
      sortByName,
      sortByPopulation,
      isSortByPopulation,
      isSortByName,
      loading,
      page,
      items,
      selectRegion,
      totalPage
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  padding: 70px;
  gap: 50px;
  justify-content: space-between;
}

.selection {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 70px;

  select {
    height: 50px;
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    border-radius: 5px;
    min-width: 200px;
    width: 20%;
    option {
      font-size: 14px;
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
  }
}

.loading {
  margin: 100px auto;

  .lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }

  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(42, 68, 153);
    margin: -4px 0 0 -4px;
  }

  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }

  .lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }

  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }

  .lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }

  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }

  .lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }

  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }

  .lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }

  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }

  .lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }

  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }

  .lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }

  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }

  .lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }

  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }

  .lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }

  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

.pagination-container {
  width: 100%;
  display: flex;
  padding: 10px 0 30px 0;

  .pagination {
    margin: 0 auto;
  }
}

.left-elements {
  display: flex;
  width: 70%;
  flex-wrap: wrap;
  .buttons {
    display: flex;
    flex-wrap: wrap;
  }

  .btn {
    height: 50px;
    font-size: 16px;
    margin: 0 0 0 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      box-shadow: 1px 1px 2px 0 var(--text-secondary);
    }
  }
}

.search-container {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: var(--bg-primary);
  max-width: 300px;
  width: 40%;

  input {
    background-color: transparent;
    font-size: 16px;
    // max-width: 200px;
    // width: 40%;
  }
}

.search-icon-container {
  padding: 8px;
  cursor: pointer;
}

.search-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
}

@media only screen and (max-width: 768px) {
  .cards {
    justify-content: center;
    padding: 30px;
  }
  .selection {
    padding: 30px;
  }
}
@media only screen and (max-width: 425px) {
  .cards {
    padding: 16px;
  }
  .selection {
    padding: 16px;
  }
}
@media only screen and (max-width: 1024px) {
  .selection {
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    .left-elements {
      flex-direction: column;
      width: 100%;
      margin-top: 10px;
      .buttons {
        width: 100%;
        gap: 10px;
        margin-top: 10px;
        .btn {
          margin: 0;
          flex-grow: 1;
        }
      }
      .search-container {
        width: 100%;
        box-sizing: border-box;
        max-width: 1000px;
      }
    }
    select {
      width: 100%;
      max-width: 1000px;
      margin-top: 10px;
    }
  }
}
</style>
