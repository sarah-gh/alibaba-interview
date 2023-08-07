<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="formula-builder">
    <div class="icons">
      <h3>Number Icons</h3>
      <draggable class="icon-list" v-model="numberIcons" group="icons" @copy="onCopyNumberIcon">
        <div v-for="icon in numberIcons" :key="icon" class="icon">
          {{ icon }}
        </div>
      </draggable>
    </div>
    <div class="icons">
      <h3>Symbol Icons</h3>
      <draggable class="icon-list" v-model="symbolIcons" group="icons" @copy="onCopySymbolIcon">
        <div v-for="icon in symbolIcons" :key="icon" class="icon">
          {{ icon }}
        </div>
      </draggable>
    </div>
    <div class="formula" @drop="onDrop">
      <h3>Formula</h3>
      <draggable class="icon-list" v-model="formula" group="formula">
        <div v-for="(icon, index) in formula" :key="index" class="icon">
          {{ icon }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup () {
    const numberIcons = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    const symbolIcons = ref(['+', '-', '*', '/', '(', ')'])
    const formula = ref([])

    const onCopyNumberIcon = (event) => {
      const icon = event.target.textContent
      const copyIcon = parseInt(icon) // Create a copy of the number icon
      formula.value.push(copyIcon) // Add the copy to the formula list
    }

    const onCopySymbolIcon = (event) => {
      const icon = event.target.textContent
      formula.value.push(icon) // Add the symbol icon to the formula list
    }

    const onDrop = (event) => {
      event.preventDefault()
      // Handle any additional logic if needed
    }

    return {
      numberIcons,
      symbolIcons,
      formula,
      onCopyNumberIcon,
      onCopySymbolIcon,
      onDrop
    }
  }
})
</script>

<style>
.formula-builder {
  display: flex;
  justify-content: space-between;
}

.icons {
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.icon-list {
  display: flex;
  flex-wrap: wrap;
}

.icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 5px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.formula {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.formula .icon-list {
  min-height: 100px;
}
</style>
