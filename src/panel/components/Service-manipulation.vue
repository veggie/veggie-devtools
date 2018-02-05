<template>
  <div>
    <button v-for="button in buttons" @click="manip(button)">{{ button }}</button>
    <form v-if='detailsVisible' @submit.prevent='set'>
      <input type='text' name='status' />
      <input type='text' name='response' />
      <input type='submit' value='Set' />
    </form>
    <div v-if='error' class='Error'>
      {{ error }}
    </div>
  </div>
</template>

<script>
  import * as veggie from 'veggie'

  export default {
    props: ['serviceId'],
    data () {
      return {
        error: null,
        detailsVisible: false,
        buttons: ['block', 'hang', 'set']
      }
    },
    methods: {
      set ({ target }) {
        const id = this.$props.serviceId
        let payload = {}

        const status = target.elements.status.value
        const response = target.elements.response.value

        try {
          payload.response = JSON.parse(response)
        } catch (e) {
          this.error = 'Invalid JSON response'
          return
        }

        if (/^\d+$/.test(status) && status.length === 3) {
          payload.status = status
        } else {
          this.error = 'Invalid status code'
          return
        }

        this.error = null
        this.detailsVisible = false
        this.$store.dispatch('setService', { id, payload })
      },
      manip (type) {
        const id = this.$props.serviceId
        let payload = {}

        switch (type) {
          case 'block':
            payload.status = 404
            payload.response = {}
            break

          case 'hang':
            payload.hang = true
            break

          case 'set':
            this.detailsVisible = !this.detailsVisible
            return
        }

        this.$store.dispatch('setService', { id, payload })
      }
    }
  }
</script>

<style scoped>
  button {
    text-transform: capitalize;
  }

  .Error {
    color: red;
    padding: 2px;
  }
</style>
