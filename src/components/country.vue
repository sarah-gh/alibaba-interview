<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
  <router-link :to="'./'+country.name" class="card" :tag="'div'">
    <img class="card-img-top" :src="country.flags.png" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">{{country.name}}</h5>
        <p class="card-text"><span>Population: </span>{{country.population}}</p>
        <p class="card-text"><span>Region: </span>{{country.region}}</p>
        <p class="card-text"><span>Capital: </span>{{country.capital}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'countryComponent',
  props: {
    country: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
    width: 300px;
    height: 400px;
    background-color: var(--bg-primary);
    border-radius: 7px;
    box-shadow: 1px 1px 11px 0px rgb(0 0 0 / 15%);
    .card-img-top{
      width: 100%;
      border-radius: 7px 7px 0 0;
      height: 200px;
    }
    .card-body{
      text-align: start;
      padding: 0 20px;
      height: calc(100% - 220px);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .card-title{
        color: var(--text-primary);
        font-size: 20px;
        margin: 0 0 10px 0;
      }
      .card-text{
        color: gray;
        font-size: 14px;
        span{
          font-size: 14px;
          font-weight: bold;
          color: var(--text-primary);
        }
      }
    }
}
@media only screen and (max-width: 500px) {
  .card{
    width: 100%;
    height: fit-content;
    .card-body {
      padding-top: 16px;
      padding-bottom: 16px;
      height: 180px;
    }
    .card-img-top{
      width: 100%;
      border-radius: 7px 7px 0 0;
      height: auto;
    }
  }
}
</style>
