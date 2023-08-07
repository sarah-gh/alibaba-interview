<template>
    <form>
        <div class="form-control">
            <label for="title">title :</label>
            <input id="title" name="title" type="text" />
        </div>
        <div class="form-control">
            <label for="progress"> progress (1-100):</label>
            <input id="progress" name="progress" type="number" />
        </div>
        <div class="form-control">
            <label for="content-num">content num :</label>
            <input id="content-num" name="content-num" type="number" />
        </div>
        <div class="form-control">
            <label for="content-text">content text :</label>
            <input id="content-text" name="content-text" type="text" />
        </div>
        <div class="form-button">
            <button>Save Data</button>
        </div>
    </form>
</template>

<script>
export default {
  name: 'myForm',
  data () {
    return {
      title: '',
      progress: 0,
      contentNum: 0,
      contentText: ''
    }
  },
  methods: {
    submitForm () {

    }
  }
}
</script>

<style lang="scss" scoped>
form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    gap: 20px 0;
    .form-button {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    .form-control{
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        input {
            padding: 7px 10px;
            border: 1px solid #ccc;
            border-radius: 7px;
            width: 90%;
            font-size: 16px;
        }
    }
    button {
        margin: 0 auto;
        background-color: #9fd6eb;
        padding: 10px 30px;
        border: 0px;
        border-radius: 8px;
        cursor: pointer;
    }
}
</style>
