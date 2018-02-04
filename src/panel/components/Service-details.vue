<template>
  <div>
    <service-manipulation :serviceId="service.id" />
    <div v-for="(value, key) of service">{{ key + ' : ' + value }}</div>
  </div>
</template>

<script>
  import serviceManipulation from './Service-manipulation.vue'

  export default {
    components: {
      serviceManipulation
    },
    props: ['service']
  }
</script>

<style scoped>
</style>
