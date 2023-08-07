<template>
  <div class="home" v-if="loading">
    <div class="selection">
      <div>
        search: <input type="text" v-model="page.wordSearch" class="search" v-on:keyup="onEnterSearch">
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
  name: 'HomePage',
  components: {
    country,
    VPagination
  },
  setup () {
    const store = useStore()
    let info = ref([])
    let myinfo = ref([])
    let loading = ref()
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
      showUpto: 30,
      showFromTo: 0,
      pageSize: 30,
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
      const list = info.value.slice(page.value.showFromTo, page.value.showUpto)
      totalPage = Math.ceil(info.value.length / page.value.pageSize)
      myinfo.value = list
    })

    // برای دنبال کردن تغییرات اینپوت سلکت برای قاره ها
    watch(() => page.value.selectRegion, async (val) => {
      info.value = [...store.state.countries]
      const list = info.value.slice(page.value.showFromTo, page.value.showUpto)
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
        const list = info.value.slice(page.value.showFromTo, page.value.showUpto)
        totalPage = Math.ceil(info.value.length / page.value.pageSize)
        myinfo.value = list
      }
    })

    // برای تغییرات اطلاعات کشورها در استور
    watch(() => store.state.countries, function () {
      info.value = [...store.state.countries]
      const list = info.value.slice(page.value.showFromTo, page.value.showUpto)
      myinfo.value = list
    })

    watch(() => store.state.loading, function () {
      loading.value = true
    })

    // سرچ
    async function onEnterSearch () {
      updateHandler(1)
      const i = [...store.state.countries]
      info.value = i.filter(item => item.name.toLowerCase().includes(page.value.wordSearch.toLowerCase()))
      const list = info.value.slice(page.value.showFromTo, page.value.showUpto)
      totalPage = Math.ceil(info.value.length / page.value.pageSize)
      myinfo.value = list
    }

    // تغییر صفحات
    function updateHandler (e) {
      page.value.currentPage = e
      page.value.showFromTo = ((page.value.currentPage - 1) * page.value.pageSize)
      page.value.showUpto = (page.value.currentPage * page.value.pageSize)
      myinfo.value = info.value.slice(page.value.showFromTo, page.value.showUpto)
    }

    return {
      info,
      myinfo,
      updateHandler,
      onEnterSearch,
      page,
      loading,
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

  .card:nth-last-child(-n+2) {
    margin-right: 0;
  }
}

.selection {
  display: flex;
  justify-content: space-between;
  padding: 0 70px;
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
}</style>
