<template>
  <div class='abc' v-on:click="select">{{ JSON.stringify(item) }}</div>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      select () {
        this.$emit('select')
      }
    }
  }
</script>

<style scoped>
  :root {
    --linkBg: lightblue;
  }
  .abc {
    background-color: var(--linkBg);
  }
</style>
