<template>
  <div class="Selectable-list-item" @click="select">
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
  .Selectable-list-item:first-child {
    border-top: none;
  }

  .Selectable-list-item {
    border-top: 2px solid var(--colorLight);
    border-collapse: collapse;
    display: inline-block;
    padding: 5px;
    width: 100%;
  }

  .Selectable-list-item:hover {
    background-color: var(--colorNeutral);
  }

  .Content-right {
    float: right;
  }
</style>
