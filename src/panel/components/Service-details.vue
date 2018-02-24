<template>
  <div>
    <service-manipulation class='Service-manipulation' :serviceId="service.id" />
    <div class='Service-details'>
      <span>{{ service.status }}</span>
      <span>{{ service.method.toUpperCase() }}</span>
      <span>{{ service.url.full }}</span>
    </div>
    <div v-if="service.type === 'object'" class='Service-response--object'>{{ JSON.stringify(service.response, null, 2) }}</div>
    <div v-if="service.type === 'string'" class='Service-response--path'>{{ service.response }}</div>
    <div v-if="service.type === 'function'" class='Service-response--function'>{{ service.response }}</div>
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
  .Service-details,
  .Service-manipulation {
    margin-bottom: 5px;
    padding: 2px 0;
  }

  .Service-response--object {
    background-color: var(--colorNeutral);
    display: block;
    white-space: pre;
  }
</style>
