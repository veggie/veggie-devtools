<template>
  <div>
    <button v-for="button in buttons" @click="manip(button)">{{ button }}</button>
  </div>
</template>

<script>
  export default {
    props: ['serviceId'],
    data () {
      return {
        buttons: ['block', 'set', 'hang']
      }
    },
    methods: {
      manip (type) {
        console.log(`calling fetch('/veggie/api/${type}') for ${this.serviceId}`)
      }
    }
  }
</script>

<style scoped>
  button {
    text-transform: capitalize;
  }
</style>
