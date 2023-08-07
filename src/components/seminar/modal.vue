<template>
    <div>
    <div></div>
    </div>
</template>

<script>
export default {
  name: 'modal'
}
</script>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
}
button.close {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100000;
}

</style>
