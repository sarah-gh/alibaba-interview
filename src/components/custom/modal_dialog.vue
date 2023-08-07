<template>
    <div class="dialog">
        <button class="close" @click="showModalFalse()" >x</button>
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
    <!-- <div id="wrapper" class="main">
      <div class="overlay" v-if="showModal" @click="showModal = false"></div>
      <div class="modal" v-if="showModal" style="margin-bottom: 20px">
        <modal-dialog @ModalFalse="showModal = false" >
          <header>
            <slot name="header">
              <h3 class="modal-title">modal</h3>
            </slot>
          </header>
          <main>
            <slot name="main">
              fff
            </slot>
          </main>
          <footer>
            <slot name="footer">
              <button class="confirmation" @click="showModal = false">تایید</button>
            </slot>
          </footer>
        </modal-dialog>
      </div>
    </div> -->
</template>

<script>
export default {
  name: 'modal-dialog',
  methods: {
    cancel () {
      this.$emit('cancel')
    }
  }
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
