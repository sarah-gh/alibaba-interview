<template>
<div>
    <div class="chart-box_header">
        <p>{{ title }}</p>
        <div class="icon">
          <div class="img icon_left" @click="moveCarousel(1)" :class="{'icon-hide' : atEndOfList }">
            <img src="@/assets/img/Vector-left.svg" />
          </div>
          <div class="img icon_right" @click="moveCarousel(-1)" :class="{'icon-hide' : atHeadOfList }">
            <img src="@/assets/img/Vector-right.svg" />
          </div>
        </div>
    </div>
    <div class="card-carousel-wrapper">
        <div class="card-carousel">
            <div class="card-carousel--overflow-container">
                <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')' }">
                  <div class="card-carousel--card" v-for="(item, index) in items" :key="'carousel-'+ index" @dblclick="onItemClick(item, index)">
                    <component :is="component" :config="item"></component>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import card from './card'

export default {
  name: 'carousel',
  props: {
    component: String,
    items: Array,
    title: String,
    selected: {
      type: Number,
      default: 0
    },
    windowSize: {
      type: Number,
      default: 3
    }
  },
  components: {
    card
  },
  data () {
    return {
      currentOffset: 0,
      paginationFactor: 260
    }
  },
  computed: {
    atEndOfList () {
      return this.currentOffset >= (this.paginationFactor) * (this.items.length - this.windowSize)
    },
    atHeadOfList () {
      return this.currentOffset === 0
    }
  },
  methods: {
    select (i) {
      this.$emit('select', i)
    },
    moveCarousel (direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset += this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset -= this.paginationFactor
      }
    },
    onItemClick (e, i) {
      this.$emit('onItemClick', e, i)
    }
  }
}
</script>

<style lang="scss" scoped>
$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #42b883;
$vue-teal-light: #42b983;
$gray: #666a73;
$light-gray: #f8f8f800;

.icon-hide {
  filter: invert(74%) sepia(3%) saturate(547%) hue-rotate(182deg) brightness(120%) contrast(89%);
  cursor: no-drop !important;
  &:hover {
    background-color: #31313159 !important;
  }
}
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 10px;
  color: $gray;
  direction: ltr;
}
.keyIndicators .card-carousel-wrapper {
    margin: 5px 0 0 0;
}

.chart-box_header{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  p {
    margin: 10px 20px 0 0;
    font-size: 18px;
    font-weight: bold;
  }
}
.icon{
  display: flex;
  .img {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgb(235, 235, 235);
    }
  }
}
.icon_left{
    margin-right: 22px;
}
.card-carousel {
  display: flex;
  justify-content: center;
  width: 100%;

  &--overflow-container {
    overflow: hidden;
    direction: rtl
  }

  &--nav__left,
  &--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid $vue-teal;
    border-right: 2px solid $vue-teal;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }

  &--nav__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }

  &--nav__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}

.card-carousel-cards {
  display: flex;
  padding-bottom: 10px;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

  .card-carousel--card {
    // margin: 0 10px;
    cursor: pointer;
    border-radius: 4px;
    z-index: 3;
    margin-bottom: 2px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

  }
}
</style>
