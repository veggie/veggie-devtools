<template>
  <div class='Master-detail'>
    <section class='Header'>
      <h1>Veggie Dev Tools</h1>
      <a href="" :class="{ active: order === 'alpha' }"
        @click.prevent="order = 'alpha'"
      >Alphabetically</a>
      <a href="" :class="{ active: order === 'last' }"
        @click.prevent="order = 'last'"
      >By last called</a>
    </section>
    <section class='Master'>
      <ul v-if="!fetching && !error">
        <li v-for="service in ids.map(id => serviceMap[id])"
          is="selectable-list"
          :item="service"
          v-on:select="select(service.id)"
        >
          <chip v-if="service.overridden"
            :colorKey="service.overrideType"
            :label="service.overrideType"
          ></chip>
        </li>
      </ul>
      <div v-if="fetching">Loading...</div>
      <div v-if="error">{{ error }}</div>
    </section>
    <section v-if="selectedId" class='Detail'>
      <service-details :service="serviceMap[selectedId]" />
    </section>
  </div>
</template>

<script>
  import selectableList from './Selectable-list.vue'
  import serviceDetails from './Service-details.vue'
  import chip from './Chip.vue'
  import * as veggie from 'veggie'

  export default {
    components: {
      selectableList,
      serviceDetails,
      chip
    },
    data () {
      return {
        services: [],
        fetching: true,
        error: false,
        order: 'alpha',
        ids: [],
        selectedId: null
      }
    },
    methods: {
      select (id) {
        if (this.selectedId === id) {
          this.selectedId = null
        } else {
          this.selectedId = id
        }
      }
    },
    mounted: async function () {
      try {
        const res = await veggie.showAll()
        this.fetching = false
        this.serviceMap = [await res.json()]
          .reduce((acc, curr) => {
            const n = Math.random()
            this.ids.push(n)
            curr.id = n
            curr.label = curr.status
            curr.overridden = true
            curr.overrideType = 'block'
            acc[n] = curr
            return acc
          }, {})
      } catch (e) {
        console.error(e)
        this.error = e
      }
    }
  }
</script>

<style scoped>
  .Master-detail {
    display: grid;
    grid-template-areas:
      'header header header'
      'master detail detail';
  }

  section.Header { grid-area: header; }
  section.Master { grid-area: master; }
  section.Detail { grid-area: detail; } 

  ul {
    margin: 0;
    padding: 0;
  }
</style>
