<template>
    <div>
        <button
            class="btn"
            @click="changeSelect(i+1)"
            v-for="(item, i) in config"
            :key="'button-'+ i"
            :class="selected == i+1 ? 'active' : ' '"
        >
            <div>
                {{ item.text }}
            </div>
        </button>
    </div>
</template>

<script>
export default {
  name: 'buttons',
  props: {
    config: Array
  },
  data () {
    return {
      selected: 1
    }
  },
  methods: {
    changeSelect (i) {
      this.selected = i
      this.$emit('changeSelect', i)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "@/assets/sass/variables";
$primary: #247AF2;
$secondary: #41CCD9;
$tertiary: #F26168;
$alert: #FEC049;
$info: #3DB6F2;
$error: #CC334D;
$success: #1EC982;
$river-bed: #3E4C59;

$small: 1024px;
$medium: 1224px;
$large: 1424px;
$ultra: 1500px;
$ultra-large: 1724px;

div {
    display: flex;
    gap: 5px;
    align-items: center;
    background: #F2F2F2;
    border-radius: 6px;
    width: fit-content;
    padding: 4px;
    .btn {
        background: transparent;
        border-radius: 4px;
        font-weight: 700;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
        color: $river-bed;
        border: 0px;
        padding: 2px 32px;
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        opacity: 0.6;
        > div {
            // cursor: pointer;
            padding: 0px;
            background: transparent;
            filter: invert(26%) sepia(26%) saturate(424%) hue-rotate(167deg) brightness(97%) contrast(88%);
        }
        img {
            width: 20px;
            height: 20px;
        }
    }
    button.active {
        background: #ffffff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-weight: 700;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
        color: #000000;
        border: 0px;
        padding: 2px 32px;
        opacity: 1;
        > div {
            background: transparent;
            filter: invert(33%) sepia(97%) saturate(2350%) hue-rotate(205deg) brightness(102%) contrast(90%);
        }
    }
}
button.btn-gray{
    background: #F5F5F5;
    border: 0px;
    border-radius: 8px;
    color: $primary;
    padding: 10px 13px;
    display: flex;
    align-items: center;
    gap: 13px;
    cursor: pointer;
}
</style>
