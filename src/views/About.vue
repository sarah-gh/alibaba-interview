<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
  <div class="back">
    <a @click="$router.go(-1)">
      <button>
        <font-awesome-icon icon="arrow-left" class="search-icon"></font-awesome-icon>
          back
      </button>
    </a>
  </div>
  <div class="about" v-if="info[0]">

    <div class="svg-container" :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }">
        <inline-svg
            :src="info[0].flags?.svg"
        ></inline-svg>
    </div>
    <!-- این دوتا هم میشه فقط نیاز به یه تغییر کوچیک تو استایل دارن -->
    <!-- 1 -->
    <!-- <inline-svg
        :src="info[0].flags?.svg"
        :width="imgWidth"
        :height="imgHeight"
        aria-label="My image"
    ></inline-svg> -->
    <!-- 2 -->
    <!-- <img class="img" :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }" :src="info[0].flags?.svg"
      alt="Card image cap"> -->
    <div class="body">
      <div class="content">
        <h1 class="card-title">{{ info[0].name }}</h1>
        <div>
          <p class="card-text"><span class="title-item">Population: </span>{{ info[0].population }}</p>
          <p class="card-text"><span class="title-item">Region: </span>{{ info[0].region }}</p>
          <p class="card-text"><span class="title-item">Capital: </span>{{ info[0].capital }}</p>
          <p class="card-text"><span class="title-item">nativeName: </span>{{ info[0].nativeName }}</p>
          <p class="card-text"><span class="title-item">subregion: </span>{{ info[0].subregion }}</p>
        </div>
        <div>
          <p class="card-text"><span class="title-item">topLevelDomain: </span>{{ info[0].topLevelDomain[0] }}</p>
          <p class="card-text" v-if="info[0].currencies"><span class="title-item">currencies:
            </span>{{ info[0].currencies[0].name }}</p>
          <p class="card-text"><span class="title-item">languages: </span>
            <span v-for="lan in info[0].languages" :key="lan">{{ lan.name }}</span>
          </p>
        </div>
        <div class="borders" v-if="borders">
          <div class="card-text"><span class="title-item">borders: </span>
            <router-link :to="'./' + lan.name" v-for="lan in borders" :key="lan" class="card" :tag="'div'">
              <button>{{ lan.name }} </button>
            </router-link>
          </div>
        </div>
      </div>
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
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
const { onMounted, ref, onUnmounted, watch } = require('vue')

export default {
  name: 'countryDet',
  setup () {
    const route = useRoute()
    const store = useStore()
    let id = ref([])
    let info = ref({})
    let borders = ref([])
    let imgWidth = ref([])
    let imgHeight = ref([])

    function myEventHandler () {
      console.log(window.innerWidth)
      imgWidth.value = (window.innerWidth / 8) * 3
      imgHeight.value = (imgWidth.value * 3) / 5
      if (window.innerWidth > 1024) {
        imgWidth.value = (window.innerWidth / 8) * 3
        imgHeight.value = (imgWidth.value * 3) / 5
      } else {
        imgWidth.value = window.innerWidth - 32
        imgHeight.value = (imgWidth.value * 3) / 5
      }
    }
    async function changeData () {
      window.addEventListener('resize', myEventHandler)
      myEventHandler()
      id.value = route.params.name
      if (store.state.countries.length > 0) {
        const i = [...store.state.countries]
        info.value = i.filter(item => item.name.includes(id.value))
        let element = []
        if (info && info.value[0] && info.value[0].borders) {
          for (let key in info.value[0].borders) {
            element.push(info.value[0].borders[key])
          }
          console.log(element)
          element.forEach(async (e) => {
            // console.log(element)
            await axios
              .get(`https://restcountries.com/v2/alpha/${e.toLowerCase()}`)
              .then(response => {
                borders.value.push(response.data)
                console.log(response.data)
              })
          })
        }
      } else {
        await axios
          .get(`https://restcountries.com/v2/name/${id.value}?fullText=true`)
          .then(async (response) => {
            info.value = response.data
            let element = []
            if (info && info.value[0] && info.value[0].borders) {
              for (let key in info.value[0].borders) {
                element.push(info.value[0].borders[key])
              }
              element.forEach(async (e) => {
                await axios
                  .get(`https://restcountries.com/v2/alpha/${e.toLowerCase()}`)
                  .then(res => {
                    borders.value.push(res.data)
                  })
              })
            }
          })
      }
    }
    watch(() => route.params.name, async function () {
      if (route.params.name !== 'Home') {
        borders.value = []
        await changeData()
      }
    })
    onMounted(async () => {
      await changeData()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', myEventHandler)
    })
    return {
      id,
      borders,
      imgWidth,
      myEventHandler,
      imgHeight,
      info
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  padding: 20px 70px 40px 70px;
  display: flex;
  a {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 3px 0 #ccc;
    font-size: 1.2rem;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    svg {
      margin-right: 8px;
    }
  }
}

.about {
  padding: 10px 70px;
  margin: 0 auto;
  display: flex;
  gap: 10%;
  justify-content: space-between;
  box-sizing: border-box;
  .svg-container {
    overflow: hidden;
  }
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .body {
    height: 500px;
    display: flex;
    width: 65%;
    align-items: center;
    justify-content: center;

    .content {
      display: flex;
      flex-wrap: wrap;
      row-gap: 40px;
      text-align: start;

      .card-text {}

      >div {
        width: 50%;

        p {
          margin-bottom: 15px;
          color: var(--text-secondary);
          font-size: 16px;

          .title-item {
            font-weight: bold;
            font-size: 14px;
            color: var(--text-primary);
          }
        }
      }

      h1 {
        width: 100%;
      }

      .borders {
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        button {
          border: 0;
          background-color: var(--bg-primary);
          border-radius: 5px;
          box-shadow: 1px 1px 10px 0px rgb(0 0 0 / 25%);
          padding: 10px 30px;
          color: var(--text-primary);
          margin: 10px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  .back {
    padding: 10px 16px;
  }
  .about {
    flex-direction: column;
    padding: 10px 16px;
    gap: 0px;

    .body {
      height: fit-content;
      padding: 40px 0 40px 0;

      .content {
        display: flex;
        flex-wrap: wrap;
        row-gap: 20px;
        text-align: start;

        .card-text {}

        >div {
          width: 100%;

        }
      }
    }
  }
}
</style>
