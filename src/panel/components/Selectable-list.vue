<template>
  <div class="Selectable-list" v-on:click="select">
    {{ item.label }}
    <span class="Content-right">
      <slot></slot>
    </span>
  </div>
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
    --listBg: lightblue;
  }

  .Selectable-list {
    background-color: var(--listBg);
    display: inline-block;
    padding: 5px;
    width: 100%;
  }

  .Content-right {
    float: right;
  }
</style>
