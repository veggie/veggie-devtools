<template>
  <div>
    <button v-for="button in buttons" @click="manip(button)">{{ button }}</button>
    <form v-if="detailsVisible && details === 'set'" @submit.prevent='set'>
      <input type='text' name='status' />
      <input type='text' name='response' />
      <input type='submit' value='Set' />
    </form>
    <form v-if="detailsVisible && details === 'invoke' && invokable" @submit.prevent='invoke'>
      <input type='text' name='query' />
      <input type='text' name='body' />
      <input type='submit' value='Invoke' />
    </form>
    <div v-if='error' class='Error'>
      {{ error }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as veggie from 'veggie'

  export default {
    props: ['serviceId', 'invokable'],
    data () {
      return {
        error: null,
        details: '',
        detailsVisible: false
      }
    },
    computed: Object.assign(
      mapGetters(['getServiceById']),
      {
        buttons () {
          const buttons = ['block', 'hang', 'set', 'reset']
          if (this.$props.invokable) {
            buttons.push('invoke')
          }
          return buttons
        }
      }),
    methods: {
      invoke ({ target }) {
        const { url, method } = this.getServiceById(this.serviceId)
        const query = target.elements.query.value
        const body = target.elements.body.value

        let serviceUrl = url.full
        if (query !== '') {
          serviceUrl = `${serviceUrl}?${query}`
        }

        const options = {
          method: method === 'all' ? 'get' : method,
          headers: { 'Content-Type': 'application/json' }
        }

        if (body !== '') {
          options.body = JSON.stringify(body)
        }

        fetch(serviceUrl, options)
          .then(res => res.json())
          .then(data => this.$emit('invocation', data))
      },
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

          case 'reset':
            payload = {}
            break

          case 'invoke':
            if (this.details === 'invoke' || !this.detailsVisible) {
              this.detailsVisible = !this.detailsVisible
            }
            this.details = 'invoke'
            break

          case 'set':
            if (this.details === 'set' || !this.detailsVisible) {
              this.detailsVisible = !this.detailsVisible
            }
            this.details = 'set'
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
