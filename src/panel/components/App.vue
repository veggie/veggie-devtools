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
      <button @click='resetProfile'>Reset</button>
    </section>
    <section class='Master'>
      <ul v-if="!fetching && !error">
        <li v-for="service in services"
          is="selectable-list"
          :item="service"
          @select="select(service.id)"
        >
          <chip v-if="service.override"
            colorKey="status"
            :label="service.override.status"
          ></chip>
          <chip v-if="service.override && service.override.hang"
            colorKey="hang"
            label="Hang"
          ></chip>
        </li>
      </ul>
      <div v-if="fetching">Loading...</div>
      <div v-if="error">{{ error }}</div>
    </section>
    <section v-if="selectedService" class='Detail'>
      <service-details :service="selectedService" />
    </section>
  </div>
</template>

<script>
  import selectableListItem from './Selectable-list-item.vue'
  import serviceDetails from './Service-details.vue'
  import chip from './Chip.vue'
  import { mapActions, mapGetters } from 'vuex'
  import * as veggie from 'veggie'

  export default {
    components: {
      selectableListItem,
      serviceDetails,
      chip
    },
    data () {
      return {
        order: 'alpha',
        selectedId: null
      }
    },
    computed: Object.assign({
      selectedService () {
        return this.$store.getters.getServiceById(this.selectedId)
      }
    },
      mapGetters([
        'detected',
        'services',
        'fetching',
        'error'
      ])
    ),
    methods: Object.assign({
      select (id) {
        if (this.selectedId === id) {
          this.selectedId = null
        } else {
          this.selectedId = id
        }
      }
    },
      mapActions(['resetProfile'])
    )
  }
</script>

<style scoped>
  @import '../root.css';

  .Master-detail {
    display: grid;
    grid-template-areas:
      'header header header'
      'master detail detail';
  }

  section.Header { grid-area: header; }
  section.Master { grid-area: master; }
  section.Detail { grid-area: detail; } 
</style>
