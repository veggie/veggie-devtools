<template>
  <span v-bind:style="{ backgroundColor: chipColors[colorKey] }">{{ label }}</span>
</template>

<script>
  import { chipColors } from '../config.js'

  export default {
    props: ['colorKey', 'label'],
    data () {
      return {
        chipColors
      }
    }
  }
</script>

<style scope>
  span {
    border-radius: 2px;
    padding: 2px;
    text-transform: uppercase;
  }
</style>
